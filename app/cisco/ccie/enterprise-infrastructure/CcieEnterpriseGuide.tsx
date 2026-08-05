import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';
import styles from './page.module.css';

const Corners = () => (
    <>
        <span className={`${styles.corner} ${styles.tl}`} />
        <span className={`${styles.corner} ${styles.tr}`} />
        <span className={`${styles.corner} ${styles.bl}`} />
        <span className={`${styles.corner} ${styles.br}`} />
    </>
);

export default function CcieEnterpriseGuide() {
    return (
        <div className={styles.container}>
            <NavBar />

            <main id="main-content">
                <header className={styles.hero}>
                    <p className={styles.eyebrow}>Cisco Certification Blueprint / 解説ガイド</p>
                    <h1 className={styles.title}>
                        CCIE Enterprise Infrastructure<br />認定 完全ガイド
                    </h1>
                    <p className={styles.subtitle}>
                        初学者のためのステップバイステップ解説。出典はCisco公式サイトおよび公式試験ブループリント（試験内容PDF）です。
                    </p>

                    <div className={styles.techFrame}>
                        <Corners />
                        <div className={styles.titleBlockHead}>
                            <span>Document Title Block</span>
                            <span>Info as of 2026-07</span>
                        </div>
                        <div className={styles.metaGrid}>
                            <div className={styles.metaItem}>
                                <div className={styles.label}>資格名称</div>
                                <div className={styles.value}>CCIE Enterprise Infrastructure</div>
                            </div>
                            <div className={styles.metaItem}>
                                <div className={styles.label}>認定レベル</div>
                                <div className={styles.value}>エキスパート（Expert）</div>
                            </div>
                            <div className={styles.metaItem}>
                                <div className={styles.label}>構成試験</div>
                                <div className={styles.value}>ENCOR 350-401 + Lab v1.1</div>
                            </div>
                            <div className={styles.metaItem}>
                                <div className={styles.label}>有効期間</div>
                                <div className={styles.value}>3年間</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* §01 */}
                <section className={styles.block} id="overview">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§01</span>
                        <h2>CCIE Enterprise Infrastructureとは</h2>
                    </div>
                    <p>
                        CCIE（Cisco Certified Internetwork Expert）Enterprise Infrastructureは、Ciscoの認定体系の中で最上位に位置する<strong>エキスパートレベル</strong>の資格の一つです。複雑なエンタープライズネットワークインフラストラクチャの<strong>設計・導入・運用・最適化・自動化</strong>という、ネットワークライフサイクル全体にわたるスキルを証明するものです。
                    </p>
                    <p>Ciscoの認定体系全体における位置づけは次のとおりです。</p>

                    <div className={styles.diagramWrap}>
                        <div className={styles.techFrame}>
                            <Corners />
                            <MermaidDiagram
                                chart={DIAGRAMS.hierarchy}
                                ariaLabel="Cisco認定レベル階層におけるCCIE EIの位置づけ"
                            />
                        </div>
                        <p className={styles.diagramCaption}>
                            FIG.01 — Cisco認定レベル階層におけるCCIE EIの位置づけ
                        </p>
                    </div>

                    <p>
                        CCIEにはEnterprise Infrastructure以外にも、Enterprise Wireless／Data Center／Security／Service Provider／Collaborationなど複数のトラックが存在しますが、本ガイドは<strong>Enterprise Infrastructure（略称：CCIE EI）</strong>に絞って解説します。
                    </p>
                </section>

                {/* §02 */}
                <section className={styles.block} id="roadmap">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§02</span>
                        <h2>認定取得までの全体像（2ステップ構成）</h2>
                    </div>
                    <p>
                        CCIE Enterprise Infrastructure認定を取得するには、以下の<strong>2つの試験に合格する必要があります。</strong>
                    </p>

                    <div className={styles.diagramWrap}>
                        <div className={styles.techFrame}>
                            <Corners />
                            <MermaidDiagram
                                chart={DIAGRAMS.roadmap}
                                ariaLabel="認定取得までの2ステップフロー"
                            />
                        </div>
                        <p className={styles.diagramCaption}>
                            FIG.02 — 認定取得までの2ステップフロー（各ステップとも不合格の場合は再受験することで再挑戦できます）
                        </p>
                    </div>

                    <div className={styles.tableWrap}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ステップ</th>
                                    <th scope="col">試験名</th>
                                    <th scope="col">形式</th>
                                    <th scope="col">位置づけ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={styles.num}>ステップ1</td>
                                    <td>
                                        Implementing and Operating Cisco Enterprise Network Core Technologies（ENCOR 350-401）
                                    </td>
                                    <td>筆記（選択式・ドラッグ&amp;ドロップ等）</td>
                                    <td>
                                        コア技術の知識を問う。合格するとスペシャリスト認定も取得できる
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>ステップ2</td>
                                    <td>CCIE Enterprise Infrastructure Lab Exam</td>
                                    <td>8時間のハンズオン実技試験</td>
                                    <td>
                                        設計〜導入〜運用〜最適化までのライフサイクル全体を実機/仮想環境で検証
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        なお、ENCOR 350-401は<strong>CCNP Enterprise</strong>の必須コア試験と共通です。そのためENCORに合格した時点で、追加のコンセントレーション試験（ENARSI、ENWLSI、ENSDWI など）を1つ受験すればCCNP Enterpriseも取得できます。CCIE EIを目指す場合はこのコンセントレーション試験は必須ではなく、ENCOR合格後に直接ラボ試験へ進むことも可能です。
                    </p>
                </section>

                {/* §03 */}
                <section className={styles.block} id="encor">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§03</span>
                        <h2>ステップ1：クオリファイ試験（ENCOR 350-401）</h2>
                    </div>

                    <h3>3.1 試験の基本情報</h3>
                    <div className={styles.tableWrap}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>試験名</td>
                                    <td>
                                        Implementing Cisco Enterprise Network Core Technologies（350-401 ENCOR）v1.2
                                    </td>
                                </tr>
                                <tr>
                                    <td>試験時間</td>
                                    <td className={styles.num}>120分</td>
                                </tr>
                                <tr>
                                    <td>試験言語</td>
                                    <td>日本語、英語</td>
                                </tr>
                                <tr>
                                    <td>受験会場</td>
                                    <td>
                                        ピアソンVUE（テストセンターまたはオンライン監督形式）
                                    </td>
                                </tr>
                                <tr>
                                    <td>受験料</td>
                                    <td className={styles.num}>400 USD</td>
                                </tr>
                                <tr>
                                    <td>関連資格</td>
                                    <td>
                                        CCNP Enterprise、CCIE Enterprise Infrastructure、CCIE Enterprise Wireless、Cisco Certified Specialist - Enterprise Core
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>3.2 出題ドメインと比率（v1.2ブループリント）</h3>
                    <p>Cisco公式の試験内容PDFに基づく出題比率は以下のとおりです。</p>
                    <div className={styles.tableWrap}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" className={styles.num}>No</th>
                                    <th scope="col">ドメイン</th>
                                    <th scope="col" className={styles.num}>出題比率</th>
                                    <th scope="col">主な内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={styles.num}>1</td>
                                    <td>アーキテクチャ</td>
                                    <td className={styles.pct}>15%</td>
                                    <td>
                                        2階層/3階層設計、ファブリック、クラウド、高可用性（FHRP、SSO）、SD-WAN/SD-Accessの動作原理、QoS設定の理解
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>2</td>
                                    <td>仮想化</td>
                                    <td className={styles.pct}>10%</td>
                                    <td>
                                        ハイパーバイザ（Type1/2）、仮想マシン、仮想スイッチング、VRF、GRE/IPsecトンネリング、LISP、VXLAN
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>3</td>
                                    <td>インフラストラクチャ</td>
                                    <td className={styles.pct}>30%</td>
                                    <td>
                                        L2（802.1qトランク、EtherChannel、STP/RSTP/MST）、L3（EIGRP・OSPF比較、OSPFv2/v3設定、eBGP、PBR）、IPサービス（NTP/PTP、NAT/PAT、HSRP/VRRP、マルチキャスト）
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>4</td>
                                    <td>ネットワークアシュアランス</td>
                                    <td className={styles.pct}>10%</td>
                                    <td>
                                        デバッグ・トレースルート・SNMP・syslogによる診断、Flexible NetFlow、SPAN/RSPAN/ERSPAN、IP SLA、Cisco Catalyst Center、NETCONF/RESTCONF
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>5</td>
                                    <td>セキュリティ</td>
                                    <td className={styles.pct}>20%</td>
                                    <td>
                                        デバイスアクセス制御、AAA、ACL、CoPP、REST APIセキュリティ、脅威防御・エンドポイントセキュリティ・NGFW、TrustSec/MACsec
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>6</td>
                                    <td>自動化と人工知能</td>
                                    <td className={styles.pct}>15%</td>
                                    <td>
                                        Python基礎、JSON、YANGなどのデータモデリング言語、Catalyst Center/SD-WAN Manager API、EEMアプレット、エージェント/エージェントレス型オーケストレーションツールの比較
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.note}>
                        <strong>初学者への補足</strong>：出題比率が最も高いのは「インフラストラクチャ」（30%）と「セキュリティ」（20%）です。学習の優先順位を決める際は、この比率を参考に時間配分を決めると効率的です。「自動化と人工知能」ドメインは近年のブループリント改訂で強化された分野であり、Python・API操作の基礎は避けて通れません。
                    </div>

                    <h3>3.3 推奨される準備方法</h3>
                    <ul>
                        <li>
                            Cisco公式コース「Implementing Cisco Enterprise Network Core Technologies (ENCOR)」の受講
                        </li>
                        <li>
                            公式試験内容PDF（§10 参考ソース参照）を精読し、出題範囲の抜け漏れを確認
                        </li>
                        <li>
                            ルーティング（EIGRP/OSPF/BGP）とQoS、セキュリティ機能は実機または仮想ラボでのハンズオン練習を並行して行う
                        </li>
                    </ul>
                </section>

                {/* §04 */}
                <section className={styles.block} id="lab">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§04</span>
                        <h2>ステップ2：ラボ試験（CCIE Enterprise Infrastructure Lab）</h2>
                    </div>

                    <h3>4.1 試験の基本情報</h3>
                    <div className={styles.tableWrap}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>試験名</td>
                                    <td>CCIE Enterprise Infrastructure Lab Exam v1.1</td>
                                </tr>
                                <tr>
                                    <td>試験時間</td>
                                    <td className={styles.num}>8時間（ハンズオン実技）</td>
                                </tr>
                                <tr>
                                    <td>受験資格</td>
                                    <td>ENCOR 350-401 合格が前提</td>
                                </tr>
                                <tr>
                                    <td>受験料</td>
                                    <td className={styles.num}>
                                        1,600 USD（テストセンター／BYODモバイルラボ）／1,900 USD（Ciscoキット利用のモバイルラボ）
                                    </td>
                                </tr>
                                <tr>
                                    <td>出題形式</td>
                                    <td>クローズドブック（外部資料の持ち込み不可）</td>
                                </tr>
                                <tr>
                                    <td>認定有効期間</td>
                                    <td className={styles.num}>3年間</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>4.2 試験構成（2モジュール制）</h3>
                    <p>現行のラボ試験は、以下の2つのモジュールから構成されています。</p>

                    <div className={styles.diagramWrap}>
                        <div className={styles.techFrame}>
                            <Corners />
                            <MermaidDiagram
                                chart={DIAGRAMS.labModules}
                                ariaLabel="ラボ試験のモジュール構成"
                            />
                        </div>
                        <p className={styles.diagramCaption}>FIG.03 — ラボ試験のモジュール構成</p>
                    </div>

                    <ul>
                        <li>
                            <strong>Designモジュール（3時間）</strong>：要件に基づいてネットワークを設計する能力を問われます。
                        </li>
                        <li>
                            <strong>Deploy, Operate, Optimize（DOO）モジュール（5時間）</strong>：実際に機器を構築・導入し、運用およびトラブルシューティング・最適化を行う能力が問われます。
                        </li>
                    </ul>

                    <div className={`${styles.note} ${styles.warn}`}>
                        <strong>今後の変更予定について</strong>：Cisco Learning Networkの公式発表によると、2027年3月23日以降に予約されるCCIEラボ試験からは、AIをツールとして活用しながら導入・運用・最適化を行う新しい「AI DOO」モジュールが追加される予定です。本ガイド執筆時点（2026年7月）ではまだ適用されていませんが、今後受験を予定する場合は公式サイトで最新の試験形式を確認してください。
                    </div>

                    <h3>4.3 出題ドメインと比率（v1.1ブループリント）</h3>
                    <p>Cisco公式ブループリントに基づく出題比率は以下のとおりです。</p>
                    <div className={styles.tableWrap}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" className={styles.num}>No</th>
                                    <th scope="col">ドメイン</th>
                                    <th scope="col" className={styles.num}>出題比率</th>
                                    <th scope="col">主な内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={styles.num}>1</td>
                                    <td>ネットワークインフラストラクチャ</td>
                                    <td className={styles.pct}>30%</td>
                                    <td>
                                        スイッチドキャンパス（VLAN、EtherChannel、STP、L2プロトコル）、ルーティング概念（VRF-Lite、ルートリーキング、再配送）、EIGRP、OSPF（v2/v3）、BGP、マルチキャスト
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>2</td>
                                    <td>ソフトウェア定義インフラストラクチャ</td>
                                    <td className={styles.pct}>25%</td>
                                    <td>
                                        Cisco SD-Access（アンダーレイ/オーバーレイ、ファブリック設計・展開、境界ハンドオフ、セグメンテーション）、Cisco SD-WAN（vManage/vBond/vSmartのコントローラアーキテクチャ、OMP、集中/ローカルポリシー）
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>3</td>
                                    <td>トランスポート技術とソリューション</td>
                                    <td className={styles.pct}>15%</td>
                                    <td>
                                        静的P2P GREトンネル、MPLS（LDP、L3VPN、PE-CE BGP）、DMVPN（Phase 3、NHRP、IPsec/IKEv2）
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>4</td>
                                    <td>インフラストラクチャセキュリティとサービス</td>
                                    <td className={styles.pct}>15%</td>
                                    <td>
                                        デバイスセキュリティ（CoPP、AAA）、スイッチ/ルータセキュリティ機能（DHCPスヌーピング、ARPインスペクション、IPv6セキュリティ）、QoS、ネットワークサービス（FHRP、NTP/PTP、DHCP、NAT）、SPAN/ERSPAN、トラブルシューティングツール
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.num}>5</td>
                                    <td>インフラストラクチャの自動化とプログラマビリティ</td>
                                    <td className={styles.pct}>15%</td>
                                    <td>
                                        JSON/XML/YAML/Jinja、EEMアプレット、Guest Shell（Linux環境・Python）、vManage APIおよびCisco DNA Center APIとの連携、モデル駆動型テレメトリ（gRPC）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.note}>
                        <strong>初学者への補足</strong>：ラボ試験では「ソフトウェア定義インフラストラクチャ」（SD-Access／SD-WAN）が25%と非常に高い比率を占めます。従来型のルーティング・スイッチング技術（ドメイン1）に加えて、SD-Access・SD-WANの設計・構築経験がなければ合格は難しい構成になっています。
                    </div>
                </section>

                {/* §05 */}
                <section className={styles.block} id="prereq">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§05</span>
                        <h2>受験前提条件・推奨経験</h2>
                    </div>
                    <p>
                        Cisco公式サイトによれば、CCIE Enterprise Infrastructureには<strong>正式な前提条件はありません</strong>（ENCOR合格は必須ですが、CCNAやCCNPの保有そのものは必須ではありません）。ただし、以下の経験が推奨されています。
                    </p>
                    <ul>
                        <li>
                            エンタープライズネットワーキング技術・ソリューションの<strong>設計・導入・運用・最適化について5年から7年の実務経験</strong>
                        </li>
                        <li>ENCOR 350-401の出題範囲を十分に理解していること</li>
                        <li>
                            ラボ試験の出題範囲（SD-Access、SD-WAN、自動化・プログラマビリティを含む）を実機・仮想環境で経験していること
                        </li>
                    </ul>
                </section>

                {/* §06 */}
                <section className={styles.block} id="cost">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§06</span>
                        <h2>費用の内訳</h2>
                    </div>
                    <div className={styles.tableWrap}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">費用目安</th>
                                    <th scope="col">備考</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ENCOR 350-401（クオリファイ試験）</td>
                                    <td className={styles.num}>400 USD</td>
                                    <td>受験ごとに発生（不合格の場合は再受験費用も同額）</td>
                                </tr>
                                <tr>
                                    <td>CCIE EIラボ試験</td>
                                    <td className={styles.num}>1,600 USD</td>
                                    <td>
                                        テストセンター／BYODモバイルラボ。Ciscoキット利用のモバイルラボの場合は1,900 USD
                                    </td>
                                </tr>
                                <tr>
                                    <td>トレーニング教材・書籍・仮想ラボ環境利用料</td>
                                    <td>個人差が大きい</td>
                                    <td>
                                        独学か公式トレーニング受講かで大きく変動（数百〜数千USD規模）
                                    </td>
                                </tr>
                                <tr>
                                    <td>渡航・宿泊費</td>
                                    <td>変動</td>
                                    <td>
                                        ラボ試験会場は世界の一部拠点に限定されるため、遠方受験の場合は交通・宿泊費が発生
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.note}>
                        上記のうちCisco公式サイトで明記されているのは、ENCORの受験料（400 USD）とラボ試験の受験料（1,600 USD／1,900 USD）です。教材費や渡航費を含めた総額の見積もりは受験者ごとに幅があるため、あくまで目安としてご覧ください。
                    </div>
                </section>

                {/* §07 */}
                <section className={styles.block} id="recert">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§07</span>
                        <h2>再認定（Recertification）</h2>
                    </div>
                    <p>
                        CCIE Enterprise Infrastructure認定の<strong>有効期間は3年間</strong>です。有効期限内に以下のいずれかの方法で再認定を行う必要があります（詳細は§10の再認定ポリシーページを参照）。
                    </p>
                    <ul>
                        <li>該当分野の試験に再度合格する</li>
                        <li>
                            Cisco Continuing Education（CE）プログラムのクレジットを取得する
                        </li>
                        <li>上記を組み合わせる</li>
                    </ul>
                </section>

                {/* §08 */}
                <section className={styles.block} id="study">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§08</span>
                        <h2>初学者向け学習ロードマップ</h2>
                    </div>
                    <p>
                        これから学習を始める方向けに、一般的な学習ステップの流れをまとめました。
                    </p>

                    <div className={styles.diagramWrap}>
                        <div className={styles.techFrame}>
                            <Corners />
                            <MermaidDiagram
                                chart={DIAGRAMS.studyRoadmap}
                                ariaLabel="初学者向け学習ロードマップ"
                            />
                        </div>
                        <p className={styles.diagramCaption}>FIG.04 — 初学者向け学習ロードマップ</p>
                    </div>

                    <p>
                        学習期間はバックグラウンドによって大きく異なりますが、実務経験が浅い場合は数年単位、実務経験が豊富な場合でも半年〜1年程度の集中学習を要することが一般的とされています。
                    </p>
                </section>

                {/* §09 */}
                <section className={styles.block} id="faq">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§09</span>
                        <h2>よくある質問</h2>
                    </div>

                    <details className={styles.faq}>
                        <summary>CCNAやCCNPを持っていないとCCIE EIは受験できませんか？</summary>
                        <div className={styles.faqBody}>
                            公式な前提資格はありません。ENCOR 350-401に合格すればラボ試験の受験資格を得られます。ただし出題範囲を考えると、CCNA〜CCNPレベルの知識は事実上前提になります。
                        </div>
                    </details>
                    <details className={styles.faq}>
                        <summary>ラボ試験はどこでも受けられますか？</summary>
                        <div className={styles.faqBody}>
                            世界の一部のテストセンターでのみ実施されるほか、自分のPCを持ち込んで受験する「BYODモバイルラボ」形式も用意されています。詳細は公式サイトの試験会場ページで確認してください。
                        </div>
                    </details>
                    <details className={styles.faq}>
                        <summary>
                            ENCOR合格後、すぐにラボ試験を受けなければなりませんか？
                        </summary>
                        <div className={styles.faqBody}>
                            明確な期限は設けられていませんが、出題内容がバージョンアップされる可能性があるため、公式サイトで最新のブループリントを定期的に確認することをおすすめします。
                        </div>
                    </details>
                </section>

                {/* §10 */}
                <section className={styles.block} id="sources">
                    <div className={styles.sectionHead}>
                        <span className={styles.sectionIdx}>§10</span>
                        <h2>参考ソース</h2>
                    </div>
                    <p>
                        本ガイドの内容は、以下のCisco公式ページおよび公式PDF文書を情報源としています。
                    </p>
                    <ul className={styles.sourcesList}>
                        <li>
                            <span className={styles.srcName}>
                                CCIE Enterprise Infrastructure 認定とトレーニングプログラム（Cisco公式・日本語）
                            </span>
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccie-enterprise-infrastructure.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccie-enterprise-infrastructure.html
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                Implementing Cisco Enterprise Network Core Technologies (350-401 ENCOR)（Cisco公式・日本語）
                            </span>
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/encor-350-401.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/encor-350-401.html
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                ENCOR 350-401 試験内容（出題ブループリント）PDF（Cisco公式・日本語）
                            </span>
                            <a
                                href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/350-401-ENCOR.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/350-401-ENCOR.pdf
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                CCIE Enterprise Infrastructure v1.1 Exam Topics（ラボ試験ブループリントPDF、Cisco公式）
                            </span>
                            <a
                                href="https://learningcontent.cisco.com/documents/marketing/exam-topics/CCIE_EI_v1.1_Blue_Print.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://learningcontent.cisco.com/documents/marketing/exam-topics/CCIE_EI_v1.1_Blue_Print.pdf
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                Cisco Expert Certifications Exams and Training（受験料・再認定等、Cisco公式）
                            </span>
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/expert/exams-training.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/site/us/en/learn/training-certifications/certifications/expert/exams-training.html
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                CCIE Enterprise Infrastructure（Cisco Learning Network公式コミュニティページ）
                            </span>
                            <a
                                href="https://learningnetwork.cisco.com/s/ccie-enterprise"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://learningnetwork.cisco.com/s/ccie-enterprise
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                CCIE Practical Exam Format（ラボ試験形式、AI DOOモジュールに関する公式アナウンス）
                            </span>
                            <a
                                href="https://learningnetwork.cisco.com/s/article/CCIE-Practical-Exam-Format-with-AI-Module"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://learningnetwork.cisco.com/s/article/CCIE-Practical-Exam-Format-with-AI-Module
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>再認定ポリシー（Cisco公式・日本語）</span>
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html
                            </a>
                        </li>
                        <li>
                            <span className={styles.srcName}>
                                CCIE Enterprise Infrastructure (v1.1) 機器とソフトウェアリスト（Cisco公式PDF）
                            </span>
                            <a
                                href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/certifications/expert/CCIEEI-v1-1-equipment-and-SW.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/certifications/expert/CCIEEI-v1-1-equipment-and-SW.pdf
                            </a>
                        </li>
                    </ul>
                </section>

                <footer className={styles.footer}>
                    <p>
                        注：本ガイド内の一部の費用感（教材費・渡航費など）については公式サイトに明記がないため、複数の受験体験レポート等を参考に目安として記載しています。正確な受験料・出題範囲は必ず上記の公式ページでご確認ください。CCIE認定プログラムは技術トレンドに合わせて改訂される場合があるため、受験前に最新情報を確認することを推奨します。
                    </p>
                    <p>本ドキュメントの情報基準日：2026年7月</p>
                </footer>
            </main>
        </div>
    );
}
