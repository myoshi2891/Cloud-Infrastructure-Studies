# **Associate Google Workspace Administrator 認定試験：初学者のための完全理解とエンタープライズ運用ベストプラクティス詳細レポート**

Google Workspace環境の設計、運用、およびセキュリティ管理の専門知識を証明する「Associate Google Workspace Administrator」認定試験は、クラウドネイティブなコラボレーション基盤を支えるインフラストラクチャエンジニアにとって重要な登竜門である。公式試験ガイド（https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf）に示される通り、本試験は単なるツールの操作手順だけでなく、企業規模でのセキュリティガバナンス、コンプライアンス要件の遵守、そして効率的なトラブルシューティング能力を総合的に評価する 。

本レポートは、試験の出題ドメインに沿って、初学者にも理解しやすいように各機能の基礎的なメカニズムをステップバイステップで解き明かしつつ、エンタープライズ環境で要求される高度なアーキテクチャ設計と運用のベストプラクティスを網羅的に解説する。

## **1. ユーザーアカウント、ドメイン、およびディレクトリの管理**

試験全体の約20%を占めるこのドメインでは、組織の基盤となるアイデンティティ（ID）のライフサイクル管理と、それを支えるディレクトリ構造の論理的な設計能力が問われる 。

### **1.1 ユーザーライフサイクル管理のステップバイステップ運用**

企業におけるユーザーアカウントの管理は、入社から退職に至るまでの「ライフサイクル」として捉える必要がある。ベストプラクティス（https://gatlabs.com/blogpost/user-lifecycle-management/）に基づき、このライフサイクルは以下の4つのフェーズで構成され、それぞれに厳格なセキュリティ統制が求められる 。

第一のフェーズである「オンボーディング」では、新規ユーザーを作成する際、いきなり本稼働用の組織部門（OU）にアカウントを配置するべきではない。管理者はまず、アクセス権が厳密に制限された「保留中（Pending）OU」にアカウントを作成し、従業員の正式な入社日やプロジェクトの稼働開始日に合わせて、適切な部門OUへ移動させるスケジュール運用を行うことが推奨される 。

第二のフェーズである「プロビジョニング」においては、職務の役割に基づいた最小限の権限付与（ゼロトラスト・セキュリティ）を徹底する。Google Admin Consoleに組み込まれた自動化ツールを活用し、手作業によるヒューマンエラーを排除することが、インフラ管理者の負荷軽減とセキュリティの担保に直結する 。

第三のフェーズ「継続的運用」では、外部への無許可のファイル共有や、未使用の非アクティブアカウントに対する定期的な監査を実行し、不正アクセスの温床を排除し続ける必要がある 。

最後のフェーズである「オフボーディング（退職処理）」において、管理者が最も陥りやすい罠はアカウントの「即時削除」である。アカウントを削除すると、そのユーザーが所有していた重要なデータも消失してしまう。ベストプラクティスとして、まずはアカウントを「停止（Suspend）」状態に変更し、Google Vaultによるデータ保持要件を満たした上で、業務上必要なGoogle Driveのデータやメール履歴の所有権を適切な後任者に移譲する手順を踏まなければならない 。

### **1.2 組織部門（OU）の設計アーキテクチャとポリシーの継承**

組織部門（OU）は、ユーザーやデバイスを論理的にグループ化し、ポリシーを一括適用するための階層構造（ファミリーツリー構造）を提供する仕組みである 。

設計の根本原則は「可能な限りシンプルに保つ（Keep it simple）」ことである 。ユーザーが同じアクセス権やサービス設定を共有できる場合、過剰に細分化されたOUを作成することは運用負荷の増大を招くため避けるべきである 。

OUのアーキテクチャは「ポリシーの継承（Inheritance）」というメカニズムで機能する。最上位（トップレベル）のOUに設定されたGoogle Workspaceのポリシーは、その下位に配置されたすべての子OUに自動的にカスケードされる 。例えば、トップレベルでGoogle Meetを有効化すると、全社で利用可能となる。特定の部門（例えば、社外とのオンライン会議を禁じられている特定のオペレーション部門）に対してのみ異なる設定が必要な場合に限り、その子OUで親のポリシーを「上書き（オーバーライド）」してMeetを無効化する 。

さらに、インフラ設計上の重要なベストプラクティスとして「ユーザーとデバイスの分離」が挙げられる。ユーザーアカウントが属するOUと、Chrome OSなどの管理対象デバイスが属するOUは完全に分離すべきである 。これにより、デバイス固有のハードウェアポリシーとユーザー固有のアプリケーションポリシーが競合することを防ぎ、クリーンな運用が可能となる。

### **1.3 アクセス制御の要となるグループの戦略的活用**

Google Workspaceにおける「グループ」は、単なるメールの同報送信（メーリングリスト）にとどまらず、アイデンティティおよびアクセス管理（IAM）の極めて重要なオブジェクトとして機能する 。目的に応じて以下のグループタイプを適切に使い分ける能力が試験では問われる。

| **グループのタイプ** | **機能とアーキテクチャ上のユースケース** | **構成と運用の特徴** |
| --- | --- | --- |
| **セキュリティグループ** | SaaSアプリケーションへのアクセス制御、SSO（シングルサインオン）の割り当て、Google Driveのフォルダ共有権限の制御など、セキュリティ境界を定義するために使用される 。 | 管理者が明示的に作成し、メンバーの追加・削除を手動またはAPI経由で厳格に管理する。 |
| **動的グループ (Dynamic Groups)** | ユーザーの属性（役職、所属部門、勤務地のビルなど）に基づいて、システムが自動的にメンバーシップを評価し更新するグループである 。人事異動時のアクセス権限変更を完全に自動化できる。 | Common Expression Language (CEL) を用いてクエリを記述する（例: `user.department == 'Engineering'`）。最大500グループまでの作成上限が存在する 。 |
| **共同トレイ (Collaborative Inbox)** | カスタマーサポートなど、複数のユーザーが1つのメールアドレス（例: `support@example.com`）を共有し、スレッドごとに担当者の割り当てや解決ステータスの管理を行うための特殊なグループである 。 | Google Groups for Businessサービスを有効化し、グループ設定から共同トレイ機能をオンにする必要がある 。 |

### **1.4 複数ドメインの管理：セカンダリドメインとユーザーエイリアスドメイン**

企業の合併・買収（M&A）や、複数ブランドの展開において、単一のGoogle Workspaceテナント内に複数のドメインを収容する要件が頻繁に発生する。管理者は、要件に応じて2つのドメイン追加方式を的確に選択しなければならない。

