// __tests__/recommended-books/unix-linux-sysadmin-handbook/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/unix-linux-sysadmin-handbook.json';
import Page from '@/app/recommended-books/unix-linux-sysadmin-handbook/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'UNIX and Linux System Administration Handbook 実践ガイド — 全量移行検証',
    Page,
    inventory,
);
