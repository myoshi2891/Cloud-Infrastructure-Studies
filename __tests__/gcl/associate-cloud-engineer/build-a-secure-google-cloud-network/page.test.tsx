import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '@/app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page';
import { DIAGRAMS } from '@/app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/constants';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ ariaLabel }: { ariaLabel?: string }) => (
        <div data-testid="mermaid-diagram" aria-label={ariaLabel} />
    ),
}));

describe('Build a Secure Google Cloud Network ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページがレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /Google Cloud/ })).toBeInTheDocument();
    });

    it('TOC がレンダリングされること', () => {
        const nav = screen.getByRole('navigation', { name: /セクションナビゲーション/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(10);
    });

    it('DIAGRAMS が11個のキーを持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(11);
    });

    it('ページが参照する全ての diagram id が DIAGRAMS に存在すること', () => {
        const REFERENCED_IDS = [
            'diag-flowchart-overview',
            'diag-reachability-internal',
            'diag-fw-network-tag',
            'diag-iam-network-roles',
            'diag-iap-seq-diagram',
            'diag-iap-flowchart',
            'diag-glb-flowchart',
            'diag-armor-blocking',
            'diag-ilb-flowchart',
            'diag-composite-exercise',
            'diag-securing-steps',
        ];
        for (const id of REFERENCED_IDS) {
            expect(DIAGRAMS).toHaveProperty(id);
            expect(DIAGRAMS[id as keyof typeof DIAGRAMS]).toBeTruthy();
        }
    });

    it('S1 用語解説: Defense in Depth, VPC, Cloud Armor が表示されること', () => {
        const s1 = document.getElementById('s1')!;
        expect(within(s1).getAllByText(/Defense in Depth/).length).toBeGreaterThan(0);
        expect(within(s1).getAllByText(/VPC/).length).toBeGreaterThan(0);
        expect(within(s1).getAllByText(/Cloud Armor/).length).toBeGreaterThan(0);
    });

    it('S2 用語解説: CIDR, VPC ピアリング, NIC が表示されること', () => {
        const s2 = document.getElementById('s2')!;
        expect(within(s2).getAllByText(/CIDR/).length).toBeGreaterThan(0);
        expect(within(s2).getAllByText(/VPC ピアリング/).length).toBeGreaterThan(0);
        expect(within(s2).getAllByText(/NIC/).length).toBeGreaterThan(0);
    });

    it('S3 用語解説: Ingress, ネットワークタグ が表示されること', () => {
        const s3 = document.getElementById('s3')!;
        expect(within(s3).getAllByText(/Ingress/).length).toBeGreaterThan(0);
        expect(within(s3).getAllByText(/ネットワークタグ/).length).toBeGreaterThan(0);
    });

    it('S4 用語解説: 最小権限, サービスアカウント, 職務分掌 が表示されること', () => {
        const s4 = document.getElementById('s4')!;
        expect(within(s4).getAllByText(/最小権限/).length).toBeGreaterThan(0);
        expect(within(s4).getAllByText(/サービスアカウント/).length).toBeGreaterThan(0);
        expect(within(s4).getAllByText(/職務分掌/).length).toBeGreaterThan(0);
    });

    it('S5 用語解説: ゼロトラスト, TCP フォワーディング が表示されること', () => {
        const s5 = document.getElementById('s5')!;
        expect(within(s5).getAllByText(/ゼロトラスト/).length).toBeGreaterThan(0);
        expect(within(s5).getAllByText(/TCP フォワーディング/).length).toBeGreaterThan(0);
    });

    it('S6 用語解説: PoP, MIG, DDoS, L7 が表示されること', () => {
        const s6 = document.getElementById('s6')!;
        expect(within(s6).getAllByText(/PoP/).length).toBeGreaterThan(0);
        expect(within(s6).getAllByText(/MIG/).length).toBeGreaterThan(0);
        expect(within(s6).getAllByText(/DDoS/).length).toBeGreaterThan(0);
        expect(within(s6).getAllByText(/L7/).length).toBeGreaterThan(0);
    });

    it('S7 用語解説: パススルー, リージョナル, マイクロサービス が表示されること', () => {
        const s7 = document.getElementById('s7')!;
        expect(within(s7).getAllByText(/パススルー/).length).toBeGreaterThan(0);
        expect(within(s7).getAllByText(/リージョナル/).length).toBeGreaterThan(0);
        expect(within(s7).getAllByText(/マイクロサービス/).length).toBeGreaterThan(0);
    });

    it('S8 用語解説: bastion, 攻撃面 が表示されること', () => {
        const s8 = document.getElementById('s8')!;
        expect(within(s8).getAllByText(/bastion/).length).toBeGreaterThan(0);
        expect(within(s8).getAllByText(/攻撃面/).length).toBeGreaterThan(0);
    });
});
