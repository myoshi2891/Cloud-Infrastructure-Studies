# **Google Associate Google Workspace Administrator 認定試験セクション 1：ユーザー、ドメイン、ディレクトリ管理に関する技術詳報**

## **セクション 1 の概要と管理者としての戦略的役割**

Google Workspace の管理において、セクション 1「ユーザーアカウント、ドメイン、およびディレクトリの管理」は、組織のデジタルアイデンティティと基盤インフラを定義する極めて重要な領域である 。このセクションは試験全体の約 22% を占めており、単なる操作手順の習得を超えて、スケーラビリティ、セキュリティ、およびガバナンスを考慮した設計能力が問われる 。インフラエンジニアの視点から見れば、これは「真実のソース（Source of Truth）」の確立と、最小権限の原則（Principle of Least Privilege）に基づいたアクセス制御の設計図を構築するプロセスに他ならない 。

管理者の主な責任は、ユーザーのライフサイクル全体を適切に管理し、組織の階層構造を論理的な組織部門（OU）に反映させ、コミュニケーションと権限管理のためのグループを運用し、さらにドメインインフラと物理リソース（建物や会議室）を統合することにある 。初学者がこの広範なトピックを理解するためには、各機能が独立したものではなく、アイデンティティおよびアクセス管理（IAM）という大きなエコシステムの中で相互に作用していることを把握する必要がある 。本レポートでは、試験ガイドに基づき、各項目の詳細な技術解説、構築のステップバイステップ、およびエンタープライズレベルでのベストプラクティスを網羅的に論述する。

## **1.1 ユーザーライフサイクルの管理**

ユーザーライフサイクルの管理は、アカウントのプロビジョニング（作成）、メンテナンス（属性変更、セキュリティ管理）、およびデプロビジョニング（停止、削除、データ移行）の一連のプロセスを指す 。これらは組織のセキュリティ姿勢に直結するタスクであり、自動化と厳格な運用の両立が求められる。

### **ユーザーアカウントの作成と自動化**

ユーザーアカウントの作成には、組織の規模と技術スタックに応じて複数の手法が存在する。初学者がまず習得すべきは、管理コンソールを使用した手動作成と CSV による一括登録である 。

| **作成手法**              | **適したシナリオ**                 | **メリット**                           | **考慮事項**                     |
| ------------------------- | ---------------------------------- | -------------------------------------- | -------------------------------- |
| **手動作成**              | 少人数の新規採用、テストアカウント | 即時性、GUI による直感的な操作 。      | 大規模運用には不向き。           |
| **CSV 一括アップロード**  | 定期的な中規模採用、初期移行       | 最大数千人を一括処理可能 。            | CSV フォーマットの正確性が必須。 |
| **Directory API**         | 独自の人事システムとの連携         | リアルタイムな自動プロビジョニング 。  | 開発リソースが必要。             |
| **GCDS (Directory Sync)** | AD/LDAP 環境との同期               | 既存のディレクトリ情報を反映 。        | 同期ルールの設計が必要。         |
| **3rd Party IdP (SAML)**  | Okta や Azure AD との統合          | シングルサインオン（SSO）と一元管理 。 | ID プロバイダ側の設定が必要。    |

手動作成のステップは以下の通りである。管理コンソールの「ディレクトリ > ユーザー」に移動し、「新しいユーザーの追加」を選択する 。ここで、姓名、プライマリメールアドレス、および組織部門（OU）を指定する。パスワードは自動生成させるか、管理者が手動で設定し、次回ログイン時のパスワード変更を強制することがセキュリティ上のベストプラクティスである 。

大規模な環境では、Google Cloud Directory Sync (GCDS) の活用が不可欠である。GCDS は、オンプレミスの Active Directory や LDAP サーバーを「真実のソース」として、Google Workspace 側のユーザーやグループを一方通行で同期させる 。これにより、人事異動に伴う属性変更や退職によるアカウント停止が自動的に Google 側に反映され、管理負荷とセキュリティリスクが大幅に低減される。

### **アカウントの状態管理：停止、アーカイブ、削除**

アカウントの「出口戦略」は、データの整合性とライセンスコストの最適化において極めて重要である。Google Workspace には、アカウントの状態を制御する複数のオプションが用意されている 。

