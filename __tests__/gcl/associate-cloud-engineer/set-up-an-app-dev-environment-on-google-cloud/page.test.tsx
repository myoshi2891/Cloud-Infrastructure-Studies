import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '@/app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page';
import { DIAGRAMS } from '@/app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/constants';

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart }: { chart: string }) {
        return <pre data-testid="mermaid">{chart}</pre>;
    },
}));

describe('Set Up an App Dev Environment on Google Cloud ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページがレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /保存・権限・処理・通知/ })).toBeInTheDocument();
    });

    it('TOC がレンダリングされること', () => {
        const nav = screen.getByRole('navigation', { name: /セクションナビゲーション/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(10);
    });

    it('DIAGRAMS が7個のキーを持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(7);
    });

    it('ページが参照する全ての diagram id が DIAGRAMS に存在すること', () => {
        const REFERENCED_IDS = [
            'diag-learning-path',
            'diag-storage-flow',
            'diag-iam-relation',
            'diag-iam-revoke',
            'diag-func-pipeline',
            'diag-pubsub-fanout',
            'diag-gsp315-arch',
        ];
        for (const id of REFERENCED_IDS) {
            expect(DIAGRAMS).toHaveProperty(id);
            expect(DIAGRAMS[id as keyof typeof DIAGRAMS]).toBeTruthy();
        }
    });
});
