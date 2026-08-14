'use client';

import { memo, useState, useEffect } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
  const chart = DIAGRAMS[id];
  if (!chart) return null;
  return (
    <div className="mermaid-wrap">
      <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
    </div>
  );
});


const CHECKLIST_ITEMS: React.ReactNode[] = [
  "VPCはCustom modeで作成し、リージョン・CIDRを明示的に設計した",
  "Private Services Access用の予約範囲に将来の拡張余地を確保した",
  "Cloud Buildの私有プールをVPC Service Controlsパリメータ内に構成した(該当する場合)",
  "VPC Peeringの相手が3つ以上になる場合、NCCへの移行を検討した",
  "カスタムルート交換時に広範な未タグルート(0/1等)が誤ってインポートされないか確認した",
  "Shared VPCのNetwork Userをプロジェクト単位ではなくサブネット単位で最小権限付与した",
  "ホストプロジェクトの課金アカウント解除リスクを運用手順に明記した",
  "限定公開Googleアクセスをサブネット単位で漏れなく設定した",
  "サブネット拡張(縮小不可)を前提にIPAM設計でスーパーネットを予約した",
  "VPC Service Controlsをdry runモードで検証してからenforcedへ切り替えた",
  "VPC accessible servicesで許可リストを明示し、意図しない広範アクセスを防いだ",
  "動的ルートと静的ルートが競合する場合の優先度(priority)を明示的に設計した",
  "マルチリージョン構成では動的ルーティングモードをグローバルに設定した(IPv6は依然リージョナルスコープである点に注意)",
  "ポリシーベースルート(PBR)とBGP route policiesの役割の違いを整理し、適切な方を選定した",
  "BGP route policiesがfail open既定であることを踏まえ、必要な場合は明示的なdropポリシーを追加した",
  "内部LBネクストホップ構成でIP転送(can-ip-forward)を有効化した",
  "トランジットVPC経由のカスタムルート交換で、戻り経路(オンプレ→ワークロードVPC)の広告も設計した",
  "NCCの制御プレーン(スポークステータス・ルート伝播)とデータプレーン(疎通)を切り分けて監視する体制を整えた",
  "BGPセッションフラップとスポークステータス変化にCloud Monitoringアラートを設定した",
  "GKE Pod用セカンダリレンジは将来の最大ノード数から逆算した余裕あるサイズにした",
  "Shared VPC環境でのGKEクラスタ用IAMロール(Network User + Kubernetes Engine Admin等)を確認した",
  "プライベートクラスタのコントロールプレーンアクセスはDNSベースエンドポイント(IAM)を優先検討した",
  <>GKE Dataplane V2使用時、ip-masq-agentの<code>--nomasq-all-reserved-ranges</code>設定を確認した</>,
  "Pod IP枯渇時はdiscontiguous multi-Pod CIDRでの追加レンジ付与を第一選択とする方針を確認した",
  "高頻度DNSクエリが想定されるクラスタでNodeLocal DNSCacheの要否を検討した"
];

