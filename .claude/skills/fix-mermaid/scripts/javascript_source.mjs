/**
 * Locates a real-code `const DIAGRAMS =` declaration in script blocks or the full source.
 * @param {string} source - The source text to search.
 * @returns {{index: number, valueStart: number}|null} The absolute declaration and value start indexes, or `null` if no declaration is found.
 */
export function findDiagramsDeclaration(source) {
    const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi;
    let hasScript = false;
    for (const script of source.matchAll(scriptPattern)) {
        hasScript = true;
        const declaration = findInCode(script[1]);
        if (declaration) {
            const contentStart = script.index + script[0].indexOf('>') + 1;
            return {
                index: contentStart + declaration.index,
                valueStart: contentStart + declaration.valueStart,
            };
        }
    }
    return hasScript ? null : findInCode(source);
}

/**
 * Finds a `const DIAGRAMS =` declaration in source code.
 * @param {string} source - The source text to search.
 * @returns {{index: number, valueStart: number} | null} The declaration's start index and value start position, or `null` if no declaration is found.
 */
function findInCode(source) {
    const code = maskCommentsAndStrings(source);
    const match = /\bconst\s+DIAGRAMS\s*=\s*/.exec(code);
    if (!match) return null;
    return {
        index: match.index,
        valueStart: match.index + match[0].length,
    };
}

/**
 * Masks comments, strings, template literals, and regular-expression literals while preserving source offsets and line breaks.
 * @param {string} source - The JavaScript source to mask.
 * @return {string} The source with non-code regions replaced by whitespace.
 */
export function maskCommentsAndStrings(source) {
    const chars = source.split('');
    let state = 'code';
    let escaped = false;
    let inRegexCharacterClass = false;
    const parenContexts = [];
    let closedControlCondition = false;
    // コメントの終了位置 → 開始位置。後方走査でコメントを丸ごと飛ばすために使う。
    const commentEnds = new Map();
    let commentStart = -1;

    /** 空白とコメントを飛ばして、直前の実コード文字の位置を返す。 */
    const skipTriviaBackward = (from) => {
        let cursor = from;
        while (cursor >= 0) {
            if (/\s/.test(source[cursor])) {
                cursor -= 1;
                continue;
            }
            const start = commentEnds.get(cursor);
            if (start === undefined) break;
            cursor = start - 1;
        }
        return cursor;
    };

    for (let index = 0; index < source.length; index += 1) {
        const char = source[index];
        const next = source[index + 1];

        if (state === 'line-comment') {
            if (char === '\n') {
                commentEnds.set(index - 1, commentStart);
                state = 'code';
            } else chars[index] = ' ';
            continue;
        }
        if (state === 'block-comment') {
            chars[index] = char === '\n' ? '\n' : ' ';
            if (char === '*' && next === '/') {
                chars[index + 1] = ' ';
                index += 1;
                commentEnds.set(index, commentStart);
                state = 'code';
            }
            continue;
        }
        if (state === 'regex') {
            chars[index] = char === '\n' ? '\n' : ' ';
            if (escaped) {
                escaped = false;
            } else if (char === '\\') {
                escaped = true;
            } else if (char === '[') {
                inRegexCharacterClass = true;
            } else if (char === ']') {
                inRegexCharacterClass = false;
            } else if (char === '/' && !inRegexCharacterClass) {
                while (/[a-z]/i.test(source[index + 1] ?? '')) {
                    chars[index + 1] = ' ';
                    index += 1;
                }
                state = 'code';
            }
            continue;
        }
        if (state !== 'code') {
            chars[index] = char === '\n' ? '\n' : ' ';
            if (escaped) escaped = false;
            else if (char === '\\') escaped = true;
            else if (
                (state === 'single-quote' && char === "'") ||
                (state === 'double-quote' && char === '"') ||
                (state === 'template' && char === '`')
            ) {
                state = 'code';
            }
            continue;
        }

        if (char === '/' && next === '/') {
            chars[index] = chars[index + 1] = ' ';
            commentStart = index;
            index += 1;
            state = 'line-comment';
        } else if (char === '/' && next === '*') {
            chars[index] = chars[index + 1] = ' ';
            commentStart = index;
            index += 1;
            state = 'block-comment';
        } else if (char === '/' && canStartRegexLiteral(source, index, closedControlCondition)) {
            chars[index] = ' ';
            state = 'regex';
            escaped = false;
            inRegexCharacterClass = false;
        } else if (char === "'") {
            chars[index] = ' ';
            state = 'single-quote';
        } else if (char === '"') {
            chars[index] = ' ';
            state = 'double-quote';
        } else if (char === '`') {
            chars[index] = ' ';
            state = 'template';
        } else if (char === '(') {
            let cursor = skipTriviaBackward(index - 1);
            const end = cursor + 1;
            while (/[\w$]/.test(source[cursor] ?? '')) cursor -= 1;
            const keyword = source.slice(cursor + 1, end);
            const isControlCondition = source[cursor] !== '.'
                && /^(?:catch|for|if|switch|while|with)$/.test(keyword);
            parenContexts.push(isControlCondition ? 'control' : 'other');
            closedControlCondition = false;
        } else if (char === ')') {
            closedControlCondition = parenContexts.pop() === 'control';
        } else if (!/\s/.test(char)) {
            closedControlCondition = false;
        }
    }

    return chars.join('');
}

/**
 * Determines whether a slash at the specified position can begin a regular expression literal.
 * @param {string} source - The source text containing the slash.
 * @param {number} slashIndex - The slash position in the source text.
 * @param {boolean} closedControlCondition - Whether the slash follows a closed control-condition expression.
 * @return {boolean} `true` if the slash can begin a regular expression literal, `false` otherwise.
 */
function canStartRegexLiteral(source, slashIndex, closedControlCondition) {
    if (closedControlCondition) return true;

    let cursor = slashIndex - 1;
    while (/\s/.test(source[cursor] ?? '')) cursor -= 1;
    if (cursor < 0) return true;

    if ('[({,:;=!?&|+*%^~<>-'.includes(source[cursor])) return true;

    if (/[\w$]/.test(source[cursor])) {
        const end = cursor + 1;
        while (/[\w$]/.test(source[cursor] ?? '')) cursor -= 1;
        const keyword = source.slice(cursor + 1, end);
        if (source[cursor] === '.') return false;
        return /^(?:await|case|delete|do|else|in|instanceof|new|of|return|throw|typeof|void|yield)$/.test(keyword);
    }

    return false;
}
