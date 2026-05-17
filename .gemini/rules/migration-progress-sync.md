# 移行作業ワークフロー・同期ルール

## 🚨 プロジェクトの鉄則

1. **ツールのパラメータ確認 (自己レビュー義務)**: ツールを呼び出す前に、必ず thought ブロック内で必須パラメータが揃っているか確認すること。
2. **ステップごとの確定 (コミット義務)**: 1つの実装・テストが完了するごとに、必ず `git add` と `git commit` を行い作業を確定させること。
3. **HTMLファイルのアーカイブ**: 移行が完全に完了したファイルのみ `Gcl_Archive/` へ移動すること。移行前のファイルをアーカイブしないこと。

## 現在の作業状況

- **HEAD**: 6756706（dev ブランチ）
- **テスト数**: 331 件パス（Vitest）/ E2E 4 件（Playwright Chromium）
- **Next.js**: 16.2.6
- **ステータス**: ハンバーガー UI リファクタ（8/8 ステップ完了）。Header.tsx をデータ駆動ナビに完全移行。
- **完了済み移行**: ACE（domain1-4, architecture-guide）、CDL（section1-6）、AGWA（section1）、PCNE（comprehensive + step-by-step）、GenAI Leader（section1-4）
- **ナビ構造**: `app/constants.ts` の `EXAMS` → `app/navigation.ts` の `toNavTree()` → `components/Header.tsx` の Drawer で描画。新試験追加は constants.ts のみ変更すれば OK。
- **次の作業**: AWS SAA ページ実装（`app/aws/solutions-architect-associate/`）
