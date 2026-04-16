import React from 'react';
import styles from './Section7.module.css';

import { SectionCard, DiagramSVG, TableComponent } from '../index';

import { LOOKER_FEATURES, LOOKER_VS_STUDIO } from '../../constants';

/**
 * セクション7: データ分析と可視化
 * Looker や Looker Studio を用いたデータの可視化と分析について解説します。
 * @returns JSX.Element
 */
export const Section7: React.FC = () => {
    return (
        <div id="s7" className={styles.sgap}>
            <div className={styles.secHead}>
                <div className={`${styles.secNum} ${styles.sn7}`}>07</div>
                <div className={styles.secHeadTxt}>
                    <h2 className={styles.secTitle}>データ分析・BI サービス</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-7" idNumber="7" title="データ分析・BI サービス">
                <h3 className={styles.stitle}>7.1 Looker（エンタープライズ BI プラットフォーム）</h3>
                <h4 className="stitle mt-4">Looker とは</h4>
                <p className={styles.tdesc}><strong>Looker</strong> は、Google Cloud のエンタープライズ向け
                ビジネスインテリジェンス（BI）プラットフォームです。</p>

                <DiagramSVG viewBox="0 0 600 240">
                    <rect x="10" y="10" width="580" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Looker の核心的な考え方: 「真実の唯一の情報源（Single Source of Truth）」</text>
                    
                    <text x="30" y="70" fill="var(--color-destructive, red)" fontWeight="bold">問題: 各部門が独自に Excel でデータを集計 → 数字が合わない！</text>
                    <text x="40" y="95" fill="currentColor" fontSize="14">営業部門: 「今月の売上は 3,000 万円」</text>
                    <text x="40" y="115" fill="currentColor" fontSize="14">経理部門: 「今月の売上は 2,850 万円」</text>
                    <text x="40" y="135" fill="currentColor" fontSize="14">→ どちらが正しい？ → 会議が混乱</text>
                    
                    <text x="30" y="165" fill="var(--color-secondary, green)" fontWeight="bold">Looker の解決策:</text>
                    <text x="40" y="190" fill="currentColor" fontSize="14">- LookML でデータの定義・計算ロジックを一元管理</text>
                    <text x="40" y="210" fill="currentColor" fontSize="14">- 全員が同じ定義でデータを参照 → 信頼できるデータ</text>
                </DiagramSVG>

                <h4 className={`${styles.stitle} mt-6`}>LookML とは</h4>
                <DiagramSVG viewBox="0 0 600 220">
                    <rect x="10" y="10" width="580" height="200" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">LookML（Looker Modeling Language）:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- SQL に似たメタデータ言語</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- データモデルの定義・計算ロジック・関係性を記述する</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">- バージョン管理（Git）に対応</text>
                    
                    <text x="30" y="135" fill="currentColor" fontWeight="bold">例（売上の定義を LookML で表現）:</text>
                    <text x="40" y="160" fill="currentColor" fontSize="13" fontFamily="monospace">measure: total_revenue {'{'}</text>
                    <text x="50" y="180" fill="currentColor" fontSize="13" fontFamily="monospace">type: sum / sql: ${"$"}{"{order_items.sale_price}"} ;;</text>
                    <text x="40" y="200" fill="currentColor" fontSize="13" fontFamily="monospace">{'}'}</text>
                </DiagramSVG>

                <h4 className={`${styles.stitle} mt-6`}>Looker の主な機能</h4>
                <TableComponent
                    headers={['機能', '説明', 'ビジネス価値']}
                    rows={LOOKER_FEATURES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.feature}</strong></td>
                            <td>{row.description}</td>
                            <td>{row.value}</td>
                        </tr>
                    )}
                />

                <h3 className={`${styles.stitle} mt-6`}>7.2 Looker Studio（無料セルフサービス BI）</h3>
                <h4 className="stitle mt-4">Looker Studio とは</h4>
                <p className={styles.tdesc}><strong>Looker Studio</strong>（旧 Google Data Studio）は、
                無料で使えるセルフサービスのダッシュボード作成ツールです。</p>

                <pre className="code-block"><code className="language-text">{`Looker Studio の特徴:
  - 基本機能は無料だが、有償の Looker Studio Pro がある
  - コードなしでドラッグ&ドロップで作成
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
  - + サードパーティコネクタ多数`}</code></pre>

                <h3 className={`${styles.stitle} mt-6`}>7.3 Looker vs Looker Studio の比較</h3>
                <p className={styles.tdesc}>試験で最もよく問われる比較ポイント!</p>

                <TableComponent
                    headers={['比較項目', 'Looker', 'Looker Studio']}
                    rows={LOOKER_VS_STUDIO}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.item}</strong></td>
                            <td>{row.looker}</td>
                            <td>{row.studio}</td>
                        </tr>
                    )}
                />

                <h4 className="stitle mt-4">✅ ベストプラクティス: BI ツール選択</h4>
                <pre className="code-block"><code className="language-yaml">{`Looker を選ぶ場合:
  - 大企業で部門横断の統一されたデータ文化を作りたい
  - データ定義のガバナンスが必要
  - 100人以上がデータを参照する環境
  - アプリに分析を埋め込みたい（Looker API 活用）

Looker Studio を選ぶ場合:
  - 個人・チームレベルの可視化
  - 素早くダッシュボードを作りたい
  - コストをかけられない
  - Google Analytics・広告データの可視化`}</code></pre>

                <blockquote className="sec-quote">
                    <p className={styles.tdesc}>📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/looker/docs">https://cloud.google.com/looker/docs</a><br/>
                    <a href="https://lookerstudio.google.com/">https://lookerstudio.google.com/</a><br/>
                    <a href="https://cloud.google.com/bigquery/docs/bi-engine-intro">https://cloud.google.com/bigquery/docs/bi-engine-intro</a><br/>
                    <a href="https://cloud.google.com/blog/products/data-analytics/analyze-data-across-clouds-with-bigquery-omni">Analyze data across clouds with BigQuery Omni</a><br/>
                    <a href="https://www.squareshift.co/post/optimizing-looker-performance-for-large-scale-data-workloads">Optimizing Looker Performance</a></p>
                </blockquote>
                <hr className={styles.secHr} />
            </SectionCard>
            
            <SectionCard id="gcdl-2-7" idNumber="Deep Dive" title="データの有用性とアクセシビリティの向上 / BigQueryとLooker">
                <p className={styles.tdesc}><strong>2.3 データの有用性とアクセシビリティの向上 (Making Data Useful and Accessible)</strong></p>
                <p className={styles.tdesc}>データは適切に保存されるだけでは価値を生まない。リアルタイムの分析を通じて、組織内のあらゆるユーザーがデータにアクセスし、インサイトを引き出せる状態（データの民主化）を作り出すことが、真のデジタルトランスフォーメーションの要である。</p>

                <h3 className={`${styles.stitle} mt-6`}>BigQuery: サーバーレスデータウェアハウスの真髄</h3>
                <p className={styles.tdesc}>Google Cloudのデータ戦略の中核に位置するのが「BigQuery」である。BigQueryは、ペタバイト規模のデータを扱うサーバーレスのフルマネージド・データウェアハウスであり、機械学習（ML）機能を内蔵した自律型のデータ・トゥ・AIプラットフォームとして機能する。従来のデータウェアハウスのようにインフラストラクチャのサイジングやクラスタの管理、インデックスの作成といった運用タスクは一切不要である。</p>
                <p className={styles.tdesc}>BigQueryのアーキテクチャの最大の強みは、「コンピューティング（クエリの処理能力）」と「ストレージ（データの保存場所）」が物理的かつ論理的に完全に分離されている（Decoupled Architecture）点にある。この分離により、ユーザーは保存しているデータの総量に関係なく、必要な時に必要なだけのコンピューティングリソースを動的にスケールさせてクエリを実行できる。これにより、パフォーマンスのボトルネックが解消されると同時に、使用した分だけ課金されるという極めて高いコスト効率の「OpEx（運用支出）モデル」が実現されている。</p>

                <h3 className={`${styles.stitle} mt-6`}>BigQuery Omni によるマルチクラウド分析の実現</h3>
                <p className={styles.tdesc}>現代のエンタープライズ企業の90%以上が、単一のクラウドプロバイダーに依存しないマルチクラウド戦略を採用している。しかし、その結果としてデータがAmazon Web Services (AWS) やMicrosoft Azureといった異なるクラウド環境にサイロ化されるという新たな課題に直面している。通常、これらの外部クラウドからデータを抽出し、分析のために別の中央プラットフォームに移動させるには、膨大な時間と高額な「ネットワークエグレス（下り）料金」が発生する。</p>
                <p className={styles.tdesc}>このマルチクラウドの課題を根本から解決する革新的なソリューションが「BigQuery Omni」である。BigQuery Omniは、Google Cloudのハイブリッド・マルチクラウドプラットフォームである「Anthos」テクノロジーを基盤としており、BigQueryの強力なクエリエンジンそのものをAWSやAzureの環境内で直接稼働させるアーキテクチャを採用している。</p>
                <p className={styles.tdesc}>BigQuery Omniの最大のビジネス価値は、AWSのAmazon S3やAzure Blob Storageに保存されているデータを、Google Cloudに一切移動またはコピーすることなく、使い慣れたBigQueryのコンソール画面から標準のGoogleSQLを用いて直接クエリできることである。これにより、高額なデータ転送コスト（エグレス料金）を完全に回避しつつ、組織全体に分散したデータセットに対するクロス・クラウド分析（Cross-cloud joins）が可能となり、分散したデータガバナンスのオーバーヘッドを削減しながら、統一された分析体験を実現できる。</p>

                <h3 className={`${styles.stitle} mt-6`}>Looker によるビジネスインテリジェンスとデータの民主化</h3>
                <p className={styles.tdesc}>データが統合・処理された後、それを組織内の誰もがアクセス可能で、視覚的に理解できる「インサイト」へと昇華させるのが、エンタープライズ向けビジネスインテリジェンス（BI）プラットフォームである「Looker」の役割である。</p>
                <p className={styles.tdesc}>Lookerは従来のBIツールとは根本的に異なるアーキテクチャを採用している。従来のツールは、分析のたびにデータベースから手元のBIサーバーにデータを抽出（Extract）してメモリ上に保持する仕組みをとっていたが、これはデータのサイロ化やセキュリティリスク、そしてデータ鮮度の低下（古いデータを見てしまう問題）を引き起こす。Lookerは、データを抽出しない「インデータベース（In-database）アーキテクチャ」を採用している。ユーザーがダッシュボード上でフィルタリングやドリルダウンの操作を行うと、Lookerはその背後で最適化された高パフォーマンスなSQL（GoogleSQLなど）を自動生成し、BigQueryなどのデータウェアハウスに直接クエリを投げる。結果として、ユーザーは常に「唯一の真実の情報源（Single Source of Truth）」となる最新のデータに対し、BigQueryの無限のコンピューティングパワーを利用して分析を行うことができる。</p>
                <p className={styles.tdesc}>Lookerの中核にあるイノベーションが「LookML」と呼ばれるセマンティックモデリング言語である。データエンジニアやアナリストは、LookMLを使用して売上の計算ロジックや「アクティブユーザー」といったビジネス指標の定義を中央でコードとして一元管理する。これにより、経営層、マーケティング、営業といった異なる部門のユーザーがセルフサービスでデータを探索しても、計算ロジックのブレが生じることなく、常に一貫した正しい結果を得ることが可能となる（データの民主化）。</p>
                <p className={styles.tdesc}>大規模なデータワークロードにおけるLookerのパフォーマンス最適化とガバナンスには、いくつかの重要なベストプラクティスが存在する。第一に、数千万行を超えるような巨大なデータセットに対するリアルタイム計算の回避である。行レベルの詳細データを毎回クエリすると、BigQueryの課金とレスポンス遅延が増大する。この問題を解決するために、月次や週次などの単位で事前に集計した「集計テーブル（Pre-Aggregated Data）」を作成し、Lookerの「Aggregate Awareness（集計の認識）」機能を活用することが最も効果的な最適化戦略である。これにより、Lookerはユーザーのクエリが事前集計テーブルで回答可能かどうかを自動的に判断し、適切な場合は軽量なテーブルにクエリをルーティングするため、パフォーマンスが10倍から100倍向上する。</p>
                <p className={styles.tdesc}>第二に、データモデルにおける無駄な処理の削減である。分析に不要なテーブルの結合（Join）は極力制限し、ダッシュボード上のExplore（データ探索領域）を焦点を絞ったシンプルな状態に保つことが重要である。ダッシュボードに配置する要素（タイルやグラフ）の数も重要であり、1つのダッシュボードに25個以上の複雑なクエリタイルを配置すると、ブラウザのメモリリソースを著しく消費し、レンダリング速度が低下するため避けるべきである。</p>
                <p className={styles.tdesc}>第三に、データガバナンスとアクセス制御の最適化である。Lookerでは行レベルのセキュリティ（Row-Level Security）などを柔軟に設定できるが、ユーザーレベルでの複雑なアクセス制御ロジックを多用すると、クエリの実行計画が複雑化し、システム全体のパフォーマンスに悪影響を及ぼす。したがって、ロールベースのアクセス制御（RBAC）を用いて、ユーザーの役割や責任範囲に必要なExploreやフィールドへのアクセス権のみをシンプルに付与し、不必要な大規模データへの偶発的なクエリを制限することが、セキュリティとパフォーマンスの両面におけるベストプラクティスである。</p>
            </SectionCard>
        </div>
    );
};
