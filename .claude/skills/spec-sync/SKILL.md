---
name: spec-sync
description: Audit and update all repository specifications (CLAUDE.md, GEMINI.md, README.md, MIGRATION_PROGRESS.md) as well as test execution progress, coverage dashboards, and next-session restart prompts inside docs/TEST_COVERAGE_PROGRESS.md. **Must be invoked at the end of every P-level priority task or multi-commit phase** (see Section F — "Definition of Done") to prevent spec drift. Triggered on (日本語): "仕様書更新", "仕様書同期", "ドキュメント更新", "テスト進捗の同期", "テストカバレッジ同期", "テストドキュメント更新", "テスト進捗更新", "フェーズ完了", "Pレベル完了", "P0完了", "P1完了", "P2完了", "P3完了". Triggered on (English): "sync specs", "spec sync", "update specs", "audit specs", "sync documentation", "update docs", "sync test progress", "update test coverage", "test coverage sync", "test docs sync", "phase complete", "phase completion", "P-level complete", "P0 complete", "P1 complete", "P2 complete", "P3 complete", "definition of done", "DoD check".
---

# 仕様書・テスト進捗同期スキル (spec-sync)

**🚨 開発時の必須ルール（TDD & Step-by-step Commit） 🚨**
仕様書の更新やテスト進捗の更新作業においても、対応するコード修正（実装やテスト修正）を伴う場合は必ず `.claude/rules/TDD_COMMIT_WORKFLOW.md` のステップバイステップ・コミットルールに従うこと。

## 目的

機能追加・リファクタ・テスト実装後に生じる、仕様書・テスト進捗管理ドキュメントと実コードの乖離を検出し、すべての関連ドキュメントを最新の現状に合わせて漏れなく更新する。

---

## 対象仕様書・進捗ドキュメントと更新トリガー

| ファイル | 役割 | 更新が必要な変更 |
|---|---|---|
| `CLAUDE.md` | Claude Code 向け主仕様（アーキテクチャ・制約・コマンド） | アーキテクチャ変更、新ファイル追加、制約変更、試験追加 |
| `GEMINI.md` | Gemini CLI 向け主仕様（同等内容） | CLAUDE.md と同期して更新 |
| `.gemini/rules/migration-progress-sync.md` | Gemini 向け作業状況 | HEAD・テスト数・完了状況変更時 |
| `README.md` | ユーザー向け概要 | 新機能追加、試験追加、UI パターン変更 |
| `.claude/skills/md-to-nextjs-migration/SKILL.md` | MD→Next.js 移行ワークフロー | ナビ追加フロー変更、新ディレクトリ規約 |
| `.claude/skills/html-to-nextjs-migration/SKILL.md` | HTML→Next.js 移行ワークフロー | 同上 |
| `MIGRATION_PROGRESS.md` | 移行進捗（単一の正本） | 各ステップ完了時 |
| `docs/TEST_COVERAGE_PROGRESS.md` | テストカバレッジ・実装進捗状況の管理 | テストの実装、カバレッジの変化、ネクストアクション完了時 |
| `docs/coverage-dashboard.html` | カバレッジダッシュボード（HTML形式） | テストの実装、カバレッジ変化時（スクリプト実行による自動生成） |

---

## 機能追加・テスト実装カテゴリ別チェックリスト

### A. 新試験を追加した場合

**変更対象ファイル:**
1. `app/constants.ts` — `EXAMS` に `Exam` エントリ追加（これが正本、他は自動反映）
2. `app/globals.css` — `icon-theme-<id>` ユーティリティ追加

**仕様書更新:**
- [ ] `CLAUDE.md` のプロジェクト概要に試験名を追記
- [ ] `GEMINI.md` の プロジェクト構造に追記
- [ ] `README.md` の特徴セクションに追記
- [ ] `MIGRATION_PROGRESS.md` の「現在地」テスト数・HEAD を更新
- **触らないもの**: `components/Header.tsx`（toNavTree が自動反映）

### B. アーキテクチャ・データフローを変更した場合

**仕様書更新:**
- [ ] `CLAUDE.md` のアーキテクチャツリー（`app/` 配下のファイル一覧）を更新
- [ ] `CLAUDE.md` の制約事項セクションに変更内容を反映
- [ ] `GEMINI.md` のプロジェクト構造・注意事項を同期
- [ ] `.claude/skills/md-to-nextjs-migration/SKILL.md` の「新ページ追加時の手順」を更新
- [ ] `README.md` の特徴セクション（技術的変化が大きい場合のみ）

### C. 新ページ・新セクションを追加した場合

**仕様書更新:**
- [ ] `CLAUDE.md` のアーキテクチャツリーに `page.tsx` パスを追記
- [ ] `GEMINI.md` の `/app` 構造に追記
- [ ] `MIGRATION_PROGRESS.md` に完了済みステップとして記録
- [ ] `MIGRATION_PROGRESS.md` の「現在地」テスト数・HEAD を更新

### D. コンポーネントの制約を変更した場合

