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

(最終更新日: 2026-08-19)

## エージェント互換（Claude Code / Gemini CLI / その他）

冒頭の front matter（`name` / `description`）は **Claude Code 固有のメタデータ**で、
他のエージェントは解釈しない。本スキルは本文だけで完結させる。

- **起動**: 下記トリガー語句が出たら、自動発火しない環境では本ファイルを明示的に開いてから作業する。
- **参照ファイル・雛形は自動で開かれない**。§1 の 7 ファイルと
  `.agents/skills/md-to-html/templates/skeleton.html.tmpl` を**手動で開く**。開かずに markup を推測しない。
- **同梱スクリプトは依存パッケージ無しで動く**。実行は `bun` に統一する
  （`bun .agents/skills/md-to-html/scripts/audit_content_parity.mjs …`）。
- **判定は終了コード**で行う（出力の目視ではなく `echo "exit=$?"`）。
  ゲートは 2 本とも exit 0 が必須。

**適用トリガー（本文が正。front matter と食い違ったら本節に合わせる）**:
「HTMLファイルを作成」「MDからHTMLに変換」「MD を HTML 化」「ガイドをHTMLにする」
「資格ガイドのHTMLを作る」「学習ガイドのHTMLを作成」「単一HTMLに変換」/
`convert md to html` / `create guide html` / `single file html guide` /
リポジトリ直下のガイド Markdown ファイル名の指定。

## このスキルは3系統に複製されている（エージェント非依存）

`.agents/skills/md-to-html/` を**正本**とし、`.claude/` と `.gemini/` 配下は複製である。
編集後は `.agents/rules/tdd-commit-workflow.md` §8 の `rsync` 手順で必ず同期し、
`__tests__/skills/agent-mirror-sync.test.ts` が 3 系統のバイト一致を検証する。

- スクリプトは常に `.agents/skills/md-to-html/scripts/*` を実行する。
  **ミラー配下（`.claude/` / `.gemini/`）のコピーを実行しない。**
- 本文の「検索する」「読む」「編集する」は能力名である
  （Claude Code: `Grep` / `Read` / `Edit`、Gemini CLI: `search_file_content` / `read_file` / `replace`）。
- 実行コマンドは `bun` に統一する。監査スクリプトの自己テストも例外ではなく、
  `bun run test:md-to-html`（実体は `bun test` にテストファイルのパスを明示指定）で実行する。

> [!NOTE]
> **出力はリポジトリ直下の単一 HTML であり、Next.js アプリのページではない。**
> 静的 HTML は `components/Header.tsx` のグローバルナビを持たない（自前のサイドバーを持つ）。
> 生成した HTML を後で `app/` 配下へ移行する場合は
> `.agents/skills/html-to-nextjs-migration/SKILL.md` の責務であり、
> `app/constants.ts` の `EXAMS` 登録もそちらで行う。**本スキルの中で `app/` を編集してはならない。**

## 0. このスキルが解決する問題

原本は長大である（PCA Section 4 で Markdown 747 行 / 見出し 24 / リスト 30 項目 /
表 125 行 / Mermaid 図 15 / 脚注 32）。これを手作業で HTML に転写すると、**必ず一部が脱落する**。
目視では見落とす。

そこで本スキルは 2 つの機械ゲートを Green の前提条件にする。

| ゲート | 防ぐ欠陥 | 実現方法 |
|---|---|---|
| `audit_content_parity.mjs` | **文言の移行漏れ** | 原本 MD と生成 HTML の見出し・段落・リスト・表行・リンク・脚注・Mermaid ラベルを照合 |
| `audit_design_parity.mjs` | **デザインの移行漏れ** | CSS 変数・コンポーネント CSS・メディアクエリ・描画 JS・CDN/SRI・構造不変条件を原本 HTML と照合 |

さらに、デザインの大半は**テンプレートが原本から逐語コピーを保持している**ため、
テンプレートを使う限りデザイン漏れは構造的に起こらない。

## 1. 作業開始前に必ず読むファイル（順序固定）

