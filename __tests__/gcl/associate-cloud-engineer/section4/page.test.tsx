import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Section4Page from '@/app/gcl/associate-cloud-engineer/section4/page';

describe('ACE Section 4 完全ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Section4Page />));
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getAllByText(/Configuring/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Access and Security/).length).toBeGreaterThanOrEqual(1);
    });

    it('試験ガイドの年表記が 2025 に対応していること', () => {
        // 元HTMLは「2025年6月版」もしくは「2025年6月改訂版」
        expect(screen.getByText(/2025年6月/)).toBeInTheDocument();
    });

    it('Section 4 の配点が ~20% であること', () => {
        expect(screen.getAllByText(/~20%/).length).toBeGreaterThanOrEqual(1);
    });

    it('セキュリティ設計原則の見出しが存在すること', () => {
        expect(screen.getByText(/セキュリティ設計の基本原則/)).toBeInTheDocument();
    });

    it('4.1 IAMの管理の見出しが存在すること', () => {
        expect(screen.getByText(/IAMの管理/)).toBeInTheDocument();
    });

    it('4.2 サービスアカウントの管理の見出しが存在すること', () => {
        expect(screen.getByText(/サービスアカウントの管理/)).toBeInTheDocument();
    });

    it('頻出パターン別 解法ガイドの見出しが存在すること', () => {
        expect(screen.getByText(/頻出パターン別 解法ガイド/)).toBeInTheDocument();
    });

    it('引っかけ対策の見出しが存在すること', () => {
        expect(screen.getByText(/引っかけ問題パターン 完全攻略/)).toBeInTheDocument();
    });

    it('まとめセクション（チェックリスト）が存在すること', () => {
        expect(screen.getByRole('heading', { name: 'Section 4 直前チェックリスト' })).toBeInTheDocument();
    });

    it('チェックリスト項目が 24 件存在すること', () => {
        const boxes = container.querySelectorAll('.check-box');
        expect(boxes).toHaveLength(24);
    });

    it('サイドバーナビが存在しアンカーリンクを含むこと', () => {
        const nav = screen.getByRole('navigation', { name: /Section 4/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(15);
    });
});
