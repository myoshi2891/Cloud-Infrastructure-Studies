# デザインシステム リファレンス（コピペ用カタログ）

最終更新: 2026-08-18

デザインの正は `Gcp-pca-section4-process-optimization.html`。
本書はそこから採取した**確定 markup** のカタログである。

> [!CAUTION]
> **クラス名・色を記憶で書かないこと。** 必ず本書か原本 HTML の該当行からコピーする。
> ここに載っていない class を発明した時点でデザイン移植漏れになる。
> 判断に迷ったら `node .agents/skills/md-to-html/scripts/audit_design_parity.mjs <page.html>`
> を実行して確かめる。

## 1. CSS カスタムプロパティ（`:root`）

CSS は `templates/skeleton.html.tmpl` に**原本から逐語コピー済み**なので、
新規ページで書く必要はない。値を知りたいときだけ参照する。

| 変数 | 値 | 用途 |
|---|---|---|
| `--bg` | `#07111e` | ページ背景 |
| `--bg-card` | `#0d1a2b` | カード・図・表ヘッダーの背景 |
| `--bg-card-2` | `#101f33` | 一段明るいカード背景 |
| `--border` | `#1d3350` | 通常の罫線 |
| `--border-soft` | `#16283f` | サイドバーの境界など弱い罫線 |
| `--text` | `#dbe4f3` | 本文・見出し |
| `--text-dim` | `#8fa2c0` | 補助テキスト・nav の既定色 |
| `--text-faint` | `#6a7d9c` | キャプション・最も弱いテキスト |
| `--accent` | `#7c9eff` | 主アクセント / リンク / active |
| `--accent-soft` | `#3a4f80` | アクセントの弱い線 |
| `--accent-bg` | `#15233d` | nav ホバー / active 背景 / `.ref-card .num` |
| `--danger` | `#ff8fa3` | 警告表示 |
| `--danger-bg` | `#3a1420` | 警告の背景 |
| `--warn` | `#ffbd6e` | 注意表示 |
| `--warn-bg` | `#3a2810` | 注意の背景 |
| `--success` | `#7fe0a8` | `.callout-practice` / `.practice-label` |
| `--success-bg` | `#0f2c1e` | `.callout-practice` の背景 |
| `--sidebar-w` | `300px` | サイドバー幅 |
| `--font-jp` | `'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif` | 全体 |

**ライトモードは無い。** `prefers-color-scheme` のブロックは存在しないので追加しない。
`Noto Sans JP` は Google Fonts から読む（`<head>` の `preconnect` 2 行 + `css2` 1 行）。
この 3 行を落とすとフォント指定が効かず、Mermaid の `document.fonts.load()` も空振りする。

## 2. タイポグラフィ

| 要素 | サイズ | 太さ |
|---|---|---|
| `.hero h1` | `clamp(28px, 3.6vw, 42px)` | 800 |
| `.main h2` | 26px | 800 |
| `.main h3` | 20px | 700 |
| 本文・表・リスト等 | **16px**（`body`、`line-height: 1.85`） | — |
| `.sidebar nav a` | 13.5px（`.lvl3` は 12.5px） | — |

本文は **16px 一律**。`h1` は hero にのみ置き、本文中には置かない
（`audit_design_parity.mjs` が h1 = 1 個を強制する）。

## 3. ページの骨格

```html
    <body>
        <div class="layout">
            <button class="sidebar-toggle" id="sidebarToggle" aria-label="メニュー">☰</button>
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <div class="kicker">Google Cloud PCA</div>
                    <h2>Section 4: プロセス分析と最適化</h2>
                </div>
                <nav id="sidebarNav">
                    <a href="#1-section-4の全体像" class="">1. Section 4の全体像</a>
                    <a href="#11-配点と出題範囲" class="lvl3">1.1 配点と出題範囲</a>
                </nav>
            </aside>
            <main class="main">
                <!-- hero と本文 -->
            </main>
        </div>
```

規則:

