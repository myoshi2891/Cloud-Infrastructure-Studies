/**
 * Google Cloud Professional Cloud Architect (PCA) Section 3 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3 | 4;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "section-3-の全体像",
        "label": "Section 3 の全体像",
        "level": 2
    },
    {
        "id": "31-セキュリティの設計",
        "label": "3.1 セキュリティの設計",
        "level": 2
    },
    {
        "id": "311-identity-and-access-managementiam",
        "label": "3.1.1 Identity and Access Management（IAM）",
        "level": 3
    },
    {
        "id": "312-リソース階層組織フォルダプロジェクト",
        "label": "3.1.2 リソース階層（組織・フォルダ・プロジェクト）",
        "level": 3
    },
    {
        "id": "313-データセキュリティ鍵管理暗号化シークレット管理",
        "label": "3.1.3 データセキュリティ（鍵管理・暗号化・シークレット管理）",
        "level": 3
    },
    {
        "id": "314-職務分掌separation-of-duties",
        "label": "3.1.4 職務分掌（Separation of Duties）",
        "level": 3
    },
    {
        "id": "315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー",
        "label": "3.1.5 セキュリティ制御（監査・VPC Service Controls・コンテキストアウェアアクセス・組織ポリシー・階層ファイアウォールポリシー）",
        "level": 3
    },
    {
        "id": "316-cloud-kmsによる顧客管理暗号鍵cmekの管理",
        "label": "3.1.6 Cloud KMSによる顧客管理暗号鍵（CMEK）の管理",
        "level": 3
    },
    {
        "id": "317-セキュアなリモートアクセス",
        "label": "3.1.7 セキュアなリモートアクセス",
        "level": 3
    },
    {
        "id": "318-ソフトウェアサプライチェーンのセキュリティ確保",
        "label": "3.1.8 ソフトウェアサプライチェーンのセキュリティ確保",
        "level": 3
    },
    {
        "id": "319-aiのセキュリティ確保",
        "label": "3.1.9 AIのセキュリティ確保",
        "level": 3
    },
    {
        "id": "32-コンプライアンスの設計",
        "label": "3.2 コンプライアンスの設計",
        "level": 2
    },
    {
        "id": "321-法令規制",
        "label": "3.2.1 法令・規制",
        "level": 3
    },
    {
        "id": "322-商用データの取り扱い",
        "label": "3.2.2 商用データの取り扱い",
        "level": 3
    },
    {
        "id": "323-業界認証",
        "label": "3.2.3 業界認証",
        "level": 3
    },
    {
        "id": "324-監査ログを含む",
        "label": "3.2.4 監査（ログを含む）",
        "level": 3
    },
    {
        "id": "well-architected-frameworkセキュリティピラーとの関係",
        "label": "Well-Architected Frameworkセキュリティピラーとの関係",
        "level": 2
    },
    {
        "id": "学習チェックリスト",
        "label": "学習チェックリスト",
        "level": 2
    },
    {
        "id": "参考文献",
        "label": "参考文献",
        "level": 2
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
    | 'diag-26';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    ROOT["Section 3<br/>セキュリティと<br/>コンプライアンス<br/>約17.5%"]
    subgraph S1["3.1 セキュリティの設計"]
        direction TB
        A1[IAM]
        A2[リソース階層]
        A3[データセキュリティ]
        A4[職務分掌]
        A5[セキュリティ制御]
        A6[Cloud KMSとCMEK]
        A7[セキュアなリモートアクセス]
        A8[ソフトウェアサプライチェーン]
        A9[AIのセキュリティ]
    end
    subgraph S2["3.2 コンプライアンスの設計"]
        direction TB
        B1[法令・規制]
        B2[商用データの取り扱い]
        B3[業界認証]
        B4[監査]
    end
    ROOT --> S1
    ROOT --> S2`,

    'diag-2': `flowchart TD
    A["プリンシパルがAPIを呼び出す"] --> B{"リソースに対する<br/>拒否ポリシーが存在するか"}
    B -- Yes・対象権限が拒否対象 --> C1["アクセス拒否"]
    B -- No --> D{"許可ポリシーの<br/>バインディングが存在するか"}
    D -- No --> C2["アクセス拒否"]
    D -- Yes --> E{"IAM Conditionsの<br/>条件式を満たすか"}
    E -- No --> C3["アクセス拒否"]
    E -- Yes --> F["アクセス許可"]`,

    'diag-3': `flowchart LR
    subgraph LP["最小権限"]
        LP1[基本ロールを避ける]
        LP2[ロール推奨機能で<br/>未使用権限を特定]
        LP3[必要な範囲の<br/>最小スコープで付与]
    end
    subgraph SA["サービスアカウント管理"]
        SA1[デフォルトSAへの<br/>自動ロール付与を回避]
        SA2[サービスアカウント<br/>キーは最終手段]
        SA3[ドメイン全体の委任を回避]
    end
    subgraph AU["監査"]
        AU1[IAM APIの<br/>データアクセスログを有効化]
        AU2[Policy Analyzerで<br/>定期的に権限を棚卸し]
    end
    subgraph PM["ポリシー管理"]
        PM1[グループ単位で<br/>ロールを付与]
        PM2[条件付きIAMで<br/>時間・属性制御]
    end`,

    'diag-4': `flowchart TD
    ORG["組織(Organization)<br/>ルートノード。会社全体を表す"]
    F1["フォルダ(Folder)<br/>例: 部門・環境ごとのグルーピング"]
    F2["フォルダ(Folder)"]
    F3["フォルダ(サブフォルダ、最大10階層)"]
    P1["プロジェクト(Project)<br/>課金・APIの有効化単位"]
    P2["プロジェクト(Project)"]
    P3["プロジェクト(Project)"]
    R1["リソース<br/>(VM、バケット、データセットなど)"]

    ORG --> F1
    ORG --> F2
    F1 --> F3
    F1 --> P1
    F2 --> P2
    F3 --> P3
    P1 --> R1`,

    'diag-5': `flowchart LR
    A[構造化されたリソース階層] --> B["所有権の明確化<br/>(Ownership)"]
    A --> C["ポリシーの継承<br/>(Inheritance)"]
    A --> D["一元的なガバナンス<br/>(Governance)"]
    B --> B1["プロジェクトは組織に帰属し、<br/>作成者個人ではない。<br/>従業員退職時もプロジェクトは存続"]
    C --> C1["上位で設定したIAM・<br/>組織ポリシーが下位に自動伝播し、<br/>個別設定の手間を削減"]
    D --> D1["組織・フォルダ単位で<br/>一括してアクセス制御・<br/>コンプライアンス境界を設定"]`,

    'diag-6': `flowchart TD
    A["CMEKを検討すべきか？"] --> B{"以下のいずれかの<br/>要件があるか"}
    B -->|鍵の所有権を<br/>自社で保持したい| C["CMEKを使用"]
    B -->|鍵の利用場所を<br/>ポリシーで制限したい| C
    B -->|オフボーディング時に<br/>暗号学的削除<br/>crypto-shreddingを行いたい| C
    B -->|顧客ごとに固有の<br/>暗号境界を確立したい| C
    B -->|鍵への管理アクセス・<br/>データアクセスを<br/>ログに残したい| C
    B -->|上記に該当しない| D["デフォルト暗号化<br/>(Google-managed keys)で十分"]`,

    'diag-7': `sequenceDiagram
    participant App as アプリケーション/サービス
    participant KMS as Cloud KMS<br/>(KEKを保持)
    participant Store as ストレージ<br/>(Cloud Storage等)

    App->>App: データ用のDEK(データ暗号化鍵)を生成
    App->>App: DEKでデータを暗号化
    App->>KMS: DEKの暗号化(ラップ)を依頼
    KMS-->>App: ラップ済みDEKを返却
    App->>Store: 暗号化データ + ラップ済みDEKを保存
    Note over App,Store: 復号時は逆の手順で<br/>KMSにアンラップを依頼してからDEKで復号`,

    'diag-8': `flowchart TD
    A[職務分掌の実現手段] --> B["リソース階層による分離"]
    A --> C["カスタムロールによる分離"]
    A --> D["鍵管理者とデータ管理者の分離"]
    A --> E["IAM Denyポリシーによる分離"]
    B --> B1["部門・ライン間で異なる<br/>プロジェクト/フォルダに配置し、<br/>相互アクセスを防止"]
    C --> C1["事前定義ロールの組み合わせで<br/>職責に応じた最小権限の<br/>カスタムロールを作成"]
    D --> D1["Cloud KMSの鍵管理者ロールと<br/>データ管理者ロールを<br/>異なる担当者に付与"]
    E --> E1["特定チームに対し、<br/>IAM変更や組織ポリシー変更などの<br/>高権限操作を明示的に拒否"]`,

    'diag-9': `flowchart TD
    subgraph L1["ID/権限レイヤー"]
        IAM["IAM<br/>誰が・何に・何をできるか"]
    end
    subgraph L2["ネットワーク/コンテキストレイヤー"]
        VPCSC["VPC Service Controls<br/>サービス境界の内外を分離"]
        CAA["Context-Aware Access<br/>デバイス・場所などの文脈で判定"]
        HFW["階層ファイアウォールポリシー<br/>組織・フォルダ単位の通信制御"]
    end
    subgraph L3["ガバナンスレイヤー"]
        ORGPOL["組織ポリシー<br/>リソース構成の許可/禁止ルール"]
    end
    subgraph L4["可観測性レイヤー"]
        AUDIT["Cloud Audit Logs<br/>誰が何をしたかの記録"]
    end
    IAM --> VPCSC
    VPCSC --> CAA
    ORGPOL -.->|リソース構成を制約| L1
    HFW -.->|通信経路を制約| L2
    AUDIT -.->|全レイヤーの操作を記録| L1
    AUDIT -.-> L2
    AUDIT -.-> L3`,

    'diag-10': `flowchart LR
    A["APIリクエスト"] --> B{"リクエストの種類"}
    B -->|構成変更| C["Admin Activity<br/>ログ"]
    B -->|データ読み書き<br/>要個別有効化| D["Data Access<br/>ログ"]
    B -->|Googleシステムによる<br/>自動変更| E["System Event<br/>ログ"]
    B -->|セキュリティポリシー<br/>違反で拒否| F["Policy Denied<br/>ログ"]
    C --> G["Cloud Logging<br/>_Default / _Required バケット"]
    D --> G
    E --> G
    F --> G
    G --> H["BigQuery / Cloud Storage等へ<br/>シンクでエクスポート"]`,

    'diag-11': `flowchart TB
    subgraph Perimeter["サービス境界(Service Perimeter)"]
        direction TB
        P1["プロジェクトA"]
        P2["プロジェクトB"]
        GCS["Cloud Storage"]
        BQ["BigQuery"]
    end
    VM["境界内VPC上のVM<br/>(プライベートアクセス)"] -->|許可| Perimeter
    OnPrem["オンプレミス/他クラウド<br/>(限定公開Google アクセス経由)"] -->|許可された<br/>アクセスレベルのみ| Perimeter
    Attacker["境界外の不正な<br/>認証情報利用"] -.->|遮断| Perimeter
    Perimeter -.->|データ持ち出し試行| External["境界外の<br/>無関係なプロジェクト"]
    style Attacker fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    style External fill:#3a1420,stroke:#c05a6e,color:#f5d8de`,

    'diag-12': `flowchart TD
    U["ユーザー"] --> IAP["Identity-Aware Proxy<br/>(アプリケーションレベルの<br/>アクセスゲートウェイ)"]
    IAP --> Auth{"ユーザー認証<br/>(Google/Cloud Identity)"}
    Auth -->|失敗| Deny1["拒否"]
    Auth -->|成功| ACM["Access Context Manager<br/>でアクセスレベルを評価"]
    ACM --> Check{"IPアドレス範囲<br/>デバイスの信頼性<br/>地理的位置 等"}
    Check -->|条件を満たさない| Deny2["拒否"]
    Check -->|条件を満たす| IAMCheck{"IAM許可ポリシー<br/>(IAP-secured Web App User)"}
    IAMCheck -->|権限なし| Deny3["拒否"]
    IAMCheck -->|権限あり| Allow["保護対象アプリケーション/<br/>VMへのアクセスを許可"]`,

    'diag-13': `flowchart TD
    ORG["組織レベルで<br/>制約を設定"] -->|継承| F["フォルダA"]
    ORG -->|継承| F2["フォルダB"]
    F -->|継承 or 上書き| P1["プロジェクト1"]
    F -->|継承 or 上書き| P2["プロジェクト2(例外を許可)"]
    Note["未設定の場合は、Googleが定める<br/>デフォルトの制約動作が適用される"]`,

    'diag-14': `flowchart TD
    Rule1["組織レベルの<br/>ファイアウォールポリシー<br/>(最優先で評価)"] --> Rule2["フォルダレベルの<br/>ファイアウォールポリシー"]
    Rule2 --> Rule3["VPCファイアウォールルール<br/>(プロジェクト/ネットワークレベル)"]
    Rule3 --> VM["VMインスタンスへの<br/>実際の適用結果"]
    Rule1 -.->|goto_nextアクションで<br/>下位評価に委譲可能| Rule2`,

    'diag-15': `flowchart LR
    Dev["開発者が<br/>CMEK対応リソースを作成"] --> Autokey["Cloud KMS Autokey"]
    Autokey --> KR["キーリングと鍵を<br/>自動生成"]
    Autokey --> IAMGrant["サービスエージェントへ<br/>暗号/復号ロールを自動付与"]
    KR --> Resource["CMEKで保護された<br/>リソースが完成"]
    IAMGrant --> Resource`,

    'diag-16': `flowchart TB
    subgraph ZT["ゼロトラストのセキュアなリモートアクセス"]
        direction TB
        User["リモートユーザー"] --> CEP["Chrome Enterprise Premium<br/>(デバイスの信頼性を検証)"]
        CEP --> IAP2["Identity-Aware Proxy<br/>(アプリケーションレベルの認可)"]
        IAP2 --> App["社内アプリケーション/<br/>Google Cloudコンソール"]
        Ext["外部ワークロード<br/>(GitHub Actions、AWS等)"] --> WIF["Workload Identity<br/>Federation<br/>(外部IDをGCPプリンシパルに変換)"]
        WIF --> SAImp["サービスアカウントの<br/>なりすまし(Impersonation)"]
        SAImp --> GCPAPI["Google Cloud API"]
    end`,

    'diag-17': `sequenceDiagram
    participant Ext as 外部ワークロード<br/>(例: GitHub Actions)
    participant IdP as 外部IdP<br/>(GitHub OIDCプロバイダ)
    participant Pool as ワークロードID プール<br/>(Workload Identity Pool)
    participant SA as サービスアカウント
    participant API as Google Cloud API

    Ext->>IdP: OIDCトークンをリクエスト
    IdP-->>Ext: 短期間有効なOIDCトークンを発行
    Ext->>Pool: OIDCトークンを提示
    Pool->>Pool: 属性マッピング/属性条件で検証
    Pool->>SA: サービスアカウントの<br/>なりすましを実行
    SA-->>Ext: 短期間有効なGoogle Cloud<br/>アクセストークンを発行
    Ext->>API: トークンでAPIを呼び出し`,

    'diag-18': `flowchart LR
    CEP["Chrome Enterprise Premium"] --> IAP3["IAP<br/>アプリケーションアクセスの制御"]
    CEP --> IAMc["IAM<br/>ID管理・認可"]
    CEP --> ACM2["Access Context Manager<br/>アクセスレベルのルールエンジン"]
    CEP --> EV["Endpoint Verification<br/>デバイス情報の収集<br/>(Chrome拡張機能)"]`,

    'diag-19': `flowchart LR
    Src["ソースリポジトリ<br/>(Cloud Source Repositories等)"] --> Build["Cloud Build<br/>(SLSAレベル3対応のCI)"]
    Build --> Scan["Artifact Analysis<br/>(脆弱性スキャン)"]
    Scan --> AR["Artifact Registry<br/>(イメージ・パッケージの<br/>一元管理)"]
    Build --> Attest["ビルドプロベナンス/<br/>アテステーション(証明書)の生成"]
    Attest --> BinAuthz{"Binary Authorization<br/>(デプロイ時ポリシー検証)"}
    AR --> BinAuthz
    BinAuthz -->|ポリシー準拠| Deploy["Cloud Run / GKE への<br/>デプロイ許可"]
    BinAuthz -->|ポリシー違反| Block["デプロイ拒否 + 通知"]
    style Block fill:#3a1420,stroke:#c05a6e,color:#f5d8de`,

    'diag-20': `flowchart LR
    User["ユーザー"] -->|プロンプト| MA1["Model Armor<br/>(入力スクリーニング)"]
    MA1 -->|安全と判定されたプロンプト<br/>またはサニタイズ済みプロンプト| LLM["LLM / エージェント<br/>(Gemini等)"]
    LLM -->|生成された応答| MA2["Model Armor<br/>(出力スクリーニング)"]
    MA2 -->|安全と判定された応答| User
    MA1 -.->|検知結果を送信| SCC["Security Command Center<br/>AI Protectionダッシュボード"]
    MA2 -.->|検知結果を送信| SCC`,

    'diag-21': `flowchart TD
    Data["生データ<br/>(BigQuery / Cloud Storage / ストリーム)"] --> Inspect["検査ジョブ<br/>InfoType検出"]
    Inspect --> Findings["検出結果<br/>(種類・確信度・位置)"]
    Findings --> Deidentify["秘匿化<br/>マスキング/トークン化/日付シフト"]
    Deidentify --> Safe["秘匿化済みコピー<br/>(AI学習・分析等に利用可能)"]`,

    'diag-22': `flowchart TD
    subgraph Google["Googleの責任範囲"]
        G1["物理的なデータセンターのセキュリティ"]
        G2["インフラストラクチャの<br/>ハードウェア・ソフトウェア"]
        G3["Google Cloudサービス自体の<br/>コンプライアンス認証取得"]
    end
    subgraph Shared["共有の責任範囲"]
        S1["ネットワーク制御の一部設定"]
        S2["ID・アクセス管理の一部設定"]
    end
    subgraph Customer["顧客の責任範囲"]
        C1["データの分類・取り扱い"]
        C2["IAM・組織ポリシーの設定"]
        C3["自社サービスとしての<br/>コンプライアンス適合性の証明"]
        C4["アプリケーションレベルの<br/>セキュリティ実装"]
    end`,

    'diag-23': `flowchart TD
    A["Assured Workloadsフォルダを作成"] --> B["コントロールパッケージを選択"]
    B --> C1["地域データ境界<br/>(Regional Data Boundary)"]
    B --> C2["規制データ境界<br/>(Regulatory Data Boundary)"]
    B --> C3["パートナーによる主権制御<br/>(Sovereign Controls by Partners)"]
    C1 --> D["組織ポリシー制約が<br/>自動適用され、<br/>フォルダ配下の全リソースに<br/>ガードレールが及ぶ"]
    C2 --> D
    C3 --> D`,

    'diag-24': `flowchart TD
    PCI["PCI DSS要件"] --> Google2["Googleが単独で<br/>責任を負う要件<br/>(QSAにより検証済み)"]
    PCI --> Shared2["顧客とGoogleの<br/>共有責任となる要件"]
    PCI --> Customer2["顧客が単独で<br/>責任を負う要件<br/>(GCPの範囲外)"]
    Google2 --> G2ex["例: データセンターの<br/>物理セキュリティ"]
    Shared2 --> Sex["例: 暗号鍵の管理、<br/>脆弱性管理プロセス"]
    Customer2 --> Cex["例: アプリケーション層の<br/>カード会員データの取り扱い"]`,

    'diag-25': `flowchart TD
    Audit["第三者監査機関による評価"] --> SOC["SOC 1 / 2 / 3<br/>(AICPA SSAE 18準拠)"]
    Audit --> ISO["ISO/IEC 27001/17/18/701<br/>(情報セキュリティ/<br/>クラウド/プライバシー)"]
    Audit --> PCI2["PCI DSS<br/>(カード会員データ)"]
    Audit --> FedRAMP["FedRAMP<br/>(米国政府機関向け)"]
    SOC --> CRM["Compliance Reports Manager<br/>で顧客がオンデマンドに<br/>証跡を取得可能"]
    ISO --> CRM`,

    'diag-26': `flowchart TD
    subgraph CustomerAudit["顧客側の操作の監査"]
        CAL["Cloud Audit Logs<br/>(Admin Activity / Data Access /<br/>System Event / Policy Denied)"]
    end
    subgraph GoogleAudit["Google人員によるアクセスの監査"]
        AT["Access Transparency<br/>(いつ・誰が・なぜアクセスしたかを記録)"]
        AA["Access Approval<br/>(アクセス要求を顧客が事前承認)"]
    end
    CAL --> SIEM["SIEM/セキュリティ運用<br/>への統合"]
    AT --> SIEM
    AA -.->|承認/拒否の判断| AT`,
};
