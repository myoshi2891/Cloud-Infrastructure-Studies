import type { Metadata } from 'next';
import { Section4Guide } from './Section4Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'PCD Section 4: Google Cloudサービスとのアプリケーション統合 | Cloud Infrastructure Studies',
    description:
        'Google Cloud Professional Cloud Developer (PCD) 認定試験 Section 4「Google Cloudサービスとのアプリケーション統合」完全対策ガイド。Cloud SQL / Firestore / Cloud Storageへの接続管理・読み書き、Pub/Subメッセージング、API有効化、Cloud Client Libraries / REST / gRPC / API Explorer、5つの考慮事項（バッチ・部分レスポンス・ページネーション・キャッシュ・指数バックオフ）、ADCとサービスアカウント、OpenTelemetryインスツルメンテーション、Google Cloud Observability（Logging / Monitoring / Trace / Profiler）、Error Reporting、分散トレースID相関、AI支援オブザーバビリティを徹底解説。',
};

/**
 * Professional Cloud Developer Section 4 ページ (Server Component)
 */
export default function Page() {
    return <Section4Guide />;
}
