# Project Overview: Cloud Infrastructure Studies

このプロジェクトは、Google Cloud や AWS などのクラウド資格試験対策（Associate Cloud Engineer, Generative AI Leader など）を目的とした学習用 Next.js アプリケーションです。
試験ガイド、重要ポイントの解説、およびテスト対策コンテンツを提供します。

## 主な技術スタック

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, CSS Modules (一部カスタム CSS)
- **Testing:** Vitest (Unit/Component), Playwright (E2E)
- **Runtime:** Bun / Node.js

## 開発と実行

主要なコマンドは `package.json` に定義されています。**【リポジトリ標準】コマンドの実行には必ず `bun` を使用してください（bun 推奨、詳細は `README.md` を参照）。**

- **開発サーバー起動:** `bun run dev`
- **ビルド:** `bun run build`
- **単体テスト実行:** `bun run test` (Vitest)
- **E2E テスト実行:** `bunx playwright install`（初回のみ）、その後 `bun run test:e2e` (Playwright)
- **Lint 実行:** `bun run lint`

## プロジェクト構造

- `/app`: Next.js App Router のページコンポーネント。
  - `/gcl/associate-cloud-engineer`: ACE 試験対策ページ。
  - `/gcl/genai-leader`: Generative AI Leader 試験対策ページ（Section 1〜4）。
- `/components`: 共通コンポーネント（Header, Footer など）。
- `/__tests__`: Vitest によるユニットテスト。
- `/e2e`: Playwright による E2E テスト。
- `/Gcl`: 旧式の HTML ベースの学習ガイド資料（移行中、または参照用）。
- `/Aws`: AWS 関連の古い資料（アーカイブ済み）。

## 開発コンベンション

- **テスト駆動:** 新機能や修正の際は、`/__tests__` に対応するテストを追加または更新してください。
- **UI デザイン:** 各セクションごとに固有のテーマカラー（Aurora, Sapphire, Laboratory, Gold）が設定されています。
- **スタイリング:** CSS 変数は `app/globals.css` で定義された 3層トークンアーキテクチャに従ってください。
- **保守性:** 共通の定数（作成日など）は `app/gcl/genai-leader/constants.ts` に集約されています。

## 注意事項

- `litellm` や `dspy` は脆弱性の懸念があるため、プロジェクトへの追加は禁止されています。
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持してください。また、Client コンポーネント内でサーバー専用API (`fs`, `cookies`, `headers`) を参照することは禁止し、PropsはJSONシリアライズ可能なものに限定してください。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップしてください。`.code-line` は `white-space: pre` 等でインデントを保持し、`map` での展開時には安定した `key` を付与してください。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換してください。その際、必ず `<thead>` を含め、見出しセルには `<th scope="col">` を使用してください。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-card` など）を厳格に使用すること。コンポーネントの CSS 内で新しいカスタムプロパティ (`--*`) を定義することは禁止します（グローバルな `@theme` トークンのみを参照）。
- **レイアウトと最大幅の制約**: 各セクションのメインコンテンツは画面幅いっぱいに広がらないよう、CSS Modulesで `max-width` (例: 1000px または `.container` ラッパー) を設定し、中央寄せにしてください。`SharedSection.module.css` のような共通スタイルでは `.section > :not(.divider)` セレクタ等を活用して内部の幅を制限し、背景や区切り線（`.divider`）は画面全体に広がるようにします。
- **グローバルメニューの運用**: `components/Header.tsx` のようなグローバルナビゲーションには、未作成・未完成のセクションへのリンクは配置せず、該当ページやセクションが実装されてから追加するようにしてください。
- ページコンポーネント（`page.tsx`）が巨大化するのを防ぐため、各セクションは必ず `components/sections/` に分割し、スタイリングには CSS Modules (`*.module.css`) を使用してください。セクション間で共通のスタイル（例: `SectionBase.module.css`）を利用する場合は、CSS 内での `@import` を避け、各 TSX ファイルから直接 `import baseStyles from './SectionBase.module.css'` のようにインポートして適用してください。
- ASCIIダイアグラムの使用を避け、専用の SVG コンポーネント (`DiagramSVG.tsx` 等) に置き換えてください。型の制約（Discriminated Union）により、アクセシビリティを担保するための `ariaLabel="説明文"` または `decorative={true}` の指定が必須となります。
- アクセシビリティ（`aria-label` 等の付与）を徹底し、コンポーネントやユーティリティ関数には Docstrings (JSDoc) を追加してください。
- **移行作業の同期とHTMLファイルアーカイブルール**: HTMLの移行作業時には必ず `.gemini/rules/migration-progress-sync.md` に従い進捗を同期してください。また、**移行元の HTML ファイルは絶対に削除せず、移行完了後に `Gcl_Archive/` 配下の適切なディレクトリへ移動（アーカイブ）してください**。
- **異常なトークン消費の防止とステップごとのコミット義務**: 無駄なループを防ぐため、複数のステップにまたがる複雑な実装を行う際は、必ず計画を立て、1つのステップ（またはコンポーネント）ごとに実装とテストを完了させ、**そのステップの完了と同時に必ず `git status`, `git add`, `git commit` を実行して作業を確定させてから**次のステップに進んでください。
- **システムツールのパラメータ必須要件の厳守と自己レビュー義務 (`update_topic` 等)**: `update_topic` や `write_file` などのシステムツールを呼び出す際は、スキーマで要求されている**必須パラメーター（例: `strategic_intent` や `file_path` など）が全て含まれていることを実行前に必ず確認**してください。エラーとリトライの無限ループを防止するため、ツール呼び出し前の `<thought>` ブロック内で「これから使うツールの必須パラメータは何か？」「それらの値はセットされているか？」を明示的に自己レビューしてから実行してください。

## AI Skills

本プロジェクトにはAIエージェント（Gemini CLI 等）向けの専用スキルが用意されています。

- **`infra-md-to-nextjs-migration`**: Markdownの学習資料からNext.js（App Router）の `page.tsx` および `constants.ts` への移行ワークフローを定義したスキルです（スキル名は `infra-md-to-nextjs-migration`、インストール用パッケージファイルは `infra-md-to-nextjs-migration.skill` です）。

**インストール・利用手順 (Gemini CLI)**:

```bash
# プロジェクト（ワークスペース）スコープでインストール
gemini skills install infra-md-to-nextjs-migration.skill --scope workspace
```

対話セッション内では `/skills reload` を実行してスキルを有効化し、「MDを移行して」などのトリガーワードで呼び出してください。
