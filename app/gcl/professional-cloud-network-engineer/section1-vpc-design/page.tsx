import type { Metadata } from 'next';
import { PcneSection1VpcDesignGuide } from './PcneSection1VpcDesignGuide';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Google Cloud PCNE Section 1: VPCネットワーク設計 – 試験対策ガイド',
    description: 'Google Cloud Professional Cloud Network Engineer (PCNE) 試験の Section 1: VPCネットワークの設計と計画に完全特化した決定版学習ガイド。試験範囲、ベストプラクティス、構成パターンを徹底解説。',
};

export default function PcneSection1VpcDesignPage() {
    return <PcneSection1VpcDesignGuide rootClassName={styles.root} />;
}