- **`<section>` は使わない。** 本文は `<main class="main">` 直下に `<h2>` / `<h3>` /
  `<p>` / `<ul>` / `<hr />` が平坦に並ぶ（Pandoc 由来の構造）
- 見出しの `id` は**原本 Markdown の目次アンカーをそのまま使う**（日本語のまま）。
  英語 kebab-case へ翻訳しない。§7 参照
- `nav` の `<a>` は h2 が既定クラス、h3 が `class="lvl3"`
- **サイドバーのリンクと本文見出しは 1:1**。過不足はどちらも監査で blocking

## 4. hero

```html
                <div class="hero">
                    <div class="kicker">Professional Cloud Architect &middot; Section 4</div>
                    <h1>
                        Google Cloud Professional Cloud Architect認定試験 Section
                        4「技術的・ビジネスプロセスの分析と最適化」学習ガイド
                    </h1>
                    <div class="meta-row">
                        <span class="pill">配点 <strong>約15%</strong></span>
                        <span class="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span class="pill">図解 <strong>Mermaid 15点</strong></span>
                        <span class="pill">参考文献 <strong>32件</strong></span>
                    </div>
                </div>
```

`.pill` は **4 枚固定**。「図解 N 点」は `pre.mermaid` の実数、「参考文献 N 件」は
`.ref-card` の実数と一致しなければならない（監査が blocking で強制する）。
中黒は `&middot;`。

## 5. コンポーネント

### 5.1 表（`<table>` は必ず `.table-scroll` で包む）

```html
                <div class="table-scroll">
                    <table>
                        <thead>
                            <tr class="header"><th>列1</th><th>列2</th></tr>
                        </thead>
                        <tbody>
                            <tr class="odd"><td>値1</td><td>値2</td></tr>
                            <tr class="even"><td>値3</td><td>値4</td></tr>
                        </tbody>
                    </table>
                </div>
```

`<table>` に class は付けない。**すべての `<tr>` に class が要る** —
ヘッダー行は `header`、本文行は `odd` / `even` を先頭から交互に付ける。
class の無い `<tr>` は監査で blocking。

### 5.2 図解（Mermaid）

```html
                <pre class="mermaid">
flowchart LR
    A["ラベル"] --&gt; B["ラベル"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill</pre
                >
```

- **`<div class="diagram-container">` と `var DIAGRAMS` は使わない。** ソースを直書きする
- 中身は**実体参照でエスケープする**（`<br/>` → `&lt;br/&gt;`、`-->` → `--&gt;`）
- 行頭のインデントは原本 Markdown のまま保持してよい
- `<svg>` へ幅・高さを書かない（`healOverflowingLabels()` が後処理する）

### 5.3 ベストプラクティスの囲み

```html
                <div class="callout-practice">
                    <div class="icon">✓</div>
                    <div class="body">
                        <div class="label">ベストプラクティス</div>
                        <p>本文。</p>
                    </div>
                </div>
```

見出しだけを立てたい場合は単体の `.practice-label` を使う（`::before` が `✓` を描く）。

```html
                <div class="practice-label">ベストプラクティス</div>
```

**callout はこの 1 種類だけ。** `note` / `source` などの派生を作らない。

### 5.4 学習チェックリスト

```html
                <div class="checklist-card">
                    <div class="checklist-header">
                        <span class="title">学習チェックリスト</span
                        ><span class="count">0 / 20 完了</span>
                    </div>
                    <ul>
                        <li>
                            <input id="chk1" type="checkbox" /><label for="chk1"
                                >説明できる項目</label
                            >
                        </li>
                    </ul>
                </div>
```

`.count` の数は**実際の `<input type="checkbox">` の個数と一致させる**（監査が blocking）。
`id="chkN"` は 1 から連番、`<label for>` と対にする。
読み込み時に描画 JS が `0 / N 完了` を書き直すが、静的表記も正しくしておく。

### 5.5 脚注と参考文献

本文中の参照:

