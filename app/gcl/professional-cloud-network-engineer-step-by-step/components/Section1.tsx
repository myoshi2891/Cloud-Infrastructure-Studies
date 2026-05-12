import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 1 content covering VPC network design and planning.
 *
 * @returns The React element for Section 1 of the step-by-step guide
 */
export function Section1() {
    return (
        <section className={sharedStyles.section} id="s1" aria-labelledby="s1-title">
            <div className={sharedStyles.sectionLabel}>Section 1 (21%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s1-title" style={{ color: 'var(--color-primary)' }}>
                VPCネットワークの設計と計画
            </h2>
            <p className={sharedStyles.sectionDesc}>
                Google Cloud VPCの全体アーキテクチャ設計から個々のネットワーク要件の計画まで、
                ネットワークエンジニアとして最も基礎となる設計スキルが問われる。
                GKEネットワーク設計、ハイブリッド接続の計画なども含む。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🏗️</span> 1.1 全体ネットワークアーキテクチャの設計
                </h3>
                <p>
                    ネットワークアーキテクチャの設計では、<strong>ネットワークティア（Premium / Standard）</strong>の選択から始まり、高可用性・フェイルオーバー・DR対応、DNSトポロジ、ロードバランサの選定まで、要件に基づいた全体最適な設計が求められる。
                </p>

                <h4 className={sharedStyles.subHeading}>出題される考慮事項</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>ネットワークティアの選択（Premium vs Standard）：</strong> Premium Tierはグローバルなエニーキャストを利用してGoogleのプライベートバックボーン経由でトラフィックをルーティングし、最低レイテンシを実現。Standard TierはISP網を使用しコストを優先する選択。</li>
                    <li><strong>高可用性・フェイルオーバー・DR設計：</strong> マルチリージョン構成、グローバルロードバランサによる自動フェイルオーバー、Cloud Interconnect + HA VPNの二重化によりRTO/RPO目標を達成する設計。</li>
                    <li><strong>DNSトポロジの設計（オンプレミス連携含む）：</strong> Cloud DNSプライベートゾーン、転送ゾーン、インバウンドサーバーポリシーを組み合わせてオンプレとクラウドのDNS解決を統合する。</li>
                    <li><strong>適切なロードバランサの選定：</strong> L7/L4、グローバル/リージョン、外部/内部の観点から、トラフィック特性と要件に基づいて最適なロードバランサを選択する。</li>
                    <li><strong>GKEネットワーキングの計画：</strong> セカンダリIPレンジ、スケールポテンシャル、コントロールプレーンアクセスを考慮したGKEクラスタのネットワーク設計。</li>
                    <li><strong>IAMロールの識別：</strong> LBプロビジョニングやShared VPCサブネット権限など、ネットワーク操作に必要な適切なIAMロールを特定する。</li>
                    <li><strong>マネージドサービスへの接続計画：</strong> Private Services Access、Private Service Connect（PSC）、Serverless VPC Accessを使ったセキュアな接続方法。</li>
                    <li><strong>クォータと制限の計画：</strong> Cloud Routerの数、動的ルート数、サブネット数など各サービスのクォータを事前に把握し、必要に応じて引き上げを計画。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>本番ワークロードには常にPremium Tierを選択し、Googleのバックボーンで最低レイテンシを確保する</li>
                    <li>アーキテクチャ設計初期段階からSPOFを洗い出し、マルチゾーン・マルチリージョン冗長を組み込む</li>
                    <li>グローバル外部ALB + Cloud Armor + Cloud CDNのスタックを標準的なWebアーキテクチャのテンプレートとして採用する</li>
                    <li>クォータはプロジェクト作成直後に確認し、本番移行前に必要な引き上げを申請しておく</li>
                    <li>マネージドサービス（Cloud SQL、Memorystore等）へのアクセスは外部IPではなくPrivate Service ConnectまたはPrivate Services Accessを使用する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌐</span> 1.2 VPCネットワークの設計
                </h3>
                <p>
                    VPCの設計では、VPCの種類と数の選択（スタンドアロン vs Shared VPC）、IPアドレス管理（IPAM）戦略、グローバル/リージョナルネットワーク構成、MTUサイジング、サードパーティ機器の挿入方法などが問われる。
                </p>

                <h4 className={sharedStyles.subHeading}>出題される考慮事項</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>VPCの種類と数の選択：</strong>スタンドアロンVPC vs Shared VPC。要件に基づいてVPCの数と分離レベルを決定する。</li>
                    <li><strong>ネットワーク相互接続の方法：</strong>VPC Network Peering、NCC（メッシュ/スタートポロジ）、PSCから要件に合わせて選択する。</li>
                    <li><strong>IPアドレス管理（IPAM）戦略：</strong>サブネット、IPv6、BYOIP、PUPI（Privately Used Public IP）、Private NAT、非RFC 1918アドレス、IPAM自動化を計画する。</li>
                    <li><strong>グローバルまたはリージョナルネットワーク環境の計画：</strong>ダイナミックルーティングモード（グローバル/リージョン）の選択と影響を理解する。</li>
                    <li><strong>MTUサイジング：</strong>VPCのデフォルトMTU（1460）とジャンボフレーム（最大8896バイト）の使い分けと設定方法。</li>
                    <li><strong>サードパーティ機器の挿入：</strong>NVA（Network Virtual Appliance）のカスタムルート（静的/ポリシーベース）とロードバランシングを使った高可用性設計。</li>
                </ul>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">接続方式</th>
                                <th scope="col">推移的ルーティング</th>
                                <th scope="col">組織をまたぐ</th>
                                <th scope="col">主要ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Shared VPC</td>
                                <td>✅ 対応</td>
                                <td>❌ 同一組織のみ</td>
                                <td>中央集権的ネットワーク管理、エンタープライズ標準</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>VPC Peering</td>
                                <td>❌ 非対応</td>
                                <td>✅ 異なる組織も可</td>
                                <td>チームごとの自律性が必要、SaaS連携</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>NCC (ハブ&スポーク)</td>
                                <td>✅ 対応（最大250VPC）</td>
                                <td>✅ 対応</td>
                                <td>大規模マルチVPC、マルチクラウド統合管理</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>PSC</td>
                                <td>N/A（エンドポイント型）</td>
                                <td>✅ 対応</td>
                                <td>マネージドサービスへのプライベートアクセス</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={sharedStyles.warningBox}>
                    <strong>重要：</strong> 自動モードVPCは <code>10.128.0.0/9</code> から固定のIPレンジを自動割り当てするため、オンプレミスとのIPオーバーラップが発生しやすい。また、自動モードVPC同士はピアリング不可。本番環境では必ずカスタムモードVPCを使用すること。
                </div>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>本番環境では常にカスタムモードVPCを採用し、IPアドレス計画を事前に文書化する</li>
                    <li>エンタープライズではShared VPCを標準として採用し、ネットワーク管理を中央集権化する</li>
                    <li>オンプレミス・他VPC・他クラウドとのIPオーバーラップを避けるため、組織全体のIPアドレス台帳を管理する</li>
                    <li>高スループット要件（BigQuery、GKE等）にはジャンボフレーム（MTU 8896）を有効化してパフォーマンスを最大化する</li>
                    <li>NVAを挿入する場合は内部LBをネクストホップとして使用し、NVAの単一障害点を排除する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔗</span> 1.3 レジリエントでパフォーマントなハイブリッド/マルチクラウドネットワーク設計
                </h3>
                <p>
                    オンプレミスや他のクラウドプロバイダとのハイブリッド接続設計。Dedicated Interconnect、Partner Interconnect、Cloud VPN、Cross-Cloud Interconnectの使い分けと、高可用性・DR戦略、DNS統合、暗号化オプションが重要なトピックである。
                </p>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">接続方式</th>
                                <th scope="col">帯域幅</th>
                                <th scope="col">SLA</th>
                                <th scope="col">遅延</th>
                                <th scope="col">ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Dedicated Interconnect</td>
                                <td>10G / 100G</td>
                                <td>99.99%（HA構成）</td>
                                <td>最低</td>
                                <td>大容量、低遅延、本番ミッションクリティカル</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Partner Interconnect</td>
                                <td>50Mbps〜50G</td>
                                <td>99.99%（L2 HA）</td>
                                <td>低</td>
                                <td>Googleのコロケーションに直接接続できない場合</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>HA VPN</td>
                                <td>最大3Gbps/トンネル</td>
                                <td>99.99%</td>
                                <td>中（インターネット経由）</td>
                                <td>低コスト、すぐに開通、バックアップ回線</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Classic VPN</td>
                                <td>最大3Gbps</td>
                                <td>99.9%</td>
                                <td>中</td>
                                <td>レガシー、新規構築では非推奨</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cross-Cloud Interconnect</td>
                                <td>10G / 100G</td>
                                <td>99.99%</td>
                                <td>最低</td>
                                <td>AWS/Azure等との専用線マルチクラウド接続</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className={sharedStyles.subHeading}>ハイブリッド接続の詳細設計</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>🔒 Interconnect暗号化オプション：</strong> MACsec（レイヤー2での暗号化。Dedicated Interconnectの物理リンク上のデータを暗号化）。HA VPN over Interconnect（IPsecによるレイヤー3暗号化。高いセキュリティ要件に対応）。</li>
                    <li><strong>🌐 ハイブリッドDNSトポロジ：</strong> Cloud→オンプレ（Cloud DNS転送ゾーンを設定してオンプレのDNSサーバーに転送）。オンプレ→Cloud（インバウンドサーバーポリシーを設定してCloud DNSフォワーダーIPへ委譲）。</li>
                    <li><strong>⚡ HA設計（99.99% SLA）：</strong> Dedicated Interconnectの99.99%は異なるメトロの2回線各2VLAN attachment（合計4本）。HA VPNの99.99%は2つのトンネル（異なるゲートウェイ）の同時確立が必須。</li>
                    <li><strong>🎯 MTUの考慮事項：</strong> Cloud InterconnectはMTU最大1440バイト（デフォルトVPC MTU 1460から要調整）。HA VPNはIPsecオーバーヘッドでMTUが削減されるためTCP MSS clampingが必要。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>本番環境のInterconnectにはHA構成（99.99% SLA）を採用し、異なるメトロに冗長回線を確保する</li>
                    <li>HA VPNをInterconnectのバックアップとして構成し、BGP LOCAL_PREFでプライマリ/バックアップを制御する</li>
                    <li>セキュリティ要件が高い場合はHA VPN over InterconnectでIPsec暗号化を追加する</li>
                    <li>BFD（Bidirectional Forwarding Detection）を有効化し、障害検知を数秒以内に短縮する</li>
                    <li>Vertex AIなどのGoogle APIへのプライベートアクセスにはPrivate Google AccessとPSCを使用する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">☸️</span> 1.4 GKE（Google Kubernetes Engine）向けネットワーク設計
                </h3>
                <p>
                    GKEネットワーク設計では、パブリック/プライベートクラスタの選択、コントロールプレーンエンドポイント、IPアドレス計画（RFC 1918/非RFC 1918）、IPv6対応、負荷分散構成が重要テーマとなる。
                </p>

                <h4 className={sharedStyles.subHeading}>出題される考慮事項</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>パブリック vs プライベートクラスタノード：</strong>セキュリティ要件に応じてノードに外部IPを持たせるか否かを決定。プライベートクラスタではCloud NATが必要。</li>
                    <li><strong>パブリック vs プライベートコントロールプレーン：</strong>プライベートエンドポイントで外部からのコントロールプレーンアクセスを遮断し、セキュリティを向上させる。</li>
                    <li><strong>サブネット計画（プライマリ/セカンダリレンジ）：</strong>ノード用プライマリレンジ、Pod用・Service用セカンダリレンジの3つを計画。Pod数が多いため十分な空間を確保する。</li>
                    <li><strong>GKEのIPアドレス計画：</strong>RFC 1918、非RFC 1918、PSC、共有IPレンジ、PUPIなど多様なIPアドレス戦略の使い分け。</li>
                    <li><strong>IPv6対応：</strong>デュアルスタッククラスタの設計とIPv6サポートの計画。</li>
                    <li><strong>GKE向け負荷分散設計：</strong>GKE Gateway コントローラ、GKE Ingressコントローラ、NEGを使ったコンテナネイティブ負荷分散。</li>
                </ul>

                <div className={sharedStyles.infoBox}>
                    <strong>💡 GKE IPアドレス計算の目安：</strong> ノード数 × (ノードあたりの最大Pod数)のIPが必要。デフォルトは1ノードあたり110 Pod → ノード100台なら Pod用に/16（65536アドレス）以上が必要。Pod数を64に制限するだけでIP消費量を40%削減できる。
                </div>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>本番クラスタは必ずプライベートノードを使用し、ノードへの外部からの直接アクセスを遮断する</li>
                    <li>コントロールプレーンもプライベートエンドポイントにして、authorized networksで管理IPのみアクセスを許可する</li>
                    <li>ノードあたりの最大Pod数を実際の需要に合わせて削減（64等）し、IP空間を節約する</li>
                    <li>VPC-nativeクラスタ（エイリアスIP）を使用してPodのIPをVPCでネイティブにルーティング可能にする</li>
                    <li>GKE Dataplane V2（eBPFベース）を有効化してネットワークポリシーを高速に実行し、kube-proxyのオーバーヘッドを排除する</li>
                </ul>
            </div>
        </section>
    );
}
