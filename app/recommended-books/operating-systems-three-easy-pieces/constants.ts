// app/recommended-books/operating-systems-three-easy-pieces/constants.ts

export interface NavItem {
    id: string;
    label: string;
    lvl3: boolean;
}

export const NAV_ITEMS: NavItem[] = [
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
        "id": "本書の三本柱",
        "label": "本書の三本柱",
        "lvl3": false
    },
    {
        "id": "メカニズムとポリシーostep全体を貫く合言葉",
        "label": "メカニズムとポリシー：OSTEP全体を貫く合言葉",
        "lvl3": false
    },
    {
        "id": "学習環境の準備",
        "label": "学習環境の準備",
        "lvl3": false
    },
    {
        "id": "第0部始める前に--osとコンピュータの基礎",
        "label": "第0部：始める前に — OSとコンピュータの基礎",
        "lvl3": false
    },
    {
        "id": "01-オペレーティングシステムとは何か",
        "label": "0.1 オペレーティングシステムとは何か",
        "lvl3": true
    },
    {
        "id": "02-歴史的背景第12章対話とイントロダクション",
        "label": "0.2 歴史的背景（第1〜2章：対話とイントロダクション）",
        "lvl3": true
    },
    {
        "id": "03-osの3大目標再掲第2章より",
        "label": "0.3 OSの3大目標（再掲・第2章より）",
        "lvl3": true
    },
    {
        "id": "第1部仮想化--cpu第311章",
        "label": "第1部：仮想化 — CPU（第3〜11章）",
        "lvl3": false
    },
    {
        "id": "11-プロセスとは何か第4章-processes",
        "label": "1.1 プロセスとは何か（第4章 Processes）",
        "lvl3": true
    },
    {
        "id": "12-プロセスapi第5章-process-api",
        "label": "1.2 プロセスAPI（第5章 Process API）",
        "lvl3": true
    },
    {
        "id": "13-制限付き直接実行第6章-limited-direct-execution",
        "label": "1.3 制限付き直接実行（第6章 Limited Direct Execution）",
        "lvl3": true
    },
    {
        "id": "14-cpuスケジューリング方針第7章-cpu-scheduling",
        "label": "1.4 CPUスケジューリング方針（第7章 CPU Scheduling）",
        "lvl3": true
    },
    {
        "id": "15-マルチレベルフィードバックキュー第8章-mlfq",
        "label": "1.5 マルチレベルフィードバックキュー（第8章 MLFQ）",
        "lvl3": true
    },
    {
        "id": "16-くじ引きスケジューリングと比例配分第9章-lottery-scheduling",
        "label": "1.6 くじ引きスケジューリングと比例配分（第9章 Lottery Scheduling）",
        "lvl3": true
    },
    {
        "id": "17-マルチcpuスケジューリング第10章-multiprocessor-scheduling",
        "label": "1.7 マルチCPUスケジューリング（第10章 Multiprocessor Scheduling）",
        "lvl3": true
    },
    {
        "id": "18-cpu仮想化のまとめ第11章",
        "label": "1.8 CPU仮想化のまとめ（第11章）",
        "lvl3": true
    },
    {
        "id": "第2部仮想化--メモリ第1224章",
        "label": "第2部：仮想化 — メモリ（第12〜24章）",
        "lvl3": false
    },
    {
        "id": "21-アドレス空間第13章-address-spaces",
        "label": "2.1 アドレス空間（第13章 Address Spaces）",
        "lvl3": true
    },
    {
        "id": "22-メモリapi第14章-memory-api",
        "label": "2.2 メモリAPI（第14章 Memory API）",
        "lvl3": true
    },
    {
        "id": "23-アドレス変換の基礎ベースバウンド第15章-address-translation",
        "label": "2.3 アドレス変換の基礎：ベース＆バウンド（第15章 Address Translation）",
        "lvl3": true
    },
    {
        "id": "24-セグメンテーション第16章-segmentation",
        "label": "2.4 セグメンテーション（第16章 Segmentation）",
        "lvl3": true
    },
    {
        "id": "25-空き領域管理第17章-free-space-management",
        "label": "2.5 空き領域管理（第17章 Free-Space Management）",
        "lvl3": true
    },
    {
        "id": "26-ページングの導入第18章-paging",
        "label": "2.6 ページングの導入（第18章 Paging）",
        "lvl3": true
    },
    {
        "id": "27-高速化tlb第19章-translation-lookaside-buffers",
        "label": "2.7 高速化：TLB（第19章 Translation Lookaside Buffers）",
        "lvl3": true
    },
    {
        "id": "28-高度なページテーブル第20章-advanced-page-tables",
        "label": "2.8 高度なページテーブル（第20章 Advanced Page Tables）",
        "lvl3": true
    },
    {
        "id": "29-スワッピングメカニズム第21章-beyond-physical-memory-mechanisms",
        "label": "2.9 スワッピング：メカニズム（第21章 Beyond Physical Memory:\n                        Mechanisms）",
        "lvl3": true
    },
    {
        "id": "210-スワッピングポリシー第22章-beyond-physical-memory-policies",
        "label": "2.10 スワッピング：ポリシー（第22章 Beyond Physical Memory: Policies）",
        "lvl3": true
    },
    {
        "id": "211-完全なvmシステム第23章-complete-virtual-memory-systems",
        "label": "2.11 完全なVMシステム（第23章 Complete Virtual Memory Systems）",
        "lvl3": true
    },
    {
        "id": "212-メモリ仮想化のまとめ第24章",
        "label": "2.12 メモリ仮想化のまとめ（第24章）",
        "lvl3": true
    },
    {
        "id": "第3部並行性第2534章",
        "label": "第3部：並行性（第25〜34章）",
        "lvl3": false
    },
    {
        "id": "31-スレッドと並行性の導入第26章-concurrency-and-threads",
        "label": "3.1 スレッドと並行性の導入（第26章 Concurrency and Threads）",
        "lvl3": true
    },
    {
        "id": "32-スレッドapi第27章-thread-api",
        "label": "3.2 スレッドAPI（第27章 Thread API）",
        "lvl3": true
    },
    {
        "id": "33-ロック第28章-locks",
        "label": "3.3 ロック（第28章 Locks）",
        "lvl3": true
    },
    {
        "id": "34-ロックを使ったデータ構造第29章-lock-based-concurrent-data-structures",
        "label": "3.4 ロックを使ったデータ構造（第29章 Lock-based Concurrent Data\n                        Structures）",
        "lvl3": true
    },
    {
        "id": "35-条件変数第30章-condition-variables",
        "label": "3.5 条件変数（第30章 Condition Variables）",
        "lvl3": true
    },
    {
        "id": "36-セマフォ第31章-semaphores",
        "label": "3.6 セマフォ（第31章 Semaphores）",
        "lvl3": true
    },
    {
        "id": "37-並行性バグ第32章-concurrency-bugs",
        "label": "3.7 並行性バグ（第32章 Concurrency Bugs）",
        "lvl3": true
    },
    {
        "id": "38-イベントベース並行性第33章-event-based-concurrency",
        "label": "3.8 イベントベース並行性（第33章 Event-based Concurrency）",
        "lvl3": true
    },
    {
        "id": "39-並行性のまとめ第34章",
        "label": "3.9 並行性のまとめ（第34章）",
        "lvl3": true
    },
    {
        "id": "第4部永続性第3551章",
        "label": "第4部：永続性（第35〜51章）",
        "lvl3": false
    },
    {
        "id": "41-ioデバイス第36章-io-devices",
        "label": "4.1 I/Oデバイス（第36章 I/O Devices）",
        "lvl3": true
    },
    {
        "id": "42-ハードディスクドライブ第37章-hard-disk-drives",
        "label": "4.2 ハードディスクドライブ（第37章 Hard Disk Drives）",
        "lvl3": true
    },
    {
        "id": "43-raid第38章-redundant-arrays-of-inexpensive-disks",
        "label": "4.3 RAID（第38章 Redundant Arrays of Inexpensive Disks）",
        "lvl3": true
    },
    {
        "id": "44-ファイルとディレクトリ第39章-files-and-directories",
        "label": "4.4 ファイルとディレクトリ（第39章 Files and Directories）",
        "lvl3": true
    },
    {
        "id": "45-ファイルシステム実装第40章-file-system-implementation",
        "label": "4.5 ファイルシステム実装（第40章 File System Implementation）",
        "lvl3": true
    },
    {
        "id": "46-高速化fast-file-system第41章-ffs",
        "label": "4.6 高速化：Fast File System（第41章 FFS）",
        "lvl3": true
    },
    {
        "id": "47-クラッシュ一貫性fsckとジャーナリング第42章",
        "label": "4.7 クラッシュ一貫性：FSCKとジャーナリング（第42章）",
        "lvl3": true
    },
    {
        "id": "48-ログ構造化ファイルシステム第43章-log-structured-file-system-lfs",
        "label": "4.8 ログ構造化ファイルシステム（第43章 Log-structured File System, LFS）",
        "lvl3": true
    },
    {
        "id": "49-フラッシュベースssd第44章-flash-based-ssds",
        "label": "4.9 フラッシュベースSSD（第44章 Flash-based SSDs）",
        "lvl3": true
    },
    {
        "id": "410-データ整合性と保護第45章-data-integrity-and-protection",
        "label": "4.10 データ整合性と保護（第45章 Data Integrity and Protection）",
        "lvl3": true
    },
    {
        "id": "411-永続性ローカルファイルシステムのまとめ第46章",
        "label": "4.11 永続性（ローカルファイルシステム）のまとめ（第46章）",
        "lvl3": true
    },
    {
        "id": "412-分散システム入門第48章-distributed-systems",
        "label": "4.12 分散システム入門（第48章 Distributed Systems）",
        "lvl3": true
    },
    {
        "id": "413-network-file-system第49章-nfs",
        "label": "4.13 Network File System（第49章 NFS）",
        "lvl3": true
    },
    {
        "id": "414-andrew-file-system第50章-afs",
        "label": "4.14 Andrew File System（第50章 AFS）",
        "lvl3": true
    },
    {
        "id": "415-分散ストレージのまとめ第51章",
        "label": "4.15 分散ストレージのまとめ（第51章）",
        "lvl3": true
    },
    {
        "id": "第5部セキュリティ第5257章web版限定の追加章",
        "label": "第5部：セキュリティ（第52〜57章、Web版限定の追加章）",
        "lvl3": false
    },
    {
        "id": "51-セキュリティ入門第53章",
        "label": "5.1 セキュリティ入門（第53章）",
        "lvl3": true
    },
    {
        "id": "52-認証第54章-authentication",
        "label": "5.2 認証（第54章 Authentication）",
        "lvl3": true
    },
    {
        "id": "53-アクセス制御第55章-access-control",
        "label": "5.3 アクセス制御（第55章 Access Control）",
        "lvl3": true
    },
    {
        "id": "54-暗号第56章-cryptography",
        "label": "5.4 暗号（第56章 Cryptography）",
        "lvl3": true
    },
    {
        "id": "55-分散システムのセキュリティ第57章",
        "label": "5.5 分散システムのセキュリティ（第57章）",
        "lvl3": true
    },
    {
        "id": "第6部付録とラボ課題",
        "label": "第6部：付録とラボ課題",
        "lvl3": false
    },
    {
        "id": "61-仮想マシンvirtual-machines付録",
        "label": "6.1 仮想マシン（Virtual Machines、付録）",
        "lvl3": true
    },
    {
        "id": "62-モニタmonitors付録",
        "label": "6.2 モニタ（Monitors、付録）",
        "lvl3": true
    },
    {
        "id": "63-ラボチュートリアルとプロジェクト課題",
        "label": "6.3 ラボチュートリアルとプロジェクト課題",
        "lvl3": true
    },
    {
        "id": "第7部2026年8月時点の最新動向とostepの学び方",
        "label": "第7部：2026年8月時点の最新動向とOSTEPの学び方",
        "lvl3": false
    },
    {
        "id": "71-コミュニティでの学習リソース2026年",
        "label": "7.1 コミュニティでの学習リソース（2026年）",
        "lvl3": true
    },
    {
        "id": "学習ロードマップ",
        "label": "学習ロードマップ",
        "lvl3": false
    },
    {
        "id": "学習チェックリスト",
        "label": "学習チェックリスト",
        "lvl3": false
    },
    {
        "id": "用語集",
        "label": "用語集",
        "lvl3": false
    },
    {
        "id": "参考文献出典",
        "label": "参考文献・出典",
        "lvl3": false
    },
    {
        "id": "一次情報源著者開発元公式サイト",
        "label": "一次情報源（著者・開発元・公式サイト）",
        "lvl3": true
    },
    {
        "id": "二次情報コミュニティ情報源補足",
        "label": "二次情報・コミュニティ情報源（補足）",
        "lvl3": true
    }
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15'
    | 'diag-16'
    | 'diag-17'
    | 'diag-18'
    | 'diag-19'
    | 'diag-20'
    | 'diag-21'
    | 'diag-22'
    | 'diag-23'
    | 'diag-24'
    | 'diag-25'
    | 'diag-26'
    | 'diag-27'
    | 'diag-28'
    | 'diag-29'
    | 'diag-30'
    | 'diag-31'
    | 'diag-32'
    | 'diag-33'
    | 'diag-34'
    | 'diag-35'
    | 'diag-36'
    | 'diag-37'
    | 'diag-38'
    | 'diag-39'
    | 'diag-40'
    | 'diag-41'
    | 'diag-42'
    | 'diag-43'
    | 'diag-44'
    | 'diag-45'
    | 'diag-46'
    | 'diag-47'
    | 'diag-48'
    | 'diag-49'
    | 'diag-50'
    | 'diag-51'
    | 'diag-52'
    | 'diag-53'
    | 'diag-54'
    | 'diag-55'
    | 'diag-56';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    'diag-1': "本書の三本柱（仮想化・並行性・永続性）",
    'diag-2': "メカニズムとポリシーの分離原則",
    'diag-3': "OSTEPの学習サイクルとシミュレータ活用",
    'diag-4': "OSの役割とシステム階層構造",
    'diag-5': "バッチ処理からタイムシェアリングへの歴史的変遷",
    'diag-6': "プログラムからプロセスへの変換と実行状態",
    'diag-7': "プロセスの状態遷移図（実行・レディ・待機）",
    'diag-8': "fork・exec・waitシステムコールの協調動作",
    'diag-9': "制限付き直接実行（LDE）の基本フロー",
    'diag-10': "タイマー割り込みによるコンテキストスイッチ",
    'diag-11': "CPUスケジューリング方針（FIFO・SJF・STCF・RR）の比較",
    'diag-12': "マルチレベルフィードバックキュー（MLFQ）の優先度制御",
    'diag-13': "くじ引きスケジューリングのチケット配分",
    'diag-14': "マルチプロセッサスケジューリング（SQMS vs MQMS）",
    'diag-15': "プロセスの仮想アドレス空間の構造",
    'diag-16': "C言語におけるメモリ管理API（malloc・free）の役割",
    'diag-17': "ベース＆バウンド方式によるアドレス変換",
    'diag-18': "セグメンテーションによるアドレス空間の分割",
    'diag-19': "空き領域管理（Free-List）と外部断片化",
    'diag-20': "仮想ページから物理フレームへのページング変換",
    'diag-21': "TLB（変換索引バッファ）によるアドレス変換の高速化",
    'diag-22': "多段ページテーブルによるメモリ節約構造",
    'diag-23': "スワッピングのページフォールトハンドリング手順",
    'diag-24': "ページ置換ポリシー（FIFO・LRU・クロック）の比較",
    'diag-25': "完全なVMシステム（VMAとページキャッシュ）の連携",
    'diag-26': "スレッドとプロセスのメモリ共有構造",
    'diag-27': "スピンロックとスリープロックの制御構造",
    'diag-28': "ロックを用いた並行データ構造（キュー・カウンタ）",
    'diag-29': "条件変数を用いた生産者・消費者パターンの同期シーケンス",
    'diag-30': "セマフォによるリソース管理と排他制御",
    'diag-31': "非デッドロック並行性バグ（アトミック性・順序違反）",
    'diag-32': "デッドロックの発生条件と循環待ちの発生",
    'diag-33': "イベントループと非同期I/Oのイベントベース並行性",
    'diag-34': "正規化デバイスアーキテクチャとバス階層",
    'diag-35': "割り込み駆動型I/OとDMA（Direct Memory Access）フロー",
    'diag-36': "ハードディスクドライブ（HDD）の物理構造とシーク時間",
    'diag-37': "RAIDレベル（RAID 0, 1, 4, 5）のデータ配置と耐障害性",
    'diag-38': "ファイルシステムのinodeとディレクトリエントリ構造",
    'diag-39': "VSFS（極小ファイルシステム）のディスクブロック配置",
    'diag-40': "Fast File System（FFS）のシリンダグループ構造",
    'diag-41': "FSCKとジャーナリングのクラッシュ復旧比較",
    'diag-42': "ジャーナリングファイルシステムの書き込みシーケンス",
    'diag-43': "ログ構造化ファイルシステム（LFS）のセグメント書き込み",
    'diag-44': "フラッシュSSDのFTL（Flash Translation Layer）と摩耗平準化",
    'diag-45': "データ整合性のためのチェックサムとスクラビング",
    'diag-46': "分散システムにおけるRPC（遠隔手続き呼び出し）モデル",
    'diag-47': "NFS（Network File System）のステートレスプロトコル構造",
    'diag-48': "Andrew File System（AFS）のクライアントキャッシュモデル",
    'diag-49': "OSセキュリティの3本柱（認証・アクセス制御・暗号）",
    'diag-50': "認証メカニズム（パスワード・公開鍵認証）",
    'diag-51': "アクセス制御（ACL vs ケーパビリティ）のモデル",
    'diag-52': "対称鍵暗号と公開鍵暗号の使い分け",
    'diag-53': "ハイパーバイザ（Type-1 vs Type-2）の仮想マシン構成",
    'diag-54': "OSTEPラボチュートリアルとxv6プロジェクトの課題構成",
    'diag-55': "現代システムにおけるOS進化（EEVDF, sched_ext, io_uring, eBPF）",
    'diag-56': "OSTEP学習ロードマップ（基礎から発展まで）",
};

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    OS["オペレーティングシステム<br/>(OS)"]
    V["仮想化<br/>Virtualization"]
    C["並行性<br/>Concurrency"]
    P["永続性<br/>Persistence"]

    OS --> V
    OS --> C
    OS --> P

    V --> V1["CPUの仮想化<br/>(プロセス・スケジューリング)"]
    V --> V2["メモリの仮想化<br/>(アドレス空間・ページング)"]

    C --> C1["ロック・条件変数<br/>・セマフォ"]
    C --> C2["並行性バグと<br/>デッドロック"]

    P --> P1["ディスク・SSDなどの<br/>ストレージデバイス"]
    P --> P2["ファイルシステムと<br/>クラッシュ一貫性"]

    classDef pillar fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef leaf fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class V,C,P pillar
    class V1,V2,C1,C2,P1,P2 leaf`,
    'diag-2': `flowchart LR
    Q["ある機能を実現したい"]
    Q --> M["メカニズム<br/>(How)<br/>それを可能にする<br/>低レベルな仕組み"]
    Q --> P["ポリシー<br/>(Which)<br/>どの選択肢を選ぶかの<br/>意思決定ロジック"]

    M --> M1["例: 文脈保存/復元、<br/>タイマー割り込み、<br/>ページテーブル"]
    P --> P1["例: 次にどのプロセスを<br/>CPUに割り当てるか、<br/>どのページを追い出すか"]

    classDef q fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Q q
    class M,P,M1,P1 box`,
    'diag-3': `flowchart LR
    A["OSTEP本文を読む"] --> B["章末の<br/>宿題シミュレータで<br/>直感を確認"]
    B --> C["ostep-projectsの<br/>Cプロジェクトで<br/>実装力を鍛える"]
    C --> D["xv6ラボで<br/>本物のカーネルに<br/>手を入れる"]

    classDef step fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class A,B,C,D step`,
    'diag-4': `flowchart TB
    subgraph APPS["アプリケーション層"]
        A1["ブラウザ"]
        A2["エディタ"]
        A3["データベース"]
    end

    OS["オペレーティングシステム<br/>(資源管理・抽象化・保護)"]

    subgraph HW["物理ハードウェア"]
        H1["CPU"]
        H2["メモリ(DRAM)"]
        H3["ディスク/SSD"]
        H4["ネットワークカード"]
    end

    APPS -->|"システムコール"| OS
    OS -->|"特権命令"| HW

    classDef appfill fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    classDef osfill fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef hwfill fill:#20303f,stroke:#5c7a99,color:#cfe0ee
    class A1,A2,A3 appfill
    class OS osfill
    class H1,H2,H3,H4 hwfill`,
    'diag-5': `flowchart LR
    A["バッチ処理<br/>(1950年代)<br/>1プログラムずつ<br/>順番に実行"]
    B["マルチプログラミング<br/>(1960年代)<br/>複数プログラムを<br/>メモリに常駐させ<br/>CPUの遊休を削減"]
    C["タイムシェアリング<br/>(1960年代後半〜)<br/>複数ユーザーが<br/>対話的に同時利用"]
    D["現代のOS<br/>UNIX系譜<br/>(Linux/BSD/macOS)"]

    A --> B --> C --> D

    classDef era fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class A,B,C,D era`,
    'diag-6': `flowchart LR
    Prog["プログラム<br/>(ディスク上の静的な実行可能ファイル)"]
    Load["OSがロード<br/>・メモリへのマッピング<br/>・スタック/ヒープの初期化<br/>・レジスタの初期化"]
    Proc["プロセス<br/>(実行中の動的なインスタンス)"]

    Prog --> Load --> Proc

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Prog,Load,Proc box`,
    'diag-7': `stateDiagram-v2
    direction LR
    [*] --> Ready: 生成(create)
    Ready --> Running: スケジュール(schedule)
    Running --> Ready: 一時停止(descheduled)
    Running --> Blocked: I/O発行など
    Blocked --> Ready: I/O完了
    Running --> [*]: 終了(exit)`,
    'diag-8': `sequenceDiagram
    participant Parent as 親プロセス
    participant Child as 子プロセス(fork後)

    Parent->>Parent: fork() 呼び出し
    Parent->>Child: プロセスを複製<br/>(アドレス空間・レジスタをコピー)
    Note over Parent,Child: fork()の戻り値で<br/>親子を判別<br/>(子には0、親には子のPIDが返る)
    Child->>Child: exec() で<br/>別プログラムに置き換え
    Parent->>Parent: wait() で<br/>子の終了を待機
    Child-->>Parent: 終了ステータスを通知`,
    'diag-9': `flowchart TB
    Goal["CPU仮想化の目標"]
    Perf["性能<br/>プログラムをできるだけ<br/>ハードウェア上で直接実行したい"]
    Ctrl["制御<br/>OSが常に主導権を<br/>取り戻せる必要がある"]
    Goal --> Perf
    Goal --> Ctrl
    Sol["解決策:<br/>制限付き直接実行<br/>(Limited Direct Execution, LDE)"]
    Perf --> Sol
    Ctrl --> Sol

    classDef g fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Goal g
    class Perf,Ctrl,Sol box`,
    'diag-10': `flowchart TD
    subgraph SYSCALL["システムコールによる制御移譲(協調的)"]
        S1["ユーザーモードで実行中"] --> S2["trap命令を実行<br/>(システムコール呼び出し)"]
        S2 --> S3["ユーザー→カーネルモードへ<br/>特権レベル昇格"]
        S3 --> S4["トラップテーブルを参照し<br/>該当ハンドラへジャンプ"]
        S4 --> S5["カーネルがシステムコールを処理"]
        S5 --> S6["return-from-trap命令で<br/>ユーザーモードへ復帰"]
    end

    subgraph TIMER["タイマー割り込みによる制御奪還(非協調的)"]
        T1["ユーザーモードで実行中"] --> T2["ハードウェアタイマーが<br/>一定間隔で割り込みを発生"]
        T2 --> T3["強制的にカーネルモードへ"]
        T3 --> T4["スケジューラが<br/>次に実行するプロセスを決定"]
        T4 --> T5["コンテキストスイッチ"]
    end

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class S1,S2,S3,S4,S5,S6,T1,T2,T3,T4,T5 box`,
    'diag-11': `flowchart TB
    FIFO["FIFO(FCFS)<br/>到着順に実行<br/>実装は単純だが<br/>コンボイ効果に弱い"]
    SJF["SJF<br/>Shortest Job First<br/>実行時間が短い順<br/>非プリエンプティブ"]
    STCF["STCF<br/>Shortest Time-to-Completion First<br/>SJFのプリエンプティブ版<br/>新規ジョブ到着時に再評価"]
    RR["RR<br/>Round Robin<br/>タイムスライスごとに<br/>順番にCPUを回す<br/>応答時間を重視"]

    FIFO -->|"弱点: 長いジョブが<br/>後続を待たせる"| SJF
    SJF -->|"弱点: 実行中は<br/>横取りできない"| STCF
    STCF -->|"弱点: ターンアラウンドは<br/>最適だが応答時間が悪化"| RR

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class FIFO,SJF,STCF,RR box`,
    'diag-12': `flowchart TB
    Q1["優先度キュー Q3(最高)<br/>タイムスライス: 小"]
    Q2["優先度キュー Q2"]
    Q3["優先度キュー Q1"]
    Q4["優先度キュー Q0(最低)<br/>タイムスライス: 大"]

    Q1 -->|"タイムスライスを<br/>使い切ったら降格"| Q2
    Q2 -->|"タイムスライスを<br/>使い切ったら降格"| Q3
    Q3 -->|"タイムスライスを<br/>使い切ったら降格"| Q4
    Q4 -->|"一定時間ごとに<br/>優先度ブースト"| Q1

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Q1,Q2,Q3,Q4 box`,
    'diag-13': `flowchart LR
    A["各ジョブに<br/>チケット(tickets)を割り当てる"]
    B["スケジューラが<br/>乱数でチケットを1枚抽選"]
    C["当選チケットを持つ<br/>ジョブがCPUを獲得"]
    D["確率的に、保有チケット数に<br/>比例したCPU時間シェアを得る"]

    A --> B --> C --> D

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class A,B,C,D box`,
    'diag-14': `flowchart TB
    Cache["キャッシュアフィニティ<br/>(cache affinity)<br/>同じCPU上で実行し続けると<br/>キャッシュのヒット率が高い"]
    Single["シングルキュー方式<br/>(SQMS)<br/>実装は単純だが<br/>ロック競合とキャッシュ<br/>アフィニティの欠如が課題"]
    Multi["マルチキュー方式<br/>(MQMS)<br/>CPUごとに独立したキュー<br/>スケーラブルだが<br/>負荷不均衡が課題"]
    LB["負荷分散<br/>(load balancing/<br/>work stealing)<br/>暇なCPUが<br/>他のキューからジョブを奪う"]

    Single -->|"スケールしない"| Multi
    Multi --> LB
    Cache -.->|"考慮が必要"| Single
    Cache -.->|"考慮が必要"| Multi

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Cache,Single,Multi,LB box`,
    'diag-15': `flowchart TB
    subgraph AS["1つのプロセスのアドレス空間(論理レイアウト)"]
        direction TB
        Code["コード領域<br/>(プログラム命令、静的)"]
        Heap["ヒープ領域<br/>(動的確保、下から上に成長)"]
        Gap["未使用領域"]
        Stack["スタック領域<br/>(関数呼び出し情報、上から下に成長)"]
    end
    Code --- Heap --- Gap --- Stack

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Code,Heap,Gap,Stack box`,
    'diag-16': `flowchart TB
    B1["未初期化の読み取り<br/>(uninitialized read)"]
    B2["メモリリーク<br/>(memory leak)"]
    B3["解放済み領域の使用<br/>(use after free)"]
    B4["二重解放<br/>(double free)"]
    B5["不正なfree呼び出し<br/>(invalid free)"]

    classDef bug fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class B1,B2,B3,B4,B5 bug`,
    'diag-17': `flowchart LR
    VA["仮想アドレス<br/>(プログラムが使うアドレス)"]
    Base["ベースレジスタを加算"]
    Check["バウンドレジスタと比較<br/>(範囲外なら例外)"]
    PA["物理アドレス"]

    VA --> Base --> Check --> PA

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class VA,Base,Check,PA box`,
    'diag-18': `flowchart TB
    subgraph SEG["セグメントテーブル"]
        S1["コードセグメント<br/>base=X, bound=Y"]
        S2["ヒープセグメント<br/>base=X2, bound=Y2"]
        S3["スタックセグメント<br/>base=X3, bound=Y3<br/>(逆方向に成長するため<br/>特別な扱いが必要)"]
    end
    VA["仮想アドレス"] -->|"上位ビットで<br/>セグメントを識別"| SEG
    SEG --> PA["物理アドレス"]

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class S1,S2,S3,VA,PA box`,
    'diag-19': `flowchart TB
    First["First Fit<br/>最初に見つかった<br/>十分な大きさの空き領域を使う"]
    Best["Best Fit<br/>要求サイズに最も近い<br/>空き領域を探して使う"]
    Worst["Worst Fit<br/>最も大きい空き領域を使う<br/>(大きな断片を残す狙い)"]
    Buddy["Buddy System<br/>サイズを2のべき乗で管理し<br/>分割/併合を高速化"]

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class First,Best,Worst,Buddy box`,
    'diag-20': `flowchart LR
    subgraph VAS["仮想アドレス空間(ページ単位)"]
        VP0["Page 0"]
        VP1["Page 1"]
        VP2["Page 2"]
        VP3["Page 3"]
    end
    subgraph PT["ページテーブル(PT)"]
        PTE["各エントリが<br/>仮想ページ→物理フレームの<br/>対応を保持"]
    end
    subgraph PHYS["物理メモリ(フレーム単位)"]
        PF3["Frame 3"]
        PF7["Frame 7"]
        PF1["Frame 1"]
        PF9["Frame 9"]
    end

    VP0 -.-> PT
    VP1 -.-> PT
    VP2 -.-> PT
    VP3 -.-> PT
    PT --> PF3
    PT --> PF7
    PT --> PF1
    PT --> PF9

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class VP0,VP1,VP2,VP3,PTE,PF3,PF7,PF1,PF9 box`,
    'diag-21': `flowchart TD
    Start["メモリアクセス発生"] --> TLBCheck{"TLBに<br/>該当エントリあり?"}
    TLBCheck -->|"ヒット<br/>(TLB Hit)"| Fast["高速に物理アドレス取得"]
    TLBCheck -->|"ミス<br/>(TLB Miss)"| Slow["ページテーブルを参照<br/>(ソフトウェア/ハードウェア方式)"]
    Slow --> Update["TLBにエントリを追加"]
    Update --> Retry["命令を再実行"]

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Start,Fast,Slow,Update,Retry box
    classDef decision fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    class TLBCheck decision`,
    'diag-22': `flowchart TB
    Linear["線形ページテーブル<br/>(単純だが巨大)"]
    Multi["多階層ページテーブル<br/>(multi-level)<br/>使われていない領域の<br/>テーブルを丸ごと省略"]
    Inverted["逆ページテーブル<br/>(inverted page table)<br/>物理フレームごとに1エントリ<br/>(仮想アドレスの数に依存しない)"]
    Hybrid["ハイブリッドアプローチ<br/>(多階層+TLB+デマンドページング)<br/>現代のOSで広く採用"]

    Linear -->|"空間効率の改善"| Multi
    Linear -->|"別アプローチ"| Inverted
    Multi --> Hybrid
    Inverted --> Hybrid

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Linear,Multi,Inverted,Hybrid box`,
    'diag-23': `sequenceDiagram
    participant CPU as CPU
    participant PT as ページテーブル
    participant Mem as 物理メモリ
    participant Disk as ディスク(スワップ領域)

    CPU->>PT: 仮想アドレスへアクセス
    PT-->>CPU: 有効ビットOFF(ページフォールト)
    CPU->>PT: OSのページフォールトハンドラを起動
    PT->>Disk: 対象ページを検索
    Disk-->>Mem: ページをメモリへ読み込み
    Mem->>PT: ページテーブルエントリを更新
    PT-->>CPU: 命令を再実行し継続`,
    'diag-24': `flowchart TB
    Opt["最適方針(OPT)<br/>将来最も遠い未来に<br/>使われるページを追い出す<br/>(理論上限、実装不可)"]
    FIFO["FIFO<br/>最も古くロードされた<br/>ページを追い出す<br/>(Beladyの異常が起きうる)"]
    LRU["LRU<br/>最も長く<br/>使われていないページを<br/>追い出す(局所性を活用)"]
    Clock["クロックアルゴリズム<br/>(近似LRU)<br/>参照ビットを使って<br/>低コストにLRUを近似"]

    Opt -.->|"理論上の目標"| LRU
    FIFO -->|"改善"| LRU
    LRU -->|"実装コストの低減"| Clock

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Opt,FIFO,LRU,Clock box`,
    'diag-25': `flowchart LR
    subgraph VAX["VAX/VMS(歴史的な設計)"]
        V1["セグメント+ページングの<br/>ハイブリッド"]
        V2["OS自身も仮想メモリに<br/>配置(オーバーヘッド削減)"]
    end
    subgraph Linux["現代のLinux"]
        L1["多階層ページテーブル<br/>+ Huge Pages対応"]
        L2["デマンドゼロページ<br/>(demand zeroing)"]
        L3["Copy-on-Write(COW)<br/>fork()の高速化"]
    end

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class V1,V2,L1,L2,L3 box`,
    'diag-26': `flowchart TB
    subgraph SingleProc["マルチスレッドの1プロセス"]
        direction TB
        Shared["共有: アドレス空間<br/>(コード・ヒープ・グローバル変数)"]
        T1["スレッド1<br/>独自のスタック・レジスタ・PC"]
        T2["スレッド2<br/>独自のスタック・レジスタ・PC"]
        T3["スレッド3<br/>独自のスタック・レジスタ・PC"]
    end
    Shared --- T1
    Shared --- T2
    Shared --- T3

    classDef shared fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef thread fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Shared shared
    class T1,T2,T3 thread`,
    'diag-27': `flowchart TB
    Naive["割り込み無効化<br/>(uniprocessor限定、危険)"]
    TAS["Test-And-Set<br/>ハードウェア命令による<br/>スピンロック"]
    CAS["Compare-And-Swap<br/>より柔軟なアトミック命令"]
    Ticket["チケットロック<br/>(Ticket Lock)<br/>FIFO順を保証し<br/>飢餓を防止"]
    Park["park/unparkによる<br/>ブロッキングロック<br/>(スピンせずOSに制御を返す)"]
    Futex["Linuxのfutex<br/>ユーザー空間で完結する<br/>高速パス+競合時のみ<br/>カーネルへ問い合わせ"]

    TAS --> Ticket
    CAS -.->|"同様の目的で利用"| Ticket
    Ticket -->|"CPU浪費を避けるため"| Park
    Park --> Futex

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Naive,TAS,CAS,Ticket,Park,Futex box`,
    'diag-28': `flowchart LR
    Coarse["粗粒度ロック<br/>(coarse-grained)<br/>構造体全体を1つの<br/>ロックで保護<br/>実装は単純だが並行度が低い"]
    Fine["細粒度ロック<br/>(fine-grained)<br/>ハッシュテーブルの<br/>バケット単位など<br/>部分ごとにロック<br/>実装は複雑だが並行度が高い"]

    Coarse -->|"性能要件が<br/>厳しい場合"| Fine

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Coarse,Fine box`,
    'diag-29': `sequenceDiagram
    participant P as プロデューサー
    participant Buf as 共有バッファ
    participant C as コンシューマー

    C->>Buf: ロック獲得
    C->>Buf: バッファが空か確認
    C->>C: 空ならcond_wait()で待機<br/>(ロックを自動的に解放)
    P->>Buf: ロック獲得しデータを追加
    P->>C: cond_signal()で通知
    P->>Buf: ロック解放
    C->>C: cond_waitから復帰し<br/>ロックを再獲得
    C->>Buf: 条件を再チェック(while文推奨)
    C->>Buf: データを取り出しロック解放`,
    'diag-30': `flowchart LR
    subgraph Producer["プロデューサー側"]
        Full["sem_wait(empty)<br/>空きスロット待ち"]
        Fill["データ投入"]
        Post1["sem_post(full)"]
    end
    subgraph Consumer["コンシューマー側"]
        Wait["sem_wait(full)<br/>データ到着待ち"]
        Take["データ取得"]
        Post2["sem_post(empty)"]
    end

    Full --> Fill --> Post1
    Wait --> Take --> Post2

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Full,Fill,Post1,Wait,Take,Post2 box`,
    'diag-31': `flowchart TB
    Bugs["並行性バグ"]
    NonDead["非デッドロックバグ<br/>(Non-Deadlock Bugs)"]
    Dead["デッドロックバグ<br/>(Deadlock Bugs)"]

    Bugs --> NonDead
    Bugs --> Dead

    NonDead --> A1["違反アトミシティ<br/>(atomicity violation)"]
    NonDead --> A2["違反順序<br/>(order violation)"]

    classDef cat fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Bugs,NonDead,Dead cat
    class A1,A2 box`,
    'diag-32': `flowchart LR
    T1["スレッド1<br/>ロックA保持"] -->|"ロックB待ち"| T2["スレッド2<br/>ロックB保持"]
    T2 -->|"ロックA待ち"| T1

    classDef bug fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class T1,T2 bug`,
    'diag-33': `flowchart TB
    Loop["イベントループ"]
    Loop --> Poll["select()/poll()/epoll()で<br/>複数のディスクリプタを監視"]
    Poll --> Ready{"イベント発生?"}
    Ready -->|"Yes"| Handle["対応するハンドラを<br/>順番に実行(単一スレッド)"]
    Handle --> Loop
    Ready -->|"No(ブロック)"| Poll

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Loop,Poll,Handle box
    classDef decision fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    class Ready decision`,
    'diag-34': `flowchart TB
    subgraph CanonicalDevice["標準的なデバイスの構造"]
        Interface["インターフェース<br/>(status/command/dataレジスタ)"]
        Internals["内部実装<br/>(ファームウェア+専用ロジック)"]
    end
    Interface --- Internals

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Interface,Internals box`,
    'diag-35': `sequenceDiagram
    participant OS as OS(デバイスドライバ)
    participant Dev as I/Oデバイス

    OS->>Dev: statusレジスタをポーリングし<br/>ビジー状態か確認
    OS->>Dev: dataレジスタへデータを書き込み
    OS->>Dev: commandレジスタへコマンド発行
    Dev-->>OS: 処理完了後に割り込み(interrupt)通知
    OS->>OS: 割り込みハンドラで<br/>後続処理を実行`,
    'diag-36': `flowchart LR
    Req["I/O要求"]
    Seek["シーク時間<br/>(seek time)<br/>目的のトラックまで<br/>ヘッドを移動"]
    Rotate["回転待ち時間<br/>(rotational latency)<br/>目的のセクタが<br/>ヘッド下に来るまで待つ"]
    Transfer["転送時間<br/>(transfer time)<br/>実際のデータ読み書き"]

    Req --> Seek --> Rotate --> Transfer

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Req,Seek,Rotate,Transfer box`,
    'diag-37': `flowchart TB
    R0["RAID 0<br/>ストライピング<br/>性能・容量は最大化<br/>冗長性なし(1台故障で全損)"]
    R1["RAID 1<br/>ミラーリング<br/>信頼性は高いが<br/>容量効率は50%"]
    R4["RAID 4<br/>専用パリティディスク<br/>パリティディスクが<br/>ボトルネックになりやすい"]
    R5["RAID 5<br/>分散パリティ<br/>パリティを全ディスクに分散し<br/>書き込みボトルネックを解消"]

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class R0,R1,R4,R5 box`,
    'diag-38': `flowchart TB
    Inode["inode<br/>(ファイルのメタデータ:<br/>サイズ・所有者・権限・<br/>データブロックへのポインタ)"]
    Dir["ディレクトリ<br/>(ファイル名 → inode番号<br/>の対応表)"]
    Data["データブロック<br/>(実際のファイル内容)"]

    Dir -->|"name → inode#"| Inode
    Inode -->|"ポインタ"| Data

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Inode,Dir,Data box`,
    'diag-39': `flowchart LR
    SB["スーパーブロック<br/>(全体のメタデータ)"]
    IB["inodeビットマップ<br/>(空きinode管理)"]
    DB["データビットマップ<br/>(空きブロック管理)"]
    IT["inodeテーブル"]
    DBlocks["データブロック領域"]

    SB --- IB --- DB --- IT --- DBlocks

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class SB,IB,DB,IT,DBlocks box`,
    'diag-40': `flowchart TB
    Disk["ディスク全体"]
    CG1["シリンダグループ1<br/>(inode+データを近接配置)"]
    CG2["シリンダグループ2"]
    CG3["シリンダグループ3"]

    Disk --> CG1
    Disk --> CG2
    Disk --> CG3

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Disk,CG1,CG2,CG3 box`,
    'diag-41': `flowchart LR
    FSCK["fsck方式<br/>(事後チェック)<br/>ブート時に<br/>ファイルシステム全体を<br/>スキャンし矛盾を修復<br/>大容量ディスクでは低速"]
    Journal["ジャーナリング方式<br/>(先行記録/write-ahead logging)<br/>更新内容を先に<br/>ジャーナル領域へ記録し<br/>クラッシュ時はジャーナルのみ確認<br/>※図はデータも記録する<br/>フルデータジャーナリングの場合"]

    FSCK -->|"性能面での改善"| Journal

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class FSCK,Journal box`,
    'diag-42': `sequenceDiagram
    participant App as アプリケーション
    participant FS as ファイルシステム
    participant Journal as ジャーナル領域
    participant Data as 実データ領域

    App->>FS: ファイル更新要求
    FS->>Journal: TxBegin + 更新内容を書き込み
    FS->>Journal: TxEnd(コミットブロック)を書き込み
    Note over Journal: 必要なジャーナル書き込みが<br/>fsync/フラッシュ/バリアにより<br/>不揮発媒体へ永続化されて初めて<br/>電源断からの復旧が保証される
    FS->>Data: チェックポイント<br/>(実データ領域へ反映)
    FS->>Journal: ジャーナル領域を解放`,
    'diag-43': `flowchart TB
    Write["書き込み要求"]
    Buffer["メモリ上でバッファリング<br/>(複数の更新をまとめる)"]
    Seg["セグメント単位で<br/>シーケンシャルに<br/>ディスクへ追記"]
    GC["ガベージコレクション<br/>(古いセグメントの<br/>有効データを回収)"]

    Write --> Buffer --> Seg --> GC

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Write,Buffer,Seg,GC box`,
    'diag-44': `flowchart LR
    Read["読み込み<br/>(ページ単位、高速)"]
    Prog["書き込み(プログラム)<br/>(ページ単位<br/>1度書いたページは<br/>上書きできない)"]
    Erase["消去(erase)<br/>(ブロック単位、低速<br/>複数ページをまとめて消去)"]

    Prog -.->|"再書き込みには<br/>事前の消去が必要"| Erase

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Read,Prog,Erase box`,
    'diag-45': `flowchart LR
    Checksum["チェックサム<br/>(checksum)<br/>データの改変を検出<br/>(例: Fletcher checksum, CRC)"]
    Scrub["ディスクスクラビング<br/>(disk scrubbing)<br/>定期的に全データを読み<br/>チェックサムを検証"]
    Redundancy["冗長化<br/>(RAID等との併用)<br/>破損を検出したデータを<br/>他のコピーから復元"]

    Checksum --> Scrub --> Redundancy

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Checksum,Scrub,Redundancy box`,
    'diag-46': `flowchart TB
    Fail["ネットワーク通信の失敗パターン"]
    F1["パケットロス<br/>(packet loss)"]
    F2["遅延<br/>(latency/reordering)"]
    F3["部分的な故障<br/>(partial failure)<br/>一部のノードだけ<br/>停止/応答不能になる"]

    Fail --> F1
    Fail --> F2
    Fail --> F3

    classDef cat fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Fail cat
    class F1,F2,F3 box`,
    'diag-47': `flowchart LR
    Client["NFSクライアント"]
    Server["NFSサーバー"]
    Client -->|"ファイル操作要求<br/>(RPC経由)"| Server
    Server -->|"応答"| Client

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Client,Server box`,
    'diag-48': `flowchart TB
    Open["ファイルオープン"] --> Cache{"クライアントの<br/>ローカルディスクに<br/>キャッシュあり?"}
    Cache -->|"Yes(有効)"| Local["ローカルコピーを使用<br/>(サーバーへ問い合わせ不要)"]
    Cache -->|"No/無効"| Fetch["サーバーから<br/>ファイル全体を取得し<br/>ローカルにキャッシュ"]
    Fetch --> Local

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Open,Local,Fetch box
    classDef decision fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    class Cache decision`,
    'diag-49': `flowchart TB
    Sec["セキュリティパート(第52〜57章)"]
    S1["イントロダクション<br/>(脅威モデル)"]
    S2["認証<br/>(Authentication)"]
    S3["アクセス制御<br/>(Access Control)"]
    S4["暗号<br/>(Cryptography)"]
    S5["分散システムの<br/>セキュリティ"]

    Sec --> S1 --> S2 --> S3 --> S4 --> S5

    classDef cat fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Sec cat
    class S1,S2,S3,S4,S5 box`,
    'diag-50': `flowchart LR
    Know["知識による認証<br/>(something you know)<br/>パスワード"]
    Have["所有物による認証<br/>(something you have)<br/>スマートフォン、<br/>セキュリティキー"]
    Are["生体情報による認証<br/>(something you are)<br/>指紋、顔認証"]
    MFA["多要素認証<br/>(Multi-Factor<br/>Authentication, MFA)<br/>複数を組み合わせる"]

    Know --> MFA
    Have --> MFA
    Are --> MFA

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Know,Have,Are,MFA box`,
    'diag-51': `flowchart TB
    ACL["アクセス制御リスト<br/>(Access Control List, ACL)<br/>資源ごとに<br/>「誰が何をできるか」を保持"]
    Cap["ケーパビリティ<br/>(Capability)<br/>主体ごとに<br/>「何にアクセスできるか」の<br/>チケットを保持"]
    RBAC["ロールベースアクセス制御<br/>(RBAC)<br/>ユーザーにロールを割り当て<br/>ロールに権限を紐付ける"]

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class ACL,Cap,RBAC box`,
    'diag-52': `flowchart LR
    Sym["対称鍵暗号<br/>(symmetric)<br/>暗号化/復号に<br/>同一の鍵を使う<br/>例: AES"]
    Asym["公開鍵暗号<br/>(asymmetric)<br/>公開鍵/秘密鍵の<br/>ペアを使う<br/>例: RSA"]
    Hash["暗号学的ハッシュ関数<br/>(cryptographic hash)<br/>一方向性・衝突耐性を持つ<br/>例: SHA-256"]

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Sym,Asym,Hash box`,
    'diag-53': `flowchart TB
    subgraph Type1["Type 1(ベアメタル型)"]
        HV1["ハイパーバイザ<br/>(ハードウェア上で直接動作)"]
        G1["ゲストOS 1"]
        G2["ゲストOS 2"]
        HV1 --> G1
        HV1 --> G2
    end
    subgraph Type2["Type 2(ホスト型)"]
        HostOS["ホストOS"]
        HV2["ハイパーバイザ<br/>(ホストOS上のアプリとして動作)"]
        G3["ゲストOS"]
        HostOS --> HV2 --> G3
    end

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class HV1,G1,G2,HostOS,HV2,G3 box`,
    'diag-54': `flowchart TB
    Tutorial["Lab Tutorial<br/>(C言語・UNIX環境の<br/>基礎チュートリアル)"]
    SystemsLabs["Systems Labs<br/>(初期ユーティリティ、<br/>シェル実装など<br/>C/Linuxベースの課題)"]
    Xv6Labs["xv6 Labs<br/>(教育用UNIX風カーネル<br/>xv6を拡張する課題)"]

    Tutorial --> SystemsLabs
    Tutorial --> Xv6Labs

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Tutorial,SystemsLabs,Xv6Labs box`,
    'diag-55': `flowchart TB
    OSTEP["OSTEPの概念<br/>(普遍的な設計原理)"]
    Modern["2026年の実システム"]

    OSTEP -->|"第7〜10章<br/>CPUスケジューリング"| M1["EEVDF(Linux 6.6〜)と<br/>sched_ext(eBPF, Linux 6.12〜)<br/>カーネル本体を変更せず<br/>スケジューラを<br/>プラグイン可能に"]
    OSTEP -->|"第33章<br/>イベントベース並行性"| M2["io_uring<br/>(Jens Axboe)<br/>真の非同期I/Oを<br/>汎用化した新世代インターフェース"]
    OSTEP -->|"第44章<br/>フラッシュSSD"| M3["NVMeプロトコルの普及<br/>PCIe直結による<br/>低レイテンシ化"]
    OSTEP -->|"第28章<br/>ロック"| M4["futex2/futex_waitv<br/>複数futexの<br/>同時待機に対応"]
    OSTEP -->|"全体の設計思想"| M5["Rust for Linux<br/>メモリ安全な言語による<br/>ドライバ/サブシステム実装の模索"]

    classDef left fill:#1e3a5f,stroke:#7c9eff,color:#eaf2ff
    classDef right fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class OSTEP left
    class M1,M2,M3,M4,M5 right`,
    'diag-56': `flowchart TB
    Stage0["Stage 0: 前提知識<br/>C言語の基礎<br/>UNIX/Linuxコマンドライン<br/>コンピュータアーキテクチャの初歩"]
    Stage1["Stage 1: ベースコース(目安80時間)<br/>第0〜5部を通読<br/>各章末の宿題シミュレータ(Python)を実施<br/>ostep-projectsの初期Cプロジェクトに挑戦"]
    Stage2["Stage 2: 拡張コース(目安200時間以上)<br/>xv6-riscvのソースコードを読む<br/>MIT 6.1810のxv6ラボ課題を実装<br/>(システムコール追加、ページテーブル操作、<br/>COW fork、マルチスレッドカーネル、<br/>ネットワークドライバ、ファイルシステム拡張等)"]
    Stage3["Stage 3: 発展学習<br/>Linuxカーネルソースを読む<br/>(第7部と接続)<br/>データベース/分散システムの<br/>教科書へ進む(DDIA等)"]

    Stage0 --> Stage1 --> Stage2 --> Stage3

    classDef box fill:#132436,stroke:#4a6fa5,color:#dbe7fb
    class Stage0,Stage1,Stage2,Stage3 box`,
};
