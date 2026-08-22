import type { Metadata } from 'next';
import './page.css';
import { PcaSection1Guide } from './PcaSection1Guide';

export const metadata: Metadata = {
    title: 'PCA Section 1: クラウドソリューションアーキテクチャの設計と計画 | Google Cloud 試験対策ガイド',
    description:
        'Google Cloud Professional Cloud Architect（PCA）試験 セクション1「クラウドソリューションアーキテクチャの設計と計画（配点 約25%）」の完全対策ガイド。Well-Architected Framework 6ピラー、ビジネス・技術要件設計、ネットワーク・ストレージ・コンピュート選定、Migration Centerと移行計画、4公式ケーススタディ対策までを網羅的に解説。',
};

/**
 * PCA Section 1「クラウドソリューションアーキテクチャの設計と計画」ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <PcaSection1Guide />;
}
