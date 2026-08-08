import Diagram from './Diagram';
import baseStyles from './SectionBase.module.css';

/**
 * Renders section 9, presenting a proposed study roadmap for CCDE beginners.
 */
export default function RoadmapSection() {
    return (
        <section className={baseStyles.sheet} id="roadmap">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>09</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Study Plan</span>
                    <h2>初学者向け学習ロードマップ（提案）</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    ここまでの情報を踏まえて、初学者がCCDEを目指す場合に取り得る学習の順序を、一般的な流れとして整理しました。あくまで一例として参考にしてください。
                </p>

                <Diagram id="diag-5" label="学習ロードマップの一例" />

                <p className={baseStyles.diagramCaption}>
                    <span className={baseStyles.capLabel}>図5：学習ロードマップの一例</span>
                    <span>作成：本ガイドの著者による整理案</span>
                </p>
            </div>
        </section>
    );
}
