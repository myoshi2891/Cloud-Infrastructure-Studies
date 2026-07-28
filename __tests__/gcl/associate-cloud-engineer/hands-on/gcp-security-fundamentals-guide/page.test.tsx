import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/associate-cloud-engineer/hands-on/gcp-security-fundamentals-guide/page';
import { DIAGRAMS } from '@/app/gcl/associate-cloud-engineer/hands-on/gcp-security-fundamentals-guide/constants';

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
        expect(screen.getByRole('heading', { name: /Chapter 1: IAM の基本と最小権限/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 2: カスタムロールの作成と管理/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 3: サービスアカウントのセキュアな運用/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 4: VPC Network Peering/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 5: Identity-Aware Proxy/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 6: Cloud KMS による鍵管理/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 7: Private GKE クラスタの構築/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Chapter 8: 統合演習/i })).toBeInTheDocument();
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
});
