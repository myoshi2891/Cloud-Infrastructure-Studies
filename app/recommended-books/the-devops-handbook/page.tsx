import type { Metadata } from 'next';
import { TheDevOpsHandbookGuide } from './TheDevOpsHandbookGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'The DevOps Handbook 完全ガイド — 初学者のためのステップバイステップ実践ガイド',
    description:
        '『The DevOps Handbook』第2版の全23章・6パート構成を初学者向けに噛み砕き、3つの道（フロー・フィードバック・継続的学習）、低リスクリリース、テレメトリ、シフトレフトセキュリティ、2026年AI時代のDORAとプラットフォームエンジニアリングまでを体系的に解説する完全ガイド。',
};

/**
 * The DevOps Handbook 完全ガイドのページエントリーポイント（Server Component）。
 */
export default function TheDevOpsHandbookPage() {
    return <TheDevOpsHandbookGuide />;
}
