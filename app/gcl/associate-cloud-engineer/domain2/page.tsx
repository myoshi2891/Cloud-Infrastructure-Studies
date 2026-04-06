import type { Metadata } from 'next';
import './domain2.css';

export const metadata: Metadata = {
    title: 'Domain 2: Planning and Implementing a Cloud Solution',
    description:
        'Google Cloud ACE Domain 2 包括的解説。コンピューティング・ストレージ・ネットワーク・Terraform の計画と実装を詳解。',
};

export default function Domain2Page() {
    return (
        <div className="d2-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE Domain 2 · ~21%</div>
                <h1>
                    Planning and Implementing{' '}
                    <span>a Cloud Solution</span>
                </h1>
                <p className="hero-sub">
                    クラウドソリューションの計画と実装 — 初学者でもわかる詳細解説とベストプラクティス
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        試験配点 ~21%
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-cyan" />
                        全16章
                    </span>
                    <span className="hero-badge">
                        <span className="dot" />
                        コードブロック 234個
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="章ナビゲーション">
                <div className="snav-inner">
                    <a href="#ch0" className="snav-link"><span className="snav-num">00</span>全体マップ</a>
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span>コンピューティング選定</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span>Compute Engine</a>
                    <a href="#ch3" className="snav-link"><span className="snav-num">03</span>Spot VM</a>
                    <a href="#ch4" className="snav-link"><span className="snav-num">04</span>MIG</a>
                    <a href="#ch5" className="snav-link"><span className="snav-num">05</span>GKE</a>
                    <a href="#ch6" className="snav-link"><span className="snav-num">06</span>Cloud Run</a>
                    <a href="#ch7" className="snav-link"><span className="snav-num">07</span>Cloud Functions</a>
                    <a href="#ch8" className="snav-link"><span className="snav-num">08</span>Cloud Storage</a>
                    <a href="#ch9" className="snav-link"><span className="snav-num">09</span>ブロック/ファイル</a>
                    <a href="#ch10" className="snav-link"><span className="snav-num">10</span>データベース</a>
                    <a href="#ch11" className="snav-link"><span className="snav-num">11</span>VPC</a>
                    <a href="#ch12" className="snav-link"><span className="snav-num">12</span>Shared VPC</a>
                    <a href="#ch13" className="snav-link"><span className="snav-num">13</span>Cloud NAT/DNS</a>
                    <a href="#ch14" className="snav-link"><span className="snav-num">14</span>ロードバランサ</a>
                    <a href="#ch15" className="snav-link"><span className="snav-num">15</span>Terraform</a>
                    <a href="#ch16" className="snav-link"><span className="snav-num">16</span>試験対策</a>
                </div>
            </nav>

            <div className="wrapper">
                <div id="ch0" className="sgap">
                    <p style={{ color: 'var(--d2-text-muted)' }}>コンテンツ実装中...</p>
                </div>
                <div id="ch1" className="sgap">
                    <h2>コンピューティングサービスの選定</h2>
                </div>
                <div id="ch2" className="sgap">
                    <h2>Compute Engine 詳解</h2>
                </div>
                <div id="ch3" className="sgap">
                    <h2>Spot VM の活用</h2>
                </div>
                <div id="ch4" className="sgap">
                    <h2>Managed Instance Groups (MIG)</h2>
                </div>
                <div id="ch5" className="sgap">
                    <h2>Google Kubernetes Engine (GKE)</h2>
                </div>
                <div id="ch6" className="sgap">
                    <h2>Cloud Run</h2>
                </div>
                <div id="ch7" className="sgap">
                    <h2>Cloud Functions</h2>
                </div>
                <div id="ch8" className="sgap">
                    <h2>Cloud Storage</h2>
                </div>
                <div id="ch9" className="sgap">
                    <h2>ブロック・ファイルストレージ</h2>
                </div>
                <div id="ch10" className="sgap">
                    <h2>データベース選定</h2>
                </div>
                <div id="ch11" className="sgap">
                    <h2>VPC 設計</h2>
                </div>
                <div id="ch12" className="sgap">
                    <h2>Shared VPC と VPC Peering</h2>
                </div>
                <div id="ch13" className="sgap">
                    <h2>Cloud NAT と Cloud DNS</h2>
                </div>
                <div id="ch14" className="sgap">
                    <h2>ロードバランサ</h2>
                </div>
                <div id="ch15" className="sgap">
                    <h2>Terraform による IaC</h2>
                </div>
                <div id="ch16" className="sgap">
                    <h2>試験対策まとめ</h2>
                    <p style={{ color: 'var(--d2-text-muted)' }}>ベストプラクティス: コンテンツ実装中...</p>
                </div>
            </div>

            <footer className="page-footer">
                <p>Domain 2: Planning and Implementing a Cloud Solution</p>
            </footer>
        </div>
    );
}
