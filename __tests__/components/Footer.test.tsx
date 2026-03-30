import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
    it('フッターが表示されること', () => {
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('著作権表示が含まれること', () => {
        render(<Footer />);
        expect(screen.getByText(/cloud infrastructure studies/i)).toBeInTheDocument();
    });
});