1. **停止 (Suspension)**: 管理者またはシステム（利用規約違反など）によってアカウントへのアクセスが遮断された状態である 。ユーザーはログインできず、メールの受信も停止するが、ドライブのファイルやカレンダーの予定は保持される。ライセンスは引き続き消費されるため、一時的な休職や調査目的で使用される。
2. **アーカイブ (Archive User)**: Enterprise 版などの上位エディションで利用可能なオプションである。通常のライセンスよりも低コストで、Vault によるデータ保持（リーガルホールド）を継続しながら、ユーザーのログインを停止する。退職者のデータを長期保持する必要がある場合に最適である。
3. **削除 (Deletion)**: アカウントを完全に消去する。削除後 20 日以内であれば復元可能であるが、それを過ぎるとデータは永久に失われる 。

### **データの所有権移転とデプロビジョニングのベストプラクティス**

ユーザーを削除する際、最も重要な技術的ステップは「データの移行（所有権の譲渡）」である 。Google ドライブのファイルは、削除プロセスの中で他のアクティブなユーザーへ所有権を一括で移転できる。ただし、共有ドライブ内のファイルは組織が所有しているため、個別に移転する必要はない 。カレンダーの予定については、削除前に重要な会議の主催者を変更しておく必要がある。

ベストプラクティスとして、退職者のアカウント処理は以下の手順で行うことが推奨される。

- **即時アクション**: パスワードのリセット、ログインクッキーの初期化、モバイルデバイスのワイプを行い、アクセスを遮断する 。
- **暫定フェーズ**: アカウントを「停止」し、必要に応じてメールの自動返信を設定するか、受信トレイを別のアカウントに委任して業務の引き継ぎを確認する 。
- **最終フェーズ**: データの所有権を後任者や管理用アカウントに移転し、ライセンスを回収するためにアカウントを削除またはアーカイブする 。

### **ユーザー属性の変更と管理**

管理者は、ユーザーの氏名、予備のメールアドレス（リカバリ用）、電話番号、職位などの属性を随時変更できる。プライマリメールアドレス（ユーザー名）を変更する場合、変更前の古いアドレスは自動的に「メールエイリアス」として保持されるため、古いアドレス宛のメールが届かなくなる心配はない 。

### **パスワード管理とセキュリティ**

パスワード管理は、アイデンティティ保護の第一線である。管理者は、パスワードの長さ（最小 8 文字から最大 100 文字）や強度の要件を OU ごとに設定できる 。

- **パスワード強度の強制**: Google のアルゴリズムに基づき、推測されやすいパスワード（例：12345678）を拒否する設定を有効にすべきである 。
- **有効期限と再利用の制限**: 定期的な変更を求めることも可能だが、現代のセキュリティ標準（NIST など）では、強力なパスワードと多要素認証（2SV）を組み合わせることで、頻繁な強制変更の必要性は低下している 。
- **管理作業**: 管理者は個別のユーザーに対して「次回サインイン時にパスワード変更を求める」フラグを立てることができ、これはパスワード漏洩の疑いがある際の即時対応として有効である 。

## **1.2 組織部門（OU）の設計と作成**

組織部門（Organizational Units: OU）は、Google Workspace における設定適用とサービス制御の「コンテナ」である 。OU はディレクトリ内のユーザーやデバイスを論理的にグループ化し、それぞれに異なるポリシーを割り当てるために使用される。

### **OU の階層構造と継承のメカニズム**

OU はツリー状の階層構造（Hierarchy）を持ち、最上位に「ルート（トップレベル）OU」が存在する。すべてのユーザーとデバイスは、デフォルトでこのルート OU に属し、設定を継承する 。

- **継承 (Inheritance)**: 親 OU で行われた設定（例：Gmail の無効化）は、明示的に変更されない限り、すべての子 OU に自動的に適用される 。
- **オーバーライド (Override)**: 子 OU で親とは異なる設定（例：特定の部門だけ Gmail を有効化）を保存すると、その OU 以降の階層では親の設定が上書きされる 。
- **リセット（継承に戻す）**: 子 OU でのカスタム設定を削除し、親 OU の設定を再度適用させることも可能である。

### **戦略的な OU 設計の原則**

インフラエンジニアとしてのベストプラクティスは、OU を「物理的な組織図」ではなく「適用すべきポリシーの差異」に基づいて設計することである 。

