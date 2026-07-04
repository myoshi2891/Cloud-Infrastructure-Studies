import type { Metadata } from 'next';
import SetUpAnAppDevEnvironmentGuide from './SetUpAnAppDevEnvironmentGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Google Cloud ではじめるアプリ開発環境構築ガイド — Storage・IAM・Functions・Pub/Sub',
    description:
        'Cloud Storage・IAM・Cloud Functions・Pub/Sub でイベント駆動サーバーレス環境をゼロから構築する初学者向け実践ガイド。Challenge Lab (GSP315) までステップバイステップで解説。',
};

/**
 * Renders the Google Cloud app dev environment study guide page.
 */
export default function Page() {
    return <SetUpAnAppDevEnvironmentGuide />;
}
