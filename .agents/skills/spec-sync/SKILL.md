---
name: spec-sync
description: Audit and update all repository specifications (CLAUDE.md, GEMINI.md, README.md, MIGRATION_PROGRESS.md) as well as test execution progress, coverage dashboards, and next-session restart prompts inside docs/TEST_COVERAGE_PROGRESS.md. **Must be invoked at the end of every P-level priority task or multi-commit phase** (see Section F — "Definition of Done") to prevent spec drift. Triggered on (日本語): "仕様書更新", "仕様書同期", "ドキュメント更新", "テスト進捗の同期", "テストカバレッジ同期", "テストドキュメント更新", "テスト進捗更新", "フェーズ完了", "Pレベル完了", "P0完了", "P1完了", "P2完了", "P3完了". Triggered on (English): "sync specs", "spec sync", "update specs", "audit specs", "sync documentation", "update docs", "sync test progress", "update test coverage", "test coverage sync", "test docs sync", "phase complete", "phase completion", "P-level complete", "P0 complete", "P1 complete", "P2 complete", "P3 complete", "definition of done", "DoD check".
---

# 仕様書・テスト進捗同期スキル (spec-sync)

(最終更新日: 2026-08-09)

**🚨 開発時の必須ルール（TDD & Step-by-step Commit） 🚨**
仕様書の更新やテスト進捗の更新作業においても、対応するコード修正（実装やテスト修正）を伴う場合は必ず `.agents/rules/tdd-commit-workflow.md` のステップバイステップ・コミットルールに従うこと。

## 目的

機能追加・リファクタ・テスト実装後に生じる、仕様書・テスト進捗管理ドキュメントと実コードの乖離を検出し、すべての関連ドキュメントを最新の現状に合わせて漏れなく更新する。

---

## 最終更新日（Last Updated）の記載ルール

すべての仕様書および進捗管理ドキュメントには、**更新を行った日付**を必ず明記し、いつ時点の仕様であるかを誰でも判断できるようにしなければなりません。

### 記載フォーマットと場所

各ドキュメントの以下の位置に、最終更新日を記載または更新してください：

| ドキュメント | 最終更新日の記載方法 | 記載・更新場所 |
|---|---|---|
| `CLAUDE.md` | `Updated YYYY-MM-DD` | ファイル冒頭付近 |
| `GEMINI.md` | `Updated YYYY-MM-DD` | ファイル冒頭付近 |
| `README.md` | `最終更新日: YYYY-MM-DD` | ファイル冒頭付近（見出しの直下） |
| `MIGRATION_PROGRESS.md` | `Updated YYYY-MM-DD`（現在地テーブル内） | 現在地テーブル内、または「最終 HEAD」欄 |
| `docs/TEST_COVERAGE_PROGRESS.md` | `最終更新日: YYYY-MM-DD` | ファイル冒頭付近 |
| `docs/coverage-dashboard.html` | `<time datetime="YYYY-MM-DD">YYYY-MM-DD</time>` | ヘッダーのメタ情報エリア（`Updated`）およびフッター |
| `.agents/AGENTS.md`、`.agents/rules/*.md`、各個別 `.agents/skills/*/SKILL.md` / `*.md` | `(最終更新日: YYYY-MM-DD)` または未移行HTMLリスト等の日付 | タイトル下、または進捗管理の日付欄。新規作成時から必須とし、既存ファイルは次回編集時に追記する |

---

## 対象仕様書・進捗ドキュメントと更新トリガー

| ファイル | 役割 | 更新が必要な変更 |
|---|---|---|
| `CLAUDE.md` | Claude Code 向け主仕様（アーキテクチャ・制約・コマンド） | アーキテクチャ変更、新ファイル追加、制約変更、試験追加 |
| `GEMINI.md` | Gemini CLI 向け主仕様（同等内容） | CLAUDE.md と同期して更新 |
| `README.md` | ユーザー向け概要 | 新機能追加、試験追加、UI パターン変更 |
| `MIGRATION_PROGRESS.md` | 移行進捗（単一の正本） | 各ステップ完了時、セッション終了時 |
| `docs/TEST_COVERAGE_PROGRESS.md` | テストカバレッジ・実装進捗状況の管理 | テストの実装、カバレッジの変化、ネクストアクション完了時 |
| `docs/coverage-dashboard.html` | カバレッジダッシュボード（HTML形式） | テストの実装、カバレッジ変化時（スクリプト実行による自動生成） |

---

## 機能追加・テスト実装カテゴリ別チェックリスト

### A. 新試験を追加した場合

