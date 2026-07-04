import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '@/app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page';
import { DIAGRAMS } from '@/app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/constants';

describe('Build a Secure Google Cloud Network ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページがレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getByRole('heading', { name: /Google Cloud/ })).toBeInTheDocument();
    });

    it('TOC がレンダリングされること', () => {
        const nav = screen.getByRole('navigation', { name: /セクションナビゲーション/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(10);
    });

    it('DIAGRAMS が11個のキーを持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(11);
    });

    it('ページが参照する全ての diagram id が DIAGRAMS に存在すること', () => {
        const REFERENCED_IDS = [
            'diag-flowchart-overview',
            'diag-reachability-internal',
            'diag-fw-network-tag',
            'diag-iam-network-roles',
            'diag-iap-seq-diagram',
            'diag-iap-flowchart',
            'diag-glb-flowchart',
            'diag-armor-blocking',
            'diag-ilb-flowchart',
            'diag-composite-exercise',
            'diag-securing-steps',
        ];
        for (const id of REFERENCED_IDS) {
            expect(DIAGRAMS).toHaveProperty(id);
            expect(DIAGRAMS[id as keyof typeof DIAGRAMS]).toBeTruthy();
        }
    });
});
