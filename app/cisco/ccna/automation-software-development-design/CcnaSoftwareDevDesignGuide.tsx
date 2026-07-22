'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} />
        </div>
    );
}

export function CcnaSoftwareDevDesignGuide() {
    return (
        <div className="ccna-software-dev-design-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    <header className="hero">
                        <div className="hero-eyebrow">CCNA AUTOMATION · 200-901 CCNAAUTO</div>
                        <div className="hero-net" aria-hidden="true">
                            <svg width="180" height="28" viewBox="0 0 180 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="14" y1="14" x2="60" y2="6" stroke="#7c9eff" strokeWidth="1.5" opacity="0.6" />
                                <line x1="60" y1="6" x2="110" y2="20" stroke="#7c9eff" strokeWidth="1.5" opacity="0.6" />
                                <line x1="110" y1="20" x2="166" y2="12" stroke="#5eead4" strokeWidth="1.5" opacity="0.6" />
                                <circle cx="14" cy="14" r="6" fill="#0f2138" stroke="#7c9eff" strokeWidth="2" />
                                <circle cx="60" cy="6" r="5" fill="#0f2138" stroke="#7c9eff" strokeWidth="2" />
                                <circle cx="110" cy="20" r="5" fill="#0f2138" stroke="#5eead4" strokeWidth="2" />
                                <circle cx="166" cy="12" r="6" fill="#0f2138" stroke="#5eead4" strokeWidth="2" />
                            </svg>
                        </div>
                        <h1>ソフトウェア開発と設計 完全ガイド</h1>
                        <p className="lead">
                            Cisco公式の「CCNA Automation」認定ページおよび公式試験トピックPDF（200-901 CCNAAUTO v1.1）に基づき、試験ドメイン{' '}
                            <strong>「1.0 Software Development and Design」</strong>{' '}
                            を、初学者でも理解できるようステップバイステップで解説します。本ガイドはCisco社が発行する公式教材ではなく、非公式の学習補助資料です。
                        </p>
                        <div className="hero-meta">
                            <span className="chip">試験時間: 120分</span>
                            <span className="chip">出題言語: 英語 / 日本語</span>
                            <span className="chip">前提資格: なし</span>
                            <span className="chip">本ドメインの出題比率: 15%</span>
                        </div>
                    </header>

                    <article className="prose">
                        {/* 1 */}
                        <section className="section" id="sec-1">
                            <div className="section-kicker">01 / 13</div>
                            <h2>この認定と試験について</h2>
                            <p>
                                CCNA Automationは、ネットワークの自動化・プログラマビリティ領域における第一歩となる認定資格です。合格には、コア試験である{' '}
                                <strong>「Automating Networks Using Cisco Platforms（200-901 CCNAAUTO）v1.1」</strong>{' '}
                                を突破する必要があります。
                            </p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">内容</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>試験時間</td>
                                            <td>120分</td>
                                        </tr>
                                        <tr>
                                            <td>出題言語</td>
                                            <td>英語・日本語</td>
                                        </tr>
                                        <tr>
                                            <td>前提資格</td>
                                            <td>なし（1年以上のソフトウェア開発経験、特にPythonの実務経験があると学習がスムーズ）</td>
                                        </tr>
                                        <tr>
                                            <td>有効期限</td>
                                            <td>3年間（継続教育クレジットまたは再受験で更新可能）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                この試験は、単なる「ネットワークの知識」だけでなく、<strong>ソフトウェア開発の基礎知識</strong>と
                                <strong>Ciscoプラットフォームを操作する自動化スキル</strong>の両方を問う点が最大の特徴です。本ガイドで扱う「1.0
                                ソフトウェア開発と設計」は、その土台となる最初のドメインにあたります。
                            </p>
                        </section>

                        {/* 2 */}
                        <section className="section" id="sec-2">
                            <div className="section-kicker">02 / 13</div>
                            <h2>試験全体のドメイン構成</h2>
                            <p>試験は6つのドメインで構成されており、それぞれに出題比率（重み）が設定されています。</p>
                            <div className="table-wrap">
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
                                            <td>ソフトウェア開発と設計</td>
                                            <td>15%</td>
                                        </tr>
                                        <tr>
                                            <td>2.0</td>
                                            <td>APIの理解と活用</td>
                                            <td>20%</td>
                                        </tr>
                                        <tr>
                                            <td>3.0</td>
                                            <td>Ciscoプラットフォームと開発</td>
                                            <td>15%</td>
                                        </tr>
                                        <tr>
                                            <td>4.0</td>
                                            <td>アプリケーション導入とセキュリティ</td>
                                            <td>15%</td>
                                        </tr>
                                        <tr>
                                            <td>5.0</td>
                                            <td>インフラとオートメーション</td>
                                            <td>20%</td>
                                        </tr>
                                        <tr>
                                            <td>6.0</td>
                                            <td>ネットワークの基礎</td>
                                            <td>15%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="diagram-frame">
                                <Diagram id="diag-0" label="CCNAAUTO 200-901 出題比率" />
                            </div>
                            <p className="caption">図: 6ドメインの出題比率</p>

                            <p>
                                「1.0
                                ソフトウェア開発と設計」は全体の15%を占め、以下の8つの小項目（サブトピック）で構成されています。本ガイドではこの8項目すべてを順番に解説します。
                            </p>

                            <div className="diagram-frame">
                                <Diagram id="diag-1" label="ドメイン1.0を構成する8つのサブトピック" />
                            </div>
                            <p className="caption">図: ドメイン1.0を構成する8つのサブトピック</p>

                            <blockquote>
                                <p>
                                    補足：Cisco公式の試験概要ページでは、この領域は「Python、Git、共通データ形式（XML・JSON・YAML）を含むソフトウェア開発スキルの実践」と紹介されています（出典は巻末参照）。
                                </p>
                            </blockquote>
                        </section>

                        {/* 3 */}
                        <section className="section" id="sec-3">
                            <div className="section-kicker">03 / 13 · 試験目標 1.1</div>
                            <h2>データフォーマットの比較（XML / JSON / YAML）</h2>

                            <h3>なぜ学ぶのか</h3>
                            <p>
                                ネットワーク自動化では、機器の設定情報やAPIのレスポンスを「人間にも機械にも読み書きしやすい形式」でやり取りします。その代表格が{' '}
                                <strong>XML・JSON・YAML</strong>{' '}
                                の3つです。試験では、それぞれの特徴を理解し、状況に応じて使い分けられるかが問われます。
                            </p>

                            <h3>3つのフォーマットの比較表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">観点</th>
                                            <th scope="col">XML</th>
                                            <th scope="col">JSON</th>
                                            <th scope="col">YAML</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>読みやすさ</td>
                                            <td>タグが多く冗長</td>
                                            <td>シンプルで読みやすい</td>
                                            <td>インデント主体で最も人間向き</td>
                                        </tr>
                                        <tr>
                                            <td>構造の表現方法</td>
                                            <td>開始・終了タグで囲む</td>
                                            <td>波括弧・角括弧・コロン</td>
                                            <td>インデントとハイフンのみ</td>
                                        </tr>
                                        <tr>
                                            <td>コメント</td>
                                            <td>標準では不可</td>
                                            <td>不可</td>
                                            <td>可能（<code>#</code>）</td>
                                        </tr>
                                        <tr>
                                            <td>データ型</td>
                                            <td>基本は文字列（スキーマで型定義も可）</td>
                                            <td>文字列・数値・真偽値・null・配列・オブジェクト</td>
                                            <td>JSONの上位互換（アンカーや複数行文字列なども可）</td>
                                        </tr>
                                        <tr>
                                            <td>主な利用場面</td>
                                            <td>SOAP API、レガシーな設定ファイル</td>
                                            <td>REST APIのリクエスト/レスポンス</td>
                                            <td>Ansible Playbook、Kubernetes、CI/CD定義ファイル</td>
                                        </tr>
                                        <tr>
                                            <td>拡張子</td>
                                            <td><code>.xml</code></td>
                                            <td><code>.json</code></td>
                                            <td><code>.yml</code> / <code>.yaml</code></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>同じ情報を3つの形式で書いてみる</h3>
                            <p>同じネットワーク機器の情報を、それぞれの形式で表現すると次のようになります。</p>

                            <p><strong>XML</strong></p>
                            <pre>
                                <code>
                                    <div className="code-line">&lt;device&gt;</div>
                                    <div className="code-line">  &lt;hostname&gt;Router1&lt;/hostname&gt;</div>
                                    <div className="code-line">  &lt;interface&gt;</div>
                                    <div className="code-line">    &lt;name&gt;GigabitEthernet0/1&lt;/name&gt;</div>
                                    <div className="code-line">    &lt;status&gt;up&lt;/status&gt;</div>
                                    <div className="code-line">  &lt;/interface&gt;</div>
                                    <div className="code-line">&lt;/device&gt;</div>
                                </code>
                            </pre>

                            <p><strong>JSON</strong></p>
                            <pre>
                                <code>
                                    <div className="code-line">{`{`}</div>
                                    <div className="code-line">{`  "hostname": "Router1",`}</div>
                                    <div className="code-line">{`  "interface": {`}</div>
                                    <div className="code-line">{`    "name": "GigabitEthernet0/1",`}</div>
                                    <div className="code-line">{`    "status": "up"`}</div>
                                    <div className="code-line">{`  }`}</div>
                                    <div className="code-line">{`}`}</div>
                                </code>
                            </pre>

                            <p><strong>YAML</strong></p>
                            <pre>
                                <code>
                                    <div className="code-line">hostname: Router1</div>
                                    <div className="code-line">interface:</div>
                                    <div className="code-line">  name: GigabitEthernet0/1</div>
                                    <div className="code-line">  status: up</div>
                                </code>
                            </pre>

                            <p>同じ内容でも、XMLはタグで、JSONは記号で、YAMLはインデントだけで階層構造を表現していることがわかります。</p>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>REST API（ドメイン2.0で詳しく学習）のやり取りは<strong>JSON</strong>が主流</li>
                                <li>Ansibleの設定ファイルやCisco NSOのモデルは<strong>YAML</strong>が主流</li>
                                <li>古いSOAPベースのAPIや一部のネットワーク機器の設定エクスポートには<strong>XML</strong>が使われることがある</li>
                                <li>試験では「どの形式が読みやすいか」「どの形式にコメントが書けるか」のような比較知識が問われやすい</li>
                            </ul>
                        </section>

                        {/* 4 */}
                        <section className="section" id="sec-4">
                            <div className="section-kicker">04 / 13 · 試験目標 1.2</div>
                            <h2>データフォーマットをPythonのデータ構造にパースする</h2>

                            <h3>「パース」とは何か</h3>
                            <p>
                                「パース（parse）」とは、テキストとして書かれたデータ（XML/JSON/YAML）を、プログラムが直接操作できるデータ構造（Pythonの{' '}
                                <code>dict</code> や <code>list</code> など）に変換する処理のことです。
                            </p>

                            <div className="diagram-frame">
                                <Diagram id="diag-2" label="テキストからPythonデータ構造へのパースの流れ" />
                            </div>
                            <p className="caption">図: テキストからPythonデータ構造へのパースの流れ</p>

                            <h3>JSONをパースする例</h3>
                            <pre>
                                <code>
                                    <div className="code-line">import json</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">raw_text = '&#123;"hostname": "Router1", "status": "up"&#125;'</div>
                                    <div className="code-line"></div>
                                    <div className="code-line"># JSON文字列 → Pythonのdict型に変換</div>
                                    <div className="code-line">parsed = json.loads(raw_text)</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">print(parsed["hostname"])   # Router1</div>
                                    <div className="code-line">print(type(parsed))         # &lt;class 'dict'&gt;</div>
                                </code>
                            </pre>

                            <h3>YAMLをパースする例</h3>
                            <pre>
                                <code>
                                    <div className="code-line">import yaml</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">with open("device.yaml") as f:</div>
                                    <div className="code-line">    config = yaml.safe_load(f)</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">print(config["hostname"])   # Router1</div>
                                    <div className="code-line">print(type(config))         # &lt;class 'dict'&gt;</div>
                                </code>
                            </pre>

                            <h3>XMLをパースする例</h3>
                            <pre>
                                <code>
                                    <div className="code-line">import xml.etree.ElementTree as ET</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">tree = ET.fromstring("&lt;device&gt;&lt;hostname&gt;Router1&lt;/hostname&gt;&lt;/device&gt;")</div>
                                    <div className="code-line">hostname = tree.find("hostname").text</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">print(hostname)              # Router1</div>
                                </code>
                            </pre>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>
                                    JSONとYAMLは、パースすると多くの場合{' '}
                                    <strong>Pythonの <code>dict</code>（辞書型）または <code>list</code>（リスト型）</strong> になる
                                </li>
                                <li>XMLはやや特殊で、<strong>ツリー構造（要素オブジェクト）</strong>としてパースされることが多い</li>
                                <li>
                                    試験では「このコードを実行した結果、変数の型は何になるか」といった読解問題が出やすいため、<code>type()</code> で型を確認する習慣をつけておくと良い
                                </li>
                            </ul>
                        </section>

                        {/* 5 */}
                        <section className="section" id="sec-5">
                            <div className="section-kicker">05 / 13 · 試験目標 1.3</div>
                            <h2>テスト駆動開発（TDD）の概念</h2>

                            <h3>TDDとは</h3>
                            <p>
                                テスト駆動開発（Test-Driven Development）とは、<strong>「実装コードを書く前に、まずテストコードを書く」</strong>という開発スタイルです。一般的に次の3ステップを繰り返します。
                            </p>

                            <div className="diagram-frame">
                                <Diagram id="diag-3" label="Red → Green → Refactor のサイクル" />
                            </div>
                            <p className="caption">図: Red → Green → Refactor のサイクル</p>

                            <h3>コード例で見るTDDの流れ</h3>
                            <pre>
                                <code>
                                    <div className="code-line"># ① Red: 先にテストを書く（この時点ではadd関数は存在しないので失敗する）</div>
                                    <div className="code-line">def test_add():</div>
                                    <div className="code-line">    assert add(2, 3) == 5</div>
                                    <div className="code-line"></div>
                                    <div className="code-line"># ② Green: テストが通る最小限の実装を書く</div>
                                    <div className="code-line">def add(a, b):</div>
                                    <div className="code-line">    return a + b</div>
                                    <div className="code-line"></div>
                                    <div className="code-line"># ③ Refactor: 必要であれば、動作を変えずにコードを整理する</div>
                                    <div className="code-line">#    （このシンプルな例ではこれ以上の改善は不要）</div>
                                </code>
                            </pre>

                            <h3>なぜTDDが重要なのか</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">メリット</th>
                                            <th scope="col">説明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>仕様の明確化</td>
                                            <td>「何ができれば正しいか」を先に定義するため、実装の目的がぶれにくい</td>
                                        </tr>
                                        <tr>
                                            <td>安心してリファクタリングできる</td>
                                            <td>テストがあることで、後からコードを変更しても壊れていないか即座に確認できる</td>
                                        </tr>
                                        <tr>
                                            <td>自動化との相性</td>
                                            <td>ネットワーク自動化スクリプトも、意図しない設定変更を防ぐためにテストが重要</td>
                                        </tr>
                                        <tr>
                                            <td>バグの早期発見</td>
                                            <td>実装直後にテストを実行するため、問題を早い段階で見つけられる</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>試験で問われるのは実装力そのものよりも<strong>「TDDという考え方・サイクルを説明できるか」</strong>という概念理解</li>
                                <li>Red → Green → Refactor の順番と、それぞれの段階で何をするかを覚えておく</li>
                            </ul>
                        </section>

                        {/* 6 */}
                        <section className="section" id="sec-6">
                            <div className="section-kicker">06 / 13 · 試験目標 1.4</div>
                            <h2>ソフトウェア開発手法の比較（Agile / Lean / Waterfall）</h2>

                            <h3>3つの開発手法の比較表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">Waterfall</th>
                                            <th scope="col">Agile</th>
                                            <th scope="col">Lean</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>進め方</td>
                                            <td>要件定義→設計→実装→テスト→リリースを一方向に進める</td>
                                            <td>短い反復（スプリント）を繰り返しながら少しずつ完成させる</td>
                                            <td>無駄を徹底的に排除し、価値の提供に集中する</td>
                                        </tr>
                                        <tr>
                                            <td>変更への強さ</td>
                                            <td>弱い（後工程での仕様変更がしにくい）</td>
                                            <td>強い（都度フィードバックを反映できる）</td>
                                            <td>強い（継続的な改善を前提とする）</td>
                                        </tr>
                                        <tr>
                                            <td>ドキュメント量</td>
                                            <td>事前に詳細な文書を作成する</td>
                                            <td>必要最小限、動くソフトウェアを重視</td>
                                            <td>必要な分だけ、ムダな文書は作らない</td>
                                        </tr>
                                        <tr>
                                            <td>向いている場面</td>
                                            <td>要件が最初から固まっている大規模プロジェクト</td>
                                            <td>要件変化が多いプロダクト開発、スタートアップ</td>
                                            <td>製造業由来の考え方をITに応用したい場合</td>
                                        </tr>
                                        <tr>
                                            <td>キーワード</td>
                                            <td>フェーズ、マイルストーン</td>
                                            <td>スプリント、イテレーション、ふりかえり</td>
                                            <td>カイゼン、ムダの排除、価値の流れ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>フローで見る違い</h3>
                            <div className="diagram-frame">
                                <Diagram id="diag-4" label="Waterfall（直線的）とAgile（反復的）の進み方の違い" />
                            </div>
                            <p className="caption">図: Waterfall（直線的）とAgile（反復的）の進み方の違い</p>

                            <p>
                                Waterfallは前の工程が終わってから次に進む「一方通行」のイメージ、Agileは短いサイクルを何度も回しながら少しずつ機能を追加していく「反復」のイメージです。
                            </p>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>「後戻りしにくいのはどれか」「短いサイクルで開発するのはどれか」のような特徴のマッチングが出題されやすい</li>
                                <li>Leanは「開発プロセスそのもの」というより「ムダを減らす考え方」である点がAgileとの違い</li>
                            </ul>
                        </section>

                        {/* 7 */}
                        <section className="section" id="sec-7">
                            <div className="section-kicker">07 / 13 · 試験目標 1.5</div>
                            <h2>コードを関数・クラス・モジュールに整理する利点</h2>

                            <h3>なぜコードを整理するのか</h3>
                            <p>
                                自動化スクリプトが数行で済むうちは良いですが、規模が大きくなるとコードを整理する仕組みが必要になります。Pythonでは主に3段階の単位でコードを整理します。
                            </p>

                            <div className="diagram-frame">
                                <Diagram id="diag-5" label="モジュール・クラス・メソッドの階層関係" />
                            </div>
                            <p className="caption">図: モジュール・クラス・メソッドの階層関係</p>

                            <h3>それぞれの単位と利点</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">単位</th>
                                            <th scope="col">説明</th>
                                            <th scope="col">主な利点</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>関数（Function）</td>
                                            <td>特定の処理をひとまとまりにしたもの</td>
                                            <td>同じ処理を何度も書かずに再利用できる／処理の意図が名前からわかる</td>
                                        </tr>
                                        <tr>
                                            <td>クラス（Class）</td>
                                            <td>データ（属性）と処理（メソッド）をひとまとめにした設計図</td>
                                            <td>関連する状態と振る舞いをまとめて管理できる／複数のインスタンスを独立して扱える</td>
                                        </tr>
                                        <tr>
                                            <td>モジュール（Module）</td>
                                            <td>関数やクラスをまとめた1つのファイル（または複数ファイルのパッケージ）</td>
                                            <td>機能ごとにファイルを分割できる／他のスクリプトから <code>import</code> して再利用できる</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>コード例</h3>
                            <pre>
                                <code>
                                    <div className="code-line"># config_utils.py というモジュールの中に、</div>
                                    <div className="code-line"># ConfigParserというクラスを定義する例</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">class ConfigParser:</div>
                                    <div className="code-line">    def __init__(self, filepath):</div>
                                    <div className="code-line">        self.filepath = filepath</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">    def load_yaml(self):</div>
                                    <div className="code-line">        import yaml</div>
                                    <div className="code-line">        with open(self.filepath) as f:</div>
                                    <div className="code-line">            return yaml.safe_load(f)</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">    def get_hostname(self, config):</div>
                                    <div className="code-line">        return config.get("hostname")</div>
                                </code>
                            </pre>

                            <pre>
                                <code>
                                    <div className="code-line"># 別のスクリプトから再利用する</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">from config_utils import ConfigParser</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">parser = ConfigParser("device.yaml")</div>
                                    <div className="code-line">config = parser.load_yaml()</div>
                                    <div className="code-line">print(parser.get_hostname(config))</div>
                                </code>
                            </pre>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>「関数＝処理のまとまり」「クラス＝データと処理のまとまり」「モジュール＝ファイル単位のまとまり」という粒度の違いを整理して覚える</li>
                                <li>目的は一貫して<strong>再利用性・可読性・保守性の向上</strong>であることを押さえておく</li>
                            </ul>
                        </section>

                        {/* 8 */}
                        <section className="section" id="sec-8">
                            <div className="section-kicker">08 / 13 · 試験目標 1.6</div>
                            <h2>代表的なデザインパターン（MVCとObserver）</h2>
                            <p>
                                デザインパターンとは、ソフトウェア設計でよく出会う問題に対する「定石（型）」のことです。試験では <strong>MVC</strong> と <strong>Observer</strong> の2つが対象です。
                            </p>

                            <h3>MVCパターン</h3>
                            <p>MVCは「Model（データとロジック）」「View（画面表示）」「Controller（入力の処理）」の3つの役割にコードを分離する設計パターンです。</p>

                            <div className="diagram-frame">
                                <Diagram id="diag-6" label="MVCパターンにおける3つの役割の関係" />
                            </div>
                            <p className="caption">図: MVCパターンにおける3つの役割の関係</p>

                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">役割</th>
                                            <th scope="col">説明</th>
                                            <th scope="col">ネットワーク自動化での例</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Model</td>
                                            <td>データそのものと、それを扱うロジック</td>
                                            <td>機器のステータス情報、設定データ</td>
                                        </tr>
                                        <tr>
                                            <td>View</td>
                                            <td>ユーザーに見える部分</td>
                                            <td>ダッシュボードの画面、CLIの出力</td>
                                        </tr>
                                        <tr>
                                            <td>Controller</td>
                                            <td>ユーザーの入力を受けてModelを更新する</td>
                                            <td>Webhookを受け取り処理を振り分ける部分</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>
                                <strong>利点</strong>：役割ごとにコードが分離されているため、画面デザインだけを変更したい場合でもロジックに手を入れずに済む、といった<strong>保守性・拡張性の高さ</strong>が得られます。
                            </p>

                            <h3>Observerパターン</h3>
                            <p>
                                Observerパターンは、ある対象（Subject）の状態が変化したときに、それを購読している複数の相手（Observer）へ自動的に通知する設計パターンです。
                            </p>

                            <div className="diagram-frame">
                                <Diagram id="diag-7" label="Observerパターンの通知の流れ" />
                            </div>
                            <p className="caption">図: Observerパターンの通知の流れ</p>

                            <p>
                                <strong>利点</strong>：通知する側（Subject）は「誰が見ているか」を細かく意識せずに済み、新しいObserverを追加してもSubject側のコードを変更する必要がありません。ネットワーク自動化では、機器の状態変化をWebhookで複数のシステムに通知する仕組みなどがこの考え方に近いパターンです。
                            </p>

                            <pre>
                                <code>
                                    <div className="code-line">class Subject:</div>
                                    <div className="code-line">    def __init__(self):</div>
                                    <div className="code-line">        self._observers = []</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">    def subscribe(self, observer):</div>
                                    <div className="code-line">        self._observers.append(observer)</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">    def notify(self, event):</div>
                                    <div className="code-line">        for observer in self._observers:</div>
                                    <div className="code-line">            observer.update(event)</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">class LogObserver:</div>
                                    <div className="code-line">    def update(self, event):</div>
                                    <div className="code-line">        print(f"ログに記録: &#123;event&#125;")</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">class AlertObserver:</div>
                                    <div className="code-line">    def update(self, event):</div>
                                    <div className="code-line">        print(f"アラート送信: &#123;event&#125;")</div>
                                    <div className="code-line"></div>
                                    <div className="code-line">subject = Subject()</div>
                                    <div className="code-line">subject.subscribe(LogObserver())</div>
                                    <div className="code-line">subject.subscribe(AlertObserver())</div>
                                    <div className="code-line">subject.notify("インターフェースがダウンしました")</div>
                                </code>
                            </pre>

                            <h3>2つのパターンの比較</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">パターン</th>
                                            <th scope="col">目的</th>
                                            <th scope="col">主な構成要素</th>
                                            <th scope="col">典型的な利用例</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>MVC</td>
                                            <td>画面・ロジック・データを分離し保守性を高める</td>
                                            <td>Model / View / Controller</td>
                                            <td>Web管理画面、監視ダッシュボード</td>
                                        </tr>
                                        <tr>
                                            <td>Observer</td>
                                            <td>状態変化を複数の相手に自動で伝える</td>
                                            <td>Subject（発行者）/ Observer（購読者）</td>
                                            <td>イベント通知、Webhook、GUIのイベント処理</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>「役割を分離するのはどちらか」＝MVC、「変化を通知するのはどちらか」＝Observer、という対応を覚える</li>
                                <li>試験では実装の細部よりも「なぜこのパターンを使う利点があるのか」という設計意図の理解が問われる</li>
                            </ul>
                        </section>

                        {/* 9 */}
                        <section className="section" id="sec-9">
                            <div className="section-kicker">09 / 13 · 試験目標 1.7</div>
                            <h2>バージョン管理の利点</h2>

                            <h3>バージョン管理とは</h3>
                            <p>
                                バージョン管理システム（Version Control System, VCS）は、ファイルの変更履歴を記録し、いつ・誰が・何を変更したかを追跡できる仕組みです。Gitはその代表例です。
                            </p>

                            <h3>なぜ必要なのか</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">課題</th>
                                            <th scope="col">バージョン管理がない場合</th>
                                            <th scope="col">バージョン管理がある場合</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>変更履歴の把握</td>
                                            <td><code>config_final_v2_本当に最終.yaml</code> のようなファイル名で管理しがち</td>
                                            <td>いつ・誰が・なぜ変更したかがコミット履歴として残る</td>
                                        </tr>
                                        <tr>
                                            <td>複数人での共同作業</td>
                                            <td>上書き事故や作業の衝突が起きやすい</td>
                                            <td>ブランチで作業を分離し、あとでマージできる</td>
                                        </tr>
                                        <tr>
                                            <td>問題発生時の切り戻し</td>
                                            <td>どこまで戻せば良いか分からない</td>
                                            <td>特定のコミットまで簡単に戻せる</td>
                                        </tr>
                                        <tr>
                                            <td>変更内容の説明</td>
                                            <td>「何を変えたか」を口頭やメモに頼る</td>
                                            <td><code>diff</code> で変更差分を正確に確認できる</td>
                                        </tr>
                                        <tr>
                                            <td>監査・レビュー</td>
                                            <td>変更の妥当性を後から検証しにくい</td>
                                            <td>コミット単位でレビューでき、変更理由も記録に残る</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>ネットワーク自動化での重要性</h3>
                            <p>
                                ネットワーク機器の設定（YAML/JSONで表現された「インフラのコード」）をGitで管理することで、<strong>「いつ・誰が・どの設定をどう変えたか」を追跡できる</strong>ようになります。これは、インフラをコードとして扱う考え方（Infrastructure as Code）の土台にもなる重要な概念です。
                            </p>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>「変更履歴の追跡」「共同作業の容易化」「切り戻しの容易さ」「変更内容の可視化」の4点が代表的な利点</li>
                                <li>試験では「バージョン管理がなぜ重要か」という理由を説明できるかが問われる</li>
                            </ul>
                        </section>

                        {/* 10 */}
                        <section className="section" id="sec-10">
                            <div className="section-kicker">10 / 13 · 試験目標 1.8</div>
                            <h2>Gitの基本操作</h2>

                            <h3>Gitにおける4つの領域</h3>
                            <p>Gitの操作を理解するには、まず「データがどこにあるか」という4つの領域を押さえることが近道です。</p>

                            <div className="diagram-frame">
                                <Diagram id="diag-8" label="作業ディレクトリからリモートリポジトリまでの4つの領域" />
                            </div>
                            <p className="caption">図: 作業ディレクトリからリモートリポジトリまでの4つの領域</p>

                            <h3>各コマンドの役割</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">コマンド</th>
                                            <th scope="col">目的</th>
                                            <th scope="col">動きのイメージ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>git clone &lt;url&gt;</code></td>
                                            <td>リモートリポジトリを丸ごと自分のPCに複製する</td>
                                            <td>リモート → ローカル（新規取得）</td>
                                        </tr>
                                        <tr>
                                            <td><code>git add &lt;file&gt;</code></td>
                                            <td>変更をステージングエリアに追加する</td>
                                            <td>作業ディレクトリ → ステージング</td>
                                        </tr>
                                        <tr>
                                            <td><code>git rm &lt;file&gt;</code></td>
                                            <td>ファイルを追跡対象から削除する</td>
                                            <td>作業ディレクトリ／ステージング</td>
                                        </tr>
                                        <tr>
                                            <td><code>git commit -m "..."</code></td>
                                            <td>ステージング内容をローカルの履歴として記録する</td>
                                            <td>ステージング → ローカルリポジトリ</td>
                                        </tr>
                                        <tr>
                                            <td><code>git push</code></td>
                                            <td>ローカルの変更をリモートへ反映する</td>
                                            <td>ローカル → リモート</td>
                                        </tr>
                                        <tr>
                                            <td><code>git pull</code></td>
                                            <td>リモートの変更を取得し、ローカルに反映する</td>
                                            <td>リモート → ローカル</td>
                                        </tr>
                                        <tr>
                                            <td><code>git branch &lt;name&gt;</code></td>
                                            <td>新しい作業の分岐（ブランチ）を作成する</td>
                                            <td>ローカルリポジトリ内</td>
                                        </tr>
                                        <tr>
                                            <td><code>git merge &lt;branch&gt;</code></td>
                                            <td>別ブランチの変更を現在のブランチに取り込む</td>
                                            <td>ローカルリポジトリ内</td>
                                        </tr>
                                        <tr>
                                            <td><code>git diff</code></td>
                                            <td>変更差分を確認する</td>
                                            <td>任意の2つの状態間の比較</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>ブランチとマージのイメージ</h3>
                            <p>新しい機能はいきなり本流（main）に手を入れず、専用のブランチを作って作業するのが一般的です。</p>

                            <div className="diagram-frame">
                                <Diagram id="diag-9" label="ブランチの分岐とマージのイメージ" />
                            </div>
                            <p className="caption">図: ブランチの分岐とマージのイメージ</p>

                            <h3>コンフリクト（衝突）が起きたら</h3>
                            <p>
                                同じ箇所を別々のブランチで変更していると、マージ時に「コンフリクト」が発生します。Gitは競合箇所を次のような目印つきでファイルに書き込むので、どちらを残すか（または両方を活かすか）を手動で判断して解消します。
                            </p>

                            <pre>
                                <code>
                                    <div className="code-line">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
                                    <div className="code-line">（現在のブランチでの変更内容）</div>
                                    <div className="code-line">=======</div>
                                    <div className="code-line">（マージしようとしているブランチでの変更内容）</div>
                                    <div className="code-line">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-branch</div>
                                </code>
                            </pre>

                            <p>解消手順の流れは次の通りです。</p>

                            <div className="diagram-frame">
                                <Diagram id="diag-10" label="マージコンフリクト解消の流れ" />
                            </div>
                            <p className="caption">図: マージコンフリクト解消の流れ</p>

                            <h3>diffで差分を確認する</h3>
                            <pre>
                                <code>
                                    <div className="code-line">git diff</div>
                                </code>
                            </pre>

                            <pre>
                                <code>
                                    <div className="code-line">- hostname: Router1</div>
                                    <div className="code-line">+ hostname: Router1-Core</div>
                                </code>
                            </pre>

                            <p>
                                <code>-</code> が削除された行、<code>+</code> が追加された行を示し、変更内容を一目で確認できます。
                            </p>

                            <h3>学習のポイント</h3>
                            <ul>
                                <li>各コマンドが「Gitの4つの領域のうち、どこからどこへデータを動かすものか」を対応づけて覚える</li>
                                <li>
                                    <code>merge</code> でコンフリクトが起きた場合の対処の流れ（手動編集 → <code>add</code> → <code>commit</code>）は特に問われやすい
                                </li>
                                <li><code>diff</code> は「変更前後の差分を可視化するもの」という位置づけを理解しておく</li>
                            </ul>
                        </section>

                        {/* 11 */}
                        <section className="section" id="sec-11">
                            <div className="section-kicker">11 / 13</div>
                            <h2>実践シナリオでつなげて理解する</h2>
                            <p>ここまで学んだ8つの項目は、実際の自動化業務では次のように連携して使われます。</p>

                            <div className="diagram-frame">
                                <Diagram id="diag-11" label="ソフトウェア開発と設計 8項目の実践フロー" />
                            </div>
                            <p className="caption">図: ソフトウェア開発と設計 8項目の実践フロー</p>

                            <p>
                                このように、「1.0 ソフトウェア開発と設計」の8項目は独立した知識ではなく、
                                <strong>現場の自動化スクリプト1本を作るまでの一連の流れ</strong>を分解したものだと捉えると理解しやすくなります。
                            </p>
                        </section>

                        {/* 12 */}
                        <section className="section" id="sec-12">
                            <div className="section-kicker">12 / 13</div>
                            <h2>学習チェックリスト・理解度クイズ</h2>

                            <h3>チェックリスト</h3>
                            <ul className="checklist">
                                <li>XML・JSON・YAMLの違いを、コメントの可否・読みやすさの観点で説明できる</li>
                                <li>JSON/YAML/XMLをパースした結果、Pythonでどのようなデータ型になるか説明できる</li>
                                <li>TDDのRed→Green→Refactorのサイクルを説明できる</li>
                                <li>Waterfall・Agile・Leanの特徴の違いを説明できる</li>
                                <li>関数・クラス・モジュールそれぞれの役割と利点を説明できる</li>
                                <li>MVCパターンの3つの役割と、Observerパターンの仕組みを説明できる</li>
                                <li>バージョン管理がもたらす4つの利点を説明できる</li>
                                <li>
                                    <code>clone</code> / <code>add</code> / <code>commit</code> / <code>push</code> / <code>pull</code> / <code>branch</code> / <code>merge</code> / <code>diff</code> の役割をそれぞれ説明できる
                                </li>
                            </ul>

                            <h3>理解度クイズ（簡易）</h3>

                            <details>
                                <summary>Q1. コメントを書けるデータフォーマットはどれ？</summary>
                                <p>
                                    YAMLです。<code>#</code> を使ってコメントを記述できます。JSONとXML（標準）ではコメントは書けません。
                                </p>
                            </details>

                            <details>
                                <summary>Q2. TDDで最初に行うのはどのステップ？</summary>
                                <p>Red（失敗するテストを先に書く）です。実装よりも先にテストを書く点がTDDの特徴です。</p>
                            </details>

                            <details>
                                <summary>Q3. 短い反復（スプリント）を繰り返す開発手法はどれ？</summary>
                                <p>
                                    Agile（アジャイル）です。Waterfallは一方向に進む手法、Leanはムダの排除に主眼を置いた考え方です。
                                </p>
                            </details>

                            <details>
                                <summary>Q4. 画面表示・入力処理・データを3つの役割に分離するデザインパターンはどれ？</summary>
                                <p>
                                    MVC（Model・View・Controller）です。状態変化を複数の相手に自動通知するのはObserverパターンです。
                                </p>
                            </details>

                            <details>
                                <summary>Q5. マージ時にコンフリクトが発生した場合、次に行うべき操作の順番は？</summary>
                                <p>
                                    競合箇所を手動で編集して解決する → <code>git add</code> で解決済みとしてマークする → <code>git commit</code> でマージを確定する、の順番です。
                                </p>
                            </details>
                        </section>

                        {/* 13 */}
                        <section className="section" id="sec-13">
                            <div className="section-kicker">13 / 13</div>
                            <h2>参考ソース</h2>
                            <p>本ドキュメントの試験概要・試験ドメイン構成・出題比率は、以下のCisco公式ページおよび公式PDFの公開情報に基づいています。</p>

                            <ul className="source-list">
                                <li>
                                    <a
                                        href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        CCNA Automation Certification（Cisco公式）
                                    </a>
                                    <br />
                                    認定資格の概要ページ
                                </li>
                                <li>
                                    <a
                                        href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        CCNA Automation Exam and Training（Cisco公式）
                                    </a>
                                    <br />
                                    対応するコア試験（200-901 CCNAAUTO）の情報ページ
                                </li>
                                <li>
                                    <a
                                        href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Automating Networks Using Cisco Platforms v1.1（200-901）試験トピックPDF（Cisco公式）
                                    </a>
                                    <br />
                                    「1.0 Software Development and Design」を含む全6ドメインの詳細な出題トピック一覧・出題比率の一次情報
                                </li>
                            </ul>

                            <p>
                                技術的な用語・概念（データ形式、デザインパターン、Git等）の解説にあたっては、下記のような一般的に広く参照される技術資料も参考にしています。個別の技術仕様の最新情報は、それぞれの公式ドキュメントも合わせてご確認ください。
                            </p>

                            <ul className="source-list">
                                <li>
                                    <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer">
                                        Git公式ドキュメント
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.json.org/json-ja.html" target="_blank" rel="noopener noreferrer">
                                        JSON仕様
                                    </a>
                                </li>
                                <li>
                                    <a href="https://yaml.org/" target="_blank" rel="noopener noreferrer">
                                        YAML仕様
                                    </a>
                                </li>
                                <li>
                                    <a href="https://agilemanifesto.org/iso/ja/manifesto.html" target="_blank" rel="noopener noreferrer">
                                        Agile Manifesto（アジャイルソフトウェア開発宣言）
                                    </a>
                                </li>
                            </ul>

                            <p className="disclaimer">
                                本ドキュメントは学習補助を目的とした非公式資料です。試験内容は予告なく変更される場合があるため、受験前に必ずCisco公式サイトで最新の試験トピックをご確認ください。
                            </p>
                        </section>
                    </article>
                </main>
            </div>
        </div>
    );
}
