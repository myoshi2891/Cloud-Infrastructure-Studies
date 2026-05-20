# TDD & Step-by-Step Commit Workflow Rules

## 目的 (Objective)
LLMエージェントがコードを実装する際、要件漏れや意図しない破壊的変更を防ぐため、**テスト駆動開発（TDD）**と**ステップバイステップの細かなコミット**を**絶対の義務（マスト）**として規定する。

## 基本原則 (Core Mandates)

1. **TDDの厳守 (Strict TDD)**
   実装コード（プロダクションコード）を書く前に、必ずテストコード（Vitest等）を先に作成し、そのテストが「失敗（Fail）」することを確認しなければならない。
2. **ステップバイステップの実装とコミット (Step-by-step Implementation & Commits)**
   実装を一度にまとめて行い、巨大なコミットを作ることは厳禁。1つの論理的なフェーズが完了するごとに、必ず `git commit` を実行すること。

## 標準ワークフロー (Standard Workflow)

エージェントは以下のサイクルを厳格に繰り返すこと。

### Step 1: テストの作成 (Write Tests)
- 要求された機能や修正に対するテストコードを作成する。
- 実行してテストがFailすることを確認する。
- **Commit:** `test: add failing tests for [機能名]` (必要であればFail状態でコミット、またはStep 2でまとめても可だが「テスト作成」を独立したフェーズとして扱うこと)

### Step 2: 最小限の実装 (Implementation)
- テストをPassさせるための最小限のプロダクションコードを実装する。
- `bun test` 等を実行し、テストがPassすることを確認する。
- **Commit:** `feat/fix: implement [機能名] to pass tests`

### Step 3: リファクタリング・統合 (Refactoring & Integration)
- コードの整理、CSSトークンのマッピング、`Header.tsx` や `CLAUDE.md` 等へのルーティング統合を行う。
- ビルド (`bun run build`) や関連テストを実行し、既存機能が破壊されていないか確認する。
- **Commit:** `refactor/docs: integrate [機能名] into routing and update docs`

## 各種スキル・仕様書での扱い (Integration with Skills & Specs)
本プロジェクトにおける全ての「仕様書（`CLAUDE.md`, `GEMINI.md` 等）」や「スキルファイル（`.claude/skills/*`, `.gemini/skills/*`）」に基づく作業は、**本ワークフローファイルに定められた手順を常に最優先事項として適用**すること。

「実装せよ」「移行せよ」という指示を受けた場合、エージェントは自動的にこのTDDとコミットのステップを計画（Plan）に組み込み、ユーザーの合意を経た上で、各ステップ完了ごとに必ずローカルコミットを実行しなければならない。
