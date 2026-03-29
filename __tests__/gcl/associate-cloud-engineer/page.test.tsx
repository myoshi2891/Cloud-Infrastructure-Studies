import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AssociateCloudEngineerPage from '@/app/gcl/associate-cloud-engineer/page';

describe('Associate Cloud Engineer ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<AssociateCloudEngineerPage />);
        expect(screen.getByText(/Associate Cloud Engineer/)).toBeInTheDocument();
    });

    it('hero セクションに試験タイトルが含まれること', () => {
        render(<AssociateCloudEngineerPage />);
        expect(screen.getByText(/完全マスター教材/)).toBeInTheDocument();
    });

    it('試験メタデータが表示されること', () => {
        render(<AssociateCloudEngineerPage />);
        expect(screen.getByText('2 時間')).toBeInTheDocument();
        expect(screen.getByText('50〜60問')).toBeInTheDocument();
        expect(screen.getByText('$125')).toBeInTheDocument();
    });

    it('4つのセクション見出しが存在すること', () => {
        render(<AssociateCloudEngineerPage />);
        expect(screen.getByText('クラウドソリューション環境のセットアップ')).toBeInTheDocument();
        expect(screen.getByText('クラウドソリューションの計画と実装')).toBeInTheDocument();
        expect(screen.getByText('クラウドソリューションの運用管理')).toBeInTheDocument();
        expect(screen.getByText('アクセスとセキュリティの構成')).toBeInTheDocument();
    });

    it('sticky nav にセクションリンクが含まれること', () => {
        render(<AssociateCloudEngineerPage />);
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getByText(/S1: 環境構築/)).toBeInTheDocument();
        expect(screen.getByText(/S2: 計画・実装/)).toBeInTheDocument();
        expect(screen.getByText(/S3: 運用管理/)).toBeInTheDocument();
        expect(screen.getByText(/S4: アクセス・セキュリティ/)).toBeInTheDocument();
    });
});
