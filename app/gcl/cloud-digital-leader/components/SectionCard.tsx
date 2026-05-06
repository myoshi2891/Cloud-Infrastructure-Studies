import React from 'react';
import styles from './SectionCard.module.css';

interface SectionCardProps {
    id: string;
    idNumber: string;
    title: string;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * Wraps section content in a stylized card with a numbered heading.
 *
 * @param id - The HTML id attribute for the card wrapper
 * @param idNumber - The section number to display in the heading
 * @param title - The main heading title of the card
 * @param description - An optional description rendered below the heading
 * @param children - The main content elements inside the card
 */
export const SectionCard: React.FC<SectionCardProps> = ({ id, idNumber, title, description, children }) => {
    return (
        <div className={styles.tcard} id={id}>
            <h3 className={styles.ttitle}>
                <span className={styles.tid}>{idNumber}</span>
                {title}
            </h3>
            {description && <div className={styles.tdesc}>{description}</div>}
            {children}
        </div>
    );
};
