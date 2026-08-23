// __tests__/gcl/professional-cloud-architect/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/professional-cloud-architect.json';
import Page from '@/app/gcl/professional-cloud-architect/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Professional Cloud Architect Guide — 全量移行検証',
    Page,
    inventory,
);
