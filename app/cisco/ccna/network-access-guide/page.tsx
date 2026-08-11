import type { Metadata } from 'next';
import CcnaNetworkAccessGuide from './CcnaNetworkAccessGuide';
import './page.css';

/**
 * Defines the title and description metadata for the Network Access guide route.
 *
 * @returns The route metadata for the CCNA 200-301 Network Access guide
 */
export function generateMetadata(): Metadata {
    return {
        title: 'CCNA 200-301「Network Access」徹底解説 | 初学者向けステップバイステップガイド',
        description:
            'VLAN、トランク（802.1Q）、CDP/LLDP、EtherChannel（LACP）、Rapid PVST+、ワイヤレスアーキテクチャ、管理アクセスなど、CCNA 200-301 Network Accessドメイン（20%）を基礎から網羅解説。',
    };
}

/** Renders the server entry point for the Network Access guide. */
export default function Page() {
    return <CcnaNetworkAccessGuide />;
}
