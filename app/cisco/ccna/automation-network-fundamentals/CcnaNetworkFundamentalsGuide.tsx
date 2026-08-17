'use client';

import React, { useEffect, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

/** Renders the Mermaid diagram identified by id with its accessible label and optional caption. */
const Diagram = React.memo(function Diagram({ id, label, caption }: { id: string; label: string; caption?: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-block">
            <div className="diagram-wrapper">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
            {caption ? <p className="diagram-caption">{caption}</p> : null}
        </div>
    );
});

/**
 * Renders the CCNA Automation Network Fundamentals study guide and tracks the visible section for navigation.
 */
export default function CcnaNetworkFundamentalsGuide() {
    const [activeSectionId, setActiveSectionId] = useState<string>('overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sections = document.querySelectorAll('section.section, footer.footer');
        // 検出帯に入っているセクションを id 単位で保持する。
        // entries には「交差状態が変化した要素」しか含まれず、その順序もドキュメント順とは
        // 限らないため、コールバック内の最後のエントリを採用すると大きくスクロールした際に
        // 帯へ同時に入った上側のセクションが選ばれてしまう。
        const intersectingIds = new Map<string, boolean>();

        const handleIntersections: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.target.id) {
                    intersectingIds.set(entry.target.id, entry.isIntersecting);
                }
            });

            // 帯に入っているもののうち、ドキュメント順で最も下のセクションを採用する
            let nextActiveId: string | undefined;
            sections.forEach((section) => {
                if (section.id && intersectingIds.get(section.id)) {
                    nextActiveId = section.id;
                }
            });
            if (nextActiveId) setActiveSectionId(nextActiveId);
        };
        let observer: IntersectionObserver | undefined;

        const observeSections = () => {
            observer?.disconnect();
            const topOffset = Math.round(window.innerHeight * 0.2);
            const bottomOffset = Math.round(window.innerHeight * 0.7);
            const nextObserver = new IntersectionObserver(handleIntersections, {
                rootMargin: `-${topOffset}px 0px -${bottomOffset}px 0px`,
            });
            observer = nextObserver;
            sections.forEach((section) => nextObserver.observe(section));
        };

        observeSections();
        window.addEventListener('resize', observeSections);
        return () => {
            window.removeEventListener('resize', observeSections);
            observer?.disconnect();
        };
    }, []);

    return (
        <div className="ccna-network-fundamentals-page">
            <NavBar activeId={activeSectionId} />
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
                <section id="overview" className="section prose">
                    <h2 className="step-title">はじめに：このガイドの位置づけ</h2>
                    <p>
                        <strong>CCNA Automation</strong> は、Cisco が2026年に「DevNet Associate」から名称変更した資格で、ネットワークの基礎知識とソフトウェア開発・自動化スキルの両方を証明する認定資格です。取得には、120分の試験 <strong>200-901 CCNAAUTO（Automating Networks Using Cisco Platforms v1.1）</strong> に合格する必要があります。日本語での受験も可能です。
                    </p>
                    <p>
                        この試験は次の6つのドメインで構成されており、その中で本ガイドが扱う <strong>「6.0 Network Fundamentals」は出題比率15%</strong> を占めます。
                    </p>
                    <div className="table-wrapper">
                        <table className="data-table domain-highlight">
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
                    <p>
                        「自動化やプログラミングの資格なのに、なぜネットワークの基礎知識が問われるのか？」と疑問に思うかもしれません。理由はシンプルで、<strong>ネットワークの仕組みを理解していないと、API呼び出しの失敗やアプリケーションの接続不良が「コードの問題」なのか「ネットワークの問題」なのかを切り分けられない</strong>からです。このドメインは、自動化エンジニアが最低限押さえておくべきネットワークの土台を確認するためのものです。
                    </p>
                </section>

                {/* STEP 0 */}
                <section id="step0" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 0</span>{' '}
                        Network Fundamentalsドメインの全体像
                    </h2>
                    <p>
                        このドメインは、公式Exam Topicsにおいて 6.1〜6.9 の9つの小項目に分かれています。まずは全体像を掴みましょう。
                    </p>

                    <Diagram
                        id="diagram-0"
                        label="Network Fundamentals ドメインの全体像フローチャート"
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
                <section id="step1" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 1</span>{' '}
                        MACアドレスとVLAN（6.1）
                    </h2>

                    <h3 className="sub-title">MACアドレスとは</h3>
                    <p>
                        MACアドレス（Media Access Control Address）は、ネットワークインターフェース（NIC）ごとに割り当てられた <strong>48ビット（6バイト）の物理アドレス</strong> です。IPアドレスのように後から人間が変更する前提のものではなく、機器の出荷時に焼き込まれる一意な識別子です。
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
                                    <td>OUI（Organizationally Unique Identifier）</td>
                                    <td>上位24ビット</td>
                                    <td>製造ベンダーを識別する部分（IEEEが割り当て）</td>
                                </tr>
                                <tr>
                                    <td>デバイス固有部分</td>
                                    <td>下位24ビット</td>
                                    <td>ベンダー内で一意になるように製造時に割り当てられる部分</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        表記例：<code>AA:BB:CC:11:22:33</code>（コロン区切り16進数）。スイッチはこのMACアドレスをもとに <strong>MACアドレステーブル</strong> を作成し、どのポートの先にどの端末がいるかを学習してフレームを転送します。
                    </p>

                    <h3 className="sub-title">VLANとは</h3>
                    <p>
                        VLAN（Virtual LAN）は、<strong>1台の物理スイッチを論理的に複数のネットワークへ分割する</strong> 技術です。同じVLANに属するポート同士は同じブロードキャストドメインとして通信できますが、異なるVLAN同士は直接通信できず、通信させるにはルーターやL3スイッチによるルーティングが必要になります。
                    </p>

                    <p>VLANを使う主な理由：</p>
                    <ul>
                        <li>部署やシステムの単位でネットワークを論理分離し、セキュリティを高める</li>
                        <li>ブロードキャストトラフィックの範囲を限定し、無駄な通信を減らす</li>
                        <li>物理的な配線を変更せずに、ポートの割り当て変更だけでネットワーク構成を変えられる</li>
                    </ul>

                    <Diagram
                        id="diagram-1"
                        label="L2スイッチとVLANによるネットワーク分割の図解"
                        caption="同じスイッチに接続していても、異なるVLAN同士は直接通信できない"
                    />

                    <p>
                        上図のように、同じスイッチに接続していても、VLAN 10とVLAN 20の端末同士は直接通信できません。両者を通信させたい場合は、後述するルーター（またはL3スイッチ）が間に入る必要があります。
                    </p>
                </section>

                {/* STEP 2 */}
                <section id="step2" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 2</span>{' '}
                        IPアドレス・ルート・サブネットマスク/プレフィックス・ゲートウェイ（6.2）
                    </h2>

                    <h3 className="sub-title">IPアドレスの基本</h3>
                    <p>
                        IPv4アドレスは32ビットで構成され、<code>192.168.1.10</code> のように8ビットずつ4つに区切った10進数（オクテット）で表記します。ネットワークを自動化する上では、「どこまでがネットワーク部で、どこからがホスト部か」 を正しく読めることが重要です。
                    </p>

                    <h3 className="sub-title">サブネットマスクとプレフィックス表記</h3>
                    <p>
                        サブネットマスクは、IPアドレスのうちネットワーク部を示すビットを表します。近年はサブネットマスクの代わりに CIDR表記（プレフィックス表記） である <code>/24</code> のような形式がよく使われます。
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
                                    <td>/24</td>
                                    <td>255.255.255.0</td>
                                    <td>24ビット</td>
                                    <td>254台</td>
                                </tr>
                                <tr>
                                    <td>/25</td>
                                    <td>255.255.255.128</td>
                                    <td>25ビット</td>
                                    <td>126台</td>
                                </tr>
                                <tr>
                                    <td>/26</td>
                                    <td>255.255.255.192</td>
                                    <td>26ビット</td>
                                    <td>62台</td>
                                </tr>
                                <tr>
                                    <td>/16</td>
                                    <td>255.255.0.0</td>
                                    <td>16ビット</td>
                                    <td>約65,534台</td>
                                </tr>
                                <tr>
                                    <td>/8</td>
                                    <td>255.0.0.0</td>
                                    <td>8ビット</td>
                                    <td>約1,677万台</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">プライベートIPアドレス範囲</h3>
                    <p>
                        社内ネットワークなど、インターネットに直接公開しないネットワークでは、以下のプライベートIPアドレス範囲 （RFC 1918）が使われます。
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
                                    <td>10.0.0.0 〜 10.255.255.255</td>
                                    <td>10.0.0.0/8</td>
                                    <td>大規模企業ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>172.16.0.0 〜 172.31.255.255</td>
                                    <td>172.16.0.0/12</td>
                                    <td>中規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>192.168.0.0 〜 192.168.255.255</td>
                                    <td>192.168.0.0/16</td>
                                    <td>家庭用・小規模オフィス</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">デフォルトゲートウェイとルート</h3>
                    <p>
                        <strong>デフォルトゲートウェイ</strong> とは、端末が「自分と異なるネットワーク宛て」の通信を送るときに 最初に転送する先（通常はルーターのインターフェース）です。<strong>ルート（経路情報）</strong> は、 「どの宛先ネットワークには、どのインターフェース・次のホップを通れば到達できるか」という情報で、 ルーターはこの情報をもとにパケットを転送します。
                    </p>

                    <Diagram
                        id="diagram-2"
                        label="デフォルトゲートウェイとルーティングの流れ"
                    />

                    <p>
                        PC-Aが同じネットワーク（192.168.1.0/24）内の端末と通信する場合はゲートウェイを経由せず直接通信しますが、 PC-Bのような別ネットワーク宛ての通信は、必ずデフォルトゲートウェイ（ルーター）を経由します。
                    </p>
                </section>

                {/* STEP 3 */}
                <section id="step3" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 3</span>{' '}
                        ネットワーク機器の役割（6.3）
                    </h2>
                    <p>
                        自動化対象となる代表的なネットワーク機器と、その役割を整理します。まず前提として、OSI参照モデルの 主要レイヤーを簡単に押さえておくと機器の役割が理解しやすくなります。
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
                                    <td>L7</td>
                                    <td>アプリケーション層</td>
                                    <td>HTTP、DNS、ロードバランサーのURLベース振り分け</td>
                                </tr>
                                <tr>
                                    <td>L4</td>
                                    <td>トランスポート層</td>
                                    <td>TCP/UDP、ポート番号、L4ロードバランシング</td>
                                </tr>
                                <tr>
                                    <td>L3</td>
                                    <td>ネットワーク層</td>
                                    <td>IPアドレス、ルーティング、ルーター</td>
                                </tr>
                                <tr>
                                    <td>L2</td>
                                    <td>データリンク層</td>
                                    <td>MACアドレス、VLAN、スイッチ</td>
                                </tr>
                                <tr>
                                    <td>L1</td>
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
                                    <td>スイッチ（L2スイッチ）</td>
                                    <td>L2</td>
                                    <td>MACアドレステーブルをもとにフレームを転送。VLANによるセグメント分割を行う</td>
                                </tr>
                                <tr>
                                    <td>ルーター</td>
                                    <td>L3</td>
                                    <td>IPアドレス・ルーティングテーブルをもとに、異なるネットワーク間でパケットを転送する</td>
                                </tr>
                                <tr>
                                    <td>ファイアウォール</td>
                                    <td>L3〜L7</td>
                                    <td>通信のフィルタリング、アクセス制御、脅威検知・防御を行う</td>
                                </tr>
                                <tr>
                                    <td>ロードバランサー</td>
                                    <td>L4〜L7</td>
                                    <td>1つの仮想IP（VIP）宛ての通信を複数のサーバーへ振り分け、可用性と拡張性を高める</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout">
                        <strong>自動化の観点でのポイント：</strong> これらの機器はそれぞれ異なるAPI・プロトコル（RESTCONF、NETCONF、ベンダー独自API等）で操作されることが多く、 「どの機器が、どのレイヤーで、何をしているか」を理解していないと自動化スクリプトが何を制御しているのか 把握できません。
                    </div>
                </section>

                {/* STEP 4 */}
                <section id="step4" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 4</span>{' '}
                        ネットワークトポロジ図の読み方（6.4）
                    </h2>
                    <p>
                        試験では、スイッチ・ルーター・ファイアウォール・ロードバランサー・ポート番号などを含む基本的なトポロジ図を 読み解く問題が出題されます。以下は典型的な構成例です。
                    </p>

                    <Diagram
                        id="diagram-3"
                        label="各層のネットワーク機器とロードバランサー配置図"
                    />

                    <p>このようなトポロジ図を読み解くときのチェックポイント：</p>
                    <ul>
                        <li>
                            <strong>通信の入口から出口までの経路</strong>：クライアント→スイッチ→ルーター→ファイアウォール→ロードバランサー→サーバー、という順に、どの機器を経由するかを追う
                        </li>
                        <li>
                            <strong>境界（レイヤーの切り替わり地点）</strong>：VLANの境界はスイッチ、ネットワークの境界はルーター、というようにどこで何が変わるかを意識する
                        </li>
                        <li>
                            <strong>ポート番号の意味</strong>：<code>203.0.113.10:443</code> のような表記は「そのIPアドレスの443番ポート（HTTPS）で待ち受けている」ことを示す
                        </li>
                        <li>
                            <strong>通信がどこで変換・分散されるか</strong>：ロードバランサーの仮想IP宛ての通信が、内部的にどのサーバーへ振り分けられるか
                        </li>
                    </ul>
                </section>

                {/* STEP 5 */}
                <section id="step5" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 5</span>{' '}
                        Management / Data / Control Plane（6.5）
                    </h2>
                    <p>
                        ネットワーク機器（ルーターやスイッチ）の内部動作は、役割ごとに3つの「プレーン」に分けて理解すると 自動化の対象範囲が明確になります。
                    </p>

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
                                    <td>Management Plane（管理プレーン）</td>
                                    <td>機器の設定・監視・運用管理を行う</td>
                                    <td>SSH、SNMP、NETCONF/RESTCONFによるアクセス</td>
                                </tr>
                                <tr>
                                    <td>Control Plane（制御プレーン）</td>
                                    <td>経路情報や制御情報の学習・交換を行う（いわば機器の「頭脳」）</td>
                                    <td>OSPFやBGPなどのルーティングプロトコル、STP、MACアドレステーブルの学習</td>
                                </tr>
                                <tr>
                                    <td>Data Plane（データプレーン）</td>
                                    <td>実際のユーザートラフィック（パケット/フレーム）を転送する（いわば機器の「手足」）</td>
                                    <td>受信したパケットの実転送処理（フォワーディング）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram
                        id="diagram-4"
                        label="Management, Control, Data Planeの3層概念図"
                    />

                    <p>
                        自動化スクリプトの多くは Management Plane を経由して機器を操作します （例：NETCONFで設定を投入する、SNMPで状態を取得する）。一方で、実際にユーザーの通信を運ぶのは Data Plane であり、両者は別物であることを区別して理解しておくことが重要です。
                    </p>
                </section>

                {/* STEP 6 */}
                <section id="step6" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 6</span>{' '}
                        IPサービス（DHCP・DNS・NAT・SNMP・NTP）（6.6）
                    </h2>
                    <p>
                        ネットワーク自動化の現場でも頻繁に登場する、5つの代表的なIPサービスを解説します。
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
                                    <td>DHCP</td>
                                    <td>Dynamic Host Configuration Protocol</td>
                                    <td>IPアドレス等をクライアントへ自動的に割り当てる</td>
                                    <td>UDP 67（サーバー）／68（クライアント）</td>
                                </tr>
                                <tr>
                                    <td>DNS</td>
                                    <td>Domain Name System</td>
                                    <td>ドメイン名とIPアドレスを相互に変換する（名前解決）</td>
                                    <td>UDP/TCP 53</td>
                                </tr>
                                <tr>
                                    <td>NAT</td>
                                    <td>Network Address Translation</td>
                                    <td>プライベートIPアドレスとグローバルIPアドレスを変換する</td>
                                    <td>ポートではなくアドレス変換の技術</td>
                                </tr>
                                <tr>
                                    <td>SNMP</td>
                                    <td>Simple Network Management Protocol</td>
                                    <td>機器の状態監視、情報収集、障害の自発通知を行う</td>
                                    <td>UDP 161（ポーリング）／162（Trap）</td>
                                </tr>
                                <tr>
                                    <td>NTP</td>
                                    <td>Network Time Protocol</td>
                                    <td>ネットワーク機器間で時刻を同期する</td>
                                    <td>UDP 123</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="sub-title">DHCP：IPアドレスの自動割り当て</h3>
                    <p>
                        DHCPは「DORA」と呼ばれる4段階のやり取りでIPアドレスを割り当てます。
                    </p>
                    <Diagram
                        id="diagram-5"
                        label="DHCPシーケンス（Discover, Offer, Request, ACK）"
                    />

                    <h3 className="sub-title">DNS：名前解決の流れ</h3>
                    <Diagram
                        id="diagram-6"
                        label="DNS名前解決シーケンス"
                    />

                    <h3 className="sub-title">NAT：アドレス変換の考え方</h3>
                    <Diagram
                        id="diagram-7"
                        label="NAT（アドレス変換）の動作概念図"
                    />
                    <p>
                        社内のプライベートIPアドレスは、インターネットへ出る際にルーター（またはファイアウォール）で グローバルIPアドレスへ変換されます。この変換テーブルの不整合や枯渇が、後述する「NAT Problem」の 原因になります。
                    </p>

                    <h3 className="sub-title">SNMP：機器の監視</h3>
                    <Diagram
                        id="diagram-8"
                        label="SNMPのポーリングとTrap通知フロー"
                    />

                    <h3 className="sub-title">NTP：時刻同期の階層構造</h3>
                    <Diagram
                        id="diagram-9"
                        label="NTPのStratum（階層構造）の図解"
                    />
                    <p>
                        NTPでは、時刻源からの距離（階層）を「Stratum」という数値で表します。ログの時刻がずれていると 障害発生時刻の突き合わせができなくなるため、自動化・運用の現場でも時刻同期は地味に重要な要素です。
                    </p>
                </section>

                {/* STEP 7 */}
                <section id="step7" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 7</span>{' '}
                        プロトコルとポート番号（6.7）
                    </h2>
                    <p>
                        自動化スクリプトでAPIやCLIに接続する際、どのポートを使うかを把握しておくことは、接続トラブルの 切り分けにも直結します。
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
                                    <td>SSH</td>
                                    <td>22</td>
                                    <td>TCP</td>
                                    <td>機器へのセキュアなリモートログイン・管理プレーンアクセス</td>
                                </tr>
                                <tr>
                                    <td>Telnet</td>
                                    <td>23</td>
                                    <td>TCP</td>
                                    <td>暗号化されないリモートログイン（現在は非推奨）</td>
                                </tr>
                                <tr>
                                    <td>HTTP</td>
                                    <td>80</td>
                                    <td>TCP</td>
                                    <td>平文でのWebアクセス・REST APIアクセス</td>
                                </tr>
                                <tr>
                                    <td>HTTPS</td>
                                    <td>443</td>
                                    <td>TCP</td>
                                    <td>TLSで暗号化されたWebアクセス・REST APIアクセス</td>
                                </tr>
                                <tr>
                                    <td>NETCONF</td>
                                    <td>830</td>
                                    <td>TCP（SSH上）</td>
                                    <td>モデル駆動型プログラマビリティによる機器の設定取得・投入</td>
                                </tr>
                                <tr>
                                    <td>DNS</td>
                                    <td>53</td>
                                    <td>UDP/TCP</td>
                                    <td>名前解決</td>
                                </tr>
                                <tr>
                                    <td>DHCP</td>
                                    <td>67 / 68</td>
                                    <td>UDP</td>
                                    <td>IPアドレスの自動割り当て</td>
                                </tr>
                                <tr>
                                    <td>SNMP</td>
                                    <td>161 / 162</td>
                                    <td>UDP</td>
                                    <td>機器の監視・自発通知（Trap）</td>
                                </tr>
                                <tr>
                                    <td>NTP</td>
                                    <td>123</td>
                                    <td>UDP</td>
                                    <td>時刻同期</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        これらのポート番号は、後述する「アプリケーション接続トラブルの切り分け」において、ファイアウォールで どのポートが遮断されているかを特定する際の基礎知識になります。
                    </p>
                </section>

                {/* STEP 8 */}
                <section id="step8" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 8</span>{' '}
                        アプリケーション接続トラブルの切り分け（6.8）
                    </h2>
                    <p>
                        自動化スクリプトやAPIクライアントから接続できないとき、原因を「NAT不良」「ポート遮断」「プロキシ」 「VPN」の観点で切り分ける考え方を整理します。
                    </p>

                    <Diagram
                        id="diagram-10"
                        label="アプリケーション接続トラブル診断フローチャート"
                    />

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
                                    <td>Transport Port Blocked</td>
                                    <td>対象ポートへの接続テスト、FW/ACLのログ確認</td>
                                </tr>
                                <tr>
                                    <td>社外から社内のアプリケーションに到達できない</td>
                                    <td>NAT Problem</td>
                                    <td>NAT変換テーブル、グローバルIPの割当状況の確認</td>
                                </tr>
                                <tr>
                                    <td>特定URL・宛先だけアクセスできない</td>
                                    <td>Proxy設定の誤り</td>
                                    <td>プロキシの除外リスト・認証設定の確認</td>
                                </tr>
                                <tr>
                                    <td>拠点間の通信だけ失敗する</td>
                                    <td>VPN Problem</td>
                                    <td>VPNトンネルの状態、ルーティング配布状況の確認</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout">
                        <strong>切り分けの基本方針：</strong>
                        「まずネットワーク経路を疑い、その後にアプリケーション層を疑う」という順序で進めるのが基本です。 自動化エンジニアであっても、コードを直す前にネットワークパスを確認する習慣が重要になります。
                    </div>
                </section>

                {/* STEP 9 */}
                <section id="step9" className="section prose">
                    <h2 className="step-title">
                        <span className="step-num">Step 9</span>{' '}
                        ネットワーク制約がアプリケーションに与える影響（6.9）
                    </h2>
                    <p>
                        最後に、ネットワークの物理的・構成的な制約が、アプリケーションの動作にどう影響するかを整理します。
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
                                    <td>帯域幅（Bandwidth）不足</td>
                                    <td>レスポンス遅延、タイムアウトの増加</td>
                                    <td>QoS設定、帯域増強、キャッシュの活用</td>
                                </tr>
                                <tr>
                                    <td>遅延（Latency）／RTTの増大</td>
                                    <td>リアルタイム性の低下（音声・映像品質の劣化）</td>
                                    <td>CDNの活用、エッジコンピューティングの活用</td>
                                </tr>
                                <tr>
                                    <td>MTU／パケットフラグメンテーション</td>
                                    <td>パケット分割によるオーバーヘッド、通信エラー</td>
                                    <td>MTUサイズの調整、Path MTU Discoveryの利用</td>
                                </tr>
                                <tr>
                                    <td>パケットロス</td>
                                    <td>再送増加によるスループット低下</td>
                                    <td>信頼性の高いプロトコルの選択、QoSの適用</td>
                                </tr>
                                <tr>
                                    <td>ファイアウォール／ACLによる通信制限</td>
                                    <td>特定ポート・プロトコルの通信が失敗する</td>
                                    <td>事前の通信要件確認、必要なポートの申請・開放</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        これらは一見「ネットワーク側の話」に見えますが、自動化やアプリケーション開発を行う上でも、 「なぜこのAPI呼び出しはタイムアウトするのか」「なぜこの自動化ジョブは特定拠点でだけ失敗するのか」 を理解するための土台になります。
                    </p>
                </section>

                {/* SUMMARY */}
                <section id="summary" className="section prose">
                    <h2 className="step-title">まとめ：学習のポイント</h2>
                    <ul>
                        <li>
                            <strong>Network Fundamentalsは出題比率15%</strong> で、6つのドメインの中では中程度の比率だが、他ドメイン（特に「5.0 Infrastructure and Automation」）の理解の土台になる
                        </li>
                        <li>
                            <strong>6.1〜6.4</strong> は「モノの名前と役割」を覚える暗記寄りの範囲：MACアドレス、VLAN、IPアドレス、サブネット、ゲートウェイ、各種ネットワーク機器、トポロジ図の読み方
                        </li>
                        <li>
                            <strong>6.5</strong> は機器内部の「動作の分類」（Management/Control/Data Plane）を理解する範囲
                        </li>
                        <li>
                            <strong>6.6〜6.7</strong> はIPサービス（DHCP・DNS・NAT・SNMP・NTP）とポート番号という「実務で頻出する具体的な仕組み」を押さえる範囲
                        </li>
                        <li>
                            <strong>6.8〜6.9</strong> は「トラブルシューティングの考え方」を問う応用範囲であり、他の項目の理解を前提とした総合問題になりやすい
                        </li>
                        <li>
                            学習の順序としては、<strong>用語（6.1〜6.4）→ 仕組み（6.5〜6.7）→ 応用・診断（6.8〜6.9）</strong> の順に進めると理解しやすい
                        </li>
                    </ul>
                </section>

                {/* REFERENCES / FOOTER */}
                <section id="references" className="section prose footer">
                    <h2 className="step-title">参考情報源</h2>
                    <p>
                        本ガイドの内容は、以下のCisco公式情報源に基づいて作成しています。最新情報は変更される可能性があるため、 学習の際は必ず一次情報を確認してください。
                    </p>
                    <ul className="ref-list">
                        <li>
                            <span className="ref-name">CCNA Automation Certification（資格概要）</span>
                            <a className="ref-url" href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html">
                                https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html
                            </a>
                        </li>
                        <li>
                            <span className="ref-name">
                                CCNA Automation Exam and Training（試験概要・受験情報：試験名、時間、言語、費用など）
                            </span>
                            <a className="ref-url" href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html">
                                https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html
                            </a>
                        </li>
                        <li>
                            <span className="ref-name">
                                Automating Networks Using Cisco Platforms v1.1（200-901）Exam Topics（公式出題範囲PDF：本ガイドの6.1〜6.9の項目立てはこの一次資料に基づく）
                            </span>
                            <a className="ref-url" href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf">
                                https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf
                            </a>
                        </li>
                        <li>
                            <span className="ref-name">
                                Cisco Learning Network：CCNAAUTO Exam Topics and Study Guide（コミュニティ上の出題範囲ページ）
                            </span>
                            <a className="ref-url" href="https://learningnetwork.cisco.com/s/ccnaauto-exam-topics">
                                https://learningnetwork.cisco.com/s/ccnaauto-exam-topics
                            </a>
                        </li>
                    </ul>
                    <p style={{ marginTop: '2rem', fontSize: '0.85rem' }}>
                        補足：CCNA Automationは、Ciscoが2026年に「DevNet Associate」から名称変更した資格です。既存のDevNet Associate 資格保有者は、自動的にCCNA Automation資格保有者として扱われます。
                    </p>
                </section>
            </main>
        </div>
    );
}
