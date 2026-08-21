// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import {
    elementText,
    migratedCodeLineCounts,
    normalizeCodeLines,
    snapshotHeaderBodyTables,
    snapshotPlacement,
    snapshotStyledClasses,
    snapshotSupplemental,
    snapshotTables,
    snapshotTexts,
    snapshotTokens,
} from '@/scripts/archive-fidelity-extraction.mjs';

/**
 * 与えた HTML を持つ container を作る。
 * @param html - 挿入する markup。
 * @returns 生成した container 要素。
 */
const mount = (html: string): HTMLElement => {
    const container = document.createElement('div');
    container.innerHTML = html;
    return container;
};

describe('archive-fidelity-extraction', () => {
    it('表をセル単位・結合属性つきでスナップショットする', () => {
        const container = mount(
            '<table><tr><th colspan="2">見出し</th></tr><tr><td>a</td><td rowspan="2">b</td></tr></table>',
        );

        expect(snapshotTables(container)).toEqual([
            [
                [{ tag: 'th', text: '見出し', colspan: '2', rowspan: null }],
                [
                    { tag: 'td', text: 'a', colspan: null, rowspan: null },
                    { tag: 'td', text: 'b', colspan: null, rowspan: '2' },
                ],
            ],
        ]);
    });

    it('入れ子の表の行を外側の表の行として二重に数えず、内側の表を独立して取り出す', () => {
        const container = mount('<table><tr><td><table><tr><td>内側</td></tr></table></td></tr></table>');
        const [outer, nested] = snapshotTables(container);

        // 外側の表は自分の行だけを持ち、内側の行を取り込まない
        expect(outer).toEqual([[{ tag: 'td', text: '内側', colspan: null, rowspan: null }]]);
        // 内側の表は独立したスナップショットとして現れる
        expect(nested).toEqual([[{ tag: 'td', text: '内側', colspan: null, rowspan: null }]]);
    });

    it('補足要素を所属セクションつきで取り出し、セクション外は hero とする', () => {
        const container = mount(
            '<div class="callout">冒頭</div><section id="sec1"><div class="callout">本文</div></section>',
        );

        expect(snapshotSupplemental(container, '.callout')).toEqual([
            { section: 'hero', tag: 'div', text: '冒頭' },
            { section: 'sec1', tag: 'div', text: '本文' },
        ]);
    });

    it('子要素の境界で単語を結合せずテキストを組み立てる', () => {
        expect(elementText(mount('<p><span>Cisco</span><span>DevNet</span></p>').firstElementChild!)).toBe(
            'Cisco DevNet',
        );
    });

    it('コード行の末尾空白と前後の空行だけを落とす', () => {
        expect(normalizeCodeLines(['', 'a  ', '', 'b', '  '])).toEqual(['a', '', 'b']);
    });

    it('コードブロック直下の .code-line だけを数える', () => {
        const container = mount(
            '<div class="code-block"><div class="code-line">1</div>'
            + '<div class="nested"><div class="code-line">深い行</div></div></div>',
        );

        expect(migratedCodeLineCounts(container)).toEqual([1]);
    });

    it('要素の種別と並び順を配置スナップショットに写す', () => {
        const container = mount(
            '<section id="s1"><div class="table-wrapper"><table></table></div>'
            + '<div class="code-block"></div><div class="diagram-wrapper"></div><div class="callout"></div></section>',
        );

        expect(
            snapshotPlacement(container, '.table-wrapper > table, .code-block, .diagram-wrapper, .callout'),
        ).toEqual([
            { section: 's1', kind: 'table' },
            { section: 's1', kind: 'code' },
            { section: 's1', kind: 'diagram' },
            { section: 's1', kind: 'supplemental' },
        ]);
    });

    it('空白しか持たない要素を全文照合の対象から外す', () => {
        expect(snapshotTexts(mount('<p>  </p><p>本文</p>'), 'p')).toEqual(['本文']);
    });

    it('スタイル定義を持つクラスだけを重複なく集める', () => {
        const doc = new DOMParser().parseFromString(
            '<html><head><style>.callout{color:red}</style></head>'
            + '<body><main><div class="callout plain"></div><div class="callout"></div></main></body></html>',
            'text/html',
        );

        expect(snapshotStyledClasses(doc)).toEqual(['callout']);
    });

    it('キーごとのセレクタでハイライトトークンを集める', () => {
        const container = mount('<code><span class="hl-kw">def</span><span class="hl-str">"x"</span></code>');

        expect(snapshotTokens(container, { 'hl-kw': '.hl-kw', 'hl-str': '.hl-str' })).toEqual({
            'hl-kw': ['def'],
            'hl-str': ['"x"'],
        });
    });

    it('thead と tbody を分けて表をスナップショットする', () => {
        const container = mount(
            '<main><table><thead><tr><th>列</th></tr></thead><tbody><tr><td>値</td></tr></tbody></table></main>',
        );

        expect(snapshotHeaderBodyTables(container, 'main table')).toEqual([
            { headers: ['列'], rows: [['値']] },
        ]);
    });
});
