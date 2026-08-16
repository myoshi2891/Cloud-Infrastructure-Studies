import type { Metadata } from 'next';
import { AgwaSection4Guide } from './AgwaSection4Guide';

export const metadata: Metadata = {
    title: 'Section 4: セキュリティポリシーとアクセス制御 | Associate Google Workspace Administrator 試験対策ガイド',
    description:
        'Associate Google Workspace Administrator 認定試験 Section 4: セキュリティポリシーとアクセス制御の完全解説ガイド。2SV、パスワードポリシー、CAA、管理者ロール、ログ監査、セキュリティセンター、SSO統合などを網羅。',
};

/** Section 4 のセキュリティポリシーとアクセス制御ガイドを提供するページ。 */
export default function AgwaSection4Page() {
    return <AgwaSection4Guide />;
}
