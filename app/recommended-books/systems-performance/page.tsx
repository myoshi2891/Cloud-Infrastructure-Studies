import type { Metadata } from 'next';
import { SystemsPerformanceGuide } from './SystemsPerformanceGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Systems Performance: Enterprise and the Cloud 実践ガイド',
    description:
        'Brendan Gregg 著『Systems Performance: Enterprise and the Cloud, 2nd Edition』（詳解 システム・パフォーマンス 第2版）を軸に、システムパフォーマンス分析の考え方・メソドロジ・ツールを初学者向けに整理した完全実践ガイド。',
};

export default function SystemsPerformancePage() {
    return <SystemsPerformanceGuide />;
}
