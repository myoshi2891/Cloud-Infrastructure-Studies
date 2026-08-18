# Markdown → HTML 変換規則

最終更新: 2026-08-14

内容の正は `<資格名>.md`、デザインの正は `Certified-Associate-in-Project-Management.html`。
本書は両者の実測から導いた**変換規則の全表**である。

> [!CAUTION]
> 変換は機械的な Markdown レンダリングでは**ない**。5 つの構造は意味に応じて別要素へ
> 再型付けし、10 種類ほどのページ要素は新規に執筆する。
> ただし **原本の文言を削る・要約する・言い換えることは一切許されない**。
> 「短くした方が図が綺麗」は理由にならない。図に入り切らない語句は本文側へ移す。

## 1. 骨格の対応

| 原本 Markdown | 生成 HTML |
|---|---|
| `# タイトル` | `<title>` と hero の `<h1>`（短縮形にしてよいが、原本の語句は hero-lede か本文に残す） |
| タイトル直後の副題行 | `.brand-subtitle` と `.hero-lede`（**原本の文はそのまま `.hero-lede` に入れる**） |
| 冒頭の `> 免責` blockquote | `.disclaimer-box`。URL は `<a target="_blank" rel="noopener">` にする |
| `## 目次` とそのリンク一覧 | `<ul class="sidebar-nav">`。セクションにはしない |
| `---`（水平線） | 破棄。境界は `<!-- ===== N. Name ===== -->` コメントで表す |
| 末尾の italic 行 | `<footer>` |

## 2. 見出しの対応

| 原本 | 生成 HTML |
|---|---|
| `## N. タイトル` | `<section id="kebab-slug">` + `.section-eyebrow`「SECTION 0N」+ `<h2>タイトル</h2>` |
| `### N.M タイトル` | `<h3>タイトル</h3>` |
| `#### タイトル` | `<h4>タイトル</h4>` |

- 採番（`N.` / `N.M`）は見出しから外し、`.section-eyebrow` の `SECTION NN` で表現する
- `## N. ドメインX: 主題（YY%）` の形は、`.domain-tag dX`（`ドメインX &middot; YY%`）と
  `<h2>主題</h2>` に**分割**する。語句は失われないので監査を通る

### 見出しから別要素へ再型付けしてよいケース（原本 CAPM の実績）

| 原本 | 生成先 |
|---|---|
| `### ステップN: …` の連続 | `<ol class="step-list">` の `.step-title` |
| `### …のベストプラクティス` + リスト | `.callout practice` |
| `### タスク構成` | 直後の表に吸収（見出しを持たない `.table-wrap`） |
| 参考文献セクション内の `###` | `.ref-group` の `<h4>` |

`audit_content_parity.mjs` は h3 以下の再型付けを **blocking にしない**（警告として列挙する）。
ただし **h1 / h2 の消失は blocking**。セクション見出しの言い換えは許されない。

## 3. 意味的に再型付けする 5 構造

| 原本の書き方 | 生成先 | 判定条件 |
|---|---|---|
| `### ステップN:` が 3 つ以上連続 | `.step-list` | 手順として順序があるとき |
| `**ベストプラクティス**` または `### …のベストプラクティス` + 箇条書き | `.callout practice` | 常に |
| `**ソース**: [リンク]` / `**ソース**:` + リンクのリスト | `.callout source` | 常に |
| `> 補足: …` の blockquote | `.callout note` | 常に |
| 比率テーブル（分類 × %） | `.domain-grid` | 分類が 4 個のとき |
| 用語テーブル（用語 × 定義） | `.glossary-grid` | 行数が 10 以上のとき |

判断がつかない場合の既定:

| 状況 | 既定 |
|---|---|
| callout の種別が決められない | `.callout note` |
| 表を再型付けすべきか迷う | **再型付けせず `.table-wrap` の表のままにする** |
| アイコンが決められない | `ti-file-text` |
| 図のキャプションが思いつかない | 「<図が示す関係の名詞句>」（例: 「要求の引き出しから管理までの循環プロセス」） |

## 4. 本文要素の対応

| 原本 | 生成 HTML |
|---|---|
| 段落 | `<p>…</p>` |
| `- 項目` | `<ul><li>…</li></ul>` |
| `1. 項目` | `<ol><li>…</li></ol>` |
| GFM 表 | `<div class="table-wrap"><table><thead>…</thead><tbody>…</tbody></table></div>` |
| `**強調**` | `<strong>強調</strong>` |
| `*書名*` | `<em>書名</em>` |
| `[文字列](URL)` | `<a href="URL" target="_blank" rel="noopener">文字列</a>` |
| `名称: https://URL`（参考文献） | `<li><span class="ref-name">名称</span><a class="ref-url" href="URL" target="_blank" rel="noopener">URL</a></li>` |
| 表セル内の計算式 | `<code>SV = EV − PV</code>`（原本にバッククォートが無くても付ける） |

