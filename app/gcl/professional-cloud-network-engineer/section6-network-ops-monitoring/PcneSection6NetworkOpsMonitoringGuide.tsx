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

/**
 * PCNE Section 6 ガイドメインコンポーネント
 */
export function PcneSection6NetworkOpsMonitoringGuide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="pcne-s6-page">
            <NavBar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((prev) => !prev)}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="layout">
                <main className="main">{" "}<div className="hero">{" "}<div className="badges">{" "}<span className="badge">Section 5</span>{" "}<span className="badge alt">出題比率 約14%</span>{" "}</div>{" "}<h1>PCNE試験対策ガイド S6: ネットワーク操作と監視</h1>{" "}<p className="subtitle">
                        Google Cloud Professional Cloud Network Engineer(PCNE)認定試験 — Section 5:
                        Managing, monitoring, and troubleshooting network operations（出題比率
                        約14%）
                    </p>{" "}<hr />{" "}</div>{" "}<h2 id="この記事についてスコープ対応表" tabIndex={-1}>この記事について(スコープ対応表)</h2>{" "}<p>
                    本ガイドは、本シリーズで先行して公開したS1(Section 1 設計・計画)、S2(Section 4
                    ハイブリッド接続)、S3(Section 2 VPC実装 / Section 3 Task 3.1
                    ロードバランシング)、S4(Section 3 Task 3.2-3.3 CDN・DNS・IPAM)、S5(Section 6
                    ネットワークセキュリティ)の続編として、公式Exam Guide(PDF)の<strong>Section 5「Managing, monitoring, and troubleshooting network
                        operations</strong>」(出題比率約14%)に厳密に対応する範囲を扱います。ユーザー呼称の「S6」は公式セクション番号とは一致しませんが、これまでのシリーズと同じ命名慣行を踏襲しています。
                </p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">本ガイドの構成</th><th scope="col">公式Exam GuideのTask</th><th scope="col">主な内容</th></tr></thead><tbody><tr className="odd"><td>Part 1</td><td>
                                    Task 5.1 Logging and monitoring with Google Cloud Observability
                                </td><td>
                                    ネットワークコンポーネント別のCloud Loggingログ、Cloud
                                    Monitoringメトリクス
                                </td></tr><tr className="even"><td>Part 2</td><td>
                                    Task 5.2 Maintaining and troubleshooting connectivity issues
                                </td><td>
                                    ALBのトラフィックドレイン、VPN/Interconnect/Cloud Router
                                    BGPのトラブルシューティング、Flow Logs・Firewall Logs・Packet
                                    Mirroringの活用
                                </td></tr><tr className="odd"><td>Part 3</td><td>
                                    Task 5.3 Using Network Intelligence Center to monitor and
                                    troubleshoot common networking issues
                                </td><td>
                                    Network Topology、Connectivity Tests、Performance
                                    Dashboard、Firewall Insights、Network Analyzer、Flow Analyzer
                                </td></tr></tbody></table>{" "}</div>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/learn/certification/cloud-network-engineer">https://cloud.google.com/learn/certification/cloud-network-engineer</a>{" "}</li>{" "}<li>{" "}<a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf">https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<hr />{" "}<h2 id="全体像" tabIndex={-1}>全体像</h2>{" "}<p>
                    Section 5は「作る」フェーズ(Section
                    1〜4)を終えたネットワークを、日々どう<strong>観測し</strong>、<strong>維持し</strong>、<strong>壊れたときに直す</strong>かを問う領域です。試験ガイドは3つのTaskに分かれていますが、実務的には次の1本の流れとして理解すると整理しやすくなります。
                </p>{" "}
<Diagram id="diag-1" label="全体像" />
{" "}<p>
                    この循環の中で、<strong>Task 5.1(収集)</strong> が土台であり、Flow
                    Logs・Firewall Rules Logging・各種メトリクスが有効化されていなければ、Task
                    5.2の切り分けもTask 5.3のNetwork Analyzer/Firewall
                    Insightsのログベースインサイトも機能しません。試験でも「まずロギングとモニタリングが有効化されているか」を問う設問が土台になっている点を意識してください。
                </p>{" "}<hr />{" "}<h2 id="part-1-google-cloud-observabilityによるロギングとモニタリングtask-51" tabIndex={-1}>
                    Part 1: Google Cloud Observabilityによるロギングとモニタリング(Task 5.1)
                </h2>{" "}<h3 id="11-google-cloud-observabilityの基本構造" tabIndex={-1}>
                    1.1 Google Cloud Observabilityの基本構造
                </h3>{" "}<p>
                    Google Cloud Observability(旧Stackdriver)は、<strong>Cloud Logging</strong>(ログ)と<strong>Cloud Monitoring</strong>(メトリクス)を中核としたスイートです。ネットワークコンポーネントの大半は、追加のエージェント導入なしにログとメトリクスを自動的に送信します。
                </p>{" "}
<Diagram id="diag-2" label="1.1 Google Cloud Observabilityの基本構造" />
{" "}<p>
                    試験ガイドが明示的に列挙しているロギング対象コンポーネントは、<strong>Cloud VPN、Cloud Router、VPC Service Controls、Cloud NGFW、Firewall
                        Insights、VPC Flow Logs、Cloud DNS、Cloud NAT、Network Connectivity
                        Center</strong>の8つです。これらはすべてCloud
                    Loggingに自動で書き込まれ、追加課金なしで有効化できるものがほとんどですが、VPC
                    Flow LogsとFirewall Rules Loggingは明示的な設定が必要です。
                </p>{" "}<blockquote className="callout callout-warning">{" "}<div className="callout-header">{" "}<span className="callout-icon">⚠</span><span className="callout-label">注意</span>{" "}</div>{" "}<p>
                        Cloud LoggingとCloud
                        Monitoringは無料枠を超えると、取り込み量(ログ)やサンプル数(メトリクス)に応じた課金が発生します。特にVPC
                        Flow
                        Logsはトラフィック量に比例して急増しやすいため、サンプリングレートやメタデータ注釈の絞り込みが設計上の重要な検討事項になります。
                    </p>{" "}</blockquote>{" "}<h3 id="12-ネットワークコンポーネント別ロギング" tabIndex={-1}>
                    1.2 ネットワークコンポーネント別ロギング
                </h3>{" "}<h4 id="121-vpc-flow-logs" tabIndex={-1}>1.2.1 VPC Flow Logs</h4>{" "}<p>
                    VPC Flow
                    Logsは、VPCネットワーク内を流れるパケットをサンプリングし、5-tuple(送信元/宛先IP、ポート、プロトコル)単位で集約したフローログを生成します。対象となるトラフィックは次のとおりです。
                </p>{" "}<ul>{" "}<li>VMインスタンス(GKEノードを含む)が送受信するパケット</li>{" "}<li>Direct VPC Egressを構成したCloud Runリソースが送受信するパケット</li>{" "}<li>
                        Cloud InterconnectのVLANアタッチメントやCloud VPNトンネルを通過するパケット
                    </li>{" "}</ul>{" "}
