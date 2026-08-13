'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

export default function ComptiaNetworkPlusGuide() {
    return (
        <div className="comptia-network-plus-page">
            <NavBar />
            <main className="main">
                <header className="doc-header">
                    <div className="doc-eyebrow">
                        <i className="ti ti-certificate" aria-hidden="true" />
                        N10-009 / V9 対応
                    </div>
                    <h1>CompTIA Network+ 試験 完全ガイド</h1>
                    <p className="subtitle">
                        初学者のためのステップバイステップ解説 ― 最新の公式試験情報（V9 / 試験コード N10-009）に基づいています
                    </p>

                    <div className="stat-grid">
                        <div className="stat-card" style={{ '--stat-accent': 'var(--c-purple-200)' } as React.CSSProperties}>
                            <div className="stat-card-top">
                                <i className="ti ti-list-details" aria-hidden="true" />
                                <span>出題ドメイン</span>
                            </div>
                            <div className="stat-card-value">5 分野</div>
                        </div>
                        <div className="stat-card" style={{ '--stat-accent': 'var(--c-teal-200)' } as React.CSSProperties}>
                            <div className="stat-card-top">
                                <i className="ti ti-help-circle" aria-hidden="true" />
                                <span>問題数（最大）</span>
                            </div>
                            <div className="stat-card-value">90問</div>
                        </div>
                        <div className="stat-card" style={{ '--stat-accent': 'var(--c-coral-200)' } as React.CSSProperties}>
                            <div className="stat-card-top">
                                <i className="ti ti-clock-hour-4" aria-hidden="true" />
                                <span>試験時間</span>
                            </div>
                            <div className="stat-card-value">90分</div>
                        </div>
                        <div className="stat-card" style={{ '--stat-accent': 'var(--c-amber-200)' } as React.CSSProperties}>
                            <div className="stat-card-top">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                <span>合格ライン</span>
                            </div>
                            <div className="stat-card-value">720 / 900</div>
                        </div>
                    </div>
                </header>

                <section id="overview" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-network" aria-hidden="true" />
                        </span>
                        1. CompTIA Network+ とは何か
                    </h2>
                    <p>
                        CompTIA Network+ は、米国の非営利業界団体 CompTIA が提供するベンダーニュートラル（特定メーカーに依存しない）なネットワーク技術者向け認定資格です。特定企業の製品知識ではなく、TCP/IP・ルーティング・スイッチング・無線LAN・クラウド・セキュリティといった「ネットワークの基礎体力」そのものを証明する資格として、業界で広く認知されています。
                    </p>
                    <p>この資格を取得すると、以下のような能力を持つことを客観的に証明できます。</p>
                    <ul>
                        <li>有線・無線ネットワーク機器を設計・導入できる</li>
                        <li>ネットワークのドキュメント化やライフサイクル管理ができる</li>
                        <li>クラウドや仮想ネットワークの基本概念を理解している</li>
                        <li>障害を体系的な手順で切り分け、復旧できる</li>
                        <li>基本的なセキュリティ対策を実装できる</li>
                    </ul>
                    <p>
                        Network+ は「CompTIA Core」シリーズの一部で、前段の A+（PCやOSの基礎）から一歩進み、次段の Security+ や Cloud+、CCNA などへの橋渡し役を担う、いわば<strong>ネットワークエンジニアとしての最初の共通言語</strong>を身につける資格です。
                    </p>
                </section>

                <section id="target-audience" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-users" aria-hidden="true" />
                        </span>
                        2. この資格はどんな人に向いているか
                    </h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>主な対象者</td>
                                <td>
                                    未経験からネットワーク・インフラ分野を目指す人、社内SE、ヘルプデスク担当者、サーバー/インフラエンジニア志望者
                                </td>
                            </tr>
                            <tr>
                                <td>推奨される前提資格</td>
                                <td>CompTIA A+（必須ではないが推奨）</td>
                            </tr>
                            <tr>
                                <td>推奨される実務経験</td>
                                <td>
                                    ジュニアネットワーク管理者・ネットワークサポート技術者として9〜12ヶ月程度の実務経験
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    取得後に想定される職務<br />
                                    <span style={{ color: 'var(--color-text-tertiary)', fontSize: '12px' }}>
                                        （NICE/DoD 8140の職務区分に基づく）
                                    </span>
                                </td>
                                <td>
                                    テクニカルサポートスペシャリスト、ネットワークオペレーションスペシャリスト、システム管理者
                                </td>
                            </tr>
                            <tr>
                                <td>次のステップとして繋がる資格例</td>
                                <td>CompTIA Security+、CompTIA Cloud+、ベンダー資格（CCNAなど）</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        実務未経験でも受験は可能ですが、公式には上記の経験レベルが推奨されています。独学の場合は、自宅ラボやシミュレーターで手を動かしながら学ぶことが理解の定着に役立ちます。
                    </p>
                </section>

                <section id="exam-info" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-info-circle" aria-hidden="true" />
                        </span>
                        3. 試験の基本情報
                    </h2>
                    <p>
                        2026年7月時点で最新の試験バージョンは <strong>V9（試験コード N10-009）</strong> です。旧バージョン N10-008 からの改訂版として、2024年6月20日にリリースされました。
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>試験バージョン</td>
                                <td>V9</td>
                            </tr>
                            <tr>
                                <td>試験コード</td>
                                <td>N10-009</td>
                            </tr>
                            <tr>
                                <td>リリース日</td>
                                <td>2024年6月20日</td>
                            </tr>
                            <tr>
                                <td>問題数</td>
                                <td>最大90問（多肢選択式 + パフォーマンスベース問題の混在）</td>
                            </tr>
                            <tr>
                                <td>試験時間</td>
                                <td>90分</td>
                            </tr>
                            <tr>
                                <td>合格ライン</td>
                                <td>720点（100〜900点のスケール中）</td>
                            </tr>
                            <tr>
                                <td>出題言語</td>
                                <td>英語・ドイツ語・日本語・ポルトガル語・スペイン語</td>
                            </tr>
                            <tr>
                                <td>退役（後継版への切り替え）目安</td>
                                <td>リリースからおよそ3年後（2027年頃と推定）</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="callout callout-info">
                        <i className="ti ti-bulb" aria-hidden="true" />
                        <div>
                            <p>
                                <strong>パフォーマンスベース問題</strong>とは、選択肢から選ぶだけでなく、シミュレーション画面上でネットワーク構成やコマンド操作を実際に行わせるタイプの実技系設問です。知識の暗記だけでなく、実際の操作手順を体で覚えておく必要があります。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="domains" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-chart-pie" aria-hidden="true" />
                        </span>
                        4. 出題範囲と配点（5つのドメイン）
                    </h2>
                    <p>
                        Network+ (N10-009) の出題範囲は、以下の5つの「ドメイン」に分かれています。ドメインごとの配点比率を把握することは、学習の優先順位を決めるうえで非常に重要です。
                    </p>

                    <div className="diagram-block">
                        <div className="diagram-head" style={{ '--diagram-accent': 'var(--c-purple-200)' } as React.CSSProperties}>
                            <i className="ti ti-chart-pie" aria-hidden="true" />
                            <span>図: ドメイン別の配点比率</span>
                        </div>
                        <div className="diagram-body">
                            <div className="mermaid-wrap">
                                <MermaidDiagram
                                    chart={DIAGRAMS['dg-pie']}
                                    ariaLabel="ドメイン配点比率の円グラフ"
                                    preserveNaturalScale={true}
                                />
                            </div>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="num">No.</th>
                                <th scope="col">ドメイン名</th>
                                <th scope="col" className="pct">配点比率</th>
                                <th scope="col">ひとことで言うと</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="num">1</td>
                                <td>
                                    <span className="domain-dot" style={{ background: 'var(--c-purple-200)' }} />
                                    ネットワークの概念
                                </td>
                                <td className="pct">23%</td>
                                <td>用語・OSIモデル・プロトコル・トポロジーなどの土台知識</td>
                            </tr>
                            <tr>
                                <td className="num">2</td>
                                <td>
                                    <span className="domain-dot" style={{ background: 'var(--c-teal-200)' }} />
                                    ネットワークの実装
                                </td>
                                <td className="pct">20%</td>
                                <td>ルーティング・スイッチング・無線設定など「構築する力」</td>
                            </tr>
                            <tr>
                                <td className="num">3</td>
                                <td>
                                    <span className="domain-dot" style={{ background: 'var(--c-coral-200)' }} />
                                    ネットワークの運用
                                </td>
                                <td className="pct">19%</td>
                                <td>ドキュメント化・監視・災害復旧など「運用する力」</td>
                            </tr>
                            <tr>
                                <td className="num">4</td>
                                <td>
                                    <span className="domain-dot" style={{ background: 'var(--c-pink-200)' }} />
                                    ネットワークセキュリティ
                                </td>
                                <td className="pct">14%</td>
                                <td>認証・攻撃手法・防御策など「守る力」</td>
                            </tr>
                            <tr>
                                <td className="num">5</td>
                                <td>
                                    <span className="domain-dot" style={{ background: 'var(--c-amber-200)' }} />
                                    ネットワークのトラブルシューティング
                                </td>
                                <td className="pct">24%</td>
                                <td>障害を切り分け、直す「診断する力」</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        最も配点が高いのは「トラブルシューティング（24%）」で、次いで「概念（23%）」です。この2つだけで全体の約半分を占めるため、学習の軸に据えるべき分野といえます。
                    </p>
                </section>

                <section id="domain-details" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-list-details" aria-hidden="true" />
                        </span>
                        5. 各ドメインの詳細解説
                    </h2>

                    <div className="domain-card" style={{ '--domain-accent': 'var(--c-purple-200)', '--domain-accent-bg': 'var(--c-purple-800)', '--domain-accent-text': 'var(--c-purple-100)' } as React.CSSProperties}>
                        <div className="domain-card-head">
                            <div className="domain-num">1</div>
                            <h3>ネットワークの概念</h3>
                            <span className="domain-weight">23%</span>
                        </div>
                        <p>ネットワークを理解するための「語彙」と「地図」にあたる分野です。</p>
                        <ul>
                            <li><strong>OSI参照モデルの7層</strong>（第6章で詳しく解説）</li>
                            <li><strong>ネットワーク機器</strong>：ルーター、スイッチ、ファイアウォール、IDS/IPS、ロードバランサー、プロキシ、NAS、SANなど</li>
                            <li><strong>クラウドの基礎概念</strong>：NFV（ネットワーク機能仮想化）、VPC、クラウドゲートウェイ、デプロイモデル（パブリック/プライベート/ハイブリッド）、サービスモデル（SaaS/IaaS/PaaS）</li>
                            <li><strong>ポートとプロトコル</strong>：FTP、SFTP、SSH、Telnet、SMTP、DNS、DHCP、HTTP/HTTPS、SNMP、LDAP、RDP、SIPなど</li>
                            <li><strong>トラフィックの種類</strong>：ユニキャスト、マルチキャスト、エニーキャスト、ブロードキャスト</li>
                            <li><strong>伝送メディア</strong>：無線（802.11、セルラー、衛星）、有線（光ファイバー、同軸ケーブル、DACケーブル）</li>
                            <li><strong>コネクタ・トランシーバー</strong>：SC、LC、ST、MPO、RJ11、RJ45、F型、BNCなど</li>
                            <li><strong>ネットワークトポロジー</strong>：メッシュ、ハイブリッド、スター型、スパイン&amp;リーフ、ポイントツーポイント、3層構造、コラプスドコアなど</li>
                            <li><strong>IPv4アドレッシング</strong>：パブリック/プライベートアドレス、APIPA、RFC1918、ループバック、サブネット化（VLSM、CIDR）、アドレスクラス（A〜E）</li>
                        </ul>
                    </div>

                    <div className="domain-card" style={{ '--domain-accent': 'var(--c-teal-200)', '--domain-accent-bg': 'var(--c-teal-800)', '--domain-accent-text': 'var(--c-teal-100)' } as React.CSSProperties}>
                        <div className="domain-card-head">
                            <div className="domain-num">2</div>
                            <h3>ネットワークの実装</h3>
                            <span className="domain-weight">20%</span>
                        </div>
                        <p>実際に「動くネットワーク」を組み立てる分野です。</p>
                        <ul>
                            <li><strong>ルーティング技術</strong>：静的/動的ルーティング（BGP、EIGRP、OSPF）、経路選択、NAT、PAT、FHRP、VIP、サブインターフェース</li>
                            <li><strong>スイッチング技術</strong>：VLAN、インターフェース設定、スパニングツリー、MTU、ジャンボフレーム</li>
                            <li><strong>無線機器の設定</strong>：チャネル、周波数帯、SSID、ネットワークタイプ、暗号化方式、ゲストネットワーク、認証方式、アンテナ、アクセスポイント</li>
                            <li><strong>物理的な設置</strong>：設置上の注意点、電源要件、環境要因</li>
                        </ul>
                    </div>

                    <div className="domain-card" style={{ '--domain-accent': 'var(--c-coral-200)', '--domain-accent-bg': 'var(--c-coral-800)', '--domain-accent-text': 'var(--c-coral-100)' } as React.CSSProperties}>
                        <div className="domain-card-head">
                            <div className="domain-num">3</div>
                            <h3>ネットワークの運用</h3>
                            <span className="domain-weight">19%</span>
                        </div>
                        <p>構築したネットワークを「維持し続ける」ための分野です。</p>
                        <ul>
                            <li><strong>ドキュメント管理</strong>：物理図/論理図、ラック図、ケーブルマップ、ネットワーク図、資産管理、IPAM、SLA、無線サーベイ</li>
                            <li><strong>ライフサイクル管理</strong>：EOL（提供終了）、EOS（サポート終了）、ソフトウェア管理、廃棄・撤去</li>
                            <li><strong>変更管理</strong>：変更申請プロセスの追跡</li>
                            <li><strong>構成管理</strong>：本番構成、バックアップ構成、ベースライン構成</li>
                            <li><strong>ネットワーク監視</strong>：SNMP、フローデータ、パケットキャプチャ、ベースラインメトリクス、ログ集約、API連携、ポートミラーリング</li>
                            <li><strong>災害復旧</strong>：RPO、RTO、MTTR、MTBF、コールド/ウォーム/ホットサイト、アクティブ-アクティブ/アクティブ-パッシブ構成、復旧テスト</li>
                            <li><strong>ネットワークサービス</strong>：DHCP、SLAAC、DNS、NTP、PTP、NTS</li>
                            <li><strong>アクセス管理</strong>：VPN、SSH、GUI、API、コンソール接続</li>
                        </ul>
                    </div>

                    <div className="domain-card" style={{ '--domain-accent': 'var(--c-pink-200)', '--domain-accent-bg': 'var(--c-pink-800)', '--domain-accent-text': 'var(--c-pink-100)' } as React.CSSProperties}>
                        <div className="domain-card-head">
                            <div className="domain-num">4</div>
                            <h3>ネットワークセキュリティ</h3>
                            <span className="domain-weight">14%</span>
                        </div>
                        <p>配点は最も低いですが、実務では最重要とも言える分野です。</p>
                        <ul>
                            <li><strong>論理的セキュリティ</strong>：暗号化（通信中/保管中データ）、PKI、IAM、多要素認証（MFA）、SSO、RADIUS、LDAP、SAML、TACACS+、時間ベース認証、最小権限の原則、ロールベースアクセス制御、ジオフェンシング</li>
                            <li><strong>物理的セキュリティ</strong>：監視カメラ、施錠管理</li>
                            <li><strong>欺瞞技術</strong>：ハニーポット、ハニーネット</li>
                            <li><strong>セキュリティ用語</strong>：リスク、脆弱性、エクスプロイト、脅威、CIAトライアド（機密性・完全性・可用性）</li>
                            <li><strong>監査とコンプライアンス</strong>：データローカリティ、PCI DSS、GDPR</li>
                            <li><strong>ネットワークセグメンテーション</strong>：IoT、IIoT、SCADA、ICS、OT、ゲストネットワーク、BYOD</li>
                            <li><strong>攻撃の種類</strong>：DoS/DDoS、VLANホッピング、MACフラッディング、ARPポイズニング、DNSポイズニング、不正機器・不正サービス、Evil Twin、中間者攻撃、ソーシャルエンジニアリング（フィッシング、ダンプスター・ダイビング、ショルダーサーフィン、テールゲーティング）</li>
                            <li><strong>防御機能</strong>：デバイスハードニング、NAC、鍵管理、ACL、URL/コンテンツフィルタリング、信頼/非信頼ゾーン、スクリーンドサブネット</li>
                        </ul>
                    </div>

                    <div className="domain-card" style={{ '--domain-accent': 'var(--c-amber-200)', '--domain-accent-bg': 'var(--c-amber-800)', '--domain-accent-text': 'var(--c-amber-100)' } as React.CSSProperties}>
                        <div className="domain-card-head">
                            <div className="domain-num">5</div>
                            <h3>ネットワークのトラブルシューティング ― 最重要ドメイン</h3>
                            <span className="domain-weight">24%</span>
                        </div>
                        <p>
                            配点が最も高いこのドメインの核心は、<strong>体系立った障害切り分けの手順（トラブルシューティング方法論）</strong>です。CompTIAが定義する手順は以下の流れで進みます。
                        </p>

                        <div className="diagram-block">
                            <div className="diagram-head" style={{ '--diagram-accent': 'var(--c-amber-200)' } as React.CSSProperties}>
                                <i className="ti ti-list-numbers" aria-hidden="true" />
                                <span>図: CompTIA標準のトラブルシューティング方法論（6ステップ）</span>
                            </div>
                            <div className="diagram-body">
                                <div className="mermaid-wrap">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['dg-troubleshoot']}
                                        ariaLabel="トラブルシューティング6ステップのフロー図"
                                        preserveNaturalScale={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="callout callout-warning">
                            <i className="ti ti-alert-triangle" aria-hidden="true" />
                            <div>
                                <p>
                                    この6ステップは Network+ に限らず、A+ や Security+ でも共通する CompTIA 標準の障害対応フレームワークであり、実務でも極めて有効な思考の型です。
                                </p>
                            </div>
                        </div>

                        <p>このドメインでは、この方法論に加えて以下も問われます。</p>
                        <ul>
                            <li><strong>ケーブル・物理層の問題</strong>：ケーブル種別の誤り、信号劣化、終端処理の不良、TX/RXの入れ違い、インターフェースのエラーカウンタ増加、PoE不良、トランシーバーの規格不一致</li>
                            <li><strong>ネットワークサービスの問題</strong>：STPやVLAN割り当ての不備、ACL設定ミス、ルーティングテーブルやデフォルトゲートウェイの誤り、アドレスプールの枯渇</li>
                            <li><strong>性能問題</strong>：輻輳、レイテンシ、パケットロス、無線干渉</li>
                            <li><strong>診断ツール</strong>：プロトコルアナライザー、コマンドラインツール（ping、tracert/traceroute、nslookupなど）、ケーブルテスター、Wi-Fiアナライザー</li>
                        </ul>
                    </div>
                </section>

                <section id="osi" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-stack-2" aria-hidden="true" />
                        </span>
                        6. 基礎知識：OSI参照モデル
                    </h2>
                    <p>
                        ネットワークの概念ドメインで必ず出題されるのが OSI参照モデルです。7つの層それぞれの役割を最初に押さえておくと、以降のプロトコル学習が格段に理解しやすくなります。
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">レイヤー</th>
                                <th scope="col">名称</th>
                                <th scope="col">役割のイメージ</th>
                                <th scope="col">代表的なプロトコル・技術例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="num">7</td>
                                <td>アプリケーション層</td>
                                <td>利用者が触れるアプリの通信仕様</td>
                                <td>HTTP/HTTPS, DNS, SMTP</td>
                            </tr>
                            <tr>
                                <td className="num">6</td>
                                <td>プレゼンテーション層</td>
                                <td>データの形式変換・暗号化・圧縮</td>
                                <td>SSL/TLS, JPEG</td>
                            </tr>
                            <tr>
                                <td className="num">5</td>
                                <td>セッション層</td>
                                <td>通信の開始・維持・終了の管理</td>
                                <td>NetBIOS, RPC</td>
                            </tr>
                            <tr>
                                <td className="num">4</td>
                                <td>トランスポート層</td>
                                <td>信頼性のあるデータ転送の制御</td>
                                <td>TCP, UDP</td>
                            </tr>
                            <tr>
                                <td className="num">3</td>
                                <td>ネットワーク層</td>
                                <td>経路選択（ルーティング）</td>
                                <td>IP, ICMP</td>
                            </tr>
                            <tr>
                                <td className="num">2</td>
                                <td>データリンク層</td>
                                <td>同一ネットワーク内の通信制御</td>
                                <td>Ethernet, MACアドレス, スイッチ</td>
                            </tr>
                            <tr>
                                <td className="num">1</td>
                                <td>物理層</td>
                                <td>電気信号・光信号などの物理伝送</td>
                                <td>ケーブル, コネクタ, ハブ</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="callout callout-info">
                        <i className="ti ti-bulb" aria-hidden="true" />
                        <div>
                            <p>
                                学習のコツとして、上位層（7〜5）は「アプリやセッションの世界」、中位層（4〜3）は「データを届ける仕組み」、下位層（2〜1）は「物理的な配線の世界」と大まかに区分して覚えると整理しやすくなります。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="roadmap" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-route" aria-hidden="true" />
                        </span>
                        7. 学習を始めるステップバイステップ
                    </h2>
                    <p>以下は、初学者がゼロから合格までたどる標準的な学習ロードマップです。</p>

                    <div className="diagram-block">
                        <div className="diagram-head" style={{ '--diagram-accent': 'var(--c-purple-200)' } as React.CSSProperties}>
                            <i className="ti ti-route" aria-hidden="true" />
                            <span>図: 初学者向け学習ロードマップ</span>
                        </div>
                        <div className="diagram-body">
                            <div className="mermaid-wrap">
                                <MermaidDiagram
                                    chart={DIAGRAMS['dg-roadmap']}
                                    ariaLabel="学習ロードマップのフェーズ図"
                                    preserveNaturalScale={true}
                                />
                            </div>
                        </div>
                    </div>

                    <p>
                        ポイントは、ステップ3〜5の「学習 → 模擬試験 → 復習」のループを、配点の高いドメイン（トラブルシューティング24%・概念23%）を中心に何周も回すことです。一度で完璧を目指すより、反復による定着を重視するほうが効率的です。
                    </p>
                </section>

                <section id="materials" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-books" aria-hidden="true" />
                        </span>
                        8. 学習教材の選び方
                    </h2>
                    <p>
                        CompTIAは公式学習製品として「CertMaster」シリーズを提供しており、学習段階に応じて4種類から選べます。
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">製品</th>
                                <th scope="col">主な対象者</th>
                                <th scope="col">主な内容</th>
                                <th scope="col">目安学習時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CertMaster Perform</td>
                                <td>実務経験ゼロから、実技力もまとめて身につけたい人</td>
                                <td>
                                    講義・動画・インタラクティブ教材・実機/シミュレーション両方のラボ・模擬試験
                                </td>
                                <td>30〜60時間</td>
                            </tr>
                            <tr>
                                <td>CertMaster Learn</td>
                                <td>基礎知識をゼロから体系的に積み上げたい人</td>
                                <td>
                                    講義・動画・インタラクティブ教材・シミュレーションラボ・模擬試験
                                </td>
                                <td>25〜40時間</td>
                            </tr>
                            <tr>
                                <td>CertMaster Practice</td>
                                <td>一定の知識・経験があり、弱点を確認して仕上げたい人</td>
                                <td>タイム制の模擬試験、分野別クイズ、習熟度スコア</td>
                                <td>10〜20時間</td>
                            </tr>
                            <tr>
                                <td>CertMaster Labs</td>
                                <td>実際の操作を通じて実践力を鍛えたい人</td>
                                <td>実際の仮想マシン環境でのハンズオン課題</td>
                                <td>15〜25時間</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>独学で進める場合の考え方</h3>
                    <ul>
                        <li>知識ゼロに近い場合 → Learn（またはPerform）で基礎から積み上げる</li>
                        <li>
                            ある程度知識がある場合 → Practiceで弱点を把握してから、必要な範囲だけLearnで補強する
                        </li>
                        <li>
                            手を動かす経験が不足している場合 → Labsやホームラボ（中古スイッチ・ルーター、あるいはGNS3/Packet Tracerなどのシミュレーターソフト）を併用する
                        </li>
                    </ul>
                </section>

                <section id="exam-day" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-calendar-event" aria-hidden="true" />
                        </span>
                        9. 試験当日の流れ
                    </h2>

                    <div className="diagram-block">
                        <div className="diagram-head" style={{ '--diagram-accent': 'var(--c-coral-200)' } as React.CSSProperties}>
                            <i className="ti ti-calendar-event" aria-hidden="true" />
                            <span>図: 試験当日の流れ（合格ライン: 720/900点）</span>
                        </div>
                        <div className="diagram-body">
                            <div className="mermaid-wrap">
                                <MermaidDiagram
                                    chart={DIAGRAMS['dg-examday']}
                                    ariaLabel="試験当日の時間配分とPBQ攻略の戦略図"
                                    preserveNaturalScale={true}
                                />
                            </div>
                        </div>
                    </div>

                    <p>
                        試験はテストセンターでの受験、またはオンライン監督下（オンラインプロクタリング）での受験のいずれかを選べるのが一般的です（詳細な受験方式や予約方法は、公式サイトまたは試験申込プラットフォームで最新情報を確認してください）。
                    </p>
                </section>

                <section id="study-time" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-clock-hour-4" aria-hidden="true" />
                        </span>
                        10. 学習時間の目安
                    </h2>
                    <p>
                        学習教材ごとの目安時間（第8章）を踏まえると、経験レベル別のおおよその総学習期間は次のように整理できます。あくまで一般的な目安であり、個人差があります。
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">経験レベル</th>
                                <th scope="col">想定される学習アプローチ</th>
                                <th scope="col">目安総学習時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>IT未経験・A+未取得</td>
                                <td>Learn（またはPerform）でゼロから体系的に学習</td>
                                <td>40〜60時間程度</td>
                            </tr>
                            <tr>
                                <td>A+取得済み・実務未経験</td>
                                <td>Learn + Practiceで知識を補強しつつ演習</td>
                                <td>25〜40時間程度</td>
                            </tr>
                            <tr>
                                <td>実務経験あり（9〜12ヶ月相当）</td>
                                <td>Practice中心に弱点補強</td>
                                <td>10〜20時間程度</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="callout callout-success">
                        <i className="ti ti-circle-check" aria-hidden="true" />
                        <div>
                            <p>
                                1日1〜2時間の学習ペースであれば、未経験者でもおおむね1〜2ヶ月程度で一巡できる計算になります。ただし、トラブルシューティング（24%）と概念（23%）は反復学習が必要なため、余裕を持ったスケジュールを組むことをおすすめします。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="faq" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-help-circle" aria-hidden="true" />
                        </span>
                        11. よくある質問（FAQ）
                    </h2>

                    <div className="faq-item">
                        <div className="faq-q">
                            <i className="ti ti-message-circle-2" aria-hidden="true" />
                            <span>Q1. CompTIA A+ を先に取っていないと受験できませんか？</span>
                        </div>
                        <p className="faq-a">
                            A+ は必須の前提資格ではありません。ただし公式には「A+相当の知識 + 9〜12ヶ月の実務経験」が推奨レベルとして示されているため、未経験者はA+の内容（PCやOSの基礎）に軽く触れておくと理解がスムーズです。
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-q">
                            <i className="ti ti-message-circle-2" aria-hidden="true" />
                            <span>Q2. パフォーマンスベース問題とは何ですか？</span>
                        </div>
                        <p className="faq-a">
                            選択肢を選ぶだけの設問とは異なり、シミュレーション画面上でネットワーク構成やコマンド操作を実際に行わせる実技形式の設問です。知識だけでなく操作手順の習熟が求められます。
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-q">
                            <i className="ti ti-message-circle-2" aria-hidden="true" />
                            <span>Q3. 不合格だった場合はどうすればよいですか？</span>
                        </div>
                        <p className="faq-a">
                            試験後に配布されるスコアレポートで、ドメインごとの得点傾向を確認できます。弱点ドメインを重点的に復習し、再受験の計画を立てましょう（第7章の学習ロードマップのループを参照）。
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-q">
                            <i className="ti ti-message-circle-2" aria-hidden="true" />
                            <span>Q4. Network+ の次に取得すべき資格は？</span>
                        </div>
                        <p className="faq-a">
                            セキュリティ分野に進みたい場合は CompTIA Security+、クラウド分野に進みたい場合は CompTIA Cloud+、特定ベンダー技術を深めたい場合は Cisco CCNA などが一般的な進路として挙げられます。
                        </p>
                    </div>
                </section>

                <section id="summary" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-checklist" aria-hidden="true" />
                        </span>
                        12. まとめ
                    </h2>
                    <p>
                        CompTIA Network+ (N10-009) は、以下の5ドメインから幅広く出題される、ベンダーニュートラルなネットワーク基礎資格です。
                    </p>
                    <ol>
                        <li>ネットワークの概念（23%）</li>
                        <li>ネットワークの実装（20%）</li>
                        <li>ネットワークの運用（19%）</li>
                        <li>ネットワークセキュリティ（14%）</li>
                        <li>ネットワークのトラブルシューティング（24%）</li>
                    </ol>
                    <p>
                        配点の高い「トラブルシューティング」と「概念」を学習の軸に据え、「学習 → 模擬試験 → 弱点復習」のループを回すことが、効率的な合格への近道です。OSI参照モデルのような基礎的な地図を最初に頭に入れておくことで、以降の学習全体の理解速度が大きく変わります。
                    </p>
                </section>

                <section id="references" className="section-block">
                    <h2>
                        <span className="h2-icon">
                            <i className="ti ti-link" aria-hidden="true" />
                        </span>
                        13. 参考文献・出典
                    </h2>
                    <p>
                        本ガイドの試験詳細・出題範囲・学習教材情報は、以下のCompTIA公式ページの内容に基づいています（アクセス日: 2026年7月21日）。
                    </p>

                    <div className="ref-box">
                        <div className="ref-box-left">
                            <i className="ti ti-external-link" aria-hidden="true" />
                            <div>
                                <div className="ref-box-title">
                                    CompTIA公式サイト「Network+ (Plus) Certification」
                                </div>
                                <div className="ref-box-sub">comptia.org</div>
                            </div>
                        </div>
                        <a
                            className="btn-link"
                            href="https://www.comptia.org/en-us/certifications/network/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            開く
                        </a>
                    </div>

                    <div className="callout callout-warning">
                        <i className="ti ti-alert-triangle" aria-hidden="true" />
                        <div>
                            <p>
                                試験内容・配点・料金・退役時期などは予告なく変更される場合があります。受験前に必ず公式サイトで最新情報をご確認ください。
                            </p>
                        </div>
                    </div>

                    <div className="footer-note">
                        CompTIA Network+ 試験 完全ガイド ― 初学者のためのステップバイステップ解説
                    </div>
                </section>
            </main>
        </div>
    );
}
