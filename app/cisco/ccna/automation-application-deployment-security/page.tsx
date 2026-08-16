import type { Metadata } from 'next';
import { CcnaAppDeploymentSecurityGuide } from './CcnaAppDeploymentSecurityGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA Automation認定「Application Deployment and Security」完全ガイド',
    description:
        'CCNA Automation認定（200-901 CCNAAUTO）の試験ドメイン「4.0 Application Deployment and Security」を初学者向けにステップバイステップで解説する完全ガイド',
};

/**
 * Renders the CCNA Automation Application Deployment and Security guide page.
 */
export default function CcnaAppDeploymentSecurityPage() {
    return <CcnaAppDeploymentSecurityGuide />;
}
