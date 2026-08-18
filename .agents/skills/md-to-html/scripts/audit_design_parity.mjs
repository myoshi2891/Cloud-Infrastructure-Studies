#!/usr/bin/env node
/**
 * 生成された単一ファイル HTML が、デザインの正（原本 HTML）と同じデザインシステム・
 * 同じ構造規約で組まれているかを機械照合する監査スクリプト。
 *
 * 依存パッケージなし。node / bun どちらでも動く（ESM）。
 *
 * 使い方:
 *   node .claude/skills/md-to-html/scripts/audit_design_parity.mjs <page.html>
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
const DEFAULT_REFERENCE = "Certified-Associate-in-Project-Management.html";

/** ページに必ず存在しなければならない描画 JS の関数。 */
const REQUIRED_FUNCTIONS = [
  "extendViewBoxHeight",
  "renderAllDiagrams",
  "setupSidebarHighlight",
  "setupMobileToggle",
];

/** CDN から読み込む資産。`pattern` に一致する tag が `count` 個必要。 */
const REQUIRED_ASSETS = [
  { name: "@tabler/icons-webfont", pattern: /@tabler\/icons-webfont@/, count: 1 },
  { name: "@fontsource/source-serif-4", pattern: /@fontsource\/source-serif-4@/, count: 3 },
  { name: "mermaid", pattern: /\/mermaid@/, count: 1 },
];

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
 * Extracts the `themeVariables` declaration of the Mermaid initialisation call.
 * @param {string} src - The complete HTML source.
 * @returns {Map<string, string>|null} The theme variables, or null when the block is absent or incomplete.
 */
function collectThemeVariables(src) {
  const declaration = /themeVariables\s*:\s*\{/.exec(src);
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

  const variables = new Map();
  const body = src.slice(bodyStart, bodyEnd);
  for (const entry of body.matchAll(/([\w-]+)\s*:\s*["']([^"']*)["']/g)) {
    variables.set(entry[1], entry[2]);
  }
  return variables;
}

// --------------------------------------------------------------------------
// 構造
// --------------------------------------------------------------------------

/**
 * Collects the sidebar navigation entries.
 * @param {string} src - The complete HTML source.
 * @returns {Array<{id: string, icon: string}>} The anchor targets and their icons in document order.
 */
function collectNavEntries(src) {
  const nav = /<ul class="sidebar-nav">([\s\S]*?)<\/ul>/.exec(src);
  if (nav === null) return [];
  return [...nav[1].matchAll(/<a\s+href="#([^"]+)"[^>]*>\s*<i class="ti (ti-[\w-]+)"><\/i>/g)].map(
    (match) => ({ id: match[1], icon: match[2] })
  );
}

/**
 * Collects the content sections with their eyebrow icon and number.
 * @param {string} src - The complete HTML source.
 * @returns {Array<{id: string, icon: string|null, number: string|null}>} The sections in document order.
 */
function collectSections(src) {
  const sections = [];
  const sectionRe = /<section id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
  let match = sectionRe.exec(src);
  while (match !== null) {
    const eyebrow = /<div class="section-eyebrow">\s*<i class="ti (ti-[\w-]+)"><\/i>\s*([^<]*)</.exec(
      match[2]
    );
    sections.push({
      id: match[1],
      icon: eyebrow === null ? null : eyebrow[1],
      number: eyebrow === null ? null : eyebrow[2].trim(),
    });
    match = sectionRe.exec(src);
  }
  return sections;
}

/**
 * Collects the `DIAGRAMS` keys declared in the inline script.
 * @param {string} src - The complete HTML source.
 * @returns {string[]} The diagram identifiers in declaration order.
 */
