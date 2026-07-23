export interface TocItem {
    id: string;
    label: string;
}

export const TOC_ITEMS: TocItem[] = [
    { id: 'overview', label: '0. このガイドの全体像' },
    { id: 'ch1', label: '第1章｜3.1 ルーティングテーブルの構成要素を解釈する' },
    { id: 'ch2', label: '第2章｜3.2 ルータのフォワーディング決定ロジック' },
    { id: 'ch3', label: '第3章｜3.3 IPv4/IPv6スタティックルーティングの設定・検証' },
    { id: 'ch4', label: '第4章｜3.4 シングルエリアOSPFv2の設定・検証' },
    { id: 'ch5', label: '第5章｜3.5 ファーストホップ冗長プロトコル（FHRP）' },
    { id: 'summary', label: 'まとめ：学習の進め方' },
    { id: 'references', label: '参考ソース（出典）' },
];

export const DIAGRAMS: Record<string, string> = {
    'overview-pie': `
pie showData
    title CCNA 200-301（v1.1）ドメイン別 出題比率
    "IP Connectivity (25%)" : 25
    "Network Fundamentals (20%)" : 20
    "Network Access (20%)" : 20
    "Security Fundamentals (15%)" : 15
    "IP Services (10%)" : 10
    "Automation and Programmability (10%)" : 10
`.trim(),

    'packet-flow': `
flowchart TD
    A["パケットがルータのインターフェースに到着"] --> B["宛先IPアドレスを確認"]
    B --> C{"ルーティングテーブルに<br>一致するエントリはあるか？"}
    C -- "一致するエントリあり" --> D["該当エントリのネクストホップ／<br>出力インターフェースへ転送"]
    C -- "一致するエントリなし" --> E{"ゲートウェイ・オブ・ラストリゾート<br>（デフォルトルート）は設定されているか？"}
    E -- "設定あり" --> F["デフォルトルート経由で転送"]
    E -- "設定なし" --> G["パケットを破棄し、<br>送信元へICMP到達不能を返す"]
`.trim(),

    'forwarding-logic': `
flowchart TD
    Start(["複数の経路候補がある"]) --> Step1{"① 最長プレフィックスマッチ<br>（Longest Prefix Match）<br>より長い（詳細な）プレフィックスは？"}
    Step1 -- "プレフィックス長が最長の<br>エントリが1つに絞れる" --> UseRoute["その経路を採用"]
    Step1 -- "プレフィックス長が同じ経路が<br>複数残る" --> Step2{"② アドミニストレーティブ<br>ディスタンス（AD）<br>より小さいADは？"}
    Step2 -- "ADが最小のエントリが<br>1つに絞れる" --> UseRoute
    Step2 -- "AD値も同じ<br>（同一プロトコル間）" --> Step3{"③ メトリック<br>より小さいメトリックは？"}
    Step3 --> UseRoute
`.trim(),

    'static-route-topology': `
graph LR
    R1["R1（本社ルータ）"]
    R2["R2（プライマリ回線）"]
    R3["R3（バックアップ回線）"]
    LAN["10.10.20.0/24<br>（拠点LAN）"]

    R1 -- "G0/0<br>（プライマリ経路）" --> R2
    R1 -- "G0/1<br>（バックアップ経路）" --> R3
    R2 --> LAN
    R3 --> LAN
`.trim(),

    'ospf-neighbor-states': `
stateDiagram-v2
    [*] --> Down
    Down --> Init : Helloパケット受信
    Init --> TwoWay : 自分のRouter IDが<br>相手のHelloに含まれるのを確認
    TwoWay --> ExStart : マスター/スレーブを決定
    ExStart --> Exchange : DBD（データベース記述）<br>パケットを交換
    Exchange --> Loading : LSR/LSUで<br>詳細情報を要求
    Loading --> Full : LSDB（リンクステート<br>データベース）が完全に同期
    Full --> [*]
`.trim(),

    'ospf-dr-bdr-selection': `
flowchart TD
    A["セグメント内のOSPFルータで<br>DR/BDRを選出開始"] --> B{"OSPFプライオリティが<br>最も高いルータは？<br>（0は選出対象外）"}
    B -- "1台に絞れる" --> C["そのルータがDRになる"]
    B -- "同点が複数" --> D{"Router IDが<br>最も高いルータは？"}
    D --> C
    C --> E["同様の基準で<br>2番目に高いルータがBDRになる"]
`.trim(),

    'fhrp-concept': `
graph TB
    Host["ホストPC<br>デフォルトゲートウェイ：<br>仮想IP 192.168.1.254"]
    VIP(("仮想IP<br>192.168.1.254"))
    RA["ルータA（Active/Master）<br>実IP：192.168.1.1"]
    RB["ルータB（Standby/Backup）<br>実IP：192.168.1.2"]

    Host --> VIP
    VIP -. 正常時 .-> RA
    VIP -. RA障害時に自動切替 .-> RB
`.trim(),
};
