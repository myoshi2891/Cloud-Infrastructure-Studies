---
name: infra-md-to-html
description: >
  このリポジトリの資格学習ガイド Markdown を、Gcp-pca-section4-process-optimization.html の
  デザインシステム（暗色ネイビー / サイドバー + スクロールスパイ / pre.mermaid インライン /
  脚注 + ref-grid）を正確に再現した自己完結型の単一 HTML ファイルへ変換する。
  内容の欠落とデザインのずれを防ぐ 2 つの機械的ゲートを適用する。
  ユーザーが次の語句を述べた場合に使用する:
  - "HTMLファイルを作成" / "MDからHTMLに変換" / "MD を HTML 化" / "ガイドをHTMLにする"
  - "資格ガイドのHTMLを作る" / "学習ガイドのHTMLを作成" / "単一HTMLに変換"
  - "convert md to html" / "create guide html" / "single file html guide"
  - またはリポジトリ直下のガイド Markdown ファイル名の指定（例: "Gcp-pca-section5-managing-implementation.md"）。
  スケルトンテンプレート、MD→HTML 対応規則、脚注と Mermaid の変換、フェーズ分割コミット、
  2 つの監査スクリプトを対象とする。
  この front matter は Claude Code 固有である。front matter を解釈しないエージェント向けに、
  同じトリガーを本文「エージェント互換」節へ複製している。
---

# 資格ガイド MD → 単一ファイル HTML 変換スキル

最終更新: 2026-08-15

## エージェント互換（Claude Code / Gemini CLI / その他）

冒頭の front matter（`name` / `description` / `allowed-tools`）は
**Claude Code 固有のメタデータ**で、他のエージェントは解釈しない。本スキルは本文だけで完結させる。

- **起動**: 下記トリガー語句が出たら、自動発火しない環境では本ファイルを明示的に開いてから作業する。
- **参照ファイル・雛形は自動で開かれない**。§1 の 6 ファイルと
  `templates/skeleton.html.tmpl` を**手動で開く**。開かずに markup を推測しない。
- **同梱スクリプトは依存パッケージ無しで動く**。実行系は `node` を明示する
  （`node .claude/skills/md-to-html/scripts/audit_content_parity.mjs …`）。
- **判定は終了コード**で行う（出力の目視ではなく `echo "exit=$?"`）。
  ゲートは 2 本とも exit 0 が必須。

**適用トリガー（本文が正。front matter と食い違ったら本節に合わせる）**:
「HTMLファイルを作成」「MDからHTMLに変換」「MD を HTML 化」「ガイドをHTMLにする」
「資格ガイドのHTMLを作る」「新しい資格ページを作成」/ `convert md to html` /
`create guide html` / `new certification page` / ガイドの Markdown ファイル名の指定。

> [!NOTE]
> **出力はリポジトリ直下の単一 HTML であり、Nuxt サイトのページではない。**
> 静的 HTML はサイト共通のグローバルヘッダーを持たない（あれは `app/components/SiteHeader.vue` の責務）。
> 生成した HTML を後で Nuxt へ移行する際に、ホーム（`app/pages/index.vue` の `guides`）と
> グローバルナビ（`SiteHeader.vue` の `navigation`）への登録が必要になる。
> 手順は `.claude/skills/nuxt-page-migration/SKILL.md` §5 Step 2.5 を参照。
> 本スキルの中でそれらを編集してはならない（責務が分かれている）。

## 0. このスキルが解決する問題

原本は長大である（CAPM ガイドで Markdown 61KB / 見出し 74 / リスト 114 項目 / 表 144 行 /
Mermaid 図 9）。これを手作業で HTML に転写すると、**必ず一部が脱落する**。目視では見落とす。

そこで本スキルは 2 つの機械ゲートを Green の前提条件にする。

