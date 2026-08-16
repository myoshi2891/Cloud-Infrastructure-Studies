import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MermaidDiagram, applySvgFixups } from '@/components/MermaidDiagram';

const mermaidStyles = readFileSync(
    join(process.cwd(), 'components/MermaidDiagram.module.css'),
    'utf8',
);

/** viewBox 付き SVG 要素を生成するヘルパー */
const makeSvg = (viewBox?: string): SVGSVGElement => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
    if (viewBox) svg.setAttribute('viewBox', viewBox);
    return svg;
};

describe('MermaidDiagram', () => {
    const sampleChart = 'flowchart LR\n  A[Start] --> B[End]';

    it('自然幅のSVGをflexで縮小せず、Mermaidの採寸値16pxと同じ文字サイズを使うこと', () => {
        expect(mermaidStyles).toMatch(/\.mermaidTarget\s+:global\(svg\)[^{]*\{[^}]*flex-shrink:\s*0;/s);
        expect(mermaidStyles).toMatch(/:global\(tspan\)[^{]*\{[^}]*font-size:\s*16px\s*!important;/s);
    });

    it('role="img" の wrapper を ariaLabel 付きで描画すること', () => {
        render(<MermaidDiagram chart={sampleChart} ariaLabel="サンプルフロー図" />);
        const wrapper = screen.getByRole('img', { name: /サンプルフロー図/ });
        expect(wrapper).toBeInTheDocument();
        expect(wrapper).toHaveAttribute('aria-roledescription', 'diagram');
    });

    it('jsdom 環境ではフォールバックの DSL <pre> を表示すること', () => {
        const { container } = render(
            <MermaidDiagram chart={sampleChart} ariaLabel="サンプルフロー図" />
        );
        // jsdom には getBBox が無いので mermaid.render() はスキップされ、フォールバックの pre が残る
        const fallback = container.querySelector('pre.codeblock');
        expect(fallback).not.toBeNull();
        expect(fallback?.textContent).toContain('flowchart LR');
    });

    it('追加 className が wrapper に適用されること', () => {
        const { container } = render(
            <MermaidDiagram
                chart={sampleChart}
                ariaLabel="サンプルフロー図"
                className="custom-extra"
            />
        );
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain('custom-extra');
    });

    it('レンダリング試行時に以前のエラーがクリアされること', async () => {
        const svgProto = window.SVGElement.prototype as any;
        const originalGetBBox = svgProto.getBBox;
        svgProto.getBBox = vi.fn();

        try {
            const mermaid = await import('mermaid');
            let shouldFail = true;
            vi.spyOn(mermaid.default, 'render').mockImplementation((async () => {
                if (shouldFail) {
                    throw new Error('Mock render error');
                }
                return {
                    svg: '<svg>Mocked SVG</svg>',
                    diagramType: 'flowchart',
                    bindFunctions: () => {},
                };
            }) as any);

            const { rerender } = render(
                <MermaidDiagram chart={sampleChart} ariaLabel="サンプルフロー図" />
            );

            const errorEl = await screen.findByTestId('mermaid-error');
            expect(errorEl.textContent).toContain('Mock render error');

            shouldFail = false;
            rerender(<MermaidDiagram chart="flowchart LR\n B-->C" ariaLabel="サンプルフロー図" />);

            await waitFor(() => {
                expect(screen.queryByTestId('mermaid-error')).toBeNull();
            });
        } finally {
            svgProto.getBBox = originalGetBBox;
            vi.restoreAllMocks();
        }
    });

    it('フォールバック表示時、各行の要素に安定したキーに基づいた data-key 属性が付与されること', () => {
        const duplicateLinesChart = 'flowchart LR\n  A --> B\n  A --> B';
        const { container } = render(
            <MermaidDiagram chart={duplicateLinesChart} ariaLabel="重複テスト" />
        );
        const codeLines = container.querySelectorAll('.code-line');
        expect(codeLines).toHaveLength(3);

        expect(codeLines[0]?.getAttribute('data-key')).toBe('flowchart LR::0');
        expect(codeLines[1]?.getAttribute('data-key')).toBe('  A --> B::0');
        expect(codeLines[2]?.getAttribute('data-key')).toBe('  A --> B::1');
    });

    describe('applySvgFixups', () => {
        it('指定がない小さな縦長図の表示領域を既定値で調整すること', () => {
            // Arrange: 細い縦長 flowchart 相当の viewBox
            const svg = makeSvg('0 0 250 600');

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B');

            // Assert: 共通の既定値では小さい図を拡大し、過度な縦長表示を抑える
            expect(svg.style.maxWidth).toBe('');
            expect(svg.style.width).toBe('480px');
            expect(svg.style.maxHeight).toBe('580px');
            // flowchart は viewBox 高さを +15 拡張する
            expect(svg.getAttribute('viewBox')).toBe('0 0 250 615');
        });

        it('個別指定された図は自然倍率(1.0倍)を維持し、文字が巨大化しないよう自然px幅を使用すること', () => {
            const svg = makeSvg('0 0 250 600');

            applySvgFixups(svg, 'flowchart TD\nA-->B', true);

            // preserveNaturalScale=true: viewBox 由来の自然幅 250px をそのまま維持し 1rem 実寸で表示
            expect(svg.style.width).toBe('250px');
            // max-width はインライン上書きせず共通 CSS の 100% 契約に委ねる
            expect(svg.style.maxWidth).toBe('');
            expect(svg.style.maxHeight).toBe('none');
        });

        it('個別指定された図でviewBox幅が十分大きい場合はそのままの幅を使用すること', () => {
            const svg = makeSvg('0 0 800 600');

            applySvgFixups(svg, 'flowchart TD\nA-->B', true);

            // viewBox 幅 800 > 600 のため、そのまま 800px
            expect(svg.style.width).toBe('800px');
            expect(svg.style.maxWidth).toBe('');
            expect(svg.style.maxHeight).toBe('none');
        });

        it('有効な viewBox で自然倍率を維持する場合は min-width に自然幅を設定すること', () => {
            // Arrange: 前回処理の残骸が上書きされることも同時に確認する
            const svg = makeSvg('0 0 250 600');
            svg.style.minWidth = '800px';

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B', true);

            // Assert: 早期 return 前のクリアで終わらず、自然幅 250px が再設定される
            expect(svg.style.minWidth).toBe('250px');
            expect(svg.style.width).toBe('250px');
        });

        it('自然倍率を維持しない場合は以前の min-width を解除すること', () => {
            const svg = makeSvg('0 0 800 600');
            svg.style.minWidth = '800px';

            applySvgFixups(svg, 'flowchart TD\nA-->B');

            expect(svg.style.minWidth).toBe('');
        });

        it('viewBox が無い場合も max-width のインライン上書きを行わないこと', () => {
            // Arrange
            const svg = makeSvg();

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B');

            // Assert
            expect(svg.style.maxWidth).toBe('');
        });

        it('viewBox が無い場合は自然倍率指定でも以前の min-width を解除すること', () => {
            // Arrange: 前回処理の min-width が残っている SVG を再処理する
            const svg = makeSvg();
            svg.style.minWidth = '800px';

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B', true);

            // Assert: 自然幅を確定できないため固定幅を残さない
            expect(svg.style.minWidth).toBe('');
        });

        it('viewBox が不正な場合も以前の min-width を解除すること', () => {
            // Arrange
            const svg = makeSvg('0 0 800');
            svg.style.minWidth = '800px';

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B', true);

            // Assert
            expect(svg.style.minWidth).toBe('');
        });
    });

    it('エラー表示時、各行の要素に安定したキーに基づいた data-key 属性が付与されること', async () => {
        const svgProto = window.SVGElement.prototype as any;
        const originalGetBBox = svgProto.getBBox;
        svgProto.getBBox = vi.fn();

        try {
            const mermaid = await import('mermaid');
            vi.spyOn(mermaid.default, 'render').mockRejectedValue(new Error('Syntax error'));

            const duplicateLinesChart = 'flowchart LR\n  A --> B\n  A --> B';
            const { container } = render(
                <MermaidDiagram chart={duplicateLinesChart} ariaLabel="エラー重複テスト" />
            );

            await screen.findByTestId('mermaid-error');
            const codeLines = container.querySelectorAll('.code-line');
            expect(codeLines.length).toBeGreaterThan(3);

            const keys = Array.from(codeLines).map(el => el.getAttribute('data-key'));
            expect(keys).toContain('  A --> B::0');
            expect(keys).toContain('  A --> B::1');
        } finally {
            svgProto.getBBox = originalGetBBox;
            vi.restoreAllMocks();
        }
    });
});
