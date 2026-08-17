// __tests__/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pcne-s4-cdn-dns-ipam.json';
import Page from '@/app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite('PCNE Section 4 — Cloud CDN・Cloud DNS・IPAM 全量移行検証', Page, inventory);
