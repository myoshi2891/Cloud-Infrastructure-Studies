import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MermaidDiagram, applySvgFixups } from '@/components/MermaidDiagram';

/** viewBox 付き SVG 要素を生成するヘルパー */
const makeSvg = (viewBox?: string): SVGSVGElement => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
    if (viewBox) svg.setAttribute('viewBox', viewBox);
    return svg;
};

describe('MermaidDiagram', () => {
    const sampleChart = 'flowchart LR\n  A[Start] --> B[End]';

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
        it('viewBox の自然幅および縦高さを最適調整し、豆粒化と過大伸張を防ぐこと', () => {
            // Arrange: 細い縦長 flowchart 相当の viewBox
            const svg = makeSvg('0 0 250 600');

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B');

            // Assert: maxWidth が '100%' となり、width がスケーリングされ 480px、maxHeight が 580px となる
            expect(svg.style.maxWidth).toBe('100%');
            expect(svg.style.width).toBe('480px');
            expect(svg.style.maxHeight).toBe('580px');
            // flowchart は viewBox 高さを +15 拡張する
            expect(svg.getAttribute('viewBox')).toBe('0 0 250 615');
        });

        it('viewBox が無い場合は max-width:100% のフォールバックを維持すること', () => {
            // Arrange
            const svg = makeSvg();

            // Act
            applySvgFixups(svg, 'flowchart TD\nA-->B');

            // Assert
            expect(svg.style.maxWidth).toBe('100%');
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
