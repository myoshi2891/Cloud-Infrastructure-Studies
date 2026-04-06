import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Domain2Page from '@/app/gcl/associate-cloud-engineer/domain2/page';

describe('Domain 2: Planning and Implementing a Cloud Solution ページ', () => {
    beforeEach(() => {
        render(<Domain2Page />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(
            screen.getAllByText(/Planning and Implementing/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションにドメイン説明が含まれること', () => {
        expect(screen.getAllByText(/計画と実装/).length).toBeGreaterThanOrEqual(1);
    });

    it('試験配点情報が表示されること', () => {
        expect(screen.getAllByText(/~21%/).length).toBeGreaterThanOrEqual(1);
    });

    it('全16章の見出しが存在すること', () => {
        expect(
            screen.getAllByRole('heading', { level: 2 }).length
        ).toBeGreaterThanOrEqual(16);
    });

    it('sticky nav に各章へのリンクが含まれること', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
    });

    it('コンピューティングサービスの章見出しが存在すること', () => {
        expect(screen.getAllByText(/コンピューティングサービス/).length).toBeGreaterThanOrEqual(1);
    });

    it('Terraform の章見出しが存在すること', () => {
        expect(screen.getAllByText(/Terraform/).length).toBeGreaterThanOrEqual(1);
    });

    it('ベストプラクティスセクションが存在すること', () => {
        expect(
            screen.getAllByText(/ベストプラクティス/).length
        ).toBeGreaterThanOrEqual(1);
    });
});
