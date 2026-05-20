---
name: spec-sync
description: >
  Audit and update all specification documents in this repository after feature additions.
  Use this skill when adding a new exam, new page, new navigation pattern, new architecture
  layer, or any change that affects the documented data flow or constraints.
  Trigger (日本語): 仕様書更新, 仕様書同期, ドキュメント更新, 仕様書を更新して, 仕様の乖離を直して,
  仕様書を精査して, CLAUDE.md を更新して, README を更新して, 仕様書が古い.
  Trigger (English): update specs, sync docs, update documentation, spec drift, audit specs,
  update CLAUDE.md, docs out of date, keep specs in sync.
---

# 仕様書同期スキル（spec-sync）

**🚨 開発時の必須ルール（TDD & Step-by-step Commit） 🚨**
仕様書の更新作業においても、対応するコード修正（実装やテスト修正）を伴う場合は必ず `.claude/rules/TDD_COMMIT_WORKFLOW.md` のステップバイステップ・コミットルールに従うこと。

## 目的

機能追加・リファクタ後に生じる仕様書とコードの乖離を検出し、すべての仕様書を現状に合わせて更新する。

---

## 対象仕様書と更新トリガー

| ファイル | 役割 | 更新が必要な変更 |
|---|---|---|
| `CLAUDE.md` | Claude Code 向け主仕様（アーキテクチャ・制約・コマンド） | アーキテクチャ変更、新ファイル追加、制約変更、試験追加 |
| `GEMINI.md` | Gemini CLI 向け主仕様（同等内容） | CLAUDE.md と同期して更新 |
| `.gemini/rules/migration-progress-sync.md` | Gemini 向け作業状況 | HEAD・テスト数・完了状況変更時 |
| `README.md` | ユーザー向け概要 | 新機能追加、試験追加、UI パターン変更 |
| `.claude/skills/md-to-nextjs-migration/SKILL.md` | MD→Next.js 移行ワークフロー | ナビ追加フロー変更、新ディレクトリ規約 |
| `.claude/skills/html-to-nextjs-migration/SKILL.md` | HTML→Next.js 移行ワークフロー | 同上 |
| `MIGRATION_PROGRESS.md` | 移行進捗（単一の正本） | 各ステップ完了時 |

---

## 機能追加カテゴリ別チェックリスト

### A. 新試験を追加した場合

**変更対象ファイル:**
1. `app/constants.ts` — `EXAMS` に `Exam` エントリ追加（これが正本、他は自動反映）
2. `app/globals.css` — `icon-theme-<id>` ユーティリティ追加

**仕様書更新:**
- [ ] `CLAUDE.md` のプロジェクト概要に試験名を追記
- [ ] `GEMINI.md` の プロジェクト構造に追記
- [ ] `README.md` の特徴セクションに追記
- [ ] `MIGRATION_PROGRESS.md` の「現在地」テスト数・HEAD を更新
- **触らないもの**: `components/Header.tsx`（toNavTree が自動反映）

### B. アーキテクチャ・データフローを変更した場合

**仕様書更新:**
- [ ] `CLAUDE.md` のアーキテクチャツリー（`app/` 配下のファイル一覧）を更新
- [ ] `CLAUDE.md` の制約事項セクションに変更内容を反映
- [ ] `GEMINI.md` のプロジェクト構造・注意事項を同期
- [ ] `.claude/skills/md-to-nextjs-migration/SKILL.md` の「新ページ追加時の手順」を更新
- [ ] `README.md` の特徴セクション（技術的変化が大きい場合のみ）

### C. 新ページ・新セクションを追加した場合

**仕様書更新:**
- [ ] `CLAUDE.md` のアーキテクチャツリーに `page.tsx` パスを追記
- [ ] `GEMINI.md` の `/app` 構造に追記
- [ ] `MIGRATION_PROGRESS.md` に完了済みステップとして記録
- [ ] `MIGRATION_PROGRESS.md` の「現在地」テスト数・HEAD を更新

### D. コンポーネントの制約を変更した場合

例: `Header.tsx` のインタフェース変更、`DisclaimerBanner.tsx` の制約変更など

**仕様書更新:**
- [ ] `CLAUDE.md` の制約事項セクションを更新
- [ ] `GEMINI.md` の注意事項を同期
- [ ] 関連スキルの SKILL.md を更新（手順に影響する場合）

### E. テスト構成・コマンドを変更した場合

**仕様書更新:**
- [ ] `CLAUDE.md` のテスト構成セクション
- [ ] `CLAUDE.md` のコマンドセクション
- [ ] `GEMINI.md` の「開発と実行」セクション
- [ ] `README.md` の「テストの実行」セクション

---

## 実行手順

### Step 1: 乖離検出

以下を確認して乖離箇所をリストアップする:

```bash
# 現在のファイルツリーを確認
find app -name "page.tsx" | sort
find app -name "constants.ts" | sort
find components -name "*.tsx" | sort
find e2e -name "*.spec.ts" | sort

# テスト数を確認
bun run test 2>&1 | grep "Tests"

# HEAD を確認
git log --oneline -1
```

### Step 2: 各仕様書を読み込み、現状と比較

- `CLAUDE.md` のアーキテクチャツリーが実ファイルツリーと一致しているか
- `CLAUDE.md` の制約事項が現在のコードの挙動と一致しているか
- `GEMINI.md` が `CLAUDE.md` と内容が同期しているか
- `.gemini/rules/migration-progress-sync.md` の HEAD・テスト数が最新か

### Step 3: 更新の優先順位

1. **CLAUDE.md** — Claude Code が毎回参照するため最優先
2. **GEMINI.md** — CLAUDE.md と同期して更新
3. **.claude/skills/\*/SKILL.md** — 手順が誤っていると誤った作業を引き起こすため優先
4. **.gemini/rules/** — Gemini 向け状態管理
5. **README.md** — ユーザー向け。大きな変化があれば更新、軽微なら省略可

### Step 4: 更新後の確認

```bash
# lint・build で型エラーがないことを確認
bun run lint
bun run build

# 更新をコミット
git add CLAUDE.md GEMINI.md README.md \
  .gemini/rules/migration-progress-sync.md \
  .claude/skills/*/SKILL.md \
  MIGRATION_PROGRESS.md
git commit -m "docs(specs): sync all spec docs after <feature-name>"
```

---

## 絶対に守るルール

1. **仕様書を実コードより先に更新しない** — コードが確定してから仕様書を合わせる
2. **CLAUDE.md の制約事項に「触らないもの」が書かれていたら、その制約自体も仕様書に反映する**
3. **テスト数は `bun run test` を実行した実数を記録する**（推定値禁止）
4. **HEAD は `git log --oneline -1` で取得した実 commit hash を記録する**
5. **GEMINI.md と CLAUDE.md の内容は必ず同期する**（片方だけ更新しない）
