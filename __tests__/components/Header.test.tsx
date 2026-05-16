import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/Header';
import { EXAMS } from '@/app/constants';

// Header の最小契約を表現する。詳細な開閉挙動・フォーカス制御は
// Header.hamburger.test.tsx 側でカバーし、ここでは構造とリンク網羅性のみを担保する。
describe('Header (drawer nav)', () => {
    it('サイトタイトル（ホームへのリンク）が表示されること', () => {
        // Arrange & Act
        render(<Header />);

        // Assert
        const home = screen.getByRole('link', { name: /cloud infrastructure studies/i });
        expect(home).toHaveAttribute('href', '/');
    });

    it('nav 要素として描画されること', () => {
        // Arrange & Act
        render(<Header />);

        // Assert
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('ハンバーガーボタンが Drawer を制御する aria 属性を持つこと', () => {
        // Arrange & Act
        render(<Header />);
        const trigger = screen.getByRole('button', { name: 'メニューを開く' });

        // Assert
        expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
        expect(trigger).toHaveAttribute('aria-controls', 'site-nav-drawer');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('Drawer 内に「Google Cloud」「Amazon Web Services」のプロバイダ見出しが描画されること', async () => {
        // Arrange
        const user = userEvent.setup();
        render(<Header />);

        // Act
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));

        // Assert
        const dialog = screen.getByRole('dialog', { name: 'サイトナビゲーション' });
        expect(within(dialog).getByRole('heading', { name: 'Google Cloud' })).toBeInTheDocument();
        expect(
            within(dialog).getByRole('heading', { name: 'Amazon Web Services' }),
        ).toBeInTheDocument();
    });

    it('Drawer に EXAMS の全試験（available 分）の概要リンクと domain リンクが網羅されること', async () => {
        // Arrange
        const user = userEvent.setup();
        render(<Header />);

        // Act
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));

        // Assert: coming-soon を除く全試験について、概要 (exam.href) と各 domain.href が <a> として描画される
        const dialog = screen.getByRole('dialog', { name: 'サイトナビゲーション' });
        const hrefs = Array.from(dialog.querySelectorAll('a')).map((a) => a.getAttribute('href'));
        for (const exam of EXAMS) {
            if (exam.status === 'coming-soon') continue;
            expect(hrefs).toContain(exam.href);
            for (const domain of exam.domains) {
                expect(hrefs).toContain(domain.href);
            }
        }
    });

    it('coming-soon 試験は Drawer 内にリンクを持たないこと', async () => {
        // Arrange
        const user = userEvent.setup();
        render(<Header />);

        // Act
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));

        // Assert
        const dialog = screen.getByRole('dialog', { name: 'サイトナビゲーション' });
        const hrefs = Array.from(dialog.querySelectorAll('a')).map((a) => a.getAttribute('href'));
        for (const exam of EXAMS) {
            if (exam.status !== 'coming-soon') continue;
            expect(hrefs).not.toContain(exam.href);
        }
    });
});
