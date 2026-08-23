#!/usr/bin/env node
/**
 * 生成された単一ファイル HTML が、デザインの正（原本 HTML）と同じデザインシステム・
 * 同じ構造規約で組まれているかを機械照合する監査スクリプト。
 *
 * 依存パッケージなし。node / bun どちらでも動く（ESM）。
 *
 * 使い方:
 *   bun .agents/skills/md-to-html/scripts/audit_design_parity.mjs <page.html>
 *   ... --reference Certified-Associate-in-Project-Management.html
 *   ... --template     # テンプレート自身の健全性検査（マーカーと本文構造の検査を省く）
 *   ... --json
 *
 * 終了コード:
 *   0 = デザイン漏れなし
 *   1 = デザイン漏れあり
 *   2 = 引数エラー / ファイル未検出
 *
 * 検査するのは「バイト単位の同一性」ではなく「デザインシステムの同一性」である。
 * CSS 変数の値・コンポーネント CSS のセレクタ・メディアクエリ・Mermaid の themeVariables・
 * 描画 JS の構成・CDN の固定と SRI・そして本文構造の不変条件を対象にする。
 */

import { readFileSync } from "node:fs";

/** 既定の参照元（デザインの正）。 */
const DEFAULT_REFERENCE = "Gcp-pca-section4-process-optimization.html";

/** ページに必ず存在しなければならない描画 JS の関数。 */
const REQUIRED_FUNCTIONS = ["initMermaid", "healOverflowingLabels"];

