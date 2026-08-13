---
name: infra-html-to-nextjs-migration
description: >
  Complete workflow for migrating static HTML pages to Next.js App Router page.tsx
  in this repository (GCP/AWS 資格試験対策 Next.js 学習アプリ). Covers CSS variable
  mapping (HTML vars to Tailwind v4 @theme tokens), page-specific CSS extraction,
  EXAMS-driven Header navigation, MermaidDiagram reuse, and CLAUDE.md documentation.
  Extends the global html-to-nextjs-migration skill with project-specific knowledge:
  the canonical guide-page structure, GCP design-token map, sidebar layout recipe,
  and a token-efficient reading protocol.
  Trigger: HTMLマイグレーション, ページ移行, HTML変換, 静的HTML移行, CSS変数マッピング,
  new page creation from HTML, HTMLからpage.tsx, ガイドページ移行, Mermaid 図移行.
---

# HTML → Next.js Migration Workflow（本リポジトリ専用）

(最終更新日: 2026-08-13)

## Goal

Provide the complete, ordered workflow for converting a standalone HTML page (with embedded `<style>` and trailing `<script>`) into a fully integrated Next.js App Router page in this repository. This skill extends the global `html-to-nextjs-migration` skill (JSX pitfalls) with project-specific CSS token mapping, file organization, MermaidDiagram reuse, and integration steps.

**Prerequisite**: The global skill covers `<pre>` block conversion, `class`/`className` rules, HTML entity handling, `@layer` priority, and cache invalidation. This skill assumes that knowledge and focuses on the **end-to-end workflow + reusable reference**.

> **ユーザー手動確認ゼロ原則（必須ルール）**:
> ユーザーへ「目視確認」や「スクリーンショットの提供」を求める行為は**厳禁**とする。
> 1. `scripts/verify-html-migration.mjs` (または `__tests__/` 内の全自動 DOM テスト) で元HTMLとNext.jsコンポーネントのテキストが100%全量一致することを自動検証する。
> 2. `Playwright` E2E テストでスクロール時の文字重なり、固定ヘッダー遮蔽、ScrollSpy連動、レスポンシブ崩れが0件であることを自動検証する。
> 3. 上記の自動テスト合格証明を添えて作業完了を宣言すること。

## セッション開始時に必ず読むファイル

1. **`MIGRATION_PROGRESS.md`**（リポジトリ直下）— 現在地・残タスク・再開プロンプト
2. **このファイル（`SKILL.md`）** — 移行手順・正準リファレンス・本リポジトリ固有ルール
3. **`.agents/rules/tdd-commit-workflow.md`** — TDD必須サイクル & コミット分割ルール
   — §0「現行スタック確定値」、§1「インベントリ作成」、§2「テスト強度の合格基準」、§3「正準テストテンプレート」は**このスキルの前提**であり、移行の可否判定に直結する。読まずに着手しないこと。

## このスキルは3系統に複製されている

`.agents/skills/html-to-nextjs-migration/SKILL.md` を**正本**とし、`.claude/` と `.gemini/` 配下は複製である。
このファイルを編集した場合は、`.agents/rules/tdd-commit-workflow.md` §8 の `rsync` 手順で必ず両ミラーへ反映すること。
乖離は `__tests__/skills/agent-mirror-sync.test.ts` が検出する。

## 未移行 HTML

| ファイル | 予定ルート | 状態 |
|---|---|---|
| `Ace-section1-complete-guide.html` | `/gcl/associate-cloud-engineer/section1` | ✅ 完了（原本は内容を変更せず `archive/Gcl_Archive/Associate-Cloud-Engineer/html/associate-cloud-engineer/` へ移動済み） |

> 残タスクの正本は `MIGRATION_PROGRESS.md`。この表は補助。

## 正準リファレンス（再読不要・探索削減）

**この節を読めば、移行のたびに参照コンポーネント（`page.tsx`/`NavBar`/`MermaidDiagram`/`page.css`）や
`app/globals.css` を grep / Read し直す必要はない。** 出典は実装済みの
`app/gcl/associate-cloud-engineer/section1/*` と `.../complete-advanced-guide/*`。
値が古くなった疑いがある時だけ実ファイルで照合する。

### 1. リッチ「ガイドページ」の正準ファイル構成

content-heavy な単一HTML（hero + サイドバー + 多数セクション + Mermaid + コードブロック + チェックリスト）は、
次の5ファイル構成へ移行する（`complete-advanced-guide` / `section1` と同形）:

| ファイル | 種別 | 役割 |
|---|---|---|
| `page.tsx` | **Server** | `metadata` を定義し `<XxxGuide />` を返すだけ |
| `XxxGuide.tsx` | **client** (`'use client'`) | 本文JSX + 進捗バー/scroll-top/scroll spy/チェックリスト等の interactivity |
| `NavBar.tsx` | **client** | サイドバーの静的アンカーリンク（`#id` へジャンプ） |
| `constants.ts` | — | `export const DIAGRAMS: Record<string,string>`（Mermaid DSL） |
| `page.css` | — | `.<page>-page` スコープの plain CSS（`@layer` 不使用） |

