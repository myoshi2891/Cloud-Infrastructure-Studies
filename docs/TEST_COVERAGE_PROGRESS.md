# テストカバレッジ・網羅性進捗レポート

[coverage-dashboard.html](coverage-dashboard.html)（2026年5月21日作成）のデータを基に、現在のテスト網羅性と進捗状況を整理したレポートです。

---

## 1. 全体サマリー

プロジェクト全体のテストカバレッジとリソース状況は以下の通りです。

- **ソースファイル総数:** 177 ファイル
- **テストカバー済みソース数:** 60 ファイル
- **全体カバレッジ達成率:** **34%**
- **テストファイル総数:** 65 ファイル (Vitest 4.x + Playwright 1.x)

---

## 2. ドメイン別カバレッジマトリクス

各試験対策ページおよび共通モジュールのテストカテゴリ別の網羅状況です。

| ドメイン | 進捗 (カバー数/総数) | 達成率 | Unit | Integration | E2E | Smoke | Visual | A11y | Perf | Security |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Associate Cloud Engineer (ACE)** | 6 / 14 | **43%** | ⚠️ 43% | ❌ 0% | ⚠️ 7% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |
| **Generative AI Leader (GCL)** | 5 / 19 | **26%** | ⚠️ 26% | ❌ 0% | ⚠️ 5% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |
| **Cloud Digital Leader (CDL)** | 21 / 107 | **20%** | ⚠️ 20% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |
| **Google Workspace Admin (AGWA)** | 0 / 0 | **0%** | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |
| **Professional Cloud Network Engineer (PCNE)** | 10 / 11 | **91%** | ✅ 91% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |
| **PCNE Step-by-Step** | 6 / 9 | **67%** | ⚠️ 67% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |
| **共通 (components / lib / navigation)** | 9 / 11 | **82%** | ⚠️ 64% | ⚠️ 36% | ⚠️ 9% | ⚠️ 9% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% |

> **凡例:**
> - ✅ **実装済み**: 80% 以上カバー
> - ⚠️ **部分的**: 0%〜80% 未満カバー
> - ❌ **未実装**: 対応テスト 0 件
>
> *(※ AGWAについてはソースコードが存在するものの、カバレッジ集計設定やテスト自体の未整備によりダッシュボード上は 0/0 (0%) と表現されています。)*

---

## 3. テストカテゴリ別の網羅性と課題

### ① Unit（単体テスト）
- **現状**: PCNE（91%）や共通（64%）、PCNE Step-by-Step（67%）など、比較的新しい移行セクションでは TDD 開発ルールに従って単体テストが整備されています。しかし、CDL（20%）や GCL（26%）はセクション数が多く、大半のコンポーネントが単体テスト未カバーです。
- **課題**: 移行元の HTML から復元されたコンポーネントや追加コンポーネントのテストカバレッジ底上げが必要です。

### ② Integration（結合テスト）
- **現状**: 共通ロジックである `lib/navigation.test.ts`, `lib/recentPages.test.ts`, `lib/utils.test.ts` の 3 件が部分的（36%）にカバーされています。
- **課題**: 試験ドメインごとのコンポーネント間連携（例: `navigation` から各セクションページへの遷移ロジック）を検証する結合テストが全ドメインで未実装です。

### ③ E2E（エンドツーエンドテスト）
- **現状**: ACE（7%）、GCL（5%）、共通（9%）で Playwright による基本的なナビゲーションフローがカバーされているのみです。
- **課題**: 主要なユーザー導線や、アコーディオン・スクロールスパイ・ドロワー開閉などのインタラクティブ操作が完全にカバーされていません。

### ④ Smoke（スモークテスト）
- **現状**: `__tests__/smoke.test.tsx` の 1 件のみ。
- **課題**: 各ドメインがビルド後に正常に描画できるかを検証する軽量なスモークテストが不足しています。

### ⑤ 横断品質（Visual, A11y, Performance, Security）
- **現状**: 全 7 ドメインで完全に **❌ 未実装** です。
- **課題**: 表示崩れを防ぐためのビジュアルテストや、アクセシビリティ要件（a11y）、Lighthouse 等を用いたパフォーマンス測定、`npm audit` 等のセキュリティチェックが自動テストパイプラインに組み込まれていません。

