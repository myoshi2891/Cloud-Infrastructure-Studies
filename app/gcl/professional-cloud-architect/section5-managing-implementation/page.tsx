import type { Metadata } from 'next';
import './page.css';
import { PcaSection5Guide } from './PcaSection5Guide';

export const metadata: Metadata = {
    title: 'Google Cloud Professional Cloud Architect Section 5: 実装の管理 完全ガイド',
    description:
        'Google Cloud Professional Cloud Architect認定試験 Section 5「実装の管理」学習ガイド。デプロイ支援、Apigee API管理、テストフレームワーク、移行ツール、Gemini Cloud Assist、Cloud Shell/Code、Google Cloud SDK、Cloudエミュレータ、Terraform IaC、API認証ベストプラクティスを完全解説。',
};

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 5 ガイドページ
 */
export default function PcaSection5Page() {
    return <PcaSection5Guide />;
}
