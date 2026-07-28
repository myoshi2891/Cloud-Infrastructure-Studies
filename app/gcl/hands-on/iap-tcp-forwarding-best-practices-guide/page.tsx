import type { Metadata } from 'next';
import IapTcpForwardingGuide from './IapTcpForwardingGuide';

export const metadata: Metadata = {
    title: 'IAP（Identity-Aware Proxy）TCP フォワーディング ベストプラクティスガイド',
    description:
        '外部IPなしのVMへ安全にSSH/RDP接続するIAP TCPフォワーディングの実践ベストプラクティスガイド。ファイアウォール・IAM・gcloudトンネリング設定までステップバイステップ解説。',
};

/**
 * Renders the IAP TCP Forwarding Best Practices Study Guide page.
 */
export default function Page() {
    return <IapTcpForwardingGuide />;
}