/** インラインの配線（名前付き関数ではない）。`pattern` に一致しなければ欠落とみなす。 */
const REQUIRED_WIRINGS = [
  { name: "スクロールスパイ", pattern: /new\s+IntersectionObserver\s*\(/ },
  { name: "サイドバートグル", pattern: /getElementById\(\s*["']sidebarToggle["']\s*\)/ },
  { name: "チェックリスト進捗", pattern: /querySelectorAll\(\s*["']\.checklist-card["']\s*\)/ },
];

/**
 * CDN から読み込む資産。`pattern` に一致する tag が `count` 個必要。
 *
 * 読み込み自体は必須だが、`SRI_EXEMPT_HOST` に該当するものはバージョン固定・SRI を要求しない。
 * Google Fonts の CSS は UA ごとに異なる応答（配信される woff2 の組み合わせが変わる）を
 * 返すため integrity ハッシュを一意に決められない。
 */
const REQUIRED_ASSETS = [
  // `pinnedToReference` を付けた資産は、`src` と `integrity` の**組**まで参照元に一致させる。
  // 片方だけ書き換わった tag（例: ホストを cdnjs へ替えて integrity を据え置き、
  // バージョンだけ上げてハッシュを据え置き）は静的検査を通り抜けるが、ブラウザは
  // digest 不一致で資産を丸ごとブロックし、図が Mermaid ソースのまま残る。
  { name: "mermaid", pattern: /\/mermaid[@/]/, count: 1, pinnedToReference: true },
  {
    name: "Noto Sans JP",
    pattern: /fonts\.googleapis\.com\/css2\?family=Noto\+Sans\+JP/,
    count: 1,
  },
];

/** バージョン固定と SRI の検査から外すホスト。 */
const SRI_EXEMPT_HOST = /fonts\.googleapis\.com|fonts\.gstatic\.com/;

/**
 * SRI と両立しないホスト。
 *
 * cdnjs は事前圧縮した brotli 変種の末尾改行 1 バイトが欠けており、identity 応答と
 * バイト列が一致しない。SRI はデコード後のバイト列で検証されるため、どちらの変種から
 * 算出したハッシュでも他方の応答で digest 不一致となり、資産が丸ごとブロックされる。
 * SRI を付ける資産は jsdelivr（encoding をまたいでバイト同一）から読み込む。
 */
const SRI_INCOMPATIBLE_HOST = /cdnjs\.cloudflare\.com/;

/**
 * Extracts the identity of a CDN asset tag: its URL and integrity hash.
 * @param {string} tag - The `link` or `script` tag.
 * @returns {string} The `<url> <integrity>` pair used for reference comparison.
 */
function assetIdentity(tag) {
  const url = /(?:href|src)="([^"]+)"/.exec(tag)?.[1] ?? "";
  const integrity = /integrity="([^"]+)"/.exec(tag)?.[1] ?? "";
  return `${url} ${integrity}`;
}

// --------------------------------------------------------------------------
// CSS
// --------------------------------------------------------------------------

/**
 * Extracts the concatenated contents of every `style` element.
 * @param {string} src - The complete HTML source.
 * @returns {string} The stylesheet text with comments removed.
 */
function extractStyle(src) {
  return [...src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1])
    .join("\n")
    .replace(/\/\*[\s\S]*?\*\//g, "");
}

/**
 * Collects the custom properties declared on the `:root` selector.
 * @param {string} css - The stylesheet text.
 * @returns {Map<string, string>} The custom property names mapped to their declared values.
 */
function collectRootVariables(css) {
  const variables = new Map();
  for (const block of css.matchAll(/:root\s*\{([^}]*)\}/g)) {
    for (const declaration of block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      variables.set(declaration[1], declaration[2].replace(/\s+/g, " ").trim());
    }
  }
  return variables;
}

/**
 * Collects every style rule with its at-rule context.
 *
 * ブレースを数えながら走査する。`@media` 内のネストしたルールも、外側の prelude を
 * 文脈として保持したまま平坦化して取り出す。
 *
 * @param {string} css - The stylesheet text.
 * @returns {{rules: Set<string>, atRules: Set<string>}} The context-qualified selectors and at-rule preludes.
 */
function collectRules(css) {
  const rules = new Set();
  const atRules = new Set();
  const stack = [];
  let buffer = "";
  let quote = null;
  let escaped = false;

  for (const character of css) {
    if (quote !== null) {
      buffer += character;
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      buffer += character;
      continue;
    }
    if (character === "{") {
      const head = buffer.trim().replace(/\s+/g, " ");
      stack.push(head);
      if (head.startsWith("@")) {
        atRules.add(head);
      } else if (head.length > 0) {
        const context = stack.filter((entry) => entry.startsWith("@")).join(" ");
        rules.add(context.length > 0 ? `${context} || ${head}` : head);
      }
      buffer = "";
      continue;
    }
    if (character === "}") {
      stack.pop();
      buffer = "";
      continue;
    }
    buffer += character;
  }
  return { rules, atRules };
}

// --------------------------------------------------------------------------
// JS / Mermaid
// --------------------------------------------------------------------------

/**
 * Extracts the contents of an object literal assigned to a property.
 *
 * @param {string} src - The source containing the object literal.
 * @param {string} key - The property name to locate.
 * @return {string|null} The object contents, or `null` if the object is absent or incomplete.
 */
function extractObjectBody(src, key) {
  const declaration = new RegExp(`${key}\\s*:\\s*\\{`).exec(src);
  if (declaration === null) return null;

  const bodyStart = declaration.index + declaration[0].length;
  let depth = 1;
  let quote = null;
  let escaped = false;
  let bodyEnd = -1;
  for (let index = bodyStart; index < src.length; index += 1) {
    const character = src[index];
    if (quote !== null) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        bodyEnd = index;
        break;
      }
    }
  }
  if (bodyEnd < 0) return null;

  return src.slice(bodyStart, bodyEnd);
}

/**
 * Extracts Mermaid theme variables from the HTML source.
 * @param {string} src - The complete HTML source.
 * @return {Map<string, string>|null} The theme variables, or null when no theme variables block is found.
 */
function collectThemeVariables(src) {
  const body = extractObjectBody(src, "themeVariables");
  if (body === null) return null;

  const variables = new Map();
  for (const entry of body.matchAll(/([\w-]+)\s*:\s*["']([^"']*)["']/g)) {
    variables.set(entry[1], entry[2]);
  }
  return variables;
}

