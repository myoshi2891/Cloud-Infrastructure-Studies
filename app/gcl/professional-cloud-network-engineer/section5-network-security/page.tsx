import type { Metadata } from 'next';
import { PcneSection5NetworkSecurityGuide } from './PcneSection5NetworkSecurityGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCNE S5: ネットワークセキュリティの設計と実装 | Google Cloud 認定試験対策',
    description:
        'Professional Cloud Network Engineer (PCNE) 試験対策 Section 5: ネットワークセキュリティの設計と実装。Cloud Armor、Cloud NGFW、VPCファイアウォール、Cloud NAT、Secure Web Proxy、セルフマネージドNVA、Packet Mirroringの設計・実装ガイド。',
};

/**
 * PCNE Section 5 ページコンポーネント (Server Component)
 */
export default function PcneSection5Page() {
    return <PcneSection5NetworkSecurityGuide />;
}
