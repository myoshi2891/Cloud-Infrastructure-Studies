import type { Metadata } from 'next';
import { Domain3Guide } from './Domain3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'ドメイン3: 高性能なアーキテクチャの設計 | AWS SAA-C03 完全対策ガイド',
    description: 'AWS Certified Solutions Architect - Associate (SAA-C03) ドメイン3「高性能なアーキテクチャの設計」の試験対策ガイド。ストレージ、コンピューティング、データベース、ネットワーク、データ転送の最適化手法を詳しく解説。',
};

/**
 * Renders the Domain 3 study guide page.
 */
export default function Domain3Page() {
    return <Domain3Guide />;
}