> `page.css` の import は **Server の `page.tsx`** で行う（`import './page.css';`）。
> Server/Client 分割により、メタデータは Server、状態を持つUIは Client に収まる。

### 2. GCP / ダークテーマ トークンマップ（確定値）

HTML の `:root` ローカル変数を、本リポジトリの `globals.css` 既存トークンへ機械的に置換する。
既存トークンに無いテーマ値は、承認済みの3層デザイントークンとして `app/globals.css` の `@theme` に追加してから参照する。ページ固有 CSS では新規 custom property を定義しない。

「100%忠実に移転」の対象は、原本の文章、情報構造、レイアウト、装飾、視覚効果など、原本を構成する要素とする。次のリポジトリ標準への対応付けだけは許可された変更であり、欠落や簡略化として扱わない。

- Space Grotesk は既存の `var(--font-display)`（DM Sans）へ置換する。
- 原本のテーマはリポジトリの統一ダークテーマへ対応付ける。
- 原本の配色は、意味を保ったまま既存または承認済みの3層グローバルトークンへ置換する。

優先順位は、原本要素をすべて保持したうえで上記標準へ対応付けること、次に既存コンポーネントとの統合とする。上記以外の文章・構造・レイアウト・装飾・視覚効果は変更、省略、簡略化しない。

| HTML ローカル変数 | 置換先 | 備考 |
|---|---|---|
| `--gcp-blue` / `-green` / `-yellow` / `-red` | `var(--color-google-blue / -green / -yellow / -red)` | 既存トークン |
| `--gcp-purple` | `var(--color-gcp-purple)` | グローバルテーマトークン |
| `--gcp-teal` | `var(--color-gcp-teal)` | グローバルテーマトークン |
| `--bg-primary` | `var(--color-background)` | |
| `--bg-card` / `--bg-card-hover` | `var(--color-card)` / `var(--color-gcp-card-hover)` | |
| `--bg-code` | `var(--color-gcp-code-background)` | |
| `--text-primary` | `var(--color-foreground)` | |
| `--text-secondary` / `--text-muted` | `var(--color-muted-foreground)` | |
| `--border` / `--border-bright` | `var(--color-gcp-border)` / `var(--color-gcp-border-bright)` | 青み境界線は維持 |
| `--accent-glow` | `var(--color-gcp-accent-glow)` | |
| Space Grotesk | `var(--font-display)` | DM Sans に統一 |
| Noto Sans JP | `var(--font-body)` | |
| JetBrains Mono | `var(--font-mono)` | |

> **シンタックスハイライトの例外**: 色クラス（`.k/.s/.c/.f/.o` 等）の値に限り、テーマ値の一般ルールとは分けてトークン化せず、元の hex をページ CSS にそのまま移す。

### 3. サイドバー / メイン配置レシピ（確定値）

グローバル Header（sticky `z-50`）+ DisclaimerBanner（sticky `z-40`）の**下**に収めるための定石:

```css
.<page>-page .sidebar {
  position: fixed; left: 0;
  top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px));
  bottom: 0; width: 280px; z-index: 40; overflow-y: auto;
}
.<page>-page .main { margin-left: 280px; }
.<page>-page .section-block { /* アンカー着地が Header に隠れない */
  scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 16px);
}
@media (max-width: 900px) {
  .<page>-page .sidebar { transform: translateX(-100%); }
  .<page>-page .main { margin-left: 0; }
}
```

### 4. Mermaid 図の移行（MermaidDiagram を再利用 & preserveNaturalScale 必須）

HTML 末尾 `<script>` の `DIAGRAMS` オブジェクト + `mermaid.render(...)` ループは**再実装しない**。
共有コンポーネント `components/MermaidDiagram.tsx` がフォント待ち・viewBox 見切れ対策・SSRフォールバックを内蔵済み。

- **エクスポート形態は「名前付き」**: `import { MermaidDiagram } from '@/components/MermaidDiagram';`
  （`components/MermaidDiagram.tsx` は `export const MermaidDiagram`。**default エクスポートではない**。
  テストで `vi.mock` する際に `default:` を使うと必ず落ちる。§ Phase 6 のモック例を参照）
