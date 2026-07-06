# Plan 003: カテゴリギャップ分析 — 収集・整備すべき領域の特定

> **Executor instructions**: 本ドキュメントは評価と優先度付けの記録であり、実装ステップを
> 含まない。ここで HIGH 優先とされた項目は、着手時に個別の実装プラン
> （`plans/005+`、plan-template.md 準拠）として起票してから実装すること。
> 本ファイルの優先度表を実装の代わりに使ってはならない（検証ゲートがないため）。
>
> **Drift check**: `git diff --stat 133d4ad..HEAD -- app/ archive/`

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/001-current-state-analysis.md, plans/002-information-sources-strategy.md
- **Category**: direction
- **Planned at**: commit `133d4ad`, 2026-07-06

## なぜ重要か

001 で確定した現状（GCP 5 試験 available / AWS SAA 未着手）に対し、
「試験対策プラットフォームとして次に何を収集・整備すべきか」を、
(A) 既存試験の未完部分、(B) 追加候補試験、(C) 試験横断の欠落カテゴリ、の 3 軸で評価する。
評価基準は Impact（学習価値・ユーザー面）× Effort（S/M/L）× 既存アーキテクチャとの親和性。

## A. 既存試験の未完部分（負債に近いギャップ）

| 項目 | 根拠（001 参照） | Impact | Effort | 親和性 | 優先度 |
|------|-----------------|--------|--------|--------|--------|
| A-1 AWS SAA の実ページ化 | `coming-soon` のままナビに露出、`app/aws/` 未作成、リポジトリ内に SAA 資産なし | 高（AWS 対応の看板が空約束状態） | **L**（情報収集から必要 → 002 の A1/A2/A4 を使用） | 高（3 ファイルパターンがそのまま使える） | **HIGH** |
| A-2 AGWA section3〜4 追加 | 公式ガイド 4 セクション構成に対し section1〜2 のみ | 中 | M | 高（既存 AGWA パターン踏襲） | **MEDIUM** |
| A-3 GenAI Leader section3/4 の構造整備 | section1/2 はコンポーネント分割済み、3/4 は単一 page.tsx のまま | 低（表示は機能している） | S | 高 | LOW（内容改訂のタイミングで同時実施） |
| A-4 CLAUDE.md 構成図のドリフト修正 | archive/ 移動・ACE section4・app/api が未記載 | 中（エージェント作業の精度に直結） | S | — | **MEDIUM**（改善スキルの対象外につき別途実施） |

## B. 追加候補試験

### GCP（メイン）

| 候補 | Level | 既存資産との重複・流用 | Impact | Effort | 優先度 |
|------|-------|----------------------|--------|--------|--------|
| B-1 Professional Cloud Architect (PCA) | Professional | ACE の全ドメイン + architecture-guide が下敷きになる。ケーススタディ解説のみ新規 | 高（GCP 資格の旗艦。ACE 修了者の自然な次ステップ） | L | **HIGH** |
| B-2 Professional Cloud Security Engineer (PCSE) | Professional | ACE domain4（アクセスとセキュリティ）+ build-a-secure-google-cloud-network が流用可 | 中〜高 | M〜L | **MEDIUM** |
| B-3 Professional Cloud DevOps Engineer (PCDOE) | Professional | ACE domain3（運用管理）と重複あり。SRE 章は CDL section6 に種がある | 中 | L | LOW |
| B-4 Professional Data Engineer (PDE) | Professional | 既存資産との重複が薄い（BigQuery 等の深掘りが必要） | 中 | L | LOW |
| B-5 Professional ML Engineer (PMLE) | Professional | GenAI Leader は概念レベルで、実装レベルの重複は薄い | 中 | L | LOW |

**選定理由**: PCA は「ACE→PCA」という王道の学習動線を作れ、既存 ACE 資産（section1〜4、
architecture-guide、実践ガイド 4 本）の再編集で相当部分を賄える。PCSE は PCNE と同じ
「Professional 特化型」として ACE domain4 + セキュリティ実践ガイドの延長に置ける。

### AWS（補足）

