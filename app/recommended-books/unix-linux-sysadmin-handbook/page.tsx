import type { Metadata } from 'next';
import { UnixLinuxSysadminHandbookGuide } from './UnixLinuxSysadminHandbookGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'UNIX and Linux System Administration Handbook 実践ガイド',
    description:
        '『UNIX and Linux System Administration Handbook, 5th Edition』の原著4パート・31章構成を土台に、初学者向けに再構成し、2026年最新動向までを網羅した完全実践ガイド。',
};

export default function UnixLinuxSysadminHandbookPage() {
    return <UnixLinuxSysadminHandbookGuide />;
}
