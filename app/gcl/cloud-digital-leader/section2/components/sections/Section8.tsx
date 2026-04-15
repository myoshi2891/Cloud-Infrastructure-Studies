import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section8: React.FC = () => {
    return (
        <div id="s8" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn8">08</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">データパイプラインとデータ統合</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-8" idNumber="8" title="データパイプラインとデータ統合">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">8.1 Google Cloud Pub/Sub（メッセージング）</h3>
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">Pub/Sub とは</h4>
<p class="tdesc"><strong>Pub/Sub</strong>（パブリッシュ・サブスクライブ）は、
システム間でメッセージを非同期に送受信するためのサービスです。</p>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Pub/Sub の仕組み（郵便に例えると）:

パブリッシャー（送信者）  →  Pub/Sub トピック（郵便局）  →  サブスクライバー（受信者）
   IoT センサー                  events-topic              データウェアハウス（BigQuery）
   Web サーバー                                            アラートシステム（Cloud Run）
   注文システム                                            在庫管理システム`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">Pub/Sub を使う理由</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Pub/Sub なし（直接連携）の問題:
  注文システム → 在庫DB を直接更新
             → 顧客通知を直接送信
             → 分析 DB を直接更新

  問題1: 受信側が 1 つでも落ちると、注文処理全体が止まる
  問題2: 受信側が増えるたびに注文システムを変更する必要がある
  問題3: 受信側の処理が遅いと注文システムも遅くなる

Pub/Sub ありの解決策:
  注文システム → Pub/Sub トピック（ここまでが注文システムの責務）
                   ├─ 在庫サービス（在庫を減らす）
                   ├─ 通知サービス（メール送信）
                   └─ 分析サービス（データ蓄積）

  ✅ 注文システムは Pub/Sub に投稿するだけ → 他が落ちても影響なし
  ✅ 受信側を増やしても注文システムは変更不要
  ✅ 各サービスが独立して動作（疎結合）`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">Pub/Sub のユースケース</h4>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">ユースケース</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">説明</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>IoT データ収集</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">センサーデータをリアルタイムで収集・配信</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>イベント駆動アーキテクチャ</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">マイクロサービス間の非同期メッセージング</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>ストリーミングデータ分析</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">Dataflow へデータを流して分析</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>ログ集約</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">複数サービスのログを一箇所に集める</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>リアルタイム通知</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">特定イベント発生時の即座の通知</td>
</tr>
</tbody></table></div>
<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">8.2 Cloud Dataflow（データパイプライン）</h3>
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">Dataflow とは</h4>
<p class="tdesc"><strong>Dataflow</strong> は、バッチ処理とストリーミング処理の両方に対応した
フルマネージドのデータ処理パイプラインサービスです。</p>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Dataflow の特徴:

  - Apache Beam の実行エンジン（Beam コードを実行）
  - バッチ処理とストリーミング処理を同一コードで記述できる
  - サーバーレス（インフラ管理不要・自動スケーリング）
  - 処理量に応じて自動的にワーカーを増減
  - データ変換の視覚的なパイプライン表示

典型的な処理フロー:
  [データソース]      [変換・処理（Dataflow）]      [出力先]

  Pub/Sub    →   フィルタリング           →   BigQuery
  GCS        →   集計・結合              →   Cloud SQL
  BigQuery   →   機密データのマスキング   →   Cloud Storage
  Cloud SQL  →   フォーマット変換        →   Pub/Sub`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">Dataflow のユースケース</h4>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">ユースケース</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">バッチ/ストリーミング</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">説明</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>ETL パイプライン</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">バッチ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">複数ソースのデータを BigQuery へ投入</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>ログ分析</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">ストリーミング</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Webログをリアルタイムで集計・分析</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>不正検知</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">ストリーミング</td>
<td class="p-3 align-top leading-relaxed text-[13px]">取引データをリアルタイムで分析</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>データ品質チェック</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">バッチ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">データのクレンジング・バリデーション</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>ファイル変換</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">バッチ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">CSV → JSON、Avro への変換</td>
</tr>
</tbody></table></div>
<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">8.3 Cloud Dataproc（マネージド Hadoop/Spark）</h3>
<h4 class="stitle text-[var(--color-foreground)] font-semibold mt-4 mb-2">Dataproc とは</h4>
<p class="tdesc"><strong>Dataproc</strong> は、Apache Hadoop・Apache Spark クラスタを
クラウド上で迅速に立ち上げ・管理できるサービスです。</p>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Dataproc を選ぶ主な理由:

  1. 既存の Hadoop/Spark ジョブをそのままクラウドへ移行したい
  2. Spark ML（機械学習）を使ったパイプラインを実行したい
  3. オープンソースエコシステム（Hive・Presto等）を使いたい

Dataproc vs Dataflow の違い:
  Dataproc:

    - Hadoop/Spark の既存コードを再利用できる
    - より細かいクラスタ設定が可能
    - オープンソース互換性を重視
    - バッチ処理が主な用途

  Dataflow:

    - Apache Beam の統一 API でバッチ・ストリーミング両対応
    - フルサーバーレス（クラスタ管理不要）
    - Google Cloud との統合がより深い
    - ストリーミングもバッチも同じコード

選択基準:
  既存 Hadoop/Spark コードがある → Dataproc
  新規パイプライン設計（特にストリーミング） → Dataflow`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">8.4 Database Migration Service（データ移行）</h3>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Database Migration Service とは:

  - オンプレのデータベースを Google Cloud へ移行するためのサービス
  - 最小限のダウンタイムでデータを移行（継続的なレプリケーション）
  - MySQL・PostgreSQL・Oracle・SQL Server に対応

移行の流れ:
  オンプレ DB ─── 継続レプリケーション ──► Cloud SQL / AlloyDB
  （稼働中）    （差分をリアルタイム同期）   （新環境）

  → 移行が完了したらトラフィックを切り替え
  → ダウンタイムを最小化できる`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">8.5 Datastream（変更データキャプチャ）</h3>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Datastream とは:

  - CDC（Change Data Capture）サービス
  - DB の変更をリアルタイムでストリーミングする
  - Oracle・MySQL・PostgreSQL の変更を BigQuery や GCS へ配信

ユースケース:
  ✅ オンプレ DB の変更をリアルタイムで BigQuery に反映
  ✅ マイクロサービス間のデータ同期
  ✅ 分析 DB のリアルタイム更新

例:
  ECサイトの注文DB（Oracle）
    └─ 注文が入るたびに変更を Datastream がキャプチャ
         └─ BigQuery のリアルタイム分析テーブルへ自動反映
              └─ Looker でリアルタイムの売上ダッシュボードを表示`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<blockquote class="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted)] mb-4">
<p class="tdesc">📎 <strong>参照</strong>:
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/pubsub/docs">https://cloud.google.com/pubsub/docs</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/dataflow/docs">https://cloud.google.com/dataflow/docs</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/dataproc/docs">https://cloud.google.com/dataproc/docs</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/database-migration/docs">https://cloud.google.com/database-migration/docs</a></p>
</blockquote>
<hr />
` }} />
            
            </SectionCard>
            
            <SectionCard id="gcdl-2-8" idNumber="Deep Dive" title="ストリーミング分析アーキテクチャ: Pub/Sub と Dataflow">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6"><strong>ストリーミング分析アーキテクチャ: Pub/Sub と Dataflow</strong></h3>
<p class="tdesc">現代のビジネスにおいて、データが生成されたその瞬間にインサイトを抽出し、行動に結びつける「リアルタイムストリーミング分析」の重要性はますます高まっている 。Google Cloudにおいて、このストリーミング分析のパイプラインは、「Cloud Pub/Sub」と「Cloud Dataflow」の強力な連携によって実現される 。</p>
<p class="tdesc">「Cloud Pub/Sub」は、独立したアプリケーション間でイベントデータを非同期に送受信する、グローバルに分散されたフルマネージドのメッセージング指向ミドルウェアである 。データの送信者（パブリッシャー）と受信者（サブスクライバー）を論理的に切り離し（Decoupling）、突発的なトラフィックのスパイク（急増）が発生した場合でも、オートスケーリングによってデータを確実に取り込み、バッファリングする「ショックアブソーバー（緩衝材）」の役割を果たす 。</p>
<p class="tdesc">一方、「Cloud Dataflow」は、Apache Beam SDKを基盤とするサーバーレスのデータ処理サービスである。ストリーミングデータとバッチデータの両方を全く同じプログラミングモデルで処理でき、Pub/Subからリアルタイムに送られてくるメッセージを抽出、変換、集計（ETL）し、最終的な分析先であるBigQueryなどにロードする役割を担う (<a class="text-blue-400 hover:text-blue-300 underline" href="https://docs.cloud.google.com/dataflow/docs/overview)%E3%80%82Dataflow%E3%81%AF%E3%80%81%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%88%B0%E7%9D%80%E9%81%85%E5%BB%B6%E3%82%92%E5%87%A6%E7%90%86%E3%81%99%E3%82%8B%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%BF%E3%83%BC%E3%83%9E%E3%83%BC%E3%82%AF%E6%A9%9F%E8%83%BD%E3%82%84%E3%80%81%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E5%87%A6%E7%90%86%E6%A9%9F%E8%83%BD%E3%81%AB%E5%84%AA%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%80%82">https://docs.cloud.google.com/dataflow/docs/overview)。Dataflowは、データの到着遅延を処理するウォーターマーク機能や、ウィンドウ処理機能に優れている。</a></p>
<p class="tdesc">このPub/SubとDataflowを統合して堅牢なストリーミングパイプラインを構築する際には、システムアーキテクチャにおける重要なベストプラクティスを遵守する必要がある 。</p>
<p class="tdesc">第一に、「Exactly-once（1回限り）処理」の重複排除メカニズムの競合を避けることである。Dataflowは、パイプライン内で独自のメカニズムを用いてメッセージの重複を排除し、強固なExactly-onceセマンティクスを保証している。そのため、データソースであるPub/Sub側の機能として提供されている「Exactly-once配信」を有効にしてDataflowと接続することは推奨されない 。両方のシステムで厳密な配信保証を行おうとすると、並列処理できるメッセージ数が著しく制限され、パイプライン全体のパフォーマンス低下やスループットの悪化を招くためである 。</p>
<p class="tdesc">第二に、システムコストとレイテンシの最適化である。もしビジネス要件として、後段のシステム（例えばBigQuery側）でデータの重複を許容できる、あるいは独自に重複排除を行える設計であるならば、DataflowのストリーミングモードをデフォルトのExactly-onceから「At-least-once（少なくとも1回）」モードに変更することが推奨される。これにより、内部的な重複排除処理のオーバーヘッドが削減され、処理レイテンシの向上とコンピューティングコストの大幅な削減を実現できる 。</p>
<p class="tdesc">第三に、Pub/Subのサブスクリプションとデッドレタートピックの適切な構成である。一つのPub/Subサブスクリプションを複数のDataflowパイプラインで共有して読み取ることは避けるべきである。これを実行すると、データが非決定的に各パイプラインに分割されてしまい、重複メッセージの発生やウォーターマーク処理の遅延、オートスケーリングの非効率化を引き起こすため、必ずパイプラインごとに独立したサブスクリプションを作成する必要がある 。また、処理に失敗したメッセージを退避させるためのPub/Subの「デッドレタートピック」機能は、Dataflowのソースとして設定するべきではない。Dataflowはワーカーのシャットダウンなどの内部的な理由により、パイプラインのコード自体にエラーがなくてもPub/Subに対して否定応答（NACK）を返すことがあるため、正常なメッセージまで誤ってデッドレタートピックに送られてしまうリスクがあるからだ 。</p>
<p class="tdesc">さらに、稼働中のDataflowパイプラインにおいて、Pub/Subの過去の特定時点に巻き戻してデータを再読み込みする機能（Pub/Sub Seek）を使用することは推奨されない。ウォーターマークのロジックが破綻し、大量のメッセージの重複や欠落を引き起こす原因となる。データを再処理する必要がある場合は、サブスクリプションのスナップショットを作成し、新しいサブスクリプションをそこから派生させた上で、既存のパイプラインをドレイン（安全な停止）し、新しいサブスクリプションをソースとして新規パイプラインを立ち上げるというワークフローがベストプラクティスである 。</p>
` }} />
            
            </SectionCard>
        
        </div>
    );
};
