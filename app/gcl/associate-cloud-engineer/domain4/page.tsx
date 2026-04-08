import { Metadata } from 'next';
import { D4_SECTION_TITLE } from './constants';

export const metadata: Metadata = {
    title: 'ACE Domain 4: Access and Security | Cloud Infra Studies',
    description: 'Google Cloud Associate Cloud Engineer Domain 4: Configuring access and security study guide.',
};

export default function Domain4Page() {
    return (
        <main className="d4-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE Exam Preparation</div>
                <h1><span>Domain 4</span><br />アクセスとセキュリティの構成</h1>
                <p className="hero-sub">
                    Identity and Access Management (IAM), Service Accounts, Security Command Center, Cloud Armor, and more.
                </p>
                <div className="hero-meta">
                    <span className="hero-badge"><span className="dot dot-purple"></span>試験比重: 約20%</span>
                </div>
            </section>

            <nav className="snav">
                <div className="snav-inner">
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span> セキュリティの基本</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span> IAMアーキテクチャ</a>
                </div>
            </nav>

            <div className="wrapper">
                {/* Sections will be added here via TDD */}
            </div>
        </main>
    );
}
