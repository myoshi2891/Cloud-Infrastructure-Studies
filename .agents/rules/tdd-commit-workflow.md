---
paths:
  - "app/**/*.ts"
  - "app/**/*.tsx"
  - "components/**/*.ts"
  - "components/**/*.tsx"
  - "lib/**/*.ts"
  - "__tests__/**/*.test.ts"
  - "__tests__/**/*.test.tsx"
  - ".agents/skills/*"
  - ".claude/skills/*"
  - ".gemini/skills/*"
---

# TDD & Step-by-Step Commit Workflow Rules

(最終更新日: 2026-08-15)

## 目的 (Objective)

LLM エージェント（Claude / Gemini / その他）がコードを実装する際、**要件漏れ・移行漏れ**と意図しない破壊的変更を防ぐため、**テスト駆動開発（TDD）**と**ステップバイステップの細かなコミット**を**絶対の義務（マスト）**として規定する。

このファイルは特定のエージェントに依存しない。`.agents/` / `.claude/` / `.gemini/` の3系統に**同一内容で**配置され、`__tests__/skills/agent-mirror-sync.test.ts` が同一性を機械的に検証する。

---

## 0-A. エージェント非依存の実行契約（Claude Code / Gemini CLI 共通）

本ファイルおよび `.agents/skills/*` の手順は、**どのエージェントでも同じ結果になること**を要件とする。

| 項目 | 契約 |
|---|---|
| ルール・スキルの正本 | `.agents/` 配下。`.claude/` と `.gemini/` は読み取り用ミラー。**編集は必ず `.agents/` 側に行い、§8 の手順でミラーへ反映する** |
| 本文中のパス表記 | 常に `.agents/...` のリポジトリ相対パスで書く。`.claude/...` / `.gemini/...` を手順本文に書かない（エージェントごとに異なる指示になる） |
| スクリプトの実行パス | `.agents/skills/.../scripts/*.mjs` を実行する（ミラー配下のコピーを実行しない） |
| ランタイム | `bun` に統一する。`node` / `npm` / `npx` / `yarn` を手順に書かない |
| 絶対パス | ユーザー名を含む絶対パスを出力・記載しない（`.agents/rules/no-absolute-paths.md`） |
| 応答・計画書 | 日本語で記述する |

手順は**能力名**で書く。各エージェントは自分のツール名へ読み替えること。

| 能力名（本文の表記） | Claude Code | Gemini CLI |
|---|---|---|
| ファイル読取 | `Read`（`offset` / `limit` で範囲指定） | `read_file`（`offset` / `limit` で範囲指定） |
| 複数ファイルの一括読取 | `Read` を複数回 | `read_many_files` |
| 全文検索 / ファイル探索 | `Grep` / `Glob` | `search_file_content` / `glob` |
| 差分編集 | `Edit` | `replace` |
| 新規作成 | `Write` | `write_file` |
| コマンド実行 | `Bash` | `run_shell_command` |

**エージェント固有機能に依存する手順を書かない。** サブエージェント、拡張機能、対話 UI 前提の操作は手順の必須要素にしてはならない。
すべての手順は「シェルコマンド + ファイル編集」だけで完結する形で記述し、検証は `bun run test` / `bun run lint` / `bun run build` / `bun run test:e2e` の出力で行う。

### 0-A-1. スキルの読み込み方法（エージェント別の入口）

スキルの**内容**は3系統で同一だが、**読み込ませ方**だけがエージェントごとに異なる。手順本文にはこの差を書かず、ここに集約する。

| エージェント | 入口 |
|---|---|
| Claude Code | `.claude/skills/<name>/SKILL.md` を自動検出。明示的に使う場合は `/<name>` |
| Gemini CLI | `gemini skills install <name>.skill --scope workspace` → セッション内で `/skills reload`（詳細は `GEMINI.md` の「AI Skills」節） |
| いずれも不可の場合 | **スキル機構を使わず、ファイル読取（上の能力対応表の「ファイル読取」）で `.agents/skills/<name>/SKILL.md` の本文をそのまま読み込む。** スキル機構が無くても手順は完結する |

スキル本文は「読めば実行できる Markdown」として書く。ロード機構の有無を前提にした記述（「スキルが有効なら〜」等）を書かない。

