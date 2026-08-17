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
    'diag-1': `graph TD
    A["Section 3<br/>データガバナンスと<br/>コンプライアンス管理<br/>(試験配分 約15%)"] --> B["3.1 Google Vault<br/>eDiscovery・データ保持"]
    A --> C["3.2 DLP<br/>データ損失防止ルール"]
    A --> D["3.3 Drive信頼ルール<br/>共有制御"]
    A --> E["3.4 データの保存と<br/>エクスポート"]
    A --> F["3.5 データの分類<br/>分類ラベル"]
    B --> B1["保持ルール・holds<br/>検索・エクスポート"]
    C --> C1["Gmail / Drive / Chat<br/>コンテンツ検出"]
    D --> D1["OU・ドメイン・<br/>ユーザー単位の制御"]
    E --> E1["Takeout・Data Export Tool<br/>データリージョン"]
    F --> F1["手動・デフォルト・<br/>DLP・AI分類"]`,

    'diag-2': `flowchart TD
    Start(["ユーザーが組織を離れる"]) --> Q1{"データを保持・検索<br/>する必要があるか？"}
    Q1 -->|"いいえ"| Delete["アカウントを削除<br/>(データは完全に消去される)"]
    Q1 -->|"はい"| Q2{"即座に全サービスへの<br/>アクセスを止める必要があるか？"}
    Q2 -->|"はい"| Archive["Archived User(AU)ライセンスを付与<br/>サインイン不可・データはVault対象のまま"]
    Q2 -->|"一時的な猶予でよい"| Suspend["アカウントを一時停止<br/>(通常課金は継続)"]
    Suspend --> Archive2["猶予後にAUライセンスへ切替"]
    Delete --> End(["処理完了"])
    Archive --> End
    Archive2 --> End`,

    'diag-3': `flowchart TD
    Start(["ユーザーのデータに対する<br/>保持判定が必要"]) --> Q1{"Holdが<br/>設定されているか？"}
    Q1 -->|"はい"| Hold["Holdを適用<br/>無期限に保持<br/>(他のルールより優先)"]
    Q1 -->|"いいえ"| Q2{"カスタム保持ルールが<br/>該当するか？"}
    Q2 -->|"はい"| Custom["カスタムルールを適用<br/>(サービス・OU・条件単位)"]
    Q2 -->|"いいえ"| Q3{"デフォルト保持ルールが<br/>設定されているか？"}
    Q3 -->|"はい"| Default["デフォルトルールを適用<br/>(サービス単位のグローバル既定)"]
    Q3 -->|"いいえ"| None["保持ルールなし<br/>ユーザー削除・サービスの<br/>標準削除処理に従う"]
    Hold --> End(["保持結果が確定"])
    Custom --> End
    Default --> End
    None --> End`,

    'diag-4': `stateDiagram-v2
    [*] --> Active: ユーザー作成
    Active --> Suspended: 一時停止
    Active --> Archived: 退職者対応(AUライセンス付与)
    Suspended --> Archived: AUライセンス付与
    Suspended --> Active: 復元
    Archived --> Active: ライセンス再割当て・復元
    Active --> Deleted: 削除
    Suspended --> Deleted: 削除
    Archived --> Deleted: 削除
    Deleted --> Purged: 保持対象外データは標準削除処理へ
    note right of Archived
        Vaultライセンスが有効な限り
        検索・hold・保持ルールの対象
    end note
    note right of Deleted
        Vaultライセンスも失効し
        検索・エクスポート不可
    end note`,

    'diag-5': `flowchart TD
    A(["データ保護ルールの<br/>作成を開始"]) --> B["対象アプリを選択<br/>Gmail / Drive / Chat / Calendar / Chrome"]
    B --> C["トリガーを選択<br/>(送信・受信・アップロード・作成など)"]
    C --> D{"検出方法を選択"}
    D -->|"定義済み検出器"| E["クレジットカード番号・<br/>個人情報等の<br/>predefined content detector"]
    D -->|"カスタム検出器"| F["正規表現 または<br/>ワードリスト"]
    E --> G["条件を組み合わせ<br/>(AND / OR / NOT)"]
    F --> G
    G --> H{"アクションを選択"}
    H -->|"監査のみ"| I["Audit only<br/>ログ記録のみ・通知なし"]
    H -->|"警告"| J["Warn<br/>送信可能・警告表示"]
    H -->|"隔離"| K["Quarantine<br/>(Gmailのみ)<br/>管理者レビュー待ち"]
    H -->|"ブロック"| L["Block<br/>送信・共有・投稿を禁止"]
    I --> M["カスタム通知<br/>メッセージを設定(任意)"]
    J --> M
    K --> M
    L --> M
    M --> N(["ルールを保存<br/>最大24時間で反映"])`,

    'diag-6': `sequenceDiagram
    participant U as ユーザー
    participant G as Gmail
    participant D as DLPスキャン
    participant R as 受信者
    U->>G: メッセージを送信
    alt Web版・モバイルアプリからの送信
        G->>D: 同期スキャン(送信操作時)
        alt Blockアクション
            D-->>G: 違反を検出
            G->>U: 送信をブロックし警告(Back to editing)
        else Quarantineアクション
            D-->>G: 違反を検出
            G->>G: 管理者レビュー用に隔離
            G->>U: 隔離された旨を通知
        else Warn usersアクション
            D-->>G: 違反を検出
            G->>U: 警告を表示(ユーザー判断で送信を続行可)
        else Audit onlyアクション
            D-->>G: 違反を検出
            G->>G: Rule log eventsに記録(送信は継続)
        end
    else 第三者SMTPクライアント・自動送信・同期スキャン失敗
        Note over U,G: 同期スキャンは行われない
    end
    G->>D: 非同期スキャン(メールボックス離脱後・配信前)
    Note over G,D: 同期スキャンで違反がなかったメッセージも追加保護として再スキャン
    alt Blockアクション
        D-->>G: 違反を検出
        G->>G: 配信をブロック<br/>(メッセージは送信済みフォルダに残る)
        G->>U: 別メールで送信者に通知
    else Quarantineアクション
        D-->>G: 違反を検出
        G->>G: 管理者レビュー用に隔離
        G->>U: 通知は隔離設定またはレビュー結果次第
    else Warn usersアクション - 第三者SMTPクライアント
        D-->>G: 違反を検出
        G->>G: Block message相当として配信をブロック<br/>(メッセージは送信済みフォルダに残る)
        G->>U: 別メールで送信者に通知
    else Warn usersアクション - 自動送信
        D-->>G: 違反を検出
        G->>R: 警告を表示できないため配信は継続<br/>(メッセージは送信済みフォルダに残る)
        G->>G: Rule log eventsに記録
    else Warn usersアクション - Web・モバイル送信の再スキャン
        D-->>G: 違反を検出
        G->>R: 配信は継続<br/>(メッセージは送信済みフォルダに残る)
        G->>G: Rule log eventsに記録
    else Audit onlyアクション
        D-->>G: 違反を検出
        G->>G: Rule log eventsに記録
        G->>R: 配信は継続(通知なし)
    else 違反なし
        D-->>G: 違反なし
        G->>R: メッセージを配信
    end`,

    'diag-7': `flowchart TD
    A(["ユーザーがファイルを<br/>外部と共有しようとする"]) --> B{"共有をブロックする<br/>trust ruleに該当するか？"}
    B -->|"はい"| C["共有をブロック<br/>(visitor・unmanagedアカウントにも適用)"]
    B -->|"いいえ"| D{"共有を許可する<br/>trust ruleに該当するか？"}
    D -->|"はい"| E{"相手はvisitor/<br/>ゲストアカウントか？"}
    E -->|"はい"| F{"ルールでvisitor<br/>を含める設定が有効か？"}
    F -->|"はい"| G["共有を許可"]
    F -->|"いいえ"| C
    E -->|"いいえ"| G
    D -->|"いいえ"| H["Drive共有設定の<br/>既定値に従う<br/>(内部限定/許可リストドメイン等)"]
    C --> End(["結果確定"])
    G --> End
    H --> End`,

    'diag-8': `flowchart TD
    Start(["組織のデータを<br/>取得・保存したい"]) --> Q1{"目的は?"}
    Q1 -->|"訴訟・調査対応<br/>(eDiscovery)"| Vault["Google Vaultで検索・<br/>エクスポート(3.1参照)"]
    Q1 -->|"ユーザー個人の<br/>セルフサービス<br/>データダウンロード"| Takeout["Google Takeout<br/>(サービス単位でON/OFF)"]
    Q1 -->|"組織全体の<br/>一括バックアップ・移行"| DET["Data Export Tool<br/>(スーパー管理者が実行)"]
    DET --> Q2{"データ保存先の<br/>要件は?"}
    Q2 -->|"Google提供の<br/>一時バケット"| GCS1["デフォルトのGCS<br/>バケットにエクスポート"]
    Q2 -->|"自社所有の<br/>リージョン指定バケット"| GCS2["Assured Controls<br/>Local Data Storageで<br/>自社GCSバケットを指定"]
    Vault --> End(["エクスポート完了"])
    Takeout --> End
    GCS1 --> End
    GCS2 --> End`,

    'diag-9': `flowchart TD
    A["データリージョン設定"] --> B{"エディションは?"}
    B -->|"Business Standard/Plus,<br/>Enterprise Standard,<br/>Frontline等"| C["Fundamentalデータ<br/>リージョン"]
    B -->|"Education Standard/Plus"| EDU["Data regions for Education"]
    B -->|"Enterprise Plus,<br/>Frontline Plus,<br/>Enterprise Essentials Plus"| D["Enterpriseデータ<br/>リージョン"]
    C --> C1["組織全体で1リージョンのみ<br/>選択可(米国 or 欧州)"]
    D --> D1["OU・グループ単位で<br/>複数リージョンを<br/>使い分け可能"]
    D --> D2["データ処理リージョンも<br/>個別に指定可能"]
    EDU --> EDU1["OU・設定グループ単位で<br/>保存リージョンを指定可能"]
    EDU --> EDU2["データ処理リージョン<br/>ポリシーは対象外"]
    C1 --> E["対象: Gmail, Calendar,<br/>Drive, Chat, Docs等の<br/>保存時データ"]
    D1 --> E
    EDU1 --> E
    D2 --> P["対象: データ処理リージョン<br/>(処理中データの実行場所)"]`,

    'diag-10': `flowchart TD
    A(["Driveファイル/Gmailメッセージに<br/>分類ラベルを適用したい"]) --> B{"適用方法は?"}
    B -->|"手動"| C["編集権限を持つ<br/>ユーザーが手動で適用"]
    B -->|"作成時に自動"| D["Default classification<br/>(OU・グループ単位で<br/>既定ラベルを自動付与)"]
    B -->|"内容に基づき自動"| E["DLPルールの<br/>アクションとしてラベル付与<br/>(新規・既存ファイル対象)"]
    B -->|"AIによる自動"| F{"モデルの種類は?"}
    F -->|"カスタムモデル"| G["組織データで学習した<br/>専用モデルで分類<br/>(学習期間が必要)"]
    F -->|"Gemini"| H["Geminiに自然言語の<br/>指示を与えて分類"]
    C --> End(["ラベルが適用される<br/>(最大150ラベル/組織)"])
    D --> End
    E --> End
    G --> End
    H --> End`,
};
