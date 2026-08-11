'use client';

import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

function Diagram({ id, label, caption }: { id: string; label: string; caption: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-block">
            <div className="diagram-wrapper">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
            <div className="diagram-caption">{caption}</div>
        </div>
    );
}

export default function CcnaNetworkFundamentalsGuide() {
    return (
        <div className="ccna-network-fundamentals-page">
            <NavBar />
            <main className="main">
                {/* HERO */}
                <header className="hero">
                    <div className="eyebrow">CCNA Automation 試験対策ガイド</div>
                    <h1>Network Fundamentals ドメイン徹底解説</h1>
                    <p className="lede">
                        対象試験：Automating Networks Using Cisco Platforms v1.1（200-901 CCNAAUTO） ／ 対象ドメイン：6.0 Network Fundamentals（出題比率 15%） ／ 対象読者：ネットワーク自動化を学び始めたばかりの初学者
                    </p>
                    <div className="meta-grid">
                        <div className="meta-card">
                            <div className="k">試験時間</div>
                            <div className="v">120分</div>
                        </div>
                        <div className="meta-card">
                            <div className="k">受験言語</div>
                            <div className="v">英語・日本語</div>
                        </div>
                        <div className="meta-card">
                            <div className="k">受験料</div>
                            <div className="v">US $300</div>
                        </div>
                        <div className="meta-card">
                            <div className="k">本ドメインの出題比率</div>
                            <div className="v">15%</div>
                        </div>
                    </div>
                </header>

                {/* OVERVIEW */}
                <section id="overview" className="section">
                    <h2 className="step-title">はじめに：このガイドの位置づけ</h2>
                    <p>
                        <strong>CCNA Automation</strong> は、Ciscoが2026年に「DevNet Associate」から名称変更した資格で、ネットワークの基礎知識とソフトウェア開発・自動化スキルの両方を証明する認定資格です。取得には、120分の試験 <strong>200-901 CCNAAUTO（Automating Networks Using Cisco Platforms v1.1）</strong> に合格する必要があります。日本語での受験も可能です。
                    </p>
                    <p>
                        本ガイドは、出題範囲の15%を占める「6.0 Network Fundamentals」ドメインに特化し、試験シラバスに沿って6.1から6.9までの全トピックをわかりやすく体系的に解説します。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">ドメイン番号</th>
                                    <th scope="col">ドメイン名</th>
                                    <th scope="col">出題比率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.0</td>
                                    <td>Software Development and Design</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>2.0</td>
                                    <td>Understanding and Using APIs</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>3.0</td>
                                    <td>Cisco Platforms and Development</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>4.0</td>
                                    <td>Application Deployment and Security</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>5.0</td>
                                    <td>Infrastructure and Automation</td>
                                    <td>20%</td>
                                </tr>
                                <tr className="this-domain">
                                    <td><strong>6.0</strong></td>
                                    <td><strong>Network Fundamentals</strong></td>
                                    <td><strong>15%</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 0 */}
                <section id="step0" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 0</span>
                        Network Fundamentalsドメインの全体像
                    </h2>
                    <p>
                        Network Fundamentalsドメインは、ネットワークを構成する物理機器、論理構造、プロトコル、各種サービス、そしてトラブルシューティングの基礎知識を対象としています。
                    </p>

                    <Diagram
                        id="diagram-0"
                        label="Network Fundamentals ドメインの全体像フローチャート"
                        caption="図 0: Network Fundamentalsドメインの全体構造"
                    />

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">項番</th>
                                    <th scope="col">学習内容</th>
                                    <th scope="col">該当ステップ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>6.1</td>
                                    <td>MACアドレスとVLANの目的・使い方</td>
                                    <td>Step 1</td>
                                </tr>
                                <tr>
                                    <td>6.2</td>
                                    <td>IPアドレス、ルート、サブネットマスク/プレフィックス、ゲートウェイ</td>
                                    <td>Step 2</td>
                                </tr>
                                <tr>
                                    <td>6.3</td>
                                    <td>スイッチ・ルーター・ファイアウォール・ロードバランサーなど機器の機能</td>
                                    <td>Step 3</td>
                                </tr>
                                <tr>
                                    <td>6.4</td>
                                    <td>基本的なネットワークトポロジ図の解読</td>
                                    <td>Step 4</td>
                                </tr>
                                <tr>
                                    <td>6.5</td>
                                    <td>ネットワーク機器のManagement/Data/Control Planeの機能</td>
                                    <td>Step 5</td>
                                </tr>
                                <tr>
                                    <td>6.6</td>
                                    <td>DHCP・DNS・NAT・SNMP・NTPというIPサービスの機能</td>
                                    <td>Step 6</td>
                                </tr>
                                <tr>
                                    <td>6.7</td>
                                    <td>SSH・Telnet・HTTP・HTTPS・NETCONFなど代表的なポート番号</td>
                                    <td>Step 7</td>
                                </tr>
                                <tr>
                                    <td>6.8</td>
                                    <td>NAT不良・ポート遮断・プロキシ・VPNに起因する接続トラブルの診断</td>
                                    <td>Step 8</td>
                                </tr>
                                <tr>
                                    <td>6.9</td>
                                    <td>ネットワークの制約がアプリケーションに与える影響</td>
                                    <td>Step 9</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 1 */}
                <section id="step1" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 1</span>
                        MACアドレスとVLANの目的と使われ方を説明できる（6.1）
                    </h2>

                    <h3 className="sub-title">MACアドレスとは</h3>
                    <p>
                        MACアドレス（Media Access Control Address）は、ネットワークインターフェースカード（NIC）に割り当てられた48ビット（6バイト）の物理アドレスです。L2（データリンク層）で動作し、同一ネットワークセグメント内での通信相手を識別するために使用されます。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">構成要素</th>
                                    <th scope="col">ビット数</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>OUI（Organizationally Unique Identifier）</strong></td>
                                    <td>上位24ビット</td>
                                    <td>製造ベンダーを識別する部分（IEEEが割り当て）</td>
                                </tr>
                                <tr>
                                    <td><strong>デバイス固有部分</strong></td>
                                    <td>下位24ビット</td>
                                    <td>ベンダー内で一意になるように製造時に割り当てられる部分</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">VLANとは</h3>
                    <p>
                        VLAN（Virtual Local Area Network）は、物理的なスイッチの接続に関わらず、論理的にネットワーク（ブロードキャストドメイン）を分割する技術です。セキュリティ向上、トラフィック制限、柔軟なネットワーク構築に役立ちます。
                    </p>

                    <Diagram
                        id="diagram-1"
                        label="L2スイッチとVLANによるネットワーク分割の図解"
                        caption="図 1: L2スイッチとVLANによるネットワーク分割"
                    />

                    <div className="callout">
                        <strong>試験対策ポイント：</strong>
                        同一VLAN内の端末同士はL2スイッチのみで通信できますが、異なるVLAN間の通信には必ずL3機器（ルーターまたはL3スイッチ）が必要になります。
                    </div>
                </section>

                {/* STEP 2 */}
                <section id="step2" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 2</span>
                        IPアドレス・ルート・サブネットマスク/プレフィックス・ゲートウェイを説明できる（6.2）
                    </h2>

                    <h3 className="sub-title">IPアドレスの基本</h3>
                    <p>
                        IPv4アドレスは32ビット（4バイト）の論理アドレスであり、8ビットずつ4つのオクテットに区切って10進数表記（例：192.168.1.1）します。L3（ネットワーク層）で動作し、異なるネットワーク間でのパケットルーティングに使用されます。
                    </p>

                    <h3 className="sub-title">サブネットマスクとプレフィックス表記</h3>
                    <p>
                        IPアドレスのうち、どこまでが「ネットワーク部」でどこからが「ホスト部」かを示すためにサブネットマスク（または/24のようなCIDR表記・プレフィックス表記）を使用します。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">CIDR表記</th>
                                    <th scope="col">サブネットマスク</th>
                                    <th scope="col">ネットワーク部のビット数</th>
                                    <th scope="col">1ネットワークあたりの利用可能ホスト数（目安）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>/24</code></td>
                                    <td>255.255.255.0</td>
                                    <td>24ビット</td>
                                    <td>254台</td>
                                </tr>
                                <tr>
                                    <td><code>/25</code></td>
                                    <td>255.255.255.128</td>
                                    <td>25ビット</td>
                                    <td>126台</td>
                                </tr>
                                <tr>
                                    <td><code>/26</code></td>
                                    <td>255.255.255.192</td>
                                    <td>26ビット</td>
                                    <td>62台</td>
                                </tr>
                                <tr>
                                    <td><code>/16</code></td>
                                    <td>255.255.0.0</td>
                                    <td>16ビット</td>
                                    <td>約65,534台</td>
                                </tr>
                                <tr>
                                    <td><code>/8</code></td>
                                    <td>255.0.0.0</td>
                                    <td>8ビット</td>
                                    <td>約1,677万台</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">プライベートIPアドレス範囲</h3>
                    <p>
                        RFC 1918 で規定されているプライベートIPアドレス範囲は以下の通りです。インターネット上で直接ルーティングすることはできません。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">範囲</th>
                                    <th scope="col">CIDR表記</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>10.0.0.0 〜 10.255.255.255</code></td>
                                    <td><code>10.0.0.0/8</code></td>
                                    <td>大規模企業ネットワーク</td>
                                </tr>
                                <tr>
                                    <td><code>172.16.0.0 〜 172.31.255.255</code></td>
                                    <td><code>172.16.0.0/12</code></td>
                                    <td>中規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td><code>192.168.0.0 〜 192.168.255.255</code></td>
                                    <td><code>192.168.0.0/16</code></td>
                                    <td>家庭用・小規模オフィス</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">デフォルトゲートウェイとルート</h3>
                    <p>
                        同一サブネット外の宛先（外部ネットワーク）にパケットを送信する際、端末が最初に送る宛先ルーターのIPアドレスを「デフォルトゲートウェイ」と呼びます。
                    </p>

                    <Diagram
                        id="diagram-2"
                        label="デフォルトゲートウェイとルーティングの流れ"
                        caption="図 2: デフォルトゲートウェイとルーティングの流れ"
                    />
                </section>

                {/* STEP 3 */}
                <section id="step3" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 3</span>
                        スイッチ・ルーター・ファイアウォール・ロードバランサーの機能を説明できる（6.3）
                    </h2>
                    <p>
                        ネットワークを構築する主要な機器と、それぞれの動作レイヤー（OSI参照モデル）および役割を整理します。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">レイヤー</th>
                                    <th scope="col">名称</th>
                                    <th scope="col">関連する技術・機器の例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>L7</strong></td>
                                    <td>アプリケーション層</td>
                                    <td>HTTP、DNS、ロードバランサーのURLベース振り分け</td>
                                </tr>
                                <tr>
                                    <td><strong>L4</strong></td>
                                    <td>トランスポート層</td>
                                    <td>TCP/UDP、ポート番号、L4ロードバランシング</td>
                                </tr>
                                <tr>
                                    <td><strong>L3</strong></td>
                                    <td>ネットワーク層</td>
                                    <td>IPアドレス、ルーティング、ルーター</td>
                                </tr>
                                <tr>
                                    <td><strong>L2</strong></td>
                                    <td>データリンク層</td>
                                    <td>MACアドレス、VLAN、スイッチ</td>
                                </tr>
                                <tr>
                                    <td><strong>L1</strong></td>
                                    <td>物理層</td>
                                    <td>ケーブル、光ファイバー、物理ポート</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">代表的なネットワーク機器</h3>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">機器</th>
                                    <th scope="col">主なレイヤー</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>スイッチ（L2スイッチ）</strong></td>
                                    <td>L2</td>
                                    <td>MACアドレステーブルをもとにフレームを転送。VLANによるセグメント分割を行う</td>
                                </tr>
                                <tr>
                                    <td><strong>ルーター</strong></td>
                                    <td>L3</td>
                                    <td>IPアドレス・ルーティングテーブルをもとに、異なるネットワーク間でパケットを転送する</td>
                                </tr>
                                <tr>
                                    <td><strong>ファイアウォール</strong></td>
                                    <td>L3〜L7</td>
                                    <td>通信のフィルタリング、アクセス制御、脅威検知・防御を行う</td>
                                </tr>
                                <tr>
                                    <td><strong>ロードバランサー</strong></td>
                                    <td>L4〜L7</td>
                                    <td>1つの仮想IP（VIP）宛ての通信を複数のサーバーへ振り分け、可用性と拡張性を高める</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 4 */}
                <section id="step4" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 4</span>
                        基本的なネットワークトポロジ図を解読できる（6.4）
                    </h2>
                    <p>
                        実際の開発・運用現場や試験では、各種機器がどのように接続されているかを示すトポロジ図を解読するスキルが求められます。
                    </p>

                    <Diagram
                        id="diagram-3"
                        label="各層のネットワーク機器とロードバランサー配置図"
                        caption="図 3: 各層のネットワーク機器とロードバランサーの配置"
                    />
                </section>

                {/* STEP 5 */}
                <section id="step5" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 5</span>
                        Management Plane / Data Plane / Control Plane の機能を比較説明できる（6.5）
                    </h2>
                    <p>
                        ネットワーク機器内部の機能を役割ごとに3つの「プレーン（Plane）」に分類して理解することは、ネットワーク自動化やSDN（Software-Defined Networking）の基礎となります。
                    </p>

                    <Diagram
                        id="diagram-4"
                        label="Management, Control, Data Planeの3層概念図"
                        caption="図 4: ネットワーク機器における3つのPlane"
                    />

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">プレーン</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Management Plane（管理プレーン）</strong></td>
                                    <td>機器の設定・監視・運用管理を行う</td>
                                    <td>SSH、SNMP、NETCONF/RESTCONFによるアクセス</td>
                                </tr>
                                <tr>
                                    <td><strong>Control Plane（制御プレーン）</strong></td>
                                    <td>経路情報や制御情報の学習・交換を行う（いわば機器の「頭脳」）</td>
                                    <td>OSPFやBGPなどのルーティングプロトコル、STP、MACアドレステーブルの学習</td>
                                </tr>
                                <tr>
                                    <td><strong>Data Plane（データプレーン）</strong></td>
                                    <td>実際のユーザートラフィック（パケット/フレーム）を転送する（いわば機器の「手足」）</td>
                                    <td>受信したパケットの実転送処理（フォワーディング）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 6 */}
                <section id="step6" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 6</span>
                        DHCP・DNS・NAT・SNMP・NTPの各機能を説明できる（6.6）
                    </h2>
                    <p>
                        アプリケーションや機器が正常に通信・運用を行うために不可欠な5つの主要IPサービスを解説します。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">サービス</th>
                                    <th scope="col">正式名称</th>
                                    <th scope="col">主な役割</th>
                                    <th scope="col">主なポート</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>DHCP</strong></td>
                                    <td>Dynamic Host Configuration Protocol</td>
                                    <td>IPアドレス等をクライアントへ自動的に割り当てる</td>
                                    <td><code>UDP 67（サーバー）／68（クライアント）</code></td>
                                </tr>
                                <tr>
                                    <td><strong>DNS</strong></td>
                                    <td>Domain Name System</td>
                                    <td>ドメイン名とIPアドレスを相互に変換する（名前解決）</td>
                                    <td><code>UDP/TCP 53</code></td>
                                </tr>
                                <tr>
                                    <td><strong>NAT</strong></td>
                                    <td>Network Address Translation</td>
                                    <td>プライベートIPアドレスとグローバルIPアドレスを変換する</td>
                                    <td>ポートではなくアドレス変換の技術</td>
                                </tr>
                                <tr>
                                    <td><strong>SNMP</strong></td>
                                    <td>Simple Network Management Protocol</td>
                                    <td>機器の状態監視、情報収集、障害の自発通知を行う</td>
                                    <td><code>UDP 161（ポーリング）／162（Trap）</code></td>
                                </tr>
                                <tr>
                                    <td><strong>NTP</strong></td>
                                    <td>Network Time Protocol</td>
                                    <td>ネットワーク機器間で時刻を同期する</td>
                                    <td><code>UDP 123</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">DHCP：IPアドレスの自動割り当て</h3>
                    <p>
                        DHCPは「DORAプロトコル（Discover, Offer, Request, ACK）」と呼ばれる4ステップでIPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバー情報を自動取得します。
                    </p>
                    <Diagram
                        id="diagram-5"
                        label="DHCPシーケンス（Discover, Offer, Request, ACK）"
                        caption="図 5: DHCPの動作シーケンス（DORAプロトコル）"
                    />

                    <h3 className="sub-title">DNS：名前解決の流れ</h3>
                    <p>
                        人間が扱いやすいホスト名（例：www.example.com）を、コンピュータが処理できるIPアドレスへ変換します。
                    </p>
                    <Diagram
                        id="diagram-6"
                        label="DNS名前解決シーケンス"
                        caption="図 6: DNS名前解決の流れ"
                    />

                    <h3 className="sub-title">NAT：アドレス変換の考え方</h3>
                    <p>
                        社内プライベートIP端末がインターネットへアクセスする際、ルーターやファイアウォールでグローバルIPアドレスへ書き換えます。
                    </p>
                    <Diagram
                        id="diagram-7"
                        label="NAT（アドレス変換）の動作概念図"
                        caption="図 7: NAT（アドレス変換）の考え方"
                    />

                    <h3 className="sub-title">SNMP：機器の監視</h3>
                    <p>
                        SNMPはNMS（ネットワーク管理システム）からのGetリクエスト（ポーリング）と、機器側で異常発生時に送出するTrap通知（プッシュ型）の2つの方式で監視を実施します。
                    </p>
                    <Diagram
                        id="diagram-8"
                        label="SNMPのポーリングとTrap通知フロー"
                        caption="図 8: SNMPのポーリングとTrap通知"
                    />

                    <h3 className="sub-title">NTP：時刻同期の階層構造</h3>
                    <p>
                        ログのタイムスタンプや証明書の検証を正しく行うため、NTPによる高精度な時刻同期が不可欠です。Stratum（ストレータム）と呼ばれる階層値（0〜15）で精度を示します。
                    </p>
                    <Diagram
                        id="diagram-9"
                        label="NTPのStratum（階層構造）の図解"
                        caption="図 9: NTPのStratum（階層構造）"
                    />
                </section>

                {/* STEP 7 */}
                <section id="step7" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 7</span>
                        代表的なポート番号とその役割を答えることができる（6.7）
                    </h2>
                    <p>
                        トランスポート層（L4）でアプリケーションを識別するための主要プロトコルとポート番号の対応表です。試験・実務で即答できることが求められます。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">ポート番号</th>
                                    <th scope="col">トランスポート</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>SSH</strong></td>
                                    <td><code>22</code></td>
                                    <td>TCP</td>
                                    <td>機器へのセキュアなリモートログイン・管理プレーンアクセス</td>
                                </tr>
                                <tr>
                                    <td><strong>Telnet</strong></td>
                                    <td><code>23</code></td>
                                    <td>TCP</td>
                                    <td>暗号化されないリモートログイン（現在は非推奨）</td>
                                </tr>
                                <tr>
                                    <td><strong>HTTP</strong></td>
                                    <td><code>80</code></td>
                                    <td>TCP</td>
                                    <td>平文でのWebアクセス・REST APIアクセス</td>
                                </tr>
                                <tr>
                                    <td><strong>HTTPS</strong></td>
                                    <td><code>443</code></td>
                                    <td>TCP</td>
                                    <td>TLSで暗号化されたWebアクセス・REST APIアクセス</td>
                                </tr>
                                <tr>
                                    <td><strong>NETCONF</strong></td>
                                    <td><code>830</code></td>
                                    <td>TCP（SSH上）</td>
                                    <td>モデル駆動型プログラマビリティによる機器の設定取得・投入</td>
                                </tr>
                                <tr>
                                    <td><strong>DNS</strong></td>
                                    <td><code>53</code></td>
                                    <td>UDP/TCP</td>
                                    <td>名前解決</td>
                                </tr>
                                <tr>
                                    <td><strong>DHCP</strong></td>
                                    <td><code>67 / 68</code></td>
                                    <td>UDP</td>
                                    <td>IPアドレスの自動割り当て</td>
                                </tr>
                                <tr>
                                    <td><strong>SNMP</strong></td>
                                    <td><code>161 / 162</code></td>
                                    <td>UDP</td>
                                    <td>機器の監視・自発通知（Trap）</td>
                                </tr>
                                <tr>
                                    <td><strong>NTP</strong></td>
                                    <td><code>123</code></td>
                                    <td>UDP</td>
                                    <td>時刻同期</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 8 */}
                <section id="step8" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 8</span>
                        アプリケーション接続トラブルの原因を診断できる（6.8）
                    </h2>
                    <p>
                        アプリケーションがネットワーク経由で接続できない場合のトラブルシューティング手順と原因推定早見表です。
                    </p>

                    <h3 className="sub-title">症状から原因を推測するための早見表</h3>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">症状</th>
                                    <th scope="col">疑われる原因</th>
                                    <th scope="col">確認方法の例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>特定サーバーの特定ポートにだけ接続できない</td>
                                    <td><strong>Transport Port Blocked</strong></td>
                                    <td>対象ポートへの接続テスト、FW/ACLのログ確認</td>
                                </tr>
                                <tr>
                                    <td>社外から社内のアプリケーションに到達できない</td>
                                    <td><strong>NAT Problem</strong></td>
                                    <td>NAT変換テーブル、グローバルIPの割当状況の確認</td>
                                </tr>
                                <tr>
                                    <td>特定URL・宛先だけアクセスできない</td>
                                    <td><strong>Proxy設定の誤り</strong></td>
                                    <td>プロキシの除外リスト・認証設定の確認</td>
                                </tr>
                                <tr>
                                    <td>拠点間の通信だけ失敗する</td>
                                    <td><strong>VPN Problem</strong></td>
                                    <td>VPNトンネルの状態、ルーティング配布状況の確認</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram
                        id="diagram-10"
                        label="アプリケーション接続トラブル診断フローチャート"
                        caption="図 10: アプリケーション接続トラブル診断フロー"
                    />
                </section>

                {/* STEP 9 */}
                <section id="step9" className="section">
                    <h2 className="step-title">
                        <span className="step-num">Step 9</span>
                        ネットワーク制約がアプリケーションに与える影響を説明できる（6.9）
                    </h2>
                    <p>
                        ネットワーク上の各種ボトルネックや制約が、アプリケーションパフォーマンスにどのように作用するかをまとめた一覧です。
                    </p>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">ネットワーク制約</th>
                                    <th scope="col">アプリケーションへの影響</th>
                                    <th scope="col">対策の例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>帯域幅（Bandwidth）不足</strong></td>
                                    <td>レスポンス遅延、タイムアウトの増加</td>
                                    <td>QoS設定、帯域増強、キャッシュの活用</td>
                                </tr>
                                <tr>
                                    <td><strong>遅延（Latency）／RTTの増大</strong></td>
                                    <td>リアルタイム性の低下（音声・映像品質の劣化）</td>
                                    <td>CDNの活用、エッジコンピューティングの活用</td>
                                </tr>
                                <tr>
                                    <td><strong>MTU／パケットフラグメンテーション</strong></td>
                                    <td>パケット分割によるオーバーヘッド、通信エラー</td>
                                    <td>MTUサイズの調整、Path MTU Discoveryの利用</td>
                                </tr>
                                <tr>
                                    <td><strong>パケットロス</strong></td>
                                    <td>再送増加によるスループット低下</td>
                                    <td>信頼性の高いプロトコルの選択、QoSの適用</td>
                                </tr>
                                <tr>
                                    <td><strong>ファイアウォール／ACLによる通信制限</strong></td>
                                    <td>特定ポート・プロトコルの通信が失敗する</td>
                                    <td>事前の通信要件確認、必要なポートの申請・開放</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* SUMMARY */}
                <section id="summary" className="section">
                    <h2 className="step-title">まとめ：学習のポイント</h2>
                    <ul>
                        <li>L2（MACアドレス/VLAN）とL3（IPアドレス/ルーティング）の動作階層を意識して理解する。</li>
                        <li>機器内部の Management/Control/Data Plane の役割分担を明確に把握する。</li>
                        <li>DHCP・DNS・NAT・SNMP・NTPの役割とポート番号をセットで暗記する。</li>
                        <li>接続トラブル時は、物理層からアプリケーション層へ順を追って切り分け（Troubleshooting）を行う。</li>
                    </ul>
                </section>

                {/* REFERENCES / FOOTER */}
                <footer id="references" className="footer">
                    <h2 className="step-title">参考情報源</h2>
                    <ul className="ref-list">
                        <li>
                            <span className="ref-name">Cisco Official CCNA 200-301 Exam Topics</span>
                            <a
                                href="https://www.cisco.com/c/en/us/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ref-url"
                            >
                                https://www.cisco.com/c/en/us/training-events/training-certifications/exams/current-list/ccna-200-301.html
                            </a>
                        </li>
                        <li>
                            <span className="ref-name">RFC 1918 - Address Allocation for Private Internets</span>
                            <a
                                href="https://datatracker.ietf.org/doc/html/rfc1918"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ref-url"
                            >
                                https://datatracker.ietf.org/doc/html/rfc1918
                            </a>
                        </li>
                    </ul>
                </footer>
            </main>
        </div>
    );
}
