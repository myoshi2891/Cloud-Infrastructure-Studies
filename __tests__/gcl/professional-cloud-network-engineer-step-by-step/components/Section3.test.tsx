import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section3 } from '@/app/gcl/professional-cloud-network-engineer-step-by-step/components/Section3';

describe('PCNE Step-by-Step - Section 3', () => {
    beforeEach(() => {
        render(<Section3 />);
    });

    it('renders the section title correctly', () => {
        const title = screen.getByRole('heading', { 
            level: 2, 
            name: /マネージドネットワークサービスの構成/
        });
        expect(title).toBeInTheDocument();
    });

    it('renders all three subsections in order', () => {
        const subsections = screen.getAllByRole('heading', { level: 3 });
        expect(subsections).toHaveLength(3);
        expect(subsections[0]).toHaveTextContent(/3.1 ロードバランシングの構成/);
        expect(subsections[1]).toHaveTextContent(/3.2 Cloud CDNの構成/);
        expect(subsections[2]).toHaveTextContent(/3.3 Cloud DNSの構成/);
    });

    it('renders the comparison table for load balancers', () => {
        expect(screen.getByRole('columnheader', { name: 'LB種別' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Global External ALB' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Internal Passthrough NLB' })).toBeInTheDocument();
    });
});
