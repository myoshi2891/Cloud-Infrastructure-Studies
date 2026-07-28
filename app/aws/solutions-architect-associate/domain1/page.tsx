import type { Metadata } from 'next';
import { Domain1Guide } from './Domain1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS SAA-C03 ドメイン1: セキュアなアーキテクチャの設計 | 完全ガイド',
    description:
        'AWS SAA-C03試験のドメイン1（セキュアなアーキテクチャの設計）を徹底解説。IAM, VPC, WAF/Shield, KMS, S3暗号化, SCPなどの試験出題ポイントと14個のMermaid図解を完全網羅。',
};

export default function Domain1Page() {
    return <Domain1Guide />;
}
