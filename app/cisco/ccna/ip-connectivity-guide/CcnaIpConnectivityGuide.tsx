import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

const DIAGRAM_DISPLAY: Record<string, { frameWidth: number; preserveNaturalScale: boolean }> = {
    'overview-pie': { frameWidth: 760, preserveNaturalScale: true },
    'packet-flow': { frameWidth: 760, preserveNaturalScale: true },
    'forwarding-logic': { frameWidth: 760, preserveNaturalScale: true },
    'static-route-topology': { frameWidth: 980, preserveNaturalScale: true },
    'ospf-neighbor-states': { frameWidth: 760, preserveNaturalScale: true },
    'ospf-dr-bdr-selection': { frameWidth: 760, preserveNaturalScale: true },
    'fhrp-concept': { frameWidth: 900, preserveNaturalScale: true },
};

/**
 * Renders a configured Mermaid diagram with its display settings.
 *
 * @param id - The diagram identifier used to select its chart and display options
 * @param label - The accessible label for the rendered diagram
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    const display = DIAGRAM_DISPLAY[id] ?? { frameWidth: 760, preserveNaturalScale: true };
    return (
        <div
            className="mermaid-wrap"
            data-diagram-id={id}
            style={{ maxWidth: `${display.frameWidth}px` }}
        >
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale={display.preserveNaturalScale}
            />
        </div>
    );
}

/**
 * Renders the CCNA 200-301 IP Connectivity study guide.
 */
