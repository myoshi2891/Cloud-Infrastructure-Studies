import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';

export function CcnaIpServicesGuide() {
    return (
        <div className="ccna-ip-services-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    {/* Header / Hero */}
                    <section className="section" id="overview">
                        <h1>CCNA 200-301（v1.1）IP サービス完全ガイド</h1>
                        <p className="lede">
                            Cisco CCNA（200-301）試験の「4.0 IP
                            Services（試験全体の10%）」を完全攻略するための解説ページです。インサイドソースNAT（静的・動的プール）、NTP、DHCP・DNSの役割、SNMPの機能、Syslogの重大度レベル、QoS
                            PHBのフォワーディング動作、SSH設定、TFTP/FTPの機能まで、試験トピックの全細目（4.1〜4.9）を初学者にも分かりやすい図解と実機設定例付きで徹底解説します。
                        </p>

                        <h2>このガイドの全体像</h2>
                        <p>
                            CCNA試験における「4.0 IP
                            Services」分野は、出題比率こそ10%ですが、
                            <strong>
                                NAT・DHCP・DNS・NTP・SNMP・Syslog・QoS・SSH・TFTP/FTP
                            </strong>
                            という、実務で毎日のように触れる「縁の下の力持ち」的な技術が9項目も詰め込まれた、非常に密度の高い分野です。1つ1つは浅く広く問われる傾向があるため、「名前は知っているが動作原理は説明できない」状態を最も避けるべき分野と言えます。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.overview}
                                ariaLabel="IP Services分野の全体構成図"
                            />
                        </div>

                        <h3>目次</h3>
                        <div className="toc-grid">
                            <a href="#s41">
                                <span className="num">4.1</span>NAT（静的/プール）
                            </a>
                            <a href="#s42">
                                <span className="num">4.2</span>NTP
                            </a>
                            <a href="#s43">
                                <span className="num">4.3</span>DHCP と DNS の役割
                            </a>
                            <a href="#s44">
                                <span className="num">4.4</span>SNMP の機能
                            </a>
                            <a href="#s45">
                                <span className="num">4.5</span>Syslog
                            </a>
                            <a href="#s46">
                                <span className="num">4.6</span>DHCP クライアント/リレー
                            </a>
                            <a href="#s47">
                                <span className="num">4.7</span>QoS PHB
                            </a>
                            <a href="#s48">
                                <span className="num">4.8</span>SSH
                            </a>
                            <a href="#s49">
                                <span className="num">4.9</span>TFTP/FTP
                            </a>
                        </div>
                    </section>

                    {/* 4.1 NAT */}
                    <section className="section" id="s41">
                        <h2>4.1 NAT（静的NATとプールを使った動的NAT）</h2>

                        <h3>なぜNATが必要なのか</h3>
                        <p>
                            IPv4アドレスは32ビットしかなく、世界中の全デバイスに一意なグローバルアドレスを割り当てるには数が足りません。そこでRFC
                            1918で定義された<strong>プライベートIPアドレス</strong>
                            （10.0.0.0/8、172.16.0.0/12、192.168.0.0/16）を社内で自由に使い、インターネットに出る際だけグローバルアドレスに変換する仕組みが
                            <strong>NAT（Network Address Translation）</strong>です。
                        </p>
                        <p>
                            試験の4.1では、この中でも特に
                            <strong>インサイドソースNAT</strong>
                            （内部から外部への通信を対象とするNAT）の2種類、
                            <strong>静的NAT</strong>と<strong>プールを使った動的NAT</strong>
                            が対象です。
                        </p>

                        <h3>静的NAT（Static NAT）</h3>
                        <p>
                            1つの内部プライベートアドレスと1つの外部グローバルアドレスを、
                            <strong>1対1で固定的に</strong>
                            マッピングします。社内のWebサーバーなど、外部から常に同じアドレスでアクセスされたい機器に使います。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.staticNat}
                                ariaLabel="静的NATの動作イメージ"
                            />
                        </div>

                        <div className="code-block">
                            <div className="code-label">
                                <span>設定例（IOS）</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        ip nat inside source static 192.168.1.10 203.0.113.10
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        interface GigabitEthernet0/0
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config-if)#</span>{' '}
                                    <span className="code-command">ip nat inside</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        interface GigabitEthernet0/1
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config-if)#</span>{' '}
                                    <span className="code-command">ip nat outside</span>
                                </div>
                            </pre>
                        </div>

                        <h3>動的NAT（プールを使用）</h3>
                        <p>
                            複数の内部アドレスに対して、
                            <strong>アドレスプール（範囲）</strong>
                            の中から空いているグローバルアドレスをその都度割り当てます。1対1の関係はセッションごとに変わりますが、同時に変換できるのはプール内のアドレス数までです。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.dynamicNat}
                                ariaLabel="動的NATの動作イメージ"
                            />
                        </div>

                        <div className="code-block">
                            <div className="code-label">
                                <span>設定例（IOS）</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        ip nat pool NAT-POOL 203.0.113.20 203.0.113.29 netmask
                                        255.255.255.0
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        access-list 1 permit 192.168.1.0 0.0.0.255
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        ip nat inside source list 1 pool NAT-POOL
                                    </span>
                                </div>
                            </pre>
                        </div>

                        <h3>NAT方式の比較</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">方式</th>
                                        <th scope="col">マッピング関係</th>
                                        <th scope="col">主な用途</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>静的NAT</td>
                                        <td>1対1（固定）</td>
                                        <td>外部公開サーバー（Web/Mailなど）</td>
                                        <td>外部からの通信開始が可能</td>
                                    </tr>
                                    <tr>
                                        <td>動的NAT（プール）</td>
                                        <td>1対1（動的割り当て）</td>
                                        <td>一時的な外部アクセス機器</td>
                                        <td>プール枯渇時は新規通信不可</td>
                                    </tr>
                                    <tr>
                                        <td>PAT（NPTv4/オーバーロード）※参考</td>
                                        <td>多対1（ポート番号使用）</td>
                                        <td>一般的な社内PCのインターネット接続</td>
                                        <td>1つのグローバルIPで多数のPCが同時接続可能</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                コマンドの <code>ip nat inside source static [内部] [外部]</code>{' '}
                                のパラメータ順序（内部が先、外部が後）と、各インターフェースへの{' '}
                                <code>ip nat inside</code> / <code>ip nat outside</code>{' '}
                                の指定漏れがないかを問う問題が頻出です。
                            </p>
                        </div>
                    </section>

                    {/* 4.2 NTP */}
                    <section className="section" id="s42">
                        <h2>4.2 NTP（ネットワーク時間プロトコル）</h2>
                        <p>
                            Syslogのタイムスタンプ、証明書の有効期限検証、ログの相関分析など、ネットワーク運用のあらゆる場面で
                            <strong>機器間の時刻が揃っている</strong>ことが前提になります。NTP（Network
                            Time Protocol）はUDP/123を使い、階層構造で正確な時刻を配布します。
                        </p>

                        <h3>Stratum（階層）の考え方</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.ntpStratum}
                                ariaLabel="NTP Stratum階層構造"
                            />
                        </div>

                        <p>
                            数字が小さいほど「より正確な時刻源に近い」ことを意味します。CCNAでは、ルーターが
                            <strong>NTPクライアントにもNTPサーバーにもなれる</strong>
                            という点、つまり上位サーバーから時刻を受け取りつつ、下位の機器へ配布できる点を理解しておく必要があります。
                        </p>

                        <div className="code-block">
                            <div className="code-label">
                                <span>設定例</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! クライアントモード：上位のNTPサーバーと時刻同期する
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">ntp server 192.168.1.1</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-comment">
                                        !
                                        サーバーモード：自分の時刻を配布する（他機器がこのルーターを参照可能にする）
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">ntp master 3</span>
                                </div>
                            </pre>
                        </div>

                        <div className="code-block">
                            <div className="code-label">
                                <span>検証コマンド</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-prompt">Router#</span>{' '}
                                    <span className="code-command">show ntp status</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router#</span>{' '}
                                    <span className="code-command">show ntp associations</span>
                                </div>
                            </pre>
                        </div>

                        <p>
                            <code>show ntp status</code> の <code>Clock is synchronized</code>{' '}
                            という表示で同期状態を確認し、<code>show ntp associations</code>{' '}
                            で参照先サーバーとの関係（<code>*</code>{' '}
                            が付くものが実際に同期中の相手）を確認します。
                        </p>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                NTPは<strong>UDP/123</strong>
                                を使用すること、Stratum値が小さいほど信頼度が高いこと、
                                <code>ntp server</code>（クライアント動作）と
                                <code>ntp master</code>
                                （サーバー動作）の設定コマンドの違いを押さえましょう。
                            </p>
                        </div>
                    </section>

                    {/* 4.3 DHCP / DNS */}
                    <section className="section" id="s43">
                        <h2>4.3 DHCP と DNS の役割</h2>

                        <h3>DHCPの役割：IPアドレスの自動割り当て</h3>
                        <p>
                            DHCP（Dynamic Host Configuration
                            Protocol）は、クライアント端末にIPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバーアドレスなどを自動配布するプロトコルです。処理の流れは
                            <strong>DORA</strong>という頭文字で覚えられます。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.dhcpDora}
                                ariaLabel="DHCP DORAプロトコルシーケンス"
                            />
                        </div>

                        <ul>
                            <li>
                                <strong>① Discover</strong>
                                ：クライアントがまだIPを持たないため、ブロードキャストでDHCPサーバーを探す
                            </li>
                            <li>
                                <strong>② Offer</strong>：サーバーが候補アドレスを提案
                            </li>
                            <li>
                                <strong>③ Request</strong>
                                ：クライアントが（他のサーバーにも聞こえるよう）ブロードキャストで正式に要求
                            </li>
                            <li>
                                <strong>④ Ack</strong>：サーバーが割り当てを確定し、リース情報を通知
                            </li>
                        </ul>

                        <h3>DNSの役割：名前解決</h3>
                        <p>
                            DNS（Domain Name System）は、人間が読める
                            <strong>ドメイン名</strong>（例：<code>www.example.com</code>
                            ）を、機器が通信に使う<strong>IPアドレス</strong>
                            に変換する分散データベースシステムです。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.dnsFlow}
                                ariaLabel="DNS名前解決のシーケンス"
                            />
                        </div>

                        <h3>主なDNSレコードタイプ</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">レコード</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A</td>
                                        <td>ホスト名 → IPv4アドレス</td>
                                    </tr>
                                    <tr>
                                        <td>AAAA</td>
                                        <td>ホスト名 → IPv6アドレス</td>
                                    </tr>
                                    <tr>
                                        <td>CNAME</td>
                                        <td>ホスト名の別名（エイリアス）</td>
                                    </tr>
                                    <tr>
                                        <td>PTR</td>
                                        <td>IPアドレス → ホスト名（逆引き）</td>
                                    </tr>
                                    <tr>
                                        <td>MX</td>
                                        <td>メールサーバーの指定</td>
                                    </tr>
                                    <tr>
                                        <td>NS</td>
                                        <td>ゾーンの権威DNSサーバーの指定</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                DHCPの <strong>Discover / Request はブロードキャスト</strong>、
                                <strong>Offer / Ack はユニキャスト（実装によりブロードキャスト）</strong>{' '}
                                であること、DNSレコード（A、AAAA、CNAME、PTRなど）の各役割を問う選択問題に対応できるようにしましょう。
                            </p>
                        </div>
                    </section>

                    {/* 4.4 SNMP */}
                    <section className="section" id="s44">
                        <h2>4.4 SNMP（簡易ネットワーク管理プロトコル）</h2>

                        <h3>SNMPの概要とアーキテクチャ</h3>
                        <p>
                            SNMP（Simple Network Management
                            Protocol）は、ネットワーク機器（ルーター、スイッチ、サーバーなど）の状態（CPU使用率、インターフェースのUp/Down、トラフィック量など）を遠隔から監視・制御するための標準プロトコルです。
                        </p>

                        <h3>3つの重要構成要素</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">構成要素</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>NMS（SNMPマネージャー）</td>
                                        <td>
                                            管理用のサーバー・ソフトウェア。エージェントへ情報を要求・受信する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SNMPエージェント</td>
                                        <td>
                                            ネットワーク機器上で動作するプログラム。自機器の情報を収集・提供する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>MIB（Management Information Base）</td>
                                        <td>
                                            機器情報が木構造（ツリー構造）で整理されたデータベース
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>OID（Object Identifier）</td>
                                        <td>
                                            MIB内の各データ項目を一意に指す番号（例：
                                            <code>1.3.6.1.2.1.1.1</code>）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>通信の流れ（GET / SET / TRAP）</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.snmpFlow}
                                ariaLabel="SNMP通信モデル（GET/SET/TRAP）"
                            />
                        </div>

                        <ul>
                            <li>
                                <strong>GET/GET-NEXT</strong>
                                ：マネージャーがエージェントに値を「聞きに行く」（ポーリング）
                            </li>
                            <li>
                                <strong>SET</strong>
                                ：マネージャーがエージェントの設定値を変更する
                            </li>
                            <li>
                                <strong>TRAP</strong>：エージェント側から<strong>自発的に</strong>
                                （ポーリングを待たず）異常をマネージャーへ通知する
                            </li>
                        </ul>

                        <h3>SNMPバージョンの比較</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">バージョン</th>
                                        <th scope="col">認証</th>
                                        <th scope="col">暗号化</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SNMPv1</td>
                                        <td>コミュニティ文字列（平文）</td>
                                        <td>なし</td>
                                        <td>最も古く、セキュリティが弱い</td>
                                    </tr>
                                    <tr>
                                        <td>SNMPv2c</td>
                                        <td>コミュニティ文字列（平文）</td>
                                        <td>なし</td>
                                        <td>
                                            v1より効率化（GETBULKなど）、セキュリティはv1同様
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SNMPv3</td>
                                        <td>ユーザーベース認証</td>
                                        <td>あり（暗号化可能）</td>
                                        <td>
                                            認証・暗号化・完全性を提供する現行推奨バージョン
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                4.4は「SNMPの機能を説明する（Explain the
                                function）」ため、GET/SET/TRAPの違いと、SNMPv3で初めて暗号化・認証が導入された点を押さえておくと得点しやすいです。
                            </p>
                        </div>
                    </section>

                    {/* 4.5 Syslog */}
                    <section className="section" id="s45">
                        <h2>4.5 Syslog（ファシリティと重大度レベル）</h2>
                        <p>
                            Syslogは、ネットワーク機器で発生したイベント（インターフェースダウン、設定変更、エラーなど）を記録・転送するための業界標準の仕組みです。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.syslogFlow}
                                ariaLabel="Syslogのログ集中管理イメージ"
                            />
                        </div>

                        <p>
                            複数の機器から送られたログを1か所に集約することで、障害発生時の原因調査（時系列相関分析）が格段にやりやすくなります。
                        </p>

                        <h3>重大度レベル（Severity Level）0〜7</h3>
                        <p>
                            数字が<strong>小さいほど深刻</strong>
                            です。試験で頻出のため、必ず暗記しておきましょう。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">レベル</th>
                                        <th scope="col">名称（英語）</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>Emergency</td>
                                        <td>システム使用不能</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Alert</td>
                                        <td>直ちに対応が必要</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Critical</td>
                                        <td>致命的な状態</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Error</td>
                                        <td>エラー条件</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Warning</td>
                                        <td>警告条件</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Notice</td>
                                        <td>正常だが重要な状態（例：link UP/DOWN）</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Informational</td>
                                        <td>情報メッセージ</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Debugging</td>
                                        <td>デバッグメッセージ（最もしつこく詳細）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>記憶用の語呂合わせ例</h3>
                        <p>
                            「<strong>E</strong>very <strong>A</strong>gent <strong>C</strong>an{' '}
                            <strong>E</strong>asily <strong>W</strong>ork <strong>N</strong>ow{' '}
                            <strong>I</strong>n <strong>D</strong>arkness」（0〜7の頭文字
                            E-A-C-E-W-N-I-D）といった英語の語呂合わせがよく使われます。
                        </p>

                        <div className="code-block">
                            <div className="code-label">
                                <span>設定例（IOS）</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! SyslogサーバーのIPアドレスを指定
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        logging host 192.168.1.100
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! 転送するログのレベルを指定（レベル4 Warning以上を送る）
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">logging trap warning</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! ログにミリ秒単位の時刻を付与
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        service timestamps log datetime msec
                                    </span>
                                </div>
                            </pre>
                        </div>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                0〜7のレベル番号と名称（0=Emergency 〜
                                7=Debugging）の完全対応、デフォルトでConsole出力されるログレベル、および{' '}
                                <code>logging trap</code>{' '}
                                コマンドで送るレベルを制限できる点がよく問われます。
                            </p>
                        </div>
                    </section>

                    {/* 4.6 DHCP relay */}
                    <section className="section" id="s46">
                        <h2>4.6 DHCP クライアントとリレーの動作</h2>

                        <h3>DHCPクライアント機能</h3>
                        <p>
                            ルーター自身のインターフェース（例：プロバイダからIPを動的取得するWANポート）をDHCPクライアントとして動作させる設定です。
                        </p>

                        <div className="code-block">
                            <div className="code-label"><span>設定例</span></div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        interface GigabitEthernet0/1
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config-if)#</span>{' '}
                                    <span className="code-command">ip address dhcp</span>
                                </div>
                            </pre>
                        </div>

                        <h3>DHCPリレーが必要な理由</h3>
                        <p>
                            DHCPのDiscoverメッセージは<strong>ブロードキャスト</strong>
                            です。ブロードキャストは通常ルーターを越えて転送されないため、DHCPサーバーがクライアントと
                            <strong>別のサブネット</strong>
                            に存在する場合、そのままでは通信が成立しません。この問題を解決するのが
                            <strong>DHCPリレーエージェント</strong>です。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.dhcpRelay}
                                ariaLabel="DHCPリレーエージェントの動作フロー"
                            />
                        </div>

                        <h3>設定例</h3>
                        <p>
                            クライアント側のサブネットに接続されたルーターのインターフェースに設定します。
                        </p>

                        <div className="code-block">
                            <div className="code-label"><span>設定例</span></div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">
                                        interface GigabitEthernet0/0
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config-if)#</span>{' '}
                                    <span className="code-command">
                                        ip helper-address 192.168.99.10
                                    </span>
                                </div>
                            </pre>
                        </div>

                        <p>
                            この設定により、ルーターはそのインターフェースで受信したDHCPブロードキャストを、指定したDHCPサーバー宛のユニキャストパケットに変換して転送する「リレーエージェント」として動作します。
                        </p>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                <code>ip helper-address</code> は
                                <strong>クライアント側のサブネットに面したインターフェース</strong>
                                に設定する点、アンドこのコマンドはDHCP以外にも複数のUDPブロードキャストサービス（TFTP、DNSなど）を中継できる点を押さえておきましょう。
                            </p>
                        </div>
                    </section>

                    {/* 4.7 QoS */}
                    <section className="section" id="s47">
                        <h2>4.7 QoS のフォワーディング動作（PHB）</h2>

                        <h3>PHB（Per-Hop Behavior）とは</h3>
                        <p>
                            QoS（Quality of
                            Service）は、限られた帯域の中で音声やビデオなど遅延に敏感なトラフィックを優先させる仕組みです。PHB（Per-Hop
                            Behavior：ホップ単位の転送動作）とは、各ネットワーク機器が
                            <strong>パケットに付与されたマーキング情報だけを見て</strong>
                            、その場でどう扱うかを決める考え方です。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.qosSteps}
                                ariaLabel="QoS処理のステップ（分類・マーキング・キューイング等）"
                            />
                        </div>

                        <h3>各ステップの意味</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステップ</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>① 分類（Classification）</td>
                                        <td>
                                            トラフィックを種類ごとに識別する（例：音声、動画、通常データ）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>② マーキング（Marking）</td>
                                        <td>
                                            分類結果をパケットのヘッダーに書き込む（CoS、ToS、DSCPなど）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>③ キューイング（Queuing）</td>
                                        <td>
                                            優先度に応じた複数のキュー（待ち行列）に割り分ける
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>④ 輻輳管理（Congestion Management）</td>
                                        <td>
                                            どのキューから優先的にパケットを送り出すかを制御する（例：PQ,
                                            CBWFQ, LLQ）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>⑤ ポリシング（Policing）</td>
                                        <td>
                                            規定の帯域を超えたトラフィックを<strong>破棄（Drop）</strong>
                                            する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>⑥ シェーピング（Shaping）</td>
                                        <td>
                                            規定の帯域を超えたトラフィックをバッファに溜めて
                                            <strong>平滑化（遅延）</strong>させて送る
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>主なPHB分類（DiffServモデル）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">PHBクラス</th>
                                        <th scope="col">DSCP値</th>
                                        <th scope="col">特徴・用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>EF（Expedited Forwarding）</td>
                                        <td>46（101110）</td>
                                        <td>
                                            最優先処理。低遅延・低ジッター・低損失が保証される（例：VoIP音声データ）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AF（Assured Forwarding）</td>
                                        <td>AF11〜AF43</td>
                                        <td>
                                            帯域保証クラス。4つの優先クラス×3段階の破棄優先度で表現される（例：ビデオ会議、重要ビジネス通信）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DF / CS0（Default / Class Selector 0）</td>
                                        <td>0（000000）</td>
                                        <td>
                                            ベストエフォート。特別な優先処理を行わない通常のIP通信（例：Web閲覧、メール）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                <strong>VoIP音声パケット＝EF（DSCP 46）</strong>
                                であること、<strong>ポリシング＝超えた分を破棄</strong>、
                                <strong>シェーピング＝超えた分を遅延・平滑化</strong>{' '}
                                という対比、およびCoS（L2 / 3ビット）とDSCP（L3 /
                                6ビット）の違いを押さえておくことが重要です。
                            </p>
                        </div>
                    </section>

                    {/* 4.8 SSH */}
                    <section className="section" id="s48">
                        <h2>4.8 SSH によるリモートアクセスの設定と検証</h2>

                        <h3>TelnetとSSHの違い</h3>
                        <p>
                            ネットワーク機器のコマンドライン操作を行う際、従来のTelnet（TCP/23）はユーザー名やパスワードを含む全てのデータを
                            <strong>平文（暗号化なし）</strong>
                            で送信するため盗聴に脆弱です。これに対し、SSH（Secure
                            Shell、TCP/22）は通信内容を<strong>暗号化</strong>
                            するため、現在の実務およびCCNA試験ではSSHの利用が前提とされています。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.sshComparison}
                                ariaLabel="TelnetとSSHの比較（平文 vs 暗号化）"
                            />
                        </div>

                        <h3>SSH設定の手順</h3>
                        <div className="code-block">
                            <div className="code-label">
                                <span>設定例（IOS）</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! ① ホスト名とドメイン名を設定（RSA鍵生成の前提条件）
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router(config)#</span>{' '}
                                    <span className="code-command">hostname R1</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span>{' '}
                                    <span className="code-command">
                                        ip domain-name example.local
                                    </span>
                                </div>
                                <div className="code-line" />
                                <div className="code-line">
                                    <span className="code-comment">! ② RSA鍵ペアを生成</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span>{' '}
                                    <span className="code-command">crypto key generate rsa</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! （鍵長を聞かれたら 2048 などを入力）
                                    </span>
                                </div>
                                <div className="code-line" />
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! ③ ローカル認証用のユーザーを作成
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span>{' '}
                                    <span className="code-command">
                                        username admin privilege 15 secret StrongPass123
                                    </span>
                                </div>
                                <div className="code-line" />
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! ④ VTYラインでSSHのみを許可し、ローカル認証を使う
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config)#</span>{' '}
                                    <span className="code-command">line vty 0 15</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config-line)#</span>{' '}
                                    <span className="code-command">transport input ssh</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1(config-line)#</span>{' '}
                                    <span className="code-command">login local</span>
                                </div>
                            </pre>
                        </div>

                        <h3>検証コマンド</h3>
                        <div className="code-block">
                            <div className="code-label">
                                <span>検証コマンド</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-prompt">R1#</span>{' '}
                                    <span className="code-command">show ip ssh</span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">R1#</span>{' '}
                                    <span className="code-command">show ssh</span>
                                </div>
                            </pre>
                        </div>

                        <p>
                            <code>show ip ssh</code>{' '}
                            でSSHのバージョン（SSHv1/v2）や有効状態を、<code>show ssh</code>{' '}
                            で現在接続中のSSHセッション一覧を確認できます。
                        </p>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                SSH設定には「ホスト名＋ドメイン名の設定」「RSA鍵の生成」「ローカルユーザーの作成」「VTYラインでの{' '}
                                <code>transport input ssh</code> 設定」という
                                <strong>4ステップの順序</strong>
                                が問われやすいポイントです。鍵生成前にホスト名・ドメイン名の設定が必須である点を忘れずに。
                            </p>
                        </div>
                    </section>

                    {/* 4.9 TFTP FTP */}
                    <section className="section" id="s49">
                        <h2>4.9 TFTP/FTP の機能</h2>
                        <p>
                            ルーターやスイッチのIOSイメージ・設定ファイルのバックアップ／復元では、汎用的なファイル転送プロトコルであるTFTPやFTPがよく使われます。
                        </p>

                        <h3>TFTPとFTPの比較</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">TFTP</th>
                                        <th scope="col">FTP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>使用トランスポート</td>
                                        <td>UDP/69</td>
                                        <td>TCP/20（データ）・21（制御）</td>
                                    </tr>
                                    <tr>
                                        <td>認証</td>
                                        <td>なし（認証機能を持たない）</td>
                                        <td>あり（ユーザー名・パスワード）</td>
                                    </tr>
                                    <tr>
                                        <td>信頼性</td>
                                        <td>低い（コネクションレス、エラー訂正が簡易）</td>
                                        <td>高い（コネクション指向）</td>
                                    </tr>
                                    <tr>
                                        <td>主な用途</td>
                                        <td>IOSイメージ・設定ファイルの簡易バックアップ/復元</td>
                                        <td>より高機能なファイル転送、認証が必要な用途</td>
                                    </tr>
                                    <tr>
                                        <td>特徴</td>
                                        <td>シンプルで軽量、社内の信頼できるネットワークで利用</td>
                                        <td>ディレクトリ操作やアクセス制御が可能</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>典型的な利用シーン</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.tftpFtp}
                                ariaLabel="TFTP/FTPを用いた設定バックアップ・復元イメージ"
                            />
                        </div>

                        <h3>設定例（IOSでの実行コマンド）</h3>
                        <div className="code-block">
                            <div className="code-label">
                                <span>設定例</span>
                            </div>
                            <pre>
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! 現在の設定をTFTPサーバーにバックアップ
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router#</span>{' '}
                                    <span className="code-command">
                                        copy running-config tftp
                                    </span>
                                </div>
                                <div className="code-line">
                                    Address or name of remote host []? 192.168.1.50
                                </div>
                                <div className="code-line">
                                    Destination filename [running-config]?
                                </div>
                                <br />
                                <div className="code-line">
                                    <span className="code-comment">
                                        ! TFTPサーバーからIOSイメージをルーターのflashへ復元
                                    </span>
                                </div>
                                <div className="code-line">
                                    <span className="code-prompt">Router#</span>{' '}
                                    <span className="code-command">copy tftp flash</span>
                                </div>
                            </pre>
                        </div>

                        <div className="callout">
                            <div className="callout-title">試験のポイント</div>
                            <p style={{ marginBottom: 0 }}>
                                4.9は「機能と役割を説明できるか（Describe the capabilities and
                                functions）」が問われる項目です。TFTPは
                                <strong>認証なし・UDP</strong>、FTPは
                                <strong>認証あり・TCP</strong>
                                という対比、アンドIOSイメージや設定ファイルのバックアップ／復元という代表的な用途を押さえておきましょう。
                            </p>
                        </div>
                    </section>

                    {/* Summary */}
                    <section className="section" id="summary">
                        <h2>学習のポイントまとめ</h2>
                        <p>
                            IP
                            Servicesは9つの項目がありますが、それぞれの「土台となる問い」に立ち返ると整理しやすくなります。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">技術目細</th>
                                        <th scope="col">一言でまとめると？</th>
                                        <th scope="col">絶対覚える暗記キーワード</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>4.1 NAT</td>
                                        <td>プライベート⇔グローバル変換</td>
                                        <td>静的（1:1固定）/ 動的（プール）/ PAT（ポート番号）</td>
                                    </tr>
                                    <tr>
                                        <td>4.2 NTP</td>
                                        <td>時刻の正確な同期</td>
                                        <td>UDP/123、Stratum（小さいほど高精度）、ntp master/server</td>
                                    </tr>
                                    <tr>
                                        <td>4.3 DHCP/DNS</td>
                                        <td>IP自動配分 ＆ 名前解決</td>
                                        <td>DHCP DORA（Discover=BC）、DNS A/AAAA/CNAME/PTR/MX/NS</td>
                                    </tr>
                                    <tr>
                                        <td>4.4 SNMP</td>
                                        <td>機器の状態監視・制御</td>
                                        <td>NMS/Agent/MIB/OID、GET/SET/TRAP、v3で暗号化・認証</td>
                                    </tr>
                                    <tr>
                                        <td>4.5 Syslog</td>
                                        <td>集中ログ記録</td>
                                        <td>UDP/514、レベル0（Emergency）〜7（Debugging）</td>
                                    </tr>
                                    <tr>
                                        <td>4.6 DHCPリレー</td>
                                        <td>サブネット越えのDHCP中継</td>
                                        <td>ip helper-address（クライアント側IFに設定、BC→UC変換）</td>
                                    </tr>
                                    <tr>
                                        <td>4.7 QoS PHB</td>
                                        <td>トラフィックの優先度制御</td>
                                        <td>VoIP=EF（DSCP 46）、ポリシング（破棄）vs シェーピング（遅延）</td>
                                    </tr>
                                    <tr>
                                        <td>4.8 SSH</td>
                                        <td>暗号化されたリモート管理</td>
                                        <td>ホスト名→ドメイン名→鍵生成→VTY設定の順</td>
                                    </tr>
                                    <tr>
                                        <td>4.9 TFTP/FTP</td>
                                        <td>ファイル転送・バックアップ</td>
                                        <td>TFTP=UDP/認証なし、FTP=TCP/認証あり</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            学習の進め方としては、まず各項目の「①なぜ必要か」「②どう動くか（図で流れを追う）」「③試験で問われやすい対比表」の3ステップで理解し、その後で実機またはPacket
                            Tracer/CMLなどのシミュレータ上で実際にコマンドを打って検証コマンド（<code>show</code>コマンド）の出力まで確認すると定着しやすくなります。
                        </p>
                    </section>

                    {/* Sources / References */}
                    <footer className="sources" id="sources">
                        <h2 style={{ marginTop: 0 }}>出典・参考資料</h2>
                        <p>
                            本ガイドの出題範囲・出題比率・各細目（4.1〜4.9）の記述は、以下のシスコ公式情報を根拠としています。
                        </p>
                        <ul>
                            <li>
                                CCNA認定 公式ページ（日本語）：
                                <a
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html
                                </a>
                            </li>
                            <li>
                                CCNA 200-301 試験トピック v1.1（公式PDF、英語）：
                                <a
                                    href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf
                                </a>
                            </li>
                            <li>
                                CCNA 200-301 試験公式ページ：
                                <a
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html
                                </a>
                            </li>
                            <li>
                                Cisco Learning
                                Network（試験トピック確認用コミュニティサイト）：
                                <a
                                    href="https://learningnetwork.cisco.com/s/ccna-exam-topics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningnetwork.cisco.com/s/ccna-exam-topics
                                </a>
                            </li>
                        </ul>
                        <p>
                            出題範囲は予告なく更新される場合があります。学習開始前に必ず上記の公式ページ・PDFで最新の試験トピックをご確認ください。
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}
