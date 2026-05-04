import React from 'react';
import baseStyles from './SectionBase.module.css';

/**
 * Section4_Patterns: よく出る問題パターンと解法を解説するコンポーネント
 * @returns JSX.Element
 */
export const Section4_Patterns: React.FC = () => {
    return (
        <div id="patterns" className="mt-12">
            <div className={baseStyles.container}>
                <h3 className={baseStyles.subsectionTitle}>
                    よく出る問題パターンと解法
                </h3>
                <div className={baseStyles.grid2}>
                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-blue)]`}>
                        <div className="font-mono text-base text-[var(--color-accent-blue)] mb-3">
                            PATTERN 01 — AI サービスの選択
                        </div>
                        <p className="text-base text-[var(--color-text-secondary)] mb-4">
                            「製造業の顧客が製品の外観不良を AI で検出したい。ML の専門知識がないが、自社固有の不良パターンがある。どのサービスが最適か？」
                        </p>
                        <div className="text-base text-[var(--color-text-muted)] mb-2">
                            考え方：
                        </div>
                        <ul className={`${baseStyles.bpList} mb-3`}>
                            <li>自社固有データが必要 → 事前学習済み API では不十分</li>
                            <li>ML 知識がない → Vertex AI（フルコード）ではない</li>
                            <li>
                                画像データ・ノーコード →
                                <strong className="text-[var(--color-accent-green)]">AutoML Vision が正解</strong>
                            </li>
                        </ul>
                        <span className={`${baseStyles.badge} ${baseStyles.badgeGreen}`}>答え：AutoML Vision</span>
                    </div>

                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-cyan)]`}>
                        <div className="font-mono text-base text-[var(--color-accent-cyan)] mb-3">
                            PATTERN 02 — BigQuery ML
                        </div>
                        <p className="text-base text-[var(--color-text-secondary)] mb-4">
                            「BigQuery にデータがあり、データアナリストが SQL で顧客の解約予測モデルを作りたい。最も効率的な方法は？」
                        </p>
                        <div className="text-base text-[var(--color-text-muted)] mb-2">
                            考え方：
                        </div>
                        <ul className={`${baseStyles.bpList} mb-3`}>
                            <li>すでに BigQuery にデータあり → データ移動不要</li>
                            <li>SQL アナリストが実行 → ML 専門知識不要</li>
                            <li>
                                →
                                <strong className="text-[var(--color-accent-green)]">BigQuery ML が最適</strong>
                            </li>
                        </ul>
                        <span className={`${baseStyles.badge} ${baseStyles.badgeTeal}`}>答え：BigQuery ML</span>
                    </div>

                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-green)]`}>
                        <div className="font-mono text-base text-[var(--color-accent-green)] mb-3">
                            PATTERN 03 — 責任ある AI
                        </div>
                        <p className="text-base text-[var(--color-text-secondary)] mb-4">
                            「採用システムに AI を導入したい。AI の判断が応募者に不当な影響を与えないよう、 どの責任ある AI の原則を最も重視すべきか？」
                        </p>
                        <div className="text-base text-[var(--color-text-muted)] mb-2">
                            考え方：
                        </div>
                        <ul className={`${baseStyles.bpList} mb-3`}>
                            <li>採用における不当な扱い → 差別・バイアスの問題</li>
                            <li>
                                人種・性別・年齢等の差別 →
                                <strong className="text-[var(--color-accent-green)]">公平性（Fairness）が正解</strong>
                            </li>
                        </ul>
                        <span className={`${baseStyles.badge} ${baseStyles.badgeGreen}`}>答え：公平性（Fairness）</span>
                    </div>

                    <div className={`${baseStyles.card} border-l-[3px] border-[var(--color-accent-yellow)]`}>
                        <div className="font-mono text-base text-[var(--color-accent-yellow)] mb-3">
                            PATTERN 04 — TensorFlow / TPU
                        </div>
                        <p className="text-base text-[var(--color-text-secondary)] mb-4">
                            「Google Cloud の Cloud TPU とは何か？」
                        </p>
                        <div className="text-base text-[var(--color-text-muted)] mb-2">
                            正解の要素：
                        </div>
                        <ul className={`${baseStyles.bpList} mb-3`}>
                            <li>
                                Google が独自設計した
                                <strong>プロプライエタリ（専有）ハードウェア</strong>
                            </li>
                            <li>TensorFlow と ML ワークロードの <strong>性能に最適化</strong></li>
                            <li>汎用 GPU とは異なり <strong>ML 専用</strong>に設計</li>
                        </ul>
                        <span className={`${baseStyles.badge} ${baseStyles.badgeYellow}`}>答え：Google 専有の ML 最適化ハードウェア</span>
                    </div>
                </div>

                <h3 className={baseStyles.subsectionTitle}>混同しやすいポイントの整理</h3>
                <div className={`${baseStyles.card} overflow-x-auto`}>
                    <table className="w-full min-w-[560px] text-left border-collapse">
                        <thead>
                            <tr>
                                <th scope="col" className="p-4 border-b-2 border-[var(--color-border)]">混同パターン</th>
                                <th scope="col" className="p-4 border-b-2 border-[var(--color-border)]">✅ 正しい理解</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">生成 AI ＝ LLM</td>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">LLM はテキスト生成専門。生成 AI は画像・動画・音声なども含む広い概念</td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">AutoML ＝ Vertex AI</td>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">AutoML はノーコードの ML 構築ツール、Vertex AI はフル機能の ML プラットフォーム（AutoML を内包）</td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">TensorFlow ＝ Cloud TPU</td>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">TensorFlow はソフトウェアフレームワーク、Cloud TPU は ML 専用ハードウェア（別の概念）</td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">AI ＝ ML</td>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">ML は AI のサブフィールド。AI ⊃ ML（AI の方が広い概念）</td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">BigQuery ML ＝ Vertex AI</td>
                                <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">BigQuery ML は SQL でデータ移動なしに ML を実行、Vertex AI はフル ML ライフサイクル管理</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[var(--color-text-secondary)]">教師なし学習 ＝ 正解不要</td>
                                <td className="p-4 text-[var(--color-text-secondary)]">正解ラベルが不要なだけで、データ品質・量は同様に重要。クラスタリング等でパターンを自動発見</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
