---
name: fix-mermaid
description: >
  Fix Mermaid syntax, rendering, clipping, readability, and sizing problems in HTML,
  Markdown, React, and TSX. Use when diagrams fail to render, Mermaid reports a syntax
  or version error, labels are clipped or unreadable, diagrams are too large or small,
  different diagram types need individual sizing, or SVG/card layout is unbalanced.
---

# Mermaid 構文・描画修正スキル

## 🚀 まず再利用スクリプトを使う（トークン節約・最優先）

静的 HTML の Mermaid 描画崩れを直すときは、**ボイラープレート（render ループ・SVG 後処理・中央寄せ CSS）を手書きで再生成しないこと**。以下の再利用スクリプトで機械的処理を一括適用できる。

1. **図ソースを JS テンプレートリテラルで定義**（LLM の判断が必要なのはここだけ）:
   各図を 1 ステートメント 1 行・カラム 0・改行は `<br/>` で `const DIAGRAMS = { 'diag-1': \`flowchart TD ...\` }` として HTML の `<script>` 内に書く。
2. **描画パイプラインを冪等適用**:

   ```bash
   bun run .claude/skills/fix-mermaid/scripts/apply_render_pipeline.mjs <file.html>
   ```

   これが `<div class="mermaid">…</div>` → 連番 id 付き空 div への置換、`startOnLoad:false`+`securityLevel:'loose'` 付与、`applySvgFixups`+render ループ注入、中央寄せ CSS 注入をまとめて行う（再実行しても二重適用しない）。

3. **正本 Markdown から図を復元する場合**（HTML 側ソースが破壊された等）:

   ```bash
   bun run .claude/skills/fix-mermaid/scripts/restore_diagrams.mjs <file.html> <source.md>
   ```

4. **インデント汚染・行分断のみの修正**（`.html`/`.md`/`.tsx`）は `fix_mermaid.ts`:

   ```bash
   bun run .claude/skills/fix-mermaid/scripts/fix_mermaid.ts <file>
   ```

> **SVG 幅の鉄則**: `apply_render_pipeline.mjs` は SVG 幅に **viewBox 由来の自然 px 幅 + `maxWidth:100%`** を使う。`width:'100%'` も `width:'auto'`（viewBox のみで intrinsic サイズを持たない SVG ではコンテナ全幅へ伸びる）も、小さい flowchart LR 図を異常拡大させるため**使わない**。

## 対象

- `.html` ファイル内の `<div class="mermaid">` ブロック
- `.md` ファイル内の ` ```mermaid ` ブロック
- `.tsx` / `.ts` / `.jsx` / `.js` ファイル内の `chart={`...`}` などのテンプレートリテラル内の Mermaid 構文

## Mermaid v10 の必須ルール

1. コンテンツは**カラム0配置**（先頭空白なし）
2. 各ステートメントは**改行で分離**（1行に複数連結しない）
3. ノードラベル `A["text"]` の内容は**1行に収める**
4. `mindmap` のみ例外 — 内部インデントは階層構造を表すため保持する
5. `block-beta` は**使用禁止** — v10.9.5 で全体クラッシュの原因になる。`graph TD` で代替する

## よくある原因

HTMLやコードのフォーマッタ（Prettier等）による破壊パターン:

- 14スペース等のHTML/コードインデントがMermaidコンテンツに混入する
- 長いノードラベルが行分断される（`A["テキスト` と `続き"]` に分かれる）
- 複数ステートメントが1行に連結される（`graph TD A["x"] B["y"] A --> B`）

## 修正手順

1. `Grep` で修正対象ファイルを検索し、Mermaid ブロックを把握する
2. `Read` で各ブロックを確認し、上記ルール違反を特定する
3. `Edit` または自動修正スクリプトで各ブロックの内容を修正する

自動修正を行う場合は TypeScript 版スクリプト `fix_mermaid.ts` を `bun` で実行します:

```bash
bun run .claude/skills/fix-mermaid/scripts/fix_mermaid.ts path/to/file.tsx
```

## 変換例

**Before（壊れた状態）:**

```html
<div class="mermaid">
  graph LR A["ノードA"] B["ノードB"] A --> B
  style A fill:#fff
