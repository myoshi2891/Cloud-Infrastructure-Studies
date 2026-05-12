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

    it('renders all four subsections', () => {
        render(<Section6 />);
        
        expect(screen.getByText(/6.1 Google Cloud Armorポリシーの構成/)).toBeInTheDocument();
        expect(screen.getByText(/6.2 Cloud NGFWポリシーとVPCファイアウォールルールの構成と管理/)).toBeInTheDocument();
        expect(screen.getByText(/6.3 インターネットエグレストラフィックの保護/)).toBeInTheDocument();
        expect(screen.getByText(/6.4 自己管理型NVAとパケットミラーリングの構成/)).toBeInTheDocument();
    });

    it('renders the NGFW comparison table', () => {
        render(<Section6 />);
        expect(screen.getByRole('columnheader', { name: 'ティア' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'NGFW Essentials' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'NGFW Enterprise' })).toBeInTheDocument();
    });
});
