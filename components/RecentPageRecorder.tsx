'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pushRecent } from '@/lib/recentPages';

const SITE_NAME = 'Cloud Infrastructure Studies';
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/**
 * pathname 変更時に「最近見たページ」履歴へ自動記録する DOM を持たない Client コンポーネント。
 * layout.tsx に 1 度だけ置けば全ページで動作する。
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
