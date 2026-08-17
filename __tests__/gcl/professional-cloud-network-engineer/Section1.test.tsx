import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section1 } from '@/app/gcl/professional-cloud-network-engineer/components/Section1';

describe('Professional Cloud Network Engineer - Section1', () => {
    it('renders the section title correctly', () => {
        render(<Section1 />);
        expect(screen.getByRole('heading', { name: /VPC ネットワークの設計・実装/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('Section 1 (~41%)')).toBeInTheDocument();
    });

    it('renders the VPC mode comparison correctly', () => {
        render(<Section1 />);
        expect(screen.getByText(/1.1 VPCの根本概念 ─ グローバルスコープとモード選択/)).toBeInTheDocument();
        expect(screen.getByText(/手動でIPレンジを指定して作成/)).toBeInTheDocument();
        expect(screen.getByText(/Auto → Custom への変換は/)).toBeInTheDocument();
    });

    it('renders the Firewall rules section correctly', () => {
        render(<Section1 />);
        expect(screen.getByText(/1.2 VPCファイアウォールルール ─ ステートフル・優先度・階層型ポリシー/)).toBeInTheDocument();
        expect(screen.getByText(/階層型ファイアウォールポリシー/)).toBeInTheDocument();
        expect(screen.getByText(/組織（Organization）またはフォルダ（Folder）レベル/)).toBeInTheDocument();
    });

    it('renders the VPC Peering vs Shared VPC section correctly', () => {
        render(<Section1 />);
        expect(screen.getByText(/1.3 VPCピアリング vs Shared VPC ─ 設計パターンの選択/)).toBeInTheDocument();
        expect(screen.getByText(/推移的ルーティング/)).toBeInTheDocument();
        expect(screen.getAllByText('ホストプロジェクト')[0]).toBeInTheDocument();
        expect(screen.getByText(/ネットワークチームがサブネットやファイアウォールを一元管理/)).toBeInTheDocument();
    });

    it('renders the private communication section correctly', () => {
        render(<Section1 />);
        expect(screen.getByText(/1.4 プライベート通信制御 ─ Cloud NAT・PGA・PSC/)).toBeInTheDocument();
        expect(screen.getByText('Cloud NAT')).toBeInTheDocument();
        expect(screen.getByText('Private Google Access')).toBeInTheDocument();
        expect(screen.getByText('Private Service Connect')).toBeInTheDocument();
    });
});