| **設計基準**       | **ユースケース**                       | **設計のポイント**                                                                                                        |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **役割ベース**     | フルタイム社員、契約社員、外部ベンダー | 外部ベンダー OU では、ドライブの外部共有を完全に禁止する等の厳格な制限を行う 。                                           |
| **サービスベース** | 開発チーム、マーケティングチーム       | 開発チーム OU では Google Cloud Platform へのアクセスを許可し、マーケティング OU では YouTube の高度な機能を有効にする 。 |
| **デバイスベース** | ChromeOS デバイス、会議室専用端末      | ユーザー用 OU とは別にデバイス専用 OU を作成し、キオスクモードやネットワーク設定を個別に管理する 。                       |

OU 設計のステップバイステップ：

1. 管理コンソールの「ディレクトリ > 組織部門」を開く 。
2. 「+」アイコンをクリックし、新しい子 OU の名前と説明を入力する。
3. 作成した OU を選択した状態で、「アプリ > Google Workspace」などの各サービス設定へ移動し、オン/オフや詳細なポリシーを保存する 。
4. 「ディレクトリ > ユーザー」から、該当するユーザーを選択し、「組織部門の変更」を実行してユーザーを新設 OU に移動させる 。

重要な注意点として、ユーザーは常に「1 つの OU」にしか属することができない 。複数の異なるポリシーセットを組み合わせたい場合は、OU による階層管理に加えて、後述する「アクセスグループ」による例外処理を併用する。

## **1.3 グループの管理**

Google グループは、コミュニケーション（メーリングリスト）と権限管理の両面で不可欠なツールである 。OU が「上意下達」の階層的なポリシー適用を担うのに対し、グループは「横断的」なコラボレーションと柔軟なアクセス制御を可能にする。

### **グループの主要な種類と機能**

管理者は、目的に応じて以下のグループタイプを使い分ける必要がある 。

- **メーリングリスト/配布リスト**: チーム全員への情報共有に使用される。基本的なコミュニケーションの単位である。
- **共同トレイ (Collaborative Inbox)**: `support@` や `info@` などの共有アドレスに届いたメールを、グループメンバーが「担当者の割り当て」や「完了ステータスの管理」を行いながら共同で処理できる 。
- **セキュリティグループ**: 特定のラベルが付与されたグループであり、重要なデータやアプリへのアクセス権限を付与するために特別に設計されている 。
- **動的グループ (Dynamic Groups)**: メンバーを手動で管理する代わりに、「役職がマネージャー」や「部門が営業」といった条件（クエリ）を定義し、条件に合致するユーザーを自動的にメンバーとして追加・削除する 。

### **グループによるサービスアクセス制御（アクセスグループ）**

OU 設定の限界を補完するのが「アクセスグループ」の概念である 。

- **ユースケース**: ある部門（OU）全体で YouTube がオフに設定されているが、その中の 2 名だけが業務で YouTube を使用する必要がある場合。
- **解決策**: その 2 名を「YouTube 利用許可グループ」に追加し、管理コンソールのサービス設定で、その「グループ」に対してのみサービスを「オン」にする 。
- **優先順位**: グループによるサービス設定は、OU による設定よりも優先される。複数のグループに属している場合は、管理者が設定したグループの優先順位（Priority）に従って適用される 。

### **グループ運用のベストプラクティス**

1. **管理の委譲**: 管理者だけで全グループを管理するのは非効率である。各チームのリーダーを「グループのオーナー」に指定し、メンバーの追加・削除を現場で行わせるべきである 。
2. **外部メンバーの制限**: 外部（ドメイン外）のユーザーをグループに追加できるかどうかは、組織全体のポリシーとして制御すべきである。セキュリティグループでは外部メンバーを禁止するのが定石である 。
3. **命名規則の確立**: `grp-sales-global@` や `sec-admin-access@` のように、プレフィックスを付けて用途と種類を明確にする 。
4. **アーカイブの活用**: プロジェクト終了後、グループをすぐに削除するのではなく、会話履歴をアーカイブして検索可能な知識ベースとして保持することを検討する 。

## **1.4 ドメインの管理**

ドメインは Google Workspace のアイデンティティの根幹である。管理者は、単一の契約（テナント）内で複数のドメインを管理し、ブランドや組織構造を反映させることができる 。