| **ドメインの追加方式** | **概念とユースケース** | **ライセンスとユーザー体験への影響** |
| --- | --- | --- |
| **ユーザーエイリアスドメイン** | 既存の従業員に対して、別のドメイン名の代替メールアドレスを付与する方式 。例：ブランド名が変更された場合や、別ブランドのメールを受信したい場合。 | 追加のライセンス費用は発生しない 。ユーザーは1つの受信トレイ（プライマリドメインのアカウント）で両方のドメインのメールを送受信できる 。 |
| **セカンダリドメイン** | プライマリドメインとは全く異なる、独立した従業員やビジネスユニットを管理する方式 。例：買収した子会社の従業員を同じテナントで管理する場合。 | ユーザーごとに独立したGoogle Workspaceアカウントと受信トレイが作成されるため、追加ユーザー分のライセンス費用が発生する 。OUやグループを用いた個別の管理が可能である 。 |

### **1.5 ディレクトリ同期とデータ移行の戦略**

オンプレミス環境のActive Directory (AD) に蓄積されたアイデンティティ情報をGoogle Workspaceへ同期させる際、管理者はインフラの要件に応じた同期ツールを選定する必要がある。

従来型の標準ツールである「Google Cloud Directory Sync (GCDS)」は、すべてのLDAP準拠ディレクトリ（ADやOpenLDAPなど）に対応し、パスワードの同期までサポートする非常に強力なツールである 。しかし、LDAPサーバーと同じネットワーク内、またはGoogle Cloud Compute Engine上に仮想マシンを構築してソフトウェアをインストールする必要があり、Cloud VPNなどを用いた複雑なネットワーク要件と運用負荷を伴う 。

これに対するモダンなアプローチとして提供されているのが「Directory Sync」である。これは完全なクラウドベースのソリューションであり、オンプレミスのハードウェアやソフトウェアのインストールを一切必要としない 。Google Admin Consoleから直接設定を行い、Microsoft Active DirectoryやAzure ADと継続的なループ処理で自動同期を行うことが可能であり、運用負荷を劇的に引き下げる 。ただし、このツールはアイデンティティの「同期」を行うものであり、Google Cloud側での「認証（Authentication）」そのものはCloud Identityが担うというアーキテクチャ上の役割分担を理解しておくことが重要である 。

### **1.6 ビルディングとリソースの構造化管理**

会議室やプロジェクター、社用車といった企業の共有リソース管理において、Googleは従来のテキストベースの「非構造化リソース」から、メタデータを持つ「構造化リソース」への移行を強く推奨している 。

構造化リソースの導入により、リソースに対して「収容人数」「車椅子アクセスの有無」「ホワイトボードやビデオ会議機器の有無」「物理的なフロア位置」といった詳細なプロパティを定義できる 。このデータ構造化により、ユーザーがGoogleカレンダーで会議を作成する際、システムが参加人数や要件に合致した最適な会議室を自動提案したり、辞退された会議室を自動的に解放するといったインテリジェントな機能が有効になる 。

これら数千に及ぶ可能性のあるリソースを一つずつ手動で登録することは非現実的である。管理者はAdmin ConsoleからCSVフォーマットのテンプレートをダウンロードし、スプレッドシート上で一括編集を行った後、バルクアップロード機能を使用して最大10,000件のビルディングやリソースを一度に作成・更新する手法を習得する必要がある 。既存環境から移行する際は、本番環境のデータを一度テストドメインにエクスポートして構造化の検証を行い、問題がないことを確認してから本番環境へ適用するプロセスが安全である 。

## **2. コア Workspace サービスの運用と最適化**

試験の最大比重である約23%を占める本ドメインでは、Gmail、Google Drive、Meet、Chatといった中核サービスの利便性を損なうことなく、強固なセキュリティ設定を施すエンジニアリング能力が問われる 。

### **2.1 Gmailのセキュリティ保護アーキテクチャ（SPF, DKIM, DMARC）**

企業ドメインを騙るなりすましメールやフィッシング攻撃から自社と顧客を保護するため、管理者はDNSレコードを利用した3層構造の送信ドメイン認証メカニズムを正確に実装しなければならない 。Googleの要件（https://support.google.com/a/answer/81126）により、特に1日5,000件以上のメールをGmailアカウント宛に送信するバルク送信者に対しては、これらすべての設定とTLS接続の使用が厳格に義務付けられている 。

第一の層である「SPF (Sender Policy Framework)」は、自社ドメインのメールを送信することを許可された正規のIPアドレスのリストを、DNSのTXTレコードとしてインターネット上に公開する仕組みである 。受信側のサーバーは、メールの送信元IPアドレスとこのSPFレコードを照合し、正当なサーバーからの送信であるかを確認する。

第二の層である「DKIM (DomainKeys Identified Mail)」は、送信されるメールのヘッダーと本文に、暗号化技術を用いたデジタル署名を付与する機能である 。管理者はGoogle Workspace上で秘密鍵を生成して署名に利用し、対応する公開鍵をDNSに登録する。受信サーバーは公開鍵を使って署名を復号・検証することで、メールが送信経路の途中で改ざんされていないこと（完全性）と、送信元の真正性を担保する 。

第三の層である「DMARC (Domain-based Message Authentication, Reporting, and Conformance)」は、SPFとDKIMの検証結果に基づくポリシー制御メカニズムである 。管理者はDNSにDMARCレコードを公開し、認証に失敗したメールに対する受信サーバーの振る舞いを指定する。指定できるポリシーには、何もしない（`p=none`）、迷惑メールフォルダに隔離する（`p=quarantine`）、メールの受信を完全に拒否する（`p=reject`）の3段階がある 。

DMARCの導入にあたっては、システム障害を避けるため、SPFとDKIMが少なくとも48時間正常に稼働し、すべての正規メールが認証を通過していることを確認してから有効化することが、安全な運用の鉄則である 。これらの設定を完全に実施することで、Google Postmaster Toolsで観測されるスパム率を要件である0.30%未満に抑え、メールの到達率を最大化することができる 。

### **2.2 Google DriveとDocsの高度なデータ共有管理**

クラウド環境におけるデータ漏洩リスクの大部分は、外部からのサイバー攻撃ではなく、内部ユーザーによる意図しない過剰な権限付与（オーバーシェアリング）に起因する 。管理者は、組織のフォルダ構造と共有ポリシーを厳格に設計する必要がある 。

エンタープライズコラボレーションの核となる「共有ドライブ（Shared Drives）」は、個人（My Drive）ではなく組織やプロジェクトチーム単位でファイル所有権を管理するための機能である 。従業員が退職しても、共有ドライブ内のファイルは組織の所有物として保持される。ベストプラクティスとして、共有ドライブへのメンバー追加は個別のユーザーアカウントではなく、Googleグループを通じて行うことで、アクセス権の棚卸しや一元管理が容易になる 。

共有ドライブにおけるアクセス権限の割り当ては、最小特権の原則に基づいて行う必要がある 。

