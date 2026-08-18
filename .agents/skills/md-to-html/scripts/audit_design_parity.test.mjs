import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const auditScript = new URL("./audit_design_parity.mjs", import.meta.url);

const SRI = 'integrity="sha384-AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJJKKKKLLLL" crossorigin="anonymous"';

const STYLE = `<style>
  :root {
    --color-paper: #F6F7F9;
    --color-ink: #161B26;
    --color-indigo: #2E3F72;
  }
  body { background: var(--color-paper); }
  .callout { border-left: 4px solid var(--color-indigo); }
  .table-wrap { overflow-x: auto; }
  .diagram-container { display: flex; }
  @media (max-width: 980px) {
    .sidebar { transform: translateX(-100%); }
  }
</style>`;

const HEAD_ASSETS = `<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.46.0/dist/tabler-icons.min.css" ${SRI}>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.3.0/index.css" ${SRI}>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.3.0/600.css" ${SRI}>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.3.0/700.css" ${SRI}>`;

const SCRIPT = `<script src="https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js" ${SRI}></script>
<script>
(function () {
  var DIAGRAMS = {
roadmap: \`flowchart TB
A["最初のノード"] --> B["次のノード"]\`
  };

  function extendViewBoxHeight(svgEl, extra) { return svgEl && extra; }

  async function renderAllDiagrams() {
    mermaid.initialize({
      theme: "base",
      themeVariables: {
        primaryColor: "#EEF1F8",
        lineColor: "#2E3F72"
      },
      flowchart: {
        useMaxWidth: false
      }
    });
  }

  function setupSidebarHighlight() { return null; }
  function setupMobileToggle() { return null; }

  document.addEventListener("DOMContentLoaded", function () {
    renderAllDiagrams();
    setupSidebarHighlight();
    setupMobileToggle();
  });
})();
</script>`;

const BODY = `<nav class="sidebar" id="sidebar">
  <ul class="sidebar-nav">
    <li class="nav-group-label">はじめに</li>
    <li><a href="#overview"><i class="ti ti-certificate"></i>概要</a></li>
  </ul>
</nav>
<main class="main-content">
  <div class="hero"><h1>ガイドタイトル</h1></div>
  <section id="overview">
    <div class="section-eyebrow"><i class="ti ti-certificate"></i>SECTION 01</div>
    <h2>概要</h2>
    <div class="table-wrap"><table><tbody><tr><td>行</td></tr></tbody></table></div>
    <div class="diagram-card"><div class="diagram-container" id="roadmap"></div></div>
    <div class="callout source"><a href="https://example.com/official" target="_blank" rel="noopener">公式</a></div>
  </section>
</main>`;

