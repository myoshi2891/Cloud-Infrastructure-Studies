// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/recommended-books/site-reliability-engineering/page';
import { NAV_ITEMS } from '@/app/recommended-books/site-reliability-engineering/constants';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('site-reliability-engineering — 目次リンク先のフォーカス可能性', () => {
    it('NAV_ITEMS の全リンク先が存在し、tabIndex="-1" でプログラム的にフォーカスできる', () => {
        const { container } = render(<Page />);

        const unfocusable = NAV_ITEMS.filter((item) => {
            const target = container.querySelector(`#${CSS.escape(item.id)}`);
            return !target || target.getAttribute('tabindex') !== '-1';
        }).map((item) => item.id);

        expect(unfocusable).toEqual([]);
    });
});
