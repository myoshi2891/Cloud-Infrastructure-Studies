import type { Metadata } from 'next';
import { TerraformGcpChallengeLabGuide } from './TerraformGcpChallengeLabGuide';

export const metadata: Metadata = {
    title: 'Terraform で構築する Google Cloud インフラ管理 完全攻略ガイド',
    description:
        'Terraform を使用して Google Cloud 上のインフラストラクチャ（Compute Engine、Cloud Storage、VPC ネットワーク、ファイアウォール）を構成・管理するハンズオンの完全な攻略手順と解説。',
};

/**
 * Renders the Terraform Google Cloud challenge lab guide page.
 */
export default function Page() {
    return <TerraformGcpChallengeLabGuide />;
}
