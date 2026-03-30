import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header', () => {
    it('サイトタイトルが表示されること', () => {
        render(<Header />);
        expect(screen.getByText('Cloud Infrastructure Studies')).toBeInTheDocument();
    });

    it('GenAI Leader ページへのリンクが存在すること', () => {
        render(<Header />);
        const link = screen.getByRole('link', { name: /generative ai leader/i });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader');
    });

    it('Associate Cloud Engineer ページへのリンクが存在すること', () => {
        render(<Header />);
        const link = screen.getByRole('link', { name: /associate cloud engineer/i });
        expect(link).toHaveAttribute('href', '/gcl/associate-cloud-engineer');
    });

    it('nav 要素として描画されること', () => {
        render(<Header />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('Section 1 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const link = screen.getByRole('link', { name: /section 1/i });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section1');
    });

    it('Section 2 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const link = screen.getByRole('link', { name: /section 2/i });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section2');
    });

    it('Section 3 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const link = screen.getByRole('link', { name: /section 3/i });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section3');
    });

    it('Section 4 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const link = screen.getByRole('link', { name: /section 4/i });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section4');
    });
});
