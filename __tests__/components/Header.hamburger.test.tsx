import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/Header';

describe('Header ハンバーガーメニュー', () => {
    it('ハンバーガーボタンが常時表示されること', () => {
        // Arrange & Act
        render(<Header />);

        // Assert
        const button = screen.getByRole('button', { name: 'メニューを開く' });
        expect(button).toBeInTheDocument();
    });

    it('初期状態で aria-expanded が false であること', () => {
        // Arrange & Act
        render(<Header />);

        // Assert
        const button = screen.getByRole('button', { name: 'メニューを開く' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-haspopup', 'dialog');
        expect(button).toHaveAttribute('aria-controls', 'site-nav-drawer');
    });

    it('初期状態で Drawer (dialog) が描画されていないこと', () => {
        // Arrange & Act
        render(<Header />);

        // Assert
        expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
    });

    it('ハンバーガーボタンをクリックすると Drawer が開くこと', async () => {
        // Arrange
        const user = userEvent.setup();
        render(<Header />);
        const button = screen.getByRole('button', { name: 'メニューを開く' });

        // Act
        await user.click(button);

        // Assert
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('dialog', { name: 'サイトナビゲーション' })).toBeInTheDocument();
    });

    it('Drawer 内のクローズボタンで閉じられること', async () => {
        // Arrange
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));

        // Act
        await user.click(screen.getByRole('button', { name: 'メニューを閉じる' }));

        // Assert
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
        expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
    });
});
