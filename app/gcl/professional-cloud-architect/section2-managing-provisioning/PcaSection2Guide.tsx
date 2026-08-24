'use client';

import { useState, useCallback, memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

const CHECKLIST_ITEMS = [
    'Cloud VPN・Dedicated/Partner/Cross-Cloud Interconnectの帯域幅・用途の違いを説明できる',
    'Network Connectivity Centerのハブ＆スポーク構成を図で説明できる',
    '共有VPCのホストプロジェクトとサービスプロジェクトの役割分担を説明できる',
    'Private Service Connectのエンドポイント・バックエンド・インターフェースの違いを説明できる',
    '4種類のロードバランサーを「トラフィック種別」「グローバル/リージョン」で分類できる',
    'Cloud NGFWの3ティア（Essentials/Standard/Enterprise）とCloud Armorの役割分担を説明できる',
    'Cloud Storageの4つのストレージクラスとAutoclassの違いを説明できる',
    'Cloud SQL・Spanner・Bigtable・Firestore・BigQueryを要件から選択できる',
    'スナップショット・マシンイメージ・Backup and DR Serviceの使い分けを説明できる',
    'Spot VMのプリエンプションの仕組みと適したワークロードを説明できる',
    'GKE AutopilotとStandardの違いと選択基準を説明できる',
    'Cloud RunとGKEのハイブリッド活用パターンを説明できる',
    'Terraform・Infrastructure Manager・Config ConnectorというIaCツールの違いを説明できる',
    'VM Managerによるパッチ管理のベストプラクティス（ラベル・ディスラプション予算）を説明できる',
    'Gemini Enterprise Agent Platformの4つの柱（Build/Scale/Govern/Optimize）を説明できる',
    'AI Hypercomputerの階層構造（ハードウェア／オーケストレーション／ソフトウェア／消費モデル）を説明できる',
    '画像・動画・音声・テキストそれぞれに適したGoogle AI APIを選べる',
    'Model GardenとAgent Gardenの違いを説明できる',
];

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 2 完全対策ガイドコンポーネント (Client Component)
 */
export function PcaSection2Guide() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleToggleNav = useCallback(() => {
        setIsNavOpen((prev) => !prev);
    }, []);

    const handleCloseNav = useCallback(() => {
        setIsNavOpen(false);
    }, []);

    const toggleCheck = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pca-s2-page">
            <div className="layout">
                <NavBar isOpen={isNavOpen} onToggle={handleToggleNav} onClose={handleCloseNav} />

                <main className="main">
                    <header className="hero">
                        <span className="hero-kicker">Professional Cloud Architect &middot; Section 2</span>
                        <h1>Google Cloud Professional Cloud Architect（PCA）試験ガイド</h1>
                        <h2 className="subtitle">
                            Section 2：クラウドソリューションインフラの管理とプロビジョニング（配点
                            約17.5%）
                        </h2>
                    </header>
                    <hr className="hero-divider" />

                    <blockquote>
                        <p>
                            本ガイドは、Google Cloud公式の
                            {' '}
                            <a href="https://cloud.google.com/learn/certification/cloud-architect">
                                Professional Cloud Architect 認定ページ
                            </a>
                            {' '}
                            および
                            {' '}
                            <a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf">
                                公式Exam Guide（PDF）
                            </a>
                            {' '}
                            の
                            {' '}
                            <strong>
                                Section 2: Managing and provisioning a cloud solution
                                infrastructure
                            </strong>
                            {' '}
                            を基に、初学者がゼロから体系的に理解できるよう再構成した学習用ドキュメントです。
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="この章について" tabIndex={-1}>この章について</h2>
                    <p>
                        Section 1（設計と計画）で描いたアーキテクチャを、実際に「作って動かす」段階が
                        Section 2 です。試験ガイドでは次の5つのタスクに分解されています。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タスク番号</th>
                                    <th scope="col">タイトル</th>
                                    <th scope="col">主な内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>2.1</td>
                                    <td>ネットワークトポロジの構成</td>
                                    <td>
                                        ハイブリッド／マルチクラウド接続、セキュリティ保護、VPC設計とロードバランシング
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>2.2</td>
                                    <td>個別のストレージシステムの構成</td>
                                    <td>
                                        データ配置、処理・コンピュートのプロビジョニング、アクセス管理、転送・レイテンシ、保持・ライフサイクル、増加計画、データ保護
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>2.3</td>
                                    <td>コンピュートシステムの構成</td>
                                    <td>
                                        リソースプロビジョニング、spot/standardの選択、クラウドネイティブネットワーク構成、オーケストレーションとパッチ管理、コンテナ、サーバーレス
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>2.4</td>
                                    <td>
                                        Gemini Enterprise Agent
                                        Platformを活用したエンドツーエンドMLワークフロー
                                    </td>
                                    <td>Agent Platform Pipelines、データ統合、AI Hypercomputer</td>
                                </tr>
                                <tr className="odd">
                                    <td>2.5</td>
                                    <td>Agent Platformでの事前構築ソリューション／APIの構成</td>
                                    <td>
                                        Google AI API、Gemini Enterprise機能の統合、Model
                                        Gardenのモデル統合
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-1" label="Section 2 全体構成図" />
                    <p>
                        Section 1が「何を作るべきか」を決める工程だとすれば、Section
                        2は「それをどう実装し、日々の運用に載せるか」を問う領域です。試験では、
                        <a href="https://cloud.google.com/learn/certification/cloud-architect">
                            Altostrat Media、Cymbal Retail、EHR Healthcare、KnightMotives Automotive
                        </a>
                        {' '}
                        の4つの公式ケーススタディが、既存インフラの制約（レガシーシステム、コンプライアンス要件、予算上限など）として設問の背景に登場することがあります。Section
                        2の設問を解く際は「その設計が技術的に正しいか」だけでなく「そのケーススタディの制約下で実現可能か」を常に意識してください。
                    </p>
                    <hr />

                    <h2 id="21-ネットワークトポロジの構成" tabIndex={-1}>2.1 ネットワークトポロジの構成</h2>
                    <p>このタスクは、以下の4つの観点で構成されています。</p>
                    <ol type="1">
                        <li>オンプレミス環境への拡張（ハイブリッドネットワーキング）</li>
                        <li>マルチクラウド環境への拡張（Google Cloud間通信を含む）</li>
                        <li>セキュリティ保護（侵入防止、アクセス制御、ファイアウォール）</li>
                        <li>VPC設計とロードバランシング</li>
                    </ol>

                    <h3 id="211-ハイブリッドネットワーキングオンプレミスとの接続" tabIndex={-1}>
                        2.1.1 ハイブリッドネットワーキング：オンプレミスとの接続
                    </h3>
                    <p>
                        Google
                        Cloudは、オンプレミスデータセンターとの接続方式として主に4つのオプションを提供しています。帯域幅・コスト・SLA・セットアップ期間のトレードオフを理解することが、この分野の出題の核心です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">接続方式</th>
                                    <th scope="col">帯域幅の目安</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">適したユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud VPN（HA VPN）</td>
                                    <td>1.5〜3.0 Gbps／トンネル</td>
                                    <td>
                                        インターネット経由のIPsec暗号化トンネル。低コストで迅速に構築可能
                                    </td>
                                    <td>
                                        低〜中程度のデータ量、迅速な立ち上げ、DR用のバックアップ回線
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Partner Interconnect</td>
                                    <td>50 Mbps〜50 Gbps</td>
                                    <td>サービスプロバイダ経由でGoogleに接続。コロケーション不要</td>
                                    <td>
                                        10Gbps未満の要件、またはGoogleのコロケーション拠点に物理アクセスできない場合
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Dedicated Interconnect</td>
                                    <td>10/100/400 Gbps（最大8回線で3.2Tbps）</td>
                                    <td>
                                        コロケーション施設での物理的な相互接続。RFC1918プライベートIPで直接通信
                                    </td>
                                    <td>
                                        大容量・低レイテンシ・安定した帯域が求められるエンタープライズ環境
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cross-Cloud Interconnect</td>
                                    <td>10/100 Gbps</td>
                                    <td>AWS・Azure・OCIなど他クラウドとの専用線接続</td>
                                    <td>
                                        マルチクラウドAI/データワークロード間の高性能プライベート接続
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://cloud.google.com/hybrid-connectivity">
                                Hybrid Connectivity | Google Cloud
                            </a>
                            、
                            <a href="https://jayendrapatil.com/google-cloud-hybrid-connectivity/">
                                Google Cloud Hybrid Connectivity – IC, VPN &amp; NCC
                            </a>
                        </span>
                    </div>
                    <Diagram id="diag-2" label="ハイブリッド・マルチクラウド接続の選択フロー" />
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    RFC1918（プライベートIP）同士の通信が必要な場合は、Dedicated
                                    InterconnectまたはPartner Interconnectが必須です。VPC
                                    Peeringはプライベートアドレッシングを提供しません<sup>[1]</sup>。
                                </li>
                                {' '}
                                <li>
                                    HA VPNは静的・動的（BGP）ルーティングの両方に対応し、Classic
                                    VPNのBGPは非推奨（Deprecated）のため新規構築では避けます<sup>[1]</sup>。
                                </li>
                                {' '}
                                <li>
                                    Cloud
                                    Interconnectは、リンク層暗号化のためMACsecをサポートし、VLANアタッチメントのトラフィックをIPsecで暗号化するHA
                                    VPN over Cloud Interconnectも構成可能です<sup>[1]</sup>。
                                </li>
                                {' '}
                                <li>
                                    本番環境では、Interconnectを主回線、HA
                                    VPNをフェイルオーバー用のバックアップ回線とする構成が一般的です<sup>[2]</sup>。
                                </li>
                                {' '}
                                <li>
                                    MTU不一致はハイブリッド接続でパケットロスを引き起こす典型的な落とし穴です。オンプレミス側とVLANアタッチメント側でMTU設定を揃えます<sup>[2]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="212-マルチクラウド環境への拡張" tabIndex={-1}>2.1.2 マルチクラウド環境への拡張</h3>
                    <p>
                        複数のGoogle
                        CloudプロジェクトやVPC、あるいは他クラウドとの接続を一元管理するには、
                        <strong>Network Connectivity Center（NCC）</strong>
                        {' '}
                        を使ったハブ＆スポーク構成が推奨されます。
                    </p>
                    <Diagram id="diag-3" label="Network Connectivity Center によるハブ＆スポーク構成" />
                    <p>
                        NCCは、Cloud VPN・Cloud
                        Interconnect・ルーターアプライアンスをスポークとしてサポートし、ハブに接続されたすべてのスポーク間でフルメッシュの到達性を提供します。さらに、あらかじめ定義済みのメッシュ／スター型トポロジ用の「スポークグループ」もサポートしています<sup>[1]</sup>。マルチクラウドのプライベート接続には
                        Cross-Cloud Interconnect
                        が推奨される方式であり、NCCと組み合わせることでマルチクラウドのハブ＆スポークアーキテクチャを構築できます<sup>[1]</sup>。ApplovinやEA、PayPal、UberのようなAIワークロードを持つ企業がCross-Cloud
                        Networkを利用している例が公式に紹介されています<sup>[2]</sup>。
                    </p>

                    <h3 id="213-セキュリティ保護侵入防止アクセス制御ファイアウォール" tabIndex={-1}>
                        2.1.3 セキュリティ保護（侵入防止・アクセス制御・ファイアウォール）
                    </h3>
                    <p>
                        ネットワークセキュリティは、単一の製品ではなく複数レイヤーの「多層防御（Defense
                        in Depth）」として設計します。
                    </p>
                    <Diagram id="diag-4" label="ネットワークセキュリティの多層防御アーキテクチャ" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コンポーネント</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">ティア／モード</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Armor</td>
                                    <td>
                                        エッジでのDDoS対策とWebアプリケーションファイアウォール（WAF）
                                    </td>
                                    <td>Standard／Managed Protection Plus</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud NGFW Essentials</td>
                                    <td>
                                        IP・ポート・プロトコルベースの基本的なステートフルファイアウォール
                                    </td>
                                    <td>全プロジェクトに標準搭載</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud NGFW Standard</td>
                                    <td>
                                        レイヤー7の階層型・グローバルファイアウォールポリシー、タグベースの制御
                                    </td>
                                    <td>追加料金プラン</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud NGFW Enterprise</td>
                                    <td>
                                        Palo Alto
                                        Networksの脅威インテリジェンスによるIDS/IPS、URLフィルタリング、TLSインスペクション
                                    </td>
                                    <td>最上位プラン</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/firewall/docs/about-firewalls">
                                Cloud NGFW overview
                            </a>
                            、
                            <a href="https://docs.cloud.google.com/firewall/docs/configure-intrusion-prevention">
                                Configure intrusion detection and prevention service
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    IDS/IPSはまず「検出モード」で導入し、誤検知（false
                                    positive）をチューニングしてから「防御モード」に切り替えるのが安全な導入手順です<sup>[3]</sup>。
                                </li>
                                {' '}
                                <li>
                                    Cloud
                                    NGFWはNorth-South（VPCと外部間）だけでなくEast-West（VPC内のリソース間）トラフィックにも適用され、セキュアタグを用いたマイクロセグメンテーションでゼロトラストに近い構成を実現できます<sup>[4]</sup>。
                                </li>
                                {' '}
                                <li>
                                    ファイアウォールルールは「広く・少なく」を基本方針とし、明確なセキュリティ目的を定義したうえで、外部アクセスを最小化し、機密データには専用のサービス境界（VPC
                                    Service Controls）を設定します<sup>[1]</sup>。
                                </li>
                                {' '}
                                <li>
                                    VMのアイデンティティ管理にはネットワークタグではなく、IAMで統制可能なサービスアカウントまたはIAM-governed
                                    Tagsを使うことで、権限昇格のリスクを抑えられます<sup>[1][4]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="214-vpc設計とロードバランシング" tabIndex={-1}>2.1.4 VPC設計とロードバランシング</h3>
                    <h4 id="vpcの基本設計方針" tabIndex={-1}>VPCの基本設計方針</h4>
                    <p>
                        Google
                        CloudのVPCはAWSやAzureと異なり、<strong>グローバルリソース</strong>です。1つのVPCが複数のリージョンにまたがるサブネットを持つことができ、リージョンをまたいだVPC
                        Peeringを組む必要がありません<sup>[5]</sup>。
                    </p>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p><sup>[6][7]</sup></p>
                            {' '}
                            <ul>
                                <li>
                                    要件が共通するリソース群には、まず単一のVPCネットワークから始める。
                                </li>
                                {' '}
                                <li>
                                    複数チーム・複数プロジェクトでネットワークを一元管理したい場合は
                                    {' '}
                                    <strong>共有VPC（Shared VPC）</strong>
                                    {' '}
                                    を採用し、ネットワークユーザーロールをサブネット単位で付与する。
                                </li>
                                {' '}
                                <li>
                                    本番環境と非本番環境を同じ共有VPCに同居させることは避ける（管理者権限の分離が難しくなるため）。
                                </li>
                                {' '}
                                <li>
                                    IPアドレス空間は将来の拡張を見込み、CIDRの重複がないよう事前に計画する。
                                </li>
                                {' '}
                                <li>
                                    ファイアウォールルールは少数の広いルールセットにまとめ、タグやサービスアカウントで対象を絞り込む。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Diagram id="diag-5" label="共有VPC（Shared VPC）のアーキテクチャ" />
                    <p>
                        共有VPCでは、1つの「ホストプロジェクト」が持つネットワークを複数の「サービスプロジェクト」が利用します。ホストプロジェクトはサービスプロジェクトを兼ねることができず、サービスプロジェクトは1つのホストプロジェクトにのみ接続できます（複数ホストプロジェクトの構成自体は可能）<sup>[7]</sup>。この仕組みにより、ネットワーク管理者はネットワークとセキュリティを一元管理しつつ、各チームのプロジェクト管理者にはインスタンス作成などの限定的な権限のみを委譲でき、最小権限の原則を実現します<sup>[7][8]</sup>。
                    </p>

                    <h4 id="private-service-connectpsc" tabIndex={-1}>Private Service Connect（PSC）</h4>
                    <p>
                        PSCは、VPCを越えてGoogle Cloudの管理サービス（Cloud
                        SQL、BigQueryなど）やサードパーティSaaS、あるいは自社が公開するサービスに、インターネットを経由せずプライベートにアクセスするための仕組みです。
                    </p>
                    <Diagram id="diag-6" label="Private Service Connect によるプライベート接続" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">PSCの機能</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>PSCエンドポイント</td>
                                    <td>
                                        Google
                                        APIまたは他VPCの公開サービスに、内部IPアドレスでアクセスする（コンシューマー視点）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>PSCバックエンド</td>
                                    <td>
                                        ロードバランサーの背後にGoogle APIをターゲットとして配置する
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>PSCインターフェース</td>
                                    <td>
                                        マネージドサービス側からコンシューマーVPCへ能動的に接続を開始する（プロデューサー視点）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/vpc/docs/private-service-connect">
                                Private Service Connect | Virtual Private Cloud
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                PSCを使うと、トラフィックはGoogle
                                Cloud内部にとどまり公衆インターネットを経由しません。オンプレミスからGoogle
                                APIにアクセスする際も、特定のIPアドレスとリージョンに向けてトラフィックを誘導でき、Private
                                Google
                                AccessやパブリックドメインでのAPIアクセスに代わる選択肢となります<sup>[9]</sup>。
                            </p>
                        </div>
                    </div>

                    <h4 id="ロードバランサーの選択" tabIndex={-1}>ロードバランサーの選択</h4>
                    <p>
                        Cloud Load
                        Balancingは「トラフィックの種類」「外部か内部か」「グローバルかリージョンか」の3軸で製品を選択します。
                    </p>
                    <Diagram id="diag-7" label="Cloud Load Balancing 選択フロー" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ロードバランサー</th>
                                    <th scope="col">レイヤー</th>
                                    <th scope="col">スコープ</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Application Load Balancer（外部）</td>
                                    <td>L7（HTTP/HTTPS）</td>
                                    <td>グローバル／リージョン</td>
                                    <td>Webアプリ、マイクロサービスのフロントエンド</td>
                                </tr>
                                <tr className="even">
                                    <td>Application Load Balancer（内部）</td>
                                    <td>L7</td>
                                    <td>リージョン</td>
                                    <td>VPC内部のマイクロサービス間通信</td>
                                </tr>
                                <tr className="odd">
                                    <td>Proxy Network Load Balancer</td>
                                    <td>L4（TCP/SSL）</td>
                                    <td>グローバル／リージョン</td>
                                    <td>TLSオフロードを伴う非HTTPアプリ</td>
                                </tr>
                                <tr className="even">
                                    <td>Passthrough Network Load Balancer</td>
                                    <td>L4（TCP/UDP/ESP/ICMP）</td>
                                    <td>リージョン</td>
                                    <td>
                                        送信元IP保持が必須のワークロード、ゲームサーバー、データベース
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://cloud.google.com/load-balancing/docs/choosing-load-balancer">
                                Choose a load balancer | Cloud Load Balancing
                            </a>
                            、
                            <a href="https://docs.cloud.google.com/load-balancing/docs/https">
                                External Application Load Balancer overview
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                グローバル外部Application Load Balancerは、リージョン別の外部Application
                                Load Balancerと異なり、単一のエニーキャストIPを世界中に公開し、Google
                                Front
                                End（GFE）経由で最寄りの正常なバックエンドへ自動的にルーティングします。一方リージョン外部Application
                                Load
                                Balancerは、Envoyベースのマネージドプロキシとして実装されており、トラフィックミラーリングや加重トラフィック分割といった高度な機能を持ちます<sup>[10]</sup>。TLSをどこで終端させるかによっても選択が変わり、グローバルなSSL
                                Proxy／HTTPS負荷分散はエッジに近い場所でTLSを終端するためレイテンシが下がりますが、TLS終端の場所をより細かく制御したい場合はリージョナルロードバランサーを検討します。
                            </p>
                        </div>
                    </div>
                    <hr />

                    <h2 id="22-個別のストレージシステムの構成" tabIndex={-1}>2.2 個別のストレージシステムの構成</h2>
                    <p>
                        このタスクは以下の7つの観点をカバーします。データ配置・処理／コンピュートのプロビジョニング・セキュリティ／アクセス管理・転送とレイテンシ・保持とライフサイクル・データ増加計画・データ保護（バックアップと復旧）。
                    </p>

                    <h3 id="221-オブジェクトストレージcloud-storageクラスとライフサイクル管理" tabIndex={-1}>
                        2.2.1 オブジェクトストレージ（Cloud Storage）：クラスとライフサイクル管理
                    </h3>
                    <p>
                        Cloud
                        Storageは、アクセス頻度に応じた4つのストレージクラスを提供し、いずれも99.999999999%（イレブンナイン）の年間耐久性と単一のAPI、ミリ秒単位の低レイテンシを共有します。違いは価格・最小保存期間・取り出しコストです<sup>[11]</sup>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ストレージクラス</th>
                                    <th scope="col">想定アクセス頻度</th>
                                    <th scope="col">最小保存期間の目安</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Standard</td>
                                    <td>高頻度（日次〜）</td>
                                    <td>なし</td>
                                    <td>アクティブなWebコンテンツ、アプリのホットデータ</td>
                                </tr>
                                <tr className="even">
                                    <td>Nearline</td>
                                    <td>月1回程度</td>
                                    <td>30日</td>
                                    <td>バックアップ、めったに使わないデータ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Coldline</td>
                                    <td>四半期に1回程度</td>
                                    <td>90日</td>
                                    <td>災害対策データ、コールドバックアップ</td>
                                </tr>
                                <tr className="even">
                                    <td>Archive</td>
                                    <td>年1回未満</td>
                                    <td>365日</td>
                                    <td>長期保存、コンプライアンス上のアーカイブ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/storage/docs/lifecycle">
                                Object Lifecycle Management | Cloud Storage
                            </a>
                            、
                            <a href="https://docs.cloud.google.com/storage/docs/control-data-lifecycles">
                                Options for controlling data lifecycles
                            </a>
                        </span>
                    </div>
                    <Diagram id="diag-8" label="Cloud Storage ライフサイクル管理とクラス移行" />
                    <p><strong>オブジェクトライフサイクル管理（OLM）のアクション</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">アクション</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Delete</td>
                                    <td>条件を満たしたオブジェクトを削除（TTL設定などに使用）</td>
                                </tr>
                                <tr className="even">
                                    <td>SetStorageClass</td>
                                    <td>ストレージクラスをより低コストなクラスへ変更</td>
                                </tr>
                                <tr className="odd">
                                    <td>AbortIncompleteMultipartUpload</td>
                                    <td>未完了のマルチパートアップロードを一定期間後に削除</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    アクセスパターンが予測しにくいバケットには
                                    {' '}
                                    <strong>Autoclass</strong>
                                    {' '}
                                    を有効化すると、Cloud
                                    Storageがオブジェクトごとのアクセス頻度を見てクラスを自動的に移行し、早期削除料金なしで最適化してくれます<sup>[12]</sup>。ただしAutoclassを有効にしたバケットではSetStorageClassアクションを併用できません<sup>[11]</sup>。
                                </li>
                                {' '}
                                <li>
                                    誤削除や悪意ある削除からデータを守るため、すべてのバケットで<strong>ソフトデリート</strong>を有効化することが推奨されます<sup>[12]</sup>。
                                </li>
                                {' '}
                                <li>
                                    重要データには<strong>オブジェクトバージョニング</strong>を有効にし、OLMルールで「非最新バージョン」の保持期間も明示的に設定しておかないと、意図せずストレージコストが蓄積します<sup>[13]</sup>。
                                </li>
                                {' '}
                                <li>
                                    ライフサイクルアクションの実行タイミングは保証されないため、アプリケーション側は「特定の時刻までに必ず移行される」という前提でロジックを組まないようにします<sup>[11]</sup>。
                                </li>
                                {' '}
                                <li>
                                    バケットは計算リソースと同じリージョンに配置し、リージョンをまたぐ読み出しによる追加のegress課金とレイテンシを避けます<sup>[12]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="222-データ処理とコンピュートのプロビジョニングデータベースの選択" tabIndex={-1}>
                        2.2.2 データ処理とコンピュートのプロビジョニング／データベースの選択
                    </h3>
                    <p>
                        ストレージ／データベースサービスの選定は、PCA試験で最も頻出するトピックの1つです。ワークロードの性質（OLTPかOLAPか、リレーショナルかNoSQLか、スケール要件）から逆算して選びます。
                    </p>
                    <Diagram id="diag-9" label="データベース・ストレージ選定フロー" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">データモデル</th>
                                    <th scope="col">一貫性</th>
                                    <th scope="col">得意な領域</th>
                                    <th scope="col">苦手な領域</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud SQL</td>
                                    <td>リレーショナル（MySQL/PostgreSQL/SQL Server）</td>
                                    <td>強整合性</td>
                                    <td>既存アプリの移行、中規模OLTP</td>
                                    <td>リージョンをまたぐ無制限のスケール</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Spanner</td>
                                    <td>リレーショナル（グローバル分散）</td>
                                    <td>外部整合性（TrueTime）</td>
                                    <td>ミッションクリティカルなグローバルOLTP、金融台帳</td>
                                    <td>小規模・低コスト志向のワークロード</td>
                                </tr>
                                <tr className="odd">
                                    <td>Bigtable</td>
                                    <td>ワイドカラム（NoSQL）</td>
                                    <td>結果整合性が基本</td>
                                    <td>大量書き込み・低レイテンシの時系列／IoT／広告技術</td>
                                    <td>複雑なクエリ・JOIN・トランザクション</td>
                                </tr>
                                <tr className="even">
                                    <td>Firestore</td>
                                    <td>ドキュメント（NoSQL）</td>
                                    <td>強整合性（ドキュメント単位）</td>
                                    <td>モバイル／Webアプリのリアルタイム同期</td>
                                    <td>数十TBを超える大規模データ</td>
                                </tr>
                                <tr className="odd">
                                    <td>BigQuery</td>
                                    <td>列指向（OLAP）</td>
                                    <td>該当なし（分析用）</td>
                                    <td>ペタバイト級のアドホック分析・レポーティング</td>
                                    <td>低レイテンシな単一レコードの読み書き</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://www.thecloudguru.in/2025/11/03/gcp-database-decision-guide-cloud-sql-firestore-bigtable-or-spanner/">
                                GCP Database Decision Guide
                            </a>
                            、
                            <a href="https://medium.com/@zaigam22/cloud-sql-vs-spanner-vs-bigtable-vs-bigquery-vs-firestore-48a74b031592">
                                Cloud SQL vs Spanner vs Bigtable vs BigQuery vs Firestore
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                Cloud
                                Spannerは、GPSと原子時計を用いたグローバル同期クロック「TrueTime」により、通常の強整合性よりも強い「外部整合性（external
                                consistency）」を実現し、マルチリージョン構成では最大99.999%の可用性SLAを持ちます<sup>[14]</sup>。既存のMySQLアプリケーションを移行する場合、最も移行コストが低いのはCloud
                                SQLであり、Spannerはグローバル規模でなければオーバースペックかつ高コストになりがちです<sup>[15]</sup>。
                            </p>
                        </div>
                    </div>

                    <h3 id="223-ブロックストレージとファイルストレージ" tabIndex={-1}>
                        2.2.3 ブロックストレージとファイルストレージ
                    </h3>
                    <p>
                        Compute EngineやGKEのワークロードに接続する永続ストレージには、Persistent
                        Disk／Hyperdiskとファイル共有用のFilestoreがあります。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">種類</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Persistent Disk（標準／SSD）</td>
                                    <td>
                                        ゾーンまたはリージョンでレプリケートされるブロックストレージ。最大64TB
                                    </td>
                                    <td>汎用的なVM・GKEのブートディスク／データディスク</td>
                                </tr>
                                <tr className="even">
                                    <td>Hyperdisk</td>
                                    <td>
                                        次世代ブロックストレージ。IOPS／スループットを独立して調整可能
                                    </td>
                                    <td>高性能データベース、AI推論・サービング（Hyperdisk ML）</td>
                                </tr>
                                <tr className="odd">
                                    <td>Filestore</td>
                                    <td>フルマネージドのNFSファイル共有</td>
                                    <td>
                                        複数VM／Podで共有するファイルシステム、CMS、レンダリングファーム
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://cloud.google.com/persistent-disk">
                                Persistent Disk: durable block storage
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                Persistent
                                Diskはゾーン間の同期レプリケーション、リージョン間の非同期レプリケーション、スナップショット、ディスククローンの4つの方法でデータ保護を実現できます<sup>[16]</sup>。複数のディスクを同時にアタッチできるため、パーティショニングやRAID構成の手間を省けます<sup>[16]</sup>。
                            </p>
                        </div>
                    </div>

                    <h3 id="224-データ保護バックアップと復旧" tabIndex={-1}>
                        2.2.4 データ保護（バックアップと復旧）
                    </h3>
                    <Diagram id="diag-10" label="データ保護とバックアップの選択肢" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">手段</th>
                                    <th scope="col">カバー範囲</th>
                                    <th scope="col">適したケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ディスクスナップショット</td>
                                    <td>単一のPersistent Disk／Hyperdisk</td>
                                    <td>個々のディスクの定期バックアップ</td>
                                </tr>
                                <tr className="even">
                                    <td>マシンイメージ</td>
                                    <td>インスタンスにアタッチされた全ディスク＋構成情報</td>
                                    <td>インスタンス丸ごとの複製・DR用テンプレート</td>
                                </tr>
                                <tr className="odd">
                                    <td>Filestoreスナップショット</td>
                                    <td>Filestoreインスタンスのファイル共有全体</td>
                                    <td>ファイルサーバーの誤削除対策</td>
                                </tr>
                                <tr className="even">
                                    <td>Backup and DR Service</td>
                                    <td>
                                        Compute Engine、VMware Engine、Cloud
                                        SQL、AlloyDB、Filestoreなど複数プロジェクトを横断
                                    </td>
                                    <td>
                                        エンタープライズ規模でのポリシーベースの一元バックアップ管理
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/compute/docs/disks/data-protection">
                                Data protection options for disks and instances
                            </a>
                            、
                            <a href="https://www.eon.io/blog/google-cloud-disaster-recovery">
                                Google Cloud Disaster Recovery Guide
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    スナップショットは1時間に1回程度の頻度を目安とし、それより高頻度に取得しないようにします（スナップショットスケジュール機能を利用するのが簡便です）<sup>[17]</sup>。
                                </li>
                                {' '}
                                <li>
                                    アプリケーションを実行したまま取得したスナップショットは「クラッシュコンシステント」に過ぎません。アプリケーションを一時停止し、メモリ上の保留書き込みをディスクにフラッシュしてから取得すると「アプリケーションコンシステント」なスナップショットになります<sup>[17]</sup>。
                                </li>
                                {' '}
                                <li>
                                    スナップショットの読み取り／復元権限は強力な権限です。悪意のある第三者がこの権限を取得すると、自分の管理するプロジェクトにスナップショットを復元してデータを窃取できてしまうため、IAM権限は信頼できるプリンシパルのみに限定します<sup>[17]</sup>。
                                </li>
                                {' '}
                                <li>
                                    複数ディスクにまたがるVMは、個々のディスクスナップショットではなく<strong>マシンイメージ</strong>を使うことで、ディスク間の整合性を確保できます<sup>[18]</sup>。
                                </li>
                                {' '}
                                <li>
                                    複数プロジェクト・複数環境にまたがるバックアップを一元的なポリシーで管理したい場合は、Backup
                                    and DR Serviceの利用が推奨されます<sup>[18]</sup>。
                                </li>
                                {' '}
                                <li>
                                    Backup and DR
                                    Serviceはスナップショットやバックアップボールトを提供しますが、VPC・ロードバランサー・IAMロール・DNSなどの「環境そのもの」は再現しません。これらはInfrastructure
                                    as Code（IaC）で別途管理する必要があります<sup>[19]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <h2 id="23-コンピュートシステムの構成" tabIndex={-1}>2.3 コンピュートシステムの構成</h2>
                    <p>
                        このタスクは、コンピュートリソースのプロビジョニング、spot／standardの選択、クラウドネイティブなネットワーク構成、インフラのオーケストレーションとパッチ管理、コンテナオーケストレーション、サーバーレスコンピューティングの6項目で構成されます。
                    </p>

                    <h3 id="231-コンピュートリソースのプロビジョニングマシンファミリーとカスタムマシンタイプ" tabIndex={-1}>
                        2.3.1
                        コンピュートリソースのプロビジョニング：マシンファミリーとカスタムマシンタイプ
                    </h3>
                    <p>
                        Compute
                        Engineのマシンタイプは「ファミリー」（用途）と「シリーズ」（世代）の組み合わせで構成されます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">マシンファミリー</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">代表シリーズ</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>汎用（General-purpose）</td>
                                    <td>バランス型のCPU:メモリ比</td>
                                    <td>E2、N2、N2D、N4</td>
                                    <td>Webアプリ、開発・テスト環境、マイクロサービス</td>
                                </tr>
                                <tr className="even">
                                    <td>コンピュート最適化</td>
                                    <td>高いクロック周波数・コア性能</td>
                                    <td>C2、C2D、C3、H3</td>
                                    <td>HPC、ゲームサーバー、科学技術計算</td>
                                </tr>
                                <tr className="odd">
                                    <td>メモリ最適化</td>
                                    <td>大容量メモリ</td>
                                    <td>M2、M3</td>
                                    <td>インメモリDB（SAP HANA等）</td>
                                </tr>
                                <tr className="even">
                                    <td>アクセラレータ最適化</td>
                                    <td>GPU／TPUを搭載</td>
                                    <td>A2、A3、G2</td>
                                    <td>機械学習トレーニング／推論、グラフィックス処理</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/compute/docs/machine-resource">
                                Machine families resource and comparison guide
                            </a>
                        </span>
                    </div>
                    <p>
                        <strong>カスタムマシンタイプ</strong>
                        ：定義済みのマシンタイプがワークロードに合わない場合（例：ソフトウェアライセンスがコア数に紐づくため、必要最小限のvCPU数に絞りたい）、E系列・N系列でvCPU数とメモリ量を個別に指定できます。カスタムマシンタイプは定義済みタイプに対してオンデマンド価格が5%程度割高になります<sup>[20][21]</sup>。
                    </p>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                Cloud MonitoringのCPU・メモリ使用率データ（過去8日間）に基づき、Compute
                                Engineはマシンタイプの「サイズ適正化（rightsizing）」を自動的に推奨してくれます。定期的にこの推奨事項を確認し、過剰プロビジョニングを是正します<sup>[22]</sup>。
                            </p>
                        </div>
                    </div>

                    <h3 id="232-コンピュートのボラティリティ構成spot-vm-vs-standard-vm" tabIndex={-1}>
                        2.3.2 コンピュートのボラティリティ構成：Spot VM vs Standard VM
                    </h3>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">Standard VM</th>
                                    <th scope="col">Spot VM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>価格</td>
                                    <td>オンデマンド価格</td>
                                    <td>最大91%オフ</td>
                                </tr>
                                <tr className="even">
                                    <td>可用性</td>
                                    <td>保証あり（SLA対象）</td>
                                    <td>
                                        Compute
                                        Engineの余剰キャパシティに依存、いつでもプリエンプトされ得る
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>実行時間の保証</td>
                                    <td>なし（自分で停止するまで継続）</td>
                                    <td>最小・最大実行時間の保証なし（事前に制限も可能）</td>
                                </tr>
                                <tr className="even">
                                    <td>プリエンプション通知</td>
                                    <td>なし</td>
                                    <td>最大30秒前に通知</td>
                                </tr>
                                <tr className="odd">
                                    <td>適したワークロード</td>
                                    <td>常時稼働のステートフルサービス</td>
                                    <td>
                                        フォールトトレラントなバッチ処理、CI/CD、ステートレスなワーカー
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/compute/docs/instances/spot">
                                Spot VMs | Compute Engine
                            </a>
                            、
                            <a href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot">
                                Create and use Spot VMs
                            </a>
                        </span>
                    </div>
                    <Diagram id="diag-11" label="Spot VM のプリエンプション通知とシャットダウンフロー" />
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    Spot
                                    VMを作成する前に、対象マシンタイプ・リージョンの過去のプリエンプション率と価格傾向を確認し、可用性の高い組み合わせを選びます<sup>[23]</sup>。
                                </li>
                                {' '}
                                <li>
                                    大規模なSpot VMクラスタは、Google
                                    Cloudのデータセンター負荷が下がる夜間・週末に実行すると成功率が上がります<sup>[23]</sup>。
                                </li>
                                {' '}
                                <li>
                                    1台ずつ作成するのではなく、インスタンステンプレートを使って同一構成のSpot
                                    VMを複数作成すると効率的です<sup>[23]</sup>。
                                </li>
                                {' '}
                                <li>
                                    Spot価格は最大で1日1回変動する可能性があるため、コスト試算では過去の価格推移を確認します<sup>[23]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="233-クラウドネイティブなネットワーク構成compute-enginegkevmware-engine" tabIndex={-1}>
                        2.3.3 クラウドネイティブなネットワーク構成（Compute Engine／GKE／VMware Engine）
                    </h3>
                    <p>コンピュートリソースの種類ごとに、ネットワーク構成の考慮点が異なります。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コンピュート基盤</th>
                                    <th scope="col">ネットワークの考慮点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Compute Engine</td>
                                    <td>
                                        VPCネイティブのサブネット、内部/外部IP、Cloud
                                        NATによる送信専用アクセス
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>GKE</td>
                                    <td>
                                        VPCネイティブクラスタ、エイリアスIP範囲によるPod/Serviceのアドレッシング、Dataplane
                                        V2（eBPF）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>サーバーレス（Cloud Run等）</td>
                                    <td>
                                        サーバーレスVPCアクセスコネクタによるVPC内部リソースへのプライベート到達性
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Google Cloud VMware Engine</td>
                                    <td>
                                        VMware EngineネットワークとVPC間のピアリング、Public IP
                                        Serviceまたは外部ロードバランサー経由のインターネット到達性
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/vmware-engine/docs/best-practices-security">
                                Google Cloud VMware Engine best practices for networking
                            </a>
                        </span>
                    </div>
                    <p>
                        <strong>Google Cloud VMware Engine（GCVE）</strong>
                        {' '}
                        は、既存のVMware環境（vSphere/vCenter/NSX）をそのままGoogle
                        Cloud上のベアメタルにリフト＆シフトするためのサービスです。データセンター移行、DR、VDI（仮想デスクトップ基盤）用途で使われます<sup>[24]</sup>。
                    </p>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    カスタムのURLフィルタリング・IPS/IDS・トラフィックインスペクションが必要な場合、インターネット向けトラフィックはVMware
                                    Engineから直接出すのではなく、いったんVPC経由でルーティングして既存のセキュリティ機能を通します<sup>[24]</sup>。
                                </li>
                                {' '}
                                <li>
                                    コンピュートリソースは1つのvCenterに集約しすぎず、VDIのような特定ワークロード用には専用のプライベートクラウド（専用vCenter）を検討します<sup>[24]</sup>。
                                </li>
                                {' '}
                                <li>
                                    ワークロードVMのゲストOSパッチ適用・監視は引き続き利用者の責任範囲であり、VMware
                                    Engineが自動で行うのはハードウェア・ハイパーバイザー層のみです。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="234-インフラのオーケストレーションリソース構成パッチ管理" tabIndex={-1}>
                        2.3.4 インフラのオーケストレーション、リソース構成、パッチ管理
                    </h3>
                    <h4 id="infrastructure-as-codeiac" tabIndex={-1}>Infrastructure as Code（IaC）</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">アプローチ</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Terraform</td>
                                    <td>HCLによる宣言的な構成、ステートファイルで管理</td>
                                    <td>マルチクラウド・大規模組織での標準的なIaC</td>
                                </tr>
                                <tr className="even">
                                    <td>Infrastructure Manager</td>
                                    <td>
                                        Google
                                        CloudネイティブでTerraformを実行・管理するマネージドサービス
                                    </td>
                                    <td>Terraformの実行基盤をGoogle Cloud側に持ちたい場合</td>
                                </tr>
                                <tr className="odd">
                                    <td>Config Connector</td>
                                    <td>Kubernetes CRDとしてGoogle Cloudリソースを宣言</td>
                                    <td>GKEを中心としたGitOpsワークフロー</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Foundation Toolkit</td>
                                    <td>Google提供のオピニオン化されたTerraformモジュール群</td>
                                    <td>セキュアな本番導入をすばやく開始したい場合</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/docs/terraform/iac-overview">
                                Infrastructure as Code on Google Cloud
                            </a>
                            、
                            <a href="https://cloud.google.com/discover/what-is-infrastructure-as-code">
                                What is Infrastructure as Code (IaC)?
                            </a>
                        </span>
                    </div>
                    <Diagram id="diag-12" label="IaC（Infrastructure as Code）の適用ワークフロー" />
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                本番環境は変更管理プロセスを経たIaCで管理することがベストプラクティスとされ、すべての構成変更履歴を監査・ロールバック可能にします<sup>[25]</sup>。Config
                                Connectorは、Terraformのようなステートファイルに頼らず、Kubernetesの調整ループ（reconciliation
                                loop）を使ってクラウドインフラを宣言された状態に近づけ続ける点がTerraformとの大きな違いです<sup>[26]</sup>。すでにGKEを中心にGitOpsを実践しているチームは、Config
                                Sync等と組み合わせてConfig
                                Connectorを採用すると、アプリケーションとインフラの両方を単一のワークフローで管理できます<sup>[25]</sup>。
                            </p>
                        </div>
                    </div>

                    <h4 id="パッチ管理vm-manager" tabIndex={-1}>パッチ管理（VM Manager）</h4>
                    <p>
                        VM
                        Managerは、大規模なVMフリートのOSインベントリ・脆弱性・パッチ適用を統合管理するツール群です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Patch</td>
                                    <td>
                                        オンデマンド／スケジュールされたパッチ適用と、パッチコンプライアンスのレポート
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>OS inventory management</td>
                                    <td>
                                        OS・カーネルバージョン、インストール済みパッケージ、利用可能な更新の可視化
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>OS policies</td>
                                    <td>
                                        目的とする構成状態（パッケージ、ファイル、systemdユニット等）を宣言的に維持
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/compute/vm-manager/docs/patch">
                                About Patch | VM Manager
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    ラベルを使ってVMフリートを役割（Web／DB）、環境（dev／test／prod）、OSファミリーなどでセグメント化し、パッチ適用のデプロイグループを作成します<sup>[27]</sup>。
                                </li>
                                {' '}
                                <li>
                                    「ディスラプション予算（disruption
                                    budget）」を設定し、一度に更新される（＝一時的に利用不可になる）インスタンス数の上限を制御することで、パッチ適用中もサービス全体の可用性を確保します<sup>[27]</sup>。例えば20台のWebサーバーがある場合、まず数台だけを更新し、残りのインスタンスで負荷を吸収できることを確認してから展開範囲を広げます。
                                </li>
                                {' '}
                                <li>
                                    Google提供イメージ（ビルド日付v20200114以降）にはOS
                                    Configエージェントが標準搭載済みです。古いイメージやカスタムイメージでは手動インストールが必要です<sup>[28]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="235-コンテナオーケストレーションgke-autopilot-vs-standard" tabIndex={-1}>
                        2.3.5 コンテナオーケストレーション：GKE Autopilot vs Standard
                    </h3>
                    <Diagram id="diag-13" label="コンピュート実行形態の選択フロー" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">GKE Autopilot</th>
                                    <th scope="col">GKE Standard</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ノード管理</td>
                                    <td>Googleが完全管理（SSH不可）</td>
                                    <td>利用者がノードプールを構成・管理</td>
                                </tr>
                                <tr className="even">
                                    <td>課金単位</td>
                                    <td>Podが要求したvCPU／メモリ／エフェメラルストレージ</td>
                                    <td>プロビジョニングしたVM（ノード）単位、稼働中は常時課金</td>
                                </tr>
                                <tr className="odd">
                                    <td>セキュリティ既定値</td>
                                    <td>Shielded GKE Nodes、Workload Identityなどがデフォルト有効</td>
                                    <td>個別に設定が必要</td>
                                </tr>
                                <tr className="even">
                                    <td>特権コンテナ／DaemonSet</td>
                                    <td>制限あり（一部許可リストで対応）</td>
                                    <td>制約なし</td>
                                </tr>
                                <tr className="odd">
                                    <td>推奨用途</td>
                                    <td>ほとんどの新規プロジェクト、本番ワークロードの既定選択</td>
                                    <td>
                                        高稼働率で細かくチューニングしたいクラスタ、特殊な要件のある環境
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/choose-cluster-mode">
                                About GKE modes of operation
                            </a>
                            、
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview">
                                GKE Autopilot overview
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                GKEはクラスタ作成後にStandardからAutopilotへ変換することはできないため、モード選定はクラスタ作成前の重要な意思決定です<sup>[29]</sup>。GoogleはAutopilotを「ほとんどの本番ワークロードにおける推奨モード」と位置づけており、セキュリティ・スケーリング・ワークロードに関するベストプラクティスがデフォルトで実装されています<sup>[29]</sup>。特権アクセス、DaemonSetの自由な運用、特定のノード構成が必須要件にあたる場合のみ、Standardモードを検討します。
                            </p>
                        </div>
                    </div>

                    <h3 id="236-サーバーレスコンピューティングcloud-run" tabIndex={-1}>
                        2.3.6 サーバーレスコンピューティング：Cloud Run
                    </h3>
                    <p>
                        Cloud
                        Runは、コンテナイメージをそのままステートレスなHTTPサービスまたはジョブとして実行できるフルマネージドなサーバーレスプラットフォームです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">比較軸</th>
                                    <th scope="col">Cloud Run</th>
                                    <th scope="col">GKE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>インフラ管理</td>
                                    <td>不要（完全サーバーレス）</td>
                                    <td>ノード・クラスタの管理が必要（Standardの場合）</td>
                                </tr>
                                <tr className="even">
                                    <td>スケーリング</td>
                                    <td>リクエストに応じ自動でゼロから拡張</td>
                                    <td>HPA／Cluster Autoscalerで構成が必要</td>
                                </tr>
                                <tr className="odd">
                                    <td>状態管理</td>
                                    <td>ステートレス前提</td>
                                    <td>ステートフルワークロード（DB等）にも対応</td>
                                </tr>
                                <tr className="even">
                                    <td>適したユースケース</td>
                                    <td>API、Webフロントエンド、イベント駆動処理</td>
                                    <td>複雑な依存関係を持つマイクロサービス群、GPU/TPU大規模処理</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gke-and-cloud-run">
                                GKE and Cloud Run
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                Cloud
                                RunとGKEは二者択一ではなく、コストとパフォーマンスに応じて併用するハイブリッド戦略が有効です。ステートレスなマイクロサービスはコスト効率とスケーラビリティを重視してCloud
                                Runで実行し、深いカスタマイズが必要な複雑なステートフルアプリケーションはGKEで実行するという役割分担が推奨されています。両プラットフォームとも標準的なコンテナイメージをデプロイ形式とするため、ワークロードの移行にも高い可搬性があります<sup>[30]</sup>。
                            </p>
                        </div>
                    </div>
                    <hr />

                    <h2 id="24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー" tabIndex={-1}>
                        2.4 Gemini Enterprise Agent Platformを活用したエンドツーエンドMLワークフロー
                    </h2>
                    <blockquote>
                        <p>
                            <strong>用語の変遷に関する注記</strong>：2026年4月22日のGoogle Cloud Next
                            &apos;26にて、これまで「Vertex AI」と呼ばれていたAI／MLプラットフォームは
                            {' '}
                            <strong>Gemini Enterprise Agent Platform</strong>
                            {' '}
                            としてブランドを刷新しました<sup>[31][32]</sup>。既存のVertex
                            AI顧客のコンソール表示は自動的に新ブランドに切り替わり、既存APIは後方互換性を維持したまま利用可能です<sup>[31]</sup>。今後のロードマップはすべてAgent
                            Platformのブランドで提供されるとGoogleは発表しています<sup>[31]</sup>。本ガイドの執筆時点（2026年8月）でこれが最新の公式名称であるため、この名称で解説します。
                        </p>
                    </blockquote>

                    <h3 id="241-gemini-enterprise-agent-platformの全体像" tabIndex={-1}>
                        2.4.1 Gemini Enterprise Agent Platformの全体像
                    </h3>
                    <p>
                        Agent
                        Platformは「構築（Build）」「拡張（Scale）」「ガバナンス（Govern）」「最適化（Optimize）」という4つの柱で構成されています<sup>[32]</sup>。
                    </p>
                    <Diagram id="diag-14" label="Gemini Enterprise Agent Platform の4本柱" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">構成要素</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Agent Development Kit（ADK）</td>
                                    <td>
                                        モデルに依存しないモジュール式のフレームワークで、複雑な推論やツール利用を行うエージェントを構築
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Agent Studio</td>
                                    <td>
                                        コードを書かずにエージェントの推論ループやワークフローを設計・試作できるローコードキャンバス
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Agent Garden</td>
                                    <td>
                                        RAGなどの一般的なパターンを備えた、事前構築済みエージェントサンプルのライブラリ
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Model Garden</td>
                                    <td>Gemini・Claude・Gemma・Grokなど200以上のモデルへのアクセス</td>
                                </tr>
                                <tr className="odd">
                                    <td>RAG Engine</td>
                                    <td>
                                        社内データを安全にLLMへ接続し、回答精度を高めハルシネーションを抑制
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Agent Identity</td>
                                    <td>
                                        エージェントに対して人間の従業員と同様に、きめ細かな権限を付与する仕組み
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview">
                                Agent Platform overview | Gemini Enterprise Agent Platform
                            </a>
                            、
                            <a href="https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform">
                                Introducing Gemini Enterprise Agent Platform
                            </a>
                        </span>
                    </div>

                    <h3 id="242-agent-platform-pipelinesによる自動化とオーケストレーション" tabIndex={-1}>
                        2.4.2 Agent Platform Pipelinesによる自動化とオーケストレーション
                    </h3>
                    <p>
                        手作業でのモデルトレーニング・提供は時間がかかり、繰り返し行う場合はミスも起きやすくなります。Agent
                        Platform Pipelines（旧Vertex AI Pipelines）は、Kubeflow
                        Pipelines互換のサーバーレスなワークフローエンジンとして、ML/AIワークフローの自動化・監視・ガバナンスを実現します<sup>[33]</sup>。
                    </p>
                    <Diagram id="diag-15" label="Agent Platform Pipelines による MLOps ライフサイクル" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コンポーネント</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Training</td>
                                    <td>
                                        サーバーレスなカスタムトレーニング（オンデマンドでリソースをプロビジョニング）、またはハイパーパラメータチューニング
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Model Registry</td>
                                    <td>
                                        学習済みモデルのバージョンを一元管理し、追跡・整理・再学習を効率化
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Feature Store</td>
                                    <td>チーム間で再利用するML特徴量を一元的に保存・提供</td>
                                </tr>
                                <tr className="even">
                                    <td>Model Monitoring</td>
                                    <td>
                                        本番投入後の入力データが学習データから乖離（ドリフト）していないかを継続監視
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/introduction-mlops">
                                MLOps on Gemini Enterprise Agent Platform
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                パイプラインコンポーネントの再利用時はキャッシュを積極的に有効化し、開発サイクルを高速化します。各コンポーネントには処理内容に見合った適切なマシンタイプを選び、Cloud
                                Storage上の古いパイプラインアーティファクトはライフサイクルポリシーで定期的にクリーンアップします。パイプライン自体もコードとして扱い、CI/CDワークフローに統合することが推奨されます<sup>[34]</sup>。
                            </p>
                        </div>
                    </div>

                    <h3 id="243-agent-platformデータ統合の準備" tabIndex={-1}>
                        2.4.3 Agent Platformデータ統合の準備
                    </h3>
                    <p>
                        エンドツーエンドのMLワークフローを組む前提として、以下のデータ統合ポイントを整理しておく必要があります。
                    </p>
                    <ul>
                        <li>
                            <strong>データソースの特定</strong>：BigQuery、Cloud
                            Storage、Spanner、オンプレミスDBなど、学習・推論に使うデータの所在を明確にする。
                        </li>
                        <li>
                            <strong>アクセス制御</strong>：Agent
                            Platformのサービスアカウントに対し、データソースへの最小権限のIAMロールを付与する。
                        </li>
                        <li>
                            <strong>VPC Service Controls連携</strong>：機密データを扱う場合、Agent
                            PlatformのAPI呼び出しをサービス境界の内側に収める。
                        </li>
                        <li>
                            <strong>RAG Engine向けのデータ整備</strong>：社内ドキュメントをベクトル検索可能な形式に変換し、回答のグラウンディングに利用する<sup>[32]</sup>。
                        </li>
                    </ul>

                    <h3 id="244-ai-hypercomputerの活用" tabIndex={-1}>2.4.4 AI Hypercomputerの活用</h3>
                    <p>
                        AI
                        Hypercomputerは、最適化されたハードウェア・オープンソフトウェア・柔軟な消費モデルをシステムレベルで協調設計（co-design）した、Google
                        CloudのAIインフラアーキテクチャです<sup>[35]</sup>。個々のコンポーネントを部分的に改善するのではなく、AIのトレーニング・チューニング・提供全体を通じて効率と生産性を高めることを目的としています<sup>[35]</sup>。
                    </p>
                    <Diagram id="diag-16" label="AI Hypercomputer の協調設計アーキテクチャ" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">層</th>
                                    <th scope="col">主なコンポーネント</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ハードウェア</td>
                                    <td>
                                        Cloud TPU（v5e/v5p/Trillium/Ironwood等）、NVIDIA GPU（A3
                                        Mega等）、Hyperdisk ML
                                    </td>
                                    <td>
                                        トレーニング／推論に最適化された演算・ストレージ・ネットワーク基盤
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>オーケストレーション</td>
                                    <td>GKE（TPU/GPUのマルチホスト対応）</td>
                                    <td>
                                        大規模クラスタでのモデルサーバーを単一の論理ユニットとして一元管理
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>ソフトウェア</td>
                                    <td>JAX、PyTorch/XLA、JetStream、vLLM on TPU</td>
                                    <td>
                                        オープンなMLフレームワークとGoogle製・コミュニティ製の推論エンジン
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>消費モデル</td>
                                    <td>Dynamic Workload Scheduler（Flex Start／カレンダーモード）</td>
                                    <td>開始時刻の保証やコスト最適化に応じた柔軟なリソース調達</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://cloud.google.com/blog/products/ai-machine-learning/introducing-cloud-tpu-v5p-and-ai-hypercomputer">
                                Enabling next-generation AI workloads: Announcing TPU v5p and AI
                                Hypercomputer
                            </a>
                            、
                            <a href="https://cloud.google.com/blog/products/compute/ai-hypercomputer-inference-updates-for-google-cloud-tpu-and-gpu">
                                AI Hypercomputer inference updates
                            </a>
                        </span>
                    </div>
                    <p><strong>TPUとGPUの使い分け</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">Cloud TPU</th>
                                    <th scope="col">NVIDIA GPU</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>得意な領域</td>
                                    <td>
                                        大規模な行列演算、Googleの学習済みフレームワーク（JAX中心）との親和性
                                    </td>
                                    <td>
                                        エコシステムの広さ、CUDA資産の再利用、柔軟なモデルアーキテクチャ
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>利用可能な経路</td>
                                    <td>Compute Engine、GKE、Agent Platform</td>
                                    <td>Compute Engine、GKE、Agent Platform</td>
                                </tr>
                                <tr className="odd">
                                    <td>制約</td>
                                    <td>Google Cloud以外では利用不可（ベンダーロックインの懸念）</td>
                                    <td>複数クラウド・オンプレミスでも利用可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm">
                                TPU architecture | Google Cloud
                            </a>
                            、
                            <a href="https://introl.com/blog/google-tpu-architecture-complete-guide-7-generations">
                                Google TPU Architecture: 7 Generations Explained
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                推論のワークロードでは、TPU向けにはJetStreamやvLLM on
                                TPU、GPU向けにはvLLMやNVIDIA
                                Dynamoといった推論エンジンを選択することで、価格性能比を最適化できます<sup>[36]</sup>。学習開始のタイミングを保証したい場合はDynamic
                                Workload Schedulerのカレンダーモードを、コスト効率を優先する場合はFlex
                                Startモードを検討します<sup>[35]</sup>。
                            </p>
                        </div>
                    </div>
                    <hr />

                    <h2 id="25-agent-platformでの事前構築ソリューションまたはapiの構成" tabIndex={-1}>
                        2.5 Agent Platformでの事前構築ソリューションまたはAPIの構成
                    </h2>
                    <h3 id="251-google-ai-apiの使い分け" tabIndex={-1}>2.5.1 Google AI APIの使い分け</h3>
                    <p>
                        すべてのAI活用がカスタムモデルの学習を必要とするわけではありません。Google
                        Cloudは、画像・動画・音声・テキストのそれぞれに特化した事前学習済みAPIを提供しており、多くのユースケースではこれらを組み合わせるだけで実装が完了します。
                    </p>
                    <Diagram id="diag-17" label="Google AI API 選定フロー" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">API</th>
                                    <th scope="col">主な機能</th>
                                    <th scope="col">代表的なユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Vision</td>
                                    <td>ラベル検出、OCR（文字認識）、SafeSearch、顔検出</td>
                                    <td>
                                        商品画像タグ付け、文書のデジタル化、コンテンツモデレーション
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Video Intelligence</td>
                                    <td>物体追跡、シーン検出、音声の文字起こし</td>
                                    <td>動画アーカイブの検索性向上、字幕生成</td>
                                </tr>
                                <tr className="odd">
                                    <td>Speech-to-Text</td>
                                    <td>85以上の言語での音声認識、話者分離</td>
                                    <td>コールセンターの音声分析、会議の文字起こし</td>
                                </tr>
                                <tr className="even">
                                    <td>Text-to-Speech</td>
                                    <td>自然な音声合成</td>
                                    <td>音声アシスタント、オーディオブック、アクセシビリティ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Natural Language</td>
                                    <td>感情分析、エンティティ抽出、構文解析</td>
                                    <td>レビュー分析、文書分類、チャットボットの意図理解</td>
                                </tr>
                                <tr className="even">
                                    <td>Translation</td>
                                    <td>100以上の言語への翻訳</td>
                                    <td>多言語コンテンツのローカライズ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://cloud.google.com/speech-to-text">
                                Speech-to-Text: AI voice typing &amp; transcription
                            </a>
                            、
                            <a href="https://kartaca.com/en/a-guide-to-googles-powerful-pre-trained-ai-apis/">
                                A Guide to Google&apos;s Powerful Pre-Trained AI APIs
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                Video Intelligence
                                APIの音声文字起こし機能は英語（米国）のみをサポートしているため、他言語の音声を扱う場合はより広い言語をカバーするSpeech-to-Text
                                APIを使う必要があります<sup>[37]</sup>。動画から音声のみを分析したい場合と、映像内の物体やシーンも同時に分析したい場合とで、Speech-to-Text単体を使うかVideo
                                Intelligence APIを使うかを判断します。
                            </p>
                        </div>
                    </div>

                    <h3 id="252-gemini-enterprise機能の統合ai-agentsおよび-notebooklm" tabIndex={-1}>
                        2.5.2 Gemini Enterprise機能の統合（AI Agentsおよび NotebookLM）
                    </h3>
                    <p>
                        Gemini Enterpriseアプリ（旧称の一部はDuet AI/Gemini for
                        Workspaceの流れを汲む）は、Agent
                        Platformで構築したエージェントをエンドユーザーに届ける「フロントドア」の役割を果たします<sup>[33]</sup>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">機能</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Gemini Enterprise AI Agents</td>
                                    <td>
                                        Agent
                                        Platform上で構築したエージェントを、社内ユーザー向けのチャットUIとして展開
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>NotebookLM（Enterprise連携）</td>
                                    <td>
                                        社内ドキュメントを情報源としたリサーチ・要約アシスタントで、Gemini
                                        Enterpriseのデータストアとして統合可能
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Google Chat連携</td>
                                    <td>
                                        カスタムツールを通じてChatメッセージ送信など、既存のワークフローにエージェントを組み込み
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Model Context Protocol（MCP）連携</td>
                                    <td>
                                        Google管理のAgent Search
                                        MCPサーバーなどを通じ、社外のツール・データソースとエージェントを接続
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://codelabs.developers.google.com/ge-gws-agents">
                                Integrate Gemini Enterprise Agents with Google Workspace
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <p>
                                エージェントをGemini
                                Enterpriseアプリに統合する際は、「ブリング・ユア・オウン（bring-your-own）」機能を使ってAgent
                                Runtime上のエージェントを登録・設定する流れになります。データと操作の両面（例：Calendar、Gmail、Drive、NotebookLMのデータストア）を明確に定義し、Google検索や社内データソースとどう組み合わせるかを設計段階で決めておくことが重要です<sup>[33]</sup>。
                            </p>
                        </div>
                    </div>

                    <h3 id="253-model-gardenからのaiモデル統合" tabIndex={-1}>
                        2.5.3 Model GardenからのAIモデル統合
                    </h3>
                    <p>
                        Model
                        Gardenは、Google・パートナー・オープンソースのモデルを一箇所で発見・検証・デプロイできるカタログです<sup>[38]</sup>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">モデル分類</th>
                                    <th scope="col">例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Googleのフラッグシップモデル</td>
                                    <td>
                                        Gemini（マルチモーダル・推論）、Gemma（オープンウェイト）、Veo（動画生成）、Lyria（音楽生成）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>サードパーティモデル</td>
                                    <td>Anthropic Claude、xAI Grok、Mistral AI など</td>
                                </tr>
                                <tr className="odd">
                                    <td>オープンウェイトモデル</td>
                                    <td>DeepSeek、Llama、Qwen など</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-source">
                        <span className="callout-source-label">🔗 出典</span>
                        <span className="callout-source-body">
                            <a href="https://cloud.google.com/model-garden">
                                Model Garden on Gemini Enterprise Agent Platform
                            </a>
                            、
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models">
                                Overview of models on Agent Platform
                            </a>
                        </span>
                    </div>
                    <div className="callout callout-practice">
                        <div className="callout-header">
                            <span className="callout-icon">💡</span>
                            <span>ベストプラクティス</span>
                        </div>
                        {' '}
                        <div className="callout-body">
                            <ul>
                                <li>
                                    Model
                                    Gardenは、モデルごとに一貫したデプロイパターンを提供し、モデルチューニング・評価・提供といったAgent
                                    Platformの他機能とシームレスに連携します<sup>[39]</sup>。
                                </li>
                                {' '}
                                <li>
                                    オープンソースモデルを利用する場合、課金対象は「モデルのチューニング」「モデルのデプロイ（エンドポイントの計算リソース）」「Colab
                                    Enterpriseの利用」に分かれるため、コスト試算の際はこれらを個別に見積もります<sup>[39]</sup>。
                                </li>
                                {' '}
                                <li>
                                    組織ポリシーを使い、Model
                                    Gardenで利用可能なモデルを事前に検証済みのものだけに制限し、それ以外へのアクセスを拒否することができます。ガバナンス要件が厳しい業界（医療・金融など）では特に重要な設定です<sup>[39]</sup>。
                                </li>
                                {' '}
                                <li>
                                    Agent
                                    Garden（プリビルドエージェントのライブラリ）を使うと、RAGパターンなど典型的なユースケースをゼロから実装せずに済み、GitHub上のソースコードを参照して深いカスタマイズも可能です<sup>[40]</sup>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="well-architected-frameworkとの関連" tabIndex={-1}>Well-Architected Frameworkとの関連</h2>
                    <p>
                        Section 2で扱う「管理とプロビジョニング」の意思決定は、
                        <a href="https://cloud.google.com/architecture/framework">Well-Architected Framework</a>
                        の6つの柱すべてに関わります。特に強く関連する柱を整理すると次のとおりです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">柱</th>
                                    <th scope="col">Section 2での主な関連ポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>信頼性（Reliability）</td>
                                    <td>
                                        HA
                                        VPN/Interconnectの冗長構成、リージョン間レプリケーション、バックアップとDR
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>セキュリティ（Security）</td>
                                    <td>
                                        Cloud NGFW/Cloud Armorによる多層防御、共有VPCでの最小権限、Agent
                                        Identityによるエージェントのガバナンス
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>コスト最適化（Cost Optimization）</td>
                                    <td>
                                        Spot VM、ストレージのライフサイクル管理、GKE
                                        Autopilot対Standardの選択
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>パフォーマンス最適化（Performance Optimization）</td>
                                    <td>
                                        ロードバランサーの選択、カスタムマシンタイプ、AI
                                        Hypercomputerでのアクセラレータ選択
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>運用の卓越性（Operational Excellence）</td>
                                    <td>
                                        IaCによる変更管理、VM Managerによるパッチ管理の自動化、Agent
                                        Platform Pipelinesによるガバナンス
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>持続可能性（Sustainability）</td>
                                    <td>ストレージクラスの最適化、需要が低い時間帯でのSpot VM活用</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />

                    <h2 id="学習チェックリスト" tabIndex={-1}>学習チェックリスト</h2>
                    <div className="checklist-card">
                        <div className="checklist-bar">
                            <span className="checklist-counter" id="checklist-counter">
                                {checkedCount}
                                {' '}
                                /
                                {' '}
                                {CHECKLIST_ITEMS.length}
                                {' '}
                                完了
                            </span>
                        </div>
                        <ul className="task-list" id="checklist-list">
                            {CHECKLIST_ITEMS.map((item, idx) => (
                                <li key={item}>
                                    <label className={checkedItems[idx] ? 'checked' : ''}>
                                        <input
                                            type="checkbox"
                                            checked={!!checkedItems[idx]}
                                            onChange={() => toggleCheck(idx)}
                                        />
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />

                    <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <span className="ref-badge">1</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/architecture/best-practices-vpc-design"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Best practices and reference architectures for VPC design
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">2</span>
                            <a
                                className="ref-link"
                                href="https://medium.com/google-cloud/hybrid-cloud-connectivity-cloud-interconnect-vs-ha-vpn-for-modernisation-4ed9729c8bb7"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Hybrid Cloud Connectivity: Cloud Interconnect vs. HA VPN for
                                Modernisation
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">3</span>
                            <a
                                className="ref-link"
                                href="https://oneuptime.com/blog/post/2026-02-17-how-to-deploy-cloud-next-generation-firewall-with-intrusion-detection-on-google-cloud/view"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                How to Deploy Cloud Next Generation Firewall with Intrusion
                                Detection
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">4</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/firewall/docs/about-firewalls"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Cloud NGFW overview | Cloud Next Generation Firewall
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">5</span>
                            <a
                                className="ref-link"
                                href="https://quabyt.com/blog/gcp-networking-best-practices"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                GCP Networking Best Practices: Global VPC, Shared VPC, and Cloud
                                Interconnect
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">6</span>
                            <a
                                className="ref-link"
                                href="https://medium.com/@pbijjala/vpc-design-considerations-for-google-cloud-71ce67427256"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                VPC design considerations for Google Cloud
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">7</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/vpc/docs/shared-vpc"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Shared VPC | Virtual Private Cloud
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">8</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/xpn"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Shared VPC (Compute Engine XPN documentation)
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">9</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/vpc/docs/private-access-options"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Private access options for services | Virtual Private Cloud
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">10</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/load-balancing/docs/https"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                External Application Load Balancer overview
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">11</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/storage/docs/lifecycle"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Object Lifecycle Management | Cloud Storage
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">12</span>
                            <a
                                className="ref-link"
                                href="https://dev.to/andrewll/cloud-storage-in-google-cloud-platform-gcp-the-2026-complete-guide-3f6a"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Cloud Storage in Google Cloud Platform (GCP): The 2026 Complete
                                Guide
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">13</span>
                            <a
                                className="ref-link"
                                href="https://cloudtoolstack.com/learn/gcp-storage-classes-lifecycle"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                GCS Storage Classes &amp; Lifecycle | CloudToolStack
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">14</span>
                            <a
                                className="ref-link"
                                href="https://medium.com/@zaigam22/cloud-sql-vs-spanner-vs-bigtable-vs-bigquery-vs-firestore-48a74b031592"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Cloud SQL vs Spanner vs Bigtable vs BigQuery vs Firestore
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">15</span>
                            <a
                                className="ref-link"
                                href="https://www.gcpexams.com/topics/planning/product-choice-sql/cloudsql-bigquery-firestore-spanner-bigtable.html"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                GCP ACE Prep: Choosing the Right Database
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">16</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/persistent-disk"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Persistent Disk: durable block storage
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">17</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Best practices for Compute Engine disk snapshots
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">18</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/disks/data-protection"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Data protection options for disks and instances
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">19</span>
                            <a
                                className="ref-link"
                                href="https://www.firefly.ai/academy/google-cloud-disaster-recovery"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Google Cloud Disaster Recovery Explained (2026)
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">20</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/machine-resource"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Machine families resource and comparison guide
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">21</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Create a VM with a custom machine type
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">22</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/instances/apply-machine-type-recommendations-for-instances"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Apply machine type recommendations to VM instances
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">23</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Create and use Spot VMs
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">24</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/vmware-engine/docs/best-practices-security"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Best practices for VMware Engine security
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">25</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/docs/terraform/iac-overview"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Infrastructure as Code on Google Cloud
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">26</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/blog/products/devops-sre/how-config-connector-compares-for-infrastructure-management"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Config Connector: An easy way to manage your infrastructure in
                                Google Cloud
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">27</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/blog/products/management-tools/best-practices-for-os-patch-management-on-compute-engine/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Best practices for OS patch management on Compute Engine
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">28</span>
                            <a
                                className="ref-link"
                                href="https://oneuptime.com/blog/post/2026-02-17-how-to-set-up-automatic-os-patch-management-across-a-fleet-of-compute-engine-vms/view"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                How to Set Up Automatic OS Patch Management Across a Fleet of
                                Compute Engine VMs
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">29</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/choose-cluster-mode"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                About GKE modes of operation
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">30</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gke-and-cloud-run"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                GKE and Cloud Run
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">31</span>
                            <a
                                className="ref-link"
                                href="https://pasqualepillitteri.it/en/news/1311/gemini-enterprise-agent-platform-google-next-2026"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Gemini Enterprise Agent Platform: Google Unifies Enterprise AI
                                Agents (Next &apos;26)
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">32</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Introducing Gemini Enterprise Agent Platform | Google Cloud Blog
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">33</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                The new Gemini Enterprise: one platform for agent development
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">34</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/introduction-mlops"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                MLOps on Gemini Enterprise Agent Platform
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">35</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/blog/products/ai-machine-learning/introducing-cloud-tpu-v5p-and-ai-hypercomputer"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Enabling next-generation AI workloads: Announcing TPU v5p and AI
                                Hypercomputer
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">36</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/blog/products/compute/ai-hypercomputer-inference-updates-for-google-cloud-tpu-and-gpu"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                AI Hypercomputer inference updates for Google Cloud TPU and GPU
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">37</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/video-intelligence/docs/feature-speech-transcription"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Speech transcription | Video Intelligence API
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">38</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Overview of models on Agent Platform
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">39</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Overview of Model Garden | Gemini Enterprise Agent Platform
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">40</span>
                            <a
                                className="ref-link"
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/agent-garden"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Agent Garden | Gemini Enterprise Agent Platform
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">41</span>
                            <a
                                className="ref-link"
                                href="https://cloud.google.com/learn/certification/cloud-architect"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Professional Cloud Architect Certification | Learn | Google Cloud
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                        <div className="ref-card">
                            <span className="ref-badge">42</span>
                            <a
                                className="ref-link"
                                href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Professional Cloud Architect Exam Guide (PDF)
                                <span className="ref-arrow">↗</span>
                            </a>
                        </div>
                    </div>

                    <footer className="page-footer">
                        Google Cloud Professional Cloud Architect (PCA) 試験対策ガイド &middot; Section
                        2: Managing and provisioning a cloud solution infrastructure
                    </footer>
                </main>
            </div>
        </div>
    );
}
