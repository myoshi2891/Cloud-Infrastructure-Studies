import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PCNE 完全攻略ガイド (Step-by-Step) | Infra Study',
    description: 'Google Cloud Professional Cloud Network Engineer (PCNE) 認定試験対策のステップバイステップガイド',
};

export default function PcneStepLayout({ children }: { children: React.ReactNode }) {
    return <div className="layout-container">{children}</div>;
}
