import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import CompleteAdvancedGuidePage from '@/app/gcl/associate-cloud-engineer/complete-advanced-guide/page';

describe('GCP ACE 完全試験対策ガイド ページ', () => {
    beforeEach(() => {
        render(<CompleteAdvancedGuidePage />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(screen.getAllByText(/Associate Cloud Engineer/).length).toBeGreaterThanOrEqual(1);
    });

    it('サイドバーナビゲーションが存在し、セクションリンクが含まれること', () => {
        const sidebar = screen.getByRole('navigation', { name: /ACE 完全ガイドナビゲーション/ });
        expect(sidebar).toBeInTheDocument();
        
        // 主要なアンカーリンクの存在確認
        expect(within(sidebar).getByText(/試験概要 & 配点/)).toBeInTheDocument();
        expect(within(sidebar).getByText(/学習ロードマップ/)).toBeInTheDocument();
        expect(within(sidebar).getByText(/リソース階層/)).toBeInTheDocument();
        expect(within(sidebar).getByText(/組織ポリシー/)).toBeInTheDocument();
    });

    it('最新情報（GKE Autopilot の DaemonSet 制限、Cloud Run の 1Gbps 上限）が正しく含まれていること', () => {
        // GKE Autopilot DaemonSet 制限の表現
        expect(screen.getByText(/DaemonSet は GKE Autopilot でサポートされるが/)).toBeInTheDocument();
        
        // Cloud Run 1Gbps 上限の表現
        expect(screen.getByText(/最大 1Gbps/)).toBeInTheDocument();
        expect(screen.getByText(/Direct VPC 送出のインスタンスあたり上限/)).toBeInTheDocument();
    });
});
