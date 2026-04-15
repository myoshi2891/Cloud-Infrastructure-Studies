import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section9: React.FC = () => {
    return (
        <div id="s9" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn9">09</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">スマートアナリティクスの全体アーキテクチャ</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-9" idNumber="9" title="スマートアナリティクスの全体アーキテクチャ">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">9.1 データアーキテクチャの全体像</h3>
<h4 class="stitle">データレイクとデータウェアハウス</h4>
<pre class="code-block"><code className="language-text">データレイク（Data Lake）:

  - あらゆる形式の生データを大量に保管する場所
  - スキーマ定義なし（スキーマオンリード）
  - Cloud Storage が中心
  - 将来の使い方を決めていないデータも保存できる
  - 例: 全ログ・全画像・全音声ファイルをとりあえず保存

データウェアハウス（Data Warehouse）:

  - 分析のために構造化・整理されたデータを格納する場所
  - スキーマ定義あり（スキーマオンライト）
  - BigQuery が中心
  - BI・レポート・分析に最適化されている
  - 例: 売上・顧客・在庫データを分析用に整形して保存

データレイクハウス（Data Lakehouse）:

  - データレイクの柔軟性 + データウェアハウスの分析性能を兼ね備える
  - BigQuery のストレージに生データも分析データも保存
  - Google Cloud ではこのアーキテクチャを推奨
</code></pre>
<h3 class="stitle">9.2 代表的なデータパイプラインアーキテクチャ</h3>
<h4 class="stitle">パターン A: バッチ分析パイプライン</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`[データソース]          [転送・変換]         [分析・可視化]

業務DB（Cloud SQL）  ──► Dataflow     ──► BigQuery ──► Looker
ファイル（GCS）      ──► (日次バッチ)  ──►           ──► Looker Studio
外部データ           ──►              ──►

特徴:

  - 毎晩深夜に前日分のデータを一括処理
  - コストを最適化できる
  - リアルタイム性は不要な分析に最適
`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle">パターン B: リアルタイムストリーミングパイプライン</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`[イベント発生]        [ストリーミング]       [リアルタイム分析]

IoT デバイス    ──► Pub/Sub ──► Dataflow ──► BigQuery ──► Looker
Web クリック    ──►           ──►           ──►
注文・決済      ──►           ──►           ──►

特徴:

  - データが発生した瞬間から分析に反映
  - 不正検知・IoT監視・リアルタイムダッシュボードに最適
  - バッチより複雑でコストも高い
`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle">パターン C: ハイブリッドパイプライン（最も一般的）</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`リアルタイム:
IoT/ログ → Pub/Sub → Dataflow → BigQuery（ホットデータ）
                                      ↓
                               統合分析テーブル ──► Looker
                                      ↑
バッチ:
Cloud SQL → Dataflow → BigQuery（コールドデータ）
GCS       → Dataproc →`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">9.3 データメッシュ（Data Mesh）の考え方</h3>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`データメッシュとは:

  - データを各ビジネスドメイン（部門）が所有・管理する考え方
  - 中央集権的なデータチームに頼らず、各部門がデータを提供・消費する
  - Dataplex がデータメッシュ実装を支援する Google Cloud のサービス

従来（中央集権型）:
  各部門 → データエンジニアリングチーム（ボトルネック！）→ 全社分析

データメッシュ型:
  営業部門 ──→ 自部門のデータを公開
  製造部門 ──→ 自部門のデータを公開  → Dataplex で統一管理 → 全社分析
  財務部門 ──→ 自部門のデータを公開`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<blockquote class="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted)] mb-4">
<p class="tdesc">📎 <strong>参照</strong>:
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/architecture/data-lifecycle-cloud-best-practices">https://cloud.google.com/architecture/data-lifecycle-cloud-best-practices</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/solutions/smart-analytics">https://cloud.google.com/solutions/smart-analytics</a></p>
</blockquote>
<hr />
` }} />
            
            </SectionCard>
            
        </div>
    );
};
