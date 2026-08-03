import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import GriffinWordPressGkeGuidePage from '@/app/gcl/hands-on/griffin-wordpress-gke-guide/page';

/** page.css の off-canvas ブレークポイント（max-width: 900px）に対する matchMedia スタブ */
function stubViewport(isMobile: boolean) {
    vi.stubGlobal(
        'matchMedia',
        vi.fn((query: string) => ({
            matches: isMobile && query === '(max-width: 900px)',
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            onchange: null,
            dispatchEvent: vi.fn(),
        })),
    );
}

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

    it('uptime check の resource-labels に host と project_id の両方を含む', () => {
        render(<GriffinWordPressGkeGuidePage />);

        expect(
            screen.getByText(
                /--resource-labels=host="\$WORDPRESS_EXTERNAL_IP",project_id="\$\(gcloud config get-value project\)"/,
            ),
        ).toBeInTheDocument();
    });

    describe('目次サイドバーのアクセシビリティ', () => {
        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('モバイル幅で目次が閉じている間は inert / aria-hidden で除外される', () => {
            stubViewport(true);
            const { container } = render(<GriffinWordPressGkeGuidePage />);

            const sidebar = container.querySelector('#table-of-contents');
            expect(sidebar).toHaveAttribute('aria-hidden', 'true');
            expect(sidebar).toHaveAttribute('inert');
        });

        it('モバイル幅でも目次を開けば操作可能になる', async () => {
            stubViewport(true);
            const user = userEvent.setup();
            const { container } = render(<GriffinWordPressGkeGuidePage />);

            await user.click(screen.getByRole('button', { name: /目次/ }));

            const sidebar = container.querySelector('#table-of-contents');
            expect(sidebar).not.toHaveAttribute('aria-hidden');
            expect(sidebar).not.toHaveAttribute('inert');
        });

        it('デスクトップ幅では常に操作可能なまま除外されない', () => {
            stubViewport(false);
            const { container } = render(<GriffinWordPressGkeGuidePage />);

            const sidebar = container.querySelector('#table-of-contents');
            expect(sidebar).not.toHaveAttribute('aria-hidden');
            expect(sidebar).not.toHaveAttribute('inert');
        });

        it('モバイル幅で目次リンクを押すと目次が閉じトグルへフォーカスが戻る', async () => {
            stubViewport(true);
            const user = userEvent.setup();
            const { container } = render(<GriffinWordPressGkeGuidePage />);

            const toggle = screen.getByRole('button', { name: /目次/ });
            await user.click(toggle);

            const firstLink = container.querySelector<HTMLAnchorElement>('#table-of-contents nav a');
            expect(firstLink).not.toBeNull();
            await user.click(firstLink as HTMLAnchorElement);

            expect(container.querySelector('#table-of-contents')).toHaveAttribute('inert');
            expect(toggle).toHaveFocus();
        });
    });
});
