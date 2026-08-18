# デザインシステム リファレンス（コピペ用カタログ）

最終更新: 2026-08-14

デザインの正は `Certified-Associate-in-Project-Management.html`。
本書はそこから採取した**確定 markup** のカタログである。

> [!CAUTION]
> **クラス名・色・アイコン名を記憶で書かないこと。** 必ず本書か原本 HTML の該当行から
> コピーする。ここに載っていない class を発明した時点でデザイン移植漏れになる。
> 判断に迷ったら `.claude/skills/md-to-html/scripts/audit_design_parity.mjs` を実行して確かめる。

## 1. CSS カスタムプロパティ（`:root`）

CSS は `templates/skeleton.html.tmpl` に**原本から逐語コピー済み**なので、
新規ページで書く必要はない。値を知りたいときだけ参照する。

| 変数 | 値 | 用途 |
|---|---|---|
| `--color-paper` | `#F6F7F9` | ページ背景 / 表の偶数行 |
| `--color-paper-raised` | `#FFFFFF` | カード・サイドバー背景 |
| `--color-paper-sunken` | `#EEF0F4` | 表ヘッダー / インラインコード背景 |
| `--color-ink` | `#161B26` | 本文・見出し |
| `--color-ink-soft` | `#4B5566` | 補助テキスト・表本文 |
| `--color-ink-faint` | `#8A93A3` | キャプション・フッター・nav アイコン |
| `--color-border` | `#DFE3EA` | 通常の罫線 |
| `--color-border-strong` | `#C7CDD9` | 表ヘッダー下の罫線 |
| `--color-indigo` | `#2E3F72` | 主アクセント / リンク / d1 |
| `--color-indigo-dark` | `#1F2C57` | 予備（現在未参照） |
| `--color-indigo-tint` | `#EEF1F8` | nav ホバー / info 背景 / d1 タグ |
| `--color-gold` | `#B8802A` | hero eyebrow / practice callout / d3 |
| `--color-gold-tint` | `#FAF1DF` | d3 タグ背景 |
| `--color-forest` | `#1B6E6A` | source callout / d2 |
| `--color-forest-tint` | `#E7F3F2` | source callout 背景 / d2 タグ |
| `--color-plum` | `#8C3A5C` | note callout / エラー表示 / d4 |
| `--color-plum-tint` | `#F6EAEF` | d4 タグ背景 |
| `--color-success-bg` / `-text` / `-border` | `#EAF4EC` / `#2F6B3D` / `#BFE0C6` | 図の `done` 役 |
| `--color-info-bg` / `-text` / `-border` | `#EEF1F8` / `#2E3F72` / `#C7D1EA` | `.disclaimer-box` |
| `--font-display` | `"Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif` | 見出し・数値 |
| `--font-sans` | `-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif` | 本文 |
| `--font-mono` | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` | インラインコード |
| `--sidebar-width` | `288px` | サイドバー幅 |

**ダークモードは無い。** `prefers-color-scheme` のブロックは存在しないので追加しない。

## 2. タイポグラフィ

| 要素 | フォント | サイズ | 太さ |
|---|---|---|---|
| `h1`（hero のみ） | display | 42px（≤980px で 32px） | 700 |
| `h2` | display | 29px | 700 |
| `h3` | display | 21px | 600 |
| `h4` | sans | 17px | 600 |
| `.hero-lede` | sans | 18px | — |
| `.stat-number` | display | 28px | 700 |
| `.domain-pct` | display | 30px | 700 |
| 本文・表・callout・キャプション等 | sans | **16px** | — |

本文は **16px 一律**。rem の段階的スケールは使っていない。`h1` は hero にのみ置き、
セクション内には置かない（`audit_design_parity.mjs` が h1 = 1 個を強制する）。

## 3. セクションの雛形

```html
    <!-- ===================== N. English Name ===================== -->
    <section id="kebab-slug">
      <div class="section-eyebrow"><i class="ti ti-xxx"></i>SECTION 0N</div>
      <h2>見出し</h2>

      <p>本文…</p>

      <div class="callout source">…</div>
    </section>
```

規則:

- `id` は**英語の kebab-case**。日本語アンカーは使わない
- `SECTION NN` はゼロ埋めの連番。ページ内で必ず 01 から連続する
- `.section-eyebrow` のアイコンは、**サイドバーの同じリンクと同一**でなければならない
- `.callout source` は原則セクションの最後の子要素

## 4. コンポーネント

### 4.1 表（`<table>` は必ず `.table-wrap` で包む）

```html
      <div class="table-wrap">
        <table>
          <thead><tr><th>列1</th><th>列2</th></tr></thead>
          <tbody>
            <tr><td>値1</td><td>値2</td></tr>
          </tbody>
        </table>
      </div>
