'use client';

import React, { useEffect, useState } from 'react';

export function NavBar() {
    const [activeId, setActiveId] = useState('');

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
            { rootMargin: '-20% 0px -60% 0px' }
        );

        const sections = document.querySelectorAll('.section-block[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar">
            <div className="brand">Google Cloud PCNE</div>
            {" "}
            <div className="brand-sub">
                Section 1: Designing and planning a Google Cloud VPC network
            </div>
            {" "}
            <nav>
                <ul>
                    <li>
                        <a
                            href="#この章について"
                            className={activeId === "この章について" ? "active" : ""}
                        >
                            この章について
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#試験全体における本セクションの位置づけ"
                            className={activeId === "試験全体における本セクションの位置づけ" ? "active" : ""}
                        >
                            試験全体における本セクションの位置づけ
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#11-全体的なネットワークアーキテクチャの設計"
                            className={activeId === "11-全体的なネットワークアーキテクチャの設計" ? "active" : ""}
                        >
                            1.1 全体的なネットワークアーキテクチャの設計
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#12-vpcネットワークの設計"
                            className={activeId === "12-vpcネットワークの設計" ? "active" : ""}
                        >
                            1.2 VPCネットワークの設計
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#13-耐障害性高性能なハイブリッドマルチクラウドネットワークの設計"
                            className={activeId === "13-耐障害性高性能なハイブリッドマルチクラウドネットワークの設計" ? "active" : ""}
                        >
                            1.3 耐障害性・高性能なハイブリッド/マルチクラウドネットワークの設計
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#14-gke向けの設計"
                            className={activeId === "14-gke向けの設計" ? "active" : ""}
                        >
                            1.4 GKE向けの設計
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#設計チェックリスト"
                            className={activeId === "設計チェックリスト" ? "active" : ""}
                        >
                            設計チェックリスト
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#まとめ"
                            className={activeId === "まとめ" ? "active" : ""}
                        >
                            まとめ
                        </a>
                    </li> {" "}
                    <li>
                        <a
                            href="#参考文献出典"
                            className={activeId === "参考文献出典" ? "active" : ""}
                        >
                            参考文献・出典
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
