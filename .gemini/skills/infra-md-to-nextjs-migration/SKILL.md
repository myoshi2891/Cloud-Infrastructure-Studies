# MD → Next.js 移行ワークフロー（Infra リポジトリ）

## 目的

Markdown 形式の試験対策資料を Next.js App Router の `page.tsx` 学習コンポーネントへ移行する際のエンドツーエンドワークフローを提供する。GCP（CDL, ACE）・AWS など複数の資格に対応する。

**前提**: グローバルな知見として JSX ピットフォール・SVG 属性変換・TypeScript strict モードの注意点をカバーしているものとする。本スキルは**このリポジトリ固有のワークフロー**に集中する。

> **重要**: ソース MD の内容は**省略・要約を一切禁止**する。表の全行・箇条書きの全項目・説明文の全文を JSX に組み込むこと。「長いので省略」は絶対に許容しない。

---

## リポジトリのページ構成

ページは資格ベンダー別ディレクトリに配置する。巨大化を防ぐため、各セクションは `components/sections/Section*.tsx` など個別のコンポーネントに分割すること。

```text
app/
  gcl/                              ← GCP 資格
    cloud-digital-leader/
      section1/                     ← 新しい構成例: セクションごとのページ
        constants.ts
        page.tsx
        layout.tsx
        components/                 ← コンポーネント抽出
          DiagramSVG.tsx            ← SVG用コンポーネント
          index.ts
          sections/
            Section1.tsx
            Section2.tsx
            Section2.module.css     ← CSS Modules
```

新ページを追加した場合は `components/Header.tsx` のナビゲーションも更新する。

---

## 計画フェーズ（Plan Mode）時のルール

移行規模が大きい場合（複数セクション・新ページ作成など）はプランモード（`enter_plan_mode`）を使用して計画を立てる。
**プランモード使用時は以下を必須とする:**

1. **計画 MD ファイルを作成する** (`docs/plans/<exam>-nextjs-migration.md`)
    - 他の AI エージェントが後続処理を引き継げる粒度で記述する
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

`grep_search` や `read_file` ツールを用いて移行元 MD の内容を確認する。
例: `cdl-section{N}-*.md`, `google-cloud-digital-leader-comprehensive-guide.md`

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

### Step 4: Section 関数に JSX カードを追加（コンポーネントの分割と抽出）

1つの巨大な `page.tsx` にすべてを詰め込むのではなく、**`components/sections/Section*.tsx` に各セクションを分割**する。
さらに、スタイルには **CSS Modules (`*.module.css`)** を使用し、アクセシビリティ（`aria-label` などの追加）に配慮すること。
また、**JSDoc/Docstrings** を追加し、コードの意図を明確にする。
ASCIIダイアグラムは必ず **SVG コンポーネント (`DiagramSVG.tsx` 等)** に置き換えること。

```tsx
/**
 * セクションNのコンポーネント
 * @param props コンポーネントプロパティ
 */
import styles from './SectionN.module.css';
import { DiagramSVG } from '../DiagramSVG';

export function SectionN() {
    return (
        <section className={styles.section} aria-label="セクションN">
            <div className={styles.tcard}>
                <div className={styles.ttitle}><span className={styles.tid}>N.M</span>カードタイトル</div>
                <p className={styles.tdesc}>説明文（省略・要約なし）</p>

                {/* ASCIIの代わりにSVGを利用 */}
                <DiagramSVG />

                <div className="ctable-wrap" tabIndex={0} aria-label="データテーブル">
                    <table className="ctable">
                        <thead>
                            <tr><th scope="col">列1</th><th scope="col">列2</th></tr>
                        </thead>
                        <tbody>
                            {/* ... */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
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
- **コンポーネント分割とCSS Modules**: `page.tsx` は長大になるため、必ず `components/sections/` へ分割し、スタイリングにはページ固有のテーマの他に `*.module.css` を用いてカプセル化する。
- **アクセシビリティとDocstrings**: ARIA属性の付与やDocstrings (`/** ... */`) の追加を必須とする。
- **SVGの活用**: ASCIIベースのダイアグラムは必ず専用のSVGコンポーネント (`DiagramSVG.tsx` など) に置き換えること。
- **`litellm` / `dspy` 追加禁止**（脆弱性懸念）

---

## UI/UXとスタイリングの重要ルール

### 1. サブナビゲーション表示 (snav) の固定とz-index

各ページのサブナビゲーション (`.snav` 等) は、スクロール時に画面上部に固定（Sticky）され、グローバルサイトヘッダーの上に被さるようにする必要があります。

- **配置とレイヤー**: `.snav` には必ず `top: 0;` と `z-index: 100;` を設定してください。(サイトヘッダーは `z-index: 50` であり、これを適切に覆い隠すため)
- **バグ回避**: `position: sticky` を機能させるため、親要素（例: `.s1-page`, `.d2-page` などのラッパー要素）には絶対に `overflow: hidden;` や `overflow-x: hidden;` を使用しないでください。非表示領域にする必要がある場合（横スクロール抑制など）は、親要素ではなく `overflow-x: clip;` を使用すること（Issue #42 解決策）。

### 2. 参考資料 (References) のリンク形式

Markdown内の「参考やリンク」セクション（公式ドキュメントやリソース等）を JSX に移行する際は、以下のフォーマットを守ってください。

- URL文字列をそのままテキストとして表示し、カード外にはみ出させないこと。
- `a` タグを使用し、リンクテキストにはリンク先のタイトル（日本語など）を記載すること。必要であれば遷移先の概要などを併記し、UI上で読みやすい形（例: domain4 の構成）に整えること。

### 3. データとロジックの分離 (constants.ts の活用)

`page.tsx` 内にデータ配列（特に参考資料リンクや長大な項目リスト）を直書き・ハードコードしないでください。コンポーネントが肥大化し保守性が低下します。

- 参考資料リンク等 (`["タイトル", "URL", "概要"]` のようなデータ群) は、同階層に専用の `constants.ts` ファイルを作成し、型定義と共に定数（例: `export const REFERENCE_LINKS = [...]`）として抽出・記述してください。
- `page.tsx` 側ではそれを `import` し、JSX 上で `.map` などのレンダリングロジックのみを扱う形にすっきり整理すること。

### 4. メンテナブルな CSS セレクタの実装

項目追加時にCSSファイルを毎回更新する事態（設定漏れや冗長化の原因）を避けるため、保守性の高い汎用セレクタを記述してください。

- **NG例**: 新しい Chapter が増えるたびに `.d4-page [id^="ch5"], .d4-page [id^="ch6"]` と個別のIDを際限なく列挙してスタイルを当てる。
- **OK例**: 共通のクラス名を持たせて対象を絞るか、部分一致とクラス名を組み合わせて `.d4-page [id^="ch"].sec-head` や共通親クラス等でまとめて指定する。

---

## CSS クラス（CDL ページなど）

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

セッションをまたぐ場合は対象ページの移行計画書を確認する。
計画 MD が存在しない場合は、プランモードで作成してから実装を開始する。

既存の計画 MD:

- CDL: `docs/plans/cdl-nextjs-migration.md`
- AWS（将来）: `docs/plans/aws-<exam>-nextjs-migration.md`
