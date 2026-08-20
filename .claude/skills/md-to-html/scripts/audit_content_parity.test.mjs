import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const auditScript = fileURLToPath(new URL("./audit_content_parity.mjs", import.meta.url));

/**
 * Runs the content parity audit over a synthetic Markdown / HTML pair.
 *
 * 一時ディレクトリの生成・後片付けとプロセス実行はここに集約する。テスト側で
 * 同じ手順を書き起こすと、片方だけが後片付けを失うなどの差が静かに入り込む。
 *
 * @param {string} markdown - The Markdown source fixture.
 * @param {string} html - The generated HTML fixture.
 * @param {"json"|"text"} [format] - The output path to exercise.
 * @returns {{status: number, stdout: string, stderr: string, json?: object}} The audit result.
 */
function audit(markdown, html, format = "json") {
  const fixtureDir = mkdtempSync(join(tmpdir(), "content-parity-"));
  const markdownPath = join(fixtureDir, "source.md");
  const htmlPath = join(fixtureDir, "page.html");
  writeFileSync(markdownPath, markdown);
  writeFileSync(htmlPath, html);

  try {
    const args = [auditScript, markdownPath, htmlPath];
    if (format === "json") args.push("--json");
    const result = spawnSync(process.execPath, args, { encoding: "utf8" });
    const stdout = result.stdout.trim();
    const base = { status: result.status, stdout: result.stdout, stderr: result.stderr };
    if (format !== "json") return base;
    try {
      return { ...base, json: JSON.parse(stdout) };
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
 * Escapes a Mermaid source the way the generated page carries it inside `pre.mermaid`.
 * @param {string} source - The raw Mermaid source.
 * @returns {string} The entity-escaped source.
 */
function escapeMermaid(source) {
  return source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Builds a minimal page that mirrors the generated-HTML shape the audit expects.
 *
 * 本 repo の生成 HTML は Mermaid を `pre.mermaid` へ直書きする（`var DIAGRAMS` は使わない）。
 *
 * @param {string} body - The `main` content markup.
 * @param {string[]} [diagrams] - The Mermaid sources in document order.
 * @param {string} [nav] - The sidebar navigation markup.
 * @returns {string} The complete HTML fixture.
 */
function page(body, diagrams = [], nav = "") {
  const rendered = diagrams
    .map((source) => `<pre class="mermaid">\n${escapeMermaid(source)}</pre>`)
    .join("\n");
  return `<!doctype html><html lang="ja"><head><style>.x{color:red}</style></head><body>
<div class="layout">
<aside class="sidebar"><nav id="sidebarNav">${nav}</nav></aside>
<main class="main">${body}
${rendered}
</main>
</div>
</body></html>`;
}

const BASELINE_MD = `# ガイドタイトル

## 目次

- [1. 最初のセクション](#1-最初のセクション)

これは導入の段落です。十分な長さを持たせています。

## 1. 最初のセクション

このセクションの本文をここに書きます。長さを確保した段落です。

- 最初のリスト項目はある程度の長さを持ちます
- 二番目のリスト項目もある程度の長さを持ちます

| 用語 | 説明 |
|---|---|
| スコープ | プロジェクトの作業範囲を指す用語です |

[^1]: 公式サイトの名称. https://example.com/official
`;

const BASELINE_HTML = page(
  `
<h1>ガイドタイトル</h1>
<p>これは導入の段落です。十分な長さを持たせています。</p>
<h2 id="1-最初のセクション">1. 最初のセクション</h2>
<p>このセクションの本文をここに書きます。長さを確保した段落です。</p>
<ul><li>最初のリスト項目はある程度の長さを持ちます</li><li>二番目のリスト項目もある程度の長さを持ちます</li></ul>
<div class="table-scroll"><table><thead><tr class="header"><th>用語</th><th>説明</th></tr></thead>
<tbody><tr class="odd"><td>スコープ</td><td>プロジェクトの作業範囲を指す用語です</td></tr></tbody></table></div>
<div class="ref-grid"><div class="ref-card" id="ref1"><div class="num">1</div>
<div class="txt">公式サイトの名称. <a href="https://example.com/official">https://example.com/official</a></div></div></div>`,
  [],
  '<a href="#1-最初のセクション">1. 最初のセクション</a>'
);

// --------------------------------------------------------------------------
// 基本
// --------------------------------------------------------------------------

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
  assert.equal(result.json.missingParagraphs.length, 1);
});

test("リスト項目が落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace("<li>二番目のリスト項目もある程度の長さを持ちます</li>", "")
  );

  assert.equal(result.status, 1);
  assert.equal(result.json.missingListItems.length, 1);
});

