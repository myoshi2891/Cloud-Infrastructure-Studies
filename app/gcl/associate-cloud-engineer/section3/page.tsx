import type { Metadata } from 'next';
import AceSection3Guide from './AceSection3Guide';
import { REVISION_DATE } from './constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'ACE Section 3 | Ensuring Successful Operation | Google Cloud',
    description: `試験配点 ~30%（最重量セクション）。Compute Engine・GKE・Cloud Run・Storage・Networking・Monitoring/Logging の日常運用を中級〜上級者向けに完全解説。試験ガイド 063026（${REVISION_DATE}）準拠。`,
};

/**
 * Google Cloud Associate Cloud Engineer (ACE) 試験対策セクション 3 ページ。
 * 
 * このページは「Ensuring the Successful Operation of a Cloud Solution」に関する
 * 学習ガイドを提供します。Compute Engine、GKE、Cloud Run、ストレージ、ネットワーク、
 * およびモニタリング/ロギングの日常運用についての詳細情報をレンダリングします。
 * 
 * @returns {JSX.Element} ACE セクション 3 の学習ガイド画面
 */
export default function Page() {
    return (
        <div className={styles['ace-section3-page']}>
            <AceSection3Guide />
        </div>
    );
}
