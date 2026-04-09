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
        <nav
            className="sticky top-0 z-50 grid border-b border-white/[0.06] bg-[var(--color-background)]/90 px-8 backdrop-blur-xl"
            style={{
                height: 'var(--header-h, 48px)',
                minHeight: 'var(--header-h, 48px)',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
            }}
        >
            {/* Logo / Brand */}
            <Link
                href="/"
                className="group flex items-center gap-2.5 text-[var(--color-foreground)] transition-opacity hover:opacity-85"
            >
                <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-black"
                    style={{
                        background: 'linear-gradient(135deg, hsl(220 100% 62%), hsl(270 80% 60%))',
                    }}
                    aria-hidden
                >
                    ☁
                </span>
                <span className="text-[15px] font-bold tracking-tight">
                    Cloud Infrastructure{' '}
                    <span
                        style={{
                            background:
                                'linear-gradient(135deg, hsl(220 100% 72%), hsl(270 70% 65%))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Studies
                    </span>
                </span>
            </Link>

            {/* Nav Items — center column */}
            <div className="flex items-center justify-center gap-2 text-[14px]">
                {/* Generative AI Leader */}
                <div
                    className="relative"
                    ref={genAiRef}
                    onMouseEnter={() => setOpenMenu('genai')}
                    onMouseLeave={() => setOpenMenu(null)}
                >
                    <button
                        type="button"
                        onClick={() => setOpenMenu((v) => (v === 'genai' ? null : 'genai'))}
                        aria-haspopup="true"
                        aria-expanded={openMenu === 'genai'}
                        className={cn(
                            'flex items-center gap-2.5 rounded-xl px-5 py-3 font-medium transition-all duration-150',
                            openMenu === 'genai'
                                ? 'bg-white/8 text-[var(--color-foreground)]'
                                : 'text-[var(--color-muted-foreground)] hover:bg-white/5 hover:text-[var(--color-foreground)]',
                        )}
                    >
                        <span
                            className="flex h-4 w-4 items-center justify-center rounded text-[10px]"
                            style={{
                                background: 'hsl(270 60% 55% / 0.25)',
                                color: 'hsl(270 80% 75%)',
                            }}
                            aria-hidden
                        >
                            ✨
                        </span>
                        Generative AI Leader
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden
                            className={cn(
                                'transition-transform duration-150',
                                openMenu === 'genai' && 'rotate-180',
                            )}
                        >
                            <path
                                d="M2 4l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={cn(
                            'invisible absolute right-0 top-full z-50 mt-2 flex w-72 origin-top-right flex-col gap-1.5 rounded-xl border border-white/[0.08] bg-[#0e1117]/95 p-4 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-150',
                            openMenu === 'genai' && 'visible opacity-100',
                        )}
                    >
                        <DropdownItem
                            href="/gcl/genai-leader"
                            label="概要"
                            desc="Generative AI Leader とは"
                            ariaLabel="Generative AI Leader 概要"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/genai-leader/section1"
                            label="Section 1"
                            desc="Gen AI 基礎知識"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/genai-leader/section2"
                            label="Section 2"
                            desc="Google Cloud Gen AI サービス"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/genai-leader/section3"
                            label="Section 3"
                            desc="モデル出力改善技術"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/genai-leader/section4"
                            label="Section 4"
                            desc="ビジネス戦略"
                            onClick={() => setOpenMenu(null)}
                        />
                    </div>
                </div>

                {/* Associate Cloud Engineer */}
                <div
                    className="relative"
                    ref={aceRef}
                    onMouseEnter={() => setOpenMenu('ace')}
                    onMouseLeave={() => setOpenMenu(null)}
                >
                    <button
                        type="button"
                        onClick={() => setOpenMenu((v) => (v === 'ace' ? null : 'ace'))}
                        aria-haspopup="true"
                        aria-expanded={openMenu === 'ace'}
                        className={cn(
                            'flex items-center gap-2.5 rounded-xl px-5 py-3 font-medium transition-all duration-150',
                            openMenu === 'ace'
                                ? 'bg-white/8 text-[var(--color-foreground)]'
                                : 'text-[var(--color-muted-foreground)] hover:bg-white/5 hover:text-[var(--color-foreground)]',
                        )}
                    >
                        <span
                            className="flex h-4 w-4 items-center justify-center rounded text-[10px]"
                            style={{
                                background: 'hsl(220 60% 55% / 0.25)',
                                color: 'hsl(220 100% 75%)',
                            }}
                            aria-hidden
                        >
                            ⚙
                        </span>
                        Associate Cloud Engineer
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden
                            className={cn(
                                'transition-transform duration-150',
                                openMenu === 'ace' && 'rotate-180',
                            )}
                        >
                            <path
                                d="M2 4l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={cn(
                            'invisible absolute right-0 top-full z-50 mt-2 flex w-[22rem] origin-top-right flex-col gap-1.5 rounded-xl border border-white/[0.08] bg-[#0e1117]/95 p-4 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-150',
                            openMenu === 'ace' && 'visible opacity-100',
                        )}
                    >
                        <DropdownItem
                            href="/gcl/associate-cloud-engineer"
                            label="概要"
                            desc="Associate Cloud Engineer とは"
                            ariaLabel="概要"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/associate-cloud-engineer/architecture-guide"
                            label="アーキテクチャガイド"
                            desc="試験対策・詳細ガイド"
                            ariaLabel="アーキテクチャガイド 試験対策・アーキテクチャ詳細ガイド"
                            onClick={() => setOpenMenu(null)}
                        />
                        <div className="my-1 h-px bg-white/[0.06]" />
                        <DropdownItem
                            href="/gcl/associate-cloud-engineer/domain1"
                            label="Domain 1"
                            desc="環境設定 — 17.5%"
                            ariaLabel="Domain 1: 環境設定 包括的解説"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/associate-cloud-engineer/domain2"
                            label="Domain 2"
                            desc="計画と実装 — 21%"
                            ariaLabel="Domain 2: 計画と実装 包括的解説"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/associate-cloud-engineer/domain3"
                            label="Domain 3"
                            desc="運用管理 — 22%"
                            ariaLabel="Domain 3: 運用管理 包括的解説"
                            onClick={() => setOpenMenu(null)}
                        />
                        <DropdownItem
                            href="/gcl/associate-cloud-engineer/domain4"
                            label="Domain 4"
                            desc="アクセスとセキュリティ — 20%"
                            ariaLabel="Domain 4: アクセスとセキュリティ 包括的解説"
                            onClick={() => setOpenMenu(null)}
                        />
                    </div>
                </div>

                {/* Cloud Digital Leader */}
                <div
                    className="relative"
                    ref={cdlRef}
                    onMouseEnter={() => setOpenMenu('cdl')}
                    onMouseLeave={() => setOpenMenu(null)}
                >
                    <button
                        type="button"
                        onClick={() => setOpenMenu((v) => (v === 'cdl' ? null : 'cdl'))}
                        aria-haspopup="true"
                        aria-expanded={openMenu === 'cdl'}
                        className={cn(
                            'flex items-center gap-2.5 rounded-xl px-5 py-3 font-medium transition-all duration-150',
                            openMenu === 'cdl'
                                ? 'bg-white/8 text-[var(--color-foreground)]'
                                : 'text-[var(--color-muted-foreground)] hover:bg-white/5 hover:text-[var(--color-foreground)]',
                        )}
                    >
                        <span
                            className="flex h-4 w-4 items-center justify-center rounded text-[10px]"
                            style={{
                                background: 'hsl(160 50% 45% / 0.25)',
                                color: 'hsl(160 70% 65%)',
                            }}
                            aria-hidden
                        >
                            🌐
                        </span>
                        Cloud Digital Leader
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden
                            className={cn(
                                'transition-transform duration-150',
                                openMenu === 'cdl' && 'rotate-180',
                            )}
                        >
                            <path
                                d="M2 4l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={cn(
                            'invisible absolute right-0 top-full z-50 mt-2 flex w-72 origin-top-right flex-col gap-1.5 rounded-xl border border-white/[0.08] bg-[#0e1117]/95 p-4 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-150',
                            openMenu === 'cdl' && 'visible opacity-100',
                        )}
                    >
                        <DropdownItem
                            href="/gcl/cloud-digital-leader"
                            label="Cloud Digital Leader 認定試験"
                            desc="すべてのコンテンツを見る"
                            onClick={() => setOpenMenu(null)}
                        />
                    </div>
                </div>
            </div>

            {/* Right placeholder — keeps nav centered */}
            <div />
        </nav>
    );
}

/** Shared dropdown menu item */
function DropdownItem({
    href,
    label,
    desc,
    ariaLabel,
    onClick,
}: {
    href: string;
    label: string;
    desc: string;
    ariaLabel?: string;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-label={ariaLabel}
            className="group relative flex items-center gap-3 rounded-xl px-8 py-5 transition-all duration-150 hover:bg-white/[0.08]"
        >
            {/* Accent left bar that appears on hover */}
            <span
                className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-[var(--color-primary)] opacity-0 transition-all duration-200 group-hover:h-5 group-hover:opacity-100"
                aria-hidden="true"
            />
            <span className="flex flex-col gap-2 pl-3">
                <span className="text-[14px] font-bold leading-relaxed text-[var(--color-muted)] transition-colors duration-150 group-hover:text-[var(--color-foreground)]">
                    {label}
                </span>
                <span className="text-[11px] leading-relaxed text-[var(--color-muted-foreground)]">
                    {desc}
                </span>
            </span>
            {/* 装飾用矢印 — アクセシブル名の計算から除外 */}
            <span
                className="ml-auto translate-x-0 text-[10px] text-[var(--color-muted-foreground)] opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden="true"
            >
                →
            </span>
        </Link>
    );
}
