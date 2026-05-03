import React from 'react';
import styles from './Section4.module.css';

/**
 * Section4 コンポーネント
 * 
 * Cloud Digital Leader のセクションコンテンツを表示します。
 * 
 * @returns {JSX.Element} Section4 の JSX
 */
export const Section4 = () => {
    return (
        <>
            <section id="cost" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>Cost Optimization</div>
                        <h2 className={styles.shTitle}>コスト最適化の実践（FinOps）</h2>
                        <p className={styles.shDesc}>
                            クラウドコストを可視化・最適化・継続管理するためのツールとベストプラクティス。
                        </p>
                    </div>

                    <div className={styles.g4} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgRed}`} aria-hidden="true">🎯</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>適切なサービス選択</div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                IaaS より
                                PaaS・サーバーレスでインフラ管理コストを削減。適切なマシンタイプで過剰スペックを回避。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgGreen}`} aria-hidden="true">📏</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>適切なサイジング</div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                Recommender
                                が実際の使用量を分析して最適化提案を自動表示。過剰プロビジョニングを解消する。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgBlue}`} aria-hidden="true">📈</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>
                                需要に合わせたスケーリング
                            </div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                オートスケーリングで使用量に応じて増減。開発 VM は夜間・週末に Instance
                                Schedules で自動停止。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.bgYellow}`} aria-hidden="true">💳</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>最適な価格モデル</div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                CUD（最大57%割引）・Spot
                                VM（最大91%割引）・SUD（自動適用・最大30%）を組み合わせる。
                            </div>
                        </div>
                    </div>

                    <div className={styles.warn}>
                        <strong>⚠️ FinOps の重要性：</strong>
                        クラウドコストの管理は IT 部門だけの問題ではありません。FinOps（Finance +
                        DevOps）では、
                        <strong>技術・財務・ビジネスチームが共同でクラウドコストを管理する文化</strong>を醸成します。
                        すべてのリソースにラベル（env・team・cost-center）を付与し、BigQuery
                        でチーム別コストを可視化することが基本です。
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/cost-management/docs/best-practices" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/cost-management/docs/best-practices
                        </a>
                        <a href="https://cloud.google.com/recommender/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/recommender/docs
                        </a>
                    </div>
                </div>
            </section>

            <section id="checklist" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>Exam Preparation</div>
                        <h2 className={styles.shTitle}>試験直前チェックリスト＆頻出パターン</h2>
                        <p className={styles.shDesc}>
                            CDL 試験 Section 4
                            の重要ポイントを確認し、頻出問題パターンで理解を深めましょう。
                        </p>
                    </div>

                    {/* CHECKLIST */}
                    <div className={styles.subTitle}>Section 4 チェックリスト</div>
                    <div className={styles.g2} style={{ marginBottom: '2.5rem' }}>
                        <div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                    fontSize: '1rem',
                                    color: 'var(--cdl-red)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                移行戦略・モダナイゼーション
                            </div>
                            <div className={styles.checklist} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    7つのR（Rehost/Replatform/Refactor/Rebuild/Repurchase/Retire/Retain）を具体例で説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Retain（保持）とRetire（廃止）の違いを明確に説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    「Lift & Shift ＝ Rehost」と「Move and Improve ＝
                                    Refactor」の対応関係を理解している
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    CAMP フレームワークの 4 フェーズを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    モダナイゼーションの 3 段階（Stage 1-3）を説明できる
                                </div>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                    fontSize: '1rem',
                                    color: 'var(--cdl-red)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                コンピューティング
                            </div>
                            <div className={styles.checklist}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    コンピューティングサービス選択のデシジョンツリーを即答できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    VM とコンテナの違いをビジネス価値を含めて説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    GKE Autopilot vs Standard の使い分け（GPU
                                    が必要→Standard）を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Spot VM が「最大 91%
                                    割引・中断可能ワークロード向け」であることを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Cloud Run と Cloud Functions の違いと使い分けを説明できる
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                    fontSize: '1rem',
                                    color: 'var(--cdl-red)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                ネットワーク・ハイブリッド
                            </div>
                            <div className={styles.checklist} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Cloud VPN（安価・インターネット経由）と Cloud
                                    Interconnect（専用線・高コスト）の選択基準を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Shared VPC の目的（ネットワーク中央集権化）を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    GKE Enterprise（旧
                                    Anthos）がマルチクラウドを「単一の管理画面」で統合管理することを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    マルチクラウドを選ぶ 3
                                    つのビジネス理由（ロックイン回避・データ主権・投資保護）を説明できる
                                </div>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                    fontSize: '1rem',
                                    color: 'var(--cdl-red)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                DevOps / SRE / API
                            </div>
                            <div className={styles.checklist}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    CI/CD パイプライン（Cloud Build → Artifact Registry → Cloud
                                    Deploy）を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    SLI・SLO・SLA・エラーバジェットの違いを説明できる（SLA &lt; SLO
                                    の関係）
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    DORA の 4 つのメトリクスを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Apigee がレガシーシステムの「API
                                    ファサード」として機能することを説明できる
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXAM PATTERNS */}
                    <div className={styles.subTitle}>頻出問題パターンと解法</div>
                    <div className={styles.g2}>
                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>01</div>
                                <div className={styles.ptnTitle}>コンピューティングサービスの選択</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「急激なトラフィックの増減があるモバイルアプリの API
                                    バックエンドを構築したい。Node.js
                                    コンテナで開発。インフラ管理工数を最小化したい。」
                                </div>
                                <div className={styles.ptnAns}>
                                    <ol>
                                        <li>Node.js コンテナ → コンテナサービスを使用</li>
                                        <li>インフラ管理を最小化 → サーバーレス</li>
                                        <li>
                                            HTTP API + 急激な増減 → Cloud Run の 0〜N スケーリングが最適
                                        </li>
                                    </ol>
                                </div>
                                <div className={styles.ptnResult} style={{ color: '#8fbc8f' }}>答え：Cloud Run（サーバーレスコンテナ）</div>
                            </div>
                        </div>

                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>02</div>
                                <div className={styles.ptnTitle}>ハイブリッド接続の選択</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「金融機関が基幹システム（オンプレ）と Google Cloud
                                    の分析基盤を接続したい。1日に数十 TB
                                    のデータを転送。低レイテンシ・高帯域・安定性が必要。」
                                </div>
                                <div className={styles.ptnAns}>
                                    <ol>
                                        <li>大量データ（数十 TB）→ 高帯域が必要</li>
                                        <li>低レイテンシ・安定性 → インターネット経由は不適切</li>
                                        <li>物理専用線 → Dedicated Interconnect が正解</li>
                                    </ol>
                                </div>
                                <div className={styles.ptnResult} style={{ color: '#8fbc8f' }}>答え：Dedicated Interconnect</div>
                            </div>
                        </div>

                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>03</div>
                                <div className={styles.ptnTitle}>移行戦略の選択</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「オンプレの PostgreSQL
                                    データベースをクラウドへ移行したい。アーキテクチャはそのままで、OS
                                    やパッチ管理の運用負荷を削減したい。」
                                </div>
                                <div className={styles.ptnAns}>
                                    <ol>
                                        <li>アーキテクチャはそのまま → 大規模なコード変更なし</li>
                                        <li>マネージドサービスへの置き換え → Cloud SQL</li>
                                        <li>運用負荷削減 = Replatform（一部最適化）</li>
                                    </ol>
                                </div>
                                <div className={styles.ptnResult} style={{ color: '#8fbc8f' }}>答え：Replatform（Lift & Optimize）</div>
                            </div>
                        </div>

                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>04</div>
                                <div className={styles.ptnTitle}>GKE モードの選択</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「ML エンジニアチームが GPU を使ったモデル学習ジョブを GKE
                                    で実行したい。GPU ノードプールの設定を細かく制御する必要がある。」
                                </div>
                                <div className={styles.ptnAns}>
                                    <ol>
                                        <li>GPU ノードが必要 → 特殊なノード設定が必要</li>
                                        <li>細かいノード制御 → Autopilot では制限がある</li>
                                        <li>カスタムノードプール管理 → Standard が必要</li>
                                    </ol>
                                </div>
                                <div className={styles.ptnResult} style={{ color: '#8fbc8f' }}>答え：GKE Standard（細粒度制御）</div>
                            </div>
                        </div>
                    </div>

                    {/* CONFUSION TABLE */}
                    <div className={styles.subTitle} style={{ marginTop: '3rem' }}>混同しやすいポイントの整理</div>
                    <div className={styles.cmpWrap}>
                        <table className={styles.cmpTable}>
                            <thead>
                                <tr>
                                    <th scope="col">混同パターン</th>
                                    <th scope="col">✅ 正しい理解</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud Run = Cloud Functions</td>
                                    <td>
                                        Cloud Run はコンテナ化されたアプリ全体、Cloud Functions
                                        はイベント駆動の関数（コード片）。HTTP API → Cloud
                                        Run、ファイルアップロード処理 → Cloud Functions
                                    </td>
                                </tr>
                                <tr>
                                    <td>Autopilot = サーバーレス</td>
                                    <td>
                                        Autopilot はノード管理を Google に委任するが Kubernetes
                                        を使用。Cloud Run がサーバーレス。Autopilot
                                        はコンテナを常時稼働できる
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cloud VPN = Cloud Interconnect</td>
                                    <td>
                                        VPN はインターネット経由（安価・低帯域）、Interconnect
                                        は物理専用線（高コスト・高帯域・低レイテンシ）。大量データ・低レイテンシ
                                        → Interconnect
                                    </td>
                                </tr>
                                <tr>
                                    <td>Anthos = GKE</td>
                                    <td>
                                        GKE は Google Cloud 上の Kubernetes サービス。Anthos（GKE
                                        Enterprise）はオンプレ・AWS・Azure
                                        も含む多環境を統合管理するプラットフォーム
                                    </td>
                                </tr>
                                <tr>
                                    <td>SLO = SLA</td>
                                    <td>
                                        SLO は組織内目標（高い）、SLA はユーザーへの契約（SLO
                                        より低く設定）。SLA を破ると返金等のペナルティが発生する
                                    </td>
                                </tr>
                                <tr>
                                    <td>Retire（廃止）= Retain（保持）</td>
                                    <td>
                                        Retire はビジネス価値のないシステムを削除してコスト削減。Retain
                                        はデータ主権・規制上の理由で意図的にオンプレに残す戦略的選択
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rehost = Refactor</td>
                                    <td>
                                        Rehost（Lift &
                                        Shift）はコード変更なしのそのまま移行。Refactor（Move &
                                        Improve）はクラウドネイティブになるようアーキテクチャを再設計する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};