const BASELINE = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ガイド</title>
${HEAD_ASSETS}
${STYLE}
</head>
<body>
${BODY}
${SCRIPT}
</body>
</html>`;

/**
 * Runs the design parity audit over a synthetic page and reference pair.
 * @param {string} pageHtml - The page fixture.
 * @param {string} [referenceHtml] - The reference fixture.
 * @param {string[]} [extraFlags] - Additional command-line flags.
 * @returns {{status: number, json: object}} The exit status and parsed JSON report.
 */
function audit(pageHtml, referenceHtml = BASELINE, extraFlags = []) {
  const fixtureDir = mkdtempSync(join(tmpdir(), "design-parity-"));
  const pagePath = join(fixtureDir, "page.html");
  const referencePath = join(fixtureDir, "reference.html");
  writeFileSync(pagePath, pageHtml);
  writeFileSync(referencePath, referenceHtml);

  const result = spawnSync(
    process.execPath,
    [auditScript.pathname, pagePath, "--reference", referencePath, "--json", ...extraFlags],
    { encoding: "utf8" }
  );
  rmSync(fixtureDir, { recursive: true, force: true });

  return { status: result.status, json: JSON.parse(result.stdout) };
}

/**
 * Returns the finding details recorded under a category.
 * @param {object} json - The audit report.
 * @param {string} category - The category name.
 * @returns {string[]} The findings for the category.
 */
function category(json, categoryName) {
  return json.categories[categoryName] ?? [];
}

test("原本と同一のデザインで組まれたページは漏れなしと判定する", () => {
  const result = audit(BASELINE);

  assert.equal(result.status, 0);
  assert.equal(result.json.blocking, false);
  assert.deepEqual(result.json.findings, []);
});

test("未置換のプレースホルダを検出する", () => {
  const result = audit(BASELINE.replace("<h1>ガイドタイトル</h1>", "<h1>{{HERO_H1}}</h1>"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "markers"), [
    "未置換のプレースホルダが残っています: {{HERO_H1}}",
  ]);
});

test("未削除の挿入マーカーを検出する", () => {
  const result = audit(BASELINE.replace("</main>", "<!-- ##SECTION_INSERT## -->\n</main>"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "markers"), [
    "未削除の挿入マーカーが残っています: ##SECTION_INSERT##",
  ]);
});

test("CSS 変数の値が改変されていれば検出する", () => {
  const result = audit(BASELINE.replace("--color-indigo: #2E3F72;", "--color-indigo: #0000FF;"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "css-variables"), [
    'CSS 変数の値が原本と異なります: --color-indigo — 原本 "#2E3F72" / ページ "#0000FF"',
  ]);
});

test("CSS 変数が欠落していれば検出する", () => {
  const result = audit(BASELINE.replace("    --color-indigo: #2E3F72;\n", ""));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "css-variables"), [
    "CSS 変数が欠落しています: --color-indigo",
  ]);
});

test("コンポーネント CSS のセレクタが欠落していれば検出する", () => {
  const result = audit(
    BASELINE.replace("  .callout { border-left: 4px solid var(--color-indigo); }\n", "")
  );

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "css-rules"), [
    "コンポーネント CSS のセレクタが欠落しています: .callout",
  ]);
});

test("メディアクエリが欠落していれば検出する", () => {
  const result = audit(
    BASELINE.replace(
      "  @media (max-width: 980px) {\n    .sidebar { transform: translateX(-100%); }\n  }\n",
      "  .sidebar { transform: translateX(-100%); }\n"
    )
  );

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "media-queries"), [
    "メディアクエリが欠落しています: @media (max-width: 980px)",
  ]);
});

test("CSS 文字列リテラル内の波括弧はルール階層を変えない", () => {
  const reference = BASELINE.replace(
    "  body { background: var(--color-paper); }",
    '  body { content: "{ \\\"quoted\\\""; background: var(--color-paper); }'
  );
  const pageHtml = reference.replace('{ \\\"quoted\\\"', '[ \\\"quoted\\\"');
  const result = audit(pageHtml, reference);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.findings, []);
});

test("バージョン未固定の CDN 参照を検出する", () => {
  const result = audit(BASELINE.replace("@tabler/icons-webfont@3.46.0", "@tabler/icons-webfont@latest"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) => detail.includes("バージョンが完全固定されていません"))
  );
});

test("integrity と crossorigin の欠落を検出する", () => {
  const result = audit(BASELINE.replace(`@11.16.1/dist/mermaid.min.js" ${SRI}`, '@11.16.1/dist/mermaid.min.js"'));

  assert.equal(result.status, 1);
  const cdn = category(result.json, "cdn");
  assert.ok(cdn.some((detail) => detail.startsWith("integrity 属性がありません")));
  assert.ok(cdn.some((detail) => detail.startsWith("crossorigin 属性がありません")));
});

test("必要な CDN 資産が足りなければ検出する", () => {
  const result = audit(
    BASELINE.replace(
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.3.0/600.css" ${SRI}>\n`,
      ""
    )
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").includes(
      "@fontsource/source-serif-4 の読み込みが 3 件必要ですが 2 件です"
    )
  );
});

test("描画 JS の関数が欠落していれば検出する", () => {
  const result = audit(BASELINE.replace("function setupMobileToggle() { return null; }", ""));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "javascript"), [
    "描画 JS の関数が欠落しています: setupMobileToggle()",
  ]);
});

test("flowchart.useMaxWidth が false でなければ検出する", () => {
  const result = audit(BASELINE.replace("useMaxWidth: false", "useMaxWidth: true"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "javascript").includes(
      "mermaid の flowchart.useMaxWidth が false に設定されていません"
    )
  );
});

test("themeVariables が原本と異なれば検出する", () => {
  const result = audit(BASELINE.replace('primaryColor: "#EEF1F8"', 'primaryColor: "#FFFFFF"'));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "mermaid-theme"), [
    'themeVariables が原本と異なります: primaryColor — 原本 "#EEF1F8" / ページ "#FFFFFF"',
  ]);
});

