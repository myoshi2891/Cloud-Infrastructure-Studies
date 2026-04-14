# Cloud Infrastructure Studies

Google Cloud (GCP) や AWS の資格試験対策を目的とした、インタラクティブな学習用 Next.js アプリケーションです。

## 🚀 特徴

- **詳細な試験ガイド:** Associate Cloud Engineer (ACE) や Generative AI Leader の広範なトピックを網羅。
- **視覚的な学習体験:** セクションごとに最適化されたデザインテーマ（Aurora, Sapphire, Laboratory, Gold）。
- **最新の技術解説:** Hypercomputer, SAIF, 責任ある AI 6原則など、試験頻出の高度なトピックを体系化。
- **テスト済みのコンテンツ:** ユニットテストと E2E テストにより、正確な情報提供と表示を保証。
- **モダンな実装:** セクション分割、CSS Modules、アクセシビリティ対応、専用SVGコンポーネントによる高品質なコードベース。

## 🛠 技術スタック

- **Frontend:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4, CSS Modules, Lucide React
- **Testing:** Vitest, Playwright
- **Runtime:** Bun / Node.js

## 📦 セットアップ

**【パッケージマネージャー方針】**
本リポジトリではコマンドの実行に **Bun を推奨** しますが、npm でも互換性を持って動作するように設計されています。以下に両方のコマンドを併記します。

### プリレクイジット

- Node.js 20+ または Bun 1.x

### インストール

```bash
bun install
# または (npm の場合)
npm install
```

### 開発サーバーの起動

```bash
bun run dev
# または (npm の場合)
npm run dev
```

### ビルド

```bash
bun run build
# または (npm の場合)
npm run build
```

## 🧪 テストの実行

### ユニットテスト (Vitest)

```bash
bun run test
# または (npm の場合)
npm run test
```

### E2E テスト (Playwright)

```bash
# ブラウザのインストール（初回のみ）
bunx playwright install
# または (npm の場合)
npx playwright install

# テスト実行
bun run test:e2e
# または (npm の場合)
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
d-to-nextjs-migration.skill --scope workspace
```

※ インストール後、Gemini CLI の対話セッションで `/skills reload` を実行して有効化してください。
