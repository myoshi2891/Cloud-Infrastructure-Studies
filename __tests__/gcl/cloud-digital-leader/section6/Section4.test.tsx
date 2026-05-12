import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section4 } from '@/app/gcl/cloud-digital-leader/section6/components/Section4';

describe('CDL Section 6 - Section 4 (Cloud Logging)', () => {
    it('renders the section title correctly', () => {
        render(<Section4 />);
        expect(screen.getByRole('heading', { name: /Cloud Logging/, level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /ログ管理と監査/, level: 2 })).toBeInTheDocument();
    });

    it('renders the Cloud Logging overview correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/Cloud Logging とは？/)).toBeInTheDocument();
    });

    it('renders the Audit Logs table correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/監査ログ（Audit Logs）の3種類/)).toBeInTheDocument();
        const tables = screen.getAllByRole('table');
        expect(tables.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole('cell', { name: /管理アクティビティ/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /データアクセス/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /システムイベント/ })).toBeInTheDocument();
    });

    it('renders the export destinations correctly', () => {
        render(<Section4 />);
        expect(screen.getByText(/ログのエクスポート先と用途/)).toBeInTheDocument();
        expect(screen.getByText(/BigQuery へのエクスポート/)).toBeInTheDocument();
        expect(screen.getByText(/Cloud Storage へのエクスポート/)).toBeInTheDocument();
        expect(screen.getByText(/Pub\/Sub へのエクスポート/)).toBeInTheDocument();
    });

    it('renders the Best Practices box correctly', () => {
        render(<Section4 />);
        expect(screen.getByText('ベストプラクティス：Cloud Logging')).toBeInTheDocument();
        expect(screen.getByText(/BigQuery にエクスポート/)).toBeInTheDocument();
        expect(screen.getByText(/Cloud Storage の Coldline/)).toBeInTheDocument();
    });

    it('renders external links correctly', () => {
        render(<Section4 />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', 'https://cloud.google.com/logging/docs/overview');
        expect(links[1]).toHaveAttribute('href', 'https://cloud.google.com/logging/docs/audit');
    });
});
