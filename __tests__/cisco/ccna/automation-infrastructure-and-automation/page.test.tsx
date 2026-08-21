// @vitest-environment jsdom
import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '../../../../app/cisco/ccna/automation-infrastructure-and-automation/page';
import CcnaInfraAutomationGuide from '../../../../app/cisco/ccna/automation-infrastructure-and-automation/CcnaInfraAutomationGuide';
import { DIAGRAMS } from '../../../../app/cisco/ccna/automation-infrastructure-and-automation/constants';
import NavBar from '../../../../app/cisco/ccna/automation-infrastructure-and-automation/NavBar';
import fidelity from '@/docs/migration-inventory/ccna-automation-infrastructure-and-automation.fidelity.json';
import {
    expectCodeFidelity,
    expectContentCssCoverage,
    expectElementPlacementFidelity,
    expectSupplementalFidelity,
    expectSyntaxHighlightFidelity,
    expectTableFidelity,
} from '../archive-fidelity';

/** Renders Mermaid source as an inspectable test element. */
vi.mock('@/components/MermaidDiagram', () => ({
    /** Exposes chart and accessible-label props without invoking Mermaid. */
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" data-chart={chart} aria-label={ariaLabel}>
            {ariaLabel}
        </div>
    ),
}));

describe('CCNA Automation Infrastructure and Automation Page', () => {
    it('associates the menu toggle with its labelled sidebar navigation', () => {
        render(<NavBar />);
        const toggle = screen.getByRole('button', { name: '目次を開く' });
        const navigation = screen.getByRole('navigation', {
            name: 'Infrastructure and Automation 目次',
        });

        expect(navigation).toHaveAttribute('id', 'infrastructure-automation-sidebar');
        expect(toggle).toHaveAttribute('aria-controls', navigation.id);
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        expect(navigation.querySelector('a.active')).toHaveAttribute('aria-current', 'location');
        expect(navigation.querySelectorAll('a[aria-current="location"]')).toHaveLength(1);
    });

    it('renders metadata and page header in Server Component', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('renders hero title and meta chips in guide component', () => {
        render(<CcnaInfraAutomationGuide />);
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Infrastructure and Automation/i,
            }),
        ).toBeInTheDocument();
        expect(screen.getByText('CCNAAUTO 200-901 · Domain 5.0')).toBeInTheDocument();
        expect(screen.getAllByText('20%').length).toBeGreaterThan(0);
        expect(screen.getByText('200-901')).toBeInTheDocument();
        expect(screen.getByText('120分')).toBeInTheDocument();
        expect(screen.getByText('EN / JA')).toBeInTheDocument();
        expect(screen.getByText('5.1–5.14')).toBeInTheDocument();
    });

    it('renders overview section with life cycle table and diagram 0', () => {
        render(<CcnaInfraAutomationGuide />);
        expect(screen.getByRole('heading', { level: 2, name: 'この記事について' })).toBeInTheDocument();
        expect(screen.getByText('試験全体における本ドメインの位置づけ')).toBeInTheDocument();
        expect(screen.getByText('全体の自動化ライフサイクルから見る5.0ドメイン')).toBeInTheDocument();
        expect(screen.getAllByText(/Figure 0/i).length).toBeGreaterThan(0);
        expect(DIAGRAMS['diag-0']).toContain('設計: モデル駆動の意図 YANGデータモデル');
    });

    it('renders all sections from 5.1 to 5.14 with corresponding diagrams and topics', () => {
        render(<CcnaInfraAutomationGuide />);

        const sectionTitles = [
            'モデル駆動プログラマビリティの価値',
            'コントローラーレベル管理とデバイスレベル管理の比較',
            'ネットワークシミュレーション・テストツール',
            'インフラ自動化におけるCI/CDパイプライン',
            'Infrastructure as Code（IaC）の原則',
            '自動化ツールの機能（Ansible, Terraform, Cisco NSO）',
            'PythonスクリプトのワークフローをCisco APIから読み解く',
            'Ansible Playbookのワークフローの解釈',
            'Bashスクリプトのワークフローの解釈',
            'RESTCONF/NETCONFクエリ結果の解釈',
            '基本的なYANGモデルの解釈',
            'Unified Diffの解釈',
            'コードレビューの原則と利点',
            'APIコールを含むシーケンス図の解釈',
        ];

        sectionTitles.forEach((title) => {
            expect(screen.getByRole('heading', { level: 2, name: new RegExp(title, 'i') })).toBeInTheDocument();
        });

        // Check diagrams constants
        for (let i = 1; i <= 14; i++) {
            const key = `diag-5-${i}`;
            expect(DIAGRAMS[key]).toBeDefined();
            expect(DIAGRAMS[key]?.length).toBeGreaterThan(10);
        }
    });

    it('renders code samples for Python, Ansible, Bash, RESTCONF, NETCONF, YANG, and Diff', () => {
        render(<CcnaInfraAutomationGuide />);
        expect(screen.getByText('devices.py')).toBeInTheDocument();
        expect(screen.getByText('webserver_setup.yml')).toBeInTheDocument();
        expect(screen.getByText('setup.sh')).toBeInTheDocument();
        expect(screen.getByText('restconf-response.json')).toBeInTheDocument();
        expect(screen.getByText('netconf-response.xml')).toBeInTheDocument();
        expect(screen.getByText('example-interfaces.yang')).toBeInTheDocument();
        expect(screen.getByText('playbook.yml.diff')).toBeInTheDocument();
    });

    it('renders summary section with complete 5.0 domain table', () => {
        render(<CcnaInfraAutomationGuide />);
        expect(screen.getByRole('heading', { level: 2, name: 'まとめ・学習の進め方' })).toBeInTheDocument();
        expect(screen.getByText('5.0 Infrastructure and Automation 全項目の早見表')).toBeInTheDocument();
        expect(screen.getByText('学習の進め方のおすすめ')).toBeInTheDocument();
    });

    it('renders sources and references with all 13 external links', () => {
        render(<CcnaInfraAutomationGuide />);
        expect(screen.getByRole('heading', { level: 2, name: '参考文献・出典' })).toBeInTheDocument();

        const links = [
            'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html',
            'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html',
            'https://learningnetwork.cisco.com/s/ccnaauto-exam-topics',
            'https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf',
            'https://developer.cisco.com/modeling-labs/',
            'https://developer.cisco.com/docs/pyats/',
            'https://developer.cisco.com/site/nso/',
            'https://www.rfc-editor.org/rfc/rfc7950',
            'https://www.rfc-editor.org/rfc/rfc6241',
            'https://www.rfc-editor.org/rfc/rfc8040',
            'https://docs.ansible.com/',
            'https://developer.hashicorp.com/terraform/docs',
            'https://git-scm.com/docs/git-diff',
        ];

        links.forEach((link) => {
            const anchor = screen.getByRole('link', { name: link });
            expect(anchor).toBeInTheDocument();
            expect(anchor).toHaveAttribute('href', link);
        });

        expect(screen.getByText(/免責事項：/i)).toBeInTheDocument();
    });

    it('preserves every table cell, supplemental item, code block, CSS class, and element placement', () => {
        const { container } = render(<CcnaInfraAutomationGuide />);
        const css = fs.readFileSync(
            path.resolve(
                process.cwd(),
                'app/cisco/ccna/automation-infrastructure-and-automation/page.css',
            ),
            'utf8',
        );

        expectTableFidelity(fidelity.tables, container);
        expectSupplementalFidelity(
            fidelity.supplemental,
            container,
            '.callout, .chip, .weight-tag, .diagram-label, .code-label',
        );
        expectCodeFidelity(fidelity.codeBlocks, container);
        expectSyntaxHighlightFidelity(fidelity.syntaxTokens, container);
        expectContentCssCoverage(fidelity.styledClasses, container, css, {
            hljs: 'code-block',
            'hljs-comment': 'hl-cm',
            'hljs-keyword': 'hl-kw',
            'hljs-literal': 'hl-kw',
            'hljs-built_in': 'hl-fn',
            'hljs-string': 'hl-str',
            'hljs-number': 'hl-num',
            'hljs-attr': 'hl-attr',
            'hljs-name': 'hl-fn',
            'hljs-tag': 'hl-fn',
            'hljs-variable': 'hl-str',
            'hljs-subst': 'hl-str',
            'hljs-bullet': 'hl-meta',
            'hljs-meta': 'hl-meta',
            'hljs-addition': 'hl-add',
            'hljs-deletion': 'hl-del',
        });
        expectElementPlacementFidelity(
            fidelity.placements,
            container,
            '.table-wrapper > table, .diagram-wrapper, .callout, .code-block, pre',
        );
    });
});