1. `CLAUDE.md` — プロジェクト規約
2. `.agents/rules/tdd-commit-workflow.md` — TDD とコミット分割の必須ルール
3. `.agents/rules/no-absolute-paths.md` — コミット前の PII 検査
4. 原本 `<ガイド名>.md` — **全文**。要約して読まない
5. `Gcp-pca-section4-process-optimization.html` — デザインの正
   （少なくとも `<body>` 冒頭と 1 セクション分）
6. `.agents/skills/md-to-html/references/design-system.md` — コンポーネントの確定 markup
7. `.agents/skills/md-to-html/references/conversion-rules.md` — 変換規則の全表

## 2. 入力と出力

| | パス |
|---|---|
| 入力（内容の正） | `<ガイド名>.md`（リポジトリ直下・フラット） |
| 出力（公開用） | `<ガイド名>.html`（リポジトリ直下・フラット） |
| デザインの正 | `Gcp-pca-section4-process-optimization.html` |
| 雛形 | `.agents/skills/md-to-html/templates/skeleton.html.tmpl` |

**カテゴリ別のサブディレクトリは存在しない。** ファイル名は先頭大文字のハイフン区切り
（`Gcp-pca-section5-managing-implementation.html`）。

## 3. 絶対ルール

> [!CAUTION]
> **100% 完全移植ルール**
>
> 原本の全セクション・全段落・全リスト項目・全表行・全図解・全脚注を移植する。
> 要約・省略・言い換え・統合は**すべて規約違反**。
> 「冗長だから省いた」「同じ趣旨なのでまとめた」「図に入り切らなかった」は理由にならない。
> 図に入り切らない語句は削るのではなく**本文側へ移す**。

- 内容の正は `.md`、デザインの正は `.html`。迷ったら両方を読む
- 出題比率・受験料・問題数などの**数値を推測で書き換えない**
- 一次情報（Google Cloud 公式ドキュメント・試験ガイド）と食い違う記述を見つけても勝手に直さず、
  ユーザーに提示して確認を取る
- 原本 `.md` は削除も改変もしない（HTML 化は `.md` を正とする一方向の派生）

## 4. 手順（Phase 0 → 5）

### Phase 0: インベントリと目次アンカーの確定

まず原本の実数を機械的に把握する。

```bash
SRC=<ガイド名>.md
grep -c '^## '        "$SRC"   # h2 の数
grep -c '^### '       "$SRC"   # h3 の数
grep -cE '^\s*([-*+]|[0-9]+\.)\s' "$SRC"   # リスト項目数
grep -c '^|'          "$SRC"   # 表の行数
grep -c '^```mermaid' "$SRC"   # 図の数
grep -cE '^\[\^[^]]+\]:' "$SRC"           # 脚注定義の数
grep -oE 'https?://[^ )）"]+' "$SRC" | sort -u | wc -l   # 外部リンクの実数
```

次に**目次アンカーの一覧**を取る。これがそのまま見出しの `id` とサイドバーの `href` になる。

```bash
# `## 目次` ブロックだけを切り出してからアンカーを取る。
# 文書全体に `grep` を掛けると本文中の内部リンクまで拾い、件数が合わなくなる。
awk '/^## 目次/{inToc=1; next} inToc && /^## /{inToc=0} inToc' "$SRC" \
  | grep -oE '\(#[^)]+\)' | sed 's/(#//;s/)//' | awk '!seen[$0]++'
```

**通過条件**: 重複を除いたアンカーの件数が `^##` と `^###` の見出しの合計（`## 目次` を除く）と
一致すること。一致しなければ原本 `.md` の目次が古い。**先に `.md` を直す**（`.md` が正）。

### Phase 1: スケルトンの生成

テンプレートをコピーし、プレースホルダを置換する。

```bash
cp .agents/skills/md-to-html/templates/skeleton.html.tmpl <ガイド名>.html
```

置換対象は 8 個。`Edit` で 1 つずつ確実に置き換える。

