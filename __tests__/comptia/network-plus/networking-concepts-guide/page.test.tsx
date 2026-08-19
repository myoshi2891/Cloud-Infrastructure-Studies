// __tests__/comptia/network-plus/networking-concepts-guide/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/comptia-network-plus-networking-concepts-guide.json';
import Page from '@/app/comptia/network-plus/networking-concepts-guide/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CompTIA Network+ Networking Concepts Guide — 全量移行検証',
    Page,
    inventory,
);
