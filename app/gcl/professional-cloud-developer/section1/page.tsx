import type { Metadata } from 'next';
import { Section1Guide } from './Section1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCD Section 1: 高可用性・セキュア・信頼性の高いクラウドネイティブアプリケーションの設計 | Cloud Infrastructure Studies',
    description:
        'Google Cloud Professional Cloud Developer (PCD) 認定試験 Section 1「高可用性・セキュア・信頼性の高いクラウドネイティブアプリケーションの設計」完全対策ガイド。コンピューティング選定、ロードバランシング、キャッシュ、API設計、非同期統合、セキュリティ、データベース選定などを徹底解説。',
};

export default function Page() {
    return <Section1Guide />;
}
