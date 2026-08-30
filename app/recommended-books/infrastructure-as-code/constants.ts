export interface NavItem {
    id: string;
    label: string;
    isLvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "この記事の対象読者",
        "isLvl3": false,
        "label": "この記事の対象読者"
    },
    {
        "id": "第0部-Infrastructure-as-Code-とは何かなぜ必要か",
        "isLvl3": false,
        "label": "第0部: Infrastructure as Code とは何か、なぜ必要か"
    },
    {
        "id": "なぜ今さら-IaC-なのか2026年の視点",
        "isLvl3": true,
        "label": "なぜ今さら IaC なのか(2026年の視点)"
    },
    {
        "id": "コアプラクティス書籍が定義する3本柱",
        "isLvl3": true,
        "label": "コアプラクティス(書籍が定義する3本柱)"
    },
    {
        "id": "よくある3つの誤解",
        "isLvl3": true,
        "label": "よくある3つの誤解"
    },
    {
        "id": "DORA-Four-Keys-―-速いか安全かではなく両方測る",
        "isLvl3": true,
        "label": "DORA Four Keys ― 「速いか安全か」ではなく両方測る"
    },
    {
        "id": "第1部-基礎編-IaC-の土台となる考え方",
        "isLvl3": false,
        "label": "第1部 基礎編: IaC の土台となる考え方"
    },
    {
        "id": "第1章-Infrastructure-as-Code-とは何か",
        "isLvl3": true,
        "label": "第1章: Infrastructure as Code とは何か"
    },
    {
        "id": "第2章-クラウド時代のインフラ原則",
        "isLvl3": true,
        "label": "第2章: クラウド時代のインフラ原則"
    },
    {
        "id": "第3章-インフラプラットフォームを理解する",
        "isLvl3": true,
        "label": "第3章: インフラプラットフォームを理解する"
    },
    {
        "id": "第4章-IaC-のツールと言語",
        "isLvl3": true,
        "label": "第4章: IaC のツールと言語"
    },
    {
        "id": "第2部-設計編-壊れにくいインフラコードを設計する",
        "isLvl3": false,
        "label": "第2部 設計編: 壊れにくいインフラコードを設計する"
    },
    {
        "id": "第5章-設計原則と-CUPID-プロパティ",
        "isLvl3": true,
        "label": "第5章: 設計原則と CUPID プロパティ"
    },
    {
        "id": "第6章-インフラコンポーネントとスタック",
        "isLvl3": true,
        "label": "第6章: インフラコンポーネントとスタック"
    },
    {
        "id": "第7章-デプロイ可能なスタックの設計パターン",
        "isLvl3": true,
        "label": "第7章: デプロイ可能なスタックの設計パターン"
    },
    {
        "id": "第8章-設定管理とシークレットの取り扱い",
        "isLvl3": true,
        "label": "第8章: 設定管理とシークレットの取り扱い"
    },
    {
        "id": "第9章-スタック間の連携",
        "isLvl3": true,
        "label": "第9章: スタック間の連携"
    },
    {
        "id": "第10章-コードライブラリモジュールの設計パターン",
        "isLvl3": true,
        "label": "第10章: コードライブラリ(モジュール)の設計パターン"
    },
    {
        "id": "第11章-サーバーをコードとして構築する",
        "isLvl3": true,
        "label": "第11章: サーバーをコードとして構築する"
    },
    {
        "id": "第12章-環境Environmentの設計",
        "isLvl3": true,
        "label": "第12章: 環境(Environment)の設計"
    },
    {
        "id": "第3部-デリバリー編-安全に届け変更し続ける",
        "isLvl3": false,
        "label": "第3部 デリバリー編: 安全に届け、変更し続ける"
    },
    {
        "id": "第13章-コアインフラデリバリーワークフロー",
        "isLvl3": true,
        "label": "第13章: コアインフラデリバリーワークフロー"
    },
    {
        "id": "第14章-パイプラインの構築と組織化",
        "isLvl3": true,
        "label": "第14章: パイプラインの構築と組織化"
    },
    {
        "id": "第15章-インフラコードのテスト戦略",
        "isLvl3": true,
        "label": "第15章: インフラコードのテスト戦略"
    },
    {
        "id": "第16章-テストの実装",
        "isLvl3": true,
        "label": "第16章: テストの実装"
    },
    {
        "id": "第17章-インフラのデプロイ",
        "isLvl3": true,
        "label": "第17章: インフラのデプロイ"
    },
    {
        "id": "第18章-既存インフラを安全に変更する",
        "isLvl3": true,
        "label": "第18章: 既存インフラを安全に変更する"
    },
    {
        "id": "第19章-ガバナンスとコンプライアンスShift-Left",
        "isLvl3": true,
        "label": "第19章: ガバナンスとコンプライアンス(Shift Left)"
    },
    {
        "id": "第4部-実践編-2026年の-IaC-エコシステム",
        "isLvl3": false,
        "label": "第4部 実践編: 2026年の IaC エコシステム"
    },
    {
        "id": "第20章-ツール選定Terraform--OpenTofu--Pulumi--AWS-CDK",
        "isLvl3": true,
        "label": "第20章: ツール選定(Terraform / OpenTofu / Pulumi / AWS CDK)"
    },
    {
        "id": "第21章-GitOps-による継続的デリバリー",
        "isLvl3": true,
        "label": "第21章: GitOps による継続的デリバリー"
    },
    {
        "id": "第22章-Policy-as-Code-によるガバナンス自動化",
        "isLvl3": true,
        "label": "第22章: Policy as Code によるガバナンス自動化"
    },
    {
        "id": "第5部-はじめての-IaC-―-ステップバイステップ実践ロードマップ",
        "isLvl3": false,
        "label": "第5部: はじめての IaC ― ステップバイステップ実践ロードマップ"
    },
    {
        "id": "各ステップの補足",
        "isLvl3": true,
        "label": "各ステップの補足"
    },
    {
        "id": "ベストプラクティス総まとめチェックリスト",
        "isLvl3": false,
        "label": "ベストプラクティス総まとめチェックリスト"
    },
    {
        "id": "参考文献",
        "isLvl3": false,
        "label": "参考文献"
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
    'diag-1': `flowchart LR
subgraph OLD["従来型の手作業運用"]
A1["管理コンソールで手動作成"] --> A2["設定は担当者の頭の中と暗黙知"]
A2 --> A3["同じ環境を再現できない"]
A3 --> A4["障害時の復旧に時間がかかる"]
end
subgraph NEW["Infrastructure as Code"]
B1["コードでリソースを定義"] --> B2["Gitでバージョン管理・レビュー"]
B2 --> B3["CI/CDパイプラインで自動適用"]
B3 --> B4["何度でも同じ環境を再現できる"]
end`,

    'diag-2': `flowchart TB
Core["Infrastructure as Code<br/>3つのコアプラクティス"]
Core --> P1["① すべてをコードとして定義する<br/>Define Everything as Code"]
Core --> P2["② 進行中の作業を継続的にテスト・提供する<br/>Continually Test and Deliver"]
Core --> P3["③ 独立して変更できる小さく単純な部品を作る<br/>Build Small, Simple Pieces"]

P1 --> P1D["インフラの設定・構成・ポリシーを<br/>すべてテキストファイル(コード)にする"]
P2 --> P2D["作りかけのコードも継続的に<br/>テスト・統合・デプロイし続ける"]
P3 --> P3D["巨大な一枚岩ではなく、<br/>疎結合な小さな単位に分割する"]

classDef practiceStyle fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class P1,P2,P3 practiceStyle`,

    'diag-3': `flowchart TB
DORA["DORA Four Keys<br/>(2024年にデリバリー指標の5つ目として<br/>「デプロイの再作業率」を追加)"]
DORA --> D1["デプロイ頻度<br/>Deployment Frequency"]
DORA --> D2["変更のリードタイム<br/>Lead Time for Changes"]
DORA --> D3["変更失敗率<br/>Change Failure Rate"]
DORA --> D4["平均復旧時間<br/>MTTR"]
DORA --> D5["デプロイの再作業率<br/>Rework Rate (2024年追加)"]

D1 -.スピード指標.-> Speed["デリバリー速度"]
D2 -.スピード指標.-> Speed
D3 -.安定性指標.-> Stable["デリバリー安定性"]
D4 -.安定性指標.-> Stable
D5 -.安定性指標.-> Stable

Speed --> Elite["エリートパフォーマー:<br/>速度と安定性を両立"]
Stable --> Elite

classDef speedStyle fill:#1a2942,stroke:#7c9eff,color:#e8edf7
classDef stableStyle fill:#241a35,stroke:#b98af0,color:#ece3fb
class D1,D2,Speed speedStyle
class D3,D4,D5,Stable stableStyle`,

    'diag-4': `flowchart LR
subgraph IronAge["鉄器時代"]
I1["物理サーバーを購入"] --> I2["データセンターに設置"]
I2 --> I3["手作業でOS・ミドルウェアを構築"]
I3 --> I4["変更は高コスト・高リスク<br/>→ 変更を避ける文化"]
end
subgraph CloudAge["クラウド時代"]
C1["APIでリソースをオンデマンド生成"] --> C2["コードで再現可能に定義"]
C2 --> C3["自動テスト・自動デプロイ"]
C3 --> C4["変更は低コスト・低リスク<br/>→ 変更を歓迎する文化"]
end`,

    'diag-5': `flowchart TB
Principle["クラウドインフラの6原則"]
Principle --> R1["信頼できないと想定"]
Principle --> R2["再現可能にする"]
Principle --> R3["スノーフレーク回避"]
Principle --> R4["使い捨て可能にする"]
Principle --> R5["バリエーション最小化"]
Principle --> R6["手順を繰り返し可能に"]

R1 --> Goal["障害を前提にした<br/>回復力の高い設計"]
R2 --> Goal
R3 --> Goal
R4 --> Goal
R5 --> Goal
R6 --> Goal

classDef principleFill fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class R1,R2,R3,R4,R5,R6 principleFill`,

    'diag-6': `flowchart TB
subgraph Layer1["レイヤー1: 物理/仮想化基盤"]
L1["データセンター / ハイパーバイザー"]
end
subgraph Layer2["レイヤー2: IaaS(Infrastructure as a Service)"]
L2["仮想マシン・仮想ネットワーク・ブロックストレージ"]
end
subgraph Layer3["レイヤー3: コンテナ/クラスタ基盤"]
L3["Kubernetes・ECS などのコンテナオーケストレーション"]
end
subgraph Layer4["レイヤー4: サーバーレス/マネージドサービス"]
L4["FaaS・マネージドDB・マネージドキュー"]
end

Layer1 --> Layer2 --> Layer3 --> Layer4
L4 --> App["アプリケーション/ワークロード"]`,

    'diag-7': `flowchart TB
subgraph Procedural["手続き型(Procedural)"]
PS1["1. VPCを作成"] --> PS2["2. サブネットを作成"]
PS2 --> PS3["3. インターネットゲートウェイを作成"]
PS3 --> PS4["4. ルートテーブルを設定"]
end
subgraph Declarative["宣言型(Declarative)"]
DS1["あるべき状態を記述:<br/>VPC + Subnet×2 + IGW + RouteTable"]
DS1 --> DS2["ツールが現状との差分を計算"]
DS2 --> DS3["差分だけを安全に適用"]
end`,

    'diag-8': `flowchart LR
Code["インフラコード<br/>(.tf ファイルなど)"] --> Plan["Plan/Preview<br/>現在の状態と比較して差分を計算"]
Plan --> Review["保存した plan ファイルを人間またはポリシーエンジンがレビュー"]
Review --> Apply["Apply<br/>レビュー済みの plan ファイルを渡してクラウドAPIを呼び出す"]
Apply --> State["状態ファイル(State)を更新<br/>次回の差分計算の基準になる"]
State -.フィードバック.-> Plan`,

    'diag-9': `flowchart TB
CUPID["CUPID プロパティ<br/>(Dan North 提唱)"]
CUPID --> C1["C: Composable<br/>組み合わせ可能である"]
CUPID --> C2["U: Unix philosophy<br/>一つのことをうまくやる"]
CUPID --> C3["P: Predictable<br/>予測可能に振る舞う"]
CUPID --> C4["I: Idiomatic<br/>その言語・ツールの流儀に従う"]
CUPID --> C5["D: Domain-based<br/>問題領域の言葉を反映する"]

classDef cupidFill fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class C1,C2,C3,C4,C5 cupidFill`,

    'diag-10': `flowchart TB
Workload["ワークロード<br/>(アプリケーション/サービス)"] --> Design["インフラ設計の出発点"]
Design --> H["水平方向の設計<br/>(Horizontal Design)<br/>複数ワークロードで共有する基盤"]
Design --> V["垂直方向の設計<br/>(Vertical Design)<br/>特定ワークロード専用のリソース"]

H --> Shared["共有ネットワーク・共有クラスタ・<br/>共有監視基盤など"]
V --> Dedicated["専用データベース・専用キュー・<br/>専用IAMロールなど"]`,

    'diag-11': `flowchart TB
subgraph Monolithic["モノリシックスタック"]
M1["ネットワーク+DB+アプリ+監視<br/>すべてを1つのスタックで管理"]
end
subgraph AppGroup["アプリケーショングループスタック"]
A1["関連する複数サービスを<br/>1つのスタックにまとめる"]
end
subgraph SingleService["シングルサービススタック"]
S1["1つのサービスにつき<br/>1つのスタック"]
end
subgraph Micro["マイクロスタック"]
Mi1["さらに細分化された<br/>小さな単位のスタック群"]
end

Monolithic -->|"分割していく"| AppGroup --> SingleService --> Micro`,

    'diag-12': `flowchart TB
Secret["シークレット管理の選択肢"]
Secret --> Gen["シークレットを都度生成する<br/>(ランダムパスワード生成など)"]
Secret --> Enc["暗号化してファイルに保存する<br/>(SOPS, git-crypt など)"]
Secret --> Vault["専用シークレットストアを使う<br/>(HashiCorp Vault, AWS Secrets Manager,<br/>GCP Secret Manager)"]
Secret --> Runtime["実行時にのみ注入する<br/>(環境変数、サイドカー注入)"]

Vault --> Best["最も推奨される方式:<br/>コードにはシークレットの参照のみを書き、<br/>実際の値はランタイムで取得する"]`,

    'diag-13': `flowchart TB
Patterns["インフラコードライブラリの設計パターン"]
Patterns --> Facade["Facade Module<br/>複雑な内部実装を隠し、<br/>シンプルなインターフェースだけ公開"]
Patterns --> Obf["Obfuscation Module<br/>❌ アンチパターン:<br/>単に薄いラッパーで複雑さを隠しただけ"]
Patterns --> Bundle["Bundle Module<br/>関連リソースをひとまとめにして提供"]
Patterns --> Spaghetti["Spaghetti Module<br/>❌ アンチパターン:<br/>責務が絡み合い何をしているか分からない"]
Patterns --> Domain["Infrastructure Domain Entity<br/>ドメインの概念(例:Webサービス)を<br/>そのままコードの単位にする"]

classDef goodFill fill:#122a1c,stroke:#4caf7d,color:#d9f2e4
classDef badFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
class Facade,Bundle,Domain goodFill
class Obf,Spaghetti badFill`,

    'diag-14': `flowchart TB
subgraph Bake["ベイク(Bake): イメージに焼き込む"]
B1["OSイメージの上に<br/>ミドルウェア・設定を事前構築"] --> B2["起動時は<br/>イメージをそのまま使うだけ"]
end
subgraph Fry["フライ(Fry): 起動時に構成する"]
F1["素のOSイメージを起動"] --> F2["起動スクリプトや<br/>構成管理ツールで都度セットアップ"]
end

Bake --> BakeTrade["起動が高速・再現性が高いが<br/>イメージのビルドパイプラインが必要"]
Fry --> FryTrade["柔軟だが起動が遅く、<br/>外部リソースへの依存で失敗しやすい"]`,

    'diag-15': `flowchart LR
Dev["開発環境<br/>Development"] --> Staging["ステージング環境<br/>Staging"] --> Prod["本番環境<br/>Production"]

Prod --> Replica1["本番レプリカ<br/>(地域A)"]
Prod --> Replica2["本番レプリカ<br/>(地域B)"]

classDef envFill fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class Dev,Staging,Prod envFill`,

    'diag-16': `flowchart LR
Dev["開発<br/>Development"] --> Build["ビルド<br/>Build"]
Build --> Test["テスト<br/>Test"]
Test --> Release["リリース<br/>Release"]
Release --> Run["実行<br/>Run"]
Run -.フィードバック.-> Dev`,

    'diag-17': `flowchart TB
Local["ローカルでの開発"] --> Emulator["ローカルIaaSエミュレータ<br/>(LocalStack など)"]
Local --> Personal["個人用クラウド環境<br/>(サンドボックスアカウント)"]

Emulator --> Pipeline["CI/CDパイプライン"]
Personal --> Pipeline

Pipeline --> Stage1["ステージ1: 構文チェック"]
Stage1 --> Stage2["ステージ2: 静的解析・ポリシーチェック"]
Stage2 --> Stage3["ステージ3: Plan/Preview"]
Stage3 --> Stage4["ステージ4: テスト環境へApply"]
Stage4 --> Stage5["ステージ5: 自動テスト実行"]
Stage5 --> Stage6["ステージ6: 本番へApply(承認あり)"]`,

    'diag-18': `flowchart TB
subgraph Pyramid["インフラコードのテストピラミッド"]
direction TB
T1["静的解析<br/>(構文チェック・Lint・セキュリティスキャン)<br/>数千件を数十秒で実行"]
T2["Plan検証<br/>(実際に適用する差分の妥当性を確認)"]
T3["統合テスト<br/>(実際にリソースを作成して検証)<br/>実行に数分-数十分"]
T4["本番での検証<br/>(カナリアリリース・段階的ロールアウト)"]
end
T1 --> T2 --> T3 --> T4`,

    'diag-19': `flowchart TB
subgraph Persistent["永続テストスタック"]
P1["常に存在するテスト環境"] --> P2["セットアップ時間は不要だが<br/>テスト間で状態が汚染されるリスク"]
end
subgraph Ephemeral["エフェメラル(使い捨て)テストスタック"]
E1["テストのたびに新規作成"] --> E2["クリーンな状態を保証できるが<br/>作成・削除に時間がかかる"]
end
subgraph Periodic["定期リビルド"]
R1["一定間隔でテスト環境を再構築し<br/>ドリフトを検出・是正する"]
end`,

    'diag-20': `flowchart TB
subgraph Push["Push型デプロイ"]
PA["CI/CDサーバーが<br/>クラウドAPIに直接変更を指示する"]
end
subgraph Pull["Pull型デプロイ"]
PB["エージェントが定期的に<br/>あるべき状態を取得し自ら適用する"]
end
subgraph GitOps["GitOps型デプロイ"]
PC["Gitリポジトリを唯一の情報源とし<br/>オペレーターが差分を検出して自動同期する"]
end`,

    'diag-21': `flowchart LR
Old["旧構成のみ存在"] --> Expand["Expand:<br/>新旧両方の構成を並行稼働させる"]
Expand --> Migrate["トラフィック/データを<br/>段階的に新構成へ移行"]
Migrate --> Contract["Contract:<br/>旧構成を安全に削除する"]`,

    'diag-22': `flowchart LR
subgraph Before["従来: シフトライトな運用"]
B1["開発"] --> B2["デプロイ"] --> B3["監査人が事後チェック"] --> B4["問題発覚 → 手戻り"]
end
subgraph After["シフトレフト後"]
A1["コーディング時にIDEでチェック"] --> A2["コミット時にpre-commitフックでチェック"]
A2 --> A3["CI段階でPolicy as Codeが自動判定"]
A3 --> A4["問題があればマージ前にブロック"]
end`,

    'diag-23': `flowchart TB
T2023["2023年8月<br/>HashiCorpがTerraformを<br/>MPL 2.0 → BSL 1.1へ変更"] --> Fork["Linux Foundation配下で<br/>OpenTofuがフォーク"]
Fork --> GA["2024年1月<br/>OpenTofu 安定版リリース"]
GA --> Diverge["機能面でも分岐が進行<br/>(State暗号化、Provider-defined Functionsなど)"]
T2023 --> IBM["2025年<br/>IBMがHashiCorpを買収完了"]

classDef eventFill fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class T2023,Fork,GA,Diverge,IBM eventFill`,

    'diag-24': `flowchart LR
Dev["開発者がコード変更"] --> PR["プルリクエスト"]
PR --> Review["レビュー・承認"]
Review --> Merge["Gitリポジトリへマージ"]
Merge --> Detect["GitOpsオペレーターが<br/>差分を検知"]
Detect --> Sync["クラスタへ自動適用(同期)"]
Sync --> Report["同期状況をレポート"]
Report -.状態確認.-> Detect`,

    'diag-25': `flowchart TB
Gate["インフラ変更のパイプラインゲート"]
Gate --> Scanner["セキュリティスキャナー<br/>(Checkov, Trivy/tfsec)"]
Gate --> Engine["汎用ポリシーエンジン<br/>(OPA + Rego + Conftest)"]
Gate --> Vendor["ベンダー固有エンジン<br/>(HashiCorp Sentinel)"]

Scanner --> S1["数千件の既知の設定ミスを<br/>ノーコストで即座に検出"]
Engine --> E1["組織固有のルール<br/>(命名規則・許可リージョン・<br/>タグ必須化など)をRegoで記述"]
Vendor --> V1["HCP Terraform/Enterprise環境で<br/>ネイティブに統合"]

classDef gateFill fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class Scanner,Engine,Vendor gateFill`,

    'diag-26': `flowchart TB
S1["Step 1<br/>影響範囲の小さい対象を選ぶ<br/>(新規プロジェクトや検証環境)"] --> S2["Step 2<br/>ツールを1つ選定し、<br/>ローカルでState管理を体験する"]
S2 --> S3["Step 3<br/>単一スタックとして最小構成をコード化<br/>(モノリシックスタックでよい)"]
S3 --> S4["Step 4<br/>Gitリポジトリでバージョン管理を開始し<br/>プルリクエストレビューを必須化する"]
S4 --> S5["Step 5<br/>CIパイプラインにformat/validate/lintを組み込む"]
S5 --> S6["Step 6<br/>静的セキュリティスキャン(Checkov等)を追加"]
S6 --> S7["Step 7<br/>Plan結果を人間がレビューする運用を確立"]
S7 --> S8["Step 8<br/>テスト環境への自動Applyを導入"]
S8 --> S9["Step 9<br/>本番Applyには承認ステップを設けて自動化"]
S9 --> S10["Step 10<br/>手作業変更(ClickOps)を禁止するルールを徹底"]
S10 --> S11["Step 11<br/>スタックが肥大化してきたら<br/>チーム境界に沿って段階的に分割する"]
S11 --> S12["Step 12<br/>Policy as Codeを<br/>Advisoryモードから段階導入する"]

classDef stepFill fill:#1a2942,stroke:#7c9eff,color:#e8edf7
class S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12 stepFill`,
};
