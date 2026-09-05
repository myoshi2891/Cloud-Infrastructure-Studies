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
            <MermaidDiagram
                chart={chart}
                ariaLabel={DIAGRAM_LABELS[id]}
                preserveNaturalScale
            />
        </div>
    );
});

export function UnderstandingTheLinuxKernelGuide() {
    const [checkedList, setCheckedList] = useState<boolean[]>(() => new Array(19).fill(false));
    const checkedCount = checkedList.filter(Boolean).length;
    const handleToggle = (index: number) => {
        setCheckedList((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    return (
        <div className="understanding-the-linux-kernel-page">
            <div className="layout">
                <NavBar />
                <main className="main">
{" "}
<div className="hero">{" "}<div className="kicker">{" "}O’Reilly · Understanding the Linux Kernel, 3rd Edition{" "}</div>{" "}<h1>{" "}Understanding the Linux Kernel 完全解説ガイド ― 初学者のためのステップバイステップ入門{" "}</h1>{" "}<div className="meta-row">{" "}<span className="pill">原著{" "}<strong>O&apos;Reilly 3rd Edition</strong></span>{" "}<span className="pill">対象{" "}<strong>初学者〜中級者</strong></span>{" "}<span className="pill">図解{" "}<strong>Mermaid 45点</strong></span>{" "}<span className="pill">参考文献{" "}<strong>31件</strong></span>{" "}</div>{" "}</div>
{" "}
<p>{" "}<strong>原典について</strong>: このガイドは O&apos;Reilly{" "}<em>Understanding the Linux Kernel, 3rd Edition</em>（Daniel P. Bovet, Marco Cesati 著、2005年11月刊、942ページ、Linux 2.6系カーネルを対象）の目次構成・章立てを土台にしつつ、初学者向けに再構成し、2026年8月時点の最新カーネル動向（EEVDF スケジューラ、io_uring、eBPF/sched_ext、Rust for Linux、cgroup v2 など）を補完した独自ドキュメントです。原著は942ページに及ぶ関数レベルの詳細な解説書ですが、本ガイドはその「考え方」と「全体構造」を掴むことを目的とし、初学者が挫折しないよう概念・図解・現代的な文脈を中心に再編しています。原著の詳細な実装（関数名・行単位のコード解説）を読みたい方は、ぜひ原典を参照してください。{" "}</p>
{" "}
<ul><li>{" "}原典ページ:{" "}<a href="https://www.oreilly.com/library/view/understanding-the-linux/0596005652/">https://www.oreilly.com/library/view/understanding-the-linux/0596005652/</a>{" "}</li><li>{" "}本ガイドはASCIIアート（罫線文字）を一切使用せず、図解はすべてMermaid、表はすべてMarkdown記法で作成しています。{" "}</li></ul>
{" "}
<h2 id="この記事について" tabIndex={-1}>この記事について</h2>
{" "}
<p>{" "}Linuxカーネルは、世界中のサーバー・スマートフォン（Android）・組み込み機器・スーパーコンピュータで動く、現代コンピューティングの土台です。しかし「カーネルとは何をしているのか」「なぜOSにカーネルが必要なのか」は、アプリケーション開発者にとってブラックボックスになりがちです。{" "}</p>
{" "}
<p>{" "}このガイドは、<strong>Linuxカーネルのソースコードを読んだことがない人</strong>でも、以下を段階的に理解できるように設計されています。{" "}</p>
{" "}
<ol><li>OS・カーネルの基本概念（プロセス、メモリ、ファイル、デバイス）</li><li>{" "}x86ハードウェアがどのようにカーネルを支えているか（セグメンテーション、ページング、割り込み）{" "}</li><li>{" "}カーネル内部の主要サブシステム（スケジューラ、メモリ管理、VFS、ブロックI/O、ページキャッシュ）{" "}</li><li>{" "}2005年の原著から2026年現在までにカーネルがどう進化したか（CFS→EEVDF、AIO→io_uring、BKL撤廃、eBPF、Rust統合など）{" "}</li></ol>
{" "}
<h2 id="対象読者" tabIndex={-1}>対象読者</h2>
{" "}
<ul><li>{" "}Linux/Unix系OSを使っているが、カーネル内部の仕組みを体系的に学んだことがないソフトウェアエンジニア・QAエンジニア{" "}</li><li>{" "}インフラ・SRE・組み込み開発者で、パフォーマンスチューニングやトラブルシューティングのためにカーネルの基礎知識が必要な人{" "}</li><li>OS自作やLinuxカーネル開発への第一歩を踏み出したい人</li></ul>
{" "}
<h2 id="前提知識" tabIndex={-1}>前提知識</h2>
{" "}
<ul><li>C言語の基本文法（ポインタ、構造体、関数）が読める</li><li>{" "}Linuxのコマンドライン操作（<code>ps</code>,{" "}<code>top</code>,{" "}<code>strace</code>{" "}など）に触れたことがある{" "}</li><li>{" "}コンピュータアーキテクチャの基礎（CPU、メモリ、レジスタ）をぼんやりとでも知っている{" "}</li></ul>
{" "}
<p>{" "}前提知識に不安がある場合も、各章は概念から丁寧に説明するため読み進められます。{" "}</p>
{" "}
<h2 id="目次この記事の構成" tabIndex={-1}>目次（この記事の構成）</h2>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">Part</th><th scope="col">タイトル</th><th scope="col">原著対応章</th></tr></thead><tbody><tr className="odd"><td>第0部</td><td>OS・カーネルの基礎知識</td><td>（準備）</td></tr><tr className="even"><td>第1部</td><td>序論：Linuxカーネルとは何か</td><td>Ch.1 Introduction</td></tr><tr className="odd"><td>第2部</td><td>メモリアドレッシング</td><td>Ch.2 Memory Addressing</td></tr><tr className="even"><td>第3部</td><td>プロセス</td><td>Ch.3 Processes</td></tr><tr className="odd"><td>第4部</td><td>割り込みと例外</td><td>Ch.4 Interrupts and Exceptions</td></tr><tr className="even"><td>第5部</td><td>カーネル同期</td><td>Ch.5 Kernel Synchronization</td></tr><tr className="odd"><td>第6部</td><td>タイミング計測</td><td>Ch.6 Timing Measurements</td></tr><tr className="even"><td>第7部</td><td>プロセススケジューリング</td><td>Ch.7 Process Scheduling</td></tr><tr className="odd"><td>第8部</td><td>メモリ管理</td><td>Ch.8 Memory Management</td></tr><tr className="even"><td>第9部</td><td>プロセスアドレス空間</td><td>Ch.9 Process Address Space</td></tr><tr className="odd"><td>第10部</td><td>システムコール</td><td>Ch.10 System Calls</td></tr><tr className="even"><td>第11部</td><td>シグナル</td><td>Ch.11 Signals</td></tr><tr className="odd"><td>第12部</td><td>仮想ファイルシステム（VFS）</td><td>Ch.12 The Virtual Filesystem</td></tr><tr className="even"><td>第13部</td><td>I/Oアーキテクチャとデバイスドライバ</td><td>Ch.13 I/O Architecture and Device Drivers</td></tr><tr className="odd"><td>第14部</td><td>ブロックデバイスドライバ</td><td>Ch.14 Block Device Drivers</td></tr><tr className="even"><td>第15部</td><td>ページキャッシュ</td><td>Ch.15 The Page Cache</td></tr><tr className="odd"><td>第16部</td><td>ファイルアクセス</td><td>Ch.16 Accessing Files</td></tr><tr className="even"><td>第17部</td><td>ページフレーム回収</td><td>Ch.17 Page Frame Reclaiming</td></tr><tr className="odd"><td>第18部</td><td>Ext2/Ext3から現代のファイルシステムへ</td><td>Ch.18 The Ext2 and Ext3 Filesystems</td></tr><tr className="even"><td>第19部</td><td>プロセス間通信（IPC）</td><td>Ch.19 Process Communication</td></tr><tr className="odd"><td>第20部</td><td>プログラム実行</td><td>Ch.20 Program Execution</td></tr><tr className="even"><td>第21部</td><td>システム起動とモジュール</td><td>Appendix A/B</td></tr><tr className="odd"><td>第22部</td><td>2026年最新動向：原著から20年、カーネルはどう変わったか</td><td>（独自追加）</td></tr><tr className="even"><td>—</td><td>学習ロードマップ／チェックリスト／参考文献</td><td>—</td></tr></tbody></table>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第0部osカーネルの基礎知識" tabIndex={-1}>第0部：OS・カーネルの基礎知識</h2>
{" "}
<p>本編に入る前に、「OS」「カーネル」という言葉が指すものを整理します。</p>
{" "}
<h3 id="01-オペレーティングシステムとカーネルの違い" tabIndex={-1}>{" "}0.1 オペレーティングシステムとカーネルの違い{" "}</h3>
{" "}
<p>{" "}<strong>オペレーティングシステム（OS）</strong>{" "}は、ハードウェアとアプリケーションの間に立ち、コンピュータ資源（CPU・メモリ・ディスク・ネットワーク）を管理する巨大なソフトウェア群の総称です。「Linux」という言葉は文脈によって、狭義には<strong>カーネル単体</strong>を指し、広義には（Ubuntu、Fedora、Android のように）カーネル＋シェル＋ライブラリ＋アプリケーション群を含む「ディストリビューション」を指します。{" "}</p>
{" "}
<p>{" "}<strong>カーネル（kernel）</strong>{" "}は、OSの中核（核）となるプログラムで、以下の役割を持ちます。{" "}</p>
{" "}
<ul><li>CPU時間を複数のプロセスに公平に割り当てる（スケジューリング）</li><li>{" "}メモリを各プロセスに割り当て、互いに干渉しないよう保護する（メモリ管理）{" "}</li><li>ファイルシステムを通じてデータの永続化を提供する（ファイルシステム）</li><li>{" "}キーボード・ディスク・ネットワークカードなどのハードウェアを抽象化する（デバイスドライバ）{" "}</li><li>プロセス同士が安全に通信できる仕組みを提供する（IPC）</li></ul>
{" "}
<Diagram id="diag-1" />
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}「ユーザー空間」と「カーネル空間」の分離こそが、Linuxの安定性・セキュリティの根幹です。アプリケーションのバグでOS全体がクラッシュしないのは、CPUのモード切り替え機構（後述の第2部・第4部）が、ユーザープログラムに直接ハードウェアやカーネルのメモリへアクセスさせないよう保護しているためです。{" "}</p>{" "}</div>{" "}</div>
{" "}
<h3 id="02-モノリシックカーネル-vs-マイクロカーネル" tabIndex={-1}>{" "}0.2 モノリシックカーネル vs マイクロカーネル{" "}</h3>
{" "}
<p>{" "}原著の1.1節「Linux Versus Other Unix-Like Kernels」で議論されるように、カーネルの設計思想には大きく2つの流派があります。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">設計</th><th scope="col">特徴</th><th scope="col">代表例</th></tr></thead><tbody><tr className="odd"><td>モノリシックカーネル</td><td>{" "}すべてのカーネル機能（スケジューラ、ファイルシステム、ドライバ）が1つの特権アドレス空間で動く。高速だが、1つのドライバのバグが全体をクラッシュさせるリスクがある{" "}</td><td>Linux、伝統的なUnix系OS</td></tr><tr className="even"><td>マイクロカーネル</td><td>{" "}最小限の機能（プロセス間通信・基本スケジューリング）のみカーネル空間に置き、ファイルシステムやドライバはユーザー空間のサーバープロセスとして動く。堅牢だが、プロセス間通信のオーバーヘッドがある{" "}</td><td>Mach、L4、MINIX 3</td></tr><tr className="odd"><td>ハイブリッド</td><td>{" "}モノリシックを基本としつつ、動的にロード可能なモジュール機構で柔軟性を持たせる{" "}</td><td>Linux（実質的にこちらに近い）、Windows NT系</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}Linuxはモノリシックカーネルとして設計されていますが、<strong>ローダブルカーネルモジュール（LKM）</strong>{" "}の仕組みにより、デバイスドライバやファイルシステムを実行時に動的追加・削除できる柔軟性を備えています（詳細は第21部）。{" "}</p>
{" "}
<h3 id="03-プロセスカーネルモデルprocesskernel-model" tabIndex={-1}>{" "}0.3 プロセス／カーネルモデル（Process/Kernel Model）{" "}</h3>
{" "}
<p>{" "}原著1.6.1節で説明される中心概念です。Unix系カーネルでは、カーネルはそれ自体が独立したプロセスとして動くのではなく、<strong>「各プロセスに代わって特権モードで実行される」</strong>{" "}という考え方を取ります。プロセスがシステムコールを発行したり、割り込み・例外が発生すると、CPUはユーザーモードからカーネルモードへ切り替わり、そのプロセスのコンテキストのままカーネルコードを実行します。{" "}</p>
{" "}
<Diagram id="diag-2" />
{" "}
<h3 id="04-リエントラント再入可能カーネル" tabIndex={-1}>{" "}0.4 リエントラント（再入可能）カーネル{" "}</h3>
{" "}
<p>{" "}現代のカーネルは<strong>リエントラントカーネル</strong>です。つまり、複数のプロセスがほぼ同時にカーネルコードを実行でき（マルチプロセッサはもちろん、シングルプロセッサでも割り込みによるネスト実行がある）、カーネル自身が「自分自身に対して同時実行されても壊れない」よう設計されている必要があります。これが第5部「カーネル同期」で扱うテーマの出発点です。{" "}</p>
{" "}
<p>学習の道筋としては、次の順序で読み進めると理解しやすくなります。</p>
{" "}
<Diagram id="diag-3" />
{" "}
<hr />
{" "}
<h2 id="第1部序論-linuxカーネルとは何か原著-ch1-introduction" tabIndex={-1}>{" "}第1部：序論 ― Linuxカーネルとは何か（原著 Ch.1 Introduction）{" "}</h2>
{" "}
<h3 id="11-linuxとunix系カーネルの関係" tabIndex={-1}>1.1 LinuxとUnix系カーネルの関係</h3>
{" "}
<p>{" "}原著1.1節では、Linuxが「Unix互換（Unix-like）」カーネルであると位置づけられています。Linuxは、AT&amp;TのオリジナルUnixのソースコードを一切使わず、Linus Torvaldsが1991年にゼロから書き起こしたコードです。にもかかわらず、POSIX標準に準拠したシステムコールインターフェースを提供するため、Unix向けに書かれたプログラムの多くがLinux上でもそのまま動きます。{" "}</p>
{" "}
<p>{" "}Linuxが従来のUnix系カーネル（BSD系、System V系）と異なる主な特徴は以下の通りです。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">特徴</th><th scope="col">内容</th></tr></thead><tbody><tr className="odd"><td>動的カーネルモジュール</td><td>{" "}実行中のカーネルにドライバやファイルシステムを動的に追加・削除できる{" "}</td></tr><tr className="even"><td>マルチプラットフォーム対応</td><td>{" "}x86, ARM, RISC-V, PowerPC, MIPS など多数のCPUアーキテクチャに移植されている{" "}</td></tr><tr className="odd"><td>シンメトリックマルチプロセッシング（SMP）</td><td>複数CPUコアを対等に扱い、負荷分散する</td></tr><tr className="even"><td>オープンソース開発モデル</td><td>{" "}GPLv2ライセンスの下、世界中の企業・個人開発者が共同で開発する{" "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="12-ハードウェア依存性" tabIndex={-1}>1.2 ハードウェア依存性</h3>
{" "}
<p>{" "}原著1.2節では、カーネルコードが「ハードウェア非依存部分」と「ハードウェア依存部分（アーキテクチャ依存コード）」に分かれることが説明されます。Linuxソースツリーでは{" "}<code>arch/</code>{" "}ディレクトリ以下に、x86、arm64、riscv などアーキテクチャごとのコードが分離されており、CPUの割り込みコントローラやページテーブル形式といった機種依存の詳細はこの層に閉じ込められています。これにより、スケジューラやVFSといった大部分のコードは全アーキテクチャで共通化されています。{" "}</p>
{" "}
<h3 id="13-linuxのバージョニング" tabIndex={-1}>1.3 Linuxのバージョニング</h3>
{" "}
<p>{" "}原著執筆時点（2005年）は、開発版（奇数マイナー番号、例: 2.5.x）と安定版（偶数マイナー番号、例: 2.6.x）を分離する伝統的な番号付けが説明されていましたが、2004年の2.6リリース以降、Linuxはこの「開発/安定」分離モデルを廃止しました。現在（2026年時点）のバージョニングルールは次のとおりです。{" "}</p>
{" "}
<ul><li>{" "}<strong>メインラインカーネル</strong>:{" "}<code>X.Y</code>{" "}形式（例: 7.1）。約9〜10週間ごとに新しいメジャーバージョンがリリースされる。最初の2週間だけ新機能のマージを受け付ける「マージウィンドウ」があり、その後は{" "}<code>-rc1</code>{" "}から{" "}<code>-rcN</code>{" "}までのリリース候補でバグ修正のみが行われる。{" "}</li><li>{" "}<strong>安定版（stable）</strong>: メインラインリリース後、Greg Kroah-HartmanとSasha Levinらが{" "}<code>X.Y.Z</code>{" "}形式でバグ修正・セキュリティパッチのみを継続配布する。{" "}</li><li>{" "}<strong>LTS（Long Term Support）</strong>: 特定のメインラインバージョンが数年間（最大6年程度）保守される。2026年8月時点でのLTS系列は 6.18, 6.12, 6.6, 6.1, 5.15 などが並行してメンテナンスされている。{" "}</li></ul>
{" "}
<p>{" "}<strong>出典</strong>: Linux kernelバージョン情報とGreg Kroah-Hartman/Sasha Levinによる安定版リリース運用について —{" "}<a href="https://www.kernel.org/">https://www.kernel.org/</a>{" "}、Wikipedia &quot;Linux kernel&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Linux_kernel">https://en.wikipedia.org/wiki/Linux_kernel</a>{" "}</p>
{" "}
<h3 id="14-基本的なosの概念" tabIndex={-1}>1.4 基本的なOSの概念</h3>
{" "}
<p>原著1.4節の内容を整理します。</p>
{" "}
<p>{" "}<strong>マルチユーザーシステム</strong>: Linuxは複数のユーザーが同時にログインし、それぞれ独立したプロセス群を実行できるよう設計されています。各ユーザーはUID（ユーザーID）、各ユーザーが属するグループはGID（グループID）で識別されます。{" "}</p>
{" "}
<p>{" "}<strong>プロセス</strong>: 実行中のプログラムのインスタンス。カーネルは各プロセスに{" "}<code>task_struct</code>{" "}という構造体（プロセスディスクリプタ）を割り当てて管理します（詳細は第3部）。{" "}</p>
{" "}
<p>{" "}<strong>カーネルアーキテクチャ</strong>: 原著は「モノリシックカーネルだが、モジュール機構により柔軟性を確保している」とLinuxの立ち位置を説明しています。{" "}</p>
{" "}
<h3 id="15-unixファイルシステムの概観" tabIndex={-1}>1.5 Unixファイルシステムの概観</h3>
{" "}
<p>原著1.5節は、Linuxのファイルモデルの基礎を説明します。</p>
{" "}
<ul><li>{" "}<strong>ファイル</strong>: バイト列の集合。特別な構造を持たない「フラットなバイトストリーム」として扱われる（これがUnix哲学の核心の一つ）。{" "}</li><li>{" "}<strong>ハードリンクとシンボリックリンク</strong>: ハードリンクは同じinodeを指す別名、シンボリックリンクはパス文字列を保持する別ファイル。{" "}</li><li>{" "}<strong>ファイルタイプ</strong>: 通常ファイル、ディレクトリ、シンボリックリンク、デバイスファイル（キャラクタ型/ブロック型）、名前付きパイプ（FIFO）、ソケット。{" "}</li><li>{" "}<strong>ファイルディスクリプタとinode</strong>: プロセスから見た「開いているファイルの番号」がファイルディスクリプタ、ファイルシステム上の実体を表すメタデータがinode。{" "}</li><li>{" "}<strong>アクセス権とファイルモード</strong>: 所有者・グループ・その他に対する読み書き実行権限（rwx）。{" "}</li><li>{" "}<strong>ファイル操作システムコール</strong>:{" "}<code>open()</code>,{" "}<code>read()</code>,{" "}<code>write()</code>,{" "}<code>close()</code>,{" "}<code>rename()</code>,{" "}<code>unlink()</code>{" "}など。{" "}</li></ul>
{" "}
<Diagram id="diag-4" />
{" "}
<h3 id="16-unixカーネルの概観" tabIndex={-1}>1.6 Unixカーネルの概観</h3>
{" "}
<p>{" "}原著1.6節は本書全体の「地図」にあたる節で、以下のトピックを先取りして紹介します。いずれも本ガイドの各Partで詳しく扱います。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">トピック</th><th scope="col">対応Part</th></tr></thead><tbody><tr className="odd"><td>プロセス/カーネルモデル、リエントラントカーネル</td><td>第0部</td></tr><tr className="even"><td>プロセスアドレス空間</td><td>第9部</td></tr><tr className="odd"><td>{" "}同期・クリティカルリージョン（カーネルプリエンプション無効化、割り込み無効化、セマフォ、スピンロック）{" "}</td><td>第5部</td></tr><tr className="even"><td>シグナルとプロセス間通信</td><td>第11部・第19部</td></tr><tr className="odd"><td>{" "}プロセス管理（ゾンビプロセス、プロセスグループ、ログインセッション）{" "}</td><td>第3部</td></tr><tr className="even"><td>{" "}メモリ管理（仮想メモリ、カーネルメモリアロケータ、キャッシング）{" "}</td><td>第8部・第9部</td></tr><tr className="odd"><td>デバイスドライバ</td><td>第13部・第14部</td></tr></tbody></table>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第2部メモリアドレッシング原著-ch2-memory-addressing" tabIndex={-1}>{" "}第2部：メモリアドレッシング（原著 Ch.2 Memory Addressing）{" "}</h2>
{" "}
<h3 id="21-メモリアドレスの3つの顔" tabIndex={-1}>2.1 メモリアドレスの3つの顔</h3>
{" "}
<p>原著2.1節は、CPUが扱うアドレスには3種類あることを説明します。</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">アドレスの種類</th><th scope="col">説明</th></tr></thead><tbody><tr className="odd"><td>論理アドレス（Logical Address）</td><td>{" "}プログラムが直接指定するアドレス。x86ではセグメント＋オフセットで構成される{" "}</td></tr><tr className="even"><td>線形アドレス／仮想アドレス（Linear/Virtual Address）</td><td>{" "}セグメンテーションユニットが論理アドレスを変換した、単一の32bit/64bit空間上のアドレス{" "}</td></tr><tr className="odd"><td>物理アドレス（Physical Address）</td><td>実際にメモリバス上に現れる、DRAMチップ上の番地</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-5" />
{" "}
<h3 id="2223-ハードウェアのセグメンテーションとlinuxでの利用" tabIndex={-1}>{" "}2.2〜2.3 ハードウェアのセグメンテーションとLinuxでの利用{" "}</h3>
{" "}
<p>{" "}x86 CPUは本来、セグメントレジスタ（CS, DS, SS など）とセグメントディスクリプタテーブル（GDT/LDT）を使ってメモリを区分するセグメンテーション機構を持っています。原著2.2〜2.3節はこの仕組みを詳細に解説しますが、要点は「<strong>Linuxはセグメンテーションをほぼ使わない</strong>」ということです。すべてのプロセスに対して、ベースアドレス0、リミット4GB（32bit環境）の「フラットなアドレス空間」を割り当てるセグメントディスクリプタのみを使い、実質的にアドレス変換をページングユニットに一任しています。これはx86の複雑なセグメンテーション機構に依存せず、他アーキテクチャへの移植性を高めるための設計判断です。{" "}</p>
{" "}
<p>{" "}64bit（x86-64）環境では、セグメンテーションはさらに形骸化し、CS/SSなど一部のセグメントレジスタが名残として残るのみとなっています。{" "}</p>
{" "}
<h3 id="2425-ページング機構" tabIndex={-1}>2.4〜2.5 ページング機構</h3>
{" "}
<p>{" "}<strong>ページング</strong>は、線形アドレスを物理アドレスへ変換する仕組みです。メモリは固定サイズの「ページ」（通常4KB）単位で管理され、CPU内の<strong>ページテーブル</strong>がこの変換を担います。{" "}</p>
{" "}
<p>{" "}原著が対象とする2.6カーネル（32bit時代）は2段階（あるいはPAE有効時3段階）のページテーブルを解説していましたが、現代の64bit（x86-64）環境では<strong>4段階（一部は5段階）ページテーブル</strong>が標準です。{" "}</p>
{" "}
<Diagram id="diag-6" />
{" "}
<p>{" "}<strong>TLB（Translation Lookaside Buffer）</strong>{" "}は、頻繁に使われるページテーブルエントリをCPU内にキャッシュし、毎回メモリ上のページテーブルを歩く（ウォークする）コストを削減する仕組みです。原著2.4.8節で解説されるこの概念は、現代でもパフォーマンスチューニングの重要なポイント（TLBミス削減、Huge Pages活用）として生き続けています。{" "}</p>
{" "}
<h3 id="25-linuxにおけるページング詳細" tabIndex={-1}>2.5 Linuxにおけるページング詳細</h3>
{" "}
<p>原著2.5節では、以下のような実装詳細が解説されます。</p>
{" "}
<ul><li>{" "}<strong>線形アドレスのフィールド分割</strong>: 仮想アドレスの各ビット範囲がPGD/PUD/PMD/PTEインデックスにどう割り当てられるか{" "}</li><li>{" "}<strong>物理メモリレイアウト</strong>: カーネル自身が使う物理メモリ領域（<code>ZONE_DMA</code>,{" "}<code>ZONE_NORMAL</code>,{" "}<code>ZONE_HIGHMEM</code>{" "}など）{" "}</li><li><strong>プロセスページテーブル</strong>とカーネルページテーブルの違い</li><li>{" "}<strong>ハイメモリのカーネルマッピング</strong>: 32bit環境で物理メモリが4GBに迫る場合、カーネルの直接マッピング可能領域（Low Memory）を超える部分（High Memory）を一時的にマッピングする仕組み{" "}</li></ul>
{" "}
<p>{" "}<strong>2026年時点の補足</strong>: 64bit環境が主流になった現在、32bit時代特有の「ハイメモリ問題」（原著2.5.5〜2.5.6節が詳述する内容）は実務上ほぼ解消しています。64bitのアドレス空間は理論上16EB（エクサバイト）に及び、物理メモリの直接マッピングに困ることがほぼないためです。ただし、組み込み機器や一部のレガシー環境では32bitカーネルも現役であり、概念としては依然重要です。{" "}</p>
{" "}
<h3 id="26-ハードウェアキャッシュとメモリ階層" tabIndex={-1}>{" "}2.6 ハードウェアキャッシュとメモリ階層{" "}</h3>
{" "}
<p>{" "}原著2.4.7節が触れるハードウェアキャッシュ（L1/L2/L3キャッシュ）は、CPUとメインメモリの速度差を埋めるための仕組みです。現代のCPUではこの階層がさらに複雑化しており、NUMA（Non-Uniform Memory Access）構成のマルチソケットサーバーでは「どの物理コアがどのメモリバンクに近いか」がパフォーマンスに大きく影響します（NUMAは第8部で再登場します）。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">メモリ階層</th><th scope="col">典型的なレイテンシ（目安）</th><th scope="col">典型的な容量</th></tr></thead><tbody><tr className="odd"><td>CPUレジスタ</td><td>&lt;1ns</td><td>数百バイト</td></tr><tr className="even"><td>L1キャッシュ</td><td>1ns前後</td><td>数十KB</td></tr><tr className="odd"><td>L2キャッシュ</td><td>3〜10ns</td><td>数百KB〜数MB</td></tr><tr className="even"><td>L3キャッシュ</td><td>10〜20ns</td><td>数MB〜数十MB</td></tr><tr className="odd"><td>メインメモリ（DRAM）</td><td>50〜100ns</td><td>数GB〜数TB</td></tr><tr className="even"><td>NVMe SSD</td><td>数十〜数百μs</td><td>数百GB〜数十TB</td></tr></tbody></table>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第3部プロセス原著-ch3-processes" tabIndex={-1}>第3部：プロセス（原著 Ch.3 Processes）</h2>
{" "}
<h3 id="31-プロセス軽量プロセススレッド" tabIndex={-1}>3.1 プロセス、軽量プロセス、スレッド</h3>
{" "}
<p>{" "}原著3.1節は、Linux独自の設計思想を説明する重要な節です。多くのOSでは「プロセス」と「スレッド」を明確に別のカーネルオブジェクトとして扱いますが、Linuxは<strong>両方を単一の抽象「task」として扱います</strong>。プロセス生成に使う{" "}<code>clone()</code>{" "}システムコールに渡すフラグ（<code>CLONE_VM</code>,{" "}<code>CLONE_FS</code>,{" "}<code>CLONE_FILES</code>{" "}など）によって、「アドレス空間を親と共有するか」「ファイルディスクリプタテーブルを共有するか」を個別に選択でき、これにより伝統的な「プロセス」と「軽量プロセス（スレッド）」の両方を統一的に表現しています。{" "}</p>
{" "}
<Diagram id="diag-7" />
{" "}
<h3 id="32-プロセスディスクリプタ" tabIndex={-1}>3.2 プロセスディスクリプタ</h3>
{" "}
<p>{" "}カーネルは各プロセス（タスク）を{" "}<code>task_struct</code>{" "}という巨大な構造体で表現します。原著3.2節はこの構造体の要素を詳しく解説します。{" "}</p>
{" "}
<ul><li>{" "}<strong>プロセス状態</strong>:{" "}<code>TASK_RUNNING</code>（実行可能）、<code>TASK_INTERRUPTIBLE</code>（シグナルで起床可能な待機）、<code>TASK_UNINTERRUPTIBLE</code>（シグナル無視の待機、いわゆるDステート）、<code>TASK_STOPPED</code>（停止）、<code>EXIT_ZOMBIE</code>（終了済みだが親が回収待ち）など。{" "}</li></ul>
{" "}
<Diagram id="diag-8" />
{" "}
<ul><li>{" "}<strong>プロセスの識別</strong>: PID（プロセスID）、PGID（プロセスグループID）、SID（セッションID）。原著が説明する「pidhashテーブル」は、現代のカーネルでは効率的なradix tree/IDR（IDアロケータ）ベースの実装に置き換わっています。{" "}</li><li>{" "}<strong>プロセス間の関係</strong>: 親子関係（<code>parent</code>/<code>children</code>）、兄弟関係（<code>sibling</code>）を双方向リンクリストで管理。{" "}</li><li>{" "}<strong>待ち行列（wait queue）</strong>: プロセスがイベント（I/O完了、ロック解放など）を待つための仕組み。{" "}</li><li>{" "}<strong>リソース制限</strong>:{" "}<code>RLIMIT_NOFILE</code>（開けるファイル数上限）、<code>RLIMIT_NPROC</code>{" "}など、<code>ulimit</code>{" "}コマンドで確認・設定できる各種上限。{" "}</li></ul>
{" "}
<h3 id="33-プロセス切り替えコンテキストスイッチ" tabIndex={-1}>{" "}3.3 プロセス切り替え（コンテキストスイッチ）{" "}</h3>
{" "}
<p>{" "}原著3.3節は、あるプロセスの実行を中断し、別のプロセスに実行を切り替える「プロセス切り替え（コンテキストスイッチ）」のハードウェアレベルの詳細を扱います。{" "}</p>
{" "}
<ul><li>{" "}<strong>ハードウェアコンテキスト</strong>: CPUレジスタ・プログラムカウンタ・スタックポインタなど、プロセス実行を再開するために必要な情報一式。{" "}</li><li>{" "}<strong>TSS（Task State Segment）</strong>: x86が本来ハードウェアレベルでタスク切り替えをサポートするための構造体。Linuxはこれをフルには使わず、ソフトウェアによる軽量な切り替え（<code>switch_to</code>{" "}マクロ）を採用しています。{" "}</li><li>{" "}<strong>FPU/MMX/SSE/AVXレジスタの保存</strong>: 浮動小数点演算ユニットの状態は、実際に使用したプロセスのみ遅延保存する「Lazy FPU」的な最適化が伝統的に行われてきましたが、現代のCPU（AVX-512など）ではこの管理は{" "}<code>XSAVE</code>/<code>XRSTOR</code>{" "}命令群にさらに一般化されています。{" "}</li></ul>
{" "}
<Diagram id="diag-9" />
{" "}
<h3 id="34-プロセスの生成" tabIndex={-1}>3.4 プロセスの生成</h3>
{" "}
<p>{" "}原著3.4節では{" "}<code>clone()</code>,{" "}<code>fork()</code>,{" "}<code>vfork()</code>{" "}の3つのシステムコールが解説されます。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">システムコール</th><th scope="col">特徴</th></tr></thead><tbody><tr className="odd"><td><code>fork()</code></td><td>{" "}親プロセスの完全なコピーを作る。従来は全メモリを物理コピーしていたが、現代は<strong>Copy-On-Write（COW）</strong>により、実際に書き込みが発生するまでページを共有し続けることで高速化されている{" "}</td></tr><tr className="even"><td><code>vfork()</code></td><td>{" "}親のアドレス空間をそのまま共有し、子が{" "}<code>exec()</code>{" "}するかexitするまで親をブロックする。<code>exec()</code>{" "}直後に破棄されるアドレス空間のコピーコストを避けるための最適化{" "}</td></tr><tr className="odd"><td><code>clone()</code></td><td>{" "}前述の通り、共有するリソースをフラグで細かく制御できる、最も汎用的な生成手段。<code>pthread_create()</code>{" "}の裏側でも使われる{" "}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}<code>copy_process()</code>{" "}関数（内部実装）は、新しいプロセスディスクリプタの割り当て、PIDの割り当て、各種リソース（ファイルディスクリプタテーブル、シグナルハンドラ、アドレス空間）のコピーまたは共有設定を行います。{" "}</p>
{" "}
<p>{" "}<strong>カーネルスレッド</strong>は、ユーザー空間を持たずカーネル内でのみ動作する特殊なプロセスです。原著が例示するプロセス0（<code>swapper</code>/idle task）、プロセス1（<code>init</code>）に加え、現代のカーネルには{" "}<code>kworker</code>,{" "}<code>ksoftirqd</code>,{" "}<code>kswapd</code>,{" "}<code>migration</code>{" "}など多数のカーネルスレッドが存在し、<code>ps -ef</code>{" "}で{" "}<code>[ ]</code>{" "}括弧付きの名前として確認できます。{" "}</p>
{" "}
<h3 id="35-プロセスの終了" tabIndex={-1}>3.5 プロセスの終了</h3>
{" "}
<p>{" "}原著3.5節は{" "}<code>exit()</code>{" "}システムコールの内部（<code>do_exit()</code>）を解説します。プロセスが終了しても、親プロセスが{" "}<code>wait()</code>/<code>waitpid()</code>{" "}で終了ステータスを回収するまでは、そのプロセスディスクリプタは<strong>ゾンビ（zombie）状態</strong>としてカーネルに残り続けます。親が回収を怠ると「ゾンビプロセスの蓄積」という運用上のトラブルにつながります（<code>ps aux</code>{" "}で{" "}<code>Z</code>{" "}ステータスとして観測可能）。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}デーモンプロセスを自作する際は、子プロセスの終了を必ず{" "}<code>SIGCHLD</code>{" "}ハンドラや{" "}<code>waitpid()</code>{" "}で回収する設計にしてください。コンテナ環境（Docker等）でPID 1として動くプロセスがゾンビ回収を怠ると、ゾンビが蓄積してPIDテーブルを圧迫する典型的な障害パターンになります（<code>tini</code>{" "}や{" "}<code>dumb-init</code>{" "}のような軽量init代替が使われる理由の一つです）。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第4部割り込みと例外原著-ch4-interrupts-and-exceptions" tabIndex={-1}>{" "}第4部：割り込みと例外（原著 Ch.4 Interrupts and Exceptions）{" "}</h2>
{" "}
<h3 id="4142-割り込みシグナルの役割" tabIndex={-1}>4.1〜4.2 割り込みシグナルの役割</h3>
{" "}
<p>カーネルが「今何かが起きた」ことを知る手段は主に2つです。</p>
{" "}
<ul><li>{" "}<strong>割り込み（Interrupt）</strong>: 外部デバイス（キーボード、ディスク、NIC、タイマー）がCPUに対して非同期に発生させる信号。「IRQ（Interrupt Request）」とも呼ばれる。{" "}</li><li>{" "}<strong>例外（Exception）</strong>: CPU自身が命令実行中に検出する同期的なイベント。ゼロ除算、ページフォルト、不正命令など。{" "}</li></ul>
{" "}
<p>{" "}原著4.2.1節が解説する<strong>APIC（Advanced Programmable Interrupt Controller）</strong>{" "}は、複数CPUコアへ割り込みを分配するための仕組みで、現代のマルチコアCPUでも中核的な役割を果たしています（Local APIC + I/O APIC構成）。{" "}</p>
{" "}
<Diagram id="diag-10" />
{" "}
<h3 id="4345-idtと例外ハンドリング" tabIndex={-1}>4.3〜4.5 IDTと例外ハンドリング</h3>
{" "}
<p>{" "}<strong>割り込みディスクリプタテーブル（IDT）</strong>{" "}は、各割り込み番号／例外番号に対応するハンドラのアドレスを保持するテーブルです。原著4.4節ではこのテーブルの初期化過程、4.5節では例外発生時にCPUがレジスタをどう保存し、ハンドラへどう制御を渡すかが解説されます。{" "}</p>
{" "}
<h3 id="4647-割り込みハンドリングとsoftirqtasklet" tabIndex={-1}>{" "}4.6〜4.7 割り込みハンドリングとSoftirq/Tasklet{" "}</h3>
{" "}
<p>{" "}割り込みハンドラは<strong>できるだけ短時間で終わらせる</strong>ことが鉄則です（割り込み処理中は他の割り込みがブロックされるため）。そこでLinuxは「重い処理」を後回しにする<strong>遅延処理機構（deferrable functions）</strong>を持っています。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">機構</th><th scope="col">特徴</th></tr></thead><tbody><tr className="odd"><td>Softirq</td><td>{" "}静的に定義された少数の高優先度の遅延処理。ネットワークパケット処理などパフォーマンスが重要な用途で使われる{" "}</td></tr><tr className="even"><td>Tasklet</td><td>{" "}Softirqの上に実装された、動的に登録できる遅延処理。同じtaskletは複数CPUで同時実行されない{" "}</td></tr><tr className="odd"><td>ワークキュー（Work Queue）</td><td>{" "}カーネルスレッドのコンテキストで実行される遅延処理。プロセスコンテキストが必要な処理（スリープを伴う処理）に使われる{" "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-11" />
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}<code>top</code>{" "}や{" "}<code>vmstat</code>{" "}で{" "}<code>si</code>（softirq）列の値が高止まりしている場合、ネットワーク割り込み処理がCPUを圧迫しているサインです。NICのマルチキュー機能とRSS（Receive Side Scaling）、あるいは{" "}<code>irqbalance</code>{" "}によるCPUコア間の割り込み分散設定を見直す出発点になります。{" "}</p>{" "}</div>{" "}</div>
{" "}
<h3 id="48-ワークキュー" tabIndex={-1}>4.8 ワークキュー</h3>
{" "}
<p>{" "}原著4.8節は、旧来の{" "}<code>keventd</code>（predefined work queue）を解説していますが、現代のカーネルでは<strong>CMWQ（Concurrency-Managed Workqueues）</strong>{" "}に置き換わっており、ワーカースレッドの数がワークロードに応じて動的にプール管理されるようになっています。<code>ps -ef | grep kworker</code>{" "}で確認できる{" "}<code>kworker/N:M</code>{" "}プロセス群がこれにあたります。{" "}</p>
{" "}
<h3 id="49-割り込み例外からの復帰" tabIndex={-1}>4.9 割り込み・例外からの復帰</h3>
{" "}
<p>{" "}割り込みハンドラの実行が終わると、カーネルは以下を確認してから制御をユーザー空間へ戻します。{" "}</p>
{" "}
<ul><li>ネストした割り込みハンドラの再開処理</li><li>カーネルプリエンプションが必要か（第7部で詳述）</li><li>{" "}ユーザーモードへ戻る場合、再スケジューリングが必要か、保留中のシグナルがあるか{" "}</li></ul>
{" "}
<hr />
{" "}
<h2 id="第5部カーネル同期原著-ch5-kernel-synchronization" tabIndex={-1}>{" "}第5部：カーネル同期（原著 Ch.5 Kernel Synchronization）{" "}</h2>
{" "}
<h3 id="51-なぜ同期が必要か" tabIndex={-1}>5.1 なぜ同期が必要か</h3>
{" "}
<p>{" "}リエントラントカーネルでは、複数のCPU（マルチプロセッサ）や、割り込み・例外によるネスト実行により、<strong>同じデータ構造に複数の実行文脈が同時にアクセスしうる</strong>状況が常態化しています。このとき適切な保護がなければ「競合状態（レースコンディション）」によるデータ破壊が発生します。{" "}</p>
{" "}
<h3 id="52-同期プリミティブ" tabIndex={-1}>5.2 同期プリミティブ</h3>
{" "}
<p>原著5.2節が解説する主要な同期機構は、現代のカーネルでも基本的に健在です。</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">機構</th><th scope="col">特徴</th><th scope="col">適した場面</th></tr></thead><tbody><tr className="odd"><td>Per-CPU変数</td><td>{" "}そもそも共有しない。CPUごとに独立したデータを持たせることで同期コストをゼロにする{" "}</td><td>統計カウンタなど</td></tr><tr className="even"><td>アトミック操作</td><td>{" "}<code>atomic_t</code>{" "}型に対する加算・減算などをCPU命令レベルで不可分に行う{" "}</td><td>単純なカウンタ</td></tr><tr className="odd"><td>メモリバリア</td><td>{" "}コンパイラ・CPUによる命令並べ替えを制御し、他CPUから見た書き込み順序を保証する{" "}</td><td>ロックフリーアルゴリズム</td></tr><tr className="even"><td>スピンロック</td><td>{" "}ロック取得までCPUをビジーウェイト（回転）させる。短時間だけ保持するロックに向く{" "}</td><td>割り込みコンテキストでも使える短時間ロック</td></tr><tr className="odd"><td>セマフォ</td><td>ロック取得できない場合、プロセスをスリープさせる</td><td>長時間保持しうるロック（プロセスコンテキストのみ）</td></tr><tr className="even"><td>Seqlock</td><td>{" "}読み手は再試行前提で高速に読み、書き手を優先する。読み手が圧倒的多数の場合に有効{" "}</td><td><code>jiffies</code>{" "}の読み取りなど</td></tr><tr className="odd"><td>RCU (Read-Copy-Update)</td><td>{" "}読み手はロック不要（ほぼゼロコスト）、更新は新バージョンを作成してから安全なタイミングで旧バージョンを回収する{" "}</td><td>読み取りが圧倒的に多いデータ構造（ルーティングテーブル等）</td></tr><tr className="even"><td>Completion</td><td>{" "}あるタスクの完了を別のタスクが待つための軽量な同期プリミティブ{" "}</td><td>初期化処理の待ち合わせ</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-12" />
{" "}
<h3 id="rcuread-copy-updateの考え方" tabIndex={-1}>RCU（Read-Copy-Update）の考え方</h3>
{" "}
<p>{" "}原著5.2.7節でも紹介されるRCUは、2002年10月にLinuxカーネルへ導入されて以来、Linuxの並行性処理を語る上で欠かせない技術に成長しました。RCUの核心的な発想は「読み手はロックを一切取らず、更新者が新しいバージョンのデータ構造を作成し、既存の読み手が全員読み終わるのを待ってから古いバージョンを解放する」というものです。{" "}</p>
{" "}
<Diagram id="diag-13" />
{" "}
<p>{" "}<strong>出典</strong>: Paul E. McKenney, Jonathan Walpole, &quot;What is RCU, Fundamentally?&quot; (LWN.net) —{" "}<a href="https://lwn.net/Articles/262464/">https://lwn.net/Articles/262464/</a>{" "}／ &quot;A Tour Through RCU&apos;s Requirements&quot; (The Linux Kernel Documentation) —{" "}<a href="https://docs.kernel.org/RCU/Design/Requirements/Requirements.html">https://docs.kernel.org/RCU/Design/Requirements/Requirements.html</a>{" "}</p>
{" "}
<h3 id="5354-使い分けと典型的な保護パターン" tabIndex={-1}>{" "}5.3〜5.4 使い分けと典型的な保護パターン{" "}</h3>
{" "}
<p>{" "}原著5.3節は「どのデータ構造をどの同期プリミティブで守るべきか」を、アクセス元（例外／割り込み／遅延処理）の組み合わせごとに場合分けして詳述しています。原著5.4節で紹介される<strong>ビッグカーネルロック（BKL: Big Kernel Lock）</strong>{" "}は、2.6系初期に残っていた「カーネル全体を1本の粗いロックで保護する」歴史的な遺物でしたが、2011年リリースのLinux 2.6.39で完全に撤廃されました。BKL撤廃は、より細粒度のロック（per-subsystemロック、RCU）へ置き換える約十年がかりの取り組みの集大成であり、Linuxのマルチコアスケーラビリティ向上における最重要マイルストーンの一つとされています。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}カーネル空間に限らず、アプリケーション開発でも「読み取りが多く書き込みが稀」なデータ構造にはRCU的発想（コピーオンライト＋アトミックなポインタ差し替え）が有効です。例えば設定のホットリロードや、参照カウント付き不変オブジェクトの置き換えパターンは、ユーザー空間の並行プログラミングでも頻出します。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第6部タイミング計測原著-ch6-timing-measurements" tabIndex={-1}>{" "}第6部：タイミング計測（原著 Ch.6 Timing Measurements）{" "}</h2>
{" "}
<h3 id="61-クロックとタイマー回路" tabIndex={-1}>6.1 クロックとタイマー回路</h3>
{" "}
<p>原著6.1節は、x86ハードウェアが提供する複数の時刻源を紹介します。</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">デバイス</th><th scope="col">特徴</th></tr></thead><tbody><tr className="odd"><td>RTC (Real Time Clock)</td><td>バッテリーバックアップされ、電源オフ中も時刻を保持する</td></tr><tr className="even"><td>TSC (Time Stamp Counter)</td><td>{" "}CPUクロックごとにインクリメントされる高精度カウンタ。高頻度サンプリングに使われる{" "}</td></tr><tr className="odd"><td>PIT (Programmable Interval Timer)</td><td>伝統的な周期割り込み生成デバイス（レガシー）</td></tr><tr className="even"><td>HPET (High Precision Event Timer)</td><td>PITより高精度なタイマー</td></tr><tr className="odd"><td>ローカルAPICタイマー</td><td>CPUコアごとに独立して動作するタイマー</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="62-linuxのタイムキーピングアーキテクチャ" tabIndex={-1}>{" "}6.2 Linuxのタイムキーピングアーキテクチャ{" "}</h3>
{" "}
<p>{" "}原著が解説する{" "}<code>jiffies</code>（カーネル起動からの周期的タイマー割り込み回数を数えるグローバル変数）は今も存在しますが、現代のカーネルは<code>hrtimer</code>（高解像度タイマー）サブシステムを中心に据えており、<code>jiffies</code>{" "}の粒度（伝統的に100Hz〜1000Hz）に縛られないナノ秒単位のタイマー精度を実現しています。{" "}</p>
{" "}
<p>{" "}<strong>tickless kernel（NO_HZ）</strong>: 原著が前提とする「一定間隔でタイマー割り込みが発生し続ける」設計は、現代では大きく変化しています。CPUがアイドル状態やユーザー空間で単一タスクを実行中の場合、不要な定期タイマー割り込みを止める{" "}<code>NO_HZ_IDLE</code>{" "}/{" "}<code>NO_HZ_FULL</code>{" "}モードにより、消費電力削減とレイテンシ改善を両立しています。{" "}</p>
{" "}
<Diagram id="diag-14" />
{" "}
<h3 id="6366-時刻更新統計ソフトウェアタイマー" tabIndex={-1}>{" "}6.3〜6.6 時刻更新・統計・ソフトウェアタイマー{" "}</h3>
{" "}
<p>{" "}原著は{" "}<code>sys_time()</code>,{" "}<code>sys_gettimeofday()</code>,{" "}<code>setitimer()</code>,{" "}<code>alarm()</code>, POSIXタイマーなどのシステムコール群を解説します。現代の開発では、これらの低レベルAPIの代わりに{" "}<code>clock_gettime(CLOCK_MONOTONIC, ...)</code>{" "}や{" "}<code>timerfd_create()</code>{" "}を使うのが一般的です。動的タイマー（ソフトウェアタイマー）は{" "}<code>add_timer()</code>/<code>del_timer()</code>{" "}から{" "}<code>timer_list</code>{" "}を使う実装へと発展し、<code>nanosleep()</code>{" "}の内部実装にも使われています。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}アプリケーションで経過時間を計測する際は、システム時刻の変更（NTP補正やユーザーによる手動変更）の影響を受けない{" "}<code>CLOCK_MONOTONIC</code>{" "}を使用してください。壁時計時刻{" "}<code>CLOCK_REALTIME</code>{" "}はログのタイムスタンプには適していますが、タイムアウト処理や経過時間計測には不向きです。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第7部プロセススケジューリング原著-ch7-process-scheduling" tabIndex={-1}>{" "}第7部：プロセススケジューリング（原著 Ch.7 Process Scheduling）{" "}</h2>
{" "}
<h3 id="7172-スケジューリングポリシー" tabIndex={-1}>7.1〜7.2 スケジューリングポリシー</h3>
{" "}
<p>{" "}原著が解説する2.6初期のスケジューラは、優先度配列を使った<strong>O(1)スケジューラ</strong>（Ingo Molnarによる設計）でした。「動的優先度」「平均スリープ時間」「アクティブ配列／期限切れ配列」といった原著7.2節の概念は、まさにこのO(1)スケジューラ時代のものです。しかし、このスケジューラは公平性の保証が弱く、ヒューリスティックのチューニングが職人芸的だったため、2007年リリースのLinux 2.6.23で<strong>CFS（Completely Fair Scheduler、Ingo Molnar設計）</strong>に置き換えられました。{" "}</p>
{" "}
<p>{" "}さらに2023年、Linux 6.6で CFS は{" "}<strong>EEVDF（Earliest Eligible Virtual Deadline First）</strong>{" "}に置き換わりました（Peter Zijlstra設計）。原著出版から20年の間に、Linuxのスケジューラ設計思想は大きく2度の世代交代を経ています。{" "}</p>
{" "}
<Diagram id="diag-15" />
{" "}
<p>{" "}<strong>出典</strong>: Jonathan Corbet, &quot;An EEVDF CPU scheduler for Linux&quot; (LWN.net, 2023年3月) —{" "}<a href="https://lwn.net/Articles/925371/">https://lwn.net/Articles/925371/</a>{" "}／ The Linux Kernel Documentation &quot;EEVDF Scheduler&quot; —{" "}<a href="https://docs.kernel.org/scheduler/sched-eevdf.html">https://docs.kernel.org/scheduler/sched-eevdf.html</a>{" "}</p>
{" "}
<h3 id="cfsの考え方原著執筆後に主流化した設計" tabIndex={-1}>{" "}CFSの考え方（原著執筆後に主流化した設計）{" "}</h3>
{" "}
<p>{" "}CFSは「各プロセスが消費したCPU時間を優先度で重み付けした<strong>仮想実行時間（vruntime）</strong>」を赤黒木（red-black tree）で管理し、常にvruntimeが最小のプロセスを次に実行する、というシンプルな原理で「完全な公平性」を目指しました。ただし、この「最小vruntimeを選ぶ」という方式には、レイテンシが重要なタスク（ネットワークI/O待ちから起床したタスクなど）に「緊急性」の概念がないという弱点がありました。{" "}</p>
{" "}
<h3 id="eevdfへの進化" tabIndex={-1}>EEVDFへの進化</h3>
{" "}
<p>{" "}EEVDFは、CFSのvruntimeモデルを土台にしつつ、各タスクに「<strong>仮想デッドライン（virtual deadline）</strong>」という概念を追加しました。「公平に扱われるべき権利（eligible）」を持つタスクの中から、最も早いデッドラインを持つタスクを選ぶことで、単純な「最小vruntime選択」よりも緊急性の高いタスクへの応答性を改善しています。{" "}</p>
{" "}
<Diagram id="diag-16" />
{" "}
<p>{" "}<strong>出典</strong>: &quot;EEVDF&quot; (Linux Kernel Internals) —{" "}<a href="https://kernel-internals.org/sched/eevdf/">https://kernel-internals.org/sched/eevdf/</a>{" "}／ Peter Zijlstra による原論文ベースの実装は1995年の学術論文 &quot;Earliest Eligible Virtual Deadline First&quot; (Ion Stoica, Hussein Abdel-Wahab) に由来{" "}</p>
{" "}
<h3 id="7374-スケジューラが使うデータ構造と関数" tabIndex={-1}>{" "}7.3〜7.4 スケジューラが使うデータ構造と関数{" "}</h3>
{" "}
<p>{" "}原著が解説する{" "}<strong>runqueue（実行キュー）</strong>{" "}はCPUごとに1つ存在し、実行可能なプロセスの集合を管理します（現代でも赤黒木構造は健在）。<code>schedule()</code>{" "}関数は、次に実行すべきタスクを選択しコンテキストスイッチを実際に発生させる中心的な関数です。<code>try_to_wake_up()</code>{" "}はスリープ中のタスクを実行可能状態に戻す処理を担当します。{" "}</p>
{" "}
<h3 id="75-マルチプロセッサでの負荷分散" tabIndex={-1}>7.5 マルチプロセッサでの負荷分散</h3>
{" "}
<p>{" "}原著7.5節が解説する<strong>スケジューリングドメイン</strong>の概念（物理的なCPUトポロジー：SMT兄弟コア、同一ソケット内のコア、NUMAノード間、といった階層構造を意識した負荷分散）は、現代のスケジューラでも中心的な設計原則として引き継がれています。<code>load_balance()</code>{" "}に相当する処理は、各階層で「タスクをどのCPUへ移動すべきか」を判断します。{" "}</p>
{" "}
<h3 id="2024年以降sched_extebpfで作るカスタムスケジューラ" tabIndex={-1}>{" "}2024年以降：sched_ext（eBPFで作るカスタムスケジューラ）{" "}</h3>
{" "}
<p>{" "}Linux 6.12（2024年11月）でマージされた{" "}<strong>sched_ext</strong>{" "}は、eBPFプログラムとしてスケジューリングポリシーそのものをユーザー空間から差し替え可能にする仕組みです。ゲーム機（SteamOS）向けのレイテンシ最適化スケジューラ{" "}<code>scx_lavd</code>{" "}や、データセンター向けの{" "}<code>scx_rusty</code>{" "}など、ワークロード特化型スケジューラをカーネル再コンパイルなしに試せるようになりました。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}<code>cat /proc/sys/kernel/sched_latency_ns</code>{" "}や{" "}<code>chrt</code>,{" "}<code>nice</code>/<code>renice</code>{" "}コマンドで確認・調整できるスケジューラパラメータは、レイテンシ重視のワークロード（オーディオ処理、ゲーム、取引システム）とスループット重視のワークロード（バッチ処理）で最適値が異なります。本番環境でのチューニングは、まず{" "}<code>perf sched</code>{" "}や{" "}<code>trace-cmd</code>{" "}によるプロファイリングでボトルネックを特定してから行うべきです。{" "}</p>{" "}</div>{" "}</div>
{" "}
<h3 id="76-スケジューリング関連のシステムコール" tabIndex={-1}>{" "}7.6 スケジューリング関連のシステムコール{" "}</h3>
{" "}
<p>{" "}<code>nice()</code>,{" "}<code>sched_setaffinity()</code>（CPUアフィニティ設定）,{" "}<code>sched_setscheduler()</code>（リアルタイムポリシー設定）などは原著の時代から変わらず提供され続けています。リアルタイムプロセス向けには{" "}<code>SCHED_FIFO</code>,{" "}<code>SCHED_RR</code>{" "}に加え、決定論的なレイテンシ保証を提供する{" "}<code>SCHED_DEADLINE</code>{" "}ポリシーが2.6.34以降追加されています。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="第8部メモリ管理原著-ch8-memory-management" tabIndex={-1}>{" "}第8部：メモリ管理（原著 Ch.8 Memory Management）{" "}</h2>
{" "}
<h3 id="81-ページフレーム管理" tabIndex={-1}>8.1 ページフレーム管理</h3>
{" "}
<p>{" "}物理メモリは固定サイズの<strong>ページフレーム</strong>単位で管理されます。原著8.1節が解説する主要な概念は次の通りです。{" "}</p>
{" "}
<ul><li>{" "}<strong>ページディスクリプタ</strong>: 各物理ページフレームに対応する{" "}<code>struct page</code>{" "}構造体。使用状況、参照カウント、所属するキャッシュなどを記録する。{" "}</li><li>{" "}<strong>NUMA（Non-Uniform Memory Access）</strong>: マルチソケットサーバーで、CPUごとに「近い」メモリと「遠い」メモリが存在するアーキテクチャ。原著執筆時点では先進的な話題でしたが、現代のクラウドインスタンス・データセンターサーバーでは標準的な構成です。{" "}</li><li>{" "}<strong>メモリゾーン</strong>:{" "}<code>ZONE_DMA</code>（古いデバイスがアクセスできる低位アドレス）、<code>ZONE_NORMAL</code>、<code>ZONE_HIGHMEM</code>（32bit限定）など、用途別にメモリ領域を区分する仕組み。64bit環境では{" "}<code>ZONE_HIGHMEM</code>{" "}は事実上不要になっています。{" "}</li></ul>
{" "}
<h3 id="バディシステムアロケータ" tabIndex={-1}>バディシステムアロケータ</h3>
{" "}
<p>{" "}物理ページフレームの割り当て・解放を効率的に行うための古典的アルゴリズムです。原著8.1.7節が解説するこの仕組みは、現代のカーネルでも変わらず中核アルゴリズムとして使われています。{" "}</p>
{" "}
<Diagram id="diag-17" />
{" "}
<h3 id="82-メモリ領域管理スラブアロケータ" tabIndex={-1}>8.2 メモリ領域管理：スラブアロケータ</h3>
{" "}
<p>{" "}バディシステムはページ単位（4KB刻み）の粗い粒度でしか割り当てできません。カーネル内部では{" "}<code>task_struct</code>{" "}や{" "}<code>inode</code>{" "}のように、数十〜数百バイトの小さなオブジェクトを頻繁に確保・解放する必要があります。この用途向けに、原著8.2節は<strong>スラブアロケータ（Slab Allocator）</strong>を解説します。{" "}</p>
{" "}
<Diagram id="diag-18" />
{" "}
<p>{" "}原著が解説するオリジナルのスラブアロケータ（Solaris由来のアイデア、Sun MicrosystemsのJeff Bonwickが考案）は、その後{" "}<strong>SLUB</strong>（現在のデフォルト）や{" "}<strong>SLOB</strong>（組み込み向け軽量版、後に廃止）といった代替実装に置き換わりました。SLUBはマルチコア環境でのスケーラビリティを重視し、per-CPUキャッシュを活用してロック競合を減らす設計です。<code>/proc/slabinfo</code>{" "}や{" "}<code>slabtop</code>{" "}コマンドで、現在どのキャッシュがどれだけメモリを消費しているか確認できます。{" "}</p>
{" "}
<h3 id="83-非連続メモリ領域vmalloc" tabIndex={-1}>8.3 非連続メモリ領域（vmalloc）</h3>
{" "}
<p>{" "}物理的に連続していないページフレームを、仮想アドレス空間上では連続して見えるようにマッピングする仕組みが{" "}<code>vmalloc()</code>{" "}です。大きなサイズを要求する際、物理メモリの断片化によりバディシステムで連続領域を確保できない場合に使われます（<code>kmalloc()</code>{" "}が物理的に連続したメモリを返すのに対し、<code>vmalloc()</code>{" "}は仮想的にのみ連続）。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}カーネルモジュール開発では、小さく頻繁に確保・解放するオブジェクトには{" "}<code>kmalloc()</code>/専用スラブキャッシュ、大きな一括確保には{" "}<code>vmalloc()</code>{" "}を使い分けるのが定石です。ユーザー空間の類推でいえば、<code>kmalloc()</code>{" "}はスタック的に高速だがサイズ制約があり、<code>vmalloc()</code>{" "}はヒープ的に柔軟だがTLBミスのコストが相対的に高い、というトレードオフになります。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第9部プロセスアドレス空間原著-ch9-process-address-space" tabIndex={-1}>{" "}第9部：プロセスアドレス空間（原著 Ch.9 Process Address Space）{" "}</h2>
{" "}
<h3 id="9192-プロセスのアドレス空間とメモリディスクリプタ" tabIndex={-1}>{" "}9.1〜9.2 プロセスのアドレス空間とメモリディスクリプタ{" "}</h3>
{" "}
<p>{" "}各プロセスは、独自の仮想アドレス空間（<code>mm_struct</code>、メモリディスクリプタ）を持ちます。カーネルスレッドは通常のユーザー空間を持たないため、直前に実行していた通常プロセスの{" "}<code>mm_struct</code>{" "}を「借用」する最適化（<code>active_mm</code>）が行われます。{" "}</p>
{" "}
<h3 id="93-メモリ領域vma-virtual-memory-area" tabIndex={-1}>{" "}9.3 メモリ領域（VMA: Virtual Memory Area）{" "}</h3>
{" "}
<p>{" "}プロセスのアドレス空間は、目的別に区切られた「メモリ領域（VMA）」の集合として管理されます。典型的なプロセスのアドレス空間レイアウトは次のようになります。{" "}</p>
{" "}
<Diagram id="diag-19" />
{" "}
<p>{" "}各VMAは、開始・終了アドレス、アクセス権（読み取り/書き込み/実行）、対応するファイル（ファイルマップの場合）などのメタデータを持ちます。<code>find_vma()</code>{" "}は指定アドレスに最も近いVMAを、<code>get_unmapped_area()</code>{" "}は新規マッピング用の空き領域を探索する関数です。{" "}</p>
{" "}
<h3 id="94-ページフォルト例外ハンドラ" tabIndex={-1}>9.4 ページフォルト例外ハンドラ</h3>
{" "}
<p>{" "}<strong>ページフォルト</strong>は、CPUがページテーブルを参照した際に「そのページが現在物理メモリ上に存在しない、またはアクセス権限がない」ことを検出して発生させる例外です。原著9.4節は、この例外を「正常系」と「異常系」に分類します。{" "}</p>
{" "}
<Diagram id="diag-20" />
{" "}
<p>{" "}<strong>デマンドページング（Demand Paging）</strong>: プロセス生成やファイルmmap時点では実際のメモリ確保・ディスク読み込みは行わず、実際にそのページへアクセスがあって初めて物理メモリを割り当てる遅延評価戦略。メモリ効率と起動速度を大きく改善します。{" "}</p>
{" "}
<p>{" "}<strong>Copy-On-Write（COW）</strong>:{" "}<code>fork()</code>{" "}直後、親子プロセスは物理的に同じページを共有し（読み取り専用としてマップ）、どちらかが書き込もうとした瞬間にページフォルトが発生し、そこで初めて実際のコピーが行われる最適化。第3部で触れた{" "}<code>fork()</code>{" "}の高速化の正体はこれです。{" "}</p>
{" "}
<h3 id="9596-アドレス空間の生成削除とヒープ管理" tabIndex={-1}>{" "}9.5〜9.6 アドレス空間の生成・削除とヒープ管理{" "}</h3>
{" "}
<p>{" "}<code>execve()</code>{" "}実行時にアドレス空間が新規作成され（第20部で詳述）、プロセス終了時に破棄されます。ヒープの伸長は伝統的に{" "}<code>brk()</code>/<code>sbrk()</code>{" "}システムコールで行われますが、<code>malloc()</code>{" "}の内部実装（glibcのptmallocなど）は、小さな確保には{" "}<code>brk()</code>{" "}を、大きな確保には{" "}<code>mmap()</code>（匿名マッピング）を使い分けています。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}メモリリークの調査では、<code>/proc/&lt;pid&gt;/smaps</code>{" "}や{" "}<code>pmap -x &lt;pid&gt;</code>{" "}でVMAごとのメモリ使用量を可視化できます。「Heap」セグメントだけでなく「anon」（匿名mmap領域）の肥大化も見逃さないようにしてください。大きなオブジェクトはmalloc実装がmmapで確保するため、ヒープではなく匿名マッピング領域に現れます。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第10部システムコール原著-ch10-system-calls" tabIndex={-1}>{" "}第10部：システムコール（原著 Ch.10 System Calls）{" "}</h2>
{" "}
<h3 id="101102-posix-apiとシステムコールハンドラ" tabIndex={-1}>{" "}10.1〜10.2 POSIX APIとシステムコールハンドラ{" "}</h3>
{" "}
<p>{" "}<strong>システムコール</strong>は、ユーザー空間のプログラムがカーネルへ処理を依頼するための、唯一の正規の入り口です。原著は、glibcなどのライブラリが提供する「POSIX API」（例:{" "}<code>fopen()</code>）と、その内部で実際に呼ばれる「生のシステムコール」（例:{" "}<code>open()</code>）を区別して説明します。1つのライブラリ関数が複数のシステムコールを組み合わせて実装されていることもあれば、逆に複数のライブラリ関数が同じシステムコールを共有していることもあります。{" "}</p>
{" "}
<h3 id="103-システムコールの発行終了" tabIndex={-1}>10.3 システムコールの発行・終了</h3>
{" "}
<p>{" "}x86における伝統的なシステムコール発行方法は{" "}<code>int $0x80</code>{" "}ソフトウェア割り込みでした。原著が解説するこの方式は、割り込みディスクリプタテーブル経由で処理されるため相応のオーバーヘッドがあります。これを高速化するために導入されたのが{" "}<code>sysenter</code>/<code>sysexit</code>{" "}命令（32bit）、そして64bit環境の{" "}<code>syscall</code>/<code>sysret</code>{" "}命令です。{" "}</p>
{" "}
<Diagram id="diag-21" />
{" "}
<p>{" "}原著が触れる{" "}<strong>vsyscallページ</strong>{" "}は、頻繁に呼ばれる一部のシステムコール（<code>gettimeofday()</code>{" "}など）をユーザー空間内の固定アドレスにマッピングし、モード切替なしで実行できるようにする最適化でした。セキュリティ上の懸念（固定アドレスがROP攻撃の標的になりやすい）から、現代のカーネルは{" "}<strong>vDSO（virtual Dynamic Shared Object）</strong>{" "}という、ASLR（アドレス空間配置のランダム化）に対応した後継の仕組みに置き換えています。{" "}</p>
{" "}
<h3 id="104-パラメータの受け渡しと検証" tabIndex={-1}>10.4 パラメータの受け渡しと検証</h3>
{" "}
<p>{" "}システムコールに渡されたユーザー空間のポインタは、カーネルが信頼してそのまま使うことは絶対にできません。原著10.4節が解説する<strong>アクセス検証</strong>（<code>copy_from_user()</code>,{" "}<code>copy_to_user()</code>{" "}を通じたポインタの正当性チェック）は、Linuxのセキュリティモデルの基本です。<strong>例外テーブル（Exception Table）</strong>は、ユーザーポインタの不正アクセスで発生したページフォルトを、システムコール中断ではなく「エラーコードを返す」形へ変換するための、コンパイル時に生成される特殊なメタデータです。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}カーネルモジュールやシステムコールを書く際、ユーザー空間から渡されたポインタへ直接{" "}<code>*ptr</code>{" "}のようにアクセスすることは絶対に避け、必ず{" "}<code>copy_from_user()</code>/<code>copy_to_user()</code>（あるいはBPFの{" "}<code>bpf_probe_read_user()</code>{" "}のような安全なヘルパー）を経由してください。これを怠ると、悪意あるユーザー空間プログラムに任意のカーネルメモリ読み書きを許してしまう深刻な脆弱性になります。{" "}</p>{" "}</div>{" "}</div>
{" "}
<h3 id="105-カーネルラッパールーチン" tabIndex={-1}>10.5 カーネルラッパールーチン</h3>
{" "}
<p>{" "}多くのシステムコールは、アーキテクチャ非依存の実処理関数（<code>sys_read()</code>{" "}など）と、アーキテクチャ依存の薄いラッパー（レジスタからの引数取り出しなど）に分離されています。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="第11部シグナル原著-ch11-signals" tabIndex={-1}>第11部：シグナル（原著 Ch.11 Signals）</h2>
{" "}
<h3 id="111-シグナルの役割" tabIndex={-1}>11.1 シグナルの役割</h3>
{" "}
<p>{" "}シグナルは、プロセスに対して非同期にイベントを通知する、Unix系OS最古のIPC（プロセス間通信）機構の一つです。<code>kill -9</code>{" "}の{" "}<code>SIGKILL</code>、Ctrl+Cで送られる{" "}<code>SIGINT</code>、不正メモリアクセスで発生する{" "}<code>SIGSEGV</code>{" "}など、多くの開発者が日常的に触れる仕組みです。{" "}</p>
{" "}
<p>{" "}原著11.1.2節が触れる「POSIXシグナルとマルチスレッドアプリケーション」の関係は現代でも重要な注意点です。シグナルはプロセス全体（スレッドグループ）に配送されることもあれば、特定の1スレッドに配送されることもあり、<code>pthread_sigmask()</code>{" "}によるスレッドごとのシグナルマスク制御が必要になります。{" "}</p>
{" "}
<h3 id="112113-シグナルの生成と配送" tabIndex={-1}>11.2〜11.3 シグナルの生成と配送</h3>
{" "}
<Diagram id="diag-22" />
{" "}
<p>{" "}原著11.3.2節が解説する「シグナルハンドラの起動」は、カーネルがユーザースタック上に<strong>シグナルフレーム</strong>を構築し、あたかもユーザープログラムが自発的にハンドラ関数を呼び出したかのように制御を渡す、という巧妙な仕組みです。ハンドラの実行が終わると、<code>sigreturn</code>{" "}システムコールによって元のコンテキストへ復帰します。{" "}</p>
{" "}
<h3 id="システムコールの再実行" tabIndex={-1}>システムコールの再実行</h3>
{" "}
<p>{" "}シグナルハンドラの実行によって中断されたシステムコール（<code>read()</code>{" "}の途中でシグナルを受信した場合など）は、<code>SA_RESTART</code>{" "}フラグの有無によって「自動的に再実行される」か「<code>EINTR</code>{" "}エラーを返す」かが決まります。原著11.3.3節が説明するこの挙動は、堅牢なシステムコールラッパーを書く上で今も注意すべきポイントです。{" "}</p>
{" "}
<h3 id="114-シグナル関連のシステムコール" tabIndex={-1}>11.4 シグナル関連のシステムコール</h3>
{" "}
<p>{" "}<code>kill()</code>,{" "}<code>sigaction()</code>（シグナルハンドラの設定）,{" "}<code>sigprocmask()</code>（ブロックするシグナル集合の変更）,{" "}<code>sigsuspend()</code>{" "}などが原著で解説されます。リアルタイムシグナル（<code>SIGRTMIN</code>〜<code>SIGRTMAX</code>）は、標準シグナルと異なりキューイングされ、失われることがない拡張です。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}シグナルハンドラの中では、<code>printf()</code>{" "}のような非async-signal-safeな関数の呼び出しを避けてください。ハンドラが割り込んだタイミングでロックを保持していた場合、ハンドラ内で同じロックを取ろうとしてデッドロックする典型的なバグパターンがあります。複雑な処理が必要な場合は、<code>signalfd()</code>{" "}でシグナルをファイルディスクリプタとして扱い、通常のイベントループ（<code>epoll</code>）で処理する設計が推奨されます。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第12部仮想ファイルシステムvfs原著-ch12-the-virtual-filesystem" tabIndex={-1}>{" "}第12部：仮想ファイルシステム（VFS）（原著 Ch.12 The Virtual Filesystem）{" "}</h2>
{" "}
<h3 id="121-vfsの役割" tabIndex={-1}>12.1 VFSの役割</h3>
{" "}
<p>{" "}Linuxは ext4, XFS, Btrfs, NFS, FAT32 など多種多様なファイルシステムを、アプリケーションからは<strong>同一のシステムコールインターフェース</strong>（<code>open()</code>,{" "}<code>read()</code>,{" "}<code>write()</code>{" "}など）で扱えるようにしています。これを実現しているのが<strong>VFS（Virtual Filesystem Switch）</strong>という抽象化レイヤーです。原著12.1節は、この「共通ファイルモデル（Common File Model）」の設計思想を解説します。{" "}</p>
{" "}
<Diagram id="diag-23" />
{" "}
<h3 id="122-vfsの4大オブジェクト" tabIndex={-1}>12.2 VFSの4大オブジェクト</h3>
{" "}
<p>{" "}原著12.2節が解説するVFSの中核データ構造は、現代のカーネルでも変わらず健在です。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">オブジェクト</th><th scope="col">役割</th></tr></thead><tbody><tr className="odd"><td>スーパーブロックオブジェクト</td><td>{" "}マウントされたファイルシステム全体のメタデータ（種類、サイズ、マウントオプション）{" "}</td></tr><tr className="even"><td>inodeオブジェクト</td><td>{" "}個々のファイル・ディレクトリのメタデータ（サイズ、権限、タイムスタンプ、データブロック位置）{" "}</td></tr><tr className="odd"><td>ファイルオブジェクト</td><td>{" "}プロセスが「開いている」ファイルの状態（現在のオフセット、アクセスモード）{" "}</td></tr><tr className="even"><td>dentryオブジェクト（ディレクトリエントリ）</td><td>{" "}パス名の構成要素とinodeの対応関係。ディレクトリ階層のキャッシュ{" "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-24" />
{" "}
<p>{" "}<strong>dentryキャッシュ（dcache）</strong>は、パス名からinodeへの変換結果をキャッシュし、繰り返し行われるファイルパス解決を高速化します。<code>ls</code>,{" "}<code>find</code>{" "}のようなコマンドの体感速度が、初回実行より2回目以降の方が速いのは、多くの場合このキャッシュ効果です。{" "}</p>
{" "}
<h3 id="123124-ファイルシステムの種類とマウント" tabIndex={-1}>{" "}12.3〜12.4 ファイルシステムの種類とマウント{" "}</h3>
{" "}
<p>{" "}原著12.4.1節が解説する<strong>名前空間（namespace）</strong>は、当時は「プロセスごとに異なるマウントポイント構成を持てる」という比較的マニアックな機能でしたが、2013年前後からDockerなどのコンテナ技術がこの仕組み（マウント名前空間）を土台に構築されたことで、Linuxカーネルの中でも特に注目される機能へと変貌しました（詳細は第22部）。{" "}</p>
{" "}
<p>{" "}<strong>特殊ファイルシステム</strong>:{" "}<code>procfs</code>（<code>/proc</code>、実行中プロセスの情報をファイルとして公開）、<code>sysfs</code>（<code>/sys</code>、デバイスモデルの情報を公開）、<code>tmpfs</code>（メモリ上に存在する一時ファイルシステム）などは、実データを持たず、カーネル内部の状態を動的に生成してファイルのように見せる「疑似ファイルシステム」です。{" "}</p>
{" "}
<h3 id="125-パス名の探索pathname-lookup" tabIndex={-1}>12.5 パス名の探索（Pathname Lookup）</h3>
{" "}
<p>{" "}<code>/home/user/document.txt</code>{" "}のようなパスを解決する際、カーネルはルートから順に各コンポーネントをdentryキャッシュ・実ディスクと照合しながら辿ります。{" "}</p>
{" "}
<Diagram id="diag-25" />
{" "}
<p>{" "}シンボリックリンクの解決では、無限ループ防止のための再帰深度制限（<code>MAXSYMLINKS</code>）が設けられています。{" "}</p>
{" "}
<h3 id="126127-vfsシステムコールの実装とファイルロック" tabIndex={-1}>{" "}12.6〜12.7 VFSシステムコールの実装とファイルロック{" "}</h3>
{" "}
<p>{" "}<code>open()</code>,{" "}<code>read()</code>,{" "}<code>write()</code>,{" "}<code>close()</code>{" "}の各システムコールが、VFS層でどのように具体的なファイルシステムのメソッド（<code>file_operations</code>{" "}構造体を通じて）に委譲されるかが原著12.6節で解説されます。原著12.7節のファイルロックには、伝統的な{" "}<code>flock()</code>（ファイル全体をロック、BSD由来）と{" "}<code>fcntl()</code>（バイト範囲ロック、POSIX由来）の2系統があり、両者の意味論の違い（プロセス単位かファイルディスクリプタ単位か等）は現在も互換性トラブルの原因になりやすいポイントです。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}複数プロセスから同じファイルへロックをかける場合、<code>flock()</code>{" "}と{" "}<code>fcntl()</code>{" "}を混在させないでください。両者は独立したロック機構であり、片方でロックを取っても、もう片方の呼び出しからは「ロックされていない」ように見えるため、意図しない同時書き込みが発生します。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第13部ioアーキテクチャとデバイスドライバ原著-ch13-io-architecture-and-device-drivers" tabIndex={-1}>{" "}第13部：I/Oアーキテクチャとデバイスドライバ（原著 Ch.13 I/O Architecture and Device Drivers）{" "}</h2>
{" "}
<h3 id="131-ioアーキテクチャ" tabIndex={-1}>13.1 I/Oアーキテクチャ</h3>
{" "}
<p>{" "}CPUがデバイスと通信する方法は、大きく「I/Oポート（<code>in</code>/<code>out</code>{" "}命令でアクセスする専用アドレス空間）」と「メモリマップドI/O（MMIO、通常のメモリアドレス空間の一部にデバイスレジスタをマッピング）」の2種類があります。現代のPCIeデバイスの多くはMMIOを使用しています。{" "}</p>
{" "}
<h3 id="132-デバイスドライバモデル" tabIndex={-1}>13.2 デバイスドライバモデル</h3>
{" "}
<p>{" "}原著13.2節が解説する<strong>sysfsファイルシステム</strong>と<strong>kobject</strong>の仕組みは、Linuxのデバイス管理の統一的な基盤として現在も中核を担っています。{" "}</p>
{" "}
<Diagram id="diag-26" />
{" "}
<p>{" "}<code>/sys</code>{" "}以下のディレクトリツリーは、このkobjectの階層構造をそのままファイルシステムとして可視化したものです。<code>udev</code>（現在は{" "}<code>systemd-udevd</code>{" "}に統合）は、この{" "}<code>sysfs</code>{" "}の変化（デバイスの抜き差し）をカーネルから{" "}<code>netlink</code>{" "}ソケット経由で受け取り、<code>/dev</code>{" "}以下のデバイスファイルを動的に生成する役割を担います。{" "}</p>
{" "}
<h3 id="133-デバイスファイル" tabIndex={-1}>13.3 デバイスファイル</h3>
{" "}
<p>{" "}原著13.3節は、デバイスファイル（<code>/dev/sda</code>,{" "}<code>/dev/tty0</code>{" "}など）の番号割り当て（メジャー番号・マイナー番号）と、<code>udev</code>{" "}による動的なデバイスファイル生成の仕組みを解説します。{" "}</p>
{" "}
<h3 id="134135-デバイスドライバの実装" tabIndex={-1}>13.4〜13.5 デバイスドライバの実装</h3>
{" "}
<p>{" "}<strong>ポーリングモード</strong>（CPUがデバイスの状態を繰り返し確認する）と<strong>割り込みモード</strong>（デバイスがCPUに通知する）の使い分け、<strong>DMA（Direct Memory Access）</strong>（CPUを介さずデバイスとメモリ間で直接データ転送する仕組み）は、原著13.4節の中心的なトピックです。DMAは、CPUがデータ転送を待つ無駄な時間を排除し、転送中もCPUが他の処理を実行できるようにする、パフォーマンス上重要な機構です。{" "}</p>
{" "}
<Diagram id="diag-27" />
{" "}
<p>{" "}キャラクタデバイスドライバ（原著13.5節）は、シーケンシャルなバイトストリームとしてアクセスされるデバイス（シリアルポート、キーボード等）向けのシンプルなインターフェースを提供します。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="第14部ブロックデバイスドライバ原著-ch14-block-device-drivers" tabIndex={-1}>{" "}第14部：ブロックデバイスドライバ（原著 Ch.14 Block Device Drivers）{" "}</h2>
{" "}
<h3 id="141142-ブロックデバイスの扱いとジェネリックブロック層" tabIndex={-1}>{" "}14.1〜14.2 ブロックデバイスの扱いとジェネリックブロック層{" "}</h3>
{" "}
<p>{" "}ブロックデバイス（ディスク）は、キャラクタデバイスと異なり「固定サイズのブロック単位でランダムアクセス可能」という特徴を持ちます。原著14.2節が解説する{" "}<strong>bio構造体（Block I/O）</strong>は、1回のI/O要求を表現するデータ構造で、複数のセグメント（メモリ上の分散したバッファ）をひとまとめにして1つのI/O要求として発行できるようにする仕組みです。{" "}</p>
{" "}
<h3 id="143-ioスケジューラ" tabIndex={-1}>14.3 I/Oスケジューラ</h3>
{" "}
<p>{" "}原著14.3.4節は、当時利用可能だった4種類のI/Oスケジューラ（elevator）を解説しています。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">I/Oスケジューラ（2005年当時）</th><th scope="col">特徴</th></tr></thead><tbody><tr className="odd"><td>Noop</td><td>{" "}並べ替えを行わず単純にキューイングするのみ。SSD等シーク時間が無視できるデバイス向け{" "}</td></tr><tr className="even"><td>CFQ (Completely Fair Queuing)</td><td>プロセスごとに公平にI/O帯域を割り当てる</td></tr><tr className="odd"><td>Deadline</td><td>各リクエストに期限を設け、飢餓状態を防ぐ</td></tr><tr className="even"><td>Anticipatory</td><td>直後に追加のI/O要求が来ることを見越して、あえて少し待つ</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}これらはすべて<strong>回転するディスク（HDD）のシーク時間最適化</strong>を主眼に設計されたスケジューラでした。しかし、SSD/NVMeストレージの普及によって前提が根本から変わりました。{" "}</p>
{" "}
<Diagram id="diag-28" />
{" "}
<p>{" "}<strong>blk-mq（マルチキューブロックレイヤー）</strong>への刷新は、原著が解説する「シングルキュー＋シングルロック」というブロックI/O層の根本設計を、マルチコアCPU・超高速NVMeデバイスの時代に合わせて全面的に書き直したものです。1つの共有キューがボトルネックになっていた問題を、CPUコアごと（あるいはハードウェアキューごと）に独立したキューを持たせることで解消しました。{" "}</p>
{" "}
<h3 id="144145-ブロックデバイスドライバの登録と初期化" tabIndex={-1}>{" "}14.4〜14.5 ブロックデバイスドライバの登録と初期化{" "}</h3>
{" "}
<p>{" "}原著14.4節が解説する「ディスクディスクリプタ（gendisk）の初期化」「リクエストキューの割り当て」「割り込みハンドラの設定」といったドライバ登録の流れは、blk-mq移行後も概念としては引き継がれていますが、具体的なAPI（<code>blk_mq_alloc_tag_set()</code>{" "}など）は大きく刷新されています。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}クラウドVMやコンテナホストでディスクI/O性能をチューニングする際は、まず{" "}<code>cat /sys/block/&lt;device&gt;/queue/scheduler</code>{" "}で現在有効なI/Oスケジューラを確認してください。NVMeデバイスでは多くの場合{" "}<code>none</code>（スケジューリングなし、blk-mqのマルチキューにハードウェア側で任せる）が最適ですが、単一のSATA SSD/HDDでは{" "}<code>mq-deadline</code>{" "}や{" "}<code>bfq</code>{" "}が有効なケースもあります。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第15部ページキャッシュ原著-ch15-the-page-cache" tabIndex={-1}>{" "}第15部：ページキャッシュ（原著 Ch.15 The Page Cache）{" "}</h2>
{" "}
<h3 id="151-ページキャッシュとは" tabIndex={-1}>15.1 ページキャッシュとは</h3>
{" "}
<p>{" "}ディスクI/Oはメモリアクセスに比べて桁違いに遅いため、Linuxは一度読み込んだファイルの内容を<strong>ページキャッシュ</strong>としてメモリ上に保持し、次回以降のアクセスをメモリ速度で処理できるようにしています。原著15.1節が解説する{" "}<code>address_space</code>{" "}オブジェクトは、1つのファイル（正確にはinode）に紐づくページキャッシュのページ群を管理する構造体です。{" "}</p>
{" "}
<p>{" "}原著が解説する<strong>radix tree</strong>（ページオフセットからページディスクリプタへの高速な検索木）は、現代のカーネルではより汎用的な{" "}<strong>XArray</strong>{" "}というデータ構造に置き換わっています（Linux 4.20、2018年、Matthew Wilcoxによる設計）。XArrayはradix treeの機能を包含しつつ、RCUと組み合わせた安全な並行アクセスをより扱いやすくしたAPIを提供します。{" "}</p>
{" "}
<Diagram id="diag-29" />
{" "}
<h3 id="152-ブロックのページキャッシュ格納" tabIndex={-1}>15.2 ブロックのページキャッシュ格納</h3>
{" "}
<p>{" "}<strong>バッファヘッド（buffer head）</strong>は、ページキャッシュ上の1ページを、ファイルシステムのブロックサイズ（例: ext4なら通常4KB）単位で細分化して管理するためのメタデータです。原著が解説するこの仕組みは現代でも存在しますが、大きなI/O向けには、より軽量な{" "}<code>struct bio</code>{" "}ベースの経路（バッファヘッドを経由しない直接的なページI/O）が優先して使われるようになっています。{" "}</p>
{" "}
<h3 id="153-ダーティページの書き戻し" tabIndex={-1}>15.3 ダーティページの書き戻し</h3>
{" "}
<p>{" "}メモリ上で変更された（ディスクの内容と一致しなくなった）ページを「ダーティページ」と呼びます。原著が解説する{" "}<code>pdflush</code>{" "}カーネルスレッド群（複数のダーティページ書き戻し専用スレッド）は、Linux 2.6.32以降{" "}<strong>per-BDI flusher thread</strong>（バッキングデバイス情報ごとに1本の書き戻しスレッド）方式に置き換わりました。これにより、1台の低速デバイスへの書き戻し待ちが、他の高速デバイスへの書き戻しをブロックしてしまう問題が解消されています。{" "}</p>
{" "}
<Diagram id="diag-30" />
{" "}
<h3 id="154-syncfsyncfdatasync" tabIndex={-1}>15.4 sync()、fsync()、fdatasync()</h3>
{" "}
<p>{" "}原著が解説するこれら3つのシステムコールの違い（<code>sync()</code>＝システム全体のダーティページを書き戻す、<code>fsync()</code>＝特定ファイルのデータとメタデータを書き戻す、<code>fdatasync()</code>＝データのみ書き戻す）は現在も変わりません。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}<code>/proc/sys/vm/dirty_ratio</code>{" "}と{" "}<code>/proc/sys/vm/dirty_background_ratio</code>{" "}は、書き込み性能とクラッシュ時のデータ損失リスクのトレードオフを調整するカーネルパラメータです。データベースサーバーのようにデータ整合性が重要なワークロードでは、これらの値を小さくして頻繁な書き戻しを促す一方、<code>fsync()</code>{" "}の呼び出しコストとのバランスを取る必要があります。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第16部ファイルアクセス原著-ch16-accessing-files" tabIndex={-1}>{" "}第16部：ファイルアクセス（原著 Ch.16 Accessing Files）{" "}</h2>
{" "}
<h3 id="161-ファイルの読み書き" tabIndex={-1}>16.1 ファイルの読み書き</h3>
{" "}
<p>{" "}原著16.1節は、<code>read()</code>/<code>write()</code>{" "}システムコールが、前述のVFS・ページキャッシュ層を通じてどのように実装されているかを解説します。<strong>リードアヘッド（Read-Ahead）</strong>は、シーケンシャルアクセスパターンを検出した場合に、要求された範囲より先のデータを先読みしてページキャッシュに載せておく最適化です。{" "}</p>
{" "}
<h3 id="162-メモリマッピングmmap" tabIndex={-1}>16.2 メモリマッピング（mmap）</h3>
{" "}
<p>{" "}<code>mmap()</code>{" "}システムコールは、ファイルの内容を直接プロセスのアドレス空間にマッピングし、<code>read()</code>/<code>write()</code>{" "}の代わりにメモリアクセス（ポインタの読み書き）としてファイル操作を行える仕組みです。{" "}</p>
{" "}
<Diagram id="diag-31" />
{" "}
<p>{" "}mmapされたファイルへの初回アクセスは、第9部で解説したページフォルト機構によってオンデマンドに処理されます（デマンドページング）。データベースエンジンや大規模データ処理システムが{" "}<code>mmap()</code>{" "}を好んで使うのは、この「コピーの削減」と「OSのページキャッシュ管理に任せられる」という利点のためです。{" "}</p>
{" "}
<h3 id="163164-ダイレクトioと非同期io" tabIndex={-1}>16.3〜16.4 ダイレクトI/Oと非同期I/O</h3>
{" "}
<p>{" "}<strong>ダイレクトI/O</strong>（<code>O_DIRECT</code>{" "}フラグ）は、あえてページキャッシュをバイパスし、ユーザーバッファとディスクの間で直接データ転送を行う仕組みです。データベースなど独自のバッファキャッシュ管理を行うアプリケーションが、OSのキャッシュとの二重管理を避けるために使用します。{" "}</p>
{" "}
<p>{" "}原著16.4節は「Linux 2.6における非同期I/O（AIO）」を紹介していますが、当時のPOSIX AIO実装は用途が限定的（<code>O_DIRECT</code>のブロックデバイスなど）で、広く使われるには至りませんでした。この領域は2019年、原著出版から14年後に劇的な進化を遂げます。{" "}</p>
{" "}
<h3 id="2019年以降io_uringによる非同期ioの刷新" tabIndex={-1}>{" "}2019年以降：io_uringによる非同期I/Oの刷新{" "}</h3>
{" "}
<p>{" "}<strong>io_uring</strong>（Jens Axboe設計、Linux 5.1、2019年）は、従来のPOSIX AIOやepollベースの非同期処理が抱えていた制約（システムコールのオーバーヘッド、バッファI/Oへの非対応、複雑なAPI）を一掃する、ユーザー空間とカーネル空間で共有するリングバッファ（SQ: Submission Queue / CQ: Completion Queue）ベースの汎用非同期I/Oインターフェースです。{" "}</p>
{" "}
<Diagram id="diag-32" />
{" "}
<p>{" "}io_uringの鍵となる利点は、ユーザー空間とカーネル空間が同じメモリ領域（リングバッファ）を共有することで、<strong>システムコールの発行回数そのものを大幅に削減</strong>できる点です。ファイルI/Oだけでなく、ネットワークI/O（ゼロコピー送受信）、<code>openat()</code>,{" "}<code>close()</code>{" "}など多様な操作へと対応範囲が拡大し続けています。2026年時点では、大規模Webサービス（Cloudflareのエッジランタイム等）や高性能データベース、ストレージシステムでの採用が進んでいます。{" "}</p>
{" "}
<p>{" "}<strong>出典</strong>: &quot;The Design and Evolution of io_uring&quot; by Jens Axboe —{" "}<a href="https://unixism.net/loti/what_is_io_uring.html">https://unixism.net/loti/what_is_io_uring.html</a>{" "}／ Jens Axboe, io_uringメンテナ, Linuxブロック層メンテナ{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}高スループットが要求されるI/O集約型アプリケーション（プロキシ、データベース、ストレージエンジン）を新規開発する場合、<code>epoll</code>{" "}ベースの伝統的な非同期モデルに加えて{" "}<code>io_uring</code>（多くの言語で{" "}<code>tokio-uring</code>,{" "}<code>liburing</code>{" "}などのバインディングが提供されている）の採用を検討する価値があります。ただし、カーネルバージョン要件（機能によっては比較的新しいカーネルが必要）とセキュリティ面の考慮（一部のコンテナ環境ではseccompプロファイルの制約でio_uringが無効化されていることがある）を事前に確認してください。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第17部ページフレーム回収原著-ch17-page-frame-reclaiming" tabIndex={-1}>{" "}第17部：ページフレーム回収（原著 Ch.17 Page Frame Reclaiming）{" "}</h2>
{" "}
<h3 id="171-ページフレーム回収アルゴリズムpfra" tabIndex={-1}>{" "}17.1 ページフレーム回収アルゴリズム（PFRA）{" "}</h3>
{" "}
<p>{" "}物理メモリは有限であるため、カーネルは「使われていない、あるいは使用頻度の低いページ」を見つけて回収し、新たな確保要求に再利用する必要があります。これが<strong>PFRA（Page Frame Reclaiming Algorithm）</strong>です。{" "}</p>
{" "}
<h3 id="172-逆マッピングreverse-mapping" tabIndex={-1}>17.2 逆マッピング（Reverse Mapping）</h3>
{" "}
<p>{" "}あるページを回収したい（＝物理メモリから追い出したい）とき、カーネルは「そのページが<strong>どのプロセスの、どの仮想アドレスに</strong>マッピングされているか」を知る必要があります。原著17.2節が解説する<strong>逆マッピング（rmap）</strong>の仕組みは、通常のページテーブル探索（仮想アドレス→物理アドレス）とは逆方向（物理ページ→それを参照している全プロセスの仮想アドレス）の検索を可能にします。{" "}</p>
{" "}
<Diagram id="diag-33" />
{" "}
<p>{" "}このrmapがあるからこそ、あるページを回収する際に「そのページを参照している全プロセスのページテーブルエントリを無効化する」という処理が可能になります。{" "}</p>
{" "}
<h3 id="173-pfraの実装lruリスト" tabIndex={-1}>17.3 PFRAの実装：LRUリスト</h3>
{" "}
<p>{" "}原著17.3節が解説する<strong>LRU（Least Recently Used）リスト</strong>による回収候補の選定は、現代のカーネルでも中核的なアルゴリズムです。ページは「アクティブリスト」と「非アクティブリスト」の2段階（さらに匿名ページとファイルキャッシュページで別々に管理）に分類され、非アクティブリストの末尾から順に回収候補として検討されます。{" "}</p>
{" "}
<Diagram id="diag-34" />
{" "}
<p>{" "}<strong>kswapd</strong>カーネルスレッドは、空きメモリが一定の閾値を下回ると起動し、バックグラウンドでページ回収を行います。緊急時（メモリ枯渇が深刻な場合）は、プロセスのメモリ確保要求自体が同期的に回収処理を実行する「直接回収（direct reclaim）」に切り替わります。{" "}</p>
{" "}
<h3 id="oom-killerout-of-memory-killer" tabIndex={-1}>OOM Killer（Out Of Memory Killer）</h3>
{" "}
<p>{" "}回収を試みても十分なメモリを確保できない場合の最終手段として、原著が解説する<strong>OOM Killer</strong>は、システムを守るために「最も殺すべき（＝最もメモリを大量消費し、システムへの重要度が低い）」プロセスを選び強制終了させます。この選定には{" "}<code>oom_score</code>（各プロセスに付与される「殺されやすさ」スコア）が使われ、<code>/proc/&lt;pid&gt;/oom_score_adj</code>{" "}で手動調整できます。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}コンテナ環境（Kubernetes等）でメモリ上限（limit）を設定している場合、コンテナ内でOOM Killerが発動すると、意図しないプロセス（データベース接続プールなど、システム上重要なプロセス）が巻き添えで殺されることがあります。重要なプロセスには{" "}<code>oom_score_adj</code>{" "}を負の値に設定して優先度を下げる、あるいはそもそもリクエストとリミットの設定を見直して余裕を持たせる設計が推奨されます。{" "}</p>{" "}</div>{" "}</div>
{" "}
<h3 id="174-スワッピング" tabIndex={-1}>17.4 スワッピング</h3>
{" "}
<p>{" "}物理メモリが枯渇した際、匿名ページ（ファイルバッキングのないヒープ・スタック等のページ）をディスク上の<strong>スワップ領域</strong>へ退避させる仕組みです。<strong>スワップキャッシュ</strong>は、スワップイン・アウトの一貫性を保つための中間層として機能します。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="第18部ext2ext3から現代のファイルシステムへ原著-ch18-the-ext2-and-ext3-filesystems" tabIndex={-1}>{" "}第18部：Ext2/Ext3から現代のファイルシステムへ（原著 Ch.18 The Ext2 and Ext3 Filesystems）{" "}</h2>
{" "}
<h3 id="181183-ext2の設計" tabIndex={-1}>18.1〜18.3 Ext2の設計</h3>
{" "}
<p>{" "}原著18章は、当時Linuxの標準ファイルシステムだった<strong>Ext2</strong>（および原著執筆時点で最新だったジャーナリング拡張版<strong>Ext3</strong>）のディスク上データ構造を詳細に解説します。{" "}</p>
{" "}
<Diagram id="diag-35" />
{" "}
<p>{" "}Ext2はディスクを「ブロックグループ」に分割し、関連するファイル（同一ディレクトリ内のファイル群など）をなるべく近いブロックグループへ配置することでシーク時間を最小化する設計思想を持っていました。{" "}</p>
{" "}
<h3 id="187-ext3とジャーナリング" tabIndex={-1}>18.7 Ext3とジャーナリング</h3>
{" "}
<p>{" "}原著18.7節が解説する<strong>ジャーナリング</strong>は、ファイルシステムのメタデータ変更を「ジャーナル（ログ）」に先行して記録することで、突然の電源断やクラッシュからの復旧を高速かつ確実にする仕組みです（原子的操作＝トランザクションの概念をファイルシステムに導入）。Ext3は、原著の言葉を借りれば「Ext2の完全な互換性を保ちながらジャーナリングを追加する」という保守的なアプローチを取りました。{" "}</p>
{" "}
<h3 id="2005年から2026年へlinuxファイルシステムの系譜" tabIndex={-1}>{" "}2005年から2026年へ：Linuxファイルシステムの系譜{" "}</h3>
{" "}
<p>{" "}原著出版から20年、Linuxで利用可能なファイルシステムの選択肢は大きく広がりました。{" "}</p>
{" "}
<Diagram id="diag-36" />
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">ファイルシステム</th><th scope="col">特徴</th><th scope="col">2026年時点の位置づけ</th></tr></thead><tbody><tr className="odd"><td>Ext4</td><td>{" "}Ext2/3の正統進化版。エクステントベースの割り当て、遅延割り当て、ジャーナルチェックサム{" "}</td><td>{" "}多くのディストリビューションで依然デフォルト、安定性重視の選択肢{" "}</td></tr><tr className="even"><td>XFS</td><td>{" "}高い並列I/O性能、大容量ボリューム向け。Red Hat系ディストリビューションのデフォルト{" "}</td><td>エンタープライズ・大規模ストレージで広く採用</td></tr><tr className="odd"><td>Btrfs</td><td>{" "}Copy-on-Write、スナップショット、内蔵RAID、透過的チェックサムによるデータ破損検出{" "}</td><td>openSUSE, Fedora Workstationなどでデフォルト採用が進む</td></tr><tr className="even"><td>bcachefs</td><td>{" "}Kent Overstreetによる新世代CoWファイルシステム。2024年（Linux 6.7）にメインライン入りしたが、開発運用方針を巡るLinus Torvaldsとの対立の末、2025年後半（Linux 6.18）にメインラインカーネルから完全に削除され、DKMS（外部）モジュールとしての配布に移行{" "}</td><td>メインライン外での独立開発が継続中</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}<strong>出典</strong>: &quot;Bcachefs removed from the mainline kernel&quot; (LWN.net) —{" "}<a href="https://lwn.net/Articles/1040120/">https://lwn.net/Articles/1040120/</a>{" "}／ Wikipedia &quot;Bcachefs&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Bcachefs">https://en.wikipedia.org/wiki/Bcachefs</a>{" "}</p>
{" "}
<h3 id="コラムbcachefsを巡る顛末が示すlinuxカーネル開発の統治構造" tabIndex={-1}>{" "}コラム：bcachefsを巡る顛末が示すLinuxカーネル開発の統治構造{" "}</h3>
{" "}
<p>{" "}2024年1月、Linux 6.7でbcachefsがメインラインへマージされたことは、新しいファイルシステムがLinuxカーネルに採用される稀有な事例として注目されました。しかし2025年、マージウィンドウ（新機能受け入れ期間）外でのバグ修正と称した大規模な機能追加パッチの提出を巡り、リリースマネージャーであるLinus Torvaldsと開発者Kent Overstreetの間で対立が深まり、最終的にTorvaldsは「信頼関係の回復には持続的な協調姿勢の実証が必要」としてbcachefsのメインライン除外を決断しました。{" "}</p>
{" "}
<p>{" "}この出来事は、Linuxカーネル開発が単なる技術力だけでなく、「マージウィンドウのルールを守る」「rc（リリース候補）期間中は純粋なバグ修正のみを行う」といった<strong>開発プロセスへの信頼</strong>によって支えられていることを象徴する事例として、業界で広く議論されました。技術的に優れたコードであっても、確立された開発ワークフローへの適合がLinuxカーネルへの統合において同様に重視されるという、オープンソースガバナンスの実例です。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="第19部プロセス間通信ipc原著-ch19-process-communication" tabIndex={-1}>{" "}第19部：プロセス間通信（IPC）（原著 Ch.19 Process Communication）{" "}</h2>
{" "}
<h3 id="191-パイプ" tabIndex={-1}>19.1 パイプ</h3>
{" "}
<p>{" "}最も基本的なIPC機構である<strong>パイプ</strong>は、シェルの{" "}<code>|</code>{" "}演算子でおなじみの、片方向のバイトストリーム通信路です。原著19.1節が解説する{" "}<code>pipefs</code>（特殊ファイルシステム）による実装は現在も基本的に同じ設計です。{" "}</p>
{" "}
<Diagram id="diag-37" />
{" "}
<h3 id="192-fifo名前付きパイプ" tabIndex={-1}>19.2 FIFO（名前付きパイプ）</h3>
{" "}
<p>{" "}通常のパイプは親子関係にあるプロセス間でしか使えませんが、<strong>FIFO</strong>（<code>mkfifo</code>{" "}で作成）はファイルシステム上に名前を持つため、関係のないプロセス間でも通信路として利用できます。{" "}</p>
{" "}
<h3 id="193-system-v-ipc" tabIndex={-1}>19.3 System V IPC</h3>
{" "}
<p>{" "}原著19.3節が解説する{" "}<strong>System V IPC</strong>（セマフォ、メッセージキュー、共有メモリ）は、Unix系OSの伝統的なIPC機構群です。<code>ipcs</code>{" "}コマンドで現在使用中のSystem V IPCリソースを確認できます。共有メモリ（<code>shmget()</code>）は、複数プロセスが同一の物理メモリ領域を直接マッピングする、最も高速なIPC手段です。{" "}</p>
{" "}
<h3 id="194-posix-メッセージキュー" tabIndex={-1}>19.4 POSIX メッセージキュー</h3>
{" "}
<p>{" "}原著が触れるPOSIXメッセージキュー（<code>mq_open()</code>{" "}系API）は、System V IPCより新しい標準化されたインターフェースで、ファイルディスクリプタベースであるため{" "}<code>select()</code>/<code>poll()</code>/<code>epoll()</code>{" "}と統合しやすいという利点があります。{" "}</p>
{" "}
<Diagram id="diag-38" />
{" "}
<p>{" "}<strong>2026年時点の補足</strong>: 原著の19章はシステムVIPC・POSIX IPC中心の解説にとどまりますが、現代のアプリケーション開発（特にマイクロサービス・コンテナ環境）では、プロセス間通信の主流はUnixドメインソケット、gRPC/HTTPベースのネットワークIPC、あるいはメッセージブローカー（Kafka、RabbitMQ等）へと大きくシフトしています。ただし、単一ホスト内での高速・低レイテンシな通信が必要な場面（データベースエンジンの内部プロセス間連携など）では、共有メモリやUnixドメインソケットが今も現役です。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="第20部プログラム実行原著-ch20-program-execution" tabIndex={-1}>{" "}第20部：プログラム実行（原著 Ch.20 Program Execution）{" "}</h2>
{" "}
<h3 id="201-実行可能ファイル" tabIndex={-1}>20.1 実行可能ファイル</h3>
{" "}
<p>原著20.1節は、プログラムが実行される際にカーネルが処理する要素を整理します。</p>
{" "}
<ul><li>{" "}<strong>プロセスの資格情報とケーパビリティ</strong>: 伝統的なUnixの「root（UID 0）か、それ以外か」という二値的な権限モデルに対し、Linuxの<strong>ケーパビリティ（Capabilities）</strong>は、root権限を{" "}<code>CAP_NET_BIND_SERVICE</code>（1024番未満のポートへのbind）、<code>CAP_SYS_ADMIN</code>{" "}など細かい単位に分割し、必要最小限の権限だけをプロセスに付与できるようにする仕組みです。{" "}</li><li>{" "}<strong>LSM（Linux Security Modules）フレームワーク</strong>: SELinux, AppArmor, Smack といった強制アクセス制御（MAC）システムを、カーネルへプラグイン的に組み込むためのフック機構。原著執筆時点でもすでに存在した設計ですが、現代のクラウドネイティブ環境では、コンテナのサンドボックス化（seccomp-BPFとの組み合わせ）において重要性が増しています。{" "}</li><li>{" "}<strong>コマンドライン引数と環境変数</strong>:{" "}<code>execve()</code>{" "}の第2・第3引数として渡される{" "}<code>argv[]</code>,{" "}<code>envp[]</code>。{" "}</li><li>{" "}<strong>プログラムセグメントとメモリ領域</strong>: 実行ファイルの各セクション（<code>.text</code>,{" "}<code>.data</code>,{" "}<code>.bss</code>）が、第9部で説明したVMAとしてどうマッピングされるか。{" "}</li></ul>
{" "}
<h3 id="202-実行可能フォーマット" tabIndex={-1}>20.2 実行可能フォーマット</h3>
{" "}
<p>{" "}Linuxが標準でサポートする実行可能ファイル形式は<strong>ELF（Executable and Linkable Format）</strong>です。原著20.2節はELFの構造（ヘッダ、プログラムヘッダテーブル、セクションヘッダテーブル）を解説します。<code>file</code>{" "}コマンドで実行ファイルの種類を確認する際に見る「ELF 64-bit LSB executable」という表示は、まさにこのフォーマットです。{" "}</p>
{" "}
<Diagram id="diag-39" />
{" "}
<h3 id="203-実行ドメイン" tabIndex={-1}>20.3 実行ドメイン</h3>
{" "}
<p>{" "}原著が解説する<strong>実行ドメイン（execution domains）</strong>は、異なるUnix系OS（SCO UnixやSolaris等）向けにコンパイルされたバイナリを、システムコール番号の変換によってLinux上でも動かせるようにする互換性レイヤーの仕組みでした。現代ではその役割は縮小していますが、類似の思想は Windows向けバイナリを動かす{" "}<strong>Wine</strong>（システムコールではなくWin32 APIレベルの互換レイヤー）や、異なるアーキテクチャ向けバイナリを実行する{" "}<code>binfmt_misc</code>{" "}+ エミュレータ（QEMU user-mode等、Dockerのマルチアーキテクチャビルドで利用）に受け継がれています。{" "}</p>
{" "}
<h3 id="204-execファミリー関数" tabIndex={-1}>20.4 execファミリー関数</h3>
{" "}
<p>{" "}<code>execve()</code>{" "}を土台に、glibcは{" "}<code>execl()</code>,{" "}<code>execv()</code>,{" "}<code>execvp()</code>{" "}など複数のバリエーションを提供します。原著20.4節はこれらの違い（引数リスト形式か配列形式か、PATH検索を行うか）を整理します。<code>fork()</code>{" "}に続けて{" "}<code>exec*()</code>{" "}を呼ぶ「fork-exec」パターンは、シェルがコマンドを実行する際の基本形です。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}高頻度にプロセスを起動するアプリケーション（CIランナー、ビルドシステム等）では、<code>fork()</code>{" "}のコピーオンライトコストや{" "}<code>exec()</code>{" "}後の動的リンク解決コストがボトルネックになることがあります。<code>posix_spawn()</code>（多くの環境で{" "}<code>vfork()</code>+<code>exec()</code>{" "}の組み合わせに最適化される）や、静的リンクバイナリの活用、プロセスプール（ワーカープロセスの再利用）といった対策が有効です。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第21部システム起動とモジュール原著-appendix-ab" tabIndex={-1}>{" "}第21部：システム起動とモジュール（原著 Appendix A/B）{" "}</h2>
{" "}
<h3 id="a-システム起動" tabIndex={-1}>A. システム起動</h3>
{" "}
<p>{" "}原著付録Aは、電源投入からカーネルが動き出すまでの過程を「時代」になぞらえて詩的に説明しています（原始時代のBIOS、古代のブートローダ、中世のsetup()関数、ルネサンスのstartup_32()関数、近代のstart_kernel()関数）。{" "}</p>
{" "}
<Diagram id="diag-40" />
{" "}
<p>{" "}<strong>2026年時点の補足</strong>: 原著が前提とするBIOSベースの起動は、現代の多くのx86システムで<strong>UEFI（Unified Extensible Firmware Interface）</strong>に置き換わっています。UEFIはBIOSよりも高機能で、大容量ディスクへの対応、セキュアブート（署名検証によるブートローダ・カーネルの改ざん防止）、GPTパーティション形式のネイティブサポートなどを提供します。また、<code>initramfs</code>（起動時に必要な最小限のドライバ・ツールを含む一時的なルートファイルシステム）は、実際のルートファイルシステムをマウントするために必要なストレージドライバ（RAID, LVM, 暗号化ボリューム等）を動的にロードする役割を担い、現代のほぼ全てのディストリビューションで標準的に使われています。{" "}</p>
{" "}
<h3 id="b-モジュール" tabIndex={-1}>B. モジュール</h3>
{" "}
<p>{" "}原著付録Bが解説する<strong>ローダブルカーネルモジュール（LKM）</strong>の仕組みは、カーネルの機能をコンパイル時に固定するのではなく、実行時に動的にロード・アンロードできるようにする仕組みです。{" "}</p>
{" "}
<Diagram id="diag-41" />
{" "}
<p>{" "}<strong>モジュール依存関係</strong>は{" "}<code>depmod</code>{" "}によって解決され、<code>modprobe</code>{" "}は要求されたモジュールが依存する他のモジュールを自動的にロードします。<strong>モジュールライセンス</strong>（<code>MODULE_LICENSE()</code>{" "}マクロ）は、GPL互換かどうかによって、そのモジュールが利用できるカーネル内部シンボル（<code>EXPORT_SYMBOL_GPL()</code>{" "}でエクスポートされたもの）の範囲が変わる、Linuxカーネル特有の仕組みです。{" "}</p>
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}サードパーティ製のカーネルモジュール（GPUドライバ等）を導入する際は、<code>modinfo &lt;module&gt;</code>{" "}でライセンス表記を確認する習慣をつけてください。非GPLモジュール（&quot;proprietary&quot; 表記等）はカーネルに「テイント（汚染）」フラグを立て、<code>dmesg</code>{" "}にその旨が記録されます。カーネルクラッシュの原因調査時、テイントされたモジュールが関与していないかは重要な切り分けポイントです。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="第22部2026年最新動向-原著から20年カーネルはどう変わったか" tabIndex={-1}>{" "}第22部：2026年最新動向 ― 原著から20年、カーネルはどう変わったか{" "}</h2>
{" "}
<p>{" "}<em>Understanding the Linux Kernel</em>{" "}第3版が対象とした Linux 2.6 系（2005年当時）から、2026年8月現在のカーネルまでの間に、実に20年以上の開発が積み重なりました。この間、Linuxカーネルのソースコード行数は数百万行から3,000万行以上へと膨れ上がり、開発体制・技術的基盤の両面で大きな変化が起きています。ここでは、原著を読んだだけでは分からない「その後」を、主要トピックごとに整理します。{" "}</p>
{" "}
<h3 id="221-現在のバージョニング状況2026年8月時点" tabIndex={-1}>{" "}22.1 現在のバージョニング状況（2026年8月時点）{" "}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">リリース系統</th><th scope="col">バージョン例</th><th scope="col">備考</th></tr></thead><tbody><tr className="odd"><td>メインライン（開発中）</td><td>7.2-rc系</td><td>Linus Torvaldsが直接マージ判断を行う開発ツリー</td></tr><tr className="even"><td>最新安定版</td><td>7.1.x</td><td>約9〜10週間ごとにメジャー番号が上がる</td></tr><tr className="odd"><td>LTS（長期サポート）</td><td>6.18.x, 6.12.x, 6.6.x, 6.1.x, 5.15.x</td><td>{" "}Greg Kroah-HartmanとSasha Levinが中心となり、最大約6年間パッチを継続提供{" "}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}原著が対象とした2.6系は「開発版/安定版を交互にリリースする」伝統的モデルでしたが、2004年の2.6リリース以降このモデルは廃止され、現在は「1本のメインラインツリーが継続的に前進し、必要な系統だけLTSとして枝分かれする」モデルに一本化されています。{" "}</p>
{" "}
<p>{" "}<strong>出典</strong>: Linux kernel リリース状況 —{" "}<a href="https://www.kernel.org/">https://www.kernel.org/</a>{" "}、&quot;New Linux LTS Stable Kernels Ship&quot; (LinuxCompatible, 2026年8月) —{" "}<a href="https://www.linuxcompatible.org/story/new-linux-lts-stable-kernels-ship-61844-612103-and-66151">https://www.linuxcompatible.org/story/new-linux-lts-stable-kernels-ship-61844-612103-and-66151</a>{" "}、Wikipedia &quot;Linux kernel&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Linux_kernel">https://en.wikipedia.org/wiki/Linux_kernel</a>{" "}</p>
{" "}
<h3 id="222-スケジューラの進化o1-cfs-eevdf-sched_ext" tabIndex={-1}>{" "}22.2 スケジューラの進化：O(1) → CFS → EEVDF → sched_ext{" "}</h3>
{" "}
<p>{" "}第7部で詳述した通り、原著が解説するO(1)スケジューラは2007年にCFSへ、CFSは2023年（Linux 6.6）にEEVDFへと置き換わりました。さらに2024年（Linux 6.12）には、eBPFプログラムとしてスケジューリングポリシー自体を差し替え可能にする{" "}<strong>sched_ext</strong>{" "}がマージされ、特定ワークロード（ゲーミング、データセンター）向けのカスタムスケジューラをカーネル再ビルドなしに試験・運用できるようになっています。{" "}</p>
{" "}
<h3 id="223-rust-for-linuxc言語一辺倒からの転換" tabIndex={-1}>{" "}22.3 Rust for Linux：C言語一辺倒からの転換{" "}</h3>
{" "}
<p>{" "}原著が前提とする「カーネルはC言語とアセンブリのみで書かれる」という設計原則は、2022年（Linux 6.1）に大きな例外を迎えました。<strong>Rust for Linux</strong>プロジェクト（Miguel Ojeda主導）により、メモリ安全性を言語レベルで保証するRustが、実験的サポートとしてカーネルへ導入されたのです。{" "}</p>
{" "}
<p>{" "}2025年12月、Linux Kernel Maintainers Summit（東京開催）において、開発者たちはこの「実験」の成功を正式に宣言し、Rustサポートから&quot;experimental&quot;のフラグを外すことを決定しました。Linus Torvalds自身も、約5年間の取り組みを経てこの節目を後押ししたと報じられています。{" "}</p>
{" "}
<Diagram id="diag-42" />
{" "}
<p>{" "}Rust採用の主目的は、C言語では構造的に防ぎきれない「メモリ安全性バグ」（バッファオーバーフロー、use-after-free等）を、言語自体の型システムと借用チェッカーによってコンパイル時に排除することです。2026年時点で、NVIDIA GPU向けの新ドライバ「Nova」やAndroidのバインダードライバなど、実運用レベルのRustコードがカーネルに組み込まれつつあります。{" "}</p>
{" "}
<p>{" "}<strong>出典</strong>: &quot;New Linux Patch Confirms: Rust Experiment Is Done, Rust Is Here To Stay&quot; (Phoronix, 2025年12月) —{" "}<a href="https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel">https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel</a>{" "}、&quot;The state of the kernel Rust experiment&quot; (LWN.net) —{" "}<a href="https://lwn.net/Articles/1050174/">https://lwn.net/Articles/1050174/</a>{" "}、Miguel Ojeda（Rust for Linuxプロジェクトリード）{" "}</p>
{" "}
<h3 id="224-ebpfカーネルをプログラム可能にする技術" tabIndex={-1}>{" "}22.4 eBPF：カーネルを「プログラム可能」にする技術{" "}</h3>
{" "}
<p>{" "}原著の時代、カーネルの挙動を拡張するには、カーネルモジュールを書いてロードするか、カーネル自体を再コンパイルするしかありませんでした。2014年、Alexei StarovoitovとDaniel Borkmannによって拡張された<strong>eBPF（extended Berkeley Packet Filter）</strong>は、この状況を一変させました。{" "}</p>
{" "}
<p>{" "}eBPFは、ユーザー空間から安全に検証された小さなプログラムをカーネル内に注入し、パケットフィルタリング、システムコールのトレーシング、セキュリティポリシーの実施、そして前述のsched_extのようなスケジューリングポリシーまで、カーネルの様々なフックポイントで実行できるようにする技術です。{" "}</p>
{" "}
<Diagram id="diag-43" />
{" "}
<p>{" "}eBPFベリファイアが「カーネルをクラッシュさせない」ことを実行前に静的検証するという設計は、原著が説明するような「モジュール開発者の注意力に依存する安全性」から、「機械的に保証される安全性」への転換を象徴しています。Brendan GreggによるeBPFベースの可観測性ツール群（<code>bpftrace</code>{" "}等）の普及もあり、eBPFは現在、Kubernetesのネットワーキング（Cilium）やセキュリティ監視（Falco）の基盤技術としても広く採用されています。{" "}</p>
{" "}
<p>{" "}<strong>出典</strong>: Wikipedia &quot;eBPF&quot; —{" "}<a href="https://en.wikipedia.org/wiki/EBPF">https://en.wikipedia.org/wiki/EBPF</a>{" "}、Alexei Starovoitov, Daniel Borkmann（eBPFサブシステムメンテナ）、&quot;The eBPF Subsystem&quot; (The Linux Kernel Documentation) —{" "}<a href="https://docs.kernel.org/bpf/">https://docs.kernel.org/bpf/</a>{" "}</p>
{" "}
<h3 id="225-コンテナ技術を支える-namespaces-と-cgroups" tabIndex={-1}>{" "}22.5 コンテナ技術を支える namespaces と cgroups{" "}</h3>
{" "}
<p>{" "}原著12.4.1節が軽く触れる「名前空間（namespace）」は、原著執筆時点ではまだ発展途上の機能でした。2013年前後のDocker登場を契機に、この名前空間と<strong>cgroups（control groups）</strong>の組み合わせが「コンテナ」という現代のソフトウェア配布・実行の基本単位を支える中核技術へと押し上げられました。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">名前空間の種類</th><th scope="col">分離対象</th></tr></thead><tbody><tr className="odd"><td>PID namespace</td><td>{" "}プロセスID空間（コンテナ内はPID 1から始まる独立した番号体系）{" "}</td></tr><tr className="even"><td>Mount namespace</td><td>{" "}マウントポイント（コンテナごとに異なるファイルシステム階層を見せる）{" "}</td></tr><tr className="odd"><td>Network namespace</td><td>{" "}ネットワークインターフェース・ルーティングテーブル・ポート空間{" "}</td></tr><tr className="even"><td>UTS namespace</td><td>ホスト名・ドメイン名</td></tr><tr className="odd"><td>IPC namespace</td><td>System V IPC・POSIX メッセージキュー</td></tr><tr className="even"><td>User namespace</td><td>{" "}UID/GIDのマッピング（コンテナ内rootをホストの非特権ユーザーへマッピング）{" "}</td></tr><tr className="odd"><td>Cgroup namespace</td><td>cgroup階層の可視範囲</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}<strong>cgroups</strong>は、プロセスグループに対してCPU・メモリ・I/O帯域などのリソース使用量を制限・計測する仕組みです。原著の時代には存在しなかったこの機構は、2.6.24（2008年）で初めてマージされ、その後{" "}<strong>cgroup v2</strong>（統一階層、Linux 4.5以降で安定化）へと整理され、現代のコンテナランタイム（containerd, CRI-O）やKubernetesのリソース管理の基盤となっています。{" "}</p>
{" "}
<Diagram id="diag-44" />
{" "}
<div className="callout-practice">{" "}<div className="icon">✓</div>{" "}<div className="body">{" "}<div className="label">ベストプラクティス</div>{" "}<p>{" "}「コンテナは軽量な仮想マシンだ」という理解は誤解を招きます。コンテナは、名前空間とcgroupsで隔離・制限された<strong>通常のLinuxプロセス</strong>にすぎません。ホストと同じカーネルを共有するため、カーネル脆弱性の影響がコンテナ境界を越える可能性がある点（VMのハードウェア仮想化による隔離とは根本的に異なる点）は、セキュリティ設計上常に意識すべき前提です。{" "}</p>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<h3 id="226-rcuのその後カーネル全体への浸透" tabIndex={-1}>{" "}22.6 RCUのその後：カーネル全体への浸透{" "}</h3>
{" "}
<p>{" "}第5部で紹介したRCU（Read-Copy-Update、2002年10月導入）は、原著出版時点ではまだ新しい技術でしたが、その後20年でLinuxカーネルのほぼ全サブシステムに浸透しました。Paul E. McKenney（IBM、後にFacebook/Meta）を中心とするコミュニティにより、Tree RCU（大規模SMPシステム向けにスケーラブルに再設計されたRCU実装）、SRCU（スリープ可能なRCUバリアント）、RCU Tasks（トレーシング用途向け）など、用途別の派生実装が整備されています。RCUは現在、ルーティングテーブル、ネットワークソケットのルックアップ、dentryキャッシュなど、読み取りが極めて多いデータ構造の保護に不可欠な技術となっています。{" "}</p>
{" "}
<p>{" "}<strong>出典</strong>: &quot;RCU Usage In the Linux Kernel: Eighteen Years Later&quot; (ACM SIGOPS Operating Systems Review) — Paul E. McKenney, Joel Fernandes, Silas Boyd-Wickizer, Jonathan Walpole{" "}</p>
{" "}
<h3 id="227-そのままと変わったものの整理" tabIndex={-1}>{" "}22.7 「そのまま」と「変わったもの」の整理{" "}</h3>
{" "}
<p>{" "}原著が解説する概念のうち、20年経った今も本質的に変わらないもの・大きく進化したものを整理すると、次のようになります。{" "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">領域</th><th scope="col">2005年（原著）</th><th scope="col">2026年（現在）</th><th scope="col">変化の度合い</th></tr></thead><tbody><tr className="odd"><td>プロセス/カーネルモデル、リエントラントカーネルの基本思想</td><td>確立済み</td><td>同じ</td><td>ほぼ不変</td></tr><tr className="even"><td>VFSの4大オブジェクト（superblock/inode/dentry/file）</td><td>確立済み</td><td>同じ（radix tree→XArrayなど内部実装は刷新）</td><td>概念は不変、実装は刷新</td></tr><tr className="odd"><td>プロセススケジューラ</td><td>O(1)スケジューラ</td><td>EEVDF + sched_ext(eBPF)</td><td>大きく進化</td></tr><tr className="even"><td>非同期I/O</td><td>限定的なPOSIX AIO</td><td>io_uring</td><td>劇的に進化</td></tr><tr className="odd"><td>同期プリミティブ</td><td>スピンロック・セマフォ・BKL・初期RCU</td><td>BKL撤廃、RCU全面浸透、ロックフリー技法の高度化</td><td>大きく進化</td></tr><tr className="even"><td>ファイルシステム</td><td>Ext2/Ext3中心</td><td>Ext4/XFS/Btrfsが主流、bcachefs等新規開発が継続</td><td>選択肢が拡大</td></tr><tr className="odd"><td>ブロックI/O層</td><td>シングルキュー+シングルロック</td><td>blk-mq（マルチキュー）</td><td>全面刷新</td></tr><tr className="even"><td>デバイスモデル（kobject/sysfs）</td><td>確立済み</td><td>同じ</td><td>ほぼ不変</td></tr><tr className="odd"><td>コンテナ／隔離技術</td><td>名前空間の萌芽のみ</td><td>namespaces + cgroup v2でコンテナ技術の基盤に</td><td>ゼロから確立</td></tr><tr className="even"><td>拡張性・可観測性</td><td>カーネルモジュール、静的なトレーシング</td><td>eBPF（動的・安全に検証されたプログラム注入）</td><td>ゼロから確立</td></tr><tr className="odd"><td>実装言語</td><td>C言語・アセンブリのみ</td><td>C言語・アセンブリ + Rust（2025年末に正式サポート）</td><td>新次元の変化</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="228-カーネル開発コミュニティとガバナンス" tabIndex={-1}>{" "}22.8 カーネル開発コミュニティとガバナンス{" "}</h3>
{" "}
<p>{" "}原著の巻末付録Cが挙げる参考文献リストは書籍・論文が中心ですが、現代のLinuxカーネル開発の「一次情報源」は大きく様変わりしました。カーネルメーリングリスト（LKML）でのパッチレビューという基本プロセスは今も変わりませんが、開発の透明性を支える情報インフラとして以下が定着しています。{" "}</p>
{" "}
<ul><li>{" "}<strong>LWN.net</strong>: Jonathan Corbetが1997年に創刊した、カーネル開発の動向を深く技術的に解説するニュースサイト。カーネル開発者自身が寄稿することも多く、Linuxカーネル開発の「一次情報に準ずる二次情報源」として世界中の開発者に参照されています。{" "}</li><li>{" "}<strong>kernel.org / docs.kernel.org</strong>: カーネルソース配布とドキュメントの公式拠点。{" "}</li><li>{" "}<strong>Linux Plumbers Conference / Kernel Maintainers Summit</strong>: 年次で開催される、カーネル開発者同士が対面で技術的・組織的な議論を行う会議。前述のRust実験終了の決定も、2025年のこの場でなされました。{" "}</li></ul>
{" "}
<p>{" "}Greg Kroah-Hartman（安定版メンテナ）、Jonathan Corbet（LWN編集長）、Paul McKenney（RCU）、Peter Zijlstra（スケジューラ）、Jens Axboe（ブロック層・io_uring）、Alexei Starovoitov（eBPF）、Miguel Ojeda（Rust for Linux）など、本ガイドで繰り返し登場した開発者たちの多くは、それぞれのサブシステムの「メンテナ」として、世界中から届くパッチをレビューし、Linus Torvaldsへプルリクエストを送る役割を担っています。この分散的だが規律あるレビュー体制こそが、3,000万行を超える巨大なコードベースを、20年以上にわたり継続的に進化させ続けてきた原動力です。{" "}</p>
{" "}
<hr />
{" "}
<h2 id="学習ロードマップ" tabIndex={-1}>学習ロードマップ</h2>
{" "}
<p>原著およびカーネル内部を本格的に学び進めたい場合、以下の順序を推奨します。</p>
{" "}
<Diagram id="diag-45" />
{" "}
<h3 id="おすすめの実践コマンド" tabIndex={-1}>おすすめの実践コマンド</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">コマンド</th><th scope="col">学べること</th></tr></thead><tbody><tr className="odd"><td><code>strace -c &lt;command&gt;</code></td><td>プログラムが発行するシステムコールの種類と回数</td></tr><tr className="even"><td><code>ps aux --sort=-%cpu</code></td><td>現在のプロセスとその状態（第3部の復習）</td></tr><tr className="odd"><td><code>cat /proc/&lt;pid&gt;/status</code></td><td>プロセスディスクリプタの主要フィールドの実例</td></tr><tr className="even"><td><code>cat /proc/meminfo</code></td><td>{" "}メモリ管理・ページキャッシュの現在の状態（第8部・第15部の復習）{" "}</td></tr><tr className="odd"><td><code>vmstat 1</code></td><td>ページフォルト率、スワップ活動、CPU使用率のリアルタイム観測</td></tr><tr className="even"><td>{" "}<code>lsblk</code>{" "}/{" "}<code>cat /sys/block/*/queue/scheduler</code>{" "}</td><td>ブロックデバイスとI/Oスケジューラの確認（第14部の復習）</td></tr><tr className="odd"><td><code>ls /sys/class/</code></td><td>デバイスモデル（kobject/class）の実例（第13部の復習）</td></tr><tr className="even"><td><code>cat /proc/interrupts</code></td><td>割り込みの発生状況とCPUへの分配（第4部の復習）</td></tr></tbody></table>{" "}</div>
{" "}
<h2 id="チェックリストこのガイドで押さえておきたい理解ポイント" tabIndex={-1}>{" "}チェックリスト：このガイドで押さえておきたい理解ポイント{" "}</h2>
{" "}
<div className="checklist-card">{" "}<div className="checklist-header">{" "}<span className="title">学習チェックリスト</span><span className="count">{checkedCount} / 19 完了</span>{" "}</div>{" "}<ul><li>{" "}<input id="chk1" type="checkbox" checked={checkedList[0]} onChange={() => handleToggle(0)} /><label htmlFor="chk1">ユーザー空間とカーネル空間の分離、およびシステムコールによる橋渡しの仕組みを説明できる</label>{" "}</li><li>{" "}<input id="chk2" type="checkbox" checked={checkedList[1]} onChange={() => handleToggle(1)} /><label htmlFor="chk2">論理アドレス・線形アドレス・物理アドレスの3段階変換の流れを説明できる</label>{" "}</li><li>{" "}<input id="chk3" type="checkbox" checked={checkedList[2]} onChange={() => handleToggle(2)} /><label htmlFor="chk3">プロセスディスクリプタ（task_struct）とプロセス状態遷移を図示できる</label>{" "}</li><li>{" "}<input id="chk4" type="checkbox" checked={checkedList[3]} onChange={() => handleToggle(3)} /><label htmlFor="chk4">fork()のCopy-On-Write最適化がなぜ・どう機能するかを説明できる</label>{" "}</li><li>{" "}<input id="chk5" type="checkbox" checked={checkedList[4]} onChange={() => handleToggle(4)} /><label htmlFor="chk5">割り込みハンドラがなぜ「短く」あるべきか、softirq/tasklet/workqueueの使い分けを説明できる</label>{" "}</li><li>{" "}<input id="chk6" type="checkbox" checked={checkedList[5]} onChange={() => handleToggle(5)} /><label htmlFor="chk6">スピンロックとセマフォの使い分け基準、およびRCUの基本的な考え方を説明できる</label>{" "}</li><li>{" "}<input id="chk7" type="checkbox" checked={checkedList[6]} onChange={() => handleToggle(6)} /><label htmlFor="chk7">O(1)→CFS→EEVDFというスケジューラの進化とその理由を説明できる</label>{" "}</li><li>{" "}<input id="chk8" type="checkbox" checked={checkedList[7]} onChange={() => handleToggle(7)} /><label htmlFor="chk8">バディシステムとスラブアロケータの役割分担を説明できる</label>{" "}</li><li>{" "}<input id="chk9" type="checkbox" checked={checkedList[8]} onChange={() => handleToggle(8)} /><label htmlFor="chk9">ページフォルトが「異常」だけでなく「正常な仕組み」としても使われることを説明できる（デマンドページング）</label>{" "}</li><li>{" "}<input id="chk10" type="checkbox" checked={checkedList[9]} onChange={() => handleToggle(9)} /><label htmlFor="chk10">VFSの4大オブジェクト（superblock/inode/dentry/file）の関係を図示できる</label>{" "}</li><li>{" "}<input id="chk11" type="checkbox" checked={checkedList[10]} onChange={() => handleToggle(10)} /><label htmlFor="chk11">DMAが何を解決する技術かを説明できる</label>{" "}</li><li>{" "}<input id="chk12" type="checkbox" checked={checkedList[11]} onChange={() => handleToggle(11)} /><label htmlFor="chk12">blk-mqがなぜ従来のI/Oスケジューラモデルから刷新されたかを説明できる</label>{" "}</li><li>{" "}<input id="chk13" type="checkbox" checked={checkedList[12]} onChange={() => handleToggle(12)} /><label htmlFor="chk13">ページキャッシュとダーティページ書き戻しの基本的な流れを説明できる</label>{" "}</li><li>{" "}<input id="chk14" type="checkbox" checked={checkedList[13]} onChange={() => handleToggle(13)} /><label htmlFor="chk14">io_uringが従来の非同期I/Oと何が違うかを説明できる</label>{" "}</li><li>{" "}<input id="chk15" type="checkbox" checked={checkedList[14]} onChange={() => handleToggle(14)} /><label htmlFor="chk15">LRUリストによるページ回収とOOM Killerの役割を説明できる</label>{" "}</li><li>{" "}<input id="chk16" type="checkbox" checked={checkedList[15]} onChange={() => handleToggle(15)} /><label htmlFor="chk16">シグナルの生成から配送、ハンドラ実行までの流れを説明できる</label>{" "}</li><li>{" "}<input id="chk17" type="checkbox" checked={checkedList[16]} onChange={() => handleToggle(16)} /><label htmlFor="chk17">namespacesとcgroupsが「コンテナ」をどう実現しているかを説明できる</label>{" "}</li><li>{" "}<input id="chk18" type="checkbox" checked={checkedList[17]} onChange={() => handleToggle(17)} /><label htmlFor="chk18">eBPFがなぜ「安全にカーネルを拡張できる」技術なのかを説明できる</label>{" "}</li><li>{" "}<input id="chk19" type="checkbox" checked={checkedList[18]} onChange={() => handleToggle(18)} /><label htmlFor="chk19">Rust for Linuxが解決しようとしている問題（メモリ安全性）を説明できる</label>{" "}</li></ul>{" "}</div>
{" "}
<hr />
{" "}
<h2 id="参考文献出典" tabIndex={-1}>参考文献・出典</h2>
{" "}
<p>{" "}本ガイドの作成にあたり、O&apos;Reilly公式ページによる原著の目次・概要確認に加え、著名な国際的カーネル開発者・組織による一次情報（LWN.net、kernel.orgドキュメント、開発者本人のブログ・パッチ投稿等）を優先的に参照しました。{" "}</p>
{" "}
<h3 id="原著情報" tabIndex={-1}>原著情報</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref1">{" "}<div className="num">1</div>{" "}<div className="txt">{" "}Daniel P. Bovet, Marco Cesati,{" "}<em>Understanding the Linux Kernel, 3rd Edition</em>, O&apos;Reilly Media, 2005 —{" "}<a href="https://www.oreilly.com/library/view/understanding-the-linux/0596005652/">https://www.oreilly.com/library/view/understanding-the-linux/0596005652/</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="カーネルバージョンリリース管理" tabIndex={-1}>カーネルバージョン・リリース管理</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref2">{" "}<div className="num">2</div>{" "}<div className="txt">{" "}kernel.org（Linuxカーネル公式配布サイト） —{" "}<a href="https://www.kernel.org/">https://www.kernel.org/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref3">{" "}<div className="num">3</div>{" "}<div className="txt">{" "}&quot;New Linux LTS Stable Kernels Ship: 6.18.44, 6.12.103, and 6.6.151&quot;（Greg Kroah-Hartman, Sasha Levinによる安定版リリース） —{" "}<a href="https://www.linuxcompatible.org/story/new-linux-lts-stable-kernels-ship-61844-612103-and-66151">https://www.linuxcompatible.org/story/new-linux-lts-stable-kernels-ship-61844-612103-and-66151</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref4">{" "}<div className="num">4</div>{" "}<div className="txt">{" "}&quot;Linux LTS Kernel 6.18.42, 6.12.101, and 6.6.148 Released&quot; —{" "}<a href="https://www.linuxcompatible.org/story/linux-lts-kernel-61842-612101-and-66148-released-security-hardening-and-amdgpu-fixes-included">https://www.linuxcompatible.org/story/linux-lts-kernel-61842-612101-and-66148-released-security-hardening-and-amdgpu-fixes-included</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref5">{" "}<div className="num">5</div>{" "}<div className="txt">{" "}endoflife.date &quot;Linux Kernel&quot;（サポート期間一覧） —{" "}<a href="https://endoflife.date/linux">https://endoflife.date/linux</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref6">{" "}<div className="num">6</div>{" "}<div className="txt">{" "}Wikipedia &quot;Linux kernel&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Linux_kernel">https://en.wikipedia.org/wiki/Linux_kernel</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="プロセススケジューラo1cfseevdfsched_ext" tabIndex={-1}>{" "}プロセススケジューラ（O(1)→CFS→EEVDF→sched_ext）{" "}</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref7">{" "}<div className="num">7</div>{" "}<div className="txt">{" "}Jonathan Corbet, &quot;An EEVDF CPU scheduler for Linux&quot;, LWN.net, 2023年3月 —{" "}<a href="https://lwn.net/Articles/925371/">https://lwn.net/Articles/925371/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref8">{" "}<div className="num">8</div>{" "}<div className="txt">{" "}&quot;EEVDF Scheduler&quot;, The Linux Kernel Documentation —{" "}<a href="https://docs.kernel.org/scheduler/sched-eevdf.html">https://docs.kernel.org/scheduler/sched-eevdf.html</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref9">{" "}<div className="num">9</div>{" "}<div className="txt">{" "}&quot;sched-eevdf.rst&quot;, torvalds/linux（カーネル公式ドキュメントソース） —{" "}<a href="https://github.com/torvalds/linux/blob/master/Documentation/scheduler/sched-eevdf.rst">https://github.com/torvalds/linux/blob/master/Documentation/scheduler/sched-eevdf.rst</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref10">{" "}<div className="num">10</div>{" "}<div className="txt">{" "}&quot;EEVDF&quot;, Linux Kernel Internals（Peter Zijlstraによる実装の技術解説） —{" "}<a href="https://kernel-internals.org/sched/eevdf/">https://kernel-internals.org/sched/eevdf/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref11">{" "}<div className="num">11</div>{" "}<div className="txt">{" "}Wikipedia &quot;Earliest eligible virtual deadline first scheduling&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Earliest_eligible_virtual_deadline_first_scheduling">https://en.wikipedia.org/wiki/Earliest_eligible_virtual_deadline_first_scheduling</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref12">{" "}<div className="num">12</div>{" "}<div className="txt">{" "}&quot;A Fair Slice&quot;, Linux Magazine（CFSからEEVDFへの移行解説） —{" "}<a href="https://www.linux-magazine.com/Issues/2025/301/EEVDF">https://www.linux-magazine.com/Issues/2025/301/EEVDF</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="rust-for-linux" tabIndex={-1}>Rust for Linux</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref13">{" "}<div className="num">13</div>{" "}<div className="txt">{" "}&quot;New Linux Patch Confirms: Rust Experiment Is Done, Rust Is Here To Stay&quot;, Phoronix, 2025年12月（Miguel Ojedaによるパッチ投稿を報道） —{" "}<a href="https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel">https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref14">{" "}<div className="num">14</div>{" "}<div className="txt">{" "}&quot;The state of the kernel Rust experiment&quot;, LWN.net —{" "}<a href="https://lwn.net/Articles/1050174/">https://lwn.net/Articles/1050174/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref15">{" "}<div className="num">15</div>{" "}<div className="txt">{" "}Wikipedia &quot;Rust for Linux&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Rust_for_Linux">https://en.wikipedia.org/wiki/Rust_for_Linux</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref16">{" "}<div className="num">16</div>{" "}<div className="txt">{" "}&quot;Rust Goes Mainstream in the Linux Kernel&quot;, The New Stack —{" "}<a href="https://thenewstack.io/rust-goes-mainstream-in-the-linux-kernel/">https://thenewstack.io/rust-goes-mainstream-in-the-linux-kernel/</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="非同期ioio_uring" tabIndex={-1}>非同期I/O（io_uring）</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref17">{" "}<div className="num">17</div>{" "}<div className="txt">{" "}&quot;The Design and Evolution of io_uring&quot;, Jens Axboe（io_uring設計者、Linuxブロック層メンテナ） —{" "}<a href="https://unixism.net/loti/what_is_io_uring.html">https://unixism.net/loti/what_is_io_uring.html</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref18">{" "}<div className="num">18</div>{" "}<div className="txt">{" "}&quot;io_uring: Linux Performance Boost or Security Headache?&quot;, Upwind —{" "}<a href="https://www.upwind.io/feed/io_uring-linux-performance-boost-or-security-headache">https://www.upwind.io/feed/io_uring-linux-performance-boost-or-security-headache</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref19">{" "}<div className="num">19</div>{" "}<div className="txt">{" "}Wikipedia &quot;Jens Axboe&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Jens_Axboe">https://en.wikipedia.org/wiki/Jens_Axboe</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="カーネル同期rcu" tabIndex={-1}>カーネル同期（RCU）</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref20">{" "}<div className="num">20</div>{" "}<div className="txt">{" "}Paul E. McKenney, Jonathan Walpole, &quot;What is RCU, Fundamentally?&quot;, LWN.net —{" "}<a href="https://lwn.net/Articles/262464/">https://lwn.net/Articles/262464/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref21">{" "}<div className="num">21</div>{" "}<div className="txt">{" "}&quot;A Tour Through RCU&apos;s Requirements&quot;, The Linux Kernel Documentation（著者: Paul E. McKenney） —{" "}<a href="https://docs.kernel.org/RCU/Design/Requirements/Requirements.html">https://docs.kernel.org/RCU/Design/Requirements/Requirements.html</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref22">{" "}<div className="num">22</div>{" "}<div className="txt">{" "}Paul E. McKenney, Jonathan Walpole, &quot;What is RCU, Fundamentally?&quot;, PDXScholar（Portland State University） —{" "}<a href="https://pdxscholar.library.pdx.edu/compsci_fac/86/">https://pdxscholar.library.pdx.edu/compsci_fac/86/</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="ebpf-sched_ext" tabIndex={-1}>eBPF / sched_ext</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref23">{" "}<div className="num">23</div>{" "}<div className="txt">{" "}Wikipedia &quot;eBPF&quot;（原著者: Alexei Starovoitov, Daniel Borkmann） —{" "}<a href="https://en.wikipedia.org/wiki/EBPF">https://en.wikipedia.org/wiki/EBPF</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref24">{" "}<div className="num">24</div>{" "}<div className="txt">{" "}&quot;The eBPF Subsystem&quot;, The Linux Kernel Documentation —{" "}<a href="https://docs.kernel.org/bpf/">https://docs.kernel.org/bpf/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref25">{" "}<div className="num">25</div>{" "}<div className="txt">{" "}&quot;Even more formal verification for BPF&quot;, LWN.net —{" "}<a href="https://lwn.net/Articles/1087069/">https://lwn.net/Articles/1087069/</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="ファイルシステムbcachefsを巡る経緯を含む" tabIndex={-1}>{" "}ファイルシステム（bcachefsを巡る経緯を含む）{" "}</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref26">{" "}<div className="num">26</div>{" "}<div className="txt">{" "}&quot;Bcachefs removed from the mainline kernel&quot;, LWN.net —{" "}<a href="https://lwn.net/Articles/1040120/">https://lwn.net/Articles/1040120/</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref27">{" "}<div className="num">27</div>{" "}<div className="txt">{" "}&quot;Linus Torvalds Removes The Bcachefs Code From The Linux Kernel&quot;, Phoronix —{" "}<a href="https://www.phoronix.com/news/Bcachefs-Removed-Linux-6.18">https://www.phoronix.com/news/Bcachefs-Removed-Linux-6.18</a>{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref28">{" "}<div className="num">28</div>{" "}<div className="txt">{" "}Wikipedia &quot;Bcachefs&quot; —{" "}<a href="https://en.wikipedia.org/wiki/Bcachefs">https://en.wikipedia.org/wiki/Bcachefs</a>{" "}</div>{" "}</div>{" "}</div>
{" "}
<h3 id="さらに学ぶために関連書籍" tabIndex={-1}>さらに学ぶために（関連書籍）</h3>
{" "}
<div className="ref-grid">{" "}<div className="ref-card" id="ref29">{" "}<div className="num">29</div>{" "}<div className="txt">{" "}Robert Love,{" "}<em>Linux Kernel Development, 3rd Edition</em>, Addison-Wesley — 原著と並んでカーネル入門の定番として広く参照される一冊{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref30">{" "}<div className="num">30</div>{" "}<div className="txt">{" "}Jonathan Corbet, Alessandro Rubini, Greg Kroah-Hartman,{" "}<em>Linux Device Drivers, 3rd Edition</em>, O&apos;Reilly（通称LDD3、オンライン無料公開版あり） — デバイスドライバ開発の実践的定番書{" "}</div>{" "}</div>{" "}<div className="ref-card" id="ref31">{" "}<div className="num">31</div>{" "}<div className="txt">{" "}Brian Ward,{" "}<em>How Linux Works, 3rd Edition</em>, No Starch Press — カーネルよりもう少し広いシステム管理者視点の入門書{" "}</div>{" "}</div>{" "}</div>
{" "}
<hr />
{" "}
<p>{" "}本ガイドは学習目的の独自再構成であり、O&apos;Reilly{" "}<em>Understanding the Linux Kernel, 3rd Edition</em>{" "}の著作権保護されたテキストを複製するものではありません。原著の詳細な関数レベルの解説を必要とする場合は、必ず原典をご参照ください。{" "}</p>
{" "}
                </main>
            </div>
        </div>
    );
}
