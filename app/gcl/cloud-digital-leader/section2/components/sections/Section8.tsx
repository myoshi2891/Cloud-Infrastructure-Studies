import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { PUBSUB_USECASES, DATAFLOW_USECASES } from '../../constants';

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
                <h3 className="stitle">8.1 Google Cloud Pub/Sub（メッセージング）</h3>
                <h4 className="stitle mt-4">Pub/Sub とは</h4>
                <p className="tdesc"><strong>Pub/Sub</strong>（パブリッシュ・サブスクライブ）は、
                システム間でメッセージを非同期に送受信するためのサービスです。</p>

                <DiagramSVG viewBox="0 0 700 200">
                    <rect x="10" y="10" width="680" height="180" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Pub/Sub の仕組み（郵便に例えると）:</text>
                    
                    <rect x="50" y="70" width="160" height="50" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="130" y="90" textAnchor="middle" fill="currentColor" fontWeight="bold">パブリッシャー</text>
                    <text x="130" y="110" textAnchor="middle" fill="currentColor" fontSize="12">(送信者・IoT・Web)</text>
                    
                    <path d="M 210 95 L 260 95" stroke="currentColor" markerEnd="url(#arrow)" />
                    
                    <rect x="270" y="70" width="160" height="50" rx="4" stroke="currentColor" fill="var(--color-muted, #f3f4f6)" />
                    <text x="350" y="90" textAnchor="middle" fill="currentColor" fontWeight="bold">Pub/Sub トピック</text>
                    <text x="350" y="110" textAnchor="middle" fill="currentColor" fontSize="12">(郵便局)</text>
                    
                    <path d="M 430 95 L 480 95" stroke="currentColor" markerEnd="url(#arrow)" />
                    
                    <rect x="490" y="70" width="180" height="50" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="580" y="90" textAnchor="middle" fill="currentColor" fontWeight="bold">サブスクライバー</text>
                    <text x="580" y="110" textAnchor="middle" fill="currentColor" fontSize="12">(BigQuery・Cloud Run)</text>
                    
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <h4 className="stitle mt-6">Pub/Sub を使う理由</h4>
                <DiagramSVG viewBox="0 0 700 240">
                    <rect x="10" y="10" width="680" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="var(--color-destructive, red)" fontWeight="bold">Pub/Sub なし（直接連携）の問題:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">注文システム → 在庫DB / 顧客通知 / 分析 DB を直接更新</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">問題: 受信側が1つでも落ちると注文全体が止まる。密結合で変更に弱い。</text>

                    <text x="30" y="125" fill="var(--color-secondary, green)" fontWeight="bold">Pub/Sub ありの解決策:</text>
                    <text x="40" y="150" fill="currentColor" fontSize="14">注文システム → Pub/Sub トピック ─┬─► 在庫サービス</text>
                    <text x="40" y="170" fill="currentColor" fontSize="14">                                    ├─► 通知サービス</text>
                    <text x="40" y="190" fill="currentColor" fontSize="14">                                    └─► 分析サービス</text>
                    <text x="40" y="215" fill="currentColor" fontSize="14">✅ 独立して動作（疎結合） ✅ 他が落ちても影響なし ✅ 拡張が容易</text>
                </DiagramSVG>

                <h4 className="stitle mt-6">Pub/Sub のユースケース</h4>
                <TableComponent
                    headers={['ユースケース', '説明']}
                    rows={PUBSUB_USECASES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.useCase}</strong></td>
                            <td>{row.description}</td>
                        </tr>
                    )}
                />

                <h3 className="stitle mt-6">8.2 Cloud Dataflow（データパイプライン）</h3>
                <h4 className="stitle mt-4">Dataflow とは</h4>
                <p className="tdesc"><strong>Dataflow</strong> は、バッチ処理とストリーミング処理の両方に対応した
                フルマネージドのデータ処理パイプラインサービスです。</p>

                <pre className="code-block"><code className="language-text">{`Dataflow の特徴:
  - Apache Beam の実行エンジン（Beam コードを実行）
  - バッチ処理とストリーミング処理を同一コードで記述できる
  - サーバーレス（インフラ管理不要・自動スケーリング）
  - 処理量に応じて自動的にワーカーを増減

典型的な処理フロー:
  [データソース]      [変換・処理（Dataflow）]      [出力先]

  Pub/Sub    →   フィルタリング           →   BigQuery
  GCS        →   集計・結合              →   Cloud SQL
  Cloud SQL  →   フォーマット変換        →   Pub/Sub`}</code></pre>

                <h4 className="stitle mt-4">Dataflow のユースケース</h4>
                <TableComponent
                    headers={['ユースケース', 'バッチ/ストリーミング', '説明']}
                    rows={DATAFLOW_USECASES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.useCase}</strong></td>
                            <td>{row.type}</td>
                            <td>{row.description}</td>
                        </tr>
                    )}
                />

                <h3 className="stitle mt-6">8.3 Cloud Dataproc（マネージド Hadoop/Spark）</h3>
                <h4 className="stitle mt-4">Dataproc とは</h4>
                <p className="tdesc"><strong>Dataproc</strong> は、Apache Hadoop・Apache Spark クラスタを
                クラウド上で迅速に立ち上げ・管理できるサービスです。</p>

                <pre className="code-block"><code className="language-text">{`Dataproc を選ぶ主な理由:
  1. 既存の Hadoop/Spark ジョブをそのままクラウドへ移行したい
  2. Spark ML（機械学習）を使ったパイプラインを実行したい
  3. オープンソースエコシステム（Hive・Presto等）を使いたい

Dataproc vs Dataflow の違い:
  Dataproc: Hadoop/Spark の既存コードを再利用。クラスタ設定が必要。
  Dataflow: Apache Beam の統一 API。フルサーバーレス。

選択基準:
  既存 Hadoop/Spark コードがある → Dataproc
  新規パイプライン設計（特にストリーミング） → Dataflow`}</code></pre>

                <h3 className="stitle mt-6">8.4 Database Migration Service（データ移行）</h3>
                <DiagramSVG viewBox="0 0 600 160">
                    <rect x="10" y="10" width="580" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Database Migration Service とは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- オンプレ DB を Google Cloud へ移行するサービス</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- 最小限のダウンタイムでデータを移行（継続的なレプリケーション）</text>
                    
                    <text x="30" y="115" fill="currentColor" fontWeight="bold">移行の流れ:</text>
                    <text x="40" y="135" fill="currentColor" fontSize="14">オンプレ DB ──(リアルタイム同期)──► Cloud SQL / AlloyDB</text>
                </DiagramSVG>

                <h3 className="stitle mt-6">8.5 Datastream（変更データキャプチャ）</h3>
                <DiagramSVG viewBox="0 0 600 160">
                    <rect x="10" y="10" width="580" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Datastream とは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- CDC（Change Data Capture）サービス</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- DB の変更をリアルタイムでストリーミングする</text>
                    
                    <text x="30" y="115" fill="currentColor" fontWeight="bold">例:</text>
                    <text x="40" y="135" fill="currentColor" fontSize="14">注文DB（Oracle）の変更をリアルタイムで BigQuery へ反映</text>
                </DiagramSVG>

                <blockquote className="sec-quote">
                    <p className="tdesc">📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/pubsub/docs">https://cloud.google.com/pubsub/docs</a><br/>
                    <a href="https://cloud.google.com/dataflow/docs">https://cloud.google.com/dataflow/docs</a><br/>
                    <a href="https://cloud.google.com/dataproc/docs">https://cloud.google.com/dataproc/docs</a><br/>
                    <a href="https://cloud.google.com/database-migration/docs">https://cloud.google.com/database-migration/docs</a></p>
                </blockquote>
                <hr className="sec-hr" />
            </SectionCard>
            
            <SectionCard id="gcdl-2-8" idNumber="Deep Dive" title="ストリーミング分析アーキテクチャ: Pub/Sub と Dataflow">
                <h3 className="stitle mt-6">ストリーミング分析アーキテクチャ: Pub/Sub と Dataflow</h3>
                <p className="tdesc">現代のビジネスにおいて、データが生成されたその瞬間にインサイトを抽出し、行動に結びつける「リアルタイムストリーミング分析」の重要性はますます高まっている。Google Cloudにおいて、このストリーミング分析のパイプラインは、「Cloud Pub/Sub」と「Cloud Dataflow」の強力な連携によって実現される。</p>
                <p className="tdesc">「Cloud Pub/Sub」は、独立したアプリケーション間でイベントデータを非同期に送受信する、グローバルに分散されたフルマネージドのメッセージング指向ミドルウェアである。データの送信者（パブリッシャー）と受信者（サブスクライバー）を論理的に切り離し（Decoupling）、突発的なトラフィックのスパイク（急増）が発生した場合でも、オートスケーリングによってデータを確実に取り込み、バッファリングする「ショックアブソーバー（緩衝材）」の役割を果たす。</p>
                <p className="tdesc">一方、「Cloud Dataflow」は、Apache Beam SDKを基盤とするサーバーレスのデータ処理サービスである。ストリーミングデータとバッチデータの両方を全く同じプログラミングモデルで処理でき、Pub/Subからリアルタイムに送られてくるメッセージを抽出、変換、集計（ETL）し、最終的な分析先であるBigQueryなどにロードする役割を担う。Dataflowは、データの到着遅延を処理するウォーターマーク機能や、ウィンドウ処理機能に優れている。</p>
                <p className="tdesc">このPub/SubとDataflowを統合して堅牢なストリーミングパイプラインを構築する際には、システムアーキテクチャにおける重要なベストプラクティスを遵守する必要がある。</p>
                <p className="tdesc">第一に、「Exactly-once（1回限り）処理」の重複排除メカニズムの競合を避けることである。Dataflowは、パイプライン内で独自のメカニズムを用いてメッセージの重複を排除し、強固なExactly-onceセマンティクスを保証している。そのため、データソースであるPub/Sub側の機能として提供されている「Exactly-once配信」を有効にしてDataflowと接続することは推奨されない。両方のシステムで厳密な配信保証を行おうとすると、並列処理できるメッセージ数が著しく制限され、パイプライン全体のパフォーマンス低下やスループットの悪化を招くためである。</p>
                <p className="tdesc">第二に、システムコストとレイテンシの最適化である。もしビジネス要件として、後段のシステム（例えばBigQuery側）でデータの重複を許容できる、あるいは独自に重複排除を行える設計であるならば、DataflowのストリーミングモードをデフォルトのExactly-onceから「At-least-once（少なくとも1回）」モードに変更することが推奨される。これにより、内部的な重複排除処理のオーバーヘッドが削減され、処理レイテンシの向上とコンピューティングコストの大幅な削減を実現できる。</p>
                <p className="tdesc">第三に、Pub/Subのサブスクリプションとデッドレタートピックの適切な構成である。一つのPub/Subサブスクリプションを複数のDataflowパイプラインで共有して読み取ることは避けるべきである。これを実行すると、データが非決定的に各パイプラインに分割されてしまい、重複メッセージの発生やウォーターマーク処理の遅延、オートスケーリングの非効率化を引き起こすため、必ずパイプラインごとに独立したサブスクリプションを作成する必要がある。また、処理に失敗したメッセージを退避させるためのPub/Subの「デッドレタートピック」機能は、Dataflowのソースとして設定するべきではない。Dataflowはワーカーのシャットダウンなどの内部的な理由により、パイプラインのコード自体にエラーがなくてもPub/Subに対して否定応答（NACK）を返すことがあるため、正常なメッセージまで誤ってデッドレタートピックに送られてしまうリスクがあるからだ。</p>
                <p className="tdesc">さらに、稼働中のDataflowパイプラインにおいて、Pub/Subの過去の特定時点に巻き戻してデータを再読み込みする機能（Pub/Sub Seek）を使用することは推奨されない。ウォーターマークのロジックが破綻し、大量のメッセージの重複や欠落を引き起こす原因となる。データを再処理する必要がある場合は、サブスクリプションのスナップショットを作成し、新しいサブスクリプションをそこから派生させた上で、既存のパイプラインをドレイン（安全な停止）し、新しいサブスクリプションをソースとして新規パイプラインを立ち上げるというワークフローがベストプラクティスである。</p>
            </SectionCard>
        </div>
    );
};