</div>
```

**After（修正後）:**

```html
<div class="mermaid">
graph LR
A["ノードA"]
B["ノードB"]
A --> B
style A fill:#fff
</div>
```

## ダイアグラム別の注意点

詳細は `references/mermaid-v10-guide.md` を参照。要点のみ:

| 種別 | 注意点 |
| ------ | -------- |
| `graph` / `flowchart` | 最頻出。カラム0ルールを厳守 |
| `sequenceDiagram` | `Note over A,B:` は1行に収める |
| `mindmap` | 内部インデント保持（唯一の例外） |
| `block-beta` | **使用禁止**（全体クラッシュ） |
| `htmlLabels: true` 環境 | `<` → `&lt;`、`>` → `&gt;` に変換 |

## 実地検証済み：ブラウザレンダラー固有の問題（2026年3月）

静的パーサー `@mermaid-js/parser` ではエラーにならないが、ブラウザの Mermaid v10.9.5 レンダラーで `Syntax error in text` が発生するパターン。

### IDEフォーマッター（Prettier）による破壊が根本原因

`<div class="mermaid">` に Mermaid ソースを直接書くと、VSCode/Prettier が保存のたびにインデントを付加して構文を壊す。**恒久対策は JS テンプレートリテラルへの移管**。

```html
<!-- ❌ Prettierが保存時にインデントを付加して破壊する -->
<div class="mermaid">
graph LR
A --> B
</div>

