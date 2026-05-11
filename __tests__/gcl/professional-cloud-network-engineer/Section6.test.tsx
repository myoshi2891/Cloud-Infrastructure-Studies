import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section6 } from '../../../app/gcl/professional-cloud-network-engineer/components/Section6';

describe('Professional Cloud Network Engineer - Section6', () => {
    it('renders the section title correctly', () => {
        render(<Section6 />);
        expect(
            screen.getByRole('heading', {
                name: /ネットワーク監視・トラブルシューティング/,
                level: 2,
            }),
        ).toBeInTheDocument();
        expect(screen.getByText('Section 6 (~10%)')).toBeInTheDocument();
    });

    it('renders the Network Intelligence Center tools correctly', () => {
        render(<Section6 />);
        expect(
            screen.getByText(/6.1 Network Intelligence Center ─ 5つの診断ツール/),
        ).toBeInTheDocument();
        expect(screen.getByText('Connectivity Tests')).toBeInTheDocument();
        expect(screen.getByText('Performance Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Firewall Insights')).toBeInTheDocument();
        expect(screen.getByText('Network Topology')).toBeInTheDocument();
        expect(screen.getByText('Network Analyzer')).toBeInTheDocument();
    });

    it('renders the Logs and Packet Mirroring comparison table correctly', () => {
        render(<Section6 />);
        expect(
            screen.getByText(/6.2 VPC Flow Logs・FWログ・Packet Mirroring ─ 使い分け/),
        ).toBeInTheDocument();
        expect(screen.getAllByText('VPC Flow Logs')[0]).toBeInTheDocument();
        expect(screen.getByText('FWルールログ')).toBeInTheDocument();
        expect(screen.getByText('Packet Mirroring')).toBeInTheDocument();
    });

    it('renders the code block for VPC Flow Logs correctly', () => {
        render(<Section6 />);
        expect(screen.getByText(/--enable-flow-logs/)).toBeInTheDocument();
        expect(screen.getByText(/--logging-flow-sampling=0.5/)).toBeInTheDocument();
    });

    it('renders the troubleshooting steps correctly', () => {
        render(<Section6 />);
        expect(screen.getByText('トラブルシューティング手順（試験頻出）')).toBeInTheDocument();
        expect(screen.getByText('Connectivity Testで問題箇所を絞り込む')).toBeInTheDocument();
        expect(screen.getByText('FWルールを確認（ログを参照）')).toBeInTheDocument();
        expect(screen.getByText('ルーティングを確認')).toBeInTheDocument();
        expect(screen.getByText('アプリケーション側を確認')).toBeInTheDocument();
    });
});
