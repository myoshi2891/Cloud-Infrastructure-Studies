import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
        render(<GenaiLeaderPage />);
        expect(screen.getByText('90 分')).toBeInTheDocument();
        expect(screen.getByText('50〜60問')).toBeInTheDocument();
        expect(screen.getByText('$99')).toBeInTheDocument();
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
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getByText(/Section 1: Gen AI 基礎/)).toBeInTheDocument();
        expect(screen.getByText(/Section 2: GCP サービス/)).toBeInTheDocument();
        expect(screen.getByText(/Section 3: モデル改善/)).toBeInTheDocument();
        expect(screen.getByText(/Section 4: ビジネス戦略/)).toBeInTheDocument();
    });
});
