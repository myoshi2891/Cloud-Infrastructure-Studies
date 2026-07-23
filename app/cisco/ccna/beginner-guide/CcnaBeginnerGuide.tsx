import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

const DIAGRAM_DISPLAY: Record<string, { frameWidth: number }> = {
    m1: { frameWidth: 1100 },
    m2: { frameWidth: 760 },
    m3: { frameWidth: 760 },
    m4: { frameWidth: 760 },
    m5: { frameWidth: 1240 },
};

/**
 * 指定されたIDに対応する Mermaid ダイアグラムを描画するコンポーネント。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.id - ダイアグラムの識別ID
 * @param props.label - アクセシビリティ用のダイアグラム説明ラベル
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    const display = DIAGRAM_DISPLAY[id] ?? { frameWidth: 760 };
    return (
        <div
            className="diagram-wrap"
            data-diagram-id={id}
            style={{ maxWidth: `${display.frameWidth}px` }}
        >
            <div className="mermaid-container">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
        </div>
    );
}

/**
 * CCNA初心者ガイドのメインコンポーネント。
 * 全12セクションの学習コンテンツとサイドバーナビゲーションをレンダリングします。
 */
export function CcnaBeginnerGuide() {
    return (
        <div className="ccna-beginner-page">
            <div className="layout">
                <NavBar />

                <main>
                    <div className="hero">
                        <span className="hero-eyebrow">Beginner-Friendly Certification Guide</span>
                        <h1>
                            Cisco CCNA試験 完全ガイド
                            <br />― 初学者のためのステップバイステップ解説
                        </h1>
                        <p className="hero-lead">
                            本ガイドは、シスコ公式サイトの情報（2026年7月時点）をもとに、ネットワーク資格試験「CCNA」について、前提知識ゼロの方でも理解できるように整理したものです。各セクションの末尾に根拠となる出典URLを明記しています。
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section id="sec1">
                        <h2>
                            <span className="num">1.</span> CCNAとは何か
                        </h2>
                        <p>
                            <strong>CCNA（Cisco Certified Network Associate）</strong>
                            は、ネットワーク機器最大手のシスコシステムズ（Cisco Systems）が提供する、ネットワーク技術者向けの認定資格です。
                        </p>
                        <p>
                            シスコ公式サイトでは、CCNA認定について次のように説明されています。CCNA試験は、ネットワークの基礎・IPサービス・セキュリティの基礎・自動化とプログラマビリティを対象としており、今日の高度なネットワークを最適化・管理するために必要なスキルを保持していることを証明するものだとされています。
                        </p>
                        <p>
                            一言でいえば、<strong>「ネットワークエンジニアとして最低限必要な基礎知識と実務スキルを持っている」ことを客観的に証明するための世界共通資格</strong>です。
                        </p>

                        <Diagram id="m1" label="CCNA資格取得によるキャリアロードマップ図解" />

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCNA - Training & Certifications（Cisco公式）
                            </a>
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section id="sec2">
                        <h2>
                            <span className="num">2.</span> CCNA認定の全体像
                        </h2>
                        <p>
                            CCNAは「資格試験」そのものと「その資格が証明する立ち位置」の2つの側面があります。まずは全体像を表で整理します。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>認定レベル</td>
                                        <td>アソシエイト（Cisco認定の中でもエントリーに近い階層）</td>
                                    </tr>
                                    <tr>
                                        <td>対応可能な職種</td>
                                        <td>
                                            エントリーレベルのネットワークエンジニア／ヘルプデスク技術者／ネットワーク管理者／ネットワークサポート技術者
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>前提条件</td>
                                        <td>
                                            正式な前提条件は<strong>なし</strong>
                                            （ただし、シスコソリューションの導入・管理経験が1年以上あることが推奨）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>認定の有効期間</td>
                                        <td>3年間</td>
                                    </tr>
                                    <tr>
                                        <td>再認定の方法</td>
                                        <td>
                                            ①認定試験に再度合格する、または ②生涯学習（Continuing Education）クレジットを30ポイント取得する、のいずれか
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCNA - Training & Certifications（Cisco公式）
                            </a>
                        </p>

                        <h3>Ciscoの認定資格全体におけるCCNAの位置づけ</h3>
                        <p>
                            シスコの認定資格は、難易度別に複数の階層に分かれています。CCNAは「アソシエイト」レベルに位置し、その上に「プロフェッショナル（CCNP）」「エキスパート（CCIE）」「アーキテクト（CCAr）」が続く構造です。
                        </p>

                        <Diagram id="m2" label="Cisco認定資格の階層構造図解" />

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                アソシエイト認定（Cisco公式）
                            </a>
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section id="sec3">
                        <h2>
                            <span className="num">3.</span> 200-301 CCNA試験の基本情報
                        </h2>
                        <p>
                            CCNA認定を取得するために受験する試験が、<strong>「200-301 CCNA」</strong>
                            という名称の試験です（試験番号がそのまま試験名になっています）。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>試験番号</td>
                                        <td>200-301</td>
                                    </tr>
                                    <tr>
                                        <td>試験時間</td>
                                        <td>120分</td>
                                    </tr>
                                    <tr>
                                        <td>試験言語</td>
                                        <td>日本語、英語</td>
                                    </tr>
                                    <tr>
                                        <td>出題数の目安</td>
                                        <td>
                                            公式には正確な問題数は公表されていません（受験者の報告では、おおむね90〜120問程度とされることが多いです）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>受験料</td>
                                        <td>
                                            300 USD（為替レートにより日本円換算額は変動。2026年時点でおおよそ4万円台半ば〜後半が目安）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>受験方法</td>
                                        <td>
                                            Pearson VUEを通じて、①テストセンターでの会場受験、または②自宅などからのオンライン監督試験（OnVUE）を選択可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>合格基準点</td>
                                        <td>
                                            公式には非公開（スコアレポートは1000点満点のスケールで表示されますが、具体的な合格ラインの数値はシスコから公表されていません）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>推奨トレーニング</td>
                                        <td>Implementing and Administering Cisco Solutions（CCNA）コース</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout warn">
                            <strong>⚠ 受験料についての注意</strong>
                            <br />
                            受験料は米ドル建てのため、申込時の為替レートによって日本円換算額は変動します。正確な金額は、予約時にPearson VUEの公式サイトで必ず確認してください。
                        </div>

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cisco Certified Network Associate (200-301 CCNA)（Cisco公式）
                            </a>
                            ／
                            <a href="https://www.pearsonvue.co.jp/cisco" target="_blank" rel="noopener noreferrer">
                                Pearson VUE（試験予約サイト）
                            </a>
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section id="sec4">
                        <h2>
                            <span className="num">4.</span> 試験の出題範囲（6つのドメイン）
                        </h2>
                        <p>
                            200-301 CCNA試験は、大きく<strong>6つの分野（ドメイン）</strong>
                            から出題されます。それぞれの分野には出題比率（重み付け）が公式に定められており、試験対策の優先順位を決めるうえで非常に重要な情報です。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ドメイン名</th>
                                        <th scope="col">出題比率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.0</td>
                                        <td>ネットワークの基礎</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>2.0</td>
                                        <td>ネットワークアクセス</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>3.0</td>
                                        <td>IP接続（IP Connectivity）</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>4.0</td>
                                        <td>IPサービス</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr>
                                        <td>5.0</td>
                                        <td>セキュリティの基礎</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td>6.0</td>
                                        <td>自動化とプログラマビリティ</td>
                                        <td>10%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="m3" label="CCNA 200-301 出題比率パイチャート" />

                        <div className="callout">
                            <strong>ポイント</strong>
                            <br />
                            「3.0 IP接続」が25%と最大の比重を占めており、ルーティングの仕組み（スタティックルート、OSPF等）の理解が合否を大きく左右します。一方で、どのドメインも0にはならないため、<strong>苦手分野を作らずまんべんなく学習することが合格の鍵</strong>になります。
                        </div>

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-301-CCNA.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                200-301 CCNA 試験内容PDF（Cisco公式・v1.1）
                            </a>
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section id="sec5">
                        <h2>
                            <span className="num">5.</span> 各ドメインの詳細な学習内容
                        </h2>
                        <p>
                            ここでは、公式の試験内容PDFに基づき、各ドメインで具体的にどのようなトピックが問われるのかを一覧化します。初学者の方は、まず用語だけでも眺めて「知らない言葉に印をつける」ところから始めるとよいでしょう。
                        </p>

                        <h3>5.1 ネットワークの基礎（20%）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">主要トピック</th>
                                        <th scope="col">具体的な内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ネットワーク機器の役割</td>
                                        <td>
                                            ルータ／レイヤ2・3スイッチ／次世代ファイアウォールとIPS／アクセスポイント／コントローラ／エンドポイント／サーバー／PoE
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ネットワークトポロジ</td>
                                        <td>
                                            2階層・3階層アーキテクチャ、スパインリーフ、WAN、SOHO、オンプレミスとクラウド
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>物理層</td>
                                        <td>
                                            シングル/マルチモードファイバ・銅線の比較、接続方式、ケーブル関連の障害特定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>プロトコル基礎</td>
                                        <td>TCPとUDPの比較</td>
                                    </tr>
                                    <tr>
                                        <td>IPアドレッシング</td>
                                        <td>
                                            IPv4のアドレス割り当て・サブネット化、プライベートIPv4、IPv6のアドレス割り当て・プレフィックス、IPv6アドレスタイプ（ユニキャスト／エニーキャスト／マルチキャスト／修正EUI-64）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>無線の基礎</td>
                                        <td>非オーバーラップWi-Fiチャネル、SSID、RF、暗号化</td>
                                    </tr>
                                    <tr>
                                        <td>仮想化の基礎</td>
                                        <td>サーバー仮想化、コンテナ、VRF</td>
                                    </tr>
                                    <tr>
                                        <td>スイッチング概念</td>
                                        <td>
                                            MACラーニング・エージング、フレームスイッチング／フラッディング、MACアドレステーブル
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.2 ネットワークアクセス（20%）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">主要トピック</th>
                                        <th scope="col">具体的な内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>VLAN</td>
                                        <td>
                                            複数スイッチにまたがるVLAN設定、アクセスポート、デフォルトVLAN、VLAN間接続
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>スイッチ間接続</td>
                                        <td>トランクポート、802.1Q、ネイティブVLAN</td>
                                    </tr>
                                    <tr>
                                        <td>検出プロトコル</td>
                                        <td>Cisco Discovery Protocol、LLDP</td>
                                    </tr>
                                    <tr>
                                        <td>EtherChannel</td>
                                        <td>LACPによるレイヤ2/3のリンク集約</td>
                                    </tr>
                                    <tr>
                                        <td>スパニングツリー</td>
                                        <td>
                                            Rapid PVST+の基本動作、ルートポート／ルートブリッジ、PortFast、ルートガード等
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>無線アーキテクチャ</td>
                                        <td>
                                            シスコワイヤレスアーキテクチャ、APモード、WLANコンポーネント（AP、WLC等）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>管理アクセス</td>
                                        <td>
                                            Telnet、SSH、HTTP/HTTPS、コンソール、TACACS+/RADIUS、クラウド管理
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>無線LAN GUI設定</td>
                                        <td>WLAN作成、セキュリティ設定、QoSプロファイル</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.3 IP接続（25%・最重要ドメイン）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">主要トピック</th>
                                        <th scope="col">具体的な内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ルーティングテーブル</td>
                                        <td>
                                            プロトコルコード、プレフィックス、ネットマスク、ネクストホップ、アドミニストレーティブディスタンス、メトリック
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>転送先決定ロジック</td>
                                        <td>最長プレフィックス一致、AD、ルーティングメトリック</td>
                                    </tr>
                                    <tr>
                                        <td>スタティックルーティング</td>
                                        <td>
                                            IPv4/IPv6のデフォルトルート、ネットワークルート、ホストルート、フローティングスタティック
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>OSPFv2</td>
                                        <td>
                                            単一エリアOSPFv2の設定・確認、ネイバー隣接関係、DR/BDR選択、ルータID
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>冗長化</td>
                                        <td>ファーストホップ冗長プロトコル（FHRP）の目的と概念</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.4 IPサービス（10%）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">主要トピック</th>
                                        <th scope="col">具体的な内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>NAT</td>
                                        <td>スタティック・プールを使った内部ソースNAT</td>
                                    </tr>
                                    <tr>
                                        <td>時刻同期</td>
                                        <td>NTP（クライアント／サーバーモード）</td>
                                    </tr>
                                    <tr>
                                        <td>名前解決とアドレス割当</td>
                                        <td>DHCP、DNSの役割、DHCPクライアント/リレーの設定</td>
                                    </tr>
                                    <tr>
                                        <td>監視</td>
                                        <td>SNMP、syslog（ファシリティ・重大度レベル含む）</td>
                                    </tr>
                                    <tr>
                                        <td>QoS</td>
                                        <td>
                                            分類、マーキング、キューイング、輻輳、ポリシング、シェーピング
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>リモートアクセス</td>
                                        <td>SSHによるリモート管理設定</td>
                                    </tr>
                                    <tr>
                                        <td>ファイル転送</td>
                                        <td>TFTP/FTPの用途と機能</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.5 セキュリティの基礎（15%）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">主要トピック</th>
                                        <th scope="col">具体的な内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>セキュリティ概念</td>
                                        <td>脅威、脆弱性、エクスプロイト、軽減技術の定義</td>
                                    </tr>
                                    <tr>
                                        <td>セキュリティプログラム</td>
                                        <td>ユーザー啓発、トレーニング、物理的アクセス制御</td>
                                    </tr>
                                    <tr>
                                        <td>デバイスアクセス制御</td>
                                        <td>ローカルパスワードによる設定・確認</td>
                                    </tr>
                                    <tr>
                                        <td>パスワードポリシー</td>
                                        <td>多要素認証、証明書、生体認証などの代替手段</td>
                                    </tr>
                                    <tr>
                                        <td>VPN</td>
                                        <td>IPsecリモートアクセス／サイト間VPNの概要</td>
                                    </tr>
                                    <tr>
                                        <td>ACL</td>
                                        <td>アクセス制御リストの設定・確認</td>
                                    </tr>
                                    <tr>
                                        <td>レイヤ2セキュリティ</td>
                                        <td>
                                            DHCPスヌーピング、ダイナミックARPインスペクション、ポートセキュリティ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AAA</td>
                                        <td>認証・許可・アカウンティングの概念比較</td>
                                    </tr>
                                    <tr>
                                        <td>無線セキュリティ</td>
                                        <td>WPA/WPA2/WPA3、GUIでのWPA2 PSK設定</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.6 自動化とプログラマビリティ（10%）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">主要トピック</th>
                                        <th scope="col">具体的な内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>自動化の影響</td>
                                        <td>ネットワーク管理における自動化のインパクト</td>
                                    </tr>
                                    <tr>
                                        <td>SDN</td>
                                        <td>
                                            従来型ネットワークとコントローラベースネットワークの比較、オーバーレイ／アンダーレイ／ファブリック、制御プレーンとデータプレーンの分離、ノースバウンド/サウスバウンドAPI
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AI・ML</td>
                                        <td>ネットワーク運用における生成AI・予測AI・機械学習の役割</td>
                                    </tr>
                                    <tr>
                                        <td>API</td>
                                        <td>
                                            RESTベースAPIの特性（認証タイプ、CRUD、HTTP動詞、データエンコーディング）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>構成管理ツール</td>
                                        <td>Ansible、Terraformなどの機能理解</td>
                                    </tr>
                                    <tr>
                                        <td>データ形式</td>
                                        <td>JSONエンコードされたデータの構造理解</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-301-CCNA.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                200-301 CCNA 試験内容PDF（Cisco公式・v1.1、2024年発行）
                            </a>
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section id="sec6">
                        <h2>
                            <span className="num">6.</span> 出題形式（どんな問題が出るのか）
                        </h2>
                        <p>
                            CCNA試験はCBT（Computer Based Testing）方式で実施され、複数の出題形式が組み合わされます。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">出題形式</th>
                                        <th scope="col">概要</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>単一選択問題</td>
                                        <td>選択肢の中から正解を1つ選ぶ、最も一般的な形式</td>
                                    </tr>
                                    <tr>
                                        <td>複数選択問題</td>
                                        <td>正解が複数ある問題から、該当するものをすべて選ぶ</td>
                                    </tr>
                                    <tr>
                                        <td>ドラッグ&ドロップ問題</td>
                                        <td>用語や設定項目をドラッグして正しい場所に当てはめる</td>
                                    </tr>
                                    <tr>
                                        <td>シミュレーション問題</td>
                                        <td>
                                            仮想的なルータ／スイッチのCLI環境を操作し、実際にコマンドを入力して設定・検証を行う
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            シミュレーション問題は、実機やPacket Tracerなどのシミュレータでの操作経験がないと特に難しく感じやすいポイントです。座学だけでなく、必ずハンズオンでの演習を組み込むことが推奨されます。
                        </p>

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cisco Certified Network Associate (200-301 CCNA)（Cisco公式）
                            </a>
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section id="sec7">
                        <h2>
                            <span className="num">7.</span> 合格までの学習ロードマップ（8ステップ）
                        </h2>
                        <p>
                            シスコ公式サイトでは、CCNA取得までの流れを<strong>8つのステップ</strong>として案内しています。以下のフローチャートは、その公式ステップを図解したものです。
                        </p>

                        <Diagram id="m4" label="CCNA学習ロードマップ8ステップ図解" />

                        <p>各ステップで使えるツール・リソースは以下の通りです。</p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステップ</th>
                                        <th scope="col">主な活用リソース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>①自己評価</td>
                                        <td>公式試験内容一覧、CCNA At-a-glance資料</td>
                                    </tr>
                                    <tr>
                                        <td>②学習・トレーニング</td>
                                        <td>
                                            Eラーニング購入、クラス検索、Ciscoデジタルラーニング、プライベートグループトレーニング
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>③コミュニティ参加</td>
                                        <td>CCNAコミュニティ、ラーニングマップ、トレーニング動画</td>
                                    </tr>
                                    <tr>
                                        <td>④演習</td>
                                        <td>Cisco Learning Labs、Cisco Modeling Labs、Packet Tracer</td>
                                    </tr>
                                    <tr>
                                        <td>⑤評価</td>
                                        <td>試験準備確認ツール（Exam Review Tool）</td>
                                    </tr>
                                    <tr>
                                        <td>⑥試験予約</td>
                                        <td>オンライン試験、会場試験、試験チュートリアル</td>
                                    </tr>
                                    <tr>
                                        <td>⑦認定取得</td>
                                        <td>Certification Tracker、デジタルバッジ</td>
                                    </tr>
                                    <tr>
                                        <td>⑧再認定</td>
                                        <td>再認定ポリシー、生涯学習（Continuing Education）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="source-line">
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCNA - Training & Certifications（Cisco公式・「CCNA取得までのステップ」セクション）
                            </a>
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section id="sec8">
                        <h2>
                            <span className="num">8.</span> 試験当日の流れ
                        </h2>
                        <p>
                            初めて受験する方が不安に感じやすい「当日の流れ」を、時系列で整理します（Pearson VUEでの受験を想定）。
                        </p>

                        <Diagram id="m5" label="試験当日のフローチャート" />

                        <p className="source-line">
                            出典：
                            <a href="https://www.pearsonvue.co.jp/cisco" target="_blank" rel="noopener noreferrer">
                                Pearson VUE（試験予約サイト）
                            </a>
                            ／
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCNA - Training & Certifications（Cisco公式）
                            </a>
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section id="sec9">
                        <h2>
                            <span className="num">9.</span> 【重要・最新情報】2027年のCCNA試験改定（v2.0）
                        </h2>
                        <p>
                            これからCCNA学習を始める方にとって非常に重要な最新動向です。2026年5月20日、シスコはCisco Live 2026（ラスベガス）において、
                            <strong>CCNA 200-301試験の大幅な内容改定（v1.1 → v2.0）</strong>
                            を正式に発表しました。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>発表日</td>
                                        <td>2026年5月20日（Cisco Live 2026にて）</td>
                                    </tr>
                                    <tr>
                                        <td>現行版（v1.1）が受験可能な最終日</td>
                                        <td>2027年2月2日</td>
                                    </tr>
                                    <tr>
                                        <td>新版（v2.0）の開始日</td>
                                        <td>2027年2月3日</td>
                                    </tr>
                                    <tr>
                                        <td>試験番号</td>
                                        <td>変更なし（引き続き「200-301」）</td>
                                    </tr>
                                    <tr>
                                        <td>改定の方向性</td>
                                        <td>
                                            ネットワークインフラ、トラブルシューティング・問題解決、セキュリティファーストの考え方、AIの役割の理解、という4本柱を軸にした大幅なブループリント刷新（設定作成→トラブルシューティング重視への大きなシフト）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>📌 これから学習を始める方へ</strong>
                            <br />
                            2027年2月2日までに合格を目指せるスケジュールであれば、現行のv1.1で学習を進めて問題ありません。取得したCCNAは合格日から3年間有効なので、v1.1の最終日に合格しても2030年まで有効です。一方で、学習開始が2027年後半以降になりそうな場合は、v2.0のブループリントを見据えた学習計画が必要になります。
                        </div>

                        <div className="callout warn">
                            <strong>⚠ 情報の位置づけについて</strong>
                            <br />
                            この改定情報は、標準的な学習データの範囲（2026年1月まで）より後の出来事であるため、複数の情報源を横断して裏付けを取っていますが、最終的な詳細は必ずシスコの公式発表でご確認ください。
                        </div>

                        <p className="source-line">
                            出典：
                            <a
                                href="https://learningnetwork.cisco.com/s/blogs/a0DQO00000616W92AI/steps-to-the-future-the-modern-ccna"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCNA v2.0公式アナウンス（Cisco Learning Network）
                            </a>
                            ／
                            <a
                                href="https://blog.boson.com/big-changes-are-coming-to-the-ccna-exam-in-2027"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Big Changes Are Coming To The CCNA Exam in 2027（Boson Blog）
                            </a>
                            ／
                            <a
                                href="https://cciedump.spoto.net/news/cisco-announces-ccna-v20-and-ai-integrated-ccie-updates-at-cisco-live-2026-las-vegas.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cisco Announces CCNA v2.0（SPOTO）
                            </a>
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section id="sec10">
                        <h2>
                            <span className="num">10.</span> 初学者がつまずきやすいポイントと対策
                        </h2>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">つまずきやすいポイント</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>サブネッティング（IPv4/IPv6のアドレス計算）</td>
                                        <td>
                                            公式・手順を暗記するだけでなく、実際に手を動かして何十問も計算練習を繰り返す
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>OSPFなどルーティングプロトコルの動作理解</td>
                                        <td>
                                            図を描きながら「どのルータが何を送受信しているか」を追う。座学だけで理解しようとしない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>シミュレーション問題（CLI操作）</td>
                                        <td>
                                            Packet Tracerやシスコ公式のラボ環境で、実際にコマンドを打つ練習を積む
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>出題範囲の広さに圧倒される</td>
                                        <td>
                                            6ドメインの出題比率を意識し、配点の大きい「IP接続」「ネットワークの基礎」「ネットワークアクセス」から優先的に学習する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>独学の方向性が定まらない</td>
                                        <td>
                                            Cisco Learning Networkのコミュニティに参加し、他の受験者や合格者の学習法を参考にする
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 11 */}
                    <section id="sec11">
                        <h2>
                            <span className="num">11.</span> よくある質問（FAQ）
                        </h2>

                        <div className="faq-item">
                            <p className="faq-q">Q1. CCNAに受験資格や前提資格は必要ですか？</p>
                            <p className="faq-a">
                                A. 正式な前提条件はなく、誰でも受験できます。ただし、ネットワーク関連の実務経験が1年以上あることが推奨されています。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">Q2. 試験は日本語で受けられますか？</p>
                            <p className="faq-a">
                                A. はい。200-301 CCNA試験は日本語・英語の両方に対応しています。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">Q3. CCNAの有効期限はありますか？</p>
                            <p className="faq-a">
                                A. あります。認定日から3年間有効で、期限切れ前に再受験するか、生涯学習クレジット30ポイントの取得で更新できます。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">
                                Q4. 今から学習を始める場合、v1.1とv2.0のどちらを目指すべきですか？
                            </p>
                            <p className="faq-a">
                                A. 2027年2月2日までに合格できる見込みがあるなら、現行のv1.1で問題ありません。学習開始が遅く、2027年後半以降に受験見込みとなる場合は、v2.0のブループリントを踏まえた学習が必要です。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">Q5. 合格基準点は何点ですか？</p>
                            <p className="faq-a">
                                A. シスコは具体的な合格基準点を公式には公表していません。スコアレポートは1000点満点のスケールで表示されますが、正確な合格ラインは非公開です。
                            </p>
                        </div>
                    </section>

                    {/* Section 12 */}
                    <section id="sec12">
                        <h2>
                            <span className="num">12.</span> 参考情報源（出典一覧）
                        </h2>
                        <p>本ガイドの作成にあたり、以下の情報源を参照しました。</p>

                        <div className="ref-group">
                            <h3>シスコ公式情報</h3>
                            <ul className="ref-list">
                                <li>
                                    CCNA認定 総合ページ：
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html
                                    </a>
                                </li>
                                <li>
                                    200-301 CCNA試験ページ：
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/ccna-200-301.html
                                    </a>
                                </li>
                                <li>
                                    200-301 CCNA試験内容PDF（v1.1）：
                                    <a
                                        href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-301-CCNA.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-301-CCNA.pdf
                                    </a>
                                </li>
                                <li>
                                    アソシエイト認定ページ：
                                    <a
                                        href="https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate.html
                                    </a>
                                </li>
                                <li>
                                    Pearson VUE（試験予約）：
                                    <a href="https://www.pearsonvue.co.jp/cisco" target="_blank" rel="noopener noreferrer">
                                        https://www.pearsonvue.co.jp/cisco
                                    </a>
                                </li>
                                <li>
                                    CCNA v2.0アナウンス（Cisco Learning Network）：
                                    <a
                                        href="https://learningnetwork.cisco.com/s/blogs/a0DQO00000616W92AI/steps-to-the-future-the-modern-ccna"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://learningnetwork.cisco.com/s/blogs/a0DQO00000616W92AI/steps-to-the-future-the-modern-ccna
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h3>補足・裏付け情報源（2027年試験改定関連の非公式まとめ記事）</h3>
                            <ul className="ref-list">
                                <li>
                                    Big Changes Are Coming To The CCNA Exam in 2027（Boson）：
                                    <a
                                        href="https://blog.boson.com/big-changes-are-coming-to-the-ccna-exam-in-2027"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://blog.boson.com/big-changes-are-coming-to-the-ccna-exam-in-2027
                                    </a>
                                </li>
                                <li>
                                    Cisco Announces CCNA v2.0 and AI-Integrated CCIE Updates at Cisco Live 2026（SPOTO）：
                                    <a
                                        href="https://cciedump.spoto.net/news/cisco-announces-ccna-v20-and-ai-integrated-ccie-updates-at-cisco-live-2026-las-vegas.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://cciedump.spoto.net/news/cisco-announces-ccna-v20-and-ai-integrated-ccie-updates-at-cisco-live-2026-las-vegas.html
                                    </a>
                                </li>
                                <li>
                                    New CCNA v2.0 Exam Coming in 2027（AJS Networking）：
                                    <a href="https://www.ajsnetworking.com/new-ccna-v2-2027/" target="_blank" rel="noopener noreferrer">
                                        https://www.ajsnetworking.com/new-ccna-v2-2027/
                                    </a>
                                </li>
                                <li>
                                    CCNA Is Changing in 2027（Training Camp）：
                                    <a
                                        href="https://trainingcamp.com/articles/ccna-is-changing-in-2027-take-the-current-exam-or-wait-for-v2-0/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://trainingcamp.com/articles/ccna-is-changing-in-2027-take-the-current-exam-or-wait-for-v2-0/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h3>受験料の日本円換算・目安（非公式・参考情報）</h3>
                            <ul className="ref-list">
                                <li>
                                    CCNA受験料に関する解説記事：
                                    <a href="https://ton-hare.com/ccna-exam-fee/" target="_blank" rel="noopener noreferrer">
                                        https://ton-hare.com/ccna-exam-fee/
                                    </a>
                                </li>
                                <li>
                                    CCNA受験料・割引に関する解説記事：
                                    <a
                                        href="https://inunuit.com/2025/10/07/【2025年最新】ccnaの受験料はいくら？試験概要とお得な受験料/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://inunuit.com/2025/10/07/【2025年最新】ccnaの受験料はいくら？試験概要とお得な受験料/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="callout warn">
                            <strong>ご注意</strong>
                            <br />
                            非公式の情報源は、公式情報を補完する目的でのみ使用しています。金額や日程などの重要事項は、必ず上記シスコ公式サイトで最新情報をご確認ください。
                        </div>
                    </section>

                    <footer>Cisco CCNA試験 完全ガイド ― 2026年7月時点の公式情報に基づき作成</footer>
                </main>
            </div>
        </div>
    );
}
