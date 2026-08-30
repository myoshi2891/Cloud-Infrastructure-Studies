import type { Metadata } from 'next';
import { InfrastructureAsCodeGuide } from './InfrastructureAsCodeGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Infrastructure as Code 実践ガイド ― 初学者のためのステップバイステップ・ベストプラクティス',
    description:
        'Kief Morris 著『Infrastructure as Code』の考え方を土台に、2026年最新エコシステム（Terraform / OpenTofu / Pulumi / GitOps / Policy as Code）を踏まえて再構成した、初学者向けの実践ガイド。',
};

export default function InfrastructureAsCodePage() {
    return <InfrastructureAsCodeGuide />;
}
