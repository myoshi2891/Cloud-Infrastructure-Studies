import type { Metadata } from 'next';
import { CcnaAutomationApiGuide } from './CcnaAutomationApiGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA Automation認定「APIの理解と活用」完全ガイド',
    description:
        'CCNA Automation認定（200-901 CCNAAUTO）の試験ドメイン「2.0 Understanding and Using APIs」を初学者向けにステップバイステップで解説するガイド',
};

/**
 * Renders the CCNA Automation API understanding and usage guide page.
 */
export default function CcnaAutomationApiPage() {
    return <CcnaAutomationApiGuide />;
}