- props は **`chart: string`**、**`ariaLabel: string`（必須）**、および **`preserveNaturalScale={true}`（必須：文字サイズが1rem未満に潰れるのを防ぐ）**。
- `<script>` 内の `'graph LR\n...'` 文字列を `constants.ts` の `DIAGRAMS` に**テンプレートリテラル（`\n`→実改行）**で移植。`<br />` 等はそのまま。
- 各 `<div class="mermaid" id="diag-N">` は直接インデックス参照せず、`DIAGRAMS[id]` の存在を検証した安全なコンポーネント（例: `<Diagram id="diag-N" label="..." />`）経由で `<MermaidDiagram chart={chart} ariaLabel="..." preserveNaturalScale />` に引き渡す（`.mermaid-wrap` で囲む）。
- **`Diagram` は必ず `memo` でラップする。** ガイドページは scroll spy（`IntersectionObserver` + `setActiveSection`）でスクロール中に高頻度で再レンダリングされる。メモ化しないと `MermaidDiagram` の `useEffect` が再実行され、SVG に適用した `style.width` がリセットされて**スクロール中に図が豆粒に縮む/チカチカする**（`.agents/skills/fix-mermaid/SKILL.md` 参照）。
- **TS strict（`noUncheckedIndexedAccess: true`）必須形** — `Record<string, string>` の添字は `string | undefined` になるため、直接インデックス参照せずガードする。`DiagramId` ユニオン型で id のタイポも防ぐ:

  ```tsx
  import { memo } from 'react';
  import { MermaidDiagram } from '@/components/MermaidDiagram';
  import { DIAGRAMS, type DiagramId } from './constants';

  const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
      <div className="mermaid-wrap">
        <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
      </div>
    );
  });
  ```

  `constants.ts` 側:

  ```ts
  export type DiagramId = 'diag-1' | 'diag-2' | 'diag-3';
  export const DIAGRAMS: Record<DiagramId, string> = { /* ... */ };
  ```

- 壊れた Mermaid 構文（`__STR0__` プレースホルダ・重複エッジ等）は移植時に修正する → `.agents/skills/fix-mermaid`。

### 5. HTML 末尾 `<script>` の interactivity → React 変換表

| 元の JS | React 置換 |
|---|---|
| `copyCode(btn)`（クリップボードコピー） | `pre` への `ref` + `navigator.clipboard.writeText(ref.textContent)`、`Copied!` を `useState` で2秒表示 |
| `toggleCheck(el)`（チェック切替） | `CheckItem` を `useState<boolean>` でトグル（`<button className="check-box">`） |
| progress bar / scroll-top の可視/scroll spy | **単一の `useEffect`** に集約。`scroll` リスナ + `IntersectionObserver` |
| `IntersectionObserver` 全般 | jsdom 対策に `typeof IntersectionObserver !== 'undefined'` でガードし、cleanup で `disconnect()` |

### 6. コードブロックは `.code-line` 構造へ統一

- `**/*.tsx` のコードブロックは、構文ハイライトの有無にかかわらず各行を `<div className="code-line">` でラップする。
- 構文ハイライトする場合は、`.code-line` の内側へハイライト済みの `<span className="...">` を直接配置する。`dangerouslySetInnerHTML` で `<pre><code>` を生成しない。
- プレーン整形のみの場合も同じ `.code-line` を使い、`.code-line { white-space: pre; }` でインデントと改行を保持する。

```tsx
<div className="code-block" role="region" aria-label="コマンド例">
  <div className="code-line">
    <span className="code-prompt">$</span>
    <span className="code-command"> gcloud projects describe PROJECT_ID</span>
  </div>
  <div className="code-line">
    <span className="code-comment"># 出力を確認する</span>
  </div>
</div>
```

## 効率的読み取りプロトコル（省略禁止＋無駄読み禁止）

トークン浪費の最大要因は「ソースの再読」と「参照ファイルの再読」。以下を厳守する。

1. **ソースHTMLは100%読む（要約・スキップ厳禁）。** ただし往復は最小化する:
   - まず **1回の `grep`** で zone 境界の行番号を取得（例: `grep -nE '</style>|<body|<script' file.html`）。
   - `<style>` ブロック・本文・末尾 `<script>` を、**大きめ（~800行）の連続・非重複チャンクで各1回** Read する。
   - **同一行範囲を二度読まない。** 既読範囲はメモリ上の内容を使う。
2. **既知の単一ファイル移行では Explore / Plan エージェントを使わない**（1エージェント ≈ 40K tokens のオーバーヘッド。対象パスが明確なら Read/Grep を直接使う）。
3. **本 skill の「正準リファレンス」に載っている参照ファイルを移行のたびに読まない**
   （`components/MermaidDiagram.tsx`・参照ページの `page.tsx`/`NavBar.tsx`/`page.css`・`app/globals.css`）。
   値の陳腐化が疑われる時だけ、必要な数行を `grep` で照合する。

## Instructions

### TDD 必須サイクルの適用（最重要）

移行作業中は、常に `.agents/rules/tdd-commit-workflow.md` に定められたサイクル
（**Inventory → Red → Green → Refactor → Docs**）を最優先で適用しなければなりません。

コミット単位は以下の5つに固定です。まとめてはいけません。

