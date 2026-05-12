import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section1 } from '../../../../app/gcl/professional-cloud-network-engineer-step-by-step/components/Section1';

describe('PCNE Step-by-Step - Section 1', () => {
    it('renders the section title correctly', () => {
        render(<Section1 />);
        const title = screen.getByRole('heading', { level: 2 });
        expect(title.textContent).toContain('VPCネットワークの設計と計画');
    });

    it('renders all four subsections', () => {
        render(<Section1 />);
        
        expect(screen.getByText(/1.1 全体ネットワークアーキテクチャの設計/)).toBeInTheDocument();
        expect(screen.getByText(/1.2 VPCネットワークの設計/)).toBeInTheDocument();
        expect(screen.getByText(/1.3 レジリエントでパフォーマントなハイブリッド\/マルチクラウドネットワーク設計/)).toBeInTheDocument();
        expect(screen.getByText(/1.4 GKE（Google Kubernetes Engine）向けネットワーク設計/)).toBeInTheDocument();
    });

    it('renders the comparison table for hybrid connectivity', () => {
        render(<Section1 />);
        expect(screen.getAllByRole('columnheader', { name: '接続方式' }).length).toBeGreaterThan(0);
        expect(screen.getByRole('cell', { name: 'Dedicated Interconnect' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'HA VPN' })).toBeInTheDocument();
    });
});
