import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section3 } from '@/app/gcl/cloud-digital-leader/section5/components/sections/Section3';

describe('Section3', () => {
    it('renders network security and threat detection sections', () => {
        render(<Section3 />);
        
        expect(screen.getByRole('heading', { level: 2, name: /ネットワークセキュリティ/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /脅威検出とセキュリティ監視/ })).toBeInTheDocument();
        
        // Assert table presence
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        
        // Verify headers
        const headers = screen.getAllByRole('columnheader');
        expect(headers.length).toBeGreaterThan(0);
    });
});
