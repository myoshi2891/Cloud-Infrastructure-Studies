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

(最終更新日: 2026-08-13)

## 目的 (Objective)

LLM エージェント（Claude / Gemini / その他）がコードを実装する際、**要件漏れ・移行漏れ**と意図しない破壊的変更を防ぐため、**テスト駆動開発（TDD）**と**ステップバイステップの細かなコミット**を**絶対の義務（マスト）**として規定する。

このファイルは特定のエージェントに依存しない。`.agents/` / `.claude/` / `.gemini/` の3系統に**同一内容で**配置され、`__tests__/skills/agent-mirror-sync.test.ts` が同一性を機械的に検証する。

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

`jsdom` は devDependency として既に導入済み。一時スクリプトはリポジトリ外に作り、実行後に削除する。

```bash
inventory_script=$(mktemp -t inventory.XXXXXX.mjs) || exit 1
trap 'rm -f "$inventory_script"' EXIT
cat > "$inventory_script" <<'EOF'
import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const [, , htmlPath] = process.argv;
if (!htmlPath) {
    throw new Error('usage: node <script> <source.html>');
}
const doc = new JSDOM(fs.readFileSync(htmlPath, 'utf8')).window.document;
const texts = (sel) =>
    [...doc.querySelectorAll(sel)]
        .map((el) => (el.textContent ?? '').replace(/\s+/g, ' ').trim())
        .filter(Boolean);

console.log(
    JSON.stringify(
        {
            source: htmlPath,
            h1: texts('h1'),
            h2: texts('h2'),
            h3: texts('h3'),
            h4: texts('h4'),
            th: texts('th'),
            td: texts('td'),
            listItems: texts('li'),
            links: [...doc.querySelectorAll('a[href^="http"]')].map((a) => ({
                text: (a.textContent ?? '').replace(/\s+/g, ' ').trim(),
                href: a.getAttribute('href'),
            })),
            counts: {
                table: doc.querySelectorAll('table').length,
                diagram: doc.querySelectorAll('.mermaid, [id^="diag-"]').length,
                codeBlock: doc.querySelectorAll('pre, .code-block').length,
                figure: doc.querySelectorAll('img, svg').length,
            },
        },
        null,
        2,
    ),
);
EOF
mkdir -p docs/migration-inventory
node "$inventory_script" <移行元HTMLのパス> > docs/migration-inventory/<page-slug>.json
```

Markdown ソースの場合は `marked`（導入済み）で HTML 化してから同じスクリプトに通す。

### 1-2. インベントリの扱い

- 生成した `docs/migration-inventory/<page-slug>.json` は**コミット対象**とする。テストがこれを `import` して件数・文言を突き合わせる。
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
| 4 | 全外部リンク | `href` の**完全一致**集合を検証（テキストだけでなく URL も） |
| 5 | 図の件数 | `inventory.counts.diagram` と描画された図の件数が**厳密一致** (`toBe`) |
| 6 | 図の a11y | 各図に非空の `ariaLabel`、または `decorative={true}` |
| 7 | テーブル構造 | `<thead>` と `<th scope="col">` の存在 |
| 8 | コードブロック | `.code-block` 直下が `.code-line` でラップされていること。テキストに素の `\n` 依存がないこと |
| 9 | 件数ゲート | `h2` / `h3` / `table` / `codeBlock` の件数が厳密一致 |

### 2-2. 禁止アサーション（これらは「テストを書いた」と認めない）

| 禁止 | 理由 |
|---|---|
| `expect(container).toBeTruthy()` / `expect(true).toBe(true)` | 何も検証していない |
| `screen.getAllByText(new RegExp(title, 'i')).length > 0` **のみ** | 部分一致 + 存在チェック。**要約して移行してもパスする** |
| `toBeGreaterThan(0)` で件数を検証 | 件数漏れを検知できない。件数は必ず `toBe(n)` |
| 見出しだけを検証し本文・表を検証しない | 中身を空にしてもパスする |
| スナップショット (`toMatchSnapshot`) を主たる検証にする | 実装に追従して自動更新され、漏れを追認する |
| インベントリをハードコードした短い配列で代替する | 「書いた分だけ通る」ため網羅性が担保されない |

