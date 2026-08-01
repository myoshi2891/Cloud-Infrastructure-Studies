'use client';

import React from 'react';

interface NavBarProps {
    activeId?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ activeId }) => {
    const navItems = [
        { id: 'sec1', icon: 'ti-target-arrow', label: '1. このラボで学ぶこと' },
        { id: 'sec2', icon: 'ti-topology-star-3', label: '2. 完成形のアーキテクチャ' },
        { id: 'sec3', icon: 'ti-terminal-2', label: '3. Terraform CLI の準備' },
        { id: 'divider-1', isDivider: true },
        { id: 'sec4', icon: 'ti-folders', label: '4. Task 1: ディレクトリ構成' },
        { id: 'sec5', icon: 'ti-download', label: '5. Task 2: import' },
        { id: 'sec6', icon: 'ti-cloud-lock', label: '6. Task 3: remote backend' },
        { id: 'sec7', icon: 'ti-adjustments', label: '7. Task 4: in-place update' },
        { id: 'sec8', icon: 'ti-trash', label: '8. Task 5: destroy' },
        { id: 'sec9', icon: 'ti-network', label: '9. Task 6: Registry module' },
        { id: 'sec10', icon: 'ti-shield-lock', label: '10. Task 7: firewall' },
        { id: 'divider-2', isDivider: true },
        { id: 'sec11', icon: 'ti-checklist', label: '11. ベストプラクティス総まとめ' },
        { id: 'sec12', icon: 'ti-books', label: '12. 参考文献・引用ソース' },
    ];

    return (
        <nav className="sidebar" aria-label="ページ内目次">
            <div className="sidebar-title">目次</div>
            <div className="sidebar-nav">
                {navItems.map((item, idx) => {
                    if (item.isDivider) {
                        return <div key={`divider-${idx}`} className="sidebar-divider" />;
                    }
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={isActive ? 'active' : ''}
                        >
                            <i className={`ti ${item.icon}`} />
                            {item.label}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
};