<Diagram id="diag-3" label="1.2.1 VPC Flow Logs" />
{" "}<p>
                    VPC Flow
                    Logsは組織レベル・プロジェクトレベル・サブネット/VLANアタッチメント/VPNトンネル単位で個別に構成でき、組織レベルの構成を持つ場合はShared
                    VPC・VPC Network Peering・Network Connectivity
                    Center経由のフローに「クロスプロジェクト注釈」が付与されます。GKEのPodからインターネット向けの通信は、IP
                    masqueradeによって送信元IPがノードIPに変換されるため、既定ではPodの注釈が付きません(Podの注釈を取得したい場合はCloud
                    NATと組み合わせる必要があります)。
                </p>{" "}<p>
                    用途としては、ネットワークフォレンジック(侵害されたIPの特定)、キャパシティプランニング、コスト最適化(トップトーカーの特定)が代表的です。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/flow-logs">https://cloud.google.com/vpc/docs/flow-logs</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/using-flow-logs">https://cloud.google.com/vpc/docs/using-flow-logs</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/about-flow-logs-records">https://cloud.google.com/vpc/docs/about-flow-logs-records</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/access-flow-logs">https://cloud.google.com/vpc/docs/access-flow-logs</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h4 id="122-ファイアウォールルールロギングvpc-firewall-rules--階層型ポリシー--cloud-ngfw" tabIndex={-1}>
                    1.2.2 ファイアウォールルールロギング(VPC Firewall Rules / 階層型ポリシー / Cloud
                    NGFW)
                </h4>{" "}<p>
                    VPC Firewall Rules LoggingはCompute Engine
                    VM(GKEノードを含む)への/からのトラフィックを対象とし、ルールが許可または拒否した通信のたびに「接続レコード」というログエントリを生成します。<strong>Allow系ルール</strong>と<strong>Deny系ルール</strong>でログの挙動が大きく異なる点は頻出ポイントです。
                </p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">項目</th><th scope="col">Allow + ロギング</th><th scope="col">Deny + ロギング</th></tr></thead><tbody><tr className="odd"><td>ログの発生単位</td><td>接続(コネクション)ごとに1回</td><td>一意な5-tupleごとに、パケットが観測されるたびに再発生</td></tr><tr className="even"><td>継続時間中の追加ログ</td><td>
                                    生成されない(ステートフルなため応答トラフィックは記録されない)
                                </td><td>パケットが観測される限り約5秒ごとに繰り返し記録される</td></tr><tr className="odd"><td>既存アクティブ接続へのロギング有効化</td><td>
                                    新規ログは即時生成されない。アイドル10分後、新しいパケットが来た時点で記録される
                                </td><td>該当なし(そもそも許可されていない接続)</td></tr><tr className="even"><td>長時間接続の可視性</td><td>低い(1エントリのみ)</td><td>高い(継続的に記録される)</td></tr></tbody></table>{" "}</div>{" "}<blockquote className="callout callout-best">{" "}<div className="callout-header">{" "}<span className="callout-icon">✅</span><span className="callout-label">ベストプラクティス</span>{" "}</div>{" "}<p>
                        アイドル期間のない長時間ストリームを継続的に可視化したい場合はVPC Firewall
                        Rules LoggingではなくVPC Flow
                        Logsを使用してください。ファイアウォールログは「許可/拒否の判断根拠」を追うのに適し、Flow
                        Logsは「トラフィックの実体」を追うのに適しています。両者は補完関係にあり、片方だけでは不十分なケースが多くあります。
                    </p>{" "}</blockquote>{" "}<p>
                    階層型ファイアウォールポリシーおよびグローバル/リージョナルのネットワークファイアウォールポリシー(Cloud
                    NGFW)でも同様にロギングを有効化でき、ログはCloud
                    Loggingの同じ基盤に書き込まれます。Firewall
                    Insightsが生成するインサイトは、このロギングデータを土台にしています(詳細は<a href="#35-firewall-insights">3.5節</a>)。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://docs.cloud.google.com/firewall/docs/vpc-firewall-rules-logging-overview">https://docs.cloud.google.com/firewall/docs/vpc-firewall-rules-logging-overview</a>{" "}</p>{" "}</blockquote>{" "}<h4 id="123-cloud-routerのログ" tabIndex={-1}>1.2.3 Cloud Routerのログ</h4>{" "}<p>
                    Cloud RouterはBGPセッションの状態変化を3種類のイベントとしてCloud
                    Loggingに記録します。
                </p>{" "}
<Diagram id="diag-4" label="1.2.3 Cloud Routerのログ" />
{" "}<p>
                    ログには「Router event」(タスクの起動/非活性化)、「BGP
                    event」(ピアリングの確立・切断とその理由)、「Route
                    event」(経路の広告・撤回、学習した経路のネクストホップ)の3系統があり、それぞれ<code>[Event Type]: [Log Text]</code>という定型フォーマットで出力されます。障害調査では、まず「BGP
                    event」でセッション断の理由(<code>HOLD_TIMER_EXPIRED</code>、<code>LINK_DOWN</code>など)を確認し、次に「Route
                    event」で経路の広告状況を突き合わせるのが定石です。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/network-connectivity/docs/router/how-to/viewing-logs-metrics">https://cloud.google.com/network-connectivity/docs/router/how-to/viewing-logs-metrics</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-log-messages">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-log-messages</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h4 id="124-cloud-vpnのログ" tabIndex={-1}>1.2.4 Cloud VPNのログ</h4>{" "}<p>
                    Cloud
                    VPNのログは自動的に有効化されており、追加設定は不要です。IKEネゴシエーション、鍵の再交換(rekeying)、SA(セキュリティアソシエーション)の削除といったイベントが記録されます。トンネルが確立後すぐに切断を繰り返す場合、<code>Received SA_DELETE</code>ログの直後に再接続している形跡があれば、オンプレミス側のゲートウェイがrekeyingではなく既存SAの削除後に新規SAをネゴシエートする実装になっている可能性を疑います。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/viewing-logs-metrics">https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/viewing-logs-metrics</a>{" "}</p>{" "}</blockquote>{" "}<h4 id="125-cloud-natのログ" tabIndex={-1}>1.2.5 Cloud NATのログ</h4>{" "}<p>
                    Cloud
                    NATのログエントリには、重大度・プロジェクトIDなど一般的なフィールドに加え、NAT固有の情報(変換前後のIPアドレス・ポート、NAT64の場合は宛先IPv4埋め込みIPv6アドレスなど)が含まれます。ログベースメトリクスへのエクスポートも構成可能です。加えて、Cloud
                    NATは<code>compute.googleapis.com</code>を対象とした監査ログ(Admin Activity /
                    Data Access)も生成します。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/nat/docs/monitoring">https://cloud.google.com/nat/docs/monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/nat/docs/audit-logging">https://cloud.google.com/nat/docs/audit-logging</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h4 id="126-cloud-dnsのログ" tabIndex={-1}>1.2.6 Cloud DNSのログ</h4>{" "}<p>
                    Cloud
                    DNSロギングは、VPCネットワーク内のVM、GKEコンテナ、ピアリング先のゾーン、オンプレミスからのインバウンドフォワーディングなど、さまざまな経路からのDNSクエリを記録します。パブリックゾーンに対する外部からの直接クエリも対象です。既定では無効で、ゾーン単位・ポリシー単位で有効化します。ログには重複するフィールドがあり、一部はモニタリングメトリクスとも共有されています。目安として1万クエリあたり約5MBのログが生成されます。
                </p>{" "}<blockquote className="callout callout-warning">{" "}<div className="callout-header">{" "}<span className="callout-icon">⚠</span><span className="callout-label">注意</span>{" "}</div>{" "}<p>{" "}<code>SERVFAIL</code>を含むログで<code>destinationIP</code>・<code>egressIP</code>・<code>egressError</code>などのフィールドが欠落している場合は、Cloud
                        DNSのトラブルシューティングドキュメントの該当セクションを参照してください。
                    </p>{" "}</blockquote>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://docs.cloud.google.com/dns/docs/monitoring">https://docs.cloud.google.com/dns/docs/monitoring</a>{" "}</p>{" "}</blockquote>{" "}<h4 id="127-vpc-service-controlsの監査ログ" tabIndex={-1}>
                    1.2.7 VPC Service Controlsの監査ログ
                </h4>{" "}<p>
                    VPC Service
                    Controlsは、セキュリティポリシー違反によって拒否されたすべてのアクセスを既定でCloud
                    Loggingに記録します。監査ログは「Audited
                    Resource」というログストリームに書き込まれ、<code>protoPayload.metadata.@type</code>が<code>type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata</code>のログとして特定できます。
                </p>{" "}
