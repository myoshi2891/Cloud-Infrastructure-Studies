// __tests__/gcl/professional-cloud-architect/section1-design-planning/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pca-section1-design-planning.json';
import Page from '@/app/gcl/professional-cloud-architect/section1-design-planning/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'PCA Section 1: クラウドソリューションアーキテクチャの設計と計画 — 全量移行検証',
    Page,
    inventory,
);
