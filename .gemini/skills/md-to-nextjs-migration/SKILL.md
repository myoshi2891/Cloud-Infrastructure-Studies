---
name: infra-md-to-nextjs-migration
description: >
  Complete workflow for migrating Markdown study-guide content to Next.js App Router
  page.tsx in this repository (Infra). Covers the TDD workflow (constants.ts → page.tsx
  → test), JSX card structure, SVG attribute conversion, TypeScript strict mode pitfalls,
  and test-text matching rules. Extends the global md-to-nextjs-migration skill with
  project-specific knowledge: CSS class naming conventions, section component patterns,
  and the bun test runner.
  Trigger (日本語): MDマイグレーション, セクション移行, 学習コンテンツ追加, page.tsxにカードを追加,
  constants.tsに定数を追加, 試験対策コンテンツを実装, MDからNext.js, セクション実装,
  ファイルをNext.jsのアプリケーションに移行, Next.jsに移行して, 移行計画を立てて.
  Trigger (English): migrate to Next.js, migrate markdown to Next.js, migrate file to Next.js app,
  add section to Next.js, implement study content, migrate MD file, migrate exam content,
  add card to page.tsx, add constants to constants.ts, migrate to App Router.
---

# MD → Next.js 移行ワークフロー（Infra リポジトリ）

(最終更新日: 2026-08-10)

**🚨 開発時の必須ルール（TDD & Step-by-step Commit） 🚨**
全てのコード実装において、必ず `.agents/rules/tdd-commit-workflow.md` のルールに従うこと。
1. `test:` Red — 失敗するテストを先に作成しコミットする
2. `feat:` Green — テストを Pass させる最小実装を行いコミットする
3. `refactor:` Refactor / Integration — リファクタリングと統合を行いコミットする
4. `docs:` Docs Sync — 進捗・仕様文書を同期しコミットする
これらを1つの巨大なコミットにまとめることは厳禁である。

## 目的

Markdown 形式の試験対策資料を Next.js App Router の `page.tsx` 学習コンポーネントへ移行する際の
エンドツーエンドワークフローを提供する。GCP（CDL, ACE）・AWS など複数の資格に対応する。

**前提**: グローバルスキル（`md-to-nextjs-migration`）が JSX ピットフォール・SVG 属性変換・
TypeScript strict モードの注意点をカバーしている。このスキルはそれを前提とし、
**このリポジトリ固有のワークフロー**に集中する。

> **重要**: ソース MD の内容は**省略・要約を一切禁止**する。表の全行・箇条書きの全項目・
> 説明文の全文を JSX に組み込むこと。「長いので省略」は許容しない。
> 特に「詳細手順」「CSV フォーマット例」「複雑な表」「注釈」などは学習資料として極めて重要であるため、必ず全て移植すること。

---

## リポジトリのページ構成

ページは資格ベンダー別ディレクトリに配置する。現状は `app/gcl/`（GCP）のみだが、
今後 `app/aws/`（AWS）など他ベンダーが追加される予定。

```text
app/
  gcl/                              ← GCP 資格
    associate-cloud-engineer/
      page.tsx
      ace.css
      domain{1-4}/page.tsx          ← ドメイン別詳細ページ
      architecture-guide/page.tsx
    genai-leader/
      constants.ts
      page.tsx
      genai-leader.css
      section1/
        page.tsx
        components/                 ← Section11〜14 等に分割（Batch E）
      section2/
        page.tsx
        components/                 ← Section21〜25 等に分割（Batch E）
      section3/page.tsx
      section4/page.tsx
    cloud-digital-leader/
      cdl.css                       ← 共通テーマ
      section{1-6}/
        page.tsx
        components/sections/        ← 各セクション分割コンポーネント
    agwa/
      page.tsx
      section1/
        page.tsx
        page.css
    professional-cloud-network-engineer/
      page.tsx
      components/
    professional-cloud-network-engineer-step-by-step/
      page.tsx
      components/
  aws/                              ← AWS 資格（将来追加予定）
    <exam>/
      constants.ts
      page.tsx
      layout.tsx
      <exam>.css
```

