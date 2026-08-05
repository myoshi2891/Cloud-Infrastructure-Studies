import styles from './TocSection.module.css';

/**
 * TocSection - ページ内の主要12セクションへのアンカーリンク一覧を表示する目次コンポーネント。
 */
export default function TocSection() {
    return (
        <nav className={styles.toc} aria-label="目次ナビゲーション">
            <p className={styles.tocTitle}>目次 / Index</p>
            <ol>
                <li>
                    <a href="#what-is-ccde">1. CCDEとは何か</a>
                </li>
                <li>
                    <a href="#overall-flow">2. 認定までの全体フロー</a>
                </li>
                <li>
                    <a href="#prerequisites">3. 受験資格・推奨される経験</a>
                </li>
                <li>
                    <a href="#step1-written">4. STEP1：筆記試験（400-007）</a>
                </li>
                <li>
                    <a href="#step2-practical">5. STEP2：実技試験</a>
                </li>
                <li>
                    <a href="#certifications-earned">6. 合格後に得られる認定</a>
                </li>
                <li>
                    <a href="#costs">7. 費用まとめ</a>
                </li>
                <li>
                    <a href="#recertification">8. 再認定（3年ごと）</a>
                </li>
                <li>
                    <a href="#roadmap">9. 初学者向け学習ロードマップ</a>
                </li>
                <li>
                    <a href="#glossary">10. 初学者のための用語辞典</a>
                </li>
                <li>
                    <a href="#faq">11. よくある質問</a>
                </li>
                <li>
                    <a href="#sources">12. 参考情報源</a>
                </li>
            </ol>
        </nav>
    );
}