| プレースホルダ | 内容 | 既定 |
|---|---|---|
| `{{LANG}}` | 言語 | `ja` |
| `{{PAGE_TITLE}}` | 原本の `# タイトル` をそのまま | — |
| `{{SIDEBAR_KICKER}}` | 資格の短縮名 | 例 `Google Cloud PCA` |
| `{{SIDEBAR_TITLE}}` | 章の短縮名 | 例 `Section 4: プロセス分析と最適化` |
| `{{SIDEBAR_NAV}}` | 目次アンカーから生成した `<a>` 群（h3 は `class="lvl3"`） | — |
| `{{HERO_KICKER}}` | 資格名 `&middot;` 章 | — |
| `{{HERO_H1}}` | 原本の `# タイトル` をそのまま | — |
| `{{META_PILLS}}` | `.pill` × **4 枚固定**（配点 / 対象 / 図解 N点 / 参考文献 N件） | — |

`{{META_PILLS}}` の「図解 N 点」「参考文献 N 件」は Phase 0 の実数を入れる。
`<!-- ##CONTENT_INSERT## -->` は**この段階では消さない**。

> [!CAUTION]
> **置換対象は上の 8 個だけである。** `<head>` の CDN 行と末尾の `<script>` は
> テンプレートが原本から逐語コピーしたものであり、**1 文字も書き換えない**
> （URL・`integrity`・`crossorigin`・並び順を含む）。
> 特に **他のガイド HTML から `<script>` 行をコピーしてこない**。
> リポジトリ直下の既存 HTML の多く（`Gcp-pca-section1/2/3` を含む）は本スキル以前に
> 作られており **cdnjs 参照のまま残っている**。真似ると § 7「デザイン」の禁止事項に触れ、
> mermaid が読み込まれず図がソースのまま表示される。

**通過条件**:

```bash
bun .agents/skills/md-to-html/scripts/audit_design_parity.mjs <ガイド名>.html --template
echo "exit=$?"   # 0 であること（CSS 変数・CSS ルール・CDN・JS が原本と一致）
```

### Phase 2: 前半の本文挿入

`<!-- ##CONTENT_INSERT## -->` の**直前**に `Edit` で挿入する。

> [!IMPORTANT]
> **1 回の `Edit` で挿入する `##` セクションは最大 3 個まで。**
> 大きな書き込みは脱落を招く。原本の該当箇所を `Read` してから、
> `.agents/skills/md-to-html/references/conversion-rules.md` の対応表どおりに変換する。

### Phase 3: 後半の本文と参考文献

残りを同様に挿入する。最後に参考文献を `.ref-grid` として置き、
本文中の `[^n]` をすべて `.footnote-ref` へ変換したか確認する。

すべて挿入し終えたら `<!-- ##CONTENT_INSERT## -->` を削除する。

### Phase 4: 監査（ハードゲート）

```bash
NAME=<ガイド名>
bun .agents/skills/md-to-html/scripts/audit_content_parity.mjs "$NAME.md" "$NAME.html"
content_exit=$?; echo "content exit=$content_exit"
bun .agents/skills/md-to-html/scripts/audit_design_parity.mjs "$NAME.html"
design_exit=$?; echo "design  exit=$design_exit"
# どちらかが非 0 ならゲート不合格として全体も非 0 で終える
[ "$content_exit" -eq 0 ] && [ "$design_exit" -eq 0 ] || {
  echo 'ゲート不合格 — コミット禁止' >&2
  exit 1
}
```

> [!CAUTION]
> **両方 exit 0 になるまで次のフェーズへ進んではならない。**
> 監査を通すために監査スクリプト側を緩めることは禁止。直すのは常に HTML の側である。
> 原本に無い要素を追加して数を合わせることも禁止。

`⚠️` の警告は blocking ではないが、**1 件ずつ本文ごと落ちていないか目視し**、
正当と判断した理由をコミットメッセージ本文に書き残す。
警告カテゴリの意味は `.agents/skills/md-to-html/references/conversion-rules.md` §8 を参照。

### Phase 5: 最終確認とコミット

1. ブラウザで開き、**DevTools の Console を開いたまま**次の 4 点を確認する
   - Mermaid 図が全て描画される（ソースが露出したまま残っていない）。
     露出している場合は Console を読む。`mermaid not loaded` /
     `Failed to find a valid digest in the 'integrity' attribute` は CDN 行の問題、
     `Syntax error in text` は図のソースの問題（`.agents/skills/fix-mermaid/SKILL.md` へ）。
     切り分けずに図のソースを書き換えない
   - サイドバーのリンクが全て機能し、スクロールに応じて `.active` が移動する
   - チェックリストのカウンタが操作に応じて増減する
   - ウィンドウ幅 980px 未満でトグルからナビゲーションに到達できる
