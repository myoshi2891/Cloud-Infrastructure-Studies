'use client';

import React from 'react';

/**
 * Render the ACE Section 2 sidebar navigation for the study guide.
 *
 * Renders a static <nav> element containing labeled section groups and anchor links for Section 2 (Compute, Storage & Data, Networking, IaC & AI) and exam-prep items. Active link state is not managed here and is expected to be applied externally (e.g., a scroll-spy).
 *
 * @returns The sidebar navigation JSX element
 */
export default function NavBar() {
    return (
        <nav className="sidebar" aria-label="ACE Section 2 完全ガイドナビゲーション">
            <div className="sidebar-header">
                <div className="sidebar-logo">Google Cloud</div>
                <div className="sidebar-title">ACE Section 2<br />Study Guide</div>
                <div className="sidebar-badge">2026年6月版対応</div>
            </div>
            <div className="sidebar-score">
                <div className="score-label">試験配点</div>
                <div className="score-value">
                    30<span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>%</span>
                </div>
                <div className="score-sub">最大配点ドメイン</div>
                <div className="score-bar">
                    <div className="score-fill"></div>
                </div>
            </div>

            <div className="nav-section">
                <div className="nav-section-label">Section 2.1 — Compute</div>
                <a href="#s21" className="nav-item">
                    <span className="nav-icon icon-compute">2.1</span>コンピューティング選択
                </a>
                <a href="#s21-disk" className="nav-item">
                    <span className="nav-icon icon-compute">HD</span>Hyperdisk / ストレージ
                </a>
                <a href="#s21-mig" className="nav-item">
                    <span className="nav-icon icon-compute">MIG</span>Managed Instance Group
                </a>
                <a href="#s21-oslogin" className="nav-item">
                    <span className="nav-icon icon-compute">OS</span>OS Login / VM Manager
                </a>
                <a href="#s21-spot" className="nav-item">
                    <span className="nav-icon icon-compute">Spt</span>Spot VM / カスタムタイプ
                </a>
                <a href="#s21-gke" className="nav-item">
                    <span className="nav-icon icon-compute">GKE</span>GKE 展開設定
                </a>
                <a href="#s21-serverless" className="nav-item">
                    <span className="nav-icon icon-compute">Run</span>サーバーレス / Eventarc
                </a>
                <a href="#s21-gpu" className="nav-item">
                    <span className="nav-icon icon-compute">GPU</span>GPU / TPU 選択基準
                </a>
                <a href="#s21-agent" className="nav-item">
                    <span className="nav-icon icon-compute">AI</span>Agent Runtime 🆕
                </a>
            </div>

            <div className="nav-section">
                <div className="nav-section-label">Section 2.2 — Storage &amp; Data</div>
                <a href="#s22-db" className="nav-item">
                    <span className="nav-icon icon-storage">DB</span>データベース選択
                </a>
                <a href="#s22-storage" className="nav-item">
                    <span className="nav-icon icon-storage">GCS</span>ストレージ選択 🆕
                </a>
                <a href="#s22-load" className="nav-item">
                    <span className="nav-icon icon-storage">ETL</span>データロード / 冗長性
                </a>
            </div>

            <div className="nav-section">
                <div className="nav-section-label">Section 2.3 — Networking</div>
                <a href="#s23-vpc" className="nav-item">
                    <span className="nav-icon icon-network">VPC</span>VPC / サブネット設計
                </a>
                <a href="#s23-fw" className="nav-item">
                    <span className="nav-icon icon-network">FW</span>FW / Cloud NGFW 🆕
                </a>
                <a href="#s23-conn" className="nav-item">
                    <span className="nav-icon icon-network">Cnx</span>ネットワーク接続
                </a>
                <a href="#s23-lb" className="nav-item">
                    <span className="nav-icon icon-network">LB</span>ロードバランサ選定
                </a>
                <a href="#s23-tier" className="nav-item">
                    <span className="nav-icon icon-network">Tier</span>Network Service Tier 🆕
                </a>
            </div>

            <div className="nav-section">
                <div className="nav-section-label">Section 2.4 — IaC &amp; AI</div>
                <a href="#s24-iac" className="nav-item">
                    <span className="nav-icon icon-iac">IaC</span>Terraform / Fabric FAST 🆕
                </a>
                <a href="#s24-ai" className="nav-item">
                    <span className="nav-icon icon-iac">AI</span>AI支援ツール 🆕
                </a>
            </div>

            <div className="nav-section">
                <div className="nav-section-label">試験対策</div>
                <a href="#summary" className="nav-item">
                    <span className="nav-icon icon-summary">Sum</span>頻出パターン別 解法
                </a>
                <a href="#checklist" className="nav-item">
                    <span className="nav-icon icon-summary">✓</span>直前チェックリスト
                </a>
                <a href="#refs" className="nav-item">
                    <span className="nav-icon icon-summary">🔗</span>参考リソース一覧
                </a>
            </div>
        </nav>
    );
}
