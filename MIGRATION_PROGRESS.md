# Migration Progress

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。
※ `HANDOVER_*.md` や `docs/plans/` に分散していた進捗・計画はすべてこのファイルおよび `GEMINI.md` の運用ルールに統合されました。
各セッションの終了前にこのファイルを更新し、コンテキストを引き継ぎます。

## 現在地

- **最新 HEAD:** `181d99a` feat(cdl/s4): implement Section 1 (Compute & Containers) exactly matching HTML
- **次の作業:** CDL Section 4 の `Section2.tsx` (Serverless, Network & Hybrid) の移植
- **テスト数:** 187 passed
- **ビルド:** 成功 (型エラーなし、Lint警告なし)

## 次回セッションでの再開プロンプト

前回のセッションで CDL Section 4 の `Section1.tsx` の完全な移植（省略なし）が完了しました。

以下の状態で再開してください：
- 最新 HEAD: `181d99a`
- 次の作業: `cdl-section4-modernization.html` の `id="serverless"`、`id="network"` および `id="hybrid"` 部分（サーバーレスコンピューティング、ネットワーク、ハイブリッド＆マルチクラウド）を `app/gcl/cloud-digital-leader/section4/components/sections/Section2.tsx` へ移植してください。

※HTMLファイルの削除は絶対に実行しないでください。
