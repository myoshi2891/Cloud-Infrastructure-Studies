import type { Metadata } from 'next';
import { CcnaBeginnerGuide } from './CcnaBeginnerGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Cisco CCNA試験 完全ガイド ― 初学者のためのステップバイステップ解説 | Cloud & Network Infrastructure Studies',
    description:
        'Cisco CCNA（200-301）試験の完全ガイド。前提知識ゼロの初学者向けに、認定の全体像、出題6ドメイン、合格ロードマップ、2027年改定（v2.0）までわかりやすく解説します。',
};

/**
 * CCNA初心者ガイドページのルートコンポーネント。
 */
export default function CcnaBeginnerGuidePage() {
    return <CcnaBeginnerGuide />;
}
