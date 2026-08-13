import type { Metadata } from 'next';
import { ExamCatalog } from '@/components/sections/home/ExamCatalog';
import { Hero } from '@/components/sections/home/Hero';
import { Stats } from '@/components/sections/home/Stats';
import { EXAMS, STATS } from './constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Cloud Infrastructure Studies | ホーム',
    description:
        'Google Cloud、AWS、Ciscoの認定試験を横断して学べる日本語学習ガイド。クラウド、ネットワーク、自動化の体系的な試験対策コンテンツを提供します。',
};

/** Composes the public home page from visible exams and site statistics. */
export default function Home() {
    const visibleExams = EXAMS.filter((exam) => exam.status !== 'coming-soon');
    return (
        <main className={styles.page}>
            <Hero exams={visibleExams} />
            <ExamCatalog exams={visibleExams} />
            <Stats stats={STATS} />
        </main>
    );
}
