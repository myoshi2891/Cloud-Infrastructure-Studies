'use client';

import React from 'react';

interface NavBarProps {
    activeId?: string;
}

/** Renders the Network Fundamentals table of contents and marks the supplied section active. */
export default function NavBar({ activeId = 'overview' }: NavBarProps) {
    const getItemClass = (id: string) => (activeId === id ? 'active' : '');

    return (
        <aside className="sidebar">
            <div className="brand">CCNA Automation ／ 200-901 CCNAAUTO</div>
            <div className="brand-title">
                Network Fundamentals
                <br />
                ドメイン解説ガイド
            </div>
            <nav aria-label="サイドバーナビゲーション">
                <a href="#overview" className={getItemClass('overview')} aria-current={getItemClass('overview') ? 'location' : undefined}>はじめに</a>
                <a href="#step0" className={getItemClass('step0')} aria-current={getItemClass('step0') ? 'location' : undefined}>Step 0：ドメイン全体像</a>

                <div className="nav-group-label">6.1〜6.4：基礎知識と機器</div>
                <a href="#step1" className={getItemClass('step1')} aria-current={getItemClass('step1') ? 'location' : undefined}>Step 1：MAC/VLAN（6.1）</a>
                <a href="#step2" className={getItemClass('step2')} aria-current={getItemClass('step2') ? 'location' : undefined}>Step 2：IPアドレス系（6.2）</a>
                <a href="#step3" className={getItemClass('step3')} aria-current={getItemClass('step3') ? 'location' : undefined}>Step 3：ネットワーク機器（6.3）</a>
                <a href="#step4" className={getItemClass('step4')} aria-current={getItemClass('step4') ? 'location' : undefined}>Step 4：トポロジ図（6.4）</a>

                <div className="nav-group-label">6.5〜6.7：仕組みとサービス</div>
                <a href="#step5" className={getItemClass('step5')} aria-current={getItemClass('step5') ? 'location' : undefined}>Step 5：3つのPlane（6.5）</a>
                <a href="#step6" className={getItemClass('step6')} aria-current={getItemClass('step6') ? 'location' : undefined}>Step 6：IPサービス（6.6）</a>
                <a href="#step7" className={getItemClass('step7')} aria-current={getItemClass('step7') ? 'location' : undefined}>Step 7：ポート番号（6.7）</a>

                <div className="nav-group-label">6.8〜6.9：診断と応用</div>
                <a href="#step8" className={getItemClass('step8')} aria-current={getItemClass('step8') ? 'location' : undefined}>Step 8：接続トラブル診断（6.8）</a>
                <a href="#step9" className={getItemClass('step9')} aria-current={getItemClass('step9') ? 'location' : undefined}>Step 9：ネットワーク制約（6.9）</a>

                <a href="#summary" className={getItemClass('summary')} aria-current={getItemClass('summary') ? 'location' : undefined}>まとめ</a>
                <a href="#references" className={getItemClass('references')} aria-current={getItemClass('references') ? 'location' : undefined}>参考情報</a>
            </nav>
        </aside>
    );
}
