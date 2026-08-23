# CLAUDE.md

Updated 2026-08-15

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GCP/AWS/Cisco 資格試験対策（Associate Cloud Engineer, Generative AI Leader, Cloud Digital Leader, Associate Google Workspace Administrator, Professional Cloud Network Engineer, Cisco Certified Network Associate, Cisco Certified Network Associate Automation、AWS Certified Solutions Architect – Associate ※準備中）を目的としたNext.js学習アプリ。

試験データの正本は `app/constants.ts` の `EXAMS` 配列。ナビゲーションは `app/navigation.ts` の `toNavTree(EXAMS)` で自動生成されるため、新試験追加時は **`Header.tsx` を直接編集しない**。新試験追加の手順は ① `app/constants.ts` の `EXAMS` にエントリ追加、② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加、③ 試験ページ作成 の 3 ファイルのみ変更すれば Header に自動反映される。

## コマンド

```bash
# 開発（ローカル）
bun run dev          # Turbopack で開発サーバー起動（localhost:3000）
bun run build        # プロダクションビルド
bun run lint         # ESLint
bun run markdownlint -- <file> # Markdown lint（プロジェクト固定版）

# テスト
bun run test         # Vitest（ユニット・コンポーネント）
bun run test:watch   # Vitest ウォッチモード（単一ファイル: vitest run __tests__/foo.test.tsx）
bun run test:e2e     # Playwright E2E（chromium project: smoke / nav / a11y / visual / 各ドメイン）
bun run test:perf    # Playwright perf project: Core Web Vitals (LCP/CLS/TBT) を perf-budgets.json と比較
bun run test:security # bun audit --json を集計し high/critical 検出時に exit 1 (scripts/security-audit.mjs)
bun run test:md-to-html # md-to-html スキルの監査 2 本の自己テスト (bun test にパス明示)

# カバレッジ可視化
bun run dashboard    # 静的スキャンで docs/coverage-dashboard.html を再生成

# パフォーマンス手動レポート（深掘り分析用）
bun run build && bun run perf:report  # @lhci/cli autorun。.lighthouseci/ に JSON/HTML 出力
```

初回E2Eテスト前: `bunx playwright install`

カバレッジダッシュボードは `__tests__/` と `e2e/` の静的解析（`import '@/...'` と `page.goto('/...')` の抽出）で生成される単一 HTML。`@vitest/coverage-v8` 等のランタイム計測ではないため、テスト追加時は `bun run dashboard` を再実行する。

```bash
# Docker
bun run docker:rebuild # コンテナ停止 → 本番イメージ作成 → 開発コンテナ再構築・起動
make dev             # 開発サーバー起動（hot reload、bind mount）
make prod            # 本番ビルド & 起動（standalone、256MB）
make down            # コンテナ停止・削除
make logs            # 本番コンテナのログ表示
make logs-dev        # 開発コンテナのログ表示
make shell           # 本番コンテナ内シェル（デバッグ用）
make clean           # コンテナ + 名前付きボリューム削除
make help            # コマンド一覧
```

Docker 関連ファイル: `Dockerfile`（本番）、`Dockerfile.dev`（開発）、`compose.yaml`、`.dockerignore`

```bash
# Netlify（CI/CD 自動ビルド）
# netlify.toml に従い Netlify が自動実行。手動トリガー不要。
# ローカルで Netlify モード（output=undefined）のビルド確認:
bun run build   # NEXT_OUTPUT_MODE 未設定で実行
```

## アーキテクチャ

**ルーティング:** Next.js 16 App Router。全ページは `app/` 配下。

