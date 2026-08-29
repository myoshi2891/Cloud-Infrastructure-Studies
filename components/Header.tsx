'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { EXAMS, providerMeta } from '@/app/constants';
import { toNavTree, type NavExam, type NavGroup } from '@/app/navigation';
import { getRecent, type RecentEntry } from '@/lib/recentPages';
import { ProviderMark, SiteMark } from '@/components/ProviderMark';

const NAV_TREE = toNavTree(EXAMS);

/**
 * Filter a navigation tree of exam groups by a search query.
 *
 * Performs a case-insensitive substring match of `query` against each exam's `label`
 * and against each `item.label` within an exam. Matching exams are included with
 * their full original `items` array preserved so all domains remain accessible.
 * If `query` is only whitespace, the original `tree` is returned unchanged.
 *
 * @param tree - The navigation groups to filter
 * @param query - Search text; trimmed and lowercased for matching. Whitespace-only disables filtering
 * @returns The filtered navigation tree containing only groups with at least one matching exam.
 */
function filterNavTree(tree: readonly NavGroup[], query: string): NavGroup[] {
    const q = query.trim().toLowerCase();
    if (!q) return tree as NavGroup[];
    return tree
        .map((group): NavGroup => {
            const exams = group.exams.filter((exam) => {
                if (exam.label.toLowerCase().includes(q)) return true;
                return exam.items.some((it) => it.label.toLowerCase().includes(q));
            });
            return { ...group, exams };
        })
        .filter((group) => group.exams.length > 0);
}

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
    const [isClosing, setIsClosing] = useState(false);
    const [query, setQuery] = useState('');
    const [recent, setRecent] = useState<RecentEntry[]>([]);
    const drawerRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const currentPath = usePathname();
    const filteredTree = useMemo(() => filterNavTree(NAV_TREE, query), [query]);
    const hasResults = filteredTree.length > 0;
    const isSearching = query.trim().length > 0;

    /**
     * Captures a snapshot of recently viewed entries and opens the navigation drawer.
     *
     * This records the current recent-history snapshot so the drawer can display up-to-date
     * "recently viewed" links, then sets the drawer open state.
     */
    function openDrawerWithRecent() {
        // 開いた瞬間の履歴スナップショットを採取（外部 store なので useEffect ではなくイベントで取得）
        setRecent(getRecent());
        setDrawerOpen(true);
    }

    /**
     * Clears the drawer search query and closes the navigation drawer.
     *
     * Clears the current search input used for filtering the nav tree and sets the drawer open state to false.
     */
    function closeDrawer() {
        setQuery('');
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setDrawerOpen(false);
        }, 270);
    }

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
                closeDrawer();
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
                className="sticky top-0 z-50 border-b border-white/[0.06] bg-[var(--color-background)]/90 backdrop-blur-xl"
                style={{
                    height: 'var(--header-h, 48px)',
                    minHeight: 'var(--header-h, 48px)',
                }}
            >
                <div
                    className="flex h-full w-full items-center justify-between px-6 md:px-8 lg:px-10"
                    style={{ maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    {/* Logo / Brand */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5 text-[var(--color-foreground)] transition-opacity hover:opacity-85 md:gap-3"
                    >
                        <SiteMark />
                        <span className="text-[15px] font-bold tracking-tight md:text-[17px] lg:text-[18px]">
                            Cloud Infrastructure{' '}
                            <span className="text-gradient-aurora">Studies</span>
                        </span>
                    </Link>

                    {/* Hamburger trigger */}
                    <button
                        ref={hamburgerRef}
                        type="button"
                        onClick={openDrawerWithRecent}
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
                            {/* 上の線: 開いた時 45deg 回転して X の一方になる */}
                            <path
                                d="M2 5h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                    transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
                                    transformOrigin: '9px 9px',
                                    transform: drawerOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                                }}
                            />
                            {/* 中央の線: フェードアウト */}
                            <path
                                d="M2 9h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                                    transformOrigin: '9px 9px',
                                    opacity: drawerOpen ? 0 : 1,
                                    transform: drawerOpen ? 'scaleX(0.5)' : 'none',
                                }}
                            />
                            {/* 下の線: 開いた時 -45deg 回転して X のもう一方になる */}
                            <path
                                d="M2 13h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                    transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
                                    transformOrigin: '9px 9px',
                                    transform: drawerOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                                }}
                            />
                        </svg>
                        <span className="hidden text-[13px] font-semibold tracking-wide uppercase md:inline">
                            Menu
                        </span>
                    </button>
                </div>
            </nav>
            {(drawerOpen || isClosing) && (
                <div
                    ref={drawerRef}
                    id="site-nav-drawer"
                    role="dialog"
                    aria-modal="true"
                    aria-label="サイトナビゲーション"
                    className="fixed inset-0 z-[200] flex justify-end md:justify-center"
                >
                    <div
                        className="hdr-backdrop absolute inset-0 bg-black/70 backdrop-blur-md"
                        data-state={isClosing ? 'closing' : 'open'}
                        onClick={closeDrawer}
                        aria-hidden
                    />
                    <aside
                        className="hdr-panel relative flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/[0.08] bg-[#0e1117]/95 shadow-2xl md:max-w-none md:border-l-0 md:bg-[#0b0f16]/97"
                        data-state={isClosing ? 'closing' : 'open'}
                    >
                        {/* Header — 外側で背景・ボーダーを画面端まで延ばし、内側ラッパーで本文と左右整列 */}
                        <div className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#0e1117]/95 backdrop-blur-xl">
                            <div
                                className="flex w-full items-center justify-between px-6 py-4 md:px-8 md:py-6 lg:px-10"
                                style={{
                                    maxWidth: '1100px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <span className="hidden md:flex"><SiteMark /></span>
                                    <span className="text-sm font-semibold text-[var(--color-foreground)] md:text-xl md:font-bold md:tracking-tight">
                                        メニュー
                                    </span>
                                </div>
                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    onClick={closeDrawer}
                                    aria-label="メニューを閉じる"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-muted-foreground)] transition-colors hover:bg-white/5 hover:text-[var(--color-foreground)] md:h-11 md:w-11 md:rounded-xl md:border md:border-white/[0.08] md:text-lg"
                                >
                                    <span aria-hidden className="text-lg leading-none md:text-2xl">
                                        ×
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div
                            className="w-full flex-1 px-6 pb-6 md:px-8 md:pb-12 lg:px-10 lg:pb-16"
                            style={{
                                maxWidth: '1100px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                paddingTop: '2.5rem',
                            }}
                        >
                            <div className="mb-6 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)] md:text-[12px]">
                                        Learning catalog
                                    </p>
                                    <p className="mt-1 text-[13px] text-[var(--color-muted-foreground)] md:text-[14px]">
                                        ベンダーを横断して学習ガイドを探す
                                    </p>
                                </div>
                                <label className="relative block w-full md:w-auto">
                                    <span className="sr-only">ナビゲーション検索</span>
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)] md:left-4 md:h-5 md:w-5"
                                    >
                                        <circle
                                            cx="9"
                                            cy="9"
                                            r="6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M14 14l3 3"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <input
                                        type="search"
                                        aria-label="ナビゲーション検索"
                                        placeholder="試験名・書籍名・ドメインで検索..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.035] py-2.5 pl-9 pr-3 text-[14px] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/15 md:w-[30rem] md:rounded-2xl md:py-3.5 md:pl-12 md:pr-4 md:text-[15px]"
                                    />
                                </label>
                            </div>

                            {hasResults ? (
                                <div className="flex flex-col gap-8 md:gap-12">
                                    {filteredTree.map((group) => (
                                        <ProviderSection
                                            key={group.provider}
                                            group={group}
                                            currentPath={currentPath}
                                            forceOpenAll={isSearching}
                                            onLinkClick={closeDrawer}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-8 text-center text-[14px] text-[var(--color-muted-foreground)] md:py-12 md:text-[15px]"
                                >
                                    「{query}」に該当する項目はありません。
                                </div>
                            )}

                            {!isSearching && recent.length > 0 && (
                                <nav
                                    aria-label="最近見たページ"
                                    className="border-t border-white/[0.06]"
                                    style={{ marginTop: '2rem' }}
                                >
                                    <h2 className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] md:mb-4 md:text-[13px] md:tracking-[0.18em]">
                                        <span
                                            className="md:inline-block md:h-px md:w-6 md:bg-white/15"
                                            aria-hidden
                                        />
                                        最近見たページ
                                    </h2>
                                    <ul className="flex flex-wrap gap-2 md:gap-2.5">
                                        {recent.map((entry) => (
                                            <li key={entry.href}>
                                                <Link
                                                    href={entry.href}
                                                    onClick={closeDrawer}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[12px] text-[var(--color-muted)] transition-colors hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-[var(--color-foreground)] md:px-4 md:py-2 md:text-[13px]"
                                                >
                                                    <span
                                                        aria-hidden
                                                        className="text-[var(--color-muted-foreground)]"
                                                    >
                                                        ↻
                                                    </span>
                                                    {entry.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
}

/**
 * 試験テーマアクセント (左端ボーダー) 用クラスマップ。
 * Tailwind v4 はビルド時にソース内の class 文字列を走査するため、
 * テンプレートリテラルで組み立てた arbitrary value クラス
 * (例: before バリアントで --color-theme-{試験ID}-fg を bg に当てる形) は検出されない。
 * 全パターンを静的に列挙して、JIT で必ず生成されるようにする。
 *
 * 注意: このコメント内に実物のクラス文字列をそのまま書くと、Tailwind の JIT が
 * プレースホルダ込みのまま拾ってしまい、生成 CSS に `<id>` 等の不正トークンが
 * 混入して PostCSS パースが失敗する。説明はクラス文字列を分割／日本語化で示すこと。
 */
const ACCENT_CLASS: Record<string, string> = {
    'card-ace': 'before:bg-[var(--color-theme-ace-fg)]',
    'card-genai': 'before:bg-[var(--color-theme-genai-fg)]',
    'card-cdl': 'before:bg-[var(--color-theme-cdl-fg)]',
    'card-agwa': 'before:bg-[var(--color-theme-agwa-fg)]',
    'card-pcne': 'before:bg-[var(--color-theme-pcne-fg)]',
    'card-aws-saa': 'before:bg-[var(--color-theme-aws-fg)]',
    'card-ccna': 'before:bg-[var(--color-theme-cisco-fg)]',
    'card-pca': 'before:bg-[var(--color-theme-pca-fg)]',
    'card-comptia': 'before:bg-[var(--color-theme-comptia-fg)]',
    'card-accelerate': 'before:bg-[var(--color-theme-accelerate-fg)]',
    'card-sre': 'before:bg-[var(--color-theme-sre-fg)]',
    'card-devops-handbook': 'before:bg-[var(--color-theme-devops-handbook-fg)]',
    'card-release-it': 'before:bg-[var(--color-theme-release-it-fg)]',
    'card-infrastructure-as-code': 'before:bg-[var(--color-theme-infrastructure-as-code-fg)]',
};

/**
 * Renders a provider section with a header and its exams.
 *
 * Displays a hero strip with the provider label and exam count, followed by the provider's exams rendered as accordions.
 *
 * The exam list uses a two-column grid at md+ breakpoints for GCP and a single-column layout for AWS so single "coming soon" cards can span full width.
 *
 * @param group - Navigation group object containing provider, label, and exams.
 * @param currentPath - Current pathname used to mark active item links.
 * @param forceOpenAll - When true, non-coming-soon exams are forced open.
 * @param onLinkClick - Callback invoked when an exam item link is clicked (typically to close the drawer).
 * @returns The section element that groups the provider header and its exam accordions.
 */
function ProviderSection({
    group,
    currentPath,
    forceOpenAll,
    onLinkClick,
}: {
    group: NavGroup;
    currentPath: string | null;
    forceOpenAll: boolean;
    onLinkClick: () => void;
}) {
    const isGCP = group.provider === 'GCP';
    return (
        <section
            aria-labelledby={`nav-group-${group.provider}`}
            className="flex flex-col gap-4 md:gap-6"
        >
            {/* Hero strip */}
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3 md:pb-4">
                <div className="flex items-center gap-3 md:gap-4">
                    <ProviderMark provider={group.provider} compact />
                    <h2
                        id={`nav-group-${group.provider}`}
                        className="text-[13px] font-bold tracking-tight text-[var(--color-foreground)] md:text-[18px]"
                    >
                        {group.label}
                    </h2>
                </div>
                <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-muted-foreground)] md:px-3 md:py-1 md:text-[12px]">
                    {group.exams.length} {providerMeta[group.provider].countUnit.ja}
                </span>
            </div>

            {/* 項目数の多い GCP / Cisco はデスクトップで2列に整理する。 */}
            <ul
                className={cn(
                    'flex flex-col gap-2 md:gap-4',
                    group.provider !== 'AWS' &&
                        'md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-3',
                )}
            >
                {group.exams.map((exam) => (
                    <li key={exam.id}>
                        <DrawerExamAccordion
                            exam={exam}
                            currentPath={currentPath}
                            forceOpen={forceOpenAll}
                            onLinkClick={onLinkClick}
                        />
                    </li>
                ))}
            </ul>
        </section>
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
    currentPath,
    forceOpen = false,
    onLinkClick,
}: {
    exam: NavExam;
    currentPath: string | null;
    forceOpen?: boolean;
    onLinkClick: () => void;
}) {
    const isComingSoon = exam.status === 'coming-soon';
    // 現在ページが exam 配下に含まれるなら open default にする（uncontrolled details の defaultOpen 相当）
    const containsActive = !!currentPath && exam.items.some((item) => item.href === currentPath);
    const shouldOpen = (forceOpen && !isComingSoon) || containsActive;
    const accentBefore = ACCENT_CLASS[exam.colorClass] ?? 'before:bg-white/30';
    return (
        <details
            open={shouldOpen || undefined}
            className={cn(
                'group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors open:bg-white/[0.04] md:rounded-2xl',
                'before:absolute before:bottom-3 before:left-0 before:top-3 before:w-[2px] before:rounded-r before:opacity-50 before:transition-opacity before:content-[""]',
                accentBefore,
                'hover:border-white/[0.12] hover:before:opacity-90',
                'open:border-white/[0.14] open:before:opacity-100',
                isComingSoon && 'opacity-70',
            )}
        >
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
                <ul
                    className="flex flex-col border-t border-white/[0.04]"
                    style={{ padding: '4px 6px', gap: '4px' }}
                >
                    {exam.items.map((item) => {
                        const isActive = currentPath === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onLinkClick}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={cn(
                                        'flex items-center justify-between gap-2 rounded-lg leading-relaxed text-[13px] text-[var(--color-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--color-foreground)] md:rounded-xl md:text-[15px]',
                                        isActive &&
                                            'bg-white/[0.08] font-semibold text-[var(--color-foreground)]',
                                    )}
                                    style={{ padding: '3px 12px' }}
                                >
                                    <span className="flex-1 truncate">{item.label}</span>
                                    {isActive && (
                                        <span
                                            aria-hidden
                                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </details>
    );
}
