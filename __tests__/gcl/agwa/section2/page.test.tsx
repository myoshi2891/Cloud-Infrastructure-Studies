import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AgwaSection2Page from '@/app/gcl/agwa/section2/page';

describe('AGWA Section 2 完全学習ガイド', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<AgwaSection2Page />);
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('hero セクションにタイトルが含まれること', () => {
        render(<AgwaSection2Page />);
        const titles = screen.getAllByText(/Google Workspace/i);
        expect(titles.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('主要なセクションの見出しが存在すること', () => {
        render(<AgwaSection2Page />);
        // Testing some of the major sections based on HTML content
        expect(screen.getAllByText(/2.1/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Gmail/i).length).toBeGreaterThanOrEqual(1);
        
        expect(screen.getAllByText(/2.2/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Drive/i).length).toBeGreaterThanOrEqual(1);
        
        expect(screen.getAllByText(/2.3/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Calendar/i).length).toBeGreaterThanOrEqual(1);

        expect(screen.getAllByText(/2.4/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Google Meet/i).length).toBeGreaterThanOrEqual(1);

        expect(screen.getAllByText(/2.5/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Google Chat/i).length).toBeGreaterThanOrEqual(1);

        expect(screen.getAllByText(/2.6/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Gemini/i).length).toBeGreaterThanOrEqual(1);
    });
});
