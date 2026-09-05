import type { Metadata } from 'next';
import { OperatingSystemsThreeEasyPiecesGuide } from './OperatingSystemsThreeEasyPiecesGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Operating Systems: Three Easy Pieces（OSTEP）初学者向け学習ガイド',
    description:
        'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau 著の名著『Operating Systems: Three Easy Pieces（OSTEP）』を軸に、仮想化・並行性・永続性の3大テーマを初学者向けに体系的に解説した完全学習ガイド。',
};

export default function OperatingSystemsThreeEasyPiecesPage() {
    return <OperatingSystemsThreeEasyPiecesGuide />;
}
