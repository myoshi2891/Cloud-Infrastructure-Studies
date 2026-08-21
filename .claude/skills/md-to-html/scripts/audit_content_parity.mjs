#!/usr/bin/env node
/**
 * 原本 Markdown（内容の正）と生成された単一ファイル HTML（公開用）の文言を
 * 機械照合し、転写漏れを検出する監査スクリプト。
 *
 * 依存パッケージなし。node / bun どちらでも動く（ESM）。
 *
 * 使い方:
 *   bun .agents/skills/md-to-html/scripts/audit_content_parity.mjs \
 *     Certified-Associate-in-Project-Management.md \
 *     Certified-Associate-in-Project-Management.html
 *
 *   # CI / スクリプトから使う
 *   ... --json
 *
 * 終了コード:
 *   0 = 漏れなし（コミットに進んでよい）
 *   1 = 転写漏れあり（見出し・段落・リスト・表行・リンク・Mermaid のいずれかが欠落）
 *   2 = 引数エラー / ファイル未検出
 *
 * 設計上の判断（意図的な緩和と、その理由）:
 *
 *   1. 見出しは「レベル一致」ではなく「本文中に文言が存在すること」を必須とする。
 *      原本の h3 が `.step-list` のタイトルや callout の見出しへ再型付けされるのは
 *      正当な変換であり（CAPM 実績で 13 件）、レベル厳格化は偽陽性を量産して
 *      監査そのものが無視されるようになるため。レベル変更は警告として列挙する。
 *
 *   2. 段落 / リスト項目 / 表行は、まず同種要素の多重集合で照合し、
 *      外れたものはページ全文への包含判定にフォールバックする。
 *      用語集テーブル → `.glossary-grid`、比率テーブル → `.domain-grid` のような
 *      再型付けを漏れ扱いしないため。
 *
 *   3. Mermaid のラベルは「図ごとの完全一致」ではなく
 *      「ラベルを構成する語句がページのどこかに残っていること」を必須とする。
 *      図のラベルはレイアウト上どうしても短縮せざるを得ないが、
 *      短縮した語句が本文にも図にも存在しないなら、それは純粋な文言の消失である。
 *      図ごとのラベル差分は warnings として別途出力する。
 *
 *   4. 引用ブロック（`> …`、GitHub alert の `> [!NOTE]` を含む）は本文として照合する。
 *      このデザインでは引用が `.callout-practice` へ再型付けされるため、照合対象から
 *      外すとベストプラクティスや注意書きを丸ごと落としても監査が通ってしまう。
 *      種別マーカー（`[!NOTE]` 等）だけはページ側に文言として現れないため除外する。
 */

import { readFileSync } from "node:fs";

/** Mermaid ラベル片の照合下限。これより短い断片は偶然一致しやすく、指摘の精度が落ちる。 */
const SEGMENT_MIN_LENGTH = 6;

/** 存在判定のフォールバックで使う下限。偽陽性を避けるため本判定より緩く取る。 */
const SURVIVAL_SEGMENT_MIN_LENGTH = 3;

/**
 * `pre.mermaid` に書いてよい配色。`references/design-system.md` の 4 役。
 * 原本 Markdown の `style X fill:...` は同じ値のまま `classDef <role>Fill` へ移す。
 */
const APPROVED_DIAGRAM_COLORS = new Set([
  "#1a3a5c", // highlight の塗り
  "#4a90d9", // highlight の線
  "#5c1a1a", // danger の塗り
  "#d94a4a", // danger の線
  "#1a4a2a", // success の塗り
  "#4ad97a", // success の線
  "#5c3a1a", // warn の塗り
  "#d9904a", // warn の線
  "#ffffff", // ラベル文字色
]);

/** サイドバーへ再型付けされる目次見出し。本文セクションとしては存在しない。 */
const TOC_HEADING = "目次";

// --------------------------------------------------------------------------
// テキスト正規化
// --------------------------------------------------------------------------

/**
 * Normalizes text for comparison across Markdown and HTML content.
 * @param {string} raw - The text to normalize.
 * @returns {string} The normalized comparison key.
 */
