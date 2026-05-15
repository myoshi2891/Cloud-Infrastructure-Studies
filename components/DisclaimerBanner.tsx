'use client';

import { useEffect, useRef } from 'react';

export function DisclaimerBanner() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const sync = () => {
            const h = el.getBoundingClientRect().height;
            document.documentElement.style.setProperty('--disclaimer-height', `${h}px`);
        };

        sync();

        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(sync);
            ro.observe(el);
            return () => ro.disconnect();
        }

        window.addEventListener('resize', sync);
        return () => window.removeEventListener('resize', sync);
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: 'fixed',
                top: 'var(--header-h, 48px)',
                left: 0,
                right: 0,
                background: 'rgba(234, 179, 8, 0.12)',
                borderBottom: '1px solid rgba(234, 179, 8, 0.25)',
                zIndex: 40,
                textAlign: 'center',
                padding: '0.35rem 1rem',
                fontSize: '0.75rem',
                color: '#d4a017',
                lineHeight: 1.4,
            }}
        >
            <span style={{ display: 'block' }}>
                ⚠️ 本サイトは個人学習を目的として作成したものです。掲載内容の正確性・完全性は保証されておらず、試験の合否を含むいかなる結果に対しても責任を負いません。
            </span>
            <span style={{ display: 'block' }}>
                最新の公式情報は各試験プロバイダーの公式サイトをご確認ください。
            </span>
        </div>
    );
}
