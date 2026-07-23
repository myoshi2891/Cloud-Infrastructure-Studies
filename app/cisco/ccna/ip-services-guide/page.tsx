import type { Metadata } from 'next';
import { CcnaIpServicesGuide } from './CcnaIpServicesGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA 200-301 徹底解説：IP Services（IP サービス）編 | Cloud & Network Infrastructure Studies',
    description:
        'Cisco CCNA（200-301）試験の出題範囲「4.0 IP Services（10%）」を徹底解説。NAT（静的/動的プール）、NTP（Stratum）、DHCP・DNS、SNMP（GET/SET/TRAP/v3）、Syslog（重大度0〜7）、QoS PHB（EF/AF/DF）、SSH、TFTP/FTPを完全解説。',
};

/**
 * Renders the CCNA IP services guide page.
 */
export default function CcnaIpServicesGuidePage() {
    return <CcnaIpServicesGuide />;
}
