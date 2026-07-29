import type { Metadata } from 'next';
import BuildASecureGoogleCloudNetworkGuide from './BuildASecureGoogleCloudNetworkGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Google Cloud ネットワークセキュリティ実践ガイド — VPC・ファイアウォール・IAP・ロードバランシング',
    description:
        'VPC、ファイアウォール、IAM、IAP、ロードバランサ、Cloud Armor をゼロから理解する初学者向け実践ガイド。多層防御の考え方をステップバイステップで解説。',
};

/**
 * Renders the Google Cloud secure network study guide.
 *
 * @returns The guide page content.
 */
export default function Page() {
    return <BuildASecureGoogleCloudNetworkGuide />;
}
