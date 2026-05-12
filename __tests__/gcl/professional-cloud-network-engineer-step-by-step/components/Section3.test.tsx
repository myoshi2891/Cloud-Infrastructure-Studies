import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section3 } from '../../../../app/gcl/professional-cloud-network-engineer-step-by-step/components/Section3';

describe('PCNE Step-by-Step - Section 3', () => {
    it('renders the section title correctly', () => {
        render(<Section3 />);
        const title = screen.getByRole('heading', { level: 2 });
        expect(title.textContent).toContain('マネージドネットワークサービスの構成');
    });

    it('renders all three subsections', () => {
        render(<Section3 />);
        
        expect(screen.getByText(/3.1 ロードバランシングの構成/)).toBeInTheDocument();
        expect(screen.getByText(/3.2 Cloud CDNの構成/)).toBeInTheDocument();
        expect(screen.getByText(/3.3 Cloud DNSの構成/)).toBeInTheDocument();
    });

    it('renders the comparison table for load balancers', () => {
        render(<Section3 />);
        expect(screen.getByRole('columnheader', { name: 'LB種別' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Global External ALB' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Internal Passthrough NLB' })).toBeInTheDocument();
    });
});