**変更対象ファイル:**
1. `app/constants.ts` — `EXAMS` に `Exam` エントリ追加（これが正本、他は自動反映）
2. `app/globals.css` — `icon-theme-<id>` ユーティリティ追加
3. `app/<provider>/<exam>/page.tsx` — 新試験のルートページ追加。試験追加時の標準統合経路であり、自動生成ナビゲーションのリンク先を有効なルートとして保持する

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

`.agents/rules/tdd-commit-workflow.md` Step 3 から強制呼び出しされる、**フェーズ完了時に「漏れなく」更新する全ファイル一覧**。単発の Step 3 で `CLAUDE.md` だけ触って終わらせるのは禁止。以下を 1 フェーズ内で確定させること。

**変更対象ファイルと観点:**

1. **`docs/coverage-dashboard.html`** — `bun run dashboard` で再生成（手書き禁止）
2. **`docs/TEST_COVERAGE_PROGRESS.md`** — 以下 5 セクションを必ず確認
   - Section 1: 全体サマリー（ソース総数 / カバー済み / 達成率 / テストファイル総数）
   - Section 2: ドメイン別カバレッジマトリクス（該当列の `❌ 0%` → `✅ 実装` 等を更新）
   - Section 3: テストカテゴリ別の網羅性と課題（現状/課題文を新事合わせて書き換え）
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
grep -rn "P2\|横断品質" *.md docs/*.md .agents/rules/*.md .agents/skills/*/SKILL.md
```

---

## 監査・確認プロセス（「更新漏れがないか確認して」への対応）

ユーザーまたはシステムから「更新漏れがないか確認」の依頼を受けた際、またはセッション終了時には、以下の監査手順を実行し、すべての不整合を解消してください。

### 1. 現在のステータス情報の収集

以下のコマンドを実行し、プロジェクトの「実装・テストの実態値」を取得します。

```bash
# A. 最新の HEAD コミット値の取得
git log --oneline -5
git rev-parse --short HEAD

# B. 現在のNext.jsルート一覧の取得
find app -name "page.tsx" 2>/dev/null | sed 's|app/||' | sed 's|/page.tsx||'

# C. テストファイル実数の取得 (Vitest単体テスト)
find __tests__/ -name "*.test.ts" -o -name "*.test.tsx" 2>/dev/null | sort

# D. テスト実行結果の取得
set -o pipefail; bun run test 2>&1 | tail -5
bun run lint 2>&1 | tail -5
```

### 2. 監査チェックリスト

収集した実態値と、各仕様書の記述に乖離がないか検証します。

- [ ] **`CLAUDE.md` 監査**
  - [ ] `app/**/page.tsx` および `app/**/*.css` の全配置パスが `CLAUDE.md` の「アーキテクチャ」セクションに正しく記載されているか。
  - [ ] コマンド節のユニットテスト数などが現在の実測値と一致しているか。
  - [ ] 最終更新日のタイムスタンプが最新化されているか。
- [ ] **`GEMINI.md` 監査**
  - [ ] プロジェクト構造の Next.js ページ構成に、現在存在する全ページが漏れなく載っているか。
  - [ ] 最終更新日のタイムスタンプが最新化されているか。
- [ ] **`README.md` 監査**
  - [ ] 起動手順、テストの実行、定義に変更はないか。
  - [ ] 最終更新日のタイムスタンプが最新化されているか。
- [ ] **`MIGRATION_PROGRESS.md` 監査**
  - [ ] `最新実装 HEAD` が、進捗同期コミットの直前に保存した実装コミットと完全に一致しているか。
  - [ ] `前回進捗同期コミット` が、今回の更新前に完了していた直前の進捗同期コミットと完全に一致し、今回作成する同期コミットや `最新実装 HEAD` と混同されていないか。
  - [ ] `ビルド状態` の `bun run test` の pass 数が現在の実測値と一致しているか。
  - [ ] `## 次回セッションでの再開プロンプト` の `最新実装 HEAD`、`前回進捗同期コミット`、`テスト件数` が上記とそれぞれの意味で同期しているか。
  - [ ] 最終更新日（タイムスタンプ）が更新されているか。
- [ ] **`docs/TEST_COVERAGE_PROGRESS.md` 監査**
  - [ ] Section 1 の全体サマリーが、最新の `dashboard` スクリプト出力値と同期しているか。
  - [ ] ネクストアクション、再開プロンプトが最新状態になっているか。
  - [ ] 最終更新日のタイムスタンプが最新化されているか。
- [ ] **`docs/coverage-dashboard.html` 監査**
  - [ ] `DATA.pages` の配列件数と Next.js のルート件数が一致しているか。
  - [ ] メタ情報の `Updated` タイムスタンプが最新化されているか。

---

## 修正とコミット規約

監査の結果、1つでも乖離が検出された場合は**直ちに修正**し、以下の規約に従ってコミットしてください。

