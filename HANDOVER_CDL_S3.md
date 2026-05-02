# Handover: CDL Section 3 Migration to Next.js

## 概要

`cdl-section3-ai-innovation.html` から Next.js (App Router) への移行作業の進捗状況です。
TDD（Test-Driven Development）に基づき、ステップバイステップで実装とコミットを進めています。

## 現在のステータス

- **進捗:** 初期セットアップ完了 + Section 0 (Overview) 実装済み
- **最新コミット:** `edf6fdf` (feat(gcl/cdl/S3): add initial page structure and tests for AI Innovation)
- **テスト状況:** `__tests__/gcl/cloud-digital-leader/section3/page.test.tsx` がパスすることを確認済み

## 実装済みの内容

1. **ディレクトリ構造:**
    - `app/gcl/cloud-digital-leader/section3/`: ページ・コンポーネント・定数・スタイル
    - `app/gcl/cloud-digital-leader/section3/components/sections/`: 分割されたセクションコンポーネント
2. **基本ファイル:**
    - `constants.ts`: `HERO_BADGES`, `NAV_LINKS` などの定数定義
    - `layout.tsx`, `page.tsx`, `section3.css`: ページのメイン構成
    - `SectionBase.module.css`: セクション共通のスタイリング（Container, Cards, InfoBox 等）
3. **セクション:**
    - `Section0.tsx`: 「Section 3 の全体像」の実装完了。

## 次のステップ (残タスク)

1. **Section 1 実装 (Fundamentals):**
    - AI 技術の包含関係（Hierarchy Diagram）
    - AI vs データアナリティクス
    - ML のビジネス価値
    - データ品質（GIGO）
    - 機械学習の 3 つのアプローチ
2. **Section 2 実装 (Solutions):**
    - 4 つのトレードオフ要因（Tradeoff Matrix）
    - ソリューション選択デシジョンツリー
3. **詳細サービスセクション実装:**
    - `apis`: 事前学習済み API
    - `automl`: AutoML の詳細
    - `vertexai`: Vertex AI の詳細
    - `bqml`: BigQuery ML の詳細
    - `tensorflow`: TensorFlow と Cloud TPU
4. **倫理性・まとめセクション実装:**
    - `responsible`: 責任ある AI
    - `checklist`: 試験直前チェックリスト
    - `patterns`: よく出る問題パターン

## 技術的留意点

- **スタイリング:** `SectionBase.module.css` を各セクションでインポートし、`baseStyles.card` のように適用してください。
- **CSS変数:** `globals.css` の3層トークン（例: `--color-accent-blue`）を優先的に使用し、フォールバックも考慮しています。
- **コンポーネント境界:** 必要に応じて `'use client'` を含むナビゲーションコンポーネントを切り出す必要があります（現在は `SectionNav` がベースコンポーネントとして存在）。

## 参照ファイル

- 元ファイル: `cdl-section3-ai-innovation.html`
- 移行ガイド: `.claude/skills/html-to-nextjs-migration/SKILL.md`