| ゲート | 防ぐ欠陥 | 実現方法 |
|---|---|---|
| `audit_content_parity.mjs` | **文言の移行漏れ** | 原本 MD と生成 HTML の見出し・段落・リスト・表行・リンク・Mermaid ラベルを照合 |
| `audit_design_parity.mjs` | **デザインの移行漏れ** | CSS 変数・コンポーネント CSS・メディアクエリ・描画 JS・CDN/SRI・構造不変条件を原本 HTML と照合 |

さらに、デザインの大半は**テンプレートが原本から逐語コピーを保持している**ため、
テンプレートを使う限りデザイン漏れは構造的に起こらない。

## 1. 作業開始前に必ず読むファイル（順序固定）

1. `CLAUDE.md` — プロジェクト規約
2. `.claude/rules/no-absolute-paths.md` — コミット前の PII 検査
3. 原本 `<資格名>.md` — **全文**。要約して読まない
4. `Certified-Associate-in-Project-Management.html` — デザインの正（少なくとも `<body>` 冒頭と 1 セクション分）
5. `references/design-system.md` — コンポーネントの確定 markup
6. `references/conversion-rules.md` — 変換規則の全表

## 2. 入力と出力

| | パス |
|---|---|
| 入力（内容の正） | `<資格名>.md`（リポジトリ直下・フラット） |
| 出力（公開用） | `<資格名>.html`（リポジトリ直下・フラット） |
| デザインの正 | `Certified-Associate-in-Project-Management.html` |
| 雛形 | `.claude/skills/md-to-html/templates/skeleton.html.tmpl` |

**カテゴリ別のサブディレクトリは存在しない。** ファイル名は資格の正式名称をハイフンで繋ぐ。

## 3. 絶対ルール

> [!CAUTION]
> **100% 完全移植ルール**
>
> 原本の全セクション・全段落・全リスト項目・全表行・全図解・全参考文献リンクを移植する。
> 要約・省略・言い換え・統合は**すべて規約違反**。
> 「冗長だから省いた」「同じ趣旨なのでまとめた」「図に入り切らなかった」は理由にならない。
> 図に入り切らない語句は削るのではなく**本文側へ移す**。

- 内容の正は `.md`、デザインの正は `.html`。迷ったら両方を読む
- 出題比率・受験料・PDU 数・問題数などの**数値を推測で書き換えない**
- 一次情報（PMI 公式サイト・Exam Content Outline）と食い違う記述を見つけても勝手に直さず、
  ユーザーに提示して確認を取る
- 原本 `.md` は削除も改変もしない（HTML 化は `.md` を正とする一方向の派生）

## 4. 手順（Phase 0 → 5）

### Phase 0: インベントリと対応表の確定

まず原本の実数を機械的に把握する。

```bash
SRC=<資格名>.md
grep -c '^## '        "$SRC"   # セクション数
grep -c '^### '       "$SRC"   # 小見出し数
grep -cE '^\s*([-*+]|[0-9]+\.)\s' "$SRC"   # リスト項目数
grep -c '^|'          "$SRC"   # 表の行数
grep -c '^```mermaid' "$SRC"   # 図の数
grep -oE 'https?://[^ )）"]+' "$SRC" | sort -u | wc -l   # 外部リンクの実数
```

次に**セクション対応表**を作り、ユーザーに提示してから実装に入る。
セクション `id` と Tabler アイコンは日本語見出しから機械的に導けないため、ここで確定させる。

| # | 原本の `##` 見出し | section id | サイドバー表示名 | アイコン | 図 id |
|---|---|---|---|---|---|
| 01 | 1. ○○とは何か | `what-is-xxx` | ○○とは | `ti-certificate` | — |

命名規約とアイコン一覧は `references/design-system.md` §6、既定値は
`references/conversion-rules.md` §3 にある。**同じアイコンを 2 つのセクションに割り当てない。**

**通過条件**: 対応表の行数が `grep -c '^## '` の結果（`## 目次` を除く）と一致すること。

### Phase 1: スケルトンの生成

テンプレートをコピーし、プレースホルダを置換する。

```bash
cp .claude/skills/md-to-html/templates/skeleton.html.tmpl <資格名>.html
```

置換対象は 12 個。`Edit` で 1 つずつ確実に置き換える。

