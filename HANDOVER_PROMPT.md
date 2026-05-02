# 次回セッション用引き継ぎプロンプト

## プロジェクト概要

- **プロジェクト名**: Cloud Infrastructure Studies
- **目的**: 学習資料（HTML/Markdown）の Next.js (App Router) への移行
- **現在の進捗**:
  - Google Cloud Digital Leader (CDL) Section 1 & 2: 完了
  - Google Cloud Digital Leader (CDL) Section 3: **着手中 (Section 0 完了)**
  - コーディング規約の強化: 完了（Client/Server 境界, コードブロック改行, 表形式構造化）

## 現在の作業状態

- `Section 3: Innovating with Google Cloud Artificial Intelligence` の移行を開始しました。
- **実装済み**: `Section0.tsx` (概要セクション)、`SectionBase.module.css` (共通スタイル)、`page.tsx`, `layout.tsx`, `constants.ts` の初期構成。
- **最新コミット**: `edf6fdf` (feat(gcl/cdl/S3): add initial page structure and tests for AI Innovation)
- **テスト**: `__tests__/gcl/cloud-digital-leader/section3/page.test.tsx` がパスすることを確認済み。

## スタイル・実装規約（厳守）

- **TDD 実装**: 必ずテストを作成・実行しながらステップバイステップで進める。
- **コンポーネント分割**: 各セクションを `components/sections/SectionN.tsx` に分割し、`SectionBase.module.css` を適用する。
- **Client/Server 境界**: 状態を持つ UI（アンカーナビ等）は `'use client'` コンポーネントとして切り出し、`page.tsx` は Server Component を維持する。
- **コードブロック**: 各行を `<div className="code-line">...</div>` でラップし、`{"\n"}` は使用しない。
- **表形式データの構造化**: スペース揃えのデータは必ず `<table>` 要素に変換する。
- **CSS 変数**: `globals.css` の3層トークン（例: `--color-bg-primary`, `--color-accent-blue`）を厳格に使用する。

## 次回のタスク

1. **Section 3: Section 1 (Fundamentals) 以降の移行**
   - ソースファイル: `cdl-section3-ai-innovation.html`
   - 手順: `HANDOVER_CDL_S3.md` の「残タスク」に従い、`Section1.tsx` から順次実装。
2. **ナビゲーションの更新**: 全セクション完了後、`components/Header.tsx` にリンクを追加。

## 起動用プロンプト案

> `HANDOVER_CDL_S3.md` を読み、`cdl-section3-ai-innovation.html` の Next.js 移行を **Section 1 (Fundamentals)** から再開してください。
> すでに Section 0 は実装済みで、コミット `edf6fdf` が最新です。
> `SectionBase.module.css` を活用し、最新のコーディング規約（Client/Server 境界、コードブロックの改行処理等）を遵守しながら、TDD で実装を進めてください。
