import type { Metadata } from 'next';
import { Domain2Guide } from './Domain2Guide';

export const metadata: Metadata = {
    title: 'AWS SAA-C03 ドメイン2: 回復力のあるアーキテクチャの設計 完全ガイド',
    description:
        'AWS Certified Solutions Architect – Associate (SAA-C03) ドメイン2「回復力のあるアーキテクチャの設計」の完全対策ガイド。マルチティア設計、疎結合、Auto Scaling、障害復旧(DR)戦略、Route 53フェイルオーバー等を網羅解説。',
};

/**
 * Renders the AWS SAA-C03 Domain 2 guide page.
 *
 * @returns The Domain 2 guide page.
 */
export default function Domain2Page() {
    return <Domain2Guide />;
}