// --------------------------------------------------------------------------
// 構造
// --------------------------------------------------------------------------

/**
 * Returns the full HTML source with the contents of `script` and `style` elements
 * replaced by spaces (the tags themselves are kept, so offsets are preserved).
 *
 * 描画 JS や CSS は `card.querySelectorAll('input[type="checkbox"]')` のように
 * セレクタ文字列として本文と同じ字面を含む。本文だけを数える走査は必ずここを通す。
 *
 * @param {string} src - The complete HTML source.
 * @returns {string} The full source with `script`/`style` element contents blanked out.
 */
function extractBody(src) {
  return src.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ");
}

/**
 * Collects the sidebar navigation targets in document order.
 * @param {string} src - The document body to inspect.
 * @returns {string[]} Decoded fragment identifiers from sidebar navigation links.
 */
function collectNavTargets(src) {
  const nav = /<nav\b[^>]*id="sidebarNav"[^>]*>([\s\S]*?)<\/nav>/.exec(src);
  if (nav === null) return [];
  return [...nav[1].matchAll(/<a\s[^>]*href="#([^"]+)"/g)].map((match) =>
    decodeURIComponent(match[1])
  );
}

/**
 * Collects the decoded IDs of `h2` and `h3` headings in document order.
 * @param {string} src - The document body to inspect.
 * @return {string[]} The heading IDs.
 */
function collectHeadingIds(src) {
  return [...src.matchAll(/<h[23]\s[^>]*id="([^"]+)"/g)].map((match) =>
    decodeURIComponent(match[1])
  );
}

/**
 * Collects identifiers from reference cards in document order.
 * @param {string} src - The document body to inspect.
 * @return {string[]} The identifiers of elements with the `ref-card` class.
 */
function collectReferenceCardIds(src) {
  const ids = [];
  // 属性の並び順で見分けない。整形によって `id` が `class` より前へ来ることがあり、
  // 並び順に依存した走査はそのカードを取りこぼして連番検査を黙って無効化する。
  for (const tag of src.match(/<div\s[^>]*>/g) ?? []) {
    if (!/\bclass="[^"]*\bref-card\b[^"]*"/.test(tag)) continue;
    ids.push(/\bid="([^"]*)"/.exec(tag)?.[1] ?? "");
  }
  return ids;
}

/**
 * Collects the checklist cards with their advertised and actual item counts.
 * @param {string} src - The document body (`extractBody` の戻り値)。
 * @returns {Array<{advertised: string|null, declared: number|null, actual: number}>} The checklist cards.
 */
function collectChecklists(src) {
  const cards = [];
  // `.checklist-card` は入れ子にならない。カードの項目は直後の <ul>…</ul> に収まる。
  const parts = src.split(/<div class="checklist-card">/).slice(1);
  for (const part of parts) {
    const advertised = /<span class="count">([^<]*)<\/span>/.exec(part)?.[1] ?? null;
    // 「表記が無い」と「表記はあるが数値を読めない」を区別する。後者を null へ潰すと
    // 表記の崩れたカードで実数照合そのものが黙って無効化される（readPillCount と同じ理由）。
    const declaredMatch = advertised === null ? null : /(\d+)\s*完了/.exec(advertised);
    const list = /<ul\b[^>]*>([\s\S]*?)<\/ul>/.exec(part);
    cards.push({
      advertised,
      declared: declaredMatch === null ? null : Number(declaredMatch[1]),
      actual: (list === null ? "" : list[1]).match(/type="checkbox"/g)?.length ?? 0,
    });
  }
  return cards;
}

/**
 * Reads the advertised count from a labeled hero pill.
 * @param {string} src - The document body to inspect.
 * @param {string} label - The pill label preceding its advertised count.
 * @returns {{present: boolean, count: number|null, text: string|null}} The pill's presence, parsed count, and displayed text.
 */
