export const DIAGRAMS: Record<string, string> = {
    'diag-1': `flowchart TD
    A[クラウドソリューション稼働中] --> B{正常稼働か？}
    B -->|Yes| C[継続的モニタリング]
    B -->|No| D[診断・トラブルシューティング]
    C --> E[メトリクス収集<br>Cloud Monitoring]
    C --> F[ログ収集<br>Cloud Logging]
    C --> G[トレース<br>Cloud Trace / Profiler]
    D --> H[ログ分析]
    D --> I[アラート確認]
    D --> J[診断ツール活用]
    H --> K[根本原因特定]
    I --> K
    J --> K
    K --> L{対処方法}
    L -->|スケール調整| M[オートスケーリング設定変更]
    L -->|インフラ変更| N[スナップショット取得→変更]
    L -->|データ復旧| O[バックアップからリストア]
    L -->|ネットワーク修正| P[ファイアウォール・DNS 調整]
    M --> B
    N --> B
    O --> B
    P --> B`,

    'diag-2': `sequenceDiagram
    actor User
    participant gcloud
    participant IAP as Cloud IAP
    participant VM as Compute Engine VM

    User->>gcloud: gcloud compute ssh INSTANCE --tunnel-through-iap
    gcloud->>IAP: IAP トンネル確立要求
    IAP-->>IAP: IAM 権限確認<br>(roles/iap.tunnelResourceAccessor)
    IAP->>VM: TCP ポート 22 へのトンネル確立
    gcloud-->>User: SSH セッション開始
    Note over IAP,VM: 外部IPなし・ファイアウォール<br>でもアクセス可能`,

    'diag-3': `flowchart TD
    A[ディスクデータを保護・移行したい] --> B{目的は何か？}
    B -->|定期バックアップ・障害復旧| C[スナップショット]
    B -->|新VMの雛形作成・大量展開| D[カスタムイメージ]
    C --> E{スケジュール必要？}
    E -->|Yes| F[Snapshot Schedule Policy を作成<br>ディスクに適用]
    E -->|No| G[手動スナップショット作成]
    D --> H{OS設定済みの VM がある？}
    H -->|Yes| I[VMを停止→イメージ作成<br>--family オプションで管理]
    H -->|No| J[スナップショットからイメージ作成]
    F --> K[Cloud Storage に自動保存<br>増分バックアップ]
    G --> K
    I --> L[Image Family で最新版管理<br>インスタンステンプレートに利用]
    J --> L`,

    'diag-4': `flowchart LR
    A[GKE Node] --> B{認証方式}
    B -->|Workload Identity Federation<br>推奨| C[Kubernetes SA<br>とGCP SA を紐付け]
    B -->|デフォルトSA| D[Compute Engine SA に<br>artifactregistry.reader 付与]
    C --> E[Artifact Registry<br>からイメージPull]
    D --> E
    E --> F[コンテナ起動]`,

    'diag-5': `flowchart LR
    A[ユーザーリクエスト] --> B[Cloud Run Service]
    B --> C{トラフィック分割<br>ポリシー}
    C -->|90%| D[revision-00001<br>安定版]
    C -->|10%| E[revision-00002<br>新バージョン]
    E -->|問題なし| F[100%へ切り替え]
    E -->|問題あり| G[0%へ戻す<br>ロールバック]`,

    'diag-6': `flowchart TD
    A["クエリを書く"] --> B["--dry_run オプションで実行"]
    B --> C{"スキャン量を確認"}
    C -->|Allow| D["クエリ実行"]
    C -->|Too Much| E["クエリ最適化"]
    E --> F["パーティションフィルタを追加<br>WHERE _PARTITIONDATE = '...'"]
    F --> G["クラスタリングカラムを活用"]
    G --> H["SELECT * を避けて必要カラムのみ選択"]
    H --> B
    D --> I["結果確認"]
    I --> J{"コスト確認<br>($5/TB)"}
    J -->|Allow| K["本番運用"]
    J -->|Too High| E`,

    'diag-7': `flowchart TD
    A[Database Center] --> B[フリート管理<br>Inventory]
    A --> C[セキュリティ評価<br>Security Recommendations]
    A --> D[パフォーマンス分析<br>Query Insights]
    A --> E[コンプライアンス確認<br>Compliance Status]
    B --> F[Cloud SQL]
    B --> G[AlloyDB]
    B --> H[Spanner]
    B --> I[Bigtable]
    C --> J[暗号化状況<br>CMEK適用確認]
    C --> K[アクセス制御<br>IAM設定確認]
    D --> L[スロークエリ<br>特定]
    D --> M[インデックス推奨<br>Index Advisor]`,

    'diag-8': `flowchart LR
    A[Private VM<br>外部IP なし] --> B[Cloud NAT]
    B --> C[Cloud Router]
    C --> D[インターネット]
    D -->|応答| C
    C --> B
    B --> A
    Note1["インバウンドは不可<br>アウトバウンドのみ"]`,

    'diag-9': `flowchart TD
    A[メトリクスデータ収集<br>Compute Engine / GKE / Cloud Run...] --> B[Cloud Monitoring]
    B --> C{アラートポリシー評価}
    C -->|条件を満たす| D[インシデント作成]
    C -->|条件を満たさない| E[正常]
    D --> F[通知チャンネル]
    F --> G[Email]
    F --> H[PagerDuty]
    F --> I[Slack / Webhook]
    F --> J[Pub/Sub]
    D --> K[Playbook URL<br>対応手順書リンク]`,

    'diag-10': `flowchart TD
    A[すべてのログ<br>Cloud Logging に集約] --> B[Log Router]
    B --> C{ログバケット<br>フィルタリング}
    C -->|条件一致| D[ログシンク1<br>BigQuery]
    C -->|条件一致| E[ログシンク2<br>Cloud Storage]
    C -->|条件一致| F[ログシンク3<br>Pub/Sub]
    C -->|デフォルト| G[_Default バケット<br>30日保持]
    D --> H[長期分析・監査]
    E --> I[アーカイブ・コンプライアンス]
    F --> J[外部システム連携<br>SIEM / on-premises]`
};