```text
app/
  layout.tsx                        # ルートレイアウト（Header/DisclaimerBanner/Footer、フォント定義）
  page.tsx                          # トップページ（データ抽出とセクション合成）
  globals.css                       # グローバルスタイル（デザイントークン定義）
  constants.ts                      # 試験データ正本（EXAMS / STATS）。新試験はここに追加するだけ
  navigation.ts                     # toNavTree(EXAMS) adapter → NavGroup[] を生成し Header が参照
  gcl/
    associate-cloud-engineer/
      page.tsx                      # ACE 試験対策ページ
      ace.css                       # Aurora テーマ（ページ固有）
      complete-advanced-guide/
        page.tsx                    # 完全試験対策ガイドページ
        page.css                    # ページ固有スタイル
        constants.ts                # 定数（Mermaidダイアグラム等）
        NavBar.tsx                  # サイドバーナビ
      section1/
        page.tsx                    # Section 1 完全ガイド（Server。メタデータ定義）
        Section1Guide.tsx           # 本文＋インタラクション（client。進捗バー/scroll spy/チェックリスト）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（diag-6 修正済み）
        page.css                    # ページ固有スタイル（token 整合）
      section2/
        page.tsx                    # Section 2 完全ガイド（Server。メタデータ定義）
        Section2Guide.tsx           # 本文＋インタラクション（client。進捗バー/scroll spy/チェックリスト）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（21図）
        page.css                    # ページ固有スタイル（token 整合）
      section3/
        page.tsx                    # Section 3 完全ガイド（Server。メタデータ定義）
        AceSection3Guide.tsx        # 本文＋インタラクション（client。進捗バー/scroll spy/チェックリスト）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（10図）
        page.module.css             # ページ固有スタイル（token 整合）
      cloud-load-balancing-guide/
        page.tsx                    # Cloud Load Balancing 完全入門（Server。メタデータ定義）
        CloudLoadBalancingGuide.tsx # 本文＋インタラクション（client。進捗バー/scroll spy/コピー機能）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（6図）
        page.module.css             # ページ固有スタイル（CSS Modules、token 整合）
      domain1/page.tsx              # Domain 1: 環境設定
      domain2/
        page.tsx                    # Domain 2: 計画と実装
        constants.ts                # Domain 2 固有定数
        domain2.css                 # ページ固有スタイル
        layout.tsx                  # Domain 2 レイアウト
        Chapter17.tsx / Chapter18.tsx  # セクションコンポーネント
      domain3/
        page.tsx                    # Domain 3: 運用管理
        constants.ts                # Domain 3 固有定数
        domain3.css                 # ページ固有スタイル
        layout.tsx                  # Domain 3 レイアウト
      domain4/
        page.tsx                    # Domain 4: アクセスとセキュリティ
        constants.ts                # Domain 4 固有定数
        domain4.css                 # ページ固有スタイル
        layout.tsx                  # Domain 4 レイアウト
  comptia/
    network-plus/
      page.tsx                      # CompTIA Network+ (N10-009 / V9) 完全ガイド (Server)
      ComptiaNetworkPlusGuide.tsx   # 本文＋インタラクション (Client。全13セクション、Mermaid等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（4図）
      page.css                      # ページ固有スタイル（サイドバー幅280px契約準拠）
      networking-concepts-guide/
        page.tsx                    # Domain 1.0: Networking Concepts ガイド (Server)
        ComptiaNetworkingConceptsGuide.tsx # 本文＋インタラクション (Client。8ステップ、Mermaid 19図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（19図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
      network-operations-guide/
        page.tsx                    # Domain 3.0: Network Operations ガイド (Server)
        ComptiaNetworkOperationsGuide.tsx # 本文＋インタラクション (Client。8トピック、Mermaid 10図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（10図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
    hands-on/
      cloud-load-balancing-guide/
        page.tsx                    # Cloud Load Balancing 完全入門（Server。メタデータ定義）
        CloudLoadBalancingGuide.tsx # 本文＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（6図）
        page.module.css             # ページ固有スタイル
      develop-your-gcp-network/
        page.tsx                    # GCPネットワーク完全入門（Server。メタデータ定義）
        DevelopYourGcpNetworkGuide.tsx # 本文＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（14図）
        page.css                    # ページ固有スタイル
      build-a-secure-google-cloud-network/
        page.tsx                    # 安全なGoogle Cloudネットワーク構築（Server。メタデータ定義）
        BuildASecureGoogleCloudNetworkGuide.tsx # 本文＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（11図）
        page.css                    # ページ固有スタイル
      set-up-an-app-dev-environment-on-google-cloud/
        page.tsx                    # アプリ開発環境構築 完全ガイド（Server。メタデータ定義）
        SetUpAnAppDevEnvironmentGuide.tsx # 本文＋インタラクション（client。Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（14図）
        page.css                    # ページ固有スタイル
      gcp-security-fundamentals-guide/
        page.tsx                    # Google Cloud セキュリティ基礎 完全ガイド（Server。メタデータ定義）
        GcpSecurityFundamentalsGuide.tsx # 本文＋インタラクション（client。Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（16図）
        page.css                    # ページ固有スタイル
      griffin-wordpress-gke-guide/
        page.tsx                    # Team Griffin チャレンジラボ 完全解説ガイド（Server。メタデータ定義）
        GriffinWordPressGkeGuide.tsx # 本文＋インタラクション（client。Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（3図）
        page.css                    # ページ固有スタイル
    genai-leader/
      page.tsx                      # Generative AI Leader トップ
      genai-leader.css              # Sapphire テーマ（ページ固有）
      constants.ts                  # 共通定数（作成日など）
      section1/
        page.tsx                    # Section 1: AI の基礎と ML の概念
        section1.css                # ページ固有スタイル
        components/                 # 分割されたセクションコンポーネント（Batch E）
      section2/
        page.tsx                    # Section 2: Google Cloud の Gen AI サービス
        section2.css                # ページ固有スタイル
        components/                 # 分割されたセクションコンポーネント（Batch E）
      section3/page.tsx             # Section 3: Gen AI ソリューションの開発
      section4/page.tsx             # Section 4: 責任ある AI
    cloud-digital-leader/
      layout.tsx                    # CDL 共通レイアウト
      page.tsx                      # CDL トップページ
      constants.ts                  # CDL 共通定数
      cdl.css                       # CDL 共通テーマ（--cdl-* トークン定義）
      components/
        SectionCard.tsx             # 共通カードコンポーネント
        shared/
          TableComponent.tsx        # 共通テーブルコンポーネント
      section1/
        page.tsx                    # Section 1: デジタルトランスフォーメーション
        components/sections/        # 分割されたセクションコンポーネント
      section2/
        page.tsx                    # Section 2: データとクラウドの基礎
        components/sections/        # 分割されたセクションコンポーネント
      section3/
        page.tsx                    # Section 3: AI によるイノベーション
        section3.css                # ページ固有スタイル（plain CSS）
        constants.ts                # Section 3 固有定数
        components/sections/        # 分割されたセクションコンポーネント
      section4/
        page.tsx                    # Section 4: インフラ&アプリのモダナイゼーション
        section4.module.css         # ページ固有スタイル（CSS Modules）
        constants.ts                # Section 4 固有定数（NAV_LINKS, MIGRATION_STRATEGIES）
        components/sections/        # 分割されたセクションコンポーネント
      section5/
        page.tsx                    # Section 5: セキュリティ＆コンプライアンス
        section5.module.css         # ページ固有スタイル（CSS Modules）
        constants.ts                # Section 5 固有定数
        components/sections/        # 分割されたセクションコンポーネント
      section6/
        page.tsx                    # Section 6: コスト管理・SRE・サステナビリティ
        components/                 # 分割されたセクションコンポーネント
    agwa/
      page.tsx                      # AGWA トップページ
      section1/
        page.tsx                    # Section 1: アカウント・ドメイン・ディレクトリ管理
        page.css                    # ページ固有スタイル
      section2/
        page.tsx                    # Section 2: コアサービス管理
        page.css                    # ページ固有スタイル
      section3/
        page.tsx                    # Section 3: データガバナンスとコンプライアンスの管理
        AgwaSection3Guide.tsx       # 本文＋全Mermaid図＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid図定義
        AgwaSection3Guide.module.css # ページ固有スタイル（CSS Modules）
      section4/
        page.tsx                    # Section 4: セキュリティポリシーとアクセス制御の管理
        AgwaSection4Guide.tsx       # 本文＋全Mermaid図＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid図定義
        page.css                    # ページ固有スタイル
      section5/
        page.tsx                    # Section 5: ブラウザとエンドポイントの管理 (Server)
        AgwaSection5Guide.tsx       # 本文＋全Mermaid図＋インタラクション (Client)
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid図定義 (10図)
        page.css                    # ページ固有スタイル
      section6/
        page.tsx                    # Section 6: 監視とトラブルシューティング (Server)
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # 目次定義
        page.module.css             # ページ固有スタイル（CSS Modules）
        components/sections/        # AgwaSection6Guide 本文コンポーネント
    professional-cloud-network-engineer/
      page.tsx                      # PCNE 試験対策ページ（概要・ドメイン別解説）
      components/                   # セクションコンポーネント（Section1-6 + Summary）
      section1-vpc-design/
        page.tsx                    # Section 1: VPCネットワーク設計 完全ガイド (Server)
        PcneSection1VpcDesignGuide.tsx # 本文＋インタラクション (Client。全10セクション、31 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (31図)
        page.css                    # ページ固有スタイル
      section2-vpc-implementation/
        page.tsx                    # Section 2: VPCネットワークの実装 完全ガイド (Server)
        PcneSection2VpcImplementationGuide.tsx # 本文＋インタラクション (Client。全9セクション、17 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
      section3-load-balancing/
        page.tsx                    # Section 3: ロードバランシングとトラフィック管理 完全ガイド (Server)
        PcneSection3LoadBalancingGuide.tsx # 本文＋インタラクション (Client。全7セクション、10 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (10図)
        page.css                    # ページ固有スタイル
      section4-cdn-dns-ipam/
        page.tsx                    # Section 4: CDN・DNS・IPアドレス管理 完全ガイド (Server)
        PcneSection4CdnDnsIpamGuide.tsx # 本文＋インタラクション (Client。全6セクション、20 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (20図)
        page.css                    # ページ固有スタイル
      section5-network-security/
        page.tsx                    # Section 5: ネットワークセキュリティの設計と実装 完全ガイド (Server)
        PcneSection5NetworkSecurityGuide.tsx # 本文＋インタラクション (Client。全7セクション、17 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
      section6-network-ops-monitoring/
        page.tsx                    # Section 6: ネットワーク操作と監視 完全ガイド (Server)
        PcneSection6NetworkOpsMonitoringGuide.tsx # 本文＋インタラクション (Client。全7セクション、20 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (20図)
        page.css                    # ページ固有スタイル
    professional-cloud-network-engineer-step-by-step/
      page.tsx                      # PCNE ステップバイステップ実践ガイド
      components/                   # セクションコンポーネント（Section1-6）
    professional-cloud-architect/
      page.tsx                      # Professional Cloud Architect（PCA）認定試験 完全対策ガイド (Server)
      PcaGuide.tsx                  # 本文＋インタラクション (Client。全6セクション、17 Mermaid図、25テーブル等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義 (17図)
      page.css                      # ページ固有スタイル
      section1-design-planning/
        page.tsx                    # PCA Section 1: 設計と計画 完全ガイド (Server)
        PcaSection1Guide.tsx        # 本文＋インタラクション (Client。全10セクション、17 Mermaid図、14テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
  cisco/
    devnet-professional/
      page.tsx                      # Cisco Certified DevNet Professional 認定 徹底解説ガイド（Server）
      DevNetProfessionalGuide.tsx   # 本文＋インタラクション（client。全13セクション、Mermaid等）
      NavBar.tsx                    # サイドバーナビ（IntersectionObserver）
      constants.ts                  # Mermaid 図定義（6図）
      page.module.css               # ページ固有スタイル（CSS Modules）
    devnet-associate/
      page.tsx                      # Cisco Certified DevNet Associate (200-901 / CCNA Automation) 完全対策ガイド（Server）
      DevNetAssociateGuide.tsx      # 本文＋インタラクション（client。全12セクション、Mermaid等）
      NavBar.tsx                    # サイドバーナビ（IntersectionObserver）
      constants.ts                  # Mermaid 図定義（4図）
      page.module.css               # ページ固有スタイル（CSS Modules／ガイド固有トークン）
    ccde/
      complete-guide/
        page.tsx                    # Cisco CCDE試験 完全ガイド（Server。メタデータ定義）
        CcdeGuide.tsx               # 本文＋インタラクション（client。全12セクション、Mermaid等）
        NavBar.tsx                  # ヘッダー下部ナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（5図）
        page.css                    # ページ固有スタイル
    ccna/
      beginner-guide/
        page.tsx                    # Cisco CCNA試験 完全ガイド（Server。メタデータ定義）
        CcnaBeginnerGuide.tsx       # 本文＋インタラクション（client。全12セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（5図）
        page.css                    # ページ固有スタイル
      automation-software-development-design/
        page.tsx                    # CCNA Automation ソフトウェア開発と設計 完全ガイド（Server。メタデータ定義）
        CcnaSoftwareDevDesignGuide.tsx # 本文＋インタラクション（client。全13セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（12図）
        page.css                    # ページ固有スタイル
      automation-api-guide/
        page.tsx                    # CCNA Automation API 完全ガイド（Server。メタデータ定義）
      automation-application-deployment-security/
        page.tsx                    # CCNA Automation Application Deployment and Security 完全ガイド
      automation-cisco-platforms-and-development/
        page.tsx                    # CCNA Automation Cisco Platforms and Development 徹底解説ガイド（Server。メタデータ定義）
        CcnaCiscoPlatformsDevelopmentGuide.tsx # 本文＋インタラクション（client。全13セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（10図）
        page.module.css             # ページ固有スタイル
      automation-infrastructure-and-automation/
        page.tsx                    # CCNA Automation 5.0 Infrastructure and Automation ステップバイステップ解説ガイド（Server。メタデータ定義）
        CcnaInfraAutomationGuide.tsx # 本文＋インタラクション（client。全17セクション、15個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（15図）
        page.css                    # ページ固有スタイル
      automation-network-fundamentals/
        page.tsx                    # CCNAAUTO 200-901 6.0 Network Fundamentals 完全ガイド
      security-fundamentals/
        page.tsx                    # CCNA 200-301 Security Fundamentals 完全ガイド（Server。メタデータ定義）
        CcnaSecurityFundamentalsGuide.tsx # 本文＋インタラクション（client。全12章、10個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（10図）
        page.css                    # ページ固有スタイル
      network-fundamentals-guide/
        page.tsx                    # CCNA 200-301 Network Fundamentals ネットワークの基礎 入門ガイド（Server。メタデータ定義）
        CcnaNetworkFundamentalsGuide.tsx # 本文＋インタラクション（client。全10章、10個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（10図）
        page.css                    # ページ固有スタイル
      network-access-guide/
        page.tsx                    # CCNA 200-301 Network Access 徹底解説ガイド（Server。メタデータ定義）
        CcnaNetworkAccessGuide.tsx  # 本文＋インタラクション（client。全15セクション、17個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（17図）
        page.css                    # ページ固有スタイル
      ip-connectivity-guide/
        page.tsx                    # CCNA 200-301 IP Connectivity 完全ガイド（Server。メタデータ定義）
        CcnaIpConnectivityGuide.tsx # 本文＋インタラクション（client。全6章＋まとめ、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（7図）
        page.css                    # ページ固有スタイル
      ip-services-guide/
        page.tsx                    # CCNA 200-301 IP Services 完全ガイド（Server。メタデータ定義）
        CcnaIpServicesGuide.tsx     # 本文＋インタラクション（client。全12セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（18図）
        page.css                    # ページ固有スタイル
      automation-programmability/
        page.tsx                    # CCNA 200-301 6.0 自動化とプログラマビリティ 完全ガイド（Server。メタデータ定義）
        CcnaAutomationProgrammabilityGuide.tsx # 本文＋インタラクション（client。全10セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（7図）
        page.css                    # ページ固有スタイル
  aws/
    solutions-architect-associate/
      page.tsx                      # AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド (Server)
      SaaGuide.tsx                  # 本文＋インタラクション (Client)
      NavBar.tsx                    # サイドバーナビ
      constants.ts                  # Mermaid 図定義（21図）
      page.css                      # ページ固有スタイル
      domain1/
        page.tsx                    # ドメイン1: セキュアなアーキテクチャの設計 (Server)
        Domain1Guide.tsx            # ドメイン1本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン1サイドバーナビ
        constants.ts                # Mermaid 図定義（14図）
        page.css                    # ドメイン1ページ固有スタイル
      domain2/
        page.tsx                    # ドメイン2: 回復力のあるアーキテクチャの設計 (Server)
        Domain2Guide.tsx            # ドメイン2本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン2サイドバーナビ
        constants.ts                # Mermaid 図定義（25図）
        page.css                    # ドメイン2ページ固有スタイル
      domain3/
        page.tsx                    # ドメイン3: 高性能なアーキテクチャの設計 (Server)
        Domain3Guide.tsx            # ドメイン3本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン3サイドバーナビ
        constants.ts                # Mermaid 図定義（27図）
        page.css                    # ドメイン3ページ固有スタイル
      domain4/
        page.tsx                    # ドメイン4: コスト最適化アーキテクチャの設計 (Server)
        Domain4Guide.tsx            # ドメイン4本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン4サイドバーナビ
        constants.ts                # Mermaid 図定義（29図）
        page.css                    # ドメイン4ページ固有スタイル


components/
  Header.tsx                        # ハンバーガー Drawer ナビ。toNavTree(EXAMS) の結果を描画するため直接編集不要。検索フィルタ・active リンク判定 (usePathname)・最近見たページ表示を内包
  Footer.tsx                        # シンプルなフッター（サイト名のみ）
  DisclaimerBanner.tsx              # 免責事項バナー。Header 直下に sticky で貼り付き（top: var(--header-h)）、scroll 中も Header→Disclaimer→本文 の順序を保つ
  DiagramSVG.tsx                    # SVG ダイアグラム共通コンポーネント（ariaLabel または decorative 必須）
  RecentPageRecorder.tsx            # 'use client'、DOM レス。usePathname 監視で lib/recentPages.pushRecent を呼ぶ。layout.tsx に 1 度だけ配置
  sections/home/                    # ホームの Hero / ExamCard / ExamCatalog / Stats

lib/
  utils.ts                          # cn() (clsx + tailwind-merge)
  recentPages.ts                    # 最近見たページ履歴 (localStorage, MAX 5件, SSR safe, 型ガード)

__tests__/                          # Vitest（jsdom環境）
e2e/                                # Playwright（Chromiumのみ）
archive/                            # 移行済み資料の正規アーカイブ
  Cisco/
    html/                           # Cisco HTML資料
    md/                             # Cisco Markdown資料
  Gcl_Archive/                      # Cisco以外の旧GCP資料
  Aws/                              # AWS資料
```