### 0-A-2. 差分編集の移植性契約

エージェントによって差分編集ツールの能力が異なるため、**最小公倍数ではなく最大公約数**に合わせる。

- **正規表現による一括置換を手順の必須要素にしない。** Gemini CLI の `replace` はリテラル一致であり、正規表現・全件置換フラグを前提にできない。
- 置換対象は**周辺行を含めて一意になるアンカー**で指定する。「同じ文字列を全て置換」と書かず、「この前後関係の箇所を置換」と書く。
- 同一文字列が複数箇所にある変更は、**箇所ごとに独立した編集**として記述する。
- 大量の機械的置換が必要な場合は、編集ツールではなく**スクリプト（`bun` 実行）またはシェルコマンド**として手順に書く。こちらは全エージェントで同一に動く。

### 0-A-3. シェルコマンドの移植性契約

手順に書くコマンドは、macOS（BSD）と Linux（GNU）の双方、かつ任意のエージェントのシェル実行で同じ結果になること。

| 禁止 | 理由 | 代替 |
|---|---|---|
| `grep` の先読み・後読み（`(?=...)` / `(?!...)`） | POSIX ERE の範囲外。BSD grep ではエラー、GNU grep でも `-E` では動かない | 「A を含み B を含まない行」は `grep ... \| grep -v ...` の2段で書く。**ただし JSX のように属性が複数行へまたがる対象では 1 行単位の除外は誤検出する** — その場合は `grep -rn` で候補箇所を列挙し、**各候補を構文上の範囲（JSX なら開始タグの閉じ `>`）まで読んで確認する**手順として書く。`-A<n>` の固定行数は範囲を取りこぼすため判定の根拠にしない（§4 のボタン a11y 行が実例） |
| `rg`（ripgrep） | 環境に存在する保証がない | `grep -rn` |
| `node` / `npx` / `npm` / `yarn` | ランタイムを `bun` に統一しているため（§0） | `bun` / `bunx` |
| `sed -i` の GNU/BSD 依存記法 | BSD は `sed -i ''`、GNU は `sed -i` で非互換 | 編集ツールで直接編集するか、`.mjs` スクリプトを `bun` で実行 |

Vitest の実行形式は次の2つだけを使う（どちらも動作確認済み）。

```bash
bun run test                       # 全体
bun run test -- <名前の一部>        # 名前で絞り込み（例: bun run test -- agent-mirror-sync）
bunx vitest run __tests__/path/to/foo.test.tsx   # ファイルパス指定
```

---

## 0. 現行スタック確定値（推測禁止・ここを正とする）

移行・実装の前提となるバージョンと設定。**エージェントはこれを推測で補完してはならない。**
疑わしい場合のみ `package.json` / `tsconfig.json` / `vitest.config.ts` を照合する。

| 項目 | 確定値 | 影響 |
|---|---|---|
| Next.js | `16.2.11`（App Router） | Server Component 既定。`page.tsx` に `useState`/`useEffect` を書かない |
| React | `19.2.x` | `React.FC` 可、`memo` 必須箇所あり（後述） |
| TypeScript | `5.9.x` / `strict: true` | `any` 禁止。`unknown` + 型ガード |
| `noUncheckedIndexedAccess` | **`true`** | `Record<string,string>` の添字アクセスは `string \| undefined`。**直接インデックス参照は必ずガードする** |
| `noImplicitOverride` / `noFallthroughCasesInSwitch` | `true` | — |
| パスエイリアス | `@/*` → リポジトリルート | テストからも `@/app/...` で参照する |
| `resolveJsonModule` | `true` | インベントリ JSON をテストから `import` できる |
| テスト | Vitest `4.x` / `environment: jsdom` / `globals: true` | `vitest.setup.ts` で `@testing-library/jest-dom` が有効 |
| Vitest の `include` | `__tests__/**/*.test.{ts,tsx}` と `.{agents,claude,gemini}/skills/fix-mermaid/scripts/restore_diagrams.test.ts` | **上記以外の場所に置いたテストは実行されない** |
| E2E | Playwright、`baseURL: http://localhost:3000`、`chromium` / `perf` の2 project | `e2e/` 配下のみ |
| ビルド | `bun run build` = `next build --webpack` | dev は Turbopack、**ビルドは webpack**。挙動差に注意 |
| パッケージマネージャ | `bun@1.3.12` | `npm` / `yarn` を使わない |
| Mermaid | `mermaid@^11.16.0` | 共通コンポーネント `components/MermaidDiagram.tsx`（**名前付きエクスポート**） |

