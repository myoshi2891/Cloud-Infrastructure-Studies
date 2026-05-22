# 移行作業ワークフロー・同期ルール

## 🚨 プロジェクトの鉄則

1. **ツールのパラメータ確認 (自己レビュー義務)**: ツールを呼び出す前に、必ず thought ブロック内で必須パラメータが揃っているか確認すること。
2. **ステップごとの確定 (コミット義務)**: 1つの実装・テストが完了するごとに、必ず `git add` と `git commit` を行い作業を確定させること。
3. **HTMLファイルのアーカイブ**: 移行が完全に完了したファイルのみ `Gcl_Archive/` へ移動すること。移行前のファイルをアーカイブしないこと。

## 現在の作業状況

- **HEAD**: 7d0a9ab（dev ブランチ）
- **テスト数**: 333 件パス（Vitest）/ E2E 23 件（Playwright Chromium）
- **Next.js**: 16.2.6
- **ステータス**: P1 テスト整備タスク完了。CDL, PCNE, PCNE Step, AGWA の E2E テストおよび AGWA の ScrollSpy 単体テストを実装。
- **完了済み移行**: ACE（domain1-4, architecture-guide）、CDL（section1-6）、AGWA（section1）、PCNE（comprehensive + step-by-step）、GenAI Leader（section1-4）
- **ナビ構造**: `app/constants.ts` の `EXAMS` → `app/navigation.ts` の `toNavTree()` → `components/Header.tsx` の Drawer で描画。新試験追加は constants.ts のみ変更すれば OK。
- **次の作業**: AWS SAA ページ実装（`app/aws/solutions-architect-associate/`）および P2 横断品質（Visual, A11y等）の導入検討
