import type { Metadata } from 'next';
import { CcnaSoftwareDevDesignGuide } from './CcnaSoftwareDevDesignGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCNA Automation認定「ソフトウェア開発と設計」完全ガイド | Cloud Infrastructure Studies',
    description:
        'CCNA Automation認定（200-901 CCNAAUTO）の試験ドメイン「1.0 Software Development and Design」を初学者向けにステップバイステップで解説するガイド',
};

/**
 * CCNA Automation認定「ソフトウェア開発と設計」ガイドのページエントリポイント（Server Component）。
 * ページのメタデータを提供し、メインガイドコンポーネントをレンダリングします。
 */
export default function CcnaSoftwareDevDesignPage() {
    return <CcnaSoftwareDevDesignGuide />;
}
