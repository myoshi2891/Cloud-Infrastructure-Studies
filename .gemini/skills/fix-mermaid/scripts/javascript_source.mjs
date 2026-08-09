/**
 * コメントと文字列を除外し、実コード上の `const DIAGRAMS =` 宣言を探す。
 * 返す valueStart は `=` 後の空白を飛ばした値の開始位置。
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
 * コメント、文字列、テンプレートリテラル、正規表現リテラルを
 * 元のオフセットを維持した空白へ置換する。
 */
export function maskCommentsAndStrings(source) {
    const chars = source.split('');
    let state = 'code';
    let escaped = false;
    let inRegexCharacterClass = false;
    const parenContexts = [];
    let closedControlCondition = false;

    for (let index = 0; index < source.length; index += 1) {
        const char = source[index];
        const next = source[index + 1];

        if (state === 'line-comment') {
            if (char === '\n') state = 'code';
            else chars[index] = ' ';
            continue;
        }
        if (state === 'block-comment') {
            chars[index] = char === '\n' ? '\n' : ' ';
            if (char === '*' && next === '/') {
                chars[index + 1] = ' ';
                index += 1;
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
            index += 1;
            state = 'line-comment';
        } else if (char === '/' && next === '*') {
            chars[index] = chars[index + 1] = ' ';
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
            let cursor = index - 1;
            while (/\s/.test(source[cursor] ?? '')) cursor -= 1;
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
