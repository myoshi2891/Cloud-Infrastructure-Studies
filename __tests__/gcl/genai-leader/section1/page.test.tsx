import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section1Page from '@/app/gcl/genai-leader/section1/page';

describe('Generative AI Leader Section 1 ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<Section1Page />);
        expect(screen.getAllByText(/Gen AI 基礎知識/).length).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションに Aurora テーマの h1 が含まれること', () => {
        render(<Section1Page />);
        expect(screen.getByText(/完全攻略ガイド/)).toBeInTheDocument();
        expect(screen.getAllByText(/~30%/).length).toBeGreaterThanOrEqual(1);
    });

    it('4つのサブセクション見出しが存在すること', () => {
        render(<Section1Page />);
        expect(screen.getAllByText(/Gen AI の核心概念・用語と定義/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/データの種類とビジネス的意味/).length).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/Gen AI ランドスケープ — 5 層構造とビジネス的意味/).length
        ).toBeGreaterThanOrEqual(1);
        expect(
            screen.getAllByText(/Google の基盤モデル完全解説/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('nav にサブセクションリンクが含まれること', () => {
        render(<Section1Page />);
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getAllByText(/核心概念・用語/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/データの種類/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/ランドスケープ/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/基盤モデル/).length).toBeGreaterThanOrEqual(1);
    });

    it('Section 1: Fundamentals のバッジが表示されること', () => {
        render(<Section1Page />);
        expect(
            screen.getByText(/Section 1: Fundamentals of Generative AI/)
        ).toBeInTheDocument();
    });
});
