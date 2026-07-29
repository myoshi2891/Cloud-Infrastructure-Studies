import type { Metadata } from 'next';
import SetUpAnAppDevEnvironmentGuide from './SetUpAnAppDevEnvironmentGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Google Cloud アプリ開発環境構築 完全ガイド — Storage・IAM・Monitoring・Functions・Pub/Sub',
    description:
        'Cloud Storage・IAM・Cloud Monitoring・Cloud Run functions・Pub/Sub をゼロから理解する初学者向け完全ガイド。Challenge Lab (GSP315) や一次情報ドキュメントまでステップバイステップで解説。',
};

/**
 * Renders the Google Cloud app dev environment complete study guide page.
 */
export default function Page() {
    return <SetUpAnAppDevEnvironmentGuide />;
}
