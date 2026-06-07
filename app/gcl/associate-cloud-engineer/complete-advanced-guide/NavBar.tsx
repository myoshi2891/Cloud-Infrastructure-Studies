'use client';

import React from 'react';

/**
 * NavBar component containing all the section links for the GCP ACE Complete Advanced Guide page.
 * Supports smooth scrolling and state monitoring for active items.
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
                    <a className="nav-item active" href="#overview">
                        <span className="nav-dot"></span>試験概要 & 配点
                    </a>
                    <a className="nav-item" href="#roadmap">
                        <span className="nav-dot"></span>学習ロードマップ
                    </a>
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">Domain 1 — 環境の設定</div>
                    <div className="progress-bar-mini">
                        <div className="progress-bar-mini-fill" style={{ width: '23%' }}></div>
                    </div>
                    <a className="nav-item" href="#d1-hierarchy">
                        <span className="nav-dot"></span>リソース階層 <span className="nav-percent">重要</span>
                    </a>
                    <a className="nav-item" href="#d1-orgpolicy">
                        <span className="nav-dot"></span>組織ポリシー
                    </a>
                    <a className="nav-item" href="#d1-billing">
                        <span className="nav-dot"></span>請求 & コスト管理 <span className="nav-percent">頻出</span>
                    </a>
                    <a className="nav-item" href="#d1-gcloud">
                        <span className="nav-dot"></span>gcloud CLI
                    </a>
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">Domain 2 — 計画と実装</div>
                    <div className="progress-bar-mini">
                        <div className="progress-bar-mini-fill" style={{ width: '30%' }}></div>
                    </div>
                    <a className="nav-item" href="#d2-compute">
                        <span className="nav-dot"></span>コンピューティング選定
                    </a>
                    <a className="nav-item" href="#d2-gce">
                        <span className="nav-dot"></span>Compute Engine
                    </a>
                    <a className="nav-item" href="#d2-spot">
                        <span className="nav-dot"></span>Spot VM
                    </a>
                    <a className="nav-item" href="#d2-gke">
                        <span className="nav-dot"></span>GKE <span className="nav-percent">最重要</span>
                    </a>
                    <a className="nav-item" href="#d2-cloudrun">
                        <span className="nav-dot"></span>Cloud Run
                    </a>
                    <a className="nav-item" href="#d2-storage">
                        <span className="nav-dot"></span>Cloud Storage
                    </a>
                    <a className="nav-item" href="#d2-database">
                        <span className="nav-dot"></span>データベース選定 <span className="nav-percent">頻出</span>
                    </a>
                    <a className="nav-item" href="#d2-network">
                        <span className="nav-dot"></span>ネットワーク設計
                    </a>
                    <a className="nav-item" href="#d2-lb">
                        <span className="nav-dot"></span>ロードバランサ選定
                    </a>
                    <a className="nav-item" href="#d2-terraform">
                        <span className="nav-dot"></span>Terraform / IaC
                    </a>
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">Domain 3 — オペレーション</div>
                    <div className="progress-bar-mini">
                        <div className="progress-bar-mini-fill" style={{ width: '27%' }}></div>
                    </div>
                    <a className="nav-item" href="#d3-monitoring">
                        <span className="nav-dot"></span>Cloud Monitoring <span className="nav-percent">頻出</span>
                    </a>
                    <a className="nav-item" href="#d3-snapshot">
                        <span className="nav-dot"></span>スナップショット管理
                    </a>
                    <a className="nav-item" href="#d3-logging">
                        <span className="nav-dot"></span>Cloud Logging <span className="nav-percent">最重要</span>
                    </a>
                    <a className="nav-item" href="#d3-gemini">
                        <span className="nav-dot"></span>Gemini Cloud Assist
                    </a>
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">Domain 4 — セキュリティ</div>
                    <div className="progress-bar-mini">
                        <div className="progress-bar-mini-fill" style={{ width: '20%' }}></div>
                    </div>
                    <a className="nav-item" href="#d4-iam">
                        <span className="nav-dot"></span>IAM ロール設計 <span className="nav-percent">最重要</span>
                    </a>
                    <a className="nav-item" href="#d4-sa">
                        <span className="nav-dot"></span>サービスアカウント
                    </a>
                    <a className="nav-item" href="#d4-secret">
                        <span className="nav-dot"></span>Secret Manager
                    </a>
                    <a className="nav-item" href="#d4-network-sec">
                        <span className="nav-dot"></span>ネットワークセキュリティ
                    </a>
                    <a className="nav-item" href="#d4-scc">
                        <span className="nav-dot"></span>Security Command Center
                    </a>
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">試験対策</div>
                    <a className="nav-item" href="#traps">
                        <span className="nav-dot"></span>引っかけ問題パターン
                    </a>
                    <a className="nav-item" href="#checklist">
                        <span className="nav-dot"></span>直前チェックリスト
                    </a>
                </div>
            </div>
        </nav>
    );
}
