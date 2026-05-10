import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PcnePage from '../../../app/gcl/professional-cloud-network-engineer/page';

describe('Professional Cloud Network Engineer - Page', () => {
    it('renders the hero section correctly', () => {
        render(<PcnePage />);
        expect(screen.getByRole('heading', { name: /Professional Cloud.*Network Engineer.*完全試験対策ガイド/s, level: 1 })).toBeInTheDocument();
        expect(screen.getByText('Professional Cloud Network Engineer')).toBeInTheDocument();
        expect(screen.getByText(/ネットワーク初学者から中級者まで対応。VPC設計から/)).toBeInTheDocument();
    });

    it('renders the hero stats correctly', () => {
        render(<PcnePage />);
        expect(screen.getByText(/試験時間: 120分/)).toBeInTheDocument();
        expect(screen.getByText(/問題数: 50〜60問/)).toBeInTheDocument();
        expect(screen.getByText(/受験料: \$200/)).toBeInTheDocument();
        expect(screen.getByText(/推奨経験: 3年以上/)).toBeInTheDocument();
        expect(screen.getByText(/更新: 2年ごと/)).toBeInTheDocument();
    });

    it('renders the hero badges correctly', () => {
        render(<PcnePage />);
        expect(screen.getByText('🌐 VPC 設計')).toBeInTheDocument();
        expect(screen.getByText('🔗 ハイブリッド接続')).toBeInTheDocument();
        expect(screen.getByText('⚖️ ロードバランシング')).toBeInTheDocument();
    });

    it('renders the sticky navigation correctly', () => {
        render(<PcnePage />);
        const nav = screen.getByRole('navigation', { name: /Quick navigation/ });
        expect(nav).toBeInTheDocument();
        
        expect(screen.getByText('PCNE')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /01 VPCネットワーク/ })).toHaveAttribute('href', '#s1');
        expect(screen.getByRole('link', { name: /02 ハイブリッド接続/ })).toHaveAttribute('href', '#s2');
        expect(screen.getByRole('link', { name: /まとめ チートシート/ })).toHaveAttribute('href', '#cheatsheet');
    });
});
