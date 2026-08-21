import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

/**
 * Renders a Mermaid diagram identified by its registry key.
 *
 * @param id - The diagram identifier used to look up the chart.
 * @param label - The accessible label for the rendered diagram.
 * @returns The diagram wrapper, or `null` when no chart matches the identifier.
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" data-diagram-id={id}>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

/**
 * Renders a Japanese study guide covering the CCNA Automation 200-901 exam's Application Deployment and Security domain.
 */
export function CcnaAppDeploymentSecurityGuide() {
    return (
        <div className="ccna-app-deployment-security-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    <div className="content-inner">
                    <header className="hero">
                        <div className="hero-eyebrow">CCNA Automation Certification ガイド</div>
                        <h1>
                            200-901 CCNAAUTO ドメイン4.0<br />Application Deployment and Security
                            完全解説
                        </h1>
                        <p className="hero-description">
                            Cisco公式サイトおよび公式出題範囲PDFをもとに、CCNA
                            Automation認定試験「Automating Networks Using Cisco Platforms v1.1（200-901
                            CCNAAUTO）」の6ドメインのうち、<strong
                            >ドメイン4.0「Application Deployment and
                            Security（アプリケーションの展開とセキュリティ）」</strong
                        >（配点15%）を、初学者でも理解できるようにステップバイステップで解説します。
                        </p>
                        <div className="badge-row">
                            <span className="badge">配点 15%</span>
                            <span className="badge">サブトピック 4.1〜4.12</span>
                            <span className="badge">試験時間 120分</span>
                            <span className="badge">対応言語：英語・日本語</span>
                        </div>
                    </header>

                    <div className="callout">
                        <div className="callout-title">このガイドの使い方</div>
                        <p>
                            各章は試験ガイドのサブトピック番号（4.1、4.2…）に対応しています。前提知識としてPythonの基礎、Linux/Bashの基本操作、Dockerの概念に軽く触れたことがあると理解がスムーズですが、未経験でも読み進められるように用語から説明しています。各章末の「この章のポイント」と、最後の第12章の早見表を試験直前の見直しに活用してください。
                        </p>
                    </div>

                    {/* 第1章 */}
                    <section id="chapter1" className="section-block">
                        <h2>第1章 出題範囲の全体像</h2>
                        <p>
                            CCNA Automation認定を取得するには、120分の試験「200-901
                            CCNAAUTO」に合格する必要があります。この試験は6つのドメインで構成されており、それぞれに配点比率が設定されています。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ドメイン番号</th>
                                        <th scope="col">ドメイン名</th>
                                        <th scope="col">配点比率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.0</td>
                                        <td>Software Development and Design（ソフトウェア開発と設計）</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td>2.0</td>
                                        <td>Understanding and Using APIs（APIの理解と利用）</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>3.0</td>
                                        <td>
                                            Cisco Platforms and Development（Ciscoプラットフォームと開発）
                                        </td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>4.0</strong></td>
                                        <td>
                                            <strong
                                            >Application Deployment and
                                            Security（アプリケーションの展開とセキュリティ）</strong
                                        >
                                        </td>
                                        <td><strong>15%</strong></td>
                                    </tr>
                                    <tr>
                                        <td>5.0</td>
                                        <td>
                                            Infrastructure and Automation（インフラストラクチャと自動化）
                                        </td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>6.0</td>
                                        <td>Network Fundamentals（ネットワークの基礎）</td>
                                        <td>15%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            本ガイドが扱うドメイン4.0は、<strong>「作ったアプリケーションをどこに・どうやって・安全に動かすか」</strong>という、開発から運用への橋渡しにあたる領域です。具体的には以下の12個のサブトピックで構成されます。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サブトピック</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>4.1</td>
                                        <td>エッジコンピューティングの利点を説明する</td>
                                    </tr>
                                    <tr>
                                        <td>4.2</td>
                                        <td>
                                            異なるアプリケーション展開モデル（プライベートクラウド、パブリッククラウド、ハイブリッドクラウド、エッジ）の属性を説明する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.3</td>
                                        <td>
                                            展開タイプ（仮想マシン／ベアメタル／コンテナ）の属性を説明する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.4</td>
                                        <td>
                                            アプリケーション展開におけるCI/CDパイプラインの構成要素を説明する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.5</td>
                                        <td>Pythonのユニットテストを構築する</td>
                                    </tr>
                                    <tr>
                                        <td>4.6</td>
                                        <td>Dockerfileの内容を解釈する</td>
                                    </tr>
                                    <tr>
                                        <td>4.7</td>
                                        <td>ローカル開発環境でDockerイメージを利用する</td>
                                    </tr>
                                    <tr>
                                        <td>4.8</td>
                                        <td>
                                            シークレット保護、暗号化（保存時・転送時）、データ取り扱いに関するアプリケーションセキュリティの課題を説明する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.9</td>
                                        <td>
                                            ファイアウォール、DNS、ロードバランサー、リバースプロキシのアプリケーション展開における役割を説明する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.10</td>
                                        <td>
                                            OWASPのトップ脅威（XSS、SQLインジェクション、CSRFなど）を説明する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.11</td>
                                        <td>
                                            Bashコマンド（ファイル管理、ディレクトリ操作、環境変数）を利用する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.12</td>
                                        <td>DevOpsプラクティスの原則を説明する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>このドメイン全体の位置づけを図にすると次のとおりです。</p>

                        <Diagram id="diag-0" label="CCNAAUTO試験ドメインとドメイン4.0" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                ドメイン4.0は試験全体の15%を占め、「開発したアプリをどこでどう動かし、どう守るか」を扱う。12個のサブトピックは、大きく「展開モデル・展開先の選定（4.1〜4.3）」「CI/CDと自動テスト（4.4・4.5）」「コンテナ実務（4.6・4.7）」「セキュリティ（4.8〜4.10）」「運用スキル（4.11・4.12）」の5グループに整理できる。
                            </p>
                        </div>
                    </section>

                    {/* 第2章 */}
                    <section id="chapter2" className="section-block">
                        <h2>第2章 エッジコンピューティングとアプリケーション展開モデル（4.1・4.2）</h2>

                        <h3>4.1 エッジコンピューティングの利点</h3>
                        <p>
                            エッジコンピューティングとは、データを中央のクラウドやデータセンターまで送らず、<strong>データが発生する場所（ネットワークの「端＝エッジ」）に近い場所で処理する</strong>という考え方です。工場のセンサー、店舗のPOSレジ、IoTデバイスなどが典型例です。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">利点</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>低遅延（レイテンシ削減）</td>
                                        <td>
                                            クラウドまでの往復通信が不要になり、リアルタイム性が向上する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>帯域幅の節約</td>
                                        <td>
                                            現地で処理・要約してから必要なデータだけをクラウドに送るため、通信量を削減できる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>オフライン耐性</td>
                                        <td>クラウドとの接続が一時的に切れても現地で処理を継続できる</td>
                                    </tr>
                                    <tr>
                                        <td>データローカリティ／プライバシー</td>
                                        <td>
                                            機密データを現地にとどめたまま処理でき、規制対応がしやすい場合がある
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.2 アプリケーション展開モデルの比較</h3>
                        <p>
                            アプリケーションをどこで動かすかという「展開モデル」には、主に次の4種類があります。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">展開モデル</th>
                                        <th scope="col">管理主体</th>
                                        <th scope="col">主な特徴</th>
                                        <th scope="col">典型的な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>プライベートクラウド</td>
                                        <td>自社（または委託先が自社専用に構築）</td>
                                        <td>
                                            自由度が高く、既存のセキュリティ・コンプライアンス要件に合わせやすいが、初期投資と運用負荷が大きい
                                        </td>
                                        <td>金融・医療など規制が厳しい業界の基幹システム</td>
                                    </tr>
                                    <tr>
                                        <td>パブリッククラウド</td>
                                        <td>クラウド事業者（AWS、Azure、Google Cloudなど）</td>
                                        <td>
                                            従量課金で始めやすく、拡張性が高いが、事業者のインフラに依存する
                                        </td>
                                        <td>Webサービス、需要変動の大きいアプリケーション</td>
                                    </tr>
                                    <tr>
                                        <td>ハイブリッドクラウド</td>
                                        <td>自社とクラウド事業者の組み合わせ</td>
                                        <td>
                                            機密データはプライベート側、負荷変動の大きい処理はパブリック側、というように使い分けられる
                                        </td>
                                        <td>既存の社内システムとクラウドサービスを連携させたい企業</td>
                                    </tr>
                                    <tr>
                                        <td>エッジ</td>
                                        <td>現地（店舗・工場・デバイス側）</td>
                                        <td>クラウドに比べて計算資源は限られるが、低遅延処理が可能</td>
                                        <td>IoT、産業オートメーション、リアルタイム映像解析</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>これらの関係をフローで示すと次のようになります。</p>
                        <Diagram id="diag-1" label="エッジとクラウド展開モデルの関係" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                エッジコンピューティングの利点は「低遅延・帯域節約・オフライン耐性・データローカリティ」の4つに集約できる。展開モデルは「誰が管理するか」「どこにデータ・計算資源があるか」で分類され、要件（コスト・拡張性・規制・遅延）に応じて選択する。
                            </p>
                        </div>
                    </section>

                    {/* 第3章 */}
                    <section id="chapter3" className="section-block">
                        <h2>第3章 アプリケーション実行環境の比較：VM・ベアメタル・コンテナ（4.3）</h2>
                        <p>
                            展開モデル（どこで動かすか）が決まったら、次は「どの単位でアプリケーションをパッケージ化して動かすか」を選びます。試験ガイドでは以下の3タイプが挙げられています。
                        </p>
                        <ul>
                            <li>4.3.a 仮想マシン（Virtual Machine）</li>
                            <li>4.3.b ベアメタル（Bare Metal）</li>
                            <li>4.3.c コンテナ（Container）</li>
                        </ul>

                        <h3>3つの実行環境の構造比較</h3>
                        <Diagram id="diag-2" label="ベアメタル・仮想マシン・コンテナの構造比較" />

                        <h3>属性比較表</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">ベアメタル</th>
                                        <th scope="col">仮想マシン（VM）</th>
                                        <th scope="col">コンテナ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>分離レベル</td>
                                        <td>物理サーバー単位（最も高い）</td>
                                        <td>ハイパーバイザーによるハードウェアレベルの分離</td>
                                        <td>OSカーネルを共有するプロセスレベルの分離</td>
                                    </tr>
                                    <tr>
                                        <td>起動速度</td>
                                        <td>サーバーの起動時間に依存（遅い）</td>
                                        <td>数十秒〜数分</td>
                                        <td>数百ミリ秒〜数秒（非常に速い）</td>
                                    </tr>
                                    <tr>
                                        <td>リソースオーバーヘッド</td>
                                        <td>なし（すべての資源を占有）</td>
                                        <td>大きい（ゲストOSごとに必要）</td>
                                        <td>小さい（OSを共有するため軽量）</td>
                                    </tr>
                                    <tr>
                                        <td>移植性（ポータビリティ）</td>
                                        <td>低い（ハードウェアに強く依存）</td>
                                        <td>中程度（イメージ化して移動可能）</td>
                                        <td>高い（同じイメージがどこでも同じ動作）</td>
                                    </tr>
                                    <tr>
                                        <td>主なユースケース</td>
                                        <td>高いパフォーマンスが必須の基幹システム、レガシーアプリ</td>
                                        <td>複数OSの混在環境、既存VM資産の活用</td>
                                        <td>マイクロサービス、CI/CDでの高速な使い捨て環境</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                分離の強さと起動の速さはトレードオフの関係にある：ベアメタル・VMは分離が強いが重く、コンテナは軽量だがOSカーネルを共有する。コンテナはCI/CDやマイクロサービスとの相性が良く、次章のCI/CDパイプラインとも密接に関係する。
                            </p>
                        </div>
                    </section>

                    {/* 第4章 */}
                    <section id="chapter4" className="section-block">
                        <h2>第4章 CI/CDパイプラインの基礎（4.4）</h2>
                        <p>
                            CI/CD（Continuous Integration / Continuous Delivery（or
                            Deployment）＝継続的インテグレーション／継続的デリバリー（デプロイ））は、コードの変更を自動的にビルド・テスト・展開するための仕組みです。
                        </p>

                        <h3>CI/CDパイプラインの主な構成要素</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステージ</th>
                                        <th scope="col">目的</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ソース管理（Git等）</td>
                                        <td>
                                            コードの変更履歴を管理し、変更をトリガーにパイプラインを起動する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ビルド</td>
                                        <td>依存関係の解決、コンパイル、静的解析などを行う</td>
                                    </tr>
                                    <tr>
                                        <td>テスト</td>
                                        <td>ユニットテスト・統合テストなどを自動実行し、品質を検証する</td>
                                    </tr>
                                    <tr>
                                        <td>パッケージング／アーティファクト作成</td>
                                        <td>コンテナイメージなど、展開可能な成果物を作成する</td>
                                    </tr>
                                    <tr>
                                        <td>レジストリへの登録</td>
                                        <td>作成した成果物をイメージレジストリなどに格納する</td>
                                    </tr>
                                    <tr>
                                        <td>ステージング展開</td>
                                        <td>本番相当の環境に自動展開し、追加検証を行う</td>
                                    </tr>
                                    <tr>
                                        <td>本番展開</td>
                                        <td>承認を経て本番環境に展開する</td>
                                    </tr>
                                    <tr>
                                        <td>監視・フィードバック</td>
                                        <td>稼働状況を監視し、問題や改善点を開発側にフィードバックする</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>パイプライン全体の流れ</h3>
                        <Diagram id="diag-3" label="CI/CDパイプライン全体の流れ" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                CI（継続的インテグレーション）は「頻繁に統合し、自動テストで早期に問題を検出する」こと、CD（継続的デリバリー／デプロイ）は「いつでも展開できる状態を保ち、実際に自動展開まで行う」ことを指す。テスト失敗・承認却下時にフローが開発者へ戻る「フィードバックループ」がある点が重要。
                            </p>
                        </div>
                    </section>

                    {/* 第5章 */}
                    <section id="chapter5" className="section-block">
                        <h2>第5章 Pythonユニットテストの構築（4.5）</h2>
                        <p>
                            ユニットテストとは、プログラムの中の「最小単位（関数やメソッド）」が期待どおりに動くかを自動で検証するテストです。Pythonでは標準ライブラリの<code>unittest</code>モジュールがよく使われます。
                        </p>

                        <h3>テストの基本的な流れ（Arrange-Act-Assertパターン）</h3>
                        <Diagram id="diag-4" label="Arrange-Act-Assertテストフロー" />

                        <h3>コード例</h3>
                        <div className="code-block">
                            <div className="code-header">Python — unittest の基本形</div>
                            <div className="code-content">
                                <div className="code-line"><span className="code-keyword">import</span> unittest</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-keyword">def</span> <span className="code-function">add</span>(a, b):</div>
                                <div className="code-line">{'    '}<span className="code-string">&#34;&#34;&#34;2つの数値を加算する簡単な関数&#34;&#34;&#34;</span></div>
                                <div className="code-line">{'    '}<span className="code-keyword">return</span> a + b</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-keyword">class</span> <span className="code-function">TestAddFunction</span>(unittest.TestCase):</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line">{'    '}<span className="code-keyword">def</span> <span className="code-function">test_add_positive_numbers</span>(self):</div>
                                <div className="code-line">{'        '}<span className="code-comment"># Arrange</span></div>
                                <div className="code-line">{'        '}a, b = 2, 3</div>
                                <div className="code-line">{'        '}<span className="code-comment"># Act</span></div>
                                <div className="code-line">{'        '}result = add(a, b)</div>
                                <div className="code-line">{'        '}<span className="code-comment"># Assert</span></div>
                                <div className="code-line">{'        '}self.assertEqual(result, 5)</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line">{'    '}<span className="code-keyword">def</span> <span className="code-function">test_add_negative_numbers</span>(self):</div>
                                <div className="code-line">{'        '}result = add(-1, -1)</div>
                                <div className="code-line">{'        '}self.assertEqual(result, -2)</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-keyword">if</span> __name__ == <span className="code-string">&#34;__main__&#34;</span>:</div>
                                <div className="code-line">{'    '}unittest.main()</div>
                            </div>
                        </div>

                        <p>
                            <code>assertEqual</code>のほかにも、<code>assertTrue</code>（真偽値の検証）、<code>assertRaises</code>（例外発生の検証）などがよく使われます。ユニットテストは「テスト駆動開発（TDD）」の考え方や、第4章のCI/CDパイプラインの「テストステージ」と直結しています。
                        </p>

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                ユニットテストは「準備（Arrange）→実行（Act）→検証（Assert）」の3ステップで考えると書きやすい。CI/CDパイプラインでは、このユニットテストが自動テストステージの中核を担う。
                            </p>
                        </div>
                    </section>

                    {/* 第6章 */}
                    <section id="chapter6" className="section-block">
                        <h2>第6章 Dockerfileの読み方とDockerイメージの活用（4.6・4.7）</h2>

                        <h3>4.6 Dockerfileの内容を解釈する</h3>
                        <p>
                            Dockerfileは、Dockerイメージをどのように構築するかを記述したテキストファイルです。代表的な命令は以下のとおりです。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">命令</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>FROM</code></td>
                                        <td>
                                            ベースとなるイメージを指定する（例：<code>FROM python:3.12-slim</code>）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>WORKDIR</code></td>
                                        <td>コンテナ内の作業ディレクトリを設定する</td>
                                    </tr>
                                    <tr>
                                        <td><code>COPY</code> / <code>ADD</code></td>
                                        <td>ホスト側のファイルをイメージ内にコピーする</td>
                                    </tr>
                                    <tr>
                                        <td><code>RUN</code></td>
                                        <td>
                                            イメージ構築時にコマンドを実行する（パッケージのインストール等）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>ENV</code></td>
                                        <td>環境変数を設定する</td>
                                    </tr>
                                    <tr>
                                        <td><code>EXPOSE</code></td>
                                        <td>
                                            コンテナが待ち受けるポート番号を明示する（実際の公開は<code>docker run -p</code>で行う）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>CMD</code></td>
                                        <td>コンテナ起動時のデフォルトの実行コマンドを指定する</td>
                                    </tr>
                                    <tr>
                                        <td><code>ENTRYPOINT</code></td>
                                        <td>
                                            コンテナを実行ファイルのように振る舞わせる際のエントリポイントを指定する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>サンプルDockerfile</h3>
                        <div className="code-block">
                            <div className="code-header">Dockerfile</div>
                            <div className="code-content">
                                <div className="code-line"><span className="code-comment"># ベースイメージを指定</span></div>
                                <div className="code-line"><span className="code-keyword">FROM</span> python:3.12-slim</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-comment"># 作業ディレクトリを作成・移動</span></div>
                                <div className="code-line"><span className="code-keyword">WORKDIR</span> /app</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-comment"># 依存関係定義ファイルを先にコピーしてキャッシュを効かせる</span></div>
                                <div className="code-line"><span className="code-keyword">COPY</span> requirements.txt .</div>
                                <div className="code-line"><span className="code-keyword">RUN</span> pip install --no-cache-dir -r requirements.txt</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-comment"># アプリ本体をコピー</span></div>
                                <div className="code-line"><span className="code-keyword">COPY</span> . .</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-comment"># コンテナが待ち受けるポートを明示</span></div>
                                <div className="code-line"><span className="code-keyword">EXPOSE</span> 8080</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="code-comment"># コンテナ起動時に実行するコマンド</span></div>
                                <div className="code-line"><span className="code-keyword">CMD</span> [<span className="code-string">&#34;python&#34;</span>, <span className="code-string">&#34;app.py&#34;</span>]</div>
                            </div>
                        </div>

                        <h3>4.7 ローカル開発環境でのDockerイメージの利用</h3>
                        <p>よく使うDockerコマンドは以下のとおりです。</p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>docker build -t イメージ名:タグ .</code></td>
                                        <td>カレントディレクトリのDockerfileからイメージをビルドする</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker images</code></td>
                                        <td>ローカルに存在するイメージの一覧を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker run -d -p 8080:8080 イメージ名:タグ</code></td>
                                        <td>
                                            イメージからコンテナをバックグラウンドで起動し、ポートを公開する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>docker ps</code> / <code>docker ps -a</code></td>
                                        <td>稼働中（または全て）のコンテナ一覧を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker logs コンテナID</code></td>
                                        <td>コンテナのログを表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker exec -it コンテナID bash</code></td>
                                        <td>稼働中のコンテナ内でシェルを起動する</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker stop コンテナ名またはID</code> / <code>docker rm コンテナ名またはID</code></td>
                                        <td>コンテナを停止・削除する</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker push イメージ名</code> / <code>docker pull イメージ名</code></td>
                                        <td>イメージをレジストリへ送信／取得する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>イメージのライフサイクル</h3>
                        <Diagram id="diag-5" label="Dockerイメージとコンテナのライフサイクル" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                Dockerfileは「上から順に1行ずつ実行される構築手順書」として読むと理解しやすい。<code
                                >COPY requirements.txt</code>を<code>COPY . .</code>より先に行うのは、依存関係が変わらない限りビルドキャッシュを再利用して高速化するための定石。
                            </p>
                        </div>
                    </section>

                    {/* 第7章 */}
                    <section id="chapter7" className="section-block">
                        <h2>
                            第7章
                            アプリケーションセキュリティの基礎：シークレット保護・暗号化・データ取り扱い（4.8）
                        </h2>

                        <h3>シークレット保護</h3>
                        <p>
                            「シークレット」とは、パスワード、APIキー、証明書の秘密鍵など、漏洩すると重大な影響が出る機密情報を指します。基本原則は次のとおりです。
                        </p>
                        <ul>
                            <li>
                                <strong>コードやDockerイメージにシークレットを直接書き込まない</strong>（ハードコードしない）
                            </li>
                            <li>
                                環境変数、シークレット管理サービス（Vaultなど）、クラウドのシークレットマネージャーを利用する
                            </li>
                            <li>
                                Gitリポジトリに誤ってコミットしないよう<code>.gitignore</code>や事前スキャンツールを活用する
                            </li>
                        </ul>

                        <h3>暗号化（保存時・転送時）</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">代表例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>転送時の暗号化（Encryption in Transit）</td>
                                        <td>ネットワークを流れるデータを暗号化し、盗聴・改ざんを防ぐ</td>
                                        <td>TLS/HTTPS、SSH</td>
                                    </tr>
                                    <tr>
                                        <td>保存時の暗号化（Encryption at Rest）</td>
                                        <td>ディスクやデータベースに保存されているデータを暗号化する</td>
                                        <td>ディスク暗号化、データベースの列暗号化</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>データ取り扱いの考え方</h3>
                        <p>
                            個人情報や機密データを扱う際は、「必要最小限のデータのみ収集・保持する」「アクセス権を最小限にする」「保持期間を定めて不要になったら削除する」といった原則が重要です。
                        </p>

                        <h3>セキュアなデータフローのイメージ</h3>
                        <Diagram id="diag-6" label="セキュアなアプリケーションデータフロー" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                「シークレットはコードに書かない」「転送時と保存時の両方を暗号化する」の2点は特に頻出の観点。暗号化は「守る対象がどこにあるか（通信中か、保存中か）」で使う技術が異なる。
                            </p>
                        </div>
                    </section>

                    {/* 第8章 */}
                    <section id="chapter8" className="section-block">
                        <h2>
                            第8章
                            ネットワーク境界のセキュリティ要素：ファイアウォール・DNS・ロードバランサー・リバースプロキシ（4.9）
                        </h2>
                        <p>
                            アプリケーションを展開する際、ユーザーからのリクエストは複数のネットワーク要素を経由します。それぞれの役割を理解することが重要です。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DNS（Domain Name System）</td>
                                        <td>
                                            ドメイン名（例：<code>example.com</code>）をIPアドレスに変換する名前解決を行う
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ファイアウォール</td>
                                        <td>
                                            事前に定義したルールに基づき、許可された通信のみを通過させる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ロードバランサー</td>
                                        <td>
                                            複数のサーバーにリクエストを振り分け、負荷分散と可用性向上を実現する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>リバースプロキシ</td>
                                        <td>
                                            クライアントとサーバーの間に立ち、TLS終端・キャッシュ・経路制御・ヘッダー書き換えなどを行う
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>リクエストが辿る経路</h3>
                        <Diagram id="diag-7" label="名前解決とHTTPリクエスト経路" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                DNSの名前解決はHTTPリクエスト経路の前提処理であり、その後にユーザーからアプリ本体への通信が始まる。ファイアウォール、ロードバランサー、リバースプロキシの順序は代表的な構成例であり、実環境では要件に応じて配置や機能統合が変わる。試験では「アクセス制御」「負荷分散」「TLS終端・経路制御」という役割の違いで整理すると覚えやすい。
                            </p>
                        </div>
                    </section>

                    {/* 第9章 */}
                    <section id="chapter9" className="section-block">
                        <h2>第9章 OWASPトップの脅威（4.10）</h2>
                        <p>
                            OWASP（Open Worldwide Application Security
                            Project）は、Webアプリケーションセキュリティに関する非営利のコミュニティで、代表的な脅威をまとめた「OWASP
                            Top 10」を定期的に公開しています。
                        </p>
                        <p>
                            試験ガイドでは代表例として<strong>XSS（クロスサイトスクリプティング）</strong>、<strong>SQLインジェクション</strong>、<strong>CSRF（クロスサイトリクエストフォージェリ）</strong>が挙げられています。
                        </p>

                        <h3>代表的な脅威の説明</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">脅威</th>
                                        <th scope="col">概要</th>
                                        <th scope="col">典型的な対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>XSS（クロスサイトスクリプティング）</td>
                                        <td>
                                            ユーザーの入力値がそのままページに出力され、悪意あるスクリプトがブラウザ上で実行されてしまう
                                        </td>
                                        <td>
                                            出力時のエスケープ処理、入力値の検証、Content Security
                                            Policyの設定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SQLインジェクション</td>
                                        <td>
                                            ユーザーの入力値がSQL文にそのまま埋め込まれ、意図しないSQLが実行されてしまう
                                        </td>
                                        <td>
                                            プレースホルダ／パラメータ化クエリの利用、入力値の検証、最小権限のDBアカウント
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CSRF（クロスサイトリクエストフォージェリ）</td>
                                        <td>
                                            認証済みユーザーのブラウザを利用して、本人の意図しないリクエストを別サイトから送信させられる
                                        </td>
                                        <td>
                                            CSRFトークンの検証、SameSite属性付きCookie、重要操作での再認証
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            XSSとSQLインジェクションは「入力値や出力値の不十分な検証・処理」が主因となるのに対し、CSRFは「認証済みブラウザからのクロスサイト状態変更リクエストの信頼」に起因します。そのため、XSSには文脈に応じた出力エンコーディング、SQLインジェクションにはパラメータ化クエリ、CSRFにはCSRFトークン検証・Origin/Referer検証・SameSite Cookie属性による対策がそれぞれ不可欠です。
                        </p>

                        <Diagram id="diag-8" label="OWASP代表脅威の検証フロー" />

                        <h3>最新の公式リストとの関係</h3>
                        <p>
                            OWASP Top
                            10は数年ごとに改訂されており、2025年版（2021年版の後継、8回目の改訂版）が現時点の最新版です。参考として、2025年版の10カテゴリを紹介します。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">順位</th>
                                        <th scope="col">カテゴリ名（英語）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A01</td>
                                        <td>Broken Access Control（アクセス制御の不備）</td>
                                    </tr>
                                    <tr>
                                        <td>A02</td>
                                        <td>Security Misconfiguration（セキュリティ設定の不備）</td>
                                    </tr>
                                    <tr>
                                        <td>A03</td>
                                        <td>
                                            Software Supply Chain
                                            Failures（ソフトウェアサプライチェーンの問題）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>A04</td>
                                        <td>Cryptographic Failures（暗号化の不備）</td>
                                    </tr>
                                    <tr>
                                        <td>A05</td>
                                        <td>Injection（インジェクション）</td>
                                    </tr>
                                    <tr>
                                        <td>A06</td>
                                        <td>Insecure Design（安全でない設計）</td>
                                    </tr>
                                    <tr>
                                        <td>A07</td>
                                        <td>Authentication Failures（認証の不備）</td>
                                    </tr>
                                    <tr>
                                        <td>A08</td>
                                        <td>
                                            Software or Data Integrity
                                            Failures（ソフトウェア／データ整合性の不備）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>A09</td>
                                        <td>
                                            Security Logging &amp; Alerting
                                            Failures（セキュリティログ・アラートの不備）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>A10</td>
                                        <td>
                                            Mishandling of Exceptional Conditions（例外的な状態の処理不備）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            試験ガイドが例示するSQLインジェクションとXSSは、現行の2025年版では主に「A05
                            Injection」に含まれる代表的な攻撃パターンです。CSRFは2017年版以降、単独の最上位カテゴリとしては掲載されなくなりましたが、現在も広く知られた古典的な攻撃パターンであり、アクセス制御や認証まわりの対策（トークン検証・Cookie属性の設定など）と合わせて理解しておく価値があります。試験対策としては、まず試験ガイドが明示するXSS・SQLインジェクション・CSRFの3つの仕組みと対策を確実に押さえるのがよいでしょう。
                        </p>

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                XSSは信頼できないデータをHTMLへ安全でない形で出力することで発生するため、文脈に応じた出力エンコーディングを行う。SQLインジェクションは入力をSQL構文へ連結することで発生するため、パラメータ化クエリを使う。CSRFは認証済みブラウザに意図しない状態変更を実行させる攻撃であり、CSRFトークンまたはSameSite Cookieで防ぐ。OWASP Top 10は定期的に改訂されるため、順位や名称は最新の一次情報で確認する。
                            </p>
                        </div>
                    </section>

                    {/* 第10章 */}
                    <section id="chapter10" className="section-block">
                        <h2>第10章 Bashコマンドの活用（4.11）</h2>
                        <p>
                            Linux環境での自動化スクリプトや運用作業では、Bashコマンドの基本操作が欠かせません。
                        </p>

                        <h3>ファイル管理</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>ls -l</code></td>
                                        <td>ファイル・ディレクトリの一覧を詳細表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>cp src dst</code></td>
                                        <td>ファイルをコピーする</td>
                                    </tr>
                                    <tr>
                                        <td><code>mv src dst</code></td>
                                        <td>ファイルを移動・リネームする</td>
                                    </tr>
                                    <tr>
                                        <td><code>rm file</code></td>
                                        <td>ファイルを削除する（<code>-r</code>でディレクトリごと削除）</td>
                                    </tr>
                                    <tr>
                                        <td><code>chmod 755 file</code></td>
                                        <td>ファイルの権限を変更する</td>
                                    </tr>
                                    <tr>
                                        <td><code>cat file</code></td>
                                        <td>ファイルの内容を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>{`grep "keyword" file`}</code></td>
                                        <td>ファイル内から文字列を検索する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>ディレクトリ操作</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>pwd</code></td>
                                        <td>現在のディレクトリを表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>cd path</code></td>
                                        <td>ディレクトリを移動する</td>
                                    </tr>
                                    <tr>
                                        <td><code>mkdir dir</code></td>
                                        <td>ディレクトリを作成する</td>
                                    </tr>
                                    <tr>
                                        <td><code>rmdir dir</code></td>
                                        <td>空のディレクトリを削除する</td>
                                    </tr>
                                    <tr>
                                        <td><code>{`find . -name "*.py"`}</code></td>
                                        <td>条件に合うファイルを再帰的に検索する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>環境変数</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>echo $HOME</code></td>
                                        <td>環境変数の値を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>export VAR=value</code></td>
                                        <td>環境変数を設定する（現在のシェルとその子プロセスに反映）</td>
                                    </tr>
                                    <tr>
                                        <td><code>env</code> / <code>printenv</code></td>
                                        <td>現在の環境変数一覧を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>unset VAR</code></td>
                                        <td>環境変数を削除する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                「ファイル管理」「ディレクトリ操作」「環境変数」の3分類で整理すると覚えやすい。自動化スクリプト（第4章のCI/CDや第11章のDevOps運用）では、これらのコマンドが組み合わさって使われる。
                            </p>
                        </div>
                    </section>

                    {/* 第11章 */}
                    <section id="chapter11" className="section-block">
                        <h2>第11章 DevOpsの原則（4.12）</h2>
                        <p>
                            DevOpsとは、開発（Development）と運用（Operations）の壁をなくし、ソフトウェアを継続的に、かつ安全・迅速にリリースし続けるための文化・プラクティスです。
                        </p>

                        <p>代表的な原則は次のように整理できます。</p>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">原則</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>文化（Culture）</td>
                                        <td>
                                            開発チームと運用チームが責任を分断せず、協力してリリースに責任を持つ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>自動化（Automation）</td>
                                        <td>
                                            ビルド・テスト・展開・監視といった繰り返し作業を自動化し、人的ミスと作業時間を減らす
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>計測（Measurement / Lean）</td>
                                        <td>
                                            リリース頻度、障害復旧時間、変更失敗率などの指標を計測し、継続的に改善する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>共有（Sharing）</td>
                                        <td>ツール・知見・障害対応のノウハウをチーム間で共有する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            これらは、第4章で扱ったCI/CDパイプラインを支える文化的・組織的な土台にあたります。DevOpsのプラクティスは、しばしば「計画→コーディング→ビルド→テスト→リリース→展開→運用→監視」という循環（ループ）として表現されます。
                        </p>

                        <Diagram id="diag-9" label="DevOpsの継続的フィードバックループ" />

                        <div className="callout">
                            <div className="callout-title">この章のポイント</div>
                            <p>
                                DevOpsは単なるツールの導入ではなく、「文化・自動化・計測・共有」という考え方の集合体である。このループが途切れず回り続けることこそが、継続的デリバリー（CD）の本質。
                            </p>
                        </div>
                    </section>

                    {/* 第12章 */}
                    <section id="chapter12" className="section-block">
                        <h2>第12章 まとめ：ドメイン4.0 早見表</h2>
                        <p>試験直前の見直し用に、サブトピックごとの要点を1行にまとめました。</p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">サブトピック</th>
                                        <th scope="col">一言でいうと</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>4.1</td>
                                        <td>エッジコンピューティングの利点</td>
                                        <td>低遅延・帯域節約・オフライン耐性・データローカリティ</td>
                                    </tr>
                                    <tr>
                                        <td>4.2</td>
                                        <td>展開モデルの比較</td>
                                        <td>
                                            プライベート／パブリック／ハイブリッド／エッジを、管理主体とコスト・拡張性で選ぶ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.3</td>
                                        <td>VM・ベアメタル・コンテナ</td>
                                        <td>
                                            分離の強さと起動の速さはトレードオフ。コンテナは軽量・高速・高移植性
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.4</td>
                                        <td>CI/CDパイプライン</td>
                                        <td>
                                            コミット→ビルド→テスト→パッケージ→展開→監視を自動化する一連の流れ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.5</td>
                                        <td>Pythonユニットテスト</td>
                                        <td>Arrange（準備）→Act（実行）→Assert（検証）の3ステップ</td>
                                    </tr>
                                    <tr>
                                        <td>4.6</td>
                                        <td>Dockerfileの解釈</td>
                                        <td>
                                            <code>FROM</code>/<code>COPY</code>/<code>RUN</code>/<code>CMD</code>など、上から順に実行される構築手順書
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.7</td>
                                        <td>Dockerイメージの活用</td>
                                        <td>
                                            <code>build</code>→<code>images</code>→<code>run</code>→<code>ps</code>→<code>push</code>/<code>pull</code>のライフサイクル
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.8</td>
                                        <td>アプリケーションセキュリティ</td>
                                        <td>
                                            シークレットはコードに書かない／転送時と保存時の両方を暗号化する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.9</td>
                                        <td>ネットワーク境界の要素</td>
                                        <td>
                                            DNS→ファイアウォール→ロードバランサー→リバースプロキシの順で経由
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.10</td>
                                        <td>OWASPトップの脅威</td>
                                        <td>
                                            XSS・SQLi・CSRFはいずれも「入力・リクエストを検証しない」ことが原因
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.11</td>
                                        <td>Bashコマンド</td>
                                        <td>ファイル管理／ディレクトリ操作／環境変数の3分類</td>
                                    </tr>
                                    <tr>
                                        <td>4.12</td>
                                        <td>DevOpsの原則</td>
                                        <td>文化・自動化・計測・共有、そして途切れないリリースループ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 参考文献 */}
                    <footer id="references" className="section-block">
                        <h2>参考文献・出典</h2>
                        <p>
                            本ガイドの内容は、以下の一次情報（Cisco公式・OWASP公式・各技術の公式ドキュメント）を根拠としています。最新情報は必ず一次情報でご確認ください。
                        </p>
                        <ul>
                            <li>
                                CCNA Automation Certification（Cisco公式・認定概要ページ）<br /><a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html</a>
                            </li>
                            <li>
                                CCNA Automation Exam and Training（Cisco公式・試験と学習ページ）<br /><a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html</a>
                            </li>
                            <li>
                                200-901 CCNAAUTO（Cisco公式・試験詳細ページ）<br /><a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccnaauto.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccnaauto.html</a>
                            </li>
                            <li>
                                Automating Networks Using Cisco Platforms v1.1（200-901）Exam
                                Topics（Cisco公式・出題範囲PDF、本ガイドのドメイン4.0の記載内容の一次ソース）<br /><a
                                    href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf</a>
                            </li>
                            <li>
                                CCNAAUTO Exam Topics and Study Guide（Cisco Learning Network）<br /><a
                                    href="https://learningnetwork.cisco.com/s/ccnaauto-exam-topics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://learningnetwork.cisco.com/s/ccnaauto-exam-topics</a>
                            </li>
                            <li>
                                OWASP Top 10:2025（OWASP公式、第9章のOWASP脅威一覧の一次ソース）<br /><a
                                    href="https://owasp.org/Top10/2025/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://owasp.org/Top10/2025/</a>
                            </li>
                            <li>
                                Dockerfile
                                reference（Docker公式ドキュメント、第6章のDockerfile命令一覧の一次ソース）<br /><a
                                    href="https://docs.docker.com/reference/dockerfile/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://docs.docker.com/reference/dockerfile/</a>
                            </li>
                            <li>
                                unittest —
                                ユニットテストフレームワーク（Python公式ドキュメント、第5章のユニットテストの一次ソース）<br /><a
                                    href="https://docs.python.org/3/library/unittest.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://docs.python.org/3/library/unittest.html</a>
                            </li>
                        </ul>
                        <p className="disclaimer">
                            本ガイドは学習支援を目的とした非公式の解説資料です。試験の出題範囲・配点・内容は変更される可能性があるため、受験前に必ずCisco公式サイトの最新情報をご確認ください。
                        </p>
                    </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
