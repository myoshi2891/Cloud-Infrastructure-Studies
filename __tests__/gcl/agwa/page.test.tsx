import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AgwaPage from '@/app/gcl/agwa/page';

describe('AGWA トップページ', () => {
    it('main ランドマークが描画されること', () => {
        render(<AgwaPage />);
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('main 要素には .main クラスが付与されていること（レイアウト幅をフル幅に展開する CSS フック）', () => {
        render(<AgwaPage />);
        expect(screen.getByRole('main')).toHaveClass('main');
    });

    it('hero に AGWA タイトルが含まれること', () => {
        render(<AgwaPage />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Workspace/i);
    });

    it('サイドバーに 6 つの出題ドメインリンクが含まれること', () => {
        render(<AgwaPage />);
        for (const id of ['s1', 's2', 's3', 's4', 's5', 's6']) {
            const link = document.querySelector(`a[href="#${id}"]`);
            expect(link, `expected sidebar link to #${id}`).not.toBeNull();
        }
    });

    it('主要セクション (s1〜s6) が DOM 内に存在すること', () => {
        render(<AgwaPage />);
        for (const id of ['s1', 's2', 's3', 's4', 's5', 's6']) {
            const section = document.getElementById(id);
            expect(section, `expected section #${id}`).not.toBeNull();
        }
    });
});