### **プライマリドメイン、セカンダリドメイン、ドメインエイリアスの比較**

これら 3 つの違いを理解することは、コスト管理とユーザー体験の設計において極めて重要である 。

| **ドメインの種類**     | **定義と役割**                                        | **ライセンスコスト**       | **ユーザー体験**                                                        |
| ---------------------- | ----------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| **プライマリドメイン** | 契約時に登録される主ドメイン。全設定の基準。          | 基本コスト。               | 組織の標準 ID となる。                                                  |
| **セカンダリドメイン** | 別のブランドや子会社用に追加される独立したドメイン 。 | 追加のユーザーごとに発生。 | 独自の受信トレイとアカウントを持つ独立したユーザー 。                   |
| **ドメインエイリアス** | 既存のドメインに別名を付ける（例：.com と.co.jp） 。  | **無料** 。                | 既存のユーザーが別のアドレスでもメールを受信できる。単一の受信トレイ 。 |

### **ドメイン追加の技術的手順と DNS の役割**

新しいドメインを追加するプロセスは、インターネット上の所有権を証明する厳格な手順を踏む 。

1. **ドメインの追加**: 管理コンソールの「アカウント > ドメイン > ドメインの管理」から「ドメインを追加」を選択する 。
2. **所有権の確認**: Google から提示される TXT レコードまたは CNAME レコードを、ドメイン登録業者（レジストラ）の DNS 設定に追加する 。Google はこのレコードを検出し、管理者がそのドメインの制御権を持っていることを確認する。
3. **MX レコードの設定**: メールの配送先を Google のサーバーに向けるため、優先度（Priority）を伴う MX レコードを DNS に登録する 。
4. **SPF/DKIM/DMARC の設定**: メールのなりすましを防ぎ、信頼性を高めるため、送信元認証の設定を DNS に追加する。

**ベストプラクティス**: 組織の再編やブランド変更の際、プライマリドメインを直接変更するのはリスクが高い（ユーザー名の変更に伴う各種アプリへの影響があるため）。まず「ドメインエイリアス」として新しいブランドを追加し、十分な周知とテストの後に、計画的なメンテナンスとしてプライマリドメインの切り替えを実施すべきである 。

## **1.5 建物とリソースの管理**

Google Workspace は、デジタルなツールだけでなく、物理的な会議室や備品の予約も管理できる。これはカレンダー機能と密接に統合されており、ディレクトリの一部として管理される 。

### **リソースの階層：建物、階、部屋**

効率的なリソース管理のためには、物理的な構造を反映したデータモデルを構築する必要がある 。

- **建物 (Buildings)**: 地理的な拠点。住所、緯度・経度情報を持ち、Google マップとの連携も可能である 。
- **特徴 (Features)**: 会議室の備品属性。例えば「ホワイトボード」「ビデオ会議設備（Meet Hardware）」「車椅子対応」などを定義する 。
- **リソース (Resources)**: 実際の予約対象。会議室、共有デスク、社用車などが含まれる。収容人数（Capacity）を設定できる 。

### **バルク操作による効率化**

大規模なオフィス移転や新拠点開設の際、一つずつリソースを登録するのは現実的ではない。管理者は CSV ファイルを使用した一括アップロード機能を活用すべきである 。

CSV 登録のステップ：

1. 管理コンソールの「ディレクトリ > 建物とリソース」から、既存リソースの CSV テンプレートをダウンロードする 。
2. Google スプレッドシートや Excel で開き、以下の必須列を入力する 。
   - `Resource ID`: システム内の一意識別子。
   - `Resource Name`: ユーザーに表示される名称（例：Conf-Room-4A）。
   - `Building ID`: 紐付ける建物の ID。
   - `Capacity`: 収容人数。
3. 特徴を追加する場合、`#` を頭文字に付けて列を作成する（例：`#Whiteboard`） 。
4. 完成した CSV を管理コンソールにアップロードし、整合性チェックを経て登録を完了させる。

**ベストプラクティス**: リソースの命名規則は、カレンダーで検索しやすいように「`[拠点略称]-[階]-[部屋名] ([収容人数])`」といった形式に統一することが推奨される。また、カレンダーのインテリジェントな提案機能（現在地から近い空き部屋を提案する等）を最大限活用するため、建物の住所情報は正確に設定しておくべきである 。

