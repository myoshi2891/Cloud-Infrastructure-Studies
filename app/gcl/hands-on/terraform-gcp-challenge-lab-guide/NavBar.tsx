'use client';

import React from 'react';
import { NAVIGATION_ITEMS } from './constants';

interface NavBarProps {
    activeId?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ activeId }) => {
    return (
        <nav className="sidebar" aria-label="ページ内目次">
            <div className="sidebar-title">目次</div>
            <div className="sidebar-nav">
                {NAVIGATION_ITEMS.map((item) => {
                    if (item.isDivider) {
                        return <div key={item.id} className="sidebar-divider" />;
                    }
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={isActive ? 'active' : ''}
                        >
                            <i className={`ti ${item.icon}`} aria-hidden="true" />
                            {item.label}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
};
