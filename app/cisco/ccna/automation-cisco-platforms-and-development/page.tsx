import type { Metadata } from 'next';
import { CcnaCiscoPlatformsDevelopmentGuide } from './CcnaCiscoPlatformsDevelopmentGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Cisco Platforms and Development 徹底解説ガイド | CCNA Automation',
    description: 'CCNA Automation (200-901 CCNAAUTO v1.1) ドメイン3.0 Cisco Platforms and Developmentの徹底解説ガイド。SDK、ネットワーク/コンピュート/コラボレーション/セキュリティAPI、NETCONF/RESTCONF、YANGなどを網羅。',
};

export default function CcnaCiscoPlatformsDevelopmentPage() {
    return <CcnaCiscoPlatformsDevelopmentGuide />;
}