## **ディレクトリ設定とプロフィールの表示制御**

ディレクトリは、組織内のユーザー、ゲスト、連絡先情報のマスターデータベースである。管理者は、情報の透明性とプライバシーのバランスを考慮して表示を制御する必要がある 。

### **プロフィール情報の管理と編集許可**

管理者は、ユーザー自身が自分のプロフィール（写真、氏名、勤務地、性別など）を編集できるかどうかを OU ごとに制御できる 。

- **名前と写真の保護**: 教育機関や厳格なコーポレートガバナンスが求められる環境では、生徒や従業員が勝手に氏名やプロフィール写真を不適切なものに変更できないよう、編集権限をオフに設定し、管理者が中央管理を行うのが一般的である 。
- **カスタムフィールド**: デフォルトの姓名や電話番号以外に、組織固有の属性（例：社員番号、スキルセット、所属コストセンター）をディレクトリに追加し、API 経由で他システムと連携させることが可能である 。

### **ディレクトリの可視性と共有設定**

すべてのユーザーが組織内の全員を見ることができる状態がデフォルトだが、大規模組織や、機密性の高いプロジェクト、外部パートナーが混在する環境では、表示を制限する必要がある 。

1. **連絡先の共有**: そもそもディレクトリを表示するかどうかのグローバルなスイッチである。
2. **カスタムディレクトリ**: 特定のグループだけを見ることができる「限定的なビュー」を定義し、それを特定の OU に割り当てる。
   - 例：インターン OU には、自チームのメンバーのみが表示されるカスタムディレクトリを割り当て、役員などの連絡先は隠匿する 。
3. **共有外部連絡先**: ドメイン外の重要な連絡先（主要な取引先やサポート窓口）をディレクトリに登録し、組織全体で共有することができる。これは個人用連絡先とは別に、管理者のみが管理できる領域である 。

## **管理役割と権限委譲のベストプラクティス**

Google Workspace の管理は強力な権限を伴うため、セキュリティと運用の効率性を両立させる「役割ベースのアクセス制御（RBAC）」の適用が不可欠である 。

### **事前定義されたロールの活用**

Google は、よくある管理業務に合わせて、あらかじめ権限がセットされた「事前定義ロール」を提供している 。

- **特権管理者 (Super Admin)**: すべての設定変更、他の管理者の作成、データの移行など、無制限の権限を持つ。セキュリティ上のリスクを最小化するため、常時使用は避け、2 名以上の配置（一方が事故にあった際のバックアップ）に留めるべきである 。
- **ユーザー管理管理者**: アカウントの作成、削除、パスワードリセットなど、ユーザーのライフサイクル管理に特化している。ただし、他の管理者のアカウントを操作することはできない 。
- **グループ管理者**: グループの作成、メンバーシップの編集、アクセス設定の変更を行う 。
- **ヘルプデスク管理者**: ユーザーのパスワードリセットとプロフィールの参照のみが可能。フロントラインのサポート担当者に適している 。

### **管理者アカウントの保護（インフラエンジニアの鉄則）**

世界トップクラスのインフラエンジニアとして、管理者アカウントの保護には以下の鉄則を適用しなければならない 。

1. **専用の管理者アカウント**: 業務メールやドキュメント作成に使用する日常のアカウントと、管理作業用のアカウント（例：`admin-name@example.com`）を完全に分離する。日常用アカウントに管理権限を付与してはならない 。
2. **物理セキュリティキーの必須化**: 2 要素認証（2SV）の中でも、フィッシング耐性のある FIDO2 ベースの物理セキュリティキー（Titan キーなど）を管理者には必須とする 。
3. **セッション期間の短縮**: 管理者アカウントについては、定期的な再ログインを強制し、セッションが長時間放置されないように設定する 。
4. **監査ログの監視**: 管理者による設定変更やログイン試行を定期的にレビューし、不審な挙動（例：深夜の大量アカウント作成）を自動アラートで検知する体制を構築する 。

## **本セクションの統合的結論と推奨事項**

Associate Google Workspace Administrator 認定試験のセクション 1 をマスターすることは、単に試験に合格するためだけではなく、安全でスケーラブルな組織インフラを構築するための基礎を築くことである。ユーザー、組織、グループ、ドメイン、ディレクトリの 5 つの要素は、互いに密接に絡み合っている。

