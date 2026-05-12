import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section1 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section1';

describe('PCNE Step-by-Step - Section 1', () => {
    it('renders the section title correctly', () => {
        render(<Section1 />);
        const title = screen.getByRole('heading', { 
            level: 2, 
            name: /VPCネットワークの設計と計画/
        });
        expect(title).toBeInTheDocument();
    });

    it('renders all four subsections in order', () => {
        render(<Section1 />);
        
        const subsections = screen.getAllByRole('heading', { level: 3 });
        expect(subsections).toHaveLength(4);
        expect(subsections[0]).toHaveTextContent(/1.1 全体ネットワークアーキテクチャの設計/);
        expect(subsections[1]).toHaveTextContent(/1.2 VPCネットワークの設計/);
        expect(subsections[2]).toHaveTextContent(/1.3 レジリエントでパフォーマントなハイブリッド\/マルチクラウドネットワーク設計/);
        expect(subsections[3]).toHaveTextContent(/1.4 GKE（Google Kubernetes Engine）向けネットワーク設計/);
    });

    it('renders the comparison table for hybrid connectivity', () => {
        render(<Section1 />);
        expect(screen.getAllByRole('columnheader', { name: '接続方式' })[0]).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Dedicated Interconnect' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'HA VPN' })).toBeInTheDocument();
    });
});
