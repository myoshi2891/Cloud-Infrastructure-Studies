# Cloud Infrastructure Studies

最終更新日: 2026-08-09

Google Cloud (GCP) の資格試験対策を目的とした、インタラクティブな学習用 Next.js アプリケーションです。

## 🚀 特徴

- **詳細な試験ガイド:** Associate Cloud Engineer (ACE)、Generative AI Leader、Cloud Digital Leader (CDL)、Associate Google Workspace Administrator (AGWA)、Professional Cloud Network Engineer (PCNE) の広範なトピックを網羅。AWS 対応準備中。
- **データ駆動ナビゲーション:** `app/constants.ts` を正本とし、ハンバーガー Drawer が GCP/AWS をプロバイダ別に自動グルーピング。新試験追加は ① `app/constants.ts` の `EXAMS` にエントリ追加 ② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加 ③ 試験ページ作成 の 3 ステップで Header は自動反映（直接編集不要）。
- **視覚的な学習体験:** セクションごとに最適化されたデザインテーマ（Aurora, Sapphire, Laboratory, Gold）。
- **最新の技術解説:** Hypercomputer, SAIF, 責任ある AI 6原則など、試験頻出の高度なトピックを体系化。
- **テスト済みのコンテンツ:** ユニットテスト（Vitest）と E2E テスト（Playwright）により、正確な情報提供と表示を保証。
- **モダンな実装:** セクション分割、CSS Modules、アクセシビリティ対応、専用SVGコンポーネントによる高品質なコードベース。

## 🛠 技術スタック

- **Frontend:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4, CSS Modules, Lucide React
- **Testing:** Vitest, Playwright
- **Runtime:** Bun / Node.js
- **Container:** Docker (Bun alpine, multi-stage build, standalone output)
- **Hosting:** Netlify (Free Plan, `@netlify/plugin-nextjs`)

## 📦 セットアップ

### 🐳 Docker で起動する（推奨）

Docker がインストールされていれば、ローカル環境への依存なしに起動できます。

```bash
# 開発サーバー（hot reload）
make dev

# 本番ビルド & 起動
make prod

# 停止
make down

# コマンド一覧
make help
```

| コマンド | 内容 |
|---|---|
| `make dev` | 開発サーバー（hot reload、ソース bind mount） |
| `make dev-d` | 開発サーバーをバックグラウンドで起動 |
| `make prod` | 本番イメージをビルドして起動 |
| `make build` | 本番イメージのみビルド |
| `make down` | コンテナを停止・削除 |
| `make clean` | コンテナ + 名前付きボリュームを削除 |
| `make prune` | イメージ・キャッシュも含めて全削除 |
| `make logs` | 本番コンテナのログを表示 |
| `make logs-dev` | 開発コンテナのログを表示 |
| `make shell` | 本番コンテナ内シェル（デバッグ用） |
| `make shell-dev` | 開発コンテナ内シェル（デバッグ用） |

> **本番イメージサイズ:** standalone モードにより約 256MB（通常の Next.js + node_modules 全体比で大幅削減）
> **注意:** `next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で切り替え。Docker は `standalone`、Netlify は未設定（SSR）。

---

### ☁️ Netlify へのデプロイ

`netlify.toml` に設定済み。Netlify 管理画面でリポジトリを接続するだけで自動デプロイが有効になります。

| 設定 | 値 |
|---|---|
| ビルドコマンド | `bun run build` |
| パブリッシュディレクトリ | `.next` |
| プラグイン | `@netlify/plugin-nextjs` |

---

### ローカル（Bun）で起動する

**【パッケージマネージャー方針】**
本リポジトリではコマンドの実行に **Bun** を使用します。

#### プリレクイジット

- Bun 1.x

#### インストール

```bash
bun install
```

#### 開発サーバーの起動

```bash
bun run dev
```

#### ビルド

```bash
bun run build
```

#### Lint

```bash
bun run lint
```

#### Markdown lint

```bash
bun run markdownlint -- <file>
```

## 🧪 テストの実行

### ユニットテスト (Vitest)

```bash
bun run test
```

### E2E テスト (Playwright)

```bash
# ブラウザのインストール（初回のみ）
bunx playwright install

# テスト実行
bun run test:e2e
```

### Performance テスト (Playwright `perf` project)

主要 7 ページの Core Web Vitals (LCP / CLS / TBT) を `e2e/perf-budgets.json` の閾値と比較します。

```bash
bun run test:perf
```

深掘り分析用に Lighthouse CI を手動起動できます（`.lighthouseci/` に HTML/JSON が出力されます）。

```bash
bun run build && bun run perf:report
```

### Security テスト (`bun audit` ラッパー)

`bun audit --json` を集計し、`high` / `critical` の脆弱性検出時に exit 1 を返します。

```bash
bun run test:security
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
