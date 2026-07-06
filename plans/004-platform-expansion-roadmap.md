# Plan 004: プラットフォーム拡張ロードマップ — 最新試験情報をキャッチアップできる学習基盤へ

> **Executor instructions**: 本ドキュメントは方向性の設計であり、そのまま実装してはならない。
> 各フェーズに着手する際は、対象項目ごとに plan-template.md 準拠の実装プラン
> （`plans/005+`）を起票し、TDD ワークフロー（`.claude/rules/tdd-commit-workflow.md`）に
> 従って実装すること。データモデル拡張案（下記）は提案であり、採否は起票時に判断する。
>
> **Drift check**: `git diff --stat 133d4ad..HEAD -- app/constants.ts app/navigation.ts`

## Status

- **Priority**: P2
- **Effort**: M（本書自体）/ 各フェーズは個別見積り
- **Risk**: LOW（本書自体はコード変更なし）
- **Depends on**: plans/001〜003
- **Category**: direction
- **Planned at**: commit `133d4ad`, 2026-07-06

## ビジョン

「GCP をメイン、AWS を補足として、**試験別学習・横断リファレンス・最新情報キャッチアップの
3 本柱**で構成される日本語のクラウド資格学習プラットフォーム」。
現在は 1 本目の柱（試験別学習、GCP 5 試験）のみが立っている状態（001 参照）。

## 情報アーキテクチャ（あるべき構成）

```text
ホーム
├─ 柱 1: 試験別学習（既存）           EXAMS データ駆動、provider でグルーピング
│   ├─ GCP: ACE / GenAI / CDL / AGWA / PCNE（available）
│   ├─ GCP 拡張: PCA → PCSE（003 の B 群 HIGH/MEDIUM）
│   └─ AWS: SAA → AIF-C01 / CLF-C02（003 の A-1, B-7, B-8）
├─ 柱 2: 試験横断リファレンス（新設）
│   ├─ GCP↔AWS サービス対応表（003 C-2）
│   ├─ 用語集（003 C-4）
│   └─ ハンズオン演習インデックス（003 C-6）
└─ 柱 3: 最新情報キャッチアップ（新設）
    ├─ 試験改訂ウォッチ（002 の月次チェック結果の公開面。003 C-3）
    └─ 主要サービス更新ダイジェスト（四半期。G2/A3 由来）
```

ルーティング案: 柱 2 は `app/reference/`、柱 3 は `app/updates/` を新設する。
柱 2・3 は特定試験に属さないため `EXAMS` には載せず、ナビ拡張は
`app/navigation.ts` の `toNavTree` に「試験外セクション」を追加する形で行う
（`components/Header.tsx` 直接編集禁止の規約は維持）。

## データモデル拡張案（提案のみ・実装しない）

`app/constants.ts` の `Exam` インターフェースへの追加候補:

```ts
export interface Exam {
    // ...既存フィールド...
    /** 試験ガイドの版（例: 'SAA-C03'、GCP は改訂日ベース '2025-10'） */
    examVersion?: string;
    /** コンテンツを最後に公式ガイドと突合した日（YYYY-MM-DD） */
    lastReviewed?: string;
}
```

- 目的: 「この対策情報はいつ時点の試験ガイド準拠か」をカード・ページに表示し、
  002 の改訂検知フローの反映状況を機械的に追えるようにする（001 の制約 3 への対処）。
- optional フィールドのため既存 5 試験のエントリは無変更でビルドが通る。段階的に付与できる。
- 模擬問題（003 C-1）を導入する場合は、問題データを各試験ディレクトリの
  `constants.ts`（Mermaid 図と同じ置き方）に `QuizQuestion[]` として置き、
  出題 UI は共通 Client コンポーネント（`components/Quiz.tsx` 等）に集約する。

## フェーズ分けロードマップ

各フェーズの実装は「3 ファイルパターン」（constants.ts / globals.css / ページ）と
移行スキル（`html-to-nextjs-migration` / `md-to-nextjs-migration`）を使う。

### Phase 1: AWS SAA ページ化（003 A-1。看板の空約束を解消する）

- 002 の A1/A2/A4 で情報収集 → 試験ガイド構成の Markdown 化 → `md-to-nextjs-migration` でページ化。
- `app/aws/solutions-architect-associate/` を新設し、`EXAMS` の `status: 'coming-soon'` を解除、
  `domains` を実ページに合わせて充填。
- **Done 基準**: SAA カードがホームに表示され、少なくとも試験概要 + ドメイン別 1 ページが公開。
  `bun run test` / `bun run test:e2e`（nav smoke）パス。

### Phase 2: 横断リファレンス（003 C-2 → C-4 → C-6 の順）

- `app/reference/` 新設。第 1 弾は GCP↔AWS サービス対応表
  （Phase 1 の AWS 収集結果を再利用。`<table>` + `<thead>` + `<th scope="col">` 規約準拠）。
- **Done 基準**: 対応表ページが Header ナビから到達可能。主要カテゴリ
  （コンピュート / ストレージ / DB / ネットワーク / IAM）を網羅。

### Phase 3: キャッチアップ機構（003 C-3。「最新情報」の柱を立てる）

- `app/updates/` 新設。002 の月次チェック（`plans/exam-revision-log.md`）の結果を
  更新ログ形式で公開する軽量ページから開始。
- `Exam.examVersion` / `lastReviewed` を導入し、各試験カードに表示。
- **Done 基準**: 月次チェック 1 回分がページに反映され、全 available 試験に `lastReviewed` が付与。

### Phase 4: GCP Professional 系拡充 + 模擬問題（003 B-1, C-1）

- PCA を ACE 資産の再編集 + ケーススタディ新規で立ち上げ（PCNE の 2 ルート構成を踏襲）。
- 模擬問題は CDL または GenAI Leader でプロトタイプ → 横展開（003 の依存順序注意を参照）。
- **Done 基準**: PCA カード公開、模擬問題コンポーネントが 1 試験で稼働し a11y テストをパス。

## フェーズ共通の運用原則

1. 各フェーズ完了時に `spec-sync` スキル（Definition of Done）を適用し、
   CLAUDE.md / README / MIGRATION_PROGRESS.md を同期する。
2. 002 の月次チェックはフェーズ進行と独立して継続する（改訂検知は全フェーズに割り込み得る）。
3. 静的サイト + データ駆動ナビの単純さを壊す提案（CMS、外部 API 依存、自動収集パイプライン）は
   採用しない（`plans/README.md` 却下項目参照）。再検討条件: 対応試験が 10 を超え、
   かつ月次の手動更新が 1 人日を超えるようになった場合のみ。

## Done criteria（本書）

- [x] 3 本柱の情報アーキテクチャとルーティング案が提示されている
- [x] データモデル拡張案が既存互換（optional）で提案されている
- [x] フェーズごとの Done 基準と既存スキル・規約への接続が明記されている

## STOP conditions（各フェーズ実装時の共通事項）

- `EXAMS` / `toNavTree` の構造が本書の前提から変わっていた場合、実装プラン起票前に本書を見直す。
- 新設ルート（`app/aws/`, `app/reference/`, `app/updates/`）が既に別用途で作られていた場合は
  重複させず、既存実装との整合を確認して報告する。

## Maintenance notes

- 本書は「生きたロードマップ」。フェーズ完了ごとに `plans/README.md` のステータスとともに
  本書のフェーズ節へ完了日を追記する。
- Phase 1 が完了すると `STATS`（`app/constants.ts`）の「対応試験数」も更新が必要になる点に注意。
