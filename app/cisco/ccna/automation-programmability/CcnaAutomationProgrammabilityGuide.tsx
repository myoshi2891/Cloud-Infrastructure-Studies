'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
}

export default function CcnaAutomationProgrammabilityGuide() {
    return (
        <div className="ccna-automation-programmability-page">
            <div className="layout">
                <NavBar />

                <main className="content">
                    <div className="hero">
                        <div className="eyebrow">CCNA 200-301 試験対策ガイド</div>
                        <h1>
                            6.0 自動化とプログラマビリティ<br />
                            Automation and Programmability
                        </h1>
                        <p className="lede">
                            Cisco CCNA 200-301 認定試験（v1.1 ブループリント）のドメイン6「自動化とプログラマビリティ」（出題比率10%）を、ネットワーク自動化を学び始めたばかりの人でも理解できるよう、ステップバイステップで解説します。
                        </p>
                    </div>

                    <section id="overview">
                        <h2>
                            <span className="num">00</span> このドメインの全体像
                        </h2>
                        <p>
                            CCNA 200-301 試験は、以下の6つのドメインから構成されています。ドメイン6「自動化とプログラマビリティ」は出題比率こそ10%と最も低い部類ですが、<strong>2024年8月20日に施行されたv1.1ブループリントで最も内容が刷新されたドメイン</strong>でもあり、生成AI・機械学習・Terraformといった新しいキーワードが追加されています。
                        </p>

                        <div className="table-wrap">
                            <table className="dtable">
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
                                        <td>ネットワークの基礎 (Network Fundamentals)</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>2.0</td>
                                        <td>ネットワークアクセス (Network Access)</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>3.0</td>
                                        <td>IP接続性 (IP Connectivity)</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>4.0</td>
                                        <td>IPサービス (IP Services)</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr>
                                        <td>5.0</td>
                                        <td>セキュリティの基礎 (Security Fundamentals)</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>6.0</strong></td>
                                        <td><strong>自動化とプログラマビリティ</strong></td>
                                        <td><strong>10%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>📌 初学者向け補足</strong> — 出題比率が低いからといって軽視してよいわけではありません。特にこのドメインは「読んで理解できれば得点できる」暗記寄りの領域が多く、CLIでの実機操作を問われることはほぼありません。コストパフォーマンスの高い得点源です。
                        </div>

                        <h3>v1.1ブループリントでの変更点まとめ</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">項目番号</th>
                                        <th scope="col">内容</th>
                                        <th scope="col">v1.1での変更点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>6.1</td>
                                        <td>自動化がネットワーク管理に与える影響を説明する</td>
                                        <td>変更なし</td>
                                    </tr>
                                    <tr>
                                        <td>6.2</td>
                                        <td>従来のネットワークとコントローラベースネットワーキングを比較する</td>
                                        <td>変更なし</td>
                                    </tr>
                                    <tr>
                                        <td>6.3</td>
                                        <td>コントローラベース・SDNアーキテクチャ（オーバーレイ、アンダーレイ、ファブリック）を説明する</td>
                                        <td>変更なし</td>
                                    </tr>
                                    <tr>
                                        <td>6.3.a</td>
                                        <td>制御プレーンとデータプレーンの分離</td>
                                        <td>変更なし</td>
                                    </tr>
                                    <tr>
                                        <td>6.3.b</td>
                                        <td>ノースバウンドAPIとサウスバウンドAPI</td>
                                        <td>変更なし</td>
                                    </tr>
                                    <tr>
                                        <td>6.4</td>
                                        <td>ネットワーク運用における（生成的および予測的）AIと機械学習を説明する</td>
                                        <td>
                                            <strong>新規</strong>。旧v1.0の「従来型のキャンパスデバイス管理とCisco DNA Centerによるデバイス管理の比較」から置き換えられた
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6.5</td>
                                        <td>REST APIの特徴（認証方式、CRUD、HTTPメソッド、データエンコーディング）を説明する</td>
                                        <td><strong>認証方式（authentication types）が追加</strong></td>
                                    </tr>
                                    <tr>
                                        <td>6.6</td>
                                        <td>構成管理の仕組み（Ansible、Terraformなど）を認識する</td>
                                        <td>
                                            <strong>旧v1.0のPuppet／ChefからAnsible／Terraformへ変更</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6.7</td>
                                        <td>JSONエンコードされたデータの構成要素を認識する</td>
                                        <td>変更なし</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="sec61">
                        <h2>
                            <span className="num">6.1</span> 自動化がネットワーク管理に与える影響
                        </h2>

                        <h3>従来型の運用スタイル</h3>
                        <p>
                            従来のネットワーク運用では、エンジニアが1台ずつ機器にSSHやコンソールでログインし、CLI（コマンドラインインターフェース）でコマンドを打ち込んで設定します。機器の台数が少ないうちは問題になりませんが、数十台・数百台規模になると、以下のような課題が顕在化します。
                        </p>
                        <ul>
                            <li>
                                <strong>作業時間の増大</strong>：1台あたり数分の作業でも、100台になれば膨大な時間がかかる
                            </li>
                            <li>
                                <strong>設定ミスのリスク</strong>：手作業でのコピー&amp;ペーストやタイプミスによる人為的ミス
                            </li>
                            <li>
                                <strong>設定の不整合</strong>：同じ役割の機器でも、担当者や作業日によって微妙に設定が異なってしまう
                            </li>
                            <li>
                                <strong>変更履歴の追跡困難</strong>：「いつ・誰が・何を変更したか」が残りにくい
                            </li>
                        </ul>

                        <h3>自動化による解決</h3>
                        <p>
                            自動化（Automation）とは、人手による繰り返し作業をスクリプトやツールに代行させる手法です。あらかじめ「あるべき設定（テンプレート）」を定義しておき、それを多数の機器へ一括で適用します。
                        </p>

                        <figure className="diagram-figure">
                            <Diagram id="fig1" label="Fig. 1 — 手動運用と自動化された運用の比較" />
                            <figcaption>Fig. 1 — 手動運用と自動化された運用の比較</figcaption>
                        </figure>

                        <h3>自動化がもたらす主なメリット</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">メリット</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>一貫性 (Consistency)</td>
                                        <td>同じ定義から設定を投入するため、機器間の設定ブレがなくなる</td>
                                    </tr>
                                    <tr>
                                        <td>拡張性 (Scalability)</td>
                                        <td>機器が10台でも1,000台でも、同じ作業手順で対応できる</td>
                                    </tr>
                                    <tr>
                                        <td>迅速性 (Speed)</td>
                                        <td>手作業に比べて圧倒的に短時間で設定変更が完了する</td>
                                    </tr>
                                    <tr>
                                        <td>人為的ミスの低減</td>
                                        <td>タイプミスやコピー漏れなどのヒューマンエラーを削減できる</td>
                                    </tr>
                                    <tr>
                                        <td>再現性・文書化</td>
                                        <td>設定定義（コード）自体が「何を設定したか」の記録として残る</td>
                                    </tr>
                                    <tr>
                                        <td>コンプライアンス強化</td>
                                        <td>定期的に「あるべき状態」との差分チェックを自動実行できる</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="sec62">
                        <h2>
                            <span className="num">6.2</span> 従来のネットワークとコントローラベースネットワーキングの比較
                        </h2>

                        <h3>従来型ネットワークの特徴</h3>
                        <p>
                            従来型のネットワークでは、各機器（ルータ・スイッチ）が<strong>自律的に</strong>動作します。それぞれの機器が個別に「制御プレーン（経路計算などの頭脳部分）」と「データプレーン（実際にパケットを転送する部分）」の両方を持ち、隣接機器とルーティングプロトコルなどで情報交換しながら独立して判断を下します。
                        </p>

                        <h3>コントローラベースネットワークの特徴</h3>
                        <p>
                            コントローラベースネットワーク（SDN：Software-Defined Networking の考え方）では、ネットワーク全体の制御ロジックを<strong>1つの集中管理ポイント（コントローラ）</strong>に集約します。個々の機器は主に「データプレーン（転送処理）」に専念し、経路計算などの判断はコントローラが代行して各機器に指示を出します。
                        </p>

                        <figure className="diagram-figure">
                            <Diagram id="fig2" label="Fig. 2 — 従来型ネットワークとコントローラベースネットワークの比較" />
                            <figcaption>Fig. 2 — 従来型ネットワークとコントローラベースネットワークの比較</figcaption>
                        </figure>

                        <h3>比較表</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">従来型ネットワーク</th>
                                        <th scope="col">コントローラベースネットワーク</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>制御ロジックの所在</td>
                                        <td>各機器が個別に保持（分散）</td>
                                        <td>コントローラに集約（集中）</td>
                                    </tr>
                                    <tr>
                                        <td>設定変更の方法</td>
                                        <td>機器ごとにCLIで個別設定</td>
                                        <td>コントローラのGUI/APIから一括投入</td>
                                    </tr>
                                    <tr>
                                        <td>ネットワーク全体の可視性</td>
                                        <td>機器ごとの情報を個別に確認する必要がある</td>
                                        <td>コントローラが全体トポロジを一元的に把握</td>
                                    </tr>
                                    <tr>
                                        <td>拡張性</td>
                                        <td>機器台数の増加に伴い運用負荷が線形に増加</td>
                                        <td>ポリシーベースで一括管理でき運用負荷を抑えやすい</td>
                                    </tr>
                                    <tr>
                                        <td>代表例</td>
                                        <td>従来のルータ/スイッチによるネットワーク</td>
                                        <td>Cisco DNA Center、Cisco ACI など</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="sec63">
                        <h2>
                            <span className="num">6.3</span> コントローラベース・SDNアーキテクチャ
                        </h2>
                        <p>
                            コントローラベースのSDNアーキテクチャは、一般的に「アンダーレイ」「オーバーレイ」「ファブリック」という3つの概念で説明されます。
                        </p>
                        <ul>
                            <li>
                                <strong>アンダーレイ (Underlay)</strong>：物理的なスイッチ・ルータ・ケーブルで構成される、実際のIP到達性を提供する土台のネットワーク
                            </li>
                            <li>
                                <strong>オーバーレイ (Overlay)</strong>：アンダーレイの上に構築される論理的なネットワーク。VXLANなどのトンネリング技術を使い、物理構成を意識せずに仮想ネットワークを自由に設計できる
                            </li>
                            <li>
                                <strong>ファブリック (Fabric)</strong>：アンダーレイとオーバーレイを組み合わせ、コントローラによって一元的に管理・自動化された、ネットワーク全体の総称
                            </li>
                        </ul>

                        <figure className="diagram-figure">
                            <Diagram id="fig3" label="Fig. 3 — ファブリック、オーバーレイ、アンダーレイの関係" />
                            <figcaption>Fig. 3 — ファブリック、オーバーレイ、アンダーレイの関係</figcaption>
                        </figure>

                        <h3>6.3.a 制御プレーンとデータプレーンの分離</h3>
                        <p>SDNの中心的な考え方が「制御プレーンとデータプレーンの分離」です。</p>
                        <ul>
                            <li>
                                <strong>制御プレーン (Control Plane)</strong>：「どの経路でパケットを送るべきか」を判断する頭脳部分。SDNではコントローラに集約される
                            </li>
                            <li>
                                <strong>データプレーン (Data Plane)</strong>：制御プレーンの指示に従って、実際にパケットを転送する実行部分。各機器（スイッチ・ルータ）が担う
                            </li>
                        </ul>
                        <p>
                            この分離により、ネットワーク機器はシンプルな「転送装置」に徹することができ、複雑な経路計算ロジックはコントローラ側にまとめて実装・更新できるようになります。
                        </p>

                        <h3>6.3.b ノースバウンドAPIとサウスバウンドAPI</h3>
                        <p>
                            コントローラは、上位のアプリケーションと下位のネットワーク機器の両方とやり取りします。この2方向の通信インターフェースを、それぞれ「ノースバウンドAPI」「サウスバウンドAPI」と呼びます。
                        </p>
                        <ul>
                            <li>
                                <strong>ノースバウンドAPI (Northbound API)</strong>：コントローラと、その上位にある業務アプリケーション・自動化ツール・オーケストレーターとの間のインターフェース。一般にREST APIが使われる
                            </li>
                            <li>
                                <strong>サウスバウンドAPI (Southbound API)</strong>：コントローラと、その下位にあるネットワーク機器との間のインターフェース。NETCONF、OpenFlow、SNMPなどが使われる
                            </li>
                        </ul>

                        <div className="callout">
                            <strong>📌 覚え方</strong> — 地図の方位と同様に「北（ノース）＝上（アプリケーション側）」「南（サウス）＝下（機器側）」とイメージすると覚えやすいです。
                        </div>

                        <figure className="diagram-figure">
                            <Diagram id="fig4" label="Fig. 4 — ノースバウンドAPIとサウスバウンドAPI" />
                            <figcaption>Fig. 4 — ノースバウンドAPIとサウスバウンドAPI</figcaption>
                        </figure>
                    </section>

                    <section id="sec64">
                        <h2>
                            <span className="num">6.4</span> ネットワーク運用におけるAI（生成的・予測的）と機械学習
                        </h2>
                        <p>
                            この項目は<strong>v1.1ブループリントで新規に追加された</strong>、最も新しいトピックです。旧v1.0にあった「従来型キャンパスデバイス管理とCisco DNA Centerの比較」という項目が削除され、代わりに設けられました。
                        </p>

                        <h3>機械学習 (Machine Learning) とは</h3>
                        <p>
                            ネットワークが日々生成する大量のテレメトリデータ（ログ、トラフィック統計、機器の状態情報など）を学習し、そこから「通常時のパターン」を自動的に導き出す技術です。CCNAレベルでは、実装方法ではなく「何ができるのか」を高いレベルで理解していれば十分です。
                        </p>

                        <h3>予測的AI (Predictive AI) の役割</h3>
                        <p>
                            過去のデータパターンから将来を予測する用途です。ネットワーク運用における代表例は次のとおりです。
                        </p>
                        <ul>
                            <li>障害の予兆検知（機器の劣化・リンク品質の低下などを、故障が発生する前に検出）</li>
                            <li>トラフィック量の将来予測に基づく容量計画（キャパシティプランニング）</li>
                            <li>異常なトラフィックパターンの検出（セキュリティインシデントの早期発見）</li>
                        </ul>

                        <h3>生成的AI (Generative AI) の役割</h3>
                        <p>
                            既存のデータやパターンから、新しいコンテンツ（文章・設定案など）を生成する用途です。ネットワーク運用における代表例は次のとおりです。
                        </p>
                        <ul>
                            <li>自然言語での問い合わせに応じた設定コマンド案の生成</li>
                            <li>トラブルシューティング時の原因候補・対処方法の提案</li>
                            <li>運用ドキュメントやレポートの自動生成</li>
                        </ul>

                        <figure className="diagram-figure">
                            <Diagram id="fig5" label="Fig. 5 — ネットワーク運用におけるAI・機械学習の活用フロー" />
                            <figcaption>Fig. 5 — ネットワーク運用におけるAI・機械学習の活用フロー</figcaption>
                        </figure>

                        <h3>比較まとめ</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">主な目的</th>
                                        <th scope="col">ネットワーク運用での代表例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>予測的AI (Predictive AI)</td>
                                        <td>過去データから未来の状態を予測する</td>
                                        <td>障害予兆検知、キャパシティプランニング</td>
                                    </tr>
                                    <tr>
                                        <td>生成的AI (Generative AI)</td>
                                        <td>新しいコンテンツ（テキスト・設定案）を生成する</td>
                                        <td>設定コマンドの提案、トラブルシュート支援、レポート自動生成</td>
                                    </tr>
                                    <tr>
                                        <td>機械学習 (Machine Learning)</td>
                                        <td>データからパターンを学習し、判断の基盤を作る</td>
                                        <td>異常検知、上記2つのAI活用の土台となる技術</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="sec65">
                        <h2>
                            <span className="num">6.5</span> REST APIの特徴
                        </h2>

                        <h3>REST APIとは</h3>
                        <div className="callout">
                            <strong>📌 初学者向け補足</strong> — API（Application Programming Interface）とは、ソフトウェア同士が情報をやり取りするための「窓口」のようなものです。REST APIは、Web上で広く使われている「HTTP」という通信方式を利用して、この窓口を実現する設計思想（アーキテクチャスタイル）の1つです。
                        </div>
                        <p>
                            REST APIでは、HTTPの標準的なメソッド（動詞）を使って、リソース（例：VLAN設定、インターフェース情報など）に対する操作を表現します。この操作は「CRUD」という4つの基本操作に対応づけられます。
                        </p>

                        <h3>HTTPメソッドとCRUD操作の対応</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">HTTPメソッド</th>
                                        <th scope="col">CRUD操作</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>POST</code></td>
                                        <td>Create（作成）</td>
                                        <td>新しいリソースを作成する</td>
                                    </tr>
                                    <tr>
                                        <td><code>GET</code></td>
                                        <td>Read（読み取り）</td>
                                        <td>リソースの情報を取得する（参照のみ、変更なし）</td>
                                    </tr>
                                    <tr>
                                        <td><code>PUT</code></td>
                                        <td>Update（更新）</td>
                                        <td>リソース全体を置き換える形で更新する</td>
                                    </tr>
                                    <tr>
                                        <td><code>PATCH</code></td>
                                        <td>Update（更新）</td>
                                        <td>リソースの一部分のみを更新する</td>
                                    </tr>
                                    <tr>
                                        <td><code>DELETE</code></td>
                                        <td>Delete（削除）</td>
                                        <td>リソースを削除する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>認証方式（v1.1で追加）</h3>
                        <p>
                            REST APIを利用する際は、「誰がアクセスしているのか」を確認するための認証（Authentication）が必要です。
                        </p>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">認証方式</th>
                                        <th scope="col">概要</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Basic認証</td>
                                        <td>ユーザー名とパスワードをBase64エンコードし、リクエストヘッダーに付与する簡易的な方式</td>
                                    </tr>
                                    <tr>
                                        <td>APIキー</td>
                                        <td>あらかじめ発行された固有の文字列（キー）をリクエストに含めて認証する方式</td>
                                    </tr>
                                    <tr>
                                        <td>Bearerトークン</td>
                                        <td>認証後に発行されたトークンを、Authorizationヘッダーに付与してアクセスする方式</td>
                                    </tr>
                                    <tr>
                                        <td>OAuth 2.0</td>
                                        <td>認可サーバーがアクセストークンを発行し、有効期限やアクセス範囲（スコープ）を細かく制御できる方式</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>データエンコーディング</h3>
                        <p>
                            REST APIでやり取りするデータの形式（エンコーディング）としては、<strong>JSON</strong>が現在最も一般的に使われています（XMLが使われる場合もあります）。JSONの詳細は「6.7」で解説します。
                        </p>

                        <h3>リクエスト〜レスポンスの流れ</h3>
                        <figure className="diagram-figure">
                            <Diagram id="fig6" label="Fig. 6 — REST APIのリクエスト〜レスポンスの流れ" />
                            <figcaption>Fig. 6 — REST APIのリクエスト〜レスポンスの流れ</figcaption>
                        </figure>
                    </section>

                    <section id="sec66">
                        <h2>
                            <span className="num">6.6</span> 構成管理メカニズム（Ansible、Terraformなど）
                        </h2>
                        <p>
                            構成管理ツールは、多数の機器に対して「あるべき設定」を一括で適用・維持するためのツールです。v1.1ブループリントでは、旧v1.0にあった「Puppet、Chef」という記載が、<strong>「Ansible、Terraformなど」</strong>に置き換えられました。
                        </p>

                        <h3>主要な構成管理ツールの考え方</h3>
                        <ul>
                            <li>
                                <strong>Ansible</strong>：SSHなどの標準的な通信手段を使い、エージェント（常駐プログラム）を機器側にインストールすることなく設定を投入できる「エージェントレス」ツール。設定は「Playbook」と呼ばれるYAML形式のファイルに手順として記述する
                            </li>
                            <li>
                                <strong>Terraform</strong>：クラウドやネットワークの「インフラをコードとして定義する（Infrastructure as Code）」ためのツール。「最終的にどのような状態であるべきか」を宣言的に記述し、Terraformがその状態に近づけるよう自動で調整する
                            </li>
                        </ul>

                        <figure className="diagram-figure">
                            <Diagram id="fig7" label="Fig. 7 — Ansibleによるエージェントレスなプッシュ型構成管理" />
                            <figcaption>Fig. 7 — Ansibleによるエージェントレスなプッシュ型構成管理</figcaption>
                        </figure>

                        <h3>ツール比較表</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">Ansible</th>
                                        <th scope="col">Terraform</th>
                                        <th scope="col">Puppet / Chef（参考：旧v1.0範囲）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>記述スタイル</td>
                                        <td>手続き型（手順を順番に記述）</td>
                                        <td>宣言型（あるべき状態を記述）</td>
                                        <td>宣言型</td>
                                    </tr>
                                    <tr>
                                        <td>エージェントの要否</td>
                                        <td>不要（SSH/API経由）</td>
                                        <td>不要</td>
                                        <td>必要（マスタ-エージェント型が一般的）</td>
                                    </tr>
                                    <tr>
                                        <td>主な用途</td>
                                        <td>機器への設定投入・繰り返し作業の自動化</td>
                                        <td>インフラ全体のプロビジョニング（IaC）</td>
                                        <td>継続的な構成準拠の維持</td>
                                    </tr>
                                    <tr>
                                        <td>記述言語</td>
                                        <td>YAML</td>
                                        <td>HCL（HashiCorp Configuration Language）</td>
                                        <td>Puppet DSL / Ruby</td>
                                    </tr>
                                    <tr>
                                        <td>CCNA v1.1での位置づけ</td>
                                        <td>明示的に追加・強調</td>
                                        <td>新規追加</td>
                                        <td>v1.1のブループリントからは削除</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>📌 初学者向け補足</strong> — CCNAレベルでは、これらのツールで実際にコードを書けるようになる必要はありません。「Ansibleはエージェントレスで手順を記述する」「Terraformは望ましい状態を宣言してインフラを構築する」という<strong>特徴の違いを説明・識別できること</strong>が求められます。
                        </div>
                    </section>

                    <section id="sec67">
                        <h2>
                            <span className="num">6.7</span> JSONエンコードデータの構成要素
                        </h2>

                        <h3>JSONとは</h3>
                        <p>
                            JSON（JavaScript Object Notation）は、REST APIなどで最も広く使われているデータ形式です。人間にも読みやすく、かつプログラムでも扱いやすいテキスト形式で、「キーと値のペア」を基本単位としてデータを表現します。
                        </p>

                        <h3>JSONの基本データ型</h3>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">データ型</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>文字列 (string)</td>
                                        <td>ダブルクォート <code>&quot; &quot;</code> で囲んだ文字の並び</td>
                                        <td><code>&quot;hostname&quot;: &quot;R1&quot;</code></td>
                                    </tr>
                                    <tr>
                                        <td>数値 (number)</td>
                                        <td>整数または小数</td>
                                        <td><code>&quot;vlan_id&quot;: 10</code></td>
                                    </tr>
                                    <tr>
                                        <td>真偽値 (boolean)</td>
                                        <td><code>true</code> または <code>false</code> の2値</td>
                                        <td><code>&quot;enabled&quot;: true</code></td>
                                    </tr>
                                    <tr>
                                        <td>配列 (array)</td>
                                        <td>角括弧 <code>[ ]</code> で囲んだ、値を順序付けて並べたリスト</td>
                                        <td><code>&quot;interfaces&quot;: [&quot;Gi0/1&quot;, &quot;Gi0/2&quot;]</code></td>
                                    </tr>
                                    <tr>
                                        <td>オブジェクト (object)</td>
                                        <td>波括弧 <code>&#123; &#125;</code> で囲んだ、キーと値のペアの集合</td>
                                        <td><code>&#123; &quot;vlan&quot;: &#123; &quot;id&quot;: 10 &#125; &#125;</code></td>
                                    </tr>
                                    <tr>
                                        <td>null</td>
                                        <td>値が存在しない・未定義であることを示す</td>
                                        <td><code>&quot;description&quot;: null</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>JSONデータの例</h3>
                        <p>以下は、あるルータのインターフェース情報をJSON形式で表現した例です。</p>
                        <div className="code-block" role="region" aria-label="JSONデータの例">
                            <div className="code-line">&#123;</div>
                            <div className="code-line">  &quot;hostname&quot;: &quot;R1&quot;,</div>
                            <div className="code-line">  &quot;vlan_id&quot;: 10,</div>
                            <div className="code-line">  &quot;interfaces&quot;: [</div>
                            <div className="code-line">    &#123;</div>
                            <div className="code-line">      &quot;name&quot;: &quot;GigabitEthernet0/1&quot;,</div>
                            <div className="code-line">      &quot;ip_address&quot;: &quot;192.168.1.1&quot;,</div>
                            <div className="code-line">      &quot;subnet_mask&quot;: &quot;255.255.255.0&quot;,</div>
                            <div className="code-line">      &quot;enabled&quot;: true</div>
                            <div className="code-line">    &#125;,</div>
                            <div className="code-line">    &#123;</div>
                            <div className="code-line">      &quot;name&quot;: &quot;GigabitEthernet0/2&quot;,</div>
                            <div className="code-line">      &quot;ip_address&quot;: &quot;192.168.2.1&quot;,</div>
                            <div className="code-line">      &quot;subnet_mask&quot;: &quot;255.255.255.0&quot;,</div>
                            <div className="code-line">      &quot;enabled&quot;: false</div>
                            <div className="code-line">    &#125;</div>
                            <div className="code-line">  ],</div>
                            <div className="code-line">  &quot;description&quot;: null</div>
                            <div className="code-line">&#125;</div>
                        </div>

                        <p>
                            この例からわかるように、JSONは「オブジェクトの中に配列があり、配列の中にさらにオブジェクトがある」というように、要素を入れ子（ネスト）にして複雑なデータ構造も柔軟に表現できます。REST APIのリクエスト・レスポンスの中身は、多くの場合このJSON形式でやり取りされます。
                        </p>
                    </section>

                    <section id="summary">
                        <h2>
                            <span className="num">&#9733;</span> まとめと学習のポイント
                        </h2>
                        <div className="table-wrap">
                            <table className="dtable">
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">学習のポイント</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>6.1 自動化の影響</td>
                                        <td>「一貫性・拡張性・迅速性」など、自動化のメリットをキーワードで説明できるようにする</td>
                                    </tr>
                                    <tr>
                                        <td>6.2 従来型 vs コントローラベース</td>
                                        <td>「制御が分散か集中か」という軸で両者を対比できるようにする</td>
                                    </tr>
                                    <tr>
                                        <td>6.3 SDNアーキテクチャ</td>
                                        <td>制御プレーン/データプレーンの分離、ノースバウンド/サウスバウンドAPIの方向を混同しない</td>
                                    </tr>
                                    <tr>
                                        <td>6.4 AIと機械学習</td>
                                        <td>「生成的AI＝作る」「予測的AI＝予測する」という役割の違いを説明できるようにする</td>
                                    </tr>
                                    <tr>
                                        <td>6.5 REST API</td>
                                        <td>HTTPメソッドとCRUD操作の対応表を暗記する（POST=Create、GET=Read等）</td>
                                    </tr>
                                    <tr>
                                        <td>6.6 構成管理</td>
                                        <td>Ansible＝エージェントレス・手続き型、Terraform＝宣言型・IaCという特徴を区別する</td>
                                    </tr>
                                    <tr>
                                        <td>6.7 JSON</td>
                                        <td>オブジェクト・配列・文字列・数値・真偽値・nullの6種類の要素を識別できるようにする</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <strong>📌 試験対策のコツ</strong> — このドメインはCLIでの設定作業を問われることがほぼなく、「説明する（Explain）」「認識する（Recognize）」「比較する（Compare）」というレベルの動詞が中心です。したがって、<strong>概念や用語の違いを正確に言葉で説明できること</strong>が得点への近道です。JSONの構文やREST APIのHTTPメソッドは、実際に手を動かして簡単なAPIコールを試してみると記憶に定着しやすくなります。
                        </div>
                    </section>

                    <section id="sources">
                        <h2>
                            <span className="num">&#128279;</span> 出典・参考資料
                        </h2>
                        <p>本ガイドの内容は、以下のCisco公式情報源に基づいて作成しています。</p>
                        <footer className="sources">
                            <ul>
                                <li>
                                    Cisco CCNA認定 公式ページ（試験範囲の概要）{' '}
                                    <a
                                        href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html
                                    </a>
                                </li>
                                <li>
                                    Cisco 200-301 CCNA Exam Topics（v1.0 出題範囲PDF、6.1〜6.7の基本構成の出典）{' '}
                                    <a
                                        href="https://learningcontent.cisco.com/documents/200_301_CCNA_v1.0_2.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://learningcontent.cisco.com/documents/200_301_CCNA_v1.0_2.pdf
                                    </a>
                                </li>
                                <li>
                                    Cisco Learning Network — CCNA Exam Topics（最新の出題範囲一覧）{' '}
                                    <a
                                        href="https://learningnetwork.cisco.com/s/ccna-exam-topics"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://learningnetwork.cisco.com/s/ccna-exam-topics
                                    </a>
                                </li>
                                <li>
                                    Cisco Blogs — 「Inside the CCNA v1.1 exam update: AI, machine learning, and more」（v1.1での6.4・6.5・6.6の変更点の解説）{' '}
                                    <a
                                        href="https://blogs.cisco.com/learning/understanding-the-updated-ccna-v1-1-with-ai-machine-learning-and-more"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://blogs.cisco.com/learning/understanding-the-updated-ccna-v1-1-with-ai-machine-learning-and-more
                                    </a>
                                </li>
                                <li>
                                    Cisco Networking Academy — CCNA: ENSA Supplemental Module（v1.1追加分の学習教材、6.4〜6.6を対象範囲として明記）{' '}
                                    <a
                                        href="https://www.netacad.com/modules/ensa-supplemental"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.netacad.com/modules/ensa-supplemental
                                    </a>
                                </li>
                            </ul>
                            <p className="disclaimer">
                                ※ Ciscoは「これらの出題範囲はガイドラインであり、実際の試験では関連する他のトピックも出題される可能性がある」としています。最新の情報は必ず上記のCisco公式ソースでご確認ください。
                            </p>
                        </footer>
                    </section>
                </main>
            </div>
        </div>
    );
}
