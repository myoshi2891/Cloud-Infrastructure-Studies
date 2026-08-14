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
    | 'diag-10';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
    S4["Section 4<br/>セキュリティポリシーとアクセス制御<br/>(試験全体の約20%)"]
    S4 --> T41["4.1 ユーザーアクセスの保護<br/>パスワード / 2SV / CAA / 管理者ロール / セッション制御"]
    S4 --> T42["4.2 レポート・監査・調査<br/>監査ログ / セキュリティセンター / 健全性ページ / アクティビティルール"]
    S4 --> T43["4.3 追加アプリの有効化<br/>Marketplace / API制御 / SSO / 追加サービス / 接続解除"]

    T41 --> T41a["認証を強くする"]
    T42 --> T42a["異常を発見する"]
    T43 --> T43a["外部連携を統制する"]

    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    classDef lightBlueFill fill:#e8f0fe,color:#0b1220,stroke:#1a73e8;
    class S4 blueFill
    class T41,T42,T43 lightBlueFill`,

    'diag-2': `flowchart TD
    A["管理者が2SVを展開する"] --> B["Step1: ユーザーへ周知<br/>目的・任意/必須・期限・推奨方式"]
    B --> C["Step2: ユーザーに2SV有効化を許可<br/>Security > Authentication > 2-step verification"]
    C --> D["Step3: ユーザーが方式を登録<br/>Authenticatorアプリ / SMS・音声 / パスキー・セキュリティキー"]
    D --> E["Step4: レポートで登録状況を追跡<br/>Reporting > User Reports > Security"]
    E --> F{"登録率は<br/>十分に高いか?"}
    F -- "いいえ:猶予期間を延長" --> D
    F -- "はい" --> G["Step5: 強制(Enforcement)を有効化"]
    G --> H{"強制方式を選択"}
    H --> H1["Any:全方式を許可"]
    H --> H2["Any except SMS/音声:<br/>電話認証のみ不可"]
    H --> H3["Only security key:<br/>セキュリティキー/パスキー限定"]
    H3 --> I["紛失時に備え<br/>バックアップコード猶予期間を設定"]`,

    'diag-3': `flowchart TD
    Start["ユーザー認証方式を確認"] --> Q1{"サードパーティIdPで<br/>SSOを使用しているか?"}
    Q1 -- "はい (SAML)" --> W1["パスワードポリシーの強制はOFFにする"]
    W1 --> W2["次回サインイン時の<br/>パスワード変更要求も無効化"]
    W2 --> W3["理由: SAML SSO利用時は<br/>パスワードポリシーが誤って適用される<br/>既知の問題があるため"]
    Q1 -- "はい (OIDC)" --> X1["パスワードポリシーは<br/>そもそも適用されない"]
    Q1 -- "いいえ (Googleパスワードのみ)" --> Y1["強力なパスワードを強制"]
    Y1 --> Y2["長さ 8〜100文字を設定"]
    Y2 --> Y3["次回サインイン時の変更を要求(任意)"]
    Y3 --> Y4["有効期限は既定でOFF<br/>(強制するとブラウザ経由のみに適用)"]
    Y4 --> Y5["パスワード強度レポートで監視<br/>Reporting > User Reports > Accounts"]

    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    classDef lightRedFill fill:#fce8e6,color:#0b1220,stroke:#d93025;
    classDef lightGreenFill fill:#e6f4ea,color:#0b1220,stroke:#188038;
    class Q1 blueFill
    class W3 lightRedFill
    class Y5 lightGreenFill`,

    'diag-4': `flowchart TD
    U["ユーザーがGoogleサービス/アプリへアクセス試行"] --> L1["アクセスレベルの条件を評価"]
    L1 --> C1{"デバイスは<br/>組織のポリシーに準拠?"}
    C1 -- "非準拠" --> BLOCK1["アクセスを拒否<br/>(または改善メッセージを表示)"]
    C1 -- "準拠" --> C2{"IPアドレスは<br/>許可された範囲内?"}
    C2 -- "範囲外" --> BLOCK2["アクセスを拒否"]
    C2 -- "範囲内" --> C3{"管理対象の<br/>Chromeブラウザか?"}
    C3 -- "いいえ(必須の場合)" --> BLOCK3["アクセスを拒否"]
    C3 -- "はい" --> C4{"企業証明書を<br/>保持しているか?"}
    C4 -- "いいえ(必須の場合)" --> BLOCK4["アクセスを拒否"]
    C4 -- "はい" --> ALLOW["アクセスを許可"]`,

    'diag-5': `flowchart TD
    Start["委任したい管理タスクは?"] --> Q1{"組織のすべてを<br/>管理する必要があるか?"}
    Q1 -- "はい" --> SA["Super Admin<br/>全機能・他の管理者の管理・SAML IdP設定"]
    Q1 -- "いいえ" --> Q2{"タスクの種類は?"}
    Q2 -- "グループの作成・管理" --> GA["Groups Admin<br/>(Groups Reader / Groups Editorに細分化可)"]
    Q2 -- "一般ユーザーの作成・削除・PW管理" --> UMA["User Management Admin<br/>(管理者以外のユーザーのみ対象)"]
    Q2 -- "PWリセットのみの一次窓口" --> HDA["Help Desk Admin<br/>(管理者以外のPWリセットに限定)"]
    Q2 -- "Gmail/Drive等サービス設定・端末管理" --> SVA["Services Admin"]
    Q2 -- "モバイル端末の管理のみ" --> MA["Mobile Admin"]
    Q2 -- "ストレージ使用量の管理のみ" --> STA["Storage Admin"]
    Q2 -- "上記のいずれにも合致しない" --> CUSTOM["カスタム管理者ロールを作成<br/>特定組織単位(OU)に限定も可能"]

    classDef redFill fill:#d93025,color:#ffffff,stroke:#a52714;
    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    class SA redFill
    class CUSTOM blueFill`,

    'diag-6': `flowchart TD
    A["Google Session Controlで<br/>Webセッション長を設定"] --> B{"サードパーティIdPで<br/>SSOを利用しているか?"}
    B -- "いいえ" --> C["設定したセッション長で<br/>Googleへの再サインインを要求"]
    B -- "はい" --> D["IdP側のセッション有効期限を<br/>Googleセッションより短く設定する"]
    D --> E{"IdPセッションは<br/>Googleセッション満了時に有効か?"}
    E -- "有効(短く設定できていない)" --> F["ユーザー操作なしに<br/>Googleセッションが自動更新されうる<br/>(意図しない長時間セッション)"]
    E -- "無効(正しく短く設定)" --> G["ユーザーは再度<br/>IdP経由でのサインインを要求される"]
    C --> H["Admin ConsoleのAdmin自身の<br/>セッションは1時間固定・変更不可"]

    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    classDef lightRedFill fill:#fce8e6,color:#0b1220,stroke:#d93025;
    classDef lightGreenFill fill:#e6f4ea,color:#0b1220,stroke:#188038;
    class A blueFill
    class F lightRedFill
    class G lightGreenFill`,

    'diag-7': `flowchart LR
    SC["セキュリティセンター<br/>Security Center"]
    SC --> D1["セキュリティダッシュボード<br/>複数レポートの俯瞰<br/>(15分ごとに更新)"]
    SC --> D2["調査ツール<br/>Investigation Tool<br/>デバイス/Gmail/Drive等のログを<br/>検索・特定・是正アクションを実行"]
    SC --> D3["セキュリティ健全性ページ<br/>Security Health<br/>Admin Console設定の状態を<br/>一元的に監視"]

    D1 --> D1a["エディションにより<br/>表示レポートが異なる"]
    D2 --> D2a["Gmailメッセージの削除・<br/>迷惑メール登録・会議終了等の<br/>是正アクションが可能"]
    D3 --> D3a["自動転送・端末暗号化・<br/>Drive共有設定等をチェック"]

    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    classDef lightBlueFill fill:#e8f0fe,color:#0b1220,stroke:#1a73e8;
    class SC blueFill
    class D1,D2,D3 lightBlueFill`,

    'diag-8': `flowchart TD
    A["データソースを選択<br/>(例: Gmailログイベント)"] --> B["条件(Condition)を定義<br/>Event属性は必須 / AND・ORで絞り込み"]
    B --> C{"通知/アクションの<br/>タイミングは?"}
    C -- "毎回" --> D["イベント発生の都度<br/>通知・アクションを実行"]
    C -- "しきい値方式" --> E["例: 1時間以内に<br/>5回以上のサインイン失敗"]
    E --> F{"しきい値を<br/>超えたか?"}
    F -- "いいえ" --> WAIT["監視を継続<br/>(通知は送信しない)"]
    F -- "はい" --> G["アクションを実行<br/>例: ユーザーを一時停止/PW変更を強制"]
    D --> H["通知を送信"]
    G --> H
    H --> H1["アラートセンターへ通知<br/>(推奨)"]
    H --> H2["Eメール通知<br/>全スーパー管理者 or 指定した管理者"]

    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    classDef redFill fill:#d93025,color:#ffffff,stroke:#a52714;
    classDef grayFill fill:#f1f3f4,color:#0b1220,stroke:#5f6368;
    class A blueFill
    class G redFill
    class WAIT grayFill`,

    'diag-9': `flowchart TD
    A["ユーザーがGoogleアカウントで<br/>アプリにサインインを試行"] --> B{"そのアプリは<br/>API Controlsで<br/>設定済みか?"}
    B -- "未設定<br/>(Unconfigured)" --> C{"未設定アプリの<br/>既定ポリシーは?"}
    C -- "任意のアプリを許可" --> ALLOW1["サインインを許可<br/>制限なしにデータへアクセス可"]
    C -- "基本プロフィールのみ許可" --> ALLOW2["氏名・メール・写真のみ<br/>取得可能なアプリは許可"]
    C -- "すべて禁止" --> DENY1["ブロックし<br/>アクセスリクエストを促す"]
    B -- "設定済み" --> D{"アクセスレベルは?"}
    D -- "Trusted" --> ALLOW3["制限付きサービスも含め<br/>全スコープにアクセス可"]
    D -- "Specific Google data" --> ALLOW4["管理者が指定した<br/>スコープのみアクセス可"]
    D -- "Limited" --> ALLOW5["制限なしサービスのみ<br/>アクセス可"]
    D -- "Blocked" --> DENY2["いかなるGoogleデータにも<br/>アクセス不可"]

    classDef blueFill fill:#1a73e8,color:#ffffff,stroke:#174ea6;
    classDef greenFill fill:#188038,color:#ffffff,stroke:#0f5c24;
    classDef redFill fill:#d93025,color:#ffffff,stroke:#a52714;
    class A blueFill
    class ALLOW3 greenFill
    class DENY1,DENY2 redFill`,

    'diag-10': `sequenceDiagram
    participant User as ユーザー
    participant Google as Google (Service Provider)
    participant IdP as サードパーティIdP<br/>(Okta / Entra ID等)

    User->>Google: Googleアプリ(Gmail等)へアクセス
    Google->>Google: SAML認証リクエストを生成
    Google-->>User: IdPのSSO URLへリダイレクト<br/>(RelayStateにアプリURLを埋込)
    User->>IdP: SSO URLへアクセス
    IdP->>User: 認証情報の入力を要求
    User->>IdP: 資格情報を送信
    IdP->>IdP: ユーザーを認証
    IdP-->>User: SAMLレスポンス(署名済み)を返却
    User->>Google: SAMLレスポンスをPOST
    Google->>Google: 証明書でレスポンスを検証
    Google-->>User: 元のGoogleアプリへリダイレクト<br/>(サインイン完了)`,
};
