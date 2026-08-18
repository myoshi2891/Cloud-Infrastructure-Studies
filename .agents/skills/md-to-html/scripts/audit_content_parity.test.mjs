import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const auditScript = new URL("./audit_content_parity.mjs", import.meta.url);

/**
 * Runs the content parity audit over a synthetic Markdown / HTML pair.
 * @param {string} markdown - The Markdown source fixture.
 * @param {string} html - The generated HTML fixture.
 * @returns {{status: number, json: object}} The exit status and parsed JSON report.
 */
function audit(markdown, html) {
  const fixtureDir = mkdtempSync(join(tmpdir(), "content-parity-"));
  const markdownPath = join(fixtureDir, "source.md");
  const htmlPath = join(fixtureDir, "page.html");
  writeFileSync(markdownPath, markdown);
  writeFileSync(htmlPath, html);

  try {
    const result = spawnSync(process.execPath, [auditScript.pathname, markdownPath, htmlPath, "--json"], {
      encoding: "utf8",
    });
    const stdout = result.stdout.trim();
    try {
      return { status: result.status, json: JSON.parse(stdout) };
    } catch (error) {
      throw new Error(
        `監査結果を解析できません（終了コード: ${result.status ?? "null"}）\n` +
          `stderr: ${result.stderr.trim() || "(空)"}\nstdout: ${stdout || "(空)"}`,
        { cause: error }
      );
    }
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true });
  }
}

/**
 * Builds a minimal page that mirrors the generated-HTML shape the audit expects.
 * @param {string} body - The `main` content markup.
 * @param {Record<string, string>} [diagrams] - The Mermaid sources keyed by container id.
 * @returns {string} The complete HTML fixture.
 */
function page(body, diagrams = {}) {
  const entries = Object.entries(diagrams)
    .map(([id, source]) => `${id}: \`${source}\``)
    .join(",\n");
  return `<!DOCTYPE html><html lang="ja"><head><style>.x{color:red}</style></head><body>
<main>${body}</main>
<script>
(function () {
  var DIAGRAMS = {
${entries}
  };
})();
</script>
</body></html>`;
}

const BASELINE_MD = `# ガイドタイトル

これは導入の段落です。十分な長さを持たせています。

## 1. 最初のセクション

このセクションの本文をここに書きます。長さを確保した段落です。

- 最初のリスト項目はある程度の長さを持ちます
- 二番目のリスト項目もある程度の長さを持ちます

| 用語 | 説明 |
|---|---|
| スコープ | プロジェクトの作業範囲を指す用語です |

**ソース**: [公式サイト](https://example.com/official)
`;

const BASELINE_HTML = page(`
<h1>ガイドタイトル</h1>
<p>これは導入の段落です。十分な長さを持たせています。</p>
<section id="first"><h2>最初のセクション</h2>
<p>このセクションの本文をここに書きます。長さを確保した段落です。</p>
<ul><li>最初のリスト項目はある程度の長さを持ちます</li><li>二番目のリスト項目もある程度の長さを持ちます</li></ul>
<div class="table-wrap"><table><thead><tr><th>用語</th><th>説明</th></tr></thead>
<tbody><tr><td>スコープ</td><td>プロジェクトの作業範囲を指す用語です</td></tr></tbody></table></div>
<div class="callout source"><div class="callout-title">ソース</div>
<ul><li><a href="https://example.com/official" target="_blank" rel="noopener">公式サイト</a></li></ul></div>
</section>`);

test("完全に転写されたページは漏れなしと判定する", () => {
  const result = audit(BASELINE_MD, BASELINE_HTML);

  assert.equal(result.status, 0);
  assert.equal(result.json.blocking, false);
  assert.deepEqual(result.json.missingHeadings, []);
  assert.deepEqual(result.json.missingParagraphs, []);
  assert.deepEqual(result.json.missingListItems, []);
  assert.deepEqual(result.json.missingTableRows, []);
  assert.deepEqual(result.json.missingLinks, []);
});

test("段落が丸ごと落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace("<p>このセクションの本文をここに書きます。長さを確保した段落です。</p>", "")
  );

  assert.equal(result.status, 1);
  assert.deepEqual(result.json.missingParagraphs, [
    "このセクションの本文をここに書きます。長さを確保した段落です。",
  ]);
});

