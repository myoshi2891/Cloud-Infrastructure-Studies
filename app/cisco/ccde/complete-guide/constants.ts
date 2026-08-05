export const DIAGRAMS: Record<string, string> = {
    'diag-1': `flowchart TD
    Pre["実務経験 5〜7年を推奨<br/>（正式な出願資格は無し）"]
    Pre --> Step1["STEP 1<br/>CCDE筆記試験 400-007 v3.1<br/>2時間・90〜110問"]
    Step1 -->|合格| Spec["Cisco Certified Design Expert<br/>Specialist 認定を取得"]
    Spec --> Choice{"実技試験のエレクティブを<br/>1つ選択する"}
    Choice --> E1["AI Infrastructure"]
    Choice --> E2["Large Scale Networks"]
    Choice --> E3["On-Prem and<br/>Cloud Services"]
    Choice --> E4["Workforce Mobility"]
    E1 --> Step2["STEP 2<br/>CCDE実技試験 v3.1<br/>8時間・シナリオベース"]
    E2 --> Step2
    E3 --> Step2
    E4 --> Step2
    Step2 -->|合格| Goal["CCDE認定 取得<br/>＋ 選択したエレクティブの<br/>Specialist認定"]
    Goal --> Recert["3年ごとの再認定<br/>（再試験 または CE単位）"]

    classDef stage fill:#123A57,stroke:#7FB3D5,color:#F5F9FB,stroke-width:1.5px;
    classDef decision fill:#3A2A10,stroke:#E8A33D,color:#FBF1DF,stroke-width:2px;
    classDef goal fill:#123A57,stroke:#3F8E76,color:#F5F9FB,stroke-width:2px;
    class Pre,Step1,Step2,E1,E2,E3,E4,Spec stage;
    class Choice decision;
    class Goal,Recert goal;`,

    'diag-2': `pie showData
    title CCDE筆記試験（400-007 v3.1）出題範囲の配分
    "1.0 ビジネス戦略設計 (15%)" : 15
    "2.0 制御/データ/管理プレーンと運用設計 (25%)" : 25
    "3.0 ネットワーク設計 (30%)" : 30
    "4.0 サービス設計 (15%)" : 15
    "5.0 セキュリティ設計 (15%)" : 15`,

    'diag-3': `flowchart LR
    Core["コアモジュール<br/>（全受験者に共通）<br/>エンタープライズアーキテクチャ<br/>全般の技術・設計力"]
    Elective["エレクティブモジュール<br/>（4分野から1つを選択）"]
    Core --> Merge(("8時間の<br/>統合シナリオ試験"))
    Elective --> Merge
    Merge --> Result["合格でCCDE認定 ＋<br/>選択したエレクティブの<br/>Specialist認定を取得"]

    classDef stage fill:#123A57,stroke:#7FB3D5,color:#F5F9FB,stroke-width:1.5px;
    classDef merge fill:#3A2A10,stroke:#E8A33D,color:#FBF1DF,stroke-width:2px;
    classDef goal fill:#123A57,stroke:#3F8E76,color:#F5F9FB,stroke-width:2px;
    class Core,Elective stage;
    class Merge merge;
    class Result goal;`,

    'diag-4': `flowchart TD
    Start["CCDE認定を取得<br/>（有効期間3年のカウント開始）"]
    Start --> Ask{"有効期限までに<br/>再認定できたか？"}
    Ask -->|再試験に合格| Renew1["再認定完了"]
    Ask -->|CE単位を必要数取得| Renew2["再認定完了"]
    Ask -->|上位／隣接資格に合格| Renew3["再認定完了"]
    Ask -->|何もしなかった| Expire["認定が失効<br/>→ 試験からやり直し"]
    Renew1 --> Cycle["新たに3年間の<br/>有効期間がスタート"]
    Renew2 --> Cycle
    Renew3 --> Cycle

    classDef stage fill:#123A57,stroke:#7FB3D5,color:#F5F9FB,stroke-width:1.5px;
    classDef decision fill:#3A2A10,stroke:#E8A33D,color:#FBF1DF,stroke-width:2px;
    classDef bad fill:#3A1414,stroke:#A85468,color:#FBE3E7,stroke-width:2px;
    classDef good fill:#123A57,stroke:#3F8E76,color:#F5F9FB,stroke-width:2px;
    class Start,Cycle stage;
    class Ask decision;
    class Renew1,Renew2,Renew3 good;
    class Expire bad;`,

    'diag-5': `flowchart TD
    A["1. 現場での設計・アーキテクチャ経験を積む<br/>（5〜7年が目安）"] --> B["2. 公式Unified Exam Topicsで<br/>出題範囲全体を確認する"]
    B --> C["3. 5つのドメインごとに<br/>知識を体系的にインプットする"]
    C --> D["4. 実際の設計事例で<br/>トレードオフ分析を練習する"]
    D --> E["5. 筆記試験（400-007）を<br/>Pearson VUEで予約・受験する"]
    E --> F["6. 実技試験のエレクティブを検討し<br/>模擬シナリオで演習する"]
    F --> G["7. CCDE実技試験（8時間）を<br/>予約・受験する"]

    classDef step fill:#123A57,stroke:#7FB3D5,color:#F5F9FB,stroke-width:1.5px;
    class A,B,C,D,E,F,G step;`,
};
