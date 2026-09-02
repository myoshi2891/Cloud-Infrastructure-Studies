import type { Metadata } from 'next';
import { Section2Guide } from './Section2Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCD Section 2: アプリケーションのビルドとテスト | Cloud Infrastructure Studies',
    description:
        'Google Cloud Professional Cloud Developer (PCD) 認定試験 Section 2「アプリケーションのビルドとテスト」完全対策ガイド。gcloud CLIエミュレータ、Cloud Code、Gemini Cloud Assist、Cloud Shell、Cloud Workstations、IDE統合（ADC・MCP）、Cloud Build、Artifact Registry、Binary Authorization、provenance、単体テスト・自動統合テストなどを徹底解説。',
};

/**
 * Professional Cloud Developer Section 2 ページ (Server Component)
 */
export default function Page() {
    return <Section2Guide />;
}
