'use client';

import React, { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

/** page.css の off-canvas ブレークポイント（max-width: 900px）と一致させる */
const MOBILE_QUERY = '(max-width: 900px)';

interface NavBarProps {
    activeSection: string;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Client component for rendering the sidebar navigation tree and handling anchor navigation.
 *
 * モバイル幅では page.css が `transform: translateX(-100%)` で目次を画面外へ退避するだけなので、
 * DOM 上には残り Tab 順・支援技術ツリーに露出したままになる。閉じている間は aria-hidden / inert で
 * 明示的に除外し、デスクトップ幅（常時表示）では常に操作可能なままにする。
 */
export const NavBar: React.FC<NavBarProps> = ({ activeSection, isOpen, onClose }) => {
    // Group navigation items
    const overviewItems = NAV_ITEMS.filter((item) => !item.group);
    const taskItems = NAV_ITEMS.filter((item) => item.group === 'タスク別解説');
    const summaryItems = NAV_ITEMS.filter((item) => item.group === 'まとめ');

    // SSR 時は false 起点。ハイドレーション後に実際のビューポート幅へ追従する
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;

        const mql = window.matchMedia(MOBILE_QUERY);
        const sync = () => setIsMobile(mql.matches);

        sync();
        mql.addEventListener('change', sync);
        return () => mql.removeEventListener('change', sync);
    }, []);

    // モバイル幅で閉じている間だけ、フォーカスと支援技術から切り離す
    const isHiddenFromA11yTree = isMobile && !isOpen;

    const handleClick = () => {
        onClose();
    };

    return (
        <aside
            className={`sidebar ${isOpen ? 'is-open' : ''}`}
            id="table-of-contents"
            aria-label="目次"
            aria-hidden={isHiddenFromA11yTree || undefined}
            inert={isHiddenFromA11yTree || undefined}
        >
            <div className="sidebar-brand">
                <i className="ti ti-cloud" aria-hidden="true" />
                <span>Team Griffin ガイド</span>
            </div>
            <nav aria-label="目次">
                {overviewItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeSection === item.id ? 'active' : ''}
                        aria-current={activeSection === item.id ? 'location' : undefined}
                        onClick={handleClick}
                    >
                        <i className={`ti ${item.icon}`} aria-hidden="true" />
                        {item.label}
                    </a>
                ))}

                <div className="sidebar-group-label">タスク別解説</div>
                {taskItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeSection === item.id ? 'active' : ''}
                        aria-current={activeSection === item.id ? 'location' : undefined}
                        onClick={handleClick}
                    >
                        <i className={`ti ${item.icon}`} aria-hidden="true" />
                        {item.label}
                    </a>
                ))}

                <div className="sidebar-group-label">まとめ</div>
                {summaryItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeSection === item.id ? 'active' : ''}
                        aria-current={activeSection === item.id ? 'location' : undefined}
                        onClick={handleClick}
                    >
                        <i className={`ti ${item.icon}`} aria-hidden="true" />
                        {item.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
};