### 使用するコマンド（これ以外を発明しない）

```bash
bun run test         # Vitest 一括
bun run test:watch   # 単一ファイル: bunx vitest run __tests__/path/to/foo.test.tsx
bun run lint         # ESLint
bun run build        # 本番ビルド（webpack）
bun run test:e2e     # Playwright chromium
bun run dashboard    # docs/coverage-dashboard.html 再生成
bun run markdownlint -- <file>   # Markdown lint
```

---

## 核心原則 (Core Mandates)

<ai_agent_directive>
**AI エージェントへの厳格な指示**:

1. **Red（テスト失敗）フェーズを経ないコード実装は「未完了」とみなす。** 実装コード（プロダクションコード）を書く前に、必ず失敗するテストを作成・実行し、その状態をコミットすること。
2. **甘いテストの厳禁。** 「コンポーネントが描画されるか」「h1 タイトルがあるか」程度の浅いテストは規約違反である。テストは §2「テスト強度の合格基準」の**数値基準**を満たさなければならない。
3. **一括コミットの厳禁。** 「テスト + 実装 + ドキュメント」を一つのコミットにまとめることは重大な規約違反である。1つの論理的なフェーズが完了するごとに `git commit` を実行すること。
4. **コミットはユーザーの認可があるときのみ実行する。** 依頼にコミットの明示または許可がない場合は、コミット可能な状態まで作って停止し、ユーザーに判断を仰ぐこと。
5. **違反検知時は即時報告。** サイクルを飛ばしたことに気づいた場合、独断で `git reset` 等を実行せず、直ちにユーザーへ報告し、承認を得たうえでリカバリ手順を実施すること。
</ai_agent_directive>

---

## 1. Step 0: インベントリ作成（移行・大量コンテンツ実装では必須）

**「何を移行するか」を数えないまま書き始めることが、移行漏れの単一最大原因である。**
HTML / Markdown からのページ移行では、実装にもテスト作成にも先立ち、**移行元から機械的に**インベントリを抽出する。目視で数えない。

### 1-1. 抽出コマンド（HTML ソースの場合）

抽出ロジックは **`scripts/gen-inventory.mjs`（実行エントリ）** と **`scripts/inventory-extraction.mjs`（生成側・検証側の共有ロジック）** に実装済みである。
**一時スクリプトを heredoc で書き起こしてはならない。** 生成側と検証側でセレクタや正規化規則が分岐すると、
インベントリと検証結果が静かに乖離し、移行漏れを検出できなくなる。

```bash
mkdir -p docs/migration-inventory
bun scripts/gen-inventory.mjs <移行元HTMLのパス> > docs/migration-inventory/<page-slug>.json
```

出力される JSON の構造（§3 のテストテンプレートはこのキーをそのまま参照する）:

| キー | 内容 |
|---|---|
| `source` | 移行元のリポジトリ相対パス（リポジトリ外の入力はスクリプトが拒否する） |
| `h1` / `h2` / `h3` / `h4` | 見出しテキストを出現順に保持 |
| `th` / `td` / `listItems` | 表セル・リスト項目を出現順に保持 |
| `links` | `href^="http"` の `{ text, href }` を出現順に保持 |
| `bodyContent` | 段落・注釈・画像 alt・コード全文を `{ kind, text }` として出現順に保持 |
| `counts` | `table` / `diagram` / `codeBlock` / `figure` の件数 |
| `structures` | `tableColumnHeaders`（表ごとの `thead th[scope="col"]` 数）、`codeLines`（コードブロックごとの行数） |

抽出仕様を変更する必要が生じた場合は、**`scripts/inventory-extraction.mjs` だけを単一の変更点として修正する**。
§3 のテストは同モジュールを import しているため自動的に追従する。テスト側へ抽出ロジックを複製しない。

Markdown ソースの場合は `marked`（導入済み）で HTML 化してから同じスクリプトに通す。

