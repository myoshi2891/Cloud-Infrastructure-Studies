'use client';

import { useState, memo, useCallback } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, CHECKLIST_ITEMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

/**
 * PCA Section 6: ソリューションと運用の卓越性の確保 ガイド本文コンポーネント
 */
export function PcaSection6Guide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const handleCheckboxChange = useCallback((id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pca-s6-page">
            <div className="layout">
                <button
                    type="button"
                    className="sidebar-toggle"
                    id="sidebarToggle"
                    aria-label="メニュー"
                    aria-expanded={sidebarOpen}
                    aria-controls="sidebar"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <NavBar isOpen={sidebarOpen} onToggle={toggleSidebar} />

                <main className="main">

                <div className="hero">
                    <div className="kicker">Professional Cloud Architect · Section 6</div>
                    <h1>
                        Google Cloud Professional Cloud Architect試験 Section 6:
                        ソリューションと運用の卓越性の確保
                    </h1>
                    <div className="meta-row">
                        <span className="pill">配点 <strong>約12.5%</strong></span>
                        <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 14点</strong></span>
                        <span className="pill">参考文献 <strong>52件</strong></span>
                    </div>
                </div>

                <p>
                    本ガイドはGoogle Cloud公式の<a href="https://cloud.google.com/learn/certification/cloud-architect">Professional Cloud Architect認定ページ</a><a className="footnote-ref" href="#ref2" id="fnref1" role="doc-noteref"><sup>2</sup></a>および<a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf">公式Exam Guide(PDF)</a><a className="footnote-ref" href="#ref1" id="fnref2" role="doc-noteref"><sup>1</sup></a>に基づき、試験の<strong>Section 6: Ensuring solution and operations
                        excellence(ソリューションと運用の卓越性の確保、配点約12.5%)</strong>の出題内容を初学者向けに解説するものです。Section
                    6は6.1〜6.6の6つのタスク領域で構成されており、Well-Architected
                    Frameworkの「運用の卓越性の柱」を土台に、オブザーバビリティ、デプロイ管理、サポート、品質管理、本番信頼性という運用ライフサイクル全体をカバーします。
                </p>

                <h2 id="このセクションについて" tabIndex={-1}>このセクションについて</h2>

                <p>
                    公式Exam Guideは、Professional Cloud
                    Architectについて「エンタープライズのクラウド戦略、ソリューション設計、ワークロードの移行方式、デプロイとオーケストレーション、最適化、アーキテクチャのベストプラクティスに精通していること」を求めており、その大前提として<strong>Google Cloud Well-Architected Frameworkへの習熟</strong>を明示的な要件として挙げています<a className="footnote-ref" href="#ref1" id="fnref3" role="doc-noteref"><sup>1</sup></a>。Well-Architected
                    Frameworkの6本の柱(運用の卓越性、セキュリティ・プライバシー・コンプライアンス、信頼性、コスト最適化、パフォーマンス最適化、サステナビリティ)は、試験全体の出題に暗黙的・明示的に織り込まれているとされています<a className="footnote-ref" href="#ref1" id="fnref4" role="doc-noteref"><sup>1</sup></a>。
                </p>

                <p>
                    Section
                    6はこのうち「運用の卓越性の柱」に最も直接的に対応するセクションであり、以下の6つのタスクで構成されます<a className="footnote-ref" href="#ref1" id="fnref5" role="doc-noteref"><sup>1</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">タスク</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>6.1</td>
                                <td>
                                    Well-Architected
                                    Frameworkの運用の卓越性の柱の原則と推奨事項の理解
                                </td>
                            </tr>
                            <tr className="even">
                                <td>6.2</td>
                                <td>
                                    Google Cloud
                                    Observabilityソリューションへの精通(モニタリングとロギング、プロファイリングとベンチマーキング、アラート戦略)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>6.3</td>
                                <td>デプロイとリリース管理</td>
                            </tr>
                            <tr className="even">
                                <td>6.4</td>
                                <td>デプロイ済みソリューションのサポート支援</td>
                            </tr>
                            <tr className="odd">
                                <td>6.5</td>
                                <td>品質管理措置の評価</td>
                            </tr>
                            <tr className="even">
                                <td>6.6</td>
                                <td>
                                    本番環境におけるソリューションの信頼性確保(カオスエンジニアリング、ペネトレーションテスト、負荷テストなど)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    出題では、Altostrat Media・Cymbal Retail・EHR Healthcare・KnightMotives
                    Automotiveという4つの公式ケーススタディが参照されることがあります<a className="footnote-ref" href="#ref1" id="fnref6" role="doc-noteref"><sup>1</sup></a>。各ケーススタディは業種やビジネス要件が異なるため、同じ技術要素(例:
                    アラート戦略やデプロイ戦略)でも、どのような制約(規制対応、ダウンタイム許容度、コスト感度など)のもとで最適解が変わるかを意識して学習することが重要です。
                </p>

                <h2 id="61-運用の卓越性の柱の原則と推奨事項" tabIndex={-1}>
                    6.1 運用の卓越性の柱の原則と推奨事項
                </h2>

                <h3 id="well-architected-frameworkにおける位置づけ" tabIndex={-1}>
                    Well-Architected Frameworkにおける位置づけ
                </h3>

                <p>
                    Well-Architected
                    Frameworkは、アーキテクト・開発者・管理者などクラウド関係者が、安全で効率的、レジリエントで高性能、そしてコスト効率の良いクラウドトポロジーを設計・運用するための推奨事項を提供するものです<a className="footnote-ref" href="#ref3" id="fnref7" role="doc-noteref"><sup>3</sup></a><a className="footnote-ref" href="#ref4" id="fnref8" role="doc-noteref"><sup>4</sup></a>。推奨事項は「柱(pillar)」と呼ばれる6つの非機能領域に整理されています<a className="footnote-ref" href="#ref3" id="fnref9" role="doc-noteref"><sup>3</sup></a>。
                </p>

                <Diagram id="diag-1" label="Google Cloud Well-Architected Frameworkの柱の構造を示す図" />

                <p>
                    「運用の卓越性の柱」は、クラウドワークロードを効率的にデプロイ・運用・モニタリング・管理するための推奨事項を提供します<a className="footnote-ref" href="#ref5" id="fnref10" role="doc-noteref"><sup>5</sup></a>。単なる技術的なオペレーション能力にとどまらず、継続的な学習と実験を奨励する文化的な変革も含むとされており、チームがアイデアを共有し、前提を疑い、改善を推進できる協働的な環境づくりが重要視されています<a className="footnote-ref" href="#ref5" id="fnref11" role="doc-noteref"><sup>5</sup></a>。
                </p>

                <p>
                    運用の卓越性の柱は、次の5つの読者層に向けて書かれています<a className="footnote-ref" href="#ref5" id="fnref12" role="doc-noteref"><sup>5</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">対象読者</th>
                                <th scope="col">この柱が提供するもの</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>マネージャー・リーダー</td>
                                <td>
                                    クラウド投資がビジネス目標を支援する価値を提供し続けるための、運用卓越性の確立・維持フレームワーク
                                </td>
                            </tr>
                            <tr className="even">
                                <td>クラウド運用チーム</td>
                                <td>
                                    インシデントと問題の管理、キャパシティプランニング、パフォーマンス最適化、変更管理に関するガイダンス
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>サイト信頼性エンジニア(SRE)</td>
                                <td>
                                    モニタリング、インシデント対応、自動化を含む高いサービス信頼性を達成するためのベストプラクティス
                                </td>
                            </tr>
                            <tr className="even">
                                <td>クラウドアーキテクト・エンジニア</td>
                                <td>設計・実装フェーズにおける運用要件とベストプラクティス</td>
                            </tr>
                            <tr className="odd">
                                <td>DevOpsチーム</td>
                                <td>自動化、CI/CDパイプライン、変更管理に関するガイダンス</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="運用準備の4つのフォーカスエリア" tabIndex={-1}>運用準備の4つのフォーカスエリア</h3>

                <p>
                    運用の卓越性の柱を理解するうえで鍵となるのが「運用準備(Operational
                    Readiness)」という考え方です。これは、組織がGoogle
                    Cloud上で複雑なワークロードを稼働させるために、Day-1(稼働開始)とDay-2(継続運用、通称CloudOps)の両方をどう準備するかを指します<a className="footnote-ref" href="#ref6" id="fnref13" role="doc-noteref"><sup>6</sup></a>。運用準備は次の4つのフォーカスエリアに分解されます<a className="footnote-ref" href="#ref6" id="fnref14" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <Diagram id="diag-2" label="運用準備の4つのフォーカスエリア（ワークフォース、プロセス、ツール、ガバナンス）を示す図" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">フォーカスエリア</th>
                                <th scope="col">主な活動・構成要素</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ワークフォース</td>
                                <td>
                                    クラウドリソースを管理・運用するチームの役割と責任の明確化、必要スキルの確保、学習プログラムの整備、チーム構造の確立、人材採用
                                </td>
                            </tr>
                            <tr className="even">
                                <td>プロセス</td>
                                <td>
                                    オブザーバビリティ、サービス障害の管理、クラウドデリバリー、コアなクラウド運用
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ツール</td>
                                <td>CloudOpsプロセスを支えるために必要なツール群</td>
                            </tr>
                            <tr className="even">
                                <td>ガバナンス</td>
                                <td>
                                    サービスレベルとレポーティング、クラウド財務、クラウド運用モデル、アーキテクチャレビュー/ガバナンスボード、クラウドアーキテクチャとコンプライアンス
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    以降で紹介する5つの核となる原則は、いずれもこの4つのフォーカスエリアのいずれか(または複数)にマッピングされています<a className="footnote-ref" href="#ref6" id="fnref15" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <h3 id="核となる原則1-cloudopsによる運用準備とパフォーマンスの確保" tabIndex={-1}>
                    核となる原則1: CloudOpsによる運用準備とパフォーマンスの確保
                </h3>

                <p>
                    この原則は、サービスパフォーマンスに関する明確な期待値とコミットメントの設定、堅牢なモニタリングとアラート、パフォーマンステストの実施、キャパシティニーズの事前計画を重視します<a className="footnote-ref" href="#ref6" id="fnref16" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <p>
                    <strong>SLOとSLAの定義</strong>:
                    クラウド運用チームの中心的な責務の一つが、すべての重要なワークロードについてサービスレベル目標(SLO)とサービスレベル契約(SLA)を定義することです<a className="footnote-ref" href="#ref6" id="fnref17" role="doc-noteref"><sup>6</sup></a>。SLOはSMART基準を満たす必要があるとされています<a className="footnote-ref" href="#ref6" id="fnref18" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">SMART基準</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Specific(具体的)</td>
                                <td>求めるサービスレベルとパフォーマンスを明確に記述する</td>
                            </tr>
                            <tr className="even">
                                <td>Measurable(測定可能)</td>
                                <td>定量化・追跡が可能である</td>
                            </tr>
                            <tr className="odd">
                                <td>Achievable(達成可能)</td>
                                <td>組織の能力とリソースの範囲内で到達可能である</td>
                            </tr>
                            <tr className="even">
                                <td>Relevant(関連性がある)</td>
                                <td>ビジネス目標・優先事項と整合している</td>
                            </tr>
                            <tr className="odd">
                                <td>Time-bound(期限が明確)</td>
                                <td>測定・評価の期間が定義されている</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    例えば「可用性99.9%」「平均応答時間200ミリ秒未満」といったSLOが挙げられます<a className="footnote-ref" href="#ref6" id="fnref19" role="doc-noteref"><sup>6</sup></a>。Cloud
                    Monitoringとサービスレベル指標(SLI)は、SLO/SLAの定義・追跡を支援するツールです<a className="footnote-ref" href="#ref6" id="fnref20" role="doc-noteref"><sup>6</sup></a>。SLAは顧客に対するコミットメントであり、提供サービスの詳細、期待されるサービスレベル、双方の責任、非準拠時のペナルティや救済策を含む契約上の合意として機能します<a className="footnote-ref" href="#ref6" id="fnref21" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <p>
                    <strong>包括的なオブザーバビリティの実装</strong>:
                    リアルタイムの可視性を得るために、Google Cloud
                    Observabilityツールとサードパーティソリューションを組み合わせて使うことが推奨されています<a className="footnote-ref" href="#ref6" id="fnref22" role="doc-noteref"><sup>6</sup></a>。CPU使用率、メモリ使用量、ネットワークトラフィック、ディスクI/O、アプリケーション応答時間といったシステムヘルス指標に加え、ビジネス固有の指標も監視対象とすべきです<a className="footnote-ref" href="#ref6" id="fnref23" role="doc-noteref"><sup>6</sup></a>。詳細は<a href="#62-google-cloud-observability">6.2 Google Cloud Observability</a>で扱います。
                </p>

                <p>
                    <strong>パフォーマンステストと負荷テスト</strong>:
                    クラウドベースのアプリケーションとインフラがピーク負荷に耐え、最適なパフォーマンスを維持できることを確認するために、定期的なパフォーマンステストが推奨されます<a className="footnote-ref" href="#ref6" id="fnref24" role="doc-noteref"><sup>6</sup></a>。負荷テストは現実的なトラフィックパターンをシミュレートし、ストレステストはシステムを限界まで押し上げてボトルネックを特定します<a className="footnote-ref" href="#ref6" id="fnref25" role="doc-noteref"><sup>6</sup></a>。Cloud Load
                    Balancingや負荷テストサービスを用いて実際のトラフィックパターンをシミュレートできます<a className="footnote-ref" href="#ref6" id="fnref26" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <p>
                    <strong>キャパシティの計画と管理</strong>:
                    将来のキャパシティニーズを事前に計画することは、クラウドベースシステムのスムーズな運用とスケーラビリティを確保するために欠かせません<a className="footnote-ref" href="#ref6" id="fnref27" role="doc-noteref"><sup>6</sup></a>。これにはコンピューティングインスタンス、ストレージ、APIリクエストなどのクォータの理解と管理が含まれます<a className="footnote-ref" href="#ref6" id="fnref28" role="doc-noteref"><sup>6</sup></a>。過去の利用パターン、成長予測、ビジネス要件を分析し、Cloud
                    MonitoringやBigQueryを用いて将来の需要を予測します<a className="footnote-ref" href="#ref6" id="fnref29" role="doc-noteref"><sup>6</sup></a>。季節変動(ホリデーシーズンなど)や計画イベント(製品ローンチ、マーケティングキャンペーン)による一時的な需要急増も考慮し、災害対策(DR)システムが優雅なフェイルオーバーを行えるだけのキャパシティも計画しておく必要があります<a className="footnote-ref" href="#ref6" id="fnref30" role="doc-noteref"><sup>6</sup></a>。オートスケーリングは、ワークロードの変動に応じてリソースを動的に調整するための重要な戦略です<a className="footnote-ref" href="#ref6" id="fnref31" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <p>
                    <strong>継続的なモニタリングと最適化</strong>:
                    パフォーマンス指標を継続的にモニタリング・分析するプロセスを確立することが求められます<a className="footnote-ref" href="#ref6" id="fnref32" role="doc-noteref"><sup>6</sup></a>。ログとトレースの定期的なレビュー、キャッシング・データベース最適化・コードプロファイリングといったパフォーマンスチューニング技法の適用が挙げられています<a className="footnote-ref" href="#ref6" id="fnref33" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <h3 id="核となる原則2-インシデントと問題の管理" tabIndex={-1}>
                    核となる原則2: インシデントと問題の管理
                </h3>

                <p>
                    インシデント管理と問題管理は、機能する運用環境の重要な構成要素です<a className="footnote-ref" href="#ref7" id="fnref34" role="doc-noteref"><sup>7</sup></a>。この原則が扱う内容の多くは信頼性の柱でも詳しく説明されており、補足資料としてGoogle
                    SRE Bookが推奨されています<a className="footnote-ref" href="#ref7" id="fnref35" role="doc-noteref"><sup>7</sup></a>。
                </p>

                <Diagram id="diag-3" label="インシデントと問題の管理ライフサイクル（検知からナレッジベース更新まで）を示す図" />

                <p>
                    主な推奨事項は次のとおりです<a className="footnote-ref" href="#ref7" id="fnref36" role="doc-noteref"><sup>7</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">推奨事項</th>
                                <th scope="col">概要</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>明確なインシデント対応手順の確立</td>
                                <td>
                                    インシデントコマンダー・調査担当・コミュニケーション担当・技術専門家など役割を定義し、エスカレーションパスを整備。ランブック/プレイブックとして文書化し定期的に見直す
                                </td>
                            </tr>
                            <tr className="even">
                                <td>インシデント管理の一元化</td>
                                <td>
                                    一元化されたインシデント管理システムにより可視性向上・部門間の協調強化・アカウンタビリティの明確化を実現
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    徹底したポストインシデントレビュー(PIR/ポストモーテム)の実施
                                </td>
                                <td>
                                    学際的なチームが根本原因分析を行い、ブレームレス文化のもとで報告書を作成・共有する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ナレッジベースの維持</td>
                                <td>
                                    既知の問題・解決策・トラブルシューティングガイドを蓄積し、エスカレーションの必要性を減らして効率を高める
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>インシデント対応の自動化</td>
                                <td>
                                    Cloud Run functionsやCloud
                                    Runなどを用いて検知・診断情報収集・アラート・修復アクションを自動化し、検知/解決時間を短縮する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="核となる原則3-クラウドリソースの管理と最適化" tabIndex={-1}>
                    核となる原則3: クラウドリソースの管理と最適化
                </h3>

                <p>
                    この原則は、実際の使用状況と需要に基づいたリソースの適正サイジング、動的なリソース割り当てのためのオートスケーリング活用、コスト最適化戦略の実装、リソース利用状況とコストの定期的なレビューを扱います<a className="footnote-ref" href="#ref8" id="fnref37" role="doc-noteref"><sup>8</sup></a>。詳細はコスト最適化の柱でも扱われますが、運用の卓越性の観点では「効率性」「パフォーマンス」「スケーラビリティ」という3つの目標のバランスが重視されます<a className="footnote-ref" href="#ref8" id="fnref38" role="doc-noteref"><sup>8</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">推奨事項</th>
                                <th scope="col">主なツール・手法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>適正サイジング(Right-sizing)</td>
                                <td>
                                    Cloud
                                    Monitoringによるリアルタイムの使用率可視化、Recommenderによる最適化提案、カスタム指標に基づく自動アクション
                                </td>
                            </tr>
                            <tr className="even">
                                <td>オートスケーリング</td>
                                <td>
                                    Compute
                                    Engineのマネージドインスタンスグループ(MIG)、GKEのCluster
                                    Autoscaler/Horizontal Pod Autoscaler/Vertical Pod
                                    Autoscaler/Node Auto-Provisioning、Cloud
                                    Runの組み込みオートスケーリング
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>コスト最適化戦略</td>
                                <td>確約利用割引(CUD)、継続利用割引、Spot VM</td>
                            </tr>
                            <tr className="even">
                                <td>リソース使用状況とコストの追跡</td>
                                <td>
                                    タグ・ラベル付けによる分類、Cloud
                                    Billingとコスト管理ツールによる可視化、カスタムダッシュボード
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>コスト配分と予算管理</td>
                                <td>
                                    チーム/プロジェクト単位のコスト配分・チャージバック、Cloud
                                    Billingの予算とアラート機能
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="核となる原則4-変更の自動化と管理" tabIndex={-1}>核となる原則4: 変更の自動化と管理</h3>

                <p>
                    変更管理と自動化は、クラウド環境内でのスムーズかつ制御された移行を確保するうえで重要な役割を果たします<a className="footnote-ref" href="#ref9" id="fnref39" role="doc-noteref"><sup>9</sup></a>。この原則は次の4つの基礎要素の上に成り立っています<a className="footnote-ref" href="#ref9" id="fnref40" role="doc-noteref"><sup>9</sup></a>。
                </p>

                <Diagram id="diag-4" label="変更の自動化と管理パイプライン（Gitから本番環境まで）を示す図" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">基礎要素</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>変更ガバナンス</td>
                                <td>
                                    承認プロセスやコミュニケーション計画を含む、変更管理のための明確なポリシーと手続きの確立
                                </td>
                            </tr>
                            <tr className="even">
                                <td>リスクアセスメント</td>
                                <td>変更に伴う潜在的リスクの特定とリスク管理技法による低減</td>
                            </tr>
                            <tr className="odd">
                                <td>テストと検証</td>
                                <td>
                                    変更が機能要件・パフォーマンス要件を満たし、リグレッションを防止することの徹底検証
                                </td>
                            </tr>
                            <tr className="even">
                                <td>制御されたデプロイ</td>
                                <td>
                                    ロールバック機構を備えた、利用者へのシームレスな移行を伴う制御されたデプロイ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    具体的な推奨事項は次のとおりです<a className="footnote-ref" href="#ref9" id="fnref41" role="doc-noteref"><sup>9</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">推奨事項</th>
                                <th scope="col">概要</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>IaC(Infrastructure as Code)の採用</td>
                                <td>
                                    Terraformなどを用いてクラウドインフラを宣言的に定義・管理し、一貫性・再現性・変更管理の簡素化を実現
                                </td>
                            </tr>
                            <tr className="even">
                                <td>バージョン管理システムの導入</td>
                                <td>
                                    Gitなどにより変更履歴の可視化、コラボレーション促進、ロールバック容易性を確保
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>CI/CDパイプラインの構築</td>
                                <td>
                                    Cloud BuildとCloud
                                    Deployを用いて、ビルド・テスト・デプロイの各段階を自動化し、より速く頻度の高いリリースと品質管理の向上を実現
                                </td>
                            </tr>
                            <tr className="even">
                                <td>構成管理ツールの活用</td>
                                <td>
                                    Puppet、Chef、Ansible、VM
                                    Managerなどによりリソースの一貫性とコンプライアンスを確保し、手動エラーのリスクを低減
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>自動テストの統合</td>
                                <td>
                                    単体テスト・統合テスト・E2Eテストを組み合わせ、デプロイ前に変更を検証してエラーとリグレッションのリスクを低減
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="核となる原則5-継続的な改善とイノベーション" tabIndex={-1}>
                    核となる原則5: 継続的な改善とイノベーション
                </h3>

                <p>
                    クラウドにおいて継続的に改善・イノベーションを進めるには、継続的な学習、実験、適応への注力が必要です<a className="footnote-ref" href="#ref10" id="fnref42" role="doc-noteref"><sup>10</sup></a>。これにより、新技術の探索や既存プロセスの最適化を通じて、組織が業界リーダーシップを維持できるような卓越性の文化が醸成されます<a className="footnote-ref" href="#ref10" id="fnref43" role="doc-noteref"><sup>10</sup></a>。
                </p>

                <Diagram id="diag-5" label="運用の卓越性の5つの核となる原則の相互連携サイクルを示す図" />

                <p>
                    この原則を通じて達成できる主な目標は次のとおりです<a className="footnote-ref" href="#ref10" id="fnref44" role="doc-noteref"><sup>10</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">目標</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>イノベーションの加速</td>
                                <td>新しい技術・サービスを探索し、能力向上と差別化を推進する</td>
                            </tr>
                            <tr className="even">
                                <td>コストの削減</td>
                                <td>プロセス改善の取り組みを通じて非効率を特定・排除する</td>
                            </tr>
                            <tr className="odd">
                                <td>アジリティの向上</td>
                                <td>変化する市場ニーズや顧客要求に迅速に適応する</td>
                            </tr>
                            <tr className="even">
                                <td>意思決定の改善</td>
                                <td>
                                    データと分析からの洞察により、データドリブンな意思決定を行う
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    主にワークフォースのフォーカスエリアにマッピングされる原則であり、学習の文化がチームに新しいツールや技術を実験する余地を与え、能力の拡張とコスト削減につながるとされています<a className="footnote-ref" href="#ref10" id="fnref45" role="doc-noteref"><sup>10</sup></a>。具体的には、失敗を成長機会と捉えるブレームレス文化のもとでチームの実験と知識共有を奨励し、フォーマル/インフォーマルな学習セッションや社内カンファレンスを通じて組織全体の学習機会を創出することが推奨されています<a className="footnote-ref" href="#ref10" id="fnref46" role="doc-noteref"><sup>10</sup></a>。
                </p>

                <h2 id="62-google-cloud-observability" tabIndex={-1}>6.2 Google Cloud Observability</h2>

                <h3 id="オブザーバビリティの全体像" tabIndex={-1}>オブザーバビリティの全体像</h3>

                <p>
                    Google Cloud Observability(旧称Stackdriver)は、Google
                    Cloud上のアプリケーションやシステム、さらにはオンプレミスや他クラウド上のワークロードに対しても、統合されたモニタリング・ロギング・トレースのマネージドサービス群を提供します<a className="footnote-ref" href="#ref11" id="fnref47" role="doc-noteref"><sup>11</sup></a>。中核となるプロダクトは次のとおりです。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">プロダクト</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Cloud Monitoring</td>
                                <td>
                                    メトリクス・イベント・メタデータを収集し、ダッシュボードとアラートで可視化する<a className="footnote-ref" href="#ref11" id="fnref48" role="doc-noteref"><sup>11</sup></a><a className="footnote-ref" href="#ref12" id="fnref49" role="doc-noteref"><sup>12</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Cloud Logging</td>
                                <td>
                                    監査ログ・プラットフォームログ・アプリケーションログを一元的に収集・保存・検索・分析する<a className="footnote-ref" href="#ref12" id="fnref50" role="doc-noteref"><sup>12</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Cloud Trace</td>
                                <td>
                                    分散システムにおけるリクエストのレイテンシデータを収集するトレーシングシステム<a className="footnote-ref" href="#ref12" id="fnref51" role="doc-noteref"><sup>12</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Cloud Profiler</td>
                                <td>
                                    本番アプリケーションのCPU使用率とメモリ割り当てを低オーバーヘッドで継続的に収集する統計的プロファイラ<a className="footnote-ref" href="#ref12" id="fnref52" role="doc-noteref"><sup>12</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Error Reporting</td>
                                <td>アプリケーションで発生したエラーを集約・表示する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-6" label="Google Cloud Observability（モニタリング、ロギング、トレース、プロファイラ）の連携図" />

                <p>
                    一般的な障害解析のワークフローとしては、Cloud
                    Monitoringで高レイテンシのアラートを検知し、Cloud
                    Traceでどのサービスが遅いのかを特定し、Cloud
                    Loggingで詳細なエラーメッセージとコンテキストを確認するという流れが典型的です。
                </p>

                <h3 id="モニタリングとロギング" tabIndex={-1}>モニタリングとロギング</h3>

                <p>
                    Cloud
                    Monitoringはリソースの使用率、パフォーマンス特性、全体的なヘルス状態への洞察を提供し、Cloud
                    Loggingはすべてのサービスからのログへの一元的なアクセスを提供します。両者を組み合わせることで、システムの内部状態を外部から観測可能にする「オブザーバビリティ」が実現されます。運用準備の原則(6.1)で述べたとおり、CPU使用率・メモリ使用量・ネットワークトラフィック・ディスクI/O・応答時間などのシステムヘルス指標に加え、ビジネス固有の指標もあわせて監視することが推奨されます<a className="footnote-ref" href="#ref6" id="fnref53" role="doc-noteref"><sup>6</sup></a>。
                </p>

                <h3 id="プロファイリングとベンチマーキング" tabIndex={-1}>プロファイリングとベンチマーキング</h3>

                <p>
                    <strong>Cloud Profiler</strong>は、本番環境で稼働しているアプリケーションからCPU使用率とヒープ割り当て情報を継続的に収集する統計的な低オーバーヘッドプロファイラです<a className="footnote-ref" href="#ref18" id="fnref54" role="doc-noteref"><sup>18</sup></a>。単一インスタンス・単一ゾーンに対して通常10秒間のプロファイリングを1分ごとに実施し、収集したデータをコンソールのProfilerインターフェースで確認できます<a className="footnote-ref" href="#ref18" id="fnref55" role="doc-noteref"><sup>18</sup></a>。データ収集時のCPU・ヒープ割り当てプロファイリングのオーバーヘッドは5%未満であり、実行時間全体・複数レプリカに分散されるため、実際には0.5%未満に抑えられるとされています<a className="footnote-ref" href="#ref18" id="fnref56" role="doc-noteref"><sup>18</sup></a>。プロファイルデータは30日間保持されます<a className="footnote-ref" href="#ref18" id="fnref57" role="doc-noteref"><sup>18</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">プロファイルタイプ</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>CPU time</td>
                                <td>スレッドのCPU時間サンプリング</td>
                            </tr>
                            <tr className="even">
                                <td>Heap(使用中ヒープ)</td>
                                <td>
                                    プロファイル収集時点で生存しているアロケーションのスナップショット<a className="footnote-ref" href="#ref19" id="fnref58" role="doc-noteref"><sup>19</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Heap allocation(割り当てヒープ)</td>
                                <td>
                                    プロファイル収集期間中に行われたすべてのアロケーションの集計(収集終了までに解放されたものも含む)<a className="footnote-ref" href="#ref19" id="fnref59" role="doc-noteref"><sup>19</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Wall time</td>
                                <td>壁時計時間のサンプリング</td>
                            </tr>
                            <tr className="odd">
                                <td>Contention</td>
                                <td>同期の競合状況のプロファイル</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    壁時計時間(wall
                    time)がCPU時間より長い場合はコードが待機している時間が多いことを示し、両者が近い場合はコードがCPUに支配的であることを示します<a className="footnote-ref" href="#ref19" id="fnref60" role="doc-noteref"><sup>19</sup></a>。長時間実行されるCPU集中的なコードブロックは最適化の候補になり得ます<a className="footnote-ref" href="#ref19" id="fnref61" role="doc-noteref"><sup>19</sup></a>。
                </p>

                <p>
                    <strong>ベンチマーキング</strong>の観点では、Googleが公開しているオープンソースツール<strong>PerfKit Benchmarker</strong>が、クラウド間の性能を比較するための一貫した測定方法を提供します<a className="footnote-ref" href="#ref20" id="fnref62" role="doc-noteref"><sup>20</sup></a>。VM間のレイテンシ、スループット、プロビジョニングにかかるエンドツーエンドの時間など、100種類以上の業界標準ベンチマークツールをラップしており、Google
                    Cloud・AWS・Azureなど複数のクラウドプロバイダに対して同一の条件でベンチマークを実行できます<a className="footnote-ref" href="#ref20" id="fnref63" role="doc-noteref"><sup>20</sup></a><a className="footnote-ref" href="#ref21" id="fnref64" role="doc-noteref"><sup>21</sup></a>。
                </p>

                <p>
                    負荷テストについては、Cloud
                    Runのようなマネージドサービスに対する負荷テストのベストプラクティスとして、コンテナの同時実行数の計測やコールドスタートの検証を先に済ませたうえで小規模から段階的にスケールさせること、Pub/Subのようにレートを制御できないツールで負荷を生成しないことなどが推奨されています<a className="footnote-ref" href="#ref22" id="fnref65" role="doc-noteref"><sup>22</sup></a>。Cloud Load
                    Balancing配下のバックエンドサービスに対する負荷テストでは、単一のVMやGKE
                    Podで小規模なテストケースを作成してサーバー自体の性能限界を計測し、クライアント側やネットワーク層のボトルネックと混同しないようにすることが推奨されています<a className="footnote-ref" href="#ref23" id="fnref66" role="doc-noteref"><sup>23</sup></a>。
                </p>

                <h3 id="アラート戦略" tabIndex={-1}>アラート戦略</h3>

                <p>
                    Cloud Monitoringのアラートプロセスは、次の3つの要素で構成されます<a className="footnote-ref" href="#ref13" id="fnref67" role="doc-noteref"><sup>13</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">要素</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>アラートポリシー</td>
                                <td>
                                    どのような状況でアラートを出すか、どう通知するかを記述する。Monitoringに保存された時系列データ、またはCloud
                                    Loggingに保存されたログを監視できる<a className="footnote-ref" href="#ref13" id="fnref68" role="doc-noteref"><sup>13</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>インシデント</td>
                                <td>
                                    アラートポリシーの条件が満たされたときに作成される、監視対象データの種類と条件が満たされた時刻の記録<a className="footnote-ref" href="#ref13" id="fnref69" role="doc-noteref"><sup>13</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>通知チャネル</td>
                                <td>
                                    メール、Slack、PagerDuty、Pub/Subなど、インシデント発生時にどのように通知を受け取るかを定義する<a className="footnote-ref" href="#ref13" id="fnref70" role="doc-noteref"><sup>13</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-7" label="Cloud Monitoringのアラートポリシー評価と通知フローを示すシーケンス図" />

                <p>
                    アラートポリシーの条件は、時系列データを「アライメント期間」で正規化(規則的な間隔にバケット化)したうえで評価されます<a className="footnote-ref" href="#ref14" id="fnref71" role="doc-noteref"><sup>14</sup></a>。1つのアラートポリシーには最大6つの条件を設定でき、欠損データの扱いについても複数のオプションが用意されています<a className="footnote-ref" href="#ref14" id="fnref72" role="doc-noteref"><sup>14</sup></a>。しきい値ベースの条件はコンソールのアラート作成UIから設定するほか、Monitoring
                    Query Language(MQL)を使った条件や、Cloud Monitoring APIを用いた作成も可能です<a className="footnote-ref" href="#ref17" id="fnref73" role="doc-noteref"><sup>17</sup></a>。ポリシーを変更すると、インシデント判定に使う事前計算済みデータが破棄され、インシデントの履歴情報が失われる点に注意が必要です<a className="footnote-ref" href="#ref16" id="fnref74" role="doc-noteref"><sup>16</sup></a>。
                </p>

                <p>
                    <strong>コスト管理の観点</strong>では、Monitoringはディメンション型のメトリクスシステムを採用しており、メトリクスの総カーディナリティは「監視対象リソース数
                    ×
                    ラベルの組み合わせ数」で決まります。例えば100台のVMが10ラベル×10値のメトリクスを送信する場合、カーディナリティは100×10×10=10,000となり、生データに対して直接アラートを設定するとコストが非常に高くなる可能性があります<a className="footnote-ref" href="#ref15" id="fnref75" role="doc-noteref"><sup>15</sup></a>。そのため、可能な限り1つのアラートポリシーで複数のリソースを監視し(リソースごとに個別のポリシーを作らない)、目的に応じた適切な粒度(例:
                    CPU使用率ならVM+CPUレベル、レイテンシならサービスレベル)にデータを集約することが推奨されます<a className="footnote-ref" href="#ref15" id="fnref76" role="doc-noteref"><sup>15</sup></a>。
                </p>

                <p>
                    運用の卓越性の観点では、単純なしきい値アラートに加えて、SLOの「エラーバジェット」の消費速度(バーンレート)に基づくアラート戦略も重要です。これは<a href="#65-品質管理の評価">6.5 品質管理の評価</a>で詳しく扱います。
                </p>

                <h2 id="63-デプロイとリリース管理" tabIndex={-1}>6.3 デプロイとリリース管理</h2>

                <h3 id="cloud-deployの基本構造" tabIndex={-1}>Cloud Deployの基本構造</h3>

                <p>
                    <strong>Cloud Deploy</strong>は、定義済みのプロモーションシーケンスに沿って一連のターゲット環境へアプリケーションを配信するマネージドサービスです<a className="footnote-ref" href="#ref24" id="fnref77" role="doc-noteref"><sup>24</sup></a>。アプリケーションを更新してデプロイしたいとき、「リリース」を作成し、そのライフサイクルは「デリバリーパイプライン」によって管理されます<a className="footnote-ref" href="#ref24" id="fnref78" role="doc-noteref"><sup>24</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>デリバリーパイプライン</td>
                                <td>
                                    名前・説明、デプロイ先ターゲットへのプロモーションシーケンス(順序)を定義する設定<a className="footnote-ref" href="#ref24" id="fnref79" role="doc-noteref"><sup>24</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ターゲット</td>
                                <td>
                                    dev/staging/productionなど、アプリケーションのデプロイ先となる個別の実行環境<a className="footnote-ref" href="#ref24" id="fnref80" role="doc-noteref"><sup>24</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>リリース</td>
                                <td>
                                    各ターゲット向けにレンダリングされたマニフェストを表すリソース。CI側が生成したコンテナイメージへの参照を含む<a className="footnote-ref" href="#ref24" id="fnref81" role="doc-noteref"><sup>24</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ロールアウト</td>
                                <td>
                                    リリースを特定のターゲット環境に関連付けるリソース。最初のリリース作成時に自動生成される<a className="footnote-ref" href="#ref24" id="fnref82" role="doc-noteref"><sup>24</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-8" label="Cloud Deployのリリースプロモーションフロー（dev -> staging -> production）を示す図" />

                <p>
                    CI側の処理はコンテナイメージを1つ以上出力するものであれば任意のツールを利用できます<a className="footnote-ref" href="#ref24" id="fnref83" role="doc-noteref"><sup>24</sup></a>。リリース作成とデリバリーパイプラインの呼び出しは、必ずしもCIツールから行う必要はありません<a className="footnote-ref" href="#ref24" id="fnref84" role="doc-noteref"><sup>24</sup></a>。
                </p>

                <h3 id="デプロイ戦略" tabIndex={-1}>デプロイ戦略</h3>

                <p>
                    Cloud Deployは複数のデプロイ戦略をサポートしています<a className="footnote-ref" href="#ref25" id="fnref85" role="doc-noteref"><sup>25</sup></a><a className="footnote-ref" href="#ref26" id="fnref86" role="doc-noteref"><sup>26</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">戦略</th>
                                <th scope="col">概要</th>
                                <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>標準デプロイ</td>
                                <td>
                                    進行的なロールアウトやトラフィック分割を行わずに、1つ以上のターゲットランタイムへ一括デプロイする。ロールバック・検証・複数ターゲットへの同時デプロイが可能<a className="footnote-ref" href="#ref25" id="fnref87" role="doc-noteref"><sup>25</sup></a>
                                </td>
                                <td>シンプルなデプロイ、迅速なリリースサイクル</td>
                            </tr>
                            <tr className="even">
                                <td>自動カナリア</td>
                                <td>
                                    Cloud
                                    Deployが指定したパーセンテージのシーケンスに従い、新旧バージョン間のトラフィック配分を自動で操作する<a className="footnote-ref" href="#ref26" id="fnref88" role="doc-noteref"><sup>26</sup></a>
                                </td>
                                <td>
                                    Cloud Run、サービスネットワーキング、Gateway APIへのデプロイ
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>カスタム自動カナリア</td>
                                <td>
                                    トラフィック配分はCloud
                                    Deployに任せつつ、フェーズ名・目標割合・Skaffoldプロファイル・検証ジョブの有無などを個別に指定する<a className="footnote-ref" href="#ref26" id="fnref89" role="doc-noteref"><sup>26</sup></a>
                                </td>
                                <td>より柔軟なフェーズ制御が必要な場合</td>
                            </tr>
                            <tr className="even">
                                <td>フルカスタムカナリア</td>
                                <td>
                                    フェーズ設定に加え、トラフィックバランシングの構成まですべて自前で提供する<a className="footnote-ref" href="#ref26" id="fnref90" role="doc-noteref"><sup>26</sup></a>
                                </td>
                                <td>
                                    すべてのターゲットタイプに対応、高度なカスタマイズが必要な場合
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    カナリアデプロイは、アプリケーションの新バージョンを最初にインフラの一部だけに展開し、そこでテストしてから段階的に展開範囲を広げていく進行的なデプロイ手法です<a className="footnote-ref" href="#ref26" id="fnref91" role="doc-noteref"><sup>26</sup></a>。例えばCloud
                    Runへの50%カナリアデプロイでは、トラフィックの半分が新リビジョンへ、残り半分が旧リビジョンへ送られ、安定性を確認したうえで100%まで昇格させます<a className="footnote-ref" href="#ref26" id="fnref92" role="doc-noteref"><sup>26</sup></a>。
                </p>

                <Diagram id="diag-9" label="カナリアデプロイと自動ロールバックの判定フローを示す図" />

                <p>
                    各フェーズに検証(verify)ジョブを組み込むことができ、<code>advanceRolloutRule</code>のような自動化と組み合わせることで、検証結果に応じてロールアウトを自動的に次のフェーズへ進めることも可能です<a className="footnote-ref" href="#ref26" id="fnref93" role="doc-noteref"><sup>26</sup></a>。
                </p>

                <h3 id="承認プロモーションロールバック" tabIndex={-1}>承認・プロモーション・ロールバック</h3>

                <p>
                    リリースが特定のターゲットへデプロイされると、パイプラインの可視化画面でその状態を確認できます<a className="footnote-ref" href="#ref27" id="fnref94" role="doc-noteref"><sup>27</sup></a>。ターゲットごとに承認を必須に設定でき、<code>roles/clouddeploy.approver</code>ロール(または同等の権限)を持つユーザーがマニフェストの差分(Manifest
                    diff)を確認したうえでロールアウトを承認・却下できます<a className="footnote-ref" href="#ref27" id="fnref95" role="doc-noteref"><sup>27</sup></a>。
                </p>

                <p>
                    <code>gcloud deploy releases promote --release=RELEASE_NAME \<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;--delivery-pipeline=PIPELINE_NAME \<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;--region=REGION</code>
                </p>

                <p>
                    上記のように既存のリリースを次のターゲットへ手動でプロモートすることも、特定のターゲットへ直接デプロイすることも可能です<a className="footnote-ref" href="#ref27" id="fnref96" role="doc-noteref"><sup>27</sup></a><a className="footnote-ref" href="#ref28" id="fnref97" role="doc-noteref"><sup>28</sup></a>。通常運用ではプロモーションシーケンスに沿って順番にデプロイされますが、任意の定義済みターゲットへ手動でデプロイすることもできます<a className="footnote-ref" href="#ref28" id="fnref98" role="doc-noteref"><sup>28</sup></a>。ロールアウトに問題が見つかった場合は、リリースを以前のターゲットへ戻す、あるいはコンソールのデリバリーパイプライン可視化画面からロールバックを実行することで、旧バージョンへ迅速に戻すことができます。
                </p>

                <p>デプロイとリリース管理におけるベストプラクティスは次のとおりです。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">理由</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>本番ターゲットには承認ゲートを設定する</td>
                                <td>
                                    意図しない変更の本番反映を防ぎ、変更管理ガバナンス(6.1)を実現する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>カナリアや検証ジョブを組み込む</td>
                                <td>
                                    障害の影響範囲(ブラストラディウス)を限定し、早期に問題を検知する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ロールバック手順を定期的にリハーサルする</td>
                                <td>本番障害時に確実かつ迅速に切り戻せることを事前に確認する</td>
                            </tr>
                            <tr className="even">
                                <td>リリースの変更をIaC・バージョン管理と連携させる</td>
                                <td>
                                    デプロイの再現性とトレーサビリティを確保する(6.1の変更管理原則と整合)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="64-デプロイ済みソリューションのサポート支援" tabIndex={-1}>
                    6.4 デプロイ済みソリューションのサポート支援
                </h2>

                <h3 id="google-cloudサポートティア" tabIndex={-1}>Google Cloudサポートティア</h3>

                <p>
                    すべてのGoogle Cloud顧客にはBasic
                    Supportが含まれており、ドキュメント・コミュニティサポート・Cloud
                    Billingサポート・Active Assistの推奨事項へのアクセスが提供されます<a className="footnote-ref" href="#ref29" id="fnref99" role="doc-noteref"><sup>29</sup></a><a className="footnote-ref" href="#ref33" id="fnref100" role="doc-noteref"><sup>33</sup></a>。それより上位のサポートは、組織の規模やワークロードの重要度に応じて選択します<a className="footnote-ref" href="#ref29" id="fnref101" role="doc-noteref"><sup>29</sup></a>。Standard
                    Supportは、開発中のワークロードを持つ組織が最初にサポート契約を検討する際の入口として位置づけられています<a className="footnote-ref" href="#ref30" id="fnref102" role="doc-noteref"><sup>30</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">サポートティア</th>
                                <th scope="col">対象</th>
                                <th scope="col">主な特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Basic Support</td>
                                <td>全顧客に標準で付帯</td>
                                <td>
                                    ドキュメント、コミュニティサポート、Cloud
                                    Billingサポート、Active Assist推奨事項<a className="footnote-ref" href="#ref29" id="fnref103" role="doc-noteref"><sup>29</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Standard Support</td>
                                <td>開発中のワークロードを持つ中小規模組織</td>
                                <td>
                                    1:1技術サポート、Cloud Support API、Active
                                    Assist推奨事項、P2(優先度2)ケースへの4時間以内の応答<a className="footnote-ref" href="#ref29" id="fnref104" role="doc-noteref"><sup>29</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Enhanced Support</td>
                                <td>本番稼働する中〜大規模組織</td>
                                <td>
                                    より高速な応答、Cloud Support
                                    API、サードパーティ技術サポート、Recommenderなどのインテリジェントサービス<a className="footnote-ref" href="#ref29" id="fnref105" role="doc-noteref"><sup>29</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Premium Support</td>
                                <td>優先度の高いワークロードを持つエンタープライズ</td>
                                <td>
                                    高速応答、プラットフォーム安定性、Customer Aware
                                    Support、専任のテクニカルアカウントマネージャー(TAM)<a className="footnote-ref" href="#ref29" id="fnref106" role="doc-noteref"><sup>29</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-10" label="Google Cloudサポートティア（Basic, Standard, Enhanced, Premium）の階層図" />

                <p>
                    Premium SupportとEnhanced Supportでは、規制対応が必要な環境向けにAssured
                    Supportというオプションも提供されており、米国・EU・カナダ・イスラエル・オーストラリアの地理的所在地・人的要件に基づくコンプライアンス層として機能します<a className="footnote-ref" href="#ref31" id="fnref107" role="doc-noteref"><sup>31</sup></a><a className="footnote-ref" href="#ref32" id="fnref108" role="doc-noteref"><sup>32</sup></a>。
                </p>

                <h3 id="active-assistとrecommender" tabIndex={-1}>Active AssistとRecommender</h3>

                <p>
                    <strong>Active Assist</strong>は、Google
                    Cloudプロジェクトを最適化するための推奨事項とインサイトを生成する一連のツール群の総称です<a className="footnote-ref" href="#ref34" id="fnref109" role="doc-noteref"><sup>34</sup></a>。推奨事項は、コスト・セキュリティ・パフォーマンス・信頼性・マネジャビリティ・サステナビリティという6つの価値ピラーに分類されます<a className="footnote-ref" href="#ref35" id="fnref110" role="doc-noteref"><sup>35</sup></a>。
                </p>

                <Diagram id="diag-11" label="Active Assistによる利用状況分析から推奨事項適用までのフローを示す図" />

                <p>
                    推奨事項を適用する前には、組織内でその影響を正しく評価できる担当者によるレビューを行うことが推奨されています。評価なしに推奨事項を適用すると、パフォーマンス低下、信頼性の悪化、必要な権限の喪失といった予期しない変更が生じる可能性があるためです<a className="footnote-ref" href="#ref36" id="fnref111" role="doc-noteref"><sup>36</sup></a>。人によるレビューを介さずに適用する運用を選ぶ場合は、事前にロールバック手順を用意しておく必要があります<a className="footnote-ref" href="#ref36" id="fnref112" role="doc-noteref"><sup>36</sup></a>。エンタープライズがActive
                    Assistをスケールさせる際は、まずコンソールでのレビュー、次にBigQueryへのエクスポート、Recommender
                    APIの利用、DevOpsパイプラインへの統合という段階的なアプローチが推奨されています<a className="footnote-ref" href="#ref37" id="fnref113" role="doc-noteref"><sup>37</sup></a>。
                </p>

                <h3 id="personalized-service-health" tabIndex={-1}>Personalized Service Health</h3>

                <p>
                    <strong>Personalized Service Health</strong>は、自分のプロジェクトに関連するGoogle
                    Cloudのサービスヘルスイベント(障害・性能劣化など)を一元的に把握するための機能です<a className="footnote-ref" href="#ref38" id="fnref114" role="doc-noteref"><sup>38</sup></a>。全体に影響する障害情報だけでなく、自分のプロジェクトやリソースに実際に関連するイベントだけをフィルタリングして表示します<a className="footnote-ref" href="#ref38" id="fnref115" role="doc-noteref"><sup>38</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">アクセス方法</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Service Healthダッシュボード</td>
                                <td>
                                    Google
                                    Cloudコンソール上で、プロジェクトに関連するアクティブ/過去のインシデントを追跡<a className="footnote-ref" href="#ref38" id="fnref116" role="doc-noteref"><sup>38</sup></a><a className="footnote-ref" href="#ref39" id="fnref117" role="doc-noteref"><sup>39</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Service Health API</td>
                                <td>
                                    プロジェクト単位・組織単位でサービスヘルスイベントをプログラムから取得<a className="footnote-ref" href="#ref38" id="fnref118" role="doc-noteref"><sup>38</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>アラート</td>
                                <td>
                                    Cloud Loggingのログに基づき、Cloud
                                    Monitoringの通知チャネル(メール、Pub/Sub、Webhook、Slack、PagerDutyなど)を通じて通知<a className="footnote-ref" href="#ref38" id="fnref119" role="doc-noteref"><sup>38</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    Personalized Service
                    Healthは、問題が自プロジェクト側の設定に起因するのか、Google
                    Cloud側の障害に起因するのかを切り分けるのに役立ち、適切なインシデント対応を実施するための一次情報源として位置づけられています<a className="footnote-ref" href="#ref38" id="fnref120" role="doc-noteref"><sup>38</sup></a>。これは6.1で述べた「インシデント管理の一元化」や「明確なインシデント対応手順の確立」を支える具体的な仕組みの一つです。
                </p>

                <h2 id="65-品質管理の評価" tabIndex={-1}>6.5 品質管理の評価</h2>

                <p>
                    品質管理措置の評価は、6.1で扱った「変更の自動化と管理」の実践(CI/CD、自動テスト)と、SREのエラーバジェットに基づく運用ガバナンスを組み合わせて理解すると整理しやすくなります。
                </p>

                <h3 id="cicdパイプラインにおける品質ゲート" tabIndex={-1}>CI/CDパイプラインにおける品質ゲート</h3>

                <p>
                    6.1で述べたとおり、CI/CDパイプラインへの自動テストの統合は、デプロイ前に変更を検証してエラーとリグレッションのリスクを低減する効果があります<a className="footnote-ref" href="#ref9" id="fnref121" role="doc-noteref"><sup>9</sup></a>。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">テスト種別</th>
                                <th scope="col">目的</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>単体テスト</td>
                                <td>
                                    関数やメソッドなど、個々のコード単位が期待どおりに動作することを確認する<a className="footnote-ref" href="#ref9" id="fnref122" role="doc-noteref"><sup>9</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>統合テスト</td>
                                <td>
                                    アプリケーションの異なるコンポーネント/モジュール間の連携が正しく機能することを検証する<a className="footnote-ref" href="#ref9" id="fnref123" role="doc-noteref"><sup>9</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>E2E(エンドツーエンド)テスト</td>
                                <td>
                                    実際のシナリオをシミュレートし、アプリケーション全体がエンドユーザーの要件を満たすことを確認する<a className="footnote-ref" href="#ref9" id="fnref124" role="doc-noteref"><sup>9</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    自動テストを組み込む主な効果は、開発プロセスの早い段階でバグや欠陥を検出できること、そして一定の基準やベストプラクティスに沿った高品質なコードを維持できることです<a className="footnote-ref" href="#ref9" id="fnref125" role="doc-noteref"><sup>9</sup></a>。効果的に統合するには、適切なテストツール・フレームワークの選定に加え、テスト種別・実施頻度・合否基準を含む明確なテスト戦略の策定が必要です<a className="footnote-ref" href="#ref9" id="fnref126" role="doc-noteref"><sup>9</sup></a>。
                </p>

                <h3 id="エラーバジェットによるリリースゲーティング" tabIndex={-1}>
                    エラーバジェットによるリリースゲーティング
                </h3>

                <p>
                    SREの実践では、SLOの裏返しとして「エラーバジェット」という考え方が用いられます。SLOが99.9%の可用性であれば、エラーバジェットはその残り0.1%、つまり「使ってよい失敗の割合」です<a className="footnote-ref" href="#ref40" id="fnref127" role="doc-noteref"><sup>40</sup></a>。四半期のSLOが99.999%であれば、エラーバジェットはその四半期における失敗率0.001%となり、ある問題が期待クエリの0.0002%を失敗させた場合、その問題は四半期のエラーバジェットの20%を消費したことになります<a className="footnote-ref" href="#ref40" id="fnref128" role="doc-noteref"><sup>40</sup></a>。
                </p>

                <Diagram id="diag-12" label="エラーバジェットに基づくリリースゲーティング判断フローを示す図" />

                <p>
                    エラーバジェットが残っている限り新しいリリースを継続でき、逆にバジェットが尽きた場合はリリース頻度を落とす、あるいはロールバックするといった、より繊細なコントロールが可能になります<a className="footnote-ref" href="#ref40" id="fnref129" role="doc-noteref"><sup>40</sup></a>。エラーバジェットの本質的な利点は、プロダクト開発チームとSREチームの双方にとって、イノベーションと信頼性のバランスを取るための客観的で共通のインセンティブを提供する点にあります<a className="footnote-ref" href="#ref40" id="fnref130" role="doc-noteref"><sup>40</sup></a>。
                </p>

                <p>
                    多くのエラーバジェットポリシーでは、直近4週間のウィンドウでエラーバジェットを使い切った場合、P0(最優先)課題やセキュリティ修正を除くすべての変更・リリースを一時停止するという運用が採用されています<a className="footnote-ref" href="#ref41" id="fnref131" role="doc-noteref"><sup>41</sup></a>。この停止措置は懲罰的な意味を持つものではなく、データが「信頼性を他の機能よりも優先すべき」と示しているときにチームがそこへ集中する許可を与えるものと位置づけられています<a className="footnote-ref" href="#ref41" id="fnref132" role="doc-noteref"><sup>41</sup></a>。1件のインシデントで4週間のエラーバジェットの20%以上を消費した場合はポストモーテムの実施が、四半期で20%以上を消費するような障害クラスがあった場合は四半期計画にその是正のためのP0項目を含めることが、典型的なポリシーの一例として挙げられています<a className="footnote-ref" href="#ref41" id="fnref133" role="doc-noteref"><sup>41</sup></a>。
                </p>

                <p>
                    エラーバジェットポリシーの承認プロセス自体が、SLOが本当に適切な水準に設定されているかを検証する良いテストになります。SRE側がSLOを「過度なトイルなしには防御できない」と感じればSLOの緩和を主張でき、逆に開発チーム・プロダクトマネージャーが信頼性強化のためにリソースを割くとリリース速度が許容水準を下回ると感じれば、同様に緩和を主張できます<a className="footnote-ref" href="#ref42" id="fnref134" role="doc-noteref"><sup>42</sup></a>。
                </p>

                <h3 id="ブレームレスポストモーテム文化" tabIndex={-1}>ブレームレスポストモーテム文化</h3>

                <p>
                    品質管理の評価には、インシデントやリグレッションが発生した際の学習プロセスも含まれます。Googleでは、重大なインシデントの後に包括的なポストモーテムを作成することが文化的な規範として定着しており、継続的な投資によってダウンタイムの減少とユーザー体験の改善につながっているとされています<a className="footnote-ref" href="#ref43" id="fnref135" role="doc-noteref"><sup>43</sup></a>。
                </p>

                <Diagram id="diag-13" label="ブレームレスポストモーテムの実施手順（ドラフトから追跡まで）を示す図" />

                <p>
                    ポストモーテムが真にブレームレスであるためには、個人やチームの不適切な行動を非難することなく、インシデントの寄与要因を特定することに焦点を当てなければならないとされています<a className="footnote-ref" href="#ref44" id="fnref136" role="doc-noteref"><sup>44</sup></a>。ポストモーテムの標準的な構成要素には、サマリー、タイムライン、根本原因分析、影響範囲の評価、担当者と期限付きの是正アクション項目が含まれます。個々のインシデント対応(トリアージ・調整・コミュニケーション)については、緊急対応組織のベストプラクティスを参考にした手法が多くのテック企業で採用されています<a className="footnote-ref" href="#ref45" id="fnref137" role="doc-noteref"><sup>45</sup></a><a className="footnote-ref" href="#ref46" id="fnref138" role="doc-noteref"><sup>46</sup></a>。
                </p>

                <p>品質管理の評価に関するベストプラクティスをまとめると、次のようになります。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">チェック項目</th>
                                <th scope="col">目的</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>CI/CDパイプラインに単体/統合/E2Eテストを組み込む</td>
                                <td>
                                    デプロイ前にリグレッションを検出する<a className="footnote-ref" href="#ref9" id="fnref139" role="doc-noteref"><sup>9</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>エラーバジェットに基づくリリースゲートを設ける</td>
                                <td>
                                    信頼性が損なわれている時期に機能リリースの速度を自動的に抑制する<a className="footnote-ref" href="#ref40" id="fnref140" role="doc-noteref"><sup>40</sup></a><a className="footnote-ref" href="#ref41" id="fnref141" role="doc-noteref"><sup>41</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ポストモーテムをブレームレスな文化のもとで作成・共有する</td>
                                <td>
                                    同種のインシデントの再発を防ぎ、組織的な学習につなげる<a className="footnote-ref" href="#ref43" id="fnref142" role="doc-noteref"><sup>43</sup></a><a className="footnote-ref" href="#ref44" id="fnref143" role="doc-noteref"><sup>44</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ナレッジベースと連携させる</td>
                                <td>
                                    ポストモーテムから得られた知見を将来のインシデント対応に活かす<a className="footnote-ref" href="#ref7" id="fnref144" role="doc-noteref"><sup>7</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="66-本番環境における信頼性の確保" tabIndex={-1}>6.6 本番環境における信頼性の確保</h2>

                <p>
                    Exam
                    Guideは6.6の具体例として、カオスエンジニアリング、ペネトレーションテスト、負荷テストの3つを挙げています<a className="footnote-ref" href="#ref1" id="fnref145" role="doc-noteref"><sup>1</sup></a>。これらはいずれも「本番相当の環境やトラフィックに対して意図的に負荷や障害を発生させ、システムが実際にどう振る舞うかを検証する」というアプローチを共有しています。
                </p>

                <h3 id="カオスエンジニアリング" tabIndex={-1}>カオスエンジニアリング</h3>

                <p>
                    カオスエンジニアリングは、システムが本番環境で乱気流のような不安定な状況に耐えられるという確信を築くために、システムに対して実験を行う手法です<a className="footnote-ref" href="#ref47" id="fnref146" role="doc-noteref"><sup>47</sup></a>。Netflixが2010年に開発した「Chaos
                    Monkey」がこの分野の先駆けとして知られていますが、Google社内でも同時期に「DiRT(Disaster
                    Resilience
                    Testing)」という、事業・システム・データの災害対応力を継続的かつ自動的にテストする取り組みが導入されていました<a className="footnote-ref" href="#ref47" id="fnref147" role="doc-noteref"><sup>47</sup></a>。
                </p>

                <p>
                    カオスエンジニアリングの基本的な流れは次のとおりです<a className="footnote-ref" href="#ref48" id="fnref148" role="doc-noteref"><sup>48</sup></a>。
                </p>

                <Diagram id="diag-14" label="カオスエンジニアリングの実験サイクル（定常状態定義から修正まで）を示す図" />

                <p>
                    まずシステムの「定常状態(steady
                    state)」、つまり正常で測定可能かつ健全な出力状態を理解することから始めます<a className="footnote-ref" href="#ref48" id="fnref149" role="doc-noteref"><sup>48</sup></a>。次に、特定の乱気流条件(障害)が発生してもこの定常状態が持続するという仮説を立て、CPUリソースの枯渇、ネットワークレイテンシの追加、VMの強制終了といった特定の障害を意図的に注入する「制御されたアクション」を実行します<a className="footnote-ref" href="#ref48" id="fnref150" role="doc-noteref"><sup>48</sup></a>。これにより、DR(災害復旧)計画のような仮説を実際のデータで裏付けられた手法へと転換できます<a className="footnote-ref" href="#ref48" id="fnref151" role="doc-noteref"><sup>48</sup></a>。
                </p>

                <p>
                    Google内部でも、Spannerのようなミッションクリティカルなデータベースに対して、意図的に障害を注入するカオステストを毎週1,000件以上実行しており、これによりハッピーパスのテストだけでは見つからないバグを継続的に発見しています<a className="footnote-ref" href="#ref49" id="fnref152" role="doc-noteref"><sup>49</sup></a>。GKEやCompute Engine、Pub/Subなどを対象にGoogle
                    CloudのPSO(プロフェッショナルサービス)チームが公開しているChaos
                    Toolkit拡張機能を使うと、GCP環境向けのカオス実験を実施できます<a className="footnote-ref" href="#ref50" id="fnref153" role="doc-noteref"><sup>50</sup></a>。
                </p>

                <h3 id="ペネトレーションテスト" tabIndex={-1}>ペネトレーションテスト</h3>

                <p>
                    ペネトレーションテストは、実際の攻撃者と同じ手法でシステムの脆弱性を悪用しようと試み、不正アクセス・権限昇格・機密データへのアクセスが実際に可能かどうかを確認する検証です。自動化された脆弱性スキャンとは異なり、人手による深掘りや複数の脆弱性を連鎖させた攻撃シナリオの検証を伴う点が特徴です。
                </p>

                <p>
                    Google
                    CloudはAWSと異なり、顧客が自社のGCP環境に対してペネトレーションテストを実施する際に事前の許可申請を必須とはしていません<a className="footnote-ref" href="#ref51" id="fnref154" role="doc-noteref"><sup>51</sup></a><a className="footnote-ref" href="#ref52" id="fnref155" role="doc-noteref"><sup>52</sup></a>。ただし、次の条件を満たす必要があります。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">条件</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>対象範囲</td>
                                <td>
                                    自分自身のGoogle Cloudプロジェクト・リソースのみを対象とする
                                </td>
                            </tr>
                            <tr className="even">
                                <td>他顧客への影響</td>
                                <td>
                                    他のGoogle
                                    Cloud顧客のアプリケーションやリソースに影響を与えないこと
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>準拠すべきポリシー</td>
                                <td>
                                    Google Cloud Platform Acceptable Use
                                    Policy(利用規約)に従うこと<a className="footnote-ref" href="#ref51" id="fnref156" role="doc-noteref"><sup>51</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>脆弱性の報告</td>
                                <td>
                                    発見した脆弱性はVulnerability Reward Program経由で報告する<a className="footnote-ref" href="#ref52" id="fnref157" role="doc-noteref"><sup>52</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    Acceptable Use
                    Policyでは、他の顧客・リセラー・利用者によるサービス利用を妨害・中断させる目的での不正アクセスや、サービス提供に使われる機器を無効化・妨害・回避する行為を明示的に禁止しています<a className="footnote-ref" href="#ref51" id="fnref158" role="doc-noteref"><sup>51</sup></a>。ペネトレーションテストは自組織の管理下にあるプロジェクトの範囲内で、この利用規約の枠内で実施する必要があります。
                </p>

                <h3 id="負荷テスト" tabIndex={-1}>負荷テスト</h3>

                <p>
                    負荷テストは、実運用を想定したトラフィックパターンをシステムに与え、期待どおりにスケールできるか、ボトルネックがどこにあるかを検証する手法です。6.2で紹介したとおり、Cloud
                    Runサービスに対する負荷テストでは、まず開発環境や小規模テスト環境で同時実行数の問題を洗い出し、コンテナの同時実行数を計測してから、手動スケーリングに近い小刻みなインクリメンタルテストを行うことが推奨されています<a className="footnote-ref" href="#ref22" id="fnref159" role="doc-noteref"><sup>22</sup></a>。Cloud
                    Runの最大インスタンス数のデフォルトは100であり、これを超える規模の負荷テストを行う場合はアカウントチームとの事前調整やクォータ引き上げ申請が必要です<a className="footnote-ref" href="#ref22" id="fnref160" role="doc-noteref"><sup>22</sup></a>。
                </p>

                <p>
                    Cloud Load Balancing配下のバックエンドサービスについては、単一のVMやGKE
                    Podで小規模なテストケースを作成し、サーバー自体の性能限界を計測することが推奨されています<a className="footnote-ref" href="#ref23" id="fnref161" role="doc-noteref"><sup>23</sup></a>。過剰なサーバーキャパシティのもとでテストを行うと、サービス自体の限界ではなく、クライアントホストやネットワーク層のボトルネックを検出してしまうリスクがあるためです<a className="footnote-ref" href="#ref23" id="fnref162" role="doc-noteref"><sup>23</sup></a>。
                </p>

                <p>本番環境の信頼性確保に関するベストプラクティスをまとめると、次のとおりです。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">手法</th>
                                <th scope="col">主な確認事項</th>
                                <th scope="col">実施上の注意</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>カオスエンジニアリング</td>
                                <td>障害注入時にも定常状態(SLO)を維持できるか</td>
                                <td>
                                    小規模かつ影響範囲を限定した実験から始め、仮説と成功基準を明確にする<a className="footnote-ref" href="#ref48" id="fnref163" role="doc-noteref"><sup>48</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ペネトレーションテスト</td>
                                <td>実際の攻撃シナリオでのIAM/データ/アプリケーションの脆弱性</td>
                                <td>
                                    自プロジェクトの範囲内でAUPを遵守し、発見した脆弱性はVulnerability
                                    Reward Programへ報告する<a className="footnote-ref" href="#ref51" id="fnref164" role="doc-noteref"><sup>51</sup></a><a className="footnote-ref" href="#ref52" id="fnref165" role="doc-noteref"><sup>52</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>負荷テスト</td>
                                <td>ピーク時のスループット・レイテンシ・自動スケーリングの挙動</td>
                                <td>
                                    小規模テストでサーバー側の限界を先に特定し、大規模テストは事前にクォータ・アカウントチームと調整する<a className="footnote-ref" href="#ref22" id="fnref166" role="doc-noteref"><sup>22</sup></a><a className="footnote-ref" href="#ref23" id="fnref167" role="doc-noteref"><sup>23</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="ケーススタディへの適用の視点" tabIndex={-1}>ケーススタディへの適用の視点</h2>

                <p>
                    公式ケーススタディはSection
                    6の出題でも参照される可能性があります。運用の卓越性というテーマは特定の技術選定というより「どの水準のSLO/SLA・アラート戦略・デプロイ戦略・サポート体制が、そのビジネスの制約に適合するか」という判断を問う形で出題されやすい領域です。学習の際は、各ケーススタディが持つビジネス要件・技術要件を、本ガイドで扱った各トピックと結びつけて確認すると理解が深まります。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">確認するとよいポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SLO/SLAの水準</td>
                                <td>
                                    業種(医療、小売、自動車、メディアなど)によって許容されるダウンタイムやレイテンシの基準はどう変わるか
                                </td>
                            </tr>
                            <tr className="even">
                                <td>デプロイ戦略の選択</td>
                                <td>
                                    リスク許容度の低いワークロードにはカナリアや承認ゲート付きのパイプラインが適するか
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>サポートティアの選定</td>
                                <td>
                                    24時間稼働が必須の基幹システムにはEnhanced/Premium
                                    Supportが適切か
                                </td>
                            </tr>
                            <tr className="even">
                                <td>インシデント対応体制</td>
                                <td>
                                    規制業種(医療・金融など)では監査ログやポストモーテムの共有範囲にどのような制約があるか
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>信頼性検証の頻度</td>
                                <td>
                                    ミッションクリティカルなシステムほど、カオスエンジニアリングやペネトレーションテストの実施頻度・範囲をどう設計すべきか
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="well-architected-framework対応表" tabIndex={-1}>Well-Architected Framework対応表</h2>

                <p>
                    Section
                    6の各タスクは、運用の卓越性の柱の核となる原則と次のように対応しています。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">Section 6のタスク</th>
                                <th scope="col">主に対応する核となる原則</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>6.1 運用の卓越性の柱の原則</td>
                                <td>5つの核となる原則すべての土台</td>
                            </tr>
                            <tr className="even">
                                <td>6.2 Observability</td>
                                <td>
                                    CloudOpsによる運用準備とパフォーマンスの確保/インシデントと問題の管理
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>6.3 デプロイとリリース管理</td>
                                <td>変更の自動化と管理</td>
                            </tr>
                            <tr className="even">
                                <td>6.4 サポート支援</td>
                                <td>インシデントと問題の管理/クラウドリソースの管理と最適化</td>
                            </tr>
                            <tr className="odd">
                                <td>6.5 品質管理の評価</td>
                                <td>変更の自動化と管理/継続的な改善とイノベーション</td>
                            </tr>
                            <tr className="even">
                                <td>6.6 本番環境の信頼性確保</td>
                                <td>
                                    インシデントと問題の管理/継続的な改善とイノベーション(信頼性の柱とも密接に関連)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="学習チェックリスト" tabIndex={-1}>学習チェックリスト</h2>

                
<div className="checklist-card">
    <div className="checklist-header">
        <span className="title">学習チェックリスト</span>
        <span className="count">{completedCount} / {CHECKLIST_ITEMS.length} 完了</span>
    </div>
    <ul>
        {CHECKLIST_ITEMS.map((item, index) => (
            <li key={item.id}>
                <input
                    id={`chk${index + 1}`}
                    type="checkbox"
                    checked={!!checkedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                />
                <label htmlFor={`chk${index + 1}`}>
                    {item.label}
                </label>
            </li>
        ))}
    </ul>
</div>


                <h2 id="参考文献" tabIndex={-1}>参考文献</h2>

                <div className="ref-grid" id="referenceGrid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            Professional Cloud Architect Certification exam guide (PDF) — Google
                            Cloud.
                            <a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf">https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            Professional Cloud Architect Certification — Google Cloud.
                            <a href="https://cloud.google.com/learn/certification/cloud-architect">https://cloud.google.com/learn/certification/cloud-architect</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            About the Well-Architected Framework — Google Cloud Documentation.
                            <a href="https://docs.cloud.google.com/docs/get-started/well-architected-framework">https://docs.cloud.google.com/docs/get-started/well-architected-framework</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            Google Cloud Well-Architected Framework — Cloud Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework">https://docs.cloud.google.com/architecture/framework</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            Well-Architected Framework: Operational excellence pillar — Cloud
                            Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence">https://docs.cloud.google.com/architecture/framework/operational-excellence</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            Ensure operational readiness and performance using CloudOps — Cloud
                            Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/operational-readiness-and-performance-using-cloudops">https://docs.cloud.google.com/architecture/framework/operational-excellence/operational-readiness-and-performance-using-cloudops</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            Manage incidents and problems — Cloud Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-incidents-and-problems">https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-incidents-and-problems</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            Manage and optimize cloud resources — Cloud Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources">https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Automate and manage change — Cloud Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/automate-and-manage-change">https://docs.cloud.google.com/architecture/framework/operational-excellence/automate-and-manage-change</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            Continuously improve and innovate — Cloud Architecture Center.
                            <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/continuously-improve-and-innovate">https://docs.cloud.google.com/architecture/framework/operational-excellence/continuously-improve-and-innovate</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            Observability and monitoring — Google Cloud Documentation.
                            <a href="https://docs.cloud.google.com/docs/observability">https://docs.cloud.google.com/docs/observability</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Google Cloud Observability — Google Cloud.
                            <a href="https://cloud.google.com/products/observability">https://cloud.google.com/products/observability</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            Alerting overview — Cloud Monitoring Documentation.
                            <a href="https://docs.cloud.google.com/monitoring/alerts">https://docs.cloud.google.com/monitoring/alerts</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            Behavior of metric-based alerting policies — Cloud Monitoring
                            Documentation.
                            <a href="https://docs.cloud.google.com/monitoring/alerts/concepts-indepth">https://docs.cloud.google.com/monitoring/alerts/concepts-indepth</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            Manage alerting costs — Cloud Monitoring Documentation.
                            <a href="https://docs.cloud.google.com/monitoring/alerts/cost-control">https://docs.cloud.google.com/monitoring/alerts/cost-control</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            Manage alerting policies — Cloud Monitoring Documentation.
                            <a href="https://docs.cloud.google.com/monitoring/alerts/manage-alerts">https://docs.cloud.google.com/monitoring/alerts/manage-alerts</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            Create metric-threshold alerting policies — Cloud Monitoring
                            Documentation.
                            <a href="https://docs.cloud.google.com/monitoring/alerts/using-alerting-ui">https://docs.cloud.google.com/monitoring/alerts/using-alerting-ui</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            Cloud Profiler overview — Cloud Profiler Documentation.
                            <a href="https://docs.cloud.google.com/profiler/docs/about-profiler">https://docs.cloud.google.com/profiler/docs/about-profiler</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            Profiling concepts — Cloud Profiler Documentation.
                            <a href="https://docs.cloud.google.com/profiler/docs/concepts-profiling">https://docs.cloud.google.com/profiler/docs/concepts-profiling</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            PerfKit Benchmarker for evaluating cloud network performance — Google
                            Cloud Blog.
                            <a href="https://cloud.google.com/blog/products/networking/perfkit-benchmarker-for-evaluating-cloud-network-performance">https://cloud.google.com/blog/products/networking/perfkit-benchmarker-for-evaluating-cloud-network-performance</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            PerfKitBenchmarker (GitHub) — GoogleCloudPlatform.
                            <a href="https://github.com/GoogleCloudPlatform/PerfKitBenchmarker">https://github.com/GoogleCloudPlatform/PerfKitBenchmarker</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            Load testing best practices — Cloud Run Documentation.
                            <a href="https://docs.cloud.google.com/run/docs/about-load-testing">https://docs.cloud.google.com/run/docs/about-load-testing</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref23">
                        <div className="num">23</div>
                        <div className="txt">
                            Guidelines for load testing backend services with Application Load
                            Balancers — Cloud Load Balancing Documentation.
                            <a href="https://docs.cloud.google.com/load-balancing/docs/backend-service-load-testing">https://docs.cloud.google.com/load-balancing/docs/backend-service-load-testing</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref24">
                        <div className="num">24</div>
                        <div className="txt">
                            Overview of Cloud Deploy — Cloud Deploy Documentation.
                            <a href="https://docs.cloud.google.com/deploy/docs/overview">https://docs.cloud.google.com/deploy/docs/overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref25">
                        <div className="num">25</div>
                        <div className="txt">
                            Use a deployment strategy — Cloud Deploy Documentation.
                            <a href="https://docs.cloud.google.com/deploy/docs/deployment-strategies">https://docs.cloud.google.com/deploy/docs/deployment-strategies</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref26">
                        <div className="num">26</div>
                        <div className="txt">
                            Use a canary deployment strategy — Cloud Deploy Documentation.
                            <a href="https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary">https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref27">
                        <div className="num">27</div>
                        <div className="txt">
                            Promote your release and manage approvals — Cloud Deploy Documentation.
                            <a href="https://docs.cloud.google.com/deploy/docs/promote-release">https://docs.cloud.google.com/deploy/docs/promote-release</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref28">
                        <div className="num">28</div>
                        <div className="txt">
                            Deploy manually — Cloud Deploy Documentation.
                            <a href="https://docs.cloud.google.com/deploy/docs/deploy-manually">https://docs.cloud.google.com/deploy/docs/deploy-manually</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref29">
                        <div className="num">29</div>
                        <div className="txt">
                            Get support with Cloud Customer Care — Google Cloud Documentation.
                            <a href="https://docs.cloud.google.com/support/docs/overview">https://docs.cloud.google.com/support/docs/overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref30">
                        <div className="num">30</div>
                        <div className="txt">
                            Standard Support — Google Cloud.
                            <a href="https://cloud.google.com/support/standard">https://cloud.google.com/support/standard</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref31">
                        <div className="num">31</div>
                        <div className="txt">
                            Enhanced Support overview — Cloud Customer Care Documentation.
                            <a href="https://docs.cloud.google.com/support/docs/enhanced">https://docs.cloud.google.com/support/docs/enhanced</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref32">
                        <div className="num">32</div>
                        <div className="txt">
                            Premium Support overview — Cloud Customer Care Documentation.
                            <a href="https://docs.cloud.google.com/support/docs/premium">https://docs.cloud.google.com/support/docs/premium</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref33">
                        <div className="num">33</div>
                        <div className="txt">
                            Getting support — Google Cloud Documentation.
                            <a href="https://docs.cloud.google.com/docs/get-started/getting-support">https://docs.cloud.google.com/docs/get-started/getting-support</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref34">
                        <div className="num">34</div>
                        <div className="txt">
                            What is Active Assist — Recommender Documentation.
                            <a href="https://docs.cloud.google.com/recommender/docs/whatis-activeassist">https://docs.cloud.google.com/recommender/docs/whatis-activeassist</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref35">
                        <div className="num">35</div>
                        <div className="txt">
                            Active Assist dashboard overview — Recommender Documentation.
                            <a href="https://docs.cloud.google.com/recommender/docs/active-assist/dashboard-overview">https://docs.cloud.google.com/recommender/docs/active-assist/dashboard-overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref36">
                        <div className="num">36</div>
                        <div className="txt">
                            Find recommendations with Active Assist — Recommender Documentation.
                            <a href="https://docs.cloud.google.com/recommender/docs/quickstart-active-assist">https://docs.cloud.google.com/recommender/docs/quickstart-active-assist</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref37">
                        <div className="num">37</div>
                        <div className="txt">
                            Patterns for using Active Assist at scale — Recommender Documentation.
                            <a href="https://docs.cloud.google.com/recommender/docs/patterns-for-using-active-assist-at-scale">https://docs.cloud.google.com/recommender/docs/patterns-for-using-active-assist-at-scale</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref38">
                        <div className="num">38</div>
                        <div className="txt">
                            Personalized Service Health overview — Google Cloud Documentation.
                            <a href="https://docs.cloud.google.com/service-health/docs/overview">https://docs.cloud.google.com/service-health/docs/overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref39">
                        <div className="num">39</div>
                        <div className="txt">
                            Personalized Service Health concepts — Google Cloud Documentation.
                            <a href="https://docs.cloud.google.com/service-health/docs/concepts">https://docs.cloud.google.com/service-health/docs/concepts</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref40">
                        <div className="num">40</div>
                        <div className="txt">
                            Site Reliability Engineering — Embracing Risk — Google SRE Book.
                            <a href="https://sre.google/sre-book/embracing-risk/">https://sre.google/sre-book/embracing-risk/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref41">
                        <div className="num">41</div>
                        <div className="txt">
                            SRE Workbook — Error Budget Policy — Google SRE Workbook.
                            <a href="https://sre.google/workbook/error-budget-policy/">https://sre.google/workbook/error-budget-policy/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref42">
                        <div className="num">42</div>
                        <div className="txt">
                            SRE Workbook — Implementing SLOs — Google SRE Workbook.
                            <a href="https://sre.google/workbook/implementing-slos/">https://sre.google/workbook/implementing-slos/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref43">
                        <div className="num">43</div>
                        <div className="txt">
                            Site Reliability Engineering — Postmortem Culture — Google SRE Book.
                            <a href="https://sre.google/sre-book/postmortem-culture/">https://sre.google/sre-book/postmortem-culture/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref44">
                        <div className="num">44</div>
                        <div className="txt">
                            SRE Workbook — Postmortem Culture: Learning from Failure — Google SRE
                            Workbook.
                            <a href="https://sre.google/workbook/postmortem-culture/">https://sre.google/workbook/postmortem-culture/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref45">
                        <div className="num">45</div>
                        <div className="txt">
                            SRE Workbook — Incident Response — Google SRE Workbook.
                            <a href="https://sre.google/workbook/incident-response/">https://sre.google/workbook/incident-response/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref46">
                        <div className="num">46</div>
                        <div className="txt">
                            SRE incident management guide — Google SRE.
                            <a href="https://sre.google/resources/practices-and-processes/incident-management-guide/">https://sre.google/resources/practices-and-processes/incident-management-guide/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref47">
                        <div className="num">47</div>
                        <div className="txt">
                            Getting started with chaos engineering — Google Cloud Blog.
                            <a href="https://cloud.google.com/blog/products/devops-sre/getting-started-with-chaos-engineering">https://cloud.google.com/blog/products/devops-sre/getting-started-with-chaos-engineering</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref48">
                        <div className="num">48</div>
                        <div className="txt">
                            Using chaos engineering to test DR plans — Google Cloud Blog.
                            <a href="https://cloud.google.com/blog/products/devops-sre/using-chaos-engineering-to-test-dr-plans">https://cloud.google.com/blog/products/devops-sre/using-chaos-engineering-to-test-dr-plans</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref49">
                        <div className="num">49</div>
                        <div className="txt">
                            Chaos testing Spanner improves reliability — Google Cloud Blog.
                            <a href="https://cloud.google.com/blog/products/databases/chaos-testing-spanner-improves-reiliability">https://cloud.google.com/blog/products/databases/chaos-testing-spanner-improves-reiliability</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref50">
                        <div className="num">50</div>
                        <div className="txt">
                            chaos-engineering (GitHub) — GoogleCloudPlatform.
                            <a href="https://github.com/GoogleCloudPlatform/chaos-engineering">https://github.com/GoogleCloudPlatform/chaos-engineering</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref51">
                        <div className="num">51</div>
                        <div className="txt">
                            Google Cloud Platform Acceptable Use Policy — Google Cloud.
                            <a href="https://cloud.google.com/terms/aup">https://cloud.google.com/terms/aup</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref52">
                        <div className="num">52</div>
                        <div className="txt">
                            Cloud Security FAQ — Google Cloud Platform Console Help.
                            <a href="https://support.google.com/cloud/answer/6262505">https://support.google.com/cloud/answer/6262505</a>
                        </div>
                    </div>
                </div>
            
                </main>

                <button
                    type="button"
                    className="scroll-top-btn"
                    onClick={scrollToTop}
                    aria-label="ページの先頭へ戻る"
                >
                    ↑
                </button>
            </div>
        </div>
    );
}
