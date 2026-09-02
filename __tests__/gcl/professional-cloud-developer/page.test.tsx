// __tests__/gcl/professional-cloud-developer/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/professional-cloud-developer.json';
import Page from '@/app/gcl/professional-cloud-developer/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Google Cloud Professional Cloud Developer（PCD）認定試験 学習ガイド — 全量移行検証',
    Page,
    inventory,
);
