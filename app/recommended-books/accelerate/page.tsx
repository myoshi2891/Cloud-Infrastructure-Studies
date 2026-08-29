import type { Metadata } from 'next';
import { AccelerateGuide } from './AccelerateGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Accelerate 完全ガイド | Leanと DevOps の科学を初学者向けに解説',
    description:
        'Nicole Forsgren・Jez Humble・Gene Kim著『Accelerate』とDORAメトリクス、24の能力、Westrum組織文化モデルを初学者向けにステップバイステップで解説する完全ガイド。',
};

/**
 * Accelerate 完全ガイドのページエントリーポイント（Server Component）。
 */
export default function AcceleratePage() {
    return <AccelerateGuide />;
}
