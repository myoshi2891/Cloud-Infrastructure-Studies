export type DiagramId =
    | 'diag-migration'
    | 'diag-provisioning'
    | 'diag-sso'
    | 'diag-gcds'
    | 'diag-state'
    | 'diag-ou'
    | 'diag-group'
    | 'diag-dynamic'
    | 'diag-domain'
    | 'diag-building';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-migration': `flowchart TD
    Start["移行を計画する"] --> Q1{"移行対象は<br/>メール/カレンダー/連絡先のみか?"}
    Q1 -- "Yes(個人/小規模チーム)" --> Q2{"移行元は?"}
    Q2 -- "IMAP/Gmail/Workspace" --> GWMME["Google Workspace Migration<br/>for Microsoft Outlook (GWMME)"]
    Q2 -- "Exchange/Outlook.com" --> DataMigration["データ移行サービス<br/>(Admin console内蔵)"]
    Q1 -- "No(大規模組織全体)" --> Q3{"対象ユーザー数は?"}
    Q3 -- "1,000人以下" --> DataMigration
    Q3 -- "1,001人以上" --> GWMigrate["Google Workspace Migrate"]
    GWMigrate --> Note["メール/カレンダー/連絡先に加え<br/>Drive・SharePoint等も移行対象に含められる"]`,

    'diag-provisioning': `flowchart LR
    HR["人事システム / IdP<br/>(Okta, Azure AD等)"] -->|"SCIM/自動プロビジョニング"| GWS["Google Workspace<br/>Directory"]
    GWS -->|"属性同期"| Apps["連携先SaaSアプリ<br/>(Slack, Salesforce等)"]
    HR -->|"退職イベント"| Deprov["デプロビジョニング<br/>(アカウント自動停止)"]
    Deprov --> GWS`,

    'diag-sso': `sequenceDiagram
    participant User as ユーザー
    participant Google as Google (Service Provider)
    participant IdP as サードパーティIdP

    User->>Google: Googleアプリ(Gmail等)にアクセス
    Google->>Google: SAML認証リクエストを生成しURLに埋め込む
    Google-->>User: IdPのSSO URLへリダイレクト<br/>(RelayStateにアクセス先を保持)
    User->>IdP: リダイレクトされSSOページへ到達
    IdP->>IdP: ユーザーを認証
    IdP-->>User: SAMLレスポンス(署名付き)をACS URLへPOST
    User->>Google: SAMLレスポンスをAssertion Consumer Service (ACS) へ送信
    Google->>Google: 署名を証明書で検証しRelayStateへリダイレクト
    Google-->>User: 目的のGoogleアプリへアクセス許可`,

    'diag-gcds': `flowchart TD
    LDAP["オンプレミス LDAP /<br/>Active Directory サーバー"] -->|"一方向の読み取り専用同期<br/>(LDAPデータは変更されない)"| GCDS["GCDS<br/>(サーバー環境で実行)"]
    GCDS -->|"ルールに基づき<br/>ユーザー/グループ/連絡先を比較"| List1["エクスポートされたリスト"]
    GCDS -->|"Google Account の情報を<br/>取得し比較"| List2["Google側の現在のリスト"]
    List1 --> Compare["差分を計算し<br/>Google Accountを更新"]
    List2 --> Compare
    Compare --> Report["同期完了後<br/>メールレポートを送信"]`,

    'diag-state': `stateDiagram-v2
    direction LR
    [*] --> Active: アカウント作成
    Active --> Suspended: 一時停止<br/>(不正利用調査・休職等)
    Suspended --> Active: 保留解除
    Active --> Archived: アーカイブ<br/>(ライセンスを維持しつつ低コスト化)
    Archived --> Active: アーカイブ解除
    Active --> Deleted: 削除
    Suspended --> Deleted: 削除
    Deleted --> Active: 復元<br/>(削除から20日以内)
    Deleted --> [*]: 20日経過後は<br/>完全に削除され復元不可`,

    'diag-ou': `flowchart TD
    Root["/(トップレベルOU)<br/>組織全体の既定ポリシー"] --> Dept1["/従業員"]
    Root --> Dept2["/契約社員"]
    Root --> Dept3["/サービスアカウント・共有端末"]
    Dept1 --> Eng["/従業員/エンジニアリング"]
    Dept1 --> Sales["/従業員/営業"]
    Dept1 --> HR["/従業員/人事・法務"]
    Eng --> EngContractor["/従業員/エンジニアリング/一時アクセス"]`,

    'diag-group': `flowchart TD
    Start["グループを作りたい"] --> Q1{"主な目的は?"}
    Q1 -- "全員への一括メール配信のみ" --> DL["配布リスト<br/>(投稿を管理者/特定メンバーに限定)"]
    Q1 -- "support@/info@等の<br/>共有受信箱を運用" --> CI["Collaborative Inbox<br/>(会話の割り当て・ステータス管理)"]
    Q1 -- "部署・属性の変化に応じて<br/>自動的にメンバーを増減したい" --> DG["ダイナミックグループ<br/>(クエリベースの自動メンバー管理)"]
    Q1 -- "機密データやリソースへの<br/>アクセス制御に使う" --> SG["セキュリティグループ<br/>(Securityラベル付与)"]
    Q1 -- "サービス設定を特定ユーザーに<br/>適用/オフにしたい" --> AG["アクセスグループ / 構成グループ"]`,

    'diag-dynamic': `flowchart LR
    Attr["ユーザープロフィール属性<br/>(部署・国コード・カスタム属性等)"] -->|"クエリ条件に合致"| Query["メンバーシップクエリ<br/>(例: user.organizations.exists(...))"]
    Query -->|"自動追加"| DynGroup["ダイナミックグループ"]
    Attr -->|"条件から外れる"| Query
    Query -->|"自動削除"| Removed["メンバーから除外"]
    DynGroup -->|"Securityラベル付与"| SecPolicy["ポリシー自動適用<br/>(構成グループ経由)"]`,

    'diag-domain': `flowchart TD
    Primary["プライマリドメイン<br/>(例: example.com)"] --> Secondary["セカンダリドメイン<br/>(例: example-branch.com)"]
    Secondary -->|"独自のユーザーアカウントを<br/>作成できる"| NewUsers["user@example-branch.com<br/>として新規ユーザー作成"]
    Primary --> Alias["ドメインエイリアス<br/>(例: example-alias.com)"]
    Alias -->|"既存ユーザーに<br/>追加のメールアドレスを付与"| ExistingUsers["user@example.com が<br/>user@example-alias.com でも受信可能"]`,

    'diag-building': `flowchart TD
    Building["建物(Building)<br/>例: 本社ビル、大阪オフィス"] --> Floor1["フロア情報"]
    Building --> Resource1["会議室リソース<br/>(Conference room)"]
    Building --> Resource2["その他リソース<br/>(社用車・備品等)"]
    Resource1 --> Feature1["機能(Features)<br/>例: モニター・ホワイトボード・車椅子対応"]
    Resource2 --> Feature2["機能(Features)<br/>例: カーナビ搭載"]`,
};
