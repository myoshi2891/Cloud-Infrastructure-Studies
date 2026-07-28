export const DIAGRAMS: Record<string, string> = {
    'diag-overview': `flowchart TB
subgraph L1["レイヤー1: 誰がアクセスできるか(IAM)"]
direction LR
A1["基本ロール<br />Owner/Editor/Viewer"] --> A2["カスタムロール<br />必要な権限だけを束ねる"] --> A3["サービスアカウント<br />人間以外のID"]
end
subgraph L2["レイヤー2: どの経路でアクセスできるか(ネットワーク)"]
direction LR
B1["VPC Peering<br />プロジェクト間の内部通信"] --> B2["IAP<br />アプリ層の認証プロキシ"] --> B3["Private GKE<br />クラスタの外部露出を遮断"]
end
subgraph L3["レイヤー3: データそのものを守る(暗号化)"]
direction LR
C1["Cloud KMS<br />鍵の生成と権限分離"] --> C2["暗号化データの保存<br />Cloud Storage"]
end
L1 --> L2 --> L3`,
    'diag-iam-hierarchy': `flowchart TD
Org["Organization"] --> Folder["Folder"] --> Project["Project"] --> Resource["Resource (Storage Bucket, Compute Instance)"]`,
    'diag-iam-binding': `flowchart LR
Member["ID (User, Service Account)"] --> Role["Role (Permissions Set)"] --> Resource["Resource"]`,
    'diag-customrole-lifecycle': `flowchart LR
Draft["ALPHA / BETA"] --> GA["GA (General Availability)"] --> Deprecated["DEPRECATED"] --> Disabled["DISABLED"]`,
    'diag-customrole-perm': `flowchart TD
Need["要件: 特定操作のみ許可"] --> Search["既存Role検索"] --> Found{適合ロールあり?}
Found -- Yes --> Assign["組込みロール付与"]
Found -- No --> Custom["カスタムロール作成 (Minimum Permissions)"]`,
    'diag-sa-concept': `flowchart LR
App["App / VM Instance"] --> SA["Service Account (Identity)"] --> Resource["GCP Resources"]`,
    'diag-sa-impersonation': `flowchart LR
User["User / Admin"] -- "roles/iam.serviceAccountTokenCreator" --> SA["Service Account"] -- "Short-lived Token" --> Resource["Target API"]`,
    'diag-peering-mesh': `flowchart LR
VPC_A["VPC A (Project A)"] <== "VPC Network Peering" ==> VPC_B["VPC B (Project B)"]`,
    'diag-iap-flow': `flowchart LR
Client["External User / Browser"] --> IAP["Identity-Aware Proxy (HTTPS)"]
IAP -- "Authorized (IAM Check)" --> Backend["Backend Service / VM"]
IAP -- "Denied" --> Block["403 Forbidden"]`,
    'diag-iap-tcp': `flowchart LR
Admin["Developer / SSH Client"] --> IAP_TCP["IAP TCP Forwarding"] --> PrivateVM["Private VM (No External IP)"]`,
    'diag-kms-envelope': `flowchart TD
Data["Plain Data"] -- "DEK (Data Encryption Key)" --> EncryptedData["Encrypted Data"]
DEK -- "KEK in Cloud KMS" --> EncryptedDEK["Encrypted DEK"]`,
    'diag-kms-rotation': `flowchart LR
KeyV1["Key Version 1 (Primary)"] --> Rotate["Key Rotation Event"] --> KeyV2["Key Version 2 (New Primary)"]`,
    'diag-kms-iam': `flowchart LR
User["App / User"] -- "roles/cloudkms.cryptoKeyEncrypterDecrypter" --> KMS["CryptoKey"]`,
    'diag-gke-private': `flowchart TD
subgraph ControlPlane["Google-managed Control Plane"]
Master["API Server (Private Endpoint)"]
end
subgraph WorkerNodes["Customer VPC (Private Subnet)"]
Node1["Private Node 1 (No Public IP)"]
Node2["Private Node 2 (No Public IP)"]
end
Master <== "Private Service Connect / VPC Peering" ==> WorkerNodes`,
    'diag-gke-authorized': `flowchart LR
Client["Client IP"] --> Authorized{許可CIDRか?}
Authorized -- Yes --> Master["GKE Control Plane API"]
Authorized -- No --> Block["Connection Dropped"]`,
    'diag-integration-arch': `flowchart TD
subgraph ClientLayer["Client Layer"]
User["User"] --> IAP["IAP Proxy"]
end
subgraph AppLayer["Application Layer (Private GKE / VM)"]
IAP --> VM["Private App Server (SA)"]
end
subgraph DataLayer["Data & Security Layer"]
VM --> KMS["Cloud KMS"]
VM --> Storage["Cloud Storage"]
end`
};
