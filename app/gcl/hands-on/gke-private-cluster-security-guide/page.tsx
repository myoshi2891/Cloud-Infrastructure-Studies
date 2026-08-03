import type { Metadata } from 'next';
import './page.css';
import { GkePrivateClusterSecurityGuide } from './GkePrivateClusterSecurityGuide';

export const metadata: Metadata = {
    title: 'GKE プライベートクラスタ セキュリティ実装ガイド | GCP ハンズオン対策',
    description:
        '最小権限のサービスアカウント設計、限定公開エンドポイント設定、承認済みネットワーク(/32)制限、踏み台(jumphost)経由のGKEアクセスまで、セキュリティ強化のベストプラクティスを完全解説。',
};

/**
 * Renders the GKE private-cluster security implementation guide page.
 *
 * @returns The security guide page content.
 */
export default function Page() {
    return <GkePrivateClusterSecurityGuide />;
}
