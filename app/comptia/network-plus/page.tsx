import type { Metadata } from 'next';
import ComptiaNetworkPlusGuide from './ComptiaNetworkPlusGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CompTIA Network+ 試験 完全ガイド (N10-009 / V9) | Cloud Infrastructure Studies',
    description:
        'CompTIA Network+ (N10-009 / V9) の試験概要、出題範囲5ドメイン、OSI参照モデル、学習ロードマップ、トラブルシューティング方法論を完全解説。',
};

export default function ComptiaNetworkPlusPage() {
    return <ComptiaNetworkPlusGuide />;
}
