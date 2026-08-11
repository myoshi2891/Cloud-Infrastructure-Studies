'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

/** Renders a labelled Mermaid diagram while preserving its natural scale. */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            <p className="diagram-caption">{label}</p>
        </div>
    );
}

/** Renders the complete Network Access guide and its seventeen source-backed diagrams. */
export default function CcnaNetworkAccessGuide() {
    return (
        <div className="network-access-page">
            <div className="layout">
                <NavBar />
                <main className="content">
                    <header>
                        <h1>CCNA 200-301「Network Access」セクション徹底解説</h1>
                        <p className="lede">
                            初学者向けステップバイステップガイド —
                            VLANからトランク、EtherChannel、スパニングツリー、無線LANアーキテクチャまで、アクセス層の技術を基礎から積み上げて理解します。
                        </p>
                        <div className="hero-badges">
                            <span className="badge accent">試験コード 200-301</span>
                            <span className="badge accent">ドメイン 2.0 Network Access</span>
                            <span className="badge">配点 20%（v1.1ブループリント）</span>
                            <span className="badge">前提知識：なし</span>
                        </div>
                    </header>

                    {/* 1. このセクションの全体像 */}
                    <section id="overview">
                        <h2>1. このセクションの全体像</h2>
                        <p>
                            CCNA 200-301試験は6つのドメインで構成されており、その中で「<strong>Network Access</strong>」はスイッチング技術（レイヤー2）とワイヤレスの基礎を扱うドメインです。VLAN、トランク、EtherChannel、スパニングツリー、そして無線LANの仕組みまで、企業ネットワークの「入り口」となるアクセス層の技術が範囲になります。
                        </p>

                        <Diagram id="diag-1" label="図1：CCNA 200-301の6ドメインと配点（v1.1ブループリント）" />

                        <p>
                            Network Accessドメインは、以下の9つの試験トピック（2.1〜2.9）で構成されています。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">番号</th>
                                    <th scope="col">トピック</th>
                                    <th scope="col">ひとことで言うと</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2.1</td>
                                    <td>VLANの設定と検証</td>
                                    <td>1台のスイッチをどう論理的に分割するか</td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td>スイッチ間接続（トランク）</td>
                                    <td>複数のVLANを1本のリンクでどう運ぶか</td>
                                </tr>
                                <tr>
                                    <td>2.3</td>
                                    <td>CDP・LLDP</td>
                                    <td>隣接機器をどう自動的に発見するか</td>
                                </tr>
                                <tr>
                                    <td>2.4</td>
                                    <td>EtherChannel（LACP）</td>
                                    <td>複数の物理リンクを1本にまとめる方法</td>
                                </tr>
                                <tr>
                                    <td>2.5</td>
                                    <td>Rapid PVST+</td>
                                    <td>ループをどう防ぐか</td>
                                </tr>
                                <tr>
                                    <td>2.6</td>
                                    <td>ワイヤレスアーキテクチャ・APモード</td>
                                    <td>無線APの動作方式の違い</td>
                                </tr>
                                <tr>
                                    <td>2.7</td>
                                    <td>WLANコンポーネントの物理接続</td>
                                    <td>AP・WLC・LAGがどう配線されるか</td>
                                </tr>
                                <tr>
                                    <td>2.8</td>
                                    <td>デバイス管理アクセス</td>
                                    <td>管理者はどうやって機器にログインするか</td>
                                </tr>
                                <tr>
                                    <td>2.9</td>
                                    <td>ワイヤレスLAN GUI設定</td>
                                    <td>WLCのGUIでどうSSIDを作るか</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="callout warn">
                            <span className="callout-title">⚠️ 2026年7月時点の重要な注意事項</span>
                            <p>
                                Ciscoは2026年5月20日に、200-301 CCNAの大規模改訂版「v2.0」を発表しました。v2.0は<strong>2027年2月3日</strong>から実施され、それまでは現行の<strong>v1.1が引き続き有効</strong>です。v2.0ではNetwork Accessドメインは「Switching and Network Access」に改称され配点が20%→25%に増加し、&quot;troubleshoot（トラブルシュートせよ）&quot;という動詞を使った出題が大幅に増える予定です。本ガイドは<strong>現行v1.1</strong>の内容に基づいて解説しています。受験予定日がv2.0切り替え後になる方は、Cisco Learning Networkで最新のブループリントを必ず確認してください。
                            </p>
                        </div>
                    </section>

                    {/* 2. 前提知識の確認：スイッチングの基礎 */}
                    <section id="prerequisites">
                        <h2>2. 前提知識の確認：スイッチングの基礎</h2>
                        <p>
                            VLANやトランクを理解する前に、スイッチが行っている最も基本的な動作を押さえておきましょう。これは1.0 Network Fundamentalsドメインの範囲ですが、Network Accessを理解する土台になります。
                        </p>
                        <ul>
                            <li>
                                <strong>MACアドレステーブル</strong>：スイッチは受信したフレームの送信元MACアドレスと、それが届いたポート番号を対応づけて記憶します。
                            </li>
                            <li>
                                <strong>フレームの転送（フォワーディング）</strong>：宛先MACアドレスがテーブルにあれば、該当ポートだけにフレームを送ります（ユニキャスト転送）。
                            </li>
                            <li>
                                <strong>フラッディング</strong>：宛先MACアドレスがテーブルにない場合、受信したポート以外の全ポートにフレームをコピーして送信します。
                            </li>
                        </ul>

                        <Diagram id="diag-2" label="図2：スイッチのフレーム転送判断フロー" />

                        <p>
                            この「1つのスイッチは1つのブロードキャストドメイン」という前提を、VLANによってどう分割するかが次章のテーマです。
                        </p>
                    </section>

                    {/* 3. 2.1 VLANの設定と検証 */}
                    <section id="vlan">
                        <h2>3. 2.1 VLANの設定と検証</h2>

                        <h3>3.1 VLANとは何か、なぜ必要か</h3>
                        <p>
                            VLAN（Virtual LAN）は、1台の物理スイッチを複数の論理的なブロードキャストドメインに分割する技術です。物理的な配線を変えずに、部署やフロアごとにネットワークを分離できます。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">理由</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>セキュリティ</td>
                                    <td>部署間の通信を論理的に分離できる</td>
                                </tr>
                                <tr>
                                    <td>ブロードキャスト制御</td>
                                    <td>ブロードキャストの届く範囲を小さくし、無駄なトラフィックを減らす</td>
                                </tr>
                                <tr>
                                    <td>柔軟性</td>
                                    <td>物理的な配置に関係なく、同じ部署のユーザーを同じVLANに所属させられる</td>
                                </tr>
                                <tr>
                                    <td>管理のしやすさ</td>
                                    <td>論理グループごとにポリシーやIPサブネットを適用しやすい</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram id="diag-3" label="図3：1台の物理スイッチをVLANで論理分割" />

                        <p>
                            同じVLAN内のポート同士はレイヤー2で自由に通信できますが、VLANをまたぐ通信（InterVLAN Routing）にはレイヤー3のルーティング機能が必要です。これは次のドメイン（3.0 IP Connectivity）で扱う範囲ですが、試験トピック2.1では「異なるVLAN間は直接通信できない」という概念の理解までが範囲になります。
                        </p>

                        <h3>3.2 アクセスポート（データVLANとボイスVLAN）</h3>
                        <p>
                            アクセスポートは、単一のVLANにのみ所属するスイッチポートです。PCやプリンタなどのエンドデバイスを接続するのが基本用途です。
                        </p>
                        <p>
                            CiscoのIP電話を接続する場合は、1つの物理ポートに<strong>データVLAN</strong>と<strong>ボイスVLAN</strong>の2つを割り当てることができます。IP電話にPCを直列接続（デイジーチェーン）する構成が典型例です。
                        </p>

                        <Diagram id="diag-4" label="図4：IP電話 + PCのデイジーチェーン構成とデータ／ボイスVLAN" />

                        <div className="code-block" role="region" aria-label="VLAN設定コマンド例">
                            <div className="code-line"><span className="code-comment">! VLANの作成</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">vlan 10</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-vlan)# </span><span className="code-cmd">name SOMU</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-vlan)# </span><span className="code-cmd">exit</span></div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-comment">! アクセスポートへの割り当て（データ＋ボイス）</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">interface gi0/1</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport mode access</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport access vlan 10</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport voice vlan 20</span></div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-comment">! 検証</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show vlan brief</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show interfaces gi0/1 switchport</span></div>
                        </div>

                        <h3>3.3 デフォルトVLAN</h3>
                        <p>
                            Cisco Catalystスイッチは、工場出荷時点で<strong>VLAN 1</strong>が存在し、すべてのポートがデフォルトでVLAN 1に所属しています。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">特性</th>
                                    <th scope="col">VLAN 1について</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>削除できるか</td>
                                    <td>できない（作成・削除不可の特殊VLAN）</td>
                                </tr>
                                <tr>
                                    <td>デフォルトの用途</td>
                                    <td>全ポートの初期所属VLAN</td>
                                </tr>
                                <tr>
                                    <td>運用上の推奨</td>
                                    <td>ユーザーデータ用には使わず、管理VLANやユーザーVLANを別途明示的に作成する</td>
                                </tr>
                                <tr>
                                    <td>CDP／VTP／STPなどの制御プロトコル</td>
                                    <td>デフォルトでVLAN 1上を流れる</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            セキュリティのベストプラクティスとして、VLAN 1をそのまま使い続けず、未使用ポートは別のVLAN（いわゆる「ブラックホールVLAN」）に割り当てておくという考え方も、実務およびCCNAの理解として押さえておくとよいでしょう。
                        </p>

                        <h3>3.4 検証コマンドのまとめ</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">コマンド</th>
                                    <th scope="col">確認できる内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>show vlan brief</code></td>
                                    <td>VLAN ID・名前・所属ポート一覧</td>
                                </tr>
                                <tr>
                                    <td><code>show interfaces status</code></td>
                                    <td>各ポートのVLAN所属とリンク状態</td>
                                </tr>
                                <tr>
                                    <td><code>show mac address-table</code></td>
                                    <td>MACアドレスとVLAN・ポートの対応</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* 4. 2.2 スイッチ間接続（トランク）の設定と検証 */}
                    <section id="trunk">
                        <h2>4. 2.2 スイッチ間接続（トランク）の設定と検証</h2>

                        <h3>4.1 トランクポートとは</h3>
                        <p>
                            VLANが複数のスイッチにまたがる場合、スイッチ同士を結ぶリンクで複数のVLANのトラフィックを1本の物理リンクで運ぶ必要があります。このためのポートモードが<strong>トランクポート</strong>です。
                        </p>

                        <Diagram id="diag-5" label="図5：トランクリンクによる複数VLANの伝送" />

                        <h3>4.2 IEEE 802.1Q タギング</h3>
                        <p>
                            トランクリンクを通過するフレームには、802.1Qという規格に基づき<strong>4バイトのVLANタグ</strong>が挿入され、どのVLANに属するフレームかを識別できるようにします。
                        </p>

                        <Diagram id="diag-6" label="図6：802.1Qタギングの流れ" />

                        <div className="code-block" role="region" aria-label="トランク設定コマンド例">
                            <div className="code-line"><span className="code-comment">! トランクポートの設定</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">interface gi0/1</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport trunk encapsulation dot1q</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport mode trunk</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport trunk allowed vlan 10,20,30</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport trunk native vlan 99</span></div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-comment">! 検証</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show interfaces trunk</span></div>
                        </div>

                        <h3>4.3 ネイティブVLAN</h3>
                        <p>
                            802.1Qでは、1つだけ<strong>タグを付けずに送るVLAN</strong>を指定でき、これを<strong>ネイティブVLAN</strong>と呼びます（デフォルトはVLAN 1）。
                        </p>
                        <p>
                            試験で頻出なのが「<strong>ネイティブVLANミスマッチ</strong>」です。トランクの両端でネイティブVLANの設定が食い違っていると、CDPが警告ログを出し、そのVLANのトラフィックが意図しないVLANに漏れる、あるいはループの原因になることがあります。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">状態</th>
                                    <th scope="col">結果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>両端のネイティブVLANが一致</td>
                                    <td>正常に動作</td>
                                </tr>
                                <tr>
                                    <td>両端のネイティブVLANが不一致</td>
                                    <td>ログにネイティブVLANミスマッチの警告が出力される／セキュリティ・到達性の問題が発生し得る</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram id="diag-7" label="図7：ネイティブVLANミスマッチの検出" />
                    </section>

                    {/* 5. 2.3 レイヤー2ディスカバリプロトコル（CDP・LLDP） */}
                    <section id="discovery">
                        <h2>5. 2.3 レイヤー2ディスカバリプロトコル（CDP・LLDP）</h2>
                        <p>
                            隣接するネットワーク機器を自動的に発見し、ネットワーク構成図（トポロジー）の正確性を検証するための仕組みです。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">CDP（Cisco Discovery Protocol）</th>
                                    <th scope="col">LLDP（Link Layer Discovery Protocol）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>標準化</td>
                                    <td>Cisco独自プロトコル</td>
                                    <td>IEEE 802.1AB（ベンダー中立の業界標準）</td>
                                </tr>
                                <tr>
                                    <td>対応機器</td>
                                    <td>主にCisco機器</td>
                                    <td>Cisco機器・他ベンダー機器の両方</td>
                                </tr>
                                <tr>
                                    <td>デフォルト状態</td>
                                    <td>多くのCisco機器で有効</td>
                                    <td>機種により無効の場合あり（有効化が必要なことがある）</td>
                                </tr>
                                <tr>
                                    <td>取得できる情報の例</td>
                                    <td>機器種別、OSバージョン、隣接ポート、IPアドレスなど</td>
                                    <td>同様の隣接情報（TLV形式）</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="code-block" role="region" aria-label="CDP・LLDP確認コマンド例">
                            <div className="code-line"><span className="code-comment">! CDPの確認</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show cdp neighbors</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show cdp neighbors detail</span></div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-comment">! LLDPの有効化と確認</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">lldp run</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show lldp neighbors</span></div>
                        </div>

                        <Diagram id="diag-8" label="図8：CDPとLLDPの適用範囲の違い" />

                        <div className="callout">
                            <span className="callout-title">💡 試験のポイント</span>
                            <p>
                                異なるベンダーの機器が混在する環境では、CDPは使えないためLLDPが必須になります。「ベンダーが違う環境で隣接情報を取得したい」という問題文が出たら、LLDPが正解になる可能性が高いです。
                            </p>
                        </div>
                    </section>

                    {/* 6. 2.4 EtherChannel（LACP） */}
                    <section id="etherchannel">
                        <h2>6. 2.4 EtherChannel（LACP）</h2>

                        <h3>6.1 EtherChannelの目的</h3>
                        <p>
                            複数の物理リンクを論理的に束ねて1本の高帯域なリンクとして扱う技術です。帯域幅の増加に加え、リンク冗長性（1本が切れても通信が継続する）というメリットもあります。
                        </p>

                        <Diagram id="diag-9" label="図9：2本の物理リンクをEtherChannelとして束ねる" />

                        <h3>6.2 EtherChannelのネゴシエーションプロトコル</h3>
                        <p>
                            EtherChannelを自動的にネゴシエートするプロトコルには2種類あり、CCNAで問われるのは主にLACPです。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">標準化</th>
                                    <th scope="col">モードの組み合わせ例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>LACP（Link Aggregation Control Protocol）</td>
                                    <td>IEEE 802.3ad（業界標準）</td>
                                    <td>active + active／active + passive</td>
                                </tr>
                                <tr>
                                    <td>PAgP（Port Aggregation Protocol）</td>
                                    <td>Cisco独自</td>
                                    <td>desirable + desirable／desirable + auto</td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">モード</th>
                                    <th scope="col">動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>active</code></td>
                                    <td>積極的にLACPネゴシエーションを開始する</td>
                                </tr>
                                <tr>
                                    <td><code>passive</code></td>
                                    <td>相手からのネゴシエーション要求を待つ（自分からは開始しない）</td>
                                </tr>
                                <tr>
                                    <td><code>on</code></td>
                                    <td>ネゴシエーションを行わず強制的にチャネルを形成する（プロトコルを使わないモード）</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="callout warn">
                            <span className="callout-title">⚠️ 重要</span>
                            <p>
                                <code>passive</code>同士の組み合わせではネゴシエーションが成立せず、EtherChannelは形成されません。必ずどちらか一方が<code>active</code>である必要があります。
                            </p>
                        </div>

                        <div className="code-block" role="region" aria-label="EtherChannel設定コマンド例">
                            <div className="code-line"><span className="code-comment">! LACPでEtherChannelを構成</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">interface range gi0/1-2</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if-range)# </span><span className="code-cmd">channel-group 1 mode active</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if-range)# </span><span className="code-cmd">exit</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">interface port-channel 1</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">switchport mode trunk</span></div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-comment">! 検証</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show etherchannel summary</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show interfaces port-channel 1</span></div>
                        </div>
                    </section>

                    {/* 7. 2.5 Rapid PVST+ スパニングツリープロトコル */}
                    <section id="stp">
                        <h2>7. 2.5 Rapid PVST+ スパニングツリープロトコル</h2>

                        <h3>7.1 なぜスパニングツリーが必要か</h3>
                        <p>
                            冗長化のためにスイッチ同士を複数のリンクで接続すると、レイヤー2ではループが発生し、ブロードキャストストームやMACアドレステーブルの不安定化を引き起こします。スパニングツリープロトコル（STP）は、冗長リンクの一部を論理的にブロックすることでループを防ぎます。
                        </p>

                        <Diagram id="diag-10" label="図10：ルートブリッジと1リンクのブロックによるループ防止" />

                        <h3>7.2 ルートブリッジの選出</h3>
                        <p>
                            STPはまず、トポロジー内から基準となる<strong>ルートブリッジ</strong>を1台選出します。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">選出基準（優先順）</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1. ブリッジプライオリティが最小</td>
                                    <td>デフォルトは32768。値が小さいほど優先される</td>
                                </tr>
                                <tr>
                                    <td>2. MACアドレスが最小</td>
                                    <td>プライオリティが同値の場合のタイブレーク</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            運用では、意図的にルートブリッジにしたいスイッチのプライオリティを下げて固定することが一般的です。
                        </p>

                        <div className="code-block" role="region" aria-label="STP設定コマンド例">
                            <div className="code-line"><span className="code-comment">! ルートブリッジの固定</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">spanning-tree vlan 10 root primary</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">spanning-tree vlan 10 priority 4096</span></div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="code-comment">! 検証</span></div>
                            <div className="code-line"><span className="code-prompt">Switch# </span><span className="code-cmd">show spanning-tree vlan 10</span></div>
                        </div>

                        <h3>7.3 ポートの役割（ロール）</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">役割</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ルートポート（Root Port）</td>
                                    <td>非ルートブリッジ上で、ルートブリッジへの最短コストを持つ1ポート</td>
                                </tr>
                                <tr>
                                    <td>指定ポート（Designated Port）</td>
                                    <td>各セグメントで転送を担当する1ポート</td>
                                </tr>
                                <tr>
                                    <td>非指定ポート（Non-Designated / Blocking）</td>
                                    <td>ループ防止のため転送をブロックされるポート</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>7.4 ポートの状態（Rapid PVST+ = RSTPベース）</h3>
                        <p>
                            従来の802.1D STPでは4つの状態（Blocking→Listening→Learning→Forwarding）でしたが、Rapid PVST+の基盤であるRSTP（802.1w）ではこれが集約され、収束が大幅に高速化されています。
                        </p>

                        <Diagram id="diag-11" label="図11：Rapid PVST+のポート状態遷移" />

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">従来のSTP（802.1D）</th>
                                    <th scope="col">Rapid PVST+ / RSTP（802.1w）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Blocking</td>
                                    <td>Discarding</td>
                                </tr>
                                <tr>
                                    <td>Listening</td>
                                    <td>Discarding</td>
                                </tr>
                                <tr>
                                    <td>Learning</td>
                                    <td>Learning</td>
                                </tr>
                                <tr>
                                    <td>Forwarding</td>
                                    <td>Forwarding</td>
                                </tr>
                                <tr>
                                    <td>収束に数十秒</td>
                                    <td>収束は数秒以内</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>7.5 PortFastとガード機能</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">機能</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PortFast</td>
                                    <td>エンドデバイス（PCなど）を接続するアクセスポートで、STPの各段階を待たず即座にForwarding状態にする</td>
                                </tr>
                                <tr>
                                    <td>BPDU Guard</td>
                                    <td>PortFastが有効なポートでBPDUを受信した場合、ポートを即座にerr-disable状態にする（不正なスイッチ接続を防止）</td>
                                </tr>
                                <tr>
                                    <td>BPDU Filter</td>
                                    <td>該当ポートでBPDUの送受信自体を行わないようにする</td>
                                </tr>
                                <tr>
                                    <td>Root Guard</td>
                                    <td>指定したポートで、より優れたBPDU（＝ルートブリッジになろうとする機器）を受信した場合にそのポートをブロックし、意図しないルートブリッジの変更を防止する</td>
                                </tr>
                                <tr>
                                    <td>Loop Guard</td>
                                    <td>本来BPDUを受信し続けるはずのポートでBPDUが届かなくなった場合に、誤って転送状態へ遷移することを防ぐ</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram id="diag-12" label="図12：BPDU Guardの判断フロー" />

                        <div className="code-block" role="region" aria-label="PortFast・BPDU Guard設定例">
                            <div className="code-line"><span className="code-comment">! PortFastとBPDU Guardの設定（アクセスポート）</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config)# </span><span className="code-cmd">interface gi0/1</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">spanning-tree portfast</span></div>
                            <div className="code-line"><span className="code-prompt">Switch(config-if)# </span><span className="code-cmd">spanning-tree bpduguard enable</span></div>
                        </div>

                        <div className="callout">
                            <span className="callout-title">💡 試験のポイント</span>
                            <p>
                                PortFastは「PCなど末端デバイス用」、BPDU GuardやRoot Guardは「不正な機器やトポロジー変更を防ぐための保護機能」という役割の違いを混同しないようにしましょう。
                            </p>
                        </div>
                    </section>

                    {/* 8. 2.6 Ciscoワイヤレスアーキテクチャ と APモード */}
                    <section id="wireless-arch">
                        <h2>8. 2.6 Ciscoワイヤレスアーキテクチャ と APモード</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">アーキテクチャ</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">制御プレーンの場所</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>自律型（Autonomous）AP</td>
                                    <td>AP単体で無線制御（RF管理・認証など）を完結させる</td>
                                    <td>AP自身</td>
                                </tr>
                                <tr>
                                    <td>分離MAC（Split-MAC）／集中型（コントローラベース）</td>
                                    <td>AP（Lightweight AP）はデータ転送に専念し、無線制御はWLC（Wireless LAN Controller）に集約する</td>
                                    <td>WLC（コントローラ）</td>
                                </tr>
                                <tr>
                                    <td>クラウド管理型</td>
                                    <td>APの管理・可視化をクラウド上のダッシュボードで行う（例：Cisco Meraki）</td>
                                    <td>クラウド上のコントローラ</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram id="diag-13" label="図13：3種類のワイヤレスアーキテクチャの比較" />

                        <p>
                            コントローラベースのアーキテクチャでは、APとWLCの間の通信は<strong>CAPWAP</strong>（Control And Provisioning of Wireless Access Points）というトンネルプロトコルでカプセル化されます。多数のAPを一元管理できることが最大のメリットです。
                        </p>
                    </section>

                    {/* 9. 2.7 WLANコンポーネントの物理接続 */}
                    <section id="wlan-physical">
                        <h2>9. 2.7 WLANコンポーネントの物理接続</h2>
                        <p>
                            コントローラベースのワイヤレス環境における、実際の配線と論理構成を確認します。
                        </p>

                        <Diagram id="diag-14" label="図14：AP・スイッチ・WLCの物理接続" />

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">コンポーネント</th>
                                    <th scope="col">接続タイプ</th>
                                    <th scope="col">補足</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>AP → アクセススイッチ</td>
                                    <td>アクセスポート（多くは管理用VLAN）</td>
                                    <td>PoEで給電されることが多い</td>
                                </tr>
                                <tr>
                                    <td>アクセススイッチ → 上位スイッチ</td>
                                    <td>トランクポート</td>
                                    <td>複数のクライアントVLANを一括で伝送</td>
                                </tr>
                                <tr>
                                    <td>上位スイッチ → WLC</td>
                                    <td>LAG（Link Aggregation）</td>
                                    <td>WLCに集中する多数のAPトラフィックを高帯域・冗長構成で受け止める</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* 10. 2.8 ネットワークデバイスの管理アクセス */}
                    <section id="mgmt-access">
                        <h2>10. 2.8 ネットワークデバイスの管理アクセス</h2>
                        <p>
                            ネットワーク機器へ管理者としてログインする方法は複数あり、セキュリティ特性が異なります。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">方式</th>
                                    <th scope="col">暗号化</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>コンソール</td>
                                    <td>なし（物理接続のため通常は暗号化不要）</td>
                                    <td>初期設定・障害時のアウトオブバンド接続</td>
                                </tr>
                                <tr>
                                    <td>Telnet</td>
                                    <td>暗号化なし（平文）</td>
                                    <td>現在は非推奨。試験では「安全でない」選択肢として登場しやすい</td>
                                </tr>
                                <tr>
                                    <td>SSH</td>
                                    <td>暗号化あり</td>
                                    <td>リモート管理の標準的な方式</td>
                                </tr>
                                <tr>
                                    <td>HTTP</td>
                                    <td>暗号化なし</td>
                                    <td>Web GUI管理（非推奨）</td>
                                </tr>
                                <tr>
                                    <td>HTTPS</td>
                                    <td>暗号化あり</td>
                                    <td>Web GUI管理（推奨）</td>
                                </tr>
                                <tr>
                                    <td>TACACS+ / RADIUS</td>
                                    <td>認証通信は暗号化（TACACS+はペイロード全体を暗号化）</td>
                                    <td>集中管理されたAAA（認証・認可・アカウンティング）サーバーとの連携</td>
                                </tr>
                                <tr>
                                    <td>クラウド管理</td>
                                    <td>クラウドサービス側の暗号化通信に依存</td>
                                    <td>Meraki等のクラウドダッシュボード経由での管理</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram id="diag-15" label="図15：管理アクセス方式の選択フロー" />

                        <div className="callout">
                            <span className="callout-title">💡 試験のポイント</span>
                            <p>
                                「安全な管理アクセス方法はどれか」と問われたら、Telnet／HTTPではなくSSH／HTTPSを選ぶのが基本です。
                            </p>
                        </div>
                    </section>

                    {/* 11. 2.9 ワイヤレスLAN GUI設定の解釈 */}
                    <section id="wlan-gui">
                        <h2>11. 2.9 ワイヤレスLAN GUI設定の解釈</h2>
                        <p>
                            このトピックは、WLCのGUI画面上で行うWLAN作成の流れを「読み解ける」ことが求められます（CLIでのフルコンフィグではなく、GUI操作の理解が中心です）。
                        </p>

                        <Diagram id="diag-16" label="図16：WLC GUIでのWLAN作成フロー" />

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">設定項目</th>
                                    <th scope="col">GUI上で確認・設定する内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>WLAN作成</td>
                                    <td>SSID名、WLAN ID、有効/無効の切り替え</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ設定</td>
                                    <td>WPA2-Personal（PSK）／WPA2-Enterprise／WPA3などの選択、事前共有キーの設定</td>
                                </tr>
                                <tr>
                                    <td>QoSプロファイル</td>
                                    <td>Platinum（音声）／Gold（映像）／Silver（ベストエフォート）／Bronze（バックグラウンド）といった優先度クラス</td>
                                </tr>
                                <tr>
                                    <td>詳細設定</td>
                                    <td>クライアントVLANのマッピング、ブロードキャストSSIDの有無、セッションタイムアウトなど</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* 12. 試験対策：頻出の引っかけポイント */}
                    <section id="exam-tips">
                        <h2>12. 試験対策：頻出の引っかけポイント</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">引っかけやすいポイント</th>
                                    <th scope="col">正しい理解</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VLANとIPサブネットを同一視してしまう</td>
                                    <td>VLANはレイヤー2のブロードキャストドメイン、サブネットはレイヤー3の概念。多くの設計では1対1で対応させるが、概念としては別物</td>
                                </tr>
                                <tr>
                                    <td>ネイティブVLANはタグが付くと誤解する</td>
                                    <td>ネイティブVLANのフレームだけはタグなしで送信される</td>
                                </tr>
                                <tr>
                                    <td>LACP passive同士で組んでしまう</td>
                                    <td>passive同士ではネゴシエーションが成立しないため、必ず片方はactiveにする</td>
                                </tr>
                                <tr>
                                    <td>PortFastとBPDU Guardを混同する</td>
                                    <td>PortFastは「早く転送状態にする」機能、BPDU Guardは「不正なBPDU受信時にポートを止める」保護機能</td>
                                </tr>
                                <tr>
                                    <td>STPのポート状態を旧バージョンの4状態で覚えてしまう</td>
                                    <td>Rapid PVST+（RSTP）ではDiscarding／Learning／Forwardingの3状態に整理されている</td>
                                </tr>
                                <tr>
                                    <td>CDPを他ベンダー機器でも使えると誤解する</td>
                                    <td>CDPはCisco専用。ベンダー混在環境ではLLDPを使う</td>
                                </tr>
                                <tr>
                                    <td>Telnet・HTTPを安全な管理方式として選んでしまう</td>
                                    <td>暗号化されないため非推奨。SSH・HTTPSが基本</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* 13. ハンズオン学習の進め方 */}
                    <section id="hands-on">
                        <h2>13. ハンズオン学習の進め方</h2>
                        <p>
                            読むだけでなく、実際に手を動かすことがこのドメインの理解を大きく左右します。Cisco Packet Tracerなどのシミュレータで、以下のような構成を組んで検証すると効果的です。
                        </p>

                        <Diagram id="diag-17" label="図17：3台スイッチによる演習トポロジー" />

                        <p><strong>おすすめの演習ステップ</strong></p>
                        <ol>
                            <li>3台のスイッチで上図のようなループのあるトポロジーを作り、2つ以上のVLANを作成する</li>
                            <li>各スイッチ間のリンクをトランクとして設定し、<code>show interfaces trunk</code> で許可VLANとネイティブVLANを確認する</li>
                            <li><code>show spanning-tree vlan 10</code> を実行し、どのスイッチがルートブリッジになっているか、どのポートがブロックされているかを確認する</li>
                            <li><code>spanning-tree vlan 10 priority 4096</code> で意図的にルートブリッジを変更し、収束後のポート役割の変化を観察する</li>
                            <li>2本のリンクでEtherChannelを構成し、<code>channel-group 1 mode active</code> で束ね、<code>show etherchannel summary</code> で状態を確認する</li>
                            <li>1本のリンクをあえて切断し、EtherChannelとSTPそれぞれの挙動（フェイルオーバーの速さ）を比較する</li>
                        </ol>
                    </section>

                    {/* 14. セクション全体のまとめ表 */}
                    <section id="summary">
                        <h2>14. セクション全体のまとめ表</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">試験トピック</th>
                                    <th scope="col">キーワード</th>
                                    <th scope="col">主要コマンド例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2.1 VLAN</td>
                                    <td>アクセスポート、データ/ボイスVLAN、デフォルトVLAN</td>
                                    <td><code>switchport access vlan</code>, <code>show vlan brief</code></td>
                                </tr>
                                <tr>
                                    <td>2.2 トランク</td>
                                    <td>802.1Q、ネイティブVLAN</td>
                                    <td><code>switchport mode trunk</code>, <code>show interfaces trunk</code></td>
                                </tr>
                                <tr>
                                    <td>2.3 CDP/LLDP</td>
                                    <td>隣接機器の自動検出</td>
                                    <td><code>show cdp neighbors</code>, <code>show lldp neighbors</code></td>
                                </tr>
                                <tr>
                                    <td>2.4 EtherChannel</td>
                                    <td>LACP active/passive</td>
                                    <td><code>channel-group mode active</code>, <code>show etherchannel summary</code></td>
                                </tr>
                                <tr>
                                    <td>2.5 Rapid PVST+</td>
                                    <td>ルートブリッジ、ポート役割・状態、PortFast、各種ガード</td>
                                    <td><code>spanning-tree vlan root primary</code>, <code>show spanning-tree</code></td>
                                </tr>
                                <tr>
                                    <td>2.6 無線アーキテクチャ</td>
                                    <td>自律型／分離MAC／クラウド管理型</td>
                                    <td>（GUI・概念理解が中心）</td>
                                </tr>
                                <tr>
                                    <td>2.7 WLAN物理接続</td>
                                    <td>AP・WLC・LAGの配線</td>
                                    <td>（物理構成の理解が中心）</td>
                                </tr>
                                <tr>
                                    <td>2.8 管理アクセス</td>
                                    <td>Telnet/SSH/HTTP/HTTPS/TACACS+/RADIUS</td>
                                    <td>（安全性の比較理解が中心）</td>
                                </tr>
                                <tr>
                                    <td>2.9 WLAN GUI設定</td>
                                    <td>SSID作成、セキュリティ、QoSプロファイル</td>
                                    <td>（WLC GUI操作の理解が中心）</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* 15. 参考資料・出典 */}
                    <section id="sources">
                        <h2>15. 参考資料・出典</h2>
                        <p>
                            本ガイドの試験範囲・配点・トピック構成は、以下のCisco公式情報および関連情報に基づいています。
                        </p>
                        <ul>
                            <li>
                                Cisco公式 CCNA認定ページ（日本語）：<br />
                                <a
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html
                                </a>
                            </li>
                            <li>
                                Cisco公式 200-301 CCNA試験トピックス v1.1（英語PDF、現行ブループリント）：<br />
                                <a
                                    href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf
                                </a>
                            </li>
                            <li>
                                Cisco公式 200-301 CCNA試験トピックス（日本語PDF）：<br />
                                <a
                                    href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-301-CCNA.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-301-CCNA.pdf
                                </a>
                            </li>
                            <li>
                                Cisco公式 200-301 CCNA v2.0試験トピックス（2027年2月3日開始予定の次期ブループリント）：<br />
                                <a
                                    href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf
                                </a>
                            </li>
                            <li>
                                CCNA v1.1からv2.0への移行スケジュールに関する解説記事：<br />
                                <a
                                    href="https://trainingcamp.com/articles/ccna-is-changing-in-2027-take-the-current-exam-or-wait-for-v2-0/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://trainingcamp.com/articles/ccna-is-changing-in-2027-take-the-current-exam-or-wait-for-v2-0/
                                </a>
                            </li>
                        </ul>
                        <p>
                            試験トピックスはCiscoの都合により予告なく変更される場合があります。受験前には必ず
                            <a
                                href="https://learningnetwork.cisco.com/s/ccna-exam-topics"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cisco Learning Network
                            </a>
                            で最新のブループリントをご確認ください。
                        </p>
                    </section>

                    <footer className="page-footer">
                        CCNA 200-301「Network Access」徹底解説ガイド &middot; Domain 2.0 &middot; 20% of exam (v1.1 blueprint)
                    </footer>
                </main>
            </div>
        </div>
    );
}