## CSSデザイントークン（3層アーキテクチャ）

**Layer 1 – グローバルセマンティック** (`app/globals.css` の `@theme {}`):

- `--color-background`, `--color-foreground`, `--color-muted`, `--color-border` 等
- Tailwind v4 の `@theme` で定義するため `tailwind.config.js` は存在しない

**Layer 2 – 共有プリミティブ** (同 `@theme`):

- `--font-body`, `--font-mono`, `--radius-*`

**Layer 3 – ページ固有テーマ** (`app/globals.css` の `@theme`):

- Aurora（ACE）、Sapphire/Laboratory/Gold/Executive（Generative AI Leader 各セクション）
- テーマトークンと新しいテーマカラーはすべてグローバルな `@theme` に集約

ページ固有の `.css` / `.module.css` は `app/globals.css` に存在する `--color-*` トークンのみを参照する。コンポーネントレベルで新しい `--*` を定義したり、テーマごとにCSSファイルを追加・インポートしたりしない。新しいテーマカラーが必要な場合は、先に `app/globals.css` の `@theme` へ追加する。

## テスト構成

- **Vitest:** `__tests__/**/*.test.{ts,tsx}` と `.agents/skills/fix-mermaid/scripts/restore_diagrams.test.ts`、jsdom環境、`@` エイリアスが `./` に解決される
- **Playwright:** `e2e/` 配下、Chromiumのみ、`baseURL: http://localhost:3000`、CIでは`bun run dev`を自動起動
- **移行忠実性テストは移行元アーカイブを読まない**: `/archive/` は `.gitignore` 済みのローカル専用資産で CI には存在しない。移行元との照合が必要なテストは、コミット済み fixture（`docs/migration-inventory/<slug>.json` と `<slug>.fidelity.json`）を `import` する。fidelity fixture の対象・セレクタは `scripts/archive-fidelity-config.mjs` が正本で、`bun scripts/gen-fidelity-fixture.mjs <slug>|--all` で生成する（抽出ロジックは生成側・検証側が `scripts/archive-fidelity-extraction.mjs` を共有）。詳細は `.agents/rules/tdd-commit-workflow.md` §1-3。

