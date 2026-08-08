import { Metadata } from 'next';
import CcieEnterpriseGuide from './CcieEnterpriseGuide';

export const metadata: Metadata = {
    title: 'CCIE Enterprise Infrastructure 認定 完全ガイド | 初学者のためのステップバイステップ解説',
    description:
        'CCIE Enterprise Infrastructure認定の完全解説ガイド。クオリファイ試験（ENCOR 350-401）と8時間ラボ試験の出題ドメイン比率、受験費用、再認定ポリシー、学習ロードマップを体系的に解説します。',
    openGraph: {
        title: 'CCIE Enterprise Infrastructure 認定 完全ガイド',
        description:
            'Cisco最高峰資格CCIE EIの完全攻略ガイド。ENCOR 350-401および8時間実技ラボ試験の出題範囲・費用・ロードマップを網羅。',
        type: 'article',
    },
};

export default function Page() {
    return <CcieEnterpriseGuide />;
}
