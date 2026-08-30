/**
 * Release It! 完全ガイド用の定数定義
 * Mermaidダイアグラム、ナビゲーション項目など
 */

export type DiagramId =
    | 'editionComparison'
    | 'bookStructure'
    | 'crackPropagation'
    | 'circuitBreakerState'
    | 'bulkheadsArchitecture'
    | 'resilienceDefenseInDepth'
    | 'failFastVsLetItCrash'
    | 'loadControlChain'
    | 'designForProduction'
    | 'controlPlaneComponents'
    | 'expandContractSchema'
    | 'deploymentPhases'
    | 'chaosEngineeringEvolution'
    | 'practicalChecklistFlow';

export interface NavItem {
    id: string;
    label: string;
    isLvl3?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
    {
        id: '1-はじめになぜ機能が完成しただけでは足りないのか',
        label: '1. はじめに：なぜ「機能が完成した」だけでは足りないのか',
    },
    { id: '2-著者と本書の位置づけ', label: '2. 著者と本書の位置づけ' },
    { id: '3-初版と第2版の違い', label: '3. 初版と第2版の違い' },
    { id: '4-本書全体のマップ第2版の4部構成', label: '4. 本書全体のマップ：第2版の4部構成' },
    {
        id: '5-第1部安定性を作るcreate-stability',
        label: '5. 第1部：安定性を作る（Create Stability）',
    },
    { id: '51-安定性とは何か', label: '5.1 安定性とは何か', isLvl3: true },
    {
        id: '52-安定性のアンチパターン12種',
        label: '5.2 安定性のアンチパターン（12種）',
        isLvl3: true,
    },
    { id: '53-安定性パターン12種', label: '5.3 安定性パターン（12種）', isLvl3: true },
    {
        id: '6-第2部本番のために設計するdesign-for-production',
        label: '6. 第2部：本番のために設計する（Design for Production）',
    },
    { id: '61-foundations基盤', label: '6.1 Foundations（基盤）', isLvl3: true },
    {
        id: '62-processes-on-machinesマシン上のプロセス',
        label: '6.2 Processes on Machines（マシン上のプロセス）',
        isLvl3: true,
    },
    { id: '63-interconnect相互接続', label: '6.3 Interconnect（相互接続）', isLvl3: true },
    {
        id: '64-control-planeコントロールプレーン',
        label: '6.4 Control Plane（コントロールプレーン）',
        isLvl3: true,
    },
    { id: '65-securityセキュリティ', label: '6.5 Security（セキュリティ）', isLvl3: true },
    {
        id: '7-第3部システムを届けるdeliver-your-system',
        label: '7. 第3部：システムを届ける（Deliver Your System）',
    },
    {
        id: '71-デプロイのために設計するdesign-for-deployment',
        label: '7.1 デプロイのために設計する（Design for Deployment）',
        isLvl3: true,
    },
    {
        id: '72-バージョン管理handling-versions',
        label: '7.2 バージョン管理（Handling Versions）',
        isLvl3: true,
    },
    {
        id: '8-第4部システミックな問題を解くsolve-systemic-problems',
        label: '8. 第4部：システミックな問題を解く（Solve Systemic Problems）',
    },
    { id: '81-適応adaptation', label: '8.1 適応（Adaptation）', isLvl3: true },
    {
        id: '82-カオスエンジニアリングchaos-engineering',
        label: '8.2 カオスエンジニアリング（Chaos Engineering）',
        isLvl3: true,
    },
    {
        id: '9-現代の実務にどう活かすかパターン対応表',
        label: '9. 現代の実務にどう活かすか：パターン対応表',
    },
    {
        id: '10-ステップバイステップ実践チェックリスト',
        label: '10. ステップバイステップ実践チェックリスト',
    },
    { id: '11-よくある誤解faq', label: '11. よくある誤解・FAQ' },
    { id: '12-まとめ', label: '12. まとめ' },
    { id: '13-参考文献', label: '13. 参考文献' },
];