test("原本から themeVariables を抽出できなければ検出する", () => {
  const reference = BASELINE.replace("themeVariables:", "themeConfig:");
  const result = audit(BASELINE, reference);

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "mermaid-theme").includes(
      "原本 HTML から themeVariables を抽出できません"
    )
  );
});

test("閉じ波括弧の前に改行がない themeVariables も抽出する", () => {
  const reference = BASELINE.replace(
    '        primaryColor: "#EEF1F8",\n        lineColor: "#2E3F72"\n      },',
    '        primaryColor: "#EEF1F8", lineColor: "#2E3F72"},'
  );
  const pageHtml = reference.replace('primaryColor: "#EEF1F8"', 'primaryColor: "#FFFFFF"');
  const result = audit(pageHtml, reference);

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "mermaid-theme"), [
    'themeVariables が原本と異なります: primaryColor — 原本 "#EEF1F8" / ページ "#FFFFFF"',
  ]);
});

test("サイドバーとセクションの対応が切れていれば検出する", () => {
  const result = audit(BASELINE.replace('<section id="overview"', '<section id="summary"'));

  assert.equal(result.status, 1);
  const structure = category(result.json, "structure");
  assert.ok(structure.includes("サイドバーのリンク先セクションが存在しません: #overview"));
  assert.ok(structure.includes("サイドバーに載っていないセクションがあります: #summary"));
});

test("サイドバーとセクションのアイコン不一致を検出する", () => {
  const result = audit(
    BASELINE.replace(
      '<div class="section-eyebrow"><i class="ti ti-certificate"></i>',
      '<div class="section-eyebrow"><i class="ti ti-flag-3"></i>'
    )
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").includes(
      "サイドバーとセクションでアイコンが異なります: #overview — nav ti-certificate / eyebrow ti-flag-3"
    )
  );
});

test("SECTION の採番が連番でなければ検出する", () => {
  const result = audit(BASELINE.replace("SECTION 01", "SECTION 03"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) => detail.includes("採番が連番ではありません"))
  );
});

test("table-wrap に包まれていない table を検出する", () => {
  const result = audit(
    BASELINE.replace(
      '<div class="table-wrap"><table><tbody><tr><td>行</td></tr></tbody></table></div>',
      "<table><tbody><tr><td>行</td></tr></tbody></table>"
    )
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").includes(
      ".table-wrap に包まれていない table があります（table 1 / wrap 0）"
    )
  );
});

test("DIAGRAMS のキーと図コンテナの id が食い違えば検出する", () => {
  const result = audit(BASELINE.replace('id="roadmap"></div>', 'id="roadmap5"></div>'));

  assert.equal(result.status, 1);
  const structure = category(result.json, "structure");
  assert.ok(structure.includes("DIAGRAMS に定義のない図コンテナがあります: #roadmap5"));
  assert.ok(structure.includes("描画先コンテナのない DIAGRAMS のキーがあります: roadmap"));
});

test("外部リンクの target と rel の欠落を検出する", () => {
  const result = audit(
    BASELINE.replace('<a href="https://example.com/official" target="_blank" rel="noopener">', '<a href="https://example.com/official">')
  );

  assert.equal(result.status, 1);
  const structure = category(result.json, "structure");
  assert.ok(structure.includes('外部リンクに target="_blank" がありません: https://example.com/official'));
  assert.ok(structure.includes('外部リンクに rel="noopener" がありません: https://example.com/official'));
});

test("h1 が 1 個でなければ検出する", () => {
  const result = audit(BASELINE.replace("<h2>概要</h2>", "<h1>二つ目</h1>"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").includes("h1 はちょうど 1 個である必要がありますが 2 個です")
  );
});

test("--template ではマーカーと本文構造の検査を省く", () => {
  const template = BASELINE.replace("<h1>ガイドタイトル</h1>", "<h1>{{HERO_H1}}</h1>")
    .replace('<section id="overview">', '<section id="unlisted">');
  const result = audit(template, BASELINE, ["--template"]);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.findings, []);
});

test("引数が足りなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript.pathname], { encoding: "utf8" });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /usage:/);
});

test("--reference の値がなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript.pathname, "page.html", "--reference"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /usage:/);
  assert.doesNotMatch(result.stderr, /読み込み失敗/);
});

test("ファイルが存在しなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript.pathname, "missing.html"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /読み込み失敗/);
});
