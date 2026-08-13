import React from 'react';
import type { Metadata } from 'next';
import CcnaNetworkFundamentalsGuide from './CcnaNetworkFundamentalsGuide';
import './page.css';

export const metadata: Metadata = {
  title: 'Cisco CCNA試験対策：ネットワークの基礎 入門ガイド | Cloud Infrastructure Studies',
  description:
    'Cisco CCNA（200-301）認定試験の「ネットワークの基礎」領域を、OSI参照モデル、TCP/IP、IPv4/IPv6、機器の動作などの完全図解と詳細表でわかりやすく解説します。',
};

export default function Page() {
  return <CcnaNetworkFundamentalsGuide />;
}
