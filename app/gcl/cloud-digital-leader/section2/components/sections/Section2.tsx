import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { TRADITIONAL_VS_DATADRIVEN, ANALYSIS_LEVELS } from '../../constants';

export const Section2: React.FC = () => {
    return (
        <div id="s2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">02</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">データとは何か？ビジネスにおけるデータの価値</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-2" idNumber="2" title="データとは何か？ビジネスにおけるデータの価値">
                
                <h3 className="stitle">2.1 「データ」の本質的な意味</h3>
                <p className="tdesc"><strong>データ</strong>とは、事実・数値・文字・画像・音声など、
                何らかの情報を記録したものです。
                単体では価値が低くても、<strong>分析・組み合わせ・活用</strong>することで
                ビジネス上の洞察（インサイト）と価値を生み出します。</p>

                <DiagramSVG viewBox="0 0 700 200">
                    <rect x="10" y="10" width="120" height="40" rx="4" stroke="var(--color-primary, currentColor)" fill="transparent" />
                    <text x="70" y="35" textAnchor="middle" fill="currentColor">データ</text>
                    <path d="M 140 30 L 160 30" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="170" y="10" width="120" height="40" rx="4" stroke="var(--color-primary, currentColor)" fill="transparent" />
                    <text x="230" y="35" textAnchor="middle" fill="currentColor">情報</text>
                    <path d="M 300 30 L 320 30" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="330" y="10" width="120" height="40" rx="4" stroke="var(--color-primary, currentColor)" fill="transparent" />
                    <text x="390" y="35" textAnchor="middle" fill="currentColor">知識</text>
                    <path d="M 460 30 L 480 30" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="490" y="10" width="120" height="40" rx="4" stroke="var(--color-primary, currentColor)" fill="transparent" />
                    <text x="550" y="35" textAnchor="middle" fill="currentColor">知恵</text>
                    <path d="M 620 30 L 640 30" stroke="currentColor" markerEnd="url(#arrow)" />

                    <rect x="650" y="10" width="120" height="40" rx="4" stroke="var(--color-secondary, currentColor)" fill="var(--color-primary, currentColor)" />
                    <text x="710" y="35" textAnchor="middle" fill="var(--color-background, white)">意思決定</text>
                    
                    <text x="20" y="80" fill="currentColor" fontSize="13">例:</text>
                    <text x="40" y="100" fill="currentColor" fontSize="13">データ:  「23°C」「15:30」「3,847件」</text>
                    <text x="40" y="120" fill="currentColor" fontSize="13">情報:    「今日の午後3時半に気温23°Cで3,847件の注文があった」</text>
                    <text x="40" y="140" fill="currentColor" fontSize="13">知識:    「気温が20°C以上の晴れた午後は注文件数が増える傾向がある」</text>
                    <text x="40" y="160" fill="currentColor" fontSize="13">知恵:    「暑い日の午後に向けて在庫と人員を事前に増やすべき」</text>
                    <text x="40" y="180" fill="currentColor" fontSize="13">意思決定: 「天気予報に連動した自動在庫調整システムを導入する」</text>
                    
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <h3 className="stitle mt-6">2.2 データドリブン経営とは</h3>
                <p className="tdesc"><strong>データドリブン経営</strong>とは、経験・勘・感覚ではなく、
                <strong>データと分析に基づいて意思決定</strong>を行う経営スタイルです。</p>

                <h4 className="stitle mt-4">従来型経営 vs データドリブン経営の比較</h4>
                <TableComponent
                    headers={['比較項目', '従来型（経験・勘）', 'データドリブン']}
                    rows={TRADITIONAL_VS_DATADRIVEN}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.item}</strong></td>
                            <td>{row.traditional}</td>
                            <td>{row.dataDriven}</td>
                        </tr>
                    )}
                />

                <h3 className="stitle mt-6">2.3 データが生み出す 4 種類のビジネス価値</h3>
                <p className="tdesc">データ分析には4つのレベルがあります。
                上位レベルほど高い価値を生み出しますが、より高度な技術が必要です。</p>

                <DiagramSVG viewBox="0 0 600 240">
                    <path d="M 50 220 L 50 20 L 45 30 M 50 20 L 55 30" stroke="currentColor" fill="transparent" />
                    <text x="20" y="25" fill="currentColor" fontSize="12">価値</text>

                    <path d="M 50 220 L 550 220 L 540 215 M 550 220 L 540 225" stroke="currentColor" fill="transparent" />
                    <text x="560" y="225" fill="currentColor" fontSize="12">複雑さ</text>

                    <circle cx="100" cy="180" r="4" fill="var(--color-primary, currentColor)" />
                    <text x="120" y="175" fill="currentColor" fontWeight="bold">① 記述的分析 (Descriptive)</text>
                    <text x="120" y="195" fill="currentColor" fontSize="12">「何が起きたか？」(例: 売上集計)</text>

                    <circle cx="200" cy="130" r="4" fill="var(--color-primary, currentColor)" />
                    <text x="220" y="125" fill="currentColor" fontWeight="bold">② 診断的分析 (Diagnostic)</text>
                    <text x="220" y="145" fill="currentColor" fontSize="12">「なぜ起きたか？」(例: 要因分析)</text>

                    <circle cx="300" cy="80" r="4" fill="var(--color-primary, currentColor)" />
                    <text x="320" y="75" fill="currentColor" fontWeight="bold">③ 予測的分析 (Predictive)</text>
                    <text x="320" y="95" fill="currentColor" fontSize="12">「次に何が起きるか？」(例: 需要予測)</text>

                    <circle cx="400" cy="30" r="4" fill="var(--color-primary, currentColor)" />
                    <text x="420" y="25" fill="currentColor" fontWeight="bold">④ 処方的分析 (Prescriptive)</text>
                    <text x="420" y="45" fill="currentColor" fontSize="12">「何をすべきか？」(例: 自動発注AI)</text>

                    <path d="M 100 180 L 200 130 L 300 80 L 400 30" stroke="var(--color-primary, currentColor)" strokeDasharray="4,4" fill="transparent" />
                </DiagramSVG>

                <h4 className="stitle mt-4">各分析レベルの具体例（EC サイトの場合）</h4>
                <TableComponent
                    headers={['レベル', '問い', '分析の例', '使うツール']}
                    rows={ANALYSIS_LEVELS}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td>{row.level}</td>
                            <td>{row.question}</td>
                            <td>{row.example}</td>
                            <td>{row.tool}</td>
                        </tr>
                    )}
                />

                <blockquote className="sec-quote">
                    <p className="tdesc">📎 <strong>参照</strong>: Google Cloud データ分析ソリューション<br/>
                    <a href="https://cloud.google.com/solutions/smart-analytics">https://cloud.google.com/solutions/smart-analytics</a><br/>
                    <a href="https://cloud.google.com/bigquery/docs/introduction">https://cloud.google.com/bigquery/docs/introduction</a></p>
                </blockquote>
                <hr className="sec-hr" />
            </SectionCard>
            
            <SectionCard id="gcdl-2-2" idNumber="Deep Dive" title="データの価値 (The Value of Data)">
                <h3 className="stitle">Google Cloud Digital Leader: セクション 2「データ トランスフォーメーションの探求」完全解説レポート</h3>
                <h4 className="stitle mt-4">はじめに：データトランスフォーメーションとクラウドのパラダイムシフト</h4>
                <p className="tdesc">現代のエンタープライズビジネスにおいて、データは単なる記録の蓄積から、組織の競争優位性を決定づける中核的な戦略資産へと進化を遂げている。Google Cloud Digital Leader（CDL）認定試験は、クラウドテクノロジーの基礎と、Google Cloudのコア製品が組織の目標達成にどのように貢献するかを実証するための資格である。<br/>
                この試験全体の約16%を占める「セクション 2: Google Cloud によるデータ トランスフォーメーションの探求（Exploring Data Transformation with Google Cloud）」は、データからビジネス価値を解き放ち、新たな顧客体験を創出するためのアーキテクチャとベストプラクティスの理解を問う非常に重要な領域である。</p>
                <p className="tdesc">オンプレミス環境からクラウドへの移行は、単なるインフラストラクチャの置き換えではない。これは、多額の初期投資を必要とする資本的支出（CapEx）から、使用した分だけ支払う運用支出（OpEx）への財務的なシフトを意味し、総所有コスト（TCO）の最適化とビジネスの俊敏性向上をもたらす。本レポートでは、CDL試験のセクション2の公式ガイドラインに沿って、「2.1 データの価値」「2.2 Google Cloud データマネジメントソリューション」「2.3 データの有用性とアクセシビリティの向上」という3つの主要テーマをステップバイステップで詳細に解説する。世界トップクラスのインフラエンジニアの視点から、各テクノロジーの背後にあるメカニズム、アーキテクチャの選定基準、そして本番環境で必須となるベストプラクティスを、初学者にも理解しやすい物語性のある構造で網羅的に提示する。</p>
                
                <h4 className="stitle mt-6">2.1 データの価値 (The Value of Data)</h4>
                <p className="tdesc">組織のデジタルトランスフォーメーションにおいて、データはビジネスインサイトを生成し、データ駆動型の意思決定を推進し、最終的に新しい価値を創造するという本質的な役割（Intrinsic Role）を担っている。従来のサイロ化されたシステムでは、データの収集や統合に膨大な時間とリソースが費やされ、真の分析に到達する前にプロジェクトが停滞することが多かった。クラウドテクノロジーは、構造化データからこれまで未活用だった非構造化データに至るまで、あらゆる種類のデータから価値を引き出すスケーラブルなインフラを提供する。</p>
                
                <h4 className="stitle mt-4">データバリューチェーンの概念とライフサイクル</h4>
                <p className="tdesc">データが価値を生み出すプロセスは、工場の組み立てライン（Assembly Line）に例えられる。未加工の原材料である生データがライン上を移動するにつれて、様々なシステムによって処理と文脈の付加が行われ、最終的に人間や機械が具体的な行動を起こすためのインサイトへと変換される。この連続的な価値創造のプロセスは「データバリューチェーン」と呼ばれ、主に4つのライフサイクルステージで構成される。</p>
                <p className="tdesc">第一のステージは「取り込み（Ingest）」である。アプリケーションのログ、IoTデバイスからのストリーミングデータ、オンプレミス環境からのバッチデータなど、多種多様なソースからクラウド上にデータを収集する。このフェーズでは、Cloud Pub/Subによるリアルタイムメッセージングや、Storage Transfer Serviceなどが活用される。第二のステージは「保存（Store）」であり、取り込んだデータを耐久性が高くアクセス容易なフォーマットで保持する。オブジェクトデータであればCloud Storage、構造化されたトランザクションデータであればCloud SQLやCloud Spannerが選択される。</p>
                <p className="tdesc">第三のステージは「処理と分析（Process and Analyze）」である。蓄積された生データをクレンジングし、正規化し、分析可能な形式に変換する。Cloud Dataflowを使用したサーバーレスのストリーム処理やバッチ処理、あるいはCloud DataprocによるHadoop/Sparkエコシステムの活用がこれに該当する。そして処理されたデータは、BigQueryなどの分析システムに格納される。最後の第四ステージが「探索と可視化（Explore and Visualize）」である。分析結果をダッシュボードやレポートに変換し、関係者が直感的にビジネスの現状を把握し、インサイトを引き出せるようにする。LookerやLooker Studioがこのフェーズの中核を担う。この一連のライフサイクルを最適化することで、企業はデータから迅速かつ継続的に価値を引き出すことが可能となる。</p>
            </SectionCard>
        </div>
    );
};