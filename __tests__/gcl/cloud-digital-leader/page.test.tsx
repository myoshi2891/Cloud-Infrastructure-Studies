import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CloudDigitalLeaderPage from '@/app/gcl/cloud-digital-leader/page';

describe('Cloud Digital Leader 認定試験 ページ', () => {
    beforeEach(() => {
        render(<CloudDigitalLeaderPage />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(
            screen.getAllByText(/Cloud Digital Leader/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションにタイトルが含まれること', () => {
        expect(
            screen.getAllByText(/認定試験/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('試験仕様情報が表示されること', () => {
        expect(
            screen.getAllByText(/60問/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('全8セクションの見出しが存在すること', () => {
        expect(
            screen.getAllByRole('heading', { level: 2 }).length
        ).toBeGreaterThanOrEqual(8);
    });

    it('sticky nav に各セクションへのリンクが含まれること', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
    });

    it('DX・クラウド基礎セクションが存在すること', () => {
        expect(
            screen.getAllByText(/DX/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('AI・ML セクションが存在すること', () => {
        expect(
            screen.getAllByText(/AI/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('ベストプラクティスセクションが存在すること', () => {
        expect(
            screen.getAllByText(/ベストプラクティス/).length
        ).toBeGreaterThanOrEqual(1);
    });
});
