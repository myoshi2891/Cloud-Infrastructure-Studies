---
name: qa-studies-html-to-nextjs-migration
description: >
  Complete workflow for migrating static HTML pages to Next.js App Router page.tsx
  in the QA_Studies project. Covers CSS variable mapping (HTML vars to Tailwind v4
  @theme tokens), page-specific CSS extraction, Header.tsx navigation updates,
  and CLAUDE.md documentation. Extends the global html-to-nextjs-migration skill
  with project-specific knowledge including font loading via next/font/google,
  design token alignment, and accessibility patterns.
  Trigger: HTMLマイグレーション, ページ移行, HTML変換, 静的HTML移行, CSS変数マッピング,
  unit-testing-guide.html migration, new page creation from HTML, HTMLからpage.tsx,
  mat/mbt/tas guide migration.
---

# QA_Studies HTML → Next.js Migration Workflow

## Goal

Provide the complete, ordered workflow for converting a standalone HTML page (with embedded `<style>`) into a fully integrated Next.js App Router page within the QA_Studies project. This skill extends the global `html-to-nextjs-migration` skill (JSX pitfalls) with project-specific CSS token mapping, file organization, and integration steps.

**Prerequisite**: The global skill covers `<pre>` block conversion, `class`/`className` rules, HTML entity handling, `@layer` priority, and cache invalidation. This skill assumes that knowledge and focuses on the **end-to-end workflow**.

## セッション開始時に必ず読むファイル

1. **`docs/MIGRATION_PROGRESS.md`** — 現在地・残タスク・再開プロンプト
2. **このファイル（`SKILL.md`）** — 移行手順と QA_Studies 固有ルール
3. **`.claude/rules/TDD_COMMIT_WORKFLOW.md`** — TDD必須サイクル & コミット分割ルール

## 未移行 HTML

| ファイル | 予定ルート | 状態 |
|---|---|---|
| なし | - | ✅ 全て完了 |

## Instructions

### TDD 必須サイクルの適用（最重要）

移行作業中は、常に `.claude/rules/TDD_COMMIT_WORKFLOW.md` に定められた TDD サイクル（Red → Green → Refactor → Docs）を最優先で適用しなければなりません。

1. **タスク設計の段階（`task.md` の作成時）**:
   - `task.md` 内のタスクを「Red（テスト失敗とコミット）」「Green（実装とコミット）」「Refactor（リファクタ/ビルド/Linter修正とコミット）」「Docs Sync（進捗同期とコミット）」のコミット単位に明確に構造化してください。
2. **実装前のテスト作成（Red）**:
   - 移行先のコード（`page.tsx` や `NavBar.tsx` 等）を実装する前に、必ず失敗するユニットテストを作成してコミットしてください。
3. **一括コミットの厳禁**:
   - テスト、実装、カバレッジ更新、ドキュメント更新を一つのコミットにまとめず、フェーズごとに分割コミットを行ってください。

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

#### unit-testing-guide.html (Warm Editorial Theme) → Project Tokens (Example)

| HTML Variable | Project Token | Notes |
| --- | --- | --- |
| `--cream` | `--color-background` | Light → dark theme conversion |
| `--cream2` | `--color-card` |  |
| `--cream3` | `--color-card` |  |
| `--ink` | `--color-foreground` | Inverted from dark-on-light |
| `--ink2` / `--ink3` | `--color-muted-foreground` |  |
| `--ink4` | `--color-muted` |  |
| `--green` / `--green2` | `--color-primary` | Or use theme-specific primary |
| `--green3` | N/A | Replace `var(--green3)` with `rgba(104, 211, 145, <alpha>)` where `<alpha>` is taken from the HTML’s original opacity/rgba alpha usage (use a numeric value). |
| `--amber` | `--color-brand-end` | Or specific brand accent |
| `--red` | `--color-theme-cdl-fg` | Example mapping for CDL theme |
| `--blue` | `--color-primary` |  |
| `--purple` | `--color-theme-genai-fg` | Example mapping for GenAI theme |
| `--border` | `--color-border` |  |
| `--border2` | `--color-border` |  |
| `--r` | `--radius-lg` | 16px |
| `--rs` | `--radius-md` | 10px |
| `--font-display` (`Playfair Display`) | `--font-display` (DM Sans) | Font replacement |
| `--font-body` (`Plus Jakarta Sans`) | `--font-body` (Noto Sans JP) | Font replacement |
| `--font-mono` (`Sora` / `Source Code Pro`) | `--font-mono` (JetBrains Mono) | Font replacement |

