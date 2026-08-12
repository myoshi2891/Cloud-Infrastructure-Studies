import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('Cisco guide theme token ownership', () => {
    it('CCNA fundamentals and DevNet Associate tokens are scoped to their owning guides', () => {
        const globals = read('app/globals.css');
        const ccnaCss = read('app/cisco/ccna/network-fundamentals-guide/page.css');
        const associateCss = read('app/cisco/devnet-associate/page.module.css');

        expect(globals).not.toContain('--color-ccna-fundamentals-');
        expect(globals).not.toContain('--color-devnet-associate-');
        expect(ccnaCss).toContain('--color-ccna-fundamentals-elevated: #0d1a2e');
        expect(associateCss).toContain('--color-devnet-associate-panel: #0d1b2e');
    });

    it('affected guide declarations reference theme tokens instead of raw colors', () => {
        const ccnaCss = read('app/cisco/ccna/network-fundamentals-guide/page.css');
        const associateCss = read('app/cisco/devnet-associate/page.module.css');
        const homeCss = read('app/page.module.css');

        expect(ccnaCss).not.toMatch(/background:\s*linear-gradient\(90deg,\s*#ffffff/);
        expect(ccnaCss).not.toMatch(/(?:background|color):\s*(?:#[0-9a-f]{6}|rgba\()/i);
        expect(associateCss).not.toMatch(/background:\s*linear-gradient\(90deg,\s*#ffffff/);
        expect(associateCss).not.toMatch(/(?:background|color):\s*(?:#cfe0ff|rgba\()/i);
        expect(homeCss).not.toContain(
            'background: linear-gradient(145deg, rgba(255,255,255,.028), rgba(255,255,255,.008))'
        );
    });

    it('DevNet Professional uses CSS Modules without a page-level global CSS import', () => {
        const directory = 'app/cisco/devnet-professional';
        const page = read(`${directory}/page.tsx`);
        const guide = read(`${directory}/DevNetProfessionalGuide.tsx`);
        const nav = read(`${directory}/NavBar.tsx`);

        expect(existsSync(`${directory}/page.module.css`)).toBe(true);
        expect(existsSync(`${directory}/page.css`)).toBe(false);
        expect(page).not.toContain("import './page.css'");
        expect(guide).toContain("import styles from './page.module.css'");
        expect(nav).toContain("import styles from './page.module.css'");
        expect(guide).not.toMatch(/className="[^"]+"/);
        expect(nav).not.toMatch(/className="[^"]+"/);
    });
});
