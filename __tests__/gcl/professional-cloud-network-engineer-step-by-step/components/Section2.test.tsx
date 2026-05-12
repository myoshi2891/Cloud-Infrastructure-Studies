import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section2 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section2';

describe('PCNE Step-by-Step - Section 2', () => {
    it('renders the section title correctly', () => {
        render(<Section2 />);
        const title = screen.getByRole('heading', { level: 2 });
        expect(title.textContent).toContain('VPCネットワークの実装');
    });

    it('renders all four subsections', () => {
        render(<Section2 />);
        
        expect(screen.getByText(/2.1 VPCの構成/)).toBeInTheDocument();
        expect(screen.getByText(/2.2 VPCルーティングの構成/)).toBeInTheDocument();
        expect(screen.getByText(/2.3 Network Connectivity Center（NCC）の構成/)).toBeInTheDocument();
        expect(screen.getByText(/2.4 GKEクラスタの構成と管理/)).toBeInTheDocument();
    });

    it('renders the code block correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/# カスタムモードVPCの作成/)).toBeInTheDocument();
        expect(screen.getByText(/gcloud compute networks create my-vpc/)).toBeInTheDocument();
    });
});