新ページを追加した場合は **`app/constants.ts` の `EXAMS` にエントリを追加する**（Header.tsx は `toNavTree(EXAMS)` で自動反映されるため直接編集しない）。
`status: 'coming-soon'` で登録しておけばナビには「準備中」として表示され、ホームページのカード一覧からは除外される。ページ完成後に `status` を削除することで公開扱いになる。

---

## プランモード時のルール

移行規模が大きい場合（複数セクション・新ページ作成など）はプランモードで計画を立てる。
**プランモード使用時は以下を必須とする:**

1. **計画および進捗を MIGRATION_PROGRESS.md に作成・更新する**
    - 他の LLM（Claude 以外）が後続処理を引き継げる粒度で記述する
    - フェーズ一覧・各フェーズの成果物・完了基準を明記する
2. **フェーズ単位でコミットする**
    - 各フェーズ完了後に `git commit` を実行する
    - コミットメッセージの接頭辞は後述の各ステップに従う（Red は `test:`、Green は `feat:`、
      Refactor / Integration は `refactor:`、Docs Sync は `docs:`）。プランモード専用の
      コミット形式は設けず、Red / Green / Refactor / Integration をそれぞれ別コミットで完了させる
3. **ステップバイステップで進める**
    - 全フェーズを一括実装しない
    - 1フェーズ完了 → テスト通過確認 → コミット → 次フェーズ の順を守る
4. **進捗同期ゲートを設ける**（`.agents/rules/migration-progress-sync.md` に従う）
    - 各ページ・各フェーズの完了時に `MIGRATION_PROGRESS.md` を実際の進捗へ更新する
    - テスト通過を確認してから `docs:` コミットで同期し、その後に次フェーズへ進む
    - Step 7 まで到達せず中断した場合でも、中断時点が正確に記録されている状態を保つ

### 計画 MD のテンプレート

```markdown
# <試験名> Next.js 移行計画

## ソース

- `<source>.md`

## フェーズ一覧

| # | フェーズ | 成果物 | 完了基準 |
|---|---------|-------|---------|
| 1 | セットアップ | constants.ts, layout.tsx, <exam>.css | ビルド通過 |
| 2 | Section N 実装 | page.tsx の Section N | テスト GREEN |
| … | … | … | … |

## コンテンツチェックリスト（省略禁止）

- [ ] セクション1: 全 N 項目
- [ ] セクション2: 全 M 項目

```

---

## 移行手順（TDD サイクル）

### Step 0: ソース資料を読む

```bash
# 移行元 MD を確認する
# 例: cdl-section{N}-*.md, google-cloud-digital-leader-comprehensive-guide.md
```

両ソースを全読みし、実装すべきコンテンツ一覧を把握してから実装を開始する。
**省略・要約は一切禁止**。MD の全行を JSX に組み込む前提でコンテンツ量を把握すること。

### 共通のステージングゲート（各コミット前に必ず実行）

Red / Green / Refactor / Docs Sync のコミットを混在させないため、**すべての `git add` の前後**で
次の 2 つの検査を行う。`assert_clean_stage` は `git add` の前、`assert_staged_scope` は `git add` の後に実行する。
各 `git add` では許可ファイルを `--` の後に明示し、`git add -p` でそのステップに属する差分だけを選択する。
許可ファイル内に別作業の変更があっても、ファイル全体をステージしてはならない。
新規ファイルは通常の `git add -p` では選択対象にならないため、許可された対象ファイルごとに次の順序で扱う。

```bash
# git add の前: 別ステップの差分が既にステージされていないことを確認する
assert_clean_stage() {
  git diff --cached --quiet || {
    echo '既存のステージ差分があります。コミットを中止します。' >&2
    return 1
  }
}

# git add の後: そのステップで許可したファイルだけがステージされていることを確認する
assert_staged_scope() {
  staged=$(git diff --cached --name-only) || return 1
  for file in $staged; do
    case " $* " in
      *" $file "*) ;;
      *) echo "許可されていないファイルがステージされています: $file" >&2; return 1 ;;
    esac
  done
}
```

