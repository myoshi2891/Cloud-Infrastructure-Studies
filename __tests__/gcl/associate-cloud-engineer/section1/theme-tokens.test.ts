import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const readWorkspaceFile = (path: string): string =>
    readFileSync(join(process.cwd(), path), 'utf8');

const themeTokens = [
    '--color-gcp-purple',
    '--color-gcp-teal',
    '--color-gcp-card-hover',
    '--color-gcp-code-background',
    '--color-gcp-border',
    '--color-gcp-border-bright',
    '--color-gcp-accent-glow',
] as const;

const extractCustomPropertyNames = (css: string): string[] =>
    Array.from(css.matchAll(/(?<![\w-])(--[\w-]+)\s*:/g), (match) => match[1]);

describe('ACE Section 1 theme token ownership', () => {
    it('defines each shared GCP guide token once in globals.css and not on the page scope', () => {
        const globals = readWorkspaceFile('app/globals.css');
        const pageStyles = readWorkspaceFile(
            'app/gcl/associate-cloud-engineer/section1/page.css',
        );
        const globalPropertyNames = extractCustomPropertyNames(globals);
        const pagePropertyNames = extractCustomPropertyNames(pageStyles);

        for (const token of themeTokens) {
            expect(globalPropertyNames.filter((name) => name === token)).toHaveLength(1);
            expect(pagePropertyNames).not.toContain(token);
        }
    });

    it('imports the dedicated stylesheet directly from the owning page', () => {
        const page = readWorkspaceFile(
            'app/gcl/associate-cloud-engineer/section1/page.tsx',
        );

        expect(page).toContain("import './page.css';");
    });
});
