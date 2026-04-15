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
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">3.1 3 種類のデータ形式</h3>
<p class="tdesc mb-4 leading-relaxed">データは形式によって 3 種類に分類されます。
試験では「どのデータ形式にどのサービスが適切か」が問われます。</p>
<pre class="code-block"><code className="language-text">世界中のデータの内訳（概算）:
  構造化データ:    約 10〜20%
  半構造化データ:  約 10〜15%
  非構造化データ:  約 70〜80%   ← 最も多い！
</code></pre>
<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">3.2 構造化データ（Structured Data）</h3>
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">定義と特徴</h4>
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
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">構造化データの具体例</h4>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">データ種別</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">具体例</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">格納先（GCP）</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">売上データ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">日付・商品ID・金額・数量</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud SQL / BigQuery</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">顧客マスタ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">顧客ID・氏名・住所・年齢</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud SQL / Spanner</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">在庫データ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">SKU・倉庫・在庫数・入出庫日</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud SQL / Spanner</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">気象データ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">日時・気温・湿度・降水量</td>
<td class="p-3 align-top leading-relaxed text-[13px]">BigQuery / Bigtable</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">株価データ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">銘柄・日時・始値・終値・出来高</td>
<td class="p-3 align-top leading-relaxed text-[13px]">BigQuery / Bigtable</td>
</tr>
</tbody></table></div>
<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">3.3 非構造化データ（Unstructured Data）</h3>
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">定義と特徴</h4>
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
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">非構造化データの具体例</h4>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">データ種別</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">具体例</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">格納先（GCP）</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">分析方法</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">テキスト</td>
<td class="p-3 align-top leading-relaxed text-[13px]">メール・SNS 投稿・レビュー</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Natural Language API</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">画像</td>
<td class="p-3 align-top leading-relaxed text-[13px]">商品写真・医療画像・衛星写真</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Vision API</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">動画</td>
<td class="p-3 align-top leading-relaxed text-[13px]">監視カメラ・広告・教育動画</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Video Intelligence API</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">音声</td>
<td class="p-3 align-top leading-relaxed text-[13px]">コールセンター録音・ポッドキャスト</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Speech-to-Text API</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">PDF</td>
<td class="p-3 align-top leading-relaxed text-[13px]">契約書・請求書・レポート</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Document AI</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">ログ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Webサーバーログ・アプリログ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Logging / GCS</td>
<td class="p-3 align-top leading-relaxed text-[13px]">BigQuery</td>
</tr>
</tbody></table></div>
<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">3.4 半構造化データ（Semi-Structured Data）</h3>
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">定義と特徴</h4>
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
<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">3.5 データ形式の比較まとめ</h3>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">比較項目</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">構造化</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">半構造化</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">非構造化</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>例</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">CSV・RDB テーブル</td>
<td class="p-3 align-top leading-relaxed text-[13px]">JSON・XML・CSV</td>
<td class="p-3 align-top leading-relaxed text-[13px]">画像・動画・音声・PDF</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>スキーマ</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">固定・厳格</td>
<td class="p-3 align-top leading-relaxed text-[13px]">柔軟</td>
<td class="p-3 align-top leading-relaxed text-[13px]">なし</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>検索方法</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">SQL</td>
<td class="p-3 align-top leading-relaxed text-[13px]">JSONPath・SQL</td>
<td class="p-3 align-top leading-relaxed text-[13px]">AI/ML・全文検索</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>GCP ストレージ</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud SQL・BigQuery</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Firestore・BigQuery</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>全データ中の割合</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">~10-20%</td>
<td class="p-3 align-top leading-relaxed text-[13px]">~10-15%</td>
<td class="p-3 align-top leading-relaxed text-[13px]">~70-80%</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>分析の難易度</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">低（容易）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">中</td>
<td class="p-3 align-top leading-relaxed text-[13px]">高（AI/ML 必要）</td>
</tr>
</tbody></table></div>
<blockquote class="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted)] mb-4">
<p class="tdesc mb-4 leading-relaxed">📎 <strong>参照</strong>:
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/learn/what-is-structured-data">https://cloud.google.com/learn/what-is-structured-data</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data">https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data</a></p>
</blockquote>
<hr class="my-8 border-[var(--color-border)]" />
` }} />
            
            </SectionCard>
            
            <SectionCard id="gcdl-2-3" idNumber="Deep Dive" title="データの種類と価値創造のアプローチ">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6"><strong>データの種類と価値創造のアプローチ</strong></h3>
<p class="tdesc mb-4 leading-relaxed">企業がデータから新たな価値を創造するためには、主に3つのアプローチが存在する。一つ目は「現在のデータ（Current Data）」の活用である。既存のトランザクションデータや顧客行動履歴を深掘りすることで、業務の最適化やパーソナライゼーションを実現する。二つ目は「新しいデータ（New Data）」の収集である。これまで取得していなかったウェブサイトのクリックストリームや、製品に組み込まれたセンサーからのテレメトリデータを新たに収集し、未知の顧客ニーズや機器の故障予測モデルを構築する。三つ目は「外部データ（External Data）」の調達である。Google Cloud Public Datasetsなどを通じて公開されている気象データ、人口統計、市場トレンドなどの外部データセットを自社の内部データと結合することで、分析のコンテキストを劇的に拡張し、より精度の高い予測を可能にする 。</p>
` }} />
            
            </SectionCard>
        
        </div>
    );
};
