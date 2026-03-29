import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section4Page from '@/app/gcl/genai-leader/section4/page';

describe('Generative AI Leader Section 4 ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<Section4Page />);
        expect(
            screen.getAllByText(/Gen AI 成功への/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('hero に Section 4 の配点バッジが表示されること', () => {
        render(<Section4Page />);
        expect(screen.getAllByText(/~15%/).length).toBeGreaterThanOrEqual(1);
        expect(
            screen.getByText(/Section 4: Business Strategies for a Successful Gen AI Solution/)
        ).toBeInTheDocument();
    });

    it('3つのサブセクション見出しが存在すること', () => {
        render(<Section4Page />);
        expect(
            screen.getAllByText(/Gen AI ソリューションの成功実装ステップ/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/セキュアな AI（Secure AI）とその重要性/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/責任ある AI（Responsible AI）とビジネス倫理/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('nav にサブセクションリンクが含まれること', () => {
        render(<Section4Page />);
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getAllByText(/Gen AI 実装戦略/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/セキュアな AI/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/責任ある AI/).length).toBeGreaterThanOrEqual(1);
    });
});
