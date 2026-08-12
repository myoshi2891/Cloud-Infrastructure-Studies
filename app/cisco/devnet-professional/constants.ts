export const DIAGRAMS = {
  levels: `flowchart TB
    Associate["Cisco Certified DevNet Associate<br/>試験: 200-901 DEVASC 1本のみ"]
    Associate --> ProfessionalGoal["Cisco Certified DevNet Professional を目指す"]

    subgraph ProfPath["DevNet Professional 認定までの流れ"]
        direction TB
        CoreExam["コア試験に合格<br/>350-901 DEVCOR"] --> CoreSpecialist["自動的に付与:<br/>DevNet Specialist - Core"]
        ConcExam["コンセントレーション試験に合格<br/>専門分野を1つ選択"] --> ConcSpecialist["自動的に付与:<br/>DevNet Specialist - 専門分野"]
        CoreSpecialist --> BothDone["コア + コンセントレーション<br/>両方に合格"]
        ConcSpecialist --> BothDone
        BothDone --> ProfCert["Cisco Certified DevNet Professional 認定"]
    end

    ProfessionalGoal --> CoreExam
    ProfessionalGoal --> ConcExam
    ProfCert --> Expert["Cisco Certified DevNet Expert<br/>現在は CCIE Automation に名称変更"]`,

  mechanism: `flowchart TB
    Start(["受験を開始する"]) --> Core["コア試験に合格する<br/>350-901 DEVCOR（120分）"]
    Core --> Choose["専門分野を1つ選び<br/>コンセントレーション試験を受験"]

    subgraph Concentrations["コンセントレーション試験（いずれか1つに合格・すべて90分）"]
        direction TB
        C1["300-435 ENAUTO<br/>エンタープライズ自動化"]
        C2["300-835 CLAUTO<br/>コラボレーション自動化"]
        C3["300-635 DCAUTO<br/>データセンター自動化"]
        C4["300-535 SPAUTO<br/>サービスプロバイダー自動化"]
        C5["300-735 SAUTO<br/>セキュリティ自動化"]
        C6["300-910 DEVOPS<br/>DevOps"]
        C7["300-915 DEVIOT<br/>IoT/エッジ"]
        C8["300-920 DEVWBX<br/>Webex開発"]
    end

    Choose --> Concentrations
    Concentrations --> Result["Cisco Certified DevNet Professional 認定を取得"]`,

  domains: `flowchart LR
    D1["1.0 ソフトウェア開発と設計 (20%)"]
    D2["2.0 APIの活用 (20%)"]
    D3["3.0 シスコプラットフォーム (20%)"]
    D4["4.0 展開とセキュリティ (20%)"]
    D5["5.0 インフラと自動化 (20%)"]
    D1 --- D2 --- D3 --- D4 --- D5`,

  format: `flowchart TB
    A["Ciscoの試験ページで試験内容(PDF)を確認"] --> B["Pearson VUEで受験予約"]
    B --> C["テストセンター or オンライン監督形式で受験"]
    C --> D{"合格?"}
    D -- はい --> E["Specialist認定が自動付与される"]
    D -- いいえ --> F["一定の待機期間後に再受験可能"]`,

  roadmap: `flowchart TB
    S0["Step 0<br/>Python・Git・REST APIなど<br/>ソフトウェア開発の基礎を身につける"] --> S1
    S1["Step 1<br/>(推奨) DevNet Associate 相当の知識を<br/>先に固めておく"] --> S2
    S2["Step 2<br/>DEVCORの試験内容(PDF)を確認し<br/>5つの出題ドメインの学習計画を立てる"] --> S3
    S3["Step 3<br/>公式トレーニング・教材で<br/>コア試験(350-901 DEVCOR)対策を行う"] --> S4
    S4["Step 4<br/>コア試験(DEVCOR)に合格する<br/>→ Specialist - Core 認定を取得"] --> S5
    S5["Step 5<br/>自分の専門分野に合う<br/>コンセントレーション試験を1つ選ぶ"] --> S6
    S6["Step 6<br/>選んだコンセントレーション試験に合格する<br/>→ Specialist - 専門分野 認定を取得"] --> S7
    S7["Step 7<br/>Cisco Certified DevNet Professional 認定 取得"] --> S8
    S8["Step 8<br/>3年ごとに再認定<br/>(CEクレジット or 再受験)"]`,

  recert: `flowchart TB
    Valid["認定取得（有効期間3年間スタート）"] --> Choice{"有効期限までに<br/>再認定できたか?"}
    Choice -- "CEクレジット80単位を取得" --> Renewed["再認定 成功<br/>(新たに3年間有効)"]
    Choice -- "対象試験に再度合格" --> Renewed
    Choice -- "何もしなかった" --> Expired["認定が失効<br/>最初から取得しなおしが必要"]`,
} as const satisfies Record<string, string>;