<Diagram id="diag-5" label="1.2.7 VPC Service Controlsの監査ログ" />
{" "}<p>
                    組織全体の違反を俯瞰するには<strong>Violation Dashboard</strong>の設定(組織レベルのログシンクとログバケットの構成)が必要で、設定前に発生した違反はバックフィルされません。個別の拒否イベントは、エラーメッセージ中の一意なID(トラブルシューティングトークン)を使い、<strong>Violation Analyzer</strong>または<code>gcloud logging read</code>での直接検索によって原因を特定できます。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/vpc-service-controls/docs/audit-logging">https://docs.cloud.google.com/vpc-service-controls/docs/audit-logging</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/vpc-service-controls/docs/violation-dashboard">https://docs.cloud.google.com/vpc-service-controls/docs/violation-dashboard</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/vpc-service-controls/docs/retrieve-troubleshoot-errors">https://docs.cloud.google.com/vpc-service-controls/docs/retrieve-troubleshoot-errors</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc-service-controls/docs/violation-analyzer">https://cloud.google.com/vpc-service-controls/docs/violation-analyzer</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h4 id="128-network-connectivity-centerのログ" tabIndex={-1}>
                    1.2.8 Network Connectivity Centerのログ
                </h4>{" "}<p>
                    NCC(ハブ・スポーク・NCC Gatewayスポーク)およびRouter
                    applianceに関するログも、Cloud
                    Loggingに一般的なフィールド(重大度・プロジェクトID・タイムスタンプ)とログ種別ごとの詳細情報を伴って記録されます。なお、Router
                    applianceの<strong>ログ</strong>自体はCloud
                    Routerのロギング機構に委譲されており、NCC固有のログとCloud
                    Routerのログを併読する必要がある点に注意してください。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/how-to/viewing-logs-metrics">https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/how-to/viewing-logs-metrics</a>{" "}</p>{" "}</blockquote>{" "}<h3 id="13-ネットワークメトリクスのモニタリング" tabIndex={-1}>
                    1.3 ネットワークメトリクスのモニタリング
                </h3>{" "}<p>
                    試験ガイドが明示するモニタリング対象は、<strong>Cloud VPN、Cloud InterconnectとVLANアタッチメント、Cloud
                        Router、ロードバランサ、Google Cloud Armor、Cloud NAT</strong>の6分野です。いずれも自動的にCloud
                    Monitoringへメトリクスが送信されるため、エージェントのインストールは不要です。
                </p>{" "}
<Diagram id="diag-6" label="1.3 ネットワークメトリクスのモニタリング" />
{" "}<h4 id="131-cloud-vpnのメトリクス" tabIndex={-1}>1.3.1 Cloud VPNのメトリクス</h4>{" "}<p>
                    各トンネルの詳細ページの「Monitoring」タブで、bytes/packetsなどの主要メトリクスをリージョン・ゲートウェイ・トンネル単位でフィルタして確認できます。パケットがドロップされた場合、ゲートウェイはドロップ理由を提供します。
                </p>{" "}<h4 id="132-cloud-interconnectとvlanアタッチメントのメトリクス" tabIndex={-1}>
                    1.3.2 Cloud InterconnectとVLANアタッチメントのメトリクス
                </h4>{" "}<p>
                    Google側でポートを割り当てた時点(接続がまだ使用可能になる前)からメトリクス収集が始まるため、開通前の物理接続の監視やテストにも活用できます。VLANアタッチメント・ワイヤグループについては作成直後からメトリクス収集が始まり、パケット数・バイト数が1分間隔でMonitoringに送信され、6週間保持されます。
                </p>{" "}<p>監視の実務では、次の3層を意識すると原因の切り分けがしやすくなります。</p>{" "}
<Diagram id="diag-7" label="1.3.2 Cloud InterconnectとVLANアタッチメントのメトリクス" />
{" "}<blockquote className="callout callout-warning">{" "}<div className="callout-header">{" "}<span className="callout-icon">⚠</span><span className="callout-label">注意</span>{" "}</div>{" "}<p>
                        VLANアタッチメントのメトリクスは60秒間隔でサンプリングされるため、瞬間的なトラフィックバーストが<code>BANDWIDTH_THROTTLE</code>によるドロップの原因であっても、Ingress/Egressの使用率グラフ上にはスパイクとして現れないことがあります。帯域超過が疑われる場合は、アタッチメントの利用率を下げる、容量を増やす、追加のVLANアタッチメントを使用するといった対応を検討してください。
                    </p>{" "}</blockquote>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/network-connectivity/docs/interconnect/how-to/monitoring">https://cloud.google.com/network-connectivity/docs/interconnect/how-to/monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/interconnect/support/troubleshooting">https://docs.cloud.google.com/network-connectivity/docs/interconnect/support/troubleshooting</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h4 id="133-cloud-routerのメトリクス" tabIndex={-1}>1.3.3 Cloud Routerのメトリクス</h4>{" "}<p>
                    Cloud
                    Routerのメトリクスは、ルータ単位のもの(<code>router-name</code>)とBGPセッション単位のもの(<code>router-name(bgp-name)</code>)の2種類に分かれます。受信経路数・学習経路数を示すメトリクスは動的に学習された経路に関するものであり、Custom
                    learned routes機能とは無関係である点に注意してください。
                </p>{" "}<h4 id="134-ロードバランサのメトリクス" tabIndex={-1}>1.3.4 ロードバランサのメトリクス</h4>{" "}<p>
                    代表的なメトリクスは<code>loadbalancing.googleapis.com/https/request_count</code>、<code>.../total_latencies</code>、<code>.../backend_latencies</code>、<code>.../response_code_count</code>などです。<strong>Total latency</strong>はクライアント〜ロードバランサ〜バックエンドを含む全体のレイテンシ、<strong>Backend latency</strong>はバックエンドの応答時間のみを表すため、両者を切り分けて監視することでアプリケーション側の問題かネットワーク側の問題かを判断できます。SLOを設計する場合、<code>DistributionCut</code>を使ったリクエストベースのSLI(例:「1時間のローリングウィンドウで99%のリクエストが100ms以内」)として表現するのが一般的です。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/https/https-logging-monitoring">https://docs.cloud.google.com/load-balancing/docs/https/https-logging-monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/lb-metrics">https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/lb-metrics</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h4 id="135-google-cloud-armorのメトリクスと運用監視" tabIndex={-1}>
                    1.3.5 Google Cloud Armorのメトリクスと運用監視
                </h4>{" "}<p>
                    Cloud
                    Armorのセキュリティポリシーのメトリクスは、ロードバランサのバックエンドサービスに紐づく形でCloud
                    Monitoringに送信され、ポリシー単位でリクエスト数・ブロック数・レート制限のヒット数などを確認できます。詳細なポリシー種別・WAFルール・DDoS防御・レート制限・bot管理の設計論点は、既刊のS5(Section
                    6ネットワークセキュリティ)ガイドで扱っているため、本ガイドでは監視・運用の観点に絞って要点のみ再掲します。
                </p>{" "}<h4 id="136-cloud-natのメトリクス" tabIndex={-1}>1.3.6 Cloud NATのメトリクス</h4>{" "}<p>
                    Cloud NATはゲートウェイのフリート全体の使用状況をCloud
                    Monitoringに自動送信します。コンソール上のNATゲートウェイ詳細ページの「Monitoring」タブから事前定義ダッシュボードを確認できるほか、<code>Cloud NAT gateway</code>や<code>VM Instance</code>をフィルタしてアラートポリシーを作成できます。Shared
                    VPCでVMとNATゲートウェイが異なるプロジェクトにある場合、VMレベルのメトリクスへのアクセスにはVMが属するプロジェクトの<code>roles/monitoring.viewer</code>、ゲートウェイリソースのメトリクスへのアクセスにはゲートウェイが属するプロジェクトの<code>roles/monitoring.viewer</code>が、それぞれ個別に必要です。
                </p>{" "}<blockquote className="callout callout-best">{" "}<div className="callout-header">{" "}<span className="callout-icon">✅</span><span className="callout-label">ベストプラクティス</span>{" "}</div>{" "}<p>
                        Cloud
                        NATでは「割り当てポートの枯渇」がサイレント障害になりやすい落とし穴です。動的ポート割り当てを使用している場合でも、<code>nat_allocation_failed</code>系のメトリクスやログをアラート対象に含め、ポート使用率が閾値を超えたら通知されるようにしておくことを推奨します。
                    </p>{" "}</blockquote>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://docs.cloud.google.com/nat/docs/monitoring">https://docs.cloud.google.com/nat/docs/monitoring</a>{" "}</p>{" "}</blockquote>{" "}<h3 id="14-task-51-設計運用チェックリスト" tabIndex={-1}>
                    1.4 Task 5.1 設計・運用チェックリスト
                </h3>{" "}<ul className="task-list checklist-card">{" "}<li>{" "}<label><input type="checkbox" />VPC Flow
                            Logsを、少なくとも本番トラフィックが通過するサブネット・VLANアタッチメント・VPNトンネルで有効化しているか(組織レベル/プロジェクトレベルの設定範囲を意図通りに設計しているか)</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />VPC Firewall Rules
                            Loggingを、Allow/Denyそれぞれの目的(可視性 vs.
                            セキュリティ監査)に応じて必要なルールにのみ有効化しているか(全ルールでの一律有効化はログ量爆発のリスクがある)</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Cloud Router・Cloud VPN・Cloud
                            Interconnectのログとメトリクスを組み合わせ、BGPセッション断・トンネル断・帯域劣化を横断的に追跡できるダッシュボードを用意しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Cloud
                            DNSロギングを、少なくとも障害調査が必要になり得るゾーン・ポリシーで有効化しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />VPC Service
                            Controlsを利用している場合、組織レベルのViolation
                            Dashboardを事前に設定し、拒否イベントの発生時に遡って調査できる状態にしているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />ロードバランサのTotal latency/Backend
                            latencyを分離して監視し、SLOのアラート閾値を設定しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Cloud
                            NATのポート割り当て失敗・使用率メトリクスにアラートを設定しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />ログの保持期間・エクスポート先(BigQuery/Cloud
                            Storage/Pub/Sub)をコンプライアンス要件・コスト要件に照らして設計しているか</label>{" "}</li>{" "}</ul>{" "}<hr />{" "}<h2 id="part-2-接続性の維持とトラブルシューティングtask-52" tabIndex={-1}>
                    Part 2: 接続性の維持とトラブルシューティング(Task 5.2)
                </h2>{" "}<h3 id="21-application-load-balancerでのトラフィックドレインリダイレクト" tabIndex={-1}>
                    2.1 Application Load Balancerでのトラフィックドレイン・リダイレクト
                </h3>{" "}<p>
                    バックエンドVMやNEGエンドポイントをローリングアップデート・スケールイン・メンテナンスのために安全に取り除くには、<strong>コネクションドレイニング</strong>(connection
                    draining)を使用します。ドレイニングタイムアウトを設定した状態でインスタンスグループからVMを削除、またはゾーンスコープのNEGからエンドポイントを削除すると、ロードバランサは新規接続を即座に停止しつつ、既存のリクエスト/接続には完了までの猶予を与えます。
                </p>{" "}
