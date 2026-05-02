import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/cloud-digital-leader/section3/page';

describe('Cloud Digital Leader Section 3 Page', () => {
    it('renders the page title', () => {
        render(<Page />);
        expect(
            screen.getByRole('heading', { level: 1, name: /Innovating with Google Cloud/i })
        ).toBeInTheDocument();
    });

    it('renders Section 1: AI AND ML FUNDAMENTALS', () => {
        render(<Page />);
        expect(
            screen.getByRole('heading', { level: 2, name: /AI と ML の基礎概念/i })
        ).toBeInTheDocument();
        expect(screen.getByText('AI 技術の包含関係（最重要！）')).toBeInTheDocument();
    });

    it('renders Section 2: AI AND ML SOLUTIONS', () => {
        render(<Page />);
        expect(
            screen.getByRole('heading', { level: 2, name: /Google Cloud AI\/ML ソリューションの選択/i })
        ).toBeInTheDocument();
        expect(screen.getByText('AI/ML ソリューション選択デシジョンツリー')).toBeInTheDocument();
    });

    it('renders Section 3: BUILDING AND USING AI/ML SOLUTIONS', () => {
        render(<Page />);
        expect(
            screen.getByRole('heading', { level: 2, name: /Google Cloud AI\/ML ソリューションの構築・活用/i })
        ).toBeInTheDocument();
        expect(screen.getByText('AutoML の革命的な点')).toBeInTheDocument();
        expect(screen.getByText(/BigQuery ML の革命的な価値/)).toBeInTheDocument();
    });
});
