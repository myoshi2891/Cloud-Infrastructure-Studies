import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PCNE 完全攻略ガイド (Step-by-Step) | Infra Study',
    description: 'Google Cloud Professional Cloud Network Engineer (PCNE) 認定試験対策のステップバイステップガイド',
};

/**
 * Wraps PCNE step pages in a vertical flex container.
 *
 * @returns The layout element that renders the provided `children` inside a div with `flex flex-col` styling.
 */
export default function PcneStepLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col">{children}</div>;
}
