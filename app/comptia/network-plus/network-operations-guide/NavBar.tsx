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
    const raw = window.location.hash.replace(/^#/, '');
    // 壊れたパーセントエスケープ（例: "#%"）は decodeURIComponent が URIError を投げる。
    // 例外を effect の外へ漏らすとマウント自体が失敗するため、ここで「該当なし」に倒す。
    let id: string;
    try {
        id = decodeURIComponent(raw);
    } catch (error) {
        if (error instanceof URIError) return null;
        throw error;
    }
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

        // IntersectionObserver は「交差状態が変化した要素」だけを entries に載せる。
        // 都度の entries だけで最上部を決めると、上方のセクションが交差したまま
        // 下方のセクションだけが後続コールバックに現れた際に active が飛ぶ。
        // 交差中の集合をコールバックをまたいで保持し、その中の最上部を採用する。
        const intersectingTops = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        intersectingTops.set(entry.target.id, entry.boundingClientRect.top);
                        continue;
                    }
                    intersectingTops.delete(entry.target.id);
                }

                let topmostId: string | null = null;
                let topmostTop = Number.POSITIVE_INFINITY;
                for (const [id, top] of intersectingTops) {
                    if (top >= topmostTop) continue;
                    topmostId = id;
                    topmostTop = top;
                }
                if (topmostId !== null) setActiveId(topmostId);
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
