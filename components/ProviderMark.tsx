import type { Provider } from '@/app/constants';

type ProviderMarkProps = {
    provider: Provider;
    compact?: boolean;
};

/** サイト共通の抽象的なインフラレイヤーマーク。 */
export function SiteMark() {
    return (
        <span className="site-mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none">
                <path d="m14 5 8 4.5-8 4.5-8-4.5L14 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="m6 14 8 4.5 8-4.5M6 18.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
    );
}

/** プロバイダーごとの識別子を、画像に依存しない統一サイズのマークで描画する。 */
export function ProviderMark({ provider, compact = false }: ProviderMarkProps) {
    if (provider === 'GCP') {
        return (
            <span
                className="provider-mark provider-mark-gcp"
                data-compact={compact || undefined}
                aria-hidden="true"
            >
                <span />
                <span />
                <span />
                <span />
            </span>
        );
    }

    if (provider === 'AWS') {
        return (
            <span
                className="provider-mark provider-mark-aws"
                data-compact={compact || undefined}
                aria-hidden="true"
            >
                <span>aws</span>
                <svg viewBox="0 0 32 8" fill="none">
                    <path d="M3 2.5c7.8 4.2 16.7 4.5 25.8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="m25.8 1.2 3.2 1.7-2.2 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        );
    }

    return (
        <span
            className="provider-mark provider-mark-cisco"
            data-compact={compact || undefined}
            aria-hidden="true"
        >
            <svg viewBox="0 0 46 24" fill="none">
                <path d="M4 10v4M10 7v10M16 4v16M23 2v20M30 4v16M36 7v10M42 10v4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
            <span>CISCO</span>
        </span>
    );
}