<!-- ✅ JSテンプレートリテラル方式（IDEが一切触れない） -->
<div id="diag-0"></div>
<script>
const DIAGRAMS = {
  'diag-0': `graph LR
A --> B`,
};
mermaid.initialize({ startOnLoad: false });
(async () => {
  for (const [id, src] of Object.entries(DIAGRAMS)) {
    const { svg } = await mermaid.render('svg-' + id, src);
    document.getElementById(id).innerHTML = svg;
  }
})();
</script>
```

この方式では `-->` を `--&gt;` にエスケープする必要もなくなる。

### ブラウザレンダラーで Syntax Error を起こす文字・構文

| 箇所 | 問題のある記述 | 対処 |
| ------ | --------------- | ------ |
| `subgraph` ラベル | 丸括弧 `()` を含む | 削除または別表現に置換 |
| `subgraph` ラベル | 絵文字（`🌐` `🖥️` 等） | 削除 |
| `participant ... as` | 絵文字（`👤` `⚡` 等） | 削除 |
| エッジラベル `\|...\|` | 先頭スラッシュ `\|/command\|` | スラッシュを除去 |
| ノードラベル `["..."]` | 全角波ダッシュ `〜` | `から` 等の日本語に置換 |
| ノードラベル `["..."]` | スラッシュ `path/to` | `-` またはスペースに置換 |
| 菱形ノード `{}` | クォートなし日本語 `{新しいファイル}` | `{"新しいファイル"}` とクォートする |
| `quadrantChart` の座標 / テキスト | ダブルクォーテーションなしの文字列 | `""` で囲む (例: `"CEO/CTO": [0.8, 0.9]`) |
| 全ての図解 (全般) | 全角丸括弧 `（）` | 半角丸括弧 `( )` に置換する |
| 全ての図解 (全般) | 全角ダッシュ `―` | 半角ハイフン `-` に置換する |
| 全ての図解 (全般) | 全角コロン `：` | 半角コロン `:` に置換する |

### SVG サイズ制御

Mermaid v10 は SVG 要素に絶対ピクセル値の `width`/`height` 属性を付与する。`mermaid.render()` 後に必ず除去する。

```js
svgEl.removeAttribute('width');
svgEl.removeAttribute('height');
svgEl.style.width    = `${w}px`;   // 自然 px 幅（width:${w}px + maxWidth:100% の新ルールに準拠）
svgEl.style.maxWidth = '100%';
svgEl.style.height   = 'auto';
```

CSS にもフォールバックを追加する：

```css
.mermaid-wrap svg {
  max-width: 100% !important;
  height: auto !important;
}
```

### シーケンス図・状態遷移図等の下部見切れ（クリッピング）対策（2026年6月追記）

Mermaid v10 のシーケンス図（`sequenceDiagram`）や状態遷移図（`stateDiagram`）のレンダラーには、描画される最下部要素（ライフライン下端、下部アクターボックス、ループブロック、警告メモ等）の境界座標を正しく計算できず、生成される SVG の `viewBox` 属性の高さ（height）が不足するバグがあります。

親要素（`.diagram-wrap` 等）に `overflow-x: auto` などが指定されている場合、CSSの仕様により縦方向もクリッピング（`hidden` 同等）されるため、はみ出た下部要素が切り落とされて見えなくなります。

**【対策】**
`mermaid.render()` 後に、JS で動的に `viewBox` の高さを拡張し、十分なスペースを確保した上で再適用します。

```javascript
// viewBox の高さを拡張して、下部見切れを解消
const viewBoxStr = svgEl.getAttribute('viewBox');
if (viewBoxStr) {
    const parts = viewBoxStr.split(' ').map(Number);
    if (parts.length === 4) {
        const isSequenceOrState = src.trim().startsWith('sequenceDiagram') || src.trim().startsWith('stateDiagram');
        // mirrorActors: true（上下両方のアクターボックス表示）の場合は縦幅が大きく伸びるため
        // 余裕を持って高さを増やす（シーケンス図等は +110px、その他は +15px 程度）
        const extraHeight = isSequenceOrState ? 110 : 15;
        svgEl.setAttribute('viewBox', `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3] + extraHeight}`);
    }
}
```

### `quadrantChart` の文字被り対策（2026年6月追記）

`quadrantChart` でプロットされる各要素のテキストラベルが重なって表示される場合は、`mermaid.initialize` の設定にて内部描画解像度を大きく指定します。

```javascript
mermaid.initialize({
    quadrantChart: {
        chartWidth: 800,  // デフォルトの500から拡大して表示エリアを広げる
        chartHeight: 600, // デフォルトの400から拡大
        pointRadius: 8,
        pointLabelFontSize: 14
    }
});
```

このうえで、HTML のラッパー（`.mermaid-wrap` 等）のインラインスタイル（例: `style="max-width: 750px; margin: 0 auto;"`）で表示幅を制限することで、描画文字同士の被りを完全に回避しつつ、画面に収まる綺麗さでレスポンシブ表示できます。

### HTML での Mermaid 図解の中央寄せ Flexbox スタイル（2026年6月追記）

静的 HTML で Mermaid を表示する際、図解が左寄せになるのを防ぎ中央寄せにするための CSS 実装例です。

```css
.mermaid-wrap {
    display: flex;
    justify-content: center;
}
.mermaid {
    display: flex;
    justify-content: center;
    width: 100%;
}
.mermaid svg {
    display: block;
    margin: 0 auto;
    max-width: 100% !important;
    height: auto !important;
}
```

### React/Next.js (CSS Modules) 移植時の表示と中央寄せ（2026年5月追記）

React (Next.js App Router) 移行に際して共通の `MermaidDiagram` コンポーネントを使用する場合、CSS Modules との競合やテスト環境（Vitest）での描画エラーに注意する必要があります。

#### 1. CSS Modules 環境下での中央寄せとサイズ制限

共通の `MermaidDiagram` コンポーネントは出力時にグローバルクラス `"mermaid"` を付与します。しかし、CSS Modules（`*.module.css`）で指定した `.mermaid` はクラス名がハッシュ化されるため、スタイルが当たらなくなり左寄せになってしまいます。

**【対策】**

1. **TSX 側**: `MermaidDiagram` をラッパー div で囲み、ハッシュ化されるクラス名 (`styles.mermaid`) と、個別幅制限用のグローバル ID (`id="diag-X"`) を付与します。

```tsx
<div id="diag-0" className={styles.mermaid}>
  <MermaidDiagram chart={DIAGRAM_0} />