```

`<table>` に class は付けない（`.table-wrap table` の子孫セレクタで効く）。
偶数行のゼブラ、ヘッダー背景、罫線はすべて CSS 側で自動。

### 4.2 Callout（3 種のみ）

| 種別 | class | アイコン | 見出し語 | 色 |
|---|---|---|---|---|
| ベストプラクティス | `callout practice` | `ti-bulb` | ベストプラクティス | gold |
| 出典 | `callout source` | `ti-external-link` | ソース | forest |
| 補足 | `callout note` | `ti-info-circle` | 補足 | plum |

```html
      <div class="callout practice">
        <div class="callout-title"><i class="ti ti-bulb"></i>ベストプラクティス</div>
        <ul>
          <li><strong>要点の一文。</strong>補足の説明が続きます。</li>
        </ul>
      </div>

      <div class="callout source">
        <div class="callout-title"><i class="ti ti-external-link"></i>ソース</div>
        <ul>
          <li><a href="https://example.com" target="_blank" rel="noopener">出典名</a></li>
        </ul>
      </div>

      <div class="callout note">
        <div class="callout-title"><i class="ti ti-info-circle"></i>補足</div>
        <p>補足の本文。</p>
      </div>
```

`<strong>` と後続の文の間に**空白を入れない**（原本の書式）。
`callout` 単体（種別なし）は原本で未使用なので使わない。

### 4.3 図解（Mermaid）

```html
      <div class="diagram-card">
        <div class="diagram-container" id="camelCaseId"><div class="diagram-loading">図を読み込み中...</div></div>
        <div class="diagram-caption">図の主題を短く述べたキャプション</div>
      </div>
```

`id` は `DIAGRAMS` のキーと**完全一致**させる（両者の集合一致を監査が強制する）。
中央寄せは `.diagram-container` の `display:flex; justify-content:center` が担当。
`<svg>` へ幅・高さを書かない（描画 JS が後処理で `max-width:100%` を付ける）。

### 4.4 ステップリスト（順序のある手順）

```html
      <ol class="step-list">
        <li>
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">ステップの見出し</div>
            <div class="step-desc">ステップの説明文。</div>
          </div>
        </li>
      </ol>
```

### 4.5 出題比率カード（N 分類の比率表示）

```html
      <div class="domain-grid">
        <div class="domain-card d1"><div class="domain-pct">36%</div><div class="domain-name">ドメイン1: PM基礎と主要概念</div></div>
        <div class="domain-card d2"><div class="domain-pct">17%</div><div class="domain-name">ドメイン2: 予測型・計画重視の手法</div></div>
        <div class="domain-card d3"><div class="domain-pct">20%</div><div class="domain-name">ドメイン3: アジャイルフレームワーク・手法</div></div>
        <div class="domain-card d4"><div class="domain-pct">27%</div><div class="domain-name">ドメイン4: ビジネス分析フレームワーク</div></div>
      </div>
```

**`d1`=indigo / `d2`=forest / `d3`=gold / `d4`=plum の対応は固定。** 分類が 4 個を超える場合は
`d1`〜`d4` を循環させず、ユーザーに配色の追加を確認する。

### 4.6 分類タグ（該当セクションの冒頭に置く）

```html
      <span class="domain-tag d1">ドメイン1 &middot; 36%</span>
```

`.section-eyebrow` と `<h2>` の**間**に置く。中黒は `&middot;`（このページで使う唯一の実体参照）。

### 4.7 用語集グリッド

```html
      <div class="glossary-grid">
        <div class="glossary-item"><div class="g-term">WBS(Work Breakdown Structure)</div><div class="g-def">プロジェクトスコープを階層的に分解した構成図</div></div>
      </div>
```

### 4.8 統計カード（hero 内・**4 枚固定**）

```html
      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">150問</div><div class="stat-label">うち135問が採点対象</div></div>
      </div>
```

CSS が `repeat(4, minmax(140px, 1fr))` 前提なので、枚数を増減しない。

### 4.9 参考文献リスト

```html
      <div class="ref-group">
        <h4>カテゴリ名</h4>
        <ul class="ref-list">
          <li><span class="ref-name">出典の名称</span><a class="ref-url" href="https://example.com" target="_blank" rel="noopener">https://example.com</a></li>
        </ul>
      </div>