```bash
# 新規ファイルごとに状態を確認し、intent-to-add の後で必要な差分だけを選択する
if ! git status --short -- <new-file>; then
  echo '新規ファイルの状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
assert_clean_stage || exit 1
git add -N -- <new-file> || exit 1
git add -p -- <new-file> || exit 1
assert_staged_scope <new-file> || exit 1
```

### Step 1: Red — 失敗するテストを作成してコミット

```bash
# 要件を網羅するテストを追加
RED_TEST_NAME='renders the migrated SN requirement title'
RED_EXPECTED_FAILURE='Unable to find an element with the text: SN requirement title'
red_test_log=$(mktemp) || exit 1
trap 'rm -f "$red_test_log"' EXIT
if bun run test __tests__/gcl/<exam>/page.test.tsx -t "$RED_TEST_NAME" >"$red_test_log" 2>&1; then
  cat "$red_test_log"
  echo 'Red テストが成功しました。コミットを中止します。' >&2
  exit 1
fi
cat "$red_test_log"
if ! grep -F -- "$RED_EXPECTED_FAILURE" "$red_test_log" >/dev/null; then
  echo '想定したアサーション失敗を確認できません。コミットを中止します。' >&2
  exit 1
fi
if ! git status --short; then
  echo 'worktree の状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
assert_clean_stage || exit 1
git add -N -- __tests__/gcl/<exam>/page.test.tsx || exit 1
git add -p -- __tests__/gcl/<exam>/page.test.tsx || exit 1
assert_staged_scope __tests__/gcl/<exam>/page.test.tsx || exit 1
git commit -m "test(gcl/<exam>/SN): add failing migration coverage"
```

`RED_TEST_NAME` は追加したテストだけに一致する固有名、`RED_EXPECTED_FAILURE` はそのテストの期待値を含む固有の失敗メッセージに置き換える。
`AssertionError` などの一般的なエラー名だけで Red と判定しない。上記の失敗を確認できた場合に限り `test:` コミットへ進み、
Red のテストを Green 実装と同じコミットに含めない。

### Step 2: constants.ts に型とデータを追加

```typescript
// 型定義（export 必須）
export type NewItem = {
    id: string;
    field1: string;
    field2: string;
};

// データ配列（export 必須）
export const NEW_ITEMS: NewItem[] = [
    { id: 'item-1', field1: 'value1', field2: 'value2' },
];
```

### Step 3: page.tsx のインポートを更新

```typescript
import {
    EXISTING_CONST,
    NEW_ITEMS,          // 追加
} from './constants';
```

### Step 4: Section 関数に JSX カードを追加

```tsx
<div className="tcard">
    <div className="ttitle"><span className="tid">N.M</span>カードタイトル</div>
    <p className="tdesc">説明文（省略・要約なし）</p>
    <div className="ctable-wrap">
        <table className="ctable">
            <thead>
                <tr><th scope="col">列1</th><th scope="col">列2</th></tr>
            </thead>
            <tbody>
                {NEW_ITEMS.map((row) => (
                    <tr key={row.id}>
                        <td><strong>{row.field1}</strong></td>
                        <td>{row.field2}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
```

**省略・要約 厳禁**: ソース MD の全内容を JSX に組み込む。

- 表は全行（省略行 `...` 不可）
- 箇条書きは全項目
- 説明文は全文（「〜など」で打ち切り不可）
- コード例も全文掲載

### Step 5: テストを GREEN にする

```bash
bun run test __tests__/gcl/<exam>/page.test.tsx
if ! git status --short; then
  echo 'worktree の状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
assert_clean_stage || exit 1
git add -p -- app/constants.ts app/gcl/<exam>/<changed-file-1> app/gcl/<exam>/<changed-file-2> || exit 1
assert_staged_scope app/constants.ts app/gcl/<exam>/<changed-file-1> app/gcl/<exam>/<changed-file-2> || exit 1
git diff --cached
git commit -m "feat(gcl/<exam>/SN): implement migrated content"
```

