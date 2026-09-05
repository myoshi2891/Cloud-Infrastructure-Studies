/**
 * Understanding the Linux Kernel 完全解説ガイド 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    lvl3: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
    {
        "id": "この記事について",
        "label": "この記事について",
        "lvl3": false
    },
    {
        "id": "対象読者",
        "label": "対象読者",
        "lvl3": false
    },
    {
        "id": "前提知識",
        "label": "前提知識",
        "lvl3": false
    },
    {
        "id": "目次この記事の構成",
        "label": "目次（この記事の構成）",
        "lvl3": false
    },
    {
        "id": "第0部osカーネルの基礎知識",
        "label": "第0部：OS・カーネルの基礎知識",
        "lvl3": false
    },
    {
        "id": "01-オペレーティングシステムとカーネルの違い",
        "label": "0.1 オペレーティングシステムとカーネルの違い",
        "lvl3": true
    },
    {
        "id": "02-モノリシックカーネル-vs-マイクロカーネル",
        "label": "0.2 モノリシックカーネル vs マイクロカーネル",
        "lvl3": true
    },
    {
        "id": "03-プロセスカーネルモデルprocesskernel-model",
        "label": "0.3 プロセス／カーネルモデル（Process/Kernel Model）",
        "lvl3": true
    },
    {
        "id": "04-リエントラント再入可能カーネル",
        "label": "0.4 リエントラント（再入可能）カーネル",
        "lvl3": true
    },
    {
        "id": "第1部序論-linuxカーネルとは何か原著-ch1-introduction",
        "label": "第1部：序論 ― Linuxカーネルとは何か（原著 Ch.1 Introduction）",
        "lvl3": false
    },
    {
        "id": "11-linuxとunix系カーネルの関係",
        "label": "1.1 LinuxとUnix系カーネルの関係",
        "lvl3": true
    },
    {
        "id": "12-ハードウェア依存性",
        "label": "1.2 ハードウェア依存性",
        "lvl3": true
    },
    {
        "id": "13-linuxのバージョニング",
        "label": "1.3 Linuxのバージョニング",
        "lvl3": true
    },
    {
        "id": "14-基本的なosの概念",
        "label": "1.4 基本的なOSの概念",
        "lvl3": true
    },
    {
        "id": "15-unixファイルシステムの概観",
        "label": "1.5 Unixファイルシステムの概観",
        "lvl3": true
    },
    {
        "id": "16-unixカーネルの概観",
        "label": "1.6 Unixカーネルの概観",
        "lvl3": true
    },
    {
        "id": "第2部メモリアドレッシング原著-ch2-memory-addressing",
        "label": "第2部：メモリアドレッシング（原著 Ch.2 Memory Addressing）",
        "lvl3": false
    },
    {
        "id": "21-メモリアドレスの3つの顔",
        "label": "2.1 メモリアドレスの3つの顔",
        "lvl3": true
    },
    {
        "id": "2223-ハードウェアのセグメンテーションとlinuxでの利用",
        "label": "2.2〜2.3 ハードウェアのセグメンテーションとLinuxでの利用",
        "lvl3": true
    },
    {
        "id": "2425-ページング機構",
        "label": "2.4〜2.5 ページング機構",
        "lvl3": true
    },
    {
        "id": "25-linuxにおけるページング詳細",
        "label": "2.5 Linuxにおけるページング詳細",
        "lvl3": true
    },
    {
        "id": "26-ハードウェアキャッシュとメモリ階層",
        "label": "2.6 ハードウェアキャッシュとメモリ階層",
        "lvl3": true
    },
    {
        "id": "第3部プロセス原著-ch3-processes",
        "label": "第3部：プロセス（原著 Ch.3 Processes）",
        "lvl3": false
    },
    {
        "id": "31-プロセス軽量プロセススレッド",
        "label": "3.1 プロセス、軽量プロセス、スレッド",
        "lvl3": true
    },
    {
        "id": "32-プロセスディスクリプタ",
        "label": "3.2 プロセスディスクリプタ",
        "lvl3": true
    },
    {
        "id": "33-プロセス切り替えコンテキストスイッチ",
        "label": "3.3 プロセス切り替え（コンテキストスイッチ）",
        "lvl3": true
    },
    {
        "id": "34-プロセスの生成",
        "label": "3.4 プロセスの生成",
        "lvl3": true
    },
    {
        "id": "35-プロセスの終了",
        "label": "3.5 プロセスの終了",
        "lvl3": true
    },
    {
        "id": "第4部割り込みと例外原著-ch4-interrupts-and-exceptions",
        "label": "第4部：割り込みと例外（原著 Ch.4 Interrupts and Exceptions）",
        "lvl3": false
    },
    {
        "id": "4142-割り込みシグナルの役割",
        "label": "4.1〜4.2 割り込みシグナルの役割",
        "lvl3": true
    },
    {
        "id": "4345-idtと例外ハンドリング",
        "label": "4.3〜4.5 IDTと例外ハンドリング",
        "lvl3": true
    },
    {
        "id": "4647-割り込みハンドリングとsoftirqtasklet",
        "label": "4.6〜4.7 割り込みハンドリングとSoftirq/Tasklet",
        "lvl3": true
    },
    {
        "id": "48-ワークキュー",
        "label": "4.8 ワークキュー",
        "lvl3": true
    },
    {
        "id": "49-割り込み例外からの復帰",
        "label": "4.9 割り込み・例外からの復帰",
        "lvl3": true
    },
    {
        "id": "第5部カーネル同期原著-ch5-kernel-synchronization",
        "label": "第5部：カーネル同期（原著 Ch.5 Kernel Synchronization）",
        "lvl3": false
    },
    {
        "id": "51-なぜ同期が必要か",
        "label": "5.1 なぜ同期が必要か",
        "lvl3": true
    },
    {
        "id": "52-同期プリミティブ",
        "label": "5.2 同期プリミティブ",
        "lvl3": true
    },
    {
        "id": "rcuread-copy-updateの考え方",
        "label": "RCU（Read-Copy-Update）の考え方",
        "lvl3": true
    },
    {
        "id": "5354-使い分けと典型的な保護パターン",
        "label": "5.3〜5.4 使い分けと典型的な保護パターン",
        "lvl3": true
    },
    {
        "id": "第6部タイミング計測原著-ch6-timing-measurements",
        "label": "第6部：タイミング計測（原著 Ch.6 Timing Measurements）",
        "lvl3": false
    },
    {
        "id": "61-クロックとタイマー回路",
        "label": "6.1 クロックとタイマー回路",
        "lvl3": true
    },
    {
        "id": "62-linuxのタイムキーピングアーキテクチャ",
        "label": "6.2 Linuxのタイムキーピングアーキテクチャ",
        "lvl3": true
    },
    {
        "id": "6366-時刻更新統計ソフトウェアタイマー",
        "label": "6.3〜6.6 時刻更新・統計・ソフトウェアタイマー",
        "lvl3": true
    },
    {
        "id": "第7部プロセススケジューリング原著-ch7-process-scheduling",
        "label": "第7部：プロセススケジューリング（原著 Ch.7 Process Scheduling）",
        "lvl3": false
    },
    {
        "id": "7172-スケジューリングポリシー",
        "label": "7.1〜7.2 スケジューリングポリシー",
        "lvl3": true
    },
    {
        "id": "cfsの考え方原著執筆後に主流化した設計",
        "label": "CFSの考え方（原著執筆後に主流化した設計）",
        "lvl3": true
    },
    {
        "id": "eevdfへの進化",
        "label": "EEVDFへの進化",
        "lvl3": true
    },
    {
        "id": "7374-スケジューラが使うデータ構造と関数",
        "label": "7.3〜7.4 スケジューラが使うデータ構造と関数",
        "lvl3": true
    },
    {
        "id": "75-マルチプロセッサでの負荷分散",
        "label": "7.5 マルチプロセッサでの負荷分散",
        "lvl3": true
    },
    {
        "id": "2024年以降sched_extebpfで作るカスタムスケジューラ",
        "label": "2024年以降：sched_ext（eBPFで作るカスタムスケジューラ）",
        "lvl3": true
    },
    {
        "id": "76-スケジューリング関連のシステムコール",
        "label": "7.6 スケジューリング関連のシステムコール",
        "lvl3": true
    },
    {
        "id": "第8部メモリ管理原著-ch8-memory-management",
        "label": "第8部：メモリ管理（原著 Ch.8 Memory Management）",
        "lvl3": false
    },
    {
        "id": "81-ページフレーム管理",
        "label": "8.1 ページフレーム管理",
        "lvl3": true
    },
    {
        "id": "バディシステムアロケータ",
        "label": "バディシステムアロケータ",
        "lvl3": true
    },
    {
        "id": "82-メモリ領域管理スラブアロケータ",
        "label": "8.2 メモリ領域管理：スラブアロケータ",
        "lvl3": true
    },
    {
        "id": "83-非連続メモリ領域vmalloc",
        "label": "8.3 非連続メモリ領域（vmalloc）",
        "lvl3": true
    },
    {
        "id": "第9部プロセスアドレス空間原著-ch9-process-address-space",
        "label": "第9部：プロセスアドレス空間（原著 Ch.9 Process Address Space）",
        "lvl3": false
    },
    {
        "id": "9192-プロセスのアドレス空間とメモリディスクリプタ",
        "label": "9.1〜9.2 プロセスのアドレス空間とメモリディスクリプタ",
        "lvl3": true
    },
    {
        "id": "93-メモリ領域vma-virtual-memory-area",
        "label": "9.3 メモリ領域（VMA: Virtual Memory Area）",
        "lvl3": true
    },
    {
        "id": "94-ページフォルト例外ハンドラ",
        "label": "9.4 ページフォルト例外ハンドラ",
        "lvl3": true
    },
    {
        "id": "9596-アドレス空間の生成削除とヒープ管理",
        "label": "9.5〜9.6 アドレス空間の生成・削除とヒープ管理",
        "lvl3": true
    },
    {
        "id": "第10部システムコール原著-ch10-system-calls",
        "label": "第10部：システムコール（原著 Ch.10 System Calls）",
        "lvl3": false
    },
    {
        "id": "101102-posix-apiとシステムコールハンドラ",
        "label": "10.1〜10.2 POSIX APIとシステムコールハンドラ",
        "lvl3": true
    },
    {
        "id": "103-システムコールの発行終了",
        "label": "10.3 システムコールの発行・終了",
        "lvl3": true
    },
    {
        "id": "104-パラメータの受け渡しと検証",
        "label": "10.4 パラメータの受け渡しと検証",
        "lvl3": true
    },
    {
        "id": "105-カーネルラッパールーチン",
        "label": "10.5 カーネルラッパールーチン",
        "lvl3": true
    },
    {
        "id": "第11部シグナル原著-ch11-signals",
        "label": "第11部：シグナル（原著 Ch.11 Signals）",
        "lvl3": false
    },
    {
        "id": "111-シグナルの役割",
        "label": "11.1 シグナルの役割",
        "lvl3": true
    },
    {
        "id": "112113-シグナルの生成と配送",
        "label": "11.2〜11.3 シグナルの生成と配送",
        "lvl3": true
    },
    {
        "id": "システムコールの再実行",
        "label": "システムコールの再実行",
        "lvl3": true
    },
    {
        "id": "114-シグナル関連のシステムコール",
        "label": "11.4 シグナル関連のシステムコール",
        "lvl3": true
    },
    {
        "id": "第12部仮想ファイルシステムvfs原著-ch12-the-virtual-filesystem",
        "label": "第12部：仮想ファイルシステム（VFS）（原著 Ch.12 The Virtual Filesystem）",
        "lvl3": false
    },
    {
        "id": "121-vfsの役割",
        "label": "12.1 VFSの役割",
        "lvl3": true
    },
    {
        "id": "122-vfsの4大オブジェクト",
        "label": "12.2 VFSの4大オブジェクト",
        "lvl3": true
    },
    {
        "id": "123124-ファイルシステムの種類とマウント",
        "label": "12.3〜12.4 ファイルシステムの種類とマウント",
        "lvl3": true
    },
    {
        "id": "125-パス名の探索pathname-lookup",
        "label": "12.5 パス名の探索（Pathname Lookup）",
        "lvl3": true
    },
    {
        "id": "126127-vfsシステムコールの実装とファイルロック",
        "label": "12.6〜12.7 VFSシステムコールの実装とファイルロック",
        "lvl3": true
    },
    {
        "id": "第13部ioアーキテクチャとデバイスドライバ原著-ch13-io-architecture-and-device-drivers",
        "label": "第13部：I/Oアーキテクチャとデバイスドライバ（原著 Ch.13 I/O Architecture and Device Drivers）",
        "lvl3": false
    },
    {
        "id": "131-ioアーキテクチャ",
        "label": "13.1 I/Oアーキテクチャ",
        "lvl3": true
    },
    {
        "id": "132-デバイスドライバモデル",
        "label": "13.2 デバイスドライバモデル",
        "lvl3": true
    },
    {
        "id": "133-デバイスファイル",
        "label": "13.3 デバイスファイル",
        "lvl3": true
    },
    {
        "id": "134135-デバイスドライバの実装",
        "label": "13.4〜13.5 デバイスドライバの実装",
        "lvl3": true
    },
    {
        "id": "第14部ブロックデバイスドライバ原著-ch14-block-device-drivers",
        "label": "第14部：ブロックデバイスドライバ（原著 Ch.14 Block Device Drivers）",
        "lvl3": false
    },
    {
        "id": "141142-ブロックデバイスの扱いとジェネリックブロック層",
        "label": "14.1〜14.2 ブロックデバイスの扱いとジェネリックブロック層",
        "lvl3": true
    },
    {
        "id": "143-ioスケジューラ",
        "label": "14.3 I/Oスケジューラ",
        "lvl3": true
    },
    {
        "id": "144145-ブロックデバイスドライバの登録と初期化",
        "label": "14.4〜14.5 ブロックデバイスドライバの登録と初期化",
        "lvl3": true
    },
    {
        "id": "第15部ページキャッシュ原著-ch15-the-page-cache",
        "label": "第15部：ページキャッシュ（原著 Ch.15 The Page Cache）",
        "lvl3": false
    },
    {
        "id": "151-ページキャッシュとは",
        "label": "15.1 ページキャッシュとは",
        "lvl3": true
    },
    {
        "id": "152-ブロックのページキャッシュ格納",
        "label": "15.2 ブロックのページキャッシュ格納",
        "lvl3": true
    },
    {
        "id": "153-ダーティページの書き戻し",
        "label": "15.3 ダーティページの書き戻し",
        "lvl3": true
    },
    {
        "id": "154-syncfsyncfdatasync",
        "label": "15.4 sync()、fsync()、fdatasync()",
        "lvl3": true
    },
    {
        "id": "第16部ファイルアクセス原著-ch16-accessing-files",
        "label": "第16部：ファイルアクセス（原著 Ch.16 Accessing Files）",
        "lvl3": false
    },
    {
        "id": "161-ファイルの読み書き",
        "label": "16.1 ファイルの読み書き",
        "lvl3": true
    },
    {
        "id": "162-メモリマッピングmmap",
        "label": "16.2 メモリマッピング（mmap）",
        "lvl3": true
    },
    {
        "id": "163164-ダイレクトioと非同期io",
        "label": "16.3〜16.4 ダイレクトI/Oと非同期I/O",
        "lvl3": true
    },
    {
        "id": "2019年以降io_uringによる非同期ioの刷新",
        "label": "2019年以降：io_uringによる非同期I/Oの刷新",
        "lvl3": true
    },
    {
        "id": "第17部ページフレーム回収原著-ch17-page-frame-reclaiming",
        "label": "第17部：ページフレーム回収（原著 Ch.17 Page Frame Reclaiming）",
        "lvl3": false
    },
    {
        "id": "171-ページフレーム回収アルゴリズムpfra",
        "label": "17.1 ページフレーム回収アルゴリズム（PFRA）",
        "lvl3": true
    },
    {
        "id": "172-逆マッピングreverse-mapping",
        "label": "17.2 逆マッピング（Reverse Mapping）",
        "lvl3": true
    },
    {
        "id": "173-pfraの実装lruリスト",
        "label": "17.3 PFRAの実装：LRUリスト",
        "lvl3": true
    },
    {
        "id": "oom-killerout-of-memory-killer",
        "label": "OOM Killer（Out Of Memory Killer）",
        "lvl3": true
    },
    {
        "id": "174-スワッピング",
        "label": "17.4 スワッピング",
        "lvl3": true
    },
    {
        "id": "第18部ext2ext3から現代のファイルシステムへ原著-ch18-the-ext2-and-ext3-filesystems",
        "label": "第18部：Ext2/Ext3から現代のファイルシステムへ（原著 Ch.18 The Ext2 and Ext3 Filesystems）",
        "lvl3": false
    },
    {
        "id": "181183-ext2の設計",
        "label": "18.1〜18.3 Ext2の設計",
        "lvl3": true
    },
    {
        "id": "187-ext3とジャーナリング",
        "label": "18.7 Ext3とジャーナリング",
        "lvl3": true
    },
    {
        "id": "2005年から2026年へlinuxファイルシステムの系譜",
        "label": "2005年から2026年へ：Linuxファイルシステムの系譜",
        "lvl3": true
    },
    {
        "id": "コラムbcachefsを巡る顛末が示すlinuxカーネル開発の統治構造",
        "label": "コラム：bcachefsを巡る顛末が示すLinuxカーネル開発の統治構造",
        "lvl3": true
    },
    {
        "id": "第19部プロセス間通信ipc原著-ch19-process-communication",
        "label": "第19部：プロセス間通信（IPC）（原著 Ch.19 Process Communication）",
        "lvl3": false
    },
    {
        "id": "191-パイプ",
        "label": "19.1 パイプ",
        "lvl3": true
    },
    {
        "id": "192-fifo名前付きパイプ",
        "label": "19.2 FIFO（名前付きパイプ）",
        "lvl3": true
    },
    {
        "id": "193-system-v-ipc",
        "label": "19.3 System V IPC",
        "lvl3": true
    },
    {
        "id": "194-posix-メッセージキュー",
        "label": "19.4 POSIX メッセージキュー",
        "lvl3": true
    },
    {
        "id": "第20部プログラム実行原著-ch20-program-execution",
        "label": "第20部：プログラム実行（原著 Ch.20 Program Execution）",
        "lvl3": false
    },
    {
        "id": "201-実行可能ファイル",
        "label": "20.1 実行可能ファイル",
        "lvl3": true
    },
    {
        "id": "202-実行可能フォーマット",
        "label": "20.2 実行可能フォーマット",
        "lvl3": true
    },
    {
        "id": "203-実行ドメイン",
        "label": "20.3 実行ドメイン",
        "lvl3": true
    },
    {
        "id": "204-execファミリー関数",
        "label": "20.4 execファミリー関数",
        "lvl3": true
    },
    {
        "id": "第21部システム起動とモジュール原著-appendix-ab",
        "label": "第21部：システム起動とモジュール（原著 Appendix A/B）",
        "lvl3": false
    },
    {
        "id": "a-システム起動",
        "label": "A. システム起動",
        "lvl3": true
    },
    {
        "id": "b-モジュール",
        "label": "B. モジュール",
        "lvl3": true
    },
    {
        "id": "第22部2026年最新動向-原著から20年カーネルはどう変わったか",
        "label": "第22部：2026年最新動向 ― 原著から20年、カーネルはどう変わったか",
        "lvl3": false
    },
    {
        "id": "221-現在のバージョニング状況2026年8月時点",
        "label": "22.1 現在のバージョニング状況（2026年8月時点）",
        "lvl3": true
    },
    {
        "id": "222-スケジューラの進化o1-cfs-eevdf-sched_ext",
        "label": "22.2 スケジューラの進化：O(1) → CFS → EEVDF → sched_ext",
        "lvl3": true
    },
    {
        "id": "223-rust-for-linuxc言語一辺倒からの転換",
        "label": "22.3 Rust for Linux：C言語一辺倒からの転換",
        "lvl3": true
    },
    {
        "id": "224-ebpfカーネルをプログラム可能にする技術",
        "label": "22.4 eBPF：カーネルを「プログラム可能」にする技術",
        "lvl3": true
    },
    {
        "id": "225-コンテナ技術を支える-namespaces-と-cgroups",
        "label": "22.5 コンテナ技術を支える namespaces と cgroups",
        "lvl3": true
    },
    {
        "id": "226-rcuのその後カーネル全体への浸透",
        "label": "22.6 RCUのその後：カーネル全体への浸透",
        "lvl3": true
    },
    {
        "id": "227-そのままと変わったものの整理",
        "label": "22.7 「そのまま」と「変わったもの」の整理",
        "lvl3": true
    },
    {
        "id": "228-カーネル開発コミュニティとガバナンス",
        "label": "22.8 カーネル開発コミュニティとガバナンス",
        "lvl3": true
    },
    {
        "id": "学習ロードマップ",
        "label": "学習ロードマップ",
        "lvl3": false
    },
    {
        "id": "おすすめの実践コマンド",
        "label": "おすすめの実践コマンド",
        "lvl3": true
    },
    {
        "id": "チェックリストこのガイドで押さえておきたい理解ポイント",
        "label": "チェックリスト：このガイドで押さえておきたい理解ポイント",
        "lvl3": false
    },
    {
        "id": "参考文献出典",
        "label": "参考文献・出典",
        "lvl3": false
    },
    {
        "id": "原著情報",
        "label": "原著情報",
        "lvl3": true
    },
    {
        "id": "カーネルバージョンリリース管理",
        "label": "カーネルバージョン・リリース管理",
        "lvl3": true
    },
    {
        "id": "プロセススケジューラo1cfseevdfsched_ext",
        "label": "プロセススケジューラ（O(1)→CFS→EEVDF→sched_ext）",
        "lvl3": true
    },
    {
        "id": "rust-for-linux",
        "label": "Rust for Linux",
        "lvl3": true
    },
    {
        "id": "非同期ioio_uring",
        "label": "非同期I/O（io_uring）",
        "lvl3": true
    },
    {
        "id": "カーネル同期rcu",
        "label": "カーネル同期（RCU）",
        "lvl3": true
    },
    {
        "id": "ebpf-sched_ext",
        "label": "eBPF / sched_ext",
        "lvl3": true
    },
    {
        "id": "ファイルシステムbcachefsを巡る経緯を含む",
        "label": "ファイルシステム（bcachefsを巡る経緯を含む）",
        "lvl3": true
    },
    {
        "id": "さらに学ぶために関連書籍",
        "label": "さらに学ぶために（関連書籍）",
        "lvl3": true
    }
] as const;

export type DiagramId = 'diag-1' | 'diag-2' | 'diag-3' | 'diag-4' | 'diag-5' | 'diag-6' | 'diag-7' | 'diag-8' | 'diag-9' | 'diag-10' | 'diag-11' | 'diag-12' | 'diag-13' | 'diag-14' | 'diag-15' | 'diag-16' | 'diag-17' | 'diag-18' | 'diag-19' | 'diag-20' | 'diag-21' | 'diag-22' | 'diag-23' | 'diag-24' | 'diag-25' | 'diag-26' | 'diag-27' | 'diag-28' | 'diag-29' | 'diag-30' | 'diag-31' | 'diag-32' | 'diag-33' | 'diag-34' | 'diag-35' | 'diag-36' | 'diag-37' | 'diag-38' | 'diag-39' | 'diag-40' | 'diag-41' | 'diag-42' | 'diag-43' | 'diag-44' | 'diag-45';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    'diag-1': "0.1 オペレーティングシステムとカーネルの違いの解説図",
    'diag-2': "0.3 プロセス／カーネルモデル（Process/Kernel Model）の解説図",
    'diag-3': "0.4 リエントラント（再入可能）カーネルの解説図",
    'diag-4': "1.5 Unixファイルシステムの概観の解説図",
    'diag-5': "2.1 メモリアドレスの3つの顔の解説図",
    'diag-6': "2.4〜2.5 ページング機構の解説図",
    'diag-7': "3.1 プロセス、軽量プロセス、スレッドの解説図",
    'diag-8': "3.2 プロセスディスクリプタの解説図",
    'diag-9': "3.3 プロセス切り替え（コンテキストスイッチ）の解説図",
    'diag-10': "4.1〜4.2 割り込みシグナルの役割の解説図",
    'diag-11': "4.6〜4.7 割り込みハンドリングとSoftirq/Taskletの解説図",
    'diag-12': "5.2 同期プリミティブの解説図",
    'diag-13': "RCU（Read-Copy-Update）の考え方の解説図",
    'diag-14': "6.2 Linuxのタイムキーピングアーキテクチャの解説図",
    'diag-15': "7.1〜7.2 スケジューリングポリシーの解説図",
    'diag-16': "EEVDFへの進化の解説図",
    'diag-17': "バディシステムアロケータの解説図",
    'diag-18': "8.2 メモリ領域管理：スラブアロケータの解説図",
    'diag-19': "9.3 メモリ領域（VMA: Virtual Memory Area）の解説図",
    'diag-20': "9.4 ページフォルト例外ハンドラの解説図",
    'diag-21': "10.3 システムコールの発行・終了の解説図",
    'diag-22': "11.2〜11.3 シグナルの生成と配送の解説図",
    'diag-23': "12.1 VFSの役割の解説図",
    'diag-24': "12.2 VFSの4大オブジェクトの解説図",
    'diag-25': "12.5 パス名の探索（Pathname Lookup）の解説図",
    'diag-26': "13.2 デバイスドライバモデルの解説図",
    'diag-27': "13.4〜13.5 デバイスドライバの実装の解説図",
    'diag-28': "14.3 I/Oスケジューラの解説図",
    'diag-29': "15.1 ページキャッシュとはの解説図",
    'diag-30': "15.3 ダーティページの書き戻しの解説図",
    'diag-31': "16.2 メモリマッピング（mmap）の解説図",
    'diag-32': "2019年以降：io_uringによる非同期I/Oの刷新の解説図",
    'diag-33': "17.2 逆マッピング（Reverse Mapping）の解説図",
    'diag-34': "17.3 PFRAの実装：LRUリストの解説図",
    'diag-35': "18.1〜18.3 Ext2の設計の解説図",
    'diag-36': "2005年から2026年へ：Linuxファイルシステムの系譜の解説図",
    'diag-37': "19.1 パイプの解説図",
    'diag-38': "19.4 POSIX メッセージキューの解説図",
    'diag-39': "20.2 実行可能フォーマットの解説図",
    'diag-40': "A. システム起動の解説図",
    'diag-41': "B. モジュールの解説図",
    'diag-42': "22.3 Rust for Linux：C言語一辺倒からの転換の解説図",
    'diag-43': "22.4 eBPF：カーネルを「プログラム可能」にする技術の解説図",
    'diag-44': "22.5 コンテナ技術を支える namespaces と cgroupsの解説図",
    'diag-45': "学習ロードマップの解説図",
};

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    subgraph UserSpace["ユーザー空間 (User Space)"]
        App1["アプリケーション A<br/>(例: bash)"]
        App2["アプリケーション B<br/>(例: nginx)"]
        Lib["Cライブラリ (glibc/musl)"]
    end
    subgraph KernelSpace["カーネル空間 (Kernel Space)"]
        Sched["プロセススケジューラ"]
        MM["メモリ管理"]
        VFS["仮想ファイルシステム"]
        Net["ネットワークスタック"]
        Drv["デバイスドライバ"]
    end
    HW["ハードウェア<br/>(CPU / RAM / ディスク / NIC)"]

    App1 -- "システムコール" --> Lib
    App2 -- "システムコール" --> Lib
    Lib -- "int 0x80 / syscall命令" --> Sched
    Lib --> MM
    Lib --> VFS
    Lib --> Net
    Sched --> HW
    MM --> HW
    VFS --> Drv
    Net --> Drv
    Drv --> HW

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class App1,App2,Lib highlightFill
    class Sched,MM,VFS,Net,Drv warnFill
    class HW successFill`,

    'diag-2': `sequenceDiagram
    participant Proc as ユーザープロセス
    participant CPU as CPU (モード切替)
    participant Kernel as カーネルコード

    Proc->>CPU: read() を呼び出す
    CPU->>CPU: ユーザーモード→カーネルモードに切替
    CPU->>Kernel: システムコールハンドラを実行
    Kernel->>Kernel: VFS→ドライバ経由でディスクを読む
    Kernel-->>CPU: 処理完了、結果をレジスタにセット
    CPU->>CPU: カーネルモード→ユーザーモードに切替
    CPU-->>Proc: read() が値を返す`,

    'diag-3': `flowchart LR
    A["0. OS基礎"] --> B["1〜2. 序論と<br/>メモリアドレッシング"]
    B --> C["3〜5. プロセス・<br/>割り込み・同期"]
    C --> D["6〜9. 時間管理・<br/>スケジューラ・メモリ管理"]
    D --> E["10〜11. システムコール・<br/>シグナル"]
    E --> F["12〜18. ファイル<br/>システムとI/O"]
    F --> G["19〜20. IPC・<br/>プログラム実行"]
    G --> H["21〜22. 起動と<br/>2026年最新動向"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,B,C,D,E,F,G,H highlightFill`,

    'diag-4': `flowchart LR
    FD["ファイルディスクリプタ<br/>(プロセスごとの整数)"] --> FT["ファイルテーブルエントリ<br/>(オフセット・フラグ)"]
    FT --> Inode["inode<br/>(メタデータ: サイズ・権限・<br/>タイムスタンプ・データブロック位置)"]
    Inode --> Data["実データブロック<br/>(ディスク上)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class FD,FT,Inode,Data highlightFill`,

    'diag-5': `flowchart LR
    Logical["論理アドレス<br/>(セグメント:オフセット)"] -- セグメンテーションユニット --> Linear["線形アドレス<br/>(仮想アドレス)"]
    Linear -- ページングユニット --> Physical["物理アドレス<br/>(実メモリ番地)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Logical,Linear,Physical highlightFill`,

    'diag-6': `flowchart TB
    VA["仮想アドレス (48/57bit)"] --> PGD["PGD<br/>(Page Global Directory)"]
    PGD --> P4D["P4D<br/>(5段階時のみ)"]
    P4D --> PUD["PUD<br/>(Page Upper Directory)"]
    PUD --> PMD["PMD<br/>(Page Middle Directory)"]
    PMD --> PTE["PTE<br/>(Page Table Entry)"]
    PTE --> PA["物理ページフレーム"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class VA,PGD,P4D,PUD,PMD,PTE,PA highlightFill`,

    'diag-7': `flowchart TB
    Clone["clone() システムコール"] --> Flags{"どのリソースを<br/>親と共有するか？"}
    Flags -- "何も共有しない" --> Proc["独立したプロセス<br/>(fork() 相当)"]
    Flags -- "CLONE_VM + CLONE_FILES<br/>+ CLONE_FS" --> Thread["スレッド<br/>(pthread_create() 相当)"]
    Flags -- "一部だけ共有" --> LWP["軽量プロセス<br/>(部分的にリソースを共有)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Clone,Flags,Proc,Thread,LWP highlightFill`,

    'diag-8': `stateDiagram-v2
    direction LR
    [*] --> TASK_RUNNING: fork()/exec()
    TASK_RUNNING --> TASK_INTERRUPTIBLE: I/O待ち・sleep
    TASK_INTERRUPTIBLE --> TASK_RUNNING: イベント/シグナル到着
    TASK_RUNNING --> TASK_UNINTERRUPTIBLE: ディスクI/O等
    TASK_UNINTERRUPTIBLE --> TASK_RUNNING: I/O完了
    TASK_RUNNING --> TASK_STOPPED: SIGSTOP
    TASK_STOPPED --> TASK_RUNNING: SIGCONT
    TASK_RUNNING --> EXIT_ZOMBIE: exit()
    EXIT_ZOMBIE --> [*]: 親がwait()で回収`,

    'diag-9': `sequenceDiagram
    participant PA as プロセスA (実行中)
    participant Sched as スケジューラ
    participant PB as プロセスB (次に実行)

    PA->>Sched: タイムスライス満了 or ブロック
    Sched->>Sched: プロセスAのレジスタをtask_structへ保存
    Sched->>Sched: 次に実行するプロセスBを選択
    Sched->>PB: プロセスBのレジスタをCPUへ復元
    Sched->>PB: ページテーブルを切替 (CR3更新)
    PB->>PB: 実行再開`,

    'diag-10': `flowchart TB
    subgraph Sources["割り込み/例外の発生源"]
        HW["ハードウェアデバイス<br/>(ディスク完了・NIC受信・タイマー)"]
        CPUExc["CPU例外<br/>(ページフォルト・ゼロ除算)"]
        SysCall["システムコール<br/>(int 0x80 / syscall命令)"]
    end
    IDT["割り込みディスクリプタテーブル<br/>(IDT)"]
    Handler["割り込み/例外ハンドラ"]

    HW --> IDT
    CPUExc --> IDT
    SysCall --> IDT
    IDT --> Handler

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class HW,CPUExc,SysCall highlightFill
    class IDT,Handler warnFill`,

    'diag-11': `flowchart LR
    IRQ["ハードウェア割り込み<br/>(トップハーフ)"] --> Quick["最小限の処理のみ実行<br/>(データ受信の確認等)"]
    Quick --> Defer{"どの遅延機構へ<br/>委譲するか？"}
    Defer -- "高速・アトミック" --> SI["Softirq"]
    Defer -- "動的登録・アトミック" --> TL["Tasklet"]
    Defer -- "スリープ可能な処理" --> WQ["ワークキュー<br/>(カーネルスレッド)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class IRQ,Quick,Defer,SI,TL,WQ highlightFill`,

    'diag-12': `flowchart TB
    Q{"保持時間は<br/>短い？"}
    Q -- "はい・割り込みでも使う" --> Spin["スピンロック"]
    Q -- "いいえ・長時間/スリープ可能" --> Sem["セマフォ"]
    Q2{"読み取りが<br/>圧倒的多数？"}
    Q2 -- "はい" --> RCU["RCU"]
    Q2 -- "たまに書き込みも多い" --> RWSem["Read/Writeセマフォ・スピンロック"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Q,Spin,Sem,Q2,RCU,RWSem highlightFill`,

    'diag-13': `sequenceDiagram
    participant Reader as 読み手 (複数・ロック不要)
    participant Writer as 更新者
    participant GP as Grace Period<br/>(猶予期間管理)

    Reader->>Reader: 旧バージョンのデータを読み取り中
    Writer->>Writer: 新バージョンのデータ構造を構築
    Writer->>GP: ポインタを新バージョンに差し替え (公開)
    Note over Reader: 新しい読み手は新バージョンを見る
    Reader->>Reader: 旧バージョンを読んでいた読み手が読了
    GP->>GP: 全CPUが少なくとも1回<br/>スケジューリングポイントを通過するのを待つ
    GP->>Writer: 猶予期間終了を通知
    Writer->>Writer: 旧バージョンのメモリを解放`,

    'diag-14': `flowchart TB
    A["従来型: 周期的timer interrupt<br/>(例: 250Hz = 4ms間隔)"] -->|常時起床してCPUを消費| B["電力効率が悪い"]
    C["tickless (NO_HZ): 必要な時だけ<br/>割り込みをスケジュール"] -->|アイドル時は割り込みなし| D["省電力・低レイテンシ"]

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class A,B warnFill
    class C,D successFill`,

    'diag-15': `flowchart LR
    A["O(1) スケジューラ<br/>(〜2.6.22, 原著が解説)"] -->|2007, Linux 2.6.23| B["CFS<br/>Completely Fair Scheduler<br/>(Ingo Molnar)"]
    B -->|2023, Linux 6.6| C["EEVDF<br/>Earliest Eligible<br/>Virtual Deadline First<br/>(Peter Zijlstra)"]
    C -->|2024, Linux 6.12〜| D["sched_ext<br/>eBPFで独自スケジューラを<br/>差し替え可能に"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,B,C,D highlightFill`,

    'diag-16': `flowchart TB
    subgraph CFS_Model["CFSの選択基準"]
        C1["最小vruntimeのタスクを選ぶ"]
        C2["→ 緊急性の概念がない"]
    end
    subgraph EEVDF_Model["EEVDFの選択基準"]
        E1["lag = 公平に得るべきCPU時間 - 実際に得たCPU時間"]
        E2["lag >= 0 のタスクのみ eligible（実行資格あり）"]
        E3["eligible なタスクの中で<br/>最も早い仮想デッドラインを選ぶ"]
    end
    C1 --> C2
    E1 --> E2 --> E3

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class C1,C2 warnFill
    class E1,E2,E3 successFill`,

    'diag-17': `flowchart TB
    Free["空きブロック探索<br/>(要求サイズ 2^k ページ)"] --> Check{"要求サイズの<br/>フリーブロックがある？"}
    Check -- "ある" --> Alloc["そのブロックを割り当て"]
    Check -- "ない" --> Split["より大きい 2^(k+1) ブロックを<br/>2分割 (バディ生成)"]
    Split --> Check
    Free2["ブロック解放時"] --> Merge{"隣接するバディも<br/>空きか？"}
    Merge -- "はい" --> Combine["バディ同士を結合し<br/>より大きなブロックへ"]
    Merge -- "いいえ" --> Keep["そのままフリーリストへ"]
    Combine --> Merge

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Free,Check,Alloc,Split,Free2,Merge,Combine,Keep highlightFill`,

    'diag-18': `flowchart TB
    Cache["キャッシュ (kmem_cache)<br/>例: task_struct専用キャッシュ"] --> Slab1["スラブ1<br/>(バディシステムから確保した<br/>連続ページ)"]
    Cache --> Slab2["スラブ2"]
    Slab1 --> Obj1["オブジェクト1"]
    Slab1 --> Obj2["オブジェクト2"]
    Slab1 --> Obj3["オブジェクト3 (空き)"]

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Cache warnFill
    class Slab1,Slab2,Obj1,Obj2,Obj3 highlightFill`,

    'diag-19': `flowchart TB
    subgraph AddrSpace["プロセスの仮想アドレス空間 (低位→高位)"]
        direction TB
        Text["テキスト領域<br/>(実行コード, 読み取り専用)"]
        Data["データ領域<br/>(初期化済みグローバル変数)"]
        BSS["BSS領域<br/>(未初期化グローバル変数)"]
        Heap["ヒープ<br/>(malloc()で伸長, brk/sbrk)"]
        MmapArea["mmap領域<br/>(共有ライブラリ・ファイルマップ・<br/>匿名mmap)"]
        Stack["スタック<br/>(関数呼び出し, 高位→低位に伸長)"]
    end
    Text --> Data --> BSS --> Heap
    Heap -.拡張方向.-> MmapArea
    MmapArea -.拡張方向.-> Stack

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Text,Data,BSS,Heap,MmapArea,Stack highlightFill`,

    'diag-20': `flowchart TB
    PF["ページフォルト発生"] --> Check{"フォルトしたアドレスは<br/>有効なVMA内か？"}
    Check -- "No: 未使用領域" --> SIGSEGV["SIGSEGV送出<br/>(Segmentation Fault)"]
    Check -- "Yes" --> Type{"原因は？"}
    Type -- "ページがまだ<br/>物理メモリにない" --> Demand["デマンドページング<br/>(ディスクから読み込み<br/>or ゼロページ割当)"]
    Type -- "書き込みだが<br/>ページが共有(COW)" --> COW["Copy-On-Write<br/>(新しいページへコピー)"]
    Type -- "スワップアウト済み" --> SwapIn["スワップインして復元"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class SIGSEGV dangerFill
    class Demand,COW,SwapIn successFill`,

    'diag-21': `flowchart LR
    subgraph Legacy["伝統的方式 (原著が解説)"]
        L1["int $0x80"] --> L2["IDT経由でディスパッチ<br/>(比較的低速)"]
    end
    subgraph Modern["現代の高速方式"]
        M1["syscall命令 (x86-64)"] --> M2["MSRに登録された<br/>ハンドラへ直接ジャンプ<br/>(高速)"]
    end

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class L1,L2 warnFill
    class M1,M2 successFill`,

    'diag-22': `flowchart TB
    Gen["シグナル生成<br/>(kill()/tkill()/カーネル内部)"] --> Pending["保留シグナルキューへ追加"]
    Pending --> Check{"配送先プロセスは<br/>そのシグナルを<br/>ブロックしているか？"}
    Check -- "はい" --> Wait["ブロック解除まで保留"]
    Check -- "いいえ" --> Deliver["次にユーザーモードへ<br/>戻るタイミングで配送"]
    Deliver --> Action{"アクション種別"}
    Action -- "デフォルト" --> Default["デフォルト動作<br/>(終了・無視・停止・コアダンプ)"]
    Action -- "無視" --> Ignore["何もしない"]
    Action -- "カスタムハンドラ" --> Handler["シグナルハンドラを<br/>ユーザースタック上で実行"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Gen,Pending,Check,Wait,Deliver,Action,Default,Ignore,Handler highlightFill`,

    'diag-23': `flowchart TB
    App["アプリケーション<br/>open()/read()/write()"] --> VFS["VFS<br/>(共通インターフェース)"]
    VFS --> Ext4["ext4"]
    VFS --> XFS["XFS"]
    VFS --> Btrfs["Btrfs"]
    VFS --> NFS["NFS<br/>(ネットワークファイルシステム)"]
    VFS --> ProcFS["procfs/sysfs<br/>(擬似ファイルシステム)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class App,VFS highlightFill
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class Ext4,XFS,Btrfs,NFS,ProcFS warnFill`,

    'diag-24': `flowchart LR
    SB["スーパーブロック<br/>(ファイルシステム全体)"] --> Inode1["inode<br/>(ファイルA)"]
    SB --> Inode2["inode<br/>(ファイルB)"]
    Dentry1["dentry<br/>('/home/user/a.txt')"] -.対応.-> Inode1
    File1["fileオブジェクト<br/>(プロセスXが開いている)"] -.参照.-> Dentry1

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class SB,Inode1,Inode2,Dentry1,File1 highlightFill`,

    'diag-25': `flowchart LR
    Root["/"] --> Home["home"] --> User["user"] --> Doc["document.txt"]
    Root -.dcacheヒット.-> CacheNote["キャッシュされていれば<br/>ディスクI/Oなしで即座に解決"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Root,Home,User,Doc highlightFill
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class CacheNote successFill`,

    'diag-26': `flowchart TB
    Kobj["kobject<br/>(基本単位: 参照カウント・<br/>sysfsエントリを持つ)"] --> Device["Device<br/>(物理/論理デバイス)"]
    Kobj --> Driver["Driver<br/>(デバイスを操作するコード)"]
    Kobj --> Bus["Bus<br/>(PCI, USB, I2C等)"]
    Kobj --> Class["Class<br/>(機能種別: ブロック,<br/>ネットワーク, TTY等)"]
    Bus -- "デバイスとドライバの<br/>マッチング" --> Device
    Bus -- "デバイスとドライバの<br/>マッチング" --> Driver

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Kobj,Device,Driver,Bus,Class highlightFill`,

    'diag-27': `flowchart LR
    subgraph Without["DMAなしの場合"]
        W1["CPUがデバイスから<br/>1バイトずつコピー"] --> W2["CPU時間を大きく消費"]
    end
    subgraph With["DMAありの場合"]
        D1["CPUはDMAコントローラに<br/>転送を指示するだけ"] --> D2["デバイスとメモリ間で<br/>直接転送"] --> D3["転送完了時のみ<br/>割り込みでCPUに通知"]
    end

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class W1,W2 warnFill
    class D1,D2,D3 successFill`,

    'diag-28': `flowchart TB
    A["原著の時代:<br/>HDD前提のI/Oスケジューラ<br/>(Noop/CFQ/Deadline/Anticipatory)<br/>シングルキュー + シングルロック"] -->|SSD/NVMe普及、<br/>マルチコアCPU時代へ| B["blk-mq<br/>(Multi-Queue Block Layer)<br/>2013年 Linux 3.13〜"]
    B --> C["mq-deadline / kyber / bfq<br/>(マルチキュー対応スケジューラ)"]
    B --> D["NVMe: CPUコアごとに<br/>専用キューを持ち、<br/>ロック競合を最小化"]

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class A warnFill
    class B,C,D successFill`,

    'diag-29': `flowchart TB
    App["アプリケーションの read()"] --> Check{"該当ページは<br/>ページキャッシュに<br/>存在するか？"}
    Check -- "Yes: キャッシュヒット" --> Fast["メモリから即座にコピー<br/>(ディスクI/O不要)"]
    Check -- "No: キャッシュミス" --> Disk["ディスクから読み込み"]
    Disk --> Insert["ページキャッシュへ格納"]
    Insert --> Fast

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class App,Check,Fast,Disk,Insert highlightFill`,

    'diag-30': `flowchart LR
    Write["write() でページを変更"] --> Dirty["ダーティページとしてマーク"]
    Dirty --> Trigger{"書き戻しのトリガー"}
    Trigger -- "定期的" --> Periodic["dirty_writeback_centisecsごと"]
    Trigger -- "ダーティページが<br/>閾値を超過" --> Threshold["dirty_ratio到達"]
    Trigger -- "明示的" --> Explicit["sync()/fsync()呼び出し"]
    Periodic --> Flush["per-BDI flusherスレッドが<br/>ディスクへ書き戻し"]
    Threshold --> Flush
    Explicit --> Flush

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Write,Dirty,Trigger,Periodic,Threshold,Explicit,Flush highlightFill`,

    'diag-31': `flowchart TB
    subgraph ReadWrite["read()/write() 方式"]
        RW1["ユーザーバッファ確保"] --> RW2["read()でカーネルが<br/>ページキャッシュから<br/>ユーザーバッファへコピー"]
    end
    subgraph Mmap["mmap() 方式"]
        M1["mmap()でファイルを<br/>アドレス空間にマップ"] --> M2["ポインタで直接<br/>ページキャッシュを参照<br/>(コピー不要、<br/>デマンドページングで実現)"]
    end

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class RW1,RW2,M1,M2 highlightFill`,

    'diag-32': `flowchart LR
    subgraph UserSpace["ユーザー空間"]
        SQE["SQE作成<br/>(送信したいI/O要求)"]
    end
    SQ["Submission Queue<br/>(共有リングバッファ)"]
    Kernel["カーネル: I/O処理を実行<br/>(システムコール発行なしで<br/>複数要求をまとめて処理可能)"]
    CQ["Completion Queue<br/>(共有リングバッファ)"]
    subgraph UserSpace2["ユーザー空間"]
        CQE["CQE受信<br/>(完了通知をポーリング/待機)"]
    end

    SQE --> SQ --> Kernel --> CQ --> CQE

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class SQE,SQ,Kernel,CQ,CQE highlightFill`,

    'diag-33': `flowchart LR
    Page["物理ページフレーム"] -.rmap: 逆方向検索.-> VMA1["プロセスAのVMA"]
    Page -.rmap: 逆方向検索.-> VMA2["プロセスBのVMA<br/>(共有ライブラリ等で共有)"]
    VMA1 --> PTE1["プロセスAのPTE"]
    VMA2 --> PTE2["プロセスBのPTE"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Page,VMA1,VMA2,PTE1,PTE2 highlightFill`,

    'diag-34': `flowchart TB
    New["新規ページ"] --> Inactive["非アクティブリスト"]
    Inactive -- "参照(アクセス)された" --> Active["アクティブリスト"]
    Active -- "しばらく参照されない" --> Inactive
    Inactive -- "メモリ不足時、<br/>末尾から回収" --> Reclaim{"ダーティか？"}
    Reclaim -- "ファイルキャッシュ<br/>(クリーン)" --> Drop["即座に破棄可能"]
    Reclaim -- "匿名ページ<br/>(プロセスのヒープ等)" --> Swap["スワップ領域へ書き出し"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class New,Inactive,Active,Reclaim,Drop,Swap highlightFill`,

    'diag-35': `flowchart TB
    SB["スーパーブロック<br/>(全体メタデータ)"] --> BG1["ブロックグループ1"]
    SB --> BG2["ブロックグループ2"]
    SB --> BGN["ブロックグループN"]
    BG1 --> GD["グループディスクリプタ"]
    BG1 --> BM["ブロックビットマップ"]
    BG1 --> IM["inodeビットマップ"]
    BG1 --> IT["inodeテーブル"]
    BG1 --> DB["データブロック"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class SB,BG1,BG2,BGN,GD,BM,IM,IT,DB highlightFill`,

    'diag-36': `flowchart LR
    Ext2["Ext2<br/>(原著の主題)"] -->|ジャーナリング追加| Ext3["Ext3<br/>(原著が解説)"]
    Ext3 -->|エクステント・遅延割当<br/>大容量対応| Ext4["Ext4<br/>(2008〜、現在も主要ディストロの<br/>デフォルトの一つ)"]
    XFS["XFS<br/>(元SGI、大容量・並列I/O志向)"] --> Modern["現在の主要選択肢"]
    Ext4 --> Modern
    Btrfs["Btrfs<br/>(CoW, スナップショット,<br/>チェックサム内蔵)"] --> Modern
    ZFS["ZFS on Linux<br/>(ライセンス問題でDKMS配布)"] --> Modern

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class Ext2,Ext3 warnFill
    class Ext4,XFS,Btrfs,ZFS,Modern successFill`,

    'diag-37': `flowchart LR
    ProcA["プロセスA<br/>(書き込み側)"] -- "write()" --> Buf["カーネル内<br/>リングバッファ<br/>(通常64KB)"]
    Buf -- "read()" --> ProcB["プロセスB<br/>(読み取り側)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class ProcA,Buf,ProcB highlightFill`,

    'diag-38': `flowchart TB
    IPC{"IPC機構を選ぶ"}
    IPC -- "単純な親子間の<br/>ストリーム通信" --> Pipe["パイプ"]
    IPC -- "関係ないプロセス間の<br/>ストリーム通信" --> Fifo["名前付きパイプ (FIFO)"]
    IPC -- "最高速のデータ共有" --> Shm["共有メモリ"]
    IPC -- "構造化されたメッセージ<br/>+ epoll統合" --> Mq["POSIXメッセージキュー"]
    IPC -- "ネットワーク経由も<br/>視野に入れる汎用性" --> Socket["Unixドメインソケット /<br/>TCP・UDPソケット"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class IPC,Pipe,Fifo,Shm,Mq,Socket highlightFill`,

    'diag-39': `flowchart LR
    Shell["シェルが execve() を呼ぶ"] --> Check{"ファイル形式の判定"}
    Check -- "ELFマジックナンバー" --> ELF["ELFローダー<br/>(binfmt_elf)"]
    Check -- "シバン行 #!" --> Script["スクリプトインタプリタへ委譲<br/>(例: #!/bin/bash)"]
    Check -- "その他の登録形式" --> Other["binfmt_miscで登録された<br/>他のインタプリタ<br/>(例: Java, .NET, WASM等)"]
    ELF --> Load["セグメントをVMAへマッピング<br/>(テキスト・データ・動的リンカ)"]
    Load --> Entry["エントリポイントへジャンプ<br/>(通常は動的リンカ ld.so)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Shell,Check,ELF,Script,Other,Load,Entry highlightFill`,

    'diag-40': `flowchart TB
    Power["電源投入"] --> Firmware["ファームウェア初期化<br/>(原著: BIOS<br/>現代: 多くはUEFI)"]
    Firmware --> Boot["ブートローダ<br/>(GRUB2, systemd-boot等)"]
    Boot --> KernelLoad["カーネルイメージ + initramfsを<br/>メモリへロード"]
    KernelLoad --> RealMode["実モード初期化<br/>(setup.S等、最小限の<br/>ハードウェア検出)"]
    RealMode --> ProtectedMode["プロテクトモード/<br/>ロングモードへ移行"]
    ProtectedMode --> StartKernel["start_kernel()<br/>(C言語による本格的な初期化:<br/>メモリ管理・スケジューラ・<br/>VFS等の起動)"]
    StartKernel --> Init["init プロセス (PID 1) 起動<br/>(現代: 多くはsystemd)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Power,Firmware,Boot,KernelLoad,RealMode,ProtectedMode,StartKernel,Init highlightFill`,

    'diag-41': `flowchart LR
    Cmd["insmod / modprobe コマンド"] --> Load["モジュールをカーネル<br/>アドレス空間へロード"]
    Load --> Init2["モジュール初期化関数<br/>(module_init())を実行"]
    Init2 --> Register["デバイスドライバ・<br/>ファイルシステム等として登録"]
    Unload["rmmod コマンド"] --> Cleanup["モジュール終了関数<br/>(module_exit())を実行"]
    Cleanup --> Unreg["登録解除・メモリ解放"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Cmd,Load,Init2,Register,Unload,Cleanup,Unreg highlightFill`,

    'diag-42': `flowchart LR
    A["2022年 (Linux 6.1)<br/>Rustサポートを実験的に導入"] --> B["2024年 (Linux 6.8)<br/>最初のRust製ドライバがマージ"]
    B --> C["2025年12月<br/>Kernel Maintainers Summitで<br/>「実験」終了を正式宣言"]
    C --> D["2026年<br/>Android 16 (6.12カーネル)で<br/>Rust製ashmemモジュールが<br/>実機に大量出荷"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,B,C,D highlightFill`,

    'diag-43': `flowchart TB
    Dev["開発者がeBPFプログラムを記述<br/>(C言語のサブセット, またはRust)"] --> Compile["LLVM/Clangで<br/>eBPFバイトコードへコンパイル"]
    Compile --> Load["bpf()システムコールで<br/>カーネルへロード要求"]
    Load --> Verify["eBPFベリファイア<br/>(無限ループ・不正メモリアクセス<br/>がないことを静的検証)"]
    Verify -- "検証OK" --> JIT["JITコンパイラが<br/>ネイティブ機械語に変換"]
    Verify -- "検証NG" --> Reject["ロード拒否"]
    JIT --> Attach["指定されたフックポイントへ<br/>アタッチ (XDP, kprobe,<br/>tracepoint, LSM, sched_ext等)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Dev,Compile,Load,Verify,JIT,Attach highlightFill
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Reject dangerFill`,

    'diag-44': `flowchart TB
    subgraph Container["「コンテナ」の正体"]
        NS["名前空間による分離<br/>(見える世界を制限)"]
        CG["cgroupによる制限<br/>(使えるリソース量を制限)"]
    end
    NS --> Result["独立した実行環境に<br/>見える通常のLinuxプロセス"]
    CG --> Result

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class NS,CG,Result highlightFill`,

    'diag-45': `flowchart TB
    Step1["Step 1: 本ガイドで全体像を掴む<br/>(所要目安: 1〜2週間)"] --> Step2["Step 2: 手を動かす<br/>strace/ftrace/bpftraceで<br/>実際のシステムコール・<br/>スケジューリングを観察する"]
    Step2 --> Step3["Step 3: 原著 or 現行ドキュメントを<br/>興味のあるサブシステムから深掘り<br/>(例: docs.kernel.org の該当節)"]
    Step3 --> Step4["Step 4: QEMU上で自前のLinux環境を<br/>ビルド・起動し、カーネルパラメータや<br/>簡単なモジュールを実際に試す"]
    Step4 --> Step5["Step 5: 興味のあるサブシステムの<br/>メーリングリスト/LWN.netを購読し、<br/>実際の開発議論を追う"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Step1,Step2,Step3,Step4,Step5 highlightFill`,
};
