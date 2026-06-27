import type { Metadata } from 'next';
import CloudLoadBalancingGuide from './CloudLoadBalancingGuide';
import { REVISION_DATE } from './constants';
import './page.css';

export const metadata: Metadata = {
    title: 'Cloud Load Balancing 完全入門 | Compute Engine ハンズオン',
    description: `Google Cloud のロードバランシングを初学者向けにステップバイステップで解説。L4パススルー、L7アプリケーション、内部LBをgcloudで構築するハンズオンガイド。${REVISION_DATE}対応。`,
};

export default function Page() {
    return (
        <CloudLoadBalancingGuide />
    );
}