**🚨 開発時の必須ルール（TDD & Step-by-step Commit） 🚨**
全てのコード実装において、正準の `.agents/rules/tdd-commit-workflow.md` に定義されたルールを厳守すること。`.claude/rules/tdd-commit-workflow.md` と `.gemini/rules/tdd-commit-workflow.md` は同期ミラーである。
1. **Step 0 — Inventory:** 移行タスクでは移行元からインベントリを機械抽出し、実装前にコミットする。
2. **Step 1 — Fail:** プロダクションコードを書く前に、必ずFailするテストを書いてコミットする。
3. **Step 2 — Pass:** テストをPassさせる実装を行いコミットする。
4. **Step 3 — Refactor:** リファクタリング/統合を行いコミットする。
※ LLMはタスク実行前に必ずこのルールをPlanに組み込み、まとめて実装・コミットすることを避けること。

**ガイド Markdown → 単一 HTML 変換タスク時**: `.agents/skills/md-to-html/SKILL.md` を読むこと。デザインの正は `Gcp-pca-section4-process-optimization.html`（暗色テーマ / `<section>` を使わないフラット構造 / `pre.mermaid` インライン / 脚注 `.footnote-ref` + `.ref-grid`）。転写漏れとデザイン漏れを検出する 2 本の監査（`bun run test:md-to-html` で自己テスト）が Green の前提条件であり、**両方 exit 0 になるまでコミットしない**。生成した HTML を `app/` 配下へ移す作業は別スキル（`html-to-nextjs-migration`）の責務で、本スキルからは `app/` を編集しない。

