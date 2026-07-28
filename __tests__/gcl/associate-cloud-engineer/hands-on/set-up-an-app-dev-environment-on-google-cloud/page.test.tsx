import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/gcl/associate-cloud-engineer/hands-on/set-up-an-app-dev-environment-on-google-cloud/page';
import { DIAGRAMS } from '@/app/gcl/associate-cloud-engineer/hands-on/set-up-an-app-dev-environment-on-google-cloud/constants';

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart }: { chart: string }) {
        return <pre data-testid="mermaid">{chart}</pre>;
    },
}));

describe('Google Cloud アプリ開発環境構築 完全ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページが正常にレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('メインタイトルがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /Google Cloud アプリ開発環境構築/i })).toBeInTheDocument();
    });

    it('10個の全セクションの見出しがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /全体アーキテクチャとラーニングパス/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Cloud Storage — オブジェクトストレージの基礎/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /IAM — アクセス制御の基礎/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Cloud Monitoring — 可観測性の基礎/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Cloud Run functions — イベント駆動サーバーレス/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Pub\/Sub — 非同期メッセージング/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /総合演習：Challenge Lab/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /サービス横断ベストプラクティス早見表/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /よくあるエラーとトラブルシューティング/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /参考ソース一覧/i })).toBeInTheDocument();
    });

    it('DIAGRAMS が14個の定義を持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(14);
    });

    it('参照されるすべての diagram ID が DIAGRAMS に存在すること', () => {
        const REFERENCED_IDS = [
            'diag-arch-path',
            'diag-storage-console',
            'diag-storage-public',
            'diag-iam-basic',
            'diag-iam-sequence',
            'diag-iam-flow',
            'diag-monitoring-agent',
            'diag-monitoring-alert',
            'diag-functions-triggers',
            'diag-functions-deploy',
            'diag-functions-sa',
            'diag-pubsub-basic',
            'diag-pubsub-timing',
            'diag-challenge-arch',
        ];
        for (const id of REFERENCED_IDS) {
            expect(DIAGRAMS).toHaveProperty(id);
            expect(DIAGRAMS[id as keyof typeof DIAGRAMS]).toBeTruthy();
        }
    });

    it('コードコメントテキストが正しく表示されること', () => {
        expect(screen.getByText(/\/\/ タスク3: コード内の要点/)).toBeInTheDocument();
        expect(screen.getByText(/\/\/ sharpでリサイズしてサムネイルを生成/)).toBeInTheDocument();
    });
});

