import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section4: React.FC = () => {
    return (
        <div id="s4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">04</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">データのライフサイクルとパイプライン</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-4" idNumber="4" title="データのライフサイクルとパイプライン">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">4.1 データライフサイクルの全体像</h3>
<p class="tdesc">データは「生まれてから消えるまで」に複数のステージを経ます。
各ステージに適切な Google Cloud サービスを対応させることが重要です。</p>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`データライフサイクル:

[収集・取り込み]  →  [処理・変換]  →  [保存・格納]  →  [分析・クエリ]  →  [可視化・活用]
   Ingest              Process           Store              Analyze            Visualize

  Pub/Sub           Dataflow           BigQuery           BigQuery           Looker
  Transfer          Dataproc           Cloud SQL          Vertex AI          Looker Studio
  Service           Cloud Run          Cloud Storage      BigQuery ML        Gemini
  Storage           Cloud Functions    Bigtable           Looker
  Transfer          Datastream         Firestore          Looker Studio
  Appliance`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">4.2 バッチ処理 vs ストリーミング処理</h3>
<p class="tdesc">データの処理方式には主に 2 種類あります。
どちらを選ぶかはビジネス要件によって決まります。</p>
<pre class="code-block"><code className="language-text">バッチ処理（Batch Processing）:
  定義: データをある程度溜めてから、まとめて一括処理する

  例:

    - 毎晩深夜に前日の全取引データを集計する
    - 月末に請求書を一括生成する
    - 週次で顧客行動レポートを生成する

  特徴:
    ✅ 大量データを効率的に処理できる
    ✅ コストを最適化できる（深夜にまとめて処理）
    ❌ リアルタイム性がない（数時間〜1日の遅延）

  GCP サービス: BigQuery・Dataproc・Cloud Run Jobs

ストリーミング処理（Streaming Processing）:
  定義: データが発生したその瞬間に即座に処理する

  例:

    - クレジットカード不正検知（取引直後に判定）
    - 株式取引の価格更新（ミリ秒単位）
    - IoT センサーの異常値をリアルタイムで検知
    - SNS のトレンド分析（今この瞬間の話題）

  特徴:
    ✅ リアルタイムで結果を取得できる
    ✅ 問題を即座に検知・対応できる
    ❌ バッチより複雑・コストが高い

  GCP サービス: Pub/Sub + Dataflow
</code></pre>
<h4 class="stitle">✅ ベストプラクティス: 処理方式の選択</h4>
<pre class="code-block"><code className="language-yaml">バッチ処理を選ぶ場合:

  - データの鮮度が数時間〜1日遅れても許容できる
  - コストを最小化したい
  - 大量の履歴データを分析したい

  例: 月次売上レポート・DWH へのデータ投入

ストリーミングを選ぶ場合:

  - 数秒以内のリアルタイム性が必要
  - 異常・不正をすぐに検知する必要がある
  - 顧客体験がリアルタイム性に依存している

  例: 不正検知・IoT 監視・リアルタイムダッシュボード

ハイブリッド（Lambda/Kappa アーキテクチャ）:

  - 両方が必要な場合（過去の分析+リアルタイム監視）
  - Dataflow は同一コードでバッチ・ストリーミング両対応
</code></pre>
<hr />
` }} />
            
            </SectionCard>
            
        </div>
    );
};
