import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section3: React.FC = () => {
    return (
        <div id="s3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">データの種類と特性</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-3" idNumber="3" title="データの種類と特性">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">3.1 3 種類のデータ形式</h3>
<p class="tdesc">データは形式によって 3 種類に分類されます。
試験では「どのデータ形式にどのサービスが適切か」が問われます。</p>
<pre class="code-block"><code className="language-text">世界中のデータの内訳（概算）:
  構造化データ:    約 10〜20%
  半構造化データ:  約 10〜15%
  非構造化データ:  約 70〜80%   ← 最も多い！
</code></pre>
<h3 class="stitle">3.2 構造化データ（Structured Data）</h3>
<h4 class="stitle">定義と特徴</h4>
<pre class="code-block"><code className="language-text">構造化データとは:

  - 行と列（表形式）で整理されたデータ
  - スキーマ（型定義）が明確に定まっている
  - SQL などで簡単に検索・集計できる
  - 全データの約 10〜20% を占める

特徴:
  ✅ 検索・集計・結合が簡単
  ✅ データ品質の管理がしやすい
  ❌ 非構造化データのような柔軟な表現は難しい
</code></pre>
<h4 class="stitle">構造化データの具体例</h4>
<div class="ctable-wrap" tabIndex="0"><table class="ctable">
<thead>
<tr>
<th scope="col">データ種別</th>
<th scope="col">具体例</th>
<th scope="col">格納先（GCP）</th>
</tr>
</thead>
<tbody><tr>
<td>売上データ</td>
<td>日付・商品ID・金額・数量</td>
<td>Cloud SQL / BigQuery</td>
</tr>
<tr>
<td>顧客マスタ</td>
<td>顧客ID・氏名・住所・年齢</td>
<td>Cloud SQL / Spanner</td>
</tr>
<tr>
<td>在庫データ</td>
<td>SKU・倉庫・在庫数・入出庫日</td>
<td>Cloud SQL / Spanner</td>
</tr>
<tr>
<td>気象データ</td>
<td>日時・気温・湿度・降水量</td>
<td>BigQuery / Bigtable</td>
</tr>
<tr>
<td>株価データ</td>
<td>銘柄・日時・始値・終値・出来高</td>
<td>BigQuery / Bigtable</td>
</tr>
</tbody></table></div>
<h3 class="stitle">3.3 非構造化データ（Unstructured Data）</h3>
<h4 class="stitle">定義と特徴</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`非構造化データとは:

  - 特定のフォーマット・スキーマがないデータ
  - テキスト・画像・動画・音声などの形式
  - 全データの約 70〜80% を占める大多数
  - 従来は分析が困難 → AI/ML で活用が進む

特徴:
  ✅ 豊富な情報を含む（感情・ニュアンス・視覚情報など）
  ✅ リアルワールドのデータの多くがこの形式
  ❌ 直接 SQL で集計・検索できない
  ❌ 分析にはAI/ML が必要`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle">非構造化データの具体例</h4>
<div class="ctable-wrap" tabIndex="0"><table class="ctable">
<thead>
<tr>
<th scope="col">データ種別</th>
<th scope="col">具体例</th>
<th scope="col">格納先（GCP）</th>
<th scope="col">分析方法</th>
</tr>
</thead>
<tbody><tr>
<td>テキスト</td>
<td>メール・SNS 投稿・レビュー</td>
<td>Cloud Storage</td>
<td>Natural Language API</td>
</tr>
<tr>
<td>画像</td>
<td>商品写真・医療画像・衛星写真</td>
<td>Cloud Storage</td>
<td>Vision API</td>
</tr>
<tr>
<td>動画</td>
<td>監視カメラ・広告・教育動画</td>
<td>Cloud Storage</td>
<td>Video Intelligence API</td>
</tr>
<tr>
<td>音声</td>
<td>コールセンター録音・ポッドキャスト</td>
<td>Cloud Storage</td>
<td>Speech-to-Text API</td>
</tr>
<tr>
<td>PDF</td>
<td>契約書・請求書・レポート</td>
<td>Cloud Storage</td>
<td>Document AI</td>
</tr>
<tr>
<td>ログ</td>
<td>Webサーバーログ・アプリログ</td>
<td>Cloud Logging / GCS</td>
<td>BigQuery</td>
</tr>
</tbody></table></div>
<h3 class="stitle">3.4 半構造化データ（Semi-Structured Data）</h3>
<h4 class="stitle">定義と特徴</h4>
<pre class="code-block"><code className="language-text">半構造化データとは:

  - 完全な表形式ではないが、一定の構造を持つデータ
  - JSON・XML・CSV・YAML などの形式
  - Web API のレスポンスや IoT センサーデータに多い

例（JSON 形式）:
  {
    &quot;user_id&quot;: &quot;U-12345&quot;,
    &quot;name&quot;: &quot;田中太郎&quot;,
    &quot;purchases&quot;: [
      {&quot;item&quot;: &quot;シャツ&quot;, &quot;price&quot;: 3000, &quot;date&quot;: &quot;2024-01-15&quot;},
      {&quot;item&quot;: &quot;ズボン&quot;, &quot;price&quot;: 5000, &quot;date&quot;: &quot;2024-01-20&quot;}
    ],
    &quot;tags&quot;: [&quot;VIP&quot;, &quot;リピーター&quot;]
  }

特徴:
  ✅ JSON・XML など標準フォーマットで交換しやすい
  ✅ スキーマが柔軟（フィールドの追加・変更が容易）
  ✅ BigQuery や Firestore で直接扱える
</code></pre>
<h3 class="stitle">3.5 データ形式の比較まとめ</h3>
<div class="ctable-wrap" tabIndex="0"><table class="ctable">
<thead>
<tr>
<th scope="col">比較項目</th>
<th scope="col">構造化</th>
<th scope="col">半構造化</th>
<th scope="col">非構造化</th>
</tr>
</thead>
<tbody><tr>
<td><strong>例</strong></td>
<td>CSV・RDB テーブル</td>
<td>JSON・XML・CSV</td>
<td>画像・動画・音声・PDF</td>
</tr>
<tr>
<td><strong>スキーマ</strong></td>
<td>固定・厳格</td>
<td>柔軟</td>
<td>なし</td>
</tr>
<tr>
<td><strong>検索方法</strong></td>
<td>SQL</td>
<td>JSONPath・SQL</td>
<td>AI/ML・全文検索</td>
</tr>
<tr>
<td><strong>GCP ストレージ</strong></td>
<td>Cloud SQL・BigQuery</td>
<td>Firestore・BigQuery</td>
<td>Cloud Storage</td>
</tr>
<tr>
<td><strong>全データ中の割合</strong></td>
<td>~10-20%</td>
<td>~10-15%</td>
<td>~70-80%</td>
</tr>
<tr>
<td><strong>分析の難易度</strong></td>
<td>低（容易）</td>
<td>中</td>
<td>高（AI/ML 必要）</td>
</tr>
</tbody></table></div>
<blockquote>
<p class="tdesc">📎 <strong>参照</strong>:
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/learn/what-is-structured-data">https://cloud.google.com/learn/what-is-structured-data</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data">https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data</a></p>
</blockquote>
<hr />
` }} />
            
            </SectionCard>
            
            <SectionCard id="gcdl-2-3" idNumber="Deep Dive" title="データの種類と価値創造のアプローチ">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle"><strong>データの種類と価値創造のアプローチ</strong></h3>
<p class="tdesc">企業がデータから新たな価値を創造するためには、主に3つのアプローチが存在する。一つ目は「現在のデータ（Current Data）」の活用である。既存のトランザクションデータや顧客行動履歴を深掘りすることで、業務の最適化やパーソナライゼーションを実現する。二つ目は「新しいデータ（New Data）」の収集である。これまで取得していなかったウェブサイトのクリックストリームや、製品に組み込まれたセンサーからのテレメトリデータを新たに収集し、未知の顧客ニーズや機器の故障予測モデルを構築する。三つ目は「外部データ（External Data）」の調達である。Google Cloud Public Datasetsなどを通じて公開されている気象データ、人口統計、市場トレンドなどの外部データセットを自社の内部データと結合することで、分析のコンテキストを劇的に拡張し、より精度の高い予測を可能にする 。</p>
` }} />
            
            </SectionCard>
        
        </div>
    );
};
