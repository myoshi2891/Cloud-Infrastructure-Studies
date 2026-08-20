'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

/**
 * サイドバーナビゲーションコンポーネント (Client Component)
 *
 * IntersectionObserver による ScrollSpy と、キーボード操作に対応したハッシュ・フォーカス更新を提供します。
 */
const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);
const DEFAULT_ACTIVE_ID = NAV_ITEMS[0]?.id ?? 'overview';

/**
 * URL のハッシュが目次のセクションを指していれば、その id を返します。
 *
 * @returns 目次に存在するセクション id。該当しない場合は null。
 */
function readHashSectionId(): string | null {
    if (typeof window === 'undefined') return null;
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    return SECTION_IDS.includes(id) ? id : null;
}

export function NavBar() {
    const [activeId, setActiveId] = useState<string>(DEFAULT_ACTIVE_ID);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    // 直リンクやブラウザの戻る/進むで URL が変わったとき、目次の active を追随させる。
    // 初期値を state 初期化子で読まないのは、SSR の描画結果と食い違わせないため。
    useEffect(() => {
        const syncFromHash = () => {
            const id = readHashSectionId();
            if (id !== null) setActiveId(id);
        };

        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        window.addEventListener('popstate', syncFromHash);

        return () => {
            window.removeEventListener('hashchange', syncFromHash);
            window.removeEventListener('popstate', syncFromHash);
        };
    }, []);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const elements = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // 複数のセクションが同時に交差する。エントリ順に setActiveId を呼ぶと
                // 最後に評価されたものが勝ち、active が下方のセクションへ飛ぶ。
                // 交差中のうちビューポート最上部にあるものだけを採用する。
                const topmost = entries
                    .filter((entry) => entry.isIntersecting)
                    .reduce<IntersectionObserverEntry | null>(
                        (current, entry) =>
                            current === null || entry.boundingClientRect.top < current.boundingClientRect.top
                                ? entry
                                : current,
                        null,
                    );
                if (topmost !== null) setActiveId(topmost.target.id);
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            // 修飾キー付き・副ボタンのクリックは「新しいタブで開く」等のブラウザ既定動作。
            // キーボードでの activation は button 0 / 修飾なしで届くため、ここは通り抜ける。
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            e.preventDefault();
            setActiveId(id);
            setMobileOpen(false);

            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus();
            }
        },
        [],
    );

    return (
        <>
            <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="guide-sidebar"
                aria-label="目次ナビゲーションを開閉"
            >
                <i className={`ti ${mobileOpen ? 'ti-x' : 'ti-menu-2'}`}></i>
                <span>目次</span>
            </button>
            <aside
                id="guide-sidebar"
                className={`sidebar ${mobileOpen ? 'open' : ''}`}
                aria-label="サイドバー目次"
            >
                <div className="sidebar-title">
                    <i className="ti ti-network"></i>
                    目次
                </div>
                {' '}
                <nav aria-label="ページ内目次">
                    {NAV_ITEMS.map((item: NavItem) => (
                        <React.Fragment key={item.id}>
                            {item.sectionLabel && (
                                <>
                                    <span className="section-label">{item.sectionLabel}</span>
                                    {' '}
                                </>
                            )}
                            <a
                                href={`#${item.id}`}
                                className={activeId === item.id ? 'active' : ''}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={(e) => handleNavClick(e, item.id)}
                            >
                                <i className={item.icon}></i>
                                {item.title}
                            </a>
                            {' '}
                        </React.Fragment>
                    ))}
                </nav>
            </aside>
        </>
    );
}
