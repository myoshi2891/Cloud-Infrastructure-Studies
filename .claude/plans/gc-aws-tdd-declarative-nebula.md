# グローバルメニュー ハンバーガー化 + AWS 拡張対応 TDD 計画

## Context

現状の [components/Header.tsx](components/Header.tsx) はデスクトップでもモバイルでもドロップダウンを横並びで表示しており、510 行超に 5 試験ぶんのナビ JSX がインラインで埋め込まれている。今後 AWS 試験ページ群を追加する予定があり、試験数増加に伴う Header.tsx の肥大化と保守性低下が見えている。

このリファクタの狙いは 2 つ:

1. **UI**: デスクトップ/モバイル共通の「右側ドロワー + プロバイダ別アコーディオン」ハンバーガー UI に統一する
2. **構造**: ナビ定義を [app/constants.ts](app/constants.ts) の `EXAMS` を正本としたデータ駆動に切り替え、`provider: 'GCP' | 'AWS'` フィールドで自動グルーピングする

実装は **8 ステップ × 8 コミット** の段階的 TDD で進める。Step 3 で既存 18 テストを「契約凍結」し、Step 4-6 で新 UI を並走実装、Step 7 でレガシー UI を撤去する流れによりリグレッションを最小化する。

---

## 決定事項 (ユーザー合意済み)

| 項目 | 採用 |
|---|---|
| メニュー UI | 右側ドロワー + プロバイダ別アコーディオン |
| AWS の扱い | ナビ枠だけ準備 (constants に SAA を「準備中」枠で追加、ページ自体は別 PR) |
| user-event | 導入する (`@testing-library/user-event`) |
| コミット粒度 | 8 ステップ 8 コミット |

---

## アーキテクチャ

### データレイヤー

```text
app/constants.ts          (正本: EXAMS に provider フィールド追加)
        │
        ▼
app/navigation.ts         (新規: toNavTree(EXAMS) -> NavGroup[])
        │
        ▼
components/Header.tsx     (薄い presentational: NavGroup[] を受け取って描画)
```

**型定義 (app/navigation.ts)**

```ts
export type Provider = 'GCP' | 'AWS';

export type NavLeaf = {
  label: string;
  href: string;
  desc?: string;
};

export type NavExam = {
  id: string;
  label: string;
  icon: string;
  colorClass: string;
  status?: 'available' | 'coming-soon';
  items: NavLeaf[];
};

export type NavGroup = {
  provider: Provider;
  label: string;
  exams: NavExam[];
};

export function toNavTree(exams: Exam[]): NavGroup[];
```

### UI レイヤー

- **トリガー**: Header 右端に `<button aria-haspopup="dialog" aria-expanded aria-controls="site-nav-drawer">` を常時表示
- **ドロワー**: `role="dialog" aria-modal="true" aria-label="サイトナビゲーション"` を右側からスライドイン
- **本体**: `<section>` で GCP / AWS を分割、各試験は `<details><summary>` のアコーディオン
- **a11y**: フォーカストラップ、Escape クローズ、body スクロールロック、復帰フォーカス
- **不変条件**: `--header-h: 48px` と `--topnav-height: 84px` は据え置き ([DisclaimerBanner.tsx](components/DisclaimerBanner.tsx) との連動を保護)

---

## TDD 実装ステップ

各ステップは Red (テスト追加で fail) → Green (最小実装で pass) → Refactor の順。コミットメッセージは Conventional Commits。

### Step 1: ナビ adapter の型と純粋関数

- **テスト**: `__tests__/lib/navigation.test.ts` (新規, 6-8 ケース)
  - 空配列を渡すと空配列を返す
  - GCP 試験のみで `[{provider:'GCP', exams:[...]}]` を返す
  - AWS 試験を含むと 2 グループに分かれる
  - `items` は試験トップ + section/domain を含む
  - href 重複がない
