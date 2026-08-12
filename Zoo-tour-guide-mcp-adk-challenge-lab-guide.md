# Cloud Creek Zoo「Zoo Tour Guide」AIエージェント構築チャレンジラボ 完全解説ガイド

> 対象ラボ: [Build a Smart Cloud Application with Vibe Coding and MCP: Challenge Lab](https://www.skills.google/course_templates/1459/labs/620761)（Gemini Enterprise Agent Ready / GEAR プログラム）
>
> このガイドは、Google Cloud上でMCP（Model Context Protocol）サーバーとADK（Agent Development Kit）エージェントを構築・デプロイするチャレンジラボについて、**初学者でも迷わず進められるレベル**までブレークダウンした解説書です。単なる手順の再掲ではなく、各コマンド・各設定が「なぜ必要なのか」を、Google Cloud公式ドキュメントおよび公式コードラボを根拠として提示します。

---

## 目次

1. [シナリオの全体像](#1-シナリオの全体像)
2. [システム全体アーキテクチャ](#2-システム全体アーキテクチャ)
3. [Task 1: 環境構築とAPI有効化](#3-task-1-環境構築とapi有効化)
4. [Task 2: IAMポリシーバインディング](#4-task-2-iamポリシーバインディング)
5. [Task 3: MCPサーバーの修正とCloud Runへのデプロイ](#5-task-3-mcpサーバーの修正とcloud-runへのデプロイ)
6. [Task 4: エージェントとMCPサーバーの連携](#6-task-4-エージェントとmcpサーバーの連携)
7. [Task 5: DockerizeとADKエージェントの本番デプロイ](#7-task-5-dockerizeとadkエージェントの本番デプロイ)
8. [ベストプラクティスまとめ](#8-ベストプラクティスまとめ)
9. [よくあるエラーとトラブルシューティング](#9-よくあるエラーとトラブルシューティング)
10. [参考文献](#10-参考文献)

---

## 1. シナリオの全体像

Cymbal Groupの「Digital Experience」コンサルティング部門として、Cloud Creek Zooの来園者向けAIエージェント「Zoo Tour Guide」を仕上げるのがミッションです。要件を整理すると、実装すべきものは3層に分かれます。

| レイヤー | 役割 | 使用技術 |
|---|---|---|
| データ取得層 | 動物の生息地・種情報をルックアップ | MCPサーバー（zoo server、FastMCP実装） |
| 補助知識層 | 一般的な文脈情報の補完 | Wikipedia参照 + Google Search |
| 対話・オーケストレーション層 | 来園者の質問を解釈し適切なツールを呼び出す | ADK（Agent Development Kit）エージェント |

ジュニアコンサルタントが壊した「zoo server」のPythonコードを直す作業（Task 3）と、IAMポリシーが未整備な状態を是正する作業（Task 2）が、このラボの「実務的なひねり」になっています。単に手順をなぞるだけでなく、**なぜそのAPIやロールが必要か**を理解しておくと、本番環境で類似の構成を組む際に応用が効きます。

---

## 2. システム全体アーキテクチャ

最終形として、以下の2つのCloud Runサービスが連携するアーキテクチャができあがります。

```mermaid
flowchart TB
    User["来園者 / 利用者"]

    subgraph AgentService["Cloud Run: zoo_guide_agent（google-adk 1.17.0以上、2.0.0未満）"]
        Root["root_agent（LlmAgent / Gemini 2.x）"]
        MCPTool["McpToolset：zoo-remoteサーバーに接続"]
        SearchAgent["GoogleSearchTool：bypass_multi_tools_limit=True"]
        Root --> MCPTool
        Root --> SearchAgent
    end

    subgraph McpService["Cloud Run: mcp-on-cloudrun（zoo server / FastMCP）"]
        FastMCP["FastMCPサーバー"]
        ToolA["fetch_animals_by_species"]
        ToolB["fetch_animal_details"]
        FastMCP --> ToolA
        FastMCP --> ToolB
    end

    Wikipedia["Wikipedia（文脈情報の補完）"]
    GoogleSearch["Google Search（最新情報の取得）"]

    User --> Root
    MCPTool -->|"HTTPS + IDトークン認証"| FastMCP
    Root -.->|"文脈参照"| Wikipedia
    SearchAgent --> GoogleSearch
```

ポイントは2つです。

1. **MCPサーバーは`--no-allow-unauthenticated`でデプロイされ、IDトークンによる認証が必須**になる（Task 3・4で扱う）。
2. **ADKの`google_search`組み込みツールは、他のツール（McpToolsetなど）と同一エージェント内で単純併用できない**という既知の制約があり、このガイドではgoogle-adk 1.17.0以上とGemini 2.xを前提に`GoogleSearchTool(bypass_multi_tools_limit=True)`で対処する（Task 5で扱う、後述）。

タスク全体の流れは以下の通りです。

```mermaid
flowchart LR
    T1["Task 1<br/>環境構築 / API有効化"] --> T2["Task 2<br/>IAMポリシー設定"]
    T2 --> T3["Task 3<br/>MCPサーバー修正 / デプロイ"]
    T3 --> T4["Task 4<br/>エージェントとMCPの連携"]
    T4 --> T5["Task 5<br/>Dockerize / 本番デプロイ"]
```

---

## 3. Task 1: 環境構築とAPI有効化

### 3.1 何をするか

Cloud Shell Editorでプロジェクト設定・コードのダウンロード・`.env`ファイルの作成を行い、その後必要なAPIを有効化します。

### 3.2 コマンドの意味を理解する

```bash
gcloud config set project <PROJECT_ID>
```

これはgcloud CLIの**デフォルトプロジェクト**を設定するコマンドです。以降のコマンドで`--project`フラグを省略しても、このプロジェクトに対して実行されます。Cloud Shellはセッションが切れると設定がリセットされることがあるため、ラボ中に認証エラーが出た場合はまずこれを再実行するのが定石です。

```bash
gcloud storage cp gs://<PROJECT_ID>-labconfig-bucket/labs_code.zip .
unzip labs_code.zip
```

Cloud Storageからボイラープレートコードを取得します。ラボ環境ではプロジェクトごとに専用のGCSバケットが用意され、そこに演習用の初期コードが格納されているのが一般的なパターンです。

### 3.3 `.env`ファイルの設計思想

```bash
cd ~/zoo_guide_agent
cat <<EOF > .env
MODEL="<MODEL_NAME>"
SERVICE_ACCOUNT="<PROJECT_NUMBER>-compute@developer.gserviceaccount.com"
MCP_SERVER_URL="https://<MCP_SERVICE>-<HASH>.<REGION>.run.app/mcp/"
GOOGLE_GENAI_USE_ENTERPRISE=1
GOOGLE_CLOUD_PROJECT=<PROJECT_ID>
PROJECT_NUMBER=<PROJECT_NUMBER>
GOOGLE_CLOUD_LOCATION=<REGION>
EOF
```

`.env`にシークレットや接続先URLをハードコードせず環境変数として切り出すのは、**12-Factor App**の設定管理原則に沿ったベストプラクティスです。特に`MCP_SERVER_URL`はTask 3でCloud Runにデプロイした後にしか確定しない値のため、後から書き換える前提の設計になっています。

`SERVICE_ACCOUNT`が`<PROJECT_NUMBER>-compute@developer.gserviceaccount.com`という形式になっているのは、Compute Engineのデフォルトサービスアカウントを指しています。Cloud Runもデフォルトではこのサービスアカウントの権限で動作するため、Task 2のIAM設定と直接関係してきます。

### 3.4 有効化すべきAPI

| API | 役割 |
|---|---|
| Agent Platform API | ADKエージェントがGeminiモデル・エンタープライズAI機能を利用するための基盤API |
| Artifact Registry API | Cloud Runデプロイ時にコンテナイメージを保存するレジストリ |
| Cloud Build API | ソースコードからコンテナイメージをビルドする（`gcloud run deploy --source=.`の裏側） |
| Cloud Run Admin API | Cloud Runサービスの作成・更新・管理 |

```bash
gcloud services enable \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    aiplatform.googleapis.com \
    --project=<PROJECT_ID>
```

**ベストプラクティス:** APIの有効化には`serviceusage.services.enable`権限が必要です。自分がプロジェクトオーナーでない場合は、Service Usage Admin（`roles/serviceusage.serviceUsageAdmin`）ロールを管理者に依頼する必要があります。ラボ環境では学生アカウントに最初から付与されていますが、実務のプロジェクトでは明示的に確認すべきポイントです。

### 3.5 根拠・参考ソース

- Agent Platform APIの有効化手順とロール要件: [Get started with Gemini Enterprise Agent Platform（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start)
- APIを有効化するために必要な権限（`serviceusage.services.enable`）: [Build and deploy an AI agent to Cloud Run using ADK（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/ai/build-and-deploy-ai-agents/adk)

---

## 4. Task 2: IAMポリシーバインディング

### 4.1 なぜIAM設定が「タスク」として独立しているのか

このラボの物語上、「プロジェクトのアーキテクチャがCymbal Groupの厳格なIAMポリシーに則って確定していなかった」という設定になっています。これは実務でも非常によくある状況で、**最小権限の原則（Principle of Least Privilege）**に基づき、自動化サービス（Cloud Build、Cloud Run）が相互に呼び出し合うために必要な権限だけを、必要な主体（ユーザーまたはサービスアカウント）に絞って付与する作業です。

### 4.2 付与すべきロール

| 主体 | ロール | ロールID | 付与理由 |
|---|---|---|---|
| デプロイ主体 | Cloud Run Source Developer | `roles/run.sourceDeveloper` | ソースからCloud Runサービスをビルド・デプロイする |
| デプロイ主体 | Service Usage Consumer | `roles/serviceusage.serviceUsageConsumer` | デプロイ時にプロジェクトの有効なAPIを利用する |
| デプロイ主体 | Service Account User | `roles/iam.serviceAccountUser` | Cloud Run実行用サービスアカウントとして動作させる権限を持つ |
| ビルドサービスアカウント | Cloud Run Builder | `roles/run.builder` | ソースからコンテナイメージをビルドする |
| 実行用サービスアカウント | Vertex AI User | `roles/aiplatform.user` | Vertex AI基盤でモデル推論・エージェント実行を行う |
| 実行用サービスアカウント | Cloud Run Invoker | `roles/run.invoker` | IAM保護されたMCP Cloud Runサービスを呼び出す |

`roles/run.admin`は広い管理権限を含むため、ソースデプロイの最小権限として扱いません。デプロイ主体・ビルド主体・実行主体を分け、それぞれに必要なロールだけを付与します。

### 4.3 コマンドの型

```bash
gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="user:<USER_EMAIL>" \
    --role="roles/run.sourceDeveloper"

gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="user:<USER_EMAIL>" \
    --role="roles/serviceusage.serviceUsageConsumer"

gcloud iam service-accounts add-iam-policy-binding \
    <PROJECT_NUMBER>-compute@developer.gserviceaccount.com \
    --member="user:<USER_EMAIL>" \
    --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --role="roles/run.builder"

gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --role="roles/aiplatform.user"
```

`--member`は`user:`、`group:`、`serviceAccount:`などのプレフィックスで主体の種類を明示する必要があります。ここを間違える（例: `serviceAccount:`とすべきところを`user:`にする）のは、実務でも頻発するミスです。

**ベストプラクティス:** 基本ロール（Owner / Editor / Viewer）やCloud Run Adminを安易に付与せず、目的に応じた事前定義ロール（predefined role）を主体ごとに使い分けることで、影響範囲を最小化できます。

### 4.4 根拠・参考ソース

- Cloud Runのソースデプロイに必要な主体別ロール: [Cloud Run IAM roles（Cloud Run 公式ドキュメント）](https://docs.cloud.google.com/run/docs/reference/iam/roles)
- `gcloud projects add-iam-policy-binding`コマンドリファレンス: [gcloud projects add-iam-policy-binding（Google Cloud SDK 公式ドキュメント）](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding)
- Agent Platform Userロール（`roles/aiplatform.user`）の定義: [Get started with Gemini Enterprise Agent Platform（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start)
- IAMロール付与の一般手順: [Manage access to projects, folders, and organizations（IAM 公式ドキュメント）](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access)

---

## 5. Task 3: MCPサーバーの修正とCloud Runへのデプロイ

### 5.1 ローカルでの再現・修正・テストのフロー

このタスクの本質は「エラーメッセージを読んで自力でデバッグする」ことです。Gemini CLIを使ってPythonコードのバグを修正する流れを図解します。

```mermaid
sequenceDiagram
    participant Dev as 開発者（あなた）
    participant Shell as Cloud Shellターミナル
    participant Gemini as Gemini CLI
    participant Server as server.py（FastMCP）

    Dev->>Shell: uv run server.py
    Shell->>Server: 起動を試行
    Server-->>Shell: エラーを出力
    Dev->>Gemini: gemini コマンドでCLIを起動
    Gemini->>Server: エラー内容を解析しコードを修正
    Gemini-->>Dev: 修正内容の実行許可を確認
    Dev->>Gemini: ESCでコード実行はキャンセル（修正のみ反映）
    Dev->>Shell: uv run server.py（再実行）
    Shell->>Server: 起動成功
    Dev->>Shell: 別ターミナルで uv run local_mcp_call.py
    Shell->>Server: MCPツール呼び出し（walrus情報取得）
    Server-->>Shell: CallToolResultとして構造化データを返却
```

**なぜGemini CLIに実行許可を求められたらESCでキャンセルするのか:** Gemini CLIはエージェント的にコード変更後そのままPythonファイルを実行しようとすることがありますが、ラボの意図は「コードの修正」であり、実行そのものはCLIの外側（自分のターミナル）で行うことで、修正結果を確実に目視確認するためです。

### 5.2 ここで使われているMCPサーバーの実装パターン

`mcp-on-cloudrun`ディレクトリの構成（`Dockerfile`, `server.py`, `pyproject.toml`, `uv.lock`）は、GoogleがCloud Runドキュメントで公式に案内しているMCPサーバー構築パターンそのものです。`uv`（高速なPythonパッケージ・プロジェクトマネージャー）を使ってFastMCPベースのサーバーを構築するのが、2025年後半以降のGoogle公式チュートリアルにおける標準的な作法になっています。

このラボの題材（zoo server、`fetch_animals_by_species`のようなツール名）は、Google公式の「Cloud Runにセキュアなmcpサーバーをデプロイする」コードラボと同系統の教材であり、FastMCPで`get_animals_by_species`や`get_animal_details`のようなツールを持つzoo MCPサーバーを構築する内容が公式に公開されています。

### 5.3 Cloud Runへのデプロイコマンドの読み解き

```bash
gcloud run deploy <MCP_SERVICE_NAME> \
    --no-allow-unauthenticated \
    --region=<REGION> \
    --source=. \
    --min=1 \
    --project=<PROJECT_ID> \
    --labels=lab-dev=mcp-zoo-cloud-run-service
```

デプロイ後、ADKエージェントの実行用サービスアカウントにMCPサービスの呼び出し権限を付与します。

```bash
gcloud run services add-iam-policy-binding <MCP_SERVICE_NAME> \
    --region=<REGION> \
    --project=<PROJECT_ID> \
    --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --role="roles/run.invoker"
```

| フラグ | 意味 |
|---|---|
| `--no-allow-unauthenticated` | 未認証アクセスを拒否し、IAM（IDトークン）による認証を必須にする |
| `--source=.` | カレントディレクトリのソースコードをCloud Buildでビルドしてデプロイ（Dockerfileを直接使うか、Buildpacksで自動ビルドされる） |
| `--min=1` | 最小インスタンス数を1に設定し、コールドスタートの遅延を回避（常時1インスタンスが起動しているため課金は発生し続ける点に注意） |
| `--labels=` | リソースにラベルを付与し、コスト管理・棚卸しをしやすくする |

**ベストプラクティス（`--no-allow-unauthenticated`が重要な理由）:** MCPサーバーは動物データという機微ではない情報を扱っていますが、「誰でも呼び出せるエンドポイント」を放置すると、意図しない大量アクセスによるコスト増や、将来機能追加した際の情報漏えいリスクにつながります。Google Cloudの公式チュートリアルでも、MCPサーバーをCloud Runにデプロイする際はセキュリティ上の理由から一貫して`--no-allow-unauthenticated`を使うことが強調されています。

### 5.4 根拠・参考ソース

- リモートMCPサーバーのCloud Run構築チュートリアル（`uv init`、`pyproject.toml`、`server.py`の標準構成）: [Build and deploy a remote MCP server on Cloud Run（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/tutorials/deploy-remote-mcp-server)
- `--no-allow-unauthenticated`を使うべき理由の解説: [Build and Deploy a Remote MCP Server to Google Cloud Run in Under 10 Minutes（Google Cloud公式ブログ）](https://cloud.google.com/blog/topics/developers-practitioners/build-and-deploy-a-remote-mcp-server-to-google-cloud-run-in-under-10-minutes)
- zoo MCPサーバー（`get_animals_by_species`等）を題材にした公式コードラボ: [How to deploy a secure MCP server on Cloud Run（Google Codelabs）](https://codelabs.developers.google.com/codelabs/cloud-run/how-to-deploy-a-secure-mcp-server-on-cloud-run)
- Cloud Run上でのMCPサーバーホスティング全般のベストプラクティス: [Host MCP servers on Cloud Run（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/host-mcp-servers)
- Cloud Runサービス間認証と`roles/run.invoker`: [Authenticating service-to-service（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/authenticating/service-to-service)

---

## 6. Task 4: エージェントとMCPサーバーの連携

### 6.1 IDトークン認証の仕組み

`--no-allow-unauthenticated`でデプロイしたMCPサーバーに、Gemini CLIやADKエージェントからアクセスするには、リクエストヘッダーに有効なGoogle発行のIDトークンを添付する必要があります。

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant CLI as Gemini CLI
    participant IAM as Google認証基盤
    participant MCP as MCPサーバー（Cloud Run）

    User->>CLI: gcloud auth print-identity-token を実行
    CLI->>IAM: IDトークン発行をリクエスト
    IAM-->>CLI: 短命のIDトークンを返却
    User->>CLI: settings.jsonのAuthorizationヘッダーに設定
    CLI->>MCP: HTTPSリクエスト（Bearer <IDトークン>）
    MCP->>MCP: IAMでトークンを検証
    MCP-->>CLI: 認証成功、MCPツールの応答を返却
```

**重要な注意点:** `gcloud auth print-identity-token`で発行されるIDトークンは**短命（有効期限が短い）**です。ラボ手順で「認証エラーが出たら`/quit`してプロジェクトを再設定する」という注意書きがあるのは、このトークンが失効した際の典型的な対処法を指しています。本番運用では、都度手動でトークンを発行するのではなく、サービスアカウントの権限借用（impersonation）やGemini CLIの`authProviderType: service_account_impersonation`のような仕組みを使うのがベストプラクティスです。

### 6.2 `~/.gemini/settings.json`の構造

```json
{
  "mcpServers": {
    "zoo-remote": {
      "httpUrl": "https://<MCP_SERVICE>-<HASH>.<REGION>.run.app/mcp/",
      "headers": {
        "Authorization": "Bearer $ID_TOKEN"
      }
    }
  },
  "selectedAuthType": "compute-default-credentials",
  "hasSeenIdeIntegrationNudge": true
}
```

| キー | 役割 |
|---|---|
| `mcpServers.<name>.httpUrl` | Streamable HTTPトランスポートでMCPサーバーに接続するエンドポイント（末尾の`/mcp/`が必須） |
| `headers.Authorization` | Bearerトークン形式で認証情報を渡す。`$ID_TOKEN`は環境変数展開される |
| `selectedAuthType` | Gemini CLI自体の認証方式。Compute Engineのデフォルト認証情報を使う設定 |

Gemini CLIはこの設定ファイルの`httpUrl` + `headers`の組み合わせをMCPサーバー接続の標準パターンとして公式にサポートしており、Bearerトークンをヘッダーに載せる方式は他社のMCPサーバー（GitHub MCP Serverなど）でも同一の構文が使われています。

### 6.3 Gemini CLIでの検証手順の意味

- `/mcp`のようなスラッシュコマンドでMCPツール一覧を確認する → 接続が正しく確立されているかを最初に確認するステップ
- `Where can I find penguins?`という自然文プロンプト → LLMがMCPツール（`fetch_animals_by_species`等）を自律的に選択して呼び出せるかの検証
- `always allow all tools from the zoo-remote MCP server`を選択 → 開発中は毎回の確認プロンプトを省略できるが、**本番のエージェントに同じ設定を持ち込む場合は、ツールの安全性を精査した上で許可範囲を絞るべき**
- カスタムコマンド`/find --animal="lion"`→ MCPプロンプト機能（MCP Prompts）を使い、定型的なツール呼び出し＋フォーマットをショートカット化する仕組み

### 6.4 サーバーログの確認

```bash
gcloud run services logs read <MCP_SERVICE_NAME> --region <REGION> --limit=5
```

Cloud Runサービスのログを直接読み取ることで、「ツール呼び出しが実際にサーバー側まで到達したか」をエンドツーエンドで確認できます。エージェント側でエラーが出た際、原因がエージェント側にあるのかMCPサーバー側にあるのかを切り分ける基本動作です。

### 6.5 根拠・参考ソース

- Gemini CLIのMCPサーバー設定（`httpUrl`、`headers`、Bearerトークン方式）の公式仕様: [MCP servers with the Gemini CLI（google-gemini/gemini-cli 公式リポジトリ）](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md)
- サービスアカウント権限借用によるIAM保護されたMCPサーバーへの本番接続パターン（`service_account_impersonation`）: 同上ドキュメント内 `myIapProtectedServer` の設定例
- Cloud Runサービスのログ確認コマンド: [Access control with IAM（Cloud Run 公式ドキュメント）](https://docs.cloud.google.com/run/docs/securing/managing-access)

---

## 7. Task 5: DockerizeとADKエージェントの本番デプロイ

### 7.1 `agent.py`のTODOで最も重要な落とし穴: google_searchとMCPツールの併用制限

ADKには「1つのエージェント内で組み込みツール（`google_search`など）を他のツールと単純併用できない」という既知の制約があります。本手順は`google-adk>=1.17.0,<2.0.0`だけをサポートし、`GoogleSearchTool(bypass_multi_tools_limit=True)`と`McpToolset`を同じroot_agentへ登録します。

```text
400 INVALID_ARGUMENT: Multiple tools are supported only when they are all search tools.
```

`bypass_multi_tools_limit`とMcpToolsetの動的`header_provider`はv1.17.0で追加されたため、本番用の以下の実装では依存関係を明示的に固定します。

```text
google-adk>=1.17.0,<2.0.0
```

`GoogleSearchTool`を使い、Cloud Run上の実行用サービスアカウントから短命のIDトークンを動的に取得します。`fetch_id_token`はCloud Runにアタッチされた`SERVICE_ACCOUNT`のApplication Default Credentialsを使用します。`.env`の`MCP_SERVER_URL`は`/mcp/`を含む接続先なので、Cloud Runがaudienceとして要求するサービスURL部分を取り出して使います。固定の`ID_TOKEN`は`.env`へ保存しません。`GoogleSearchTool`はGemini 1.xで他のツールと併用すると`ValueError`になるため、この実装では`MODEL`をGemini 2.xに限定して起動時に検証します。

```python
from google.auth.transport.requests import Request
from google.oauth2 import id_token
from google.adk.agents import Agent
from google.adk.tools.google_search_tool import GoogleSearchTool
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams
from google.adk.tools.mcp_tool.mcp_toolset import McpToolset

if not MODEL.startswith("gemini-2."):
    raise ValueError("MODEL must be a Gemini 2.x model when Google Search and MCP tools are combined.")

MCP_AUDIENCE = MCP_SERVER_URL.removesuffix("/mcp/")
auth_request = Request()


def mcp_header_provider(_context):
    token = id_token.fetch_id_token(auth_request, MCP_AUDIENCE)
    return {"Authorization": f"Bearer {token}"}

mcp_toolset = McpToolset(
    connection_params=StreamableHTTPConnectionParams(
        url=MCP_SERVER_URL,
    ),
    header_provider=mcp_header_provider,
)

root_agent = Agent(
    model=MODEL,
    name="zoo_guide_agent",
    instruction="動物情報はMCPツール、最新の一般情報はGoogle Searchで回答します。",
    tools=[mcp_toolset, GoogleSearchTool(bypass_multi_tools_limit=True)],
)
```

### 7.2 ローカルでのADK動作確認

本番手順で使用する依存関係ファイルを作成します。

```bash
cd ~/zoo_guide_agent
cat <<'EOF' > requirements.txt
google-adk>=1.17.0,<2.0.0
EOF
```

```bash
cd ~/zoo_guide_agent
python --version
python -c 'import sys; sys.exit("Python 3.10以上が必要です。処理を中止します。") if sys.version_info < (3, 10) else None'
```

表示されたバージョンがPython 3.10以上であることを確認します。Python 3.10未満の場合は2つ目のコマンドが失敗するため、ここで処理を中止し、Pythonを更新してから以降の手順を実行してください。要件を満たす場合のみ、仮想環境を作成します。

```bash
cd ~/zoo_guide_agent
python -m venv ../zoo_guide_venv
source ../zoo_guide_venv/bin/activate
pip install --no-cache-dir -r requirements.txt
python -c "from importlib.metadata import version; print(version('google-adk'))"
cd ~
adk web
```

**ベストプラクティス:** 仮想環境（`venv`）を切ってから依存関係をインストールするのは、Cloud Shellのグローバルなpython環境を汚染しないための基本動作です。`adk web`は`zoo_guide_agent`ディレクトリの**親ディレクトリ**から実行する必要がある点に注意してください（ADKはディレクトリ構成からエージェントパッケージを自動検出する設計になっています）。

### 7.3 Cloud Runへの本番デプロイコマンド

```bash
cd ~/zoo_guide_agent
adk deploy cloud_run \
  --project=<PROJECT_ID> \
  --region=<REGION> \
  --service_name=<AGENT_SERVICE_NAME> \
  . \
  -- \
  --labels=lab-dev=cloud-zoo-run-adk-service
```

| フラグ | 意味 |
|---|---|
| `--project` / `--region` | デプロイ先プロジェクトとリージョン（モデルが利用可能なリージョンを選ぶ必要がある点に注意） |
| `--service_name` | Cloud Runサービス名。省略時は`adk-default-service-name`になる |
| `.` | エージェントコードのソースディレクトリ（カレントディレクトリ） |
| `--`以降 | `adk deploy cloud_run`ではなく、内部で呼び出される`gcloud run deploy`にそのまま渡される追加フラグ |

`adk deploy cloud_run`は、エージェントコードのパッケージング、コンテナイメージのビルド、Artifact Registryへのプッシュ、Cloud Runへのデプロイを1コマンドで完結させるADK CLIの機能です。裏側ではCloud BuildとCloud Run Admin APIが使われるため、Task 1・2で有効化・権限付与した内容がここで実際に効いてきます。

ADK開発者Web UIは本番サービスへ同梱せず、7.2のローカル`adk web`でのみ使用します。未認証呼び出しを許可するかという確認には、来園者向け公開要件がある場合に限って`y`を選びます。

### 7.4 デプロイ後の検証

公開サービスの場合は、デプロイ完了後に出力される`Service URL`を直接開きます。未認証アクセスを拒否する非公開サービスではService URLへ直接アクセスせず、Cloud Shellで次のローカルプロキシを起動し、`http://127.0.0.1:8080`を開きます。

```bash
gcloud run services proxy <AGENT_SERVICE_NAME> \
  --project=<PROJECT_ID> \
  --region=<REGION> \
  --port=8080
```

別のCloud Shellターミナルで、公開サービスなら`<SERVICE_URL>`、非公開サービスなら上記プロキシのURLをAPIの接続先に設定します。次に検証用セッションを作成し、質問リクエストをストリーミングAPIへ送信します。

```bash
export AGENT_BASE_URL="<SERVICE_URL_OR_HTTP_127.0.0.1_8080>"
SESSION_ID="verification-$(date +%s)"

curl --fail-with-body --silent --show-error \
  -X POST \
  -H 'Content-Type: application/json' \
  "$AGENT_BASE_URL/apps/zoo_guide_agent/users/verification-user/sessions" \
  -d @- <<EOF
{
  "session_id": "$SESSION_ID",
  "state": {}
}
EOF

curl --fail-with-body --no-buffer --silent --show-error \
  -X POST \
  -H 'Content-Type: application/json' \
  "$AGENT_BASE_URL/run_sse" \
  -d @- <<EOF
{
  "app_name": "zoo_guide_agent",
  "user_id": "verification-user",
  "session_id": "$SESSION_ID",
  "new_message": {
    "role": "user",
    "parts": [{"text": "Where can I find elephants, and what is the latest conservation news about them?"}]
  },
  "streaming": true
}
EOF
```

返却されるストリーミング応答を読み、動物園情報を取得するMCPツール呼び出しと、最新情報を取得するGoogle Search呼び出しの両方が関数呼び出しイベントとして含まれることを確認します。両方のイベントと最終回答が連続して返れば、7.1の実装が本番APIで機能しています。

### 7.5 根拠・参考ソース

- `adk deploy cloud_run`コマンドのフラグ仕様（`--service_name`等）: [Cloud Run - Agent Development Kit (ADK)（Google公式ADKドキュメント）](https://google.github.io/adk-docs/deploy/cloud-run/)
- zoo-tour-guideを題材にしたADK公式デプロイチュートリアル: [Build and deploy an ADK agent on Cloud Run（Google Codelabs）](https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/5-deploying-agents/deploy-an-adk-agent-to-cloud-run)
- Cloud Run上でのADKエージェントの一般的なビルド・デプロイ手順: [Build and deploy an AI agent to Cloud Run using ADK（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/ai/build-and-deploy-ai-agents/adk)
- McpToolset / StreamableHTTPConnectionParamsの公式仕様: [MCP tools - Agent Development Kit (ADK)（Google公式ADKドキュメント）](https://google.github.io/adk-docs/tools/mcp-tools/)
- `GoogleSearchTool(bypass_multi_tools_limit=True)`と動的`header_provider`が追加されたバージョン: [google-adk v1.17.0 release notes（Google公式GitHub）](https://github.com/google/adk-python/discussions/3257)
- Cloud Run実行サービスアカウントによる短命IDトークンの取得: [Authenticating service-to-service（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/authenticating/service-to-service)

---

## 8. ベストプラクティスまとめ

このガイドの`uv`、`python`、`pip`、`adk`、`gcloud`コマンドは、外部のCloud Shellラボで実行する手順です。リポジトリ自体の開発・検証コマンドのみBunへ統一し、ラボのCLIコマンドを`bun run`や`bunx`へ置き換えてはいけません。

```mermaid
flowchart TB
    A["最小権限のIAM設計<br/>基本ロールでなく事前定義ロールを使う"]
    B["MCPサーバーは常に認証必須<br/>--no-allow-unauthenticated"]
    C["設定は環境変数に外出し<br/>.env / settings.jsonで秘匿情報を分離"]
    D["ADKバージョンとモデルに応じて<br/>検索ツールの実装を選択"]
    E["ローカル検証してからCloud Runへ<br/>uv run / adk web で先に動作確認"]
    F["ログでエンドツーエンド検証<br/>gcloud run services logs read"]

    A --> B --> C --> D --> E --> F
```

| # | 原則 | このラボでの実例 |
|---|---|---|
| 1 | 最小権限 | デプロイ・ビルド・実行主体を分け、各主体に必要な事前定義ロールだけを付与 |
| 2 | ゼロトラストに近い認証設計 | MCPサーバーを`--no-allow-unauthenticated`でデプロイし、IDトークンで検証 |
| 3 | 設定と秘匿情報の分離 | `.env`にURLやプロジェクト情報、`settings.json`にMCP接続情報を分離管理 |
| 4 | フレームワークの制約を事前に把握する | `google-adk>=1.17.0,<2.0.0`とGemini 2.xで`bypass_multi_tools_limit=True`を適用 |
| 5 | ローカルファースト検証 | `uv run server.py` → `adk web`の順でローカル確認してから本番デプロイ |
| 6 | 可観測性の確保 | Cloud Runログを都度確認し、問題の切り分けを迅速に行う |

---

## 9. よくあるエラーとトラブルシューティング

| 症状 | 想定される原因 | 対処 |
|---|---|---|
| `uv run server.py`実行時にエラー | ジュニアコンサルタントが混入させたバグ（インポート漏れ、型不一致など） | Gemini CLIでエラーメッセージを渡し、修正案を確認。実行はESCでキャンセルし手動で再実行 |
| `google.logging.v2.WriteLogEntriesPartialErrors` | プロジェクト設定がリセットされている | `gcloud config set project <PROJECT_ID>`を再実行 |
| Gemini CLIで認証エラー | `ID_TOKEN`の有効期限切れ | `/quit`で終了し、`gcloud config set project`後にトークンを再発行して再起動 |
| Cloud Runデプロイで`Quota exceeded for total allowable CPU` | リージョンのCPUクォータに達している | 少し待ってから同じコマンドを再実行 |
| `400 INVALID_ARGUMENT: Multiple tools are supported only when they are all search tools` | ADKバージョンやモデルに合わない方法で`google_search`を他のツールと混在させている | 7.1を参照し、`google-adk>=1.17.0,<2.0.0`・Gemini 2.x・`bypass_multi_tools_limit=True`の組み合わせを確認する |
| ADKデプロイ時に未認証呼び出しの確認プロンプト | Cloud Runサービスの公開設定が未確定 | 公開要件がある場合のみ`y`で許可する |

---

## 10. 参考文献

1. [Get started with Gemini Enterprise Agent Platform（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start)
2. [Access control with IAM（Cloud Run 公式ドキュメント）](https://docs.cloud.google.com/run/docs/securing/managing-access)
3. [gcloud projects add-iam-policy-binding（Google Cloud SDK 公式ドキュメント）](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding)
4. [Manage access to projects, folders, and organizations（IAM 公式ドキュメント）](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access)
5. [Build and deploy a remote MCP server on Cloud Run（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/tutorials/deploy-remote-mcp-server)
6. [Build and Deploy a Remote MCP Server to Google Cloud Run in Under 10 Minutes（Google Cloud公式ブログ）](https://cloud.google.com/blog/topics/developers-practitioners/build-and-deploy-a-remote-mcp-server-to-google-cloud-run-in-under-10-minutes)
7. [Host MCP servers on Cloud Run（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/host-mcp-servers)
8. [Use the Cloud Run remote MCP server（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/use-cloud-run-mcp)
9. [How to deploy a secure MCP server on Cloud Run（Google Codelabs）](https://codelabs.developers.google.com/codelabs/cloud-run/how-to-deploy-a-secure-mcp-server-on-cloud-run)
10. [MCP servers with the Gemini CLI（google-gemini/gemini-cli 公式リポジトリ）](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md)
11. [Cloud Run - Agent Development Kit (ADK)（Google公式ADKドキュメント）](https://google.github.io/adk-docs/deploy/cloud-run/)
12. [Build and deploy an ADK agent on Cloud Run（Google Codelabs）](https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/5-deploying-agents/deploy-an-adk-agent-to-cloud-run)
13. [Build and deploy an AI agent to Cloud Run using ADK（Google Cloud公式ドキュメント）](https://docs.cloud.google.com/run/docs/ai/build-and-deploy-ai-agents/adk)
14. [MCP tools - Agent Development Kit (ADK)（Google公式ADKドキュメント）](https://google.github.io/adk-docs/tools/mcp-tools/)
15. [Support using enterprise_web_search built-in tool with other tools in the same agent（google/adk-python Issue #3412）](https://github.com/google/adk-python/issues/3412)
16. [ADK: Root agent with sub_agents fails if sub-agents use a mix of VertexAiSearchTool and custom function tools（google/adk-python Issue #899）](https://github.com/google/adk-python/issues/899)

---

*本ガイドはGoogle Cloud Skills Boostのチャレンジラボ学習を補助する目的で作成された非公式の解説資料です。実際のラボ画面・値（プロジェクトID、リージョン、サービス名など）はラボ開始時に自動採番されるため、本ガイド内の`<PLACEHOLDER>`表記は各自のラボ環境の値に読み替えてください。*
