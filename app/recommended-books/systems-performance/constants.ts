// app/recommended-books/systems-performance/constants.ts

export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "この本はどんな本か",
        "label": "この本はどんな本か"
    },
    {
        "id": "1-なぜシステムパフォーマンスを学ぶのか",
        "label": "1. なぜシステムパフォーマンスを学ぶのか"
    },
    {
        "id": "2-基礎概念レイテンシ可観測性実験",
        "label": "2. 基礎概念：レイテンシ・可観測性・実験"
    },
    {
        "id": "21-レイテンシlatency",
        "label": "2.1 レイテンシ（Latency）",
        "lvl3": true
    },
    {
        "id": "22-可観測性observability",
        "label": "2.2 可観測性（Observability）",
        "lvl3": true
    },
    {
        "id": "23-実験experimentation",
        "label": "2.3 実験（Experimentation）",
        "lvl3": true
    },
    {
        "id": "3-コアメソドロジuse法red法診断サイクル",
        "label": "3. コアメソドロジ：USE法・RED法・診断サイクル"
    },
    {
        "id": "31-アンチメソッドやってはいけない調査の仕方",
        "label": "3.1 アンチメソッド：やってはいけない調査の仕方",
        "lvl3": true
    },
    {
        "id": "32-useメソッドutilization-saturation-errors",
        "label": "3.2 USEメソッド（Utilization, Saturation, Errors）",
        "lvl3": true
    },
    {
        "id": "33-red法サービス視点の相棒",
        "label": "3.3 RED法：サービス視点の相棒",
        "lvl3": true
    },
    {
        "id": "34-科学的メソッドと診断サイクル",
        "label": "3.4 科学的メソッドと診断サイクル",
        "lvl3": true
    },
    {
        "id": "4-osの基礎知識カーネルとユーザーランド",
        "label": "4. OSの基礎知識：カーネルとユーザーランド"
    },
    {
        "id": "5-可観測性ツールのデータソース",
        "label": "5. 可観測性ツールのデータソース"
    },
    {
        "id": "6-cpuパフォーマンス分析",
        "label": "6. CPUパフォーマンス分析"
    },
    {
        "id": "61-基本用語",
        "label": "6.1 基本用語",
        "lvl3": true
    },
    {
        "id": "62-cpu分析の観測ツールチェーン",
        "label": "6.2 CPU分析の観測ツールチェーン",
        "lvl3": true
    },
    {
        "id": "63-フレームグラフcpu分析の代表的な可視化",
        "label": "6.3 フレームグラフ：CPU分析の代表的な可視化",
        "lvl3": true
    },
    {
        "id": "64-cpuチューニングの主な選択肢",
        "label": "6.4 CPUチューニングの主な選択肢",
        "lvl3": true
    },
    {
        "id": "7-メモリパフォーマンス分析",
        "label": "7. メモリパフォーマンス分析"
    },
    {
        "id": "71-仮想メモリとページング",
        "label": "7.1 仮想メモリとページング",
        "lvl3": true
    },
    {
        "id": "72-メモリのuseメソッド",
        "label": "7.2 メモリのUSEメソッド",
        "lvl3": true
    },
    {
        "id": "73-メモリリーク検出の考え方",
        "label": "7.3 メモリリーク検出の考え方",
        "lvl3": true
    },
    {
        "id": "8-ファイルシステムとディスクio",
        "label": "8. ファイルシステムとディスクI/O"
    },
    {
        "id": "81-レイヤー構造の理解",
        "label": "8.1 レイヤー構造の理解",
        "lvl3": true
    },
    {
        "id": "82-ディスクioへのuseメソッド適用",
        "label": "8.2 ディスクI/OへのUSEメソッド適用",
        "lvl3": true
    },
    {
        "id": "83-レイテンシの可視化ヒートマップ",
        "label": "8.3 レイテンシの可視化：ヒートマップ",
        "lvl3": true
    },
    {
        "id": "9-ネットワークパフォーマンス分析",
        "label": "9. ネットワークパフォーマンス分析"
    },
    {
        "id": "91-tcp接続のライフサイクルとレイテンシ",
        "label": "9.1 TCP接続のライフサイクルとレイテンシ",
        "lvl3": true
    },
    {
        "id": "92-主要な観測コマンド",
        "label": "9.2 主要な観測コマンド",
        "lvl3": true
    },
    {
        "id": "10-クラウドコンピューティング特有の考慮点",
        "label": "10. クラウドコンピューティング特有の考慮点"
    },
    {
        "id": "101-仮想化方式の3分類",
        "label": "10.1 仮想化方式の3分類",
        "lvl3": true
    },
    {
        "id": "102-マルチテナンシーとノイジーネイバー問題",
        "label": "10.2 マルチテナンシーと「ノイジーネイバー」問題",
        "lvl3": true
    },
    {
        "id": "103-クラウド環境での可観測性の制約",
        "label": "10.3 クラウド環境での可観測性の制約",
        "lvl3": true
    },
    {
        "id": "11-ベンチマーキングのベストプラクティスと落とし穴",
        "label": "11. ベンチマーキングのベストプラクティスと落とし穴"
    },
    {
        "id": "12-ツールチェーンの選び方perfftraceebpf",
        "label": "12. ツールチェーンの選び方：perf・Ftrace・eBPF"
    },
    {
        "id": "実践bpftraceの1行プログラム例",
        "label": "実践：bpftraceの1行プログラム例",
        "lvl3": true
    },
    {
        "id": "13-実践60秒linuxパフォーマンス分析チェックリスト",
        "label": "13. 実践：60秒Linuxパフォーマンス分析チェックリスト"
    },
    {
        "id": "14-ケーススタディの読み方",
        "label": "14. ケーススタディの読み方"
    },
    {
        "id": "15-学習ロードマップ初学者向け",
        "label": "15. 学習ロードマップ（初学者向け）"
    },
    {
        "id": "まとめ",
        "label": "まとめ"
    },
    {
        "id": "参考文献",
        "label": "参考文献"
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
    | 'diag-18';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    'diag-1': 'システムパフォーマンス分析の全体ループ（ビジネス目標からアクションとフィードバック）',
    'diag-2': '可観測性ツールの4分類（固定カウンタ、プロファイリング、トレーシング、モニタリング）',
    'diag-3': 'USEメソッドの実行フロー（エラー、使用率、飽和度の判定ループ）',
    'diag-4': 'サービス視点のRED法とインフラ層のUSE法の連携',
    'diag-5': '科学的メソッドに基づく診断サイクル（仮説検証ループ）',
    'diag-6': 'システムコール発行からハードウェア処理・割り込みまでのシーケンス',
    'diag-7': 'Linuxカーネルの観測データソースと対応ツール',
    'diag-8': 'CPU分析の観測ツールチェーン（固定カウンタからプロファイリング、動的トレーシング）',
    'diag-9': 'フレームグラフの構造と読み方（幅、高さ、色）',
    'diag-10': 'プロセスの仮想アドレス空間と物理メモリ・スワップの対応',
    'diag-11': 'ファイルシステムとディスクI/Oのレイヤー構造（VFS、ページキャッシュ、ブロック層、ドライバ）',
    'diag-12': 'TCP接続のライフサイクルとレイテンシ（3-way handshake、データ転送、再送、切断）',
    'diag-13': 'クラウドにおける仮想化方式の3分類（ハードウェア仮想化、OS仮想化、軽量仮想化）',
    'diag-14': 'マルチテナンシーにおけるノイジーネイバー問題の発生と検知・対処',
    'diag-15': '効果的なベンチマーキングのためのチェックリスト',
    'diag-16': 'eBPFエコシステムの内部構成（ユーザー空間、Verifier、JIT、Hook、BPF Maps）',
    'diag-17': '60秒Linuxパフォーマンス分析チェックリストの10ステップ',
    'diag-18': 'ケーススタディ分析のフレームワーク（問題記述、戦略選択、データ収集、分析、結論）',
};

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart LR
    A["ビジネス目標<br/>速い・安い・止まらない"] --> B["パフォーマンス指標<br/>レイテンシ / スループット<br/>使用率 / キャパシティ"]
    B --> C["分析メソドロジ<br/>USE法 / RED法など"]
    C --> D["可観測性ツール<br/>perf / eBPF / sar など"]
    D --> E["具体的なアクション<br/>チューニング / スケーリング<br/>コード修正"]
    E -.フィードバック.-> B`,

    'diag-2': `flowchart TB
    OBS["可観測性ツールの4分類"]
    OBS --> FC["固定カウンタ<br/>Fixed Counters"]
    OBS --> PR["プロファイリング<br/>Profiling"]
    OBS --> TR["トレーシング<br/>Tracing"]
    OBS --> MN["モニタリング<br/>Monitoring"]

    FC --> FC1["例: uptime, vmstat<br/>軽量。vmstatは指定間隔で<br/>カウンタをサンプリング"]
    PR --> PR1["例: perf record<br/>一定間隔でサンプリング"]
    TR --> TR1["例: bpftrace, strace<br/>イベント単位で記録"]
    MN --> MN1["例: sar, Prometheus<br/>時系列で長期保存"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class OBS,FC,PR,TR,MN,FC1,PR1,TR1,MN1 highlightFill`,

    'diag-3': `flowchart TD
    START(["対象システムの<br/>機能構成図を描く"]) --> R["リソースを1つ選ぶ<br/>(CPU / メモリ / ディスク / NIC...)"]
    R --> E{"エラーは<br/>発生しているか?"}
    E -- "Yes" --> ISSUE["ボトルネック候補として記録"]
    E -- "No" --> U{"使用率は<br/>高いか?"}
    U -- "Yes" --> ISSUE
    U -- "No" --> S{"飽和度は<br/>高いか(キュー滞留)?"}
    S -- "Yes" --> ISSUE
    S -- "No" --> NEXT["問題なし:次のリソースへ"]
    ISSUE --> NEXT
    NEXT --> MORE{"未確認の<br/>リソースが残っているか?"}
    MORE -- "Yes" --> R
    MORE -- "No" --> DONE(["候補リストを基に<br/>さらに深掘り分析"])

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class ISSUE dangerFill`,

    'diag-4': `flowchart LR
    subgraph SVC["サービス層の健全性: RED法"]
        direction LR
        Rt["Rate<br/>秒間リクエスト数"] --> Er["Errors<br/>失敗リクエスト数"] --> Du["Duration<br/>処理時間分布"]
    end
    SVC --> Q{"異常を検知したら"}
    Q --> RES["インフラ層の深掘り: USE法"]
    RES --> CPU2["CPU: 使用率/飽和度/エラー"]
    RES --> MEM2["メモリ: 使用率/飽和度/エラー"]
    RES --> DISK2["ディスク: 使用率/飽和度/エラー"]
    RES --> NET2["ネットワーク: 使用率/飽和度/エラー"]`,

    'diag-5': `flowchart LR
    A(["問題の記述<br/>Problem Statement"]) --> B["仮説を立てる"]
    B --> C["データを収集<br/>(ツールで計測)"]
    C --> D["データを分析"]
    D --> E{"仮説は<br/>支持されたか?"}
    E -- "No: 仮説を棄却" --> B
    E -- "Yes" --> F["仮説を検証<br/>(再現テスト等)"]
    F --> G(["結論・対処"])`,

    'diag-6': `sequenceDiagram
    participant App as アプリケーション<br/>(ユーザーモード)
    participant Kernel as カーネル<br/>(カーネルモード)
    participant HW as ハードウェア

    App->>Kernel: システムコール発行 (例: read())
    Note over App,Kernel: ユーザーモード/カーネルモードの<br/>モード切り替えコストが発生
    Kernel->>Kernel: スケジューラ / ファイルシステム / VFS処理
    Kernel->>HW: デバイスドライバ経由でI/O発行
    HW-->>Kernel: 割り込み (Interrupt) で完了通知
    Kernel-->>App: システムコールの戻り値`,

    'diag-7': `flowchart TB
    K["Linuxカーネル"] --> P1["/proc<br/>プロセス/システム統計"]
    K --> P2["/sys<br/>デバイス/カーネル設定"]
    K --> TP["トレースポイント<br/>(Tracepoints)<br/>比較的安定した静的計測点"]
    K --> KP["kprobe<br/>カーネル関数への動的プローブ"]
    K --> UP["uprobe<br/>ユーザー空間関数への動的プローブ"]
    APP["アプリケーション/ランタイム<br/>(ユーザー空間)"] --> USDT["USDT<br/>アプリ埋め込み静的トレースポイント"]
    K -.uprobe等の仕組みで接続.-> USDT
    K --> PMC["PMC<br/>ハードウェアパフォーマンスカウンタ"]

    P1 --> T1["vmstat, ps, top等が利用"]
    P2 --> T2["ethtool, cgroup設定等が利用"]
    TP --> T3["perf, bpftrace が利用<br/>(カーネルバージョン間で比較的安定)"]
    KP --> T4["bpftrace, BCC が利用<br/>(カーネル内部関数、非互換リスクあり)"]
    UP --> T5["bpftrace, BCC が利用<br/>(libc関数等)"]
    USDT --> T6["言語ランタイム提供<br/>(例: Node.js, PostgreSQL)"]
    PMC --> T7["perf stat が利用<br/>(IPC, キャッシュミス等)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class K,APP,P1,P2,TP,KP,UP,USDT,PMC highlightFill`,

    'diag-8': `flowchart TB
    S["Step1: 固定カウンタで概況把握"] --> S1["uptime (ロードアベレージ)"]
    S1 --> S2["vmstat 1 (r列, us/sy/id)"]
    S2 --> S3["mpstat -P ALL 1 (CPUごとの偏り)"]
    S3 --> S4["pidstat 1 (プロセスごとのCPU使用率)"]
    S4 --> T["Step2: プロファイリングで内訳を特定"]
    T --> T1["perf record -F 99 -a -g -- sleep 30"]
    T1 --> T2["perf script → フレームグラフ生成"]
    T2 --> U["Step3: 必要なら動的トレーシングで深掘り"]
    U --> U1["bpftrace でカスタムイベント計測"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class S,S1,S2,S3,S4,T,T1,T2,U,U1 highlightFill`,

    'diag-9': `flowchart TB
    F["フレームグラフの読み方"]
    F --> W["横幅 = そのスタックが<br/>サンプルされた頻度<br/>(アルファベット順にソート、時系列ではない)"]
    F --> H["高さ = スタックの深さ<br/>(下が呼び出し元、上が呼び出し先)"]
    F --> C["色 = ランダム、または<br/>言語/モジュール等で色分け"]
    W --> R["幅の広い山を優先的に調査する"]`,

    'diag-10': `flowchart LR
    subgraph VAS["プロセスの仮想アドレス空間"]
        direction TB
        Text["Text (コード)"]
        Heap["Heap"]
        Stack["Stack"]
        Shared["共有ライブラリ"]
    end
    VAS --> PT["ページテーブル<br/>(仮想→物理の対応管理)"]
    PT --> RAM["物理メモリ (RAM)"]
    PT -.ページアウト時.-> SWAP["スワップ領域<br/>(ディスク上)"]`,

    'diag-11': `flowchart TB
    App["アプリケーション<br/>read()/write()"] --> VFS["VFS<br/>(仮想ファイルシステム層)"]
    VFS --> FSCache["ファイルシステムキャッシュ<br/>(ページキャッシュ)"]
    FSCache -->|"キャッシュヒット"| App
    FSCache -->|"キャッシュミス"| FS["ファイルシステム<br/>(ext4/xfs/zfs等)"]
    FS --> BLK["ブロック層<br/>(I/Oスケジューラ)"]
    BLK --> DRV["デバイスドライバ"]
    DRV --> DISK["物理ディスク<br/>(SSD/HDD)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class App,VFS,FSCache,FS,BLK,DRV,DISK highlightFill`,

    'diag-12': `sequenceDiagram
    participant C as クライアント
    participant S as サーバー

    C->>S: SYN
    S-->>C: SYN-ACK
    C->>S: ACK
    Note over C,S: TCPコネクション確立<br/>(この往復がレイテンシに直結)
    C->>S: データ送信
    S-->>C: ACK
    Note over C,S: パケットロス発生時は重複ACKを3回受信した<br/>時点でFast Retransmitにより早期再送。<br/>重複ACKが得られない場合はRTO満了後に再送
    C->>S: FIN (切断開始)
    S-->>C: ACK / FIN
    C->>S: ACK`,

    'diag-13': `flowchart TB
    V["クラウドの仮想化方式"]
    V --> HV["ハードウェア仮想化<br/>(Hardware Virtualization)"]
    V --> OV["OS仮想化<br/>(OS Virtualization)"]
    V --> LV["軽量仮想化<br/>(Lightweight Virtualization)"]

    HV --> HV1["各VMが独自カーネルを持つ<br/>例: Xen, KVM"]
    OV --> OV1["ホストカーネルを共有<br/>例: Dockerコンテナ, LXC"]
    LV --> LV1["最小限のVMで<br/>コンテナ的な俊敏性を実現<br/>例: AWS Firecracker microVM"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class V,HV,OV,LV,HV1,OV1,LV1 highlightFill`,

    'diag-14': `flowchart LR
    H["物理ホスト"] --> T1["テナントA<br/>(コンテナ)"]
    H --> T2["テナントB<br/>(コンテナ)<br/>過剰なCPU/メモリ使用"]
    H --> T3["テナントC<br/>(コンテナ)"]
    T2 -.リソース枯渇.-> T1
    T2 -.リソース枯渇.-> T3
    T1 --> SYM["症状: レイテンシ増加<br/>スループット低下"]
    T3 --> SYM
    SYM --> DETECT["eBPFでランキュー<br/>レイテンシを継続計測"]
    DETECT --> ACT["リソースコントロール<br/>(cgroup制限/再配置)で対処"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class T2 dangerFill`,

    'diag-15': `flowchart TB
    B["効果的なベンチマーキングのための<br/>チェックリスト"]
    B --> B1["何を測定したいか<br/>目的を明確にする"]
    B1 --> B2["本番に近いワークロード<br/>特性を再現する"]
    B2 --> B3["ウォームアップ期間を<br/>結果から除外する"]
    B3 --> B4["ランプ負荷で<br/>段階的に負荷を上げる"]
    B4 --> B5["ベンチマーク中の<br/>リソース使用状況も観測する<br/>(USEメソッド併用)"]
    B5 --> B6["統計的分析<br/>(平均だけでなくばらつきも見る)"]
    B6 --> B7["結果に対する<br/>サニティチェックを行う"]`,

    'diag-16': `flowchart TB
    subgraph EBPF["eBPFエコシステムの構成"]
        direction TB
        USER["ユーザー空間<br/>bpftrace / BCCで記述したプログラム"]
        USER --> VERIFY["カーネルの検証器 (Verifier)<br/>安全性を静的に検査"]
        VERIFY --> JIT["JITコンパイル<br/>ネイティブコードへ変換"]
        JIT --> HOOK["カーネルのフックポイントで実行<br/>(kprobe/uprobe/tracepoint等)"]
        HOOK --> MAP["BPF Maps<br/>集計データをユーザー空間へ受け渡し"]
        MAP --> OUT["結果を出力<br/>(ヒストグラム/カウント/スタック等)"]
    end`,

    'diag-17': `flowchart TB
    Q1["1. uptime<br/>ロードアベレージを確認"] --> Q2["2. dmesg | tail<br/>直近のカーネルエラー/OOMを確認"]
    Q2 --> Q3["3. vmstat 1<br/>r列(CPU飽和)、si/so(スワップ)"]
    Q3 --> Q4["4. mpstat -P ALL 1<br/>CPUコア間の偏りを確認"]
    Q4 --> Q5["5. pidstat -u -r -d 1<br/>プロセス単位のCPU/メモリ/IO"]
    Q5 --> Q6["6. iostat -xz 1<br/>ディスクの%util/await"]
    Q6 --> Q7["7. free -m<br/>実メモリ使用量とキャッシュ"]
    Q7 --> Q8["8. sar -n DEV 1<br/>ネットワークスループット"]
    Q8 --> Q9["9. sar -n TCP,ETCP 1<br/>TCP接続確立/再送状況"]
    Q9 --> Q10["10. top<br/>プロセス全体を俯瞰し当たりを絞る"]
    Q10 --> DONE(["候補が絞れたら<br/>USEメソッドで深掘り"])`,

    'diag-18': `flowchart LR
    P["問題の記述"] --> S["分析戦略の選択<br/>(なぜそのメソドロジを選んだか)"]
    S --> D["データ収集<br/>(統計量→構成→PMC→トレーシングの順)"]
    D --> A["分析<br/>(仮説の棄却・支持)"]
    A --> C["結論<br/>(何が真因で、何が誤った仮説だったか)"]`,
};
