/* ── 参照リソース共通コンポーネント ── */
export interface RefsItem { href: string; label?: string }

/**
 * Render a titled list of external reference links.
 *
 * @param title - Text displayed as the block title above the links
 * @param items - Array of reference items; each item must have `href` and may have `label`. Each item is rendered as an anchor showing `label` when present or `href` otherwise.
 * @returns The JSX element containing the titled block of links. Each link opens in a new tab with `rel="noreferrer"`.
 */
export function ReferencesBlock({ title, items }: { title: string; items: RefsItem[] }) {
    return (
        <div className="src">
            <div className="srct">{title}</div>
            {items.map(({ href, label }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer">
                    {label ?? href}
                </a>
            ))}
        </div>
    );
}
