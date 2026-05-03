import React from 'react';
import styles from './Section3.module.css';

export const Section3 = () => {
    return (
        <>
            <section id="devops" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.6 DevOps & SRE</div>
                        <h2 className={styles.shTitle}>DevOps と SRE の原則<span className={styles.examTag}>頻出</span></h2>
                        <p className={styles.shDesc}>
                            CI/CD パイプライン・SLO/SLA/SLI・エラーバジェット・DORA
                            メトリクスを理解します。
                        </p>
                    </div>

                    {/* CI/CD PIPELINE */}
                    <div className={styles.subTitle}>
                        CI/CD パイプライン（継続的インテグレーション / 継続的デリバリー）
                    </div>
                    <div className={styles.g2} style={{ marginBottom: '2rem' }}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle} style={{ marginBottom: '1.2rem' }}>
                                Google Cloud の CI/CD ツールチェーン
                            </div>
                            <div className={styles.steps}>
                                <div className={styles.step}>
                                    <div
                                        className={styles.stepN}
                                        style={{
                                            background: 'var(--color-accent-terracotta, #c4593a)',
                                            fontSize: '1rem',
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    >
                                        ①
                                    </div>
                                    <div>
                                        <div className={styles.stepH}>Secure Source Manager（ソース管理）</div>
                                        <div className={styles.stepP}>
                                            GitHub 互換の Git リポジトリ。IAM で GCP 権限と統合。Cloud
                                            Build と緊密に統合されたマネージドソースコード管理。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <div
                                        className={styles.stepN}
                                        style={{
                                            background: 'var(--color-accent-sky, #3a6fa0)',
                                            fontSize: '1rem',
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    >
                                        ②
                                    </div>
                                    <div>
                                        <div className={styles.stepH}>Cloud Build（自動ビルド・テスト）</div>
                                        <div className={styles.stepP}>
                                            コミットをトリガーに自動ビルド・ユニットテスト・セキュリティスキャン・コンテナイメージ作成を実行。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <div
                                        className={styles.stepN}
                                        style={{
                                            background: 'var(--color-accent-sage, #4a7a5c)',
                                            fontSize: '1rem',
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    >
                                        ③
                                    </div>
                                    <div>
                                        <div className={styles.stepH}>Artifact Registry（イメージ保管）</div>
                                        <div className={styles.stepP}>
                                            コンテナイメージを安全に保管。<strong>脆弱性スキャンを自動実行</strong>し、Binary
                                            Authorization でセキュアなイメージのみデプロイを許可。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <div
                                        className={styles.stepN}
                                        style={{
                                            background: 'var(--color-accent-amber, #d4882a)',
                                            fontSize: '1rem',
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    >
                                        ④
                                    </div>
                                    <div>
                                        <div className={styles.stepH}>Cloud Deploy（継続的デリバリー）</div>
                                        <div className={styles.stepP}>
                                            dev → staging → production
                                            のデプロイパイプライン。<strong>本番前の人間による承認ワークフロー</strong>・カナリアデプロイ・自動ロールバック。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.hlBox} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.hlBoxTitle}>🔄 DevOps の本質</div>
                                <p style={{ color: 'var(--color-bg-primary, #fff)', lineHeight: '1.6', marginBottom: 0 }}>
                                    開発（「早く新機能をリリース」）と運用（「安定性を維持」）の壁を打破し、自動化・継続的フィードバック・責任の共有を通じてソフトウェアのデリバリーを加速させる<strong
                                        style={{ color: 'var(--color-accent-amber, #d4882a)' }}
                                    >文化的ムーブメント</strong>。
                                </p>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.cardTitle} style={{ marginBottom: '0.8rem' }}>
                                    DORA 4 つのキーメトリクス
                                </div>
                                <ul
                                    style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}
                                >
                                    <li
                                        style={{
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid var(--color-border-light, #e0dbd2)',
                                        }}
                                    >
                                        📊 <strong>デプロイ頻度</strong> —
                                        本番へのデプロイ回数（高いほど良い）
                                    </li>
                                    <li
                                        style={{
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid var(--color-border-light, #e0dbd2)',
                                        }}
                                    >
                                        ⏱️ <strong>変更リードタイム</strong> —
                                        コミットから本番まで（短いほど良い）
                                    </li>
                                    <li
                                        style={{
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid var(--color-border-light, #e0dbd2)',
                                        }}
                                    >
                                        ❌ <strong>変更失敗率</strong> —
                                        デプロイが失敗する割合（低いほど良い）
                                    </li>
                                    <li style={{ padding: '0.5rem 0' }}>
                                        🔧 <strong>平均復旧時間 (MTTR)</strong> —
                                        障害から回復まで（短いほど良い）
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* SRE CONCEPTS */}
                    <div className={styles.subTitle}>SRE の重要概念<span className={styles.examTag}>頻出</span></div>
                    <div className={styles.sreGrid} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.sreCard}>
                            <div className={styles.sreAbbr}>SLI</div>
                            <div className={styles.sreName}>Service Level Indicator（指標）</div>
                            <div className={styles.sreDesc}>
                                実際に測定するメトリクス。エラー率・レイテンシ・可用性の実測値。「実際に何%稼働していたか」。
                            </div>
                        </div>
                        <div className={styles.sreCard}>
                            <div className={styles.sreAbbr}>SLO</div>
                            <div className={styles.sreName}>Service Level Objective（目標）</div>
                            <div className={styles.sreDesc}>
                                組織内部の目標値。SLA より高い基準に設定。例：「内部目標は 99.95%
                                可用性」。
                            </div>
                        </div>
                        <div className={styles.sreCard}>
                            <div className={styles.sreAbbr}>SLA</div>
                            <div className={styles.sreName}>Service Level Agreement（契約）</div>
                            <div className={styles.sreDesc}>
                                ユーザーへの公式な約束・契約。SLO より低く設定。例：「99.9%
                                を下回った場合は返金する」。
                            </div>
                        </div>
                        <div className={styles.sreCard}>
                            <div className={styles.sreAbbr}>Error<br />Budget</div>
                            <div className={styles.sreName}>エラーバジェット（許容停止量）</div>
                            <div className={styles.sreDesc}>
                                SLO が 99.9% なら 0.1% = 月間約 43
                                分まで停止が許容される「予算」。残っていれば新機能デプロイ可、枯渇しそうなら安定化優先。
                            </div>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <strong>💡 SRE と DevOps の関係：</strong>
                        「<code style={{ fontFamily: 'var(--ff-mono, "DM Mono", monospace)', background: 'rgba(255,255,255,0.2)', padding: '2px 4px', borderRadius: '4px' }}>class SRE implements interface DevOps</code>」。 SRE は DevOps
                        の抽象的な理念を、具体的なソフトウェアエンジニアリングの実践を通じてシステム運用に適用したものです。
                        両者は競合する戦略ではなく、<strong>同じコインの裏表</strong>です。
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：DevOps / CI/CD / SRE</div>
                        <ul>
                            <li>
                                本番デプロイは必ず
                                <strong>Cloud Deploy の承認ワークフロー</strong>を通じて実施し、手動デプロイを排除する。
                            </li>
                            <li>
                                Artifact Registry の<strong>脆弱性スキャン</strong>と Binary
                                Authorization でセキュアなイメージのみデプロイを許可（Shift-Left
                                Security）。
                            </li>
                            <li>
                                SLO
                                を設定し、<strong>エラーバジェット</strong>に基づいてリリース速度と安定性のバランスをデータで管理する。
                            </li>
                            <li>
                                Infrastructure as Code（Terraform）でインフラをコード化し、<strong>GitOps</strong>
                                で設定変更を管理する。
                            </li>
                            <li>
                                DORA
                                メトリクスを定期的に測定し、組織のソフトウェアデリバリー能力を継続的に改善する。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/build/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/build/docs
                        </a>
                        <a href="https://cloud.google.com/deploy/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/deploy/docs
                        </a>
                        <a href="https://cloud.google.com/artifact-registry/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/artifact-registry/docs
                        </a>
                        <a href="https://sre.google/sre-book/table-of-contents/" target="_blank" rel="noopener noreferrer">
                            https://sre.google/sre-book/table-of-contents/
                        </a>
                        <a href="https://cloud.google.com/sre" target="_blank" rel="noopener noreferrer">https://cloud.google.com/sre</a>
                    </div>
                </div>
            </section>

            <section id="api" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>4.4 API Management</div>
                        <h2 className={styles.shTitle}>API の戦略的価値と Apigee</h2>
                        <p className={styles.shDesc}>
                            API をビジネス資産として捉え、Apigee
                            による収益化・セキュリティ・ガバナンスを理解します。
                        </p>
                    </div>

                    {/* API DIAGRAM */}
                    <div className={styles.apiDiagram} style={{ marginBottom: '2rem' }}>
                        <div
                            style={{
                                fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.35)',
                                marginBottom: '1rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}
                        >
                            API ファーストアーキテクチャ
                        </div>
                        <div className={styles.apiRow}>
                            <div className={styles.apiBox}>Web App</div>
                            <div className={styles.apiBox}>モバイル App</div>
                            <div className={styles.apiBox}>パートナー API</div>
                            <div className={styles.apiBox}>IoT デバイス</div>
                        </div>
                        <div className={styles.apiConnector}>↕ REST / gRPC</div>
                        <div className={styles.apiLayerMain}>
                            Apigee API Management
                            レイヤー（認証・認可・レート制限・モニタリング・収益化）
                        </div>
                        <div className={styles.apiConnector}>↕</div>
                        <div className={styles.apiRow}>
                            <div className={styles.apiBox}>レガシーシステム（メインフレーム）</div>
                            <div className={styles.apiBox}>Cloud Run（マイクロサービス）</div>
                            <div className={styles.apiBox}>GKE（コンテナ）</div>
                        </div>
                        <div
                            style={{
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.4)',
                                marginTop: '0.8rem',
                            }}
                        >
                            バックエンドに変更を加えずに、API レイヤーで制御・収益化が可能
                        </div>
                    </div>

                    <div className={styles.g2} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>API のビジネス価値</div>
                            <div className={styles.cardBody} style={{ marginBottom: '1rem' }}>
                                API
                                は単なる技術インターフェースではなく、データやサービスを収益化可能な「デジタル資産」として活用できます。
                            </div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-text-secondary, #4a4541)', padding: 0, margin: 0 }}>
                                <li
                                    style={{
                                        paddingLeft: '1.2rem',
                                        position: 'relative',
                                        marginBottom: '0.4rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span><strong>エコシステム拡大：</strong>外部開発者・パートナーが API
                                    を使って新アプリを構築 → 自社ビジネスエコシステムが成長
                                </li>
                                <li
                                    style={{
                                        paddingLeft: '1.2rem',
                                        position: 'relative',
                                        marginBottom: '0.4rem',
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span><strong>レガシーの抽象化：</strong>古いバックエンドを API でラップ
                                    → フロントエンドを中断せずにバックエンドを段階的に移行
                                </li>
                                <li style={{ paddingLeft: '1.2rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-terracotta, #c4593a)' }}>›</span><strong>収益化：</strong>API
                                    利用量に応じた従量課金モデルやレベニューシェアを実装
                                </li>
                            </ul>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>Apigee の主な機能</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                50 種類以上の組み込みポリシーで API
                                トラフィックをプロキシレイヤーで制御。バックエンドにコード変更不要。
                            </div>
                            <div className={styles.g2} style={{ gap: '0.8rem' }}>
                                <div>
                                    <div
                                        style={{
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            color: 'var(--color-accent-terracotta, #c4593a)',
                                            marginBottom: '0.4rem',
                                        }}
                                    >
                                        🔐 セキュリティ
                                    </div>
                                    <ul
                                        style={{
                                            listStyle: 'none',
                                            fontSize: '1rem',
                                            color: 'var(--color-text-secondary, #4a4541)',
                                            padding: 0,
                                            margin: 0
                                        }}
                                    >
                                        <li style={{ marginBottom: '0.2rem' }}>OAuth 2.0・API キー認証</li>
                                        <li style={{ marginBottom: '0.2rem' }}>レート制限・クォータ管理</li>
                                        <li>ML ボット検出（Advanced API Security）</li>
                                    </ul>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            color: 'var(--color-accent-sage, #4a7a5c)',
                                            marginBottom: '0.4rem',
                                        }}
                                    >
                                        💰 収益化
                                    </div>
                                    <ul
                                        style={{
                                            listStyle: 'none',
                                            fontSize: '1rem',
                                            color: 'var(--color-text-secondary, #4a4541)',
                                            padding: 0,
                                            margin: 0
                                        }}
                                    >
                                        <li style={{ marginBottom: '0.2rem' }}>
                                            従量課金 Rate Plans の設定
                                        </li>
                                        <li style={{ marginBottom: '0.2rem' }}>レベニューシェア機能</li>
                                        <li>開発者ポータル（自動オンボーディング）</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <strong>🔐 WAAP（Web Application and API Protection）：</strong>
                        Apigee + <strong>Cloud Armor</strong>（OWASP Top 10 防御・DDoS 緩和）+
                        <strong>reCAPTCHA Enterprise</strong> を組み合わせることで、
                        エッジからアプリケーション層まで多層防御の API
                        セキュリティアーキテクチャを構築できます。
                    </div>

                    <div className={styles.bp}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：API 管理</div>
                        <ul>
                            <li>
                                レガシーシステムをいきなり廃止しようとせず、<strong>Apigee で API ファサード</strong>を設けてフロントエンドを守りながら段階移行する。
                            </li>
                            <li>
                                Advanced API Security で<strong>シャドウ API（管理外の API）</strong>を発見し、組織の脆弱性を可視化する。
                            </li>
                            <li>
                                開発者ポータルで外部パートナーの<strong>セルフサービスオンボーディング</strong>を実現し、API
                                エコシステムを拡大する。
                            </li>
                            <li>
                                API 利用統計を分析して<strong>使われていない API の廃止</strong>と収益性の高い API の投資優先度付けを行う。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/apigee" target="_blank" rel="noopener noreferrer">https://cloud.google.com/apigee</a>
                        <a href="https://cloud.google.com/endpoints/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/endpoints/docs
                        </a>
                        <a
                            href="https://cloud.google.com/files/apigee/apigee-definite-guide-to-api-management-ebook.pdf"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://cloud.google.com/files/apigee/apigee-definite-guide-to-api-management-ebook.pdf
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};
