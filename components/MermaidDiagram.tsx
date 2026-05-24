'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './MermaidDiagram.module.css';

export interface MermaidDiagramProps {
    /** Mermaid DSL（flowchart / stateDiagram-v2 等） */
    chart: string;
    /** スクリーンリーダー向けの説明ラベル（必須） */
    ariaLabel: string;
    /** ルートクラス名の追加（任意） */
    className?: string;
}

let initialized = false;

const canRenderInBrowser = (): boolean => {
    if (typeof window === 'undefined') return false;
    const SVGElementCtor = (window as unknown as { SVGElement?: { prototype?: { getBBox?: unknown } } }).SVGElement;
    return Boolean(SVGElementCtor?.prototype?.getBBox);
};

/**
 * mermaid が返す SVG 文字列を DOMParser で構造化し、ホスト要素の子として差し替える。
 * innerHTML を使わないので XSS リスクを回避できる（mermaid 自身は信頼できるが、
 * securityLevel='strict' との二重防御として DOM API のみで挿入する）。
 */
const replaceWithParsedSvg = (host: HTMLElement, svgString: string): void => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.documentElement;
    while (host.firstChild) host.removeChild(host.firstChild);
    host.appendChild(host.ownerDocument.importNode(svgEl, true));
};

/**
 * Mermaid 図を遅延ロード・クライアント描画するラッパー。
 *
 * - `mermaid` 本体は `useEffect` 内で動的 import するため、初期バンドルから分離される。
 * - jsdom 等 `getBBox` が無い環境ではフォールバック表示（DSL の `<pre>`）のまま描画しない。
 * - SSR / 初回マウント前は DSL を `<pre className="codeblock" aria-hidden>` として見せる。
 */
export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, ariaLabel, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reactId = useId();
    const [rendered, setRendered] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toCodeLines = (text: string) => {
        const seen = new Map<string, number>();
        return text.split('\n').map((line) => {
            const count = seen.get(line) ?? 0;
            seen.set(line, count + 1);
            return { line, key: `${line}::${count}` };
        });
    };

    useEffect(() => {
        if (!canRenderInBrowser()) return;
        let cancelled = false;
        (async () => {
            setError(null);
            setRendered(false);
            try {
                const mermaid = (await import('mermaid')).default;
                if (!initialized) {
                    mermaid.initialize({
                        startOnLoad: false,
                        theme: 'base',
                        securityLevel: 'strict',
                        fontFamily: 'inherit',
                        themeVariables: {
                            primaryColor: 'rgba(64,224,208,0.12)',
                            primaryBorderColor: '#40E0D0',
                            primaryTextColor: '#e6e9ee',
                            lineColor: '#9aa7b2',
                            secondaryColor: 'rgba(124,164,255,0.12)',
                            tertiaryColor: 'rgba(255,255,255,0.04)',
                            background: 'transparent',
                        },
                    });
                    initialized = true;
                }
                const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
                const { svg } = await mermaid.render(id, chart);
                if (cancelled || !containerRef.current) return;
                replaceWithParsedSvg(containerRef.current, svg);
                setRendered(true);
            } catch (e) {
                if (cancelled) return;
                setError(e instanceof Error ? e.message : String(e));
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [chart, reactId]);

    return (
        <div
            className={cn(styles.mermaidWrapper, className)}
            role="img"
            aria-label={ariaLabel}
            aria-roledescription="diagram"
        >
            <div ref={containerRef} className={styles.mermaidTarget} aria-hidden={rendered ? undefined : 'true'} />
            {!rendered && !error && (
                <pre className="codeblock" aria-hidden="true">
                    {toCodeLines(chart).map(({ line, key }) => (
                        <div className="code-line" key={key} data-key={key}>
                            {line}
                        </div>
                    ))}
                </pre>
            )}
            {error && (
                <pre className="codeblock" data-testid="mermaid-error">
                    {toCodeLines(`Mermaid render error: ${error}\n\n${chart}`).map(({ line, key }) => (
                        <div className="code-line" key={key} data-key={key}>
                            {line}
                        </div>
                    ))}
                </pre>
            )}
        </div>
    );
};