export const DIAGRAMS: Record<DiagramId, string> = {
    editionComparison: `flowchart LR
    A["初版（2007年3月）<br/>326ページ・Javaが前提<br/>単一データセンターの時代"] --> B["第2版（2018年1月）<br/>376ページ<br/>DevOps・マイクロサービス・<br/>クラウドネイティブ・カオスエンジニアリング"]`,

    bookStructure: `flowchart TB
    A["第1部: 安定性を作る<br/>Create Stability<br/>（障害を『封じ込める』設計）"] --> B["第2部: 本番のために設計する<br/>Design for Production<br/>（本番で『運用できる』設計）"]
    B --> C["第3部: システムを届ける<br/>Deliver Your System<br/>（安全に『届け続ける』仕組み）"]
    C --> D["第4部: システミックな問題を解く<br/>Solve Systemic Problems<br/>（組織ごと『適応し続ける』仕組み）"]`,

    crackPropagation: `flowchart LR
    A[統合ポイントで障害発生] --> B[スレッドがブロックされる]
    B --> C[リソースプール<br/>コネクションプールが枯渇]
    C --> D[連鎖反応:<br/>他ノードへ負荷が転移]
    D --> E[カスケード障害:<br/>システム全体が停止]`,

    circuitBreakerState: `stateDiagram-v2
    [*] --> Closed
    Closed --> Open: 失敗回数が閾値を超過
    Open --> HalfOpen: 一定時間（スリープウィンドウ）経過後
    HalfOpen --> Closed: テスト呼び出しが成功
    HalfOpen --> Open: テスト呼び出しが失敗`,

    bulkheadsArchitecture: `flowchart TB
    subgraph Pool_A[サービスAへの専用スレッドプール]
        A1[スレッド 1〜10]
    end
    subgraph Pool_B[サービスBへの専用スレッドプール]
        B1[スレッド 1〜10]
    end
    Client[呼び出し元アプリケーション] --> Pool_A
    Client --> Pool_B
    Pool_A --> ServiceA[サービスA<br/>障害発生]
    Pool_B --> ServiceB[サービスB<br/>正常稼働を継続]`,

    resilienceDefenseInDepth: `flowchart LR
    A[呼び出し元] --> B[① タイムアウトを設定]
    B --> C[② サーキットブレーカーで<br/>失敗が続く呼び出し先を遮断]
    C --> D[③ バルクヘッドで分離された<br/>リソースプールを経由]
    D --> E[統合ポイント: 外部サービス]`,

    failFastVsLetItCrash: `flowchart TD
    A{リクエストの検証段階で<br/>問題を検出できるか} -->|できる| B["Fail Fast:<br/>即座にエラーを返す"]
    A -->|検証時点ではわからない| C{コンポーネントは<br/>独立して安全に再起動できるか}
    C -->|できる| D["Let It Crash:<br/>潔く落として再起動する"]
    C -->|できない| E[例外処理で慎重に復旧させる]`,

    loadControlChain: `flowchart LR
    A["Steady State:<br/>ログローテーション等の後始末を自動化し<br/>手動介入を不要にする"] --> B["Shed Load:<br/>過負荷になる前に<br/>一部リクエストを意図的に拒否する"]
    B --> C["Create Back Pressure:<br/>『減速せよ』のシグナルを<br/>上流に伝える"]
    C --> D["Governor:<br/>危険な自動処理の速度を<br/>人間が対応できる速度に制限する"]`,

    designForProduction: `flowchart TB
    A["Foundations: 基盤<br/>データセンター/クラウドのネットワーク<br/>物理ホスト・VM・コンテナ"] --> B["Processes on Machines<br/>コード・設定・透明性"]
    B --> C["Interconnect: 相互接続<br/>DNS・ロードバランシング・サービスディスカバリ"]
    C --> D["Control Plane: コントロールプレーン<br/>プロビジョニング・構成管理・コマンド&コントロール"]
    D --> E["Security: セキュリティ<br/>OWASP Top 10・最小権限の原則"]`,

    controlPlaneComponents: `flowchart TB
    CP[コントロールプレーン] --> A["System-Wide Transparency<br/>システム全体の可観測性"]
    CP --> B["Configuration Services<br/>構成管理サービス"]
    CP --> C["Provisioning & Deployment Services<br/>プロビジョニング・デプロイサービス"]
    CP --> D["Command and Control<br/>コマンド&コントロール"]`,

    expandContractSchema: `flowchart LR
    A["Expand（拡張）:<br/>新しいスキーマ要素を<br/>追加のみで導入する"] --> B["Migrate（移行）:<br/>新旧コードを並行稼働させ<br/>データを段階的に移行する"]
    B --> C["Contract（収縮）:<br/>安全確認後に<br/>旧スキーマ要素を削除する"]`,

    deploymentPhases: `flowchart LR
    A[自動化されたデプロイ] --> B[継続的デプロイ]
    B --> C["段階的ロールアウト<br/>カナリア / ブルーグリーン"]
    C --> D[ゼロダウンタイムの達成]`,

    chaosEngineeringEvolution: `flowchart LR
    A["免疫系・予防接種の比喩<br/>意図的なストレスで耐性を作る"] --> B["Netflix Chaos Monkey<br/>2011年〜"]
    B --> C["Simian Army<br/>Latency Monkey等へ拡張"]
    C --> D["Adopting Your Own Monkey<br/>組織固有の障害注入へ応用"]
    D --> E["Disaster Simulations<br/>ゲームデイ演習"]`,

    practicalChecklistFlow: `flowchart TD
    A["① 統合ポイントを洗い出す<br/>外部呼び出し・DB・キャッシュ・キューを一覧化"] --> B["② 3点セットを導入する<br/>タイムアウト・サーキットブレーカー・バルクヘッド"]
    B --> C["③ 透明性を整備する<br/>ログ・メトリクス・ヘルスチェック"]
    C --> D["④ ゼロダウンタイムデプロイを設計する<br/>Expand/Migrate/Contract"]
    D --> E["⑤ カオスエンジニアリングで検証する<br/>小さく・安全に・継続的に"]`,
};