> `getAllByText(...).length > 0` 形式は、**サイドバー目次と本文の両方に同じ文言が出る**ページでの重複回避策として過去に使われてきた。
> 重複回避が必要な場合は、`length > 0` ではなく **`container.textContent` に対する部分文字列一致**（§3 テンプレート参照）へ置き換えること。

### 2-3. 自己検証ゲート（コミット前チェックリスト）

1つでも「いいえ」があればテストを強化してからコミットする。

- [ ] インベントリ JSON を `import` し、その**全要素**をループで検証しているか？
- [ ] 件数検証を `toBe` で行っているか（`toBeGreaterThan` を使っていないか）？
- [ ] 外部リンクを `href` の集合で検証しているか？
- [ ] 全 Mermaid / SVG に `ariaLabel` または `decorative` の検証があるか？
- [ ] 「意図的に本文を要約する」「表の行を1行削る」を試したらテストが**落ちる**か？（思考実験で必ず確認）
- [ ] `bun run test` を実行し、**実装前に失敗すること**を出力で確認したか？

---

## 3. 正準テストテンプレート（コピーして使う）

移行ページのテストは以下を出発点とする。`<...>` を置換するだけで §2 の基準を満たす。

```tsx
// __tests__/<領域>/<page-slug>/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/<page-slug>.json';
import Page from '@/app/<route>/page';

// MermaidDiagram は名前付きエクスポート。default でモックすると必ず落ちる。
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" data-chart={chart} aria-label={ariaLabel} />
    ),
}));

/** 空白差・改行差を無視して比較するための正規化 */
const squash = (value: string): string => value.replace(/\s+/g, '');

describe('<page-slug> — 移行元コンテンツの全量移行', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return { container, body: squash(container.textContent ?? '') };
    };

    it.each([
        ['h1', inventory.h1],
        ['h2', inventory.h2],
        ['h3', inventory.h3],
        ['h4', inventory.h4],
    ])('%s の全見出しが欠落なく存在する', (_level, headings) => {
        const { body } = renderPage();
        const missing = headings.filter((text) => !body.includes(squash(text)));
        expect(missing).toEqual([]);
    });

    it.each([
        ['表ヘッダー', inventory.th],
        ['表データセル', inventory.td],
        ['リスト項目', inventory.listItems],
    ])('%s が1件も欠落していない', (_label, items) => {
        const { body } = renderPage();
        const missing = items.filter((text) => !body.includes(squash(text)));
        expect(missing).toEqual([]);
    });

    it('外部リンクの URL 集合が移行元と一致する', () => {
        const { container } = renderPage();
        const rendered = new Set(
            [...container.querySelectorAll('a[href^="http"]')].map((a) => a.getAttribute('href')),
        );
        const missing = inventory.links.map((l) => l.href).filter((href) => !rendered.has(href));
        expect(missing).toEqual([]);
    });

    it('図の件数が移行元と厳密に一致し、全図に ariaLabel がある', () => {
        const { container } = renderPage();
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((el) => {
            expect(el.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('テーブルが件数どおり存在し、thead と th[scope=col] を持つ', () => {
        const { container } = renderPage();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('th[scope="col"]').length).toBeGreaterThan(0);
        });
    });

    it('コードブロックが .code-line でラップされている', () => {
        const { container } = renderPage();
        const blocks = [...container.querySelectorAll('.code-block')];
        expect(blocks.length).toBeGreaterThan(0);
        blocks.forEach((block) => {
            expect(block.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});
```

> **`missing` 配列を `toEqual([])` で検証する理由**: 失敗時に「どの文言が欠けているか」がそのまま出力され、
> エージェントが次に何を追加すべきかを自力で判断できる。`expect(body).toContain(x)` を forEach で回すと
> 最初の1件で停止し、残りの漏れが見えない。

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
  ```

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
for skill in fix-mermaid html-to-nextjs-migration md-to-nextjs-migration markdown-formatter spec-sync; do
  rsync -a --delete ".agents/skills/$skill/" ".claude/skills/$skill/" || exit 1
  rsync -a --delete ".agents/skills/$skill/" ".gemini/skills/$skill/" || exit 1
done
bun run test -- agent-mirror-sync
```

同一性は `__tests__/skills/agent-mirror-sync.test.ts` が検証する。ミラーが乖離した状態でのコミットは禁止。