| **権限レベル** | **許可される操作と適用すべきユースケース** |
| --- | --- |
| **管理者 (Manager)** | メンバーの追加・削除、共有ドライブ自体の設定変更、ファイルやフォルダの完全な制御が可能。各ドライブに最低限の人数のみを割り当てる。 |
| **コンテンツ管理者 (Content manager)** | ファイルの追加、編集、削除が可能。アクティブなプロジェクトの主要メンバーに付与する。Drive for desktopを使用して非Googleファイル（PDFやOfficeファイル等）を編集する外部コラボレーターにはこの権限が必要である 。 |
| **投稿者 (Contributor)** | ファイルの追加と編集は可能だが、削除はできない。誤削除を防ぎたい標準的な参加者に適している 。 |
| **コメンテーター (Commenter)** | ファイルの閲覧とコメントの追加のみが可能。他部門からの専門的なフィードバックを求める際に付与する 。 |
| **閲覧者 (Viewer)** | ファイルの閲覧のみが可能。完了したプロジェクトのアーカイブや、全社向けの最終成果物（参照用資料）を格納するドライブに対して付与し、内容の改ざんを防ぐ 。 |

また、Googleアカウントを所有していない外部のクライアントやパートナーと一時的にファイルを共有する必要がある場合、「ビジター共有（Visitor sharing）」という機能を利用する 。これにより、相手はGoogleアカウントを作成することなく、送信されたPINコードを入力するだけでセキュアにファイルへアクセスでき、不特定多数へのリンク共有（Anyone with the link）という危険な運用を回避できる 。

### **2.3 Gemini for Google Workspaceのデータプライバシーとガバナンス**

生成AI機能である「Gemini」のエンタープライズ導入において、経営層や管理者が最も懸念するのは、入力した機密情報やプロンプトがAIの学習データとして利用され、外部に漏洩しないかというプライバシーの問題である 。

公式のプライバシーハブ（https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub）で明言されている通り、Workspace版のGeminiはコンシューマー版とは一線を画す厳格なデータ保護アーキテクチャを備えている 。管理者の明示的な許可がない限り、テナント内のユーザーが入力したプロンプト、Workspace内のコンテンツ（ドキュメントやメール）、およびGeminiが生成した応答データは、Googleの基盤モデルのトレーニングに利用されることは一切ない 。また、これらのデータが人間のレビュアーによって閲覧されることもない 。

さらに、Geminiは組織が既存のGoogle Workspaceで設定しているセキュリティ境界を自動的に継承する。これには、データの保存場所を規定するデータリージョンポリシーや、機密情報の流出を防ぐDLP（データ損失防止）コントロールが含まれる 。コンプライアンスの観点からも、ISO 42001、BSI C5、FedRAMP Highといった国際的なセキュリティ認証を取得しており、医療業界におけるHIPAA要件の準拠も支援するよう設計されている 。管理者は後述するGoogle Vaultと連携させることで、Geminiとの会話履歴（プロンプトと応答）に対するデータ保持（リテンション）ルールを適用し、監査要件を満たすことが可能である 。

### **2.4 AppSheetとApps Scriptを利用した開発と自動化のサポート**

Google Workspaceの標準機能を拡張し、業務の自動化や独自のビジネスアプリケーションを構築するため、管理者は「AppSheet」と「Apps Script」の2つのプラットフォームの特性を理解し、適切なユースケースを提案できなければならない 。

| **プラットフォーム** | **アーキテクチャの特徴と想定されるユースケース** |
| --- | --- |
| **AppSheet** | コードを一切書かずに（ノーコード）、Workspaceのデータ（スプレッドシート等）やSQLデータベース、サードパーティAPIをデータソースとして、モバイルやWeb対応のビジネスアプリを構築できるプラットフォーム 。フロントエンドの構築や、現場のデータ入力業務のデジタル化に最適である。 |
| **Apps Script** | JavaScriptベースのローコード開発環境であり、Gmailの自動応答、スプレッドシートのカスタム関数、ドキュメントの編集をトリガーとしたバックグラウンド処理の自動化などに利用される 。取得したデータを複雑にクレンジングしたり、高度なロジックを実装するバックエンド処理に真価を発揮する 。 |

これら2つのプラットフォームは排他的なものではなく、複雑なワークフローにおいては連携させることがベストプラクティスである 。例えば、バックグラウンドでApps Scriptのトリガーを走らせてデータを収集・成形し、その結果をAppSheetで構築したモダンなUIのアプリケーションで従業員に可視化・操作させるといったハイブリッドなアーキテクチャが構築できる 。

インフラ管理者の視点では、これらの開発ツールがシャドーIT化することを防ぐためのガバナンスが重要となる。AppSheet Admin Consoleを使用することで、管理者は組織全体でのライセンス利用状況の監視、アプリ所有権の管理、そしてAI機能（自然言語によるアプリ作成やデータ抽出）の利用可否を制御するガバナンスポリシーを一元的に適用できる 。また、Apps Scriptのパフォーマンス最適化のベストプラクティスとして、外部APIへの過度な呼び出しを避けること、読み書きをまとめて行うバッチ操作を採用すること、そしてデータ取得時間を短縮するためにCache Serviceを利用するよう社内の開発者を指導することが求められる 。UIを多用するスクリプトにおいて外部ライブラリを多用すると、起動遅延（パフォーマンス劣化）を引き起こすため避けるべきである 。

## **3. データガバナンスとコンプライアンスの管理**

試験の約15%を占める本ドメインでは、法的要件に応じたデータの長期的保全、機密情報の漏洩防止、そしてデータの物理的な保管場所（主権）をコントロールする専門知識が問われる 。

### **3.1 Google Vaultを活用したeDiscovery（電子情報開示）とデータ保持**

Google Vaultは、訴訟や監査といった法的な要求に対して、組織のコミュニケーションデータやファイルを証拠として保全、検索、およびエクスポートするための不可欠なコンプライアンスツールである 。Vaultの運用において、管理者は「保持ルール（Retention Rules）」と「法的ホールド（Legal Holds）」の決定的な違いを理解する必要がある。

保持ルールは、組織の一般的なデータガバナンス方針に基づいて設定される。管理者は「作成から7年経過したメールは自動的に削除する」といった日付ベースのルールや、特定のキーワードを含むドキュメントを永続的に保持するといったコンテンツベースのルールを、組織部門（OU）や対象サービスごとにきめ細かく設定できる 。

一方、法的ホールドは、訴訟や社内調査が発生した、あるいは発生が予測されるといった緊急時に適用される特権的な措置である 。特定のユーザーやグループに対して法的ホールドが適用されると、既存のすべての保持ルールの自動削除プロセスや、ユーザー自身によるゴミ箱からのデータ削除操作は完全に無効化（オーバーライド）され、対象データは調査が完了しホールドが解除されるまで無期限に保全され続ける 。

さらに、コスト最適化の観点から「アーカイブユーザーライセンス（Archive User Licenses）」の活用がベストプラクティスとして試験に頻出する 。従業員が退職した際、データ保全のために高額なフルライセンスを維持し続けるのは非効率である。アカウントのステータスを「停止」にした上でアーカイブライセンスを割り当てることで、コストを大幅に削減しつつ、VaultによるeDiscoveryの対象としてデータを保持し続けることが可能となる 。

### **3.2 データ損失防止 (DLP) ルールの戦略的構築**

