import type { Metadata } from 'next';
import { ReleaseItGuide } from './ReleaseItGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Release It! 実践ガイド ― 本番対応ソフトウェアを設計・デプロイするためのステップバイステップ入門',
    description:
        'Michael T. Nygard 著『Release It!』の初版・第2版に基づく完全ガイド。サーキットブレーカー、バルクヘッド、タイムアウト、ゼロダウンタイムデプロイ、カオスエンジニアリングまで、本番対応ソフトウェアの設計・運用パターンを体系的に解説。',
};

/**
 * Release It! 完全ガイドのページエントリーポイント（Server Component）。
 */
export default function ReleaseItPage() {
    return <ReleaseItGuide />;
}
