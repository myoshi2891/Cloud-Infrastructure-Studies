import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '@/app/gcl/hands-on/develop-your-gcp-network/page';
import { DIAGRAMS } from '@/app/gcl/hands-on/develop-your-gcp-network/constants';
import { vi } from 'vitest';

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, preserveNaturalScale }: { chart: string; preserveNaturalScale?: boolean }) {
        return <pre data-testid="mermaid" data-preserve-natural-scale={preserveNaturalScale ? 'true' : 'false'}>{chart}</pre>;
    },
}));

describe('Develop Your Google Cloud Network ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページがレンダリングされること', () => {
        expect(container).toBeTruthy();
        expect(container.querySelector('.shell')).toBeTruthy();
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getByText(/クラウドの足回りを/)).toBeInTheDocument();
    });

    it('Part 1 — SQL の基礎と BigQuery セクションが存在すること', () => {
        expect(screen.getByText(/Part 1 — SQL の基礎と BigQuery/)).toBeInTheDocument();
    });

    it('Part 2 — Cloud SQL へのデータ移行セクションが存在すること', () => {
        expect(screen.getByText(/Part 2 — Cloud SQL へのデータ移行/)).toBeInTheDocument();
    });

    it('Part 3 — VPC ネットワークの設計と構築セクションが存在すること', () => {
        expect(screen.getByText(/Part 3 — VPC ネットワークの設計と構築/)).toBeInTheDocument();
    });

    it('Part 4 — Cloud Monitoring による監視体制セクションが存在すること', () => {
        expect(screen.getByText(/Part 4 — Cloud Monitoring による監視体制/)).toBeInTheDocument();
    });

    it('Part 5 — Kubernetes デプロイメント戦略セクションが存在すること', () => {
        expect(screen.getByText(/Part 5 — Kubernetes デプロイメント戦略/)).toBeInTheDocument();
    });

    it('Part 6 — 総合チャレンジラボ攻略セクションが存在すること', () => {
        expect(screen.getByText(/Part 6 — 総合チャレンジラボ攻略/)).toBeInTheDocument();
    });

    it('ベストプラクティス総まとめセクションが存在すること', () => {
        expect(screen.getByText(/ベストプラクティス総まとめ/)).toBeInTheDocument();
    });

    it('参考リソース / 出典セクションが存在すること', () => {
        expect(screen.getByRole('heading', { name: /参考リソース/ })).toBeInTheDocument();
    });

    it('サイドレールナビゲーションが存在し hop リンクを8本以上含むこと', () => {
        const nav = screen.getByRole('navigation', { name: /セクションナビゲーション/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(8);
    });

    it('チェックリストアイテムが10個以上存在すること', () => {
        // checklist items are rendered as buttons or checkboxes
        const checkboxes = container.querySelectorAll('.checklist input[type="checkbox"], .check-item');
        expect(checkboxes.length).toBeGreaterThanOrEqual(10);
    });

    it('DIAGRAMS が10個以上のキーを持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBeGreaterThanOrEqual(10);
    });

    it('ページが参照する全ての diagram id が DIAGRAMS に存在すること', () => {
        // Diagram コンポーネントは未知の id に対し silently null を返すため、
        // キー総数の検査だけでは図の欠落を検出できない。
        // ページの JSX が <Diagram id="..."> で参照する id を網羅的に検証する。
        const REFERENCED_IDS = [
            'diag-query-builder',
            'diag-console-handson',
            'diag-data-migration',
            'diag-multi-vpc',
            'diag-reachability',
            'diag-multi-nic',
            'diag-observability',
            'diag-alerting-policy',
            'diag-gke-cluster',
            'diag-rolling-update',
            'diag-canary',
            'diag-blue-green',
            'diag-strategy-picker',
            'diag-griffin-wordpress',
        ];
        for (const id of REFERENCED_IDS) {
            expect(DIAGRAMS).toHaveProperty(id);
            expect(DIAGRAMS[id as keyof typeof DIAGRAMS]).toBeTruthy();
        }
    });

    it('すべての MermaidDiagram に preserveNaturalScale が設定されていること', () => {
        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids.length).toBe(14);
        for (const el of mermaids) {
            expect(el.getAttribute('data-preserve-natural-scale')).toBe('true');
        }
    });
});
