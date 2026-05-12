import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section4 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section4';

describe('PCNE Step-by-Step - Section 4', () => {
    it('renders the section title correctly', () => {
        render(<Section4 />);
        const title = screen.getByRole('heading', { 
            level: 2, 
            name: /ハイブリッド\/マルチクラウドネットワーク接続の構成と実装/
        });
        expect(title).toBeInTheDocument();
    });

    it('renders all four subsections in order', () => {
        render(<Section4 />);
        
        const subsections = screen.getAllByRole('heading', { level: 3 });
        expect(subsections).toHaveLength(4);
        expect(subsections[0]).toHaveTextContent(/4.1 Cloud Interconnectの構成/);
        expect(subsections[1]).toHaveTextContent(/4.2 サイト間IPsec VPNの構成/);
        expect(subsections[2]).toHaveTextContent(/4.3 Cloud Routerの構成/);
        expect(subsections[3]).toHaveTextContent(/4.4 ハイブリッド接続でのNCC構成/);
    });

    it('renders the code block with proper structure', () => {
        render(<Section4 />);
        
        const codeBlock = screen.getByText(/# HA VPNゲートウェイの作成/).closest('.code-block');
        expect(codeBlock).toBeInTheDocument();
        
        // Ensure it contains code lines
        const codeLines = codeBlock?.querySelectorAll('.code-line');
        expect(codeLines && codeLines.length).toBeGreaterThan(0);
        
        expect(screen.getByText(/gcloud compute vpn-gateways create ha-vpn-gw/)).toBeInTheDocument();
    });
});
