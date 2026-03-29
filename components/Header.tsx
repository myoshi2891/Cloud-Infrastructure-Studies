import Link from 'next/link';

export function Header() {
    return (
        <nav className="sticky top-0 z-50 flex items-center gap-6 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 px-6 py-3 backdrop-blur-md">
            <Link href="/" className="text-lg font-bold text-[var(--color-foreground)]">
                Cloud Infrastructure Studies
            </Link>
            <div className="flex gap-4 text-sm">
                <Link
                    href="/gcl/genai-leader"
                    className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                >
                    Generative AI Leader
                </Link>
                <Link
                    href="/gcl/associate-cloud-engineer"
                    className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                >
                    Associate Cloud Engineer
                </Link>
            </div>
        </nav>
    );
}
