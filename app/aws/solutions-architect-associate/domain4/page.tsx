import type { Metadata } from 'next';
import { Domain4Guide } from './Domain4Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'ドメイン4: コスト最適化アーキテクチャの設計 | AWS SAA-C03 完全対策ガイド',
    description: 'AWS Certified Solutions Architect - Associate (SAA-C03) ドメイン4「コスト最適化アーキテクチャの設計」の試験対策ガイド。ストレージ、コンピューティング、データベース、ネットワークのコスト最適化手法を詳しく解説。',
};

/**
 * Renders the Domain 4 study guide page.
 */
export default function Domain4Page() {
    return <Domain4Guide />;
}
