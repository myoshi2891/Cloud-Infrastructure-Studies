# Project Overview: Cloud Infrastructure Studies

Updated 2026-08-11

このプロジェクトは、Google Cloud / AWS / Cisco のクラウド・ネットワーク資格試験対策（Associate Cloud Engineer, Generative AI Leader, Cloud Digital Leader, Associate Google Workspace Administrator, Professional Cloud Network Engineer, Cisco Certified Network Associate, Cisco Certified Network Associate Automation、AWS Certified Solutions Architect – Associate）を目的とした学習用 Next.js アプリケーションです。
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
- **Markdown lint 実行:** `bun run markdownlint -- path/to/file.md`
- **Docker 一括リビルド:** `bun run docker:rebuild`（コンテナ停止 → 本番イメージ作成 → 開発コンテナ再構築・起動）

## プロジェクト構造

- `/app`: Next.js App Router のページコンポーネント。
  - `/app/gcl/hands-on`: GCP ハンズオン実践ガイド群（`cloud-load-balancing-guide`, `develop-your-gcp-network`, `build-a-secure-google-cloud-network`, `set-up-an-app-dev-environment-on-google-cloud`, `gcp-security-fundamentals-guide`, `gke-private-cluster-security-guide`, `iap-tcp-forwarding-best-practices-guide`, `terraform-gcp-challenge-lab-guide`, `griffin-wordpress-gke-guide`）。
  - `/app/gcl/genai-leader`: Generative AI Leader 試験対策ページ（Section 1〜4、section1/2 はコンポーネント分割済み）。
  - `/app/gcl/cloud-digital-leader`: Cloud Digital Leader 試験対策ページ（Section 1〜6、各セクションはコンポーネント分割済み）。
  - `/app/gcl/agwa`: Associate Google Workspace Administrator 試験対策ページ（Section 1）。
  - `/app/gcl/professional-cloud-network-engineer`: PCNE 試験対策ページ（概要・ドメイン別解説）。
  - `/app/gcl/professional-cloud-network-engineer-step-by-step`: PCNE ステップバイステップ実践ガイド。
  - `/app/cisco/ccde/complete-guide`: Cisco CCDE 認定 完全ガイド。
  - `/app/cisco/ccna/beginner-guide`: Cisco CCNA試験 完全ガイド。
  - `/app/cisco/ccna/automation-software-development-design`: CCNA Automation ソフトウェア開発と設計 完全ガイド。
  - `/app/cisco/ccna/automation-api-guide`: CCNA Automation API 完全ガイド。
  - `/app/cisco/ccna/automation-application-deployment-security`: CCNA Automation アプリケーションの展開とセキュリティ 完全ガイド。
  - `/app/cisco/ccna/automation-cisco-platforms-and-development`: CCNA Automation Cisco Platforms and Development 徹底解説ガイド。
  - `/app/cisco/ccna/automation-infrastructure-and-automation`: CCNA Automation 5.0 Infrastructure and Automation ステップバイステップ解説ガイド。
  - `/app/cisco/ccna/automation-network-fundamentals`: CCNAAUTO 200-901 6.0 Network Fundamentals 完全ガイド。
  - `/app/cisco/ccna/network-access-guide`: CCNA 200-301 Network Access 徹底解説ガイド。
  - `/app/cisco/ccna/ip-connectivity-guide`: CCNA 200-301 IP Connectivity 完全ガイド。
  - `/app/cisco/ccna/ip-services-guide`: CCNA 200-301 IP Services 完全ガイド。
  - `/app/cisco/ccna/automation-programmability`: CCNA 200-301 6.0 自動化とプログラマビリティ 完全ガイド。
  - `/app/cisco/ccna/security-fundamentals`: CCNA 200-301 Security Fundamentals 完全ガイド。
  - `/app/cisco/ccna/network-fundamentals-guide`: CCNA 200-301 Network Fundamentals ネットワークの基礎 入門ガイド。
  - `/app/aws/solutions-architect-associate`: AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド（`domain1` を含む）。
