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

## 目的

Markdown 形式の試験対策資料を Next.js App Router の `page.tsx` 学習コンポーネントへ移行する際の
エンドツーエンドワークフローを提供する。GCP（CDL, ACE）・AWS など複数の資格に対応する。

**前提**: グローバルスキル（`md-to-nextjs-migration`）が JSX ピットフォール・SVG 属性変換・
TypeScript strict モードの注意点をカバーしている。このスキルはそれを前提とし、
**このリポジトリ固有のワークフロー**に集中する。

> **重要**: ソース MD の内容は**省略・要約を一切禁止**する。表の全行・箇条書きの全項目・
> 説明文の全文を JSX に組み込むこと。「長いので省略」は許容しない。

---

## リポジトリのページ構成

ページは資格ベンダー別ディレクトリに配置する。現状は `app/gcl/`（GCP）のみだが、
今後 `app/aws/`（AWS）など他ベンダーが追加される予定。

```text
app/
  gcl/                              ← GCP 資格
    cloud-digital-leader/
      constants.ts   ← データ定数（型定義 + データ配列）
      page.tsx       ← JSX セクション関数コンポーネント
      layout.tsx     ← CSS インポート
      cdl.css        ← ページ固有テーマ
    associate-cloud-engineer/
      page.tsx
      ace.css
    genai-leader/
      constants.ts
      page.tsx
      genai-leader.css
      section{1-4}/page.tsx
  aws/                              ← AWS 資格（将来追加予定）
    <exam>/
      constants.ts
      page.tsx
      layout.tsx
      <exam>.css
```

新ページを追加した場合は `components/Header.tsx` のナビゲーションも更新する。

---

## プランモード時のルール

移行規模が大きい場合（複数セクション・新ページ作成など）はプランモードで計画を立てる。
**プランモード使用時は以下を必須とする:**

1. **計画および進捗を MIGRATION_PROGRESS.md に作成・更新する**
    - 他の LLM（Claude 以外）が後続処理を引き継げる粒度で記述する
    - フェーズ一覧・各フェーズの成果物・完了基準を明記する
2. **フェーズ単位でコミットする**
    - 各フェーズ完了後に `git commit` を実行する
    - コミットメッセージ: `feat(<path>/SN): <内容の要約>`
3. **ステップバイステップで進める**
    - 全フェーズを一括実装しない
    - 1フェーズ完了 → テスト通過確認 → コミット → 次フェーズ の順を守る

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

### Step 1: テストを確認（RED）

```bash
bun run test __tests__/gcl/<exam>/page.test.tsx
```

失敗しているテストの期待テキストを確認し、実装対象とテキスト表記を把握する。

### Step 2: constants.ts に型とデータを追加

```typescript
// 型定義（export 必須）
export type NewItem = {
    field1: string;
    field2: string;
};

// データ配列（export 必須）
export const NEW_ITEMS: NewItem[] = [
    { field1: 'value1', field2: 'value2' },
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
                <tr><th>列1</th><th>列2</th></tr>
            </thead>
            <tbody>
                {NEW_ITEMS.map((row, i) => (
                    <tr key={i}>
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
```

### Step 6: ビルド確認

```bash
bun run build
```

### Step 7: コミット

```bash
git commit -m "feat(gcl/<exam>/SN): add <内容の要約>"
```

---

## このリポジトリ固有の制約

- **テストランナーは bun**: `npm run test` ではなく `bun run test` を使う
- **新ページ追加時**: `components/Header.tsx` のナビゲーションを必ず更新する
- **ページ固有の共通定数**: `constants.ts` に集約する（グローバルに置かない）
- **CSS テーマ**: ページ固有テーマは専用 `.css` ファイルに定義し `layout.tsx` でインポートする
- **Edit サイズ**: `page.tsx` は長大になるため 1 回の Edit は 300 行以内に収める
- **`litellm` / `dspy` 追加禁止**（脆弱性懸念）
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持すること。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップすること。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換すること。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-bg-primary` など）を厳格に使用すること。独自のローカル変数定義は避ける。

---

## UI/UX とスタイリングの重要ルール

### 1. サブナビゲーション (snav) の固定と z-index

各ページのサブナビゲーション (`.snav` 等) は、スクロール時に画面上部に固定（Sticky）され、
グローバルサイトヘッダーの上に重なるようにする。

- **配置とレイヤー**: `.snav` には必ず `top: 0;` と `z-index: 100;` を設定する

  （サイトヘッダーは `z-index: 50` → snav がその上を覆う）

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
