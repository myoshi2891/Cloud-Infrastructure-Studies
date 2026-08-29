import type { Metadata } from 'next';
import { SreGuide } from './SreGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Site Reliability Engineering (SRE) 入門ガイド | Googleのプロダクションシステム運用',
    description:
        'Googleが実践するSite Reliability Engineering（SRE）の原則・実践・マネジメント、SLI/SLO/SLA、エラーバジェット、トイル撲滅、AI時代のSRE最新動向までを初学者向けに体系的に解説する完全ガイド。',
};

/**
 * Site Reliability Engineering (SRE) 入門ガイドのページエントリーポイント（Server Component）。
 */
export default function SrePage() {
    return <SreGuide />;
}
