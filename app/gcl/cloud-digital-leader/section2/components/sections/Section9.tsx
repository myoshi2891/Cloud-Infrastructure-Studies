import React from 'react';
import { SectionCard, DiagramSVG } from '../index';

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
                <h3 className="stitle">9.1 データアーキテクチャの全体像</h3>
                <h4 className="stitle mt-4">データレイクとデータウェアハウス</h4>
                <pre className="code-block"><code className="language-text">{`データレイク（Data Lake）:
  - あらゆる形式の生データを大量に保管する場所
  - スキーマ定義なし（スキーマオンリード）
  - Cloud Storage が中心
  - 将来の使い方を決めていないデータも保存できる

データウェアハウス（Data Warehouse）:
  - 分析のために構造化・整理されたデータを格納する場所
  - スキーマ定義あり（スキーマオンライト）
  - BigQuery が中心
  - BI・レポート・分析に最適化されている

データレイクハウス（Data Lakehouse）:
  - データレイクの柔軟性 + データウェアハウスの分析性能を兼ね備える
  - BigQuery のストレージに生データも分析データも保存
  - Google Cloud ではこのアーキテクチャを推奨`}</code></pre>

                <h3 className="stitle mt-6">9.2 代表的なデータパイプラインアーキテクチャ</h3>
                <h4 className="stitle mt-4">パターン A: バッチ分析パイプライン</h4>
                <DiagramSVG viewBox="0 0 700 160">
                    <text x="30" y="30" fill="currentColor" fontWeight="bold">[データソース]</text>
                    <text x="230" y="30" fill="currentColor" fontWeight="bold">[転送・変換]</text>
                    <text x="430" y="30" fill="currentColor" fontWeight="bold">[分析・可視化]</text>

                    <rect x="30" y="50" width="100" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="80" y="70" textAnchor="middle" fill="currentColor" fontSize="12">業務DB</text>
                    
                    <path d="M 140 65 L 210 65" stroke="currentColor" markerEnd="url(#arrow)" />
                    
                    <rect x="230" y="50" width="100" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="280" y="70" textAnchor="middle" fill="currentColor" fontSize="12">Dataflow</text>

                    <path d="M 340 65 L 410 65" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="430" y="50" width="100" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="480" y="70" textAnchor="middle" fill="currentColor" fontSize="12">BigQuery</text>

                    <path d="M 540 65 L 590 65" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="600" y="50" width="80" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="640" y="70" textAnchor="middle" fill="currentColor" fontSize="12">Looker</text>

                    <text x="30" y="110" fill="currentColor" fontSize="13">特徴:</text>
                    <text x="40" y="130" fill="currentColor" fontSize="13">- 毎晩深夜に前日分のデータを一括処理。コスト最適。リアルタイム性不要な分析に最適。</text>

                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <h4 className="stitle mt-4">パターン B: リアルタイムストリーミングパイプライン</h4>
                <DiagramSVG viewBox="0 0 700 160">
                    <text x="30" y="30" fill="currentColor" fontWeight="bold">[イベント発生]</text>
                    <text x="180" y="30" fill="currentColor" fontWeight="bold">[ストリーミング]</text>
                    <text x="480" y="30" fill="currentColor" fontWeight="bold">[リアルタイム分析]</text>

                    <rect x="30" y="50" width="100" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="80" y="70" textAnchor="middle" fill="currentColor" fontSize="12">IoT/Webログ</text>
                    
                    <path d="M 140 65 L 160 65" stroke="currentColor" markerEnd="url(#arrow)" />
                    
                    <rect x="180" y="50" width="90" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="225" y="70" textAnchor="middle" fill="currentColor" fontSize="12">Pub/Sub</text>

                    <path d="M 280 65 L 300 65" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="320" y="50" width="90" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="365" y="70" textAnchor="middle" fill="currentColor" fontSize="12">Dataflow</text>

                    <path d="M 420 65 L 460 65" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="480" y="50" width="90" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="525" y="70" textAnchor="middle" fill="currentColor" fontSize="12">BigQuery</text>

                    <path d="M 580 65 L 610 65" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="620" y="50" width="70" height="30" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="655" y="70" textAnchor="middle" fill="currentColor" fontSize="12">Looker</text>

                    <text x="30" y="110" fill="currentColor" fontSize="13">特徴:</text>
                    <text x="40" y="130" fill="currentColor" fontSize="13">- データが発生した瞬間から分析に反映。不正検知やIoT監視に最適。コストは高め。</text>

                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <h4 className="stitle mt-4">パターン C: ハイブリッドパイプライン（最も一般的）</h4>
                <p className="tdesc">リアルタイム（ホットデータ）とバッチ（コールドデータ）の両方を BigQuery に統合して分析。</p>

                <h3 className="stitle mt-6">9.3 データメッシュ（Data Mesh）の考え方</h3>
                <DiagramSVG viewBox="0 0 600 240">
                    <rect x="10" y="10" width="580" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">データメッシュとは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- データを各部門が所有・管理し、公開する考え方</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- 中央のデータチームのボトルネックを解消</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">- Dataplex がデータメッシュ実装を支援</text>
                    
                    <text x="30" y="135" fill="var(--color-destructive, red)" fontWeight="bold">従来型:</text>
                    <text x="40" y="155" fill="currentColor" fontSize="14">各部門 → [中央データチーム（ボトルネック）] → 全社分析</text>

                    <text x="30" y="185" fill="var(--color-secondary, green)" fontWeight="bold">データメッシュ型:</text>
                    <text x="40" y="205" fill="currentColor" fontSize="14">各部門がデータ公開 → [Dataplexで統一管理] → 全社分析</text>
                </DiagramSVG>

                <blockquote className="sec-quote">
                    <p className="tdesc">📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/architecture/data-lifecycle-cloud-best-practices">https://cloud.google.com/architecture/data-lifecycle-cloud-best-practices</a><br/>
                    <a href="https://cloud.google.com/solutions/smart-analytics">https://cloud.google.com/solutions/smart-analytics</a></p>
                </blockquote>
                <hr className="sec-hr" />
            </SectionCard>
        </div>
    );
};