'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Render the sticky top navigation bar with interactive dropdowns for "Generative AI Leader" and "Associate Cloud Engineer".
 *
 * The component manages open/close state for each dropdown, closes menus on outside mouse clicks or when the Escape key is pressed, and ensures dropdown links close their parent menu on navigation.
 *
 * @returns A JSX element representing the sticky top navigation bar with a home link and two dropdown menus
 */
export function Header() {
    const [openMenu, setOpenMenu] = useState<'genai' | 'ace' | 'cdl' | null>(null);
    const genAiRef = useRef<HTMLDivElement>(null);
    const aceRef = useRef<HTMLDivElement>(null);
    const cdlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openMenu === null) return;

        const refMap = { genai: genAiRef, ace: aceRef, cdl: cdlRef } as const;

        const handleClickOutside = (e: MouseEvent) => {
            const ref = refMap[openMenu];
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpenMenu(null);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenMenu(null);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openMenu]);

    return (
        <nav className="sticky top-0 z-50 flex items-center gap-6 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 px-6 py-3 backdrop-blur-md">
            <Link href="/" className="text-lg font-bold text-[var(--color-foreground)]">
                Cloud Infrastructure Studies
            </Link>
            <div className="flex gap-4 text-sm">
                <div className="group relative" ref={genAiRef}>
                    <button
                        type="button"
                        onClick={() => setOpenMenu((v) => v === 'genai' ? null : 'genai')}
                        aria-haspopup="true"
                        aria-expanded={openMenu === 'genai'}
                        className="flex items-center gap-1 text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                    >
                        Generative AI Leader
                        <span className="text-xs">▾</span>
                    </button>
                    <div className={`invisible absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-md border border-[var(--color-border)] bg-[var(--color-background)] py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100${openMenu === 'genai' ? ' !visible !opacity-100' : ''}`}>
                        <Link
                            href="/gcl/genai-leader"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Generative AI Leader 概要
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section1"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Section 1: Gen AI 基礎知識
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section2"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Section 2: Google Cloud Gen AI サービス
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section3"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Section 3: モデル出力改善技術
                        </Link>
                        <Link
                            href="/gcl/genai-leader/section4"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Section 4: ビジネス戦略
                        </Link>
                    </div>
                </div>
                <div className="group relative" ref={aceRef}>
                    <button
                        type="button"
                        onClick={() => setOpenMenu((v) => v === 'ace' ? null : 'ace')}
                        aria-haspopup="true"
                        aria-expanded={openMenu === 'ace'}
                        className="flex items-center gap-1 text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                    >
                        Associate Cloud Engineer
                        <span className="text-xs">▾</span>
                    </button>
                    <div className={cn("invisible absolute left-0 top-full z-50 mt-1 min-w-[280px] rounded-md border border-[var(--color-border)] bg-[var(--color-background)] py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100", openMenu === 'ace' && "!visible !opacity-100")}>
                        <Link
                            href="/gcl/associate-cloud-engineer"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            概要
                        </Link>
                        <Link
                            href="/gcl/associate-cloud-engineer/architecture-guide"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            試験対策・アーキテクチャ詳細ガイド
                        </Link>
                        <Link
                            href="/gcl/associate-cloud-engineer/domain1"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Domain 1: 環境設定 包括的解説
                        </Link>
                        <Link
                            href="/gcl/associate-cloud-engineer/domain2"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Domain 2: 計画と実装 包括的解説
                        </Link>
                        <Link
                            href="/gcl/associate-cloud-engineer/domain3"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Domain 3: 運用管理 包括的解説
                        </Link>
                    </div>
                </div>
                <div className="group relative" ref={cdlRef}>
                    <button
                        type="button"
                        onClick={() => setOpenMenu((v) => v === 'cdl' ? null : 'cdl')}
                        aria-haspopup="true"
                        aria-expanded={openMenu === 'cdl'}
                        className="flex items-center gap-1 text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                    >
                        Cloud Digital Leader
                        <span className="text-xs">▾</span>
                    </button>
                    <div className={cn("invisible absolute left-0 top-full z-50 mt-1 min-w-[280px] rounded-md border border-[var(--color-border)] bg-[var(--color-background)] py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100", openMenu === 'cdl' && "!visible !opacity-100")}>
                        <Link
                            href="/gcl/cloud-digital-leader"
                            className="block px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                            onClick={() => setOpenMenu(null)}
                        >
                            Cloud Digital Leader 認定試験
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
