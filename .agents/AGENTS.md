# Project Rules & Quality Mandates: Cloud Infrastructure Studies

(最終更新日: 2026-08-09)

本ファイルは、本プロジェクトにおけるコード実装・HTML移行・スタイリング・テスト駆動開発（TDD）の厳格な品質基準と運用ルールを規定する。

## 1. デザイン完全移転原則（厳守）

- **元HTMLの `:root` スタイル変数が表すデザイン値の100%全量移植**:
  - 静的HTMLから Next.js への移行時、元HTMLの `<style>` に定義されている `:root` 変数（背景色 `--bg`, `--bg-panel`, `--bg-panel-2`, `--bg-code`、境界線 `--border`, `--border-soft`、アクセントカラー `--accent`, `--accent-2`、テキスト色 `--text`, `--text-muted`, `--text-faint` 等）が表す視覚デザイン値を簡略化したり自己流に置き換えてはならない。追加先の優先順位は、まず既存の `app/globals.css` の `@theme` トークンへ対応付け、表現できない新規テーマカラーだけをページ固有 CSS のページルートセレクタへ定義する。その CSS は対応する `page.tsx` または `layout.tsx` から直接 import する。
  - 元HTMLの背景色グラデーション（`linear-gradient`）、ピル型バッジ（`border-radius: 999px`）、文字グラデーション（`background-clip: text`）、コールアウト枠線、ボタンデザイン、余白・フォントサイズは、既存のグローバルトークンと、既存トークンで表現できない場合に限るページ固有トークンの参照によって100%忠実に移転すること。

## 2. Mermaid ダイアグラムの視認性と配色検証ルール

- **黄色・明色ノードの黒文字強制適用**:
  - Mermaid図解内で使用される黄色・明色ノード（`#ffe08a`, `#fbbc04`, `#ffd479`, `#ffba00` 等）は、暗色テーマ環境下でデフォルトの白文字 (`#ffffff`) が当たると文字が同化して判読不能になる。
  - 新しい黄色系カラーコードを使用する際は、必ず [`components/MermaidDiagram.module.css`](../components/MermaidDiagram.module.css) の黒文字転換セレクタ（`.mermaidTarget :global(.node[style*="..."] .nodeLabel)` 等）にカラーコードを追加し、黒文字 (`#000000 !important`) で高コントラスト表示されることを確認すること。
- **図解の拡大・枠外はみ出し防止**:
  - `diagram-wrapper` および `mermaid-wrap` 内の SVG 要素には `max-width: 100% !important; height: auto !important;` を指定し、ヘッダーや画面枠をはみ出さないよう収めること。
  - **例外**: `MermaidDiagram.tsx` で `preserveNaturalScale={true}` を指定した図は、SVG の自然倍率維持を優先して `max-width: none` とし、親ラッパーの `overflow-x: auto` で横スクロールを提供する。この場合、`diagram-wrapper` / `mermaid-wrap` から `max-width: 100% !important` を SVG に適用してはならない。

## 3. TDD & コミットワークフローの鉄則

- `Step 1 (Red)`: 要件・見出し・表セル・Mermaid図の `ariaLabel`・参考リンクを100%網羅するテストを先に作成し、失敗を確認してコミット。
- `Step 2 (Green)`: テストを通過させる最小限の実装を行いコミット。
- `Step 3 (Refactor)`: ルーティング統合 (`app/constants.ts`) およびドキュメント (`MIGRATION_PROGRESS.md`, `GEMINI.md`, `CLAUDE.md`) の更新を行いコミット。

## 4. Cisco 移行元ファイルのアーカイブ規約（厳守）

- Cisco の移行元 HTML / Markdown は、原本を保持したまま `archive/Cisco/html/` および `archive/Cisco/md/` の適切な下位ディレクトリへ保存すること。
- `Gcl_Archive/Cisco` は作成・使用してはならない。既存の Cisco アーカイブやドキュメント参照を発見した場合は `archive/Cisco` へ統合すること。
- アーカイブ移動と同じコミットで `MIGRATION_PROGRESS.md` 等の参照先を同期し、`Gcl_Archive/Cisco` が残っていないことをテストまたは検索で確認すること。