</div>
```

1. **CSS 側**: ハッシュ化クラスから下位のグローバルな `svg` をターゲットするため、`:global` セレクタを使用します。

```css
.mermaid {
  display: block;
  width: 100%;
}
.mermaid > div {
  width: 100%;
}
.mermaid :global(svg) {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}
```

   個別 ID セレクタ（`#diag-0 svg` 等）は CSS Modules でも変換されないため、グローバル ID セレクタ経由で最大幅（`max-width`）を制御できます。

#### ⚠️ サイズ調整は図ごとに行い、文字の実効サイズを変えない

サイズ問題を直す前に、対象ページの**全図**について `id`、図種（TD/LR/state/pie等）、SVG `viewBox` の `w/h`、親要素の実幅を一覧化する。1枚だけ見て共通値を変えない。

**文字サイズと図の表示倍率を分離する**。Mermaid の設定が16px（標準環境の1rem）でも、SVG全体を拡縮すると見かけの文字サイズも変わる。

```text
実効文字px = Mermaid文字px × min(表示SVG幅 / viewBox幅, 高さ上限 / viewBox高さ)
```

1remを維持する図は `表示SVG幅 = viewBox幅`、`max-height:none` にする。カード内幅は `viewBox幅 + 左右padding + border` 以上を確保する。これ未満では `max-width:100%` がSVGを縮め、文字も1rem未満になる。`1rem=16px` と決めつけず、対象ページのルートfont-sizeを確認する。16px以外ならMermaidの採寸前に同じ実効px値を設定し、描画後のCSSだけで文字を変えない（ノード寸法と不一致になる）。`max-width:100%` は狭い画面での縮小用として残す。モバイルでも厳密に1remを維持する要件なら、SVGを縮めず親に `overflow-x:auto` を付ける。

**禁止事項**:

- 異なる図種へ同じ `minWidth` / `maxHeight` を一括適用しない
- `targetWidth = max(viewBoxWidth, 560)` のようにSVG全体を拡大しない（文字も巨大化する）
- 縦長図へ `max-height` を付けない（横幅と文字まで縮小する）
- 親を `fit-content` にしない（子の `width:100%` と循環し、LR図が縮む）
- 1ページの問題を直すために共通コンポーネントの既定動作を変更しない

**個別対応の正準手順**:

1. 共通コンポーネントの既定動作を維持し、自然倍率を選べる任意propを追加する。
2. ページ側に図IDごとの設定表を置き、カード幅と自然倍率の使用有無を個別指定する。
3. 親は `display:block; width:100%` とし、図別 `max-width` で `viewBox幅 + 左右padding + border` 以上の表示領域を確保する。
4. SVGは自然幅 + `max-width:100%` + `height:auto` を使う。図を広く見せたい場合はSVGを拡大せず、カード幅やMermaid DSLの `nodeSpacing` / `rankSpacing` をその図だけ調整する。
5. TD、LR、state、pieを最低1枚ずつ確認し、修正対象外の図が縮小・拡大していないことを確認する。

```tsx
const DISPLAY = {
  'vertical-flow': { frameWidth: measured.verticalFlowFrame, naturalScale: true },
  'wide-topology': { frameWidth: measured.wideTopologyFrame, naturalScale: true },
} as const;

<div style={{ maxWidth: DISPLAY[id].frameWidth, width: '100%' }}>
  <MermaidDiagram preserveNaturalScale={DISPLAY[id].naturalScale} />
</div>
```

自然倍率propのテストでは、`width === viewBox幅` かつ `maxHeight === 'none'` かつ `maxWidth === 'none'` を検証する。既定動作のテストも残し、他ページへの波及を防ぐ。

#### ⚠️ スクロール時の図解縮小・チカチカバグの防止（React.memo メモ化）

