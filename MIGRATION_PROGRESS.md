# Migration Progress

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。

## 現在地

- **ブランチ:** dev
- **進行中タスク:** (なし)
- **次の作業:** (なし)
- **最終更新日時(UTC):** 2026-08-01T03:15:00.000Z

## 2026-08-01: GCP「GKE プライベートクラスタ セキュリティ実装ガイド」移行 (完了)

### 目的

`Gke-private-cluster-security-guide.html`（静的HTML・1420行・4個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client GkePrivateClusterSecurityGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/gke-private-cluster-security-guide` ルートへ完全移行する。文章・表・4個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(gcl-hands-on): add failing tests for GKE private cluster security guide page` (`__tests__/gcl/hands-on/gke-private-cluster-security-guide/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(gcl-hands-on): implement GKE private cluster security guide page to pass tests` (`page.tsx`, `GkePrivateClusterSecurityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(gcl-hands-on): integrate GKE private cluster security guide into routing and update docs` (`app/constants.ts` EXAMSへの統合、`GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive GKE private cluster security guide html and md files` (`MIGRATION_PROGRESS.md` の更新、元HTML `Gke-private-cluster-security-guide.html` を `archive/Gcl_Archive/Hands-on/html/` へ、MD を `archive/Gcl_Archive/Hands-on/md/` へアーカイブ移動)
- [x] **Step 5 (Full-width Layout, Syntax Highlighting & 1rem Diagram Scaling)**: `feat(gcl-hands-on): expand main layout width, add syntax highlighting, and protect 1rem diagram text size` (`main` メインコンテンツ横幅全幅化、コードブロックへの `code-cmd` / `code-param` 等の構文カラーハイライト適用、図解文字サイズ 1rem 保護とレスポンシブ表示の適用)

### 関連ファイル

- [app/gcl/hands-on/gke-private-cluster-security-guide/page.tsx](app/gcl/hands-on/gke-private-cluster-security-guide/page.tsx)
- [app/gcl/hands-on/gke-private-cluster-security-guide/GkePrivateClusterSecurityGuide.tsx](app/gcl/hands-on/gke-private-cluster-security-guide/GkePrivateClusterSecurityGuide.tsx)
- [app/gcl/hands-on/gke-private-cluster-security-guide/NavBar.tsx](app/gcl/hands-on/gke-private-cluster-security-guide/NavBar.tsx)
- [app/gcl/hands-on/gke-private-cluster-security-guide/constants.ts](app/gcl/hands-on/gke-private-cluster-security-guide/constants.ts)
- [app/gcl/hands-on/gke-private-cluster-security-guide/page.css](app/gcl/hands-on/gke-private-cluster-security-guide/page.css)
- [__tests__/gcl/hands-on/gke-private-cluster-security-guide/page.test.tsx](__tests__/gcl/hands-on/gke-private-cluster-security-guide/page.test.tsx)
- [archive/Gcl_Archive/Hands-on/html/Gke-private-cluster-security-guide.html](archive/Gcl_Archive/Hands-on/html/Gke-private-cluster-security-guide.html)
- [archive/Gcl_Archive/Hands-on/md/Gke-private-cluster-security-guide.md](archive/Gcl_Archive/Hands-on/md/Gke-private-cluster-security-guide.md)

## 2026-07-28: AWS「AWS SAA-C03 ドメイン3: 高性能なアーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain3.html`（静的HTML・3470行・27個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain3Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain3` ルートへ完全移行する。文章・表・27個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA Domain 3 guide page` (`__tests__/aws/solutions-architect-associate/domain3/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA Domain 3 guide page` (`page.tsx`, `Domain3Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 3 into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 3 HTML and MD files` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain3.html` を `archive/Aws/SAA/html/` へ、MD を `archive/Aws/SAA/md/` へアーカイブ移動)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain3/page.tsx](app/aws/solutions-architect-associate/domain3/page.tsx)
- [app/aws/solutions-architect-associate/domain3/Domain3Guide.tsx](app/aws/solutions-architect-associate/domain3/Domain3Guide.tsx)
- [app/aws/solutions-architect-associate/domain3/NavBar.tsx](app/aws/solutions-architect-associate/domain3/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain3/constants.ts](app/aws/solutions-architect-associate/domain3/constants.ts)
- [app/aws/solutions-architect-associate/domain3/page.css](app/aws/solutions-architect-associate/domain3/page.css)
- [__tests__/aws/solutions-architect-associate/domain3/page.test.tsx](__tests__/aws/solutions-architect-associate/domain3/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain3.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain3.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain3.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain3.md)

## 2026-07-28: AWS「AWS SAA-C03 ドメイン2: 回復力のあるアーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain2.html`（静的HTML・3000行・25個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain2Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain2` ルートへ完全移行する。文章・表・25個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA Domain 2 guide page` (`__tests__/aws/solutions-architect-associate/domain2/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA Domain 2 guide page` (`page.tsx`, `Domain2Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 2 into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 2 HTML and MD files` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain2.html` を `archive/Aws/SAA/html/` へ、MD を `archive/Aws/SAA/md/` へアーカイブ移動)
- [x] **Step 5 (Pie Chart Refinement & Mermaid Syntax Fixes)**: `fix(aws-saa): refine pie chart palette and resolve mermaid syntax errors in domain 2` (円グラフ `m1` の `init` テーマ適用による配色最適化、`m16` の全角波ダッシュ `〜` 除外、`m5` シーケンス図のスラッシュ除去、`m3`/`m4`/`m17`/`m18`/`m20`/`m22` のエッジ記述クォート保護、`m23` の `&` ノード結合展開による `Syntax error in text` 解消)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain2/page.tsx](app/aws/solutions-architect-associate/domain2/page.tsx)
- [app/aws/solutions-architect-associate/domain2/Domain2Guide.tsx](app/aws/solutions-architect-associate/domain2/Domain2Guide.tsx)
- [app/aws/solutions-architect-associate/domain2/NavBar.tsx](app/aws/solutions-architect-associate/domain2/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain2/constants.ts](app/aws/solutions-architect-associate/domain2/constants.ts)
- [app/aws/solutions-architect-associate/domain2/page.css](app/aws/solutions-architect-associate/domain2/page.css)
- [__tests__/aws/solutions-architect-associate/domain2/page.test.tsx](__tests__/aws/solutions-architect-associate/domain2/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain2.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain2.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain2.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain2.md)

## 2026-07-28: AWS「AWS SAA-C03 ドメイン1: セキュアなアーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain1.html`（静的HTML・2680行・14個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain1Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain1` ルートへ完全移行する。文章・表・14個のMermaid図・補足説明の一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA Domain 1 guide page` (`__tests__/aws/solutions-architect-associate/domain1/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA Domain 1 guide page` (`page.tsx`, `Domain1Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 1 into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 1 HTML` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain1.html` を `archive/Aws/SAA/html/` へ、MD を `archive/Aws/SAA/md/` へアーカイブ移動)
- [x] **Step 5 (Full-width Layout & 1rem Text Scale & Pie Chart Styling)**: `feat(aws-saa): expand layout to full width, ensure 1rem diagram text scaling, and refine pie chart styling` (`main-content` の全幅 100% 化、`.diagram-container` のスクロールコンテナ化・1rem文字サイズ保護、円グラフ `d01` のダークテーマ配色最適化)
- [x] **Step 6 (Code Block Indentation & Syntax Highlighting)**: `feat(aws-saa): implement code block syntax highlighting and indentation` (JSON コードブロックのインデント構造化、`code-key`, `code-string`, `code-boolean`, `code-punctuation` による構文カラーハイライト装飾)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain1/page.tsx](app/aws/solutions-architect-associate/domain1/page.tsx)
- [app/aws/solutions-architect-associate/domain1/Domain1Guide.tsx](app/aws/solutions-architect-associate/domain1/Domain1Guide.tsx)
- [app/aws/solutions-architect-associate/domain1/NavBar.tsx](app/aws/solutions-architect-associate/domain1/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain1/constants.ts](app/aws/solutions-architect-associate/domain1/constants.ts)
- [app/aws/solutions-architect-associate/domain1/page.css](app/aws/solutions-architect-associate/domain1/page.css)
- [__tests__/aws/solutions-architect-associate/domain1/page.test.tsx](__tests__/aws/solutions-architect-associate/domain1/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain1.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain1.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain1.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain1.md)


## 2026-07-28: AWS「AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate.html`（静的HTML・3485行・21個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client SaaGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate` ルートへ完全移行する。文章・表・21個のMermaid図・補足説明の一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA guide page` (`__tests__/aws/solutions-architect-associate/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA guide page components to pass tests` (`page.tsx`, `SaaGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor/docs(aws-saa): integrate AWS SAA page into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Archive)**: `chore(aws-saa): archive AWS SAA source html and md files` (`AWS-Certified-Solutions-Architect-Associate.html` を `archive/Aws/SAA/html/` へ、`AWS-Certified-Solutions-Architect-Associate.md` を `archive/Aws/SAA/md/` へアーカイブ移動)

### 関連ファイル

- [app/aws/solutions-architect-associate/page.tsx](app/aws/solutions-architect-associate/page.tsx)
- [app/aws/solutions-architect-associate/SaaGuide.tsx](app/aws/solutions-architect-associate/SaaGuide.tsx)
- [app/aws/solutions-architect-associate/NavBar.tsx](app/aws/solutions-architect-associate/NavBar.tsx)
- [app/aws/solutions-architect-associate/constants.ts](app/aws/solutions-architect-associate/constants.ts)
- [app/aws/solutions-architect-associate/page.css](app/aws/solutions-architect-associate/page.css)
- [__tests__/aws/solutions-architect-associate/page.test.tsx](__tests__/aws/solutions-architect-associate/page.test.tsx)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-28: ACE / Hands-on「Google Cloud セキュリティ基礎 完全ガイド」移行 (完了)

### 目的

`Gcp-security-fundamentals-guide.html`（静的HTML・2368行・16個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client GcpSecurityFundamentalsGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/gcp-security-fundamentals-guide` ルートへ完全移行する。文章・表・16個のMermaid図・コードブロック・注意書きの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace): add failing tests for gcp security fundamentals guide page` (`__tests__/gcl/hands-on/gcp-security-fundamentals-guide/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement gcp security fundamentals guide page skeleton to pass tests` (`page.tsx`, `GcpSecurityFundamentalsGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 最小構成実装とテスト通過)
- [x] **Step 3 (Refactor / Content Migration & CSS Mapping)**: `feat(ace): migrate all content, css mapping, and mermaid diagrams for gcp security fundamentals guide` (全8章・演習・表・Mermaid 16図の完全移植、コードブロック `.code-line` 構造化、scoped CSS 整合)
- [x] **Step 4 (Refactor / Integration & Nav)**: `refactor(ace): integrate gcp security fundamentals guide into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source html` (`MIGRATION_PROGRESS.md` の更新、元HTML `Gcp-security-fundamentals-guide.html` を `archive/Gcl_Archive/Hands-on/html/` へ退避)
- [x] **Step 6 (1rem Text Scale & Full Width Expansion)**: `feat(ace): expand layout to full width and ensure 1rem text scale for diagrams in gcp security guide` (画面幅100%全幅拡張、.diagram-wrap スクロールと自然 px 倍率適用により 16図の 1rem 自然文字サイズ表示を保証)

### 関連ファイル

- [app/gcl/hands-on/gcp-security-fundamentals-guide/page.tsx](app/gcl/hands-on/gcp-security-fundamentals-guide/page.tsx)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/GcpSecurityFundamentalsGuide.tsx](app/gcl/hands-on/gcp-security-fundamentals-guide/GcpSecurityFundamentalsGuide.tsx)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/NavBar.tsx](app/gcl/hands-on/gcp-security-fundamentals-guide/NavBar.tsx)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/constants.ts](app/gcl/hands-on/gcp-security-fundamentals-guide/constants.ts)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/page.css](app/gcl/hands-on/gcp-security-fundamentals-guide/page.css)
- [__tests__/gcl/hands-on/gcp-security-fundamentals-guide/page.test.tsx](__tests__/gcl/hands-on/gcp-security-fundamentals-guide/page.test.tsx)
- [archive/Gcl_Archive/Hands-on/html/Gcp-security-fundamentals-guide.html](archive/Gcl_Archive/Hands-on/html/Gcp-security-fundamentals-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-28: ACE「Google Cloud アプリ開発環境構築 完全ガイド」移行 (完了)

### 目的

`Gcp-app-dev-environment-complete-guide.html`（静的HTML・2246行）を、正準の設計パターン（NavBar + page.tsx + SetUpAnAppDevEnvironmentGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud` ルートへ完全移行する。文章・表・14個のMermaid図・コードブロック・注意書きの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for GCP app dev environment complete guide` (`__tests__/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx` テスト更新)
- [x] **Step 2 (Green)**: `feat: implement GCP app dev environment complete guide component` (`page.tsx`, `SetUpAnAppDevEnvironmentGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全10章・表・Mermaid 14図の完全移行)
- [x] **Step 3 (Refactor / Integration)**: `refactor: integrate GCP app dev environment guide into routing and update docs` (`app/constants.ts` EXAMSラベル調整、`CLAUDE.md` / `GEMINI.md` ドキュメント更新)
- [x] **Step 4 (Fix & Move)**: `fix: resolve className console error and move page to hands-on route` (`class=` を `className=` に精査・修正、`hands-on` ルートへ配置変更)
- [x] **Step 5 (ESLint / SonarQube Error Fix)**: `fix: wrap JSX comment text nodes in template literals to resolve react/jsx-no-comment-textnodes and S6438 errors` (883, 888, 889, 891, 892行目の `//` テキストノードを `{`// ...`}` に全件置換しエラー全件解消)
- [x] **Step 6 (Hamburger Menu Navigation Update)**: `feat: update hamburger menu item label to Hands-on in EXAMS constant` (`app/constants.ts` の GCP ハンズオンエントリ表示名を「Hands-on」へ変更、ドメイン一覧の追加、`globals.css` のスタイル定義更新)
- [x] **Step 7 (Mermaid 1rem Text Scale Fix)**: `fix: adjust Mermaid diagram layout and styles to ensure 1rem text size` (`page.css` の `max-width: 100% !important` 強制縮小を解除、`.diagram-wrap` に `overflow-x: auto` を適用し、`preserveNaturalScale={true}` による 1rem 自然倍率文字表示を保証)
- [x] **Step 8 (Consolidate All Hands-on Routes & Navigation)**: `refactor: consolidate hands-on guides into Hands-on navigation group` (`cloud-load-balancing-guide`, `develop-your-gcp-network`, `build-a-secure-google-cloud-network` を `hands-on/` 配下へ移動し、`app/constants.ts` の ACE グループから重複リンクを削除して `Hands-on` グループへ全5ガイドを完了集約)
- [x] **Step 9 (Custom Overview Label Navigation Update)**: `feat: add custom overviewLabel support and set Hands-on overview item to IAP TCP Forwarding` (`app/navigation.ts` の `toNavTree` に `overviewLabel` オプションを追加し、`Hands-on` アコーディオンの先頭リンク名を「概要」から「IAP（Identity-Aware Proxy）TCP フォワーディング」へ変更)
- [x] **Step 10 (Develop Your GCP Network 1rem Text Scale Fix)**: `fix: adjust Mermaid diagram layout and styles to ensure 1rem text size in develop-your-gcp-network` (`DevelopYourGcpNetworkGuide.tsx` に `preserveNaturalScale={true}` を明示し、`page.css` のスクロールとスタイルを調整して 14個の全Mermaid図の1rem自然文字倍率表示を保証)
- [x] **Step 11 (Full Width Main Content Layout Expansion)**: `feat: expand main content layout to full width in develop-your-gcp-network` (`page.css` の `.shell` コンテナの `max-width` 制限を解除・100%へ拡張し、メインコンテンツを画面横幅いっぱいに拡大表示)

### 関連ファイル

- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.tsx](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.tsx)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/constants.ts](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/constants.ts)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.css](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.css)
- [__tests__/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx](__tests__/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx)
- [archive/Gcl_Archive/Associate-Cloud-Engineer/html/Gcp-app-dev-environment-complete-guide.html](archive/Gcl_Archive/Associate-Cloud-Engineer/html/Gcp-app-dev-environment-complete-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA Automation APIの理解と活用 完全ガイド」移行 (完了)

### 目的

`Ccna-automation-api-guide.html`（静的HTML）および `Ccna-automation-api-guide.md` を、正準の設計パターン（NavBar + page.tsx + CcnaAutomationApiGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/automation-api-guide` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「2.0 APIの理解と活用」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for ccna automation api guide` (`__tests__/cisco/ccna/automation-api-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat: implement ccna automation api guide to pass tests` (`page.tsx`, `CcnaAutomationApiGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全16セクション・テーブル・Mermaid 9図の完璧な移行、`app/constants.ts` へのドメイン追加)
- [x] **Step 3 (Refactor / Archive & Docs Sync)**: `docs: archive html and md files for ccna automation api guide and update migration progress` (`Ccna-automation-api-guide.html` および `Ccna-automation-api-guide.md` の `archive/Cisco/` への移動、`MIGRATION_PROGRESS.md` の更新)

### 関連ファイル

- [app/cisco/ccna/automation-api-guide/page.tsx](app/cisco/ccna/automation-api-guide/page.tsx)
- [app/cisco/ccna/automation-api-guide/CcnaAutomationApiGuide.tsx](app/cisco/ccna/automation-api-guide/CcnaAutomationApiGuide.tsx)
- [app/cisco/ccna/automation-api-guide/NavBar.tsx](app/cisco/ccna/automation-api-guide/NavBar.tsx)
- [app/cisco/ccna/automation-api-guide/constants.ts](app/cisco/ccna/automation-api-guide/constants.ts)
- [app/cisco/ccna/automation-api-guide/page.css](app/cisco/ccna/automation-api-guide/page.css)
- [__tests__/cisco/ccna/automation-api-guide/page.test.tsx](__tests__/cisco/ccna/automation-api-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [archive/Cisco/html/Ccna-automation-api-guide.html](archive/Cisco/html/Ccna-automation-api-guide.html)
- [archive/Cisco/md/Ccna-automation-api-guide.md](archive/Cisco/md/Ccna-automation-api-guide.md)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA 200-301 IP Services 完全ガイド」移行 (完了)

### 目的

`Ccna-ip-services-guide.html`（静的HTML・1680行）を、正準の設計パターン（NavBar + page.tsx + CcnaIpServicesGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/ip-services-guide` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「4.0 IP Services（IP サービス）」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for ccna ip services guide page` (`__tests__/cisco/ccna/ip-services-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat(ccna): migrate all content, css, and diagrams for ccna ip services guide` (`page.tsx`, `CcnaIpServicesGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全12セクション・テーブル・Mermaid 12図の完璧な移行)
- [x] **Step 3 (Refactor / Integration & Archive & Docs Sync)**: `refactor(ccna): integrate ccna ip services guide into routing and update docs` (`app/constants.ts` へのドメイン追加、`Ccna-ip-services-guide.html` の `Gcl_Archive/Cisco/` への退避、`CLAUDE.md` / `GEMINI.md` / `MIGRATION_PROGRESS.md` の更新)

### 関連ファイル

- [app/cisco/ccna/ip-services-guide/page.tsx](app/cisco/ccna/ip-services-guide/page.tsx)
- [app/cisco/ccna/ip-services-guide/CcnaIpServicesGuide.tsx](app/cisco/ccna/ip-services-guide/CcnaIpServicesGuide.tsx)
- [app/cisco/ccna/ip-services-guide/NavBar.tsx](app/cisco/ccna/ip-services-guide/NavBar.tsx)
- [app/cisco/ccna/ip-services-guide/constants.ts](app/cisco/ccna/ip-services-guide/constants.ts)
- [app/cisco/ccna/ip-services-guide/page.css](app/cisco/ccna/ip-services-guide/page.css)
- [__tests__/cisco/ccna/ip-services-guide/page.test.tsx](__tests__/cisco/ccna/ip-services-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [Gcl_Archive/Cisco/Ccna-ip-services-guide.html](Gcl_Archive/Cisco/Ccna-ip-services-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

## 2026-07-23: Cisco「CCNA 200-301 IP Connectivity（IP接続性）編」移行 (完了)

### 目的

`Ccna-ip-connectivity-guide.html`（静的HTML・1180行）を、正準の設計パターン（NavBar + page.tsx + CcnaIpConnectivityGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/ip-connectivity-guide` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「3.0 IP Connectivity（IP接続性）」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for ccna ip connectivity guide page` (`__tests__/cisco/ccna/ip-connectivity-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat(ccna): migrate all content, css, and diagrams for ccna ip connectivity guide` (`page.tsx`, `CcnaIpConnectivityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全6章＋まとめ＋参考ソース、テーブル、Mermaid 7図の完璧な移行)
- [x] **Step 3 (Refactor / Integration & Archive & Docs Sync)**: `refactor(ccna): integrate ccna ip connectivity guide into routing and sync docs` (`app/constants.ts` へのドメイン追加、`Ccna-ip-connectivity-guide.html` / `.md` の `archive/Cisco/html/` への退避、`MIGRATION_PROGRESS.md` の更新)
- [x] **Step 4 (Layout Expansion & Syntax Highlighting)**: `feat(ccna): update layout to full width and add vibrant syntax highlighting to code blocks` (レイアウトを画面いっぱいの全幅表示へ拡張、コードブロックを `.code-line` 構造化し、コメント・プロンプト・コマンド・数値等の視認性の高いシンタックスハイライトを追加)
- [x] **Step 5 (Mermaid Diagram Sizing Fix)**: `feat(mermaid): optimize diagram sizing for small and extra tall diagrams` (図解の豆粒化と過大縦伸張を解消するため、`applySvgFixups` で小型図の適正拡大・縦長図の最大高さ上限および垂直スクロール制御を導入)

### 関連ファイル

- [app/cisco/ccna/ip-connectivity-guide/page.tsx](app/cisco/ccna/ip-connectivity-guide/page.tsx)
- [app/cisco/ccna/ip-connectivity-guide/CcnaIpConnectivityGuide.tsx](app/cisco/ccna/ip-connectivity-guide/CcnaIpConnectivityGuide.tsx)
- [app/cisco/ccna/ip-connectivity-guide/NavBar.tsx](app/cisco/ccna/ip-connectivity-guide/NavBar.tsx)
- [app/cisco/ccna/ip-connectivity-guide/constants.ts](app/cisco/ccna/ip-connectivity-guide/constants.ts)
- [app/cisco/ccna/ip-connectivity-guide/page.css](app/cisco/ccna/ip-connectivity-guide/page.css)
- [__tests__/cisco/ccna/ip-connectivity-guide/page.test.tsx](__tests__/cisco/ccna/ip-connectivity-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [archive/Cisco/html/Ccna-ip-connectivity-guide.html](archive/Cisco/html/Ccna-ip-connectivity-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA Automation ソフトウェア開発と設計 完全ガイド」移行 (完了)

### 目的

`Ccna-automation-software-development-design.html`（静的HTML・1932行）を、正準の設計パターン（NavBar + page.tsx + CcnaSoftwareDevDesignGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/automation-software-development-design` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「1.0 ソフトウェア開発と設計」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add tests for ccna automation software development design page` (`__tests__/cisco/ccna/automation-software-development-design/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat(ccna): implement ccna automation software development design page` (`page.tsx`, `CcnaSoftwareDevDesignGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全13セクション・テーブル・Mermaid 12図の完璧な移行)
- [x] **Step 3 (Refactor / Integration & Archive)**: `refactor(ccna): integrate ccna automation software development design page into routing and sync docs` (`app/constants.ts` へのドメイン追加、`Ccna-automation-software-development-design.html` の `Gcl_Archive/Cisco/` への退避、`CLAUDE.md` / `GEMINI.md` / `MIGRATION_PROGRESS.md` の更新)

### 関連ファイル

- [app/cisco/ccna/automation-software-development-design/page.tsx](app/cisco/ccna/automation-software-development-design/page.tsx)
- [app/cisco/ccna/automation-software-development-design/CcnaSoftwareDevDesignGuide.tsx](app/cisco/ccna/automation-software-development-design/CcnaSoftwareDevDesignGuide.tsx)
- [app/cisco/ccna/automation-software-development-design/NavBar.tsx](app/cisco/ccna/automation-software-development-design/NavBar.tsx)
- [app/cisco/ccna/automation-software-development-design/constants.ts](app/cisco/ccna/automation-software-development-design/constants.ts)
- [app/cisco/ccna/automation-software-development-design/page.css](app/cisco/ccna/automation-software-development-design/page.css)
- [__tests__/cisco/ccna/automation-software-development-design/page.test.tsx](__tests__/cisco/ccna/automation-software-development-design/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA試験 完全ガイド」移行 (完了)

### 目的

`Ccna-beginner-guide.html`（静的HTML・1572行）を、正準の設計パターン（NavBar + page.tsx + CcnaBeginnerGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/beginner-guide` ルートへ移行・追加する。また、データ駆動ナビゲーション（`app/constants.ts` / `app/globals.css`）に Cisco Provider と CCNA エントリを追加し、グローバルナビゲーションに自動反映する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for ccna beginner guide page` (`__tests__/cisco/ccna/beginner-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green / Skeleton & Content)**: `feat(ccna): migrate all content, css, and diagrams for ccna beginner guide` (`page.tsx`, `CcnaBeginnerGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全12セクション・テーブル・Mermaid 5図の完璧な移行)
- [x] **Step 3 (Refactor / Integration)**: `refactor(ccna): integrate ccna beginner guide into routing and update docs` (`app/constants.ts` への Provider: Cisco および CCNA エントリ追加、`app/globals.css` へのテーマ変数・ユーティリティ追加、`CLAUDE.md` / `GEMINI.md` の更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive ccna beginner guide html` (`MIGRATION_PROGRESS.md` の更新、ソースファイル `Ccna-beginner-guide.html` および `.md` の `Gcl_Archive/Cisco/` への退避)
- [x] **Step 5 (Layout & Nav Adjustment)**: `feat(nav): expand main content width and add Cisco provider to hamburger nav tree` (`app/navigation.ts` の `PROVIDER_LABEL`/`PROVIDER_ORDER` への Cisco 追加によるハンバーガーメニュー反映、`page.css` のメイン幅100%拡張)

### 関連ファイル

- [app/cisco/ccna/beginner-guide/page.tsx](app/cisco/ccna/beginner-guide/page.tsx)
- [app/cisco/ccna/beginner-guide/CcnaBeginnerGuide.tsx](app/cisco/ccna/beginner-guide/CcnaBeginnerGuide.tsx)
- [app/cisco/ccna/beginner-guide/NavBar.tsx](app/cisco/ccna/beginner-guide/NavBar.tsx)
- [app/cisco/ccna/beginner-guide/constants.ts](app/cisco/ccna/beginner-guide/constants.ts)
- [app/cisco/ccna/beginner-guide/page.css](app/cisco/ccna/beginner-guide/page.css)
- [__tests__/cisco/ccna/beginner-guide/page.test.tsx](__tests__/cisco/ccna/beginner-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [app/globals.css](app/globals.css)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-04: ACE「Google Cloud ネットワークセキュリティ実践ガイド」用語解説追加 (完了)

### 目的

`build-a-secure-google-cloud-network` の各セクションにネットワーク関連の専門用語説明（glossary）を追加し、学習効果を高める。

### 完了済みステップ

- [x] **テスト作成（Red）**: `__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx` に各セクションの用語解説表示を確認するテストを追加。
- [x] **実装（Green）**: `BuildASecureGoogleCloudNetworkGuide.tsx` の各セクション（S1〜S8）の末尾に、CSS設計に基づいた美しく機能的な `.glossary` コンポーネントを実装。
- [x] **スタイル定義**: `page.css` に `.glossary` コンポーネントのレスポンシブおよびテーマ整合スタイルを追加。
- [x] **全体テスト通過**: プロジェクト全体の 580 テストケースがすべてパスすることを確認。

### 関連ファイル

- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css)
- [__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx](__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-04: ACE「Google Cloud アプリ開発環境構築ガイド」移行 (完了)

### 目的

`Set-Up-an-App-Dev-Environment-on-Google-Cloud.html`（静的HTML・1057行）を、他の完全ガイド（`section1`〜`section4`、`build-a-secure-google-cloud-network` 等）と同じ設計パターン（NavBar + page.tsx + SetUpAnAppDevEnvironmentGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace): add failing tests for set-up-an-app-dev-environment-on-google-cloud page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement set-up-an-app-dev-environment-on-google-cloud page skeleton to pass tests` (最小構成の page.tsx, SetUpAnAppDevEnvironmentGuide.tsx, page.css, NavBar.tsx, constants.ts 実装)
- [x] **Step 3 (Content Migration & CSS Mapping)**: `feat(ace): migrate all content, css mapping, and mermaid diagrams` (全コンテンツ、コピー機能、Mermaid 7図、scoped CSS の移植・リファクタリング、警告の解消)
- [x] **Step 4 (Refactor / Integration)**: `refactor(ace): integrate app dev environment guide into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source files` (元HTMLおよびMDファイルを `Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.tsx](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.tsx)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/constants.ts](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/constants.ts)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.css](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.css)
- [__tests__/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx](__tests__/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-04: ACE「Google Cloud ネットワークセキュリティ実践ガイド」移行 (完了)

### 目的

`Build-a-Secure-Google-Cloud-Network.html`（静的HTML・1380行）を、他の完全ガイド（`section1`〜`section4`、`develop-your-gcp-network` 等）と同じ設計パターン（NavBar + page.tsx + BuildASecureGoogleCloudNetworkGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace): add failing tests for build-a-secure-google-cloud-network page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement build-a-secure-google-cloud-network page skeleton to pass tests` (最小構成の page.tsx, BuildASecureGoogleCloudNetworkGuide.tsx, page.css, NavBar.tsx, constants.ts 実装)
- [x] **Step 3 (Content Migration & CSS Mapping)**: `feat(ace): migrate all content, css mapping, and mermaid diagrams` (全コンテンツ、パケットフローアニメーション、Mermaid 11図、scoped CSS の移植・リファクタリング、リンター修正)
- [x] **Step 4 (Refactor / Integration)**: `refactor(ace): integrate secure network guide into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source html` (元HTMLファイルを `Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/NavBar.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/constants.ts](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/constants.ts)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css)
- [__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx](__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)


---

## 2026-06-29: ACE「GCPネットワーク完全入門」移行 (完了)

### 目的

`Develop-Your-Google-Cloud-Network.html`（静的HTML・1638行）を、他の完全ガイド（`section1`〜`section4`）と同じ設計パターン（NavBar + page.tsx + DevelopYourGcpNetworkGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/develop-your-gcp-network` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for develop-your-gcp-network page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement develop-your-gcp-network page to pass tests` (最小構成の page.tsx, DevelopYourGcpNetworkGuide.tsx, page.css, NavBar.tsx, constants.ts 実装)
- [x] **Step 3 (Refactor / Integration)**: `refactor(ace): integrate develop-your-gcp-network into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新、IntersectionObserver 関連の vitest グローバルモックの改善・CLBガイドのテスト不具合修正)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md — Develop-Your-Google-Cloud-Network 移行完了` (元HTMLファイルを `archive/Gcl_Archive/Associate-Cloud-Engineer/` または `Gcl_Archive/` 配下へ移動)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.tsx](app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.tsx)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/DevelopYourGcpNetworkGuide.tsx](app/gcl/associate-cloud-engineer/develop-your-gcp-network/DevelopYourGcpNetworkGuide.tsx)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/NavBar.tsx](app/gcl/associate-cloud-engineer/develop-your-gcp-network/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/constants.ts](app/gcl/associate-cloud-engineer/develop-your-gcp-network/constants.ts)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.css](app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.css)
- [__tests__/gcl/associate-cloud-engineer/develop-your-gcp-network/page.test.tsx](__tests__/gcl/associate-cloud-engineer/develop-your-gcp-network/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-27: ACE「Cloud Load Balancing 完全入門」移行 (完了)

### 目的

`cloud-load-balancing-guide.html`（静的HTML・1,536行）を、他の完全ガイド（`section1`〜`section4`）と同じ設計パターン（NavBar + page.tsx + CloudLoadBalancingGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/cloud-load-balancing-guide` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-lb): add failing tests for cloud load balancing guide page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace-lb): implement basic layout and components for cloud load balancing guide` (最小構成の page.tsx 実装)
- [x] **Step 3 (Refactor / Content Migration)**: `feat(ace-lb): migrate all content and style from HTML to page` (全コンテンツ、コピー機能、Mermaid 6図、ビジュアライザ SVG、scoped CSS の移植・リファクタリング完了)
- [x] **Step 4 (Refactor / Integration)**: `refactor(ace-lb): integrate cloud load balancing guide into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新、カバレッジダッシュボードの再生成)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate cloud load balancing guide and archive html` (元HTMLファイルを `archive/Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.tsx](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.tsx)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/CloudLoadBalancingGuide.tsx](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/CloudLoadBalancingGuide.tsx)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/NavBar.tsx](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/constants.ts](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/constants.ts)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.css](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.css)
- [__tests__/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.test.tsx](__tests__/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-17: ACE Section 4「アクセスとセキュリティの構成」完全ガイド移行 (完了)

### 目的

`Gcp-ace-section4-complete-guide.html`（静的HTML）を、`section1`〜`section3`と同じ設計パターン（NavBar + page.tsx + AceSection4Guide.tsx + constants.ts + page.module.css）で `app/gcl/associate-cloud-engineer/section4` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-s4): add failing tests for section4 complete guide page` — `d0bc9fd`
- [x] **Step 2 (Green)**: `feat(ace-s4): implement basic layout and components for section4` — `246ff6d`, `b915d0f`
- [x] **Step 3 (Refactor / Content Migration)**: `feat(ace-s4): migrate all content and style from HTML to section4 page` — `8fae321`, `9e145ea`, `0513691` (全コンテンツの移植、パースエラー・参照エラー・ESLint エラー等の解消、11件のテストおよびリンター完全パス)
- [x] **Step 4 (Refactor / Integration)**: `feat(ace-s4): integrate section4 guide link into global constants navigation` — `ec8a56e` (constants.ts へのルーティング・ナビゲーション統合)
- [x] **Step 5 (Docs Sync & Archive)**: `docs(ace-s4): archive migrated section4 HTML and Markdown files` — `053250e` (元HTML・MDファイルを `Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section4/page.tsx](app/gcl/associate-cloud-engineer/section4/page.tsx)
- [app/gcl/associate-cloud-engineer/section4/AceSection4Guide.tsx](app/gcl/associate-cloud-engineer/section4/AceSection4Guide.tsx)
- [app/gcl/associate-cloud-engineer/section4/NavBar.tsx](app/gcl/associate-cloud-engineer/section4/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section4/constants.ts](app/gcl/associate-cloud-engineer/section4/constants.ts)
- [app/gcl/associate-cloud-engineer/section4/page.module.css](app/gcl/associate-cloud-engineer/section4/page.module.css)
- [__tests__/gcl/associate-cloud-engineer/section4/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section4/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-16: ACE Section 4「アクセスとセキュリティの構成」完全ガイド HTML 調整 (完了)

### 目的

`Gcp-ace-section4-complete-guide.md` の内容に基づき、`Gcp-ace-section4-complete-guide.html` に不足していた Policy Analyzer の説明やコマンド、SA削除後30日間の復元仕様、自己権限借用の禁止、引っかけ問題10選、および学習の最終アドバイスセクションを追加・同期する。

### 完了済みステップ

- [x] MDとHTMLの差分調査
- [x] `Gcp-ace-section4-complete-guide.html` に不足しているコンテンツの追記（Policy Analyzer、引っかけ問題10選、最終アドバイスなど）
- [x] ユニットテスト実行 (`npx vitest run` 529件全パス確認)
- [x] コミット: `docs(gcl): update section 4 security guide with traps and advice`

### 関連ファイル

- [Gcp-ace-section4-complete-guide.html](Gcp-ace-section4-complete-guide.html)
- [Gcp-ace-section4-complete-guide.md](Gcp-ace-section4-complete-guide.md)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-15: ACE Section 3「オペレーション・モニタリング」完全ガイド移行 (完了)

### 目的

`Ace-section3-operation-complete-guide.html`（静的HTML・3,425行）を、`section1` / `section2` と同じ設計パターン（NavBar + page.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/section3` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for ACE section3 guide`
- [x] **Step 2 (Green)**: `feat: implement ACE section3 page to pass tests` (Mermaid 10図の constants 移植、code-block の code-line 分割、チェックリスト client state 化)
- [x] **Step 3 (Refactor / Integration)**: `refactor: integrate ACE section3 into constants.ts` (constants.ts へのルーティング統合)
- [x] **Step 4 (Docs Sync)**: ドキュメント類の同期、HTMLソースのアーカイブ化（Gcl_Archive/Associate-Cloud-Engineer/ への移動）

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section3/page.tsx](app/gcl/associate-cloud-engineer/section3/page.tsx)
- [app/gcl/associate-cloud-engineer/section3/AceSection3Guide.tsx](app/gcl/associate-cloud-engineer/section3/AceSection3Guide.tsx)
- [app/gcl/associate-cloud-engineer/section3/NavBar.tsx](app/gcl/associate-cloud-engineer/section3/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section3/constants.ts](app/gcl/associate-cloud-engineer/section3/constants.ts)
- [app/gcl/associate-cloud-engineer/section3/page.module.css](app/gcl/associate-cloud-engineer/section3/page.module.css)
- [__tests__/gcl/associate-cloud-engineer/section3/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section3/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-11: ACE Section 2「計画と実装」完全ガイド移行 (完了)

### 目的

`Gcp-ace-domain2-deep-dive.html`（静的HTML・3,585行）を、`section1` と同じ設計パターン（NavBar + page.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/section2` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-s2): add failing tests for section2 complete guide page`
- [x] **Step 2 (Green)**: `feat(ace-s2): implement basic layout and components for section2`
- [x] **Step 3 (Refactor / Content Migration)**: `feat(ace-s2): migrate all content and style from HTML to section2 page` (コンテンツ移行完了、テスト通過)
- [x] **Step 4 (Docs Sync)**: `refactor(ace-s2): integrate section2 into routing and update docs` (アーカイブ移動、ドキュメント更新完了)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section2/page.tsx](app/gcl/associate-cloud-engineer/section2/page.tsx)
- [app/gcl/associate-cloud-engineer/section2/Section2Guide.tsx](app/gcl/associate-cloud-engineer/section2/Section2Guide.tsx)
- [app/gcl/associate-cloud-engineer/section2/NavBar.tsx](app/gcl/associate-cloud-engineer/section2/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section2/constants.ts](app/gcl/associate-cloud-engineer/section2/constants.ts)
- [app/gcl/associate-cloud-engineer/section2/page.css](app/gcl/associate-cloud-engineer/section2/page.css)
- [__tests__/gcl/associate-cloud-engineer/section2/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section2/page.test.tsx)
- [app/constants.ts](app/constants.ts)

