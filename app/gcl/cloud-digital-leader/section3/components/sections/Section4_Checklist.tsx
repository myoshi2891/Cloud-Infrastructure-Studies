import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section4.module.css';

/**
 * Section4_Checklist: Section 3 試験対策のチェックリストコンポーネント
 * @returns JSX.Element
 */
export const Section4_Checklist: React.FC = () => {
    return (
        <div id="checklist">
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>EXAM PREPARATION</div>
                    <h2 className={baseStyles.sectionTitle}>試験直前チェックリスト</h2>
                    <p className={baseStyles.sectionDesc}>
                        CDL 試験 Section 3 の頻出ポイントを確認しましょう。
                        すべての項目を自分の言葉で説明できるかどうかがポイントです。
                    </p>
                </div>

                <div className={baseStyles.grid2}>
                    <div>
                        <h3 className={`${baseStyles.subsectionTitle} mt-0`}>3.1 AI/ML 基礎</h3>
                        <ul className={styles.checklist}>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                AI ⊃ ML ⊃ 深層学習 ⊃ 生成 AI ⊃ LLM の包含関係を図で説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                「生成 AI ≠ LLM」の違いを具体例で説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                AI/ML とデータアナリティクス・BI の時間的焦点の違いを説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                ML がビジネスに創出する 3
                                つの価値（大規模データ・スケーリング・非構造化データ）を説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                GIGO の法則と高品質データの 4 つの条件を説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                教師あり・教師なし・強化学習の定義と具体例を言える
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                責任ある AI の 6 原則をすべて列挙できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                ハルシネーションの定義と主な対策方法を説明できる
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={`${baseStyles.subsectionTitle} mt-0`}>
                            3.2 ソリューション選択
                        </h3>
                        <ul className={styles.checklist}>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                4
                                つのトレードオフ要因（スピード・労力・差別化・専門知識）を比較できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                「事前学習済み API → AutoML → Vertex AI」の選択基準を説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                「自社独自データが必要か」「ML
                                専門知識があるか」でどのサービスを選ぶかを即答できる
                            </li>
                        </ul>

                        <h3 className={baseStyles.subsectionTitle}>3.3 各サービスの詳細</h3>
                        <ul className={styles.checklist}>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                Vision / NL / Translation / Speech-to-Text / Text-to-Speech API
                                の用途を言える
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                AutoML
                                の「ノーコードでカスタムモデルを構築できる」点を具体例で説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                BigQuery ML が「SQL でデータ移動なしに ML
                                を実行できる」点を説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                Vertex AI
                                がビジネス差別化のために「フル制御のカスタムモデル」を可能にする点を説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                TensorFlow が「エンドツーエンドのオープンソース ML
                                ツールセット」であることを説明できる
                            </li>
                            <li className={styles.checkItem}>
                                <span className={styles.checkBox} aria-hidden="true">✓</span>
                                Cloud TPU が「Google 専有・TensorFlow と ML
                                に最適化されたハードウェア」であることを説明できる
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
