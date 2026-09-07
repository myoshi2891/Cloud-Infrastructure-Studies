import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const readWorkspaceFile = (path: string): string =>
    readFileSync(join(process.cwd(), path), 'utf8');

const escapeRegExp = (value: string): string =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const firstRule = (css: string, selector: string): string => {
    const match = css.match(new RegExp(`${escapeRegExp(selector)}\\s*\\{([^}]*)\\}`));
    expect(match, `missing CSS rule: ${selector}`).not.toBeNull();
    return match?.[1] ?? '';
};

const rulesAfterFirst = (css: string, selector: string): string[] => {
    const matches = [...css.matchAll(new RegExp(`${escapeRegExp(selector)}\\s*\\{([^}]*)\\}`, 'g'))];
    return matches.slice(1).map((match) => match[1] ?? '');
};

const guideLayouts = [
    ['app/aws/solutions-architect-associate/domain1/page.css', '.aws-saa-domain1-page #sidebar', '.aws-saa-domain1-page .main-content'],
    ['app/aws/solutions-architect-associate/domain2/page.css', '.domain2-page .sidebar', '.domain2-page .content'],
    ['app/aws/solutions-architect-associate/domain3/page.css', '.domain3-page .sidebar', '.domain3-page .content'],
    ['app/aws/solutions-architect-associate/domain4/page.css', '.domain4-page .sidebar', '.domain4-page .content'],
    ['app/aws/solutions-architect-associate/page.css', '.aws-saa-page .sidebar', '.aws-saa-page .main'],
    ['app/cisco/ccna/automation-api-guide/page.css', '.ccna-automation-api-page .sidebar', '.ccna-automation-api-page .main'],
    ['app/cisco/ccna/automation-application-deployment-security/page.css', '.ccna-app-deployment-security-page .sidebar', '.ccna-app-deployment-security-page .main'],
    ['app/cisco/ccna/automation-cisco-platforms-and-development/page.module.css', '.ccnaPlatformsDevPage :global(.sidebar)', '.ccnaPlatformsDevPage :global(.content)'],
    ['app/cisco/ccna/automation-software-development-design/page.css', '.ccna-software-dev-design-page .sidebar', '.ccna-software-dev-design-page .main'],
    ['app/cisco/ccna/beginner-guide/page.css', '.ccna-beginner-page .sidebar', '.ccna-beginner-page main'],
    ['app/cisco/ccna/ip-connectivity-guide/page.css', '.ccna-ip-connectivity-page .sidebar', '.ccna-ip-connectivity-page .main'],
    ['app/cisco/ccna/ip-services-guide/page.css', '.ccna-ip-services-page .sidebar', '.ccna-ip-services-page .main'],
    ['app/cisco/ccna/security-fundamentals/page.css', '.ccna-security-page .sidebar', '.ccna-security-page main'],
    ['app/gcl/agwa/agwa.css', '.sidebar', '.main'],
    ['app/gcl/agwa/section2/page.module.css', '.sidebar', '.main'],
    ['app/gcl/associate-cloud-engineer/complete-advanced-guide/page.css', '.complete-guide-page .sidebar', '.complete-guide-page .main'],
    ['app/gcl/associate-cloud-engineer/section1/page.css', '.ace-s1-page .sidebar', '.ace-s1-page .main'],
    ['app/gcl/associate-cloud-engineer/section2/page.css', '.ace-s2-page .sidebar', '.ace-s2-page .main'],
    ['app/gcl/associate-cloud-engineer/section3/page.module.css', '.sidebar', '.ace-section3-page :global(.main-content)'],
    ['app/gcl/associate-cloud-engineer/section4/page.module.css', '.sidebar', '.main'],
    ['app/gcl/hands-on/gke-private-cluster-security-guide/page.css', '.gke-security-guide-page .sidebar', '.gke-security-guide-page .main'],
    ['app/gcl/hands-on/griffin-wordpress-gke-guide/page.css', '.griffin-wordpress-gke-guide-page .sidebar', '.griffin-wordpress-gke-guide-page .main'],
    ['app/gcl/hands-on/iap-tcp-forwarding-best-practices-guide/page.css', '.iap-guide-page .sidebar', '.iap-guide-page main'],
    ['app/gcl/hands-on/terraform-gcp-challenge-lab-guide/page.css', '.terraform-lab-guide-page .sidebar', '.terraform-lab-guide-page .main'],
    ['app/recommended-books/site-reliability-engineering/page.css', '.sre-guide-page .sidebar', '.sre-guide-page .main'],
    ['app/recommended-books/the-devops-handbook/page.css', '.the-devops-handbook-page .sidebar', '.the-devops-handbook-page .main'],
    ['app/recommended-books/release-it/page.css', '.release-it-page .sidebar', '.release-it-page .main'],
    ['app/recommended-books/infrastructure-as-code/page.css', '.infrastructure-as-code-page .sidebar', '.infrastructure-as-code-page .main'],
    ['app/recommended-books/understanding-the-linux-kernel/page.css', '.understanding-the-linux-kernel-page .sidebar', '.understanding-the-linux-kernel-page .main'],
    ['app/recommended-books/unix-linux-sysadmin-handbook/page.css', '.unix-linux-sysadmin-handbook-page .sidebar', '.unix-linux-sysadmin-handbook-page .main'],
    ['app/recommended-books/systems-performance/page.css', '.systems-performance-page .sidebar', '.systems-performance-page .main'],
    ['app/recommended-books/operating-systems-three-easy-pieces/page.css', '.ostep-page .sidebar', '.ostep-page .main'],
] as const;

