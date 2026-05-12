import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section6 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section6';

describe('PCNE Step-by-Step - Section 6', () => {
    it('renders the section title correctly', () => {
        render(<Section6 />);
        const title = screen.getByRole('heading', { 
            level: 2, 
            name: /クラウドネットワークセキュリティの構成と実装/
        });
        expect(title).toBeInTheDocument();
    });

    it('renders all four subsections in order', () => {
        render(<Section6 />);
        
        const subsections = screen.getAllByRole('heading', { level: 3 });
        expect(subsections).toHaveLength(4);
        expect(subsections[0]).toHaveTextContent(/6.1 Google Cloud Armorポリシーの構成/);
        expect(subsections[1]).toHaveTextContent(/6.2 Cloud NGFWポリシーとVPCファイアウォールルールの構成と管理/);
        expect(subsections[2]).toHaveTextContent(/6.3 インターネットエグレストラフィックの保護/);
        expect(subsections[3]).toHaveTextContent(/6.4 自己管理型NVAとパケットミラーリングの構成/);
    });

    it('renders the NGFW comparison table', () => {
        render(<Section6 />);
        expect(screen.getByRole('columnheader', { name: 'ティア' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'NGFW Essentials' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'NGFW Enterprise' })).toBeInTheDocument();
    });
});