---

## 4. 優先度別ネクストアクション

ダッシュボードで推奨されている優先度順のタスクリストです。

### 🔴 P0: 最優先タスク (完了)
- [x] **共通 / lib カバレッジ補強**
  - **対象**: `lib/utils.ts`, `lib/navigation.ts`, `lib/recentPages.ts`
  - **内容**: 主要ユーティリティの回帰防止のため、Integration/Unit テストを追加。
  - **推奨ツール**: Vitest

### 🟡 P1: 重要タスク（ドメイン品質・E2E）
- [ ] **`cloud-digital-leader` クリティカルパス E2E テストの作成**
  - **内容**: 主要セクションのユーザー導線自動回帰検出用テスト。
  - **推奨ツール**: Playwright
- [ ] **`pcne` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [ ] **`pcne-step` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [ ] **`agwa` ページ単体テストの追加**
  - **推奨ツール**: Vitest + React Testing Library
- [ ] **`agwa` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright

### 🔵 P2: 横断品質の導入検討
- [ ] **Visual 回帰テストの導入**
  - **対象**: 全ドメインの主要ページ
  - **内容**: レンダリング崩れ（特にダークモードやレスポンシブ表示）の自動検知。
  - **推奨ツール**: Playwright (`toHaveScreenshot`)
- [ ] **A11y (アクセシビリティ) 自動テストの導入**
  - **内容**: `aria-label` の欠損やコントラスト比不足などの WCAG 違反の自動監視。
  - **推奨ツール**: `@axe-core/playwright`
- [ ] **Performance テストの導入**
  - **内容**: バンドルサイズ肥大化や LCP の劣化検知。
  - **推奨ツール**: Lighthouse CI
- [ ] **Security テストの導入**
  - **内容**: 依存パッケージの脆弱性自動検知。
  - **推奨ツール**: `npm audit` / `Snyk`

---

## 5. 主な未カバーソースファイル一覧（抜粋）

カバレッジ向上のターゲットとなる主な未カバーファイルです。

- **AGWA (Google Workspace Admin)**
  - `app/gcl/agwa/page.tsx`
  - `app/gcl/agwa/ScrollSpy.tsx`
  - `app/gcl/agwa/section1/page.tsx`
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
現在、[docs/TEST_COVERAGE_PROGRESS.md](TEST_COVERAGE_PROGRESS.md) にまとめられた「4. 優先度別ネクストアクション」に基づき、テスト整備タスクをステップバイステップで実装する必要があります。

以下の要件を厳守して実装を進めてください。
1. **TDD（テスト駆動開発）の厳格な遵守**:
   `.claude/rules/TDD_COMMIT_WORKFLOW.md` のルールに従い、必ず以下の 3 ステップを繰り返してください。
   - **Step 1 — Fail**: まずテストコードを作成し、失敗（Fail）することを確認してコミットする。 (`test: add failing tests for ...`)
   - **Step 2 — Pass**: テストを通す最小限の実装（または既存コードの修正）を行いコミットする。 (`feat/fix/test: implement ... to pass tests`)
   - **Step 3 — Refactor**: コード整理・リファクタリング、ビルド確認後にコミットする。 (`refactor: ...`)
2. **コミットの義務とトークン消費抑制**:
   無駄なループを防ぐため、1つのテストファイル（または1つの小さなテストケース群）ごとに実装と検証を終え、その都度 `git add` と `git commit` を行って進捗を確定させてから、次のテスト作成に進むこと。
3. **個人情報 (PII) の排除**:
   追加・作成するテストコードやドキュメントには、絶対パス（例: `/Users/username/...`）などの個人を特定できる情報を含めず、常にリポジトリ相対パスや環境依存しない形式で記述すること。
4. **対象優先度**:
   「4. 優先度別ネクストアクション」に定義された **🟡 P1**（CDL, PCNE, AGWAのE2E / 単体テスト追加）へと進めてください。

それでは、次に優先度の高い **🟡 P1: クリティカルパス E2E テストおよび単体テスト** の整備から作業を開始してください。
