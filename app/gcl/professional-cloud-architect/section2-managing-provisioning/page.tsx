import type { Metadata } from 'next';
import './page.css';
import { PcaSection2Guide } from './PcaSection2Guide';

export const metadata: Metadata = {
    title: 'PCA Section 2: クラウドソリューションインフラの管理とプロビジョニング | Google Cloud 試験対策ガイド',
    description:
        'Google Cloud Professional Cloud Architect（PCA）試験 セクション2「クラウドソリューションインフラの管理とプロビジョニング（配点 約17.5%）」の完全対策ガイド。ネットワークトポロジ、ストレージ、コンピュートシステム、Gemini Enterprise Agent Platformを活用したMLワークフロー、事前構築AI APIの構成までを網羅的に解説。',
};

/**
 * PCA Section 2「クラウドソリューションインフラの管理とプロビジョニング」ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <PcaSection2Guide />;
}