function ChecklistSection() {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(CHECKLIST_ITEMS.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    setCheckedState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const checkedCount = checkedState.filter(Boolean).length;

  return (
    <div className="checklist-wrapper">
      <div className="checklist-header">
        <span className="checklist-progress">{checkedCount} / {CHECKLIST_ITEMS.length} 完了</span>
      </div>
      <ul className="task-list checklist-card">
        {CHECKLIST_ITEMS.map((item, idx) => {
          const isChecked = checkedState[idx];
          return (
            <li key={idx}>
              <label className={isChecked ? 'checked' : ''}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCheck(idx)}
                />
                <span className={`checklist-text ${isChecked ? 'is-completed' : ''}`}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function PcneSection2VpcImplementationGuide() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pcne-s2-vpc-implementation-page">
      <div className="layout">
        <NavBar />
        <main className="main">
          
                <div className="hero">
                    <div className="hero-eyebrow">
                        Professional Cloud Network Engineer · Section 2
                    </div>
                    <h1>VPCネットワークの実装</h1>
                </div>

                <blockquote>
                    <p>
                        本ガイドは Google Cloud 認定資格「Professional Cloud Network Engineer
                        (PCNE)」の学習シリーズ第3弾です。公式 Exam Guide 上では
                        <strong>Section 2「Implementing a VPC network」(出題比率
                            約20%、6セクション中2番目)</strong>
                        に対応する内容を、実装レベルで中級者〜上級者向けに詳解します。S1(Section
                        1:設計)で立てた方針を、実際にどのリソースでどう実現するかという「実装」に踏み込みます。なお、Network
                        Connectivity
                        Center(NCC)のスポーク種別・トポロジ・PSC伝播・IP/CIDRフィルタ・トランジティビティ問題については、姉妹編であるS2(Section
                        4)ガイドで詳述済みのため、本ガイドでは要点の再掲とNCC監視・トラブルシューティングの深掘りに絞ります。
                    </p>
                </blockquote>
                <h2 className="" id="この章の位置づけ">この章の位置づけ</h2>
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
                                <td>対応する公式セクション</td>
                                <td>Section 2: Implementing a VPC network</td>
                            </tr>
                            <tr className="even">
                                <td>出題比率</td>
                                <td>約20%(6セクション中、Section 1の21%に次ぐ2番目の配点)</td>
                            </tr>
                            <tr className="odd">
                                <td>前提となる設計知識</td>
                                <td>S1: Section 1.2(VPC設計)、1.4(GKE設計)</td>
                            </tr>
                            <tr className="even">
                                <td>関連ガイド</td>
                                <td>
                                    S4(Section 4:ハイブリッド接続・ネットワーク相互接続)—
                                    NCCのハイブリッドスポーク・トランジティビティ問題の詳細はこちらを参照
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>主要サービス</td>
                                <td>
                                    VPC(ネットワーク/サブネット/ファイアウォール)、Shared VPC、VPC
                                    Service Controls、Cloud Router、Network Connectivity
                                    Center、GKEネットワーキング
                                </td>
                            </tr>
                            <tr className="even">
                                <td>試験ガイド公式ソース</td>
                                <td>
                                    <a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf">Professional Cloud Network Engineer Exam Guide (PDF)</a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>認定ページ</td>
                                <td>
                                    <a href="https://cloud.google.com/learn/certification/cloud-network-engineer">Google Cloud 認定 - Cloud Network Engineer</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 className="" id="21-vpcの構成">2.1 VPCの構成</h2>
                <h3 className="" id="211-vpcリソースの作成">2.1.1 VPCリソースの作成</h3>
                <p>
                    VPCの実装は「ネットワーク」→「サブネット」→「ファイアウォール」→「マネージドサービス接続用の予約範囲」という順序で進めるのが基本です。
                </p>
                <Diagram id="diag-1" label="VPCの実装は「ネットワーク」→「サブネット」→「ファイアウォール」→「マネージドサービス接続用の予約範囲」という順序で進めるのが基本です。" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">リソース</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>VPCネットワーク</td>
                                <td>グローバルリソース。Auto modeまたはCustom modeで作成</td>
                            </tr>
                            <tr className="even">
                                <td>サブネット</td>
                                <td>
                                    リージョナルリソース。Auto
                                    modeは各リージョンに<code>/20</code>を自動作成、Custom
                                    modeは手動でCIDRを指定
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ファイアウォールルール/ポリシー</td>
                                <td>
                                    従来のVPCファイアウォールルール(ネットワーク単位)と、階層ファイアウォールポリシー・グローバル/リージョンネットワークファイアウォールポリシー(Cloud
                                    NGFW)の2系統がある
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Private Services Access用サブネット</td>
                                <td>
                                    Cloud SQLなど「サービスプロデューサ」との内部IP接続に使うVPC
                                    Peering用の予約IPレンジ
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>私有プール(private pools)</td>
                                <td>
                                    Cloud Buildのビルドワーカーをこの VPC
                                    に(サービスプロデューサネットワーク経由で)接続するための予約IPレンジ。VPC
                                    Service
                                    Controlsパリメータ内に作成することでビルド環境からのデータ流出も防止できる
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        本番環境では
                        <strong>Custom mode を選択</strong>し、リージョン・CIDRを明示的に設計します。Auto
                        modeは検証環境やPoC用途に限定するのが安全です。
                    </li>
                    <li>
                        Private Services
                        Access用の予約範囲は、<strong>将来のマネージドサービス追加を見込んで余裕を持ったプレフィックス長</strong>(例:<code>/16</code>)を確保しておきます。作成後の拡張は可能ですが、既存の割当と重複しない範囲を探す手間が発生します。
                    </li>
                    <li>
                        Cloud Buildの私有プールをVPC内に接続する場合、<strong>VPC Service Controls perimeter内に私有プールを作成</strong>することで、ビルドプロセスからの意図しないデータ持ち出しを防止できます。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/create-modify-vpc-networks">Create and manage VPC networks</a>
                        / <a href="https://docs.cloud.google.com/vpc/docs/subnets">Subnets</a> /
                        <a href="https://docs.cloud.google.com/build/docs/private-pools/private-pools-overview">Private pools overview</a>
                        /
                        <a href="https://docs.cloud.google.com/build/docs/private-pools/use-in-private-network">Using Cloud Build in a private network</a>
                    </p>
                </blockquote>
                <h3 className="" id="212-vpc-network-peering">2.1.2 VPC Network Peering</h3>
                <Diagram id="diag-2" label="2.1.2 VPC Network Peering" />
                <p>
                    VPC Network
                    Peeringは同一組織内・異なる組織間を問わず、<strong>推移性(トランジティブ)を持たない</strong>1対1の接続です。既定ではサブネットルートのみが交換され、カスタムルート(静的・動的)や重複するプライベート使用パブリックIP(PUPI)サブネットルートは、双方で明示的にエクスポート/インポートを有効化しない限り交換されません。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        Peering相手が3つ以上に増える場合は、<strong>フルメッシュ運用の複雑さを避けるためNCCへの移行を検討</strong>します(1対1接続の管理コストがO(n²)で増大するため)。
                    </li>
                    <li>
                        カスタムルートを交換する際は、<code>0/1</code>や<code>128/1</code>のような広範な未タグルートが誤って相手側VPCにインポートされ、<strong>マネージドサービスVPCのインターネットegressを壊してしまう事故</strong>に注意します。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/using-vpc-peering">Set up and manage VPC Network Peering</a>
                        /
                        <a href="https://docs.cloud.google.com/vpc/docs/vpc-peering">VPC Network Peering</a>
                    </p>
                </blockquote>
                <h3 className="" id="213-shared-vpc-の構成とiam">2.1.3 Shared VPC の構成とIAM</h3>
                <p>
                    Shared
                    VPCは、ホストプロジェクトが所有するVPCネットワークのサブネットを、複数のサービスプロジェクトから共有利用できる仕組みです。
                </p>
                <Diagram id="diag-3" label="2.1.3 Shared VPC の構成と IAM" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">IAMロール</th>
                                <th scope="col">付与対象</th>
                                <th scope="col">権限範囲</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Shared VPC Admin(<code>compute.xpnAdmin</code>)</td>
                                <td>ネットワーク管理者</td>
                                <td>ホストプロジェクトの有効化、サービスプロジェクトの紐付け</td>
                            </tr>
                            <tr className="even">
                                <td>Network User(<code>compute.networkUser</code>)</td>
                                <td>サービスプロジェクト管理者</td>
                                <td>ホストプロジェクト全体、または特定サブネットのみの利用権限</td>
                            </tr>
                            <tr className="odd">
                                <td>Instance Admin(<code>compute.instanceAdmin</code>)</td>
                                <td>サービスプロジェクト管理者</td>
                                <td>サービスプロジェクト内のVMなどのリソース管理</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        Network
                        Userはプロジェクト単位ではなく、<strong>可能な限りサブネット単位で最小権限付与</strong>します。これにより、あるチームが誤って別チーム用のサブネットにリソースを作成する事故を防げます。
                    </li>
                    <li>
                        ホストプロジェクトには<strong>削除保護のlien(留置権)が自動的に付与</strong>されるため、誤ってShared
                        VPCが解除されるリスクは低いですが、<strong>課金アカウントの接続解除がサービスプロジェクト全体の停止に直結する</strong>点は運用上のリスクとして認識しておく必要があります。
                    </li>
                    <li>
                        GKEクラスタをサービスプロジェクト側に作成する場合、Network Userに加えて
                        <strong>Kubernetes Engine Admin・Compute Instance Admin・Service Account
                            User</strong>
                        をサービスプロジェクト側で付与します。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/shared-vpc">Shared VPC</a> /
                        <a href="https://docs.cloud.google.com/vpc/docs/provisioning-shared-vpc">Provision Shared VPC</a>
                        /
                        <a href="https://docs.cloud.google.com/iam/docs/job-functions/networking">IAM roles for Networking-related Job Functions</a>
                    </p>
                </blockquote>
                <h3 className="" id="214-google-apisマネージドサービスへのプライベートアクセス構成">
                    2.1.4 Google APIs・マネージドサービスへのプライベートアクセス構成
                </h3>
                <Diagram id="diag-4" label="2.1.4 Google APIs・マネージドサービスへのプライベートアクセス構成" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>限定公開Googleアクセス(Private Google Access)</td>
                                <td>
                                    外部IPを持たないVM/GKEノードから、内部的にGoogle
                                    APIs(制限付きVIP <code>199.36.153.4/30</code>または限定公開API
                                    VIP <code>199.36.153.8/30</code>)へアクセス
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Private Service Connect(PSC)</td>
                                <td>
                                    サービスプロデューサ(Google提供・サードパーティ問わず)への接続を、コンシューマVPC内の内部IPエンドポイントとして公開
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Serverless VPC Access</td>
                                <td>
                                    Cloud Run・Cloud
                                    Functions等のサーバーレスサービスからVPC内部リソースへアクセスするためのコネクタ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        限定公開Googleアクセスを有効化する際は、<strong>サブネット単位の設定を漏れなく確認</strong>します(VPCネットワーク全体ではなくサブネットプロパティである点に注意)。
                    </li>
                    <li>
                        オンプレミスから直接プライベートにGoogle APIsへアクセスしたい場合は、<strong>限定公開API VIPへの経路をCloud
                            Routerのカスタムアドバタイズルートでオンプレへ広告</strong>する必要があります(詳細はS2ガイド参照)。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/configure-private-google-access">Configure Private Google Access</a>
                        /
                        <a href="https://docs.cloud.google.com/vpc/docs/private-service-connect">Private Service Connect overview</a>
                    </p>
                </blockquote>
                <h3 className="" id="215-vpcサブネット範囲の拡張">2.1.5 VPCサブネット範囲の拡張</h3>
                <Diagram id="diag-5" label="2.1.5 VPCサブネット範囲の拡張" />
                <p>
                    サブネットのプライマリIPv4範囲は、<strong>ダウンタイムなしで拡張(より大きなCIDRへの変更)のみ可能</strong>です。縮小はできず、拡張後の範囲は既存範囲のスーパーセットであり、かつ他のサブネットやピアリング先のネットワークと重複してはいけません。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        初期構築時に想定より小さいCIDRを割り当ててしまった場合でも、<strong>サブネットは後から拡張できる</strong>ため、致命的な事故にはなりにくい設計です。ただし、拡張時に周辺の未使用アドレス空間を圧迫しないよう、<strong>IPAM設計時点でスーパーネットとして予約</strong>しておくと安全です。
                    </li>
                    <li>
                        Pod用セカンダリレンジのように<strong>GKEで使い切ったセカンダリレンジは置き換えができない</strong>ため(クラスタが不安定になる)、GKE用サブネットは特に慎重な事前設計が必要です(詳細は2.4節)。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://oneuptime.com/blog/post/2026-02-17-how-to-configure-subnet-ip-ranges-and-secondary-ranges-in-gcp-vpc/view">How to Configure Subnet IP Ranges and Secondary Ranges in GCP VPC</a>
                        /
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/alias-ips">VPC-native clusters</a>
                    </p>
                </blockquote>
                <h3 className="" id="216-vpc-service-controls-パリメータの構成">
                    2.1.6 VPC Service Controls パリメータの構成
                </h3>
                <Diagram id="diag-6" label="2.1.6 VPC Service Controls パリメータの構成" />
                <p>
                    VPC Service
                    Controlsは、IAMによるID単位のアクセス制御に加えて、<strong>コンテキストベース(クライアントの種類・デバイス・送信元ネットワーク)のパリメータ</strong>を構成し、データ持ち出し(exfiltration)を防止する仕組みです。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        本番導入前に<strong>dry runモードで違反ログを確認</strong>し、意図しないブロックが発生しないことを検証してから<code>enforced</code>モードへ切り替えます。
                    </li>
                    <li>
                        パリメータ内のVMからパリメータ外のインターネットへ出す必要がある通信は、<strong>制限付きVIP(Restricted VIP)を使ってGoogle APIsへの到達性を維持</strong>しつつ、他のインターネット経路と分離します。
                    </li>
                    <li>
                        パリメータ内で利用可能なサービスを絞り込みたい場合は、<strong>VPC accessible servicesで許可リストを明示</strong>します(既定では全ての「サポート対象サービス」にアクセス可能なため、意図せず広い許可になっていないか確認)。
                    </li>
                    <li>
                        変更の反映には<strong>最大30分程度のタイムラグ</strong>があるため、変更直後の一時的なアクセス拒否は想定内の挙動として運用フローに織り込みます。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc-service-controls/docs/overview">Overview of VPC Service Controls</a>
                        /
                        <a href="https://docs.cloud.google.com/vpc-service-controls/docs/service-perimeters">Service perimeter details and configuration</a>
                        /
                        <a href="https://cloud.google.com/vpc-service-controls/docs/manage-service-perimeters">Manage service perimeters</a>
                        /
                        <a href="https://docs.cloud.google.com/vpc-service-controls/docs/supported-products">Supported products and limitations</a>
                    </p>
                </blockquote>
                <hr />
                <h2 className="" id="22-vpcルーティングの構成">2.2 VPCルーティングの構成</h2>
                <h3 className="" id="221-静的ルーティングと動的ルーティング">
                    2.2.1 静的ルーティングと動的ルーティング
                </h3>
                <Diagram id="diag-7" label="2.2.1 静的ルーティングと動的ルーティング" />
                <p>
                    Google
                    Cloudのルートは「宛先プレフィックス(CIDR)」「ネクストホップ」「優先度(priority)」の3要素で構成されます。動的ルートはCloud
                    Router(BGP)経由で学習され、静的ルートは手動で作成します。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        動的ルート(Interconnect/VPN/Router
                        Appliance経由)と静的ルートが同じ宛先を広告する場合、<strong>優先度(priority)の数値が小さいほうが優先</strong>されるため、意図した経路制御ができているか設計時に明示的に確認します。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/routes">Routes</a> /
                        <a href="https://cloud.google.com/vpc/docs/static-routes">Static routes</a>
                    </p>
                </blockquote>
                <h3 className="" id="222-グローバル--リージョナル動的ルーティングモード">
                    2.2.2 グローバル / リージョナル動的ルーティングモード
                </h3>
                <p>
                    VPCの動的ルーティングモードは、Cloud
                    Routerが学習した経路の有効範囲を決定します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">モード</th>
                                <th scope="col">経路の有効範囲</th>
                                <th scope="col">適した用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>リージョナル(既定)</td>
                                <td>経路を学習したリージョンのみ</td>
                                <td>
                                    単一リージョン構成、リージョンごとに独立した経路制御をしたい場合
                                </td>
                            </tr>
                            <tr className="even">
                                <td>グローバル</td>
                                <td>全リージョンで経路が利用可能</td>
                                <td>
                                    マルチリージョン構成、99.99%
                                    SLAのInterconnectトポロジ(S2ガイド参照)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        IPv6のカスタム学習ルートは、<strong>VPCの動的ルーティングモードがグローバルであっても、リージョナルスコープのまま</strong>という制限があります。IPv6を使ったマルチリージョン設計では見落としやすい点です。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/using-vpc-peering">Set up and manage VPC Network Peering</a>
                    </p>
                </blockquote>
                <h3 className="" id="223-ネットワークタグ優先度によるルーティング">
                    2.2.3 ネットワークタグ・優先度によるルーティング
                </h3>
                <p>
                    静的ルートは、宛先プレフィックスに加えて
                    <strong>送信元VMのネットワークタグ</strong>
                    で適用範囲を絞り込めます。同じ宛先に対して優先度の異なる複数のルートを用意し、タグの有無で異なる経路(例:検査用アプライアンス経由
                    vs 直接経路)を使い分ける設計に利用します。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        タグベースのルーティングは、<strong>タグの付け忘れ・付けすぎが直接セキュリティ/到達性の事故につながる</strong>ため、Infrastructure
                        as Code(Terraform等)でタグとルートの対応関係を一元管理することを推奨します。
                    </li>
                </ul>
                <h3 className="" id="224-グローバル動的ルーティングでのルート優先度ポリシーベースルーティング-vs-bgp-route-policies">
                    2.2.4 グローバル動的ルーティングでのルート優先度:ポリシーベースルーティング vs
                    BGP route policies
                </h3>
                <p>
                    試験ガイドが区別する「ポリシーベースルーティング」と「動的ルーティングでの優先度制御(BGP
                    route policies)」は
                    <strong>別機能</strong>です。混同しやすいため明確に整理します。
                </p>
                <Diagram id="diag-8" label="2.2.4 PBR と BGP route policies の比較" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">ポリシーベースルート(PBR)</th>
                                <th scope="col">BGP route policies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>適用対象</td>
                                <td>VPC内のパケット(送信元IP・プロトコルでマッチ)</td>
                                <td>Cloud RouterのBGPセッションで学習/広告する経路</td>
                            </tr>
                            <tr className="even">
                                <td>記述方法</td>
                                <td>宛先・送信元・プロトコルを指定し内部LBへ転送</td>
                                <td>Common Expression Language(CEL)でterm(条件式)を記述</td>
                            </tr>
                            <tr className="odd">
                                <td>評価順序</td>
                                <td>通常のサブネット/Peering/NCCルートより先に評価</td>
                                <td>ポリシー→term の順に評価、一致した時点で終了(fail open既定)</td>
                            </tr>
                            <tr className="even">
                                <td>主な用途</td>
                                <td>ファイアウォールアプライアンスへのトラフィック強制迂回</td>
                                <td>特定プレフィックスの学習/広告拒否、MED/AS-Pathの書き換え</td>
                            </tr>
                            <tr className="odd">
                                <td>2026年の新機能</td>
                                <td>ー</td>
                                <td>
                                    Policy named
                                    setsで複数プレフィックス/コミュニティをグループ化し再利用可能に
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        PBRは<strong>Cloud Interconnect全体(リージョン単位)にのみ適用可能</strong>で、個別のVLAN
                        Attachment単位には適用できません。GKE・PSC・PGA(限定公開Googleアクセス)と組み合わせる場合は追加の考慮が必要なため、事前にGKE/PSC固有の制限を確認します。
                    </li>
                    <li>
                        BGP route policiesは既定で<strong>fail open</strong>(明示的にドロップしなければ経路は許可)のため、<strong>セキュリティ重視の環境では最後のpeeringに「全ドロップ」ポリシーを明示的に追加</strong>してfail
                        closed相当の挙動を実現します。
                    </li>
                    <li>
                        BGP route
                        policiesは<strong>カスタム学習ルートには適用できない</strong>という制約があるため、カスタム学習ルートとBGP
                        route
                        policiesのどちらで経路を制御すべきか、設計時点で使い分けを明確にします。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/policy-based-routes">Policy-based routes</a>
                        /
                        <a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-route-policies-overview">BGP route policies overview</a>
                        /
                        <a href="https://cloud.google.com/blog/products/networking/bgp-route-policies-top-3-use-cases-by-customer-demand">BGP route policies: Top 3 use cases by customer demand</a>
                        /
                        <a href="https://cloud.google.com/blog/products/networking/routing-in-a-google-cloud-vpc-network">Routing in a Google Cloud VPC network</a>
                    </p>
                </blockquote>
                <h3 className="" id="225-内部パススルーnetwork-load-balancerをネクストホップとして利用">
                    2.2.5 内部パススルーNetwork Load Balancerをネクストホップとして利用
                </h3>
                <Diagram id="diag-9" label="2.2.5 内部パススルーNetwork Load Balancerをネクストホップとして利用" />
                <p>
                    内部パススルーNetwork Load
                    Balancerをネクストホップに指定した静的ルートは、<strong>設定されているフォワーディングルールのプロトコル/ポートに関わらず、全プロトコル・全ポートのトラフィックをヘルシーなバックエンドVMへ転送</strong>します。これによりファイアウォール/ルータアプライアンスVMを高可用構成でスケールアウトできます。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        バックエンドVM(またはネクストホップVM)では
                        <strong>IP転送(can-ip-forward)を有効化</strong>する必要があります。
                    </li>
                    <li>
                        ILBネクストホップの経路は既定では<strong>同一リージョンのリソースにのみ有効</strong>です。マルチリージョンで使う場合は<strong>グローバルアクセスを有効化</strong>します。
                    </li>
                    <li>
                        Auto
                        ScalingするマネージドインスタンスグループとフェイルオーバーILBの組み合わせは、<strong>バックエンド数が動的に変わりフェイルオーバー比率の前提が崩れる</strong>ため非推奨です。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview">Internal passthrough Network Load Balancers as next hops</a>
                        /
                        <a href="https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-ilb-next-hop">Set up internal passthrough Network Load Balancer for third-party
                            appliances</a>
                        /
                        <a href="https://docs.cloud.google.com/load-balancing/docs/internal/deploying-ilb-next-hop-vm">Deploy a hub-and-spoke network by using a load balancer as the next
                            hop</a>
                    </p>
                </blockquote>
                <h3 className="" id="226-vpc-peering--ncc越しのカスタムルートインポートエクスポート">
                    2.2.6 VPC Peering / NCC越しのカスタムルートインポート/エクスポート
                </h3>
                <Diagram id="diag-10" label="2.2.6 VPC Peering / NCC越しのカスタムルートインポート/エクスポート" />
                <p>
                    VPC
                    PeeringおよびNCC双方で、<strong>カスタムルート(静的・動的)は既定で交換されません</strong>。オンプレミス接続を持つ「トランジットVPC」経由で他のVPCからオンプレミスへアクセスさせたい場合、以下の設定が必要です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ステップ</th>
                                <th scope="col">Peeringの場合</th>
                                <th scope="col">NCCの場合</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>トランジット側</td>
                                <td>Export custom routesを有効化</td>
                                <td>ハイブリッドスポークのエクスポート範囲を設定</td>
                            </tr>
                            <tr className="even">
                                <td>ワークロード側</td>
                                <td>Import custom routesを有効化</td>
                                <td>VPCスポークのインポート範囲を設定</td>
                            </tr>
                            <tr className="odd">
                                <td>戻り経路(オンプレ→ワークロードVPC)</td>
                                <td>
                                    オンプレ側ルータへCloud
                                    Routerのカスタムアドバタイズルートでワークロードサブネットを広告
                                </td>
                                <td>同様にカスタムアドバタイズルートが必要</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        Peeringでのカスタムルート交換は、<strong>トランジットVPCが持つ「あらゆる」カスタムルート(他の顧客のオンプレ含む場合も)がまとめてエクスポートされる</strong>点に注意が必要です。特定の経路だけを渡したい場合は、Cloud
                        Routerのカスタムアドバタイズルート機能と組み合わせて絞り込みます。
                    </li>
                    <li>
                        3つ以上のVPCが同じトランジット経路を共有する構成では、<strong>Peeringのフルメッシュではなく、NCCのVPCスポーク+ハイブリッドスポーク構成に切り替える</strong>ことで管理を簡素化できます(詳細は2.3節およびS2ガイド)。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/vpc-peering">VPC Network Peering</a>
                        /
                        <a href="https://cloud.google.com/architecture/ccn-distributed-apps-design/ccn-vnp-vpn-ra">Cross-Cloud Network inter-VPC connectivity using VPC Network Peering</a>
                        / <a href="https://docs.cloud.google.com/vpc/docs/routes">Routes</a>
                    </p>
                </blockquote>
                <h3 className="" id="227-ポリシーベースルーティングの構成">
                    2.2.7 ポリシーベースルーティングの構成
                </h3>
                <p>
                    ポリシーベースルート(PBR)は、宛先IPだけでなく
                    <strong>プロトコル・送信元IPアドレス</strong>
                    も一致条件に含められる特殊なルートです。VPC内・Peering越し・NCC越しのどのサブネットルートよりも先に評価されます。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        PBRの適用は
                        <strong>Cloud Interconnect全体(リージョン単位)</strong> が対象で、個別VLAN
                        Attachmentごとの適用はできません。
                    </li>
                    <li>
                        GKE、PSC、限定公開Googleアクセス(PGA)と併用する場合は特別な設定が必要になるため、それぞれの制限事項を個別に確認してから設計に組み込みます。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/vpc/docs/policy-based-routes">Policy-based routes</a>
                        /
                        <a href="https://docs.cloud.google.com/vpc/docs/use-policy-based-routes">Use policy-based routes</a>
                        /
                        <a href="https://codelabs.developers.google.com/codelabs/cloudnet-pbr">Policy Based Routes (PBR) Codelab</a>
                    </p>
                </blockquote>
                <hr />
                <h2 className="" id="23-network-connectivity-centerの構成">
                    2.3 Network Connectivity Centerの構成
                </h2>
                <blockquote>
                    <p>
                        このセクションはNCCの全体像の要点整理です。スポーク種別の詳細、star/mesh各トポロジの設計判断、PSC伝播、IP/CIDRフィルタの実装詳細、ハイブリッドスポーク特有のトランジティビティ問題の解消方法は、<strong>S2ガイド(Section 4.4)で詳述済み</strong>のためそちらを参照してください。本節ではNCCの監視・トラブルシューティングを新たに深掘りします。
                    </p>
                </blockquote>
                <h3 className="" id="231-スポークタイプとトポロジ管理要点">
                    2.3.1 スポークタイプとトポロジ管理(要点)
                </h3>
                <Diagram id="diag-11" label="2.3.1 スポークタイプとトポロジ管理(要点)" />
                <ul>
                    <li>
                        <strong>VPCスポーク</strong>:VPCネットワーク全体を1つのスポークとして登録
                    </li>
                    <li>
                        <strong>ハイブリッドスポーク</strong>:VLAN Attachment・HA
                        VPNトンネル・Router Applianceのいずれかを登録
                    </li>
                    <li>
                        <strong>プロデューサVPCスポーク</strong>:Private Services
                        Accessで接続されたサービスプロデューサVPCを登録
                    </li>
                    <li>
                        <strong>トポロジ</strong>:スター(center/edgeグループ)、ハブ&amp;スポーク、メッシュから選択(詳細はS2ガイド)
                    </li>
                </ul>
                <h3 className="" id="232-nccの監視トラブルシューティング深掘り">
                    2.3.2 NCCの監視・トラブルシューティング(深掘り)
                </h3>
                <Diagram id="diag-12" label="2.3.2 NCCの監視・トラブルシューティング(深掘り)" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">チェック項目</th>
                                <th scope="col">確認方法</th>
                                <th scope="col">よくある原因</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>スポークのステータス</td>
                                <td>
                                    <code>gcloud network-connectivity spokes list</code>でACTIVE/INACTIVEを確認
                                </td>
                                <td>
                                    ハブの受け入れポリシー(自動 or 手動承認)によりPENDING状態のまま
                                </td>
                            </tr>
                            <tr className="even">
                                <td>BGPセッションのフラップ</td>
                                <td>
                                    Cloud Monitoringの<code>router.googleapis.com</code>系メトリクス
                                </td>
                                <td>オンプレ側ルータのタイマー不一致、回線の瞬断</td>
                            </tr>
                            <tr className="odd">
                                <td>ルート伝播の欠落</td>
                                <td>各スポークの実効ルートテーブルを確認</td>
                                <td>
                                    インポート/エクスポートのCIDRフィルタ範囲不足、VPCスポーク間は静的ルート非対応という仕様上の制約
                                </td>
                            </tr>
                            <tr className="even">
                                <td>PSC伝播の欠落</td>
                                <td>対象VPCスポークでPSCエンドポイントの伝播設定を確認</td>
                                <td>
                                    ハブでのPSC伝播が無効、ルーティングVPCがVPCスポークとして未登録
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>データプレーンの疎通</td>
                                <td>Connectivity Tests / VPC Flow Logs</td>
                                <td>ファイアウォールルールの誤設定、非対称経路</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        NCCのトラブルシューティングは、<strong>「制御プレーン(スポークのステータス・ルート伝播)」と「データプレーン(実際のパケット疎通)」を切り分けて診断</strong>するのが定石です。ルートが正しく伝播していても、ファイアウォールルールでブロックされているケースは非常に多くあります。
                    </li>
                    <li>
                        定常監視では、<strong>BGPセッションのフラップ回数とスポークのステータス変化にCloud
                            Monitoringのアラートポリシーを設定</strong>し、異常を能動的に検知します。
                    </li>
                    <li>
                        複雑なトポロジ変更の後は、<strong>必ずConnectivity Testsで変更前後の到達性を比較</strong>し、意図しない到達性の喪失・追加がないかを確認します。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/support/troubleshooting">Troubleshoot Network Connectivity Center</a>
                        /
                        <a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview">NCC overview</a>
                        /
                        <a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/vpc-spokes-overview">VPC spokes overview</a>
                    </p>
                </blockquote>
                <hr />
                <h2 className="" id="24-gkeクラスタの構成と維持">2.4 GKEクラスタの構成と維持</h2>
                <h3 className="" id="241-vpc-nativeクラスタalias-ip">
                    2.4.1 VPC-nativeクラスタ(alias IP)
                </h3>
                <Diagram id="diag-13" label="2.4.1 VPC-nativeクラスタ(alias IP)" />
                <p>
                    VPC-nativeクラスタは、Pod と Service
                    それぞれに専用のセカンダリIPレンジ(エイリアスIPレンジ)を使用します。ノードのプライマリ範囲・Pod用セカンダリ範囲・Service用セカンダリ範囲は、それぞれ独立して設計します。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        Pod用セカンダリレンジは<strong>クラスタ作成後にサイズ変更できない</strong>ため、最大Pod数(ノードあたりのPod数上限
                        ×
                        想定最大ノード数)から逆算し、<strong>余裕を持って<code>/21</code>など大きめのレンジを既定選択</strong>します。
                    </li>
                    <li>
                        Serviceレンジは既定でGKE管理範囲(<code>34.118.224.0/20</code>相当)が使い回されるため、通常は自前で確保する必要はありません。
                    </li>
                    <li>
                        Podレンジを使い切った場合、<strong>既存レンジの置き換えはクラスタを不安定にする</strong>ため、後述の追加Podレンジ機能で対応します。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/alias-ips">VPC-native clusters</a>
                        /
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/alias-ips">Create a VPC-native cluster</a>
                        /
                        <a href="https://wdenniss.com/k8s/gke-network-planning/">GKE Network Planning</a>
                    </p>
                </blockquote>
                <h3 className="" id="242-shared-vpcでのクラスタ構成">
                    2.4.2 Shared VPCでのクラスタ構成
                </h3>
                <p>
                    Shared
                    VPC環境でGKEクラスタを作成する場合、サービスプロジェクト側の運用者には、ホストプロジェクトのサブネット(プライマリ・Pod用/Service用セカンダリレンジ)に対する
                    <strong>Network User</strong> 権限に加え、サービスプロジェクト側での
                    <strong>Kubernetes Engine Admin</strong> などのロールが必要です。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        ホストプロジェクトの担当チームとサービスプロジェクトの担当チームが分かれる組織では、<strong>GKE用のセカンダリレンジを事前にホスト側で払い出しておき、サービスプロジェクト側は範囲名を指定するだけ</strong>にする運用が、権限分離の観点で望ましいパターンです。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://medium.com/@nikhil.nagarajappa/shared-vpc-iam-permissions-to-create-gke-and-use-subnets-in-service-projects-2422f666d4e5">Shared VPC IAM Permissions to Create GKE and Use Subnets in Service
                            Projects</a>
                    </p>
                </blockquote>
                <h3 className="" id="243-プライベートクラスタとプライベートコントロールプレーンエンドポイント">
                    2.4.3 プライベートクラスタとプライベートコントロールプレーンエンドポイント
                </h3>
                <Diagram id="diag-14" label="2.4.3 プライベートクラスタとプライベートコントロールプレーンエンドポイント" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">アクセス制御の単位</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>IPベース(authorized networks)</td>
                                <td>送信元IPアドレス/CIDR</td>
                                <td>
                                    従来方式。許可リストの継続的なメンテナンスが必要、動的IPの多いCI/CD環境と相性が悪い
                                </td>
                            </tr>
                            <tr className="even">
                                <td>DNSベースエンドポイント</td>
                                <td>IAM(アイデンティティ)</td>
                                <td>
                                    クラスタ固有のFQDNを使用、VPC Service
                                    Controlsと組み合わせてネットワーク+アイデンティティの多層防御が可能、任意のタイミングでIP/DNS方式を有効/無効化できる
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        GitHub
                        Actionsなど<strong>送信元IPが動的に変わるCI/CD環境からプライベートクラスタへ接続する場合、DNSベースエンドポイント+IAMを優先</strong>します。IPベースの許可リストを継続更新する運用は現実的ではありません。
                    </li>
                    <li>
                        公開エンドポイントを無効化していても、<strong>Google管理のスケジュールメンテナンス等では内部的に公開エンドポイントが使用される</strong>ことを理解しておきます(完全にゼロにはならない)。
                    </li>
                    <li>
                        IPベースを使う場合でも、<strong>外部エンドポイントは無効化しauthorized
                            networksで内部エンドポイントへのアクセス元を絞り込む</strong>運用を基本とします。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://cloud.google.com/blog/products/containers-kubernetes/new-dns-based-endpoint-for-the-gke-control-plane/">A new flexible DNS-based approach for accessing the GKE control
                            plane</a>
                        /
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/control-plane-security">Control plane security</a>
                        /
                        <a href="https://cloud.google.com/blog/products/containers-kubernetes/simplifying-gke-cluster-and-control-plane-networking/">Simplifying GKE cluster and control-plane networking</a>
                    </p>
                </blockquote>
                <h3 className="" id="244-gke-dataplane-v2">2.4.4 GKE Dataplane V2</h3>
                <Diagram id="diag-15" label="2.4.4 GKE Dataplane V2" />
                <p>
                    GKE Dataplane
                    V2は、eBPFベースでサービスルーティングとネットワークポリシーを処理する次世代データプレーンです。Kubernetes
                    NetworkPolicyが常時有効になり、Calicoなどのサードパーティアドオンが不要になります。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        Dataplane
                        V2のエージェント(<code>anetd</code>)は、<strong>TCP接続の頻繁な開閉が多いワークロードでCPU使用率が高くなる</strong>傾向があります。該当ワークロードではHTTP
                        Keep-Aliveやコネクションプーリングの実装を推奨します。
                    </li>
                    <li>
                        <code>anetd</code>のメモリ使用量表示は、<strong>ノードの総メモリに比例したeBPFマップの予約分を含む</strong>ため、実際の使用量より大きく見えることがあります。アラート閾値設定時はこの特性を考慮します。
                    </li>
                    <li>
                        eBPFマップは全Service合計で<strong>26万エンドポイントの上限</strong>があるため、大規模クラスタでは事前にサイジングを確認します。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2">GKE Dataplane V2</a>
                    </p>
                </blockquote>
                <h3 className="" id="245-snat送信元natとip-masqueradeポリシー">
                    2.4.5 SNAT(送信元NAT)とIP Masqueradeポリシー
                </h3>
                <p>
                    Pod発信のトラフィックがVPC内の別レンジ(ノードの172.16.0.0/8以外の内部レンジ等)や外部に向かう際、Pod
                    IPのままだと経路上でルーティングできない場合があります。<code>ip-masq-agent</code>は、指定した「非マスカレード対象(nonMasqueradeCIDRs)」以外の宛先に対してPodのソースIPをノードIPへ変換(マスカレード)します。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        GKE Dataplane V2を使用するクラスタでは、<strong><code>ip-masq-agent</code>の<code>--nomasq-all-reserved-ranges</code>は<code>false</code>に設定する必要</strong>があります(Dataplane V2との互換性要件)。
                    </li>
                    <li>
                        非RFC1918のPodアドレス範囲を使っている場合、<strong>既定のnonMasqueradeCIDRsに含まれない</strong>ため、<code>ip-masq-agent</code>のConfigMapで明示的に<code>nonMasqueradeCIDRs</code>を指定する必要があります。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/ip-masquerade-agent">Configuring an IP masquerade agent in Standard clusters</a>
                        /
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/ip-masquerade-agent">IP masquerade agent</a>
                    </p>
                </blockquote>
                <h3 className="" id="246-podレンジserviceレンジの構成と追加podレンジ">
                    2.4.6 Podレンジ・Serviceレンジの構成と追加Podレンジ
                </h3>
                <Diagram id="diag-16" label="2.4.6 Podレンジ・Serviceレンジの構成と追加Podレンジ" />
                <p>
                    クラスタ作成時にPod用セカンダリレンジのサイズは固定されますが、<strong>discontiguous multi-Pod CIDR</strong>機能を使うことで、既存クラスタに対して非連続な追加のPod
                    IPv4レンジを後から割り当てられます。
                </p>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        Pod IP枯渇の兆候(スケジューリング失敗)が見え始めたら、<strong>まずdiscontiguous multi-Pod
                            CIDRでの追加レンジ付与を第一の選択肢</strong>とします。クラスタの再作成は影響範囲が大きいため最終手段とします。
                    </li>
                    <li>
                        追加するセカンダリレンジには、<strong>既存のRFC 1918空間を圧迫しないよう非RFC1918範囲を積極的に活用</strong>することも選択肢です(GKE側は問題なくサポートしています)。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/multi-pod-cidr">Adding Pod IPv4 address ranges</a>
                        /
                        <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/flexible-pod-cidr">Configure maximum Pods per node</a>
                        /
                        <a href="https://wdenniss.com/adding-pod-ip-ranges-to-gke-clusters">Adding Pod IP ranges to GKE clusters</a>
                    </p>
                </blockquote>
                <h3 className="" id="247-gkeのdns構成">2.4.7 GKEのDNS構成</h3>
                <Diagram id="diag-17" label="2.4.7 GKEのDNS構成" />
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
                                <td>kube-dns</td>
                                <td>クラスタ内部のService名前解決を提供する既定のDNS</td>
                            </tr>
                            <tr className="even">
                                <td>NodeLocal DNSCache</td>
                                <td>
                                    各ノード上でDNSクエリをキャッシュし、kube-dnsへの負荷と名前解決レイテンシを削減
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Cloud DNS</td>
                                <td>
                                    VPCスコープの権威DNS。クラスタ外・ハイブリッド環境との名前解決連携に使用
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ベストプラクティス</strong></p>
                <ul>
                    <li>
                        大規模クラスタや高頻度でDNSクエリが発生するワークロードでは、<strong>NodeLocal
                            DNSCacheを有効化してkube-dnsへの負荷集中とDNSタイムアウトの発生を抑制</strong>します。
                    </li>
                    <li>
                        ハイブリッド環境でオンプレミスの名前空間をクラスタ内から解決したい場合は、<strong>Cloud DNSのフォワーディングゾーンと組み合わせる</strong>ことで、kube-dns経由の名前解決をオンプレDNSサーバーへ橋渡しできます(S1ガイドのハイブリッドDNSトポロジも参照)。
                    </li>
                </ul>
                <blockquote className="source-card">
                    <p>
                        <strong>出典</strong>:
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2">GKE Dataplane V2</a>
                    </p>
                </blockquote>
                <hr />
                <h2 className="" id="設計実装チェックリスト">設計・実装チェックリスト</h2>
                <ChecklistSection />
                <h2 className="" id="まとめ">まとめ</h2>
                <p>
                    本ガイド(S3)では、PCNE試験の Section
                    2「VPCネットワークの実装」を、以下の4つの実装領域に沿って解説しました。
                </p>
                <ol type="1">
                    <li>
                        <strong>VPCの構成(2.1)</strong>:ネットワーク/サブネット/ファイアウォールの基本作成、VPC Network
                        Peering、Shared VPCのIAM構成、Google
                        APIsへのプライベートアクセス、サブネット拡張の制約、VPC Service
                        Controlsパリメータ
                    </li>
                    <li>
                        <strong>VPCルーティングの構成(2.2)</strong>:静的/動的ルーティング、グローバル/リージョナル動的ルーティングモード、ポリシーベースルーティングとBGP
                        route
                        policiesの違い、内部LBネクストホップ、Peering/NCC越しのカスタムルート交換
                    </li>
                    <li>
                        <strong>Network Connectivity Centerの構成(2.3)</strong>:スポーク種別・トポロジの要点整理(詳細はS2ガイド)、NCCの監視・トラブルシューティングの深掘り
                    </li>
                    <li>
                        <strong>GKEクラスタの構成と維持(2.4)</strong>:VPC-nativeクラスタのIPアドレス設計、Shared
                        VPCでのGKE、プライベートコントロールプレーン(IP/DNSベース)、Dataplane
                        V2、SNAT/IP Masquerade、Podレンジ拡張、DNS構成
                    </li>
                </ol>
                <p>
                    S1(設計)・S4(ハイブリッド接続)に続き、本ガイド(S2)でVPCそのものの実装がカバーされました。次のガイド候補はSection
                    3(マネージドネットワークサービス:ロードバランシング・Cloud CDN・Cloud
                    DNS)、Section 5(運用・監視・トラブルシューティング)、またはSection
                    6(ネットワークセキュリティ)です。
                </p>
                <hr />
                <h2 className="" id="参考文献">参考文献</h2>
                <div className="ref-grid">
                    <div className="ref-card">
                        <h3 className="">VPCの基本構成</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/create-modify-vpc-networks">Create and manage VPC networks</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/subnets">Subnets</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/configure-private-google-access">Configure Private Google Access</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/private-service-connect">Private Service Connect overview</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">Cloud Build 私有プール</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/build/docs/private-pools/private-pools-overview">Private pools overview</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/build/docs/private-pools/use-in-private-network">Using Cloud Build in a private network</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/build/docs/private-pools/set-up-private-pool-to-use-in-vpc-network">Set up environment to use private pools in a VPC network</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">VPC Network Peering / Shared VPC</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/using-vpc-peering">Set up and manage VPC Network Peering</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/vpc-peering">VPC Network Peering</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/shared-vpc">Shared VPC</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/provisioning-shared-vpc">Provision Shared VPC</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/iam/docs/job-functions/networking">IAM roles for Networking-related Job Functions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">VPC Service Controls</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc-service-controls/docs/overview">Overview of VPC Service Controls</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc-service-controls/docs/service-perimeters">Service perimeter details and configuration</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/vpc-service-controls/docs/manage-service-perimeters">Manage service perimeters</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc-service-controls/docs/supported-products">Supported products and limitations</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">ルーティング(静的/動的/ポリシーベース/BGP route policies)</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/routes">Routes</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/vpc/docs/static-routes">Static routes</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/policy-based-routes">Policy-based routes</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/vpc/docs/use-policy-based-routes">Use policy-based routes</a>
                            </li>
                            <li>
                                <a href="https://codelabs.developers.google.com/codelabs/cloudnet-pbr">Policy Based Routes (PBR) Codelab</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-route-policies-overview">BGP route policies overview</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/blog/products/networking/bgp-route-policies-top-3-use-cases-by-customer-demand">BGP route policies: Top 3 use cases by customer demand</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/blog/products/networking/routing-in-a-google-cloud-vpc-network">Routing in a Google Cloud VPC network</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">内部ロードバランサをネクストホップに使う構成</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview">Internal passthrough Network Load Balancers as next hops</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-ilb-next-hop">Set up internal passthrough Network Load Balancer for
                                    third-party appliances</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/internal/deploying-ilb-next-hop-vm">Deploy a hub-and-spoke network by using a load balancer as the
                                    next hop</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">Network Connectivity Center</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/support/troubleshooting">Troubleshoot Network Connectivity Center</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview">NCC overview</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/vpc-spokes-overview">VPC spokes overview</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">GKEネットワーキング</h3>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/alias-ips">VPC-native clusters</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/alias-ips">Create a VPC-native cluster</a>
                            </li>
                            <li>
                                <a href="https://wdenniss.com/k8s/gke-network-planning/">GKE Network Planning</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/blog/products/containers-kubernetes/new-dns-based-endpoint-for-the-gke-control-plane/">A new flexible DNS-based approach for accessing the GKE control
                                    plane</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/control-plane-security">Control plane security</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/blog/products/containers-kubernetes/simplifying-gke-cluster-and-control-plane-networking/">Simplifying GKE cluster and control-plane networking</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2">GKE Dataplane V2</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/ip-masquerade-agent">Configuring an IP masquerade agent in Standard clusters</a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/multi-pod-cidr">Adding Pod IPv4 address ranges</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/flexible-pod-cidr">Configure maximum Pods per node</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h3 className="">試験ガイド・認定情報</h3>
                        <ul>
                            <li>
                                <a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf">Professional Cloud Network Engineer Exam Guide (PDF)</a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/learn/certification/cloud-network-engineer">Google Cloud 認定 - Cloud Network Engineer</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="page-footer">
                    Google Cloud Professional Cloud Network Engineer 学習ガイド · S3 ·
                    本ページの内容は作成時点の Google Cloud
                    公式ドキュメントに基づきます。最新の仕様は必ず一次情報でご確認ください。
                </div>
            
        </main>
      </div>

      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-top-btn"
          aria-label="ページ上部へ戻る"
        >
          ↑
        </button>
      )}
    </div>
  );
}
