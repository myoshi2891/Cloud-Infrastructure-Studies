'use client';

import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'overview', label: '全体像' },
    { id: 's41', label: '4.1 NAT（静的/プール）' },
    { id: 's42', label: '4.2 NTP' },
    { id: 's43', label: '4.3 DHCP / DNS' },
    { id: 's44', label: '4.4 SNMP' },
    { id: 's45', label: '4.5 Syslog' },
    { id: 's46', label: '4.6 DHCPリレー' },
    { id: 's47', label: '4.7 QoS PHB' },
    { id: 's48', label: '4.8 SSH' },
    { id: 's49', label: '4.9 TFTP / FTP' },
    { id: 'summary', label: 'まとめ' },
    { id: 'sources', label: '出典・参考資料' },
];

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => {
            sections.forEach((sec) => observer.unobserve(sec));
        };
    }, []);

    return (
        <aside className="sidebar">
            <div className="sidebar-title">Cisco CCNA 200-301</div>
            <div className="sidebar-subtitle">IP Services 完全ガイド</div>
            <div className="sidebar-badge">配点比率 10%</div>

            <div className="nav-group-label">目次</div>
            <nav aria-label="Table of Contents">
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={activeId === item.id ? 'active' : ''}
                                data-nav
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
