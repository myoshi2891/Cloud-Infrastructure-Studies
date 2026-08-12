import { Metadata } from 'next';
import CcnaAutomationProgrammabilityGuide from './CcnaAutomationProgrammabilityGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA 200-301 | 6.0 自動化とプログラマビリティ (Automation and Programmability)',
    description:
        'Cisco CCNA 200-301 認定試験 (v1.1 ブループリント) ドメイン 6.0 自動化とプログラマビリティの徹底対策ガイド。自動化の影響、SDN、AI・機械学習、REST API、Ansible/Terraform構成管理、JSONまで分かりやすく解説。',
};

/**
 * Renders the CCNA Automation and Programmability guide.
 *
 * @returns The Automation and Programmability guide component.
 */
export default function CcnaAutomationProgrammabilityPage() {
    return <CcnaAutomationProgrammabilityGuide />;
}
