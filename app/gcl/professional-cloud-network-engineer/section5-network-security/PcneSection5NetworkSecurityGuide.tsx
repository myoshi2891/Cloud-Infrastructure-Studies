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
 * PCNE Section 5 ガイドメインコンポーネント
 */
export function PcneSection5NetworkSecurityGuide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="pcne-s5-page">
            <NavBar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((prev) => !prev)}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="layout">
                <main className="main">

                <div className="hero">
                    <span className="kicker">PROFESSIONAL CLOUD NETWORK ENGINEER 対策ガイド</span>
                    <h1>S5: ネットワークセキュリティの設計と実装</h1>
                    <div className="meta-badges">
                        <div className="meta-badge">
                            <span className="label">対象試験</span
                            ><span className="value">Professional Cloud Network Engineer</span>
                        </div>
                        <div className="meta-badge">
                            <span className="label">対応範囲</span
                            ><span className="value">Exam Guide Section 6(出題比率 約13%)</span>
                        </div>
                        <div className="meta-badge">
                            <span className="label">レベル</span
                            ><span className="value">中級者〜上級者</span>
                        </div>
                        <div className="meta-badge">
                            <span className="label">図解方針</span
                            ><span className="value">Mermaid + Markdown表</span>
                        </div>
                    </div>
                    <div className="hero-note">
                        対応範囲: 公式Exam Guide
                        <strong
                            >Section 6「Configuring, implementing and managing a cloud network
                            security solution」</strong
                        >。Cloud Armor・Cloud NGFW / VPCファイアウォール・Cloud NAT・Secure Web
                        Proxy・セルフマネージドNVA / Packet
                        Mirroringの4タスクを、各項目の詳細説明とベストプラクティス、公式ドキュメントの出典URLとともに解説します。
                    </div>
                </div>

                <h2 id="この章の対象範囲スコープ対応表" tabIndex={-1}>この章の対象範囲(スコープ対応表)</h2>
                <p>公式Exam Guideの原文タスクと、本ガイドのPartの対応関係は以下の通りです。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>Exam Guide タスク番号</th>
                                <th>原文タイトル</th>
                                <th>本ガイドでの構成</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>6.1 Configuring Google Cloud Armor policies</td>
                                <td>
                                    エッジ/バックエンドセキュリティポリシー、WAFルール、DDoS/Adaptive
                                    Protection、レート制限、bot管理、Threat Intelligence
                                </td>
                                <td>Part 1</td>
                            </tr>
                            <tr className="even">
                                <td>
                                    6.2 Configuring and managing NGFW policies and VPC Firewall
                                    rules
                                </td>
                                <td>
                                    ファイアウォール戦略、階層評価、GKE/LB対応、L7検査、移行、ルール基準、ロギング、マイクロセグメンテーション、階層(Essentials/Standard/Enterprise)
                                </td>
                                <td>Part 2</td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    6.3 Configuring and securing internet egress traffic using
                                    Public Cloud NAT and Secure Web Proxy
                                </td>
                                <td>
                                    Cloud NAT IPアドレッシング、ポート割り当て、Secure Web Proxy構成
                                </td>
                                <td>Part 3</td>
                            </tr>
                            <tr className="even">
                                <td>
                                    6.4 Configuring self-managed network virtual appliance and
                                    Packet Mirroring
                                </td>
                                <td>
                                    マルチNIC
                                    VMルーティング、ILBネクストホップ、ポリシーベースルート、アウトオブバンド統合、Packet
                                    Mirroring
                                </td>
                                <td>Part 4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf"
                            >Professional Cloud Network Engineer Certification exam guide (PDF)</a
                        >
                    </p>
                </blockquote>

                <h2 id="part-1-google-cloud-armorポリシーの構成" tabIndex={-1}>
                    Part 1: Google Cloud Armorポリシーの構成
                </h2>
                <h3 id="11-cloud-armorのアーキテクチャと適用ポイント" tabIndex={-1}>
                    1.1 Cloud Armorのアーキテクチャと適用ポイント
                </h3>
                <p>
                    Cloud Armorは、Googleのグローバルネットワークのエッジ(Point of Presence,
                    PoP)で動作するセキュリティサービスです。リクエストがバックエンドに到達する前に、可能な限りソースに近い場所でフィルタリング・レート制限・リダイレクトを行うことで、不要なトラフィックがVPCネットワークやバックエンドリソースを消費するのを防ぎます。
                </p>
                <p>
                    Cloud
                    Armorのセキュリティポリシーには複数の種類があり、それぞれ適用対象(アタッチ先)が異なります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ポリシー種別</th>
                                <th>type フラグ</th>
                                <th>アタッチ先</th>
                                <th>主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>バックエンドセキュリティポリシー</td>
                                <td>省略時のデフォルト</td>
                                <td>
                                    外部ALB・内部リージョンALB・グローバル外部プロキシNLBのバックエンドサービス/バックエンドバケット
                                </td>
                                <td>WAF、L7フィルタリング、レート制限、bot管理</td>
                            </tr>
                            <tr className="even">
                                <td>エッジセキュリティポリシー</td>
                                <td><code>CLOUD_ARMOR_EDGE</code></td>
                                <td>バックエンドバケットやキャッシュ可能コンテンツ</td>
                                <td>キャッシュされたコンテンツの保護</td>
                            </tr>
                            <tr className="odd">
                                <td>ネットワークエッジセキュリティポリシー</td>
                                <td><code>CLOUD_ARMOR_NETWORK</code></td>
                                <td>リージョンの「ネットワークエッジセキュリティサービス」</td>
                                <td>
                                    外部パススルーNLB・プロトコルフォワーディング・パブリックIP
                                    VMへの高度なネットワークDDoS防御
                                </td>
                            </tr>
                            <tr className="even">
                                <td>内部サービスセキュリティポリシー</td>
                                <td>—</td>
                                <td>Cloud Service MeshのエンドポイントポリシーB</td>
                                <td>Service Mesh内でのフェアシェアレート制限</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>対応するロードバランサーの種類は以下の通りです。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ロードバランサー種別</th>
                                <th>Cloud Armor(バックエンドポリシー)対応</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>グローバル外部Application Load Balancer(Classic含む)</td>
                                <td>○</td>
                            </tr>
                            <tr className="even">
                                <td>リージョン内部Application Load Balancer</td>
                                <td>○</td>
                            </tr>
                            <tr className="odd">
                                <td>グローバル外部プロキシNetwork Load Balancer(TCP/SSL)</td>
                                <td>○</td>
                            </tr>
                            <tr className="even">
                                <td>外部パススルーNetwork Load Balancer</td>
                                <td>△(ネットワークエッジセキュリティポリシー経由でDDoS防御のみ)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-1" label="ダイアグラム 1" />
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/armor/docs/cloud-armor-overview"
                                >Cloud Armor overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/armor/docs/security-policy-overview"
                                >Security policy overview</a
                            >
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/armor/docs/common-use-cases"
                                >Use cases for security policies</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        バックエンドサービスを新規作成した際は、必ずCloud
                        Armorセキュリティポリシーのアタッチ漏れがないか確認してください。アタッチされていないバックエンドサービスはCloud
                        Armorの保護対象外となり、既知の攻撃パターンに対して無防備な状態になります。
                    </p>
                </blockquote>
                <hr />
                <h3 id="12-セキュリティポリシーの評価順序とルール構造" tabIndex={-1}>
                    1.2 セキュリティポリシーの評価順序とルール構造
                </h3>
                <p>
                    Cloud
                    Armorのルール評価順序は<strong>優先度(priority)の数値が小さいほど高優先度</strong>で、最も低い数値のルールから順に評価されます。マッチしたルールのアクションが即座に適用され、それ以降のルールは評価されません。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>アクション</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>allow</code></td>
                                <td>トラフィックを許可し、バックエンドへ転送</td>
                            </tr>
                            <tr className="even">
                                <td><code>deny(403/404/502等)</code></td>
                                <td>指定したHTTPステータスコードでリクエストを拒否</td>
                            </tr>
                            <tr className="odd">
                                <td><code>rate_based_ban</code></td>
                                <td>閾値を超えたクライアントを一定時間バン</td>
                            </tr>
                            <tr className="even">
                                <td><code>throttle</code></td>
                                <td>閾値を超えたリクエストをスロットリング(一部を許可)</td>
                            </tr>
                            <tr className="odd">
                                <td><code>redirect</code></td>
                                <td>reCAPTCHA評価や別URLへのリダイレクト</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-2" label="ダイアグラム 2" />
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/armor/docs/configure-security-policies"
                            >Create and manage security policies</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: ルールの優先度は100, 1000,
                        2000のように間隔を空けて採番し、後から緊急ルールを既存ルールの間に挿入できる余地を残してください。国コード(ISO
                        3166-1
                        alpha-2)による地域制限を行う場合は、各コードが独立して評価される点に注意し、意図しない許可漏れがないかテストしてください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="13-プリコンフィグドwafルールowasp-crs" tabIndex={-1}>
                    1.3 プリコンフィグドWAFルール(OWASP CRS)
                </h3>
                <p>
                    Cloud Armorのプリコンフィグド(事前構成済み)WAFルールは、OWASP ModSecurity Core
                    Rule
                    Set(CRS)をベースにした署名(シグネチャ)群です。SQLインジェクション(sqli)、クロスサイトスクリプティング(xss)、リモートファイルインクルージョン(rfi)、ローカルファイルインクルージョン(lfi)、リモートコード実行(rce)、スキャナー検出(scannerdetection)など、OWASP
                    Top 10に対応する攻撃カテゴリごとにルールが用意されています。
                </p>
                <p>
                    ルール名の形式は{' '}
                    <code>&lt;攻撃カテゴリ&gt;-&lt;CRSバージョン&gt;-&lt;バージョンフィールド&gt;</code>{' '}
                    です(例:{' '}
                    <code>xss-v422-stable</code>
                    、<code>sqli-v33-stable</code>)。Googleは最新の保護のためCRS{' '}
                    <strong>4.22</strong> の使用を推奨しており、CRS 3.0系は非推奨です。
                </p>
                <p>
                    各シグネチャには<strong>感度レベル(sensitivity level)0〜4</strong
                    >が設定されており、OWASPのパラノイアレベルに対応します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>感度レベル</th>
                                <th>特性</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>0</td>
                                <td>ルール無効(デフォルトでは何も有効化されない)</td>
                            </tr>
                            <tr className="even">
                                <td>1(低)</td>
                                <td>高確信度シグネチャのみ。誤検知(false positive)が最も少ない</td>
                            </tr>
                            <tr className="odd">
                                <td>2〜3(中)</td>
                                <td>セキュリティと誤検知リスクのバランス</td>
                            </tr>
                            <tr className="even">
                                <td>4(高、デフォルト)</td>
                                <td>有効化時に全シグネチャを評価。誤検知リスクが最も高い</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="code-block" role="region" aria-label="コード例 1">
    <div className="code-line"># 感度レベル1でSQLiルールをプレビューモードで作成する例</div>
    <div className="code-line">{`evaluatePreconfiguredWaf('sqli-v33-stable', {'sensitivity': 1})`}</div>
    <div className="code-line"></div>
    <div className="code-line"># 特定のシグネチャIDを除外(誤検知対策)</div>
    <div className="code-line">{`evaluatePreconfiguredWaf('xss-v422-stable', {'opt_out_rule_ids': ['owasp-crs-v042200-id941100-xss']})`}</div>
