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
