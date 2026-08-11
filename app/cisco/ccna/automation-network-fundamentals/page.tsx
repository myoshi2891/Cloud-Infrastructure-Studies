import { Metadata } from 'next';
import CcnaNetworkFundamentalsGuide from './CcnaNetworkFundamentalsGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNAAUTO 200-901 | 6.0 Network Fundamentals 完全対策ガイド | Cloud Infrastructure Studies',
    description:
        'Cisco CCNA Automation 200-901 試験の Network Fundamentals ドメイン（MACアドレス・VLAN・IP・ルーティング・3つのPlane・IPサービス・ポート番号・トラブルシューティング）徹底解説。',
};

export default function NetworkFundamentalsPage() {
    return <CcnaNetworkFundamentalsGuide />;
}
