import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section3.module.css';

export const Section3_AutoML: React.FC = () => {
    return (
        <div id="automl">
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>AUTOML</div>
                    <h2 className={baseStyles.sectionTitle}>
                        AutoML（ノーコード ML）<span className={baseStyles.examTag}>頻出</span>
                    </h2>
                    <p className={baseStyles.sectionDesc}>
                        ML の専門知識がなくても、自社固有データからカスタム ML モデルを構築できるサービス。
                    </p>
                </div>

                <div className={baseStyles.grid2}>
                    <div className={baseStyles.card}>
                        <div className={baseStyles.cardTitle} style={{ marginBottom: '1rem' }}>
                            AutoML の革命的な点
                        </div>
                        <div style={{ marginBottom: '1.2rem' }}>
                            <div style={{ fontSize: '1rem', color: 'var(--color-accent-red)', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ❌ 従来のカスタム ML 開発（数週間〜数ヶ月）
                            </div>
                            <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', padding: '0.8rem', background: 'rgba(234, 67, 53, 0.05)', borderRadius: '8px', fontFamily: 'var(--font-mono)' }}>
                                データ収集 → 前処理 → 特徴量エンジニアリング →<br />
                                モデル選択 → ハイパーパラメータ調整 → 評価 → デプロイ<br />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1rem', color: 'var(--color-accent-green)', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ✅ AutoML（数時間〜1日）
                            </div>
                            <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', padding: '0.8rem', background: 'rgba(52, 168, 83, 0.05)', borderRadius: '8px', fontFamily: 'var(--font-mono)' }}>
                                データをアップロード → トレーニング開始ボタン → 完成！<br />
                            </div>
                        </div>
                    </div>

                    <div className={baseStyles.card}>
                        <div className={baseStyles.cardTitle} style={{ marginBottom: '1rem' }}>
                            AutoML が自動実行すること
                        </div>
                        <ul className={baseStyles.bpList}>
                            <li>最適なモデルアーキテクチャの自動選択</li>
                            <li>ハイパーパラメータの自動チューニング（Neural Architecture Search）</li>
                            <li>データ拡張（Data Augmentation）の自動適用</li>
                            <li>クロスバリデーションによる過学習防止</li>
                            <li>モデルの評価指標（精度・AUC 等）の自動計算</li>
                            <li>REST API エンドポイントとしての自動デプロイ</li>
                        </ul>
                    </div>
                </div>

                <h3 className={baseStyles.subsectionTitle}>AutoML の種類と用途</h3>
                <div className={baseStyles.grid3}>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-blue)' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>🖼️</div>
                        <div className={baseStyles.cardTitle}>AutoML Vision</div>
                        <div className={baseStyles.cardDesc}>
                            画像の分類・物体検出・セグメンテーションモデルを構築。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeBlue}`}>画像</span>
                        </div>
                    </div>

                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-cyan)' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>📄</div>
                        <div className={baseStyles.cardTitle}>AutoML Natural Language</div>
                        <div className={baseStyles.cardDesc}>
                            業界特有の専門用語・文脈を含むテキストの分類・エンティティ抽出。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeTeal}`}>テキスト</span>
                        </div>
                    </div>

                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-green)' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>📊</div>
                        <div className={baseStyles.cardTitle}>AutoML Tables</div>
                        <div className={baseStyles.cardDesc}>
                            表形式データ（CSV）を入力とし、勾配ブースティングやディープラーニングを自動適用。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeGreen}`}>表形式</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
