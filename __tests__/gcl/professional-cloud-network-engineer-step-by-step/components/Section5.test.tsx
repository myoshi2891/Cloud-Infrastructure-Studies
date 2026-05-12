import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section5 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section5';

describe('PCNE Step-by-Step - Section 5', () => {
    beforeEach(() => {
        render(<Section5 />);
    });

    it('renders the section title correctly', () => {
        const title = screen.getByRole('heading', { level: 2, name: 'ネットワーク運用、監視、トラブルシューティング' });
        expect(title).toHaveTextContent('ネットワーク運用、監視、トラブルシューティング');
    });

    it('renders all three subsections', () => {
        expect(screen.getByText(/5.1 ロギングとモニタリング/)).toBeInTheDocument();
        expect(screen.getByText(/5.2 接続問題のトラブルシューティング/)).toBeInTheDocument();
        expect(screen.getByText(/5.3 Network Intelligence Centerによる監視と診断/)).toBeInTheDocument();
    });

    it('renders the observability comparison table', () => {
        expect(screen.getByRole('columnheader', { name: 'サービス' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'VPC Flow Logs' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Cloud Router' })).toBeInTheDocument();
    });
});
