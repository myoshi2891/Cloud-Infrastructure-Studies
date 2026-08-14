import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('スモークテスト', () => {
    it('Home ページがレンダリングされること', () => {
        render(<Home />);
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: 'インフラの知識を、確かな実力へ。',
            })
        ).toBeInTheDocument();
    });

    it('should verify that .app-layout uses block layout (Red Phase)', () => {
        const cssPath = path.resolve(__dirname, '../app/gcl/associate-cloud-engineer/section3/page.module.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // .app-layout { ... } ブロック内に display: block が指定されているかを正規表現で検証
        const appLayoutBlockRegex = /\.app-layout\s*\)?\s*\{[^}]*display:\s*block[^}]*\}/;
        expect(cssContent).toMatch(appLayoutBlockRegex);
    });
});
