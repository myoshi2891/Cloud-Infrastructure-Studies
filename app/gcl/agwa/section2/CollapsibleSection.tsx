'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import styles from './page.module.css';
import { cn } from '@/lib/utils';

/**
 * Collapsible section card for AGWA Section 2 study content.
 *
 * Renders a card with a toggle header and a collapsible body. The toggle is
 * implemented with a native `<button>` element so keyboard activation
 * (Enter / Space) works out of the box without custom key handlers.
 *
 * @param props - {@link CollapsibleSectionProps}
 * @param props.id - Unique HTML id for the wrapper element; the body panel gets
 *   the id `${id}-body` (referenced by `aria-controls`).
 * @param props.num - Section number label rendered as a badge (accepts ReactNode
 *   so styled spans can be passed).
 * @param props.title - Section title displayed in the header.
 * @param props.weight - Exam frequency / weight label (e.g. "試験頻出度 ★★★").
 * @param props.defaultOpen - Whether the section is expanded on mount.
 *   Defaults to `false`.
 * @param props.wrapperStyle - Optional inline `CSSProperties` applied to the
 *   outer card wrapper.
 * @param props.headerStyle - Optional inline `CSSProperties` applied to the
 *   `<button>` header element.
 * @param props.numStyle - Optional inline `CSSProperties` applied to the
 *   section-number badge span.
 * @param props.children - Body content (`ReactNode`) shown when the section is
 *   expanded.
 * @returns A `React.ReactElement` — the collapsible section card.
 */
export function CollapsibleSection({
    id,
    num,
    title,
    weight,
    defaultOpen = false,
    wrapperStyle,
    headerStyle,
    numStyle,
    children,
}: CollapsibleSectionProps) {
    const [open, setOpen] = useState(defaultOpen);
    const bodyId = `${id}-body`;

    const toggle = () => setOpen((prev) => !prev);

    return (
        <div className={styles['section-card']} id={id} style={wrapperStyle}>
            <button
                type="button"
                className={styles['section-header']}
                aria-expanded={open}
                aria-controls={bodyId}
                onClick={toggle}
                style={headerStyle}
            >
                <span className={styles['section-num']} style={numStyle}>{num}</span>
                <span className={styles['section-title']}>{title}</span>
                <span className={styles['section-exam-weight']}>{weight}</span>
                <span className={cn(styles.chevron, open && styles.open)}>▾</span>
            </button>
            <div
                id={bodyId}
                className={cn(styles['section-body'], open && styles.open)}
            >
                {children}
            </div>
        </div>
    );
}

interface CollapsibleSectionProps {
    id: string;
    num: ReactNode;
    title: string;
    weight: string;
    defaultOpen?: boolean;
    wrapperStyle?: CSSProperties;
    headerStyle?: CSSProperties;
    numStyle?: CSSProperties;
    children: ReactNode;
}
