import type { Metadata } from 'next';
import './page.css';
import AgwaSection1Guide from './AgwaSection1Guide';

export const metadata: Metadata = {
    title: 'Associate Google Workspace Administrator 試験対策ガイド | Section 1',
    description:
        'Associate Google Workspace Administrator (AGWA) Section 1: ユーザーアカウント・ドメイン・ディレクトリの管理 完全解説ガイド',
};

export default function AgwaSection1Page() {
    return <AgwaSection1Guide />;
}
