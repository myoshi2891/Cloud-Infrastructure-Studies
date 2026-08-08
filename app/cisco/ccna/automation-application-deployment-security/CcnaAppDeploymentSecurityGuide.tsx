'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

const DIAGRAM_DISPLAY: Record<string, { frameWidth: number }> = {
    'diag-0': { frameWidth: 800 },
    'diag-1': { frameWidth: 800 },
    'diag-2': { frameWidth: 900 },
    'diag-3': { frameWidth: 900 },
    'diag-4': { frameWidth: 800 },
    'diag-5': { frameWidth: 800 },
    'diag-6': { frameWidth: 800 },
    'diag-7': { frameWidth: 850 },
    'diag-8': { frameWidth: 850 },
    'diag-9': { frameWidth: 800 },
};

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    const display = DIAGRAM_DISPLAY[id] ?? { frameWidth: 800 };
    return (
        <div
            className="mermaid-wrap"
            data-diagram-id={id}
            style={{ maxWidth: `${display.frameWidth}px` }}
        >
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

export function CcnaAppDeploymentSecurityGuide() {
    return (
        <div className="ccna-app-deployment-security-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    <header className="hero">
                        <div className="hero-eyebrow">CCNA AUTOMATION · 200-901 CCNAAUTO</div>
                        <h1>Application Deployment and Security 完全解説ガイド</h1>
                        <p className="hero-description">
                            本ガイドは、Cisco公式サイトおよび公式試験ガイドをもとに、CCNA Automation認定の試験「Automating Networks Using Cisco Platforms v1.1（200-901 CCNAAUTO）」の6つの出題ドメインのうち、<strong>ドメイン4.0「Application Deployment and Security（アプリケーションの展開とセキュリティ）」</strong>（配点15%）を初学者向けに解説したものです。
                        </p>
                    </header>

                    {/* 第1章 */}
                    <section id="chapter1" className="section-block">
                        <h2>第1章 出題範囲の全体像</h2>
                        <p>
                            CCNA Automation認定を取得するには、120分の試験「200-901 CCNAAUTO」に合格する必要があります。この試験は6つのドメインで構成されており、それぞれに配点比率が設定されています。
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
                                        <td>Cisco Platforms and Development（Ciscoプラットフォームと開発）</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>4.0</strong></td>
                                        <td><strong>Application Deployment and Security（アプリケーションの展開とセキュリティ）</strong></td>
                                        <td><strong>15%</strong></td>
                                    </tr>
                                    <tr>
                                        <td>5.0</td>
                                        <td>Infrastructure and Automation（インフラストラクチャと自動化）</td>
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

                        <Diagram id="diag-0" label="CCNAAUTO 試験ドメイン比率とドメイン4.0の範囲" />
                    </section>

                    {/* 第2章 */}
                    <section id="chapter2" className="section-block">
                        <h2>第2章 エッジコンピューティングとアプリケーション展開モデル（4.1・4.2）</h2>
                        
                        <h3>4.1 エッジコンピューティングの利点</h3>
                        <p>
                            従来のクラウドコンピューティングでは、すべてのデータを遠くのデータセンター（パブリッククラウド）に送信して処理していました。しかし、IoT機器の爆発的増加やリアルタイム処理の要求に伴い、<strong>「データの発生源の近く（エッジ）」で処理を行うエッジコンピューティング</strong>が重要になっています。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">利点</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">具体例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>低遅延（Low Latency）</strong></td>
                                        <td>データセンター往復の通信時間を削り、即座にレスポンスを返せる</td>
                                        <td>自動運転車の障害物検知、工場のロボット制御</td>
                                    </tr>
                                    <tr>
                                        <td><strong>帯域幅の節約（Bandwidth Efficiency）</strong></td>
                                        <td>生のビデオ映像などをすべてクラウドへ送らず、エッジ側で集約・フィルタリングする</td>
                                        <td>防犯カメラの映像解析（異常検知の通知ログのみクラウドへ送信）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>プライバシー・データローカリティ</strong></td>
                                        <td>機密性の高い個人情報や社内データを組織外に出さずに現地で処理できる</td>
                                        <td>店舗POSの決済データ処理、医療機器のデータ解析</td>
                                    </tr>
                                    <tr>
                                        <td><strong>オフライン自律性（Resilience）</strong></td>
                                        <td>クラウドへのWAN回線が切断されても、エッジノード単体で処理を継続できる</td>
                                        <td>遠隔地のスマート農業センサー、船舶内のシステム</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.2 アプリケーション展開モデルの比較</h3>
                        <p>
                            アプリケーションをデプロイ（展開）する場所の選択肢には、主に以下の4つのモデルがあります。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">展開モデル</th>
                                        <th scope="col">概要</th>
                                        <th scope="col">メリット</th>
                                        <th scope="col">デメリット・考慮点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>プライベートクラウド（Private Cloud）</strong></td>
                                        <td>自社専用の仮想化・クラウド基盤（オンプレミスデータセンター等）</td>
                                        <td>完全な制御権、高いカスタマイズ性、高いセキュリティ</td>
                                        <td>初期コスト（CapEx）が高額、運用保守の手間</td>
                                    </tr>
                                    <tr>
                                        <td><strong>パブリッククラウド（Public Cloud）</strong></td>
                                        <td>AWS, GCP, Azure等の事業者が提供する共有クラウド基盤</td>
                                        <td>従量課金、無制限の拡張性（スケーラビリティ）、保守不要</td>
                                        <td>通信遅延、データローカリティの制約、継続的コスト（OpEx）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ハイブリッドクラウド（Hybrid Cloud）</strong></td>
                                        <td>プライベートクラウドとパブリッククラウドを連携させた構成</td>
                                        <td>重要なデータは自社、急増アクセスはパブリックへ逃す柔軟性</td>
                                        <td>ネットワーク構成・アイデンティティ統合の複雑化</td>
                                    </tr>
                                    <tr>
                                        <td><strong>エッジ（Edge）</strong></td>
                                        <td>現場近くのネットワークエッジ（ルータ、ローカルサーバー、IoTゲートウェイ）</td>
                                        <td>極めて低い遅延、帯域節約、ローカルでのデータ保持</td>
                                        <td>計算リソース（CPU/メモリ）の制約、拠点ごとの管理負荷</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-1" label="エッジコンピューティングとハイブリッドクラウド構成図" />
                    </section>

                    {/* 第3章 */}
                    <section id="chapter3" className="section-block">
                        <h2>第3章 アプリケーション実行環境の比較：VM・ベアメタル・コンテナ（4.3）</h2>

                        <h3>3つの実行環境の構造比較</h3>
                        <p>
                            アプリケーションを動作させる実行環境（環境アーキテクチャ）には、ベアメタル（物理サーバー）、仮想マシン（VM）、コンテナ（Container）の3種類があります。試験ではこれらの違いとトレードオフが問われます。
                        </p>

                        <Diagram id="diag-2" label="ベアメタル・仮想マシン・コンテナのレイヤー構造比較" />

                        <h3>属性比較表</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">ベアメタル（物理サーバー）</th>
                                        <th scope="col">仮想マシン（VM）</th>
                                        <th scope="col">コンテナ（Docker等）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>隔離レベル</strong></td>
                                        <td>ハードウェアレベルで完全分離</td>
                                        <td>ハイパーバイザーによる強固なOS分離</td>
                                        <td>ホストOSカーネル共有のプロセス分離（Namespaces / cgroups）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>起動時間</strong></td>
                                        <td>数分～十数分（物理ブート）</td>
                                        <td>数分（ゲストOSの立ち上がり）</td>
                                        <td><strong>数ミリ秒～数秒</strong>（プロセス起動と同等）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>リソースオーバーヘッド</strong></td>
                                        <td>なし（100%ハードウェア活用）</td>
                                        <td>大（ゲストOSごとにメモリ・CPUを消費）</td>
                                        <td><strong>極めて小</strong>（OSを共有しプロセスのみ動作）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>可搬性（Portability）</strong></td>
                                        <td>低（特定のハードウェアに依存）</td>
                                        <td>中（VMイメージフォーマットに依存）</td>
                                        <td><strong>最高</strong>（「どこでも動く」Dockerイメージ）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>主な用途</strong></td>
                                        <td>最高性能が必要なDB、レガシー基盤</td>
                                        <td>異なるOSの混在運用、マルチテナント環境</td>
                                        <td>マイクロサービス、CI/CD、クラウドネイティブアプリ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 第4章 */}
                    <section id="chapter4" className="section-block">
                        <h2>第4章 CI/CDパイプラインの基礎（4.4）</h2>
                        
                        <h3>CI/CDパイプラインの主な構成要素</h3>
                        <p>
                            CI/CD（Continuous Integration / Continuous Delivery & Deployment）は、コードの変更からテスト、本番適用までを自動化するDevOpsの中核概念です。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステージ/用語</th>
                                        <th scope="col">英語表記</th>
                                        <th scope="col">役割と内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>継続的インテグレーション</strong></td>
                                        <td>Continuous Integration (CI)</td>
                                        <td>開発者がコードを頻繁にリポジトリへ統合し、ビルドと自動テストを毎回実行してバグを早期発見する</td>
                                    </tr>
                                    <tr>
                                        <td><strong>継続的デリバリー</strong></td>
                                        <td>Continuous Delivery (CD)</td>
                                        <td>テスト済みのコードをいつでも本番リリースできる状態に自動維持する（本番適用には手動の承認ステップが入る）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>継続的デプロイ</strong></td>
                                        <td>Continuous Deployment (CD)</td>
                                        <td>テスト成功後、本番環境へのデプロイまで人の手を介さず完全自動で実行する</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ビルドステージ</strong></td>
                                        <td>Build Stage</td>
                                        <td>ソースコードのコンパイル、依存ライブラリのロード、実行可能ファイルの作成を行う</td>
                                    </tr>
                                    <tr>
                                        <td><strong>テストステージ</strong></td>
                                        <td>Test Stage</td>
                                        <td>ユニットテスト、統合テスト、静的コード解析を実行し、品質基準を満たしているか確認する</td>
                                    </tr>
                                    <tr>
                                        <td><strong>リファクタリング・フィードバック</strong></td>
                                        <td>Feedback Loop</td>
                                        <td>ビルドやテストが失敗した場合、直ちに開発チームへ通知してコードを修復させる</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>パイプライン全体の流れ</h3>
                        <Diagram id="diag-3" label="CI/CDパイプラインの一般的なフロー図" />
                    </section>

                    {/* 第5章 */}
                    <section id="chapter5" className="section-block">
                        <h2>第5章 Pythonユニットテストの構築（4.5）</h2>

                        <h3>テストの基本的な流れ（Arrange-Act-Assertパターン）</h3>
                        <p>
                            ソフトウェアテストの標準的なフレームワークとして、<strong>Arrange-Act-Assert (AAA) パターン</strong>が用いられます。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステップ</th>
                                        <th scope="col">内容</th>
                                        <th scope="col">具体的なコード例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>1. Arrange（準備）</strong></td>
                                        <td>テストに必要なデータや前提条件（モックや入力値）を用意する</td>
                                        <td><code>x = 10; y = 20</code></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Act（実行）</strong></td>
                                        <td>テスト対象となる関数やメソッドを実際に呼び出す</td>
                                        <td><code>result = add_numbers(x, y)</code></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Assert（検証）</strong></td>
                                        <td>実行結果が期待通り（Expected）かアサーションで確認する</td>
                                        <td><code>assert result == 30</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-4" label="Arrange-Act-Assertパターンの実行フロー" />

                        <h3>コード例</h3>
                        <p>Pythonの組み込みライブラリ <code>unittest</code> を使用した基本的なコード例です。</p>

                        <div className="code-block">
                            <div className="code-header">
                                <span>app_test.py</span>
                                <span>Python</span>
                            </div>
                            <div className="code-line"><span className="code-keyword">import</span> unittest</div>
                            <div className="code-line"><span className="code-keyword">from</span> app <span className="code-keyword">import</span> calculate_bandwidth</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line"><span className="code-keyword">class</span> <span className="code-function">TestNetworkUtils</span>(unittest.TestCase):</div>
                            <div className="code-line">    <span className="code-keyword">def</span> <span className="code-function">test_calculate_bandwidth_success</span>(self):</div>
                            <div className="code-line">        <span className="code-comment"># Arrange</span></div>
                            <div className="code-line">        bytes_sent = <span className="code-string">1000000</span></div>
                            <div className="code-line">        seconds = <span className="code-string">2</span></div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line">        <span className="code-comment"># Act</span></div>
                            <div className="code-line">        mbps = calculate_bandwidth(bytes_sent, seconds)</div>
                            <div className="code-line">&nbsp;</div>
                            <div className="code-line">        <span className="code-comment"># Assert</span></div>
                            <div className="code-line">        self.assertEqual(mbps, <span className="code-string">4.0</span>)</div>
                        </div>
                    </section>

                    {/* 第6章 */}
                    <section id="chapter6" className="section-block">
                        <h2>第6章 Dockerfileの読み方とDockerイメージの活用（4.6・4.7）</h2>

                        <h3>4.6 Dockerfileの内容を解釈する</h3>
                        <p>
                            Dockerfileはコンテナイメージを作成するための設計図（テキストファイル）です。主要な命令の意味を理解することが出題されます。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Dockerfile命令</th>
                                        <th scope="col">役割</th>
                                        <th scope="col">注意点・特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>FROM</code></td>
                                        <td>ベースとなる既存のイメージを指定（必須）</td>
                                        <td><code>FROM python:3.11-slim</code> など</td>
                                    </tr>
                                    <tr>
                                        <td><code>WORKDIR</code></td>
                                        <td>以降の命令が実行される作業ディレクトリを設定</td>
                                        <td>存在しない場合は自動生成される</td>
                                    </tr>
                                    <tr>
                                        <td><code>COPY</code> / <code>ADD</code></td>
                                        <td>ホストOSのファイルをイメージ内にコピーする</td>
                                        <td><code>ADD</code>はリモートURL取得やtar解凍にも対応するが<code>COPY</code>が推奨される</td>
                                    </tr>
                                    <tr>
                                        <td><code>RUN</code></td>
                                        <td>イメージビルド時にコマンドを実行しレイヤーを追加</td>
                                        <td><code>RUN pip install -r requirements.txt</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>EXPOSE</code></td>
                                        <td>コンテナが公開するポート番号を明示（ドキュメント的役割）</td>
                                        <td>実際のポートフォワードは <code>docker run -p</code> で行う</td>
                                    </tr>
                                    <tr>
                                        <td><code>ENV</code></td>
                                        <td>コンテナ内の環境変数を設定</td>
                                        <td><code>ENV PORT=8080</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>CMD</code></td>
                                        <td>コンテナ起動時に実行するデフォルトコマンド</td>
                                        <td>1つのDockerfileにつき最期の<code>CMD</code>のみ有効</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>サンプルDockerfile</h3>
                        <div className="code-block">
                            <div className="code-header">
                                <span>Dockerfile</span>
                                <span>Docker</span>
                            </div>
                            <div className="code-line"><span className="code-keyword">FROM</span> python:3.11-slim</div>
                            <div className="code-line"><span className="code-keyword">WORKDIR</span> /app</div>
                            <div className="code-line"><span className="code-keyword">COPY</span> requirements.txt .</div>
                            <div className="code-line"><span className="code-keyword">RUN</span> pip install --no-cache-dir -r requirements.txt</div>
                            <div className="code-line"><span className="code-keyword">COPY</span> . .</div>
                            <div className="code-line"><span className="code-keyword">EXPOSE</span> 8000</div>
                            <div className="code-line"><span className="code-keyword">CMD</span> ["python", "main.py"]</div>
                        </div>

                        <h3>4.7 ローカル開発環境でのDockerイメージの利用</h3>
                        <p>
                            作成したDockerイメージを操作するための主要なCLIコマンドです。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>docker build -t myapp:1.0 .</code></td>
                                        <td>カレントディレクトリのDockerfileからタグ名<code>myapp:1.0</code>でイメージを生成</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker images</code></td>
                                        <td>ローカルに保存されているイメージの一覧を表示</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker run -d -p 8080:8000 myapp:1.0</code></td>
                                        <td>バックグラウンド（<code>-d</code>）でコンテナを起動。ホスト8080ポートをコンテナ8000ポートへ転送</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker ps</code> / <code>docker ps -a</code></td>
                                        <td>稼働中（<code>-a</code>で全状態）のコンテナ一覧を表示</td>
                                    </tr>
                                    <tr>
                                        <td><code>docker stop &lt;container_id&gt;</code></td>
                                        <td>実行中のコンテナを安全に停止</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>イメージのライフサイクル</h3>
                        <Diagram id="diag-5" label="Dockerイメージおよびコンテナのライフサイクル図" />
                    </section>

                    {/* 第7章 */}
                    <section id="chapter7" className="section-block">
                        <h2>第7章 アプリケーションセキュリティの基礎：シークレット保護・暗号化・データ取り扱い（4.8）</h2>

                        <h3>シークレット保護</h3>
                        <p>
                            パスワード、APIキー、データベース接続文字列、SSH秘密鍵などの重要データ（シークレット）をソースコードに直書き（ハードコーディング）することは厳禁です。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">対策手法</th>
                                        <th scope="col">概要</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>環境変数の利用</strong></td>
                                        <td>.envファイルやOS環境変数経由でアプリに注入する</td>
                                        <td>.gitignoreで.envファイルをリポジトリ除外する</td>
                                    </tr>
                                    <tr>
                                        <td><strong>専用シークレット管理ツールの活用</strong></td>
                                        <td>HashiCorp Vault, AWS Secrets Manager, Cisco DNA Center Key Manager等</td>
                                        <td>動的シークレット発行・自動ローテーションを有効化する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>暗号化（保存時・転送時）</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">暗号化の分類</th>
                                        <th scope="col">対象データ</th>
                                        <th scope="col">プロトコル・技術</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>転送時暗号化（Data in Transit）</strong></td>
                                        <td>ネットワーク上を流れる通信データ</td>
                                        <td>TLS 1.3, HTTPS, SSH, IPsec VPN</td>
                                    </tr>
                                    <tr>
                                        <td><strong>保存時暗号化（Data at Rest）</strong></td>
                                        <td>ストレージやDBに書き込まれた静止データ</td>
                                        <td>AES-256, LUKS, EBS暗号化, DB透過的暗号化(TDE)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>データ取り扱いの考え方</h3>
                        <p>
                            個人情報（PII）や機密データを扱う際は、最小権限の原則（Principle of Least Privilege）およびデータの最小化原則を徹底します。
                        </p>

                        <h3>セキュアなデータフローのイメージ</h3>
                        <Diagram id="diag-6" label="セキュアなアプリケーションデータフロー図" />
                    </section>

                    {/* 第8章 */}
                    <section id="chapter8" className="section-block">
                        <h2>第8章 ネットワーク境界のセキュリティ要素：ファイアウォール・DNS・ロードバランサー・リバースプロキシ（4.9）</h2>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コンポーネント</th>
                                        <th scope="col">主な役割</th>
                                        <th scope="col">セキュリティ上の機能</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>ファイアウォール（FW / WAF）</strong></td>
                                        <td>L3/L4またはL7でのパケットフィルタリング</td>
                                        <td>不正ポート・IPからのアクセス遮断、Web攻撃（SQLi, XSS）防御</td>
                                    </tr>
                                    <tr>
                                        <td><strong>DNS（Domain Name System）</strong></td>
                                        <td>ドメイン名とIPアドレスの相互変換</td>
                                        <td>DNSSEC（偽装防止）、Anycast（DDoS耐性）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ロードバランサー（LB）</strong></td>
                                        <td>複数サーバーへのトラフィック分散</td>
                                        <td>ヘルスチェック（障害検知）、DDoS攻撃の負荷緩和</td>
                                    </tr>
                                    <tr>
                                        <td><strong>リバースプロキシ（Reverse Proxy）</strong></td>
                                        <td>クライアントとWebサーバー間の代理応答</td>
                                        <td>TLSオフロード（暗号化処理集約）、オリジンIPの隠蔽、キャッシュ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>リクエストが辿る経路</h3>
                        <Diagram id="diag-7" label="Webリクエストが辿るネットワーク境界要素の構成" />
                    </section>

                    {/* 第9章 */}
                    <section id="chapter9" className="section-block">
                        <h2>第9章 OWASPトップの脅威（4.10）</h2>

                        <h3>代表的な脅威の説明</h3>
                        <p>
                            OWASP（Open Web Application Security Project）が公表する主要なWeb脆弱性・脅威について理解しておく必要があります。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">脅威分類</th>
                                        <th scope="col">内容</th>
                                        <th scope="col">対策手法</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>SQLインジェクション (SQLi)</strong></td>
                                        <td>悪意あるSQL文を入力欄に注入してデータベースを不正操作する</td>
                                        <td>プレースホルダ（パラメータ化クエリ）の徹底利用</td>
                                    </tr>
                                    <tr>
                                        <td><strong>クロスサイトスクリプティング (XSS)</strong></td>
                                        <td>攻撃者がWebページに悪意あるJavaScriptを埋め込み閲覧者のブラウザで実行させる</td>
                                        <td>出力時のHTMLエスケープ、CSP（Content Security Policy）の設定</td>
                                    </tr>
                                    <tr>
                                        <td><strong>クロスサイトリクエストフォージェリ (CSRF)</strong></td>
                                        <td>ログイン済みのユーザーのブラウザを利用し意図しないリクエストを送信させる</td>
                                        <td>ワンタイムCSRFトークンの検証、SameSiteクッキー属性の設定</td>
                                    </tr>
                                    <tr>
                                        <td><strong>アクセス制御の不備 (Broken Access Control)</strong></td>
                                        <td>他人のデータや管理者機能へ未認証・未認可でアクセスできてしまう</td>
                                        <td>サーバー側での厳格なロールベースアクセス制御(RBAC)実装</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>最新の公式リストとの関係</h3>
                        <Diagram id="diag-8" label="入力検証とセッションチェックによるOWASP脅威回避フロー" />
                    </section>

                    {/* 第10章 */}
                    <section id="chapter10" className="section-block">
                        <h2>第10章 Bashコマンドの活用（4.11）</h2>

                        <p>アプリケーションの自動化やコンテナ内での調査に不可欠なBash基本コマンドの一覧です。</p>

                        <h3>ファイル管理</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">用途</th>
                                        <th scope="col">使用例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>cat</code> / <code>less</code></td>
                                        <td>ファイル内容の閲覧</td>
                                        <td><code>cat config.json</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>grep</code></td>
                                        <td>テキスト内のパターン検索</td>
                                        <td><code>grep -i "error" app.log</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>chmod</code> / <code>chown</code></td>
                                        <td>パーミッション変更 / 所有者変更</td>
                                        <td><code>chmod 600 id_rsa</code></td>
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
                                        <th scope="col">使用例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>ls -la</code></td>
                                        <td>隠しファイルを含む詳細なディレクトリ一覧表示</td>
                                        <td><code>ls -la /app</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>mkdir -p</code></td>
                                        <td>階層ディレクトリの作成</td>
                                        <td><code>mkdir -p /var/log/myapp</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>pwd</code></td>
                                        <td>現在の作業ディレクトリパスを表示</td>
                                        <td><code>pwd</code></td>
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
                                        <th scope="col">使用例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>export</code></td>
                                        <td>環境変数の設定・出力</td>
                                        <td><code>export ENV=production</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>env</code> / <code>printenv</code></td>
                                        <td>現在のすべての環境変数を表示</td>
                                        <td><code>printenv PORT</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 第11章 */}
                    <section id="chapter11" className="section-block">
                        <h2>第11章 DevOpsの原則（4.12）</h2>

                        <p>
                            DevOpsは「開発（Development）」と「運用（Operations）」が連携し、迅速かつ高品質に価値を提供する文化とプラクティスの総称です。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">DevOpsの柱</th>
                                        <th scope="col">原則</th>
                                        <th scope="col">具体的アプローチ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Culture（文化）</strong></td>
                                        <td>サイロの解体と共同責任</td>
                                        <td>開発と運用の目的共有、失敗を責めない文化（Blameless Post-mortem）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Automation（自動化）</strong></td>
                                        <td>手動作業（トイル）の排除</td>
                                        <td>CI/CD、インフラのコード化（IaC）、自動テスト</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Lean（リーン）</strong></td>
                                        <td>バッチサイズの縮小と無駄の削減</td>
                                        <td>小規模な頻繁リリース、リードタイムの短縮</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Measurement（計測）</strong></td>
                                        <td>定量データに基づく改善</td>
                                        <td>メトリクス収集（SLO/SLA）、ログ一元化（ELK/Datadog）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sharing（共有）</strong></td>
                                        <td>ナレッジとフィードバックの共有</td>
                                        <td>ドキュメント化、オープンなコミュニケーションチャネル</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-9" label="DevOpsの無限ループ（Plan-Code-Build-Test-Release-Deploy-Operate-Monitor）" />
                    </section>

                    {/* 第12章 */}
                    <section id="chapter12" className="section-block">
                        <h2>第12章 まとめ：ドメイン4.0 早見表</h2>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">トピック番号</th>
                                        <th scope="col">トピック名</th>
                                        <th scope="col">試験で問われる最重要キーワード</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>4.1</td>
                                        <td>エッジコンピューティング</td>
                                        <td>低遅延、帯域節約、データローカリティ、自律性</td>
                                    </tr>
                                    <tr>
                                        <td>4.2</td>
                                        <td>アプリケーション展開モデル</td>
                                        <td>プライベート / パブリック / ハイブリッドクラウド, エッジ</td>
                                    </tr>
                                    <tr>
                                        <td>4.3</td>
                                        <td>実行環境比較</td>
                                        <td>ベアメタル（高パフォーマンス）、VM（ハイパーバイザー強分離）、コンテナ（軽量・高可搬性）</td>
                                    </tr>
                                    <tr>
                                        <td>4.4</td>
                                        <td>CI/CDパイプライン</td>
                                        <td>CI（自動テスト統合）、CD（自動配信・デプロイ）、ビルド/テスト/リリース</td>
                                    </tr>
                                    <tr>
                                        <td>4.5</td>
                                        <td>Pythonユニットテスト</td>
                                        <td>Arrange-Act-Assert（AAAパターン）、unittestモジュール</td>
                                    </tr>
                                    <tr>
                                        <td>4.6 / 4.7</td>
                                        <td>Dockerfile &amp; イメージ</td>
                                        <td>FROM, WORKDIR, COPY, RUN, EXPOSE, CMD, docker build, docker run</td>
                                    </tr>
                                    <tr>
                                        <td>4.8</td>
                                        <td>セキュリティ基礎</td>
                                        <td>シークレット分離、Vault, TLS1.3（転送時）, AES-256（保存時）</td>
                                    </tr>
                                    <tr>
                                        <td>4.9</td>
                                        <td>ネットワーク境界</td>
                                        <td>FW, DNS, LB, リバースプロキシ（TLS終端）</td>
                                    </tr>
                                    <tr>
                                        <td>4.10</td>
                                        <td>OWASPトップの脅威</td>
                                        <td>SQLi（パラメータ化）、XSS（エスケープ）、CSRF（トークン）</td>
                                    </tr>
                                    <tr>
                                        <td>4.11</td>
                                        <td>Bashコマンド</td>
                                        <td>grep, chmod, ls -la, mkdir -p, export, printenv</td>
                                    </tr>
                                    <tr>
                                        <td>4.12</td>
                                        <td>DevOps原則</td>
                                        <td>CALS（Culture, Automation, Lean, Measurement, Sharing）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 参考文献 */}
                    <section id="references" className="section-block">
                        <h2>参考文献・出典</h2>
                        <ul>
                            <li>
                                <a
                                    href="https://learningnetwork.cisco.com/s/ccnaauto-exam-topics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cisco 200-901 CCNAAUTO Exam Topics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://owasp.org/Top10/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    OWASP Top 10:2021
                                </a>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}
