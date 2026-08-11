'use client';

import { useEffect, useState } from 'react';

const TOC_ITEMS = [
    { id: 'overview', label: '1. このセクションの全体像' },
    { id: 'prerequisites', label: '2. 前提知識：スイッチングの基礎' },
    { id: 'vlan', label: '3. 2.1 VLANの設定と検証' },
    { id: 'trunk', label: '4. 2.2 スイッチ間接続（トランク）' },
    { id: 'discovery', label: '5. 2.3 CDP・LLDP' },
    { id: 'etherchannel', label: '6. 2.4 EtherChannel（LACP）' },
    { id: 'stp', label: '7. 2.5 Rapid PVST+' },
    { id: 'wireless-arch', label: '8. 2.6 無線アーキテクチャ／APモード' },
    { id: 'wlan-physical', label: '9. 2.7 WLAN物理接続' },
    { id: 'mgmt-access', label: '10. 2.8 デバイス管理アクセス' },
    { id: 'wlan-gui', label: '11. 2.9 WLAN GUI設定' },
    { id: 'exam-tips', label: '12. 試験対策：引っかけポイント' },
    { id: 'hands-on', label: '13. ハンズオン学習の進め方' },
    { id: 'summary', label: '14. まとめ表' },
    { id: 'sources', label: '15. 参考資料・出典' },
];

/**
 * Renders sidebar navigation for the CCNA Network Access guide and tracks the active section.
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { threshold: 0, rootMargin: '-15% 0px -75% 0px' }
        );

        TOC_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sidebar" id="sidebar">
            <div className="sidebar-brand">
                CCNA 200-301<span>Network Access</span>
            </div>
            <ol className="toc">
                {TOC_ITEMS.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={activeId === item.id ? 'active' : ''}
                            aria-current={activeId === item.id ? 'location' : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = document.getElementById(item.id);
                                if (target) {
                                    target.scrollIntoView({ behavior: 'smooth' });
                                    setActiveId(item.id);
                                }
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