`git add` には実際に変更したファイルだけを列挙し、試験ディレクトリ全体を指定しない。

### Step 6: Refactor / Integration を検証してコミット

```bash
bun run test __tests__/gcl/<exam>/page.test.tsx
bun run build
bun run lint
if ! git status --short; then
  echo 'worktree の状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
assert_clean_stage || exit 1
git add -p -- <refactored-files> || exit 1
assert_staged_scope <refactored-files> || exit 1
git commit -m "refactor(gcl/<exam>/SN): integrate migrated content"
```

Step 6 は実際にリファクタリングしたファイルだけをステージする。Green 実装や `app/constants.ts` を変更していない場合、それらを Refactor コミットへ重ねて含めない。

### Step 7: Docs Sync を検証してコミット

Docs Sync の必須成果物は次の6ファイルを正準一覧とする。

- `docs/coverage-dashboard.html`
- `docs/TEST_COVERAGE_PROGRESS.md`
- `MIGRATION_PROGRESS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `README.md`

テストを追加・変更しない移行に限り、`docs/coverage-dashboard.html` と `docs/TEST_COVERAGE_PROGRESS.md` を対象外にできる。その他4ファイルは必ず確認し、必要な更新をステージする。

```bash
bun run test __tests__/gcl/<exam>/page.test.tsx
if ! git status --short; then
  echo 'worktree の状態を取得できません。コミットを中止します。' >&2
  exit 1
fi
if [ "${COMMIT_AUTHORIZED:-}" != 'yes' ]; then
  echo 'Docs Sync コミットには COMMIT_AUTHORIZED=yes による明示認可が必要です。' >&2
  exit 1
fi
assert_clean_stage || exit 1
docs_sync_files=(
  docs/coverage-dashboard.html
  docs/TEST_COVERAGE_PROGRESS.md
  MIGRATION_PROGRESS.md
  CLAUDE.md
  GEMINI.md
  README.md
)
if [ "${MIGRATION_HAS_TEST_CHANGES:-yes}" != 'yes' ]; then
  docs_sync_files=(MIGRATION_PROGRESS.md CLAUDE.md GEMINI.md README.md)
fi
if ! git add -p -- "${docs_sync_files[@]}"; then
  echo 'Docs Sync 対象のステージに失敗しました。コミットを中止します。' >&2
  exit 1
fi
# 正準一覧（テスト変更なしの場合は4ファイル）以外がステージされていないことを確認する
assert_staged_scope "${docs_sync_files[@]}" || exit 1
if ! git diff --cached --check || ! git diff --cached; then
  echo 'ステージ差分を検証できません。コミットを中止します。' >&2
  exit 1
fi
git commit -m "docs(gcl/<exam>/SN): sync migration progress"
```

---

## このリポジトリ固有の制約

- **テストランナーは bun**: `npm run test` ではなく `bun run test` を使う
- **新ページ追加時**: `app/constants.ts` の `EXAMS` にエントリを追加する（`Header.tsx` は `toNavTree(EXAMS)` で自動反映されるため直接編集しない）
- **ページ固有の共通定数**: `constants.ts` に集約する（グローバルに置かない）
- **CSS テーマ**: ページ CSS では新規テーマ custom property を定義しない。`app/globals.css` の既存または追加済みの承認済み3層デザイントークンを参照し、ページ固有 CSS にはセレクタとスタイル規則だけを置く
- **分割方針（第一選択）**: `page.tsx` が ~400〜600 行を超えた場合は、新規セクションを `components/sections/Section*.tsx` などの独立コンポーネントに切り出すこと。再利用可能なロジックは hooks / util モジュールへ分離する。「編集を小分けにする」運用で肥大化を温存しないこと
- **Edit サイズ（補助ルール）**: コンポーネント分割後もやむを得ず大きな編集が発生する場合に限り、1 回の Edit は 300 行以内に収める
- **SVG 移行品質**: オリジナルにリッチな SVG（チップ表示、ステータス、詳細な注釈等）が含まれる場合は簡略化せず全詳細を再現すること。プレースホルダーへの置き換えは禁止。属性は camelCase に変換し `style` はオブジェクト形式で記述すること
- **`litellm` / `dspy` 追加禁止**（脆弱性懸念）
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持すること。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップすること。行を `map` で展開する場合は各要素へ安定した `key`（固定コードなら `key={"line-" + index}` 等）を付け、`.code-line { white-space: pre; }` で各行の先頭インデントを保持する。表示契約として、`app/globals.css` では
  `.code-line` に `display` を指定せず、各ページ固有 CSS で必ず `display: block` を明示して既定表示を統一する。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換すること。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background` など）を厳格に使用すること。独自のローカル変数定義は避ける。

