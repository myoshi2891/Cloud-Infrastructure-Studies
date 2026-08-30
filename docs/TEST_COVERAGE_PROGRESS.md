# テストカバレッジ・網羅性進捗レポート

最終更新日: 2026-08-30

[coverage-dashboard.html](coverage-dashboard.html)（2026年8月30日に `bun run dashboard` で再生成）のデータを基に、現在のテスト網羅性と進捗状況を整理したレポートです。2026年8月29日の Recommended Books 移行コホート(`infrastructure-as-code` / `release-it` / `the-devops-handbook` / `site-reliability-engineering`)を反映済みです。

---

## 1. 全体サマリー

プロジェクト全体のテストカバレッジとリソース状況は以下の通りです。

- **ソースファイル総数:** 604 ファイル
- **テストカバー済みソース数:** 169 ファイル
- **全体カバレッジ達成率:** **28%**
- **テストファイル総数:** 158 ファイル (Vitest 4.x + Playwright 1.x)

---

## 2. ドメイン別カバレッジマトリクス

各試験対策ページおよび共通モジュールのテストカテゴリ別の網羅状況です。

> **集計スコープ:** 本マトリクスは `scripts/lib/classifier.mjs` の `DOMAINS` / `domainOf()` が分類する 9 ドメイン **444 ファイル（カバー済み 112 ファイル / 25%）** のみを対象とします。全体サマリー（604 ファイル / 169 ファイル）との差分 **160 ファイル（うちカバー済み 57 ファイル）** は、現時点で `domainOf()` が `null` を返す未分類ソースです。これらをドメイン行として集計するには `classifier.mjs` の `DOMAINS` / `domainOf()` へのドメイン追加が必要です。

| ドメイン | 進捗 (カバー数/総数) | 達成率 | Unit | Integration | E2E | Smoke | Visual | A11y | Perf | Security |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Associate Cloud Engineer (ACE)** | 14 / 42 | **33%** | ⚠️ 33% | ❌ 0% | ⚠️ 2% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Generative AI Leader (GCL)** | 5 / 24 | **21%** | ⚠️ 21% | ❌ 0% | ⚠️ 4% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Cloud Digital Leader (CDL)** | 21 / 167 | **13%** | ⚠️ 13% | ❌ 0% | ⚠️ 1% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Google Workspace Admin (AGWA)** | 11 / 35 | **31%** | ⚠️ 31% | ❌ 0% | ⚠️ 3% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Professional Cloud Network Engineer (PCNE)** | 16 / 43 | **37%** | ⚠️ 37% | ❌ 0% | ⚠️ 2% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **PCNE Step-by-Step** | 7 / 11 | **64%** | ⚠️ 55% | ❌ 0% | ⚠️ 9% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Cisco CCNA** | 22 / 66 | **33%** | ⚠️ 33% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ✅ 実装 |
| **Cisco DevNet / Automation** | 1 / 10 | **10%** | ⚠️ 10% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ✅ 実装 |
| **共通 (components / lib / navigation)** | 15 / 46 | **33%** | ⚠️ 28% | ⚠️ 9% | ⚠️ 2% | ⚠️ 2% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |

> **凡例:**
> - ✅ **実装済み（Visual / A11y / Performance / Security）**: 対応テストが1件以上
> - ✅ **実装済み（その他のカテゴリ）**: 80% 以上カバー
> - ⚠️ **部分的**: 0%〜80% 未満カバー
> - ❌ **未実装**: 対応テスト 0 件

---

## 3. テストカテゴリ別の網羅性と課題

### ① Unit（単体テスト）

- **現状**: PCNE（37%）や PCNE Step-by-Step（55%）など、比較的新しい移行セクションでは TDD 開発ルールに従って単体テストが整備されています。AGWA は Section 1〜6 を含む12テストファイルで、移行本文、テーブル構造、リンク順序、Section 2/4のスクロール末尾判定を検証しています。CCNA（33%）/ DevNet（10%）は独立ドメインとして集計されています。
- **課題**: 移行元の HTML から復元されたコンポーネントや追加コンポーネントのテストカバレッジ底上げが必要です。

### ② Integration（結合テスト）

- **現状**: 共通ロジックである `lib/navigation.test.ts`, `lib/recentPages.test.ts`, `lib/utils.test.ts` の3件が共通ソース46件中4件を部分的（9%）にカバーし、正準対象 `lib/recentPages.ts`、`lib/utils.ts`、`app/navigation.ts` をすべて保護します。
- **課題**: 試験ドメインごとのコンポーネント間連携（例: `navigation` から各セクションページへの遷移ロジック）を検証する結合テストが全ドメインで未実装です。

### ③ E2E（エンドツーエンドテスト）

- **現状**: GCP系6ドメインと共通で Playwright による基本的なナビゲーションフローをカバーしています。新たに独立集計したCCNA / DevNetは0%です。
- **課題**: 主要なユーザー導線や、アコーディオン・スクロールスパイ・ドロワー開閉などのインタラクティブ操作が完全にカバーされていません。

### ④ Smoke（スモークテスト）

