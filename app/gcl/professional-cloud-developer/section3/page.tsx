import type { Metadata } from 'next';
import { Section3Guide } from './Section3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCD Section 3: デプロイのためのクラウドネイティブアプリケーション構成 | Cloud Infrastructure Studies',
    description:
        'Google Cloud Professional Cloud Developer (PCD) 認定試験 Section 3「デプロイのためのクラウドネイティブアプリケーション構成」完全対策ガイド。Cloud Runへのソースコード/イメージデプロイ、Eventarc・Pub/Subトリガーとイベントレシーバー構成、ApigeeによるAPIバージョニング・公開・セキュリティ確保、GKEへのコンテナデプロイ（gke-deploy）、Startup/Liveness/Readinessプローブ、Horizontal Pod Autoscaler（HPA）属性とメトリクスチューニングを徹底解説。',
};

/**
 * Professional Cloud Developer Section 3 ページ (Server Component)
 */
export default function Page() {
    return <Section3Guide />;
}
