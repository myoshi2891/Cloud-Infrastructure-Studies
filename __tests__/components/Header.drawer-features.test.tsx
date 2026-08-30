import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// next/navigation をモック化（active 判定用）
const pathnameMock = vi.fn<() => string | null>(() => '/');
vi.mock('next/navigation', () => ({
    usePathname: () => pathnameMock(),
}));

import { Header } from '@/components/Header';
import { pushRecent } from '@/lib/recentPages';

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
 * Helper to wait for the drawer to be fully removed from the DOM
 * (after the 270ms closeDrawer setTimeout resolves).
 */
async function waitForDrawerClosed() {
    await waitFor(
        () => {
            expect(screen.queryByRole('dialog', { name: 'サイトナビゲーション' })).not.toBeInTheDocument();
        },
        { timeout: 600 },
    );
}

beforeEach(() => {
    pathnameMock.mockReset();
    pathnameMock.mockReturnValue('/');
    window.localStorage.clear();
});

describe('Header ドロワー: アクティブリンク判定', () => {
    it('現在 pathname と一致する子リンクに aria-current="page" が付くこと', async () => {
        pathnameMock.mockReturnValue('/gcl/associate-cloud-engineer/domain1');
        const { dialog } = await openDrawer();
        const activeLink = within(dialog).getByRole('link', { name: /Domain 1: 環境設定/ });
        expect(activeLink).toHaveAttribute('aria-current', 'page');
    });

    it('現在 pathname と異なる子リンクには aria-current が付かないこと', async () => {
        pathnameMock.mockReturnValue('/gcl/associate-cloud-engineer/domain1');
        const { dialog } = await openDrawer();
        const other = within(dialog).getByRole('link', { name: /Domain 2/ });
        expect(other).not.toHaveAttribute('aria-current');
    });

    it('現在ページを含む試験アコーディオンは自動で open になること', async () => {
        pathnameMock.mockReturnValue('/gcl/associate-cloud-engineer/domain2');
        const { dialog } = await openDrawer();
        const summary = within(dialog).getByText('Associate Cloud Engineer', {
            selector: 'summary, summary *',
        });
        const details = summary.closest('details');
        expect(details).not.toBeNull();
        expect(details).toHaveAttribute('open');
    });

    it('現在ページに該当しない試験アコーディオンは閉じたままであること', async () => {
        pathnameMock.mockReturnValue('/gcl/associate-cloud-engineer/domain2');
        const { dialog } = await openDrawer();
        const summary = within(dialog).getByText('Generative AI Leader', {
            selector: 'summary, summary *',
        });
        const details = summary.closest('details');
        expect(details).not.toBeNull();
        expect(details).not.toHaveAttribute('open');
    });
});

describe('Header ドロワー: 検索フィルタ', () => {
    it('検索 input が描画されること', async () => {
        const { dialog } = await openDrawer();
        expect(within(dialog).getByRole('searchbox', { name: /検索/ })).toBeInTheDocument();
    });

    it('検索語が exam.label に部分一致する試験のみ表示すること', async () => {
        const { user, dialog } = await openDrawer();
        const input = within(dialog).getByRole('searchbox', { name: /検索/ });
        await user.type(input, 'cloud digital');
        expect(
            within(dialog).getByText('Cloud Digital Leader', { selector: 'summary, summary *' }),
        ).toBeInTheDocument();
        expect(
            within(dialog).queryByText('Generative AI Leader', { selector: 'summary, summary *' }),
        ).not.toBeInTheDocument();
        expect(
            within(dialog).queryByText('Associate Cloud Engineer', { selector: 'summary, summary *' }),
        ).not.toBeInTheDocument();
    });

    it('検索語が item.label に部分一致するときも該当試験を表示し、自動 open にすること', async () => {
        const { user, dialog } = await openDrawer();
        const input = within(dialog).getByRole('searchbox', { name: /検索/ });
        await user.type(input, '運用管理');
        const summary = within(dialog).getByText('Associate Cloud Engineer', {
            selector: 'summary, summary *',
        });
        const details = summary.closest('details');
        expect(details).toHaveAttribute('open');
        expect(within(dialog).getByRole('link', { name: /Domain 3/ })).toBeInTheDocument();
    });

    it('マッチが 0 件のとき空状態メッセージを描画すること', async () => {
        const { user, dialog } = await openDrawer();
        const input = within(dialog).getByRole('searchbox', { name: /検索/ });
        await user.type(input, 'zzzzz-no-match-zzzzz');
        const status = within(dialog).getByRole('status');
        expect(status).toHaveTextContent(/該当する項目はありません/);
    });

    it('検索中は「最近見たページ」セクションを非表示にすること', async () => {
        pushRecent({ href: '/seeded', label: 'Seeded Page' });
        const { user, dialog } = await openDrawer();
        expect(within(dialog).getByRole('navigation', { name: '最近見たページ' })).toBeInTheDocument();
        const input = within(dialog).getByRole('searchbox', { name: /検索/ });
        await user.type(input, 'cloud');
        expect(
            within(dialog).queryByRole('navigation', { name: '最近見たページ' }),
        ).not.toBeInTheDocument();
    });

    it('検索クリア後は全試験が再表示されること', async () => {
        const { user, dialog } = await openDrawer();
        const input = within(dialog).getByRole('searchbox', { name: /検索/ });
        await user.type(input, 'cloud digital');
        expect(
            within(dialog).queryByText('Generative AI Leader', { selector: 'summary, summary *' }),
        ).not.toBeInTheDocument();
        await user.clear(input);
        expect(
            within(dialog).getByText('Generative AI Leader', { selector: 'summary, summary *' }),
        ).toBeInTheDocument();
        expect(
            within(dialog).getByText('Associate Cloud Engineer', { selector: 'summary, summary *' }),
        ).toBeInTheDocument();
    });
});

describe('Header ドロワー: 最近見たページ', () => {
    it('履歴が空のとき「最近見たページ」セクションは描画されないこと', async () => {
        const { dialog } = await openDrawer();
        expect(
            within(dialog).queryByRole('navigation', { name: '最近見たページ' }),
        ).not.toBeInTheDocument();
    });

    it('履歴があるとき新しい順にチップが描画されること', async () => {
        pushRecent({ href: '/a', label: 'A page' });
        pushRecent({ href: '/b', label: 'B page' });
        pushRecent({ href: '/c', label: 'C page' });
        const { dialog } = await openDrawer();
        const nav = within(dialog).getByRole('navigation', { name: '最近見たページ' });
        const links = within(nav).getAllByRole('link');
        expect(links.map((a) => a.getAttribute('href'))).toEqual(['/c', '/b', '/a']);
        links.forEach((link, idx) => {
            const expectedLabels = ['C page', 'B page', 'A page'];
            expect(link.textContent).toContain(expectedLabels[idx]);
        });
    });

    it('チップクリックで Drawer が閉じること', async () => {
        pushRecent({ href: '/x', label: 'X' });
        const { user, dialog } = await openDrawer();
        const link = within(dialog).getByRole('link', { name: 'X' });
        await user.click(link);
        await waitForDrawerClosed();
    });
});
