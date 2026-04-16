import React from 'react';
import styles from './Section6.module.css';

import { SectionCard, DiagramSVG, TableComponent } from '../index';

import { SQL_VS_SPANNER, BIGQUERY_FEATURES, DATABASE_COMPARISON, DATABASE_DECISION_MATRIX } from '../../constants';

/**
 * セクション6: データベースの選択
 * RDBとNoSQL、および Cloud SQL, Spanner などのデータベースサービスについて解説します。
 * @returns JSX.Element
 */
export const Section6: React.FC = () => {
    return (
        <div id="s6" className={styles.sgap}>
            <div className={styles.secHead}>
                <div className={`${styles.secNum} ${styles.sn6}`}>06</div>
                <div className={styles.secHeadTxt}>
                    <h2 className={styles.secTitle}>Google Cloud のデータベースサービス</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-6" idNumber="6" title="Google Cloud のデータベースサービス">
                <h3 className={styles.stitle}>6.1 データベース選択の全体像</h3>
                <p className={styles.tdesc}>Google Cloud には多種多様なデータベースサービスがあります。
                適切なサービスを選ぶことが試験の重要なポイントです。</p>
                <pre className="code-block"><code className="language-text">{`データベース選択フロー:

                   RDB が必要？
                   /          \\
                Yes            No（NoSQL）
                /                 \\
    グローバル展開？           データの形式は？
       /       \\              /     |      \\
      Yes       No      ドキュメント 時系列  キャッシュ
      ↓         ↓        ↓        ↓       ↓
   Spanner   Cloud SQL  Firestore Bigtable Memorystore

                   分析・DWH 用途？
                        ↓
                     BigQuery`}</code></pre>

                <h3 className={`${styles.stitle} mt-6`}>6.2 Cloud SQL（マネージドリレーショナルDB）</h3>
                <pre className="code-block"><code className="language-text">{`Cloud SQL とは:

  - MySQL・PostgreSQL・SQL Server のフルマネージドサービス
  - OS パッチ・バックアップ・フェイルオーバーを Google が自動管理
  - 最大 64 vCPU・500 GB メモリ・64 TB ストレージ

ユースケース:
  ✅ 既存のオンプレ MySQL/PostgreSQL をクラウドへ移行
  ✅ Web アプリのバックエンド DB
  ✅ 中規模のトランザクション処理（OLTP）
  ✅ WordPress・Drupal などの CMS

制限・注意点:
  ❌ 単一リージョンのみ（グローバル展開は Spanner が必要）
  ❌ 垂直スケール主体（水平スケールは Cloud Spanner）
  ❌ 数十 TB を超える大規模分析には BigQuery が適切`}</code></pre>

                <h4 className="stitle mt-4">Cloud SQL の高可用性（HA）構成</h4>
                <DiagramSVG viewBox="0 0 600 240">
                    <text x="20" y="30" fill="currentColor" fontWeight="bold">HA 構成なし（シングルゾーン）:</text>
                    <rect x="40" y="50" width="180" height="60" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="130" y="75" textAnchor="middle" fill="currentColor">DB インスタンス</text>
                    <text x="130" y="95" textAnchor="middle" fill="currentColor" fontSize="12">(us-central1-a)</text>
                    <text x="240" y="75" fill="currentColor" fontSize="12">← ゾーン障害で停止</text>
                    <text x="40" y="130" fill="currentColor" fontSize="12">SLA: 99.95%</text>

                    <text x="20" y="160" fill="currentColor" fontWeight="bold">HA 構成あり（マルチゾーン）:</text>
                    <rect x="40" y="180" width="160" height="50" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="120" y="200" textAnchor="middle" fill="currentColor">プライマリ DB</text>
                    <text x="120" y="215" textAnchor="middle" fill="currentColor" fontSize="12">(us-central1-a)</text>

                    <path d="M 210 205 L 250 205" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="260" y="180" width="160" height="50" rx="4" stroke="currentColor" fill="transparent" strokeDasharray="4,4" />
                    <text x="340" y="200" textAnchor="middle" fill="currentColor">スタンバイ DB</text>
                    <text x="340" y="215" textAnchor="middle" fill="currentColor" fontSize="12">(us-central1-b)</text>

                    <text x="440" y="195" fill="currentColor" fontSize="12">ゾーン障害時に自動</text>
                    <text x="440" y="215" fill="currentColor" fontSize="12">フェイルオーバー（60秒）</text>
                    <text x="440" y="235" fill="currentColor" fontSize="12" fontWeight="bold">SLA: 99.99%</text>

                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>6.3 Cloud Spanner（グローバル分散 RDBMS）</h3>
                <DiagramSVG viewBox="0 0 700 200" ariaLabel="Cloud Spanner features diagram">
                    <rect x="10" y="10" width="580" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Cloud Spanner とは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- 世界唯一のグローバルに分散した、強一貫性を持つリレーショナル DB</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- SQL インターフェースを提供しながら、グローバルに水平スケール</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">- SLA: 99.999%（月間ダウンタイム約 26 秒！）</text>
                    
                    <text x="30" y="140" fill="currentColor" fontWeight="bold">ユースケース:</text>
                    <text x="40" y="165" fill="currentColor" fontSize="14">✅ 金融システム（グローバルな取引処理） ✅ ゲームのランキング</text>
                    <text x="40" y="185" fill="currentColor" fontSize="14">✅ グローバル EC の在庫管理（瞬時の一貫性が必要）</text>
                    
                    <text x="30" y="215" fill="currentColor" fontWeight="bold">費用:</text>
                    <text x="80" y="215" fill="currentColor" fontSize="14">❌ 非常に高コスト → グローバル分散が必要な場合のみ選択</text>
                </DiagramSVG>

                <h4 className="stitle mt-4">Cloud SQL vs Cloud Spanner の比較</h4>
                <TableComponent
                    headers={['比較項目', 'Cloud SQL', 'Cloud Spanner']}
                    rows={SQL_VS_SPANNER}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.item}</strong></td>
                            <td>{row.cloudSql}</td>
                            <td>{row.cloudSpanner}</td>
                        </tr>
                    )}
                />

                <h3 className={`${styles.stitle} mt-6`}>6.4 Firestore（NoSQL ドキュメント DB）</h3>
                <pre className="code-block"><code className="language-text">{`Firestore とは:
  - サーバーレスの NoSQL ドキュメントデータベース
  - データを「ドキュメント（JSON 的な形式）」と「コレクション」で管理
  - Firebase と深く統合（モバイル/Web アプリ開発に最適）
  - リアルタイム同期機能（クライアントが自動更新を受け取る）

データモデル例:
  コレクション: users
    ドキュメント: user-12345
      - name: "田中太郎"
      - email: "tanaka@example.com"
      - created_at: 2024-01-01
      - orders: [サブコレクション...]

ユースケース:
  ✅ スマートフォンアプリのバックエンド
  ✅ リアルタイムチャットアプリ
  ✅ ゲームのユーザープロファイル・スコア管理

特徴:
  ✅ スキーマレス（フィールドを自由に追加できる）
  ✅ オフライン対応（接続が切れても動作し、復帰時に同期）
  ✅ 自動スケーリング
  ❌ 大規模な JOIN クエリや集計分析は得意でない`}</code></pre>

                <h3 className={`${styles.stitle} mt-6`}>6.5 Bigtable（NoSQL ワイドカラム DB）</h3>
                <pre className="code-block"><code className="language-text">{`Bigtable とは:
  - Google が内部で Gmail・Google Maps・YouTube に使用してきた DB
  - 非常に大量のデータを超低レイテンシで読み書きできる
  - 単一行キーでアクセス（SQL の JOIN はなし）
  - ペタバイト規模のデータに対応

ユースケース:
  ✅ 時系列データ（IoT センサー・株価・気象データ）
  ✅ 広告データのリアルタイム処理
  ✅ 機械学習の特徴量ストア

特徴:
  ✅ 1秒あたり数百万の読み書き操作に対応
  ✅ ミリ秒以下の低レイテンシ
  ❌ SQL の JOIN・GROUP BY などは使えない
  ❌ 小規模データには向かない（最低 1 TB 程度から真価を発揮）`}</code></pre>

                <h3 className={`${styles.stitle} mt-6`}>6.6 BigQuery（データウェアハウス）</h3>
                <pre className="code-block"><code className="language-text">{`BigQuery とは:
  - Google Cloud のサーバーレスなデータウェアハウス
  - ペタバイト規模のデータを数秒で SQL 分析できる
  - インフラ管理不要（サーバーレス）
  - 使用した分だけ課金（スキャンしたデータ量 or スロット時間）

ユースケース:
  ✅ BI・ダッシュボードのバックエンド（Looker・Looker Studio）
  ✅ アドホッククエリ（思いついたときにその場で分析）
  ✅ ログ分析・監査
  ✅ データレイクの分析エンジン
  ✅ BigQuery ML（SQL でMLモデルを構築）

コスト最適化のポイント:
  - クエリの SELECT * を避ける（必要な列だけ指定）
  - パーティション分割テーブルを使用（フィルタで読み込み量を削減）
  - クラスタリングを活用（よく使うカラムでソート）`}</code></pre>

                <h4 className="stitle mt-4">BigQuery の独自機能</h4>
                <TableComponent
                    headers={['機能', '説明', 'ユースケース']}
                    rows={BIGQUERY_FEATURES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.feature}</strong></td>
                            <td>{row.description}</td>
                            <td>{row.useCase}</td>
                        </tr>
                    )}
                />

                <h3 className={`${styles.stitle} mt-6`}>6.7 Memorystore（インメモリ DB）</h3>
                <DiagramSVG viewBox="0 0 600 180" ariaLabel="Memorystore features diagram">
                    <rect x="10" y="10" width="580" height="160" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Memorystore とは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- マネージドな Redis / Memcached</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- データをメモリ上に保持するため、ミリ秒以下の超低レイテンシ</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">- DB の読み込み負荷を大幅に軽減するキャッシュレイヤー</text>
                    
                    <text x="30" y="135" fill="currentColor" fontWeight="bold">ユースケース:</text>
                    <text x="40" y="155" fill="currentColor" fontSize="14">✅ セッション管理 ✅ ゲームリーダーボード ✅ API キャッシュ</text>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>6.8 AlloyDB（PostgreSQL 互換高性能 DB）</h3>
                <pre className="code-block"><code className="language-text">{`AlloyDB とは:
  - Google が独自設計した PostgreSQL 互換のフルマネージド DB
  - Cloud SQL PostgreSQL より分析クエリが最大 4 倍高速
  - HTAP（Hybrid Transactional/Analytical Processing）対応
  - 完全 PostgreSQL 互換（既存のコード・ツールがそのまま動く）`}</code></pre>

                <h3 className={`${styles.stitle} mt-6`}>6.9 全データベースサービスの比較まとめ</h3>
                <TableComponent
                    headers={['サービス', 'タイプ', '規模', '主な用途', 'キーワード']}
                    rows={DATABASE_COMPARISON}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.service}</strong></td>
                            <td>{row.type}</td>
                            <td>{row.scale}</td>
                            <td>{row.useCase}</td>
                            <td>{row.keyword}</td>
                        </tr>
                    )}
                />

                <blockquote className="sec-quote">
                    <p className={styles.tdesc}>📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/sql/docs">https://cloud.google.com/sql/docs</a><br/>
                    <a href="https://cloud.google.com/spanner/docs">https://cloud.google.com/spanner/docs</a><br/>
                    <a href="https://cloud.google.com/bigquery/docs">https://cloud.google.com/bigquery/docs</a><br/>
                    <a href="https://cloud.google.com/firestore/docs">https://cloud.google.com/firestore/docs</a><br/>
                    <a href="https://cloud.google.com/bigtable/docs">https://cloud.google.com/bigtable/docs</a><br/>
                    <a href="https://cloud.google.com/memorystore/docs">https://cloud.google.com/memorystore/docs</a><br/>
                    <a href="https://cloud.google.com/alloydb/docs">https://cloud.google.com/alloydb/docs</a></p>
                </blockquote>
                <hr className={styles.secHr} />
            </SectionCard>
            
            <SectionCard id="gcdl-2-6" idNumber="Deep Dive" title="リレーショナルデータベースとNoSQLの戦略的活用">
                <h3 className={`${styles.stitle} mt-6`}>リレーショナルデータベースの選定とアーキテクチャ</h3>
                <p className={styles.tdesc}>リレーショナルデータベース（RDBMS）は、データがテーブル、行、列の形式で構造化され、SQLを使用して操作されるシステムである。金融取引や在庫管理など、トランザクションの原子性、一貫性、独立性、永続性（ACID特性）が厳密に求められるユースケースにおいて不可欠である。Google Cloudでは主に二つの強力なRDBMSの選択肢が存在する。</p>
                <p className={styles.tdesc}>一つ目は「Cloud SQL」である。これは、MySQL、PostgreSQL、SQL Serverといったオープンソースおよび商用のデータベースエンジンをフルマネージドで提供するサービスである。データベースのプロビジョニング、バックアップ、パッチ適用、フェイルオーバーといった日常的な運用タスクが自動化されている。アプリケーションのバックエンドとして、データ容量が数十TB未満であり、単一リージョンでの高可用性で十分な一般的なトランザクション処理（OLTP）システムにおいて、最も標準的で推奨される選択肢である。</p>
                <p className={styles.tdesc}>二つ目は「Cloud Spanner」である。これは、リレーショナルデータベースの利点（完全なSQLサポート、厳密なグローバルACID整合性）と、非リレーショナルデータベースの利点（無限の水平スケーリング）を世界で初めて統合した革新的なグローバル分散型データベースである。Cloud SQLが垂直スケーリング（インスタンスのスケールアップ）に限界を持つのに対し、Cloud Spannerはノードを追加するだけでダウンタイムなしに書き込みと読み取りのパフォーマンスを線形にスケールアウトできる。データ量が10TBを大きく超えるシステムや、グローバルな金融決済システム、最大99.999%の可用性が求められるミッションクリティカルな環境において最適なソリューションである。</p>
                <p className={styles.tdesc}>Cloud Spannerのパフォーマンスを最大限に引き出すためのベストプラクティスは、従来の単一ノードRDBMSの常識とは大きく異なる点に注意が必要である。Spannerは背後でデータをキーに基づいて複数のサーバー（スプリット）に分散・パーティショニングする。そのため、タイムスタンプや連続するシーケンス番号（AUTO_INCREMENTなど）を主キー（Primary Key）として使用すると、すべての新しいデータが単一のサーバーに集中して書き込まれる「ホットスポット（Hotspotting）」という現象が発生し、パフォーマンスが著しく低下する。これを回避するためには、UUIDバージョン4などのランダムな値を主キーとして採用するか、連続するキーのビットを反転（Bit-reverse）させて保存空間全体に書き込み負荷を均等に分散させるスキーマ設計が強く推奨される。</p>

                <h3 className={`${styles.stitle} mt-6`}>非リレーショナルデータベース (NoSQL) の戦略的活用</h3>
                <p className={styles.tdesc}>非リレーショナルデータベース（NoSQL）は、厳密なテーブル構造を持たず、柔軟なスキーマを許容することで、極めて大規模なデータの読み書きを驚異的な低レイテンシで処理することに特化している。</p>
                <p className={styles.tdesc}>大規模な分析および運用ワークロード向けに設計されているのが「Cloud Bigtable」である。Bigtableは、ペタバイト規模のデータをミリ秒未満のレイテンシで処理できるフルマネージドのワイドカラム（Wide-column）型NoSQLデータベースである。IoTデバイスから絶え間なく送信されるセンサーデータ、アドテクにおけるリアルタイムのユーザー行動ログ、金融市場の時系列ティッカーデータなど、極端に高いスループットとスケーラビリティが要求されるユースケースに最適である。</p>
                <p className={styles.tdesc}>Bigtableのパフォーマンスは、スキーマ設計、特に「行キー（Row Key）」の設計に完全に依存している。Bigtableのベストプラクティスとして、関連するデータは可能な限り単一の行に格納することが推奨されるが、1行あたりのデータサイズが100MBを超えないように分割する必要がある。また、行キーはメモリとストレージ効率のために4KB以下に短く保つべきである。時系列データを扱う場合は、ハッシュ関数を用いて生成したプレフィックスを行キーの先頭に付加する「キーソルト（Key Salting）」という手法を用いることで、分散ノード全体に書き込み負荷を均等に分散させることがベストプラクティスとして確立されている。</p>
                <p className={styles.tdesc}>モバイルアプリケーションやウェブアプリケーションのバックエンドとして設計されているのが「Firestore」である。Firestoreは、サーバーレスのフルマネージド・ドキュメント型NoSQLデータベースであり、柔軟な階層型データ構造（ドキュメントとコレクション）をサポートしている。クライアントとデータベース間でデータをリアルタイムに同期する機能や、ネットワーク接続が切断された状態でもアプリケーションが動作し続けるオフラインサポート機能を内蔵しているため、チャットアプリ、マルチプレイヤーゲーム、モバイル向けの商品カタログなどに最適である。</p>

                <h3 className={`${styles.stitle} mt-6`}>データベース選定のデシジョン・マトリクス</h3>
                <TableComponent
                    headers={['要件の特性', 'データモデルと整合性', '推奨されるGoogle Cloudサービス', '主なユースケース']}
                    rows={DATABASE_DECISION_MATRIX}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.requirement}</strong></td>
                            <td>{row.dataModel}</td>
                            <td><strong>{row.gcpService}</strong></td>
                            <td>{row.useCase}</td>
                        </tr>
                    )}
                />

                <h3 className={`${styles.stitle} mt-6`}>データベースの移行とモダナイゼーション (Database Migration)</h3>
                <p className={styles.tdesc}>オンプレミスのレガシーデータベースや他のクラウドプロバイダーの環境からGoogle Cloudへの移行は、インフラストラクチャをモダナイズする上で不可避のステップである。この移行プロセスにおける運用上の負担を排除し、安全かつシームレスな移行を実現するサービスが「Database Migration Service (DMS)」である。</p>
            </SectionCard>
        </div>
    );
};