</div>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/armor/docs/waf-rules"
                                >Preconfigured WAF rules overview</a
                            >
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/armor/docs/rule-tuning"
                                >Tune Cloud Armor preconfigured WAF rules</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/armor/docs/rules-language-reference"
                                >Configure custom rules language attributes</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        本番環境への適用前に、必ず<strong>プレビューモード</strong>(<code>--preview</code>)で数週間ルールを稼働させ、誤検知の有無をログで確認してください。感度レベルは1から開始し、段階的に引き上げることで、正規トラフィックの誤ブロックを避けながらセキュリティレベルを高められます。
                    </p>
                </blockquote>
                <blockquote className="caution">
                    <p>
                        <strong>注意</strong>:
                        感度レベルを4(デフォルト)のまま本番運用に投入すると、レガシーAPIやリッチテキスト入力を許可するアプリケーションで想定以上の誤検知が発生する可能性があります。
                    </p>
                </blockquote>
                <hr />
                <h3 id="14-高度なネットワークddos防御とadaptive-protection" tabIndex={-1}>
                    1.4 高度なネットワークDDoS防御とAdaptive Protection
                </h3>
                <p>
                    Cloud
                    ArmorのDDoS防御は、<strong>ネットワーク層</strong>(L3/L4)と<strong>アプリケーション層</strong>(L7)の2系統に分かれます。
                </p>
                <h4 id="ネットワーク層-標準保護-vs-高度なネットワークddos防御" tabIndex={-1}>
                    ネットワーク層: 標準保護 vs 高度なネットワークDDoS防御
                </h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>標準ネットワークDDoS防御</th>
                                <th>高度なネットワークDDoS防御</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>有効化</td>
                                <td>常時有効(操作不要)</td>
                                <td>
                                    Cloud Armor
                                    Enterpriseへの加入とリージョン単位の明示的な設定が必要
                                </td>
                            </tr>
                            <tr className="even">
                                <td>対象</td>
                                <td>
                                    Google
                                    Cloud基盤の安定性維持が目的。クォータ超過トラフィックのスロットリングのみ
                                </td>
                                <td>
                                    外部パススルーNLB・プロトコルフォワーディング・パブリックIP
                                    VMへの標的型攻撃検知・緩和
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>攻撃シグネチャ検知</td>
                                <td>なし</td>
                                <td>あり(常時オンの volumetric attack detection)</td>
                            </tr>
                            <tr className="even">
                                <td>適用単位</td>
                                <td>Google Cloud全体</td>
                                <td>
                                    リージョン単位(ネットワークエッジセキュリティサービスに関連付け)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-3" label="ダイアグラム 3" />
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/armor/docs/advanced-network-ddos"
                                >Configure advanced network DDoS protection</a
                            >
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/armor/docs/network-edge-policies"
                                >Configure network edge security policies</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <h4 id="アプリケーション層-adaptive-protection" tabIndex={-1}>
                    アプリケーション層: Adaptive Protection
                </h4>
                <p>
                    Adaptive
                    Protectionは、機械学習によりバックエンドサービスへのトラフィックパターンの「正常な基準値(baseline)」を学習し、そこからの逸脱をL7
                    DDoS攻撃(HTTPフラッド等)として検知・アラートするCloud Armor
                    Enterpriseの機能です。
                </p>
                <Diagram id="diag-4" label="ダイアグラム 4" />
                <p>Adaptive Protectionのアラートには以下の情報が含まれます。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>確信度スコア(confidence score)</td>
                                <td>トラフィックパターンの変化が異常である確からしさ(0〜1)</td>
                            </tr>
                            <tr className="even">
                                <td>攻撃シグネチャ</td>
                                <td>悪意あるHTTPヘッダー、クライアントの地理情報などの特徴</td>
                            </tr>
                            <tr className="odd">
                                <td>想定影響ベースライン率(impacted baseline rate)</td>
                                <td>
                                    推奨ルールを適用した場合にブロックされる正常トラフィックの割合
                                </td>
                            </tr>
                            <tr className="even">
                                <td>推奨WAFルール</td>
                                <td>攻撃シグネチャに一致するCloud Armorルール案</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/armor/docs/adaptive-protection-overview"
                                >Adaptive Protection overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/armor/docs/adaptive-protection-use-cases"
                                >Adaptive Protection use cases</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/armor/docs/adaptive-protection-auto-deploy"
                                >Automatically deploy Adaptive Protection suggested rules</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        アラートポリシーの確信度しきい値は<strong>0.5程度の低い値から開始</strong>し、潜在的な攻撃の見逃しを避けてください。誤検知の許容範囲を確認しながら段階的に引き上げます。自動デプロイ(auto-deploy)を有効化する場合は、確信度しきい値を0.8以上、想定影響ベースライン率を0.01以下といった保守的な値に設定し、有効期限(2〜4時間程度)を必ず設定してください。まずは自動デプロイを無効にした手動レビュー運用で数週間の実績を積んでから自動化することを推奨します。
                    </p>
                </blockquote>
                <hr />
                <h3 id="15-レート制限" tabIndex={-1}>1.5 レート制限</h3>
                <p>
                    レート制限ルールは、指定した集計キー(IPアドレス、reCAPTCHAトークン、HTTPヘッダー等)ごとにリクエスト数を集計し、しきい値超過時に<code>throttle</code>(一部リクエストの間引き)または<code>rate_based_ban</code>(一定時間の完全ブロック)を適用します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>アクション</th>
                                <th>動作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>throttle</code></td>
                                <td>
                                    しきい値を超えたリクエストの一部を拒否し、許可レートまで抑制
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>rate_based_ban</code></td>
                                <td>
                                    しきい値を超えたクライアントを、指定した期間にわたって完全にブロック
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    カスタムエラーレスポンスを設定することで、レート制限時にエンドユーザーへ独自のエラーメッセージを返すことも可能です。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a href="https://docs.cloud.google.com/armor/docs/rate-limiting-overview"
                            >Rate limiting overview</a
                        >、<a
                            href="https://docs.cloud.google.com/armor/docs/configure-rate-limiting"
                            >Configure rate limiting</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: 初期波状攻撃(initial
                        wave)への対処には<code>throttle</code>、それでも継続する攻撃者には<code>rate_based_ban</code>という2段階の防御を組み合わせてください。reCAPTCHA連携時は、アクショントークン・セッショントークン・免除Cookieの再利用によるトークン濫用を防ぐため、それぞれに対するレート制限ルールを個別に設定することが推奨されます。
                    </p>
                </blockquote>
                <hr />
                <h3 id="16-bot管理recaptcha連携" tabIndex={-1}>1.6 Bot管理(reCAPTCHA連携)</h3>
                <p>
                    Cloud Armorのbot管理は、reCAPTCHA
                    Enterpriseと統合し、高度なリスク分析によって人間のユーザーと自動化クライアントを区別します。reCAPTCHAはリクエストのリスク属性を暗号化トークンとして発行し、Cloud
                    Armorはこのトークンをインラインで復号します(reCAPTCHAサービスへの追加リクエストは不要)。トークンの属性に基づき、トラフィックを許可・拒否・レート制限・リダイレクトできます。
                </p>
                <p>
                    レート制限ルールはbot管理機能と組み合わせ可能で、しきい値超過時にreCAPTCHA評価へのリダイレクトや、免除Cookie・トークンを悪用するクライアントのバンといった制御ができます。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a href="https://docs.cloud.google.com/armor/docs/bot-management"
                            >Bot management overview</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        reCAPTCHA免除Cookieやトークンを使い回すクライアント(トークン濫用)を防ぐため、アクショントークン・セッショントークン・免除Cookieそれぞれをキーとしたレート制限ルールを設定してください。クレデンシャルスタッフィングやスクレイピング、在庫買い占め攻撃などの不正取引対策として、reCAPTCHA
                        Enterpriseのスコアベース評価と組み合わせることで検知精度が向上します。
                    </p>
                </blockquote>
                <hr />
                <h3 id="17-google-threat-intelligence" tabIndex={-1}>1.7 Google Threat Intelligence</h3>
                <p>
                    Google Threat Intelligenceは、Cloud Armor
                    Enterpriseの購読者向けに、Google/Mandiantが継続的に更新する脅威データフィードに基づいてトラフィックを許可・拒否できる機能です。<code>evaluateThreatIntelligence(&apos;FEED_NAME&apos;)</code>というマッチ式を用いて構成します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>カテゴリ(フィード)</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Torエグジットノード</td>
                                <td>
                                    匿名通信を可能にするTorネットワークの出口ポイントのIPアドレス
                                </td>
                            </tr>
                            <tr className="even">
                                <td>既知の悪意あるIPアドレス</td>
                                <td>
                                    Webアプリケーションへの攻撃の発信元として実績のあるIPアドレス
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Bad bots</td>
                                <td>悪意のあるボット由来と判定されたトラフィック</td>
                            </tr>
                            <tr className="even">
                                <td>パブリッククラウドエンドポイント</td>
                                <td>主要パブリッククラウドプロバイダーのIPレンジ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    フィード内の情報は継続的に更新されるため、追加の運用作業なしに新しい脅威に対する保護が維持されます。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a href="https://docs.cloud.google.com/armor/docs/threat-intelligence"
                            >Apply Google Threat Intelligence</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        Torエグジットノードやパブリッククラウドエンドポイントの一律ブロックは、正規のプライバシー重視ユーザーや正規のクラウド間トラフィックを誤って遮断するリスクがあるため、まずは<code>throttle</code>や監視目的のログ記録から開始し、業務要件に応じて<code>deny</code>へ段階的に移行することを検討してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="18-part-1-ベストプラクティス一覧" tabIndex={-1}>1.8 Part 1 ベストプラクティス一覧</h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>領域</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ポリシー適用漏れ防止</td>
                                <td>
                                    新規バックエンドサービス作成時は必ずCloud
                                    Armorポリシーのアタッチを確認する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ルール優先度設計</td>
                                <td>
                                    優先度番号は100・1000単位で間隔を空け、緊急ルール挿入の余地を残す
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>WAFルール導入</td>
                                <td>
                                    プレビューモードで数週間検証してから本番適用。感度レベルは1から段階的に引き上げる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>DDoS防御</td>
                                <td>
                                    外部パススルーNLB/プロトコルフォワーディング/パブリックIP
                                    VMを保護する場合は高度なネットワークDDoS防御への加入を検討する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Adaptive Protection</td>
                                <td>
                                    確信度0.5から監視を開始し、自動デプロイは保守的なしきい値(確信度0.8以上)かつ有効期限付きで運用する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>レート制限</td>
                                <td>
                                    throttleとrate_based_banを段階的に組み合わせ、reCAPTCHAトークンの再利用も監視する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Threat Intelligence</td>
                                <td>一律ブロックの前に監視・throttleで影響範囲を確認する</td>
                            </tr>
                            <tr className="even">
                                <td>監視</td>
                                <td>
                                    Adaptive Protectionイベント・Cloud Armorログ・Security Command
                                    CenterのCloud Armorカードを定期的にレビューする
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="part-2-cloud-ngfw--vpcファイアウォールルールの構成と管理" tabIndex={-1}>
                    Part 2: Cloud NGFW / VPCファイアウォールルールの構成と管理
                </h2>
                <h3 id="21-ファイアウォール戦略とポリシー種別" tabIndex={-1}>
                    2.1 ファイアウォール戦略とポリシー種別
                </h3>
                <p>
                    Google
                    Cloudのファイアウォールは、Andromedaネットワーク仮想化スタックの一部として<strong>完全分散型・ホストベース</strong>で実装されており、各VMのネットワークインターフェースに対して直接プログラムされます。ポリシーの種類ごとに適用範囲とIAM統合の粒度が異なります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ポリシー種別</th>
                                <th>適用範囲</th>
                                <th>Secure Tags対応</th>
                                <th>Network Tags対応</th>
                                <th>課金(有料機能利用時)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>階層ファイアウォールポリシー</td>
                                <td>組織・フォルダ全体(複数VPC・複数プロジェクトに横断適用)</td>
                                <td>○</td>
                                <td>×</td>
                                <td>機能に応じて課金</td>
                            </tr>
                            <tr className="even">
                                <td>リージョンシステムファイアウォールポリシー</td>
                                <td>Google管理(GKE等の自動生成ルール)</td>
                                <td>—</td>
                                <td>—</td>
                                <td>課金なし</td>
                            </tr>
                            <tr className="odd">
                                <td>VPCファイアウォールルール(classic)</td>
                                <td>単一のVPCネットワーク</td>
                                <td>×</td>
                                <td>○</td>
                                <td>Essentials機能のみで課金なし</td>
                            </tr>
                            <tr className="even">
                                <td>グローバルネットワークファイアウォールポリシー</td>
                                <td>単一VPCの全リージョン</td>
                                <td>○</td>
                                <td>×</td>
                                <td>機能に応じて課金</td>
                            </tr>
                            <tr className="odd">
                                <td>リージョンネットワークファイアウォールポリシー</td>
                                <td>単一VPCの特定リージョン</td>
                                <td>○</td>
                                <td>×</td>
                                <td>機能に応じて課金</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>ファイアウォール戦略の設計指針</strong>:</p>
                <ol type="1">
                    <li>
                        <strong>組織全体で強制すべき絶対要件</strong
                        >(既知の悪意あるIP範囲のブロック、ヘルスチェックの許可等)は階層ファイアウォールポリシーで一元管理する。
                    </li>
                    <li>
                        <strong>VPCネットワーク単位・リージョン単位の柔軟なルール</strong
                        >はグローバル/リージョンネットワークファイアウォールポリシーで管理する。
                    </li>
                    <li>
                        <strong>レガシー環境やシンプルな単一VPC構成</strong
                        >では引き続きVPCファイアウォールルールを使うことも可能だが、Googleは新規機能をすべてファイアウォールポリシー側にのみ追加する方針であり、長期的にはネットワークファイアウォールポリシーへの移行が推奨される。
                    </li>
                </ol>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/firewall-policies-overview"
                                >Firewall policies and rules</a
                            >
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/firewall/docs/about-firewalls"
                                >Cloud NGFW overview</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <hr />
                <h3 id="22-ファイアウォールルールの評価順序" tabIndex={-1}>
                    2.2 ファイアウォールルールの評価順序
                </h3>
                <p>
                    VPCネットワークには<strong>ネットワークファイアウォールポリシー適用順序</strong>(network
                    firewall policy enforcement
                    order)という設定があり、グローバル/リージョンネットワークファイアウォールポリシーをVPCファイアウォールルールより前に評価するか後に評価するかを制御します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>適用順序</th>
                                <th>デフォルト</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>AFTER_CLASSIC_FIREWALL</code></td>
                                <td>○(デフォルト)</td>
                                <td>
                                    VPCファイアウォールルールを、グローバル/リージョンネットワークファイアウォールポリシーより先に評価
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>BEFORE_CLASSIC_FIREWALL</code></td>
                                <td>—</td>
                                <td>
                                    グローバル/リージョンネットワークファイアウォールポリシーを、VPCファイアウォールルールより先に評価
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    階層ファイアウォールポリシーとリージョンシステムファイアウォールポリシーは、適用順序の設定に関わらず<strong>常に最初に評価</strong>されます。
                </p>
                <Diagram id="diag-5" label="ダイアグラム 5" />
                <p>各ステップにおける評価ロジックは共通しており、次の3段階で処理されます。</p>
                <ol type="1">
                    <li>ターゲットが一致しないルールを除外する。</li>
                    <li>パケットの方向(ingress/egress)が一致しないルールを除外する。</li>
                    <li>
                        残ったルールを優先度の高い順(数値が小さい順)に評価し、ターゲットに適用されるルールがマッチするか、マッチするルールがなくなるまで続ける。
                    </li>
                </ol>
                <p>
                    最終ステップの<strong>暗黙のアクション</strong>(implied
                    action)は方向とターゲットによって異なります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>トラフィック方向</th>
                                <th>ターゲット</th>
                                <th>暗黙のアクション</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Ingress</td>
                                <td>VMインスタンスのネットワークインターフェース</td>
                                <td><code>deny</code></td>
                            </tr>
                            <tr className="even">
                                <td>Ingress</td>
                                <td>内部ALB/内部プロキシNLBのフォワーディングルール</td>
                                <td><code>allow</code></td>
                            </tr>
                            <tr className="odd">
                                <td>Egress</td>
                                <td>(すべて)</td>
                                <td><code>allow</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    VPCファイアウォールルールで2つのルールが同一優先度でマッチした場合、<code>deny</code>ルールが<code>allow</code>ルールより優先して適用されます。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-eval-order"
                            >Evaluation order for firewall policies and rules</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        適用順序を変更する強い理由がない限り、デフォルトの<code>AFTER_CLASSIC_FIREWALL</code>を維持してください。新規に大規模なファイアウォール基盤を構築する場合、レガシーなVPCファイアウォールルールへの依存を避け、ネットワークファイアウォールポリシー(グローバル/リージョナル)へ統一することで、Secure
                        Tagsによる一貫したIAM統制と将来の機能追加の恩恵を受けられます。
                    </p>
                </blockquote>
                <hr />
                <h3 id="23-階層ファイアウォールポリシーとeffective-rules" tabIndex={-1}>
                    2.3 階層ファイアウォールポリシーとEffective Rules
                </h3>
                <p>
                    階層ファイアウォールポリシーは組織・フォルダに関連付けられるコンテナで、下位のポリシーやVPCファイアウォールルールへ評価を委譲する<code>goto_next</code>アクションを持つのが特徴です。組織レベルの上位ルールは、下位のフォルダ・プロジェクトのルールで上書きできません。
                </p>
                <Diagram id="diag-6" label="ダイアグラム 6" />
                <p>
                    <strong>Effective Firewall Rules</strong
                    >(実効ファイアウォールルール)は、あるVPCネットワークやVMインターフェースに実際に適用されているルール群を可視化する機能です。階層ファイアウォールポリシー由来のルール、VPCファイアウォールルール、グローバル/リージョンネットワークファイアウォールポリシー由来のルールを、組織レベルからVPCネットワークまでの順序で一覧表示します。
                </p>
                <div className="code-block" role="region" aria-label="コード例 2">
    <div className="code-line"># ネットワーク全体の実効ファイアウォールルールを表示</div>
    <div className="code-line">gcloud compute networks get-effective-firewalls NETWORK_NAME</div>
