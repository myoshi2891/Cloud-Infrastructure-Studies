import type { Metadata } from 'next';
import SaaGuide from './SaaGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド',
    description:
        'AWS公式 Exam Guide (SAA-C03) の4ドメイン・14タスクステートメントに完全準拠した完全対策ガイド。セキュア、回復力、高性能、コスト最適化アーキテクチャの設計を比較表とMermaid図解で徹底解説。',
};

export default function Page() {
    return <SaaGuide />;
}
