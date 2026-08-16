import type { Metadata } from 'next';
import { PcneSection6NetworkOpsMonitoringGuide } from './PcneSection6NetworkOpsMonitoringGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCNE試験対策ガイド S6: ネットワーク操作と監視',
    description:
        'Google Cloud Observability（Cloud Logging / Cloud Monitoring）、各種ネットワークコンポーネントのトラブルシューティング、Network Intelligence Centerによる可視化と予防診断を包括的に解説します。',
};

/**
 * PCNE Section 6: ネットワーク操作と監視 完全ガイドページ
 */
export default function PcneSection6Page() {
    return <PcneSection6NetworkOpsMonitoringGuide />;
}