### 1-2. インベントリの扱い

- 生成した `docs/migration-inventory/<page-slug>.json` は**コミット対象**とする。テストがこれを `import` して件数・文言を突き合わせる。
- `source` は常にリポジトリ相対パスとし、リポジトリ外の入力を拒否する。本文は段落、注釈・コールアウト、画像 alt、コードブロック内のコメントを含む全文を出現順で保持する。
- インベントリは**移行元の状態**を表す。実装に合わせてインベントリを書き換えることは**改竄であり禁止**。移行元に誤りがある場合のみ、理由をコミットメッセージに明記して修正する。
- コミット: `chore(migration): add content inventory for <page-slug>`

---

## 2. テスト強度の合格基準（Test Strength Gate）

Red フェーズのテストは、以下を**すべて**満たさなければコミットしてはならない。

### 2-1. 必須アサーション（移行・ガイドページ）

| # | 対象 | 必須の検証方法 |
|---|---|---|
| 1 | 全見出し (`h1`〜`h4`) | インベントリの**全要素**を、空白除去後の**完全部分文字列一致**で検証 |
| 2 | 全テーブルセル (`th` / `td`) | 同上。1セルも欠かさない |
| 3 | 全リスト項目 (`li`) | 同上 |
| 4 | 全外部リンク | `href` を**出現順の配列**として完全一致で検証（重複も順序も保持する。集合比較は重複・欠落を見逃す） |
| 5 | 図の件数 | `inventory.counts.diagram` と描画された図の件数が**厳密一致** (`toBe`) |
| 6 | 図の a11y | 各図に非空の `ariaLabel`、または `decorative={true}` |
| 7 | テーブル構造 | `<thead>` と `<th scope="col">` の存在 |
| 8 | コードブロック | `.code-block` 直下が `.code-line` でラップされていること。テキストに素の `\n` 依存がないこと |
| 9 | 件数ゲート | `h2` / `h3` / `table` / `codeBlock` の件数が厳密一致 |
| 10 | 図の必須 prop | 全図が `preserveNaturalScale === true` を持つこと（未指定の実装がテストを通過しないようにする） |
| 11 | 表の列見出し | 表ごとに `thead th[scope="col"]` の数が `inventory.structures.tableColumnHeaders[i]` と一致 |

### 2-2. 禁止アサーション（これらは「テストを書いた」と認めない）

| 禁止 | 理由 |
|---|---|
| `expect(container).toBeTruthy()` / `expect(true).toBe(true)` | 何も検証していない |
| `screen.getAllByText(new RegExp(title, 'i')).length > 0` **のみ** | 部分一致 + 存在チェック。**要約して移行してもパスする** |
| `toBeGreaterThan(0)` で件数を検証 | 件数漏れを検知できない。件数は必ず `toBe(n)` |
| 見出しだけを検証し本文・表を検証しない | 中身を空にしてもパスする |
| スナップショット (`toMatchSnapshot`) を主たる検証にする | 実装に追従して自動更新され、漏れを追認する |
| インベントリをハードコードした短い配列で代替する | 「書いた分だけ通る」ため網羅性が担保されない |
| 節番号などをドット未エスケープの正規表現で検証する（`/2.1/`） | `.` が任意の1文字にマッチし `2A1` / `231` でも通る。`/2\.1/` とエスケープするか、文字列一致を使う |
| 抽出ヘルパーやモックをテストファイル内へ再定義する | 生成側（`scripts/inventory-extraction.mjs`）と検証側が分岐し、片側だけの変更で検証が静かに無効化される |

> `getAllByText(...).length > 0` 形式は、**サイドバー目次と本文の両方に同じ文言が出る**ページでの重複回避策として過去に使われてきた。
> 重複回避が必要な場合は、`length > 0` ではなく **`container.textContent` に対する部分文字列一致**（§3 テンプレート参照）へ置き換えること。

### 2-3. 自己検証ゲート（コミット前チェックリスト）

1つでも「いいえ」があればテストを強化してからコミットする。

