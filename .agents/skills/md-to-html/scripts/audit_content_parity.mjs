#!/usr/bin/env node
/**
 * 原本 Markdown（内容の正）と生成された単一ファイル HTML（公開用）の文言を
 * 機械照合し、転写漏れを検出する監査スクリプト。
 *
 * 依存パッケージなし。node / bun どちらでも動く（ESM）。
 *
 * 使い方:
 *   node .claude/skills/md-to-html/scripts/audit_content_parity.mjs \
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
 */

import { readFileSync } from "node:fs";

/** Mermaid ラベル片の照合下限。これより短い断片は偶然一致しやすく、指摘の精度が落ちる。 */
const SEGMENT_MIN_LENGTH = 6;

/** 存在判定のフォールバックで使う下限。偽陽性を避けるため本判定より緩く取る。 */
const SURVIVAL_SEGMENT_MIN_LENGTH = 3;

/** `DIAGRAMS` に書いてよい配色。`references/design-system.md` の 3 役 + 既定色。 */
const APPROVED_DIAGRAM_COLORS = new Set([
  "#eef1f8", // box / step の塗り（indigo tint）
  "#2e3f72", // box / step の線（indigo）
  "#faf1df", // hub の塗り（gold tint）
  "#b8802a", // hub の線（gold）
  "#eaf4ec", // done の塗り（success bg）
  "#2f6b3d", // done の線（success text）
  "#161b26", // ラベル文字色（ink）
  "#ffffff", // 図中の白抜き
  "#dfe3ea", // 外周線（border）
]);

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
 * Creates a comparison key that ignores whitespace, leading numbering, punctuation, and letter case.
 *
 * 全角→半角の正規化（`（）`→`()` 等）は NFKC が吸収し、括弧・句読点はここで除去される。
 * したがって `references/conversion-rules.md` の句読点正規化は漏れとして検出されない。
 *
 * @param {string} raw - The display text to normalize for comparison.
 * @returns {string} The normalized comparison key.
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
 * Removes Markdown links, images, and inline HTML from a fragment.
 * @param {string} raw - The raw Markdown inline fragment.
 * @returns {string} The fragment with links, images, and HTML tags removed.
 */
function stripMarkdownInline(raw) {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ");
}

/**
 * Normalizes a URL for comparison.
 * @param {string} url - The raw URL string.
 * @returns {string} The URL with HTML character references decoded and all URL semantics preserved.
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
 * Extracts node, edge, pie, title, and subgraph labels from Mermaid source.
 * @param {string} source - The Mermaid diagram source.
 * @returns {string[]} The raw label strings in occurrence order.
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
 * Splits a text into the wording segments that must survive somewhere on the page.
 *
 * 空白 / `<br/>` / ` - ` / 区切り記号 で分かれた各片を独立した語句として扱う。
 * 見出しや図のラベルは、情報設計やレイアウトの都合で並べ替え・分割・短縮されうる
 * （`## 6. ドメイン1: X（36%）` → `.domain-tag` + `<h2>X</h2>` など）。
 * 全文一致を求めると正当な再型付けを漏れと誤判定するため、片単位で存在を確認する。
 * 逆に、短縮された語句がページのどこにも残っていないなら、それは文言の消失である。
 *
 * @param {string} text - The raw text.
 * @returns {string[]} The comparison keys of each segment worth checking.
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
 * Extracts structural elements from Markdown source.
 * @param {string} src - The complete Markdown source.
 * @returns {object} The inventory of headings, paragraphs, list items, table rows, links, and diagrams.
 */
function inventoryMarkdown(src) {
  const headings = [];
  const listTexts = [];
  const tableRowTexts = [];
  const paragraphTexts = [];
  const mermaidSources = [];

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

    const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (heading) {
      flushParagraph();
      headings.push({ level: heading[1].length, text: normalize(stripMarkdownInline(heading[2])) });
      continue;
    }
    const listItem = /^\s*(?:[-*+]|\d+\.)\s+(\S.*)$/.exec(line);
    if (listItem) {
      flushParagraph();
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
      /^\s*>/.test(line) ||
      /^\s*\|?\s*:?-{3,}/.test(line)
    ) {
      flushParagraph();
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
    mermaidSources,
    externalLinks: collectUrls(src),
  };
}

/**
 * Extracts the `DIAGRAMS` entries from the page's inline script.
 * @param {string} src - The complete HTML source.
 * @returns {Array<{id: string, source: string}>} The diagram ids and sources in declaration order.
 */
