import type { Metadata } from 'next';
import { CcnaIpConnectivityGuide } from './CcnaIpConnectivityGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA 200-301 徹底解説：IP Connectivity（IP接続性）編 | Cloud & Network Infrastructure Studies',
    description:
        'Cisco CCNA（200-301）試験の出題範囲「3.0 IP Connectivity（25%）」を徹底解説。ルーティングテーブルの解釈、フォワーディング決定ロジック、スタティックルーティング、シングルエリアOSPFv2、FHRP（HSRP/VRRP/GLBP）を初学者向けに図解付きで網羅。',
};

/**
 * Renders the CCNA IP connectivity guide page.
 */
export default function CcnaIpConnectivityGuidePage() {
    return <CcnaIpConnectivityGuide />;
}