| # | フェーズ | 成果物 | コミットメッセージ |
|---|---|---|---|
| 0 | **Inventory** | `docs/migration-inventory/<slug>.json` | `chore(migration): add content inventory for <slug>` |
| 1 | **Red** | 失敗するテスト（インベントリを import） | `test(<scope>): add failing tests for <slug>` |
| 2 | **Green** | `page.tsx` / `XxxGuide.tsx` / `NavBar.tsx` / `constants.ts` / `page.css` | `feat(<scope>): implement <slug> to pass tests` |
| 3 | **Refactor** | ルーティング統合（`EXAMS`）・lint/build 修正・`CLAUDE.md` / `GEMINI.md` | `refactor(<scope>): integrate <slug> into routing and update docs` |
| 4 | **Docs Sync** | `MIGRATION_PROGRESS.md` | `chore(docs): update MIGRATION_PROGRESS.md — <要約>` |

1. **Phase 0 を飛ばさない。** インベントリが無い移行は、漏れの検知手段が無いため未着手と同義です。
2. **実装前のテスト作成（Red）**: `page.tsx` や `NavBar.tsx` を書く前に、必ず失敗するテストを作成してコミットしてください。`bun run test` が**失敗する出力**を確認すること。成功してしまうテストは仕様を検証していません。
3. **一括コミットの厳禁**: テスト、実装、カバレッジ更新、ドキュメント更新を一つのコミットにまとめないでください。
4. **コミットはユーザーの認可がある場合のみ実行。** 認可が無ければコミット可能な状態で停止し、判断を仰ぐこと。

### Phase 0: Inventory — 移行元を「数える」（省略禁止）

**移行漏れの単一最大原因は、移行元に何件あるかを数えないまま書き始めることである。**
コードを1行も書く前に、`.agents/rules/tdd-commit-workflow.md` §1 の抽出コマンドで
`docs/migration-inventory/<page-slug>.json` を生成し、コミットする。

```bash
mkdir -p docs/migration-inventory
# 抽出スクリプトは tdd-commit-workflow.md §1-1 の heredoc をそのまま使う
node "$inventory_script" <移行元HTMLのパス> > docs/migration-inventory/<page-slug>.json
```

生成された JSON を開き、以下を**声に出して確認する**（この確認を飛ばさない）:

| 確認項目 | 見るキー | 移行完了時に一致すべき対象 |
|---|---|---|
| 見出し総数 | `h1` / `h2` / `h3` / `h4` の配列長 | TSX 内の対応する見出し要素数 |
| 表の数とセル数 | `counts.table` / `th` / `td` | `<table>` 要素数と全セル文言 |
| 外部リンク | `links[].href` | `<a href="http...">` の URL 集合 |
| 図の数 | `counts.diagram` | `<Diagram />` の描画数 |
| コードブロック | `counts.codeBlock` | `.code-block` の数 |

- **インベントリは移行元の事実である。実装に合わせて書き換えることは改竄であり禁止。**
- コミット: `chore(migration): add content inventory for <page-slug>`
- 次に §「Phase 6」のテンプレートで**このインベントリを import する失敗テスト**を書き、コミットする（Red）。
  実装を書き始めてよいのは、その後である。

### Phase 1: Analysis — Audit the Source HTML

Before writing any code, read the source HTML and extract:

1. **CSS Custom Properties** — List all `:root` variables (colors, fonts, radii, shadows)
2. **Unique Component Classes** — Classes not present in `app/globals.css` (page-specific UI)
3. **Font Families** — Check if fonts match `layout.tsx` (Noto Sans JP, JetBrains Mono, DM Sans). `layout.tsx` assigns `--font-display` to DM Sans, `--font-body` to Noto Sans JP, `--font-mono` to JetBrains Mono. If the HTML uses different fonts (e.g., `Playfair Display`, `Plus Jakarta Sans`, `Sora`), note these as needing replacement with these project fonts
4. **Animation Keyframes** — List all `@keyframes` names; rename camelCase to kebab-case
5. **Sections / IDs** — Map the HTML structure to plan the page.tsx component tree

### Phase 2: CSS Variable Mapping

Map every HTML CSS variable to the project's `globals.css` `@theme` token. Do NOT define HTML-local variables in the project.

#### Mapping Template (apply to each source HTML)

| HTML Variable | Project Token | Notes |
| --- | --- | --- |
| Background vars | `--color-background` / `--color-card` |  |
| Text vars | `--color-foreground` / `--color-muted-foreground` / `--color-muted` |  |
| Accent colors | `--color-primary` / `--color-theme-{genai,ace,cdl,pcne}-fg` |  |
| Border vars | `--color-border` |  |
| Radius `--r` / `--rs` / `--r-sm` | `--radius-lg` (16px) / `--radius-md` (10px) / `--radius-sm` (4px) | Always add fallback: `var(--radius-lg, 16px)` |
| Shadow vars | N/A | Use Tailwind shadow classes (shadow-lg, shadow-xl, etc.) |
| Font display | `--font-display` | Resolved by next/font/google in layout.tsx |
| Font body | `--font-body` | Resolved by next/font/google in layout.tsx |
| Font mono | `--font-mono` | Resolved by next/font/google in layout.tsx |

