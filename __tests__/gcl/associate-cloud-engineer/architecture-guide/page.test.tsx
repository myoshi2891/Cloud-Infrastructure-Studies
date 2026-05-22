import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArchitectureGuidePage from '@/app/gcl/associate-cloud-engineer/architecture-guide/page';

describe('ACE Architecture Guide ページ', () => {
    beforeEach(() => {
        render(<ArchitectureGuidePage />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(
            screen.getAllByText(/試験の全体像と学習ロードマップ/).length
        ).toBeGreaterThanOrEqual(1);
    });

    /* ─── E.1 Tables ─── */

    it('出題ドメインと配点比率が <table> として描画されること', () => {
        const table = screen.getByRole('table', { name: /出題ドメインと配点比率/ });
        expect(table).toBeInTheDocument();
    });

    it('請求先アカウントの構造が <table> として描画されること', () => {
        const table = screen.getByRole('table', { name: /請求先アカウントの構造/ });
        expect(table).toBeInTheDocument();
    });

    it('コンピューティングサービスの制御レベル比較が <table> として描画されること', () => {
        const table = screen.getByRole('table', { name: /コンピューティングサービスの制御レベル比較/ });
        expect(table).toBeInTheDocument();
    });

    it('OS Login vs 静的 SSH キーの比較が <table> として描画されること', () => {
        const table = screen.getByRole('table', { name: /OS Login vs 静的 SSH キー/ });
        expect(table).toBeInTheDocument();
    });

    /* ─── E.1 Mermaid flows ─── */

    it('学習ロードマップが Mermaid wrapper として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /学習ロードマップ/ });
        expect(diagram).toBeInTheDocument();
        expect(diagram).toHaveAttribute('aria-roledescription', 'diagram');
    });

    it('予算アラートから自動停止フローが Mermaid wrapper として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /予算アラートから自動停止/ });
        expect(diagram).toBeInTheDocument();
    });

    it('Spot VM プリエンプションフローが Mermaid wrapper として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /Spot VM プリエンプション/ });
        expect(diagram).toBeInTheDocument();
    });

    it('Cloud Run の概要フローが Mermaid wrapper として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /Cloud Run の概要フロー/ });
        expect(diagram).toBeInTheDocument();
    });

    it('Binary Authorization フローが Mermaid wrapper として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /Binary Authorization フロー/ });
        expect(diagram).toBeInTheDocument();
    });

    /* ─── E.2 SVG ─── */

    it('リソース階層図が SVG として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /Google Cloud のリソース階層/ });
        expect(diagram).toBeInTheDocument();
    });

    it('IAM ポリシー継承カスケード図が SVG として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /IAM ポリシーの継承カスケード/ });
        expect(diagram).toBeInTheDocument();
    });

    it('Cloud Run → VPC のネットワークトポロジが SVG として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /Cloud Run から VPC リソースへの接続/ });
        expect(diagram).toBeInTheDocument();
    });

    it('Workload Identity アンチパターン vs 推奨が SVG として描画されること', () => {
        const diagram = screen.getByRole('img', { name: /Workload Identity アンチパターン/ });
        expect(diagram).toBeInTheDocument();
    });

    /* ─── E.1 cleanup ─── */

    it('GKE Autopilot vs Standard の ASCII ボックスが削除されていること（既存の比較テーブルのみ残る）', () => {
        // 既存の比較 <table> は残ること
        const tables = screen.getAllByRole('table');
        const gkeTable = tables.find((t) =>
            /Autopilot/.test(t.textContent ?? '') && /Standard/.test(t.textContent ?? '')
        );
        expect(gkeTable).toBeDefined();
        // ASCII ボックス内に出てくる固有テキストが <pre> 内には存在しないこと
        const preBlocks = document.querySelectorAll('pre.codeblock');
        const hasAsciiBox = Array.from(preBlocks).some((pre) =>
            /Autopilot モード[\s\S]*Google がすべて管理/.test(pre.textContent ?? '')
        );
        expect(hasAsciiBox).toBe(false);
    });

    it('Storage Classes の比較表が <table> として描画されること', () => {
        const table = screen.getByRole('table', { name: /Cloud Storage クラスのアクセス頻度別比較/ });
        expect(table).toBeInTheDocument();
    });
});
