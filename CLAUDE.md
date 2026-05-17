# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GCP/AWS 資格試験対策（Associate Cloud Engineer, Generative AI Leader, Cloud Digital Leader, Associate Google Workspace Administrator, Professional Cloud Network Engineer、AWS Certified Solutions Architect – Associate ※準備中）を目的としたNext.js学習アプリ。

試験データの正本は `app/constants.ts` の `EXAMS` 配列。ナビゲーションは `app/navigation.ts` の `toNavTree(EXAMS)` で自動生成されるため、新試験追加時は **`Header.tsx` を直接編集しない**。新試験追加の手順は ① `app/constants.ts` の `EXAMS` にエントリ追加、② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加、③ 試験ページ作成 の 3 ファイルのみ変更すれば Header に自動反映される。

## コマンド

```bash
# 開発（ローカル）
bun run dev          # Turbopack で開発サーバー起動（localhost:3000）
bun run build        # プロダクションビルド
bun run lint         # ESLint

# テスト
bun run test         # Vitest（ユニット・コンポーネント）
bun run test:watch   # Vitest ウォッチモード（単一ファイル: vitest run __tests__/foo.test.tsx）
bun run test:e2e     # Playwright E2E（dev server を自動起動）
```

初回E2Eテスト前: `bunx playwright install`

```bash
# Docker（Makefile 経由）
make dev             # 開発サーバー起動（hot reload、bind mount）
make prod            # 本番ビルド & 起動（standalone、256MB）
make down            # コンテナ停止・削除
make logs            # 本番コンテナのログ表示
make logs-dev        # 開発コンテナのログ表示
make shell           # 本番コンテナ内シェル（デバッグ用）
make clean           # コンテナ + 名前付きボリューム削除
make help            # コマンド一覧
```

Docker 関連ファイル: `Dockerfile`（本番）、`Dockerfile.dev`（開発）、`compose.yaml`、`.dockerignore`

```bash
# Netlify（CI/CD 自動ビルド）
# netlify.toml に従い Netlify が自動実行。手動トリガー不要。
# ローカルで Netlify モード（output=undefined）のビルド確認:
bun run build   # NEXT_OUTPUT_MODE 未設定で実行
```

## アーキテクチャ

**ルーティング:** Next.js 16 App Router。全ページは `app/` 配下。

```text
app/
  layout.tsx                        # ルートレイアウト（Header/DisclaimerBanner/Footer、フォント定義）
  page.tsx                          # トップページ
  globals.css                       # グローバルスタイル（デザイントークン定義）
  constants.ts                      # 試験データ正本（EXAMS / STATS）。新試験はここに追加するだけ
  navigation.ts                     # toNavTree(EXAMS) adapter → NavGroup[] を生成し Header が参照
  gcl/
    associate-cloud-engineer/
      page.tsx                      # ACE 試験対策ページ
      ace.css                       # Aurora テーマ（ページ固有）
      domain{1-4}/page.tsx          # 各ドメイン詳細ページ
      architecture-guide/page.tsx   # アーキテクチャガイドページ
    genai-leader/
      page.tsx                      # Generative AI Leader トップ
      genai-leader.css              # Sapphire テーマ（ページ固有）
      constants.ts                  # 共通定数（作成日など）
      section1/
        page.tsx                    # Section 1: AI の基礎と ML の概念
        section1.css                # ページ固有スタイル
        components/                 # 分割されたセクションコンポーネント（Batch E）
      section2/
        page.tsx                    # Section 2: Google Cloud の Gen AI サービス
        section2.css                # ページ固有スタイル
        components/                 # 分割されたセクションコンポーネント（Batch E）
      section3/page.tsx             # Section 3: Gen AI ソリューションの開発
      section4/page.tsx             # Section 4: 責任ある AI
    cloud-digital-leader/
      cdl.css                       # CDL 共通テーマ（--cdl-* トークン定義）
      section1/
        page.tsx                    # Section 1: デジタルトランスフォーメーション
        components/sections/        # 分割されたセクションコンポーネント
      section2/
        page.tsx                    # Section 2: データとクラウドの基礎
        components/sections/        # 分割されたセクションコンポーネント
      section3/
        page.tsx                    # Section 3: AI によるイノベーション
        section3.css                # ページ固有スタイル（plain CSS）
        constants.ts                # Section 3 固有定数
        components/sections/        # 分割されたセクションコンポーネント
      section4/
        page.tsx                    # Section 4: インフラ&アプリのモダナイゼーション
        section4.module.css         # ページ固有スタイル（CSS Modules）
        constants.ts                # Section 4 固有定数（NAV_LINKS, MIGRATION_STRATEGIES）
        components/sections/        # 分割されたセクションコンポーネント
      section5/
        page.tsx                    # Section 5: セキュリティ＆コンプライアンス
        section5.module.css         # ページ固有スタイル（CSS Modules）
        constants.ts                # Section 5 固有定数
        components/sections/        # 分割されたセクションコンポーネント
      section6/
        page.tsx                    # Section 6: コスト管理・SRE・サステナビリティ
        components/                 # 分割されたセクションコンポーネント
    agwa/
      page.tsx                      # AGWA トップページ
      section1/
        page.tsx                    # Section 1: アカウント・ドメイン・ディレクトリ管理
        page.css                    # ページ固有スタイル
    professional-cloud-network-engineer/
      page.tsx                      # PCNE 試験対策ページ（概要・ドメイン別解説）
      components/                   # セクションコンポーネント（Section1-6 + Summary）
    professional-cloud-network-engineer-step-by-step/
      page.tsx                      # PCNE ステップバイステップ実践ガイド
      components/                   # セクションコンポーネント（Section1-6）

components/
  Header.tsx                        # ハンバーガー Drawer ナビ。toNavTree(EXAMS) の結果を描画するため直接編集不要
  Footer.tsx                        # シンプルなフッター（サイト名のみ）
  DisclaimerBanner.tsx              # 全画面固定バナー（免責事項）、layout.tsx から呼び出し

__tests__/                          # Vitest（jsdom環境）
e2e/                                # Playwright（Chromiumのみ）
Gcl_Archive/                        # 旧HTML資料（参照・移行元アーカイブ）
Aws/                                # AWS資料アーカイブ
```

