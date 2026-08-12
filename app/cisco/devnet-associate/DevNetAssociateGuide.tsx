'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

/** Wraps Mermaid's client renderer for diagrams embedded throughout the guide. */
const Diagram = memo(function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

/** Renders the complete DevNet Associate guide body and delegates client UI to child components. */
export default function DevNetAssociateGuide() {
    return (
        <div className="devnet-associate-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    <div className="section" id="s0">
                        <h1>Cisco Certified DevNet Associate 試験 完全ガイド</h1>
                        <p className="lead">
                            初学者向けにステップバイステップで解説します。各記述の根拠となる一次情報源URLは、本文中および末尾「参考文献・ソース一覧」に明記しています。
                        </p>
                        <span className="badge">試験コード: 200-901</span>
                        <span className="badge">試験時間: 120分</span>
                        <span className="badge">認定有効期間: 3年</span>
                    </div>

                    <div className="section" id="s1">
                        <h2>
                            <span className="num">1.</span>【重要】名称変更に関するお知らせ（2026年2月〜）
                        </h2>
                        <div className="callout warn">
                            <p>
                                このガイドを書いている2026年7月時点で、「Cisco Certified DevNet
                                Associate」という名称そのものはすでに移行済みです。ご質問にあったシスコ公式ページ（日本語版）は現在も「DevNet
                                Associate」の名称で表示されていますが、シスコ公式ブログによると、2026年2月3日をもって認定名称が刷新されています。
                            </p>
                        </div>
                        <ul>
                            <li>
                                2025年5月にシスコが発表し、2026年2月3日付けで、DevNet認定トラック全体が「Automation」トラックへ改称されました。
                            </li>
                            <li>
                                <strong>試験内容・出題範囲はAssociateレベルではほぼ変更なし</strong>（「Same test, new names（試験は同じ、名前が新しくなっただけ）」と公式ブログが明言）。
                            </li>
                            <li>
                                名称変更のタイミングでアクティブな認定を保持していた人は、自動的に新名称の認定として扱われ、再受験は不要です。
                            </li>
                        </ul>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">旧名称（〜2026年2月2日）</th>
                                    <th scope="col">新名称（2026年2月3日〜）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Associateレベル認定</td>
                                    <td>Cisco Certified DevNet Associate</td>
                                    <td><strong>CCNA Automation</strong></td>
                                </tr>
                                <tr>
                                    <td>Associateレベル試験コード</td>
                                    <td>200-901 DEVASC</td>
                                    <td><strong>200-901 CCNAAUTO</strong></td>
                                </tr>
                                <tr>
                                    <td>Professionalレベル認定</td>
                                    <td>Cisco Certified DevNet Professional</td>
                                    <td><strong>CCNP Automation</strong></td>
                                </tr>
                                <tr>
                                    <td>Professionalコア試験</td>
                                    <td>350-901 DEVCOR</td>
                                    <td><strong>350-901 AUTOCOR</strong>（出題範囲が大幅刷新）</td>
                                </tr>
                                <tr>
                                    <td>Expertレベル認定</td>
                                    <td>Cisco Certified DevNet Expert</td>
                                    <td><strong>CCIE Automation</strong></td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            また、以下の4つのスペシャリスト認定は2026年2月2日付けで<strong>移行措置なしに廃止</strong>されています：SAUTO、SPAUTO、CLAUTO、DEVOPS。
                        </p>
                        <p>
                            以降の本文では、現在の正式名称である「<strong>CCNA Automation（旧DevNet Associate）</strong>」として解説します。試験コードは200-901です。
                        </p>
                    </div>

                    <div className="section" id="s2">
                        <h2><span className="num">2.</span>DevNet Associateとは何か</h2>
                        <p>
                            CCNA Automation（旧DevNet Associate）は、シスコプラットフォーム上で動くアプリケーションの開発・運用スキルを証明する、<strong>エントリー〜アソシエイトレベル</strong>の認定です。
                        </p>
                        <p>対象としているのは次のような人たちです。</p>
                        <ul>
                            <li>ソフトウェア開発者（ネットワークの知識を身につけたい人）</li>
                            <li>ネットワークエンジニア（プログラミングや自動化のスキルを身につけたい人）</li>
                            <li>DevOpsエンジニア、自動化スペシャリスト</li>
                            <li>その他のソフトウェア専門職</li>
                        </ul>
                        <p>
                            ポイントは「<strong>トレーニングは1つ、試験も1つ</strong>」というシンプルな構成で、1つの試験に合格するだけで取得できることです。
                        </p>
                    </div>

                    <div className="section" id="s3">
                        <h2><span className="num">3.</span>Cisco資格体系における位置づけ</h2>
                        <p>
                            CCNA Automationは、Automationトラック（旧DevNetトラック）における最初のステップです。上位にProfessional、Expertレベルが存在し、段階的にキャリアアップしていく構成になっています。
                        </p>

                        <Diagram id="diag-s3" label="Cisco資格体系における位置づけを示す図" />

                        <p>
                            なお、CCNA Automationの取得に、一般的なネットワーク資格であるCCNA（200-301）の取得は必須ではありません。自動化・API・プログラミングを軸にしたい人はCCNA Automationから直接始めることができます。
                        </p>
                    </div>

                    <div className="section" id="s4">
                        <h2><span className="num">4.</span>試験の基本情報</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>認定名称</td>
                                    <td>CCNA Automation（旧称: Cisco Certified DevNet Associate）</td>
                                </tr>
                                <tr>
                                    <td>試験名</td>
                                    <td>Automating Networks Using Cisco Platforms</td>
                                </tr>
                                <tr>
                                    <td>試験コード</td>
                                    <td>200-901 CCNAAUTO（旧: 200-901 DEVASC）</td>
                                </tr>
                                <tr>
                                    <td>試験時間</td>
                                    <td>120分</td>
                                </tr>
                                <tr>
                                    <td>受験言語</td>
                                    <td>日本語、英語</td>
                                </tr>
                                <tr>
                                    <td>出題形式</td>
                                    <td>選択問題（単一回答/複数回答）、ドラッグ&amp;ドロップ、穴埋め、シミュレーションなど</td>
                                </tr>
                                <tr>
                                    <td>出題数の目安</td>
                                    <td>90〜110問程度（Cisco公式は具体的な問題数を公表していません）</td>
                                </tr>
                                <tr>
                                    <td>受験方法</td>
                                    <td>Pearson VUEでの試験予約（テストセンター/オンライン監督いずれか）</td>
                                </tr>
                                <tr>
                                    <td>受験料</td>
                                    <td>300 USD（税別・目安。国や為替により変動するためPearson VUE公式ページで要確認）</td>
                                </tr>
                                <tr>
                                    <td>認定有効期間</td>
                                    <td>3年間</td>
                                </tr>
                                <tr>
                                    <td>前提条件</td>
                                    <td>公式な前提条件なし（推奨経験は後述）</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="callout">
                            <p>
                                合格に必要なスコア（カットスコア）は、シスコが公式には固定値を公表していません。1000点満点中おおむね750〜850点前後が目安とされていますが、これは非公式の推定値である点に注意してください。
                            </p>
                        </div>
                    </div>

                    <div className="section" id="s5">
                        <h2><span className="num">5.</span>出題範囲と配分</h2>
                        <p>試験は6つのドメイン（出題領域）から構成されます。配分（重み）は以下の通りです。</p>

                        <Diagram id="diag-s5" label="200-901 CCNAAUTO 出題範囲の比率を示す円グラフ" />

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">ドメイン名</th>
                                    <th scope="col">配分</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.0</td>
                                    <td>ソフトウェア開発と設計</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>2.0</td>
                                    <td>APIの理解と使用</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>3.0</td>
                                    <td>シスコプラットフォームと開発</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>4.0</td>
                                    <td>アプリケーションの展開とセキュリティ</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>5.0</td>
                                    <td>インフラストラクチャと自動化</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>6.0</td>
                                    <td>ネットワーク基礎</td>
                                    <td>15%</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            「APIの理解と使用」と「インフラストラクチャと自動化」の2領域で試験全体の40%を占めており、この試験の核となる部分であることが分かります。
                        </p>
                    </div>

                    <div className="section" id="s6">
                        <h2><span className="num">6.</span>各ドメインを初心者向けに解説</h2>

                        <h3>6.1 ソフトウェア開発と設計（15%）</h3>
                        <p>プログラマーとしての「土台」となる知識です。初学者はまずここから固めるとスムーズです。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">学習項目</th>
                                    <th scope="col">初心者向けポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>データ形式（XML、JSON、YAML）</td>
                                    <td>3つの形式を見分け、Pythonの辞書やリストに変換できるようにする</td>
                                </tr>
                                <tr>
                                    <td>テスト駆動開発（TDD）</td>
                                    <td>「先にテストを書いてから実装する」という考え方を理解する</td>
                                </tr>
                                <tr>
                                    <td>開発手法（アジャイル、リーン、ウォーターフォール）</td>
                                    <td>それぞれの違い（反復的か、一括か）を説明できるようにする</td>
                                </tr>
                                <tr>
                                    <td>コードの構造化</td>
                                    <td>関数・クラス・モジュールに分ける利点（再利用性、保守性）を理解する</td>
                                </tr>
                                <tr>
                                    <td>設計パターン（MVC、Observer）</td>
                                    <td>「見た目」「データ」「制御」を分離する考え方（MVC）などを押さえる</td>
                                </tr>
                                <tr>
                                    <td>バージョン管理（Git）</td>
                                    <td>clone / add・remove / commit / push・pull / branch / merge / diff の基本操作を実際に手を動かして覚える</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>6.2 APIの理解と使用（20%・最重要領域の1つ）</h3>
                        <p>シスコ製品に限らず、現代のIT開発で必須のREST API知識が問われます。</p>

                        <Diagram id="diag-s6-2" label="REST API通信フローを示すシーケンス図" />

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">学習項目</th>
                                    <th scope="col">初心者向けポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>RESTリクエストの作成</td>
                                    <td>API仕様書を見てGET/POST/PUT/DELETEを組み立てられるようにする</td>
                                </tr>
                                <tr>
                                    <td>Webhook</td>
                                    <td>「イベントが起きたらAPI側から通知が来る仕組み」を理解する</td>
                                </tr>
                                <tr>
                                    <td>HTTPレスポンスコード</td>
                                    <td>200系（成功）、400系（クライアント側エラー）、500系（サーバー側エラー）の代表例を覚える</td>
                                </tr>
                                <tr>
                                    <td>レスポンスの構成要素</td>
                                    <td>ステータスコード・ヘッダー・ボディの3要素を読み解けるようにする</td>
                                </tr>
                                <tr>
                                    <td>認証方式</td>
                                    <td>Basic認証、カスタムトークン、APIキーの違いを理解する</td>
                                </tr>
                                <tr>
                                    <td>APIスタイル</td>
                                    <td>REST、RPC、同期/非同期の違いを比較できるようにする</td>
                                </tr>
                                <tr>
                                    <td>requestsライブラリ</td>
                                    <td>Pythonの<code>requests</code>モジュールでAPIを呼び出すコードを実際に書いてみる</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>6.3 シスコプラットフォームと開発（15%）</h3>
                        <p>シスコ独自のプラットフォーム群のAPI・SDKに関する知識です。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">プラットフォーム分野</th>
                                    <th scope="col">代表製品・API</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ネットワーク管理</td>
                                    <td>Meraki、Cisco Catalyst Center（旧Cisco DNA Center）、ACI、Cisco Catalyst SD-WAN（旧Cisco SD-WAN）、NSO</td>
                                </tr>
                                <tr>
                                    <td>コンピューティング管理</td>
                                    <td>UCS Manager、Intersight</td>
                                </tr>
                                <tr>
                                    <td>コラボレーション</td>
                                    <td>Webex、Webex デバイス、Cisco Unified Communications Manager（AXL・UDSインターフェイス含む）</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ</td>
                                    <td>XDR、Firepower、Secure Connect（旧Umbrella）、Cisco Secure Endpoint、ISE、Secure Malware Analytics</td>
                                </tr>
                                <tr>
                                    <td>デバイスレベルAPI</td>
                                    <td>IOS XE、NX-OSのダイナミックインターフェイス</td>
                                </tr>
                                <tr>
                                    <td>モデル駆動型プログラマビリティ</td>
                                    <td>YANG、RESTCONF、NETCONF</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="callout">
                            <p>
                                上表の「Cisco Catalyst Center」「Cisco Catalyst SD-WAN」「Secure Connect」は、2025年更新の最新版試験ガイド（英語版）での呼称です。旧称（DNA Center、SD-WAN、Umbrella）を使った教材もまだ多く出回っているため、両方の名前を覚えておくと安心です。
                            </p>
                        </div>
                        <p>
                            初学者は、いきなり全プラットフォームを深掘りするのではなく、<strong>Cisco DevNet Sandbox</strong>（無料の仮想学習環境）でMerakiやWebexなど代表的なAPIを1つずつ実際に叩いてみるのがおすすめです。
                        </p>

                        <h3>6.4 アプリケーションの展開とセキュリティ（15%）</h3>
                        <p>「作ったアプリをどう安全に動かすか」がテーマです。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">学習項目</th>
                                    <th scope="col">初心者向けポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>展開モデル</td>
                                    <td>プライベートクラウド／パブリッククラウド／ハイブリッドクラウド／エッジの違い</td>
                                </tr>
                                <tr>
                                    <td>展開タイプ</td>
                                    <td>仮想マシン／ベアメタル／コンテナの違いと使い分け</td>
                                </tr>
                                <tr>
                                    <td>CI/CDパイプライン</td>
                                    <td>コードのビルド〜テスト〜デプロイを自動化する一連の流れ</td>
                                </tr>
                                <tr>
                                    <td>Dockerの基礎</td>
                                    <td>Dockerfileの読み方、ローカル環境でのDockerイメージ利用</td>
                                </tr>
                                <tr>
                                    <td>アプリケーションセキュリティ</td>
                                    <td>機密情報の保護、保管時・転送時の暗号化</td>
                                </tr>
                                <tr>
                                    <td>ネットワーク要素の役割</td>
                                    <td>ファイアウォール、DNS、ロードバランサ、リバースプロキシ</td>
                                </tr>
                                <tr>
                                    <td>OWASP脅威</td>
                                    <td>XSS、SQLインジェクション、CSRFなど代表的な脆弱性の概要</td>
                                </tr>
                                <tr>
                                    <td>Bashコマンド</td>
                                    <td>ファイル操作、ディレクトリ移動、環境変数の基本</td>
                                </tr>
                                <tr>
                                    <td>DevOpsの原則</td>
                                    <td>開発と運用を一体で継続的に改善していく考え方</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>6.5 インフラストラクチャと自動化（20%・最重要領域の1つ）</h3>
                        <p>ネットワークインフラを「コードで」管理・自動化する領域です。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">学習項目</th>
                                    <th scope="col">初心者向けポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>モデル駆動型プログラマビリティ</td>
                                    <td>手作業のCLI設定ではなく、構造化データでネットワークを制御する考え方</td>
                                </tr>
                                <tr>
                                    <td>コントローラレベル vs デバイスレベル管理</td>
                                    <td>集中管理（コントローラ経由）と個別管理（デバイス直接）の違い</td>
                                </tr>
                                <tr>
                                    <td>ネットワークシミュレーション/テストツール</td>
                                    <td>Cisco Modeling Labs、pyATSなどの役割</td>
                                </tr>
                                <tr>
                                    <td>Infrastructure as Code（IaC）</td>
                                    <td>インフラ構成をコードとして管理し、バージョン管理できるようにする考え方</td>
                                </tr>
                                <tr>
                                    <td>自動化ツール</td>
                                    <td>Ansible、Terraform、Cisco NSOそれぞれの得意分野</td>
                                </tr>
                                <tr>
                                    <td>Ansibleプレイブック</td>
                                    <td>パッケージ管理、ユーザー管理、サービスの起動/停止などのワークフローを読み解く</td>
                                </tr>
                                <tr>
                                    <td>RESTCONF/NETCONF</td>
                                    <td>クエリ結果の読み方、基本的なYANGモデルの解釈</td>
                                </tr>
                                <tr>
                                    <td>unified diff</td>
                                    <td>差分表示（diff）の読み方</td>
                                </tr>
                                <tr>
                                    <td>コードレビュー</td>
                                    <td>レビューを行う目的とメリット</td>
                                </tr>
                                <tr>
                                    <td>シーケンス図</td>
                                    <td>API呼び出しを含むシーケンス図を読み解けるようにする</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>6.6 ネットワーク基礎（15%）</h3>
                        <p>ネットワークエンジニア出身でない人（ソフトウェア開発者など）にとって重要な基礎領域です。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">学習項目</th>
                                    <th scope="col">初心者向けポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>MACアドレス、VLAN</td>
                                    <td>それぞれの目的と用途</td>
                                </tr>
                                <tr>
                                    <td>IPアドレス、ルート、サブネットマスク、ゲートウェイ</td>
                                    <td>基本的なIPアドレッシングの考え方</td>
                                </tr>
                                <tr>
                                    <td>ネットワーク機器</td>
                                    <td>スイッチ、ルータ、ファイアウォール、ロードバランサの役割</td>
                                </tr>
                                <tr>
                                    <td>トポロジ図の読解</td>
                                    <td>基本的なネットワーク構成図を読めるようにする</td>
                                </tr>
                                <tr>
                                    <td>管理・データ・制御プレーン</td>
                                    <td>ネットワーク機器内部の3つの機能面の違い</td>
                                </tr>
                                <tr>
                                    <td>IPサービス</td>
                                    <td>DHCP、DNS、NAT、SNMP、NTPの機能</td>
                                </tr>
                                <tr>
                                    <td>ポート番号</td>
                                    <td>SSH、Telnet、HTTP、HTTPS、NETCONFなど代表的なポート番号</td>
                                </tr>
                                <tr>
                                    <td>接続トラブルの原因特定</td>
                                    <td>NATの問題、ポートブロック、プロキシ、VPNなどが接続に与える影響</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="section" id="s7">
                        <h2><span className="num">7.</span>受験の前提条件・推奨スキル</h2>
                        <p>
                            シスコ公式には<strong>正式な前提条件はありません</strong>。ただし、以下の経験があることが推奨されています。
                        </p>
                        <ul>
                            <li>Pythonプログラミングを含む、1年以上のソフトウェア開発経験</li>
                        </ul>
                        <p>
                            前提条件がないとはいえ、6つのドメインを見て分かる通り「ネットワークの基礎知識」と「プログラミング（特にPython）」の両方が求められるため、まったくの未経験からいきなり合格を狙うにはハードルがあります。
                        </p>
                    </div>

                    <div className="section" id="s8">
                        <h2><span className="num">8.</span>出題形式</h2>
                        <p>Cisco認定試験全般に共通する出題形式です（公式のCisco Certification Exam Tutorialより）。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">出題形式</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>選択問題（単一回答）</td>
                                    <td>選択肢の中から正解を1つ選ぶ</td>
                                </tr>
                                <tr>
                                    <td>選択問題（複数回答）</td>
                                    <td>選択肢の中から正解を複数選ぶ</td>
                                </tr>
                                <tr>
                                    <td>ドラッグ&amp;ドロップ</td>
                                    <td>項目をドラッグして正しい位置・順序に配置する</td>
                                </tr>
                                <tr>
                                    <td>穴埋め（Fill in the blank）</td>
                                    <td>空欄にキーワードなどを入力する</td>
                                </tr>
                                <tr>
                                    <td>シミュレーション</td>
                                    <td>実際の操作画面を模した環境でタスクを実行する</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            一度回答した問題には後から戻れない試験方式なので、次の問題に進む前に見直しをしっかり行うことが推奨されます。
                        </p>
                    </div>

                    <div className="section" id="s9">
                        <h2><span className="num">9.</span>学習ロードマップ（ステップバイステップ）</h2>
                        <p>初学者が実際にどう進めればよいか、大まかな流れを示します。</p>

                        <Diagram id="diag-s9" label="学習ロードマップのステップを示すフローチャート" />

                        <h3>各ステップの補足</h3>
                        <ol>
                            <li>
                                <strong>前提知識の確認</strong>:
                                ネットワークの基本用語（IP、VLAN、ルーティングなど）とPythonの基本文法（変数、関数、辞書/リスト操作）をおさらいする。
                            </li>
                            <li>
                                <strong>公式教材で学習</strong>: 「Developing Applications and Automating Workflows using Cisco Core Platforms」コース、またはCisco U.上の学習コンテンツを利用する。
                            </li>
                            <li>
                                <strong>ハンズオン演習</strong>: Cisco DevNet Sandboxで実際にMeraki APIやWebex APIを叩いてみる。座学だけでなく手を動かすことが定着の鍵。
                            </li>
                            <li>
                                <strong>模擬試験</strong>: 公式または信頼できる模試で自分の弱点ドメインを把握する。
                            </li>
                            <li>
                                <strong>受験予約</strong>: Pearson VUEのアカウントを作成し、テストセンターまたはオンライン監督形式を選んで予約する。
                            </li>
                            <li>
                                <strong>受験</strong>: 120分間で挑む。不合格の場合は5日間の待機期間後に再受験可能（受験料は都度必要）。
                            </li>
                        </ol>
                    </div>

                    <div className="section" id="s10">
                        <h2><span className="num">10.</span>再認定（recertification）</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>有効期間</td>
                                    <td>3年間</td>
                                </tr>
                                <tr>
                                    <td>更新方法の例</td>
                                    <td>
                                        同じ試験（200-901）に再合格する／より上位の認定を取得する／継続教育（CE）クレジットを積む
                                    </td>
                                </tr>
                                <tr>
                                    <td>詳細</td>
                                    <td>シスコ公式の再認定ポリシーページを参照</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="section" id="s11">
                        <h2><span className="num">11.</span>まとめ</h2>
                        <ul>
                            <li>
                                CCNA Automation（旧DevNet Associate、試験コード200-901）は、シスコプラットフォーム上でのソフトウェア開発・自動化スキルを証明するエントリー〜アソシエイトレベルの認定。
                            </li>
                            <li>
                                2026年2月3日付けでDevNet Associateから名称が変わったが、<strong>試験の中身自体はほぼ変わっていない</strong>。
                            </li>
                            <li>
                                出題範囲は6ドメイン。中でも「APIの理解と使用」「インフラストラクチャと自動化」がそれぞれ20%を占める最重要領域。
                            </li>
                            <li>
                                前提条件は公式には無いが、Pythonを含む1年以上のソフトウェア開発経験が推奨される。
                            </li>
                            <li>
                                ネットワークの基礎とプログラミングの両方をバランスよく学ぶ必要がある点が、この試験の最大の特徴。
                            </li>
                        </ul>
                    </div>

                    <div className="section" id="s12">
                        <h2><span className="num">12.</span>参考文献・ソース一覧</h2>
                        <p>
                            本ガイドの内容は、以下のシスコ公式情報源、およびシスコ公式ブログを一次情報源として作成しています。
                        </p>
                        <div className="footer">
                            <ul>
                                <li>
                                    Cisco Certified DevNet Associate 認定とトレーニングプログラム（日本語版・ユーザー提供URL）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/devnet/cisco-certified-devnet-associate.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/devnet/cisco-certified-devnet-associate.html
                                    </a>
                                </li>
                                <li>
                                    DevNet Associate (DEVASC 200-901) 試験ページ（日本語版）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/devasc-200-901.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/devasc-200-901.html
                                    </a>
                                </li>
                                <li>
                                    DevNet Associate Exam v1.1（200-901）出題内容PDF（日本語版）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-901-DEVASC.pdf"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/exam-topics/200-901-DEVASC.pdf
                                    </a>
                                </li>
                                <li>
                                    DevNet 認定 - トレーニング &amp; 認定（認定トラック全体、日本語版）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/devnet.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/devnet.html
                                    </a>
                                </li>
                                <li>
                                    Cisco Blogs: Learn with Cisco: Evolving for the Age of AI, Automation, and Cloud（名称変更の公式アナウンス）
                                    <br />
                                    <a
                                        href="https://blogs.cisco.com/learning/par-merat-announces-learn-with-cisco"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://blogs.cisco.com/learning/par-merat-announces-learn-with-cisco
                                    </a>
                                </li>
                                <li>
                                    Cisco Blogs: CCNP Automation: A Renamed Certification, Reimagined（名称変更の詳細解説）
                                    <br />
                                    <a
                                        href="https://blogs.cisco.com/learning/views-from-an-insider-on-the-ccnp-automation-track-autocor-edition"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://blogs.cisco.com/learning/views-from-an-insider-on-the-ccnp-automation-track-autocor-edition
                                    </a>
                                </li>
                                <li>
                                    Cisco Blogs: Introducing CCNA Automation Prep（CCNA Automationへの改称に関する補足）
                                    <br />
                                    <a
                                        href="https://blogs.cisco.com/learning/introducing-ccna-automation-prep-a-live-interactive-series-for-the-automation-community"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://blogs.cisco.com/learning/introducing-ccna-automation-prep-a-live-interactive-series-for-the-automation-community
                                    </a>
                                </li>
                                <li>
                                    CCNA Automation Certification（英語公式ページ）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html
                                    </a>
                                </li>
                                <li>
                                    CCNA Automation Exam and Training（英語公式ページ、試験コード確認用）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html
                                    </a>
                                </li>
                                <li>
                                    200-901 CCNAAUTO 試験概要（英語公式ページ）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccnaauto.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccnaauto.html
                                    </a>
                                </li>
                                <li>
                                    Automating Networks Using Cisco Platforms v1.1（200-901）出題内容PDF（英語版・最新）
                                    <br />
                                    <a
                                        href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf
                                    </a>
                                </li>
                                <li>
                                    再認定ポリシー（日本語版）
                                    <br />
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html
                                    </a>
                                </li>
                                <li>
                                    200-901 DEVASC Associate exam voucher（受験料の参考情報）
                                    <br />
                                    <a
                                        href="https://govstore.pearsonvue.com/p/vchstr-200-901"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://govstore.pearsonvue.com/p/vchstr-200-901
                                    </a>
                                </li>
                            </ul>
                            <p>
                                注: シスコの認定・試験情報は予告なく変更されることがあります。受験前には必ず上記の公式ページで最新情報をご確認ください。
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
