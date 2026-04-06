import type { Metadata } from 'next';
import './cdl.css';

export const metadata: Metadata = {
    title: 'Cloud Digital Leader 認定試験',
    description:
        'Google Cloud Digital Leader 包括的解説。DX・データ・AI/ML・インフラ・セキュリティ・生成AI の全領域を詳解。',
};

export default function CloudDigitalLeaderPage() {
    return (
        <div className="cdl-page">
            <section className="hero">
                <div className="hero-eyebrow">Google Cloud Certification · CDL</div>
                <h1>
                    Cloud Digital Leader{' '}
                    <span>認定試験</span>
                </h1>
                <p className="hero-sub">
                    DX・データ・AI/ML・インフラ・セキュリティ・生成AI — 全領域を体系的に解説
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-blue" />
                        全8セクション
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-red" />
                        試験時間 90分
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-yellow" />
                        60問
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        合格ライン 70%
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="セクションナビゲーション">
                <div className="snav-inner">
                    <a href="#s0" className="snav-link"><span className="snav-num">00</span>試験概要</a>
                    <a href="#s1" className="snav-link"><span className="snav-num">01</span>DX・クラウド基礎</a>
                    <a href="#s2" className="snav-link"><span className="snav-num">02</span>データとイノベーション</a>
                    <a href="#s3" className="snav-link"><span className="snav-num">03</span>AI/ML</a>
                    <a href="#s4" className="snav-link"><span className="snav-num">04</span>インフラとモダナイゼーション</a>
                    <a href="#s5" className="snav-link"><span className="snav-num">05</span>セキュリティと運用</a>
                    <a href="#s6" className="snav-link"><span className="snav-num">06</span>サービス早見表</a>
                    <a href="#s7" className="snav-link"><span className="snav-num">07</span>試験攻略</a>
                    <a href="#s8" className="snav-link"><span className="snav-num">08</span>参照リソース</a>
                </div>
            </nav>

            <div className="wrapper">
                {/* セクションは順次追加予定 */}
                <div id="s0" className="sgap">
                    <p style={{ color: 'var(--cdl-text-muted)' }}>コンテンツ実装中...</p>
                </div>
            </div>

            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 包括的解説</p>
            </footer>
        </div>
    );
}
