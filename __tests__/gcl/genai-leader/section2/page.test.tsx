import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section2Page from '@/app/gcl/genai-leader/section2/page';

describe('Generative AI Leader Section 2 ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<Section2Page />);
        expect(screen.getAllByText(/Google Cloud の Gen AI サービス/).length).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションに Sapphire テーマの h1 が含まれること', () => {
        render(<Section2Page />);
        expect(screen.getAllByText(/~35%/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Section 2: Google Cloud's Gen AI Offerings/)).toBeInTheDocument();
    });

    it('5つのサブセクション見出しが存在すること', () => {
        render(<Section2Page />);
        expect(
            screen.getAllByText(/Google Cloud の Gen AI における強み/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/プリビルト Gen AI サービス/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/顧客体験向上ソリューション/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/開発者向け AI 構築基盤/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/Gen AI エージェントのツーリング/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('nav にサブセクションリンクが含まれること', () => {
        render(<Section2Page />);
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getAllByText(/Google Cloud の強み/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/プリビルト Gen AI/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/顧客体験/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Vertex AI/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/エージェント/).length).toBeGreaterThanOrEqual(1);
    });
});
