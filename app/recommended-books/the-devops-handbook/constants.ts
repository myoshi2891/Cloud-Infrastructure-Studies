/**
 * The DevOps Handbook ガイド用の定数定義
 * Mermaidダイアグラム、ナビゲーション項目、統計情報など
 */

export type DiagramId =
    | 'bookStructure'
    | 'threeWays'
    | 'valueStreamSelection'
    | 'visualizeWork'
    | 'conwaysLaw'
    | 'deploymentPipeline'
    | 'testPyramid'
    | 'trunkBasedDevelopment'
    | 'canaryRelease'
    | 'architectureForLowRiskRelease'
    | 'telemetrySources'
    | 'featureFlagRollout'
    | 'hypothesisDrivenDev'
    | 'peerReviewVsCab'
    | 'learningCycle'
    | 'chaosEngineering'
    | 'shiftLeftSecurity'
    | 'doraPerformers'
    | 'roadmapSteps';

export interface NavItem {
    id: string;
    label: string;
    isLvl3?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: '1-本書の位置づけと全体像', label: '1. 本書の位置づけと全体像' },
    { id: '11-なぜこの本を読むべきか', label: '1.1 なぜこの本を読むべきか', isLvl3: true },
    { id: '12-初版と第2版の違い', label: '1.2 初版と第2版の違い', isLvl3: true },
    { id: '13-全体構成6パート23章', label: '1.3 全体構成（6パート・23章）', isLvl3: true },
    {
        id: '2-第1部-3つの道the-three-ways-devopsの原理原則',
        label: '2. 第1部: 3つの道（The Three Ways）— DevOpsの原理原則',
    },
    {
        id: '21-第一の道the-first-way-フローの原則第2章',
        label: '2.1 第一の道（The First Way）: フローの原則（第2章）',
        isLvl3: true,
    },
    {
        id: '22-第二の道the-second-way-フィードバックの原則第3章',
        label: '2.2 第二の道（The Second Way）: フィードバックの原則（第3章）',
        isLvl3: true,
    },
    {
        id: '23-第三の道the-third-way-継続的な学習と実験の原則第4章',
        label: '2.3 第三の道（The Third Way）: 継続的な学習と実験の原則（第4章）',
        isLvl3: true,
    },
    { id: '3-第2部-どこから始めるか', label: '3. 第2部: どこから始めるか' },
    { id: '31-バリューストリームの選定第5章', label: '3.1 バリューストリームの選定（第5章）', isLvl3: true },
    { id: '32-作業を理解し可視化する第6章', label: '3.2 作業を理解し可視化する（第6章）', isLvl3: true },
    {
        id: '33-コンウェイの法則を意識した組織とアーキテクチャの設計第7章',
        label: '3.3 コンウェイの法則を意識した組織とアーキテクチャの設計（第7章）',
        isLvl3: true,
    },
    { id: '34-運用作業を開発の日常業務に統合する第8章', label: '3.4 運用作業を開発の日常業務に統合する（第8章）', isLvl3: true },
    { id: '4-第3部-第一の道の技術的実践--フロー', label: '4. 第3部: 第一の道の技術的実践 — フロー' },
    { id: '41-デプロイメントパイプラインの基盤を作る第9章', label: '4.1 デプロイメントパイプラインの基盤を作る（第9章）', isLvl3: true },
    { id: '42-高速で信頼できる自動テストを実現する第10章', label: '4.2 高速で信頼できる自動テストを実現する（第10章）', isLvl3: true },
    { id: '43-継続的インテグレーションを実践する第11章', label: '4.3 継続的インテグレーションを実践する（第11章）', isLvl3: true },
    { id: '44-低リスクなリリースを自動化する第12章', label: '4.4 低リスクなリリースを自動化する（第12章）', isLvl3: true },
    { id: '45-低リスクリリースのためのアーキテクチャ第13章', label: '4.5 低リスクリリースのためのアーキテクチャ（第13章）', isLvl3: true },
    { id: '5-第4部-第二の道の技術的実践--フィードバック', label: '5. 第4部: 第二の道の技術的実践 — フィードバック' },
    { id: '51-問題を見て解決するためのテレメトリを作る第14章', label: '5.1 問題を見て解決するためのテレメトリを作る（第14章）', isLvl3: true },
    { id: '52-テレメトリを分析し問題を予見する第15章', label: '5.2 テレメトリを分析し問題を予見する（第15章）', isLvl3: true },
    {
        id: '53-開発と運用が安全にデプロイできるようフィードバックを実現する第16章',
        label: '5.3 開発と運用が安全にデプロイできるようフィードバックを実現する（第16章）',
        isLvl3: true,
    },
    { id: '54-仮説駆動開発とabテストを日常業務に統合する第17章', label: '5.4 仮説駆動開発とA/Bテストを日常業務に統合する（第17章）', isLvl3: true },
    {
        id: '55-現在の作業の品質を高めるレビューと調整プロセスを作る第18章',
        label: '5.5 現在の作業の品質を高めるレビューと調整プロセスを作る（第18章）',
        isLvl3: true,
    },
    { id: '6-第5部-第三の道の技術的実践--継続的学習と実験', label: '6. 第5部: 第三の道の技術的実践 — 継続的学習と実験' },
    {
        id: '61-日常業務に学習を組み込む第19章-ブレームレスポストモーテム',
        label: '6.1 日常業務に学習を組み込む（第19章）: ブレームレスポストモーテム',
        isLvl3: true,
    },
    { id: '62-カオスエンジニアリング-意図的に障害を起こして学ぶ', label: '6.2 カオスエンジニアリング: 意図的に障害を起こして学ぶ', isLvl3: true },
    { id: '63-ローカルな発見をグローバルな改善に変換する第20章', label: '6.3 ローカルな発見をグローバルな改善に変換する（第20章）', isLvl3: true },
    { id: '64-組織的学習と改善のための時間を確保する第21章', label: '6.4 組織的学習と改善のための時間を確保する（第21章）', isLvl3: true },
    { id: '7-第6部-情報セキュリティ変更管理コンプライアンスの統合', label: '7. 第6部: 情報セキュリティ・変更管理・コンプライアンスの統合' },
    { id: '71-情報セキュリティは全員の日常業務第22章', label: '7.1 情報セキュリティは全員の日常業務（第22章）', isLvl3: true },
    { id: '72-デプロイメントパイプラインを保護する第23章', label: '7.2 デプロイメントパイプラインを保護する（第23章）', isLvl3: true },
    {
        id: '8-2026年の視点-ai時代のdoraとプラットフォームエンジニアリング',
        label: '8. 2026年の視点: AI時代のDORAとプラットフォームエンジニアリング',
    },
    { id: '81-dora調査の変遷とai時代の実証データ', label: '8.1 DORA調査の変遷とAI時代の実証データ', isLvl3: true },
    { id: '82-プラットフォームエンジニアリングの台頭', label: '8.2 プラットフォームエンジニアリングの台頭', isLvl3: true },
    { id: '9-初学者向け8ステップ導入ロードマップ', label: '9. 初学者向け8ステップ導入ロードマップ' },
    { id: '10-よくあるアンチパターン', label: '10. よくあるアンチパターン' },
    { id: '11-実践チェックリスト', label: '11. 実践チェックリスト' },
    { id: '12-用語集', label: '12. 用語集' },
    { id: '13-参考文献', label: '13. 参考文献' },
] as const;