| 候補 | Level | 既存資産 | Impact | Effort | 優先度 |
|------|-------|---------|--------|--------|--------|
| B-6 SAA（= A-1 と同一） | Associate | なし | 高 | L | **HIGH** |
| B-7 Cloud Practitioner (CLF-C02) | Foundational | なし（ただし SAA 資料のサブセットで構成可能） | 中（入門導線） | M（SAA 完成後なら S〜M） | MEDIUM（**SAA の後**） |
| B-8 AI Practitioner (AIF-C01) | Foundational | `archive/Aws/archive/` にフラッシュカード資産あり（ipynb/JSON 計 4 ファイル） | 中（GenAI Leader との対で「AI 資格を両クラウドで」という差別化） | M（既存資産をページ化） | **MEDIUM** |

**注目**: AIF-C01 はリポジトリ内で唯一 AWS の実資産が存在する試験（001 の発見 2 参照）。
「AWS は SAA から」という前提を置き直すなら、AIF-C01 を先行させる選択肢もある
（フラッシュカード JSON → ページ化は `md-to-nextjs-migration` パターンの小改造で済む）。

## C. 試験横断で欠けているコンテンツカテゴリ（002 の 6 分類を物差しに）

| 項目 | 対応する 002 カテゴリ | Impact | Effort | 親和性 | 優先度 |
|------|---------------------|--------|--------|--------|--------|
| C-1 模擬問題・クイズ機能 | 1, 2 | **高**（受動的読解 → 能動的想起へ。試験対策アプリの本丸） | M（Client コンポーネント + 問題データ constants。既存チェックリスト UI の延長） | 高 | **HIGH** |
| C-2 GCP↔AWS サービス対応表 | 5（現在未収集） | 高（両クラウド対応という本サイトの独自性を体現） | S〜M（単一ページ + `<table>` 規約準拠） | 高 | **HIGH** |
| C-3 試験改訂・最新動向ページ | 6（受け皿なし） | 中〜高（002 の月次チェック結果の公開先。「最新情報キャッチアップ」の看板） | S（更新ログ形式の単一ページから開始） | 高 | **MEDIUM** |
| C-4 用語集（グロッサリー） | 2, 5 | 中 | M（全既存ページからの用語抽出が主工数） | 高 | MEDIUM |
| C-5 学習進捗の永続化・横断ダッシュボード | — | 中（チェックリスト状態が現在ページ内で完結） | M（`lib/recentPages.ts` の localStorage パターンを進捗に拡張） | 中（SSR safe 設計が必要） | LOW〜MEDIUM |
| C-6 ハンズオン演習ガイドの体系化 | 3 | 中（実践ガイド 4 本が ACE 配下に埋まっており横断導線がない） | S（既存ページの再インデックスのみ） | 高 | LOW |

## 総合優先度（004 のロードマップ入力）

1. **HIGH**: A-1/B-6 AWS SAA ページ化、C-1 模擬問題機能、C-2 サービス対応表、B-1 PCA
2. **MEDIUM**: C-3 最新動向ページ、A-2 AGWA 拡充、B-8 AIF-C01、B-7 CLF-C02、C-4 用語集、A-4 CLAUDE.md 修正
3. **LOW**: B-3/B-4/B-5、A-3、C-5、C-6

依存順序の注意: C-2（対応表）と C-3（最新動向）は SAA 着手（A-1）と同時期に始めると
002 の AWS 情報収集を 1 回で使い回せる。C-1（模擬問題）はデータ構造設計が全試験に波及するため、
**最初の 1 試験（推奨: 問題数の少ない CDL または GenAI Leader）でプロトタイプしてから横展開**すること。

## Done criteria

- [x] 3 軸（未完部分 / 追加試験 / 横断カテゴリ）のギャップが評価基準付きで表化されている
- [x] 各項目に Impact / Effort / 親和性 / 優先度が付与されている
- [x] 004 が消費できる総合優先度リストが存在する

## Maintenance notes

- 優先度は 2026-07-06 時点の判断。試験改訂（002 の月次チェック）で前提が変わったら本表を更新する。
- B 群の試験を採用する際は、必ず 002 の G1/A1 で最新の試験ガイド版を確認してから
  実装プランを起票すること（ドメイン比率をハードコードする前に）。