- **アイデンティティ (User)** は組織の最小単位であり、
- **組織構造 (OU)** はその行動範囲を定義し、
- **ドメイン (Domain)** はその所属を証明し、
- **グループ (Group)** はその動的なコラボレーションを促進し、
- **ディレクトリ (Directory)** はそのすべてを可視化する。

初学者はまず、管理コンソールの GUI でこれらの設定がどこにあるかを把握し、次に CSV による一括操作で大規模運用の感覚を掴むべきである。そして最終的には、API や GCDS を活用した自動化と、RBAC による厳格なセキュリティ管理という、プロフェッショナルなインフラエンジニアの視点を身につけることが求められる。

実務における推奨ステップ：

1. **初期設計の徹底**: 運用を開始する前に、OU 階層とグループ命名規則を文書化する。後からの大幅な変更はユーザーへの影響が大きいため、初期設計が成功の 8 割を決定する。
2. **最小権限の徹底**: 特権管理者を最小限にし、適切な事前定義ロールを割り当てることで、内部不正や誤操作によるリスクを最小化する。
3. **継続的なクリーンアップ**: 未使用のアカウントや不要になったグループを定期的に監査・削除し、ライセンスコストの最適化とアタックサーフェス（攻撃対象領域）の縮小を図る。

以上の知識を体系的に理解し、実機の操作経験を積むことで、Google Workspace 管理者としての強固なキャリアを築くことができるだろう。本レポートがその一助となれば幸いである。