function readPillCount(src, label) {
  const pill = new RegExp(`<span class="pill">\\s*${label}[^<]*<strong>([\\s\\S]*?)<\\/strong>`).exec(
    src
  );
  if (pill === null) return { present: false, count: null, text: null };
  const text = pill[1].trim();
  const number = /(\d+)/.exec(text);
  return { present: true, count: number === null ? null : Number(number[1]), text };
}

/**
 * Audits a page against a reference HTML document for design, asset, rendering, and structural parity.
 * @param {string} page - The page HTML source.
 * @param {string} reference - The reference HTML source.
 * @param {boolean} isTemplate - Whether the page is a skeleton template whose content markers and structure are exempt from validation.
 * @returns {{findings: Array<{category: string, detail: string}>, blocking: boolean}} Findings grouped by category and whether any findings block parity.
 */
function audit(page, reference, isTemplate) {
  const findings = [];
  const add = (category, detail) => findings.push({ category, detail });

  // --- 1. 未置換のプレースホルダ / マーカー -------------------------------
  if (!isTemplate) {
    // プレースホルダ名には数字も含まれる（`{{HERO_H1}}`）。文字クラスから数字を落とすと
    // 未置換のまま通過してしまうため `0-9` を必ず含める。
    for (const marker of new Set(page.match(/\{\{[A-Z0-9_]+\}\}/g) ?? [])) {
      add("markers", `未置換のプレースホルダが残っています: ${marker}`);
    }
    for (const marker of new Set(page.match(/##[A-Z0-9_]+##/g) ?? [])) {
      add("markers", `未削除の挿入マーカーが残っています: ${marker}`);
    }
  }

  // --- 2. CSS カスタムプロパティ -----------------------------------------
  const pageCss = extractStyle(page);
  const referenceCss = extractStyle(reference);
  const pageVariables = collectRootVariables(pageCss);
  const referenceVariables = collectRootVariables(referenceCss);
  for (const [name, value] of referenceVariables) {
    if (!pageVariables.has(name)) {
      add("css-variables", `CSS 変数が欠落しています: ${name}`);
      continue;
    }
    if (pageVariables.get(name) !== value) {
      add(
        "css-variables",
        `CSS 変数の値が原本と異なります: ${name} — 原本 "${value}" / ページ "${pageVariables.get(name)}"`
      );
    }
  }

  // --- 3. コンポーネント CSS のセレクタ ------------------------------------
  const pageRules = collectRules(pageCss);
  const referenceRules = collectRules(referenceCss);
  for (const selector of referenceRules.rules) {
    if (!pageRules.rules.has(selector)) {
      add("css-rules", `コンポーネント CSS のセレクタが欠落しています: ${selector}`);
    }
  }

  // --- 4. メディアクエリ ---------------------------------------------------
  for (const atRule of referenceRules.atRules) {
    if (!pageRules.atRules.has(atRule)) {
      add("media-queries", `メディアクエリが欠落しています: ${atRule}`);
    }
  }

  // --- 5. CDN の固定と SRI -------------------------------------------------
  // `preconnect` / `dns-prefetch` は資産の取得ではなく接続のヒントなので、
  // バージョン固定・SRI の対象から外す。
  const assetTags = [
    ...(page.match(/<link\b[^>]*>/g) ?? []),
    ...(page.match(/<script\b[^>]*src="[^"]*"[^>]*>/g) ?? []),
  ].filter(
    (tag) => /https?:\/\//.test(tag) && !/rel="(?:preconnect|dns-prefetch)"/.test(tag)
  );
  const referenceAssetTags = [
    ...(reference.match(/<link\b[^>]*>/g) ?? []),
    ...(reference.match(/<script\b[^>]*src="[^"]*"[^>]*>/g) ?? []),
  ].filter(
    (tag) => /https?:\/\//.test(tag) && !/rel="(?:preconnect|dns-prefetch)"/.test(tag)
  );
  for (const { name, pattern, count, pinnedToReference } of REQUIRED_ASSETS) {
    const matched = assetTags.filter((tag) => pattern.test(tag));
    if (matched.length !== count) {
      add("cdn", `${name} の読み込みが ${count} 件必要ですが ${matched.length} 件です`);
    }
    if (!pinnedToReference) continue;
    const referenceMatched = referenceAssetTags.filter((tag) => pattern.test(tag));
    // 件数が食い違う場合は上の検査（あるいは参照元自体の不備）の問題なので、
    // ここでは重ねて報告しない。
    if (matched.length !== 1 || referenceMatched.length !== 1) continue;
    const pageRef = assetIdentity(matched[0]);
    const referenceRef = assetIdentity(referenceMatched[0]);
    if (pageRef !== referenceRef) {
      add(
        "cdn",
        `${name} の src と integrity の組が参照元と一致しません（SRI はデコード後のバイト列で` +
          `検証されるため、組が崩れると資産ごとブロックされ図が Mermaid ソースのまま残る）。` +
          `page: ${pageRef} / 参照元: ${referenceRef}`
      );
    }
  }
  for (const tag of assetTags) {
    const url = /(?:href|src)="([^"]+)"/.exec(tag)?.[1] ?? tag;
    if (SRI_EXEMPT_HOST.test(url)) continue;
    // 完全な x.y.z が区切り文字で囲まれている場合だけ「固定済み」と認める。
    // 境界を張らないと `@11.13.0.4` や `@11.13.02` の先頭一致で通過してしまう。
    if (!/@\d+\.\d+\.\d+(?![\w.])|\/\d+\.\d+\.\d+\//.test(url)) {
      add("cdn", `バージョンが完全固定されていません（@latest / メジャー指定は不可）: ${url}`);
    }
    if (!/integrity="sha(?:256|384|512)-[\w+/=]+"/.test(tag)) {
      add("cdn", `integrity 属性がありません: ${url}`);
    }
    if (!/(?:^|\s)crossorigin(?=[\s=>/]|$)/i.test(tag)) {
      add("cdn", `crossorigin 属性がありません: ${url}`);
    }
    if (SRI_INCOMPATIBLE_HOST.test(url)) {
      add(
        "cdn",
        `integrity を付けた cdnjs 参照は使えません（brotli 変種とバイト列が一致せずブロックされる）。jsdelivr を使ってください: ${url}`
      );
    }
  }

  // --- 6. 描画 JS ----------------------------------------------------------
  for (const name of REQUIRED_FUNCTIONS) {
    if (!new RegExp(`function\\s+${name}\\s*\\(`).test(page)) {
      add("javascript", `描画 JS の関数が欠落しています: ${name}()`);
    }
  }
  for (const { name, pattern } of REQUIRED_WIRINGS) {
    if (!pattern.test(page)) {
      add("javascript", `${name}の配線がありません`);
    }
  }
  // キーの並び順やネストしたオブジェクトに依存させない。`[^}]*` で走査すると
  // useMaxWidth の前に入れ子が 1 つ入っただけで、正しい設定を欠落と誤判定する。
  const flowchartBody = extractObjectBody(page, "flowchart");
  if (flowchartBody === null || !/(?:^|[{,\s])useMaxWidth\s*:\s*false\b/.test(flowchartBody)) {
    add("javascript", "mermaid の flowchart.useMaxWidth が false に設定されていません");
  }
  const pageTheme = collectThemeVariables(page);
  const referenceTheme = collectThemeVariables(reference);
  if (referenceTheme === null) {
    add("mermaid-theme", "原本 HTML から themeVariables を抽出できません");
  } else {
    for (const [name, value] of referenceTheme) {
      if (pageTheme?.get(name) !== value) {
        add(
          "mermaid-theme",
          `themeVariables が原本と異なります: ${name} — 原本 "${value}" / ページ "${pageTheme?.get(name) ?? "(未設定)"}"`
        );
      }
    }
  }

  // --- 7. 構造の不変条件 ---------------------------------------------------
  if (isTemplate) return { findings, blocking: findings.length > 0 };

  // 本文の走査は必ずこの 1 本を通す。呼び出しごとに切り出し直すと、走査ごとに
  // <script> / <style> を含めるものと含めないものが混在し、判定基準が静かにずれる。
  const body = extractBody(page);

  const headingCount = (body.match(/<h1\b/g) ?? []).length;
  if (headingCount !== 1) {
    add("structure", `h1 はちょうど 1 個である必要がありますが ${headingCount} 個です`);
  }

  // サイドバーのリンクと本文見出しは 1:1 でなければならない。
  // どちらかが欠けるとリンク切れか、目次から辿れない節になる。
  const navTargets = new Set(collectNavTargets(body));
  const headingIds = new Set(collectHeadingIds(body));
  for (const id of navTargets) {
    if (!headingIds.has(id)) {
      add("structure", `サイドバーのリンク先の見出しが存在しません: #${id}`);
    }
  }
  for (const id of headingIds) {
    if (!navTargets.has(id)) {
      add("structure", `サイドバーに載っていない見出しがあります: #${id}`);
    }
  }

  const tableCount = (body.match(/<table\b/g) ?? []).length;
  const wrappedCount = (body.match(/<div class="table-scroll">\s*<table\b/g) ?? []).length;
  if (tableCount !== wrappedCount) {
    add(
      "structure",
      `.table-scroll に包まれていない table があります（table ${tableCount} / wrap ${wrappedCount}）`
    );
  }

  // `class` の有無だけを見ると `<tr class="row">` のような別のクラスを素通ししてしまう。
  // header / odd / even のいずれかを実際に持っているかで判定する。
  // 行の走査も本文範囲で行う。<script> / <style> に `<tr>` の字面が含まれていると、
  // 本文には存在しない行をクラス欠落として報告してしまう。
  const unclassedRows = (body.match(/<tr\b[^>]*>/g) ?? []).filter((tag) => {
    const classes = /\bclass="([^"]*)"/.exec(tag)?.[1] ?? "";
    return !classes.split(/\s+/).some((name) => ["header", "odd", "even"].includes(name));
  }).length;
  if (unclassedRows > 0) {
    add("structure", `表の行に header / odd / even のクラスが付いていません: ${unclassedRows} 行`);
  }

  const pageReferenceCardIds = collectReferenceCardIds(body);
  pageReferenceCardIds.forEach((id, index) => {
    const expected = `ref${index + 1}`;
    if (id !== expected) {
      add("structure", `.ref-card の id が連番ではありません: 期待 "${expected}" / 実際 "${id}"`);
    }
  });

  const referenceIdSet = new Set(pageReferenceCardIds);
  // 脚注は属性の並び順で見分けない。整形によって `href` が `class` より前へ来ることがあり、
  // 並び順に依存した走査はその脚注を素通りさせてリンク切れを見逃す。
  for (const tag of body.match(/<a\s[^>]*>/g) ?? []) {
    if (!/\bclass="[^"]*\bfootnote-ref\b[^"]*"/.test(tag)) continue;
    const href = /\bhref="([^"]*)"/.exec(tag)?.[1] ?? null;
    if (href === null) {
      add("structure", `脚注に href がありません: ${tag.replace(/\s+/g, " ")}`);
      continue;
    }
    const target = href.replace(/^#/, "");
    if (!referenceIdSet.has(target)) {
      add("structure", `参照先の無い脚注があります: #${target}`);
    }
  }

  for (const card of collectChecklists(body)) {
    if (card.advertised === null) continue;
    if (card.declared === null) {
      add(
        "structure",
        `チェックリストの静的カウントを読み取れません: 表記 "${card.advertised}" / 実際 ${card.actual} 個`
      );
      continue;
    }
    if (card.declared !== card.actual) {
      add(
        "structure",
        `チェックリストの静的カウントが実数と一致しません: 表記 "${card.advertised}" / 実際 ${card.actual} 個`
      );
    }
  }

  const pillCount = (body.match(/<span class="pill">/g) ?? []).length;
  if (pillCount !== 4) {
    add("structure", `hero の .pill はちょうど 4 枚である必要がありますが ${pillCount} 枚です`);
  }

  const diagramCount = (body.match(/<pre class="mermaid">/g) ?? []).length;
  const advertisedDiagrams = readPillCount(body, "図解");
  if (!advertisedDiagrams.present) {
    add("structure", `hero に「図解」の .pill がありません（実際の図解数 ${diagramCount}）`);
  } else if (advertisedDiagrams.count === null) {
    add(
      "structure",
      `hero の .pill の図解数を読み取れません: 表記 "${advertisedDiagrams.text}" / 実際 ${diagramCount}`
    );
  } else if (advertisedDiagrams.count !== diagramCount) {
    add(
      "structure",
      `hero の .pill の図解数が実数と一致しません: 表記 ${advertisedDiagrams.count} / 実際 ${diagramCount}`
    );
  }

  const advertisedReferences = readPillCount(body, "参考文献");
  if (!advertisedReferences.present) {
    add(
      "structure",
      `hero に「参考文献」の .pill がありません（実際の参考文献数 ${pageReferenceCardIds.length}）`
    );
  } else if (advertisedReferences.count === null) {
    add(
      "structure",
      `hero の .pill の参考文献数を読み取れません: 表記 "${advertisedReferences.text}" / 実際 ${pageReferenceCardIds.length}`
    );
  } else if (advertisedReferences.count !== pageReferenceCardIds.length) {
    add(
      "structure",
      `hero の .pill の参考文献数が実数と一致しません: 表記 ${advertisedReferences.count} / 実際 ${pageReferenceCardIds.length}`
    );
  }

  return { findings, blocking: findings.length > 0 };
}

