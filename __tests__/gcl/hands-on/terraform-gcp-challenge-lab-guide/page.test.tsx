// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/hands-on/terraform-gcp-challenge-lab-guide/page';
import { DIAGRAMS } from '@/app/gcl/hands-on/terraform-gcp-challenge-lab-guide/constants';

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({
        chart,
        preserveNaturalScale,
    }: {
        chart: string;
        preserveNaturalScale?: boolean;
    }) {
        return (
            <pre
                data-testid="mermaid"
                data-preserve-natural-scale={preserveNaturalScale ? 'true' : 'false'}
            >
                {chart}
            </pre>
        );
    },
}));

describe('Terraform GCP Challenge Lab 完全攻略ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページが正常にレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('メインタイトルがレンダリングされること', () => {
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Terraform で構築する Google Cloud インフラ管理/i,
            }),
        ).toBeInTheDocument();
    });

    it('主要なセクションの見出しがすべてレンダリングされること', () => {
        expect(
            screen.getByRole('heading', {
                name: /1\. このラボで達成すること/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /2\. 事前準備 & バックエンド初期化/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /3\. Task 1: インフラ構成要素のモジュール化/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /4\. Task 2: リソースのインポートと構成/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /5\. Task 3: リモートバックエンド（Cloud Storage）への切り替え/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /6\. Task 4: モジュールの修正とインフラ更新/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /7\. トラブルシューティング & 実践的ノウハウ/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /8\. まとめ/i,
            }),
        ).toBeInTheDocument();
    });

    it('DIAGRAMS が8個の定義を持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(8);
    });

    it('すべての MermaidDiagram に preserveNaturalScale が設定されていること', () => {
        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids.length).toBeGreaterThan(0);
        mermaids.forEach((mermaid) => {
            expect(mermaid.getAttribute('data-preserve-natural-scale')).toBe('true');
        });
    });
});