test("共通する先頭40文字より後の段落欠落を検出する", () => {
  const prefix = "abcdefghijklmnopqrstuvwxyz0123456789共通部分テキスト";
  const markdown = `# タイトル\n\n## セクション\n\n${prefix}後半固有情報\n`;
  const html = page(`<h1>タイトル</h1><section><h2>セクション</h2><p>${prefix}</p></section>`);
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(result.json.missingParagraphs, [
    `${prefix}後半固有情報`,
  ]);
});

test("リスト項目が落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace("<li>二番目のリスト項目もある程度の長さを持ちます</li>", "")
  );

  assert.equal(result.status, 1);
  assert.deepEqual(result.json.missingListItems, ["二番目のリスト項目もある程度の長さを持ちます"]);
});

test("表の行が落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace(
      "<tr><td>スコープ</td><td>プロジェクトの作業範囲を指す用語です</td></tr>",
      ""
    )
  );

  assert.equal(result.status, 1);
  assert.equal(result.json.missingTableRows.length, 1);
});

test("外部リンクが落ちていれば検出する", () => {
  const result = audit(BASELINE_MD, BASELINE_HTML.replace("https://example.com/official", "#"));

  assert.equal(result.status, 1);
  assert.deepEqual(result.json.missingLinks, ["https://example.com/official"]);
});

test("外部リンクのパス大小文字・query・fragment の差を検出する", () => {
  const cases = [
    ["https://example.com/CasePath", "https://example.com/casepath"],
    ["https://example.com/path?mode=full", "https://example.com/path?mode=brief"],
    ["https://example.com/path#details", "https://example.com/path#summary"],
  ];

  for (const [sourceUrl, pageUrl] of cases) {
    const markdown = `# タイトル\n\n## リンク\n\n詳細は [公式](${sourceUrl}) を参照してください。\n`;
    const html = page(
      `<h1>タイトル</h1><section><h2>リンク</h2><p>詳細は <a href="${pageUrl}">公式</a> を参照してください。</p></section>`
    );
    const result = audit(markdown, html);
    assert.equal(result.status, 1, `${sourceUrl} と ${pageUrl} は区別される`);
    assert.deepEqual(result.json.missingLinks, [sourceUrl]);
  }
});

test("h2 セクション見出しの消失は blocking として検出する", () => {
  const result = audit(BASELINE_MD, BASELINE_HTML.replace("<h2>最初のセクション</h2>", "<h2>別の話題</h2>"));

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.missingHeadings.map((heading) => heading.text),
    ["1. 最初のセクション"]
  );
});

test("h3 以下の再型付けは警告に留め、blocking にしない", () => {
  const markdown = `${BASELINE_MD}\n### 小見出しとしての補足事項\n\n補足の本文をここに十分な長さで書いておきます。\n`;
  const html = BASELINE_HTML.replace(
    "</section>",
    '<p>補足の本文をここに十分な長さで書いておきます。</p></section>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.equal(result.json.blocking, false);
  assert.deepEqual(
    result.json.missingSubHeadings.map((heading) => heading.text),
    ["小見出しとしての補足事項"]
  );
});

test("見出しの採番除去とドメインタグへの分割は漏れ扱いしない", () => {
  const markdown = `# タイトル

## 6. ドメイン1: プロジェクトマネジメントの基礎（36%）

ドメイン1の本文をここに十分な長さで記載しておきます。
`;
  const html = page(`
<h1>タイトル</h1>
<section id="domain1">
<span class="domain-tag d1">ドメイン1 &middot; 36%</span>
<h2>プロジェクトマネジメントの基礎</h2>
<p>ドメイン1の本文をここに十分な長さで記載しておきます。</p>
</section>`);
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingHeadings, []);
});