<Diagram id="diag-8" label="2.1 Application Load Balancerでのトラフィックドレイン・リダイレクト" />
{" "}<p>ロードバランサの種類によって挙動に差異があります。</p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">ロードバランサ種別</th><th scope="col">ドレイニング中の挙動</th></tr></thead><tbody><tr className="odd"><td>Application Load Balancer(L7)</td><td>
                                    指定したタイムアウトの間、既存リクエストの完了を待つ。新規リクエストは送られない
                                </td></tr><tr className="even"><td>Proxy Network Load Balancer</td><td>既存のTCPコネクションはタイムアウト期間中も動作を継続する</td></tr><tr className="odd"><td>内部パススルーNetwork Load Balancer(フェイルオーバー時)</td><td>{" "}<code>disableConnectionDrainOnFailover</code>と<code>dropTrafficIfUnhealthy</code>で挙動を制御。既定のドレイニングタイムアウトは固定10分
                                </td></tr></tbody></table>{" "}</div>{" "}<p>
                    トラフィックの計画的な移動には、バックエンドサービスの<strong>capacity scaler</strong>も併用します。<code>0</code>(完全ドレイン、単一バックエンドの場合は設定不可)から<code>1.0</code>(100%)まで手動で目標キャパシティを調整でき、メンテナンス前にトラフィックを段階的に他のバックエンドへ寄せる、といった運用が可能です。GKE環境では、Podの<code>preStop</code>フックの実行時間を「Backend
                    Service Drain Timeout +
                    ドレインレイテンシ(目安1分)」以上に設定し、<code>terminationGracePeriodSeconds</code>を十分に長く取ることで、NEGからのエンドポイント除去とPodの終了を同期させます。
                </p>{" "}<blockquote className="callout callout-best">{" "}<div className="callout-header">{" "}<span className="callout-icon">✅</span><span className="callout-label">ベストプラクティス</span>{" "}</div>{" "}<p>
                        リージョナル外部パススルーNetwork Load
                        Balancerでは、フォワーディングルールの<strong>トラフィックステアリング</strong>を使い、特定の送信元IPレンジだけを別のバックエンドサービス(異なるヘルスチェックやドレイニング設定を持つ)へ振り向けることができます。これはカナリアリリースやトラブルシューティング目的のトラフィック分離に有効です。
                    </p>{" "}</blockquote>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/enabling-connection-draining">https://docs.cloud.google.com/load-balancing/docs/enabling-connection-draining</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/load-balancing">https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/load-balancing</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/load-balancing/docs/backend-service">https://cloud.google.com/load-balancing/docs/backend-service</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service">https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/internal/failover-overview">https://docs.cloud.google.com/load-balancing/docs/internal/failover-overview</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="22-cloud-vpnの管理とトラブルシューティング" tabIndex={-1}>
                    2.2 Cloud VPNの管理とトラブルシューティング
                </h3>{" "}<p>
                    Cloud
                    VPNのトラブルシューティングは、コンソールの「VPN」ページでトンネルステータスとBGPセッションステータスの両方を確認するところから始めます。HA
                    VPNではさらに、99.99%
                    SLAを満たすための<strong>高可用性ステータス</strong>(両インターフェースのトンネルが正しくオンプレミス側の冗長構成と対になっているか)も確認が必要です。
                </p>{" "}
<Diagram id="diag-9" label="2.2 Cloud VPNの管理とトラブルシューティング" />
{" "}<p>
                    代表的な作成失敗パターンとして、ピアIPアドレスがRFC
                    5735/5737の予約アドレス範囲に該当しているケースが挙げられます。この場合、構成時のIPレンジを見直す必要があります。また、Cloud
                    VPNは既定でSAの有効期限が切れる前に自動的に再ネゴシエート(rekeying)しますが、オンプレミス側のゲートウェイがこれに対応しておらず、既存SAの削除後にのみ新規SAをネゴシエートする実装だと、接続が周期的に瞬断します。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/support/troubleshooting">https://docs.cloud.google.com/network-connectivity/docs/vpn/support/troubleshooting</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/checking-vpn-status">https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/checking-vpn-status</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/viewing-logs-metrics">https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/viewing-logs-metrics</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="23-cloud-interconnectの管理とトラブルシューティング" tabIndex={-1}>
                    2.3 Cloud Interconnectの管理とトラブルシューティング
                </h3>{" "}<p>
                    Cloud Interconnectのトラブルシューティングは、<a href="#132-cloud-interconnectとvlanアタッチメントのメトリクス">1.3.2節</a>で紹介した「物理層・論理層・ルーティング層」の3層モデルに沿って切り分けるのが基本です。
                </p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">症状</th><th scope="col">疑うべき層</th><th scope="col">確認方法</th></tr></thead><tbody><tr className="odd"><td>接続自体が確立しない/光レベル異常</td><td>物理層</td><td>{" "}<code>gcloud compute interconnects get-diagnostics</code>でTx/Rx光レベルと稼働状態を確認
                                </td></tr><tr className="even"><td>特定のVLANアタッチメントだけ帯域が頭打ち</td><td>論理層</td><td>
                                    VLANアタッチメントのMonitoringタブでingress/egress利用率、<code>BANDWIDTH_THROTTLE</code>ドロップの有無を確認(60秒サンプリングのためバーストは見えにくい点に注意)
                                </td></tr><tr className="odd"><td>経路が広告されない/学習されない</td><td>ルーティング層</td><td>
                                    Cloud
                                    RouterのBGPセッション状態、<code>advertisedRoutes</code>フィールドを確認
                                </td></tr><tr className="even"><td>暗号化VLANアタッチメントの削除に失敗する</td><td>論理層(MACsec)</td><td>
                                    MACsec構成済みのDedicated/Partner
                                    Interconnectでは、削除前にMACsec設定の解除が必要な場合がある
                                </td></tr></tbody></table>{" "}</div>{" "}<p>
                    HA VPN over Cloud Interconnectのような複合構成では、「Cloud
                    Interconnect層(VLANアタッチメント間のBGP)」と「HA
                    VPN層(オンプレミスとVPCの間のBGP)」という2階層のBGPが存在するため、どちらの層で問題が起きているかを切り分けることが重要です。具体的には、まずCloud
                    Interconnect層のCloud Routerで<code>gcloud compute routers get-status</code>を実行し、<code>advertisedRoutes</code>にHA
                    VPNゲートウェイのアドレスが含まれているかを確認し、次にHA
                    VPN層のBGPセッションを確認するという順序になります。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/interconnect/support/troubleshooting">https://docs.cloud.google.com/network-connectivity/docs/interconnect/support/troubleshooting</a>{" "}</p>{" "}</blockquote>{" "}<h3 id="24-cloud-routerのbgpピアリングのトラブルシューティング" tabIndex={-1}>
                    2.4 Cloud RouterのBGPピアリングのトラブルシューティング
                </h3>{" "}<p>
                    BGPセッションは、確立までに複数の状態を遷移します。試験では状態遷移の理解に加え、「どのログ/メトリクスでどの状態を確認するか」が問われます。
                </p>{" "}
