import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const readWorkspaceFile = (path: string): string =>
    readFileSync(join(process.cwd(), path), 'utf8');

describe('guide content width constraints', () => {
    it.each([
        {
            name: 'GKE private cluster security guide',
            component: 'app/gcl/hands-on/gke-private-cluster-security-guide/GkePrivateClusterSecurityGuide.tsx',
            stylesheet: 'app/gcl/hands-on/gke-private-cluster-security-guide/page.css',
        },
        {
            name: 'Griffin WordPress GKE guide',
            component: 'app/gcl/hands-on/griffin-wordpress-gke-guide/GriffinWordPressGkeGuide.tsx',
            stylesheet: 'app/gcl/hands-on/griffin-wordpress-gke-guide/page.css',
        },
    ])('$name keeps the main canvas full width and centers an inner content wrapper', ({ component, stylesheet }) => {
        const componentSource = readWorkspaceFile(component);
        const css = readWorkspaceFile(stylesheet);

        expect(componentSource).toMatch(/<main className="main">\s*<div className="content-inner">/);
        expect(css).toMatch(/\.content-inner\s*\{[^}]*max-width:\s*\d+px;[^}]*margin-inline:\s*auto;/s);
    });

    it('CCNA software development centers hero and section content inside full-width backgrounds', () => {
        const css = readWorkspaceFile(
            'app/cisco/ccna/automation-software-development-design/page.css',
        );

        expect(css).toMatch(/\.hero\s*>\s*\*,[\s\S]*\.section\s*>\s*\*\s*\{[^}]*max-width:\s*\d+px;[^}]*margin-inline:\s*auto;/);
    });
});
