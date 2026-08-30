import type { Metadata } from 'next';
import './page.css';
import { ComptiaNetworkSecurityGuide } from './ComptiaNetworkSecurityGuide';

export const metadata: Metadata = {
    title: 'CompTIA Network+ (N10-009) ドメイン4.0 ネットワークセキュリティ完全ガイド | Cloud Infrastructure Studies',
    description:
        'CompTIA Network+ 認定試験(試験コード: N10-009 / V9)のドメイン4.0 Network Security(出題比率14%)を、初学者にもわかるようにステップバイステップで解説。暗号化、PKI、IAM、欺瞞技術、CIA Triad、攻撃の種類、NAC、ゾーン設計までを網羅。',
};

/**
 * CompTIA Network+ Network Security ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <ComptiaNetworkSecurityGuide />;
}
