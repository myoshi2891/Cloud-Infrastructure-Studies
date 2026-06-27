import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cloud Load Balancing 完全入門',
    description: 'Compute Engine ハンズオン',
};

export default function Page() {
    return (
        <div className="cloud-load-balancing-guide-page">
            <h1>Cloud Load Balancing 完全入門</h1>
            <nav aria-label="ガイドナビゲーション">
                <a href="#overview">このガイドの全体像</a>
                <a href="#prep">事前準備</a>
                <a href="#l4">外部パススルー ネットワークLB</a>
                <a href="#l7">外部アプリケーション ロードバランサ</a>
                <a href="#internal">内部パススルー ネットワークLB</a>
                <a href="#challenge">総合演習 — チャレンジラボの攻略方針</a>
                <a href="#choose">ロードバランサ選定の早見チャート</a>
            </nav>
            <section id="overview">
                <h2>このガイドの全体像</h2>
            </section>
            <section id="l4">
                <h2>外部パススルー ネットワークLB</h2>
            </section>
            <section id="l7">
                <h2>外部アプリケーション ロードバランサ</h2>
            </section>
            <section id="internal">
                <h2>内部パススルー ネットワークLB</h2>
            </section>
            <section id="challenge">
                <h2>総合演習 — チャレンジラボの攻略方針</h2>
            </section>
            <section id="choose">
                <h2>ロードバランサ選定の早見チャート</h2>
            </section>
        </div>
    );
}