- **実装**: `app/navigation.ts` (新規, `toNavTree` 関数 + 型定義)
- **コミット**: `feat(nav): introduce NavTree adapter over EXAMS`

### Step 2: `Exam.provider` フィールド追加 + AWS スタブ

- **テスト**: `__tests__/lib/navigation.test.ts` に AWS グループ生成ケース追加
- **実装**:
  - [app/constants.ts](app/constants.ts) の `Exam` 型に `provider: Provider` 追加
  - 既存 5 試験すべてに `provider: 'GCP'` を付与
  - AWS SAA を 1 件追加 (`status: 'coming-soon'`, items は `/aws/solutions-architect-associate` のトップのみ、または空配列)
  - `type ColorKey` に `'card-aws-saa'` を追加
  - [app/globals.css](app/globals.css) に `.icon-theme-aws-saa` / `.card-aws-saa` の CSS 変数追加 (AWS ブランドカラー: オレンジ系)
- **コミット**: `feat(constants): tag exams with provider for nav grouping`

### Step 3: 既存 Header 18 テストの契約凍結

- **テスト**: [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) を `describe('現契約 (legacy nav)')` で全体ラップ、全 PASS 確認
- **実装**: なし
- **コミット**: `test(header): freeze legacy nav contract before refactor`

### Step 4: user-event 導入 + ハンバーガーボタン

- **テスト**: `__tests__/components/Header.hamburger.test.tsx` (新規)
  - ハンバーガーボタンが存在 (`aria-label="メニューを開く"`)
  - 初期は `aria-expanded="false"`
  - クリックで `aria-expanded="true"` に変わる
  - ドロワー (`role="dialog"`) が描画される
- **実装**:
  - `bun add -D @testing-library/user-event`
  - [components/Header.tsx](components/Header.tsx) にハンバーガーボタンと `useState(open)` 追加
  - ドロワーは空の `<div role="dialog">` でOK (中身は Step 5)
- **コミット**: `feat(header): add hamburger toggle with aria state`

### Step 5: ドロワー内容を adapter から描画

- **テスト**: hamburger.test.tsx に追加
  - プロバイダ見出し 2 つ (`GCP`, `AWS`)
  - GCP 配下に試験 5 件、AWS 配下に 1 件 (SAA)
  - 各試験アコーディオン展開で section/domain リンクが見える
  - リンク href が正当 (`/gcl/...`, `/aws/...`)
  - `coming-soon` の試験は「準備中」ラベルを表示
- **実装**: Header.tsx が `toNavTree(EXAMS)` を呼び `<section><details>` 構造を出力
- **コミット**: `feat(header): render nav tree inside drawer`

### Step 6: キーボード a11y + スクロールロック

- **テスト**: hamburger.test.tsx に追加
  - Escape キーでドロワーが閉じる
  - ドロワー開時に最初のフォーカスがクローズボタンへ
  - ドロワー閉時にフォーカスがハンバーガーボタンへ戻る
  - Tab でドロワー内をループ (フォーカストラップ)
  - 開時に `document.body.style.overflow === 'hidden'`、閉時に復元
- **実装**: `useFocusTrap` 自作 hook + body スクロールロック effect
- **コミット**: `feat(header): trap focus and lock scroll in drawer`

### Step 7: レガシー UI 撤去 + 既存テスト整理

- **テスト**: Step 3 で凍結した [Header.test.tsx](__tests__/components/Header.test.tsx) を新 UI 前提に書き換え (削除 or 修正)
- **実装**:
  - [components/Header.tsx](components/Header.tsx) からインライン 5 箇所のドロップダウン JSX を削除
  - 不要になった useRef・openMenu Union 型を削除
  - グリッドレイアウトをシンプルな flex に変更 (ブランド左、ハンバーガー右)
- **コミット**: `refactor(header): remove inline dropdowns in favor of drawer`

### Step 8: E2E スモーク

