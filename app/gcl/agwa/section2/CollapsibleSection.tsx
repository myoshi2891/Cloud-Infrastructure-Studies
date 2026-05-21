'use client';

import { useState, type KeyboardEvent, type ReactNode } from 'react';
import styles from './page.module.css';

interface CollapsibleSectionProps {
    id: string;
    num: string;
    title: string;
    weight: string;
    defaultOpen?: boolean;
    children: ReactNode;
}

export function CollapsibleSection({
    id,
    num,
    title,
    weight,
    defaultOpen = false,
    children,
}: CollapsibleSectionProps) {
    const [open, setOpen] = useState(defaultOpen);
    const bodyId = `${id}-body`;

    const toggle = () => setOpen((prev) => !prev);
    const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
        }
    };

    return (
        <div className={styles['section-card']} id={id}>
            <div
                className={styles['section-header']}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-controls={bodyId}
                onClick={toggle}
                onKeyDown={handleKey}
            >
                <span className={styles['section-num']}>{num}</span>
                <span className={styles['section-title']}>{title}</span>
                <span className={styles['section-exam-weight']}>{weight}</span>
                <span className={`${styles.chevron} ${open ? styles.open : ''}`.trim()}>▾</span>
            </div>
            <div
                id={bodyId}
                className={`${styles['section-body']} ${open ? styles.open : ''}`.trim()}
            >
                {children}
            </div>
        </div>
    );
}
