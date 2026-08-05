import styles from './ClosingFooter.module.css';

/**
 * ClosingFooter - CCDE ガイド最下部の図面メタデータフッター表示コンポーネント。
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
