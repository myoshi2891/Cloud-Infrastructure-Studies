import baseStyles from './SectionBase.module.css';
import styles from './FaqSection.module.css';

/**
 * FaqSection - セクション11「よくある質問」の専用FAQコンポーネント。
 */
export default function FaqSection() {
    return (
        <section className={baseStyles.sheet} id="faq">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>11</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>FAQ</span>
                    <h2>よくある質問</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <div className={styles.faqItem}>
                    <p className={styles.faqQ}>
                        <span className={styles.qMark}>Q.</span>
                        筆記試験に合格したら、実技試験はいつまでに受ければいい？
                    </p>
                    <p className={styles.faqA}>
                        Cisco公式の試験ポリシーでは、筆記試験合格後18か月以内に実技試験の初回受験をする必要があるとされています。計画的なスケジュールを組みましょう。
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <p className={styles.faqQ}>
                        <span className={styles.qMark}>Q.</span>
                        試験に落ちてしまったら、すぐに再受験できる？
                    </p>
                    <p className={styles.faqA}>
                        筆記試験に不合格の場合は5暦日、実技試験に不合格の場合は30暦日の待機期間を経てから再受験の予約が可能になります。また、一度合格した筆記試験（同一試験番号）を再度受けるには180日以上の間隔が必要です。
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <p className={styles.faqQ}>
                        <span className={styles.qMark}>Q.</span>試験は日本語で受けられる？
                    </p>
                    <p className={styles.faqA}>
                        筆記試験（400-007）の試験言語は英語のみとされています。受験を検討する際は、この点を踏まえて準備を進める必要があります。
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <p className={styles.faqQ}>
                        <span className={styles.qMark}>Q.</span>
                        実技試験のエレクティブは後から変更できる？
                    </p>
                    <p className={styles.faqA}>
                        エレクティブは実技試験の当日に選択する仕組みです。事前にどの分野を選ぶかを検討し、それに沿った学習を進めておくことが推奨されています。
                    </p>
                </div>
            </div>
        </section>
    );
}