<Diagram id="diag-10" label="2.4 Cloud RouterのBGPピアリングのトラブルシューティング" />
{" "}<p>代表的な障害パターンと対処の要点は次のとおりです。</p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">障害パターン</th><th scope="col">原因</th><th scope="col">対処</th></tr></thead><tbody><tr className="odd"><td>ローカルASNとピアASNの重複</td><td>
                                    同一リージョン・同一ネットワーク内で同じASNを持つオンプレミスデバイスとセッションを試みている
                                </td><td>Cloud RouterまたはオンプレミスルータのASN設計を見直す</td></tr><tr className="even"><td>MD5認証エラー(<code>MD5_AUTH_INTERNAL_PROBLEM</code>)</td><td>Cloud Router内部でMD5認証設定に失敗(内部エラー)</td><td>通常は自動復旧を待つ(1時間以上続く場合はサポートに連絡)</td></tr><tr className="odd"><td>MD5認証エラー(鍵不一致)</td><td>Cloud Routerとピアの事前共有鍵(認証キー)が一致していない</td><td>認証キーを更新して再同期</td></tr><tr className="even"><td>最大経路数超過によるセッション遮断</td><td>オンプレミスルータが5,000プレフィックスを超えて広告</td><td>{" "}<code>CEASE/MAX_PREFIXES_REACHED</code>ログを確認し、広告プレフィックス数を削減するか、手動でBGPピアリングをリセット
                                </td></tr><tr className="odd"><td>BGPフラップ(定期的な切断)</td><td>Cloud Routerのソフトウェアメンテナンスイベント</td><td>
                                    オンプレミスルータでGraceful
                                    Restartに対応し、ホールドタイマーを60秒以上に設定していれば通常は問題ない
                                </td></tr><tr className="even"><td>BFDの検知タイムアウト</td><td>制御パケットが検知タイマー(既定5,000ms)以内に届かない</td><td>BFDのMinRx/MinTx間隔・マルチプライヤの双方一致を確認</td></tr></tbody></table>{" "}</div>{" "}<p>BFDを併用している場合は、BGPとは独立した状態機械としてBFDの状態を確認します。</p>{" "}
<Diagram id="diag-11" label="2.4 Cloud RouterのBGPピアリングのトラブルシューティング" />
{" "}<p>
                    BFDの診断コード(<code>NO_DIAGNOSTIC</code>、<code>CONTROL_DETECTION_TIME_EXPIRED</code>、<code>NEIGHBOR_SIGNALED_SESSION_DOWN</code>、<code>ADMINISTRATIVELY_DOWN</code>など)は、<code>gcloud compute routers get-status</code>の<code>bfdStatus</code>フィールドで確認できます。BFDとBGP Graceful
                    Restartを併用している場合、Cloud
                    Routerの再起動時にはBFDへ<code>AdminDown</code>を送信して意図的に停止し、その間BGPセッション自体はオンプレミス側でGraceful
                    Restartモードとして維持される、という設計になっている点も理解しておく必要があります。
                </p>{" "}<blockquote className="callout callout-warning">{" "}<div className="callout-header">{" "}<span className="callout-icon">⚠</span><span className="callout-label">注意</span>{" "}</div>{" "}<p>
                        ICMPv6 pingはCloud
                        RouterのBGPアドレスに対してサポートされていません。レイヤー3疎通確認にはICMPv4
                        pingを使用してください。
                    </p>{" "}</blockquote>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-sessions">https://cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-sessions</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-peering">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-peering</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-states">https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-states</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-log-messages">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-log-messages</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd">https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd-states">https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd-states</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-routes">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-routes</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="25-vpc-flow-logsファイアウォールログpacket-mirroringを使ったトラブルシューティング" tabIndex={-1}>
                    2.5 VPC Flow Logs・ファイアウォールログ・Packet
                    Mirroringを使ったトラブルシューティング
                </h3>{" "}<p>
                    3つのツールはそれぞれ異なる「見え方」を提供するため、組み合わせて使うことで根本原因への到達が早まります。
                </p>{" "}
<Diagram id="diag-12" label="2.5 VPC Flow Logs・ファイアウォールログ・Packet Mirroringを使ったトラブルシューティング" />
{" "}<p>
                    VPC Flow
                    Logsは「通信があったかどうか、どれだけの量か」を5-tuple単位で示しますが、パケットのペイロード自体は含みません。ペイロードレベルでの分析(アプリケーションプロトコルの異常、侵入検知システムとの連携など)が必要な場合は<strong>Packet Mirroring</strong>を使用します。
                </p>{" "}
<Diagram id="diag-13" label="2.5 VPC Flow Logs・ファイアウォールログ・Packet Mirroringを使ったトラブルシューティング" />
{" "}<p>Packet Mirroringの主な制約・特性は次のとおりです。</p>{" "}<ul>{" "}<li>
                        ミラー対象とコレクタ宛先は同一プロジェクト・同一リージョンである必要がある(コレクタは同一VPCまたはVPC
                        Network Peeringで接続されたVPCに配置可能)
                    </li>{" "}<li>
                        1つのミラーリングポリシーが参照できるコレクタ宛先は1つだが、1つのコレクタ宛先を複数のポリシーから参照することは可能
                    </li>{" "}<li>
                        ミラーリングとコレクションを同一VMの同一NICで行うと、ミラーリングループが発生するため不可
                    </li>{" "}<li>
                        GKEの同一ノード上のPod間通信をミラーリングするには、クラスタでIntranode
                        visibilityを有効化する必要がある
                    </li>{" "}<li>
                        VPC Flow
                        Logsはミラーされたパケット自体をログしない。ただしコレクタインスタンスが属するサブネットでFlow
                        Logsが有効な場合、コレクタ宛の直接トラフィック(元の宛先IPがコレクタのIPと一致する場合)は通常どおり記録される
                    </li>{" "}<li>
                        ミラーリングは元パケットとミラーパケットの両方を処理するため、処理レート(スループット)が低下する。低下幅はマシンタイプ・CPU使用率・パケットサイズに依存する
                    </li>{" "}</ul>{" "}<p>
                    Packet
                    Mirroringのモニタリングでは、ミラー対象VM側で「ミラーされたネットワークバイト数/パケット数」(成功・ドロップ両方)を確認できますが、コレクタ側のドロップパケット数は個別には提供されません(コレクタ側の監視は内部パススルーNLBのロギング・モニタリングに準じます)。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/packet-mirroring">https://cloud.google.com/vpc/docs/packet-mirroring</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/using-packet-mirroring">https://cloud.google.com/vpc/docs/using-packet-mirroring</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/monitoring-packet-mirroring">https://cloud.google.com/vpc/docs/monitoring-packet-mirroring</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="26-task-52-トラブルシューティングチェックリスト" tabIndex={-1}>
                    2.6 Task 5.2 トラブルシューティングチェックリスト
                </h3>{" "}<ul className="task-list checklist-card">{" "}<li>{" "}<label><input type="checkbox" />ロードバランサのバックエンド入れ替え手順に、コネクションドレイニングのタイムアウトとGKEの<code>preStop</code>/<code>terminationGracePeriodSeconds</code>の整合を組み込んでいるか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Cloud
                            VPNトラブル時に、まずトンネルステータス→BGPセッションステータス→高可用性ステータスの順で確認する手順が周知されているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Cloud
                            Interconnect障害時に、物理層・論理層・ルーティング層のどこで問題が起きているかを<code>get-diagnostics</code>やVLANアタッチメントのメトリクスで切り分けられるか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />HA VPN over Cloud
                            Interconnectのような複合構成で、どちらの層のBGPセッションが問題かを区別する手順があるか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />BGPフラップの許容範囲(ホールドタイマー、Graceful
                            Restart対応)をオンプレミス側と合意しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />BFDのMinRx/MinTx/マルチプライヤの設定値がCloud
                            Router側とオンプレミス側で一致しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />「疎通しない」問い合わせに対し、Flow
                            Logs→Firewall Logs→Connectivity Tests→Packet
                            Mirroringの順で切り分ける標準手順があるか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Packet
                            Mirroringのコレクタにマネージドインスタンスグループ(オートスケーリング/オートヒーリング)を使用しているか</label>{" "}</li>{" "}</ul>{" "}<hr />{" "}<h2 id="part-3-network-intelligence-centerによる監視とトラブルシューティングtask-53" tabIndex={-1}>
                    Part 3: Network Intelligence Centerによる監視とトラブルシューティング(Task 5.3)
                </h2>{" "}<h3 id="31-network-intelligence-centerの全体像" tabIndex={-1}>
                    3.1 Network Intelligence Centerの全体像
                </h3>{" "}<p>
                    Network Intelligence Center(NIC)は、Google
                    Cloudネットワークの可視化・監視・トラブルシューティングを1つのコンソールに統合したプラットフォームです。2019年の提供開始時点ではConnectivity
                    TestsとNetwork Topologyがベータ、Performance DashboardとFirewall Metrics &
                    Insightsがアルファでしたが、現在は6つのモジュールが揃っています。
                </p>{" "}
