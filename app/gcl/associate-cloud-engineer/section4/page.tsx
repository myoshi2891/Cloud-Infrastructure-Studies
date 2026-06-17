import type { Metadata } from 'next';
import AceSection4Guide from './AceSection4Guide';
import { REVISION_DATE } from './constants';

export const metadata: Metadata = {
    title: 'ACE Section 4 | Configuring Access and Security | Google Cloud',
    description: `GCP ACE Section 4 (アクセスとセキュリティの構成) 完全ガイド。試験配点 ~20%。IAMポリシー、サービスアカウント、Workload Identity Federation。試験ガイド 063026（${REVISION_DATE}）準拠。`,
};

/**
 * Google Cloud Associate Cloud Engineer (ACE) 試験対策セクション 4 ページ。
 * 
 * このページは「Configuring Access and Security」に関する学習ガイドを提供します。
 * 
 * @returns {JSX.Element} ACE セクション 4 の学習ガイド画面
 */
export default function Page() {
    return (
        <AceSection4Guide />
    );
}
