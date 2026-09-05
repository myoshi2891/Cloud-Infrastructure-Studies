'use client';

import React, { memo, useState, useCallback } from 'react';
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

export function PcneSection4CdnDnsIpamGuide() {
    const [navOpen, setNavOpen] = useState(false);
    const [checked1, setChecked1] = useState<boolean[]>(new Array(11).fill(false));
    const [checked2, setChecked2] = useState<boolean[]>(new Array(20).fill(false));

    const toggleCheck1 = useCallback((index: number) => {
        setChecked1((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    }, []);

    const toggleCheck2 = useCallback((index: number) => {
        setChecked2((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    }, []);

    return (
        <div className="pcne-s4-page">
            <NavBar
                isOpen={navOpen}
                onToggle={() => setNavOpen((prev) => !prev)}
                onClose={() => setNavOpen(false)}
            />
            <main className="main">
                <div className="hero">
                    <div className="hero-eyebrow">
                        Google Cloud Professional Cloud Network Engineer 試験対策
                    </div>
                    <h1>S4: CDN・DNS・IPアドレス管理</h1>
                    <p>
                        Cloud CDN・Cloud DNS・IPアドレス管理（IPAM）の3領域を、公式Exam
                        Guideのタスク定義に沿って中級者〜上級者向けに解説します。各項目の末尾には一次情報源（Google
                        Cloud公式ドキュメント）のURLを明記しています。
                    </p>
                </div>
                <h2 id="本ガイドについて">本ガイドについて</h2>
                <p>
                    本ガイドはGoogle Cloud Professional Cloud Network
                    Engineer（PCNE）認定試験の対策として、「CDN・DNS・IPアドレス管理」の3領域を中級者〜上級者向けに解説するドキュメントです。
                </p>
                <p>
                    公式Exam Guide（
                    <code>professional_cloud_network_engineer_exam_guide_english.pdf</code>
                    ）を直接確認したうえで、本ガイドは以下の出題タスクに対応しています。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">出題領域</th>
                                    <th scope="col">対応する公式Exam Guideのタスク</th>
                                    <th scope="col">本ガイドでの扱い</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud CDN</td>
                                    <td>Section 3, Task 3.2「Configuring Cloud CDN」</td>
                                    <td>
                                        Part
                                        1で全項目を網羅（対応オリジン、外部バックエンド、キャッシュ無効化）
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cloud DNS</td>
                                    <td>Section 3, Task 3.3「Configuring Cloud DNS」</td>
                                    <td>
                                        Part
                                        2で全項目を網羅（ゾーン管理、移行、ルーティングポリシー、DNSSEC、フォワーディング、split-horizon、クロスプロジェクトバインディング・ピアリング、GKE向けCloud
                                        DNS）
                                    </td>
                                </tr>
                                <tr>
                                    <td>IPアドレス管理（IPAM）</td>
                                    <td>
                                        Section 1, Task 1.2「Planning the IP address management
                                        (IPAM) strategy」の内容を、Section 2/Section
                                        6の実装・運用視点から深掘り
                                    </td>
                                    <td>
                                        Part
                                        3で、サブネット設計・PUPI・IPv6・内部レンジによるIPAM自動化・BYOIP・Private
                                        Service ConnectやServerless VPC AccessのIP割当・Cloud
                                        NATのIPアドレス/ポート管理までを一気通貫で解説
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    ロードバランシング（Task 3.1）は別ガイドで既に扱っているため、本ガイドではCloud
                    CDN・Cloud DNS・IPAMの3本柱に集中します。
                </p>
                <p>
                    各項目の末尾には根拠となる一次情報源（Google
                    Cloud公式ドキュメント）のURLを「出典」として明記しています。
                </p>
                <h2 id="part-1-cloud-cdn">Part 1: Cloud CDN</h2>
                <h3 id="11-cloud-cdnのアーキテクチャと動作原理">
                    1.1 Cloud CDNのアーキテクチャと動作原理
                </h3>
                <p>
                    Cloud CDN（Content Delivery
                    Network）は、Googleのグローバルなエッジネットワークを使ってコンテンツをユーザーの近くから配信するサービスです。Cloud
                    CDNは単独では機能せず、必ずグローバル外部Application Load
                    Balancerまたはクラシック Application Load
                    Balancerと組み合わせて使用します。ロードバランサがフロントエンドのIPアドレスとポートを提供し、Cloud
                    CDNはそのバックエンド（Google
                    Cloudでは「オリジンサーバー」と呼ぶ）からのレスポンスをエッジでキャッシュします。
                </p>
                <p>
                    リクエストの処理はGoogle Front
                    End（GFE）で行われます。GFEはユーザーに最も近いGoogleネットワークのエッジに位置し、Cloud
                    CDNが有効なバックエンドサービス・バックエンドバケットへのリクエストであれば、まずキャッシュを検索します。
                </p>
                <ul>
                    <li>
                        <strong>キャッシュヒット</strong>:
                        GFEがキャッシュキーに対応するレスポンスを保持していれば、そのままユーザーへ返却します（オリジンへの往復が発生しないため低レイテンシ）。
                    </li>
                    <li>
                        <strong>キャッシュミス</strong>:
                        GFEはリクエストをロードバランサ経由でオリジンサーバーへ転送します。レスポンスがキャッシュ可能であれば、次回以降のためにキャッシュへ格納します（この処理を「cache
                        fill」と呼び、キャッシュからクライアントへ配信することを「cache
                        egress」と呼びます）。
                    </li>
                    <li>
                        <strong>部分ヒット（partial hit）</strong>:
                        バイトレンジリクエストに対応したオリジンの場合、要求されたコンテンツの一部だけがキャッシュ済みで、残りをオリジンから取得するケースもあります。
                    </li>
                </ul>
                <Diagram id="diag-1" label="Cloud CDN キャッシュ検索と処理フロー" />
                <p>
                    「キャッシュヒット率」は、リクエストされたオブジェクトがキャッシュから配信された割合を示す重要指標です。ヒット率が低い場合は、後述するキャッシュキーの設定やTTL設定を見直します。
                </p>
                <p>
                    キャッシュされたコンテンツは、有効期限切れ（expiration）または削除（eviction）のいずれかが発生するまで配信対象となります。両者は独立した概念です。
                </p>
                <ul>
                    <li>
                        <strong>Expiration（期限切れ）</strong>: レスポンスに設定されたTTL（
                        <code>max-age</code>・<code>s-maxage</code>・<code>Expires</code>
                        ）に基づき、鮮度が切れているかどうかを判定します。
                    </li>
                    <li>
                        <strong>Eviction（削除）</strong>:
                        キャッシュ容量が満杯になった際、直近でアクセスされていないコンテンツから削除されます。期限切れかどうかに関わらず発生し、複数のGoogle
                        Cloudプロジェクトが同じGFE群のキャッシュ容量を共有するため、人気度は複数プロジェクトを横断して比較されます。30日間アクセスがなければ無条件に削除されます。
                    </li>
                </ul>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/overview">
                            Cloud CDN overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="12-対応オリジンバックエンドタイプ">
                    1.2 対応オリジン（バックエンドタイプ）
                </h3>
                <p>
                    Cloud CDNは、External Application Load
                    Balancerが対応する以下のバックエンドタイプすべてに対して有効化できます。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">バックエンドタイプ</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>インスタンスグループ（MIG）</td>
                                    <td>
                                        Compute
                                        EngineのマネージドインスタンスグループをVMベースのオリジンとして使用
                                    </td>
                                </tr>
                                <tr>
                                    <td>ゾーンNEG（Network Endpoint Group）</td>
                                    <td>ゾーン単位でエンドポイントを指定するバックエンド</td>
                                </tr>
                                <tr>
                                    <td>サーバーレスNEG</td>
                                    <td>
                                        Cloud Run、Cloud Run functions（旧Cloud Functions）、App
                                        Engineのいずれか1つ以上のサービスをオリジンとして使用
                                    </td>
                                </tr>
                                <tr>
                                    <td>Internet NEG（外部バックエンド）</td>
                                    <td>
                                        Google
                                        Cloud外部（オンプレミスや他クラウド）のエンドポイントをオリジンとして使用
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cloud Storageバックエンドバケット</td>
                                    <td>
                                        Cloud Storageバケットを静的コンテンツのオリジンとして使用
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram
                    id="diag-2"
                    label="External Application Load Balancer と対応バックエンド"
                />
                <p>
                    キャッシュヒット・ミスの挙動は、Compute Engine・バックエンドバケット・GKE
                    Ingress・GKE
                    Gatewayを含むすべての対応バックエンドタイプで一貫しています。GKEワークロードに対しては、GKE
                    Ingressコントローラのバックエンド設定、またはGKE Gatewayの
                    <code>GCPHTTPFilter</code>カスタムリソースを使ってCloud CDNを構成できます。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/cdn/docs/overview">
                                Cloud CDN overview
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/cdn/docs/external-backends-internet-neg-overview">
                                External backends specified by using internet NEGs
                            </a>
                        </li>
                    </ul>
                </blockquote>
                <h3 id="13-外部バックエンドinternet-negとハイブリッドマルチクラウド構成">
                    1.3 外部バックエンド（Internet NEG）とハイブリッド/マルチクラウド構成
                </h3>
                <p>
                    オンプレミスや他クラウドにホストされたコンテンツも、Cloud
                    CDNのグローバルエッジキャッシュ経由で配信できます。この際に使用するのが「Internet
                    NEG」（外部バックエンドを指定するAPIリソース）です。
                </p>
                <p>Internet NEGのエンドポイントタイプは2種類あります。</p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">エンドポイントアドレス</th>
                                    <th scope="col">タイプ</th>
                                    <th scope="col">使いどころ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ホスト名 + 任意のポート</td>
                                    <td>
                                        <code>INTERNET_FQDN_PORT</code>
                                    </td>
                                    <td>
                                        外部バックエンドをパブリックDNSで解決可能なFQDNで指定する場合のベストプラクティス。IPアドレス変更の影響を受けにくい
                                    </td>
                                </tr>
                                <tr>
                                    <td>IPアドレス + 任意のポート</td>
                                    <td>
                                        <code>INTERNET_IP_PORT</code>
                                    </td>
                                    <td>パブリックにアクセス可能なIPアドレスを直接指定する場合</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    Internet
                    NEGの作成後、この2種類のエンドポイントタイプを相互に変更することはできません（新規作成が必要）。また、Cloud
                    CDNは1つのサービスにつき単一の外部バックエンドからのフェッチのみをサポートし、複数の外部バックエンド間でのロードバランシングや、外部バックエンドとGoogle
                    Cloudバックエンドとの間でのロードバランシングは行いません。
                </p>
                <Diagram id="diag-3" label="URL マップによるマルチオリジンルーティング" />
                <p>
                    この構成は、段階的なクラウド移行やマルチクラウド戦略において、一部のコンテンツ（例:
                    画像）はGoogle Cloudへ、他のコンテンツ（例:
                    動画）はオンプレミスに残したまま、URLマップのパスルール（<code>/images/*</code>
                    、<code>/video/*</code>など）で振り分けるユースケースに有効です。
                </p>
                <p>
                    外部バックエンドが特定の<code>Host</code>
                    ヘッダーを期待する場合は、バックエンドサービス側でカスタムリクエストヘッダーとして
                    <code>Host</code>
                    を明示的に設定する必要があります（未設定の場合、クライアントが接続時に使用した
                    <code>Host</code>ヘッダーがそのまま引き継がれます）。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/external-backends-internet-neg-overview">
                            External backends specified by using internet NEGs
                        </a>
                    </p>
                </blockquote>
                <h3 id="14-キャッシュモードとキャッシュ可否の判定">
                    1.4 キャッシュモードとキャッシュ可否の判定
                </h3>
                <p>
                    Cloud CDNには3つのキャッシュモードがあり、オリジンからのキャッシュ指示（
                    <code>Cache-Control</code>ヘッダー等）をどこまで尊重するかを制御します。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">キャッシュモード</th>
                                    <th scope="col">動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>CACHE_ALL_STATIC</code>（デフォルト）
                                    </td>
                                    <td>
                                        静的コンテンツタイプの成功レスポンスを自動キャッシュ。オリジンが有効なキャッシュ指示を送っていればそれも尊重する。gcloud
                                        CLIやREST APIで作成したCloud
                                        CDN対応バックエンドのデフォルト動作
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>USE_ORIGIN_HEADERS</code>
                                    </td>
                                    <td>
                                        オリジンの成功レスポンスに有効なキャッシュ指示・キャッシュヘッダーが含まれていることを必須とする。指示がなければキャッシュせずそのままオリジンから転送
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>FORCE_CACHE_ALL</code>
                                    </td>
                                    <td>
                                        オリジンが設定したキャッシュ指示を無視し、成功レスポンスを無条件にキャッシュ。動的なHTML・APIレスポンス等、ユーザー固有のコンテンツを扱うバックエンドには非推奨。プライベートバケットアクセスを有効化したバケットでは、このモードが必須になる場合がある
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram id="diag-4" label="Cloud CDN キャッシュモードの選択フロー" />
                <p>
                    <code>CACHE_ALL_STATIC</code>
                    モードでオリジンからのキャッシュ指示がない場合、以下のMIMEタイプが自動的にキャッシュ対象となります。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">MIMEタイプ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Webアセット</td>
                                    <td>
                                        <code>text/css</code>、<code>text/ecmascript</code>、
                                        <code>text/javascript</code>、
                                        <code>application/javascript</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>フォント</td>
                                    <td>
                                        <code>font/*</code>に一致するすべて
                                    </td>
                                </tr>
                                <tr>
                                    <td>画像</td>
                                    <td>
                                        <code>image/*</code>に一致するすべて
                                    </td>
                                </tr>
                                <tr>
                                    <td>動画</td>
                                    <td>
                                        <code>video/*</code>に一致するすべて
                                    </td>
                                </tr>
                                <tr>
                                    <td>音声</td>
                                    <td>
                                        <code>audio/*</code>に一致するすべて
                                    </td>
                                </tr>
                                <tr>
                                    <td>ドキュメント</td>
                                    <td>
                                        <code>application/pdf</code>、
                                        <code>application/postscript</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    <code>text/html</code>や<code>application/json</code>
                    は、動的（ユーザー固有）なレスポンスであることが多いため、デフォルトではキャッシュ対象になりません。これらをキャッシュしたい場合は、オリジン側で明示的な
                    <code>Cache-Control</code>ヘッダーを設定する必要があります。
                </p>
                <p>キャッシュ可否のデフォルト値は以下のとおりです。</p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">パラメータ</th>
                                    <th scope="col">デフォルト値</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cache mode</td>
                                    <td>
                                        <code>CACHE_ALL_STATIC</code>
                                    </td>
                                    <td>一般的な静的コンテンツタイプを自動キャッシュ</td>
                                </tr>
                                <tr>
                                    <td>Client TTL</td>
                                    <td>
                                        <code>3600秒</code>
                                    </td>
                                    <td>
                                        クライアントブラウザキャッシュの<code>max-age</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Default TTL</td>
                                    <td>
                                        <code>3600秒</code>
                                    </td>
                                    <td>オリジンがヘッダーを返さない場合のキャッシュ期間</td>
                                </tr>
                                <tr>
                                    <td>Include Host</td>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>キャッシュキーにホストを含める</td>
                                </tr>
                                <tr>
                                    <td>Include Protocol</td>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>HTTP/HTTPSを別オブジェクトとしてキャッシュ</td>
                                </tr>
                                <tr>
                                    <td>Include Query String</td>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>クエリ文字列全体をキャッシュキーに含める</td>
                                </tr>
                                <tr>
                                    <td>Max TTL</td>
                                    <td>
                                        <code>86400秒</code>
                                    </td>
                                    <td>キャッシュに残る絶対最大時間（24時間）</td>
                                </tr>
                                <tr>
                                    <td>Negative Caching</td>
                                    <td>
                                        <code>false</code>
                                    </td>
                                    <td>404などのエラーレスポンスはデフォルトでキャッシュしない</td>
                                </tr>
                                <tr>
                                    <td>Serve While Stale</td>
                                    <td>
                                        <code>86400秒</code>
                                    </td>
                                    <td>
                                        オリジンに到達不能な場合、最大24時間古いコンテンツを配信
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    以下のいずれかに該当するレスポンスはキャッシュされません（
                    <code>FORCE_CACHE_ALL</code>の一部を除く）。
                </p>
                <ul>
                    <li>
                        <code>Set-Cookie</code>ヘッダーを持つ
                    </li>
                    <li>
                        許可されたもの以外の<code>Vary</code>ヘッダー値を持つ
                    </li>
                    <li>
                        <code>Cache-Control: no-store</code>または<code>private</code>
                        ディレクティブを持つ
                    </li>
                    <li>
                        リクエストに<code>Authorization</code>
                        ヘッダーがあり、レスポンス側でオーバーライドされていない
                    </li>
                    <li>
                        最大サイズ（バイトレンジ対応オリジンで100 GiB、非対応オリジンで10
                        MiB）を超える
                    </li>
                </ul>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/caching">
                            Caching overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="15-キャッシュキーのカスタマイズ">1.5 キャッシュキーのカスタマイズ</h3>
                <p>
                    Cloud
                    CDNのキャッシュキーは、デフォルトでリクエストURIの全体（バックエンドサービスの場合）またはプロトコル・ホストを除いたURI（バックエンドバケットの場合）を使用します。キャッシュヒット率を最適化するため、以下の要素を個別に含める・除外することができます。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">URIパートの調整</th>
                                    <th scope="col">効果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>プロトコルを除外</td>
                                    <td>
                                        <code>http://</code> と<code>https://</code>{' '}
                                        を同一キャッシュキーとして扱う
                                    </td>
                                </tr>
                                <tr>
                                    <td>ホストを除外</td>
                                    <td>
                                        複数ホスト名（同一コンテンツを配信する複数ドメイン等）を同一キャッシュとして扱う
                                    </td>
                                </tr>
                                <tr>
                                    <td>クエリ文字列を除外</td>
                                    <td>クエリパラメータ違いを同一キャッシュとして扱う</td>
                                </tr>
                                <tr>
                                    <td>クエリ文字列の含め・除外リスト</td>
                                    <td>
                                        特定パラメータのみ含める（include
                                        list）、または特定パラメータのみ除外する（exclude
                                        list）。両方を同時指定することはできない
                                    </td>
                                </tr>
                                <tr>
                                    <td>HTTPリクエストヘッダーの追加</td>
                                    <td>
                                        デバイスタイプ・言語などに応じてバリエーションをキャッシュ（
                                        <code>Authorization</code>、<code>Cookie</code>、
                                        <code>Referer</code>、<code>User-Agent</code>
                                        等の高カーディナリティなヘッダーは追加不可）
                                    </td>
                                </tr>
                                <tr>
                                    <td>名前付きCookieの追加（バックエンドサービスのみ）</td>
                                    <td>
                                        最大5つまでのCookie名を指定し、A/Bテストやカナリアリリースなどのバリエーションをキャッシュ
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    クエリパラメータの順序はキャッシュキーの一致判定に影響しません（
                    <code>a=1&amp;b=2</code>と<code>b=2&amp;a=1</code>は同一キーになります）。
                </p>
                <p>
                    Cloud
                    Storageバックエンドバケットに対しては、キャッシュバスティング（更新されたファイルを即座に反映させる仕組み）のためにクエリ文字列のinclude
                    listを使う手法が有効です。たとえば<code>?version=VERSION</code>や
                    <code>?hash=HASH</code>
                    のようなパラメータをキャッシュキーに含めることで、明示的な無効化なしに新しいバージョンを配信できます。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/caching">
                            Caching overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="16-キャッシュの無効化invalidation">
                    1.6 キャッシュの無効化（Invalidation）
                </h3>
                <p>
                    キャッシュ無効化（cache
                    purging）は、正規の期限切れ前に特定のコンテンツをキャッシュから強制的に削除する操作です。
                </p>
                <ul>
                    <li>
                        パスパターン（例: <code>/picture*</code>
                        ）またはホスト単位で無効化を指定できます。
                    </li>
                    <li>
                        クエリ文字列違いだけで個別のオブジェクトを無効化することはできません（
                        <code>/images.php?image=fred.png</code>のようなURLを個別無効化する場合は
                        <code>/images.php</code>をパスパターンとして指定する必要があります）。
                    </li>
                    <li>
                        キャッシュタグ（<code>Cache-Tag</code>
                        レスポンスヘッダーで指定する「サロゲートキー」）を使うと、任意のメタデータ単位で一括無効化できます。1オブジェクトあたり最大50タグ、合計4
                        KiBまで、1回のリクエストで最大10タグを論理OR条件として指定可能です。
                    </li>
                    <li>
                        無効化リクエストはレート制限されており、1分あたり最大500件、反映には約10秒かかります。
                    </li>
                </ul>
                <Diagram id="diag-5" label="キャッシュ無効化の一致条件と処理" />
                <p>
                    ベストプラクティスとして、無効化は「例外的な状況」（法的理由や誤アップロードの是正など）のためのものであり、通常のデプロイフローの一部として多用すべきではありません。日常的なコンテンツ更新には、TTL設計やバージョン付きURL（
                    <code>file.css?v=2</code>のような）を優先します。
                </p>
                <p>
                    Shared
                    VPCのクロスプロジェクトサービス参照を使う構成では、キャッシュ無効化はロードバランサのフロントエンド（転送規則・ターゲットプロキシ・URLマップ）を持つプロジェクト側で行う必要があり、サービスプロジェクト側の管理者はデフォルトでは無効化権限を持ちません。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/cache-invalidation-overview">
                            Cache invalidation overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="17-コンテンツのアクセス制御署名付きurl署名付きcookie">
                    1.7 コンテンツのアクセス制御（署名付きURL・署名付きCookie）
                </h3>
                <p>Cloud CDNは、コンテンツへのアクセスを制御する3つの手段を提供します。</p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">手法</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>署名付きURL（Signed URL）</td>
                                    <td>
                                        Googleアカウントの有無に関わらず、URLを保持する誰でも一定期間アクセス可能にする。単一または少数のリソースを保護する場合に適する
                                    </td>
                                </tr>
                                <tr>
                                    <td>署名付きCookie（Signed Cookie）</td>
                                    <td>
                                        特定のURLプレフィックス（例:{' '}
                                        <code>https://media.example.com/videos/</code>
                                        ）配下のすべてのリクエストを、1つのCookieで一定期間認可する。HLS/DASHのようにマニフェスト内の多数のURLを個別に署名するのが非現実的な場合に有効
                                    </td>
                                </tr>
                                <tr>
                                    <td>プライベートオリジン認証</td>
                                    <td>
                                        Amazon S3や互換オブジェクトストアなど、Cloud
                                        CDN外の第三者オリジンへの直接アクセスを防ぎ、Cloud
                                        CDN経由の接続のみを許可する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    署名付きURL・署名付きCookieはURLマップでは直接設定できず、バックエンドサービスまたはバックエンドバケット単位で設定します。署名の検証はCloud
                    CDN自体では行われないため、オリジン側のWebサーバーが署名を検証し、不正なリクエストにはHTTP
                    403を返す実装が必須です。署名済みリクエストと未署名リクエストは別々にキャッシュされるため、キャッシュ可能なステータスコードを不正なリクエストに返すと、以降の正当なリクエストが誤って拒否される可能性がある点に注意します。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/authenticate-content">
                            Content access control
                        </a>
                    </p>
                </blockquote>
                <h3 id="18-cloud-cdnのベストプラクティス">1.8 Cloud CDNのベストプラクティス</h3>
                <p>
                    Google公式のベストプラクティスドキュメントは、キャッシュヒット率・パフォーマンス・セキュリティ・キャッシュ運用・アップロード整合性・監視の6領域に整理されています。
                </p>
                <p>
                    <strong>キャッシュヒット率の最適化</strong>
                </p>
                <ul>
                    <li>
                        オリジンの<code>Cache-Control</code>ヘッダーに詳しくない場合は、
                        <code>CACHE_ALL_STATIC</code>
                        （デフォルト）のまま静的コンテンツを自動キャッシュさせるのが推奨。
                    </li>
                    <li>ユーザー固有のコンテンツはCloud CDNでキャッシュしない。</li>
                    <li>
                        キャッシュキーからホストやプロトコルを除外し、不要なキャッシュの分散（シャーディング）を避ける。
                    </li>
                    <li>
                        GKE Gatewayを使う場合は、単一のグローバルキャッシュポリシーではなく
                        <code>GCPHTTPFilter</code>でパスごとに<code>cacheKeyPolicy</code>
                        とTTLをカスタマイズする（例: <code>/static/*</code>
                        はクエリ文字列を除外してヒット率を最大化、<code>/api/*</code>
                        は特定クエリ文字列を含めて動的応答を正しく区別）。
                    </li>
                </ul>
                <p>
                    <strong>パフォーマンスの最適化</strong>
                </p>
                <ul>
                    <li>HTTP/3・QUICプロトコルサポートを有効化する。</li>
                    <li>
                        GKE Gatewayでは、Podの再起動・一時的な到達不能に備え
                        <code>serveWhileStale</code>を24時間以上に設定し、
                        <code>requestCoalescing</code>
                        を有効化してオリジンへの同時キャッシュフィルリクエストを集約する。
                    </li>
                    <li>
                        ネガティブキャッシングを活用し、エラーやリダイレクトのレスポンスも適切なTTLでキャッシュしてオリジン負荷を下げる。
                    </li>
                    <li>
                        TLS Early
                        Data（0-RTT）を有効化し、再開接続のパフォーマンスを30〜50%改善する。
                    </li>
                </ul>
                <p>
                    <strong>セキュリティの最適化</strong>
                </p>
                <ul>
                    <li>
                        Cloud
                        Armorをキャッシュ済みコンテンツ（エッジセキュリティポリシー）とキャッシュミス・動的コンテンツ（バックエンドセキュリティポリシー）の両方に適用する。
                    </li>
                    <li>
                        署名付きURLを使う場合は、パブリック用とプライベート用でCloud
                        Storageバケットを分離する。
                    </li>
                    <li>
                        GKE Gateway環境でIAPとCloud
                        CDNを併用する場合、両者は同一ルートで併存できないため、
                        <code>GCPBackendPolicy</code>でIAPが有効なパスに<code>GCPHTTPFilter</code>
                        のキャッシュ設定を併用しないよう構成する。
                    </li>
                </ul>
                <p>
                    <strong>キャッシュの運用</strong>
                </p>
                <ul>
                    <li>
                        コンテンツのカテゴリ（ほぼリアルタイム、頻繁に更新、稀に更新）ごとにTTLを設計する。
                    </li>
                    <li>
                        バージョン付きURL（クエリパラメータ、ファイル名、パスへのバージョン番号付与）を、無効化に代わるデフォルトの更新手法として採用する。
                    </li>
                    <li>無効化は最終手段として最小限にとどめる。</li>
                </ul>
                <p>
                    <strong>アップロードの整合性</strong>
                </p>
                <ul>
                    <li>
                        既存ファイルの上書きより、バージョン番号や日付を付けた新規ファイル名でのアップロードを優先する。
                    </li>
                    <li>
                        既存ファイルを更新する場合は、一時的な名前でアップロードしてから目的の名前へリネームすることでアトミック性を担保する。
                    </li>
                    <li>
                        バイトレンジキャッシュされたファイルを更新する場合は、無効化リクエストを併用する。
                    </li>
                </ul>
                <p>
                    <strong>監視・ロギング</strong>
                </p>
                <ul>
                    <li>すべてのCloud CDN対応バックエンドでロギングを有効化する。</li>
                    <li>Cloud CDN用のカスタムモニタリングダッシュボードを定期的に確認する。</li>
                </ul>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/cdn/docs/best-practices">
                            Content delivery best practices
                        </a>
                    </p>
                </blockquote>
                <hr />
                <h2 id="part-2-cloud-dns">Part 2: Cloud DNS</h2>
                <h3 id="21-cloud-dnsの基本アーキテクチャとゾーンタイプ">
                    2.1 Cloud DNSの基本アーキテクチャとゾーンタイプ
                </h3>
                <p>
                    Cloud
                    DNSは低レイテンシかつ高可用なDNSゾーンサービスであり、インターネットに公開される「パブリックゾーン」と、指定したVPCネットワーク内からのみ参照可能な「プライベートゾーン」の両方に対して権威DNSサーバーとして機能します。
                </p>
                <p>Cloud DNSが提供する主なゾーンの種類は以下のとおりです。</p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ゾーンタイプ</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>パブリックゾーン</td>
                                    <td>
                                        インターネットに公開される権威ゾーン。ゾーンApexにはNS/SOAレコードが存在し削除不可
                                    </td>
                                </tr>
                                <tr>
                                    <td>プライベートゾーン</td>
                                    <td>指定したVPCネットワークからのみクエリ可能なゾーン</td>
                                </tr>
                                <tr>
                                    <td>フォワーディングゾーン</td>
                                    <td>
                                        プライベートゾーンの一種。レコードを持たず、代わりにフォワーディングターゲット（DNSサーバー）を指定する
                                    </td>
                                </tr>
                                <tr>
                                    <td>ピアリングゾーン（DNSピアリング）</td>
                                    <td>
                                        別のVPCネットワーク（DNSプロデューサーネットワーク）のDNS解決結果をそのまま参照するプライベートゾーン
                                    </td>
                                </tr>
                                <tr>
                                    <td>マネージドリバースルックアップゾーン</td>
                                    <td>
                                        Compute
                                        EngineのDNSデータに対してPTRルックアップを行う特殊なプライベートゾーン
                                    </td>
                                </tr>
                                <tr>
                                    <td>Service Directoryゾーン</td>
                                    <td>
                                        Service
                                        Directoryのネームスペースをバックエンドとするプライベートゾーン。レコードは直接追加できず、Service
                                        Directory側の登録内容から自動的に導出される
                                    </td>
                                </tr>
                                <tr>
                                    <td>ゾーナルCloud DNSゾーン</td>
                                    <td>
                                        GKEのクラスタスコープ選択時に作成される、単一のGoogle
                                        Cloudゾーンにスコープされたプライベートゾーン
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    Cloud
                    DNSはプロジェクトレベル・個別ゾーンレベルの両方でIAM権限を細かく設定できます。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/overview">
                            Cloud DNS overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="22-パブリックゾーンとプライベートゾーンsplit-horizon-dns">
                    2.2 パブリックゾーンとプライベートゾーン、Split-Horizon DNS
                </h3>
                <p>
                    同一のドメイン名でパブリックゾーンとプライベートゾーンの両方を作成すると、クエリの発信元に応じて異なる応答を返す「Split-Horizon
                    DNS」を実現できます。
                </p>
                <p>
                    以下は、<code>gcp.example.com</code>
                    というパブリックゾーンとプライベートゾーンを両方作成した場合の例です。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ゾーン</th>
                                    <th scope="col">レコード</th>
                                    <th scope="col">タイプ</th>
                                    <th scope="col">TTL</th>
                                    <th scope="col">データ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>プライベート</td>
                                    <td>
                                        <code>myrecord1.gcp.example.com</code>
                                    </td>
                                    <td>A</td>
                                    <td>5</td>
                                    <td>
                                        <code>10.128.1.35</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>パブリック</td>
                                    <td>
                                        <code>myrecord1.gcp.example.com</code>
                                    </td>
                                    <td>A</td>
                                    <td>5</td>
                                    <td>
                                        <code>104.198.6.142</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>パブリック</td>
                                    <td>
                                        <code>myrecord2.gcp.example.com</code>
                                    </td>
                                    <td>A</td>
                                    <td>50</td>
                                    <td>
                                        <code>104.198.7.145</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram id="diag-6" label="Split-Horizon DNS による名前解決" />
                <p>
                    VPCネットワーク内のVMから<code>myrecord2.gcp.example.com</code>
                    を問い合わせた場合、プライベートゾーンに該当レコードが存在しないため
                    <code>NXDOMAIN</code>
                    が返ります（同名のレコードがパブリックゾーンに存在していても影響しません）。これは、Google
                    Cloudの名前解決が「最長サフィックス一致」で該当ゾーンを特定し、そのゾーン内でレコードが見つからなければ他のゾーンにフォールバックしない、という仕様に基づきます。
                </p>
                <p>
                    2つのゾーンが「オーバーラップ」する条件（片方のオリジンドメインがもう片方のサブドメインである、または完全一致する）についても整理しておきます。
                </p>
                <ul>
                    <li>
                        パブリックゾーン同士のオーバーラップは、同一のCloud
                        DNSネームサーバー上では許可されません。
                    </li>
                    <li>プライベートゾーンは任意のパブリックゾーンとオーバーラップ可能です。</li>
                    <li>
                        異なるVPCネットワークにスコープされたプライベートゾーン同士は、オーバーラップしても構いません。
                    </li>
                    <li>
                        同一VPCネットワークに認可された2つのプライベートゾーンは、片方がもう片方のサブドメインでない限り、同一オリジンを持つことはできません。
                    </li>
                </ul>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/zones/zones-overview">
                            DNS zones overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="23-フォワーディングゾーンとピアリングゾーン">
                    2.3 フォワーディングゾーンとピアリングゾーン
                </h3>
                <p>
                    <strong>フォワーディングゾーン</strong>
                    は、レコードを保持せず、指定したフォワーディングターゲット（DNSサーバー）へクエリを転送するプライベートゾーンです。フォワーディングターゲットは4種類に分類されます。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ターゲットタイプ</th>
                                    <th scope="col">定義</th>
                                    <th scope="col">想定される用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Type 1</td>
                                    <td>
                                        同一VPCネットワーク内のGoogle Cloud
                                        VMまたは内部パススルーNetwork Load Balancerの内部IPアドレス
                                    </td>
                                    <td>同一VPC内のカスタムDNSサーバー</td>
                                </tr>
                                <tr>
                                    <td>Type 2</td>
                                    <td>
                                        Cloud VPNまたはCloud
                                        Interconnectで接続されたオンプレミスシステムのIPアドレス
                                    </td>
                                    <td>オンプレミスDNSサーバーへの転送</td>
                                </tr>
                                <tr>
                                    <td>Type 3</td>
                                    <td>インターネットからアクセス可能な外部IPアドレス</td>
                                    <td>パブリックなDNSサーバーや別VPCのVMの外部IP</td>
                                </tr>
                                <tr>
                                    <td>Type 4</td>
                                    <td>
                                        標準・非標準の名前解決順序でIPv4/IPv6両方を解決できるFQDN
                                    </td>
                                    <td>IPアドレスが変動するターゲットの指定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    ルーティング方式は「標準ルーティング」（RFC
                    1918アドレスは認可済みVPC経由、それ以外はインターネット経由）と「プライベートルーティング」（RFC
                    1918かどうかに関わらず常に認可済みVPC経由。Type
                    1/2のみサポート）の2種類があります。
                </p>
                <p>
                    重要な制約として、Cloud
                    DNSはフォワーディングターゲットへの推移的ルーティング（transitive
                    routing）をサポートしません。オンプレミスに接続された<code>vpc-net-a</code>
                    とピアリングされた<code>vpc-net-b</code>から<code>vpc-net-a</code>
                    経由でオンプレミスのフォワーディングターゲットへ到達しようとしても失敗します。この場合は、
                    <code>vpc-net-b</code>から<code>vpc-net-a</code>
                    をターゲットとするピアリングゾーンを作成することで解決します。
                </p>
                <p>
                    <strong>ピアリングゾーン</strong>（DNS
                    Peering）は、別のVPCネットワーク（DNSプロデューサーネットワーク）で解決される内容を、認可されたVPCネットワーク（DNSコンシューマーネットワーク）からそのまま参照できるようにするプライベートゾーンです。DNSピアリングは一方向の関係であり、VPCネットワークピアリングとは全く別の仕組みです（VPCネットワークピアリングを設定しても、DNS情報は自動的には共有されません）。推移的なDNSピアリングは1ホップまでサポートされます（最大3つのVPCネットワークを、中間の1つがホップとなる形でチェーンできます）。
                </p>
                <Diagram id="diag-7" label="DNS ピアリングとフォワーディングの組み合わせ" />
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/zones/zones-overview">
                            DNS zones overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="24-dnsルーティングポリシーとヘルスチェック">
                    2.4 DNSルーティングポリシーとヘルスチェック
                </h3>
                <p>
                    Cloud
                    DNSは、パブリック・プライベート両方のゾーンのリソースレコードセットに対して3種類のルーティングポリシーを設定でき、トラフィックを特定の条件に応じて誘導できます。フォワーディングゾーン・DNSピアリングゾーン・マネージドリバースルックアップゾーン・Service
                    Directoryゾーンにはルーティングポリシーを設定できません。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ポリシー</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Weighted Round Robin（WRR）</td>
                                    <td>
                                        DNS名に対する各レコードセットに異なる重みを割り当て、その比率でトラフィックを分散する。Active-ActiveやActive-Passive構成、本番/実験バージョン間のトラフィック分割などに使用。Geolocationポリシーとの併用は不可
                                    </td>
                                </tr>
                                <tr>
                                    <td>Geolocation</td>
                                    <td>
                                        送信元の地理的位置（Googleリージョン）を特定のDNSターゲットにマッピングする。送信元が完全一致しない場合は最も近いポリシーが適用される
                                    </td>
                                </tr>
                                <tr>
                                    <td>Failover</td>
                                    <td>
                                        アクティブ/バックアップ構成による高可用性を実現する。アクティブ集合がすべて不健全になった場合にバックアップ集合へ切り替える
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    Geolocationポリシーは、Geofence（地理フェンス）を併用することで、そのリージョン内のすべてのエンドポイントが不健全であっても強制的にそのリージョンへトラフィックを固定できます（Geofence無効時は自動的に次に近いリージョンへフェイルオーバーします）。
                </p>
                <p>
                    Failoverポリシーでは、バックアップ集合への切り替え時に「trickle」（徐々にトラフィックを流す）機能を使い、0〜1の割合でバックアップへのトラフィック比率を段階的に検証できます（典型値は0.1）。
                </p>
                <Diagram id="diag-8" label="DNS ルーティングポリシーの選択フロー" />
                <p>
                    ヘルスチェックは、内部Application Load
                    Balancer（リージョン/クロスリージョン）、内部パススルーNetwork Load
                    Balancer、内部プロキシNetwork Load
                    Balancer（プレビュー）、そして外部エンドポイントに対応します。内部パススルーNetwork
                    Load Balancerの場合、Cloud
                    DNSはバックエンドインスタンス単位のヘルス情報を確認し、デフォルトで20%のインスタンスが健全であればエンドポイント全体を健全と判定します。外部エンドポイントに対するヘルスチェックは、3つのGoogle
                    Cloudソースリージョンからそれぞれ3つのプローバー（合計9プローバー）で実施され、TCP・HTTP・HTTPSプロトコルに対応します（SSL・HTTP/2・gRPCは非対応）。
                </p>
                <p>
                    DNSSECを有効化したマネージドゾーンでヘルスチェックを併用する場合、各ポリシーアイテム内で使用できるIPアドレスは1つのみに制限されます。
                </p>
                <p>
                    ルーティングポリシーがサポートするレコードタイプはA・AAAA・CNAME・MX・SRV・TXTですが、ヘルスチェックが有効なのはA・AAAAレコードのみです。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/routing-policies-overview">
                            DNS routing policies and health checks
                        </a>
                    </p>
                </blockquote>
                <h3 id="25-dnssecdns-security-extensions">2.5 DNSSEC（DNS Security Extensions）</h3>
                <p>
                    DNSSECは、DNSルックアップへの応答を認証する仕組みであり、プライバシー保護は提供しませんが、DNS応答の改ざん・ポイズニング攻撃を防止します。DNSSECを完全に機能させるには、以下の3か所すべてで有効化・設定が必要です。
                </p>
                <ol type="1">
                    <li>
                        <strong>DNSゾーン</strong>: Cloud
                        DNSでDNSSECを有効化すると、DNSKEYレコードの作成・ローテーション、およびRRSIGレコードによるゾーンデータの署名が自動的に管理されます。
                    </li>
                    <li>
                        <strong>トップレベルドメイン（TLD）レジストリ</strong>:
                        ドメインレジストラでDNSSECを有効化し、ゾーン内のDNSKEYレコードを認証するDSレコードをレジストリに登録する必要があります。レジストラ・レジストリの両方がDNSSECに対応していない場合、Cloud
                        DNS側でDNSSECを有効化しても効果がありません。
                    </li>
                    <li>
                        <strong>DNSリゾルバ</strong>:
                        完全な保護のためには、DNSSEC署名済みドメインの署名を検証するリゾルバを使用する必要があります（Google
                        Public DNSなどの検証対応パブリックリゾルバを利用可能）。
                    </li>
                </ol>
                <p>
                    Cloud
                    DNSは、DNSSECが有効化された状態のゾーンを、信頼チェーンを切断することなく他のDNSオペレータとの間で移行（マイグレーション）することもサポートしています。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/dnssec">
                            DNS Security Extensions (DNSSEC) overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="26-dnsサーバーポリシーinbound--outbound">
                    2.6 DNSサーバーポリシー（Inbound / Outbound）
                </h3>
                <p>
                    DNSサーバーポリシーは、VPCネットワーク単位でDNS解決に使用するDNSサーバーを制御する仕組みで、インバウンド・アウトバウンドのいずれか、または両方を同時に構成できます。
                </p>
                <p>
                    <strong>インバウンドサーバーポリシー</strong>は、VPCネットワークのCloud
                    DNS名前解決サービスを、Cloud VPNトンネル・Cloud Interconnect
                    VLANアタッチメント・Router
                    Applianceで接続されたオンプレミスネットワークからも利用可能にします。有効化すると、適用対象VPCネットワーク内のすべてのサブネット（プロキシ専用サブネットやPrivate
                    NAT用サブネットを除く）ごとに、プライマリIPv4範囲から内部IPv4アドレスの「インバウンドサーバーポリシーエントリポイント」が作成されます。
                </p>
                <p>
                    インバウンドサーバーポリシーエントリポイントはVPCネットワークピアリングやNetwork
                    Connectivity
                    Center（NCC）の境界を越えて到達できないため、必ずハイブリッド接続を受け取るVPCネットワーク自体にローカルポリシーとしてデプロイする必要があります（ピアリングされた別ネットワークのレコードを解決したい場合は、そちらにDNSピアリングゾーンを作成します）。
                </p>
                <p>
                    <strong>アウトバウンドサーバーポリシー</strong>
                    は、代替ネームサーバーのリストを指定してVPCネットワークの名前解決順序を変更する仕組みです。代替ネームサーバーが1つでも設定されると、GKEクラスタスコープのレスポンスポリシーやプライベートゾーンにマッチしない限り、すべてのクエリが代替ネームサーバーへ送信されます。多くのCloud
                    DNS機能（プライベートゾーン、ピアリング等）の解決が無効化される点に注意が必要です。
                </p>
                <Diagram id="diag-9" label="Inbound / Outbound サーバーポリシーの動作" />
                <p>
                    代替ネームサーバーの区分（Type
                    1〜3）はフォワーディングターゲットと同様に、ルーティング方式・ネットワーク要件が定義されています。とくにType
                    1・Type 2の場合、Cloud DNSは<code>35.199.192.0/19</code>
                    を送信元としてクエリを送るため、オンプレミス側・代替ネームサーバー側の双方で、このレンジからのTCP/UDPポート53を許可するファイアウォールルールが必要です。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/server-policies-overview">
                            DNS server policies
                        </a>
                    </p>
                </blockquote>
                <h3 id="27-クロスプロジェクトバインディング-vs-dnsピアリング">
                    2.7 クロスプロジェクトバインディング vs DNSピアリング
                </h3>
                <p>
                    Shared
                    VPC環境では、DNSネームスペースの所有権をどのプロジェクトに置くかという設計判断が発生します。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">DNSピアリングのみの構成</th>
                                    <th scope="col">クロスプロジェクトバインディング</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ゾーンの作成・管理</td>
                                    <td>
                                        各サービスプロジェクトが独自のVPCネットワークを持ち、そこにゾーンを作成してホストプロジェクトとピアリングする
                                    </td>
                                    <td>
                                        サービスプロジェクトが直接ゾーンを作成・管理し、Shared
                                        VPCネットワークにバインドする
                                    </td>
                                </tr>
                                <tr>
                                    <td>プレースホルダーVPCの要否</td>
                                    <td>
                                        各サービスプロジェクトに個別のVPCネットワークが必要になりがち
                                    </td>
                                    <td>不要（プレースホルダーVPCを用意する必要がない）</td>
                                </tr>
                                <tr>
                                    <td>ホストプロジェクト管理者の負担</td>
                                    <td>サービスプロジェクトの管理も担うことが多い</td>
                                    <td>
                                        サービスプロジェクトの管理はサービスプロジェクト側に委譲できる
                                    </td>
                                </tr>
                                <tr>
                                    <td>IAMの適用範囲</td>
                                    <td>プロジェクトレベルで適用</td>
                                    <td>同様にプロジェクトレベルで適用される</td>
                                </tr>
                                <tr>
                                    <td>推移的な解決のホップ制限</td>
                                    <td>ピアリングは1ホップまで</td>
                                    <td>
                                        すべてのDNSゾーンがShared
                                        VPCネットワークに直接紐づくため、ホップ制限がなくHub&amp;Spoke設計が可能
                                    </td>
                                </tr>
                                <tr>
                                    <td>Any-to-Any解決</td>
                                    <td>個別設定が必要になりがち</td>
                                    <td>
                                        Shared VPCネットワーク内のどのVMからも紐づくゾーンを解決可能
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram
                    id="diag-10"
                    label="DNS ピアリング構成とクロスプロジェクトバインディング構成の比較"
                />
                <p>
                    クロスプロジェクトバインディングは、Shared
                    VPCのサービスプロジェクトごとにDNSネームスペースの所有権を分離したい場合（部門やビジネスユニットが異なる組織構造など）に特に有効です。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/zones/zones-overview">
                            DNS zones overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="28-gkeにおけるcloud-dns">2.8 GKEにおけるCloud DNS</h3>
                <p>
                    GKEクラスタのDNSは、Kubernetesの標準的なService
                    Discoveryの延長として提供されます。デフォルトのDNSプロバイダはkube-dnsですが、Cloud
                    DNSをGKEのDNSプロバイダとして選択することもできます。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">kube-dns</th>
                                    <th scope="col">Cloud DNS for GKE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>実装形態</td>
                                    <td>
                                        クラスタ内で稼働するPod（自前でスケーリング・監視が必要）
                                    </td>
                                    <td>Googleがフルマネージドで提供する権威DNS</td>
                                </tr>
                                <tr>
                                    <td>監視・スケーリングの手間</td>
                                    <td>必要</td>
                                    <td>不要（マネージドサービス）</td>
                                </tr>
                                <tr>
                                    <td>Cloud LoggingとしてのDNS監視統合</td>
                                    <td>個別対応が必要</td>
                                    <td>Cloud Loggingとネイティブに統合</td>
                                </tr>
                                <tr>
                                    <td>対応レコード</td>
                                    <td>A/AAAA/SRV/PTR等（PTRはレスポンスポリシールールで実装）</td>
                                    <td>同様にフルサポート</td>
                                </tr>
                                <tr>
                                    <td>DNSスコープ</td>
                                    <td>
                                        クラスタスコープのみ（<code>*.cluster.local</code>）
                                    </td>
                                    <td>
                                        GKEクラスタスコープ、またはVPCスコープ（クラスタ内Serviceの名前をVPC全体から解決可能）を選択可能
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    GKEクラスタでCloud
                    DNSを使う場合でも、クラスタ外部からServiceを名前解決できるようにするには、引き続きLoad
                    Balancerでの公開とDNSインフラへの登録が必要です（Cloud
                    DNSがServiceのClusterIP・ヘッドレス・ExternalNameを自動登録するのは、あくまでクラスタ内部の解決のためです）。
                </p>
                <p>
                    <strong>NodeLocal DNSCache</strong>
                    は、各ノード上でDaemonSetとして動作するDNSキャッシュアドオンで、kube-dns・Cloud
                    DNSいずれの構成でも併用できます。GKE
                    Autopilotクラスタではデフォルトで有効（無効化不可）、GKE
                    Standardクラスタの新しいバージョンではデフォルトで有効（無効化可能）です。PodのDNSリクエストはまずノードローカルのキャッシュに向かい、キャッシュミス時にkube-dnsまたはCloud
                    DNSへフォワードされます。
                </p>
                <p>
                    外部からGKEのService・IngressのDNSレコードを自動的に管理したい場合は、OSSの
                    <strong>external-dns</strong>
                    コントローラを利用するのが一般的なパターンです。external-dnsはクラスタ内のService・Ingressリソースを監視し、対応するレコードをCloud
                    DNSへ自動的に反映します。
                </p>
                <Diagram id="diag-11" label="GKE における DNS 名前解決アーキテクチャ" />
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-cloud-dns">
                                About Cloud DNS for GKE
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-discovery">
                                Service discovery and DNS
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/nodelocal-dns-cache">
                                Set up NodeLocal DNSCache
                            </a>
                        </li>
                    </ul>
                </blockquote>
                <h3 id="29-他プロバイダからcloud-dnsへの移行">
                    2.9 他プロバイダからCloud DNSへの移行
                </h3>
                <p>
                    既存のDNSプロバイダからCloud
                    DNSへドメインを移行する場合の標準的な手順は以下のとおりです。
                </p>
                <Diagram id="diag-12" label="他プロバイダから Cloud DNS への移行手順" />
                <p>
                    インポート時の注意点として、インポートファイルにゾーンApexのNS・SOAレコードが含まれている場合、Cloud
                    DNSが自動生成するNS・SOAレコードと競合します。既存のCloud
                    DNSレコードを優先する（推奨）場合はインポートファイルからNS・SOAレコードを削除し、権威DNSが他プロバイダとの分割構成（マルチプロバイダ構成）でCloud
                    DNS以外のSOAを使いたい場合は<code>--delete-all-existing</code>
                    フラグを使用します。
                </p>
                <p>
                    また、一部のDNS実装は末尾のピリオドなしでBINDゾーンファイルをエクスポートすることがあります。Cloud
                    DNSはRFC標準に従い、末尾ピリオドのないドメイン名をゾーンの相対名として解釈するため、インポート前に確認が必要です。
                </p>
                <p>
                    Google
                    Cloudは、複数のDNSプロバイダを併用してDNS基盤の可用性・冗長性を高める「マルチプロバイダDNS」構成も、OSSの
                    <code>octoDNS</code>をベースに公式にサポートしています。この構成ではCloud
                    DNSをActive-Active（推奨）またはActive-Passiveの一方として使い、レジストラ側のNSレコードに複数プロバイダのネームサーバーを含めます。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/dns/docs/migrating">
                                Migrate to Cloud DNS
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/dns/docs/best-practices">
                                Best practices for Cloud DNS
                            </a>
                        </li>
                    </ul>
                </blockquote>
                <h3 id="210-ハイブリッドdnsのリファレンスアーキテクチャとベストプラクティス">
                    2.10 ハイブリッドDNSのリファレンスアーキテクチャとベストプラクティス
                </h3>
                <p>
                    オンプレミスとGoogle
                    Cloudが混在するハイブリッド環境では、以下の3つのDNS解決方式のいずれかを選択できますが、Googleは「2つの権威DNSシステムを使うハイブリッドアプローチ」を推奨しています。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">アプローチ</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">主なトレードオフ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ハイブリッド（2つの権威DNS、推奨）</td>
                                    <td>
                                        Cloud DNSがGoogle
                                        Cloud側を、既存のオンプレミスDNSサーバーがオンプレミス側を、それぞれ権威的に解決する
                                    </td>
                                    <td>
                                        双方向フォワーディングの設定が必要になるが、レイテンシと運用の分離のバランスが良い
                                    </td>
                                </tr>
                                <tr>
                                    <td>オンプレミスに解決を集約</td>
                                    <td>
                                        オンプレミスDNSサーバーを唯一の権威とし、Google
                                        Cloudからは代替ネームサーバーで全クエリを転送
                                    </td>
                                    <td>
                                        既存ツール・拒否リストを流用できるが、Google
                                        Cloudからのクエリレイテンシが増加し、オートスケールとの相性が悪化しうる
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cloud DNSに解決を集約</td>
                                    <td>
                                        Cloud
                                        DNSを唯一の権威とし、インバウンドフォワーディングでオンプレミスからの問い合わせに対応
                                    </td>
                                    <td>
                                        オンプレミス側の高可用DNSサーバー維持が不要になるが、オンプレミスからのクエリレイテンシが増加する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    命名規則としては、オンプレミスとGoogle Cloudで別々のサブドメイン（例:{' '}
                    <code>corp.example.com</code>と<code>gcp.example.com</code>
                    ）を使う構成が推奨パターンです。同一ドメインを両者で共有する構成は、単一の権威DNSシステムでしか運用できず、ハイブリッド環境の管理を複雑にするため避けるべきとされています。
                </p>
                <p>
                    代表的なリファレンスアーキテクチャの1つとして、ハブ&amp;スポークVPC構成（VPCネットワークピアリングでハブとスポークを接続し、ハブがオンプレミスとの接続を集約する構成）を見てみます。
                </p>
                <Diagram id="diag-13" label="ハブ＆スポーク型ハイブリッド DNS アーキテクチャ" />
                <p>この構成のポイントは次のとおりです。</p>
                <ol type="1">
                    <li>
                        各スポークVPCが自身のプライベートゾーン（例:{' '}
                        <code>projectX.gcp.example.com</code>）を保有する。
                    </li>
                    <li>ハブVPCのホストプロジェクトでインバウンドサーバーポリシーを有効化する。</li>
                    <li>
                        ハブVPC内に<code>corp.example.com</code>
                        用のフォワーディングゾーンを作成し、オンプレミスDNSサーバーへアウトバウンド転送する。
                    </li>
                    <li>
                        ハブVPCから各スポークVPCへ、それぞれの<code>projectX.gcp.example.com</code>
                        をターゲットとするDNSピアリングゾーンを作成する。
                    </li>
                    <li>
                        各スポークVPCからハブVPCへ、<code>example.com</code>
                        （オンプレミス側）をターゲットとするDNSピアリングゾーンを作成する。
                    </li>
                    <li>
                        オンプレミスDNS側で<code>gcp.example.com</code>
                        をハブVPCのインバウンドフォワーダーIPアドレスへ転送するよう設定する。
                    </li>
                </ol>
                <p>ベストプラクティスとして特に押さえておくべき点は以下のとおりです。</p>
                <ul>
                    <li>
                        複数のVPCネットワークが同じオンプレミスDNSサーバーへアウトバウンド転送する構成は、DNSピアリングを使わずに個別設定すると失敗します（すべてのクエリの送信元が
                        <code>35.199.192.0/19</code>
                        という共通レンジになるため、応答を正しくルーティングできません）。1つのVPCネットワークにアウトバウンド転送を集約し、他のVPCネットワークはそこへDNSピアリングする設計が推奨されます。
                    </li>
                    <li>
                        VPCネットワークピアリングとDNSピアリングは別物であり、片方を設定しても他方は自動的には有効になりません。
                    </li>
                    <li>
                        自動生成される<code>.internal</code>
                        ゾーン（VMの内部DNS名）をオンプレミスから解決したい場合は、それらをハブプロジェクトにピアリングして集約するパターンが有効です。
                    </li>
                    <li>
                        オンプレミス・Google Cloud双方のファイアウォールで、
                        <code>35.199.192.0/19</code>
                        からのDNSトラフィック（TCP/UDPポート53）を許可する。
                    </li>
                </ul>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/dns/docs/best-practices">
                            Best practices for Cloud DNS
                        </a>
                    </p>
                </blockquote>
                <hr />
                <h2 id="part-3-ipアドレス管理ipam">Part 3: IPアドレス管理（IPAM）</h2>
                <h3 id="31-ipアドレスの分類体系">3.1 IPアドレスの分類体系</h3>
                <p>
                    Google CloudのIPアドレスは、複数の軸で分類されます。まずは全体像を整理します。
                </p>
                <Diagram id="diag-14" label="Google Cloud の IP アドレス分類体系" />
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">分類軸</th>
                                    <th scope="col">区分</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>到達性</td>
                                    <td>内部（Internal）</td>
                                    <td>
                                        インターネットから到達不可。VPCネットワーク・ピアリング済みネットワーク・オンプレミス接続内でのみ有効
                                    </td>
                                </tr>
                                <tr>
                                    <td>到達性</td>
                                    <td>外部（External）</td>
                                    <td>
                                        インターネットに公開されるパブリックルーティング可能なアドレス
                                    </td>
                                </tr>
                                <tr>
                                    <td>ルーティング可否</td>
                                    <td>プライベート</td>
                                    <td>
                                        インターネット上でルーティングされないアドレス空間（内部アドレスとしてのみ使用可能）
                                    </td>
                                </tr>
                                <tr>
                                    <td>ルーティング可否</td>
                                    <td>パブリック</td>
                                    <td>
                                        インターネットルーティング可能なアドレス空間。外部IPは常にパブリックIPだが、サブネットのプライマリ/セカンダリ範囲としてパブリックIPを内部的に使う場合は「PUPI（プライベート利用のパブリックIP）」と呼ぶ
                                    </td>
                                </tr>
                                <tr>
                                    <td>スコープ</td>
                                    <td>リージョナル</td>
                                    <td>特定リージョンのリソースに紐づく</td>
                                </tr>
                                <tr>
                                    <td>スコープ</td>
                                    <td>グローバル</td>
                                    <td>
                                        PSC Google APIエンドポイントやPrivate Services
                                        Accessの割当レンジなど、リージョンに依存しない
                                    </td>
                                </tr>
                                <tr>
                                    <td>ライフサイクル</td>
                                    <td>エフェメラル</td>
                                    <td>
                                        リソースのライフサイクルに紐づき、リソース削除・停止時に解放される
                                    </td>
                                </tr>
                                <tr>
                                    <td>ライフサイクル</td>
                                    <td>静的（予約済み）</td>
                                    <td>明示的に解放するまでプロジェクトに割り当てられ続ける</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    Cloud NATの自動IPアドレス割当は、静的アドレスとして表示されますが、Cloud
                    NATゲートウェイの削除や手動アドレスへの切り替え時には削除される点、HA
                    VPNのインターフェースには静的IPを手動指定できず、ゲートウェイ作成時に自動生成される2つの外部IPが削除まで割り当てられ続ける点など、いくつかの例外があります。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/vpc/docs/ip-addresses">
                            IP addresses
                        </a>
                    </p>
                </blockquote>
                <h3 id="32-サブネットのipv4アドレス範囲設計">
                    3.2 サブネットのIPv4アドレス範囲設計
                </h3>
                <p>
                    サブネットのIPv4範囲設計は、IPAM戦略の中核です。まず、有効な内部IPv4範囲を整理します。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">範囲</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>10.0.0.0/8</code>、<code>172.16.0.0/12</code>、
                                        <code>192.168.0.0/16</code>
                                    </td>
                                    <td>RFC 1918</td>
                                </tr>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>100.64.0.0/10</code>
                                    </td>
                                    <td>RFC 6598（共有アドレス空間）</td>
                                </tr>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>192.0.0.0/24</code>
                                    </td>
                                    <td>RFC 6890（IETFプロトコル割当）</td>
                                </tr>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>192.0.2.0/24</code>、<code>198.51.100.0/24</code>、
                                        <code>203.0.113.0/24</code>
                                    </td>
                                    <td>RFC 5737（ドキュメント用）</td>
                                </tr>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>192.88.99.0/24</code>
                                    </td>
                                    <td>RFC 7526（IPv6toIPv4リレー、非推奨）</td>
                                </tr>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>198.18.0.0/15</code>
                                    </td>
                                    <td>RFC 2544（ベンチマークテスト）</td>
                                </tr>
                                <tr>
                                    <td>プライベートIPv4アドレス</td>
                                    <td>
                                        <code>240.0.0.0/4</code>
                                    </td>
                                    <td>Class E（将来利用のための予約）</td>
                                </tr>
                                <tr>
                                    <td>プライベート利用のパブリックIPv4アドレス（PUPI）</td>
                                    <td>上記以外の任意のパブリックIPv4（禁止範囲を除く）</td>
                                    <td>
                                        通常はインターネットルーティング可能だが、VPCネットワーク内で私的に使用。Googleはこれらをインターネットへ広告せず、インターネットからのトラフィックもルーティングしない
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>サブネット範囲には以下のような制約もあります。</p>
                <ul>
                    <li>
                        最小のプライマリ・セカンダリ範囲サイズは8アドレス（<code>/29</code>）。
                    </li>
                    <li>
                        使用できる最大の範囲は<code>/4</code>ですが、多くの制約により実質的には
                        <code>/8</code>程度に収めることが推奨されます。
                    </li>
                    <li>
                        サブネット範囲は複数のRFC範囲にまたがることはできません（例:{' '}
                        <code>192.0.0.0/8</code>は<code>192.168.0.0/16</code>と
                        <code>192.0.0.0/24</code>の両方を含むため無効）。
                    </li>
                    <li>
                        サブネット範囲は「制限範囲」と一致・より狭い・より広いいずれの形でも重ならないようにする必要があります（例:{' '}
                        <code>169.0.0.0/8</code>はリンクローカル範囲<code>169.254.0.0/16</code>
                        と重複するため無効）。
                    </li>
                    <li>
                        Auto ModeのVPCネットワークが使用する<code>10.128.0.0/9</code>
                        ブロックの一部は、カスタムサブネットの範囲として使わないことが推奨されます（この範囲を使うと、Auto
                        ModeネットワークとのVPCネットワークピアリングやCloud
                        VPN接続ができなくなります）。
                    </li>
                    <li>
                        ゲスト OS内で<code>172.17.0.0/16</code>
                        （Dockerのデフォルトブリッジネットワーク等）を使うソフトウェアに依存している場合、このレンジをサブネット範囲として使わないようにします。
                    </li>
                </ul>
                <p>
                    サブネットのプライマリIPv4範囲の中で、最初の2つと最後の2つのアドレスは予約されており使用できません（セカンダリ範囲はすべて使用可能です）。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">予約アドレス</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ネットワークアドレス</td>
                                    <td>プライマリ範囲の最初のアドレス</td>
                                </tr>
                                <tr>
                                    <td>デフォルトゲートウェイアドレス</td>
                                    <td>プライマリ範囲の2番目のアドレス</td>
                                </tr>
                                <tr>
                                    <td>Second-to-lastアドレス</td>
                                    <td>プライマリ範囲の最後から2番目（将来利用のための予約）</td>
                                </tr>
                                <tr>
                                    <td>ブロードキャストアドレス</td>
                                    <td>プライマリ範囲の最後のアドレス</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram id="diag-15" label="サブネットのプライマリ・セカンダリ IP 範囲構成" />
                <p>
                    サブネットには「目的（purpose）」があり、通常のVM用サブネット（
                    <code>PRIVATE</code>）以外にも、Private Service Connect公開用（
                    <code>PRIVATE_SERVICE_CONNECT</code>）、プロキシ専用（
                    <code>GLOBAL_MANAGED_PROXY</code>/<code>REGIONAL_MANAGED_PROXY</code>）、Private
                    NAT専用（<code>PRIVATE_NAT</code>）、Shared VPCサービスをPrivate Service
                    Connectへ移行するための<code>PEER_MIGRATION</code>
                    など複数の種類があり、多くの場合作成後に目的を変更することはできません。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/vpc/docs/subnets">Subnets</a>
                    </p>
                </blockquote>
                <h3 id="33-ipv6サポート">3.3 IPv6サポート</h3>
                <p>
                    VPCネットワークのサブネットは、IPv4専用・デュアルスタック・IPv6専用の3種類のスタックタイプをサポートします。IPv6範囲を持つサブネットはカスタムモードのVPCネットワークでのみサポートされ、Auto
                    Modeネットワークやレガシーネットワークでは非対応です。
                </p>
                <p>
                    IPv6アドレスは、以下のようにVPCネットワーク→サブネット→VMインターフェースの階層でCIDRが割り当てられます。
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">リソース</th>
                                    <th scope="col">範囲サイズ</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VPCネットワーク</td>
                                    <td>
                                        <code>/48</code>
                                    </td>
                                    <td>
                                        内部ULA範囲を有効化した際に、<code>fd20::/20</code>
                                        内から割り当てられるユニークローカルアドレス範囲
                                    </td>
                                </tr>
                                <tr>
                                    <td>サブネット</td>
                                    <td>
                                        <code>/64</code>
                                    </td>
                                    <td>
                                        内部ならVPCの<code>/48</code>
                                        範囲から、外部ならGoogleが提供するリージョナル外部IPv6アドレスから割り当て
                                    </td>
                                </tr>
                                <tr>
                                    <td>VMインターフェース</td>
                                    <td>
                                        <code>/96</code>
                                    </td>
                                    <td>
                                        サブネットの<code>/64</code>
                                        範囲から割り当て。外部IPv6の場合、サブネットの
                                        <code>/64</code>の前半<code>/65</code>
                                        がVMインターフェース用、後半<code>/65</code>がCloud Load
                                        Balancing用に予約されている
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram id="diag-16" label="IPv6 アドレス割当体系" />
                <p>
                    内部IPv6アドレスはUnique Local Address（ULA、RFC
                    4193）であり、インターネットに公開されずVM間通信のみに使用されます。外部IPv6アドレスはGlobal
                    Unicast Address（GUA）であり、Premium Tierでのみ利用可能です。VPCネットワークの
                    <code>/48</code>ULA範囲は、Google
                    Cloud全体で一意である必要があり（VPCネットワークピアリング時のIPv6アドレス重複を防ぐため）、自動割当か任意の
                    <code>/48</code>範囲の指定かを選択できます。一度割り当てた<code>/48</code>
                    ULA範囲は変更・削除できません。
                </p>
                <p>
                    BYOIPを使う場合は、GUAをプライベートに（ULAと同様の役割で）内部IPv6サブネット範囲として使うことも、通常どおり外部IPv6範囲として使うことも可能です。
                </p>
                <p>
                    サブネットの内部<code>/64</code>範囲のうち、最初と最後の<code>/96</code>
                    範囲はシステム用に予約されており、手動で割り当てることはできません。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/vpc/docs/subnets">Subnets</a>
                    </p>
                </blockquote>
                <h3 id="34-内部レンジinternal-rangesによるipam自動化">
                    3.4 内部レンジ（Internal Ranges）によるIPAM自動化
                </h3>
                <p>
                    「内部レンジ（Internal Range）」は、VPCネットワーク内の内部IPv4/IPv6
                    CIDRブロックを予約し、その使われ方を制御するリソースです。VPCネットワークピアリング・Shared
                    VPC・Cloud VPN・Cloud
                    Interconnectなどでネットワークトポロジが複雑化した際に、IPAMを体系的に管理するための土台となります。
                </p>
                <p>
                    内部レンジには「ピアリングタイプ」と「使用タイプ」という2つの重要な属性があります。
                </p>
                <p>
                    <strong>ピアリングタイプ</strong>（VPCネットワークピアリングに対する挙動）
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ピアリングタイプ</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>FOR_SELF</code>
                                    </td>
                                    <td>
                                        親VPCネットワークのみがこのCIDRブロックを使用可能。ピアリング先では使用不可
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>FOR_PEER</code>
                                    </td>
                                    <td>
                                        ピアリング先のネットワークのみが使用可能。親ネットワークでは使用不可
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>NOT_SHARED</code>
                                    </td>
                                    <td>
                                        親ネットワーク・ピアリング先の両方が使用可能。ただしピアリング先での使用は親ネットワークから見えない形で行う必要がある
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    <strong>使用タイプ</strong>（親VPCネットワーク内の他リソースとの関連付け可否）
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">使用タイプ</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>FOR_VPC</code>（デフォルト）
                                    </td>
                                    <td>
                                        親VPCネットワーク内の他のGoogle Cloudリソースと関連付け可能
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>EXTERNAL_TO_VPC</code>
                                    </td>
                                    <td>
                                        親VPCネットワーク内のリソースとは関連付け不可（オンプレミス専用の予約など）
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>FOR_MIGRATION</code>
                                    </td>
                                    <td>
                                        サブネット範囲の移行（別ネットワークへの移行を含む）に使用
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>IPv4の内部レンジを自動割当する場合、以下の4種類の割当戦略から選択できます。</p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">戦略</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>RANDOM</code>（デフォルト）
                                    </td>
                                    <td>空いているCIDRブロックをランダムに割当</td>
                                    <td>同時並行での予約が最速だが、断片化しやすい</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>FIRST_AVAILABLE</code>
                                    </td>
                                    <td>数値的に最も若い開始アドレスを持つブロックを割当</td>
                                    <td>
                                        最も予測可能で連続空間を最大化するが、同時予約時の競合で遅くなりやすい
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>RANDOM_FIRST_N_AVAILABLE</code>
                                    </td>
                                    <td>
                                        若い順にN個の候補ブロックを集め、その中からランダムに1つを割当
                                    </td>
                                    <td>競合を減らしつつ連続性もある程度確保できる</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>FIRST_SMALLEST_FITTING</code>
                                    </td>
                                    <td>
                                        要求サイズを収容できる最小の空きブロック（最長プレフィックス）から、最も若いアドレスのブロックを割当
                                    </td>
                                    <td>断片化の抑制に最も優れるが、競合による遅延が最大</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram
                    id="diag-17"
                    label="内部レンジ（Internal Ranges）による IPAM 自動化フロー"
                />
                <p>
                    サブネット移行のユースケース（<code>FOR_MIGRATION</code>
                    ）では、サブネットを削除するとCIDR範囲は通常解放されますが、内部レンジで予約しておくことで、削除後・再作成前の間もそのCIDRを保持し、指定した移行先サブネットにのみ割当を許可できます。移行元・移行先が異なるプロジェクトであっても利用可能です。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/vpc/docs/internal-ranges">
                            Internal ranges overview
                        </a>
                    </p>
                </blockquote>
                <h3 id="35-byoipbring-your-own-ip">3.5 BYOIP（Bring Your Own IP）</h3>
                <p>
                    BYOIPは、組織が自ら保有する（または利用権を持つ）パブリックIPv4/IPv6アドレスをGoogle
                    Cloudへ持ち込み、Google
                    Cloudのリソースに割り当てる機能です。インポート後は、いくつかの例外を除きGoogle提供のIPアドレスと同様に管理されます。BYOIPで持ち込んだアドレスは、それを持ち込んだ顧客のみが利用可能で、アイドル状態・使用中のいずれであっても追加課金は発生しません。
                </p>
                <p>BYOIPのプロビジョニングは以下の階層で進みます。</p>
                <Diagram id="diag-18" label="BYOIP プレフィックスの階層構造と委譲" />
                <ol type="1">
                    <li>
                        <strong>Public Advertised Prefix（PAP）</strong>:
                        持ち込むIPプレフィックス全体を表すリソース。Route Origin
                        Authorization（ROA）や逆引きDNSによる所有権検証が必要です。
                    </li>
                    <li>
                        <strong>Public Delegated Prefix（PDP）</strong>:
                        PAPを分割し、特定のリージョンやプロジェクトに委譲するためのサブプレフィックス。
                    </li>
                    <li>
                        <strong>サブプレフィックス・個別IPアドレスの作成</strong>:
                        PDPからさらに細かい単位（個々のIPアドレスやより小さなCIDR）を切り出し、実際のリソースに割り当てます。
                    </li>
                </ol>
                <p>
                    重要な注意点として、Googleは重複するBYOIPのルート広告をサポートしません。たとえば
                    <code>203.0.112.0/23</code>をインポートしようとしても、その全体または一部（
                    <code>203.0.112.0/24</code>
                    など）がGoogle以外の場所で既に広告されている場合はインポートできません。同一プレフィックスが複数の場所から異なる形で広告されると、予期しないルーティングやパケットロスが発生する可能性があります。
                </p>
                <p>
                    組織設計としては、BYOIPアドレスの管理を専用の組織・専用プロジェクトに集約し、IAMロールでPAP・PDPの管理権限を明確に分離することが推奨されます。BYOIPアドレスはShared
                    VPCのホストプロジェクトには委譲できますが、サービスプロジェクトへ直接委譲することはできません（ホストプロジェクトに委譲されたアドレスは、サービスプロジェクトからも利用可能です）。
                </p>
                <p>
                    BYOIPのプロビジョニング・削除プロセスには数週間かかることがあるため、実際に必要となるタイミングのかなり前から計画しておくことが重要です。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/bring-your-own-ip">
                                Bring your own IP addresses
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/byoip-planning">
                                Planning for bring your own IP addresses
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/create-pap">
                                Create a public advertised prefix
                            </a>
                        </li>
                    </ul>
                </blockquote>
                <h3 id="36-マネージドサービスへの接続とipアドレス割当psapscserverless-vpc-access">
                    3.6 マネージドサービスへの接続とIPアドレス割当（PSA・PSC・Serverless VPC
                    Access）
                </h3>
                <p>
                    マネージドサービスへプライベートに接続する主要な3つの方式は、それぞれ異なるIPアドレス割当の考え方を持ちます。
                </p>
                <Diagram id="diag-19" label="マネージドサービスへの接続方式と IP アドレス割当" />
                <p>
                    <strong>Private Services Access</strong>
                    （PSA）は、サービスコンシューマーのVPCネットワークとサービスプロデューサーのVPCネットワークをVPCネットワークピアリングで接続する仕組みです。ルーティングの重複を避けるため、コンシューマー側に「Allocated
                    Range」を確保する必要があります。
                </p>
                <ul>
                    <li>
                        Googleのサービス向けには最小<code>/24</code>、推奨<code>/16</code>
                        ブロックが必要です。
                    </li>
                    <li>
                        Allocated
                        Rangeは、現在・将来のサブネット範囲（VPCネットワークピアリングやNCCスポークで接続されたネットワークのサブネット範囲を含む）と完全に分離しておく必要があります。
                    </li>
                    <li>
                        サービスプロデューサー側は通常、このAllocated Rangeの中から<code>/29</code>
                        〜<code>/24</code>
                        程度のサブネットを選んでリソースを配置します。プロデューサー側のサブネット範囲自体は選択・変更できません。
                    </li>
                </ul>
                <p>
                    <strong>Private Service Connect</strong>
                    （PSC）のエンドポイントは、通常のサブネット内の内部IPアドレスとして構成されます（公開サービス用の場合は
                    <code>PRIVATE_SERVICE_CONNECT</code>
                    目的のサブネットを使用）。PSAとは異なりVPCネットワークピアリングを必要とせず、1つの内部IPアドレスで公開サービスやGoogle
                    APIへ到達できる点が特徴です。
                </p>
                <p>
                    <strong>Serverless VPC Access</strong>は、Cloud Run・Cloud Run functions・App
                    EngineなどのサーバーレスワークロードからVPCネットワークへ送信トラフィックを送るためのコネクタです。コネクタには専用の
                    <code>/28</code>
                    サブネット（16アドレス）が必要で、他のリソースと共用できず、作成後にサイズを変更することもできません。Shared
                    VPCを使う場合、サービスプロジェクト側でコネクタを作成するには、ホストプロジェクトのネットワーク管理者が事前にそのサブネットを手動作成しておく必要があります。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/private-services-access">
                                Private services access
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/configure-private-services-access">
                                Configure private services access
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/configure-serverless-vpc-access">
                                Connect to a VPC network (Serverless VPC Access)
                            </a>
                        </li>
                    </ul>
                </blockquote>
                <h3 id="37-cloud-natにおけるipアドレスとポートの管理">
                    3.7 Cloud NATにおけるIPアドレスとポートの管理
                </h3>
                <p>
                    Cloud NATは、Public NAT（インターネットへのアウトバウンド接続）とPrivate
                    NAT（VPC間・オンプレミス間などプライベート接続向けのアウトバウンド接続）の2種類を提供し、それぞれIPアドレスとポートの管理方法が異なります。
                </p>
                <p>
                    <strong>Public NATのIPアドレス割当</strong>
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">割当方法</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>自動NAT IPアドレス割当</td>
                                    <td>
                                        選択したネットワークサービスティア（Premium/Standard）、VM数、VMあたりのポート予約数に基づき、Googleがリージョナル外部IPアドレスを自動的に追加・削除する。追加されたアドレスは静的（予約済み）として扱われるがプロジェクトのクォータには計上されない。次にどのIPアドレスが割り当てられるかは予測できないため、許可リストのように事前に把握しておく必要がある用途には不向き
                                    </td>
                                </tr>
                                <tr>
                                    <td>手動NAT IPアドレス割当</td>
                                    <td>
                                        静的外部IPアドレスを自身で作成し手動でゲートウェイに割り当てる。許可リストとの相性が良く、IPアドレスの「ドレイン（drain）」機能（新規接続には使わず、既存接続の正常終了のみ許可）を利用できる
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    <strong>Private NATのIPアドレス割当</strong>
                </p>
                <p>
                    Private NATのIPアドレスは、<code>purpose=PRIVATE_NAT</code>
                    のサブネットのプライマリIPv4範囲から供給される、リージョナル内部IPv4アドレスです。この範囲は自動割当ができず、ゲートウェイのルール作成時に明示的にサブネットを指定します。1つのPrivate
                    NATサブネットが提供できるNAT IPアドレス数は、サブネットのプレフィックス長
                    <code>PREFIX_LENGTH</code>を使って次の式で求められます。
                </p>
                <div className="code-block" role="region" aria-label="計算式">
                    <div className="code-line">
                        利用可能なNAT IPアドレス数 = 2^(32 - PREFIX_LENGTH) - 4
                    </div>
                </div>
                <p>（各サブネットには4つの未使用アドレスが存在するため4を減算します）</p>
                <p>
                    <strong>ポート割当方式</strong>
                </p>
                <div className="table-scroll">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">方式</th>
                                    <th scope="col">Public NATのデフォルト</th>
                                    <th scope="col">Private NATのデフォルト</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>静的ポート割当</td>
                                    <td>○（デフォルト）</td>
                                    <td>選択可</td>
                                    <td>
                                        VMごとに固定のポート数を割り当てる。全VMのエグレス使用量が均一な場合に適する。Endpoint-Independent
                                        Mappingを使う場合は静的ポート割当が必須
                                    </td>
                                </tr>
                                <tr>
                                    <td>動的ポート割当</td>
                                    <td>選択可</td>
                                    <td>○（デフォルト）</td>
                                    <td>
                                        最小・最大ポート数を指定し、使用状況に応じて自動的に増減させる。ポート使用量にばらつきがある場合に有効
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Diagram id="diag-20" label="Cloud NAT ゲートウェイタイプと IP/ポート管理" />
                <p>
                    各NAT
                    IPアドレスは、TCP・UDPそれぞれ64,512個のソースポート（0〜1023のウェルノウンポートを除く）を提供します。ポート予約の計算例として、Public
                    NATで単一の手動NAT
                    IPアドレスを使い、VMあたり最小64ポートを設定した場合、以下のように最大1,008台のVMをサポートできます。
                </p>
                <div className="code-block" role="region" aria-label="計算式">
                    <div className="code-line">
                        ⌊(1 NAT IPアドレス) × (64,512ポート/アドレス) / (64ポート/VM)⌋ = 1,008台
                    </div>
                </div>
                <p>
                    Private
                    NATの場合、信頼性確保のためVMあたりの必要ポート数の「2倍」が割り当てられる点に注意が必要です。たとえば最小サイズの
                    <code>/29</code>
                    サブネット（8アドレス、うち4つが利用可能）でVMあたり最小64ポートを設定した場合は次のようになります。
                </p>
                <div className="code-block" role="region" aria-label="計算式">
                    <div className="code-line">
                        ⌊(2^(32-29) - 4) NAT IPアドレス × (64,512ポート/アドレス) / (64ポート/VM ×
                        2)⌋ = 2,016台
                    </div>
                </div>
                <p>
                    IPアドレス・ポート割当のマッピングは時間とともに変化する可能性があるため、現在のマッピングを前提にネットワーク設定を構築すべきではない、という点も試験対策上のポイントです。
                </p>
                <blockquote className="citation">
                    <p>
                        <strong>出典: </strong>
                        <a href="https://docs.cloud.google.com/nat/docs/ports-and-addresses">
                            IP addresses and ports (Cloud NAT)
                        </a>
                    </p>
                </blockquote>
                <h3 id="38-ipam設計チェックリスト">3.8 IPAM設計チェックリスト</h3>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="checklist-counter">
                            {checked1.filter(Boolean).length} / {11} 完了
                        </span>
                    </div>
                    <ul className="checklist-list">
                        <li key={0} className={checked1[0] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[0] || false}
                                    onChange={() => toggleCheck1(0)}
                                />
                                <span>
                                    オンプレミス・マルチクラウド・Google
                                    Cloudの各環境で、重複しないRFC 1918アドレス空間を設計している
                                </span>
                            </label>
                        </li>
                        <li key={1} className={checked1[1] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[1] || false}
                                    onChange={() => toggleCheck1(1)}
                                />
                                <span>
                                    RFC
                                    1918アドレス空間が枯渇する、または断片化している場合の代替（非RFC1918範囲、PUPI、IPv6）を検討している
                                </span>
                            </label>
                        </li>
                        <li key={2} className={checked1[2] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[2] || false}
                                    onChange={() => toggleCheck1(2)}
                                />
                                <span>
                                    Auto
                                    ModeネットワークのCIDR（10.128.0.0/9）や、ゲストOS内で使用中のレンジ（172.17.0.0/16等）との重複を避けている
                                </span>
                            </label>
                        </li>
                        <li key={3} className={checked1[3] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[3] || false}
                                    onChange={() => toggleCheck1(3)}
                                />
                                <span>
                                    GKE用にPod範囲・Service範囲を含むセカンダリ範囲を十分な余裕を持って設計している
                                </span>
                            </label>
                        </li>
                        <li key={4} className={checked1[4] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[4] || false}
                                    onChange={() => toggleCheck1(4)}
                                />
                                <span>
                                    内部レンジ（Internal
                                    Ranges）を使って、サブネット作成前のIPAM予約とバッティング防止を自動化している
                                </span>
                            </label>
                        </li>
                        <li key={5} className={checked1[5] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[5] || false}
                                    onChange={() => toggleCheck1(5)}
                                />
                                <span>
                                    Private Services Access用のAllocated
                                    Range（推奨/16）を、将来のサブネット拡張分も見込んで確保している
                                </span>
                            </label>
                        </li>
                        <li key={6} className={checked1[6] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[6] || false}
                                    onChange={() => toggleCheck1(6)}
                                />
                                <span>
                                    Serverless VPC
                                    Access用に、各コネクタ専用の/28サブネットを確保している（拡張不可であることを踏まえたサイジング）
                                </span>
                            </label>
                        </li>
                        <li key={7} className={checked1[7] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[7] || false}
                                    onChange={() => toggleCheck1(7)}
                                />
                                <span>
                                    IPv6導入時、VPCネットワークの/48ULA範囲、サブネットの/64範囲、VMの/96範囲という階層を理解し、外部/内部の使い分けを設計している
                                </span>
                            </label>
                        </li>
                        <li key={8} className={checked1[8] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[8] || false}
                                    onChange={() => toggleCheck1(8)}
                                />
                                <span>
                                    BYOIPを使う場合、PAP/PDP/サブプレフィックスの委譲構造と、プロビジョニングに数週間かかることを踏まえたスケジュールを組んでいる
                                </span>
                            </label>
                        </li>
                        <li key={9} className={checked1[9] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[9] || false}
                                    onChange={() => toggleCheck1(9)}
                                />
                                <span>
                                    Cloud NATについて、Public
                                    NAT（自動/手動IP割当、静的/動的ポート割当）とPrivate
                                    NAT（専用サブネットからの内部IP、デフォルト動的ポート割当）の違いを理解し、必要なVM数・ポート数から適切なIPアドレス数を逆算している
                                </span>
                            </label>
                        </li>
                        <li key={10} className={checked1[10] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked1[10] || false}
                                    onChange={() => toggleCheck1(10)}
                                />
                                <span>
                                    IPアドレス・ポートのマッピングが時間とともに変化しうることを前提に、固定マッピングに依存したネットワーク設計（許可リスト等）を避けている、またはドレイン機能を活用した安全な運用を組んでいる
                                </span>
                            </label>
                        </li>
                    </ul>
                </div>
                <hr />
                <h2 id="試験対策チェックリスト横断">試験対策チェックリスト（横断）</h2>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="checklist-counter">
                            {checked2.filter(Boolean).length} / {20} 完了
                        </span>
                    </div>
                    <ul className="checklist-list">
                        <li key={0} className={checked2[0] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[0] || false}
                                    onChange={() => toggleCheck2(0)}
                                />
                                <span>
                                    Cloud CDNが単体では機能せず、必ずExternal Application Load
                                    Balancerと組み合わせる点を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={1} className={checked2[1] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[1] || false}
                                    onChange={() => toggleCheck2(1)}
                                />
                                <span>
                                    Cloud
                                    CDNの5つの対応バックエンドタイプ（MIG・ゾーンNEG・サーバーレスNEG・Internet
                                    NEG・Cloud Storageバケット）と、それぞれの用途を区別できる
                                </span>
                            </label>
                        </li>
                        <li key={2} className={checked2[2] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[2] || false}
                                    onChange={() => toggleCheck2(2)}
                                />
                                <span>
                                    3つのキャッシュモード（CACHE_ALL_STATIC・USE_ORIGIN_HEADERS・FORCE_CACHE_ALL）の違いと、FORCE_CACHE_ALLのリスクを説明できる
                                </span>
                            </label>
                        </li>
                        <li key={3} className={checked2[3] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[3] || false}
                                    onChange={() => toggleCheck2(3)}
                                />
                                <span>
                                    キャッシュキーのカスタマイズ（プロトコル/ホスト/クエリ文字列/ヘッダー/Cookie）がキャッシュヒット率に与える影響を理解している
                                </span>
                            </label>
                        </li>
                        <li key={4} className={checked2[4] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[4] || false}
                                    onChange={() => toggleCheck2(4)}
                                />
                                <span>
                                    キャッシュ無効化とキャッシュタグの違い、無効化のレート制限、無効化を最終手段とすべき理由を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={5} className={checked2[5] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[5] || false}
                                    onChange={() => toggleCheck2(5)}
                                />
                                <span>
                                    署名付きURLと署名付きCookieの使い分け（単一リソース vs
                                    URLプレフィックス配下の複数リソース）を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={6} className={checked2[6] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[6] || false}
                                    onChange={() => toggleCheck2(6)}
                                />
                                <span>
                                    Cloud
                                    DNSのゾーンタイプ（パブリック・プライベート・フォワーディング・ピアリング・マネージドリバースルックアップ・Service
                                    Directory・ゾーナル）を区別できる
                                </span>
                            </label>
                        </li>
                        <li key={7} className={checked2[7] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[7] || false}
                                    onChange={() => toggleCheck2(7)}
                                />
                                <span>
                                    Split-Horizon
                                    DNSの仕組みと、最長サフィックス一致による名前解決順序を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={8} className={checked2[8] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[8] || false}
                                    onChange={() => toggleCheck2(8)}
                                />
                                <span>
                                    DNSルーティングポリシー（WRR・Geolocation・Failover）とヘルスチェック対応の対象（内部LB・外部エンドポイント）を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={9} className={checked2[9] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[9] || false}
                                    onChange={() => toggleCheck2(9)}
                                />
                                <span>
                                    DNSSECを機能させるために必要な3か所（ゾーン・レジストリ・リゾルバ）の設定を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={10} className={checked2[10] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[10] || false}
                                    onChange={() => toggleCheck2(10)}
                                />
                                <span>
                                    インバウンド/アウトバウンドサーバーポリシーとフォワーディングゾーンの違い、代替ネームサーバー使用時の副作用を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={11} className={checked2[11] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[11] || false}
                                    onChange={() => toggleCheck2(11)}
                                />
                                <span>
                                    クロスプロジェクトバインディングとDNSピアリングの違い（ホップ制限、所有権分離）を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={12} className={checked2[12] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[12] || false}
                                    onChange={() => toggleCheck2(12)}
                                />
                                <span>
                                    GKEにおけるkube-dnsとCloud DNS for GKEの違い、NodeLocal
                                    DNSCacheとexternal-dnsの役割を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={13} className={checked2[13] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[13] || false}
                                    onChange={() => toggleCheck2(13)}
                                />
                                <span>
                                    IPアドレスの分類（内部/外部、プライベート/パブリック/PUPI、リージョナル/グローバル、エフェメラル/静的）を体系的に説明できる
                                </span>
                            </label>
                        </li>
                        <li key={14} className={checked2[14] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[14] || false}
                                    onChange={() => toggleCheck2(14)}
                                />
                                <span>
                                    サブネットのプライマリ・セカンダリ範囲、有効なCIDR範囲、予約済みアドレス（先頭2つ・末尾2つ）を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={15} className={checked2[15] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[15] || false}
                                    onChange={() => toggleCheck2(15)}
                                />
                                <span>
                                    IPv6のVPC（/48）→サブネット（/64）→VM（/96）という階層構造と、内部ULA・外部GUAの違いを説明できる
                                </span>
                            </label>
                        </li>
                        <li key={16} className={checked2[16] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[16] || false}
                                    onChange={() => toggleCheck2(16)}
                                />
                                <span>
                                    内部レンジ（Internal
                                    Ranges）のピアリングタイプ・使用タイプ・自動割当戦略の違いを説明できる
                                </span>
                            </label>
                        </li>
                        <li key={17} className={checked2[17] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[17] || false}
                                    onChange={() => toggleCheck2(17)}
                                />
                                <span>
                                    BYOIPのPAP→PDP→サブプレフィックスという階層と、重複広告が許されない理由を説明できる
                                </span>
                            </label>
                        </li>
                        <li key={18} className={checked2[18] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[18] || false}
                                    onChange={() => toggleCheck2(18)}
                                />
                                <span>
                                    Private Services Access・PSC・Serverless VPC
                                    Accessそれぞれで、どのようにIPアドレス範囲が確保・使用されるかを区別できる
                                </span>
                            </label>
                        </li>
                        <li key={19} className={checked2[19] ? 'checked' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked2[19] || false}
                                    onChange={() => toggleCheck2(19)}
                                />
                                <span>
                                    Cloud NATのPublic NAT/Private
                                    NATの違い、自動/手動IP割当、静的/動的ポート割当のデフォルトと使い分けを説明できる
                                </span>
                            </label>
                        </li>
                    </ul>
                </div>
                <hr />
                <h2 id="参考文献">参考文献</h2>
                <div className="ref-grid">
                    <div className="ref-card">
                        <h4>Cloud CDN</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/overview"
                                >
                                    <span className="ref-icon">↗</span>Cloud CDN overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/caching"
                                >
                                    <span className="ref-icon">↗</span>Caching overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/cache-invalidation-overview"
                                >
                                    <span className="ref-icon">↗</span>Cache invalidation overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/external-backends-internet-neg-overview"
                                >
                                    <span className="ref-icon">↗</span>External backends specified
                                    by using internet NEGs
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/authenticate-content"
                                >
                                    <span className="ref-icon">↗</span>Content access control
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/best-practices"
                                >
                                    <span className="ref-icon">↗</span>Content delivery best
                                    practices
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/cdn/docs/choose-cdn-product"
                                >
                                    <span className="ref-icon">↗</span>Choose a CDN product
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>Cloud DNS</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/overview"
                                >
                                    <span className="ref-icon">↗</span>Cloud DNS overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/zones/zones-overview"
                                >
                                    <span className="ref-icon">↗</span>DNS zones overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/routing-policies-overview"
                                >
                                    <span className="ref-icon">↗</span>DNS routing policies and
                                    health checks
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/server-policies-overview"
                                >
                                    <span className="ref-icon">↗</span>DNS server policies
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/dnssec"
                                >
                                    <span className="ref-icon">↗</span>DNS Security Extensions
                                    (DNSSEC) overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/migrating"
                                >
                                    <span className="ref-icon">↗</span>Migrate to Cloud DNS
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/best-practices"
                                >
                                    <span className="ref-icon">↗</span>Best practices for Cloud DNS
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/dns/docs/key-terms"
                                >
                                    <span className="ref-icon">↗</span>Key terms (Cloud DNS)
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>GKEとDNS</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-cloud-dns"
                                >
                                    <span className="ref-icon">↗</span>About Cloud DNS for GKE
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cloud-dns"
                                >
                                    <span className="ref-icon">↗</span>Use Cloud DNS for GKE
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service-discovery"
                                >
                                    <span className="ref-icon">↗</span>Service discovery and DNS
                                    (GKE)
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/nodelocal-dns-cache"
                                >
                                    <span className="ref-icon">↗</span>Set up NodeLocal DNSCache
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>IPアドレス管理（IPAM）</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/ip-addresses"
                                >
                                    <span className="ref-icon">↗</span>IP addresses (VPC)
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/subnets"
                                >
                                    <span className="ref-icon">↗</span>Subnets
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/internal-ranges"
                                >
                                    <span className="ref-icon">↗</span>Internal ranges overview
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/create-use-internal-ranges"
                                >
                                    <span className="ref-icon">↗</span>Create and use internal
                                    ranges
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/bring-your-own-ip"
                                >
                                    <span className="ref-icon">↗</span>Bring your own IP addresses
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/byoip-planning"
                                >
                                    <span className="ref-icon">↗</span>Planning for bring your own
                                    IP addresses
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/create-pap"
                                >
                                    <span className="ref-icon">↗</span>Create a public advertised
                                    prefix
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>マネージドサービスへの接続</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/private-services-access"
                                >
                                    <span className="ref-icon">↗</span>Private services access
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/configure-private-services-access"
                                >
                                    <span className="ref-icon">↗</span>Configure private services
                                    access
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/configure-serverless-vpc-access"
                                >
                                    <span className="ref-icon">↗</span>Connect to a VPC network
                                    (Serverless VPC Access)
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/vpc/docs/private-service-connect"
                                >
                                    <span className="ref-icon">↗</span>Private Service Connect
                                    overview
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>Cloud NAT</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/nat/docs/ports-and-addresses"
                                >
                                    <span className="ref-icon">↗</span>IP addresses and ports (Cloud
                                    NAT)
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/nat/docs/public-nat"
                                >
                                    <span className="ref-icon">↗</span>Public NAT
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://docs.cloud.google.com/nat/docs/private-nat"
                                >
                                    <span className="ref-icon">↗</span>Private NAT
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>公式試験情報</h4>
                        <ul>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://cloud.google.com/learn/certification/cloud-network-engineer"
                                >
                                    <span className="ref-icon">↗</span>Google Cloud Professional
                                    Cloud Network Engineer certification
                                </a>
                            </li>
                            <li>
                                <a
                                    className="ref-link"
                                    href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf"
                                >
                                    <span className="ref-icon">↗</span>Professional Cloud Network
                                    Engineer Exam Guide (PDF)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <footer className="page-footer">
                    Google Cloud Professional Cloud Network Engineer 試験対策ガイド · S4:
                    CDN・DNS・IPアドレス管理
                </footer>
            </main>
        </div>
    );
}