- `/app/constants.ts`: 試験データ正本（EXAMS / STATS）。`provider: 'GCP' | 'AWS' | 'Cisco'` で分類され、`toNavTree` が自動グルーピング。
- `/app/navigation.ts`: `toNavTree(EXAMS)` adapter。Header.tsx が参照し、provider 別にナビを自動生成。`status: 'coming-soon'` の試験はナビに「準備中」として表示。
- AWS: `app/aws/` 配下（`solutions-architect-associate/page.tsx` 完全対策ガイド、`solutions-architect-associate/domain1/page.tsx` ドメイン1ガイド、`solutions-architect-associate/domain2/page.tsx` ドメイン2ガイド、`solutions-architect-associate/domain3/page.tsx` ドメイン3ガイド、`solutions-architect-associate/domain4/page.tsx` ドメイン4ガイド）
- Cisco: `app/cisco/` 配下（`ccna/beginner-guide/page.tsx` 完全ガイド、`ccna/automation-software-development-design/page.tsx`、`ccna/automation-application-deployment-security/page.tsx`、`ccna/automation-cisco-platforms-and-development/page.tsx`、`ccna/automation-infrastructure-and-automation/page.tsx`、`ccna/ip-connectivity-guide/page.tsx`、`ccna/ip-services-guide/page.tsx`、`ccna/automation-programmability/page.tsx` 含む）
- `/components`: 共通コンポーネント（Header: ハンバーガー Drawer ナビ、Footer、DisclaimerBanner など）。
- `/__tests__`: Vitest によるユニットテスト。`restore_diagrams.test.ts` はスキル配下から標準実行へ追加される。
- `/e2e`: Playwright による E2E テスト。
- `/archive`: 移行済みの旧式 HTML / Markdown 学習ガイド資料。Cisco 資料の正規保存先は `/archive/Cisco/html` および `/archive/Cisco/md` とし、`/Gcl_Archive/Cisco` は使用禁止。
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
- **Docker**: `Dockerfile`（本番 standalone）、`Dockerfile.dev`（開発 hot reload）。CSS キャッシュを含む一括再構築は `bun run docker:rebuild`、個別操作は `make dev` / `make prod` を使用。開発コンテナの `.next` ボリューム (`infra_dev_next_cache`) は `nextjs` ユーザー（UID 1001）所有で初期化される。

## 注意事項

