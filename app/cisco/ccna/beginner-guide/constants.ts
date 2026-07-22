export const DIAGRAMS: Record<string, string> = {
    m1: `flowchart LR
    A["ネットワーク未経験<br/>または初学者"] --> B["CCNA学習<br/>（基礎〜応用）"]
    B --> C["200-301 CCNA<br/>試験に合格"]
    C --> D["CCNA認定<br/>取得（3年間有効）"]
    D --> E["キャリアの選択肢が拡大<br/>（CCNP等の上位資格へ）"]`,

    m2: `flowchart TD
    L1["エントリー<br/>(Cisco Certified Support Technician など)"] --> L2
    L2["アソシエイト<br/>★ CCNA はここ ★"] --> L3["プロフェッショナル<br/>(CCNP など)"]
    L3 --> L4["エキスパート<br/>(CCIE など)"]
    L4 --> L5["アーキテクト<br/>(CCAr)"]`,

    m3: `pie showData
    title CCNA 200-301 出題比率（v1.1）
    "1.0 ネットワークの基礎 (20%)" : 20
    "2.0 ネットワークアクセス (20%)" : 20
    "3.0 IP接続 (25%)" : 25
    "4.0 IPサービス (10%)" : 10
    "5.0 セキュリティの基礎 (15%)" : 15
    "6.0 自動化とプログラマビリティ (10%)" : 10`,

    m4: `flowchart TD
    S1["ステップ1：自己評価<br/>試験内容を確認し、<br/>重点分野と学習計画を決める"]
    S2["ステップ2：学習とトレーニング<br/>Eラーニング／クラスルーム／<br/>デジタル学習など自分に合う方法を選ぶ"]
    S3["ステップ3：コミュニティに参加する<br/>Cisco Learning Networkに登録し、<br/>情報交換・質問を行う"]
    S4["ステップ4：演習する<br/>Cisco Learning Labs・<br/>Cisco Modeling Labs・Packet Tracerで実践"]
    S5["ステップ5：評価する<br/>公式の試験準備確認ツールで<br/>実力を確認する"]
    S6["ステップ6：テストを予約する<br/>Pearson VUEでオンライン<br/>または会場受験を予約"]
    S7["ステップ7：認定を受ける<br/>Certification Tracking System で<br/>ステータス確認・デジタルバッジ取得"]
    S8["ステップ8：再認定<br/>3年ごとに再受験、または<br/>生涯学習クレジットで更新"]

    S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8`,

    m5: `flowchart LR
    A["事前予約<br/>(Pearson VUE)"] --> B["受験形式を選択<br/>会場 or オンライン監督(OnVUE)"]
    B --> C["本人確認<br/>(身分証明書の提示)"]
    C --> D["試験開始<br/>120分・CBT形式"]
    D --> E["各ドメインから出題<br/>単一選択/複数選択/<br/>D&D/シミュレーション"]
    E --> F["試験終了"]
    F --> G["その場でスコアレポート<br/>(合否がすぐわかる)"]
    G --> H["合格の場合：<br/>Certification Tracking System<br/>でステータス更新・<br/>デジタルバッジ申請"]`,
};
