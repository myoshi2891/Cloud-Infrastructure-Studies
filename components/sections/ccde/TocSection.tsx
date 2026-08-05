import { SECTION_DEFINITIONS } from '../../../app/cisco/ccde/complete-guide/constants';
import styles from './TocSection.module.css';

/**
 * TocSection - ページ内の主要12セクションへのアンカーリンク一覧を表示する目次コンポーネント。
 */
export default function TocSection() {
    return (
        <nav className={styles.toc} aria-label="目次ナビゲーション">
            <p className={styles.tocTitle}>目次 / Index</p>
            <ol>
                {SECTION_DEFINITIONS.map((section) => (
                    <li key={section.id}>
                        <a href={`#${section.id}`}>{section.tocLabel}</a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
