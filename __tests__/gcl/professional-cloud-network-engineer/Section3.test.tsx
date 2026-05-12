import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section3 } from '@/app/gcl/professional-cloud-network-engineer/components/Section3';

describe('Professional Cloud Network Engineer - Section3', () => {
    it('renders the section title correctly', () => {
        render(<Section3 />);
        expect(
            screen.getByRole('heading', { name: /ロードバランシングとトラフィック管理/, level: 2 }),
        ).toBeInTheDocument();
        expect(screen.getByText('Section 3 (~19%)')).toBeInTheDocument();
    });

    it('renders the load balancer flow correctly', () => {
        render(<Section3 />);
        expect(screen.getByText(/3.1 ロードバランサー選択の決定フロー/)).toBeInTheDocument();
        expect(screen.getByText('Global External HTTP(S) LB')).toBeInTheDocument();
        expect(screen.getByText('TCP / SSL')).toBeInTheDocument();
        expect(screen.getByText(/Cloud ArmorはProxy型LBにのみ対応/)).toBeInTheDocument();
    });

    it('renders the HTTPS LB architecture correctly', () => {
        render(<Section3 />);
        expect(
            screen.getByText(/3.2 Global External HTTP\(S\) LB ─ URLMapとNEGの設計/),
        ).toBeInTheDocument();
        expect(screen.getByText('Forwarding Rule')).toBeInTheDocument();
        expect(screen.getByText('Target HTTP(S) Proxy')).toBeInTheDocument();
        expect(screen.getByText('URL Map')).toBeInTheDocument();
        expect(screen.getByText('Backend Service + Health Check')).toBeInTheDocument();
    });

    it('renders the NEG table correctly', () => {
        render(<Section3 />);
        expect(screen.getByText('Zonal NEG')).toBeInTheDocument();
        expect(screen.getByText('Serverless NEG')).toBeInTheDocument();
        expect(screen.getByText('Internet NEG')).toBeInTheDocument();
        expect(screen.getByText('Hybrid NEG')).toBeInTheDocument();
    });

    it('renders the best practices correctly', () => {
        render(<Section3 />);
        expect(
            screen.getByText(/マルチリージョンバックエンドで高可用性を実現する/),
        ).toBeInTheDocument();
        expect(screen.getByText(/Cloud ArmorでWAF・DDoS保護を必ず有効化する/)).toBeInTheDocument();
        expect(screen.getByText(/SSL PolicyでTLS 1.2以上を強制する/)).toBeInTheDocument();
    });
});
