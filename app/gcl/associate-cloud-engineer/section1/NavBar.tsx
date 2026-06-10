'use client';

import React from 'react';

/**
 * ACE Section 1 完全ガイドのサイドバーナビ。
 * 正本 HTML の <nav class="sidebar"> を静的アンカーリンクとして再現する。
 * active 判定はページ側の scroll spy（Section1Guide）が DOM クラスを付与する。
 */
export default function NavBar() {
    return (
        <nav className="sidebar" aria-label="ACE Section 1 完全ガイドナビゲーション">
            <div className="sidebar-header">
                <div className="sidebar-badge">ACE 試験対策</div>
                <div className="sidebar-title">
                    Section 1: Setting up a Cloud Solution Environment
                </div>
                <div className="sidebar-sub">中級者〜上級者向け完全ガイド</div>
            </div>
            <div className="nav-section">
                <div className="nav-section-label">概要</div>
                <a className="nav-item-parent" href="#overview">
                    試験配点と出題範囲
                </a>
            </div>
            <div className="nav-section">
                <div className="nav-section-label">1.1 プロジェクト & アカウント設定</div>
                <a className="nav-item" href="#s111">
                    1.1.1 リソース階層の構築
                </a>
                <a className="nav-item" href="#s112">
                    1.1.2 組織ポリシーの適用
                </a>
                <a className="nav-item" href="#s113">
                    1.1.3 IAMロールの付与
                </a>
                <a className="nav-item" href="#s114">
                    1.1.4 Cloud Identity 管理
                </a>
                <a className="nav-item" href="#s115">
                    1.1.5 APIの有効化
                </a>
                <a className="nav-item" href="#s116">
                    1.1.6 Observabilityの設定
                </a>
                <a className="nav-item" href="#s117">
                    1.1.7 クォータの評価と申請
                </a>
                <a className="nav-item" href="#s118">
                    1.1.8 スタンドアロン組織
                </a>
                <a className="nav-item" href="#s119">
                    1.1.9 ネットワーキングの設定
                </a>
                <a className="nav-item" href="#s1110">
                    1.1.10 地理的可用性の確認
                </a>
                <a className="nav-item" href="#s1111">
                    1.1.11 Cloud Asset Inventory & Gemini
                </a>
                <a className="nav-item" href="#s1112">
                    1.1.12 Workforce Identity Federation
                </a>
            </div>
            <div className="nav-section">
                <div className="nav-section-label">1.2 請求設定の管理</div>
                <a className="nav-item" href="#s121">
                    1.2.1 請求アカウントの作成
                </a>
                <a className="nav-item" href="#s122">
                    1.2.2 プロジェクトとのリンク
                </a>
                <a className="nav-item" href="#s123">
                    1.2.3 予算とアラートの設定
                </a>
                <a className="nav-item" href="#s124">
                    1.2.4 請求エクスポートの設定
                </a>
            </div>
            <div className="nav-section">
                <div className="nav-section-label">まとめ</div>
                <a className="nav-item" href="#exam-patterns">
                    試験頻出パターン
                </a>
                <a className="nav-item" href="#checklist">
                    Section 1 チェックリスト
                </a>
            </div>
        </nav>
    );
}
