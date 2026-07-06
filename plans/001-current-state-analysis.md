# Plan 001: 現状分析 — app/ 構成と試験カバレッジの正確な把握

> **Executor instructions**: 本ドキュメントは分析結果の記録（read-only 成果物）であり、
> コード変更ステップを含まない。後続プラン（002〜004）の前提資料として読むこと。
> 記載内容と実リポジトリに乖離を発見した場合は、本ファイルを直接修正せず
> `plans/README.md` に BLOCKED として記録し報告すること。
>
> **Drift check**: `git diff --stat 133d4ad..HEAD -- app/ CLAUDE.md archive/`
> 差分があれば下記「現状」の各表を実態と突合してから利用する。

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs / direction（分析）
- **Planned at**: commit `133d4ad`, 2026-07-06

## なぜ重要か

プラットフォーム拡張（002〜004）の判断はすべて「今なにがどこまで出来ているか」に依存する。
`app/constants.ts` の `EXAMS`（試験データ正本）と実ディレクトリ、および `CLAUDE.md` の記載には
すでに複数の乖離があり、これを放置したまま拡張計画を立てると、存在しない資産を前提にしたり
実在する資産を見落としたりする。本プランはその基準線（ベースライン）を確定する。

## アプリのアーキテクチャ要約

- **フレームワーク**: Next.js 16 App Router + Tailwind v4 + Bun。デプロイは Netlify（CI 自動）と Docker（standalone）。
- **試験データ正本**: `app/constants.ts` の `EXAMS: Exam[]`。`Exam` は `provider: 'GCP' | 'AWS'`、
  `status?: 'available' | 'coming-soon'`、`domains: ExamDomain[]` を持つ。
- **データ駆動ナビ**: `app/navigation.ts` の `toNavTree(EXAMS)` が `components/Header.tsx` の
  ナビツリーを自動生成。**新試験追加は 3 ファイル変更のみ**（① `app/constants.ts` に Exam エントリ、
  ② `app/globals.css` に `icon-theme-<id>`、③ 試験ページ作成）。
- **CSS**: 3 層トークン（Layer 1 グローバルセマンティック / Layer 2 共有プリミティブ / Layer 3 ページ固有テーマ）。
- **ページパターン**: `page.tsx`（Server、メタデータ）+ `<Name>Guide.tsx`（Client、進捗バー・scroll spy・
  チェックリスト）+ `NavBar.tsx` + `constants.ts`（Mermaid 図定義）+ `page.module.css`。
- **テスト**: Vitest（`__tests__/`）+ Playwright（`e2e/`、smoke/nav/a11y/visual/perf）。
  カバレッジダッシュボードは静的スキャン生成（`bun run dashboard`）。

## 試験カバレッジ表（EXAMS × 実ディレクトリ突合、commit `133d4ad` 時点）

| 試験 | Provider | Level | status | 実ページ | 備考 |
|------|----------|-------|--------|---------|------|
| Associate Cloud Engineer (ACE) | GCP | Associate | available | `app/gcl/associate-cloud-engineer/` | 最充実。section1〜4 完全ガイド、domain1〜4、実践ガイド 4 本、complete-advanced-guide、architecture-guide |
| Generative AI Leader | GCP | Foundational | available | `app/gcl/genai-leader/` | section1〜4。section1/2 はコンポーネント分割済み、section3/4 は単一 page.tsx |
| Cloud Digital Leader (CDL) | GCP | Foundational | available | `app/gcl/cloud-digital-leader/` | section1〜6、共通コンポーネント（SectionCard 等）整備済み |
| Associate Google Workspace Administrator (AGWA) | GCP | Associate | available | `app/gcl/agwa/` | section1〜2 のみ。公式試験ガイドは 4 セクション構成のため **section3〜4 が未実装** |
| Professional Cloud Network Engineer (PCNE) | GCP | Professional | available | `app/gcl/professional-cloud-network-engineer{,-step-by-step}/` | 概要ガイド + ステップバイステップの 2 ルート |
| AWS Solutions Architect – Associate (SAA) | AWS | Associate | **coming-soon** | **なし**（`app/aws/` 未作成） | `href: /aws/solutions-architect-associate` は未解決。`domains: []` |

## 判明した乖離・注意事項（証拠付き）

1. **`app/aws/` が存在しない**: `EXAMS` の SAA エントリ（`app/constants.ts` の `id: 'aws-saa'`）は
   `coming-soon` でホーム非表示だが、ナビには「準備中」表示される。実ルートは未作成。
2. **AWS の移行元資産が SAA ではない**: `archive/Aws/archive/` の中身は
   AIF-C01（AWS Certified AI Practitioner）のフラッシュカード
   （`AIF-C01_flashcards*.ipynb`, `aif-c01_flashcards*.json`）のみ。
   **SAA のソース資料はリポジトリ内に存在しない**。SAA ページ化には新規の情報収集が必要（→ 002）。
3. **CLAUDE.md のディレクトリ記載ドリフト**:
   - `Gcl_Archive/`・`Aws/` はルート直下と記載されているが、実際は `archive/Gcl_Archive/`・`archive/Aws/`。
   - `app/gcl/associate-cloud-engineer/section4/`（AceSection4Guide.tsx ほか一式）が実在するが構成図に未記載。
   - `app/api/health/route.ts`（ヘルスチェック API）が実在するが構成図に未記載。
4. **GCL アーカイブは 5 試験分**: `archive/Gcl_Archive/` に ACE / AGWA / GenAI Leader / CDL / PCNE の
   旧 HTML 資料が残っており、移行元としての役割はほぼ完了している。

## プラットフォームの強みと制約

**強み**:

- 新試験追加の限界コストが低い（3 ファイルパターン + Header 自動反映）。
- ガイドページの型（Server/Client 分離、Mermaid 図 constants、進捗 UI）が確立しており、
  移行スキル（`html-to-nextjs-migration` / `md-to-nextjs-migration`）で量産可能。
- テスト・a11y・perf・セキュリティ監査の CI 基盤が既にある。

**制約**:

- コンテンツが静的 TSX のため、**内容更新 = コード変更 + デプロイ**。試験改訂への追随は
  運用プロセス（→ 002 の改訂検知）でカバーする必要がある。
- 学習状態はチェックリスト等がページ内 state / localStorage 依存（`lib/recentPages.ts` は履歴 5 件のみ）。
  横断的な学習進捗の永続化機構はない。
- 試験メタデータ（`Exam` 型）に試験バージョン・最終レビュー日を持つフィールドがなく、
  「情報がいつ時点か」をユーザーに提示できない（→ 004 のデータモデル拡張案）。

## Done criteria

- [x] EXAMS と実ディレクトリの突合表が作成されている
- [x] CLAUDE.md との乖離が証拠付きで記録されている
- [x] 後続プラン（002〜004）が参照する強み・制約が列挙されている

## Maintenance notes

- CLAUDE.md の構成図ドリフト（上記 3.）は本スキルの Hard Rule によりここでは修正しない。
  別途 `claude-md-management:revise-claude-md` 等での更新を推奨（軽微・低リスク）。
- AGWA section3〜4 の未実装は 003 のギャップ表で優先度評価する。
