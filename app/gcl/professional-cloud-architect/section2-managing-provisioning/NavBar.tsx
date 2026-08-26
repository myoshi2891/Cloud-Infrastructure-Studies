'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { NAV_ITEMS } from './constants';

/**
 * {@link NavBar} のプロパティ。開閉状態は親ページが所有し、NavBar は表示と通知のみを担う。
 */
interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCA Section 2（管理とプロビジョニング）ガイドのサイドバー目次。
 *
 * IntersectionObserver によるスクロールスパイで現在位置の見出しをハイライトし、
 * 目次リンクのクリックでスムーススクロールと URL ハッシュ更新を行う。
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const intersectingRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const targetElements = NAV_ITEMS
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);

        if (targetElements.length === 0) return;
        if (typeof IntersectionObserver === 'undefined') return;

        const intersecting = intersectingRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        intersecting.add(entry.target.id);
                    } else {
                        intersecting.delete(entry.target.id);
                    }
                }

                const topMost = NAV_ITEMS.find((item) => intersecting.has(item.id));
                if (topMost) setActiveId(topMost.id);
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );

        targetElements.forEach((el) => observer.observe(el));

        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollY + windowHeight >= docHeight - 40) {
                const lastItem = NAV_ITEMS[NAV_ITEMS.length - 1];
                if (lastItem) setActiveId(lastItem.id);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.disconnect();
            intersecting.clear();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!activeId) return;
        const activeLink = document.querySelector(`.sidebar nav a[href="#${activeId}"]`);
        if (activeLink && typeof activeLink.scrollIntoView === 'function') {
            activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [activeId]);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus({ preventScroll: true });
                setActiveId(id);
                onClose();
            }
        },
        [onClose],
    );

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="目次を開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={onToggle}
            >
                &#9776;
            </button>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" aria-label="セクション目次">
                <div className="sidebar-brand">
                    Google Cloud PCA
                    <small>
                        Section 2：クラウドソリューションインフラの管理とプロビジョニング（配点 約17.5%）
                    </small>
                </div>
                <ul className="nav-list">
                    <li className="nav-h2">
                        <a
                            href="#この章について"
                            data-target="この章について"
                            className={activeId === 'この章について' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, 'この章について')}
                        >
                            この章について
                        </a>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#21-ネットワークトポロジの構成"
                            data-target="21-ネットワークトポロジの構成"
                            className={activeId === '21-ネットワークトポロジの構成' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '21-ネットワークトポロジの構成')}
                        >
                            2.1 ネットワークトポロジの構成
                        </a>
                        <ul className="nav-sublist">
                            <li className="nav-h3">
                                <a
                                    href="#211-ハイブリッドネットワーキングオンプレミスとの接続"
                                    data-target="211-ハイブリッドネットワーキングオンプレミスとの接続"
                                    className={activeId === '211-ハイブリッドネットワーキングオンプレミスとの接続' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '211-ハイブリッドネットワーキングオンプレミスとの接続')}
                                >
                                    2.1.1 ハイブリッドネットワーキング：オンプレミスとの接続
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#212-マルチクラウド環境への拡張"
                                    data-target="212-マルチクラウド環境への拡張"
                                    className={activeId === '212-マルチクラウド環境への拡張' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '212-マルチクラウド環境への拡張')}
                                >
                                    2.1.2 マルチクラウド環境への拡張
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#213-セキュリティ保護侵入防止アクセス制御ファイアウォール"
                                    data-target="213-セキュリティ保護侵入防止アクセス制御ファイアウォール"
                                    className={activeId === '213-セキュリティ保護侵入防止アクセス制御ファイアウォール' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '213-セキュリティ保護侵入防止アクセス制御ファイアウォール')}
                                >
                                    2.1.3 セキュリティ保護（侵入防止・アクセス制御・ファイアウォール）
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#214-vpc設計とロードバランシング"
                                    data-target="214-vpc設計とロードバランシング"
                                    className={activeId === '214-vpc設計とロードバランシング' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '214-vpc設計とロードバランシング')}
                                >
                                    2.1.4 VPC設計とロードバランシング
                                </a>
                                <ul className="nav-sublist">
                                    <li className="nav-h4">
                                        <a
                                            href="#vpcの基本設計方針"
                                            data-target="vpcの基本設計方針"
                                            className={activeId === 'vpcの基本設計方針' ? 'active' : ''}
                                            onClick={(e) => handleNavClick(e, 'vpcの基本設計方針')}
                                        >
                                            VPCの基本設計方針
                                        </a>
                                    </li>
                                    <li className="nav-h4">
                                        <a
                                            href="#private-service-connectpsc"
                                            data-target="private-service-connectpsc"
                                            className={activeId === 'private-service-connectpsc' ? 'active' : ''}
                                            onClick={(e) => handleNavClick(e, 'private-service-connectpsc')}
                                        >
                                            Private Service Connect（PSC）
                                        </a>
                                    </li>
                                    <li className="nav-h4">
                                        <a
                                            href="#ロードバランサーの選択"
                                            data-target="ロードバランサーの選択"
                                            className={activeId === 'ロードバランサーの選択' ? 'active' : ''}
                                            onClick={(e) => handleNavClick(e, 'ロードバランサーの選択')}
                                        >
                                            ロードバランサーの選択
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#22-個別のストレージシステムの構成"
                            data-target="22-個別のストレージシステムの構成"
                            className={activeId === '22-個別のストレージシステムの構成' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '22-個別のストレージシステムの構成')}
                        >
                            2.2 個別のストレージシステムの構成
                        </a>
                        <ul className="nav-sublist">
                            <li className="nav-h3">
                                <a
                                    href="#221-オブジェクトストレージcloud-storageクラスとライフサイクル管理"
                                    data-target="221-オブジェクトストレージcloud-storageクラスとライフサイクル管理"
                                    className={activeId === '221-オブジェクトストレージcloud-storageクラスとライフサイクル管理' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '221-オブジェクトストレージcloud-storageクラスとライフサイクル管理')}
                                >
                                    2.2.1 オブジェクトストレージ（Cloud Storage）：クラスとライフサイクル管理
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#222-データ処理とコンピュートのプロビジョニングデータベースの選択"
                                    data-target="222-データ処理とコンピュートのプロビジョニングデータベースの選択"
                                    className={activeId === '222-データ処理とコンピュートのプロビジョニングデータベースの選択' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '222-データ処理とコンピュートのプロビジョニングデータベースの選択')}
                                >
                                    2.2.2 データ処理とコンピュートのプロビジョニング／データベースの選択
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#223-ブロックストレージとファイルストレージ"
                                    data-target="223-ブロックストレージとファイルストレージ"
                                    className={activeId === '223-ブロックストレージとファイルストレージ' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '223-ブロックストレージとファイルストレージ')}
                                >
                                    2.2.3 ブロックストレージとファイルストレージ
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#224-データ保護バックアップと復旧"
                                    data-target="224-データ保護バックアップと復旧"
                                    className={activeId === '224-データ保護バックアップと復旧' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '224-データ保護バックアップと復旧')}
                                >
                                    2.2.4 データ保護（バックアップと復旧）
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#23-コンピュートシステムの構成"
                            data-target="23-コンピュートシステムの構成"
                            className={activeId === '23-コンピュートシステムの構成' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '23-コンピュートシステムの構成')}
                        >
                            2.3 コンピュートシステムの構成
                        </a>
                        <ul className="nav-sublist">
                            <li className="nav-h3">
                                <a
                                    href="#231-コンピュートリソースのプロビジョニングマシンファミリーとカスタムマシンタイプ"
                                    data-target="231-コンピュートリソースのプロビジョニングマシンファミリーとカスタムマシンタイプ"
                                    className={activeId === '231-コンピュートリソースのプロビジョニングマシンファミリーとカスタムマシンタイプ' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '231-コンピュートリソースのプロビジョニングマシンファミリーとカスタムマシンタイプ')}
                                >
                                    2.3.1 コンピュートリソースのプロビジョニング：マシンファミリーとカスタムマシンタイプ
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#232-コンピュートのボラティリティ構成spot-vm-vs-standard-vm"
                                    data-target="232-コンピュートのボラティリティ構成spot-vm-vs-standard-vm"
                                    className={activeId === '232-コンピュートのボラティリティ構成spot-vm-vs-standard-vm' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '232-コンピュートのボラティリティ構成spot-vm-vs-standard-vm')}
                                >
                                    2.3.2 コンピュートのボラティリティ構成：Spot VM vs Standard VM
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#233-クラウドネイティブなネットワーク構成compute-enginegkevmware-engine"
                                    data-target="233-クラウドネイティブなネットワーク構成compute-enginegkevmware-engine"
                                    className={activeId === '233-クラウドネイティブなネットワーク構成compute-enginegkevmware-engine' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '233-クラウドネイティブなネットワーク構成compute-enginegkevmware-engine')}
                                >
                                    2.3.3 クラウドネイティブなネットワーク構成（Compute Engine／GKE／VMware Engine）
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#234-インフラのオーケストレーションリソース構成パッチ管理"
                                    data-target="234-インフラのオーケストレーションリソース構成パッチ管理"
                                    className={activeId === '234-インフラのオーケストレーションリソース構成パッチ管理' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '234-インフラのオーケストレーションリソース構成パッチ管理')}
                                >
                                    2.3.4 インフラのオーケストレーション、リソース構成、パッチ管理
                                </a>
                                <ul className="nav-sublist">
                                    <li className="nav-h4">
                                        <a
                                            href="#infrastructure-as-codeiac"
                                            data-target="infrastructure-as-codeiac"
                                            className={activeId === 'infrastructure-as-codeiac' ? 'active' : ''}
                                            onClick={(e) => handleNavClick(e, 'infrastructure-as-codeiac')}
                                        >
                                            Infrastructure as Code（IaC）
                                        </a>
                                    </li>
                                    <li className="nav-h4">
                                        <a
                                            href="#パッチ管理vm-manager"
                                            data-target="パッチ管理vm-manager"
                                            className={activeId === 'パッチ管理vm-manager' ? 'active' : ''}
                                            onClick={(e) => handleNavClick(e, 'パッチ管理vm-manager')}
                                        >
                                            パッチ管理（VM Manager）
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#235-コンテナオーケストレーションgke-autopilot-vs-standard"
                                    data-target="235-コンテナオーケストレーションgke-autopilot-vs-standard"
                                    className={activeId === '235-コンテナオーケストレーションgke-autopilot-vs-standard' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '235-コンテナオーケストレーションgke-autopilot-vs-standard')}
                                >
                                    2.3.5 コンテナオーケストレーション：GKE Autopilot vs Standard
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#236-サーバーレスコンピューティングcloud-run"
                                    data-target="236-サーバーレスコンピューティングcloud-run"
                                    className={activeId === '236-サーバーレスコンピューティングcloud-run' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '236-サーバーレスコンピューティングcloud-run')}
                                >
                                    2.3.6 サーバーレスコンピューティング：Cloud Run
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー"
                            data-target="24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー"
                            className={activeId === '24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー')}
                        >
                            2.4 Gemini Enterprise Agent Platformを活用したエンドツーエンドMLワークフロー
                        </a>
                        <ul className="nav-sublist">
                            <li className="nav-h3">
                                <a
                                    href="#241-gemini-enterprise-agent-platformの全体像"
                                    data-target="241-gemini-enterprise-agent-platformの全体像"
                                    className={activeId === '241-gemini-enterprise-agent-platformの全体像' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '241-gemini-enterprise-agent-platformの全体像')}
                                >
                                    2.4.1 Gemini Enterprise Agent Platformの全体像
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#242-agent-platform-pipelinesによる自動化とオーケストレーション"
                                    data-target="242-agent-platform-pipelinesによる自動化とオーケストレーション"
                                    className={activeId === '242-agent-platform-pipelinesによる自動化とオーケストレーション' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '242-agent-platform-pipelinesによる自動化とオーケストレーション')}
                                >
                                    2.4.2 Agent Platform Pipelinesによる自動化とオーケストレーション
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#243-agent-platformデータ統合の準備"
                                    data-target="243-agent-platformデータ統合の準備"
                                    className={activeId === '243-agent-platformデータ統合の準備' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '243-agent-platformデータ統合の準備')}
                                >
                                    2.4.3 Agent Platformデータ統合の準備
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#244-ai-hypercomputerの活用"
                                    data-target="244-ai-hypercomputerの活用"
                                    className={activeId === '244-ai-hypercomputerの活用' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '244-ai-hypercomputerの活用')}
                                >
                                    2.4.4 AI Hypercomputerの活用
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#25-agent-platformでの事前構築ソリューションまたはapiの構成"
                            data-target="25-agent-platformでの事前構築ソリューションまたはapiの構成"
                            className={activeId === '25-agent-platformでの事前構築ソリューションまたはapiの構成' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '25-agent-platformでの事前構築ソリューションまたはapiの構成')}
                        >
                            2.5 Agent Platformでの事前構築ソリューションまたはAPIの構成
                        </a>
                        <ul className="nav-sublist">
                            <li className="nav-h3">
                                <a
                                    href="#251-google-ai-apiの使い分け"
                                    data-target="251-google-ai-apiの使い分け"
                                    className={activeId === '251-google-ai-apiの使い分け' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '251-google-ai-apiの使い分け')}
                                >
                                    2.5.1 Google AI APIの使い分け
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#252-gemini-enterprise機能の統合ai-agentsおよび-notebooklm"
                                    data-target="252-gemini-enterprise機能の統合ai-agentsおよび-notebooklm"
                                    className={activeId === '252-gemini-enterprise機能の統合ai-agentsおよび-notebooklm' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '252-gemini-enterprise機能の統合ai-agentsおよび-notebooklm')}
                                >
                                    2.5.2 Gemini Enterprise機能の統合（AI Agentsおよび NotebookLM）
                                </a>
                            </li>
                            <li className="nav-h3">
                                <a
                                    href="#253-model-gardenからのaiモデル統合"
                                    data-target="253-model-gardenからのaiモデル統合"
                                    className={activeId === '253-model-gardenからのaiモデル統合' ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, '253-model-gardenからのaiモデル統合')}
                                >
                                    2.5.3 Model GardenからのAIモデル統合
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#well-architected-frameworkとの関連"
                            data-target="well-architected-frameworkとの関連"
                            className={activeId === 'well-architected-frameworkとの関連' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, 'well-architected-frameworkとの関連')}
                        >
                            Well-Architected Frameworkとの関連
                        </a>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#学習チェックリスト"
                            data-target="学習チェックリスト"
                            className={activeId === '学習チェックリスト' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '学習チェックリスト')}
                        >
                            学習チェックリスト
                        </a>
                    </li>
                    <li className="nav-h2">
                        <a
                            href="#参考文献"
                            data-target="参考文献"
                            className={activeId === '参考文献' ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, '参考文献')}
                        >
                            参考文献
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
