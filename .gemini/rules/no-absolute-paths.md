# リポジトリ内ファイルへの絶対パス記載禁止ルール

(最終更新日: 2026-08-09)

## ルール

コミット対象のファイル（ドキュメント、設定ファイル、コードのコメント等）に
ユーザー名を含む絶対パスを記載してはならない。

**禁止例**:

```text
/Users/<username>/.claude/plans/my-plan.md
/home/<username>/workspace/project/...
C:\Users\<username>\...
```

**許可例**:

```text
.claude/rules/my-rule.md        （リポジトリルートからの相対パス）
```

### ローカル環境でのみ参照する場合（コミット対象外）

`$HOME/.claude/plans/my-plan.md` などの環境変数を使用したパス表記は、ローカルの個人環境におけるホームディレクトリを示します。これらは共有・コミットされるドキュメントやコード内に含めると環境に依存するため、コミット対象のファイルから直接参照せず、リポジトリ相対パスへ置き換えます。
外部ファイルを参照したい場合は、後述の [外部ファイルを参照したい場合](#外部ファイルを参照したい場合) を確認し、リポジトリ配下にファイルをコピーした上で相対パスで参照してください。

## 適用対象

- `MIGRATION_PROGRESS.md` などのドキュメント
- `.claude/rules/` 内のファイル
- コードのコメント・JSDoc
- 設定ファイル（`.claude/settings.json` 等）

## 外部ファイルを参照したい場合

`$HOME/.claude/plans/` 等のリポジトリ外ファイルをコミット対象のドキュメントから
参照したい場合は、そのファイルを先にリポジトリ内（`.claude/plans/` 等）へコピーしてから
相対パスで参照する。

```bash
cp "$HOME/.claude/plans/some-plan.md" .claude/rules/some-plan.md
git add .claude/rules/some-plan.md
```

## 理由

絶対パスにはOS上のユーザー名が含まれ、パブリックリポジトリや
チームへのプッシュ時に個人情報を晒すリスクがある。

## AI エージェント向けの検証手順（必須）

AI エージェントは、`git commit` などのコミットを行う前に、必ずステージングされた変更差分（`git diff --cached`）に対して、ローカル絶対パスやユーザー名が含まれていないかを機械的に確認しなければなりません。

具体的には、コミット前に以下の検証用の検索コマンド（または同等の差分走査）を自律的に実行し、PII が混入していないことを検証してください。

```bash
# コミット対象の差分にローカル絶対パス（Users/、home/、チルダ形式）が含まれていないかチェック
# 例示用プレースホルダー文字列だけを除去した後、絶対パスが検出された場合はコミットを中止する
mac_home='/''Users/'
linux_home='/''home/'
windows_home='C:\\''Users\\'
tilde_home='~''/'
local_path_pattern="(${mac_home}|${linux_home}|${windows_home}|${tilde_home})"
staged_diff=$(mktemp) || exit 1
sanitized_diff=$(mktemp) || exit 1
trap 'rm -f "$staged_diff" "$sanitized_diff"' EXIT
if ! git diff --cached > "$staged_diff"; then
  echo 'ステージ差分を取得できません。コミットを中止します。' >&2
  exit 1
fi
if ! sed -E 's#/Users/<username>/##g; s#/home/<username>/##g; s#C:\\Users\\<username>\\##g' \
  "$staged_diff" > "$sanitized_diff"; then
  echo '絶対パス検出用の差分処理に失敗しました。コミットを中止します。' >&2
  exit 1
fi
grep -E "^\+[^+].*$local_path_pattern" "$sanitized_diff"
path_check_status=$?
if [ "$path_check_status" -eq 0 ]; then
  echo 'ローカル絶対パスが検出されました。コミットを中止します。' >&2
  exit 1
elif [ "$path_check_status" -ne 1 ]; then
  echo '絶対パス検出処理に失敗しました。コミットを中止します。' >&2
  exit 1
fi
```

このチェックで結果（追加行）が出力された場合は、該当箇所を削除または相対パスに変更し、クリーンであることを確認した上でコミットを実行してください。
