// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/hands-on/gke-private-cluster-security-guide/page';
import { DIAGRAMS } from '@/app/gcl/hands-on/gke-private-cluster-security-guide/constants';

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({
        chart,
        ariaLabel,
        preserveNaturalScale,
    }: {
        chart: string;
        ariaLabel?: string;
        preserveNaturalScale?: boolean;
    }) {
        return (
            <pre
                data-testid="mermaid"
                aria-label={ariaLabel}
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

    it('すべての MermaidDiagram に chart、preserveNaturalScale、ariaLabel が設定されていること', () => {
        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids.length).toBe(4);
        for (const [index, mermaid] of mermaids.entries()) {
            expect(mermaid.textContent).toBe(Object.values(DIAGRAMS)[index]);
            expect(mermaid.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(mermaid.getAttribute('aria-label')).toBeTruthy();
        }
    });

    it('全幅メインコンテナおよび 1rem 倍率用図解ラッパーが正しく配置されていること', () => {
        const main = container.querySelector('.main');
        expect(main).toBeTruthy();
        const diagramWraps = container.querySelectorAll('.mermaid-wrap');
        expect(diagramWraps.length).toBe(4);
    });

    it('コードブロックに構文ハイライト用の要素（code-cmd, code-param 等）が含まれること', () => {
        const codeCmds = container.querySelectorAll('.code-cmd');
        expect(codeCmds.length).toBeGreaterThan(0);
        const codeParams = container.querySelectorAll('.code-param');
        expect(codeParams.length).toBeGreaterThan(0);
    });
});
