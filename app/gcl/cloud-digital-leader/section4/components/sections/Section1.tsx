import React from 'react';
import styles from './Section1.module.css';
import { TableComponent } from '../TableComponent';

const COMPUTE_COMPARISON = [
    { service: '🖥️ Compute Engine', abstraction: 'IaaS（VM）', management: '高（OS管理必要）', scaling: '手動＋MIG', billing: 'VM稼働時間（秒単位）', usage: 'レガシー移行・GPU・特殊OS' },
    { service: '☸️ GKE Standard', abstraction: 'CaaS（コンテナ）', management: '中（ノード管理）', scaling: 'Kubernetes自動', billing: 'ノードVM+管理プレーン', usage: '複雑なマイクロサービス・GPU ML' },
    { service: '🤖 GKE Autopilot', abstraction: 'CaaS（マネージド）', management: '低（Google管理）', scaling: 'Kubernetes自動', billing: 'Pod リソース単位', usage: 'K8s を楽に使いたい・小規模チーム' },
    { service: '🚀 Cloud Run', abstraction: 'サーバーレスコンテナ', management: '最低', scaling: '自動（0〜N）', billing: 'リクエスト処理時のみ', usage: 'HTTP API・Web アプリ・マイクロサービス' },
    { service: '⚡ Cloud Run Functions', abstraction: 'FaaS（関数）', management: '最低', scaling: '自動（0〜N）', billing: '実行時のみ完全従量課金', usage: 'イベント処理・Webhook・軽量タスク' },
    { service: '📱 App Engine', abstraction: 'PaaS', management: '低', scaling: '自動', billing: 'インスタンス稼働時間', usage: '既存Webアプリ・モバイルバックエンド' },
];

