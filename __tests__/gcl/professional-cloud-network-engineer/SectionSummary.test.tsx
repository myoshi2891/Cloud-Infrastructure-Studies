import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionSummary } from '../../../app/gcl/professional-cloud-network-engineer/components/SectionSummary';

describe('Professional Cloud Network Engineer - SectionSummary', () => {
    it('renders the Cheatsheet section correctly', () => {
        render(<SectionSummary />);
        expect(screen.getByRole('heading', { name: /試験攻略チートシート ─ 頻出サービス早見表/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('VPCはグローバル、サブネットはリージョン')).toBeInTheDocument();
        expect(screen.getByText('推移的ルーティング不可 / CIDR重複不可')).toBeInTheDocument();
    });

    it('renders the TRAPS section correctly', () => {
        render(<SectionSummary />);
        expect(screen.getByRole('heading', { name: /混同しやすいポイント ─ 試験の落とし穴/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('「VPCはリージョンスコープだ」')).toBeInTheDocument();
        expect(screen.getByText('「Cloud VPN（全般）は99.99% SLA」')).toBeInTheDocument();
        expect(screen.getByText('「Cloud NATでインバウンド接続も受けられる」')).toBeInTheDocument();
        expect(screen.getByText('「VPC PeeringでA-B-Cがつながれば全VPCが通信できる」')).toBeInTheDocument();
        expect(screen.getByText('「Cloud ArmorはすべてのLBで使える」')).toBeInTheDocument();
    });

    it('renders the Exam Strategies correctly', () => {
        render(<SectionSummary />);
        expect(screen.getByRole('heading', { name: /試験当日の解答戦略/, level: 3 })).toBeInTheDocument();
        expect(screen.getByText('最もシンプルな解決策を選ぶ')).toBeInTheDocument();
        expect(screen.getByText('マネージドサービスを優先')).toBeInTheDocument();
        expect(screen.getByText('冗長性・HAの要件を必ず確認')).toBeInTheDocument();
        expect(screen.getByText('コストと要件のバランス')).toBeInTheDocument();
        expect(screen.getByText('セキュリティは最小権限')).toBeInTheDocument();
        expect(screen.getByText('帯域要件で接続方式を選ぶ')).toBeInTheDocument();
    });
});
