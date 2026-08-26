import type { Metadata } from 'next';
import './page.css';
import { PcaSection4Guide } from './PcaSection4Guide';

export const metadata: Metadata = {
    title: 'Google Cloud Professional Cloud Architect Section 4: プロセス分析と最適化 完全ガイド',
    description:
        'Google Cloud Professional Cloud Architect認定試験 Section 4「技術的・ビジネスプロセスの分析と最適化」学習ガイド。SDLC、CI/CD、トラブルシューティング、テスト、DR、ステークホルダー管理、チェンジマネジメント、コスト最適化、BCPを完全解説。',
};

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 4 ガイドページ
 */
export default function PcaSection4Page() {
    return <PcaSection4Guide />;
}
