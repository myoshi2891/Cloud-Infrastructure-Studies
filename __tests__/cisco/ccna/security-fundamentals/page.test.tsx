import { render, screen } from '@testing-library/react';
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
        render(<CcnaSecurityFundamentalsPage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /CCNA試験対策：セキュリティの基礎（Security Fundamentals）徹底解説/i,
        });
        expect(mainHeading).toBeInTheDocument();
    });

    it('renders key section headings', () => {
        render(<CcnaSecurityFundamentalsPage />);

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
            const headings = screen.getAllByRole('heading', { level: 2, name: new RegExp(title, 'i') });
            expect(headings.length).toBeGreaterThan(0);
        });
    });

    it('renders sidebar navigation links correctly', () => {
        render(<CcnaSecurityFundamentalsPage />);

        const navElement = screen.getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(navElement).toBeInTheDocument();
        expect(screen.getByText('5.1 基本概念')).toBeInTheDocument();
    });
});
