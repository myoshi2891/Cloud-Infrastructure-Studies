import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section12: React.FC = () => {
    return (
        <div id="s12" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn12">12</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">Section 2 総まとめ・頻出問題パターン</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-12" idNumber="12" title="Section 2 総まとめ・頻出問題パターン">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3>12.1 最重要用語の一問一答</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Q: 構造化・半構造化・非構造化データの例を各1つ挙げよ
A: 構造化=売上テーブル（CSV）、半構造化=API レスポンス（JSON）、
   非構造化=カスタマーレビューのテキスト・商品画像

Q: BigQuery を一言で表すと？
A: サーバーレスでペタバイト規模のデータを SQL で分析できるデータウェアハウス

Q: Looker と Looker Studio の最大の違いは？
A: Looker は有料のエンタープライズ BI（LookML でデータ定義を一元管理）、
   Looker Studio は無料のセルフサービス BI

Q: Pub/Sub の役割は？
A: サービス間のメッセージを非同期に配信するメッセージングサービス（疎結合化）

Q: Dataflow vs Dataproc の違いは？
A: Dataflow は Beam ベースのサーバーレスパイプライン（バッチ+ストリーミング）、
   Dataproc はマネージド Hadoop/Spark（既存コードの移行に向く）

Q: Cloud Storage のストレージクラスを安い順に並べよ
A: Archive（最安）< Coldline < Nearline < Standard（最高）

Q: 匿名化と仮名化の違いは？
A: 匿名化=再識別不可能（GDPR 対象外）、仮名化=変換テーブルで再識別可能（GDPR 対象）

Q: リアルタイム分析に必要な GCP サービスは？
A: Pub/Sub（取り込み）→ Dataflow（処理）→ BigQuery（保存・分析）

Q: IoT センサーデータの格納に最適な DB は？
A: Bigtable（時系列の超大量データを超低レイテンシで読み書き）

Q: データガバナンスのツールは？
A: Dataplex（総合管理とユニバーサルカタログ）・
   Sensitive Data Protection（個人情報保護）`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3>12.2 よく出る問題パターンと解法</h3>
<h4>パターン 1: データベース選択</h4>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`問題: 「世界中のユーザーが同時に在庫を更新するグローバル EC を
        構築したい。どの DB が最適か？」

解法のステップ:

  1. RDB が必要か？ → はい（在庫の整合性が必要）
  2. グローバル展開が必要か？ → はい（世界中のユーザー）
  3. 強一貫性が必要か？ → はい（二重販売を防ぐ）

  → Cloud Spanner が正解

答え: Cloud Spanner
理由: グローバル展開・強一貫性・99.999% SLA・水平スケール`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4>パターン 2: ストレージクラス選択</h4>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`問題: 「規制上 7 年間保持が必要な財務レポートがある。
        年に 1 回の監査時にのみアクセスする。
        最もコストを最適化するにはどのクラスを使うべきか？」

解法:

  - アクセス頻度: 年 1 回 → 非常に低い
  - 保存期間: 7 年 → Archive の最小保存期間（365日）を超える
  - 目的: コスト最適化

答え: Archive
理由: 最安コスト・年 1 回以下のアクセス・7年保存に適合`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4>パターン 3: データパイプライン選択</h4>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`問題: 「クレジットカードの不正取引を取引直後に検知したい。
        どのアーキテクチャが最適か？」

解法:

  - リアルタイム性: 取引直後 → ストリーミング処理
  - データ収集: Pub/Sub（大量の取引データを受け取る）
  - リアルタイム処理: Dataflow（特徴量計算・モデル呼び出し）
  - 判定: Vertex AI（不正検知モデル）

答え: Pub/Sub → Dataflow → Vertex AI（+ BigQuery への保存）`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4>パターン 4: BI ツール選択</h4>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`問題: 「大企業全社で統一されたデータ定義に基づく
        ダッシュボードを構築したい。
        どのツールが最適か？」

解法:

  - 「全社統一」「データ定義の一元管理」→ LookML が必要
  - 「大企業・エンタープライズ」→ Looker（有料）
  - Looker Studio は無料だが LookML 管理機能がない

答え: Looker
理由: LookML による「真実の唯一の情報源」の実現`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3>12.3 混同しやすいポイントの整理</h3>
<table>
<thead>
<tr>
<th>混同パターン</th>
<th>正しい理解</th>
</tr>
</thead>
<tbody><tr>
<td>BigQuery = データベース</td>
<td>BigQuery はデータウェアハウス（DWH）。OLTP には向かない</td>
</tr>
<tr>
<td>Dataflow = Dataproc</td>
<td>Dataflow は Beam ベース（サーバーレス）、Dataproc は Hadoop/Spark</td>
</tr>
<tr>
<td>Looker = Looker Studio</td>
<td>Looker は有料エンタープライズ BI、Looker Studio は無料セルフサービス</td>
</tr>
<tr>
<td>匿名化 = 仮名化</td>
<td>匿名化は再識別不可、仮名化は再識別可能（変換テーブル必要）</td>
</tr>
<tr>
<td>Cloud SQL = BigQuery</td>
<td>Cloud SQL は OLTP（RDB）、BigQuery は OLAP（DWH・分析）</td>
</tr>
<tr>
<td>Bigtable = BigQuery</td>
<td>Bigtable は NoSQL 時系列 DB、BigQuery は SQL 分析 DWH</td>
</tr>
<tr>
<td>Pub/Sub = Dataflow</td>
<td>Pub/Sub はメッセージング（配信）、Dataflow はデータ処理（変換）</td>
</tr>
</tbody></table>
<h3>12.4 Section 2 チェックリスト</h3>
<pre><code className="language-text">試験前の最終確認:

□ 構造化・半構造化・非構造化データの違いと例を説明できる
□ データ分析の4レベル（記述・診断・予測・処方）を説明できる
□ Cloud Storage の 4 ストレージクラスと使い分けを説明できる
□ ライフサイクルポリシーの目的と設定方法を理解している
□ データベース選択フロー（RDB vs NoSQL・規模・用途）を理解している
□ BigQuery の特徴（サーバーレス・SQL 分析・DWH）を説明できる
□ Looker と Looker Studio の違いを明確に説明できる
□ Pub/Sub・Dataflow・Dataproc の役割の違いを説明できる
□ バッチ処理とストリーミング処理の使い分けを理解している
□ 匿名化・仮名化・差分プライバシーの違いを説明できる
□ Dataplex と Sensitive Data Protection の役割を説明できる
□ データガバナンスとはなにか、なぜ重要かを説明できる
</code></pre>
<hr />
` }} />
            
            </SectionCard>
            
        </div>
    );
};
