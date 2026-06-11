/**
 * apply_render_pipeline.mjs — 静的 HTML の Mermaid 描画パイプラインを冪等に適用する。
 *
 * 旧来の死蔵ワンオフ (fix_mermaid_config / fix_mermaid_css / fix_mermaid_size) を統合・汎用化。
 * 「DIAGRAMS をテンプレートリテラルで定義する」LLM 判断が必要な部分以外の機械的処理を 1 本に集約し、
 * 同種作業でボイラープレートを手書き再生成しなくて済むようにする。
 *
 * 使い方:
 *   bun run .claude/skills/fix-mermaid/scripts/apply_render_pipeline.mjs <file.html>
 *
 * 前提: HTML の <script> 内に `const DIAGRAMS = { 'diag-1': ` ... ` }` が定義済みであること
 *       (無い場合は空スタブを挿入して警告する)。各図の <div class="mermaid">...</div> は
 *       本スクリプトが連番 id 付きの空 div に変換する。
 */
import fs from 'fs';

// --- 注入する正準ボイラープレート -------------------------------------------

// SVG 後処理 + render ループ。
// ⚠️ width は viewBox 由来の「自然 px 幅」+ maxWidth:100% を使う。
//    width:'100%' / 'auto' は viewBox のみで intrinsic サイズを持たない SVG をコンテナ全幅へ
//    拡大し、小さい flowchart LR 図の異常拡大を招くため使用禁止。
const RENDER_LOOP = `            // --- mermaid render pipeline (apply_render_pipeline.mjs) ---
            function applySvgFixups(svgEl, src) {
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.style.height = 'auto';
                svgEl.style.maxWidth = '100%';
                svgEl.style.overflow = 'visible';
                svgEl.style.marginBottom = '10px';
                const viewBox = svgEl.getAttribute('viewBox');
                if (!viewBox) return;
                const parts = viewBox.split(/\\s+/).map(Number);
                if (parts.length !== 4 || !parts.every((n) => Number.isFinite(n))) return;
                const trimmed = src.trim();
                const isSequenceOrState =
                    trimmed.startsWith('sequenceDiagram') || trimmed.startsWith('stateDiagram');
                const extraHeight = isSequenceOrState ? 110 : 15;
                const [x, y, w, h] = parts;
                // 自然幅で表示し拡大は抑制。親より広い図のみ maxWidth で縮小される。
                svgEl.style.width = w + 'px';
                svgEl.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + (h + extraHeight));
            }

            (async () => {
                if (document.fonts && document.fonts.ready) {
                    try {
                        await document.fonts.ready;
                    } catch (_e) {
                        /* フォント待機に失敗しても描画は継続する */
                    }
                }
                for (const [id, src] of Object.entries(DIAGRAMS)) {
                    const el = document.getElementById(id);
                    if (!el) continue;
                    try {
                        const { svg } = await mermaid.render('svg-' + id, src);
                        el.innerHTML = svg;
                        const svgEl = el.querySelector('svg');
                        if (svgEl) applySvgFixups(svgEl, src);
                    } catch (err) {
                        el.innerHTML =
                            '<pre style="color:#ff8888;white-space:pre-wrap">' +
                            (err && err.message ? err.message : String(err)) +
                            '</pre>';
                    }
                }
            })();
`;

// 中央寄せ CSS。.mermaid-wrap / .diagram-wrap の両レイアウトに対応。
const CENTERING_CSS = `        /* mermaid-center (apply_render_pipeline.mjs): 図を中央寄せ */
        .mermaid-wrap,
        .diagram-wrap .mermaid {
            display: flex;
            justify-content: center;
        }
        .mermaid-wrap svg,
        .diagram-wrap .mermaid svg {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        }
`;

const RENDER_LOOP_MARKER = 'function applySvgFixups';
const CENTERING_MARKER = 'mermaid-center (apply_render_pipeline.mjs)';

// --- 各ステップ (純粋関数・冪等) --------------------------------------------

/**
 * 各 `<div class="mermaid">…</div>` を `<div class="mermaid" id="diag-N"></div>` に置換する。
 * 既に id 付き (`class="mermaid" id=...`) の div は正規表現にマッチしないため自然に冪等。
 */
export function injectIds(html) {
    let count = 0;
    const out = html.replace(
        /([ \t]*)<div class="mermaid">[\s\S]*?<\/div>/g,
        (_m, indent) => {
            count += 1;
            return `${indent}<div class="mermaid" id="diag-${count}"></div>`;
        },
    );
    return { html: out, count };
}

/**
 * `startOnLoad: true` を false にし、未指定なら `securityLevel: 'loose'` を付与する。
 */