export const Section1 = () => {
    return (
        <>
            <section id="compute" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.2 Computing Options</div>
                        <h2 className={styles.shTitle}>
                            コンピューティングサービスの選択<span className={styles.examTag}>最重要</span>
                        </h2>
                        <p className={styles.shDesc}>
                            制御要件・アーキテクチャ構造・チームのスキルセットに基づいて最適なサービスを選択します。
                        </p>
                    </div>

                    {/* DECISION FLOW */}
                    <div className={styles.subTitle}>コンピューティング選択デシジョンツリー</div>
                    <div className={styles.flowWrap} style={{ marginBottom: '2rem' }}>
                        <div
                            style={{
                                fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.4)',
                                marginBottom: '1.2rem',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            意思決定フロー
                        </div>

                        <div className={styles.flowRow}>
                            <div className={styles.flowQ}>OS・カーネルレベルの完全制御が必要？</div>
                            <div className={styles.flowArrow}>→ YES →</div>
                            <div className={styles.flowAns}>Compute Engine (IaaS VM)</div>
                        </div>

                        <div className={styles.flowRow}>
                            <div
                                style={{
                                    width: '180px',
                                    textAlign: 'right',
                                    color: 'rgba(255, 255, 255, 0.35)',
                                    fontSize: '1rem',
                                    paddingRight: '0.5rem',
                                }}
                            >
                                ↓ NO
                            </div>
                        </div>

                        <div className={styles.flowRow}>
                            <div className={styles.flowQ}>
                                コンテナ化 + Kubernetes オーケストレーションが必要？
                            </div>
                            <div className={styles.flowArrow}>→ YES →</div>
                            <div className={`${styles.flowAns} ${styles.flowAnsSky}`}>GKE（Standard / Autopilot）</div>
                        </div>

                        <div className={styles.flowRow}>
                            <div
                                style={{
                                    width: '280px',
                                    textAlign: 'right',
                                    color: 'rgba(255, 255, 255, 0.35)',
                                    fontSize: '1rem',
                                    paddingRight: '0.5rem',
                                }}
                            >
                                ↓ NO
                            </div>
                        </div>

                        <div className={styles.flowRow}>
                            <div className={styles.flowQ}>コンテナ化済み HTTP アプリを手軽にデプロイしたい？</div>
                            <div className={styles.flowArrow}>→ YES →</div>
                            <div className={`${styles.flowAns} ${styles.flowAnsSage}`}>Cloud Run（サーバーレスコンテナ）</div>
                        </div>

                        <div className={styles.flowRow}>
                            <div
                                style={{
                                    width: '320px',
                                    textAlign: 'right',
                                    color: 'rgba(255, 255, 255, 0.35)',
                                    fontSize: '1rem',
                                    paddingRight: '0.5rem',
                                }}
                            >
                                ↓ NO
                            </div>
                        </div>

                        <div className={styles.flowRow}>
                            <div className={styles.flowQ}>イベント駆動の小さな関数（単一処理）を実行したい？</div>
                            <div className={styles.flowArrow}>→ YES →</div>
                            <div className={`${styles.flowAns} ${styles.flowAnsAmber}`}>Cloud Run Functions（FaaS）</div>
                        </div>

                        <div className={styles.flowRow}>
                            <div
                                style={{
                                    width: '360px',
                                    textAlign: 'right',
                                    color: 'rgba(255, 255, 255, 0.35)',
                                    fontSize: '1rem',
                                    paddingRight: '0.5rem',
                                }}
                            >
                                ↓ それ以外
                            </div>
                        </div>

                        <div className={styles.flowRow}>
                            <div className={`${styles.flowAns} ${styles.flowAnsPlum}`}>App Engine（PaaS Webアプリ）</div>
                        </div>
                    </div>

                    {/* COMPUTE COMPARISON */}
                    <div className={styles.subTitle}>コンピューティングサービス比較表</div>
                    <div className={styles.cmpWrap} style={{ marginBottom: '2rem' }}>
                        <TableComponent
                            headers={['サービス', '抽象化レベル', '管理負荷', 'スケーリング', '課金モデル', '主な用途']}
                            rows={COMPUTE_COMPARISON}
                            renderRow={(row, i) => (
                                <tr key={i}>
                                    <td>{row.service}</td>
                                    <td>{row.abstraction}</td>
                                    <td>{row.management}</td>
                                    <td>{row.scaling}</td>
                                    <td>{row.billing}</td>
                                    <td>{row.usage}</td>
                                </tr>
                            )}
                        />
                    </div>

                    {/* SPOT VM */}
                    <div className={styles.subTitle}>
                        Spot VM によるコスト最適化<span className={styles.examTag}>頻出</span>
                    </div>
                    <div className={styles.spotHl} style={{ marginBottom: '1.5rem' }}>
                        <div className={`${styles.spotCol} ${styles.spotColOld}`}>
                            <div className={styles.spotColTitle}>❌ Preemptible VM（非推奨・旧方式）</div>
                            <ul>
                                <li>最大 24 時間で強制終了される</li>
                                <li>Google がリソース必要時に 30 秒前通知でシャットダウン</li>
                                <li>標準価格から最大 80% 割引</li>
                                <li>段階的に非推奨化・Spot VM へ移行推奨</li>
                            </ul>
                        </div>
                        <div className={`${styles.spotCol} ${styles.spotColNew}`}>
                            <div className={styles.spotColTitle}>✅ Spot VM（現在推奨）</div>
                            <ul>
                                <li>
                                    <strong>24 時間制限を撤廃</strong>（リソースがあれば無期限稼働）
                                </li>
                                <li>Google がリソース必要時に 30 秒前通知でシャットダウン</li>
                                <li>標準価格から最大 <strong>91% 割引</strong></li>
                                <li>フォールトトレラントなワークロードに最適</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <strong>💡 Spot VM に適したワークロード：</strong>
                        HPC・機械学習バッチトレーニング・CI/CD
                        ビルドジョブ・ゲノム解析・大規模データ処理パイプライン。
                        処理途中で終了しても再開できる「チェックポイント設計」と組み合わせることが必須のベストプラクティスです。
                    </div>

                    {/* MIG */}
                    <div className={styles.subTitle}>Managed Instance Group（MIG）</div>
                    <div className={styles.g4}>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(196, 89, 58, 0.1)' }}>📈</div>
                            <div className={styles.cardTitle}>オートスケーリング</div>
                            <div className={styles.cardBody}>
                                CPU 使用率・リクエスト数に応じて VM
                                数を自動増減。ピーク時の急増に対応しつつ、閑散期のコストを最小化。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(74, 122, 92, 0.1)' }}>🔧</div>
                            <div className={styles.cardTitle}>自動ヒーリング</div>
                            <div className={styles.cardBody}>
                                ヘルスチェックで異常 VM
                                を検知して自動削除・再作成。人間が介入しなくてもサービス稼働を維持。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(58, 111, 160, 0.1)' }}>🌍</div>
                            <div className={styles.cardTitle}>リージョナル MIG</div>
                            <div className={styles.cardBody}>
                                複数ゾーンに VM を分散配置。1
                                ゾーンが障害になっても他ゾーンで継続稼働。本番環境の必須設定。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(212, 136, 42, 0.1)' }}>🔄</div>
                            <div className={styles.cardTitle}>ローリングアップデート</div>
                            <div className={styles.cardBody}>
                                新バージョンへの更新を順次実施。サービスを停止せずに無停止アップデートが可能。
                            </div>
                        </div>
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：Compute Engine</div>
                        <ul>
                            <li>
                                本番 VM はリージョナル MIG + ヘルスチェック +
                                ロードバランサーの組み合わせで高可用性を確保する。
                            </li>
                            <li>
                                安定したワークロードには Committed Use Discount（CUD）を適用（最大 57%
                                割引）。
                            </li>
                            <li>
                                バッチ処理・ML 学習・CI/CD ビルドジョブは Spot VM でコストを最大 91%
                                削減。
                            </li>
                            <li>
                                開発環境の VM は Instance Schedules
                                で業務時間外（夜間・週末）に自動停止してコスト削減。
                            </li>
                            <li>
                                Recommender
                                の提案を定期的に確認して過剰プロビジョニングを修正する（右サイズ化）。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a
                            href="https://cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option
                        </a>
                        <a href="https://cloud.google.com/compute/docs/instances/spot" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/compute/docs/instances/spot
                        </a>
                        <a
                            href="https://cloud.google.com/blog/topics/cost-management/rethinking-your-vm-strategy-spot-vms"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://cloud.google.com/blog/topics/cost-management/rethinking-your-vm-strategy-spot-vms
                        </a>
                    </div>
                </div>
            </section>

            <section id="containers" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.3 Containers & Kubernetes</div>
                        <h2 className={styles.shTitle}>コンテナと GKE（Google Kubernetes Engine）</h2>
                        <p className={styles.shDesc}>
                            VM とコンテナの違い・Kubernetes の役割・GKE の 2
                            つのモードを理解しましょう。
                        </p>
                    </div>

                    {/* VM vs Container */}
                    <div className={styles.subTitle}>VM とコンテナの比較<span className={styles.examTag}>頻出</span></div>
                    <div className={styles.g2} style={{ marginBottom: '2rem' }}>
                        <div className={styles.card} style={{ borderLeft: '3px solid var(--color-accent-terracotta, #c4593a)' }}>
                            <div className={styles.cardTitle}>🖥️ 仮想マシン（VM）</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                物理サーバー上にハイパーバイザーを構築し、各VMが独自のゲスト OS
                                を持つ仮想化技術。
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '0.3rem', fontSize: '1rem' }}>⏱️ 起動に数分かかる</li>
                                <li style={{ marginBottom: '0.3rem' }}>💾 数GB のサイズ（ゲストOS込み）</li>
                                <li style={{ marginBottom: '0.3rem' }}>
                                    🔒 完全な分離（強固なセキュリティ）
                                </li>
                                <li>⚙️ OS レベルの完全制御が可能</li>
                            </ul>
                        </div>
                        <div className={styles.card} style={{ borderLeft: '3px solid var(--color-accent-sage, #4a7a5c)' }}>
                            <div className={styles.cardTitle}>📦 コンテナ</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                ホスト OS
                                のカーネルを共有しつつ、アプリと依存関係のみをパッケージ化した軽量な実行環境。
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '0.3rem', fontSize: '1rem' }}>⚡ 起動がミリ秒単位（超高速）</li>
                                <li style={{ marginBottom: '0.3rem' }}>🪶 数 MB〜数百 MB（軽量）</li>
                                <li style={{ marginBottom: '0.3rem' }}>
                                    🌍 環境の一貫性（どこでも同じ動作）
                                </li>
                                <li>📦 高密度デプロイ（リソース効率化）</li>
                            </ul>
                        </div>
                    </div>

                    {/* Microservices */}
                    <div className={styles.subTitle}>マイクロサービスアーキテクチャのビジネス価値</div>
                    <div className={styles.g3} style={{ marginBottom: '2rem' }}>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(58, 111, 160, 0.1)' }}>🎯</div>
                            <div className={styles.cardTitle}>独立したデプロイ</div>
                            <div className={styles.cardBody}>
                                各サービスを他に影響なく個別にデプロイ・更新できる。リリースの頻度と速度が劇的に向上する。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(74, 122, 92, 0.1)' }}>🔬</div>
                            <div className={styles.cardTitle}>部分的なスケーリング</div>
                            <div className={styles.cardBody}>
                                需要が高いサービスのみをスケールアウト。例：EC
                                サイトの決済サービスだけをセール時に拡張。
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(196, 89, 58, 0.1)' }}>🛡️</div>
                            <div className={styles.cardTitle}>障害の局所化</div>
                            <div className={styles.cardBody}>
                                あるサービスが障害でも他のサービスは動き続ける。システム全体のダウンリスクが大幅に低下。
                            </div>
                        </div>
                    </div>

                    {/* GKE MODES */}
                    <div className={styles.subTitle}>
                        GKE Autopilot vs Standard<span className={styles.examTag}>最重要</span>
                    </div>
                    <div className={styles.g2} style={{ marginBottom: '1.5rem' }}>
                        <div
                            className={styles.card}
                            style={{
                                background: 'linear-gradient(135deg, rgba(74, 122, 92, 0.06), rgba(45, 82, 64, 0.03))'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '0.8rem'
                                }}
                            >
                                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>🤖 GKE Autopilot</div>
                                <span className={`${styles.badge} ${styles.badgeG}`}>Google 推奨</span>
                            </div>
                            <div className={styles.cardBody} style={{ marginBottom: '1rem' }}>
                                ノードのプロビジョニング・スケーリング・アップグレード・セキュリティをすべて
                                Google が管理。開発者は Pod だけを意識すればよい。
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.6rem',
                                    color: 'var(--color-accent-sage, #4a7a5c)',
                                    fontWeight: 600
                                }}
                            >
                                ✅ 向いているケース
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        marginBottom: '0.25rem',
                                        paddingLeft: '1rem',
                                        position: 'relative'
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0 }}>›</span>
                                    インフラ管理工数を最小化したい
                                </li>
                                <li
                                    style={{
                                        marginBottom: '0.25rem',
                                        paddingLeft: '1rem',
                                        position: 'relative'
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0 }}>›</span>
                                    少人数チーム・スタートアップ
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0 }}>›</span> GKE
                                    のベストプラクティスに自動準拠
                                </li>
                            </ul>
                            <div
                                style={{
                                    marginTop: '0.8rem',
                                    padding: '0.6rem',
                                    background: 'rgba(74, 122, 92, 0.08)',
                                    borderRadius: '6px',
                                    fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                    fontSize: '1rem',
                                    color: 'var(--color-accent-sage, #4a7a5c)'
                                }}
                            >
                                課金: Pod が消費する vCPU / メモリ / ストレージ単位
                            </div>
                        </div>
                        <div
                            className={styles.card}
                            style={{
                                background: 'linear-gradient(135deg, rgba(58, 111, 160, 0.06), rgba(30, 63, 110, 0.03))'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '0.8rem'
                                }}
                            >
                                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>⚙️ GKE Standard</div>
                                <span className={`${styles.badge} ${styles.badgeB}`}>細粒度制御</span>
                            </div>
                            <div className={styles.cardBody} style={{ marginBottom: '1rem' }}>
                                ユーザーがノードプールを直接管理。特殊なハードウェア設定やカスタム OS
                                が必要な場合に選択。
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.6rem',
                                    color: 'var(--color-accent-sky, #3a6fa0)',
                                    fontWeight: 600
                                }}
                            >
                                ✅ 向いているケース
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        marginBottom: '0.25rem',
                                        paddingLeft: '1rem',
                                        position: 'relative'
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0 }}>›</span>
                                    <strong>GPU ノードプール</strong>が必要（ML 学習）
                                </li>
                                <li
                                    style={{
                                        marginBottom: '0.25rem',
                                        paddingLeft: '1rem',
                                        position: 'relative'
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0 }}>›</span>
                                    カーネルパラメータを細かく調整が必要
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0 }}>›</span>
                                    大規模チームが専用の CI/CD パイプライン運用
                                </li>
                            </ul>
                            <div
                                style={{
                                    marginTop: '0.8rem',
                                    padding: '0.6rem',
                                    background: 'rgba(58, 111, 160, 0.08)',
                                    borderRadius: '6px',
                                    fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                    fontSize: '1rem',
                                    color: 'var(--color-accent-sky, #3a6fa0)'
                                }}
                            >
                                課金: ノード VM の稼働時間 + 管理プレーン
                            </div>
                        </div>
                    </div>

                    <div className={styles.warn}>
                        <strong>⚠️ 試験頻出の引っかけ：</strong>
                        「GPU を使った ML モデル学習を GKE で実行し、ノードプールを細かく設定したい」→
                        <strong>GKE Standard</strong> が正解です。Autopilot は GPU
                        の詳細設定が限定的で、 ノード管理を完全に Google に委任するため GPU
                        ノードプールの細かな制御には向きません。
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：GKE</div>
                        <ul>
                            <li>
                                新規プロジェクトは
                                <strong>Autopilot をデフォルト</strong>で選択し、特別な要件がある場合のみ Standard へ。
                            </li>
                            <li>
                                Workload Identity
                                を使用してサービスアカウントキーをコンテナ内に置かない（最重要セキュリティ対策）。
                            </li>
                            <li>
                                本番は
                                <strong>リージョナルクラスタ</strong>（3ゾーン分散）で耐障害性を確保する。
                            </li>
                            <li>
                                Non-Critical ワークロードに Spot ノードプールを活用してコストを最大 60%
                                削減する。
                            </li>
                            <li>
                                Liveness/Readiness Probe を必ず設定して異常 Pod を自動検知・排除する。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/kubernetes-engine/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/kubernetes-engine/docs
                        </a>
                        <a
                            href="https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview
                        </a>
                        <a href="https://cloud.google.com/kubernetes-engine/docs/best-practices" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/kubernetes-engine/docs/best-practices
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};
