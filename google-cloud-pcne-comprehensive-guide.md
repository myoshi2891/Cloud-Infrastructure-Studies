# Google Cloud Professional Cloud Network Engineer

## 試験完全対策ガイド 〜 初学者から合格まで完全マスター 〜

> **対象読者**: ネットワーク初学者〜中級者 / クラウドネットワーク設計者  
> **試験時間**: 120分 / 問題数: 50〜60問 / 受験料: $200  
> **有効期間**: 2年間 / 推奨経験: 3年以上のネットワーク設計・実装経験  
> **本ガイド作成日**: 2026年4月

---

## 📋 目次

1. [試験概要と出題セクション](#1-試験概要と出題セクション)
2. [VPC（Virtual Private Cloud）の設計と実装](#2-vpcvirtual-private-cloudの設計と実装)
3. [ハイブリッド接続とネットワーク相互接続](#3-ハイブリッド接続とネットワーク相互接続)
4. [ロードバランシングとトラフィック管理](#4-ロードバランシングとトラフィック管理)
5. [クラウドDNS・ルーティング・ネットワークサービス](#5-クラウドdnsルーティングネットワークサービス)
6. [ネットワークセキュリティ設計と実装](#6-ネットワークセキュリティ設計と実装)
7. [ネットワーク監視・トラブルシューティング](#7-ネットワーク監視トラブルシューティング)
8. [コスト最適化とネットワーク設計パターン](#8-コスト最適化とネットワーク設計パターン)
9. [頻出サービス早見表と試験攻略チェックリスト](#9-頻出サービス早見表と試験攻略チェックリスト)

---

## 1. 試験概要と出題セクション

### 1.1 Professional Cloud Network Engineer とは？

**Professional Cloud Network Engineer（PCNE）**は、Google Cloud のネットワークインフラを設計・実装・管理・最適化する能力を証明する上級認定資格です。

この試験では以下の実践能力が問われます。

- Google Cloud ネットワークの**設計・計画・プロトタイピング**
- **VPC・サブネット・ファイアウォール**の適切な設計
- **ハイブリッドクラウド接続**（オンプレミス ↔ GCP）の設計
- **ロードバランシング**の選定と実装
- ネットワークの**監視・トラブルシューティング**

### 1.2 出題セクション別 配点

| セクション | テーマ | 配点目安 |
|---|---|---|
| Section 1 | VPCネットワークの設計・実装 | ~21% |
| Section 2 | ハイブリッド接続・ネットワーク相互接続 | ~23% |
| Section 3 | ロードバランシングとトラフィック管理 | ~19% |
| Section 4 | CDN・DNS・IPアドレス管理 | ~15% |
| Section 5 | ネットワークセキュリティの設計と実装 | ~12% |
| Section 6 | ネットワーク操作と監視 | ~10% |

### 1.3 試験の準備方法

```
推奨学習ステップ:

Step 1: 公式試験ガイドを熟読する（必須）
  └── https://cloud.google.com/learn/certification/cloud-network-engineer

Step 2: Cloud Skills Boost の PCNE ラーニングパスを修了
  └── https://www.cloudskillsboost.google/paths/14

Step 3: ハンズオンラボで実際に操作する
  └── VPC・Cloud VPN・Cloud Interconnect・LB の構築

Step 4: 公式サンプル問題を解く

Step 5: 弱点分野を公式ドキュメントで補強

Step 6: 試験登録
  └── https://cp.certmetrics.com/google/en/login
```

> 📎 **公式リソース**  
> 試験ページ: https://cloud.google.com/learn/certification/cloud-network-engineer  
> 試験ガイド: https://cloud.google.com/learn/certification/guides/cloud-network-engineer

---

## 2. VPC（Virtual Private Cloud）の設計と実装

### 2.1 VPC の根本概念

**VPC（Virtual Private Cloud）**は Google Cloud における**ソフトウェア定義ネットワーク（SDN）**の実装です。物理的なネットワーク機器ではなく、Googleのグローバルインフラ上に仮想的に構築されたプライベートネットワークです。

#### VPC の最大の特徴：グローバルスコープ

```
従来のクラウド（AWSなど）:
  ┌── リージョン A ──┐    ┌── リージョン B ──┐
  │  VPC（独立）      │    │  VPC（独立）      │
  │  10.0.0.0/16     │    │  10.1.0.0/16     │
  └──────────────────┘    └──────────────────┘
  → リージョン間は別々のVPC → ピアリング等が必要

Google Cloud VPC:
  ┌──────────────────── 単一のグローバルVPC ────────────────────┐
  │                                                              │
  │  us-central1         europe-west1         asia-northeast1   │
  │  サブネット           サブネット             サブネット         │
  │  10.0.0.0/24         10.0.1.0/24           10.0.2.0/24      │
  │       ↕ Googleのグローバルバックボーンで自動接続 ↕            │
  └──────────────────────────────────────────────────────────────┘
  → 1つのVPCでグローバル展開！リージョン間のルーティングが自動
```

#### VPC の2つのモード

| モード | 説明 | 用途 | 注意点 |
|---|---|---|---|
| **Auto Mode** | 各リージョンに自動でサブネット作成 (`10.128.0.0/9`) | 開発・検証環境 | IPレンジが固定、オンプレとの重複リスクあり |
| **Custom Mode** | サブネットを手動で設計・作成 | 本番環境・エンタープライズ | 設計工数がかかるが柔軟 |

> ⚠️ **重要**: Auto Mode VPC は本番環境では**非推奨**。  
> 理由：`10.128.0.0/9` のレンジが固定されており、オンプレCIDRとの重複が発生しやすいため。

### 2.2 サブネットの設計原則

#### サブネットのスコープ：リージョナル

```
VPC（グローバル）
├── サブネット: us-central1-subnet    → us-central1 のリソースが属する
├── サブネット: europe-west1-subnet   → europe-west1 のリソースが属する
└── サブネット: asia-northeast1-subnet→ asia-northeast1 のリソースが属する

重要：サブネットはリージョンスコープ（ゾーンをまたがる）
┌── us-central1 サブネット（10.0.0.0/24）──────────┐
│  ┌── Zone A ──┐  ┌── Zone B ──┐  ┌── Zone C ──┐ │
│  │ VM: 10.0.0.5│  │ VM: 10.0.0.6│  │ VM: 10.0.0.7│ │
│  └────────────┘  └────────────┘  └────────────┘ │
└──────────────────────────────────────────────────┘
同じサブネットのVMはゾーンをまたいで通信可能（レイテンシは考慮）
```

#### CIDR 設計のベストプラクティス

```
推奨 CIDR 設計例（RFC 1918プライベートIPレンジ）:

10.0.0.0/8    → 大規模組織向け（16,777,214 ホスト）
172.16.0.0/12 → 中規模組織向け（1,048,574 ホスト）
192.168.0.0/16→ 小規模組織向け（65,534 ホスト）

環境別サブネット設計例:
  組織 CIDR: 10.0.0.0/8

  ┌── Production VPC ─────────────────────────────┐
  │  us-central1   : 10.1.0.0/16                  │
  │    web-subnet  : 10.1.1.0/24  (254 hosts)     │
  │    app-subnet  : 10.1.2.0/24  (254 hosts)     │
  │    db-subnet   : 10.1.3.0/24  (254 hosts)     │
  │  europe-west1  : 10.2.0.0/16                  │
  │  asia-northeast1: 10.3.0.0/16                 │
  └───────────────────────────────────────────────┘

  ┌── Staging VPC ──────────────────────────────  ┐
  │  us-central1   : 10.10.0.0/16                 │
  └───────────────────────────────────────────────┘

  ┌── Development VPC ──────────────────────────  ┐
  │  us-central1   : 10.20.0.0/16                 │
  └───────────────────────────────────────────────┘
```

#### サブネット拡張の注意点

- サブネットの CIDR は**拡張のみ可能**（縮小は不可）
- 例：`/24` → `/22` は可能、`/24` → `/26` は不可
- 拡張時のダウンタイムなし
- **プライマリレンジ**と**セカンダリレンジ**の使い分け

```
セカンダリレンジの用途：
  GKEのPod/ServiceのIPアドレス空間として活用

  サブネット: 10.0.0.0/24 (プライマリ → VMのIP)
    セカンダリレンジ1: 10.100.0.0/16 (GKE Pod用)
    セカンダリレンジ2: 10.200.0.0/20 (GKE Service用)
```

#### ✅ ベストプラクティス: サブネット設計

1. **Custom Mode VPC を使用する**（Auto Mode は本番禁止）
2. **環境ごとにVPCを分離**（prod/stg/dev）
3. **将来の拡張を見越したCIDR設計**（余裕を持たせる）
4. **オンプレミスCIDRとの重複を避ける**（ハイブリッド接続を見越して）
5. **用途別にサブネットを分割**（web/app/db）
6. **セカンダリレンジはGKE使用時に事前計画**

> 📎 参照: https://cloud.google.com/vpc/docs/vpc  
> 📎 参照: https://cloud.google.com/vpc/docs/subnets

### 2.3 VPC ファイアウォールルール

#### ファイアウォールの基本概念

```
Google Cloud ファイアウォールの特徴:
  - ステートフル（戻りトラフィックは自動許可）
  - VM レベルで適用（ネットワーク境界ではなくVMに直接適用）
  - 優先度（Priority）0〜65535（低い値が高優先度）
  - デフォルトのimplied（暗黙）ルール:
    - 全 egress（外向き）許可 priority: 65535
    - 全 ingress（内向き）拒否 priority: 65535

適用メカニズム:
  [インターネット]
       ↓
  [ファイアウォールルール（VM の外側で評価）]
       ↓
  [VM の vNIC（仮想NIC）]

  → ファイアウォールはVMの外側で適用される
  → VMのOS側のiptablesに関係なく制御可能
```

#### ターゲット指定の3つの方法

```
方法 1: ネットワークタグ（推奨・最もシンプル）
  - VMにタグ(例: "web-server")を付与
  - ルールのターゲットタグに"web-server"を指定
  - 例: タグ"web-server"を持つVMに対して80/443を許可

  # gcloud でタグ付きVMを作成
  gcloud compute instances create my-vm \
    --tags=web-server

  # タグベースのFWルール作成
  gcloud compute firewall-rules create allow-http \
    --direction=INGRESS \
    --priority=1000 \
    --network=my-vpc \
    --action=ALLOW \
    --rules=tcp:80,tcp:443 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=web-server

方法 2: サービスアカウント（推奨・セキュリティが高い）
  - タグは誰でも付けられるが、SAは権限が必要
  - VMに割り当てたSAでFWルールを制御
  - IAMと連動したよりセキュアな制御

  # SAベースのFWルール
  gcloud compute firewall-rules create allow-app-to-db \
    --direction=INGRESS \
    --network=my-vpc \
    --action=ALLOW \
    --rules=tcp:5432 \
    --source-service-accounts=app-sa@project.iam.gserviceaccount.com \
    --target-service-accounts=db-sa@project.iam.gserviceaccount.com

方法 3: ネットワーク全体（全VMに適用）
  - --target-tags や --target-service-accounts を指定しない場合
  - VPC内の全VMに適用される
  - 細粒度制御には不向き
```

#### ファイアウォールルールの優先度と評価順序

```
ルール評価順序:
  1. 全ルールを収集（ingress/egressそれぞれ）
  2. 優先度（priority）の小さい順に評価
  3. 最初にマッチしたルールを適用（Allow or Deny）
  4. マッチするルールがない → implicit deny（デフォルト）

例: 複数ルールの競合
  Priority 100: DENY  ALL → Source: 10.0.0.5/32, Port: 22
  Priority 200: ALLOW SSH → Source: 10.0.0.0/24, Port: 22

  → 10.0.0.5 からの SSH は DENY（priority 100が先に評価）
  → 10.0.0.1 からの SSH は ALLOW（priority 100はマッチしない）
```

#### 階層型ファイアウォールポリシー（Hierarchical Firewall Policies）

```
組織レベルでのファイアウォール統一管理:

  ┌── 組織（Organization）レベルポリシー ────────────┐
  │  Rule: DENY access from known malicious IPs       │
  │  Rule: ALLOW inter-VPC communication              │
  └── ↓ 全配下のプロジェクトに強制適用 ↓ ────────────┘

  ┌── フォルダレベルポリシー（部門別）────────────── ┐
  │  Rule: ALLOW internal tools access               │
  └── ↓ フォルダ配下のプロジェクトに適用 ↓ ──────────┘

  ┌── プロジェクトレベル VPC ファイアウォールルール ──┐
  │  Rule: ALLOW HTTP/HTTPS from 0.0.0.0/0          │
  └─────────────────────────────────────────────────┘

評価順序: 組織 → フォルダ → プロジェクト → VPC
  - 上位の "GOTO_NEXT" → 下位に評価を委譲
  - 上位の "ALLOW/DENY" → 即座に適用（下位を無視）
```

#### ✅ ベストプラクティス: ファイアウォールルール

1. **最小権限の原則**：必要なポートのみ開放、デフォルト拒否
2. **タグよりサービスアカウントを優先**（より安全）
3. **ログ記録を有効化**（セキュリティ監査・トラブルシューティングのため）
4. **階層型ポリシーで組織全体のベースラインを設定**
5. **0.0.0.0/0 への許可は最小限に**（特にSSH/RDP）
6. **Identity-Aware Proxy（IAP）でSSH/RDPアクセスを代替**
7. **定期的なルール棚卸し**（使われていないルールを削除）

```yaml
# ファイアウォールルール設計テンプレート
ベースラインルール（全VPC共通）:
  - 内部通信許可: 10.0.0.0/8 からの all トラフィック許可
  - SSH/RDP 許可: IAP のIPレンジ 35.235.240.0/20 のみ
  - ICMP 許可: 内部ネットワークからのpingを許可（デバッグ用）

アプリケーション別ルール:
  - web-tier: 0.0.0.0/0 → TCP 80, 443
  - app-tier: web-tier のIPのみ → TCP 8080
  - db-tier:  app-tier のSAのみ → TCP 3306, 5432
```

> 📎 参照: https://cloud.google.com/vpc/docs/firewalls  
> 📎 参照: https://cloud.google.com/vpc/docs/firewall-policies

### 2.4 VPC ピアリング（VPC Network Peering）

#### VPC ピアリングとは？

異なるVPC間でプライベートIPアドレスを使って直接通信する仕組みです。

```
ピアリングの構造:

  VPC-A (Project-A)          VPC-B (Project-B)
  10.0.0.0/16                10.1.0.0/16
  ┌─────────────┐            ┌─────────────┐
  │ VM-A        │ ←─────→   │ VM-B        │
  │ 10.0.0.5    │  プライベート│ 10.1.0.5    │
  └─────────────┘   通信     └─────────────┘
       ↕                           ↕
  ピアリング接続（両方向に設定が必要）
```

#### ピアリングの重要な制約

```
制約 1: 推移的ルーティング（Transitive Routing）は不可

  VPC-A ──ピアリング── VPC-B ──ピアリング── VPC-C

  → A は B に通信できる
  → B は C に通信できる
  → A は C に直接通信できない（推移的ルーティング不可）

  解決策: A-C 間にも直接ピアリングを設定する

制約 2: IPアドレスの重複は不可
  - ピアリングするVPCのCIDRが重複してはいけない
  - 10.0.0.0/16 と 10.0.0.0/24 でも重複とみなされる

制約 3: 自動ルート交換
  - ピアリングが確立されるとルートが自動で交換される
  - カスタムルートの交換はオプション（明示的に有効化）

制約 4: タグ・サービスアカウントは不可
  - ピアリングされたVPCのVMにはネットワークタグ/SAベースの
    ファイアウォールルールが適用されない（IP/CIDRベースのみ）
```

#### ピアリング vs Shared VPC の選択基準

```
┌─────────────────────────┬──────────────────────────┐
│    VPC Peering           │       Shared VPC          │
├─────────────────────────┼──────────────────────────┤
│ 異なる組織間の接続に対応  │ 同一組織内の接続          │
│ 各VPCが独立して管理       │ ホストプロジェクトが      │
│ カスタムルートの制御可能   │ ネットワークを集中管理    │
│ 推移的ルーティング不可     │ サービスプロジェクトは    │
│                          │ ホストのVPCを共有利用     │
│ 用途: 異組織間・パートナー │ 用途: 企業内の部門分離    │
└─────────────────────────┴──────────────────────────┘
```

#### ✅ ベストプラクティス: VPC ピアリング

1. **CIDR設計時にピアリング対象VPCとの重複を排除**
2. **推移的ルーティングが必要な場合はネットワークトポロジを再設計**
3. **大規模組織では Shared VPC を優先検討**
4. **異なる組織間の接続はピアリングが有効な選択肢**
5. **ルート交換ポリシーを明確に設計**（export/import custom routes）

> 📎 参照: https://cloud.google.com/vpc/docs/vpc-peering

### 2.5 Shared VPC（共有VPC）

#### Shared VPC のアーキテクチャ

```
Shared VPC の構成:

  ┌── Host Project（ホストプロジェクト）──────────────────┐
  │  VPC: company-vpc (10.0.0.0/8)                       │
  │    subnet-web:  10.1.0.0/24                          │
  │    subnet-app:  10.2.0.0/24                          │
  │    subnet-db:   10.3.0.0/24                          │
  │  ネットワーク管理チームが管理                           │
  └──────────────────────────────────────────────────────┘
           ↕ Shared VPC ↕
  ┌── Service Project A ──┐  ┌── Service Project B ──┐
  │  チーム A のリソース   │  │  チーム B のリソース   │
  │  VMはhost-VPCの        │  │  VMはhost-VPCの        │
  │  subnet-web を使用     │  │  subnet-app を使用     │
  └───────────────────────┘  └───────────────────────┘
```

#### Shared VPC の役割と権限

```
役割の分離:

  ネットワーク管理者（Host Project）:
    → VPC・サブネット・ファイアウォールを管理
    → roles/compute.networkAdmin
    → roles/compute.securityAdmin

  サービスチーム（Service Project）:
    → 共有サブネット上にVMを作成
    → roles/compute.networkUser（特定サブネットへのアクセス）
    → ネットワーク設定は変更不可（ガバナンス確保）
```

#### ✅ ベストプラクティス: Shared VPC

1. **大企業・マルチプロジェクト環境では Shared VPC が標準**
2. **Host Project はネットワーク専用プロジェクトとして独立させる**
3. **サブネット単位でサービスプロジェクトへの権限を付与**（最小権限）
4. **組織ポリシーで Shared VPC 外のVPC作成を制限**

> 📎 参照: https://cloud.google.com/vpc/docs/shared-vpc

### 2.6 Private Google Access と Private Service Connect

#### Private Google Access

VPCサブネット内の**外部IPを持たないVMが、Googleサービス（GCS・BigQuery等）へアクセス**できる機能。

```
通常（外部IP必要）:
  VM(内部IPのみ) → インターネット → 8.8.8.8(Google Public IP) → GCS

Private Google Access 有効時:
  VM(内部IPのみ) → 199.36.153.8/30 → Google内部ネットワーク → GCS

設定方法:
  サブネットのPrivate Google Accessを有効化するだけ

  gcloud compute networks subnets update my-subnet \
    --enable-private-ip-google-access \
    --region=us-central1
```

#### Private Service Connect（PSC）

```
PSCの役割：マネージドサービスへのプライベートアクセス

  従来の方法（VPC Peering）:
    自社VPC ──VPC Peering──> Cloud SQL用のVPC
    → IP重複問題・推移的ルーティング不可・ルート管理複雑

  PSC の方法:
    自社VPC ──PSC Endpoint──> Cloud SQL
    → 自社VPC内のプライベートIPでサービスに接続
    → VPC Peeringなしでシンプルに接続

PSCのユースケース:
  1. Google マネージドサービスへのアクセス
     （Cloud SQL・GCS・BigQuery等）
  2. サードパーティのマネージドサービスへのアクセス
     （ISVベンダーのサービス等）
  3. 同一/他組織の内部サービスの公開

設定コンポーネント:
  - Forwarding Rule（転送ルール）: PSC Endpointのエントリポイント
  - Service Attachment: サービス側の公開設定
```

#### ✅ ベストプラクティス: Private Access

1. **全サブネットで Private Google Access を有効化**（外部IP不要のVMのため）
2. **マネージドサービスへのアクセスは PSC を優先**（VPC Peeringより管理が簡単）
3. **Cloud NAT と組み合わせてインターネットアクセスを制御**

> 📎 参照: https://cloud.google.com/vpc/docs/private-google-access  
> 📎 参照: https://cloud.google.com/vpc/docs/private-service-connect

### 2.7 Cloud NAT（Network Address Translation）

#### Cloud NAT とは？

外部IPを持たないVMがインターネットへ**アウトバウンド通信**できるようにするマネージドNATサービス。

```
Cloud NAT の動作:

  ┌── VPC ────────────────────────────────────────────────┐
  │  VM (内部IPのみ: 10.0.0.5)                            │
  │       ↓ アウトバウンド通信                              │
  │  Cloud Router (NAT の設定を管理)                       │
  │       ↓ IPアドレス変換                                 │
  └──────────────────────────────────────────────────────┘
         ↓
  [Cloud NAT Gateway]
  外部IP: 34.100.x.x (自動割り当て or 予約IP)
         ↓
  [インターネット]

特徴:
  - インバウンド接続は不可（アウトバウンドのみ）
  - ステートフル（戻りパケットは自動で転送）
  - リージョン単位で設定
  - Cloud Router に依存
  - マネージドサービスのためインフラ管理不要
```

#### Cloud NAT の設定

```bash
# 1. Cloud Router を作成
gcloud compute routers create my-router \
  --network=my-vpc \
  --region=us-central1

# 2. Cloud NAT を作成（Cloud Router に関連付け）
gcloud compute routers nats create my-nat \
  --router=my-router \
  --auto-allocate-nat-external-ips \
  --nat-all-subnet-ip-ranges \
  --region=us-central1

# 特定サブネットのみNAT対象にする場合:
gcloud compute routers nats create my-nat \
  --router=my-router \
  --auto-allocate-nat-external-ips \
  --nat-custom-subnet-ip-ranges=my-subnet \
  --region=us-central1
```

#### Cloud NAT のポートアロケーション

```
ポートの割り当て方式:

  Dynamic Port Allocation（デフォルト・推奨）:
    - VPCの全VMに対して動的にポートを割り当て
    - min/max ポート数を設定可能
    - スパイクトラフィック時に自動的にポートを追加

  Static Port Allocation:
    - VM ごとに固定ポート数を割り当て
    - 予測可能だが過剰割り当てのリスク

ポート枯渇の対策:
  - 複数の外部IPを割り当て
  - Dynamic Port Allocation でmax-ports-per-vmを増加
  - ログでポート枯渇をモニタリング
```

#### ✅ ベストプラクティス: Cloud NAT

1. **外部IPを持たないVMには必ずCloud NATを設定**
2. **Dynamic Port Allocationを使用**（効率的なポート利用）
3. **NAT ログを有効化**（エラー・ポート枯渇の検知）
4. **本番環境では予約外部IPを使用**（IPが変わらない）
5. **サブネット単位でNATの適用範囲を制御**

> 📎 参照: https://cloud.google.com/nat/docs/overview

---

## 3. ハイブリッド接続とネットワーク相互接続

### 3.1 ハイブリッド接続の全体像

```
オンプレミス ←→ Google Cloud の接続オプション:

  帯域幅: 低 ────────────────────────── 高
  コスト:  低 ────────────────────────── 高
          ↓
  Cloud VPN (IPsec)
    └── 最大3Gbps/トンネル
    └── インターネット経由（暗号化）
    └── 低コスト・導入が早い

  Partner Interconnect
    └── 50Mbps〜50Gbps
    └── パートナー経由の専用線
    └── 中コスト

  Dedicated Interconnect
    └── 10Gbps / 100Gbps × 最大8回線
    └── Googleと直接の専用線
    └── 高コスト・高帯域・低レイテンシ

  Cross-Cloud Interconnect (新機能)
    └── 他クラウド（AWS・Azure）との専用接続
```

### 3.2 Cloud VPN

#### Cloud VPN の種類

```
HA VPN（High Availability VPN）─ 推奨:
  - 99.99% SLA
  - 2つの外部IPを使用（2トンネル冗長）
  - BGP（動的ルーティング）必須
  - 最大3Gbps/トンネル（計6Gbps）

  構成:
  オンプレ VPN GW         Google HA VPN GW
  ┌────────────┐          ┌────────────┐
  │  Interface 0 │──トンネル1──│  Interface 0│
  │  Interface 1 │──トンネル2──│  Interface 1│
  └────────────┘          └────────────┘
  → どちらのインターフェースが落ちても継続通信可能

Classic VPN（旧来）:
  - 99.9% SLA（HA VPNより低い）
  - 1つの外部IP
  - 静的/動的ルーティング対応
  - 新規構築では非推奨
```

#### HA VPN の設定ステップ

```bash
# Step 1: HA VPN ゲートウェイ作成
gcloud compute vpn-gateways create my-ha-vpn-gw \
  --network=my-vpc \
  --region=us-central1

# Step 2: Cloud Router 作成（BGP用）
gcloud compute routers create my-vpn-router \
  --network=my-vpc \
  --region=us-central1 \
  --asn=65001

# Step 3: 外部VPNゲートウェイを定義（オンプレ側）
gcloud compute external-vpn-gateways create on-prem-gw \
  --interfaces 0=ON_PREM_IP_0,1=ON_PREM_IP_1

# Step 4: VPNトンネル作成（2本）
gcloud compute vpn-tunnels create tunnel-1 \
  --vpn-gateway=my-ha-vpn-gw \
  --interface=0 \
  --peer-external-gateway=on-prem-gw \
  --peer-external-gateway-interface=0 \
  --shared-secret=MY_SECRET \
  --ike-version=2 \
  --router=my-vpn-router \
  --region=us-central1

gcloud compute vpn-tunnels create tunnel-2 \
  --vpn-gateway=my-ha-vpn-gw \
  --interface=1 \
  --peer-external-gateway=on-prem-gw \
  --peer-external-gateway-interface=1 \
  --shared-secret=MY_SECRET \
  --ike-version=2 \
  --router=my-vpn-router \
  --region=us-central1

# Step 5: BGP セッション設定（Cloud Router）
gcloud compute routers add-bgp-peer my-vpn-router \
  --peer-name=bgp-peer-1 \
  --interface=tunnel-1 \
  --peer-ip-address=169.254.0.1 \
  --peer-asn=65002 \
  --region=us-central1
```

#### VPN のルーティング方式

```
静的ルーティング（Static）:
  - ルートを手動で設定
  - ルート変更時は手動更新が必要
  - Classic VPN でのみ使用可能
  - シンプルだが管理コストが高い

動的ルーティング（Dynamic/BGP）:
  - Cloud Router を使って BGP でルートを自動交換
  - オンプレのルート変更が自動的にGCPに伝播
  - HA VPN と必ず組み合わせる
  - 推奨方式

BGP のASN（Autonomous System Number）:
  Google Cloud の事前予約 ASN:
    16550  → Google Peering
    15169  → Google LLC
  お客様が使用できる Private ASN:
    64512〜65534  (2バイトPrivate ASN)
    4200000000〜4294967294 (4バイトPrivate ASN)
```

#### ✅ ベストプラクティス: Cloud VPN

1. **HA VPN + BGP を使用**（99.99% SLA・冗長性確保）
2. **IKEv2 を使用**（IKEv1より安全・効率的）
3. **強力な共有鍵（Pre-Shared Key）を使用**（自動生成推奨）
4. **VPNトンネルは最低2本設定**（冗長化）
5. **帯域が足りない場合は等コストマルチパス（ECMP）でスケール**

> 📎 参照: https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview  
> 📎 参照: https://cloud.google.com/network-connectivity/docs/vpn/how-to/creating-ha-vpn

### 3.3 Cloud Interconnect

#### Dedicated Interconnect（専用線）

```
Dedicated Interconnect の仕組み:

  オンプレデータセンター
  ┌──────────────────┐
  │  ルーター         │
  │  (お客様機器)     │
  └──────┬───────────┘
         │ 専用の物理回線（10G or 100G）
         │ ← Google のコロケーション施設へ
  ┌──────┴───────────┐
  │ Google Meet Me    │ ← Googleが指定した相互接続拠点
  │ Location          │
  └──────┬───────────┘
         │ Googleの内部ネットワーク
  ┌──────┴───────────┐
  │  Google Cloud     │
  │  (特定リージョン)  │
  └──────────────────┘

回線オプション:
  - 10Gbps × 最大8回線 = 80Gbps
  - 100Gbps × 最大2回線 = 200Gbps

VLAN Attachment（アタッチメント）:
  - 物理回線を論理的に分割する仕組み（VLAN）
  - 1つの物理回線に複数のVLAN Attachmentを作成可能
  - 各アタッチメントが1つのVPCに対応
```

#### Partner Interconnect（パートナー経由）

```
Partner Interconnect の仕組み:

  オンプレ ──── パートナーネットワーク ──── Google Cloud
               (AT&T, Verizon,
                Equinix など)

利点:
  - Dedicated Interconnect が届かない場所でも利用可能
  - 50Mbps から開始可能（Dedicated は 10Gbpsから）
  - パートナーが物理接続を管理

接続タイプ:
  Layer 2: お客様がBGPを管理
  Layer 3: パートナーがBGPを管理（設定が簡単）
```

#### Interconnect の冗長性設計

```
SLA別の推奨冗長構成:

99.9% SLA（1リージョン、1 Metro）:
  Metro-A
  ┌──────────────┐
  │ Interconnect 1│ ← 1つのメトロに2本
  │ Interconnect 2│
  └──────────────┘

99.99% SLA（推奨・本番環境）:
  Metro-A                Metro-B
  ┌──────────────┐      ┌──────────────┐
  │ Interconnect 1│      │ Interconnect 3│
  │ Interconnect 2│      │ Interconnect 4│
  └──────────────┘      └──────────────┘
  → 2つの物理的に独立したメトロに各2本
  → Metro-Aが全停止してもMetro-Bで継続
```

#### ✅ ベストプラクティス: Cloud Interconnect

1. **本番環境は99.99% SLA構成（複数Metro・複数回線）**
2. **VLAN Attachmentを使ってVPCごとに論理分離**
3. **BGPでルートを動的に管理**（Cloud Router必須）
4. **Cloud Armorと組み合わせてセキュリティを強化**
5. **帯域監視アラートを設定**（使用率80%でアラート）

> 📎 参照: https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview  
> 📎 参照: https://cloud.google.com/network-connectivity/docs/interconnect/concepts/best-practices

### 3.4 Cloud Router と BGP

#### Cloud Router の役割

```
Cloud Router の機能:

  1. BGP（Border Gateway Protocol）の終端
     → オンプレとGCPでルートを動的に交換

  2. Cloud VPN / Interconnect のルーティングを管理

  3. Cloud NAT のゲートウェイ機能

  4. ルート広告のカスタマイズ
     → どのサブネットをオンプレに広告するかを制御

BGP セッションの確立:

  GCP 側（Cloud Router）    オンプレ（BGP Router）
  ASN: 65001               ASN: 65002
       ↕ BGP Session
  ルート交換:
  GCP → オンプレ: 10.0.0.0/24, 10.0.1.0/24
  オンプレ → GCP: 192.168.0.0/16
```

#### Cloud Router のルート広告モード

```
モード 1: Default（デフォルト）
  - VPC内の全サブネットのCIDRを自動広告
  - 新しいサブネットも自動で広告される
  - シンプルだが細かい制御が難しい

モード 2: Custom（推奨）
  - 広告するルートを手動で指定
  - 特定のサブネットのみをオンプレに広告可能
  - より細かいルーティング制御が可能

  gcloud compute routers update my-router \
    --advertisement-mode=custom \
    --set-advertisement-ranges=10.0.1.0/24,10.0.2.0/24
```

#### ✅ ベストプラクティス: Cloud Router

1. **BGP MED（Multi-Exit Discriminator）でフェイルオーバーを制御**
2. **カスタム広告モードで不要なルートの漏洩を防ぐ**
3. **リージョンごとに個別のCloud Routerを作成**（独立した管理）
4. **BGPセッションの状態を監視**（Stackdriverでアラート）

> 📎 参照: https://cloud.google.com/network-connectivity/docs/router/concepts/overview

### 3.5 Network Connectivity Center（NCC）

#### NCCとは？

**Network Connectivity Center（NCC）**は、複数の接続（VPN・Interconnect・Router Appliance）を**ハブ＆スポーク型**で集中管理する新しいネットワーキング製品です。

```
NCC のトポロジー:

          ┌──────────────────────────────┐
          │  NCC Hub（Google Network内）  │
          │                              │
          │  ルーティングをGoogle側で管理  │
          └──────────────────────────────┘
               ↕          ↕          ↕
         Spoke 1       Spoke 2    Spoke 3
         (VPN)      (Interconnect) (Router Appliance)
           ↕              ↕            ↕
       オンプレA       オンプレB    SD-WAN機器

スポーク同士の通信:
  Spoke 1 (オンプレA) ← Hub経由 → Spoke 2 (オンプレB)
  → NCCを使えばオンプレ同士もGCPを経由して通信可能（トランジット）
```

#### ✅ ベストプラクティス: NCC

1. **多拠点接続を持つ大規模組織でNCCを活用**
2. **SD-WAN との統合でRouter Applianceを利用**
3. **スポーク間の通信要件を事前に設計**

> 📎 参照: https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview

---

## 4. ロードバランシングとトラフィック管理

### 4.1 Google Cloud ロードバランシングの全体像

```
ロードバランサーの選択フローチャート:

外部(インターネット向け) or 内部(VPC内)?
│
├── 外部
│   ├── HTTP(S) トラフィック？
│   │   ├── グローバル配信が必要？
│   │   │   └── YES → Global External HTTP(S) LB (L7)
│   │   └── リージョン内で十分？
│   │       └── Regional External HTTP(S) LB (L7)
│   └── TCP/UDP/その他プロトコル？
│       ├── グローバル・静的IP必要？
│       │   └── External TCP Proxy / SSL Proxy (L4 Proxy)
│       └── パススルーが必要（クライアントIPを保持）？
│           └── External TCP/UDP Network LB (L4 Passthrough)
│
└── 内部(VPC内)
    ├── HTTP(S) トラフィック？
    │   └── Internal HTTP(S) LB (L7)
    └── TCP/UDP？
        └── Internal TCP/UDP LB (L4 Passthrough)
```

#### 主要ロードバランサーの比較

| LB名 | スコープ | プロトコル | セッション維持 | Cloud Armor | Backend |
|---|---|---|---|---|---|
| **Global Ext HTTP(S)** | グローバル | HTTP/HTTPS/HTTP2/gRPC | ○ | ○ | Instance/NEG |
| **Regional Ext HTTP(S)** | リージョン | HTTP/HTTPS | ○ | ○ | Instance/NEG |
| **Ext TCP Proxy** | グローバル | TCP | ○ | ✕ | Instance |
| **Ext SSL Proxy** | グローバル | SSL/TLS | ○ | ✕ | Instance |
| **Ext Network LB** | リージョン | TCP/UDP | ○ | ✕ | Instance |
| **Internal HTTP(S)** | リージョン | HTTP/HTTPS | ○ | ○ | Instance/NEG |
| **Internal TCP/UDP** | リージョン | TCP/UDP | ○ | ✕ | Instance |

### 4.2 Global External HTTP(S) Load Balancer（L7グローバルLB）

#### アーキテクチャと動作原理

```
Global External HTTP(S) LB の構成:

[ユーザー（世界中）]
       ↓
[Anycast IP（グローバル単一IP）]
       ↓ 最も近いGoogle POPで接続
[Google Front End（GFE）] ← SSL/TLS終端
       ↓
[URL Map（ルーティングルール）]
       ↓ URLパスに基づいて振り分け
  /api/*  → Backend Service A（us-central1のMIG）
  /static/*→ Cloud Storage（CDNキャッシュ）
  /*      → Backend Service B（マルチリージョン）

主要コンポーネント:
  1. Forwarding Rule: 外部IPとポートの定義
  2. Target HTTP(S) Proxy: SSL証明書の管理
  3. URL Map: URLパスベースのルーティング
  4. Backend Service: バックエンドの設定
  5. Backend: Instance Group / NEG / Cloud Storage
  6. Health Check: バックエンドの死活監視
```

#### URL Map（URLルーティング）

```yaml
# URLマップの設定例（YAML）
name: my-url-map
defaultService: projects/PROJECT/global/backendServices/web-backend

hostRules:
  - hosts:
      - "api.example.com"
    pathMatcher: api-paths
  - hosts:
      - "www.example.com"
    pathMatcher: web-paths

pathMatchers:
  - name: api-paths
    defaultService: projects/PROJECT/global/backendServices/api-backend
    pathRules:
      - paths:
          - "/v1/*"
        service: projects/PROJECT/global/backendServices/api-v1-backend
      - paths:
          - "/v2/*"
        service: projects/PROJECT/global/backendServices/api-v2-backend

  - name: web-paths
    defaultService: projects/PROJECT/global/backendServices/web-backend
    pathRules:
      - paths:
          - "/static/*"
        service: projects/PROJECT/global/backendServices/gcs-backend
```

#### NEG（Network Endpoint Groups）

```
NEGの種類と用途:

  Zonal NEG:
    → GKE Podや特定ゾーンのVMエンドポイント
    → IPアドレス:ポートで個別に管理
    → GKEとの統合に使用

  Serverless NEG:
    → Cloud Run / Cloud Functions / App Engine を LB のバックエンドに
    → サーバーレスサービスへのトラフィック振り分け

  Internet NEG:
    → オンプレ or 他クラウドのエンドポイント
    → ハイブリッドLBの構成に使用

  Hybrid Connectivity NEG:
    → Cloud Interconnect/VPN 経由の外部エンドポイント

NEG の設定例（Cloud Run をバックエンドに）:
  gcloud compute network-endpoint-groups create my-serverless-neg \
    --region=us-central1 \
    --network-endpoint-type=serverless \
    --cloud-run-service=my-cloud-run-service
```

#### ✅ ベストプラクティス: Global HTTP(S) LB

1. **マルチリージョンバックエンドで高可用性を実現**
2. **Cloud CDN と組み合わせてキャッシュを活用**
3. **Cloud Armor で WAF・DDoS保護を有効化**
4. **Health Check は適切な間隔とタイムアウトを設定**
5. **SSL Policy で古い TLS バージョンを無効化**（最低TLS 1.2以上）
6. **Managed SSL Certificate（Google管理SSL）を使用**

> 📎 参照: https://cloud.google.com/load-balancing/docs/https

### 4.3 Internal HTTP(S) Load Balancer（内部L7LB）

```
内部LBのユースケース:

  マイクロサービス間の通信:
  ┌────────────────────────────────────────────┐
  │ VPC                                        │
  │  [フロントエンドVM] → Internal LB → [APIサービスVM群] │
  │                     → Internal LB → [DBサービスVM群] │
  └────────────────────────────────────────────┘

  Shared VPC での使用:
    → ホストプロジェクトのVPCに内部LBを配置
    → 複数サービスプロジェクトから共有可能

  GKE との統合:
    → Ingress リソースで自動的に内部LBを作成
    → Pod への直接トラフィック分散（NEG使用）
```

### 4.4 External TCP/UDP Network Load Balancer

```
パススルーLBの特徴:

  パススルー = クライアントのIPを保持してバックエンドに届ける

  通常のProxy型LB:
    クライアント(1.2.3.4) → LB(変換) → バックエンド
    バックエンドから見たsrc IP: LBのIP（クライアントIPが失われる）

  パススルー型LB:
    クライアント(1.2.3.4) → LB(そのまま転送) → バックエンド
    バックエンドから見たsrc IP: 1.2.3.4（クライアントIPが保持）

  用途:
    - クライアントIPが必要なアプリケーション（ログ・地理情報等）
    - UDP トラフィック（DNS・QUIC等）
    - 非HTTP系のゲームサーバー等

  注意: Cloud Armor は使用不可（Proxy型のみ対応）
```

### 4.5 ヘルスチェック（Health Check）

```
ヘルスチェックの設定パラメータ:

  Check Interval: 5秒（デフォルト）
    → チェックの頻度（短いほどフェイルオーバーが速い）

  Timeout: 5秒（デフォルト）
    → レスポンス待機時間

  Healthy Threshold: 2（デフォルト）
    → 「正常」と判断するために連続成功が必要な回数

  Unhealthy Threshold: 2（デフォルト）
    → 「異常」と判断するために連続失敗が必要な回数

ヘルスチェックの種類:
  - HTTP: パスとレスポンスコードで判定
  - HTTPS: SSL+HTTP
  - TCP: ポートの疎通確認のみ
  - SSL: SSL Handshakeの成功
  - gRPC: gRPCヘルスチェックプロトコル

ファイアウォールルール（必須）:
  Google のヘルスチェックIPレンジからのアクセスを許可:
  - 35.191.0.0/16
  - 130.211.0.0/22

  gcloud compute firewall-rules create allow-health-check \
    --network=my-vpc \
    --action=ALLOW \
    --direction=INGRESS \
    --source-ranges=35.191.0.0/16,130.211.0.0/22 \
    --target-tags=backend-vm \
    --rules=tcp:80
```

#### ✅ ベストプラクティス: ヘルスチェック

1. **HTTPヘルスチェックにはアプリケーション固有のエンドポイントを使用**（`/health`等）
2. **ヘルスチェック用のファイアウォールルールを必ず設定**
3. **本番環境ではUnhealthy Thresholdを小さく設定**（素早いフェイルオーバー）
4. **チェック間隔とタイムアウトのバランスを調整**

> 📎 参照: https://cloud.google.com/load-balancing/docs/health-checks

### 4.6 Cloud CDN（Content Delivery Network）

```
Cloud CDN の動作:

  1. ユーザーが静的コンテンツをリクエスト
  2. 最寄りのGoogle Edge Location（POP）がキャッシュをチェック
  3. キャッシュHIT → 即座にレスポンス
  4. キャッシュMISS → オリジン（バックエンド）から取得してキャッシュ

  効果: 
    - レイテンシの削減（ユーザーに近いPOPから配信）
    - オリジンサーバーの負荷軽減
    - グローバル配信コスト削減

キャッシュキー:
  デフォルト: URL全体（プロトコル + ホスト + パス + クエリ）
  カスタム: 特定のヘッダー・クエリパラメータのみ含める

キャッシュモード:
  - CACHE_ALL_STATIC: 静的コンテンツを自動キャッシュ（デフォルト）
  - USE_ORIGIN_HEADERS: オリジンのCache-Controlに従う
  - FORCE_CACHE_ALL: 全レスポンスを強制キャッシュ

Cache Control ヘッダーの設定例（バックエンド側）:
  Cache-Control: public, max-age=3600  # 1時間キャッシュ
  Cache-Control: no-store              # キャッシュ禁止
  Cache-Control: private               # ブラウザのみキャッシュ（CDNはしない）
```

#### ✅ ベストプラクティス: Cloud CDN

1. **静的コンテンツ（画像・JS・CSS）は積極的にCDNキャッシュを活用**
2. **APIレスポンスはCache-Control: no-storeでキャッシュ無効化**
3. **Signed URLで限定公開コンテンツを保護**
4. **キャッシュパフォーマンスメトリクスを監視**（ヒット率）

> 📎 参照: https://cloud.google.com/cdn/docs/overview

---

## 5. クラウドDNS・ルーティング・ネットワークサービス

### 5.1 Cloud DNS

#### Cloud DNS の基本概念

```
Cloud DNS のコンポーネント:

  マネージドゾーン（Managed Zone）:
    - DNS権威サーバーを管理する単位
    - ゾーン名は完全修飾ドメイン名（FQDN）
    - パブリックゾーン or プライベートゾーン

  パブリックゾーン:
    - インターネット全体に公開される
    - example.com の権威NSを管理
    - GoogleのAnycasted NSサーバーが対応

  プライベートゾーン:
    - VPC内のリソースのみに公開
    - 内部通信用のプライベートDNS
    - 例: internal.example.com
    - 複数VPCから同じゾーンを参照可能
```

#### DNS 転送（Forwarding）と応答ポリシー（Response Policy）

```
DNS 転送の種類:

  アウトバウンド転送（GCP → オンプレ）:
    - GCPのリソースがオンプレのDNSサーバーに問い合わせ
    - 用途: オンプレのドメイン名解決（on-prem.example.com）

    設定: Cloud DNSのForwarding Zone に転送先を指定
    オンプレDNS: 192.168.1.10 (Cloud Interconnect/VPN経由)

  インバウンド転送（オンプレ → GCP）:
    - オンプレからGCPのCloud DNSに問い合わせ
    - Cloud DNSのインバウンドポリシーを使用
    - GCP内のVMに割り当てたIPアドレスを解決

  設定例:
  gcloud dns managed-zones create onprem-forwarding-zone \
    --dns-name=onprem.example.com. \
    --networks=my-vpc \
    --forwarding-targets=192.168.1.10 \
    --private-forwarding-targets=192.168.1.10

応答ポリシー（Response Policy）:
  - 特定のDNSクエリに対してカスタム応答を返す
  - セキュリティ（マルウェアドメインをブロック）に活用
  - ローカルオーバーライド（特定ドメインを内部IPに解決）
```

#### DNS ピアリング

```
DNS ピアリングのユースケース:

  VPC-A でのみ管理しているプライベートゾーンを
  VPC-B のリソースからも解決可能にする

  VPC-A:
    Managed Zone: internal.a.example.com (private)
    → VPC-B からもこのゾーンを解決したい

  DNS ピアリング設定:
    VPC-B の DNS ピアリングポリシー:
    → internal.a.example.com を VPC-A に転送

  結果: VPC-B のVMが internal.a.example.com を解決可能
```

#### ✅ ベストプラクティス: Cloud DNS

1. **プライベートゾーンで内部サービスのDNS管理を集中化**
2. **DNSピアリングでVPC間の名前解決を実現**
3. **転送ゾーンでオンプレのDNSと統合**
4. **DNSSEC でパブリックゾーンの完全性を保護**
5. **TTL を適切に設定**（変更頻度に応じて）

> 📎 参照: https://cloud.google.com/dns/docs/overview

### 5.2 IPアドレス管理

#### 外部IPアドレスの種類

```
エフェメラルIP（Ephemeral）:
  - VMの起動/停止のたびに変わる
  - 追加コストなし
  - 本番環境には不向き

静的IP（Static / Reserved）:
  - IP を予約して固定する
  - VMを停止/削除してもIPを保持可能
  - 使用していない静的IPはコストが発生（注意）
  - ロードバランサーやNATに使用

設定:
  gcloud compute addresses create my-static-ip \
    --region=us-central1  # リージョンIP

  gcloud compute addresses create my-global-ip \
    --global  # グローバルIP（LB用）
```

#### IP アドレスのスコープ

```
グローバルIP:
  - グローバルLBに使用
  - Anycast（世界中のPOPから同じIPで応答）
  - 静的にのみ使用可能

リージョンIP:
  - リージョンLB・VM・Cloud NATに使用
  - そのリージョン内でのみ有効

内部IP:
  - VPC内のプライベートIP
  - リソース作成時にサブネットから自動割り当て
  - 予約して固定することも可能（静的内部IP）
```

#### IPv6 サポート

```
Google Cloud の IPv6:
  - VPCサブネットで IPv6 を有効化可能
  - デュアルスタック（IPv4 + IPv6）対応
  - External IPv6 アドレスの割り当て
  - グローバルLBでのIPv6対応

  IPv6 有効化:
  gcloud compute networks subnets update my-subnet \
    --enable-ipv6-access \
    --ipv6-access-type=EXTERNAL \
    --region=us-central1
```

### 5.3 カスタムルートと静的ルーティング

#### VPC のルーティングの仕組み

```
デフォルトルート（自動作成）:
  - 0.0.0.0/0 → デフォルトゲートウェイ（インターネット）
  - サブネット内の通信は自動でルーティング
  - VPCピアリング・Interconnect/VPNはCloud Routerで管理

カスタム静的ルート:
  - 特定の宛先CIDRを手動でネクストホップに向ける
  - ネクストホップ: VM・VPN GW・Internal LB・デフォルトGW

  例: オンプレへのトラフィックをVPN GWに向ける
  gcloud compute routes create route-to-onprem \
    --destination-range=192.168.0.0/16 \
    --network=my-vpc \
    --next-hop-vpn-tunnel=my-vpn-tunnel \
    --next-hop-vpn-tunnel-region=us-central1

ポリシーベースルーティング（PBR）:
  - 送信元IPやソースタグに基づいてルーティングを変更
  - Network Function Chainingに活用

ルートの優先度:
  数値が小さいほど高優先度
  デフォルト: 1000
```

#### ✅ ベストプラクティス: ルーティング

1. **BGPによる動的ルーティングを優先**（静的ルートは管理コストが高い）
2. **ルートの優先度を設計してアクティブ/スタンバイを制御**
3. **デフォルトルートの削除で不要なインターネットアクセスを防止**

> 📎 参照: https://cloud.google.com/vpc/docs/routes

---

## 6. ネットワークセキュリティ設計と実装

### 6.1 Cloud Armor（WAF・DDoS防御）

#### Cloud Armor の役割

```
Cloud Armor が提供するセキュリティ機能:

  1. DDoS攻撃防御
     → Layer 3/4 のボリューム攻撃（SYN Flood・UDP Flood等）
     → Googleのインフラレベルで自動緩和

  2. WAF（Web Application Firewall）
     → SQLインジェクション対策
     → クロスサイトスクリプティング（XSS）対策
     → OWASPトップ10の脆弱性対策
     → 事前設定ルール（Preconfigured Rules）を使用

  3. IPベースのアクセス制御
     → 特定IPまたはIP範囲を許可/拒否
     → ジオブロッキング（国単位でブロック）

  4. Rate Limiting（レート制限）
     → 単一IPからの過度なリクエストを制限
     → スロットリング（503レスポンス）またはリダイレクト

  5. reCAPTCHA Enterprise 統合
     → ボットトラフィックの検出・ブロック

  6. Adaptive Protection
     → AIによるDDoS攻撃パターンの自動検出・推奨ルール生成
```

#### Cloud Armor のルール構造

```
セキュリティポリシー（Security Policy）:
  - 複数のルールをまとめたもの
  - バックエンドサービスに適用

ルールの評価順序:
  - 優先度（0〜2147483647）が低い値ほど高優先度
  - マッチしたルールを適用（ALLOW or DENY）
  - どのルールにもマッチしない → デフォルトルール（通常ALLOW）

設定例:
  Priority 100: DENY  → src IP: known-bad-ips
  Priority 200: ALLOW → src IP: internal-office
  Priority 300: DENY  → SQL Injection detection
  Priority 400: ALLOW → geo: JP, US  (日本・米国のみ許可)
  Default:     DENY   → 上記以外は全て拒否

gcloud compute security-policies create my-security-policy \
  --description="WAF policy"

# OWASPルールの追加
gcloud compute security-policies rules create 300 \
  --security-policy=my-security-policy \
  --expression="evaluatePreconfiguredWaf('sqli-v422-stable')" \
  --action=deny-403

# IPブロックルール
gcloud compute security-policies rules create 100 \
  --security-policy=my-security-policy \
  --src-ip-ranges=1.2.3.4/32 \
  --action=deny-403
```

#### ✅ ベストプラクティス: Cloud Armor

1. **全外部LBにCloud Armorセキュリティポリシーを適用**
2. **Adaptive Protectionを有効化**（AI自動検出）
3. **OWASPの事前設定ルールを有効化**
4. **過剰ブロックを防ぐためプレビューモードで事前テスト**
5. **ログを有効化してアタックパターンを分析**
6. **Rate Limitingで大量リクエスト攻撃を緩和**

> 📎 参照: https://cloud.google.com/armor/docs/cloud-armor-overview

### 6.2 VPC Service Controls（VPC SC）

#### VPC SC とは？

GCPのAPIサービスへのアクセスを**VPCの境界で制限**するセキュリティ機能。データ漏洩（Data Exfiltration）を防止する。

```
VPC Service Controls のイメージ:

  ┌── Service Perimeter（サービス境界）────────────────┐
  │                                                    │
  │  Project A    Project B    BigQuery API            │
  │  (Trust内)    (Trust内)    (保護されたサービス)    │
  │     ↕              ↕              ↕               │
  │  VPC-A         VPC-B      ← 境界内からのみアクセス可│
  │                                                    │
  └────────────────────────────────────────────────────┘
         ↑
  境界外（インターネット・他プロジェクト）からのAPIアクセスを拒否

主な保護対象サービス:
  - BigQuery（機密データの漏洩防止）
  - Cloud Storage（バケットへの不正アクセス防止）
  - Cloud KMS（暗号化キーの保護）
  - Pub/Sub・Spanner・Firestore 等

アクセスレベル（Access Levels）:
  - 境界外のユーザーに条件付きアクセスを許可
  - 条件例: 特定のIPレンジ・MFA使用・デバイスポリシー等
```

#### ✅ ベストプラクティス: VPC SC

1. **機密データを扱うプロジェクトに必ずVPC SCを適用**
2. **ドライランモードで事前影響確認**（本番に適用前に）
3. **アクセスレベルで例外を細かく管理**
4. **Access Context Manager と組み合わせて条件付きアクセスを実装**

> 📎 参照: https://cloud.google.com/vpc-service-controls/docs/overview

### 6.3 Identity-Aware Proxy（IAP）

```
IAPの役割：VPNなしでの安全なアプリケーションアクセス

  従来のVPNアクセス:
    ユーザー → [VPN接続] → [VPCネットワーク] → VM

  IAPを使ったアクセス:
    ユーザー → [HTTPS] → [IAP] → [VM/App]
                 ↑
           Googleが認証・認可を確認
           (Google Account + IAM ポリシー)

  IAPの利点:
    - VPN 不要（クライアントソフト不要）
    - ゼロトラストの実現（毎リクエストで認証）
    - ユーザー属性・デバイス状態で細かい制御
    - BeyondCorp Enterprise との統合

IAPでSSH/RDP接続:
  # SSH（ポート22を外部に開けなくていい）
  gcloud compute ssh my-vm \
    --tunnel-through-iap \
    --project=my-project \
    --zone=us-central1-a

  # 必要なFWルール: IAP のCIDR範囲のみ許可
  gcloud compute firewall-rules create allow-iap-ssh \
    --network=my-vpc \
    --action=ALLOW \
    --rules=tcp:22 \
    --source-ranges=35.235.240.0/20 \
    --target-tags=iap-ssh
```

#### ✅ ベストプラクティス: IAP

1. **SSH/RDPは外部からの直接アクセスを廃止し、IAPで代替**
2. **管理画面・内部ツールへのアクセスはIAPで保護**
3. **アクセスポリシーでデバイス状態・場所を条件に追加**

> 📎 参照: https://cloud.google.com/iap/docs/concepts-overview

### 6.4 Certificate Manager と SSL/TLS

```
SSL/TLS 証明書の管理方法:

  1. Google マネージド証明書（推奨）
     - 自動発行・自動更新
     - コストなし
     - グローバルLBに対応
     - ワイルドカード証明書も対応（Certificate Manager経由）

  2. セルフマネージド証明書
     - 独自の証明書をアップロード
     - 企業の内部CAや特定の証明書が必要な場合

  3. Certificate Manager（新しい方法）
     - 大規模な証明書管理
     - Certificate Map でドメインと証明書を紐付け
     - DNS/HTTP認証でドメイン所有権を確認

SSL Policy（TLS バージョン制御）:
  - Modern: TLS 1.2〜（最新推奨）
  - Restricted: TLS 1.2のみ（厳格なコンプライアンス要件）
  - Compatible: TLS 1.0〜（レガシーシステム向け、非推奨）

  gcloud compute ssl-policies create modern-policy \
    --min-tls-version=TLS_1_2 \
    --profile=MODERN
```

---

## 7. ネットワーク監視・トラブルシューティング

### 7.1 VPC Flow Logs

```
VPC Flow Logs とは:
  - VPCサブネット内のネットワークトラフィックをサンプリングして記録
  - 送信元/宛先IP・ポート・プロトコル・バイト数・パケット数を記録
  - Cloud Loggingに保存（BigQuery・Cloud Storageにエクスポート可能）

有効化:
  gcloud compute networks subnets update my-subnet \
    --enable-flow-logs \
    --logging-aggregation-interval=INTERVAL_5_SEC \
    --logging-flow-sampling=0.5 \
    --logging-metadata=INCLUDE_ALL_METADATA \
    --region=us-central1

設定パラメータ:
  - Aggregation Interval: 5秒〜15分（短いほど詳細・コスト高）
  - Flow Sampling: 0.0〜1.0（1.0=100%サンプリング・デフォルト0.5）
  - Metadata: INCLUDE_ALL_METADATA（詳細情報）or EXCLUDE_ALL_METADATA

ユースケース:
  - セキュリティ監査（不審な通信の検出）
  - ネットワークトラブルシューティング
  - コスト最適化（どのリソースがトラフィックを多く使っているか）
  - コンプライアンス（PCI DSS等のネットワーク記録要件）
```

### 7.2 ファイアウォールルールログ

```
ファイアウォールログの有効化:
  - ルールごとに個別に有効化
  - 許可・拒否の両方をログ可能

  gcloud compute firewall-rules update my-fw-rule \
    --enable-logging

ログの内容:
  - 接続の送信元/宛先
  - プロトコル・ポート
  - 適用されたルール名
  - Allow/Deny の結果

活用方法:
  - 不必要に拒否されているトラフィックの特定
  - セキュリティ侵害の調査
  - コンプライアンス証跡の取得
```

### 7.3 Network Intelligence Center

```
Network Intelligence Center の5つのツール:

  1. Connectivity Tests（接続テスト）
     - 仮想的なパケットトレースで接続性を確認
     - VPCファイアウォール・ルート・NAT等を分析
     - 実際にパケットを送らずに接続可能かを検証

     使用例: 
       gcloud network-management connectivity-tests create my-test \
         --source-instance=projects/P/zones/Z/instances/vm1 \
         --destination-instance=projects/P/zones/Z/instances/vm2 \
         --protocol=TCP \
         --destination-port=80

  2. Performance Dashboard（パフォーマンスダッシュボード）
     - GCPゾーン間・リージョン間のレイテンシをリアルタイム表示
     - Google内部トラフィックの帯域使用状況
     - ネットワーク品質の基準値との比較

  3. Firewall Insights（ファイアウォールインサイト）
     - 使われていないファイアウォールルールを検出
     - ファイアウォールルールの使用統計
     - 設定ミス・過剰な権限の検出
     - Shadow Rules（影になっているルール）の検出

  4. Network Analyzer（ネットワーク分析）
     - VPCネットワーク設定の自動分析
     - 問題点・ベストプラクティス違反の検出
     - 設定変更の推奨

  5. Network Topology（ネットワークトポロジー）
     - VPC・サブネット・VMの接続関係を可視化
     - トラフィックフロー・帯域使用量の表示
```

### 7.4 Packet Mirroring（パケットミラーリング）

```
Packet Mirroringとは:
  - 対象のVMのトラフィックをコピーして別VMで分析
  - ネットワークの詳細分析・IDS（侵入検知）・デバッグに使用

  ┌── 本番VM ──────────────────────────────────┐
  │  全トラフィック ─────────────────────────   │
  │         ↓ ミラー（コピー）               │
  └──────────────────────────────────────────┘
             ↓
  ┌── コレクターVM（IDS・分析ツール） ──────┐
  │  Suricata / Wireshark / Zeek でトラフィック分析│
  └─────────────────────────────────────────┘

設定要件:
  - コレクター: Internal LB (TCP/UDP) が必要
  - ミラーリングポリシー: 送信元・フィルター条件を定義
  - 同一リージョン内のみ
```

### 7.5 トラブルシューティング手順

```
Step 1: 症状を確認
  - どのリソース間の通信が失敗しているか？
  - エラーメッセージは何か？
  - いつから発生しているか？

Step 2: Network Intelligence Center で Connectivity Test
  - 仮想パケットトレースで問題箇所を絞り込む
  - ファイアウォール・ルーティング・NAT のどこか？

Step 3: ファイアウォールルールを確認
  - 送信元/宛先のIPとポートが許可されているか？
  - 暗黙の deny ルールに引っかかっていないか？
  - ファイアウォールログを確認

Step 4: ルーティングを確認
  - 正しいネクストホップにルートが向いているか？
  - VPN/Interconnectのトンネルが UP か？
  - BGPセッションが確立しているか？

Step 5: アプリケーション側を確認
  - サービスが起動しているか？
  - リスニングポートが正しいか？
  - ヘルスチェックは通過しているか？

よくある問題と解決策:
  問題: VPN経由でオンプレに通信できない
  → Cloud Routerの状態確認（BGP Up?）
  → ルート広告を確認（オンプレのCIDRがGCPに届いているか）
  → ファイアウォールルールの確認

  問題: 外部からLBにアクセスできない
  → バックエンドのヘルスチェックが通過しているか確認
  → ヘルスチェック用FWルールが設定されているか確認
  → バックエンドのサービスが起動しているか確認

  問題: VM間通信できない
  → サブネット内通信か、異なるサブネット間か確認
  → ファイアウォールルール（ingress側）を確認
  → ルートが存在するか確認
```

> 📎 参照: https://cloud.google.com/network-intelligence-center/docs/overview  
> 📎 参照: https://cloud.google.com/vpc/docs/using-flow-logs

---

## 8. コスト最適化とネットワーク設計パターン

### 8.1 ネットワークコストの理解

```
Google Cloud ネットワーク課金の主要ポイント:

  1. インターネット下り転送（Egress to Internet）
     - GCPからインターネットへのデータ転送
     - Standard Tier では最初の 200 GiB/月が無料
     - 以降は段階的課金（例: Standard Tier $0.085/GiB for 200 GiB–10 TiB、以降割引あり）
     - Premium Tier は送信元と宛先の地域に応じて変動
     - ※詳細は公式 Google Cloud VPC 料金ページを参照してください。

  2. リージョン間転送（Inter-region）
     - 同一リージョン内: 無料
     - 別リージョン間: 課金あり（$0.01〜$0.08/GB）

  3. Interconnect/VPN 使用料
     - Dedicated Interconnect: 回線ポート代 + データ転送
     - Cloud VPN: トンネル時間料金 + データ転送

  4. Cloud NAT 使用料
     - ゲートウェイ時間 + データ処理量

  5. ロードバランサー
     - 処理データ量 + ルール数

コスト削減のポイント:
  - 同一リージョン内での通信に集約
  - Cloud CDNでオリジンへのトラフィックを削減
  - 不要なNAT/LBを削除
  - ネットワーク帯域幅の使用量を監視
```

### 8.2 主要ネットワーク設計パターン

#### パターン1: ハブ＆スポーク型（推奨・大規模組織向け）

```
Hub & Spoke with Shared VPC:

    ┌── Hub VPC（Shared VPC Host Project）──────────┐
    │  共有サブネット・Cloud VPN/Interconnect・FW    │
    │  Network管理チームが一元管理                  │
    └──────────────────────────────────────────────┘
           ↕ Shared VPC         ↕ Shared VPC
    ┌── Spoke 1 ──────┐  ┌── Spoke 2 ──────┐
    │ サービスプロジェ  │  │ サービスプロジェ  │
    │ クトA（開発部門） │  │ クトB（営業部門） │
    └─────────────────┘  └─────────────────┘

メリット:
  - ネットワーク管理の集中化
  - セキュリティポリシーの一元適用
  - コスト効率（共有リソース）

適用場面: 大企業・複数事業部・中央IT統制が必要な組織
```

#### パターン2: 完全分離型（セキュリティ最優先）

```
Full Isolation with VPC SC:

    ┌── Prod VPC ────────────────────────────────┐
    │  ┌── VPC Service Control Perimeter ──────┐ │
    │  │  BigQuery・GCS・KMS (保護されたAPI)    │ │
    │  └─────────────────────────────────────── │
    └────────────────────────────────────────────┘

    ┌── Dev VPC ──────────────────────────────────┐
    │  ┌── VPC Service Control Perimeter ──────┐  │
    │  │  別のAPI境界（Prodとは完全分離）        │  │
    │  └──────────────────────────────────────── │
    └─────────────────────────────────────────────┘

適用場面: 金融機関・医療・政府機関などコンプライアンス要件が厳しい組織
```

#### パターン3: マルチリージョン高可用性

```
Multi-Region HA Design:

  ┌── us-central1 ──────────────────────────────┐
  │  Managed Instance Group (min:2, max:10)       │
  │  Cloud SQL (Primary)                         │
  └───────────────────────────────────────────────┘
           ↕ Global HTTP(S) LB (Anycast)
  ┌── europe-west1 ──────────────────────────────┐
  │  Managed Instance Group (min:2, max:10)       │
  │  Cloud SQL (Replica)                         │
  └───────────────────────────────────────────────┘

  単一障害点なし:
  - グローバルLBが最寄りの正常なリージョンに自動フェイルオーバー
  - Cloud SQL のフェイルオーバーレプリカ
```

---

## 9. 頻出サービス早見表と試験攻略チェックリスト

### 9.1 頻出サービス早見表

| サービス | キーワード | 用途 |
|---|---|---|
| **VPC** | グローバルスコープ・Custom Mode | ネットワーク基盤 |
| **Shared VPC** | 集中管理・Host/Service Project | 企業内ネットワーク統合 |
| **VPC Peering** | 異VPC通信・推移的ルーティング不可 | VPC間プライベート通信 |
| **Cloud VPN (HA)** | 99.99% SLA・BGP・2トンネル | オンプレとの暗号化接続 |
| **Dedicated Interconnect** | 専用線・10G/100G・低レイテンシ | 大帯域オンプレ接続 |
| **Partner Interconnect** | パートナー経由・50Mbps〜50Gbps | 中帯域オンプレ接続 |
| **Cloud Router** | BGP・動的ルーティング | ルート交換エンジン |
| **Cloud NAT** | アウトバウンドのみ・外部IP不要 | プライベートVM→インターネット |
| **Global HTTP(S) LB** | L7・Anycast・URL map・CDN | Webアプリグローバル配信 |
| **Internal HTTP(S) LB** | L7・VPC内・マイクロサービス | 内部Webサービス負荷分散 |
| **Network LB** | L4・パススルー・クライアントIP保持 | 非HTTP・UDP・クライアントIP必要 |
| **Cloud CDN** | キャッシュ・Edgeポイント・静的コンテンツ | コンテンツ高速配信 |
| **Cloud Armor** | WAF・DDoS・IP制御・OWASP | Webセキュリティ |
| **Cloud DNS** | パブリック/プライベートゾーン・転送 | DNS管理 |
| **Private Google Access** | 外部IPなし→GCPサービスアクセス | セキュアなGCPサービス利用 |
| **PSC** | プライベート接続・VPCピアリング不要 | マネージドサービスへの接続 |
| **VPC Flow Logs** | トラフィック記録・セキュリティ監査 | 可視性・コンプライアンス |
| **VPC SC** | API境界・データ漏洩防止 | 高セキュリティ環境 |
| **IAP** | VPNなし・ゼロトラスト・SSH/RDP | セキュアな管理アクセス |
| **Connectivity Test** | 仮想パケットトレース・疎通確認 | トラブルシューティング |
| **Packet Mirroring** | トラフィックコピー・IDS | 詳細分析・セキュリティ監視 |
| **NCC** | ハブ＆スポーク・多拠点接続 | 大規模ネットワーク管理 |

### 9.2 試験攻略チェックリスト

#### Section 1: VPCネットワーク設計

```
必須知識:
  □ VPCのグローバルスコープを理解している
  □ Auto Mode と Custom Mode の違いと使い分けを説明できる
  □ サブネットのリージョンスコープを理解している
  □ CIDR 設計の原則（重複回避・拡張計画）を説明できる
  □ ファイアウォールルールの優先度評価を説明できる
  □ タグ vs サービスアカウント ベースのFWルールの違いを説明できる
  □ 階層型ファイアウォールポリシーの評価順序を説明できる
  □ VPCピアリングの推移的ルーティング不可を理解している
  □ Shared VPC の Host/Service Project の役割を説明できる
  □ Private Google Access の有効化方法を知っている
  □ Cloud NAT の動作原理（アウトバウンドのみ）を説明できる
```

#### Section 2: ハイブリッド接続

```
必須知識:
  □ HA VPN と Classic VPN の違いと SLA を説明できる
  □ Cloud VPN の HA 構成（2トンネル）を説明できる
  □ Dedicated Interconnect と Partner Interconnect の違いを説明できる
  □ Interconnect の 99.99% SLA 構成（2 Metro・4回線）を説明できる
  □ Cloud Router と BGP の役割を説明できる
  □ BGP でのルート交換の仕組みを説明できる
  □ NCC のハブ＆スポーク型アーキテクチャを説明できる
```

#### Section 3: ロードバランシング

```
必須知識:
  □ 6種類のLBの適用場面を説明できる
  □ Global と Regional LB の違いを説明できる
  □ Proxy型 vs パススルー型の違いを説明できる
  □ URL Mapでのルーティングを設計できる
  □ NEGの種類（Zonal・Serverless・Internet）を説明できる
  □ Health Checkのパラメータを適切に設定できる
  □ Cloud CDNのキャッシュモードを説明できる
  □ Cloud ArmorのSecurity Policyを設計できる
```

#### Section 4: DNS・IPアドレス管理

```
必須知識:
  □ パブリックゾーンとプライベートゾーンの違いを説明できる
  □ DNS転送（アウトバウンド・インバウンド）を説明できる
  □ DNS ピアリングの用途を説明できる
  □ エフェメラルIPと静的IPの違いを説明できる
  □ グローバルIPとリージョンIPの違いを説明できる
```

#### Section 5: ネットワークセキュリティ

```
必須知識:
  □ Cloud Armorの主要機能（WAF・DDoS・Rate Limiting）を説明できる
  □ VPC Service Controlsの目的（データ漏洩防止）を説明できる
  □ IAPによるSSH/RDPアクセスの仕組みを説明できる
  □ SSL Policyの設定方法を説明できる
  □ VPC Flow LogsのサンプリングレートとAggregation Intervalを説明できる
```

#### Section 6: ネットワーク監視・運用

```
必須知識:
  □ Network Intelligence Center の5ツールを説明できる
  □ Connectivity Testで問題を絞り込む手順を説明できる
  □ VPC Flow LogsとFirewall Logsの違いを説明できる
  □ Packet Mirroringの用途と要件を説明できる
  □ Firewall Insightsで未使用ルールを検出できる
```

### 9.3 よく混同されるポイント

| 混同パターン | 正しい理解 |
|---|---|
| VPC はリージョンスコープ | VPCはグローバル、サブネットがリージョン |
| Cloud VPN = 99.99% SLA | HA VPN = 99.99%、Classic VPN = 99.9% |
| Cloud NAT でインバウンドOK | Cloud NAT はアウトバウンドのみ |
| VPC Peering で推移的ルーティング | 推移的ルーティング不可（A-B-C でAとCは通信不可） |
| Dedicated Interconnect は誰でも使える | Google指定のコロケーション施設に接続できる場合のみ |
| Network LBはCloudArmorが使える | Cloud ArmorはProxy型LBのみ対応、パススルー型は不可 |
| プライベートゾーンはVPC外からアクセス可 | プライベートゾーンは指定VPCからのみアクセス可 |

### 9.4 試験当日のポイント

```
解答戦略:

1. 「最もシンプルな解決策」を選ぶ
   → 複雑な構成より管理が簡単なソリューションが正解になりやすい

2. 「マネージドサービスを優先」
   → 自分で管理するより Google が管理するサービスを選ぶ

3. 「冗長性・HA の要件を確認」
   → 99.99% SLA が必要なら HA VPN・Interconnect 複数 Metro

4. 「コストと要件のバランス」
   → Dedicated Interconnect が必須か、VPNで十分か

5. 「セキュリティは最小権限」
   → 最も限定的なアクセスを許可するソリューション

6. 「ハイブリッド接続の帯域要件を確認」
   → 大帯域 → Interconnect、中帯域 → Partner、小帯域/コスト優先 → VPN
```

---

## 📎 公式参照リソース一覧

| カテゴリ | リソース | URL |
|---|---|---|
| **試験情報** | PCNE 試験概要ページ | https://cloud.google.com/learn/certification/cloud-network-engineer |
| **試験情報** | 試験ガイド | https://cloud.google.com/learn/certification/guides/cloud-network-engineer |
| **VPC基礎** | VPC概要 | https://cloud.google.com/vpc/docs/vpc |
| **VPC基礎** | サブネット | https://cloud.google.com/vpc/docs/subnets |
| **VPC基礎** | ファイアウォールルール | https://cloud.google.com/vpc/docs/firewalls |
| **VPC基礎** | 階層型FWポリシー | https://cloud.google.com/vpc/docs/firewall-policies |
| **VPC基礎** | VPCピアリング | https://cloud.google.com/vpc/docs/vpc-peering |
| **VPC基礎** | Shared VPC | https://cloud.google.com/vpc/docs/shared-vpc |
| **VPC基礎** | Private Google Access | https://cloud.google.com/vpc/docs/private-google-access |
| **VPC基礎** | Private Service Connect | https://cloud.google.com/vpc/docs/private-service-connect |
| **VPC基礎** | Cloud NAT | https://cloud.google.com/nat/docs/overview |
| **ハイブリッド** | Cloud VPN 概要 | https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview |
| **ハイブリッド** | HA VPN 作成 | https://cloud.google.com/network-connectivity/docs/vpn/how-to/creating-ha-vpn |
| **ハイブリッド** | Cloud Interconnect 概要 | https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview |
| **ハイブリッド** | Interconnect ベストプラクティス | https://cloud.google.com/network-connectivity/docs/interconnect/concepts/best-practices |
| **ハイブリッド** | Cloud Router 概要 | https://cloud.google.com/network-connectivity/docs/router/concepts/overview |
| **ハイブリッド** | NCC 概要 | https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview |
| **ロードバランシング** | LB 概要 | https://cloud.google.com/load-balancing/docs/load-balancing-overview |
| **ロードバランシング** | Global HTTP(S) LB | https://cloud.google.com/load-balancing/docs/https |
| **ロードバランシング** | Health Check | https://cloud.google.com/load-balancing/docs/health-checks |
| **CDN** | Cloud CDN 概要 | https://cloud.google.com/cdn/docs/overview |
| **DNS** | Cloud DNS 概要 | https://cloud.google.com/dns/docs/overview |
| **セキュリティ** | Cloud Armor 概要 | https://cloud.google.com/armor/docs/cloud-armor-overview |
| **セキュリティ** | VPC Service Controls 概要 | https://cloud.google.com/vpc-service-controls/docs/overview |
| **セキュリティ** | IAP 概要 | https://cloud.google.com/iap/docs/concepts-overview |
| **セキュリティ** | ルート | https://cloud.google.com/vpc/docs/routes |
| **監視** | VPC Flow Logs | https://cloud.google.com/vpc/docs/using-flow-logs |
| **監視** | Network Intelligence Center | https://cloud.google.com/network-intelligence-center/docs/overview |

---

## 📝 学習メモ欄

```
自分の弱点・重点復習ポイントを記録:

□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
□ _____________________________________________
```

---

*本ガイドは Google Cloud Professional Cloud Network Engineer（PCNE）試験の対策学習資料です。*  
*試験の最新情報・サービス仕様は必ず公式サイトでご確認ください。*  
*作成日: 2026年4月*