function normalize(raw) {
  return raw
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .replace(/[`*_~]/g, "")
    .trim();
}

/**
 * Normalizes display text into a comparison key.
 * @param {string} raw - The display text to normalize.
 * @returns {string} The normalized text with whitespace, leading numbering, punctuation, and letter-case differences removed.
 */
function matchKey(raw) {
  return (
    normalize(raw)
      // ① 先に空白を全除去する。「4 つの」と「4つの」を同一視するため。
      .replace(/\s+/g, "")
      // ② 見出しの採番だけを落とす。多階層（"1.1" / "6.2"）は区切り記号が無くても採番、
      //    単階層は区切り記号を伴う場合（"3." / "2)" / "1："）だけ採番と見なす。
      //    区切りのない "4つのコアコンセプト" の先頭数字は本文の一部なので残す。
      .replace(/^(?:\d+(?:[.\-–]\d+)+[.)：:]?|\d+[.)：:])/, "")
      // ③ 句読点・括弧・記号の表記ゆれを吸収する。
      .replace(/[.,、。：:；;！!？?"'“”‘’（）()［］[\]{}／/\\|・･–—-]/g, "")
      .toLowerCase()
  );
}

/**
 * Decodes common HTML character references in a string.
 * @param {string} raw - The string containing HTML character references.
 * @returns {string} The decoded string.
 */
function decodeEntities(raw) {
  return raw
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "・")
    .replace(/&amp;/g, "&");
}

/**
 * Extracts display text from an HTML fragment.
 * @param {string} fragment - The markup fragment.
 * @returns {string} The decoded display text with tags removed.
 */
function stripMarkup(fragment) {
  return decodeEntities(fragment.replace(/<[^>]*>/g, " "));
}

/**
 * Strips Markdown footnote references, links, images, and inline HTML tags while preserving link and image text.
 * @param {string} raw - The raw Markdown inline fragment.
 * @returns {string} The fragment with inline markup removed.
 */
function stripMarkdownInline(raw) {
  return raw
    // 脚注参照 `[^12]` はページ側では `<sup>12</sup>` を持つ `.footnote-ref` になる。
    // 記法が違うだけで同じ位置に存在するため、両側から落として本文だけを照合する。
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ");
}

/**
 * Decodes HTML character references in a URL.
 * @param {string} url - The URL containing HTML character references.
 * @returns {string} The URL with HTML character references decoded.
 */
function normalizeUrl(url) {
  return decodeEntities(url);
}

/**
 * Collects unique external URLs from text.
 * @param {string} src - The text to scan.
 * @returns {Set<string>} The normalized URLs found in the text.
 */
function collectUrls(src) {
  const urls = new Set();
  // 全角の閉じ括弧・句読点・強調記号も URL の終端として扱う。原本の日本語本文には
  // `…capm）でご確認ください。` のように URL 直後へ全角文字が続く箇所があるため。
  const re = /https?:\/\/[^\s"'`)<>\]}\\、。，．）」』】＞＊*]+/g;
  let match = re.exec(src);
  while (match !== null) {
    urls.add(normalizeUrl(match[0]));
    match = re.exec(src);
  }
  return urls;
}

/**
 * Extracts the contents of matching non-nested HTML tags.
 * @param {string} src - The source markup to scan.
 * @param {string} tag - The tag name to match.
 * @returns {string[]} The matched inner contents in document order.
 */
function extractTagContents(src, tag) {
  const results = [];
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let match = re.exec(src);
  while (match !== null) {
    results.push(match[1]);
    match = re.exec(src);
  }
  return results;
}

// --------------------------------------------------------------------------
// Mermaid
// --------------------------------------------------------------------------

/**
 * Extracts labels from Mermaid nodes, edges, pie slices, titles, and subgraphs.
 * @param {string} source - The Mermaid diagram source.
 * @returns {string[]} The extracted label strings.
 */
