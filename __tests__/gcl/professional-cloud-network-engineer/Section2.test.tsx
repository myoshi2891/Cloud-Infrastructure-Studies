import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section2 } from '../../../app/gcl/professional-cloud-network-engineer/components/Section2';

describe('Professional Cloud Network Engineer - Section2', () => {
    it('renders the section title correctly', () => {
        render(<Section2 />);
        expect(screen.getByRole('heading', { name: /ハイブリッド接続とネットワーク相互接続/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('Section 2 (23%)')).toBeInTheDocument();
    });

    it('renders the connectivity comparison correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/2.1 接続方式の全体比較 ─ 帯域・コスト・SLAで選択する/)).toBeInTheDocument();
        expect(screen.getAllByText('HA VPN')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Dedicated Interconnect')[0]).toBeInTheDocument();
        expect(screen.getByText(/大帯域・低レイテンシ必須/)).toBeInTheDocument();
    });

    it('renders the HA VPN section correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/2.2 HA VPN ─ 99.99% SLAを実現する高可用性VPN設計/)).toBeInTheDocument();
        expect(screen.getByText(/IKEv2/)).toBeInTheDocument();
        expect(screen.getByText(/BGP（動的ルーティング）を必ず設定する/)).toBeInTheDocument();
    });

    it('renders the Cloud Interconnect section correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/2.3 Cloud Interconnect ─ 専用線による99.99%冗長設計/)).toBeInTheDocument();
        expect(screen.getByText(/異なる2 Metro × 2回線 = 合計4回線/)).toBeInTheDocument();
        expect(screen.getByText(/1本の物理専用線を論理的に複数に分割する仕組み/)).toBeInTheDocument();
    });

    it('renders the Cloud Router & BGP section correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/2.4 Cloud Router と BGP ─ 動的ルーティングの仕組みと設定/)).toBeInTheDocument();
        expect(screen.getByText(/データプレーンのトラフィック自体は通過しません/)).toBeInTheDocument();
        expect(screen.getByText(/BGP MED/)).toBeInTheDocument();
    });
});
