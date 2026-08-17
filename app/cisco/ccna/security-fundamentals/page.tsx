import { Metadata } from 'next';
import { CcnaSecurityFundamentals } from './CcnaSecurityFundamentals';

export const metadata: Metadata = {
    title: 'CCNA試験対策：セキュリティの基礎（Security Fundamentals）徹底解説',
    description:
        'Cisco CCNA（200-301）試験のドメイン5.0「Security Fundamentals」を徹底解説。脅威・脆弱性、ACL、L2セキュリティ、AAA、VPN、無線セキュリティプロトコルなどの要点を網羅。',
};

/**
 * Renders the CCNA security fundamentals page.
 */
export default function CcnaSecurityFundamentalsPage() {
    return <CcnaSecurityFundamentals />;
}
