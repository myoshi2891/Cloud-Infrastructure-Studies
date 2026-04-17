import React from 'react';
import styles from './SectionCard.module.css';

/**
 * SectionCard component for rendering content blocks.
 *
 * Wraps section content in a stylized card with an optional description and a numbered heading.
 *
 * @param id - The HTML id attribute for the card wrapper
 * @param idNumber - The section number to display in the heading
 * @param title - The main heading title of the card
 * @param description - An optional description paragraph displayed below the heading
 * @param children - The main content elements inside the card
 * @returns A JSX element containing the formatted section card
 */
interface SectionCardProps {
    id: string;
    idNumber: string;
    title: string;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ id, idNumber, title, description, children }) => {
    return (
        <div className={styles.tcard} id={id}>
            <h3 className={styles.ttitle}>
                <span className={styles.tid}>{idNumber}</span>
                {title}
            </h3>
            {description && <p className={styles.tdesc}>{description}</p>}
            {children}
        </div>
    );
};
