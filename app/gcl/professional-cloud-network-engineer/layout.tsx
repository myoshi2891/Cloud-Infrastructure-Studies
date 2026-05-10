import './pcne.module.css'; // Import PCNE theme CSS
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Professional Cloud Network Engineer | Google Cloud Certification',
    description: 'Google Cloud Professional Cloud Network Engineer (PCNE) 完全試験対策ガイド。VPC設計からハイブリッド接続、ロードバランシング、セキュリティ、監視まで網羅。',
};

/**
 * Root layout that renders its `children` unchanged.
 *
 * @param children - Content to be rendered within this layout
 * @returns The provided `children` rendered as the layout's output
 */
export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
