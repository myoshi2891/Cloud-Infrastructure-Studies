'use client';

import React from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    activeSection: string;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Client component for rendering the sidebar navigation tree and handling anchor navigation.
 */
export const NavBar: React.FC<NavBarProps> = ({ activeSection, isOpen, onClose }) => {
    // Group navigation items
    const overviewItems = NAV_ITEMS.filter((item) => !item.group);
    const taskItems = NAV_ITEMS.filter((item) => item.group === 'タスク別解説');
    const summaryItems = NAV_ITEMS.filter((item) => item.group === 'まとめ');

    const handleClick = () => {
        onClose();
    };

    return (
        <aside
            className={`sidebar ${isOpen ? 'is-open' : ''}`}
            id="table-of-contents"
            aria-label="目次"
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
