import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GriffinWordPressGkeGuidePage from '@/app/gcl/hands-on/griffin-wordpress-gke-guide/page';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart }: { chart: string }) {
        return <pre data-testid="mermaid">{chart}</pre>;
    },
}));

describe('GriffinWordPressGkeGuidePage', () => {
    it('renders hero title and main sections correctly', () => {
        render(<GriffinWordPressGkeGuidePage />);

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Team Griffin インフラ構築チャレンジラボ 完全解説ガイド/i,
            }),
        ).toBeInTheDocument();

        expect(screen.getByText(/0. このガイドについて/i)).toBeInTheDocument();
        expect(screen.getByText(/1. 全体アーキテクチャ/i)).toBeInTheDocument();
        expect(screen.getByText(/2. タスクの全体フロー/i)).toBeInTheDocument();
        expect(screen.getByText(/3. 事前準備・標準/i)).toBeInTheDocument();
        expect(screen.getByText(/Task1 開発VPC作成/i)).toBeInTheDocument();
        expect(screen.getByText(/Task2 本番VPC作成/i)).toBeInTheDocument();
        expect(screen.getByText(/Task3 踏み台ホスト作成/i)).toBeInTheDocument();
        expect(screen.getByText(/Task4 Cloud SQL作成/i)).toBeInTheDocument();
        expect(screen.getByText(/Task5 GKEクラスタ作成/i)).toBeInTheDocument();
        expect(screen.getByText(/Task6 クラスタ準備/i)).toBeInTheDocument();
        expect(screen.getByText(/Task7 WordPressデプロイ/i)).toBeInTheDocument();
        expect(screen.getByText(/Task8 死活監視設定/i)).toBeInTheDocument();
        expect(screen.getByText(/Task9 追加エンジニア権限付与/i)).toBeInTheDocument();
    });
});