// --------------------------------------------------------------------------
// エントリポイント
// --------------------------------------------------------------------------

/**
 * Runs the audit as a command-line program.
 * @returns {number} The process exit code.
 */
function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((arg) => arg.startsWith("--")));
  const positional = [];
  let referencePath = DEFAULT_REFERENCE;

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--reference") {
      if (index + 1 >= args.length || args[index + 1].startsWith("--")) {
        console.error(
          "usage: audit_design_parity.mjs <page.html> [--reference <ref.html>] [--template] [--json]"
        );
        return 2;
      }
      referencePath = args[index + 1];
      index += 1;
      continue;
    }
    if (!args[index].startsWith("--")) positional.push(args[index]);
  }

  if (positional.length < 1) {
    console.error(
      "usage: audit_design_parity.mjs <page.html> [--reference <ref.html>] [--template] [--json]"
    );
    return 2;
  }

  const pagePath = positional[0];
  let pageText;
  let referenceText;
  try {
    pageText = readFileSync(pagePath, "utf8");
    referenceText = readFileSync(referencePath, "utf8");
  } catch (error) {
    console.error(`読み込み失敗: ${error instanceof Error ? error.message : String(error)}`);
    return 2;
  }

  const result = audit(pageText, referenceText, flags.has("--template"));

  const byCategory = new Map();
  for (const finding of result.findings) {
    if (!byCategory.has(finding.category)) byCategory.set(finding.category, []);
    byCategory.get(finding.category).push(finding.detail);
  }

  if (flags.has("--json")) {
    console.log(
      JSON.stringify(
        {
          page: pagePath,
          reference: referencePath,
          categories: Object.fromEntries(byCategory),
          findings: result.findings,
          blocking: result.blocking,
        },
        null,
        2
      )
    );
    return result.blocking ? 1 : 0;
  }

  console.log(`page     : ${pagePath}`);
  console.log(`reference: ${referencePath}`);

  for (const [category, details] of byCategory) {
    console.log(`\n❌ [${category}] (${details.length} 件):`);
    for (const detail of details) console.log(`  ${detail}`);
  }

  console.log(
    result.blocking
      ? "\n判定: ❌ デザイン漏れあり — コミット禁止。原本のデザインに合わせてから再実行すること。"
      : "\n判定: ✅ デザイン漏れなし — 次のフェーズに進んでよい。"
  );
  return result.blocking ? 1 : 0;
}

process.exitCode = main();
