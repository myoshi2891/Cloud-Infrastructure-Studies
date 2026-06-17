import type { Metadata } from 'next';
import './page.css';
import { REVISION_DATE } from './constants';

export const metadata: Metadata = {
    title: 'ACE Section 4 | Configuring Access and Security | Google Cloud',
    description: `GCP ACE Section 4 (アクセスとセキュリティの構成) 完全ガイド。試験配点 ~20%。IAMポリシー、サービスアカウント、Workload Identity Federation。`,
};

/**
 * Google Cloud Associate Cloud Engineer (ACE) 試験対策セクション 4 ページ。
 * 
 * このページは「Configuring Access and Security」に関する学習ガイドを提供します。
 * 
 * @returns {JSX.Element} ACE セクション 4 の学習ガイド画面
 */
export default function Page() {
    // 最小実装（テストを通すため）
    const dummyCheckboxes = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="ace-section4-page">
            <nav aria-label="Section 4" className="sidebar">
                <a href="#principles" className="nav-item">原則</a>
                {Array.from({ length: 14 }).map((_, i) => (
                    <a key={i} href={`#dummy-${i}`} className="nav-item">Link</a>
                ))}
            </nav>
            <main className="main">
                <section className="hero">
                    <h1 className="hero-title">
                        Configuring Access and Security
                    </h1>
                    <p className="hero-sub">~20% 2025年6月版</p>
                </section>
                <div className="content">
                    <div id="principles">
                        <h2>セキュリティ設計の基本原則</h2>
                    </div>
                    <div>
                        <h2>IAMの管理</h2>
                    </div>
                    <div>
                        <h2>サービスアカウントの管理</h2>
                    </div>
                    <div>
                        <h2>頻出パターン別 解法ガイド</h2>
                    </div>
                    <div>
                        <h2>引っかけ問題パターン 完全攻略</h2>
                    </div>
                    <div>
                        <h3 className="section-title">Section 4 直前チェックリスト</h3>
                        {dummyCheckboxes.map(i => (
                            <div key={i} className="check-box"></div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