2. コミット前検査は `.agents/rules/no-absolute-paths.md` の手順に従う
   （**ステージ差分に絶対パスが無いこと**。同ルールの検証スクリプトをそのまま使う）

## 5. コミット戦略（4 分割）

一括コミットは規約違反。フェーズごとに分ける。scope は資格・章の略称。

```text
docs(<scope>): <ガイド名>.html — Phase 1/4: スケルトン
docs(<scope>): <ガイド名>.html — Phase 2/4: 本文 前半
docs(<scope>): <ガイド名>.html — Phase 3/4: 本文 後半と参考文献
docs(<scope>): <ガイド名>.html — Phase 4/4: 監査通過と仕上げ
```

メッセージ本文の書式:

```text
docs(pca): Gcp-pca-section5-managing-implementation.html — Phase 4/4: 監査通過と仕上げ

Progress: 7/7 sections complete
- 原本照合監査 exit 0 / デザイン照合監査 exit 0
- 正当と判断した差分: `## 目次` はサイドバーへ再型付け（理由: …）

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

## 6. 厳格な確認事項（最終チェックリスト）

コミット前に全項目を確認する。

- [ ] `audit_content_parity.mjs` が exit 0
- [ ] `audit_design_parity.mjs` が exit 0
- [ ] `⚠️` 警告を 1 件ずつ確認し、理由をコミットメッセージに記載した
- [ ] `{{...}}` と `##...##` がファイルに 1 つも残っていない
- [ ] 原本の `##` / `###` が全て `<h2 id>` / `<h3 id>` として存在する
- [ ] 見出しの `id` が原本の目次アンカーと**文字列一致**している（翻訳していない）
- [ ] サイドバーのリンク数 == 見出し数（過不足なし）
- [ ] 全ての `<table>` が `.table-scroll` に包まれている
- [ ] 全ての `<tr>` に `header` / `odd` / `even` のいずれかが付いている
- [ ] `pre.mermaid` の数が原本の fence 数と一致
- [ ] Mermaid の `classDef` が 4 役のみ、明色パレットが残っていない
- [ ] `.ref-card` の `id` が `ref1` から連番で、全ての `.footnote-ref` が解決する
- [ ] `.checklist-card` の静的カウントが実際の checkbox 数と一致
- [ ] `<h1>` がページに 1 個だけ（hero 内）
- [ ] `.pill` が 4 枚で、図解数・参考文献数が実数と一致
- [ ] Noto Sans JP の読み込み 3 行がある
- [ ] mermaid の `<script>` が雛形と**同一**（jsdelivr / バージョン完全固定 / `integrity` /
      `crossorigin` の組をそのまま保持。他ガイドからコピーしていない）
- [ ] ブラウザで図が描画され、スクロール連動・チェックリスト・モバイルナビが動く
- [ ] PII 検査（絶対パス混入チェック）が無出力

## 7. 禁止事項

### 内容

- 原本のセクション・段落・リスト項目・表行・リンク・脚注の省略、要約、言い換え
- Mermaid ラベルの語句を削り、本文にも残さないこと
- 原本に存在しない要素の追加（監査を通すための捏造を含む）
- 数値（出題比率・料金・問題数）の推測による書き換え
- 全角括弧の半角化などの本文の正規化（`.agents/skills/md-to-html/references/conversion-rules.md` §6）

### デザイン

- `.agents/skills/md-to-html/references/design-system.md` に無い class の発明
- CSS 変数の値の改変、コンポーネント CSS の削除
- 見出し `id` の英語化・kebab-case 化
- `<svg>` への幅・高さ指定（描画 JS の後処理と競合する）
- 存在しないコンポーネント（アイコンフォント / back-to-top / タブ / ライトモード切替等）の追加
- CDN の `@latest` / メジャー指定での参照、`integrity` 無しでの読み込み
- **`cdnjs.cloudflare.com` からの読み込み**。cdnjs は事前圧縮した brotli 変種の末尾改行 1 バイトが
  欠けており、identity 応答とバイト列が一致しない。SRI はデコード後のバイト列で検証されるため、
  どちらの変種から算出したハッシュでも他方でブロックされ、図が Mermaid ソースのまま表示される。
  SRI を付ける資産は encoding をまたいでバイト同一な jsdelivr から読み込む
  （`https://cdn.jsdelivr.net/npm/mermaid@<x.y.z>/dist/mermaid.min.js`）。
  ハッシュは `curl -sS --compressed <url> | openssl dgst -sha384 -binary | openssl base64 -A` で算出し、
  `audit_design_parity.mjs` が cdnjs 参照を blocking で弾く
