import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const readWorkspaceFile = (path: string): string =>
    readFileSync(join(process.cwd(), path), 'utf8');

const themeTokens = [
    '--color-gcp-purple: #9334e6;',
    '--color-gcp-teal: #00bcd4;',
    '--color-gcp-card-hover: #1a2035;',
    '--color-gcp-code-background: #0d1117;',
    '--color-gcp-border: rgba(var(--color-google-blue-rgb), 0.2);',
    '--color-gcp-border-bright: rgba(var(--color-google-blue-rgb), 0.5);',
    '--color-gcp-accent-glow: rgba(var(--color-google-blue-rgb), 0.15);',
] as const;

describe('ACE Section 1 theme token ownership', () => {
    it('keeps the GCP guide tokens on the owning page scope and out of globals.css', () => {
        const globals = readWorkspaceFile('app/globals.css');
        const pageStyles = readWorkspaceFile(
            'app/gcl/associate-cloud-engineer/section1/page.css',
        );

        for (const token of themeTokens) {
            expect(pageStyles).toContain(token);
            expect(globals).not.toContain(token);
        }
    });

    it('imports the dedicated stylesheet directly from the owning page', () => {
        const page = readWorkspaceFile(
            'app/gcl/associate-cloud-engineer/section1/page.tsx',
        );

        expect(page).toContain("import './page.css';");
    });
});
