import type { Metadata } from 'next';
import { ProfessionalCloudDeveloperGuide } from './ProfessionalCloudDeveloperGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Google Cloud Professional Cloud Developer（PCD）認定試験 学習ガイド',
    description:
        'Google Cloud Professional Cloud Developer (PCD) 認定試験の出題範囲（設計、ビルド・テスト、デプロイ、サービス統合）を網羅した包括的な学習ガイドです。',
};

export default function ProfessionalCloudDeveloperPage() {
    return <ProfessionalCloudDeveloperGuide />;
}
