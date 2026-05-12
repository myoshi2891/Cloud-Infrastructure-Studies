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

    it('renders all three subsections in order', () => {
        const subsections = screen.getAllByRole('heading', { level: 3 });
        expect(subsections).toHaveLength(3);
        expect(subsections[0]).toHaveTextContent(/5.1 ロギングとモニタリング（Cloud Observability）/);
        expect(subsections[1]).toHaveTextContent(/5.2 接続問題のトラブルシューティング/);
        expect(subsections[2]).toHaveTextContent(/5.3 Network Intelligence Centerによる監視と診断/);
    });

    it('renders the observability comparison table', () => {
        expect(screen.getByRole('columnheader', { name: 'サービス' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'VPC Flow Logs' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Cloud Router' })).toBeInTheDocument();
    });
});
