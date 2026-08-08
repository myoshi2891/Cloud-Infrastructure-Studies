import styles from './TitleBlockSection.module.css';

/**
 * Renders the CCDE guide's title, introduction, and certification metadata.
 *
 * @returns The title and certification metadata block.
 */
export default function TitleBlockSection() {
    return (
        <div className={styles.titleblock}>
            <div className={styles.titleblockTop}>
                <p className={styles.titleblockEyebrow}>
                    Cisco Certification Blueprint / 認定資格 解説図面
                </p>
                <h1 className={styles.titleblockTitle}>
                    CCDE（Cisco Certified Design Expert）認定 完全ガイド
                </h1>
                <p className={styles.titleblockSub}>
                    初学者のためのステップバイステップ解説 ―
                    全体像・試験構成・出題範囲・再認定までを1枚に整理
                </p>
            </div>
            <div className={styles.titleblockGrid}>
                <div className={styles.tbField}>
                    <span className={styles.tbLabel}>対象試験</span>
                    <span className={styles.tbValue}>400-007（筆記）+ 実技試験</span>
                </div>
                <div className={styles.tbField}>
                    <span className={styles.tbLabel}>現行バージョン</span>
                    <span className={styles.tbValue}>CCDE v3.1</span>
                </div>
                <div className={styles.tbField}>
                    <span className={styles.tbLabel}>認定レベル</span>
                    <span className={styles.tbValue}>Expert（最上位）</span>
                </div>
                <div className={styles.tbField}>
                    <span className={styles.tbLabel}>有効期間</span>
                    <span className={styles.tbValue}>3年</span>
                </div>
            </div>
        </div>
    );
}
