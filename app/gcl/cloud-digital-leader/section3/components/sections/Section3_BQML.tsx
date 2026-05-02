import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section3.module.css';

export const Section3_BQML: React.FC = () => {
    return (
        <div id="bqml">
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>BIGQUERY ML</div>
                    <h2 className={baseStyles.sectionTitle}>
                        BigQuery ML（SQL でモデル構築）<span className={baseStyles.examTag}>頻出</span>
                    </h2>
                    <p className={baseStyles.sectionDesc}>
                        標準 SQL クエリを使用するだけで、BigQuery のデータウェアハウス内で直接 ML モデルを作成・実行できる革新的なアプローチ。
                    </p>
                </div>

                <div className={baseStyles.grid2} style={{ marginBottom: '2rem' }}>
                    <div className={baseStyles.card} style={{ background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.07), rgba(0, 0, 0, 0))' }}>
                        <div style={{ fontSize: '1rem', color: 'var(--color-accent-blue)', fontWeight: 700, marginBottom: '0.8rem' }}>
                            💡 BigQuery ML の革命的な価値
                        </div>
                        <div className={styles.stepFlow}>
                            <div className={styles.stepItem}>
                                <div className={styles.stepNum}>1</div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepTitle}>データ移動コストをゼロに</div>
                                    <div className={styles.stepDesc}>
                                        BigQuery 内のデータをそのまま ML 学習に活用。ETL プロセスや外部コンピュートへのデータ転送が不要。
                                    </div>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <div className={styles.stepNum}>2</div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepTitle}>SQL のみで ML を実現</div>
                                    <div className={styles.stepDesc}>
                                        Python・TensorFlow の知識不要。既存の SQL スキルを持つデータアナリストが直接 ML モデルを構築・実行できる。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={baseStyles.card}>
                        <div style={{ fontSize: '1rem', color: 'var(--color-accent-cyan, #00bcd4)', fontWeight: 700, marginBottom: '1rem' }}>
                            📊 対応モデルタイプと用途
                        </div>
                        <table className={styles.compareTable}>
                            <thead>
                                <tr>
                                    <th>モデルタイプ</th>
                                    <th>タスク</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>線形回帰</td>
                                    <td>数値予測</td>
                                </tr>
                                <tr>
                                    <td>ロジスティック回帰</td>
                                    <td>分類</td>
                                </tr>
                                <tr>
                                    <td>K-means クラスタリング</td>
                                    <td>セグメンテーション</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={baseStyles.card} style={{ background: 'var(--color-bg-secondary)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '0.8rem' }}>
                        SQL — BigQuery ML モデル作成の例
                    </div>
                    <div className="code-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-text-secondary)', overflowX: 'auto', lineHeight: 1.8 }}>
                        <div className="code-line"><span style={{ color: '#7c4dff' }}>CREATE OR REPLACE MODEL</span> <span style={{ color: '#00bcd4' }}>`myproject.mydataset.churn_model`</span></div>
                        <div className="code-line"><span style={{ color: '#7c4dff' }}>OPTIONS</span>(</div>
                        <div className="code-line">  model_type = <span style={{ color: '#fbbc04' }}>'logistic_reg'</span>,</div>
                        <div className="code-line">  input_label_cols = [<span style={{ color: '#fbbc04' }}>'churned'</span>]</div>
                        <div className="code-line">) AS</div>
                        <div className="code-line"><span style={{ color: '#7c4dff' }}>SELECT</span></div>
                        <div className="code-line">  purchase_count,</div>
                        <div className="code-line">  last_purchase_days_ago,</div>
                        <div className="code-line">  avg_order_value,</div>
                        <div className="code-line">  churned <span style={{ color: '#546e8a' }}></span></div>
                        <div className="code-line"><span style={{ color: '#7c4dff' }}>FROM</span> <span style={{ color: '#00bcd4' }}>`myproject.mydataset.customer_features`</span>;</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
