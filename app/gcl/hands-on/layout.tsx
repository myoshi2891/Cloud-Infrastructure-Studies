import { notFound } from 'next/navigation';
import { HANDS_ON_ENABLED } from '@/lib/featureFlags';

/**
 * Renders the hands-on route when the feature is enabled.
 *
 * When the feature is disabled, the route is treated as not found.
 *
 * @returns The supplied child content when hands-on features are enabled.
 */
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
