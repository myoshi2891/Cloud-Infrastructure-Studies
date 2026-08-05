import baseStyles from './SectionBase.module.css';
import styles from './GlossarySection.module.css';

/**
 * GlossarySection - セクション10「初学者のための用語辞典」コンポーネント。
 */
export default function GlossarySection() {
    return (
        <section className={baseStyles.sheet} id="glossary">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>10</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Glossary</span>
                    <h2>初学者のための用語辞典</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    出題範囲の説明に出てくる専門用語のうち、初学者がつまずきやすいものを簡単にまとめました。
                </p>
                <dl className={styles.glossaryGrid}>
                    <div className={styles.gterm}>
                        <dt>HLD（High-Level Design）</dt>
                        <dd>
                            詳細な設定値ではなく、システム全体の構成方針・構造を示す「概要設計」のこと。CCDE筆記試験が検証する中心的な能力。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>ROI / CAPEX・OPEX</dt>
                        <dd>
                            ROIは投資対効果。CAPEXは設備投資（初期費用）、OPEXは運用費用（継続的なコスト）を指し、設計提案の妥当性を説明する際の判断材料になる。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>SD-WAN</dt>
                        <dd>
                            ソフトウェアで制御される広域ネットワーク。拠点間の通信経路を集中管理し、柔軟に制御できるアーキテクチャ。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>オーケストレーション／自動化</dt>
                        <dd>
                            設定変更や運用作業を、人手ではなくソフトウェア・APIを通じて自動的に実行する仕組み。CI/CDのような開発手法をネットワーク運用に応用する考え方も含む。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>可観測性（Observability）</dt>
                        <dd>
                            ネットワークの状態や挙動を、ログ・メトリクスなどから継続的に把握できる状態のこと。障害の予兆把握や原因調査に直結する。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>CIA triad</dt>
                        <dd>
                            情報セキュリティの基本原則である「機密性（Confidentiality）」「完全性（Integrity）」「可用性（Availability）」の頭文字を取ったもの。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>SaaS / PaaS / IaaS</dt>
                        <dd>
                            クラウドサービスの提供形態の分類。ソフトウェア、開発プラットフォーム、インフラのどこまでを事業者が管理するかで区分される。
                        </dd>
                    </div>
                    <div className={styles.gterm}>
                        <dt>Cisco Learning Credits</dt>
                        <dd>
                            Ciscoの研修・試験費用の支払いに利用できる、Cisco独自のプリペイド型クレジット制度。
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
