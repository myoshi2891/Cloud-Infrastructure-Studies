'use client';

import React from 'react';

export default function NavBar() {
    return (
        <aside className="sidebar">
            <div className="brand">CCNA Automation ／ 200-901 CCNAAUTO</div>
            <div className="brand-title">
                Network Fundamentals
                <br />
                ドメイン解説ガイド
            </div>
            <nav aria-label="サイドバーナビゲーション">
                <a href="#overview" className="active">はじめに</a>
                <a href="#step0">Step 0：ドメイン全体像</a>

                <div className="nav-group-label">6.1〜6.4：基礎知識と機器</div>
                <a href="#step1">Step 1：MAC/VLAN（6.1）</a>
                <a href="#step2">Step 2：IPアドレス系（6.2）</a>
                <a href="#step3">Step 3：ネットワーク機器（6.3）</a>
                <a href="#step4">Step 4：トポロジ図（6.4）</a>

                <div className="nav-group-label">6.5〜6.7：仕組みとサービス</div>
                <a href="#step5">Step 5：3つのPlane（6.5）</a>
                <a href="#step6">Step 6：IPサービス（6.6）</a>
                <a href="#step7">Step 7：ポート番号（6.7）</a>

                <div className="nav-group-label">6.8〜6.9：診断と応用</div>
                <a href="#step8">Step 8：接続トラブル診断（6.8）</a>
                <a href="#step9">Step 9：ネットワーク制約（6.9）</a>

                <a href="#summary">まとめ</a>
                <a href="#references">参考情報</a>
            </nav>
        </aside>
    );
}
