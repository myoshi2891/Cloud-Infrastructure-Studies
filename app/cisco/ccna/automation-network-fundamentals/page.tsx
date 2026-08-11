import { Metadata } from 'next';
import CcnaNetworkFundamentalsGuide from './CcnaNetworkFundamentalsGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA 6.0 Network Fundamentals 完全対策ガイド | Cloud Infrastructure Studies',
    description:
        'Cisco CCNA 200-301 試験の Network Fundamentals ドメイン（MACアドレス・VLAN・IP・ルーティング・3つのPlane・IPサービス・ポート番号・トラブルシューティング）徹底解説。',
};

export default function NetworkFundamentalsPage() {
    return <CcnaNetworkFundamentalsGuide />;
}
