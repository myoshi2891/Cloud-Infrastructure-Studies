'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCNE Section 6 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');

    const allNavIds = React.useMemo(() => {
        return NAV_ITEMS.map((item) => item.id);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            const intersecting = entries.filter((e) => e.isIntersecting);
            if (intersecting.length > 0) {
                const best = intersecting.reduce((prev, current) =>
                    current.intersectionRatio > prev.intersectionRatio ? current : prev,
                );
                setActiveId(best.target.id);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '-15% 0px -75% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1],
        });

        allNavIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [allNavIds]);

    const handleNavClick = useCallback(
        (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setActiveId(id);
            onClose();

            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                target.focus();
                window.history.pushState(null, '', `#${id}`);
            }
        },
        [onClose],
    );

    return (
        <>
            <button
                type="button"
                className="menu-toggle"
                id="menuToggle"
                aria-label="目次を開く"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={onToggle}
            >
                ☰
            </button>
            <div
                className={`nav-backdrop ${isOpen ? 'open' : ''}`}
                id="navBackdrop"
                onClick={onClose}
                aria-hidden="true"
            />
            <nav
                className={`sidebar ${isOpen ? 'open' : ''}`}
                id="sidebar"
                aria-label="目次"
            >
                <div className="sidebar-brand">
                    <span className="tag">PCNE 試験対策</span>
                    <div className="title">S6: ネットワーク操作と監視</div>
                </div>
                <ul className="nav-list">
                    <li>
                        <a href="#この記事についてスコープ対応表" data-target="この記事についてスコープ対応表" className={`nav-h2 ${activeId === "この記事についてスコープ対応表" ? "active" : ""}`.trim()} onClick={handleNavClick("この記事についてスコープ対応表")}>この記事について(スコープ対応表)</a>
                    </li>
                    <li><a href="#全体像" data-target="全体像" className={`nav-h2 ${activeId === "全体像" ? "active" : ""}`.trim()} onClick={handleNavClick("全体像")}>全体像</a></li>
                    <li>
                        <a href="#part-1-google-cloud-observabilityによるロギングとモニタリングtask-51" data-target="part-1-google-cloud-observabilityによるロギングとモニタリングtask-51" className={`nav-h2 ${activeId === "part-1-google-cloud-observabilityによるロギングとモニタリングtask-51" ? "active" : ""}`.trim()} onClick={handleNavClick("part-1-google-cloud-observabilityによるロギングとモニタリングtask-51")}>Part 1: Google Cloud Observabilityによるロギングとモニタリング(Task
                            5.1)</a>
                        <ul className="nav-sublist">
                            <li>
                                <a href="#11-google-cloud-observabilityの基本構造" data-target="11-google-cloud-observabilityの基本構造" className={`nav-h3 ${activeId === "11-google-cloud-observabilityの基本構造" ? "active" : ""}`.trim()} onClick={handleNavClick("11-google-cloud-observabilityの基本構造")}>1.1 Google Cloud Observabilityの基本構造</a>
                            </li>
                            <li>
                                <a href="#12-ネットワークコンポーネント別ロギング" data-target="12-ネットワークコンポーネント別ロギング" className={`nav-h3 ${activeId === "12-ネットワークコンポーネント別ロギング" ? "active" : ""}`.trim()} onClick={handleNavClick("12-ネットワークコンポーネント別ロギング")}>1.2 ネットワークコンポーネント別ロギング</a>
                            </li>
                            <li>
                                <a href="#13-ネットワークメトリクスのモニタリング" data-target="13-ネットワークメトリクスのモニタリング" className={`nav-h3 ${activeId === "13-ネットワークメトリクスのモニタリング" ? "active" : ""}`.trim()} onClick={handleNavClick("13-ネットワークメトリクスのモニタリング")}>1.3 ネットワークメトリクスのモニタリング</a>
                            </li>
                            <li>
                                <a href="#14-task-51-設計運用チェックリスト" data-target="14-task-51-設計運用チェックリスト" className={`nav-h3 ${activeId === "14-task-51-設計運用チェックリスト" ? "active" : ""}`.trim()} onClick={handleNavClick("14-task-51-設計運用チェックリスト")}>1.4 Task 5.1 設計・運用チェックリスト</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#part-2-接続性の維持とトラブルシューティングtask-52" data-target="part-2-接続性の維持とトラブルシューティングtask-52" className={`nav-h2 ${activeId === "part-2-接続性の維持とトラブルシューティングtask-52" ? "active" : ""}`.trim()} onClick={handleNavClick("part-2-接続性の維持とトラブルシューティングtask-52")}>Part 2: 接続性の維持とトラブルシューティング(Task 5.2)</a>
                        <ul className="nav-sublist">
                            <li>
                                <a href="#21-application-load-balancerでのトラフィックドレインリダイレクト" data-target="21-application-load-balancerでのトラフィックドレインリダイレクト" className={`nav-h3 ${activeId === "21-application-load-balancerでのトラフィックドレインリダイレクト" ? "active" : ""}`.trim()} onClick={handleNavClick("21-application-load-balancerでのトラフィックドレインリダイレクト")}>2.1 Application Load
                                    Balancerでのトラフィックドレイン・リダイレクト</a>
                            </li>
                            <li>
                                <a href="#22-cloud-vpnの管理とトラブルシューティング" data-target="22-cloud-vpnの管理とトラブルシューティング" className={`nav-h3 ${activeId === "22-cloud-vpnの管理とトラブルシューティング" ? "active" : ""}`.trim()} onClick={handleNavClick("22-cloud-vpnの管理とトラブルシューティング")}>2.2 Cloud VPNの管理とトラブルシューティング</a>
                            </li>
                            <li>
                                <a href="#23-cloud-interconnectの管理とトラブルシューティング" data-target="23-cloud-interconnectの管理とトラブルシューティング" className={`nav-h3 ${activeId === "23-cloud-interconnectの管理とトラブルシューティング" ? "active" : ""}`.trim()} onClick={handleNavClick("23-cloud-interconnectの管理とトラブルシューティング")}>2.3 Cloud Interconnectの管理とトラブルシューティング</a>
                            </li>
                            <li>
                                <a href="#24-cloud-routerのbgpピアリングのトラブルシューティング" data-target="24-cloud-routerのbgpピアリングのトラブルシューティング" className={`nav-h3 ${activeId === "24-cloud-routerのbgpピアリングのトラブルシューティング" ? "active" : ""}`.trim()} onClick={handleNavClick("24-cloud-routerのbgpピアリングのトラブルシューティング")}>2.4 Cloud RouterのBGPピアリングのトラブルシューティング</a>
                            </li>
                            <li>
                                <a href="#25-vpc-flow-logsファイアウォールログpacket-mirroringを使ったトラブルシューティング" data-target="25-vpc-flow-logsファイアウォールログpacket-mirroringを使ったトラブルシューティング" className={`nav-h3 ${activeId === "25-vpc-flow-logsファイアウォールログpacket-mirroringを使ったトラブルシューティング" ? "active" : ""}`.trim()} onClick={handleNavClick("25-vpc-flow-logsファイアウォールログpacket-mirroringを使ったトラブルシューティング")}>2.5 VPC Flow Logs・ファイアウォールログ・Packet
                                    Mirroringを使ったトラブルシューティング</a>
                            </li>
                            <li>
                                <a href="#26-task-52-トラブルシューティングチェックリスト" data-target="26-task-52-トラブルシューティングチェックリスト" className={`nav-h3 ${activeId === "26-task-52-トラブルシューティングチェックリスト" ? "active" : ""}`.trim()} onClick={handleNavClick("26-task-52-トラブルシューティングチェックリスト")}>2.6 Task 5.2 トラブルシューティングチェックリスト</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#part-3-network-intelligence-centerによる監視とトラブルシューティングtask-53" data-target="part-3-network-intelligence-centerによる監視とトラブルシューティングtask-53" className={`nav-h2 ${activeId === "part-3-network-intelligence-centerによる監視とトラブルシューティングtask-53" ? "active" : ""}`.trim()} onClick={handleNavClick("part-3-network-intelligence-centerによる監視とトラブルシューティングtask-53")}>Part 3: Network Intelligence
                            Centerによる監視とトラブルシューティング(Task 5.3)</a>
                        <ul className="nav-sublist">
                            <li>
                                <a href="#31-network-intelligence-centerの全体像" data-target="31-network-intelligence-centerの全体像" className={`nav-h3 ${activeId === "31-network-intelligence-centerの全体像" ? "active" : ""}`.trim()} onClick={handleNavClick("31-network-intelligence-centerの全体像")}>3.1 Network Intelligence Centerの全体像</a>
                            </li>
                            <li>
                                <a href="#32-network-topology" data-target="32-network-topology" className={`nav-h3 ${activeId === "32-network-topology" ? "active" : ""}`.trim()} onClick={handleNavClick("32-network-topology")}>3.2 Network Topology</a>
                            </li>
                            <li>
                                <a href="#33-connectivity-tests" data-target="33-connectivity-tests" className={`nav-h3 ${activeId === "33-connectivity-tests" ? "active" : ""}`.trim()} onClick={handleNavClick("33-connectivity-tests")}>3.3 Connectivity Tests</a>
                            </li>
                            <li>
                                <a href="#34-performance-dashboard" data-target="34-performance-dashboard" className={`nav-h3 ${activeId === "34-performance-dashboard" ? "active" : ""}`.trim()} onClick={handleNavClick("34-performance-dashboard")}>3.4 Performance Dashboard</a>
                            </li>
                            <li>
                                <a href="#35-firewall-insights" data-target="35-firewall-insights" className={`nav-h3 ${activeId === "35-firewall-insights" ? "active" : ""}`.trim()} onClick={handleNavClick("35-firewall-insights")}>3.5 Firewall Insights</a>
                            </li>
                            <li>
                                <a href="#36-network-analyzer" data-target="36-network-analyzer" className={`nav-h3 ${activeId === "36-network-analyzer" ? "active" : ""}`.trim()} onClick={handleNavClick("36-network-analyzer")}>3.6 Network Analyzer</a>
                            </li>
                            <li>
                                <a href="#37-flow-analyzer" data-target="37-flow-analyzer" className={`nav-h3 ${activeId === "37-flow-analyzer" ? "active" : ""}`.trim()} onClick={handleNavClick("37-flow-analyzer")}>3.7 Flow Analyzer</a>
                            </li>
                            <li>
                                <a href="#38-task-53-活用チェックリスト" data-target="38-task-53-活用チェックリスト" className={`nav-h3 ${activeId === "38-task-53-活用チェックリスト" ? "active" : ""}`.trim()} onClick={handleNavClick("38-task-53-活用チェックリスト")}>3.8 Task 5.3 活用チェックリスト</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#総合トラブルシューティングワークフロー" data-target="総合トラブルシューティングワークフロー" className={`nav-h2 ${activeId === "総合トラブルシューティングワークフロー" ? "active" : ""}`.trim()} onClick={handleNavClick("総合トラブルシューティングワークフロー")}>総合トラブルシューティングワークフロー</a>
                    </li>
                    <li>
                        <a href="#参考文献" data-target="参考文献" className={`nav-h2 ${activeId === "参考文献" ? "active" : ""}`.trim()} onClick={handleNavClick("参考文献")}>参考文献</a>
                        <ul className="nav-sublist">
                            <li>
                                <a href="#公式認定試験ガイド" data-target="公式認定試験ガイド" className={`nav-h3 ${activeId === "公式認定試験ガイド" ? "active" : ""}`.trim()} onClick={handleNavClick("公式認定試験ガイド")}>公式認定・試験ガイド</a>
                            </li>
                            <li>
                                <a href="#cloud-logging--cloud-monitoring基盤コンポーネント別ロギング" data-target="cloud-logging--cloud-monitoring基盤コンポーネント別ロギング" className={`nav-h3 ${activeId === "cloud-logging--cloud-monitoring基盤コンポーネント別ロギング" ? "active" : ""}`.trim()} onClick={handleNavClick("cloud-logging--cloud-monitoring基盤コンポーネント別ロギング")}>Cloud Logging / Cloud
                                    Monitoring基盤・コンポーネント別ロギング</a>
                            </li>
                            <li>
                                <a href="#ハイブリッド接続cloud-vpn--cloud-interconnect--cloud-routerのモニタリングとトラブルシューティング" data-target="ハイブリッド接続cloud-vpn--cloud-interconnect--cloud-routerのモニタリングとトラブルシューティング" className={`nav-h3 ${activeId === "ハイブリッド接続cloud-vpn--cloud-interconnect--cloud-routerのモニタリングとトラブルシューティング" ? "active" : ""}`.trim()} onClick={handleNavClick("ハイブリッド接続cloud-vpn--cloud-interconnect--cloud-routerのモニタリングとトラブルシューティング")}>ハイブリッド接続(Cloud VPN / Cloud Interconnect / Cloud
                                    Router)のモニタリングとトラブルシューティング</a>
                            </li>
                            <li>
                                <a href="#ロードバランシングトラフィック管理" data-target="ロードバランシングトラフィック管理" className={`nav-h3 ${activeId === "ロードバランシングトラフィック管理" ? "active" : ""}`.trim()} onClick={handleNavClick("ロードバランシングトラフィック管理")}>ロードバランシング・トラフィック管理</a>
                            </li>
                            <li>
                                <a href="#vpc-flow-logspacket-mirroringによるトラブルシューティング" data-target="vpc-flow-logspacket-mirroringによるトラブルシューティング" className={`nav-h3 ${activeId === "vpc-flow-logspacket-mirroringによるトラブルシューティング" ? "active" : ""}`.trim()} onClick={handleNavClick("vpc-flow-logspacket-mirroringによるトラブルシューティング")}>VPC Flow Logs・Packet Mirroringによるトラブルシューティング</a>
                            </li>
                            <li>
                                <a href="#network-intelligence-center" data-target="network-intelligence-center" className={`nav-h3 ${activeId === "network-intelligence-center" ? "active" : ""}`.trim()} onClick={handleNavClick("network-intelligence-center")}>Network Intelligence Center</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
}
