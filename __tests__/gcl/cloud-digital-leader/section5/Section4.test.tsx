import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4 } from '@/app/gcl/cloud-digital-leader/section5/components/sections/Section4';

describe('Section4', () => {
    it('renders compliance and exam preparation sections', () => {
        render(<Section4 />);
        
        expect(screen.getByRole('heading', { level: 2, name: /コンプライアンスと規制対応/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /試験直前チェックリスト＆頻出パターン/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 3, name: /頻出問題パターンと解法/ })).toBeInTheDocument();
        
        // Check for specific compliance text
        expect(screen.getByText('GDPR')).toBeInTheDocument();
        expect(screen.getByText('HIPAA')).toBeInTheDocument();
        
        // Assert table
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        
        const headers = screen.getAllByRole('columnheader');
        expect(headers.length).toBeGreaterThan(0);
    });
});
