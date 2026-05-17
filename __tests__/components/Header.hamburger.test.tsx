import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/Header';

async function openDrawer() {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
    return { user, dialog: screen.getByRole('dialog', { name: 'サイトナビゲーション' }) };
}

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

describe('Header ドロワー内 NavTree 描画', () => {
    it('プロバイダ見出し「Google Cloud」「Amazon Web Services」が描画されること', async () => {
        // Arrange & Act
        const { dialog } = await openDrawer();

        // Assert
        expect(within(dialog).getByRole('heading', { name: 'Google Cloud' })).toBeInTheDocument();
        expect(
            within(dialog).getByRole('heading', { name: 'Amazon Web Services' }),
        ).toBeInTheDocument();
    });

    it('GCP 配下に 5 試験のアコーディオン summary が描画されること', async () => {
        // Arrange & Act
        const { dialog } = await openDrawer();

        // Assert
        const expected = [
            'Associate Cloud Engineer',
            'Generative AI Leader',
            'Cloud Digital Leader',
            'Associate Google Workspace Administrator',
            'Professional Cloud Network Engineer',
        ];
        for (const label of expected) {
            expect(within(dialog).getByText(label, { selector: 'summary, summary *' })).toBeInTheDocument();
        }
    });

    it('AWS 配下に SAA アコーディオン summary が描画されること', async () => {
        // Arrange & Act
        const { dialog } = await openDrawer();

        // Assert
        expect(
            within(dialog).getByText(/AWS Certified Solutions Architect/, {
                selector: 'summary, summary *',
            }),
        ).toBeInTheDocument();
    });

    it('GCP/ACE アコーディオン内に Domain 1 リンク（/gcl/associate-cloud-engineer/domain1）が存在すること', async () => {
        // Arrange & Act
        const { dialog } = await openDrawer();

        // Assert
        const link = within(dialog).getByRole('link', {
            name: /Domain 1: 環境設定/,
        });
        expect(link).toHaveAttribute('href', '/gcl/associate-cloud-engineer/domain1');
    });

    it('GCP/Generative AI Leader アコーディオン内に Section 1 リンク（/gcl/genai-leader/section1）が存在すること', async () => {
        // Arrange & Act
        const { dialog } = await openDrawer();

        // Assert
        const link = within(dialog).getByRole('link', { name: /Section 1: Gen AI 基礎/ });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section1');
    });

    it('AWS SAA は「準備中」ラベル付きで、外部リンクを描画しないこと', async () => {
        // Arrange & Act
        const { dialog } = await openDrawer();

        // Assert
        const awsHeading = within(dialog).getByRole('heading', { name: 'Amazon Web Services' });
        const awsSection = awsHeading.closest('section');
        expect(awsSection).not.toBeNull();
        const awsScope = within(awsSection as HTMLElement);
        expect(awsScope.getByText(/準備中/)).toBeInTheDocument();
        expect(awsScope.queryByRole('link', { name: /概要/ })).not.toBeInTheDocument();
        expect(
            awsScope.queryByRole('link', { name: /Solutions Architect/ }),
        ).not.toBeInTheDocument();
    });

    it('Escape キーで Drawer が閉じること', async () => {
        // Arrange
        const { user } = await openDrawer();

        // Act
        await user.keyboard('{Escape}');

        // Assert
        expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });

    it('Drawer 開時に最初のフォーカスがクローズボタンへ移動すること', async () => {
        // Arrange & Act
        await openDrawer();

        // Assert
        expect(screen.getByRole('button', { name: 'メニューを閉じる' })).toHaveFocus();
    });

    it('Drawer 閉時にフォーカスがハンバーガーボタンへ戻ること', async () => {
        // Arrange
        const { user } = await openDrawer();

        // Act
        await user.keyboard('{Escape}');

        // Assert
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveFocus();
    });

    it('Drawer 開時に body のスクロールがロックされ、閉時に復元されること', async () => {
        // Arrange
        const { user } = await openDrawer();

        // Assert (開時)
        expect(document.body.style.overflow).toBe('hidden');

        // Act
        await user.keyboard('{Escape}');

        // Assert (閉時)
        expect(document.body.style.overflow).toBe('');
    });

    it('Drawer 内 Shift+Tab は最初の要素から最後の要素へ循環すること', async () => {
        // Arrange
        const { user } = await openDrawer();
        // 開時に最初のフォーカスはクローズボタン（先頭要素）
        expect(screen.getByRole('button', { name: 'メニューを閉じる' })).toHaveFocus();

        // Act: Shift+Tab で末尾へ wrap
        await user.keyboard('{Shift>}{Tab}{/Shift}');

        // Assert: 全 details 閉時の最後の tabbable は最後の summary（AWS SAA アコーディオン）
        // summary は details が閉じていても常時タブ可能（<a> リンクは closed details 内は除外）
        // JSDOM では summary が button role として expose されないため querySelectorAll で取得
        const dialog = screen.getByRole('dialog', { name: 'サイトナビゲーション' });
        const summaries = dialog.querySelectorAll('summary');
        expect(summaries[summaries.length - 1]).toHaveFocus();
    });

    it('Drawer 内リンクをクリックすると Drawer が閉じること', async () => {
        // Arrange
        const { user, dialog } = await openDrawer();
        const link = within(dialog).getByRole('link', { name: /Domain 1: 環境設定/ });

        // Act
        await user.click(link);

        // Assert
        expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });
});
