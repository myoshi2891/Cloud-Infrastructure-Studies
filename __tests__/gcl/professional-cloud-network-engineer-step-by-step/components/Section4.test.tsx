import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section4 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section4';

describe('PCNE Step-by-Step - Section 4', () => {
    it('renders the section title correctly', () => {
        render(<Section4 />);
        const title = screen.getByRole('heading', { level: 2 });
        expect(title.textContent).toContain('ハイブリッド/マルチクラウドネットワーク接続の構成と実装');
    });

    it('renders all four subsections', () => {
        render(<Section4 />);
        
        expect(screen.getByText(/4.1 Cloud Interconnectの構成/)).toBeInTheDocument();
        expect(screen.getByText(/4.2 サイト間IPsec VPNの構成/)).toBeInTheDocument();
        expect(screen.getByText(/4.3 Cloud Routerの構成/)).toBeInTheDocument();
        expect(screen.getByText(/4.4 ハイブリッド接続でのNCC構成/)).toBeInTheDocument();
    });

    it('renders the code block correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/# HA VPNゲートウェイの作成/)).toBeInTheDocument();
        expect(screen.getByText(/gcloud compute vpn-gateways create ha-vpn-gw/)).toBeInTheDocument();
    });
});
