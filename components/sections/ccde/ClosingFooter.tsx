import styles from './ClosingFooter.module.css';

/**
 * Displays drawing number, revision, and sheet count metadata for the CCDE guide.
 *
 * @returns The rendered metadata footer.
 */
export default function ClosingFooter() {
    return (
        <footer className={styles.closing}>
            <span>DRAWING: CCDE-GUIDE-001</span>
            <span>REV: v3.1</span>
            <span>SHEET: 1 / 1</span>
        </footer>
    );
}
