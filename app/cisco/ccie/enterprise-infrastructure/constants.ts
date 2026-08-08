export interface NavItem {
    id: string;
    sectionIdx: string;
    label: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'overview', sectionIdx: '§01', label: 'CCIE Enterprise Infrastructureとは' },
    { id: 'roadmap', sectionIdx: '§02', label: '認定取得までの全体像' },
    { id: 'encor', sectionIdx: '§03', label: 'ステップ1：クオリファイ試験（ENCOR 350-401）' },
    { id: 'lab', sectionIdx: '§04', label: 'ステップ2：ラボ試験（CCIE EI Lab）' },
    { id: 'prereq', sectionIdx: '§05', label: '受験前提条件・推奨経験' },
    { id: 'cost', sectionIdx: '§06', label: '費用の内訳' },
    { id: 'recert', sectionIdx: '§07', label: '再認定（Recertification）' },
    { id: 'study', sectionIdx: '§08', label: '初学者向け学習ロードマップ' },
    { id: 'faq', sectionIdx: '§09', label: 'よくある質問' },
    { id: 'sources', sectionIdx: '§10', label: '参考ソース' },
];

export const DIAGRAMS = {
    hierarchy: `flowchart BT
A["エントリーレベル (CCSTなど)"] --> B["アソシエイトレベル (CCNA)"]
B --> C["プロフェッショナルレベル (CCNP Enterprise)"]
C --> D["エキスパートレベル (CCIE Enterprise Infrastructure)"]
D --> E["アーキテクトレベル (Cisco Certified Architect)"]
style D fill:#FFB238,stroke:#0A2E4D,stroke-width:2px,color:#0A2E4D`,

    roadmap: `flowchart LR
Start(["学習開始"]) --> Q["ステップ1: クオリファイ試験 ENCOR 350-401 (120分 筆記)"]
Q -- 合格 --> L["ステップ2: ラボ試験 CCIE EI Lab v1.1 (8時間 実技)"]
L -- 合格 --> Cert(["CCIE Enterprise Infrastructure 認定取得"])
Cert --> Recert["3年ごとに再認定が必要"]
style Cert fill:#FFB238,stroke:#0A2E4D,stroke-width:2px,color:#0A2E4D`,

    labModules: `flowchart LR
subgraph Lab["ラボ試験 合計8時間"]
direction LR
M1["モジュール1 Design 設計 3時間"]
M2["モジュール2 Deploy Operate Optimize 5時間"]
M1 --> M2
end`,

    studyRoadmap: `flowchart TD
S1["CCNA相当の基礎知識を習得 (L2・L3の基本など)"] --> S2["CCNP Enterprise・ENCOR教材で体系的に学習"]
S2 --> S3["ENCOR 350-401 を受験・合格"]
S3 --> S4["ラボ試験の公式ブループリントを精読"]
S4 --> S5["仮想・実機ラボでハンズオン練習"]
S5 --> S6["Designモジュールの練習 (要件からの設計)"]
S6 --> S7["Deploy・Operate・Optimizeモジュールの練習"]
S7 --> S8["模擬試験・タイムマネジメント練習"]
S8 --> S9["ラボ試験の予約・受験"]
S9 --> S10(["CCIE Enterprise Infrastructure 認定取得"])
style S10 fill:#FFB238,stroke:#0A2E4D,stroke-width:2px,color:#0A2E4D`,
};