```

参考文献セクション内のみ `<h4>` をカテゴリ見出しとして使う。

### 4.10 免責ボックス（hero 内・1 個）

```html
      <div class="disclaimer-box">
        <i class="ti ti-info-circle"></i>
        本ガイドは教育・学習支援を目的とした非公式の解説資料です。…必ず<a href="https://…" target="_blank" rel="noopener">公式サイト</a>で最新情報をご確認ください。
      </div>
```

### 4.11 インラインコード

```html
<code>SV = EV − PV</code>
```

計算式にのみ使う。**`<pre>` のコードブロックは原本に存在しない**ので作らない。

## 5. 存在しないコンポーネント（作らないこと）

原本にはこれらが**無い**。「あった方が親切」という理由で追加するとデザイン不一致になる。

- ページ先頭に戻るボタン / 読了プログレスバー
- アコーディオン / タブ / モーダル
- 検索ボックス / ダークモード切替
- `<pre>` によるコードブロック / シンタックスハイライト
- `<blockquote>` のスタイル（引用は `.callout note` で表現する）
- パンくずリスト / ページネーション

## 6. Tabler アイコン

記法は常に `<i class="ti ti-NAME"></i>`。ラベル要素の**最初の子**に置く。

| 用途 | アイコン |
|---|---|
| サイドバー開閉ボタン | `ti-menu-2` |
| hero eyebrow | `ti-award` |
| 免責ボックス / note callout | `ti-info-circle` |
| practice callout | `ti-bulb` |
| source callout | `ti-external-link` |
| 資格の概要 | `ti-certificate` |
| ロードマップ・手順 | `ti-route` |
| 受験資格・要件確認 | `ti-clipboard-check` |
| 試験形式・一覧 | `ti-list-check` |
| 比率・構成割合 | `ti-chart-pie` |
| 基礎・体系・組織 | `ti-building-bank` |
| 計画・スケジュール | `ti-timeline` |
| アジャイル・分岐 | `ti-git-branch` |
| 要求・文書 | `ti-clipboard-text` |
| 用語集 | `ti-book-2` |
| 試験当日・日程 | `ti-calendar-event` |
| 資格維持・更新 | `ti-refresh` |
| 学習プラン | `ti-map-2` |
| まとめ | `ti-flag-3` |
| 参考文献 | `ti-link` |

該当が無いときの既定は `ti-file-text`。**同じアイコンを 2 つのセクションに割り当てない。**

## 7. Mermaid の配色（`classDef` は 3 役のみ）

```text
classDef box  fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub  fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
```

| 役 | 使いどころ |
|---|---|
| `box`（`step` も同義で可） | 通常のノード。既定 |
| `hub` | 図の起点・中心となる 1 ノード |
| `done` | 完了・成功状態を表す終端ノード |

`audit_content_parity.mjs` は `DIAGRAMS` 内の `fill` / `stroke` / `color` を検査し、
上記 7 色 + `#FFFFFF` + `#DFE3EA` 以外を検出すると exit 1 にする。
**原本 Markdown の暗色パレット（`#111827` / `#1f2937` / `#7c9eff` / `#e5e7eb`）は必ず置換する。**

`pie` の配色は `themeVariables` の `pie1`〜`pie4`（`#C7D1EA` / `#AEDBD6` / `#F0D9A6` / `#E7C0D0`）で、
`d1`〜`d4` の彩度を落とした色。分類の色対応が図とカードでずれないようになっている。

## 8. レスポンシブ

| ブレークポイント | 挙動 |
|---|---|
| ≤980px | サイドバーがスライドアウト化（`.sidebar-toggle` 表示）、統計カードとドメインカードが 2 列、用語集が 1 列、h1 が 32px |
| ≤560px | 統計カードとドメインカードが 1 列 |
| `prefers-reduced-motion` | スムーススクロールとサイドバーのトランジションを無効化 |

## 9. 関連

- `references/conversion-rules.md` — Markdown からの変換規則
- `templates/skeleton.html.tmpl` — CSS / JS を逐語保持したページ雛形
- `.claude/skills/fix-mermaid/SKILL.md` — Mermaid の構文エラー対処
- `.claude/skills/cdn-sri-mermaid-fix/SKILL.md` — CDN 固定と SRI ハッシュの実測手順
