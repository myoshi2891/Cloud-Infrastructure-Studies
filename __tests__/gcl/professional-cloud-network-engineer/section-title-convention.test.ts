import { describe, expect, it } from 'vitest';

import { metadata as section1 } from '@/app/gcl/professional-cloud-network-engineer/section1-vpc-design/page';
import { metadata as section2 } from '@/app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page';
import { metadata as section3 } from '@/app/gcl/professional-cloud-network-engineer/section3-load-balancing/page';
import { metadata as section4 } from '@/app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page';
import { metadata as section5 } from '@/app/gcl/professional-cloud-network-engineer/section5-network-security/page';
import { metadata as section6 } from '@/app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page';

/**
 * PCNE セクションページの `<title>` 規約。
 *
 * `app/gcl/professional-cloud-network-engineer/layout.tsx` が `title` を
 * プレーン文字列で定義しているため、ルート layout の
 * `template: '%s | Cloud Infrastructure Studies'` はこのサブツリーでは適用されない。
 * セクションページの title は自動接尾辞に頼れず、自己完結している必要がある。
 */
const TITLE_PATTERN = /^PCNE S[1-6]: .+ \| Google Cloud 認定試験対策$/;

const SECTIONS = [
    ['S1', section1],
    ['S2', section2],
    ['S3', section3],
    ['S4', section4],
    ['S5', section5],
    ['S6', section6],
] as const;

describe('PCNE セクションページの title 規約', () => {
    it.each(SECTIONS)('%s の title が `PCNE S{n}: <名称> | Google Cloud 認定試験対策` 形式である', (label, metadata) => {
        expect(typeof metadata.title).toBe('string');
        expect(metadata.title as string).toMatch(TITLE_PATTERN);
        expect(metadata.title as string).toContain(`PCNE ${label}:`);
    });

    it('6セクションの title が互いに重複しない', () => {
        const titles = SECTIONS.map(([, metadata]) => metadata.title as string);
        expect(new Set(titles).size).toBe(titles.length);
    });
});
