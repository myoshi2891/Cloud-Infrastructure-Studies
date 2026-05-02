import React from 'react';
import baseStyles from './SectionBase.module.css';

/**
 * Section0: Section 3 の全体像
 */
export const Section0: React.FC = () => {
    return (
        <section id="overview" className={baseStyles.section}>
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>EXAM OVERVIEW</div>
                    <h2 className={baseStyles.sectionTitle}>Section 3 の全体像</h2>
                    <p className={baseStyles.sectionDesc}>
                        試験ガイドに基づく出題範囲と、学習の全体像を把握しましょう。
                        本ページは公式試験ガイドに完全対応しています。
                    </p>
                </div>

                <div className={baseStyles.grid3}>
                    <div className={baseStyles.card} style={{ borderTop: '3px solid var(--color-accent-blue)' }}>
                        <div className={baseStyles.cardIcon} style={{ background: 'rgba(66, 133, 244, 0.12)' }}>🧠</div>
                        <div className={baseStyles.cardTitle}>3.1 AI と ML の基礎</div>
                        <div className={baseStyles.cardDesc}>
                            AI・ML の定義、データアナリティクスとの違い、ML が解決できる課題、
                            ビジネス価値、データ品質の重要性、説明可能・責任ある AI。
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeBlue}`}>定義と概念</span>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeTeal}`} style={{ marginLeft: '0.3rem' }}>ビジネス価値</span>
                        </div>
                    </div>

                    <div className={baseStyles.card} style={{ borderTop: '3px solid var(--color-accent-cyan)' }}>
                        <div className={baseStyles.cardIcon} style={{ background: 'rgba(0, 188, 212, 0.12)' }}>⚙️</div>
                        <div className={baseStyles.cardTitle}>3.2 Google Cloud AI/ML ソリューション</div>
                        <div className={baseStyles.cardDesc}>
                            事前学習済み API・AutoML・カスタムモデルのトレードオフ（スピード、労力、
                            差別化、必要な専門知識）と、適切なソリューションの選択。
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeTeal}`}>選択と比較</span>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeYellow}`} style={{ marginLeft: '0.3rem' }}>トレードオフ</span>
                        </div>
                    </div>

                    <div className={baseStyles.card} style={{ borderTop: '3px solid var(--color-accent-green)' }}>
                        <div className={baseStyles.cardIcon} style={{ background: 'rgba(52, 168, 83, 0.12)' }}>🏗️</div>
                        <div className={baseStyles.cardTitle}>3.3 Google Cloud AI/ML ソリューションの構築・活用</div>
                        <div className={baseStyles.cardDesc}>
                            BigQuery ML、事前学習済み API（Vision, NL, Translation, Speech）、
                            AutoML、Vertex AI、TensorFlow、Cloud TPU の詳細。
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <span className={`${baseStyles.badge} ${baseStyles.badgeGreen}`}>実装詳細</span>
                            <span className={`${baseStyles.badge} ${baseStyles.badgePurple}`} style={{ marginLeft: '0.3rem' }}>各サービス</span>
                        </div>
                    </div>
                </div>

                <div className={baseStyles.infoBox} style={{ marginTop: '2rem' }}>
                    <strong>📌 試験の重要ポイント：</strong>
                    Section 3 は試験全体の約 16% を占めます。各 Google Cloud AI サービスの
                    <strong>違いと使い分け</strong>、そして AI/ML の基礎概念の理解が特に重要です。
                </div>

                <div className={baseStyles.sourceBox}>
                    <div className={baseStyles.sourceTitle}>📎 公式ソース</div>
                    <div className={baseStyles.sourceLinks}>
                        <a href="https://services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">
                            Cloud Digital Leader Exam Guide (Official PDF) — Section 3 p.3–4
                        </a>
                        <a href="https://cloud.google.com/learn/certification/cloud-digital-leader" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/learn/certification/cloud-digital-leader
                        </a>
                    </div>
                </div>
            </div>
            
            <div className={baseStyles.sectionDivider}></div>
        </section>
    );
};