export function CcnaIpConnectivityGuide() {
    return (
        <div className="ccna-ip-connectivity-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    <header className="hero">
                        <div className="hero-eyebrow">CCNA 200-301 STUDY GUIDE</div>
                        <h1>
                            CCNA 200-301 徹底解説
                            <br />
                            IP Connectivity（IP接続性）編
                        </h1>
                        <p>
                            CCNA 200-301試験は6つのドメインで構成されており、そのうち「IP Connectivity」は
                            <strong style={{ color: 'var(--text)' }}>
                                単独で最も出題比率が高い分野（25%）
                            </strong>
                            です。ルーティングの基礎を理解していないと、この後に学ぶIP ServicesやSecurity
                            Fundamentalsの理解も浅くなってしまうため、CCNA学習の中核と言える範囲です。
                        </p>
                    </header>

                    <article className="prose">
                        {/* 0 */}
                        <section id="overview">
                            <h2>0. このガイドの全体像</h2>
                            <Diagram id="overview-pie" label="CCNA 200-301 ドメイン別 出題比率" />
                            <p>
                                このガイドでは、公式試験ブループリント（v1.1）の「3.0 IP
                                Connectivity」に定義された以下の5つのサブトピックを、初学者向けに順番通り・図解付きで解説します。
                            </p>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">番号</th>
                                        <th scope="col">サブトピック</th>
                                        <th scope="col">本ガイドの章</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3.1</td>
                                        <td>ルーティングテーブルの構成要素を解釈する</td>
                                        <td>第1章</td>
                                    </tr>
                                    <tr>
                                        <td>3.2</td>
                                        <td>
                                            ルータがデフォルトでフォワーディング決定を行う仕組みを判断する
                                        </td>
                                        <td>第2章</td>
                                    </tr>
                                    <tr>
                                        <td>3.3</td>
                                        <td>IPv4/IPv6スタティックルーティングの設定と検証</td>
                                        <td>第3章</td>
                                    </tr>
                                    <tr>
                                        <td>3.4</td>
                                        <td>シングルエリアOSPFv2の設定と検証</td>
                                        <td>第4章</td>
                                    </tr>
                                    <tr>
                                        <td>3.5</td>
                                        <td>ファーストホップ冗長プロトコル（FHRP）の目的を説明する</td>
                                        <td>第5章</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Chapter 1 */}
                        <section id="ch1">
                            <h2>第1章｜3.1 ルーティングテーブルの構成要素を解釈する</h2>
                            <h3>1-1. ルーティングテーブルとは何か</h3>
                            <p>
                                ルーティングテーブルは、ルータがパケットを受信した際に「どの送信先に届けるために、どのインターフェースから送り出すべきか」を記した
                                <strong>「地図（ナビゲーション）」</strong>
                                です。
                            </p>
                            <p>
                                Cisco IOSで <code>show ip route</code> コマンドを実行すると表示されます。
                            </p>

                            <div className="code-block">
                                <div className="code-line">
                                    <span className="code-comment">! show ip route の出力例</span>
                                </div>
                                <div className="code-line">
                                    Codes: <span className="code-code">C</span> - connected,{' '}
                                    <span className="code-code">S</span> - static,{' '}
                                    <span className="code-code">R</span> - RIP,{' '}
                                    <span className="code-code">M</span> - mobile,{' '}
                                    <span className="code-code">B</span> - BGP
                                </div>
                                <div className="code-line">
                                    <span className="code-code">D</span> - EIGRP,{' '}
                                    <span className="code-code">EX</span> - EIGRP external,{' '}
                                    <span className="code-code">O</span> - OSPF,{' '}
                                    <span className="code-code">IA</span> - OSPF inter area
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    Gateway of last resort is{' '}
                                    <span className="code-net">192.168.1.1</span> to network{' '}
                                    <span className="code-net">0.0.0.0</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-code">C</span>      {' '}
                                    <span className="code-net">192.168.10.0/24</span> is directly connected, GigabitEthernet0/0
                                </div>
                                <div className="code-line">
                                    <span className="code-code">L</span>      {' '}
                                    <span className="code-net">192.168.10.1/32</span> is directly connected, GigabitEthernet0/0
                                </div>
                                <div className="code-line">
                                    <span className="code-code">S</span>      {' '}
                                    <span className="code-net">10.1.0.0/16</span> [<span className="code-num">1</span>/<span className="code-num">0</span>] via <span className="code-net">192.168.1.2</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-code">O</span>      {' '}
                                    <span className="code-net">172.16.0.0/16</span> [<span className="code-num">110</span>/<span className="code-num">20</span>] via <span className="code-net">192.168.1.3</span>, 00:12:45, GigabitEthernet0/1
                                </div>
                                <div className="code-line">
                                    <span className="code-code">S*</span>     {' '}
                                    <span className="code-net">0.0.0.0/0</span> [<span className="code-num">1</span>/<span className="code-num">0</span>] via <span className="code-net">192.168.1.1</span>
                                </div>
                            </div>

                            <h3>1-2. 各構成要素の意味（試験で問われるポイント）</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">構成要素</th>
                                        <th scope="col">表示例</th>
                                        <th scope="col">解説</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>ルーティングプロトコルコード</strong>
                                        </td>
                                        <td>
                                            <code>C</code>, <code>L</code>, <code>S</code>,{' '}
                                            <code>O</code>, <code>D</code>
                                        </td>
                                        <td>
                                            経路情報をどのように学習したかを示します。
                                            <br />
                                            <code>C</code>: 直接接続（Connected）
                                            <br />
                                            <code>L</code>: ローカルIP（自分自身のIPアドレス/32）
                                            <br />
                                            <code>S</code>: スタティックルート（静的設定）
                                            <br />
                                            <code>O</code>: OSPF
                                            <br />
                                            <code>D</code>: EIGRP
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>プレフィックス（ネットワークID）</strong>
                                        </td>
                                        <td>
                                            <code>10.1.0.0/16</code>
                                        </td>
                                        <td>宛先ネットワークの範囲とサブネットマスク長。</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                アドミニストレーティブディスタンス（AD）
                                            </strong>
                                        </td>
                                        <td>
                                            <code>[110/20]</code> の <code>110</code>
                                        </td>
                                        <td>
                                            経路情報の信頼度（数字が小さいほど信頼性が高く優先される）。
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>メトリック（Metric）</strong>
                                        </td>
                                        <td>
                                            <code>[110/20]</code> の <code>20</code>
                                        </td>
                                        <td>
                                            同じプロトコル内での経路の「コスト（距離・遅延など）」。数字が小さいほど良い経路。
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>ネクストホップ（Next Hop）</strong>
                                        </td>
                                        <td>
                                            <code>via 192.168.1.3</code>
                                        </td>
                                        <td>次にパケットを渡すべき隣接ルータのIPアドレス。</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>出力インターフェース</strong>
                                        </td>
                                        <td>
                                            <code>GigabitEthernet0/1</code>
                                        </td>
                                        <td>パケットを送り出す自ルータのポート名。</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>ゲートウェイ・オブ・ラストリゾート</strong>
                                        </td>
                                        <td>
                                            <code>0.0.0.0/0</code>
                                        </td>
                                        <td>
                                            ルーティングテーブルに該当する個別経路がない場合に使うデフォルトルート。
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="callout">
                                <strong>💡 初学者がつまずきやすいポイント</strong>
                                <br />
                                <code>[110/20]</code> のような表記は「
                                <strong>[AD/メトリック]</strong>
                                」の順番で書かれています。AD（信頼度）が先、メトリック（コスト）が後です。試験ではこの順番を逆にしてひっかける問題が出題されるため、「AD
                                → メトリック」の順を確実に暗記しましょう。
                            </div>

                            <h3>1-3. パケット転送の流れ（全体イメージ）</h3>
                            <Diagram id="packet-flow" label="パケット転送フローチャート" />
                        </section>

                        {/* Chapter 2 */}
                        <section id="ch2">
                            <h2>第2章｜3.2 ルータのフォワーディング決定ロジック</h2>
                            <p>
                                同じ宛先に対して複数の経路情報がある場合、ルータは以下の
                                <strong>3段階の優先順位</strong>
                                で「どの経路を実際に使うか」を決定します。これが試験トピック3.2の核心です。
                            </p>

                            <Diagram
                                id="forwarding-logic"
                                label="フォワーディング決定ロジック"
                            />

                            <h3>2-1. ①最長プレフィックスマッチ（Longest Prefix Match）</h3>
                            <p>
                                <strong>最も優先される</strong>
                                ルール。宛先IPアドレスに対して、より長い（より詳細な＝ホスト数が少ない）プレフィックスを持つ経路が常に優先されます。
                            </p>
                            <p>
                                例：宛先 <code>10.10.20.5</code> へのパケットがある場合
                            </p>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">候補経路</th>
                                        <th scope="col">プレフィックス長</th>
                                        <th scope="col">採用される？</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>10.0.0.0/8</code>
                                        </td>
                                        <td>/8（大まかな範囲）</td>
                                        <td>❌ 不採用</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>10.10.0.0/16</code>
                                        </td>
                                        <td>/16</td>
                                        <td>❌ 不採用</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>10.10.20.0/24</code>
                                        </td>
                                        <td>/24（最も詳細）</td>
                                        <td>
                                            ✅ <strong>採用</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>
                                →
                                プレフィックス長が異なる場合は、ADやメトリックを比較するまでもなく、最長一致が常に勝ちます。
                            </p>

                            <h3>2-2. ②アドミニストレーティブディスタンス（AD）</h3>
                            <p>
                                プレフィックス長が同じ経路が複数の情報源（プロトコル）から学習された場合に比較される「情報源の信頼度」です。
                                <strong>値が小さいほど信頼性が高く、優先されます。</strong>
                            </p>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">経路種別 / プロトコル</th>
                                        <th scope="col">デフォルトAD値</th>
                                        <th scope="col">覚え方のコツ・試験対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>直接接続（Connected）</td>
                                        <td>
                                            <strong>0</strong>
                                        </td>
                                        <td>最強。物理的に繋がっているため最も信頼</td>
                                    </tr>
                                    <tr>
                                        <td>ローカル（Local）</td>
                                        <td>
                                            <strong>0</strong>
                                        </td>
                                        <td>自分自身のIPアドレス（/32）</td>
                                    </tr>
                                    <tr>
                                        <td>スタティックルート（Static）</td>
                                        <td>
                                            <strong>1</strong>
                                        </td>
                                        <td>手動設定なので極めて高い信頼度</td>
                                    </tr>
                                    <tr>
                                        <td>eBGP（外部BGP）</td>
                                        <td>
                                            <strong>20</strong>
                                        </td>
                                        <td>組織間ルーティング</td>
                                    </tr>
                                    <tr>
                                        <td>EIGRP（内部）</td>
                                        <td>
                                            <strong>90</strong>
                                        </td>
                                        <td>Cisco独自の高機能プロトコル</td>
                                    </tr>
                                    <tr>
                                        <td>OSPF</td>
                                        <td>
                                            <strong>110</strong>
                                        </td>
                                        <td><strong>試験最頻出！必ず覚える</strong></td>
                                    </tr>
                                    <tr>
                                        <td>IS-IS</td>
                                        <td>
                                            <strong>115</strong>
                                        </td>
                                        <td>大規模キャリア向け</td>
                                    </tr>
                                    <tr>
                                        <td>RIP</td>
                                        <td>
                                            <strong>120</strong>
                                        </td>
                                        <td>古いプロトコルで信頼度が低い</td>
                                    </tr>
                                    <tr>
                                        <td>iBGP（内部BGP）</td>
                                        <td>
                                            <strong>200</strong>
                                        </td>
                                        <td>組織内BGP</td>
                                    </tr>
                                    <tr>
                                        <td>未知 / 受信拒否（Unreachable）</td>
                                        <td>
                                            <strong>255</strong>
                                        </td>
                                        <td>ルーティングテーブルに載せない</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>2-3. ③メトリック</h3>
                            <p>
                                プレフィックス長もAD値も同じ場合（＝同じルーティングプロトコル内で複数経路がある場合）に比較されます。
                                <strong>値が小さいほど低コスト（良い経路）</strong>
                                です。
                            </p>
                            <ul>
                                <li>
                                    <strong>OSPFのメトリック</strong>:
                                    コスト（Cost = 100Mbps / インターフェース帯域幅）
                                </li>
                                <li>
                                    <strong>RIPのメトリック</strong>:
                                    ホップ数（Hop Count = 通過するルータの数）
                                </li>
                                <li>
                                    <strong>EIGRPのメトリック</strong>:
                                    帯域幅（Bandwidth）と遅延（Delay）から算出される複合メトリック
                                </li>
                            </ul>
                        </section>

                        {/* Chapter 3 */}
                        <section id="ch3">
                            <h2>第3章｜3.3 IPv4/IPv6スタティックルーティングの設定・検証</h2>
                            <h3>3-1. スタティックルートの4分類</h3>
                            <p>
                                スタティックルートは設定用途によって4つのパターンに分類され、試験でもそれぞれの特徴・設定方法が問われます。
                            </p>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">概要</th>
                                        <th scope="col">IPv4設定例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>標準スタティックルート</strong>
                                        </td>
                                        <td>特定の宛先サブネットへの経路を指定する最も一般的な設定</td>
                                        <td>
                                            <code>
                                                ip route 10.1.0.0 255.255.0.0 192.168.1.2
                                            </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>デフォルトスタティックルート</strong>
                                        </td>
                                        <td>
                                            <code>0.0.0.0/0</code>{' '}
                                            を指定し、ルーティングテーブルにない全宛先のパケットを転送
                                        </td>
                                        <td>
                                            <code>
                                                ip route 0.0.0.0 0.0.0.0 192.168.1.1
                                            </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>ホストルート</strong>
                                        </td>
                                        <td>
                                            特定1台のホスト（<code>/32</code> または{' '}
                                            <code>/128</code>）へのピンポイント経路
                                        </td>
                                        <td>
                                            <code>
                                                ip route 10.1.1.50 255.255.255.255
                                                192.168.1.2
                                            </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                フローティングスタティックルート
                                            </strong>
                                        </td>
                                        <td>
                                            デフォルトより大きいAD値を設定し、プライマリ経路ダウン時のみ有効化するバックアップ経路
                                        </td>
                                        <td>
                                            <code>
                                                ip route 10.1.0.0 255.255.0.0
                                                192.168.2.2 200
                                            </code>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>3-2. 構成例（トポロジ）</h3>
                            <p>
                                以下は、R1がR2（プライマリ）とR3（バックアップ）の2経路でネットワーク{' '}
                                <code>10.10.20.0/24</code> に到達できる構成です。
                            </p>

                            <Diagram
                                id="static-route-topology"
                                label="スタティックルートのトポロジ"
                            />

                            <h3>3-3. IOS設定例</h3>
                            <div className="code-block">
                                <div className="code-line">
                                    <span className="code-comment">! プライマリ経路（デフォルトのAD=1）</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span> <span className="code-cmd">ip route</span> <span className="code-net">10.10.20.0 255.255.255.0 192.168.1.2</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-comment">! フローティングスタティック（バックアップ経路。AD=200に設定し優先度を下げる）</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span> <span className="code-cmd">ip route</span> <span className="code-net">10.10.20.0 255.255.255.0 192.168.10.2</span> <span className="code-num">200</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-comment">! IPv6スタティックルート（IPv4と考え方は同じ）</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span> <span className="code-cmd">ipv6 route</span> <span className="code-net">2001:db8:20::/64 2001:db8:1::2</span>
                                </div>
                            </div>

                            <p>
                                R2経由の経路（AD=1）が生きている限り、ルーティングテーブルにはR2経由の経路のみが載ります。R2経由の経路が消えた（リンクダウンした）場合にのみ、AD=200のR3経由の経路がルーティングテーブルに現れ、通信が自動的に切り替わります。これが「フローティング（浮動）」と呼ばれる理由です。
                            </p>

                            <h3>3-4. 検証コマンド</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>show ip route</code>
                                        </td>
                                        <td>IPv4ルーティングテーブル全体を確認</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>show ip route static</code>
                                        </td>
                                        <td>スタティックルートのみを絞り込んで確認</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>show ipv6 route</code>
                                        </td>
                                        <td>IPv6ルーティングテーブルを確認</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>ping</code> / <code>traceroute</code>
                                        </td>
                                        <td>実際の到達性を確認</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Chapter 4 */}
                        <section id="ch4">
                            <h2>第4章｜3.4 シングルエリアOSPFv2の設定・検証</h2>
                            <h3>4-1. OSPFの基本動作</h3>
                            <p>
                                OSPF（Open Shortest Path
                                First）はリンクステート型のルーティングプロトコルです。ルータ同士が「隣接関係（アジェセンシー）」を確立し、リンク状態情報（LSA）を交換し合うことで、ネットワーク全体のトポロジを学習し、最短経路を計算します。
                            </p>

                            <h3>4-2. ネイバー隣接関係（Neighbor Adjacency）の確立ステート</h3>
                            <p>
                                2台のOSPFルータが隣接関係を確立するまでには、以下のステートを順番に遷移します。
                            </p>

                            <Diagram
                                id="ospf-neighbor-states"
                                label="OSPFネイバー状態遷移"
                            />

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステート</th>
                                        <th scope="col">状態の意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Down</td>
                                        <td>隣接ルータからHelloパケットを受信していない初期状態</td>
                                    </tr>
                                    <tr>
                                        <td>Init</td>
                                        <td>
                                            Helloパケットを受信したが、相手のHelloに自分のRouter
                                            IDがまだ含まれていない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2-Way</td>
                                        <td>
                                            双方向の疎通を確認（マルチアクセス網ではDR/BDR選出がこの時点で行われる）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ExStart</td>
                                        <td>DBD交換のためのマスター／スレーブ関係を決定</td>
                                    </tr>
                                    <tr>
                                        <td>Exchange</td>
                                        <td>
                                            DBD（データベース記述パケット）を交換し、互いが持つLSAの一覧を確認
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Loading</td>
                                        <td>不足しているLSAの詳細をLSR/LSUでやり取り</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Full</strong>
                                        </td>
                                        <td>
                                            <strong>
                                                LSDBが完全に同期し、隣接関係が確立完了
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>4-3. ネットワークタイプ：ポイントツーポイント vs ブロードキャスト</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ネットワークタイプ</th>
                                        <th scope="col">代表例</th>
                                        <th scope="col">DR/BDR選出</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>ポイントツーポイント</strong>
                                        </td>
                                        <td>シリアル回線、ルータ間の直接リンク</td>
                                        <td>不要（2台のみのため）</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>ブロードキャスト</strong>
                                        </td>
                                        <td>Ethernetセグメント（マルチアクセス）</td>
                                        <td>
                                            <strong>必要</strong>（DR/BDRを選出）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>
                                ブロードキャスト型のマルチアクセスネットワーク（例：同一Ethernetセグメントに3台以上のルータ）では、全ルータ同士がフルメッシュで隣接関係を結ぶと非効率（LSA交換の組み合わせ爆発）になるため、代表ルータ（DR）とバックアップ（BDR）を選出し、他のルータはDR/BDRとのみフル隣接関係を結びます。
                            </p>

                            <h3>4-4. DR/BDR選出ロジック</h3>
                            <Diagram
                                id="ospf-dr-bdr-selection"
                                label="DR/BDR選出フロー"
                            />

                            <div className="callout">
                                <strong>💡 Router IDの決定順序（重要）</strong>
                                <ol style={{ marginTop: '10px' }}>
                                    <li>
                                        <code>router-id</code>{' '}
                                        コマンドで明示的に設定された値（最優先）
                                    </li>
                                    <li>
                                        ループバックインターフェースの中で最も高いIPアドレス
                                    </li>
                                    <li>
                                        物理インターフェースの中で最も高いIPアドレス（ループバックが無い場合）
                                    </li>
                                </ol>
                            </div>

                            <h3>4-5. 設定例</h3>
                            <div className="code-block">
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span> <span className="code-cmd">router ospf</span> <span className="code-num">1</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config-router)#</span> <span className="code-kw">router-id</span> <span className="code-net">1.1.1.1</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config-router)#</span> <span className="code-kw">network</span> <span className="code-net">192.168.1.0 0.0.0.255</span> <span className="code-flag">area 0</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config-router)#</span> <span className="code-kw">network</span> <span className="code-net">10.10.20.0 0.0.0.255</span> <span className="code-flag">area 0</span>
                                </div>
                            </div>
                            <p>
                                「シングルエリア」という名前の通り、CCNAで問われるOSPFはすべて
                                <code>area 0</code>
                                （バックボーンエリア）のみで構成されるシンプルな構成です。
                            </p>

                            <h3>4-6. 検証コマンド</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">確認できる内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>show ip ospf neighbor</code>
                                        </td>
                                        <td>
                                            隣接関係のステート（Fullになっているか）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>show ip protocols</code>
                                        </td>
                                        <td>有効なルーティングプロトコルの設定概要</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>show ip ospf interface</code>
                                        </td>
                                        <td>
                                            インターフェースごとのOSPF設定・DR/BDR情報
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Chapter 5 */}
                        <section id="ch5">
                            <h2>第5章｜3.5 ファーストホップ冗長プロトコル（FHRP）</h2>
                            <h3>5-1. なぜFHRPが必要か</h3>
                            <p>
                                一般的なホスト（PC等）は、デフォルトゲートウェイとして
                                <strong>1つのIPアドレス</strong>
                                しか設定できません。もしそのデフォルトゲートウェイ（ルータ）が故障すると、そのセグメントは外部と通信できなくなってしまいます。
                            </p>
                            <p>
                                FHRP（First Hop Redundancy Protocol）は、
                                <strong>
                                    複数の物理ルータで1つの仮想IPアドレス（仮想ゲートウェイ）を共有
                                </strong>
                                することで、1台が故障してももう1台が自動的に処理を引き継ぐ仕組みです。
                            </p>

                            <Diagram id="fhrp-concept" label="FHRPの仕組み" />

                            <h3>5-2. 代表的なFHRPの比較</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">プロトコル</th>
                                        <th scope="col">種別</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>HSRP</strong>（Hot Standby Router Protocol）
                                        </td>
                                        <td>Cisco独自</td>
                                        <td>
                                            ActiveとStandbyの2台構成。最も出題率が高い。
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>VRRP</strong>（Virtual Router Redundancy
                                            Protocol）
                                        </td>
                                        <td>標準規格（IETF）</td>
                                        <td>
                                            MasterとBackup構成。マルチベンダーで利用可能。
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>GLBP</strong>（Gateway Load Balancing
                                            Protocol）
                                        </td>
                                        <td>Cisco独自</td>
                                        <td>
                                            複数ルータで同時にロードバランシング（負荷分散）が可能。
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Summary */}
                        <section id="summary">
                            <h2>まとめ：学習の進め方</h2>
                            <p>
                                CCNAのIP Connectivity分野は、単なる暗記ではなく
                                <strong>「ルータの思考プロセス（ロジック）」</strong>
                                を理解することが鍵です。
                            </p>
                            <ul>
                                <li>
                                    <strong>最長一致 → AD → メトリック</strong>{' '}
                                    の順序を叩き込む
                                </li>
                                <li>
                                    主要プロトコルのAD値（Connected=0, Static=1, OSPF=110,
                                    RIP=120）を即答できるようにする
                                </li>
                                <li>
                                    <code>show ip route</code> や{' '}
                                    <code>show ip ospf neighbor</code>{' '}
                                    の出力結果を正しく読み解く練習をする
                                </li>
                            </ul>
                        </section>

                        {/* References */}
                        <section id="references">
                            <h2>参考ソース（出典）</h2>
                            <ul>
                                <li>
                                    Cisco Official Exam Topics: CCNA 200-301 v1.1 Blueprint
                                </li>
                                <li>
                                    Cisco Press: CCNA 200-301 Official Cert Guide, Volume 1 &
                                    2
                                </li>
                            </ul>
                        </section>
                    </article>
                </main>
            </div>
        </div>
    );
}
