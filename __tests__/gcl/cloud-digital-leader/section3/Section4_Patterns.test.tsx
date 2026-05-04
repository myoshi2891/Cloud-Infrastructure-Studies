import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4_Patterns } from '@/app/gcl/cloud-digital-leader/section3/components/sections/Section4_Patterns';

describe('Section4_Patterns', () => {
    it('renders the patterns component with cards and table', () => {
        render(<Section4_Patterns />);
        
        // Assert pattern cards
        expect(screen.getByText(/PATTERN 01/)).toBeInTheDocument();
        expect(screen.getByText(/PATTERN 02/)).toBeInTheDocument();
        expect(screen.getByText(/PATTERN 03/)).toBeInTheDocument();
        expect(screen.getByText(/PATTERN 04/)).toBeInTheDocument();
        
        // Assert accessible table
        const table = screen.getByRole('table', { name: /混同しやすいポイントの整理/ });
        expect(table).toBeInTheDocument();
        
        // Check column headers
        const headers = screen.getAllByRole('columnheader');
        expect(headers.length).toBe(2);
    });
});