test("表の行が落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace(
      '<tr class="odd"><td>スコープ</td><td>プロジェクトの作業範囲を指す用語です</td></tr>',
      ""
    )
  );

  assert.equal(result.status, 1);
  assert.equal(result.json.missingTableRows.length, 1);
});

test("h2 セクション見出しの消失は blocking として検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace('<h2 id="1-最初のセクション">1. 最初のセクション</h2>', "")
  );

  assert.equal(result.status, 1);
  // 消えた見出しは `## 1. 最初のセクション` の 1 個だけである。下限比較にすると
  // 過剰検出（他の見出しまで漏れ扱い）や重複検出を素通しするため、実数で固定する。
  assert.equal(result.json.missingHeadings.length, 1);
});

test("`## 目次` のサイドバー化は漏れ扱いしない", () => {
  // 目次は仕様としてサイドバーへ再型付けする。blocking にも警告にもしない。
  const result = audit(BASELINE_MD, BASELINE_HTML);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingHeadings, []);
});

// --------------------------------------------------------------------------
// 脚注（本 repo 固有）
// --------------------------------------------------------------------------

test("MD の [^n] と HTML の <sup>n</sup> を同一視する", () => {
  const markdown = `# タイトル

## 目次

- [1. 節](#1-節)

## 1. 節

運用の卓越性はこの柱の中核テーマです[^3]。

| 柱 | 関連 |
|---|---|
| 信頼性(Reliability) | ディザスタリカバリはこの柱と直結[^25] |

[^3]: 運用の卓越性の柱. https://example.com/ops
[^25]: 信頼性の柱. https://example.com/reliability
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-節">1. 節</h2>
<p>運用の卓越性はこの柱の中核テーマです<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>3</sup></a>。</p>
<div class="table-scroll"><table><thead><tr class="header"><th>柱</th><th>関連</th></tr></thead>
<tbody><tr class="odd"><td>信頼性(Reliability)</td><td>ディザスタリカバリはこの柱と直結<a class="footnote-ref" href="#ref2" id="fnref2" role="doc-noteref"><sup>25</sup></a></td></tr></tbody></table></div>
<div class="ref-grid">
<div class="ref-card" id="ref1"><div class="num">3</div><div class="txt">運用の卓越性の柱. <a href="https://example.com/ops">https://example.com/ops</a></div></div>
<div class="ref-card" id="ref2"><div class="num">25</div><div class="txt">信頼性の柱. <a href="https://example.com/reliability">https://example.com/reliability</a></div></div>
</div>`,
    [],
    '<a href="#1-節">1. 節</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingParagraphs, []);
  assert.deepEqual(result.json.missingTableRows, []);
});

/**
 * Builds a Markdown / HTML pair whose body wording matches but whose footnote
 * references differ, so only the reference check can tell them apart.
 *
 * @param {string} refs - The `.footnote-ref` markup the page carries in the paragraph.
 * @returns {{markdown: string, html: string}} The fixture pair.
 */
function footnoteFixture(refs) {
  const markdown = `# タイトル

## 目次

- [1. 節](#1-節)

## 1. 節

冗長化は可用性設計の基本となる考え方です[^1]。停止時間の見積もりにも同じ根拠を使います[^1]。

[^1]: 可用性の設計指針. https://example.com/availability
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-節">1. 節</h2>
<p>冗長化は可用性設計の基本となる考え方です${refs}。停止時間の見積もりにも同じ根拠を使います。</p>
<div class="ref-grid"><div class="ref-card" id="ref1"><div class="num">1</div>
<div class="txt">可用性の設計指針. <a href="https://example.com/availability">https://example.com/availability</a></div></div></div>`,
    [],
    '<a href="#1-節">1. 節</a>'
  );
  return { markdown, html };
}