`IntersectionObserver` 等によるスクロール位置の監視（`setActiveSection` 等）により、親コンポーネントがスクロールするたびに高頻度で再レンダリングされる。
ダイアグラムラッパー（`Diagram` コンポーネント等）および `MermaidDiagram` がメモ化されていない場合、親の再レンダリングのたびに `dangerouslySetInnerHTML` や `useEffect` がトリガーされ、DOM に適用された `style.width` などのインラインスタイルがリセットされて「上下スクロール時に図が豆粒に縮小される」不具合が発生する。

**【対策】**:
1. `MermaidDiagram` および各ガイドページの `Diagram` コンポーネントを必ず `React.memo` でラップする。
2. `preserveNaturalScale=true` が指定されている場合、`applySvgFixups` で `svgEl.style.maxWidth = 'none'` を設定し、コンテナ幅の変化に追従した自動縮小を防止する。 viewbox 幅が 600px 未満等の小さい図は `targetWidth = Math.max(w, 600)` で最低幅 600px を確保して文字の1rem表示を保証する。

```tsx
const Diagram = memo(function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});
```


#### 2. テスト環境（Vitest）での MermaidDiagram のモック化

`MermaidDiagram` はクライアントサイドで動的に `mermaid` ライブラリを読み込んで動作するため、テスト環境での DOM レンダリング時にエラーを起こす原因となります。
テストファイル（`page.test.tsx`）では、必ず `vi.mock` を使ってダミー要素にモック化してください。

```typescript
vi.mock("@/components/MermaidDiagram", () => ({
  default: function DummyMermaidDiagram({ chart }: { chart: string }) {
    return <pre data-testid="mermaid">{chart}</pre>;
  },
}));
```

## Mermaid v11 + React 共通コンポーネントの可読性・文字切れ・文字色対策（2026年6月追記）

本リポジトリは `mermaid@^11.15.0` を使用し、図は共通コンポーネント [`components/MermaidDiagram.tsx`](../../../components/MermaidDiagram.tsx)（`'use client'`）で描画する。`mermaid.render()` が返す SVG 文字列を `dangerouslySetInnerHTML` で注入し、ページ固有スタイルは [`components/MermaidDiagram.module.css`](../../../components/MermaidDiagram.module.css) に置く。

レンダリングの正準ロジック（`mermaid.initialize` 設定・`applySvgFixups`・render ループ・中央寄せ CSS）は再利用スクリプト [`scripts/apply_render_pipeline.mjs`](scripts/apply_render_pipeline.mjs) に集約されている。新たに不具合を直す際は **手書きで再現せず、このスクリプトを正として適用**すること（冒頭「🚀 まず再利用スクリプトを使う」を参照）。

### 症状と根本原因の対応表

| 症状 | 根本原因 | 対策 |
| ------ | --------- | ------ |
| 文字が低コントラストで読みづらい（特にエッジラベル・subgraph 見出し・シーケンス図 Note） | `theme:'base'`（非 darkMode）が `edgeLabelBackground=lighten(...)`・`noteBkgColor="#fff5ad"` 等の**明色背景**を算出。そこへ CSS で明色文字を当てると明×明で読めない | `theme:'dark'` + **ソリッド濃色の `themeVariables`** を明示（下記） |
| ノード内の文字が下端で切れる | 採寸と実描画の数 px 差で SVG `viewBox` 下端が見切れる | 描画後に `viewBox` の高さを拡張（flowchart `+15` / sequence・state `+110`）+ `overflow:visible` |
| ノード文字が**右端**で切れる（emoji を含む図のみ。emoji 無しの図は無傷＝切り分けの目印） | `<foreignObject>` は SVG 仕様上 **`overflow:hidden` がデフォルト**。emoji はラベル採寸時に「豆腐(tofu)」幅で測られ実描画で広がるため `foreignObject 幅 < 実テキスト幅` となりクリップ | CSS で `.mermaidTarget foreignObject { overflow: visible }`（ノード矩形は十分広く、はみ出した文字も枠内に収まる） |
| 文字色を変えても**全く反映されない** | `mermaid.initialize()` はモジュール最上位で**一度だけ**実行されるため HMR では再実行されず古いテーマのまま。加えて `*.module.css` 変更後の `.next` キャッシュ汚染 | `.next` 削除 + dev サーバー完全再起動 + ブラウザのハードリロード（後述） |
| 日本語ラベルの幅不足による軽微な切れ | Web フォント（Noto Sans JP）読込前に採寸 | `mermaid.render()` 直前に `await document.fonts.ready`（jsdom 等は型ガードで skip） |