test("表からカードグリッドへの再型付けは漏れ扱いしない", () => {
  const markdown = `# タイトル

## 1. 用語集

| 用語 | 定義 |
|---|---|
| WBS | プロジェクトスコープを階層的に分解した構成図 |
`;
  const html = page(`
<h1>タイトル</h1>
<section id="glossary"><h2>用語集</h2>
<div class="glossary-grid">
<div class="glossary-item"><div class="g-term">WBS</div><div class="g-def">プロジェクトスコープを階層的に分解した構成図</div></div>
</div></section>`);
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingTableRows, []);
});

test("全角括弧の半角化と URL 直後の全角文字は漏れ扱いしない", () => {
  const markdown = `# タイトル

## 1. 試験の概要

試験内容概要（ECO）に基づいて出題されます。詳細は https://example.com/eco）で確認してください。
`;
  const html = page(`
<h1>タイトル</h1>
<section id="exam"><h2>試験の概要</h2>
<p>試験内容概要(ECO)に基づいて出題されます。詳細は <a href="https://example.com/eco" target="_blank" rel="noopener">https://example.com/eco</a> で確認してください。</p>
</section>`);
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingLinks, []);
  assert.deepEqual(result.json.missingParagraphs, []);
});

test("Mermaid の図数が一致しなければ検出する", () => {
  const markdown = `# タイトル

## 1. 図のあるセクション

\`\`\`mermaid
flowchart TB
A["最初のノード"] --> B["次のノード"]
\`\`\`
`;
  const html = page(`
<h1>タイトル</h1>
<section id="diagram"><h2>図のあるセクション</h2></section>`);
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.equal(result.json.diagramCountMatch, false);
  assert.deepEqual(result.json.diagramCounts, { markdownFences: 1, diagramsKeys: 0, containers: 0 });
});

test("ラベルの語句がページのどこにも残っていなければ検出する", () => {
  const markdown = `# タイトル

## 1. 図のあるセクション

\`\`\`mermaid
flowchart LR
E["要求の引き出し<br/>Elicitation"] --> A["分析工程の実施"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<section id="diagram"><h2>図のあるセクション</h2>
<div class="diagram-card"><div class="diagram-container" id="baProcess"></div></div>
</section>`,
    {
      baProcess: `flowchart LR
E["要求の引き出し"] --> A["分析工程の実施"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;`,
    }
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.missingDiagramLabels.map((finding) => finding.segment),
    ["elicitation"]
  );
});

test("ラベルが短縮されても語句が本文に残っていれば漏れ扱いしない", () => {
  const markdown = `# タイトル

## 1. 図のあるセクション

用語の Elicitation は要求の引き出しを意味する重要な工程です。

\`\`\`mermaid
flowchart LR
E["要求の引き出し<br/>Elicitation"] --> A["分析工程の実施"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<section id="diagram"><h2>図のあるセクション</h2>
<p>用語の Elicitation は要求の引き出しを意味する重要な工程です。</p>
<div class="diagram-card"><div class="diagram-container" id="baProcess"></div></div>
</section>`,
    {
      baProcess: `flowchart LR
E["要求の引き出し"] --> A["分析工程の実施"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;`,
    }
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingDiagramLabels, []);
});

test("デザインシステム外の配色が DIAGRAMS に残っていれば検出する", () => {
  const markdown = `# タイトル

## 1. 図のあるセクション

\`\`\`mermaid
flowchart TB
A["最初のノードのラベル"] --> B["次のノードのラベル"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<section id="diagram"><h2>図のあるセクション</h2>
<div class="diagram-card"><div class="diagram-container" id="flow"></div></div>
</section>`,
    {
      flow: `flowchart TB
A["最初のノードのラベル"] --> B["次のノードのラベル"]

classDef box fill:#111827,stroke:#7c9eff,color:#e5e7eb;`,
    }
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(result.json.unapprovedColors, [
    { id: "flow", color: "#111827" },
    { id: "flow", color: "#7c9eff" },
    { id: "flow", color: "#e5e7eb" },
  ]);
});

test("引数が足りなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript.pathname, "only-one.md"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /usage:/);
});

test("ファイルが存在しなければ終了コード 2 を返す", () => {
  const result = spawnSync(
    process.execPath,
    [auditScript.pathname, "missing.md", "missing.html"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 2);
  assert.match(result.stderr, /読み込み失敗/);
});