### コミットメッセージ

仕様書のみの同期更新のコミットには**ソースコードの変更を一切含めない**でください（TDD コミット分割ルール）。

```bash
# 1. 正本 .agents のルール・スキル変更を既存設定を保持したまま .gemini に同期
if ! rsync -a .agents/rules/ .gemini/rules/; then
  echo 'rules の同期に失敗しました。ステージやコミットへ進みません。' >&2
  exit 1
fi
if ! rsync -a .agents/skills/ .gemini/skills/; then
  echo 'skills の同期に失敗しました。ステージやコミットへ進みません。' >&2
  exit 1
fi

# 2. worktree とステージの変更対象が同期対象4ディレクトリだけであることを検証
allowed_sync_path() {
  case "$1" in
    .agents/rules/*|.agents/skills/*|.gemini/rules/*|.gemini/skills/*) return 0 ;;
    *) return 1 ;;
  esac
}
worktree_paths=$(mktemp) || exit 1
staged_paths=$(mktemp) || exit 1
trap 'rm -f "$worktree_paths" "$staged_paths"' EXIT
if ! git diff --name-only HEAD > "$worktree_paths"; then
  echo 'worktree 差分を取得できません。ステージやコミットへ進みません。' >&2
  exit 1
fi
if ! git ls-files --others --exclude-standard >> "$worktree_paths"; then
  echo '未追跡ファイルを取得できません。ステージやコミットへ進みません。' >&2
  exit 1
fi
while IFS= read -r changed_path; do
  allowed_sync_path "$changed_path" || {
    echo "同期対象外の worktree 変更があります: $changed_path" >&2
    exit 1
  }
done < "$worktree_paths"
if ! git add .agents/rules/ .agents/skills/ .gemini/rules/ .gemini/skills/; then
  echo '同期対象をステージできません。コミットへ進みません。' >&2
  exit 1
fi
if ! git diff --cached --name-only > "$staged_paths"; then
  echo 'ステージ対象の一覧を取得できません。コミットへ進みません。' >&2
  exit 1
fi
while IFS= read -r staged_path; do
  allowed_sync_path "$staged_path" || {
    echo "同期対象外のステージ差分があります: $staged_path" >&2
    exit 1
  }
done < "$staged_paths"
if ! git diff --cached; then
  echo 'ステージ差分を取得できません。コミットへ進みません。' >&2
  exit 1
fi

# 3. ユーザーが今回のコミットを明示的に認可した場合だけコミット
[ "${USER_AUTHORIZED_SPEC_COMMIT:-}" = 'yes' ] || {
  echo 'ユーザーの明示認可がないため、コミットしません。' >&2
  exit 1
}
if ! git commit -m "chore(docs): sync spec files — <具体的な更新理由や同期内容>"; then
  echo '仕様同期コミットに失敗しました。後続処理を中止します。' >&2
  exit 1
fi
```

`rsync`、変更範囲検証、`git add`、ステージ差分検証、ユーザー認可確認のいずれかが失敗した場合は即時停止し、部分同期のまま後続の Git 操作へ進まない。コミットはすべての同期・検証・Git 操作が成功した場合に限る。

---

## 自己監査・強制発火ルール (Enforcement & Gate Conditions)

エージェントは、以下のイベントが発生した際、ユーザーからの指示を待たずに**自律的かつ自動的**に本スキルを読み込み、同期・監査を実行しなければなりません。

### 1. 強制発火のトリガー条件

- **テストの追加・変更時**:
  - `__tests__/` 配下のファイルやアサーションを修正した直後、直ちに `coverage-dashboard.html` および `TEST_COVERAGE_PROGRESS.md` を同期・更新すること。
- **セッション開始・再開時**:
  - セッションが開始または compaction から再開された場合、最初のコミットを行う前に必ず「### 1. 現在のステータス情報の収集」の見出しのセクションに定義された実測コマンドを実行し、現行コードと仕様書の乖離（テスト数、Next.jsのルートなど）を自動検知して修正すること。
- **Markdown 編集時**:
  - ドキュメント同期のために Markdown ファイルを新規作成または編集した場合は、コミットする前に必ず `markdown-formatter/SKILL.md` スキルをロードし、そこに定義された手順に従ってリント検証を行い、エラーが 0 件であることを保証すること。

### 2. ゲート条件としてのドキュメント同期

- ドキュメント同期および自己監査は、ソースコードのビルド成功と全く同等の **「完了判定ゲート（Gate Condition）」** です。
- 仕様書・進捗管理ドキュメントに実態との不整合が1点でもある状態でのタスク完了報告は、**プロトコール違反（FAILED）** とみなされます。報告前に必ず本スキルの「監査チェックリスト」を上から順に自律実行してください。
