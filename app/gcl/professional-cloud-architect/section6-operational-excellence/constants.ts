export interface NavItem {
    id: string;
    label: string;
    level: number;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "このセクションについて",
        "label": "このセクションについて",
        "level": 2
    },
    {
        "id": "61-運用の卓越性の柱の原則と推奨事項",
        "label": "6.1 運用の卓越性の柱の原則と推奨事項",
        "level": 2
    },
    {
        "id": "well-architected-frameworkにおける位置づけ",
        "label": "Well-Architected Frameworkにおける位置づけ",
        "level": 3
    },
    {
        "id": "運用準備の4つのフォーカスエリア",
        "label": "運用準備の4つのフォーカスエリア",
        "level": 3
    },
    {
        "id": "核となる原則1-cloudopsによる運用準備とパフォーマンスの確保",
        "label": "核となる原則1: CloudOpsによる運用準備とパフォーマンスの確保",
        "level": 3
    },
    {
        "id": "核となる原則2-インシデントと問題の管理",
        "label": "核となる原則2: インシデントと問題の管理",
        "level": 3
    },
    {
        "id": "核となる原則3-クラウドリソースの管理と最適化",
        "label": "核となる原則3: クラウドリソースの管理と最適化",
        "level": 3
    },
    {
        "id": "核となる原則4-変更の自動化と管理",
        "label": "核となる原則4: 変更の自動化と管理",
        "level": 3
    },
    {
        "id": "核となる原則5-継続的な改善とイノベーション",
        "label": "核となる原則5: 継続的な改善とイノベーション",
        "level": 3
    },
    {
        "id": "62-google-cloud-observability",
        "label": "6.2 Google Cloud Observability",
        "level": 2
    },
    {
        "id": "オブザーバビリティの全体像",
        "label": "オブザーバビリティの全体像",
        "level": 3
    },
    {
        "id": "モニタリングとロギング",
        "label": "モニタリングとロギング",
        "level": 3
    },
    {
        "id": "プロファイリングとベンチマーキング",
        "label": "プロファイリングとベンチマーキング",
        "level": 3
    },
    {
        "id": "アラート戦略",
        "label": "アラート戦略",
        "level": 3
    },
    {
        "id": "63-デプロイとリリース管理",
        "label": "6.3 デプロイとリリース管理",
        "level": 2
    },
    {
        "id": "cloud-deployの基本構造",
        "label": "Cloud Deployの基本構造",
        "level": 3
    },
    {
        "id": "デプロイ戦略",
        "label": "デプロイ戦略",
        "level": 3
    },
    {
        "id": "承認プロモーションロールバック",
        "label": "承認・プロモーション・ロールバック",
        "level": 3
    },
    {
        "id": "64-デプロイ済みソリューションのサポート支援",
        "label": "6.4 デプロイ済みソリューションのサポート支援",
        "level": 2
    },
    {
        "id": "google-cloudサポートティア",
        "label": "Google Cloudサポートティア",
        "level": 3
    },
    {
        "id": "active-assistとrecommender",
        "label": "Active AssistとRecommender",
        "level": 3
    },
    {
        "id": "personalized-service-health",
        "label": "Personalized Service Health",
        "level": 3
    },
    {
        "id": "65-品質管理の評価",
        "label": "6.5 品質管理の評価",
        "level": 2
    },
    {
        "id": "cicdパイプラインにおける品質ゲート",
        "label": "CI/CDパイプラインにおける品質ゲート",
        "level": 3
    },
    {
        "id": "エラーバジェットによるリリースゲーティング",
        "label": "エラーバジェットによるリリースゲーティング",
        "level": 3
    },
    {
        "id": "ブレームレスポストモーテム文化",
        "label": "ブレームレスポストモーテム文化",
        "level": 3
    },
    {
        "id": "66-本番環境における信頼性の確保",
        "label": "6.6 本番環境における信頼性の確保",
        "level": 2
    },
    {
        "id": "カオスエンジニアリング",
        "label": "カオスエンジニアリング",
        "level": 3
    },
    {
        "id": "ペネトレーションテスト",
        "label": "ペネトレーションテスト",
        "level": 3
    },
    {
        "id": "負荷テスト",
        "label": "負荷テスト",
        "level": 3
    },
    {
        "id": "ケーススタディへの適用の視点",
        "label": "ケーススタディへの適用の視点",
        "level": 2
    },
    {
        "id": "well-architected-framework対応表",
        "label": "Well-Architected Framework対応表",
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
    | "diag-1"
    | "diag-2"
    | "diag-3"
    | "diag-4"
    | "diag-5"
    | "diag-6"
    | "diag-7"
    | "diag-8"
    | "diag-9"
    | "diag-10"
    | "diag-11"
    | "diag-12"
    | "diag-13"
    | "diag-14";

export const DIAGRAMS: Record<DiagramId, string> = {
    "diag-1": "graph TB\n    WAF[Google Cloud<br/>Well-Architected Framework]\n    WAF --> OE[運用の卓越性<br/>Operational Excellence]\n    WAF --> SEC[セキュリティ・プライバシー<br/>およびコンプライアンス]\n    WAF --> REL[信頼性<br/>Reliability]\n    WAF --> COST[コスト最適化<br/>Cost Optimization]\n    WAF --> PERF[パフォーマンス最適化<br/>Performance Optimization]\n    WAF --> SUS[サステナビリティ<br/>Sustainability]\n\n    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff\n    class OE highlightFill",
    "diag-2": "graph LR\n    OR[運用準備<br/>Operational Readiness]\n    OR --> WF[ワークフォース<br/>Workforce]\n    OR --> PR[プロセス<br/>Processes]\n    OR --> TL[ツール<br/>Tooling]\n    OR --> GV[ガバナンス<br/>Governance]",
    "diag-3": "flowchart LR\n    Detect[検知<br/>モニタリング/アラート] --> Triage[トリアージ<br/>重大度判定]\n    Triage --> Respond[対応<br/>インシデントコマンダー任命]\n    Respond --> Mitigate[緩和<br/>ロールバック/フェイルオーバー]\n    Mitigate --> Resolve[解決<br/>サービス復旧確認]\n    Resolve --> PIR[ポストインシデントレビュー<br/>ブレームレスポストモーテム]\n    PIR --> KB[ナレッジベース更新]\n    KB -.フィードバック.-> Detect",
    "diag-4": "flowchart LR\n    Code[コード変更] --> VCS[バージョン管理<br/>Git]\n    VCS --> CI[継続的インテグレーション<br/>Cloud Build]\n    CI --> Test[自動テスト<br/>単体/統合/E2E]\n    Test --> Artifact[アーティファクト生成<br/>Artifact Registry]\n    Artifact --> CD[継続的デリバリー<br/>Cloud Deploy]\n    CD --> IaC[IaC適用<br/>Terraform]\n    IaC --> Prod[本番環境]",
    "diag-5": "graph TD\n    A[運用準備とパフォーマンスの確保] --> B[インシデントと問題の管理]\n    B --> C[クラウドリソースの管理と最適化]\n    C --> D[変更の自動化と管理]\n    D --> E[継続的な改善とイノベーション]\n    E -->|学びをフィードバック| A",
    "diag-6": "flowchart TB\n    App[アプリケーション/インフラ] --> Metrics[メトリクス<br/>Cloud Monitoring]\n    App --> Logs[ログ<br/>Cloud Logging]\n    App --> Traces[トレース<br/>Cloud Trace]\n    App --> Profiles[プロファイル<br/>Cloud Profiler]\n    Metrics --> Alert[アラートポリシー]\n    Logs --> Alert\n    Alert --> Incident[インシデント作成/通知]\n    Traces --> Debug[レイテンシ原因の特定]\n    Profiles --> Debug\n    Logs --> Debug\n    Debug --> Fix[コード/構成の修正]",
    "diag-7": "sequenceDiagram\n    participant TS as 時系列データ/ログ\n    participant MON as Cloud Monitoring\n    participant NC as 通知チャネル\n    participant ONC as オンコール担当者\n    TS->>MON: メトリクス/ログエントリを収集\n    MON->>MON: アライメント期間で正規化\n    MON->>MON: 条件(しきい値)を評価\n    MON->>MON: インシデントを作成\n    MON->>NC: 通知を送信\n    NC->>ONC: メール/Slack/PagerDuty等\n    ONC->>MON: 確認・対応\n    MON->>MON: 条件解消でインシデントを自動クローズ\n    MON->>NC: クローズ通知",
    "diag-8": "flowchart LR\n    CI[CIプロセス<br/>コンテナイメージ生成] --> Release[リリース作成<br/>gcloud deploy releases create]\n    Release --> T1[ターゲット: dev]\n    T1 -->|プロモーション| T2[ターゲット: staging]\n    T2 -->|承認 必要な場合| T3[ターゲット: production]\n    T3 --> Rollout[ロールアウト完了]",
    "diag-9": "flowchart TB\n    Start[リリース開始] --> P1[フェーズ1: 新バージョンへ10%]\n    P1 --> V1{検証ジョブ<br/>成功?}\n    V1 -->|Yes| P2[フェーズ2: 新バージョンへ50%]\n    V1 -->|No| RB[自動ロールバック]\n    P2 --> V2{検証ジョブ<br/>成功?}\n    V2 -->|Yes| P3[フェーズ3: 新バージョンへ100%<br/>安定版]\n    V2 -->|No| RB",
    "diag-10": "flowchart LR\n    Issue[問題発生] --> Basic[Basic Support<br/>ドキュメント/コミュニティ]\n    Issue --> Case[サポートケース起票]\n    Case --> Std[Standard Support<br/>P2: 4時間以内に応答]\n    Case --> Enh[Enhanced Support<br/>高速応答+Recommender]\n    Case --> Prem[Premium Support<br/>TAM+Customer Aware Support]",
    "diag-11": "flowchart LR\n    Data[利用状況データ収集] --> ML[機械学習による分析]\n    ML --> Rec[推奨事項の生成<br/>コスト/セキュリティ/性能等]\n    Rec --> Review[担当者によるレビュー]\n    Review -->|適用| Apply[推奨事項を適用]\n    Review -->|却下| Dismiss[却下・記録]\n    Apply --> Monitor[効果をモニタリング]",
    "diag-12": "flowchart TD\n    SLO[SLO定義<br/>例: 可用性99.9%] --> Budget[エラーバジェット算出<br/>0.1%]\n    Budget --> Check{エラーバジェット<br/>残量は?}\n    Check -->|健全| Ship[通常どおりリリース]\n    Check -->|逼迫| Slow[リリース速度を落とす/承認必須]\n    Check -->|枯渇| Freeze[機能リリース凍結<br/>信頼性作業へ集中]",
    "diag-13": "flowchart LR\n    Incident[インシデント収束] --> Draft[ドラフト作成<br/>タイムライン記録]\n    Draft --> RCA[根本原因分析]\n    RCA --> Action[是正措置の洗い出し]\n    Action --> Review[チームレビュー<br/>ブレームレス原則]\n    Review --> Share[組織内で共有]\n    Share --> Track[アクションアイテムの追跡]",
    "diag-14": "flowchart LR\n    Steady[定常状態を定義] --> Hypo[仮説を立てる]\n    Hypo --> Inject[障害を注入<br/>例: ゾーン障害/レイテンシ増加]\n    Inject --> Observe[定常状態への影響を観測]\n    Observe --> Learn{仮説どおり?}\n    Learn -->|Yes| Confidence[信頼性への確信を強化]\n    Learn -->|No| Fix[脆弱性を修正]\n    Fix --> Steady"
};

export interface ChecklistItem {
    id: string;
    label: string;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
    {
        "id": "chk1",
        "label": "Well-Architected Frameworkの6本の柱と、運用の卓越性の柱が対象とする5つの読者層を説明できる"
    },
    {
        "id": "chk2",
        "label": "運用準備(Operational Readiness)の4つのフォーカスエリア(ワークフォース/プロセス/ツール/ガバナンス)を挙げられる"
    },
    {
        "id": "chk3",
        "label": "SLO策定におけるSMART基準を説明できる"
    },
    {
        "id": "chk4",
        "label": "インシデント管理のライフサイクル(検知→トリアージ→対応→緩和→解決→PIR)を説明できる"
    },
    {
        "id": "chk5",
        "label": "Cloud Monitoring・Cloud Logging・Cloud Trace・Cloud Profilerの役割の違いを説明できる"
    },
    {
        "id": "chk6",
        "label": "Cloud Profilerのプロファイルタイプ(CPU time/Heap/Heap allocation/Wall time)の違いを説明できる"
    },
    {
        "id": "chk7",
        "label": "アラートポリシー・インシデント・通知チャネルの3要素を説明できる"
    },
    {
        "id": "chk8",
        "label": "アラートのコスト管理(カーディナリティ、集約粒度)の考え方を説明できる"
    },
    {
        "id": "chk9",
        "label": "Cloud Deployのデリバリーパイプライン・ターゲット・リリース・ロールアウトの関係を説明できる"
    },
    {
        "id": "chk10",
        "label": "標準デプロイとカナリアデプロイ(自動/カスタム自動/フルカスタム)の違いを説明できる"
    },
    {
        "id": "chk11",
        "label": "Google CloudのサポートティアをBasic〜Premiumまで比較できる"
    },
    {
        "id": "chk12",
        "label": "Active Assistの6つの価値ピラーとレビュープロセスの重要性を説明できる"
    },
    {
        "id": "chk13",
        "label": "Personalized Service Healthが提供する3つのアクセス方法を挙げられる"
    },
    {
        "id": "chk14",
        "label": "エラーバジェットの考え方とリリースゲーティングへの応用を説明できる"
    },
    {
        "id": "chk15",
        "label": "ブレームレスポストモーテムの目的と標準的な構成要素を説明できる"
    },
    {
        "id": "chk16",
        "label": "カオスエンジニアリングの基本サイクル(定常状態→仮説→障害注入→観測)を説明できる"
    },
    {
        "id": "chk17",
        "label": "Google Cloud上でペネトレーションテストを行う際に遵守すべき条件を説明できる"
    },
    {
        "id": "chk18",
        "label": "負荷テストを実施する際に、サーバー側のボトルネックとクライアント/ネットワーク側のボトルネックを混同しないための注意点を説明できる"
    }
];

export interface RefCard {
    id: string;
    num: string;
    text: string;
    href: string;
}

export const REF_CARDS: RefCard[] = [
    {
        "id": "ref1",
        "num": "1",
        "text": "Professional Cloud Architect Certification exam guide (PDF) — Google\n                            Cloud.",
        "href": "https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
    },
    {
        "id": "ref2",
        "num": "2",
        "text": "Professional Cloud Architect Certification — Google Cloud.",
        "href": "https://cloud.google.com/learn/certification/cloud-architect"
    },
    {
        "id": "ref3",
        "num": "3",
        "text": "About the Well-Architected Framework — Google Cloud Documentation.",
        "href": "https://docs.cloud.google.com/docs/get-started/well-architected-framework"
    },
    {
        "id": "ref4",
        "num": "4",
        "text": "Google Cloud Well-Architected Framework — Cloud Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework"
    },
    {
        "id": "ref5",
        "num": "5",
        "text": "Well-Architected Framework: Operational excellence pillar — Cloud\n                            Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework/operational-excellence"
    },
    {
        "id": "ref6",
        "num": "6",
        "text": "Ensure operational readiness and performance using CloudOps — Cloud\n                            Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework/operational-excellence/operational-readiness-and-performance-using-cloudops"
    },
    {
        "id": "ref7",
        "num": "7",
        "text": "Manage incidents and problems — Cloud Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-incidents-and-problems"
    },
    {
        "id": "ref8",
        "num": "8",
        "text": "Manage and optimize cloud resources — Cloud Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources"
    },
    {
        "id": "ref9",
        "num": "9",
        "text": "Automate and manage change — Cloud Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework/operational-excellence/automate-and-manage-change"
    },
    {
        "id": "ref10",
        "num": "10",
        "text": "Continuously improve and innovate — Cloud Architecture Center.",
        "href": "https://docs.cloud.google.com/architecture/framework/operational-excellence/continuously-improve-and-innovate"
    },
    {
        "id": "ref11",
        "num": "11",
        "text": "Observability and monitoring — Google Cloud Documentation.",
        "href": "https://docs.cloud.google.com/docs/observability"
    },
    {
        "id": "ref12",
        "num": "12",
        "text": "Google Cloud Observability — Google Cloud.",
        "href": "https://cloud.google.com/products/observability"
    },
    {
        "id": "ref13",
        "num": "13",
        "text": "Alerting overview — Cloud Monitoring Documentation.",
        "href": "https://docs.cloud.google.com/monitoring/alerts"
    },
    {
        "id": "ref14",
        "num": "14",
        "text": "Behavior of metric-based alerting policies — Cloud Monitoring\n                            Documentation.",
        "href": "https://docs.cloud.google.com/monitoring/alerts/concepts-indepth"
    },
    {
        "id": "ref15",
        "num": "15",
        "text": "Manage alerting costs — Cloud Monitoring Documentation.",
        "href": "https://docs.cloud.google.com/monitoring/alerts/cost-control"
    },
    {
        "id": "ref16",
        "num": "16",
        "text": "Manage alerting policies — Cloud Monitoring Documentation.",
        "href": "https://docs.cloud.google.com/monitoring/alerts/manage-alerts"
    },
    {
        "id": "ref17",
        "num": "17",
        "text": "Create metric-threshold alerting policies — Cloud Monitoring\n                            Documentation.",
        "href": "https://docs.cloud.google.com/monitoring/alerts/using-alerting-ui"
    },
    {
        "id": "ref18",
        "num": "18",
        "text": "Cloud Profiler overview — Cloud Profiler Documentation.",
        "href": "https://docs.cloud.google.com/profiler/docs/about-profiler"
    },
    {
        "id": "ref19",
        "num": "19",
        "text": "Profiling concepts — Cloud Profiler Documentation.",
        "href": "https://docs.cloud.google.com/profiler/docs/concepts-profiling"
    },
    {
        "id": "ref20",
        "num": "20",
        "text": "PerfKit Benchmarker for evaluating cloud network performance — Google\n                            Cloud Blog.",
        "href": "https://cloud.google.com/blog/products/networking/perfkit-benchmarker-for-evaluating-cloud-network-performance"
    },
    {
        "id": "ref21",
        "num": "21",
        "text": "PerfKitBenchmarker (GitHub) — GoogleCloudPlatform.",
        "href": "https://github.com/GoogleCloudPlatform/PerfKitBenchmarker"
    },
    {
        "id": "ref22",
        "num": "22",
        "text": "Load testing best practices — Cloud Run Documentation.",
        "href": "https://docs.cloud.google.com/run/docs/about-load-testing"
    },
    {
        "id": "ref23",
        "num": "23",
        "text": "Guidelines for load testing backend services with Application Load\n                            Balancers — Cloud Load Balancing Documentation.",
        "href": "https://docs.cloud.google.com/load-balancing/docs/backend-service-load-testing"
    },
    {
        "id": "ref24",
        "num": "24",
        "text": "Overview of Cloud Deploy — Cloud Deploy Documentation.",
        "href": "https://docs.cloud.google.com/deploy/docs/overview"
    },
    {
        "id": "ref25",
        "num": "25",
        "text": "Use a deployment strategy — Cloud Deploy Documentation.",
        "href": "https://docs.cloud.google.com/deploy/docs/deployment-strategies"
    },
    {
        "id": "ref26",
        "num": "26",
        "text": "Use a canary deployment strategy — Cloud Deploy Documentation.",
        "href": "https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary"
    },
    {
        "id": "ref27",
        "num": "27",
        "text": "Promote your release and manage approvals — Cloud Deploy Documentation.",
        "href": "https://docs.cloud.google.com/deploy/docs/promote-release"
    },
    {
        "id": "ref28",
        "num": "28",
        "text": "Deploy manually — Cloud Deploy Documentation.",
        "href": "https://docs.cloud.google.com/deploy/docs/deploy-manually"
    },
    {
        "id": "ref29",
        "num": "29",
        "text": "Get support with Cloud Customer Care — Google Cloud Documentation.",
        "href": "https://docs.cloud.google.com/support/docs/overview"
    },
    {
        "id": "ref30",
        "num": "30",
        "text": "Standard Support — Google Cloud.",
        "href": "https://cloud.google.com/support/standard"
    },
    {
        "id": "ref31",
        "num": "31",
        "text": "Enhanced Support overview — Cloud Customer Care Documentation.",
        "href": "https://docs.cloud.google.com/support/docs/enhanced"
    },
    {
        "id": "ref32",
        "num": "32",
        "text": "Premium Support overview — Cloud Customer Care Documentation.",
        "href": "https://docs.cloud.google.com/support/docs/premium"
    },
    {
        "id": "ref33",
        "num": "33",
        "text": "Getting support — Google Cloud Documentation.",
        "href": "https://docs.cloud.google.com/docs/get-started/getting-support"
    },
    {
        "id": "ref34",
        "num": "34",
        "text": "What is Active Assist — Recommender Documentation.",
        "href": "https://docs.cloud.google.com/recommender/docs/whatis-activeassist"
    },
    {
        "id": "ref35",
        "num": "35",
        "text": "Active Assist dashboard overview — Recommender Documentation.",
        "href": "https://docs.cloud.google.com/recommender/docs/active-assist/dashboard-overview"
    },
    {
        "id": "ref36",
        "num": "36",
        "text": "Find recommendations with Active Assist — Recommender Documentation.",
        "href": "https://docs.cloud.google.com/recommender/docs/quickstart-active-assist"
    },
    {
        "id": "ref37",
        "num": "37",
        "text": "Patterns for using Active Assist at scale — Recommender Documentation.",
        "href": "https://docs.cloud.google.com/recommender/docs/patterns-for-using-active-assist-at-scale"
    },
    {
        "id": "ref38",
        "num": "38",
        "text": "Personalized Service Health overview — Google Cloud Documentation.",
        "href": "https://docs.cloud.google.com/service-health/docs/overview"
    },
    {
        "id": "ref39",
        "num": "39",
        "text": "Personalized Service Health concepts — Google Cloud Documentation.",
        "href": "https://docs.cloud.google.com/service-health/docs/concepts"
    },
    {
        "id": "ref40",
        "num": "40",
        "text": "Site Reliability Engineering — Embracing Risk — Google SRE Book.",
        "href": "https://sre.google/sre-book/embracing-risk/"
    },
    {
        "id": "ref41",
        "num": "41",
        "text": "SRE Workbook — Error Budget Policy — Google SRE Workbook.",
        "href": "https://sre.google/workbook/error-budget-policy/"
    },
    {
        "id": "ref42",
        "num": "42",
        "text": "SRE Workbook — Implementing SLOs — Google SRE Workbook.",
        "href": "https://sre.google/workbook/implementing-slos/"
    },
    {
        "id": "ref43",
        "num": "43",
        "text": "Site Reliability Engineering — Postmortem Culture — Google SRE Book.",
        "href": "https://sre.google/sre-book/postmortem-culture/"
    },
    {
        "id": "ref44",
        "num": "44",
        "text": "SRE Workbook — Postmortem Culture: Learning from Failure — Google SRE\n                            Workbook.",
        "href": "https://sre.google/workbook/postmortem-culture/"
    },
    {
        "id": "ref45",
        "num": "45",
        "text": "SRE Workbook — Incident Response — Google SRE Workbook.",
        "href": "https://sre.google/workbook/incident-response/"
    },
    {
        "id": "ref46",
        "num": "46",
        "text": "SRE incident management guide — Google SRE.",
        "href": "https://sre.google/resources/practices-and-processes/incident-management-guide/"
    },
    {
        "id": "ref47",
        "num": "47",
        "text": "Getting started with chaos engineering — Google Cloud Blog.",
        "href": "https://cloud.google.com/blog/products/devops-sre/getting-started-with-chaos-engineering"
    },
    {
        "id": "ref48",
        "num": "48",
        "text": "Using chaos engineering to test DR plans — Google Cloud Blog.",
        "href": "https://cloud.google.com/blog/products/devops-sre/using-chaos-engineering-to-test-dr-plans"
    },
    {
        "id": "ref49",
        "num": "49",
        "text": "Chaos testing Spanner improves reliability — Google Cloud Blog.",
        "href": "https://cloud.google.com/blog/products/databases/chaos-testing-spanner-improves-reiliability"
    },
    {
        "id": "ref50",
        "num": "50",
        "text": "chaos-engineering (GitHub) — GoogleCloudPlatform.",
        "href": "https://github.com/GoogleCloudPlatform/chaos-engineering"
    },
    {
        "id": "ref51",
        "num": "51",
        "text": "Google Cloud Platform Acceptable Use Policy — Google Cloud.",
        "href": "https://cloud.google.com/terms/aup"
    },
    {
        "id": "ref52",
        "num": "52",
        "text": "Cloud Security FAQ — Google Cloud Platform Console Help.",
        "href": "https://support.google.com/cloud/answer/6262505"
    }
];