Data Loss Prevention (DLP) は、クレジットカード番号、マイナンバー、パスポート番号といった機密性の高い情報が、メールの送信や外部へのファイル共有を通じて組織外に流出するのをリアルタイムで検知・阻止するシステムである 。対象サービスはGmail、Chat、およびDriveに及び、組織部門（OU）単位でルールを適用できる 。

DLPルールの検知エンジンには2種類のアプローチがある。Googleが提供する「事前定義されたコンテンツ検出器」は、世界中の一般的な機密情報フォーマットを高精度で検知できるが、あらゆる企業の固有データ（特定のフォーマットを持つ社内プロジェクトコードなど）を100%の精度で検知できるわけではない 。そのため、組織固有の要件に対しては「正規表現（Regular Expressions: Regex）」を用いたカスタムルールを作成し、柔軟に対応する構成力が求められる 。

DLPの運用を現場に定着させるためのベストプラクティスは、「段階的なフェーズアプローチ」の採用である（https://www.backupvault.co.uk/blog/google-workplace/dlp-workspace/）。
初期フェーズでは、事前定義されたポリシーを使用し、アクションを「ブロック」ではなく「警告（Warning）」に設定する 。ユーザーが機密データを外部と共有しようとした際、システムが警告メッセージを表示することで、ユーザー自身にポリシー違反を認識させ、自己修復（共有のキャンセルやファイルの修正）を促す。この期間に管理者は監査ログを収集してルールの過検知（フォールス・ポジティブ）をチューニングし、業務への影響が最小化されたことを確認した上で、最終フェーズとして強硬な「ブロック（Block）」ルールへと移行する 。

### **3.3 データリージョンとデータエクスポートツールによるデジタル主権の確立**

GDPR（EU一般データ保護規則）やHIPAAなどの厳格なデータ保護法規に準拠するため、組織のデータを特定の地理的領域内に留める「デジタル主権」の要件が高まっている 。

Google Workspaceの「データリージョン（Data Regions）」高度な設定機能を利用することで、管理者はGmail、Drive、Docs、Calendar、Meetなどの対象アプリの静止データ（Data at rest）が保存および処理される物理的な地域を、グローバル、米国、またはヨーロッパ（EU）から選択して強制することができる 。

ただし、この設定にはインフラ設計上の重要なトレードオフが存在する。Google Workspaceの機能の一部（機械学習を用いた高度な検索やスパムフィルタリングなど）は、データをグローバルに分散処理することで最高のパフォーマンスを発揮するようにアーキテクチャ設計されている。そのため、非リージョン化されたサービスを厳格にオフにしてデータの移動を完全に制限した場合、ユーザーは一部の使い慣れた高度な機能を利用できなくなったり、予期せぬ動作を経験する可能性がある 。管理者は、コンプライアンス部門と連携し、セキュリティ要件と利便性のバランスを評価した上で設定を決定する必要がある。

また、ベンダーロックインの回避や、有事におけるデータポータビリティを確保するため、管理コンソールには「データエクスポートツール（Data Export Tool）」が備わっている 。このツールを使用すると、組織内のすべてのアクティブユーザーのサポート対象データを抽出し、Google Cloud Storageアーカイブとして安全にエクスポートすることが可能である 。

## **4. セキュリティポリシーとアクセス制御の管理**

試験の約20%を構成する本ドメインは、サイバー攻撃から組織を守る防御の最前線である 。従来の「社内ネットワークは安全である」という境界型防御から脱却し、ゼロトラストモデルを実践するための機能設定が問われる。

### **4.1 最小特権の原則に基づく管理者ロールの設計**

クラウドインフラにおける致命的なデータ侵害の実に88%が、システム要件のミスではなくヒューマンエラー（設定ミスや権限の乱用）によって引き起こされている 。被害を局所化するための絶対的な基盤が「最小特権の原則（Principle of Least Privilege）」である 。

組織内のすべてのIT担当者に、全権限を持つ「特権管理者（Super Admin）」ロールを付与することは極めて危険であり、避けなければならない 。代わりに、職務遂行に必要な最小限の権限のみを持つ、事前定義された管理者ロールやカスタムロールを割り当てるべきである 。

| **推奨される管理者ロール** | **アクセス権限の範囲とユースケース** |
| --- | --- |
| **ヘルプデスク管理者 (Help Desk Admin)** | ユーザーのパスワードリセットと、ログイン問題の解決のみに限定された権限 。 |
| **ユーザー管理者 (User Management Admin)** | 一般ユーザーアカウントの作成、削除、および権限管理が可能 。 |
| **サービス管理者 (Services Admin)** | Gmail、カレンダー、Driveなどの各種サービスの設定変更や、ビルディング・リソースの管理を行う権限。特権管理者権限は不要である 。 |
| **特権管理者 (Super Admin)** | 組織全体のすべての設定、請求管理、APIアクセスへの完全な制御権を持つ 。組織のロックアウトを防ぐため、最低2名、最大でも4名程度に限定することが推奨される 。 |

特権管理者の運用における重要なベストプラクティスとして、「日常業務アカウントと特権アカウントの完全な分離」が挙げられる。特権管理者は、日々のメールのやり取りやWebブラウジングを行う通常のアカウント（例: `john@company.com`）を使用して特権設定を行ってはならない。必ず、特権タスク専用の別アカウント（例: `admin.john@company.com`）を作成して使い分ける必要がある 。

さらに、`admin@example.com`のような汎用的なアカウントを複数人で共有してログインすることは厳禁である。これにより、監査ログ上で誰がどの操作を行ったかの責任追跡（アカウンタビリティ）が完全に失われるためである 。すべてのアカウントに対して2段階認証（2SV）を強制し、特に特権管理者や高権限アカウントには、フィッシング攻撃に対する耐性が最も高い物理的なハードウェア「セキュリティキー」の利用を義務付ける（高度な保護プログラムへの登録）ことが公式ガイドで推奨されている 。

### **4.2 コンテキストアウェアアクセス (CAA) によるゼロトラストの実現**

コンテキストアウェアアクセス（Context-Aware Access: CAA）は、ユーザーのIDとパスワードが正しいかだけでなく、「どのような状況（コンテキスト）でアクセスしようとしているか」を動的に評価し、アクセスを許可またはブロックするゼロトラストアーキテクチャの根幹を成す機能である 。

管理者は、以下のような多様なシグナルを組み合わせてアクセスレベルを定義できる 。

- **デバイス要件：** デバイスが会社支給（Company-owned）であるか、ディスク暗号化が有効か、画面ロックが設定されているか 。
- **ネットワーク要件：** 業務委託スタッフに対して、許可された企業ネットワークのIPアドレス範囲からのみアクセスを許可し、既知のハイジャックIPアドレスからのアクセスをブロックする 。
- **セキュリティポスチャ：** CrowdStrikeやBeyondCorp Allianceパートナーからのデバイス健全性シグナルが要件を満たしているか 。

