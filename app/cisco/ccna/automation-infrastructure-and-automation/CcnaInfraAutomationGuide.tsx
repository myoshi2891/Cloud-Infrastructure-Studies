'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

/**
 * Renders a labeled diagram when the specified diagram is available.
 *
 * @param id - The identifier of the diagram to display
 * @param label - The visible label and accessibility description for the diagram
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-wrapper">
            <div className="diagram-label">{label}</div>
            <div className="mermaid-wrap">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
        </div>
    );
}

/**
 * Renders a study guide for the CCNA Automation 200-901 Infrastructure and Automation domain.
 */
export default function CcnaInfraAutomationGuide() {
    return (
        <div className="ccna-infra-automation-page">
            <div className="layout">
                <NavBar />

                <main className="main">
                    {/* HERO */}
                    <header className="hero">
                        <span className="eyebrow">CCNAAUTO 200-901 &middot; Domain 5.0</span>
                        <h1>
                            Infrastructure and Automation
                            <br />
                            ステップバイステップ解説ガイド
                        </h1>
                        <p className="lead">
                            CCNA Automation認定の中核試験「Automating Networks Using Cisco Platforms v1.1（200-901 CCNAAUTO）」のうち、出題比率20%を占める「5.0 Infrastructure and Automation」ドメインを、初学者でも理解できるように図解と表を使って1項目ずつ解説します。
                        </p>
                        <div className="meta-chips">
                            <div className="chip highlight">
                                <span className="k">出題比率</span>
                                <span className="v">20%</span>
                            </div>
                            <div className="chip">
                                <span className="k">試験コード</span>
                                <span className="v">200-901</span>
                            </div>
                            <div className="chip">
                                <span className="k">試験時間</span>
                                <span className="v">120分</span>
                            </div>
                            <div className="chip">
                                <span className="k">言語</span>
                                <span className="v">EN / JA</span>
                            </div>
                            <div className="chip">
                                <span className="k">出題項目数</span>
                                <span className="v">5.1–5.14</span>
                            </div>
                        </div>
                    </header>

                    {/* OVERVIEW */}
                    <section className="section section-block prose" id="overview">
                        <h2>この記事について</h2>
                        <p>
                            CCNA Automation認定（自動化系認定）の中核試験である<strong>200-901 CCNAAUTO</strong>は、6つのドメインで構成されています。本記事はその中でも配点が最も高いドメインの1つである<strong>「5.0 Infrastructure and Automation」（出題比率20%）</strong>に焦点を当て、公式出題項目（5.1〜5.14）を初学者でも理解できるようステップバイステップで解説します。
                        </p>

                        <h3 className="subhead">試験全体における本ドメインの位置づけ</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ドメイン名</th>
                                        <th scope="col">出題比率</th>
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
                                    <tr>
                                        <td>3.0</td>
                                        <td>Cisco Platforms and Development</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td>4.0</td>
                                        <td>Application Deployment and Security</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>5.0</strong></td>
                                        <td><strong>Infrastructure and Automation（本記事）</strong></td>
                                        <td><strong>20%</strong></td>
                                    </tr>
                                    <tr>
                                        <td>6.0</td>
                                        <td>Network Fundamentals</td>
                                        <td>15%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            「Understanding and Using APIs」と並んで最も配点の高いドメインであり、試験全体の1/5を占めます。内容は大きく3つの塊に整理できます。
                        </p>
                        <ol>
                            <li><strong>自動化の考え方・原則</strong>（5.1, 5.2, 5.5, 5.13）</li>
                            <li><strong>自動化を支えるツールと仕組み</strong>（5.3, 5.4, 5.6）</li>
                            <li><strong>既存のコード／出力を読み解く力</strong>（5.7〜5.12, 5.14）</li>
                        </ol>
                        <p>
                            CCNAAUTOでは「自分で書く」より「与えられたコードや出力を読んで、何が起きているかを説明できる」ことが繰り返し問われるのが特徴です。そのため本記事も、各項目で<strong>具体的なサンプル（YAML・Python・Bash・XML/JSON・diff）を読み解く練習</strong>を重視して構成しています。
                        </p>

                        <h3 className="subhead">全体の自動化ライフサイクルから見る5.0ドメイン</h3>
                        <p>
                            5.1〜5.14の各項目は、実務での自動化ワークフロー（意図の設計 &rarr; コード化 &rarr; レビュー &rarr; CI/CD &rarr; テスト &rarr; 本番適用）のどこかに対応しています。まずは全体像を掴みましょう。
                        </p>

                        <Diagram id="diag-0" label="Figure 0 · 自動化ライフサイクル全体図" />

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ライフサイクルの段階</th>
                                        <th scope="col">対応する出題項目</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>設計（モデル駆動プログラマビリティ）</td>
                                        <td>5.1, 5.11</td>
                                    </tr>
                                    <tr>
                                        <td>コード化（IaC / 自動化ツール）</td>
                                        <td>5.5, 5.6, 5.8, 5.9</td>
                                    </tr>
                                    <tr>
                                        <td>バージョン管理・レビュー</td>
                                        <td>5.12, 5.13</td>
                                    </tr>
                                    <tr>
                                        <td>CI/CDパイプライン</td>
                                        <td>5.4</td>
                                    </tr>
                                    <tr>
                                        <td>テスト・シミュレーション</td>
                                        <td>5.3</td>
                                    </tr>
                                    <tr>
                                        <td>本番適用・運用管理</td>
                                        <td>5.2, 5.7, 5.10</td>
                                    </tr>
                                    <tr>
                                        <td>コミュニケーション（設計共有）</td>
                                        <td>5.14</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>それでは、出題項目の番号順に1つずつ見ていきます。</p>
                    </section>

                    {/* SECTION 5.1 */}
                    <section className="section section-block prose" id="s5-1">
                        <div className="section-head">
                            <span className="domain-chip">5.1</span>
                            <div>
                                <h2>モデル駆動プログラマビリティの価値</h2>
                                <div className="weight-tag">
                                    Describe the value of model driven programmability for infrastructure automation
                                </div>
                            </div>
                        </div>

                        <p>
                            従来のネットワーク自動化は、SSHでCLIにログインし<code className="inline">show</code>コマンドの出力（人間向けのテキスト）を正規表現などで解析する<strong>「スクリーンスクレイピング」</strong>が主流でした。しかしこの方法には次のような弱点があります。
                        </p>
                        <ul>
                            <li>OSのバージョンが変わるだけで出力フォーマットが変わり、解析ロジックが壊れる</li>
                            <li>ベンダーやプラットフォームごとに解析コードを個別に書く必要がある</li>
                            <li>出力が「表示用」であり、そもそも構造化されていないため解析が不安定</li>
                        </ul>
                        <p>
                            これに対して<strong>モデル駆動プログラマビリティ（Model-Driven Programmability）</strong>は、<code className="inline">YANG</code>という<strong>データモデリング言語</strong>で定義された構造化データを、<code className="inline">NETCONF</code>や<code className="inline">RESTCONF</code>といったプロトコルでやり取りする方式です。データが最初から構造化されている（JSON/XML）ため、パースが安定し、機種やベンダーが変わっても同じデータモデルであれば同じコードで扱えます。
                        </p>

                        <Diagram id="diag-5-1" label="Figure 5.1 · CLIスクリーンスクレイピング vs モデル駆動プログラマビリティ" />

                        <h3 className="subhead">比較表</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">CLIスクリーンスクレイピング</th>
                                        <th scope="col">モデル駆動プログラマビリティ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>データ形式</td>
                                        <td>非構造化テキスト（表示用）</td>
                                        <td>構造化データ（XML/JSON、YANGベース）</td>
                                    </tr>
                                    <tr>
                                        <td>安定性</td>
                                        <td>OSバージョンで出力が変わり壊れやすい</td>
                                        <td>データモデルが変わらない限り安定</td>
                                    </tr>
                                    <tr>
                                        <td>移植性</td>
                                        <td>ベンダー/機種ごとに書き直しが必要</td>
                                        <td>同一モデルなら共通コードで再利用可能</td>
                                    </tr>
                                    <tr>
                                        <td>検証（Validation）</td>
                                        <td>クライアント側で独自に実装</td>
                                        <td>モデル定義（型・制約）に基づき検証可能</td>
                                    </tr>
                                    <tr>
                                        <td>主なプロトコル</td>
                                        <td>SSH + CLI</td>
                                        <td>NETCONF, RESTCONF, gNMI</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>学習のポイント：</strong>出題では「なぜモデル駆動プログラマビリティが価値を持つのか」を一貫性・自動化のしやすさ・スケーラビリティという観点で説明できるかが問われます。丸暗記ではなく「CLI出力は人間向け、YANGモデルは機械向け」という軸で理解すると応用が効きます。
                        </div>
                    </section>

                    {/* SECTION 5.2 */}
                    <section className="section section-block prose" id="s5-2">
                        <div className="section-head">
                            <span className="domain-chip">5.2</span>
                            <div>
                                <h2>コントローラーレベル管理とデバイスレベル管理の比較</h2>
                                <div className="weight-tag">
                                    Compare controller-level to device-level management
                                </div>
                            </div>
                        </div>

                        <p>ネットワークの自動化・管理には大きく2つのアプローチがあります。</p>
                        <ul>
                            <li><strong>デバイスレベル管理</strong>：各デバイスに個別に接続し、NETCONF/RESTCONF/CLIなどで1台ずつ設定する方式。</li>
                            <li><strong>コントローラーレベル管理</strong>：Cisco Catalyst Center、ACI APIC、Meraki Dashboardのような<strong>コントローラー</strong>に対して指示を出し、コントローラーが配下の多数のデバイスへ設定を配布・一元管理する方式。</li>
                        </ul>

                        <Diagram id="diag-5-2" label="Figure 5.2 · コントローラーレベル管理とデバイスレベル管理" />

                        <h3 className="subhead">比較表</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">コントローラーレベル管理</th>
                                        <th scope="col">デバイスレベル管理</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>抽象度</td>
                                        <td>高い（意図ベースの単一API）</td>
                                        <td>低い（デバイス個別のAPI/CLI）</td>
                                    </tr>
                                    <tr>
                                        <td>スケーラビリティ</td>
                                        <td>高い（多数デバイスを一括操作）</td>
                                        <td>低い（台数分の接続・処理が必要）</td>
                                    </tr>
                                    <tr>
                                        <td>一貫性の担保</td>
                                        <td>コントローラーが状態を一元管理</td>
                                        <td>スクリプト側で整合性を担保する必要</td>
                                    </tr>
                                    <tr>
                                        <td>きめ細かい制御</td>
                                        <td>コントローラーの機能範囲に依存</td>
                                        <td>デバイス固有機能へフルアクセス可能</td>
                                    </tr>
                                    <tr>
                                        <td>代表例</td>
                                        <td>Cisco Catalyst Center, ACI APIC, Meraki Dashboard</td>
                                        <td>各デバイスへのNETCONF/RESTCONF/CLI接続</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>学習のポイント：</strong>「規模が大きくなるほどコントローラーレベルの価値が高まる」「デバイス固有の細かい機能を使いたい場合はデバイスレベルが必要になる場合がある」というトレードオフの理解が重要です。
                        </div>
                    </section>

                    {/* SECTION 5.3 */}
                    <section className="section section-block prose" id="s5-3">
                        <div className="section-head">
                            <span className="domain-chip">5.3</span>
                            <div>
                                <h2>ネットワークシミュレーション・テストツール</h2>
                                <div className="weight-tag">
                                    Describe the use and roles of network simulation and test tools (Cisco Modeling Labs, pyATS)
                                </div>
                            </div>
                        </div>

                        <p>
                            自動化コードや設定変更は、本番環境にいきなり適用するとリスクが大きいため、<strong>仮想環境での事前検証</strong>が欠かせません。
                        </p>
                        <ul>
                            <li><strong>Cisco Modeling Labs（CML）</strong>：仮想ルーター/スイッチなどでネットワークトポロジーをまるごとシミュレーションできるプラットフォーム。設計・テスト・トラブルシューティング・学習に使われます。</li>
                            <li><strong>pyATS（Python Automated Test System）</strong>：Python製のテスト自動化フレームワーク。ネットワーク機器に対する検証（状態確認、設定差分検出など）をコードとして記述し、CI/CDパイプラインに組み込めます。</li>
                        </ul>

                        <Diagram id="diag-5-3" label="Figure 5.3 · CML + pyATS を使った検証ワークフロー" />

                        <h3 className="subhead">比較表</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">主な役割</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cisco Modeling Labs（CML）</td>
                                        <td>仮想ネットワークの構築・シミュレーション</td>
                                        <td>実機イメージに近い仮想ノードでトポロジーを再現、GUIとAPIの両方を提供</td>
                                    </tr>
                                    <tr>
                                        <td>pyATS</td>
                                        <td>ネットワークの自動テスト・検証</td>
                                        <td>Python製、CI/CDに統合しやすい、Genieライブラリと組み合わせて機種差分を吸収</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>学習のポイント：</strong>CMLは「作る前に試す（設計・検証用の仮想環境）」、pyATSは「作った後に確かめる（自動テスト・検証フレームワーク）」という役割分担で覚えると整理しやすいです。
                        </div>
                    </section>

                    {/* SECTION 5.4 */}
                    <section className="section section-block prose" id="s5-4">
                        <div className="section-head">
                            <span className="domain-chip">5.4</span>
                            <div>
                                <h2>インフラ自動化におけるCI/CDパイプライン</h2>
                                <div className="weight-tag">
                                    Describe the components and benefits of CI/CD pipeline in infrastructure automation
                                </div>
                            </div>
                        </div>

                        <p>
                            CI/CD（継続的インテグレーション／継続的デリバリー）は、ソフトウェア開発の考え方をネットワークインフラの変更管理に適用したものです。コードの変更を<strong>小さく、頻繁に、自動テストを通しながら</strong>本番へ届けることで、変更に伴うリスクを下げます。
                        </p>

                        <Diagram id="diag-5-4" label="Figure 5.4 · インフラ自動化のCI/CDパイプライン" />

                        <h3 className="subhead">構成要素と利点</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">構成要素</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>バージョン管理（Git）</td>
                                        <td>変更内容と履歴の一元管理、トリガーの起点</td>
                                    </tr>
                                    <tr>
                                        <td>Lint／構文チェック</td>
                                        <td>コードやAnsible Playbookなどの記述ミスを早期検出</td>
                                    </tr>
                                    <tr>
                                        <td>ビルド</td>
                                        <td>必要なアーティファクト（パッケージ、コンテナイメージ等）の生成</td>
                                    </tr>
                                    <tr>
                                        <td>自動テスト</td>
                                        <td>CML/pyATSなどを用いた仮想環境での事前検証</td>
                                    </tr>
                                    <tr>
                                        <td>ステージング環境</td>
                                        <td>本番に近い環境での最終確認</td>
                                    </tr>
                                    <tr>
                                        <td>承認プロセス</td>
                                        <td>人間によるレビュー・ゲート</td>
                                    </tr>
                                    <tr>
                                        <td>デプロイ（本番適用）</td>
                                        <td>自動化ツールによる実際の設定投入</td>
                                    </tr>
                                    <tr>
                                        <td>モニタリング／ロールバック</td>
                                        <td>異常時に前の状態へ迅速に戻す仕組み</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
                                        <td>リスクの低減</td>
                                        <td>小さい変更を都度検証するため大規模障害を防ぎやすい</td>
                                    </tr>
                                    <tr>
                                        <td>再現性</td>
                                        <td>誰が実行しても同じ手順・同じ結果になる</td>
                                    </tr>
                                    <tr>
                                        <td>スピード</td>
                                        <td>手動作業を排除し、変更のリードタイムを短縮</td>
                                    </tr>
                                    <tr>
                                        <td>可視化</td>
                                        <td>パイプラインの各段階の成功／失敗が記録・追跡できる</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 5.5 */}
                    <section className="section section-block prose" id="s5-5">
                        <div className="section-head">
                            <span className="domain-chip">5.5</span>
                            <div>
                                <h2>Infrastructure as Code（IaC）の原則</h2>
                                <div className="weight-tag">
                                    Describe the principles of infrastructure as code
                                </div>
                            </div>
                        </div>

                        <p>
                            Infrastructure as Code（IaC）とは、サーバーやネットワークの構成を<strong>手作業ではなくコードとして記述し、バージョン管理・自動適用する</strong>考え方です。
                        </p>
                        <p>代表的な原則は次の通りです。</p>
                        <ul>
                            <li><strong>宣言的（Declarative）</strong>：「どうやるか」ではなく「どうあるべきか（Desired State）」を記述する</li>
                            <li><strong>冪等性（Idempotency）</strong>：同じコードを何度実行しても結果が変わらない</li>
                            <li><strong>単一の情報源（Single Source of Truth）</strong>：構成はコードリポジトリが正であり、手作業の変更は「ドリフト」とみなす</li>
                            <li><strong>再現性・一貫性</strong>：同じコードから何度でも同じ環境を再現できる</li>
                            <li><strong>バージョン管理との統合</strong>：変更履歴・レビュー・ロールバックがコードの管理と一体化する</li>
                        </ul>

                        <Diagram id="diag-5-5" label="Figure 5.5 · IaCによる状態の収束ループ" />

                        <div className="callout">
                            <strong>学習のポイント：</strong>「宣言的」と「冪等性」の2語は頻出です。「同じPlaybook/Terraformコードを2回実行しても2回目は何も変わらない」という感覚がまさに冪等性であり、IaCの信頼性の根幹です。
                        </div>
                    </section>

                    {/* SECTION 5.6 */}
                    <section className="section section-block prose" id="s5-6">
                        <div className="section-head">
                            <span className="domain-chip">5.6</span>
                            <div>
                                <h2>自動化ツールの機能（Ansible, Terraform, Cisco NSO）</h2>
                                <div className="weight-tag">
                                    Describe the capabilities of automation tools such as Ansible, Terraform, and Cisco NSO
                                </div>
                            </div>
                        </div>

                        <p>
                            CCNAAUTOでは、代表的な3つの自動化ツールの<strong>役割の違い</strong>を理解しているかが問われます。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">主な用途</th>
                                        <th scope="col">記述言語</th>
                                        <th scope="col">動作方式</th>
                                        <th scope="col">状態管理</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Ansible</strong></td>
                                        <td>サーバー/ネットワーク機器の構成管理、アプリ配備</td>
                                        <td>YAML（Playbook）</td>
                                        <td>エージェントレス（SSH/APIでプッシュ型）</td>
                                        <td>実行のたびに現在の状態をチェックし収束させる</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Terraform</strong></td>
                                        <td>クラウドやインフラリソースのプロビジョニング（VM、ネットワーク、サブネット等）</td>
                                        <td>HCL</td>
                                        <td>宣言的、プロバイダー経由でAPIを呼び出す</td>
                                        <td>ステートファイルで管理対象の状態を保持</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cisco NSO</strong></td>
                                        <td>マルチベンダー環境でのネットワークサービスのオーケストレーション</td>
                                        <td>YANGベースのサービスモデル</td>
                                        <td>トランザクション的（全成功 or 全ロールバック）</td>
                                        <td>サービスモデルと実機構成の同期を一元管理</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-5-6" label="Figure 5.6 · ツールの役割分担" />

                        <div className="callout">
                            <strong>学習のポイント：</strong>3つは競合というより補完関係にあることが多いです。Terraformで土台となるインフラを用意し、Ansibleでその上のOS/サービスを構成し、NSOで複数ベンダーのネットワークサービスを一元的にオーケストレーションする、という組み合わせがよく使われます。
                        </div>
                    </section>

                    {/* SECTION 5.7 */}
                    <section className="section section-block prose" id="s5-7">
                        <div className="section-head">
                            <span className="domain-chip">5.7</span>
                            <div>
                                <h2>PythonスクリプトのワークフローをCisco APIから読み解く</h2>
                                <div className="weight-tag">
                                    Identify the workflow being automated by a Python script that uses Cisco APIs (ACI, Meraki, Catalyst Center, RESTCONF)
                                </div>
                            </div>
                        </div>

                        <p>
                            出題では、Meraki・Cisco Catalyst Center・ACI・RESTCONFなどのAPIを呼び出すPythonスクリプトが提示され、「このスクリプトは何を自動化しているか」を特定させる形式が出ます。読み解く際は次の流れを意識します。
                        </p>

                        <Diagram id="diag-5-7" label="Figure 5.7 · Cisco APIを呼び出すPythonスクリプトの流れ" />

                        <h3 className="subhead">サンプルコード（Meraki APIでネットワーク配下のデバイス一覧を取得）</h3>
                        <div className="code-wrapper">
                            <div className="code-label">devices.py</div>
                            <pre className="code-block">
                                <div className="code-line"><span className="hl-kw">import</span> requests</div>
                                <div className="code-line"></div>
                                <div className="code-line">BASE_URL = <span className="hl-str">&quot;https://api.meraki.com/api/v1&quot;</span></div>
                                <div className="code-line">headers = &#123;</div>
                                <div className="code-line">    <span className="hl-str">&quot;Authorization&quot;</span>: <span className="hl-str">&quot;Bearer &lt;API_KEY&gt;&quot;</span>,</div>
                                <div className="code-line">    <span className="hl-str">&quot;Content-Type&quot;</span>: <span className="hl-str">&quot;application/json&quot;</span>,</div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">network_id = <span className="hl-str">&quot;N_123456789&quot;</span></div>
                                <div className="code-line">response = requests.get(</div>
                                <div className="code-line">    <span className="hl-str">f&quot;&#123;BASE_URL&#125;/networks/&#123;network_id&#125;/devices&quot;</span>,</div>
                                <div className="code-line">    headers=headers,</div>
                                <div className="code-line">)</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="hl-kw">if</span> response.status_code == <span className="hl-num">200</span>:</div>
                                <div className="code-line">    devices = response.json()</div>
                                <div className="code-line">    <span className="hl-kw">for</span> device <span className="hl-kw">in</span> devices:</div>
                                <div className="code-line">        <span className="hl-fn">print</span>(device[<span className="hl-str">&quot;name&quot;</span>], device[<span className="hl-str">&quot;model&quot;</span>], device[<span className="hl-str">&quot;serial&quot;</span>])</div>
                                <div className="code-line"><span className="hl-kw">else</span>:</div>
                                <div className="code-line">    <span className="hl-fn">print</span>(<span className="hl-str">f&quot;エラー: &#123;response.status_code&#125;&quot;</span>)</div>
                            </pre>
                        </div>

                        <h3 className="subhead">読み解きのポイント</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">確認するポイント</th>
                                        <th scope="col">このスクリプトでの内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>どのAPIエンドポイントを呼んでいるか</td>
                                        <td><code className="inline">/networks/&#123;network_id&#125;/devices</code></td>
                                    </tr>
                                    <tr>
                                        <td>認証方式は何か</td>
                                        <td>Bearerトークン（カスタムトークン方式）</td>
                                    </tr>
                                    <tr>
                                        <td>HTTPメソッドは何か</td>
                                        <td>GET（取得系の操作）</td>
                                    </tr>
                                    <tr>
                                        <td>レスポンスをどう扱っているか</td>
                                        <td>JSONをパースしてデバイス名・機種・シリアルを表示</td>
                                    </tr>
                                    <tr>
                                        <td>このスクリプトが自動化している業務</td>
                                        <td>特定ネットワーク配下のデバイス一覧の取得</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="subhead">Cisco主要プラットフォームAPIの早見表</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">プラットフォーム</th>
                                        <th scope="col">領域</th>
                                        <th scope="col">典型的なタスク例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Meraki</td>
                                        <td>クラウド管理型ネットワーク</td>
                                        <td>デバイス一覧取得、クライアント一覧取得、ネットワーク設定変更</td>
                                    </tr>
                                    <tr>
                                        <td>Cisco Catalyst Center</td>
                                        <td>エンタープライズネットワーク管理</td>
                                        <td>デバイスインベントリ取得、テンプレート適用、ヘルス状態確認</td>
                                    </tr>
                                    <tr>
                                        <td>ACI</td>
                                        <td>データセンターSDN</td>
                                        <td>テナント/EPG（エンドポイントグループ）の作成・照会</td>
                                    </tr>
                                    <tr>
                                        <td>RESTCONF</td>
                                        <td>デバイス単体のモデル駆動API</td>
                                        <td>インターフェース設定の取得・変更（YANGモデルベース）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 5.8 */}
                    <section className="section section-block prose" id="s5-8">
                        <div className="section-head">
                            <span className="domain-chip">5.8</span>
                            <div>
                                <h2>Ansible Playbookのワークフローの解釈</h2>
                                <div className="weight-tag">
                                    Interpret the workflow being automated by an Ansible playbook
                                </div>
                            </div>
                        </div>

                        <p>
                            Ansible Playbookは、対象ホストに対して行う一連の作業（Task）をYAMLで記述したものです。出題では「このPlaybookは何をしているか」を読み解く力が問われます。特に<strong>パッケージ管理・サービスに関連するユーザー管理・基本的なサービス設定・起動停止</strong>がよく出るパターンです。
                        </p>

                        <Diagram id="diag-5-8" label="Figure 5.8 · Ansible Playbookの実行フロー" />

                        <h3 className="subhead">サンプルPlaybook</h3>
                        <div className="code-wrapper">
                            <div className="code-label">webserver_setup.yml</div>
                            <pre className="code-block">
                                <div className="code-line"><span className="hl-meta">---</span></div>
                                <div className="code-line">- <span className="hl-attr">name:</span> <span className="hl-str">Webサーバーの基本セットアップ</span></div>
                                <div className="code-line">  <span className="hl-attr">hosts:</span> <span className="hl-str">web_servers</span></div>
                                <div className="code-line">  <span className="hl-attr">become:</span> <span className="hl-kw">true</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="hl-attr">tasks:</span></div>
                                <div className="code-line">    - <span className="hl-attr">name:</span> <span className="hl-str">nginxパッケージをインストール</span></div>
                                <div className="code-line">      <span className="hl-attr">apt:</span></div>
                                <div className="code-line">        <span className="hl-attr">name:</span> <span className="hl-str">nginx</span></div>
                                <div className="code-line">        <span className="hl-attr">state:</span> <span className="hl-str">present</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">    - <span className="hl-attr">name:</span> <span className="hl-str">webadminユーザーを作成</span></div>
                                <div className="code-line">      <span className="hl-attr">user:</span></div>
                                <div className="code-line">        <span className="hl-attr">name:</span> <span className="hl-str">webadmin</span></div>
                                <div className="code-line">        <span className="hl-attr">groups:</span> <span className="hl-str">www-data</span></div>
                                <div className="code-line">        <span className="hl-attr">shell:</span> <span className="hl-str">/bin/bash</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">    - <span className="hl-attr">name:</span> <span className="hl-str">nginx設定ファイルを配置</span></div>
                                <div className="code-line">      <span className="hl-attr">template:</span></div>
                                <div className="code-line">        <span className="hl-attr">src:</span> <span className="hl-str">nginx.conf.j2</span></div>
                                <div className="code-line">        <span className="hl-attr">dest:</span> <span className="hl-str">/etc/nginx/nginx.conf</span></div>
                                <div className="code-line">      <span className="hl-attr">notify:</span> <span className="hl-str">nginxを再起動</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">    - <span className="hl-attr">name:</span> <span className="hl-str">nginxサービスを起動し自動起動を有効化</span></div>
                                <div className="code-line">      <span className="hl-attr">service:</span></div>
                                <div className="code-line">        <span className="hl-attr">name:</span> <span className="hl-str">nginx</span></div>
                                <div className="code-line">        <span className="hl-attr">state:</span> <span className="hl-str">started</span></div>
                                <div className="code-line">        <span className="hl-attr">enabled:</span> <span className="hl-kw">true</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="hl-attr">handlers:</span></div>
                                <div className="code-line">    - <span className="hl-attr">name:</span> <span className="hl-str">nginxを再起動</span></div>
                                <div className="code-line">      <span className="hl-attr">service:</span></div>
                                <div className="code-line">        <span className="hl-attr">name:</span> <span className="hl-str">nginx</span></div>
                                <div className="code-line">        <span className="hl-attr">state:</span> <span className="hl-str">restarted</span></div>
                            </pre>
                        </div>

                        <h3 className="subhead">読み解きのポイント</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Playbookの要素</th>
                                        <th scope="col">このサンプルでの内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>対象ホスト（hosts）</td>
                                        <td><code className="inline">web_servers</code> グループ</td>
                                    </tr>
                                    <tr>
                                        <td>権限昇格（become）</td>
                                        <td>有効（root権限で実行）</td>
                                    </tr>
                                    <tr>
                                        <td>パッケージ管理タスク</td>
                                        <td><code className="inline">apt</code> モジュールで <code className="inline">nginx</code> をインストール</td>
                                    </tr>
                                    <tr>
                                        <td>ユーザー管理タスク</td>
                                        <td><code className="inline">user</code> モジュールで <code className="inline">webadmin</code> を作成</td>
                                    </tr>
                                    <tr>
                                        <td>サービス設定タスク</td>
                                        <td><code className="inline">template</code> モジュールで設定ファイルを配置</td>
                                    </tr>
                                    <tr>
                                        <td>起動・停止タスク</td>
                                        <td><code className="inline">service</code> モジュールで起動＋自動起動を有効化</td>
                                    </tr>
                                    <tr>
                                        <td>Handler（変更時のみ実行）</td>
                                        <td>設定ファイルが変更された場合のみ <code className="inline">nginx</code> を再起動</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 5.9 */}
                    <section className="section section-block prose" id="s5-9">
                        <div className="section-head">
                            <span className="domain-chip">5.9</span>
                            <div>
                                <h2>Bashスクリプトのワークフローの解釈</h2>
                                <div className="weight-tag">
                                    Interpret the workflow being automated by a bash script
                                </div>
                            </div>
                        </div>

                        <p>
                            Bashスクリプトは、ファイル管理・アプリのインストール・ユーザー管理・ディレクトリ操作などをまとめて自動化する際によく使われます。出題では、スクリプトを読んで「何を目的とした処理か」を答える形式が中心です。
                        </p>

                        <Diagram id="diag-5-9" label="Figure 5.9 · Bashスクリプトの処理フロー" />

                        <h3 className="subhead">サンプルスクリプト</h3>
                        <div className="code-wrapper">
                            <div className="code-label">setup.sh</div>
                            <pre className="code-block">
                                <div className="code-line"><span className="hl-meta">#!/bin/bash</span></div>
                                <div className="code-line"><span className="hl-fn">set</span> -e</div>
                                <div className="code-line"></div>
                                <div className="code-line">APP_DIR=<span className="hl-str">&quot;/opt/myapp&quot;</span></div>
                                <div className="code-line">LOG_FILE=<span className="hl-str">&quot;/var/log/myapp_setup.log&quot;</span></div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="hl-fn">cd</span> <span className="hl-str">&quot;$APP_DIR&quot;</span> || <span className="hl-fn">exit</span> 1</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="hl-kw">if</span> [ ! -f <span className="hl-str">&quot;$APP_DIR/config.yaml&quot;</span> ]; <span className="hl-kw">then</span></div>
                                <div className="code-line">    <span className="hl-fn">echo</span> <span className="hl-str">&quot;config.yamlが見つかりません。新規作成します。&quot;</span> &gt;&gt; <span className="hl-str">&quot;$LOG_FILE&quot;</span></div>
                                <div className="code-line">    cp <span className="hl-str">&quot;$APP_DIR/config.yaml.default&quot;</span> <span className="hl-str">&quot;$APP_DIR/config.yaml&quot;</span></div>
                                <div className="code-line"><span className="hl-kw">fi</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">apt-get update &amp;&amp; apt-get install -y python3-pip</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="hl-kw">if</span> ! id <span className="hl-str">&quot;appuser&quot;</span> &amp;&gt;/dev/null; <span className="hl-kw">then</span></div>
                                <div className="code-line">    useradd -m -s /bin/bash appuser</div>
                                <div className="code-line"><span className="hl-kw">fi</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">chown -R appuser:appuser <span className="hl-str">&quot;$APP_DIR&quot;</span></div>
                                <div className="code-line">chmod 750 <span className="hl-str">&quot;$APP_DIR&quot;</span></div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="hl-fn">echo</span> <span className="hl-str">&quot;セットアップ完了: $(date)&quot;</span> &gt;&gt; <span className="hl-str">&quot;$LOG_FILE&quot;</span></div>
                            </pre>
                        </div>

                        <h3 className="subhead">読み解きのポイント</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">行・処理</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code className="inline">set -e</code></td>
                                        <td>コマンドが失敗した時点でスクリプトを終了する（エラー時の安全策）</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">cd &quot;$APP_DIR&quot;</code></td>
                                        <td>作業ディレクトリへ移動（ディレクトリナビゲーション）</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">if [ ! -f ... ]</code></td>
                                        <td>ファイルが存在しない場合のみ処理を実行する条件分岐</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">apt-get install</code></td>
                                        <td>パッケージ（アプリ）のインストール</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">id ... || useradd</code></td>
                                        <td>ユーザーが存在しなければ作成する（ユーザー管理）</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">chown</code> / <code className="inline">chmod</code></td>
                                        <td>所有者・権限設定（ファイル管理）</td>
                                    </tr>
                                    <tr>
                                        <td>ログ出力</td>
                                        <td>実行結果を後から追跡できるよう記録</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 5.10 */}
                    <section className="section section-block prose" id="s5-10">
                        <div className="section-head">
                            <span className="domain-chip">5.10</span>
                            <div>
                                <h2>RESTCONF/NETCONFクエリ結果の解釈</h2>
                                <div className="weight-tag">
                                    Interpret the results of a RESTCONF or NETCONF query
                                </div>
                            </div>
                        </div>

                        <p>
                            RESTCONFとNETCONFは、どちらも<strong>YANGデータモデルに基づくモデル駆動プログラマビリティ</strong>を実現するプロトコルですが、トランスポートやデータ形式に違いがあります。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">RESTCONF</th>
                                        <th scope="col">NETCONF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>トランスポート</td>
                                        <td>HTTPS</td>
                                        <td>SSH</td>
                                    </tr>
                                    <tr>
                                        <td>データ形式</td>
                                        <td>JSON（またはXML）</td>
                                        <td>XML</td>
                                    </tr>
                                    <tr>
                                        <td>操作方法</td>
                                        <td>GET/POST/PUT/PATCH/DELETEなどHTTPメソッド</td>
                                        <td><code className="inline">&lt;get-config&gt;</code>, <code className="inline">&lt;edit-config&gt;</code> などのRPC操作</td>
                                    </tr>
                                    <tr>
                                        <td>設計思想</td>
                                        <td>RESTfulなWeb API親和性</td>
                                        <td>トランザクション性・複数candidate/runningデータストア管理に強み</td>
                                    </tr>
                                    <tr>
                                        <td>主なユースケース</td>
                                        <td>Web/自動化ツールとの連携がしやすい</td>
                                        <td>厳密な設定変更のトランザクション管理</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="diag-5-10" label="Figure 5.10 · RESTCONF/NETCONFのクエリ応答シーケンス" />

                        <h3 className="subhead">RESTCONFレスポンス例（JSON）</h3>
                        <div className="code-wrapper">
                            <div className="code-label">restconf-response.json</div>
                            <pre className="code-block">
                                <div className="code-line">&#123;</div>
                                <div className="code-line">  <span className="hl-attr">&quot;ietf-interfaces:interface&quot;</span>: [</div>
                                <div className="code-line">    &#123;</div>
                                <div className="code-line">      <span className="hl-attr">&quot;name&quot;</span>: <span className="hl-str">&quot;GigabitEthernet0/1&quot;</span>,</div>
                                <div className="code-line">      <span className="hl-attr">&quot;type&quot;</span>: <span className="hl-str">&quot;iana-if-type:ethernetCsmacd&quot;</span>,</div>
                                <div className="code-line">      <span className="hl-attr">&quot;enabled&quot;</span>: <span className="hl-kw">true</span>,</div>
                                <div className="code-line">      <span className="hl-attr">&quot;ietf-ip:ipv4&quot;</span>: &#123;</div>
                                <div className="code-line">        <span className="hl-attr">&quot;address&quot;</span>: [</div>
                                <div className="code-line">          &#123; <span className="hl-attr">&quot;ip&quot;</span>: <span className="hl-str">&quot;192.0.2.1&quot;</span>, <span className="hl-attr">&quot;netmask&quot;</span>: <span className="hl-str">&quot;255.255.255.0&quot;</span> &#125;</div>
                                <div className="code-line">        ]</div>
                                <div className="code-line">      &#125;</div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  ]</div>
                                <div className="code-line">&#125;</div>
                            </pre>
                        </div>

                        <h3 className="subhead">NETCONFレスポンス例（XML／rpc-reply）</h3>
                        <div className="code-wrapper">
                            <div className="code-label">netconf-response.xml</div>
                            <pre className="code-block">
                                <div className="code-line">&lt;<span className="hl-fn">rpc-reply</span> <span className="hl-attr">message-id</span>=<span className="hl-str">&quot;101&quot;</span> <span className="hl-attr">xmlns</span>=<span className="hl-str">&quot;urn:ietf:params:xml:ns:netconf:base:1.0&quot;</span>&gt;</div>
                                <div className="code-line">  &lt;<span className="hl-fn">data</span>&gt;</div>
                                <div className="code-line">    &lt;<span className="hl-fn">interfaces</span> <span className="hl-attr">xmlns</span>=<span className="hl-str">&quot;urn:ietf:params:xml:ns:yang:ietf-interfaces&quot;</span>&gt;</div>
                                <div className="code-line">      &lt;<span className="hl-fn">interface</span>&gt;</div>
                                <div className="code-line">        &lt;<span className="hl-fn">name</span>&gt;GigabitEthernet0/1&lt;/<span className="hl-fn">name</span>&gt;</div>
                                <div className="code-line">        &lt;<span className="hl-fn">enabled</span>&gt;true&lt;/<span className="hl-fn">enabled</span>&gt;</div>
                                <div className="code-line">      &lt;/<span className="hl-fn">interface</span>&gt;</div>
                                <div className="code-line">    &lt;/<span className="hl-fn">interfaces</span>&gt;</div>
                                <div className="code-line">  &lt;/<span className="hl-fn">data</span>&gt;</div>
                                <div className="code-line">&lt;/<span className="hl-fn">rpc-reply</span>&gt;</div>
                            </pre>
                        </div>

                        <h3 className="subhead">読み解きのポイント</h3>
                        <ul>
                            <li>RESTCONFの結果は基本的に<strong>JSONのキーバリュー構造</strong>としてそのままPythonの辞書に変換しやすい。</li>
                            <li>NETCONFの結果は<strong>XMLの入れ子構造</strong>（<code className="inline">&lt;rpc-reply&gt;</code> &rarr; <code className="inline">&lt;data&gt;</code> &rarr; モデルの要素）になっており、XPathやXMLパーサーで要素を辿って値を取得する。</li>
                            <li>どちらも「どのYANGモデルの、どの要素の値を取得・設定しているか」を対応づけて読むのが基本です。</li>
                        </ul>
                    </section>

                    {/* SECTION 5.11 */}
                    <section className="section section-block prose" id="s5-11">
                        <div className="section-head">
                            <span className="domain-chip">5.11</span>
                            <div>
                                <h2>基本的なYANGモデルの解釈</h2>
                                <div className="weight-tag">Interpret basic YANG models</div>
                            </div>
                        </div>

                        <p>
                            YANG（Yet Another Next Generation）は、ネットワーク機器の設定・状態データを<strong>構造化して定義するためのデータモデリング言語</strong>です（RFC 7950）。NETCONFやRESTCONFでやり取りされるデータの「型定義書」のような役割を果たします。
                        </p>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code className="inline">module</code></td>
                                        <td>YANGモデル全体の名前空間・単位</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">container</code></td>
                                        <td>関連するデータをグループ化する入れ物（リストではない）</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">list</code></td>
                                        <td>複数のインスタンスを持てる要素（<code className="inline">key</code> で一意に識別）</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">leaf</code></td>
                                        <td>単一の値を持つデータ項目（型を持つ）</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">leaf-list</code></td>
                                        <td>同じ型の値を複数持てるリスト</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">key</code></td>
                                        <td><code className="inline">list</code> 内の各エントリを一意に識別するための項目</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">type</code></td>
                                        <td>データ型（string, boolean, uint16など）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="subhead">サンプルYANGモデル（簡略版・ietf-interfacesの一部を模したもの）</h3>
                        <div className="code-wrapper">
                            <div className="code-label">example-interfaces.yang</div>
                            <pre className="code-block">
                                <div className="code-line">module example-interfaces &#123;</div>
                                <div className="code-line">  namespace &quot;urn:example:interfaces&quot;;</div>
                                <div className="code-line">  prefix &quot;if&quot;;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  container interfaces &#123;</div>
                                <div className="code-line">    list interface &#123;</div>
                                <div className="code-line">      key &quot;name&quot;;</div>
                                <div className="code-line"></div>
                                <div className="code-line">      leaf name &#123;</div>
                                <div className="code-line">        type string;</div>
                                <div className="code-line">      &#125;</div>
                                <div className="code-line">      leaf enabled &#123;</div>
                                <div className="code-line">        type boolean;</div>
                                <div className="code-line">      &#125;</div>
                                <div className="code-line">      leaf mtu &#123;</div>
                                <div className="code-line">        type uint16;</div>
                                <div className="code-line">      &#125;</div>
                                <div className="code-line">      leaf-list address &#123;</div>
                                <div className="code-line">        type string;</div>
                                <div className="code-line">      &#125;</div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                            </pre>
                        </div>

                        <h3 className="subhead">モデルの階層構造</h3>
                        <Diagram id="diag-5-11" label="Figure 5.11 · YANGモデルのツリー構造" />

                        <div className="callout">
                            <strong>学習のポイント：</strong>出題では複雑なYANGモデル定義そのものを暗記する必要はなく、「<code className="inline">list</code> はキーを持つ複数エントリ、<code className="inline">leaf</code> は単一の値、<code className="inline">container</code> は単なるグループ化」という構造上の役割の違いを読み取れれば十分対応できます。
                        </div>
                    </section>

                    {/* SECTION 5.12 */}
                    <section className="section section-block prose" id="s5-12">
                        <div className="section-head">
                            <span className="domain-chip">5.12</span>
                            <div>
                                <h2>Unified Diffの解釈</h2>
                                <div className="weight-tag">Interpret a unified diff</div>
                            </div>
                        </div>

                        <p>
                            Unified Diff（統一diff形式）は、Gitなどのバージョン管理システムで<strong>2つのファイル（変更前・変更後）の差分</strong>を表現する標準的なフォーマットです。コードレビューやPull Requestの差分表示で日常的に目にします。
                        </p>

                        <Diagram id="diag-5-12" label="Figure 5.12 · diffが生まれるまでのワークフロー" />

                        <h3 className="subhead">Unified Diffのサンプル</h3>
                        <div className="code-wrapper">
                            <div className="code-label">playbook.yml.diff</div>
                            <pre className="code-block">
                                <div className="code-line"><span className="hl-cm">--- a/playbook.yml</span></div>
                                <div className="code-line"><span className="hl-cm">+++ b/playbook.yml</span></div>
                                <div className="code-line"><span className="hl-meta">@@ -5,7 +5,7 @@</span></div>
                                <div className="code-line">   tasks:</div>
                                <div className="code-line">     - name: nginxパッケージをインストール</div>
                                <div className="code-line">       apt:</div>
                                <div className="code-line"><span className="hl-del">-        name: nginx</span></div>
                                <div className="code-line"><span className="hl-add">+        name: nginx=1.18.0-6ubuntu14</span></div>
                                <div className="code-line">         state: present</div>
                                <div className="code-line"></div>
                                <div className="code-line">     - name: webadminユーザーを作成</div>
                                <div className="code-line">       user:</div>
                            </pre>
                        </div>

                        <h3 className="subhead">構文要素の意味</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">記号・要素</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code className="inline">--- a/...</code></td>
                                        <td>変更前ファイル（オリジナル）を示す行</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">+++ b/...</code></td>
                                        <td>変更後ファイルを示す行</td>
                                    </tr>
                                    <tr>
                                        <td><code className="inline">@@ -5,7 +5,7 @@</code></td>
                                        <td>ハンク（変更箇所）の位置。変更前ファイルの5行目から7行分、変更後も5行目から7行分を意味する</td>
                                    </tr>
                                    <tr>
                                        <td>行頭が <code className="inline">-</code></td>
                                        <td>変更前ファイルにのみ存在した行（削除された行）</td>
                                    </tr>
                                    <tr>
                                        <td>行頭が <code className="inline">+</code></td>
                                        <td>変更後ファイルにのみ存在する行（追加された行）</td>
                                    </tr>
                                    <tr>
                                        <td>行頭が空白</td>
                                        <td>変更前後で変わらない「文脈（コンテキスト）」の行</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>読み解きのポイント：</strong>上記の例では、<code className="inline">nginx</code> パッケージのバージョン指定なしのインストールを、<code className="inline">nginx=1.18.0-6ubuntu14</code> という特定バージョン固定のインストールに変更していることが読み取れます。「何が削除され、何が追加されたか」を <code className="inline">-</code> と <code className="inline">+</code> の行から素早く特定する練習をしておきましょう。
                        </div>
                    </section>

                    {/* SECTION 5.13 */}
                    <section className="section section-block prose" id="s5-13">
                        <div className="section-head">
                            <span className="domain-chip">5.13</span>
                            <div>
                                <h2>コードレビューの原則と利点</h2>
                                <div className="weight-tag">
                                    Describe the principles and benefits of a code review process
                                </div>
                            </div>
                        </div>

                        <p>
                            コードレビューは、他のメンバーが書いたコード（Playbook、Terraformコード、Pythonスクリプトなど）を<strong>マージ前に第三者が確認するプロセス</strong>です。インフラ自動化ではコード1つの誤りが本番ネットワーク全体に影響しうるため、特に重要視されます。
                        </p>

                        <Diagram id="diag-5-13" label="Figure 5.13 · コードレビューのワークフロー" />

                        <h3 className="subhead">コードレビューの原則</h3>
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
                                        <td>小さい単位でレビューする</td>
                                        <td>変更が大きすぎるとレビューの質が下がるため、小さく分割する</td>
                                    </tr>
                                    <tr>
                                        <td>客観的な基準を持つ</td>
                                        <td>スタイルガイドやチェックリストに基づいて評価する</td>
                                    </tr>
                                    <tr>
                                        <td>自動チェックを併用する</td>
                                        <td>Lintやユニットテストで機械的に検出できる問題は自動化に任せる</td>
                                    </tr>
                                    <tr>
                                        <td>建設的なフィードバック</td>
                                        <td>個人攻撃ではなく、コードの改善点を具体的に伝える</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="subhead">コードレビューの利点</h3>
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
                                        <td>品質向上</td>
                                        <td>バグや設計上の問題を本番投入前に発見できる</td>
                                    </tr>
                                    <tr>
                                        <td>知識共有</td>
                                        <td>チーム内でコードやシステムの理解が広がる</td>
                                    </tr>
                                    <tr>
                                        <td>一貫性の担保</td>
                                        <td>コーディング規約や設計方針の統一が図れる</td>
                                    </tr>
                                    <tr>
                                        <td>リスク低減</td>
                                        <td>重大な設定ミスがネットワーク全体に波及する前に防止できる</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 5.14 */}
                    <section className="section section-block prose" id="s5-14">
                        <div className="section-head">
                            <span className="domain-chip">5.14</span>
                            <div>
                                <h2>APIコールを含むシーケンス図の解釈</h2>
                                <div className="weight-tag">
                                    Interpret a sequence diagram that includes API calls
                                </div>
                            </div>
                        </div>

                        <p>
                            シーケンス図（Sequence Diagram）は、複数のコンポーネント（クライアント、APIサーバー、認証サーバー、デバイスなど）が<strong>時間の流れに沿ってどのようにやり取りするか</strong>を表現する図です。API連携の全体的な流れを理解・説明する際によく使われます。
                        </p>

                        <h3 className="subhead">読み方の基本ルール</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">図の要素</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>縦の線（ライフライン）</td>
                                        <td>各参加者（Participant）が存在する時間軸</td>
                                    </tr>
                                    <tr>
                                        <td>実線の矢印（&rarr;）</td>
                                        <td>同期的なリクエスト（呼び出し）</td>
                                    </tr>
                                    <tr>
                                        <td>破線の矢印（--&gt;）</td>
                                        <td>レスポンス（応答）</td>
                                    </tr>
                                    <tr>
                                        <td>上から下への時間順</td>
                                        <td>図の上にあるやり取りほど時間的に先に発生する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="subhead">サンプルのシーケンス図</h3>
                        <Diagram id="diag-5-14" label="Figure 5.14 · API連携のシーケンス図の例" />

                        <h3 className="subhead">読み解きのポイント</h3>
                        <p>上記の図から、次のような流れを説明できるようになることが目標です。</p>
                        <ol>
                            <li>利用者アプリはまず認証サーバーに認証情報（client_id/secretなど）を送信する</li>
                            <li>認証サーバーはアクセストークンを発行して利用者アプリへ返す</li>
                            <li>利用者アプリは、そのトークンをAuthorizationヘッダーに付けてCisco APIサーバーへリクエストする</li>
                            <li>Cisco APIサーバーは内部的にネットワークデバイスへ問い合わせる</li>
                            <li>得られた応答データはJSON形式で最終的に利用者アプリへ返却される</li>
                        </ol>
                        <p>
                            このように「誰が」「誰に」「何を」送り、「どんな順序で」応答が返ってくるかを、矢印の向きと上下の順序から追えるようにしておきましょう。
                        </p>
                    </section>

                    {/* SUMMARY */}
                    <section className="section section-block prose" id="summary">
                        <h2>まとめ・学習の進め方</h2>

                        <h3 className="subhead">5.0 Infrastructure and Automation 全項目の早見表</h3>
                        <div className="table-wrapper">
                            <table className="summary-table">
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">タイトル</th>
                                        <th scope="col">ひとことまとめ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>5.1</td>
                                        <td>モデル駆動プログラマビリティの価値</td>
                                        <td>YANG構造化データによる自動化の一貫性・スケーラビリティ</td>
                                    </tr>
                                    <tr>
                                        <td>5.2</td>
                                        <td>コントローラー vs デバイスレベル管理</td>
                                        <td>抽象度とスケールのトレードオフ</td>
                                    </tr>
                                    <tr>
                                        <td>5.3</td>
                                        <td>シミュレーション・テストツール</td>
                                        <td>CMLで作る前に試し、pyATSで作った後に確かめる</td>
                                    </tr>
                                    <tr>
                                        <td>5.4</td>
                                        <td>CI/CDパイプライン</td>
                                        <td>小さく・頻繁に・自動テストしながら安全に届ける</td>
                                    </tr>
                                    <tr>
                                        <td>5.5</td>
                                        <td>Infrastructure as Codeの原則</td>
                                        <td>宣言的・冪等性・単一の情報源</td>
                                    </tr>
                                    <tr>
                                        <td>5.6</td>
                                        <td>自動化ツール（Ansible/Terraform/NSO）</td>
                                        <td>プロビジョニング・構成管理・オーケストレーションの補完関係</td>
                                    </tr>
                                    <tr>
                                        <td>5.7</td>
                                        <td>Pythonスクリプトのワークフロー識別</td>
                                        <td>どのAPI・どの操作・何を自動化しているかを特定する</td>
                                    </tr>
                                    <tr>
                                        <td>5.8</td>
                                        <td>Ansible Playbookの解釈</td>
                                        <td>Task単位で処理内容とHandlerの発火条件を追う</td>
                                    </tr>
                                    <tr>
                                        <td>5.9</td>
                                        <td>Bashスクリプトの解釈</td>
                                        <td>ファイル/ユーザー/パッケージ操作の目的を読み取る</td>
                                    </tr>
                                    <tr>
                                        <td>5.10</td>
                                        <td>RESTCONF/NETCONFクエリ結果の解釈</td>
                                        <td>JSON(REST)とXML(NETCONF)の構造を読み解く</td>
                                    </tr>
                                    <tr>
                                        <td>5.11</td>
                                        <td>YANGモデルの解釈</td>
                                        <td>module/container/list/leafの役割の違い</td>
                                    </tr>
                                    <tr>
                                        <td>5.12</td>
                                        <td>Unified Diffの解釈</td>
                                        <td><code className="inline">-</code>/<code className="inline">+</code>/文脈行から変更内容を特定する</td>
                                    </tr>
                                    <tr>
                                        <td>5.13</td>
                                        <td>コードレビューの原則と利点</td>
                                        <td>品質・知識共有・一貫性・リスク低減</td>
                                    </tr>
                                    <tr>
                                        <td>5.14</td>
                                        <td>シーケンス図の解釈</td>
                                        <td>参加者・矢印の向き・時間順序を追う</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="subhead">学習の進め方のおすすめ</h3>
                        <ol>
                            <li>まず<strong>5.5（IaCの原則）と5.6（ツールの役割分担）</strong>で全体感を掴む</li>
                            <li>次に<strong>5.1・5.2・5.11</strong>でモデル駆動プログラマビリティとYANGの基礎を固める</li>
                            <li><strong>5.7〜5.10・5.12・5.14</strong>は、実際に短いサンプルコード／出力／図を読んで「何をしているか」を口頭で説明する練習を繰り返す（試験本番と同じ形式の練習になります）</li>
                            <li><strong>5.3・5.4・5.13</strong>はプロセス・原則の理解が中心なので、キーワード（CI/CD、シミュレーション、コードレビュー）と目的をセットで覚える</li>
                        </ol>
                    </section>

                    {/* SOURCES */}
                    <footer className="footer prose section-block" id="sources">
                        <h2>参考文献・出典</h2>
                        <p>本記事は以下の一次情報源に基づいて作成しています。</p>
                        <ul className="source-list">
                            <li>
                                <span className="src-name">Cisco &middot; CCNA Automation certification（認定概要）</span>
                                <a href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html" target="_blank" rel="noopener">
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Cisco &middot; CCNA Automation Exam and Training（試験詳細）</span>
                                <a href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html" target="_blank" rel="noopener">
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Cisco Learning Network &middot; CCNAAUTO 200-901 Exam Topics（出題項目一覧ページ）</span>
                                <a href="https://learningnetwork.cisco.com/s/ccnaauto-exam-topics" target="_blank" rel="noopener">
                                    https://learningnetwork.cisco.com/s/ccnaauto-exam-topics
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Cisco &middot; Automating Networks Using Cisco Platforms v1.1（200-901）公式出題項目PDF（一次情報源・本記事5.0ドメインの項目番号の出典）</span>
                                <a href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf" target="_blank" rel="noopener">
                                    https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Cisco DevNet &middot; Cisco Modeling Labs（CML）製品情報</span>
                                <a href="https://developer.cisco.com/modeling-labs/" target="_blank" rel="noopener">
                                    https://developer.cisco.com/modeling-labs/
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Cisco DevNet &middot; pyATSドキュメント</span>
                                <a href="https://developer.cisco.com/docs/pyats/" target="_blank" rel="noopener">
                                    https://developer.cisco.com/docs/pyats/
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Cisco DevNet &middot; Cisco Network Services Orchestrator（NSO）</span>
                                <a href="https://developer.cisco.com/site/nso/" target="_blank" rel="noopener">
                                    https://developer.cisco.com/site/nso/
                                </a>
                            </li>
                            <li>
                                <span className="src-name">IETF &middot; RFC 7950: The YANG 1.1 Data Modeling Language</span>
                                <a href="https://www.rfc-editor.org/rfc/rfc7950" target="_blank" rel="noopener">
                                    https://www.rfc-editor.org/rfc/rfc7950
                                </a>
                            </li>
                            <li>
                                <span className="src-name">IETF &middot; RFC 6241: Network Configuration Protocol（NETCONF）</span>
                                <a href="https://www.rfc-editor.org/rfc/rfc6241" target="_blank" rel="noopener">
                                    https://www.rfc-editor.org/rfc/rfc6241
                                </a>
                            </li>
                            <li>
                                <span className="src-name">IETF &middot; RFC 8040: RESTCONF Protocol</span>
                                <a href="https://www.rfc-editor.org/rfc/rfc8040" target="_blank" rel="noopener">
                                    https://www.rfc-editor.org/rfc/rfc8040
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Ansible &middot; 公式ドキュメント</span>
                                <a href="https://docs.ansible.com/" target="_blank" rel="noopener">
                                    https://docs.ansible.com/
                                </a>
                            </li>
                            <li>
                                <span className="src-name">HashiCorp &middot; Terraform公式ドキュメント</span>
                                <a href="https://developer.hashicorp.com/terraform/docs" target="_blank" rel="noopener">
                                    https://developer.hashicorp.com/terraform/docs
                                </a>
                            </li>
                            <li>
                                <span className="src-name">Git &middot; git-diff公式ドキュメント（Unified Diff形式）</span>
                                <a href="https://git-scm.com/docs/git-diff" target="_blank" rel="noopener">
                                    https://git-scm.com/docs/git-diff
                                </a>
                            </li>
                        </ul>
                        <div className="disclaimer">
                            <strong>免責事項：</strong>出題比率・出題項目の番号（5.1〜5.14）はCiscoが公開する公式出題項目PDF（上表参照）に基づいていますが、Cisco公式の記載どおり「実際の試験ではガイドラインに記載のない関連トピックが出題される場合があり、内容は予告なく変更される可能性があります」。最新の出題範囲は必ず上記のCisco公式ページで確認してください。
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
