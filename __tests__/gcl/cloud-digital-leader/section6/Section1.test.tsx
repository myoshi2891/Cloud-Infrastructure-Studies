import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section1 } from '../../../../app/gcl/cloud-digital-leader/section6/components/Section1';

describe('Section1 Financial Governance', () => {
    it('renders the section title', () => {
        render(<Section1 />);
        expect(screen.getByRole('heading', { level: 2, name: /財務ガバナンスと/i })).toBeInTheDocument();
    });

    it('renders the billing structure diagram', () => {
        render(<Section1 />);
        expect(screen.getByRole('img', { name: /Google Cloud の請求構造/i })).toBeInTheDocument();
    });

    it('renders the cost management tools table with scope="col"', () => {
        render(<Section1 />);
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        const headers = screen.getAllByRole('columnheader');
        headers.forEach(header => {
            expect(header).toHaveAttribute('scope', 'col');
        });
        expect(screen.getByText('Cloud Billing レポート')).toBeInTheDocument();
    });

    it('renders the auto cost control architecture diagram', () => {
        render(<Section1 />);
        expect(screen.getByRole('img', { name: /自動コスト制御アーキテクチャ/i })).toBeInTheDocument();
    });

    it('renders accessibility hidden icons', () => {
        render(<Section1 />);
        const hiddenIcons = document.querySelectorAll('[aria-hidden="true"]');
        expect(hiddenIcons.length).toBeGreaterThan(0);
    });
});
