'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAM_LABELS, DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id }: { id: DiagramId }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={DIAGRAM_LABELS[id]} preserveNaturalScale />
        </div>
    );
});

export function SystemsPerformanceGuide() {
    return (
        <div className="systems-performance-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                <div className="hero">
                    <div className="kicker">
                        Brendan Gregg · 詳解 システム・パフォーマンス 第2版
                    </div>
                    <h1>Systems Performance: Enterprise and the Cloud 実践ガイド</h1>
                    <div className="meta-row">
                        <span className="pill">原著 <strong>940頁</strong></span>
                        <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 18点</strong></span>
                        <span className="pill">参考文献 <strong>22件</strong></span>
                    </div>
                </div>

                <p>
                    本ガイドは、Brendan Gregg 著『Systems Performance: Enterprise and the Cloud, 2nd
                    Edition』（邦訳：『詳解 システム・パフォーマンス
                    第2版』オライリー・ジャパン刊）を軸に、システムパフォーマンス分析の考え方・メソドロジ・ツールを初学者向けに整理したものです。原著者本人のブログ・スライドや、Netflix・AWS・Grafana
                    Labsなど国際的に著名な開発者・組織の一次情報を裏付けとして参照しています（参考文献参照）。
                </p>
                <hr />
                <h2 id="この本はどんな本か" tabIndex={-1}>この本はどんな本か</h2>
                <p>
                    「詳解 システム・パフォーマンス
                    第2版」は、<strong>エンタープライズとクラウド環境を対象としたOS・アプリケーションのパフォーマンス分析と改善</strong>を扱う940ページの大著です。原著者のBrendan
                    Greggは、Sun
                    Microsystems・Oracle・Joyent・Netflix・Intel・OpenAI（2026年2月時点）で性能エンジニアリングに携わってきた、この分野で最も著名なエンジニアの一人です。USEメソッドの考案者であり、フレームグラフ（Flame
                    Graph）の発明者でもあり、2013年にはUSENIXからLISA Outstanding Achievement
                    Awardを受賞しています。
                </p>
                <p>
                    第2版では初版（2014年）から大きく加筆され、特に{' '}<strong>perf・Ftrace・拡張BPF（eBPF）の解説</strong> と{' '}<strong>クラウドコンピューティングの章</strong>{' '}が充実しました。本書（日本語版）の目次は次の16章＋付録という構成です（英語版は付録A〜E＋用語集）。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">パート</th>
                                <th scope="col">章</th>
                                <th scope="col">主な内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>基礎</td>
                                <td>1章 イントロダクション</td>
                                <td>パフォーマンスエンジニアリングとは何か、可観測性の基本用語</td>
                            </tr>
                            <tr className="even">
                                <td>基礎</td>
                                <td>2章 メソドロジ</td>
                                <td>USE法・RED法・ワークロード特性把握など分析手法全般</td>
                            </tr>
                            <tr className="odd">
                                <td>基礎</td>
                                <td>3章 オペレーティングシステム</td>
                                <td>カーネル、システムコール、割り込みの基礎知識</td>
                            </tr>
                            <tr className="even">
                                <td>基礎</td>
                                <td>4章 可観測性ツール</td>
                                <td>ツールの4分類とデータソース（/proc、tracepoint等）</td>
                            </tr>
                            <tr className="odd">
                                <td>基礎</td>
                                <td>5章 アプリケーション</td>
                                <td>プログラミング言語別の性能特性、CPU/off-CPU分析</td>
                            </tr>
                            <tr className="even">
                                <td>リソース別</td>
                                <td>6章 CPU</td>
                                <td>USEメソッド適用、プロファイリング、フレームグラフ</td>
                            </tr>
                            <tr className="odd">
                                <td>リソース別</td>
                                <td>7章 メモリ</td>
                                <td>仮想メモリ、ページング、リーク検出</td>
                            </tr>
                            <tr className="even">
                                <td>リソース別</td>
                                <td>8章 ファイルシステム</td>
                                <td>キャッシング、レイテンシ分析</td>
                            </tr>
                            <tr className="odd">
                                <td>リソース別</td>
                                <td>9章 ディスク</td>
                                <td>IOPS、レイテンシ、ヒートマップ</td>
                            </tr>
                            <tr className="even">
                                <td>リソース別</td>
                                <td>10章 ネットワーク</td>
                                <td>TCP分析、パケットスニッフィング</td>
                            </tr>
                            <tr className="odd">
                                <td>クラウド</td>
                                <td>11章 クラウドコンピューティング</td>
                                <td>ハードウェア仮想化・OS仮想化・軽量仮想化の比較</td>
                            </tr>
                            <tr className="even">
                                <td>実践</td>
                                <td>12章 ベンチマーキング</td>
                                <td>正しい・誤ったベンチマーキングの手法</td>
                            </tr>
                            <tr className="odd">
                                <td>ツール詳解</td>
                                <td>13章 perf／14章 Ftrace／15章 BPF</td>
                                <td>各ツールチェーンの実践的な使い方</td>
                            </tr>
                            <tr className="even">
                                <td>総合</td>
                                <td>16章 ケーススタディ</td>
                                <td>実際の障害調査の思考プロセス</td>
                            </tr>
                            <tr className="odd">
                                <td>付録</td>
                                <td>A〜F</td>
                                <td>USEメソッド早見表、sar早見表、bpftrace 1行プログラム集など</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    本ガイドでは、この構成をベースにしながら、初学者が最初に押さえるべき「考え方（メソドロジ）」→「土台となる知識（OS）」→「観測手段（ツール）」→「リソース別の実践」→「クラウド特有の論点」→「ベンチマーキングと総合演習」という順に再構成して解説します。
                </p>
                <hr />
                <h2 id="1-なぜシステムパフォーマンスを学ぶのか" tabIndex={-1}>
                    1. なぜシステムパフォーマンスを学ぶのか
                </h2>
                <p>
                    システムパフォーマンスエンジニアリングは、コンピュータシステム全体（ハードウェア・OS・アプリケーション）を対象に、パフォーマンスを研究する分野です。ここで言う「パフォーマンス」は単一の指標ではなく、レイテンシ・スループット・使用率・キャパシティなど複数の視点から評価されます。
                </p>
                <p>
                    クラウド時代においてこの分野が特に重要になった理由は、コスト構造の変化にあります。オンプレミス時代は「性能が悪くても、我慢すればハードウェアは既に買ってある」という状況が多かったのに対し、クラウドでは使用したリソース（インスタンス時間・CPU・メモリ・ネットワーク帯域）に応じて課金されるため、<strong>非効率なコードやチューニング不足のシステムがそのままコスト増に直結</strong>します。同時に、マルチテナント環境ではリソースの奪い合い（ノイジーネイバー問題）という、オンプレミスにはなかった新しい課題も生まれます。
                </p>
                <Diagram id="diag-1" />
                <p>
                    パフォーマンスエンジニアリングが難しいとされる理由は、原著1章でも述べられている通り、(1)
                    評価が主観的になりがちであること、(2)
                    システムが複雑で複数レイヤーにまたがること、(3)
                    複数の原因が相互作用すること、(4)
                    複数の性能問題が同時に発生しうることにあります。だからこそ、勘や経験則だけに頼らない<strong>体系的なメソドロジ</strong>が必要になります。
                </p>
                <hr />
                <h2 id="2-基礎概念レイテンシ可観測性実験" tabIndex={-1}>
                    2. 基礎概念：レイテンシ・可観測性・実験
                </h2>
                <p>具体的な手法に入る前に、共通言語となる基礎概念を押さえます。</p>
                <h3 id="21-レイテンシlatency" tabIndex={-1}>2.1 レイテンシ（Latency）</h3>
                <p>
                    レイテンシとは「処理にかかった時間」を指す言葉ですが、システムパフォーマンスの文脈では<strong>測定対象を明確にすること</strong>が重要です。同じ「Webページの表示が遅い」という現象でも、それがネットワークのレイテンシなのか、アプリケーション処理のレイテンシなのか、ディスクI/Oのレイテンシなのかによって、対処法はまったく異なります。レイテンシは原因に最も近い場所（低レイヤー）で測定するほど、真因の特定に役立ちます。
                </p>
                <h3 id="22-可観測性observability" tabIndex={-1}>2.2 可観測性（Observability）</h3>
                <p>
                    可観測性とは、外部からシステムの内部状態を推測できる度合いのことです。原著4章では、可観測性ツールを大きく4種類に分類しています。
                </p>
                <Diagram id="diag-2" />
                <ul>
                    <li>
                        <strong>固定カウンタ</strong
                        >：<code>uptime</code>や<code>vmstat</code>のように、カーネルが常時集計しているカウンタを読み出すだけなのでオーバーヘッドがほぼゼロ。まず最初に確認すべき情報源です。
                    </li>
                    <li>
                        <strong>プロファイリング</strong>：<code>perf record</code
                        >のように一定間隔（例：99Hz）でスタックトレースをサンプリングし、統計的にどこが「ホット」かを可視化します。フレームグラフの元データになります。
                    </li>
                    <li>
                        <strong>トレーシング</strong
                        >：<code>bpftrace</code>や<code>strace</code>のように、個々のイベント（システムコール呼び出し、ディスクI/O発行など）を1件ずつ記録する手法です。詳細な反面、イベント数が多いとオーバーヘッドが大きくなります。
                    </li>
                    <li>
                        <strong>モニタリング</strong
                        >：<code>sar</code>やPrometheus/Grafanaのように、指標を時系列で継続的に記録し、後から傾向分析やアラートに使う手法です。
                    </li>
                </ul>
                <h3 id="23-実験experimentation" tabIndex={-1}>2.3 実験（Experimentation）</h3>
                <p>
                    観測だけでなく、負荷生成ツール（<code>fio</code>、<code>iperf</code>、<code>sysbench</code>など）を使ってシステムに意図的に負荷をかけ、挙動を確かめる「アクティブベンチマーキング」も重要な手法です。ただし、本番環境での実験はリスクを伴うため、原著12章では実験・ベンチマーキング特有の注意点が1章分割かれています（後述）。
                </p>
                <hr />
                <h2 id="3-コアメソドロジuse法red法診断サイクル" tabIndex={-1}>
                    3. コアメソドロジ：USE法・RED法・診断サイクル
                </h2>
                <p>
                    Systems
                    Performanceという書籍の核心は、個別ツールの使い方以上に「<strong>どういう順序・考え方で問題を切り分けるか</strong>」というメソドロジにあります。
                </p>
                <h3 id="31-アンチメソッドやってはいけない調査の仕方" tabIndex={-1}>
                    3.1 アンチメソッド：やってはいけない調査の仕方
                </h3>
                <p>原著2章では、まず「良くない調査方法」を3つ挙げています。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">アンチメソッド</th>
                                <th scope="col">内容</th>
                                <th scope="col">問題点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>街灯のアンチメソッド</td>
                                <td>慣れたツールだけを見て回る</td>
                                <td>本当の原因が見えている場所と限らない</td>
                            </tr>
                            <tr className="even">
                                <td>ランダム変更アンチメソッド</td>
                                <td>とりあえず設定を変えて様子を見る</td>
                                <td>原因不明のまま「治った気がする」で終わる</td>
                            </tr>
                            <tr className="odd">
                                <td>誰か他人のせいにするアンチメソッド</td>
                                <td>「ネットワークが悪い」等、担当外のせいにする</td>
                                <td>検証なしに責任転嫁し、真因調査が止まる</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="32-useメソッドutilization-saturation-errors" tabIndex={-1}>
                    3.2 USEメソッド（Utilization, Saturation, Errors）
                </h3>
                <p>
                    USEメソッドはBrendan
                    Greggが考案した、システムパフォーマンス分析における最も有名なメソドロジです。Gregg自身は「未知のシステムに素早く切り込むために開発した」と述べており、飛行機のフライトマニュアルの緊急チェックリストになぞらえて、シンプルで網羅的、かつ高速であることを重視して設計されています。
                </p>
                <p>考え方は非常にシンプルです。</p>
                <p>
                    <strong
                        >「すべてのリソースについて、使用率（Utilization）・飽和度（Saturation）・エラー（Errors）を確認せよ」</strong
                    >
                </p>
                <ul>
                    <li>
                        <strong>使用率（Utilization）</strong
                        >：そのリソースが仕事をしていた時間の割合（例：CPU使用率90%）。あるいはメモリのように容量ベースのリソースでは、使用済み容量の割合。
                    </li>
                    <li>
                        <strong>飽和度（Saturation）</strong
                        >：リソースが処理しきれず、キューに溜まっている「余分な仕事」の度合い（例：CPUのランキューの長さ）。使用率が100%に近づく前から飽和度は悪化し始めることが多く、早期警告として有用です。
                    </li>
                    <li>
                        <strong>エラー（Errors）</strong
                        >：エラーイベントの発生数。エラーは性能を劣化させる一方、リトライなどで見えにくく見落とされがちなため、他の2つより先にチェックすると効率的です。
                    </li>
                </ul>
                <Diagram id="diag-3" />
                <p>
                    USEメソッドをLinuxの主要リソースに具体的に当てはめると、以下のようになります（原著付録Aの考え方を要約）。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">リソース</th>
                                <th scope="col">使用率の指標例</th>
                                <th scope="col">飽和度の指標例</th>
                                <th scope="col">エラーの指標例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>CPU</td>
                                <td>
                                    <code>mpstat</code
                                    >の<code>%usr</code>（ユーザー空間実行時間）+<code>%sys</code>（カーネル空間実行時間）。他に<code>%iowait</code>（I/O待機）、<code>%steal</code>（ハイパーバイザが他のVMにCPUを割り当てている間、ゲストのvCPUが待たされた時間）、<code>%idle</code>なども重要な状態。特にクラウド環境では<code>%steal</code>の高騰に注意
                                </td>
                                <td><code>vmstat</code>の<code>r</code>列（実行待ちスレッド数）</td>
                                <td><code>dmesg</code>のCPU関連エラー</td>
                            </tr>
                            <tr className="even">
                                <td>メモリ（容量）</td>
                                <td><code>free -h</code>の<code>available</code>を基準にした実質使用量（<code>total - available</code>）</td>
                                <td>
                                    スワッピング（<code>vmstat</code>の<code>si</code>/<code>so</code>）の発生
                                </td>
                                <td>
                                    <code>dmesg</code>のメモリエラー、OOM
                                    Killerによるプロセス強制終了
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ディスクI/O</td>
                                <td><code>iostat</code>の<code>%util</code></td>
                                <td><code>iostat</code>の<code>avgqu-sz</code>（キュー長）</td>
                                <td><code>smartctl</code>のディスクエラー</td>
                            </tr>
                            <tr className="even">
                                <td>ネットワーク</td>
                                <td><code>nicstat</code>の帯域使用率</td>
                                <td>送受信バッファのドロップ数</td>
                                <td><code>netstat -s</code>のretransmit数</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    USEメソッドの詳細は、Gregg本人による論文的な整理がCommunications of the
                    ACM誌にも掲載されており、業界標準のメソドロジとして広く引用されています。
                </p>
                <h3 id="33-red法サービス視点の相棒" tabIndex={-1}>3.3 RED法：サービス視点の相棒</h3>
                <p>
                    USEメソッドはインフラリソース中心の手法である一方、<strong>マイクロサービス環境ではリクエスト単位の指標も同時に見る必要</strong>があります。ここで登場するのが、Grafana
                    Labs（旧Weaveworks/Kausal）のTom
                    Wilkieが2015年に提唱した<strong>RED法</strong>です。RED法はGoogleのSRE本で知られる「4大ゴールデンシグナル」を、リクエスト駆動型サービス向けに簡略化したものとされています。
                </p>
                <p>
                    <strong
                        >「すべてのサービスについて、Rate（リクエスト数）・Errors（失敗数）・Duration（処理時間）を確認せよ」</strong
                    >
                </p>
                <p>
                    Wilkie自身、USEメソッドはハードウェアやディスクのようなインフラ向けに強い一方、サービス視点の健全性把握には向かないとして、両者を<strong>併用</strong>することを推奨しています。実務では「RED法でユーザー影響のあるサービスの異常を検知し、USEメソッドでその背後にあるボトルネックリソースを特定する」という組み合わせ方が定石です。
                </p>
                <Diagram id="diag-4" />
                <h3 id="34-科学的メソッドと診断サイクル" tabIndex={-1}>3.4 科学的メソッドと診断サイクル</h3>
                <p>
                    アンチメソッドを避け、USE/RED法で当たりをつけた後は、<strong>仮説検証型の診断サイクル</strong>で深掘りしていきます。原著が推奨する「診断サイクル（Diagnosis
                    Cycle）」は、以下のようなループとして整理できます。
                </p>
                <Diagram id="diag-5" />
                <p>
                    「問題の記述」では、いつから・何が・どの程度悪化したか、直前に何を変更したかを明確にする「問題記述メソッド」を使います。これにより、街灯のアンチメソッドのように無目的にツールを眺め回すことを防げます。
                </p>
                <hr />
                <h2 id="4-osの基礎知識カーネルとユーザーランド" tabIndex={-1}>
                    4. OSの基礎知識：カーネルとユーザーランド
                </h2>
                <p>
                    ツールの出力を正しく解釈するには、最低限のOS内部構造の理解が欠かせません。原著3章の要点を、システムコールの流れを軸に整理します。
                </p>
                <Diagram id="diag-6" />
                <ul>
                    <li>
                        <strong>カーネルモードとユーザーモード</strong
                        >：アプリケーションは通常ユーザーモードで動作し、ハードウェアに直接アクセスできません。ファイル読み書きやネットワーク通信など特権操作が必要な際は、システムコールを介してカーネルモードに遷移します。このモード切り替え自体にコストがかかるため、頻繁なシステムコール発行（例：小さいバッファでの<code>read()</code>連発）は性能劣化の一因になります。
                    </li>
                    <li>
                        <strong>割り込み（Interrupt）</strong
                        >：ハードウェアがCPUに「処理が完了した／注意が必要」と通知する仕組みです。割り込みハンドラの処理が長いとCPUの他の作業を妨げるため、Linuxでは緊急度の低い処理を「ソフト割り込み（softirq）」として後回しにする仕組みがあります。
                    </li>
                    <li>
                        <strong>スケジューラ</strong
                        >：複数のプロセス・スレッドの中から、次にCPUで実行するものを選ぶ役割です。実行待ちのスレッドがランキューに溜まっている状態が、前述したCPUの「飽和」に相当します。
                    </li>
                    <li>
                        <strong>仮想メモリ</strong
                        >：プロセスに専用の連続したアドレス空間を提供する仕組み。物理メモリとの対応はページテーブルで管理され、必要なページのみを物理メモリに載せる「デマンドページング」により、実メモリ容量以上のプロセスを動かせます（後述7章）。
                    </li>
                </ul>
                <hr />
                <h2 id="5-可観測性ツールのデータソース" tabIndex={-1}>5. 可観測性ツールのデータソース</h2>
                <p>
                    <code>perf</code
                    >や<code>bpftrace</code>が「魔法のように」あらゆる情報を取得できるように見えるのは、カーネルが多様な計測点（データソース）を公開しているためです。原著4章で紹介される主要なデータソースを整理すると、以下のようになります。
                </p>
                <Diagram id="diag-7" />
                <p>
                    初学者がまず押さえるべきは、<strong>「安定した抽象化レイヤーほど壊れにくいが、粒度は粗い」</strong>という原則です。<code>/proc</code>やトレースポイントは比較的安定したインターフェースで、カーネルバージョンが変わっても使い続けやすい一方、kprobe（カーネル関数への動的プローブ）はカーネル内部実装に依存するため、カーネルアップデートで動かなくなるリスクがあります。運用ツールを自作する際は、この安定性のトレードオフを意識する必要があります。
                </p>
                <p>
                    <strong>注記</strong>：トレースポイントは kprobe
                    と比べれば安定していますが、<strong>保証されたABIではありません</strong>。イベント名・引数フィールドの構成・そもそもの提供有無は、カーネルのアップデートに伴って変更・削除されることがあります。利用可能なイベントとフィールドは、実行環境ごとに{' '}<code>bpftrace -l &apos;tracepoint:*&apos;</code> や{' '}<code
                        >/sys/kernel/debug/tracing/events/&lt;subsystem&gt;/&lt;event&gt;/format</code
                    >{' '}で確認する運用にしてください。
                </p>
                <hr />
                <h2 id="6-cpuパフォーマンス分析" tabIndex={-1}>6. CPUパフォーマンス分析</h2>
                <p>
                    CPUは最もよく分析されるリソースです。原著6章の流れに沿って、USEメソッドをCPUに適用する具体的な手順を示します。
                </p>
                <h3 id="61-基本用語" tabIndex={-1}>6.1 基本用語</h3>
                <ul>
                    <li>
                        <strong>使用率</strong
                        >：CPUが仕事をしていた時間の割合。<code>%user</code>（アプリケーションコード）と<code>%system</code>（カーネルコード）に分かれます。
                    </li>
                    <li>
                        <strong>飽和</strong
                        >：実行待ちでランキューに並んでいるスレッドの存在。<code>vmstat</code>の<code>r</code>列で確認できます。
                    </li>
                    <li>
                        <strong>IPC/CPI</strong
                        >：1クロックサイクルあたりに実行された命令数（Instructions Per
                        Cycle）とその逆数（Cycles Per
                        Instruction）。単純な使用率だけでなく、CPUがどれだけ効率的に働いているか（キャッシュミスで待たされていないか等）を示す重要な指標です。
                    </li>
                </ul>
                <h3 id="62-cpu分析の観測ツールチェーン" tabIndex={-1}>6.2 CPU分析の観測ツールチェーン</h3>
                <Diagram id="diag-8" />
                <p>代表的なコマンド例（Linux環境）：</p>
                <ul>
                    <li>Step1: 全体像の把握（負荷平均・r列・使用率）<br /><code>uptime</code></li>
                    <li><code>vmstat 1</code></li>
                    <li><code>mpstat -P ALL 1</code></li>
                    <li><code>pidstat 1</code></li>
                    <li>
                        Step2: CPUプロファイリング(99Hz、全CPU、コールスタック付き、30秒間)<br /><code
                            >perf record -F 99 -a -g -- sleep 30</code
                        >
                    </li>
                    <li><code>perf script &gt; out.perf-script</code></li>
                    <li>
                        Step3: bpftraceでオンCPUサンプルの出現回数をカーネルスタック別に集計<br /><code
                            >bpftrace -e &apos;profile:hz:99 &#123; @[kstack] = count(); &#125;&apos;</code
                        >
                    </li>
                </ul>
                <h3 id="63-フレームグラフcpu分析の代表的な可視化" tabIndex={-1}>
                    6.3 フレームグラフ：CPU分析の代表的な可視化
                </h3>
                <p>
                    <code>perf record</code
                    >で得られる大量のスタックトレースは、そのままではテキストの羅列で解読困難です。ここで用いられるのが<strong
                        >フレームグラフ（Flame Graph）</strong
                    >です。Brendan
                    Greggが2011年に考案したこの可視化手法は、Netflixをはじめ多くの企業・言語で採用され、CPUプロファイリングの事実上の標準となっています。仕組みはシンプルで、収集した多数のスタックトレースをマージし、横幅を出現頻度、縦方向をスタックの深さとして描画します。横に広い山ほど「そのコードパスがCPU時間を多く消費している」ことを意味し、視覚的にホットスポットを一目で把握できます。
                </p>
                <Diagram id="diag-9" />
                <h3 id="64-cpuチューニングの主な選択肢" tabIndex={-1}>6.4 CPUチューニングの主な選択肢</h3>
                <ul>
                    <li>コンパイラ最適化オプション（<code>-O2</code>等）の見直し</li>
                    <li>
                        プロセス優先度（<code>nice</code>/<code>renice</code>）やスケジューリングクラスの調整
                    </li>
                    <li>CPUピニング／排他的cpusetによる特定コアへのバインド</li>
                    <li>
                        コンテナ環境ではcgroupのCPUリソースコントロールの見直し。ただし<strong
                            >cgroup v1とv2でインタフェースが異なる</strong
                        >点に注意が必要です
                    </li>
                </ul>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">項目</th>
                                <th scope="col">cgroup v1</th>
                                <th scope="col">cgroup v2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>相対的な配分（重み）</td>
                                <td><code>cpu.shares</code>（既定1024）</td>
                                <td><code>cpu.weight</code>（既定100）</td>
                            </tr>
                            <tr className="even">
                                <td>絶対的な上限（帯域制限）</td>
                                <td>
                                    <code>cpu.cfs_quota_us</code> と
                                    <code>cpu.cfs_period_us</code> の2ファイル
                                </td>
                                <td>
                                    <code>cpu.max</code>（<code
                                        >&quot;&lt;quota&gt; &lt;period&gt;&quot;</code
                                    >
                                    を1ファイルで指定。無制限は <code>max</code>）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>スロットリング統計</td>
                                <td>
                                    <code>cpu.stat</code>（<code>nr_throttled</code>,
                                    <code>throttled_time</code>）
                                </td>
                                <td>
                                    <code>cpu.stat</code>（<code>nr_throttled</code>,
                                    <code>throttled_usec</code>）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>どちらのバージョンがマウントされているかは、以下のコマンドで判別できます。</p>
                <ul>
                    <li>
                        cgroup2fs なら v2、tmpfs なら v1（またはハイブリッド構成）<br /><code
                            >stat -fc %T /sys/fs/cgroup/</code
                        >
                    </li>
                </ul>
                <hr />
                <h2 id="7-メモリパフォーマンス分析" tabIndex={-1}>7. メモリパフォーマンス分析</h2>
                <h3 id="71-仮想メモリとページング" tabIndex={-1}>7.1 仮想メモリとページング</h3>
                <p>
                    各プロセスは自分専用の仮想アドレス空間を持ち、実際の物理メモリとはページテーブルを介して対応付けられます。ページが必要になった時点で初めて物理メモリを割り当てる「デマンドページング」により、プロセスは実メモリを超えるアドレス空間を扱えます。
                </p>
                <Diagram id="diag-10" />
                <h3 id="72-メモリのuseメソッド" tabIndex={-1}>7.2 メモリのUSEメソッド</h3>
                <p>メモリは「容量ベースのリソース」であるため、使用率の解釈がCPUとは異なります。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">確認方法</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>使用率</td>
                                <td><code>free -h</code>の<code>available</code>列</td>
                                <td>
                                    <code>available</code
                                    >はスワップせずに新しいアプリケーションが利用できるメモリ量の推定値。<code
                                        >total - available</code
                                    >を実質的な使用量として見る（<code>used</code>はプロセス専用メモリでも<code
                                        >total - buff/cache</code
                                    >でもない）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>飽和</td>
                                <td>
                                    <code>vmstat</code
                                    >の<code>si</code>/<code>so</code>列（スワップイン/アウト）、PSI
                                    (<code>/proc/pressure/memory</code>)
                                </td>
                                <td>スワップが発生している＝物理メモリが不足し始めているサイン</td>
                            </tr>
                            <tr className="odd">
                                <td>エラー</td>
                                <td>OOM Killerのログ（<code>dmesg</code>）</td>
                                <td>メモリ確保に失敗しプロセスが強制終了された記録</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    初学者が特に誤解しやすいのは、「<code>free</code>コマンドの<code>free</code>列が少ない＝メモリ不足」という早合点です。Linuxは積極的に空きメモリをファイルシステムキャッシュとして活用するため、<code>free</code>列が小さいこと自体は正常です。ただし<code>buff/cache</code>の全量が即座に空きになるわけではなく、ダーティページや再利用できないページも含まれます。そのためカーネルが回収可能性を加味して算出する<code>available</code>を判断基準とし、<code>available</code>が継続的に減少していないかを見るのが正しい解釈です。あわせて注視すべきはスワップ活動（<code>vmstat</code>の<code>si</code>/<code>so</code>）とOOM
                    Killerの発生有無です。
                </p>
                <h3 id="73-メモリリーク検出の考え方" tabIndex={-1}>7.3 メモリリーク検出の考え方</h3>
                <p>
                    原著7章では、メモリリーク検出のメソドロジとして、プロセスのワーキングセットサイズ（WSS：実際にアクセスされているメモリ量）の時系列推移を追い、単調増加していないかを確認する手法が紹介されています。<code>bpftrace</code>を使ってメモリリークを特定する場合は、<code>malloc</code>/<code>free</code>の呼び出しを単純に記録するだけでは不十分です。アロケーション状態を追跡する必要があります——各<code>malloc</code>の戻り値ポインタをキーに、確保サイズと確保時の呼び出しスタック（ustack）を値としてマップに保存し、対応する<code>free</code>呼び出し時にそのエントリを削除することで、未解放のアロケーションとそのコールスタックを特定できます。より手軽に活用する場合は、BCCの<code>memleak</code>ツールが同様のロジックを実装しており、リークしているアロケーションとそのコールスタックを表示できます。
                </p>
                <hr />
                <h2 id="8-ファイルシステムとディスクio" tabIndex={-1}>8. ファイルシステムとディスクI/O</h2>
                <h3 id="81-レイヤー構造の理解" tabIndex={-1}>8.1 レイヤー構造の理解</h3>
                <p>
                    アプリケーションから見えるファイルI/Oのレイテンシは、複数レイヤーを経由した合計時間です。ボトルネックがどのレイヤーにあるかを切り分けることが重要です。
                </p>
                <Diagram id="diag-11" />
                <p>
                    <strong>論理I/Oと物理I/Oの違い</strong
                    >も重要な概念です。アプリケーションが発行した読み書き（論理I/O）は、キャッシュヒットすればディスクまで到達せず（物理I/Oゼロ）、逆に先読み（readahead）機構によって1回の論理I/Oが複数の物理I/Oを発生させることもあります。<code>iostat</code>が示すのは物理ディスクそのものではなく、<strong>カーネルのブロックデバイス層で観測されたI/O統計</strong>である点に注意が必要です。対象はカーネルから見えるデバイスまたはパーティションであり、仮想化環境やクラウドでは仮想ブロックデバイス（EBSボリューム等）の統計になります。ゲストのカーネルからはバックエンドのストレージインフラの挙動は見えないため、クラウド環境ではプロバイダ側のボリューム／サービスメトリクス（例：CloudWatchのEBSメトリクス）を併せて確認します。これらは物理ディスクを直接計測した値ではなく、プロバイダがボリューム単位で公開する指標ですが、IOPS／スループットの上限への到達、レイテンシ、バーストクレジットの消費といったバックエンド側の振る舞いを評価する手掛かりになります。
                </p>
                <h3 id="82-ディスクioへのuseメソッド適用" tabIndex={-1}>8.2 ディスクI/OへのUSEメソッド適用</h3>
                <ul>
                    <li>
                        ディスクI/Oの使用率・飽和度をリアルタイム監視<br /><code>iostat -xz 1</code>
                    </li>
                </ul>
                <p>出力の読み方（代表的な列）：</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">列名</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>%util</code></td>
                                <td>使用率（デバイスがビジー状態だった時間の割合）</td>
                            </tr>
                            <tr className="even">
                                <td><code>avgqu-sz</code></td>
                                <td>飽和度の目安（I/Oキューの平均長）</td>
                            </tr>
                            <tr className="odd">
                                <td><code>await</code></td>
                                <td>I/O完了までの平均レイテンシ(ms)</td>
                            </tr>
                            <tr className="even">
                                <td><code>r/s</code>, <code>w/s</code></td>
                                <td>秒間の読み書きIOPS</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    原著9章では、IOPS（1秒あたりのI/O操作数）だけを見て判断することの危険性が強調されています。同じIOPS値でも、I/Oサイズ（4KBか1MBか）やランダムI/Oかシーケンシャルか、読み込みか書き込みかによって実際の負荷やレイテンシは大きく異なるため、<strong>「IOPSは平等ではない」</strong>という原則を意識する必要があります。
                </p>
                <h3 id="83-レイテンシの可視化ヒートマップ" tabIndex={-1}>8.3 レイテンシの可視化：ヒートマップ</h3>
                <p>
                    ディスクI/Oのレイテンシは平均値だけでは実態を見誤りがちです。多くのI/Oは高速に完了する一方、一部が極端に遅い「レイテンシの外れ値（Long
                    Tail
                    Latency）」を引き起こすことがあり、平均値ではこれが埋もれてしまいます。原著ではレイテンシヒートマップ（横軸を時間、縦軸をレイテンシ、色を頻度とする可視化）を使い、外れ値の分布パターンを視覚的に把握する手法が紹介されています。
                </p>
                <hr />
                <h2 id="9-ネットワークパフォーマンス分析" tabIndex={-1}>9. ネットワークパフォーマンス分析</h2>
                <h3 id="91-tcp接続のライフサイクルとレイテンシ" tabIndex={-1}>
                    9.1 TCP接続のライフサイクルとレイテンシ
                </h3>
                <Diagram id="diag-12" />
                <p>
                    ネットワークレイテンシの分析では、接続確立にかかる時間（RTT: Round Trip
                    Time）とデータ転送自体のスループットを分けて考えることが重要です。再送（retransmit）が多発している場合、ネットワーク経路上でパケットロスが起きている可能性が高く、<code
                        >netstat -s</code
                    >や<code>ss</code>コマンドで再送カウンタを確認します。
                </p>
                <h3 id="92-主要な観測コマンド" tabIndex={-1}>9.2 主要な観測コマンド</h3>
                <ul>
                    <li>
                        TCPソケットの詳細情報（RTT、輻輳ウィンドウ等）<br /><code>ss -tino</code>
                    </li>
                    <li>インターフェースごとの送受信スループット<br /><code>sar -n DEV 1</code></li>
                    <li>NIC使用率（帯域に対する割合）<br /><code>nicstat 1</code></li>
                    <li>
                        パケットキャプチャ（フィルタ＋件数上限で保存量を抑える）<br /><code
                            >tcpdump -i eth0 &apos;tcp port 443&apos; -c 10000 -w out.pcap</code
                        >
                    </li>
                    <li>
                        長時間採取時はローテーション（100MB × 5ファイルで上限）<br /><code
                            >tcpdump -i eth0 &apos;tcp port 443&apos; -C 100 -W 5 -w out.pcap</code
                        >
                    </li>
                    <li>
                        保存したキャプチャを読み出して解析<br /><code
                            >tcpdump -r out.pcap -n | head</code
                        >
                    </li>
                </ul>
                <p>
                    <code>bpftrace</code
                    >を用いれば、TCPコネクションの生成から切断までのライフタイム（<code>tcplife</code>相当のツール）や、再送イベントの発生箇所（<code>tcpretrans</code>相当）を低オーバーヘッドでトレースできます。
                </p>
                <hr />
                <h2 id="10-クラウドコンピューティング特有の考慮点" tabIndex={-1}>
                    10. クラウドコンピューティング特有の考慮点
                </h2>
                <p>
                    ここが本書のタイトルにも含まれる「Enterprise and the
                    Cloud」の核心部分です。原著11章では、クラウドの仮想化方式を3つに分類し、それぞれのオーバーヘッドと可観測性の違いを整理しています。
                </p>
                <h3 id="101-仮想化方式の3分類" tabIndex={-1}>10.1 仮想化方式の3分類</h3>
                <Diagram id="diag-13" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">分離レベル</th>
                                <th scope="col">起動時間の目安</th>
                                <th scope="col">オーバーヘッド</th>
                                <th scope="col">代表技術</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ハードウェア仮想化</td>
                                <td>ゲストごとに独立カーネル。分離レベルは最も高い</td>
                                <td>数十秒〜</td>
                                <td>ハイパーバイザー経由のI/O・ネットワークで発生しやすい</td>
                                <td>KVM, Xen</td>
                            </tr>
                            <tr className="even">
                                <td>OS仮想化（コンテナ）</td>
                                <td>ホストカーネルをcgroup/namespaceで分離</td>
                                <td>ミリ秒〜数秒</td>
                                <td>分離の甘さがトレードオフ（カーネルは共有）</td>
                                <td>Docker, containerd</td>
                            </tr>
                            <tr className="odd">
                                <td>軽量仮想化（microVM）</td>
                                <td>独自カーネルを持ちつつ最小構成で高速起動</td>
                                <td>100ms前後</td>
                                <td>VM相当の分離を保ちつつオーバーヘッドを抑制</td>
                                <td>AWS Firecracker</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>軽量仮想化の代表例：AWS Firecracker。</strong> AWSがAWS
                    Lambda向けに開発したオープンソースのVMM（Virtual Machine
                    Monitor）で、KVMをベースに不要なデバイスエミュレーションを排除しています。公開されている実測値として、1台のmicroVMあたりのメモリオーバーヘッドは5MiB未満、起動時間は125ミリ秒程度とされており、コンテナに近い俊敏性とVMに近い分離レベルを両立させる設計として、サーバーレス基盤の標準的な実装パターンになっています。なお、FirecrackerとAWS
                    Nitroは<strong>別の層の技術</strong>であり、同一の設計として扱わないよう注意が必要です。Nitroは、仮想化処理を専用ハードウェア（Nitroカード・Nitroセキュリティチップ）と軽量なNitro
                    Hypervisorへオフロードする<strong>EC2の基盤コンポーネント</strong>です。一方Firecrackerは、LambdaやFargateといったサーバーレス基盤において、そのNitroベースのインスタンス上でテナントごとのmicroVMを起動するために追加で用いられる<strong>VMM層</strong>です。
                </p>
                <h3 id="102-マルチテナンシーとノイジーネイバー問題" tabIndex={-1}>
                    10.2 マルチテナンシーと「ノイジーネイバー」問題
                </h3>
                <p>
                    クラウド、特にコンテナオーケストレーション基盤では、1台の物理ホスト上に多数のテナント（コンテナ／VM）が同居します。あるテナントが過剰にリソースを使用し、同居する他のテナントの性能を劣化させる現象は「ノイジーネイバー（noisy
                    neighbor）」問題と呼ばれ、クラウド特有の性能課題として扱われます。
                </p>
                <p>
                    Netflixの計算基盤チームは、自社のマルチテナントコンピュートプラットフォーム「Titus」において、このノイジーネイバー検知にeBPFを活用した事例を公開しています。従来の<code>perf</code>のようなツールは本番環境に常時仕掛けるにはオーバーヘッドが大きすぎる一方、eBPFでスケジューラのランキューレイテンシ（コンテナがCPUに割り当てられるまでの待ち時間）を継続的に計測することで、低オーバーヘッドかつ常時稼働可能な監視を実現したと報告されています。同チームはこの過程で開発したeBPFプログラムの性能を可視化するツール「bpftop」もオープンソースとして公開しました。
                </p>
                <Diagram id="diag-14" />
                <p>
                    さらに近年では、コンテナ数を極端にスケールさせた際に、Linuxカーネル内部のロック競合（例：VFSのグローバルマウントロック）がボトルネックになるという、より深いレイヤーの知見もNetflixから報告されています。これは「オーケストレーション層は正常でも、その下のカーネル・CPUアーキテクチャに真因がある」という、まさにUSEメソッドが重視する<strong>リソースを網羅的に調べる姿勢</strong>の重要性を裏付ける事例といえます。
                </p>
                <h3 id="103-クラウド環境での可観測性の制約" tabIndex={-1}>10.3 クラウド環境での可観測性の制約</h3>
                <p>
                    クラウドインスタンス、特にコンテナ環境では、以下のような制約に注意が必要です。
                </p>
                <ul>
                    <li>
                        ハイパーバイザーのタイプによっては、ゲストOSからハードウェアパフォーマンスカウンタ（PMC）に直接アクセスできない場合がある
                    </li>
                    <li>
                        コンテナはホストカーネルを共有するため、<code>perf</code>や<code>bpftrace</code>によるシステム全体のトレーシングには、ホスト側の権限（多くはroot相当の特権）が必要になることが多い
                    </li>
                    <li>
                        クラウドのインスタンスタイプ選定自体もキャパシティプランニングの一部であり、「小さすぎるインスタンスでの機会喪失」と「大きすぎるインスタンスでのコスト超過」のバランスを取る必要がある
                    </li>
                </ul>
                <hr />
                <h2 id="11-ベンチマーキングのベストプラクティスと落とし穴" tabIndex={-1}>
                    11. ベンチマーキングのベストプラクティスと落とし穴
                </h2>
                <p>
                    パフォーマンス改善の効果を検証するにはベンチマークが必要ですが、原著12章では「ベンチマーキングは驚くほど間違えやすい」と警告されています。よくある落とし穴と、押さえるべきポイントを整理します。
                </p>
                <Diagram id="diag-15" />
                <ul>
                    <li>
                        <strong>産業標準ベンチマークの罠</strong
                        >：業界標準ベンチマーク（例：TPCベンチマーク系）は比較のための共通指標として有用ですが、自社の実ワークロードとかけ離れた条件で測定されている場合、その数値がそのまま自社環境の性能を保証するわけではありません。
                    </li>
                    <li>
                        <strong>マイクロベンチマークの限界</strong
                        >：特定の1機能（例：単純なメモリコピー速度）だけを測定するマイクロベンチマークは有用ですが、コンパイラの最適化によって「測定対象のコードが丸ごと削除される」といった意図しない現象が起きることもあり、結果の解釈には注意が必要です。
                    </li>
                    <li>
                        <strong>ベンチマークについて問うべきこと</strong
                        >：原著では、他者が公表したベンチマーク結果を見る際に「誰が」「どんな目的で」「どんな条件で」計測したのかを問う姿勢の重要性が説かれています。ベンダーが公表する数値は、往々にして自社に有利な条件下で測定されている可能性があるためです。
                    </li>
                </ul>
                <hr />
                <h2 id="12-ツールチェーンの選び方perfftraceebpf" tabIndex={-1}>
                    12. ツールチェーンの選び方：perf・Ftrace・eBPF
                </h2>
                <p>
                    原著13〜15章は、それぞれ<code>perf</code>・<code>Ftrace</code>・BPF（eBPF）という3つの主要ツールチェーンに1章ずつを割いています。それぞれの立ち位置を整理します。
                </p>
                <Diagram id="diag-16" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ツール</th>
                                <th scope="col">得意分野</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>perf</td>
                                <td>CPUプロファイリング、ハードウェアカウンタ活用</td>
                                <td>
                                    Linuxカーネルに標準搭載。フレームグラフ生成の起点としても定番
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Ftrace</td>
                                <td>カーネル内部の関数呼び出し追跡、ヒストグラムトリガー</td>
                                <td>追加インストール不要でカーネルに組み込み済み</td>
                            </tr>
                            <tr className="odd">
                                <td>BPF (bpftrace/BCC)</td>
                                <td>カスタムイベントの低オーバーヘッド動的トレーシング</td>
                                <td>
                                    150以上の既製ツールが公開されており、独自スクリプトも1行〜数十行で記述可能
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    eBPFは「Linuxをプログラム可能なカーネルに変える」技術だとGregg自身が表現しており、eBPF
                    Foundation（Linux
                    Foundation傘下、Meta・Google・Microsoft・Netflix・Isovalent等が参画）を中心に、観測性だけでなくネットワーキング・セキュリティ領域でも標準的な基盤技術として採用が進んでいます。この生態系の中核をなす2つのフロントエンドが、単発の複雑なツールを書くのに向く<strong>BCC</strong>と、1行プログラムから手軽に始められる<strong>bpftrace</strong>です。
                </p>
                <h3 id="実践bpftraceの1行プログラム例" tabIndex={-1}>実践：bpftraceの1行プログラム例</h3>
                <p>
                    原著付録Cで多数紹介されている1行プログラムのうち、初学者が最初に試すのに適したものを抜粋します。
                </p>
                <ul>
                    <li>
                        execveによるプログラム実行をリアルタイムに表示（実行されるファイル名を表示）<br /><code
                            >bpftrace -e &apos;tracepoint:syscalls:sys_enter_execve &#123; printf(&quot;%s\n&quot;,
                            str(args.filename)); &#125;&apos;</code
                        >
                    </li>
                    <li>
                        システムコールの発行回数をプロセス名ごとに集計<br /><code
                            >bpftrace -e &apos;tracepoint:raw_syscalls:sys_enter &#123; @[comm] = count();
                            &#125;&apos;</code
                        >
                    </li>
                    <li>
                        ブロックI/Oのレイテンシをヒストグラム表示（BCC版。1秒ごとに出力）<br /><code
                            >biolatency-bpfcc 1</code
                        >
                    </li>
                    <li>
                        bpftrace同梱版（ディストリビューションによりパスは異なる）<br /><code
                            >bpftrace /usr/share/bpftrace/tools/biolatency.bt</code
                        >
                    </li>
                </ul>
                <p>
                    ブロックI/Oのレイテンシは、<code>tracepoint:block:block_rq_issue</code>（発行）と<code>tracepoint:block:block_rq_complete</code>（完了）を自前でひも付ける1行プログラムとして書きたくなりますが、発行と完了の対応付けは見た目より厄介です。この2つのトレースポイントだけではリクエストを一意に識別できるポインタが得られないため、<code>dev</code>と<code>sector</code>の組をキーにせざるを得ず、1つのリクエストが分割して完了する（partial
                    completion）場合や、同一セクタへのI/Oが同時に複数走る場合にペアリングが崩れ、ヒストグラムがリクエストレイテンシを正しく表さないことがあります。
                </p>
                <p>
                    一方、BCC版<code>biolatency</code>（<code>tools/biolatency.py</code>）は、計測区間を<code>-Q</code>オプションで切り替えます。<code>-Q</code>を付けるとOSのキュー待ち時間を含めて計測するため、開始イベントに<code>block_io_start</code>（比較的新しいカーネル）または<code>block_bio_queue</code>を、完了イベントに<code>block_io_done</code>または<code>block_rq_complete</code>を使います。<code>-Q</code>を付けない既定ではキュー待ちを除いたデバイス側のレイテンシを測るため、開始イベントに<code>blk_mq_start_request</code>（古いカーネルでは<code>blk_start_request</code>）を使います。どのプローブが選ばれるかは対象カーネルとBCCのバージョン、および<code>-Q</code>の有無に依存するので、精度が問題になる場面では手元の<code>biolatency.py</code>の実装を確認するのが確実です。自前実装で前段の落とし穴を踏むより、まずは既製ツールを使うことを勧めます。
                </p>
                <p>
                    なお<code>kprobe:blk_account_io_start</code>のようなカーネル内部関数へのkprobeは、インライン化や関数名の変更でカーネルバージョンごとに使えなくなることがあります。自作する場合は比較的安定した<code>tracepoint:block:*</code>を優先し、利用可能なプローブは<code
                        >bpftrace -l &apos;tracepoint:block:*&apos;</code
                    >で事前に確認してください。
                </p>
                <hr />
                <h2 id="13-実践60秒linuxパフォーマンス分析チェックリスト" tabIndex={-1}>
                    13. 実践：60秒Linuxパフォーマンス分析チェックリスト
                </h2>
                <p>
                    原著1章で紹介される「60秒でできるLinuxパフォーマンス分析」は、障害発生時に<strong>まず何から手をつけるべきか</strong>を示す実践的なチェックリストです。<code>uptime</code>・<code>vmstat</code>・<code>mpstat</code>・<code>pidstat</code>・<code>iostat</code>・<code>sar</code>・<code>top</code>といった、多くのLinuxディストリビューションで標準的に利用できる低オーバーヘッドの基本観測ツールを中心に構成されている点が利点です。ただしオーバーヘッドはゼロではありません。プロセス数やCPUコア数といった対象システムの規模と、サンプリング間隔（<code>1</code>秒指定など）に応じてコストは変動し、特にプロセス単位で集計する<code>pidstat</code>や<code>top</code>は大規模ホストで相応の負荷になり得ます。
                </p>
                <Diagram id="diag-17" />
                <p>
                    このチェックリストの狙いは、10個のコマンドを機械的に実行することそのものではなく、<strong>「エラー・使用率・飽和度という3つの視点を、主要リソースすべてに対して漏れなく短時間で当てる」</strong>という、USEメソッドの思想を実務に落とし込む型を身につけることにあります。
                </p>
                <hr />
                <h2 id="14-ケーススタディの読み方" tabIndex={-1}>14. ケーススタディの読み方</h2>
                <p>
                    原著16章では、実際の性能調査の思考プロセスがケーススタディとして紹介されています。初学者がこの種のケーススタディを読む際は、単に「どのコマンドを打ったか」を追うのではなく、以下の観点で読み解くと学習効果が高まります。
                </p>
                <Diagram id="diag-18" />
                <p>
                    特に重要なのは、「最初に立てた仮説が外れることは珍しくない」という点です。原著のケーススタディでも、最初はネットワークを疑ったが実際の真因はメモリとディスクにあった、という展開が紹介されており、これはまさにアンチメソッド（誰かのせいにする／街灯の下だけ探す）を避け、USEメソッドで全リソースを機械的に確認することの価値を示す好例です。
                </p>
                <hr />
                <h2 id="15-学習ロードマップ初学者向け" tabIndex={-1}>15. 学習ロードマップ（初学者向け）</h2>
                <p>これから本書および関連ツールを学ぶ際の、実践的な順序の一例です。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ステップ</th>
                                <th scope="col">やること</th>
                                <th scope="col">目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>1</td>
                                <td>
                                    USE法・RED法・診断サイクルの考え方を理解する（本ガイドの3章）
                                </td>
                                <td>まず概念を先に押さえる</td>
                            </tr>
                            <tr className="even">
                                <td>2</td>
                                <td>
                                    手元のLinux環境（VMでも可）で「60秒チェックリスト」の10コマンドを実際に打ってみる
                                </td>
                                <td>出力の意味を1つずつ確認</td>
                            </tr>
                            <tr className="odd">
                                <td>3</td>
                                <td>
                                    <code>perf record</code
                                    >でCPUプロファイリングを行い、フレームグラフを自分で生成してみる
                                </td>
                                <td>可視化の効果を体感する</td>
                            </tr>
                            <tr className="even">
                                <td>4</td>
                                <td>
                                    <code>bpftrace</code
                                    >の1行プログラムを写経し、tracepoint/kprobe/uprobeの違いを体感する
                                </td>
                                <td>付録Cの一覧を活用</td>
                            </tr>
                            <tr className="odd">
                                <td>5</td>
                                <td>
                                    コンテナ環境（Docker等）でcgroupのリソース制限を体験し、ノイジーネイバーの挙動を再現してみる
                                </td>
                                <td>クラウド特有の論点の理解</td>
                            </tr>
                            <tr className="even">
                                <td>6</td>
                                <td>
                                    自分のワークロードでベンチマークを設計し、11章のチェックリストに沿って検証する
                                </td>
                                <td>実務への橋渡し</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="まとめ" tabIndex={-1}>まとめ</h2>
                <ul>
                    <li>
                        システムパフォーマンス分析の核心は、個別ツールの暗記ではなく
                        <strong>USEメソッド（使用率・飽和度・エラー）</strong>
                        に代表される体系的なメソドロジです。
                    </li>
                    <li>
                        サービス指向の環境では、RED法（Rate・Errors・Duration）とUSE法を<strong>併用</strong>することで、ユーザー影響とインフラ要因の両面をカバーできます。
                    </li>
                    <li>
                        可観測性ツールは「固定カウンタ→プロファイリング→トレーシング→モニタリング」という順に、オーバーヘッドと詳細度のトレードオフを意識して選びます。
                    </li>
                    <li>
                        クラウド環境では、ハードウェア仮想化・OS仮想化・軽量仮想化というアーキテクチャの違いが、可観測性とオーバーヘッド特性に直結します。ノイジーネイバー問題のような、オンプレミスにはないマルチテナント特有の課題にも注意が必要です。
                    </li>
                    <li>
                        eBPFは低オーバーヘッドの動的トレーシングを可能にし、Netflix・Google・Meta・Microsoftなど国際的な大手事業者を含む業界標準の基盤技術として定着しつつあります。
                    </li>
                    <li>
                        ベンチマーキングは「間違えやすい」ものだと自覚し、目的の明確化・本番類似ワークロード・ウォームアップ除外・統計的検証といった基本を徹底することが重要です。
                    </li>
                </ul>
                <hr />
                <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                <div className="ref-grid" id="referenceGrid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            詳解 システム・パフォーマンス 第2版（オライリー・ジャパン）.
                            <a href="https://www.oreilly.co.jp/books/9784814400072/"
                                >https://www.oreilly.co.jp/books/9784814400072/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            Brendan Gregg, &quot;The USE Method&quot;.
                            <a href="https://www.brendangregg.com/usemethod.html"
                                >https://www.brendangregg.com/usemethod.html</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            Brendan Gregg, &quot;USE Method: Linux Performance Checklist&quot;.
                            <a href="https://www.brendangregg.com/USEmethod/use-linux.html"
                                >https://www.brendangregg.com/USEmethod/use-linux.html</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            Brendan Gregg, &quot;Thinking Methodically About Performance&quot;, Communications
                            of the ACM.
                            <a
                                href="https://cacm.acm.org/practice/thinking-methodically-about-performance/"
                                >https://cacm.acm.org/practice/thinking-methodically-about-performance/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            Wikipedia, &quot;Brendan Gregg&quot;.
                            <a href="https://en.wikipedia.org/wiki/Brendan_Gregg"
                                >https://en.wikipedia.org/wiki/Brendan_Gregg</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            Brendan Gregg, &quot;BPF Performance Tools&quot; 書籍公式ページ.
                            <a href="https://www.brendangregg.com/bpf-performance-tools-book.html"
                                >https://www.brendangregg.com/bpf-performance-tools-book.html</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            GitHub, &quot;brendangregg/bpf-perf-tools-book&quot; 公式リポジトリ.
                            <a href="https://github.com/brendangregg/bpf-perf-tools-book"
                                >https://github.com/brendangregg/bpf-perf-tools-book</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            Brendan Gregg, &quot;CPU Flame Graphs&quot;.
                            <a href="https://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html"
                                >https://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Wikipedia, &quot;Flame graph&quot;.
                            <a href="https://en.wikipedia.org/wiki/Flame_graph"
                                >https://en.wikipedia.org/wiki/Flame_graph</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            USENIX ATC&apos;17, &quot;Visualizing Performance with Flame Graphs&quot;.
                            <a
                                href="https://www.usenix.org/conference/atc17/program/presentation/gregg-flame"
                                >https://www.usenix.org/conference/atc17/program/presentation/gregg-flame</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            Brendan Gregg, &quot;Linux Performance&quot; ツールマップ.
                            <a href="https://www.brendangregg.com/linuxperf.html"
                                >https://www.brendangregg.com/linuxperf.html</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Brendan Gregg, &quot;Cloud Performance Root Cause Analysis at Netflix&quot;
                            (YOW2018スライド).
                            <a
                                href="https://www.brendangregg.com/Slides/YOW2018_CloudPerfRCANetflix/"
                                >https://www.brendangregg.com/Slides/YOW2018_CloudPerfRCANetflix/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            Netflix Technology Blog, &quot;Noisy Neighbor Detection with eBPF&quot;.
                            <a
                                href="https://netflixtechblog.com/noisy-neighbor-detection-with-ebpf-64b1f4b3bbdd"
                                >https://netflixtechblog.com/noisy-neighbor-detection-with-ebpf-64b1f4b3bbdd</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            Netflix Technology Blog, &quot;Announcing bpftop: Streamlining eBPF
                            performance optimization&quot;.
                            <a
                                href="https://netflixtechblog.com/announcing-bpftop-streamlining-ebpf-performance-optimization-6a727c1ae2e5"
                                >https://netflixtechblog.com/announcing-bpftop-streamlining-ebpf-performance-optimization-6a727c1ae2e5</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            Netflix Technology Blog, &quot;How Netflix uses eBPF flow logs at scale for
                            network insight&quot;.
                            <a
                                href="https://netflixtechblog.com/how-netflix-uses-ebpf-flow-logs-at-scale-for-network-insight-e3ea997dca96"
                                >https://netflixtechblog.com/how-netflix-uses-ebpf-flow-logs-at-scale-for-network-insight-e3ea997dca96</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            InfoQ, &quot;Netflix Uncovers Kernel-Level Bottlenecks While Scaling
                            Containers on Modern CPUs&quot; (2026).
                            <a
                                href="https://infoq.com/news/2026/03/netflix-kernel-scaling-container/"
                                >https://infoq.com/news/2026/03/netflix-kernel-scaling-container/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            Grafana Labs, &quot;The RED Method: How to Instrument Your Services&quot; (Tom
                            Wilkie).
                            <a
                                href="https://grafana.com/blog/the-red-method-how-to-instrument-your-services/"
                                >https://grafana.com/blog/the-red-method-how-to-instrument-your-services/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            The New Stack, &quot;The RED Method: A New Approach to Monitoring
                            Microservices&quot;.
                            <a href="https://thenewstack.io/monitoring-microservices-red-method/"
                                >https://thenewstack.io/monitoring-microservices-red-method/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            Firecracker microVM 公式サイト.
                            <a href="https://firecracker-microvm.github.io/"
                                >https://firecracker-microvm.github.io/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            AWS, &quot;The Security Design of the AWS Nitro System&quot; ホワイトペーパー.
                            <a
                                href="https://docs.aws.amazon.com/whitepapers/latest/security-design-of-aws-nitro-system/the-ec2-approach-to-preventing-side-channels.html"
                                >https://docs.aws.amazon.com/whitepapers/latest/security-design-of-aws-nitro-system/the-ec2-approach-to-preventing-side-channels.html</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            AWS Open Source Blog, &quot;Announcing the Firecracker Open Source
                            Technology&quot;.
                            <a
                                href="https://aws.amazon.com/blogs/opensource/firecracker-open-source-secure-fast-microvm-serverless/"
                                >https://aws.amazon.com/blogs/opensource/firecracker-open-source-secure-fast-microvm-serverless/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            Brendan Gregg, &quot;Systems Performance 2nd Edition&quot;
                            書籍公式ページ（近況含む）.
                            <a
                                href="https://www.brendangregg.com/systems-performance-2nd-edition-book.html"
                                >https://www.brendangregg.com/systems-performance-2nd-edition-book.html</a
                            >
                        </div>
                    </div>
                </div>
                <p>
                    <em
                        >（本ガイドの作成にあたり、2026年8月24日時点でWeb検索により各情報源の内容を確認しています。）</em
                    >
                </p>
            </main>
            </div>
        </div>
    );
}
