import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PCNE 完全攻略ガイド (Step-by-Step) | Infra Study',
    description: 'Google Cloud Professional Cloud Network Engineer (PCNE) 認定試験対策のステップバイステップガイド',
};

/**
 * Layout wrapper for PCNE step pages.
 *
 * @param props - The component props.
 * @param props.children - The child components to render.
 * @returns {JSX.Element} The rendered layout.
 */
export default function PcneStepLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col">{children}</div>;
}
