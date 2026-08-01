export const DIAGRAMS = {
    ARCHITECTURE: `flowchart TB
    subgraph VPCNET["VPC Name (custom-mode, GLOBAL)"]
        subgraph SUB1["subnet-01 10.10.10.0/24"]
            VM1["tf-instance-1<br/>e2-standard-2"]
        end
        subgraph SUB2["subnet-02 10.10.20.0/24"]
            VM2["tf-instance-2<br/>e2-standard-2"]
        end
    end
    INTERNET["0.0.0.0/0 送信元"] -->|"ingress TCP:80"| FW["tf-firewall"]
    FW --> VPCNET
    BUCKET["Cloud Storage Bucket<br/>force_destroy / uniform access"]
    STATE["terraform.tfstate<br/>prefix terraform/state"] --> BUCKET

    classDef net fill:#12233d,stroke:#7c9eff,color:#e8edf5
    classDef vm fill:#0d1a2b,stroke:#6fd6a0,color:#e8edf5
    classDef ext fill:#0d1a2b,stroke:#f2c675,color:#e8edf5
    class VPCNET,FW net
    class VM1,VM2 vm
    class INTERNET,BUCKET,STATE ext`,

    DIRECTORY_STRUCTURE: `flowchart TD
    ROOT["プロジェクトルート"] --> MAINTF["main.tf<br/>Terraform block / Provider / module 呼び出し"]
    ROOT --> ROOTVAR["variables.tf<br/>region / zone / project_id"]
    ROOT --> MODULES["modules/"]
    MODULES --> INST["instances/"]
    INST --> INSTTF["instances.tf"]
    INST --> INSTOUT["outputs.tf"]
    INST --> INSTVAR["variables.tf"]
    MODULES --> STOR["storage/"]
    STOR --> STORTF["storage.tf"]
    STOR --> STOROUT["outputs.tf"]
    STOR --> STORVAR["variables.tf"]

    classDef root fill:#12233d,stroke:#7c9eff,color:#e8edf5
    classDef mod fill:#0d1a2b,stroke:#c792ea,color:#e8edf5
    class ROOT,MAINTF,ROOTVAR root
    class MODULES,INST,STOR,INSTTF,INSTOUT,INSTVAR,STORTF,STOROUT,STORVAR mod`,

    IMPORT_FLOW: `flowchart LR
    A["① Console で既存 VM の仕様を確認<br/>Instance ID / machine_type / boot_disk 等"] --> B["② main.tf に module instances<br/>の参照を追加し、init"]
    B --> C["③ instances.tf に最小限の<br/>resource ブロックを記述"]
    C --> D["④ terraform import で<br/>state に紐付け"]
    D --> E["⑤ terraform plan で<br/>差分を確認"]
    E --> F["⑥ terraform apply で<br/>設定と実体を一致させる"]

    classDef step fill:#0d1a2b,stroke:#7c9eff,color:#e8edf5
    class A,B,C,D,E,F step`,

    REMOTE_BACKEND_FLOW: `flowchart LR
    A["ローカル state<br/>terraform.tfstate"] --> B["storage module で<br/>GCS バケットを作成・apply"]
    B --> C["main.tf に<br/>backend gcs ブロックを追加"]
    C --> D["terraform init<br/>を再実行"]
    D --> E{"既存の state を<br/>新しい backend へ<br/>コピーしますか？"}
    E -->|"yes と入力"| F["state が GCS バケットへ<br/>移行完了"]

    classDef step fill:#0d1a2b,stroke:#7c9eff,color:#e8edf5
    classDef dec fill:#12233d,stroke:#f2c675,color:#e8edf5
    class A,B,C,D,F step
    class E dec`,

    UPDATE_WORKFLOW: `flowchart LR
    A["tf-instance-1 / tf-instance-2 の<br/>machine_type を e2-standard-2 に変更"] --> B["3台目の resource ブロックを<br/>新規追加"]
    B --> C["terraform init"]
    C --> D["terraform apply"]

    classDef step fill:#0d1a2b,stroke:#6fd6a0,color:#e8edf5
    class A,B,C,D step`,

    DESTROY_WORKFLOW: `flowchart LR
    A["instances.tf から<br/>3台目の resource ブロックを削除"] --> B["terraform init"]
    B --> C["terraform plan<br/>destroy 対象として表示されることを確認"]
    C --> D["terraform apply"]
    D --> E["実インフラからも<br/>インスタンスが削除される"]

    classDef step fill:#0d1a2b,stroke:#ff8a8a,color:#e8edf5
    class A,B,C,D,E step`,

    MODULE_RELATION: `flowchart TD
    MAINTF["main.tf: module network"] -->|"source"| REGISTRY["terraform-google-modules/network/google<br/>Terraform Registry"]
    REGISTRY --> VPC["google_compute_network<br/>VPC Name"]
    REGISTRY --> SUB1["google_compute_subnetwork<br/>subnet-01 10.10.10.0/24"]
    REGISTRY --> SUB2["google_compute_subnetwork<br/>subnet-02 10.10.20.0/24"]

    classDef main fill:#12233d,stroke:#7c9eff,color:#e8edf5
    classDef res fill:#0d1a2b,stroke:#c792ea,color:#e8edf5
    class MAINTF,REGISTRY main
    class VPC,SUB1,SUB2 res`,

    FIREWALL_FLOW: `flowchart LR
    INTERNET["0.0.0.0/0<br/>送信元"] -->|"ingress allow tcp:80"| FW["tf-firewall"]
    FW --> VPCNET["VPC Name ネットワーク"]
    VPCNET --> VM1["tf-instance-1"]
    VPCNET --> VM2["tf-instance-2"]

    classDef ext fill:#0d1a2b,stroke:#f2c675,color:#e8edf5
    classDef net fill:#12233d,stroke:#7c9eff,color:#e8edf5
    classDef vm fill:#0d1a2b,stroke:#6fd6a0,color:#e8edf5
    class INTERNET ext
    class FW,VPCNET net
    class VM1,VM2 vm`,
};

export const NAVIGATION_ITEMS = [
    { id: 'sec1', icon: 'ti-target-arrow', label: '1. このラボで学ぶこと' },
    { id: 'sec2', icon: 'ti-topology-star-3', label: '2. 完成形のアーキテクチャ' },
    { id: 'sec3', icon: 'ti-terminal-2', label: '3. Terraform CLI の準備' },
    { id: 'divider-1', isDivider: true },
    { id: 'sec4', icon: 'ti-folders', label: '4. Task 1: ディレクトリ構成' },
    { id: 'sec5', icon: 'ti-download', label: '5. Task 2: import' },
    { id: 'sec6', icon: 'ti-cloud-lock', label: '6. Task 3: remote backend' },
    { id: 'sec7', icon: 'ti-adjustments', label: '7. Task 4: in-place update' },
    { id: 'sec8', icon: 'ti-trash', label: '8. Task 5: destroy' },
    { id: 'sec9', icon: 'ti-network', label: '9. Task 6: Registry module' },
    { id: 'sec10', icon: 'ti-shield-lock', label: '10. Task 7: firewall' },
    { id: 'divider-2', isDivider: true },
    { id: 'sec11', icon: 'ti-checklist', label: '11. ベストプラクティス総まとめ' },
    { id: 'sec12', icon: 'ti-books', label: '12. 参考文献・引用ソース' },
];
