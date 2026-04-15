import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section7: React.FC = () => {
    return (
        <div id="s7" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn7">07</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">データ分析・BI サービス</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-7" idNumber="7" title="データ分析・BI サービス">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">7.1 Looker（エンタープライズ BI プラットフォーム）</h3>
<h4 class="stitle">Looker とは</h4>
<p class="tdesc"><strong>Looker</strong> は、Google Cloud のエンタープライズ向け
ビジネスインテリジェンス（BI）プラットフォームです。</p>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Looker の核心的な考え方: 「真実の唯一の情報源（Single Source of Truth）」

問題: 各部門が独自に Excel でデータを集計 → 数字が合わない！
  営業部門: 「今月の売上は 3,000 万円」
  経理部門: 「今月の売上は 2,850 万円」
  → どちらが正しい？ → 会議が混乱

Looker の解決策:

  - LookML という言語でデータの定義・計算ロジックを一元管理
  - 全員が同じ定義（ビジネスロジック）でデータを参照
  - 「売上の定義」は LookML に 1 つだけ存在する

  → 誰が見ても同じ数字、信頼できるデータ`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle">LookML とは</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`LookML（Looker Modeling Language）:

  - SQL に似たメタデータ言語
  - データモデルの定義・計算ロジック・関係性を記述する
  - バージョン管理（Git）に対応

例（売上の定義を LookML で表現）:
  measure: total_revenue {
    type: sum
    sql: \${order_items.sale_price} ;;
    value_format: "¥#,###"
    label: "総売上（税抜）"
  }

→ この定義が変わると、全てのダッシュボードに自動反映される`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle">Looker の主な機能</h4>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">機能</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">説明</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">ビジネス価値</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>ダッシュボード</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">複数の可視化をまとめた画面</td>
<td class="p-3 align-top leading-relaxed text-[13px]">経営状況の一覧把握</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Explore</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">ノーコードでデータを探索</td>
<td class="p-3 align-top leading-relaxed text-[13px]">エンジニアなしで深掘り分析</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Looks</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">保存した可視化レポート</td>
<td class="p-3 align-top leading-relaxed text-[13px]">定期レポートの自動化</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Alerts</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">データ変化時の通知</td>
<td class="p-3 align-top leading-relaxed text-[13px]">異常値・目標達成を即座に把握</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Looker API</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">外部システムとの統合</td>
<td class="p-3 align-top leading-relaxed text-[13px]">アプリへのデータ埋め込み</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Looker Blocks</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">業界別の分析テンプレート</td>
<td class="p-3 align-top leading-relaxed text-[13px]">分析環境の素早い構築</td>
</tr>
</tbody></table></div>
<h3 class="stitle">7.2 Looker Studio（無料セルフサービス BI）</h3>
<h4 class="stitle">Looker Studio とは</h4>
<p class="tdesc"><strong>Looker Studio</strong>（旧 Google Data Studio）は、
無料で使えるセルフサービスのダッシュボード作成ツールです。</p>
<pre class="code-block"><code className="language-text">Looker Studio の特徴:

  - 基本機能は無料だが、有償の Looker Studio Pro（例: \$9/ユーザー/プロジェクト/月）などの有料オプションがある
  - コードなしでドラッグ&amp;ドロップで作成
  - 30 以上のデータソースと接続可能
  - 共有・コメント機能（Google ドキュメントと同じ感覚）
  - URL で共有・埋め込み表示が可能

接続できるデータソース（主要なもの）:

  - Google Analytics（Web アクセス分析）
  - Google Ads（広告データ）
  - BigQuery（大規模データ）
  - Google Sheets（スプレッドシート）
  - Cloud SQL / MySQL / PostgreSQL
  - YouTube Analytics
  - + サードパーティコネクタ多数
</code></pre>
<h3 class="stitle">7.3 Looker vs Looker Studio の比較</h3>
<pre class="code-block"><code className="language-text">試験で最もよく問われる比較ポイント!
</code></pre>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">比較項目</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">Looker</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">Looker Studio</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>費用</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">有料（エンタープライズライセンス）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">無料</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>対象ユーザー</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">データチーム・大企業</td>
<td class="p-3 align-top leading-relaxed text-[13px]">個人・中小企業・マーケター</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>データモデル</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">LookML で厳密に定義</td>
<td class="p-3 align-top leading-relaxed text-[13px]">柔軟だが各人が独自定義</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>真実の唯一性</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">◎ 保証できる</td>
<td class="p-3 align-top leading-relaxed text-[13px]">△ 担保が難しい</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>スケール</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">大規模な組織向け</td>
<td class="p-3 align-top leading-relaxed text-[13px]">小〜中規模</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>主な用途</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">全社的な BI 基盤</td>
<td class="p-3 align-top leading-relaxed text-[13px]">アドホックな可視化・個人レポート</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>API</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">あり（外部連携可能）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">限定的</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Git 統合</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">あり（バージョン管理）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">なし</td>
</tr>
</tbody></table></div>
<h4 class="stitle">✅ ベストプラクティス: BI ツール選択</h4>
<pre class="code-block"><code className="language-yaml">Looker を選ぶ場合:
  - 大企業で部門横断の統一されたデータ文化を作りたい
  - データ定義のガバナンスが必要
  - 100人以上がデータを参照する環境
  - アプリに分析を埋め込みたい（Looker API 活用）

Looker Studio を選ぶ場合:
  - 個人・チームレベルの可視化
  - 素早くダッシュボードを作りたい
  - コストをかけられない
  - Google Analytics・広告データの可視化
</code></pre>
<blockquote class="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted)] mb-4">
<p class="tdesc">📎 <strong>参照</strong>:
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/looker/docs">https://cloud.google.com/looker/docs</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://lookerstudio.google.com/">https://lookerstudio.google.com/</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/bigquery/docs/bi-engine-intro">https://cloud.google.com/bigquery/docs/bi-engine-intro</a></p>
</blockquote>
<hr />
` }} />
            
            </SectionCard>
            
            <SectionCard id="gcdl-2-7" idNumber="Deep Dive" title="データの有用性とアクセシビリティの向上 / BigQueryとLooker">
                
                <div dangerouslySetInnerHTML={{ __html: `<p class="tdesc"><strong>2.3 データの有用性とアクセシビリティの向上 (Making Data Useful and Accessible)</strong></p>
<p class="tdesc">データは適切に保存されるだけでは価値を生まない。リアルタイムの分析を通じて、組織内のあらゆるユーザーがデータにアクセスし、インサイトを引き出せる状態（データの民主化）を作り出すことが、真のデジタルトランスフォーメーションの要である 。</p>
<h3 class="stitle"><strong>BigQuery: サーバーレスデータウェアハウスの真髄</strong></h3>
<p class="tdesc">Google Cloudのデータ戦略の中核に位置するのが「BigQuery」である。BigQueryは、ペタバイト規模のデータを扱うサーバーレスのフルマネージド・データウェアハウスであり、機械学習（ML）機能を内蔵した自律型のデータ・トゥ・AIプラットフォームとして機能する 。従来のデータウェアハウスのようにインフラストラクチャのサイジングやクラスタの管理、インデックスの作成といった運用タスクは一切不要である。</p>
<p class="tdesc">BigQueryのアーキテクチャの最大の強みは、「コンピューティング（クエリの処理能力）」と「ストレージ（データの保存場所）」が物理的かつ論理的に完全に分離されている（Decoupled Architecture）点にある 。この分離により、ユーザーは保存しているデータの総量に関係なく、必要な時に必要なだけのコンピューティングリソースを動的にスケールさせてクエリを実行できる。これにより、パフォーマンスのボトルネックが解消されると同時に、使用した分だけ課金されるという極めて高いコスト効率の「OpEx（運用支出）モデル」が実現されている 。</p>
<h3 class="stitle"><strong>BigQuery Omni によるマルチクラウド分析の実現</strong></h3>
<p class="tdesc">現代のエンタープライズ企業の90%以上が、単一のクラウドプロバイダーに依存しないマルチクラウド戦略を採用している。しかし、その結果としてデータがAmazon Web Services (AWS) やMicrosoft Azureといった異なるクラウド環境にサイロ化されるという新たな課題に直面している 。通常、これらの外部クラウドからデータを抽出し、分析のために別の中央プラットフォームに移動させるには、膨大な時間と高額な「ネットワークエグレス（下り）料金」が発生する。</p>
<p class="tdesc">このマルチクラウドの課題を根本から解決する革新的なソリューションが「BigQuery Omni」である 。BigQuery Omniは、Google Cloudのハイブリッド・マルチクラウドプラットフォームである「Anthos」テクノロジーを基盤としており、BigQueryの強力なクエリエンジンそのものをAWSやAzureの環境内で直接稼働させるアーキテクチャを採用している (<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/blog/products/data-analytics/analyze-data-across-clouds-with-bigquery-omni)%E3%80%82">https://cloud.google.com/blog/products/data-analytics/analyze-data-across-clouds-with-bigquery-omni)。</a></p>
<p class="tdesc">BigQuery Omniの最大のビジネス価値は、AWSのAmazon S3やAzure Blob Storageに保存されているデータを、Google Cloudに一切移動またはコピーすることなく、使い慣れたBigQueryのコンソール画面から標準のGoogleSQLを用いて直接クエリできることである 。これにより、高額なデータ転送コスト（エグレス料金）を完全に回避しつつ、組織全体に分散したデータセットに対するクロス・クラウド分析（Cross-cloud joins）が可能となり、分散したデータガバナンスのオーバーヘッドを削減しながら、統一された分析体験を実現できる 。</p>
<h3 class="stitle"><strong>Looker によるビジネスインテリジェンスとデータの民主化</strong></h3>
<p class="tdesc">データが統合・処理された後、それを組織内の誰もがアクセス可能で、視覚的に理解できる「インサイト」へと昇華させるのが、エンタープライズ向けビジネスインテリジェンス（BI）プラットフォームである「Looker」の役割である 。</p>
<p class="tdesc">Lookerは従来のBIツールとは根本的に異なるアーキテクチャを採用している。従来のツールは、分析のたびにデータベースから手元のBIサーバーにデータを抽出（Extract）してメモリ上に保持する仕組みをとっていたが、これはデータのサイロ化やセキュリティリスク、そしてデータ鮮度の低下（古いデータを見てしまう問題）を引き起こす。Lookerは、データを抽出しない「インデータベース（In-database）アーキテクチャ」を採用している 。ユーザーがダッシュボード上でフィルタリングやドリルダウンの操作を行うと、Lookerはその背後で最適化された高パフォーマンスなSQL（GoogleSQLなど）を自動生成し、BigQueryなどのデータウェアハウスに直接クエリを投げる 。結果として、ユーザーは常に「唯一の真実の情報源（Single Source of Truth）」となる最新のデータに対し、BigQueryの無限のコンピューティングパワーを利用して分析を行うことができる。</p>
<p class="tdesc">Lookerの中核にあるイノベーションが「LookML」と呼ばれるセマンティックモデリング言語である 。データエンジニアやアナリストは、LookMLを使用して売上の計算ロジックや「アクティブユーザー」といったビジネス指標の定義を中央でコードとして一元管理する 。これにより、経営層、マーケティング、営業といった異なる部門のユーザーがセルフサービスでデータを探索しても、計算ロジックのブレが生じることなく、常に一貫した正しい結果を得ることが可能となる（データの民主化）。</p>
<p class="tdesc">大規模なデータワークロードにおけるLookerのパフォーマンス最適化とガバナンスには、いくつかの重要なベストプラクティスが存在する 。
第一に、数千万行を超えるような巨大なデータセットに対するリアルタイム計算の回避である。行レベルの詳細データを毎回クエリすると、BigQueryの課金とレスポンス遅延が増大する。この問題を解決するために、月次や週次などの単位で事前に集計した「集計テーブル（Pre-Aggregated Data）」を作成し、Lookerの「Aggregate Awareness（集計の認識）」機能を活用することが最も効果的な最適化戦略である 。これにより、Lookerはユーザーのクエリが事前集計テーブルで回答可能かどうかを自動的に判断し、適切な場合は軽量なテーブルにクエリをルーティングするため、パフォーマンスが10倍から100倍向上する (<a class="text-blue-400 hover:text-blue-300 underline" href="https://www.squareshift.co/post/optimizing-looker-performance-for-large-scale-data-workloads)%E3%80%82">https://www.squareshift.co/post/optimizing-looker-performance-for-large-scale-data-workloads)。</a></p>
<p class="tdesc">第二に、データモデルにおける無駄な処理の削減である。分析に不要なテーブルの結合（Join）は極力制限し、ダッシュボード上のExplore（データ探索領域）を焦点を絞ったシンプルな状態に保つことが重要である 。ダッシュボードに配置する要素（タイルやグラフ）の数も重要であり、1つのダッシュボードに25個以上の複雑なクエリタイルを配置すると、ブラウザのメモリリソースを著しく消費し、レンダリング速度が低下するため避けるべきである 。</p>
<p class="tdesc">第三に、データガバナンスとアクセス制御の最適化である。Lookerでは行レベルのセキュリティ（Row-Level Security）などを柔軟に設定できるが、ユーザーレベルでの複雑なアクセス制御ロジックを多用すると、クエリの実行計画が複雑化し、システム全体のパフォーマンスに悪影響を及ぼす 。したがって、ロールベースのアクセス制御（RBAC）を用いて、ユーザーの役割や責任範囲に必要なExploreやフィールドへのアクセス権のみをシンプルに付与し、不必要な大規模データへの偶発的なクエリを制限することが、セキュリティとパフォーマンスの両面におけるベストプラクティスである 。</p>
` }} />
            
            </SectionCard>
        
        </div>
    );
};
