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
        expect(screen.getByText(/Task 1：開発用VPC/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 2：本番用VPC/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 3：踏み台/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 4：Cloud SQL/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 5：Kubernetesクラスタ/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 6：Kubernetesクラスタの準備/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 7：WordPressデプロイメント/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 8：モニタリング/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 9：追加エンジニア/i)).toBeInTheDocument();
    });
});