例: `Header.tsx` のインタフェース変更、`DisclaimerBanner.tsx` の制約変更など

**仕様書更新:**
- [ ] `CLAUDE.md` の制約事項セクションを更新
- [ ] `GEMINI.md` の注意事項を同期
- [ ] 関連スキルの SKILL.md を更新（手順に影響する場合）

### E. テスト構成・コマンドを変更した場合

**仕様書更新:**
- [ ] `CLAUDE.md` のテスト構成セクション
- [ ] `CLAUDE.md` のコマンドセクション
- [ ] `GEMINI.md` の「開発と実行」セクション
- [ ] `README.md` の「テストの実行」セクション

### F. テストの実装・整備を行った場合（P レベル・フェーズ完了時の Definition of Done）

`.claude/rules/TDD_COMMIT_WORKFLOW.md` Step 3 から強制呼び出しされる、**フェーズ完了時に「漏れなく」更新する全ファイル一覧**。単発の Step 3 で `CLAUDE.md` だけ触って終わらせるのは禁止。以下を 1 フェーズ内で確定させること。

**変更対象ファイルと観点:**

1. **`docs/coverage-dashboard.html`** — `bun run dashboard` で再生成（手書き禁止）
2. **`docs/TEST_COVERAGE_PROGRESS.md`** — 以下 5 セクションを必ず確認
   - Section 1: 全体サマリー（ソース総数 / カバー済み / 達成率 / テストファイル総数）
   - Section 2: ドメイン別カバレッジマトリクス（該当列の `❌ 0%` → `✅ 実装` 等を更新）
   - Section 3: テストカテゴリ別の網羅性と課題（現状/課題文を新事実に合わせて書き換え）
   - Section 4: 優先度別ネクストアクション（完了タスクを `[ ]` → `[x]` 化、説明補強）
   - **Section 7: 次回セッションでのテスト追加再開プロンプト**（完了した優先度の表記を「P0/P1/P2 完了済み」等に更新し、次フェーズ候補を列挙。**ここを更新し忘れると次セッションで重複作業や混乱が発生するため最重要**）
3. **`MIGRATION_PROGRESS.md`** — 「次のステップ」の `- [ ] 🔵 P*: ...` 行を `[x]` 化し、導入したコマンド・スクリプトの実体（パスやコマンド名）を子要素として追記
4. **`CLAUDE.md`** — コマンドセクション（`## コマンド` 配下の `bash` ブロック）、アーキテクチャツリー、制約事項を必要に応じて更新
5. **`GEMINI.md`** — `CLAUDE.md` と内容同期。特に「開発と実行」セクションの bullet 一覧に新コマンドを追記（`CLAUDE.md` だけ更新して `GEMINI.md` を放置するパターンが頻発するため必ず対で更新）
6. **`README.md`** — ユーザー向け「テストの実行」等のセクションに新コマンドサブセクションを追記（軽微な変更で省略可だが、新コマンドや新フェーズ完了時は追記推奨）

**整合性チェック（コミット前に必ず実行）:**

P レベル・フェーズキーワード（例: `P2`, `Performance テスト`, `Security テスト`, `横断品質` 等）が全 spec で同じ完了状態を指しているか、横断 grep で確認する:

```bash
# 完了したフェーズのキーワードで横断 grep（例: P2 横断品質完了時）
grep -rn "P2\|横断品質" *.md docs/*.md .claude/rules/*.md .claude/skills/*/SKILL.md

# 出力された箇所すべてが「完了済み」「[x]」「✅」等の整合した表記になっていることを目視確認
# `[ ]` や「未実装」が残っていればその場で修正してからコミット
```

**コミット前検証コマンド:**

```bash
bun run lint
bun run build
bun run test
bun run dashboard   # coverage-dashboard.html 再生成
```

**コミット粒度:**

DoD の全対象を 1 つの `docs:` または `refactor/docs:` コミットにまとめて構わない。ただし以下の 2 コミットに分けるのが安全:

- (a) `docs: mark [P*] [機能名] as done and document scripts` — `TEST_COVERAGE_PROGRESS.md` の Section 4/2/3 + `CLAUDE.md` + `coverage-dashboard.html`
- (b) `docs: sync specs for [P*] [機能名] completion` — `TEST_COVERAGE_PROGRESS.md` Section 7 + `MIGRATION_PROGRESS.md` + `GEMINI.md` + `README.md`

(a) のみで止めると (b) が次セッションに繰り越され、結果として「再開プロンプトが古い」「進捗台帳が古い」状態を晒すため、**(a) を出したフェーズ内で必ず (b) まで到達すること**。

---

## 実行手順

### セクション 1: 汎用仕様書（CLAUDE.md / GEMINI.md 等）の同期手順

#### Step 1: 乖離検出

以下を確認して乖離箇所をリストアップする:

```bash
# 現在のファイルツリーを確認
find app -name "page.tsx" | sort
find app -name "constants.ts" | sort
find components -name "*.tsx" | sort
find e2e -name "*.spec.ts" | sort

# テスト数を確認
bun run test 2>&1 | grep "Tests"

# HEAD を確認
git log --oneline -1
```

