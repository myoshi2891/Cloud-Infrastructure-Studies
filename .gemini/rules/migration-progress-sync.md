---
paths:
  - "app/**/*.tsx"
  - "app/**/*.css"
  - "MIGRATION_PROGRESS.md"
---

# MIGRATION_PROGRESS.md セッション終了前同期ルール

(最終更新日: 2026-08-09)

HTML → Next.js 移行セッションでは、**コンテキストが逼迫する前に**必ず以下を実施してセッションを終えること。

## 実行タイミング

<ai_agent_directive>
**AI エージェントへの厳格な指示**: このプロトコルは提案ではなく絶対的な**ゲート条件（Gate Condition）**です。
コミットはリポジトリの単一コミット認可方針と `.agents/rules/tdd-commit-workflow.md` に従い、ユーザーの依頼がコミットを明示または許可している場合にのみ実行してください。コミット前に `git status --short` と `git diff` を確認し、実装コミットには関連コードだけ、進捗同期コミットには関連する進捗ファイルだけを含めます。追加の認可が必要な場合に自律コミットしてはなりません。
</ai_agent_directive>

### 必須（毎ページ・例外なし）

**1ページの `git commit` 完了直後、次の HTML を `Read` し始める前に即実施する。**

これは任意の「区切り」ではなく、次ページ読み込みのための**ゲート条件**。
`MIGRATION_PROGRESS.md` が未コミットの状態で次の HTML を読み始めることは禁止。

### 追加トリガー

- コンテキスト消費が大きくなってきた
- ユーザーが新セッション開始を示唆
- ユーザーが「セッション終了」「仕様書更新して」と言った

## 手順

### 1. ビルド確認

```bash
bun run build   # ビルド成功を確認
bun run lint    # ESLint エラーなし
if ! progress_status=$(git status --short); then
  echo 'worktree の状態を取得できません。進捗同期を中止します。' >&2
  exit 1
fi
if [ -n "$progress_status" ]; then
  echo '進捗同期前に worktree をクリーンにしてください。' >&2
  exit 1
fi
if ! implementation_head=$(git rev-parse --short HEAD); then
  echo '最新実装 HEAD を取得できません。進捗同期を中止します。' >&2
  exit 1
fi
```

`implementation_head` は進捗ファイルを編集する前の最新実装コミットであり、後続の進捗同期コミットとは区別する。

### 2. `MIGRATION_PROGRESS.md` を更新

更新対象フィールド:

| フィールド | 更新内容 |
|---|---|
| `最新実装 HEAD` | 進捗ファイル編集前に保存した `implementation_head` + 実装コミットメッセージ要約 |
| `前回進捗同期コミット` | 今回の更新前に完了していた直前の進捗同期コミット。新しい同期コミット自身の値ではなく、次回同期時に前回値として更新する |
| `次の作業` | 次セッションで **最初に** 取り掛かるページ（例: `Gcp-ace-complete-advanced-guide.html 移行`） |
| `ビルド状態` | `bun run build` / `bun run lint` の最新状態 |

### 3. `## 次回セッションでの再開プロンプト` を同期

`現在地` の値と一致するように再開プロンプト内の以下を書き換える:

- `最新実装 HEAD: <hash>` の値（`implementation_head` と一致）
- `前回進捗同期コミット: <hash>` の値（今回の更新前に完了していた直前の進捗同期コミットと一致）
- `次の作業:` の説明（ページ粒度で具体的に）
- 未移行 HTML の残数

編集後、変更が `MIGRATION_PROGRESS.md` だけであることを確認する:

```bash
if ! progress_status=$(git status --short); then
  echo 'worktree の状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
if [ "$progress_status" != ' M MIGRATION_PROGRESS.md' ]; then
  echo 'MIGRATION_PROGRESS.md 以外の変更が含まれています。' >&2
  exit 1
fi
```

### 4. コミット

```bash
if ! git status --short; then
  echo 'worktree の状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
if ! git add MIGRATION_PROGRESS.md; then
  echo '進捗ファイルをステージできません。コミットを中止します。' >&2
  exit 1
fi
if ! git diff --cached -- MIGRATION_PROGRESS.md; then
  echo 'ステージ差分を取得できません。コミットを中止します。' >&2
  exit 1
fi
if ! git commit -m "chore(docs): update MIGRATION_PROGRESS.md — <作業内容の1行要約>"; then
  echo '進捗同期コミットを作成できません。後続処理を中止します。' >&2
  exit 1
fi
if ! new_progress_sync_commit=$(git rev-parse --short HEAD); then
  echo '作成した進捗同期コミットを取得できません。後続処理を中止します。' >&2
  exit 1
fi
```

各 Git 操作が失敗した場合は、その時点で編集・記録・後続処理を中止する。`new_progress_sync_commit` は `git commit` が成功した直後の `HEAD` を取得できた場合にのみ代入し、失敗前の古い `HEAD` を流用しない。今回作成した進捗同期コミットの識別子として実行結果・引き継ぎに記録し、今回コミットした `前回進捗同期コミット` や `最新実装 HEAD` を上書きしない。次回の進捗同期時に、この値を `前回進捗同期コミット` として記録する。

## 禁止

- HEAD 値をコミットせず新セッションに引き継ぐ（ズレが発生する）
- 再開プロンプトと `現在地` が食い違ったままコミットする
- ビルドエラーが残ったままコミットする
