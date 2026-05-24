import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Domain3Page from '@/app/gcl/associate-cloud-engineer/domain3/page';
import { OFFICIAL_DOCS, TECH_GUIDES, CHAPTER_COUNT } from '@/app/gcl/associate-cloud-engineer/domain3/constants';

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

    it(`全${CHAPTER_COUNT}章の見出しが存在すること`, () => {
        expect(
            screen.getAllByRole('heading', { level: 2 }).length
        ).toBeGreaterThanOrEqual(CHAPTER_COUNT);
    });

    it('sticky nav に各章へのリンクが含まれること', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();

        const links = within(nav).getAllByRole('link');
        const hrefs = links.map((a) => a.getAttribute('href'));
        for (let i = 0; i <= CHAPTER_COUNT; i++) {
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

    it('Domain 3 構造図が SVG（role="img"）として描画されること', () => {
        const diagram = screen.getByRole('img', {
            name: /Domain 3 の全体マップ/,
        });
        expect(diagram).toBeInTheDocument();
    });

    it('クラウド運用の 3 つの柱が SVG として描画されること', () => {
        const diagram = screen.getByRole('img', {
            name: /クラウド運用の 3 つの柱/,
        });
        expect(diagram).toBeInTheDocument();
    });

    it('VM ライフサイクル状態遷移図が Mermaid wrapper として描画されること', () => {
        const diagram = screen.getByRole('img', {
            name: /VM のライフサイクル/,
        });
        expect(diagram).toBeInTheDocument();
        expect(diagram).toHaveAttribute('aria-roledescription', 'diagram');
    });

    it('ベストプラクティスセクションが存在すること', () => {
        expect(
            screen.getAllByText(/ベストプラクティス/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('Chapter18 が正しくレンダリングされ、参考リンクが適正に設定されていること', () => {
        const ch18 = document.getElementById('ch18');
        expect(ch18).toBeInTheDocument();

        expect(screen.getAllByText(/参考資料/).length).toBeGreaterThanOrEqual(1);

        const expectedCount = OFFICIAL_DOCS.length + TECH_GUIDES.length;
        const links = ch18?.querySelectorAll('a');
        expect(links?.length).toBe(expectedCount);

        links?.forEach(link => {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    it('SVG 内の rect 要素がハードコードされた色（rgba など）を fill に含まないこと', () => {
        const rects = document.querySelectorAll('rect');
        expect(rects.length).toBeGreaterThan(0);
        rects.forEach((rect) => {
            const fill = rect.getAttribute('fill');
            if (fill) {
                const allowedFillRegex = /^(?:currentColor|none|transparent|var\(--[a-zA-Z0-9_-]+\)|url\(#[a-zA-Z0-9_-]+\))$/;
                expect(fill).toMatch(allowedFillRegex);
            }
        });
    });
});