describe('all sidebar guide layouts', () => {
    it.each(guideLayouts)('%s fixes a 280px sidebar to the far left', (stylesheet, sidebarSelector) => {
        const rule = firstRule(readWorkspaceFile(stylesheet), sidebarSelector);

        expect(rule).toMatch(/position:\s*fixed\s*;/);
        expect(rule).toMatch(/left:\s*0\s*;/);
        expect(rule).toMatch(/width:\s*280px\s*;/);
    });

    it.each(guideLayouts)('%s gives the main canvas all remaining desktop width', (stylesheet, _sidebarSelector, mainSelector) => {
        const rule = firstRule(readWorkspaceFile(stylesheet), mainSelector);

        expect(rule).toMatch(/margin-left:\s*280px\s*;/);
        expect(rule).toMatch(/width:\s*calc\(100%\s*-\s*280px\)\s*;/);
        expect(rule).toMatch(/max-width:\s*none\s*;/);
        expect(rule).toMatch(/box-sizing:\s*border-box\s*;/);
    });

    it.each(guideLayouts)('%s restores a 100% main canvas in its responsive rule', (stylesheet, _sidebarSelector, mainSelector) => {
        const responsiveRules = rulesAfterFirst(readWorkspaceFile(stylesheet), mainSelector);

        expect(responsiveRules.some((rule) =>
            /margin-left:\s*0\s*;/.test(rule)
            && /width:\s*100%\s*;/.test(rule)
            && /max-width:\s*none\s*;/.test(rule),
        )).toBe(true);
    });

    it('removes narrow inner wrappers that previously re-constrained full-width guides', () => {
        const constrainedWrappers = [
            ['app/cisco/ccna/automation-application-deployment-security/page.css', '.ccna-app-deployment-security-page .content-inner'],
            ['app/gcl/hands-on/gke-private-cluster-security-guide/page.css', '.gke-security-guide-page .content-inner'],
            ['app/gcl/hands-on/griffin-wordpress-gke-guide/page.css', '.griffin-wordpress-gke-guide-page .content-inner'],
        ] as const;

        for (const [stylesheet, selector] of constrainedWrappers) {
            expect(firstRule(readWorkspaceFile(stylesheet), selector)).toMatch(/max-width:\s*none\s*;/);
        }
    });
});