</div>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/firewall/docs/firewall-policies"
                                >Hierarchical firewall policies</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/manage-hierarchical-firewall-policies"
                                >Manage hierarchical firewall policies and rules</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/using-firewall-policies"
                                >Create hierarchical firewall policies and rules</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        組織レベルのポリシーは「絶対に守るべき最小限のルール」に留め、<code>goto_next</code>を積極的に使って評価を下位へ委譲してください。過度に制限的な組織ポリシーは、各チームの自律的な運用を妨げる摩擦の原因になります。トラブルシューティング時は必ずEffective
                        Firewall
                        Rulesで実際の適用状況を確認し、想定と異なる階層でルールがブロックされていないか検証してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="24-cloud-ngfwの3つの階層essentialsstandardenterprise" tabIndex={-1}>
                    2.4 Cloud NGFWの3つの階層(Essentials/Standard/Enterprise)
                </h3>
                <p>
                    Cloud
                    NGFWは3つの階層(ティア)で提供され、階層が上がるほど高度な機能と、それに応じた課金体系が適用されます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ティア</th>
                                <th>主な機能</th>
                                <th>課金対象トラフィック</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><strong>Essentials</strong></td>
                                <td>
                                    標準的なネットワーク属性(IPレンジ・ポート・プロトコル)によるルール、Secure
                                    Tags、アドレスグループ、階層/グローバル/リージョンポリシー基盤
                                </td>
                                <td>課金なし(無料)</td>
                            </tr>
                            <tr className="even">
                                <td><strong>Standard</strong></td>
                                <td>
                                    Essentialsの全機能 +
                                    FQDNオブジェクト、ジオロケーションオブジェクト、Google Threat
                                    Intelligence(NGFW版)
                                </td>
                                <td>南北トラフィック(インターネット⇔VM)のみ課金</td>
                            </tr>
                            <tr className="odd">
                                <td><strong>Enterprise</strong></td>
                                <td>
                                    Standardの全機能 +
                                    レイヤー7検査(URLフィルタリングサービス、侵入検知防止サービス
                                    IDPS)
                                </td>
                                <td>南北 + 東西トラフィック(Google Cloudリソース間)を課金</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-7" label="ダイアグラム 7" />
                <p>
                    <strong>コスト最適化パターン</strong>:
                    課金はルールが評価された時点(トラフィックフローが有料機能を含むルールによって評価された時点)で発生するため、Essentials機能のみを使うルールを<strong>より高い優先度</strong>(小さい数値)に配置し、大部分のトラフィックをそこで処理させることで、有料ティアの評価対象を必要最小限に絞り込めます。
                </p>
                <Diagram id="diag-8" label="ダイアグラム 8" />
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/firewall/docs/ngfw_tiers"
                                >Cloud NGFW tiers</a
                            >
                        </li>
                        <li>
                            <a href="https://cloud.google.com/firewall/pricing"
                                >Cloud Next Generation Firewall pricing</a
                            >
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/firewall/docs/key-terms"
                                >Key terms</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        データベース層など重要度の高いワークロードにのみIDPS検査(Enterprise機能)を適用し、東西トラフィック全体を無差別に検査対象にしないでください。Essentialsルールを高優先度に配置しバルクトラフィックを無料で処理する設計は、機能面だけでなくコスト面でも重要な設計判断です。
                    </p>
                </blockquote>
                <hr />
                <h3 id="25-レイヤー7検査-tls-inspectionurlフィルタリングidps" tabIndex={-1}>
                    2.5 レイヤー7検査: TLS Inspection・URLフィルタリング・IDPS
                </h3>
                <p>
                    Cloud NGFW
                    Enterpriseのレイヤー7検査機能は、<strong>ファイアウォールエンドポイント</strong>と<strong>セキュリティプロファイル</strong>という2つの構成要素で実現されます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>構成要素</th>
                                <th>役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ファイアウォールエンドポイント</td>
                                <td>
                                    組織レベルのゾーンリソース。1つ以上のVPCに関連付けて傍受トラフィックを検査
                                </td>
                            </tr>
                            <tr className="even">
                                <td>セキュリティプロファイル</td>
                                <td>
                                    <code>url-filtering</code
                                    >(URLフィルタリングルール定義)または<code>threat-prevention</code>(IDPS設定)のいずれかの種別を持つ検査設定
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>セキュリティプロファイルグループ</td>
                                <td>
                                    各種別1つずつのセキュリティプロファイルを含むコンテナ。<code>apply_security_profile_group</code>アクションで参照
                                </td>
                            </tr>
                            <tr className="even">
                                <td>TLS Inspectionポリシー</td>
                                <td>
                                    Certificate Authority
                                    Service(CAS)を用いて暗号化トラフィックを復号し、L7検査を可能にする設定
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    TLS
                    Inspectionは、GoogleマネージドのCAS経由で短命の中間証明書を生成し、傍受したTLSトラフィックを復号
                    → L7検査(URLフィルタリング・IDPS) →
                    再暗号化して送信先へ転送、という流れで動作します。プロトコルバージョンはTLS
                    1.0〜1.3をサポートしますが、HTTP/2・QUIC・HTTP/3・PROXYプロトコルはTLS
                    Inspectionと併用できません。
                </p>
                <Diagram id="diag-9" label="ダイアグラム 9" />
                <p>
                    URLフィルタリングは、TLS
                    Inspectionが無効な場合でもTLSネゴシエーション時のSNI(Server Name
                    Indication)を用いてドメインマッチングが可能です。ただし完全なURLパスでのフィルタリングにはTLS
                    Inspectionが必要です。
                </p>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/about-app-layer-inspection"
                                >Application layer inspection overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/about-url-filtering"
                                >URL filtering service overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/about-tls-inspection"
                                >TLS inspection overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/firewall/docs/configure-urlf-security-profiles"
                                >Create and manage URL filtering security profiles</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        URLフィルタリングのマッチャー文字列は優先度順に評価され、SNI/ドメイン情報を持たないトラフィックの扱いは最高優先度のURLフィルタ(明示的ALLOWまたは暗黙のDENY)によって決まります。ポリシーの末尾に優先度<code>2147483647</code>のワイルドカード拒否ルールを配置し、意図しない許可漏れを防ぐ「暗黙のdeny-all」を明示的に設計してください。Secure
                        Web Proxy(Part 3参照)と組み合わせる場合は、NGFW EnterpriseとSWPの双方でTLS
                        Inspectionを重複させないよう、NGFW側の<code>tls_inspect</code>を無効化することを検討してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="26-ファイアウォールルールの基準criteria" tabIndex={-1}>
                    2.6 ファイアウォールルールの基準(criteria)
                </h3>
                <p>
                    ファイアウォールルール(VPCファイアウォールルール・ファイアウォールポリシールール共通)の主要な構成基準は以下の通りです。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>基準</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>優先度(priority)</td>
                                <td>
                                    0〜65535の整数。数値が小さいほど高優先度。ポリシー内で一意である必要がある
                                </td>
                            </tr>
                            <tr className="even">
                                <td>方向(direction)</td>
                                <td>ingress(受信)またはegress(送信)</td>
                            </tr>
                            <tr className="odd">
                                <td>プロトコル/ポート</td>
                                <td>TCP/UDP/ICMP等のプロトコルと、任意でポート範囲を指定</td>
                            </tr>
                            <tr className="even">
                                <td>送信元(ingressの場合)</td>
                                <td>
                                    IPレンジ、Secure Tags/Network
                                    Tags、サービスアカウント、FQDNオブジェクト(Standard以上)、ジオロケーション(Standard以上)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>宛先(egressの場合)</td>
                                <td>同上</td>
                            </tr>
                            <tr className="even">
                                <td>ターゲット</td>
                                <td>
                                    ルールを適用するリソース(全インスタンス、特定のSecure
                                    Tags/Network Tags、特定のサービスアカウント)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>アクション</td>
                                <td>
                                    allow / deny / apply_security_profile_group /
                                    goto_next(階層ポリシーのみ)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ロギング</td>
                                <td>
                                    ルールごとに有効/無効を設定可能(<code>goto_next</code>ルールはロギング不可)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    REST
                    APIで階層ファイアウォールポリシールールを直接作成する場合は方向を明示的に指定する必要がありますが、gcloud
                    CLIでは方向省略時のデフォルトは<code>INGRESS</code>です。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/firewall/docs/manage-hierarchical-firewall-policies"
                            >Manage hierarchical firewall policies and rules</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        ルールには必ず<code>description</code>フィールドで意図を記録してください。半年後に見返した際、なぜそのルールが存在するのかをチーム全員が理解できることが、大規模組織でのファイアウォール運用の生命線になります。
                    </p>
                </blockquote>
                <hr />
                <h3 id="27-secure-tags-と-network-tags-によるマイクロセグメンテーション" tabIndex={-1}>
                    2.7 Secure Tags と Network Tags によるマイクロセグメンテーション
                </h3>
                <p>Google Cloudには2種類の「タグ」があり、対応するポリシー種別が異なります。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>Secure Tags(IAM-governed tags)</th>
                                <th>Network Tags(従来のタグ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>管理場所</td>
                                <td>Resource Managerでキー・値のペアとして管理</td>
                                <td>VMインスタンス/インスタンステンプレートに直接付与する文字列</td>
                            </tr>
                            <tr className="even">
                                <td>アクセス制御</td>
                                <td>あり(IAMで誰がタグを作成・付与できるか統制可能)</td>
                                <td>なし(単なる文字列、アクセス制御機構を持たない)</td>
                            </tr>
                            <tr className="odd">
                                <td>対応ポリシー</td>
                                <td>
                                    階層ファイアウォールポリシー、グローバル/リージョンネットワークファイアウォールポリシー
                                </td>
                                <td>VPCファイアウォールルール(classic)のみ</td>
                            </tr>
                            <tr className="even">
                                <td>VPCファイアウォールルールでの利用</td>
                                <td>不可</td>
                                <td>可能</td>
                            </tr>
                            <tr className="odd">
                                <td>適用範囲</td>
                                <td>組織全体で一意なキー(最大1,000個のユニークな値を参照可能)</td>
                                <td>VPCネットワークごとに独立した文字列</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Secure
                    Tagsは、IAMによる厳格なアクセス制御のもとで、リージョン・ネットワーク構成に関わらずワークロードに一貫したポリシーを適用できるため、大規模なマイクロセグメンテーション基盤に適しています。GKEワークロードに対してもSecure
                    Tagsを付与できます。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/firewall/docs/tags-firewalls-overview"
                            >Secure tags for firewalls</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        新規に大規模なマイクロセグメンテーション設計を行う場合は、アクセス制御の効かないNetwork
                        Tagsではなく、Secure
                        Tagsを起点に設計してください。「誰がタグを付与できるか」をIAMで統制できることは、多数のチームが同じVPCを共有するShared
                        VPC環境において特に重要な統制ポイントになります。
                    </p>
                </blockquote>
                <hr />
                <h3 id="28-ファイアウォールルールロギング" tabIndex={-1}>2.8 ファイアウォールルールロギング</h3>
                <p>
                    ファイアウォールルールロギングは、ルールごとに有効化する任意設定で、そのルールにマッチしたトラフィックの詳細(接続情報)をCloud
                    Loggingへ記録します。VPCファイアウォールルールとファイアウォールポリシールールでログフォーマットが異なるため、ログ基盤側でのパース処理は両方に対応させる必要があります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ロギング種別</th>
                                <th>対象</th>
                                <th>主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>VPCファイアウォールルールロギング</td>
                                <td>classic VPCファイアウォールルール</td>
                                <td>レガシー環境のトラフィック可視化</td>
                            </tr>
                            <tr className="even">
                                <td>ファイアウォールポリシールールロギング</td>
                                <td>
                                    階層/グローバル/リージョンネットワークファイアウォールポリシー
                                </td>
                                <td>統合的なトラフィック監査・コンプライアンス証跡</td>
                            </tr>
                            <tr className="odd">
                                <td>Firewall Insights</td>
                                <td>全ポリシー種別</td>
                                <td>
                                    過度に許可的なルール・未使用ルール・シャドウルールの検出と改善提案
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/firewall/docs/firewall-policy-rules-logging-overview"
                            >Logging for firewall policy rules</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        すべてのdeny/allowルールでロギングを有効化するとログ量とコストが増大するため、コンプライアンス上重要な境界(組織/フォルダレベルのdenyルール、機密ワークロードへのアクセスを許可するルール)を優先的にロギング対象とし、内部の高頻度な東西トラフィックは必要に応じてサンプリングやFirewall
                        Insightsによる定期レビューで補完してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="29-vpcファイアウォールルールからcloud-ngfwポリシーへの移行" tabIndex={-1}>
                    2.9 VPCファイアウォールルールからCloud NGFWポリシーへの移行
                </h3>
                <p>
                    Googleは移行ツール(<code>gcloud beta compute firewall-rules migrate</code
                    >)を提供しており、既存のVPCファイアウォールルールをグローバルネットワークファイアウォールポリシーへ自動変換できます。
                </p>
                <Diagram id="diag-10" label="ダイアグラム 10" />
                <p>
                    移行によって得られる主な利点は、Secure
                    Tagsを用いたIAM統制、バッチ編集による一括ルール更新、FQDNオブジェクト・ジオロケーションオブジェクト・Threat
                    Intelligenceといった高度な属性の利用、そして複数VPCへの単一ポリシーの共有です。
                </p>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://cloud.google.com/firewall/docs/migrate-vpc-firewall-rules-overview"
                                >VPC firewall rules migration overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://cloud.google.com/firewall/docs/migrate-firewall-rules-no-dependencies"
                                >Migrate VPC firewall rules that don&apos;t use network tags and service
                                accounts</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://cloud.google.com/blog/products/networking/from-vpc-firewall-rules-to-cloud-ngfw-network-firewall-policies"
                                >From VPC firewall rules to Cloud NGFW network firewall policies</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        GKEが自動生成するVPCファイアウォールルール(<code>gke-(.+)-ipv6-all</code>、<code>k8s-fw-*</code>等の正規表現にマッチするルール)は移行ツールの対象から除外し、GKEサービスIP向けのingressルールを個別に手動作成した上で、既存の自動生成allowルールを無効化する専用手順に従ってください。移行直後はすぐに旧ルールを削除せず、Effective
                        Firewall
                        Rulesで新旧ポリシーの評価結果が一致することを確認してから削除作業に進むことを推奨します。
                    </p>
                </blockquote>
                <hr />
                <h3 id="210-gkeおよびcloud-load-balancingでのcloud-ngfwサポート" tabIndex={-1}>
                    2.10 GKEおよびCloud Load BalancingでのCloud NGFWサポート
                </h3>
                <p>Cloud NGFWはGKEワークロードとCloud Load Balancingの双方に対応しています。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ワークロード種別</th>
                                <th>対応内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>GKE Podレベル</td>
                                <td>
                                    Secure
                                    TagsをPodに付与し、ネットワークポリシーと組み合わせたマイクロセグメンテーションが可能
                                </td>
                            </tr>
                            <tr className="even">
                                <td>GKEノードレベル</td>
                                <td>
                                    Essentials/Standard/Enterpriseいずれの機能もノードのVMインターフェースに適用可能
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>内部ALB/内部プロキシNLB</td>
                                <td>
                                    マネージドEnvoyプロキシに対してもファイアウォールルールがingress対象として適用される
                                </td>
                            </tr>
                            <tr className="even">
                                <td>外部ALB(グローバル/リージョン)</td>
                                <td>
                                    グローバル/リージョンネットワークファイアウォールポリシーでバックエンドを保護可能(Cloud
                                    Armorと併用可能)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/firewall/docs/firewall-policies-overview"
                            >Firewall policies and rules</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: GKEクラスタでSecure
                        Tagsベースのマイクロセグメンテーションを導入する際は、GKEのネットワークポリシー(Kubernetes
                        NetworkPolicyリソース、Dataplane V2)とCloud
                        NGFWのファイアウォールポリシーが二重に競合しないよう、責任分界(Podレベルの制御はKubernetes
                        NetworkPolicy、ノード/クラスタ境界の制御はCloud NGFW)を明確にしてください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="211-part-2-ベストプラクティス一覧" tabIndex={-1}>2.11 Part 2 ベストプラクティス一覧</h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>領域</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ポリシー戦略</td>
                                <td>
                                    組織全体の絶対要件は階層ポリシー、柔軟なルールはグローバル/リージョンネットワークポリシーで管理する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>評価順序</td>
                                <td>
                                    特段の理由がなければデフォルトの<code>AFTER_CLASSIC_FIREWALL</code>を維持する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>階層ポリシー</td>
                                <td>
                                    組織レベルは最小限に留め、<code>goto_next</code>で下位への委譲を積極的に活用する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>コスト最適化</td>
                                <td>
                                    Essentials機能のルールを高優先度に配置し、有料ティアの評価対象を絞り込む
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>L7検査</td>
                                <td>
                                    Enterprise階層のIDPS/URLフィルタリングは重要ワークロードに限定して適用する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>マイクロセグメンテーション</td>
                                <td>新規設計はNetwork TagsではなくSecure Tagsを起点にする</td>
                            </tr>
                            <tr className="odd">
                                <td>ロギング</td>
                                <td>
                                    コンプライアンス上重要な境界を優先し、全ルール一律のロギングは避ける
                                </td>
                            </tr>
                            <tr className="even">
                                <td>移行</td>
                                <td>
                                    GKE自動生成ルールを除外し、Effective Firewall
                                    Rulesで新旧の一致を確認してから旧ルールを削除する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>GKE統合</td>
                                <td>
                                    Podレベルの制御はKubernetes
                                    NetworkPolicy、ノード/クラスタ境界はCloud
                                    NGFWと責任分界を明確にする
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2
                    id="part-3-インターネットegressの構成と保護--public-cloud-natとsecure-web-proxy"
                >
                    Part 3: インターネットEgressの構成と保護 — Public Cloud NATとSecure Web Proxy
                </h2>
                <h3 id="31-cloud-natのipアドレッシング" tabIndex={-1}>3.1 Cloud NATのIPアドレッシング</h3>
                <p>
                    Public Cloud
                    NATは、外部IPを持たないVMやGKEノードに対してソースNAT(SNAT)を行い、インターネットへのegress接続を可能にするリージョンサービスです。NAT
                    IPアドレスの割り当て方式には2種類あります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>割り当て方式</th>
                                <th>動作</th>
                                <th>予測可能性</th>
                                <th>主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>自動(Automatic)</td>
                                <td>
                                    VM数・必要ポート数に応じてGoogle
                                    Cloudが静的外部IPを自動的に追加/削除。選択したネットワーク階層(Premium/Standard)のIPが割り当てられる
                                </td>
                                <td>不可(次に割り当てられるIPを事前に予測できない)</td>
                                <td>スケーラビリティを優先する一般的なワークロード</td>
                            </tr>
                            <tr className="even">
                                <td>手動(Manual)</td>
                                <td>管理者が予約済み静的外部IPアドレスを明示的に指定</td>
                                <td>可能</td>
                                <td>
                                    サードパーティAPIのIP許可リスト(allowlist)登録が必要なワークロード
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    自動割り当てのNAT
                    IPは、そのIP上のポートを使用するVMが1つもなくなるまで解放されません(使用中のVMがある限りIPはアクティブなまま保持され、Cloud
                    NATはVMを別IPへ動的に再割り当てすることはありません。これは既存の接続を破壊しないための設計です)。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a href="https://docs.cloud.google.com/nat/docs/ports-and-addresses"
                            >IP addresses and ports</a
                        >、<a
                            href="https://docs.cloud.google.com/nat/docs/set-up-manage-network-address-translation"
                            >Quickstart: Set up and manage network address translation with Public
                            NAT</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        サードパーティのAPIやパートナーシステムがIP許可リストを要求する場合は、必ず手動IP割り当てを選択し、静的予約IPを使用してください。自動割り当てのままでは、IPが変更された際に相手先での許可リスト更新が必要になり、予期しない接続断が発生するリスクがあります。
                    </p>
                </blockquote>
                <hr />
                <h3 id="32-ポート割り当て静的動的" tabIndex={-1}>3.2 ポート割り当て(静的/動的)</h3>
                <p>
                    Cloud NAT
                    IPアドレス1つあたり、TCP/UDPそれぞれ64,512個のソースポート(0〜1,023のウェルノウンポートを除く65,536個から算出)が利用可能です。ポート割り当て方式には静的と動的の2種類があります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>割り当て方式</th>
                                <th>動作</th>
                                <th>デフォルト値</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>静的ポート割り当て</td>
                                <td>全VMに対して固定数のポートを一律割り当て</td>
                                <td>最小64ポート/VM</td>
                            </tr>
                            <tr className="even">
                                <td>動的ポート割り当て</td>
                                <td>
                                    VMごとの実際の使用量に応じて異なる数のポートを動的に割り当て。初期値は最小ポート数からスタートし、必要に応じて最大値まで増加
                                </td>
                                <td>
                                    環境により最小/最大を設定(推奨値:
                                    最小2048、最大4096など、ワークロードにより調整)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-11" label="ダイアグラム 11" />
                <p>
                    ポート割り当て方式の変更や、静的方式でのポート数の<strong>減少</strong>は既存のNAT接続を切断する可能性があるため、変更前に「IPアドレスのドレイン(段階的な切り離し)」の検討が必要です。一方、ポート数の<strong>増加</strong>(静的・動的いずれも)は既存接続を中断しません。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a href="https://docs.cloud.google.com/nat/docs/ports-and-addresses"
                            >IP addresses and ports</a
                        >、<a
                            href="https://docs.cloud.google.com/nat/docs/set-up-manage-network-address-translation"
                            >Quickstart: Set up and manage network address translation with Public
                            NAT</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        ポート枯渇によるNATエラー(<code>allocation_status=&quot;DROPPED&quot;</code>)をCloud
                        Loggingで継続的に監視してください。バーストする可能性のあるワークロードには動的ポート割り当てを採用し、固定サイズのワークロードには静的割り当てでリソースを予測可能に保つという使い分けが基本方針になります。IPアドレスを変更する際は、必ず「外部IPアドレスのドレイン」手順に従い、既存接続を保護してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="33-secure-web-proxyの概要とデプロイモード" tabIndex={-1}>
                    3.3 Secure Web Proxyの概要とデプロイモード
                </h3>
                <p>
                    Secure Web Proxy(Cloud
                    SWP)は、egressのWeb(HTTP/HTTPS)トラフィックに対して、送信元アイデンティティ(Secure
                    Tags・サービスアカウント・IPアドレス)、宛先(ドメイン・URL・URLリスト)、リクエスト属性(メソッド・ヘッダー)に基づく粒度の高いアクセスポリシーを適用するサービスです。
                </p>
                <p>
                    トラフィックの発信元として、VMインスタンス、コンテナ、サーバーレスVPCアクセスコネクタ経由のサーバーレス環境、Cloud
                    VPN/Cloud Interconnect経由のオンプレミスワークロードをサポートします。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>デプロイモード</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>明示的プロキシルーティングモード</td>
                                <td>
                                    クライアント側でSecure Web
                                    Proxyを明示的にプロキシサーバーとして構成。クライアントに代わって新しいTCP接続を作成し、インターネットから分離する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Secure Web ProxyはCertificate Authority Service(CAS)を用いたTLS
                    Inspectionを統合的に提供し、暗号化されたリクエストの内容(完全なURLパス、HTTPヘッダー)まで検査できます。クライアント-プロキシ間のトンネルもTLSで保護可能で、HTTP/HTTPS
                    CONNECTによるクライアント起点のエンドツーエンドTLS接続もサポートします。
                </p>
                <Diagram id="diag-12" label="ダイアグラム 12" />
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/secure-web-proxy/docs/overview"
                                >Secure Web Proxy overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/secure-web-proxy/docs/tls-inspection-overview"
                                >TLS inspection overview | Secure Web Proxy</a
                            >
                        </li>
                        <li>
                            <a href="https://cloud.google.com/security/products/secure-web-proxy"
                                >Secure Web Proxy (SWP)</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: TLS
                        InspectionはクライアントデバイスがSecure Web
                        Proxyのプライベート認証局(内部CA)を信頼済みルートとして事前インストールしている、管理下のデバイス(マネージドVM等)でのみ有効に機能します。証明書ピンニングを行うアプリケーション(特定の公開鍵/CAチェーンをハードコードしたクライアント)はTLS
                        Inspection経由で通信できない場合があるため、事前に対象アプリケーションの互換性を確認してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="34-secure-web-proxyポリシーの構成" tabIndex={-1}>3.4 Secure Web Proxyポリシーの構成</h3>
                <p>
                    Secure Web Proxyのポリシーは<strong
                        >デフォルトで全てのegress Webトラフィックを拒否</strong
                    >し、明示的なルールで許可した通信のみを通す「ホワイトリスト方式」で動作します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>属性カテゴリ</th>
                                <th>利用可能な識別子</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>送信元(source)</td>
                                <td>
                                    サービスアカウント、Secure Tags(Resource
                                    Managerタグ)、IPアドレス(社内固定IPやGoogle Cloud静的IP)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>宛先(destination)</td>
                                <td>
                                    宛先ドメイン、完全URLパス(TLS
                                    Inspection有効時)、URLリスト、宛先ポート
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>リクエスト属性</td>
                                <td>
                                    HTTPメソッド、ヘッダー、URL(ワイルドカード・パターンで指定可能)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    URLリストは複数のポリシーから再利用できるモジュール化されたオブジェクトであり、中央管理者が定義したリストを、各チームが自身のポリシーから参照する運用が可能です。
                </p>
                <p>
                    Secure Web ProxyのegressトラフィックはPublic Cloud
                    NAT経由でインターネットへ出るため、固定の送信元IPアドレスが必要な場合は、Cloud
                    NAT側の設定を「自動(推奨)」から「手動」へ変更し、静的予約IPを割り当てます。
                </p>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/secure-web-proxy/docs/policies-overview"
                                >Secure Web Proxy policies overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/secure-web-proxy/docs/assign-static-ip-addresses-for-egress-traffic"
                                >Assign static IP addresses for outbound traffic</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: Secure Web Proxyのegress
                        IPを固定化する場合、Cloud NAT側で動的ポート割り当てを有効化し(推奨値:
                        最小2048ポート/VM、最大4096ポート/VM)、限られた静的IPプールを効率的に利用してください。VPC
                        Service Controlsと組み合わせることで、Cloud StorageやBigQueryなどのGoogle
                        Cloudサービスからのデータ持ち出し(exfiltration)防止も同時に実現できます。
                    </p>
                </blockquote>
                <hr />
                <h3 id="35-part-3-ベストプラクティス一覧" tabIndex={-1}>3.5 Part 3 ベストプラクティス一覧</h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>領域</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>IPアドレッシング</td>
                                <td>
                                    サードパーティのIP許可リスト連携が必要な場合は手動IP割り当てを使用する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ポート割り当て</td>
                                <td>
                                    均一なワークロードは静的、バーストするワークロードは動的ポート割り当てを選択する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>監視</td>
                                <td>
                                    <code>allocation_status=&quot;DROPPED&quot;</code
                                    >ログを継続監視し、ポート枯渇を早期検知する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>IP変更</td>
                                <td>
                                    変更前に外部IPアドレスのドレイン手順を実施し、既存接続への影響を最小化する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>SWP TLS Inspection</td>
                                <td>
                                    証明書ピンニングを行うアプリケーションの互換性を事前確認する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SWPポリシー</td>
                                <td>
                                    デフォルト拒否の原則を維持し、必要な宛先のみを明示的に許可する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>SWP × Cloud NAT</td>
                                <td>
                                    固定送信元IPが必要な場合はCloud NAT側を手動割り当て +
                                    動的ポート割り当てに構成する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>データ保護</td>
                                <td>
                                    VPC Service Controlsと組み合わせてデータ持ち出しリスクを低減する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="part-4-セルフマネージドnvaとpacket-mirroringの構成" tabIndex={-1}>
                    Part 4: セルフマネージドNVAとPacket Mirroringの構成
                </h2>
                <h3 id="41-マルチnic-vmによるvpc間トラフィックのルーティングと検査" tabIndex={-1}>
                    4.1 マルチNIC VMによるVPC間トラフィックのルーティングと検査
                </h3>
                <p>
                    セルフマネージドのネットワーク仮想アプライアンス(NVA)は、複数のネットワークインターフェース(マルチNIC)を持つCompute
                    Engine
                    VMとして構成され、異なるVPCネットワーク間のトラフィックを検査・ルーティングする役割を担います。サードパーティ製のNGFWアプライアンス(FortiGate、Palo
                    Alto Networks
                    VM-Series等)や自作のルーティング/ゲートウェイソフトウェアが該当します。
                </p>
                <p>
                    典型的な構成は、ハブVPCに配置したマルチNIC
                    NVAのインスタンスグループが、複数のスポークVPCからのトラフィックを集約・検査するハブアンドスポーク型です。
                </p>
                <Diagram id="diag-13" label="ダイアグラム 13" />
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a
                            href="https://docs.cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview"
                            >Internal passthrough Network Load Balancers as next hops</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: マルチNIC
                        NVAを自前で構築・運用する前に、Cloud NGFW Enterprise(Part 2参照)やNetwork
                        Security
                        Integration(本Partの4.4節参照)で同等の要件を満たせないか検討してください。セルフマネージドNVAはGoogle管理サービスに比べて構成・パッチ適用・スケーリングの運用負荷が高く、可能な限りマネージドサービスへの移行を優先することが長期的な運用コストの削減につながります。
                    </p>
                </blockquote>
                <hr />
                <h3 id="42-ha構成-内部パススルーnlbをネクストホップにする" tabIndex={-1}>
                    4.2 HA構成: 内部パススルーNLBをネクストホップにする
                </h3>
                <p>
                    内部パススルーNetwork Load
                    Balancer(ILB)は、静的ルートのネクストホップとして指定できます。これにより、マルチNIC
                    NVAを冗長構成(インスタンスグループの複数VM)にした上で、ヘルスチェックによる自動フェイルオーバーを実現できます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>用途</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>デフォルトルートのネクストホップ</td>
                                <td>
                                    インターネットへのトラフィックを、負荷分散されたゲートウェイVM群経由でルーティング
                                </td>
                            </tr>
                            <tr className="even">
                                <td>複数方向へのトラフィック分散</td>
                                <td>
                                    同一のマルチNIC
                                    VMセットを、方向ごとに異なるILB(nic0向け・nic1向け)の背後に配置し、双方向トラフィックを処理
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>タグベースの複数ネクストホップ</td>
                                <td>
                                    Network
                                    Tagsを使い、クライアントVMごとに異なるILBネクストホップへ振り分け(ECMPは同一優先度・同一タグの複数ルート間では非対応)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-14" label="ダイアグラム 14" />
                <p>
                    ILBネクストホップの背後にあるバックエンドVMは、<strong
                        >IP転送(IP forwarding)を有効化</strong
                    >する必要があります。ILBがネクストホップの場合、クライアントVM側のゲストOSには特別な設定は不要です(クライアントはロードバランサーの背後にあるバックエンドを経由してパケットを送信するだけです)。
                </p>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview"
                                >Internal passthrough Network Load Balancers as next hops</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/load-balancing/docs/internal/deploying-ilb-next-hop-vm"
                                >Deploy a hub-and-spoke network by using a load balancer as the next
                                hop</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-internal-next-hop-tags"
                                >Set up an internal passthrough Network Load Balancer as next hop
                                (with tags)</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        FortiGateなど商用NVAのHAクラスタを構成する場合、アクティブ/パッシブの判定にベンダー固有のヘルスチェックプローブレスポンダー(アクティブなクラスタメンバーのみが応答するプローブ)を使用し、Cloud
                        Load
                        Balancingのヘルスチェックと連携させてください。フェイルオーバー時の既存TCP接続の維持には、Cloud
                        Load
                        Balancingのコネクショントラッキング機能が有効に機能します。タグベースのネクストホップルートはVPC
                        Network
                        Peering経由ではエクスポート/インポートされない点に注意し、Peering先での経路設計を別途検討してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="43-ha-マルチnic-vmルーティングのためのポリシーベースルート" tabIndex={-1}>
                    4.3 HA マルチNIC VMルーティングのためのポリシーベースルート
                </h3>
                <p>
                    ポリシーベースルート(Policy-Based Routes,
                    PBR)は、パケットの<strong>宛先IPアドレスだけでなく、プロトコルや送信元IPアドレスも加味して</strong>ネクストホップを選択できるルーティング機構です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>仕様</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>マッチ条件</td>
                                <td>宛先IP、プロトコル、送信元IPアドレス</td>
                            </tr>
                            <tr className="even">
                                <td>適用対象</td>
                                <td>
                                    同一VPC内の全VMインスタンス/Interconnect
                                    VLANアタッチメント/VPNトンネル、または特定のNetwork
                                    Tagsを持つVMのみ、または特定リージョンのVLANアタッチメントのみ
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ネクストホップ</td>
                                <td>
                                    有効な内部パススルーNLBである必要がある(同一VPC、またはVPC
                                    Network Peering接続先のVPC)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>バックエンド要件</td>
                                <td>
                                    ネクストホップILBの背後のVMインスタンスはIP転送を有効化する必要がある
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>評価順序</td>
                                <td>
                                    サブネットルート・スタティックルート・ダイナミックルートより先、特殊経路(special
                                    routing paths)より後に評価される
                                </td>
                            </tr>
                            <tr className="even">
                                <td>同一優先度の競合</td>
                                <td>
                                    複数のポリシーベースルートが同一優先度でマッチする場合、Google
                                    Cloudが内部アルゴリズムで1つを選択(最も詳細なマッチが選ばれるとは限らない)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-15" label="ダイアグラム 15" />
                <p>
                    ポリシーベースルートは、通常のスタティックルート(宛先IPのみでマッチ)よりも粒度の高い制御が必要な場合、たとえば「特定のプロトコル(TCP/443のみ)や特定の送信元サブネットのトラフィックのみをNVA経由でインスペクションしたい」といったユースケースで使用します。
                </p>
                <blockquote className="cite">
                    <p>
                        <strong>出典</strong>: <a href="https://docs.cloud.google.com/vpc/docs/policy-based-routes"
                            >Policy-based routes</a
                        >
                    </p>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>: マルチNIC
                        NVAをHA構成にする際は、ポリシーベースルートのネクストホップにも内部パススルーNLBを指定し、静的ルート(4.2節)と組み合わせることで、プロトコル/送信元単位の柔軟なトラフィック挿入と、ロードバランサーによる自動フェイルオーバーの両方を実現してください。同一優先度でのルート競合は選択結果が保証されないため、意図した経路制御には優先度を明示的に分離してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="44-アウトオブバンドのnetwork-security-integration戦略" tabIndex={-1}>
                    4.4 アウトオブバンドのNetwork Security Integration戦略
                </h3>
                <p>
                    Network Security Integration(NSI)のアウトオブバンド統合は、Packet
                    Mirroring技術を基盤としつつ、<strong>プロデューサー(検査サービス提供側)とコンシューマー(トラフィックを検査してほしい側)を分離したモデル</strong>を提供する、よりスケーラブルなアーキテクチャです。トラフィックはGeneveカプセル化によって元のパケットを保持したまま転送され、VPCネットワーク識別子が付与されるため、重複するIPアドレス範囲を持つ複数VPCが存在する環境でも正しく識別できます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>コンポーネント</th>
                                <th>役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ミラーリングデプロイグループ(プロデューサー側)</td>
                                <td>
                                    複数ゾーンにまたがるミラーリングデプロイの集合。プロデューサーの検査サービスを表すグローバルなプロジェクトレベルリソース
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ミラーリングエンドポイントグループ(コンシューマー側)</td>
                                <td>
                                    プロデューサーのデプロイグループを参照するコンシューマー側リソース
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ミラーリングエンドポイントグループアソシエーション</td>
                                <td>
                                    エンドポイントグループを特定のVPCネットワークに関連付け、そのVPCのトラフィックを検査対象にする
                                </td>
                            </tr>
                            <tr className="even">
                                <td>カスタムミラーリングセキュリティプロファイル</td>
                                <td>
                                    ミラーリングエンドポイントグループを参照する検査設定。セキュリティプロファイルグループに含めてファイアウォールルールの<code>MIRROR</code>アクションから参照
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-16" label="ダイアグラム 16" />
                <p>
                    NSIアウトオブバンド統合は、<strong>ミラーリングコレクターのサービス化</strong>という運用モデルもサポートします。セキュリティ管理者が所有する専用プロジェクトでミラーリングデプロイグループを一元運用し、各アプリケーションチームのVPC(コンシューマー)がそれをサービスとして利用する、という責任分界が可能です。
                </p>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a
                                href="https://docs.cloud.google.com/network-security-integration/docs/out-of-band/out-of-band-integration-overview"
                                >Out-of-band integration overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://cloud.google.com/network-security-integration/docs/out-of-band/endpoint-groups-overview"
                                >Mirroring endpoint groups overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://cloud.google.com/network-security-integration/docs/out-of-band/deployment-groups-overview"
                                >Mirroring deployment groups overview</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://cloud.google.com/network-security-integration/docs/tutorial/out-of-band-integration-tutorial"
                                >Set up out-of-band integration for a producer-consumer model</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        複数のアプリケーションチームが同じ検査基盤(IDS/NTAツール等)を共有する組織では、従来のPacket
                        Mirroring(4.5節)よりも、プロデューサー/コンシューマーモデルのNetwork
                        Security
                        Integrationを優先的に検討してください。検査アプライアンスの運用をセキュリティチームに集約しつつ、各チームのVPCからはサービスとして疎結合に利用できるため、大規模組織でのスケーラビリティと運用分離の両方を実現できます。regional
                        network firewall policiesはPacket
                        Mirroringに対応していない点にも留意してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="45-packet-mirroringセルフマネージドコレクター" tabIndex={-1}>
                    4.5 Packet Mirroring(セルフマネージドコレクター)
                </h3>
                <p>
                    従来のPacket
                    Mirroring機能は、指定したVPC内のミラーリング対象インスタンス(mirrored
                    sources)のトラフィックを複製し、内部パススルーNLBの背後にあるコレクターインスタンスグループへ転送します。ペイロードとヘッダーを含む全トラフィックをエクスポートするため、サンプリングベースのVPC
                    Flow
                    Logsでは検出できない詳細な脅威分析やアプリケーションパフォーマンス分析が可能です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>設定項目</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ミラーリング対象(source)</td>
                                <td>
                                    サブネット、Network
                                    Tags、インスタンス名のいずれかで指定。複数指定した場合、いずれかにマッチするインスタンスが対象
                                </td>
                            </tr>
                            <tr className="even">
                                <td>キャプチャ方向</td>
                                <td>ingressのみ・egressのみ・両方向、を選択可能</td>
                            </tr>
                            <tr className="odd">
                                <td>コレクター destination</td>
                                <td>
                                    内部パススルーNLBの背後にあるインスタンスグループ(コレクターインスタンス)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>スコープの制約</td>
                                <td>
                                    ミラーリング対象は同一プロジェクト・同一VPCネットワーク・同一リージョン内である必要がある
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-17" label="ダイアグラム 17" />
                <p>
                    コレクターインスタンスは、ミラーリング対象からのトラフィックとGoogle
                    Cloudヘルスチェックシステムからのトラフィックを受信できるファイアウォールルールが必要です。また、コレクターにはインターネットトラフィックが到達しないよう、内部IPアドレスのみを割り当てることが推奨されます。
                </p>
                <p>
                    VPC Flow
                    Logsはミラーリングされたパケット自体をログに記録しませんが、コレクターインスタンスが配置されたサブネットでVPC
                    Flow
                    Logsが有効な場合、コレクター宛ての直接トラフィック(元の宛先IPがコレクターのIPと一致するフロー)はログに記録されます。
                </p>
                <blockquote className="cite">
                    <p><strong>出典</strong>:</p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/packet-mirroring"
                                >Packet Mirroring</a
                            >
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/vpc/docs/using-packet-mirroring"
                                >Use Packet Mirroring</a
                            >
                        </li>
                    </ul>
                </blockquote>
                <blockquote className="practice">
                    <p>
                        <strong>ベストプラクティス</strong>:
                        ミラーリング対象・コレクターともに同一プロジェクト・同一VPC・同一リージョンという制約があるため、複数リージョンにまたがる大規模環境では、リージョンごとに独立したPacket
                        Mirroringポリシーとコレクター基盤を設計する必要があります。組織横断的な集約検査基盤が必要な場合は、4.4節のNetwork
                        Security
                        Integration(アウトオブバンド統合)への移行を検討してください。ミラーリングはVM側で追加の帯域を消費する点も、キャパシティプランニング時に考慮してください。
                    </p>
                </blockquote>
                <hr />
                <h3 id="46-part-4-ベストプラクティス一覧" tabIndex={-1}>4.6 Part 4 ベストプラクティス一覧</h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th>領域</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>NVA導入の判断</td>
                                <td>
                                    セルフマネージドNVAの前に、Cloud NGFW
                                    EnterpriseやNSIで要件を満たせないか検討する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>HA設計</td>
                                <td>
                                    内部パススルーNLBをネクストホップにし、ヘルスチェックによる自動フェイルオーバーを構成する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IP転送</td>
                                <td>
                                    ネクストホップILB背後のバックエンドVMでは必ずIP転送を有効化する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ポリシーベースルート</td>
                                <td>
                                    プロトコル/送信元単位の細かい制御が必要な場合はPBRを、シンプルなデフォルトルート挿入には静的ルートを使い分ける
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>タグベースルート</td>
                                <td>
                                    VPC Network
                                    Peering越しにはタグ付きルートがエクスポートされない点を設計に織り込む
                                </td>
                            </tr>
                            <tr className="even">
                                <td>検査基盤の選定</td>
                                <td>
                                    複数チーム共有の検査基盤はNSI(プロデューサー/コンシューマーモデル)を優先し、単純な単一VPC内検査には従来のPacket
                                    Mirroringを使う
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>スコープ制約</td>
                                <td>
                                    Packet
                                    Mirroringはプロジェクト/VPC/リージョンの境界を越えられないため、マルチリージョン環境ではリージョンごとに設計する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>コレクター保護</td>
                                <td>
                                    コレクターインスタンスには内部IPのみを割り当て、インターネットからの直接到達を防ぐ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="設計実装チェックリスト" tabIndex={-1}>設計・実装チェックリスト</h2>
                <p>
                    以下は、Section
                    6「ネットワークセキュリティの設計と実装」に関する設計・実装レビュー用のチェックリストです。
                </p>
                <div className="checklist-card">
                    <div className="checklist-card-header">
                        <h4>Cloud Armor(6.1)</h4>
                        <span className="checklist-counter">0 / 0 完了</span>
                    </div>
                    <ul className="task-list checklist-list">
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />全ての公開バックエンドサービス/バックエンドバケットにCloud
                                Armorセキュリティポリシーがアタッチされているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />プリコンフィグドWAFルールをプレビューモードで検証済みか、感度レベルは段階的に設定されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />外部パススルーNLB/プロトコルフォワーディング/パブリックIP
                                VMを保護する場合、高度なネットワークDDoS防御への加入を検討したか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />Adaptive
                                Protectionのアラートしきい値・自動デプロイ条件が保守的に設定されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />レート制限ルール(throttle/rate_based_ban)がAPIエンドポイントの特性に応じて設計されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />Bot管理・reCAPTCHA連携が必要なエンドポイントで有効化されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />Google Threat
                                Intelligenceの適用範囲(Tor/悪意あるIP/bot/パブリッククラウド)が業務要件と整合しているか</label
                            >
                        </li>
                    </ul>
                </div>

                <div className="checklist-card">
                    <div className="checklist-card-header">
                        <h4>Cloud NGFW / VPCファイアウォール(6.2)</h4>
                        <span className="checklist-counter">0 / 0 完了</span>
                    </div>
                    <ul className="task-list checklist-list">
                        <li>
                            <label
                                ><input type="checkbox" />ファイアウォール戦略(階層 vs
                                グローバル/リージョンネットワーク vs VPC
                                classic)が組織のガバナンス方針と整合しているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />ネットワークファイアウォールポリシー適用順序(AFTER/BEFORE_CLASSIC_FIREWALL)を意図的に選択しているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />階層ファイアウォールポリシーの組織レベルルールが最小限に設計され、<code>goto_next</code>で下位へ適切に委譲されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />Cloud
                                NGFWの利用ティア(Essentials/Standard/Enterprise)が要件とコストのバランスを考慮して選定されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />Essentials機能のルールが高優先度に配置され、有料ティアの評価対象が絞り込まれているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />L7検査(TLS
                                Inspection・URLフィルタリング・IDPS)が重要ワークロードに限定して適用されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />マイクロセグメンテーションの主軸としてSecure
                                Tagsが採用されているか(Network
                                Tagsへの新規依存を避けているか)</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />ファイアウォールルールロギングがコンプライアンス上重要な境界に対して有効化されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />VPCファイアウォールルールからの移行計画がGKE自動生成ルールの除外を考慮しているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />GKEワークロードにおけるPodレベル制御(NetworkPolicy)とクラスタ境界制御(Cloud
                                NGFW)の責任分界が明確か</label
                            >
                        </li>
                    </ul>
                </div>

                <div className="checklist-card">
                    <div className="checklist-card-header">
                        <h4>Cloud NAT・Secure Web Proxy(6.3)</h4>
                        <span className="checklist-counter">0 / 0 完了</span>
                    </div>
                    <ul className="task-list checklist-list">
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />サードパーティ連携でIP許可リストが必要な場合、手動IPアドレス割り当てが選択されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />ポート割り当て方式(静的/動的)がワークロードの接続パターンに応じて選定されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />NATポート枯渇(<code>allocation_status=&quot;DROPPED&quot;</code>)の監視・アラートが設定されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />IPアドレス変更時のドレイン手順が運用手順書に含まれているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />Secure Web
                                Proxyのデフォルト拒否ポリシーの例外(許可ルール)が最小権限で設計されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />Secure Web ProxyのTLS
                                Inspectionと証明書ピンニングを行うアプリケーションとの互換性が確認済みか</label
                            >
                        </li>
                    </ul>
                </div>

                <div className="checklist-card">
                    <div className="checklist-card-header">
                        <h4>セルフマネージドNVA・Packet Mirroring(6.4)</h4>
                        <span className="checklist-counter">0 / 0 完了</span>
                    </div>
                    <ul className="task-list checklist-list">
                        <li>
                            <label
                                ><input type="checkbox" />セルフマネージドNVA導入前にCloud NGFW
                                Enterprise/NSIでの代替可能性を検討したか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />マルチNIC
                                NVAのHA構成で内部パススルーNLBネクストホップとヘルスチェックが構成されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />ネクストホップILB背後のバックエンドVMでIP転送が有効化されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />ポリシーベースルートと静的ルートの使い分けが要件(プロトコル/送信元単位の制御要否)に基づいているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />複数チーム共有の検査基盤にNetwork Security
                                Integration(プロデューサー/コンシューマーモデル)が検討されているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input type="checkbox" />Packet
                                Mirroringのスコープ制約(同一プロジェクト/VPC/リージョン)がマルチリージョン設計に織り込まれているか</label
                            >
                        </li>
                        <li>
                            <label
                                ><input
                                    type="checkbox"
                                />コレクターインスタンスに内部IPのみが割り当てられ、インターネットから直接到達不可能になっているか</label
                            >
                        </li>
                    </ul>
                </div>

                <hr />
                <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                <div className="ref-grid">
                    <div className="ref-card">
                        <h4>Cloud Armor</h4>
                        <ul>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/cloud-armor-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Cloud Armor overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/security-policy-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Security policy overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/common-use-cases"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Use cases for security policies</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/configure-security-policies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Create and manage security policies</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/waf-rules"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Preconfigured WAF rules overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/rule-tuning"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Tune Cloud Armor preconfigured WAF rules</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/rules-language-reference"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Configure custom rules language attributes</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/advanced-network-ddos"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Configure advanced network DDoS protection</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/network-edge-policies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Configure network edge security policies</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/adaptive-protection-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Adaptive Protection overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/adaptive-protection-use-cases"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Adaptive Protection use cases</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/adaptive-protection-auto-deploy"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Automatically deploy Adaptive Protection suggested
                                        rules</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/rate-limiting-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Rate limiting overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/configure-rate-limiting"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Configure rate limiting</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/bot-management"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Bot management overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/armor/docs/threat-intelligence"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Apply Google Threat Intelligence</span></a
                                >
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>Cloud NGFW / VPCファイアウォール</h4>
                        <ul>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/about-firewalls"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Cloud NGFW overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/key-terms"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span><span>Key terms</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/firewall-policies-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Firewall policies and rules</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-eval-order"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Evaluation order for firewall policies and rules</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/firewall-policies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Hierarchical firewall policies</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/using-firewall-policies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Create hierarchical firewall policies and rules</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/manage-hierarchical-firewall-policies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Manage hierarchical firewall policies and rules</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/ngfw_tiers"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span><span>Cloud NGFW tiers</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/firewall/pricing"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Cloud Next Generation Firewall pricing</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/about-app-layer-inspection"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Application layer inspection overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/about-url-filtering"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>URL filtering service overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/configure-urlf-security-profiles"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Create and manage URL filtering security profiles</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/about-tls-inspection"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>TLS inspection overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/tags-firewalls-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Secure tags for firewalls</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/firewall-policy-rules-logging-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Logging for firewall policy rules</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/firewall/docs/migrate-vpc-firewall-rules-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>VPC firewall rules migration overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/firewall/docs/migrate-firewall-rules-no-dependencies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Migrate VPC firewall rules that don&apos;t use network tags and
                                        service accounts</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/blog/products/networking/from-vpc-firewall-rules-to-cloud-ngfw-network-firewall-policies"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >From VPC firewall rules to Cloud NGFW network firewall
                                        policies (blog)</span
                                    ></a
                                >
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>Cloud NAT・Secure Web Proxy</h4>
                        <ul>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/nat/docs/ports-and-addresses"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>IP addresses and ports | Cloud NAT</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/nat/docs/set-up-manage-network-address-translation"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Quickstart: Set up and manage network address translation
                                        with Public NAT</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/secure-web-proxy/docs/overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Secure Web Proxy overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/secure-web-proxy/docs/policies-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Secure Web Proxy policies overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/secure-web-proxy/docs/tls-inspection-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>TLS inspection overview | Secure Web Proxy</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/secure-web-proxy/docs/assign-static-ip-addresses-for-egress-traffic"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Assign static IP addresses for outbound traffic</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/security/products/secure-web-proxy"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Secure Web Proxy (SWP) — product page</span></a
                                >
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>セルフマネージドNVA・Packet Mirroring・Network Security Integration</h4>
                        <ul>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Internal passthrough Network Load Balancers as next
                                        hops</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/load-balancing/docs/internal/deploying-ilb-next-hop-vm"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Deploy a hub-and-spoke network by using a load balancer as
                                        the next hop</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/load-balancing/docs/internal/setting-up-internal-next-hop-tags"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Set up an internal passthrough Network Load Balancer as
                                        next hop (with tags)</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/vpc/docs/policy-based-routes"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Policy-based routes</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/vpc/docs/packet-mirroring"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span><span>Packet Mirroring</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/vpc/docs/using-packet-mirroring"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Use Packet Mirroring</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://docs.cloud.google.com/network-security-integration/docs/out-of-band/out-of-band-integration-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Out-of-band integration overview | Network Security
                                        Integration</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/network-security-integration/docs/out-of-band/endpoint-groups-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Mirroring endpoint groups overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/network-security-integration/docs/out-of-band/deployment-groups-overview"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span>Mirroring deployment groups overview</span></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://cloud.google.com/network-security-integration/docs/tutorial/out-of-band-integration-tutorial"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Set up out-of-band integration for a producer-consumer
                                        model</span
                                    ></a
                                >
                            </li>
                        </ul>
                    </div>
                    <div className="ref-card">
                        <h4>試験ガイド・認定情報</h4>
                        <ul>
                            <li>
                                <a
                                    href="https://cloud.google.com/learn/certification/cloud-network-engineer"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Google Cloud Certified - Professional Cloud Network
                                        Engineer</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://services.google.com/fh/files/misc/professional_cloud_network_engineer_exam_guide_english.pdf"
                                    rel="noopener"
                                    target="_blank"
                                    ><span className="ref-icon">↗</span
                                    ><span
                                        >Professional Cloud Network Engineer Certification exam
                                        guide (PDF)</span
                                    ></a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            
                </main>
            </div>
        </div>
    );
}
