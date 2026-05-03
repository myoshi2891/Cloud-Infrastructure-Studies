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
  unit-testing-guide.html migration, new page creation from HTML, HTMLからpage.tsx.
---

# QA_Studies HTML → Next.js Migration Workflow

## Goal

Provide the complete, ordered workflow for converting a standalone HTML page (with embedded `<style>`) into a fully integrated Next.js App Router page within the QA_Studies project. This skill extends the global `html-to-nextjs-migration` skill (JSX pitfalls) with project-specific CSS token mapping, file organization, and integration steps.

**Prerequisite**: The global skill covers `<pre>` block conversion, `class`/`className` rules, HTML entity handling, `@layer` priority, and cache invalidation. This skill assumes that knowledge and focuses on the **end-to-end workflow**.

## Instructions

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
| Accent colors | `--color-primary` / `--color-theme-{genai,ace,cdl}-fg` |  |
| Border vars | `--color-border` |  |
| Radius `--r` / `--rs` / `--r-sm` | `--radius-lg` (16px) / `--radius-md` (10px) / `--radius-sm` (4px) | Always add fallback: `var(--radius-lg, 16px)` |
| Shadow vars | N/A | Use Tailwind shadow classes (shadow-lg, shadow-xl, etc.) |
| Font display | `--font-display` | Resolved by next/font/google in layout.tsx |
| Font body | `--font-body` | Resolved by next/font/google in layout.tsx |
| Font mono | `--font-mono` | Resolved by next/font/google in layout.tsx |

#### unit-testing-guide.html (Warm Editorial Theme) → Project Tokens

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

### Phase 4: Convert HTML to TSX

1. **Remove** `<html>`, `<head>`, `<body>`, `<style>`, `<script>` — handled by `layout.tsx`
2. **Remove** `<link>` font tags — fonts loaded via `next/font/google` in `layout.tsx`
3. **Remove** `<nav>` block — navigation provided by `components/Header.tsx`
4. **Wrap** page content in a React component:

```tsx
import '../<page-name>.css';

export default function PageName() {
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

#### 5a. Update Header Navigation

Add a new `<Link>` to `components/Header.tsx`:

```tsx
<Link href="/<page-slug>">ページ表示名</Link>
```

#### 5b. Create Route Directory

Create `app/<page-slug>/page.tsx` following Next.js App Router conventions.

#### 5c. Update CLAUDE.md

Add the new page to the Architecture section:

```markdown

- `app/<page-slug>/page.tsx` — ページの説明

```

If a page-specific CSS file was created, also document it.

### Phase 6: Verification

#### Build Verification

Use bun for all command execution (required by project policy).

```bash
rm -rf .next && bun run build
```

Common build failures:

- Unclosed JSX tags
- `class` not converted to `className` in JSX (keep `class` inside `dangerouslySetInnerHTML`)
- Missing closing `/>` on void elements
- Unescaped `{` or `}` in JSX text (use `{'{'}` or `{'}'}`)

#### Visual Verification Checklist

- [ ] Page renders without console errors
- [ ] All `<pre>` code blocks display as multi-line
- [ ] Syntax highlighting colors render (`.kw`, `.str`, `.cm`, `.fn`, `.cls`, `.num`)
- [ ] Cards, badges, callouts display correctly
- [ ] Fonts load properly (display, body, mono)
- [ ] Navigation shows new page link and works
- [ ] Responsive layout at 768px and 640px breakpoints
- [ ] No z-index conflicts with navigation (nav must stay on top)
- [ ] Animations play correctly (fade-up, pulse-border)
- [ ] Scrollbar styling matches (thin, styled thumb)

## Reusable CSS Component Classes (globals.css)

Do NOT redefine these in page-specific CSS. Use them directly in TSX:

| Class | Purpose |
| --- | --- |
| `.card` / `.card-sm` | Content cards with hover effects |
| `.card-grid` | Auto-fit grid layout |
| `.badge` + `.badge-unit/int/func/e2e/sec/perf/a11y/istqb` | Test type badges |
| `.code-block` / `.code-header` / `.code-dots` / `.code-lang` | Code block containers |
| `.callout` + `.callout-info/warn/good/danger` | Callout boxes |
| `.pyramid-container` / `.pyramid-layer` / `.py-unit/int/func/e2e` | Test pyramid visualization |
| `.tab-nav` / `.tab-btn` / `.tab-panel` | Tab UI |
| `.section-header` / `.section-num` / `.accent-line` | Section headings |
| `.hero` / `.hero-eyebrow` / `.hero-sub` / `.hero-stats` | Hero section |
| `.stat` / `.stat-num` / `.stat-label` | Statistics display |
| `.step-list` / `.step-item` / `.step-num-circle` / `.step-content` | Numbered step indicators |
| `.table-wrapper` | Responsive table container |
| `.tool-grid` / `.tool-card` / `.tool-name` / `.tool-desc` | Tool cards |
| `.gherkin` + `.kw-given/when/then/feat/scen` | BDD scenario formatting |
| `.cert-row` / `.cert-level-badge` / `.cert-info` | Certification roadmap |

## Constraints

- **Never import external fonts via `<link>` tags** — Use `next/font/google` in `layout.tsx` only. If a new font is needed, add it to `layout.tsx` with a CSS variable
- **Never define duplicate CSS variables** in page CSS that already exist in `globals.css @theme`
- **Never use `@layer components`** for page-specific styles — plain CSS only for proper specificity
- **Never duplicate z-index in CSS** when Tailwind class is used in JSX
- **Never place responsive overrides outside `@media` queries**
- **Never use camelCase for `@keyframes` names** — use kebab-case
- **Pages are server-rendered** — no `useState`, `useEffect`, or client-side interactivity unless explicitly needed (use `'use client'` directive)
- **Always update Header.tsx and CLAUDE.md** when adding a new page
- **Always use fallback values** for CSS vars that may not be defined: `var(--radius-lg, 16px)`
