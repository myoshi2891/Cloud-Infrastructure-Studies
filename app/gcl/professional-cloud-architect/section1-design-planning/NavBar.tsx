'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

/**
 * {@link NavBar} のプロパティ。開閉状態は親ページが所有し、NavBar は表示と通知のみを担う。
 *
 * @property isOpen - サイドバーが開いているか。`true` のとき `.sidebar` に `open` クラスが付く。
 * @property onToggle - トグルボタン押下時に呼ばれ、親側で `isOpen` を反転させる。
 * @property onClose - 目次リンクへの遷移後に呼ばれ、親側でサイドバーを閉じる。
 */
interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCA Section 1（設計と計画）ガイドのサイドバー目次。
 *
 * IntersectionObserver によるスクロールスパイで現在位置の見出しをハイライトし、
 * 目次リンクのクリックでスムーススクロールと URL ハッシュ更新を行う。
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    // 交差中の見出し id。再レンダリングを挟まずコールバック間で状態を持ち越す
    const intersectingRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const navLevel2Items = NAV_ITEMS.filter((item) => item.level === 2);
        const targetElements = navLevel2Items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);

        if (targetElements.length === 0) return;
        if (typeof IntersectionObserver === 'undefined') return;

        const intersecting = intersectingRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                // IntersectionObserver のコールバックには「交差状態が変化した」見出ししか
                // 含まれない。交差中の見出しを ref 上の Set に保持し、そこから毎回
                // ビューポート最上部（= 文書順で最初）の見出しを選び直す
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        intersecting.add(entry.target.id);
                    } else {
                        intersecting.delete(entry.target.id);
                    }
                }

                const topMost = navLevel2Items.find((item) => intersecting.has(item.id));
                if (topMost) setActiveId(topMost.id);
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );

        targetElements.forEach((el) => observer.observe(el));

        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollY + windowHeight >= docHeight - 40) {
                const lastItem = navLevel2Items[navLevel2Items.length - 1];
                if (lastItem) setActiveId(lastItem.id);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // 初期表示時点で既にページ末尾にいる場合も最終項目をアクティブにする
        handleScroll();

        return () => {
            observer.disconnect();
            intersecting.clear();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!activeId) return;
        const activeLink = document.querySelector(`.sidebar nav a[href="#${activeId}"]`);
        if (activeLink && typeof activeLink.scrollIntoView === 'function') {
            activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [activeId]);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                // smooth スクロールを focus のデフォルトスクロールで中断させない
                target.focus({ preventScroll: true });
                setActiveId(id);
                onClose();
            }
        },
        [onClose],
    );

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="目次を開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={onToggle}
            >
                &#9776;
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <span className="dot"></span>
                    {' '}
                    <span>PCA セクション1ガイド</span>
                </div>
                {' '}
                <nav id="sideNav" aria-label="セクション目次">
                    <ul>
                        {NAV_ITEMS.filter((item) => item.level === 2).map((item: NavItem) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={activeId === item.id ? 'active' : ''}
                                    aria-current={activeId === item.id ? 'location' : undefined}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                                {' '}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
