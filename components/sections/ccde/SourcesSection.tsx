import baseStyles from './SectionBase.module.css';
import styles from './SourcesSection.module.css';

/**
 * SourcesSection - セクション12「参考情報源」の公式リンク一覧コンポーネント。
 */
export default function SourcesSection() {
    return (
        <section
            className={`${baseStyles.sheet} ${styles.sources}`}
            id="sources"
            data-testid="sources-section"
        >
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>12</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Sources</span>
                    <h2>参考情報源</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    本ガイドの内容は、以下のCisco公式ページ・公式資料をもとに作成しています。最新情報は必ず公式サイトでご確認ください。
                </p>
                <ol>
                    <li>
                        <a
                            href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccde.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccde.html
                        </a>
                        <span className={styles.srcDesc}>
                            CCDE認定プログラム（Cisco公式・日本語ページ）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/index.html
                        </a>
                        <span className={styles.srcDesc}>
                            CCDE Overview（Cisco公式・英語ページ）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html
                        </a>
                        <span className={styles.srcDesc}>
                            CCDE Exams and
                            Training（試験構成・費用・エレクティブの最新情報）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/current-list/400-007-ccde.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/site/us/en/learn/training-certifications/exams/current-list/400-007-ccde.html
                        </a>
                        <span className={styles.srcDesc}>
                            400-007 CCDE 試験ページ（筆記試験の詳細）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://learningcontent.cisco.com/documents/marketing/exam-topics/CCDE_v3.1_Unified_Exam_Topics_12132024.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://learningcontent.cisco.com/documents/marketing/exam-topics/CCDE_v3.1_Unified_Exam_Topics_12132024.pdf
                        </a>
                        <span className={styles.srcDesc}>
                            CCDE v3.1 Unified Exam
                            Topics（公式PDF・出題ドメインと配点）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/recertification/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/site/us/en/learn/training-certifications/certifications/recertification/index.html
                        </a>
                        <span className={styles.srcDesc}>
                            Recertification Policy（再認定ポリシー）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/continuing-education/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/site/us/en/learn/training-certifications/certifications/continuing-education/index.html
                        </a>
                        <span className={styles.srcDesc}>
                            Cisco Continuing Education Program（CE単位による再認定）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/policies.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.cisco.com/site/us/en/learn/training-certifications/exams/policies.html
                        </a>
                        <span className={styles.srcDesc}>
                            Exam, Testing, and Certification
                            Policies（再受験の待機期間・18か月ルールなど）
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://learningnetwork.cisco.com/s/ccde-v3-1-unified-exam-topics"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://learningnetwork.cisco.com/s/ccde-v3-1-unified-exam-topics
                        </a>
                        <span className={styles.srcDesc}>
                            Cisco Learning Network：CCDE v3.1 Unified Exam Topics and Study
                            Guide
                        </span>
                    </li>
                </ol>
            </div>
        </section>
    );
}
