import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section6Page from '@/app/gcl/cloud-digital-leader/section6/page';

describe('Section6Page', () => {
    it('renders hero title', () => {
        render(<Section6Page />);
        expect(screen.getByText(/Scaling with Google/i)).toBeInTheDocument();
        expect(screen.getByText(/Cloud Operations/i)).toBeInTheDocument();
    });

    it('renders the sticky navigation', () => {
        render(<Section6Page />);
        const nav = screen.getByRole('navigation', { name: /Quick navigation/i });
        expect(nav).toBeInTheDocument();
        expect(within(nav).getByText(/財務ガバナンス/i)).toBeInTheDocument();
        expect(within(nav).getByText(/試験対策/i)).toBeInTheDocument();
    });
});