<Diagram id="diag-14" label="3.1 Network Intelligence Centerの全体像" />
{" "}<p>各モジュールの役割を一言でまとめると次のようになります。</p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">モジュール</th><th scope="col">主な問い</th><th scope="col">分析の性質</th></tr></thead><tbody><tr className="odd"><td>Network Topology</td><td>「今、どこにどれだけのトラフィックが流れているか」</td><td>リアルタイムのテレメトリ + 構成情報の可視化</td></tr><tr className="even"><td>Connectivity Tests</td><td>「AからBへ到達できるか、できないなら何が阻んでいるか」</td><td>構成分析(+一部でデータプレーン検証)</td></tr><tr className="odd"><td>Performance Dashboard</td><td>
                                    「ゾーン/リージョン間のパケットロス・レイテンシはどの程度か」
                                </td><td>実トラフィックに基づく能動的プロービング</td></tr><tr className="even"><td>Firewall Insights</td><td>「このファイアウォールルールは安全に削除・厳格化できるか」</td><td>ロギングデータ + 機械学習予測</td></tr><tr className="odd"><td>Network Analyzer</td><td>「構成に誤りや非効率はないか」</td><td>構成の自動巡回監視(プッシュ型)</td></tr><tr className="even"><td>Flow Analyzer</td><td>「Flow Logsから見える実際の通信パターンは何か」</td><td>SQLレスなFlow Logs分析(BigQuery基盤)</td></tr></tbody></table>{" "}</div>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/blog/products/networking/announcing-network-intelligence-center">https://cloud.google.com/blog/products/networking/announcing-network-intelligence-center</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/overview">https://docs.cloud.google.com/network-intelligence-center/docs/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs">https://docs.cloud.google.com/network-intelligence-center/docs</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="32-network-topology" tabIndex={-1}>3.2 Network Topology</h3>{" "}<p>
                    Network
                    Topologyは、構成情報とリアルタイムの運用データを1つのグラフに統合して可視化するツールです。<strong>Infrastructure view</strong>ではVPCネットワーク、オンプレミスとのハイブリッド接続、Google管理サービスへの接続とそれらのメトリクスを表示し、<strong>GKE Enterprise view</strong>ではクラスタ・ネームスペース・ワークロード・Podとそのメトリクスを表示します。
                </p>{" "}<p>
                    活用の典型例は、特定のCloud
                    VPNトンネルやVLANアタッチメントを流れるトラフィック量をエンティティ単位で確認し、Shared
                    VPCの他プロジェクトやリージョン間トラフィックへの影響を把握することです。エンティティをクリックすると、そのエンティティを通過するすべてのトラフィックパスがハイライトされます。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<p>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/network-topology/reference/metrics-reference">https://cloud.google.com/network-intelligence-center/docs/network-topology/reference/metrics-reference</a>{" "}</p>{" "}</blockquote>{" "}<h3 id="33-connectivity-tests" tabIndex={-1}>3.3 Connectivity Tests</h3>{" "}<p>
                    Connectivity
                    Testsは、送信元と宛先(VM、GKEクラスタ、ロードバランサのフォワーディングルール、インターネット上のIPアドレスなど)を指定し、その間のパケットが実際にどう転送されるかを<strong>シミュレーション</strong>するツールです。分析は2種類に分かれます。
                </p>{" "}
<Diagram id="diag-15" label="3.3 Connectivity Tests" />
{" "}<p>総合到達性の結果は4値のいずれかです。</p>{" "}<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">結果</th><th scope="col">意味</th></tr></thead><tbody><tr className="odd"><td>Reachable</td><td>現在の構成でトラフィックが送信元から宛先へ到達できる</td></tr><tr className="even"><td>Unreachable</td><td>
                                    経路上のどこかでトラフィックが遮断されている(トレースにドロップ箇所が示される)
                                </td></tr><tr className="odd"><td>Ambiguous</td><td>
                                    複数トレースの最終状態が混在している(例:
                                    一部バックエンドは到達可能、一部は不可)
                                </td></tr><tr className="even"><td>Undetermined</td><td>エラー、非対応の入力、権限不足などにより判定不能</td></tr></tbody></table>{" "}</div>{" "}<blockquote className="callout callout-warning">{" "}<div className="callout-header">{" "}<span className="callout-icon">⚠</span><span className="callout-label">注意</span>{" "}</div>{" "}<p>
                        Ambiguousの典型的な原因の1つは、閲覧権限のない階層型ファイアウォールポリシーをトレースが参照している場合です。ポリシー自体の閲覧権限がなくても、自分のVPCネットワークに適用される実効ルールは「Effective
                        firewall
                        rules」で確認できます。また、構成分析でReachableと判定されても、実際にはデータプレーンで100%パケットロスが発生している場合があります。これは構成分析とデータプレーン分析が別物であるためで、対応シナリオではデータプレーン検証も併用して裏取りすることが推奨されます。
                    </p>{" "}</blockquote>{" "}<p>
                    Google管理サービス(Cloud
                    SQL、GKEなど)を宛先とするテストも作成できますが、Google所有プロジェクト内のリソースについては閲覧権限がないため、トレースの詳細(具体的にどのルール・ルートが適用されたか)は表示されず、総合到達性の結果のみが返されます。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/state-tables">https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/state-tables</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/reachability">https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/reachability</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/support/troubleshooting">https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/support/troubleshooting</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/test-google-managed-services">https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/test-google-managed-services</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview">https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="34-performance-dashboard" tabIndex={-1}>3.4 Performance Dashboard</h3>{" "}<p>
                    Performance Dashboardは、Google
                    Cloudネットワーク全体、および自分のプロジェクトのリソースに関するパケットロスとレイテンシ(RTT)を可視化します。セットアップは不要で、十分な数のVMがあればパケットロスメトリクスが、十分なトラフィック量があればレイテンシメトリクスが自動的に得られます。
                </p>{" "}
<Diagram id="diag-16" label="3.4 Performance Dashboard" />
{" "}<p>
                    代表的な活用パターンは、アプリケーションで性能問題が疑われたときに「まずPerformance
                    Dashboardでネットワーク側に異常がないかを確認し、異常がなければアプリケーション側を疑う」という切り分けです。自分のプロジェクトの値と、Google
                    Cloud全体の同一ゾーン/リージョンペアの平均値を並べて比較することで、自分の環境固有の問題か、Google
                    Cloud全体で起きている事象かを判断できます。パケットロスメトリクスは常に利用可能ですが、1分あたり400プローブ未満の場合はアスタリスク(*)が付き、データの信頼性が低いことを示します。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/metrics-views">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/metrics-views</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-project">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-project</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-google-cloud">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-google-cloud</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/how-to/viewing-perf-dash-metrics">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/how-to/viewing-perf-dash-metrics</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="35-firewall-insights" tabIndex={-1}>3.5 Firewall Insights</h3>{" "}<p>
                    Firewall Insightsは、ファイアウォールルール(VPC firewall
                    rules、ファイアウォールポリシーに属するルールの両方)の構成と使用実態を分析し、最適化のためのインサイトを提供します。インサイトは大きく3種類です。
                </p>{" "}
