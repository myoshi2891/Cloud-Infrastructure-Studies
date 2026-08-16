import type { Metadata } from 'next';
import { PcneSection3LoadBalancingGuide } from './PcneSection3LoadBalancingGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'S3: ロードバランシングとトラフィック管理 | PCNE試験対策ガイド',
    description:
        'Google Cloudの各種ロードバランサー（外部／内部、グローバル／リージョン、Application／Proxy Network／Passthrough Network）のアーキテクチャ、選択フロー、NEG/MIGバックエンド、トラフィック管理機能、およびGKE Ingress/Gateway APIとの統合を網羅的に解説。',
};

/**
 * PCNE Section 3 ページコンポーネント (Server Component)
 */
export default function PcneSection3LoadBalancingPage() {
    return <PcneSection3LoadBalancingGuide />;
}
