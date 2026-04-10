// prettier.config.cjs
/** @type {import('prettier').Config} */
module.exports = {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    useTabs: false,
    printWidth: 100,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.md', '*.mdx'],
            options: {
                tabWidth: 2,
                printWidth: 120,
                proseWrap: 'preserve',
            },
        },
    ],
};
