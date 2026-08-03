import type { Metadata } from 'next';
import './page.css';
import { GriffinWordPressGkeGuide } from './GriffinWordPressGkeGuide';

export const metadata: Metadata = {
    title: 'Team Griffin インフラ構築チャレンジラボ 完全解説ガイド',
    description:
        'Google Cloud スキルバッジ「Develop your Google Cloud Network」相当の Team Griffin チャレンジラボ完全解説ガイド。VPC/踏み台ホスト/Cloud SQL/GKE/WordPress/モニタリング/IAMのベストプラクティス。',
};

/**
 * Server component for the Griffin WordPress GKE Guide page.
 */
export default function GriffinWordPressGkeGuidePage() {
    return <GriffinWordPressGkeGuide />;
}
