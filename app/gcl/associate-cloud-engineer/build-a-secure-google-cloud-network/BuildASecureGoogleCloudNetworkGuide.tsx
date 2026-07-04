'use client';

/**
 * Build a Secure Google Cloud Network ガイドのクライアントコンポーネント。
 */

import NavBar from './NavBar';

export default function BuildASecureGoogleCloudNetworkGuide() {
    return (
        <div className="secure-network-page">
            <div className="shell">
                <NavBar />
                <main>
                    <div className="wrap">
                        <section className="hero">
                            <h1>
                                Google Cloud<br />
                                <span>ネットワークセキュリティ</span><br />
                                実践ガイド
                            </h1>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
