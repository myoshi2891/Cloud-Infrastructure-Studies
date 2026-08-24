/**
 * Google Cloud Professional Cloud Architect (PCA) Section 4 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'このガイドについて', label: 'このガイドについて', level: 2 },
    { id: '1-section-4の全体像', label: '1. Section 4の全体像', level: 2 },
    { id: '11-配点と出題範囲', label: '1.1 配点と出題範囲', level: 3 },
    { id: '12-well-architected-frameworkとの関係', label: '1.2 Well-Architected Frameworkとの関係', level: 3 },
    { id: '2-41-技術的プロセスの分析と定義', label: '2. 4.1 技術的プロセスの分析と定義', level: 2 },
    { id: '21-ソフトウェア開発ライフサイクルsdlc', label: '2.1 ソフトウェア開発ライフサイクル（SDLC）', level: 3 },
    { id: '22-継続的インテグレーション継続的デリバリーcicd', label: '2.2 継続的インテグレーション/継続的デリバリー（CI/CD）', level: 3 },
    {
        id: '23-トラブルシューティングと根本原因分析rcaのベストプラクティス',
        label: '2.3 トラブルシューティングと根本原因分析（RCA）のベストプラクティス',
        level: 3,
    },
    { id: '24-ソフトウェアとインフラのテストと検証', label: '2.4 ソフトウェアとインフラのテストと検証', level: 3 },
    { id: '25-サービスカタログとプロビジョニング', label: '2.5 サービスカタログとプロビジョニング', level: 3 },
    { id: '26-ディザスタリカバリdr', label: '2.6 ディザスタリカバリ（DR）', level: 3 },
    { id: '3-42-ビジネスプロセスの分析と定義', label: '3. 4.2 ビジネスプロセスの分析と定義', level: 2 },
    {
        id: '31-ステークホルダー管理影響力とファシリテーション',
        label: '3.1 ステークホルダー管理（影響力とファシリテーション）',
        level: 3,
    },
    { id: '32-チェンジマネジメント', label: '3.2 チェンジマネジメント', level: 3 },
    { id: '33-チームアセスメントとスキルレディネス', label: '3.3 チームアセスメントとスキルレディネス', level: 3 },
    { id: '34-意思決定プロセス', label: '3.4 意思決定プロセス', level: 3 },
    { id: '35-カスタマーサクセスマネジメント', label: '3.5 カスタマーサクセスマネジメント', level: 3 },
    {
        id: '36-コスト最適化リソース最適化capexopex',
        label: '3.6 コスト最適化・リソース最適化（CapEx／OpEx）',
        level: 3,
    },
    {
        id: '37-事業継続性ビジネスコンティニュイティ',
        label: '3.7 事業継続性（ビジネスコンティニュイティ）',
        level: 3,
    },
    { id: '4-ケーススタディへの適用', label: '4. ケーススタディへの適用', level: 2 },
    { id: '5-学習チェックリスト', label: '5. 学習チェックリスト', level: 2 },
    { id: '6-まとめ', label: '6. まとめ', level: 2 },
    { id: '7-参考文献', label: '7. 参考文献', level: 2 },
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
    | 'diag-15';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart LR
    S1["Section 1<br/>設計と計画<br/>(約25%)"] --> S4a["4.1 技術的プロセス<br/>SDLC・CI/CD・DR"]
    S2["Section 2<br/>管理とプロビジョニング<br/>(約17.5%)"] --> S4a
    S3["Section 3<br/>セキュリティと<br/>コンプライアンス<br/>(約17.5%)"] --> S4a
    S4a --> S5["Section 5<br/>実装の管理<br/>(約12.5%)"]
    S4b["4.2 ビジネスプロセス<br/>ステークホルダー・変更管理<br/>・コスト最適化"] --> S5
    S5 --> S6["Section 6<br/>運用の卓越性<br/>(約12.5%)"]
    S6 -. 継続的改善のフィードバック .-> S1

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class S4a highlightFill
    class S4b highlightFill`,

    'diag-2': `flowchart LR
    A["要件定義<br/>Requirements"] --> B["設計<br/>Design"]
    B --> C["開発<br/>Development"]
    C --> D["テスト<br/>Testing"]
    D --> E["デプロイ<br/>Deployment"]
    E --> F["運用・保守<br/>Maintenance"]
    F -. フィードバック .-> A

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill
    class B highlightFill
    class C highlightFill
    class D highlightFill
    class E highlightFill
    class F highlightFill`,

    'diag-3': `flowchart LR
    subgraph CI["継続的インテグレーション (CI)"]
        direction LR
        SRC["ソースリポジトリ<br/>(GitHub等)"] -->|コミット/PR| TRG["Cloud Build<br/>トリガー"]
        TRG --> BUILD["ビルド・単体テスト<br/>脆弱性スキャン"]
        BUILD --> AR["Artifact Registry<br/>(コンテナイメージ保存)"]
    end
    subgraph CD["継続的デリバリー (CD)"]
        direction LR
        AR --> REL["Cloud Deploy<br/>リリース作成"]
        REL --> STG["ステージング環境<br/>へデプロイ"]
        STG --> GATE{"承認ゲート<br/>(手動/自動)"}
        GATE -->|承認| PROD["本番環境へ<br/>プロモート"]
        GATE -->|却下| RB["ロールバック"]
    end

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class TRG highlightFill
    class REL highlightFill
    class PROD highlightFill`,

    'diag-4': `flowchart LR
    P0["初回デプロイ<br/>(既存バージョンなし→安定フェーズへ)"] --> P10["canary-10%"]
    P10 -->|監視OK: advance| P25["canary-25%"]
    P25 -->|監視OK: advance| P50["canary-50%"]
    P50 -->|監視OK: advance| P75["canary-75%"]
    P75 -->|監視OK: advance| STABLE["stable (100%)"]
    P10 -.異常検知時.-> ROLLBACK["ロールバック"]
    P25 -.異常検知時.-> ROLLBACK
    P50 -.異常検知時.-> ROLLBACK
    P75 -.異常検知時.-> ROLLBACK

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class STABLE highlightFill
    class ROLLBACK dangerFill`,

    'diag-5': `flowchart TD
    A["インシデント検知<br/>(Cloud Monitoringアラート)"] --> B["トリアージ<br/>影響範囲の特定"]
    B --> C["Error Reportingで<br/>スタックトレース確認"]
    C --> D["Cloud Loggingで<br/>前後のログ相関調査"]
    D --> E["Cloud Traceで<br/>分散トレーシング分析"]
    E --> F{"再現可能か？"}
    F -->|可能| G["テスト環境で再現・検証"]
    F -->|困難| H["追加の計装(instrumentation)を実施"]
    G --> I["根本原因の特定"]
    H --> I
    I --> J["是正措置の実施<br/>(修正/設定変更/ロールバック)"]
    J --> K["ブレームレスな<br/>ポストモーテム作成"]
    K --> L["再発防止策の実装と共有"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill
    class I highlightFill
    class K highlightFill`,

    'diag-6': `flowchart TD
    T1["静的解析<br/>(構文・構造チェック: リンター/コンパイラ)"] --> T2["単体テスト<br/>(モジュール単位で個別に検証)"]
    T2 --> T3["統合テスト<br/>(複数モジュールの連携を検証)"]
    T3 --> T4["E2Eテスト<br/>(本番同等環境でアーキテクチャ全体を検証)"]
    T4 --> T5["負荷テスト/カナリア検証<br/>(実トラフィック規模での挙動確認)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class T1 highlightFill
    class T5 highlightFill`,

    'diag-7': `flowchart TD
    ADMIN["クラウド管理者<br/>(Admin)"] -->|カタログ作成| CAT["カタログ<br/>(例: 'Dev Tools')"]
    ADMIN -->|ソリューション登録<br/>Terraformテンプレート/参照リンク| SOL["ソリューション<br/>(承認済みIaCテンプレート)"]
    SOL --> CAT
    CAT -->|組織/フォルダ/プロジェクト単位で共有| SHARE["共有先スコープ"]
    SHARE --> USER["組織内ユーザー<br/>(開発者)"]
    USER -->|カタログから検索・選択| DEPLOY["セルフサービスでデプロイ"]
    DEPLOY --> GUARD["IAM/組織ポリシーによる<br/>ガードレールチェック"]
    GUARD --> RES["リソースのプロビジョニング"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class ADMIN highlightFill
    class RES highlightFill`,

    'diag-8': `flowchart LR
    COLD["Cold<br/>バックアップと復元"] --> WARM["Warm<br/>縮小版スタンバイ"]
    WARM --> HOT["Hot<br/>マルチサイト"]
    HOT --> AA["Active-Active<br/>マルチリージョン"]

    COLD -.->|RTO/RPO 大 コスト 低| COLD
    AA -.->|RTO/RPO 最小 コスト 最高| AA

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class COLD highlightFill
    class AA highlightFill`,

    'diag-9': `flowchart TD
    A["ビジネスインパクト分析<br/>(BIA)"] --> B["RTO/RPOの定義<br/>(ワークロードごと)"]
    B --> C["DRパターンの選定<br/>(Cold/Warm/Hot/Active-Active)"]
    C --> D["runbook（復旧手順書）の作成"]
    D --> E["DR演習・復旧テストの実施"]
    E --> F{"目標RTO/RPOを<br/>達成できたか？"}
    F -->|No| G["設計・runbookの見直し"]
    G --> C
    F -->|Yes| H["本番運用"]
    H --> I["定期的な再テストと<br/>継続的改善"]
    I --> E

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill
    class H highlightFill`,

    'diag-10': `flowchart TD
    A["ステークホルダーの特定"] --> B["関心度×影響力で分類"]
    B --> C["エンゲージメント計画の策定<br/>(コミュニケーション頻度・手段)"]
    C --> D["定期的なコミュニケーション<br/>(進捗報告/デモ/レビュー)"]
    D --> E["フィードバックの収集と反映"]
    E --> F["合意形成・意思決定の促進<br/>(ファシリテーション)"]
    F --> G["継続的なモニタリングと<br/>関係の見直し"]
    G -.-> B

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill
    class F highlightFill`,

    'diag-11': `flowchart TD
    A["変更要求(RFC)の起票"] --> B["影響評価<br/>(依存関係・リスク分析)"]
    B --> C{"承認プロセス<br/>(CABまたは自動化ルール)"}
    C -->|承認| D["IaC(Terraform等)で<br/>変更を宣言的に記述"]
    C -->|却下/差し戻し| A
    D --> E["バージョン管理(Git)へコミット"]
    E --> F["CI/CDパイプラインで<br/>ステージング検証"]
    F --> G["段階的デプロイ<br/>(カナリア等)"]
    G --> H["変更ログの記録"]
    H --> I{"問題発生？"}
    I -->|Yes| J["迅速なロールバック"]
    I -->|No| K["変更完了"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class A highlightFill
    class K highlightFill
    class J dangerFill`,

    'diag-12': `flowchart LR
    T["Tactical<br/>個別最適・場当たり的"] --> S["Strategic<br/>将来を見据えた広い視野"]
    S --> TR["Transformational<br/>クラウド運用が円滑に機能"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class T warnFill
    class S highlightFill
    class TR successFill`,

    'diag-13': `flowchart TD
    A["課題・意思決定事項の定義"] --> B["Driver: 選択肢の洗い出し<br/>と情報整理"]
    B --> C["Contributors: 専門的な<br/>インプット・意見の収集"]
    C --> D["トレードオフの評価<br/>(コスト・リスク・スピード)"]
    D --> E["Approver: 最終決定"]
    E --> F["Informed: 決定内容の<br/>共有と周知"]
    F --> G["実行とフォローアップ"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill
    class E highlightFill`,

    'diag-14': `flowchart LR
    A["可視化<br/>(ラベル付け・コストレポート)"] --> B["分析<br/>(異常検知・予測・アトリビューション)"]
    B --> C["最適化<br/>(適正サイズ化・コミット利用割引・<br/>自動スケーリング)"]
    C --> D["説明責任の醸成<br/>(FinOpsカルチャー)"]
    D --> E["継続的なモニタリング"]
    E -.-> A

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill
    class C highlightFill
    class D highlightFill`,

    'diag-15': `flowchart TD
    BCP["事業継続計画 (BCP)"]
    BCP --> DR["ディザスタリカバリ (DR)<br/>ITシステム・データの復旧"]
    BCP --> CRISIS["クライシスマネジメント<br/>意思決定体制・指揮系統"]
    BCP --> COMM["コミュニケーション計画<br/>顧客・従業員・規制当局への通知"]
    BCP --> ALT["代替拠点・要員計画<br/>拠点/人員が使用不能な場合の対応"]
    DR --> RTO["RTO/RPOの定義"]
    DR --> RUNBOOK["runbookと復旧演習"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class BCP highlightFill
    class DR highlightFill`,
};

export interface ReferenceItem {
    id: string;
    num: number;
    title: string;
    url: string;
}

export const REFERENCES: ReferenceItem[] = [
    {
        id: 'ref1',
        num: 1,
        title: 'Professional Cloud Architect Certification | Learn | Google Cloud.',
        url: 'https://cloud.google.com/learn/certification/cloud-architect',
    },
    {
        id: 'ref2',
        num: 2,
        title: 'Professional Cloud Architect Certification exam guide (PDF).',
        url: 'https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf',
    },
    {
        id: 'ref3',
        num: 3,
        title: 'Well-Architected Framework: Operational excellence pillar | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/framework/operational-excellence',
    },
    {
        id: 'ref4',
        num: 4,
        title: 'Well-Architected Framework: Reliability pillar | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/framework/reliability',
    },
    {
        id: 'ref5',
        num: 5,
        title: 'Well-Architected Framework: Cost optimization pillar | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/framework/cost-optimization',
    },
    {
        id: 'ref6',
        num: 6,
        title: 'Cloud Build serverless CI/CD platform | Google Cloud.',
        url: 'https://cloud.google.com/build',
    },
    {
        id: 'ref7',
        num: 7,
        title: 'Use a deployment strategy | Cloud Deploy | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/deploy/docs/deployment-strategies',
    },
    {
        id: 'ref8',
        num: 8,
        title: 'Automate and manage change | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/framework/operational-excellence/automate-and-manage-change',
    },
    {
        id: 'ref9',
        num: 9,
        title: 'Best practices for testing | Terraform on Google Cloud | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/docs/terraform/best-practices/testing',
    },
    {
        id: 'ref10',
        num: 10,
        title: 'Use a canary deployment strategy | Cloud Deploy | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary',
    },
    {
        id: 'ref11',
        num: 11,
        title: 'Canary Deployments to Cloud Run | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/cloud-run',
    },
    {
        id: 'ref12',
        num: 12,
        title: 'Use Four Keys metrics like change failure rate to measure your DevOps performance | Google Cloud Blog.',
        url: 'https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance',
    },
    {
        id: 'ref13',
        num: 13,
        title: 'dora-team/fourkeys: Platform for monitoring the four key software delivery metrics | GitHub.',
        url: 'https://github.com/dora-team/fourkeys',
    },
    {
        id: 'ref14',
        num: 14,
        title: 'Tutorial: Local troubleshooting of a Cloud Run service | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/run/docs/tutorials/local-troubleshooting',
    },
    {
        id: 'ref15',
        num: 15,
        title: 'Error Reporting documentation | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/error-reporting/docs',
    },
    {
        id: 'ref16',
        num: 16,
        title: 'Troubleshoot Logging | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/logging/docs/troubleshooting',
    },
    {
        id: 'ref17',
        num: 17,
        title: 'Error Reporting overview: Grouping errors | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/error-reporting/docs/grouping-errors',
    },
    {
        id: 'ref18',
        num: 18,
        title: 'Using Cloud Trace and Cloud Logging for root cause analysis | Google Cloud Blog.',
        url: 'https://cloud.google.com/blog/products/devops-sre/using-cloud-trace-and-cloud-logging-for-root-cause-analysis',
    },
    {
        id: 'ref19',
        num: 19,
        title: 'Postmortem Culture: Learning from Failure | Site Reliability Engineering, Google.',
        url: 'https://sre.google/sre-book/postmortem-culture/',
    },
    {
        id: 'ref20',
        num: 20,
        title: 'Postmortem Practices for Incident Management | SRE Workbook, Google.',
        url: 'https://sre.google/workbook/postmortem-culture/',
    },
    {
        id: 'ref21',
        num: 21,
        title: 'Load testing best practices | Cloud Run | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/run/docs/about-load-testing',
    },
    {
        id: 'ref22',
        num: 22,
        title: 'Overview of Service Catalog | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/service-catalog/docs/overview',
    },
    {
        id: 'ref23',
        num: 23,
        title: 'Concepts | Service Catalog | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/service-catalog/docs/concepts',
    },
    {
        id: 'ref24',
        num: 24,
        title: 'Disaster recovery planning guide | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide',
    },
    {
        id: 'ref25',
        num: 25,
        title: 'Business continuity planning and disaster recovery | Apigee | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/apigee/docs/api-platform/reference/business-continuity',
    },
    {
        id: 'ref26',
        num: 26,
        title: 'Architecting disaster recovery for cloud infrastructure outages | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/disaster-recovery',
    },
    {
        id: 'ref27',
        num: 27,
        title: 'Business continuity with CI/CD on Google Cloud | Cloud Architecture Center | Google Cloud Documentation.',
        url: 'https://docs.cloud.google.com/architecture/business-continuity-with-cicd-on-google-cloud',
    },
    {
        id: 'ref28',
        num: 28,
        title: 'Managing Change in the Cloud: Helping your people thrive in the cloud (whitepaper PDF).',
        url: 'https://services.google.com/fh/files/misc/managing_change_in_the_cloud.pdf',
    },
    {
        id: 'ref29',
        num: 29,
        title: 'The Google Cloud Adoption Framework (whitepaper PDF).',
        url: 'https://services.google.com/fh/files/misc/google_cloud_adoption_framework_whitepaper.pdf',
    },
    {
        id: 'ref30',
        num: 30,
        title: 'Delivering Ongoing Customer Value with a Deliberate Customer Success Strategy (IDC whitepaper, distributed via Google Cloud).',
        url: 'https://services.google.com/fh/files/misc/google_cloud_delivering_ongoing_customer_value_with_a_deliberate_customer_success_strategy_idc.pdf',
    },
    {
        id: 'ref31',
        num: 31,
        title: "Creating the industry's best customer success teams | Google Cloud Blog.",
        url: 'https://cloud.google.com/blog/topics/customers/creating-the-industrys-best-customer-success-teams',
    },
    {
        id: 'ref32',
        num: 32,
        title: 'Principles of cloud cost optimization | Google Cloud Blog.',
        url: 'https://cloud.google.com/blog/topics/cost-management/principles-of-cloud-cost-optimization',
    },
];

export const CHECKLIST_ITEMS = [
    { id: 'chk1', text: 'SDLCの主要フェーズ（要件定義・設計・開発・テスト・デプロイ・保守）を説明できる' },
    { id: 'chk2', text: 'Cloud BuildとCloud Deployの役割の違いを説明できる' },
    { id: 'chk3', text: '標準デプロイ・カナリアデプロイ・Blue-Greenデプロイの違いとそれぞれのリスク特性を説明できる' },
    { id: 'chk4', text: 'DORAのFour Keys（デプロイ頻度・リードタイム・変更失敗率・復元時間）を列挙できる' },
    { id: 'chk5', text: 'Error Reporting・Cloud Logging・Cloud Traceを組み合わせた根本原因分析（RCA）の流れを説明できる' },
    { id: 'chk6', text: 'ブレームレスポストモーテム文化の目的を説明できる' },
    { id: 'chk7', text: 'テストピラミッド（静的解析→単体→統合→E2E→負荷テスト）の段階を説明できる' },
    { id: 'chk8', text: 'Service Catalogの目的（発見可能性とガバナンス）を説明できる' },
    { id: 'chk9', text: 'RTOとRPOの定義の違いを説明できる' },
    { id: 'chk10', text: 'Cold/Warm/Hot/Active-ActiveのDRパターンをコストとRTO/RPOの観点で比較できる' },
    { id: 'chk11', text: 'DRがBCPのサブセットであるという関係性を説明できる' },
    { id: 'chk12', text: 'ステークホルダーを関心度×影響力でマッピングする方法を説明できる' },
    { id: 'chk13', text: 'IaCとバージョン管理が技術的な変更管理にどう寄与するかを説明できる' },
    { id: 'chk14', text: 'Google Cloud Adoption Frameworkの3段階の成熟度（Tactical/Strategic/Transformational）を説明できる' },
    { id: 'chk15', text: 'RACIとDACIの違いを説明できる' },
    { id: 'chk16', text: 'カスタマーサクセスマネジメントの主要な構成要素を説明できる' },
    { id: 'chk17', text: 'CapExとOpExの違いと、クラウド移行がもたらすコストモデルの転換を説明できる' },
    { id: 'chk18', text: 'コスト最適化における「可視化→分析→最適化→説明責任の醸成」のサイクルを説明できる' },
    { id: 'chk19', text: 'BCPとDRの関係性、および事業継続性計画に含めるべき要素を説明できる' },
    { id: 'chk20', text: '4つの公式ケーススタディ（Altostrat Media / Cymbal Retail / EHR Healthcare / KnightMotives Automotive）の存在を把握している' },
];
