import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/cloud-digital-leader/section1/page';

describe('Cloud Digital Leader Section 1 Page', () => {
    it('renders the page title', () => {
        render(<Page />);
        expect(
            screen.getByRole('heading', { level: 1, name: /Section 1: デジタルトランスフォーメーション/i })
        ).toBeInTheDocument();
    });
});
