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
    'diag-1': `flowchart TB
    S5["Section 5<br/>ブラウザとエンドポイントの管理<br/>出題比率 約10%"]
    S5 --> T1["5.1 モバイルデバイスの管理"]
    S5 --> T2["5.2 Chromeブラウザの管理"]

    T1 --> T1a["管理方式の選択<br/>基本 / 高度 / サードパーティ"]
    T1 --> T1b["セキュリティポリシーの適用"]
    T1 --> T1c["登録済みデバイスの可視性と制御"]
    T1 --> T1d["退職者デバイスのオフボーディング"]

    T2 --> T2a["ブラウザポリシーの適用<br/>オフラインアクセス・更新ポリシー"]
    T2 --> T2b["ブラウザの登録<br/>Chrome Enterprise Core"]
    T2 --> T2c["拡張機能とアプリの管理<br/>OU・グループ単位"]

    classDef sectionFill fill:#4285f4,color:#ffffff
    classDef taskFill fill:#e8f0fe,color:#0b1220
    classDef itemFill fill:#f9ab00,color:#000000
    class S5 sectionFill
    class T1,T2 taskFill
    class T1a,T1b,T1c,T1d,T2a,T2b,T2c itemFill`,

    'diag-2': `flowchart TD
    Start["組織のモバイルデバイス管理方針を検討"] --> Q1{"画面ロック・パスコード適用と<br/>リモートアカウントワイプで<br/>要件を満たせるか?"}
    Q1 -->|"満たせる"| Basic["基本モバイル管理<br/>エージェント不要・即時利用可"]
    Q1 -->|"満たせない"| Q2{"アプリ管理・デバイス監査・<br/>強力なパスコード適用など<br/>高度な制御が必要か?"}
    Q2 -->|"必要"| Q3{"Google純正機能の範囲で<br/>十分か?"}
    Q2 -->|"不要"| Basic
    Q3 -->|"十分"| Advanced["高度モバイル管理<br/>デバイスポリシーアプリの導入が必要"]
    Q3 -->|"不十分<br/>UEM/脅威対策製品を既に運用中"| ThirdParty["サードパーティ管理<br/>BeyondCorp Alliance連携<br/>Check Point / CrowdStrike / Jamf /<br/>Lookout / Microsoft Intune / Omnissa"]

    Basic --> End1["Devices > Mobile & endpoints ><br/>Settings > Universal で設定"]
    Advanced --> End1
    ThirdParty --> End2["基本/高度管理を前提に<br/>Third-party integrations で接続"]

    classDef startFill fill:#4285f4,color:#ffffff
    classDef qFill fill:#f9ab00,color:#000000
    classDef resultFill fill:#34a853,color:#ffffff
    class Start startFill
    class Q1,Q2,Q3 qFill
    class Basic,Advanced,ThirdParty,End1,End2 resultFill`,

    'diag-3': `flowchart LR
    subgraph Sources["デバイス情報の収集経路"]
        Mobile["基本/高度モバイル管理<br/>Android・iOS"]
        EV["エンドポイント検証<br/>Endpoint Verification<br/>ChromeOS・Chromeブラウザ搭載PC"]
        CBCM["Chrome Enterprise Core<br/>登録済みブラウザ"]
        Partner["BeyondCorp Alliance<br/>サードパーティ製品"]
    end

    Sources --> Inventory["Devices > Overview ><br/>Endpoints 一覧<br/>会社所有 / BYOD を統合表示"]
    Inventory --> Owner{"所有区分"}
    Owner -->|"会社所有"| Company["Company-owned devices<br/>インベントリへ登録・一括管理"]
    Owner -->|"BYOD"| Personal["個人所有デバイス<br/>ワークプロファイル等で業務データを分離"]

    Inventory --> CAA["Context-Aware Access の<br/>アクセスレベル条件として活用"]

    classDef sourceFill fill:#e8f0fe,color:#0b1220
    classDef mainFill fill:#4285f4,color:#ffffff
    classDef qFill fill:#f9ab00,color:#000000
    classDef resultFill fill:#34a853,color:#ffffff
    class Mobile,EV,CBCM,Partner sourceFill
    class Inventory mainFill
    class Owner qFill
    class Company,Personal,CAA resultFill`,

    'diag-4': `flowchart TD
    A["ユーザーが仕事用/学校アカウントを<br/>デバイスに追加"] --> B{"管理者承認<br/>Require admin approval<br/>が有効か?"}
    B -->|"無効"| C["自動的に承認され<br/>仕事用データにアクセス可能"]
    B -->|"有効"| D{"自動承認の対象デバイスか?"}
    D -->|"シリアル番号登録済みの<br/>会社所有デバイス"| C
    D -->|"該当なし"| E["承認待ち Pending approval<br/>としてデバイス一覧に表示"]
    E --> F["管理者に通知メールが送信される"]
    F --> G{"管理者が確認"}
    G -->|"承認"| H["Approved<br/>仕事用データへのアクセスを許可"]
    G -->|"ブロック"| I["Blocked<br/>アクセスを拒否"]
    H --> J["Context-Aware Access の<br/>条件としてデバイス状態を利用可能"]
    I --> J

    classDef actionFill fill:#4285f4,color:#ffffff
    classDef qFill fill:#f9ab00,color:#000000
    classDef resultFill fill:#34a853,color:#ffffff
    classDef blockFill fill:#ea4335,color:#ffffff
    class A,F actionFill
    class B,D,G qFill
    class C,H,J resultFill
    class E,I blockFill`,

    'diag-5': `flowchart TD
    A["前提: 基本/高度モバイル管理を設定<br/>またはエンドポイント検証を有効化"] --> B["Devices > Mobile & endpoints ><br/>Settings > Third-party integrations"]
    B --> C["Security and MDM partners > Manage"]
    C --> D["対象パートナーの行で<br/>Open connection をクリック"]
    D --> E["パートナー側サイトで<br/>接続処理を完了"]
    E --> F["OUを選択しパートナーの<br/>チェックボックスをオン"]
    F --> G["Save<br/>最大24時間で反映"]
    G --> H["パートナーがデバイス情報を<br/>Googleへ送信"]
    H --> I["Google Cloud Console の<br/>Access Context Manager で<br/>device.vendors 属性を条件に<br/>カスタムアクセスレベルを作成"]
    I --> J["Context-Aware Access レベルを<br/>アプリ・サービスに割り当て"]

    classDef stepFill fill:#4285f4,color:#ffffff
    classDef resultFill fill:#34a853,color:#ffffff
    class A,B,C,D,E,F,G stepFill
    class H,I,J resultFill`,

    'diag-6': `flowchart TD
    A["従業員の退職・デバイス紛失/盗難が発生"] --> B{"デバイスの所有区分"}
    B -->|"会社所有デバイス<br/>または紛失/盗難"| C["デバイスをワイプ<br/>Wipe a device"]
    B -->|"個人所有デバイス<br/>かつ退職のみ"| D["アカウントをワイプ<br/>Wipe an account"]

    C --> C1["ワークプロファイルのない<br/>Androidとデバイス登録済みiOSは<br/>個人データも含め全データを削除"]
    D --> D1["デバイス上の仕事用データ・<br/>仕事用アプリのみ削除<br/>個人データは保持"]

    C1 --> E{"Androidが<br/>基本管理下<br/>かつ過去に高度管理下だったか?"}
    E -->|"はい かつ Device Ownerモード"| F["アカウントではなく<br/>デバイスのみワイプ可能"]
    E -->|"いいえ"| G["通常どおりワイプ実行"]

    D1 --> H["管理対象Googleアカウントから<br/>サインアウト<br/>サインインCookieをリセット"]
    F --> H
    G --> H

    H --> I["アカウントを保留/アーカイブ/削除<br/>Driveデータの所有権移転"]
    I --> J["デバイス一覧から確認・削除"]

    classDef eventFill fill:#4285f4,color:#ffffff
    classDef qFill fill:#f9ab00,color:#000000
    classDef actionFill fill:#e8f0fe,color:#0b1220
    classDef resultFill fill:#34a853,color:#ffffff
    class A eventFill
    class B,E qFill
    class C,D,C1,D1,F,G actionFill
    class H,I,J resultFill`,

    'diag-7': `flowchart TB
    A["プラットフォームポリシー<br/>Windows GPO / macOS 管理対象プリファレンス /<br/>Linux 管理ツール / ChromeOS管理コンソール<br/>デバイス上の全ユーザーに適用"]
    B["マシンクラウドポリシー<br/>Chrome Enterprise Core 登録済みブラウザ<br/>サインイン不要で適用"]
    C["OSユーザーポリシー<br/>管理対象デバイスで<br/>社内アカウントにサインイン時に適用"]
    D["クラウドユーザーポリシー<br/>Chromeプロファイル<br/>管理対象アカウントでのサインインに紐づく"]

    A -->|"既定では最優先"| B --> C --> D

    D -.-|"Policy precedence設定または<br/>CloudPolicyOverridesPlatformPolicy等で<br/>優先順位を変更可能<br/>(要 Chrome Enterprise Core)"| A

    classDef top fill:#4285f4,color:#ffffff
    classDef mid fill:#34a853,color:#ffffff
    classDef low fill:#f9ab00,color:#000000
    classDef lowest fill:#e8f0fe,color:#0b1220
    class A top
    class B mid
    class C low
    class D lowest`,

    'diag-8': `flowchart TD
    A["Chromeブラウザの更新方針を検討"] --> B{"原則として<br/>自動更新を許可するか?"}
    B -->|"推奨: 許可する"| C["Allow updates<br/>常に最新の安定版を維持し<br/>セキュリティ修正を即時反映"]
    B -->|"特定バージョンに<br/>固定したい"| D["Target version prefix を設定<br/>例: 124.0.6367.<br/>直近3メジャーリリースまで<br/>ロールバック可能"]

    C --> E{"業務時間中の<br/>更新を避けたいか?"}
    E -->|"はい"| F["Schedule auto-updates<br/>outside of work hours<br/>で更新時間帯を制御"]
    E -->|"いいえ"| G["既定の自動更新スケジュールを利用"]

    C --> H{"大規模展開で<br/>同時ダウンロードを<br/>分散したいか?"}
    H -->|"はい"| I["Randomly scatter auto-updates<br/>で更新日数を分散<br/>短い日数を推奨"]

    D --> J["重要: Target version prefixは<br/>定期的に更新しないと<br/>セキュリティ更新が<br/>適用されなくなるリスク"]

    C --> K{"リリースチャンネルを<br/>指定したいか?"}
    K -->|"はい"| L["Stable / Extended stable /<br/>Beta / Dev から選択"]

    classDef startFill fill:#4285f4,color:#ffffff
    classDef qFill fill:#f9ab00,color:#000000
    classDef resultFill fill:#34a853,color:#ffffff
    classDef warnFill fill:#ea4335,color:#ffffff
    class A startFill
    class B,E,H,K qFill
    class C,D,F,G,I,L resultFill
    class J warnFill`,

    'diag-9': `sequenceDiagram
    participant Admin as 管理者
    participant Console as Admin console
    participant Device as 管理対象デバイス
    participant Chrome as Chromeブラウザ

    Admin->>Console: Devices > Chrome > Managed browsers
    Admin->>Console: 対象OUを選択し Enroll をクリック
    Console-->>Admin: 登録トークンを発行
    Admin->>Device: OS別の方法でトークンを配布<br/>Windows: GPO/レジストリ<br/>macOS: 構成プロファイル/テキストファイル<br/>Linux: 設定ファイル
    Admin->>Chrome: ブラウザを再起動
    Chrome->>Console: 登録トークンを用いて<br/>デバイスIDなどを送信
    Console-->>Admin: Managed browsers 一覧に<br/>登録済みブラウザとして表示
    Admin->>Console: Chrome browser reporting を有効化
    Admin->>Console: Devices > Chrome > Settings で<br/>ポリシーをOU/グループに適用
    Console-->>Chrome: ポリシーを配信<br/>数分〜最大24時間で反映`,

    'diag-10': `flowchart TD
    A["対象の拡張機能/アプリについて<br/>OU・グループ単位で方針を決定"] --> B{"全ユーザーに<br/>必須で導入させたいか?"}
    B -->|"はい"| C{"ユーザーに無効化を<br/>許可するか?"}
    C -->|"許可しない"| D["force_installed<br/>強制インストール<br/>ユーザーは無効化・削除不可"]
    C -->|"許可する"| E["normal_installed<br/>自動インストール<br/>ユーザーは無効化可能"]

    B -->|"いいえ"| F{"利用を許可するか?"}
    F -->|"許可"| G["allowed<br/>Chromeウェブストアから<br/>ユーザー自身がインストール可"]
    F -->|"禁止"| H["blocked<br/>インストール不可<br/>任意でブロック時メッセージを表示"]

    D --> I["ExtensionSettings ポリシーで<br/>拡張機能IDごとに設定<br/>ワイルドカード * で既定値も設定可"]
    E --> I
    G --> I
    H --> I

    I --> J["Devices > Chrome ><br/>Apps & extensions で<br/>OU/グループに適用"]

    classDef startFill fill:#4285f4,color:#ffffff
    classDef qFill fill:#f9ab00,color:#000000
    classDef modeFill fill:#34a853,color:#ffffff
    classDef resultFill fill:#e8f0fe,color:#0b1220
    class A startFill
    class B,C,F qFill
    class D,E,G,H modeFill
    class I,J resultFill`,
};
