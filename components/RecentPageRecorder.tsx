'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pushRecent } from '@/lib/recentPages';

const SITE_NAME = 'Cloud Infrastructure Studies';
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/**
 * Client component that records the current route into the "recent pages" history whenever the pathname changes.
 *
 * When the route changes it reads the page title (if available), removes the configured title suffix, and—
 * unless the resulting label is empty or equals the site name—stores { href: pathname, label } via pushRecent.
 * Place this component once (for example in layout.tsx) to enable recording for all pages.
 */
export function RecentPageRecorder(): null {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;
        const raw = typeof document !== 'undefined' ? document.title : '';
        // " | Cloud Infrastructure Studies" suffix を除去
        const label = raw.endsWith(TITLE_SUFFIX) ? raw.slice(0, -TITLE_SUFFIX.length) : raw;
        // サイト名そのもの（トップページなど）は履歴として意味がないため記録しない
        if (!label || label === SITE_NAME) return;
        pushRecent({ href: pathname, label });
    }, [pathname]);

    return null;
}
