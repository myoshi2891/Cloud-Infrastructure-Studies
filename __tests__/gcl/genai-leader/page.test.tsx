import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import GenaiLeaderPage from '@/app/gcl/genai-leader/page';

describe('Generative AI Leader ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        render(<GenaiLeaderPage />);
        expect(screen.getAllByText(/Generative AI Leader/).length).toBeGreaterThanOrEqual(1);
    });

    it('hero セクションに試験タイトルが含まれること', () => {
        render(<GenaiLeaderPage />);
        expect(screen.getByText(/試験完全マスター/)).toBeInTheDocument();
    });

    it('試験メタデータが表示されること', () => {
        const { container } = render(<GenaiLeaderPage />);
        expect(screen.getByText('90 分')).toBeInTheDocument();
        expect(screen.getByText('50〜60問')).toBeInTheDocument();
        expect(screen.getAllByText('$99').length).toBeGreaterThanOrEqual(1);

        // meta-card のラベル要素がクラス名 "ml" を、値要素がクラス名 "mv" を持っていることをテスト
        const metaCard = container.querySelector('.meta-card');
        expect(metaCard).toBeInTheDocument();
        if (metaCard) {
            const labelEl = metaCard.querySelector('.ml');
            const valEl = metaCard.querySelector('.mv');
            expect(labelEl).toBeInTheDocument();
            expect(valEl).toBeInTheDocument();
        }
    });

    it('4つのセクション見出しが存在すること', () => {
        render(<GenaiLeaderPage />);
        expect(screen.getByText(/生成 AI の基礎知識/)).toBeInTheDocument();
        expect(screen.getByText(/Google Cloud の Gen AI サービス/)).toBeInTheDocument();
        expect(screen.getByText(/Gen AI モデル出力改善技術/)).toBeInTheDocument();
        expect(screen.getByText(/Gen AI ビジネス戦略/)).toBeInTheDocument();
    });

    it('sticky nav にセクションリンクが含まれること', () => {
        render(<GenaiLeaderPage />);
        const nav = screen.getByRole('navigation', { name: /Generative AI Leader セクションナビゲーション/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links).toHaveLength(5);
        expect(within(nav).getByText(/Section 1: Gen AI 基礎/)).toBeInTheDocument();
        expect(within(nav).getByText(/Section 2: GCP サービス/)).toBeInTheDocument();
        expect(within(nav).getByText(/Section 3: モデル改善/)).toBeInTheDocument();
        expect(within(nav).getByText(/Section 4: ビジネス戦略/)).toBeInTheDocument();
    });
});
