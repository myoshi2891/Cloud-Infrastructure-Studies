# Project Overview: Cloud Infrastructure Studies

このプロジェクトは、Google Cloud / AWS / Cisco のクラウド・ネットワーク資格試験対策（Associate Cloud Engineer, Generative AI Leader, Cloud Digital Leader, Associate Google Workspace Administrator, Professional Cloud Network Engineer, Cisco Certified Network Associate、AWS Certified Solutions Architect – Associate ※準備中）を目的とした学習用 Next.js アプリケーションです。
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
- **E2E テスト実行:** `bunx playwright install`（初回のみ）、その後 `bun run test:e2e` (Playwright `chromium` project)
- **Performance テスト実行:** `bun run test:perf` (Playwright `perf` project: LCP / CLS / TBT を [e2e/perf-budgets.json](e2e/perf-budgets.json) と比較)
- **Security テスト実行:** `bun run test:security` (`bun audit --json` を [scripts/security-audit.mjs](scripts/security-audit.mjs) が集計し、high/critical 検出で exit 1)
- **Performance 手動レポート:** `bun run build && bun run perf:report` (`@lhci/cli` autorun → `.lighthouseci/` に HTML/JSON 出力)
- **Lint 実行:** `bun run lint`

## プロジェクト構造

- `/app`: Next.js App Router のページコンポーネント。
  - /app/gcl/associate-cloud-engineer: ACE 試験対策ページ（domain1〜4、section1〜4、architecture-guide、complete-advanced-guide、hands-on/ 配下に cloud-load-balancing-guide, develop-your-gcp-network, build-a-secure-google-cloud-network, set-up-an-app-dev-environment-on-google-cloud を含む）。
  - `/app/gcl/genai-leader`: Generative AI Leader 試験対策ページ（Section 1〜4、section1/2 はコンポーネント分割済み）。
  - `/app/gcl/cloud-digital-leader`: Cloud Digital Leader 試験対策ページ（Section 1〜6、各セクションはコンポーネント分割済み）。
  - `/app/gcl/agwa`: Associate Google Workspace Administrator 試験対策ページ（Section 1）。
  - `/app/gcl/professional-cloud-network-engineer`: PCNE 試験対策ページ（概要・ドメイン別解説）。
  - `/app/gcl/professional-cloud-network-engineer-step-by-step`: PCNE ステップバイステップ実践ガイド。
  - `/app/cisco/ccna/beginner-guide`: Cisco CCNA試験 完全ガイド。
  - `/app/cisco/ccna/automation-software-development-design`: CCNA Automation ソフトウェア開発と設計 完全ガイド。
  - `/app/cisco/ccna/ip-connectivity-guide`: CCNA 200-301 IP Connectivity 完全ガイド。
  - `/app/cisco/ccna/ip-services-guide`: CCNA 200-301 IP Services 完全ガイド。
- `/app/constants.ts`: 試験データ正本（EXAMS / STATS）。`provider: 'GCP' | 'AWS' | 'Cisco'` で分類され、`toNavTree` が自動グルーピング。
- `/app/navigation.ts`: `toNavTree(EXAMS)` adapter。Header.tsx が参照し、provider 別にナビを自動生成。`status: 'coming-soon'` の試験はナビに「準備中」として表示。
- AWS: `app/aws/` 配下（`solutions-architect-associate/page.tsx` ※実装準備中、constants の `status` を変更するだけで Drawer に自動反映）
- Cisco: `app/cisco/` 配下（`ccna/beginner-guide/page.tsx` 完全ガイド、`automation-software-development-design/page.tsx`、`ip-connectivity-guide/page.tsx`、`ip-services-guide/page.tsx` 含む）
- `/app/constants.ts`: 試験データ正本（EXAMS / STATS）。新試験はここに追加する。
- `/app/navigation.ts`: `toNavTree(EXAMS)` adapter。Header.tsx が参照し、provider 別にナビを自動生成。
- `/components`: 共通コンポーネント（Header: ハンバーガー Drawer ナビ、Footer、DisclaimerBanner など）。
- `/__tests__`: Vitest によるユニットテスト。
- `/e2e`: Playwright による E2E テスト。
- `/Gcl_Archive`: 旧式の HTML ベースの学習ガイド資料（移行完了後アーカイブ済み）。
- `/Aws`: AWS 関連の古い資料（アーカイブ済み）。

## 開発コンベンション

- **テスト駆動（絶対厳守）:** 実装の際は必ず `.claude/rules/tdd-commit-workflow.md` のルールに従い、以下の3ステップを厳格に繰り返すこと。各ステップ完了後に**即コミット（繰り越し禁止）**。
  1. **Step 1 — Fail:** テストコードを先に作成し、失敗（Fail）することを確認してコミット (`test: add failing tests for ...`)
  2. **Step 2 — Pass:** テストをPassさせる最小限の実装を行いコミット (`feat/fix: implement ... to pass tests`)
  3. **Step 3 — Refactor:** コード整理・ルーティング統合・ビルド確認後にコミット (`refactor/docs: integrate ... into routing and update docs`)