<Diagram id="diag-17" label="3.5 Firewall Insights" />
{" "}<p>{" "}<strong>シャドウルール</strong>は、自分より優先度が高い(または同等の)ルールと属性(IPレンジなど)が重複しており、実質的に一度もマッチし得ないルールです。構成情報だけから機械的に判定できるため、Firewall
                    Rules
                    Loggingを有効化していなくても検知されます。一方、<strong>過度に寛容なルール</strong>と<strong>拒否ルールインサイト</strong>はログベースであり、Firewall
                    Rules
                    Loggingを有効化した状態でのトラフィック実績が必要です。シャドウルール・過度に寛容なルールのインサイトは、Firewall
                    Insightsのページで機能を有効化してから最大48時間で生成され始め、機械学習による陳腐化予測は新規/更新されたルールに対して最大10日ほどかかります。
                </p>{" "}<blockquote className="callout callout-warning">{" "}<div className="callout-header">{" "}<span className="callout-icon">⚠</span><span className="callout-label">注意</span>{" "}</div>{" "}<p>
                        ロードバランサのヘルスチェック用IPレンジ(<code>35.191.0.0/16</code>など)を許可するルールは、ヒット数が少なくても「過度に寛容」や「未使用」と誤判定されて削除対象に挙げられることがあります。これらはGoogle
                        Cloudの機能上必要なルールであるため、インサイトを鵜呑みにせず、削除前に用途を確認してください。
                    </p>{" "}</blockquote>{" "}<p>
                    Firewall Insightsが検出したインサイトは、Recommenderが提供する<strong>Active Assist</strong>ダッシュボードからも確認できます(カード名がFirewall
                    Insights側とは異なる点に注意)。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-understand-insights">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-understand-insights</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/insights-categories-states">https://cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/insights-categories-states</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/enable-api-features">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/enable-api-features</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-insights-recommendation-hub">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-insights-recommendation-hub</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="36-network-analyzer" tabIndex={-1}>3.6 Network Analyzer</h3>{" "}<p>
                    Network
                    Analyzerは、VPCネットワークの構成を自動的に巡回監視し、誤設定や非効率な構成を検出するプッシュ型のツールです。設定変更後は約10分でその変更に関連する分析が実行され、それとは別に少なくとも1日1回の定期分析も行われます。インサイトは5つのグループに分類されます。
                </p>{" "}
<Diagram id="diag-18" label="3.6 Network Analyzer" />
{" "}<p>
                    たとえばVPCネットワークグループでは「無効なネクストホップを持つルート」、ネットワークサービスグループでは「ヘルスチェックをブロックしているファイアウォールルール」「トラフィックとヘルスチェックで異なるポートを使っているバックエンドサービス」、GKEグループでは「ノードからコントロールプレーンへの双方向疎通の設定起因の問題」「PodのIPアドレス使用率」といった具体的なインサイトが提供されます。
                </p>{" "}<p>
                    Shared
                    VPCでは、ホストプロジェクト側でIPアドレス使用率などVPCネットワーク全体に関わるインサイトが提供され(サービスプロジェクトの情報も自動集約)、サービスプロジェクト側ではロードバランサやGKEなどそのプロジェクト固有のサービスに関するインサイトが提供されます。複数プロジェクトを横断して監視したい場合は、Cloud
                    Monitoringの<strong>メトリクススコープ</strong>を構成し、対象プロジェクトを監視対象として追加します。
                </p>{" "}<p>
                    Network Analyzerが公開したインサイトはCloud
                    Loggingにも格納され、ログ名は<code>projects/&#123;project-id&#125;/logs/networkanalyzer.googleapis.com/analyzer_reports</code>の形式です。Network
                    Analyzer自体はCloud
                    Monitoringへメトリクスを送信しないため、リアルタイムアラートが必要な場合はこのログに対してログベースアラートを設定します。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insight-groups-types">https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insight-groups-types</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/network-analyzer/overview">https://docs.cloud.google.com/network-intelligence-center/docs/network-analyzer/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://www.doit.com/blog/proactively-detect-network-misconfigurations-in-google-cloud-with-network-analyzer">https://www.doit.com/blog/proactively-detect-network-misconfigurations-in-google-cloud-with-network-analyzer</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insights/kubernetes-engine/gke-node-to-control-plane">https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insights/kubernetes-engine/gke-node-to-control-plane</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="37-flow-analyzer" tabIndex={-1}>3.7 Flow Analyzer</h3>{" "}<p>
                    Flow Analyzerは、VPC Flow
                    Logsに対して複雑なSQLクエリを書かずにトラフィックパターンを分析できるツールです。Observability
                    Analytics(旧Log Analytics)が有効化されたログバケットに格納されたFlow
                    Logsのレコードを対象とし、BigQueryを基盤に5-tuple粒度でのオピニオンベース分析(意見の分かれない、定型化された分析軸)を提供します。
                </p>{" "}
<Diagram id="diag-19" label="3.7 Flow Analyzer" />
{" "}<p>
                    活用例として、「誰が接続を開始したか」を知りたい場合は送信元ペインで「VPCサブネットワーク」「IP」「ポート」を選択してグルーピングします。Cross-Cloud
                    Network環境では、VLANアタッチメントやVPNトンネルに対してもVPC Flow
                    Logsを有効化でき、<code>reporter</code>(トラフィックの方向)や<code>gateway</code>オブジェクト(ゲートウェイの名前・タイプ・プロジェクトID・ロケーション)といった新しい注釈がFlow
                    Analyzerに統合されており、オンプレミス⇔クラウド間の「エレファントフロー」(高帯域フロー)の特定やShared
                    VPC環境でのサービスプロジェクト別のハイブリッド帯域使用量の監査に活用できます。
                </p>{" "}<blockquote className="callout callout-source">{" "}<div className="callout-header">{" "}<span className="callout-icon">🔗</span><span className="callout-label">出典</span>{" "}</div>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview">https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/flow-analyzer/monitor-traffic-flows">https://docs.cloud.google.com/network-intelligence-center/docs/flow-analyzer/monitor-traffic-flows</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/enable-log-analytics">https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/enable-log-analytics</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/blog/products/networking/vpc-flow-logs-for-cross-cloud-network">https://cloud.google.com/blog/products/networking/vpc-flow-logs-for-cross-cloud-network</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/blog/products/networking/using-vpc-flow-logs-to-de-risk-network-migration">https://cloud.google.com/blog/products/networking/using-vpc-flow-logs-to-de-risk-network-migration</a>{" "}</li>{" "}</ul>{" "}</blockquote>{" "}<h3 id="38-task-53-活用チェックリスト" tabIndex={-1}>3.8 Task 5.3 活用チェックリスト</h3>{" "}<ul className="task-list checklist-card">{" "}<li>{" "}<label><input type="checkbox" />障害調査の初手として、Network
                            Topologyでトラフィックの全体像を把握する運用が定着しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />「AからBへ到達できるか」という問い合わせに対し、Connectivity
                            Testsを標準ツールとして使っているか(構成分析とデータプレーン検証の違いを理解した上で)</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />アプリケーション性能問題の切り分けにPerformance
                            Dashboardを使い、ネットワーク起因かアプリケーション起因かを最初に判断しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Firewall
                            Insightsのシャドウルール・過度に寛容なルールを定期的にレビューし、ヘルスチェック用ルールなど誤判定されやすいものを除外するプロセスがあるか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Network
                            Analyzerの5つのインサイトグループ(VPCネットワーク/ネットワークサービス/ハイブリッド接続/GKE/マネージドサービス)を横断して定期確認しているか、複数プロジェクトの場合はメトリクススコープを構成しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Flow AnalyzerでVPC Flow
                            Logsを分析するために、対象ログバケットのObservability
                            Analyticsを有効化しているか</label>{" "}</li>{" "}<li>{" "}<label><input type="checkbox" />Cross-Cloud
                            Network構成の場合、VLANアタッチメント・VPNトンネルでもVPC Flow
                            Logsを有効化し、Flow Analyzerでハイブリッド帯域を可視化しているか</label>{" "}</li>{" "}</ul>{" "}<hr />{" "}<h2 id="総合トラブルシューティングワークフロー" tabIndex={-1}>
                    総合トラブルシューティングワークフロー
                </h2>{" "}<p>
                    最後に、Task
                    5.1〜5.3で紹介したツールを、実際のインシデント対応の流れに沿って統合したワークフローを示します。試験では個々のツールの仕様だけでなく、「この状況ではどのツールをどの順序で使うべきか」という統合的な判断力も問われます。
                </p>{" "}
