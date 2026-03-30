import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section3Page from '@/app/gcl/genai-leader/section3/page';

describe('Generative AI Leader Section 3 ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<Section3Page />);
        expect(
            screen.getAllByText(/モデル出力を/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('hero に Section 3 の配点バッジが表示されること', () => {
        render(<Section3Page />);
        expect(screen.getAllByText(/~20%/).length).toBeGreaterThanOrEqual(1);
        expect(
            screen.getByText(/Section 3: Techniques to Improve Gen AI Model Output/)
        ).toBeInTheDocument();
    });

    it('3つのサブセクション見出しが存在すること', () => {
        render(<Section3Page />);
        expect(
            screen.getAllByText(/ファウンデーションモデルの限界と克服戦略/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/プロンプトエンジニアリング技術/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/グラウンディング技術と RAG/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('nav にサブセクションリンクが含まれること', () => {
        render(<Section3Page />);
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getAllByText(/モデルの限界と克服/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/プロンプトエンジニアリング/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/グラウンディング/).length).toBeGreaterThanOrEqual(1);
    });
});
