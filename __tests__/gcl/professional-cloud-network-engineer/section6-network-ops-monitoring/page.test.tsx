// __tests__/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pcne-s6-network-ops-monitoring.json';
import Page from '@/app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite('PCNE Section 6 — ネットワーク操作と監視 全量移行検証', Page, inventory);
