import React from 'react';
import styles from './Section2.module.css';

export const Section2 = () => {
    return (
        <>
            <section id="serverless" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.3 Serverless Computing</div>
                        <h2 className={styles.shTitle}>サーバーレスコンピューティング</h2>
                        <p className={styles.shDesc}>
                            Cloud Run・Cloud Functions・App Engine の違いと適切な選択基準を理解します。
                        </p>
                    </div>

                    <div className={styles.g3} style={{ marginBottom: '2rem' }}>
                        <div className={styles.card} style={{ borderTop: '3px solid var(--color-accent-terracotta, #c4593a)' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.6rem',
                                }}
                            >
                                <div
                                    className={styles.cardIcon}
                                    style={{ background: 'rgba(196, 89, 58, 0.1)', marginBottom: 0 }}
                                >
                                    🚀
                                </div>
                                <span className={`${styles.badge} ${styles.badgeR}`}>推奨デフォルト</span>
                            </div>
                            <div className={styles.cardTitle}>Cloud Run</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                コンテナをサーバーレスで実行するフルマネージドプラットフォーム。HTTP/gRPC/WebSocket
                                に対応。任意の言語で動作。
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                主な特徴：
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.2rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                    ゼロスケール（アイドル時コストゼロ）
                                </li>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.2rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                    トラフィック分割でカナリアデプロイ
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                    Cloud Run Jobs でバッチ処理も対応
                                </li>
                            </ul>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeR}`}>Web API</span>
                                <span className={`${styles.badge} ${styles.badgeR}`} style={{ marginLeft: '0.3rem' }}>ML推論</span>
                                <span className={`${styles.badge} ${styles.badgeR}`} style={{ marginLeft: '0.3rem' }}>Webhook</span>
                            </div>
                        </div>

                        <div className={styles.card} style={{ borderTop: '3px solid var(--color-accent-amber, #d4882a)' }}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(212, 136, 42, 0.1)' }}>⚡</div>
                            <div className={styles.cardTitle}>Cloud Run Functions</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                イベント駆動の FaaS（Function as a
                                Service）。特定のイベント発生時のみ単一の関数を実行する。旧 Cloud
                                Functions の後継。
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                トリガー種別：
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.2rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-amber, #d4882a)' }}>›</span>
                                    Cloud Storage（ファイルアップロード）
                                </li>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.2rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-amber, #d4882a)' }}>›</span>
                                    Pub/Sub（メッセージ受信）
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-amber, #d4882a)' }}>›</span>
                                    HTTP・Firebase・Eventarc
                                </li>
                            </ul>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeA}`}>画像処理</span>
                                <span className={`${styles.badge} ${styles.badgeA}`} style={{ marginLeft: '0.3rem' }}>通知送信</span>
                                <span className={`${styles.badge} ${styles.badgeA}`} style={{ marginLeft: '0.3rem' }}>データ変換</span>
                            </div>
                        </div>

                        <div className={styles.card} style={{ borderTop: '3px solid var(--color-accent-sky, #3a6fa0)' }}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(58, 111, 160, 0.1)' }}>📱</div>
                            <div className={styles.cardTitle}>App Engine</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                10年以上の実績を持つ Web アプリ向けの
                                PaaS。ソースコードをアップロードするだけでデプロイ可能。Standard /
                                Flexible 環境を提供。
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                環境の選択：
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.2rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sky, #3a6fa0)' }}>›</span>
                                    Standard: 特定言語ランタイム・超高速スケール
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sky, #3a6fa0)' }}>›</span>
                                    Flexible: Docker コンテナで任意ランタイム
                                </li>
                            </ul>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeB}`}>既存Webアプリ</span>
                                <span className={`${styles.badge} ${styles.badgeB}`} style={{ marginLeft: '0.3rem' }}>モバイルBE</span>
                            </div>
                        </div>
                    </div>

                    {/* CLOUD RUN vs FUNCTIONS */}
                    <div className={styles.hlBox} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.hlBoxTitle}>
                            ⚡ Cloud Run と Cloud Functions の使い分け（試験頻出）
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1.5rem',
                                marginTop: '0.8rem',
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        color: 'var(--color-accent-terracotta, #c4593a)',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Cloud Run を選ぶとき
                                </div>
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        fontSize: '1rem',
                                        color: 'rgba(255, 255, 255, 0.65)',
                                        padding: 0,
                                        margin: 0
                                    }}
                                >
                                    <li
                                        style={{
                                            paddingLeft: '1rem',
                                            position: 'relative',
                                            marginBottom: '0.3rem',
                                        }}
                                    >
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                        コンテナ化された HTTP API / Web アプリ
                                    </li>
                                    <li
                                        style={{
                                            paddingLeft: '1rem',
                                            position: 'relative',
                                            marginBottom: '0.3rem',
                                        }}
                                    >
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                        複数エンドポイントを持つアプリ
                                    </li>
                                    <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                        常時起動・WebSocket・gRPC が必要
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        color: 'var(--color-accent-amber, #d4882a)',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Cloud Functions を選ぶとき
                                </div>
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        fontSize: '1rem',
                                        color: 'rgba(255, 255, 255, 0.65)',
                                        padding: 0,
                                        margin: 0
                                    }}
                                >
                                    <li
                                        style={{
                                            paddingLeft: '1rem',
                                            position: 'relative',
                                            marginBottom: '0.3rem',
                                        }}
                                    >
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-amber, #d4882a)' }}>›</span>
                                        特定イベント（ファイル保存・メッセージ受信）への反応
                                    </li>
                                    <li
                                        style={{
                                            paddingLeft: '1rem',
                                            position: 'relative',
                                            marginBottom: '0.3rem',
                                        }}
                                    >
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-amber, #d4882a)' }}>›</span>
                                        単一の処理・「接着剤」的な役割
                                    </li>
                                    <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-amber, #d4882a)' }}>›</span>
                                        完全にオンデマンド・ゼロスケール優先
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：サーバーレス</div>
                        <ul>
                            <li>
                                新規アプリケーションのデプロイには
                                <strong>Cloud Run をデフォルトの選択肢</strong>として検討する（Google
                                も推奨）。
                            </li>
                            <li>
                                Cold Start が問題の場合は最小インスタンス数を 1
                                以上に設定（コストはかかるがレイテンシを安定させる）。
                            </li>
                            <li>
                                Cloud Run Jobs でスケジュールバッチを実装し、常時起動 VM を不要にする。
                            </li>
                            <li>
                                シークレット（API キー等）はコードに直書きせず
                                <strong>Secret Manager</strong> から環境変数として注入する。
                            </li>
                            <li>
                                Cloud Functions は「1 関数 = 1
                                タスク」の単一責務の原則を守り、複雑な処理は Cloud Run へ。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/run/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/run/docs
                        </a>
                        <a href="https://cloud.google.com/functions/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/functions/docs
                        </a>
                        <a
                            href="https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run
                        </a>
                    </div>
                </div>
            </section>

            <section id="network" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.4 Networking</div>
                        <h2 className={styles.shTitle}>
                            ネットワークサービスとハイブリッド接続<span className={styles.examTag}>頻出</span>
                        </h2>
                        <p className={styles.shDesc}>
                            VPC・ロードバランサー・CDN・Cloud VPN・Cloud Interconnect
                            の役割と選択基準を理解します。
                        </p>
                    </div>

                    <div className={styles.subTitle}>VPC（Virtual Private Cloud）の基本</div>
                    <div className={styles.g2} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>Google Cloud VPC の特徴</div>
                            <div className={styles.cardBody} style={{ marginBottom: '1rem' }}>
                                他社クラウドと異なり、<strong>1 つの VPC がグローバルに広がる</strong>。東京リージョンと大阪リージョンの VM が同じ VPC
                                内でプライベート通信可能。
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.3rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                    サブネットで IP アドレス範囲を分割（本番・開発・テストの分離）
                                </li>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.3rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                    ファイアウォールルールで送受信トラフィックを細かく制御
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span>
                                    Private Google Access で外部 IP なしで GCP サービスにアクセス
                                </li>
                            </ul>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>Shared VPC（共有 VPC）</div>
                            <div className={styles.cardBody} style={{ marginBottom: '1rem' }}>
                                ホストプロジェクトの VPC
                                を複数のサービスプロジェクトで共有。ネットワーク管理を中央集権化しながら各チームは独立して開発できる。
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'var(--color-accent-sage, #4a7a5c)',
                                    marginBottom: '0.4rem',
                                }}
                            >
                                メリット：
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sage, #4a7a5c)' }}>✓</span>
                                    ファイアウォールポリシーをセキュリティチームが一元管理
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sage, #4a7a5c)' }}>✓</span>
                                    各プロジェクトは独立したコスト管理を維持
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CONNECTIVITY COMPARISON */}
                    <div className={styles.subTitle}>
                        オンプレミスとの接続方法の選択<span className={styles.examTag}>最重要</span>
                    </div>
                    <div className={styles.g2} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.card} style={{ borderLeft: '3px solid var(--color-accent-sky, #3a6fa0)' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.6rem',
                                }}
                            >
                                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>🔒 Cloud VPN</div>
                                <span className={`${styles.badge} ${styles.badgeB}`}>低コスト</span>
                            </div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                インターネット経由で IPsec 暗号化トンネルを作成。HA VPN は冗長トンネルで
                                SLA 99.99% を実現。
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sky, #3a6fa0)' }}>✓</span>
                                    物理専用線不要・低コスト・迅速な設定
                                </li>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>✗</span>
                                    インターネット品質に依存（帯域保証なし）
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>✗</span>
                                    大量データ転送・低レイテンシ要件には不向き
                                </li>
                            </ul>
                            <div style={{ marginTop: '0.8rem', fontSize: '1rem', color: 'var(--color-accent-sky, #3a6fa0)' }}>
                                → 小規模・テスト・非クリティカルなハイブリッド接続
                            </div>
                        </div>
                        <div className={styles.card} style={{ borderLeft: '3px solid var(--color-accent-sage, #4a7a5c)' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.6rem',
                                }}
                            >
                                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>
                                    🔗 Cloud Interconnect
                                </div>
                                <span className={`${styles.badge} ${styles.badgeG}`}>エンタープライズ</span>
                            </div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                オンプレと Google Cloud を物理的な専用線で接続。Dedicated（直接）と
                                Partner（キャリア経由）の 2 種類。
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sage, #4a7a5c)' }}>✓</span>
                                    低レイテンシ・高帯域・安定した専用線品質
                                </li>
                                <li
                                    style={{
                                        paddingLeft: '1rem',
                                        position: 'relative',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-sage, #4a7a5c)' }}>✓</span>
                                    アウトバウンドデータ転送コストが安価
                                </li>
                                <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>✗</span>
                                    コストが高い・設定に時間がかかる
                                </li>
                            </ul>
                            <div style={{ marginTop: '0.8rem', fontSize: '1rem', color: 'var(--color-accent-sage, #4a7a5c)' }}>
                                → 大容量・ミッションクリティカル・金融・医療系
                            </div>
                        </div>
                    </div>

                    <div className={styles.warn}>
                        <strong>⚠️ 試験頻出の選択問題：</strong>
                        「金融機関が 1 日に数十 TB を転送、低レイテンシ・安定性が必要」→
                        <strong>Cloud Interconnect（Dedicated）</strong>が正解。
                        「小規模企業がオンプレとクラウドをコストを抑えてつなぎたい」→
                        <strong>Cloud VPN（HA VPN）</strong>が正解。
                    </div>

                    {/* LB TYPES */}
                    <div className={styles.subTitle}>Cloud Load Balancing の種類</div>
                    <div className={styles.g4}>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(196, 89, 58, 0.1)' }}>🌐</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>
                                グローバル外部<br />HTTP(S) LB
                            </div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                世界中のユーザーへ最低レイテンシ配信。Google Premium Tier。SSL 終端・URL
                                マッピング・Cloud Armor 統合。
                            </div>
                            <div style={{ marginTop: '0.6rem' }}>
                                <span className={`${styles.badge} ${styles.badgeR}`}>グローバルWebアプリ</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(74, 122, 92, 0.1)' }}>🏠</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>
                                内部<br />HTTP(S) LB
                            </div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                VPC
                                内部のトラフィックのみを分散（外部から見えない）。マイクロサービス間通信の負荷分散に最適。
                            </div>
                            <div style={{ marginTop: '0.6rem' }}>
                                <span className={`${styles.badge} ${styles.badgeG}`}>マイクロサービス</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(58, 111, 160, 0.1)' }}>⚡</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>
                                外部 TCP/UDP<br />NLB
                            </div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                L4 での高性能ロードバランシング。HTTP
                                以外のプロトコル（ゲームサーバー等）・超低レイテンシが必要な場合。
                            </div>
                            <div style={{ marginTop: '0.6rem' }}>
                                <span className={`${styles.badge} ${styles.badgeB}`}>ゲームサーバー</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: 'rgba(212, 136, 42, 0.1)' }}>🚀</div>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>Cloud CDN</div>
                            <div className={styles.cardBody} style={{ fontSize: '1rem' }}>
                                100 以上のエッジロケーションでキャッシュ配信。レイテンシを最大 95%
                                削減し、オリジンサーバー負荷を大幅軽減。
                            </div>
                            <div style={{ marginTop: '0.6rem' }}>
                                <span className={`${styles.badge} ${styles.badgeA}`}>静的コンテンツ</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：ネットワーク</div>
                        <ul>
                            <li>
                                VM には原則として外部 IP を付与せず、<strong>Cloud NAT</strong>
                                でアウトバウンドのみを許可する（攻撃面を最小化）。
                            </li>
                            <li>
                                グローバルな Web アプリには
                                <strong>グローバル HTTP(S) LB + Cloud CDN + Cloud Armor</strong>
                                を組み合わせて配信。
                            </li>
                            <li>
                                マイクロサービス間通信には
                                <strong>内部 HTTP(S) LB</strong>
                                で外部に公開しない安全な負荷分散を実現する。
                            </li>
                            <li>
                                Shared VPC
                                でネットワーク管理を中央集権化し、各チームのセキュリティポリシーを統一する。
                            </li>
                            <li>
                                VPC Flow Logs
                                を有効化してネットワークトラフィックを記録し、セキュリティ監査の基盤を整える。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/vpc/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/vpc/docs
                        </a>
                        <a href="https://cloud.google.com/load-balancing/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/load-balancing/docs
                        </a>
                        <a href="https://cloud.google.com/interconnect/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/interconnect/docs
                        </a>
                        <a href="https://cloud.google.com/vpn/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/vpn/docs
                        </a>
                    </div>
                </div>
            </section>

            <section id="hybrid" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.5 Hybrid & Multi-Cloud</div>
                        <h2 className={styles.shTitle}>ハイブリッド＆マルチクラウド管理</h2>
                        <p className={styles.shDesc}>
                            GKE Enterprise（旧
                            Anthos）によるマルチ環境統合管理の仕組みを理解しましょう。
                        </p>
                    </div>

                    {/* WHY MULTICLOUD */}
                    <div className={styles.subTitle}>マルチクラウド戦略を選ぶ理由</div>
                    <div className={styles.g3} style={{ marginBottom: '2rem' }}>
                        <div className={styles.card} style={{ borderTop: '3px solid var(--color-accent-amber, #d4882a)' }}>
                            <div
                                className={styles.cardIcon}
                                style={{ background: 'rgba(212, 136, 42, 0.12)', fontSize: '1.5rem' }}
                            >
                                🔓
                            </div>
                            <div className={styles.cardTitle}>ベンダーロックイン回避</div>
                            <div className={styles.cardBody}>
                                特定プロバイダーへの過度な依存を防ぎ、価格交渉力を維持する。大規模障害時のビジネス継続性（BDR）も確保できる。
                            </div>
                        </div>
                        <div className={styles.card} style={{ borderTop: '3px solid var(--color-accent-sage, #4a7a5c)' }}>
                            <div
                                className={styles.cardIcon}
                                style={{ background: 'rgba(74, 122, 92, 0.12)', fontSize: '1.5rem' }}
                            >
                                ⚖️
                            </div>
                            <div className={styles.cardTitle}>データ主権とコンプライアンス</div>
                            <div className={styles.cardBody}>
                                個人情報・金融データを法規制により自国の自社データセンターに保持（Retain）しつつ、新システムはクラウドで構築する。
                            </div>
                        </div>
                        <div className={styles.card} style={{ borderTop: '3px solid var(--color-accent-sky, #3a6fa0)' }}>
                            <div
                                className={styles.cardIcon}
                                style={{ background: 'rgba(58, 111, 160, 0.12)', fontSize: '1.5rem' }}
                            >
                                💼
                            </div>
                            <div className={styles.cardTitle}>既存投資の保護</div>
                            <div className={styles.cardBody}>
                                既存 DC
                                への大規模な設備投資（CAPEX）の減価償却が完了するまで活用しつつ、新アプリはクラウドで展開。投資対効果を最大化。
                            </div>
                        </div>
                    </div>

                    {/* GKE ENTERPRISE */}
                    <div className={styles.subTitle}>
                        GKE Enterprise（旧 Anthos）によるサイロの打破<span className={styles.examTag}>最重要</span>
                    </div>
                    <div className={styles.anthosBox} style={{ marginBottom: '1.5rem' }}>
                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start',
                                marginBottom: '1.5rem',
                            }}
                        >
                            <div style={{ fontSize: '2.5rem' }}>🌐</div>
                            <div>
                                <div
                                    style={{
                                        fontFamily: 'var(--ff-display, \'Fraunces\', Georgia, serif)',
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: '#fff',
                                        marginBottom: '0.3rem',
                                    }}
                                >
                                    GKE Enterprise
                                </div>
                                <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                                    オンプレ・Google Cloud・AWS・Azure のコンテナワークロードを<strong
                                        style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                                    >単一の管理画面（Single Pane of Glass）</strong>から一元管理する統合コントロールプレーン
                                </div>
                            </div>
                        </div>
                        <div className={styles.anthosPoint}>
                            <div className={styles.anthosIcon}>🔑</div>
                            <div>
                                <div className={styles.anthosPointH}>アイデンティティの標準化</div>
                                <div className={styles.anthosPointD}>
                                    Connect Gateway で AWS・Azure 上のクラスタへのアクセス認証を Google
                                    Cloud IAM に統一。環境ごとに異なるアクセス管理を一元化する。
                                </div>
                            </div>
                        </div>
                        <div className={styles.anthosPoint}>
                            <div className={styles.anthosIcon}>📋</div>
                            <div>
                                <div className={styles.anthosPointH}>Anthos Config Management（GitOps）</div>
                                <div className={styles.anthosPointD}>
                                    Git
                                    リポジトリからすべてのクラスタにセキュリティポリシー・RBAC・設定を自動同期。環境間の設定ドリフトとコンプライアンス違反を防止する。
                                </div>
                            </div>
                        </div>
                        <div className={styles.anthosPoint}>
                            <div className={styles.anthosIcon}>🔄</div>
                            <div>
                                <div className={styles.anthosPointH}>統一された CI/CD パイプライン</div>
                                <div className={styles.anthosPointD}>
                                    インフラの差異を GKE Enterprise
                                    が抽象化するため、開発チームは単一のパイプラインでどのクラウド環境にもデプロイできる。
                                </div>
                            </div>
                        </div>
                        <div className={styles.anthosPoint}>
                            <div className={styles.anthosIcon}>🕸️</div>
                            <div>
                                <div className={styles.anthosPointH}>
                                    Anthos Service Mesh（サービスメッシュ）
                                </div>
                                <div className={styles.anthosPointD}>
                                    Istio
                                    ベースのサービスメッシュでマイクロサービス間通信を可視化・制御。mTLS
                                    で全通信を自動暗号化し、ゼロトラストネットワークを実現。
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <strong>💡 Google Distributed Cloud：</strong>
                        Google
                        のインフラ・ソフトウェアをそのまま自社データセンターに設置するオプション。
                        工場・病院・銀行など、データをオンプレに置く必要があるユースケースや、
                        超低レイテンシが必要なエッジコンピューティングシナリオに対応します。
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：ハイブリッド / マルチクラウド</div>
                        <ul>
                            <li>
                                ハイブリッド環境の複雑さを増やす前に、各環境に残す<strong>ビジネス上の明確な理由</strong>を定義する。
                            </li>
                            <li>
                                Anthos Config Management で<strong>セキュリティポリシーを Git で一元管理</strong>し、全クラスタに均一に適用する。
                            </li>
                            <li>
                                Connect Gateway でアクセス認証を
                                <strong>IAM に統一</strong>し、環境ごとの認証管理のサイロを排除する。
                            </li>
                            <li>
                                クロスクラウドの通信には暗号化を必須とし、Anthos Service Mesh の mTLS
                                を活用する。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs" target="_blank" rel="noopener noreferrer">
                            https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs
                        </a>
                        <a href="https://cloud.google.com/anthos/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/anthos/docs
                        </a>
                        <a href="https://services.google.com/fh/files/blogs/anthos_white_paper.pdf" target="_blank" rel="noopener noreferrer">
                            https://services.google.com/fh/files/blogs/anthos_white_paper.pdf
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};
