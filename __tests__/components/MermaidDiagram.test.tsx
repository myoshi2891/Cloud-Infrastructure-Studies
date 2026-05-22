import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MermaidDiagram } from '@/components/MermaidDiagram';

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
});