| プレースホルダ | 内容 | 既定 |
|---|---|---|
| `{{LANG}}` | 言語 | `ja` |
| `{{PAGE_TITLE}}` | `<略称>® 認定資格 完全ガイド \| <副題>` | — |
| `{{META_DESCRIPTION}}` | 1 文の概要 | — |
| `{{BRAND_TITLE}}` | `<略称>® 完全ガイド` | — |
| `{{BRAND_SUBTITLE}}` | 副題（短縮形） | — |
| `{{HERO_EYEBROW_ICON}}` | hero のアイコン | `ti-award` |
| `{{HERO_EYEBROW}}` | 出典を示す一言 | — |
| `{{HERO_H1}}` | ページタイトル | — |
| `{{HERO_LEDE}}` | **原本の副題行をそのまま入れる** | — |
| `{{STAT_CARDS}}` | `.stat-card` × **4 枚固定** | — |
| `{{DISCLAIMER_HTML}}` | 免責文（公式サイトへの `<a>` を必ず含む） | — |
| `{{SIDEBAR_NAV}}` | 対応表から生成した `<li>` 群 | — |
| `{{FOOTER_HTML}}` | 商標表記と免責 | — |

`<!-- ##SECTION_INSERT## -->` と `/* ##DIAGRAMS_INSERT## */` は**この段階では消さない**。

**通過条件**:

```bash
node .claude/skills/md-to-html/scripts/audit_design_parity.mjs <資格名>.html --template
echo "exit=$?"   # 0 であること（CSS 変数・CSS ルール・CDN・JS が原本と一致）
```

### Phase 2: 前半セクションの挿入

対応表の前半を `<!-- ##SECTION_INSERT## -->` の**直前**に `Edit` で挿入する。

> [!IMPORTANT]
> **1 回の `Edit` で挿入するセクションは最大 3 個まで。**
> 大きな書き込みは脱落を招く。原本の該当箇所を `Read` してから、
> `references/conversion-rules.md` の対応表どおりに変換する。

各セクションは `references/design-system.md` §3 の雛形に従う。

### Phase 3: 後半セクションと図の挿入

残りのセクションを同様に挿入し、Mermaid を `/* ##DIAGRAMS_INSERT## */` の位置に追加する。

図は 3 箇所セットで編集する（`references/conversion-rules.md` §5）。
**暗色パレットは必ず置換する。** `classDef` は `box` / `hub` / `done` の 3 役のみ。

すべて挿入し終えたら 2 つのマーカー行を削除する。

### Phase 4: 監査（ハードゲート）

```bash
NAME=<資格名>
node .claude/skills/md-to-html/scripts/audit_content_parity.mjs "$NAME.md" "$NAME.html"; echo "content exit=$?"
node .claude/skills/md-to-html/scripts/audit_design_parity.mjs  "$NAME.html";            echo "design  exit=$?"
```

> [!CAUTION]
> **両方 exit 0 になるまで次のフェーズへ進んではならない。**
> 監査を通すために監査スクリプト側を緩めることは禁止。直すのは常に HTML の側である。
> 原本に無い要素を追加して数を合わせることも禁止。

`⚠️` の警告は blocking ではないが、**1 件ずつ本文ごと落ちていないか目視し**、
正当と判断した理由をコミットメッセージ本文に書き残す。
警告カテゴリの意味は `references/conversion-rules.md` §8 を参照。

### Phase 5: 最終確認とコミット

1. ブラウザで開き、次の 3 点を目視する
   - Mermaid 図が全て描画される（`図を読み込み中...` のまま残っていない）
   - サイドバーのリンクが全て機能し、スクロールに応じて `.active` が移動する
   - ウィンドウ幅 980px 未満でトグルからナビゲーションに到達できる
2. コミット前検査（`.claude/rules/no-absolute-paths.md` のゲート条件）

    ```bash
    git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
    ```

3. 総合チェックは `pre-commit-check` スキルを使う

## 5. コミット戦略（4 分割）