- [ ] インベントリ JSON を `import` し、その**全要素**をループで検証しているか？
- [ ] 件数検証を `toBe` で行っているか（`toBeGreaterThan` を使っていないか）？
- [ ] 外部リンクを `href` の出現順配列（重複保持）で検証しているか？
- [ ] 全 Mermaid / SVG に `ariaLabel` または `decorative` の検証があるか？
- [ ] 「意図的に本文を要約する」「表の行を1行削る」を試したらテストが**落ちる**か？（思考実験で必ず確認）
- [ ] `bun run test` を実行し、**実装前に失敗すること**を出力で確認したか？
- [ ] 抽出ヘルパーとモックを共有モジュールから import しているか（テストファイル内に再定義していないか）？
- [ ] 正規表現に未エスケープの `.` が無いか？

### 2-4. テストファイルの配置規約（レビュー指摘の再発防止）

**テストのパスは対象ページのルートをそのまま写す。** 独自の説明的ディレクトリ名を作らない。

| 対象ページ | 正 | 誤 |
|---|---|---|
| `app/gcl/agwa/section3/page.tsx` | `__tests__/gcl/agwa/section3/page.test.tsx` | `__tests__/gcl/agwa-section3-data-governance/page.test.tsx` |
| `app/aws/solutions-architect-associate/domain1/page.tsx` | `__tests__/aws/solutions-architect-associate/domain1/page.test.tsx` | `__tests__/aws/saa-domain1.test.tsx` |

`vitest.config.ts` の `include` は `__tests__/**/*.test.{ts,tsx}` である。**この配下以外に置いたテストは実行されない**（§0 参照）。
インベントリ JSON のファイル名は `docs/migration-inventory/<page-slug>.json` とし、ページの slug と対応させる。

---

## 3. 正準テストテンプレート（コピーして使う）

移行ページのテストは以下を出発点とする。`<...>` を置換するだけで §2 の基準を満たす。

**ヘルパーとモックは共有モジュールから import する。テストファイル内に再定義しない。**

| import 元 | 提供するもの |
|---|---|
| `@/scripts/inventory-extraction.mjs` | `codeBlockSelector` / `codeLines` / `codeText` / `codeLineCount` / `bodySelector` / `extractBodyContent` / `normalize`（**生成側 `scripts/gen-inventory.mjs` と同一実装**） |
| `@/__tests__/gcl/agwa/migration-test-utils` | `MermaidDiagramMock`（`ariaLabel` / `decorative` / `preserveNaturalScale` をテスト用属性へ透過）、`squash`。同モジュールは `codeBlockSelector` / `codeLineCount` / `extractBodyContent` を再エクスポートするため、テストからの import 元はここ1箇所でよい |

```tsx
// __tests__/<領域>/<page-slug>/page.test.tsx   ← パスは対象ページのルートを写す（§2-4）
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/<page-slug>.json';
import Page from '@/app/<route>/page';
import {
    MermaidDiagramMock,
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    squash,
} from '@/__tests__/gcl/agwa/migration-test-utils';

// MermaidDiagram は名前付きエクスポート。default でモックすると必ず落ちる。
vi.mock('@/components/MermaidDiagram', () => ({ MermaidDiagram: MermaidDiagramMock }));

describe('<page-slug> — 移行元コンテンツの全量移行', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it.each([
        ['h1', inventory.h1],
        ['h2', inventory.h2],
        ['h3', inventory.h3],
        ['h4', inventory.h4],
    ])('%s の件数・順序・テキストが移行元と一致する', (selector, headings) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(headings.map(squash));
    });

    it.each([
        ['th', inventory.th],
        ['td', inventory.td],
        ['li', inventory.listItems],
    ])('%s の件数・順序・テキストが移行元と一致する', (selector, items) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(items.map(squash));
    });

    it('外部リンクが件数・順序・URL まで移行元と一致する', () => {
        // 集合比較だけにすると重複や欠落を見逃すため、出現順の配列で比較する
        const container = renderPage();
        const rendered = [...container.querySelectorAll('a[href^="http"]')].map((anchor) =>
            anchor.getAttribute('href'),
        );
        expect(rendered).toEqual(inventory.links.map((link) => link.href));
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('全形式の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
        const container = renderPage();
        const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"]';
        const diagrams = [...container.querySelectorAll(diagramSelector)].filter(
            (element) => !element.querySelector(diagramSelector),
        );
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((element) => {
            const hasLabel = Boolean(element.getAttribute('aria-label')?.trim());
            const isDecorative = element.getAttribute('data-decorative') === 'true'
                || element.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
            // preserveNaturalScale 未指定の実装を通過させない（§2-1 #10）
            expect(element.getAttribute('data-preserve-natural-scale')).toBe('true');
        });
    });

    it('静的な画像と SVG が移行元の件数と一致する', () => {
        const container = renderPage();
        expect(container.querySelectorAll('img, svg')).toHaveLength(inventory.counts.figure);
    });

    it('テーブルが件数どおり存在し、thead と th[scope=col] を持つ', () => {
        const container = renderPage();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]').length).toBe(
                inventory.structures.tableColumnHeaders[index],
            );
        });
    });

    it('コードブロックが .code-line でラップされている', () => {
        const container = renderPage();
        const blocks = [...container.querySelectorAll(codeBlockSelector)].filter(
            (element) => !element.parentElement?.closest(codeBlockSelector),
        );
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, index) => {
            expect(block.querySelector(':scope > .code-line')).not.toBeNull();
            expect(codeLineCount(block)).toBe(inventory.structures.codeLines[index]);
        });
    });
});
```

