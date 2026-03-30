import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AssociateCloudEngineerPage from '@/app/gcl/associate-cloud-engineer/page';

describe('Associate Cloud Engineer ページ', () => {
    beforeEach(() => {
        render(<AssociateCloudEngineerPage />);
    });

    it('ページコンポーネントがレンダリングされること', () => {
        expect(screen.getAllByText(/Associate Cloud Engineer/).length).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションに試験タイトルが含まれること', () => {
        expect(screen.getByText(/完全マスター教材/)).toBeInTheDocument();
    });

    it('試験メタデータが表示されること', () => {
        expect(screen.getByText('2 時間')).toBeInTheDocument();
        expect(screen.getByText('50〜60問')).toBeInTheDocument();
        expect(screen.getByText('$125')).toBeInTheDocument();
    });

    it('4つのセクション見出しが存在すること', () => {
        expect(screen.getByText('クラウドソリューション環境のセットアップ')).toBeInTheDocument();
        expect(screen.getByText('クラウドソリューションの計画と実装')).toBeInTheDocument();
        expect(screen.getByText('クラウドソリューションの運用管理')).toBeInTheDocument();
        expect(screen.getByText('アクセスとセキュリティの構成')).toBeInTheDocument();
    });

    it('sticky nav にセクションリンクが含まれること', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getByText(/S1: 環境構築/)).toBeInTheDocument();
        expect(screen.getByText(/S2: 計画・実装/)).toBeInTheDocument();
        expect(screen.getByText(/S3: 運用管理/)).toBeInTheDocument();
        expect(screen.getByText(/S4: アクセス・セキュリティ/)).toBeInTheDocument();
    });
});
