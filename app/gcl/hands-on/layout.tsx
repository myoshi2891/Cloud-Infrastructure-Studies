import { notFound } from 'next/navigation';
import { HANDS_ON_ENABLED } from '@/lib/featureFlags';

export default function HandsOnLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (!HANDS_ON_ENABLED) {
        notFound();
    }

    return children;
}
