import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '@/app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page';

describe('Cloud Load Balancing 完全入門 ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getAllByText(/Cloud Load Balancing/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/壊れないサービス/).length).toBeGreaterThanOrEqual(1);
    });

    it('このガイドの全体像セクションが存在すること', () => {
        expect(screen.getByText(/このガイドの全体像/)).toBeInTheDocument();
    });

    it('外部パススルー ネットワークLB L4セクションが存在すること', () => {
        expect(screen.getByText(/外部パススルー ネットワークLB/)).toBeInTheDocument();
    });

    it('外部アプリケーション ロードバランサ L7セクションが存在すること', () => {
        expect(screen.getByText(/外部アプリケーション ロードバランサ/)).toBeInTheDocument();
    });

    it('内部パススルー ネットワークLB 内部 L4セクションが存在すること', () => {
        expect(screen.getAllByText(/内部パススルー ネットワークLB/).length).toBeGreaterThanOrEqual(1);
    });

    it('チャレンジラボの攻略方針セクションが存在すること', () => {
        expect(screen.getByText(/総合演習 — チャレンジラボの攻略方針/)).toBeInTheDocument();
    });

    it('ロードバランサ選定の早見チャートセクションが存在すること', () => {
        expect(screen.getByText(/ロードバランサ選定の早見チャート/)).toBeInTheDocument();
    });

    it('サイドバーナビが存在しアンカーリンクを含むこと', () => {
        const nav = screen.getByRole('navigation', { name: /^ガイドナビゲーション$/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(5);
    });
});