- **テスト**: `e2e/nav.spec.ts` (新規)
  - ハンバーガークリックでドロワーが開く
  - GCP > ACE アコーディオンを開いて Domain 1 へ遷移できる
  - AWS 見出しが可視
- **実装**: なし
- **コミット**: `test(e2e): cover hamburger navigation flow`

---

## 変更ファイル一覧

### 新規

- [app/navigation.ts](app/navigation.ts) — adapter + 型
- [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) — adapter ユニットテスト
- [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) — 新 UI のテスト
- [e2e/nav.spec.ts](e2e/nav.spec.ts) — E2E

### 変更

- [components/Header.tsx](components/Header.tsx) — ハンバーガー UI へ全面リファクタ
- [app/constants.ts](app/constants.ts) — `provider` フィールド + AWS SAA スタブ
- [app/globals.css](app/globals.css) — AWS テーマカラー変数追加
- [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) — Step 3 で凍結、Step 7 で書き換え
- `package.json` — `@testing-library/user-event` 追加

### 不変条件 (触らない)

- [components/DisclaimerBanner.tsx](components/DisclaimerBanner.tsx) — `--header-h` 据え置きにより不変
- [app/layout.tsx](app/layout.tsx) — Header の配置は変えない
- [app/page.tsx](app/page.tsx) — トップページのカード表示は変えない (constants の `provider` 追加は後方互換)

---

## 既存資産の再利用

- [app/constants.ts:EXAMS](app/constants.ts) — 正本データソースとして再利用、provider フィールドのみ追加
- [components/Header.tsx](components/Header.tsx) の `DropdownItem` — リンクカード描画ロジックはドロワー内アコーディオンで再利用可能
- [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) — 日本語 describe/it + AAA パターンを Header.hamburger.test.tsx でも踏襲
- [vitest.setup.ts](vitest.setup.ts) — next/font / next/link モックをそのまま利用

---

## AWS 試験ページ追加の将来フロー (今回スコープ外)

1. [app/constants.ts](app/constants.ts) に該当 AWS 試験の `Exam` を追加 (`provider: 'AWS'`, `color: 'card-aws-xxx'`)
2. [app/globals.css](app/globals.css) に `.icon-theme-aws-xxx` / `.card-aws-xxx` CSS 変数を追加
3. `app/aws/xxx/page.tsx` を作成
4. **Header.tsx は触らない** (adapter が自動でドロワーに反映)

---

## 検証手順

各ステップ完了時:

```bash
bun run test                          # Vitest 全件 green
bun run lint                          # ESLint クリーン
bun run build                         # 型エラーなし
```

Step 8 完了時に追加:

```bash
bunx playwright install               # 初回のみ
bun run test:e2e                      # E2E 全件 green
bun run dev                           # 手動確認: localhost:3000
```

手動確認チェックリスト:

- [ ] ハンバーガーボタンがデスクトップ/モバイル両方で右端に表示
- [ ] クリックで右側ドロワーが滑り込む
- [ ] GCP セクションに 5 試験、AWS セクションに 1 試験 (準備中)
- [ ] 各試験のアコーディオン展開でリンク一覧表示
- [ ] Escape キーでドロワーが閉じる
- [ ] ドロワー開時に背景スクロールがロックされる
- [ ] フォーカスがドロワー内にトラップされる
- [ ] DisclaimerBanner の表示位置がリファクタ前と変わらない

---

## 想定リスク

1. **Step 7 でレガシーテストの書き換え量が想定より膨らむ** → Step 3 で `describe('現契約')` ラップ + コメントで「Step 7 で書き換え」を明示してリスク予告
2. **focus-trap 自作実装の不完全さ** → MDN の `inert` 属性を併用、Step 6 で「最初/最後の Tab ループ」を明示テスト
3. **`ColorKey` Union 拡張が page.tsx の型推論に影響** — [app/page.tsx](app/page.tsx) のカード描画で `as ColorKey` narrow がある場合は Step 2 で同時に確認 (Union 列挙のままで足す方針なので影響軽微)
