// __tests__/gcl/professional-cloud-network-engineer/section5-network-security/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pcne-s5-network-security.json';
import Page from '@/app/gcl/professional-cloud-network-engineer/section5-network-security/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite('PCNE Section 5 — ネットワークセキュリティの設計と実装 全量移行検証', Page, inventory);