> **配列同士を `toEqual` で比較する理由**: 失敗時に「どの文言が欠けているか / どこで順序が崩れたか」が差分として
> そのまま出力され、エージェントが次に何を直すべきかを自力で判断できる。`expect(body).toContain(x)` を
> `forEach` で回すと最初の1件で停止し、残りの漏れが見えない。件数だけの `toHaveLength` も同じ理由で不十分。
>
> **共有モジュールを別領域へ広げる場合**: `migration-test-utils` は現在 `__tests__/gcl/agwa/` にある。
> AGWA 以外の領域でも使う場合は `__tests__/helpers/migration-test-utils.tsx` へ**移動する単独のコミット**を切り、
> 全 import を追随させる。領域ごとにコピーを作ることは禁止（PR レビューで実際に指摘された重複パターン）。

---

## 4. 標準ワークフロー (Standard Workflow)

### Step 1: Red（テストの作成と失敗）

- 作業種別に応じてテストを作成する。
  - **HTML / Markdown 移行**: §1 のインベントリ → §3 のテンプレート。
  - **新機能**: 全要求仕様とエッジケース（正常系・異常系の両方）を網羅する失敗テスト。
  - **バグ修正**: 不具合を正確に再現する失敗テスト。
  - **機能改善**: 期待する新しい振る舞いを網羅する失敗テスト。
- **実行**: `bun run test` で**失敗**（またはコンパイルエラー）を確認する。成功してしまった場合、そのテストは仕様を検証していない。
- **§2-3 の自己検証ゲートを通す。**
- **コミット**: `test(<scope>): add failing tests for <機能名/ページ名>`
  — **テスト作成直後に必ずコミット。Step 2 への繰り越しは禁止。**

### Step 2: Green（実装と成功）

- テストをパスさせるプロダクションコードを `app/` / `components/` 等に実装する。
- **実行**: `bun run test` で Pass を確認する。
- **Green 直後の乖離チェック（必須）**: 移行元と実装の**行数・文字数**を比較し、大幅な乖離がないことを確認する。

  ```bash
  wc -m <移行元ファイル> app/<route>/<Xxx>Guide.tsx
  ```

  テストが通っていても文字数が移行元を大きく下回る場合は、インベントリに載らない要素（注釈、補足文、装飾テキスト）が落ちている可能性が高い。差分を特定してから次へ進む。
- **コミット**: `feat(<scope>): implement <機能名> to pass tests`

### Step 3: Refactor（リファクタ・最適化・統合）

- 重複削除、可読性向上、ビルド/リンターエラー修正、CSS トークンのマッピングを行う。
- **実行**: 以下を**すべて**通す。

  ```bash
  bun run lint
  bun run build
  bun run test
  bun run test:e2e
  ```

  `bun run test:e2e` は移行または UI 変更で必須とする。文書・ルール・非 UI データだけの変更で画面挙動に影響しない場合に限り省略でき、その理由を検証記録へ明記する。

