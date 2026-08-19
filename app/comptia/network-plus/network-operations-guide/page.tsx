import type { Metadata } from 'next';
import './page.css';
import { ComptiaNetworkOperationsGuide } from './ComptiaNetworkOperationsGuide';

export const metadata: Metadata = {
    title: 'CompTIA Network+ (N10-009) ネットワークの運用 徹底解説ガイド | Cloud Infrastructure Studies',
    description:
        'CompTIA Network+ (N10-009) Domain 3.0 Network Operations（ネットワークの運用）の出題範囲を8つのサブトピックで徹底解説。ドキュメンテーション、ライフサイクル管理、変更管理、構成管理、ネットワーク監視、災害復旧、基盤サービス、アクセス管理までを網羅。',
};

/**
 * CompTIA Network+ Network Operations ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <ComptiaNetworkOperationsGuide />;
}
