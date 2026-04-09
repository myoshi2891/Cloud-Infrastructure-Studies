import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Domain2Page from '@/app/gcl/associate-cloud-engineer/domain2/page';
import { REFERENCE_LINKS, CHAPTER_COUNT, TECH_GUIDE_LINKS } from '@/app/gcl/associate-cloud-engineer/domain2/constants';
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

    it(`全${CHAPTER_COUNT}章の見出しが存在すること`, () => {
        expect(
            screen.getAllByRole('heading', { level: 2 }).length
        ).toBeGreaterThanOrEqual(CHAPTER_COUNT);
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

    it('Chapter17 が正しくレンダリングされ、参考リンクがすべて表示されること', () => {
        // Assert the presence of the section anchor '#ch17'
        const ch17 = document.getElementById('ch17');
        expect(ch17).toBeInTheDocument();

        // Assert the heading text
        expect(screen.getAllByText(/参考資料/).length).toBeGreaterThanOrEqual(1);

        // Assert the number of rendered link items
        const expectedCount = REFERENCE_LINKS.length + TECH_GUIDE_LINKS.length;
        const links = ch17?.querySelectorAll('a');
        expect(links?.length).toBe(expectedCount);
    });
});