### 正準の `mermaid.initialize` 設定（v11、`apply_render_pipeline.mjs` が踏襲）

```ts
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',          // 'base' は明色背景を算出して低コントラストになる。'dark' を使う
    securityLevel: 'loose', // 'strict' は htmlLabels の採寸挙動を変え見切れの原因になる。
                            // DIAGRAMS は静的・作者管理の定数のみ（外部入力なし）なので 'loose' で安全
    themeVariables: {
        primaryColor: '#1a73e8', primaryTextColor: '#e8f0fe', primaryBorderColor: '#1a73e8',
        lineColor: '#5f7fb8', secondaryColor: '#0f9d58', tertiaryColor: '#0d1a2e',
        background: '#060b14', mainBkg: '#0f2040', nodeBorder: '#1a73e8',
        clusterBkg: '#0d1a2e', titleColor: '#e8f0fe', edgeLabelBackground: '#0d1a2e',
        fontFamily: "'Noto Sans JP', sans-serif", fontSize: '16px', // 標準環境の1rem
    },
    flowchart: { curve: 'basis', padding: 20 },
    sequence: { actorMargin: 60, mirrorActors: true },
});
```

> `mainBkg` を**透明や半透明にしない**こと。ノード背景がソリッド濃色だからこそ白文字が読め、CSS の `!important` 強制上書きが不要になる。

### ⚠️ SVG 後処理は「文字列加工」ではなく「ライブ DOM 操作」で行う

`mermaid.render()` の戻り値（SVG 文字列）を **`DOMParser('image/svg+xml')` + `XMLSerializer` で往復させてはならない**。`foreignObject` 内の htmlLabels（XHTML 名前空間の HTML）が壊れ、ラベルが `width=0`・テキスト空になって表示が潰れる。

**`innerHTML` 注入後の実 DOM 要素を直接操作**する（`apply_render_pipeline.mjs` も同方式）。React では `ref` + `svgStr` 依存の `useEffect` で、注入済み `<svg>` に対して後処理を適用する。

```ts
const applySvgFixups = (
    svgEl: SVGSVGElement,
    chart: string,
    preserveNaturalScale = false
): void => {
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');
    svgEl.style.height = 'auto';
    svgEl.style.overflow = 'visible';   // viewBox から数px はみ出す描画の途切れ防止
    svgEl.style.marginBottom = '10px';

    const viewBox = svgEl.getAttribute('viewBox');
    if (!viewBox) {
        svgEl.style.maxWidth = '100%';
        return;
    }
    const parts = viewBox.split(/\s+/).map(Number);
    if (parts.length !== 4 || !parts.every((n) => Number.isFinite(n))) return;
    const trimmed = chart.trim();
    const isSequenceOrState =
        trimmed.startsWith('sequenceDiagram') || trimmed.startsWith('stateDiagram');
    const extraHeight = isSequenceOrState ? 110 : 15;
    const [x, y, w, h] = parts as [number, number, number, number];

    let targetWidth = w;
    if (preserveNaturalScale && w > 0) {
        // preserveNaturalScale=true: 1rem(16px)文字が実寸で見えるよう、小さい図は最低600pxに拡大
        targetWidth = Math.max(w, 600);
    } else if (!preserveNaturalScale && w > 0 && w < 550) {
        targetWidth = Math.min(650, Math.max(Math.round(w * 1.35), 480));
    }
    svgEl.style.width = `${targetWidth}px`;
    // preserveNaturalScale=true のときは max-width:none でスクロール時・コンテナ幅変更時の縮小を防止
    svgEl.style.maxWidth = preserveNaturalScale ? 'none' : '100%';
    svgEl.style.maxHeight = preserveNaturalScale ? 'none' : h > 550 ? '580px' : 'none';
    svgEl.setAttribute('viewBox', `${x} ${y} ${w} ${h + extraHeight}`);
};
```

