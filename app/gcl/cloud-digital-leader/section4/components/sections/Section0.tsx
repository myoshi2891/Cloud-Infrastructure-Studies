import React from 'react';
import styles from './Section0.module.css';
import { TableComponent } from '../TableComponent';
import { MIGRATION_STRATEGIES } from '../../constants';

const BADGE_CLASS_MAP = {
    badgeG: styles.badgeG,
    badgeA: styles.badgeA,
    badgeR: styles.badgeR,
} as const;

/**
 * Section0 コンポーネント
 * 
 * Cloud Digital Leader のセクションコンテンツを表示します。
 * 
 * @returns {JSX.Element} Section0 の JSX
 */
export const Section0 = () => {
    return (
        <>
            <section id="overview" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>Section 4 Overview</div>
                        <h2 className={styles.shTitle}>Section 4 の全体像と学習ポイント</h2>
                        <p className={styles.shDesc}>
                            試験ガイドに基づく出題範囲と、モダナイゼーションがなぜビジネスに不可欠かを理解しましょう。
                        </p>
                    </div>

                    <div className={styles.g3}>
                        <div className={`${styles.card} ${styles.borderRed}`}>
                            <div className={`${styles.cardIcon} ${styles.bgRed}`} aria-hidden="true">🏗️</div>
                            <div className={styles.cardTitle}>4.1 クラウドのモダナイゼーションと移行</div>
                            <div className={styles.cardBody}>
                                7つのR移行戦略・CAMP フレームワーク・ワークロードの評価と分類。Rehost /
                                Replatform / Refactor の違いが頻出。
                            </div>
                            <div className={styles.cardBadge}>
                                <span className={`${styles.badge} ${styles.badgeR}`}>移行戦略</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderGreen}`}>
                            <div className={`${styles.cardIcon} ${styles.bgGreen}`} aria-hidden="true">⚙️</div>
                            <div className={styles.cardTitle}>4.2 クラウドにおけるコンピューティング</div>
                            <div className={styles.cardBody}>
                                Compute Engine・GKE・Cloud Run・App Engine・Cloud Functions
                                の選択基準と使い分け。Spot VM のコスト最適化も必須。
                            </div>
                            <div className={styles.cardBadge}>
                                <span className={`${styles.badge} ${styles.badgeG}`}>サービス選択</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderBlue}`}>
                            <div className={`${styles.cardIcon} ${styles.bgBlue}`} aria-hidden="true">📦</div>
                            <div className={styles.cardTitle}>4.3 コンテナとオーケストレーション</div>
                            <div className={styles.cardBody}>
                                VM とコンテナの違い・Kubernetes の概念・GKE Autopilot vs Standard
                                の使い分け。マイクロサービスのビジネス価値。
                            </div>
                            <div className={styles.cardBadge}>
                                <span className={`${styles.badge} ${styles.badgeB}`}>コンテナ</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderYellow}`}>
                            <div className={`${styles.cardIcon} ${styles.bgYellow}`} aria-hidden="true">🌐</div>
                            <div className={styles.cardTitle}>4.4 API の戦略的価値</div>
                            <div className={styles.cardBody}>
                                Apigee API Management
                                による収益化・セキュリティ・レガシーシステムの抽象化。エコシステム構築の考え方。
                            </div>
                            <div className={styles.cardBadge}>
                                <span className={`${styles.badge} ${styles.badgeA}`}>API管理</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderPurple}`}>
                            <div className={`${styles.cardIcon} ${styles.bgPurple}`} aria-hidden="true">☁️</div>
                            <div className={styles.cardTitle}>4.5 ハイブリッド＆マルチクラウド</div>
                            <div className={styles.cardBody}>
                                GKE
                                Enterprise（旧Anthos）による統合管理・複数クラウドを選ぶビジネス上の理由・オンプレとクラウドの接続方法。
                            </div>
                            <div className={styles.cardBadge}>
                                <span className={`${styles.badge} ${styles.badgeP}`}>ハイブリッド</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderRed}`}>
                            <div className={`${styles.cardIcon} ${styles.bgRed}`} aria-hidden="true">🔄</div>
                            <div className={styles.cardTitle}>4.6 SRE と DevOps の原則</div>
                            <div className={styles.cardBody}>
                                DevOps 文化・CI/CD パイプライン・SLO/SLA/SLI
                                の概念・エラーバジェット・DORA メトリクスの理解。
                            </div>
                            <div className={styles.cardBadge}>
                                <span className={`${styles.badge} ${styles.badgeR}`}>DevOps</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.info} style={{ marginTop: '2rem' }}>
                        <strong>📌 試験の重要ポイント：</strong>
                        Section 4 は試験全体の約 17% を占めます。
                        <strong>「なぜそのサービスを選ぶのか」という選択の根拠</strong>と、
                        <strong>移行戦略の各手法（7つのR）の違い</strong>が特に重要です。
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 公式ソース</div>
                        <a href="https://services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">
                            Cloud Digital Leader Exam Guide (Official PDF)
                        </a>
                        <a href="https://cloud.google.com/learn/certification/cloud-digital-leader" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/learn/certification/cloud-digital-leader
                        </a>
                    </div>
                </div>
            </section>

            <section id="migration" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.1 Migration Strategy</div>
                        <h2 className={styles.shTitle}>クラウドのモダナイゼーションと移行戦略</h2>
                        <p className={styles.shDesc}>
                            7つのR・CAMP フレームワーク・移行の判断基準を体系的に理解しましょう。
                        </p>
                    </div>

                    {/* WHY MODERNIZE */}
                    <div className={styles.subTitle}>なぜモダナイゼーションが必要か</div>
                    <div className={styles.g3} style={{ marginBottom: '2rem' }}>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgRed}`} aria-hidden="true">🐢</div>
                            <div className={styles.cardTitle}>俊敏性の欠如</div>
                            <div className={styles.cardBody}>
                                新機能リリースに数ヶ月かかり、ビジネスチャンスを逃す。テスト・デプロイが手動で時間がかかる。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgYellow}`} aria-hidden="true">📈</div>
                            <div className={styles.cardTitle}>スケーラビリティの限界</div>
                            <div className={styles.cardBody}>
                                トラフィック増加に対応できずサービス停止。ハードウェアの調達期間が必要で機動力がない。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgGreen}`} aria-hidden="true">💰</div>
                            <div className={styles.cardTitle}>高い運用コスト</div>
                            <div className={styles.cardBody}>
                                老朽インフラのメンテナンスに多大なリソース。使っていないサーバーの維持費も固定コストとして発生。
                            </div>
                        </div>
                    </div>

                    {/* 7 Rs */}
                    <div className={styles.subTitle}>
                        7つのR移行戦略<span className={styles.examTag}>最重要</span>
                    </div>
                    <div className={styles.rsTableWrap}>
                        <TableComponent getRowKey={(row, i) => i}
                            headers={['戦略名', '別名', '内容', 'コード変更', '適用ケース']}
                            rows={MIGRATION_STRATEGIES}
                            renderRow={(row, i) => (
                                <tr key={i}>
                                    <td>{row.name}</td>
                                    <td>{row.alias}</td>
                                    <td>{row.desc}</td>
                                    <td><span className={`${styles.badge} ${BADGE_CLASS_MAP[row.codeChangeClass]}`}>{row.codeChange}</span></td>
                                    <td>{row.useCase}</td>
                                </tr>
                            )}
                        />
                    </div>

                    <div className={styles.warn}>
                        <strong>⚠️ 試験頻出の違い：</strong>
                        「<strong>Retain（保持）</strong>」はデータ主権や規制上の理由でクラウドに移行できない場合に
                        <em>意図的にオンプレに残す</em>戦略です。「諦め」ではなく戦略的な選択です。
                        一方「<strong>Retire（廃止）</strong>」は価値がないシステムを削除することでコスト削減する積極的な手法です。
                    </div>

                    {/* CAMP */}
                    <div className={styles.subTitle}>CAMP（Cloud Application Modernization Program）</div>
                    <div className={styles.g2}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle} style={{ marginBottom: '1.2rem' }}>
                                CAMP の 4 フェーズ
                            </div>
                            <div className={styles.steps}>
                                <div className={styles.step}>
                                    <div className={styles.stepN} aria-hidden="true">1</div>
                                    <div>
                                        <div className={styles.stepH}>評価（Assess）</div>
                                        <div className={styles.stepP}>
                                            StratoZone・CAST・mFit・migVisor などのツールで IT
                                            資産を自動ディスカバリし、クラウド適合性を分析する。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.stepN} aria-hidden="true">2</div>
                                    <div>
                                        <div className={styles.stepH}>分析（Analyze）</div>
                                        <div className={styles.stepP}>
                                            依存関係・ビジネス価値・技術的負債を評価し、各ワークロードへの最適な移行戦略（7つのR）を決定する。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.stepN} aria-hidden="true">3</div>
                                    <div>
                                        <div className={styles.stepH}>計画と実行（Plan & Execute）</div>
                                        <div className={styles.stepP}>
                                            優先度に基づいた段階的な移行。ビッグバンではなく小さなウェーブで反復的に実施し、リスクを最小化する。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.stepN} aria-hidden="true">4</div>
                                    <div>
                                        <div className={styles.stepH}>測定と反復（Measure & Iterate）</div>
                                        <div className={styles.stepP}>
                                            DORA
                                            メトリクスなどで効果を測定し、継続的に改善サイクルを回す。モダナイゼーションは一度で終わらない。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.hlBox} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.hlBoxTitle}>🎯 モダナイゼーションの 3 段階</div>
                                <p className={styles.hlBoxText}>
                                    <strong className={styles.hlBoxTextStrong}>Stage 1 — リフト＆シフト：</strong>オンプレ VM をそのままクラウドへ。最速・最低リスク。
                                </p>
                                <p className={styles.hlBoxText}>
                                    <strong className={styles.hlBoxTextStrong}>Stage 2 — クラウド最適化：</strong>マネージドサービス・コンテナ化・オートスケーリングを活用。
                                </p>
                                <p className={styles.hlBoxText} style={{ marginBottom: 0 }}>
                                    <strong className={styles.hlBoxTextStrong}>Stage 3 — クラウドネイティブ：</strong>マイクロサービス・サーバーレス・DevOps・CI/CD で最大の価値。
                                </p>
                            </div>
                            <div className={styles.bp}>
                                <div className={styles.bpTitle}>✅ ベストプラクティス：移行戦略の選択</div>
                                <ul>
                                    <li>
                                        まず Stage 1（Rehost）で素早くクラウドへ移行し Quick Win
                                        を獲得する。
                                    </li>
                                    <li>
                                        ビジネス価値の高いシステムから優先的に Stage
                                        3（クラウドネイティブ）へ移行する。
                                    </li>
                                    <li>
                                        移行前に必ず
                                        Retire（廃止）できるシステムを特定してコストを削減する。
                                    </li>
                                    <li>
                                        データ主権・規制上の制約があるシステムは Retain
                                        戦略を明示的に採用する。
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/learn/cloud-migration" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/learn/cloud-migration
                        </a>
                        <a href="https://services.google.com/fh/files/misc/cloud_application_modernization_program_whitepaper.pdf" target="_blank" rel="noopener noreferrer">
                            https://services.google.com/fh/files/misc/cloud_application_modernization_program_whitepaper.pdf
                        </a>
                        <a href="https://docs.cloud.google.com/architecture/migration-to-gcp-getting-started" target="_blank" rel="noopener noreferrer">
                            https://docs.cloud.google.com/architecture/migration-to-gcp-getting-started
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};
