/**
 * Develop Your Google Cloud Network ページで使用する Mermaid ダイアグラム定数。
 * MermaidDiagram コンポーネントへ渡す chart prop として利用する。
 */

export const DIAGRAMS = {
  'diag-query-builder': `flowchart TD
    A(["❓ 何を知りたいか決める"]) --> B[SELECT で取得列を決める]
    B --> C[FROM でテーブルを選ぶ]
    C --> D{絞り込みが必要?}
    D -- Yes --> E[WHERE で条件を追加]
    D -- No --> F{グループ化が必要?}
    E --> F
    F -- Yes --> G[GROUP BY でまとめる]
    F -- No --> H{集計が必要?}
    G --> H
    H -- Yes --> I[COUNT / SUM / AVG を追加]
    H -- No --> J{並び替えが必要?}
    I --> J
    J -- Yes --> K[ORDER BY で並び替え]
    J -- No --> L(["✅ クエリ完成・実行"])
    K --> L`,

  'diag-console-handson': `flowchart TD
    A(["BigQuery コンソールを開く"]) --> B[bigquery-public-data を Star 登録]
    B --> C[london_bicycles データセットを選択]
    C --> D[cycle_hire テーブルをプレビュー]
    D --> E[クエリエディタに SQL を入力]
    E --> F[▶ Run を押す]
    F --> G[結果を確認]
    G --> H{CSV 出力が必要?}
    H -- Yes --> I["Save results ▶ Local download ▶ CSV"]
    H -- No --> J(["完了"])
    I --> J`,

  'diag-data-migration': `flowchart TD
    A(["BigQuery でクエリ実行"]) --> B[結果を CSV 形式でエクスポート]
    B --> C[Cloud Storage バケットを作成]
    C --> D[CSV を Cloud Storage にアップロード]
    D --> E[Cloud SQL インスタンスを作成]
    E --> F[データベース・テーブルを作成]
    F --> G[Cloud SQL の Import 機能で CSV を投入]
    G --> H(["データ移行完了"])`,

  'diag-multi-vpc': `flowchart TB
    subgraph mynetwork["mynetwork (Auto Mode)"]
        mynet1["mynet-vm-1<br/>(us-central1)"]
        mynet2["mynet-vm-2<br/>(europe-west1)"]
    end

    subgraph managementnet["managementnet (Custom Mode)"]
        mgmt_sub["managementsubnet-1<br/>10.130.0.0/20"]
        mgmt_vm["managementnet-vm-1"]
        mgmt_sub --> mgmt_vm
    end

    subgraph privatenet["privatenet (Custom Mode)"]
        priv_sub1["privatesubnet-1<br/>172.16.0.0/24"]
        priv_sub2["privatesubnet-2<br/>172.20.0.0/20"]
        priv_vm["privatenet-vm-1"]
        priv_sub1 --> priv_vm
    end

    internet(("🌐 インターネット")) --> mynet1
    internet --> mynet2
    internet --> mgmt_vm
    internet --> priv_vm`,

  'diag-reachability': `flowchart TD
    A["mynet-vm-1<br/>(mynetwork)"] -->|"✅ 内部IP で通信可"| B["mynet-vm-2<br/>(mynetwork)"]
    A -->|"❌ 内部IP で通信不可"| C["managementnet-vm-1<br/>(managementnet)"]
    A -->|"❌ 内部IP で通信不可"| D["privatenet-vm-1<br/>(privatenet)"]
    A -->|"✅ 外部IP で通信可 (FW ルール次第)"| C
    A -->|"✅ 外部IP で通信可 (FW ルール次第)"| D`,

  'diag-multi-nic': `flowchart TD
    subgraph vm["vm-appliance (e2-standard-4)"]
        nic0["eth0 (nic0)<br/>172.16.0.3<br/>privatenet"]
        nic1["eth1 (nic1)<br/>10.130.0.3<br/>managementnet"]
        nic2["eth2 (nic2)<br/>10.128.0.3<br/>mynetwork"]
    end
    nic0 <--> privatenet["privatenet<br/>(privatesubnet-1)"]
    nic1 <--> mgmt["managementnet<br/>(managementsubnet-1)"]
    nic2 <--> mynet["mynetwork"]`,

  'diag-observability': `flowchart TD
    A["Compute Engine VM<br/>(lamp-1-vm)"] -->|メトリクスとログを収集| B["Google Cloud Ops Agent"]
    B --> D["Cloud Monitoring"]
    D --> E["ダッシュボード"]
    D --> F["アラートポリシー"]
    D --> G["アップタイムチェック"]
    F -->|通知| H["メール / Slack / PagerDuty"]
    G -->|監視| I["外部エンドポイント"]`,

  'diag-alerting-policy': `flowchart TD
    A(["Monitoring ▶ Alerting ▶ + Create Policy"]) --> B["メトリクスを選択<br/>VM instance > Network traffic"]
    B --> C["閾値を設定<br/>500 bytes/s 以上で発火"]
    C --> D["再評価ウィンドウ<br/>1 分"]
    D --> E["通知チャンネルを設定<br/>Email / Slack etc."]
    E --> F["ドキュメントに<br/>対応手順を記載"]
    F --> G["アラート名をつける<br/>Inbound Traffic Alert"]
    G --> H(["✅ Create Policy で完了"])`,

  'diag-gke-cluster': `flowchart TB
    subgraph cluster["GKE Cluster (bootcamp)"]
        subgraph node1["Node 1"]
            pod1["Pod<br/>fortune-app v1.0"]
            pod2["Pod<br/>fortune-app v1.0"]
        end
        subgraph node2["Node 2"]
            pod3["Pod<br/>fortune-app v1.0"]
        end
        rs["ReplicaSet<br/>(replicas: 3)"]
        dep["Deployment<br/>fortune-app-blue"]
        svc["Service<br/>(LoadBalancer)"]
        dep --> rs --> pod1 & pod2 & pod3
        svc --> pod1 & pod2 & pod3
    end
    client(("🌐 クライアント")) --> svc`,

  'diag-rolling-update': `flowchart TD
    subgraph before["更新前"]
        p1["Pod v1.0"]
        p2["Pod v1.0"]
        p3["Pod v1.0"]
    end
    subgraph during["更新中（一時停止可）"]
        p4["Pod v2.0"]
        p5["Pod v1.0"]
        p6["Pod v1.0"]
    end
    subgraph after["更新後"]
        p7["Pod v2.0"]
        p8["Pod v2.0"]
        p9["Pod v2.0"]
    end
    before --> during --> after`,

  'diag-canary': `flowchart TB
    svc["Service<br/>app: fortune-app"]
    subgraph prod["Production (Blue)"]
        p1["Pod v1.0"]
        p2["Pod v1.0"]
        p3["Pod v1.0"]
    end
    subgraph canary["Canary"]
        c1["Pod v2.0<br/>(1 Pod のみ)"]
    end
    svc -->|約 75% のトラフィック| prod
    svc -->|約 25% のトラフィック| canary
    client(("🌐")) --> svc`,

  'diag-blue-green': `flowchart TD
    subgraph blue["Blue (v1.0.0)"]
        b1["Pod v1.0"]
        b2["Pod v1.0"]
        b3["Pod v1.0"]
    end
    subgraph green["Green (v2.0.0)"]
        g1["Pod v2.0"]
        g2["Pod v2.0"]
        g3["Pod v2.0"]
    end
    svc_blue["Service<br/>(Blue 向き)"] -->|"✅ 現在のトラフィック"| blue
    svc_green["Service<br/>(Green 向き)"] -.->|"切替後のトラフィック"| green
    client(("クライアント")) --> svc_blue`,

  'diag-strategy-picker': `flowchart TD
    A(["デプロイ方針を決める"]) --> B{ダウンタイムを<br/>許容できる?}
    B -- Yes --> C["Recreate<br/>全 Pod を入れ替え"]
    B -- No --> D{段階的にテストしたい?}
    D -- Yes --> E{一部ユーザーにだけ<br/>試したい?}
    E -- Yes --> F["Canary<br/>一部 Pod だけ新バージョン"]
    E -- No --> G["Rolling Update<br/>順次入れ替え"]
    D -- No --> H{即時 Rollback が必要?}
    H -- Yes --> I["Blue-Green<br/>並行稼働 + 瞬時切り替え"]
    H -- No --> G`,

  'diag-griffin-wordpress': `flowchart TB
    internet(("インターネット")) --> lb["Cloud Load Balancer<br/>(WordPress Service)"]
    subgraph dev_vpc["griffin-dev-vpc"]
        subgraph wp_sub["griffin-dev-wp (192.168.16.0/20)"]
            gke["GKE Cluster<br/>(griffin-dev)<br/>2 node / e2-standard-4"]
            gke --> wp_pod["WordPress Pod"]
        end
        subgraph mgmt_sub["griffin-dev-mgmt (192.168.32.0/20)"]
            bastion_dev["Bastion Host<br/>(eth0: dev-mgmt)"]
        end
    end
    subgraph prod_vpc["griffin-prod-vpc"]
        subgraph prod_mgmt["griffin-prod-mgmt (192.168.64.0/20)"]
            bastion_prod["Bastion Host<br/>(eth1: prod-mgmt)"]
        end
    end
    subgraph cloudsql["Cloud SQL"]
        db["griffin-dev-db<br/>(MySQL 8.0)<br/>wordpress DB"]
    end
    lb --> wp_pod
    wp_pod --> db
    bastion_dev --- bastion_prod`,
} as const;

/** DIAGRAMS のキー（diagram id）から導出する型。typo や rename 漏れをコンパイル時に検出する。 */
export type DiagramId = keyof typeof DIAGRAMS;
