import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4_Responsible } from '@/app/gcl/cloud-digital-leader/section3/components/sections/Section4_Responsible';

describe('Section4_Responsible', () => {
    it('renders the responsible AI section with all principles', () => {
        render(<Section4_Responsible />);
        
        expect(screen.getByRole('heading', { level: 2, name: /責任ある AI（Responsible AI）/ })).toBeInTheDocument();
        expect(screen.getByText('RESPONSIBLE AI')).toBeInTheDocument();
        
        // Assert problem cards
        expect(screen.getByText('差別・偏見（Bias）')).toBeInTheDocument();
        expect(screen.getByText('ハルシネーション（幻覚）')).toBeInTheDocument();
        expect(screen.getByText('プライバシー侵害')).toBeInTheDocument();
        expect(screen.getByText('不正利用・悪用')).toBeInTheDocument();

        // Assert core principles
        expect(screen.getByText(/① 公平性/)).toBeInTheDocument();
        expect(screen.getByText(/② 信頼性と安全性/)).toBeInTheDocument();
        expect(screen.getByText(/③ プライバシーとセキュリティ/)).toBeInTheDocument();
        expect(screen.getByText(/④ 包括性とアクセシビリティ/)).toBeInTheDocument();
        expect(screen.getByText(/⑤ 透明性と説明可能性/)).toBeInTheDocument();
        expect(screen.getByText(/⑥ 説明責任/)).toBeInTheDocument();
    });
});
