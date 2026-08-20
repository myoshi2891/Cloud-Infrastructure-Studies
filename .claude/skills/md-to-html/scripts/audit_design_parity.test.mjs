import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const auditScript = fileURLToPath(new URL("./audit_design_parity.mjs", import.meta.url));

const SRI = 'integrity="sha384-AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJJKKKKLLLL" crossorigin="anonymous"';

/**
 * フォント読み込み。`fonts.googleapis.com` の応答は UA 依存で SRI を計算できないため、
 * バージョン固定・integrity の検査対象から外れることを固定する。
 */
const HEAD_ASSETS = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap" rel="stylesheet" />`;

const STYLE = `<style>
  :root {
    --bg: #07111e;
    --bg-card: #0d1a2b;
    --text: #dbe4f3;
    --accent: #7c9eff;
    --sidebar-w: 300px;
  }
  body { background: var(--bg); color: var(--text); }
  .sidebar nav a.active { color: var(--accent); }
  .table-scroll { overflow-x: auto; }
  pre.mermaid { background: var(--bg-card); }
  .callout-practice { border-left: 4px solid var(--accent); }
  .ref-grid { display: grid; }
  .checklist-card { border: 1px solid var(--accent); }
  @media (max-width: 980px) {
    .sidebar { transform: translateX(-100%); }
  }
</style>`;

const MERMAID_SRC = "https://cdn.jsdelivr.net/npm/mermaid@11.13.0/dist/mermaid.min.js";

const SCRIPT = `<script src="${MERMAID_SRC}" ${SRI}></script>
<script>
(function () {
  'use strict';

  function initMermaid() {
    mermaid.initialize({
      theme: 'base',
      themeVariables: {
        background: '#0d1a2b',
        primaryTextColor: '#dbe4f3',
        lineColor: '#4a6390'
      },
      flowchart: {
        useMaxWidth: false
      }
    });
  }

  function healOverflowingLabels() { return null; }

  initMermaid();

  var toggle = document.getElementById('sidebarToggle');
  if (toggle) { toggle.addEventListener('click', function () {}); }

  var spyObserver = new IntersectionObserver(function () {}, { threshold: 0 });
  spyObserver.observe(document.body);

  document.querySelectorAll('.checklist-card').forEach(function (card) {
    var boxes = card.querySelectorAll('input[type="checkbox"]');
    return boxes.length;
  });
})();
</script>`;

const BODY = `<div class="layout">
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="メニュー">☰</button>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="kicker">Google Cloud PCA</div>
      <h2>Section 4: プロセス分析と最適化</h2>
    </div>
    <nav id="sidebarNav">
      <a href="#1-全体像" class="">1. 全体像</a>
      <a href="#11-配点" class="lvl3">1.1 配点</a>
    </nav>
  </aside>
  <main class="main">
    <div class="hero">
      <div class="kicker">Professional Cloud Architect &middot; Section 4</div>
      <h1>学習ガイド</h1>
      <div class="meta-row">
        <span class="pill">配点 <strong>約15%</strong></span>
        <span class="pill">対象 <strong>初学者</strong></span>
        <span class="pill">図解 <strong>Mermaid 1点</strong></span>
        <span class="pill">参考文献 <strong>1件</strong></span>
      </div>
    </div>
    <h2 id="1-全体像">1. 全体像</h2>
    <p>本文です<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>。</p>
    <div class="table-scroll">
      <table>
        <thead><tr class="header"><th>列1</th></tr></thead>
        <tbody><tr class="odd"><td>値1</td></tr><tr class="even"><td>値2</td></tr></tbody>
      </table>
    </div>
    <pre class="mermaid">
flowchart LR
    A["最初のノード"] --&gt; B["次のノード"]</pre>
    <h3 id="11-配点">1.1 配点</h3>
    <div class="checklist-card">
      <div class="checklist-header"><span class="title">学習チェックリスト</span><span class="count">0 / 2 完了</span></div>
      <ul>
        <li><input id="chk1" type="checkbox" /><label for="chk1">項目1</label></li>
        <li><input id="chk2" type="checkbox" /><label for="chk2">項目2</label></li>
      </ul>
    </div>
    <div class="ref-grid" id="referenceGrid">
      <div class="ref-card" id="ref1">
        <div class="num">1</div>
        <div class="txt">出典名. <a href="https://example.com/official">https://example.com/official</a></div>
      </div>
    </div>
  </main>
</div>`;

