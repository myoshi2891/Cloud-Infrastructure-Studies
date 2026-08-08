# Project Rules & Quality Mandates: Cloud Infrastructure Studies

本ファイルは、本プロジェクトにおけるコード実装・HTML移行・スタイリング・テスト駆動開発（TDD）の厳格な品質基準と運用ルールを規定する。

## 1. デザイン完全移転原則（厳守）

- **元HTMLの `:root` スタイル変数が表すデザイン値の100%全量移植**:
  - 静的HTMLから Next.js への移行時、元HTMLの `<style>` に定義されている `:root` 変数（背景色 `--bg`, `--bg-panel`, `--bg-panel-2`, `--bg-code`、境界線 `--border`, `--border-soft`、アクセントカラー `--accent`, `--accent-2`、テキスト色 `--text`, `--text-muted`, `--text-faint` 等）が表す視覚デザイン値を簡略化したり自己流に置き換えてはならない。値は既存の `app/globals.css` の `@theme` トークンへ対応付け、不足する場合はグローバルトークンを追加する。
  - 元HTMLの背景色グラデーション（`linear-gradient`）、ピル型バッジ（`border-radius: 999px`）、文字グラデーション（`background-clip: text`）、コールアウト枠線、ボタンデザイン、余白・フォントサイズは、ローカルな `--*` 変数を `page.css` に再定義せず、グローバルトークンの参照によって100%忠実に移転すること。

## 2. Mermaid ダイアグラムの視認性と配色検証ルール

- **黄色・明色ノードの黒文字強制適用**:
  - Mermaid図解内で使用される黄色・明色ノード（`#ffe08a`, `#fbbc04`, `#ffd479`, `#ffba00` 等）は、暗色テーマ環境下でデフォルトの白文字 (`#ffffff`) が当たると文字が同化して判読不能になる。
  - 新しい黄色系カラーコードを使用する際は、必ず [`components/MermaidDiagram.module.css`](../components/MermaidDiagram.module.css) の黒文字転換セレクタ（`.mermaidTarget :global(.node[style*="..."] .nodeLabel)` 等）にカラーコードを追加し、黒文字 (`#000000 !important`) で高コントラスト表示されることを確認すること。
- **図解の拡大・枠外はみ出し防止**:
  - `diagram-wrapper` および `mermaid-wrap` 内の SVG 要素には `max-width: 100% !important; height: auto !important;` を指定し、ヘッダーや画面枠をはみ出さないよう収めること。

## 3. TDD & コミットワークフローの鉄則

- `Step 1 (Red)`: 要件・見出し・表セル・Mermaid図の `ariaLabel`・参考リンクを100%網羅するテストを先に作成し、失敗を確認してコミット。
- `Step 2 (Green)`: テストを通過させる最小限の実装を行いコミット。
- `Step 3 (Refactor)`: ルーティング統合 (`app/constants.ts`) およびドキュメント (`MIGRATION_PROGRESS.md`, `GEMINI.md`, `CLAUDE.md`) の更新を行いコミット。
