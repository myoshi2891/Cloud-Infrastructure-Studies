import { describe, it, expect } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/Header';

/**
 * Helper to render Header and open the navigation drawer.
 */
async function openDrawer() {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
    return { user, dialog: screen.getByRole('dialog', { name: 'サイトナビゲーション' }) };
}

/**
 * Helper to close the drawer and wait for the 270ms exit animation to finish.
 * Uses waitFor to poll until the dialog is removed from the DOM.
 */
async function waitForDrawerClosed() {
    await waitFor(
        () => {
            expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
        },
        { timeout: 600 },
    );
}

describe('Header ハンバーガーメニュー', () => {
    it('ハンバーガーボタンが常時表示されること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: 'メニューを開く' });
        expect(button).toBeInTheDocument();
    });

    it('初期状態で aria-expanded が false であること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: 'メニューを開く' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-haspopup', 'dialog');
        expect(button).toHaveAttribute('aria-controls', 'site-nav-drawer');
    });

    it('初期状態で Drawer (dialog) が描画されていないこと', () => {
        render(<Header />);
        expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
    });

    it('ハンバーガーボタンをクリックすると Drawer が開くこと', async () => {
        const user = userEvent.setup();
        render(<Header />);
        const button = screen.getByRole('button', { name: 'メニューを開く' });
        await user.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('dialog', { name: 'サイトナビゲーション' })).toBeInTheDocument();
    });

    it('Drawer の z-index は 100 を超える値であること（ページ内 sticky nav z-100 を貫通させないため）', async () => {
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
        const dialog = screen.getByRole('dialog', { name: 'サイトナビゲーション' });
        const match = Array.from(dialog.classList).find((c) => /^z-\[\d+\]$/.test(c));
        expect(match, `dialog must declare an arbitrary Tailwind z-index utility, got: ${dialog.className}`).toBeDefined();
        const zValue = Number(match!.replace(/^z-\[(\d+)\]$/, '$1'));
        expect(zValue).toBeGreaterThan(100);
    });

    it('Drawer 内のクローズボタンで閉じられること', async () => {
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
        await user.click(screen.getByRole('button', { name: 'メニューを閉じる' }));
        // closeDrawer() 内の setTimeout(270ms) を waitFor でポーリング待機
        await waitForDrawerClosed();
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute('aria-expanded', 'false');
    });
});

describe('Header ドロワー内 NavTree 描画', () => {
    it('プロバイダ見出し「Google Cloud」「Amazon Web Services」が描画されること', async () => {
        const { dialog } = await openDrawer();
        expect(within(dialog).getByRole('heading', { name: 'Google Cloud' })).toBeInTheDocument();
        expect(within(dialog).getByRole('heading', { name: 'Amazon Web Services' })).toBeInTheDocument();
    });

    it('GCP 配下に 5 試験のアコーディオン summary が描画されること', async () => {
        const { dialog } = await openDrawer();
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
        const { dialog } = await openDrawer();
        expect(
            within(dialog).getByText(/AWS Certified Solutions Architect/, { selector: 'summary, summary *' }),
        ).toBeInTheDocument();
    });

    it('GCP/ACE アコーディオン内に Domain 1 リンク（/gcl/associate-cloud-engineer/domain1）が存在すること', async () => {
        const { dialog } = await openDrawer();
        const link = within(dialog).getByRole('link', { name: /Domain 1: 環境設定/ });
        expect(link).toHaveAttribute('href', '/gcl/associate-cloud-engineer/domain1');
    });

    it('GCP/Generative AI Leader アコーディオン内に Section 1 リンク（/gcl/genai-leader/section1）が存在すること', async () => {
        const { dialog } = await openDrawer();
        const link = within(dialog).getByRole('link', { name: /Section 1: Gen AI 基礎/ });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section1');
    });

    it('AWS SAA アコーディオン内に概要およびドメイン1〜4のリンクが存在すること', async () => {
        const { dialog } = await openDrawer();
        const awsHeading = within(dialog).getByRole('heading', { name: 'Amazon Web Services' });
        const awsSection = awsHeading.closest('section');
        expect(awsSection).not.toBeNull();
        const awsScope = within(awsSection as HTMLElement);
        expect(awsScope.getByRole('link', { name: /概要/ })).toHaveAttribute('href', '/aws/solutions-architect-associate');
        expect(awsScope.getByRole('link', { name: /ドメイン1: セキュアなアーキテクチャの設計/ })).toHaveAttribute('href', '/aws/solutions-architect-associate/domain1');
        expect(awsScope.getByRole('link', { name: /ドメイン4: コスト最適化アーキテクチャの設計/ })).toHaveAttribute('href', '/aws/solutions-architect-associate/domain4');
    });

    it('Escape キーで Drawer が閉じること', async () => {
        const { user } = await openDrawer();
        await user.keyboard('{Escape}');
        await waitForDrawerClosed();
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('Drawer 開時に最初のフォーカスがクローズボタンへ移動すること', async () => {
        await openDrawer();
        // フォーカス移動は setTimeout(0) のため waitFor で待機
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'メニューを閉じる' })).toHaveFocus();
        });
    });

    it('Drawer 閉時にフォーカスがハンバーガーボタンへ戻ること', async () => {
        const { user } = await openDrawer();
        await user.keyboard('{Escape}');
        await waitForDrawerClosed();
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveFocus();
    });

    it('Drawer 開時に body のスクロールがロックされ、閉時に復元されること', async () => {
        const { user } = await openDrawer();
        expect(document.body.style.overflow).toBe('hidden');
        await user.keyboard('{Escape}');
        await waitForDrawerClosed();
        expect(document.body.style.overflow).toBe('');
    });

    it('Drawer 内 Shift+Tab は最初の要素から最後の要素へ循環すること', async () => {
        const { user } = await openDrawer();
        // フォーカスがクローズボタンへ移動するのを待つ
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'メニューを閉じる' })).toHaveFocus();
        });
        // Shift+Tab で末尾へ wrap
        await user.keyboard('{Shift>}{Tab}{/Shift}');
        const dialog = screen.getByRole('dialog', { name: 'サイトナビゲーション' });
        const summaries = dialog.querySelectorAll('summary');
        expect(summaries[summaries.length - 1]).toHaveFocus();
    });

    it('Drawer 内リンクをクリックすると Drawer が閉じること', async () => {
        const { user, dialog } = await openDrawer();
        const link = within(dialog).getByRole('link', { name: /Domain 1: 環境設定/ });
        await user.click(link);
        await waitForDrawerClosed();
        expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute('aria-expanded', 'false');
    });
});
