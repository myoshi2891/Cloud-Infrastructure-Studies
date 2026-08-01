// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/hands-on/gke-private-cluster-security-guide/page';
import { DIAGRAMS } from '@/app/gcl/hands-on/gke-private-cluster-security-guide/constants';

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

describe('GKE プライベートクラスタ セキュリティ実装ガイド ページ', () => {
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
                name: /GKE プライベートクラスタ セキュリティ実装ガイド/i,
            }),
        ).toBeInTheDocument();
    });

    it('主要なセクションの見出しがすべてレンダリングされること', () => {
        expect(
            screen.getByRole('heading', {
                name: /1\. このラボで何をするのか（全体像）/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /2\. Task 1: カスタムセキュリティロールの作成/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /3\. Task 2: サービスアカウントの作成/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /4\. Task 3: ロールのバインド/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /5\. Task 4: プライベートクラスタの作成と設定/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /6\. Task 5: アプリケーションのデプロイと動作検証/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /7\. よくあるつまずきポイント/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /8\. まとめ/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /参考文献（根拠ソース）/i,
            }),
        ).toBeInTheDocument();
    });

    it('DIAGRAMS が4個の定義を持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(4);
    });

    it('すべての MermaidDiagram に preserveNaturalScale が設定されていること', () => {
        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids.length).toBe(4);
        for (const el of mermaids) {
            expect(el.getAttribute('data-preserve-natural-scale')).toBe('true');
        }
    });

    it('Mermaid 図のラッパーコンテナが正しく配置されていること', () => {
        const diagramWraps = container.querySelectorAll('.mermaid-block');
        expect(diagramWraps.length).toBe(4);
    });
});
