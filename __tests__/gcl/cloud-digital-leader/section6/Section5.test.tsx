import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section5 } from '../../../../app/gcl/cloud-digital-leader/section6/components/Section5';

describe('CDL Section 6 - Section 5 (Reliability)', () => {
    it('renders the section title correctly', () => {
        render(<Section5 />);
        expect(screen.getByRole('heading', { name: /信頼性・可用性の/, level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /設計原則/, level: 2 })).toBeInTheDocument();
    });

    it('renders the important concepts table correctly', () => {
        render(<Section5 />);
        expect(screen.getByText(/信頼性の重要概念/)).toBeInTheDocument();
        const tables = screen.getAllByRole('table');
        expect(tables.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole('cell', { name: '高可用性 (HA)' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'フォールトトレランス' })).toBeInTheDocument();
        expect(screen.getAllByText(/RPO/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/RTO/).length).toBeGreaterThan(0);
        expect(screen.getByRole('cell', { name: 'ディザスタリカバリ' })).toBeInTheDocument();
    });

    it('renders the incident management flow correctly', () => {
        render(<Section5 />);
        expect(screen.getAllByText(/インシデント管理フロー/).length).toBeGreaterThan(0);
        expect(screen.getByText(/01 検知 \(Detect\)/)).toBeInTheDocument();
        expect(screen.getByText(/02 トリアージ \(Triage\)/)).toBeInTheDocument();
        expect(screen.getByText(/03 緩和 \(Mitigate\)/)).toBeInTheDocument();
        expect(screen.getByText(/04 解決 \(Resolve\)/)).toBeInTheDocument();
        expect(screen.getByText(/05 事後分析 \(Postmortem\)/)).toBeInTheDocument();
    });

    it('renders the DevOps vs SRE cards correctly', () => {
        render(<Section5 />);
        expect(screen.getByText(/DevOps と SRE の関係/)).toBeInTheDocument();
        expect(screen.getByText(/DevOps（開発 \+ 運用の統合）/)).toBeInTheDocument();
        expect(screen.getByText(/SRE（DevOps の具体的実装）/)).toBeInTheDocument();
    });

    it('renders the Best Practices box correctly', () => {
        render(<Section5 />);
        expect(screen.getByText('ベストプラクティス：信頼性設計')).toBeInTheDocument();
        expect(screen.getByText(/HA（高可用性）構成/)).toBeInTheDocument();
        expect(screen.getAllByText(/ヘルスチェック/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/リージョナル MIG/).length).toBeGreaterThan(0);
    });
});