#### GCP テーマ HTML の確定マッピング

GCP 系ガイド HTML（`--gcp-blue` / `--bg-*` / `--text-*` などの `:root` 変数）は、
**「正準リファレンス §2 GCP / ダークテーマ トークンマップ」の確定表をそのまま適用**する
（毎回 `globals.css` を grep して導出しない）。紫・ティール・コード背景・カードホバー・青み境界線・グローを含め、
§2 に定義したグローバルトークンを使用する。不足する値は `app/globals.css` の承認済み3層トークンへ追加してから参照し、ページルートへ定義しない。

**Critical**: The project uses a **unified dark theme**. Light-theme HTML pages must be re-themed to match the dark color system. Do not attempt to preserve the original light color scheme.

### Phase 3: Create Page-Specific CSS File

1. Create `app/<page-slug>/page.css` (or alongside the component) for styles unique to this page
2. Do NOT use `@layer components` — use plain CSS selectors for proper specificity over Tailwind preflight
3. Replace all HTML-local CSS variables with project `@theme` tokens (with fallbacks)
4. Rename keyframes from camelCase to kebab-case (e.g., `fadeUp` → `fade-up`)
5. Place `@keyframes` definitions that are page-specific in the page CSS, not globals
6. Import the CSS at the top of the page component: `import './page.css';`

#### CSS & JSX Pitfalls Checklist (learned from code reviews & user feedback)

| Issue | Wrong | Correct |
| --- | --- | --- |
| Invalid DOM property | `<div class="sidebar">` | `<div className="sidebar">` （JSXでは `className` に統一） |
| Unescaped entities | `parsed["hostname"]` (raw text) | `{`print(parsed["hostname"])`}` や `&quot;` / `&apos;` でラップ（`react/no-unescaped-entities` 解消） |
| 元CSS変数・デザインの省略 | 共通グラデーションやカード色を汎用黒に簡略化、またはローカルな `--*` 変数を再作成 | 元HTMLの変数が表す `:root` カラー、h1グラデーションテキスト、h2左バー、thスタイル、ピル型バッジ、calloutバー、コードブロック構文ハイライトの全デザイン値を100%忠実に移転 |
| Mermaid図の人工的な幅制限 | `style={{ maxWidth: '800px' }}` 等で幅を狭めスクロールバー発生 | 人工的な `maxWidth` 制限を排除して全幅 (`width: 100%`) を使い、`margin: 1.5rem auto 2rem` で中央寄せ |
| Mermaid 黄色ノードの文字色 | 白文字 (`#fff`) になり同化 | `components/MermaidDiagram.module.css` の黄色ノード条件に `#ffe08a`, `#ffd479` 等のカラーコードを漏れなく追加し黒文字 (`#000000 !important`) を強制 |
| Monochrome code blocks | ハイライト無しの単色 `<pre><code>` | コードブロックの各要素（`.code-comment`, `.code-prompt`, `.code-keyword`, `.code-command`, `.code-number`, `.code-param` 等）を `<span>` でカラー装飾するか、プレーン整形のみ（Section 6の方針に従い使い分け） |
| Mermaid 図の文字縮小 | `preserveNaturalScale` なしの `<MermaidDiagram>` | `<MermaidDiagram chart={...} ariaLabel="..." preserveNaturalScale />` を指定し 1rem (16px) サイズを維持 |
| 誤ったアーカイブ先 | リポジトリ直下や `Gcl_Archive/` 単体 | 原本を保持したまま `archive/Cisco/html/` と `archive/Cisco/md/` 等の階層化フォルダへコピーして保存 |
| 英語での計画書作成 | 英語で `implementation_plan.md` を作成 | `implementation_plan.md` や報告メッセージはすべて**日本語**で記述 |
| Invalid property | `scrollbar-: none;` | `scrollbar-width: none;` |
| z-index duplication | `nav { z-index: 100; }` in CSS + `z-50` in JSX | Single source: Tailwind `z-50` in JSX only |
| Responsive outside @media | `.box { grid-template-columns: 1fr; }` at root | Wrap in `@media (max-width: 768px) { ... }` |
| KeyFrame naming | `@keyframes fadeUp` | `@keyframes fade-up` |
| Undefined CSS vars | `var(--r)` | `var(--radius-lg, 16px)` |
| Vendor scrollbar only | `::-webkit-scrollbar` (WebKit) | Add `scrollbar-width: none` (Firefox) |
| `.code-block` 内の改行 | `<span>line1</span>{"\n"}<span>line2</span>` | 各行を `<div className="code-line"><span>line1</span></div>` でラップ |
| page-sticky nav の top | `position: sticky; top: 0;` | `top: calc(var(--header-h) + var(--disclaimer-height))` (globals.css参照) |
| アニメーションの消失 | `max-width: 0` のまま固定され見えなくなる | `@media (prefers-reduced-motion: reduce)` 内で `max-width: 100% !important;` を指定 |
| 背景クリック妨害 | `::before` に `z-index` 指定なし | `pointer-events: none;` と `z-index: 0`（または負の値）を指定 |

