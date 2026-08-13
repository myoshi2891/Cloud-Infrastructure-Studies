import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('Cisco guide theme token ownership', () => {
    it('keeps all three guide token definitions in the global theme layer', () => {
        const globals = read('app/globals.css');
        const stylesheets = [
            read('app/cisco/ccna/network-fundamentals-guide/page.css'),
            read('app/cisco/devnet-associate/page.module.css'),
            read('app/cisco/devnet-professional/page.module.css'),
        ];

        expect(globals).toContain('--color-ccna-fundamentals-elevated: #0d1a2e');
        expect(globals).toContain('--color-devnet-associate-panel: #0d1b2e');
        expect(globals).toContain('--color-devnet-professional-background: #07111e');
        for (const css of stylesheets) {
            expect(css).not.toMatch(/^\s*--[\w-]+\s*:/m);
        }
    });

    it('affected guide declarations reference theme tokens instead of raw colors', () => {
        const ccnaCss = read('app/cisco/ccna/network-fundamentals-guide/page.css');
        const associateCss = read('app/cisco/devnet-associate/page.module.css');
        const professionalCss = read('app/cisco/devnet-professional/page.module.css');
        const homeCss = read('app/page.module.css');

        expect(ccnaCss).not.toMatch(/background:\s*linear-gradient\(90deg,\s*#ffffff/);
        expect(ccnaCss).not.toMatch(
            /(?:background|color):\s*(?:#[0-9a-f]{6}|rgba\()/i
        );
        expect(associateCss).not.toMatch(/background:\s*linear-gradient\(90deg,\s*#ffffff/);
        expect(associateCss).not.toMatch(
            /(?:background|color):\s*(?:#cfe0ff|rgba\()/i
        );
        expect(professionalCss).not.toMatch(
            /(?:background(?:-color)?|color|border(?:-left|-right|-top|-bottom)?):\s*(?:#[0-9a-f]{3,8}|rgba\()/i
        );
        expect(homeCss).not.toContain(
            'background: linear-gradient(145deg, rgba(255,255,255,.028), rgba(255,255,255,.008))'
        );
    });

    it('reserves the desktop sidebar width without globally limiting main content', () => {
        const css = read('app/cisco/devnet-professional/page.module.css');
        const rule = (selector: string) => css.match(
            new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`)
        )?.[1] ?? '';

        expect(rule('.page .layout')).not.toContain('padding-left');
        expect(rule('.page .main')).toMatch(/margin-left:\s*280px/);
        expect(rule('.page .main')).toMatch(/width:\s*calc\(100%\s*-\s*280px\)/);
        expect(rule('.page .main')).toMatch(/max-width:\s*none/);
        expect(rule('.page .hero')).not.toContain('max-width');
        expect(rule('.page .hero')).not.toMatch(/margin-(?:left|inline):\s*auto/);
        expect(rule('.page section.section')).not.toContain('max-width');
        expect(rule('.page section.section')).not.toMatch(/margin-(?:left|inline):\s*auto/);
        expect(css).not.toMatch(/max-width:\s*1200px/);
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
