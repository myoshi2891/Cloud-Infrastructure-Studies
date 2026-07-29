// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/hands-on/gcp-security-fundamentals-guide/page';
import { DIAGRAMS } from '@/app/gcl/hands-on/gcp-security-fundamentals-guide/constants';

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, preserveNaturalScale }: { chart: string; preserveNaturalScale?: boolean }) {
        return <pre data-testid="mermaid" data-preserve-natural-scale={preserveNaturalScale ? 'true' : 'false'}>{chart}</pre>;
    },
}));

describe('Google Cloud セキュリティ基礎 完全ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページが正常にレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('メインタイトルがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /Google Cloud セキュリティ基礎/i })).toBeInTheDocument();
    });

    it('章の見出しがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /0. この教材の全体像/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /IAM基礎 — 誰が・何に・何をできるか/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /IAMカスタムロール — 権限を自分でデザインする/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /サービスアカウント — 人間ではないIDの管理/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /VPC Network Peering — プロジェクトをまたぐ内部通信/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Identity-Aware Proxy \(IAP\) — アプリ層のゼロトラスト/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Cloud KMS — 鍵管理と暗号化/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Private GKE クラスタ — Kubernetesのネットワーク隔離/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /総合演習 — 全レイヤーを統合したセキュアなクラスタ設計/i })).toBeInTheDocument();
    });

    it('DIAGRAMS が16個の定義を持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(16);
    });

    it('すべての MermaidDiagram に preserveNaturalScale が設定されていること', () => {
        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids.length).toBe(16);
        for (const el of mermaids) {
            expect(el.getAttribute('data-preserve-natural-scale')).toBe('true');
        }
    });

    it('全幅メインコンテナおよび 1rem 倍率用図解ラッパーが正しく配置されていること', () => {
        const wrap = container.querySelector('.wrap');
        expect(wrap).toBeTruthy();
        const diagramWraps = container.querySelectorAll('.diagram-wrap');
        expect(diagramWraps.length).toBe(16);
    });
});
