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
});
