'use client';

import { useEffect, useId, useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './MermaidDiagram.module.css';
import mermaid from 'mermaid';

export interface MermaidDiagramProps {
    /** Mermaid DSL（flowchart / stateDiagram-v2 等） */
    chart: string;
    /** スクリーンリーダー向けの説明ラベル（必須） */
    ariaLabel: string;
    /** ルートクラス名の追加（任意） */
    className?: string;
}

if (typeof window !== 'undefined') {
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
            nodeTextColor: '#e6e9ee',
            textColor: '#e6e9ee',
            titleColor: '#e6e9ee',
            actorTextColor: '#e6e9ee',
            actorLineColor: '#9aa7b2',
            signalTextColor: '#e6e9ee',
            labelTextColor: '#e6e9ee',
        },
    });
}

const canRenderInBrowser = (): boolean => {
    if (typeof window === 'undefined') return false;
    const SVGGraphicsElementCtor = (window as any).SVGGraphicsElement;
    const SVGElementCtor = (window as any).SVGElement;
    return Boolean(
        SVGGraphicsElementCtor?.prototype?.getBBox ||
        SVGElementCtor?.prototype?.getBBox
    );
};

/**
 * テキストを行ごとに分割し、各行に一意で安定したキー（行文字列 + 出現回数）を付与したオブジェクトの配列を生成します。
 *
 * @param text 分割対象のテキスト
 */
const toCodeLines = (text: string): { line: string; key: string }[] => {
    const seen = new Map<string, number>();
    return text.split('\n').map((line) => {
        const count = seen.get(line) ?? 0;
        seen.set(line, count + 1);
        return { line, key: `${line}::${count}` };
    });
};

/**
 * Mermaid 図を遅延ロード・クライアント描画するラッパー。
 *
 * - SSR / 初回マウント前は DSL を `<pre className="codeblock" aria-hidden>` として見せてハイドレーションエラーを防ぐ。
 * - jsdom 等 `getBBox` が無い環境ではフォールバック表示（DSL の `<pre>`）のまま描画しない。
 */
export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, ariaLabel, className }) => {
    const reactId = useId();
    const [isMounted, setIsMounted] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [svgStr, setSvgStr] = useState<string>('');

    // マウント状態のみを管理する Effect (ESLint の set-state-in-effect 回避)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !canRenderInBrowser()) return;

        let cancelled = false;
        const renderChart = async () => {
            setError(null);
            setRendered(false);
            try {
                const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
                const { svg } = await mermaid.render(id, chart);
                if (cancelled) return;
                setSvgStr(svg);
                setRendered(true);
            } catch (e) {
                if (cancelled) return;
                setError(e instanceof Error ? e.message : String(e));
            }
        };

        renderChart();

        return () => {
            cancelled = true;
        };
    }, [chart, reactId, isMounted]);

    // マウント前、またはブラウザ環境でない（jsdomテストなど）場合は、ハイドレーション不一致を防ぐためフォールバックを表示
    const showFallback = !isMounted || !canRenderInBrowser() || (!rendered && !error);

    return (
        <div
            className={cn(styles.mermaidWrapper, className)}
            role="img"
            aria-label={ariaLabel}
            aria-roledescription="diagram"
        >
            {isMounted && rendered && !error && (
                <div
                    className={styles.mermaidTarget}
                    dangerouslySetInnerHTML={{ __html: svgStr }}
                />
            )}
            {showFallback && (
                <pre className="codeblock" aria-hidden="true">
                    {toCodeLines(chart).map(({ line, key }) => (
                        <div className="code-line" key={key} data-key={key}>
                            {line}
                        </div>
                    ))}
                </pre>
            )}
            {isMounted && error && (
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
