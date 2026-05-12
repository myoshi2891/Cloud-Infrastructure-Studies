import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section5 } from '@/app/gcl/professional-cloud-network-engineer/components/Section5';

describe('Professional Cloud Network Engineer - Section5', () => {
    it('renders the section title correctly', () => {
        render(<Section5 />);
        expect(
            screen.getByRole('heading', { name: /ネットワークセキュリティ設計と実装/, level: 2 }),
        ).toBeInTheDocument();
        expect(screen.getByText('Section 5 (~12%)')).toBeInTheDocument();
    });

    it('renders the Cloud Armor section correctly', () => {
        render(<Section5 />);
        expect(
            screen.getByText(/5.1 Cloud Armor ─ WAF・DDoS・Rate Limiting・Adaptive Protection/),
        ).toBeInTheDocument();
        expect(screen.getByText('DDoS防御')).toBeInTheDocument();
        expect(screen.getByText('WAF（L7）')).toBeInTheDocument();
        expect(screen.getByText('Rate Limiting')).toBeInTheDocument();
        expect(screen.getAllByText('Adaptive Protection')[0]).toBeInTheDocument();
        expect(screen.getByText(/プレビューモードを活用/)).toBeInTheDocument();
    });

    it('renders the VPC SC section correctly', () => {
        render(<Section5 />);
        expect(
            screen.getByText(/5.2 VPC Service Controls ─ データ漏洩（Exfiltration）防止/),
        ).toBeInTheDocument();
        expect(screen.getAllByText('Service Perimeter（サービス境界）')[0]).toBeInTheDocument();
        expect(screen.getByText(/アクセスレベルで例外を許可/)).toBeInTheDocument();
    });

    it('renders the IAP section correctly', () => {
        render(<Section5 />);
        expect(
            screen.getByText(/5.3 Identity-Aware Proxy（IAP）─ VPNなしのゼロトラストアクセス/),
        ).toBeInTheDocument();
        expect(screen.getByText('IAPと従来VPNのアクセス比較図')).toBeInTheDocument();
        expect(
            screen.getByText(/IAP経由でSSH接続/),
        ).toBeInTheDocument();
        expect(screen.getAllByText(/35.235.240.0\/20/)[0]).toBeInTheDocument();
    });

    it('renders the best practices correctly', () => {
        render(<Section5 />);
        expect(
            screen.getByText(/機密データ（個人情報・金融データ）を扱うプロジェクトに必ず適用する/),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/管理画面・内部ツールへのアクセスはすべてIAPで保護する/),
        ).toBeInTheDocument();
    });
});