---

## UI/UX とスタイリングの重要ルール

### 1. サブナビゲーション (snav) の固定と z-index

各ページのサブナビゲーション (`.snav` 等) は、スクロール時に画面上部に固定（Sticky）され、
グローバルサイトヘッダーと DisclaimerBanner の下に配置する。

- **配置とレイヤー**: `.snav` には必ず `top: calc(var(--header-h) + var(--disclaimer-height));` と `z-index: 40;`（または40以下）を設定する

  （サイトヘッダーは `z-index: 50` のため、snav が覆わないようにする）

- **`position: sticky` を壊さないため**: 親要素（`.s1-page`, `.d2-page` などのラッパー）に

  `overflow: hidden;` / `overflow-x: hidden;` を使わない。
  横スクロール抑制が必要な場合は `overflow-x: clip;` を使うこと（Issue #42 解決策）。

### 2. 参考資料 (References) のリンク形式

Markdown の「参考」「リンク」セクションを JSX に移行する際のルール:

- **各ページ・セクションの末尾に参考 URL を必ず全件掲載する**（省略禁止）
- URL 文字列をそのままテキスト表示しない（カード外にはみ出す）
- `<a>` タグを使い、リンクテキストはリンク先タイトル（日本語推奨）にする
- 必要に応じて遷移先の概要を併記し、UI 上で読みやすい形に整える

### 3. データとロジックの分離（constants.ts の活用）

`page.tsx` 内にデータ配列をハードコードしない（コンポーネントが肥大化し保守性が低下する）。

- 参考資料リンク等（`["タイトル", "URL", "概要"]` のようなデータ群）は `constants.ts` に

  型定義と共に定数として抽出する（例: `export const REFERENCE_LINKS = [...]`）

- `page.tsx` 側は `import` して `.map` でレンダリングするだけにする

### 4. メンテナブルな CSS セレクタ

Chapter 追加のたびに CSS を更新しなくて済むよう、汎用セレクタを使う。

- **NG**: `.d4-page [id^="ch5"], .d4-page [id^="ch6"]` と個別 ID を際限なく列挙する
- **OK**: `.d4-page [id^="ch"].sec-head` のように部分一致＋クラス名で汎用指定する

---

## CSS クラス（CDL ページ）

主要クラスのクイックリファレンス:

| クラス | 用途 |
| --- | --- |
| `sgap` | セクション間ギャップ |
| `sec-head` | セクションヘッダーコンテナ |
| `sec-num sn{N}` | セクション番号バッジ（テーマカラーは N で決まる） |
| `tcard` | コンテンツカード |
| `ttitle` / `tid` | カードタイトル / 番号バッジ |
| `tdesc` / `stitle` | カード説明文 / カード内サブタイトル |
| `ctable-wrap` / `ctable` | テーブルスクロールラッパー / テーブル本体 |
| `cdl-svg` / `diagram-svg` | SVG クラス（既存 / 新規） |

---

## 進捗の確認

セッションをまたぐ場合は、必ずルートディレクトリの `MIGRATION_PROGRESS.md` を確認・更新し、進捗とコンテキストを引き継ぐこと。

既存の進行状況管理:

- MIGRATION_PROGRESS.md

---

## 追記エリア

<!-- このスキルに追加したい知見をここに記載する -->
