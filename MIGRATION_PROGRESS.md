# Migration Progress

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。
※ `HANDOVER_*.md` や `docs/plans/` に分散していた進捗・計画はすべてこのファイルおよび `GEMINI.md` の運用ルールに統合されました。
各セッションの終了前にこのファイルを更新し、コンテキストを引き継ぎます。

## 現在地

- **最新 HEAD:** `af490be` docs: add migration progress sync rule and HTML deletion prevention
- **次の作業:** CDL Section 4 (Modernization) の移行作業開始
- **テスト数:** 184 passed
- **ビルド:** 成功 (型エラーなし、Lint警告なし)

## 次回セッションでの再開プロンプト

前回のセッションで CDL Section 3 の `Section 4 (Responsible AI & Exam Checklist)` の React への移植とテストが完了し、HTMLファイルの保持ルールを設定しました。

以下の状態で再開してください：
- 最新 HEAD: `af490be`
- 次の作業: `cdl-section4-modernization.html` の移植作業を開始します。

※HTMLファイルの削除は絶対に実行しないでください。