### 文字色は「ノードラベル限定」で当てる（明背景×明文字の再発防止）

過去、全 SVG テキストへ `color/fill:#e6e9ee !important` を当てた結果、**エッジラベル・subgraph 見出し・シーケンス図 Note（明色背景）まで明色文字になり読めなくなる**「もぐら叩き」を繰り返した。`theme:'dark'` で背景色は適正化されるため、CSS で色を当てるのは**ノードラベル（`.node .nodeLabel`）に限定**する。エッジラベル / Note はテーマ任せ（暗背景＋明文字）にする。

ノード文字色の方針（ユーザー選択：**暗ノード＝白 / 黄ノード＝黒** が最も読みやすい）:

```css
/* foreignObject のクリップ解除（emoji 採寸ズレによる右端切れ対策） */
.mermaidTarget :global(foreignObject) { overflow: visible; }
.mermaidTarget :global(foreignObject > div),
.mermaidTarget :global(.nodeLabel),
.mermaidTarget :global(.edgeLabel) { overflow: visible; }
/* ⚠️ white-space: nowrap は付けない。mermaid は長いラベルを foreignObject 幅で折返す前提で
   box を採寸するため、nowrap を強制すると長い行が右端で切れる（emoji 対策は overflow: visible のみで足りる） */

/* 既定でノードラベルを白に（<br/> 2 行目が暗く残る問題も解消するため子孫 * まで） */
.mermaidTarget :global(.node .nodeLabel),
.mermaidTarget :global(.node .nodeLabel *) { color: #ffffff !important; }

/* 黄色ノード(#fbbc04)のみラベルを黒に戻す（白×黄の同化回避） */
.mermaidTarget :global(.node[style*="fbbc04" i] .nodeLabel),
.mermaidTarget :global(.node[style*="fbbc04" i] .nodeLabel *),
.mermaidTarget :global(.node:has([style*="fbbc04" i]) .nodeLabel),
.mermaidTarget :global(.node:has([style*="fbbc04" i]) .nodeLabel *),
.mermaidTarget :global(.node:has([fill="#fbbc04" i]) .nodeLabel),
.mermaidTarget :global(.node:has([fill="#fbbc04" i]) .nodeLabel *) { color: #000000 !important; }
```

> `.edgeLabel *` に `fill:#fff` を当てない。エッジラベルの背景 `rect` が白く塗り潰される。色を当てるのは**ラベルテキストのみ・`color` のみ**に留める。

### 確認手順（重要・順序厳守）

1. `*.module.css` 変更時は `.claude/rules/css-cache-reset.md` に従う。`mermaid.initialize` がモジュール最上位＝ HMR で再実行されないため、**dev サーバーを完全再起動**する。

```bash
kill $(lsof -ti:3000) 2>/dev/null; rm -rf .next; bun run dev
```

2. ブラウザは**ハードリロード（⌘+Shift+R）**。通常リロードでは古い SVG/CSS が残る。
3. 目視確認はユーザー側で実施する（このリポジトリでは Playwright/ブラウザ自動操作は使わない方針）。

---

### Mermaid を諦めて HTML/CSS に置き換えるべきケース

以下は CSS では対処不能なため、**純粋な HTML/CSS ウィジェットに置き換える**：

- `flowchart TD` で 5〜6 ノードを直列チェーン → 縦長 900px 超
- 接続されていない複数のサブグラフ（ノード数が非対称なためアスペクト比が崩れる）

判断基準：「ノード増減に関わらず、他の図と同じ高さに収まる保証がない場合」
