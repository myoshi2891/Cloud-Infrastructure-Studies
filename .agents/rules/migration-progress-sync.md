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
implementation_head=$(git rev-parse --short HEAD)
```

`implementation_head` は進捗ファイルを編集する前の最新実装コミットであり、後続の進捗同期コミットとは区別する。

### 2. `MIGRATION_PROGRESS.md` を更新

更新対象フィールド:

| フィールド | 更新内容 |
|---|---|
| `最新実装 HEAD` | 進捗ファイル編集前に保存した `implementation_head` + 実装コミットメッセージ要約 |
| `最新進捗同期コミット` | 直前に完了した進捗同期コミット。新しい同期コミット作成後に `git rev-parse --short HEAD` で別途取得し、次回同期時の監査基準として扱う |
| `次の作業` | 次セッションで **最初に** 取り掛かるページ（例: `Gcp-ace-complete-advanced-guide.html 移行`） |
| `ビルド状態` | `bun run build` / `bun run lint` の最新状態 |

### 3. `## 次回セッションでの再開プロンプト` を同期

`現在地` の値と一致するように再開プロンプト内の以下を書き換える:

- `最新実装 HEAD: <hash>` の値（`implementation_head` と一致）
- `最新進捗同期コミット: <hash>` の値（前回の進捗同期コミットと一致）
- `次の作業:` の説明（ページ粒度で具体的に）
- 未移行 HTML の残数

### 4. コミット

```bash
git status --short
git add MIGRATION_PROGRESS.md
git diff --cached -- MIGRATION_PROGRESS.md
git commit -m "chore(docs): update MIGRATION_PROGRESS.md — <作業内容の1行要約>"
progress_sync_commit=$(git rev-parse --short HEAD)
```

`progress_sync_commit` は作成した進捗同期コミットの識別子として実行結果・引き継ぎに記録し、`最新実装 HEAD` を上書きしない。

## 禁止

- HEAD 値をコミットせず新セッションに引き継ぐ（ズレが発生する）
- 再開プロンプトと `現在地` が食い違ったままコミットする
- ビルドエラーが残ったままコミットする
