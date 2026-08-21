'use client';

import React, { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

/**
 * CompTIA Network+（N10-009）Domain 1.0「Networking Concepts」を8ステップで学べる日本語ガイドを表示します。
 */
export function ComptiaNetworkingConceptsGuide() {
    return (
        <div className="comptia-networking-concepts-page">
            <div className="layout">
                <NavBar />
                <main className="main content">
                    <header className="hero" id="intro" tabIndex={-1}>
                        <span className="hero-badge">CompTIA Network+ (N10-009) 試験対策ガイド</span>
                        <h1 className="hero-title">Domain 1.0: Networking Concepts</h1>
                        <p className="hero-sub">
                            出題比率23%を占めるネットワーク基礎分野を、公式Exam Objectivesの1.1〜1.8に沿って8ステップで解説します。
                        </p>
                        <p className="hero-meta">
                            <span>8 ステップ構成</span>
                            <span className="dot">・</span>
                            <span>出題比率 23%</span>
                            <span className="dot">・</span>
                            <span>Mermaid図解 19点</span>
                        </p>
                    </header>

                    <section id="overview" tabIndex={-1}>
                        <h2>この章について</h2>
                        <p>
                            CompTIA Network+ は、企業ネットワークの構築・運用・保守・トラブルシューティングに必要な知識を証明する資格です。試験は5つのドメインで構成されており、その中でも <strong>Domain 1.0 Networking Concepts</strong> は出題比率が23%と、Domain 5.0 Network Troubleshooting（24%）に次いで2番目に大きい配点を占めています。
                        </p>
                        <p>
                            この章は、公式の Exam Objectives に定義された <strong>1.1〜1.8</strong> の8つのサブ目標を、そのままステップ1〜8として扱い、初学者でも順を追って理解できるように解説します。
                        </p>
                        <div className="callout">
                            <i className="ti ti-alert-circle"></i>
                            <p>
                                本ガイドは学習用の解説であり、CompTIA の公式教材ではありません。試験直前は必ず公式サイト（末尾の参考文献を参照）で最新情報を確認してください。
                            </p>
                        </div>
                        <table className="toc-table">
                            <thead>
                                <tr></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ステップ1</td>
                                    <td>1.1 OSI参照モデル</td>
                                </tr>
                                <tr>
                                    <td>ステップ2</td>
                                    <td>1.2 ネットワーク機器・アプリケーション・機能</td>
                                </tr>
                                <tr>
                                    <td>ステップ3</td>
                                    <td>1.3 クラウドの概念と接続オプション</td>
                                </tr>
                                <tr>
                                    <td>ステップ4</td>
                                    <td>1.4 ポート・プロトコル・トラフィックの種類</td>
                                </tr>
                                <tr>
                                    <td>ステップ5</td>
                                    <td>1.5 伝送メディアとトランシーバー</td>
                                </tr>
                                <tr>
                                    <td>ステップ6</td>
                                    <td>1.6 ネットワークトポロジーとアーキテクチャ</td>
                                </tr>
                                <tr>
                                    <td>ステップ7</td>
                                    <td>1.7 IPv4アドレッシング</td>
                                </tr>
                                <tr>
                                    <td>ステップ8</td>
                                    <td>1.8 進化するネットワーク環境のユースケース</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="step1" tabIndex={-1}>
                        <h2>ステップ1（1.1）: OSI参照モデルを理解する</h2>
                        <p>
                            OSI（Open Systems Interconnection）参照モデルは、ネットワーク通信を7つの層に分解した概念モデルです。実際のプロトコルスタック（TCP/IPモデル）と1対1で対応するわけではありませんが、「どの層で何が起きているか」を整理して考えるための共通言語として、試験でも実務でも頻繁に使われます。
                        </p>

                        <h3>7つの層</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">層番号</th>
                                    <th scope="col">層の名前（英語）</th>
                                    <th scope="col">日本語</th>
                                    <th scope="col">主なPDU</th>
                                    <th scope="col">代表的な例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>7</td>
                                    <td>Application</td>
                                    <td>アプリケーション層</td>
                                    <td>Data</td>
                                    <td>HTTP, DNS, SMTP</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Presentation</td>
                                    <td>プレゼンテーション層</td>
                                    <td>Data</td>
                                    <td>暗号化, 文字コード変換, 圧縮</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Session</td>
                                    <td>セッション層</td>
                                    <td>Data</td>
                                    <td>セッションの確立・維持・終了</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Transport</td>
                                    <td>トランスポート層</td>
                                    <td>Segment / Datagram</td>
                                    <td>TCP, UDP</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Network</td>
                                    <td>ネットワーク層</td>
                                    <td>Packet</td>
                                    <td>IP, ルーター</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Data Link</td>
                                    <td>データリンク層</td>
                                    <td>Frame</td>
                                    <td>Ethernet, スイッチ, MACアドレス</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Physical</td>
                                    <td>物理層</td>
                                    <td>Bit</td>
                                    <td>ケーブル, コネクタ, 電気/光信号</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>層の並び</h3>
                        <Diagram id="diag-step1-osi" label="OSI参照モデルの7層の並び" />

                        <h3>カプセル化と非カプセル化</h3>
                        <p>
                            データを送信するとき、Application層で作られたデータは各層を降りるたびにヘッダーが付加されます。これを「カプセル化」と呼びます。受信側では逆に、各層でヘッダーを取り除きながら上位層へ渡します。これが「非カプセル化」です。
                        </p>
                        <Diagram id="diag-step1-encap" label="送信側のカプセル化と受信側の非カプセル化の流れ" />

                        <h3>学習のポイント</h3>
                        <p>
                            トラブルシューティングでは「OSIモデルの上から下（またはその逆）に切り分けていく」考え方の土台になります。スイッチは基本的にLayer 2、ルーターはLayer 3で動作しますが、マルチレイヤースイッチのようにLayer 3機能を持つ機器も存在します。
                        </p>
                    </section>

                    <section id="step2" tabIndex={-1}>
                        <h2>ステップ2（1.2）: ネットワーク機器・アプリケーション・機能</h2>
                        <p>
                            ネットワークを構成する物理/仮想アプライアンス、アプリケーション、機能を整理します。
                        </p>

                        <h3>物理/仮想アプライアンス</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">機器</th>
                                    <th scope="col">主に動作するOSI層</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Router（ルーター）</td>
                                    <td>Layer 3</td>
                                    <td>異なるネットワーク間でパケットを転送する経路選択装置</td>
                                </tr>
                                <tr>
                                    <td>Switch（スイッチ）</td>
                                    <td>Layer 2（一部Layer 3対応）</td>
                                    <td>MACアドレスを基に同一ネットワーク内でフレームを転送する</td>
                                </tr>
                                <tr>
                                    <td>Firewall（ファイアウォール）</td>
                                    <td>Layer 3〜7</td>
                                    <td>通信ルールに基づき許可/拒否を判断し、ネットワークを保護する</td>
                                </tr>
                                <tr>
                                    <td>IDS/IPS</td>
                                    <td>Layer 3〜7</td>
                                    <td>不正な通信パターンを検知（IDS）または遮断（IPS）する</td>
                                </tr>
                                <tr>
                                    <td>Load balancer（ロードバランサー）</td>
                                    <td>Layer 4〜7</td>
                                    <td>複数サーバーへ通信を分散し、可用性とスケーラビリティを向上させる</td>
                                </tr>
                                <tr>
                                    <td>Proxy（プロキシ）</td>
                                    <td>Layer 7</td>
                                    <td>クライアントに代わって外部と通信を仲介し、キャッシュやフィルタリングを行う</td>
                                </tr>
                                <tr>
                                    <td>NAS</td>
                                    <td>Layer 7（ファイル単位）</td>
                                    <td>ネットワーク経由でファイル単位のストレージを提供する</td>
                                </tr>
                                <tr>
                                    <td>SAN</td>
                                    <td>専用ネットワーク</td>
                                    <td>ブロック単位のストレージを高速な専用ネットワークで提供する</td>
                                </tr>
                                <tr>
                                    <td>Wireless Access Point</td>
                                    <td>Layer 1〜2</td>
                                    <td>無線クライアントを有線ネットワークへ接続する</td>
                                </tr>
                                <tr>
                                    <td>Wireless Controller</td>
                                    <td>管理プレーン</td>
                                    <td>複数のAPを一元的に構成・管理する</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>アプリケーションと機能</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CDN</td>
                                    <td>コンテンツを地理的に分散したサーバーにキャッシュし、利用者に近い場所から配信することで速度と可用性を高める</td>
                                </tr>
                                <tr>
                                    <td>VPN</td>
                                    <td>公衆ネットワーク上に暗号化されたトンネルを作り、プライベートな通信を実現する機能</td>
                                </tr>
                                <tr>
                                    <td>QoS</td>
                                    <td>音声やビデオなど遅延に敏感なトラフィックを優先的に処理する仕組み</td>
                                </tr>
                                <tr>
                                    <td>TTL</td>
                                    <td>パケットがネットワーク上を巡回し続けないよう、ホップごとに減算されるカウンター</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>一般的な配置イメージ</h3>
                        <Diagram id="diag-step2-placement" label="ネットワーク機器とサーバーの一般的な配置イメージ" />
                    </section>

                    <section id="step3" tabIndex={-1}>
                        <h2>ステップ3（1.3）: クラウドの概念と接続オプション</h2>

                        <h3>基本用語</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>NFV</td>
                                    <td>ルーターやファイアウォールなどのネットワーク機能をソフトウェアとして仮想化する技術</td>
                                </tr>
                                <tr>
                                    <td>VPC</td>
                                    <td>パブリッククラウド内に論理的に分離された、専用のプライベートネットワーク空間</td>
                                </tr>
                                <tr>
                                    <td>Network security group</td>
                                    <td>VPC内のリソースに適用するステートフルなファイアウォールルール</td>
                                </tr>
                                <tr>
                                    <td>Network security list</td>
                                    <td>サブネット単位で適用される、ステートレスなアクセス制御リスト</td>
                                </tr>
                                <tr>
                                    <td>Internet gateway</td>
                                    <td>VPC内のパブリックサブネットとインターネットを接続するゲートウェイ</td>
                                </tr>
                                <tr>
                                    <td>NAT gateway</td>
                                    <td>プライベートサブネットが送信専用でインターネットにアクセスするためのアドレス変換ゲートウェイ</td>
                                </tr>
                                <tr>
                                    <td>Direct Connect</td>
                                    <td>公衆インターネットを経由せず、専用線でオンプレミス環境とクラウドを接続するサービス</td>
                                </tr>
                                <tr>
                                    <td>Scalability</td>
                                    <td>リソースを追加/削除して需要の変化に対応できる能力（計画的な拡張）</td>
                                </tr>
                                <tr>
                                    <td>Elasticity</td>
                                    <td>需要に応じてリソースを自動的に、かつ迅速に増減できる能力</td>
                                </tr>
                                <tr>
                                    <td>Multitenancy</td>
                                    <td>複数の顧客が物理基盤を共有しつつ、論理的に分離された環境を利用する仕組み</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>クラウドゲートウェイの構成イメージ</h3>
                        <Diagram id="diag-step3-cloud-gw" label="VPCとゲートウェイの構成イメージ" />

                        <h3>デプロイモデル</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">モデル</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Public</td>
                                    <td>クラウド事業者が複数の顧客に共有基盤を提供</td>
                                    <td>コスト重視、迅速な立ち上げ</td>
                                </tr>
                                <tr>
                                    <td>Private</td>
                                    <td>特定の組織専用の基盤</td>
                                    <td>厳格な規制・セキュリティ要件</td>
                                </tr>
                                <tr>
                                    <td>Hybrid</td>
                                    <td>パブリックとプライベートを組み合わせて利用</td>
                                    <td>機密データはプライベート、需要変動はパブリックで吸収</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>サービスモデルと責任分界</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">レイヤー</th>
                                    <th scope="col">IaaS</th>
                                    <th scope="col">PaaS</th>
                                    <th scope="col">SaaS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>アプリケーション・データ</td>
                                    <td>利用者が管理</td>
                                    <td>利用者が管理</td>
                                    <td>提供者が管理</td>
                                </tr>
                                <tr>
                                    <td>ランタイム・ミドルウェア</td>
                                    <td>利用者が管理</td>
                                    <td>提供者が管理</td>
                                    <td>提供者が管理</td>
                                </tr>
                                <tr>
                                    <td>OS</td>
                                    <td>利用者が管理</td>
                                    <td>提供者が管理</td>
                                    <td>提供者が管理</td>
                                </tr>
                                <tr>
                                    <td>仮想化・サーバー・ストレージ・ネットワーク</td>
                                    <td>提供者が管理</td>
                                    <td>提供者が管理</td>
                                    <td>提供者が管理</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="step4" tabIndex={-1}>
                        <h2>ステップ4（1.4）: ポート・プロトコル・トラフィックの種類</h2>

                        <h3>主要なプロトコルとポート番号</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">ポート番号</th>
                                    <th scope="col">トランスポート</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>FTP</td>
                                    <td>20 / 21</td>
                                    <td>TCP</td>
                                    <td>ファイル転送（非暗号化）</td>
                                </tr>
                                <tr>
                                    <td>SFTP</td>
                                    <td>22</td>
                                    <td>TCP</td>
                                    <td>SSH上で暗号化されたファイル転送</td>
                                </tr>
                                <tr>
                                    <td>SSH</td>
                                    <td>22</td>
                                    <td>TCP</td>
                                    <td>暗号化されたリモートCLIアクセス</td>
                                </tr>
                                <tr>
                                    <td>Telnet</td>
                                    <td>23</td>
                                    <td>TCP</td>
                                    <td>非暗号化のリモートCLIアクセス（レガシー）</td>
                                </tr>
                                <tr>
                                    <td>SMTP</td>
                                    <td>25</td>
                                    <td>TCP</td>
                                    <td>メール送信</td>
                                </tr>
                                <tr>
                                    <td>DNS</td>
                                    <td>53</td>
                                    <td>TCP/UDP</td>
                                    <td>ドメイン名の名前解決</td>
                                </tr>
                                <tr>
                                    <td>DHCP</td>
                                    <td>67 / 68</td>
                                    <td>UDP</td>
                                    <td>IPアドレスなどの自動配布</td>
                                </tr>
                                <tr>
                                    <td>TFTP</td>
                                    <td>69</td>
                                    <td>UDP</td>
                                    <td>認証なしの簡易ファイル転送</td>
                                </tr>
                                <tr>
                                    <td>HTTP</td>
                                    <td>80</td>
                                    <td>TCP</td>
                                    <td>非暗号化のWeb通信</td>
                                </tr>
                                <tr>
                                    <td>NTP</td>
                                    <td>123</td>
                                    <td>UDP</td>
                                    <td>時刻同期</td>
                                </tr>
                                <tr>
                                    <td>SNMP</td>
                                    <td>161 / 162</td>
                                    <td>UDP</td>
                                    <td>機器の監視・管理</td>
                                </tr>
                                <tr>
                                    <td>LDAP</td>
                                    <td>389</td>
                                    <td>TCP</td>
                                    <td>ディレクトリサービスへの問い合わせ</td>
                                </tr>
                                <tr>
                                    <td>HTTPS</td>
                                    <td>443</td>
                                    <td>TCP</td>
                                    <td>TLSで暗号化されたWeb通信</td>
                                </tr>
                                <tr>
                                    <td>SMB</td>
                                    <td>445</td>
                                    <td>TCP</td>
                                    <td>Windowsのファイル/プリンター共有</td>
                                </tr>
                                <tr>
                                    <td>Syslog</td>
                                    <td>514</td>
                                    <td>UDP</td>
                                    <td>ログメッセージの収集</td>
                                </tr>
                                <tr>
                                    <td>SMTPS</td>
                                    <td>587</td>
                                    <td>TCP</td>
                                    <td>暗号化されたメール送信</td>
                                </tr>
                                <tr>
                                    <td>LDAPS</td>
                                    <td>636</td>
                                    <td>TCP</td>
                                    <td>暗号化されたディレクトリサービス通信</td>
                                </tr>
                                <tr>
                                    <td>SQL Server</td>
                                    <td>1433</td>
                                    <td>TCP</td>
                                    <td>Microsoft SQL Serverへの接続</td>
                                </tr>
                                <tr>
                                    <td>RDP</td>
                                    <td>3389</td>
                                    <td>TCP</td>
                                    <td>Windowsのリモートデスクトップ接続</td>
                                </tr>
                                <tr>
                                    <td>SIP</td>
                                    <td>5060 / 5061</td>
                                    <td>TCP/UDP</td>
                                    <td>VoIPの呼制御シグナリング（5061はTLS）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>IPの種類</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ICMP</td>
                                    <td>ping や traceroute など、エラー通知・診断に使われる</td>
                                </tr>
                                <tr>
                                    <td>TCP</td>
                                    <td>コネクション指向で信頼性のある通信</td>
                                </tr>
                                <tr>
                                    <td>UDP</td>
                                    <td>コネクションレスで低遅延な通信</td>
                                </tr>
                                <tr>
                                    <td>GRE</td>
                                    <td>異なるプロトコルのパケットをカプセル化してトンネリングする</td>
                                </tr>
                                <tr>
                                    <td>IPSec</td>
                                    <td>AH、ESP、IKEを用いてIP通信を暗号化・認証する</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>トラフィックの種類</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">典型的な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Unicast</td>
                                    <td>1台の送信元から1台の受信先へ送る通信</td>
                                    <td>Webアクセスなど一般的な通信</td>
                                </tr>
                                <tr>
                                    <td>Multicast</td>
                                    <td>1台の送信元から、参加登録した複数の受信先へ送る通信</td>
                                    <td>IPTV配信、ルーティングプロトコルの通知</td>
                                </tr>
                                <tr>
                                    <td>Anycast</td>
                                    <td>同じアドレスを持つ複数の宛先のうち、最も近い1台が応答する通信</td>
                                    <td>パブリックDNSサーバー、CDN</td>
                                </tr>
                                <tr>
                                    <td>Broadcast</td>
                                    <td>同一ネットワークセグメント内の全ホストへ送る通信</td>
                                    <td>ARP要求、DHCP要求</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram id="diag-step4-unicast" label="Unicast: 送信元と受信先が1対1" />
                        <p className="mermaid-caption">Unicast: 送信元と受信先が1対1</p>

                        <Diagram id="diag-step4-multicast" label="Multicast: 参加登録した相手だけに届く" />
                        <p className="mermaid-caption">Multicast: 参加登録した相手だけに届く</p>

                        <Diagram id="diag-step4-anycast" label="Anycast: 同じアドレスを持つ複数拠点のうち最も近い1つが応答する" />
                        <p className="mermaid-caption">
                            Anycast: 同じアドレスを持つ複数拠点のうち最も近い1つが応答する
                        </p>

                        <Diagram id="diag-step4-broadcast" label="Broadcast: 同一セグメント上の全ホストへ届く" />
                        <p className="mermaid-caption">Broadcast: 同一セグメント上の全ホストへ届く</p>

                        <h3>実装例: ポートの疎通確認をPythonで行う</h3>
                        <p>
                            試験範囲ではありませんが、上表のポート番号を実際に確認する感覚をつかむために、TCPポートへの疎通確認を行う簡単なPythonの例を示します。
                        </p>
                        <div className="code-block" role="region" aria-label="TCPポートの疎通確認を行うPythonスクリプト例">
                            <div className="code-line"><span className="code-keyword">import</span> socket</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-keyword">def</span> <span className="code-function">check_tcp_port</span>(host, port, timeout=<span className="code-number">2</span>):</div>
                            <div className="code-line">{'    '}<span className="code-keyword">with</span> socket.socket(socket.AF_INET, socket.SOCK_STREAM) <span className="code-keyword">as</span> sock:</div>
                            <div className="code-line">{'        '}sock.settimeout(timeout)</div>
                            <div className="code-line">{'        '}result = sock.connect_ex((host, port))</div>
                            <div className="code-line">{'        '}<span className="code-keyword">return</span> result == <span className="code-number">0</span></div>
                            <div className="code-line"></div>
                            <div className="code-line">targets = [(<span className="code-string">&quot;example.com&quot;</span>, <span className="code-number">443</span>), (<span className="code-string">&quot;example.com&quot;</span>, <span className="code-number">80</span>)]</div>
                            <div className="code-line"><span className="code-keyword">for</span> host, port <span className="code-keyword">in</span> targets:</div>
                            <div className="code-line">{'    '}is_open = check_tcp_port(host, port)</div>
                            <div className="code-line">{'    '}<span className="code-builtin">print</span>(f<span className="code-string">&quot;&#123;host&#125;:&#123;port&#125; -&gt; &#123;&apos;open&apos; if is_open else &apos;closed/filtered&apos;&#125;&quot;</span>)</div>
                        </div>
                    </section>

                    <section id="step5" tabIndex={-1}>
                        <h2>ステップ5（1.5）: 伝送メディアとトランシーバー</h2>

                        <h3>無線メディア</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>802.11 standards</td>
                                    <td>Wi-Fiの規格群。世代ごとに速度や周波数帯が異なる</td>
                                </tr>
                                <tr>
                                    <td>Cellular</td>
                                    <td>4G/5Gなど携帯電話ネットワーク経由の通信</td>
                                </tr>
                                <tr>
                                    <td>Satellite</td>
                                    <td>地上インフラが届かない地域での通信手段。レイテンシが比較的大きい</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>有線メディア</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>802.3 standards</td>
                                    <td>Ethernetの規格群</td>
                                </tr>
                                <tr>
                                    <td>Single-mode fiber</td>
                                    <td>コア径が細く、長距離・高速伝送に向く光ファイバー</td>
                                </tr>
                                <tr>
                                    <td>Multimode fiber</td>
                                    <td>コア径が太く、短〜中距離向けで比較的安価な光ファイバー</td>
                                </tr>
                                <tr>
                                    <td>DAC cable</td>
                                    <td>銅線を使った短距離の高速接続ケーブル（Twinaxial cableを含む）</td>
                                </tr>
                                <tr>
                                    <td>Coaxial cable</td>
                                    <td>中心導体を絶縁体とシールドで覆った構造</td>
                                </tr>
                                <tr>
                                    <td>Cable speeds</td>
                                    <td>ケーブルやコネクタが対応する伝送速度</td>
                                </tr>
                                <tr>
                                    <td>Plenum vs. non-plenum</td>
                                    <td>プレナム空間で使用可能な難燃性ケーブルかどうかの区分</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>トランシーバー</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">分類</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Protocol: Ethernet</td>
                                    <td>一般的なLAN/WAN向けのイーサネット通信を行うトランシーバー</td>
                                </tr>
                                <tr>
                                    <td>Protocol: Fibre Channel</td>
                                    <td>SANなど、ストレージ専用ネットワークで使われる高速プロトコル</td>
                                </tr>
                                <tr>
                                    <td>Form factor: SFP</td>
                                    <td>小型の着脱式トランシーバーモジュール</td>
                                </tr>
                                <tr>
                                    <td>Form factor: QSFP</td>
                                    <td>SFPの4チャネル版で、より高速な伝送に対応</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>コネクタの種類</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">コネクタ</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SC</td>
                                    <td>光ファイバー用、プッシュプル式で着脱しやすい</td>
                                </tr>
                                <tr>
                                    <td>LC</td>
                                    <td>光ファイバー用、小型で高密度配線に向く</td>
                                </tr>
                                <tr>
                                    <td>ST</td>
                                    <td>光ファイバー用、バヨネット式</td>
                                </tr>
                                <tr>
                                    <td>MPO</td>
                                    <td>複数の光ファイバー心線を一括で接続する高密度コネクタ</td>
                                </tr>
                                <tr>
                                    <td>RJ11</td>
                                    <td>電話回線用の小型コネクタ</td>
                                </tr>
                                <tr>
                                    <td>RJ45</td>
                                    <td>より対線を使ったEthernet用コネクタ</td>
                                </tr>
                                <tr>
                                    <td>F-type</td>
                                    <td>同軸ケーブル用（ケーブルテレビ・ケーブルインターネットなど）</td>
                                </tr>
                                <tr>
                                    <td>BNC</td>
                                    <td>同軸ケーブル用、バヨネット式</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="step6" tabIndex={-1}>
                        <h2>ステップ6（1.6）: ネットワークトポロジーとアーキテクチャ</h2>

                        <h3>Mesh（メッシュ）</h3>
                        <p>
                            すべての、または多くのノードが相互に接続される構成。冗長性が高い一方、配線・管理コストが増加する。
                        </p>
                        <Diagram id="diag-step6-mesh" label="Mesh トポロジーの構成図" />

                        <h3>Star / Hub and spoke（スター型）</h3>
                        <p>
                            中心のハブにすべてのノードが接続される構成。管理はしやすいが、中心が単一障害点になりやすい。
                        </p>
                        <Diagram id="diag-step6-star" label="Star / Hub and spoke トポロジーの構成図" />

                        <h3>Hybrid（ハイブリッド）</h3>
                        <p>
                            複数のトポロジーを組み合わせた構成。冗長性の高いメッシュ構成のコアに、管理しやすいスター構成のアクセス層をぶら下げる例。
                        </p>
                        <Diagram id="diag-step6-hybrid" label="Hybrid トポロジーの構成図" />

                        <h3>Spine and leaf（スパイン・リーフ）</h3>
                        <p>
                            データセンターでよく使われる構成。すべてのLeafスイッチがすべてのSpineスイッチに接続され、East-Westトラフィックを高速かつ低遅延で処理できる。
                        </p>
                        <Diagram id="diag-step6-spine-leaf" label="Spine and leaf トポロジーの構成図" />

                        <h3>Point to point（ポイントツーポイント）</h3>
                        <p>2つの拠点・機器間を直接1本のリンクで接続する、最もシンプルな構成。</p>
                        <Diagram id="diag-step6-p2p" label="Point to point の接続構成図" />

                        <h3>Three-tier hierarchical model（3層階層モデル）</h3>
                        <p>
                            Core、Distribution、Accessの3層で構成される、伝統的なエンタープライズネットワーク設計。
                        </p>
                        <Diagram id="diag-step6-three-tier" label="Three-tier 階層モデルの構成図" />

                        <h3>Collapsed core（コラプスドコア）</h3>
                        <p>
                            CoreとDistributionの役割を1つの層に統合し、2層構成にしたもの。小〜中規模ネットワークで採用される。
                        </p>
                        <Diagram id="diag-step6-collapsed-core" label="Collapsed core 構成図" />

                        <h3>トラフィックフロー: North-South と East-West</h3>
                        <p>
                            <strong>North-South</strong>はデータセンターの外部と内部の間を流れる通信、<strong>East-West</strong>はデータセンター内部のサーバー間・階層内で流れる通信です。
                        </p>
                        <Diagram id="diag-step6-traffic-flow" label="North-South と East-West トラフィックフローの図解" />

                        <h3>トポロジー比較表</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">トポロジー</th>
                                    <th scope="col">冗長性</th>
                                    <th scope="col">拡張性</th>
                                    <th scope="col">管理の複雑さ</th>
                                    <th scope="col">代表的な利用場面</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mesh</td>
                                    <td>非常に高い</td>
                                    <td>低い</td>
                                    <td>高い</td>
                                    <td>重要な基幹ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Star/Hub and spoke</td>
                                    <td>低い</td>
                                    <td>高い</td>
                                    <td>低い</td>
                                    <td>一般的なオフィスLAN</td>
                                </tr>
                                <tr>
                                    <td>Hybrid</td>
                                    <td>部分ごとに調整可能</td>
                                    <td>高い</td>
                                    <td>中程度</td>
                                    <td>大規模企業ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Spine and leaf</td>
                                    <td>高い</td>
                                    <td>非常に高い</td>
                                    <td>中程度</td>
                                    <td>データセンター</td>
                                </tr>
                                <tr>
                                    <td>Point to point</td>
                                    <td>なし</td>
                                    <td>低い</td>
                                    <td>非常に低い</td>
                                    <td>拠点間専用線</td>
                                </tr>
                                <tr>
                                    <td>Three-tier</td>
                                    <td>高い</td>
                                    <td>高い</td>
                                    <td>高い</td>
                                    <td>大規模キャンパスネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Collapsed core</td>
                                    <td>中程度</td>
                                    <td>中程度</td>
                                    <td>低い</td>
                                    <td>中小規模ネットワーク</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="step7" tabIndex={-1}>
                        <h2>ステップ7（1.7）: IPv4アドレッシング</h2>

                        <h3>パブリックとプライベート</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">区分</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Public IP</td>
                                    <td>インターネット上で一意に識別されるアドレス</td>
                                </tr>
                                <tr>
                                    <td>Private IP</td>
                                    <td>組織内など限定された範囲でのみ使われるアドレス</td>
                                </tr>
                                <tr>
                                    <td>RFC1918</td>
                                    <td>10.0.0.0/8、172.16.0.0/12、192.168.0.0/16 の3つの範囲</td>
                                </tr>
                                <tr>
                                    <td>APIPA</td>
                                    <td>DHCPサーバーが見つからない場合に自動的に割り当てられる 169.254.0.0/16 の範囲</td>
                                </tr>
                                <tr>
                                    <td>Loopback/localhost</td>
                                    <td>自分自身を指すアドレス。IPv4では 127.0.0.0/8</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>IPv4アドレスクラス</h3>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">クラス</th>
                                    <th scope="col">先頭ビットパターン</th>
                                    <th scope="col">範囲（先頭オクテット）</th>
                                    <th scope="col">デフォルトマスク</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Class A</td>
                                    <td>0</td>
                                    <td>1〜126</td>
                                    <td>/8</td>
                                    <td>大規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Class B</td>
                                    <td>10</td>
                                    <td>128〜191</td>
                                    <td>/16</td>
                                    <td>中規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Class C</td>
                                    <td>110</td>
                                    <td>192〜223</td>
                                    <td>/24</td>
                                    <td>小規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Class D</td>
                                    <td>1110</td>
                                    <td>224〜239</td>
                                    <td>―</td>
                                    <td>マルチキャスト専用</td>
                                </tr>
                                <tr>
                                    <td>Class E</td>
                                    <td>1111</td>
                                    <td>240〜255</td>
                                    <td>―</td>
                                    <td>実験・予約用</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>サブネッティング: VLSMとCIDR</h3>
                        <p>
                            <strong>CIDR</strong>は、クラスの概念にとらわれず「/24」のようなプレフィックス長でネットワーク部とホスト部の境界を柔軟に表現する記法です。<strong>VLSM</strong>は、1つのネットワークを必要なホスト数に応じて異なるサイズのサブネットに分割する手法です。
                        </p>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">CIDR表記</th>
                                    <th scope="col">サブネットマスク</th>
                                    <th scope="col">利用可能ホスト数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>/24</td>
                                    <td>255.255.255.0</td>
                                    <td>254</td>
                                </tr>
                                <tr>
                                    <td>/25</td>
                                    <td>255.255.255.128</td>
                                    <td>126</td>
                                </tr>
                                <tr>
                                    <td>/26</td>
                                    <td>255.255.255.192</td>
                                    <td>62</td>
                                </tr>
                                <tr>
                                    <td>/27</td>
                                    <td>255.255.255.224</td>
                                    <td>30</td>
                                </tr>
                                <tr>
                                    <td>/28</td>
                                    <td>255.255.255.240</td>
                                    <td>14</td>
                                </tr>
                                <tr>
                                    <td>/29</td>
                                    <td>255.255.255.248</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>/30</td>
                                    <td>255.255.255.252</td>
                                    <td>2</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="formula">
                            利用可能ホスト数 = 2^(32 - プレフィックス長) - 2　例: /27 → 2^5 - 2 = 30
                        </div>

                        <h3>同一サブネット判定の手順</h3>
                        <Diagram id="diag-step7-subnet-check" label="同一サブネット判定のフローチャート" />

                        <h3>VLSM設計の考え方（例）</h3>
                        <p>
                            1つの 192.168.1.0/24 ネットワークを、必要なホスト数が異なる3つの部門に割り当てる例です。
                        </p>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">部門</th>
                                    <th scope="col">必要ホスト数</th>
                                    <th scope="col">割り当てるCIDR</th>
                                    <th scope="col">割り当て範囲（例）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>営業部</td>
                                    <td>100台</td>
                                    <td>/25（126台まで）</td>
                                    <td>192.168.1.0/25</td>
                                </tr>
                                <tr>
                                    <td>開発部</td>
                                    <td>50台</td>
                                    <td>/26（62台まで）</td>
                                    <td>192.168.1.128/26</td>
                                </tr>
                                <tr>
                                    <td>管理部</td>
                                    <td>20台</td>
                                    <td>/27（30台まで）</td>
                                    <td>192.168.1.192/27</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>実装例: PythonのipaddressモジュールでVLSMを検算する</h3>
                        <div className="code-block" role="region" aria-label="PythonのipaddressモジュールでVLSMを検算するスクリプト例">
                            <div className="code-line"><span className="code-keyword">import</span> ipaddress</div>
                            <div className="code-line"></div>
                            <div className="code-line">base_network = ipaddress.ip_network(<span className="code-string">&quot;192.168.1.0/24&quot;</span>)</div>
                            <div className="code-line">required_hosts = &#123;<span className="code-string">&quot;sales&quot;</span>: <span className="code-number">100</span>, <span className="code-string">&quot;dev&quot;</span>: <span className="code-number">50</span>, <span className="code-string">&quot;admin&quot;</span>: <span className="code-number">20</span>&#125;</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-keyword">for</span> name, hosts <span className="code-keyword">in</span> required_hosts.items():</div>
                            <div className="code-line">{'    '}prefix = <span className="code-number">32</span></div>
                            <div className="code-line">{'    '}<span className="code-keyword">while</span> (<span className="code-number">2</span> ** (<span className="code-number">32</span> - prefix)) - <span className="code-number">2</span> &lt; hosts:</div>
                            <div className="code-line">{'        '}prefix -= <span className="code-number">1</span></div>
                            <div className="code-line">{'    '}<span className="code-builtin">print</span>(f<span className="code-string">&quot;&#123;name&#125;: needs &#123;hosts&#125; hosts -&gt; /&#123;prefix&#125; &quot;</span></div>
                            <div className="code-line">{'          '}f<span className="code-string">&quot;(&#123;(2 ** (32 - prefix)) - 2&#125; usable hosts)&quot;</span>)</div>
                        </div>
                    </section>

                    <section id="step8" tabIndex={-1}>
                        <h2>ステップ8（1.8）: 進化するネットワーク環境のユースケース</h2>
                        <p>
                            近年のネットワークは、ソフトウェアによる自動化・仮想化・セキュリティモデルの変化を強く受けています。
                        </p>

                        <h3>SDNとSD-WAN</h3>
                        <p>
                            SDNは、従来ネットワーク機器に分散していた制御プレーンを中央のコントローラーに集約し、データプレーンと分離する考え方です。SD-WANはこの考え方を拠点間WAN回線に適用したものです。
                        </p>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">特性</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Application aware</td>
                                    <td>アプリケーションの種類を認識し、経路や優先度を最適化できる</td>
                                </tr>
                                <tr>
                                    <td>Zero-touch provisioning</td>
                                    <td>機器を現地で手動設定せずに、自動でネットワークへ組み込める</td>
                                </tr>
                                <tr>
                                    <td>Transport agnostic</td>
                                    <td>回線の種類を問わず利用できる</td>
                                </tr>
                                <tr>
                                    <td>Central policy management</td>
                                    <td>ポリシーを一元管理し、全拠点へ一括配布できる</td>
                                </tr>
                            </tbody>
                        </table>
                        <Diagram id="diag-step8-sdn" label="SDNコントローラーとデータプレーンの構成図" />

                        <h3>VXLAN</h3>
                        <p>
                            Layer 2のフレームをLayer 3のUDPパケットでカプセル化し、離れたデータセンター同士でも同一のLayer 2セグメントを拡張できるようにする技術です。データセンター間接続（DCI）でよく使われます。
                        </p>

                        <h3>Zero Trust Architecture（ZTA）</h3>
                        <p>
                            「社内ネットワークだから安全」という前提を置かず、すべてのアクセスをその都度検証する考え方です。
                        </p>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">原則</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Policy-based authentication</td>
                                    <td>状況に応じたポリシーで認証する</td>
                                </tr>
                                <tr>
                                    <td>Authorization</td>
                                    <td>認証後も、そのリソースへのアクセスを許可するか個別に判断する</td>
                                </tr>
                                <tr>
                                    <td>Least privilege access</td>
                                    <td>必要最小限の権限のみを付与する</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>SASE / SSE</h3>
                        <p>
                            SASEは、SD-WANのようなネットワーク機能とファイアウォールやゼロトラストアクセスなどのセキュリティ機能をクラウド上で統合して提供するアーキテクチャです。SSEはそのうちセキュリティ機能部分に焦点を当てた概念です。
                        </p>

                        <h3>IaC（Infrastructure as Code）</h3>
                        <p>
                            ネットワーク機器の構成を、手作業ではなくコードとして管理し、自動化・再現性・変更履歴の追跡を実現する考え方です。
                        </p>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">分類</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Automation</td>
                                    <td>Playbooks/templates、構成ドリフトの検知とコンプライアンス確認、アップグレードの自動化、動的インベントリ</td>
                                </tr>
                                <tr>
                                    <td>Source control</td>
                                    <td>バージョン管理、中央リポジトリでの一元管理、変更の競合検出、ブランチによる並行作業</td>
                                </tr>
                            </tbody>
                        </table>
                        <Diagram id="diag-step8-iac" label="IaCのライフサイクルとドリフト検知の流れ" />

                        <h3>IPv6アドレッシング</h3>
                        <p>
                            IPv4アドレスの枯渇問題を緩和するために設計された、128ビットのアドレス体系です。
                        </p>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">移行技術</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tunneling</td>
                                    <td>IPv6パケットをIPv4ネットワーク上でカプセル化して伝送する</td>
                                </tr>
                                <tr>
                                    <td>Dual stack</td>
                                    <td>1台の機器がIPv4とIPv6の両方を同時に扱えるようにする</td>
                                </tr>
                                <tr>
                                    <td>NAT64</td>
                                    <td>IPv6のみのネットワークからIPv4のリソースへアクセスできるようにアドレス変換する</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="summary" tabIndex={-1}>
                        <h2>まとめとポイント整理</h2>
                        <table className="data">
                            <thead>
                                <tr>
                                    <th scope="col">ステップ</th>
                                    <th scope="col">一言でまとめると</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.1 OSIモデル</td>
                                    <td>通信を7層に分解して考える共通言語</td>
                                </tr>
                                <tr>
                                    <td>1.2 ネットワーク機器</td>
                                    <td>各機器がどのOSI層で何を担当するかを整理する</td>
                                </tr>
                                <tr>
                                    <td>1.3 クラウド概念</td>
                                    <td>デプロイモデル・サービスモデル・責任分界の理解が鍵</td>
                                </tr>
                                <tr>
                                    <td>1.4 ポート/プロトコル</td>
                                    <td>代表的なポート番号と、TCP/UDPの違い、トラフィック種類を暗記する</td>
                                </tr>
                                <tr>
                                    <td>1.5 伝送メディア</td>
                                    <td>有線/無線、コネクタの種類と用途を対応づける</td>
                                </tr>
                                <tr>
                                    <td>1.6 トポロジー</td>
                                    <td>冗長性・拡張性・管理コストのトレードオフで比較する</td>
                                </tr>
                                <tr>
                                    <td>1.7 IPv4アドレッシング</td>
                                    <td>クラス、プライベート範囲、CIDR/VLSMの計算に慣れる</td>
                                </tr>
                                <tr>
                                    <td>1.8 進化する環境</td>
                                    <td>SDN、VXLAN、ゼロトラスト、SASE、IaC、IPv6の概念レベルの理解</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            Networking Conceptsは他の全ドメイン（実装・運用・セキュリティ・トラブルシューティング）の土台になる分野です。特にOSIモデル、ポート番号、IPv4サブネッティングの3つは、他のドメインの問題を解く際にも繰り返し登場するため、優先的に固めておくことをお勧めします。
                        </p>
                    </section>

                    <section id="references" tabIndex={-1}>
                        <h2>参考文献・出典</h2>
                        <ul className="references">
                            <li>
                                CompTIA Network+ (Plus) Certification 公式ページ（試験概要・出題比率・スキル一覧）
                                <br />
                                <a
                                    href="https://www.comptia.org/en-us/certifications/network/"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://www.comptia.org/en-us/certifications/network/
                                </a>
                            </li>
                            <li>
                                CompTIA Network+ N10-009 Certification Exam: Exam Objectives Version 4.0（公式試験目標PDF、Domain 1.0 Networking Concepts の詳細な内訳の出典）
                                <br />
                                <a
                                    href="https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf
                                </a>
                            </li>
                            <li>
                                CompTIA Blog「The New Network+ (N10-009) Exam: Your Questions Answered」（N10-008からN10-009への変更点）
                                <br />
                                <a
                                    href="https://www.comptia.org/en-us/blog/the-new-network-n10-009-exam-your-questions-answered/"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://www.comptia.org/en-us/blog/the-new-network-n10-009-exam-your-questions-answered/
                                </a>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}
