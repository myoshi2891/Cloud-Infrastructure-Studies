'use client';

import { memo, useState } from 'react';
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

export function OperatingSystemsThreeEasyPiecesGuide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const handleCheck = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="ostep-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    
                <div className="hero">
                    <div className="kicker">Operating Systems: Three Easy Pieces</div>
                    <h1>Operating Systems: Three Easy Pieces（OSTEP）初学者向け学習ガイド</h1>
                    <div className="meta-row">
                        <span className="pill">章数 <strong>全57章+付録</strong></span>
                        <span className="pill">対象 <strong>初学者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 56点</strong></span>
                        <span className="pill">参考文献 <strong>12件</strong></span>
                    </div>
                </div>

                <div className="source-meta">
                    <p>
                        原著:{' '}
                        <em>Operating Systems: Three Easy Pieces</em>（バージョン1.10、2023年11月改訂）
                    </p>
                    <p>
                        著者: Remzi H. Arpaci-Dusseau / Andrea C. Arpaci-Dusseau（University of
                        Wisconsin-Madison）、セキュリティ章: Peter Reiher（UCLA）
                    </p>
                    <p>原著公開ページ: https://pages.cs.wisc.edu/~remzi/OSTEP/</p>
                    <p>本ガイド作成日: 2026年8月29日時点の情報に基づく</p>
                </div>
                <hr />

                <h2 id="この記事について" tabIndex={-1}>この記事について</h2>
                <p>
                    OSTEP（発音は「オー・ステップ」）は、Wisconsin大学マディソン校のRemziとAndreaのArpaci-Dusseau夫妻が20年以上のOS講義の経験をもとに書き上げた、<strong>無料で全文公開されているオペレーティングシステムの教科書</strong>です。通称「コメット本（the
                    comet book）」「彗星本（the asteroid
                    book）」とも呼ばれ、表紙にハレー彗星のイラストが描かれています。
                </p>
                <p>
                    本書は「教科書は無料であるべきだ」という著者らの強い信念のもとに公開されており、PDF版は今後も無償で提供され続けることが明言されています。同時に、有償のハードカバー・ソフトカバー・電子書籍版（目次のハイパーリンクや索引付き）も販売されており、収益は書籍の改善に還元されています。
                </p>
                <p>
                    本ガイドは、OSTEP全57章＋付録を初学者が挫折せずに読み通せるよう、<strong>原著の構成に沿いながら独自の言葉で再構成し、図解（Mermaid）と表を多用して整理し直したもの</strong>です。原文の逐語的な引用は避け、概念の要点・相互関係・実務との接続を中心にまとめています。学習の際は、必ず原著（無料PDF）も並行して参照してください。
                </p>
                <h2 id="対象読者" tabIndex={-1}>対象読者</h2>
                <ul>
                    <li>OSやコンピュータの低レイヤーに初めて触れる学生・エンジニア</li>{' '}
                    <li>
                        「プロセスとスレッドの違いが曖昧」「malloc
                        の裏側がわからない」「ファイルシステムがブラックボックス」と感じている人
                    </li>{' '}
                    <li>
                        xv6・Linuxカーネル・データベースエンジン・分散システムなど、より高度な学習に進む前の土台を固めたい人
                    </li>{' '}
                    <li>
                        C言語の基本文法（ポインタ、構造体、システムコール呼び出し程度）を理解している、または並行して学ぶ意欲がある人
                    </li>
                </ul>
                <h2 id="本書の三本柱" tabIndex={-1}>本書の三本柱</h2>
                <p>
                    OSTEPというタイトルの「Three Easy
                    Pieces」は、物理学者リチャード・ファインマンの講義録『Six Easy
                    Pieces』へのオマージュです。OSが提供する主要な役割を、以下の3つの概念に分解して説明します。
                </p>
                <Diagram id="diag-1" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">柱</th>
                                <th scope="col">一言でいうと</th>
                                <th scope="col">主な問い</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>仮想化（Virtualization）</td>
                                <td>
                                    1つの物理資源を、多数のプログラムが専有しているかのように見せる技術
                                </td>
                                <td>CPUをどう時分割するか？　メモリ空間をどう独立させるか？</td>
                            </tr>
                            <tr className="even">
                                <td>並行性（Concurrency）</td>
                                <td>
                                    複数の実行の流れ（スレッド）が共有資源に安全にアクセスするための仕組み
                                </td>
                                <td>ロックはどう実装する？　デッドロックはなぜ起きる？</td>
                            </tr>
                            <tr className="odd">
                                <td>永続性（Persistence）</td>
                                <td>電源が落ちてもデータを失わずに保持する技術</td>
                                <td>
                                    ディスクI/Oはどう発行する？　クラッシュ時の一貫性はどう保証する？
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    これら3つに加えて、原著には2020年に追加された<strong>セキュリティ章（Web版限定）</strong>があり、本ガイドでは第5部として扱います。
                </p>
                <h2 id="メカニズムとポリシーostep全体を貫く合言葉" tabIndex={-1}>
                    メカニズムとポリシー：OSTEP全体を貫く合言葉
                </h2>
                <p>
                    OSTEPを通読するうえで最も重要な設計原則が「<strong>メカニズム（mechanism）とポリシー（policy）の分離</strong>」です。これはOSに限らずソフトウェア設計全般に通じる考え方なので、最初に押さえておきましょう。
                </p>
                <Diagram id="diag-2" />

                <p>
                    メカニズムとポリシーを分離しておくと、下位の仕組み（メカニズム）を変えずに、上位の判断基準（ポリシー）だけを差し替えられます。CPUスケジューリングでもメモリ置換でも、この分離思想が繰り返し登場します。
                </p>
                <h2 id="学習環境の準備" tabIndex={-1}>学習環境の準備</h2>
                <p>原著の宿題・プロジェクトは主にC言語とLinux/macOS環境を前提としています。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用途</th>
                                <th scope="col">必要なもの</th>
                                <th scope="col">備考</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>本文の宿題シミュレータ</td>
                                <td>Python 3</td>
                                <td>
                                    <code>cpu-sched</code>や<code>vm-paging</code>などの章末シミュレータはPythonスクリプトとして配布
                                </td>
                            </tr>
                            <tr className="even">
                                <td>C言語プロジェクト（初期ユーティリティ等）</td>
                                <td>
                                    gcc、標準Cライブラリ、POSIXスレッド（<code>-pthread</code>）
                                </td>
                                <td>ostep-projects リポジトリで公開</td>
                            </tr>
                            <tr className="odd">
                                <td>xv6ラボ課題</td>
                                <td>qemu、RISC-V向けクロスコンパイラ</td>
                                <td>
                                    MIT
                                    6.1810（旧6.828）が提供する<code>xv6-riscv</code>を利用することが多い
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-3" />

                <hr />

                <h2 id="第0部始める前に--osとコンピュータの基礎" tabIndex={-1}>
                    第0部：始める前に — OSとコンピュータの基礎
                </h2>
                <h3 id="01-オペレーティングシステムとは何か" tabIndex={-1}>
                    0.1 オペレーティングシステムとは何か
                </h3>
                <p>
                    オペレーティングシステム（OS）は、ハードウェアとアプリケーションプログラムの間に位置し、以下の役割を担うソフトウェア層です。
                </p>
                <ul>
                    <li>
                        <strong>資源管理者（resource manager）</strong>：CPU・メモリ・ディスクといった有限の物理資源を、複数のプログラムに公平かつ効率的に配分する。
                    </li>{' '}
                    <li>
                        <strong>抽象化の提供者</strong>：物理的で複雑なハードウェアを、扱いやすい抽象（プロセス、仮想メモリ、ファイル）に変換する。
                    </li>{' '}
                    <li>
                        <strong>標準化されたインターフェースの提供者</strong>：システムコールという形で、アプリケーションがハードウェアの詳細を意識せずに機能を利用できるようにする。
                    </li>
                </ul>
                <Diagram id="diag-4" />

                <h3 id="02-歴史的背景第12章対話とイントロダクション" tabIndex={-1}>
                    0.2 歴史的背景（第1〜2章：対話とイントロダクション）
                </h3>
                <p>
                    原著は各パートの冒頭に「対話（Dialogue）」という架空の教師と生徒の会話形式の短い章を置き、その後の内容への導入とする独自のスタイルを採用しています。第2章「Introduction」では、コンピュータの利用形態の変遷を通じてOSが生まれた必然性を説明します。
                </p>
                <Diagram id="diag-5" />

                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                OSTEPの各部冒頭の「対話」章は読み飛ばしたくなるが、次章以降で扱う核心的な疑問（crux
                                of the
                                problem）を平易な言葉で先出ししてくれるため、実は最初に読むと理解が早まる。
                            </li>{' '}
                            <li>
                                第2章の「歴史」を暗記する必要はない。重要なのは「なぜマルチプログラミングが必要だったか」「なぜ保護（protection）の概念が生まれたか」という<strong>因果関係</strong>を掴むこと。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="03-osの3大目標再掲第2章より" tabIndex={-1}>0.3 OSの3大目標（再掲・第2章より）</h3>
                <p>第2章で提示される目標を、実務に近い言葉で言い換えると次の通りです。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">目標</th>
                                <th scope="col">原著での表現</th>
                                <th scope="col">実務での言い換え</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>仮想化（Virtualize）</td>
                                <td>物理資源を仮想化し、使いやすい抽象を提供する</td>
                                <td>
                                    1台のマシンで複数プロセスが「自分専用のCPUとメモリ」を持っているかのように動かす
                                </td>
                            </tr>
                            <tr className="even">
                                <td>並行性のサポート</td>
                                <td>共有資源への並行アクセスを正しく扱う</td>
                                <td>
                                    マルチスレッドプログラムでレースコンディションを起こさない仕組みを用意する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>永続性の保証</td>
                                <td>ハードウェアの永続記憶を安全に管理する</td>
                                <td>電源断やクラッシュが起きてもファイルの内容を失わない</td>
                            </tr>
                            <tr className="even">
                                <td>効率性（Efficiency）</td>
                                <td>オーバーヘッドを最小化する</td>
                                <td>仮想化のコストで実マシンの性能を無駄にしない</td>
                            </tr>
                            <tr className="odd">
                                <td>セキュリティ/保護（Protection）</td>
                                <td>プロセス同士・ユーザー同士を隔離する</td>
                                <td>
                                    悪意あるプログラムや不具合のあるプログラムが他人の領域を破壊しない
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                <h2 id="第1部仮想化--cpu第311章" tabIndex={-1}>第1部：仮想化 — CPU（第3〜11章）</h2>
                <h3 id="11-プロセスとは何か第4章-processes" tabIndex={-1}>
                    1.1 プロセスとは何か（第4章 Processes）
                </h3>
                <p>
                    <strong>プロセス（process）</strong>とは、「実行中のプログラム」を表すOSの抽象概念です。プログラム自体はディスク上の静的なバイナリファイルにすぎませんが、OSがそれをメモリにロードし、レジスタやプログラムカウンタなどの実行状態を割り当てることで、初めて「動いているもの」＝プロセスになります。
                </p>
                <Diagram id="diag-6" />

                <p>プロセスが持つ主な機械状態（machine state）は次の通りです。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">構成要素</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>アドレス空間</td>
                                <td>
                                    プロセス専用に見えるメモリ領域（コード・データ・ヒープ・スタック）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>レジスタ</td>
                                <td>
                                    プログラムカウンタ（次に実行する命令のアドレス）、スタックポインタなど
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>I/O情報</td>
                                <td>開いているファイルディスクリプタの一覧</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="プロセスの状態遷移" tabIndex={-1}>プロセスの状態遷移</h4>
                <Diagram id="diag-7" />

                <p>
                    原著では、この3状態（Running / Ready /
                    Blocked）に加え、生成直後の「Initial」や終了処理中の「Final(Zombie)」状態も紹介されますが、初学者はまずこの3状態の遷移条件を押さえれば十分です。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                「プロセス」と「プログラム」を混同しない。同じプログラムから複数のプロセスを生成できる（例：同じ<code>bash</code>バイナリから何十個ものシェルプロセスが動く）。
                            </li>{' '}
                            <li>
                                OSはプロセスの状態を<strong>プロセス制御ブロック（PCB, Process Control Block）</strong>、Linuxでは<code>task_struct</code>と呼ばれる構造体で管理している、という対応関係を覚えておくと後のカーネル学習に活きる。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="12-プロセスapi第5章-process-api" tabIndex={-1}>1.2 プロセスAPI（第5章 Process API）</h3>
                <p>
                    UNIX系OSがプロセス生成に採用した<code>fork()</code> / <code>exec()</code> /{' '}
                    <code>wait()</code>の組み合わせは、OS設計における最も有名な発明の1つです。
                </p>
                <Diagram id="diag-8" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">API</th>
                                <th scope="col">役割</th>
                                <th scope="col">戻り値のポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>fork()</code></td>
                                <td>
                                    呼び出し元プロセスとほぼ同一のコピーを新規プロセスとして生成する
                                </td>
                                <td>親には子のPID、子には0が返る（この非対称性が親子判別の鍵）</td>
                            </tr>
                            <tr className="even">
                                <td><code>exec()</code></td>
                                <td>
                                    現在のプロセスのアドレス空間を、指定した別プログラムで置き換える
                                </td>
                                <td>成功時は戻ってこない（元のコードには戻らない）</td>
                            </tr>
                            <tr className="odd">
                                <td><code>wait()</code></td>
                                <td>子プロセスの終了を待ち、終了ステータスを回収する</td>
                                <td>ゾンビプロセス化を防ぐために重要</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                「なぜ<code>fork()</code>と<code>exec()</code>を分けたのか？」という設計思想を理解することが最重要。分離することで、<code>fork()</code>直後・<code>exec()</code>前の間にリダイレクトやパイプの設定（ファイルディスクリプタの操作）を挟み込める。これがUNIXシェルのパイプ（<code>|</code>）を実現する仕組みの根幹。
                            </li>{' '}
                            <li>
                                <code>wait()</code>を呼ばない実装は、子プロセス終了後もPCBがゾンビとして残り続ける「ゾンビプロセス」問題を引き起こす。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="13-制限付き直接実行第6章-limited-direct-execution" tabIndex={-1}>
                    1.3 制限付き直接実行（第6章 Limited Direct Execution）
                </h3>
                <p>CPUを仮想化する際、OSは2つの相反する目標のバランスを取らねばなりません。</p>
                <Diagram id="diag-9" />

                <p>
                    LDEは、プログラムを直接CPU上で走らせつつ、要所で制御をOSに戻す仕組みです。主要なメカニズムは以下の2つです。
                </p>
                <Diagram id="diag-10" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ユーザーモード / カーネルモード</td>
                                <td>
                                    CPUの特権レベル。ユーザーモードでは特権命令（I/O発行など）が制限される
                                </td>
                            </tr>
                            <tr className="even">
                                <td>トラップテーブル（trap table）</td>
                                <td>
                                    ブート時にOSがハードウェアへ登録する、割り込み・例外・システムコールごとのハンドラアドレス一覧
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>コンテキストスイッチ</td>
                                <td>
                                    実行中プロセスのレジスタをPCBに保存し、次のプロセスのレジスタを復元する処理
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                悪意あるプログラムが無限ループでCPUを独占するのを防いでいるのは「タイマー割り込み」である、という事実は必ず押さえる。タイマー割り込みがなければ、協調的なシステムコール呼び出しに頼るしかなく、OSはプログラムの善意に依存してしまう。
                            </li>{' '}
                            <li>
                                コンテキストスイッチには2種類の「保存/復元」がある：(1)割り込み発生時にハードウェアが行うレジスタ保存、(2)スケジューラが別プロセスへ切り替える際にOSが行うレジスタ保存。この2段階を区別できると原著の説明が格段に分かりやすくなる。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="14-cpuスケジューリング方針第7章-cpu-scheduling" tabIndex={-1}>
                    1.4 CPUスケジューリング方針（第7章 CPU Scheduling）
                </h3>
                <p>
                    スケジューリングは「複数のRunnableなプロセスのうち、次にどれをCPUに割り当てるか」というポリシーの問題です。評価指標として、主に以下の2つが使われます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">指標</th>
                                <th scope="col">定義</th>
                                <th scope="col">重視する観点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ターンアラウンドタイム（turnaround time）</td>
                                <td>ジョブの完了時刻 − 到着時刻</td>
                                <td>スループット重視のバッチ処理</td>
                            </tr>
                            <tr className="even">
                                <td>応答時間（response time）</td>
                                <td>最初にCPUを割り当てられた時刻 − 到着時刻</td>
                                <td>対話的な使用感</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-11" />

                <p>
                    <strong>トレードオフの本質</strong>：ターンアラウンドタイムを最適化する政策（STCF）と、応答時間を最適化する政策（RR）は、しばしば相反します。RRはタイムスライスを短くするほど応答性は上がりますが、コンテキストスイッチのオーバーヘッドが増えてターンアラウンドが悪化します。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                スケジューリングアルゴリズムを丸暗記するのではなく、原著が採用する「ワークロードの仮定を1つずつ緩和していく」という説明の流れ（各ジョブの実行時間が既知→未知、ジョブが一括到着→逐次到着、I/Oを行わない→行う）を追体験すること。これにより、なぜ次々と新しいアルゴリズムが必要になるのかが腑に落ちる。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="15-マルチレベルフィードバックキュー第8章-mlfq" tabIndex={-1}>
                    1.5 マルチレベルフィードバックキュー（第8章 MLFQ）
                </h3>
                <p>
                    現実には「ジョブの実行時間は事前にはわからない」という制約があります。MLFQ（Multi-Level
                    Feedback
                    Queue）は、過去の実行履歴から将来の挙動を推測し、SJF/STCFに近い挙動を実現しようとするアルゴリズムです。
                </p>
                <Diagram id="diag-12" />

                <p>MLFQの基本ルールは次のように整理できます。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ルール</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Rule 1</td>
                                <td>優先度Aのジョブは優先度Bのジョブより優先される（A &gt; B）</td>
                            </tr>
                            <tr className="even">
                                <td>Rule 2</td>
                                <td>同一優先度のジョブはラウンドロビンで実行される</td>
                            </tr>
                            <tr className="odd">
                                <td>Rule 3</td>
                                <td>ジョブ生成時は最高優先度キューに配置される</td>
                            </tr>
                            <tr className="even">
                                <td>Rule 4</td>
                                <td>
                                    割り当てられたタイムスライスを使い切ったら優先度を1段階下げる（I/Oで自発的に手放した場合は据え置き）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Rule 5</td>
                                <td>
                                    一定時間ごとに全ジョブを最高優先度に戻す（優先度ブースト。飢餓状態とゲーミング対策）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                MLFQは「CPUを大量に消費するジョブ（バッチ的）」を自動的に低優先度へ追いやり、「短時間だけCPUを使ってすぐI/Oを発行するジョブ（対話的）」を高優先度に保つ、という<strong>過去の挙動から未来を予測する</strong>発想が核心。
                            </li>{' '}
                            <li>
                                優先度ブーストがない設計だと、長時間実行され続けるジョブが低優先度に固定され続け「飢餓（starvation）」に陥る、という弱点も併せて理解しておく。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="16-くじ引きスケジューリングと比例配分第9章-lottery-scheduling" tabIndex={-1}>
                    1.6 くじ引きスケジューリングと比例配分（第9章 Lottery Scheduling）
                </h3>
                <p>
                    MLFQのような優先度ベースの方式とは異なるアプローチとして、<strong>比例配分スケジューリング（proportional-share scheduling）</strong>があります。くじ引きスケジューリング（lottery scheduling）はその代表例です。
                </p>
                <Diagram id="diag-13" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">概念</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>チケット通貨（ticket currency）</td>
                                <td>
                                    ユーザーが自分のチケットを部分プロセスに独自の「通貨」で再配分できる仕組み
                                </td>
                            </tr>
                            <tr className="even">
                                <td>チケット譲渡（ticket transfer）</td>
                                <td>
                                    プロセスが一時的に自分のチケットを他プロセス（例：待たせているサーバプロセス）へ譲渡できる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>チケット膨張（ticket inflation）</td>
                                <td>
                                    信頼できるプロセス同士の間で、自分のチケット数を一時的に増減させる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ストライドスケジューリング（stride scheduling）</td>
                                <td>
                                    くじ引きの確率的な公平性を、決定的（deterministic）なアルゴリズムに置き換えたもの
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                くじ引きスケジューリングの最大の利点は「乱数を使うことでエッジケースの処理を省略でき、実装がシンプルになる」という点。長期的には統計的に公平になるが、短期的な保証はない、というトレードオフを理解する。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="17-マルチcpuスケジューリング第10章-multiprocessor-scheduling" tabIndex={-1}>
                    1.7 マルチCPUスケジューリング（第10章 Multiprocessor Scheduling）
                </h3>
                <p>
                    マルチコア時代のスケジューリングでは、単一CPUの延長では済まない新たな課題が生じます。
                </p>
                <Diagram id="diag-14" />

                <p>
                    Linuxの実例として、原著（v1.0以降）はO(1)スケジューラ、Completely Fair
                    Scheduler（CFS）、BFS（Brain Fuck
                    Scheduler）を比較しています。CFSは「仮想実行時間（vruntime）」に基づく赤黒木でプロセスを管理し、比例配分スケジューリングの考え方に近いアプローチを取っています。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                マルチコアCPUを学ぶ際は「1つのCPU向けアルゴリズムをコア数だけ並べれば良い」という単純な発想では不十分で、コア間のキャッシュ効率と負荷分散のトレードオフが本質的な難しさであると理解する。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="18-cpu仮想化のまとめ第11章" tabIndex={-1}>1.8 CPU仮想化のまとめ（第11章）</h3>
                <p>
                    第3〜10章の内容は、原著の対話形式の「まとめ（Summary）」章で振り返られます。以下の対応表で全体像を整理しておきましょう。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">章</th>
                                <th scope="col">テーマ</th>
                                <th scope="col">一言まとめ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>4</td>
                                <td>プロセス</td>
                                <td>「実行中のプログラム」という抽象、状態遷移</td>
                            </tr>
                            <tr className="even">
                                <td>5</td>
                                <td>プロセスAPI</td>
                                <td>
                                    <code>fork</code>/<code>exec</code>/<code>wait</code>の分離設計
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>6</td>
                                <td>制限付き直接実行</td>
                                <td>trapとタイマー割り込みで性能と制御を両立</td>
                            </tr>
                            <tr className="even">
                                <td>7</td>
                                <td>CPUスケジューリング</td>
                                <td>FIFO→SJF→STCF→RRとワークロード仮定の緩和</td>
                            </tr>
                            <tr className="odd">
                                <td>8</td>
                                <td>MLFQ</td>
                                <td>過去の挙動から優先度を動的に調整</td>
                            </tr>
                            <tr className="even">
                                <td>9</td>
                                <td>くじ引き/比例配分</td>
                                <td>乱数を使った公平性の実現</td>
                            </tr>
                            <tr className="odd">
                                <td>10</td>
                                <td>マルチCPUスケジューリング</td>
                                <td>キャッシュアフィニティと負荷分散</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                <h2 id="第2部仮想化--メモリ第1224章" tabIndex={-1}>第2部：仮想化 — メモリ（第12〜24章）</h2>
                <h3 id="21-アドレス空間第13章-address-spaces" tabIndex={-1}>
                    2.1 アドレス空間（第13章 Address Spaces）
                </h3>
                <p>
                    メモリの仮想化とは、各プロセスに「自分だけがメモリ全体を専有している」という幻想（illusion）を与える仕組みです。この幻想の単位を<strong>アドレス空間（address space）</strong>と呼びます。
                </p>
                <Diagram id="diag-15" />

                <p>
                    OSはこの仮想アドレス空間を<strong>物理メモリへ透過的に変換（address translation）</strong>することで、複数プロセスが同じ仮想アドレス（例：0番地）を使っても、実際には異なる物理メモリ上に配置できるようにしています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>仮想化のゴール：透過性</td>
                                <td>プログラムは自分が仮想化されていることに気づかない</td>
                            </tr>
                            <tr className="even">
                                <td>仮想化のゴール：効率性</td>
                                <td>時間・空間のオーバーヘッドを最小化する</td>
                            </tr>
                            <tr className="odd">
                                <td>仮想化のゴール：保護</td>
                                <td>あるプロセスが他のプロセスや OS 自身のメモリに触れない</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="22-メモリapi第14章-memory-api" tabIndex={-1}>2.2 メモリAPI（第14章 Memory API）</h3>
                <p>C言語における動的メモリ管理の基本APIと、よくあるバグのパターンを整理します。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">API</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>malloc(size)</code></td>
                                <td>ヒープから指定バイト数の領域を確保し、先頭アドレスを返す</td>
                            </tr>
                            <tr className="even">
                                <td><code>free(ptr)</code></td>
                                <td>確保した領域を解放する</td>
                            </tr>
                            <tr className="odd">
                                <td><code>calloc()</code></td>
                                <td>ゼロ初期化して確保する</td>
                            </tr>
                            <tr className="even">
                                <td><code>realloc()</code></td>
                                <td>確保済み領域のサイズを変更する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-16" />

                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                <code>malloc</code>/<code>free</code>はシステムコールではなく<strong>ライブラリ関数</strong>であり、内部では<code>brk</code>/<code>sbrk</code>や<code>mmap</code>といったシステムコールでOSからメモリ領域を獲得している、という階層関係を理解する。
                            </li>{' '}
                            <li>
                                Valgrindのようなツールでメモリバグを検出する習慣は、本章の内容を実務に接続する第一歩になる。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="23-アドレス変換の基礎ベースバウンド第15章-address-translation" tabIndex={-1}>
                    2.3 アドレス変換の基礎：ベース＆バウンド（第15章 Address Translation）
                </h3>
                <p>
                    <strong>ハードウェアによるメモリ仮想化（hardware-based address
                        translation）</strong>の最も単純な形が、ベース＆バウンド方式（動的リロケーション）です。
                </p>
                <Diagram id="diag-17" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">レジスタ</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ベースレジスタ（base）</td>
                                <td>プロセスの物理メモリ上の開始位置</td>
                            </tr>
                            <tr className="even">
                                <td>バウンドレジスタ（bound/limit）</td>
                                <td>アドレス空間のサイズ（範囲外アクセスを検出するため）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    この方式はハードウェアのMMU（Memory Management
                    Unit）による<strong>ダイナミックリロケーション</strong>を可能にしますが、プロセスのアドレス空間全体を1つの連続領域として扱うため、ヒープとスタックの間の未使用領域まで物理メモリを占有してしまう「内部的な無駄」が生じます。この課題を解決するのが次のセグメンテーションです。
                </p>
                <h3 id="24-セグメンテーション第16章-segmentation" tabIndex={-1}>
                    2.4 セグメンテーション（第16章 Segmentation）
                </h3>
                <p>
                    セグメンテーションは、アドレス空間を「コード」「ヒープ」「スタック」といった論理的な単位（セグメント）に分割し、それぞれに独立したベース＆バウンドのペアを用意する方式です。
                </p>
                <Diagram id="diag-18" />

                <p>
                    セグメンテーションにより未使用領域を物理メモリに割り当てずに済むようになりますが、各セグメント自体のサイズが可変であるため、<strong>外部フラグメンテーション（external fragmentation）</strong>という新たな問題が生じます。
                </p>
                <h3 id="25-空き領域管理第17章-free-space-management" tabIndex={-1}>
                    2.5 空き領域管理（第17章 Free-Space Management）
                </h3>
                <p>
                    可変サイズの割り当てを扱うヒープマネージャは、空き領域リストを管理し、外部フラグメンテーションを最小化するための戦略を選択します。
                </p>
                <Diagram id="diag-19" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">戦略</th>
                                <th scope="col">長所</th>
                                <th scope="col">短所</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>First Fit</td>
                                <td>実装が単純で高速</td>
                                <td>断片化がリストの先頭に集中しやすい</td>
                            </tr>
                            <tr className="even">
                                <td>Best Fit</td>
                                <td>無駄になる断片を最小化しようとする</td>
                                <td>探索コストが高く、極小の断片を大量に生む</td>
                            </tr>
                            <tr className="odd">
                                <td>Worst Fit</td>
                                <td>大きな断片を意図的に残す</td>
                                <td>大きな空き領域をすぐに使い切ってしまう</td>
                            </tr>
                            <tr className="even">
                                <td>Buddy System</td>
                                <td>併合（コアレッシング）が高速</td>
                                <td>内部フラグメンテーションが発生しやすい</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                どの戦略にも一長一短があり、「唯一絶対の正解」は存在しない、という原著のスタンスを理解する。実務ではjemalloc・tcmallocなど、スレッドごとにアリーナを分けるなどの発展的な設計がなされている。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="26-ページングの導入第18章-paging" tabIndex={-1}>2.6 ページングの導入（第18章 Paging）</h3>
                <p>
                    セグメンテーションの外部フラグメンテーション問題を根本的に解決するのが<strong>ページング（paging）</strong>です。アドレス空間を固定長の「ページ（page）」に分割し、物理メモリも同サイズの「ページフレーム（page
                    frame）」に分割して対応付けます。
                </p>
                <Diagram id="diag-20" />

                <p>
                    固定長ページを使うことで外部フラグメンテーションは解消されますが、代わりにページテーブル自体のメモリ消費（各プロセスごとに巨大なテーブルが必要）という新たな課題が生まれます。ページテーブルエントリ（PTE）には、物理フレーム番号のほか、有効ビット・保護ビット（読み書き実行権限）・参照ビット・ダーティビットといった付加情報が含まれます。
                </p>
                <h3 id="27-高速化tlb第19章-translation-lookaside-buffers" tabIndex={-1}>
                    2.7 高速化：TLB（第19章 Translation Lookaside Buffers）
                </h3>
                <p>
                    ページングは全メモリアクセスのたびにページテーブル参照という追加のメモリアクセスを発生させ、性能を大きく劣化させます。この問題を解決するのがハードウェアキャッシュである<strong>TLB（Translation Lookaside Buffer）</strong>です。
                </p>
                <Diagram id="diag-21" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">概念</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>TLBヒット率</td>
                                <td>プログラムの空間的・時間的局所性が高いほど向上する</td>
                            </tr>
                            <tr className="even">
                                <td>コンテキストスイッチ時のTLBフラッシュ</td>
                                <td>
                                    プロセスが切り替わるとTLBの内容が別プロセスのものと衝突するため無効化が必要（ASID/PCIDで回避する実装もある）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ソフトウェア管理TLB</td>
                                <td>MIPSなどはTLBミス時にOSがハンドラで処理（柔軟性が高い）</td>
                            </tr>
                            <tr className="even">
                                <td>ハードウェア管理TLB</td>
                                <td>
                                    x86などはCPUがページテーブルウォークを自動実行（OSの介入不要で高速）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="28-高度なページテーブル第20章-advanced-page-tables" tabIndex={-1}>
                    2.8 高度なページテーブル（第20章 Advanced Page Tables）
                </h3>
                <p>
                    単純な線形ページテーブルはサイズが大きすぎるため、実用上は以下の工夫が必要です。
                </p>
                <Diagram id="diag-22" />

                <p>
                    多階層ページテーブルは、x86-64の4段（PML4→PDPT→PD→PT）や、ARM64の複数レベル構成として実際のOSで広く採用されています。トレードオフとして、TLBミス時に複数回のメモリアクセス（ページテーブルウォーク）が必要になる点が挙げられます。
                </p>
                <h3 id="29-スワッピングメカニズム第21章-beyond-physical-memory-mechanisms" tabIndex={-1}>
                    2.9 スワッピング：メカニズム（第21章 Beyond Physical Memory: Mechanisms）
                </h3>
                <p>
                    物理メモリの総量を超えるアドレス空間を扱うため、OSはページの一部をディスク（スワップ領域）へ退避させる<strong>スワッピング（swapping）</strong>を行います。
                </p>
                <Diagram id="diag-23" />

                <p>
                    <strong>ページフォールト（page fault）</strong>は例外の一種で、ハードウェアが検出し、OSのページフォールトハンドラが処理を担当します。ページがメモリ上に存在しない場合、ディスクI/Oが発生するためレイテンシが大きく（ミリ秒オーダー）、他のプロセスへ切り替えて待ち時間を有効活用するのが一般的です。
                </p>
                <h3 id="210-スワッピングポリシー第22章-beyond-physical-memory-policies" tabIndex={-1}>
                    2.10 スワッピング：ポリシー（第22章 Beyond Physical Memory: Policies）
                </h3>
                <p>
                    物理メモリが枯渇した際、どのページを追い出す（evict）かを決めるのがページ置換ポリシーです。
                </p>
                <Diagram id="diag-24" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Beladyの異常（Belady&apos;s Anomaly）</td>
                                <td>
                                    FIFOではキャッシュ（メモリ）を増やしたのにミス率が悪化する場合がある現象
                                </td>
                            </tr>
                            <tr className="even">
                                <td>サッシング（thrashing）</td>
                                <td>
                                    ワーキングセットが物理メモリに収まらず、ページフォールトが頻発して性能が急落する状態
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                理論上最適なOPTアルゴリズムを「ものさし」として、FIFO・LRU・近似LRUの性能を比較する、という原著の学習フレームを意識する。実装不可能な理想を知ることで、現実的なアルゴリズムの評価軸が明確になる。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="211-完全なvmシステム第23章-complete-virtual-memory-systems" tabIndex={-1}>
                    2.11 完全なVMシステム（第23章 Complete Virtual Memory Systems）
                </h3>
                <p>
                    原著はDEC
                    VAX/VMSと現代のLinuxを例に、実システムがこれまでの理論をどう統合しているかを解説します。
                </p>
                <Diagram id="diag-25" />

                <p>
                    <strong>Copy-on-Write（COW）</strong>は、<code>fork()</code>直後に親子のアドレス空間を物理的にコピーせず、書き込みが発生した時点で初めて実ページを複製する最適化です。読み取り専用アクセスが大半を占める実際のワークロードにおいて、大幅な性能改善をもたらします。
                </p>
                <h3 id="212-メモリ仮想化のまとめ第24章" tabIndex={-1}>2.12 メモリ仮想化のまとめ（第24章）</h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">章</th>
                                <th scope="col">テーマ</th>
                                <th scope="col">一言まとめ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>13</td>
                                <td>アドレス空間</td>
                                <td>プロセスごとの独立したメモリ幻想</td>
                            </tr>
                            <tr className="even">
                                <td>14</td>
                                <td>メモリAPI</td>
                                <td>malloc/freeとよくあるバグ</td>
                            </tr>
                            <tr className="odd">
                                <td>15</td>
                                <td>アドレス変換</td>
                                <td>ベース＆バウンドによる動的リロケーション</td>
                            </tr>
                            <tr className="even">
                                <td>16</td>
                                <td>セグメンテーション</td>
                                <td>論理単位でのアドレス空間分割</td>
                            </tr>
                            <tr className="odd">
                                <td>17</td>
                                <td>空き領域管理</td>
                                <td>First/Best/Worst Fit、Buddy System</td>
                            </tr>
                            <tr className="even">
                                <td>18</td>
                                <td>ページング</td>
                                <td>固定長ページによる外部フラグメンテーション解消</td>
                            </tr>
                            <tr className="odd">
                                <td>19</td>
                                <td>TLB</td>
                                <td>アドレス変換のハードウェアキャッシュ</td>
                            </tr>
                            <tr className="even">
                                <td>20</td>
                                <td>高度なページテーブル</td>
                                <td>多階層・逆ページテーブル</td>
                            </tr>
                            <tr className="odd">
                                <td>21</td>
                                <td>スワッピング：メカニズム</td>
                                <td>ページフォールトとディスクI/O</td>
                            </tr>
                            <tr className="even">
                                <td>22</td>
                                <td>スワッピング：ポリシー</td>
                                <td>FIFO/LRU/クロックアルゴリズム</td>
                            </tr>
                            <tr className="odd">
                                <td>23</td>
                                <td>完全なVMシステム</td>
                                <td>VAX/VMSとLinuxの実装統合</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                <h2 id="第3部並行性第2534章" tabIndex={-1}>第3部：並行性（第25〜34章）</h2>
                <h3 id="31-スレッドと並行性の導入第26章-concurrency-and-threads" tabIndex={-1}>
                    3.1 スレッドと並行性の導入（第26章 Concurrency and Threads）
                </h3>
                <p>
                    <strong>スレッド（thread）</strong>は、1つのプロセス内に複数の独立した実行の流れを持たせるための仕組みです。プロセスとの違いを整理しておきましょう。
                </p>
                <Diagram id="diag-26" />

                <p>
                    複数プロセスに分割する場合と異なり、スレッド間ではアドレス空間（特にヒープ上のデータ）を直接共有できるため、プロセス間通信（IPC）のコストなしにデータをやり取りできます。一方で、この「共有」こそが並行性バグの温床にもなります。
                </p>
                <p>
                    <strong>レースコンディション（race condition）</strong>とは、複数のスレッドが共有データに同時アクセスし、実行順序によって結果が変わってしまう現象です。共有変数へのアクセスを含むコード区間を<strong>クリティカルセクション（critical section）</strong>と呼び、これを保護する性質を<strong>相互排他（mutual exclusion）</strong>と呼びます。
                </p>
                <h3 id="32-スレッドapi第27章-thread-api" tabIndex={-1}>3.2 スレッドAPI（第27章 Thread API）</h3>
                <p>POSIXスレッド（Pthreads）の主要APIです。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">API</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>pthread_create()</code></td>
                                <td>新しいスレッドを生成し、指定した関数の実行を開始する</td>
                            </tr>
                            <tr className="even">
                                <td><code>pthread_join()</code></td>
                                <td>指定したスレッドの終了を待つ</td>
                            </tr>
                            <tr className="odd">
                                <td><code>pthread_mutex_lock/unlock()</code></td>
                                <td>ロックの獲得・解放</td>
                            </tr>
                            <tr className="even">
                                <td><code>pthread_cond_wait/signal()</code></td>
                                <td>条件変数を使った待機・通知</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                スレッド関連のバグは「毎回起きるわけではない」タイミング依存性を持つため再現が難しい。原著は「常にコードをレビューし、ロックの獲得順序を統一する」といった規律ある習慣の重要性を強調している。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="33-ロック第28章-locks" tabIndex={-1}>3.3 ロック（第28章 Locks）</h3>
                <p>
                    ロックは相互排他を実現するための基本的な同期プリミティブです。理想的なロックは以下の性質を満たします。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">評価基準</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>正確性（correctness）</td>
                                <td>相互排他を保証すること</td>
                            </tr>
                            <tr className="even">
                                <td>公平性（fairness）</td>
                                <td>各スレッドが飢餓状態にならず、いずれロックを獲得できること</td>
                            </tr>
                            <tr className="odd">
                                <td>性能（performance）</td>
                                <td>ロック獲得・解放のオーバーヘッドが小さいこと</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-27" />

                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                スピンロックは「待ち時間が極めて短い」ケースでは高速だが、待ち時間が長くなるとCPUサイクルを浪費し続けるため、実用システムでは「まず少しスピンし、それでもダメならOSにブロッキングを依頼する」といったハイブリッド方式（Linuxのfutexなど）が採用される。この段階的な設計思想を押さえる。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="34-ロックを使ったデータ構造第29章-lock-based-concurrent-data-structures" tabIndex={-1}>
                    3.4 ロックを使ったデータ構造（第29章 Lock-based Concurrent Data Structures）
                </h3>
                <p>
                    既存のシーケンシャルなデータ構造にロックを追加し、スレッドセーフにする際の設計指針を整理します。
                </p>
                <Diagram id="diag-28" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">データ構造</th>
                                <th scope="col">並行化の工夫</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>カウンタ</td>
                                <td>
                                    近似カウンタ（sloppy
                                    counter）でCPUごとにローカルカウンタを持ち、定期的にグローバルへ同期する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>連結リスト</td>
                                <td>
                                    ハンド・オーバー・ハンド・ロッキング（各ノードごとにロック）で並行度を高める
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>キュー</td>
                                <td>
                                    先頭用と末尾用に別々のロックを用意する（Michael &amp; Scott
                                    Queue）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ハッシュテーブル</td>
                                <td>バケットごとに独立したロックを持たせる</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="35-条件変数第30章-condition-variables" tabIndex={-1}>
                    3.5 条件変数（第30章 Condition Variables）
                </h3>
                <p>
                    ロックだけでは「あるスレッドが特定の条件が満たされるまで待つ」というパターンを効率よく実現できません。<strong>条件変数（condition variable）</strong>は、この「待機と通知」を扱うための同期プリミティブです。
                </p>
                <Diagram id="diag-29" />

                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                <code>if</code>文ではなく<strong>必ず<code>while</code>文で条件を再チェックする</strong>こと（Mesa流セマンティクス）。<code>signal</code>から復帰した時点で条件が本当に満たされているとは限らない（他のスレッドが先にバッファを空にしてしまう可能性がある）ため、必須のイディオムとなる。
                            </li>{' '}
                            <li>
                                Producer/Consumerパターンはマルチスレッドプログラミングの最頻出パターンであり、原著のコード例を実際に書いて動かすことを強く推奨する。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="36-セマフォ第31章-semaphores" tabIndex={-1}>3.6 セマフォ（第31章 Semaphores）</h3>
                <p>
                    <strong>セマフォ（semaphore）</strong>は、整数値のカウンタと2つの操作（<code>sem_wait()</code>/<code>sem_post()</code>、歴史的にはP操作/V操作）から構成される汎用的な同期プリミティブで、ロックと条件変数の両方の役割を1つの構造体で表現できます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用途</th>
                                <th scope="col">初期値</th>
                                <th scope="col">使い方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>バイナリセマフォ（ロック代替）</td>
                                <td>1</td>
                                <td>相互排他を実現</td>
                            </tr>
                            <tr className="even">
                                <td>順序制御</td>
                                <td>0</td>
                                <td>あるスレッドが完了するまで別スレッドを待たせる</td>
                            </tr>
                            <tr className="odd">
                                <td>資源カウンタ</td>
                                <td>N</td>
                                <td>同時にアクセスできるスレッド数をN個に制限する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-30" />

                <h3 id="37-並行性バグ第32章-concurrency-bugs" tabIndex={-1}>
                    3.7 並行性バグ（第32章 Concurrency Bugs）
                </h3>
                <p>
                    実システム（MySQL・Apache・OpenOfficeなど）を対象にした研究に基づき、原著は並行性バグを2種類に分類します。
                </p>
                <Diagram id="diag-31" />

                <p>
                    <strong>デッドロック（deadlock）</strong>が発生するには、以下の4条件がすべて同時に成立する必要があります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">条件</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>相互排他（mutual exclusion）</td>
                                <td>資源は同時に1スレッドしか保持できない</td>
                            </tr>
                            <tr className="even">
                                <td>保持と待機（hold-and-wait）</td>
                                <td>資源を保持したまま別の資源を待つ</td>
                            </tr>
                            <tr className="odd">
                                <td>横取り不可（no preemption）</td>
                                <td>資源は保持者が自発的に解放するまで奪えない</td>
                            </tr>
                            <tr className="even">
                                <td>循環待機（circular wait）</td>
                                <td>スレッド同士が環状に互いの資源を待つ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-32" />

                <p><strong>デッドロックへの対処法</strong></p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">アプローチ</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>回避（prevention）</td>
                                <td>
                                    4条件のいずれかを崩す設計にする（例：ロック取得順序を全体で統一する）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>検出と回復（detection &amp; recovery）</td>
                                <td>
                                    定期的にデッドロックを検出し、必要ならプロセスを強制終了する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>回避（avoidance、スケジューラレベル）</td>
                                <td>
                                    資源要求を事前に把握し、デッドロックに陥らないようスケジューリングする（銀行家のアルゴリズム等）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>無視（ignore）</td>
                                <td>
                                    現実的な発生頻度の低さから「ダチョウのアルゴリズム」として無視する（多くのOSが採用）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="38-イベントベース並行性第33章-event-based-concurrency" tabIndex={-1}>
                    3.8 イベントベース並行性（第33章 Event-based Concurrency）
                </h3>
                <p>
                    スレッドを使わずに並行性を実現するアプローチとして、<strong>イベントベース並行性（event-based concurrency）</strong>があります。
                </p>
                <Diagram id="diag-33" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較軸</th>
                                <th scope="col">マルチスレッド</th>
                                <th scope="col">イベントベース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>並行処理の単位</td>
                                <td>OSスレッド</td>
                                <td>単一スレッドのイベントループ</td>
                            </tr>
                            <tr className="even">
                                <td>ロックの必要性</td>
                                <td>必要（共有状態の保護）</td>
                                <td>基本的に不要（シングルスレッドのため）</td>
                            </tr>
                            <tr className="odd">
                                <td>ブロッキングI/Oの扱い</td>
                                <td>各スレッドが個別にブロックしてもOK</td>
                                <td>非同期I/O（あるいは別スレッドプールへのオフロード）が必須</td>
                            </tr>
                            <tr className="even">
                                <td>マルチコア活用</td>
                                <td>容易</td>
                                <td>単純な実装では困難（工夫が必要）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                Node.jsのイベントループ、Nginxのワーカープロセス、Redisのシングルスレッド設計など、現代の高性能サーバーの多くがこのモデルを採用している。「なぜロックを使わずに高い並行性を実現できるのか」を、本章の内容と結びつけて理解しておくと実務での技術選定に役立つ。
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 id="39-並行性のまとめ第34章" tabIndex={-1}>3.9 並行性のまとめ（第34章）</h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">章</th>
                                <th scope="col">テーマ</th>
                                <th scope="col">一言まとめ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>26</td>
                                <td>スレッドと並行性</td>
                                <td>共有アドレス空間を持つ複数の実行フロー</td>
                            </tr>
                            <tr className="even">
                                <td>27</td>
                                <td>スレッドAPI</td>
                                <td>pthread_create/join/mutex</td>
                            </tr>
                            <tr className="odd">
                                <td>28</td>
                                <td>ロック</td>
                                <td>スピンロックからfutexまでの進化</td>
                            </tr>
                            <tr className="even">
                                <td>29</td>
                                <td>ロックを使ったデータ構造</td>
                                <td>粗粒度から細粒度へ</td>
                            </tr>
                            <tr className="odd">
                                <td>30</td>
                                <td>条件変数</td>
                                <td>待機と通知、while文での再チェック</td>
                            </tr>
                            <tr className="even">
                                <td>31</td>
                                <td>セマフォ</td>
                                <td>ロックと条件制御を統一的に扱う</td>
                            </tr>
                            <tr className="odd">
                                <td>32</td>
                                <td>並行性バグ</td>
                                <td>デッドロックの4条件と対処法</td>
                            </tr>
                            <tr className="even">
                                <td>33</td>
                                <td>イベントベース並行性</td>
                                <td>ロック不要の単一スレッドモデル</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                <h2 id="第4部永続性第3551章" tabIndex={-1}>第4部：永続性（第35〜51章）</h2>
                <h3 id="41-ioデバイス第36章-io-devices" tabIndex={-1}>4.1 I/Oデバイス（第36章 I/O Devices）</h3>
                <p>
                    OSはCPU・メモリだけでなく、多種多様なI/Oデバイスも抽象化して扱う必要があります。
                </p>
                <Diagram id="diag-34" />

                <Diagram id="diag-35" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">内容</th>
                                <th scope="col">トレードオフ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ポーリング（polling）</td>
                                <td>OSがステータスレジスタを繰り返し確認する</td>
                                <td>実装は単純だがCPUを浪費する</td>
                            </tr>
                            <tr className="even">
                                <td>割り込み（interrupt）</td>
                                <td>デバイス側から完了を通知し、CPUは他の処理を続けられる</td>
                                <td>
                                    割り込みハンドラのオーバーヘッドがある。高頻度I/Oでは逆に非効率（割り込み駆動とポーリングを組み合わせるハイブリッド方式も使われる）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>DMA（Direct Memory Access）</td>
                                <td>
                                    専用コントローラがCPUを介さずメモリとデバイス間でデータ転送する
                                </td>
                                <td>大量データ転送時のCPU負荷を大幅に削減</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="42-ハードディスクドライブ第37章-hard-disk-drives" tabIndex={-1}>
                    4.2 ハードディスクドライブ（第37章 Hard Disk Drives）
                </h3>
                <p>
                    HDDは、回転するプラッタ（platter）上をヘッド（head）が移動してデータを読み書きする機械的なデバイスです。
                </p>
                <Diagram id="diag-36" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ディスクスケジューリングアルゴリズム</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SSTF（Shortest Seek Time First）</td>
                                <td>現在位置から最も近いリクエストを優先</td>
                            </tr>
                            <tr className="even">
                                <td>SCAN（エレベーターアルゴリズム）</td>
                                <td>
                                    ヘッドを一方向に動かしながら通過順にリクエストを処理し、端に達したら折り返す
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>C-SCAN</td>
                                <td>
                                    一方向のみ処理し、端に達したら先頭に戻って再度同方向に処理する（待ち時間の公平性を改善）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <p>
                            機械的なシーク・回転待ちのコストが支配的であるという性質から、「ランダムI/OよりシーケンシャルI/Oが圧倒的に高速」というHDDの特性を理解する。この特性が、後述のFFSやログ構造化ファイルシステムの設計動機に直結する。
                        </p>
                    </div>
                </div>
                <h3 id="43-raid第38章-redundant-arrays-of-inexpensive-disks" tabIndex={-1}>
                    4.3 RAID（第38章 Redundant Arrays of Inexpensive Disks）
                </h3>
                <p>RAIDは複数の物理ディスクを束ね、性能・容量・信頼性を向上させる技術です。</p>
                <Diagram id="diag-37" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">RAIDレベル</th>
                                <th scope="col">容量効率(Nディスク時)</th>
                                <th scope="col">耐障害性</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>RAID 0</td>
                                <td>100%</td>
                                <td>なし</td>
                                <td>性能最優先、冗長性なし</td>
                            </tr>
                            <tr className="even">
                                <td>RAID 1</td>
                                <td>50%</td>
                                <td>1台の故障まで耐えられる</td>
                                <td>シンプルな複製</td>
                            </tr>
                            <tr className="odd">
                                <td>RAID 4</td>
                                <td>(N-1)/N</td>
                                <td>1台の故障まで耐えられる</td>
                                <td>パリティディスク集中でボトルネック化</td>
                            </tr>
                            <tr className="even">
                                <td>RAID 5</td>
                                <td>(N-1)/N</td>
                                <td>1台の故障まで耐えられる</td>
                                <td>パリティを分散し書き込み性能を改善</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    評価軸として、原著は常に「容量（capacity）」「信頼性（reliability）」「性能（performance）」の3つのトレードオフでRAIDレベルを比較する手法を採っています。
                </p>
                <h3 id="44-ファイルとディレクトリ第39章-files-and-directories" tabIndex={-1}>
                    4.4 ファイルとディレクトリ（第39章 Files and Directories）
                </h3>
                <p>ファイルシステムが提供する2つの基本抽象が「ファイル」と「ディレクトリ」です。</p>
                <Diagram id="diag-38" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">概念</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ファイルディスクリプタ</td>
                                <td>
                                    プロセスごとに管理される、開いているファイルへのハンドル（番号）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>オープンファイルテーブル</td>
                                <td>
                                    ファイルオフセットなど、開いている状態を保持するカーネル側の構造（プロセス間・ファイルディスクリプタ間で共有される場合がある）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ハードリンク</td>
                                <td>同一inodeを複数のファイル名で参照する仕組み</td>
                            </tr>
                            <tr className="even">
                                <td>シンボリックリンク</td>
                                <td>
                                    パス文字列を格納した別ファイル。参照先が消えると「壊れたリンク」になる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><code>fsync()</code></td>
                                <td>バッファキャッシュ上のデータを強制的にディスクへ書き出す</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="45-ファイルシステム実装第40章-file-system-implementation" tabIndex={-1}>
                    4.5 ファイルシステム実装（第40章 File System Implementation）
                </h3>
                <p>
                    原著は「VSFS（Very Simple File
                    System）」という教育用の簡略化したファイルシステムを題材に、実装の基本構造を解説します。
                </p>
                <Diagram id="diag-39" />

                <p>
                    ファイル読み込み・書き込みの際、実際には複数回のディスクI/O（ディレクトリの探索、inodeの読み込み、データブロックの読み書き、ビットマップの更新）が発生する、という具体的なI/Oパスの理解が本章の要点です。
                </p>
                <h3 id="46-高速化fast-file-system第41章-ffs" tabIndex={-1}>
                    4.6 高速化：Fast File System（第41章 FFS）
                </h3>
                <p>
                    初期のUNIXファイルシステムは、ディスク上にデータが分散配置されるため断片化に弱いという問題を抱えていました。<strong>FFS（Fast File System）</strong>はこれを改善するために「シリンダグループ（cylinder
                    group）」という考え方を導入しました。
                </p>
                <Diagram id="diag-40" />

                <p>
                    同一ディレクトリ内のファイルとそのinodeを近接するシリンダグループへ配置する「局所性を意識した配置ポリシー」により、シーク時間を削減しています。
                </p>
                <h3 id="47-クラッシュ一貫性fsckとジャーナリング第42章" tabIndex={-1}>
                    4.7 クラッシュ一貫性：FSCKとジャーナリング（第42章）
                </h3>
                <p>
                    複数ブロックの更新中に電源断が起きると、ファイルシステムの整合性が崩れる「クラッシュ一貫性問題（crash-consistency
                    problem）」が発生します。
                </p>
                <Diagram id="diag-41" />

                <Diagram id="diag-42" />

                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <p>
                            ジャーナリングは「なぜコミットブロックの書き込み順序が重要なのか」を理解することが核心。順序保証がないと、途中まで書かれたジャーナルを完了済みと誤認し、不完全な更新を実データへ反映してしまう危険がある。ext3/ext4のデータジャーナリング・順序付きジャーナリング・ライトバックジャーナリングという3モードの違いも押さえておくと良い。
                        </p>
                    </div>
                </div>
                <h3 id="48-ログ構造化ファイルシステム第43章-log-structured-file-system-lfs" tabIndex={-1}>
                    4.8 ログ構造化ファイルシステム（第43章 Log-structured File System, LFS）
                </h3>
                <p>
                    ジャーナリングが「更新をログにも書く」アプローチだったのに対し、LFSは発想を転換し「<strong>ディスクへのすべての書き込みをログの追記のみで完結させる</strong>」設計です。
                </p>
                <Diagram id="diag-43" />

                <p>
                    LFSは書き込みを常にシーケンシャルにすることで書き込み性能を最大化しますが、「どのデータブロックが最新か」を追跡するための<strong>インデックス構造（inode map）</strong>と、古くなったセグメントを回収する<strong>ガベージコレクション</strong>という追加の複雑さを引き受けています。
                </p>
                <h3 id="49-フラッシュベースssd第44章-flash-based-ssds" tabIndex={-1}>
                    4.9 フラッシュベースSSD（第44章 Flash-based SSDs）
                </h3>
                <p>
                    SSDはHDDと異なり機械可動部を持たず、NANDフラッシュメモリにデータを記録します。
                </p>
                <Diagram id="diag-44" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>FTL（Flash Translation Layer）</td>
                                <td>
                                    論理ブロックアドレスを物理NANDページへマッピングし、上書き不可制約を隠蔽するファームウェア層
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ウェアレベリング（wear leveling）</td>
                                <td>
                                    特定のブロックだけが消去回数の上限に達しないよう、書き込みをデバイス全体に分散させる技術
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ガベージコレクション</td>
                                <td>
                                    LFSと同様、無効になったページを回収し新たな消去済みブロックを確保する処理
                                </td>
                            </tr>
                            <tr className="even">
                                <td>TRIM/UNMAP</td>
                                <td>
                                    OSがファイル削除時にSSDへ「このブロックはもう不要」と通知し、ガベージコレクションを効率化する仕組み
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="410-データ整合性と保護第45章-data-integrity-and-protection" tabIndex={-1}>
                    4.10 データ整合性と保護（第45章 Data Integrity and Protection）
                </h3>
                <p>
                    ディスクやSSDは「静かなデータ破損（silent data corruption）」やビット腐敗（bit
                    rot）を起こす場合があり、これを検出・訂正する仕組みが必要です。
                </p>
                <Diagram id="diag-45" />

                <p>
                    ZFSやBtrfsなど現代のファイルシステムは、チェックサムをファイルシステム自体に統合し、RAIDと組み合わせて破損データの自動修復まで実現しています。
                </p>
                <h3 id="411-永続性ローカルファイルシステムのまとめ第46章" tabIndex={-1}>
                    4.11 永続性（ローカルファイルシステム）のまとめ（第46章）
                </h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">章</th>
                                <th scope="col">テーマ</th>
                                <th scope="col">一言まとめ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>36</td>
                                <td>I/Oデバイス</td>
                                <td>ポーリング・割り込み・DMA</td>
                            </tr>
                            <tr className="even">
                                <td>37</td>
                                <td>ハードディスク</td>
                                <td>シーク・回転待ち・シーケンシャルI/Oの優位性</td>
                            </tr>
                            <tr className="odd">
                                <td>38</td>
                                <td>RAID</td>
                                <td>容量・信頼性・性能のトレードオフ</td>
                            </tr>
                            <tr className="even">
                                <td>39</td>
                                <td>ファイルとディレクトリ</td>
                                <td>inodeとディレクトリの対応関係</td>
                            </tr>
                            <tr className="odd">
                                <td>40</td>
                                <td>ファイルシステム実装</td>
                                <td>VSFSによる基本構造の理解</td>
                            </tr>
                            <tr className="even">
                                <td>41</td>
                                <td>FFS</td>
                                <td>シリンダグループによる局所性配置</td>
                            </tr>
                            <tr className="odd">
                                <td>42</td>
                                <td>FSCK/ジャーナリング</td>
                                <td>クラッシュ一貫性の確保</td>
                            </tr>
                            <tr className="even">
                                <td>43</td>
                                <td>LFS</td>
                                <td>シーケンシャル追記書き込み</td>
                            </tr>
                            <tr className="odd">
                                <td>44</td>
                                <td>フラッシュSSD</td>
                                <td>FTL・ウェアレベリング</td>
                            </tr>
                            <tr className="even">
                                <td>45</td>
                                <td>データ整合性</td>
                                <td>チェックサムとスクラビング</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="412-分散システム入門第48章-distributed-systems" tabIndex={-1}>
                    4.12 分散システム入門（第48章 Distributed Systems）
                </h3>
                <p>
                    原著の永続性パートは、単一マシンのストレージから、ネットワーク越しの分散ストレージへと発展します。分散システム特有の課題として、<strong>通信の失敗（信頼できないネットワーク）</strong>が中心テーマになります。
                </p>
                <Diagram id="diag-46" />

                <p>
                    信頼性の低い通信の上に信頼できる通信を構築する手法として、原著は再送（retry）とタイムアウトを核とした基本パターンを解説します。
                </p>
                <h3 id="413-network-file-system第49章-nfs" tabIndex={-1}>
                    4.13 Network File System（第49章 NFS）
                </h3>
                <p>
                    NFSはSun
                    Microsystemsが開発した、UNIXの初期から広く使われてきた分散ファイルシステムです。
                </p>
                <Diagram id="diag-47" />

                <p>
                    NFS（<strong>NFSv2/v3</strong>）の設計で特に重要なのが<strong>サーバーステートレス性（server statelessness）</strong>という考え方です。サーバーはクライアントごとの状態を保持しないため、サーバークラッシュ後の復旧が単純になりますが、キャッシュ一貫性の保証は弱くなります（<code>close-to-open</code>セマンティクスなどで妥協）。一方<strong>NFSv4はステートフル</strong>で、オープン状態・ロック・セッションをサーバーが管理します。そのため復旧はクライアントとのステート回復手続きを伴い、v3のような「再送するだけで済む」単純さは失われます。一貫性については<strong>デリゲーション（delegation）</strong>により強められますが、これはサーバーが任意に付与する省略可能な機能であり、他クライアントからの競合アクセスが発生すればサーバーがリコール（recall）して取り消します。デリゲーションが付与されない場合や取り消された後は、v3と同様にクライアントキャッシュと<code>close-to-open</code>セマンティクスに依存します。したがって複数クライアントから直列化されたアクセスが必要なアプリケーションは、プロトコルの一貫性モデルに頼らず、明示的にロックを取得する必要があります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">概念</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ステートレスプロトコル（NFSv2/v3）</td>
                                <td>
                                    各要求が単独で完結し、サーバーはクライアントの状態を記憶しない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ステートフルプロトコル（NFSv4）</td>
                                <td>
                                    オープン・ロック・セッションをサーバーが保持し、復旧時はステート回復手続きを行う
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>べき等性（idempotency）</td>
                                <td>
                                    同じ要求を複数回送っても結果が変わらない設計にすることで、再送による不整合を防ぐ（ステートレスなv2/v3の再送戦略の前提）。ただしv2/v3の全操作がべき等なわけではなく、<code>CREATE</code>（排他モード）や<code>REMOVE</code>、<code>RENAME</code>のような非べき等操作が存在する。安全な再送は、サーバー側の重複要求キャッシュ（DRC:
                                    duplicate request
                                    cache）による重複検出と、操作ごとのセマンティクスに依存する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="414-andrew-file-system第50章-afs" tabIndex={-1}>4.14 Andrew File System（第50章 AFS）</h3>
                <p>
                    AFSはNFSとは対照的な設計思想を持つ分散ファイルシステムで、<strong>クライアント側の全ファイルキャッシュ</strong>を重視しました。
                </p>
                <Diagram id="diag-48" />

                <p>
                    AFSは<strong>コールバック（callback）</strong>という仕組みで、サーバーがキャッシュの無効化をクライアントへ能動的に通知します。これにより、NFSよりもサーバー負荷を抑えつつキャッシュ一貫性を高めています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較軸</th>
                                <th scope="col">NFSv2/v3</th>
                                <th scope="col">NFSv4</th>
                                <th scope="col">AFS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>設計思想</td>
                                <td>サーバーステートレス（ロックはNLMなど別プロトコルが担当）</td>
                                <td>
                                    ステートフル（オープン・ロック・セッションをサーバーが保持）
                                </td>
                                <td>クライアントキャッシュ重視、サーバーはステートを保持</td>
                            </tr>
                            <tr className="even">
                                <td>キャッシュ単位</td>
                                <td>ブロック単位（クライアントキャッシュはあるが弱い一貫性）</td>
                                <td>
                                    ブロック単位。デリゲーション付与時のみ一貫性を強められるが、競合時にはリコールされる
                                </td>
                                <td>ファイル全体を丸ごとローカルキャッシュ</td>
                            </tr>
                            <tr className="odd">
                                <td>障害復旧</td>
                                <td>
                                    べき等な操作の再送が基本（非べき等操作は重複要求キャッシュで補う）
                                </td>
                                <td>
                                    猶予期間中にクライアントがオープン・ロックのステートを回復する手続きが必要
                                </td>
                                <td>サーバー再起動後にコールバックを張り直す</td>
                            </tr>
                            <tr className="even">
                                <td>スケーラビリティ</td>
                                <td>サーバー負荷が高くなりがち</td>
                                <td>サーバー負荷はv3同様に高いが、COMPOUND操作でRTTを削減できる</td>
                                <td>コールバックによりサーバー負荷を抑制、大規模環境向け</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="415-分散ストレージのまとめ第51章" tabIndex={-1}>4.15 分散ストレージのまとめ（第51章）</h3>
                <p>
                    分散ファイルシステムの学習を通じて、単一マシンの永続性（クラッシュ一貫性）の議論が、ネットワーク越しの複数マシン間の一貫性という、より大きな分散システムの問題領域へと接続していくことを意識してください。この先には、DDIA（Designing
                    Data-Intensive Applications）やGoogle
                    SREのような、より発展的な分散システムの教科書が待っています。
                </p>
                <hr />

                <h2 id="第5部セキュリティ第5257章web版限定の追加章" tabIndex={-1}>
                    第5部：セキュリティ（第52〜57章、Web版限定の追加章）
                </h2>
                <p>
                    この章群は2020年7月にPeter
                    Reiher（UCLA）によって新たに追加され、原著サイトのみで公開されています（印刷版・電子書籍PDF版には未収録）。他のパートと異なり比較的新しい章のため、章末の宿題シミュレータは用意されていません。
                </p>
                <Diagram id="diag-49" />

                <h3 id="51-セキュリティ入門第53章" tabIndex={-1}>5.1 セキュリティ入門（第53章）</h3>
                <p>
                    セキュリティの議論はまず「何から何を守るのか」という<strong>脅威モデル（threat model）</strong>を定義することから始まります。OSの文脈では、悪意あるプログラムからの他プロセス保護、悪意あるユーザーからの他ユーザー保護、そしてOSカーネル自体への攻撃（権限昇格）が主な脅威です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">概念</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>CIA triad</td>
                                <td>
                                    機密性（Confidentiality）・完全性（Integrity）・可用性（Availability）というセキュリティの3要素
                                </td>
                            </tr>
                            <tr className="even">
                                <td>攻撃対象領域（attack surface）</td>
                                <td>
                                    攻撃者が悪用できるシステムの入り口（システムコール、ネットワークポートなど）の総体
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>最小権限の原則（principle of least privilege）</td>
                                <td>主体には必要最小限の権限のみを与える設計思想</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="52-認証第54章-authentication" tabIndex={-1}>5.2 認証（第54章 Authentication）</h3>
                <p>認証は「あなたは誰か」を確認するプロセスです。</p>
                <Diagram id="diag-50" />

                <p>
                    パスワード認証の実装では、平文保存を避けるために<strong>ソルト付きハッシュ（salted hash）</strong>を使う、というのが実務上の要点です。ソルトはレインボーテーブル攻撃（事前計算済みハッシュ表による総当たり攻撃）を無効化します。ただしソルトだけでは総当たり自体の速度を落とせないため、ハッシュ関数にはSHA-256のような高速ハッシュではなく、<strong>Argon2id・scrypt・bcrypt・PBKDF2といった意図的に低速なパスワードKDF</strong>を、十分なワークファクタ（メモリ量・反復回数）とともに用いる必要があります。
                </p>
                <h3 id="53-アクセス制御第55章-access-control" tabIndex={-1}>
                    5.3 アクセス制御（第55章 Access Control）
                </h3>
                <p>
                    「認証（誰であるか）」で本人確認をした後、「その主体が何をしてよいか」を管理するのがアクセス制御です。
                </p>
                <Diagram id="diag-51" />

                <p>
                    UNIX系OSのファイルパーミッション（<code>rwx</code>、所有者/グループ/その他）は、簡略化されたACLの一種と捉えることができます。
                </p>
                <p>
                    <strong>TOCTTOU攻撃（Time-Of-Check-To-Time-Of-Use）</strong>は、権限チェックの時点と実際の利用の時点の間に時間差があることを悪用する攻撃で、原著でも重要な事例として取り上げられています。
                </p>
                <h3 id="54-暗号第56章-cryptography" tabIndex={-1}>5.4 暗号（第56章 Cryptography）</h3>
                <p>OSセキュリティにおける暗号技術の基礎を整理します。</p>
                <Diagram id="diag-52" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用途</th>
                                <th scope="col">使う技術</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>大容量データの暗号化</td>
                                <td>対称鍵暗号（高速）</td>
                            </tr>
                            <tr className="even">
                                <td>鍵交換・デジタル署名</td>
                                <td>公開鍵暗号（低速だが鍵配送問題を解決）</td>
                            </tr>
                            <tr className="odd">
                                <td>データの完全性検証、パスワード保存</td>
                                <td>暗号学的ハッシュ関数</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="55-分散システムのセキュリティ第57章" tabIndex={-1}>
                    5.5 分散システムのセキュリティ（第57章）
                </h3>
                <p>
                    分散環境では、ネットワークの盗聴・改ざん・なりすましといった追加の脅威に対処する必要があります。<strong>TLS</strong>による通信路の暗号化、証明書によるサーバー認証、Kerberosのようなチケットベース認証プロトコルなどが代表例として扱われます。なお実装時に使用してよいのは<strong>TLS 1.2以降</strong>であり、<strong>SSLv2・SSLv3・TLS 1.0・TLS
                        1.1は脆弱性が確認され非推奨化されているため使用してはいけません</strong>。新規構成では<strong>TLS 1.3</strong>の採用を推奨します。
                </p>
                <hr />

                <h2 id="第6部付録とラボ課題" tabIndex={-1}>第6部：付録とラボ課題</h2>
                <h3 id="61-仮想マシンvirtual-machines付録" tabIndex={-1}>
                    6.1 仮想マシン（Virtual Machines、付録）
                </h3>
                <p>
                    OSがハードウェアを仮想化してプロセスに提供するのと同様に、<strong>ハイパーバイザ（hypervisor）</strong>はハードウェア全体を仮想化して、その上で複数のOS（ゲストOS）を動作させます。
                </p>
                <Diagram id="diag-53" />

                <p>
                    CPU仮想化・メモリ仮想化と同様、ハイパーバイザも「トラップ＆エミュレート（trap-and-emulate）」の考え方を応用しますが、ゲストOS自体が特権命令を発行しようとする点が課題となり、準仮想化（paravirtualization）やハードウェア支援仮想化（Intel
                    VT-x/AMD-Vなど）といった解決策が発展してきました。
                </p>
                <h3 id="62-モニタmonitors付録" tabIndex={-1}>6.2 モニタ（Monitors、付録）</h3>
                <p>
                    <strong>モニタ（monitor）</strong>は、ロックと条件変数を統合した、より高水準な並行処理の抽象化です。Javaの<code>synchronized</code>キーワードはモニタの考え方を言語機能として直接サポートした例です。
                </p>
                <h3 id="63-ラボチュートリアルとプロジェクト課題" tabIndex={-1}>
                    6.3 ラボチュートリアルとプロジェクト課題
                </h3>
                <p>原著は座学だけでなく、実際に手を動かすラボ課題を重視しています。</p>
                <Diagram id="diag-54" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">リポジトリ</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>remzi-arpacidusseau/ostep-code</code></td>
                                <td>本文中で紹介されるコード例</td>
                            </tr>
                            <tr className="even">
                                <td><code>remzi-arpacidusseau/ostep-homework</code></td>
                                <td>章末の宿題用シミュレータ（Python）</td>
                            </tr>
                            <tr className="odd">
                                <td><code>remzi-arpacidusseau/ostep-projects</code></td>
                                <td>
                                    C言語ベースの初期ユーティリティ・xv6ベースのプロジェクト課題
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>xv6との関係について</strong>：OSTEP自体のxv6ラボはWisconsin大学の授業に基づくものですが、xv6という教育用カーネル自体はMIT
                    PDOSグループ（Frans Kaashoek、Robert Morris、Russ
                    Coxら）が開発したものです。現在はMITの授業「6.1810（Operating System
                    Engineering、旧称6.828/6.S081）」がRISC-V版xv6（<code>xv6-riscv</code>）の開発元として最新版を公開しており、多くの大学がOSTEPの概念パートとxv6の実装パートを組み合わせてOS入門コースを構成しています。
                </p>
                <hr />

                <h2 id="第7部2026年8月時点の最新動向とostepの学び方" tabIndex={-1}>
                    第7部：2026年8月時点の最新動向とOSTEPの学び方
                </h2>
                <p>
                    OSTEP本体は2023年11月にバージョン1.10へ小規模な改訂が行われて以降、大きな内容変更はなく安定しています（誤字修正など細かなメンテナンスは<code>ostep-typos</code>リポジトリで継続的に管理）。教科書としての完成度は高い一方、刊行から日が浅くない章もあるため、2026年時点で学ぶ際は以下の最新動向と関連づけると理解が深まります。
                </p>
                <Diagram id="diag-55" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">OSTEPの章</th>
                                <th scope="col">2026年時点で押さえておきたい関連動向</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>第7〜9章（CPUスケジューリング全般）</td>
                                <td>
                                    LinuxのCPUスケジューラは、<strong>Linux 6.6でマージされたEEVDF（Earliest Eligible Virtual
                                        Deadline First、Peter Zijlstra氏らが開発）</strong>により、CFS（Completely Fair
                                    Scheduler）からの移行が始まっている。EEVDFはCFSのコード基盤（<code>sched_fair</code>）を引き継ぎながら選択アルゴリズムを置き換えるもので、その後のリリースでも継続的に調整が加えられている段階的な移行である。さらに<strong>Linux 6.12でマージされたsched_ext</strong>（eBPFベースのプラガブルスケジューラ基盤）により、MLFQやくじ引きスケジューリングに近い独自ポリシーをカーネル再コンパイルなしに実験できる時代になった
                                </td>
                            </tr>
                            <tr className="even">
                                <td>第26〜34章（並行性全般）</td>
                                <td>
                                    Node.js・Nginx・Redisなどのイベントベースアーキテクチャに加え、Linuxの<code>io_uring</code>（Jens
                                    Axboe氏が開発）が「システムコールのオーバーヘッドを避けつつ真の非同期I/Oを実現する」次世代インターフェースとして普及が進んでいる。第33章の<code>select</code>/<code>poll</code>/<code>epoll</code>の発展形として位置づけて学ぶと理解しやすい
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>第37章・第44章（HDD・SSD）</td>
                                <td>
                                    データセンターではレイテンシが重要なワークロードを中心にNVMe接続のSSDの採用が進む一方、大容量ストレージではHDDが依然として広く使われており、原著が前提とする「回転待ち・シーク時間が支配的」なHDDの特性は今も現実の制約として残っている。また「シーケンシャルI/O優位」の教訓自体はSSD/NVMeでも（消去単位の制約という形で）形を変えて生き続けている
                                </td>
                            </tr>
                            <tr className="even">
                                <td>第42〜43章（クラッシュ一貫性）</td>
                                <td>
                                    ZFS・Btrfs・(Windows)ReFSのようなチェックサム内蔵型・Copy-on-Writeファイルシステムが一般化し、原著のFSCK/ジャーナリングの議論は「なぜCoW設計が求められるようになったか」の前提知識として活きる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>全体（低レイヤーの実装言語）</td>
                                <td>
                                    Linuxカーネルの<strong>Rust for Linux</strong>は、2025年12月10日の合意によって「実験的（experimental）」という位置づけを終えた。一方で採用範囲の拡大には別の制約が残っており、Rustツールチェーンが対応していないアーキテクチャではRustコードをビルドできないため、対応アーキテクチャとツールチェーンの整備状況が実際の適用範囲を左右する。C言語中心だったOS実装の世界にメモリ安全な言語を取り入れる動きは、OSTEPが前提とするC言語ベースの実装モデルへの補完的な視点として押さえておく価値がある
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="71-コミュニティでの学習リソース2026年" tabIndex={-1}>
                    7.1 コミュニティでの学習リソース（2026年）
                </h3>
                <p>
                    OSTEPは刊行から10年以上経った現在も、世界中の開発者コミュニティで継続的に読まれ続けています。
                </p>
                <ul>
                    <li>
                        <strong>Software Internals Book Club</strong>（主催: Phil
                        Eaton氏、データベース・分散システム分野で著名なエンジニア/ブロガー）は2026年1月から12月にかけて、OSTEP全51章（セキュリティ章を除く）を毎週1〜2章ずつ読み進める輪読会を実施しており、2026年8月28日時点で第32章（並行性バグ）まで進行している。国際的な参加者（LinkedIn上のプロフィールが公開されている限りでも欧州・北米・アジア各地の実務エンジニア）が議論に加わっている
                    </li>{' '}
                    <li>
                        <strong>MIT 6.1810（Operating System Engineering）</strong>は毎年秋学期に開講され、xv6-riscvを使った実装課題を提供し続けている。2026年時点でも<code>xv6-riscv</code>・<code>xv6-riscv-book</code>リポジトリはMIT
                        PDOSグループにより保守されている
                    </li>{' '}
                    <li>
                        <strong>OSSU（Open Source Society University）</strong>のカリキュラムでも、OSTEPは「自習可能な最良のOS入門コース」として引き続き推薦されている
                    </li>{' '}
                    <li>
                        GitHub上では<code>ostep</code>トピックタグの付いたリポジトリが継続的に更新されており、学習者による宿題・プロジェクトの実装例、読書メモが日々公開されている
                    </li>
                </ul>
                <div className="callout-practice">
                    <div className="icon">✓</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <p>
                            OSTEPのような息の長い教科書は、原著本体は安定していても、周辺のコミュニティ活動（輪読会、実装例、講義資料）が学習のモチベーション維持と理解の深化に大きく貢献する。孤独に読み進めるのではなく、上記のような輪読会やオンラインコミュニティを積極的に活用することを推奨する。
                        </p>
                    </div>
                </div>
                <hr />

                <h2 id="学習ロードマップ" tabIndex={-1}>学習ロードマップ</h2>
                <p>
                    OSSU（Open Source Society
                    University）のOS入門コースは、OSTEPを使った学習に「ベースコース（約80時間）」と「拡張コース（200時間以上）」の2つの水準を提示しています。本ガイドではこれを踏まえ、以下の3段階ロードマップを提案します。
                </p>
                <Diagram id="diag-56" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">段階</th>
                                <th scope="col">目安期間</th>
                                <th scope="col">到達目標</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Stage 0</td>
                                <td>1〜2週間</td>
                                <td>Cのポインタ・構造体・システムコール呼び出しに抵抗がない状態</td>
                            </tr>
                            <tr className="even">
                                <td>Stage 1</td>
                                <td>2〜3ヶ月（週5〜8時間）</td>
                                <td>仮想化・並行性・永続性の基本概念をすべて説明できる状態</td>
                            </tr>
                            <tr className="odd">
                                <td>Stage 2</td>
                                <td>3〜6ヶ月（週5〜10時間）</td>
                                <td>xv6のソースを読み、簡単な機能追加ができる状態</td>
                            </tr>
                            <tr className="even">
                                <td>Stage 3</td>
                                <td>継続的</td>
                                <td>
                                    実際のLinuxカーネルや大規模分散システムの設計判断を、OSTEPの概念で説明できる状態
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                <h2 id="学習チェックリスト" tabIndex={-1}>学習チェックリスト</h2>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="title">学習チェックリスト</span>{completedCount} / 17 完了
                    </div>
                    <ul>
                        <li>
                            <input id="chk1" type="checkbox" checked={Boolean(checkedItems['chk1'])} onChange={() => handleCheck('chk1')} /><label htmlFor="chk1">第0部：メカニズムとポリシーの違いを、自分の言葉で説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk2" type="checkbox" checked={Boolean(checkedItems['chk2'])} onChange={() => handleCheck('chk2')} /><label htmlFor="chk2">第0部：バッチ処理→マルチプログラミング→タイムシェアリングの歴史的必然性を理解した</label>
                        </li>{' '}
                        <li>
                            <input id="chk3" type="checkbox" checked={Boolean(checkedItems['chk3'])} onChange={() => handleCheck('chk3')} /><label htmlFor="chk3">第1部：<code>fork()</code>/<code>exec()</code>/<code>wait()</code>を使った簡単なCプログラムを自分で書いて動かした</label>
                        </li>{' '}
                        <li>
                            <input id="chk4" type="checkbox" checked={Boolean(checkedItems['chk4'])} onChange={() => handleCheck('chk4')} /><label htmlFor="chk4">第1部：制限付き直接実行における「trap」と「タイマー割り込み」の役割の違いを説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk5" type="checkbox" checked={Boolean(checkedItems['chk5'])} onChange={() => handleCheck('chk5')} /><label htmlFor="chk5">第1部：FIFO/SJF/STCF/RR/MLFQ/くじ引きスケジューリングの長所・短所を比較できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk6" type="checkbox" checked={Boolean(checkedItems['chk6'])} onChange={() => handleCheck('chk6')} /><label htmlFor="chk6">第2部：アドレス空間・セグメンテーション・ページングの発展の流れを図で説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk7" type="checkbox" checked={Boolean(checkedItems['chk7'])} onChange={() => handleCheck('chk7')} /><label htmlFor="chk7">第2部：TLBミス時に何が起きるかをステップごとに説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk8" type="checkbox" checked={Boolean(checkedItems['chk8'])} onChange={() => handleCheck('chk8')} /><label htmlFor="chk8">第2部：FIFO/LRU/クロックアルゴリズムのページ置換方針を比較できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk9" type="checkbox" checked={Boolean(checkedItems['chk9'])} onChange={() => handleCheck('chk9')} /><label htmlFor="chk9">第3部：レースコンディションが起きるコード例を自分で書き、ロックで修正できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk10" type="checkbox" checked={Boolean(checkedItems['chk10'])} onChange={() => handleCheck('chk10')} /><label htmlFor="chk10">第3部：条件変数を<code>while</code>文で使うべき理由を説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk11" type="checkbox" checked={Boolean(checkedItems['chk11'])} onChange={() => handleCheck('chk11')} /><label htmlFor="chk11">第3部：デッドロックの4条件をすべて挙げられる</label>
                        </li>{' '}
                        <li>
                            <input id="chk12" type="checkbox" checked={Boolean(checkedItems['chk12'])} onChange={() => handleCheck('chk12')} /><label htmlFor="chk12">第4部：HDDのシーク・回転待ちとRAIDレベルごとのトレードオフを説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk13" type="checkbox" checked={Boolean(checkedItems['chk13'])} onChange={() => handleCheck('chk13')} /><label htmlFor="chk13">第4部：ジャーナリングによってクラッシュ一貫性がどう保証されるかを説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk14" type="checkbox" checked={Boolean(checkedItems['chk14'])} onChange={() => handleCheck('chk14')} /><label htmlFor="chk14">第4部：NFSとAFSの設計思想の違い（ステートレス vs
                                キャッシュ重視）を説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk15" type="checkbox" checked={Boolean(checkedItems['chk15'])} onChange={() => handleCheck('chk15')} /><label htmlFor="chk15">第5部：認証・アクセス制御・暗号の役割の違いを説明できる</label>
                        </li>{' '}
                        <li>
                            <input id="chk16" type="checkbox" checked={Boolean(checkedItems['chk16'])} onChange={() => handleCheck('chk16')} /><label htmlFor="chk16">第6部：xv6-riscvのソースコードを一部読み、OSTEPの概念と対応づけられた</label>
                        </li>{' '}
                        <li>
                            <input id="chk17" type="checkbox" checked={Boolean(checkedItems['chk17'])} onChange={() => handleCheck('chk17')} /><label htmlFor="chk17">第7部：EEVDF/sched_ext/io_uringなど、OSTEPの概念が現代システムでどう発展しているか説明できる</label>
                        </li>
                    </ul>
                </div>
                <hr />

                <h2 id="用語集" tabIndex={-1}>用語集</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>メカニズム（Mechanism）</td>
                                <td>ある機能をどう実現するかという低レベルな仕組み</td>
                            </tr>
                            <tr className="even">
                                <td>ポリシー（Policy）</td>
                                <td>複数の選択肢の中からどれを選ぶかという意思決定ロジック</td>
                            </tr>
                            <tr className="odd">
                                <td>プロセス（Process）</td>
                                <td>実行中のプログラムを表すOSの抽象概念</td>
                            </tr>
                            <tr className="even">
                                <td>コンテキストスイッチ（Context Switch）</td>
                                <td>実行するプロセス/スレッドを切り替える処理</td>
                            </tr>
                            <tr className="odd">
                                <td>制限付き直接実行（LDE）</td>
                                <td>
                                    プログラムをCPU上で直接動かしつつ、trapとタイマー割り込みでOSが制御を取り戻せるようにする仕組み
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ターンアラウンドタイム</td>
                                <td>ジョブが到着してから完了するまでの時間</td>
                            </tr>
                            <tr className="odd">
                                <td>応答時間</td>
                                <td>ジョブが到着してから最初にCPUを割り当てられるまでの時間</td>
                            </tr>
                            <tr className="even">
                                <td>MLFQ</td>
                                <td>
                                    過去の実行履歴に基づき優先度を動的に調整するスケジューリングアルゴリズム
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>アドレス空間</td>
                                <td>プロセスに割り当てられる、独立して見える仮想メモリ領域</td>
                            </tr>
                            <tr className="even">
                                <td>ページング</td>
                                <td>
                                    メモリを固定長の単位（ページ）に分割して管理する仮想メモリ方式
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>TLB</td>
                                <td>アドレス変換結果をキャッシュするハードウェア機構</td>
                            </tr>
                            <tr className="even">
                                <td>サッシング（Thrashing）</td>
                                <td>
                                    ワーキングセットが物理メモリに収まらずページフォールトが頻発する状態
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>クリティカルセクション</td>
                                <td>共有データへアクセスするコード領域</td>
                            </tr>
                            <tr className="even">
                                <td>相互排他</td>
                                <td>
                                    同時に1つの実行フローしかクリティカルセクションへ入れないようにする性質
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>デッドロック</td>
                                <td>
                                    複数の実行フローが互いの資源を待ち合い、永久に進行不能になる状態
                                </td>
                            </tr>
                            <tr className="even">
                                <td>クラッシュ一貫性</td>
                                <td>
                                    電源断やクラッシュが起きてもファイルシステムの整合性が保たれる性質
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ジャーナリング</td>
                                <td>
                                    更新内容を先にログへ記録してからデータ本体を更新する、クラッシュ一貫性の実現手法
                                </td>
                            </tr>
                            <tr className="even">
                                <td>FTL</td>
                                <td>
                                    SSDの論理アドレスと物理NANDページを対応づけるファームウェア層
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>RPC</td>
                                <td>
                                    ネットワーク越しに関数呼び出しのような形で処理を依頼する通信方式
                                </td>
                            </tr>
                            <tr className="even">
                                <td>xv6</td>
                                <td>MIT PDOSグループが開発した教育用のUNIX v6再実装カーネル</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                <h2 id="参考文献出典" tabIndex={-1}>参考文献・出典</h2>
                <p>
                    本ガイドの作成にあたり、2026年8月29日時点で以下の情報源を参照しました。技術的な記述の根拠は下記の一次情報源（著者・開発元・公式サイトによる発信）に置いています。二次情報・コミュニティ情報源は文脈や受容のされ方を補足するためのものであり、現時点の技術的事実の裏付けには用いていません。
                </p>
                <h3 id="一次情報源著者開発元公式サイト" tabIndex={-1}>一次情報源（著者・開発元・公式サイト）</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            Operating Systems: Three Easy
                            Pieces（公式サイト、目次・書誌情報・バージョン履歴）.
                            <a href="https://pages.cs.wisc.edu/~remzi/OSTEP/">https://pages.cs.wisc.edu/~remzi/OSTEP/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            OSTEP: Errata and Book News（バージョン1.10の改訂履歴）.
                            <a href="https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html">https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            ostep-projects（Remzi Arpaci-Dusseau、C言語プロジェクト課題）.
                            <a href="https://github.com/remzi-arpacidusseau/ostep-projects">https://github.com/remzi-arpacidusseau/ostep-projects</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            xv6, a simple Unix-like teaching operating system（MIT PDOS、6.1810 Fall
                            2026）.
                            <a href="https://pdos.csail.mit.edu/6.828/2026/xv6.html">https://pdos.csail.mit.edu/6.828/2026/xv6.html</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            mit-pdos/xv6-riscv（GitHubリポジトリ）.
                            <a href="https://github.com/mit-pdos/xv6-riscv">https://github.com/mit-pdos/xv6-riscv</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            6.1810 / Operating System Engineering（MIT OpenCourseWare、コース概要）.
                            <a href="https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023">https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023</a>
                        </div>
                    </div>
                </div>
                <h3 id="二次情報コミュニティ情報源補足" tabIndex={-1}>二次情報・コミュニティ情報源（補足）</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            Operating Systems: Three Easy
                            Pieces（Amazon書誌情報、著者略歴。書誌データの二次的な掲載元）.
                            <a href="https://www.amazon.com/Operating-Systems-Three-Easy-Pieces/dp/198508659X">https://www.amazon.com/Operating-Systems-Three-Easy-Pieces/dp/198508659X</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            Software Internals Book Club: Operating Systems: Three Easy Pieces（Phil
                            Eaton、2026年輪読会スケジュール。個人主催の輪読会告知）.
                            <a href="https://eatonphil.com/2026-ostep.html">https://eatonphil.com/2026-ostep.html</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Xv6（Wikipedia、開発者・バージョン情報。編集者由来の二次情報）.
                            <a href="https://en.wikipedia.org/wiki/Xv6">https://en.wikipedia.org/wiki/Xv6</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            Operating Systems: Three Easy
                            Pieces（cs.ossu.dev、OSSUカリキュラムでの推薦文）.
                            <a href="http://cs.ossu.dev/coursepages/ostep/">http://cs.ossu.dev/coursepages/ostep/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            Hacker News: &quot;Operating Systems: Three Easy
                            Pieces&quot;（開発者コミュニティでの評価・スケジューリング章への評価コメント）.
                            <a href="https://news.ycombinator.com/item?id=18104600">https://news.ycombinator.com/item?id=18104600</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Hacker News: &quot;Operating Systems: Three Easy Pieces&quot;（体験談スレッド）.
                            <a href="https://news.ycombinator.com/item?id=30486644">https://news.ycombinator.com/item?id=30486644</a>
                        </div>
                    </div>
                </div>
                <p>
                    <strong>注記</strong>：本ガイドは上記出典および筆者の知識に基づき独自にまとめた学習補助教材であり、OSTEP原著の文章を逐語的に転載したものではありません。学習の際は必ず原著（無料PDF）を一次情報として参照してください。原著の章立て・図表・演習問題の著作権は著者であるRemzi
                    H. Arpaci-Dusseau氏およびAndrea C. Arpaci-Dusseau氏（セキュリティ章はPeter
                    Reiher氏）に帰属します。
                </p>
            
                </main>
            </div>
        </div>
    );
}