function extractMermaidLabels(source) {
  const labels = [];
  let rest = decodeEntities(source);

  // ① 引用符付きラベル（`["…"]` `("…")` `{"…"}` `|"…"|`）を先に回収し、
  //    未引用ラベルの正規表現が二重取りしないよう本文から除去する。
  const quoted = /[[({|]\s*"([^"]*)"\s*[\])}|]/g;
  let match = quoted.exec(rest);
  while (match !== null) {
    labels.push(match[1]);
    match = quoted.exec(rest);
  }
  rest = rest.replace(quoted, " ");

  // ② pie のスライス（`"ラベル" : 36`）と title 行。
  for (const slice of rest.matchAll(/^\s*"([^"]*)"\s*:\s*[\d.]+\s*$/gm)) labels.push(slice[1]);
  rest = rest.replace(/^\s*"([^"]*)"\s*:\s*[\d.]+\s*$/gm, " ");
  for (const title of rest.matchAll(/^\s*title\s+(.+?)\s*$/gm)) labels.push(title[1]);
  for (const sub of rest.matchAll(/^\s*subgraph\s+(.+?)\s*$/gm)) labels.push(sub[1]);

  // ③ 未引用ラベル。`classDef` / `class` / `style` 行は配色定義なので除外する。
  const declarationFree = rest
    .split(/\r?\n/)
    .filter((line) => !/^\s*(classDef|class|style|linkStyle|title|subgraph)\b/.test(line))
    .join("\n");
  for (const bare of declarationFree.matchAll(/\[\s*([^\][|"]+?)\s*\]/g)) labels.push(bare[1]);
  for (const bare of declarationFree.matchAll(/\{\s*([^{}|"]+?)\s*\}/g)) labels.push(bare[1]);
  for (const bare of declarationFree.matchAll(/\|\s*([^|"]+?)\s*\|/g)) labels.push(bare[1]);
  // `A -- テキスト --> B` / `A -.テキスト.-> B` 形式のエッジラベル。
  for (const edge of declarationFree.matchAll(/--\s+([^->|\n]+?)\s+--?>/g)) labels.push(edge[1]);
  for (const edge of declarationFree.matchAll(/-\.\s*([^.>|\n]+?)\s*\.-?->/g)) labels.push(edge[1]);

  return labels.map((label) => label.trim()).filter((label) => label.length > 0);
}

/**
 * Splits text into comparison segments that may survive independently on the page.
 *
 * @param {string} text - The text to split.
 * @param {number} [minLength=SEGMENT_MIN_LENGTH] - The minimum segment length to include.
 * @return {string[]} The normalized comparison keys for segments meeting the minimum length.
 */
function splitSegments(text, minLength = SEGMENT_MIN_LENGTH) {
  return text
    .replace(/<br\s*\/?>/gi, " ")
    // 末尾の `36%` のような比率表記は pie の showData 側が描画するため落としてよい。
    .replace(/\s*\d+(?:\.\d+)?%\s*$/, "")
    .replace(/\s+[-–—]\s+/g, " ")
    .replace(/[（）()、。「」『』／/＋+&:：;；・]/g, " ")
    // 半角空白だけでなく全角空白・NBSP・タブも区切りとして扱う。
    .split(/\s+/)
    .map((segment) => matchKey(segment))
    .filter((segment) => segment.length >= minLength);
}

/**
 * Collects every colour literal declared inside Mermaid sources.
 * @param {string} source - The Mermaid diagram source.
 * @returns {string[]} The lowercased hex colours found in fill/stroke/color declarations.
 */
function collectDiagramColors(source) {
  return [...source.matchAll(/(?:fill|stroke|color)\s*:\s*(#[0-9a-fA-F]{3,8})/g)].map((match) =>
    match[1].toLowerCase()
  );
}

// --------------------------------------------------------------------------
// インベントリ抽出
// --------------------------------------------------------------------------

/**
 * Extracts comparable structural elements from Markdown source, including headings, paragraphs, lists, tables, references, footnote references, table-of-contents anchors, Mermaid diagrams, and external links.
 * @param {string} src - The complete Markdown source.
 * @returns {object} An inventory of the extracted Markdown elements.
 */
function inventoryMarkdown(src) {
  const headings = [];
  const listTexts = [];
  const tableRowTexts = [];
  const paragraphTexts = [];
  const referenceTexts = [];
  const footnoteRefs = [];
  const tocAnchors = [];
  const mermaidSources = [];
  let inToc = false;

  let inFence = false;
  let fenceLanguage = "";
  let fenceLines = [];
  let paragraphLines = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    paragraphTexts.push(normalize(stripMarkdownInline(paragraphLines.join(" "))));
    paragraphLines = [];
  };

  for (const line of src.split(/\r?\n/)) {
    const fence = /^\s*(?:```|~~~)\s*(\S*)/.exec(line);
    if (fence) {
      flushParagraph();
      if (!inFence) {
        fenceLanguage = fence[1].toLowerCase();
        fenceLines = [];
      } else if (fenceLanguage === "mermaid") {
        mermaidSources.push(fenceLines.join("\n"));
      }
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      fenceLines.push(line);
      continue;
    }

    // 脚注参照 `[^12]` は本文照合では両側から落とす（記法が違うだけで同じ位置にある）。
    // そのままでは「参照だけが落ちたページ」を検出できないため、出現順に別枠で数える。
    for (const reference of line.matchAll(/\[\^([^\]]+)\](?!:)/g)) {
      footnoteRefs.push(reference[1].trim());
    }

    const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (heading) {
      flushParagraph();
      const text = normalize(stripMarkdownInline(heading[2]));
      // `## 目次` は本文セクションではなくサイドバーへ再型付けされる。
      // 見出しとしても、その配下のリンク一覧としても照合対象から外す。
      inToc = heading[1].length === 2 && text === TOC_HEADING;
      if (!inToc) headings.push({ level: heading[1].length, text });
      continue;
    }
    // 脚注定義 `[^12]: 名称. https://…` は `.ref-card` へ再型付けされるため、
    // 段落ではなく参考文献として別枠で照合する。
    const footnoteDefinition = /^\s*\[\^([^\]]+)\]:\s*(\S.*)$/.exec(line);
    if (footnoteDefinition) {
      flushParagraph();
      referenceTexts.push(normalize(stripMarkdownInline(footnoteDefinition[2])));
      continue;
    }
    const listItem = /^\s*(?:[-*+]|\d+\.)\s+(\S.*)$/.exec(line);
    if (listItem) {
      flushParagraph();
      if (inToc) {
        const anchor = /\]\(#([^)]+)\)/.exec(listItem[1]);
        if (anchor !== null) tocAnchors.push(decodeURIComponent(anchor[1]));
        continue;
      }
      listTexts.push(normalize(stripMarkdownInline(listItem[1])));
      continue;
    }
    // 表の区切り行（`|---|---|`）は行として数えない。
    if (/^\s*\|.*\|\s*$/.test(line) && !/^\s*\|?\s*:?-{3,}/.test(line)) {
      flushParagraph();
      tableRowTexts.push(normalize(stripMarkdownInline(line.replace(/^\s*\||\|\s*$/g, ""))));
      continue;
    }
    if (
      line.trim() === "" ||
      /^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line) ||
      /^\s*\|?\s*:?-{3,}/.test(line)
    ) {
      flushParagraph();
      continue;
    }
    // 引用ブロックは `.callout-practice` へ再型付けされる本文である（設計上の判断 4）。
    // 引用記号だけを外して通常の段落 / リスト項目として照合する。
    const quote = /^\s*>\s?(.*)$/.exec(line);
    if (quote) {
      const inner = quote[1].trim();
      // GitHub alert のマーカー（`[!NOTE]` 等）はページ側に文言として現れない。
      // callout の種別を表す記法であり、本文ではないので照合対象から外す。
      if (inner === "" || /^\[![A-Z]+\]$/.test(inner)) {
        flushParagraph();
        continue;
      }
      const quotedList = /^(?:[-*+]|\d+\.)\s+(\S.*)$/.exec(inner);
      if (quotedList) {
        flushParagraph();
        listTexts.push(normalize(stripMarkdownInline(quotedList[1])));
        continue;
      }
      paragraphLines.push(inner);
      continue;
    }
    paragraphLines.push(line.trim());
  }
  flushParagraph();

  return {
    headings,
    listTexts,
    tableRowTexts,
    paragraphTexts,
    referenceTexts,
    footnoteRefs,
    tocAnchors,
    mermaidSources,
    externalLinks: collectUrls(src),
  };
}

/**
 * Extracts the Mermaid sources the page carries inline.
 *
 * 本 repo の生成 HTML は `pre.mermaid` に直書きする（`var DIAGRAMS` は使わない）。
 * 中身は実体参照でエスケープされているため、照合前にデコードする。
 *
 * @param {string} src - The complete HTML source.
 * @returns {Array<{id: string, source: string}>} The diagram sources in document order.
 */
function extractDiagramEntries(src) {
  return [...src.matchAll(/<pre class="mermaid">([\s\S]*?)<\/pre\s*>/g)].map((match, index) => ({
    id: `pre${index + 1}`,
    source: decodeEntities(match[1]),
  }));
}

/**
 * Extracts inline footnote references from an HTML document.
 *
 * @param {string} src - The complete HTML source.
 * @return {Array<{id: string|null, href: string|null, sup: string|null}>} The footnote references in document order.
 */
function extractFootnoteRefs(src) {
  // 生成 HTML は整形の都合で属性が改行で折り返され、閉じ tag も `</a\n>` になりうる。
  // `<\/a>` 決め打ちでは 1 件も拾えないため、閉じ tag の空白を許容する。
  // クラス属性は単語境界で照合する。`class="footnote-ref extra"` のように追加クラスが
  // 付いた参照を取りこぼすと、脚注の照合そのものが黙って無効化される。
  return [...src.matchAll(/<a\s[^>]*\bclass="[^"]*\bfootnote-ref\b[^"]*"[^>]*>([\s\S]*?)<\/a\s*>/gi)].map((match) => ({
    id: /\bid="([^"]*)"/.exec(match[0])?.[1] ?? null,
    href: /\bhref="([^"]*)"/.exec(match[0])?.[1] ?? null,
    sup: /<sup[^>]*>([\s\S]*?)<\/sup>/i.exec(match[1])?.[1].trim() ?? null,
  }));
}

/**
 * Extracts the sidebar navigation targets.
 * @param {string} src - The complete HTML source.
 * @returns {string[]} The anchor targets in document order.
 */
function extractNavTargets(src) {
  const nav = /<nav\b[^>]*id="sidebarNav"[^>]*>([\s\S]*?)<\/nav>/.exec(src);
  if (nav === null) return [];
  return [...nav[1].matchAll(/<a\s[^>]*href="#([^"]+)"/g)].map((match) =>
    decodeURIComponent(match[1])
  );
}

/**
 * Builds an inventory of the content and navigation elements in a generated HTML page.
 * @param {string} src - The complete HTML source.
 * @return {object} The extracted headings, anchors, references, footnote references, navigation targets, text content, diagrams, and external links.
 */
function inventoryHtml(src) {
  const diagrams = extractDiagramEntries(src);
  const navTargets = extractNavTargets(src);

  // 本文は <style> / <script> を除いた領域から採る。
  // 脚注参照は `[^12]` の対応物なので、原本側の除去と対称になるよう落とす
  // （落とした分は footnoteRefMismatches で別途照合する）。
  // 閉じ tag の空白・改行を許容するのは extractFootnoteRefs と同じ理由である。
  // 生成 HTML は整形の都合で `</a\n>` の形に折り返されるため、`</a>` 決め打ちだと
  // その参照から次の `</a>` までを丸ごと飲み込み、転写済みの本文を消失扱いしてしまう。
  const body = src
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<a\s[^>]*\bclass="[^"]*\bfootnote-ref\b[^"]*"[\s\S]*?<\/a\s*>/gi, "");

  // 見出し id も headings と同じ本文領域から採る。走査範囲が食い違うと、
  // 一方だけが拾った見出しがアンカーの三者照合で偽の指摘になる。
  const headingIds = [...body.matchAll(/<h[23]\s[^>]*id="([^"]+)"/g)].map((match) =>
    decodeURIComponent(match[1])
  );

  const referenceTexts = [...body.matchAll(/<div class="txt">([\s\S]*?)<\/div>/g)].map((match) =>
    normalize(stripMarkup(match[1]))
  );

  // `.footnote-ref` の `<sup>` は、参照先 `.ref-card` が掲げる番号と一致していなければ
  // ならない。原本の `[^25]` はページ上で通し番号へ振り直されるため、原本の番号その
  // ものではなくこの対応表と突き合わせる。
  // 属性の並び順で見分けない。整形によって `id` が `class` より前へ来ることがあり、
  // 並び順に依存した走査はそのカードを取りこぼして表示番号の照合を無効化する。
  const referenceCardNumbers = new Map();
  for (const card of src.matchAll(/<div\s[^>]*>/g)) {
    if (!/\bclass="[^"]*\bref-card\b[^"]*"/.test(card[0])) continue;
    const id = /\bid="([^"]*)"/.exec(card[0])?.[1];
    if (id === undefined) continue;
    const number = /^\s*(<div\s[^>]*>)([\s\S]*?)<\/div>/.exec(
      src.slice(card.index + card[0].length)
    );
    if (number === null || !/\bclass="[^"]*\bnum\b[^"]*"/.test(number[1])) continue;
    referenceCardNumbers.set(id, normalize(stripMarkup(number[2])));
  }

  const headings = [];
  const headingRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match = headingRe.exec(body);
  while (match !== null) {
    headings.push({ level: Number(match[1]), text: normalize(stripMarkup(match[2])) });
    match = headingRe.exec(body);
  }

  const diagramText = diagrams.map(({ source }) => source).join(" ");

  return {
    headings,
    headingIds,
    navTargets,
    referenceTexts,
    footnoteRefs: extractFootnoteRefs(src),
    referenceCardNumbers,
    listTexts: extractTagContents(body, "li").map((content) => normalize(stripMarkup(content))),
    tableRowTexts: extractTagContents(body, "tr").map((content) => normalize(stripMarkup(content))),
    paragraphTexts: extractTagContents(body, "p").map((content) => normalize(stripMarkup(content))),
    // 図のラベルもページ上に現れる文言なので、包含判定の対象テキストに含める。
    pageText: matchKey(`${stripMarkup(body)} ${diagramText}`),
    diagrams,
    externalLinks: collectUrls(body),
  };
}

// --------------------------------------------------------------------------
// 照合
// --------------------------------------------------------------------------

/**
 * Reports source values that occur more often than their corresponding page values.
 * @param {string[]} sourceValues - Source values in occurrence order.
 * @param {string[]} pageValues - Values found in the page.
 * @returns {string[]} Source values missing from the page, preserving duplicates and order.
 */
function missingOccurrences(sourceValues, pageValues) {
  const remaining = new Map();
  for (const value of pageValues) {
    const key = matchKey(value);
    remaining.set(key, (remaining.get(key) ?? 0) + 1);
  }
  return sourceValues.filter((value) => {
    const key = matchKey(value);
    const count = remaining.get(key) ?? 0;
    if (count === 0) return true;
    remaining.set(key, count - 1);
    return false;
  });
}

/**
 * Determines whether source text is represented in the extracted page text.
 *
 * Text with fewer than eight normalized characters is accepted automatically. Longer text must appear contiguously or have all significant segments represented.
 *
 * @param {string} text - The source text to locate.
 * @param {string} pageText - The normalized text extracted from the page.
 * @return {boolean} `true` if the text is represented in the page text, `false` otherwise.
 */
function survivesInPage(text, pageText) {
  const key = matchKey(text);
  if (key.length < 8) return true;
  if (pageText.includes(key)) return true;
  // 存在判定のフォールバックでは短い片も拾う。表のヘッダー行（`ドメイン | 出題比率`）が
  // `.domain-grid` へ再型付けされる等、短い語の集合として散らばる正当なケースがあるため。
  const segments = splitSegments(text, SURVIVAL_SEGMENT_MIN_LENGTH);
  return segments.length > 0 && segments.every((segment) => pageText.includes(segment));
}

/**
 * Lists the wording segments of a text that are absent from the page.
 * @param {string} text - The source text.
 * @param {string} pageText - The flattened page text.
 * @returns {string[]} The segments that appear nowhere on the page.
 */
function missingSegments(text, pageText) {
  return splitSegments(text).filter((segment) => !pageText.includes(segment));
}

/**
 * Compares Markdown and HTML inventories to identify missing or inconsistent content.
 * @param {object} source - Inventory extracted from the Markdown source.
 * @param {object} page - Inventory extracted from the generated HTML page.
 * @return {object} Comparison findings, element counts, warnings, and a `blocking` flag indicating whether blocking discrepancies were found.
 */
function compare(source, page) {
  // 見出しは階層で扱いを分ける。
  //   h1 / h2 = 原本のセクション見出し。**見出し要素として実在すること**を求める。
  //             このデザインはサイドバーが全見出しの文言を複製するため、ページ全文への
  //             包含で判定すると h2 を削除しても必ず「残っている」と誤判定してしまう。
  //   h3 以下 = `.callout-practice` のラベル等へ再型付けされるのが正常な変換であり、
  //             blocking にすると偽陽性で監査が形骸化する。文言がページのどこかに
  //             残っていれば漏れとしない（本文の照合が別途 blocking なので見逃さない）。
  const pageHeadingKeySet = new Set(page.headings.map((heading) => matchKey(heading.text)));
  const missingHeadings = source.headings.filter(
    (heading) => heading.level <= 2 && !pageHeadingKeySet.has(matchKey(heading.text))
  );
  const missingSubHeadings = source.headings.filter(
    (heading) =>
      heading.level > 2 &&
      !pageHeadingKeySet.has(matchKey(heading.text)) &&
      !survivesInPage(heading.text, page.pageText)
  );

  // レベル変更は blocking にしない（再型付けは正当）。ただし必ず目に触れるよう列挙する。
  const pageHeadingKeys = new Map();
  for (const heading of page.headings) {
    const key = matchKey(heading.text);
    if (!pageHeadingKeys.has(key)) pageHeadingKeys.set(key, heading.level);
  }
  const retypedHeadings = source.headings
    .filter(
      (heading) =>
        pageHeadingKeySet.has(matchKey(heading.text)) ||
        survivesInPage(heading.text, page.pageText)
    )
    .map((heading) => ({
      level: heading.level,
      text: heading.text,
      pageLevel: pageHeadingKeys.get(matchKey(heading.text)) ?? null,
    }))
    .filter((heading) => heading.pageLevel !== heading.level);

  // 同種要素で照合し、外れたものだけページ全文への包含にフォールバックする。
  const missingParagraphs = missingOccurrences(source.paragraphTexts, page.paragraphTexts).filter(
    (text) => !survivesInPage(text, page.pageText)
  );
  const missingListItems = missingOccurrences(source.listTexts, page.listTexts).filter(
    (text) => !survivesInPage(text, page.pageText)
  );
  const missingTableRows = missingOccurrences(source.tableRowTexts, page.tableRowTexts).filter(
    (text) => !survivesInPage(text, page.pageText)
  );

  const missingLinks = [...source.externalLinks].filter((url) => !page.externalLinks.has(url));

  // 脚注定義は `.ref-card` へ再型付けされる。同種要素同士で照合し、外れたものだけ
  // ページ全文への包含にフォールバックする（本文へ移した場合を漏れ扱いしないため）。
  const missingReferences = missingOccurrences(
    source.referenceTexts,
    page.referenceTexts
  ).filter((text) => !survivesInPage(text, page.pageText));

  // 脚注参照は本文照合から落としているため、ここで出現数・対応関係・表示番号・id を照合する。
  // 参照が 1 つ落ちても本文の文言は一致してしまい、他の検査では検出できない。
  //
  // ページ側の番号は「初出順の通し番号」へ振り直される（原本の `[^25]` が 4 番になる）。
  // したがって原本の番号そのものではなく、原本のラベルとページの参照先が
  // 一対一に対応していること、表示番号が参照先 `.ref-card` の番号と一致することを見る。
  const footnoteRefMismatches = [];
  if (source.footnoteRefs.length !== page.footnoteRefs.length) {
    footnoteRefMismatches.push({
      kind: "脚注参照の数が原本と一致しません",
      detail: `原本 ${source.footnoteRefs.length} 件 / ページ ${page.footnoteRefs.length} 件`,
    });
  }
  // 逆向き（別のラベルが同じ参照先を指す）は指摘しない。原本が同一の出典を
  // 別番号で二重定義している場合、ページ側が 1 枚の `.ref-card` へまとめるのは正しい。
  const labelToTarget = new Map();
  const refCount = Math.min(source.footnoteRefs.length, page.footnoteRefs.length);
  for (let index = 0; index < refCount; index += 1) {
    const label = source.footnoteRefs[index];
    const target = page.footnoteRefs[index].href ?? "(href 無し)";
    const knownTarget = labelToTarget.get(label);
    if (knownTarget === undefined) {
      labelToTarget.set(label, target);
    } else if (knownTarget !== target) {
      footnoteRefMismatches.push({
        kind: "同じ脚注の参照先がページ内で割れています",
        detail: `${index + 1} 番目: 原本 "[^${label}]" → "${target}"（既出は "${knownTarget}"）`,
      });
    }
  }
  page.footnoteRefs.forEach((pageRef, index) => {
    const expectedId = `fnref${index + 1}`;
    if (pageRef.id !== expectedId) {
      footnoteRefMismatches.push({
        kind: "脚注参照の id が連番ではありません",
        detail: `${index + 1} 番目: 期待 "${expectedId}" / 実際 "${pageRef.id ?? "(id 無し)"}"`,
      });
    }
    const target = (pageRef.href ?? "").replace(/^#/, "");
    const cardNumber = page.referenceCardNumbers.get(target);
    if (cardNumber !== undefined && pageRef.sup !== cardNumber) {
      footnoteRefMismatches.push({
        kind: "脚注参照の表示番号が参照先の番号と一致しません",
        detail: `${index + 1} 番目: 表示 "${pageRef.sup ?? "(sup 無し)"}" / #${target} の番号 "${cardNumber}"`,
      });
    }
  });

  // 原本の目次アンカー ≡ 見出し id ≡ サイドバーのリンク先。
  // 三者が一致しないと目次から辿れない節やリンク切れが生まれる。
  const anchorMismatches = [];
  const tocAnchors = new Set(source.tocAnchors);
  const headingIds = new Set(page.headingIds);
  const navTargets = new Set(page.navTargets);
  for (const anchor of tocAnchors) {
    if (!headingIds.has(anchor)) {
      anchorMismatches.push({ kind: "見出しが無い目次アンカー", anchor });
    }
  }
  for (const id of headingIds) {
    if (tocAnchors.size > 0 && !tocAnchors.has(id)) {
      anchorMismatches.push({ kind: "目次に無い見出し id", anchor: id });
    }
    if (!navTargets.has(id)) {
      anchorMismatches.push({ kind: "サイドバーに無い見出し id", anchor: id });
    }
  }
  for (const target of navTargets) {
    if (!headingIds.has(target)) {
      anchorMismatches.push({ kind: "見出しが無いサイドバーのリンク", anchor: target });
    }
  }

  const diagramCounts = {
    markdownFences: source.mermaidSources.length,
    preMermaid: page.diagrams.length,
  };
  const diagramCountMatch = diagramCounts.markdownFences === diagramCounts.preMermaid;

  // 図のラベルを構成する語句が、ページのどこか（本文 or いずれかの図）に残っているか。
  const missingDiagramLabels = [];
  source.mermaidSources.forEach((diagramSource, index) => {
    const seen = new Set();
    for (const label of extractMermaidLabels(diagramSource)) {
      for (const segment of missingSegments(label, page.pageText)) {
        if (seen.has(segment)) continue;
        seen.add(segment);
        missingDiagramLabels.push({ diagram: index + 1, label, segment });
      }
    }
  });

  // 図ごとのラベル差分（非 blocking。短縮の妥当性を人が確認するための材料）。
  // `pre.mermaid` は文書順に並ぶため、原本の fence 順とそのまま突き合わせられる。
  const orderedPageDiagrams = page.diagrams;
  const rewrittenDiagramLabels = [];
  source.mermaidSources.forEach((diagramSource, index) => {
    const pageDiagram = orderedPageDiagrams[index];
    if (pageDiagram === undefined) return;
    const sourceLabels = new Set(extractMermaidLabels(diagramSource).map(matchKey));
    const pageLabels = new Set(extractMermaidLabels(pageDiagram.source).map(matchKey));
    const dropped = [...sourceLabels].filter((label) => !pageLabels.has(label));
    if (dropped.length > 0) {
      rewrittenDiagramLabels.push({ diagram: index + 1, id: pageDiagram.id, dropped });
    }
  });

  const unapprovedColors = [];
  for (const { id, source: diagramSource } of page.diagrams) {
    for (const color of collectDiagramColors(diagramSource)) {
      if (!APPROVED_DIAGRAM_COLORS.has(color)) unapprovedColors.push({ id, color });
    }
  }

  const counts = {
    headings: { source: source.headings.length, page: page.headings.length },
    paragraphs: { source: source.paragraphTexts.length, page: page.paragraphTexts.length },
    listItems: { source: source.listTexts.length, page: page.listTexts.length },
    tableRows: { source: source.tableRowTexts.length, page: page.tableRowTexts.length },
    externalLinks: { source: source.externalLinks.size, page: page.externalLinks.size },
    references: { source: source.referenceTexts.length, page: page.referenceTexts.length },
    footnoteRefs: { source: source.footnoteRefs.length, page: page.footnoteRefs.length },
    diagrams: { source: diagramCounts.markdownFences, page: diagramCounts.preMermaid },
  };

  const blocking =
    missingHeadings.length > 0 ||
    missingParagraphs.length > 0 ||
    missingListItems.length > 0 ||
    missingTableRows.length > 0 ||
    missingLinks.length > 0 ||
    missingReferences.length > 0 ||
    footnoteRefMismatches.length > 0 ||
    anchorMismatches.length > 0 ||
    missingDiagramLabels.length > 0 ||
    unapprovedColors.length > 0 ||
    !diagramCountMatch;

  return {
    missingHeadings,
    missingParagraphs,
    missingListItems,
    missingTableRows,
    missingLinks,
    missingReferences,
    footnoteRefMismatches,
    anchorMismatches,
    missingDiagramLabels,
    unapprovedColors,
    diagramCountMatch,
    diagramCounts,
    missingSubHeadings,
    retypedHeadings,
    rewrittenDiagramLabels,
    counts,
    blocking,
  };
}

// --------------------------------------------------------------------------
// 出力
// --------------------------------------------------------------------------

/**
 * Prints a non-empty list of blocking findings under the specified title.
 * @param {string} title - The section title.
 * @param {unknown[]} items - The findings to print.
 * @param {(item: unknown) => string} format - Converts each finding to display text.
 */
function printFindings(title, items, format) {
  if (items.length === 0) return;
  console.log(`\n❌ ${title} (${items.length} 件):`);
  for (const item of items) console.log(`  ${format(item)}`);
}

/**
 * Audits a Markdown source file against its generated HTML page.
 * @returns {number} `0` when no blocking issues are found, `1` when parity issues are detected, or `2` when arguments are missing or files cannot be read.
 */
function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((arg) => arg.startsWith("--")));
  const positional = args.filter((arg) => !arg.startsWith("--"));

  if (positional.length < 2) {
    console.error("usage: audit_content_parity.mjs <source.md> <page.html> [--json]");
    return 2;
  }

  const [sourcePath, pagePath] = positional;
  let sourceText;
  let pageText;
  try {
    sourceText = readFileSync(sourcePath, "utf8");
    pageText = readFileSync(pagePath, "utf8");
  } catch (error) {
    console.error(`読み込み失敗: ${error instanceof Error ? error.message : String(error)}`);
    return 2;
  }

  const result = compare(inventoryMarkdown(sourceText), inventoryHtml(pageText));

  if (flags.has("--json")) {
    console.log(JSON.stringify({ source: sourcePath, page: pagePath, ...result }, null, 2));
    return result.blocking ? 1 : 0;
  }

  console.log(`source: ${sourcePath}`);
  console.log(`page  : ${pagePath}\n`);
  console.log("要素            原本    HTML   （参考値。判定は下の照合結果で行う）");
  for (const [key, value] of Object.entries(result.counts)) {
    console.log(
      `${key.padEnd(14)}  ${String(value.source).padStart(5)}  ${String(value.page).padStart(5)}`
    );
  }

  printFindings("HTML に存在しない原本の見出し", result.missingHeadings, (h) => `h${h.level}: ${h.text}`);
  printFindings("HTML に存在しない原本の段落", result.missingParagraphs, (t) => JSON.stringify(t));
  printFindings("HTML に存在しない原本のリスト項目", result.missingListItems, (t) => `- ${t}`);
  printFindings("HTML に存在しない原本の表行", result.missingTableRows, (t) => JSON.stringify(t));
  printFindings("HTML に存在しない原本の外部リンク", result.missingLinks, (u) => u);
  printFindings(
    "脚注参照が原本と一致しません",
    result.footnoteRefMismatches,
    (f) => `${f.kind}: ${f.detail}`
  );
  printFindings(
    "ページのどこにも残っていない Mermaid ラベルの語句",
    result.missingDiagramLabels,
    (m) => `図${m.diagram} "${m.label}" → 消失: "${m.segment}"`
  );
  printFindings(
    "デザインシステム外の配色が pre.mermaid に混入",
    result.unapprovedColors,
    (c) => `${c.id}: ${c.color}`
  );

  if (!result.diagramCountMatch) {
    console.log("\n❌ Mermaid 図の数が一致しません:");
    console.log(
      `  原本の fence=${result.diagramCounts.markdownFences} / ` +
        `pre.mermaid=${result.diagramCounts.preMermaid}`
    );
  }

  if (result.missingSubHeadings.length > 0) {
    console.log(
      `\n⚠️ 文言がページに見当たらない小見出し (${result.missingSubHeadings.length} 件、要確認):`
    );
    console.log("   本文が転写済みなら callout / step へ再型付けされただけの可能性が高い。");
    console.log("   本文ごと落ちていないかを必ず目で確認すること。");
    for (const heading of result.missingSubHeadings) {
      console.log(`  h${heading.level}: ${heading.text}`);
    }
  }

  if (result.retypedHeadings.length > 0) {
    console.log(`\n⚠️ 見出しレベルが変わった項目 (${result.retypedHeadings.length} 件、要確認):`);
    for (const heading of result.retypedHeadings) {
      const destination = heading.pageLevel === null ? "見出し以外の要素" : `h${heading.pageLevel}`;
      console.log(`  h${heading.level} → ${destination}: ${heading.text}`);
    }
  }

  if (result.rewrittenDiagramLabels.length > 0) {
    console.log(
      `\n⚠️ 図のラベルが短縮・書き換えされた項目 (${result.rewrittenDiagramLabels.length} 図、要確認):`
    );
    for (const diagram of result.rewrittenDiagramLabels) {
      console.log(`  図${diagram.diagram} (${diagram.id}): ${diagram.dropped.join(" / ")}`);
    }
  }

  console.log(
    result.blocking
      ? "\n判定: ❌ 転写漏れあり — コミット禁止。漏れを転写してから再実行すること。"
      : "\n判定: ✅ 漏れなし — 次のフェーズに進んでよい。"
  );
  return result.blocking ? 1 : 0;
}

process.exitCode = main();