**Critical**: The project uses a **unified dark theme**. Light-theme HTML pages must be re-themed to match the dark color system. Do not attempt to preserve the original light color scheme.

### Phase 3: Create Page-Specific CSS File

1. Create `app/<page-slug>/page.css` (or alongside the component) for styles unique to this page
2. Do NOT use `@layer components` — use plain CSS selectors for proper specificity over Tailwind preflight
3. Replace all HTML-local CSS variables with project `@theme` tokens (with fallbacks)
4. Rename keyframes from camelCase to kebab-case (e.g., `fadeUp` → `fade-up`)
5. Place `@keyframes` definitions that are page-specific in the page CSS, not globals
6. Import the CSS at the top of the page component: `import './page.css';`

#### CSS Pitfalls Checklist (learned from code reviews)

| Issue | Wrong | Correct |
| --- | --- | --- |
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
     4. `page.tsx`（Server Component のまま）先頭で `<NavBar />` をインポート・配置

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

#### 5b. Update Navigation & E2E Testing Assertions

To prevent CI/CD and test suite breakages, you must update the page count expectations in the following test-related files:

1. **`__tests__/navigation.test.ts`** (テストファイルの場所に合わせて修正してください)
2. **`e2e/pages.ts`**:
   - Add the path and header regex for the new page into the `PAGES` array.
   - Increment `EXPECTED_PAGE_COUNT` to the new page total.

#### 5c. Create Route Directory

Create `app/<page-slug>/page.tsx` following Next.js App Router conventions.

#### 5d. Update CLAUDE.md and GEMINI.md

Add the new page to the Architecture section of **both** `CLAUDE.md` and `GEMINI.md`:

```markdown
- `app/<page-slug>/page.tsx` — ページの説明
```

If a page-specific CSS file was created, also document it.

#### 5e. Update docs/coverage-dashboard.html

After adding `__tests__/<page-slug>/page.test.tsx`, update the `DATA.pages` array in the `<script>` block at the bottom of `docs/coverage-dashboard.html` and run:

```bash
bun scripts/generate-coverage-dashboard.mjs
```

### Phase 6: Verification

#### Build Verification

```bash
rm -rf .next && bun run build
```

#### Visual Verification Checklist

- [ ] Page renders without console errors
- [ ] All `<pre>` code blocks display as multi-line
- [ ] Syntax highlighting colors render (`.kw`, `.str`, `.cm`, `.fn`, `.cls`, `.num`)
- [ ] **`.code-block` 内の各行が正しく改行されている**（`{"\n"}` を使っている箇所がないか確認。あれば `<div className="code-line">` ラッパーに置換）
- [ ] **デシジョンテーブル・行列データが列ズレなく表示されている**（テキストのスペース揃えではなく `<table>` を使用しているか）
- [ ] Cards, badges, callouts display correctly
- [ ] Fonts load properly (display, body, mono)
- [ ] Navigation shows new page link and works
- [ ] **ページ固有のスティッキーナビゲーションが Header の直下（60px もしくは `var(--fixed-offset)` 位置）に表示され、スクロール時にアクティブリンクが切り替わる**
- [ ] Responsive layout at 768px and 640px breakpoints
- [ ] No z-index conflicts with navigation (nav must stay on top)
- [ ] Animations play correctly (fade-up, pulse-border)
- [ ] Scrollbar styling matches (thin, styled thumb)

## セッション終了前同期（必須）

進捗同期の手順は `.claude/rules/migration-progress-sync.md` に従ってください。毎ページ、移行作業の完了直後に実施します。

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
- **Never use `@layer components`** for page-specific styles — plain CSS only for proper specificity
- **Never duplicate z-index in CSS** when Tailwind class is used in JSX
- **Never place responsive overrides outside `@media` queries**
- **Never use camelCase for `@keyframes` names** — use kebab-case
- **Pages are server-rendered** — no `useState`, `useEffect`, or client-side interactivity unless explicitly needed (use `'use client'` directive)
- **Always use fallback values** for CSS vars that may not be defined: `var(--radius-lg, 16px)`
- **Never use `{"\n"}` for line breaks inside `.code-block`** — 各行を `<div className="code-line">...</div>` でラップすること
- **Never align tabular data with spaces in `.code-block`** — デシジョンテーブルや行列データは `<table>` 要素を使うこと
- **Never remove page-specific anchor nav bars** — `'use client'` コンポーネントとして移行し `top: calc(var(--header-h) + var(--disclaimer-height))` を設定すること
- **Never duplicate page scope classes in CSS selectors** — ページクラスは最上位の1回のみ使用すること