function extractDiagramEntries(src) {
  const block = /var\s+DIAGRAMS\s*=\s*\{([\s\S]*?)\n\s*\};/.exec(src);
  if (block === null) return [];
  const entries = [];
  const entryRe = /(?:^|,)\s*["']?([A-Za-z_$][\w$]*)["']?\s*:\s*`([\s\S]*?)`/g;
  let entry = entryRe.exec(block[1]);
  while (entry !== null) {
    entries.push({ id: entry[1], source: entry[2] });
    entry = entryRe.exec(block[1]);
  }
  return entries;
}

/**
 * Builds an inventory of the visible content of a generated HTML page.
 * @param {string} src - The complete HTML source.
 * @returns {object} The inventory of headings, paragraphs, list items, table rows, links, and diagrams.
 */
function inventoryHtml(src) {
  const diagrams = extractDiagramEntries(src);
  // 本文は <style> / <script> を除いた領域から採る。図のソースは別枠で保持する。
  const body = src.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ");

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
    listTexts: extractTagContents(body, "li").map((content) => normalize(stripMarkup(content))),
    tableRowTexts: extractTagContents(body, "tr").map((content) => normalize(stripMarkup(content))),
    paragraphTexts: extractTagContents(body, "p").map((content) => normalize(stripMarkup(content))),
    // 図のラベルもページ上に現れる文言なので、包含判定の対象テキストに含める。
    pageText: matchKey(`${stripMarkup(body)} ${diagramText}`),
    diagrams,
    diagramContainerIds: [...body.matchAll(/class="diagram-container"[^>]*\bid="([^"]+)"/g)].map(
      (m) => m[1]
    ),
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
 * Determines whether a source text survives anywhere in the page.
 *
 * まとまりのまま残っていれば合格。並べ替え・分割された場合に備えて、
 * 語句単位で全ての片が残っているかもフォールバックとして判定する。
 *
 * @param {string} text - The source text.
 * @param {string} pageText - The flattened page text.
 * @returns {boolean} True when the text is short enough to skip or survives in the page.
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
 * Compares the Markdown source and the generated page.
 * @param {object} source - The Markdown inventory.
 * @param {object} page - The HTML inventory.
 * @returns {object} The comparison result including blocking status.
 */
function compare(source, page) {
  // 見出しは階層で扱いを分ける。
  //   h1 / h2 = 原本のセクション見出し。消えていればセクションごと落ちた可能性が高く blocking。
  //   h3 以下 = `.step-title` / callout のラベル / `.domain-tag` へ再型付けされるのが正常な
  //             変換であり（CAPM 実績で 12 件）、blocking にすると偽陽性で監査が形骸化する。
  //             本文（段落・リスト・表行）の照合が別途 blocking なので、本文の消失は見逃さない。
  const absentHeadings = source.headings.filter(
    (heading) => !survivesInPage(heading.text, page.pageText)
  );
  const missingHeadings = absentHeadings.filter((heading) => heading.level <= 2);
  const missingSubHeadings = absentHeadings.filter((heading) => heading.level > 2);

  // レベル変更は blocking にしない（再型付けは正当）。ただし必ず目に触れるよう列挙する。
  const pageHeadingKeys = new Map();
  for (const heading of page.headings) {
    const key = matchKey(heading.text);
    if (!pageHeadingKeys.has(key)) pageHeadingKeys.set(key, heading.level);
  }
  const retypedHeadings = source.headings
    .filter((heading) => survivesInPage(heading.text, page.pageText))
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

  const diagramCounts = {
    markdownFences: source.mermaidSources.length,
    diagramsKeys: page.diagrams.length,
    containers: page.diagramContainerIds.length,
  };
  const diagramCountMatch =
    diagramCounts.markdownFences === diagramCounts.diagramsKeys &&
    diagramCounts.diagramsKeys === diagramCounts.containers;

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
  // `DIAGRAMS` の宣言順は文書順と一致しないため、`.diagram-container` の出現順に並べ替えて
  // 原本の fence 順と突き合わせる（宣言順のまま zip すると別の図同士を比較してしまう）。
  const diagramsById = new Map(page.diagrams.map((diagram) => [diagram.id, diagram]));
  const orderedPageDiagrams = page.diagramContainerIds
    .map((id) => diagramsById.get(id))
    .filter((diagram) => diagram !== undefined);
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
    diagrams: { source: diagramCounts.markdownFences, page: diagramCounts.diagramsKeys },
  };

  const blocking =
    missingHeadings.length > 0 ||
    missingParagraphs.length > 0 ||
    missingListItems.length > 0 ||
    missingTableRows.length > 0 ||
    missingLinks.length > 0 ||
    missingDiagramLabels.length > 0 ||
    unapprovedColors.length > 0 ||
    !diagramCountMatch;

  return {
    missingHeadings,
    missingParagraphs,
    missingListItems,
    missingTableRows,
    missingLinks,
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
 * Prints a blocking finding list when it is non-empty.
 * @param {string} title - The section title.
 * @param {Array} items - The findings.
 * @param {(item: unknown) => string} format - Formats a single finding.
 * @returns {void}
 */
function printFindings(title, items, format) {
  if (items.length === 0) return;
  console.log(`\n❌ ${title} (${items.length} 件):`);
  for (const item of items) console.log(`  ${format(item)}`);
}

/**
 * Runs the audit as a command-line program.
 * @returns {number} The process exit code.
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
    "ページのどこにも残っていない Mermaid ラベルの語句",
    result.missingDiagramLabels,
    (m) => `図${m.diagram} "${m.label}" → 消失: "${m.segment}"`
  );
  printFindings(
    "デザインシステム外の配色が DIAGRAMS に混入",
    result.unapprovedColors,
    (c) => `${c.id}: ${c.color}`
  );

  if (!result.diagramCountMatch) {
    console.log("\n❌ Mermaid 図の数が一致しません:");
    console.log(
      `  原本の fence=${result.diagramCounts.markdownFences} / ` +
        `DIAGRAMS のキー=${result.diagramCounts.diagramsKeys} / ` +
        `.diagram-container=${result.diagramCounts.containers}`
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

process.exit(main());
