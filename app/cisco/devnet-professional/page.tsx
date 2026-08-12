import type { Metadata } from 'next';
import DevNetProfessionalGuide from './DevNetProfessionalGuide';
import './page.css';

export const metadata: Metadata = {
  title: 'Cisco Certified DevNet Professional 認定 徹底解説ガイド | Cisco資格対策',
  description:
    'Cisco公式情報に基づくDevNet Professional認定徹底解説ガイド。コア試験（350-901 DEVCOR）の出題トピック、8つのコンセントレーション試験の一覧と選び方、試験形式、合格ロードマップ、再認定制度を分かりやすく整理。',
};

export default function DevNetProfessionalPage() {
  return <DevNetProfessionalGuide />;
}
