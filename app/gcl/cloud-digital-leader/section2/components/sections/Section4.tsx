import React, { useId } from 'react';
import styles from './Section4.module.css';
import baseStyles from './SectionBase.module.css';

import { SectionCard, DiagramSVG } from '../index';

/**
 * セクション4: データライフサイクル
 * データの収集、保存、処理、分析、活用と、バッチ/ストリーミング処理について解説します。
 * @returns JSX.Element
 */
export const Section4: React.FC = () => {
    const markerId = useId();
    return (
        <div id="s4" className={baseStyles.sgap}>
            <div className={baseStyles.secHead}>
                <div className={`${baseStyles.secNum} ${styles.sn4}`}>04</div>
                <div className={baseStyles.secHeadTxt}>
                    <h2 className={baseStyles.secTitle}>データのライフサイクルとパイプライン</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-4" idNumber="4" title="データのライフサイクルとパイプライン">
                <h3 className={baseStyles.stitle}>4.1 データライフサイクルの全体像</h3>
                <p className={baseStyles.tdesc}>データは「生まれてから消えるまで」に複数のステージを経ます。
                各ステージに適切な Google Cloud サービスを対応させることが重要です。</p>

                <DiagramSVG viewBox="0 0 700 250" ariaLabel="データライフサイクル図: 収集・取り込み (Pub/Sub, Transfer Service) → 処理・変換 (Dataflow, Dataproc) → 保存 (BigQuery, Cloud SQL, Bigtable) → 分析 (BigQuery, Vertex AI) → 可視化 (Looker)">
                    <rect x="10" y="40" width="120" height="150" rx="8" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="70" y="60" textAnchor="middle" fill="currentColor" fontWeight="bold">収集・取り込み</text>
                    <text x="70" y="80" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.8">Ingest</text>
                    <text x="70" y="110" textAnchor="middle" fill="currentColor" fontSize="12">Pub/Sub</text>
                    <text x="70" y="130" textAnchor="middle" fill="currentColor" fontSize="12">Transfer</text>
                    <text x="70" y="150" textAnchor="middle" fill="currentColor" fontSize="12">Service</text>
                    <text x="70" y="170" textAnchor="middle" fill="currentColor" fontSize="12">Storage</text>
                    <path d="M 130 115 L 150 115" stroke="currentColor" markerEnd={`url(#${markerId})`} />

                    <rect x="150" y="40" width="120" height="150" rx="8" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="210" y="60" textAnchor="middle" fill="currentColor" fontWeight="bold">処理・変換</text>
                    <text x="210" y="80" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.8">Process</text>
                    <text x="210" y="110" textAnchor="middle" fill="currentColor" fontSize="12">Dataflow</text>
                    <text x="210" y="130" textAnchor="middle" fill="currentColor" fontSize="12">Dataproc</text>
                    <text x="210" y="150" textAnchor="middle" fill="currentColor" fontSize="12">Cloud Run</text>
                    <text x="210" y="170" textAnchor="middle" fill="currentColor" fontSize="12">Cloud Functions</text>
                    <path d="M 270 115 L 290 115" stroke="currentColor" markerEnd={`url(#${markerId})`} />

                    <rect x="290" y="40" width="120" height="150" rx="8" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="350" y="60" textAnchor="middle" fill="currentColor" fontWeight="bold">保存・格納</text>
                    <text x="350" y="80" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.8">Store</text>
                    <text x="350" y="110" textAnchor="middle" fill="currentColor" fontSize="12">BigQuery</text>
                    <text x="350" y="130" textAnchor="middle" fill="currentColor" fontSize="12">Cloud SQL</text>
                    <text x="350" y="150" textAnchor="middle" fill="currentColor" fontSize="12">Cloud Storage</text>
                    <text x="350" y="170" textAnchor="middle" fill="currentColor" fontSize="12">Bigtable</text>
                    <path d="M 410 115 L 430 115" stroke="currentColor" markerEnd={`url(#${markerId})`} />

                    <rect x="430" y="40" width="120" height="150" rx="8" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="490" y="60" textAnchor="middle" fill="currentColor" fontWeight="bold">分析・クエリ</text>
                    <text x="490" y="80" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.8">Analyze</text>
                    <text x="490" y="110" textAnchor="middle" fill="currentColor" fontSize="12">BigQuery</text>
                    <text x="490" y="130" textAnchor="middle" fill="currentColor" fontSize="12">Vertex AI</text>
                    <text x="490" y="150" textAnchor="middle" fill="currentColor" fontSize="12">BigQuery ML</text>
                    <text x="490" y="170" textAnchor="middle" fill="currentColor" fontSize="12">Looker</text>
                    <path d="M 550 115 L 570 115" stroke="currentColor" markerEnd={`url(#${markerId})`} />

                    <rect x="570" y="40" width="120" height="150" rx="8" stroke="var(--color-secondary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="630" y="60" textAnchor="middle" fill="currentColor" fontWeight="bold">可視化・活用</text>
                    <text x="630" y="80" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.8">Visualize</text>
                    <text x="630" y="110" textAnchor="middle" fill="currentColor" fontSize="12">Looker</text>
                    <text x="630" y="130" textAnchor="middle" fill="currentColor" fontSize="12">Looker Studio</text>
                    <text x="630" y="150" textAnchor="middle" fill="currentColor" fontSize="12">Gemini</text>
                    
                    <defs>
                        <marker id={markerId} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <h3 className={`${baseStyles.stitle} mt-6`}>4.2 バッチ処理 vs ストリーミング処理</h3>
                <p className={baseStyles.tdesc}>データの処理方式には主に 2 種類あります。
                どちらを選ぶかはビジネス要件によって決まります。</p>

                <pre className="code-block"><code className="language-text">{`バッチ処理（Batch Processing）:
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

  GCP サービス: Pub/Sub + Dataflow`}</code></pre>

                <h4 className="stitle mt-4">✅ ベストプラクティス: 処理方式の選択</h4>
                <pre className="code-block"><code className="language-yaml">{`バッチ処理を選ぶ場合:
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
  - Dataflow は同一コードでバッチ・ストリーミング両対応`}</code></pre>
                <hr className={baseStyles.secHr} />
            </SectionCard>
        </div>
    );
};
