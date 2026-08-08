import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaAppDeploymentSecurityPage from '@/app/cisco/ccna/automation-application-deployment-security/page';

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel, preserveNaturalScale }: { chart: string; ariaLabel?: string; preserveNaturalScale?: boolean }) => (
        <div
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-natural-scale={preserveNaturalScale}
            aria-label={ariaLabel}
        >
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaAppDeploymentSecurityPage', () => {
    it('renders main heading and hero eyebrow correctly', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /Application Deployment and Security/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText(/CCNA AUTOMATION · 200-901 CCNAAUTO/i)).toBeInTheDocument();
    });

    it('renders all 12 chapters and reference section headings', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const sectionTitles = [
            '出題範囲の全体像',
            'エッジコンピューティングとアプリケーション展開モデル',
            'アプリケーション実行環境の比較：VM・ベアメタル・コンテナ',
            'CI/CDパイプラインの基礎',
            'Pythonユニットテストの構築',
            'Dockerfileの読み方とDockerイメージの活用',
            'アプリケーションセキュリティの基礎：シークレット保護・暗号化・データ取り扱い',
            'ネットワーク境界のセキュリティ要素：ファイアウォール・DNS・ロードバランサー・リバースプロキシ',
            'OWASPトップの脅威',
            'Bashコマンドの活用',
            'DevOpsの原則',
            'まとめ：ドメイン4.0 早見表',
            '参考文献・出典',
        ];

        sectionTitles.forEach((title) => {
            expect(
                screen.getByRole('heading', { level: 2, name: new RegExp(title, 'i') }),
            ).toBeInTheDocument();
        });
    });

    it('renders subheadings correctly', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const subHeadings = [
            '4.1 エッジコンピューティングの利点',
            '4.2 アプリケーション展開モデルの比較',
            '3つの実行環境の構造比較',
            '属性比較表',
            'CI/CDパイプラインの主な構成要素',
            'パイプライン全体の流れ',
            'テストの基本的な流れ（Arrange-Act-Assertパターン）',
            '4.6 Dockerfileの内容を解釈する',
            '4.7 ローカル開発環境でのDockerイメージの利用',
            'シークレット保護',
            '暗号化（保存時・転送時）',
            'データ取り扱いの考え方',
            'リクエストが辿る経路',
            '代表的な脅威の説明',
            '最新の公式リストとの関係',
            'ファイル管理',
            'ディレクトリ操作',
            '環境変数',
        ];

        subHeadings.forEach((subTitle) => {
            expect(
                screen.getByRole('heading', { level: 3, name: new RegExp(subTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }),
            ).toBeInTheDocument();
        });
    });

    it('renders sidebar navigation links correctly', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        const tocNav = screen.getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(tocNav).toBeInTheDocument();

        const links = screen.getAllByRole('link', { name: /出題範囲の全体像|CI\/CDパイプラインの基礎|DevOpsの原則/i });
        expect(links.length).toBeGreaterThan(0);

        const aside = container.querySelector('aside');
        expect(aside).toHaveClass('sidebar');
    });

    it('renders all 10 mermaid diagrams with accessibility labels and natural scale enabled', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(10);
        diagrams.forEach((diagram) => {
            expect(diagram).toHaveAttribute('data-natural-scale', 'true');
            expect(diagram).toHaveAttribute('aria-label');
        });

        const diagramIds = [
            'diag-0', 'diag-1', 'diag-2', 'diag-3', 'diag-4',
            'diag-5', 'diag-6', 'diag-7', 'diag-8', 'diag-9'
        ];
        diagramIds.forEach((id) => {
            expect(container.querySelector(`[data-diagram-id="${id}"]`)).toBeInTheDocument();
        });
    });

    it('renders key tables and detailed content', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        expect(screen.getByText(/出題比率/i)).toBeInTheDocument();
        expect(screen.getByText(/ハイブリッドクラウド/i)).toBeInTheDocument();
        expect(screen.getByText(/ベアメタル/i)).toBeInTheDocument();
        expect(screen.getByText(/Arrange-Act-Assert/i)).toBeInTheDocument();
        expect(screen.getByText(/OWASP Top 10/i)).toBeInTheDocument();
    });

    it('renders external reference links', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const ciscoLink = screen.getByRole('link', { name: /Cisco 200-901 CCNAAUTO Exam Topics/i });
        expect(ciscoLink).toHaveAttribute('href', 'https://learningnetwork.cisco.com/s/ccnaauto-exam-topics');

        const owaspLink = screen.getByRole('link', { name: /OWASP Top 10:2021/i });
        expect(owaspLink).toHaveAttribute('href', 'https://owasp.org/Top10/');
    });
});
