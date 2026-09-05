import React from 'react';
import NavBar from './NavBar';
import Diagram from './Diagram';
import { TOC_ITEMS } from './constants';

export default function CcnaNetworkFundamentalsGuide() {
    return (
        <div className="ccna-network-fundamentals-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    <div className="doc-header">
                        <h1>
                            Cisco CCNA試験対策：
                            <br />
                            ネットワークの基礎 入門ガイド
                        </h1>
                    </div>
                    <p className="lead">
                        本ガイドは、Cisco
                        CCNA（200-301）認定試験の出題範囲のうち、最も土台となる「ネットワークの基礎」領域を、
                        ネットワーク学習を始めたばかりの方でも理解できるように、図解と表を使ってステップバイステップで解説するものです。
                    </p>

                    {/* 第1章 */}
                    <section id={TOC_ITEMS[0].id}>
                        <h2>
                            <span className="chapter-num">第1章</span>CCNA認定試験とは
                        </h2>

                        <h3>1.1　CCNA認定の概要</h3>
                        <p>
                            CCNA（Cisco Certified Network
                            Associate）は、シスコシステムズが提供するアソシエイトレベルのIT資格です。
                            Cisco公式ページによると、CCNA試験はネットワークの基礎、IPサービス、セキュリティの基礎、自動化およびプログラマビリティを対象としており、
                            絶え間なく変化するIT環境に対応できる能力を証明する資格と位置づけられています（出典①）。
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
                                    <td>認定名</td>
                                    <td>CCNA（Cisco Certified Network Associate）</td>
                                </tr>
                                <tr>
                                    <td>対応する試験コード</td>
                                    <td>
                                        200-301（Implementing and Administering Cisco Solutions）
                                    </td>
                                </tr>
                                <tr>
                                    <td>試験時間</td>
                                    <td>120分</td>
                                </tr>
                                <tr>
                                    <td>出題形式</td>
                                    <td>
                                        選択問題、ドラッグ&amp;ドロップ、シミュレーション、シムレット（模擬コンフィグ問題）
                                    </td>
                                </tr>
                                <tr>
                                    <td>前提条件</td>
                                    <td>
                                        正式な前提条件はなし。ただしシスコソリューションの導入・運用経験が1年以上あることが推奨（出典①）
                                    </td>
                                </tr>
                                <tr>
                                    <td>対応可能な職種例</td>
                                    <td>
                                        エントリーレベルのネットワークエンジニア、ヘルプデスク技術者、ネットワーク管理者、ネットワークサポート技術者（出典①）
                                    </td>
                                </tr>
                                <tr>
                                    <td>有効期間</td>
                                    <td>取得後3年間（出典①）</td>
                                </tr>
                                <tr>
                                    <td>再認定方法</td>
                                    <td>
                                        認定試験に再合格する、または生涯学習クレジットを30ポイント取得する（出典①）
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1.2　200-301試験の出題ドメインと配点</h3>
                        <p>
                            CCNA
                            200-301試験（v1.1ブループリント）は、6つの出題ドメインから構成されており、各ドメインには公式の配点比率が設定されています。
                            この比率は、どの分野に学習時間を重点的に配分すべきかを示す重要な指標です（出典⑦⑧）。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ドメイン番号</th>
                                    <th scope="col">ドメイン名（日本語）</th>
                                    <th scope="col">配点比率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.0</td>
                                    <td>ネットワークの基礎（Network Fundamentals）</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>2.0</td>
                                    <td>ネットワークアクセス（Network Access）</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>3.0</td>
                                    <td>IP接続性（IP Connectivity）</td>
                                    <td>25%</td>
                                </tr>
                                <tr>
                                    <td>4.0</td>
                                    <td>IPサービス（IP Services）</td>
                                    <td>10%</td>
                                </tr>
                                <tr>
                                    <td>5.0</td>
                                    <td>セキュリティの基礎（Security Fundamentals）</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>6.0</td>
                                    <td>
                                        自動化とプログラマビリティ（Automation and Programmability）
                                    </td>
                                    <td>10%</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram
                            id="diagram-pie"
                            label="図1-1：CCNA 200-301 出題ドメイン別の配点比率"
                        />
                        <p className="mermaid-caption">
                            図1-1：CCNA 200-301 出題ドメイン別の配点比率
                        </p>

                        <p>
                            見てのとおり「IP接続性」が最大の25%、次いで「ネットワークの基礎」と「ネットワークアクセス」がそれぞれ20%と続きます。
                            この3ドメインだけで全体の65%を占めるため、ルーティング・スイッチングとその土台となる基礎概念の理解が合格の鍵になります。
                        </p>

                        <h3>1.3　認定取得までの8ステップ</h3>
                        <p>
                            Cisco公式ページでは、CCNA取得までのプロセスを8つのステップとして案内しています（出典①）。
                        </p>

                        <Diagram id="diagram-8steps" label="図1-2：CCNA認定取得までの8ステップ" />
                        <p className="mermaid-caption">図1-2：CCNA認定取得までの8ステップ</p>

                        <p>
                            このガイドは、ステップ①「自己評価」とステップ②「学習」の中でも、最初に押さえるべき「ネットワークの基礎」ドメインの内容を中心に扱います。
                        </p>
                    </section>

                    {/* 第2章 */}
                    <section id={TOC_ITEMS[1].id}>
                        <h2>
                            <span className="chapter-num">第2章</span>
                            ネットワークとは何か（基礎概念）
                        </h2>

                        <h3>2.1　ネットワークの定義と種類</h3>
                        <p>
                            ネットワークとは、複数のコンピュータや通信機器がケーブルや電波でつながり、データをやり取りできる仕組みのことです。
                            ネットワークは、その規模や範囲によっていくつかの種類に分類されます。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">正式名称</th>
                                    <th scope="col">範囲の目安</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>LAN</td>
                                    <td>Local Area Network</td>
                                    <td>建物内・敷地内</td>
                                    <td>自宅、オフィスフロア内のネットワーク</td>
                                </tr>
                                <tr>
                                    <td>WLAN</td>
                                    <td>Wireless LAN</td>
                                    <td>建物内・敷地内（無線）</td>
                                    <td>無線LAN（Wi-Fi）環境</td>
                                </tr>
                                <tr>
                                    <td>MAN</td>
                                    <td>Metropolitan Area Network</td>
                                    <td>都市規模</td>
                                    <td>市内の複数拠点を結ぶ回線</td>
                                </tr>
                                <tr>
                                    <td>WAN</td>
                                    <td>Wide Area Network</td>
                                    <td>都市・国・大陸をまたぐ広域</td>
                                    <td>インターネット、拠点間VPN</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>2.2　代表的なネットワークトポロジー</h3>
                        <p>
                            トポロジーとは、ネットワーク機器同士の「接続の形」のことです。CCNAの基礎範囲では、特にスター型とメッシュ型の考え方を理解しておくことが重要です。
                        </p>

                        <Diagram
                            id="diagram-topology"
                            label="図2-1：スター型トポロジーとメッシュ型トポロジーの比較"
                        />
                        <p className="mermaid-caption">
                            図2-1：スター型トポロジーとメッシュ型トポロジーの比較
                        </p>

                        <ul>
                            <li>
                                <strong>スター型</strong>
                                ：中央のスイッチにすべての機器が接続される形。現在のオフィスLANの主流構成で、1本のケーブルに障害が起きても他の機器に影響しにくいのが特徴です。
                            </li>
                            <li>
                                <strong>メッシュ型</strong>
                                ：機器同士が複数の経路で結ばれる形。経路が多いほど、どこか1か所が故障しても通信が維持されやすくなりますが、配線コストは増加します。
                            </li>
                        </ul>
                    </section>

                    {/* 第3章 */}
                    <section id={TOC_ITEMS[2].id}>
                        <h2>
                            <span className="chapter-num">第3章</span>OSI参照モデルとTCP/IPモデル
                        </h2>

                        <h3>3.1　なぜ「モデル」で考える必要があるのか</h3>
                        <p>
                            ネットワーク通信は、ケーブルを流れる電気信号からアプリケーションが表示する文字や画像まで、非常に多くの処理が積み重なって成立しています。
                            これを一つの塊として理解しようとすると混乱するため、CCNAでは処理を「層（レイヤー）」に分解して考える2つのモデル、
                            <strong>OSI参照モデル</strong>と<strong>TCP/IPモデル</strong>
                            を使います。
                        </p>

                        <h3>3.2　OSI参照モデル（7層）</h3>
                        <p>
                            OSI参照モデルは、通信の仕組みを7つの層に分解した概念モデルです。上位層に行くほど人間やアプリケーションに近く、下位層に行くほど物理的な信号に近くなります。
                        </p>

                        <Diagram id="diagram-osi" label="図3-1：OSI参照モデル 7層の構造" />
                        <p className="mermaid-caption">図3-1：OSI参照モデル 7層の構造</p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">層</th>
                                    <th scope="col">名称</th>
                                    <th scope="col">主な役割</th>
                                    <th scope="col">代表的な単位（PDU）</th>
                                    <th scope="col">代表機器・技術</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>7</td>
                                    <td>アプリケーション層</td>
                                    <td>ユーザーが利用するアプリの通信機能を提供</td>
                                    <td>データ</td>
                                    <td>Webブラウザ, メールソフト</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>プレゼンテーション層</td>
                                    <td>データ形式の変換、暗号化・圧縮</td>
                                    <td>データ</td>
                                    <td>SSL/TLS, JPEG, ASCII</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>セッション層</td>
                                    <td>通信セッションの確立・維持・終了</td>
                                    <td>データ</td>
                                    <td>NetBIOS, RPC</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>トランスポート層</td>
                                    <td>信頼性のあるデータ転送、ポート管理</td>
                                    <td>セグメント</td>
                                    <td>TCP, UDP</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>ネットワーク層</td>
                                    <td>論理アドレスによる経路選択</td>
                                    <td>パケット</td>
                                    <td>IPアドレス, ルーター</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>データリンク層</td>
                                    <td>同一ネットワーク内でのフレーム転送</td>
                                    <td>フレーム</td>
                                    <td>MACアドレス, スイッチ</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>物理層</td>
                                    <td>電気信号・光信号としてビットを伝送</td>
                                    <td>ビット</td>
                                    <td>ケーブル, コネクタ, ハブ</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>3.3　TCP/IPモデルとOSIモデルの対応</h3>
                        <p>
                            実際のインターネット通信で使われているのはTCP/IPモデルです。CCNAではOSIモデルとの対応関係を理解しておく必要があります。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">OSI参照モデル</th>
                                    <th scope="col">TCP/IPモデル</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>アプリケーション層／プレゼンテーション層／セッション層</td>
                                    <td>アプリケーション層</td>
                                </tr>
                                <tr>
                                    <td>トランスポート層</td>
                                    <td>トランスポート層</td>
                                </tr>
                                <tr>
                                    <td>ネットワーク層</td>
                                    <td>インターネット層</td>
                                </tr>
                                <tr>
                                    <td>データリンク層／物理層</td>
                                    <td>ネットワークインターフェース層（リンク層）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>3.4　カプセル化のプロセス</h3>
                        <p>
                            データが送信されるとき、各層を通過するたびに、その層固有の制御情報（ヘッダー）が付加されていきます。
                            このプロセスを「カプセル化」と呼び、受信側では逆の手順で情報を取り出す「非カプセル化」が行われます。
                        </p>

                        <Diagram
                            id="diagram-encap"
                            label="図3-2：カプセル化のプロセスとPDU名称の変化"
                        />
                        <p className="mermaid-caption">
                            図3-2：カプセル化のプロセスとPDU名称の変化
                        </p>

                        <p>
                            この「データ → セグメント → パケット → フレーム →
                            ビット」という単位の変化は、CCNA試験で頻出する基礎知識です。
                        </p>
                    </section>

                    {/* 第4章 */}
                    <section id={TOC_ITEMS[3].id}>
                        <h2>
                            <span className="chapter-num">第4章</span>ネットワーク機器の基礎
                        </h2>

                        <h3>4.1　主要デバイスの比較</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">機器</th>
                                    <th scope="col">動作するOSI層</th>
                                    <th scope="col">主な役割</th>
                                    <th scope="col">ポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ハブ（Hub）</td>
                                    <td>物理層（第1層）</td>
                                    <td>受信した信号を全ポートへそのまま流す</td>
                                    <td>現在はほぼ使われないレガシー機器</td>
                                </tr>
                                <tr>
                                    <td>スイッチ（Switch）</td>
                                    <td>データリンク層（第2層）</td>
                                    <td>MACアドレスを学習し、必要なポートのみへフレームを転送</td>
                                    <td>現在のLANの中心的な機器</td>
                                </tr>
                                <tr>
                                    <td>ルーター（Router）</td>
                                    <td>ネットワーク層（第3層）</td>
                                    <td>異なるネットワーク間でパケットを中継</td>
                                    <td>IPアドレスに基づき経路を選択</td>
                                </tr>
                                <tr>
                                    <td>アクセスポイント（AP）</td>
                                    <td>データリンク層（第2層）</td>
                                    <td>無線LAN端末を有線ネットワークに接続</td>
                                    <td>Wi-Fi通信の中継点</td>
                                </tr>
                                <tr>
                                    <td>ファイアウォール</td>
                                    <td>主に第3〜4層（一部第7層）</td>
                                    <td>通信を許可・拒否してネットワークを保護</td>
                                    <td>セキュリティ基礎ドメインでも扱う</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>4.2　スイッチとルーターの動作の違い</h3>
                        <p>
                            スイッチとルーターは、どちらも「転送」を行う機器ですが、判断に使う情報がまったく異なります。
                        </p>

                        <Diagram
                            id="diagram-switchrouter"
                            label="図4-1：スイッチとルーターの転送判断ロジックの違い"
                        />
                        <p className="mermaid-caption">
                            図4-1：スイッチとルーターの転送判断ロジックの違い
                        </p>

                        <ul>
                            <li>
                                スイッチは「同じネットワーク内で、どの機器（MACアドレス）にどう届けるか」を判断します。
                            </li>
                            <li>
                                ルーターは「異なるネットワーク間で、どの経路（IPネットワーク）を通すか」を判断します。
                            </li>
                        </ul>
                    </section>

                    {/* 第5章 */}
                    <section id={TOC_ITEMS[4].id}>
                        <h2>
                            <span className="chapter-num">第5章</span>
                            イーサネットと物理層／データリンク層
                        </h2>

                        <h3>5.1　有線メディア規格の基礎</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">規格分類</th>
                                    <th scope="col">代表例</th>
                                    <th scope="col">最大速度目安</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ツイストペアケーブル（銅線）</td>
                                    <td>Cat5e</td>
                                    <td>1 Gbps</td>
                                    <td>一般的なオフィスLANで広く使用</td>
                                </tr>
                                <tr>
                                    <td>ツイストペアケーブル（銅線）</td>
                                    <td>Cat6 / Cat6a</td>
                                    <td>1〜10 Gbps</td>
                                    <td>より高速・長距離の伝送に対応</td>
                                </tr>
                                <tr>
                                    <td>光ファイバー</td>
                                    <td>マルチモード（MMF）</td>
                                    <td>数百m〜数km、高速</td>
                                    <td>建物内・拠点間の高速リンク</td>
                                </tr>
                                <tr>
                                    <td>光ファイバー</td>
                                    <td>シングルモード（SMF）</td>
                                    <td>数十km以上</td>
                                    <td>長距離バックボーン回線向け</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>5.2　MACアドレスの仕組み</h3>
                        <p>
                            MACアドレスは、ネットワークインターフェースカード（NIC）ごとに割り当てられる48ビットの物理アドレスです。
                            一般的に16進数12桁（例：<code>00:1A:2B:3C:4D:5E</code>
                            ）で表記され、前半24ビットがベンダー識別子、後半24ビットが機器固有の識別子となっています。
                            同一LANセグメント内での通信は、最終的にこのMACアドレスを宛先として行われます。
                        </p>

                        <h3>5.3　CSMA/CDの考え方</h3>
                        <p>
                            CSMA/CD（Carrier Sense Multiple Access with Collision
                            Detection）は、従来の共有型イーサネット環境で衝突を検知・回避するための仕組みです。
                            現在主流のスイッチ環境（全二重通信）では衝突自体が原理的に発生しないため実務上の重要性は下がっていますが、
                            CCNAの基礎知識として「なぜスイッチ化で衝突がなくなったのか」を理解する土台として押さえておく価値があります。
                        </p>
                    </section>

                    {/* 第6章 */}
                    <section id={TOC_ITEMS[5].id}>
                        <h2>
                            <span className="chapter-num">第6章</span>IPv4アドレッシングの基礎
                        </h2>

                        <h3>6.1　IPアドレスの構造</h3>
                        <p>
                            IPv4アドレスは32ビットで構成され、8ビットずつ4つの「オクテット」に区切り、10進数で表記します（例：
                            <code>192.168.1.10</code>）。
                            IPアドレスは「ネットワーク部」と「ホスト部」の2つに論理的に分かれており、どこで区切るかを示すのが
                            <strong>サブネットマスク</strong>です。
                        </p>

                        <h3>6.2　クラスフルアドレッシング</h3>
                        <p>historicalな分類方法として、IPv4アドレスはクラスA〜Eに分類されます。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">クラス</th>
                                    <th scope="col">先頭ビットパターン</th>
                                    <th scope="col">アドレス範囲（先頭オクテット）</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>クラスA</td>
                                    <td>0</td>
                                    <td>1〜126</td>
                                    <td>超大規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>クラスB</td>
                                    <td>10</td>
                                    <td>128〜191</td>
                                    <td>中〜大規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>クラスC</td>
                                    <td>110</td>
                                    <td>192〜223</td>
                                    <td>小規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>クラスD</td>
                                    <td>1110</td>
                                    <td>224〜239</td>
                                    <td>マルチキャスト用</td>
                                </tr>
                                <tr>
                                    <td>クラスE</td>
                                    <td>1111</td>
                                    <td>240〜255</td>
                                    <td>実験用（予約）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>6.3　サブネットマスクとCIDR表記</h3>
                        <p>
                            現在の実務・CCNA試験では、クラスフルな分類そのものよりも、
                            <strong>CIDR（Classless Inter-Domain Routing）表記</strong>
                            で柔軟にネットワークを区切る考え方が重要です。
                            CIDR表記では、ネットワーク部のビット数を「/(スラッシュ)＋数字」で表します。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">CIDR表記</th>
                                    <th scope="col">サブネットマスク</th>
                                    <th scope="col">ホスト部ビット数</th>
                                    <th scope="col">割り当て可能ホスト数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>/24</td>
                                    <td>255.255.255.0</td>
                                    <td>8ビット</td>
                                    <td>254台</td>
                                </tr>
                                <tr>
                                    <td>/25</td>
                                    <td>255.255.255.128</td>
                                    <td>7ビット</td>
                                    <td>126台</td>
                                </tr>
                                <tr>
                                    <td>/26</td>
                                    <td>255.255.255.192</td>
                                    <td>6ビット</td>
                                    <td>62台</td>
                                </tr>
                                <tr>
                                    <td>/27</td>
                                    <td>255.255.255.224</td>
                                    <td>5ビット</td>
                                    <td>30台</td>
                                </tr>
                                <tr>
                                    <td>/30</td>
                                    <td>255.255.255.252</td>
                                    <td>2ビット</td>
                                    <td>2台（ルーター間リンク等）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>6.4　サブネッティングの実践例</h3>
                        <p>
                            例として、<code>192.168.1.0/24</code>
                            という1つのネットワークを、/26（4分割）でサブネット化する流れを見てみます。
                        </p>

                        <Diagram
                            id="diagram-subnet"
                            label="図6-1：192.168.1.0/24 を /26 で4分割するサブネッティング例"
                        />
                        <p className="mermaid-caption">
                            図6-1：192.168.1.0/24 を /26 で4分割するサブネッティング例
                        </p>

                        <p>
                            <strong>手順の考え方：</strong>
                        </p>
                        <ol>
                            <li>
                                元のネットワーク /24
                                を4つに分割するには、ホスト部から2ビットを借りて /26
                                にする（2²＝4分割）。
                            </li>
                            <li>
                                各サブネットのアドレス数は
                                2⁸⁻²＝64個（うちネットワークアドレスとブロードキャストアドレスを除いた62個が割り当て可能）。
                            </li>
                            <li>
                                各サブネットの開始アドレスは、64ずつ増加する（<code>.0</code> →{' '}
                                <code>.64</code> → <code>.128</code> → <code>.192</code>）。
                            </li>
                        </ol>

                        <h3>6.5　プライベートIPアドレス</h3>
                        <p>
                            インターネットに直接ルーティングされない、組織内部専用のアドレス範囲がRFC
                            1918で定義されています。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">クラス</th>
                                    <th scope="col">プライベートアドレス範囲</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>クラスA</td>
                                    <td>10.0.0.0 〜 10.255.255.255</td>
                                </tr>
                                <tr>
                                    <td>クラスB</td>
                                    <td>172.16.0.0 〜 172.31.255.255</td>
                                </tr>
                                <tr>
                                    <td>クラスC</td>
                                    <td>192.168.0.0 〜 192.168.255.255</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            これらのプライベートアドレスをインターネット上のグローバルIPアドレスに変換する技術が
                            <strong>NAT（Network Address Translation）</strong>であり、
                            CCNAの「IPサービス」ドメインで扱われます。
                        </p>
                    </section>

                    {/* 第7章 */}
                    <section id={TOC_ITEMS[6].id}>
                        <h2>
                            <span className="chapter-num">第7章</span>IPv6の基礎
                        </h2>

                        <h3>7.1　IPv6アドレスの表記</h3>
                        <p>
                            IPv6アドレスは128ビットで構成され、16ビットずつ8つのグループに分け、コロン区切りの16進数で表記します。
                        </p>
                        <div className="code-block" role="region" aria-label="IPv6アドレス例">
                            <div className="code-line">2001:0db8:0000:0000:0000:ff00:0042:8329</div>
                        </div>
                        <p>
                            先頭のゼロ省略や、連続するゼロブロックの「::」への省略（1回のみ使用可能）といった表記ルールがあります。
                        </p>

                        <h3>7.2　IPv6アドレスの主な種類</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ユニキャストアドレス</td>
                                    <td>単一のインターフェースを宛先とするアドレス</td>
                                </tr>
                                <tr>
                                    <td>マルチキャストアドレス</td>
                                    <td>複数のインターフェースへ同時配信するアドレス</td>
                                </tr>
                                <tr>
                                    <td>エニーキャストアドレス</td>
                                    <td>複数機器のうち最も近い1台に届くアドレス</td>
                                </tr>
                                <tr>
                                    <td>リンクローカルアドレス（fe80::/10）</td>
                                    <td>同一リンク内でのみ有効なアドレス</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            IPv6ではブロードキャストという概念が廃止され、マルチキャストとエニーキャストで代替されている点がIPv4との大きな違いです。
                        </p>
                    </section>

                    {/* 第8章 */}
                    <section id={TOC_ITEMS[7].id}>
                        <h2>
                            <span className="chapter-num">第8章</span>TCP/UDPとポート番号
                        </h2>

                        <h3>8.1　トランスポート層の役割</h3>
                        <p>
                            トランスポート層（第4層）は、アプリケーション同士の通信を実現する層で、代表的なプロトコルとして
                            <strong>TCP</strong>と<strong>UDP</strong>があります。
                        </p>

                        <h3>8.2　TCPの3ウェイハンドシェイク</h3>
                        <p>
                            TCPは通信を開始する前に、送受信双方が正しく通信できる状態かを確認する「3ウェイハンドシェイク」という手順を踏みます。
                        </p>

                        <Diagram id="diagram-handshake" label="図8-1：TCPの3ウェイハンドシェイク" />
                        <p className="mermaid-caption">図8-1：TCPの3ウェイハンドシェイク</p>

                        <h3>8.3　TCPとUDPの比較</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">TCP</th>
                                    <th scope="col">UDP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>正式名称</td>
                                    <td>Transmission Control Protocol</td>
                                    <td>User Datagram Protocol</td>
                                </tr>
                                <tr>
                                    <td>接続方式</td>
                                    <td>コネクション型（事前に接続確立）</td>
                                    <td>コネクションレス型（確立手順なし）</td>
                                </tr>
                                <tr>
                                    <td>信頼性</td>
                                    <td>高い（再送制御・順序保証あり）</td>
                                    <td>低い（再送制御なし）</td>
                                </tr>
                                <tr>
                                    <td>速度・オーバーヘッド</td>
                                    <td>やや遅い、ヘッダーが大きい</td>
                                    <td>高速、ヘッダーが小さい</td>
                                </tr>
                                <tr>
                                    <td>代表的な用途</td>
                                    <td>Webブラウジング、メール、ファイル転送</td>
                                    <td>動画・音声のストリーミング、DNS問い合わせ</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>8.4　代表的なポート番号</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ポート番号</th>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>20/21</td>
                                    <td>FTP</td>
                                    <td>ファイル転送</td>
                                </tr>
                                <tr>
                                    <td>22</td>
                                    <td>SSH</td>
                                    <td>暗号化されたリモート接続</td>
                                </tr>
                                <tr>
                                    <td>23</td>
                                    <td>Telnet</td>
                                    <td>暗号化なしのリモート接続</td>
                                </tr>
                                <tr>
                                    <td>25</td>
                                    <td>SMTP</td>
                                    <td>メール送信</td>
                                </tr>
                                <tr>
                                    <td>53</td>
                                    <td>DNS</td>
                                    <td>名前解決</td>
                                </tr>
                                <tr>
                                    <td>67/68</td>
                                    <td>DHCP</td>
                                    <td>IPアドレスの動的割り当て</td>
                                </tr>
                                <tr>
                                    <td>80</td>
                                    <td>HTTP</td>
                                    <td>Web通信（平文）</td>
                                </tr>
                                <tr>
                                    <td>443</td>
                                    <td>HTTPS</td>
                                    <td>Web通信（暗号化）</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* 第9章 */}
                    <section id={TOC_ITEMS[8].id}>
                        <h2>
                            <span className="chapter-num">第9章</span>学習の進め方（ロードマップ）
                        </h2>
                        <p>
                            ネットワークの基礎を土台として、CCNA試験全体をどのような順序で学習していくべきかを図解します。
                        </p>

                        <Diagram
                            id="diagram-roadmap"
                            label="図9-1：ネットワークの基礎からCCNA受験までの学習ロードマップ"
                        />
                        <p className="mermaid-caption">
                            図9-1：ネットワークの基礎からCCNA受験までの学習ロードマップ
                        </p>

                        <p>
                            「ネットワークの基礎」ドメインはすべての土台にあたるため、ここでの理解があいまいなまま次のドメインへ進むと、
                            スイッチングやルーティングの理解にも影響が出やすい点に注意してください。
                        </p>
                    </section>

                    {/* 第10章 */}
                    <section id={TOC_ITEMS[9].id}>
                        <h2>
                            <span className="chapter-num">第10章</span>2026年の重要な最新情報：CCNA
                            200-301 V2.0への移行
                        </h2>
                        <p>
                            学習を始めるにあたって知っておくべき重要な動向があります。ネットワーク技術者Wendell
                            Odom氏のブログ（Cisco Press公式著者）によると、
                            Ciscoは2026年5月20日にCCNA
                            200-301の新ブループリント「V2.0」を発表しました（出典⑤⑥）。
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
                                    <td>現行試験（本ガイド執筆時点）</td>
                                    <td>200-301 V1.1（2024年8月改定版）</td>
                                </tr>
                                <tr>
                                    <td>新ブループリント発表日</td>
                                    <td>2026年5月20日</td>
                                </tr>
                                <tr>
                                    <td>V2.0試験の開始予定時期</td>
                                    <td>2027年2月</td>
                                </tr>
                                <tr>
                                    <td>主な変更の方向性</td>
                                    <td>
                                        「説明する（Describe）」中心だった出題が「設定する（Configure）」「検証する（Verify）」「診断する（Diagnose）」「トラブルシューティングする（Troubleshoot）」といった、より実践的な出題レベルへ引き上げられる（出典⑤）
                                    </td>
                                </tr>
                                <tr>
                                    <td>新設される主なトピック例</td>
                                    <td>
                                        DNSの診断、DHCPのトラブルシューティング、PoEを含むアクセスポート設定、Ansibleを用いた構成管理、AIプロンプトの基礎、エージェント型AIによるネットワーク運用（出典⑤）
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram
                            id="diagram-v2"
                            label="図10-1：CCNA 200-301 V1.1からV2.0への移行タイムライン"
                        />
                        <p className="mermaid-caption">
                            図10-1：CCNA 200-301 V1.1からV2.0への移行タイムライン
                        </p>

                        <div className="callout">
                            <strong>本ガイド作成時点（2026年7月）の位置づけ</strong>
                            ：現在受験できるのは引き続き200-301 V1.1であり、
                            本ガイドで解説した「ネットワークの基礎」（OSIモデル、IPv4/IPv6アドレッシング、TCP/UDPなど）は、V1.1・V2.0のどちらの体系においても変わらず土台となる知識です。
                            ただし受験時期がV2.0開始（2027年2月予定）以降になる場合は、Cisco公式の試験内容ページおよびCisco認定ロードマップ（出典⑨）で最新のブループリントを必ず確認してください。
                        </div>
                    </section>

                    {/* 参考文献・出典 */}
                    <section id={TOC_ITEMS[10].id}>
                        <h2>
                            <span className="chapter-num">参考文献</span>・出典
                        </h2>
                        <p>
                            本ガイドの記述は、以下の一次情報・専門情報源を根拠としています。内容は執筆時点（2026年7月）のものであり、
                            試験内容は変更される可能性があるため、受験前に必ず公式ページで最新情報をご確認ください。
                        </p>
                        <ul className="source-list">
                            <li>
                                <span className="src-title">
                                    ① Cisco公式 CCNA認定ページ（日本語）
                                </span>
                                <a
                                    className="src-url"
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html
                                </a>
                            </li>
                            <li>
                                <span className="src-title">
                                    ② Cisco Learning Network：CCNA試験内容（公式ブループリント）
                                </span>
                                <a
                                    className="src-url"
                                    href="https://learningnetwork.cisco.com/s/ccna-exam-topics"
                                >
                                    https://learningnetwork.cisco.com/s/ccna-exam-topics
                                </a>
                            </li>
                            <li>
                                <span className="src-title">③ Cisco公式 200-301試験ページ</span>
                                <a
                                    className="src-url"
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html
                                </a>
                            </li>
                            <li>
                                <span className="src-title">④ Cisco公式 再認定ポリシー</span>
                                <a
                                    className="src-url"
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html
                                </a>
                            </li>
                            <li>
                                <span className="src-title">
                                    ⑤ Wendell Odom（Cisco Press公式著者）による CCNA
                                    V2.0ブループリント解説
                                </span>
                                <a className="src-url" href="https://www.certskills.com/ccna26-02/">
                                    https://www.certskills.com/ccna26-02/
                                </a>
                            </li>
                            <li>
                                <span className="src-title">
                                    ⑥ CCNA V2.0発表記事（Wendell Odom&apos;s CCNA Skills Blog）
                                </span>
                                <a className="src-url" href="https://www.certskills.com/ccna26-01/">
                                    https://www.certskills.com/ccna26-01/
                                </a>
                            </li>
                            <li>
                                <span className="src-title">
                                    ⑦ CCNA 200-301出題ドメイン配点の分析記事（OpenExamPrep）
                                </span>
                                <a
                                    className="src-url"
                                    href="https://open-exam-prep.com/blog/ccna-200-301-exam-topics-lab-blueprint-2026"
                                >
                                    https://open-exam-prep.com/blog/ccna-200-301-exam-topics-lab-blueprint-2026
                                </a>
                            </li>
                            <li>
                                <span className="src-title">
                                    ⑧ CCNA 200-301シラバス解説記事（Uninets）
                                </span>
                                <a
                                    className="src-url"
                                    href="https://www.uninets.com/blog/ccna-course-syllabus"
                                >
                                    https://www.uninets.com/blog/ccna-course-syllabus
                                </a>
                            </li>
                            <li>
                                <span className="src-title">⑨ Cisco公式 認定ロードマップ</span>
                                <a className="src-url" href="https://www.cisco.com/go/certroadmap">
                                    https://www.cisco.com/go/certroadmap
                                </a>
                            </li>
                        </ul>

                        <p className="footer-note">
                            本ガイドは学習用途の参考資料として作成されたものであり、Cisco Systems,
                            Inc.の公式教材ではありません。
                            試験の詳細な出題範囲・料金・予約方法は、必ず上記の公式ソースでご確認ください。
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
