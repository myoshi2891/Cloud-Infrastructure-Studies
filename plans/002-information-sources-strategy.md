# Plan 002: 情報収集戦略 — GCP メイン / AWS 補足

> **Executor instructions**: 本ドキュメントは「どの情報源を・どの頻度で・何のために見るか」の
> 運用設計であり、収集の自動化コードを実装するものではない。URL は作成時点
> （2026-07-06）の公式導線であり、リンク切れを発見した場合は本ファイルではなく
> `plans/README.md` に記録して報告すること。
>
> **Drift check**: `git diff --stat 133d4ad..HEAD -- app/constants.ts plans/`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-current-state-analysis.md
- **Category**: docs / direction
- **Planned at**: commit `133d4ad`, 2026-07-06

## なぜ重要か

本プラットフォームのコンテンツは静的 TSX であり（001 の制約参照）、試験改訂・サービス更新への
追随は「気づく仕組み」がなければ確実に陳腐化する。GCP 認定試験は数年おきに試験ガイドが改訂され、
出題比率（ドメイン %）も変わる。`app/constants.ts` の `ExamDomain.pct` や各ガイドの内容が
旧バージョン準拠のままだと、学習アプリとしての信頼性を直接損なう。
本プランは (1) 常設の情報源カタログ、(2) 更新頻度と影響度のマトリクス、(3) 改訂検知の運用手順を定める。

## 情報源カタログ

### GCP（メイン）

| # | 情報源 | 入口 | 用途 |
|---|--------|------|------|
| G1 | 認定試験ガイド（各試験の Exam Guide） | cloud.google.com/learn/certification/ 配下の各試験ページ | 出題ドメイン・比率・改訂の一次情報。**最重要** |
| G2 | Google Cloud リリースノート | cloud.google.com/release-notes | サービス仕様変更（GA/Deprecated）の検知。ガイド本文の陳腐化チェック |
| G3 | Cloud Skills Boost | cloudskillsboost.google | 公式ラーニングパス・ラボ構成の変化 = 出題傾向のシグナル。実践ガイド（ラボ系ページ）の元ネタ |
| G4 | 公式プロダクトドキュメント | cloud.google.com/docs | 各ガイドページ執筆時の裏取り。コマンド（gcloud/gsutil）の構文確認 |
| G5 | Architecture Center | cloud.google.com/architecture | ACE/PCA のアーキテクチャガイド系コンテンツの参照元 |
| G6 | 認定プログラムの告知（Certification 公式ブログ / メール） | cloud.google.com/blog（Training & Certifications タグ） | 試験リタイア・新設・改訂スケジュールの先行アナウンス |
| G7 | Google Workspace 管理者ヘルプ・リリースノート | support.google.com/a, workspaceupdates.googleblog.com | AGWA（Workspace Administrator）専用の一次情報 |

### AWS（補足）

| # | 情報源 | 入口 | 用途 |
|---|--------|------|------|
| A1 | AWS 認定公式ページ（SAA-C03 Exam Guide） | aws.amazon.com/certification/certified-solutions-architect-associate/ | SAA の出題ドメイン・比率・改訂（C03→C04 等のコード変化が改訂シグナル） |
| A2 | AWS Skill Builder | skillbuilder.aws | 公式ラーニングパス。Exam Prep コースの構成 = 出題範囲の実質定義 |
| A3 | What's New with AWS | aws.amazon.com/new | サービス更新の検知（SAA 中核サービス: VPC/EC2/S3/IAM/RDS に絞って追う） |
| A4 | Well-Architected Framework | aws.amazon.com/architecture/well-architected | SAA の設計原則（可用性・コスト・耐障害性）の正本。ガイド本文の骨格に使用 |

## 更新頻度 × 影響度マトリクスと手動チェック周期

自動収集パイプラインは導入しない（`litellm`/`dspy` 禁止、および静的サイト運用の単純さ維持のため。
`plans/README.md` の却下項目参照）。以下の手動チェック周期を推奨する。

| 情報源 | 更新頻度 | 試験対策への影響度 | 推奨チェック周期 |
|--------|---------|-------------------|----------------|
| G1/A1 試験ガイド | 低（年 0〜2 回の改訂） | **致命的**（ドメイン構成・% が変わる） | **月 1 回** + G6 の告知検知時は即時 |
| G6 認定告知 | 低〜中 | 高（改訂の先行シグナル） | 月 1 回 |
| G3/A2 ラーニングパス | 中 | 高（出題傾向の変化） | 四半期 1 回 |
| G2/A3 リリースノート | 高（毎週） | 中（個別ページの記述陳腐化） | 四半期 1 回、対象サービスに絞る |
| G4/G5/A4 ドキュメント | 中 | 中（執筆時の裏取り用） | ページ執筆・改訂時に都度 |
| G7 Workspace 更新 | 中 | 中（AGWA のみ） | AGWA 拡充作業の開始時 + 四半期 1 回 |

## 試験改訂の検知・反映手順（運用フロー）

1. **検知**: 月次チェックで G1/A1 の試験ガイドを開き、(a) 試験コード / バージョン表記、
   (b) ドメイン名と出題比率、(c) 「変更予定」の告知バナー、を前回記録と比較する。
2. **記録**: 差分があれば `plans/` に `NNN-exam-revision-<exam-id>.md` を起票し、
   変更点（旧→新のドメイン比較表）を記録する。
3. **影響範囲の特定**: `app/constants.ts` の該当 `Exam.domains[].pct` と、影響を受ける
   セクションページ（`app/gcl/<exam>/section*/`）を列挙する。
4. **反映**: 通常の TDD ワークフロー（`.claude/rules/tdd-commit-workflow.md`）で実装。
   `pct` の更新は constants の変更のみで済む設計になっている（001 の強み参照）。
5. **刻印**: 004 で提案する `examVersion` / `lastReviewed` メタデータが導入されたら、
   反映完了時に必ず更新する。

前回チェック結果の置き場は本ディレクトリ（`plans/exam-revision-log.md` を初回チェック時に作成）とし、
「いつ・どの試験ガイドの・どの版を確認したか」を 1 行ずつ追記する。

## 収集カテゴリの定義（003 のギャップ分析の物差し）

試験対策プラットフォームとして扱う情報は次の 6 カテゴリに分類する。

1. **試験メタ情報**: ドメイン構成・比率・問題数・時間・改訂履歴（→ G1/A1/G6）
2. **サービス知識**: 各サービスの仕様・制限・料金モデルの要点（→ G4/A3）
3. **実践手順**: コンソール / CLI のハンズオン手順（→ G3/A2）
4. **設計原則**: アーキテクチャパターン・ベストプラクティス（→ G5/A4）
5. **横断比較**: GCP↔AWS サービス対応・用語対応（→ G4 + A3 の突合。現在**未収集** — 003 で評価）
6. **最新動向**: GA/Deprecated・新サービス（→ G2/A3。現在ページ化する受け皿が**ない** — 003/004 で評価）

## Done criteria

- [x] GCP / AWS の情報源カタログが用途付きで整理されている
- [x] チェック周期が影響度に基づいて定義されている
- [x] 試験改訂の検知→反映フローが既存ワークフロー（TDD ルール、constants 正本）に接続されている

## Maintenance notes

- URL・試験コード（SAA-C03 等）は改訂で変わる。月次チェック時に本カタログ自体も見直すこと。
- 将来 RSS / Atom ベースの軽量ウォッチ（例: リリースノートのフィード購読）を導入する場合も、
  ビルドパイプラインには組み込まず、運用者の手元ツールに留めること（静的サイトの単純さを守る）。
