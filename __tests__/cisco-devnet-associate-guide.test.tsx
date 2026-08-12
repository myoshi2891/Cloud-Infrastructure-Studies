import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import DevNetAssociateGuide from '../app/cisco/devnet-associate/DevNetAssociateGuide';
import { DIAGRAMS } from '../app/cisco/devnet-associate/constants';

// MermaidDiagramのモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel: string }) {
        return (
            <div data-testid="mermaid" aria-label={ariaLabel}>
                {chart}
            </div>
        );
    },
}));

describe('Cisco DevNet Associate Guide Migration Verification', () => {
    it('12個の主要セクションと見出しがすべて正しく描画されていること', () => {
        render(<DevNetAssociateGuide />);

        // タイトルとリード文
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cisco Certified DevNet Associate 試験 完全ガイド');
        expect(screen.getByText(/初学者向けにステップバイステップで解説します/)).toBeInTheDocument();

        // 12個のセクション見出し (h2)
        const expectedH2Patterns = [
            /1\.\s*【重要】名称変更に関するお知らせ/,
            /2\.\s*DevNet Associateとは何か/,
            /3\.\s*Cisco資格体系における位置づけ/,
            /4\.\s*試験の基本情報/,
            /5\.\s*出題範囲と配分/,
            /6\.\s*各ドメインを初心者向けに解説/,
            /7\.\s*受験の前提条件・推奨スキル/,
            /8\.\s*出題形式/,
            /9\.\s*学習ロードマップ/,
            /10\.\s*再認定/,
            /11\.\s*まとめ/,
            /12\.\s*参考文献・ソース一覧/,
        ];

        expectedH2Patterns.forEach((pattern) => {
            expect(screen.getByRole('heading', { level: 2, name: pattern })).toBeInTheDocument();
        });

        // 6.1〜6.6 の h3 見出し
        expect(screen.getByText('6.1 ソフトウェア開発と設計（15%）')).toBeInTheDocument();
        expect(screen.getByText('6.2 APIの理解と使用（20%・最重要領域の1つ）')).toBeInTheDocument();
        expect(screen.getByText('6.3 シスコプラットフォームと開発（15%）')).toBeInTheDocument();
        expect(screen.getByText('6.4 アプリケーションの展開とセキュリティ（15%）')).toBeInTheDocument();
        expect(screen.getByText('6.5 インフラストラクチャと自動化（20%・最重要領域の1つ）')).toBeInTheDocument();
        expect(screen.getByText('6.6 ネットワーク基礎（15%）')).toBeInTheDocument();
    });

    it('バッジ、コールアウト、詳細注釈が完全な文言で存在すること', () => {
        render(<DevNetAssociateGuide />);

        // バッジ
        expect(screen.getByText('試験コード: 200-901')).toBeInTheDocument();
        expect(screen.getByText('試験時間: 120分')).toBeInTheDocument();
        expect(screen.getByText('認定有効期間: 3年')).toBeInTheDocument();

        // コールアウト文言
        expect(screen.getByText(/このガイドを書いている2026年7月時点で/)).toBeInTheDocument();
        expect(screen.getByText(/合格に必要なスコア（カットスコア）は/)).toBeInTheDocument();
        expect(screen.getByText(/上表の「Cisco Catalyst Center」/)).toBeInTheDocument();
    });

    it('11個のテーブルの全ヘッダー、全データセル、列構造が移行元と一致すること', () => {
        const { container } = render(<DevNetAssociateGuide />);
        const source = readFileSync(
            'archive/Cisco/html/devnet/Cisco-devnet-associate-guide.html',
            'utf8'
        );
        const sourceDocument = new DOMParser().parseFromString(source, 'text/html');
        const normalize = (value: string | null) => value?.replace(/\s+/g, ' ').trim() ?? '';
        const tableSnapshot = (table: Element) => ({
            headers: Array.from(table.querySelectorAll('thead th'), (cell) => normalize(cell.textContent)),
            rows: Array.from(table.querySelectorAll('tbody tr'), (row) =>
                Array.from(row.querySelectorAll('td'), (cell) => normalize(cell.textContent))
            ),
        });
        const expectedTables = Array.from(sourceDocument.querySelectorAll('main table'), tableSnapshot);
        const renderedTables = Array.from(container.querySelectorAll('main table'), tableSnapshot);

        expect(expectedTables).toHaveLength(11);
        expect(renderedTables).toEqual(expectedTables);
    });

    it('4つのMermaid図解のアクセシビリティラベルとDSLが正しく定義されていること', () => {
        render(<DevNetAssociateGuide />);

        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids).toHaveLength(4);

        expect(mermaids[0]).toHaveAttribute('aria-label', 'Cisco資格体系における位置づけを示す図');
        expect(mermaids[1]).toHaveAttribute('aria-label', '200-901 CCNAAUTO 出題範囲の比率を示す円グラフ');
        expect(mermaids[2]).toHaveAttribute('aria-label', 'REST API通信フローを示すシーケンス図');
        expect(mermaids[3]).toHaveAttribute('aria-label', '学習ロードマップのステップを示すフローチャート');

        // DIAGRAMS 定数の検証
        expect(DIAGRAMS['diag-s3']).toContain('flowchart TB');
        expect(DIAGRAMS['diag-s5']).toContain('pie title 200-901 CCNAAUTO 出題範囲の比率');
        expect(DIAGRAMS['diag-s6-2']).toContain('sequenceDiagram');
        expect(DIAGRAMS['diag-s9']).toContain('flowchart TB');
    });

    it('表ヘッダーと現在位置の目次リンクにアクセシビリティ属性があること', () => {
        const { container } = render(<DevNetAssociateGuide />);

        expect(container.querySelectorAll('th:not([scope="col"])')).toHaveLength(0);
        expect(container.querySelectorAll('a[aria-current="location"]')).toHaveLength(1);
    });

    it('13個の参考文献・一次情報源URLがすべて正しいhrefと属性でレンダリングされていること', () => {
        render(<DevNetAssociateGuide />);

        const links = [
            'https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/devnet/cisco-certified-devnet-associate.html',
            'https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/devasc-200-901.html',
            'https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-901-DEVASC.pdf',
            'https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/devnet.html',
            'https://blogs.cisco.com/learning/par-merat-announces-learn-with-cisco',
            'https://blogs.cisco.com/learning/views-from-an-insider-on-the-ccnp-automation-track-autocor-edition',
            'https://blogs.cisco.com/learning/introducing-ccna-automation-prep-a-live-interactive-series-for-the-automation-community',
            'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html',
            'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html',
            'https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccnaauto.html',
            'https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf',
            'https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html',
            'https://govstore.pearsonvue.com/p/vchstr-200-901',
        ];

        links.forEach((url) => {
            const linkEl = screen.getByRole('link', { name: url });
            expect(linkEl).toHaveAttribute('href', url);
            expect(linkEl).toHaveAttribute('target', '_blank');
            expect(linkEl).toHaveAttribute('rel', 'noopener');
        });
    });
});
