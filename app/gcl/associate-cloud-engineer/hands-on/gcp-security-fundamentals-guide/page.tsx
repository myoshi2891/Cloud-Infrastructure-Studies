import type { Metadata } from 'next';
import { GcpSecurityFundamentalsGuide } from './GcpSecurityFundamentalsGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Google Cloud セキュリティ基礎 完全ガイド | Associate Cloud Engineer ハンズオン',
    description: 'IAM, カスタムロール, サービスアカウント, VPC Peering, IAP, Cloud KMS, Private GKE を活用した最小権限の原則に基づく Google Cloud セキュリティ設計の完全ガイド。',
};

export default function Page() {
    return <GcpSecurityFundamentalsGuide />;
}
