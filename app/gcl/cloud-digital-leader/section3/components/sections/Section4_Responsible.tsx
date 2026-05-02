import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section4.module.css';

/**
 * Section4_Responsible: 責任ある AI の原則とGoogleの取り組みを解説するコンポーネント
 * @returns JSX.Element
 */
export const Section4_Responsible: React.FC = () => {
    return (
        <div id="responsible-section4-resp">
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>RESPONSIBLE AI</div>
                    <h2 className={baseStyles.sectionTitle}>
                        責任ある AI（Responsible AI）<span className={baseStyles.examTag}>頻出</span>
                    </h2>
                    <p className={baseStyles.sectionDesc}>
                        AI の倫理的・公平・透明な利用のための原則と Google の取り組み。
                        試験では「Google の AI 原則」と「6 つの核心原則」が重要です。
                    </p>
                </div>

                <h3 className={baseStyles.subsectionTitle}>なぜ責任ある AI が必要か</h3>
                <div className={baseStyles.grid3} style={{ marginBottom: '2rem' }}>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-red)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚖️</div>
                        <div className={baseStyles.cardTitle} style={{ fontSize: '1rem' }}>差別・偏見（Bias）</div>
                        <div className={baseStyles.cardDesc} style={{ fontSize: '1rem' }}>
                            AI が学習データに含まれる偏りを引き継ぐ。<br />
                            例：採用 AI が過去の男性偏重データから学習 → 女性応募者を不当に低評価。
                        </div>
                    </div>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-yellow)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🫧</div>
                        <div className={baseStyles.cardTitle} style={{ fontSize: '1rem' }}>
                            ハルシネーション（幻覚）
                        </div>
                        <div className={baseStyles.cardDesc} style={{ fontSize: '1rem' }}>
                            LLM が事実と異なる内容を自信を持って生成する。<br />
                            例：医療 AI が誤った治療法を提案 → 患者への危害リスク。
                        </div>
                    </div>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-purple)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
                        <div className={baseStyles.cardTitle} style={{ fontSize: '1rem' }}>プライバシー侵害</div>
                        <div className={baseStyles.cardDesc} style={{ fontSize: '1rem' }}>
                            学習データに含まれる個人情報の漏洩リスク。<br />
                            例：AI が個人情報を不適切に学習・再現してしまう。
                        </div>
                    </div>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-blue)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎭</div>
                        <div className={baseStyles.cardTitle} style={{ fontSize: '1rem' }}>不正利用・悪用</div>
                        <div className={baseStyles.cardDesc} style={{ fontSize: '1rem' }}>
                            フェイクニュース・ディープフェイク・詐欺コンテンツの大量生成。<br />
                            サイバー攻撃の自動化・強化。
                        </div>
                    </div>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-cyan)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</div>
                        <div className={baseStyles.cardTitle} style={{ fontSize: '1rem' }}>
                            透明性の欠如（ブラックボックス）
                        </div>
                        <div className={baseStyles.cardDesc} style={{ fontSize: '1rem' }}>
                            AI の判断根拠を説明できない。<br />
                            例：ローン否認・人事評価に AI を使う場合、理由を説明できない → 規制違反リスク。
                        </div>
                    </div>
                    <div className={baseStyles.card} style={{ borderLeft: '3px solid var(--color-accent-green)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
                        <div className={baseStyles.cardTitle} style={{ fontSize: '1rem' }}>アクセス格差</div>
                        <div className={baseStyles.cardDesc} style={{ fontSize: '1rem' }}>
                            AI の恩恵が特定の集団にのみ享受される。<br />
                            障害者・少数民族・低所得者が AI サービスを利用しづらい設計。
                        </div>
                    </div>
                </div>

                <h3 className={baseStyles.subsectionTitle}>
                    責任ある AI の 6 核心原則<span className={baseStyles.examTag}>最重要</span>
                </h3>
                <div className={styles.raiGrid}>
                    <div className={styles.raiCard} style={{ borderTop: '3px solid var(--color-accent-blue)' }}>
                        <div className={styles.raiIcon}>⚖️</div>
                        <div className={styles.raiName}>① 公平性（Fairness）</div>
                        <div className={styles.raiDesc}>
                            人種・性別・年齢・宗教等で差別的な出力をしない。
                            偏りを検出・排除する仕組みを設計段階から組み込む。
                            多様なデータセットと評価指標を使用してバイアスを継続的に測定する。
                        </div>
                    </div>
                    <div className={styles.raiCard} style={{ borderTop: '3px solid var(--color-accent-green)' }}>
                        <div className={styles.raiIcon}>🛡️</div>
                        <div className={styles.raiName}>② 信頼性と安全性</div>
                        <div className={styles.raiDesc}>
                            設計通りの動作をし、安全性が確保されていること。
                            誤動作・悪用を防ぐフェイルセーフ機能を組み込む。
                            継続的なテストとモニタリングで予期しない動作を防止する。
                        </div>
                    </div>
                    <div className={styles.raiCard} style={{ borderTop: '3px solid var(--color-accent-cyan)' }}>
                        <div className={styles.raiIcon}>🔐</div>
                        <div className={styles.raiName}>③ プライバシーとセキュリティ</div>
                        <div className={styles.raiDesc}>
                            個人データを最小限に収集し、適切に保護する。
                            ユーザーが自分のデータをコントロールできる仕組みを提供する。
                            データ収集の目的と範囲を透明に開示する。
                        </div>
                    </div>
                    <div className={styles.raiCard} style={{ borderTop: '3px solid var(--color-accent-yellow)' }}>
                        <div className={styles.raiIcon}>♿</div>
                        <div className={styles.raiName}>④ 包括性とアクセシビリティ</div>
                        <div className={styles.raiDesc}>
                            すべての人（障害者・少数者を含む）が等しく AI
                            の恩恵を受けられるよう設計する。
                            多様なユーザーニーズを考慮したインクルーシブな設計を実践する。
                        </div>
                    </div>
                    <div className={styles.raiCard} style={{ borderTop: '3px solid var(--color-accent-purple)' }}>
                        <div className={styles.raiIcon}>🔍</div>
                        <div className={styles.raiName}>⑤ 透明性と説明可能性（XAI）</div>
                        <div className={styles.raiDesc}>
                            AI がどのように動作するかを理解・説明できること。
                            判断の根拠を示せること（Vertex Explainable AI の活用）。 ユーザーに AI
                            が使われていることを明示する。
                        </div>
                    </div>
                    <div className={styles.raiCard} style={{ borderTop: '3px solid var(--color-accent-red)' }}>
                        <div className={styles.raiIcon}>📋</div>
                        <div className={styles.raiName}>⑥ 説明責任（Accountability）</div>
                        <div className={styles.raiDesc}>
                            AI の判断・行動に対して責任を持つ人間・組織が存在すること。
                            Human-in-the-Loop の設計で重要な決定には人間のレビューを必須化する。
                            監査可能なログと透明性レポートを維持する。
                        </div>
                    </div>
                </div>

                <div className={baseStyles.sourceBox}>
                    <div className={baseStyles.sourceTitle}>📎 参考ソース</div>
                    <div className={baseStyles.sourceLinks}>
                        <a href="https://ai.google/responsibility/principles/" target="_blank" rel="noopener noreferrer">https://ai.google/responsibility/principles/</a>
                        <a href="https://cloud.google.com/responsible-ai" target="_blank" rel="noopener noreferrer">https://cloud.google.com/responsible-ai</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