CAAの設定には2つのモードが存在する。IPアドレス制限などの基本的な要件は「基本モード」でUIを通じて直感的に設定できる 。しかし、「パスワードだけでなくハードウェアキーを用いた多要素認証（MFA）が完了しているユーザーにのみ機密アプリへのアクセスを許可する」といった複雑な論理条件（AND/OR）が必要な場合は、「詳細モード」に切り替え、Common Expression Language (CEL) エディタを使用してスクリプト（例: `request.auth.claims.crd_str.pwd == true && request.auth.claims.crd_str.hwk == true`）を記述する高度な能力が求められる 。

また、CAAのアーキテクチャ上の特性として、「ポリシー評価の継続性」を理解しておく必要がある。GmailやDriveといったGoogle Workspaceの「コアサービス」に対しては、評価が継続的に行われる。例えば、オフィスで安全にシステムにログインしたユーザーが、そのままPCを持って近所のカフェのパブリックWi-Fiに接続した場合、環境の変化が即座に検知され、アクセス制御ポリシーが再評価されてブロックされる 。一方、SAMLベースのサードパーティアプリの場合は、セッションが継続している間は再評価されず、ユーザーのセッションが終了し再ログインするタイミングで初めてポリシーが再評価されるという挙動の違いがある 。

### **4.3 Drive トラストルール (Trust Rules) による緻密な共有境界の定義**

Google Drive上のデータ保護を強化するため、従来の単純な共有設定に代わる新たな機能として「トラストルール（Trust Rules）」が導入された 。

従来の共有設定では、ドメイン外へのファイル共有を「許可する」か「ブロックする」かを組織部門（OU）単位で大まかに切り替えることしかできなかった 。トラストルールを有効化すると、この旧来の設定は上書きされ、はるかに詳細で柔軟な共有境界の定義が可能となる 。

トラストルールでは、「どのユーザーのファイルが対象か（Sharing rule）」と「誰がそのファイルを受け取ることができるか（Receiving rule）」の2つのベクトルに対して、特定のOUやグループをきめ細かく「含める（Include）」「除外する（Exclude）」ことができる 。これにより、「マーケティング部門のユーザーは外部の広告代理店ドメインとのみ共有を許可し、開発部門のユーザーは一切の外部共有を禁止する」といった、ビジネス要件に直結した精緻なデータ漏洩防止策を実装できる 。

### **4.4 MarketplaceアプリとOAuthによるサードパーティAPIアクセス制御**

サイバーセキュリティにおいて見落とされがちなのが、従業員が利便性を求めて無断でインストールするサードパーティ製アプリ（シャドーIT）によるデータ流出リスクである 。

管理者はAdmin Consoleの「User Install Settings」を通じて、ユーザーがGoogle Workspace Marketplaceからアプリをインストールする権限をコントロールしなければならない。デフォルトですべてのアプリのインストールをブロックし、IT部門がセキュリティ評価を行った安全なアプリのみを「許可リスト（Allowlist）」に追加してインストールを認める運用が、エンタープライズにおけるベストプラクティスである 。

しかし、アプリのインストール制限だけでは不十分である。Webサイト上で「Googleでログイン」機能を使用し、ブラウザ経由で悪意のあるアプリにOAuthトークン（Gmailの読み取り権限など）を渡してしまうフィッシング攻撃が存在するからだ 。これを完全に防御するため、管理者は「APIコントロール」機能を併用し、未検証のサードパーティアプリによるGoogle Workspaceのコアデータ（Gmail、Drive、カレンダー）へのアクセスを包括的に制限・ブロックする多層防御アーキテクチャを構築する必要がある 。

## **5. ブラウザとエンドポイントの管理**

従業員が日々業務で使用するモバイルデバイスやブラウザは、企業データへの主要な入り口（エンドポイント）である。試験の約10%を占める本ドメインでは、これらを安全に統制する手法が問われる 。

### **5.1 モバイルデバイス管理 (MDM) のアプローチ**

Google Workspaceには高度なモバイルデバイス管理（MDM）機能が組み込まれており、組織のデバイス所有形態に応じて適切な管理レベルを選択できる 。

| **管理レベル** | **アーキテクチャと機能要件** | **ユースケース** |
| --- | --- | --- |
| **基本管理 (Basic Management)** | エージェント（専用アプリ）のインストールが不要で、ユーザーへのプライバシー干渉が少ない。画面ロックや強力なパスワード要件の強制が可能であり、紛失時には企業データのみを選択的に削除（アカウントワイプ）できる 。 | 従業員が個人のスマートフォンを業務利用するBYOD（Bring Your Own Device）環境に最適である。 |
| **詳細管理 (Advanced Management)** | デバイスポリシーコントローラーのインストールが必須となる。アプリのホワイトリスト化、ネットワーク証明書の配布、USB転送の制限、デバイス全体の完全な初期化（リモートワイプ）など、強力な統制が可能となる 。 | 企業が支給・所有し、厳格なデータ保護が求められるデバイス環境に適用する。 |

管理者はこれらの設定を通じ、OSの最新パッチ適用を促し、不正に改造された（Jailbreak/Root化された）デバイスからのアクセスを自動遮断するセキュリティポリシーを確立しなければならない 。

### **5.2 Chrome ブラウザの統合管理**

Chromeブラウザのエンタープライズ管理において、管理者はポリシーが適用される「トリガー条件」の違いに基づく2つのアプローチを正確に理解しておく必要がある 。

1つ目は「ユーザーアカウントに対するポリシー（Policies set for users）」である。これは、ユーザーが企業ドメインのGoogleアカウントでChromeブラウザにサインインした瞬間に適用される 。OS環境（Windows、Mac、Linux、Android、iOS）を問わず、企業指定のブックマーク、プロキシ設定、安全なブラウジング設定がデバイス間で同期される。BYOD環境や、従業員が自宅のPCから安全に業務システムにアクセスするリモートワーク環境において非常に有効である 。

2つ目は「登録済みブラウザに対するポリシー（Enrolled browsers）」である。これは、管理者がWindowsやMacなどのデバイス自体にマシントークンを発行してブラウザをシステムレベルで登録する手法である 。このアーキテクチャの最大の利点は、ユーザーがChromeにサインインしていなくても、そのデバイス上でChromeを起動した時点で企業のセキュリティポリシーが強制適用される点にある。共有PCやキオスク端末、企業支給PCの厳格な統制に適している 。

これらの管理機能を用い、管理者は悪意のある、あるいは業務に関係のないChrome拡張機能のインストールをブロックし、パスワードマネージャーやセキュリティ監視ツールなどの業務上必須となる拡張機能を全ユーザーのブラウザに強制インストール（Force-install）することで、エンドポイントのセキュリティ水準を均一に保つことができる 。

## **6. 監視、監査、および一般的な問題のトラブルシューティング**

試験の約13%を占める最終ドメインでは、インフラ管理者が日々の運用で直面する不具合に対して、各種ツールやログを駆使して論理的に原因を特定し、迅速に解決へと導くトラブルシューティング能力が評価される 。

