export const DIAGRAMS: Record<string, string> = {
    'diag-0': `flowchart TB
Start(["学習スタート"]) --> S0["Step 0<br/>APIとは何か"]
S0 --> S1["Step 1（2.8）<br/>API方式の比較"]
S1 --> S2["Step 2（2.1）<br/>REST APIリクエストの構築"]
S2 --> S3["Step 3（2.6）<br/>HTTPレスポンスの読み解き"]
S3 --> S4["Step 4（2.4）<br/>HTTPステータスコード"]
S4 --> S5["Step 5（2.7）<br/>API認証方式"]
S5 --> S6["Step 6（2.3）<br/>APIの制約"]
S6 --> S7["Step 7（2.2）<br/>Webhookの活用"]
S7 --> S8["Step 8（2.5）<br/>トラブルシューティング"]
S8 --> S9["Step 9（2.9）<br/>Pythonでの実装"]
S9 --> Goal(["ドメイン2.0 習得完了"])`,

    'diag-1': `flowchart TB
subgraph Sync["同期（Synchronous）"]
A1["リクエスト送信"] --> A2["処理完了までクライアントが待機"]
A2 --> A3["レスポンスを受信して次の処理へ"]
end
subgraph Async["非同期（Asynchronous）"]
B1["リクエスト送信"] --> B2["すぐにジョブID/受付IDだけを受信"]
B2 --> B3["別途ポーリングまたはWebhookで完了結果を取得"]
end`,

    'diag-2': `flowchart TB
subgraph Request["HTTPリクエストの4要素"]
direction TB
M["① メソッド<br/>GET / POST / PUT / PATCH / DELETE"]
U["② URL（エンドポイント）<br/>どのリソースを操作するか"]
H["③ ヘッダー<br/>認証情報・データ形式など"]
B["④ ボディ<br/>送信するデータ（主にJSON）"]
end
Request --> Server[("APIサーバー")]
Server --> Response["HTTPレスポンス"]`,

    'diag-3': `flowchart TB
Resp["HTTPレスポンス"] --> R1["① ステータスライン<br/>例: HTTP/1.1 200 OK"]
Resp --> R2["② ヘッダー<br/>例: Content-Type, Retry-After"]
Resp --> R3["③ ボディ<br/>例: JSON形式のデータ"]`,

    'diag-4': `flowchart TB
Code["HTTPステータスコード"] --> C1["1xx: 情報レスポンス"]
Code --> C2["2xx: 成功"]
Code --> C3["3xx: リダイレクト"]
Code --> C4["4xx: クライアント側エラー"]
Code --> C5["5xx: サーバー側エラー"]`,

    'diag-5': `sequenceDiagram
participant Client as クライアント（自作スクリプト）
participant API as APIサーバー
Client->>API: リクエスト + Authorizationヘッダー
API->>API: 認証情報を検証
alt 認証成功
API-->>Client: 200 OK + データ本体（JSON）
else 認証失敗
API-->>Client: 401 Unauthorized
end`,

    'diag-6': `flowchart TB
Req["APIリクエスト送信"] --> Check{"レスポンスは<br/>429 Too Many Requests?"}
Check -- いいえ --> Done["正常終了・データ取得"]
Check -- はい --> Wait["Retry-Afterヘッダーに従い待機（秒数またはHTTP-date）"]
Wait --> Backoff["指数バックオフで再試行回数を管理"]
Backoff --> Req`,

    'diag-7': `flowchart TB
subgraph Polling["ポーリング方式"]
P1["一定間隔でAPIに問い合わせる"] --> P2["毎回、変化の有無を確認する"]
P2 --> P1
end
subgraph Webhook["Webhook方式"]
W1["イベントが発生する"] --> W2["サーバー側から登録済みURLへ自動でHTTP POST"]
W2 --> W3["アプリ側は受信して処理するだけ"]
end`,

    'diag-8': `flowchart TB
Err["エラーが発生した"] --> Q1{"ステータスコードは？"}
Q1 -- 400 --> R1["リクエストの構文・必須パラメータを<br/>ドキュメントと照合する"]
Q1 -- 401 --> R2["認証情報（トークン/APIキー）の<br/>有効性・記載場所を確認する"]
Q1 -- 403 --> R3["権限（スコープ）がドキュメント通りか確認する"]
Q1 -- 404 --> R4["URL・エンドポイント・IDの綴りを見直す"]
Q1 -- 429 --> R5["レート制限。Retry-Afterに従い待機・再試行"]
Q1 -- "5xx" --> R6["サーバー側の問題。時間をおいて再試行、<br/>解消しなければサポートへ連絡"]`,
};
