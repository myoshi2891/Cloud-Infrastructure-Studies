export const DIAGRAMS: Record<string, string> = {
    'diag-0': `pie title CCNAAUTO 200-901 出題比率
    "1.0 ソフトウェア開発と設計" : 15
    "2.0 APIの理解と活用" : 20
    "3.0 Ciscoプラットフォームと開発" : 15
    "4.0 アプリケーション導入とセキュリティ" : 15
    "5.0 インフラとオートメーション" : 20
    "6.0 ネットワークの基礎" : 15`,

    'diag-1': `flowchart TB
    ROOT["1.0 ソフトウェア開発と設計<br/>出題比率 15%"]
    ROOT --> N11["1.1 データフォーマットの比較"]
    ROOT --> N12["1.2 データのパース"]
    ROOT --> N13["1.3 テスト駆動開発(TDD)"]
    ROOT --> N14["1.4 開発手法の比較"]
    ROOT --> N15["1.5 コードの構造化"]
    ROOT --> N16["1.6 デザインパターン"]
    ROOT --> N17["1.7 バージョン管理の利点"]
    ROOT --> N18["1.8 Gitの基本操作"]`,

    'diag-2': `flowchart TB
    A["テキストファイル<br/>(XML / JSON / YAML)"] --> B["専用のパーサーライブラリ<br/>(json / yaml / xml.etree.ElementTree)"]
    B --> C["Pythonのデータ構造<br/>(dict / list / str / int / bool)"]
    C --> D["スクリプト内でキー・インデックス指定で自由に操作"]`,

    'diag-3': `flowchart TB
    A["① Red<br/>まだ実装がないので失敗するテストを書く"] --> B["② Green<br/>テストが通る最小限の実装をする"]
    B --> C["③ Refactor<br/>動作を変えずにコードを整理・改善する"]
    C --> A`,

    'diag-4': `flowchart TB
    subgraph WF["Waterfall（直線的に進む）"]
        direction TB
        W1["要件定義"] --> W2["設計"] --> W3["実装"] --> W4["テスト"] --> W5["リリース"]
    end
    subgraph AG["Agile（反復して進む）"]
        direction TB
        A1["計画"] --> A2["設計"] --> A3["実装"] --> A4["テスト"] --> A5["ふりかえり"] --> A1
    end`,

    'diag-5': `flowchart TB
    M["モジュール<br/>(1つの.pyファイル、または複数ファイルをまとめたパッケージ)"] --> C1["クラス: DeviceManager"]
    M --> C2["クラス: ConfigParser"]
    C1 --> F1["メソッド: connect()"]
    C1 --> F2["メソッド: get_status()"]
    C2 --> F3["メソッド: load_yaml()"]`,

    'diag-6': `flowchart TB
    U["ユーザーの操作"] --> Ctrl["Controller<br/>入力を受け取り、何をすべきか判断する"]
    Ctrl --> Mo["Model<br/>データの保持とビジネスロジック"]
    Mo --> V["View<br/>画面・結果の表示"]
    V --> U
    Ctrl --> V`,

    'diag-7': `sequenceDiagram
    participant OA as ObserverA
    participant OB as ObserverB
    participant S as Subject
    OA->>S: 通知してほしいと登録する
    OB->>S: 通知してほしいと登録する
    Note over S: 監視対象の状態が変化した
    S-->>OA: 変化を通知する
    S-->>OB: 変化を通知する`,

    'diag-8': `flowchart TB
    WD["作業ディレクトリ<br/>(Working Directory)"] -- "git add" --> ST["ステージングエリア<br/>(Staging Area)"]
    ST -- "git commit" --> LOCAL["ローカルリポジトリ<br/>(Local Repository)"]
    LOCAL -- "git push" --> REMOTE["リモートリポジトリ<br/>(GitHub など)"]
    REMOTE -- "git pull / git clone" --> WD`,

    'diag-9': `flowchart TB
    M1["main: 初期コミット"] --> M2["main: 新機能の開発を開始"]
    M2 --> B1["feature: 新機能を実装"]
    B1 --> B2["feature: テストを追加"]
    M2 --> M3["main: 別件の修正(hotfix)"]
    M4["main: featureブランチをマージ"]
    M3 --> M4
    B2 --> M4
    M4 --> M5["main: リリース"]`,

    'diag-10': `flowchart TB
    A["git merge を実行"] --> B{"コンフリクトが発生したか"}
    B -- "いいえ" --> F["自動でマージ完了"]
    B -- "はい" --> C["競合箇所を手動で編集して解決"]
    C --> D["git add で解決済みとしてマークする"]
    D --> E["git commit でマージを確定する"]`,

    'diag-11': `flowchart TB
    S1["ネットワーク設定をYAMLファイルで管理する"] --> S2["Pythonスクリプトでパースし、辞書型データに変換する"]
    S2 --> S3["関数・クラス・モジュールとしてコードを整理する"]
    S3 --> S4["TDDでテストを書きながら実装を進める"]
    S4 --> S5["Gitでバージョン管理し、ブランチで安全に作業する"]
    S5 --> S6["チームでレビューし、リモートリポジトリへpushする"]
    S6 --> S7["MVCやObserverパターンを活かした自動化ツールに組み込む"]`,
};
