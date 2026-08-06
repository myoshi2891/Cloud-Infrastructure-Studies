import { SECTION_DEFINITIONS } from '../../../app/cisco/ccde/complete-guide/constants';
import styles from './TocSection.module.css';

/**
 * ガイド内の各セクションへ素早く移動するためのアンカーリンクを提供する目次ナビゲーションコンポーネント。
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
