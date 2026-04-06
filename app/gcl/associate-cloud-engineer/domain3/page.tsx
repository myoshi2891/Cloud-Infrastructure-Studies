import type { Metadata } from 'next';
import './domain3.css';

export const metadata: Metadata = {
    title: 'Domain 3: Ensuring Successful Operation of a Cloud Solution',
    description:
        'Google Cloud ACE Domain 3 包括的解説。SRE・監視・ロギング・バックアップ・障害対応の運用管理を詳解。',
};

export default function Domain3Page() {
    return (
        <div className="d3-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE Domain 3 · ~22%</div>
                <h1>
                    Ensuring Successful Operation{' '}
                    <span>of a Cloud Solution</span>
                </h1>
                <p className="hero-sub">
                    クラウドソリューションの運用管理 — SRE・監視・ロギング・障害対応を詳細解説
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        試験配点 ~22%
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-cyan" />
                        全17章
                    </span>
                    <span className="hero-badge">
                        <span className="dot" />
                        コードブロック 190個
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="章ナビゲーション">
                <div className="snav-inner">
                    <a href="#ch0" className="snav-link"><span className="snav-num">00</span>全体マップ</a>
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span>SRE的アプローチ</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span>GCEライフサイクル</a>
                    <a href="#ch3" className="snav-link"><span className="snav-num">03</span>スナップショット</a>
                    <a href="#ch4" className="snav-link"><span className="snav-num">04</span>MIG運用</a>
                    <a href="#ch5" className="snav-link"><span className="snav-num">05</span>GKEクラスタ運用</a>
                    <a href="#ch6" className="snav-link"><span className="snav-num">06</span>Cloud Run/Functions</a>
                    <a href="#ch7" className="snav-link"><span className="snav-num">07</span>Storageデータ管理</a>
                    <a href="#ch8" className="snav-link"><span className="snav-num">08</span>SQL/Spannerバックアップ</a>
                    <a href="#ch9" className="snav-link"><span className="snav-num">09</span>Cloud Monitoring</a>
                    <a href="#ch10" className="snav-link"><span className="snav-num">10</span>Ops Agent</a>
                    <a href="#ch11" className="snav-link"><span className="snav-num">11</span>アラートとSLO</a>
                    <a href="#ch12" className="snav-link"><span className="snav-num">12</span>Cloud Logging</a>
                    <a href="#ch13" className="snav-link"><span className="snav-num">13</span>監査ログ</a>
                    <a href="#ch14" className="snav-link"><span className="snav-num">14</span>Log Router</a>
                    <a href="#ch15" className="snav-link"><span className="snav-num">15</span>Trace/Profiler</a>
                    <a href="#ch16" className="snav-link"><span className="snav-num">16</span>Gemini Cloud Assist</a>
                    <a href="#ch17" className="snav-link"><span className="snav-num">17</span>試験対策</a>
                </div>
            </nav>

            <div className="wrapper">
                {/* 章は順次追加予定 */}
                <div id="ch0" className="sgap">
                    <p style={{ color: 'var(--d3-text-muted)' }}>コンテンツ実装中...</p>
                </div>
            </div>

            <footer className="page-footer">
                <p>Domain 3: Ensuring Successful Operation of a Cloud Solution</p>
            </footer>
        </div>
    );
}
