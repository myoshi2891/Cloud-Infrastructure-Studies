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

主要なコマンドは `package.json` に定義されています。**【絶対ルール】コマンドの実行には必ず `bun` を使用すること（`npm` は使用禁止です）。**

- **開発サーバー起動:** `bun run dev`
- **ビルド:** `bun run build`
- **単体テスト実行:** `bun run test` (Vitest)
- **E2E テスト実行:** `bun run test:e2e` (Playwright)
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
- ページコンポーネント（`page.tsx`）が巨大化する傾向があるため、必要に応じてロジックやコンテンツの分離を検討してください。

## AI Skills

本プロジェクトにはAIエージェント（Gemini CLI 等）向けの専用スキルが用意されています。

- **`infra-md-to-nextjs-migration`**: Markdownの学習資料からNext.js（App Router）の `page.tsx` および `constants.ts` への移行ワークフローを定義したスキルです（スキル名は `infra-md-to-nextjs-migration`、インストール用パッケージファイルは `infra-md-to-nextjs-migration.skill` です）。

**インストール・利用手順 (Gemini CLI)**:

```bash
# プロジェクト（ワークスペース）スコープでインストール
gemini skills install infra-md-to-nextjs-migration.skill --scope workspace
```

対話セッション内では `/skills reload` を実行してスキルを有効化し、「MDを移行して」などのトリガーワードで呼び出してください。
