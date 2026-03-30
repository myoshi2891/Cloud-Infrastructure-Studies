import Link from 'next/link';

export function Header() {
    return (
        <nav className="sticky top-0 z-50 flex items-center gap-6 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 px-6 py-3 backdrop-blur-md">
            <Link href="/" className="text-lg font-bold text-[var(--color-foreground)]">
                Cloud Infrastructure Studies
            </Link>
            <div className="flex gap-4 text-sm">
                <div className="group relative">
                    <Link
                        href="/gcl/genai-leader"
                        className="flex items-center gap-1 text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                    >
                        Generative AI Leader
                        <span className="text-xs">▾</span>
                    </Link>
                    <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-md border border-[var(--color-border)] bg-[var(--color-background)] py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                        <Link
                            href="/gcl/genai-leader/section1"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                        >
                            Section 1: Gen AI 基礎知識
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section2"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                        >
                            Section 2: Google Cloud Gen AI サービス
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section3"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                        >
                            Section 3: モデル出力改善技術
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section4"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                        >
                            Section 4: ビジネス戦略
                        </Link>
                    </div>
                </div>
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