- **CDN の URL と `integrity` を別々に触ること**。両者は 1 つの組であり、片方だけ
  書き換えた tag（ホストだけ cdnjs に替える / バージョンだけ上げる）は「integrity がある」
  「バージョンが固定されている」という個別の検査を通り抜ける。
  `audit_design_parity.mjs` は組そのものを参照元と照合して blocking で弾く
- **既存の兄弟 HTML から `<script>` / `<link>` の CDN 行をコピーすること。**
  デザインの正は `Gcp-pca-section4-process-optimization.html` と雛形だけであり、
  他のガイド HTML は正ではない
- 既存ファイル全体への `prettier --write`（§ 8 の誤検知表を参照）

### 手順

- 監査 exit 0 を確認せずに次フェーズへ進むこと
- 監査スクリプトを緩めて通すこと
- 1 回の `Edit` で 4 セクション以上を挿入すること
- 挿入マーカーを Phase 3 完了前に削除すること
- 記憶に頼って色・class 名を書くこと（必ず参照元を読む）

## 8. 既知の落とし穴

| 事象 | 内容 | 対応 |
|---|---|---|
| `grep -c` の誤用 | `grep -c 'type="checkbox"'` は**行数**を返す。描画 JS も同じ字面を含むため項目数が +2 される | 出現数は `grep -o … \| wc -l`、または `id="chkN"` を数える |
| `prettier` の版ずれ | `prettier` は `package.json` に固定されていない。`bunx prettier --write` を既存 HTML に掛けると `</pre\n>` → `</pre>` 等の無関係な差分が広範囲に混ざる | 既存ファイルの一括整形はしない。新規記述だけ周囲のインデントに合わせる |
| 閉じタグの改行 | 原本の `pre.mermaid` は `</pre\n                >` の形で閉じる。属性内改行と同じく描画には影響しない | 監査は両形式を受ける。手で書き換えない |
| 図が Mermaid ソースのまま表示される | 最頻出の原因は**構文エラーではなく資産のブロック**。SRI 不一致で `mermaid.min.js` が読み込まれず、`initMermaid()` が `console.warn('mermaid not loaded')` で即 return する。`pre.mermaid` の中身がそのまま見えるため「インデント汚染」「全角文字」を疑って時間を溶かしやすい | まず DevTools の Console と Network を見る。`Failed to find a valid digest ...` / `mermaid not loaded` が出ていれば CDN 行の問題であり、Mermaid ソースは無関係。§ 7 の CDN 規則へ戻る |
| `curl` で SRI を検算しても cdnjs は通ってしまう | `curl --compressed` は brotli 変種を取得できるとは限らず、identity/gzip の応答から算出したハッシュは `integrity` と一致する。**ブラウザだけが失敗する** | ハッシュの再計算を「cdnjs でも大丈夫」の根拠にしない。判定はホスト規則（jsdelivr）と参照元との組一致で行う |
| SonarQube `javascript:S3776` 等 | 監査スクリプトの認知的複雑度・正規表現 | 検査項目を列挙する性質上のもの。動作はテストで担保 |

## 9. 監査スクリプトの仕様

### `audit_content_parity.mjs`

```bash
bun .agents/skills/md-to-html/scripts/audit_content_parity.mjs <source.md> <page.html> [--json]
```

blocking: h1/h2 の消失（**見出し要素としての実在**を求める）/ 段落・リスト項目・表行の消失 /
外部リンクの消失 / 脚注定義の本文の消失 / 脚注参照 `[^n]` と `.footnote-ref` の不一致
（件数・`fnrefN` の連番・`<sup>` と参照先 `.ref-card` の番号）/
目次アンカー・見出し `id`・サイドバー `href` の不一致 /
Mermaid の図数不一致 / Mermaid ラベルの語句がページのどこにも無い / 承認外の図の配色。

