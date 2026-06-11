import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Section2Page from '@/app/gcl/associate-cloud-engineer/section2/page';

describe('ACE Section 2 完全ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Section2Page />));
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getAllByText(/Planning &/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Implementing/).length).toBeGreaterThanOrEqual(1);
    });

    it('試験ガイドの年表記が 2026年6月版対応 になっていること', () => {
        expect(screen.getByText(/2026年6月版/)).toBeInTheDocument();
    });

    it('Section 2 の配点が ~30% になっていること', () => {
        expect(screen.getByText('~30%')).toBeInTheDocument();
    });

    it('各トピックカード（2.1, 2.2, 2.3, 2.4）が存在すること', () => {
        expect(screen.getByText('コンピューティングリソースの計画と実装')).toBeInTheDocument();
        expect(screen.getByText('ストレージとデータソリューションの計画と実装')).toBeInTheDocument();
        expect(screen.getByText('ネットワークリソースの計画と実装')).toBeInTheDocument();
        expect(screen.getByText('ツールを用いたリソースの計画と実装')).toBeInTheDocument();
    });

    it('主要キーワードが存在すること', () => {
        expect(screen.getAllByText(/Hyperdisk Balanced/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Agent Runtime/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud NGFW/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Fabric FAST/).length).toBeGreaterThanOrEqual(1);
    });

    it('まとめセクション（解法ガイド・チェックリスト）が存在すること', () => {
        expect(screen.getByText('頻出パターン別 解法ガイドと直前チェックリスト')).toBeInTheDocument();
        expect(screen.getByText('試験直前チェックリスト — Section 2 完全版')).toBeInTheDocument();
    });

    it('サイドバーナビが存在しアンカーリンクを含むこと', () => {
        const nav = screen.getByRole('navigation', { name: /Section 2/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(15);
    });
});
