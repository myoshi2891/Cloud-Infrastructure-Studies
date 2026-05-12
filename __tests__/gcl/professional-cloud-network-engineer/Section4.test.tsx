import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4 } from '@/app/gcl/professional-cloud-network-engineer/components/Section4';

describe('Professional Cloud Network Engineer - Section4', () => {
    it('renders the section title correctly', () => {
        render(<Section4 />);
        expect(screen.getByRole('heading', { name: /CDN・DNS・IPアドレス管理/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('Section 4 (~15%)')).toBeInTheDocument();
    });

    it('renders the Cloud DNS zone table correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/4.1 Cloud DNS ─ パブリック\/プライベートゾーンと転送設定/)).toBeInTheDocument();
        expect(screen.getByText('パブリックゾーン')).toBeInTheDocument();
        expect(screen.getByText('外部公開ドメインのDNS管理')).toBeInTheDocument();
        expect(screen.getAllByText('プライベートゾーン')[0]).toBeInTheDocument();
        expect(screen.getByText('内部サービスのDNS解決')).toBeInTheDocument();
    });

    it('renders the DNS forwarding diagram correctly', () => {
        render(<Section4 />);
        expect(screen.getAllByText('DNS転送の2方向')[0]).toBeInTheDocument();
        expect(screen.getByText('アウトバウンド転送（GCP → オンプレ）')).toBeInTheDocument();
        expect(screen.getByText('インバウンド転送（オンプレ → GCP）')).toBeInTheDocument();
        expect(screen.getByText(/35.199.192.0\/19 からの通信を許可すること/)).toBeInTheDocument();
    });

    it('renders the IP Address management table correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/4.2 IPアドレス管理 ─ エフェメラル・静的・グローバル・リージョン/)).toBeInTheDocument();
        expect(screen.getByText('エフェメラルIP')).toBeInTheDocument();
        expect(screen.getByText('静的IP（リージョン）')).toBeInTheDocument();
        expect(screen.getByText('静的IP（グローバル）')).toBeInTheDocument();
    });

    it('renders the best practices and exam tips correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/内部サービスは/)).toBeInTheDocument();
        expect(screen.getByText(/静的IPを予約したまま/)).toBeInTheDocument();
    });
});
