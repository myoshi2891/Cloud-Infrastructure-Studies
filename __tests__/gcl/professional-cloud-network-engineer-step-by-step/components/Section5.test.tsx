import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section5 } from '../../../../app/gcl/professional-cloud-network-engineer-step-by-step/components/Section5';

describe('PCNE Step-by-Step - Section 5', () => {
    it('renders the section title correctly', () => {
        render(<Section5 />);
        const title = screen.getByRole('heading', { level: 2 });
        expect(title.textContent).toContain('ネットワーク運用、監視、トラブルシューティング');
    });

    it('renders all three subsections', () => {
        render(<Section5 />);
        
        expect(screen.getByText(/5.1 ロギングとモニタリング/)).toBeInTheDocument();
        expect(screen.getByText(/5.2 接続問題のトラブルシューティング/)).toBeInTheDocument();
        expect(screen.getByText(/5.3 Network Intelligence Centerによる監視と診断/)).toBeInTheDocument();
    });

    it('renders the observability comparison table', () => {
        render(<Section5 />);
        expect(screen.getByRole('columnheader', { name: 'サービス' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'VPC Flow Logs' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Cloud Router' })).toBeInTheDocument();
    });
});
