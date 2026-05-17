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
 * 任意値が RecentEntry 形状か判定する型ガード。
 * any を避け、unknown を絞り込む方針。
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

function writeStorage(entries: RecentEntry[]): void {
    try {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
        // quota / private mode 等は黙って無視
    }
}

/**
 * 履歴を新しい順で取得する。SSR や localStorage アクセス失敗時は空配列。
 */
export function getRecent(): RecentEntry[] {
    return readStorage();
}

/**
 * 履歴に 1 件追加する。同一 href があれば先頭に昇格し、MAX_RECENT を超えた古い分は切り捨てる。
 * href/label が空のときは何もしない。
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
