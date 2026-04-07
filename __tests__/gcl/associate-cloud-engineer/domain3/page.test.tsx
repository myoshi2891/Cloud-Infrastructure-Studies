import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Domain3Page from '@/app/gcl/associate-cloud-engineer/domain3/page';

describe('Domain 3: Ensuring Successful Operation of a Cloud Solution ページ', () => {
    beforeEach(() => {
        render(<Domain3Page />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(
            screen.getAllByText(/Ensuring Successful Operation/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションにドメイン説明が含まれること', () => {
        expect(
            screen.getAllByText(/運用管理/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('試験配点情報が表示されること', () => {
        expect(
            screen.getAllByText(/~22%/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('全17章の見出しが存在すること', () => {
        expect(
            screen.getAllByRole('heading', { level: 2 }).length
        ).toBeGreaterThanOrEqual(17);
    });

    it('sticky nav に各章へのリンクが含まれること', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();

        const links = within(nav).getAllByRole('link');
        const hrefs = links.map((a) => a.getAttribute('href'));
        for (let i = 0; i <= 17; i++) {
            expect(hrefs).toContain(`#ch${i}`);
        }
    });

    it('SRE の章見出しが存在すること', () => {
        expect(
            screen.getAllByText(/SRE/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('Cloud Monitoring の章見出しが存在すること', () => {
        expect(
            screen.getAllByText(/Cloud Monitoring/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('ベストプラクティスセクションが存在すること', () => {
        expect(
            screen.getAllByText(/ベストプラクティス/).length
        ).toBeGreaterThanOrEqual(1);
    });
});
