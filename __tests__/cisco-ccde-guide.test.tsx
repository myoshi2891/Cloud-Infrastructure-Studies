// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcdeGuidePage, { metadata } from '@/app/cisco/ccde/complete-guide/page';
import CcdeGuide from '@/app/cisco/ccde/complete-guide/CcdeGuide';

// MermaidDiagram のモック
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({
        chart,
        ariaLabel,
    }: {
        chart: string;
        ariaLabel?: string;
    }) {
        return (
            <pre data-testid="mermaid" aria-label={ariaLabel}>
                {chart}
            </pre>
        );
    },
}));

describe('Cisco CCDE Complete Guide Page', () => {
    it('Server Component (page.tsx) が正しくレンダーされメタデータ構造を持つこと', async () => {
        expect(metadata.title).toBe('CCDE認定 完全ガイド ― 初学者のためのステップバイステップ解説 | Cisco');
        expect(metadata.description).toContain('Cisco CCDE（Cisco Certified Design Expert）認定試験の完全解説ガイド');

        const pageElement = await CcdeGuidePage();
        render(pageElement);
        expect(screen.getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
    });

    it('タイトルブロック・製図メタデータが正しく描画されること', () => {
        render(<CcdeGuide />);
        expect(
            screen.getByText('Cisco Certification Blueprint / 認定資格 解説図面')
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /CCDE（Cisco Certified Design Expert）認定 完全ガイド/i,
            })
        ).toBeInTheDocument();
        expect(screen.getByText(/400-007（筆記）\+ 実技試験/)).toBeInTheDocument();
        expect(screen.getByText('CCDE v3.1')).toBeInTheDocument();
        expect(screen.getByText('Expert（最上位）')).toBeInTheDocument();
    });

    it('ヒーローセクションと目次ナビゲーションが描画されること', () => {
        render(<CcdeGuide />);
        expect(screen.getByText('青写真')).toBeInTheDocument();
        expect(screen.getByText('目次 / Index')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: '1. CCDEとは何か' })).toHaveAttribute(
            'href',
            '#what-is-ccde'
        );
        expect(screen.getByRole('link', { name: '12. 参考情報源' })).toHaveAttribute(
            'href',
            '#sources'
        );
    });

    it('すべての主要セクションの見出し (h2, h3) が含まれること', () => {
        render(<CcdeGuide />);
        const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
        expect(headings).toContain('CCDEとは何か');
        expect(headings).toContain('認定までの全体フロー');
        expect(headings).toContain('受験資格・推奨される経験');
        expect(headings).toContain('筆記試験（400-007 CCDE v3.1）');
        expect(headings).toContain('実技試験（CCDE v3.1 Practical）');
        expect(headings).toContain('合格後に得られる認定');
        expect(headings).toContain('費用まとめ');
        expect(headings).toContain('再認定（有効期間は3年）');
        expect(headings).toContain('初学者向け学習ロードマップ（提案）');
        expect(headings).toContain('初学者のための用語辞典');
        expect(headings).toContain('よくある質問');
        expect(headings).toContain('参考情報源');

        const h3Headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
        expect(h3Headings).toContain('CCIEとの違い（ざっくりしたイメージ）');
        expect(h3Headings).toContain('出題範囲（5つのドメイン）');
        expect(h3Headings).toContain('4つのエレクティブ（専門領域）');
    });

    it('表形式データのデータセル・見出しが完全に含まれること', () => {
        render(<CcdeGuide />);
        // 筆記試験の出題ドメイン
        expect(screen.getByText('ビジネス戦略設計')).toBeInTheDocument();
        expect(screen.getByText('制御・データ・管理プレーンと運用設計')).toBeInTheDocument();
        expect(screen.getByText('ネットワーク設計')).toBeInTheDocument();
        expect(screen.getByText('サービス設計')).toBeInTheDocument();
        expect(screen.getByText('セキュリティ設計')).toBeInTheDocument();

        // エレクティブ
        expect(screen.getByText('AI Infrastructure')).toBeInTheDocument();
        expect(screen.getByText('Large Scale Networks')).toBeInTheDocument();
        expect(screen.getByText('On-Prem and Cloud Services')).toBeInTheDocument();
        expect(screen.getByText('Workforce Mobility')).toBeInTheDocument();

        // 費用
        expect(screen.getByText('US$450')).toBeInTheDocument();
        expect(screen.getByText('US$1,600')).toBeInTheDocument();
        expect(screen.getByText('約 US$2,050')).toBeInTheDocument();

        // コールアウト・FAQ
        expect(screen.getAllByText(/前提資格がない＝簡単/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/18か月以内に実技試験/i).length).toBeGreaterThan(0);
    });

    it('5つの Mermaid ダイアグラムが存在すること', () => {
        render(<CcdeGuide />);
        const mermaidElements = screen.getAllByTestId('mermaid');
        expect(mermaidElements.length).toBe(5);
    });

    it('用語辞典（Glossary）の各用語が描画されていること', () => {
        render(<CcdeGuide />);
        expect(screen.getByText('HLD（High-Level Design）')).toBeInTheDocument();
        expect(screen.getByText('ROI / CAPEX・OPEX')).toBeInTheDocument();
        expect(screen.getByText('SD-WAN')).toBeInTheDocument();
        expect(screen.getByText('オーケストレーション／自動化')).toBeInTheDocument();
        expect(screen.getByText('可観測性（Observability）')).toBeInTheDocument();
        expect(screen.getByText('CIA triad')).toBeInTheDocument();
        expect(screen.getByText('SaaS / PaaS / IaaS')).toBeInTheDocument();
        expect(screen.getByText('Cisco Learning Credits')).toBeInTheDocument();
    });

    it('9件の参考情報源リンクが正しく出力されていること', () => {
        render(<CcdeGuide />);
        const sourcesSection = screen.getByTestId('sources-section');
        const links = sourcesSection.querySelectorAll('a');
        expect(links.length).toBe(9);
        expect(links[0].href).toContain('cisco.com');
    });

    it('製図フッター情報が描画されていること', () => {
        render(<CcdeGuide />);
        expect(screen.getByText('DRAWING: CCDE-GUIDE-001')).toBeInTheDocument();
        expect(screen.getByText('REV: v3.1')).toBeInTheDocument();
        expect(screen.getByText('SHEET: 1 / 1')).toBeInTheDocument();
    });
});
