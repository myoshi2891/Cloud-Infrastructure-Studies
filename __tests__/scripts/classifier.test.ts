import { describe, it, expect } from 'vitest';
import {
    classifyCell,
    domainOf,
    buildActions,
    DOMAINS,
} from '../../scripts/lib/classifier.mjs';

describe('classifier / classifyCell', () => {
    it('should return missing when no tests cover the cell', () => {
        const result = classifyCell({ tests: [], coveredSources: 0, sources: 5 });
        expect(result.status).toBe('missing');
    });

    it('should return ok when coverage ratio is exactly 80%', () => {
        const result = classifyCell({ tests: ['a.test.ts'], coveredSources: 4, sources: 5 });
        expect(result.status).toBe('ok');
    });

    it('should return ok when coverage ratio exceeds 80%', () => {
        const result = classifyCell({ tests: ['a.test.ts'], coveredSources: 5, sources: 5 });
        expect(result.status).toBe('ok');
    });

    it('should return warn when coverage ratio is below 80% but greater than 0', () => {
        const result = classifyCell({ tests: ['a.test.ts'], coveredSources: 2, sources: 10 });
        expect(result.status).toBe('warn');
    });

    it('should return missing when sources is 0', () => {
        const result = classifyCell({ tests: [], coveredSources: 0, sources: 0 });
        expect(result.status).toBe('missing');
    });

    it('should include coverageRate as a number between 0 and 1', () => {
        const result = classifyCell({ tests: ['x'], coveredSources: 3, sources: 4 });
        expect(result.coverageRate).toBeCloseTo(0.75);
    });
});

describe('classifier / domainOf', () => {
    it('declares CCNA and DevNet as first-class dashboard domains', () => {
        expect(DOMAINS).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: 'ccna', provider: 'Cisco' }),
            expect.objectContaining({ id: 'devnet', provider: 'Cisco' }),
        ]));
    });

    it('maps Cisco CCNA and DevNet sources to their own domains', () => {
        expect(domainOf('app/cisco/ccna/network-fundamentals-guide/page.tsx')).toBe('ccna');
        expect(domainOf('app/cisco/devnet-associate/page.module.css')).toBe('devnet');
        expect(domainOf('app/cisco/devnet-professional/DevNetProfessionalGuide.tsx')).toBe('devnet');
    });

    it('should map app/gcl/associate-cloud-engineer/page.tsx to ace', () => {
        expect(domainOf('app/gcl/associate-cloud-engineer/page.tsx')).toBe('ace');
    });

    it('should map app/gcl/genai-leader/section1/page.tsx to genai-leader', () => {
        expect(domainOf('app/gcl/genai-leader/section1/page.tsx')).toBe('genai-leader');
    });

    it('should map app/gcl/cloud-digital-leader/section3/page.tsx to cloud-digital-leader', () => {
        expect(domainOf('app/gcl/cloud-digital-leader/section3/page.tsx')).toBe('cloud-digital-leader');
    });

    it('should map app/gcl/agwa/section1/page.tsx to agwa', () => {
        expect(domainOf('app/gcl/agwa/section1/page.tsx')).toBe('agwa');
    });

    it('should map app/gcl/professional-cloud-network-engineer/page.tsx to pcne', () => {
        expect(domainOf('app/gcl/professional-cloud-network-engineer/page.tsx')).toBe('pcne');
    });

    it('should map app/gcl/professional-cloud-network-engineer-step-by-step/page.tsx to pcne-step', () => {
        expect(domainOf('app/gcl/professional-cloud-network-engineer-step-by-step/page.tsx')).toBe('pcne-step');
    });

    it('should map components/Header.tsx to common', () => {
        expect(domainOf('components/Header.tsx')).toBe('common');
    });

    it('should map lib/utils.ts to common', () => {
        expect(domainOf('lib/utils.ts')).toBe('common');
    });

    it('should map app/navigation.ts and app/constants.ts to common', () => {
        expect(domainOf('app/navigation.ts')).toBe('common');
        expect(domainOf('app/constants.ts')).toBe('common');
    });
});

describe('classifier / buildActions', () => {
    it('should generate P0 action when lib Integration cell is missing', () => {
        const cells = [
            { domain: 'common', category: 'Integration', status: 'missing', sources: 2, coveredSources: 0, tests: [] },
        ];
        const actions = buildActions(cells, { libSourceCount: 2, libIntegrationCoveredCount: 0 });
        const firstAction = actions[0];
        expect(firstAction).toBeDefined();
        if (!firstAction) return;
        expect(firstAction.priority).toBe('P0');
        expect(firstAction.area).toMatch(/lib|共通|common/i);
    });

    it('should not generate a P0 action when every canonical lib target is covered', () => {
        const cells = [
            { domain: 'common', category: 'Integration', status: 'warn', sources: 36, coveredSources: 4, tests: ['navigation', 'recentPages', 'utils'] },
        ];

        const actions = buildActions(cells, {
            libSourceCount: 2,
            libIntegrationCoveredCount: 2,
        });

        expect(actions).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ priority: 'P0' }),
        ]));
    });

    it('should generate P1 action when exam domain has zero E2E tests', () => {
        const cells = [
            { domain: 'agwa', category: 'E2E', status: 'missing', sources: 3, coveredSources: 0, tests: [] },
        ];
        const actions = buildActions(cells, { libSourceCount: 0 });
        const p1 = actions.find((a) => a.priority === 'P1');
        expect(p1).toBeDefined();
        if (!p1) return;
        expect(p1.area).toMatch(/E2E|agwa/i);
    });

    it('should generate P2 action when Visual category has no coverage across all domains', () => {
        const cells = [
            { domain: 'ace', category: 'Visual', status: 'missing', sources: 5, coveredSources: 0, tests: [] },
            { domain: 'agwa', category: 'Visual', status: 'missing', sources: 3, coveredSources: 0, tests: [] },
        ];
        const actions = buildActions(cells, { libSourceCount: 0 });
        const p2 = actions.find((a) => a.priority === 'P2');
        expect(p2).toBeDefined();
        if (!p2) return;
        expect(p2.area).toMatch(/Visual/i);
    });

    it('should sort actions by priority then by impact', () => {
        const cells = [
            { domain: 'agwa', category: 'E2E', status: 'missing', sources: 3, coveredSources: 0, tests: [] },
            { domain: 'common', category: 'Integration', status: 'missing', sources: 2, coveredSources: 0, tests: [] },
            { domain: 'ace', category: 'Visual', status: 'missing', sources: 5, coveredSources: 0, tests: [] },
        ];
        const actions = buildActions(cells, { libSourceCount: 2, libIntegrationCoveredCount: 0 });
        const priorities = actions.map((a) => a.priority);
        const firstPriority = priorities[0];
        const lastPriority = priorities[priorities.length - 1];
        expect(firstPriority).toBe('P0');
        expect(lastPriority).toBe('P2');
    });
});