- **現状**: `__tests__/smoke.test.tsx` の 1 件のみ。
- **課題**: 各ドメインがビルド後に正常に描画できるかを検証する軽量なスモークテストが不足しています。

### ⑤ 横断品質（Visual, A11y, Performance, Security）

- **現状**: 従来のGCP系6ドメインと共通では Visual / A11y / Performance / Security が実装済みです。新たに独立集計したCCNA / DevNetはSecurityのみ対象テストがあり、他3カテゴリは未実装です。
- **課題**: CCNA / DevNetを横断E2Eの対象へ追加したうえで、`.github/workflows/` への CI 統合とLCP / CLS / TBT閾値の段階的なチューニングが必要です。

---

## 4. 優先度別ネクストアクション

ダッシュボードで推奨されている優先度順のタスクリストです。

### 🔴 P0: 最優先タスク (完了)

- [x] **共通基盤カバレッジ補強**
  - **対象**: `lib/recentPages.ts`, `lib/utils.ts`, `app/navigation.ts`
  - **内容**: 主要ユーティリティの回帰防止のため、Integration/Unit テストを追加。
  - **推奨ツール**: Vitest

### 🟡 P1: 重要タスク（ドメイン品質・E2E） (完了)

- [x] **`cloud-digital-leader` クリティカルパス E2E テストの作成**
  - **内容**: 主要セクション of ユーザー導線自動回帰検出用テスト。
  - **推奨ツール**: Playwright
- [x] **`pcne` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [x] **`pcne-step` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [x] **`agwa` ページ単体テストの追加**
  - **内容**: Section 3 テストを正規配置へ移動し、移行抽出ヘルパーと Mermaid モックを共通化。Section 4 はリンク順序と列見出し数を厳密検証。
  - **推奨ツール**: Vitest + React Testing Library
- [x] **`agwa` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright

### 🟡 P1: Cisco E2E（未完了）

- [ ] **`ccna` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [ ] **`devnet` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright

### 🔵 P2: 横断品質（完了）

- [x] **サイドバーガイドの横断レイアウト回帰テスト**
  - **対象**: AWS / Cisco / GCP のサイドバー付き全24スタイルシート
  - **内容**: 左端固定280pxサイドバー、残り幅100%のメイン領域、レスポンシブ時の幅100%復帰を73ケースで検証。
  - **推奨ツール**: Vitest
- [x] **Visual 回帰テストの導入**
  - **対象**: 導入時点の主要7ドメイン
  - **内容**: レンダリング崩れ（特にダークモードやレスポンシブ表示）の自動検知。
  - **推奨ツール**: Playwright (`toHaveScreenshot`)
- [x] **A11y (アクセシビリティ) 自動テストの導入**
  - **内容**: `aria-label` の欠損やコントラスト比不足などの WCAG 違反の自動監視。
  - **推奨ツール**: `@axe-core/playwright`
- [x] **Performance テストの導入**
  - **対象**: 全ドメインの主要 7 ページ（`e2e/helpers/critical-pages.ts`）
  - **内容**: `bun run test:perf` で Playwright `perf` project が LCP / CLS / TBT を計測し、`e2e/perf-budgets.json` の閾値と比較する。本テストは主に dev サーバー計測を対象としており、その目的は CI/CD パイプラインにおける「テスト疎通の確認（疎通確認）」です。バジェット値は本番ビルドの実測値に基づいて段階的に引き締め調整されています。また、深掘り分析用に `bun run perf:report`（`@lhci/cli` autorun）も併設。
  - **推奨ツール**: Playwright `PerformanceObserver` + `@lhci/cli`
- [x] **Security テストの導入**
  - **対象**: `package.json` の全依存パッケージ
  - **内容**: `bun run test:security` で `scripts/security-audit.mjs` が `bun audit --json` を起動し、`high` / `critical` 検知時に exit 1 を返す。
  - **推奨ツール**: `bun audit`（Bun 1.3.12 同梱）

---

## 5. 主な未カバーソースファイル一覧（抜粋）

カバレッジ向上のターゲットとなる主な未カバーファイルです。

- **AGWA (Google Workspace Admin)**
  - `app/gcl/agwa/section1/page.tsx`
  - `app/gcl/agwa/section1/page.css`
- **ACE (Associate Cloud Engineer)**
  - `app/gcl/associate-cloud-engineer/architecture-guide/page.tsx`
  - `app/gcl/associate-cloud-engineer/domain1/page.tsx`
  - `app/gcl/associate-cloud-engineer/domain2/Chapter17.tsx`
- **CDL (Cloud Digital Leader)**
  - 各セクションの `DiagramSVG.tsx` および `SectionCard.tsx`
  - `section1` から `section4` までのコンポーネント群（`Section0.tsx` 〜 `Section14.tsx` 等）
- **GCL (Generative AI Leader)**
  - `app/gcl/genai-leader/section1/components/` 内の各セクションコンポーネント
  - `app/gcl/genai-leader/section2/components/` 内の各セクションコンポーネント
- **Cisco CCNA**
  - 各ガイドの `NavBar.tsx` と `constants.ts`
  - 一部ガイドの本体コンポーネントと `page.tsx`