一括コミットは規約違反。フェーズごとに分ける。

```text
feat(<資格略称>): <資格名>.html — Phase 1/4: スケルトン
feat(<資格略称>): <資格名>.html — Phase 2/4: セクション 1-N
feat(<資格略称>): <資格名>.html — Phase 3/4: セクション N-M と図解
feat(<資格略称>): <資格名>.html — Phase 4/4: 監査通過と仕上げ
```

メッセージ本文の書式:

```text
feat(capm): Certified-Associate-in-Project-Management.html — Phase 4/4: 監査通過と仕上げ

Progress: 15/15 sections complete
- 原本照合監査 exit 0 / デザイン照合監査 exit 0
- 正当と判断した差分: `## 目次` はサイドバー TOC へ再型付け（理由: …）

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

## 6. 厳格な確認事項（最終チェックリスト）

コミット前に全項目を確認する。

- [ ] `audit_content_parity.mjs` が exit 0
- [ ] `audit_design_parity.mjs` が exit 0
- [ ] `⚠️` 警告を 1 件ずつ確認し、理由をコミットメッセージに記載した
- [ ] `{{...}}` と `##...##` がファイルに 1 つも残っていない
- [ ] 原本の `##` セクションが全て `<section>` として存在する
- [ ] サイドバーのリンク数 == `<section>` 数（過不足なし）
- [ ] サイドバーとセクションのアイコンが全て一致
- [ ] `SECTION 01` から連番で飛びが無い
- [ ] 全ての `<table>` が `.table-wrap` に包まれている
- [ ] `.diagram-container` の `id` と `DIAGRAMS` のキーが 1:1
- [ ] Mermaid の `classDef` が `box` / `hub` / `done` のみ、暗色パレットが残っていない
- [ ] 全ての外部リンクに `target="_blank"` と `rel="noopener"` が付いている
- [ ] CDN 5 資産が完全バージョン固定 + `integrity` + `crossorigin`
- [ ] `<h1>` がページに 1 個だけ（hero 内）
- [ ] `.stat-card` が 4 枚
- [ ] ブラウザで図が描画され、スクロール連動とモバイルナビが動く
- [ ] PII 検査（絶対パス混入チェック）が無出力

## 7. 禁止事項

### 内容

- 原本のセクション・段落・リスト項目・表行・リンクの省略、要約、言い換え
- Mermaid ラベルの語句を削り、本文にも残さないこと
- 原本に存在しない要素の追加（監査を通すための捏造を含む）
- 数値（出題比率・料金・PDU 数）の推測による書き換え

### デザイン

- `references/design-system.md` に無い class の発明
- CSS 変数の値の改変、コンポーネント CSS の削除
- `<svg>` への幅・高さ指定（描画 JS の後処理と競合する）
- 存在しないコンポーネント（back-to-top / アコーディオン / ダークモード切替等）の追加
- CDN の `@latest` / メジャー指定での参照、`integrity` 無しでの読み込み

### 手順

- 監査 exit 0 を確認せずに次フェーズへ進むこと
- 監査スクリプトを緩めて通すこと
- 1 回の `Edit` で 4 セクション以上を挿入すること
- 挿入マーカーを Phase 3 完了前に削除すること
- 記憶に頼って色・class 名・アイコン名を書くこと（必ず参照元を読む）

## 8. 既知の誤検知（対応不要）

| 検知元 | 内容 | 対応 |
|---|---|---|
| cSpell | `PMBOK` `PMI` `ECO` `PDU` `Scrum` `Kanban` `SAFe` `RTM` などの資格用語 | `.cspell.json` の `words` に追加。文言は変えない |
| SonarQube `css:S7924` | CSS 変数を使った色のコントラスト不足 | 変数の実値は WCAG AA を満たす。誤検知 |
| SonarQube | `--color-indigo-dark` / `--color-success-*` が未参照 | 原本から逐語コピーした変数。削除しない |
| SonarQube `javascript:S3776` 等 | 監査スクリプトの認知的複雑度・正規表現 | 検査項目を列挙する性質上のもの。動作はテストで担保 |

