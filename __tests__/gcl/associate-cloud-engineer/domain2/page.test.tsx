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
        expect(screen.getByText(/計画と実装/)).toBeInTheDocument();
    });

    it('試験配点情報が表示されること', () => {
        expect(screen.getByText(/~21%/)).toBeInTheDocument();
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
        expect(screen.getByText(/コンピューティングサービス/)).toBeInTheDocument();
    });

    it('Terraform の章見出しが存在すること', () => {
        expect(screen.getByText(/Terraform/)).toBeInTheDocument();
    });

    it('ベストプラクティスセクションが存在すること', () => {
        expect(
            screen.getAllByText(/ベストプラクティス/).length
        ).toBeGreaterThanOrEqual(1);
    });
});
