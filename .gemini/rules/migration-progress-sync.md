# 移行作業ワークフロー・同期ルール

## 🚨 プロジェクトの鉄則

1. **ツールのパラメータ確認 (自己レビュー義務)**: ツールを呼び出す前に、必ず thought ブロック内で必須パラメータが揃っているか確認すること。
2. **ステップごとの確定 (コミット義務)**: 1つの実装・テストが完了するごとに、必ず `git add` と `git commit` を行い作業を確定させること。
3. **HTMLファイルのアーカイブ**: 移行が完全に完了したファイルのみ `Gcl_Archive/` へ移動すること。移行前のファイルをアーカイブしないこと。

## 現在の PCNE 移行状況

- **HEAD**: 84b9366 (fix: keep un-migrated step-by-step guide in root)
- **ステータス**: Comprehensive Guide 完了。Step-by-step Guide 未完了。
- **次の作業**: `google-cloud-pcne-step-by-step-guide.html` の移行。