<Diagram id="diag-20" label="総合トラブルシューティングワークフロー" />
{" "}<blockquote className="callout callout-best">{" "}<div className="callout-header">{" "}<span className="callout-icon">✅</span><span className="callout-label">ベストプラクティス</span>{" "}</div>{" "}<p>
                        このワークフローが機能する前提は、Part
                        1で解説したロギング・モニタリングが<strong>平時から有効化されていること</strong>です。障害発生後にVPC
                        Flow LogsやFirewall Rules
                        Loggingを有効化しても、発生時点までのデータは遡って取得できません。試験対策としても実務としても、「まず何を有効化しておくべきか」という設計判断(Task
                        5.1)が、トラブルシューティング(Task 5.2)とNetwork Intelligence
                        Centerの活用(Task
                        5.3)の土台になっている、という関係を押さえておいてください。
                    </p>{" "}</blockquote>{" "}<hr />{" "}<h2 id="参考文献" tabIndex={-1}>参考文献</h2>{" "}<div className="ref-grid">{" "}<div className="ref-card">{" "}<h3 id="公式認定試験ガイド" tabIndex={-1}>公式認定・試験ガイド</h3>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/learn/certification/cloud-network-engineer">https://cloud.google.com/learn/certification/cloud-network-engineer</a>{" "}</li>{" "}<li>{" "}<a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf">https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf</a>{" "}</li>{" "}</ul>{" "}</div>{" "}<div className="ref-card">{" "}<h3 id="cloud-logging--cloud-monitoring基盤コンポーネント別ロギング" tabIndex={-1}>
                            Cloud Logging / Cloud Monitoring基盤・コンポーネント別ロギング
                        </h3>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/firewall/docs/vpc-firewall-rules-logging-overview">https://docs.cloud.google.com/firewall/docs/vpc-firewall-rules-logging-overview</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/flow-logs">https://cloud.google.com/vpc/docs/flow-logs</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/using-flow-logs">https://cloud.google.com/vpc/docs/using-flow-logs</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/about-flow-logs-records">https://cloud.google.com/vpc/docs/about-flow-logs-records</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/access-flow-logs">https://cloud.google.com/vpc/docs/access-flow-logs</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/nat/docs/monitoring">https://cloud.google.com/nat/docs/monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/nat/docs/audit-logging">https://cloud.google.com/nat/docs/audit-logging</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/dns/docs/monitoring">https://docs.cloud.google.com/dns/docs/monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/vpc-service-controls/docs/audit-logging">https://docs.cloud.google.com/vpc-service-controls/docs/audit-logging</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/vpc-service-controls/docs/violation-dashboard">https://docs.cloud.google.com/vpc-service-controls/docs/violation-dashboard</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/vpc-service-controls/docs/retrieve-troubleshoot-errors">https://docs.cloud.google.com/vpc-service-controls/docs/retrieve-troubleshoot-errors</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc-service-controls/docs/violation-analyzer">https://cloud.google.com/vpc-service-controls/docs/violation-analyzer</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/how-to/viewing-logs-metrics">https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/how-to/viewing-logs-metrics</a>{" "}</li>{" "}</ul>{" "}</div>{" "}<div className="ref-card">{" "}<h3 id="ハイブリッド接続cloud-vpn--cloud-interconnect--cloud-routerのモニタリングとトラブルシューティング" tabIndex={-1}>
                            ハイブリッド接続(Cloud VPN / Cloud Interconnect / Cloud
                            Router)のモニタリングとトラブルシューティング
                        </h3>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/support/troubleshooting">https://docs.cloud.google.com/network-connectivity/docs/vpn/support/troubleshooting</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/checking-vpn-status">https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/checking-vpn-status</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/viewing-logs-metrics">https://docs.cloud.google.com/network-connectivity/docs/vpn/how-to/viewing-logs-metrics</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-connectivity/docs/interconnect/how-to/monitoring">https://cloud.google.com/network-connectivity/docs/interconnect/how-to/monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/interconnect/support/troubleshooting">https://docs.cloud.google.com/network-connectivity/docs/interconnect/support/troubleshooting</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-connectivity/docs/router/how-to/viewing-logs-metrics">https://cloud.google.com/network-connectivity/docs/router/how-to/viewing-logs-metrics</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-sessions">https://cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-sessions</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-peering">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-peering</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-routes">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-routes</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-log-messages">https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-log-messages</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-states">https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bgp-states</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd">https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd-states">https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd-states</a>{" "}</li>{" "}</ul>{" "}</div>{" "}<div className="ref-card">{" "}<h3 id="ロードバランシングトラフィック管理" tabIndex={-1}>
                            ロードバランシング・トラフィック管理
                        </h3>{" "}<ul>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/enabling-connection-draining">https://docs.cloud.google.com/load-balancing/docs/enabling-connection-draining</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/load-balancing">https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/load-balancing</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/load-balancing/docs/backend-service">https://cloud.google.com/load-balancing/docs/backend-service</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service">https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/internal/failover-overview">https://docs.cloud.google.com/load-balancing/docs/internal/failover-overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/load-balancing/docs/https/https-logging-monitoring">https://docs.cloud.google.com/load-balancing/docs/https/https-logging-monitoring</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/lb-metrics">https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/sli-metrics/lb-metrics</a>{" "}</li>{" "}</ul>{" "}</div>{" "}<div className="ref-card">{" "}<h3 id="vpc-flow-logspacket-mirroringによるトラブルシューティング" tabIndex={-1}>
                            VPC Flow Logs・Packet Mirroringによるトラブルシューティング
                        </h3>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/packet-mirroring">https://cloud.google.com/vpc/docs/packet-mirroring</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/using-packet-mirroring">https://cloud.google.com/vpc/docs/using-packet-mirroring</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/vpc/docs/monitoring-packet-mirroring">https://cloud.google.com/vpc/docs/monitoring-packet-mirroring</a>{" "}</li>{" "}</ul>{" "}</div>{" "}<div className="ref-card">{" "}<h3 id="network-intelligence-center" tabIndex={-1}>Network Intelligence Center</h3>{" "}<ul>{" "}<li>{" "}<a href="https://cloud.google.com/blog/products/networking/announcing-network-intelligence-center">https://cloud.google.com/blog/products/networking/announcing-network-intelligence-center</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/overview">https://docs.cloud.google.com/network-intelligence-center/docs/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs">https://docs.cloud.google.com/network-intelligence-center/docs</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/network-topology/reference/metrics-reference">https://cloud.google.com/network-intelligence-center/docs/network-topology/reference/metrics-reference</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/state-tables">https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/state-tables</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/reachability">https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/reachability</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/support/troubleshooting">https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/support/troubleshooting</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/test-google-managed-services">https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/test-google-managed-services</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview">https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/metrics-views">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/metrics-views</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-project">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-project</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-google-cloud">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/use-cases-google-cloud</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/how-to/viewing-perf-dash-metrics">https://docs.cloud.google.com/network-intelligence-center/docs/performance-dashboard/how-to/viewing-perf-dash-metrics</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-understand-insights">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-understand-insights</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/insights-categories-states">https://cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/insights-categories-states</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/enable-api-features">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/enable-api-features</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-insights-recommendation-hub">https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/how-to/view-insights-recommendation-hub</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insight-groups-types">https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insight-groups-types</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/network-analyzer/overview">https://docs.cloud.google.com/network-intelligence-center/docs/network-analyzer/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insights/kubernetes-engine/gke-node-to-control-plane">https://cloud.google.com/network-intelligence-center/docs/network-analyzer/insights/kubernetes-engine/gke-node-to-control-plane</a>{" "}</li>{" "}<li>{" "}<a href="https://www.doit.com/blog/proactively-detect-network-misconfigurations-in-google-cloud-with-network-analyzer">https://www.doit.com/blog/proactively-detect-network-misconfigurations-in-google-cloud-with-network-analyzer</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview">https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview</a>{" "}</li>{" "}<li>{" "}<a href="https://docs.cloud.google.com/network-intelligence-center/docs/flow-analyzer/monitor-traffic-flows">https://docs.cloud.google.com/network-intelligence-center/docs/flow-analyzer/monitor-traffic-flows</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/enable-log-analytics">https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/enable-log-analytics</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/blog/products/networking/vpc-flow-logs-for-cross-cloud-network">https://cloud.google.com/blog/products/networking/vpc-flow-logs-for-cross-cloud-network</a>{" "}</li>{" "}<li>{" "}<a href="https://cloud.google.com/blog/products/networking/using-vpc-flow-logs-to-de-risk-network-migration">https://cloud.google.com/blog/products/networking/using-vpc-flow-logs-to-de-risk-network-migration</a>{" "}</li>{" "}</ul>{" "}</div>{" "}</div>{" "}</main>
            </div>
        </div>
    );
}
