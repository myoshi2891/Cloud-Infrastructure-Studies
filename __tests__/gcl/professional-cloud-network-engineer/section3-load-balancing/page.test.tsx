// __tests__/gcl/professional-cloud-network-engineer/section3-load-balancing/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pcne-s3-load-balancing.json';
import Page from '@/app/gcl/professional-cloud-network-engineer/section3-load-balancing/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite('PCNE Section 3 — ロードバランシングとトラフィック管理 全量移行検証', Page, inventory);
