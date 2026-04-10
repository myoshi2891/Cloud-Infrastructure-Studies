# Cloud Infrastructure Studies

Google Cloud (GCP) や AWS の資格試験対策を目的とした、インタラクティブな学習用 Next.js アプリケーションです。

## 🚀 特徴

- **詳細な試験ガイド:** Associate Cloud Engineer (ACE) や Generative AI Leader の広範なトピックを網羅。
- **視覚的な学習体験:** セクションごとに最適化されたデザインテーマ（Aurora, Sapphire, Laboratory, Gold）。
- **最新の技術解説:** Hypercomputer, SAIF, 責任ある AI 6原則など、試験頻出の高度なトピックを体系化。
- **テスト済みのコンテンツ:** ユニットテストと E2E テストにより、正確な情報提供と表示を保証。

## 🛠 技術スタック

- **Frontend:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4, Lucide React
- **Testing:** Vitest, Playwright
- **Runtime:** Bun / Node.js

## 📦 セットアップ

### プリレクイジット

- Node.js 20+ または Bun 1.x

### インストール

```bash
npm install
# または
bun install
```

### 開発サーバーの起動

```bash
npm run dev
# または
bun dev
```

### ビルド

```bash
npm run build
```

## 🧪 テストの実行

### ユニットテスト (Vitest)

```bash
npm run test
```

### E2E テスト (Playwright)

```bash
# ブラウザのインストール（初回のみ）
npx playwright install
# テスト実行
npm run test:e2e
```

## 📂 ディレクトリ構造

- `app/`: 各試験セクションのページとスタイル。
- `components/`: ヘッダー、フッター等の共通コンポーネント。
- `__tests__/`: ユニット・コンポーネントテスト。
- `e2e/`: Playwright によるシナリオテスト。

## 📝 ライセンス

Private Project

## 🤖 AI Skills (AI エージェント向け)

本プロジェクトの開発や移行作業を補助するための専用 AI スキルが用意されています。

- **`infra-md-to-nextjs-migration.skill`**: Markdown 形式の試験対策コンテンツを `Next.js` アプリケーションへ安全に移行するためのルールと手順（JSX構造、SVG変換、TypeScript Strict対応）を定義したスキルです。

**Gemini CLI での利用方法:**

```bash
# プロジェクト内にインストール
gemini skills install infra-md-to-nextjs-migration.skill --scope workspace
```

※ インストール後、Gemini CLI の対話セッションで `/skills reload` を実行して有効化してください。
