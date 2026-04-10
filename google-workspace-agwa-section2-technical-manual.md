# **Google Workspace 管理者認定試験 Section 2：コアサービスの管理における完全技術解説書**

Google Workspace 管理者の役割は、単なるユーザーアカウントの作成やパスワードのリセットに留まらない。組織のコミュニケーションの動脈である Gmail、知識の貯蔵庫である Google ドライブ、そして物理的・時間的な資源を管理するカレンダーや Meet といった「コアサービス」をいかに最適化し、セキュリティと利便性を両立させるかが、その手腕の見せ所となる 。本報告書では、Google 認定のアソシエイト Google Workspace 管理者（Associate Google Workspace Administrator）試験の Section 2「Managing core Workspace services（コアサービスの管理）」に焦点を当て、初学者が直面する技術的ハードルを一つずつ解消しながら、実務に基づいたベストプラクティスを網羅的に解説する 。

## **第 1 章：Gmail の構成と高度なメール配信管理**

Gmail は組織のアイデンティティを象徴するサービスであり、その構成には DNS（ドメインネームシステム）の深い理解と、巧妙化するサイバー脅威への多層的な防御策が求められる 。Section 2.1 において管理者が習得すべきは、単なる送受信の設定ではなく、トラフィックの「ルーティング」と「フィルタリング」、そして「認証」の三本柱である 。

### **1.1 メールの配送路（MX レコード）の確立と仕組み**

Gmail を組織のメインメールシステムとして稼働させるための最初のアクションは、MX レコードの設定である 。MX レコードは、外部のメールサーバーに対し「このドメイン宛のメールは Google のサーバーに届けてほしい」という指示を出す役割を果たす。この設定が不適切であれば、メールの遅延や不達（バウンス）を招くため、管理者は正確な優先順位（Priority）を持って Google の推奨する MX サーバーを登録しなければならない 。

Google Workspace への移行期や、特定のオンプレミスサーバーと併用する場合には、後述する「分割配信」や「二重配信」を構成するための前提条件として、すべての受信メールが最初に Google のインフラを経由するように MX レコードを構成することがベストプラクティスとされる 。これにより、Google が誇る AI ベースのスパムフィルタがすべてのトラフィックを精査し、有害なコンテンツが組織内に侵入することを未然に防ぐことが可能になる 。

### **1.2 高度なメール配信シナリオ：分割配信と二重配信**

組織の規模が拡大したり、システム移行を行ったりする場合、単一のメールサーバーだけでは要件を満たせないことがある。管理者は「分割配信（Split Delivery）」と「二重配信（Dual Delivery）」の技術的な差異を明確に理解し、状況に応じて使い分ける能力が試される 。

| **配信方式** | **技術的メカニズム** | **主なユースケース** |
| --- | --- | --- |
| **分割配信 (Split Delivery)** | Google サーバーが受信後、宛先が Google 内に存在すれば Gmail へ、存在しなければレガシーサーバー（ホスト）へ転送する 。 | 段階的なクラウド移行、特定の部署のみオンプレミスを継続使用する場合 。 |
| **二重配信 (Dual Delivery)** | すべてのメールを Gmail と外部サーバー（アーカイブサーバーや旧サーバー等）の両方に同時に配信する 。 | 移行前の並行稼働テスト、サードパーティ製アーカイブツールへの全件転送 。 |

**ステップバイステップ：分割配信の設定手順**

1. **ホストの追加:** 管理コンソールの「アプリ」>「Google Workspace」>「Gmail」>「ホスト」から、転送先となる外部サーバーの FQDN または IP アドレスを登録する 。
2. **ルーティングルールの作成:** 「ルーティング」セクションに移動し、新しいルールを追加する。対象を「受信」に設定する 。
3. **メッセージの変更:** アクションとして「メッセージを変更」を選択し、「ルートを変更」の項目で手順 1 で作成したホストを指定する 。
4. **エンベロープフィルタの適用:** すべてのユーザーではなく、Google に存在しないアカウント（Unrecognized/Catch-all）のみを転送対象にするようフィルタリングを施す 。

### **1.3 コンプライアンスフッターと高度なコンテンツフィルタリング**

企業の法的義務やブランドアイデンティティの統一のために、すべての送信メールに定型の免責事項や連絡先を付与する「コンプライアンスフッター」の設定は、Section 2 において頻出の項目である 。これは組織部門（OU）ごとにカスタマイズ可能であり、例えば営業部門にはプロモーション情報を、法務部門には厳格な守秘義務条項を付与するといった運用がなされる 。

