import type { Metadata } from 'next';
import './page.css';
import { PcaSection3Guide } from './PcaSection3Guide';

export const metadata: Metadata = {
    title: 'Google Cloud PCA試験対策ガイド | Section 3: セキュリティとコンプライアンスの設計',
    description:
        'Google Cloud Professional Cloud Architect（PCA）認定試験 Section 3「セキュリティとコンプライアンスの設計（配点 約17.5%）」完全対策ガイド。IAM、リソース階層、データ暗号化（Cloud KMS/CMEK）、職務分掌、セキュリティ制御（VPC SC/IAP/Org Policy）、ソフトウェアサプライチェーン、AIセキュリティ、法令規制・コンプライアンスまで網羅。',
};

/**
 * PCA Section 3「セキュリティとコンプライアンスの設計」ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <PcaSection3Guide />;
}
