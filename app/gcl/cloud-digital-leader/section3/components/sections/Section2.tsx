import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section2.module.css';

/**
 * Section2: Google Cloud AI/ML ソリューションの選択
 */
export const Section2: React.FC = () => {
    return (
        <section id="solutions" className={baseStyles.section}>
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>3.2 AI AND ML SOLUTIONS</div>
                    <h2 className={baseStyles.sectionTitle}>Google Cloud AI/ML ソリューションの選択</h2>
                    <p className={baseStyles.sectionDesc}>
                        スピード・労力・差別化・必要な専門知識のトレードオフに基づいて、 最適な
                        AI/ML ソリューションを選択する方法を学びます。
                    </p>
                </div>

                {/* TRADEOFF TABLE */}
                <h3 className={baseStyles.subsectionTitle}>
                    4 つのトレードオフ要因<span className={baseStyles.examTag}>最重要</span>
                </h3>
                <div className={baseStyles.card} style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                    <table className={styles.tradeoffTable} style={{ minWidth: '600px' }}>
                        <thead>
                            <tr>
                                <th>ソリューション</th>
                                <th>スピード 🚀</th>
                                <th>労力（工数）💪</th>
                                <th>差別化 🏆</th>
                                <th>必要な専門知識 👨‍💻</th>
                                <th>適用場面</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>🔌 事前学習済み API</td>
                                <td><span className={styles.dotHigh}>●●●</span> 即座</td>
                                <td><span className={styles.dotHigh}>低 ●</span></td>
                                <td><span className={styles.dotLow}>低 ●</span></td>
                                <td><span className={styles.dotHigh}>不要 ●</span></td>
                                <td>汎用タスク（翻訳・感情分析・OCR）</td>
                            </tr>
                            <tr>
                                <td>🤖 AutoML</td>
                                <td><span className={styles.dotMid}>●●○</span> 数時間〜1日</td>
                                <td><span className={styles.dotMid}>中 ●●</span></td>
                                <td><span className={styles.dotMid}>中 ●●</span></td>
                                <td><span className={styles.dotMid}>最小限 ●●</span></td>
                                <td>自社データでカスタムモデルが必要（ML知識なし）</td>
                            </tr>
                            <tr>
                                <td>🏗️ カスタムモデル（Vertex AI）</td>
                                <td><span className={styles.dotLow}>●○○</span> 数週間〜</td>
                                <td><span className={styles.dotLow}>高 ●●●</span></td>
                                <td><span className={styles.dotHigh}>高 ●●●</span></td>
                                <td><span className={styles.dotLow}>ML エンジニア必須 ●●●</span></td>
                                <td>競合優位性のために独自モデルが必要</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* DECISION TREE */}
                <h3 className={baseStyles.subsectionTitle}>AI/ML ソリューション選択デシジョンツリー</h3>
                <div className={styles.decisionTree}>
                    <div className={styles.dtRow}>
                        <div className={styles.dtNode}>AI 機能が必要</div>
                        <div className={styles.dtArrow}>→</div>
                        <div className={styles.dtNode}>自社独自のデータで学習が必要？</div>
                    </div>
                    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginLeft: '2rem' }}>
                        <div>
                            <div
                                style={{
                                    color: 'var(--color-accent-red)',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '0.5rem'
                                }}
                            >
                                NO（汎用タスクで十分）
                            </div>
                            <div className={styles.dtRow}>
                                <div className={styles.dtAnswer}>🔌 事前学習済み API</div>
                            </div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                                Vision / NL / Translation / Speech API
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    color: 'var(--color-accent-green)',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: '0.5rem'
                                }}
                            >
                                YES（カスタムが必要）
                            </div>
                            <div className={styles.dtRow}>
                                <div className={styles.dtNode}>ML の専門知識がある？</div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    flexWrap: 'wrap',
                                    marginTop: '0.5rem'
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            color: 'var(--color-accent-red)',
                                            fontSize: '1rem',
                                            marginBottom: '0.3rem'
                                        }}
                                    >
                                        NO
                                    </div>
                                    <div className={styles.dtAnswer}>🤖 AutoML</div>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            color: 'var(--color-accent-green)',
                                            fontSize: '1rem',
                                            marginBottom: '0.3rem'
                                        }}
                                    >
                                        YES
                                    </div>
                                    <div className={styles.dtAnswer}>🏗️ Vertex AI</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={baseStyles.bpBox}>
                    <div className={baseStyles.bpTitle}>✅ ベストプラクティス：ソリューション選択の原則</div>
                    <ul className={baseStyles.bpList}>
                        <li>
                            まず事前学習済み API
                            から試す（コスト・時間が最小）。精度が不十分であれば AutoML を検討。
                        </li>
                        <li>
                            AutoML でも要件を満たせない場合のみ Vertex AI（カスタムモデル）へ進む。
                        </li>
                        <li>「差別化がコアバリューとなる領域のみ」カスタムモデルに投資する。</li>
                        <li>
                            既存の BigQuery データがある場合は BigQuery ML でデータ移動なしに ML
                            を実行する。
                        </li>
                    </ul>
                </div>

                <div className={baseStyles.sourceBox}>
                    <div className={baseStyles.sourceTitle}>📎 参考ソース</div>
                    <div className={baseStyles.sourceLinks}>
                        <a href="https://cloud.google.com/architecture/choose-a-machine-learning-approach" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/architecture/choose-a-machine-learning-approach
                        </a>
                        <a href="https://cloud.google.com/blog/topics/developers-practitioners/pick-your-aiml-path-google-cloud" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/blog/topics/developers-practitioners/pick-your-aiml-path-google-cloud
                        </a>
                    </div>
                </div>
            </div>
            
            <div className={baseStyles.sectionDivider}></div>
        </section>
    );
};
