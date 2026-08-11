'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders a sticky disclaimer banner and publishes its rendered height to a CSS custom property.
 *
 * The banner is exposed to assistive tech via an `<aside>` element with an `aria-label` containing the Japanese disclaimer.
 * It sets `--disclaimer-height` on the document element and keeps that value updated when the banner's size changes.
 *
 * @returns The disclaimer banner as a JSX element.
 */
export function DisclaimerBanner() {
    const ref = useRef<HTMLElement>(null);

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
        <aside
            ref={ref}
            aria-label="免責事項: 本サイトは個人学習目的です。最新の公式情報は各試験プロバイダーの公式サイトをご確認ください。"
            style={{
                // sticky: Header (sticky top:0) の直後に flow 内で積まれ、scroll 中も常に Header の下に貼り付く。
                // fixed だと flow 外になり scroll = 0 で Header より上に表示され縦並びが入れ替わる現象が起きる。
                position: 'sticky',
                top: 'var(--header-h, 48px)',
                background: '#131b2e',
                borderBottom: '1px solid rgba(234, 179, 8, 0.35)',
                backdropFilter: 'blur(12px)',
                zIndex: 40,
                textAlign: 'center',
                padding: '0.35rem 1rem',
                fontSize: '0.75rem',
                color: '#facc15',
                lineHeight: 1.4,
            }}
        >
            <span style={{ display: 'block' }}>
                ⚠️ 本サイトは個人学習を目的として作成したものです。掲載内容の正確性・完全性は保証されておらず、試験の合否を含むいかなる結果に対しても責任を負いません。
            </span>
            <span style={{ display: 'block' }}>
                最新の公式情報は各試験プロバイダーの公式サイトをご確認ください。
            </span>
        </aside>
    );
}