---

## 2026-06-10: ACE Section 1「環境設定」完全ガイド移行 (完了)

### 目的

`Ace-section1-complete-guide.html`（静的HTML・3,615行）を、`complete-advanced-guide` と同じ設計パターン（NavBar + page.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/section1` ルートへ移行・共存させる。デザインは HTML を忠実に再現しつつ色は globals.css の design token に整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-s1): add failing tests for section1 complete guide page`
- [x] **Step 2 (Green)**: `feat(ace-s1): implement section1 complete guide page`
  - Mermaid 15図を `constants.ts` へ移植。壊れていた `diag-6`（クォータ申請フロー）を線形フローに修正。
  - code-block は `dangerouslySetInnerHTML`、表は `<thead>/<th scope>`、チェックリストは client state でトグル化。
- [x] **Step 3 (Refactor)**: `refactor(ace-s1): integrate section1 into nav and update docs`
  - `app/constants.ts` の `EXAMS` に「Section 1: 環境設定 完全ガイド（~23%）」を追加（Header 自動反映）。
  - `CLAUDE.md` に section1 構成を追記。`bun run build` / `bun run lint` パス。
- [x] **Step 4 (Docs Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — ACE section1 移行完了`

### コンテンツ補正（ユーザー確認済み）

公式 PDF ファイル名 `063026_..._exam_guide`（= 2026/06/30）および Google 公式アナウンスに基づき、HTML本文の誤記を修正:

- 「試験ガイド 2025年6月30日版」→「**2026年6月30日版**」
- hero スタット「2025」→「**2026**」、配点「~20%」→「**~23%**」
- IAM Conditions の `timestamp("2025-12-31...")` はサンプル値のため変更せず。

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section1/page.tsx](app/gcl/associate-cloud-engineer/section1/page.tsx)
- [app/gcl/associate-cloud-engineer/section1/Section1Guide.tsx](app/gcl/associate-cloud-engineer/section1/Section1Guide.tsx)
- [app/gcl/associate-cloud-engineer/section1/NavBar.tsx](app/gcl/associate-cloud-engineer/section1/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section1/constants.ts](app/gcl/associate-cloud-engineer/section1/constants.ts)
- [app/gcl/associate-cloud-engineer/section1/page.css](app/gcl/associate-cloud-engineer/section1/page.css)
- [__tests__/gcl/associate-cloud-engineer/section1/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section1/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [CLAUDE.md](CLAUDE.md)

> 備考: 元 `Ace-section1-complete-guide.html` / `.md` はユーザー指示によりリポジトリルートに残置（アーカイブ移動・削除しない）。

---

## 2026-06-07: GCP Associate Cloud Engineer 完全試験対策ガイド移行 (完了)

### 目的

`Gcp-ace-complete-advanced-guide.html` に基づく「完全試験対策ガイド（シングルページ）」を、既存のサブページや親ページを置き換えることなく、Next.js アプリの `app/gcl/associate-cloud-engineer/complete-advanced-guide` ルートに共存・追加する。

### 完了済みステップ

- [x] **Step 1**: `test(ace-guide): add failing tests for complete advanced guide page`
  - 新規テストファイル `__tests__/gcl/associate-cloud-engineer/complete-advanced-guide/page.test.tsx` を作成し、失敗を確認。
- [x] **Step 2**: `feat(ace-guide): implement basic layout and components for complete advanced guide`
  - 最小限の `page.tsx`, `page.css`, `NavBar.tsx` を実装し、テストをパス。
- [x] **Step 3**: `feat(ace-guide): migrate all content and style from HTML to complete advanced guide page`
  - 変換スクリプト `scratch/convert.mjs` を実行し、全セクションのコンテンツ（テキスト、コードブロック、テーブル、ダイアグラム）と scoped CSS を忠実に移行。
  - テストおよび IntersectionObserver のモックを設定し、Vitest が正常にパスすることを確認。
- [x] **Step 4**: `refactor(ace-guide): integrate complete advanced guide into routing and update docs`
  - `app/constants.ts` の `EXAMS` にルート `/gcl/associate-cloud-engineer/complete-advanced-guide` を追加し、メニュー連携を統合。
  - `CLAUDE.md` / `GEMINI.md` に新しいルートを追加。
- [x] **Step 5**: `chore(docs): update MIGRATION_PROGRESS.md — migrate complete advanced guide and archive html`
  - `Gcp-ace-complete-advanced-guide.html` を `Gcl_Archive/Associate-Cloud-Engineer/` へ移動（アーカイブ）。
  - `MIGRATION_PROGRESS.md` の更新。

### 関連ファイル

- [app/gcl/associate-cloud-engineer/complete-advanced-guide/page.tsx](app/gcl/associate-cloud-engineer/complete-advanced-guide/page.tsx)
- [app/gcl/associate-cloud-engineer/complete-advanced-guide/page.css](app/gcl/associate-cloud-engineer/complete-advanced-guide/page.css)
- [app/gcl/associate-cloud-engineer/complete-advanced-guide/constants.ts](app/gcl/associate-cloud-engineer/complete-advanced-guide/constants.ts)
- [app/gcl/associate-cloud-engineer/complete-advanced-guide/NavBar.tsx](app/gcl/associate-cloud-engineer/complete-advanced-guide/NavBar.tsx)
- [__tests__/gcl/associate-cloud-engineer/complete-advanced-guide/page.test.tsx](__tests__/gcl/associate-cloud-engineer/complete-advanced-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [CLAUDE.md](CLAUDE.md)
- [GEMINI.md](GEMINI.md)

---

## 2026-05-21: P1 テスト整備タスク（完了）

### 目的

優先度 **🟡 P1** に分類されている、各ドメイン（CDL, PCNE, PCNE Step-by-Step, AGWA）のクリティカルパス E2E テストおよび単体テストを整備し、リグレッションを自動検知できるようにする。

### 完了済みステップ

- [x] **`cloud-digital-leader` クリティカルパス E2E テストの作成** (`e2e/cloud-digital-leader.spec.ts`)
- [x] **`pcne` クリティカルパス E2E テストの作成** (`e2e/pcne.spec.ts`)
- [x] **`pcne-step` クリティカルパス E2E テストの作成** (`e2e/pcne-step.spec.ts`)
- [x] **`agwa` ページ単体テストの追加** (`__tests__/gcl/agwa/ScrollSpy.test.tsx`)
- [x] **`agwa` クリティカルパス E2E テストの作成** (`e2e/agwa.spec.ts`)
- [x] **ドキュメントとカバレッジダッシュボードの更新** (`docs/TEST_COVERAGE_PROGRESS.md` および `docs/coverage-dashboard.html`)

### 関連ファイル

#### 新規

- [**tests**/gcl/agwa/ScrollSpy.test.tsx](__tests__/gcl/agwa/ScrollSpy.test.tsx) — `ScrollSpy` ユニットテスト (2 ケース)
- [e2e/cloud-digital-leader.spec.ts](e2e/cloud-digital-leader.spec.ts) — CDL E2Eテスト (5 ケース)
- [e2e/pcne.spec.ts](e2e/pcne.spec.ts) — PCNE E2Eテスト (5 ケース)
- [e2e/pcne-step.spec.ts](e2e/pcne-step.spec.ts) — PCNE Step E2Eテスト (5 ケース)
- [e2e/agwa.spec.ts](e2e/agwa.spec.ts) — AGWA E2Eテスト (4 ケース)

#### 変更

- [docs/TEST_COVERAGE_PROGRESS.md](docs/TEST_COVERAGE_PROGRESS.md) — テストカバレッジ・網羅性進捗レポート
- [docs/coverage-dashboard.html](docs/coverage-dashboard.html) — カバレッジダッシュボードHTML (再生成)

### 検証コマンド（完了時の最終結果）

```bash
bun run test         # Vitest 333 件 / 54 ファイル全 pass
bun run test:e2e     # Playwright E2E 23 件 / 16 ファイル全 pass
bun run build        # Next.js ビルド成功
bun run dashboard    # カバレッジダッシュボード再生成
```

### 次のステップ

- [x] 🔵 P2: 横断品質（Visual, A11y, Performance, Security）の導入検討
  - Visual / A11y: 全 7 ドメイン対応済み（`e2e/visual.spec.ts`, `e2e/a11y.spec.ts`）
  - Performance: `bun run test:perf`（Playwright `perf` project + `e2e/perf-budgets.json`）+ `bun run perf:report`（`@lhci/cli` autorun）
  - Security: `bun run test:security`（`scripts/security-audit.mjs` + `bun audit --json` 集計）

---

## 2026-05-16〜17: グローバルメニュー ハンバーガー化 + AWS 拡張対応（完了 8/8）

### 目的

1. **UI**: デスクトップ/モバイル共通の「右側ドロワー + プロバイダ別アコーディオン」ハンバーガー UI に統一する
2. **構造**: ナビ定義を [app/constants.ts](app/constants.ts) の `EXAMS` を正本としたデータ駆動に切り替え、`provider: 'GCP' | 'AWS'` フィールドで自動グルーピングする
3. **拡張性**: AWS 試験ページ群の追加に備え、constants 1 ファイル追加で Header に自動反映できる構造にする

### プラン参照

[.claude/plans/gc-aws-tdd-declarative-nebula.md](.claude/plans/gc-aws-tdd-declarative-nebula.md) に全体プラン保存。承認済み。

### 決定事項（ユーザー合意済み）

| 項目 | 採用 |
|---|---|
| メニュー UI | 右側ドロワー + プロバイダ別アコーディオン |
| AWS の扱い | ナビ枠だけ準備 (constants に SAA を `status: 'coming-soon'` で追加、ページ自体は別 PR) |
| user-event | 導入する (`@testing-library/user-event`) |
| コミット粒度 | 8 ステップ 8 コミット |

### 完了済みステップ

- [x] **Step 1**: `feat(nav): introduce NavTree adapter over EXAMS` — `4aab8c0`
  - 新規 [app/navigation.ts](app/navigation.ts) (`toNavTree`, `NavGroup`, `NavExam`, `NavLeaf`, `Provider` 型)
  - 新規 [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) (8 ケース)
- [x] **Step 2**: `feat(constants): tag exams with provider for nav grouping` — `6530793`
  - [app/constants.ts](app/constants.ts): `Exam.provider` 必須化、`status?: 'available' \| 'coming-soon'` 追加、`ColorKey` に `'card-aws-saa'` 追加、AWS SAA エントリ追加（`status: 'coming-soon'`、`domains: []`）
  - [app/page.tsx](app/page.tsx): coming-soon の試験をホームページのカード一覧から `.filter()` で除外
  - [app/globals.css](app/globals.css): `--color-theme-aws-bg/fg` と `@utility icon-theme-aws-saa` 追加
  - [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) に「実 EXAMS で GCP/AWS グループ生成」3 ケース追加
  - [**tests**/app/page.test.tsx](__tests__/app/page.test.tsx) を `VISIBLE_EXAMS` 基準に更新
- [x] **Step 3**: `test(header): freeze legacy nav contract before refactor` — `04e3853`
  - [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) の describe を「Header (legacy nav: Step 7 で撤去予定)」でラップ
- [x] **Step 4**: `feat(header): add hamburger toggle with aria state` — `5b94ad3`
  - `bun add -D @testing-library/user-event` (14.6.1)
  - [components/Header.tsx](components/Header.tsx): `drawerOpen` state + ハンバーガーボタン（右カラム）+ 空の Drawer（背景オーバーレイ + クローズボタン）。既存ドロップダウンと並走
  - 新規 [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) (5 ケース)
- [x] **Step 5**: `feat(header): render nav tree inside drawer` — `8cb0ae4`
  - [components/Header.tsx](components/Header.tsx): `toNavTree(EXAMS)` を module スコープで算出し、Drawer 内に provider 別 `<section>` + 試験ごとの `<details><summary>` アコーディオンを描画
  - `iconThemeClass()` ヘルパで `card-*` → `icon-theme-*` 変換
  - `coming-soon` の試験は「準備中」ラベルを表示し、リンクを描画しない
  - リンクの `onClick` で `setDrawerOpen(false)` を呼びナビゲーション時に Drawer を閉じる
  - [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) に NavTree 描画契約 7 ケース追加
- [x] **Step 6**: `feat(header): trap focus and lock scroll in drawer` — `30f5c13`
  - Drawer 用 useEffect 2 つ追加: (a) スクロールロック + open 時に閉じるボタンへ focus + close 時にトリガーへ復帰、(b) Escape クローズ + Tab/Shift+Tab フォーカストラップ
  - `hamburgerRef` / `closeButtonRef` / `drawerRef` を追加
  - 同テストファイルに Escape クローズ・初期フォーカス・復帰フォーカス・スクロールロック・Shift+Tab wrap の 5 ケース追加
- [x] **Step 7**: `refactor(header): remove inline dropdowns in favor of drawer` — `49d9e55`
  - [components/Header.tsx](components/Header.tsx): インラインドロップダウン JSX、`openMenu` state、5 個の `useRef`、click-outside/Escape 用 effect、`DropdownItem` を削除（-773/+142 行）
  - レイアウトを `grid (1fr auto 1fr)` → `flex justify-between` に簡素化
  - [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) を drawer 契約 6 ケースに書き換え（Header の最小契約: タイトル / nav role / ハンバーガー aria / provider 見出し / 全試験リンク網羅 / coming-soon 除外）
- [x] **追加 fix**: `fix(nav): dedup items when domain href equals exam href` — `0df5f20`
  - PCNE で `domains[0].href === exam.href` のため React duplicate key 警告が出ていた。adapter で exam.href と一致する domain を items から除外
  - [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) に回帰テスト 1 ケース追加
- [x] **Step 8**: `test(e2e): cover hamburger navigation flow` — `a54a181`
  - 新規 [e2e/nav.spec.ts](e2e/nav.spec.ts) (2 ケース): ACE Domain 1 遷移 / AWS 見出し可視 + Escape クローズ
  - `bun run test:e2e e2e/nav.spec.ts` で 2 件 pass を確認

### 関連ファイル

#### 最終的に変更された全ファイル

- [app/navigation.ts](app/navigation.ts) — adapter (新規) + dedup ロジック追加
- [app/constants.ts](app/constants.ts) — provider/status 追加、AWS SAA 追加
- [app/page.tsx](app/page.tsx) — coming-soon フィルタ
- [app/globals.css](app/globals.css) — AWS テーマカラー、icon-theme-aws-saa
- [components/Header.tsx](components/Header.tsx) — レガシードロップダウン撤去 + Drawer + a11y（合計 -773 / +330 行）
- [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) — adapter テスト + dedup 回帰
- [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) — drawer 契約に書き換え（22 → 6 ケース）
- [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) — 新 UI 全契約（17 ケース）
- [**tests**/app/page.test.tsx](__tests__/app/page.test.tsx) — VISIBLE_EXAMS 基準
- 新規 [e2e/nav.spec.ts](e2e/nav.spec.ts) — Drawer ナビ E2E (2 ケース)
- `package.json` / `bun.lock` — @testing-library/user-event 追加

### 不変条件（触らない）

- `--header-h: 48px`, `--topnav-height: 84px` (DisclaimerBanner との連動を保護)
- [components/DisclaimerBanner.tsx](components/DisclaimerBanner.tsx) — 触らない
- [app/layout.tsx](app/layout.tsx) — 触らない
- 「3試験対応」「5/600+/100%」などの Stats 表示文言（テストで検査されていないものは据え置き）

### 検証コマンド（完了時の最終結果）

```bash
bun run test                # Vitest 331 件 / 53 ファイル全 pass
bun run lint                # ESLint クリーン
bun run build               # Next.js 16.2.6 Turbopack 成功
bun run test:e2e e2e/nav.spec.ts  # Chromium 2 件 pass
```

### 残課題 / 次回着手候補

- 手動確認: `bun run dev` で実機の Drawer アニメーション・スクロールロック挙動を最終チェック
- AWS 試験ページ群の実装（`app/aws/solutions-architect-associate/page.tsx`）。adapter は完成しているので constants の `status` を `'available'` に変えるだけで Drawer に自動反映される

---

## 2026-05-12: AGWA Section 1 Restoration (完了)

### 目的

ユーザーによって確認されたオリジナル HTML との乖離（情報の省略・簡略化）を解消するため、残りのセクション（1.1, 1.2, 1.3, 1.4, 1.6）の内容をオリジナルに準拠したリッチな内容に復元・補完する。

### ステータス

- [x] **Section 1.5 建物とリソースの管理**: 補完完了、CSSマッピング済み。
- [x] **Section 1.1 ユーザー ライフサイクル管理**: 復元完了（`feat(agwa): complete reproduction of section 1 html with all details`）。
- [x] **Section 1.2 ドメインの管理**: 復元完了。
- [x] **Section 1.3 組織ユニット (OU)**: 復元完了。
- [x] **Section 1.4 グループの管理**: 復元完了。
- [x] **Section 1.6 管理者ロール**: 復元完了。

---

## 次回セッションでの再開プロンプト

あなたは熟練したフロントエンドエンジニアであり、Next.js (App Router) の移行スペシャリストです。
現在、リポジトリの最新 HEAD は `232184f` です。
GCP ACE Section 1〜4 を含む全 HTML ファイルの Next.js への移行は完了済みです。現時点で未移行の HTML ファイルは存在しません。

次回の作業は HTML 移行ではなく、別途指示されたタスクから始めてください。

---

## 2026-05-12: AGWA Section 1 Migration (完了)

### 実装ステップ詳細 (Implementation Plan)

#### Objective

Migrate the standalone static HTML page `agwa-section1-accounts-domains-directory.html` into the Next.js App Router application at the route `app/gcl/agwa/section1/page.tsx`.

#### CSS Variable Mapping

HTML `:root` variables must be mapped to the project's `globals.css` `@theme` tokens in `page.css`:
- `--bg` -> `--color-background`
- `--surface` -> `--color-card`
- `--accent` -> `--color-theme-agwa-fg`
- `--text` -> `--color-foreground`
- `--border` -> `--color-border`

#### Steps & Commits

- **Phase 1: CSS Extraction and Setup**
  - `app/gcl/agwa/section1/page.css` 作成と変数マッピング。
  - Commit: `feat(agwa): add section 1 specific css and token mappings`
- **Phase 2: HTML to TSX Conversion**
  - `app/gcl/agwa/section1/page.tsx` 作成。SVG属性の camelCase 変換を含む HTML 変換。
  - Commit: `feat(agwa): convert section 1 html to tsx component`
- **Phase 3: Integration and Navigation**
  - `components/Header.tsx` および `CLAUDE.md` の更新。
  - Commit: `feat(agwa): add section 1 to header navigation and update docs`

### 次のステップ

- [x] **Phase 1: CSS Extraction and Setup**
- [x] **Phase 2: HTML to TSX Conversion**
- [x] **Phase 3: Integration and Navigation**

---

## 2026-05-12: PCNE Step-by-Step Guide Migration & Quality Improvements (完了)

### 完了済み

- **AGWA Section 1 Quality Improvements (Section 1.5)**:
  - Section 1.5 「建物とリソースの管理」の内容をオリジナル HTML に準拠するよう復元。
  - 欠落していたテーブル（リソース種類、予約権限、詳細オプション）および CSV 一括作成手順を追加。
  - SVG をリッチなオリジナル版に置き換え（camelCase 属性変換済み）。
  - `page.css` の変数をプロジェクトの `@theme` トークンに正しくマッピング。
- **PCNE Step-by-Step Guide Migration (Step 1-8)**:
  - Section 1-6 までの移行を完了し、旧 HTML ファイルをアーカイブ化。
- **Layout Optimization (SharedSection.module.css)**:
  - `.section > *` セレクターを `.section > :not(.divider)` に変更し、区切り線（`.divider`）のみを画面幅いっぱいに表示するよう修正。
  - `SharedSection.module.css` を使用する全コンポーネントに適用。
- **Test Robustness Improvements**:
  - `getByRole('heading', { level: 2 })` を `name` オプション（アクセシブルネーム）併用による厳密な取得にリファクタリング。
  - `.code-block` や `.code-line` の構造を検証するテストを追加し、テストの信頼性を向上。
- **Step 1: Base Setup & Constants**:
  - `constants.ts`, `layout.tsx`, `page.tsx`, `pcne-step.module.css` を作成。
  - Heroセクション、スティッキーナビゲーションの実装。
- **Step 2: Section 1 (VPC ネットワークの設計と計画)**:
  - `Section1.tsx` を TDD で実装。
  - ネットワークティアの選択、VPCの設計（共有VPC、ピアリング等）、ハイブリッド接続（Dedicated Interconnect, HA VPN等）、GKEネットワーク設計を移行。
- **Step 3: Section 2 (VPCネットワークの実装)**:
  - `Section2.tsx` を TDD で実装。
  - VPC構成（コマンド含む）、VPCルーティング、Network Connectivity Center (NCC) 構成、GKEクラスタ実装を移行。
- **Step 4: Section 3 (マネージドネットワークサービスの構成)**:
  - `Section3.tsx` を TDD で実装。
  - ロードバランシング、Cloud CDN、Cloud DNSの構成とベストプラクティスを移行。
- **Step 5: Section 4 (ハイブリッド/マルチクラウドネットワーク接続の構成と実装)**:
  - `Section4.tsx` を TDD で実装。
  - Cloud Interconnect、サイト間IPsec VPN（コマンド含む）、Cloud RouterのBGP/BFD構成、ハイブリッドNCC構成を移行。
- **Step 6: Section 5 (ネットワーク運用、監視、トラブルシューティング)**:
  - `Section5.tsx` を TDD で実装。
  - Cloud Observability（ログ・メトリクス）、トラブルシューティング手法、Network Intelligence Centerの各機能比較を移行。
- **Step 7: Section 6 (クラウドネットワークセキュリティの構成と実装)**:
  - `Section6.tsx` を TDD で実装。
  - Cloud Armor、Cloud NGFW（階層型ポリシー）、Cloud NAT/Secure Web Proxy、自己管理型NVAとパケットミラーリングを移行。
- **Step 8: Archiving and Final Verification**:
  - 全セクションの統合確認。
  - E2Eテストはスキップし、ビルド成功を確認。
  - `google-cloud-pcne-step-by-step-guide.html` を `Gcl_Archive/Professional-Cloud-Network-Engineer/` へアーカイブ。

### 次のステップ

- [x] **Step 1: Base Setup & Constants**
- [x] **Step 2: Section 1 (VPC ネットワークの設計と計画)**
- [x] **Step 3: Section 2 (VPCネットワークの実装)**
- [x] **Step 4: Section 3 (マネージドネットワークサービスの構成)**
- [x] **Step 5: Section 4 (ハイブリッド/マルチクラウドネットワーク接続の構成と実装)**
- [x] **Step 6: Section 5 (ネットワーク運用、監視、トラブルシューティング)**
- [x] **Step 7: Section 6 (クラウドネットワークセキュリティの構成と実装)**
- [x] **Step 8: Archiving and Final Verification**

---

## 2026-05-10: Professional Cloud Network Engineer Migration (完了)

### 完了済み

- **Step 1: Base Setup & Constants**:
  - `constants.ts`, `layout.tsx`, `page.tsx`, `pcne.module.css` を作成。
  - Heroセクション、スティッキーナビゲーションの実装。
- **Step 2: INTRO (試験の全体像と準備方法)**:
  - `SectionIntro.tsx` を TDD で実装。
  - 出題配点バー、推奨学習ステップ、公式リソースを移行。
- **Step 3: Section 1 (VPC ネットワークの設計・実装)**:
  - `Section1.tsx` を TDD で実装。
  - VPCモード比較、ファイアウォールルール、VPCピアリングとShared VPCの違い、Cloud NAT・PGA・PSCの比較を移行。
- **Step 4: Section 2 (ハイブリッド・マルチクラウド接続)**:
  - `Section2.tsx` を TDD で実装。
  - VPN/Interconnectの比較、HA VPN、Dedicated Interconnect の SLA要件、Cloud Router と BGP を移行。
- **Step 5: Section 3 (ロードバランシングと最適化)**:
  - `Section3.tsx` を TDD で実装。
  - DiagramSVGを用いたフローチャートとアーキテクチャ図の実装。
  - ロードバランサー選択基準、主要LB比較、Global HTTPS LBの構成、NEGの種類、ベストプラクティスを移行。
- **Step 6: Section 4 (ネットワークサービスとDNS)**:
  - `Section4.tsx` を TDD で実装。
  - Cloud DNSのパブリック/プライベートゾーン比較、DNS転送の双方向アーキテクチャ図 (DiagramSVG)、IPアドレス管理（静的/エフェメラル）の比較を移行。
- **Step 7: Section 5 (ネットワークセキュリティ)**:
  - `Section5.tsx` を TDD で実装。
  - Cloud Armorの4機能（DDoS, WAF, Rate Limiting, Adaptive Protection）、VPC Service Controlsのサービス境界アーキテクチャ、IAPによるVPNレス接続の比較図を移行。
- **Step 8: Section 6 (監視・トラブルシュート)**:
  - `Section6.tsx` を TDD で実装。
  - Network Intelligence Center の 5 ツール、VPC Flow Logs・Packet Mirroring の使い分け表、トラブルシューティングの 4 ステップを移行。
- **Step 9: まとめ (試験攻略チートシート & 混同しやすいポイント)**:
  - `SectionSummary.tsx` を TDD で実装。
  - チートシート、TRAPS（混同しやすいポイント）、試験当日の解答戦略を移行。

### 次のステップ

- [x] **Step 1: Base Setup & Constants**: `constants.ts`, `layout.tsx`, `page.tsx`, `pcne.module.css`
- [x] **Step 2: INTRO (試験の全体像と準備方法)**
- [x] **Step 3: Section 1 (VPC ネットワークの設計・実装)**
- [x] **Step 4: Section 2 (ハイブリッド・マルチクラウド接続)**
- [x] **Step 5: Section 3 (ロードバランシングと最適化)**
- [x] **Step 6: Section 4 (ネットワークサービスとDNS)**
- [x] **Step 7: Section 5 (ネットワークセキュリティ)**
- [x] **Step 8: Section 6 (監視・トラブルシュート)**
- [x] **Step 9: まとめ (試験攻略チートシート & 混同しやすいポイント)**

---

## 2026-05-08: Cloud Digital Leader Section 6 Migration (完了)

### 完了済み

- **Step 1: Base Setup & Constants**:
  - `constants.ts`, `layout.tsx`, `page.tsx`, `section6.module.css` を作成。
  - Heroセクション、スティッキーナビゲーションの実装。
- **Step 2: Part 1 - Financial Governance**:
  - `Section1.tsx` を TDD で実装.
- **Step 3: Part 2 - SRE Principles**:
  - `Section2.tsx` を TDD で実装.
- **Step 4: Part 3 - Cloud Monitoring**:
  - `Section3.tsx` を TDD で実装.
- **Step 5: Part 4 - Cloud Logging**:
  - `Section4.tsx` を TDD で実装.
- **Step 6: Part 5 - Reliability**:
  - `Section5.tsx` を TDD で実装.
- **Step 7: Part 6 - Sustainability**:
  - `Section6.tsx` を TDD で実装。Google の環境目標（24/7 カーボンフリー）、Carbon Footprint レポート、Scope 1/2/3 の定義、クラウド移行の環境メリットを移行。
  - `page.tsx` に `Section6` を統合。
- **Step 8: Part 7 - Exam Preparation**:
  - `Section7.tsx` を TDD で実装。頻出問題パターン、キーワードマップ、推奨学習リソースを移行。
  - `page.tsx` に `Section7` を統合。
- **最終調整**:
  - E2E検証はスキップし、本番ビルドの成功を確認。

### 次のステップ

- [ ] (なし) Section 6 は完了。

---

(以下、過去の履歴)

## 2026-05-03: Cloud Digital Leader Section 4 & 5 品質改善タスク (完了)

...