## 9. 監査スクリプトの仕様

### `audit_content_parity.mjs`

```bash
node .claude/skills/md-to-html/scripts/audit_content_parity.mjs <source.md> <page.html> [--json]
```

blocking: h1/h2 の消失 / 段落・リスト項目・表行の消失 / 外部リンクの消失 /
Mermaid の図数不一致 / Mermaid ラベルの語句がページのどこにも無い / 承認外の図の配色。

warning: h3 以下の文言がページに見当たらない / 見出しレベルの変化 / 図のラベルの短縮。

設計上の判断（意図的な緩和）はスクリプト冒頭のコメントに理由付きで記載してある。
要点は「同種要素の多重集合 → ページ全文への包含 → 語句単位の包含」の 3 段フォールバックで、
`.glossary-grid` や `.step-list` への再型付けを漏れと誤判定しないようにしていること。

### `audit_design_parity.mjs`

```bash
node .claude/skills/md-to-html/scripts/audit_design_parity.mjs <page.html> \
  [--reference Certified-Associate-in-Project-Management.html] [--template] [--json]
```

`--template` はマーカーと本文構造の検査を省く（雛形自身の健全性検査用）。

### テスト

```bash
node --test .claude/skills/md-to-html/scripts/audit_content_parity.test.mjs
node --test .claude/skills/md-to-html/scripts/audit_design_parity.test.mjs
```

> [!NOTE]
> `node --test <ディレクトリ>` は Node 22 では動作しない。**ファイルパスを直接指定する。**

### 既知の実行結果（基準値）

| 実行 | 期待 |
|---|---|
| `audit_design_parity.mjs templates/skeleton.html.tmpl --template` | **exit 0** |
| `audit_design_parity.mjs Certified-Associate-in-Project-Management.html` | **exit 1**。ただし `cdn` カテゴリのみ。これは `CLAUDE.md` と `cdn-sri-mermaid-fix` が記録済みの未適用課題であり、本スキルの不具合ではない |
| `audit_content_parity.mjs` を CAPM ペアに実行 | **exit 1**。原本 HTML に実在する 13 件の転写漏れを検出する（Mermaid ラベルからの語句消失が中心）。新規ページでは exit 0 にすること |

## 10. 関連ファイル

| ファイル | 役割 |
|---|---|
| `templates/skeleton.html.tmpl` | CSS/JS を原本から逐語保持したページ雛形 |
| `references/design-system.md` | コンポーネントの確定 markup とトークン一覧 |
| `references/conversion-rules.md` | MD → HTML の変換規則の全表 |
| `scripts/audit_content_parity.mjs` | 転写漏れ検出ゲート |
| `scripts/audit_design_parity.mjs` | デザイン漏れ検出ゲート |
| `.claude/skills/fix-mermaid/SKILL.md` | Mermaid の構文エラー・配色・サイズの修正 |
| `.claude/skills/cdn-sri-mermaid-fix/SKILL.md` | CDN 固定と SRI ハッシュの実測手順 |
| `.claude/skills/markdown-formatter/SKILL.md` | 原本 Markdown 側の書式修正 |
| `.claude/skills/pre-commit-check/SKILL.md` | コミット前の総合チェック |
| `.claude/rules/no-absolute-paths.md` | PII 検査（常時有効） |

### 監査ヘルパを `nuxt-page-migration` と共有していない理由

`nuxt-page-migration/scripts/audit_source_parity.mjs` は移植先が `.vue` / `.tsx` 専用で、
`.html` を渡すと JSX 用の抽出経路へ落ちる。また Mermaid ソースを**逐語完全一致**で判定するため、
本スキルが要求する再テーマ（暗色 → デザインシステム配色）を必ず不一致と判定してしまう。
正規化ヘルパ（`normalize` / `matchKey` / `decodeEntities` / `stripMarkup`）は意図的に複製し、
各スキルを自己完結に保っている。**片方を直したときは、もう片方に波及が要るか確認すること。**
