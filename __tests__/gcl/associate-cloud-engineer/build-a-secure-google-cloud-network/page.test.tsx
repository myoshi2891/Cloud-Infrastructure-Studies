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
        expect(within(s1).getByText(/Defense in Depth/)).toBeInTheDocument();
        expect(within(s1).getByText(/VPC/)).toBeInTheDocument();
        expect(within(s1).getByText(/Cloud Armor/)).toBeInTheDocument();
    });

    it('S2 用語解説: CIDR, VPC ピアリング, NIC が表示されること', () => {
        const s2 = document.getElementById('s2')!;
        expect(within(s2).getByText(/CIDR/)).toBeInTheDocument();
        expect(within(s2).getByText(/VPC ピアリング/)).toBeInTheDocument();
        expect(within(s2).getByText(/NIC/)).toBeInTheDocument();
    });

    it('S3 用語解説: Ingress, ネットワークタグ が表示されること', () => {
        const s3 = document.getElementById('s3')!;
        expect(within(s3).getByText(/Ingress/)).toBeInTheDocument();
        expect(within(s3).getByText(/ネットワークタグ/)).toBeInTheDocument();
    });

    it('S4 用語解説: 最小権限, サービスアカウント, 職務分掌 が表示されること', () => {
        const s4 = document.getElementById('s4')!;
        expect(within(s4).getByText(/最小権限/)).toBeInTheDocument();
        expect(within(s4).getByText(/サービスアカウント/)).toBeInTheDocument();
        expect(within(s4).getByText(/職務分掌/)).toBeInTheDocument();
    });

    it('S5 用語解説: ゼロトラスト, TCP フォワーディング が表示されること', () => {
        const s5 = document.getElementById('s5')!;
        expect(within(s5).getByText(/ゼロトラスト/)).toBeInTheDocument();
        expect(within(s5).getByText(/TCP フォワーディング/)).toBeInTheDocument();
    });

    it('S6 用語解説: PoP, MIG, DDoS, L7 が表示されること', () => {
        const s6 = document.getElementById('s6')!;
        expect(within(s6).getByText(/PoP/)).toBeInTheDocument();
        expect(within(s6).getByText(/MIG/)).toBeInTheDocument();
        expect(within(s6).getByText(/DDoS/)).toBeInTheDocument();
        expect(within(s6).getByText(/L7/)).toBeInTheDocument();
    });

    it('S7 用語解説: パススルー, リージョナル, マイクロサービス が表示されること', () => {
        const s7 = document.getElementById('s7')!;
        expect(within(s7).getByText(/パススルー/)).toBeInTheDocument();
        expect(within(s7).getByText(/リージョナル/)).toBeInTheDocument();
        expect(within(s7).getByText(/マイクロサービス/)).toBeInTheDocument();
    });

    it('S8 用語解説: bastion, 攻撃面 が表示されること', () => {
        const s8 = document.getElementById('s8')!;
        expect(within(s8).getByText(/bastion/)).toBeInTheDocument();
        expect(within(s8).getByText(/攻撃面/)).toBeInTheDocument();
    });
});
