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
});