### **6.1 メール配信問題の追跡：Email Log Search (ELS) の深堀り**

「重要なメールが届かない」「自社からのメールが迷惑メールに分類された」といったユーザーからの報告を受けた際、管理者が真っ先に使用すべき調査ツールが「Email Log Search (ELS)」である 。

ELSを使用することで、組織を通過したメールのメタデータ（送信者、受信者、IPアドレス、メッセージID、配信ステータス、スパム判定結果など）を詳細にトラッキングできる 。ここで試験においても実務においても極めて重要なのが、Googleのログ保持アーキテクチャに基づく「30日ルール」の制約である 。

- **過去30日以内のメール：** 完全なデータが利用可能である。送信者、受信者、IPアドレスなど、様々な条件を組み合わせて柔軟かつ高速に検索でき、リアルタイムの配信経路やエラー理由（バウンスバックの原因など）を詳細にドリルダウンできる。フィッシング攻撃の初期対応（トリアージ）において非常に強力である 。
- **30日より古いメール：** ログの構造が変化し、検索条件が厳密に制限される。送信者やIPアドレスでの検索は不可能となり、対象の「特定の受信者」または一意の「メッセージID」を入力しなければ検索結果を得ることができない。さらに、メールの完全な配信履歴は失われ、配信完了後の最終的なメタデータのみが確認可能となる 。したがって、事象発生から時間が経過しているトラブルシューティングにおいては、メッセージIDを取得して検索することが唯一かつ最速の解決手段となる 。

また、メールの遅延や不達の原因がDNSの誤設定にあると推測される場合は、「Google Admin Toolbox」内の「Check MX」ツールを使用する 。ドメインを入力するだけで、ネームサーバーの到達性やMXレコードの優先順位の誤り、Aレコードとの不一致をスキャンし、信号（緑・黄・赤）で問題を可視化してくれる。さらに「Messageheader」ツールにメールのヘッダー情報を貼り付けることで、SMTPルーティング上のどのホップで遅延が発生したかを秒単位で解析することが可能である 。

### **6.2 ネットワークとブラウザのデバッグ：HARファイルの生成と解析**

Google Workspaceは高度なWebアプリケーション群であるため、ページのロードが終わらない、SAML SSO（シングルサインオン）のリダイレクトがループする、特定のボタンが反応しないといったクライアントサイドの問題が頻発する。このような事象の原因（APIの応答エラーや通信のタイムアウト）を特定するため、管理者はブラウザのネットワーク通信を記録した「HAR (HTTP Archive) ファイル」を生成し、解析する必要がある 。

エンドユーザーにHARファイルの取得を指示する際、以下のステップバイステップの手順を明確に伝えることがトラブルシューティングの迅速化に繋がる。

Chrome ブラウザにおけるHARファイル取得のステップ :

1. 問題が発生しているページを開き、キーボードの「F12」キーを押すか、右クリックして「検証 (Inspect)」を選択し、デベロッパーツールを開く。
2. 上部のタブから「Network (ネットワーク)」を選択する。
3. 左上の丸い記録アイコンが赤色（録画中）であることを確認する。灰色であればクリックして録画を開始する。
4. **【重要】** ページがリロードやリダイレクトされた際にログが消去されるのを防ぐため、必ず「Preserve log (ログを保存)」のチェックボックスをオンにする。
5. 斜線の入った円アイコン（Clear）をクリックして、これまでの不要なログを消去し、クリーンな状態にする。
6. ブラウザ上で実際にエラーとなる操作（問題の再現）を行う。
7. 通信ログが記録されたら、パネル内の下向き矢印アイコン（Export HAR）をクリックし、ファイルをコンピュータに保存する。

取得したHARファイルは、パスワードやCookieなどの機密情報が含まれる可能性があるため取り扱いに注意し、必要に応じてマスキングを施す。解析には「Google Admin Toolbox」内の「HAR Analyzer」を使用することで、通信のタイムラインやHTTPステータスコードを視覚的に確認し、原因を切り分けることができる 。

### **6.3 セキュリティ調査ツール (Investigation Tool) と品質の監視**

より広範なインシデント対応や、複数サービスにまたがる複雑な調査を行う場合、特権管理者は「セキュリティ調査ツール (Security Investigation Tool)」を活用する 。

このツールは、Gmailのメッセージログ、Google Driveの操作イベント、ユーザーのアカウントログイン履歴、デバイスの監査ログなど、組織内のあらゆるデータソースを一元的に検索し、関連性を分析できる強力なコンソールである 。
単なるログの検索にとどまらず、検索結果に対して「アクション」を実行できるのが最大の特長である。例えば、特定の悪意のあるドメインから送信されたフィッシングメールを検索し、その結果リストから直接、影響を受けた全ユーザーの受信トレイ内の該当メールを一括で削除（隔離）するといった、能動的なインシデントレスポンスが数クリックで完結する 。

このツールを利用する際の一般的なトラブルシューティングとして以下のポイントを押さえておく必要がある 。

- **検索結果がゼロになる場合：** 調査対象の期間が、監査ログのデータ保持期間の制限を超過している可能性が高い。
- **メールのメタデータ（件名や送信者）は見えるが、本文が見えない場合：** これはシステムエラーではなく、管理者のロールに「データアクセスの権限（Data privacy privileges）」が付与されていないという権限設定（パーミッション）の問題である。

また、リモートワーク環境で多発するビデオ会議のトラブルについては、「Meet 品質ツール (Meet Quality Tool)」を使用する 。管理者はこのツールから特定の会議コードや参加者を検索し、会議中のネットワーク帯域幅の変動、パケットロスの割合、オーディオの遅延、参加者のデバイスのCPU負荷などの時系列データを可視化できる。これにより、問題がGoogle側のサーバーにあるのか、オフィスのネットワーク回線にあるのか、あるいはユーザーの自宅のWi-Fi環境にあるのかを的確に切り分けることができる 。

### **6.4 試験対策と戦略的アプローチ**

Associate Google Workspace Administrator 認定試験は、以上の多岐にわたるドメインの知識と実践力を問うものである。試験の仕様と対策方針について理解しておくことが合格への鍵となる 。

- **試験の仕様：** 試験時間は120分間で、50〜60問の多肢選択式および複数選択式の設問で構成されている。受験料は125米ドル（税別）であり、英語および日本語で受験可能である 。
- **受験環境：** 認定テストセンターでのオンサイト受験、または厳格な要件を満たした環境でのオンライン遠隔監視受験のいずれかを選択できる 。万が一不合格となった場合でも、規定の待機期間を経ることで再受験（リテイク）が可能である 。
- **推奨される経験と学習アプローチ：** Googleは、実際の環境またはテスト環境において、少なくとも6ヶ月以上のGoogle Workspace特権管理者としての実践経験を推奨している 。試験問題は単なる機能の暗記ではなく、「特定のビジネス課題（例：退職者のデータ保全、特定の部署のみの外部共有禁止）に対して、どの機能をどう組み合わせるのが最もセキュアで効率的か」というシナリオベースの設問が多く出題される。

