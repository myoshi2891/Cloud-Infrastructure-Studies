'use client';

import React, { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { CHECKLIST_ITEMS, DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

/**
 * 図表データを Mermaid 図として描画する（未定義の id は何も描画しない）。
 */
const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale={true}
            />
        </div>
    );
});

/**
 * PCNE Section 3 ガイドコンポーネント
 */
export function PcneSection3LoadBalancingGuide() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        () => new Array(CHECKLIST_ITEMS.length).fill(false),
    );

    const toggleCheck = (index: number) => {
        setCheckedItems((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    const completedCount = checkedItems.filter(Boolean).length;

    return (
        <div className="pcne-s3-page">
            <NavBar
                isOpen={isNavOpen}
                onToggle={() => setIsNavOpen((prev) => !prev)}
                onClose={() => setIsNavOpen(false)}
            />

            <main className="main">
                <header className="hero">
                    <span className="hero-eyebrow">PCNE ・ Section 3, Task 3.1</span>
                    <h1>S3: ロードバランシングとトラフィック管理</h1>
                    <div className="subtitle">
                        <strong>
                            Professional Cloud Network Engineer 試験対応ガイド — Section
                            3「Configuring managed network services」Task 3.1「Configuring load
                            balancing」
                        </strong>
                    </div>
                </header>

                <blockquote className="quote-card">
                    <p>
                        本ガイドは、Google Cloud Professional Cloud Network
                        Engineer（PCNE）認定試験の公式Exam Guideに定義されたTask 3.1「Configuring
                        load
                        balancing」の出題範囲を、中級者から上級者のネットワークエンジニア向けに実装レベルまで掘り下げて解説するものです。Section
                        3全体の出題比率は約16%で、3.1（ロードバランシング）・3.2（Cloud
                        CDN）・3.3（Cloud
                        DNS）の3タスクから構成されますが、本ガイドは3.1のみを対象とします。
                    </p>
                </blockquote>

                <hr />
                <section>
                    <h2 id="はじめにこのタスクの位置づけと出題範囲">
                        はじめに：このタスクの位置づけと出題範囲
                    </h2>
                    <p>
                        公式Exam Guideは、Task 3.1「Configuring load
                        balancing」を次の5つの観点で定義しています。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>① LBソリューションの決定</td>
                                    <td>
                                        internal/external、regional/global、application/proxy/passthroughの区別
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>② バックエンドサービスの設定</td>
                                    <td>NEG・MIGを含むオートスケーリング構成</td>
                                </tr>
                                <tr className="odd">
                                    <td>③ バックエンドの詳細設定</td>
                                    <td>
                                        バランシング方式・セッションアフィニティ・サービング容量・URLマップ・ヘルスチェック・グローバルアクセス
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>④ GKEにおけるLB理解</td>
                                    <td>GKE Gateway controller・GKE Ingress controller・NEG</td>
                                </tr>
                                <tr className="odd">
                                    <td>⑤ トラフィック管理</td>
                                    <td>
                                        トラフィックスプリッティング・トラフィックミラーリング・URL書き換え
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        Section
                        1（設計）で問われる「どのLBを選ぶべきか」という<strong>アーキテクチャ設計の視点</strong>に対し、Section
                        3（本タスク）では<strong>実装・設定の視点</strong>、すなわち「選んだLBをどのパラメータでどう構成するか」が主眼になります。試験では、シナリオ形式で「この要件を満たすバランシングモードはどれか」「このトラフィック分割を実現するにはどのURLマップ構成が必要か」といった設定レベルの判断が問われる点に注意してください。
                    </p>
                </section>

                <hr />
                <section>
                    <h2 id="ロードバランサーの全体アーキテクチャと選択基準">
                        ロードバランサーの全体アーキテクチャと選択基準
                    </h2>
                    <h3 id="google-cloudロードバランサーの分類軸">
                        Google Cloudロードバランサーの分類軸
                    </h3>
                    <p>
                        Google
                        Cloudのロードバランサーは、次の3つの独立した軸の組み合わせで整理すると理解しやすくなります。
                    </p>
                    <ul>
                        <li>
                            <strong>プロキシ方式</strong>：Application Load
                            Balancer（L7、HTTP/HTTPS/HTTP2/gRPC）／ Proxy Network Load
                            Balancer（L4プロキシ、TCP/SSL）／ Passthrough Network Load
                            Balancer（L4パススルー、クライアント送信元IPを保持）
                        </li>
                        <li>
                            <strong>公開範囲</strong>：External（インターネット向け）／
                            Internal（VPC内部向け）
                        </li>
                        <li>
                            <strong>スコープ</strong>：Global（複数リージョンにまたがる）／
                            Regional（単一リージョン）／
                            Cross-region（内部LBのみ、グローバルバックエンドを持つリージョナルVIP）
                        </li>
                    </ul>
                    <p>公式ドキュメントは選択の出発点を次のように整理しています。</p>
                    <blockquote className="quote-card">
                        <p>
                            フレキシブルな機能セットが必要なHTTP(S)トラフィックにはApplication Load
                            Balancerを、複数リージョンのバックエンドへのTCPプロキシロードバランシングにはProxy
                            Network Load
                            Balancerを、クライアント送信元IPの保持やUDP・ESP・ICMPなどの追加プロトコルサポートが必要な場合はPassthrough
                            Network Load Balancerを選択します。
                        </p>
                    </blockquote>
                    <h3 id="選択フローチャート">選択フローチャート</h3>
                    <Diagram
                        id="diag-selection-flowchart"
                        label="ロードバランサーの選択フローチャート"
                    />
                    <blockquote className="cite-card" data-icon="§">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer">
                                https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="主要ロードバランサー比較表">主要ロードバランサー比較表</h3>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ロードバランサー</th>
                                    <th scope="col">スコープ</th>
                                    <th scope="col">公開範囲</th>
                                    <th scope="col">実装方式</th>
                                    <th scope="col">主なユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>グローバル外部 Application LB</td>
                                    <td>グローバル</td>
                                    <td>External</td>
                                    <td>GFE（管理型）</td>
                                    <td>世界中のユーザー向けWebアプリ、マルチリージョン公開API</td>
                                </tr>
                                <tr className="even">
                                    <td>リージョン外部 Application LB</td>
                                    <td>リージョン</td>
                                    <td>External</td>
                                    <td>Envoy（管理型）</td>
                                    <td>特定リージョンに閉じたコンプライアンス要件のあるWeb公開</td>
                                </tr>
                                <tr className="odd">
                                    <td>リージョン内部 Application LB</td>
                                    <td>リージョン</td>
                                    <td>Internal</td>
                                    <td>Envoy（管理型）</td>
                                    <td>マイクロサービス間のL7ロードバランシング</td>
                                </tr>
                                <tr className="even">
                                    <td>クロスリージョン内部 Application LB</td>
                                    <td>クロスリージョン</td>
                                    <td>Internal</td>
                                    <td>Envoy（管理型）</td>
                                    <td>複数リージョンに分散した内部サービスへの高可用アクセス</td>
                                </tr>
                                <tr className="odd">
                                    <td>Proxy Network LB（TCP Proxy）</td>
                                    <td>グローバル/リージョン</td>
                                    <td>External/Internal</td>
                                    <td>GFE/Envoy</td>
                                    <td>複数リージョンのTCPバックエンドへの単一エニーキャストIP</td>
                                </tr>
                                <tr className="even">
                                    <td>外部パススルー Network LB</td>
                                    <td>リージョン</td>
                                    <td>External</td>
                                    <td>パススルー（非プロキシ）</td>
                                    <td>送信元IP保持が必要なUDP/TCPワークロード</td>
                                </tr>
                                <tr className="odd">
                                    <td>内部パススルー Network LB</td>
                                    <td>リージョン</td>
                                    <td>Internal</td>
                                    <td>パススルー（非プロキシ）</td>
                                    <td>内部L4ロードバランシング、NVAの次ホップ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/features">
                                    https://docs.cloud.google.com/load-balancing/docs/features
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/application-load-balancer">
                                    https://docs.cloud.google.com/load-balancing/docs/application-load-balancer
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                    <h3 id="ネットワークサービスティアとの関係">ネットワークサービスティアとの関係</h3>
                    <p>
                        ロードバランサーの種類ごとに利用可能なネットワークサービスティア（Premium/Standard）は異なります。この設計判断はSection
                        1（1.1）で扱う領域と重複するため、本ガイドでは詳細を割愛しますが、実装時には「Standard
                        Tierではグローバル外部Application Load
                        Balancerを利用できない」といった制約がある点だけ押さえておいてください。
                    </p>
                </section>

                <hr />
                <section>
                    <h2 id="バックエンドサービスとオートスケーリングの設定">
                        バックエンドサービスとオートスケーリングの設定
                    </h2>
                    <h3 id="バックエンドの種類mig-vs-neg">バックエンドの種類：MIG vs NEG</h3>
                    <p>バックエンドサービスにアタッチできるバックエンドは、大きく分けて2種類です。</p>
                    <ul>
                        <li>
                            <strong>マネージドインスタンスグループ（MIG）</strong>：Compute Engine
                            VMの集合。オートスケーラーと直接連携し、UTILIZATION（CPU使用率ベース）を含む全バランシングモードを利用可能。
                        </li>
                        <li>
                            <strong>ネットワークエンドポイントグループ（NEG）</strong>
                            ：VMやコンテナ、サーバーレスリソースなど、より粒度の細かいエンドポイントの集合。UTILIZATIONバランシングモードはサポートされません。
                        </li>
                    </ul>
                    <h3 id="negの6分類">NEGの6分類</h3>
                    <Diagram
                        id="diag-neg-types"
                        label="Network Endpoint Group（NEG）の6分類"
                    />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">NEGタイプ</th>
                                    <th scope="col">エンドポイント形式</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">制約</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ゾーンNEG（GCE_VM_IP_PORT）</td>
                                    <td>IPアドレス＋ポート</td>
                                    <td>プロキシ型LBの標準バックエンド、GKEのコンテナネイティブLB</td>
                                    <td>UTILIZATIONバランシング非対応。RATE/CONNECTIONのみ</td>
                                </tr>
                                <tr className="even">
                                    <td>ゾーンNEG（GCE_VM_IP）</td>
                                    <td>IPアドレスのみ（ポート指定不可）</td>
                                    <td>
                                        内部パススルーNetwork LB、外部パススルーNetwork LB（リージョン）
                                    </td>
                                    <td>ポート指定不可、デュアルスタックエンドポイント不可</td>
                                </tr>
                                <tr className="odd">
                                    <td>サーバーレスNEG</td>
                                    <td>Cloud Run / App Engine / Cloud Run functions</td>
                                    <td>サーバーレスサービスをLB配下に統合</td>
                                    <td>Proxy/Passthrough Network LBからは利用不可</td>
                                </tr>
                                <tr className="even">
                                    <td>インターネットNEG</td>
                                    <td>FQDN:Port または IP:Port（RFC 1918外）</td>
                                    <td>GCP外部（オンプレミス・他社クラウド）のバックエンドを統合</td>
                                    <td>
                                        グローバルは単一エンドポイント・ヘルスチェック非対応、リージョナルは最大256エンドポイント
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>ハイブリッド接続NEG</td>
                                    <td>ハイブリッド接続経由のオンプレミスエンドポイント</td>
                                    <td>Cloud Interconnect/VPN経由でのオンプレミスバックエンド統合</td>
                                    <td>ハイブリッド接続の構成が前提</td>
                                </tr>
                                <tr className="even">
                                    <td>PSC NEG</td>
                                    <td>Private Service Connectで公開されたサービス</td>
                                    <td>別プロジェクト・別VPCのサービスへの越境接続</td>
                                    <td>PSCエンドポイント経由でのみ解決</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs">
                                    https://docs.cloud.google.com/load-balancing/docs/negs
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts">
                                    https://docs.cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts">
                                    https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts">
                                    https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                    <h3 id="オートスケーリングとの連携">オートスケーリングとの連携</h3>
                    <p>
                        MIGバックエンドにオートスケーラーをアタッチすると、オートスケーラーは「ロードバランシングのサービング容量の一定割合」を維持するようにインスタンス数を増減します。たとえばMIGのサービング容量が1インスタンスあたり100RPSと定義されており、オートスケーラーの目標使用率を80%に設定した場合、オートスケーラーは各インスタンスが80RPSを維持するようにインスタンスを追加・削除します。
                    </p>
                    <blockquote className="practice-card" data-icon="✓">
                        <p>
                            <strong>ベストプラクティス</strong>
                            ：NEGバックエンド（特にGKEのコンテナネイティブLB）を使う場合はUTILIZATIONが使えないため、RATEまたはCONNECTIONベースでキャパシティ計画を行い、Pod単位のHorizontal
                            Pod Autoscalerと組み合わせて容量を制御します。
                        </p>
                    </blockquote>
                    <blockquote className="cite-card" data-icon="§">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a href="https://docs.cloud.google.com/compute/docs/autoscaler/scaling-load-balancing">
                                https://docs.cloud.google.com/compute/docs/autoscaler/scaling-load-balancing
                            </a>
                        </p>
                    </blockquote>
                </section>

                <hr />
                <section>
                    <h2 id="ロードバランサーとバックエンドの詳細設定">
                        ロードバランサーとバックエンドの詳細設定
                    </h2>
                    <h3 id="バランシングモードとキャパシティスケーラー">
                        バランシングモードとキャパシティスケーラー
                    </h3>
                    <p>
                        バックエンドサービスは、バックエンドごとに「バランシングモード」と「ターゲット容量」を持ち、これに「キャパシティスケーラー」を乗算した値が実効容量になります。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">バランシングモード</th>
                                    <th scope="col">容量の測定基準</th>
                                    <th scope="col">対応バックエンド</th>
                                    <th scope="col">備考</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>UTILIZATION</td>
                                    <td>インスタンスグループのCPU使用率（近似値）</td>
                                    <td>MIGのみ（NEG非対応）</td>
                                    <td>セッションアフィニティはNONEと併用すること</td>
                                </tr>
                                <tr className="even">
                                    <td>RATE</td>
                                    <td>新規HTTPリクエストのレート（RPS）</td>
                                    <td>MIG・NEG両方</td>
                                    <td>グループ全体またはエンドポイント単位で指定可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>CONNECTION</td>
                                    <td>新規TCPコネクション数</td>
                                    <td>MIG・NEG両方</td>
                                    <td>L4系ロードバランサーで使用</td>
                                </tr>
                                <tr className="even">
                                    <td>IN-FLIGHT</td>
                                    <td>処理中（未完了）のHTTPリクエスト数</td>
                                    <td>MIG・NEG両方</td>
                                    <td>リクエスト処理に1秒以上かかる場合、RATEの代わりに使用</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        キャパシティスケーラーは0.0または0.1〜1.0の範囲で設定でき、次のような運用パターンに使えます。
                    </p>
                    <ul>
                        <li>
                            <strong>段階的なドレイン</strong>
                            ：キャパシティスケーラーを0.5にすると、そのバックエンドの実効容量が半分になり、新規トラフィックの流入が抑制されます。
                        </li>
                        <li>
                            <strong>完全ドレイン</strong>
                            ：0に設定すると新規トラフィックは一切送られなくなります（バックエンドサービスに他のバックエンドが存在する場合のみ設定可能）。
                        </li>
                    </ul>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/backend-service">
                                    https://docs.cloud.google.com/load-balancing/docs/backend-service
                                </a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/python/docs/reference/compute/0.4.2/google.cloud.compute_v1.types.Backend">
                                    https://cloud.google.com/python/docs/reference/compute/0.4.2/google.cloud.compute_v1.types.Backend
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                    <h3 id="セッションアフィニティ">セッションアフィニティ</h3>
                    <p>
                        セッションアフィニティは、同一クライアントからの後続リクエストを可能な限り同じバックエンドに送るための仕組みです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">アフィニティ種別</th>
                                    <th scope="col">ハッシュ対象</th>
                                    <th scope="col">適したケース</th>
                                    <th scope="col">注意点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>NONE</td>
                                    <td>なし（デフォルト）</td>
                                    <td>ステートレスなアプリケーション</td>
                                    <td>最も均等な分散が得られる</td>
                                </tr>
                                <tr className="even">
                                    <td>CLIENT_IP</td>
                                    <td>送信元・宛先IPの2-tuple</td>
                                    <td>NAT配下にクライアントが少ないL4/L7ワークロード</td>
                                    <td>
                                        多数のクライアントが同一送信元IP（NAT）を共有すると偏りが生じる
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>GENERATED_COOKIE</td>
                                    <td>LBが発行するCookie</td>
                                    <td>HTTP(S)ワークロードでの一般的な選択肢</td>
                                    <td>NATやIPアドレス変化の影響を受けない</td>
                                </tr>
                                <tr className="even">
                                    <td>HTTP_COOKIE</td>
                                    <td>アプリケーション側が発行する既存Cookie</td>
                                    <td>アプリケーションが既にセッションCookieを持つ場合</td>
                                    <td>Cookie名の指定が必要</td>
                                </tr>
                                <tr className="odd">
                                    <td>HEADER_FIELD</td>
                                    <td>指定したHTTPヘッダーの値</td>
                                    <td>ユーザーIDなどをヘッダーで伝搬するAPIクライアント</td>
                                    <td>
                                        ロードバランシングロケーションポリシーがRING_HASHまたはMAGLEVである必要がある
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="quote-card">
                        <p>
                            セッションアフィニティは認証やセキュリティの目的では使用しないでください。バックエンドの健全性やスケール状況によって、ベストエフォートでしか維持されません。
                        </p>
                    </blockquote>
                    <blockquote className="practice-card" data-icon="✓">
                        <p>
                            <strong>ベストプラクティス</strong>
                            ：UTILIZATIONバランシングモードと組み合わせて使用しないこと。ウェイト付きトラフィックスプリッティングを設定した場合、セッションアフィニティの設定より分割設定が優先されるため、両者を同時に有効化しないことが推奨されています。
                        </p>
                    </blockquote>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/l7-internal">
                                    https://docs.cloud.google.com/load-balancing/docs/l7-internal
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/request-distribution">
                                    https://docs.cloud.google.com/load-balancing/docs/https/request-distribution
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                    <h3 id="urlマップの構造">URLマップの構造</h3>
                    <Diagram
                        id="diag-url-map-structure"
                        label="URLマップの構造（ホストルール、パスマッチャー、パスルール、デフォルトサービス）"
                    />
                    <p>
                        URLマップはホストルール（どのドメインに適用するか）→パスマッチャー（パスパターンの集合）→パスルール（個々のパスと転送先）という階層構造を持ちます。パスルールの代わりにルートルール（routeRules）を使うことも可能ですが、両者は同一のパスマッチャー内で併用できません。ルートルールは順序評価される点がパスルールと異なります。
                    </p>
                    <blockquote className="cite-card" data-icon="§">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a href="https://docs.cloud.google.com/load-balancing/docs/https/traffic-management">
                                https://docs.cloud.google.com/load-balancing/docs/https/traffic-management
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="ヘルスチェック">ヘルスチェック</h3>
                    <Diagram
                        id="diag-health-check"
                        label="ヘルスチェックプローブとファイアウォール判定フロー"
                    />
                    <p>
                        多くのGoogle
                        Cloudロードバランサーのヘルスチェックプローブは、<code>130.211.0.0/22</code>と<code>35.191.0.0/16</code>のアドレス範囲から送信されます。外部パススルーNetwork
                        Load
                        Balancerでは、これに加えて<code>209.85.152.0/22</code>と<code>209.85.204.0/22</code>も使用されます。VPCファイアウォールがデフォルト拒否である以上、これらの範囲からのIngressを明示的に許可するファイアウォールルールがなければ、アプリケーションが正常に動作していても全バックエンドがUNHEALTHYと判定されます。これは試験でも実務でも最頻出のトラブルシューティングシナリオです。
                    </p>
                    <p>
                        判定基準は「チェック間隔」「タイムアウト」「healthy閾値（連続成功回数）」「unhealthy閾値（連続失敗回数）」の4パラメータで構成され、プロトコルはHTTP/HTTPS/HTTP2/TCP/SSL/gRPCから選択できます。ヘルスチェックはHTTPリダイレクト（3xx）を失敗として扱うため、HTTPをHTTPSへ強制リダイレクトしているアプリケーションでヘルスチェックパスまでリダイレクトしてしまうと誤検知の原因になります。
                    </p>
                    <blockquote className="practice-card" data-icon="✓">
                        <p>
                            <strong>ベストプラクティス</strong>
                            ：ヘルスチェックには本番トラフィックのエンドポイントとは別の軽量な専用パス（例：<code>/healthz</code>）を用意し、200固定を返すようにします。GKEのNEGバックエンドでは、ヘルスチェックはノードIPではなくPod
                            IPに対して直接行われるため、NetworkPolicyやPodのファイアウォール設定も併せて確認する必要があります。
                        </p>
                    </blockquote>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs">
                                    https://docs.cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-failover">
                                    https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-failover
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                    <h3 id="グローバルアクセス内部ロードバランサー">
                        グローバルアクセス（内部ロードバランサー）
                    </h3>
                    <Diagram
                        id="diag-global-access"
                        label="内部ロードバランサーのグローバルアクセス構成"
                    />
                    <p>
                        リージョン内部Application Load
                        Balancerは、デフォルトでは同一リージョンのクライアントからのみアクセス可能です。フォワーディングルールで「グローバルアクセス」を有効化すると、VPC内の任意のリージョンからクライアントがアクセスできるようになります。一方、クロスリージョン内部Application
                        Load
                        Balancerはグローバルアクセスが常に有効であり、さらにバックエンド自体を複数リージョンに配置できる点がリージョン内部LBとの決定的な違いです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">比較項目</th>
                                    <th scope="col">リージョン内部 Application LB</th>
                                    <th scope="col">クロスリージョン内部 Application LB</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>VIPの割り当て</td>
                                    <td>特定リージョンのサブネットから割り当て</td>
                                    <td>
                                        特定リージョンのサブネットから割り当て（複数リージョンのVIPが同一バックエンドサービスを共有可）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>クライアントアクセス</td>
                                    <td>デフォルトは同一リージョンのみ、グローバルアクセスで拡張可</td>
                                    <td>常にグローバルアクセス可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>バックエンドの分散</td>
                                    <td>単一リージョンのみ</td>
                                    <td>複数リージョンに分散可能</td>
                                </tr>
                                <tr className="even">
                                    <td>フェイルオーバー</td>
                                    <td>リージョン内のみ</td>
                                    <td>リージョンをまたいだ自動フェイルオーバー</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/l7-internal">
                                    https://docs.cloud.google.com/load-balancing/docs/l7-internal
                                </a>
                            </li>
                            <li>
                                <a href="https://cloud.google.com/blog/products/networking/enhancing-cloud-load-balancing/">
                                    https://cloud.google.com/blog/products/networking/enhancing-cloud-load-balancing/
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                </section>

                <hr />
                <section>
                    <h2 id="gkeにおけるロードバランシング">GKEにおけるロードバランシング</h2>
                    <p>
                        GKEのロードバランシングは、レガシーな<strong>GKE Ingress controller</strong>
                        と、Kubernetes公式仕様に準拠した<strong>GKE Gateway controller</strong>
                        の2系統が併存しています。両者の違いを理解しておくことは、GKEネットワーキング設計（Section
                        1.4）と実装（本タスク）の橋渡しとして重要です。
                    </p>
                    <h3 id="gke-ingress-controllerレガシー">GKE Ingress controller（レガシー）</h3>
                    <Diagram
                        id="diag-gke-ingress"
                        label="GKE Ingress controller（レガシー）構成図"
                    />
                    <p>
                        GKE Ingress controllerが作成する外部Ingressは常にClassic Application Load
                        Balancerとして実装されます。GKE
                        ServiceのNEGアノテーションを使えばGCE_VM_IP_PORTゾーンNEGを優先的にバックエンドとして利用しますが、インスタンスグループバックエンドもサポートされます。
                    </p>
                    <h3 id="gke-gateway-controllergateway-api">
                        GKE Gateway controller（Gateway API）
                    </h3>
                    <Diagram
                        id="diag-gke-gateway"
                        label="GKE Gateway controller（Gateway API）構成図"
                    />
                    <p>
                        GKE Gateway controllerはKubernetes Gateway
                        APIの実装であり、責務が3つのリソースに分離されている点がIngressとの本質的な違いです。
                    </p>
                    <ul>
                        <li>
                            <strong>GatewayClass</strong>
                            ：使用するロードバランサーの実装を決定するクラスタスコープのテンプレート（GKEが提供）
                        </li>
                        <li>
                            <strong>Gateway</strong>
                            ：実際のロードバランサーインスタンスを表すリソース（フロントエンド設定）
                        </li>
                        <li>
                            <strong>HTTPRoute</strong>
                            ：ルーティングルールを定義するリソース（アプリケーションチームが管理）
                        </li>
                    </ul>
                    <p>
                        この分離により、プラットフォームチームがGatewayのインフラ設定を管理し、アプリケーションチームがクラスタ全体の権限を持たずに自分たちのHTTPRouteだけを管理する、という役割分担が可能になります。GKE
                        Gateway
                        controllerは常にGCE_VM_IP_PORTゾーンNEGバックエンドを使用します。IngressのようにPodのreadiness probeからパラメータを推測はしませんが、標準パス <code>/</code> と既定値を使うヘルスチェックが自動作成されます（HealthCheckPolicyリソース自体は自動作成されません）。そのためHealthCheckPolicyは必須ではなく、アプリケーションが <code>/</code> にHTTP 200を返さない場合や、追加のパス、ヘッダー、タイムアウトなどの既定値を変更する場合にHealthCheckPolicyを設定します。<code>/</code> がHTTP 200を返す場合でも、readiness probeを独自のパスや間隔にチューニングしているならその設定はヘルスチェックへ反映されないため、同じ内容をHealthCheckPolicyで明示する必要があります。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">比較項目</th>
                                    <th scope="col">GKE Ingress controller</th>
                                    <th scope="col">GKE Gateway controller</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>準拠仕様</td>
                                    <td>GKE独自のIngress拡張（アノテーションベース）</td>
                                    <td>Kubernetes Gateway API（標準仕様）</td>
                                </tr>
                                <tr className="even">
                                    <td>実装されるLB</td>
                                    <td>常にClassic Application Load Balancer</td>
                                    <td>GatewayClassごとに実装されるLBが決まる（gke-l7-gxlb → Classic Application Load Balancer、gke-l7-global-external-managed → グローバル外部Application Load Balancer、gke-l7-regional-external-managed → リージョン外部Application Load Balancer、gke-l7-rilb → 内部Application Load Balancer、gke-l7-cross-regional-internal-managed-mc → クロスリージョン内部Application Load Balancer）</td>
                                </tr>
                                <tr className="odd">
                                    <td>リソース構成</td>
                                    <td>Ingressリソース1つに集約</td>
                                    <td>GatewayClass／Gateway／HTTPRouteに分離</td>
                                </tr>
                                <tr className="even">
                                    <td>トラフィック分割</td>
                                    <td>非対応（1ルートにつき1バックエンドのみ）</td>
                                    <td>HTTPRouteでネイティブにトラフィックスプリッティング対応</td>
                                </tr>
                                <tr className="odd">
                                    <td>マルチテナンシー</td>
                                    <td>Ingressリソースの所有者が全ルールを管理</td>
                                    <td>名前空間をまたいだルーティング委譲が可能</td>
                                </tr>
                                <tr className="even">
                                    <td>ヘルスチェック</td>
                                    <td>パラメータを自動推測</td>
                                    <td>標準の <code>/</code> と既定値を使うヘルスチェックが自動的に使われる（HealthCheckPolicyは作成されない）。追加パス・ヘッダー・タイムアウトなどを変更する場合や、readiness probeをチューニングしている場合はHealthCheckPolicyで明示する</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-api">
                                    https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-api
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways">
                                    https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https">
                                    https://docs.cloud.google.com/load-balancing/docs/https
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                    <h3 id="negとcontainer-native-load-balancing">
                        NEGとContainer-Native Load Balancing
                    </h3>
                    <p>
                        GKEでNEGアノテーションを使うと、ロードバランサーはノードIPではなくPod
                        IPに対して直接ヘルスチェック・トラフィック送信を行います（Container-Native Load
                        Balancing）。これにより、ノードを経由するiptables/kube-proxyのホップが省略され、レイテンシが改善するとともに、ロードバランサーがPodの正確な健全性を把握できるようになります。
                    </p>
                    <blockquote className="practice-card" data-icon="✓">
                        <p>
                            <strong>ベストプラクティス</strong>
                            ：新規のGKEワークロードでは、レガシーのIngress +
                            アノテーションではなく、GKE Gateway
                            controllerとHTTPRouteの組み合わせを第一候補として設計します。標準仕様に準拠しているため、将来的な移植性が高く、トラフィックスプリッティングやヘッダーベースルーティングもアノテーション無しでネイティブに扱えます。
                        </p>
                    </blockquote>
                </section>

                <hr />
                <section>
                    <h2 id="application-load-balancerでのトラフィック管理">
                        Application Load Balancerでのトラフィック管理
                    </h2>
                    <p>
                        Application Load
                        Balancer（グローバル外部・リージョン外部・内部いずれも共通の枠組み）は、URLマップのルートアクションとして、単一バックエンドへの転送に加えて次の高度なトラフィック管理機能を提供します。
                    </p>
                    <h3 id="トラフィックスプリッティングカナリアリリース">
                        トラフィックスプリッティング（カナリアリリース）
                    </h3>
                    <Diagram
                        id="diag-traffic-splitting"
                        label="カナリアリリースにおけるトラフィックスプリッティング"
                    />
                    <p>
                        <code>weightedBackendServices</code>
                        を使うと、0〜1000の重みで複数のバックエンドサービスにトラフィックを配分できます。カナリアリリースやブルー/グリーンデプロイの段階的なロールアウトに使われる代表的な手法です。
                    </p>
                    <blockquote className="warning-card" data-icon="!">
                        <p>
                            <strong>注意</strong>
                            ：ウェイト付きトラフィックスプリッティングとセッションアフィニティは同時に設定しないでください。両方が設定された場合、トラフィックスプリッティングの重みが優先されます。
                        </p>
                    </blockquote>
                    <h3 id="トラフィックミラーリング">トラフィックミラーリング</h3>
                    <Diagram
                        id="diag-traffic-mirroring"
                        label="トラフィックミラーリング（fire-and-forget）のシーケンス図"
                    />
                    <p>
                        <code>requestMirrorPolicy</code>
                        は、選択されたバックエンドサービスへ本来のリクエストを転送すると同時に、同一内容のリクエストを別のミラー用バックエンドサービスへ「投げっぱなし（fire-and-forget）」で複製送信します。ロードバランサーはミラー先からの応答を待ちません。デフォルトではトラフィックスプリッティングの分割設定に関わらずミラーバックエンドは全リクエストを受信しますが、<code>mirrorPercent</code>（0〜100.0）を指定することでミラー対象の割合を制御できます。ミラーされたリクエストはCloud
                        Logging／Cloud Monitoringにログやメトリクスを一切生成しません。
                    </p>
                    <blockquote className="usecase-card" data-icon="▸">
                        <p>
                            <strong>ユースケース</strong>
                            ：新バージョンのバックエンドに本番トラフィックの複製を流し込んで性能検証する、あるいは本番で発生したエラーをデバッグ版バックエンドで再現・調査する、といった用途に使われます。
                        </p>
                    </blockquote>
                    <h3 id="url書き換えrewriteとリダイレクト">URL書き換え（Rewrite）とリダイレクト</h3>
                    <Diagram
                        id="diag-url-rewrite"
                        label="URL書き換え（Rewrite）の処理フロー"
                    />
                    <p>
                        <code>urlRewrite</code>
                        アクションは、バックエンドサービスへリクエストを送信する前に、ホスト名やパスの一部を書き換える機能です。書き換え・リダイレクトはURLマップの3つの階層（パスルール／パスマッチャー／URLマップ自体）のいずれでも設定でき、それぞれ「パスがマッチしたとき」「パスマッチャー内でどのパスにもマッチしなかったとき」「どのホストルールにもマッチしなかったとき」に適用されます。
                    </p>
                    <p>
                        これらのルートアクションは互いに組み合わせ可能で、トラフィックスプリッティング・ミラーリング・URL書き換え・リトライポリシー・タイムアウト・フォルトインジェクション・ヘッダー操作を1つのルートルールに同時設定できます。
                    </p>
                    <blockquote className="cite-card" data-icon="§">
                        <p><strong>出典</strong></p>
                        <ul>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global">
                                    https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global
                                </a>
                            </li>
                            <li>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/setting-up-url-rewrite">
                                    https://docs.cloud.google.com/load-balancing/docs/https/setting-up-url-rewrite
                                </a>
                            </li>
                        </ul>
                    </blockquote>
                </section>

                <hr />
                <section>
                    <h2 id="設計実装ベストプラクティスまとめ">設計・実装ベストプラクティスまとめ</h2>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="checklist-title">チェックリスト</span>
                            <span className="checklist-counter" data-total={CHECKLIST_ITEMS.length}>
                                {completedCount} / {CHECKLIST_ITEMS.length} 完了
                            </span>
                        </div>
                        <ul className="task-list">
                            {CHECKLIST_ITEMS.map((item, index) => (
                                <li
                                    key={item}
                                    className={checkedItems[index] ? 'checked' : ''}
                                >
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[index]}
                                            onChange={() => toggleCheck(index)}
                                        />
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <hr />
                <section>
                    <h2 id="参考文献">参考文献</h2>
                    <div className="ref-card">
                        <ul className="ref-list">
                            <li className="ref-item">
                                <strong>Choose a load balancer</strong> — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer">
                                    https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Application Load Balancer overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/application-load-balancer">
                                    https://docs.cloud.google.com/load-balancing/docs/application-load-balancer
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>External Application Load Balancer overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https">
                                    https://docs.cloud.google.com/load-balancing/docs/https
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Internal Application Load Balancer overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/l7-internal">
                                    https://docs.cloud.google.com/load-balancing/docs/l7-internal
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Load balancer feature comparison</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/features">
                                    https://docs.cloud.google.com/load-balancing/docs/features
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Backend services overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/backend-service">
                                    https://docs.cloud.google.com/load-balancing/docs/backend-service
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Scaling based on load balancing serving capacity</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/compute/docs/autoscaler/scaling-load-balancing">
                                    https://docs.cloud.google.com/compute/docs/autoscaler/scaling-load-balancing
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Advanced load balancing optimizations</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/service-lb-policy">
                                    https://docs.cloud.google.com/load-balancing/docs/service-lb-policy
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Network endpoint groups overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs">
                                    https://docs.cloud.google.com/load-balancing/docs/negs
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Zonal network endpoint groups overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts">
                                    https://docs.cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Serverless network endpoint groups overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts">
                                    https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Internet network endpoint groups overview</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts">
                                    https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Request distribution for external Application Load Balancers
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/request-distribution">
                                    https://docs.cloud.google.com/load-balancing/docs/https/request-distribution
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Traffic management overview for global external Application Load
                                    Balancers
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global">
                                    https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Traffic management overview for internal Application Load
                                    Balancers
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://cloud.google.com/load-balancing/docs/l7-internal/traffic-management">
                                    https://cloud.google.com/load-balancing/docs/l7-internal/traffic-management
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Traffic management overview for a classic Application Load
                                    Balancer
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/traffic-management">
                                    https://docs.cloud.google.com/load-balancing/docs/https/traffic-management
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Set up URL rewrite for a classic Application Load Balancer
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/setting-up-url-rewrite">
                                    https://docs.cloud.google.com/load-balancing/docs/https/setting-up-url-rewrite
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Set up an application-based health check and autohealing
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs">
                                    https://docs.cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Configure failover for internal passthrough Network Load
                                    Balancers
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-failover">
                                    https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-failover
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Enhancing Cloud Load
                                    Balancing（クロスリージョン内部LB発表ブログ）
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://cloud.google.com/blog/products/networking/enhancing-cloud-load-balancing/">
                                    https://cloud.google.com/blog/products/networking/enhancing-cloud-load-balancing/
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>About Gateway API（GKE networking）</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-api">
                                    https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-api
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>Deploying Gateways（GKE networking）</strong> —{' '}
                                <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways">
                                    https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    External Application Load Balancer performance best
                                    practices
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://docs.cloud.google.com/load-balancing/docs/https/http-load-balancing-best-practices">
                                    https://docs.cloud.google.com/load-balancing/docs/https/http-load-balancing-best-practices
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Professional Cloud Network Engineer Certification exam
                                    guide
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf">
                                    https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf
                                </a>
                            </li>
                            <li className="ref-item">
                                <strong>
                                    Google Cloud Professional Cloud Network Engineer 認定ページ
                                </strong>{' '}
                                — <span className="ref-icon">↗</span>
                                <a href="https://cloud.google.com/learn/certification/cloud-network-engineer">
                                    https://cloud.google.com/learn/certification/cloud-network-engineer
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}
