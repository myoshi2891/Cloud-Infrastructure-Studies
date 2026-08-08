'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-wrapper">
            <div className="mermaid-wrap">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
            </div>
        </div>
    );
});

export function CcnaCiscoPlatformsDevelopmentGuide() {
    return (
        <div className="ccna-platforms-dev-page">
            <div className="layout">
                <NavBar />

                <main className="content">
                    <header className="hero">
                        <span className="kicker">CCNA Automation 200-901 CCNAAUTO v1.1</span>
                        <h1>Cisco Platforms and Development<br />徹底解説ガイド</h1>
                        <p className="lead">
                            CCNA Automation認定試験（旧称：Cisco Certified DevNet Associate）の6ドメインのうち、「3.0 Cisco Platforms and Development」（配点15%）を初学者向けにステップバイステップで解説します。
                            図解はすべてMermaid、表はすべてMarkdown相当の構造化テーブルで構成し、ASCIIアートは一切使用していません。
                        </p>
                        <div className="meta-bar">
                            <div className="meta-chip"><b>試験コード</b>200-901 CCNAAUTO v1.1</div>
                            <div className="meta-chip"><b>試験時間</b>120分</div>
                            <div className="meta-chip"><b>受験言語</b>英語 / 日本語</div>
                            <div className="meta-chip"><b>受験料</b>US$300（Cisco Learning Credits可）</div>
                        </div>
                        <div className="notice-box">
                            <strong>本ガイドについて：</strong> 2026年2月3日より、本試験は旧称「DevNet Associate（DEVASC）」から「CCNA Automation」へ名称変更されましたが、試験内容そのものは変更されていません。本ガイドは公式ブループリントに準拠した最新の製品名称（Secure Endpoint、XDRなど）を使用しつつ、旧名称（AMP、ThreatGridなど）にも適宜言及します。
                        </div>
                    </header>

                    {/* ============ はじめに ============ */}
                    <section className="section" id="intro">
                        <h2>はじめに</h2>
                        <div className="prose">
                            <p>
                                CCNA Automation認定は、Ciscoが提供する自動化・プログラマビリティ分野の入門レベル認定です。
                                ネットワークエンジニアがソフトウェア開発のスキルを身につけ、逆にソフトウェア開発者がネットワークの基礎を理解するための「橋渡し」となる資格として位置づけられています。
                            </p>
                            <p>
                                このガイドで扱う<strong>「3.0 Cisco Platforms and Development」</strong>ドメインは、平たく言えば「Ciscoの各種製品（ネットワーク管理・コンピュート・コラボレーション・セキュリティ）を、それぞれのAPIを使ってプログラムから操作する方法を理解しているか」を問う分野です。
                                個々の製品の細かい操作方法を丸暗記するのではなく、<strong>「どの製品が何のためにあり、どんな種類のAPIを持っているか」を体系的に把握すること</strong>が合格への近道になります。
                            </p>
                        </div>
                    </section>

                    {/* ============ 試験全体像 ============ */}
                    <section className="section" id="overview">
                        <h2>CCNA Automation試験の全体像とこのドメインの位置づけ</h2>
                        <div className="prose">
                            <p>
                                CCNA Automation認定を取得するには、単一の試験「<strong>Automating Networks Using Cisco Platforms（200-901 CCNAAUTO）v1.1</strong>」に合格する必要があります。
                                試験時間は120分、受験言語は英語と日本語に対応しています。試験は以下の6つのドメインで構成されており、それぞれに配点比率が定められています。
                            </p>
                        </div>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ドメイン番号</th>
                                        <th scope="col">ドメイン名（英語）</th>
                                        <th scope="col">配点比率</th>
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
                                    <tr className="highlight">
                                        <td><strong>3.0</strong></td>
                                        <td><strong>Cisco Platforms and Development</strong></td>
                                        <td><strong>15%</strong></td>
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
                                    <tr>
                                        <td>6.0</td>
                                        <td>Network Fundamentals</td>
                                        <td>15%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-overview" label="CCNA Automation 200-901 試験のドメイン構成と配点" />

                        <div className="prose">
                            <p>
                                「2.0 Understanding and Using APIs」がAPIの<strong>一般的な仕組み</strong>（REST、HTTPメソッド、認証方式など）を扱うのに対し、
                                「3.0 Cisco Platforms and Development」は、その知識を<strong>Cisco固有の製品</strong>に適用する力を問う点が違いです。両ドメインはセットで学習すると理解が深まります。
                            </p>
                        </div>

                        <div className="callout">
                            <span className="callout-label">💡 ポイント</span>
                            Ciscoは認定試験のブループリントを定期的に見直しており、DevNet Associate（v1.0）からCCNA Automation（v1.1）への移行時にも、
                            セキュリティ製品の名称更新（AMP→Secure Endpoint、ThreatGrid→Secure Malware Analytics、XDRの追加）など細かな改訂が行われています。
                            学習の際は必ず最新の公式ブループリントを確認してください。
                        </div>
                    </section>

                    {/* ============ ドメイン全体マップ ============ */}
                    <section className="section" id="map">
                        <h2>Cisco Platforms and Developmentドメインの全体マップ</h2>
                        <div className="prose">
                            <p>
                                このドメインは、公式ブループリント上で以下の9つの学習項目（3.1〜3.9）に細分化されています。
                            </p>
                        </div>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">番号</th>
                                        <th scope="col">学習項目（要約）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3.1</td>
                                        <td>Cisco SDKのドキュメントを基にPythonスクリプトを構築する</td>
                                    </tr>
                                    <tr>
                                        <td>3.2</td>
                                        <td>ネットワーク管理プラットフォームとAPIの機能を説明する（Meraki, Cisco DNA Center, ACI, Cisco SD-WAN, NSO）</td>
                                    </tr>
                                    <tr>
                                        <td>3.3</td>
                                        <td>コンピュート管理プラットフォームとAPIの機能を説明する（UCS Manager, UCS Director, Intersight）</td>
                                    </tr>
                                    <tr>
                                        <td>3.4</td>
                                        <td>コラボレーションプラットフォームとAPIの機能を説明する（Webex, Webex Devices, CUCM（AXL/UDS）, Finesse）</td>
                                    </tr>
                                    <tr>
                                        <td>3.5</td>
                                        <td>セキュリティプラットフォームとAPIの機能を説明する（XDR, Firepower, Umbrella, Secure Endpoint, ISE, Secure Malware Analytics）</td>
                                    </tr>
                                    <tr>
                                        <td>3.6</td>
                                        <td>IOS XEおよびNX-OSのデバイスレベルAPIと動的インターフェースを説明する</td>
                                    </tr>
                                    <tr>
                                        <td>3.7</td>
                                        <td>シナリオに応じて適切なDevNetリソースを特定する（Sandbox, Code Exchange, サポート, フォーラム, Learning Labs, APIドキュメント）</td>
                                    </tr>
                                    <tr>
                                        <td>3.8</td>
                                        <td>モデル駆動型プログラマビリティの概念を適用する（YANG, RESTCONF, NETCONF）</td>
                                    </tr>
                                    <tr>
                                        <td>3.9</td>
                                        <td>要件とAPIリファレンスドキュメントに基づき、特定の操作を行うコードを構築する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-map" label="Cisco Platforms and Development ドメインの全体マップ" />

                        <div className="prose">
                            <p>
                                前半（3.1〜3.6）が「各プラットフォームを<strong>知る</strong>」フェーズ、後半（3.7〜3.9）が「学んだ知識を<strong>使う</strong>」フェーズだとイメージすると理解しやすくなります。
                            </p>
                        </div>
                    </section>

                    {/* ============ 3.1 ============ */}
                    <section className="section" id="s31">
                        <h2><span className="num">3.1</span> Cisco SDKを使ったPythonスクリプトの構築</h2>

                        <h3>SDKとは何か、なぜ使うのか</h3>
                        <div className="prose">
                            <p>
                                SDK（Software Development Kit）とは、APIを直接叩く（HTTPリクエストを自分で組み立てる）代わりに、
                                あらかじめ用意された関数やクラスを呼び出すだけでAPI操作ができるようにしたライブラリです。
                                生のREST APIを<code>requests</code>ライブラリで叩く場合と比較すると、次のようなメリットがあります。
                            </p>
                            <ul>
                                <li>認証ヘッダーの付与やURLの組み立てを自動化してくれる</li>
                                <li>レスポンスのJSONを、扱いやすいPythonオブジェクトとして受け取れる</li>
                                <li>エラー発生時に、わかりやすい例外（Exception）として通知してくれる</li>
                            </ul>
                        </div>

                        <h3>基本的なワークフロー</h3>
                        <Diagram id="diag-workflow" label="Cisco SDKを使った基本的なPythonスクリプト開発フロー" />

                        <h3>コード例：Meraki SDKで組織一覧を取得する</h3>
                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">import</span> meraki</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># APIキーはMerakiダッシュボードの</span></div>
                            <div className="code-line"><span className="code-comment"># Organization &gt; Configure &gt; API &amp; Webhooks から発行する</span></div>
                            <div className="code-line">API_KEY = <span className="code-string">&quot;YOUR_API_KEY&quot;</span></div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># SDKクライアントを初期化する</span></div>
                            <div className="code-line">dashboard = meraki.DashboardAPI(API_KEY, suppress_logging=<span className="code-keyword">True</span>)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 所属する組織（Organization）の一覧を取得する</span></div>
                            <div className="code-line">organizations = dashboard.organizations.getOrganizations()</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-keyword">for</span> org <span className="code-keyword">in</span> organizations:</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(f<span className="code-string">&quot;組織名: &#123;org[&#39;name&#39;]&#125; / ID: &#123;org[&#39;id&#39;]&#125;&quot;</span>)</div>
                        </div>

                        <div className="prose">
                            <p>
                                このように、Meraki公式のPython SDK（<code>meraki</code>パッケージ）を使うと、認証ヘッダーの組み立てやページネーション処理をSDKが肩代わりしてくれるため、
                                開発者は「何を取得したいか」に集中できます。試験では、SDKのドキュメント（メソッド名・引数・戻り値）を読んで、空欄になったコードを補完する形式の設問が出題される傾向があります。
                            </p>
                        </div>

                        <div className="callout">
                            <span className="callout-label">💡 試験対策</span>
                            SDKの内部実装を暗記する必要はありません。「このSDKはどの製品向けか」「認証にはどんな情報が必要か」「戻り値はどんな形（リスト／辞書）か」を、公式ドキュメントを見ながら読み解く練習をしておきましょう。
                        </div>
                    </section>

                    {/* ============ 3.2-3.5 ============ */}
                    <section className="section" id="platforms">
                        <h2><span className="num">3.2〜3.5</span> Cisco製品プラットフォームとAPIの全体像</h2>
                        <div className="prose">
                            <p>
                                3.2から3.5までは、いずれも「<strong>特定のCisco製品群が、どんなAPIを持ち、何ができるかを説明する</strong>」という共通のパターンを持つ学習項目です。
                                まずは全体像を俯瞰してから、各カテゴリーの詳細を見ていきましょう。
                            </p>
                        </div>

                        <Diagram id="diag-platforms" label="Cisco製品プラットフォーム4つのカテゴリーの分類図" />

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ドメイン</th>
                                        <th scope="col">代表的なCisco製品</th>
                                        <th scope="col">主なAPIの形式</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3.2 ネットワーク管理</td>
                                        <td>Meraki, Cisco DNA Center, ACI, Cisco SD-WAN, NSO</td>
                                        <td>REST（Meraki Dashboard API、DNA Center Intent APIなど）</td>
                                    </tr>
                                    <tr>
                                        <td>3.3 コンピュート管理</td>
                                        <td>UCS Manager, UCS Director, Intersight</td>
                                        <td>XML API（UCS Manager）、REST（UCS Director / Intersight）</td>
                                    </tr>
                                    <tr>
                                        <td>3.4 コラボレーション</td>
                                        <td>Webex, Webex Devices, CUCM, Finesse</td>
                                        <td>REST（Webex API）、SOAP（CUCM AXL）、REST（CUCM UDS）</td>
                                    </tr>
                                    <tr>
                                        <td>3.5 セキュリティ</td>
                                        <td>XDR, Firepower, Umbrella, Secure Endpoint, ISE, Secure Malware Analytics</td>
                                        <td>REST（各製品ともにREST APIを提供）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>3.2 ネットワーク管理プラットフォームとAPI</h3>
                        <div className="prose">
                            <p>
                                このカテゴリーは、複数のネットワークデバイスを一元的に管理する「コントローラー」製品群です。
                                試験対策として、まず押さえておきたいのはそれぞれの製品が<strong>どの領域を管理するか</strong>という役割分担です。
                            </p>
                            <ul>
                                <li><strong>Meraki</strong>：クラウド管理型のスイッチ・アクセスポイント・セキュリティアプライアンスを、Meraki Dashboard（クラウドUI）とそのREST APIから一元管理する。組織（Organization）&gt; ネットワーク（Network）&gt; デバイス（Device）という階層構造を持つ点が特徴。</li>
                                <li><strong>Cisco DNA Center（現Catalyst Center）</strong>：エンタープライズキャンパスネットワークのインテントベース管理コントローラー。「Intent API」と呼ばれるノースバウンドREST APIを通じて、ビジネス意図（例：新しいSSIDを展開したい）を宣言的に指定できる。</li>
                                <li><strong>ACI（Application Centric Infrastructure）</strong>：データセンターネットワークをポリシーベースで自動化するSDN基盤。APIC（Application Policy Infrastructure Controller）が中心的なコントローラーとなる。</li>
                                <li><strong>Cisco SD-WAN</strong>：拠点間WANをソフトウェア定義で管理する製品群。vManageコントローラーがAPIの窓口となる。</li>
                                <li><strong>NSO（Network Services Orchestrator）</strong>：マルチベンダー環境でのサービス単位のオーケストレーションを担う製品。YANGモデルを核としたサービスパッケージという概念を持つ。</li>
                            </ul>
                        </div>

                        <Diagram id="diag-north-south" label="Northbound API と Southbound プロトコルの関係" />

                        <h4>コード例：Cisco DNA Center（Catalyst Center）のIntent APIでデバイス一覧を取得する</h4>
                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">import</span> requests</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line">DNAC = <span className="code-string">&quot;https://sandboxdnac.cisco.com&quot;</span></div>
                            <div className="code-line">AUTH = (<span className="code-string">&quot;devnetuser&quot;</span>, <span className="code-string">&quot;Cisco123!&quot;</span>)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 1. 認証トークンを取得する（Intent API）</span></div>
                            <div className="code-line">resp = requests.post(f<span className="code-string">&quot;&#123;DNAC&#125;/dna/system/api/v1/auth/token&quot;</span>, auth=AUTH)</div>
                            <div className="code-line">token = resp.json()[<span className="code-string">&quot;Token&quot;</span>]</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 2. 取得したトークンをヘッダーに設定してデバイス一覧を取得する</span></div>
                            <div className="code-line">headers = &#123;<span className="code-string">&quot;X-Auth-Token&quot;</span>: token&#125;</div>
                            <div className="code-line">devices = requests.get(</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;f<span className="code-string">&quot;&#123;DNAC&#125;/dna/intent/api/v1/network-device&quot;</span>,</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;headers=headers,</div>
                            <div className="code-line">)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-keyword">for</span> device <span className="code-keyword">in</span> devices.json()[<span className="code-string">&quot;response&quot;</span>]:</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(device[<span className="code-string">&quot;hostname&quot;</span>], device[<span className="code-string">&quot;managementIpAddress&quot;</span>])</div>
                        </div>

                        <h3>3.3 コンピュート管理プラットフォームとAPI</h3>
                        <div className="prose">
                            <p>サーバー（コンピュート）リソースを管理するための製品群です。</p>
                            <ul>
                                <li><strong>UCS Manager</strong>：シャーシに組み込まれたブレードサーバー群を管理する組み込み型の管理ソフトウェア。XMLベースのAPIを提供する。</li>
                                <li><strong>UCS Director</strong>：データセンター全体のインフラ（コンピュート・ストレージ・ネットワーク）を横断的にオーケストレーションするプラットフォーム。REST APIを提供する。</li>
                                <li><strong>Intersight</strong>：クラウドベースのインフラ管理プラットフォーム。API認証にAPIキー＋秘密鍵によるHTTPリクエスト署名（signature）方式を採用しており、単純なAPIキー方式のMerakiやDNA Centerとは認証方式が異なる点が試験でも問われやすいポイントです。</li>
                            </ul>
                        </div>

                        <h3>3.4 コラボレーションプラットフォームとAPI</h3>
                        <div className="prose">
                            <ul>
                                <li><strong>Webex</strong>：チャット・ビデオ会議・通話などを提供するコラボレーションプラットフォーム。ブループリント上は歴史的経緯から「Webex Teams」と表記されることがありますが、製品としては「Webex」に統合されています。REST APIで、スペース（部屋）・メンバーシップ（参加者）・メッセージなどのリソースを操作します。</li>
                                <li><strong>Webex Devices</strong>：Webex Room KitやDeskシリーズなどの物理デバイスを制御するxAPI（デバイス側のAPI）。</li>
                                <li><strong>CUCM（Cisco Unified Communication Manager）</strong>：企業向けのIP電話交換基盤。<strong>AXL</strong>（SOAPベースの管理系API、ユーザーや電話機の設定操作向け）と、<strong>UDS</strong>（RESTベースのユーザー向けAPI、ディレクトリ検索など）という2種類のインターフェースを持つ点が試験の頻出ポイントです。</li>
                                <li><strong>Finesse</strong>：コンタクトセンター向けのエージェントデスクトップアプリケーションで、REST APIおよびJavaScript向けのAPIを提供する。</li>
                            </ul>
                        </div>

                        <h4>コード例：Webex APIでメッセージを送信する（webexpythonsdk／旧webexteamssdk）</h4>
                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">from</span> webexteamssdk <span className="code-keyword">import</span> WebexTeamsAPI</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 環境変数 WEBEX_TEAMS_ACCESS_TOKEN からアクセストークンを自動読込</span></div>
                            <div className="code-line">api = WebexTeamsAPI()</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 指定したスペース（部屋）にメッセージを送信する</span></div>
                            <div className="code-line">api.messages.create(roomId=<span className="code-string">&quot;ROOM_ID_HERE&quot;</span>, text=<span className="code-string">&quot;自動化スクリプトからの通知です&quot;</span>)</div>
                        </div>

                        <div className="callout">
                            <span className="callout-label">💡 豆知識</span>
                            かつて<code>ciscosparkapi</code>という名前だったこのライブラリは、Webex Teamsへのブランド変更に伴い<code>webexteamssdk</code>に改称され、
                            現在はさらに<code>webexpythonsdk</code>（Python 3.10以降向け）へと移行が進んでいます。 試験のブループリント上の表記（Webex Teams）と、実際の開発現場での最新の呼称（Webex／webexpythonsdk）にはズレがあることを理解しておきましょう。
                        </div>

                        <h3>3.5 セキュリティプラットフォームとAPI</h3>
                        <div className="prose">
                            <p>
                                セキュリティ製品群です。v1.1のブループリントでは、下記のように一部の製品名が更新されています。
                            </p>
                        </div>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">旧名称（DEVASC v1.0）</th>
                                        <th scope="col">現行名称（CCNAAUTO v1.1）</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>－</td>
                                        <td><strong>XDR</strong>（新規追加）</td>
                                        <td>複数のセキュリティ製品からのテレメトリを統合し、脅威検知・対応を自動化するプラットフォーム</td>
                                    </tr>
                                    <tr>
                                        <td>Firepower</td>
                                        <td>Firepower（変更なし）</td>
                                        <td>次世代ファイアウォール（NGFW）。FMC（管理センター）やFDM（デバイスマネージャー）経由でREST APIを提供</td>
                                    </tr>
                                    <tr>
                                        <td>Umbrella</td>
                                        <td>Umbrella（変更なし）</td>
                                        <td>クラウドベースのDNS/Webセキュリティサービス。Investigate APIやEnforcement APIを提供</td>
                                    </tr>
                                    <tr>
                                        <td>AMP</td>
                                        <td><strong>Secure Endpoint</strong></td>
                                        <td>エンドポイント（PCやサーバー）向けのマルウェア対策・EDR製品</td>
                                    </tr>
                                    <tr>
                                        <td>ISE</td>
                                        <td>ISE（変更なし）</td>
                                        <td>Identity Services Engine。ネットワークアクセス制御（NAC）を担う。ERS APIやpxGrid連携が代表的</td>
                                    </tr>
                                    <tr>
                                        <td>ThreatGrid</td>
                                        <td><strong>Secure Malware Analytics</strong></td>
                                        <td>サンドボックス型のマルウェア解析プラットフォーム</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="prose">
                            <p>
                                このカテゴリーは「Describe（説明する）」レベルの知識が中心のため、コードを暗記するよりも、
                                <strong>それぞれの製品が守る対象（ネットワーク境界／エンドポイント／DNS／ID）と役割の違い</strong>を整理しておくことが得点につながります。
                            </p>
                        </div>
                    </section>

                    {/* ============ 3.6 ============ */}
                    <section className="section" id="s36">
                        <h2><span className="num">3.6</span> IOS XE / NX-OSのデバイスレベルAPIと動的インターフェース</h2>
                        <div className="prose">
                            <p>
                                3.2〜3.5がコントローラー経由の管理であったのに対し、3.6では<strong>デバイス単体（IOS XEを搭載したルーター／スイッチ、NX-OSを搭載したデータセンタースイッチ）に直接組み込まれたプログラマビリティ機能</strong>を扱います。
                            </p>
                            <ul>
                                <li><strong>NETCONF / RESTCONF</strong>：デバイス上で直接有効化できる、標準化されたモデル駆動型のプロトコル（詳細は次章で解説）。</li>
                                <li><strong>gRPC / gNMI</strong>：ストリーミングテレメトリなど、より高頻度・低遅延なデータ収集に向く比較的新しいインターフェース。</li>
                                <li><strong>NX-API</strong>：NX-OSデバイス向けのREST風API。CLIコマンドをそのままJSON/XML経由で実行できる点が特徴。</li>
                                <li><strong>Guest Shell / On-box Python</strong>：デバイスのOS内に隔離されたLinuxコンテナ環境（Guest Shell）を用意し、その中でPythonスクリプトを直接実行できる「動的インターフェース」。デバイス自身にちょっとした自動化ロジックを持たせたい場合に使う。</li>
                                <li><strong>EEM（Embedded Event Manager）</strong>：デバイス内で発生したイベント（インターフェースダウンなど）をトリガーに、あらかじめ登録したアクション（Tclスクリプトなど）を自動実行する仕組み。</li>
                            </ul>
                        </div>

                        <h4>コード例：NETCONFでIOS XEデバイスの設定を取得する（ncclientライブラリ）</h4>
                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">from</span> ncclient <span className="code-keyword">import</span> manager</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># DevNet常設Sandbox（IOS XE on CSR）に接続する</span></div>
                            <div className="code-line"><span className="code-keyword">with</span> manager.connect(</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;host=<span className="code-string">&quot;ios-xe-mgmt.cisco.com&quot;</span>,</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;port=10000,</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;username=<span className="code-string">&quot;developer&quot;</span>,</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;password=<span className="code-string">&quot;C1sco12345&quot;</span>,</div>
                            <div className="code-line">) <span className="code-keyword">as</span> m:</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment"># YANGフィルタを使ってinterface設定のみを取得する</span></div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;filter_xml = <span className="code-string">&quot;&quot;&quot;</span></div>
                            <div className="code-line"><span className="code-string">&nbsp;&nbsp;&nbsp;&nbsp;&lt;filter&gt;</span></div>
                            <div className="code-line"><span className="code-string">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;native xmlns=&quot;http://cisco.com/ns/yang/Cisco-IOS-XE-native&quot;&gt;</span></div>
                            <div className="code-line"><span className="code-string">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;interface/&gt;</span></div>
                            <div className="code-line"><span className="code-string">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/native&gt;</span></div>
                            <div className="code-line"><span className="code-string">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/filter&gt;</span></div>
                            <div className="code-line"><span className="code-string">&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;result = m.get_config(source=<span className="code-string">&quot;running&quot;</span>, filter=filter_xml)</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(result)</div>
                        </div>

                        <div className="callout">
                            <span className="callout-label">💡 試験対策</span>
                            「コントローラー経由（3.2〜3.5）」と「デバイス直接（3.6）」の違いを混同しないようにしましょう。同じNETCONF/RESTCONFという技術要素でも、3.6ではデバイス単体への適用、3.8ではその背景にあるモデル駆動の考え方そのものが問われます。
                        </div>
                    </section>

                    {/* ============ 3.7 ============ */}
                    <section className="section" id="s37">
                        <h2><span className="num">3.7</span> シナリオに応じたDevNetリソースの選択</h2>
                        <div className="prose">
                            <p>
                                Cisco DevNetは、開発者向けに複数の学習・検証リソースを無償で提供しています。
                                試験では「このような状況で、あなたはどのリソースを使うべきか」という選択式の設問が出題されます。
                            </p>
                        </div>

                        <Diagram id="diag-devnet" label="利用シーンに応じたDevNetリソースの選び方" />

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">リソース</th>
                                        <th scope="col">主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DevNet Sandbox</td>
                                        <td>実機相当の仮想環境を無料で予約・常設利用し、APIコールやコードの動作確認を行う（Always-On型／Reservation型の2種類がある）</td>
                                    </tr>
                                    <tr>
                                        <td>Code Exchange</td>
                                        <td>Ciscoおよびコミュニティが公開するサンプルコード・SDK・Ansible/Terraformコンテンツを検索・参照する</td>
                                    </tr>
                                    <tr>
                                        <td>API Documentation</td>
                                        <td>各プラットフォームのエンドポイント仕様・パラメータ・認証方式を確認する一次情報源</td>
                                    </tr>
                                    <tr>
                                        <td>Support / Community Forums</td>
                                        <td>技術的な質問や不具合の相談、他の開発者との情報交換を行う場</td>
                                    </tr>
                                    <tr>
                                        <td>Learning Labs</td>
                                        <td>ステップバイステップで体系的に学べる学習コンテンツ（試験対策にも活用しやすい）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <span className="callout-label">💡 豆知識</span>
                            DevNet SandboxにはAlways-On（予約不要・常時稼働・共有環境）とReservation（事前予約制・自分専用の隔離環境）の2種類があります。管理者権限が必要な検証を行いたい場合はReservation型を選ぶ必要がある、という違いも押さえておきましょう。
                        </div>
                    </section>

                    {/* ============ 3.8 ============ */}
                    <section className="section" id="s38">
                        <h2><span className="num">3.8</span> モデル駆動型プログラマビリティ（YANG / NETCONF / RESTCONF）</h2>

                        <h3>なぜ「モデル駆動」なのか</h3>
                        <div className="prose">
                            <p>
                                従来、ネットワーク機器の設定はCLI（コマンドラインインターフェース）を通じて行われてきました。しかしCLIの出力形式はベンダーやOSバージョンによってまちまちで、プログラムから解析するのは非常に手間がかかります。
                                そこで登場したのが、<strong>設定項目の構造とデータ型をあらかじめ「モデル」として定義しておき、そのモデルに沿ってプログラムから安全に設定を読み書きする</strong>という考え方です。この中核を担うのが<strong>YANG</strong>というデータモデリング言語です。
                            </p>
                        </div>

                        <Diagram id="diag-yang" label="YANGモデルとNETCONF/RESTCONFプロトコルの関係" />

                        <h3>NETCONFとRESTCONFの比較</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">NETCONF</th>
                                        <th scope="col">RESTCONF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>トランスポート</td>
                                        <td>SSH（既定ポート830）</td>
                                        <td>HTTPS（既定ポート443）</td>
                                    </tr>
                                    <tr>
                                        <td>データ形式</td>
                                        <td>XML</td>
                                        <td>JSONまたはXML</td>
                                    </tr>
                                    <tr>
                                        <td>操作モデル</td>
                                        <td>RPCベース（get-config、edit-configなど）</td>
                                        <td>HTTP動詞ベース（GET/POST/PUT/PATCH/DELETE）</td>
                                    </tr>
                                    <tr>
                                        <td>データストアの扱い</td>
                                        <td>running／candidate／startupを明確に区別できる</td>
                                        <td>基本的にrunning相当のデータストアのみを対象とする</td>
                                    </tr>
                                    <tr>
                                        <td>ベースとなるモデル</td>
                                        <td>YANG</td>
                                        <td>YANG</td>
                                    </tr>
                                    <tr>
                                        <td>向いている用途</td>
                                        <td>トランザクション性を要する一括設定変更</td>
                                        <td>REST APIに慣れた開発者による単純なCRUD操作</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4>コード例：RESTCONFでIOS XEデバイスのインターフェース一覧を取得する</h4>
                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">import</span> requests</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># DevNet常設Sandbox（IOS XE on CSR）のRESTCONFエンドポイント</span></div>
                            <div className="code-line">url = <span className="code-string">&quot;https://ios-xe-mgmt.cisco.com:9443/restconf/data/ietf-interfaces:interfaces&quot;</span></div>
                            <div className="code-line">headers = &#123;<span className="code-string">&quot;Accept&quot;</span>: <span className="code-string">&quot;application/yang-data+json&quot;</span>&#125;</div>
                            <div className="code-line">auth = (<span className="code-string">&quot;developer&quot;</span>, <span className="code-string">&quot;C1sco12345&quot;</span>)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line">resp = requests.get(url, headers=headers, auth=auth)</div>
                            <div className="code-line"><span className="code-keyword">print</span>(resp.json())</div>
                        </div>

                        <div className="callout">
                            <span className="callout-label">💡 試験対策</span>
                            NETCONF・RESTCONFの「既定ポート」と「DevNet Sandboxで実際に使われるポート」は異なる場合があります（例：常設Sandboxでは踏み台の都合上、NETCONFが10000番、RESTCONFが9443番になっていることがある）。
                            試験では一般的な既定値（NETCONF=830、RESTCONF=443）で問われることが多いため、まずは標準ポートを正確に覚え、その上で実機演習時の差異は「環境固有の設定」として区別して理解しましょう。
                        </div>
                    </section>

                    {/* ============ 3.9 ============ */}
                    <section className="section" id="s39">
                        <h2><span className="num">3.9</span> 実践：APIドキュメントを基にしたコード構築</h2>
                        <div className="prose">
                            <p>
                                3.9は、これまで学んだ知識を統合し、「与えられたAPIリファレンスドキュメントを読んで、具体的な操作を行うコードを完成させる」実践的な項目です。
                                公式に例示されている代表的なシナリオは次の2つです。
                            </p>
                            <ul>
                                <li><strong>3.9.a</strong>：Meraki、Cisco DNA Center、ACI、Cisco SD-WAN、NSOのいずれかを使って、ネットワークデバイスの一覧を取得する</li>
                                <li><strong>3.9.b</strong>：Webex（Webex Teams）でスペース・参加者・メッセージを管理する</li>
                            </ul>
                        </div>

                        <h3>3.9.a：Meraki APIでネットワークデバイス一覧を取得する</h3>
                        <div className="prose">
                            <p>
                                Merakiの管理構造は「組織（Organization）→ ネットワーク（Network）→ デバイス（Device）」という階層になっており、
                                デバイス一覧を得るには、まず組織を取得し、その中のネットワークをたどってデバイスを収集するという流れになります。
                            </p>
                        </div>

                        <Diagram id="diag-seq-meraki" label="Meraki API を使用したネットワークデバイス一覧取得シーケンス" />

                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">import</span> meraki</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line">dashboard = meraki.DashboardAPI(<span className="code-string">&quot;YOUR_API_KEY&quot;</span>, suppress_logging=<span className="code-keyword">True</span>)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 1. 組織一覧を取得する</span></div>
                            <div className="code-line">orgs = dashboard.organizations.getOrganizations()</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 2. 各組織のネットワークをたどり、デバイスを収集する</span></div>
                            <div className="code-line"><span className="code-keyword">for</span> org <span className="code-keyword">in</span> orgs:</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;networks = dashboard.organizations.getOrganizationNetworks(org[<span className="code-string">&quot;id&quot;</span>])</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> net <span className="code-keyword">in</span> networks:</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;devices = dashboard.networks.getNetworkDevices(net[<span className="code-string">&quot;id&quot;</span>])</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> device <span className="code-keyword">in</span> devices:</div>
                            <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(f<span className="code-string">&quot;&#123;org[&#39;name&#39;]&#125; / &#123;net[&#39;name&#39;]&#125; / &#123;device.get(&#39;name&#39;, device[&#39;serial&#39;])&#125;&quot;</span>)</div>
                        </div>

                        <h3>3.9.b：Webex APIでスペース・参加者・メッセージを管理する</h3>

                        <Diagram id="diag-seq-webex" label="Webex API を使用したスペース作成・メンバー追加・メッセージ送信シーケンス" />

                        <div className="code-block">
                            <div className="code-line"><span className="code-keyword">from</span> webexteamssdk <span className="code-keyword">import</span> WebexTeamsAPI</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line">api = WebexTeamsAPI()</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 1. 新しいスペース（部屋）を作成する</span></div>
                            <div className="code-line">room = api.rooms.create(title=<span className="code-string">&quot;自動化通知スペース&quot;</span>)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 2. 参加者（メンバー）を追加する</span></div>
                            <div className="code-line">api.memberships.create(room.id, personEmail=<span className="code-string">&quot;teammate@example.com&quot;</span>)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-comment"># 3. メッセージを送信する</span></div>
                            <div className="code-line">api.messages.create(room.id, text=<span className="code-string">&quot;スペースの準備が整いました&quot;</span>)</div>
                        </div>

                        <div className="prose">
                            <p>
                                このように、3.9は単体の知識ではなく、<strong>「どのAPIをどの順番で呼び出せば目的を達成できるか」という設計力</strong>を問う項目です。
                                試験ではコードの一部が空欄になった穴埋め形式（ドラッグ＆ドロップ）で出題される傾向があるため、単純な暗記ではなく「このAPI呼び出しの後には、論理的に何をする必要があるか」を考える練習をしておくとよいでしょう。
                            </p>
                        </div>
                    </section>

                    {/* ============ 学習ロードマップ ============ */}
                    <section className="section" id="roadmap">
                        <h2>学習ロードマップ：ハンズオンの進め方</h2>
                        <div className="prose">
                            <p>
                                知識のインプットだけでなく、実際に手を動かすことがこのドメインの理解を大きく助けます。以下の順序でDevNet Sandboxを活用した学習を進めることをおすすめします。
                            </p>
                        </div>

                        <Diagram id="diag-roadmap" label="DevNet Sandbox を活用したステップバイステップ学習ロードマップ" />

                        <ol className="step-list">
                            <li><strong>Step 1</strong>：<code>developer.cisco.com</code>でDevNetアカウントを作成し、Sandboxカタログにアクセスできる状態にする。</li>
                            <li><strong>Step 2</strong>：Meraki Always-On Sandboxを使い、組織・ネットワーク・デバイスの階層構造を実際のAPIレスポンスで確認する。</li>
                            <li><strong>Step 3</strong>：Cisco DNA Center（Catalyst Center）Sandboxで認証トークンを取得し、Intent APIでデバイス一覧を取得する。</li>
                            <li><strong>Step 4</strong>：自分のWebexアカウントでアクセストークンを発行し、スペース作成からメッセージ送信までを自動化するスクリプトを書く。</li>
                            <li><strong>Step 5</strong>：IOS XE Always-On Sandboxに対して、<code>ncclient</code>（NETCONF）と<code>requests</code>（RESTCONF）の両方でアクセスし、挙動の違いを体感する。</li>
                            <li><strong>Step 6</strong>：Meraki＋Webexなど複数のAPIを組み合わせ、「特定の条件を満たしたらWebexへ通知する」といった3.9形式の複合シナリオを自作してみる。</li>
                        </ol>
                    </section>

                    {/* ============ 試験対策のポイント ============ */}
                    <section className="section" id="tips">
                        <h2>試験対策のポイントとよくある誤解</h2>
                        <div className="prose">
                            <ul>
                                <li><strong>製品名の変更に注意する</strong>：AMP→Secure Endpoint、ThreatGrid→Secure Malware Analytics、DNA Center→Catalyst Centerなど、Ciscoは製品ブランドを頻繁に見直しています。ブループリント上の表記と、実際の開発現場での最新名称の両方を把握しておきましょう。</li>
                                <li><strong>NETCONFとRESTCONFのポート番号を混同しない</strong>：一般的な既定値はNETCONF=830（SSH）、RESTCONF=443（HTTPS）です。DevNet Sandbox特有の代替ポート（例：10000番、9443番）は環境固有の設定であり、試験の一般知識としては標準ポートを優先して覚えましょう。</li>
                                <li><strong>Meraki APIの階層構造を理解する</strong>：Organization（組織）&gt; Network（ネットワーク）&gt; Device（デバイス）という3階層をたどらないとデバイス情報にたどり着けない点は頻出のポイントです。</li>
                                <li><strong>CUCMのAXLとUDSを混同しない</strong>：AXLは管理者向けのSOAP API（設定変更を伴う操作向け）、UDSはエンドユーザー向けのREST API（ディレクトリ検索など、比較的軽量な参照操作向け）という役割の違いを押さえましょう。</li>
                                <li><strong>「コントローラー経由」と「デバイス直接」を区別する</strong>：3.2〜3.5で学ぶプラットフォームは基本的に複数デバイスをまとめて管理するコントローラー層であり、3.6・3.8で学ぶNETCONF/RESTCONF/YANGはデバイス単体（またはコントローラーの背後にある技術基盤）に関する知識です。</li>
                                <li><strong>DevNetリソースの使い分け</strong>：「試したい」ならSandbox、「コードが欲しい」ならCode Exchange、「仕様を調べたい」ならAPI Documentation、「相談したい」ならSupport/Forums、「体系的に学びたい」ならLearning Labs、という対応関係を整理しておくと選択式問題で迷いません。</li>
                            </ul>
                        </div>
                    </section>

                    {/* ============ まとめ ============ */}
                    <section className="section" id="summary">
                        <h2>まとめ</h2>
                        <div className="prose">
                            <p>
                                「3.0 Cisco Platforms and Development」ドメインは、Cisco製品群を横断的に俯瞰する力を問う分野です。個々のAPIエンドポイントを丸暗記するのではなく、
                            </p>
                            <ol>
                                <li><strong>その製品が何を管理するものか</strong>（ネットワーク／コンピュート／コラボレーション／セキュリティ／デバイス単体）</li>
                                <li><strong>どんな種類のAPIを提供しているか</strong>（REST／SOAP／XML／NETCONF／RESTCONF）</li>
                                <li><strong>どのDevNetリソースを使えば効率よく学べるか</strong></li>
                            </ol>
                            <p>
                                という3つの軸で整理しながら学習を進めることで、着実に得点力を伸ばすことができます。ぜひDevNet Sandboxを積極的に活用し、実際にAPIを呼び出しながら知識を定着させてください。
                            </p>
                        </div>
                    </section>

                    {/* ============ 参考文献 ============ */}
                    <footer className="footer" id="references">
                        <h2>参考文献・出典一覧</h2>
                        <p style={{ marginBottom: '20px' }}>
                            本ガイドの作成にあたり、以下の一次情報源を参照しました。試験直前には必ず最新の公式情報をご確認ください。
                        </p>
                        <ul className="refs-list">
                            <li>
                                <span className="ref-desc">Cisco. &quot;CCNA Automation Certification&quot;（試験概要ページ・ユーザー提供URL）</span>
                                <a href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html" target="_blank" rel="noopener noreferrer">
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco. &quot;CCNA Automation Exam and Training&quot;（試験名・試験時間・受験言語・受験料等）</span>
                                <a href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html" target="_blank" rel="noopener noreferrer">
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco Learning Network. &quot;200-901 CCNAAUTO Exam Topics and Study Guide&quot;（公式ブループリント）</span>
                                <a href="https://learningnetwork.cisco.com/s/ccnaauto-exam-topics" target="_blank" rel="noopener noreferrer">
                                    https://learningnetwork.cisco.com/s/ccnaauto-exam-topics
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco Learning Network. &quot;DevNet Certifications: Evolving to CCNA, CCNP, and CCIE Automation&quot;（リブランディング公式告知、「試験内容は変更なし、名称のみ変更」の記載）</span>
                                <a href="https://learningnetwork.cisco.com/s/question/0D5Kd0000Be56OZKQY/devnet-certifications-evolving-to-ccna-ccnp-and-ccie-automation-" target="_blank" rel="noopener noreferrer">
                                    https://learningnetwork.cisco.com/s/question/0D5Kd0000Be56OZKQY/devnet-certifications-evolving-to-ccna-ccnp-and-ccie-automation-
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco Live. George Koukis, Kareem Iskander. &quot;BRKCRT-2080: Preparing for the DevNet Associate Certification&quot;（2024年、公式セッション資料。3.1〜3.9の詳細な学習項目およびv1.0→v1.1の変更点を掲載）</span>
                                <a href="https://www.ciscolive.com/c/dam/r/ciscolive/global-event/docs/2024/pdf/BRKCRT-2080.pdf" target="_blank" rel="noopener noreferrer">
                                    https://www.ciscolive.com/c/dam/r/ciscolive/global-event/docs/2024/pdf/BRKCRT-2080.pdf
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco DevNet. &quot;Cisco DNA Center Platform APIs and Integrations Overview&quot;（Intent APIの説明）</span>
                                <a href="https://developer.cisco.com/docs/dna-center/2-3-5/overview/" target="_blank" rel="noopener noreferrer">
                                    https://developer.cisco.com/docs/dna-center/2-3-5/overview/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco Meraki Developer Hub. &quot;Introduction - Meraki Dashboard API v1&quot;</span>
                                <a href="https://developer.cisco.com/meraki/api-v1/" target="_blank" rel="noopener noreferrer">
                                    https://developer.cisco.com/meraki/api-v1/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco Meraki Developer Hub. &quot;Getting Started - Meraki Dashboard API v1&quot;（組織→ネットワーク→デバイスの階層構造、Python SDKの使用例）</span>
                                <a href="https://developer.cisco.com/meraki/api-v1/getting-started/" target="_blank" rel="noopener noreferrer">
                                    https://developer.cisco.com/meraki/api-v1/getting-started/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco DevNet. &quot;Sandbox&quot;（DevNet Sandboxの概要、Always-On／Reservationの違い）</span>
                                <a href="https://developer.cisco.com/site/sandbox/" target="_blank" rel="noopener noreferrer">
                                    https://developer.cisco.com/site/sandbox/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco DevNet. &quot;Cisco DevNet Sandbox Technical documentation&quot;</span>
                                <a href="https://developer.cisco.com/docs/sandbox/" target="_blank" rel="noopener noreferrer">
                                    https://developer.cisco.com/docs/sandbox/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">DevNet Sandbox Catalog</span>
                                <a href="https://devnetsandbox.cisco.com/" target="_blank" rel="noopener noreferrer">
                                    https://devnetsandbox.cisco.com/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">webexteamssdk documentation. &quot;Introduction&quot;（Webex Python SDKの使用例、ciscosparkapi→webexteamssdk→webexpythonsdkへの変遷）</span>
                                <a href="https://webexteamssdk.readthedocs.io/en/latest/user/intro.html" target="_blank" rel="noopener noreferrer">
                                    https://webexteamssdk.readthedocs.io/en/latest/user/intro.html
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">WebexCommunity. &quot;WebexPythonSDK&quot; GitHubリポジトリ（ライブラリ名称変遷の経緯）</span>
                                <a href="https://github.com/WebexCommunity/WebexPythonSDK" target="_blank" rel="noopener noreferrer">
                                    https://github.com/WebexCommunity/WebexPythonSDK
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Roger Perkin (CCIE #50038). &quot;What is Cisco Catalyst Center?&quot;（DNA CenterからCatalyst Centerへの名称変更に関する解説）</span>
                                <a href="https://www.rogerperkin.co.uk/cisco-catalyst-center/what-is-cisco-catalyst-center/" target="_blank" rel="noopener noreferrer">
                                    https://www.rogerperkin.co.uk/cisco-catalyst-center/what-is-cisco-catalyst-center/
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco. &quot;Cisco Catalyst Center Data Sheet&quot;（Catalyst Centerが旧DNA Centerであることの公式記載）</span>
                                <a href="https://www.cisco.com/c/en/us/products/collateral/cloud-systems-management/dna-center/nb-06-dna-center-data-sheet-cte-en.html" target="_blank" rel="noopener noreferrer">
                                    https://www.cisco.com/c/en/us/products/collateral/cloud-systems-management/dna-center/nb-06-dna-center-data-sheet-cte-en.html
                                </a>
                            </li>
                            <li>
                                <span className="ref-desc">Cisco Community. &quot;IOS XE on CSR Recommended Code Always On Sandbox&quot; 関連スレッド（NETCONF/RESTCONFの接続情報：ホスト名・ポート番号・認証情報）</span>
                                <a href="https://community.cisco.com/t5/devnet-sandbox/ios-xe-on-csr-recommended-code-always-on-sandbox-offline/td-p/4393089" target="_blank" rel="noopener noreferrer">
                                    https://community.cisco.com/t5/devnet-sandbox/ios-xe-on-csr-recommended-code-always-on-sandbox-offline/td-p/4393089
                                </a>
                            </li>
                        </ul>
                        <p style={{ marginTop: '28px', fontSize: '1rem' }}>
                            © CCNA Automation 学習ガイドシリーズ／本ページは学習目的の非公式解説であり、Cisco Systems, Inc. の公式資料ではありません。
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}
