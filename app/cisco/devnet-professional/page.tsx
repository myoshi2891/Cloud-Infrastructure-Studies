import type { Metadata } from 'next';
import AutomationProfessionalGuide from './DevNetProfessionalGuide';
import './page.css';

export const metadata: Metadata = {
  title: 'CCNP Automation 認定 徹底解説ガイド | Cisco資格対策',
  description:
    'Cisco公式情報に基づくCCNP Automation認定徹底解説ガイド。コア試験（350-901 AUTOCOR）の出題トピック、2つのコンセントレーション試験の一覧と選び方、試験形式、合格ロードマップ、再認定制度を分かりやすく整理。',
};

export default function AutomationProfessionalPage() {
  return <AutomationProfessionalGuide />;
}
