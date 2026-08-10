import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import CcnaAppDeploymentSecurityPage from '@/app/cisco/ccna/automation-application-deployment-security/page';

const guideSource = readFileSync(
    join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/CcnaAppDeploymentSecurityGuide.tsx'),
    'utf8',
);

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

        expect(screen.getByRole('columnheader', { name: '配点比率' })).toBeInTheDocument();
        expect(screen.getAllByText(/ハイブリッドクラウド/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/ベアメタル/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Arrange-Act-Assert/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/OWASP Top 10/i).length).toBeGreaterThan(0);
    });

    it('ドメイン4.0の4.1〜4.12サブトピック対応表を省略せず描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        for (let topic = 1; topic <= 12; topic += 1) {
            expect(screen.getAllByRole('cell', { name: `4.${topic}` }).length).toBeGreaterThan(0);
        }
        expect(screen.getByText('DevOpsプラクティスの原則を説明する')).toBeInTheDocument();
    });

    it('ガイド本体はServer Componentで、main直下に中央寄せ用ラッパーを持つ', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        expect(guideSource).not.toMatch(/^['"]use client['"];?/);
        expect(container.querySelector('.main > .content-inner')).toBeInTheDocument();
    });

    it('目次クリック時にURLフラグメントとアクティブ項目を更新する', () => {
        const originalScrollIntoView = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
        const originalHash = window.location.hash;
        const scrollIntoView = vi.fn();

        try {
            Element.prototype.scrollIntoView = scrollIntoView;
            const { container } = render(<CcnaAppDeploymentSecurityPage />);
            const link = container.querySelector<HTMLAnchorElement>('a[href="#chapter4"]');

            expect(link).not.toBeNull();
            fireEvent.click(link!);

            expect(window.location.hash).toBe('#chapter4');
            expect(link).toHaveClass('active');
            expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
        } finally {
            if (originalScrollIntoView) {
                Object.defineProperty(Element.prototype, 'scrollIntoView', originalScrollIntoView);
            } else {
                Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
            }
            window.location.hash = originalHash;
        }
    });

    it('Docker CMDの説明で「最後」を正しく表示する', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        expect(container).toHaveTextContent('1つのDockerfileにつき最後のCMDのみ有効');
        expect(screen.queryByText(/最期の/)).not.toBeInTheDocument();
    });

    it('renders external reference links', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        const ciscoLink = screen.getByRole('link', { name: /Cisco 200-901 CCNAAUTO Exam Topics/i });
        expect(ciscoLink).toHaveAttribute('href', 'https://learningnetwork.cisco.com/s/ccnaauto-exam-topics');

        const owaspLink = screen.getByRole('link', { name: /OWASP Top 10:2025.*A05:2025 Injection/i });
        expect(owaspLink).toHaveAttribute('href', 'https://owasp.org/Top10/2025/A05_2025-Injection/');
        expect(screen.getByText(/2025年版では、InjectionはA05:2025に分類される/)).toBeInTheDocument();
        expect(container.querySelector('[data-diagram-id="diag-8"] [data-chart]')).toHaveAttribute(
            'data-chart',
            expect.stringContaining('A05:2025 Injection'),
        );
    });
});
