import type { Metadata } from 'next';
import AgwaSection5Guide from './AgwaSection5Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Section 5: ブラウザとエンドポイントの管理 | AGWA試験対策ガイド',
    description:
        'Associate Google Workspace Administrator Section 5: モバイルデバイス（基本・高度・BeyondCorp Alliance）および Chrome ブラウザ（Chrome Enterprise Core）の管理ポリシーを徹底解説。',
};

export default function AgwaSection5Page() {
    return <AgwaSection5Guide />;
}
