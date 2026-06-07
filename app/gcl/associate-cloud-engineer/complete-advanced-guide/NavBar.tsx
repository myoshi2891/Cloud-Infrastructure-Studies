'use client';

import React from 'react';

/**
 * NavBar component for the GCP ACE Complete Advanced Guide page.
 * Renders a sticky navigation sidebar and highlights the active section based on scroll position.
 */
export default function NavBar() {
    return (
        <nav className="sidebar" id="sidebar" aria-label="ACE 完全ガイドナビゲーション">
            <div className="sidebar-logo">
                <div className="badge">Google Cloud</div>
                <h1>ACE 試験対策<br /><span>完全ガイド</span></h1>
            </div>
            <div className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-section-title">概要</div>
                    <a className="nav-item active">試験概要 & 配点</a>
                    <a className="nav-item">学習ロードマップ</a>
                </div>
                <div className="nav-section">
                    <div className="nav-section-title">Domain 1 — 環境の設定</div>
                    <a className="nav-item">リソース階層</a>
                    <a className="nav-item">組織ポリシー</a>
                </div>
            </div>
        </nav>
    );
}
