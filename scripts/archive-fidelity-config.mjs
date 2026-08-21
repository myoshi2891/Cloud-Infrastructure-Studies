/**
 * 移行忠実性 fixture の生成設定。
 *
 * アーカイブ（`/archive/` は .gitignore 済みのローカル専用資産）が削除されても検証を続けられるよう、
 * 移行元 HTML から抽出したスナップショットを `docs/migration-inventory/<slug>.fidelity.json` に
 * コミットしておく。ここはその抽出対象を宣言する唯一の場所であり、生成側とテスト側が共有する。
 *
 * `sourceCommit` は移行元 HTML を含む最後のコミット（削除コミットの親）。fixture を作り直すときは
 * `git show <sourceCommit>:<source> > <source>` で一時復元してから生成し、生成後に復元物を削除する。
 */

/**
 * @typedef {object} FidelityPageConfig
 * @property {string} source - 移行元 HTML のリポジトリ相対パス。
 * @property {string} sourceCommit - 移行元 HTML を取り出せる git リビジョン。
 * @property {string} [textSelector] - 全文照合に使う移行元セレクタ。
 * @property {boolean} [tables] - セル単位の表スナップショットを出力するか。
 * @property {string} [headerBodyTableSelector] - thead/tbody を分けた表スナップショットのセレクタ。
 * @property {string} [supplementalSelector] - 補足要素のセレクタ（移行元・移行先で共通）。
 * @property {boolean} [codeBlocks] - コードブロックの行スナップショットを出力するか。
 * @property {Readonly<Record<string, string>>} [syntaxSelectors] - 移行先クラス名 → 移行元セレクタ。
 * @property {boolean} [styledClasses] - スタイル定義を持つクラス名を出力するか。
 * @property {string} [placementSelector] - 配置順検査のセレクタ（移行元・移行先で共通）。
 * @property {boolean} [inlineCode] - インラインコードを出力するか。
 * @property {boolean} [refUrls] - 参考文献リンクを出力するか。
 * @property {string} [jsonCodeSelector] - JSON コードブロックのセレクタ。
 * @property {string} [introductionSelector] - 導入文のセレクタ。
 * @property {boolean} [mermaidCharts] - Mermaid 定義を出力するか。
 */

/** @type {Readonly<Record<string, FidelityPageConfig>>} */
export const FIDELITY_PAGES = {
    'comptia-network-plus-guide': {
        source: 'archive/CompTIA/html/Comptia-network-plus-guide.html',
        sourceCommit: '7833298^',
        introductionSelector: '.doc-header .subtitle',
        mermaidCharts: true,
    },
    'ccna-automation-programmability': {
        source: 'archive/Cisco/html/ccna/Ccna-automation-programmability.html',
        sourceCommit: '7d5d3ad^',
        textSelector:
            'main h1, main h2, main h3, main p, main li, main th, main td, main a, main span.num, main figcaption',
        tables: true,
        supplementalSelector: '.callout, figcaption',
        codeBlocks: true,
        styledClasses: true,
        placementSelector: '.table-wrap > table, figure, .callout, .code-block, pre',
        jsonCodeSelector: 'pre code.language-json',
    },
    'ccna-automation-network-fundamentals': {
        source: 'archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html',
        sourceCommit: '7d5d3ad^',
        textSelector:
            'main h1, main h2, main h3, main p, main li, main th, main td, main a.ref-url, main span.ref-name',
        tables: true,
        supplementalSelector: '.callout, .meta-card, .diagram-caption',
        styledClasses: true,
        placementSelector: '.table-wrapper > table, .diagram-block, .callout',
        inlineCode: true,
        refUrls: true,
    },
    'ccna-network-access-guide': {
        source: 'archive/Cisco/html/ccna/Ccna-network-access-guide.html',
        sourceCommit: '7d5d3ad^',
        textSelector: 'main h1, main h2, main h3, main p, main li, main th, main td, main a',
        tables: true,
        supplementalSelector: '.callout, .diagram-caption',
        // 図のラッパーは移行元が .diagram-wrap、移行先が .mermaid-wrap。両方を選び、
        // それぞれの側では片方だけが一致するため、配置列は同じ長さ・同じ kind になる。
        placementSelector: 'table, .callout, .diagram-wrap, .mermaid-wrap',
    },
    'ccna-automation-infrastructure-and-automation': {
        source: 'archive/Cisco/html/ccna/Ccna-automation-infrastructure-and-automation.html',
        sourceCommit: '7d5d3ad^',
        tables: true,
        supplementalSelector: '.callout, .chip, .weight-tag, .diagram-label, .code-label',
        codeBlocks: true,
        syntaxSelectors: {
            'hl-kw': '.hljs-keyword, .hljs-literal',
            'hl-str': '.hljs-string',
            'hl-num': '.hljs-number',
            'hl-fn': '.hljs-built_in, .hljs-name',
            'hl-cm': '.hljs-comment',
            'hl-add': '.hljs-addition',
            'hl-del': '.hljs-deletion',
        },
        styledClasses: true,
        placementSelector: '.table-wrapper > table, .diagram-wrapper, .callout, .code-block, pre',
    },
    'cisco-devnet-associate-guide': {
        source: 'archive/Cisco/html/devnet/Cisco-devnet-associate-guide.html',
        sourceCommit: '7d5d3ad^',
        headerBodyTableSelector: 'main table',
    },
};
