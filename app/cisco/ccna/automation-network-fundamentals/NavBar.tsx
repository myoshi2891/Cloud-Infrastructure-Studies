'use client';

import React from 'react';

interface NavBarProps {
    activeId?: string;
}

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
                <a href="#overview" className={getItemClass('overview')}>はじめに</a>
                <a href="#step0" className={getItemClass('step0')}>Step 0：ドメイン全体像</a>

                <div className="nav-group-label">6.1〜6.4：基礎知識と機器</div>
                <a href="#step1" className={getItemClass('step1')}>Step 1：MAC/VLAN（6.1）</a>
                <a href="#step2" className={getItemClass('step2')}>Step 2：IPアドレス系（6.2）</a>
                <a href="#step3" className={getItemClass('step3')}>Step 3：ネットワーク機器（6.3）</a>
                <a href="#step4" className={getItemClass('step4')}>Step 4：トポロジ図（6.4）</a>

                <div className="nav-group-label">6.5〜6.7：仕組みとサービス</div>
                <a href="#step5" className={getItemClass('step5')}>Step 5：3つのPlane（6.5）</a>
                <a href="#step6" className={getItemClass('step6')}>Step 6：IPサービス（6.6）</a>
                <a href="#step7" className={getItemClass('step7')}>Step 7：ポート番号（6.7）</a>

                <div className="nav-group-label">6.8〜6.9：診断と応用</div>
                <a href="#step8" className={getItemClass('step8')}>Step 8：接続トラブル診断（6.8）</a>
                <a href="#step9" className={getItemClass('step9')}>Step 9：ネットワーク制約（6.9）</a>

                <a href="#summary" className={getItemClass('summary')}>まとめ</a>
                <a href="#references" className={getItemClass('references')}>参考情報</a>
            </nav>
        </aside>
    );
}
