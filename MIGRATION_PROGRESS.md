# Migration Progress

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。
※ `HANDOVER_*.md` や `docs/plans/` に分散していた進捗・計画はすべてこのファイルおよび `GEMINI.md` の運用ルールに統合されました。
各セッションの終了前にこのファイルを更新し、コンテキストを引き継ぎます。

## 現在地

- **最新 HEAD:** `fe39a8f` feat(cdl/s5): implement Section 4 (Compliance, DLP & Checklist) and finalize migration
- **次の作業:** Cloud Digital Leader の他の残りのセクション、または別ドメインの移行
- **テスト数:** 3件パス (Section 5)
- **ビルド:** 成功 (型エラーなし、Lint エラー 0)
- **最終更新日時(UTC):** 2026-05-03T00:00:00Z
- **確認コマンド:** `git rev-parse --short HEAD` / `bun run test` / `bun run build`

## 次回セッションでの再開プロンプト

CDL Section 4 および Section 5 のリファクタリングが完全に完了しました。
JSDoc の追加、CSS トークン化、アクセシビリティ対応（aria-hidden, scope="col"）、および SVG 化が完了し、`bun run lint` と `bun run build` が正常にパスすることを確認済みです。

以下の状態で再開してください：
- 最新 HEAD: `fe39a8f`
- 次の作業: 別の CDL セクションの HTML ファイルの移行、または指定された次のタスクを実行してください。

※HTMLファイルの削除は絶対に実行しないでください。

---

## 2026-05-03: Cloud Digital Leader Section 4 & 5 品質改善タスク (完了)

### 完了済み

- **JSDoc の標準化**: 全てのコンポーネントに役割・Props・戻り値の説明を追加。
- **CSS トークン化**: `*.module.css` 内のハードコードされた色を `globals.css` の3層トークンに置換。インラインスタイルの排除。
- **アクセシビリティ対応**:
  - 装飾要素への `aria-hidden="true"` 付与。
  - 全ての `<th>` に `scope="col"` を付与。
- **SVG 化**: ASCII ダイアグラム（Section 1, 3）を `DiagramSVG` に置き換え。
- **ビルド確認**: `bun run lint` および `bun run build` がエラーなしで完了することを確認。
- **不具合修正**: `SectionCard.module.css` の欠落によるビルドエラーを修正。

### 次のステップ

- [ ] CDL Section 1 〜 3 に対しても同様の品質改善（JSDoc, トークン化, アクセシビリティ）を適用する。
- [ ] 既存の HTML ファイルの移行を継続する。

### 引き継ぎ用プロンプト (Handoff Prompt)

以下の内容をコピーして、次のエージェントに渡してください。

> 以下の指示に従って、Cloud Digital Leader 学習教材 (Section 1〜3) のリファクタリングを完了させてください。
>
> 1. **JSDoc**: 全てのコンポーネントのエクスポート宣言直前に、役割・Props・戻り値を説明する `/** ... */` を追加。
> 2. **CSSトークン化**: `*.module.css` 内の `#hex`, `rgba` を `var(--color-...)` (3層トークン) に置換。
> 3. **アクセシビリティ**:
>    - `className={styles.cardIcon}` 等の装飾要素に `aria-hidden="true"` を追加。
>    - 全ての `<th>` に `scope="col"` を追加。
> 4. **SVG化**: ASCII/テキストによる図表を `DiagramSVG` コンポーネントを用いたSVG描画に置き換え。
> 5. **ビルド確認**: 最後に bun run lint と bun run build を実行し、全エラーが解消されていることを確認。

### 修正タスクの技術的詳細 (Deep Dive Instructions)

#### 1. JSDoc の標準化

- **形式**: 全てのコンポーネント (`export const Component = ...`) の直前に付与。
- **内容**: 概要、使用されている主要な子コンポーネント、アクセシビリティ上の留意点を記述。

```typescript
/**
 * [概要] Section 4.x の XXX に関する学習コンテンツを表示します。
 * [構成] TableComponent による比較表と DiagramSVG によるアーキテクチャ図を含みます。
 * @returns {JSX.Element}
 */
```

#### 2. CSSトークン化の厳格なマッピング

- `globals.css` に定義された変数へのマッピングを徹底してください。
- **背景/カード**: `#fff`, `#08090f` → `var(--color-card)`, `var(--color-background)`
- **テキスト**: `#1a1a1a`, `#4a4541` → `var(--color-foreground)`, `var(--color-muted-foreground)`
- **アクセントカラー (Section 4/5 共通)**:
  - 赤/テラコッタ: `#c4593a` → `var(--cdl-red)`
  - 緑/セージ: `#4a7a5c` → `var(--cdl-green)`
  - 青/スカイ: `#3a6fa0` → `var(--cdl-blue)`
  - 黄/アンバー: `#d4882a` → `var(--cdl-yellow)`
- **透明度付きカラー**: `rgba(196, 89, 58, 0.1)` → `color-mix(in srgb, var(--cdl-red) 10%, transparent)` を推奨。

#### 3. インラインスタイルの CSS Module への移行

- `page.tsx` や `Section*.tsx` 内に直接書かれている `style={{ ... }}` ブロックを削除し、対応する `*.module.css` にクラスとして定義し直してください。
- 特に `Section3.tsx` 等の `stepN` の背景色やフォントサイズのインライン指定は優先的に移行対象です。

#### 4. DiagramSVG による図表の完全リプレイス

- ASCII アート（`|`, `->`, `+--` 等）を完全に排除します。
- `Section1.tsx` (意思決定フロー): `DiagramSVG` 内で `<rect>`, `<path>`, `<text>` を使用して、SVG図を構築してください。
- カラー参照: SVG内の `fill` や `stroke` にも `var(--color-...)` トークンを直接指定してください。

#### 5. アクセシビリティの徹底

- **アイコン**: `styles.cardIcon` 等の装飾的要素には例外なく `aria-hidden="true"` を付与。
- **テーブル**: `TableComponent` の `headers` マッピングで `scope="col"` が付与されているか確認し、手動で `<th>` を書く場合は必ず `scope="col"` を追加。
