'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EXAMS } from '@/app/constants';
import { toNavTree, type NavExam } from '@/app/navigation';

const NAV_TREE = toNavTree(EXAMS);

/**
 * Produce the icon theme CSS class name corresponding to a card-style color class.
 *
 * @param colorClass - A card-style color class (for example, `"card-ace"`, `"card-genai"`, `"card-aws-saa"`)
 * @returns The corresponding `icon-theme-*` class name (for example, `"icon-theme-ace"`)
 */
function iconThemeClass(colorClass: string): string {
    // colorClass: 'card-ace' | 'card-genai' | ... | 'card-aws-saa'
    // 既存ユーティリティ命名規約: icon-theme-<suffix>
    return `icon-theme-${colorClass.replace(/^card-/, '')}`;
}

/**
 * Renders a sticky top navigation bar with a hamburger button that opens a right-side navigation drawer.
 *
 * The drawer contains the site's navigation and enforces scroll lock, keyboard accessibility (Tab focus trapping and Escape-to-close), and focus restoration to the hamburger trigger when closed.
 */
export function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Drawer: スクロールロック + 開時に閉じるボタンへフォーカス + 閉時にトリガーへ復帰
    useEffect(() => {
        if (!drawerOpen) return;

        const triggerEl = hamburgerRef.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        // フォーカス移動はマウント完了後に確実に行う
        const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            triggerEl?.focus();
        };
    }, [drawerOpen]);

    // Drawer: Escape で閉じる + Tab フォーカストラップ
    useEffect(() => {
        if (!drawerOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setDrawerOpen(false);
                return;
            }
            if (e.key !== 'Tab') return;
            const container = drawerRef.current;
            if (!container) return;
            const rawTabbables = container.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
            );
            // summary は常時タブ可能。details 内のコンテンツは open 時のみタブ可能
            const tabbables = Array.from(rawTabbables).filter((el) => {
                if (el.tagName.toLowerCase() === 'summary') return true;
                const d = el.closest('details');
                return !d || d.open;
            });
            const first = tabbables[0];
            const last = tabbables[tabbables.length - 1];
            if (!first || !last) return;
            const active = document.activeElement as HTMLElement | null;
            if (e.shiftKey && (active === first || !container.contains(active))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [drawerOpen]);

    return (
        <>
            <nav
                aria-label="サイト全体のメインナビゲーション"
                className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-[var(--color-background)]/90 px-6 backdrop-blur-xl md:px-8 lg:px-10"
                style={{
                    height: 'var(--header-h, 48px)',
                    minHeight: 'var(--header-h, 48px)',
                }}
            >
                {/* Logo / Brand */}
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 text-[var(--color-foreground)] transition-opacity hover:opacity-85 md:gap-3"
                >
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-aurora text-sm font-black md:h-8 md:w-8 md:text-base"
                        aria-hidden
                    >
                        ☁
                    </span>
                    <span className="text-[15px] font-bold tracking-tight md:text-[17px] lg:text-[18px]">
                        Cloud Infrastructure{' '}
                        <span className="text-gradient-aurora">Studies</span>
                    </span>
                </Link>

                {/* Hamburger trigger */}
                <button
                    ref={hamburgerRef}
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="メニューを開く"
                    aria-haspopup="dialog"
                    aria-expanded={drawerOpen}
                    aria-controls="site-nav-drawer"
                    className="group flex h-9 items-center justify-center gap-2 rounded-lg px-2 text-[var(--color-muted-foreground)] transition-colors hover:bg-white/5 hover:text-[var(--color-foreground)] md:h-11 md:gap-2.5 md:px-3.5"
                >
                    <svg
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                        className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]"
                    >
                        <path
                            d="M2 5h14M2 9h14M2 13h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="hidden text-[13px] font-semibold tracking-wide uppercase md:inline">
                        Menu
                    </span>
                </button>
            </nav>
            {drawerOpen && (
                <div
                    ref={drawerRef}
                    id="site-nav-drawer"
                    role="dialog"
                    aria-modal="true"
                    aria-label="サイトナビゲーション"
                    className="fixed inset-0 z-[200] flex justify-end md:justify-center"
                >
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={() => setDrawerOpen(false)}
                        aria-hidden
                    />
                    <aside className="relative flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/[0.08] bg-[#0e1117]/95 shadow-2xl md:max-w-none md:border-l-0 md:bg-[#0b0f16]/97">
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#0e1117]/95 px-5 py-4 backdrop-blur-xl md:px-10 md:py-6 lg:px-16">
                            <div className="flex items-center gap-3 md:gap-4">
                                <span
                                    className="hidden h-9 w-9 items-center justify-center rounded-xl bg-gradient-aurora text-base font-black md:flex"
                                    aria-hidden
                                >
                                    ☁
                                </span>
                                <span className="text-sm font-semibold text-[var(--color-foreground)] md:text-xl md:font-bold md:tracking-tight">
                                    メニュー
                                </span>
                            </div>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="メニューを閉じる"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] transition-colors hover:bg-white/5 hover:text-[var(--color-foreground)] md:h-11 md:w-11 md:rounded-xl md:border md:border-white/[0.08] md:text-lg"
                            >
                                <span aria-hidden className="text-lg leading-none md:text-2xl">×</span>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="mx-auto w-full max-w-7xl flex-1 px-5 py-5 md:px-10 md:py-10 lg:px-16 lg:py-12">
                            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:gap-x-14">
                                {NAV_TREE.map((group) => (
                                    <section
                                        key={group.provider}
                                        aria-labelledby={`nav-group-${group.provider}`}
                                        className="flex flex-col gap-2 md:gap-4"
                                    >
                                        <h2
                                            id={`nav-group-${group.provider}`}
                                            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] md:text-[13px] md:tracking-[0.18em]"
                                        >
                                            <span className="md:inline-block md:h-px md:w-6 md:bg-white/15" aria-hidden />
                                            {group.label}
                                        </h2>
                                        <ul className="flex flex-col gap-1.5 md:gap-2.5">
                                            {group.exams.map((exam) => (
                                                <li key={exam.id}>
                                                    <DrawerExamAccordion
                                                        exam={exam}
                                                        onLinkClick={() => setDrawerOpen(false)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
}

/**
 * Render an accordion section for a single exam inside the drawer navigation.
 *
 * Renders a <details>/<summary> accordion showing the exam icon and label, an optional
 * "準備中" badge when the exam status is `coming-soon`, and a list of links for the
 * exam's items when not coming soon.
 *
 * @param exam - The exam data (label, icon, colorClass, status, and items) to render.
 * @param onLinkClick - Callback invoked when any exam item link is clicked.
 * @returns A JSX element containing the exam accordion (header plus optional item links).
 */
function DrawerExamAccordion({
    exam,
    onLinkClick,
}: {
    exam: NavExam;
    onLinkClick: () => void;
}) {
    const isComingSoon = exam.status === 'coming-soon';
    return (
        <details className="group rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors open:border-white/[0.12] open:bg-white/[0.04] md:rounded-2xl">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-[14px] font-medium text-[var(--color-foreground)] transition-colors hover:bg-white/[0.04] md:gap-4 md:px-5 md:py-4 md:text-[16px]">
                <span
                    className={cn(
                        iconThemeClass(exam.colorClass),
                        'flex h-5 w-5 items-center justify-center rounded text-[11px] md:h-8 md:w-8 md:rounded-lg md:text-[14px]',
                    )}
                    aria-hidden
                >
                    {exam.icon}
                </span>
                <span className="flex-1 leading-tight md:tracking-tight">{exam.label}</span>
                {isComingSoon && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] md:px-2.5 md:py-1 md:text-[11px]">
                        準備中
                    </span>
                )}
                <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="h-3 w-3 text-[var(--color-muted-foreground)] transition-transform duration-150 group-open:rotate-180 md:h-4 md:w-4"
                >
                    <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </summary>
            {!isComingSoon && (
                <ul className="flex flex-col gap-0.5 border-t border-white/[0.04] px-2 py-2 md:gap-1 md:px-3 md:py-3">
                    {exam.items.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={onLinkClick}
                                className="block rounded-lg px-3 py-2 text-[13px] text-[var(--color-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--color-foreground)] md:rounded-xl md:px-4 md:py-2.5 md:text-[15px]"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </details>
    );
}
