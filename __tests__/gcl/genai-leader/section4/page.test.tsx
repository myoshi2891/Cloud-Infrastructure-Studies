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

    it('card-h クラスの h3 見出しが主要セクションに存在すること', () => {
        const { container } = render(<Section4Page />);
        const cardHeadings = container.querySelectorAll('h3.card-h');
        expect(cardHeadings.length).toBeGreaterThanOrEqual(5);

        const headingTexts = Array.from(cardHeadings).map((el) => el.textContent ?? '');
        expect(headingTexts.some((t) => t.includes('Gen AI ソリューションの種類と特性'))).toBe(true);
        expect(headingTexts.some((t) => t.includes('Google Cloud の主要セキュリティツール群'))).toBe(true);
        expect(headingTexts.some((t) => t.includes('Section 4 試験攻略'))).toBe(true);
    });

    it('外部リンクに rel="noopener" と aria-describedby が設定されていること', () => {
        const { container } = render(<Section4Page />);
        const externalLinks = container.querySelectorAll('a[target="_blank"]');
        expect(externalLinks.length).toBeGreaterThanOrEqual(1);

        externalLinks.forEach((link) => {
            const rel = link.getAttribute('rel') ?? '';
            expect(rel).toContain('noopener');
            expect(rel).toContain('noreferrer');
            expect(link.getAttribute('aria-describedby')).toBe('s4-external-link-hint');
        });
    });

    it('スクリーンリーダー向け共有ヒント要素が存在し ID が正しいこと', () => {
        const { container } = render(<Section4Page />);
        const hint = container.querySelector('#s4-external-link-hint');
        expect(hint).not.toBeNull();
        expect(hint?.classList.contains('sr-only')).toBe(true);
        expect(hint?.textContent).toContain('新しいタブで開きます');
    });

    it('テーブルヘッダーに scope="col" が設定されていること', () => {
        const { container } = render(<Section4Page />);
        const thElements = container.querySelectorAll('thead th');
        expect(thElements.length).toBeGreaterThanOrEqual(1);

        thElements.forEach((th) => {
            expect(th.getAttribute('scope')).toBe('col');
        });
    });

    it('テーブルに sr-only caption が存在すること', () => {
        const { container } = render(<Section4Page />);
        const captions = container.querySelectorAll('table caption.sr-only');
        expect(captions.length).toBe(2);
    });
});