test("同じ脚注を 2 回参照する原本で参照が 1 つ落ちていれば blocking として検出する", () => {
  // 本文の文言はページ側に残っているため、段落・表・参考文献の照合はすべて通る。
  // 参照そのものを数えない限り、この漏れは検出できない。
  const { markdown, html } = footnoteFixture(
    '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.equal(result.json.blocking, true);
  assert.deepEqual(result.json.counts.footnoteRefs, { source: 2, page: 1 });
  assert.deepEqual(
    result.json.footnoteRefMismatches.map((finding) => finding.kind),
    ["脚注参照の数が原本と一致しません"]
  );
});

test("参照が数どおり揃っていれば脚注の指摘を出さない", () => {
  const { markdown, html } = footnoteFixture(
    '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>'
      + '<a class="footnote-ref" href="#ref1" id="fnref2" role="doc-noteref"><sup>1</sup></a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.footnoteRefMismatches, []);
});

test("脚注参照の表示番号が参照先 .ref-card の番号とずれていれば検出する", () => {
  // ページ側の番号は初出順へ振り直されるため、原本の `[^n]` とは一致しなくてよい。
  // 一致しなければならないのは参照先カードが掲げている番号のほうである。
  const { markdown, html } = footnoteFixture(
    '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>'
      + '<a class="footnote-ref" href="#ref1" id="fnref2" role="doc-noteref"><sup>2</sup></a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.footnoteRefMismatches.map((finding) => finding.kind),
    ["脚注参照の表示番号が参照先の番号と一致しません"]
  );
});

test("同じ脚注の参照先がページ内で割れていれば検出する", () => {
  const { markdown, html } = footnoteFixture(
    '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>'
      + '<a class="footnote-ref" href="#ref2" id="fnref2" role="doc-noteref"><sup>1</sup></a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.footnoteRefMismatches.map((finding) => finding.kind),
    ["同じ脚注の参照先がページ内で割れています"]
  );
});

test("同一の出典を 1 枚の .ref-card へまとめても漏れ扱いしない", () => {
  // 原本が同じ出典を別番号で二重定義している場合、ページ側が 1 枚へまとめるのは正しい。
  const markdown = `# タイトル

## 目次

- [1. 節](#1-節)

## 1. 節

構成管理の考え方はここで押さえておきます[^1]。運用設計でも同じ出典を参照します[^2]。

[^1]: 構成管理の設計指針. https://example.com/config
[^2]: 構成管理の設計指針. https://example.com/config
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-節">1. 節</h2>
<p>構成管理の考え方はここで押さえておきます<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>。運用設計でも同じ出典を参照します<a class="footnote-ref" href="#ref1" id="fnref2" role="doc-noteref"><sup>1</sup></a>。</p>
<div class="ref-grid"><div class="ref-card" id="ref1"><div class="num">1</div>
<div class="txt">構成管理の設計指針. <a href="https://example.com/config">https://example.com/config</a></div></div></div>`,
    [],
    '<a href="#1-節">1. 節</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.footnoteRefMismatches, []);
});

test("脚注参照の id が連番でなければ検出する", () => {
  const { markdown, html } = footnoteFixture(
    '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>'
      + '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.footnoteRefMismatches.map((finding) => finding.kind),
    ["脚注参照の id が連番ではありません"]
  );
});

test("脚注定義が .ref-card へ再型付けされていても漏れ扱いしない", () => {
  const result = audit(BASELINE_MD, BASELINE_HTML);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingReferences, []);
});

test("脚注定義の本文がページから落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace(
      '<div class="txt">公式サイトの名称. <a href="https://example.com/official">https://example.com/official</a></div>',
      '<div class="txt"><a href="https://example.com/official">https://example.com/official</a></div>'
    )
  );

  assert.equal(result.status, 1);
  assert.equal(result.json.missingReferences.length, 1);
});

test("外部リンクが落ちていれば検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace(/https:\/\/example\.com\/official/g, "https://example.com/other")
  );

  assert.equal(result.status, 1);
  assert.equal(result.json.missingLinks.length, 1);
});

// --------------------------------------------------------------------------
// アンカーの三者一致（本 repo 固有）
// --------------------------------------------------------------------------

test("見出し id が MD の目次アンカーと一致しなければ検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace('id="1-最初のセクション"', 'id="1-first-section"')
  );

  assert.equal(result.status, 1);
  // 三者（目次アンカー / 見出し id / サイドバー href）の一致を見るため、id を 1 箇所
  // 書き換えると 4 件が立つ。下限比較では過剰検出も重複検出も素通しするので実数で固定する。
  assert.deepEqual(
    result.json.anchorMismatches.map((finding) => [finding.kind, finding.anchor]),
    [
      ["見出しが無い目次アンカー", "1-最初のセクション"],
      ["目次に無い見出し id", "1-first-section"],
      ["サイドバーに無い見出し id", "1-first-section"],
      ["見出しが無いサイドバーのリンク", "1-最初のセクション"],
    ]
  );
});

test("サイドバーのリンクが見出し id と一致しなければ検出する", () => {
  const result = audit(
    BASELINE_MD,
    BASELINE_HTML.replace('<a href="#1-最初のセクション">', '<a href="#missing-anchor">')
  );

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.anchorMismatches.map((finding) => [finding.kind, finding.anchor]),
    [
      ["サイドバーに無い見出し id", "1-最初のセクション"],
      ["見出しが無いサイドバーのリンク", "missing-anchor"],
    ]
  );
});

// --------------------------------------------------------------------------
// Mermaid
// --------------------------------------------------------------------------

