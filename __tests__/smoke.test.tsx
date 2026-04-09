import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('スモークテスト', () => {
    it('Home ページがレンダリングされること', () => {
        render(<Home />);
        // h1 内で "Cloud Infrastructure" と "Studies" が別要素に分かれているため
        // getByRole でアクセシブル名を検索する
        expect(screen.getByRole('heading', { level: 1, name: /cloud infrastructure/i })).toBeInTheDocument();
    });
});