さらに、データ漏洩防止（DLP）の観点から、メール本文や添付ファイルに含まれる特定のキーワード（クレジットカード番号、社内機密コードなど）を検知し、送信をブロックしたり、管理者の隔離（Quarantine）に送ったりするルールを構成することも、管理者の重要な責務である 。隔離機能を使用することで、不適切な情報の流出を人手による承認プロセスで食い止めることができる 。

### **1.4 Gmail セキュリティの要：SPF、DKIM、DMARC**

現代のメール管理において、なりすましメールやフィッシング詐欺への対策は最も優先順位が高い。管理者は、以下の三層の認証プロトコルを完璧に構成しなければならない 。

1. **SPF (Sender Policy Framework):** 組織のドメインに代わってメールを送信することを許可されたサーバーのリストを DNS に公開する。これにより、受信サーバーは「自称・自社ドメイン」のメールが正当なソースから来たものか判断できる 。
2. **DKIM (DomainKeys Identified Mail):** 各送信メールのヘッダーにデジタル署名を付与する。受信側はこの署名を公開鍵で検証することで、メールの内容が改ざんされていないことを保証する 。
3. **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** SPF と DKIM の検証が失敗した場合、そのメールを「何もしない（none）」「隔離する（quarantine）」「拒否する（reject）」のいずれにするかを受信サーバーに指示する 。

これらの設定は DNS レベルで行われるが、Google Workspace 管理コンソール内には、DKIM 署名の生成や DMARC レポートを解析するためのツールが統合されている 。ベストプラクティスとしては、最初は `p=none` で影響範囲をモニタリングし、徐々に `p=reject` へとポリシーを厳格化していくアプローチが推奨される 。

### **1.5 未知の脅威を仮想環境で暴く：セキュリティサンドボックス**

標的型攻撃やゼロデイマルウェアに対抗するため、Google Workspace（Business Standard 以上のエディション）では「セキュリティサンドボックス」が提供されている 。これは、受信したメールの添付ファイルを Google の安全な隔離環境（サンドボックス）で実際に実行し、その挙動（ファイルの改ざん、不審なネットワーク通信など）を動的に解析する技術である 。

管理者は「アプリ」>「Google Workspace」>「Gmail」>「スパム、フィッシング、マルウェア」からこの機能を有効化できる 。すべての添付ファイルをスキャンするように設定することが最も安全だが、ビジネスのスピードを優先する場合は、特定のルール（不審な送信元や特定のファイル拡張子）に基づいて適用範囲を絞り込むことも可能である 。スキャンには数分の時間を要する場合があるが、これによりシグネチャベースのウイルス対策をすり抜ける新種のウイルスを捕捉できる可能性が飛躍的に高まる 。

### **Gmail 設定に関する参考ソース**

