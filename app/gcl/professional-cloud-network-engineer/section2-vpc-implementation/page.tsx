// app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page.tsx

import { Metadata } from 'next';
import './page.css';
import PcneSection2VpcImplementationGuide from './PcneSection2VpcImplementationGuide';

export const metadata: Metadata = {
  title: 'PCNE 学習ガイド S2: VPCネットワークの実装',
  description:
    'Google Cloud Professional Cloud Network Engineer (PCNE) 試験対策ガイド S2: VPCネットワークの実装。VPC構成、Peering, Shared VPC, Private Access, VPC Service Controls, VPCルーティング, NCC, GKEネットワーキングを徹底解説。',
};

export default function PcneSection2VpcImplementationPage() {
  return <PcneSection2VpcImplementationGuide />;
}
