import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4_Checklist } from '@/app/gcl/cloud-digital-leader/section3/components/sections/Section4_Checklist';

describe('Section4_Checklist', () => {
    it('renders the checklist component with major UI elements', () => {
        render(<Section4_Checklist />);
        
        // Assert section title
        expect(screen.getByText('試験直前チェックリスト')).toBeInTheDocument();
        
        // Assert subsections
        expect(screen.getByText('3.1 AI/ML 基礎')).toBeInTheDocument();
        expect(screen.getByText('3.2 ソリューション選択')).toBeInTheDocument();
        expect(screen.getByText('3.3 各サービスの詳細')).toBeInTheDocument();
        
        // Check representative list items
        expect(screen.getByText(/AI ⊃ ML ⊃ 深層学習 ⊃ 生成 AI ⊃ LLM/)).toBeInTheDocument();
        expect(screen.getByText(/GIGO の法則/)).toBeInTheDocument();
        
        // Check list items
        const listItems = screen.getAllByRole('listitem');
        expect(listItems.length).toBeGreaterThan(0);
    });
});
