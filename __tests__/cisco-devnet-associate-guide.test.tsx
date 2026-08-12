import { render, screen } from '@testing-library/react';
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
        const expectedH2List = [
            '1.【重要】名称変更に関するお知らせ（2026年2月〜）',
            '2.DevNet Associateとは何か',
            '3.Cisco資格体系における位置づけ',
            '4.試験の基本情報',
            '5.出題範囲と配分',
            '6.各ドメインを初心者向けに解説',
            '7.受験の前提条件・推奨スキル',
            '8.出題形式',
            '9.学習ロードマップ（ステップバイステップ）',
            '10.再認定（recertification）',
            '11.まとめ',
            '12.参考文献・ソース一覧',
        ];

        expectedH2List.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
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

    it('11個のテーブル内の全データセル文言が網羅されていること', () => {
        render(<DevNetAssociateGuide />);

        // 名称変更表 (s1)
        expect(screen.getByText('Associateレベル認定')).toBeInTheDocument();
        expect(screen.getByText('200-901 CCNAAUTO')).toBeInTheDocument();
        expect(screen.getByText('350-901 AUTOCOR')).toBeInTheDocument();

        // 基本情報表 (s4)
        expect(screen.getByText('Automating Networks Using Cisco Platforms')).toBeInTheDocument();
        expect(screen.getByText('300 USD（税別・目安。国や為替により変動するためPearson VUE公式ページで要確認）')).toBeInTheDocument();

        // 出題配分表 (s5)
        expect(screen.getByText('ソフトウェア開発と設計')).toBeInTheDocument();
        expect(screen.getByText('インフラストラクチャと自動化')).toBeInTheDocument();

        // 各ドメイン詳細表 (s6.1 - s6.6)
        expect(screen.getByText('データ形式（XML、JSON、YAML）')).toBeInTheDocument();
        expect(screen.getByText('requestsライブラリ')).toBeInTheDocument();
        expect(screen.getByText('YANG、RESTCONF、NETCONF')).toBeInTheDocument();
        expect(screen.getByText('OWASP脅威')).toBeInTheDocument();
        expect(screen.getByText('Infrastructure as Code（IaC）')).toBeInTheDocument();
        expect(screen.getByText('管理・データ・制御プレーン')).toBeInTheDocument();

        // 出題形式表 (s8)
        expect(screen.getByText('選択問題（単一回答）')).toBeInTheDocument();
        expect(screen.getByText('穴埋め（Fill in the blank）')).toBeInTheDocument();

        // 再認定表 (s10)
        expect(screen.getByText('同じ試験（200-901）に再合格する／より上位の認定を取得する／継続教育（CE）クレジットを積む')).toBeInTheDocument();
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
