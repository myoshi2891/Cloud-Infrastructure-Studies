import type { Metadata } from 'next';
import './page.css';
import { PcaGuide } from './PcaGuide';

export const metadata: Metadata = {
    title: 'Google Cloud Professional Cloud Architect（PCA）認定試験 完全対策ガイド | Cloud Infrastructure Studies',
    description:
        'Google Cloud Professional Cloud Architect（PCA）試験の出題範囲（Section 1〜6）を公式Exam Guideに完全準拠して網羅的に解説。Well-Architected Framework、ケーススタディ対策、リソース設計、移行計画、セキュリティ、運用の卓越性までを徹底解説。',
};

/**
 * Google Cloud Professional Cloud Architect（PCA）ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <PcaGuide />;
}
