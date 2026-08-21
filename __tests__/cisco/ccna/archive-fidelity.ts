import { expect } from 'vitest';
import {
    collectClassNames,
    migratedCodeLineCounts,
    snapshotInlineCode,
    snapshotMigratedCodeBlocks,
    snapshotPlacement,
    snapshotSupplemental,
    snapshotTables,
    snapshotTokens,
} from '@/scripts/archive-fidelity-extraction.mjs';

/**
 * 移行忠実性の検証ヘルパー。
 *
 * 期待値は移行元 HTML ではなく、コミット済みの fixture
 * （`docs/migration-inventory/<slug>.fidelity.json`、`scripts/gen-fidelity-fixture.mjs` が生成）から受け取る。
 * 移行元は `/archive/` 配下のローカル専用資産でリポジトリには存在しないため、
 * テスト実行時に移行元を読みに行かない。抽出ロジックは生成側と同じ
 * `scripts/archive-fidelity-extraction.mjs` を共有する。
 */

/**
 * 表のセル・結合属性が移行元と一致することを検証する。
 * @param expected - fixture の `tables`。
 * @param migrated - 描画結果のルート。
 */
export const expectTableFidelity = (expected: unknown, migrated: ParentNode): void => {
    expect(snapshotTables(migrated)).toEqual(expected);
};

/**
 * コールアウト等の補足要素が、所属セクションと本文まで一致することを検証する。
 * @param expected - fixture の `supplemental`。
 * @param migrated - 描画結果のルート。
 * @param selector - 補足要素のセレクタ（fixture 生成時と同一のもの）。
 */
export const expectSupplementalFidelity = (
    expected: unknown,
    migrated: ParentNode,
    selector: string,
): void => {
    expect(snapshotSupplemental(migrated, selector)).toEqual(expected);
};

/**
 * コードブロックが 1 行も欠けずに `.code-line` として移行されていることを検証する。
 * @param expected - fixture の `codeBlocks`。
 * @param migrated - 描画結果のルート。
 */
export const expectCodeFidelity = (expected: unknown, migrated: ParentNode): void => {
    migratedCodeLineCounts(migrated).forEach((count: number) => {
        expect(count, '.code-block must contain at least one direct .code-line').toBeGreaterThan(0);
    });
    expect(snapshotMigratedCodeBlocks(migrated)).toEqual(expected);
};

/**
 * シンタックスハイライトのトークン列が移行元と一致することを検証する。
 * @param expected - fixture の `syntaxTokens`（キーは移行先のクラス名）。
 * @param migrated - 描画結果のルート。
 */
export const expectSyntaxHighlightFidelity = (
    expected: Readonly<Record<string, string[]>>,
    migrated: ParentNode,
): void => {
    const selectorByKey = Object.fromEntries(
        Object.keys(expected).map((migratedClass) => [migratedClass, `.${migratedClass}`]),
    );
    const actual: Record<string, string[]> = snapshotTokens(migrated, selectorByKey);
    for (const migratedClass of Object.keys(expected)) {
        expect(actual[migratedClass], `.${migratedClass}`).toEqual(expected[migratedClass]);
    }
};

/**
 * 表・コード・図・補足の並び順が移行元と一致することを検証する。
 * @param expected - fixture の `placements`。
 * @param migrated - 描画結果のルート。
 * @param selector - 配置検査のセレクタ（fixture 生成時と同一のもの）。
 */
export const expectElementPlacementFidelity = (
    expected: unknown,
    migrated: ParentNode,
    selector: string,
): void => {
    expect(snapshotPlacement(migrated, selector)).toEqual(expected);
};

/**
 * インラインコードが移行元と一致することを検証する。
 * @param expected - fixture の `inlineCode`。
 * @param migrated - 描画結果のルート。
 */
export const expectInlineCodeFidelity = (expected: unknown, migrated: ParentNode): void => {
    expect(snapshotInlineCode(migrated)).toEqual(expected);
};

/**
 * 移行元でスタイルを持っていたクラスが、移行先の markup と page.css の双方に存在することを検証する。
 * @param expectedClasses - fixture の `styledClasses`。
 * @param migrated - 描画結果のルート。
 * @param migratedCss - 移行先ページの CSS 全文。
 * @param classMap - 移行時に改名したクラスの対応表。
 */
export const expectContentCssCoverage = (
    expectedClasses: readonly string[],
    migrated: ParentNode,
    migratedCss: string,
    classMap: Readonly<Record<string, string>> = {},
): void => {
    const migratedClasses: Set<string> = collectClassNames(migrated);

    for (const className of expectedClasses) {
        const migratedClass = classMap[className] ?? className;
        expect(migratedClasses, `migrated markup is missing .${migratedClass}`).toContain(migratedClass);
        expect(migratedCss, `page.css is missing a definition for .${migratedClass}`).toContain(`.${migratedClass}`);
    }
};

/**
 * 全文照合。移行元の各要素テキストが、描画結果のどこかに欠けずに含まれることを検証する。
 * @param expectedTexts - fixture の `texts`。
 * @param migrated - 描画結果のルート。
 */
export const expectTextFidelity = (expectedTexts: readonly string[], migrated: ParentNode): void => {
    const rendered = (migrated.textContent ?? '').replace(/\s+/g, '');
    const missing = expectedTexts.filter((text) => !rendered.includes(text.replace(/\s+/g, '')));

    if (missing.length > 0) {
        console.error(`\n❌ [AUTOMATED CHECK FAILED] Found ${missing.length} missing elements from source:\n`);
        missing.forEach((text, index) => console.error(`  ${index + 1}. "${text}"`));
    }
    expect(missing).toEqual([]);
};
