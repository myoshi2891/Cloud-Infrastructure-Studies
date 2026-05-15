/* ── 参照リソース共通コンポーネント ── */
export interface RefsItem { href: string; label?: string }

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
