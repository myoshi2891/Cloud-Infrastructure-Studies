import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';

const DIAGRAM_DISPLAY: Record<string, { frameWidth: number }> = {
    'diag-0': { frameWidth: 760 },
    'diag-1': { frameWidth: 1280 },
    'diag-2': { frameWidth: 900 },
    'diag-3': { frameWidth: 900 },
    'diag-4': { frameWidth: 1100 },
    'diag-5': { frameWidth: 900 },
    'diag-6': { frameWidth: 800 },
    'diag-7': { frameWidth: 1280 },
    'diag-8': { frameWidth: 1280 },
};

/**
 * Renders a responsive Mermaid diagram for the specified diagram identifier.
 *
 * @param id - The diagram identifier used to select the chart and display width
 * @param label - The accessible label for the rendered diagram
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    const display = DIAGRAM_DISPLAY[id] ?? { frameWidth: 760 };
    return (
        <div
            className="diagram-container"
            data-diagram-id={id}
            style={{ maxWidth: `${display.frameWidth}px`, width: '100%' }}
        >
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

/**
 * Renders a CCNA Automation guide covering API concepts, usage patterns, and implementation.
 */
export function CcnaAutomationApiGuide() {
    return (
        <div className="ccna-automation-api-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    {/* Hero Banner */}
                    <header className="hero">
                        <span className="hero-eyebrow">CCNA AUTOMATION · 200-901 CCNAAUTO</span>
                        <h1>CCNA Automation「APIの理解と活用」完全ガイド</h1>
                        <p className="hero-desc">
                            〜試験項目 2.0 Understanding and Using APIs をステップバイステップで攻略する〜
                        </p>
                    </header>

                    {/* Disclaimer Callout */}
                    <div className="callout callout-warning">
                        <strong>【免責事項】</strong> 本ガイドは、Cisco公式サイトの CCNA Automation 認定ページおよび公式試験トピック（Exam Topics）PDFの内容にもとづいて作成した<strong>非公式の学習補助資料</strong>です。試験内容は予告なく変更される場合があるため、必ず記事末尾の一次情報源（Cisco公式サイト）もあわせてご確認ください。
                    </div>

                    {/* Section 1 */}
                    <section id="sec-1" className="section">
                        <h2 className="section-title">1. この記事について</h2>
                        <p>
                            Cisco は2026年、これまでの「DevNet Associate」認定を「<strong>CCNA Automation</strong>」として刷新しました。対応する試験は <strong>Automating Networks Using Cisco Platforms v1.1（200-901 CCNAAUTO）</strong> で、120分・合否判定の試験です。以前 DevNet Associate に合格していた人は、自動的に CCNA Automation 保持者として扱われます。
                        </p>
                        <p>
                            この試験の6つの出題ドメインのうち、最も配点比率が高いのが <strong>「2.0 Understanding and Using APIs（APIの理解と活用）」で配点20%</strong> です。ネットワーク自動化はほぼ必ずAPI経由で行われるため、この分野はCCNA Automation全体の土台となる最重要パートといえます。
                        </p>
                        <p>
                            本ガイドでは、この「2.0 Understanding and Using APIs」に含まれる9つの小項目（2.1〜2.9）を、<strong>初学者でも迷わないようにステップ順に並び替えて</strong>解説します。試験の公式な項番とは順番が異なりますが、「概念 → リクエスト → レスポンス → 認証 → 制約 → Webhook → トラブルシューティング → 実装」という理解しやすい流れに再構成しています。
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section id="sec-2" className="section">
                        <h2 className="section-title">2. CCNA Automation 試験の全体像</h2>
                        <p>CCNA Automation認定を取得するには、以下の1科目に合格する必要があります。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>試験名</td>
                                    <td>Automating Networks Using Cisco Platforms v1.1（200-901 CCNAAUTO）</td>
                                </tr>
                                <tr>
                                    <td>試験時間</td>
                                    <td>120分</td>
                                </tr>
                                <tr>
                                    <td>出題言語</td>
                                    <td>英語・日本語</td>
                                </tr>
                                <tr>
                                    <td>受験料</td>
                                    <td>US $300（または Cisco Learning Credits）</td>
                                </tr>
                                <tr>
                                    <td>有効期間</td>
                                    <td>合格から3年間</td>
                                </tr>
                                <tr>
                                    <td>前提条件</td>
                                    <td>特になし（Python等のソフトウェア開発経験1年以上が推奨）</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>試験は次の6つのドメインで構成されており、本ガイドが扱うのは <strong>ドメイン2.0</strong> です。</p>
                        <table>
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
                                    <td>Software Development and Design（ソフトウェア開発と設計）</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td><strong>2.0</strong></td>
                                    <td><strong>Understanding and Using APIs（APIの理解と活用）</strong></td>
                                    <td><strong>20%</strong></td>
                                </tr>
                                <tr>
                                    <td>3.0</td>
                                    <td>Cisco Platforms and Development（Ciscoプラットフォームと開発）</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>4.0</td>
                                    <td>Application Deployment and Security（アプリケーションの展開とセキュリティ）</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>5.0</td>
                                    <td>Infrastructure and Automation（インフラと自動化）</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>6.0</td>
                                    <td>Network Fundamentals（ネットワーク基礎）</td>
                                    <td>15%</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>ドメイン2.0に含まれる公式の小項目（2.1〜2.9）は以下の通りです。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項番</th>
                                    <th scope="col">公式の項目名（原文）</th>
                                    <th scope="col">内容の要約</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2.1</td>
                                    <td>Construct a REST API request to accomplish a task given API documentation</td>
                                    <td>ドキュメントを見てREST APIリクエストを組み立てる</td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td>Describe common usage patterns related to webhooks</td>
                                    <td>Webhookの一般的な利用パターンを説明する</td>
                                </tr>
                                <tr>
                                    <td>2.3</td>
                                    <td>Describe the constraints when consuming APIs</td>
                                    <td>APIを利用する際の制約を説明する</td>
                                </tr>
                                <tr>
                                    <td>2.4</td>
                                    <td>Explain common HTTP response codes associated with REST APIs</td>
                                    <td>代表的なHTTPレスポンスコードを説明する</td>
                                </tr>
                                <tr>
                                    <td>2.5</td>
                                    <td>Troubleshoot a problem given the HTTP response code, request and API documentation</td>
                                    <td>レスポンスコードとリクエスト、ドキュメントから問題を切り分ける</td>
                                </tr>
                                <tr>
                                    <td>2.6</td>
                                    <td>Interpret the parts of an HTTP response (response code, headers, body)</td>
                                    <td>HTTPレスポンスの構成要素を読み解く</td>
                                </tr>
                                <tr>
                                    <td>2.7</td>
                                    <td>Utilize common API authentication mechanisms: basic, custom token, and API keys</td>
                                    <td>主要な認証方式（Basic・カスタムトークン・APIキー）を使う</td>
                                </tr>
                                <tr>
                                    <td>2.8</td>
                                    <td>Compare common API styles (REST, RPC, synchronous, and asynchronous)</td>
                                    <td>APIの方式（REST/RPC、同期/非同期）を比較する</td>
                                </tr>
                                <tr>
                                    <td>2.9</td>
                                    <td>Construct a Python script that calls a REST API using the requests library</td>
                                    <td>requestsライブラリでREST APIを呼び出すPythonスクリプトを書く</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Section 3 */}
                    <section id="sec-3" className="section">
                        <h2 className="section-title">3. 学習ロードマップ</h2>
                        <Diagram id="diag-0" label="学習ロードマップ" />
                        <p>
                            この順番で学ぶ理由はシンプルです。<strong>「概念（何ができるか）」を先に理解してから「作法（どう書くか）」を学び、最後に「実装（コードにする）」へ進む</strong>という、初学者にとって最も挫折しにくい流れになっています。
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section id="sec-4" className="section">
                        <h2 className="section-title">4. Step 0: そもそも「API」とは何か</h2>
                        <p>
                            CCNA Automationで扱うAPIのほとんどは、Web上でHTTP通信を使ってやり取りする「Web API」です。まずは比喩で全体像をつかみましょう。
                        </p>
                        <ul>
                            <li><strong>クライアント（あなたのスクリプト）</strong> = レストランのお客さん</li>
                            <li><strong>API</strong> = 注文を受けて厨房に伝えるウェイター</li>
                            <li><strong>APIサーバー（Cisco Meraki、Webexなど）</strong> = 厨房</li>
                        </ul>
                        <p>
                            お客さんは厨房に直接入って調理しません。「メニュー（APIドキュメント）」を見て、決められた形式でウェイター（API）に注文し、料理（データ）を受け取ります。ネットワーク自動化も同じで、Pythonスクリプトが直接ネットワーク機器の内部処理を書き換えるのではなく、<strong>あらかじめ定義された作法（API）を通じて</strong>タスクを依頼します。
                        </p>
                        <p>
                            CCNA Automationで登場する代表的なCisco APIには、Meraki Dashboard API、Cisco Catalyst Center API、Webex API、ACI API、Cisco Catalyst SD-WAN API、NSO APIなどがあり、いずれも土台となる考え方はこのガイドで学ぶ内容と共通しています。
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section id="sec-5" className="section">
                        <h2 className="section-title">5. Step 1（試験項目2.8）: APIの方式を比較する</h2>
                        <p>
                            コードを書く前に、まず「APIにはいくつかの流派（スタイル）がある」ことを理解しておきましょう。試験項目2.8では、<strong>REST と RPC</strong>、<strong>同期と非同期</strong>という2つの軸での比較が問われます。
                        </p>
                        <h3 className="subsection-title">5.1 REST vs RPC</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">REST</th>
                                    <th scope="col">RPC</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>考え方</td>
                                    <td>「リソース（モノ）」をURLで表現し、HTTPメソッドで操作する</td>
                                    <td>「手続き（関数）」をリモートから呼び出す感覚</td>
                                </tr>
                                <tr>
                                    <td>例</td>
                                    <td><code>GET /devices/123</code> → IDが123の機器情報を取得</td>
                                    <td><code>callMethod(&quot;getDevice&quot;, &#123;id:123&#125;)</code> のような呼び出し</td>
                                </tr>
                                <tr>
                                    <td>状態管理</td>
                                    <td>ステートレス（各リクエストが独立）</td>
                                    <td>実装によって異なる</td>
                                </tr>
                                <tr>
                                    <td>CCNA Automationでの位置づけ</td>
                                    <td>Cisco製品APIの主流（Meraki、Webexなど）</td>
                                    <td>gRPCなど一部の自動化ツールで使用</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="subsection-title">5.2 同期 vs 非同期</h3>
                        <Diagram id="diag-1" label="同期 vs 非同期" />
                        <ul>
                            <li><strong>同期</strong>: 「レストランで注文して、料理ができるまでその場で待つ」イメージ。シンプルだが、処理に時間がかかる操作（例: 大規模な設定変更）には不向き。</li>
                            <li><strong>非同期</strong>: 「注文票（受付番号）だけ先にもらって、呼ばれたら取りに行く」イメージ。時間のかかる処理（機器の一括アップグレードなど）でよく使われ、完了通知には次章のWebhookやポーリングが使われる。</li>
                        </ul>
                        <div className="callout">
                            <strong>試験のポイント</strong>: 「REST/RPC」と「同期/非同期」は別の軸です。例えば「RESTで非同期処理を実装する（ジョブIDを返すREST API）」という組み合わせも普通に存在します。混同しないようにしましょう。
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section id="sec-6" className="section">
                        <h2 className="section-title">6. Step 2（試験項目2.1）: ドキュメントからREST APIリクエストを組み立てる</h2>
                        <p>
                            REST APIへのリクエストは、次の4つの要素で構成されます。この構造を体に染み込ませることが、試験項目2.1の核心です。
                        </p>
                        <Diagram id="diag-2" label="HTTPリクエストの4要素" />

                        <h3 className="subsection-title">6.1 各要素の役割</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">要素</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>メソッド</td>
                                    <td>何をしたいか（動詞）</td>
                                    <td><code>GET</code>=取得、<code>POST</code>=作成、<code>PUT</code>/<code>PATCH</code>=更新、<code>DELETE</code>=削除</td>
                                </tr>
                                <tr>
                                    <td>URL</td>
                                    <td>どのリソースに対してか（名詞）</td>
                                    <td><code>/organizations/&#123;orgId&#125;/networks</code></td>
                                </tr>
                                <tr>
                                    <td>ヘッダー</td>
                                    <td>付帯情報</td>
                                    <td><code>Authorization</code>（認証）、<code>Content-Type: application/json</code>（データ形式）</td>
                                </tr>
                                <tr>
                                    <td>ボディ</td>
                                    <td>送信データ</td>
                                    <td><code>&#123;&quot;name&quot;: &quot;Branch-01&quot;&#125;</code> のようなJSON</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="subsection-title">6.2 ドキュメントから組み立てる実践例</h3>
                        <p>
                            CCNA Automationの試験項目3.9.aでは「Meraki、Cisco Catalyst Center、ACI、Cisco Catalyst SD-WAN、NSOを使ってネットワーク機器の一覧を取得する」ことが具体的に問われます。ここではMeraki Dashboard APIを例に、ドキュメントを見てリクエストを組み立てる手順を体験してみましょう。
                        </p>
                        <ol>
                            <li>APIドキュメントで目的の操作（「組織配下のネットワーク一覧を取得したい」）を探す</li>
                            <li>対応するメソッドとエンドポイントを確認する（例: <code>GET /organizations/&#123;organizationId&#125;/networks</code>）</li>
                            <li>認証方法（後述のStep 5）をヘッダーに設定する</li>
                            <li>必要なパスパラメータ（<code>&#123;organizationId&#125;</code>）を実際の値に置き換える</li>
                        </ol>

                        <div className="code-block">
                            <div className="code-line"><span className="keyword">GET</span> https://api.meraki.com/api/v1/organizations/549236/networks HTTP/1.1</div>
                            <div className="code-line"><span className="function">Host:</span> api.meraki.com</div>
                            <div className="code-line"><span className="function">Authorization:</span> Bearer &lt;APIキー&gt;</div>
                        </div>
                        <p>このように、APIドキュメントは「メニュー表」であり、そこに書かれた形式に沿って過不足なくリクエストを組み立てることが2.1のスキルです。</p>
                    </section>

                    {/* Section 7 */}
                    <section id="sec-7" className="section">
                        <h2 className="section-title">7. Step 3（試験項目2.6）: HTTPレスポンスの構造を読み解く</h2>
                        <p>リクエストを送ると、APIサーバーはHTTPレスポンスを返します。レスポンスも3つの部分から構成されています。</p>
                        <Diagram id="diag-3" label="HTTPレスポンスの構造" />

                        <p><strong>レスポンス例</strong></p>
                        <div className="code-block">
                            <div className="code-line">HTTP/1.1 <span className="number">200</span> OK</div>
                            <div className="code-line"><span className="function">Content-Type:</span> application/json</div>
                            <div className="code-line"><span className="function">X-Request-Id:</span> 7a1c2e3f</div>
                            <div className="code-line"></div>
                            <div className="code-line">[</div>
                            <div className="code-line">  &#123;</div>
                            <div className="code-line">    <span className="string">&quot;id&quot;</span>: <span className="string">&quot;N_1234&quot;</span>,</div>
                            <div className="code-line">    <span className="string">&quot;name&quot;</span>: <span className="string">&quot;Branch-01&quot;</span>,</div>
                            <div className="code-line">    <span className="string">&quot;timeZone&quot;</span>: <span className="string">&quot;Asia/Tokyo&quot;</span></div>
                            <div className="code-line">  &#125;</div>
                            <div className="code-line">]</div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">部分</th>
                                    <th scope="col">この例での内容</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ステータスライン</td>
                                    <td><code>200 OK</code></td>
                                    <td>リクエストが成功したことを示す</td>
                                </tr>
                                <tr>
                                    <td>ヘッダー</td>
                                    <td><code>Content-Type: application/json</code></td>
                                    <td>ボディがJSON形式であることを示す</td>
                                </tr>
                                <tr>
                                    <td>ボディ</td>
                                    <td>ネットワーク情報の配列</td>
                                    <td>実際に取得したデータ本体</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>ボディの中身（JSON）をPythonの辞書やリストに変換する処理は、試験ドメイン1.0（1.2 データ形式のパース）ともつながっています。</p>
                    </section>

                    {/* Section 8 */}
                    <section id="sec-8" className="section">
                        <h2 className="section-title">8. Step 4（試験項目2.4）: 主要なHTTPステータスコードを理解する</h2>
                        <p>ステータスコードは3桁の数字で、<strong>先頭の数字が「大分類」</strong>を表します。</p>
                        <Diagram id="diag-4" label="HTTPステータスコードの分類" />

                        <h3 className="subsection-title">8.1 分類ごとの意味</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">分類</th>
                                    <th scope="col">意味</th>
                                    <th scope="col">代表的なコード</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1xx</td>
                                    <td>情報提供のみ（処理継続中）</td>
                                    <td>100 Continue</td>
                                </tr>
                                <tr>
                                    <td>2xx</td>
                                    <td>リクエスト成功</td>
                                    <td>200 OK、201 Created、204 No Content</td>
                                </tr>
                                <tr>
                                    <td>3xx</td>
                                    <td>別の場所への転送・未更新</td>
                                    <td>301 Moved Permanently、304 Not Modified</td>
                                </tr>
                                <tr>
                                    <td>4xx</td>
                                    <td>クライアント（リクエスト側）に原因あり</td>
                                    <td>400、401、403、404、429</td>
                                </tr>
                                <tr>
                                    <td>5xx</td>
                                    <td>サーバー側に原因あり</td>
                                    <td>500、502、503</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="subsection-title">8.2 CCNA Automationで特に重要なコード</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">コード</th>
                                    <th scope="col">名称</th>
                                    <th scope="col">よくある原因</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>200</td>
                                    <td>OK</td>
                                    <td>GETやPUTなどが正常に完了</td>
                                </tr>
                                <tr>
                                    <td>201</td>
                                    <td>Created</td>
                                    <td>POSTでリソースが新規作成された</td>
                                </tr>
                                <tr>
                                    <td>204</td>
                                    <td>No Content</td>
                                    <td>DELETEなど、成功したがボディを返さない</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>Bad Request</td>
                                    <td>リクエストの構文やパラメータの誤り</td>
                                </tr>
                                <tr>
                                    <td>401</td>
                                    <td>Unauthorized</td>
                                    <td>認証情報が無い、または無効</td>
                                </tr>
                                <tr>
                                    <td>403</td>
                                    <td>Forbidden</td>
                                    <td>認証はできているが権限（スコープ）が不足</td>
                                </tr>
                                <tr>
                                    <td>404</td>
                                    <td>Not Found</td>
                                    <td>URLやリソースIDの誤り、存在しないリソース</td>
                                </tr>
                                <tr>
                                    <td>429</td>
                                    <td>Too Many Requests</td>
                                    <td>レート制限に抵触</td>
                                </tr>
                                <tr>
                                    <td>500</td>
                                    <td>Internal Server Error</td>
                                    <td>サーバー側の不具合</td>
                                </tr>
                                <tr>
                                    <td>503</td>
                                    <td>Service Unavailable</td>
                                    <td>サーバーが一時的に過負荷・メンテナンス中</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Section 9 */}
                    <section id="sec-9" className="section">
                        <h2 className="section-title">9. Step 5（試験項目2.7）: API認証方式を使い分ける</h2>
                        <p>「誰がリクエストしているか」をサーバーに証明する方法にはいくつかの種類があります。試験項目2.7では、<strong>Basic認証・カスタムトークン・APIキー</strong>の3種類が問われます。</p>

                        <h3 className="subsection-title">9.1 3つの認証方式の比較</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">方式</th>
                                    <th scope="col">仕組み</th>
                                    <th scope="col">ヘッダー例</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Basic認証</td>
                                    <td>ユーザー名とパスワードをBase64エンコードして送る</td>
                                    <td><code>Authorization: Basic dXNlcjpwYXNz</code></td>
                                    <td>実装は簡単だが、パスワードが漏れると影響が大きい。必ずHTTPS上で使う</td>
                                </tr>
                                <tr>
                                    <td>カスタムトークン（Bearerトークン等）</td>
                                    <td>事前に取得したトークン文字列を送る</td>
                                    <td><code>Authorization: Bearer &lt;token&gt;</code></td>
                                    <td>OAuthなどで発行される一時的なトークンが多く、有効期限や権限範囲（スコープ）を持てる</td>
                                </tr>
                                <tr>
                                    <td>APIキー</td>
                                    <td>サービスごとに発行された固定のキー文字列を送る</td>
                                    <td>専用ヘッダー、またはクエリパラメータ</td>
                                    <td>実装がシンプルで長期利用に向くが、漏えい時の影響範囲が広い</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="subsection-title">9.2 認証の流れ（シーケンス図）</h3>
                        <Diagram id="diag-5" label="認証の流れ" />

                        <h3 className="subsection-title">9.3 Cisco製品での実例</h3>
                        <p>
                            Cisco Meraki Dashboard APIでは、APIキーを<code>Authorization: Bearer &lt;APIキー&gt;</code>ヘッダーで送る方式（v1）と、旧バージョンで使われていた専用ヘッダー<code>X-Cisco-Meraki-API-Key</code>が存在します。また、セキュリティ上の配慮として、<strong>APIキーが誤っている場合はあえて403ではなく404を返す</strong>設計になっており、これは「リソースの存在自体を第三者に推測させない」ための工夫です。
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section id="sec-10" className="section">
                        <h2 className="section-title">10. Step 6（試験項目2.3）: APIを使ううえでの制約を理解する</h2>
                        <p>APIは「無制限に、好きなだけ」呼び出せるわけではありません。試験項目2.3では、代表的な制約を理解しているかが問われます。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">制約</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">典型的なサイン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>レート制限（Rate Limiting）</td>
                                    <td>一定時間内に呼び出せる回数の上限</td>
                                    <td><code>429 Too Many Requests</code>、<code>Retry-After</code>ヘッダー</td>
                                </tr>
                                <tr>
                                    <td>ページネーション</td>
                                    <td>一度のリクエストで返せる件数に上限がある</td>
                                    <td>レスポンスに次ページへのリンク/トークンが含まれる</td>
                                </tr>
                                <tr>
                                    <td>バージョニング</td>
                                    <td>APIの仕様変更に備え、URLにバージョン番号を含む</td>
                                    <td><code>/api/v1/...</code> のような表記</td>
                                </tr>
                                <tr>
                                    <td>ペイロードサイズ制限</td>
                                    <td>一度に送信・受信できるデータ量の上限</td>
                                    <td>大きすぎるリクエストで<code>400</code>や<code>413</code>系のエラー</td>
                                </tr>
                                <tr>
                                    <td>タイムアウト</td>
                                    <td>一定時間内にレスポンスが返らないと打ち切られる</td>
                                    <td>クライアント側の接続エラー</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="subsection-title">10.1 レート制限への対処（再試行フロー）</h3>
                        <Diagram id="diag-6" label="レート制限への対処" />
                        <p>
                            Cisco Meraki Dashboard APIの場合、組織単位で1秒あたりのリクエスト数に上限が設けられており、これを超えると<code>429</code>が返され、<code>Retry-After</code>ヘッダーで待機すべき秒数（またはHTTP-date形式）が示されます。
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section id="sec-11" className="section">
                        <h2 className="section-title">11. Step 7（試験項目2.2）: Webhookの活用パターンを理解する</h2>
                        <p>「APIサーバーに変化がないか、こちらから何度も聞きに行く」方式（ポーリング）に対して、「変化があったらサーバー側から知らせてもらう」方式が <strong>Webhook</strong> です。</p>
                        <Diagram id="diag-7" label="ポーリング vs Webhook" />

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">ポーリング</th>
                                    <th scope="col">Webhook</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>通信の主体</td>
                                    <td>クライアントが定期的に問い合わせる</td>
                                    <td>サーバー側がイベント発生時に通知する</td>
                                </tr>
                                <tr>
                                    <td>リアルタイム性</td>
                                    <td>問い合わせ間隔に依存する</td>
                                    <td>ほぼリアルタイム</td>
                                </tr>
                                <tr>
                                    <td>サーバー負荷</td>
                                    <td>変化がなくても毎回リクエストが発生する</td>
                                    <td>変化があったときだけ通信が発生する</td>
                                </tr>
                                <tr>
                                    <td>実装の要点</td>
                                    <td>間隔設計、無駄打ちの許容</td>
                                    <td>受信用エンドポイントの用意、署名検証</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="subsection-title">11.1 Webhookの一般的な利用パターン</h3>
                        <ol>
                            <li><strong>事前登録</strong>: 「このイベントが起きたら、このURLにPOSTしてください」とAPI提供元へ登録する</li>
                            <li><strong>イベント発火</strong>: 実際にイベントが発生すると、登録先URLへHTTP POSTでデータが送られてくる</li>
                            <li><strong>受信処理</strong>: 受信側アプリはPOSTされたJSONの中身を見て処理を分岐する</li>
                            <li><strong>署名検証</strong>: なりすまし防止のため、送信元がシークレットキーで生成した署名をヘッダーで検証する</li>
                            <li><strong>速やかな応答</strong>: 受信側は重い処理を後回しにし、まず<code>200</code>系のステータスを素早く返すのが定石</li>
                        </ol>
                    </section>

                    {/* Section 12 */}
                    <section id="sec-12" className="section">
                        <h2 className="section-title">12. Step 8（試験項目2.5）: ステータスコードから障害を切り分ける</h2>
                        <p>試験項目2.5は、「ステータスコード」「送ったリクエストの内容」「APIドキュメント」の3つを突き合わせて原因を推測する、いわば総合力を問う項目です。</p>
                        <Diagram id="diag-8" label="障害切り分けフロー" />

                        <h3 className="subsection-title">12.1 よくある原因と対処の対応表</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">症状（ステータスコード）</th>
                                    <th scope="col">疑うべき原因</th>
                                    <th scope="col">確認・対処のヒント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>400 Bad Request</td>
                                    <td>必須パラメータの欠落、型の不一致、JSON構文ミス</td>
                                    <td>ドキュメントの必須項目一覧とリクエストボディを1つずつ突合する</td>
                                </tr>
                                <tr>
                                    <td>401 Unauthorized</td>
                                    <td>トークン期限切れ、認証ヘッダーの書式誤り</td>
                                    <td>ヘッダー名・<code>Bearer</code>等のプレフィックス・キーの有効性を確認する</td>
                                </tr>
                                <tr>
                                    <td>403 Forbidden</td>
                                    <td>認証は通っているが権限不足</td>
                                    <td>発行したトークン/キーに必要なスコープが付与されているか確認する</td>
                                </tr>
                                <tr>
                                    <td>404 Not Found</td>
                                    <td>URLタイプミス、削除済み/存在しないID</td>
                                    <td>パスパラメータの値やAPIバージョン（<code>v1</code>等）を再確認する</td>
                                </tr>
                                <tr>
                                    <td>429 Too Many Requests</td>
                                    <td>短時間の連続リクエストによるレート制限抵触</td>
                                    <td><code>Retry-After</code>ヘッダーの秒数を尊重し、リトライ間隔を調整する</td>
                                </tr>
                                <tr>
                                    <td>5xx系</td>
                                    <td>サーバー側の一時的な障害</td>
                                    <td>自分側の問題ではないため、時間をおいて再試行し、継続する場合はサポート窓口へ</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Section 13 */}
                    <section id="sec-13" className="section">
                        <h2 className="section-title">13. Step 9（試験項目2.9）: Pythonのrequestsライブラリで実装する</h2>
                        <p>ここまでの知識を、実際にPythonコードへ落とし込みます。試験項目2.9は「requestsライブラリを使ってREST APIを呼び出すスクリプトを書ける」ことを問う項目です。</p>

                        <h3 className="subsection-title">13.1 基本形（GETリクエスト）</h3>
                        <div className="code-block">
                            <div className="code-line"><span className="keyword">import</span> requests</div>
                            <div className="code-line"></div>
                            <div className="code-line">url = <span className="string">&quot;https://api.meraki.com/api/v1/organizations/549236/networks&quot;</span></div>
                            <div className="code-line">headers = &#123;</div>
                            <div className="code-line">    <span className="string">&quot;Authorization&quot;</span>: <span className="string">&quot;Bearer &lt;APIキー&gt;&quot;</span>,</div>
                            <div className="code-line">    <span className="string">&quot;Content-Type&quot;</span>: <span className="string">&quot;application/json&quot;</span>,</div>
                            <div className="code-line">&#125;</div>
                            <div className="code-line"></div>
                            <div className="code-line">response = requests.<span className="function">get</span>(url, headers=headers, timeout=<span className="number">10</span>)</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="comment"># ステータスコードを確認する（試験項目2.4・2.6と直結）</span></div>
                            <div className="code-line"><span className="keyword">if</span> response.status_code == <span className="number">200</span>:</div>
                            <div className="code-line">    networks = response.<span className="function">json</span>()  <span className="comment"># JSON文字列をPythonのlist/dictへ変換</span></div>
                            <div className="code-line">    <span className="keyword">for</span> network <span className="keyword">in</span> networks:</div>
                            <div className="code-line">        <span className="function">print</span>(network[<span className="string">&quot;id&quot;</span>], network[<span className="string">&quot;name&quot;</span>])</div>
                            <div className="code-line"><span className="keyword">else</span>:</div>
                            <div className="code-line">    <span className="function">print</span>(f<span className="string">&quot;エラー: &#123;response.status_code&#125; - &#123;response.text&#125;&quot;</span>)</div>
                        </div>

                        <h3 className="subsection-title">13.2 POSTリクエスト（データを送る場合）</h3>
                        <div className="code-block">
                            <div className="code-line"><span className="keyword">import</span> requests</div>
                            <div className="code-line"></div>
                            <div className="code-line">url = <span className="string">&quot;https://api.meraki.com/api/v1/organizations/549236/networks&quot;</span></div>
                            <div className="code-line">headers = &#123;</div>
                            <div className="code-line">    <span className="string">&quot;X-Cisco-Meraki-API-Key&quot;</span>: <span className="string">&quot;&lt;APIキー&gt;&quot;</span>,<span className="comment">  # 専用ヘッダー例（v1標準は Authorization: Bearer &lt;APIキー&gt;）</span></div>
                            <div className="code-line">    <span className="string">&quot;Content-Type&quot;</span>: <span className="string">&quot;application/json&quot;</span>,</div>
                            <div className="code-line">&#125;</div>
                            <div className="code-line">payload = &#123;</div>
                            <div className="code-line">    <span className="string">&quot;name&quot;</span>: <span className="string">&quot;Branch-02&quot;</span>,</div>
                            <div className="code-line">    <span className="string">&quot;productTypes&quot;</span>: [<span className="string">&quot;appliance&quot;</span>, <span className="string">&quot;switch&quot;</span>],</div>
                            <div className="code-line">    <span className="string">&quot;timeZone&quot;</span>: <span className="string">&quot;Asia/Tokyo&quot;</span>,</div>
                            <div className="code-line">&#125;</div>
                            <div className="code-line"></div>
                            <div className="code-line">response = requests.<span className="function">post</span>(url, headers=headers, json=payload, timeout=<span className="number">10</span>)</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="keyword">if</span> response.status_code == <span className="number">201</span>:</div>
                            <div className="code-line">    <span className="function">print</span>(<span className="string">&quot;作成成功:&quot;</span>, response.<span className="function">json</span>())</div>
                            <div className="code-line"><span className="keyword">else</span>:</div>
                            <div className="code-line">    <span className="function">print</span>(f<span className="string">&quot;作成失敗: &#123;response.status_code&#125; - &#123;response.text&#125;&quot;</span>)</div>
                        </div>

                        <h3 className="subsection-title">13.3 制約・障害対応を組み込んだ実装（Step 6・8の応用）</h3>
                        <div className="code-block">
                            <div className="code-line"><span className="keyword">import</span> time</div>
                            <div className="code-line"><span className="keyword">import</span> requests</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="keyword">def</span> <span className="function">get_with_retry</span>(url, headers, max_retries=<span className="number">3</span>):</div>
                            <div className="code-line">    <span className="keyword">for</span> attempt <span className="keyword">in</span> <span className="function">range</span>(max_retries):</div>
                            <div className="code-line">        <span className="keyword">try</span>:</div>
                            <div className="code-line">            response = requests.<span className="function">get</span>(url, headers=headers, timeout=<span className="number">10</span>)</div>
                            <div className="code-line">        <span className="keyword">except</span> requests.exceptions.RequestException <span className="keyword">as</span> e:</div>
                            <div className="code-line">            <span className="function">print</span>(f<span className="string">&quot;通信エラー発生 (&#123;e&#125;)。再試行します。&quot;</span>)</div>
                            <div className="code-line">            <span className="keyword">if</span> attempt == max_retries - <span className="number">1</span>:</div>
                            <div className="code-line">                <span className="keyword">break</span></div>
                            <div className="code-line">            time.<span className="function">sleep</span>(<span className="number">2</span> ** attempt)</div>
                            <div className="code-line">            <span className="keyword">continue</span></div>
                            <div className="code-line"></div>
                            <div className="code-line">        <span className="keyword">if</span> response.status_code == <span className="number">200</span>:</div>
                            <div className="code-line">            <span className="keyword">return</span> response.<span className="function">json</span>()</div>
                            <div className="code-line"></div>
                            <div className="code-line">        <span className="keyword">if</span> response.status_code == <span className="number">429</span>:</div>
                            <div className="code-line">            <span className="comment"># レート制限：Retry-Afterヘッダー（秒数またはHTTP-date）だけ待って再試行</span></div>
                            <div className="code-line">            retry_after = response.headers.<span className="function">get</span>(<span className="string">&quot;Retry-After&quot;</span>)</div>
                            <div className="code-line">            wait_seconds = <span className="keyword">None</span></div>
                            <div className="code-line">            <span className="keyword">if</span> retry_after <span className="keyword">is not</span> <span className="keyword">None</span>:</div>
                            <div className="code-line">                <span className="keyword">try</span>:</div>
                            <div className="code-line">                    parsed_val = <span className="function">int</span>(retry_after)</div>
                            <div className="code-line">                    <span className="keyword">if</span> parsed_val &gt;= <span className="number">0</span>:</div>
                            <div className="code-line">                        wait_seconds = <span className="function">min</span>(parsed_val, <span className="number">3600</span>)</div>
                            <div className="code-line">                <span className="keyword">except</span> (<span className="function">ValueError</span>, <span className="function">TypeError</span>):</div>
                            <div className="code-line">                    <span className="keyword">try</span>:</div>
                            <div className="code-line">                        <span className="keyword">import</span> math</div>
                            <div className="code-line">                        <span className="keyword">from</span> email.utils <span className="keyword">import</span> parsedate_to_datetime</div>
                            <div className="code-line">                        <span className="keyword">from</span> datetime <span className="keyword">import</span> datetime, timezone</div>
                            <div className="code-line">                        dt = <span className="function">parsedate_to_datetime</span>(retry_after)</div>
                            <div className="code-line">                        now = datetime.<span className="function">now</span>(timezone.utc)</div>
                            <div className="code-line">                        diff = <span className="function">max</span>(<span className="number">0</span>, math.<span className="function">ceil</span>((dt - now).<span className="function">total_seconds</span>()))</div>
                            <div className="code-line">                        wait_seconds = <span className="function">min</span>(diff, <span className="number">3600</span>)</div>
                            <div className="code-line">                    <span className="keyword">except</span> <span className="function">Exception</span>:</div>
                            <div className="code-line">                        <span className="keyword">pass</span></div>
                            <div className="code-line">            <span className="keyword">if</span> attempt == max_retries - <span className="number">1</span>:</div>
                            <div className="code-line">                <span className="keyword">break</span></div>
                            <div className="code-line">            <span className="keyword">if</span> wait_seconds <span className="keyword">is None</span>:</div>
                            <div className="code-line">                wait_seconds = <span className="number">2</span> ** attempt</div>
                            <div className="code-line">            <span className="function">print</span>(f<span className="string">&quot;レート制限中。&#123;wait_seconds&#125;秒待機して再試行します。&quot;</span>)</div>
                            <div className="code-line">            time.<span className="function">sleep</span>(wait_seconds)</div>
                            <div className="code-line">            <span className="keyword">continue</span></div>
                            <div className="code-line"></div>
                            <div className="code-line">        <span className="keyword">if</span> response.status_code &gt;= <span className="number">500</span>:</div>
                            <div className="code-line">            <span className="comment"># サーバー側エラー：指数バックオフで再試行</span></div>
                            <div className="code-line">            <span className="keyword">if</span> attempt == max_retries - <span className="number">1</span>:</div>
                            <div className="code-line">                <span className="keyword">break</span></div>
                            <div className="code-line">            time.<span className="function">sleep</span>(<span className="number">2</span> ** attempt)</div>
                            <div className="code-line">            <span className="keyword">continue</span></div>
                            <div className="code-line"></div>
                            <div className="code-line">        <span className="keyword">raise</span> <span className="function">RuntimeError</span>(f<span className="string">&quot;リクエスト失敗: &#123;response.status_code&#125; - &#123;response.text&#125;&quot;</span>)</div>
                            <div className="code-line"></div>
                            <div className="code-line">    <span className="keyword">raise</span> <span className="function">RuntimeError</span>(<span className="string">&quot;再試行の上限に達しました。&quot;</span>)</div>
                        </div>
                    </section>

                    {/* Section 14 */}
                    <section id="sec-14" className="section">
                        <h2 className="section-title">14. まとめ: 試験項目とこのガイドの対応表</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">公式項番</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">本ガイドの該当箇所</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2.1</td>
                                    <td>REST APIリクエストの組み立て</td>
                                    <td>Step 2</td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td>Webhookの利用パターン</td>
                                    <td>Step 7</td>
                                </tr>
                                <tr>
                                    <td>2.3</td>
                                    <td>APIの制約</td>
                                    <td>Step 6</td>
                                </tr>
                                <tr>
                                    <td>2.4</td>
                                    <td>HTTPレスポンスコード</td>
                                    <td>Step 4</td>
                                </tr>
                                <tr>
                                    <td>2.5</td>
                                    <td>トラブルシューティング</td>
                                    <td>Step 8</td>
                                </tr>
                                <tr>
                                    <td>2.6</td>
                                    <td>HTTPレスポンスの構造</td>
                                    <td>Step 3</td>
                                </tr>
                                <tr>
                                    <td>2.7</td>
                                    <td>API認証方式</td>
                                    <td>Step 5</td>
                                </tr>
                                <tr>
                                    <td>2.8</td>
                                    <td>APIスタイルの比較</td>
                                    <td>Step 1</td>
                                </tr>
                                <tr>
                                    <td>2.9</td>
                                    <td>requestsライブラリでの実装</td>
                                    <td>Step 9</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Section 15 */}
                    <section id="sec-15" className="section">
                        <h2 className="section-title">15. さらに学ぶために（関連する試験項目とのつながり）</h2>
                        <p>
                            「2.0 Understanding and Using APIs」は独立した知識ではなく、他のドメインの土台にもなっています。
                        </p>
                        <ul>
                            <li><strong>ドメイン3.0（Cisco Platforms and Development）</strong>: REST APIの知識を実際のCisco製品APIに適用していきます。</li>
                            <li><strong>ドメイン5.0（Infrastructure and Automation）</strong>: RESTCONF/NETCONF、YANGモデルなどのインフラ自動化に拡張します。</li>
                            <li><strong>ドメイン1.0（Software Development and Design）</strong>: JSON/XML/YAMLのパース知識と直結しています。</li>
                        </ul>
                    </section>

                    {/* Section 16 */}
                    <section id="sec-16" className="section">
                        <h2 className="section-title">16. 出典・参考資料</h2>
                        <ul>
                            <li>
                                <a href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html" target="_blank" rel="noopener noreferrer">
                                    Cisco「CCNA Automation certification」公式ページ
                                </a>
                            </li>
                            <li>
                                <a href="https://developer.cisco.com/meraki/api-v1/getting-started/" target="_blank" rel="noopener noreferrer">
                                    Cisco Meraki Developer Hub「Getting Started - Meraki Dashboard API v1」
                                </a>
                            </li>
                            <li>
                                <a href="https://developer-usgov.webex.com/docs/webhooks" target="_blank" rel="noopener noreferrer">
                                    Webex for Developers「APIs - Webhooks」
                                </a>
                            </li>
                            <li>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status" target="_blank" rel="noopener noreferrer">
                                    MDN Web Docs「HTTP response status codes」
                                </a>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}
