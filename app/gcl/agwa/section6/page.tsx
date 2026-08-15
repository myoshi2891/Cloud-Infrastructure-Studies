import type { Metadata } from 'next';
import AgwaSection6Guide from './AgwaSection6Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Section 6: 監視とトラブルシューティング | AGWA試験対策ガイド',
    description:
        'Associate Google Workspace Administrator Section 6: Workspace問題の特定と診断、一般的な問題のトラブルシューティングと解決、レポートと監査ログの表示・作成・管理、サポートリソースの活用を徹底解説。',
};

export default function AgwaSection6Page() {
    return <AgwaSection6Guide />;
}
