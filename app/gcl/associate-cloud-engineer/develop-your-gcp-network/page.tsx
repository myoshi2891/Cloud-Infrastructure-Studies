import type { Metadata } from 'next';
import DevelopYourGcpNetworkGuide from './DevelopYourGcpNetworkGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Develop Your Google Cloud Network — 初学者向け完全入門',
    description:
        'BigQuery のクエリから Cloud SQL への移行、VPC 設計、監視、Kubernetes のデプロイ戦略まで、Google Cloud のネットワークとインフラを 6 つの hop で体験的に学ぶハンズオンガイド。',
};

export default function Page() {
    return <DevelopYourGcpNetworkGuide />;
}
