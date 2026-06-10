import type { Metadata } from 'next';
import Section1Guide from './Section1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'ACE Section 1: Setting up a Cloud Solution Environment | 完全ガイド',
    description:
        'Google Cloud Associate Cloud Engineer 試験 Section 1（環境設定）の全出題項目を中級者〜上級者向けに詳細解説。リソース階層・組織ポリシー・IAM・請求管理・Workforce Identity Federation など 2026年6月30日版試験ガイド対応。',
};

/**
 * GCP ACE Section 1「Setting up a Cloud Solution Environment」完全ガイドページ。
 * Server Component としてメタデータを定義し、本文・インタラクションは
 * クライアントコンポーネント Section1Guide に委譲する。
 */
export default function Section1Page() {
    return <Section1Guide />;
}