#### Step 2: 各仕様書を読み込み、現状と比較

- `CLAUDE.md` のアーキテクチャツリーが実ファイルツリーと一致しているか
- `CLAUDE.md` の制約事項が現在のコードの挙動と一致しているか
- `GEMINI.md` が `CLAUDE.md` と内容が同期しているか
- `.gemini/rules/migration-progress-sync.md` の HEAD・テスト数が最新か

#### Step 3: 更新の優先順位

1. **CLAUDE.md** — Claude Code が毎回参照するため最優先
2. **GEMINI.md** — CLAUDE.md と同期して更新
3. **.claude/skills/\*/SKILL.md** — 手順が誤っていると誤った作業を引き起こすため優先
4. **.gemini/rules/** — Gemini 向け状態管理
5. **README.md** — ユーザー向け。大きな変化があれば更新、軽微なら省略可

#### Step 4: 更新後の確認とコミット

```bash
# lint・build で型エラーがないことを確認
bun run lint
bun run build

# 更新をコミット
git add CLAUDE.md GEMINI.md README.md \
  .gemini/rules/migration-progress-sync.md \
  .claude/skills/*/SKILL.md \
  MIGRATION_PROGRESS.md
git commit -m "docs(specs): sync all spec docs after <feature-name>"
```

### セクション 2: テスト進捗・カバレッジの同期手順

テストの実装やリファクタリングが終了した後は、以下の手順に従ってドキュメントおよびダッシュボードを同期します。

#### Step 1: カバレッジダッシュボードHTMLの再生成

テストファイルのスキャン結果を同期するため、以下のダッシュボード生成スクリプトを実行します。

```bash
bun scripts/generate-coverage-dashboard.mjs
```

実行ログを確認し、対象ソースコード数、カバー済みソースコード数、テストファイル数が正しく出力されていることを確認します。

#### Step 2: 最新の統計データ（JSON）の抽出

生成された `docs/coverage-dashboard.html` の末尾付近にある `id="dashboard-data"` の script タグから最新の統計情報を抽出します。

```html
<script type="application/json" id="dashboard-data">
{
  "totals": { "sources": 177, "covered": 60, "testFiles": 65 },
  "domains": [...]
}
</script>
```

#### Step 3: `docs/TEST_COVERAGE_PROGRESS.md` の更新

抽出したデータをもとに、以下のセクションを修正します。

1. **全体サマリー (Overall Summary)**
   - `ソースファイル総数`、`テストカバー済みソース数`、`全体カバレッジ達成率`、`テストファイル総数` を最新の値に更新します。
2. **ドメイン別カバレッジマトリクス (Domain Coverage Matrix)**
   - 変更があったドメインのカバレッジ率（テスト済数 / 総ファイル数、パーセンテージ）を更新します。
   - カバレッジ率が **80%** 以上に達した場合、ステータスアイコンを `⚠️` から `✅` (実装済み) に変更し、ドメイン名を太字にします。
3. **テストカテゴリ別の網羅性と課題**
   - ユニットテスト、結合テスト、E2Eテストなどの現在のカバレッジ状況や残課題のテキストを調整します。
4. **優先度別ネクストアクション**
   - 完了したテストタスクのチェックボックスを `[x]` に更新します。必要に応じてタスク説明や優先度を整理します。
5. **次回セッションでのテスト追加再開プロンプト**
   - 「4. 対象優先度」の記述を、完了した優先度（例: P0 ➔ P1）に応じて更新します。
   - プロンプトの最後にある、開始すべき推奨タスクを次に優先度の高いタスクへ切り替えます。

#### Step 4: 更新内容の確認とコミット

```bash
# 差分を確認
git diff docs/TEST_COVERAGE_PROGRESS.md docs/coverage-dashboard.html

# コミットを実行
git add docs/TEST_COVERAGE_PROGRESS.md docs/coverage-dashboard.html
git commit -m "docs: update test coverage dashboard and progress report for [Task/Priority] completion"
```

---

## 絶対に守るルール

1. **仕様書を実コードより先に更新しない** — コードが確定してから仕様書を合わせる
2. **CLAUDE.md の制約事項に「触らないもの」が書かれていたら、その制約自体も仕様書に反映する**
3. **テスト数は `bun run test` (または `vitest run`) を実行した実数を記録する**（推定値禁止）
4. **HEAD は `git log --oneline -1` で取得した実 commit hash を記録する**
5. **GEMINI.md と CLAUDE.md の内容は必ず同期する**（片方だけ更新しない）
6. **テストカバレッジ率が目標値 (80%) を超えたドメインは、ステータスを `⚠️` から `✅` に昇格し、太字で強調する。** (新規)
7. **次回セッションプロンプトの内容は、直近で完了した優先度 (P0, P1等) を反映し、次に開始すべきタスクを指すように更新する。** (新規)
8. **カバレッジダッシュボードから抽出した JSON 統計データと、ドキュメントに記載する数値を完全に一致させる（目測や推定による記述は禁止）。** (新規)
