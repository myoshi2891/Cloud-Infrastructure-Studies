import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section1.module.css';
import compareStyles from './Compare.module.css';

/**
 * Section1: AI と ML の基礎概念
 */
export const Section1: React.FC = () => {
    return (
        <section id="fundamentals" className={baseStyles.section}>
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>3.1 AI AND ML FUNDAMENTALS</div>
                    <h2 className={baseStyles.sectionTitle}>AI と ML の基礎概念</h2>
                    <p className={baseStyles.sectionDesc}>
                        AI・ML の定義から、ビジネス価値、データ品質の重要性まで。
                        試験で頻出の基礎概念を体系的に理解しましょう。
                    </p>
                </div>

                {/* HIERARCHY DIAGRAM */}
                <div className={`${styles.hierarchy} mb-8`}>
                    <div className={styles.hierarchyTitle}>AI 技術の包含関係（最重要！）</div>
                    <div className={styles.hierWrap}>
                        <div className={`${styles.hierLevel} ${styles.hlAi}`}>
                            <div className={styles.lname}>🌐 AI（人工知能 / Artificial Intelligence）</div>
                            <div className={styles.ldesc}>
                                「人間の知的行動をコンピュータで模倣する」技術の総称
                            </div>
                        </div>
                        <div className={styles.hierArrow}>▼</div>
                        <div className={`${styles.hierLevel} ${styles.hlMl}`}>
                            <div className={styles.lname}>📊 ML（機械学習 / Machine Learning）</div>
                            <div className={styles.ldesc}>
                                「データからパターンを自動学習する」— AI のサブフィールド
                            </div>
                        </div>
                        <div className={styles.hierArrow}>▼</div>
                        <div className={`${styles.hierLevel} ${styles.hlDl}`}>
                            <div className={styles.lname}>🧬 深層学習（Deep Learning）</div>
                            <div className={styles.ldesc}>
                                「多層ニューラルネットワーク」— ML のサブフィールド
                            </div>
                        </div>
                        <div className={styles.hierArrow}>▼</div>
                        <div className={`${styles.hierLevel} ${styles.hlGen}`}>
                            <div className={styles.lname}>✨ 生成 AI（Generative AI）</div>
                            <div className={styles.ldesc}>
                                「新しいコンテンツ（テキスト・画像・動画）を生成」— DL のサブセット
                            </div>
                        </div>
                        <div className={styles.hierArrow}>▼</div>
                        <div className={`${styles.hierLevel} ${styles.hlLlm}`}>
                            <div className={styles.lname}>💬 LLM（大規模言語モデル）</div>
                            <div className={styles.ldesc}>
                                「テキスト生成に特化した超大規模モデル」（例：Gemini、GPT-4）
                            </div>
                        </div>
                    </div>
                    <div className={`${baseStyles.warnBox} mt-6`}>
                        <strong>⚠️ 試験の落とし穴：</strong>
                        「生成 AI ＝ LLM」は<strong>誤り</strong>です。LLM
                        はテキスト生成専用ですが、 生成 AI
                        には画像生成（Imagen）・動画生成（Veo）・音楽生成なども含まれます。
                    </div>
                </div>

                {/* AI vs DATA ANALYTICS */}
                <h3 className={baseStyles.subsectionTitle}>
                    AI/ML とデータアナリティクスの違い<span className={baseStyles.examTag}>頻出</span>
                </h3>

                <div className={`${baseStyles.card} overflow-x-auto mb-8`}>
                    <table className={`${compareStyles.compareTable} min-w-[580px]`}>
                        <thead>
                            <tr>
                                <th scope="col">技術領域</th>
                                <th scope="col">時間的焦点</th>
                                <th scope="col">分析の性質</th>
                                <th scope="col">主な出力</th>
                                <th scope="col">ビジネス上の役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>📈 データアナリティクス / BI</td>
                                <td>過去〜現在</td>
                                <td>記述的・診断的</td>
                                <td>レポート・ダッシュボード・KPI</td>
                                <td>「何が起きたか」を人間が理解して意思決定</td>
                            </tr>
                            <tr>
                                <td>🔮 機械学習（ML）</td>
                                <td>現在〜未来</td>
                                <td>予測的</td>
                                <td>スコア・予測値・確率</td>
                                <td>「将来何が起きるか」を自動予測してプロセス自動化</td>
                            </tr>
                            <tr>
                                <td>🤖 AI / 生成 AI</td>
                                <td>未来の行動創造</td>
                                <td>処方的・生成的</td>
                                <td>自動応答・コンテンツ・エージェント行動</td>
                                <td>「どう行動すべきか」をシステムが自律判断・実行</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* BUSINESS VALUE */}
                <h3 className={baseStyles.subsectionTitle}>
                    ML がビジネスに創出する価値<span className={baseStyles.examTag}>頻出</span>
                </h3>
                <div className={`${baseStyles.grid3} mb-6`}>
                    <div className={baseStyles.card}>
                        <div className={`${baseStyles.cardIcon} bg-[var(--color-bg-secondary)]`}>🗄️</div>
                        <div className={baseStyles.cardTitle}>大規模データセットからのパターン抽出</div>
                        <div className={baseStyles.cardDesc}>
                            人間が認知できる変数の数には限界がありますが、ML
                            アルゴリズムはペタバイト規模のデータポイント間の
                            微細な相関関係を瞬時に発見し、予測モデルに変換します。
                        </div>
                    </div>
                    <div className={baseStyles.card}>
                        <div className={`${baseStyles.cardIcon} bg-[var(--color-bg-secondary)]`}>📈</div>
                        <div className={baseStyles.cardTitle}>ビジネス意思決定のスケーリング</div>
                        <div className={baseStyles.cardDesc}>
                            不正検知・商品推奨・品質管理など、数百万回のトランザクションに対するリアルタイムかつ高精度な
                            意思決定を属人的なリソースに依存せずにスケールさせます。
                        </div>
                    </div>
                    <div className={baseStyles.card}>
                        <div className={`${baseStyles.cardIcon} bg-[var(--color-bg-secondary)]`}>🔓</div>
                        <div className={baseStyles.cardTitle}>非構造化データの解放</div>
                        <div className={baseStyles.cardDesc}>
                            企業データの大部分（画像・音声・動画・テキスト）は従来の RDB
                            では分析困難でした。 ML
                            はこれらの非構造化データから文脈・意味を抽出し、新たな洞察の源泉として活用します。
                        </div>
                    </div>
                </div>

                {/* DATA QUALITY */}
                <h3 className={baseStyles.subsectionTitle}>
                    高品質データの重要性<span className={baseStyles.examTag}>頻出</span>
                </h3>
                <div className={`${baseStyles.card} bg-[var(--color-bg-secondary)] mb-8`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl">🗑️</div>
                        <div>
                            <div className="font-display text-2xl font-extrabold text-[var(--color-accent-orange)]">
                                Garbage In, Garbage Out（GIGO の法則）
                            </div>
                            <div className="text-[var(--color-text-secondary)] text-base">
                                「ゴミを入れればゴミが出る」— ML 品質はデータ品質に直結します
                            </div>
                        </div>
                    </div>
                    <div className={baseStyles.grid4}>
                        <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-2xl mb-1">📦</div>
                            <div className="text-base font-semibold mb-1">
                                十分な量
                            </div>
                            <div className="text-base text-[var(--color-text-muted)]">
                                学習データが少ないと精度が出ない
                            </div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-2xl mb-1">✅</div>
                            <div className="text-base font-semibold mb-1">
                                高品質・正確
                            </div>
                            <div className="text-base text-[var(--color-text-muted)]">
                                ノイズ・誤りが少ないデータ
                            </div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-2xl mb-1">🌍</div>
                            <div className="text-base font-semibold mb-1">
                                多様性
                            </div>
                            <div className="text-base text-[var(--color-text-muted)]">
                                バイアスを排除した多様なデータ
                            </div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-2xl mb-1">🎯</div>
                            <div className="text-base font-semibold mb-1">
                                目的との関連性
                            </div>
                            <div className="text-base text-[var(--color-text-muted)]">
                                ユースケースに関連したデータ
                            </div>
                        </div>
                    </div>
                </div>

                {/* ML APPROACHES */}
                <h3 className={baseStyles.subsectionTitle}>
                    機械学習の 3 つのアプローチ<span className={baseStyles.examTag}>頻出</span>
                </h3>
                <div className={baseStyles.grid3}>
                    <div className={styles.mlCard}>
                        <div className={`${styles.mlCardHeader} bg-[var(--color-bg-secondary)]`}>
                            <div className={`${styles.mlIcon} bg-[var(--color-bg-secondary)]`}>👨‍🏫</div>
                            <div>
                                <div className={styles.mlCardTitle}>教師あり学習</div>
                                <div className={styles.mlCardSub}>Supervised Learning</div>
                            </div>
                        </div>
                        <div className={styles.mlCardBody}>
                            <p className="text-base text-[var(--color-text-secondary)] mb-4">
                                <strong className="text-[var(--color-text-primary)]">定義：</strong>
                                正解ラベルが付いたデータを使って学習。
                                「先生（ラベル）」が「生徒（モデル）」を指導するイメージ。
                            </p>
                            <p className="text-base font-semibold mb-2 text-[var(--color-accent-blue)]">
                                タスク種別：
                            </p>
                            <ul className={`${styles.apiList} mb-4`}>
                                <li><strong>分類（Classification）</strong> — スパム判定・画像分類</li>
                                <li><strong>回帰（Regression）</strong> — 売上予測・不動産価格</li>
                            </ul>
                            <p className="text-base font-semibold mb-2 text-[var(--color-accent-blue)]">
                                ビジネス活用例：
                            </p>
                            <ul className={styles.apiList}>
                                <li>顧客の離脱（解約）予測</li>
                                <li>クレジットカード不正検知</li>
                                <li>医療画像による疾患診断支援</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.mlCard}>
                        <div className={`${styles.mlCardHeader} bg-[var(--color-bg-secondary)]`}>
                            <div className={`${styles.mlIcon} bg-[var(--color-bg-secondary)]`}>🔍</div>
                            <div>
                                <div className={styles.mlCardTitle}>教師なし学習</div>
                                <div className={styles.mlCardSub}>Unsupervised Learning</div>
                            </div>
                        </div>
                        <div className={styles.mlCardBody}>
                            <p className="text-base text-[var(--color-text-secondary)] mb-4">
                                <strong className="text-[var(--color-text-primary)]">定義：</strong>
                                ラベルなしのデータからパターン・構造を自動発見。
                                「先生」なしで生徒が自分でルールを見つけるイメージ。
                            </p>
                            <p className="text-base font-semibold mb-2 text-[var(--color-accent-cyan)]">
                                タスク種別：
                            </p>
                            <ul className={`${styles.apiList} mb-4`}>
                                <li><strong>クラスタリング</strong> — 顧客セグメント自動分類</li>
                                <li><strong>異常検知</strong> — 不正アクセス検知</li>
                            </ul>
                            <p className="text-base font-semibold mb-2 text-[var(--color-accent-cyan)]">
                                ビジネス活用例：
                            </p>
                            <ul className={styles.apiList}>
                                <li>顧客ペルソナの自動分類</li>
                                <li>レコメンドエンジン</li>
                                <li>ネットワーク侵入検知</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.mlCard}>
                        <div className={`${styles.mlCardHeader} bg-[var(--color-bg-secondary)]`}>
                            <div className={`${styles.mlIcon} bg-[var(--color-bg-secondary)]`}>🎮</div>
                            <div>
                                <div className={styles.mlCardTitle}>強化学習</div>
                                <div className={styles.mlCardSub}>Reinforcement Learning</div>
                            </div>
                        </div>
                        <div className={styles.mlCardBody}>
                            <p className="text-base text-[var(--color-text-secondary)] mb-4">
                                <strong className="text-[var(--color-text-primary)]">定義：</strong>
                                エージェントが環境と対話しながら
                                「報酬の最大化」を試行錯誤で学習。ゲーム攻略 AI のイメージ。
                            </p>
                            <p className="text-base font-semibold mb-2 text-[var(--color-accent-green)]">
                                タスク種別：
                            </p>
                            <ul className={`${styles.apiList} mb-4`}>
                                <li><strong>最適制御</strong> — ロボット制御・自動運転</li>
                                <li><strong>RLHF</strong> — 人間フィードバックによる LLM 改善</li>
                            </ul>
                            <p className="text-base font-semibold mb-2 text-[var(--color-accent-green)]">
                                ビジネス活用例：
                            </p>
                            <ul className={styles.apiList}>
                                <li>データセンターの電力最適化</li>
                                <li>Gemini モデルの品質向上（RLHF）</li>
                                <li>広告入札の自動最適化</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={baseStyles.sourceBox}>
                    <div className={baseStyles.sourceTitle}>📎 参考ソース</div>
                    <div className={baseStyles.sourceLinks}>
                        <a href="https://cloud.google.com/learn/what-is-artificial-intelligence" target="_blank" rel="noopener noreferrer">
                            Google Cloud: AI とは何か
                        </a>
                        <a href="https://developers.google.com/machine-learning/glossary/fundamentals" target="_blank" rel="noopener noreferrer">
                            Google Developers: ML 用語集 — 基礎
                        </a>
                        <a href="https://cloud.google.com/responsible-ai" target="_blank" rel="noopener noreferrer">
                            Google Cloud: 責任ある AI
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