[**support.google.com**Official Google Workspace Admin Help and Training新しいウィンドウで開く](https://support.google.com/a)
[**cloud.google.com**Associate Google Workspace Administrator | Learn新しいウィンドウで開く](https://cloud.google.com/learn/certification/associate-google-workspace-administrator)
[**bgiriaicloud.medium.com**Certification — Google Workspace Administrator Exam: Step-by-Step Guide to Successfully Pass | by Biswanath Giri新しいウィンドウで開く](https://bgiriaicloud.medium.com/certification-google-workspace-administrator-exam-step-by-step-guide-to-successfully-pass-d438a0636fff)
[**toriihq.com**3 Ways to Update User Information in Your Google Workspace Account in 2026 - Toriihq新しいウィンドウで開く](https://www.toriihq.com/articles/how-to-update-user-information-google-workspace)
[**knowledge.othership.com**How to set up Meeting Rooms in Google Workspace - Help Center新しいウィンドウで開く](https://knowledge.othership.com/setting-up-meeting-rooms-with-google-calendar-resources)
[**knowledge.workspace.google.com**Use Google Calendar structured resources | Set up & manage services新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/calendar/use-google-calendar-structured-resources)
[**developers.google.com**Manage user accounts | Admin console - Google for Developers新しいウィンドウで開く](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users)
[**support.google.com**Get started managing groups for an organization | Set up & manage ...新しいウィンドウで開く](https://support.google.com/a/answer/33329?hl=en)
[**docs.cloud.google.com**Best practices for using Google groups | Identity and Access Management (IAM)新しいウィンドウで開く](https://docs.cloud.google.com/iam/docs/groups-best-practices)
[**knowledge.workspace.google.com**FAQ for multiple domains | Domain management - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/domains/faq-for-multiple-domains)
[**knowledge.workspace.google.com**Enforce and monitor password requirements for users - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/enforce-and-monitor-password-requirements-for-users)
[**knowledge.workspace.google.com**Manage a user's security settings | Security & data protection - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/security/manage-a-users-security-settings)
[**support.google.com**Delete or remove a user from your organization | User management ...新しいウィンドウで開く](https://support.google.com/a/answer/33314?hl=en)
[**knowledge.workspace.google.com**User reports: Security | Reports & monitoring - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/reports/user-reports-security)
[**knowledge.workspace.google.com**Security best practices for administrator accounts | User management新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/security-best-practices-for-administrator-accounts)
[**leadsmonky.com**Google Workspace Multiple Domains: Complete Setup & Cost Guide (2026) - Leads Monky新しいウィンドウで開く](https://leadsmonky.com/google-workspace-multiple-domains/)
[**inventivehq.com**Google Workspace Password Policy: Configure Strength Requirements & Rules新しいウィンドウで開く](https://inventivehq.com/knowledge-base/google-workspace/how-to-configure-password-strength-requirements-in-google-workspace)
| Advanced |
[**pipelinedigital.co.uk**Google Organisational Units: The Complete Admin Guide - Pipeline Digital新しいウィンドウで開く](https://pipelinedigital.co.uk/blog/google-workspace-updates/google-organisational-units-the-complete-admin-guide/)
[**knowledge.workspace.google.com**How the organizational structure works | Advanced - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/advanced/how-the-organizational-structure-works)
[**knowledge.workspace.google.com**Customize a directory for a team or group | User management - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/customize-a-directory-for-a-team-or-group)
[**knowledge.workspace.google.com**Security checklist for medium and large businesses (100+ users) - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/security/security-checklist-for-medium-and-large-businesses-100-users)
[**help.happeo.com**Difference between Google Groups and Organizational Units - Happeo新しいウィンドウで開く](https://help.happeo.com/hc/en-us/articles/7546059238545-Difference-between-Google-Groups-and-Organizational-Units)
[**youtube.com**Google Workspace: Groups & Organizational Units - YouTube新しいウィンドウで開く](https://www.youtube.com/watch?v=p8Pkfs56WBo)
[**gmelius.com**Google Groups Do's and Don'ts: How to Use Them Without Chaos - Gmelius新しいウィンドウで開く](https://gmelius.com/blog/google-groups-dos-and-donts)
[**cayosoft.com**Security Group vs. Distribution Group: Key Differences Explained - Cayosoft新しいウィンドウで開く](https://www.cayosoft.com/blog/security-group-vs-distribution-group/)
[**support.google.com**Best practices for deploying target audiences - Google Workspace Admin Help新しいウィンドウで開く](https://support.google.com/a/answer/10356781?hl=en)
[**knowledge.workspace.google.com**Customize service settings using configuration groups | Advanced - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/advanced/customize-service-settings-using-configuration-groups)
[**shadowbear.io**Best Practices to Organize Google Workspace Folders Effectively - Shadowbear新しいウィンドウで開く](https://shadowbear.io/best-practices-to-organize-google-workspace-folders-effectively/)
[**support.google.com**Add a user alias domain or secondary domain | Domain ...新しいウィンドウで開く](https://support.google.com/a/answer/7502379?hl=en)
[**support.cloudhq.net**What is Google Workspace Domain Alias? - cloudHQ Support新しいウィンドウで開く](https://support.cloudhq.net/what-is-google-workspace-domain-alias/)
[**youtube.com**Secondary Domain vs. User Alias Domain | Which to Choose in Google Workspace?新しいウィンドウで開く](https://www.youtube.com/watch?v=ua5NCjdu8is)
[**knowledge.workspace.google.com**Overview: Set up and manage the Directory - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/overview-set-up-and-manage-the-directory)
[**knowledge.workspace.google.com**Create buildings, features & Calendar resources | Set up & manage services新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/calendar/create-buildings-features-and-calendar-resources)
[**nimbledevices.zendesk.com**[G Suite] How to bulk upload resources in G Suite Calendar - Steerpath - Zendesk新しいウィンドウで開く](https://nimbledevices.zendesk.com/hc/en-us/articles/360014487899--G-Suite-How-to-bulk-upload-resources-in-G-Suite-Calendar)
[**xfanatical.com**Bulk Add Google Calendar Resource Buildings - xFanatical新しいウィンドウで開く](https://xfanatical.com/blog/how-to-bulk-add-calendar-resource-buildings/)
[**youtube.com**Best Practices for Directory Management on Google Workspace - YouTube新しいウィンドウで開く](https://www.youtube.com/watch?v=XIkfGmWGaAY)
[**knowledge.workspace.google.com**Allow Directory users to change their profile and photo - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/allow-directory-users-to-change-their-profile-and-photo)
[**knowledge.workspace.google.com**Turn Directory on or off | User management - Google Workspace Help新しいウィンドウで開く](https://knowledge.workspace.google.com/admin/users/turn-directory-on-or-off)
[**workspace.google.com**Admin Insider: 10 tips to better secure your organization using G Suite - Google Workspace新しいウィンドウで開く](https://workspace.google.com/blog/workspace-admins/admin-insider-10-tips-to-better-secure-your-organization-using-g-suite)
