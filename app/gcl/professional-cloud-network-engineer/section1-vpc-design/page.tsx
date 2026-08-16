import type { Metadata } from 'next';
import { PcneSection1VpcDesignGuide } from './PcneSection1VpcDesignGuide';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'PCNE S1: VPCネットワーク設計 | Google Cloud 認定試験対策',
    description: 'Google Cloud Professional Cloud Network Engineer (PCNE) 試験の Section 1: VPCネットワークの設計と計画に完全特化した決定版学習ガイド。試験範囲、ベストプラクティス、構成パターンを徹底解説。',
};

/** PCNE Section 1 の VPC ネットワーク設計・計画ガイドを表示するページ。 */
export default function PcneSection1VpcDesignPage() {
    return <PcneSection1VpcDesignGuide rootClassName={styles.root!} />;
}