### Phase 4: Convert HTML to TSX

1. **Remove** `<html>`, `<head>`, `<body>`, `<style>`, `<script>` — handled by `layout.tsx`
2. **Remove** `<link>` font tags — fonts loaded via `next/font/google` in `layout.tsx`
3. **`<nav>` ブロックの扱い**:
   - グローバルサイトナビ（全ページ共通）→ **削除**（`components/Header.tsx` が提供）
   - ページ固有のアンカーナビ（sticky + `IntersectionObserver` スクロールスパイ付き）→ **削除せず移行**:
     1. `app/<page-slug>/NavBar.tsx` を `'use client'` コンポーネントとして作成
     2. HTML の `<script>` 内 `IntersectionObserver` ロジックを `useEffect` に変換し、クリーンアップで `obs.disconnect()` を呼ぶ
     3. CSS の `position: sticky; top: 0` → `top: calc(var(--header-h) + var(--disclaimer-height))`、`z-index` は Header の `z-50`（50）を超えないよう `40` 以下に設定
     4. `page.tsx`（Server Component のまま）先頭で `<NavBar />` をインポート・配置（リッチガイドでは「正準リファレンス §1」に従い `XxxGuide.tsx` 内に置く）

4. **`.code-block` 内の行区切りパターン** — HTMLの `white-space: pre` コンテキストから JSX へ変換する際に最も多発する問題:

   ```tsx
   {/* ❌ NG: {"\n"} は white-space:normal 環境では改行にならずスペース扱い */}
   <div className="code-block">
     <span className="code-cyan">Given</span>{"\n"}
     <span className="code-white">条件テキスト</span>
   </div>

   {/* ✅ OK: <div className="code-line"> でラップ（CSS に white-space:pre が当たる） */}
   <div className="code-block">
     <div className="code-line"><span className="code-cyan">Given</span><span className="code-white"> 条件テキスト</span></div>
     <div className="code-line"><span className="code-cyan">When</span><span className="code-white"> 操作テキスト</span></div>
   </div>
   ```

   **なぜ失敗するか**: `.code-block` のデフォルト `white-space` は `normal`。`{"\n"}` はHTMLテキストノードの改行文字になるが、`white-space: normal` 環境ではブラウザが空白として正規化する。`.code-line` クラスには `white-space: pre` が定義済みのため、このラッパーが必須。

   **デシジョンテーブル・行列データ**: テキストのスペース揃えで列を表現している場合はフォント変更に脆弱なため、`<table>` 要素への変換を優先する。

5. **Wrap** page content in a React component:

```tsx
import './page.css';

export default function PageSlugPage() {
  return (
    <>
      <section className="hero" id="top">
        {/* content */}
      </section>
      {/* more sections */}
    </>
  );
}
```

1. **Do NOT add `<main>` wrapper** — `layout.tsx` places `{children}` directly under the `<body>` tag (not wrapped in a `<div>`) (app/layout.tsx)
2. **Convert attributes**: `class` → `className`, `for` → `htmlFor`
3. **Inline styles**: `style="font-family: var(--font-display)"` → `style={{ fontFamily: 'var(--font-display)' }}`
4. **Self-closing tags**: `<img>` → `<img />`, `<br>` → `<br />`, `<hr>` → `<hr />`
5. **HTML comments**: `<!-- comment -->` → `{/* comment */}`
6. **Apply global skill rules** for `<pre>` blocks and HTML entities

### Phase 5: Integration Steps

#### 5a. Update Header Navigation (Single Source of Truth)

`components/Header.tsx` is driven by `app/constants.ts` and `app/navigation.ts`. Add your new page entry to the `EXAMS` array in `app/constants.ts`:

```typescript
  { id: 'slug', title: 'タイトル', status: 'coming-soon', ... }
```

#### 5b. ナビゲーション/テストの扱い（データ駆動 — ページ数更新は不要）

ナビは `app/constants.ts` の `EXAMS` を正本とする**データ駆動**構成（`toNavTree` → `Header`）。
5a でエントリを追加すれば Header に自動反映されるため、**ページ数を手で数える assertion は存在せず更新不要**。

> 本リポジトリには `e2e/pages.ts` / `EXPECTED_PAGE_COUNT` / `__tests__/navigation.test.ts` は**存在しない**。
> これらを探したり作ったりしないこと（旧 QA_Studies 由来の記述を撤去済み）。
> E2E は `e2e/` 配下（smoke/nav/a11y/visual 等）にあり、ナビは `EXAMS` から導出されるため新ページ追加で件数固定の更新は不要。

#### 5c. Create Route Directory

