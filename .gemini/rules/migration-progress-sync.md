# 移行作業ワークフロー・同期ルール

## 🚨 プロジェクトの鉄則

1. **ツールのパラメータ確認 (自己レビュー義務)**: ツールを呼び出す前に、必ず thought ブロック内で必須パラメータが揃っているか確認すること。
2. **ステップごとの確定 (コミット義務)**: 1つの実装・テストが完了するごとに、必ず `git add` と `git commit` を行い作業を確定させること。
3. **HTMLファイルのアーカイブ**: 移行が完全に完了したファイルのみ `Gcl_Archive/` へ移動すること。移行前のファイルをアーカイブしないこと。

## 現在の作業状況

- **HEAD**: e1beafe（fix/batch-e-refactor-sections-1-2 ブランチ）
- **テスト数**: 317 件パス
- **Next.js**: 16.2.6
- **ステータス**: Batch E（genai-leader section1/2 コンポーネント分割）完了。Batch C（a11y 改善）の main マージコンフリクトを解消済み。
- **完了済み移行**: ACE（domain1-4, architecture-guide）、CDL（section1-6）、AGWA（section1）、PCNE（comprehensive + step-by-step）、GenAI Leader（section1-4）
- **次の作業**: なし（仕様書同期・コンフリクト解消のみ）