- **UI デザイン:** 各セクションごとに固有のテーマカラー（Aurora, Sapphire, Laboratory, Gold）が設定されています。
- **スタイリング:** CSS 変数は `app/globals.css` で定義された 3層トークンアーキテクチャに従ってください。
- **保守性:** 共通の定数（作成日など）は `app/gcl/genai-leader/constants.ts` に集約されています。

## デプロイ

- **Netlify**: `netlify.toml` + `@netlify/plugin-nextjs` で構成。`next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で制御（Docker ビルド時: `standalone`、Netlify ビルド時: 未設定）。
- **Docker**: `Dockerfile`（本番 standalone）、`Dockerfile.dev`（開発 hot reload）。`make dev` / `make prod` で起動。開発コンテナの `.next` ボリューム (`infra_dev_next_cache`) は `nextjs` ユーザー（UID 1001）所有で初期化される。

## 注意事項

- **`DisclaimerBanner`**: 全画面固定の免責事項バナー。`components/DisclaimerBanner.tsx` を編集すること。ResizeObserver で高さを `--disclaimer-height` に同期、`body { padding-top }` でコンテンツ隠れを防止。
- `litellm` や `dspy` は脆弱性の懸念があるため、プロジェクトへの追加は禁止されています。
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持してください。また、Client コンポーネント内でサーバー専用API (`fs`, `cookies`, `headers`) を参照することは禁止し、PropsはJSONシリアライズ可能なものに限定してください。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップしてください。`.code-line` は `white-space: pre` 等でインデントを保持し、`map` での展開時には安定した `key` を付与してください。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換してください。その際、必ず `<thead>` を含め、見出しセルには `<th scope="col">` を使用してください。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-card` など）を厳格に使用すること。コンポーネントの CSS 内で新しいカスタムプロパティ (`--*`) を定義することは禁止します（グローバルな `@theme` トークンのみを参照）。
- **レイアウトと最大幅の制約**: 各セクションのメインコンテンツは画面幅いっぱいに広がらないよう、CSS Modulesで `max-width` (例: 1000px または `.container` ラッパー) を設定し、中央寄せにしてください。`SharedSection.module.css` のような共通スタイルでは `.section > :not(.divider)` セレクタ等を活用して内部の幅を制限し、背景や区切り線（`.divider`）は画面全体に広がるようにします。
- **グローバルメニューの運用（データ駆動）**: ナビゲーションは `app/constants.ts` の `EXAMS` を正本とし、`app/navigation.ts` の `toNavTree()` が provider 別グループを自動生成するため **`components/Header.tsx` は直接編集しない**。新試験追加時は `EXAMS` にエントリを追加し（`status: 'coming-soon'` → 完成後に省略）、`app/globals.css` に `icon-theme-<id>` を追加すれば Drawer に自動反映される。
- ページコンポーネント（`page.tsx`）が巨大化するのを防ぐため、各セクションは必ず `components/sections/` に分割し、スタイリングには CSS Modules (`*.module.css`) を使用してください。セクション間で共通のスタイル（例: `SectionBase.module.css`）を利用する場合は、CSS 内での `@import` を避け、各 TSX ファイルから直接 `import baseStyles from './SectionBase.module.css'` のようにインポートして適用してください。
- ASCIIダイアグラムの使用を避け、専用の SVG コンポーネント (`DiagramSVG.tsx` 等) に置き換えてください。型の制約（Discriminated Union）により、アクセシビリティを担保するための `ariaLabel="説明文"` または `decorative={true}` の指定が必須となります。
- アクセシビリティ（`aria-label` 等の付与）を徹底し、コンポーネントやユーティリティ関数には Docstrings (JSDoc) を追加してください。
- **移行作業の同期とHTMLファイルアーカイブルール**: HTMLの移行作業時には必ず `.claude/rules/migration-progress-sync.md` に従い進捗を同期してください。また、**移行元の HTML ファイルは絶対に削除せず、移行完了後に `Gcl_Archive/` 配下の適切なディレクトリへ移動（アーカイブ）してください**。
- **移行の忠実性とコンテンツの網羅性**: 移行元の HTML/Markdown に含まれる情報は、**一切の省略・要約を禁止**します。特に「詳細手順」「CSV フォーマット例」「複雑な表」「注釈」などは学習資料として極めて重要であるため、必ず全て TSX コンポーネントへ移植してください。また、SVG についてもオリジナルの詳細（チップ表示やステータス等）を維持したリッチな版を移行し、簡略化したプレースホルダーへの置き換えは避けてください。
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