**HTML → Next.js 移行タスク時**: まず `.agents/skills/html-to-nextjs-migration/SKILL.md` の「正準リファレンス」を読むこと。GCPトークンマップ・サイドバー配置値・MermaidDiagram契約・ガイドページのファイル構成が前出しされており、参照 `page.tsx`/`NavBar.tsx`/`MermaidDiagram.tsx`/`page.css` や `globals.css` の再読込・再 grep が不要になる（ソースHTMLは100%読む — 要約・スキップ厳禁）。

## 制約事項

- **Netlify デプロイ**: `netlify.toml` + `@netlify/plugin-nextjs` で構成。`next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で切り替え（Docker: `standalone`、Netlify: 未設定）。
- **Docker dev コンテナの `.next` 権限**: `Dockerfile.dev` で `mkdir -p /app/.next` を `chown` より前に実行し、named volume (`dev_next_cache`) を `nextjs` ユーザー所有で初期化すること。ボリューム再作成が必要な場合は `docker volume rm infra_dev_next_cache`。
- **`DisclaimerBanner`**: `components/DisclaimerBanner.tsx` は `'use client'` の Client Component。**`position: sticky; top: var(--header-h)`** で Header 直下に貼り付き、flow 内に居続けるため `body { padding-top }` は不要（過去 fixed 配置で `padding-top: calc(--header-h + --disclaimer-height)` を盛っていた結果、sticky Header の natural position が下にずれて scroll 開始まで Disclaimer と縦並び順が入れ替わる不具合が発生していたため修正済）。ResizeObserver は `--disclaimer-height` の動的同期を継続（ページ内 SectionNav が `--fixed-offset = calc(--header-h + --disclaimer-height)` を `top` 値として参照しているため、合計実高さは引き続き必要）。免責事項テキストの変更はこのファイルのみ編集する。
- `litellm` / `dspy` の追加禁止（脆弱性懸念）
- **フォントは自己ホスト（`next/font/google` 禁止）**: `next/font/google` はビルド時に Google Fonts へ HTTP 取得を行い、CDN が旧リビジョンの CSS（実体削除済みの woff2 URL）を返すと `Failed to fetch <family> from Google Fonts.` で **ビルドが失敗**する（Netlify CI で実際に発生）。全 11 ファミリは `@fontsource-variable/*` / `@fontsource/*` へ移行済みで、`app/layout.tsx`（Noto Sans JP / JetBrains Mono / DM Sans）と `app/gcl/genai-leader/section1〜4/page.tsx` が該当 CSS を `import` する。**可変フォントのファミリ名は `'<Name> Variable'`**（例 `'Noto Sans JP Variable'`）であり、`app/globals.css` の `@theme` の `--font-*` トークンで `'<Name> Variable', '<Name>', <generic>` の順に指定する。新しいフォントを追加する場合も `bun add @fontsource-variable/<name>` → CSS import → `@theme` にトークン追加の手順を踏み、`next/font` を使わない。この制約は `__tests__/fonts/self-hosted-fonts.test.ts` が検証する。
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持すること。Client コンポーネント内でサーバー専用 API（`fs`, `cookies`, `headers` など）を呼び出すことは明示的に禁止し、渡す Props は JSON シリアライズ可能なものに限定すること。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップすること。`.code-line` は `white-space: pre` を適用してインデントを保持し、`map` 展開時は安定した `key` を付与すること。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換すること。その際、必ず `<thead>` と `<th scope="col">` を用いたセマンティックな構造にすること。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-border` など）を厳格に使用すること。独自のローカル変数定義や `--color-bg-primary` のような実在しないトークンの使用は避ける。コンポーネントレベルの CSS 内で新たなカスタムプロパティ（`--*`）を定義することは禁止する。
- **サイドバーガイドのレイアウト契約**: サイドバーを持つガイド画面は、デスクトップでサイドバーを左端へ固定し幅を `280px` に統一する。メイン領域は `margin-left: 280px`、`width: calc(100% - 280px)`、`max-width: none` で残り幅をすべて使い、本文全体を再制限する `content-inner` 等の最大幅は設けない。レスポンシブ規則では `margin-left: 0`、`width: 100%` へ戻す。この契約は `__tests__/guide-content-widths.test.ts` で全24スタイルシートを検証する。
- **グローバルメニューの運用（データ駆動）**: ナビゲーションは `app/constants.ts` の `EXAMS` を正本としている。新ページ追加時は `EXAMS` に `Exam` エントリを追加し（`status: 'coming-soon'` → ページ完成後 `'available'` または省略）、`app/navigation.ts` の `toNavTree` が自動でグルーピングするため **`components/Header.tsx` は直接編集しない**。
- **PCNE セクションページの `metadata.title` 規約**: `PCNE S<n>: <セクション名> | Google Cloud 認定試験対策` に統一する。Next.js の `title.template` は **それを定義したセグメント自身には適用されず、子孫ルートに継承される**。`app/gcl/professional-cloud-network-engineer/layout.tsx` は `title` をプレーン文字列で置いているだけで新しい `template` を定義していないため、ルート `app/layout.tsx` の `template: '%s | Cloud Infrastructure Studies'` は **PCNE サブツリーにもそのまま継承される**（実際の `<title>` は `PCNE S<n>: … | Google Cloud 認定試験対策 | Cloud Infrastructure Studies`）。`| Google Cloud 認定試験対策` はその上に乗せる PCNE 固有の命名規約であり、`__tests__/gcl/professional-cloud-network-engineer/section-title-convention.test.ts` はこの規約への準拠のみを検証する。
- **移行元ファイルのアーカイブ**: 移行元は削除せず `archive/` 配下へ移動する。Cisco資料の正規保存先は `archive/Cisco/html/` と `archive/Cisco/md/` とし、`Gcl_Archive/Cisco` は作成・使用しない。
- 新試験を追加する場合: ① `app/constants.ts` の `EXAMS` にエントリ追加 ② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加 ③ 試験ページ作成 — この 3 ファイルのみ変更すれば Header に自動反映される。
- ページ固有の共通定数は `constants.ts` に集約する（`app/gcl/genai-leader/constants.ts` 参照）
- **z-index レイヤリング**: グローバル UI のスタッキング順は `Header (sticky z-50)` → `DisclaimerBanner (sticky z-40, top: var(--header-h))` → ページ内 sticky/fixed (`z-index: 100` を使うページが多い、`top: var(--fixed-offset)`) → `Header ドロワー (z-[200])`。Header と Disclaimer は両方 sticky で flow 内、ドロワーは fixed inset-0 で全画面オーバーレイ。ページ側で 100 を超える z-index を新規に導入する場合は、ドロワーを覆い隠さないか必ず確認すること。
- **Tailwind v4 動的クラス**: テンプレートリテラルで組み立てた class 名（例: `` `before:bg-[var(--color-theme-${id}-fg)]` ``）は JIT が拾えないため意図したスタイルが当たらない。バリエーション分の class 文字列をソース内に **静的に列挙** すること（`components/Header.tsx` の `ACCENT_CLASS` Record 参照）。
