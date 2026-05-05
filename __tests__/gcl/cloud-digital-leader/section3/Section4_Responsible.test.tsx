import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4_Responsible } from '@/app/gcl/cloud-digital-leader/section3/components/sections/Section4_Responsible';

describe('Section4_Responsible Component', () => {
    it('renders the section title and tag correctly', () => {
        render(<Section4_Responsible />);
        expect(screen.getByText('RESPONSIBLE AI')).toBeInTheDocument();
        expect(screen.getByText(/責任ある AI（Responsible AI）/)).toBeInTheDocument();
    });

    it('renders the subsection titles correctly', () => {
        render(<Section4_Responsible />);
        expect(screen.getByText('なぜ責任ある AI が必要か')).toBeInTheDocument();
        expect(screen.getByText(/責任ある AI の 6 核心原則/)).toBeInTheDocument();
    });

    it('renders the six problem cards', () => {
        render(<Section4_Responsible />);
        const problemTitles = [
            '差別・偏見（Bias）',
            'ハルシネーション（幻覚）',
            'プライバシー侵害',
            '不正利用・悪用',
            '透明性の欠如（ブラックボックス）',
            'アクセス格差'
        ];

        problemTitles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders the six core principle cards', () => {
        render(<Section4_Responsible />);
        const principleTitles = [
            '① 公平性（Fairness）',
            '② 信頼性と安全性',
            '③ プライバシーとセキュリティ',
            '④ 包括性とアクセシビリティ',
            '⑤ 透明性と説明可能性（XAI）',
            '⑥ 説明責任（Accountability）'
        ];

        principleTitles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });
});