test("Mermaid を pre.mermaid から抽出して図数を照合する", () => {
  const markdown = `# タイトル

## 目次

- [1. 図のあるセクション](#1-図のあるセクション)

## 1. 図のあるセクション

\`\`\`mermaid
flowchart TB
    A["最初のノード"] --> B["次のノード"]

    style A fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図のあるセクション">1. 図のあるセクション</h2>`,
    [
      `flowchart TB
    A["最初のノード"] --> B["次のノード"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill`,
    ],
    '<a href="#1-図のあるセクション">1. 図のあるセクション</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.diagramCounts, { markdownFences: 1, preMermaid: 1 });
});

test("Mermaid の図数が一致しなければ検出する", () => {
  const markdown = `# タイトル

## 目次

- [1. 図のあるセクション](#1-図のあるセクション)

## 1. 図のあるセクション

\`\`\`mermaid
flowchart TB
A["最初のノード"] --> B["次のノード"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図のあるセクション">1. 図のあるセクション</h2>`,
    [],
    '<a href="#1-図のあるセクション">1. 図のあるセクション</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.equal(result.json.diagramCountMatch, false);
  assert.deepEqual(result.json.diagramCounts, { markdownFences: 1, preMermaid: 0 });
});

test("--json なしの実行でも図数の不一致が実数付きで報告される", () => {
  // 人間向けの出力経路は --json を通らない。存在しないキーを参照していると
  // ここでだけ `undefined` が印字されるため、実数が出ることを固定する。
  const markdown = `# タイトル

## 目次

- [1. 図のあるセクション](#1-図のあるセクション)

## 1. 図のあるセクション

\`\`\`mermaid
flowchart LR
    A["最初のノード"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図のあるセクション">1. 図のあるセクション</h2>`,
    [],
    '<a href="#1-図のあるセクション">1. 図のあるセクション</a>'
  );

  const result = audit(markdown, html, "text");

  assert.equal(result.status, 1);
  assert.match(result.stdout, /原本の fence=1 \/ pre\.mermaid=0/);
  assert.doesNotMatch(result.stdout, /undefined/);
});

test("実体参照でエスケープされたラベルをデコードして照合する", () => {
  const markdown = `# タイトル

## 目次

- [1. 図](#1-図)

## 1. 図

\`\`\`mermaid
flowchart LR
    S1["設計と計画<br/>約25パーセント"] --> S2["実装の管理"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図">1. 図</h2>`,
    [
      `flowchart LR
    S1["設計と計画<br/>約25パーセント"] --> S2["実装の管理"]`,
    ],
    '<a href="#1-図">1. 図</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.missingDiagramLabels, []);
});

test("ラベルの語句がページのどこにも残っていなければ検出する", () => {
  const markdown = `# タイトル

## 目次

- [1. 図](#1-図)

## 1. 図

\`\`\`mermaid
flowchart LR
    E["要求の引き出し<br/>Elicitation"] --> A["分析工程の実施"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図">1. 図</h2>`,
    [
      `flowchart LR
    E["要求の引き出し"] --> A["分析工程の実施"]`,
    ],
    '<a href="#1-図">1. 図</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.missingDiagramLabels.map((finding) => finding.segment),
    ["elicitation"]
  );
});

test("デザインシステム外の配色が pre.mermaid に残っていれば検出する", () => {
  const markdown = `# タイトル

## 目次

- [1. 図](#1-図)

## 1. 図

\`\`\`mermaid
flowchart TB
    A["最初のノードのラベル"] --> B["次のノードのラベル"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図">1. 図</h2>`,
    [
      `flowchart TB
    A["最初のノードのラベル"] --> B["次のノードのラベル"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26;`,
    ],
    '<a href="#1-図">1. 図</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 1);
  assert.deepEqual(
    result.json.unapprovedColors.map((finding) => finding.color),
    ["#eef1f8", "#2e3f72", "#161b26"]
  );
});

test("暗色パレットの 4 役はすべて承認済みとする", () => {
  const markdown = `# タイトル

## 目次

- [1. 図](#1-図)

## 1. 図

\`\`\`mermaid
flowchart TB
    A["ノードのラベルその一"] --> B["ノードのラベルその二"]
\`\`\`
`;
  const html = page(
    `
<h1>タイトル</h1>
<h2 id="1-図">1. 図</h2>`,
    [
      `flowchart TB
    A["ノードのラベルその一"] --> B["ノードのラベルその二"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;`,
    ],
    '<a href="#1-図">1. 図</a>'
  );
  const result = audit(markdown, html);

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.unapprovedColors, []);
});

// --------------------------------------------------------------------------
// CLI
// --------------------------------------------------------------------------

test("引数が足りなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript, "only-one.md"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /usage:/);
});

test("ファイルが存在しなければ終了コード 2 を返す", () => {
  const result = spawnSync(
    process.execPath,
    [auditScript, "missing.md", "missing.html"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 2);
  assert.match(result.stderr, /読み込み失敗/);
});
