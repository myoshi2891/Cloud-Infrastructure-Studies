// __tests__/recommended-books/understanding-the-linux-kernel/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/understanding-the-linux-kernel.json';
import Page from '@/app/recommended-books/understanding-the-linux-kernel/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Understanding the Linux Kernel 完全解説ガイド — 全量移行検証',
    Page,
    inventory,
);