function collectDiagramKeys(src) {
  const block = /var\s+DIAGRAMS\s*=\s*\{([\s\S]*?)\n\s*\};/.exec(src);
  if (block === null) return [];
  return [...block[1].matchAll(/(?:^|,)\s*["']?([A-Za-z_$][\w$]*)["']?\s*:\s*`/g)].map(
    (match) => match[1]
  );
}

// --------------------------------------------------------------------------
// 検査
// --------------------------------------------------------------------------

/**
 * Runs every design parity check.
 * @param {string} page - The page HTML source.
 * @param {string} reference - The reference HTML source.
 * @param {boolean} isTemplate - Whether the page is the skeleton template rather than a finished page.
 * @returns {{findings: Array<{category: string, detail: string}>, blocking: boolean}} The findings.
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
    ...(page.match(/<link\b[^>]*cdn\.jsdelivr\.net[^>]*>/g) ?? []),
    ...(page.match(/<script\b[^>]*cdn\.jsdelivr\.net[^>]*>/g) ?? []),
  ].filter((tag) => !/rel="(?:preconnect|dns-prefetch)"/.test(tag));
  for (const { name, pattern, count } of REQUIRED_ASSETS) {
    const matched = assetTags.filter((tag) => pattern.test(tag));
    if (matched.length !== count) {
      add("cdn", `${name} の読み込みが ${count} 件必要ですが ${matched.length} 件です`);
    }
  }
  for (const tag of assetTags) {
    const url = /(?:href|src)="([^"]+)"/.exec(tag)?.[1] ?? tag;
    if (!/@\d+\.\d+\.\d+/.test(url)) {
      add("cdn", `バージョンが完全固定されていません（@latest / メジャー指定は不可）: ${url}`);
    }
    if (!/integrity="sha(?:256|384|512)-[\w+/=]+"/.test(tag)) {
      add("cdn", `integrity 属性がありません: ${url}`);
    }
    if (!/crossorigin=/.test(tag)) {
      add("cdn", `crossorigin 属性がありません: ${url}`);
    }
  }

  // --- 6. 描画 JS ----------------------------------------------------------
  for (const name of REQUIRED_FUNCTIONS) {
    if (!new RegExp(`function\\s+${name}\\s*\\(`).test(page)) {
      add("javascript", `描画 JS の関数が欠落しています: ${name}()`);
    }
  }
  if (!/addEventListener\("DOMContentLoaded"/.test(page)) {
    add("javascript", "DOMContentLoaded による初期化の配線がありません");
  }
  if (!/flowchart\s*:\s*\{[^}]*useMaxWidth\s*:\s*false/.test(page)) {
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

  const headingCount = (page.match(/<h1\b/g) ?? []).length;
  if (headingCount !== 1) {
    add("structure", `h1 はちょうど 1 個である必要がありますが ${headingCount} 個です`);
  }

  const navEntries = collectNavEntries(page);
  const sections = collectSections(page);
  const navIds = new Set(navEntries.map((entry) => entry.id));
  const sectionIds = new Set(sections.map((section) => section.id));
  for (const id of navIds) {
    if (!sectionIds.has(id)) add("structure", `サイドバーのリンク先セクションが存在しません: #${id}`);
  }
  for (const id of sectionIds) {
    if (!navIds.has(id)) add("structure", `サイドバーに載っていないセクションがあります: #${id}`);
  }

  const iconById = new Map(navEntries.map((entry) => [entry.id, entry.icon]));
  sections.forEach((section, index) => {
    if (section.icon === null) {
      add("structure", `.section-eyebrow がありません: #${section.id}`);
      return;
    }
    const navIcon = iconById.get(section.id);
    if (navIcon !== undefined && navIcon !== section.icon) {
      add(
        "structure",
        `サイドバーとセクションでアイコンが異なります: #${section.id} — nav ${navIcon} / eyebrow ${section.icon}`
      );
    }
    const expected = `SECTION ${String(index + 1).padStart(2, "0")}`;
    if (section.number !== expected) {
      add("structure", `.section-eyebrow の採番が連番ではありません: #${section.id} — 期待 "${expected}" / 実際 "${section.number}"`);
    }
  });

  const tableCount = (page.match(/<table\b/g) ?? []).length;
  const wrappedCount = (page.match(/<div class="table-wrap">\s*<table\b/g) ?? []).length;
  if (tableCount !== wrappedCount) {
    add("structure", `.table-wrap に包まれていない table があります（table ${tableCount} / wrap ${wrappedCount}）`);
  }

  const diagramKeys = new Set(collectDiagramKeys(page));
  const containerIds = new Set(
    [...page.matchAll(/class="diagram-container"[^>]*\bid="([^"]+)"/g)].map((match) => match[1])
  );
  for (const id of containerIds) {
    if (!diagramKeys.has(id)) add("structure", `DIAGRAMS に定義のない図コンテナがあります: #${id}`);
  }
  for (const key of diagramKeys) {
    if (!containerIds.has(key)) add("structure", `描画先コンテナのない DIAGRAMS のキーがあります: ${key}`);
  }

  for (const anchor of page.match(/<a\b[^>]*href="https?:\/\/[^"]*"[^>]*>/g) ?? []) {
    const href = /href="([^"]+)"/.exec(anchor)?.[1] ?? "";
    if (!/target="_blank"/.test(anchor)) {
      add("structure", `外部リンクに target="_blank" がありません: ${href}`);
    }
    if (!/rel="[^"]*noopener/.test(anchor)) {
      add("structure", `外部リンクに rel="noopener" がありません: ${href}`);
    }
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