- **定番レビュー指摘の自己点検（Refactor 前に必ず通す）**
  以下は直近の PR レビューで**繰り返し指摘された**項目である。Refactor コミット前に機械的に確認する。

  | 分類 | 要件 | 検出コマンド例 |
  |---|---|---|
  | CSS トークン | ページ固有 CSS でローカル `--*` を定義しない。必要な色は先に `app/globals.css` の `@theme` へ追加する | `grep -nE '^[[:space:]]*--[A-Za-z0-9_-]+:' app/<route>/*.css` が空（英小文字とハイフンだけに絞ると `--gcpBlue` / `--color_1` 等の定義を取りこぼす） |
  | 固定色 | ページ CSS に生の hex を残さない（シンタックスハイライト色のみ例外） | `grep -nE '#[0-9a-fA-F]{3,8}' app/<route>/*.css` を目検（**対象を `*.css` に限定する。** ディレクトリ全体を `-r` で走査すると `constants.ts` のアンカー `#611-...` を hex 色と誤検出する） |
  | 非推奨プロパティ | `word-break: break-word` を使わない → `overflow-wrap: anywhere` | `grep -rn 'word-break: break-word' app/` が空 |
  | サイドバー契約 | 幅 `280px` / `margin-left: 280px` / `width: calc(100% - 280px)` | `__tests__/guide-content-widths.test.ts` |
  | デッドコード | 未使用の CSS クラス・未使用の変数（`--sidebar-w` 等）を残さない | `grep` で定義と参照の突き合わせ |
  | ボタン a11y | `<button>` に `type="button"`、開閉トグルに `aria-expanded` | `grep -rn '<button' app/<route>/` で全ヒットを列挙し、**各 `<button` について開始タグの閉じ `>` までを読んで `type=` があること**を確認する。`-A4` のような固定行数の文脈表示は、属性が5行目以降に来るボタンを取りこぼすため判定の根拠にしない（§0-A-3） |
  | ナビ a11y | `<nav>` に `aria-label`、目次は `ul` / `li` 構造、リンク操作後にフォーカスと URL ハッシュを更新 | 目検 + E2E |
  | ナビの導出 | 監視対象のセクション ID は `NAV_ITEMS` から導出し、二重管理しない。初期 `activeId` は `NAV_ITEMS[0]` に一致させる | 目検 |
  | scroll 性能 | scroll ハンドラ内で毎回 `getBoundingClientRect()` を呼ばない。`IntersectionObserver` か `requestAnimationFrame` でまとめる | 目検 |
  | JSDoc | 公開 React コンポーネントと共有ユーティリティに JSDoc を付ける | 目検 |
  | ドキュメント日付 | `MIGRATION_PROGRESS.md` / 各 `SKILL.md` の「最終更新日」を実際の更新日に同期する | 目検 |
  | ランタイム統一 | 手順・ドキュメントの実行例を `bun` に統一する | 下記「ランタイム統一の検出コマンド」が空 |

  **ランタイム統一の検出コマンド**（表セル内では `|` を `\|` とエスケープする必要があり、
  それをそのままシェルへ貼ると ERE の選択肢として解釈されず検出漏れになる。必ずこの fenced block から貼る）:

  ```bash
  grep -rnE '(^|[[:space:]`])(node|npx|npm|yarn)([[:space:]]|$)' <変更したドキュメント>
  ```

  `npm run` だけを列挙すると `npm test` / `npm install` / `npm ci` を取りこぼすため、
  `npm` を単体のコマンドとして検出する。末尾は空白または行末のいずれもコマンド境界として扱う。

- **🚨 ゲート条件（P レベルタスクまたは複数コミットのフェーズ完了時）**:
  - `.agents/skills/spec-sync/SKILL.md` の Section F「フェーズ完了時の Definition of Done」を適用する。
  - 単発の Step 3 で `CLAUDE.md` だけを更新して終わらせることは禁止。
  - 同一フェーズ内で以下を確定させる:
    - `docs/coverage-dashboard.html` の再生成（`bun run dashboard`）
    - `docs/TEST_COVERAGE_PROGRESS.md` の全体サマリー・進捗・Section 7（再開プロンプト）の更新
    - `MIGRATION_PROGRESS.md` の進捗チェックボックス更新
    - `CLAUDE.md` / `GEMINI.md` / `README.md` への反映（**両方**。片方だけの更新は禁止）
    - `.agents/` / `.claude/` / `.gemini/` のスキル・ルール同期
  - 必須成果物の正準一覧と例外は `.agents/skills/md-to-nextjs-migration/SKILL.md` Step 7 を参照。
- **コミット対象**:
  - 新しい試験の登録は `app/constants.ts` の `EXAMS` が正準データソース。ナビは `app/navigation.ts` の `toNavTree(EXAMS)` から生成されるため、**`components/Header.tsx` を直接編集してはならない**。
  - コミット: `refactor(<scope>): integrate <機能名> into routing and update docs`

### Step 4: Docs Sync（進捗同期）

- **対象**: HTML → Next.js ページ移行タスクの場合のみ。
- 手順は `.agents/rules/migration-progress-sync.md` に従う。
- **コミットメッセージ**: `chore(docs): update MIGRATION_PROGRESS.md — <作業内容の1行要約>`

---

## 5. Definition of Done（完了宣言の条件）

以下がすべて満たされるまで「完了しました」と報告してはならない。

- [ ] `bun run test` が Pass（出力を提示すること）
- [ ] `bun run lint` がエラー 0
- [ ] `bun run build` が成功
- [ ] テストが §2 の強度基準を満たしている
- [ ] 移行タスクの場合、インベントリ件数とテストの件数アサーションが一致している
- [ ] コミットが Red / Green / Refactor / Docs に分割されている
- [ ] **ユーザーに目視確認やスクリーンショット提供を依頼していない**（自動検証で完結させる）
- [ ] 失敗したステップ・スキップしたステップがあれば、それを明示して報告している

**報告は事実ベースで行う。** テストが落ちているなら出力とともにそう述べる。未着手の範囲があるなら明示する。
「たぶん動く」「おそらく問題ない」といった推測での完了宣言は禁止。

---

## 6. 除外事項 (Exceptions)

- 既存ファイルの誤字修正、コードロジックに影響しないコメント修正のみの場合は例外とする。
- ドキュメント（`*.md`）のみの変更も例外とする。ただし `.agents/` / `.claude/` / `.gemini/` の3系統同期は必須。
- わずかでもロジックに変更が生じた場合は、必ず既存テストを更新するか新しいテストを追加する。

---

## 7. 違反時の対応 (Handling Rule Violations)

1. **即座に報告**: どの手順をスキップしたか、どのコミットが不適切だったかを直ちに報告する。
2. **勝手な修復の禁止**: ユーザーの承認を得る前に `git reset` や修正コミットを自律実行しない。
3. **リカバリ案の提示**: 正しい状態に戻す手順を提案し、承認を得てから実行する。

---

## 8. 各種スキル・仕様書での扱い (Integration with Skills & Specs)

本プロジェクトにおける全ての仕様書（`CLAUDE.md`, `GEMINI.md`, `.agents/AGENTS.md`）およびスキルファイル（`.agents/skills/*`, `.claude/skills/*`, `.gemini/skills/*`）に基づく作業は、**本ワークフローを常に最優先で適用**する。

「実装せよ」「移行せよ」という指示を受けた場合、エージェントは自動的にこの TDD とコミットのステップを計画（Plan）に組み込み、ユーザーの合意を経たうえで、各ステップ完了ごとにローカルコミットを実行しなければならない。

### スキル・ルールの3系統同期（必須）

`.agents/` を**正本**とし、`.claude/` と `.gemini/` はその複製である。
片方だけを更新するとエージェントごとに異なるルールで作業が行われ、移行漏れの原因になる。

```bash
# .agents/ を編集したあと、両ミラーへ反映する
rsync -a --delete .agents/rules/ .claude/rules/
rsync -a --delete .agents/rules/ .gemini/rules/
for skill in fix-mermaid html-to-nextjs-migration md-to-html md-to-nextjs-migration markdown-formatter spec-sync; do
  rsync -a --delete ".agents/skills/$skill/" ".claude/skills/$skill/" || exit 1
  rsync -a --delete ".agents/skills/$skill/" ".gemini/skills/$skill/" || exit 1
done
bun run test -- agent-mirror-sync
```

同一性は `__tests__/skills/agent-mirror-sync.test.ts` が検証する。ミラーが乖離した状態でのコミットは禁止。
