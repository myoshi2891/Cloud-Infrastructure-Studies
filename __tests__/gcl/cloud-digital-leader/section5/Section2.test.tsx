import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section2 } from '@/app/gcl/cloud-digital-leader/section5/components/sections/Section2';

describe('Section2', () => {
    it('renders the IAM and encryption sections', () => {
        render(<Section2 />);
        
        expect(screen.getByRole('heading', { level: 2, name: /IAM/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /暗号化とデータ保護/ })).toBeInTheDocument();
        
        // Verify subsection
        expect(screen.getByRole('heading', { level: 3, name: /データの 3 つの状態と暗号化/ })).toBeInTheDocument();
    });
});
