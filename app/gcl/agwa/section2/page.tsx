import { Metadata } from 'next';
import './page.css';
import { AgwaSection2Guide } from './AgwaSection2Guide';

export const metadata: Metadata = {
    title: 'Associate Google Workspace Administrator試験対策ガイド | Section 2: コアWorkspaceサービスの管理',
    description: 'Associate Google Workspace Administrator (AGWA) 試験対策 Section 2 完全ガイド。Gmail、Drive/Docs、Calendar、Meet、Chat、Gemini、AppSheet/Apps Script等のコアWorkspaceサービスの設定とベストプラクティス。',
};

export default function AgwaSection2Page() {
    return <AgwaSection2Guide />;
}
