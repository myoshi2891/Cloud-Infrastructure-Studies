import type { Metadata } from 'next';
import { AgwaSection3Guide } from './AgwaSection3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Section 3: データガバナンスとコンプライアンス管理 | Associate Google Workspace Administrator 試験対策ガイド',
    description:
        'Google Vault、DLP（データ損失防止）、Drive信頼ルール、データエクスポート、および分類ラベルの設定・運用を徹底解説する試験対策ガイドです。',
};

/** Section 3 のデータガバナンス学習ガイドを提供するページ。 */
export default function AgwaSection3Page() {
    return <AgwaSection3Guide />;
}
