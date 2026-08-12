export const DIAGRAMS: Record<string, string> = {
    'diag-s3': `flowchart TB
    A["CCNA Automation<br/>旧称: DevNet Associate<br/>試験: 200-901 CCNAAUTO<br/>前提条件なし"] --> B["CCNP Automation<br/>旧称: DevNet Professional<br/>コア試験: 350-901 AUTOCOR<br/>+ コンセントレーション試験1科目"]
    B --> C["CCIE Automation<br/>旧称: DevNet Expert<br/>筆記試験 + ラボ試験"]`,

    'diag-s5': `pie title 200-901 CCNAAUTO 出題範囲の比率
    "1.0 ソフトウェア開発と設計" : 15
    "2.0 APIの理解と使用" : 20
    "3.0 シスコプラットフォームと開発" : 15
    "4.0 アプリケーション展開とセキュリティ" : 15
    "5.0 インフラストラクチャと自動化" : 20
    "6.0 ネットワーク基礎" : 15`,

    'diag-s6-2': `sequenceDiagram
    participant Dev as 開発者のPythonスクリプト
    participant API as シスコプラットフォームAPI
    Dev->>API: GET /devices（認証トークン付きリクエスト）
    API-->>Dev: 200 OK + JSON形式のデバイス一覧
    Dev->>API: POST /webhooks（Webhook登録）
    API-->>Dev: 201 Created`,

    'diag-s9': `flowchart TB
    S1["Step1: 前提知識を確認する<br/>ネットワーク基礎 + Python基礎"] --> S2["Step2: 公式教材で学習する<br/>DEVASC/CCNAAUTOコース、Cisco U."]
    S2 --> S3["Step3: ハンズオンで演習する<br/>Cisco DevNet Sandboxで実際にAPIを操作"]
    S3 --> S4["Step4: 模擬試験で実力を確認する"]
    S4 --> S5{"合格ラインに<br/>到達したか？"}
    S5 -->|"はい"| S6["Step5: Pearson VUEで受験予約"]
    S5 -->|"いいえ"| S2
    S6 --> S7["Step6: 試験当日、受験する"]
    S7 --> S8{"結果は？"}
    S8 -->|"合格"| S9["認定取得！<br/>3年間有効"]
    S8 -->|"不合格"| S10["5日間の待機後に<br/>再受験可能"]
    S10 --> S2`,
};
