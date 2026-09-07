/**
 * UNIX and Linux System Administration Handbook 実践ガイド 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    lvl3: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
    {
        "id": "_1",
        "label": "この文書の使い方",
        "lvl3": false
    },
    {
        "id": "431",
        "label": "全体構成（原著4パート・31章）",
        "lvl3": false
    },
    {
        "id": "1-basic-administration",
        "label": "第1部: 基本管理 (Basic Administration)",
        "lvl3": false
    },
    {
        "id": "1-where-to-start",
        "label": "第1章: どこから始めるか (Where to Start)",
        "lvl3": true
    },
    {
        "id": "2-booting-and-system-management-daemons",
        "label": "第2章: ブートとシステム管理デーモン (Booting and System Management Daemons)",
        "lvl3": true
    },
    {
        "id": "3-root-access-control-and-rootly-powers",
        "label": "第3章: アクセス制御とrootの権限 (Access Control and Rootly Powers)",
        "lvl3": true
    },
    {
        "id": "4-process-control",
        "label": "第4章: プロセス制御 (Process Control)",
        "lvl3": true
    },
    {
        "id": "5-the-filesystem",
        "label": "第5章: ファイルシステム (The Filesystem)",
        "lvl3": true
    },
    {
        "id": "6-software-installation-and-management",
        "label": "第6章: ソフトウェアのインストールと管理 (Software Installation and Management)",
        "lvl3": true
    },
    {
        "id": "7-scripting-and-the-shell",
        "label": "第7章: スクリプティングとシェル (Scripting and the Shell)",
        "lvl3": true
    },
    {
        "id": "8-user-management",
        "label": "第8章: ユーザー管理 (User Management)",
        "lvl3": true
    },
    {
        "id": "9-cloud-computing",
        "label": "第9章: クラウドコンピューティング (Cloud Computing)",
        "lvl3": true
    },
    {
        "id": "10-logging",
        "label": "第10章: ロギング (Logging)",
        "lvl3": true
    },
    {
        "id": "11-drivers-and-the-kernel",
        "label": "第11章: ドライバとカーネル (Drivers and the Kernel)",
        "lvl3": true
    },
    {
        "id": "12-printing",
        "label": "第12章: 印刷 (Printing)",
        "lvl3": true
    },
    {
        "id": "2-networking",
        "label": "第2部: ネットワーキング (Networking)",
        "lvl3": false
    },
    {
        "id": "13-tcpip-tcpip-networking",
        "label": "第13章: TCP/IPネットワーキング (TCP/IP Networking)",
        "lvl3": true
    },
    {
        "id": "14-physical-networking",
        "label": "第14章: 物理ネットワーキング (Physical Networking)",
        "lvl3": true
    },
    {
        "id": "15-ip-ip-routing",
        "label": "第15章: IPルーティング (IP Routing)",
        "lvl3": true
    },
    {
        "id": "16-dns-dns-the-domain-name-system",
        "label": "第16章: DNS - ドメインネームシステム (DNS: The Domain Name System)",
        "lvl3": true
    },
    {
        "id": "17-single-sign-on",
        "label": "第17章: シングルサインオン (Single Sign-On)",
        "lvl3": true
    },
    {
        "id": "18-electronic-mail",
        "label": "第18章: 電子メール (Electronic Mail)",
        "lvl3": true
    },
    {
        "id": "19-web-web-hosting",
        "label": "第19章: Webホスティング (Web Hosting)",
        "lvl3": true
    },
    {
        "id": "3-storage",
        "label": "第3部: ストレージ (Storage)",
        "lvl3": false
    },
    {
        "id": "20-storage",
        "label": "第20章: ストレージ (Storage)",
        "lvl3": true
    },
    {
        "id": "21-the-network-file-system-nfs",
        "label": "第21章: ネットワークファイルシステム (The Network File System, NFS)",
        "lvl3": true
    },
    {
        "id": "22-smb-server-message-block",
        "label": "第22章: SMB (Server Message Block)",
        "lvl3": true
    },
    {
        "id": "4-operations",
        "label": "第4部: 運用 (Operations)",
        "lvl3": false
    },
    {
        "id": "23-configuration-management",
        "label": "第23章: 構成管理 (Configuration Management)",
        "lvl3": true
    },
    {
        "id": "24-virtualization",
        "label": "第24章: 仮想化 (Virtualization)",
        "lvl3": true
    },
    {
        "id": "25-containers",
        "label": "第25章: コンテナ (Containers)",
        "lvl3": true
    },
    {
        "id": "26-continuous-integration-and-delivery-cicd",
        "label": "第26章: 継続的インテグレーションとデリバリー (Continuous Integration and Delivery, CI/CD)",
        "lvl3": true
    },
    {
        "id": "27-security",
        "label": "第27章: セキュリティ (Security)",
        "lvl3": true
    },
    {
        "id": "28-monitoring",
        "label": "第28章: モニタリング (Monitoring)",
        "lvl3": true
    },
    {
        "id": "29-performance-analysis",
        "label": "第29章: パフォーマンス分析 (Performance Analysis)",
        "lvl3": true
    },
    {
        "id": "30-data-center-basics",
        "label": "第30章: データセンターの基礎 (Data Center Basics)",
        "lvl3": true
    },
    {
        "id": "31-methodology-policy-and-politics",
        "label": "第31章: 方法論・ポリシー・組織政治 (Methodology, Policy, and Politics)",
        "lvl3": true
    },
    {
        "id": "_4",
        "label": "学習ロードマップ（初学者向け推奨進行順）",
        "lvl3": false
    },
    {
        "id": "_5",
        "label": "参考文献・出典一覧",
        "lvl3": false
    },
    {
        "id": "_6",
        "label": "原著書誌情報",
        "lvl3": true
    },
    {
        "id": "2booting-systemd",
        "label": "第2章（Booting / systemd）関連",
        "lvl3": true
    },
    {
        "id": "3access-control-sudo",
        "label": "第3章（Access Control / sudo）関連",
        "lvl3": true
    },
    {
        "id": "16dnsdnssec",
        "label": "第16章（DNS/DNSSEC）関連",
        "lvl3": true
    },
    {
        "id": "20storage-lvm-raid",
        "label": "第20章（Storage / LVM / RAID）関連",
        "lvl3": true
    },
    {
        "id": "23configuration-management-ansible",
        "label": "第23章（Configuration Management / Ansible）関連",
        "lvl3": true
    },
    {
        "id": "25containers-docker-kubernetes",
        "label": "第25章（Containers / Docker / Kubernetes）関連",
        "lvl3": true
    },
    {
        "id": "27security-ssh",
        "label": "第27章（Security / SSHハードニング）関連",
        "lvl3": true
    },
    {
        "id": "28monitoring-sre-golden-signals",
        "label": "第28章（Monitoring / SRE Golden Signals）関連",
        "lvl3": true
    },
    {
        "id": "29performance-analysis-use",
        "label": "第29章（Performance Analysis / USE法）関連",
        "lvl3": true
    }
] as const;

export type DiagramId = 'diag-1' | 'diag-2' | 'diag-3' | 'diag-4' | 'diag-5' | 'diag-6' | 'diag-7' | 'diag-8' | 'diag-9' | 'diag-10' | 'diag-11' | 'diag-12' | 'diag-13' | 'diag-14' | 'diag-15' | 'diag-16' | 'diag-17' | 'diag-18' | 'diag-19' | 'diag-20' | 'diag-21' | 'diag-22' | 'diag-23' | 'diag-24' | 'diag-25' | 'diag-26' | 'diag-27' | 'diag-28' | 'diag-29';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    "diag-1": "起動プロセスの全体像",
    "diag-2": "systemdユニットの依存関係イメージ（例: Webサーバー）",
    "diag-3": "パーミッションビット -rwxr-xr-- の内訳",
    "diag-4": "sudoによる権限昇格の流れ",
    "diag-5": "プロセスの状態遷移",
    "diag-6": "FHSに基づく主要ディレクトリ構成",
    "diag-7": "パッケージ管理の流れ（メタデータ同期からインストールまで）",
    "diag-8": "パイプラインによるアクセスログ集計の流れ",
    "diag-9": "ユーザーとグループの対応関係",
    "diag-10": "クラウドインスタンス構築の手順（VPCから監視有効化まで）",
    "diag-11": "journaldとrsyslogによるログ収集・転送の流れ",
    "diag-12": "カーネルモジュールのロード判定フロー",
    "diag-13": "TCP/IPの階層モデル",
    "diag-14": "ルーティング判断のフロー",
    "diag-15": "DNS再帰問い合わせによる名前解決の流れ",
    "diag-16": "SAML／OIDCによるシングルサインオンの流れ",
    "diag-17": "メール配送の経路（MUAからMTA・SPF/DKIM/DMARC検証まで）",
    "diag-18": "Webサービスの多層構成（LB・リバースプロキシ・キャッシュ・DB）",
    "diag-19": "LVMの3層構造",
    "diag-20": "NFSによるファイル共有の流れ",
    "diag-21": "Ansibleの構成と冪等な差分適用",
    "diag-22": "Type-1とType-2ハイパーバイザーの比較",
    "diag-23": "仮想マシン方式とコンテナ方式の比較",
    "diag-24": "CI/CDパイプラインの流れ",
    "diag-25": "多層防御（Defense in Depth）の階層",
    "diag-26": "Prometheusによるメトリクス収集・可視化・アラート",
    "diag-27": "USE法による性能分析の手順",
    "diag-28": "インシデント対応とポストモーテムの流れ",
    "diag-29": "学習ステップのロードマップ"
};

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    A["電源投入"] --> B["システムファームウェア<br/>BIOS または UEFI"]
    B --> C["ブートローダー<br/>GRUB2 が起動"]
    C --> D["Linuxカーネルをメモリへロード"]
    D --> E["initramfs(初期RAMディスク)展開"]
    E --> F["カーネルがinitプロセス(PID 1)を起動<br/>= systemd"]
    F --> G["systemdが既定ターゲットを解決<br/>default.target"]
    G --> H["依存関係グラフに従い<br/>並列にUnitを起動"]
    H --> I["multi-user.target<br/>(CLI環境)"]
    H --> J["graphical.target<br/>(GUI環境)"]
    I --> K["ログインプロンプト表示"]
    J --> K

    classDef stageFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class A,B,C,D,E,F,G,H,I,J,K stageFill`,
    'diag-2': `flowchart LR
    subgraph Targets["ターゲット"]
        NET["network-online.target"]
        MULTI["multi-user.target"]
    end
    subgraph Services["サービスUnit"]
        NGINX["nginx.service"]
        PG["postgresql.service"]
        APP["myapp.service"]
    end

    NET --> NGINX
    NET --> PG
    PG --> APP
    NGINX --> APP
    APP --> MULTI

    classDef targetFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    classDef svcFill fill:#123024,stroke:#3ecf8e,color:#eafff5
    class NET,MULTI targetFill
    class NGINX,PG,APP svcFill`,
    'diag-3': `flowchart TB
    subgraph Perm["パーミッションビット: -rwxr-xr-- の内訳"]
        direction LR
        T["ファイル種別<br/>-"] --> O["所有者(owner)<br/>rwx"]
        O --> G["グループ(group)<br/>r-x"]
        G --> A["その他(other)<br/>r--"]
    end
    classDef pFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class T,O,G,A pFill`,
    'diag-4': `sequenceDiagram
    participant U as 一般ユーザー
    participant S as sudoコマンド
    participant P as PAM/sudoers設定
    participant R as root権限で実行

    U->>S: sudo systemctl restart nginx
    S->>P: /etc/sudoers(visudoで編集)を照合
    P-->>S: ユーザーが許可された<br/>コマンドか判定
    alt 許可された操作
        opt 認証情報キャッシュが失効、またはsudoersが認証を要求する場合
            S->>U: パスワード入力を要求
            U->>S: パスワード入力
        end
        S->>R: 昇格した権限でコマンド実行
        R-->>U: 実行結果＋監査ログ記録
    else 許可されない操作
        S-->>U: Permission denied
    end`,
    'diag-5': `stateDiagram-v2
    [*] --> Ready: fork()/exec()
    Ready --> Running: スケジューラが選択
    Running --> Ready: タイムスライス終了
    Running --> Sleeping: I/O待ち・シグナル待ち
    Sleeping --> Ready: イベント到着
    Running --> Zombie: exit()呼び出し
    Zombie --> [*]: 親プロセスがwait()で回収
    Running --> Stopped: SIGSTOP受信
    Stopped --> Running: SIGCONT受信`,
    'diag-6': `flowchart TB
    ROOT["/ (ルート)"]
    ROOT --> BIN["/usr/bin<br/>実行ファイル"]
    ROOT --> ETC["/etc<br/>システム設定ファイル"]
    ROOT --> VAR["/var<br/>可変データ(ログ・キャッシュ)"]
    ROOT --> HOME["/home<br/>ユーザーのホームディレクトリ"]
    ROOT --> OPT["/opt<br/>サードパーティ製アプリ"]
    ROOT --> PROC["/proc<br/>カーネル・プロセス情報(仮想FS)"]
    ROOT --> SYS["/sys<br/>デバイス・カーネルパラメータ(仮想FS)"]
    ROOT --> BOOT["/boot<br/>カーネル・ブートローダー"]
    VAR --> LOG["/var/log<br/>ログファイル"]
    VAR --> SPOOL["/var/spool<br/>印刷・メールキュー"]

    classDef dirFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class ROOT,BIN,ETC,VAR,HOME,OPT,PROC,SYS,BOOT,LOG,SPOOL dirFill`,
    'diag-7': `flowchart LR
    REPO["リモートリポジトリ<br/>(署名付きパッケージ群)"] -->|"apt update / dnf makecache<br/>メタデータ同期"| CACHE["ローカルメタデータキャッシュ"]
    CACHE -->|"apt install / dnf install<br/>依存関係を解決"| RESOLVE["依存関係グラフの構築"]
    RESOLVE --> DOWNLOAD["パッケージ本体のダウンロード<br/>＋GPG署名検証"]
    DOWNLOAD --> INSTALL["ローカルDB(dpkg/rpm)へ登録し展開"]
    INSTALL --> DONE["インストール完了"]

    classDef flowFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class REPO,CACHE,RESOLVE,DOWNLOAD,INSTALL,DONE flowFill`,
    'diag-8': `flowchart LR
    IN["入力: access.log"] -->|"grep 'ERROR'"| F1["エラー行の抽出"]
    F1 -->|"awk '{print \$1}'"| F2["IPアドレス列の抽出"]
    F2 -->|"sort"| F3["ソート"]
    F3 -->|"uniq -c"| F4["出現回数の集計"]
    F4 -->|"sort -rn"| F5["降順に並べ替え"]
    F5 -->|"head -10"| OUT["上位10件のIPを出力"]

    classDef pipeFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class IN,F1,F2,F3,F4,F5,OUT pipeFill`,
    'diag-9': `flowchart TB
    subgraph Users["ユーザー"]
        U1["alice (UID 1001)"]
        U2["bob (UID 1002)"]
    end
    subgraph Groups["グループ"]
        G1["developers (GID 2001)<br/>プライマリグループ: bob"]
        G2["sudo / wheel<br/>管理者権限グループ"]
        G3["docker<br/>Dockerデーモン操作権限"]
    end
    U1 -->|"プライマリグループ"| G2
    U1 -.->|"補助グループ"| G3
    U2 -->|"プライマリグループ"| G1
    U2 -.->|"補助グループ"| G3

    classDef userFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    classDef groupFill fill:#123024,stroke:#3ecf8e,color:#eafff5
    class U1,U2 userFill
    class G1,G2,G3 groupFill`,
    'diag-10': `flowchart TB
    A["VPCを作成<br/>(仮想ネットワークの器)"] --> B["サブネットを分割<br/>(パブリック / プライベート)"]
    B --> C["セキュリティグループ定義<br/>(インバウンド/アウトバウンドルール)"]
    C --> D["インスタンス起動<br/>(AMI/イメージ選択)"]
    D --> E["IAMロールを付与<br/>(最小権限)"]
    E --> F["起動スクリプト実行<br/>(cloud-init)"]
    F --> G["監視・ログ収集を有効化"]

    classDef cloudFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class A,B,C,D,E,F,G cloudFill`,
    'diag-11': `flowchart TB
    APP["アプリケーション<br/>／カーネル"] -->|"構造化ログ出力"| JOURNALD["systemd-journald<br/>(バイナリ形式で保存)"]
    JOURNALD -->|"転送 (forward)"| RSYSLOG["rsyslog / syslog-ng<br/>(テキスト形式・ルーティング)"]
    RSYSLOG -->|"ローカル保存"| LOCALLOG["/var/log/*.log"]
    RSYSLOG -->|"リモート転送 (TCP/TLS)"| CENTRAL["中央ログサーバー<br/>(ELK / Loki / Splunk等)"]
    JOURNALD -->|"直接クエリ"| JOURNALCTL["journalctl コマンド"]
    LOCALLOG -->|"logrotate"| ROTATE["世代管理・圧縮・削除"]

    classDef logFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class APP,JOURNALD,RSYSLOG,LOCALLOG,CENTRAL,JOURNALCTL,ROTATE logFill`,
    'diag-12': `flowchart LR
    A["ハードウェア検出<br/>(udev / カーネル)"] --> B{"対応モジュールは<br/>ロード済みか？"}
    B -- "いいえ" --> C["modprobe が依存モジュールを解決"]
    C --> D["/lib/modules/\$(uname -r)/<br/>からモジュールをロード"]
    D --> E["デバイスノード生成<br/>/dev/以下"]
    B -- "はい" --> E
    E --> F["ユーザー空間から利用可能に"]

    classDef kFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class A,B,C,D,E,F kFill`,
    'diag-13': `flowchart TB
    subgraph L4["アプリケーション層"]
        HTTP["HTTP/HTTPS, DNS, SSH, SMTP"]
    end
    subgraph L3["トランスポート層"]
        TCP["TCP(信頼性・順序保証)"]
        UDP["UDP(低遅延・ベストエフォート)"]
    end
    subgraph L2["インターネット層"]
        IP["IP(アドレッシング・ルーティング)"]
        ICMP["ICMP(制御メッセージ)"]
    end
    subgraph L1["リンク層"]
        ETH["Ethernet, Wi-Fi"]
    end
    L4 --> L3 --> L2 --> L1

    classDef layerFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class HTTP,TCP,UDP,IP,ICMP,ETH layerFill`,
    'diag-14': `flowchart TB
    START["パケット到着"] --> CHECK{"宛先が<br/>直結ネットワーク内か？"}
    CHECK -- "はい" --> DIRECT["ARP/NDPで<br/>直接配送"]
    CHECK -- "いいえ" --> TABLE["ルーティングテーブルを検索"]
    TABLE --> MATCH{"最長一致する<br/>経路があるか？"}
    MATCH -- "はい" --> NEXTHOP["次ホップ(ゲートウェイ)へ転送"]
    MATCH -- "いいえ" --> DEFAULT{"デフォルトルート<br/>(0.0.0.0/0)は<br/>設定されているか？"}
    DEFAULT -- "はい" --> NEXTHOP
    DEFAULT -- "いいえ" --> DROP["到達不能<br/>(ICMP Destination Unreachable)"]

    classDef routeFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class START,CHECK,DIRECT,TABLE,MATCH,NEXTHOP,DEFAULT routeFill
    class DROP dangerFill`,
    'diag-15': `sequenceDiagram
    participant C as クライアント
    participant R as 再帰リゾルバ<br/>(Unbound/BIND)
    participant Root as ルートサーバー
    participant TLD as TLDサーバー(.com等)
    participant Auth as 権威サーバー(example.com)

    C->>R: www.example.com の名前解決要求
    alt キャッシュにヒット
        R-->>C: キャッシュから即応答
    else キャッシュミス
        R->>Root: .com はどこ？
        Root-->>R: TLDサーバーのアドレス
        R->>TLD: example.com はどこ？
        TLD-->>R: 権威サーバーのアドレス
        R->>Auth: www.example.com のAレコードは？
        Auth-->>R: IPアドレスを応答(RRSIGでDNSSEC署名)
        R-->>C: IPアドレスを応答しキャッシュ
    end`,
    'diag-16': `sequenceDiagram
    participant U as ユーザー
    participant SP as サービス(Webアプリ)
    participant IdP as アイデンティティプロバイダ<br/>(Okta/Azure AD/Keycloak等)

    U->>SP: リソースへアクセス要求
    SP-->>U: 未認証 → IdPへリダイレクト
    U->>IdP: 認証情報を提示(パスワード＋MFA)
    alt SAML (HTTP POST Binding)
        IdP-->>IdP: 認証成功、署名済み<br/>SAMLアサーションを発行
        IdP-->>U: SAMLアサーションを返却
        U->>SP: SAMLアサーションをPOST
    else OIDC (Authorization Code Flow)
        IdP-->>U: 認可コードを返却(リダイレクト)
        U->>SP: 認可コードを提示
        SP->>IdP: トークンエンドポイントで認可コードを交換<br/>(クライアント認証 / PKCE)
        IdP-->>SP: IDトークン(＋アクセストークン)を発行
    end
    SP-->>SP: 署名検証(SAMLアサーション / IDトークン)
    SP-->>U: アクセス許可`,
    'diag-17': `flowchart LR
    SENDER["送信者のMUA<br/>(メールクライアント)"] -->|"SMTP (Submission, port 587)"| MSA["送信側MSA/MTA<br/>(Postfix等)"]
    MSA -->|"MXレコードをDNS参照"| DNS["宛先ドメインのMXレコード解決"]
    MSA -->|"SMTP (port 25)"| RMTA["受信側MTA"]
    RMTA -->|"SPF/DKIM/DMARC検証"| FILTER["スパム・なりすまし判定"]
    FILTER -->|"合格"| MDA["MDA(配送エージェント)"]
    MDA -->|"IMAP/POP3"| RECIPIENT["受信者のMUA"]

    classDef mailFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class SENDER,MSA,DNS,RMTA,FILTER,MDA,RECIPIENT mailFill`,
    'diag-18': `flowchart TB
    CLIENT["クライアント"] -->|"HTTPS"| LB["ロードバランサー<br/>(TLS終端)"]
    LB --> RP["リバースプロキシ<br/>(nginx/Caddy)"]
    RP --> APP1["アプリケーションサーバー #1"]
    RP --> APP2["アプリケーションサーバー #2"]
    RP --> APP3["アプリケーションサーバー #3"]
    APP1 --> CACHE["キャッシュ層<br/>(Redis/Memcached)"]
    APP2 --> CACHE
    APP3 --> CACHE
    APP1 --> DB["データベース"]
    APP2 --> DB
    APP3 --> DB

    classDef webFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class CLIENT,LB,RP,APP1,APP2,APP3,CACHE,DB webFill`,
    'diag-19': `flowchart TB
    subgraph PV["物理ボリューム(PV)"]
        D1["/dev/sdb"]
        D2["/dev/sdc"]
    end
    subgraph VG["ボリュームグループ(VG)"]
        POOL["複数PVを束ねた容量プール"]
    end
    subgraph LV["論理ボリューム(LV)"]
        LV1["lv_data (500GB)"]
        LV2["lv_backup (200GB)"]
    end
    D1 --> POOL
    D2 --> POOL
    POOL --> LV1
    POOL --> LV2
    LV1 --> FS1["ext4 / XFS でフォーマット"]
    LV2 --> FS2["ext4 / XFS でフォーマット"]

    classDef pvFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    classDef lvFill fill:#123024,stroke:#3ecf8e,color:#eafff5
    class D1,D2,POOL pvFill
    class LV1,LV2,FS1,FS2 lvFill`,
    'diag-20': `flowchart LR
    SERVER["NFSサーバー<br/>/etc/exports で共有定義"] -->|"エクスポート (mountd/rpc.nfsd)"| NET["ネットワーク越しに公開"]
    NET --> C1["クライアント1<br/>mount -t nfs server:/data /mnt"]
    NET --> C2["クライアント2<br/>mount -t nfs server:/data /mnt"]
    C1 --> SHARE["共有ファイルシステムへの<br/>透過的アクセス"]
    C2 --> SHARE

    classDef nfsFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class SERVER,NET,C1,C2,SHARE nfsFill`,
    'diag-21': `flowchart TB
    CONTROL["Ansibleコントロールノード<br/>(Playbookを保持)"] -->|"SSH接続"| N1["管理対象ノード1"]
    CONTROL -->|"SSH接続"| N2["管理対象ノード2"]
    CONTROL -->|"SSH接続"| N3["管理対象ノード3"]
    N1 --> CHECK1{"現在の状態は<br/>Playbookの宣言と一致？"}
    CHECK1 -- "一致" --> SKIP1["変更なし(ok)"]
    CHECK1 -- "不一致" --> APPLY1["差分のみ適用(changed)"]

    classDef ctrlFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    classDef nodeFill fill:#123024,stroke:#3ecf8e,color:#eafff5
    class CONTROL ctrlFill
    class N1,N2,N3,CHECK1,SKIP1,APPLY1 nodeFill`,
    'diag-22': `flowchart TB
    subgraph Type1["Type-1(ベアメタル型)ハイパーバイザー"]
        HW1["物理ハードウェア"] --> HV1["ハイパーバイザー<br/>(KVM, ESXi, Hyper-V)"]
        HV1 --> VM1a["ゲストOS #1"]
        HV1 --> VM1b["ゲストOS #2"]
    end
    subgraph Type2["Type-2(ホスト型)ハイパーバイザー"]
        HW2["物理ハードウェア"] --> HOST["ホストOS"]
        HOST --> HV2["ハイパーバイザーアプリ<br/>(VirtualBox, VMware Workstation)"]
        HV2 --> VM2a["ゲストOS"]
    end

    classDef hvFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class HW1,HV1,VM1a,VM1b,HW2,HOST,HV2,VM2a hvFill`,
    'diag-23': `flowchart TB
    subgraph VMs["仮想マシン方式"]
        HW1["物理ハードウェア"] --> HV["ハイパーバイザー"]
        HV --> G1["ゲストOS #1(フルカーネル)"]
        HV --> G2["ゲストOS #2(フルカーネル)"]
        HV --> G3["ゲストOS #3(フルカーネル)"]
        G1 --> APP1["アプリ"]
        G2 --> APP2["アプリ"]
        G3 --> APP3["アプリ"]
    end
    subgraph Containers["コンテナ方式"]
        HW2["物理ハードウェア"] --> HOSTOS["ホストOS(単一カーネル)"]
        HOSTOS --> ENGINE["コンテナランタイム<br/>(containerd/runc)"]
        ENGINE --> C1["コンテナ #1<br/>(namespaces+cgroupsで隔離)"]
        ENGINE --> C2["コンテナ #2"]
        ENGINE --> C3["コンテナ #3"]
    end

    classDef vmFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    classDef cFill fill:#123024,stroke:#3ecf8e,color:#eafff5
    class HW1,HV,G1,G2,G3,APP1,APP2,APP3 vmFill
    class HW2,HOSTOS,ENGINE,C1,C2,C3 cFill`,
    'diag-24': `flowchart LR
    DEV["開発者が<br/>git pushする"] --> TRIGGER["CIパイプライン起動<br/>(GitHub Actions/GitLab CI等)"]
    TRIGGER --> LINT["静的解析<br/>(Lint/型チェック)"]
    LINT --> BUILD["ビルド"]
    BUILD --> TEST["自動テスト<br/>(単体・統合)"]
    TEST --> SCAN["セキュリティスキャン<br/>(依存関係・イメージ脆弱性)"]
    SCAN --> ARTIFACT["アーティファクト生成<br/>(コンテナイメージ等)"]
    ARTIFACT --> STAGING["ステージング環境へ<br/>自動デプロイ"]
    STAGING --> APPROVAL{"本番デプロイの<br/>承認ゲート"}
    APPROVAL -- "承認" --> PROD["本番環境へデプロイ<br/>(Blue-Green/Canary)"]
    APPROVAL -- "却下" --> DEV

    classDef ciFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class DEV,TRIGGER,LINT,BUILD,TEST,SCAN,ARTIFACT,STAGING,APPROVAL,PROD ciFill`,
    'diag-25': `flowchart TB
    subgraph Layers["多層防御 (Defense in Depth)"]
        L1["境界防御<br/>ファイアウォール / WAF"]
        L2["ネットワーク隔離<br/>VLAN / セキュリティグループ"]
        L3["ホスト強化<br/>不要サービス停止 / パッチ管理"]
        L4["認証・認可<br/>SSH鍵認証 / MFA / 最小権限"]
        L5["アプリケーション対策<br/>入力検証 / 依存関係管理"]
        L6["監視・検知<br/>auditd / IDS / SIEM"]
        L7["データ保護<br/>暗号化 (at rest / in transit)"]
    end
    L1 --> L2 --> L3 --> L4 --> L5 --> L6 --> L7

    classDef secFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class L1,L2,L3,L4,L5,L6,L7 secFill`,
    'diag-26': `flowchart LR
    APP["アプリケーション<br/>／ノードエクスポーター"] -->|"メトリクス公開<br/>(/metrics エンドポイント)"| PROM["Prometheus<br/>(スクレイプ・時系列DB)"]
    PROM -->|"クエリ(PromQL)"| GRAFANA["Grafana<br/>(ダッシュボード可視化)"]
    PROM -->|"閾値評価"| ALERT["Alertmanager<br/>(アラートルーティング)"]
    ALERT -->|"通知"| ONCALL["オンコール担当者<br/>(Slack/PagerDuty)"]

    classDef monFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class APP,PROM,GRAFANA,ALERT,ONCALL monFill`,
    'diag-27': `flowchart TB
    START["性能問題の調査を開始"] --> LIST["対象リソースを列挙<br/>(CPU, メモリ, ディスクI/O, ネットワーク)"]
    LIST --> LOOP["各リソースについて<br/>3つの質問を確認"]
    LOOP --> U["Utilization: <br/>使用率は高いか？"]
    LOOP --> S["Saturation: <br/>処理待ちのキューが<br/>溜まっていないか？"]
    LOOP --> E["Errors: <br/>エラーは発生していないか？"]
    U --> JUDGE{"いずれかで<br/>異常を検出？"}
    S --> JUDGE
    E --> JUDGE
    JUDGE -- "はい" --> DRILL["該当リソースを<br/>詳細ツールで深掘り<br/>(perf/eBPF/flame graph)"]
    JUDGE -- "いいえ" --> NEXT["次のリソースへ"]
    NEXT --> LOOP
    DRILL --> ROOT["根本原因を特定"]

    classDef perfFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class START,LIST,LOOP,U,S,E,JUDGE,DRILL,NEXT,ROOT perfFill`,
    'diag-28': `flowchart TB
    DETECT["障害検知<br/>(監視アラート／ユーザー報告)"] --> TRIAGE["トリアージ<br/>(影響範囲・深刻度の判定)"]
    TRIAGE --> DECLARE["インシデント宣言<br/>(指揮者/コミュニケーション役の任命)"]
    DECLARE --> MITIGATE["応急対応<br/>(切り戻し・トラフィック退避)"]
    MITIGATE --> RESOLVE["恒久対応・復旧確認"]
    RESOLVE --> POSTMORTEM["ブレームレス・ポストモーテム作成<br/>(タイムライン・根本原因・再発防止策)"]
    POSTMORTEM --> ACTION["アクションアイテムを<br/>バックログへ登録・追跡"]
    ACTION --> REVIEW["組織的なレビュー<br/>(同様の障害パターンの水平展開)"]

    classDef incFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class DETECT,TRIAGE,DECLARE,MITIGATE,RESOLVE,POSTMORTEM,ACTION,REVIEW incFill`,
    'diag-29': `flowchart LR
    S1["Step1<br/>基本操作<br/>(第4,5,7章)"] --> S2["Step2<br/>権限とユーザー<br/>(第3,8章)"]
    S2 --> S3["Step3<br/>ブートとサービス管理<br/>(第2,6,10章)"]
    S3 --> S4["Step4<br/>ネットワーク基礎<br/>(第13,15,16章)"]
    S4 --> S5["Step5<br/>ストレージとセキュリティ<br/>(第20,27章)"]
    S5 --> S6["Step6<br/>自動化と運用<br/>(第23,25,26章)"]
    S6 --> S7["Step7<br/>監視と性能改善<br/>(第28,29章)"]
    S7 --> S8["Step8<br/>組織運用<br/>(第31章)"]

    classDef stepFill fill:#132a52,stroke:#7c9eff,color:#eaf1ff
    class S1,S2,S3,S4,S5,S6,S7,S8 stepFill`,
};
