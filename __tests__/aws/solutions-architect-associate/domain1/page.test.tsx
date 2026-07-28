import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Domain1Page from '@/app/aws/solutions-architect-associate/domain1/page';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart }: { chart: string }) {
        return <pre data-testid="mermaid">{chart}</pre>;
    },
}));

describe('AWS SAA Domain 1 Guide Page', () => {
    it('renders header, title and main components correctly', () => {
        render(<Domain1Page />);

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /AWS SAA-C03 ドメイン1: セキュアなアーキテクチャの設計/i,
            })
        ).toBeInTheDocument();

        expect(screen.getByText(/タスク1.1: AWSリソースへの安全なアクセス設計/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク1.2: 安全なワークロードとアプリケーションの設計/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク1.3: 適切なデータセキュリティコントロールの決定/i)).toBeInTheDocument();
    });
});