- **`DisclaimerBanner`**: 全画面固定の免責事項バナー。`components/DisclaimerBanner.tsx` を編集すること。ResizeObserver で高さを `--disclaimer-height` に同期、`body { padding-top }` でコンテンツ隠れを防止。
- `litellm` や `dspy` は脆弱性の懸念があるため、プロジェクトへの追加は禁止されています。
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持してください。また、Client コンポーネント内でサーバー専用API (`fs`, `cookies`, `headers`) を参照することは禁止し、PropsはJSONシリアライズ可能なものに限定してください。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップしてください。`.code-line` は `white-space: pre` 等でインデントを保持し、`map` での展開時には安定した `key` を付与してください。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換してください。その際、必ず `<thead>` を含め、見出しセルには `<th scope="col">` を使用してください。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-card` など）を厳格に使用すること。コンポーネントの CSS 内で新しいカスタムプロパティ (`--*`) を定義することは禁止します（グローバルな `@theme` トークンのみを参照）。
- **サイドバーガイドのレイアウト契約**: サイドバーを持つガイド画面は、デスクトップでサイドバーを左端へ固定し幅を `280px` に統一してください。メイン領域は `margin-left: 280px`、`width: calc(100% - 280px)`、`max-width: none` で残り幅をすべて使用し、本文全体を再制限する `content-inner` 等の最大幅は設けません。レスポンシブ規則では `margin-left: 0`、`width: 100%` へ戻します。この契約は `__tests__/guide-content-widths.test.ts` で全24スタイルシートを検証します。
- **グローバルメニューの運用（データ駆動）**: ナビゲーションは `app/constants.ts` の `EXAMS` を正本とし、`app/navigation.ts` の `toNavTree()` が provider 別グループを自動生成するため **`components/Header.tsx` は直接編集しない**。新試験追加時は `EXAMS` にエントリを追加し（`status: 'coming-soon'` → 完成後に省略）、`app/globals.css` に `icon-theme-<id>` を追加すれば Drawer に自動反映される。
- ページコンポーネント（`page.tsx`）が巨大化するのを防ぐため、各セクションは必ず `components/sections/` に分割し、スタイリングには CSS Modules (`*.module.css`) を使用してください。セクション間で共通のスタイル（例: `SectionBase.module.css`）を利用する場合は、CSS 内での `@import` を避け、各 TSX ファイルから直接 `import baseStyles from './SectionBase.module.css'` のようにインポートして適用してください。
- ASCIIダイアグラムの使用を避け、専用の SVG コンポーネント (`DiagramSVG.tsx` 等) に置き換えてください。型の制約（Discriminated Union）により、アクセシビリティを担保するための `ariaLabel="説明文"` または `decorative={true}` の指定が必須となります。
- アクセシビリティ（`aria-label` 等の付与）を徹底し、コンポーネントやユーティリティ関数には Docstrings (JSDoc) を追加してください。
- **移行作業の同期とHTMLファイルアーカイブルール**: HTMLの移行作業時には必ず `.claude/rules/migration-progress-sync.md` に従い進捗を同期してください。また、**移行元ファイルは絶対に削除せず、移行完了後に `archive/` 配下の適切なディレクトリへ移動（アーカイブ）してください。Cisco 資料は `archive/Cisco/html/` と `archive/Cisco/md/` を使用し、`Gcl_Archive/Cisco` は作成・使用しないでください**。
- **Mermaid図解の幅・配置契約**: `Diagram` や `.mermaid-wrap` に個別の `maxWidth` インラインスタイル（`maxWidth: 800px` 等）を設定して幅を人工的に制限することは**絶対禁止**です。コンテンツ領域の全幅 (`width: 100%`) を活用し、`margin: 1.5rem auto 2rem` で親コンテナ内中央に配置してください。
- **ユーザー手動確認ゼロ原則（手動・目視確認依頼の全廃）**:
  - ユーザーに目視チェックやスクリーンショット撮影・確認作業を依頼することを**厳禁**とします。
  - テキスト全量一致の検証は `bun scripts/verify-html-migration.mjs` および `bun test` による全自動 DOM 照合で 100% 合格を判定してください。
  - レイアウト・スクロール被り・レスポンシブ崩れは `bun run test:e2e` (Playwright) で全自動検出・証明してください。
- **移行の忠実性とコンテンツ・デザインの網羅性 (絶対遵守・手抜き・独自改変厳禁)**: 移行元の HTML/Markdown に含まれる情報・デザインは、**一切の省略・要約・抜粋・文言短縮・独自の補足列追加・装飾削除を厳禁**とします。
  - **コンテンツの完全性**: 「詳細手順」「CSV フォーマット例」「全テーブルの列構成とセル文言」「注釈」「解説文章」「JSDoc」「補足スキル項目」「全出典リンク」「免責事項」などを100%そのまま全量移転すること。
  - **ビジュアルデザインの完全性**: 元HTMLの `:root` CSSカラー変数、`h1` グラデーションテキスト (`background-clip: text`)、`h2` 左アクセントバー (`border-left`)、`th` 白文字・背景色、`.badge` ピル型 (`border-radius: 999px`)、`.callout` アクセントバー、インラインコード装飾、コードブロック構文ハイライト (`.code-comment`, `.code-keyword` 等) を100%全量移植すること。
  - **事前コンテンツ目録の作成**: 移行開始前に元ファイルの「見出し数・表の行数/列構造/セル文言・Mermaid図数・出典リンク数・CSSスタイル要素」を抽出・把握すること。
  - **TDDでの網羅性テスト作成**: Step 1 (Red) の時点で大枠見出しだけでなく、表内の文言、補足スキル、デザイン要素（CSS定義、構文ハイライトスパン、中央寄せ等）が存在することを検証する厳密なテストを作成すること。
  - **全量照合セルフレビュー**: Step 2 (Green) 完了時、元ファイルと作成した TSX/CSS をセルフレビューし、文字数や行数・見た目の大幅な乖離・省略がないことを照合してからコミットすること。
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
