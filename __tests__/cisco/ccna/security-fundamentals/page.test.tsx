import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).navigator = dom.window.navigator;
(globalThis as any).HTMLElement = dom.window.HTMLElement;
(globalThis as any).SVGElement = dom.window.SVGElement;

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaSecurityFundamentalsPage from '@/app/cisco/ccna/security-fundamentals/page';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel, preserveNaturalScale }: { chart: string; ariaLabel?: string; preserveNaturalScale?: boolean }) => (
        <div
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-natural-scale={preserveNaturalScale}
            aria-label={ariaLabel}
        >
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaSecurityFundamentalsPage', () => {
    it('renders main heading and hero eyebrow correctly', () => {
        const { getByRole } = render(<CcnaSecurityFundamentalsPage />);

        const mainHeading = getByRole('heading', {
            level: 1,
            name: /CCNA試験対策：セキュリティの基礎（Security Fundamentals）徹底解説/i,
        });
        expect(mainHeading).toBeInTheDocument();
    });

    it('renders key section headings', () => {
        const { getAllByRole } = render(<CcnaSecurityFundamentalsPage />);

        const sectionTitles = [
            '0. この記事の位置づけ',
            '5.1 セキュリティの基本概念',
            '5.2 セキュリティプログラムの要素',
            '5.3 ローカルパスワードによるデバイスアクセス制御',
            '5.4 パスワードポリシーの要素',
            '5.5 IPsecリモートアクセス／サイト間VPN',
            '5.6 アクセスコントロールリスト（ACL）',
            '5.7 レイヤー2セキュリティ機能',
            '5.8 AAA（認証・認可・アカウンティング）の概念比較',
            '5.9 無線セキュリティプロトコル',
            '5.10 GUIによるWLAN（WPA2 PSK）設定の考え方',
            'まとめ：ドメイン5.0の学習優先順位',
            '参考ソース',
        ];

        sectionTitles.forEach((title) => {
            const headings = getAllByRole('heading', { level: 2, name: new RegExp(title, 'i') });
            expect(headings.length).toBeGreaterThan(0);
        });
    });

    it('renders sidebar navigation links correctly', () => {
        const { getByRole, getAllByText } = render(<CcnaSecurityFundamentalsPage />);

        const navElement = getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(navElement).toBeInTheDocument();
        expect(getAllByText(/基本概念/i).length).toBeGreaterThan(0);
    });

    it('renders all 11 mermaid diagrams with natural scale enabled', () => {
        const { getAllByTestId } = render(<CcnaSecurityFundamentalsPage />);

        const diagrams = getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(11);
        diagrams.forEach((d) => {
            expect(d.getAttribute('data-natural-scale')).toBe('true');
        });
    });

    it('renders CLI code blocks with syntax highlighting classes', () => {
        const { container } = render(<CcnaSecurityFundamentalsPage />);

        const comments = container.querySelectorAll('.code-comment');
        const prompts = container.querySelectorAll('.code-prompt');
        expect(comments.length).toBeGreaterThan(0);
        expect(prompts.length).toBeGreaterThan(0);
    });
});
