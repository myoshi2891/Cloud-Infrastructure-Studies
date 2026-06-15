import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import fs from 'fs';
import path from 'path';

describe('スモークテスト', () => {
    it('Home ページがレンダリングされること', () => {
        render(<Home />);
        // h1 内で "Cloud Infrastructure" と "Studies" が別要素に分かれているため
        // getByRole でアクセシブル名を検索する
        expect(screen.getByRole('heading', { level: 1, name: /cloud infrastructure/i })).toBeInTheDocument();
    });

    it('should verify that .app-layout uses block layout (Red Phase)', () => {
        const cssPath = path.resolve(__dirname, '../app/gcl/associate-cloud-engineer/section3/page.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // .ace-section3-page .app-layout { ... } ブロック内に display: block が指定されているかを正規表現で検証
        // 修正前は display: grid なので失敗します
        const appLayoutBlockRegex = /\.ace-section3-page\s+\.app-layout\s*\{[^}]*display:\s*block[^}]*\}/;
        expect(cssContent).toMatch(appLayoutBlockRegex);
    });
});