- [Gmail ルーティングの設定手順](https://knowledge.workspace.google.com/admin/gmail/advanced/add-gmail-routing-settings)
- (https://support.google.com/a/answer/7564124)
- [セキュリティサンドボックスの概要](https://knowledge.workspace.google.com/admin/gmail/advanced/gmail-security-sandbox-overview)

---

## **第 2 章：Google ドライブとドキュメントの統治と保護**

Google ドライブは組織の知的財産が集約される場所であり、管理者は「共有の利便性」と「情報漏洩の防止」という相反する要件のバランスを舵取りしなければならない 。Section 2.2 では、共有設定の階層、共有ドライブの運用、およびデータ損失防止（DLP）ルールの適用が主要なテーマとなる 。

### **2.1 共有モデルの再設計：マイドライブから共有ドライブへ**

従来の「マイドライブ」中心の運用では、ファイルの所有権が作成した個人に紐付くため、退職者のアカウントを削除した際に重要なファイルまで消失してしまうリスクがあった 。これに対し、現代のベストプラクティスは「共有ドライブ」を主軸に置くことである。共有ドライブ内のファイルは組織が所有し、個人のステータスに関わらず永続的に保持される 。

**共有ドライブの権限レベルの使い分け**
共有ドライブには 5 つの役割が存在し、それぞれ付与される権限が厳密に定義されている 。

| **役割 (Role)** | **可能な操作** | **推奨される対象** |
| --- | --- | --- |
| **管理者 (Manager)** | メンバー管理、設定変更、コンテンツの移動・削除。 | チームリーダー、IT 管理担当者 。 |
| **コンテンツ管理者 (Content Manager)** | ファイルの追加、編集、移動、ゴミ箱への移動。 | プロジェクトのメインメンバー（デフォルトの役割） 。 |
| **投稿者 (Contributor)** | ファイルの追加、編集。削除や移動は不可。 | 外部協力者、一般メンバー。 |
| **閲覧者（コメント可） (Commenter)** | 閲覧、コメントの追加。 | レビュー担当者、ステークホルダー。 |
| **閲覧者 (Viewer)** | 閲覧のみ。 | 参照のみを必要とする他部署のユーザー。 |

管理者は、外部ユーザーを共有ドライブに招待する際、そのユーザーがファイルを削除したり移動したりできないよう「投稿者」以下の権限に留めることが推奨される 。また、特定のファイルのみを共有したい場合は、共有ドライブ全体への招待ではなく、ファイル単体での共有機能を活用してアクセス範囲を最小化すべきである 。

### **2.2 信頼ルール（Trust Rules）による精密な外部共有制御**

従来のドライブ管理では「組織外への共有を許可するか否か」という全か無かの設定が主流であったが、現在は「信頼ルール（Trust Rules）」により、非常にきめ細かな制御が可能になっている 。これは、送信側と受信側の属性（OU、グループ、ドメイン）に基づいて、共有の可否や警告表示を動的に定義するものである 。

例えば、「法務部門のファイルは、ドメインVerifiedな外部の法律事務所としか共有できない」あるいは「営業部門が外部と共有する際は必ず警告を表示させ、ユーザーに再確認を促す」といったルールを策定できる 。これにより、業務上の必要性を担保しつつ、不用意な一般公開リンクの発行などをシステム的に抑止できる 。

### **2.3 データ損失防止（DLP）と機密ラベルの統合**

情報漏洩対策の決定打となるのが、DLP ポリシーである 。Google Workspace の DLP は、ドライブ上のドキュメントやスプレッドシートをリアルタイムでスキャンし、クレジットカード番号、個人番号（マイナンバー）、あるいは社内独自の機密パターンを検出する 。

管理者は DLP ルールを定義する際、以下の 3 つのフェーズを意識する必要がある。

1. **スキャンの範囲:** 組織全体に適用するか、特定の OU または機密データを扱うグループに限定するか 。
2. **検出条件:** あらかじめ用意された「事前定義された検出器」を使用するか、正規表現（Regex）を用いて独自の機密情報を定義するか 。
3. **アクション:** 共有を即座にブロックするか、あるいは「これは機密情報である可能性があります。共有を続けますか？」という警告をユーザーに表示させるか。

また、DLP と連動して機能するのが「機密ラベル（Drive Labels）」である 。例えば、DLP が特定の機密情報を検知した際に、自動的に「社外秘」というラベルを付与し、そのラベルが貼られたファイルについては印刷やダウンロード、オフラインコピーを禁止するといった高度な自動化が可能になる 。

### **2.4 デスクトップ版ドライブとエンドポイントの保護**

「Google Drive for Desktop」は、PC のローカル環境からシームレスにドライブを利用できる便利なツールだが、管理の観点からは注意が必要である 。管理者は、組織のデバイスポリシーに基づき、以下の制御を検討しなければならない。

- **利用の許可/制限:** 許可されていない私的デバイスでのデスクトップ版ドライブ利用を制限する 。
- **データのキャッシング:** オフラインアクセスを許可する場合、ディスクの暗号化（BitLocker や FileVault）が有効なデバイスのみに限定することが望ましい 。
- **共有インジケーター:** Web 版と同様に、外部と共有されているフォルダやファイルに視覚的なインジケーターを表示させ、ユーザーの注意を喚起する 。

### **ドライブ管理に関する参考ソース**

- [共有ドライブの管理（公式ガイド）](https://knowledge.workspace.google.com/admin/drive/manage-shared-drives-as-an-admin)
- [信頼ルールの作成と管理](https://knowledge.workspace.google.com/admin/security/create-and-manage-trust-rules-for-drive-sharing)
- (https://support.google.com/a/answer/60781)

---

## **第 3 章：Google カレンダーと物理リソースの最適化管理**

カレンダー管理は、時間の管理だけでなく、会議室や機材といった組織の物理的なアセットをいかに効率的に分配するかに直結する 。Section 2.3 では、リソースの階層化、予約ポリシー、および外部ユーザーに対するプライバシー保護が焦点となる 。

### **3.1 構造化されたリソース管理の構築**

かつてのカレンダーリソースは単なる名前付きのカレンダーに過ぎなかったが、現在は「構造化されたリソース（Structured Resources）」として管理することが強く推奨されている 。管理者は以下の 3 つの要素を組み合わせて、ユーザーが直感的にリソースを選択できる環境を構築しなければならない。

1. **建物 (Buildings):** 会議室が存在する拠点の情報を定義する。正確な住所情報を入れることで、後述するルームインサイトでの地理的分析が可能になる 。
2. **機能 (Features):** そのリソースが持つ特徴をタグ付けする（例：大型モニター、車椅子対応、TV 会議システム搭載など） 。
3. **リソース (Resources):** 実際の会議室名や備品名を登録し、建物と機能を関連付ける。

**ステップバイステップ：リソース作成のベストプラクティス**

- **命名規則の統一:** `[拠点名]-[階数]-[部屋名]`（例：TK-3F-RoomA）のように、一目で場所がわかる名称を付ける 。
- **キャパシティの入力:** 会議室の最大収容人数を正確に入力する。これにより、Google カレンダーの「Find a time」機能が、参加人数に最適な部屋を自動的に提案できるようになる 。

### **3.2 予約ポリシーと承認プロセスの委任**

すべてのリソースが「早い者勝ち」で予約されるのが望ましいわけではない。例えば、役員用会議室や高価な撮影機材などは、特定の担当者による承認を必要とする設定にすることができる 。

管理者は、特定のリソースカレンダーに対し「リソース・マネージャー」を指定し、そのマネージャーに「変更および共有の管理」権限を付与する 。マネージャーは、予約リクエストが届いた際に通知を受け、カレンダー上でその予定を承認または拒否する。
また、自動的なクリーンアップ機能として、予定の参加者が全員（または 1 人を除き全員）が欠席（Decline）した場合に、予約されていた会議室を自動的に解放し、他のユーザーが予約できるようにする設定も有効である 。

### **3.3 カレンダーのプライバシーとセキュリティ設定**

カレンダーの共有設定は、情報の透明性とプライバシーの保護の間で慎重に検討されるべきである。

- **内部共有設定:** 組織内のユーザーが互いのカレンダーでどこまで詳細が見えるかを設定する。「空き時間情報のみ（詳細は非表示）」に設定すると、会議のタイトルや参加者、場所が隠されるため、よりプライバシーが保護される 。
- **外部からの招待を制限:** スパム対策として、「自分が承諾した予定のみを表示する」あるいは「既知の送信者（連絡先にある相手）からの招待のみを自動追加する」設定が推奨される 。
- **リソースの閲覧権限:** リソースカレンダー自体を外部に公開しないよう注意する。リソースの設定で「一般公開」がチェックされていると、会議のタイトル（例：「A 社買収に関する会議」）が全世界から検索可能になってしまう恐れがある 。

### **3.4 ルームインサイト（Room Insights）によるデータ分析**

管理コンソールの「ディレクトリ」>「建物とリソース」>「インサイト」では、リソースの利用状況を可視化できる。

- **利用率の低いリソースの特定:** 常に予約されているが実際には人が入っていない部屋や、逆に常に満室で予約が取れない拠点を特定できる 。
- **設備投資の根拠:** どの種類の設備（例：Jamboard や特定のビデオ端末）が最も利用されているかを知ることで、次回のオフィス改装や設備導入の際の定量的な判断材料となる 。

### **カレンダー管理に関する参考ソース**

- [カレンダーリソースの作成と共有（公式）](https://knowledge.workspace.google.com/admin/calendar/create-buildings-features-and-calendar-resources)
- [リソース・マネージャーの設定手順](https://support.google.com/a/users/answer/13015138)
- [ルームインサイトの活用方法](https://workspace.google.com/blog/productivity-collaboration/three-ways-you-can-optimize-meetings-your-organization-hint-room-matters)

---

## **第 4 章：Google Meet と Chat のセキュアな対話管理**

ビデオ会議とチャットは、現代のビジネスにおけるリアルタイム・コラボレーションの要である。管理者の役割は、これらのサービスを単に「使えるようにする」だけでなく、セキュアな境界線を引くことにある 。

### **4.1 Google Meet の安全設定とビデオ会議のガバナンス**

Section 2.4 で求められるのは、Meet の高度な安全性設定を組織のセキュリティポリシーに適合させる能力である 。

- **クイックアクセスと参加制限:** 会議の主催者が、誰が直接参加でき、誰が「ノック（承認待ち）」をしなければならないかを制御する「クイックアクセス」機能をデフォルトでオンにするかオフにするかを設定する 。
- **ホスト管理 (Host Management):** 会議の主催者が参加者をミュートしたり、画面共有を禁止したり、会議から退出させたりできる機能を強制するかどうか。これは特に教育機関や大規模なウェビナー形式の会議で重要となる 。
- **録画とアーティファクトの保存:** 録画機能の利用を特定の OU に制限し、録画ファイルの保存先が組織のドライブ・コンプライアンスルールに従うように管理する 。録画に加え、自動文字起こし（トランスクリプト）や Gemini による要約機能の利用可否も、管理コンソールから制御可能である 。

### **4.2 Google Chat の履歴管理と外部連携の制御**

Google Chat（Section 2.5）においては、情報の即時性と「証拠保持」の両立が課題となる。

- **チャット履歴の強制オン/オフ:** 組織のデータ保持ポリシーに基づき、会話の履歴を常にオンにするか、あるいはユーザーが個別にオフ（10,000 字以上の長いメッセージや機密の会話など）にできるかを選択する 。履歴がオフの場合、Google Vault による検索や保持の対象外となるため、法規制が厳しい業界では「履歴をオンに固定」することがベストプラクティスである。
- **外部ドメインとのチャット制限:** 組織外のユーザーとの 1:1 チャットや、外部ユーザーが参加できる「スペース」の作成を許可するかどうかを制御する 。信頼できるパートナー企業のみとチャットを許可したい場合は、許可リスト（Allowlist）に登録されたドメインのみに制限する設定が有効である 。
- **コンテンツのモデレーション:** ユーザーが不適切なメッセージを報告できる機能を有効化し、管理者は「モデレーションツール」を使用して、報告された内容の確認、削除、あるいは送信者の警告・処置を行うプロセスを確立する 。

### **4.3 Chat アプリと自動化の管理**

Chat にはサードパーティ製のアプリや、組織で独自開発した Bot を統合できる。管理者は「アプリの管理」設定において、ユーザーが自由にアプリを追加できるか、あるいは管理者が承認したアプリのみを利用可能にするかを決定する 。これにより、未承認のアプリを介したデータ流出（シャドー IT）のリスクを軽減できる 。

### **Meet と Chat に関する参考ソース**

- [Google Meet セキュリティとプライバシー（公式）](https://knowledge.workspace.google.com/admin/meet/google-meet-security-and-privacy-for-it-admins)
- [Chat の外部共有設定の管理](https://knowledge.workspace.google.com/admin/chat/set-up-chat-for-your-organization)
- [Chat コンテンツ・モデレーションの手順](https://support.google.com/a/answer/14174987)

---

## **第 5 章：生成 AI（Gemini）の統合とプライバシー保護**

Google Workspace における Gemini の活用は、試験の最新アップデート（Section 2.6）において非常に重要な位置を占める。管理者は AI を「魔法の杖」としてだけでなく、適切なガバナンスが必要な「新しいインターフェース」として捉えなければならない 。

### **5.1 Gemini for Google Workspace のプライバシーとセキュリティ原則**

企業向けの Gemini は、無料版の Gemini とはデータ取り扱いの基準が根本的に異なる。管理者は以下の 3 つの「Google Cloud のプライバシーへの取り組み」を組織のステークホルダーに説明できなければならない 。

1. **データの非利用:** 組織のデータ（プロンプトや、AI が参照したドキュメントの内容）は、組織外の不特定多数が利用する生成 AI モデルのトレーニングには使用されない 。
2. **既存の権限の尊重:** Gemini は、ユーザーが元々アクセス権を持っていないデータにアクセスすることはない。マイドライブや共有ドライブの既存の ACL（アクセス制御リスト）がそのまま適用されるため、権限を超えた情報漏洩は起こらない設計になっている 。
3. **エンタープライズグレードの保護:** Gmail やドライブと同じレベルの ISO 認証、SOC 監査、FedRAMP 等のコンプライアンス基準が Gemini にも適用されている 。

### **5.2 Gemini の構成と高度な制御**

管理者は、管理コンソールの「Gemini」設定から、以下の項目を制御する 。

- **サービスの有効化:** 組織全体または特定の OU（例：AI を積極的に活用する企画部門のみ）に Gemini を展開する 。
- **Gemini Extensions:** Gemini アプリが、Gmail やドライブ、カレンダーといった他の Workspace サービスの内容を検索・要約することを許可するかどうかを設定する 。
- **使用状況のレポーティング:** 管理コンソールのダッシュボードで、ライセンスがどれくらい活用されているか、どのサービスでの利用が多いかを可視化し、ROI（投資対効果）を測定する 。

**ベストプラクティス：AI 導入時のガバナンス設定**

- **DLP との連携:** AI が生成した回答に機密情報が含まれる場合、それを検知して警告を出す仕組みを構築する。
- **プロンプトの啓蒙:** ユーザーに対し、生成された回答を鵜呑みにせず必ず「ファクトチェック」を行うこと、また、他者の著作権を侵害しないような使い方をすることを教育する 。

### **Gemini 管理に関する参考ソース**

- (https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub)
- (https://knowledge.workspace.google.com/admin/gemini/set-up-gemini-for-google-workspace)

---

## **第 6 章：Workspace 開発支援（AppSheet と Apps Script）**

Section 2.7 では、組織の業務を自動化するためのツールである AppSheet と Apps Script の管理について解説する。管理者はこれらのツールを、単なる「開発環境」としてではなく、「ビジネスプロセスの自動化インフラ」として管理しなければならない 。

### **6.1 Google Apps Script (GAS) の統治**

Apps Script は、Workspace サービスの機能を拡張するための強力な JavaScript プラットフォームである 。

- **権限の制御:** ユーザーが自身のファイルに対してのみスクリプトを実行できるようにするか、あるいは組織全体のデータにアクセスする「ドメイン全体の委任」を必要とするスクリプトを許可するかを慎重に判断する 。
- **サードパーティ製アドオン:** Google Workspace Marketplace から、Apps Script ベースのサードパーティ製アドオンをインストールすることを許可するかどうかを設定する 。
- **API アクセスの監査:** どのスクリプトがどの API（Gmail, Drive など）を利用しているかを監査ログで追跡し、異常なデータ抽出が行われていないかを監視する 。

### **6.2 AppSheet によるノーコード開発の管理**

AppSheet は、プログラミングコードを書かずにモバイルや Web アプリケーションを構築できるツールである 。

- **ライセンス管理:** ユーザーがアプリを作成し、他者と共有するためには適切な AppSheet ライセンスが必要となる。管理コンソールからライセンスの割り当てを管理する 。
- **AppSheet ガバナンスポリシー:** 管理者は「AppSheet 管理コンソール」を使用して、組織全体でのアプリ作成のルールを定義できる 。例えば、「外部のデータソース（Salesforce や SQL サーバーなど）への接続を禁止する」あるいは「外部ユーザーにアプリを共有することを制限する」といったポリシーを一括適用できる 。
- **AppSheet 管理者権限の委任:** Workspace の特権管理者だけでなく、部門のアプリ開発をリードする「AppSheet 管理者」という特定の役割を割り当てることで、IT 部門の負担を軽減しつつガバナンスを維持できる 。

### **開発支援に関する参考ソース**

- (https://knowledge.workspace.google.com/admin/appsheet/manage-appsheet-in-your-organization)
- (https://knowledge.workspace.google.com/admin/users/access/turn-apps-script-on-or-off-for-users)

---

## **結論と試験合格に向けたアドバイス**

Google Workspace の Section 2：コアサービスの管理は、試験全体の 4 分の 1 を占めるだけでなく、実際の管理業務において最も頻繁に触れる領域である 。初学者が合格を確実にするための鍵は、単なる知識の暗記ではなく、「シナリオに基づいた解決策の提示」にある 。

1. **「組織部門 (OU)」と「グループ」の違いをマスターする:** 多くの設定は OU 単位で継承（Inheritance）されるが、共有設定やサービスへのアクセスは「設定グループ」によって上書きされることがある。この優先順位の問題は試験で非常に頻出する 。
2. **エディションによる機能制限を把握する:** 例えば、DLP やセキュリティサンドボックス、Gemini の一部機能は、Business Starter などの下位エディションでは利用できない。設問に記載されたエディションを注意深く読み、実現可能な解決策を選択する必要がある 。
3. **トラブルシューティングとの連携:** 本セクションで学んだ設定が原因でメールが届かない、ファイルが共有できないといったトラブルが発生した際、どの「監査ログ」を確認し、どの「設定」を修正すべきかという、Section 6（Troubleshooting）との繋がりを常に意識すべきである 。

Google Workspace は常に進化を続けている。新しい機能（特に Gemini や AppSheet 関連）が次々と追加される中で、管理者に求められるのは「不変の原理原則（最小権限、多層防御、データ整合性）」を理解した上で、柔軟に最新のツールを使いこなす姿勢である。本報告書が、貴殿の試験合格、そして世界トップクラスのインフラエンジニアへの第一歩となることを切に願っている。

[**services.google.com**Associate Google Workspace Administrator](https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf)
[**validexamdumps.com**Free Google Associate-Google-Workspace-Administrator Exam Actual Questions & Explanations - ValidExamDumps](https://www.validexamdumps.com/google/associate-google-workspace-administrator-exam-questions)
| PDF |
[**bgiriaicloud.medium.com**Certification — Google Workspace Administrator Exam: Step-by-Step Guide to Successfully Pass | by Biswanath Giri](https://bgiriaicloud.medium.com/certification-google-workspace-administrator-exam-step-by-step-guide-to-successfully-pass-d438a0636fff)
[**workspace.google.com**Advanced Security & Threat Prevention | Google Workspace](https://workspace.google.com/security/threat-prevention/)
[**knowledge.workspace.google.com**Advanced phishing and malware protection | Set up & manage ...](https://knowledge.workspace.google.com/admin/gmail/advanced/advanced-phishing-and-malware-protection)
[**knowledge.workspace.google.com**Send email to 2 email systems with split delivery | Set up & manage services](https://knowledge.workspace.google.com/admin/gmail/advanced/send-email-to-2-email-systems-with-split-delivery)
[**infinitivehost.com**Split Delivery: A Way to Manage G Suite and Business Email - Infinitive Host](https://www.infinitivehost.com/knowledge-base/g-suite-and-business-email/)
[**knowledge.workspace.google.com**Deliver email to multiple inboxes with dual delivery | Set up & manage services](https://knowledge.workspace.google.com/admin/gmail/advanced/deliver-email-to-multiple-inboxes-with-dual-delivery)
[**material.security**Google Workspace Security Features: What to Turn On First (2025)](https://material.security/workspace-resources/google-workspace-security-features-what-to-turn-on-first-2025)
[**knowledge.workspace.google.com**Email routing and delivery options for Google Workspace | Set up & manage services](https://knowledge.workspace.google.com/admin/gmail/advanced/email-routing-and-delivery-options-for-google-workspace)
[**support.google.com**Moderate Chat and Gmail messages - Google Workspace Admin Help](https://support.google.com/a/answer/14174987?hl=en-GBOnce)
[**refractiv.co.uk**How to Secure Your Google Workspace in 2026: A Practical Checklist - Refractiv](https://refractiv.co.uk/news/secure-google-workspace-checklist/)
[**knowledge.workspace.google.com**Set up rules to detect harmful attachments - Google Workspace Help](https://knowledge.workspace.google.com/admin/gmail/advanced/set-up-rules-to-detect-harmful-attachments)
[**knowledge.workspace.google.com**Gmail Security Sandbox overview | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/gmail/advanced/gmail-security-sandbox-overview)
[**support.google.com**Manage external sharing for your organization | Set up & manage ...](https://support.google.com/a/answer/60781?hl=en)
[**support.google.com**Best practices and tips for shared drives - Google Workspace Learning Center](https://support.google.com/a/users/answer/13015138?hl=en)
[**gatlabs.com**5 Ways to Effectively Manage Google Shared Drives as an Admin - GAT Labs](https://gatlabs.com/blogpost/how-to-best-manage-google-shared-drives/)
[**knowledge.workspace.google.com**Manage shared drives as an admin | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/drive/manage-shared-drives-as-an-admin)
[**knowledge.workspace.google.com**Create and manage trust rules for Drive sharing | Security & data protection](https://knowledge.workspace.google.com/admin/security/create-and-manage-trust-rules-for-drive-sharing)
[**knowledge.workspace.google.com**Manage external sharing for your organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/drive/manage-external-sharing-for-your-organization)
[**knowledge.workspace.google.com**Security checklist for medium and large businesses (100+ users) - Google Workspace Help](https://knowledge.workspace.google.com/admin/security/security-checklist-for-medium-and-large-businesses-100-users)
[**inventivehq.com**Google Workspace Security | Essential Protection Guide - Inventive HQ](https://inventivehq.com/blog/google-workspace-security-best-practices)
[**support.google.com**Assign roles to a group's members | Set up & manage services ...](https://support.google.com/a/answer/167094?hl=en)
[**knowledge.workspace.google.com**Manage Calendar for your users | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/calendar/manage-calendar-for-your-users)
[**knowledge.workspace.google.com**Create buildings, features & Calendar resources | Set up & manage services](https://knowledge.workspace.google.com/admin/calendar/create-buildings-features-and-calendar-resources)
[**knowledge.workspace.google.com**What is a Calendar resource? | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/calendar/what-is-a-calendar-resource)
[**docs.cloud.google.com**Best practices for using Google groups | Identity and Access Management (IAM)](https://docs.cloud.google.com/iam/docs/groups-best-practices)
[**workspace.google.com**Three ways you can optimize meetings in your organization (hint: the room matters)](https://workspace.google.com/blog/productivity-collaboration/three-ways-you-can-optimize-meetings-your-organization-hint-room-matters)
[**torontomu.ca**Managing Global Google Room Resources in Google Calendar](https://www.torontomu.ca/google/getting-started/google-calendar/manage-room-resource/)
[**support.google.com**Is there a role that grants a security group resource calendar admin (make changes, manage sharing)? - Google Help](https://support.google.com/a/thread/333547421/is-there-a-role-that-grants-a-security-group-resource-calendar-admin-make-changes-manage-sharing?hl=en)
[**knowledge.workspace.google.com**Share room and resource calendars | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/calendar/share-room-and-resource-calendars)
[**calendly.com**How to allow Google Calendar invitations from unknown senders | Calendly Help](https://calendly.com/help/how-to-allow-google-calendar-invitations-from-unknown-senders)
[**knowledge.workspace.google.com**Administrator privilege definitions | User management - Google Workspace Help](https://knowledge.workspace.google.com/admin/users/administrator-privilege-definitions)
[**knowledge.workspace.google.com**Manage Meet settings (for admins) | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/meet/manage-meet-settings)
[**knowledge.workspace.google.com**Google Meet security & privacy for IT admins | Set up & manage services](https://knowledge.workspace.google.com/admin/meet/google-meet-security-and-privacy-for-it-admins)
[**support.google.com**Google Meet Security & Privacy for users](https://support.google.com/meet/answer/9852160?hl=en)
[**support.google.com**Understand the basics of privacy in Google Chat](https://support.google.com/chat/answer/10364937?hl=en)
[**support.google.com**Restrict messages from unknown senders in Chat - Computer - Google Help](https://support.google.com/chat/answer/15641760?hl=en&co=GENIE.Platform%3DDesktop)
[**workspaceupdates.googleblog.com**Block messages from unknown senders in Google Chat](https://workspaceupdates.googleblog.com/2025/12/block-messages-unknown-senders-google-chat.html)
[**upcurvecloud.com**Google Workspace Introducing Secure External Collaboration with Guest Accounts in Google Chat - UpCurve Cloud](https://upcurvecloud.com/blog/google-workspace-introducing-secure-external-collaboration-with-guest-accounts-in-google-chat/)
[**developers.google.com**Manage Google Chat spaces as a Google Workspace administrator](https://developers.google.com/workspace/chat/admin-overview)
[**opsinsecurity.com**Is Google Gemini Secure for Enterprise? A Security Assessment Guide](https://www.opsinsecurity.com/blog/is-google-gemini-secure-for-enterprise)
[**valencesecurity.com**Gemini Security: Protecting Google Workspace Data and AI Access Across SaaS](https://www.valencesecurity.com/saas-security-terms/gemini-security)
[**knowledge.workspace.google.com**Generative AI in Google Workspace Privacy Hub](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub)
[**workspace.google.com**Generative AI Security, Compliance and Privacy | Google Workspace](https://workspace.google.com/security/ai-privacy/)
[**wursta.com**Automating Tasks with Apps Script and Google Workspace - The Wursta Corporation](https://wursta.com/automating-tasks-with-apps-script-and-google-workspace/)
[**workspace.google.com**Apps Script - Google Workspace](https://workspace.google.com/products/apps-script/)
[**knowledge.workspace.google.com**Turn Apps Script on or off for users | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/users/access/turn-apps-script-on-or-off-for-users)
[**knowledge.workspace.google.com**Manage AppSheet in your organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/appsheet/manage-appsheet-in-your-organization)
[**support.google.com**About your organization and teams - AppSheet Help](https://support.google.com/appsheet/answer/13691133?hl=en)
[**knowledge.workspace.google.com**Control access to AppSheet features | Set up & manage services - Google Workspace Help](https://knowledge.workspace.google.com/admin/appsheet/control-access-to-appsheet-features)
[**youtube.com**AppSheet Admin Console: A deep dive for Admins - YouTube](https://www.youtube.com/watch?v=8GPinI6VIf8)
[**support.google.com**Assign AppSheet admin privileges to Google Workspace admins](https://support.google.com/appsheet/answer/14368331?hl=en)
[**reddit.com**Online Questions Help You Pass the Associate Google Workspace Administrator Exam](https://www.reddit.com/r/Practicequestion/comments/1oi1udc/online_questions_help_you_pass_the_associate/)
[**knowledge.workspace.google.com**Get started managing groups for an organization - Google Workspace Help](https://knowledge.workspace.google.com/admin/groups/get-started-managing-groups-for-an-organization)
