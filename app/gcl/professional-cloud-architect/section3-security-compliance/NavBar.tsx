'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCA Section 3 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id || '');
    const intersectingRef = useRef<Set<string>>(new Set());

    useEffect(() => {
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

                // NAV_ITEMS の並び順で最初に交差している見出しを採用する。
                // 交差中の見出しが無い場合は直前の activeId を維持する。
                const topMost = NAV_ITEMS.find((item) => intersecting.has(item.id));
                if (topMost) setActiveId(topMost.id);
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (id: string) => {
        onClose();
        const el = document.getElementById(id);
        if (el) {
            el.focus();
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                onClick={onToggle}
                aria-label="メニューを開閉"
                aria-expanded={isOpen}
                aria-controls="sidebarNav"
            >
                ☰
            </button>
            <div
                className={`sidebar-backdrop ${isOpen ? 'show' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-kicker">Google Cloud PCA 試験対策</div>
                    {' '}
                    <div className="brand-title">
                        Section 3
                        <br />
                        セキュリティとコンプライアンスの設計
                    </div>
                </div>
                {' '}
                <nav className="sidebar-nav" id="sidebarNav" aria-label="セクション目次">
                    <div className="nav-group">
                        <a
                            href="#section-3-の全体像"
                            className={`nav-link nav-link-h2 ${activeId === 'section-3-の全体像' ? 'active' : ''}`}
                            data-target="section-3-の全体像"
                            onClick={() => handleLinkClick('section-3-の全体像')}
                        >
                            Section 3 の全体像
                        </a>
                        {' '}
                        <ul className="nav-sublist" />
                    </div>
                    {' '}
                    <div className="nav-group">
                        <a
                            href="#31-セキュリティの設計"
                            className={`nav-link nav-link-h2 ${activeId === '31-セキュリティの設計' ? 'active' : ''}`}
                            data-target="31-セキュリティの設計"
                            onClick={() => handleLinkClick('31-セキュリティの設計')}
                        >
                            3.1 セキュリティの設計
                        </a>
                        {' '}
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#311-identity-and-access-managementiam"
                                    className={`nav-link nav-link-h3 ${activeId === '311-identity-and-access-managementiam' ? 'active' : ''}`}
                                    data-target="311-identity-and-access-managementiam"
                                    onClick={() => handleLinkClick('311-identity-and-access-managementiam')}
                                >
                                    3.1.1 Identity and Access Management（IAM）
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#312-リソース階層組織フォルダプロジェクト"
                                    className={`nav-link nav-link-h3 ${activeId === '312-リソース階層組織フォルダプロジェクト' ? 'active' : ''}`}
                                    data-target="312-リソース階層組織フォルダプロジェクト"
                                    onClick={() => handleLinkClick('312-リソース階層組織フォルダプロジェクト')}
                                >
                                    3.1.2 リソース階層（組織・フォルダ・プロジェクト）
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#313-データセキュリティ鍵管理暗号化シークレット管理"
                                    className={`nav-link nav-link-h3 ${activeId === '313-データセキュリティ鍵管理暗号化シークレット管理' ? 'active' : ''}`}
                                    data-target="313-データセキュリティ鍵管理暗号化シークレット管理"
                                    onClick={() => handleLinkClick('313-データセキュリティ鍵管理暗号化シークレット管理')}
                                >
                                    3.1.3 データセキュリティ（鍵管理・暗号化・シークレット管理）
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#314-職務分掌separation-of-duties"
                                    className={`nav-link nav-link-h3 ${activeId === '314-職務分掌separation-of-duties' ? 'active' : ''}`}
                                    data-target="314-職務分掌separation-of-duties"
                                    onClick={() => handleLinkClick('314-職務分掌separation-of-duties')}
                                >
                                    3.1.4 職務分掌（Separation of Duties）
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー"
                                    className={`nav-link nav-link-h3 ${activeId === '315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー' ? 'active' : ''}`}
                                    data-target="315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー"
                                    onClick={() => handleLinkClick('315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー')}
                                >
                                    3.1.5 セキュリティ制御（監査・VPC Service Controls・コンテキストアウェアアクセス・組織ポリシー・階層ファイアウォールポリシー）
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#316-cloud-kmsによる顧客管理暗号鍵cmekの管理"
                                    className={`nav-link nav-link-h3 ${activeId === '316-cloud-kmsによる顧客管理暗号鍵cmekの管理' ? 'active' : ''}`}
                                    data-target="316-cloud-kmsによる顧客管理暗号鍵cmekの管理"
                                    onClick={() => handleLinkClick('316-cloud-kmsによる顧客管理暗号鍵cmekの管理')}
                                >
                                    3.1.6 Cloud KMSによる顧客管理暗号鍵（CMEK）の管理
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#317-セキュアなリモートアクセス"
                                    className={`nav-link nav-link-h3 ${activeId === '317-セキュアなリモートアクセス' ? 'active' : ''}`}
                                    data-target="317-セキュアなリモートアクセス"
                                    onClick={() => handleLinkClick('317-セキュアなリモートアクセス')}
                                >
                                    3.1.7 セキュアなリモートアクセス
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#318-ソフトウェアサプライチェーンのセキュリティ確保"
                                    className={`nav-link nav-link-h3 ${activeId === '318-ソフトウェアサプライチェーンのセキュリティ確保' ? 'active' : ''}`}
                                    data-target="318-ソフトウェアサプライチェーンのセキュリティ確保"
                                    onClick={() => handleLinkClick('318-ソフトウェアサプライチェーンのセキュリティ確保')}
                                >
                                    3.1.8 ソフトウェアサプライチェーンのセキュリティ確保
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#319-aiのセキュリティ確保"
                                    className={`nav-link nav-link-h3 ${activeId === '319-aiのセキュリティ確保' ? 'active' : ''}`}
                                    data-target="319-aiのセキュリティ確保"
                                    onClick={() => handleLinkClick('319-aiのセキュリティ確保')}
                                >
                                    3.1.9 AIのセキュリティ確保
                                </a>
                            </li>
                        </ul>
                    </div>
                    {' '}
                    <div className="nav-group">
                        <a
                            href="#32-コンプライアンスの設計"
                            className={`nav-link nav-link-h2 ${activeId === '32-コンプライアンスの設計' ? 'active' : ''}`}
                            data-target="32-コンプライアンスの設計"
                            onClick={() => handleLinkClick('32-コンプライアンスの設計')}
                        >
                            3.2 コンプライアンスの設計
                        </a>
                        {' '}
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#321-法令規制"
                                    className={`nav-link nav-link-h3 ${activeId === '321-法令規制' ? 'active' : ''}`}
                                    data-target="321-法令規制"
                                    onClick={() => handleLinkClick('321-法令規制')}
                                >
                                    3.2.1 法令・規制
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#322-商用データの取り扱い"
                                    className={`nav-link nav-link-h3 ${activeId === '322-商用データの取り扱い' ? 'active' : ''}`}
                                    data-target="322-商用データの取り扱い"
                                    onClick={() => handleLinkClick('322-商用データの取り扱い')}
                                >
                                    3.2.2 商用データの取り扱い
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#323-業界認証"
                                    className={`nav-link nav-link-h3 ${activeId === '323-業界認証' ? 'active' : ''}`}
                                    data-target="323-業界認証"
                                    onClick={() => handleLinkClick('323-業界認証')}
                                >
                                    3.2.3 業界認証
                                </a>
                            </li>
                            {' '}
                            <li>
                                <a
                                    href="#324-監査ログを含む"
                                    className={`nav-link nav-link-h3 ${activeId === '324-監査ログを含む' ? 'active' : ''}`}
                                    data-target="324-監査ログを含む"
                                    onClick={() => handleLinkClick('324-監査ログを含む')}
                                >
                                    3.2.4 監査（ログを含む）
                                </a>
                            </li>
                        </ul>
                    </div>
                    {' '}
                    <div className="nav-group">
                        <a
                            href="#well-architected-frameworkセキュリティピラーとの関係"
                            className={`nav-link nav-link-h2 ${activeId === 'well-architected-frameworkセキュリティピラーとの関係' ? 'active' : ''}`}
                            data-target="well-architected-frameworkセキュリティピラーとの関係"
                            onClick={() => handleLinkClick('well-architected-frameworkセキュリティピラーとの関係')}
                        >
                            Well-Architected Frameworkセキュリティピラーとの関係
                        </a>
                        {' '}
                        <ul className="nav-sublist" />
                    </div>
                    {' '}
                    <div className="nav-group">
                        <a
                            href="#学習チェックリスト"
                            className={`nav-link nav-link-h2 ${activeId === '学習チェックリスト' ? 'active' : ''}`}
                            data-target="学習チェックリスト"
                            onClick={() => handleLinkClick('学習チェックリスト')}
                        >
                            学習チェックリスト
                        </a>
                        {' '}
                        <ul className="nav-sublist" />
                    </div>
                    {' '}
                    <div className="nav-group">
                        <a
                            href="#参考文献"
                            className={`nav-link nav-link-h2 ${activeId === '参考文献' ? 'active' : ''}`}
                            data-target="参考文献"
                            onClick={() => handleLinkClick('参考文献')}
                        >
                            参考文献
                        </a>
                        {' '}
                        <ul className="nav-sublist" />
                    </div>
                </nav>
            </aside>
        </>
    );
}
