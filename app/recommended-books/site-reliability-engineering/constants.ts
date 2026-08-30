/**
 * Site Reliability Engineering (SRE) 入門ガイド用の定数定義
 * Mermaidダイアグラム、ナビゲーション項目、統計情報など
 */

export type DiagramId =
    | 'devopsVsSre'
    | 'errorBudget'
    | 'sliSloSla'
    | 'toilConditions'
    | 'fourGoldenSignals'
    | 'automationEvolution'
    | 'releasePrinciples'
    | 'releasePipeline'
    | 'signalTypes'
    | 'oncallRotation'
    | 'troubleshootingFlow'
    | 'incidentCommandSystem'
    | 'postmortemCycle'
    | 'engagementModel'
    | 'roadmapSteps';

export interface NavItem {
    id: string;
    label: string;
    isLvl3?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: 'about-this-guide', label: 'この記事について' },
    { id: 'part1', label: '第1部：SREとは何か' },
    { id: 'why-sre', label: '1.1 SREはなぜ生まれたのか', isLvl3: true },
    { id: 'sre-vs-devops', label: '1.2 SREとDevOpsの関係', isLvl3: true },
    { id: 'book-structure', label: '1.3 本書の構成', isLvl3: true },
    { id: 'part2', label: '第2部：原則（Principles）' },
    { id: 'risk', label: '2.1 リスクを受け入れる ―― エラーバジェット', isLvl3: true },
    { id: 'slo', label: '2.2 サービスレベル目標（SLI / SLO / SLA）', isLvl3: true },
    { id: 'toil', label: '2.3 トイルの撲滅', isLvl3: true },
    { id: 'monitoring', label: '2.4 分散システムの監視 ―― 4大シグナル', isLvl3: true },
    { id: 'automation', label: '2.5 自動化の進化', isLvl3: true },
    { id: 'release', label: '2.6 リリースエンジニアリング', isLvl3: true },
    { id: 'simplicity', label: '2.7 シンプルさという美徳', isLvl3: true },
    { id: 'part3', label: '第3部：実践（Practices）' },
    { id: 'alerting', label: '3.1 実践的なアラート設計', isLvl3: true },
    { id: 'oncall', label: '3.2 オンコール対応', isLvl3: true },
    { id: 'troubleshooting', label: '3.3 効果的なトラブルシューティング', isLvl3: true },
    { id: 'emergency', label: '3.4 緊急対応', isLvl3: true },
    { id: 'incident', label: '3.5 インシデント管理', isLvl3: true },
    { id: 'postmortem', label: '3.6 ポストモーテム文化', isLvl3: true },
    { id: 'other-practices', label: '3.7 その他の実践トピック（概観）', isLvl3: true },
    { id: 'part4', label: '第4部：マネジメント（Management）' },
    { id: 'accelerating', label: '4.1 オンコールへの導入とその先', isLvl3: true },
    { id: 'interrupts', label: '4.2 割り込みへの対処', isLvl3: true },
    { id: 'communication', label: '4.3 コミュニケーションと協業', isLvl3: true },
    { id: 'engagement', label: '4.4 SREエンゲージメントモデルの進化', isLvl3: true },
    { id: 'roadmap', label: '第5部：初学者向け導入ロードマップ' },
    { id: 'ai-era', label: '第6部：2026年、AI時代のSRE' },
    { id: 'reliability-redefined', label: '6.1 「信頼性」の定義そのものが広がっている', isLvl3: true },
    { id: 'ai-amplifier', label: '6.2 AIは「増幅器」である ―― DORAレポートの視点', isLvl3: true },
    { id: 'sre-role-change', label: '6.3 SREという職能自体の変化', isLvl3: true },
    { id: 'what-stays', label: '6.4 変わらないもの', isLvl3: true },
    { id: 'checklist', label: 'まとめ：ベストプラクティスチェックリスト' },
    { id: 'references', label: '参考文献' },
] as const;

