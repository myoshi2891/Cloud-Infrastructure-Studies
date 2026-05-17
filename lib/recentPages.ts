/**
 * 最近見たページ履歴を localStorage で管理するユーティリティ。
 * SSR/quota 例外に対して safe で、不正データは黙って無視する。
 */

const STORAGE_KEY = 'cis:recent-pages';
export const MAX_RECENT = 5;

export type RecentEntry = {
    href: string;
    label: string;
    ts: number;
};

/**
 * Type guard that checks whether a value conforms to the `RecentEntry` shape.
 *
 * Validates that `href` and `label` are non-empty strings and that `ts` is a number.
 *
 * @returns `true` if `value` is a `RecentEntry`, `false` otherwise.
 */
function isRecentEntry(value: unknown): value is RecentEntry {
    if (typeof value !== 'object' || value === null) return false;
    const v = value as Record<string, unknown>;
    return (
        typeof v.href === 'string' &&
        v.href.length > 0 &&
        typeof v.label === 'string' &&
        v.label.length > 0 &&
        typeof v.ts === 'number'
    );
}

/**
 * Read the recent-pages list from localStorage and return only valid entries.
 *
 * @returns An array of validated `RecentEntry` objects; returns an empty array if running in a non-browser environment, if the stored value is missing or not a parsable array, or if an error occurs while accessing or parsing storage. Invalid entries are excluded.
 */
function readStorage(): RecentEntry[] {
    try {
        if (typeof window === 'undefined') return [];
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(isRecentEntry);
    } catch {
        return [];
    }
}

/**
 * Persist the provided recent-page entries to localStorage.
 *
 * This is a no-op in server (SSR) environments. If writing to localStorage fails
 * (for example due to quota limits or private browsing restrictions), the error
 * is silently ignored.
 *
 * @param entries - The array of `RecentEntry` items to persist; stored as JSON under the module's STORAGE_KEY
 */
function writeStorage(entries: RecentEntry[]): void {
    try {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
        // quota / private mode 等は黙って無視
    }
}

/**
 * Get recent page entries ordered newest first.
 *
 * @returns An array of `RecentEntry` objects sorted by descending `ts` (newest first). Returns an empty array during SSR or if localStorage is unavailable or contains invalid data.
 */
export function getRecent(): RecentEntry[] {
    return readStorage();
}

/**
 * Add an entry to the recent-pages list, promoting an existing entry with the same href to the front and truncating the list to MAX_RECENT.
 *
 * @param entry - Object with `href` and `label`. If either `href` or `label` is empty, the function does nothing. The stored entry will include a `ts` timestamp set to the current time.
 */
export function pushRecent(entry: { href: string; label: string }): void {
    if (!entry.href || !entry.label) return;
    const current = readStorage();
    const deduped = current.filter((e) => e.href !== entry.href);
    const next: RecentEntry[] = [
        { href: entry.href, label: entry.label, ts: Date.now() },
        ...deduped,
    ].slice(0, MAX_RECENT);
    writeStorage(next);
}
