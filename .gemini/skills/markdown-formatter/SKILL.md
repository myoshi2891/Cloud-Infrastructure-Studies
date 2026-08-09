---
name: infra-markdown-formatter
description: >
  Comprehensive guide and rules for formatting Markdown files in the Infra repository to comply with the project's `.markdownlint.json` configuration.
  Addresses common errors like MD031, MD022, MD032, and MD047.
  Trigger: Markdownリント, markdownlint, markdown formatting, MD031, MD022, blanks-around-fences, blanks-around-headers, MD047.
---

# Infra Markdown Formatting & Linting Guide

(最終更新日: 2026-08-09)

## Goal

This skill provides rules and best practices to ensure all Markdown documents (`.md` files) in the Infra repository comply with the project's strict `.markdownlint.json` rules, preventing CI/CD build breakages due to markdown lint errors.

<!-- markdownlint-disable MD031 MD022 MD032 -->

## 頻発する Markdown Lint エラーと修正パターン

### 1. MD031: blanks-around-fences (コードブロック前後の空行)

**問題**: ``` で囲まれたコードブロックの直前または直後に空行（改行）がない。特にリストの直下にネストされているコードブロックで多発します。

#### ❌ 違反例
````markdown
- **tests/lib/navigation.test.ts**:
  - `NAV_ITEMS` の総数を検証します。
  ```typescript
  expect(NAV_ITEMS).toHaveLength(25);
  ```
````

#### ✅ 修正例
リストのネスト内であっても、コードブロックの前後に**インデントされた空行**を挿入します。

````markdown
- **tests/lib/navigation.test.ts**:
  - `NAV_ITEMS` の総数を検証します。

  ```typescript
  expect(NAV_ITEMS).toHaveLength(25);
  ```
````

---

### 2. MD022: blanks-around-headers (見出し前後の空行)

**問題**: 見出し（`#`, `##`, `###` など）の直前または直後に空行がない。

#### ❌ 違反例
```markdown
## セクションタイトル
本文テキストがすぐに始まります。
```

#### ✅ 修正例
見出しの上下には必ず1行の空行を挟んでください。

```markdown
## セクションタイトル

本文テキストがすぐに始まります。
```

---

### 3. MD032: blanks-around-lists (リスト前後の空行)

> [!NOTE]
> **※本ルールは現在 `.markdownlint.json` で無効化（`"MD032": false`）されています。** そのため、本プロジェクトではリスト前後の空行エラーによるビルド失敗は発生しませんが、可読性向上のために空行を挟むことを推奨します。

**問題**: 箇条書きリスト（`-`, `*`, `1.` など）の直前または直後に空行がなく、通常のパラグラフテキストと連結している。

#### ❌ 違反例
```markdown
以下の手順に従ってください。
- ステップ 1
- ステップ 2
完了したら報告します。
```

#### ✅ 修正例
リストブロックの前後には必ず空行を挟んでください。

```markdown
以下の手順に従ってください。

- ステップ 1
- ステップ 2

完了したら報告します。
```

---

### 4. MD047: single-trailing-newline (ファイル末尾の改行)

**問題**: ファイルの最終行の末尾に改行文字（LF）がない。

#### ❌ 違反例
```markdown
...最後の行の文章（ファイルの末尾に改行がない状態）[EOF]
```

#### ✅ 修正例
ファイルの最後は必ず1行の空行（改行で終わる状態）にしてください。

```markdown
...最後の行 of the text
[EOF]
```

---

### 5. MD012: no-multiple-blanks (連続した空行)

**問題**: 2行以上の連続した空行が記述されている。

#### ❌ 違反例
```markdown
パラグラフ1


パラグラフ2（空行が2行以上挟まれている）
```

#### ✅ 修正例
空行は常に「最大1行」としてください。

```markdown
パラグラフ1

パラグラフ2
```

---

### 6. MD033: no-inline-html (インラインHTMLの禁止)

**問題**: Markdown 内に `<br>`, `<img>`, `<a>` などの HTML タグが直接書かれている。

* **例外**: プロジェクトで意図的に HTML レンダリングする特定のダッシュボードやスライドコンポーネント用ファイル（例: `docs/coverage-dashboard.html`、またはマークダウン内で特別に許可されたアコーディオン等）を除き、原則として標準の Markdown 記法を使用してください。
* **改行の代替案**: 行末に 2 つのスペースを入れる（ダブルスペース改行）、または新しいパラグラフ（空行を挟む）として分割してください。

---
<!-- markdownlint-enable MD031 MD022 MD032 -->

## ワークフロー (検証と修正の手順)

AI エージェントは Markdown ファイルを新規作成・修正した際、コミットする前に必ず以下の手順を実行しなければなりません。

### Step 1: 自動整形スクリプトの実行（初期修正）

プロジェクトに用意されている自動フォーマットスクリプトを実行し、基本的な見出し前後の空行や末尾改行などを自動的に一括修正します。

```bash
bun scripts/format-markdown.mjs <file_path>
```

> [!NOTE]
> `scripts/format-markdown.mjs` は MD022, MD012, MD047 のルールを自動で修正しますが、リストの内部にあるネストされたコードブロック等の MD031 (blanks-around-fences) については自動修正の対象外です。これらは手動で修正を行い、`git diff` で変更点を確認する必要があります。

<!-- -->

> [!CAUTION]
> **手動優先ルール**: 自動整形スクリプトは便利ですが、リスト内のネストされたコードブロックなど複雑な構造で意図しない崩れを起こす可能性があります。自動整形を実行した後は、必ず `git diff` で意図しない変更が加えられていないかを確認し、必要に応じて手動で微調整を行ってください。

### Step 2: Linter による検証

次に、プロジェクトの `.markdownlint.json` に従って固定版の Linter を実行し、残存するエラーがないかを確認します。

```bash
bun run markdownlint -- <file_path>
```

エラーが出力されなくなるまで、手動でマークダウンを修正します。

### Step 3: PII の機械的検証

変更したファイルを Git にステージング（`git add`）した後、リポジトリのセキュリティ規則（`no-absolute-paths.md`）に基づき、絶対パスや PII が含まれていないか必ず検証します。

```bash
mac_home='/''Users/'
linux_home='/''home/'
windows_home='C:\\''Users\\'
tilde_home='~''/'
env_home='[$]''HOME/'
local_path_pattern="(${mac_home}|${linux_home}|${windows_home}|${tilde_home}|${env_home})"
email_pattern='[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}'
pii_pattern="(${local_path_pattern}|${email_pattern})"
staged_diff=$(mktemp) || exit 1
trap 'rm -f "$staged_diff"' EXIT
if ! git diff --cached > "$staged_diff"; then
  echo 'ステージ差分を取得できません。コミットを中止します。' >&2
  exit 1
fi
grep -E "^\+[^+].*$pii_pattern" "$staged_diff"
path_check_status=$?
if [ "$path_check_status" -eq 0 ]; then
  echo 'ローカル絶対パスまたは PII が検出されました。コミットを中止します。' >&2
  exit 1
elif [ "$path_check_status" -ne 1 ]; then
  echo '絶対パスまたは PII の検出処理に失敗しました。コミットを中止します。' >&2
  exit 1
fi
```

一致があればエラーとしてコミットを中止する。`grep` の終了コード 1 だけを「一致なし」として許可し、差分取得または検出処理の失敗時はコミットを中止する。