export function ensureInitFlags(html) {
    let out = html;
    if (/startOnLoad:\s*true/.test(out)) {
        out = out.replace(/startOnLoad:\s*true\s*,?/, "startOnLoad: false,");
    }
    // initialize 呼び出し内に securityLevel が無ければ注入する。
    if (!/securityLevel\s*:/.test(out)) {
        if (/startOnLoad:\s*false\s*,/.test(out)) {
            // 従来どおり startOnLoad 行の直後に追加
            out = out.replace(
                /(startOnLoad:\s*false\s*,)/,
                "$1\n                securityLevel: 'loose',",
            );
        } else {
            // startOnLoad 不在/カンマ無し時は initialize の options ブロック先頭へ挿入
            out = out.replace(
                /(mermaid\.initialize\(\s*\{)/,
                "$1 securityLevel: 'loose',",
            );
        }
    }
    return out;
}

/**
 * applySvgFixups + render ループを mermaid.initialize 後の </script> 直前に注入する。
 * 既に注入済み (マーカー検出) なら不変。
 */
export function injectRenderLoop(html) {
    if (html.includes(RENDER_LOOP_MARKER)) return html;
    const initIdx = html.indexOf('mermaid.initialize(');
    if (initIdx === -1) {
        throw new Error('mermaid.initialize( が見つかりません。初期化ブロックを先に用意してください。');
    }
    const closeIdx = html.indexOf('</script>', initIdx);
    if (closeIdx === -1) {
        throw new Error('mermaid.initialize 以降に </script> が見つかりません。');
    }
    return html.slice(0, closeIdx) + '\n' + RENDER_LOOP + '        ' + html.slice(closeIdx);
}

/**
 * 中央寄せ CSS を最初の </style> 直前に注入する。既に注入済みなら不変。
 * </style> が無い場合は </head> 直前に <style> ごと挿入する。
 */
export function injectCenteringCss(html) {
    if (html.includes(CENTERING_MARKER)) return html;
    const styleCloseIdx = html.indexOf('</style>');
    if (styleCloseIdx !== -1) {
        return html.slice(0, styleCloseIdx) + CENTERING_CSS + html.slice(styleCloseIdx);
    }
    const headCloseIdx = html.indexOf('</head>');
    if (headCloseIdx !== -1) {
        const block = `    <style>\n${CENTERING_CSS}    </style>\n`;
        return html.slice(0, headCloseIdx) + block + html.slice(headCloseIdx);
    }
    throw new Error('</style> も </head> も見つからず中央寄せ CSS を注入できません。');
}

/**
 * 全ステップを冪等に適用する。
 * @returns {{ html: string, report: string[] }}
 */
export function applyPipeline(html) {
    const report = [];

    const ids = injectIds(html);
    let out = ids.html;
    report.push(
        ids.count > 0
            ? `div→id 置換: ${ids.count} 件`
            : 'div→id 置換: 対象なし (適用済みか div.mermaid 不在)',
    );

    if (!/const\s+DIAGRAMS\s*=/.test(out)) {
        // DIAGRAMS 未定義: 空スタブを初期化ブロック直前に挿入して警告
        const initIdx = out.indexOf('mermaid.initialize(');
        if (initIdx !== -1) {
            out = out.slice(0, initIdx) + 'const DIAGRAMS = {};\n            ' + out.slice(initIdx);
        }
        report.push('⚠️ DIAGRAMS 未定義: 空スタブを挿入。各図のソースを手動で定義してください。');
    }

    const beforeFlags = out;
    out = ensureInitFlags(out);
    report.push(out !== beforeFlags ? 'init フラグ: 更新' : 'init フラグ: 変更なし');

    const beforeLoop = out;
    out = injectRenderLoop(out);
    report.push(out !== beforeLoop ? 'render ループ: 注入' : 'render ループ: 適用済み');

    const beforeCss = out;
    out = injectCenteringCss(out);
    report.push(out !== beforeCss ? '中央寄せ CSS: 注入' : '中央寄せ CSS: 適用済み');

    return { html: out, report };
}

// --- CLI エントリポイント ----------------------------------------------------

if (import.meta.main) {
    const file = process.argv[2];
    if (!file) {
        console.error('Usage: bun run apply_render_pipeline.mjs <file.html>');
        process.exit(1);
    }
    if (!fs.existsSync(file)) {
        console.error(`❌ File not found: ${file}`);
        process.exit(1);
    }
    const input = fs.readFileSync(file, 'utf8');
    let result;
    try {
        result = applyPipeline(input);
    } catch (err) {
        console.error(`❌ ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
    }
    result.report.forEach((line) => console.log('  - ' + line));
    if (result.html !== input) {
        fs.writeFileSync(file, result.html, 'utf8');
        console.log(`\n✅ Applied: ${file}`);
    } else {
        console.log(`\n✅ No changes (already applied): ${file}`);
    }
}