Create `app/<page-slug>/page.tsx` following Next.js App Router conventions（リッチガイドは「正準リファレンス §1」の5ファイル構成）。

#### 5d. Update CLAUDE.md and GEMINI.md

Add the new page to the Architecture section of **both** `CLAUDE.md` and `GEMINI.md`:

```markdown
- `app/<page-slug>/page.tsx` — ページの説明
```

If a page-specific CSS file was created, also document it.

#### 5e. Update docs/coverage-dashboard.html（静的スキャン）

カバレッジダッシュボードは `__tests__/` と `e2e/` の静的解析で生成される。テスト追加後に再生成する:

```bash
bun run dashboard   # = node scripts/generate-coverage-dashboard.mjs → docs/coverage-dashboard.html
```

### Phase 6: Verification — すべて自動検証（目視チェックリストは廃止）

冒頭の「ユーザー手動確認ゼロ原則」に従い、**確認項目はすべて実行可能なアサーションに落とす**。
「目視で確認する」「スクリーンショットを見て判断する」項目をここに書かないこと。

#### 6a. 必須コマンド（順序厳守）

```bash
bun run test          # Vitest: 全量移行の DOM 検証
bun run lint          # ESLint: react/no-unescaped-entities 等
rm -rf .next && bun run build   # 本番ビルド（webpack）。CSS 変更後は .next 削除が必須
bun run test:e2e      # Playwright chromium: スクロール・固定要素・a11y
bun run dashboard     # docs/coverage-dashboard.html 再生成
```

> `.next` の削除条件は `.agents/rules/css-cache-reset.md` に従う。
> `app/globals.css` / ページ固有 `.css` / `.module.css` を編集した場合は必須。

#### 6b. Vitest（DOM 全量検証）

テストは `.agents/rules/tdd-commit-workflow.md` §3 の**正準テストテンプレート**をコピーして作る。
テンプレートが §2 の強度基準（全見出し・全表セル・全リンク href・図の件数厳密一致・a11y）を満たしている。

**MermaidDiagram のモック（名前付きエクスポート）**:

```tsx
// ✅ 正しい: components/MermaidDiagram.tsx は export const MermaidDiagram
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" data-chart={chart} aria-label={ariaLabel} />
    ),
}));

// ❌ 誤り: default エクスポートではないため undefined になり描画時に落ちる
vi.mock('@/components/MermaidDiagram', () => ({ default: /* ... */ }));
```

モックが必要な理由: `MermaidDiagram` は `mermaid` を読み込み `document.fonts.ready` を待つため、jsdom では描画できない。

#### 6c. E2E（Playwright）で自動化する項目

かつて目視チェックリストだった項目は、以下のアサーションに置き換える。

| 検証したいこと | Playwright での自動アサーション |
|---|---|
| コンソールエラーが出ない | `page.on('console', ...)` で `error` を収集し `toHaveLength(0)` |
| ページ固有 sticky ナビが Header に隠れない | ナビの `boundingBox().y` >= Header 実高さ（`--fixed-offset` 相当）を検証 |
| scroll spy がアクティブリンクを切り替える | セクションへ `scrollIntoView` 後、`.active` を持つリンクの `href` が期待 id と一致 |
| 文字重なり・固定ヘッダー遮蔽 | 主要見出しの `boundingBox()` が Header/Disclaimer の矩形と交差しないことを検証 |
| レスポンシブ崩れ | `page.setViewportSize({ width: 768 })` / `640` で `document.scrollingElement.scrollWidth <= clientWidth`（横スクロール発生なし） |
| a11y | `@axe-core/playwright`（導入済み）で violations が 0 |
| Mermaid の縮小・見切れ | SVG の `viewBox` 幅と実 `getBoundingClientRect().width` を比較し、意図しない縮小がないことを検証 |

#### 6d. コード品質の静的アサーション（Vitest / grep で機械検証）

| 検証 | 方法 |
|---|---|
| `.code-block` 内に `{"\n"}` が残っていない | `grep -n '{"\\n"}' app/<route>/*.tsx` の結果が空 |
| `class=` が JSX に残っていない | `grep -nE '<[a-zA-Z][^>]*\sclass=' app/<route>/*.tsx` が空 |
| ページ CSS に新規 custom property が無い | `grep -nE '^\s*--[a-z-]+:' app/<route>/page.css` が空 |
| `@layer components` を使っていない | `grep -n '@layer' app/<route>/page.css` が空 |
| サイドバー幅契約 | `__tests__/guide-content-widths.test.ts` が全スタイルシートを検証（新規 CSS も自動的に対象） |
| camelCase keyframes が無い | `grep -nE '@keyframes\s+[a-z]+[A-Z]' app/<route>/page.css` が空 |

#### 6e. `scripts/verify-html-migration.mjs` について（現状の制約）

