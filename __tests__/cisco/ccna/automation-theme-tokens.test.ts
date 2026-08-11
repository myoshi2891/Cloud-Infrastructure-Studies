import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const readWorkspaceFile = (path: string): string =>
    readFileSync(join(process.cwd(), path), 'utf8');

const pageStylePaths = [
    'app/cisco/ccna/automation-application-deployment-security/page.css',
    'app/cisco/ccna/automation-programmability/page.css',
    'app/cisco/ccna/automation-network-fundamentals/page.css',
] as const;

const expectedGlobalTokens = [
    '--color-ccna-automation-app-panel',
    '--color-ccna-automation-app-border',
    '--color-ccna-automation-app-foreground',
    '--color-ccna-automation-app-foreground-muted',
    '--color-ccna-automation-app-warning',
    '--color-ccna-automation-app-code-background',
    '--color-ccna-programmability-panel',
    '--color-ccna-programmability-card',
    '--color-ccna-programmability-card-alt',
    '--color-ccna-programmability-accent-soft',
    '--color-ccna-programmability-foreground',
    '--color-ccna-programmability-foreground-muted',
    '--color-ccna-programmability-foreground-faint',
    '--color-ccna-network-elevated',
    '--color-ccna-network-card',
    '--color-ccna-network-border',
    '--color-ccna-network-accent-soft',
    '--color-ccna-network-foreground-muted',
    '--color-ccna-network-foreground-faint',
    '--font-ccna-automation-sans',
    '--font-ccna-automation-mono',
    '--font-ccna-network-mono',
    '--radius-guide-card',
] as const;

const extractCustomPropertyNames = (css: string): string[] =>
    Array.from(css.matchAll(/(?<![\w-])(--[\w-]+)\s*:/g), (match) => match[1]);

describe('CCNA automation theme token ownership', () => {
    it('defines shared tokens once in globals.css and none in page styles', () => {
        const globals = readWorkspaceFile('app/globals.css');
        const globalPropertyNames = extractCustomPropertyNames(globals);

        for (const token of expectedGlobalTokens) {
            expect(globalPropertyNames.filter((name) => name === token)).toHaveLength(1);
        }
        for (const path of pageStylePaths) {
            expect(extractCustomPropertyNames(readWorkspaceFile(path))).toEqual([]);
        }
    });

    it('keeps the Network Fundamentals sidebar below the Header drawer', () => {
        const css = readWorkspaceFile(
            'app/cisco/ccna/automation-network-fundamentals/page.css',
        );
        const sidebarRule = css.match(
            /\.ccna-network-fundamentals-page \.sidebar\s*\{([^}]*)\}/,
        );

        expect(sidebarRule?.[1]).toContain('z-index: 100');
    });

    it('stacks the Network Access layout vertically on mobile', () => {
        const css = readWorkspaceFile('app/cisco/ccna/network-access-guide/page.css');
        const mobileRules = css.match(/@media \(max-width: 900px\)\s*\{([\s\S]*)\}\s*$/);

        expect(mobileRules?.[1]).toMatch(
            /\.network-access-page \.layout\s*\{[^}]*flex-direction:\s*column/,
        );
    });
});