export const DIAGRAMS: Record<DiagramId, string> = {
    devopsVsSre: `flowchart TB
    subgraph DevOpsLayer["DevOpsという思想"]
        D1["サイロの解消"]
        D2["高速なフィードバックループ"]
        D3["段階的な変更"]
        D4["ツールと自動化の活用"]
        D5["すべてを計測する"]
    end

    subgraph SRELayer["SREという実装"]
        S1["エラーバジェットで<br/>リスクを定量化"]
        S2["トイル上限50%の<br/>運用ルール"]
        S3["カナリアリリースと<br/>段階的ロールアウト"]
        S4["モニタリング・<br/>自動化基盤の整備"]
        S5["SLI/SLOによる<br/>定量的な目標設定"]
    end

    D1 --> S1
    D2 --> S3
    D3 --> S3
    D4 --> S4
    D5 --> S5`,

    errorBudget: `flowchart TD
    A["プロダクトオーナーが<br/>四半期SLOを設定<br/>例: 99.9%"] --> B["監視システムが<br/>実際の可用性を計測"]
    B --> C{"エラーバジェットは<br/>残っているか？"}
    C -->|"Yes(予算内)"| D["新機能のリリースを継続<br/>プロダクト開発チームが<br/>リスクを取れる"]
    C -->|"No(予算超過)"| E["リリースを一時停止<br/>安定化・テスト強化に<br/>工数を振り向ける"]
    D --> F["四半期末に<br/>SLO達成状況をレビュー"]
    E --> F
    F --> A

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class D successFill
    class E dangerFill`,

    sliSloSla: `flowchart TB
    subgraph SLI_box["SLI: Service Level Indicator(指標)"]
        SLI["実際に計測される定量的な値<br/>例: リクエスト成功率、レイテンシp99"]
    end
    subgraph SLO_box["SLO: Service Level Objective(目標)"]
        SLO["SLIに対する目標値<br/>例: p99レイテンシ ＜ 100ms を<br/>99%のリクエストで達成"]
    end
    subgraph SLA_box["SLA: Service Level Agreement(合意)"]
        SLA["SLO未達時の結果(違約金・返金等)を<br/>含む対外的な契約"]
    end

    SLI --> SLO --> SLA`,

    toilConditions: `flowchart LR
    T["トイルの6条件"] --> T1["手作業<br/>Manual"]
    T --> T2["繰り返し発生<br/>Repetitive"]
    T --> T3["自動化可能<br/>Automatable"]
    T --> T4["対症療法的<br/>Tactical"]
    T --> T5["恒久的価値がない<br/>No enduring value"]
    T --> T6["サービス成長に比例<br/>O(n) with growth"]

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class T1,T2,T3,T4,T5,T6 warnFill`,

    fourGoldenSignals: `flowchart TB
    G["4大シグナル<br/>The Four Golden Signals"]
    G --> L["Latency(レイテンシ)<br/>成功リクエストと失敗リクエストの<br/>レイテンシを分けて見る"]
    G --> Tr["Traffic(トラフィック)<br/>QPS、同時接続数など<br/>需要の大きさ"]
    G --> E["Errors(エラー)<br/>明示的・暗黙的・ポリシー上の<br/>失敗の割合"]
    G --> S["Saturation(飽和度)<br/>システムがどれだけ<br/>「いっぱいか」"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class L,Tr,E,S highlightFill`,

    automationEvolution: `flowchart TB
    A1["レベル0:<br/>人間による手作業<br/>No automation"] --> A2["レベル1:<br/>外部システムが<br/>汎用の仕組みで実行"]
    A2 --> A3["レベル2:<br/>外部システムが<br/>サービス固有ロジックで実行"]
    A3 --> A4["レベル3:<br/>自らを保守する<br/>システムに内蔵された自動化"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class A1 dangerFill
    class A2 warnFill
    class A3 highlightFill
    class A4 successFill`,

    releasePrinciples: `flowchart LR
    subgraph Philosophy["リリースエンジニアリングの4原則"]
        P1["セルフサービス<br/>各チームが自分たちで<br/>リリースを制御できる"]
        P2["高速性<br/>頻繁な小さいリリースは<br/>むしろテストしやすい"]
        P3["Hermetic Build<br/>再現可能で環境非依存な<br/>ビルド"]
        P4["ポリシーの強制<br/>コードレビューや<br/>アクセス制御の徹底"]
    end`,

    releasePipeline: `flowchart LR
    SRC["ソースリポジトリ<br/>(mainline)"] --> BR["リリースブランチを作成"]
    BR --> BUILD["Blazeでビルド<br/>＋ユニットテスト実行"]
    BUILD --> PKG["MPMでパッケージング<br/>(バージョン・署名付き)"]
    PKG --> CANARY["カナリアデプロイ<br/>一部クラスタへ先行配信"]
    CANARY --> ROLLOUT["段階的ロールアウト<br/>クラスタを順次拡大"]
    ROLLOUT --> PROD["全クラスタへ展開完了"]`,

    signalTypes: `flowchart TB
    Signal["検知されたシグナル"] --> Decide{"緊急性・実害の<br/>有無を判定"}
    Decide -->|"今すぐ人が対応すべき"| Page["ページ(Pages)<br/>即座に人を呼び出す"]
    Decide -->|"数日以内に対応が必要"| Ticket["チケット(Tickets)<br/>キューに積んで後で対応"]
    Decide -->|"記録として残せば十分"| Log["ロギング(Logging)<br/>後から分析できるよう保存"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class Page dangerFill
    class Ticket warnFill`,

    oncallRotation: `flowchart TB
    subgraph Rotation["週次オンコールローテーション例(単一拠点・8人チーム)"]
        W1["Week1: Aさん Primary<br/>Bさん Secondary"]
        W2["Week2: Cさん Primary<br/>Dさん Secondary"]
        W3["Week3: Eさん Primary<br/>Fさん Secondary"]
        W4["Week4: Gさん Primary<br/>Hさん Secondary"]
    end
    W1 --> W2 --> W3 --> W4 --> W1`,

    troubleshootingFlow: `flowchart TB
    Report["問題の報告<br/>Problem Report"] --> Triage["トリアージ<br/>影響範囲・緊急度の把握"]
    Triage --> Examine["調査(Examine)<br/>ログ・メトリクス・<br/>変更履歴を確認"]
    Examine --> Diagnose["仮説を立てて検証<br/>Diagnose"]
    Diagnose --> Test{"仮説は<br/>正しいか？"}
    Test -->|No| Examine
    Test -->|Yes| Treat["応急処置(Treat)<br/>まず被害を止める"]
    Treat --> Cure["恒久対策(Cure)<br/>根本原因を修正"]`,

    incidentCommandSystem: `flowchart TB
    IC["インシデントコマンダー<br/>(Incident Commander)<br/>全体の意思決定と役割分担"]
    IC --> Ops["Ops Lead<br/>実際の復旧作業を実施<br/>本番変更はこのチームのみ"]
    IC --> Comms["Communications Lead<br/>関係者・経営層への<br/>定期的な状況報告"]
    IC --> Planning["Planning Lead<br/>長期タスク・引き継ぎ・<br/>バグ登録・状態文書の管理"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class IC highlightFill`,

    postmortemCycle: `flowchart LR
    Trigger["トリガー発生<br/>ユーザー影響のある障害<br/>データ損失／SLO違反等"] --> Draft["ドラフト作成<br/>タイムライン・影響範囲を<br/>共同編集で記録"]
    Draft --> Review["レビュー<br/>シニアエンジニアが<br/>網羅性・深さを確認"]
    Review --> Share["組織全体へ共有<br/>ニュースレター・輪読会等"]
    Share --> Action["アクションアイテムの<br/>実行・追跡"]
    Action --> Prevent["再発防止<br/>ナレッジベースへ蓄積"]`,

    engagementModel: `flowchart LR
    E1["コンサルティング<br/>設計レビュー・助言のみ<br/>運用責任は持たない"] --> E2["Kickstart<br/>短期集中で信頼性改善に伴走<br/>本番運用にはまだ入らない"]
    E2 --> E3["フルエンゲージメント<br/>オンコール込みで<br/>本番運用の責任を持つ"]`,

    roadmapSteps: `flowchart TB
    S1["Step1<br/>ユーザーにとっての<br/>「信頼性」を定義する"] --> S2["Step2<br/>SLIを計測できる<br/>基盤を用意する"]
    S2 --> S3["Step3<br/>現実的なSLOを設定し<br/>エラーバジェットを定義する"]
    S3 --> S4["Step4<br/>4大シグナルを軸に<br/>ダッシュボードを整備する"]
    S4 --> S5["Step5<br/>症状ベースのアラートへ<br/>整理し直す"]
    S5 --> S6["Step6<br/>オンコール体制と<br/>エスカレーションパスを整備"]
    S6 --> S7["Step7<br/>インシデント管理の<br/>役割分担を文書化する"]
    S7 --> S8["Step8<br/>ブレームレスな<br/>ポストモーテム文化を導入"]
    S8 --> S9["Step9<br/>トイルを計測し<br/>継続的に自動化投資する"]
    S9 --> S10["Step10<br/>エラーバジェットの<br/>消費状況を定例で振り返る"]
    S10 -.->|"継続的改善サイクル"| S3`,
};