const BASELINE = `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
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

  try {
    const result = spawnSync(
      process.execPath,
      [auditScript, pagePath, "--reference", referencePath, "--json", ...extraFlags],
      { encoding: "utf8" }
    );
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
 * Returns the finding details recorded under a category.
 * @param {object} json - The audit report.
 * @param {string} categoryName - The category name.
 * @returns {string[]} The findings for the category.
 */
function category(json, categoryName) {
  return json.categories[categoryName] ?? [];
}

// --------------------------------------------------------------------------
// 基本
// --------------------------------------------------------------------------

test("原本と同一のデザインで組まれたページは漏れなしと判定する", () => {
  const result = audit(BASELINE);

  assert.equal(result.status, 0);
  assert.equal(result.json.blocking, false);
  assert.deepEqual(result.json.findings, []);
});

test("未置換のプレースホルダを検出する", () => {
  const result = audit(BASELINE.replace("<h1>学習ガイド</h1>", "<h1>{{HERO_H1}}</h1>"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "markers"), [
    "未置換のプレースホルダが残っています: {{HERO_H1}}",
  ]);
});

test("未削除の挿入マーカーを検出する", () => {
  const result = audit(BASELINE.replace("</main>", "<!-- ##CONTENT_INSERT## -->\n</main>"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "markers"), [
    "未削除の挿入マーカーが残っています: ##CONTENT_INSERT##",
  ]);
});

// --------------------------------------------------------------------------
// CSS
// --------------------------------------------------------------------------

test("CSS 変数の値が改変されていれば検出する", () => {
  const result = audit(BASELINE.replace("--accent: #7c9eff;", "--accent: #0000ff;"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "css-variables"), [
    'CSS 変数の値が原本と異なります: --accent — 原本 "#7c9eff" / ページ "#0000ff"',
  ]);
});

test("CSS 変数が欠落していれば検出する", () => {
  const result = audit(BASELINE.replace("    --accent: #7c9eff;\n", ""));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "css-variables"), [
    "CSS 変数が欠落しています: --accent",
  ]);
});

test("コンポーネント CSS のセレクタが欠落していれば検出する", () => {
  const result = audit(BASELINE.replace("  .ref-grid { display: grid; }\n", ""));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "css-rules"), [
    "コンポーネント CSS のセレクタが欠落しています: .ref-grid",
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
  const withLiteral = BASELINE.replace(
    "  body { background: var(--bg); color: var(--text); }",
    '  .practice-label::before { content: \'{\'; }\n  body { background: var(--bg); color: var(--text); }'
  );
  const result = audit(withLiteral, withLiteral);

  assert.equal(result.status, 0);
});

// --------------------------------------------------------------------------
// CDN / SRI
// --------------------------------------------------------------------------

test("バージョン未固定の CDN 参照を検出する", () => {
  const result = audit(
    BASELINE.replace("mermaid@11.13.0/dist/mermaid.min.js", "mermaid@11/dist/mermaid.min.js")
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) =>
      detail.startsWith("バージョンが完全固定されていません")
    )
  );
});

test("integrity と crossorigin の欠落を検出する", () => {
  const result = audit(BASELINE.replace(SRI, ""));

  assert.equal(result.status, 1);
  const findings = category(result.json, "cdn");
  assert.ok(findings.some((detail) => detail.startsWith("integrity 属性がありません")));
  assert.ok(findings.some((detail) => detail.startsWith("crossorigin 属性がありません")));
});

test("SRI を付けた cdnjs 参照を検出する", () => {
  // cdnjs は事前圧縮した brotli 変種の末尾改行が欠けており、identity 応答とバイト列が
  // 一致しない。SRI はデコード後のバイト列で検証されるため、正しく計算したつもりの
  // ハッシュでもブラウザ側で digest 不一致となり資産が丸ごとブロックされる。
  const result = audit(
    BASELINE.replace(MERMAID_SRC, "https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.13.0/mermaid.min.js")
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) =>
      detail.startsWith("integrity を付けた cdnjs 参照は使えません")
    )
  );
});

test("参照元と異なる integrity ハッシュを検出する", () => {
  // URL とハッシュの組が壊れると、静的な「integrity がある」検査は通るのにブラウザは
  // 資産を丸ごとブロックし、図が Mermaid ソースのまま残る。組そのものを参照元に固定する。
  const result = audit(
    BASELINE.replace(SRI, 'integrity="sha384-ZZZZBBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJJKKKKLLLL" crossorigin="anonymous"')
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) =>
      detail.startsWith("mermaid の src と integrity の組が参照元と一致しません")
    )
  );
});

test("参照元と異なるバージョンの mermaid を検出する", () => {
  // 完全固定されていてもバージョンだけ差し替えると、そのハッシュは古い版のものになる。
  const result = audit(BASELINE.replace("mermaid@11.13.0", "mermaid@11.12.0"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) =>
      detail.startsWith("mermaid の src と integrity の組が参照元と一致しません")
    )
  );
});

test("fonts.googleapis.com のスタイルシートは SRI 検査の対象外とする", () => {
  // UA 依存の応答を返すため integrity を計算できない。preconnect も資産取得ではない。
  const result = audit(BASELINE);

  assert.equal(result.status, 0);
  assert.deepEqual(category(result.json, "cdn"), []);
});

test("必要な CDN 資産が足りなければ検出する", () => {
  const result = audit(BASELINE.replace(/<script src="https:\/\/cdn\.jsdelivr[^>]*><\/script>/, ""));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) => detail.includes("mermaid の読み込みが 1 件必要"))
  );
});

test("Noto Sans JP の読み込みが無ければ検出する", () => {
  const result = audit(BASELINE.replace(/<link href="https:\/\/fonts\.googleapis[^>]*\/>/, ""));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "cdn").some((detail) =>
      detail.includes("Noto Sans JP の読み込みが 1 件必要")
    )
  );
});

// --------------------------------------------------------------------------
// JS / Mermaid
// --------------------------------------------------------------------------

test("描画 JS の関数が欠落していれば検出する", () => {
  const result = audit(BASELINE.replace("function healOverflowingLabels() { return null; }", ""));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "javascript"), [
    "描画 JS の関数が欠落しています: healOverflowingLabels()",
  ]);
});

test("スクロールスパイの配線が無ければ検出する", () => {
  const result = audit(
    BASELINE.replace("new IntersectionObserver(function () {}, { threshold: 0 })", "null")
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "javascript").some((detail) => detail.includes("スクロールスパイ"))
  );
});

test("サイドバートグルの配線が無ければ検出する", () => {
  const result = audit(BASELINE.replace("document.getElementById('sidebarToggle')", "null"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "javascript").some((detail) => detail.includes("サイドバートグル"))
  );
});

test("チェックリスト進捗の配線が無ければ検出する", () => {
  const result = audit(
    BASELINE.replace("document.querySelectorAll('.checklist-card')", "[].slice.call([])")
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "javascript").some((detail) => detail.includes("チェックリスト進捗"))
  );
});

test("flowchart.useMaxWidth が false でなければ検出する", () => {
  const result = audit(BASELINE.replace("useMaxWidth: false", "useMaxWidth: true"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "javascript"), [
    "mermaid の flowchart.useMaxWidth が false に設定されていません",
  ]);
});

test("themeVariables が原本と異なれば検出する", () => {
  const result = audit(BASELINE.replace("lineColor: '#4a6390'", "lineColor: '#ff0000'"));

  assert.equal(result.status, 1);
  assert.deepEqual(category(result.json, "mermaid-theme"), [
    'themeVariables が原本と異なります: lineColor — 原本 "#4a6390" / ページ "#ff0000"',
  ]);
});

// --------------------------------------------------------------------------
// 構造の不変条件
// --------------------------------------------------------------------------

test("h1 が 1 個でなければ検出する", () => {
  const result = audit(BASELINE.replace("<h2 id=\"1-全体像\">1. 全体像</h2>", "<h1>余計な見出し</h1>"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) => detail.includes("h1 はちょうど 1 個"))
  );
});

test("サイドバーのリンク先の見出しが存在しなければ検出する", () => {
  const result = audit(BASELINE.replace('<h2 id="1-全体像">', '<h2 id="1-overview">'));

  assert.equal(result.status, 1);
  const findings = category(result.json, "structure");
  assert.ok(findings.some((detail) => detail.includes("サイドバーのリンク先の見出しが存在しません: #1-全体像")));
  assert.ok(findings.some((detail) => detail.includes("サイドバーに載っていない見出しがあります: #1-overview")));
});

test("table-scroll に包まれていない table を検出する", () => {
  const result = audit(BASELINE.replace('<div class="table-scroll">', "<div>"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes(".table-scroll に包まれていない table")
    )
  );
});

test("表の行に header / odd / even のクラスが無ければ検出する", () => {
  const result = audit(BASELINE.replace('<tr class="odd">', "<tr>"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("header / odd / even")
    )
  );
});

test("class はあるが header / odd / even 以外の表の行も検出する", () => {
  // `class` の有無だけを見る検査は `<tr class="row">` を素通しし、縞模様が崩れた表を
  // 見逃す。必要なクラスを実際に持っているかで判定する。
  const result = audit(BASELINE.replace('<tr class="odd">', '<tr class="row">'));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("header / odd / even")
    )
  );
});

test("ref-card の id が連番でなければ検出する", () => {
  const withTwo = BASELINE.replace(
    '      </div>\n    </div>\n  </main>',
    '      </div>\n      <div class="ref-card" id="ref3"><div class="num">3</div><div class="txt">別の出典</div></div>\n    </div>\n  </main>'
  );
  const result = audit(withTwo);

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes(".ref-card の id が連番ではありません")
    )
  );
});

test("参照先の無い脚注を検出する", () => {
  const result = audit(BASELINE.replace('href="#ref1" id="fnref1"', 'href="#ref9" id="fnref1"'));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("参照先の無い脚注があります: #ref9")
    )
  );
});

test("属性の並び順が違っても参照先の無い脚注を検出する", () => {
  // 整形によって href が class より前に来ることがある。並び順に依存した走査は
  // そのとき脚注そのものを見つけられず、リンク切れが素通りする。
  const result = audit(
    BASELINE.replace(
      '<a class="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref">',
      '<a href="#ref9" class="footnote-ref" id="fnref1" role="doc-noteref">'
    )
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("参照先の無い脚注があります: #ref9")
    )
  );
});

test("href を持たない脚注を検出する", () => {
  const result = audit(BASELINE.replace('href="#ref1" id="fnref1"', 'id="fnref1"'));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("脚注に href がありません")
    )
  );
});

test("チェックリストの静的カウントを読み取れなければ検出する", () => {
  // 読み取れないときに黙って飛ばすと、表記が崩れたカードで実数照合ごと無効化される。
  // .pill と同じく、件数不明であること自体を構造の指摘として立てる。
  const result = audit(BASELINE.replace("0 / 2 完了", "未着手"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("チェックリストの静的カウントを読み取れません")
    )
  );
});

test("チェックリストの静的カウントが実数と食い違えば検出する", () => {
  const result = audit(BASELINE.replace("0 / 2 完了", "0 / 20 完了"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("チェックリストの静的カウント")
    )
  );
});

test("描画 JS のセレクタ文字列はチェックリストの実数に数えない", () => {
  // 進捗カウンタの実装は `card.querySelectorAll('input[type="checkbox"]')` を含む。
  // これを項目として数えると、正しいページが必ず不一致と判定されてしまう。
  const result = audit(BASELINE);

  assert.equal(result.status, 0);
  assert.deepEqual(category(result.json, "structure"), []);
});

test("hero の pill が 4 枚でなければ検出する", () => {
  const result = audit(
    BASELINE.replace('<span class="pill">対象 <strong>初学者</strong></span>\n', "")
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) => detail.includes(".pill はちょうど 4 枚"))
  );
});

test("hero の pill が示す図解数と実数の不一致を検出する", () => {
  const result = audit(BASELINE.replace("Mermaid 1点", "Mermaid 9点"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) => detail.includes("図解数が実数と一致しません"))
  );
});

test("hero の pill が示す参考文献数と実数の不一致を検出する", () => {
  const result = audit(BASELINE.replace("<strong>1件</strong>", "<strong>9件</strong>"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("参考文献数が実数と一致しません")
    )
  );
});

test("図解の pill が示す数を読み取れなければ検出する", () => {
  // 読み取れないときに黙って照合を飛ばすと、表記が崩れたページで実数チェックごと
  // 無効化される。件数不明であること自体を構造の指摘として立てる。
  const result = audit(BASELINE.replace("Mermaid 1点", "Mermaid 多数"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("図解数を読み取れません")
    )
  );
});

test("図解の pill 自体が無ければ検出する", () => {
  // .pill を 4 枚に保ったままラベルだけを差し替えると枚数の検査は通ってしまう。
  const result = audit(
    BASELINE.replace(
      '<span class="pill">図解 <strong>Mermaid 1点</strong></span>',
      '<span class="pill">図版 <strong>Mermaid 1点</strong></span>'
    )
  );

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("「図解」の .pill がありません")
    )
  );
});

test("参考文献の pill が示す数を読み取れなければ検出する", () => {
  const result = audit(BASELINE.replace("<strong>1件</strong>", "<strong>多数</strong>"));

  assert.equal(result.status, 1);
  assert.ok(
    category(result.json, "structure").some((detail) =>
      detail.includes("参考文献数を読み取れません")
    )
  );
});

test("外部リンクは target=_blank の有無どちらでも指摘しない", () => {
  // 本 repo の .ref-card のリンクは素の <a href> である（移行元の必須規則は適用しない）。
  // 素のリンクと target 付きリンクの双方を監査し、どちらも無指摘であることを固定する。
  const plain = audit(BASELINE);
  const withTarget = audit(
    BASELINE.replace(
      '<a href="https://example.com/official">',
      '<a href="https://example.com/official" target="_blank" rel="noopener">'
    )
  );

  assert.equal(plain.status, 0);
  assert.deepEqual(plain.json.findings, []);
  assert.equal(withTarget.status, 0);
  assert.deepEqual(withTarget.json.findings, []);
});

// --------------------------------------------------------------------------
// CLI
// --------------------------------------------------------------------------

test("--template ではマーカーと本文構造の検査を省く", () => {
  const template = BASELINE.replace("<h1>学習ガイド</h1>", "<h1>{{HERO_H1}}</h1>").replace(
    "</main>",
    "<!-- ##CONTENT_INSERT## -->\n</main>"
  );
  const result = audit(template, BASELINE, ["--template"]);

  assert.equal(result.status, 0);
});

test("引数が足りなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript], { encoding: "utf8" });

  assert.equal(result.status, 2);
});

test("--reference の値が無ければ終了コード 2 を返す", () => {
  // 値を伴わない `--reference` は参照元を決められない。既定値へ黙って落とすと
  // 別のデザインを正として監査が通ってしまうため、引数エラーとして落とす。
  const missingValue = spawnSync(process.execPath, [auditScript, "page.html", "--reference"], {
    encoding: "utf8",
  });
  const followedByFlag = spawnSync(
    process.execPath,
    [auditScript, "page.html", "--reference", "--json"],
    { encoding: "utf8" }
  );

  assert.equal(missingValue.status, 2);
  assert.equal(followedByFlag.status, 2);
});

test("ファイルが存在しなければ終了コード 2 を返す", () => {
  const result = spawnSync(process.execPath, [auditScript, "no-such-file.html"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 2);
});

// --------------------------------------------------------------------------
// 属性順・キー順への非依存
// --------------------------------------------------------------------------

test("属性の並び順が違っても .ref-card を数える", () => {
  // 整形によって `id` が `class` より前へ来ることがある。並び順に依存した走査は
  // カードを丸ごと取りこぼし、連番検査・脚注のリンク切れ検査・pill の実数照合を
  // まとめて黙って無効化する。
  const result = audit(BASELINE.replace('<div class="ref-card" id="ref1">', '<div id="ref1" class="ref-card">'));

  assert.equal(result.status, 0);
  assert.deepEqual(result.json.findings, []);
});

test("script 内の tr の字面を表の行として数えない", () => {
  const result = audit(
    BASELINE.replace(
      "  function healOverflowingLabels() { return null; }",
      "  var rowTemplate = '<tr><td></td></tr>';\n\n  function healOverflowingLabels() { return rowTemplate; }"
    )
  );

  assert.equal(result.status, 0);
  assert.deepEqual(category(result.json, "structure"), []);
});

test("flowchart 設定にネストしたオブジェクトがあっても useMaxWidth を読み取る", () => {
  // `[^}]*` で走査すると useMaxWidth の手前に入れ子が 1 つ入っただけで
  // 正しい設定を欠落と誤判定する。
  const result = audit(
    BASELINE.replace(
      "      flowchart: {\n        useMaxWidth: false\n      }",
      "      flowchart: {\n        subGraphTitleMargin: { top: 4, bottom: 4 },\n        useMaxWidth: false\n      }"
    )
  );

  assert.equal(result.status, 0);
  assert.deepEqual(category(result.json, "javascript"), []);
});
