# 次回セッション用引き継ぎプロンプト

## プロジェクト概要

- **プロジェクト名**: Cloud Infrastructure Studies
- **目的**: クラウド試験対策用 Markdown 資料の Next.js (App Router) への移行
- **現在の進捗**:
  - Google Cloud Digital Leader (CDL) Section 1: 完了
  - Google Cloud Digital Leader (CDL) Section 2: 完了（本セッションで完了）

## 現在の作業状態

- `Section 2: Google Cloud によるデータ トランスフォーメーションの探求` の移行が完了しました。
- 13個のセクションコンポーネント (`Section1.tsx` 〜 `Section13.tsx`) に分割し、詳細な解説 (gcdl) も統合済みです。
- 全ての変更はローカルにコミットされており、ビルド (`bun run build`) およびテスト (`bun run test`) は GREEN です。

## スタイル・実装規約（厳守）

- **コンポーネント分割**: `app/gcl/cloud-digital-leader/sectionN/components/sections/` に分割する。
- **スタイリング**: インラインの Tailwind クラスを極力避け、以下のプロジェクト標準クラスを `dangerouslySetInnerHTML` 内の HTML タグに付与する。
  - `class="stitle"`: サブタイトル
  - `class="tdesc"`: 説明文
  - `class="ctable-wrap" tabIndex="0"`: テーブル外枠（スクロール用）
  - `class="ctable"`: テーブル本体
  - `class="code-block"`: コードブロック
  - `class="list-disc list-outside ml-6 mb-4"`: 箇条書き
- **共通パーツ**: 図解には `components/DiagramSVG.tsx` を使用し、ASCII 図解を置き換える。
- **データ管理**: リンクや定数は `constants.ts` に集約し、コンポーネントを肥大化させない。

## 次回のタスク（提案）

1. **Section 3: AI によるイノベーションの推進** の移行。
   - ソースファイル: `cdl-section3-ai-innovation.md`, `gcdl-section3-ai-innovation.md`
2. 移行手順:
   - `app/gcl/cloud-digital-leader/section3/` ディレクトリ作成。
   - `Section2` の構成（`layout.tsx`, `page.tsx`, `constants.ts`, `components/`）をテンプレートとしてコピー。
   - `Section2` で確立した「詳細解説 (gcdl) を構造化ガイド (cdl) にマージする」手法でコンポーネントを作成。
   - `__tests__/gcl/cloud-digital-leader/section3/page.test.tsx` の作成とテスト実行。

## 起動用プロンプト案
>
> 以下の資料をもとに、Next.js のアプリケーションに `Section 3: AI によるイノベーションの推進` の画面を追加してください。
> - `cdl-section3-ai-innovation.md`
> - `gcdl-section3-ai-innovation.md`
> 実装パターンは `app/gcl/cloud-digital-leader/section2/` を参考にし、`GEMINI.md` の規約とスタイル（`stitle`, `tdesc`, `ctable` 等の適用）を遵守してください。
