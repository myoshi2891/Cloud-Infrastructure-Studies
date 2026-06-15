import type { Metadata } from 'next';
import AceSection3Guide from './AceSection3Guide';
import { REVISION_DATE } from './constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'ACE Section 3 | Ensuring Successful Operation | Google Cloud',
    description: `試験配点 ~30%（最重量セクション）。Compute Engine・GKE・Cloud Run・Storage・Networking・Monitoring/Logging の日常運用を中級〜上級者向けに完全解説。試験ガイド 063026（${REVISION_DATE}）準拠。`,
};

export default function Page() {
    return (
        <div className={styles['ace-section3-page']}>
            <AceSection3Guide />
        </div>
    );
}