warning: h3 以下の文言がページに見当たらない / 見出しレベルの変化 / 図のラベルの短縮。

設計上の判断（意図的な緩和）はスクリプト冒頭のコメントに理由付きで記載してある。
要点は「同種要素の多重集合 → ページ全文への包含 → 語句単位の包含」の 3 段フォールバックで、
再型付けを漏れと誤判定しないようにしていること。
ただし **h1 / h2 だけは全文包含のフォールバックを使わない** —
このデザインはサイドバーが全見出しの文言を複製するため、
全文包含で判定すると `<h2>` を削除しても必ず「残っている」と誤判定してしまう。

### `audit_design_parity.mjs`

```bash
bun .agents/skills/md-to-html/scripts/audit_design_parity.mjs <page.html> \
  [--reference Gcp-pca-section4-process-optimization.html] [--template] [--json]
```

`--template` はマーカーと本文構造の検査を省く（雛形自身の健全性検査用）。

blocking: CSS 変数の値のドリフト / コンポーネント CSS・メディアクエリの欠落 /
描画 JS の関数・配線の欠落 / CDN のバージョン未固定・`integrity` / `crossorigin` の欠落 /
cdnjs 参照 / **SRI を付ける資産（mermaid）の `src` と `integrity` の組が参照元と不一致** /
構造不変条件。

最後の組一致検査は、URL とハッシュを別々に書き換えた tag を捕まえるためにある。
個別の検査（固定されているか・`integrity` があるか）はすべて通るのに、ブラウザは
digest 不一致で資産をブロックし、図が Mermaid ソースのまま残る——という
静かな失敗が実際に発生した（`Gcp-pca-section6-operational-excellence.html`）。

### テスト

```bash
bun run test:md-to-html
```

> [!NOTE]
> 実体は `bun test` に 2 本のテストファイルのパスを明示指定したものである。
> ディレクトリ指定ではなく**ファイルパスを直接指定する**。
> `bun test` は `./` で始まらない引数を「ファイル名フィルタ」として解釈するため、
> パスは必ず `./.agents/skills/md-to-html/scripts/...` の形で渡す。

### 既知の実行結果（基準値）

| 実行 | 期待 |
|---|---|
| `audit_design_parity.mjs templates/skeleton.html.tmpl --template` | **exit 0** |
| `audit_design_parity.mjs Gcp-pca-section4-process-optimization.html` | **exit 0**（自己参照。golden pair） |
| `audit_content_parity.mjs` を PCA Section 4 のペアに実行 | **exit 0**。新規ページでも exit 0 にすること |
| 既存の他ガイド（Section 1/2/3/5 等）に実行 | **exit 1**。原本より前に作られページごとに CSS がドリフトしているため。是正は別タスク |

## 10. 関連ファイル

| ファイル | 役割 |
|---|---|
| `.agents/skills/md-to-html/templates/skeleton.html.tmpl` | CSS/JS を原本から逐語保持したページ雛形 |
| `.agents/skills/md-to-html/references/design-system.md` | コンポーネントの確定 markup とトークン一覧 |
| `.agents/skills/md-to-html/references/conversion-rules.md` | MD → HTML の変換規則の全表 |
| `.agents/skills/md-to-html/scripts/audit_content_parity.mjs` | 転写漏れ検出ゲート |
| `.agents/skills/md-to-html/scripts/audit_design_parity.mjs` | デザイン漏れ検出ゲート |
| `.agents/skills/fix-mermaid/SKILL.md` | Mermaid の構文エラー・配色・サイズの修正 |
| `.agents/skills/markdown-formatter/SKILL.md` | 原本 Markdown 側の書式修正 |
| `.agents/skills/html-to-nextjs-migration/SKILL.md` | 生成 HTML を `app/` 配下へ移行する場合 |
| `.agents/rules/tdd-commit-workflow.md` | TDD とコミット分割、3 系統同期（§8） |
| `.agents/rules/no-absolute-paths.md` | PII 検査（常時有効） |
