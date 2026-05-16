'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EXAMS } from '@/app/constants';
import { toNavTree, type NavExam } from '@/app/navigation';

const NAV_TREE = toNavTree(EXAMS);

function iconThemeClass(colorClass: string): string {
    // colorClass: 'card-ace' | 'card-genai' | ... | 'card-aws-saa'
    // 既存ユーティリティ命名規約: icon-theme-<suffix>
    return `icon-theme-${colorClass.replace(/^card-/, '')}`;
}

/**
 * Renders the sticky top navigation bar with a hamburger-triggered right-side drawer.
 *
 * The drawer is the single navigation surface for both desktop and mobile and is built
 * from {@link toNavTree} applied to {@link EXAMS}. The drawer implements focus trap,
 * scroll lock, Escape-to-close, and trigger-focus restoration.
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
            const tabbables = container.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );
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
                className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-[var(--color-background)]/90 px-6 backdrop-blur-xl"
                style={{
                    height: 'var(--header-h, 48px)',
                    minHeight: 'var(--header-h, 48px)',
                }}
            >
                {/* Logo / Brand */}
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 text-[var(--color-foreground)] transition-opacity hover:opacity-85"
                >
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-aurora text-sm font-black"
                        aria-hidden
                    >
                        ☁
                    </span>
                    <span className="text-[15px] font-bold tracking-tight">
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] transition-colors hover:bg-white/5 hover:text-[var(--color-foreground)]"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                        <path
                            d="M2 5h14M2 9h14M2 13h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </nav>
            {drawerOpen && (
                <div
                    ref={drawerRef}
                    id="site-nav-drawer"
                    role="dialog"
                    aria-modal="true"
                    aria-label="サイトナビゲーション"
                    className="fixed inset-0 z-[60] flex justify-end"
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                        aria-hidden
                    />
                    <aside className="relative flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/[0.08] bg-[#0e1117]/95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                            <span className="text-sm font-semibold text-[var(--color-foreground)]">
                                メニュー
                            </span>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="メニューを閉じる"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] transition-colors hover:bg-white/5 hover:text-[var(--color-foreground)]"
                            >
                                <span aria-hidden>×</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 px-5 py-5">
                            {NAV_TREE.map((group) => (
                                <section
                                    key={group.provider}
                                    aria-labelledby={`nav-group-${group.provider}`}
                                    className="flex flex-col gap-2"
                                >
                                    <h2
                                        id={`nav-group-${group.provider}`}
                                        className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]"
                                    >
                                        {group.label}
                                    </h2>
                                    <ul className="flex flex-col gap-1.5">
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
                    </aside>
                </div>
            )}
        </>
    );
}

function DrawerExamAccordion({
    exam,
    onLinkClick,
}: {
    exam: NavExam;
    onLinkClick: () => void;
}) {
    const isComingSoon = exam.status === 'coming-soon';
    return (
        <details className="group rounded-xl border border-white/[0.06] bg-white/[0.02] open:bg-white/[0.04]">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-[14px] font-medium text-[var(--color-foreground)] hover:bg-white/[0.04]">
                <span
                    className={cn(
                        iconThemeClass(exam.colorClass),
                        'flex h-5 w-5 items-center justify-center rounded text-[11px]',
                    )}
                    aria-hidden
                >
                    {exam.icon}
                </span>
                <span className="flex-1 leading-tight">{exam.label}</span>
                {isComingSoon && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                        準備中
                    </span>
                )}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className="text-[var(--color-muted-foreground)] transition-transform duration-150 group-open:rotate-180"
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
                <ul className="flex flex-col gap-0.5 border-t border-white/[0.04] px-2 py-2">
                    {exam.items.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={onLinkClick}
                                className="block rounded-lg px-3 py-2 text-[13px] text-[var(--color-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--color-foreground)]"
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
