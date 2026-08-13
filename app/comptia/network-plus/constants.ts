/** CompTIA Network+ (N10-009) ガイド定数・Mermaid ダイアグラム定義 */

export type DiagramId = 'dg-pie' | 'dg-troubleshoot' | 'dg-roadmap' | 'dg-examday';

export const DIAGRAMS: Record<DiagramId, string> = {
    'dg-pie': `%%{init: {'theme':'base','themeVariables':{"pie1":"#4c1d95","pie2":"#115e59","pie3":"#9a3412","pie4":"#831843","pie5":"#92400e","pieOuterStrokeColor":"#3a3f4a","pieSectionTextColor":"#e8eaed","pieOpacity":1,"pieTitleTextColor":"#e8eaed","pieLegendTextColor":"#e8eaed","pieLegendTextSize":"15px","pieSectionTextSize":"15px"}}}%%
pie showData
    title Network+ (N10-009) ドメイン別配点
    "1. ネットワークの概念 (23%)" : 23
    "2. ネットワークの実装 (20%)" : 20
    "3. ネットワークの運用 (19%)" : 19
    "4. ネットワークセキュリティ (14%)" : 14
    "5. トラブルシューティング (24%)" : 24`,

    'dg-troubleshoot': `%%{init: {'theme':'base','themeVariables':{"primaryColor":"#92400e","primaryTextColor":"#fef3c7","primaryBorderColor":"#fde68a","lineColor":"#5a6270","edgeLabelBackground":"#15181d","mainBkg":"#92400e","nodeBorder":"#fde68a","textColor":"#e8eaed","fontSize":"16px"}}}%%
flowchart TD
    A["1. 問題を特定する"] --> B["2. 仮説を立てる"]
    B --> C["3. 仮説を検証する"]
    C -->|"誤りだった"| B
    C -->|"正しいと確認"| D["4. 対応計画を実行する"]
    D --> E["5. 動作を検証する"]
    E --> F["6. 対応内容を文書化する"]`,

    'dg-roadmap': `%%{init: {'theme':'base','themeVariables':{"primaryColor":"#4c1d95","primaryTextColor":"#ede9fe","primaryBorderColor":"#ddd6fe","lineColor":"#5a6270","edgeLabelBackground":"#15181d","mainBkg":"#4c1d95","nodeBorder":"#ddd6fe","textColor":"#e8eaed","fontSize":"16px"}}}%%
flowchart TD
    A["ステップ1: 基礎知識を確認する"] --> B["ステップ2: 学習教材を選ぶ"]
    B --> C["ステップ3: ドメインごとに学習する"]
    C --> D["ステップ4: 模擬試験で理解度を測定する"]
    D --> E{"合格ライン相当の得点か"}
    E -->|"未達"| F["ステップ5: 弱点ドメインを復習する"]
    F --> C
    E -->|"到達"| G["ステップ6: 試験を申し込む"]
    G --> H["ステップ7: 試験当日を迎える"]
    H --> I{"720点以上か"}
    I -->|"合格"| J["Network+認定を取得"]
    I -->|"不合格"| K["スコアレポートで弱点を分析"]
    K --> C`,

    'dg-examday': `%%{init: {'theme':'base','themeVariables':{"primaryColor":"#9a3412","primaryTextColor":"#ffedd5","primaryBorderColor":"#fed7aa","lineColor":"#5a6270","edgeLabelBackground":"#15181d","mainBkg":"#9a3412","nodeBorder":"#fed7aa","textColor":"#e8eaed","fontSize":"16px"}}}%%
flowchart LR
    A["会場到着 本人確認"] --> B["受験規約への同意"]
    B --> C["試験開始 90分 最大90問"]
    C --> D["回答 見直し"]
    D --> E["試験終了を確定"]
    E --> F["スコアレポート受領"]`,
};