`- **要点。** 続きの文` は `<li><strong>要点。</strong>続きの文</li>` にする（`</strong>` の直後に空白を入れない）。

## 5. Mermaid の変換

fence 1 つにつき **3 箇所**を編集する。

1. 本文の該当位置に図カードを置く

    ```html
    <div class="diagram-card">
      <div class="diagram-container" id="camelCaseId"><div class="diagram-loading">図を読み込み中...</div></div>
      <div class="diagram-caption">日本語キャプション</div>
    </div>
    ```

2. `DIAGRAMS` にテンプレートリテラルで追加する（キー = コンテナの `id`）

    ```js
    camelCaseId: `flowchart TB
    A["ラベル"] --> B["ラベル"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B box;`,
    ```

3. キャプションは原本の見出しまたは図ラベルを**変更せず再利用**する。どちらも無い場合は新規に執筆せず、ユーザーに確認する

### ソースの書き換え規則

| 原本の書き方 | 生成 HTML |
|---|---|
| 行頭のインデント | すべて除去（フラットに並べる） |
| `classDef … fill:#111827,stroke:#7c9eff,color:#e5e7eb` | `fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px` |
| `<br/>` を含むラベル | `<br/>` を除去し半角空白で連結 |
| ラベル内の `（）` `：` `／` | 除去または空白化（Mermaid パーサ対策） |
| `A -.説明.-> B` | `A -.->\|"説明"\| B` |
| `pie` のラベル末尾の `36%` | 削除（`showData` が値を描画するため） |

> [!WARNING]
> **ラベルの語句を消してはならない。** 図に入り切らない補足（英語名・詳細説明）は、
> 削除するのではなく**本文の段落・表・用語集へ移す**。
> `audit_content_parity.mjs` はラベルの語句がページのどこにも無いことを検出して exit 1 にする。
>
> 原本 CAPM.html にはこの規則に反した実例（`Elicitation` / `Hot Spot / Hot Area` /
> `プログラムとプロジェクトの集合` などがページから消失）が残っている。**真似しないこと。**

ノードラベルは常にダブルクォートで囲む。丸括弧・コロン・スラッシュを含めない。

## 6. 全角 → 半角の正規化

本文全体に一貫して適用する。

| 原本 | 生成 HTML |
|---|---|
| `（` `）` | `(` `)` |
| `／` | ` / ` |
| `＝` | `=` |
| `＋` | ` + ` |
| `：` | `:` + 半角空白 |

据え置く文字: `、` `・` `〜` `「」` `®` `−`（全角マイナス）。
使用してよい実体参照は `&middot;` のみ（`.domain-tag` の中黒）。
`&` は素のまま書いてよい（原本の `Maintain & Renew` が実例）。

この正規化は `matchKey` の NFKC 正規化が吸収するため、監査で漏れ扱いされることはない。

## 7. 命名規約

| 対象 | 規約 | 例 |
|---|---|---|
| セクション `id` | 英語 kebab-case | `what-is-capm` / `exam-format` / `study-plan` |
| 図の `id` / `DIAGRAMS` のキー | 英語 camelCase | `roadmap5` / `domainPie` / `baProcess` |
| `.section-eyebrow` | `SECTION` + ゼロ埋め連番 | `SECTION 01` |
| 出力ファイル名 | 資格の正式名称をハイフン区切り、リポジトリ直下 | `Certified-Associate-in-Project-Management.html` |

セクション id とアイコンは日本語見出しから機械的に導けないため、**Phase 0 で対応表を作って先に確定する**。

## 8. 監査で警告として出るが許容される差分

`audit_content_parity.mjs` は以下を **blocking にせず警告**として列挙する。
警告が出た項目は「本文ごと落ちていないか」を必ず目視し、正当と判断した理由を
コミットメッセージ本文に書き残す。

| 警告カテゴリ | 典型例 |
|---|---|
| 文言がページに見当たらない小見出し | `### 6.3 ドメイン1のベストプラクティス` が `.callout practice` になった |
| 見出しレベルが変わった項目 | `## 目次` がサイドバーになった / `### ステップ1:` が `.step-title` になった |
| 図のラベルが短縮・書き換えされた項目 | `["A<br/>B"]` が `["A"]` になった（語句 B が本文に残っていれば blocking ではない） |

blocking になるのは次だけである。ここに出たものは**必ず転写して解消する**。

- h1 / h2 の消失
- 段落・リスト項目・表行の消失
- 外部リンクの消失
- Mermaid の図数不一致
- Mermaid ラベルの語句がページのどこにも無い
- `DIAGRAMS` にデザインシステム外の配色が残っている

## 9. 関連

- `references/design-system.md` — コンポーネントの確定 markup
- `templates/skeleton.html.tmpl` — ページ雛形
- `.claude/skills/markdown-formatter/SKILL.md` — 原本 Markdown 側の書式修正
