'use client';

import { useEffect, useState } from 'react';

export default function NavBar() {
    const [progress, setProgress] = useState(0);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // スクロールプログレスバーの更新
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // IntersectionObserver によるスクロールスパイ
        if (typeof IntersectionObserver !== 'undefined') {
            const headings = Array.from(
                document.querySelectorAll<HTMLElement>('.article h2[id], .article h3[id]')
            );

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                {
                    rootMargin: '-80px 0px -60% 0px',
                    threshold: 0,
                }
            );

            headings.forEach((h) => observer.observe(h));

            return () => {
                window.removeEventListener('scroll', handleScroll);
                observer.disconnect();
            };
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="nav-toggle"
                id="navToggle"
                aria-label="メニューを開く"
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <nav className={`sidebar ${isOpen ? 'is-open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <div className="mark">SA</div>
                    <div className="label">AWS Certification</div>
                </div>
                <div className="sidebar-title">
                    Solutions Architect<br />– Associate (SAA-C03)
                </div>
                <div className="nav-progress">
                    <div
                        className="nav-progress-bar"
                        id="navProgressBar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <a
                            href="#1-試験の全体像"
                            className={`nav-link nav-link--top ${
                                activeId === '1-試験の全体像' ? 'is-active' : ''
                            }`}
                        >
                            1. 試験の全体像
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#11-対象者像"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '11-対象者像' ? 'is-active' : ''
                                    }`}
                                >
                                    1.1 対象者像
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#12-出題形式とスコアリング"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '12-出題形式とスコアリング' ? 'is-active' : ''
                                    }`}
                                >
                                    1.2 出題形式とスコアリング
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#13-ドメイン構成と配点"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '13-ドメイン構成と配点' ? 'is-active' : ''
                                    }`}
                                >
                                    1.3 ドメイン構成と配点
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#2-ドメイン1-セキュアなアーキテクチャの設計30"
                            className={`nav-link nav-link--top ${
                                activeId === '2-ドメイン1-セキュアなアーキテクチャの設計30' ? 'is-active' : ''
                            }`}
                        >
                            2. ドメイン1: セキュアなアーキテクチャの設計（30%）
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#20-aws責任共有モデルshared-responsibility-model"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '20-aws責任共有モデルshared-responsibility-model' ? 'is-active' : ''
                                    }`}
                                >
                                    2.0 AWS責任共有モデル
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#21-タスク11-awsリソースへのセキュアなアクセス設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '21-タスク11-awsリソースへのセキュアなアクセス設計' ? 'is-active' : ''
                                    }`}
                                >
                                    2.1 タスク1.1: セキュアアクセス設計
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#22-タスク12-セキュアなワークロードとアプリケーションの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '22-タスク12-セキュアなワークロードとアプリケーションの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    2.2 タスク1.2: ワークロード設計
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#23-タスク13-適切なデータセキュリティコントロールの決定"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '23-タスク13-適切なデータセキュリティコントロールの決定' ? 'is-active' : ''
                                    }`}
                                >
                                    2.3 タスク1.3: データセキュリティ
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#3-ドメイン2-回復力のあるアーキテクチャの設計26"
                            className={`nav-link nav-link--top ${
                                activeId === '3-ドメイン2-回復力のあるアーキテクチャの設計26' ? 'is-active' : ''
                            }`}
                        >
                            3. ドメイン2: 回復力のあるアーキテクチャの設計（26%）
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#31-タスク21-スケーラブルで疎結合なアーキテクチャの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '31-タスク21-スケーラブルで疎結合なアーキテクチャの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    3.1 タスク2.1: 疎結合アーキテクチャ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#32-タスク22-高可用性フォールトトレラントアーキテクチャの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '32-タスク22-高可用性フォールトトレラントアーキテクチャの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    3.2 タスク2.2: 高可用性・FT設計
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#4-ドメイン3-高性能アーキテクチャの設計24"
                            className={`nav-link nav-link--top ${
                                activeId === '4-ドメイン3-高性能アーキテクチャの設計24' ? 'is-active' : ''
                            }`}
                        >
                            4. ドメイン3: 高性能アーキテクチャの設計（24%）
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#41-タスク31-高性能スケーラブルなストレージソリューション"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '41-タスク31-高性能スケーラブルなストレージソリューション' ? 'is-active' : ''
                                    }`}
                                >
                                    4.1 タスク3.1: ストレージ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#42-タスク32-高性能で弾力性のあるコンピューティングソリューションの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '42-タスク32-高性能で弾力性のあるコンピューティングソリューションの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    4.2 タスク3.2: コンピューティング
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#43-タスク33-高性能データベースソリューションの決定"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '43-タスク33-高性能データベースソリューションの決定' ? 'is-active' : ''
                                    }`}
                                >
                                    4.3 タスク3.3: データベース
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#44-タスク34-高性能スケーラブルなネットワークアーキテクチャの決定"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '44-タスク34-高性能スケーラブルなネットワークアーキテクチャの決定' ? 'is-active' : ''
                                    }`}
                                >
                                    4.4 タスク3.4: ネットワーク
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#45-タスク35-高性能データ取り込み変換ソリューションの決定"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '45-タスク35-高性能データ取り込み変換ソリューションの決定' ? 'is-active' : ''
                                    }`}
                                >
                                    4.5 タスク3.5: データ取り込み・変換
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#5-ドメイン4-コスト最適化アーキテクチャの設計20"
                            className={`nav-link nav-link--top ${
                                activeId === '5-ドメイン4-コスト最適化アーキテクチャの設計20' ? 'is-active' : ''
                            }`}
                        >
                            5. ドメイン4: コスト最適化アーキテクチャの設計（20%）
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#51-タスク41-コスト最適化ストレージソリューションの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '51-タスク41-コスト最適化ストレージソリューションの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    5.1 タスク4.1: ストレージコスト
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#52-タスク42-コスト最適化コンピューティングソリューションの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '52-タスク42-コスト最適化コンピューティングソリューションの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    5.2 タスク4.2: コンピューティングコスト
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#53-タスク43-コスト最適化データベースソリューションの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '53-タスク43-コスト最適化データベースソリューションの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    5.3 タスク4.3: DBコスト
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#54-タスク44-コスト最適化ネットワークアーキテクチャの設計"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '54-タスク44-コスト最適化ネットワークアーキテクチャの設計' ? 'is-active' : ''
                                    }`}
                                >
                                    5.4 タスク4.4: ネットワークコスト
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#6-aws-well-architected-framework6つの柱"
                            className={`nav-link nav-link--top ${
                                activeId === '6-aws-well-architected-framework6つの柱' ? 'is-active' : ''
                            }`}
                        >
                            6. AWS Well-Architected Framework
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#7-学習の進め方試験当日のコツ"
                            className={`nav-link nav-link--top ${
                                activeId === '7-学習の進め方試験当日のコツ' ? 'is-active' : ''
                            }`}
                        >
                            7. 学習の進め方・試験当日のコツ
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#71-学習ステップ初級者向け"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '71-学習ステップ初級者向け' ? 'is-active' : ''
                                    }`}
                                >
                                    7.1 学習ステップ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#72-頻出の二択多択判断軸まとめ"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '72-頻出の二択多択判断軸まとめ' ? 'is-active' : ''
                                    }`}
                                >
                                    7.2 二択・多択判断軸
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#73-試験当日のコツ"
                                    className={`nav-link nav-link--sub ${
                                        activeId === '73-試験当日のコツ' ? 'is-active' : ''
                                    }`}
                                >
                                    7.3 試験当日のコツ
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#8-参考文献出典一覧"
                            className={`nav-link nav-link--top ${
                                activeId === '8-参考文献出典一覧' ? 'is-active' : ''
                            }`}
                        >
                            8. 参考文献・出典一覧
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
