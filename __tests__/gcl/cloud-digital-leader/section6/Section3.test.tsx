import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section3 } from '@/app/gcl/cloud-digital-leader/section6/components/Section3';

describe('CDL Section 6 - Section 3 (Cloud Monitoring)', () => {
    it('renders the section title correctly', () => {
        render(<Section3 />);
        expect(screen.getByRole('heading', { name: /Cloud Monitoring/, level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /モニタリングの全体像/, level: 2 })).toBeInTheDocument();
    });

    it('renders the observability signals correctly', () => {
        render(<Section3 />);
        expect(screen.getByText(/オブザーバビリティ（可観測性）の4シグナル/)).toBeInTheDocument();
        expect(screen.getByText(/Metrics（メトリクス）/)).toBeInTheDocument();
        expect(screen.getByText(/Logs（ログ）/)).toBeInTheDocument();
        expect(screen.getByText(/Traces（トレース）/)).toBeInTheDocument();
        expect(screen.getByText(/Profiles（プロファイル）/)).toBeInTheDocument();
    });

    it('renders the monitoring services table correctly', () => {
        render(<Section3 />);
        expect(screen.getByText(/Google Cloud モニタリングサービス群/)).toBeInTheDocument();
        const tables = screen.getAllByRole('table');
        expect(tables.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole('cell', { name: 'Cloud Monitoring' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Ops Agent' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Cloud Trace' })).toBeInTheDocument();
    });

    it('renders the Ops Agent importance table correctly', () => {
        render(<Section3 />);
        expect(screen.getByText(/Ops Agent の重要性/)).toBeInTheDocument();
        // Since Ops Agent is so important for memory/disk metrics, test for that text
        expect(screen.getAllByText(/メモリ使用量/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/ディスク使用率/).length).toBeGreaterThan(0);
    });

    it('renders the Best Practices box correctly', () => {
        render(<Section3 />);
        expect(screen.getByText('ベストプラクティス：Cloud Monitoring')).toBeInTheDocument();
        expect(screen.getByText(/Ops Agent をインストール/)).toBeInTheDocument();
        expect(screen.getByText(/SLO ベースのアラートを優先/)).toBeInTheDocument();
    });

    it('renders external links correctly', () => {
        render(<Section3 />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);
        expect(links[0]).toHaveAttribute('href', 'https://cloud.google.com/monitoring/docs/overview');
        expect(links[1]).toHaveAttribute('href', 'https://cloud.google.com/monitoring/agent/ops-agent');
        expect(links[2]).toHaveAttribute('href', 'https://cloud.google.com/trace/docs/overview');
    });
});