- **Cisco DevNet / Automation**
  - Associate / Professionalの `NavBar.tsx`, `constants.ts`, `page.tsx`
  - `app/cisco/devnet-associate/DevNetAssociateGuide.tsx`

---

## 6. テスト実行とダッシュボード更新コマンド

テストの追加や修正を行った後は、以下のコマンドを実行して品質維持とダッシュボードの更新を行います。

```bash
# 1. 単体・結合テストの実行 (Vitest)
bun run test

# 2. E2Eテストの実行 (Playwright)
bun run test:e2e

# 3. カバレッジダッシュボードの再生成
bun run dashboard
```

*(※ `bun run dashboard` を実行すると [coverage-dashboard.html](coverage-dashboard.html) がスキャンされ最新情報に更新されます。)*

---

## 7. 次回セッションでのテスト追加再開プロンプト

あなたは熟練したテストエンジニアであり、Next.js (App Router) / TypeScript / Vitest / Playwright のテストスペシャリストです。
現在、[docs/TEST_COVERAGE_PROGRESS.md](TEST_COVERAGE_PROGRESS.md) の既存 **🔴 P0 / 🟡 P1 / 🔵 P2** は完了済みですが、CCNA / DevNetの独立集計によりCisco向けP1 E2Eが新たに未完了として可視化されています。サイドバー付き全24スタイルシートの横断レイアウト契約は `guide-content-widths.test.ts` の73ケースで保護されています。次フェーズではCisco E2Eを優先し、以下の候補もステップバイステップで進めてください。

AGWA の移行検証は Section 1〜6 と共有抽出ヘルパーへ同期済みです。最新の実行記録は 2026-08-15T03:13:14Z、対象コミット `9ddf12a`、スコープは `bun run test` による全体Vitestで、131ファイル・1118件が成功しました。`bun run lint` も全体スコープで成功しています。

直近のレビュー対応では、Section 4 NavBar の最下部スクロール回帰テストを追加し、Section 5 のテーブル構造検証と Mermaid モックのアクセシビリティ契約を強化しました。Section 6 は `components/sections/` と CSS Modules の構成へ移行済みです。ユーザー指示に従い、ビルドと目視確認は実施していません。

以下の要件を厳守して実装を進めてください。
1. **TDD（テスト駆動開発）の厳格な遵守**:
   正準の `.agents/rules/tdd-commit-workflow.md`（`.claude` / `.gemini` は同期ミラー）に従い、必ず以下の 4 ステップを繰り返してください。
   - **Step 0 — Inventory**: 移行タスクでは移行元からインベントリを機械抽出し、実装前にコミットする。 (`chore(migration): add content inventory for ...`)
   - **Step 1 — Fail**: まずテストコードを作成し、失敗（Fail）することを確認してコミットする。 (`test: add failing tests for ...`)
   - **Step 2 — Pass**: テストを通す最小限の実装（または既存コードの修正）を行いコミットする。 (`feat/fix/test: implement ... to pass tests`)
   - **Step 3 — Refactor**: コード整理・リファクタリング、ビルド確認後にコミットする。 (`refactor: ...`)
2. **コミットの義務とトークン消費抑制**:
   無駄なループを防ぐため、1つのテストファイル（または1つの小さなテストケース群）ごとに実装と検証を終えること。ユーザーがコミットを明示的に認可している場合だけ、その都度 `git add` と `git commit` を行って進捗を確定させてから、次のテスト作成に進むこと。未認可ならコミット可能な状態で停止すること。
3. **個人情報 (PII) の排除**:
   追加・作成するテストコードやドキュメントには、絶対パス（例: `/Users/username/...`）などの個人を特定できる情報を含めず、常にリポジトリ相対パスや環境依存しない形式で記述すること。
4. **次フェーズ候補（🟢 P3: 残課題）**:
   - **CI 統合**: `.github/workflows/` を追加し、`bun run test` / `bun run test:e2e` / `bun run test:perf` / `bun run test:security` を PR ゲートとして自動実行する。
   - **Smoke テスト拡充**: 「2. ドメイン別カバレッジマトリクス」で全ドメインが ❌ 0% の Smoke 列を埋めるため、各ドメインのトップページに対する軽量レンダリングテストを追加する。
   - **Integration テスト導入**: ドメインごとの「ナビ → セクション遷移」「ScrollSpy → SectionNav 連動」等のコンポーネント間連携テストを Vitest + Testing Library で追加する。
   - **Unit カバレッジ底上げ**: CDL（13%）/ GCL（21%）/ DevNet（10%）の未カバーコンポーネントから優先的に追加する。具体的ターゲットは「5. 主な未カバーソースファイル一覧」を参照。
   - **Performance バジェットのチューニング**: `e2e/perf-budgets.json` の初期バジェット値は、本番ビルドの実測値に基づいて段階的に引き締め調整されました（LCP: 3000ms, CLS: 0.1, TBT: 200ms）。

開始時は上記候補からひとつを選び、対応する優先度ラベル（🟢 P3）と「Smoke / Integration / Unit / CI / Perf チューニング」のどのトラックかを宣言してから着手してください。