したがって、試験対策としては、単にドキュメントを読むだけでなく、実際にGoogle Workspaceのサンドボックス環境やテストテナントを用意し、組織部門（OU）の作成、DLPルールやトラストルールの設定、コンテキストアウェアアクセスのテスト、およびHARファイルの取得といった一連のオペレーションを「自らの手を動かして」検証することが、最も効果的かつ確実な合格へのパスとなる 。システムアーキテクチャ全体の挙動と、ポリシーの継承関係を体感的に理解することが、トップクラスのインフラエンジニアへの第一歩である。

[**services.google.com**Associate Google Workspace Administrator](https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf)

[**gatlabs.com**Why User Lifecycle Management Matters for Google Admins (And How to Improve It)](https://gatlabs.com/blogpost/user-lifecycle-management/)

[**yeshid.com**Google Workspace: Organize Org Units, Groups, Policies, Devices, and more! | YeshID](https://www.yeshid.com/post/guide-to-google-workspace-and-saas-management-organizational-units-groups-and-access-control)

[**workspace.google.com**Manage and secure Workspace with Admin console](https://workspace.google.com/products/admin/)

[**workspace.google.com**Google Vault: Data Loss Prevention & Retention](https://workspace.google.com/products/vault/)

[**knowledge.workspace.google.com**How the organizational structure works | Advanced - Google Workspace Help](https://knowledge.workspace.google.com/admin/users/advanced/how-the-organizational-structure-works)

[**creativeon.com**Using Google Workspace OUs to Apply Policies - creativeON](https://creativeon.com/blog/google-support/google-workspace-ous-apply-policies/)

[**blog.syscloud.com**A Complete Guide to Google Organizational Units](https://blog.syscloud.com/google-organizational-units)

### Email Management

[**docs.cloud.google.com**Dynamic groups overview | Cloud Identity - Google Cloud Documentation](https://docs.cloud.google.com/identity/docs/concepts/overview-dynamic-groups)

[**knowledge.workspace.google.com**What you get with Groups for Business | Set up & manage services](https://knowledge.workspace.google.com/admin/groups/what-you-get-with-groups-for-business)

[**youtube.com**Google Groups and Collaborative Inboxes Explained - YouTube](https://www.youtube.com/watch?v=FIG4T59I3-0)

[**support.google.com**Use a group as a Collaborative Inbox - Google Workspace Learning Center](https://support.google.com/a/users/answer/167430?hl=en)

[**knowledge.workspace.google.com**FAQ for multiple domains | Domain management - Google Workspace Help](https://knowledge.workspace.google.com/admin/domains/faq-for-multiple-domains)

[**knowledge.workspace.google.com**Add a user alias domain or secondary domain - Google Workspace Help](https://knowledge.workspace.google.com/admin/domains/add-a-user-alias-domain-or-secondary-domain)

[**youtube.com**Should I use a Secondary Domain or Alias Domain in Google Workspace? - YouTube](https://www.youtube.com/watch?v=7obqtbVWs1k)

[**googally.com**Understanding Multiple Domains in Google Workspace - Googally.com](https://www.googally.com/blog/multiple-domains-in-google-workspace)

[**knowledge.workspace.google.com**Compare Directory Sync with GCDS | User management - Google Workspace Help](https://knowledge.workspace.google.com/admin/users/compare-directory-sync-with-gcds)

[**jumpcloud.com**What Is GCDS? (Google Cloud Directory Sync) - JumpCloud](https://jumpcloud.com/blog/what-is-gads)

[**discuss.google.dev**GCDS (Google Cloud Directory Sync) - Compute Infrastructure](https://discuss.google.dev/t/gcds-google-cloud-directory-sync/87745)

[**workspaceupdates.googleblog.com**Use Directory Sync beta for fast and easy sync of users and groups](https://workspaceupdates.googleblog.com/2022/01/directory-sync-beta.html)

[**knowledge.workspace.google.com**Use Google Calendar structured resources | Set up & manage services](https://knowledge.workspace.google.com/admin/calendar/use-google-calendar-structured-resources)

[**knowledge.workspace.google.com**Create buildings, features & Calendar resources | Set up & manage services](https://knowledge.workspace.google.com/admin/calendar/create-buildings-features-and-calendar-resources)

[**docs.google.com**Detailed Guide: Structuring Google Calendar Resources](https://docs.google.com/document/d/1uytq_q_pwjq6CEFDDglJq9kRIQ2s7Q3mmCZ5Hhy9gsg/mobilebasic)

[**support.google.com**Moving from non-Structured to Structured calendar resources. Best practices - Google Help](https://support.google.com/a/thread/81771361/moving-from-non-structured-to-structured-calendar-resources-best-practices?hl=en)

[**support.google.com**Email sender guidelines - Google Workspace Admin Help](https://support.google.com/a/answer/81126?hl=en)

[**knowledge.workspace.google.com**Set up DKIM | Security & data protection - Google Workspace Help](https://knowledge.workspace.google.com/admin/security/set-up-dkim)

[**developers.google.com**Security requirements | Gmail - Google for Developers](https://developers.google.com/workspace/gmail/ampemail/security-requirements)

[**knowledge.workspace.google.com**Set up DMARC | Security & data protection - Google Workspace Help](https://knowledge.workspace.google.com/admin/security/set-up-dmarc)

[**gatlabs.com**5 Ways to Effectively Manage Google Shared Drives as an Admin - GAT Labs](https://gatlabs.com/blogpost/how-to-best-manage-google-shared-drives/)

[**support.google.com**Best practices and tips for shared drives - Google Workspace Learning Center](https://support.google.com/a/users/answer/13015138?hl=en)

[**workspace.google.com**Dare to share: best practices for sharing documents in G Suite | Google Workspace Blog](https://workspace.google.com/blog/productivity-collaboration/best-practices-for-sharing-documents-in-g-suite)

[**documentation.its.umich.edu**Best Practices for Sharing in Google Drive - ITS Documentation](https://documentation.its.umich.edu/google-drive-sharing)

[**knowledge.workspace.google.com**Google Workspace with Gemini FAQ](https://knowledge.workspace.google.com/admin/gemini/gemini-for-google-workspace-faq)

[**knowledge.workspace.google.com**Generative AI in Google Workspace Privacy Hub](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub)

[**workspace.google.com**Generative AI Security, Compliance and Privacy | Google Workspace](https://workspace.google.com/security/ai-privacy/)

[**workspace.google.com**When to use AppSheet or Apps Script in Google Workspace](https://workspace.google.com/blog/developers-practitioners/when-to-use-appsheet-or-apps-script-in-google-workspace)

[**knowledge.workspace.google.com**Manage AppSheet in your organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/appsheet/manage-appsheet-in-your-organization)

[**youtube.com**AppSheet Admin Console: A deep dive for Admins - YouTube](https://www.youtube.com/watch?v=8GPinI6VIf8)

[**developers.google.com**Best Practices | Apps Script - Google for Developers](https://developers.google.com/apps-script/guides/support/best-practices)

[**knowledge.workspace.google.com**Set up shared drives for your organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/drive/set-up-shared-drives-for-your-organization)

[**knowledge.workspace.google.com**Security checklist for medium and large businesses (100+ users) - Google Workspace Help](https://knowledge.workspace.google.com/admin/security/security-checklist-for-medium-and-large-businesses-100-users)

### Set up & manage services

[**backupvault.co.uk**](https://www.backupvault.co.uk/blog/google-workplace/dlp-workspace/#:~:text=Best%20Practices%20for%20Google%20Workspace%20DLP%20to%20Protect%20Your%20Data&text=Begin%20with%20predefined%20policy%20templates,moving%20to%20outright%20block%20rules.)

[**workspace.google.com**Control over data location with Google Workspace](https://workspace.google.com/products/admin/data-regions/)

[**services.google.com**Trusting your data with Google Workspace](https://services.google.com/fh/files/misc/google_workspace_trust_whitepaper_jan2023.pdf)

[**knowledge.workspace.google.com**Set up advanced settings for data regions | Legal & compliance - Google Workspace Help](https://knowledge.workspace.google.com/admin/compliance/set-up-advanced-settings-for-data-regions)

[**knowledge.workspace.google.com**Export all your organization's data | Data migration - Google Workspace Help](https://knowledge.workspace.google.com/admin/migrate/export-all-your-organizations-data)

[**gatlabs.com**Principle of Least Privilege: The Unsung Hero of Google Workspace Security - GAT Labs](https://gatlabs.com/blogpost/principle-of-least-privilege-the-unsung-hero-of-google-workspace-security/)

[**cloud.google.com**Don't get pwned: practicing the principle of least privilege | Google Cloud Blog](https://cloud.google.com/blog/products/identity-security/dont-get-pwned-practicing-the-principle-of-least-privilege)

### Resource Manager

[**cisa.gov**Google Common Controls | CISA](https://www.cisa.gov/resources-tools/services/gws-commoncontrols)

[**knowledge.workspace.google.com**Security best practices for administrator accounts | User management](https://knowledge.workspace.google.com/admin/users/security-best-practices-for-administrator-accounts)

[**knowledge.workspace.google.com**Administrator privilege definitions | User management - Google Workspace Help](https://knowledge.workspace.google.com/admin/users/administrator-privilege-definitions)

[**revolgy.com**10 practical ways to secure your Google Workspace in 2026 - Revolgy](https://www.revolgy.com/insights/blog/securing-google-workspace-best-practices-and-solutions)

[**nudgesecurity.com**Top 5 Google Workspace security settings and misconfigurations](https://www.nudgesecurity.com/post/top-5-google-workspace-security-settings-and-misconfigurations)

[**knowledge.workspace.google.com**Protect your business with Context-Aware Access - Google Workspace Help](https://knowledge.workspace.google.com/admin/security/protect-your-business-with-context-aware-access)

[**knowledge.workspace.google.com**Context-Aware Access examples for Advanced mode | Security & data protection](https://knowledge.workspace.google.com/admin/security/context-aware-access-examples-for-advanced-mode)

[**knowledge.workspace.google.com**Context-Aware Access examples for Basic mode | Security & data protection](https://knowledge.workspace.google.com/admin/security/context-aware-access-examples-for-basic-mode)

[**knowledge.workspace.google.com**Create and manage trust rules for Drive sharing | Security & data protection](https://knowledge.workspace.google.com/admin/security/create-and-manage-trust-rules-for-drive-sharing)

[**knowledge.workspace.google.com**Manage external sharing for your organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/drive/manage-external-sharing-for-your-organization)

[**reddit.com**Google Trust Rules Question : r/sysadmin - Reddit](https://www.reddit.com/r/sysadmin/comments/18ojzx6/google_trust_rules_question/)

[**shiftcontrol.io**Google Workspace App Permissions: How to Control Third-Party App Access - ShiftControl](https://shiftcontrol.io/learn/google-workspace-app-permissions)

[**support.google.com**Set whether users can install Marketplace apps - Google Workspace Admin Help](https://support.google.com/a/answer/172931?hl=en_bs&ref_topic=27380)

[**knowledge.workspace.google.com**Manage the Marketplace app allowlist for your organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/apps/manage-the-marketplace-app-allowlist-for-your-organization)

[**knowledge.workspace.google.com**Control which apps access Google Workspace data | Apps & integrations](https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data)

[**reddit.com**Workspace and Device Management : r/googleworkspace - Reddit](https://www.reddit.com/r/googleworkspace/comments/1qbcuoj/workspace_and_device_management/)

[**xfanatical.com**Unlocking the Power of Google Workspace Device Management - xFanatical](https://xfanatical.com/blog/unlocking-the-power-of-google-workspace-device-management/)

[**support.google.com**Set Chrome policies for users or browsers - Chrome Enterprise and Education Help](https://support.google.com/chrome/a/answer/2657289?hl=en)

[**medium.com**Email Log Search in Google Workspace — What You Can (and Can't) See - Medium](https://medium.com/@cyberengage.org/email-log-search-in-google-workspace-what-you-can-and-cant-see-45e2403b5541)

[**knowledge.workspace.google.com**Find messages with Email Log Search | Support & troubleshooting](https://knowledge.workspace.google.com/admin/support/troubleshooting/find-messages-with-email-log-search)

[**knowledge.workspace.google.com**Google Workspace diagnostic tools | Support & troubleshooting](https://knowledge.workspace.google.com/admin/support/troubleshooting/google-workspace-diagnostic-tools)

[**toolbox.googleapps.com**Google Admin Toolbox](https://toolbox.googleapps.com/apps/main/)

[**civicplus.help**Create a HAR Format File - CivicPlus Help Center](https://www.civicplus.help/municipal-websites-central/docs/create-a-har-format-file)

[**toolbox.googleapps.com**HAR Analyzer - ToolBox Google Apps](https://toolbox.googleapps.com/apps/har_analyzer/)

[**help.tanium.com**Creating and reading a browser HAR Capture - Tanium Resource Center](https://help.tanium.com/bundle/HARfile-Create-Read/page/KA/HARfile-Create-Read/HARfile-Create-Read.htm)

[**ditoweb.com**Google Workspace Security Investigation Tool: Your Top Questions Answered - Dito](https://www.ditoweb.com/2025/06/google-workspace-security-investigation-tool-your-top-questions-answered/)

[**knowledge.workspace.google.com**Track meeting quality & statistics | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/meet/track-meeting-quality-and-statistics)

[**cloud.google.com**Associate Google Workspace Administrator | Learn](https://cloud.google.com/learn/certification/associate-google-workspace-administrator)

[**reco.ai**Google Workspace Administrator Certification Guide - Reco](https://www.reco.ai/hub/google-workspace-administrator-certification)
