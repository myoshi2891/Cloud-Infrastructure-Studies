import type { Metadata } from 'next';
import DevNetAssociateGuide from './DevNetAssociateGuide';

export const metadata: Metadata = {
    title: 'Cisco Certified DevNet Associate (200-901) 試験 完全ガイド | Cloud Infrastructure Studies',
    description:
        'Cisco Certified DevNet Associate (CCNA Automation / 200-901) 試験の出題領域、各ドメイン解説、学習ロードマップ、参考文献を網羅した初学者向け解説ガイド。',
};

/** Provides the route entry point for the DevNet Associate guide. */
export default function DevNetAssociatePage() {
    return <DevNetAssociateGuide />;
}
