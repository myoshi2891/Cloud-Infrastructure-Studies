import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section7 } from '../../../../app/gcl/cloud-digital-leader/section6/components/Section7';

describe('CDL Section 6 - Section 7 (Exam Preparation)', () => {
    it('renders the section title correctly', () => {
        render(<Section7 />);
        expect(screen.getByRole('heading', { name: /試験対策/, level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /チェックリスト/, level: 2 })).toBeInTheDocument();
    });

    it('renders the frequency patterns section correctly', () => {
        render(<Section7 />);
        expect(screen.getByText(/頻出問題パターン TOP 10/)).toBeInTheDocument();
        expect(screen.getByText(/PATTERN 01 — 財務ガバナンス/)).toBeInTheDocument();
        expect(screen.getByText(/「予算の上限に達したらどうなるか？」/)).toBeInTheDocument();
        expect(screen.getByText(/PATTERN 02 — Cloud Monitoring/)).toBeInTheDocument();
        expect(screen.getByText(/PATTERN 10 — Error Budget/)).toBeInTheDocument();
    });

    it('renders the keyword map correctly', () => {
        render(<Section7 />);
        expect(screen.getByText(/Section 6 キーワードマップ/)).toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('カテゴリ')).toBeInTheDocument();
        expect(screen.getByText('重要キーワード')).toBeInTheDocument();
        expect(screen.getByText('重要度')).toBeInTheDocument();
        expect(screen.getByText('財務ガバナンス')).toBeInTheDocument();
        expect(screen.getByText(/予算アラート、Committed Use Discounts/)).toBeInTheDocument();
    });

    it('renders the official sources correctly', () => {
        render(<Section7 />);
        expect(screen.getByText(/推奨学習リソース/)).toBeInTheDocument();
        expect(screen.getByText(/Cloud Digital Leader 公式試験ガイド（PDF）/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /https:\/\/services\.google\.com\/fh\/files\/misc\/cloud_digital_leader_exam_guide_english\.pdf/ })).toBeInTheDocument();
        expect(screen.getByText(/Cloud Digital Leader 認定資格 公式ページ/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /https:\/\/cloud\.google\.com\/learn\/certification\/cloud-digital-leader/ })).toBeInTheDocument();
        expect(screen.getByText(/Cloud Billing — 予算とアラート/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /https:\/\/cloud\.google\.com\/billing\/docs\/how-to\/budgets/ })).toBeInTheDocument();
    });
});
