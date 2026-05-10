import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 1 content covering VPC design and implementation for the PCNE guide.
 *
 * This component returns a semantic `<section>` (id="s1") containing accessible headings, explanatory text,
 * comparison tables, tips, and cards for subsections 1.1–1.4 (VPC concepts, firewall rules, peering vs Shared VPC,
 * and private communication controls such as Cloud NAT, Private Google Access, and Private Service Connect).
 *
 * @returns The React element for Section 1 of the guide
 */
export function Section1() {
    return (
        <section className={sharedStyles.section} id="s1" aria-labelledby="s1-title">
            <div className={sharedStyles.sectionLabel}>Section 1 (21%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s1-title" style={{ color: 'var(--color-primary)' }}>
                VPC ネットワークの設計・実装
            </h2>
            <p className={sharedStyles.sectionDesc}>
                Google Cloud のネットワーク基盤である VPC (Virtual Private Cloud) の設計原則、
                IPアドレス管理、ルーティング、ファイアウォール、通信制御（Private Google Access, Cloud NAT, PSC）について学びます。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌐</span> 1.1 VPCの根本概念 ─ グローバルスコープとモード選択
                </h3>
                <p>Google Cloud の VPC は AWS や Azure とは異なり、<strong>グローバルリソース</strong>です。サブネットのみがリージョナルリソースとなります。</p>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">比較要素</th>
                                <th scope="col">Auto モード（自動）</th>
                                <th scope="col">Custom モード（カスタム）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>サブネット作成</td>
                                <td>各リージョンに自動作成（<code>10.128.0.0/9</code> を分割）</td>
                                <td><strong>手動でIPレンジを指定して作成（試験の推奨・実運用向け）</strong></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>IPの重複リスク</td>
                                <td>オンプレミスや他VPCとVPN接続時に重複しやすい</td>
                                <td>設計者がレンジを管理するため重複を防げる</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>変更可能か？</td>
                                <td>Auto → Custom への変換は<strong>可能</strong></td>
                                <td>Custom → Auto への変換は<strong>不可</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>試験対策</span>
                    「会社がオンプレミス環境とVPN/Interconnectで接続する予定である」という要件があれば、<strong>「Custom モード」の VPC を選択</strong>し、オンプレのIPレンジと重複しないサブネットを設計するのが正解です。
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛡️</span> 1.2 VPCファイアウォールルール ─ ステートフル・優先度・階層型ポリシー
                </h3>
                <p>GCP のファイアウォールルールは<strong>ステートフル</strong>であり、許可した上り（Ingress）トラフィックの戻り（Egress）は自動的に許可されます。</p>
                <ul>
                    <li><strong>適用先（Target）の指定方法：</strong>
                        <ul>
                            <li><strong>タグ（Network Tags）：</strong> VM インスタンスに直接付与。手軽だが文字列ベースなので運用ミスに注意。</li>
                            <li><strong>サービスアカウント（推奨）：</strong> インスタンスに関連付けられたサービスアカウントをターゲットとする。IAM で厳密に管理でき、セキュリティレベルが高い。</li>
                        </ul>
                    </li>
                    <li><strong>優先度（Priority）：</strong> <code>0</code>（最高）〜 <code>65535</code>（最低）。デフォルトルールは <code>1000</code> ではなく <code>65534</code>（暗黙のルールが65535）。</li>
                </ul>

                <div className={sharedStyles.bpBox}>
                    <h5>階層型ファイアウォールポリシー（Hierarchical Firewall Policies）</h5>
                    <ul>
                        <li>VPC 単位ではなく、<strong>組織（Organization）またはフォルダ（Folder）レベル</strong>で適用可能。</li>
                        <li>配下の全プロジェクト・全 VPC に一括適用されるため、「社内共通のセキュリティ要件（例：全社で SSH は特定 IP からのみ許可）」を強制するのに最適。</li>
                        <li>各プロジェクトの管理者が VPC ルールで「許可」しても、上位のフォルダレベルで「拒否」されていれば<strong>上位が優先（上書き）</strong>される。</li>
                    </ul>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🤝</span> 1.3 VPCピアリング vs Shared VPC ─ 設計パターンの選択
                </h3>
                <p>複数のプロジェクトや VPC 間をどう接続するかは PCNE の最頻出トピックです。</p>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">機能</th>
                                <th scope="col">VPC ピアリング (VPC Peering)</th>
                                <th scope="col">共有 VPC (Shared VPC)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>主な用途</td>
                                <td>異なる組織間、または独立性の高い部署間の接続</td>
                                <td><strong>単一組織内</strong>で、ネットワーク管理を中央集権化しつつ、リソース管理は各部署（プロジェクト）に委譲したい場合</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>推移的ルーティング (Transitive Routing)</td>
                                <td><strong>サポートしない</strong>（A-B, B-C は通信できても、A-C は通信不可）</td>
                                <td>同じホストプロジェクトの同一VPCに所属すれば通信可能</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>管理の所在</td>
                                <td>各VPCの管理者がそれぞれのルーティングを管理</td>
                                <td><strong>ホストプロジェクト</strong>の管理者がサブネット・FWを一元管理し、<strong>サービスプロジェクト</strong>に権限を委譲</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>オンプレへのVPN共有</td>
                                <td>ピアリングの設定で「カスタムルートのエクスポート/インポート」を有効にすれば可能</td>
                                <td>ホストプロジェクトで構築したVPNを全サービスプロジェクトで自動共有</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>試験対策</span>
                    「ネットワークチームがサブネットやファイアウォールを一元管理し、開発チームはVMの作成のみを行えるようにしたい」という要件は、<strong>Shared VPC（共有VPC）</strong>を構築するのが絶対の正解パターンです。
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🚪</span> 1.4 プライベート通信制御 ─ Cloud NAT・PGA・PSC
                </h3>
                <p>外部IPを持たない VM が外部や Google API とどうやって通信するか、使い分けが問われます。</p>
                <div className={sharedStyles.cards}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">NAT</div>
                        <h4>Cloud NAT</h4>
                        <p>内部IPのみのVMが<strong>インターネットにアクセス</strong>（OSのアップデートや外部APIの呼び出し）するためのマネージドサービス。<br/>※ インターネットからVMへの受信通信（Ingress）は不可。</p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">PGA</div>
                        <h4>Private Google Access</h4>
                        <p>内部IPのみのVMが<strong>Google API（Cloud Storage や BigQuery など）にアクセス</strong>するための機能。インターネットを経由せず、Google 内部網を通る。サブネット単位で有効化する。</p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">PSC</div>
                        <h4>Private Service Connect</h4>
                        <p>自社で公開したサービスや、他社・サードパーティのマネージドサービス（MongoDBやElasticなど）を、<strong>自VPCのプライベートIPエンドポイント</strong>としてマッピングし、VPCピアリングなしで接続する最新手法。</p>
                    </div>
                </div>
                <div className={sharedStyles.highlight}>
                    <strong>💡 PSA (Private Services Access) との違い：</strong>
                    PGA は「Google の公開API」へアクセス。PSA (Private Services Access) は「Cloud SQL」などのマネージドサービスに対し、VPCピアリングを使って専用のプライベートIP範囲で接続する手法です。
                </div>
            </div>
        </section>
    );
}