export const DIAGRAMS: Record<DiagramId, string> = {
    bookStructure: `flowchart TB
    P1["第1部<br/>3つの道<br/>(Ch.1-4)"]
    P2["第2部<br/>どこから始めるか<br/>(Ch.5-8)"]
    P3["第3部<br/>フローの技術的実践<br/>(Ch.9-13)"]
    P4["第4部<br/>フィードバックの技術的実践<br/>(Ch.14-18)"]
    P5["第5部<br/>継続的学習と実験の技術的実践<br/>(Ch.19-21)"]
    P6["第6部<br/>セキュリティ・変更管理・<br/>コンプライアンス統合<br/>(Ch.22-23)"]

    P1 --> P2 --> P3 --> P4 --> P5 --> P6`,

    threeWays: `flowchart LR
    subgraph flow["第一の道: フローの原則（左から右への価値の流れ）"]
        direction LR
        BIZ[ビジネス要求] --> DEV[開発]
        DEV --> QA[QA/テスト]
        QA --> OPS[運用]
        OPS --> CUST[顧客への価値提供]
    end

    CUST -.->|第二の道: 高速なフィードバック| DEV
    OPS -.->|第二の道: テレメトリで即座に検知| DEV
    NOTE["第三の道: 継続的な学習と実験の文化<br/>失敗から学び、知識を組織全体に広げる"]
    NOTE -.->|組織全体を支える文化| DEV`,

    valueStreamSelection: `flowchart TB
    START["候補となる複数の<br/>バリューストリームを洗い出す"]
    Q1{"支援的なマネージャーと<br/>チームが存在するか"}
    Q2{"ビジネス価値が明確で<br/>成果を可視化しやすいか"}
    Q3{"技術的に過度に複雑<br/>すぎないか"}
    PICK["パイロットとなる<br/>バリューストリームを選定"]
    EXPAND["成功パターンを他の<br/>バリューストリームへ横展開"]

    START --> Q1
    Q1 -->|Yes| Q2
    Q1 -->|No: 抵抗が強い| START
    Q2 -->|Yes| Q3
    Q2 -->|No: 価値が不明瞭| START
    Q3 -->|Yes| PICK
    Q3 -->|No: 複雑すぎる| START
    PICK --> EXPAND`,

    visualizeWork: `flowchart LR
    subgraph before["Before: 作業が不可視な状態"]
        direction TB
        B1[未整理のチケット]
        B2[口頭やチャットでの依頼]
        B3[個人のTODOリストに散在]
    end
    subgraph after["After: カンバンボードで可視化"]
        direction TB
        A1[Backlog]
        A2["In Progress<br/>(WIP制限あり)"]
        A3[Review]
        A4[Done]
        A1 --> A2 --> A3 --> A4
    end`,

    conwaysLaw: `flowchart LR
    subgraph conway["コンウェイの法則（順方向・多くの組織で起きていること）"]
        direction TB
        ORG1["サイロ化した組織構造<br/>(Dev/QA/Ops/DBAが別部門)"]
        SYS1["密結合な<br/>モノリシックアーキテクチャ"]
        ORG1 -->|組織構造がそのまま<br/>システム設計に反映される| SYS1
    end

    subgraph inverse["逆コンウェイ作戦（推奨アプローチ）"]
        direction TB
        SYS2["目指すべき疎結合<br/>アーキテクチャ"]
        ORG2["ストリームアラインドな<br/>職能横断チーム"]
        SYS2 -->|理想のアーキテクチャに<br/>合わせて組織を先に設計する| ORG2
    end`,

    deploymentPipeline: `flowchart LR
    REPO[("単一の信頼できる<br/>バージョン管理<br/>リポジトリ")]
    COMMIT[コード<br/>コミット]
    BUILD[ビルド]
    UNIT[ユニット<br/>テスト]
    PKG["アーティファクト<br/>作成・保存<br/>(1回だけビルド)"]
    AUTOTEST[自動受け入れ<br/>テスト環境]
    UAT[ステージング/<br/>UAT環境]
    PROD[本番環境へ<br/>デプロイ]

    REPO --> COMMIT --> BUILD --> UNIT --> PKG --> AUTOTEST --> UAT --> PROD
    PKG -.->|同一のアーティファクトを<br/>全環境で使い回す| PROD

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class REPO highlightFill`,

    testPyramid: `flowchart TB
    subgraph layer1["E2E/UIテスト（少数・低速・壊れやすい）"]
        E1[主要なユーザーシナリオのみを対象]
    end
    subgraph layer2["インテグレーションテスト（中程度の数）"]
        I1[サービス間の連携]
        I2[DB/外部APIとの結合]
    end
    subgraph layer3["ユニットテスト（多数・高速・安定）"]
        U1[関数/クラス単位の検証]
        U2[ビジネスロジックの検証]
        U3[エッジケースの網羅]
    end
    layer3 -->|土台として積み上げる| layer2
    layer2 -->|さらにその上に| layer1`,

    trunkBasedDevelopment: `flowchart LR
    subgraph longlived["アンチパターン: 長命なフィーチャーブランチ"]
        direction TB
        LB1[main]
        LB2["feature/A<br/>(2週間分の差分)"]
        LB3["feature/B<br/>(3週間分の差分)"]
        LB2 -->|マージ時に競合| LB1
        LB3 -->|マージ時にさらに深刻な競合| LB1
    end

    subgraph trunk["ベストプラクティス: トランクベース開発"]
        direction TB
        T1[main/trunk]
        T2["小さな変更を<br/>1日に複数回コミット"]
        T3["フィーチャーフラグで<br/>未完成機能を隠す"]
        T2 --> T1
        T3 --> T1
    end`,

    canaryRelease: `flowchart LR
    DEPLOY["新バージョンを<br/>本番へデプロイ"] --> CANARY["トラフィックの<br/>一部(例: 5%)を<br/>カナリアへ振り分け"]
    CANARY --> MONITOR{"テレメトリで<br/>異常を検知?"}
    MONITOR -->|異常なし| INCREASE["段階的にトラフィックを<br/>拡大 (25%→50%→100%)"]
    MONITOR -->|異常あり| ROLLBACK[自動ロールバック]
    INCREASE --> FULL["全トラフィックへ<br/>展開完了"]
    ROLLBACK --> FIX[原因調査・修正]
    FIX --> DEPLOY

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class ROLLBACK dangerFill
    class FULL successFill`,

    architectureForLowRiskRelease: `flowchart LR
    subgraph mono["リリースリスクが高いアーキテクチャ"]
        direction TB
        M1["単一の巨大な<br/>モノリシックアプリケーション"]
        M2["全機能が密結合<br/>(1箇所の変更が全体に影響)"]
        M1 --> M2
    end
    subgraph loose["低リスクリリースのためのアーキテクチャ"]
        direction TB
        L1["疎結合な<br/>サービス/API群"]
        L2[サービス単位で<br/>独立してデプロイ可能]
        L3[明確に定義された<br/>インターフェース]
        L1 --> L2
        L1 --> L3
    end`,

    telemetrySources: `flowchart TB
    subgraph sources["テレメトリの発生源"]
        direction LR
        S1["アプリケーション<br/>ログ/メトリクス"]
        S2["インフラ<br/>メトリクス"]
        S3["ビジネス<br/>メトリクス"]
    end
    sources --> AGG["集約・保存<br/>(テレメトリプラットフォーム)"]
    AGG --> DASH[ダッシュボード]
    AGG --> ALERT[アラート]
    DASH --> HUMAN["開発者・運用者が<br/>常時参照"]
    ALERT --> HUMAN`,

    featureFlagRollout: `flowchart LR
    CODE["コードは常に<br/>trunkへマージ"] --> FLAGOFF["機能は<br/>フィーチャーフラグでOFF"]
    FLAGOFF --> DEPLOYALL["全環境へ<br/>安全にデプロイ"]
    DEPLOYALL --> FLAGON[限定ユーザーのみ<br/>フラグON]
    FLAGON --> WATCH{"問題ないか<br/>テレメトリで確認"}
    WATCH -->|OK| ROLLOUT[段階的に対象を拡大]
    WATCH -->|NG| FLAGOFF2["フラグを即座にOFF<br/>(コードの再デプロイは不要)"]
    ROLLOUT --> ALLUSERS[全ユーザーへ展開]`,

    hypothesisDrivenDev: `flowchart LR
    HYP["仮説を立てる<br/>『この機能はXを改善する』"] --> BUILD2["最小限の実装<br/>(MVP/実験)"]
    BUILD2 --> MEASURE[A/Bテストで計測]
    MEASURE --> LEARN[結果を分析し学習]
    LEARN -->|仮説を検証・棄却して次へ| HYP`,

    peerReviewVsCab: `flowchart LR
    subgraph cab["アンチパターン: 重量級の変更諮問委員会(CAB)"]
        direction TB
        C1[変更申請書を提出]
        C2[週次CAB会議を待つ]
        C3[複数階層の承認]
        C1 --> C2 --> C3
    end
    subgraph peer["ベストプラクティス: 軽量なピアレビュー"]
        direction TB
        P1[プルリクエストを作成]
        P2[自動テストが即座に実行]
        P3["チームメンバーが<br/>数分〜数時間でレビュー"]
        P1 --> P2 --> P3
    end`,

    learningCycle: `flowchart LR
    INCIDENT["インシデント/<br/>ニアミス発生"] --> PM["ブレームレス<br/>ポストモーテム実施"]
    PM --> LOCAL["チーム内の<br/>ローカルな改善"]
    LOCAL --> SHARE["社内Wiki/チャット/<br/>技術カンファレンスで共有"]
    SHARE --> GLOBAL["組織全体への<br/>グローバルな改善へ変換"]
    GLOBAL --> STANDARD["標準ライブラリ/<br/>チェックリストへ反映"]
    STANDARD --> TIME["改善のための時間を<br/>組織的に確保"]
    TIME -.-&gt;|継続的なサイクル| INCIDENT`,

    chaosEngineering: `flowchart LR
    STEADY["平常時の<br/>定常状態を定義"] --> HYP2["仮説を立てる<br/>『この障害でも<br/>定常状態は保たれる』"]
    HYP2 --> INJECT["実際の障害を<br/>意図的に注入"]
    INJECT --> OBSERVE["システムの挙動を<br/>観察・計測"]
    OBSERVE --> COMPARE{"定常状態は<br/>保たれたか"}
    COMPARE -->|Yes| CONFIDENCE[システムへの<br/>確信が高まる]
    COMPARE -->|No| WEAKNESS["脆弱性を発見し<br/>改修対象とする"]
    WEAKNESS --> FIX2[耐障害性を改善]
    FIX2 --> STEADY

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class CONFIDENCE successFill
    class WEAKNESS dangerFill`,

    shiftLeftSecurity: `flowchart LR
    subgraph gate["アンチパターン: リリース末端のセキュリティゲート"]
        direction TB
        G1[開発] --> G2[QA] --> G3["リリース直前に<br/>セキュリティ監査"] --> G4["差し戻し<br/>(手戻りコスト大)"]
    end
    subgraph shiftleft["ベストプラクティス: シフトレフト・セキュリティ"]
        direction TB
        SL1["設計時に<br/>脅威モデリング"]
        SL2["コミット時に<br/>SAST/依存関係スキャン"]
        SL3["CI内で<br/>自動セキュリティテスト"]
        SL4["本番でも<br/>継続的モニタリング"]
        SL1 --> SL2 --> SL3 --> SL4
    end`,

    doraPerformers: `flowchart LR
    subgraph elite["エリートパフォーマー（DORA調査の過去分類・2021年基準）"]
        direction TB
        E1["デプロイ頻度: 1日に複数回"]
        E2["変更のリードタイム: 1時間未満"]
        E3["変更失敗率: 低水準"]
        E4["サービス復旧時間: 1時間未満"]
    end
    subgraph low["ローパフォーマー（DORA調査の過去分類・2021年基準）"]
        direction TB
        LW1["デプロイ頻度: 1ヶ月〜半年に1回"]
        LW2["変更のリードタイム: 1〜6ヶ月"]
        LW3["変更失敗率: 高水準"]
        LW4["サービス復旧時間: 1週間〜1ヶ月"]
    end

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class E1,E2,E3,E4 successFill
    class LW1,LW2,LW3,LW4 dangerFill`,

    roadmapSteps: `flowchart TB
    S1["Step1: 小さく始める<br/>パイロットとなるバリューストリームを選ぶ<br/>(第5章)"] --> S2["Step2: 作業を可視化する<br/>カンバンボードを導入(第6章)"]
    S2 --> S3["Step3: バージョン管理を徹底し<br/>デプロイパイプラインの土台を作る(第9章)"]
    S3 --> S4["Step4: 自動テストを整備し<br/>継続的インテグレーションを実践(第10-11章)"]
    S4 --> S5["Step5: テレメトリを整備し<br/>本番の状態を可視化(第14章)"]
    S5 --> S6["Step6: 低リスクなリリース手法<br/>(フラグ/カナリア)を導入(第12章)"]
    S6 --> S7["Step7: ブレームレスな<br/>ポストモーテムを習慣化(第19章)"]
    S7 --> S8["Step8: 学びを組織全体へ横展開し<br/>継続的に改善する(第20-21章)"]
    S8 -.->|継続的なサイクル| S1`,
};
