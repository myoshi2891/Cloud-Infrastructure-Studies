import type { Metadata } from 'next';
import './page.css';
import { ComptiaNetworkingConceptsGuide } from './ComptiaNetworkingConceptsGuide';

export const metadata: Metadata = {
    title: 'CompTIA Network+ (N10-009) Networking Concepts ステップバイステップガイド | Cloud Infrastructure Studies',
    description:
        'CompTIA Network+ (N10-009) Domain 1.0 Networking Concepts の出題範囲（1.1〜1.8）を8ステップで徹底解説。OSIモデル、ネットワーク機器、クラウド、ポート・プロトコル、伝送メディア、トポロジー、IPv4/IPv6、最新アーキテクチャまでを網羅。',
};

/**
 * CompTIA Network+ Networking Concepts ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <ComptiaNetworkingConceptsGuide />;
}
