import type { Metadata } from 'next';
import CcnaInfraAutomationGuide from './CcnaInfraAutomationGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA Automation 5.0 Infrastructure and Automation ステップバイステップ解説ガイド',
    description:
        'CCNA Automation (200-901 CCNAAUTO) ドメイン 5.0 Infrastructure and Automation (出題比率20%) の全項目 (5.1〜5.14) を図解・コード例・表を用いて分かりやすく解説。',
};

/** Renders the server entry point for the Infrastructure and Automation guide. */
export default function Page() {
    return <CcnaInfraAutomationGuide />;
}
