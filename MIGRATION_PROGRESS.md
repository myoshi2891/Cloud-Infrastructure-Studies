# Migration Progress

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。
※ `HANDOVER_*.md` や `docs/plans/` に分散していた進捗・計画はすべてこのファイルおよび `GEMINI.md` の運用ルールに統合されました。
各セッションの終了前にこのファイルを更新し、コンテキストを引き継ぎます。

## 現在地

- **最新 HEAD:** `fe39a8f` feat(cdl/s5): implement Section 4 (Compliance, DLP & Checklist) and finalize migration
- **次の作業:** Cloud Digital Leader の他の残りのセクション、または別ドメインの移行
- **テスト数:** 3件パス (Section 5)
- **ビルド:** 成功 (型エラーなし、Lintは既存39件のみで新規なし)

## 次回セッションでの再開プロンプト

CDL Section 5 (`cdl-section5-trust-and-security.html`) の全セクション (`Section0.tsx` から `Section4.tsx` まで) の完全な React / CSS Modules への移植（省略なし）が完了しました。

以下の状態で再開してください：
- 最新 HEAD: `fe39a8f`
- 次の作業: 別の CDL セクションの HTML ファイルの移行、または指定された次のタスクを実行してください。

※HTMLファイルの削除は絶対に実行しないでください。
