import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section3.module.css';

/**
 * Section3_AutoML: AutoML の概要と特長を解説するコンポーネント
 * @returns JSX.Element
 */
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
                        <div className={`${baseStyles.cardTitle} mb-4`}>
                            AutoML の革命的な点
                        </div>
                        <div className="mb-5">
                            <div className="text-base text-[var(--color-accent-red)] font-bold mb-2">
                                ❌ 従来のカスタム ML 開発（数週間〜数ヶ月）
                            </div>
                            <div className="text-base text-[var(--color-text-secondary)] p-3 bg-[var(--color-bg-secondary)] rounded-lg font-mono">
                                データ収集 → 前処理 → 特徴量エンジニアリング →<br />
                                モデル選択 → ハイパーパラメータ調整 → 評価 → デプロイ<br />
                            </div>
                        </div>
                        <div>
                            <div className="text-base text-[var(--color-accent-green)] font-bold mb-2">
                                ✅ AutoML（数時間〜1日）
                            </div>
                            <div className="text-base text-[var(--color-text-secondary)] p-3 bg-[var(--color-bg-secondary)] rounded-lg font-mono">
                                データをアップロード → トレーニング開始ボタン → 完成！<br />
                            </div>
                        </div>
                    </div>

                    <div className={baseStyles.card}>
                        <div className={`${baseStyles.cardTitle} mb-4`}>
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
                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-blue)]`}>
                        <div className="text-[1.8rem] mb-3">🖼️</div>
                        <div className={baseStyles.cardTitle}>AutoML Vision</div>
                        <div className={baseStyles.cardDesc}>
                            画像の分類・物体検出・セグメンテーションモデルを構築。
                        </div>
                        <div className="mt-3">
                            <span className={`${baseStyles.badge} ${baseStyles.badgeBlue}`}>画像</span>
                        </div>
                    </div>

                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-cyan)]`}>
                        <div className="text-[1.8rem] mb-3">📄</div>
                        <div className={baseStyles.cardTitle}>AutoML Natural Language</div>
                        <div className={baseStyles.cardDesc}>
                            業界特有の専門用語・文脈を含むテキストの分類・エンティティ抽出。
                        </div>
                        <div className="mt-3">
                            <span className={`${baseStyles.badge} ${baseStyles.badgeTeal}`}>テキスト</span>
                        </div>
                    </div>

                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-green)]`}>
                        <div className="text-[1.8rem] mb-3">📊</div>
                        <div className={baseStyles.cardTitle}>AutoML Tables</div>
                        <div className={baseStyles.cardDesc}>
                            表形式データ（CSV）を入力とし、勾配ブースティングやディープラーニングを自動適用。
                        </div>
                        <div className="mt-3">
                            <span className={`${baseStyles.badge} ${baseStyles.badgeGreen}`}>表形式</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
