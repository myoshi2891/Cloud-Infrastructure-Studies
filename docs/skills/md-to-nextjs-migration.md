# MD → Next.js 移行スキル（CDL 学習アプリ）

## 概要

Markdown 形式の試験対策資料（`cdl-section*.md`, `google-cloud-digital-leader-comprehensive-guide.md` 等）を
`app/gcl/cloud-digital-leader/page.tsx` の学習コンポーネントへ移行する手順とルールをまとめたスキル。

---

## アーキテクチャの理解

### ファイル構成

```
app/gcl/cloud-digital-leader/
  constants.ts   ← データ定数（型定義 + データ配列）
  page.tsx       ← JSX（Section0〜Section7 の関数コンポーネント）
  layout.tsx     ← CSS インポート
  cdl.css        ← ページ固有テーマ（Tailwind @theme ベース）

__tests__/gcl/cloud-digital-leader/
  page.test.tsx  ← Vitest + @testing-library/react（64テスト）

cdl-section1-*.md ～ cdl-section5-*.md   ← 移行元ソース資料
google-cloud-digital-leader-comprehensive-guide.md  ← 補完ソース資料
```

### セクション対応表

| セクション | テーマ | Section 関数 |
| --- | --- | --- |
| S0 | 試験概要・出題ドメイン | SectionIntro |
| S1 | DX・クラウド基礎 | Section1 |
| S2 | データ変革 | Section2 |
| S3 | インフラ近代化 | Section3 |
| S4 | セキュリティ・コンプライアンス | Section4 |
| S5 | AI/ML | Section5 |
| S6 | サービス早見表 | Section6 |
| S7 | 試験攻略チェックリスト | Section7 |

---

## 移行手順（TDD サイクル）

### Step 0: ソース資料を読む

両ソース MD を全読みし、実装すべきコンテンツを把握する。

```bash
# ソース資料
cdl-section{N}-*.md                           # セクション詳細
google-cloud-digital-leader-comprehensive-guide.md  # 補完・統合版
```

### Step 1: テストを確認（RED）

```bash
bun run test __tests__/gcl/cloud-digital-leader/page.test.tsx
```

失敗しているテストの期待テキストを確認し、実装対象を把握する。

### Step 2: constants.ts に定数を追加

```typescript
// 型定義
export type NewItem = {
    field1: string;
    field2: string;
};

// データ配列
export const NEW_ITEMS: NewItem[] = [
    { field1: 'value1', field2: 'value2' },
];
```

### Step 3: page.tsx のインポートを更新

```typescript
import {
    // 既存のインポート...
    NEW_ITEMS,
} from './constants';
```

### Step 4: Section 関数に JSX カードを追加

カードの構造:

```tsx
<div className="tcard">
    <div className="ttitle"><span className="tid">5.N</span>カードタイトル</div>
    <p className="tdesc">説明文（省略なし）</p>
    <div className="ctable-wrap">
        <table className="ctable">
            <thead>...</thead>
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

### Step 5: テストを実行（GREEN 確認）

```bash
bun run test __tests__/gcl/cloud-digital-leader/page.test.tsx
```

### Step 6: ビルド確認

```bash
bun run build
```

```

### Step 7: コミット

```bash
git commit -m "feat(cdl/SN): add <内容の要約>"
```

---

## 重要な注意事項

### 1. テストのテキストマッチング

`@testing-library/react` の `getAllByText` は正規表現で要素のテキストを検索する。
**スペースの有無が一致しないとテストが失敗する。**

```
テストが期待: /生成AI/i        → 「生成AI」（スペースなし）
実装で書いた: 「生成 AI」（スペースあり） → ❌ マッチしない
```

**対策**: テストの期待文字列を先に確認し、同じ表記を `<p>` や `<td>` のテキストに含める。

SVG の `<text>` 要素はjsdom で認識されるが、テキストが「プリビルト AI API」のように
検索文字列（「プリビルト API」）の間に別の文字が挟まる場合はマッチしない。

```tsx
// ❌ /プリビルト API/i に「プリビルト AI API」はマッチしない
<text>プリビルト AI API</text>

// ✅ p タグに正確な文字列を含める
<p><strong>プリビルト API</strong>（ML 知識不要）</p>
```

### 2. SVG を JSX で書く際の属性変換

| HTML 属性 | JSX 属性 |
| --- | --- |
| `stroke-width` | `strokeWidth` |
| `text-anchor` | `textAnchor` |
| `font-size` | `fontSize` |
| `font-weight` | `fontWeight` |
| `fill-opacity` | `fillOpacity` |
| `marker-end` | `markerEnd` |

SVG には必ず `role="img"` と `aria-label` を付ける（アクセシビリティ）。

### 3. TypeScript の strict モード

`arr[i + 1]` のような配列アクセスは `Object is possibly 'undefined'` になる。

```typescript
// ❌
arr[i + 1].x

// ✅
arr[i + 1]?.x ?? 0
```

CLAUDE.md のルール: 非nullアサーション（`!`）禁止。`??` か `?.` を使う。

### 4. 大きな Edit の分割

`page.tsx` は 1,400行超。1回の Edit で大量のコードを置換しようとすると、
`old_string` の末尾が不完全な状態でマッチして後続コンテンツが失われることがある。

**対策**: 1つの Edit で置換するコードは300行以内に収める。大きなブロックは複数の Edit に分割する。

### 5. 省略なし・要約なし

ソース MD の内容を省略・要約せずに全文を組み込む。

- 表は全行を含める
- 説明文は箇条書きも含めて展開する
- 「ベストプラクティス」「注意事項」「ビジネス活用例」も省略しない

---

## CDL ページの CSS クラス一覧

| クラス | 用途 |
| --- | --- |
| `sgap` | セクション間のギャップ |
| `sec-head` | セクションヘッダー |
| `sec-num sn{N}` | セクション番号（N=0〜8でテーマカラーが変わる） |
| `tcard` | コンテンツカード |
| `ttitle` | カードタイトル |
| `tid` | カード番号バッジ（例: 5.3） |
| `tdesc` | カード説明文 |
| `stitle` | カード内サブタイトル |
| `ctable-wrap` | テーブルのスクロールラッパー |
| `ctable` | スタイル付きテーブル |
| `pct-badge pb{N}` | 配点バッジ（セクションごとにカラーが違う） |
| `cdl-svg` | 既存 SVG のクラス |
| `diagram-svg` | 新規追加 SVG のクラス |

---

## よくある失敗パターン

### ❌ SVG text 要素のテキストがテストにマッチしない

→ 正確な文字列を `<p>` か `<td>` にも記述する

### ❌ TypeScript ビルドエラー（`arr[i+1]` undefined）

→ `arr[i + 1]?.x ?? 0` で optional chaining を使う

### ❌ 大きな Edit で既存コンテンツが消える

→ `old_string` の末尾をより具体的にする。または Edit を複数に分割する

### ❌ 定数を追加したが page.tsx にインポートを追加し忘れる

→ constants.ts 追加 → page.tsx インポート → JSX の順番を守る


---

## 計画書の保存場所

このリポジトリでの移行計画書は `docs/plans/cdl-nextjs-migration.md` に保存されています。
セッションをまたぐ場合は必ずこのファイルで現在の進捗を確認してください。
