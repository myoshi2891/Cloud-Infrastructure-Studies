import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComprehensiveGuidePage from '../../../../app/gcl/cloud-digital-leader/comprehensive-guide/page';

describe('CDL Comprehensive Guide Page', () => {
    it('renders page title', () => {
        render(<ComprehensiveGuidePage />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('CDL エンタープライズ・ベストプラクティス解説');
    });

    it('renders section 1 title', () => {
        render(<ComprehensiveGuidePage />);
        expect(screen.getByText('1. Google Cloud によるデジタルトランスフォーメーション (試験の約17%)')).toBeInTheDocument();
        expect(screen.getByText(/従来のオンプレミス環境におけるインフラ構築は/i)).toBeInTheDocument();
    });
});
