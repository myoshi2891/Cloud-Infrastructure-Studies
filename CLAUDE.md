# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GCP・AWS資格試験対策（Associate Cloud Engineer, Generative AI Leader）を目的としたNext.js学習アプリ。

## コマンド

```bash
# 開発
bun run dev          # Turbopack で開発サーバー起動（localhost:3000）
bun run build        # プロダクションビルド
bun run lint         # ESLint

# テスト
bun run test         # Vitest（ユニット・コンポーネント）
bun run test:watch   # Vitest ウォッチモード（単一ファイル: vitest run __tests__/foo.test.tsx）
bun run test:e2e     # Playwright E2E（dev server を自動起動）
```

初回E2Eテスト前: `bunx playwright install`

## アーキテクチャ

**ルーティング:** Next.js 16 App Router。全ページは `app/` 配下。

```text
app/
  layout.tsx                        # ルートレイアウト（Header/Footer、フォント定義）
  page.tsx                          # トップページ
  globals.css                       # グローバルスタイル（デザイントークン定義）
  gcl/
    associate-cloud-engineer/
      page.tsx                      # ACE 試験対策ページ
      ace.css                       # Aurora テーマ（ページ固有）
    genai-leader/
      page.tsx                      # Generative AI Leader トップ
      genai-leader.css              # Sapphire テーマ（ページ固有）
      constants.ts                  # 共通定数（作成日など）
      section{1-4}/page.tsx         # 各セクションページ
    cloud-digital-leader/
      section{1-2}/page.tsx         # CDL セクションページ
      section3/
        page.tsx                    # Section 3: AI によるイノベーション
        section3.css                # ページ固有スタイル
        constants.ts                # Section 3 固有定数
        components/sections/        # 分割されたセクションコンポーネント

components/
  Header.tsx                        # ナビゲーション（新ページ追加時はここも更新）
  Footer.tsx

__tests__/                          # Vitest（jsdom環境）
e2e/                                # Playwright（Chromiumのみ）
Gcl/                                # 旧HTML資料（参照・移行元）
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

新しいテーマカラーを追加する場合は、ページ固有 `.css` を作成し `app/gcl/xxx/layout.tsx` でインポートする。

## テスト構成

- **Vitest:** `__tests__/**/*.test.{ts,tsx}`、jsdom環境、`@` エイリアスが `./` に解決される
- **Playwright:** `e2e/` 配下、Chromiumのみ、`baseURL: http://localhost:3000`、CIでは`bun run dev`を自動起動

## 制約事項

- `litellm` / `dspy` の追加禁止（脆弱性懸念）
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持すること。Client コンポーネント内でサーバー専用 API（`fs`, `cookies`, `headers` など）を呼び出すことは明示的に禁止し、渡す Props は JSON シリアライズ可能なものに限定すること。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップすること。`.code-line` は `white-space: pre` を適用してインデントを保持し、`map` 展開時は安定した `key` を付与すること。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換すること。その際、必ず `<thead>` と `<th scope="col">` を用いたセマンティックな構造にすること。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-bg-primary` など）を厳格に使用すること。独自のローカル変数定義は避ける。コンポーネントレベルの CSS 内で新たなカスタムプロパティ（`--*`）を定義することは禁止する。
- 新ページを `app/gcl/` に追加した場合、`components/Header.tsx` のナビゲーションも更新すること
- ページ固有の共通定数は `constants.ts` に集約する（`app/gcl/genai-leader/constants.ts` 参照）
