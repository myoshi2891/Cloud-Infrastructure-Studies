import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Section1Page from '@/app/gcl/associate-cloud-engineer/section1/page';

describe('ACE Section 1 完全ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Section1Page />));
    });

    it('hero タイトルがレンダリングされること', () => {
        // hero-title と sidebar-title の両方に出現するため複数一致を許容
        expect(screen.getAllByText(/Setting up a Cloud/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Solution Environment/).length).toBeGreaterThanOrEqual(1);
    });

    it('試験ガイドの年表記が 2026 に修正されていること', () => {
        // 公式 PDF (063026 = 2026/06/30) に基づく修正。2025 表記は残っていてはならない
        expect(screen.getByText(/2026年6月30日版 対応/)).toBeInTheDocument();
        expect(screen.queryByText(/2025年6月30日版 対応/)).not.toBeInTheDocument();
    });

    it('Section 1 の配点が ~23% に修正されていること', () => {
        expect(screen.getByText('~23%')).toBeInTheDocument();
    });

    it('1.1 の全サブセクション見出しが存在すること', () => {
        expect(screen.getByText('リソース階層の構築')).toBeInTheDocument();
        expect(screen.getByText('組織ポリシーの適用')).toBeInTheDocument();
        expect(screen.getByText('IAMロールの付与')).toBeInTheDocument();
        expect(screen.getByText('APIの有効化')).toBeInTheDocument();
        expect(screen.getByText('クォータの評価と申請')).toBeInTheDocument();
        expect(screen.getByText('スタンドアロン組織の設定')).toBeInTheDocument();
        expect(screen.getByText('Workforce Identity Federationの設定')).toBeInTheDocument();
    });

    it('1.2 請求関連の見出しが存在すること', () => {
        expect(screen.getByText('請求アカウントの作成')).toBeInTheDocument();
        expect(screen.getByText('予算とアラートの設定')).toBeInTheDocument();
        expect(screen.getByText('請求エクスポートの設定')).toBeInTheDocument();
    });

    it('まとめセクション（頻出パターン・チェックリスト）が存在すること', () => {
        expect(screen.getByText('試験頻出パターンと対策')).toBeInTheDocument();
        expect(screen.getByText('Section 1 試験直前チェックリスト')).toBeInTheDocument();
    });

    it('チェックリスト項目が 20 件存在すること', () => {
        const boxes = container.querySelectorAll('.check-box');
        expect(boxes).toHaveLength(20);
    });

    it('サイドバーナビが存在しアンカーリンクを含むこと', () => {
        const nav = screen.getByRole('navigation', { name: /Section 1/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(16);
    });
});
