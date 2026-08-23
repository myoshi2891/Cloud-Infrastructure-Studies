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
 * PCA 完全対策ガイドのサイドバー目次。
 *
 * IntersectionObserver によるスクロールスパイで現在位置の見出しをハイライトし、
 * 目次リンクのクリックでスムーススクロールと URL ハッシュ更新を行う。
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    // 交差中の見出し id。再レンダリングを挟まずコールバック間で状態を持ち越す
    const intersectingRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const targetElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null,
        );

        if (targetElements.length === 0) return;

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

                const topMost = NAV_ITEMS.find((item) => intersecting.has(item.id));
                if (topMost) setActiveId(topMost.id);
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );

        targetElements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
            intersecting.clear();
        };
    }, []);

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
                    <div className="brand-title">Google Cloud<br />Professional Cloud Architect</div>
                    {' '}
                    <div className="brand-sub">認定試験 完全対策ガイド</div>
                </div>
                {' '}
                <nav className="sidebar-nav" id="sidebarNav" aria-label="セクション目次">
                    {NAV_ITEMS.map((item: NavItem) => (
                        <span key={item.id}>
                            <a
                                href={`#${item.id}`}
                                data-target={item.id}
                                className={`${item.level === 2 ? 'nav-l2' : 'nav-l3'} ${activeId === item.id ? 'active' : ''}`}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={(e) => handleNavClick(e, item.id)}
                            >
                                {item.label}
                            </a>
                            {' '}
                        </span>
                    ))}
                </nav>
            </aside>
        </>
    );
}
