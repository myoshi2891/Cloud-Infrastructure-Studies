'use client';

import React, { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

export function PcneSection1VpcDesignGuide({ rootClassName }: { rootClassName: string }) {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={`${rootClassName} layout`}>
            <NavBar />
            <div><div className="hero">
            <span className="eyebrow">Professional Cloud Network Engineer · Section 1 (～21%)</span>
            <h1>VPCネットワーク設計<br />試験対策ガイド</h1>
            <p className="hero-sub">
                中級者〜上級者向け · 出題内容の詳細解説とベストプラクティス
            </p>
            <blockquote className="hero-lede">
                <p>
                    Section
                    1は試験全体の<strong>約21%</strong>を占め、6セクション中最大の配点を持つ最重要領域です。本ガイドは公式Exam
                    Guideの4タスク(1.1〜1.4)を、設計判断のポイントとベストプラクティスに沿ってステップバイステップで解説します。
                </p>
                <p>
                    出典: <a href="https://cloud.google.com/learn/certification/cloud-network-engineer" target="_blank" rel="noopener">認定試験ページ</a> / <a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf" target="_blank" rel="noopener">公式Exam Guide (PDF)</a>
                </p>
            </blockquote>
        </div>
<div className="main">
            <h2 id="section-1-designing-and-planning-a-google-cloud-vpc-networkvpcネットワークの設計と計画">
                Section 1: Designing and planning a Google Cloud VPC
                network(VPCネットワークの設計と計画)
            </h2>
            <blockquote>
                <p>
                    対象読者:中級者〜上級者(Associate Cloud
                    Engineer相当の実務経験、または他クラウドでのネットワーク設計経験がある方)
                    出題比率:Section
                    1は試験全体の<strong>約21</strong>%を占め、6セクション中最大の配点を持つ最重要領域です。
                </p>
            </blockquote>
            <hr />
            <h2 id="この章について">この章について</h2>
            <p>
                Google Cloud Professional Cloud Network
                Engineer(PCNE)認定試験は、VPCの構築・運用だけでなく、<strong>要件に対して適切なネットワークアーキテクチャを設計できるか</strong>を問う試験です。Section
                1はその中でも「実装する前に何を決めるべきか」という設計判断力を測るセクションであり、以下の4つのタスクに分かれています。
            </p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">タスク</th>
                            <th scope="col">内容</th>
                            <th scope="col">主なキーワード</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>1.1</td>
                            <td>全体的なネットワークアーキテクチャの設計</td>
                            <td>
                                ネットワーク階層、HA/DR、DNSトポロジ、ロードバランサ選定、GKE計画、IAM、マネージドサービス接続、上限
                            </td>
                        </tr>
                        <tr className="even">
                            <td>1.2</td>
                            <td>VPCネットワークの設計</td>
                            <td>
                                Standalone/Shared VPC、VPC
                                Peering、NCC、IPAM、MTU、サードパーティアプライアンス
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>1.3</td>
                            <td>耐障害性・高性能なハイブリッド/マルチクラウドネットワークの設計</td>
                            <td>
                                Interconnect、Cloud VPN、Cross-Cloud
                                Interconnect、Peering各種、ハイブリッドDNS、MACsec
                            </td>
                        </tr>
                        <tr className="even">
                            <td>1.4</td>
                            <td>GKE向けの設計</td>
                            <td>
                                パブリック/プライベートクラスタ、コントロールプレーンアクセス、IPアドレス計画、GKE
                                LB
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                本ガイドはこの4タスクを公式Exam
                Guideの記載順に沿って、それぞれの設計判断のポイントとベストプラクティスをステップバイステップで解説します。ASCII図は使用せず、すべての図解はMermaidダイアグラム、比較情報はMarkdownテーブルで表現しています。
            </p>
            <hr />
            <hr />
            <div className="quicknav-grid">
                <a className="quicknav-card" href="#11-全体的なネットワークアーキテクチャの設計"><span className="quicknav-badge">1.1</span>
                    <h3>全体的なネットワークアーキテクチャの設計</h3>
                    <p>
                        ネットワーク階層・HA/DR・DNS・LB選定・GKE計画・IAM・マネージドサービス接続・Quota
                    </p></a><a className="quicknav-card" href="#12-vpcネットワークの設計"><span className="quicknav-badge">1.2</span>
                    <h3>VPCネットワークの設計</h3>
                    <p>
                        VPCの種類/接続方式・IPAM戦略・動的ルーティングモード・MTU・サードパーティアプライアンス
                    </p></a><a className="quicknav-card" href="#13-耐障害性高性能なハイブリッドマルチクラウドネットワークの設計"><span className="quicknav-badge">1.3</span>
                    <h3>ハイブリッド/マルチクラウド設計</h3>
                    <p>Interconnect・Cloud VPN・Peering各種・ハイブリッドDNS・MACsec暗号化</p></a><a className="quicknav-card" href="#14-gke向けの設計"><span className="quicknav-badge">1.4</span>
                    <h3>GKE向けの設計</h3>
                    <p>
                        ノード/コントロールプレーン公開範囲・IPアドレス計画・GKEロードバランシング
                    </p></a>
            </div>
            <h2 id="試験全体における本セクションの位置づけ">
                試験全体における本セクションの位置づけ
            </h2>
            <p>
                PCNE試験は6つのセクションで構成されており、それぞれの出題比率は公式Exam
                Guideに明記されています。Section 1(設計・計画)は単独で最大の配点を持ち、Section
                2(実装)と合わせると試験全体の約41%を占めます。つまり「設計思想を理解しているか」が合否を大きく左右します。
            </p>
            <Diagram id="diag-1" label="図解 1" />
            <p><strong>出題比率の内訳(公式Exam Guideより)</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">Section</th>
                            <th scope="col">名称</th>
                            <th scope="col">比率</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>1</td>
                            <td>Designing and planning a Google Cloud VPC network</td>
                            <td>~21%</td>
                        </tr>
                        <tr className="even">
                            <td>2</td>
                            <td>Implementing a VPC network</td>
                            <td>~20%</td>
                        </tr>
                        <tr className="odd">
                            <td>3</td>
                            <td>Configuring managed network services</td>
                            <td>~16%</td>
                        </tr>
                        <tr className="even">
                            <td>4</td>
                            <td>
                                Configuring and implementing hybrid and multicloud network
                                interconnectivity
                            </td>
                            <td>~16%</td>
                        </tr>
                        <tr className="odd">
                            <td>5</td>
                            <td>Managing, monitoring, and troubleshooting network operations</td>
                            <td>~14%</td>
                        </tr>
                        <tr className="even">
                            <td>6</td>
                            <td>
                                Configuring, implementing and managing a cloud network security
                                solution
                            </td>
                            <td>~13%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Section 1の学習が疎かだと、Section
                2〜4の実装問題でも「なぜこの構成にするのか」の判断基準を欠いたまま暗記に頼ることになります。逆に言えば、Section
                1を深く理解すれば他セクションの学習効率も大きく上がります。
            </p>
            <hr />
            <h2 id="11-全体的なネットワークアーキテクチャの設計">
                1.1 全体的なネットワークアーキテクチャの設計
            </h2>
            <p>
                タスク1.1は「個々の機能の使い方」ではなく、<strong>要件からアーキテクチャ全体を組み立てる力</strong>を問う領域です。試験では「コスト重視ならどちらのTierか」「99.99%の可用性を実現するにはどのトポロジか」といった、トレードオフを踏まえた選択問題が多く出題されます。
            </p>
            <h3 id="111-ネットワークサービス階層premium-tier--standard-tier">
                1.1.1 ネットワークサービス階層(Premium Tier / Standard Tier)
            </h3>
            <p>
                Google CloudのNetwork Service
                Tiersは、<strong>外部IPアドレスを使った通信がGoogleのバックボーンにどこまで乗るか</strong>を選択できる仕組みです。設計初期段階でこの選択を誤ると、後からリソース単位で細かく作り直す必要が出るため、最初に決めるべき項目の一つです。
            </p>
            <Diagram id="diag-2" label="図解 2" />
            <p><strong>設計上のポイント</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">観点</th>
                            <th scope="col">Premium Tier</th>
                            <th scope="col">Standard Tier</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>ルーティング</td>
                            <td>
                                可能な限りGoogleネットワーク内を経由し、出口(PoP)は宛先に最も近い場所
                            </td>
                            <td>ピアリング/ISP/トランジット網経由でユーザーに到達</td>
                        </tr>
                        <tr className="even">
                            <td>外部IPの種類</td>
                            <td>リージョナル・グローバルの両方</td>
                            <td>リージョナル外部IPのみ(全リージョンで利用可)</td>
                        </tr>
                        <tr className="odd">
                            <td>セキュリティ</td>
                            <td>最終区間までGoogleバックボーン上で保護</td>
                            <td>他社パブリッククラウドと同等</td>
                        </tr>
                        <tr className="even">
                            <td>SLA</td>
                            <td>99.99%</td>
                            <td>99.9%</td>
                        </tr>
                        <tr className="odd">
                            <td>料金</td>
                            <td>標準(他社プレミアム帯域と同等)</td>
                            <td>相対的に安価</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                ネットワーク階層はプロジェクト単位のデフォルト値を設定でき、さらにリソース単位(外部IPアドレス・転送規則)でも上書きできます。一つのロードバランサに2つの転送規則を作り、片方をPremium・もう片方をStandardにするという構成も可能です。判断に迷う場合はGoogle公式の推奨通り、まずPremium
                Tierを既定にし、コスト影響を見てからStandard
                Tierへの切り替えを検討するのが安全です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-tiers/docs/overview">Network Service Tiers overview</a>
                </p>
            </blockquote>
            <h3 id="112-高可用性フェイルオーバーdrスケールの設計">
                1.1.2 高可用性・フェイルオーバー・DR・スケールの設計
            </h3>
            <p>
                「高可用性」「フェイルオーバー」「災害復旧(DR)」「スケール」はそれぞれ異なるレイヤーの設計課題であり、試験でも明確に区別して出題されます。
            </p>
            <Diagram id="diag-3" label="図解 3" />
            <p>設計原則としては、単一障害点(SPOF)をレイヤーごとに洗い出すアプローチが有効です。</p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">レイヤー</th>
                            <th scope="col">SPOFになりやすい要素</th>
                            <th scope="col">Google Cloudでの緩和策</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>コンピューティング</td>
                            <td>単一VM、単一ゾーン</td>
                            <td>マネージドインスタンスグループ(MIG)をマルチゾーンに展開</td>
                        </tr>
                        <tr className="even">
                            <td>ネットワーク経路</td>
                            <td>単一のInterconnect接続/単一VPNトンネル</td>
                            <td>複数のVLANアタッチメント、HA VPNの2インターフェース構成</td>
                        </tr>
                        <tr className="odd">
                            <td>ロードバランサ</td>
                            <td>リージョナルLBのみ</td>
                            <td>
                                グローバル外部Application Load Balancer +
                                複数リージョンのバックエンド
                            </td>
                        </tr>
                        <tr className="even">
                            <td>DNS</td>
                            <td>単一リージョンのエンドポイントのみ登録</td>
                            <td>Cloud DNSのジオロケーション/フェイルオーバーポリシー</td>
                        </tr>
                        <tr className="odd">
                            <td>ルーティング制御</td>
                            <td>単一のCloud Router</td>
                            <td>リージョンごとに冗長なCloud Router、BGPの複数セッション</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                DR設計では、RTO(目標復旧時間)とRPO(目標復旧時点)の要件に応じて、<strong>Active-Active</strong>(複数リージョンで常時稼働・トラフィック分散)と<strong>Active-Passive</strong>(平常時は1リージョンのみ稼働し、障害時にフェイルオーバー)のどちらを取るかを判断します。Active-Activeを取る場合はグローバル動的ルーティングモードとグローバル外部LBの組み合わせが前提になり、Active-Passiveの場合はCloud
                DNSのフェイルオーバーポリシーやトラフィックマネジメント機能で切り替えを自動化します。
            </p>
            <p>
                スケール設計では、後述するIPアドレス計画(1.2.3)がボトルネックになりがちです。特にGKEのPodレンジは一度確保すると縮小できないため、初期段階で将来の水平スケールを見込んだサブネットサイズを設計しておく必要があります。
            </p>
            <h3 id="113-dnsトポロジの設計">1.1.3 DNSトポロジの設計</h3>
            <p>
                DNSトポロジの設計は、「どこが権威(authoritative)か」「どの方向にクエリを転送するか」という2つの軸で整理すると理解しやすくなります。
            </p>
            <Diagram id="diag-4" label="図解 4" />
            <p>
                Cloud
                DNSはグローバルなマネージドDNSサービスで、パブリックゾーン・プライベートゾーンの両方をホストできます。オンプレミスとのハイブリッド環境では、以下のパターンを組み合わせて設計します(詳細は1.3.9で深掘りします)。
            </p>
            <ul>
                <li>
                    <strong>パブリックゾーン</strong>:
                    インターネット向けに権威DNSとして公開する。Cloud
                    DNSは転送をサポートせず、常に権威応答のみを返す。
                </li>
                <li>
                    <strong>プライベートゾーン</strong>: 指定したVPCネットワーク(またはShared
                    VPCで許可されたネットワーク)からのみ解決可能。
                </li>
                <li>
                    <strong>転送ゾーン(Forwarding zone)</strong>:
                    特定のドメインへの問い合わせを、指定したネームサーバー(オンプレミスDNSなど)に転送する。
                </li>
                <li>
                    <strong>ピアリングゾーン(DNS peering)</strong>:
                    あるVPC(コンシューマ)から別のVPC(プロデューサ)のプライベートゾーンの名前解決を委譲する、片方向の関係。
                </li>
                <li>
                    <strong>サーバーポリシー(インバウンド/アウトバウンド)</strong>:
                    インバウンドサーバーポリシーを有効にすると、オンプレミス側からCloud
                    DNSの内部IPアドレスへ問い合わせができるようになる。
                </li>
            </ul>
            <p>
                <strong>設計の要点</strong>:
                DNSトポロジは「誰が」「どのゾーンについて」権威を持つかを最初に決め、命名規則(例:オンプレミスは<code>corp.example.com</code>、GCPは<code>gcp.example.com</code>)を分離しておくと、転送ルールがシンプルになります。同一ドメインを両方で管理するsplit-brain構成は複雑さが増すため、特別な理由がない限り避けるべきベストプラクティスとされています。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/dns/docs/zones/zones-overview">DNS zones overview</a> / <a href="https://cloud.google.com/dns/docs/best-practices">Best practices for Cloud DNS</a>
                </p>
            </blockquote>
            <h3 id="114-ロードバランサの選定">1.1.4 ロードバランサの選定</h3>
            <p>
                Google
                Cloudのロードバランサは「トラフィック種別」「内部/外部」「グローバル/リージョナル」「プロキシ/パススルー」の4軸で分類されます。試験では要件文からこの4軸を特定し、正しいロードバランサ種別を選ぶ問題が頻出します。
            </p>
            <Diagram id="diag-5" label="図解 5" />
            <p><strong>選定の基本テーブル</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">判断軸</th>
                            <th scope="col">選択肢</th>
                            <th scope="col">主な用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>トラフィックタイプ</td>
                            <td>Application Load Balancer(L7)</td>
                            <td>HTTP/HTTPS、URLベースのルーティング、Cloud CDN連携</td>
                        </tr>
                        <tr className="even">
                            <td>トラフィックタイプ</td>
                            <td>Proxy Network Load Balancer(L4プロキシ)</td>
                            <td>TCP、SSLオフロードが必要な非HTTPアプリ</td>
                        </tr>
                        <tr className="odd">
                            <td>トラフィックタイプ</td>
                            <td>Passthrough Network Load Balancer(L4パススルー)</td>
                            <td>クライアント送信元IPの保持、UDP/ESP/ICMPなど幅広いプロトコル</td>
                        </tr>
                        <tr className="even">
                            <td>公開範囲</td>
                            <td>外部</td>
                            <td>インターネットからのトラフィック</td>
                        </tr>
                        <tr className="odd">
                            <td>公開範囲</td>
                            <td>内部</td>
                            <td>
                                同一VPC、Peering、Cloud
                                VPN/Interconnectで接続されたクライアントからのトラフィック
                            </td>
                        </tr>
                        <tr className="even">
                            <td>スコープ</td>
                            <td>グローバル</td>
                            <td>
                                バックエンドが複数リージョンにまたがる、または将来またがる可能性がある
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>スコープ</td>
                            <td>リージョナル</td>
                            <td>
                                バックエンドが単一リージョン、かつ管轄要件でトラフィックをリージョン内に留めたい
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                パススルー型は送信元IPを変更せずバックエンドに届けるため、送信元IPベースのアクセス制御を行うレガシーアプリや、UDP/GRE/ESPなどHTTP以外のプロトコルが必要な場合に適しています。一方プロキシ型(Application
                LBやProxy Network LB)はGoogle Front
                End(GFE)やEnvoyでTLS終端やL7ルーティングを行うため、URLパスによるルーティング、Cloud
                Armor・Cloud
                CDNとの統合、証明書管理の一元化といった付加機能が必要な場面に向いています。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/load-balancing/docs/choosing-load-balancer">Choose a load balancer</a> / <a href="https://cloud.google.com/load-balancing/docs/load-balancing-overview">Cloud Load Balancing overview</a>
                </p>
            </blockquote>
            <h3 id="115-gkeネットワーキングの計画">1.1.5 GKEネットワーキングの計画</h3>
            <p>
                GKEをネットワーク設計に組み込む際は、コンテナ基盤特有のIP消費量の多さを踏まえた計画が必要です。詳細な設計判断は1.4章で扱いますが、1.1では「アーキテクチャ全体の中でGKEをどう位置づけるか」という初期計画に触れます。
            </p>
            <ul>
                <li>
                    <strong>セカンダリレンジの確保</strong>:
                    VPCネイティブクラスタはPod用・Service用にそれぞれセカンダリIPレンジを消費します。ノード数×Pod数の将来見積もりに対して十分な広さのレンジを最初に確保する必要があります(後から拡張は可能だが、無計画だと枯渇や断片化を招く)。
                </li>
                <li>
                    <strong>IPアドレス空間に基づくスケール上限の把握</strong>:
                    クラスタの最大ノード数は、割り当てたPodセカンダリレンジのサイズと、ノードあたりの最大Pod数の設定によって事実上決まります。
                </li>
                <li>
                    <strong>コントロールプレーンへのアクセス</strong>:
                    誰が(オンプレミス、他プロジェクト、CI/CDパイプラインなど)どの経路でkube-apiserverにアクセスするかを、VPC設計と合わせて決定します。
                </li>
            </ul>
            <p>
                これらはVPC設計(1.2)・IPAM戦略(1.2.3)・ハイブリッド接続設計(1.3)と密接に関わるため、GKEをホストする予定がある場合は、VPC全体の設計と同時並行でGKE要件を確定させることが推奨されます。
            </p>
            <h3 id="116-iamロールの設計">1.1.6 IAMロールの設計</h3>
            <p>
                ネットワークアーキテクチャの設計では、「誰が何を変更できるか」という権限設計も同時に行う必要があります。特にShared
                VPCを採用する場合、ホストプロジェクトとサービスプロジェクトの間でどの粒度の権限を付与するかが設計の柱になります。
            </p>
            <Diagram id="diag-6" label="図解 6" />
            <p><strong>代表的な事前定義ロール</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">ロール</th>
                            <th scope="col">付与先</th>
                            <th scope="col">役割</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td><code>roles/compute.xpnAdmin</code></td>
                            <td>ネットワークチーム(組織/フォルダレベル)</td>
                            <td>Shared VPCの有効化、サービスプロジェクトのアタッチ</td>
                        </tr>
                        <tr className="even">
                            <td><code>roles/compute.networkAdmin</code></td>
                            <td>ネットワークチーム</td>
                            <td>
                                VPC、サブネット、ルート、VPN、Cloud
                                Routerなどネットワークリソースの管理
                            </td>
                        </tr>
                        <tr className="odd">
                            <td><code>roles/compute.securityAdmin</code></td>
                            <td>セキュリティチーム</td>
                            <td>ファイアウォールルール、SSLポリシーの管理</td>
                        </tr>
                        <tr className="even">
                            <td><code>roles/compute.networkUser</code></td>
                            <td>サービスプロジェクトの利用者</td>
                            <td>
                                指定されたホストプロジェクトのサブネットを使ってリソースを作成する権限(プロジェクト単位
                                or サブネット単位)
                            </td>
                        </tr>
                        <tr className="odd">
                            <td><code>roles/compute.instanceAdmin</code></td>
                            <td>サービスプロジェクトの利用者</td>
                            <td>サービスプロジェクト内のインスタンス管理</td>
                        </tr>
                        <tr className="even">
                            <td><code>roles/compute.loadBalancerAdmin</code></td>
                            <td>ロードバランサ運用チーム</td>
                            <td>LBコンポーネント(バックエンド、URLマップ、転送規則など)の管理</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                設計上のベストプラクティスは「最小権限の原則」をShared
                VPCの粒度設計に反映させることです。具体的には、<code>compute.networkUser</code>をホストプロジェクト全体ではなく<strong>サブネット単位</strong>で付与することで、サービスプロジェクトのチームが誤って他チーム用のサブネットにリソースを作成することを防げます。またGKEやロードバランサをサービスプロジェクトから作成する場合は、Google管理のサービスエージェント(例:GKEのサービスエージェント、Google
                APIsサービスエージェント)にも該当サブネットの<code>networkUser</code>権限を付与し忘れないよう設計時にチェックリスト化しておくことが重要です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/iam/docs/job-functions/networking">IAM roles for Networking-related job functions</a> / <a href="https://cloud.google.com/vpc/docs/shared-vpc">Shared VPC overview</a> / <a href="https://cloud.google.com/load-balancing/docs/access-control">Roles and permissions for Cloud Load Balancing</a>
                </p>
            </blockquote>
            <h3 id="117-マネージドサービスへの接続計画">1.1.7 マネージドサービスへの接続計画</h3>
            <p>
                VMやGKE以外にも、Cloud
                SQLやBigQueryなどのマネージドサービス(プロデューササービス)へのプライベート接続方式を初期段階で決めておく必要があります。代表的な選択肢は3つあり、それぞれ接続モデルが異なります。
            </p>
            <Diagram id="diag-7" label="図解 7" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">接続モデル</th>
                            <th scope="col">主な用途</th>
                            <th scope="col">設計上の注意点</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Private services access</td>
                            <td>サービスコンシューマVPCとプロデューサVPC間のVPCピアリング</td>
                            <td>Cloud SQL、Memorystore、Filestoreなど</td>
                            <td>
                                ピアリングは非推移的。1つのコンシューマVPCに対し、同一プロデューササービスへの接続は1本のみ。事前にリージョン/サービス種別ごとに最低/24を確保
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Private Service Connect</td>
                            <td>
                                Consumer
                                VPC内にエンドポイント(内部IP)またはLBバックエンドを作成し、サービスアタッチメントに接続
                            </td>
                            <td>Google API、SaaS、社内マイクロサービスの公開</td>
                            <td>
                                複数の消費者VPC・複数組織から同一サービスに接続可能。IPアドレスの制御をコンシューマ側が持てる
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Serverless VPC Access</td>
                            <td>サーバーレス環境とVPCの間にコネクタ(スケール可能なVM群)を配置</td>
                            <td>
                                Cloud Run、Cloud Functions、App Engine
                                standardからVPC内部リソースへのアクセス
                            </td>
                            <td>
                                コネクタは/28程度の専用サブネットが必要。スループットはマシンタイプとインスタンス数に依存
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                設計判断のポイントは「<strong>誰が誰にサービスを公開するか</strong>」です。単一VPCからGoogleのマネージドサービスに接続するだけならPrivate
                services
                accessで十分ですが、複数の消費者VPC(異なる組織を含む)から同じサービスにアクセスさせたい場合や、VPCピアリングの非推移性を回避したい場合はPrivate
                Service
                Connectがより柔軟です。サーバーレスワークロードがVPC内部のリソース(内部LB、Compute
                Engine VM、Memorystoreなど)にアクセスする必要がある場合は、Serverless VPC
                Accessコネクタが前提になります。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/private-services-access">Private services access</a> / <a href="https://cloud.google.com/vpc/docs/private-service-connect">Private Service Connect overview</a> / <a href="https://cloud.google.com/vpc/docs/serverless-vpc-access">Serverless VPC Access overview</a>
                </p>
            </blockquote>
            <h3 id="118-割り当てquotaと上限の計画">1.1.8 割り当て(Quota)と上限の計画</h3>
            <p>
                Google
                Cloudのネットワークリソースには、プロジェクト単位・VPCネットワーク単位・ピアリンググループ単位などさまざまな粒度でQuota(割り当て)とLimit(上限)が存在します。設計段階でこれらを確認しておかないと、実装フェーズやスケール時に予期せぬ<code>QUOTA_EXCEEDED</code>エラーに直面します。
            </p>
            <p><strong>代表的なQuota/Limitの例</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">項目</th>
                            <th scope="col">既定の目安</th>
                            <th scope="col">補足</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>VPCネットワークあたりのサブネット数</td>
                            <td>プロジェクト/ネットワークごとに上限あり</td>
                            <td>Auto modeネットワークはリージョンごとに自動生成</td>
                        </tr>
                        <tr className="even">
                            <td>VPCネットワークあたりの静的ルート数</td>
                            <td>上限あり(引き上げ申請可能な項目とそうでない項目がある)</td>
                            <td>ハイブリッド接続の学習ルートも消費する</td>
                        </tr>
                        <tr className="odd">
                            <td>VPC Peeringの接続数</td>
                            <td>1ネットワークあたり既定で上限あり</td>
                            <td>ピアリンググループ単位でサブネット数・ルート数のQuotaも別途存在</td>
                        </tr>
                        <tr className="even">
                            <td>Cloud Routerのリージョンあたり数、BGPピア数</td>
                            <td>VPCネットワーク+リージョンの組み合わせごとに上限</td>
                            <td>NCCのRouter applianceスポークにも同じ上限が適用</td>
                        </tr>
                        <tr className="odd">
                            <td>Shared VPCのサービスプロジェクト数</td>
                            <td>ホストプロジェクトごとに設定可能なQuota</td>
                            <td>プロジェクトレベルの設定値</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>設計段階での実務上の推奨は次の3点です。</p>
            <ol type="1">
                <li>
                    <strong>将来の成長率を見込んでQuotaを事前申請する</strong>:特にCloud Router
                    BGPピア数やVPC
                    Peering数は、マルチリージョン展開や新規事業部門の追加を見越して早めに引き上げ申請を行う。
                </li>
                <li>
                    <strong>ルートの集約(サマライズ)を設計に組み込む</strong>:例えば<code>10.10.0.0/24</code>〜<code>10.10.3.0/24</code>の4つのサブネットは<code>10.10.0.0/22</code>として広告することで、学習ルート数のQuota消費を抑えられる。
                </li>
                <li>
                    <strong>ピアリンググループの「実効上限(effective limit)」を理解する</strong>:VPC
                    Peeringの各種Quotaは、自ネットワークだけでなく直接ピアリングしている全ネットワークの設定値に依存して実効上限が変動する。ピア追加/削除のたびにこの実効上限が変わることを設計時に把握しておく。
                </li>
            </ol>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/quota">Quotas and limits (VPC)</a> / <a href="https://cloud.google.com/network-connectivity/quotas">Quotas and limits (Network Connectivity)</a>
                </p>
            </blockquote>
            <hr />
            <h2 id="12-vpcネットワークの設計">1.2 VPCネットワークの設計</h2>
            <p>
                タスク1.2は「VPCそのものの構造」を決める領域です。VPCの数・種類、ネットワーク同士のつなぎ方、IPアドレス計画、MTU、そしてサードパーティアプライアンスの挿入方法を扱います。
            </p>
            <h3 id="121-vpcの種類と数の選択">1.2.1 VPCの種類と数の選択</h3>
            <p>
                Google
                CloudのVPCはグローバルリソースであり、AWSのようにリージョンごとに分割されていません。この特性を踏まえたうえで、まず「Standalone(単独)VPC」か「Shared
                VPC」かを選び、次に「VPCをいくつ作るか」を決めます。
            </p>
            <Diagram id="diag-8" label="図解 8" />
            <p><strong>判断の目安</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">観点</th>
                            <th scope="col">Standalone VPC</th>
                            <th scope="col">Shared VPC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>適した組織形態</td>
                            <td>少人数チーム、プロジェクトごとに完全独立した環境が必要な場合</td>
                            <td>
                                複数チーム/複数プロジェクトが共通のネットワーク・IPアドレス空間を使う中〜大規模組織
                            </td>
                        </tr>
                        <tr className="even">
                            <td>権限管理</td>
                            <td>プロジェクトオーナーがネットワークも管理</td>
                            <td>
                                ネットワークチームが集中管理し、アプリチームはインスタンス管理のみに専念できる(責任分界)
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>IPアドレス設計</td>
                            <td>プロジェクトごとに個別設計、重複しやすい</td>
                            <td>一元設計のため重複を防ぎやすい</td>
                        </tr>
                        <tr className="even">
                            <td>Peering/Interconnectの管理コスト</td>
                            <td>プロジェクト数分の接続を個別に管理</td>
                            <td>1つのホストプロジェクトに接続を集約できる</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                VPCの「数」については、環境分離(Dev/Staging/Prod)やコンプライアンス境界(PCI
                DSSスコープなど)の要件に応じて複数VPCに分割するケースが一般的です。ただし、VPCを分割しすぎると1.2.2で説明する接続トポロジが複雑化するため、<strong>「本当に独立したネットワーク境界が必要か」「ファイアウォールルールやタグによる論理分離で十分ではないか</strong>」を都度検討することが推奨されます。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/vpc">VPC networks</a> / <a href="https://cloud.google.com/vpc/docs/shared-vpc">Shared VPC overview</a>
                </p>
            </blockquote>
            <h3 id="122-ネットワーク間接続方式の決定">1.2.2 ネットワーク間接続方式の決定</h3>
            <p>
                複数のVPCを接続する方式には、主に<strong>VPC Network Peering</strong>、<strong>Network Connectivity Center(NCC)</strong>、<strong>Private Service Connect(PSC</strong>)の3つがあります。試験ではネットワーク数やトポロジ要件から適切な方式を選ぶ問題が出題されます。
            </p>
            <Diagram id="diag-9" label="図解 9" />
            <p><strong>3方式の比較</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">接続の性質</th>
                            <th scope="col">推移性</th>
                            <th scope="col">スケール</th>
                            <th scope="col">典型ユースケース</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>VPC Network Peering</td>
                            <td>1対1のフルメッシュ的接続、内部IPで直接到達</td>
                            <td>非推移的(AとBが繋がりBとCが繋がっていてもAとCは繋がらない)</td>
                            <td>ピアリング数が増えると管理がO(n²)的に複雑化</td>
                            <td>少数VPC間の高帯域・低レイテンシ通信、SaaS提供</td>
                        </tr>
                        <tr className="even">
                            <td>Network Connectivity Center</td>
                            <td>ハブ&amp;スポークの集中管理モデル</td>
                            <td>ハブが経路をスポーク間で中継(トポロジ次第で推移的)</td>
                            <td>数十〜数百のVPC/オンプレサイトを一元管理できる</td>
                            <td>大規模なマルチVPC/ハイブリッド環境、Cloud WAN型アーキテクチャ</td>
                        </tr>
                        <tr className="odd">
                            <td>Private Service Connect</td>
                            <td>サービス単位のPublisher-Consumerモデル</td>
                            <td>スポーク/VPC全体ではなく個々のサービス単位</td>
                            <td>多数の消費者から少数の公開サービスへの接続に強い</td>
                            <td>マネージドサービス公開、SaaS、社内プラットフォームサービス</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                NCCのプリセットトポロジには主に<strong>メッシュ</strong>と<strong>スター</strong>があります。メッシュはデフォルトのトポロジで、ハブに参加した全スポークが単一のスポークグループに属し、相互に経路をやり取りします。スタートポロジは「センター」グループと「エッジ」グループに分かれ、エッジ同士は直接通信できず必ずセンターを経由する設計です。この性質は、ハブ&amp;スポーク型の中央集権的なセキュリティ検査(すべてのスポーク間トラフィックを中央のファイアウォールVPCに強制的に通す)を実現したい場合に有効です。
            </p>
            <p><strong>Hub-and-Spokeを自前で構築する3つのアプローチ</strong></p>
            <p>
                Google
                Cloudのアーキテクチャセンターでは、ハブ&amp;スポーク型トポロジを実現する3つの選択肢が比較されています。
            </p>
            <Diagram id="diag-10" label="図解 10" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">スポーク間到達性</th>
                            <th scope="col">推移的ルート共有</th>
                            <th scope="col">適した規模</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>NCC(VPCスポーク)</td>
                            <td>スタート/メッシュで選択可</td>
                            <td>
                                Private Service Connect/一部のPrivate services accessルートが推移的
                            </td>
                            <td>大規模・将来の拡張を見込む環境</td>
                        </tr>
                        <tr className="even">
                            <td>VPC Network Peering</td>
                            <td>スポーク間直接通信不可（非推移的）。ハブVPC内にNVA/NGFWを配置して中継する場合のみ通信可能</td>
                            <td>
                                ピアリング自体は完全非推移的
                            </td>
                            <td>中規模、明確なセグメンテーションを行いたい環境</td>
                        </tr>
                        <tr className="odd">
                            <td>Cloud VPN(スポーク間HA VPN)</td>
                            <td>HA VPNトンネル経由</td>
                            <td>VPN区間はゲートウェイ間のスループット上限あり</td>
                            <td>ルート非推移な制約を回避したいが帯域要件がそこまで高くない場合</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/architecture/deploy-hub-spoke-vpc-network-topology">Hub-and-spoke network architecture</a> / <a href="https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/vpc-spokes-overview">VPC spokes overview</a> / <a href="https://cloud.google.com/vpc/docs/vpc-peering">VPC Network Peering</a>
                </p>
            </blockquote>
            <h3 id="123-ipアドレス管理ipam戦略">1.2.3 IPアドレス管理(IPAM)戦略</h3>
            <p>
                IPAM戦略はVPC設計の中でも特に試験で重視される領域です。以下の要素を組み合わせて全体設計を行います。
            </p>
            <Diagram id="diag-11" label="図解 11" />
            <p><strong>サブネットとセカンダリレンジ</strong></p>
            <p>
                VPCネイティブなIPアドレス設計の基本単位はサブネットです。1つのサブネットは1つのプライマリIPv4レンジ(VMの主IP用)と、最大170個までのセカンダリレンジ(GKEのPod/Serviceやエイリアスセカンダリレンジ用)を持てます。VPCネットワーク内では、プライマリ・セカンダリを問わずすべてのIPv4レンジが一意である必要があります(ピアリングやInterconnect/VPNで接続された範囲でも同様)。
            </p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">レンジ種別</th>
                            <th scope="col">用途</th>
                            <th scope="col">設計上の注意</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>プライマリレンジ</td>
                            <td>VMのプライマリ内部IP、内部LBの転送規則など</td>
                            <td>サブネットごとに1つのみ、後から拡張(縮小は不可)は可能</td>
                        </tr>
                        <tr className="even">
                            <td>セカンダリレンジ</td>
                            <td>GKEのPod/Serviceレンジ、VMのエイリアスIPレンジ</td>
                            <td>
                                サブネットあたり最大170個、事前に十分な広さを確保(特にPodレンジは拡張しにくい)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>IPv6対応</strong></p>
            <p>
                VPCネットワークはIPv4のみ・デュアルスタック(IPv4+IPv6)・IPv6シングルスタックのサブネットを混在させられます。IPv6を計画する際は、外部向け(パブリックにルーティング可能なアドレス)か内部向け(ULA相当)かを選び、既存のIPv4ベースのファイアウォール/ルーティング設計をどう拡張するかを事前に決める必要があります。
            </p>
            <p><strong>BYOIP(Bring Your Own IP)</strong></p>
            <p>
                自社が保有するパブリックIPv4/IPv6アドレスブロックをGoogle
                Cloudに持ち込み、外部IPとして利用する仕組みです。既存のオンプレミス資産のIPレピュテーションを維持したい場合や、大規模な移行でIPアドレスを変更したくない場合に選択します。
            </p>
            <p><strong>PUPI(Privately Used Public IP)</strong></p>
            <p>
                パブリックには到達可能だが、Google
                Cloudが所有していないIPv4アドレス空間を、VPC内部で「プライベートアドレス」として利用する仕組みです。RFC
                1918空間(10.0.0.0/8等)が枯渇しやすい大規模なGKE環境などで、Podレンジに広大なアドレス空間を確保する目的で使われます。
            </p>
            <Diagram id="diag-12" label="図解 12" />
            <p>
                PUPIを使う場合の注意点は、選んだレンジがインターネット上で実際に到達可能であってはならず、かつGoogleが所有するアドレスとも重複してはならないという点です。また、Pod間の直接通信が必要な場合、プロデューサ側のPod
                IPをノードIPの背後にSNATする設定が必要になります。
            </p>
            <p><strong>Private NAT</strong></p>
            <p>
                重複したIPアドレス空間を持つ複数のネットワーク同士を接続する必要がある場合(買収・合併時など)や、非RFC1918のレンジ(GKEのPodがClass
                Eなどを使う場合)をそのまま外部/オンプレミスに流せない場合に、Private
                NATでプライベートto
                プライベートの変換を行います。NCCのハブに接続されたスポーク同士や、Shared
                VPCとハイブリッドスポークの間でも利用できます。
            </p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">ユースケース</th>
                            <th scope="col">説明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>VPCスポーク間の重複IP解決</td>
                            <td>
                                NCCで接続された複数VPCが重複するIPレンジを持つ場合、Private
                                NATで変換して通信を成立させる
                            </td>
                        </tr>
                        <tr className="even">
                            <td>非RFC1918レンジのオンプレミス接続</td>
                            <td>
                                GKE/Cloud RunがClass
                                E等の非標準レンジを使う場合、オンプレミスのファイアウォールが受け入れ可能なレンジに変換する
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>M&amp;A後のネットワーク統合</td>
                            <td>
                                合併した2社が同じ10.0.0.0/8を使っていた場合など、恒久的なIP再設計をせずに接続を成立させる
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>IPAM自動化</strong></p>
            <p>
                大規模組織では手作業でのIPアドレス管理台帳がボトルネックになります。Google
                CloudのInternal Range API(Network
                Connectivity製品群の一部)を使うと、組織全体のIP空間を階層的に予約・払い出しでき、サブネット作成時の重複チェックを自動化できます。IaC(TerraformなどのInfrastructure
                as
                Code)と組み合わせることで、レンジ枯渇や重複を防ぐパイプラインを構築するのがベストプラクティスです。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/subnets">Subnets</a> / <a href="https://cloud.google.com/vpc/docs/alias-ip">Alias IP ranges</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/configuring-privately-used-public-ips-for-gke">Configuring privately used public IPs for GKE</a> / <a href="https://cloud.google.com/nat/docs/private-nat">Private NAT</a> / <a href="https://cloud.google.com/nat/docs/about-private-nat-for-ncc">Private NAT for Network Connectivity Center spokes</a>
                </p>
            </blockquote>
            <h3 id="124-グローバルリージョナルネットワーク環境の計画">
                1.2.4 グローバル/リージョナルネットワーク環境の計画
            </h3>
            <p>
                Cloud
                RouterのBGPセッションが学習したルートを、VPCネットワーク内のどの範囲まで有効にするかを決める設定が「動的ルーティングモード」です。VPCネットワークごとに<strong>グローバル</strong>または<strong>リージョナル</strong>のいずれかを選びます。
            </p>
            <Diagram id="diag-13" label="図解 13" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">モード</th>
                            <th scope="col">挙動</th>
                            <th scope="col">適した要件</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>リージョナル</td>
                            <td>
                                オンプレミスとの経路交換が、Cloud
                                Routerが存在するリージョンに限定される
                            </td>
                            <td>
                                リージョンごとに独立したハイブリッド接続を管理したい、意図しないリージョン越えトラフィックを避けたい
                            </td>
                        </tr>
                        <tr className="even">
                            <td>グローバル</td>
                            <td>
                                1つのCloud
                                Router(1リージョンに存在)が学習した経路を全リージョンのVPCサブネットに適用し、逆にすべてのサブネットの経路をオンプレミスに広告
                            </td>
                            <td>
                                マルチリージョンでの高可用性接続、単一のInterconnect/VPNを複数リージョンのバックアップ経路として使いたい場合
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                グローバル動的ルーティングモードは、例えばCross-Cloud
                Interconnectで99.99%の単一リージョンSLAを構成する場合や、あるリージョンのInterconnectが停止した際に別リージョン経由でオンプレミスへの到達性を維持したい場合の前提条件になります。一方で、意図せずグローバルモードにしてしまうと、あるリージョンのCloud
                Routerで学習した経路が全リージョンに伝播し、想定外の経路でトラフィックが流れる(コストやレイテンシに影響する)リスクもあるため、要件に応じて明示的に選択することが重要です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-connectivity/docs/router">Cloud Router overview</a> / <a href="https://jayendrapatil.com/tag/dedicated-interconnect-vs-partner-interconnect/">Dedicated Interconnect vs Partner Interconnect解説記事</a>
                </p>
            </blockquote>
            <h3 id="125-mtuサイジング">1.2.5 MTUサイジング</h3>
            <p>
                MTU(Maximum Transmission
                Unit)は、VPCネットワークを流れる1パケットの最大サイズです。デフォルトは1460バイトで、1300〜8896バイトの範囲で変更できます。
            </p>
            <Diagram id="diag-14" label="図解 14" />
            <p><strong>設計上の重要ポイント</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">項目</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>VPCネットワークのMTU</td>
                            <td>1300〜8896バイトの間で自由に設定可能(既定1460)</td>
                        </tr>
                        <tr className="even">
                            <td>VLANアタッチメント(Cloud Interconnect)</td>
                            <td>
                                1440・1460・1500・8896バイトから選択。8896(ジャンボフレーム)は暗号化なしのIPv4/IPv6アタッチメントのみ対応
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Cloud VPN(HA VPN/Classic VPN)</td>
                            <td>
                                ペイロードMTUは既定で1460バイト。IPsec/ESPのオーバーヘッドがあるため、VPC側のMTUをそのまま使うとフラグメンテーションが発生し得る
                            </td>
                        </tr>
                        <tr className="even">
                            <td>推奨設定</td>
                            <td>
                                同一VPCに接続するすべてのVLANアタッチメントで同じMTU値を使う。VPCネットワーク自体のMTUもそれに合わせる
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>TCPとの関係</td>
                            <td>
                                TCPはMSS(Maximum Segment
                                Size)をハンドシェイク時に自動調整するため、多少のMTU差異は吸収されるが、非TCPプロトコル(UDPやICMPなど)はPMTUD(Path
                                MTU Discovery)に依存するため注意が必要
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                MTUを変更する際は稼働中のVMがあると通信断を招くため、変更前にVMを停止してから実施することが推奨されます。ジャンボフレーム(8896バイト)は大容量データ転送(HPC、機械学習の分散トレーニング、バックアップ等)でスループットを最大化したい場合に有効ですが、経路上のすべての区間(VM、VPCネットワーク、Interconnect
                VLANアタッチメント、オンプレミスルーター)が同じMTUをサポートしていないとパケットロスやパフォーマンス低下を招くため、エンドツーエンドでの整合性確認が設計の要になります。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/mtu">Maximum transmission unit</a> / <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/mtu-considerations">MTU considerations (Cloud VPN)</a> / <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/dedicated-overview">Dedicated Interconnect overview</a>
                </p>
            </blockquote>
            <h3 id="126-サードパーティアプライアンスの挿入">
                1.2.6 サードパーティアプライアンスの挿入
            </h3>
            <p>
                次世代ファイアウォールIDS/IPSなど、サードパーティのネットワーク仮想アプライアンス(NVA)をトラフィック経路に挿入したい場合、Google
                Cloudでは<strong>カスタムルート</strong>と<strong>内部パススルーNetwork Load Balancerのネクストホップ機能</strong>を組み合わせて実現します。
            </p>
            <Diagram id="diag-15" label="図解 15" />
            <p><strong>2つのルーティング手法</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">手法</th>
                            <th scope="col">判定基準</th>
                            <th scope="col">主な用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>静的ルート(スタティックルート) + ILBネクストホップ</td>
                            <td>宛先IPアドレスのみで経路を決定</td>
                            <td>
                                シンプルなゲートウェイ挿入(全トラフィックをNVA経由でインターネットに出す等)
                            </td>
                        </tr>
                        <tr className="even">
                            <td>ポリシーベースルート(Policy-based routes)</td>
                            <td>
                                宛先IPに加え、プロトコル・送信元IPアドレス・ネットワークタグでも経路を決定。サブネットルートより先に評価される
                            </td>
                            <td>
                                特定のプロトコル/送信元のみをNVAで検査したい、細粒度なトラフィックステアリングが必要な場合
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                いずれの手法でも、ネクストホップに指定できるのは<strong>内部パススルーNetwork Load Balancer</strong>のみで、そのバックエンドVMはIP
                Forwardingを有効化しておく必要があります。これにより、NVA自体をスケールアウト可能な形で冗長化しつつ、既存のVMからは単一の内部IPアドレス(転送規則のIP)に向けてトラフィックを送るだけで、実際にはロードバランスされた複数のアプライアンスVMのいずれかで処理される、というアーキテクチャが実現できます。
            </p>
            <p><strong>HA構成のポイント</strong></p>
            <ul>
                <li>
                    NVAをマルチNIC(複数ネットワークインターフェース)構成にし、インスペクション対象VPCとアップリンクVPCを分離する設計が一般的です(詳細はSection
                    6のセキュリティ設計でも扱われます)。
                </li>
                <li>
                    内部LBのヘルスチェックにより、障害を起こしたNVAインスタンスは自動的にトラフィックの割り当てから除外されます。
                </li>
                <li>
                    ポリシーベースルートはサブネットルート・静的ルート・動的ルートより先に評価されるため、意図せず全トラフィックがNVA検査対象になっていないか設計レビュー時に確認する必要があります。
                </li>
            </ul>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/policy-based-routes">Policy-based routes</a> / <a href="https://cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview">Internal passthrough Network Load Balancers as next hops</a>
                </p>
            </blockquote>
            <hr />
            <h2 id="13-耐障害性高性能なハイブリッドマルチクラウドネットワークの設計">
                1.3 耐障害性・高性能なハイブリッド/マルチクラウドネットワークの設計
            </h2>
            <p>
                タスク1.3はオンプレミス・他クラウドとの接続設計を扱う、Section
                1の中で最もボリュームのある領域です。接続手段の選択、可用性設計、IPアドレス/DNS設計、暗号化オプションまで幅広くカバーします。
            </p>
            <h3 id="131-ハイブリッド接続の設計">1.3.1 ハイブリッド接続の設計</h3>
            <p>
                オンプレミスとGoogle
                Cloudを接続する手段は、帯域・レイテンシ・コスト・セキュリティ要件に応じて複数用意されています。
            </p>
            <Diagram id="diag-16" label="図解 16" />
            <p><strong>主要接続方式の比較</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">帯域幅の目安</th>
                            <th scope="col">SLA(冗長構成時)</th>
                            <th scope="col">特徴</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Dedicated Interconnect</td>
                            <td>10Gbpsまたは100Gbpsのポート単位、複数接続で最大200Gbps</td>
                            <td>99.99%(2メトロ×各2接続の4接続構成)</td>
                            <td>Googleとの物理的な直接接続。コロケーション施設への設置が必要</td>
                        </tr>
                        <tr className="even">
                            <td>Partner Interconnect</td>
                            <td>50Mbps〜50Gbps(サービスプロバイダのプランに依存)</td>
                            <td>99.99%(要件を満たす冗長構成時)</td>
                            <td>
                                コロケーション施設への物理アクセスがない拠点向け。レイヤー2/レイヤー3タイプがある
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Cloud VPN(HA VPN)</td>
                            <td>トンネルあたり最大3Gbps程度(複数トンネルでスケール)</td>
                            <td>99.99%(2インターフェースの標準構成)</td>
                            <td>
                                インターネット経由のIPsec、迅速に構築可能、動的ルーティング(BGP)必須
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Classic VPN</td>
                            <td>トンネルあたり同程度</td>
                            <td>99.9%</td>
                            <td>
                                単一インターフェース、静的ルーティング(ポリシーベース)も選択可、レガシー用途
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>SD-WANアプライアンス</td>
                            <td>アプライアンス次第</td>
                            <td>アプライアンスの冗長構成に依存</td>
                            <td>
                                複数拠点のトラフィック管理をオーバーレイで統合、InterconnectやVPNの上位レイヤーとして機能
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                ブランチオフィスなど多数の拠点を持つ組織では、各拠点にSD-WANアプライアンスを配置し、それらがCloud
                VPNまたはPartner Interconnect経由でGoogle
                Cloudに接続する構成が一般的です。この場合、NCCのRouter
                Applianceスポーク機能を使うと、SD-WANアプライアンスをスポークとしてハブに登録し、経路管理を一元化できます。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview">Cloud Interconnect overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/partner-overview">Partner Interconnect overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview">Cloud VPN overview</a>
                </p>
            </blockquote>
            <h3 id="132-マルチクラウド接続の設計">1.3.2 マルチクラウド接続の設計</h3>
            <p>
                複数のパブリッククラウドを併用するマルチクラウド構成では、<strong>Cloud VPN</strong>または<strong>Cross-Cloud Interconnect</strong>を使います。
            </p>
            <Diagram id="diag-17" label="図解 17" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">接続の性質</th>
                            <th scope="col">適した要件</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Cloud VPN(クラウド間HA VPN)</td>
                            <td>
                                インターネット経由のIPsecトンネル。双方のクラウドでVPNゲートウェイを構成
                            </td>
                            <td>迅速な立ち上げ、中規模の帯域要件、PoCや小規模ワークロード連携</td>
                        </tr>
                        <tr className="even">
                            <td>Cross-Cloud Interconnect</td>
                            <td>
                                Googleが他クラウドプロバイダとの間に専用の物理接続を用意する高帯域サービス
                            </td>
                            <td>
                                大規模なデータ連携、低レイテンシが必須の分散処理、恒常的なマルチクラウドワークロード
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Cross-Cloud
                Interconnectは10Gbpsまたは100Gbpsの接続を選択でき、AWS・Azure・OCI・Alibaba
                Cloudなど主要クラウドプロバイダに対応しています。単一リージョン内で99.99%のSLAを実現する「Single-region
                topology」も提供されており、これは2つのCloud
                Routerを同一リージョン内の異なるエッジ可用性ドメインに接続するVLANアタッチメントで構成します。マルチクラウドを前提としたアーキテクチャでは、Cross-Cloud
                Interconnectを使うことで、インターネットを経由せずクラウド間トラフィックを完結させられる点が大きな利点です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/cci-overview">Cross-Cloud Interconnect overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/vpn/tutorials/create-ha-vpn-connections-google-cloud-aws">Create HA VPN connections between Google Cloud and AWS</a>
                </p>
            </blockquote>
            <h3 id="133-direct-peeringとverified-peering-providerの使い分け">
                1.3.3 Direct PeeringとVerified Peering Providerの使い分け
            </h3>
            <p>
                Direct PeeringとVerified/Carrier Peeringは、Google WorkspaceやパブリックのGoogle
                Cloudサービス(パブリックIPで公開されたリソース)に到達するための接続方式であり、Cloud
                Interconnectとは目的が異なります。
            </p>
            <Diagram id="diag-18" label="図解 18" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">接続の主体</th>
                            <th scope="col">SLA</th>
                            <th scope="col">Googleの推奨度</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Direct Peering</td>
                            <td>自社ネットワークとGoogleのエッジで直接ピアリング(PNI)</td>
                            <td>なし</td>
                            <td>Verified Peering Providerが利用可能な場合はそちらを推奨</td>
                        </tr>
                        <tr className="even">
                            <td>Carrier Peering</td>
                            <td>
                                サービスプロバイダ経由でGoogleとピアリング。主にGoogle Workspace向け
                            </td>
                            <td>プロバイダ次第</td>
                            <td>
                                Cloud Interconnect(Dedicated/Partner)の方が推奨されるケースが多い
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Verified Peering Provider</td>
                            <td>認定ISP経由でGoogleの全パブリックリソースに到達</td>
                            <td>プロバイダのSLAに準拠</td>
                            <td>Direct Peeringのシンプルな代替として推奨</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                いずれの方式もVPCネットワーク内にカスタムルートを生成しません。つまりDirect
                Peering/Carrier
                Peering経由のトラフィックは、VPC側のデフォルトルート(インターネットゲートウェイ向け)を経由して届く形になります。<strong>VPC内部への専用線接続</strong>(プライベートIPでのアクセス)が必要な場合は、Direct
                PeeringではなくCloud
                Interconnect(Dedicated/Partner)を選択するのが正しい設計判断です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-connectivity/docs/how-to/choose-product">Choosing a Network Connectivity product</a> / <a href="https://cloud.google.com/network-connectivity/docs/direct-peering">Direct Peering overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/verified-peering-provider">Verified Peering Provider overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/carrier-peering">Carrier Peering overview</a>
                </p>
            </blockquote>
            <h3 id="134-複数リージョンにおけるhadr接続戦略">
                1.3.4 複数リージョンにおけるHA/DR接続戦略
            </h3>
            <p>
                マルチリージョンでのハイブリッド接続の可用性設計は、<strong>動的ルーティングモード(グローバル/リージョナル</strong>)と<strong>接続の冗長構成</strong>の組み合わせで決まります。
            </p>
            <Diagram id="diag-19" label="図解 19" />
            <p>99.99%の可用性を実現するための代表的な構成要件は次の通りです。</p>
            <ul>
                <li>
                    <strong>Dedicated/Partner Interconnectの99.99%構成</strong>:
                    2つの異なるメトロエリアに、それぞれ2つの異なるエッジ可用性ドメインへの接続を作成する(合計4接続)。近年は単一メトロ内でも2つの異なるエッジ可用性ドメインに接続することで99.99%を実現する「Single-region」トポロジも利用可能になっています。
                </li>
                <li>
                    <strong>HA VPNの標準構成</strong>:
                    2つのインターフェース(2つの外部IP)を持つゲートウェイを、オンプレミス側も2つのピアVPNゲートウェイで受けることで99.99%のSLAを達成します。
                </li>
                <li>
                    <strong>グローバル動的ルーティングモード</strong>:
                    あるリージョンのInterconnect/VPN接続が全断した場合に、別リージョンの接続を経由してオンプレミスへの到達性を維持するには、VPCのルーティングモードをグローバルにしておく必要があります。
                </li>
            </ul>
            <p>
                <strong>リージョン障害を跨いだDR戦略</strong>では、オンプレミスとの接続点を意図的に複数リージョンに分散させ、Cloud
                Routerの経路優先度(MED値)を使って通常時は最寄りのリージョンを優先させつつ、障害時に自動的に別リージョンへフェイルオーバーする設計が定石です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-connectivity/docs/interconnect/tutorials/dedicated-creating-9999-availability">Establish 99.99% availability for Dedicated Interconnect</a> / <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/cci-overview">Cross-Cloud Interconnect overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/topologies">HA VPN topologies</a>
                </p>
            </blockquote>
            <h3 id="135-オンプレミスから複数vpcへのアクセス">
                1.3.5 オンプレミスから複数VPCへのアクセス
            </h3>
            <p>
                オンプレミスから複数のGoogle Cloud
                VPCにアクセスする必要がある場合、以下の3パターンから選択します。
            </p>
            <Diagram id="diag-20" label="図解 20" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">パターン</th>
                            <th scope="col">概要</th>
                            <th scope="col">適した状況</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Shared VPC</td>
                            <td>
                                複数チームのリソースを最初から単一VPC(ホストプロジェクト)に集約し、オンプレミス接続もそのVPCに対して1本構成する
                            </td>
                            <td>組織全体でネットワークを統合管理する方針が既に取れている場合</td>
                        </tr>
                        <tr className="even">
                            <td>Multi-VPCピアリング(ハブ&amp;スポーク)</td>
                            <td>
                                オンプレミス接続を持つ「ルーティングVPC」を中心に、各ワークロードVPCをピアリングで接続する
                            </td>
                            <td>
                                既存の複数VPCを維持しつつ、オンプレミス接続だけを一元化したい場合
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>NCCトポロジ(ハイブリッドスポーク+VPCスポーク)</td>
                            <td>
                                オンプレミス接続(Interconnect/VPN)をハイブリッドスポークとしてハブに登録し、各ワークロードVPCもVPCスポークとして同じハブに登録する
                            </td>
                            <td>
                                将来的な拡張(スポーク数の増加、複数オンプレサイト)を見込む大規模環境
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                ハブ&amp;スポーク型でVPC Peeringを使う場合の注意点は、VPC
                Peeringが非推移的であるため、素朴に「オンプレ→ルーティングVPC→ワークロードVPC
                A」という経路を作っても、ワークロードVPC
                Aからワークロードルーティング設定を明示的に行わない限りVPC
                B宛のトラフィックは通らないという点です。NCCはこの非推移性の制約をハブが仲介することで解消し、より少ない運用負荷でスケールできる点が優位性です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/architecture/deploy-hub-spoke-vpc-network-topology">Hub-and-spoke network architecture</a> / <a href="https://medium.com/@adarshpandey022/gcp-network-connectivity-center-embracing-the-hub-and-spoke-topology-b096d9bd775d">GCP Network Connectivity Center解説</a>
                </p>
            </blockquote>
            <h3 id="136-オンプレミスからのgoogleサービスへのプライベートアクセス">
                1.3.6 オンプレミスからのGoogleサービスへのプライベートアクセス
            </h3>
            <p>
                オンプレミスから、Vertex AIやCloud
                Storage、BigQueryといったGoogleの公開APIに<strong>インターネットを経由せず</strong>アクセスしたい場合、以下のいずれかの方式を組み合わせます。
            </p>
            <Diagram id="diag-21" label="図解 21" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">概要</th>
                            <th scope="col">適したケース</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>
                                Private Google Access + 限定公開のGoogle
                                アクセス(restricted.googleapis.com)
                            </td>
                            <td>
                                サブネット単位でPrivate Google
                                Accessを有効化し、オンプレミスからの経路をrestricted
                                VIP(199.36.153.4/30)向けにCloud Router/静的ルートで広告する
                            </td>
                            <td>
                                VPC Service Controls配下のAPIアクセスを含め、既存のGoogle
                                APIエンドポイント設計を流用したい場合
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Private Service Connectエンドポイント</td>
                            <td>
                                VPC内にGoogle
                                API向けのPSCエンドポイント(内部IP)を作成し、オンプレミスからその内部IPへ到達させる
                            </td>
                            <td>
                                独自の内部IPアドレスでルーティング・ファイアウォールをより細かく制御したい場合
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                いずれの方式でも、オンプレミス側のDNS解決を正しく構成することが重要です(<code>*.googleapis.com</code>などのドメインを、restricted
                VIPやPSCエンドポイントのIPに解決させるオーバーライドが必要)。この設計はハイブリッドDNS設計(1.3.9)と密接に関連します。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/private-service-connect">Private Service Connect overview</a> / <a href="https://cloud.google.com/vpc-service-controls/docs/overview">Overview of VPC Service Controls</a>
                </p>
            </blockquote>
            <h3 id="137-pscvpc-peering経由のマネージドサービスアクセス">
                1.3.7 PSC/VPC Peering経由のマネージドサービスアクセス
            </h3>
            <p>
                1.1.7で扱った「マネージドサービスへの接続計画」をハイブリッド/マルチクラウドの文脈で捉え直すと、オンプレミスや他クラウドからマネージドサービス(Cloud
                SQL等)へアクセスする経路設計が課題になります。
            </p>
            <Diagram id="diag-22" label="図解 22" />
            <p>
                Private services access(VPC
                Peering方式)は非推移的であるため、オンプレミスからハイブリッド接続でコンシューマVPCに到達しても、そのままではPeering先のサービスプロデューサVPCまでは到達<strong>できます</strong>(サービスプロデューサとの接続自体はVPC
                Peeringのカスタムルート交換設定次第で、オンプレミス発の経路をエクスポートすることが可能)が、複数VPCを跨ぐ複雑な経路になりがちです。一方、PSCエンドポイントは単なる内部IPとして振る舞うため、オンプレミスからのルーティング設計がシンプルになり、複数の消費者VPCや複数リージョンから同一サービスへ接続する場合に扱いやすくなります。
            </p>
            <p>
                設計判断の目安としては、「単一VPCからの利用が中心で構成をシンプルに保ちたい」場合はPrivate
                services
                access、「複数VPC・複数オンプレサイト・将来的な拡張を見込む」場合はPSCを優先する、という整理が実務上のベストプラクティスです。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/private-services-access">Private services access</a> / <a href="https://cloud.google.com/database-migration/docs/postgres/configure-connectivity-vpc-peering">Configure connectivity using VPC peering (Database Migration Service)</a>
                </p>
            </blockquote>
            <h3 id="138-オンプレミスとクラウド間のipアドレス空間設計">
                1.3.8 オンプレミスとクラウド間のIPアドレス空間設計
            </h3>
            <p>
                ハイブリッド環境全体のIPアドレス設計では、オンプレミスとクラウド双方の既存アドレス空間を俯瞰し、重複を避けることが最優先事項です。
            </p>
            <Diagram id="diag-23" label="図解 23" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">検討項目</th>
                            <th scope="col">設計上の注意</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>内部レンジ(internal ranges)</td>
                            <td>
                                オンプレミスのRFC 1918アドレスとGoogle Cloud側のRFC
                                1918アドレスが重複しないよう、事前に台帳で調整する
                            </td>
                        </tr>
                        <tr className="even">
                            <td>重複の回避</td>
                            <td>
                                買収・合併などで重複が事後的に発覚した場合はPrivate
                                NATで解決可能だが、恒久対応ではなく移行期間の緩和策として位置づけるのが望ましい
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Private NAT</td>
                            <td>
                                非重複の宛先へのみ変換可能。重複したサブネット同士を直接ピアリングすることはできない点に注意
                            </td>
                        </tr>
                        <tr className="even">
                            <td>将来の成長余地</td>
                            <td>
                                クラウド側は水平スケールが容易なため、オンプレミスよりも広めのレンジを確保しておくと、後々の再設計コストを削減できる
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                この設計はIaCによる一元管理(1.2.3のIPAM自動化)と組み合わせることで、オンプレミス・クラウドを横断したアドレス管理台帳として運用するのがベストプラクティスです。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/nat/docs/private-nat">Private NAT</a> / <a href="https://cloud.google.com/blog/products/networking/using-private-nat-for-networks-with-overlapping-ip-spaces">Using private NAT for networks with overlapping IP spaces</a>
                </p>
            </blockquote>
            <h3 id="139-ハイブリッドdnsトポロジの設計">1.3.9 ハイブリッドDNSトポロジの設計</h3>
            <p>
                ハイブリッドDNS設計は、1.1.3で紹介した基本パターンを、複数のVPC・複数のオンプレミスサイトが存在する現実的な組織構造に適用する応用編です。
            </p>
            <Diagram id="diag-24" label="図解 24" />
            <p>
                複数のShared
                VPCが存在する組織では、<strong>オンプレミスとの間でDNSクエリを送受信できるVPCを1つに限定する</strong>のがベストプラクティスです。上図の例では、Prod
                Shared
                VPCがオンプレミスとの唯一のDNS窓口となり、Non-Prod環境はDNSピアリングを使ってProd
                VPC経由でオンプレミスドメインを解決します。
            </p>
            <p><strong>主要コンポーネントの整理</strong></p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">コンポーネント</th>
                            <th scope="col">役割</th>
                            <th scope="col">方向性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>プライベートゾーン</td>
                            <td>
                                Cloud
                                DNSが権威を持つゾーン。関連付けたVPCネットワークからのみ解決可能
                            </td>
                            <td>-</td>
                        </tr>
                        <tr className="even">
                            <td>転送ゾーン(Forwarding zone)</td>
                            <td>
                                特定ドメインの問い合わせを外部のネームサーバー(オンプレミス等)に転送
                            </td>
                            <td>クラウド→オンプレミス(アウトバウンド)</td>
                        </tr>
                        <tr className="odd">
                            <td>インバウンドサーバーポリシー</td>
                            <td>
                                オンプレミスのDNSクライアント/サーバーがCloud
                                DNSに問い合わせできるようにする
                            </td>
                            <td>オンプレミス→クラウド(インバウンド)</td>
                        </tr>
                        <tr className="even">
                            <td>DNSピアリングゾーン</td>
                            <td>
                                あるVPC(コンシューマ)が別VPC(プロデューサ)のプライベートゾーンを解決できるようにする、片方向の関係
                            </td>
                            <td>VPC→VPC</td>
                        </tr>
                        <tr className="odd">
                            <td>クロスプロジェクトバインディング</td>
                            <td>
                                Shared
                                VPCのサービスプロジェクト側で直接DNSゾーンを作成・管理できるようにする仕組み。ホストプロジェクトにプレースホルダVPCを作る必要がなく、any-to-anyの名前解決が可能
                            </td>
                            <td>Shared VPC内</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>設計チェックポイント</strong></p>
            <ol type="1">
                <li>
                    <strong>ドメイン名前空間の分離</strong>: オンプレミスとGoogle
                    Cloudで異なるサブドメイン(<code>corp.example.com</code> /
                    <code>gcp.example.com</code>)を使うsplit-domain設計が転送ルールをシンプルにする。
                </li>
                <li>
                    <strong>ファイアウォールの許可</strong>: オンプレミス側のファイアウォールでCloud
                    DNSからの送信元(<code>35.199.192.0/19</code>)からのクエリを許可する。DNSはUDP/TCPポート53を使用。
                </li>
                <li>
                    <strong>自動生成される<code>.internal</code>ゾーンの扱い</strong>:
                    VMの内部DNS名(<code>projectname.internal</code>など)は自動生成されるが、これをオンプレミスや他プロジェクトから解決させたい場合、DNSピアリングでハブプロジェクトに集約する設計が有効。
                </li>
                <li>
                    <strong>Cloud DNSはフォワーディングをサポートしないパブリックゾーン</strong>:
                    パブリックゾーンは常に権威応答のみを返すため、外部ネームサーバーへの委譲が必要な場合は別途NSレコードでの委譲を設計する。
                </li>
            </ol>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/dns/docs/best-practices">Best practices for Cloud DNS</a> / <a href="https://cloud.google.com/dns/docs/zones/zones-overview">DNS zones overview</a> / <a href="https://cloud.google.com/dns/docs/overview">Cloud DNS overview</a> / <a href="https://cloud.google.com/dns/docs/zones/cross-project-binding">Create a zone with cross-project binding</a>
                </p>
            </blockquote>
            <h3 id="1310-ハイブリッド接続のmtuサイジング">
                1.3.10 ハイブリッド接続のMTUサイジング
            </h3>
            <p>
                1.2.5で解説したMTUの考え方を、ハイブリッド接続(Cloud Interconnect / HA
                VPN)に適用する際の要点を整理します。
            </p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">接続方式</th>
                            <th scope="col">サポートされるMTU</th>
                            <th scope="col">設計上の注意</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Dedicated/Partner Interconnect(VLANアタッチメント)</td>
                            <td>1440・1460・1500・8896バイト</td>
                            <td>
                                同一VPCに接続する全アタッチメントで統一したMTUを使うことを推奨。ジャンボフレーム(8896)は非暗号化のIPv4/IPv6アタッチメントのみ
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Cross-Site Interconnect</td>
                            <td>最大9000バイト</td>
                            <td>サイト間接続の高スループットユースケース向け</td>
                        </tr>
                        <tr className="odd">
                            <td>HA VPN / Classic VPN</td>
                            <td>ペイロードMTUは既定1460バイト(暗号方式やIPv4/IPv6で若干変動)</td>
                            <td>
                                IPsec/ESPカプセル化のオーバーヘッド分、VPCのMTUをそのまま使うとフラグメンテーションが発生し得る
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Google API Client Libraries</td>
                            <td>常に1440バイトのMTUパケットを使用</td>
                            <td>
                                VLANアタッチメントがより大きなMTUに設定されていてもAPIクライアント通信はこの値が使われる点に注意
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                HA VPNをCloud Interconnectの上に重ねる「HA VPN over Cloud
                Interconnect」構成(1.3.11で詳述)では、Interconnect区間のMTUとVPNのペイロードMTUの両方を考慮した設計が必要になり、特にIPsecのオーバーヘッド分(概ね60〜100バイト程度)を差し引いた実効MTUを事前に計算しておくことがベストプラクティスです。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/vpc/docs/mtu">Maximum transmission unit</a> / <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/mtu-considerations">MTU considerations (Cloud VPN)</a> / <a href="https://cloud.google.com/network-connectivity/docs/interconnect/how-to/partner/modifying-vlans">Modify VLAN attachments</a>
                </p>
            </blockquote>
            <h3 id="1311-interconnect暗号化オプションmacsec--ha-vpn-over-interconnect">
                1.3.11 Interconnect暗号化オプション(MACsec / HA VPN over Interconnect)
            </h3>
            <p>
                Cloud
                Interconnectは既定では暗号化されていません(Googleネットワーク内は物理的に保護されていますが、コロケーション施設からGoogleエッジまでの区間は平文です)。規制要件などで暗号化が必須の場合、以下の2つの選択肢があります。
            </p>
            <Diagram id="diag-25" label="図解 25" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">方式</th>
                            <th scope="col">暗号化区間</th>
                            <th scope="col">特徴</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>MACsec for Cloud Interconnect</td>
                            <td>
                                オンプレミスルーターとGoogleのピアリングエッジルーター間(レイヤー2)
                            </td>
                            <td>
                                追加コストなし。10/100/400Gbps回線で利用可(10GbpsはアカウントマネージャーへのContactが必要)。Googleネットワーク内部の暗号化は対象外のため、多層防御としてIPsec/TLSとの併用が推奨される
                            </td>
                        </tr>
                        <tr className="even">
                            <td>HA VPN over Cloud Interconnect</td>
                            <td>VPCネットワークとオンプレミス間(レイヤー3、エンドツーエンド)</td>
                            <td>
                                Interconnectの帯域幅とプライベート経路を使いながら、IPsecによる暗号化を実現。MACsecがカバーしないGoogleネットワーク内部の区間もIPsecでは論理的に暗号化された通信として扱える
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Googleが推奨する多層防御のアプローチは、<strong>レイヤー2でMACsec、レイヤー3でIPsec(HA VPN over
                    Interconnect)、さらにアプリケーション層でTLS</strong>という3層の暗号化を組み合わせる設計です。規制要件がレイヤー3以上の暗号化を求める場合は、MACsec単体では要件を満たさないため、HA
                VPN over Cloud Interconnectを組み合わせる必要がある点に注意してください。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/macsec-overview">MACsec for Cloud Interconnect overview</a> / <a href="https://cloud.google.com/network-connectivity/docs/interconnect/how-to/macsec/set-up-macsec">Set up MACsec</a>
                </p>
            </blockquote>
            <hr />
            <h2 id="14-gke向けの設計">1.4 GKE向けの設計</h2>
            <p>
                タスク1.4は、1.1.5で触れたGKE計画をさらに深掘りし、ノード・コントロールプレーン・IPアドレス・ロードバランシングの設計判断を扱います。
            </p>
            <h3 id="141-パブリックプライベートノードとノードプール">
                1.4.1 パブリック/プライベートノードとノードプール
            </h3>
            <p>
                GKEクラスタのノードに外部IPアドレスを持たせるかどうかは、セキュリティ境界設計の第一歩です。
            </p>
            <Diagram id="diag-26" label="図解 26" />
            <p>
                <strong>設計原則</strong>:
                特別な理由がない限り<strong>プライベートノード</strong>を既定とすべきです。プライベートノードでもServiceをLoadBalancerタイプで公開すれば外部からアクセス可能なため、ノード自体を外部公開する必要性は限定的です。プライベートノードがインターネットへの発信(コンテナイメージのpullなど)を必要とする場合は、Cloud
                NATを組み合わせて設計します。
            </p>
            <p>
                ノードプールは、マシンタイプ・スポット/オンデマンドの別・ゾーン配置・ネットワークタグなどをグループ化する単位であり、後述の1.4.7でネットワーク観点の構成を扱います。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/legacy/network-isolation">Creating a private cluster</a> / <a href="https://cloudwebschool.com/docs/gcp/containers-and-kubernetes/private-gke-clusters/">Private GKE Clusters解説</a>
                </p>
            </blockquote>
            <h3 id="142-パブリックプライベートコントロールプレーンエンドポイント">
                1.4.2 パブリック/プライベートコントロールプレーンエンドポイント
            </h3>
            <p>
                コントロールプレーン(kube-apiserver)へのアクセス経路は、ノードの公開範囲とは独立して設計できます。GKEバージョン1.29以降では、より柔軟な「ネットワーク分離のカスタマイズ」機能が使えます。
            </p>
            <Diagram id="diag-27" label="図解 27" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">アクセスパターン</th>
                            <th scope="col">説明</th>
                            <th scope="col">適したケース</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>パブリックエンドポイント + 認可済みネットワーク</td>
                            <td>
                                外部到達可能だが、許可したCIDRからのみkube-apiserverへの接続を受け付ける
                            </td>
                            <td>
                                運用担当者が様々な場所から<code>kubectl</code>を実行する必要があり、IP制限で十分と判断できる場合
                            </td>
                        </tr>
                        <tr className="even">
                            <td>
                                プライベートエンドポイントのみ(<code>--enable-private-endpoint</code>)
                            </td>
                            <td>コントロールプレーンの外部公開を完全に無効化</td>
                            <td>
                                金融・医療など、コントロールプレーンへの到達経路を完全にプライベートネットワーク内に限定したい場合
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>DNSベースのエンドポイントアクセス(推奨)</td>
                            <td>
                                IPアドレスではなくDNS名でコントロールプレーンにアクセスし、IAMで認可を制御
                            </td>
                            <td>
                                複数VPC/複数プロジェクトからの接続や、IPベースの認可済みネットワーク管理の複雑さを避けたい場合
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>接続経路の設計パターン</strong>(プライベートエンドポイントのみの場合、以下のいずれかで到達させる):
            </p>
            <ul>
                <li>Cloud Build private pools(GCPネイティブCI/CD向け、同一VPC内から到達)</li>
                <li>踏み台(bastion)ホスト経由のSSHトンネル</li>
                <li>
                    Cloud VPN / Cloud InterconnectでオンプレミスからVPCに接続し、そこからアクセス
                </li>
            </ul>
            <p>
                GKE
                1.29以降で導入された「ネットワーク分離のカスタマイズ」機能では、コントロールプレーンの内部エンドポイント用サブネットをデフォルト(プライマリレンジ)から独立して指定できるようになり、Shared
                VPC環境でのIPアドレス設計がより柔軟になっています。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/advanced-private-cluster-config">Customize your network isolation in GKE</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/alias-ips">Create a VPC-native cluster</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/private-service-connect">About Private Service Connect (GKE networking)</a>
                </p>
            </blockquote>
            <h3 id="143-サブネット計画プライマリレンジとセカンダリレンジ">
                1.4.3 サブネット計画:プライマリレンジとセカンダリレンジ
            </h3>
            <p>
                GKEのVPCネイティブクラスタは、1つのサブネットに対して<strong>プライマリレンジ(ノード用</strong>)と<strong>2つのセカンダリレンジ(Pod用・Service用</strong>)を組み合わせて使用します。
            </p>
            <Diagram id="diag-28" label="図解 28" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">レンジ</th>
                            <th scope="col">サイズ設計の考え方</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>プライマリ(ノード)</td>
                            <td>
                                最大ノード数 +
                                オートスケール余裕分を見込んだサイズ。ノードプールの拡張やアップグレード時のサージ(一時的な追加ノード)分も加味する
                            </td>
                        </tr>
                        <tr className="even">
                            <td>セカンダリ(Pod)</td>
                            <td>
                                「最大ノード数 ×
                                ノードあたりの最大Pod数」を上回るサイズが必要。既定では1ノードあたり最大110
                                Pod程度を想定できるため、大規模クラスタでは/24未満のような狭いレンジは避ける(UI上、ノードプールレベルのPodセカンダリレンジは/24以上が必須)
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>セカンダリ(Service)</td>
                            <td>
                                クラスタが公開するServiceの総数を見込んで確保。Podレンジほど急速に消費されないことが多いが、マイクロサービス数が非常に多い環境では余裕を持たせる
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>設計上の重要な制約</strong>:
                Podセカンダリレンジは、後から<strong>拡張</strong>は可能な場合がありますが、実質的にクラスタ作成時の見積もりが不十分だと大規模な再設計(クラスタの再作成)が必要になるケースが多いため、初期設計で「将来のノード数上限」を保守的すぎない範囲で余裕を持って見積もることが最重要ポイントです。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/alias-ips">Create a VPC-native cluster</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/legacy/network-isolation">Creating a private cluster</a>
                </p>
            </blockquote>
            <h3 id="144-gkeのipアドレス計画">1.4.4 GKEのIPアドレス計画</h3>
            <p>
                GKEで利用できるIPアドレスの選択肢は多岐にわたり、IPv4アドレス枯渇への対応策として複数の手法が用意されています。
            </p>
            <Diagram id="diag-29" label="図解 29" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">選択肢</th>
                            <th scope="col">用途</th>
                            <th scope="col">設計上の注意</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>RFC 1918</td>
                            <td>ノード・Pod・Serviceの標準的な選択</td>
                            <td>組織内での重複回避が最優先事項</td>
                        </tr>
                        <tr className="even">
                            <td>非RFC1918(Class E等)</td>
                            <td>RFC1918空間が枯渇した大規模組織でのPodレンジ拡張</td>
                            <td>
                                オンプレミスやNCCで非RFC1918を受け入れられるかを事前確認。受け入れ不可の場合はPrivate
                                NATで変換
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Googleマネージドサービスレンジ</td>
                            <td>
                                コントロールプレーンの内部エンドポイントなど、Google管理下のコンポーネントに割り当てられる
                            </td>
                            <td>
                                ユーザーが直接設計する範囲ではないが、重複しないよう他のレンジ設計時に考慮
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Private Service Connect(PSCベースのクラスタ)</td>
                            <td>
                                コントロールプレーンとノード間の通信をPSC経由にすることで、VPC
                                Peeringを使わずに疎結合な接続を実現
                            </td>
                            <td>
                                1ゾーン/リージョンあたり最大75クラスタ(VPC
                                Peering方式)という上限を回避し、最大1000クラスタまでスケール可能
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>共有IPレンジ(Shared Pod/Serviceレンジ)</td>
                            <td>
                                複数のGKEクラスタで同一のセカンダリレンジを共有し、IPアドレス消費を抑制
                            </td>
                            <td>
                                クラスタごとに専用レンジを割り当てる場合に比べてIP効率が向上するが、クラスタ間のIP管理を慎重に行う必要がある
                            </td>
                        </tr>
                        <tr className="even">
                            <td>PUPI</td>
                            <td>
                                1.2.3で解説したプライベート用途のパブリックIP。GKEのPodレンジで特に有効
                            </td>
                            <td>Pod間の直接通信要件があればSNAT設定が必要</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>IP枯渇対策の優先順位の目安</strong>は、①既存のRFC1918空間内でサブネット設計を見直す、②PSCベースのクラスタでVPC
                Peering起因のクラスタ数上限を回避する、③どうしても不足する場合にPUPIや非RFC1918を検討する、という順序で考えるのが一般的です。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/configuring-privately-used-public-ips-for-gke">Configuring privately used public IPs for GKE</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/private-service-connect">About Private Service Connect (GKE networking)</a>
                </p>
            </blockquote>
            <h3 id="145-ipv6の計画">1.4.5 IPv6の計画</h3>
            <p>
                GKEはIPv4シングルスタックに加え、デュアルスタック(IPv4+IPv6)クラスタをサポートしています。IPv6を計画する際は、サブネットのIPv6対応(1.2.3参照)と合わせて、Pod・ServiceそれぞれにIPv6アドレスを割り当てるかどうかを設計します。将来的なIPv4アドレス枯渇に備え、新規に大規模なGKE基盤を構築する場合はデュアルスタック対応を初期設計に組み込んでおくことで、後からの移行コストを避けられます。IPv6を採用する場合も、外部公開が必要なService(LoadBalancerタイプ)については、Application
                Load BalancerやNetwork Load
                BalancerのIPv6termination対応状況を確認したうえでロードバランサ設計(1.4.6)を行う必要があります。
            </p>
            <h3 id="146-gke向けロードバランシングの設計">1.4.6 GKE向けロードバランシングの設計</h3>
            <p>
                GKEでは、Kubernetesの標準的なIngress/Service/Gateway APIリソースが、Google
                Cloudのロードバランサにマッピングされます。
            </p>
            <Diagram id="diag-30" label="図解 30" />
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">手法</th>
                            <th scope="col">マッピング先</th>
                            <th scope="col">特徴</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>GKE Gatewayコントローラ</td>
                            <td>Application Load Balancer(内部/外部、リージョナル/グローバル)</td>
                            <td>
                                Kubernetes Gateway
                                APIの標準に準拠し、マルチクラスタ・マルチテナントのトラフィック管理に強い。新規構築では第一候補
                            </td>
                        </tr>
                        <tr className="even">
                            <td>GKE Ingressコントローラ</td>
                            <td>外部Application Load Balancer</td>
                            <td>
                                従来からのIngressリソースを使う場合の選択肢。Gatewayへの移行が長期的には推奨される
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>Service(<code>type: LoadBalancer</code>)</td>
                            <td>パススルーNetwork Load Balancer</td>
                            <td>L4レベルでのシンプルな公開、クライアントIP保持が必要な場合</td>
                        </tr>
                        <tr className="even">
                            <td>Network Endpoint Group(NEG)</td>
                            <td>各種ロードバランサのバックエンド</td>
                            <td>
                                Pod IPを直接バックエンドとして登録する「コンテナネイティブ
                                ロードバランシング」を実現し、kube-proxy経由のホップを省略してレイテンシを改善
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                コンテナネイティブロードバランシング(NEGベース)は、GKEでロードバランサを構成する際の事実上の標準です。従来のインスタンスグループベースの構成に比べ、ヘルスチェックがPodレベルで行われるためより正確なトラフィック分散が可能になり、Pod単位のスケールイベントへの追従性も向上します。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/load-balancing/docs/choosing-load-balancer">Choose a load balancer</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/network-tiers">Network Service Tiers for GKE</a>
                </p>
            </blockquote>
            <h3 id="147-ノードプール構成の追加と管理">1.4.7 ノードプール構成の追加と管理</h3>
            <p>ノードプールはネットワーク設計の観点からも複数の考慮点があります。</p>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr className="header">
                            <th scope="col">観点</th>
                            <th scope="col">設計ポイント</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>ネットワークタグ</td>
                            <td>
                                ノードプール単位でネットワークタグを付与し、ファイアウォールルールの適用範囲を制御する(例:特定のノードプールのみ外部との通信を許可する)
                            </td>
                        </tr>
                        <tr className="even">
                            <td>ゾーン配置</td>
                            <td>
                                マルチゾーンのノードプールにすることで、単一ゾーン障害時の可用性を確保する
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>サービスアカウント</td>
                            <td>
                                ノードプール用サービスアカウントはノード操作(ログ送信・イメージ取得)に必要な最小ロールに留め、Pod/ワークロードごとのGCP APIアクセスには Workload Identity Federation for GKE を使用してアクセス権限を最小化する
                            </td>
                        </tr>
                        <tr className="even">
                            <td>Dataplane V2の有効化</td>
                            <td>
                                eBPFベースのデータプレーン(GKE Dataplane
                                V2)を有効にすることで、Ciliumベースのネットワークポリシー実装やより高精度なフローログ・オブザーバビリティが利用可能になる
                            </td>
                        </tr>
                        <tr className="odd">
                            <td>SNAT/IP Masqueradeポリシー</td>
                            <td>
                                Pod発信トラフィックのSNAT対象範囲を制御し、意図しないIPマスカレードによる送信元IP消失を防ぐ
                            </td>
                        </tr>
                        <tr className="even">
                            <td>DNS構成</td>
                            <td>
                                ノードローカルDNSキャッシュ、Cloud
                                DNSベースのクラスタスコープDNS、kube-dnsのいずれを使うかを選択し、大規模クラスタでのDNSクエリ負荷を軽減する
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                ノードプールの追加は、既存クラスタに異なるマシンタイプ/ネットワークタグ/サービスアカウントを持つワーカー群を段階的に追加していく運用を可能にし、例えば「一般ワークロード用ノードプール」と「GPU/機械学習ワークロード専用ノードプール(専用サブネットレンジ・専用ファイアウォールルール)」を分離するといった設計に活用されます。
            </p>
            <blockquote>
                <p>
                    <strong>出典</strong>:{" "}
                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/advanced-private-cluster-config">Customize your network isolation in GKE</a> / <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/configuring-privately-used-public-ips-for-gke">Configuring privately used public IPs for GKE</a>
                </p>
            </blockquote>
            <hr />
            <h2 id="設計チェックリスト">設計チェックリスト</h2>
            <p>
                Section
                1の内容を、実際の設計レビューで使えるチェックリスト形式にまとめました。試験直前の総復習にも活用できます。
            </p>
            <div className="checklist-card">
                <div className="checklist-header">
                    <span>チェックリスト進捗</span><span className="checklist-counter" id="checklist-counter">0 / 26 完了</span>
                </div>
                <ul className="task-list">
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">外部向けワークロードのネットワークサービス階層(Premium/Standard)を要件に応じて明示的に選択したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">可用性要件をゾーン/リージョン/人為的ミスの3レイヤーに分解し、それぞれの緩和策を設計したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">DNSトポロジで「どちらが権威か」「転送方向」を明確にし、split-domain設計を検討したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">ロードバランサ選定を「トラフィック種別」「内部/外部」「グローバル/リージョナル」の3軸で判断したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">Shared
                                VPCを使う場合、IAMロールをサブネット単位まで最小権限化したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">マネージドサービスへの接続方式(Private services access / PSC /
                                Serverless VPC Access)を用途ごとに整理したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">VPC Peering数、Cloud
                                RouterのBGPピア数などのQuotaを将来の成長を見込んで確認・申請したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">VPC種別(Standalone/Shared)とVPCの数を、環境分離要件と運用コストのバランスで決定したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">マルチVPC接続方式(Peering/NCC/PSC)をスケールと推移性の要件から選定したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">IPAM戦略(サブネット、IPv6、PUPI、Private
                                NAT、BYOIP)をオンプレミスとの重複を避けて設計したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">動的ルーティングモード(グローバル/リージョナル)をマルチリージョン要件に応じて選択したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">MTUをVM・VPC・VLANアタッチメント・VPNの各区間で整合させたか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">サードパーティアプライアンス挿入時、ポリシーベースルートと内部LBネクストホップの組み合わせを検討したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">ハイブリッド接続方式(Interconnect/VPN/SD-WAN)を帯域・SLA・セキュリティ要件で選定したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">マルチクラウド接続でCloud VPNとCross-Cloud
                                Interconnectの使い分けを検討したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">Direct PeeringよりVerified Peering
                                Providerを優先する原則を理解しているか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">99.99%可用性のための冗長構成(4接続構成、2インターフェースHA
                                VPN)を把握しているか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">オンプレミスから複数VPCへのアクセスパターン(Shared VPC/Multi-VPC
                                Peering/NCC)を比較検討したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">オンプレミスからGoogle APIへのプライベートアクセス(Private Google
                                Access/PSC)を設計したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">オンプレミス・クラウド間のIPアドレス空間の重複有無を事前に棚卸ししたか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">ハイブリッドDNS設計で、オンプレミス接続窓口となるVPCを1つに限定したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">Interconnect暗号化要件がある場合、MACsecとHA VPN over
                                Interconnectの適用範囲の違いを理解しているか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">GKEのノード・コントロールプレーンの公開範囲(パブリック/プライベート)を最小公開の原則で決定したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">GKEのPod/Serviceセカンダリレンジを将来のノード数上限まで見込んで確保したか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">GKEのIPアドレス枯渇対策(PSCベースクラスタ、共有レンジ、PUPI)の優先順位を理解しているか</span></label>
                    </li>
                    <li>
                        <label><input type="checkbox" /><span className="checklist-text">GKEのロードバランシングをコンテナネイティブ(NEGベース)で設計したか</span></label>
                    </li>
                </ul>
            </div>
            <hr />
            <h2 id="まとめ">まとめ</h2>
            <p>
                Section 1「Designing and planning a Google Cloud VPC
                network」は、試験全体の約21%を占める最重要領域であり、その本質は<strong>個別機能の暗記ではなく、要件からアーキテクチャを導き出すトレードオフ判断力</strong>です。本ガイドで扱った4つのタスクは、以下のように相互に関連しています。
            </p>
            <Diagram id="diag-31" label="図解 31" />
            <p>
                学習の進め方としては、まず1.1で「何を決める必要があるか」の全体像を掴み、1.2でVPC内部の設計原則(特にIPAM)を固め、1.3でその設計をハイブリッド/マルチクラウドに拡張し、最後に1.4でGKEという最もIPアドレス消費の激しいワークロードに適用する、という順序で理解を積み上げると効果的です。
            </p>
            <p>
                試験対策としては、単に「この機能は何をするか」を覚えるのではなく、本ガイドの各セクションにある比較テーブルや意思決定フローチャートを使って、<strong>「この要件ならどちらを選ぶか」を即座に判断できる状態</strong>を目指してください。特にSection
                2(実装)以降は、ここで学んだ設計判断がそのまま実装コマンド・設定項目の選択に直結するため、Section
                1の理解度がその後の学習効率を左右します。
            </p>
            <hr />
            <h2 id="参考文献出典">参考文献・出典</h2>
            <p>本ガイドの内容は、以下のGoogle Cloud公式ドキュメントを主な出典としています。</p>
            <div className="ref-grid">
                <div className="ref-card">
                    <h4>試験情報</h4>
                    <ul>
                        <li>
                            <a href="https://cloud.google.com/learn/certification/cloud-network-engineer">↗ Professional Cloud Network Engineer 認定試験ページ</a>
                        </li>
                        <li>
                            <a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf">↗ Professional Cloud Network Engineer Exam Guide (PDF)</a>
                        </li>
                    </ul>
                </div>
                <div className="ref-card">
                    <h4>1.1 全体的なネットワークアーキテクチャ</h4>
                    <ul>
                        <li>
                            <a href="https://cloud.google.com/network-tiers/docs/overview">↗ Network Service Tiers overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/load-balancing/docs/choosing-load-balancer">↗ Choose a load balancer</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/load-balancing/docs/load-balancing-overview">↗ Cloud Load Balancing overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/iam/docs/job-functions/networking">↗ IAM roles for Networking-related job functions</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/shared-vpc">↗ Shared VPC overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/load-balancing/docs/access-control">↗ Roles and permissions for Cloud Load Balancing</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/private-services-access">↗ Private services access</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/private-service-connect">↗ Private Service Connect overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/serverless-vpc-access">↗ Serverless VPC Access overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/quota">↗ Quotas and limits (VPC)</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/quotas">↗ Quotas and limits (Network Connectivity)</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/dns/docs/best-practices">↗ Best practices for Cloud DNS</a>
                        </li>
                    </ul>
                </div>
                <div className="ref-card">
                    <h4>1.2 VPCネットワークの設計</h4>
                    <ul>
                        <li><a href="https://cloud.google.com/vpc/docs/vpc">↗ VPC networks</a></li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/overview">↗ Virtual Private Cloud (VPC) overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/vpc-peering">↗ VPC Network Peering</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/architecture/deploy-hub-spoke-vpc-network-topology">↗ Hub-and-spoke network architecture</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/vpc-spokes-overview">↗ VPC spokes overview (Network Connectivity Center)</a>
                        </li>
                        <li><a href="https://cloud.google.com/vpc/docs/subnets">↗ Subnets</a></li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/alias-ip">↗ Alias IP ranges</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/configure-alias-ip-ranges">↗ Configure alias IP ranges</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/configuring-privately-used-public-ips-for-gke">↗ Configuring privately used public IPs for GKE</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/nat/docs/private-nat">↗ Private NAT</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/nat/docs/about-private-nat-for-ncc">↗ Private NAT for Network Connectivity Center spokes</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/nat/docs/overview">↗ Cloud NAT overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/mtu">↗ Maximum transmission unit</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/change-mtu-vpc-network">↗ Change the MTU setting of a VPC network</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc/docs/policy-based-routes">↗ Policy-based routes</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview">↗ Internal passthrough Network Load Balancers as next hops</a>
                        </li>
                    </ul>
                </div>
                <div className="ref-card">
                    <h4>1.3 ハイブリッド/マルチクラウドネットワーク</h4>
                    <ul>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview">↗ Cloud Interconnect overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/dedicated-overview">↗ Dedicated Interconnect overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/partner-overview">↗ Partner Interconnect overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/cci-overview">↗ Cross-Cloud Interconnect overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/sla">↗ Cloud Interconnect Service Level Agreement (SLA)</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/tutorials/dedicated-creating-9999-availability">↗ Establish 99.99% availability for Dedicated Interconnect</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/tutorials/partner-creating-9999-availability">↗ Establish 99.99% availability for Partner Interconnect</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview">↗ Cloud VPN overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/topologies">↗ HA VPN topologies</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/vpn/tutorials/create-ha-vpn-connections-google-cloud-aws">↗ Create HA VPN connections between Google Cloud and AWS</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/router/how-to/configuring-bgp">↗ Establish BGP sessions (Cloud Router)</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/how-to/choose-product">↗ Choosing a Network Connectivity product</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/direct-peering">↗ Direct Peering overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/verified-peering-provider">↗ Verified Peering Provider overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/carrier-peering">↗ Carrier Peering overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/dns/docs/zones/zones-overview">↗ DNS zones overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/dns/docs/overview">↗ Cloud DNS overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/dns/docs/zones/cross-project-binding">↗ Create a zone with cross-project binding</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/vpn/concepts/mtu-considerations">↗ MTU considerations (Cloud VPN)</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/how-to/partner/modifying-vlans">↗ Modify VLAN attachments</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/concepts/macsec-overview">↗ MACsec for Cloud Interconnect overview</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/network-connectivity/docs/interconnect/how-to/macsec/set-up-macsec">↗ Set up MACsec</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/vpc-service-controls/docs/overview">↗ Overview of VPC Service Controls</a>
                        </li>
                    </ul>
                </div>
                <div className="ref-card">
                    <h4>1.4 GKE向けの設計</h4>
                    <ul>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/legacy/network-isolation">↗ Creating a private cluster</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/advanced-private-cluster-config">↗ Customize your network isolation in GKE</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/alias-ips">↗ Create a VPC-native cluster</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/private-service-connect">↗ About Private Service Connect (GKE networking)</a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/network-tiers">↗ Configure external traffic with Network Service Tiers (GKE)</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <p>
                <em>本ガイドはGoogle Cloud公式ドキュメントおよび公式Exam
                    Guideに基づいて作成されていますが、試験内容は予告なく変更される場合があります。最新の出題範囲は必ず<a href="https://cloud.google.com/learn/certification/cloud-network-engineer">公式認定ページ</a>でご確認ください。</em>
            </p>
        </div></div>
        </div>
    );
}