このスクリプトは移行元 HTML と SSR 出力のテキストを順序比較するが、**現状は
`app/cisco/ccna/automation-network-fundamentals/CcnaNetworkFundamentalsGuide.tsx` を
ハードコードで import している**ため、そのままでは他ページに使えない。

- 汎用の全量検証には使わず、`.agents/rules/tdd-commit-workflow.md` §3 のテストテンプレートを使うこと。
- このスクリプトを他ページへ流用する場合は、対象コンポーネントを引数化する改修を**別コミット**で行う。

## セッション終了前同期（必須）

進捗同期の手順は `.agents/rules/migration-progress-sync.md` に従ってください。毎ページ、移行作業の完了直後に実施します。

## Reusable CSS Component Classes (globals.css)

Do NOT redefine these in page-specific CSS. Use them directly in TSX:

| Class | Purpose |
| --- | --- |
| `.card` / `.card-sm` | Content cards with hover effects |
| `.card-grid` | Auto-fit grid layout |
| `.badge` | 各種バッジ（テストの種類やカテゴリなど） |
| `.code-block` / `.code-header` | Code block containers |
| `.table-wrapper` | Responsive table container |

## Constraints

- **Never import external fonts via `<link>` tags** — Use `next/font/google` in `layout.tsx` only.
- **Never define duplicate CSS variables** in page CSS that already exist in `globals.css @theme`
- **Never define new theme custom properties in page CSS** — add approved three-layer tokens to `app/globals.css @theme` and reference them
- **Never use `@layer components`** for page-specific styles — plain CSS only for proper specificity
- **Never duplicate z-index in CSS** when Tailwind class is used in JSX
- **Never place responsive overrides outside `@media` queries**
- **Never use camelCase for `@keyframes` names** — use kebab-case
- **Pages are server-rendered by default** — no `useState`/`useEffect` in `page.tsx`。**例外**: 進捗バー・scroll spy・チェックリスト等を持つリッチガイドは「正準リファレンス §1」の通り、Server `page.tsx`（`metadata` + `<XxxGuide/>` を返すだけ）と client `XxxGuide.tsx`（`'use client'`）に分割する。Server に状態を持ち込まない。
- **Always specify `preserveNaturalScale={true}` for `<MermaidDiagram>`** — 図が無理やり縮小されて文字が 1rem 未満になるのを絶対防止する
- **Never apply artificial `maxWidth` inline styles to Diagram wrappers** — `Diagram` や `.mermaid-wrap` に個別の `maxWidth` 幅制限（`maxWidth: 800px` 等）をインラインスタイルで指定することは禁止。コンテンツ領域の全幅 (`width: 100%`) を活用し、`margin: 1.5rem auto 2rem` で親コンテナ内中央に配置すること
- **Never omit or simplify visual design elements from original HTML** — 元HTMLの `:root` スタイル変数、`h1` グラデーションテキスト (`background-clip: text`)、`h2` 左アクセントバー (`border-left`)、`th` 白文字＆背景色、`.badge` ピル型 (`border-radius: 999px`)、`.callout` アクセントバー、構文ハイライトを100%完全に全量移植すること
- **Apply CLI / code syntax highlighting appropriately** — コードブロックは Section 6 の方針に従い `.code-header`, `.code-line`, `.code-comment` 等のクラスでカラー装飾するか、プレーン整形のみ（`.code-line`）を適切に選択すること
- **Always archive original files to correct subdirectories** — Cisco資料は原本を保持したまま `archive/Cisco/html/` および `archive/Cisco/md/` へそれぞれコピーして保存すること（削除厳禁）
- **Always write implementation plans in Japanese** — `implementation_plan.md` や応答は必ず日本語で作成すること
- **Never summarize or omit original text content** — 移行元の文章、図解、注意書き、テーブル、コマンド例は一切の省略・要約を禁止
- **Always use fallback values** for CSS vars that may not be defined: `var(--radius-lg, 16px)`
- **Never use `{"\n"}` for line breaks inside `.code-block`** — 各行を `<div className="code-line">...</div>` でラップすること
- **Never leave code blocks improperly formatted** — Section 6 の方針に沿って構文ハイライトまたはプレーン整形を正しく適用すること
- **Never leave unescaped quotes (' or ") or angle brackets in JSX text nodes** — `react/no-unescaped-entities` 回避のため、テンプレートリテラル `{`...`}` や HTML エンティティ (`&quot;`, `&apos;`) または `span` ラッパーを徹底すること
- **Never mix `class` and `className`** — JSX 内では必ず `className` に統一し、不適切な `class` 属性の残留を防ぐこと
- **Never align tabular data with spaces in `.code-block`** — デシジョンテーブルや行列データは `<table>` 要素を使うこと
- **Never remove page-specific anchor nav bars** — `'use client'` コンポーネントとして移行し `top: calc(var(--header-h) + var(--disclaimer-height))` を設定すること
- **Never duplicate page scope classes in CSS selectors** — ページクラスは最上位の1回のみ使用すること
