import type { Metadata } from 'next';
import './page.css';
import { PcaSection6Guide } from './PcaSection6Guide';

export const metadata: Metadata = {
    title: 'Google Cloud Professional Cloud Architect Section 6: ソリューションと運用の卓越性の確保 完全ガイド',
    description:
        'Google Cloud Professional Cloud Architect認定試験 Section 6「ソリューションと運用の卓越性の確保」学習ガイド。Well-Architected Framework運用の卓越性の柱、Google Cloud Observability（Monitoring/Logging/Trace/Profiler）、Cloud Deployリリース管理、サポートティア、Active Assist、Personalized Service Health、SREプラクティス、カオスエンジニアリングを完全解説。',
};

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 6 ガイドページ
 */
export default function PcaSection6Page() {
    return <PcaSection6Guide />;
}