```html
                    <p>
                        本文です<a
                            class="footnote-ref"
                            href="#ref1"
                            id="fnref1"
                            role="doc-noteref"
                            ><sup>1</sup></a
                        >。
                    </p>
```

参考文献セクション:

```html
                    <div class="ref-grid" id="referenceGrid">
                        <div class="ref-card" id="ref1">
                            <div class="num">1</div>
                            <div class="txt">
                                出典の名称.
                                <a href="https://example.com/doc">https://example.com/doc</a>
                            </div>
                        </div>
                    </div>
```

- `.ref-card` の `id` は `ref1` から**連番**（監査が blocking）
- `.footnote-ref` の `href` は必ず実在する `.ref-card` を指す（同上）
- `id="fnrefN"` は本文中の出現順の通し番号。`<sup>` の数字は脚注番号（重複してよい）
- **リンクに `target="_blank"` / `rel="noopener"` は付けない**（原本の書式）

### 5.6 インラインコード

```html
<code>gcloud builds submit</code>
```

`.main code:not(pre code)` が効く。`<pre>` のコードブロックは原本に無いので作らない。

## 6. 存在しないコンポーネント（作らないこと）

原本にはこれらが**無い**。「あった方が親切」という理由で追加するとデザイン不一致になる。

- ページ先頭に戻るボタン / 読了プログレスバー
- アコーディオン / タブ / モーダル / 検索ボックス / ライトモード切替
- アイコンフォント（Tabler 等）— このデザインはアイコンを使わない
- `<pre>` のコードブロック / シンタックスハイライト
- `<blockquote>` のスタイル
- パンくずリスト / ページネーション / フッター
- 統計カード（`.stat-card`）/ 用語集グリッド / ステップリスト / 出題比率カード

## 7. 命名規約

| 対象 | 規約 | 例 |
|---|---|---|
| 見出しの `id` | **原本 Markdown の目次アンカーをそのまま** | `1-section-4の全体像` / `21-ソフトウェア開発ライフサイクルsdlc` |
| チェックリストの `id` | `chk` + 1 起点の連番 | `chk1` |
| 参考文献の `id` | `ref` + 1 起点の連番 | `ref1` |
| 脚注参照の `id` | `fnref` + 本文中の出現順 | `fnref7` |
| 出力ファイル名 | 資格・章の名称をハイフン区切り、リポジトリ直下 | `Gcp-pca-section4-process-optimization.html` |

## 8. Mermaid の配色（`classDef` は 4 役）

```text
classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
classDef dangerFill    fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
classDef successFill   fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
classDef warnFill      fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
```

| 役 | 使いどころ |
|---|---|
| `highlightFill` | 図の主役ノード。既定 |
| `dangerFill` | 障害・ロールバック・失敗経路 |
| `successFill` | 成功・完了状態 |
| `warnFill` | 注意・保留状態 |

`audit_content_parity.mjs` は `pre.mermaid` 内の `fill` / `stroke` / `color` を検査し、
上記 9 色以外を検出すると exit 1 にする。
**明色パレット（`#EEF1F8` / `#2E3F72` 等）を持ち込まない。**

配色を指定しないノードは `themeVariables`（`primaryColor: #12233b` 等）で暗色に描かれる。
`themeVariables` は 13 項目あり、テンプレートに逐語コピー済み。値を変えない。

## 9. レスポンシブ

| ブレークポイント | 挙動 |
|---|---|
| ≤980px | サイドバーがスライドアウト化（`.sidebar-toggle` 表示）、`.main` の `margin-left` が 0、`.ref-grid` が 1 列 |

メディアクエリは**この 1 本だけ**。`prefers-reduced-motion` のブロックは無い。

## 10. 関連

- `references/conversion-rules.md` — Markdown からの変換規則
- `templates/skeleton.html.tmpl` — CSS / JS を逐語保持したページ雛形
- `.agents/skills/fix-mermaid/SKILL.md` — Mermaid の構文エラー対処
