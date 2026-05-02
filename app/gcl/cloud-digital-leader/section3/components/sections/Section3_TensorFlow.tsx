import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section3.module.css';

export const Section3_TensorFlow: React.FC = () => {
    return (
        <div id="tensorflow">
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>TENSORFLOW & CLOUD TPU</div>
                    <h2 className={baseStyles.sectionTitle}>
                        TensorFlow と Cloud TPU<span className={baseStyles.examTag}>試験出題範囲</span>
                    </h2>
                    <p className={baseStyles.sectionDesc}>
                        試験ガイドに明示されている TensorFlow と Cloud TPU について、
                        その定義とビジネス価値を理解しましょう。
                    </p>
                </div>

                <div className={baseStyles.grid2}>
                    <div className={styles.tpuHighlight}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div style={{ fontSize: '2.5rem' }}>🔷</div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
                                    TensorFlow
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                                    End-to-End Open Source ML Framework
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeYellow}`}>オープンソース</span>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeBlue}`}>Google 開発</span>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeGreen}`}>エンドツーエンド</span>
                        </div>
                        <ul className={styles.apiList}>
                            <li>Google が開発・オープンソース化した ML フレームワーク</li>
                            <li>ML モデルの構築・学習・デプロイまでのエンドツーエンドのツールセット</li>
                            <li>Keras による高レベル API で素早くプロトタイピング可能</li>
                        </ul>
                    </div>

                    <div className={styles.tpuHighlight} style={{ background: 'linear-gradient(135deg, rgba(234, 67, 53, 0.08), rgba(251, 188, 4, 0.06))' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div style={{ fontSize: '2.5rem' }}>⚡</div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
                                    Cloud TPU
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                                    Tensor Processing Unit
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeRed}`}>Google 専有ハードウェア</span>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeYellow}`}>ML 最適化</span>
                        </div>
                        <ul className={styles.apiList}>
                            <li><strong>Google が独自設計・開発した ML 専用ハードウェア</strong></li>
                            <li>TensorFlow ワークロードとML性能に最適化されたプロセッサ</li>
                            <li>GPU と比較して ML の学習・推論を大幅に高速化</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
