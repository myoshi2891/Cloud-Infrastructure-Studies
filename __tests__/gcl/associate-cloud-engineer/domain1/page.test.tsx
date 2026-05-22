import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Domain1Page from '@/app/gcl/associate-cloud-engineer/domain1/page';

describe('Domain 1: クラウドソリューション環境の設定 ページ', () => {
    beforeEach(() => {
        render(<Domain1Page />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(
            screen.getAllByText(/クラウドソリューション環境の設定/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('試験配点情報が表示されること', () => {
        expect(
            screen.getAllByText(/≈23%/).length
        ).toBeGreaterThanOrEqual(1);
    });

    it('Domain 1 全体マップが SVG（role="img"）として描画されること', () => {
        const diagram = screen.getByRole('img', {
            name: /Domain 1 の全体マップ/,
        });
        expect(diagram).toBeInTheDocument();
    });

    it('会社組織図と Google Cloud 階層の対応が SVG として描画されること', () => {
        const diagram = screen.getByRole('img', {
            name: /会社組織図と Google Cloud 階層の対応/,
        });
        expect(diagram).toBeInTheDocument();
    });

    it('Domain 1 マップ SVG に主要ラベル（Organization / Folder / Project）が含まれること', () => {
        const diagram = screen.getByRole('img', {
            name: /Domain 1 の全体マップ/,
        });
        expect(within(diagram).getAllByText(/Cloud Identity|請求|API/).length)
            .toBeGreaterThanOrEqual(1);
    });

    it('リソース階層を説明する Chapter 1 の見出しが存在すること', () => {
        expect(
            screen.getAllByText(/リソース階層/).length
        ).toBeGreaterThanOrEqual(1);
    });
});
