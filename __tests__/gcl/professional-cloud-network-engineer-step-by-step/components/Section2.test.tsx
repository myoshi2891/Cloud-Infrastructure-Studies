import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section2 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section2';

describe('PCNE Step-by-Step - Section 2', () => {
    it('renders the section title correctly', () => {
        render(<Section2 />);
        const title = screen.getByRole('heading', { 
            level: 2, 
            name: /VPCネットワークの実装/
        });
        expect(title).toBeInTheDocument();
    });

    it('renders all four subsections in order', () => {
        render(<Section2 />);
        
        const subsections = screen.getAllByRole('heading', { level: 3 });
        expect(subsections).toHaveLength(4);
        expect(subsections[0]).toHaveTextContent(/2.1 VPCの構成/);
        expect(subsections[1]).toHaveTextContent(/2.2 VPCルーティングの構成/);
        expect(subsections[2]).toHaveTextContent(/2.3 Network Connectivity Center（NCC）の構成/);
        expect(subsections[3]).toHaveTextContent(/2.4 GKEクラスタの構成と管理/);
    });

    it('renders the code block with proper structure', () => {
        render(<Section2 />);
        
        const codeBlock = screen.getByText(/# カスタムモードVPCの作成/).closest('.code-block');
        expect(codeBlock).toBeInTheDocument();
        
        const codeLines = codeBlock?.querySelectorAll('.code-line');
        expect(codeLines && codeLines.length).toBeGreaterThan(0);
        
        expect(screen.getByText(/gcloud compute networks create my-vpc/)).toBeInTheDocument();
    });
});
