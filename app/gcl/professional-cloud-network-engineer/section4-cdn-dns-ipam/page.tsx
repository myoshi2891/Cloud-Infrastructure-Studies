import type { Metadata } from 'next';
import { PcneSection4CdnDnsIpamGuide } from './PcneSection4CdnDnsIpamGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCNE S4: CDN・DNS・IPアドレス管理 | Google Cloud 認定試験対策',
    description:
        'Cloud CDN・Cloud DNS・IPアドレス管理（IPAM）の3領域を、公式Exam Guideのタスク定義に沿って中級者〜上級者向けに解説します。',
};

/**
 * PCNE Section 4: CDN・DNS・IPアドレス管理 完全ガイドページ
 */
export default function PcneSection4Page() {
    return <PcneSection4CdnDnsIpamGuide />;
}
