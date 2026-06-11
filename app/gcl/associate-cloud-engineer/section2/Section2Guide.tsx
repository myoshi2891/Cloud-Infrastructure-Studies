'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from './NavBar';

export default function Section2Guide() {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="ace-s2-page">
            <div className="progress-bar" ref={progressRef} aria-hidden="true" />
            <NavBar />

            <div className="main">
                <div className="hero">
                    <h1 className="hero-title">
                        Planning &<br />
                        Implementing
                    </h1>
                    <div className="hero-eyebrow">
                        <span>2026年6月版対応</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-value">~30%</span>
                    </div>
                </div>

                <div className="content">
                    <div className="section-block" id="s21">
                        <h2>コンピューティングリソースの計画と実装</h2>
                        <div>Hyperdisk Balanced</div>
                        <div>Agent Runtime</div>
                    </div>
                    <div className="section-block" id="s22">
                        <h2>ストレージとデータソリューションの計画と実装</h2>
                    </div>
                    <div className="section-block" id="s23">
                        <h2>ネットワークリソースの計画と実装</h2>
                        <div>Cloud NGFW</div>
                    </div>
                    <div className="section-block" id="s24">
                        <h2>ツールを用いたリソースの計画と実装</h2>
                        <div>Fabric FAST</div>
                    </div>

                    <div className="section-block" id="summary">
                        <h2>頻出パターン別 解法ガイドと直前チェックリスト</h2>
                    </div>
                    <div className="section-block" id="checklist">
                        <h2>試験直前チェックリスト — Section 2 完全版</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