## CSSデザイントークン（3層アーキテクチャ）

**Layer 1 – グローバルセマンティック** (`app/globals.css` の `@theme {}`):

- `--color-background`, `--color-foreground`, `--color-muted`, `--color-border` 等
- Tailwind v4 の `@theme` で定義するため `tailwind.config.js` は存在しない

**Layer 2 – 共有プリミティブ** (同 `@theme`):

- `--font-body`, `--font-mono`, `--radius-*`

**Layer 3 – ページ固有テーマ** (各ページの `.css`):

- Aurora（ACE）、Sapphire/Laboratory/Gold/Executive（Generative AI Leader 各セクション）
- テーマ変数は `--color-*` を上書きする形で定義

新しいテーマカラーを追加する場合は、ページ固有 `.css` を作成し、そのルートを所有する `page.tsx` または `layout.tsx` からインポートする。レイアウトスコープが不要な場合は `page.tsx` へのインポートを優先し、不要な `layout.tsx` の作成を避ける。

## テスト構成

- **Vitest:** `__tests__/**/*.test.{ts,tsx}`、jsdom環境、`@` エイリアスが `./` に解決される
- **Playwright:** `e2e/` 配下、Chromiumのみ、`baseURL: http://localhost:3000`、CIでは`bun run dev`を自動起動

## 制約事項

- **Netlify デプロイ**: `netlify.toml` + `@netlify/plugin-nextjs` で構成。`next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で切り替え（Docker: `standalone`、Netlify: 未設定）。
- **Docker dev コンテナの `.next` 権限**: `Dockerfile.dev` で `mkdir -p /app/.next` を `chown` より前に実行し、named volume (`dev_next_cache`) を `nextjs` ユーザー所有で初期化すること。ボリューム再作成が必要な場合は `docker volume rm infra_dev_next_cache`。
- **`DisclaimerBanner`**: `components/DisclaimerBanner.tsx` は `'use client'` の Client Component。ResizeObserver で `--disclaimer-height` CSS変数を動的同期し、`body { padding-top }` でコンテンツ隠れを防ぐ。免責事項テキストの変更はこのファイルのみ編集する。
- `litellm` / `dspy` の追加禁止（脆弱性懸念）
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持すること。Client コンポーネント内でサーバー専用 API（`fs`, `cookies`, `headers` など）を呼び出すことは明示的に禁止し、渡す Props は JSON シリアライズ可能なものに限定すること。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップすること。`.code-line` は `white-space: pre` を適用してインデントを保持し、`map` 展開時は安定した `key` を付与すること。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換すること。その際、必ず `<thead>` と `<th scope="col">` を用いたセマンティックな構造にすること。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-border` など）を厳格に使用すること。独自のローカル変数定義や `--color-bg-primary` のような実在しないトークンの使用は避ける。コンポーネントレベルの CSS 内で新たなカスタムプロパティ（`--*`）を定義することは禁止する。
- **レイアウトと最大幅の制約**: 各セクションのメインコンテンツは画面幅いっぱいに広がらないよう、CSS Modulesで `max-width` (例: 1000px または `.container` ラッパー) を設定し、中央寄せにすること。`SharedSection.module.css` のような共通スタイルでは `.section > *` セレクタ等を活用して内部の幅を制限し、背景や下線は画面全体に広がるようにする。
- **グローバルメニューの運用（データ駆動）**: ナビゲーションは `app/constants.ts` の `EXAMS` を正本としている。新ページ追加時は `EXAMS` に `Exam` エントリを追加し（`status: 'coming-soon'` → ページ完成後 `'available'` または省略）、`app/navigation.ts` の `toNavTree` が自動でグルーピングするため **`components/Header.tsx` は直接編集しない**。
- 新試験を追加する場合: ① `app/constants.ts` の `EXAMS` にエントリ追加 ② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加 ③ 試験ページ作成 — この 3 ファイルのみ変更すれば Header に自動反映される。
- ページ固有の共通定数は `constants.ts` に集約する（`app/gcl/genai-leader/constants.ts` 参照）
