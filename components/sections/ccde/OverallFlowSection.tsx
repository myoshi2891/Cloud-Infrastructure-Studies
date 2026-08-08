import Diagram from './Diagram';
import baseStyles from './SectionBase.module.css';

/**
 * Presents the overall flow for earning CCDE certification.
 *
 * @returns The section containing the certification flow diagram and key exam details.
 */
export default function OverallFlowSection() {
    return (
        <section className={baseStyles.sheet} id="overall-flow">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>02</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Big Picture</span>
                    <h2>認定までの全体フロー</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    CCDE認定を取得するまでの流れは、大きく分けて「筆記試験」と「実技試験」の2段階です。まずは全体像を1枚のフローチャートで確認しましょう。
                </p>

                <Diagram id="diag-1" label="CCDE認定 取得フロー全体像" />

                <p className={baseStyles.diagramCaption}>
                    <span className={baseStyles.capLabel}>図1：CCDE認定 取得フロー全体像</span>
                    <a href="#sources">
                        出典：Cisco公式CCDEページ／Exams and Trainingページ（参考情報源 [2][3]
                        参照）
                    </a>
                </p>

                <p>
                    ポイントは、実技試験を受ける前に「4つのエレクティブ（専門領域）」から1つを選ぶ必要があること、そして筆記試験の合格だけでも独立した認定（Specialist）が得られることです。この2点は初学者がつまずきやすいポイントなので、次の章以降で詳しく見ていきます。
                </p>
            </div>
        </section>
    );
}
