'use client';

import { useState, useCallback, memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    ariaLabel: string;
}

const Diagram = memo(function Diagram({ id, ariaLabel }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    return (
        <div className="mermaid-wrap" data-testid="mermaid-diagram">
            <MermaidDiagram
                chart={chart}
                ariaLabel={ariaLabel}
                preserveNaturalScale={true}
            />
        </div>
    );
});

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 1 ガイドコンポーネント
 */
export function PcaSection1Guide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleToggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const handleCloseSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    const handleCheckChange = useCallback((index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    }, []);

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pca-s1-page">
            <div className="layout">
                <NavBar
                    isOpen={sidebarOpen}
                    onToggle={handleToggleSidebar}
                    onClose={handleCloseSidebar}
                />

                <div className="main">
                    <div className="hero">
                        <h1>Google Cloud Professional Cloud Architect 試験対策ガイド</h1>
                        <p className="hero-sub">
                            セクション1：クラウドソリューションアーキテクチャの設計と計画（配点 約25%）
                        </p>
                        <div className="hero-badges">
                            <span className="hero-badge">📘 配点 約25%（試験最大セクション）</span>
                            <span className="hero-badge">🧭 Well-Architected Framework 準拠</span>
                            <span className="hero-badge">🗂️ 4公式ケーススタディ対応</span>
                        </div>
                    </div>

                    <blockquote>
                        <p>
                            本ガイドは、Google Cloud 公式の{' '}
                            <a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf">
                                Professional Cloud Architect Certification exam guide (v6.1)
                            </a>{' '}
                            および{' '}
                            <a href="https://cloud.google.com/learn/certification/cloud-architect?hl=en">
                                認定ページ
                            </a>{' '}
                            に基づき、試験6セクション中もっとも配点比率が高い「セクション1：クラウドソリューションアーキテクチャの設計と計画」を初学者向けに解説したものです。各項目には、根拠となる Google Cloud 公式ドキュメントの URL を脚注として付記しています。
                        </p>
                    </blockquote>

                    <hr />

                    {/* ---------- 1. このセクションの全体像 ---------- */}
                    <h2 id="1-このセクションの全体像" tabIndex={-1}>
                        1. このセクションの全体像
                    </h2>
                    <p>
                        Professional Cloud Architect（PCA）試験は6つのセクションで構成されており、そのうち「セクション1：クラウドソリューションアーキテクチャの設計と計画」は<strong>約25%</strong>と最大の配点を占めます。試験ガイドでは、このセクションは以下の5つのサブトピックに分かれています。
                    </p>

                    <Diagram
                        id="diag-1"
                        ariaLabel="セクション1の全体像とサブトピック構成"
                    />

                    <p>
                        試験全体は50〜60問の多肢選択・複数選択問題で構成され、そのうち20〜30%は4つの公式ケーススタディ（Altostrat Media、Cymbal Retail、EHR Healthcare、KnightMotives Automotive）に基づく設問です。試験時間は2時間、受験料は200米ドル（税別）、対応言語は英語と日本語です。
                        <a className="footnote-ref" href="#fn1" id="fnref1" role="doc-noteref">
                            <sup>1</sup>
                        </a>
                    </p>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://cloud.google.com/learn/certification/cloud-architect?hl=en">
                                    Professional Cloud Architect Certification | Google Cloud
                                </a>
                            </p>
                        </div>
                    </div>

                    <hr />

                    {/* ---------- 2. 前提知識：Google Cloud Well-Architected Framework ---------- */}
                    <h2 id="2-前提知識google-cloud-well-architected-framework" tabIndex={-1}>
                        2. 前提知識：Google Cloud Well-Architected Framework
                    </h2>
                    <p>
                        2025年10月30日改訂版（v6.1）の試験ガイドから、<strong>Google Cloud Well-Architected Framework（WAF）への習熟が明示的な出題範囲</strong>として追加されました。WAF はセクション1だけでなく試験全体を貫く設計思想であるため、まず全体像を押さえておく必要があります。
                        <a className="footnote-ref" href="#fn2" id="fnref2" role="doc-noteref">
                            <sup>2</sup>
                        </a>
                    </p>
                    <p>
                        WAF は「非機能要件（Non-Functional Requirement）」を扱うための6本の柱（ピラー）で構成されます。
                    </p>

                    <Diagram
                        id="diag-2"
                        ariaLabel="Google Cloud Well-Architected Framework の6ピラー"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ピラー</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">中核となる原則（例）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>運用の卓越性</td>
                                    <td>ワークロードを効率的にデプロイ・運用・監視・管理する</td>
                                    <td>
                                        SLO 定義に基づく CloudOps、継続的改善の文化{' '}
                                        <a className="footnote-ref" href="#fn3" id="fnref3" role="doc-noteref">
                                            <sup>3</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>セキュリティ・プライバシー・コンプライアンス</td>
                                    <td>要件を満たしつつ安全にワークロードを設計・デプロイ・運用する</td>
                                    <td>
                                        セキュリティ・バイ・デザイン、ゼロトラスト、シフトレフト・セキュリティ{' '}
                                        <a className="footnote-ref" href="#fn4" id="fnref4" role="doc-noteref">
                                            <sup>4</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>信頼性</td>
                                    <td>定義された条件下で意図した機能を継続的に発揮させる</td>
                                    <td>
                                        冗長化、フォールトトレラント設計、自動復旧{' '}
                                        <a className="footnote-ref" href="#fn5" id="fnref5" role="doc-noteref">
                                            <sup>5</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>パフォーマンス最適化</td>
                                    <td>需要変化に対応してリソースを効率的に利用する</td>
                                    <td>
                                        オートスケーリングによる予測可能な性能確保{' '}
                                        <a className="footnote-ref" href="#fn6" id="fnref6" role="doc-noteref">
                                            <sup>6</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>コスト最適化</td>
                                    <td>ビジネス価値に見合った支出でクラウドを運用する</td>
                                    <td>
                                        ビジネス価値との整合、コスト意識の文化、継続的最適化{' '}
                                        <a className="footnote-ref" href="#fn7" id="fnref7" role="doc-noteref">
                                            <sup>7</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>持続可能性</td>
                                    <td>エネルギー効率と環境負荷を考慮した設計を行う</td>
                                    <td>
                                        サーバーレスによるスケールゼロ、リソースのライトサイジング{' '}
                                        <a className="footnote-ref" href="#fn8" id="fnref8" role="doc-noteref">
                                            <sup>8</sup>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                PCA試験の設問は「技術的に正しい選択肢が複数ある」ケースが多く、最終的な正解は<strong>WAFの6ピラーのバランス</strong>（特にコストと信頼性のトレードオフ）で決まることが多い。設問を読む際は「どのピラーが最優先されているか」を意識すると選択肢を絞りやすい。
                            </p>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p></p>
                            <ul>
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework">
                                        Google Cloud Well-Architected Framework
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence">
                                        運用の卓越性ピラー
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework/security">
                                        セキュリティ・プライバシー・コンプライアンスピラー
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework/reliability">
                                        信頼性ピラー
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework/performance-optimization">
                                        パフォーマンス最適化ピラー
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework/cost-optimization">
                                        コスト最適化ピラー
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/framework/sustainability">
                                        持続可能性ピラー
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr />

                    {/* ---------- 3. 1.1 ビジネス要件を満たすクラウドソリューションインフラの設計 ---------- */}
                    <h2 id="3-11-ビジネス要件を満たすクラウドソリューションインフラの設計" tabIndex={-1}>
                        3. 1.1 ビジネス要件を満たすクラウドソリューションインフラの設計
                    </h2>
                    <p>
                        このタスクでは、「技術」よりも先に「ビジネス」の観点からインフラ設計を評価する能力が問われます。試験ガイド原文では以下の11項目が列挙されています。
                        <a className="footnote-ref" href="#fn1" id="fnref9" role="doc-noteref">
                            <sup>1</sup>
                        </a>
                    </p>

                    <Diagram
                        id="diag-3"
                        ariaLabel="1.1 ビジネス要件を満たすインフラ設計の11項目"
                    />

                    <h3 id="31-ビジネスユースケースと製品戦略" tabIndex={-1}>
                        3.1 ビジネスユースケースと製品戦略
                    </h3>
                    <p>
                        クラウドアーキテクトは技術者である前に、ビジネスの「なぜ」を理解する必要があります。試験では「顧客の事業目標」が明示されたシナリオに対し、それを達成する最も適したアーキテクチャを選ぶ設問が頻出します。
                    </p>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    要件定義の最初のステップとして、ステークホルダー（アプリケーションオーナー、セキュリティアーキテクト、運用管理者など）を特定し、要求を集約する。
                                    <a className="footnote-ref" href="#fn9" id="fnref10" role="doc-noteref">
                                        <sup>9</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    ビジネス上の成功指標（後述のKPI/ROI）と技術選定を紐づけて説明できるようにする。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="32-機能要件と非機能要件の特定" tabIndex={-1}>
                        3.2 機能要件と非機能要件の特定
                    </h3>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">種別</th>
                                    <th scope="col">定義</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>機能要件（Functional Requirement）</td>
                                    <td>システムが「何をするか」を定義する要件</td>
                                    <td>ユーザー認証、注文処理、レコメンデーション生成</td>
                                </tr>
                                <tr className="even">
                                    <td>非機能要件（Non-Functional Requirement）</td>
                                    <td>システムが「どのように動作するか」の品質特性</td>
                                    <td>可用性99.99%、レイテンシ100ms以内、GDPR準拠</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        非機能要件は WAF の6ピラー（信頼性・パフォーマンス・セキュリティ・コスト・運用・持続可能性）にほぼ対応します。試験では、シナリオ文中に埋め込まれた数値（RTO/RPO、SLA、応答時間など）を見逃さずに拾い、それを満たす製品を選ぶ設問が多く出題されます。
                    </p>

                    <h3 id="33-事業継続計画business-continuity-plan" tabIndex={-1}>
                        3.3 事業継続計画（Business Continuity Plan）
                    </h3>
                    <p>
                        事業継続計画は、災害や障害発生時にもビジネスを継続させるための包括的な計画で、技術的な災害復旧（DR）計画はその一部です。
                    </p>

                    <Diagram
                        id="diag-4"
                        ariaLabel="事業継続計画 (BCP) と DR 戦略の策定プロセス"
                    />

                    <p>DR計画を策定する際の核となる指標は次の2つです。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">指標</th>
                                    <th scope="col">定義</th>
                                    <th scope="col">設計上の意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>RTO（Recovery Time Objective）</td>
                                    <td>障害発生からサービス復旧までに許容される時間</td>
                                    <td>RTOが短いほど、ホットスタンバイなど高コストな構成が必要</td>
                                </tr>
                                <tr className="even">
                                    <td>RPO（Recovery Point Objective）</td>
                                    <td>障害発生時に許容されるデータ損失量（時間換算）</td>
                                    <td>
                                        RPOが短いほど、同期レプリケーションなど高頻度なバックアップが必要
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    DR計画のタスクは「シェルを開いて <code>/home/example/restore.sh</code> を実行する」のように、曖昧さのない具体的な手順に落とし込む。
                                    <a className="footnote-ref" href="#fn10" id="fnref11" role="doc-noteref">
                                        <sup>10</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    バックアップの保管場所と復旧権限者を明確にし、監査可能な形にする。
                                    <a className="footnote-ref" href="#fn10" id="fnref12" role="doc-noteref">
                                        <sup>10</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    Compute Engine・Cloud SQL・AlloyDB・VMware Engine 等のワークロードには <strong>Backup and DR Service</strong> を用い、ポリシーベースのバックアップと、変更・削除不可（Immutable/Indelible）なバックアップボールトを利用する。
                                    <a className="footnote-ref" href="#fn11" id="fnref13" role="doc-noteref">
                                        <sup>11</sup>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p></p>
                            <ul>
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide">
                                        Disaster recovery planning guide
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/architecture/disaster-recovery">
                                        Architecting disaster recovery for cloud infrastructure outages
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    <a href="https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr">
                                        Backup and DR Service overview
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="34-コスト最適化" tabIndex={-1}>
                        3.4 コスト最適化
                    </h3>
                    <p>
                        コスト最適化は WAF の1ピラーであると同時に、1.1でも独立した評価項目です。オンプレミスの資本的支出（CapEx）中心のコストモデルに対し、クラウドはほとんどのリソースが従量課金の運用的支出（OpEx）である点が根本的な違いです。
                        <a className="footnote-ref" href="#fn7" id="fnref14" role="doc-noteref">
                            <sup>7</sup>
                        </a>
                    </p>
                    <p><strong>コスト最適化の中核原則</strong></p>
                    <ol type="1">
                        <li>
                            クラウド支出をビジネス価値に整合させる（TCOで評価し、運用コストも含めて比較する）
                            <a className="footnote-ref" href="#fn12" id="fnref15" role="doc-noteref">
                                <sup>12</sup>
                            </a>
                        </li>
                        <li>組織全体にコスト意識の文化を醸成する</li>
                        <li>リソース使用量を最適化する（必要な分だけプロビジョニングする）</li>
                        <li>継続的に最適化する（利用状況とコストを継続的に監視し是正する）</li>
                    </ol>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    Compute Engine のVMは一見安価に見えても、パッチ適用・スケーリングなどの運用オーバーヘッドを含めたTCOで比較する。
                                    <a className="footnote-ref" href="#fn12" id="fnref16" role="doc-noteref">
                                        <sup>12</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    Recommender（Active Assist）による自動リソース最適化提案、予算とアラートなどの <strong>Cost Management</strong> ツール群を活用する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/architecture/framework/cost-optimization">
                                    Cost optimization pillar
                                </a>、<a href="https://docs.cloud.google.com/architecture/framework/cost-optimization/align-cloud-spending-business-value">
                                    Align cloud spending with business value
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="35-アプリケーション設計のサポート" tabIndex={-1}>
                        3.5 アプリケーション設計のサポート
                    </h3>
                    <p>
                        インフラはアプリケーションアーキテクチャ（モノリシック、マイクロサービス、イベント駆動など）を支える基盤として設計する必要があります。試験では、アプリケーションのステートフル／ステートレスの性質に応じたコンピュート選択（後述1.3）が問われます。
                    </p>

                    <h3 id="36-外部システムとの統合パターン" tabIndex={-1}>
                        3.6 外部システムとの統合パターン
                    </h3>
                    <p>
                        外部システム（オンプレミス、SaaS、他クラウド、パートナーAPIなど）との統合方式は、同期・非同期の2大パターンに大別されます。
                    </p>

                    <Diagram
                        id="diag-5"
                        ariaLabel="外部システムとの同期・非同期統合パターン"
                    />

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    APIの外部公開・管理には <strong>Apigee</strong> を用い、APIライフサイクル全体（設計・セキュリティ・監視・収益化）を一元管理する。
                                </li>
                                {' '}
                                <li>
                                    疎結合なイベント駆動統合には <strong>Pub/Sub</strong>（メッセージング）と <strong>Eventarc</strong>（イベントルーティング）を組み合わせる。
                                </li>
                                {' '}
                                <li>
                                    複数サービスをまたぐオーケストレーションには <strong>Workflows</strong> を利用し、個々のサービスの実装詳細から統合ロジックを分離する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="37-データの移動" tabIndex={-1}>
                        3.7 データの移動
                    </h3>
                    <p>
                        システム間・オンプレミスとクラウド間のデータ移動には、データ量・頻度・レイテンシ要件に応じて適切なサービスを選択します。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ユースケース</th>
                                    <th scope="col">推奨サービス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>オンライン/オンプレミスからCloud Storageへの継続的転送</td>
                                    <td>Storage Transfer Service</td>
                                </tr>
                                <tr className="even">
                                    <td>20TB〜1PB規模の大容量データを短期間で転送（オフライン）</td>
                                    <td>Transfer Appliance</td>
                                </tr>
                                <tr className="odd">
                                    <td>データベースの変更データキャプチャ（CDC）とレプリケーション</td>
                                    <td>Datastream</td>
                                </tr>
                                <tr className="even">
                                    <td>リアルタイムのイベントストリーム取り込み</td>
                                    <td>Pub/Sub + Dataflow</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://cloud.google.com/storage-transfer-service">
                                    Storage Transfer Service
                                </a>、<a href="https://cloud.google.com/transfer-appliance/docs/4.0/overview">
                                    Transfer Appliance
                                </a>、<a href="https://cloud.google.com/datastream">Datastream</a>
                            </p>
                        </div>
                    </div>

                    <h3 id="38-設計判断のトレードオフ" tabIndex={-1}>
                        3.8 設計判断のトレードオフ
                    </h3>
                    <p>
                        PCA試験の本質は「唯一の正解」を選ぶことではなく、<strong>制約の中で最も適切なトレードオフ</strong>を選ぶことです。典型的なトレードオフの軸は以下の通りです。
                    </p>

                    <Diagram
                        id="diag-6"
                        ariaLabel="コスト・信頼性・複雑さ・速度・制御のトレードオフ"
                    />

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                シナリオ内の「必須要件（must-have）」と「努力目標（nice-to-have）」を区別する。要件に明記のない可用性・DRレベルを過剰に高く見積もる（オーバーエンジニアリング）ことは、コスト最適化ピラーに反するため誤答になりやすい。
                            </p>
                        </div>
                    </div>

                    <h3 id="39-ワークロード対応戦略build--buy--modify--deprecate" tabIndex={-1}>
                        3.9 ワークロード対応戦略（Build / Buy / Modify / Deprecate）
                    </h3>
                    <p>
                        新しい要件が生じたとき、常にゼロから構築（Build）するのではなく、既存の選択肢を評価する必要があります。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">戦略</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">適用場面</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Build（構築）</td>
                                    <td>独自に開発する</td>
                                    <td>差別化要因となるコア機能、既製品で要件を満たせない場合</td>
                                </tr>
                                <tr className="even">
                                    <td>Buy（購入）</td>
                                    <td>SaaS/マーケットプレイス製品を利用する</td>
                                    <td>汎用的な機能（CRM、決済等）で独自性が不要な場合</td>
                                </tr>
                                <tr className="odd">
                                    <td>Modify（変更）</td>
                                    <td>既存システムを改修・拡張する</td>
                                    <td>レガシー資産に一定の価値が残っている場合</td>
                                </tr>
                                <tr className="even">
                                    <td>Deprecate（廃止）</td>
                                    <td>使われなくなった機能・システムを廃止する</td>
                                    <td>運用コストに見合う価値を生んでいない場合</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="310-成功指標kpiroiメトリクス" tabIndex={-1}>
                        3.10 成功指標（KPI・ROI・メトリクス）
                    </h3>
                    <p>技術選定の妥当性は、最終的にビジネス指標で説明できる必要があります。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">指標カテゴリ</th>
                                    <th scope="col">例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>KPI（重要業績評価指標）</td>
                                    <td>可用性(%)、平均復旧時間(MTTR)、デプロイ頻度、顧客満足度</td>
                                </tr>
                                <tr className="even">
                                    <td>ROI（投資収益率）</td>
                                    <td>クラウド移行による運用コスト削減額、新機能による売上増加</td>
                                </tr>
                                <tr className="odd">
                                    <td>その他メトリクス</td>
                                    <td>レイテンシp99、エラーレート、スループット</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="311-セキュリティとコンプライアンス" tabIndex={-1}>
                        3.11 セキュリティとコンプライアンス
                    </h3>
                    <p>
                        1.1では「ビジネス要件としてのセキュリティ・コンプライアンス」（規制、契約上の義務など）を扱います。技術的な実装の詳細はセクション3（設計と計画とは別枠）で扱われますが、試験ガイド上は1.1にも明記されているため、要件定義段階で規制要件（医療情報のプライバシー、PCI DSS等）を洗い出す視点が重要です。
                    </p>

                    <h3 id="312-オブザーバビリティ" tabIndex={-1}>
                        3.12 オブザーバビリティ
                    </h3>
                    <p>
                        システムの内部状態を外部から把握できる能力（オブザーバビリティ）は、運用の卓越性ピラーの土台です。Google Cloud Observability（Cloud Logging、Cloud Monitoring、Cloud Trace、Cloud Profiler）の活用がベストプラクティスとして位置づけられます（詳細はセクション6で扱う運用の卓越性の項を参照）。
                    </p>

                    <hr />

                    {/* ---------- 4. 1.2 技術要件を満たすクラウドソリューションインフラの設計 ---------- */}
                    <h2 id="4-12-技術要件を満たすクラウドソリューションインフラの設計" tabIndex={-1}>
                        4. 1.2 技術要件を満たすクラウドソリューションインフラの設計
                    </h2>
                    <p>
                        1.1が「ビジネス」の視点だったのに対し、1.2は「技術」の視点から非機能要件を満たす設計を評価します。試験ガイド原文の項目は以下の7つです。
                        <a className="footnote-ref" href="#fn1" id="fnref17" role="doc-noteref">
                            <sup>1</sup>
                        </a>
                    </p>

                    <h3 id="41-google-cloud-well-architected-framework-への習熟" tabIndex={-1}>
                        4.1 Google Cloud Well-Architected Framework への習熟
                    </h3>
                    <p>
                        前述の第2章を参照。1.2ではWAFの原則を<strong>具体的な設計判断に適用する能力</strong>が問われます。
                    </p>

                    <h3 id="42-高可用性とフェイルオーバー設計" tabIndex={-1}>
                        4.2 高可用性とフェイルオーバー設計
                    </h3>
                    <p>
                        Google Cloud のリージョン・ゾーン構成を理解し、単一障害点（SPOF）を排除する設計が基本です。
                    </p>

                    <Diagram
                        id="diag-7"
                        ariaLabel="リージョンおよびゾーン分散による高可用性構成"
                    />

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    リージョンマネージドインスタンスグループ（Regional MIG）を用いて複数ゾーンにVMを分散させ、単一ゾーン障害に耐える構成にする。
                                    <a className="footnote-ref" href="#fn13" id="fnref18" role="doc-noteref">
                                        <sup>13</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    グローバルなユーザー基盤には、複数リージョンにまたがるアクティブ-アクティブ構成とグローバル外部ロードバランサを組み合わせる。
                                </li>
                                {' '}
                                <li>
                                    ステートレスなアプリケーション層とステートフルなデータ層を分離し、ステートレス層は容易に水平スケール・フェイルオーバーできるようにする。
                                    <a className="footnote-ref" href="#fn14" id="fnref19" role="doc-noteref">
                                        <sup>14</sup>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="43-クラウドリソースの柔軟性" tabIndex={-1}>
                        4.3 クラウドリソースの柔軟性
                    </h3>
                    <p>
                        VM、コンテナ、サーバーレスなど複数の抽象化レベルを組み合わせ、ワークロードの性質に応じて柔軟にリソースを選択できる設計にする（詳細は1.3のコンピュート選択を参照）。
                    </p>

                    <h3 id="44-成長要件を満たすスケーラビリティ" tabIndex={-1}>
                        4.4 成長要件を満たすスケーラビリティ
                    </h3>

                    <Diagram
                        id="diag-8"
                        ariaLabel="メトリクス評価に基づくオートスケーリングサイクル"
                    />

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                オートスケーリングは性能とコストの両ピラーに効くレバーである。負荷増大時に予測可能な性能を提供しつつ、負荷減少時には未使用リソースを自動的に削減することで、パフォーマンス最適化とコスト最適化を同時に達成できる。
                                <a className="footnote-ref" href="#fn6" id="fnref20" role="doc-noteref">
                                    <sup>6</sup>
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="45-パフォーマンスとレイテンシ" tabIndex={-1}>
                        4.5 パフォーマンスとレイテンシ
                    </h3>
                    <p>
                        ユーザーに近いリージョンへのデプロイ、CDN（Cloud CDN）によるコンテンツキャッシュ、データベースのリードレプリカ配置などが代表的な設計手段です。パフォーマンス最適化はコストとのトレードオフを伴うことが多い点に留意します。
                        <a className="footnote-ref" href="#fn6" id="fnref21" role="doc-noteref">
                            <sup>6</sup>
                        </a>
                    </p>

                    <h3 id="46-gemini-cloud-assist" tabIndex={-1}>
                        4.6 Gemini Cloud Assist
                    </h3>
                    <p>
                        Gemini Cloud Assist は、Google Cloud のアプリケーションライフサイクル全体（設計・デプロイ・トラブルシューティング・最適化）を支援する生成AIアシスタントです。
                        <a className="footnote-ref" href="#fn15" id="fnref22" role="doc-noteref">
                            <sup>15</sup>
                        </a>
                    </p>
                    <p><strong>主な機能</strong></p>
                    <ul>
                        <li>
                            自然言語の「意図」から、Application Design Center と連携してアーキテクチャ図や本番運用可能な Terraform／gcloud／kubectl のブルー プリントを生成する。
                            <a className="footnote-ref" href="#fn16" id="fnref23" role="doc-noteref">
                                <sup>16</sup>
                            </a>
                        </li>
                        <li>
                            ログ・メトリクス・トレース・構成情報を横断的に相関分析し、パフォーマンス／コスト異常のプロアクティブな調査を支援する（プレビュー機能を含む）。
                            <a className="footnote-ref" href="#fn16" id="fnref24" role="doc-noteref">
                                <sup>16</sup>
                            </a>
                        </li>
                        <li>
                            コンソール上の現在のページコンテキストを理解し、ハルシネーションを抑制したコンテキストに即した回答を提供する。
                            <a className="footnote-ref" href="#fn17" id="fnref25" role="doc-noteref">
                                <sup>17</sup>
                            </a>
                        </li>
                    </ul>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/cloud-assist">
                                    Gemini Cloud Assist documentation
                                </a>、<a href="https://docs.cloud.google.com/cloud-assist/overview">
                                    Gemini for Google Cloud overview
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="47-バックアップとリカバリ" tabIndex={-1}>
                        4.7 バックアップとリカバリ
                    </h3>
                    <p>3.3（事業継続計画）で述べたRTO/RPOを技術的に実現する手段です。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">対象ワークロード</th>
                                    <th scope="col">推奨手段</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Compute Engine VM</td>
                                    <td>
                                        Backup and DR Service によるバックアップボールト、または Persistent Disk スナップショット
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud SQL / AlloyDB</td>
                                    <td>Backup and DR Service の自動バックアッププラン</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Storage オブジェクト</td>
                                    <td>オブジェクトバージョニング、マルチリージョンバケット</td>
                                </tr>
                                <tr className="even">
                                    <td>VMware Engine VM</td>
                                    <td>Backup and DR Service（vSphere Storage APIsベース）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                バックアップボールトは「不変性（Immutability）」と「削除不可性（Indelibility）」を持つため、ランサムウェア対策としても有効。CMEK（顧客管理暗号鍵）による暗号化にも対応する。
                                <a className="footnote-ref" href="#fn11" id="fnref26" role="doc-noteref">
                                    <sup>11</sup>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr">
                                    Backup and DR Service overview
                                </a>
                            </p>
                        </div>
                    </div>

                    <hr />

                    {/* ---------- 5. 1.3 ネットワーク・ストレージ・コンピュートリソースの設計 ---------- */}
                    <h2 id="5-13-ネットワークストレージコンピュートリソースの設計" tabIndex={-1}>
                        5. 1.3 ネットワーク・ストレージ・コンピュートリソースの設計
                    </h2>
                    <p>
                        このタスクは最も製品知識が問われる領域です。試験ガイド原文の6項目を順に解説します。
                        <a className="footnote-ref" href="#fn1" id="fnref27" role="doc-noteref">
                            <sup>1</sup>
                        </a>
                    </p>

                    <h3 id="51-オンプレミスマルチクラウド環境との統合" tabIndex={-1}>
                        5.1 オンプレミス／マルチクラウド環境との統合
                    </h3>

                    <Diagram
                        id="diag-9"
                        ariaLabel="Dedicated / Partner Interconnect, HA VPN, Cross-Cloud Interconnect による接続"
                    />

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    帯域・パフォーマンス・セキュリティ・コスト・信頼性の要件に応じてハイブリッド／マルチクラウド接続方式を選定する。
                                    <a className="footnote-ref" href="#fn18" id="fnref28" role="doc-noteref">
                                        <sup>18</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    ハブアンドスポーク型の接続VPCを使い、複数VPCにまたがるシナリオをスケールさせる。
                                    <a className="footnote-ref" href="#fn19" id="fnref29" role="doc-noteref">
                                        <sup>19</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    Shared VPC を活用し、各サービスプロジェクトが個別に同じ接続ソリューションを複製する必要をなくす。
                                    <a className="footnote-ref" href="#fn19" id="fnref30" role="doc-noteref">
                                        <sup>19</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    ハイブリッドDNSのベストプラクティスに従い、オンプレミスとGoogle Cloud間で名前解決を統一する。
                                    <a className="footnote-ref" href="#fn18" id="fnref31" role="doc-noteref">
                                        <sup>18</sup>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/architecture/landing-zones/decide-network-design">
                                    Decide the network design for your Google Cloud landing zone
                                </a>、<a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design">
                                    Best practices for VPC design
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="52-google-cloud-ai機械学習ソリューション" tabIndex={-1}>
                        5.2 Google Cloud AI/機械学習ソリューション
                    </h3>
                    <p>
                        v6.1で新設された領域です。Gemini Enterprise Agent Platform（旧 Vertex AI）が中核となります。
                        <a className="footnote-ref" href="#fn20" id="fnref32" role="doc-noteref">
                            <sup>20</sup>
                        </a>
                    </p>

                    <Diagram
                        id="diag-10"
                        ariaLabel="Gemini Enterprise Agent Platform の構成要素"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コンポーネント</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Model Garden</td>
                                    <td>
                                        Gemini・Gemma・Claude・Llama など200以上のモデルを一箇所から発見・テスト・デプロイ{' '}
                                        <a className="footnote-ref" href="#fn21" id="fnref33" role="doc-noteref">
                                            <sup>21</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Agent Builder（ADK/Agent Studio）</td>
                                    <td>
                                        コードファースト（ADK）またはローコード（Agent Studio）でAIエージェントを構築{' '}
                                        <a className="footnote-ref" href="#fn22" id="fnref34" role="doc-noteref">
                                            <sup>22</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>AI Hypercomputer</td>
                                    <td>GPU/TPUを統合した大規模モデル学習・推論向けインフラ</td>
                                </tr>
                                <tr className="even">
                                    <td>RAG Engine / Vector Search</td>
                                    <td>
                                        独自データを安全にLLMへ接続し、回答精度向上とハルシネーション低減を実現{' '}
                                        <a className="footnote-ref" href="#fn20" id="fnref35" role="doc-noteref">
                                            <sup>20</sup>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview">
                                    Agent Platform overview
                                </a>、<a href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models">
                                    Overview of Model Garden
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="53-クラウドネイティブネットワーキングvpc設計" tabIndex={-1}>
                        5.3 クラウドネイティブネットワーキング（VPC設計）
                    </h3>

                    <Diagram
                        id="diag-11"
                        ariaLabel="Shared VPC による集中ネットワーク管理"
                    />

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                （<a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design">
                                    VPC設計のベストプラクティスとリファレンスアーキテクチャ
                                </a>より）[^19]
                            </p>
                            {' '}
                            <ul>
                                <li>
                                    VPCネットワーク設計は早い段階から検討し、ステークホルダー・タイムライン・前提作業を明確にする。
                                </li>
                                {' '}
                                <li>
                                    「Keep it simple」の原則：単一のVPCで開始し、必要になった段階でShared VPCへ拡張する。
                                </li>
                                {' '}
                                <li>明確な命名規則を使用する。</li>
                                {' '}
                                <li>
                                    単一プロジェクトのデフォルトクォータを超える成長が見込まれる場合、プロジェクトごとに単一のVPCネットワークを作成し、クォータをプロジェクト単位にマッピングする。
                                </li>
                                {' '}
                                <li>
                                    自律的なチームごとにVPCネットワークを分け、共通サービスは別のVPCネットワークに集約する。
                                </li>
                                {' '}
                                <li>センシティブなデータは専用のVPCネットワークに分離する。</li>
                                {' '}
                                <li>
                                    ハイブリッド接続には動的ルーティング（Cloud Router）を可能な限り使用する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">要素</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>VPC ピアリング</td>
                                    <td>
                                        プロジェクト間・組織間でプライベート接続する（推移的接続はできない点に注意）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ファイアウォールルール</td>
                                    <td>
                                        ネットワークタグ／サービスアカウント単位でトラフィックを制御する
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Load Balancing</td>
                                    <td>グローバル／リージョナルなトラフィック分散</td>
                                </tr>
                                <tr className="even">
                                    <td>Private Service Connect（PSC）</td>
                                    <td>VPCとサービス間をプライベートかつ一方向に安全に接続する</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design">
                                    Best practices and reference architectures for VPC design
                                </a>、<a href="https://docs.cloud.google.com/vpc/docs/vpc">VPC networks</a>
                            </p>
                        </div>
                    </div>

                    <h3 id="54-データ処理ソリューションの選択" tabIndex={-1}>
                        5.4 データ処理ソリューションの選択
                    </h3>

                    <Diagram
                        id="diag-12"
                        ariaLabel="バッチ・ストリーム・DWH・オーケストレーションのデータ処理選択"
                    />

                    <h3 id="55-適切なストレージタイプの選択" tabIndex={-1}>
                        5.5 適切なストレージタイプの選択
                    </h3>
                    <p>
                        Google Cloud のストレージは、データの構造とアクセスパターンに応じて大きく「オブジェクト」「ブロック」「ファイル」「データベース」の4種類に分かれます。
                        <a className="footnote-ref" href="#fn23" id="fnref36" role="doc-noteref">
                            <sup>23</sup>
                        </a>
                    </p>

                    <Diagram
                        id="diag-13"
                        ariaLabel="アクセスパターンに応じたストレージおよびDB選択フロー"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ストレージ種別</th>
                                    <th scope="col">主なサービス</th>
                                    <th scope="col">典型的なユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>オブジェクトストレージ</td>
                                    <td>Cloud Storage</td>
                                    <td>
                                        静的サイトのアセット、データレイク、バックアップ、動画配信{' '}
                                        <a className="footnote-ref" href="#fn24" id="fnref37" role="doc-noteref">
                                            <sup>24</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ブロックストレージ</td>
                                    <td>Persistent Disk、Hyperdisk、Local SSD</td>
                                    <td>
                                        VMのブートディスク、データベースのローカルストレージ、低レイテンシキャッシュ{' '}
                                        <a className="footnote-ref" href="#fn25" id="fnref38" role="doc-noteref">
                                            <sup>25</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>ファイルストレージ</td>
                                    <td>Filestore</td>
                                    <td>
                                        複数VM/コンテナからの同時読み書き、レガシーアプリのPOSIX互換要件{' '}
                                        <a className="footnote-ref" href="#fn26" id="fnref39" role="doc-noteref">
                                            <sup>26</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>リレーショナルDB</td>
                                    <td>Cloud SQL、AlloyDB、Spanner</td>
                                    <td>
                                        トランザクション処理、グローバル規模の強整合性が必要な場合はSpanner
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>NoSQL DB</td>
                                    <td>Firestore、Bigtable</td>
                                    <td>
                                        モバイル/Webアプリのドキュメント指向データはFirestore、IoT/分析向け大規模低レイテンシはBigtable
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <ul>
                                <li>
                                    Persistent Diskは永続性が必要な用途に、Local SSDは揮発性を許容できる高速スクラッチ領域に使い分ける。
                                    <a className="footnote-ref" href="#fn25" id="fnref40" role="doc-noteref">
                                        <sup>25</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    Cloud Storageの <strong>Autoclass</strong> を使うとアクセス頻度に応じてストレージクラスが自動的に切り替わり、アクセスパターンが予測しにくいワークロードに適している。
                                    <a className="footnote-ref" href="#fn25" id="fnref41" role="doc-noteref">
                                        <sup>25</sup>
                                    </a>
                                </li>
                                {' '}
                                <li>
                                    「本番環境でDBエンジンをVM上のブロックストレージで自前運用するか、マネージドDBを使うか」は運用オーバーヘッドの観点で比較する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://cloud.google.com/blog/topics/developers-practitioners/map-storage-options-google-cloud">
                                    Object storage vs block storage vs file storage
                                </a>、<a href="https://cloud.google.com/discover/object-vs-block-vs-file-storage">
                                    How Object vs Block vs File Storage differ
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="56-コンピュートニーズのプラットフォーム製品へのマッピング" tabIndex={-1}>
                        5.6 コンピュートニーズのプラットフォーム製品へのマッピング
                    </h3>

                    <Diagram
                        id="diag-14"
                        ariaLabel="Compute Engine, GKE, Cloud Run, Cloud Run functions の選択決定ツリー"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">プラットフォーム</th>
                                    <th scope="col">管理レベル</th>
                                    <th scope="col">適したワークロード</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Compute Engine</td>
                                    <td>ユーザーがOS〜アプリまで管理</td>
                                    <td>
                                        カスタムカーネル/低レベルアクセスが必要なアプリ、リフト＆シフト移行{' '}
                                        <a className="footnote-ref" href="#fn27" id="fnref42" role="doc-noteref">
                                            <sup>27</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>GKE</td>
                                    <td>Googleがコントロールプレーンを管理</td>
                                    <td>
                                        複雑なマイクロサービス、既存のKubernetesワークロード、きめ細かい制御が必要な場合{' '}
                                        <a className="footnote-ref" href="#fn28" id="fnref43" role="doc-noteref">
                                            <sup>28</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Run</td>
                                    <td>フルマネージド（サーバーレス）</td>
                                    <td>
                                        ステートレスでリクエスト駆動のコンテナサービス、スケールゼロが有効なワークロード{' '}
                                        <a className="footnote-ref" href="#fn27" id="fnref44" role="doc-noteref">
                                            <sup>27</sup>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Run functions</td>
                                    <td>フルマネージド（サーバーレス）</td>
                                    <td>
                                        イベントドリブンな単機能処理（画像処理、Webhook等）{' '}
                                        <a className="footnote-ref" href="#fn27" id="fnref45" role="doc-noteref">
                                            <sup>27</sup>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                まず最もシンプルな Cloud Run から検討を始め、Kubernetes固有の機能が明確に必要になった時点で GKE へ、コンテナ化が困難またはOSレベルの制御が必須な場合のみ Compute Engine を選択する、という段階的アプローチが推奨される。
                                <a className="footnote-ref" href="#fn29" id="fnref46" role="doc-noteref">
                                    <sup>29</sup>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/docs/compute-area/overview">
                                    Compute overview
                                </a>、<a href="https://docs.cloud.google.com/compute/docs/overview">
                                    Compute Engine overview
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="57-コンピュートリソースの選択spot-vmカスタムマシンタイプ等" tabIndex={-1}>
                        5.7 コンピュートリソースの選択（Spot VM・カスタムマシンタイプ等）
                    </h3>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">オプション</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">適したユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Spot VM</td>
                                    <td>標準VMより大幅に安価だが、Googleにより随時回収され得る</td>
                                    <td>バッチ処理、フォールトトレラントな分散処理、CI/CD</td>
                                </tr>
                                <tr className="even">
                                    <td>カスタムマシンタイプ</td>
                                    <td>vCPU・メモリを個別に指定できる</td>
                                    <td>定義済みマシンタイプがワークロードに最適化されていない場合</td>
                                </tr>
                                <tr className="odd">
                                    <td>専用ワークロード向けマシン（GPU/TPU）</td>
                                    <td>AI/ML学習・推論、HPC向け</td>
                                    <td>大規模モデル学習、科学技術計算</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    {/* ---------- 6. 1.4 移行計画（マイグレーションプラン）の作成 ---------- */}
                    <h2 id="6-14-移行計画マイグレーションプランの作成" tabIndex={-1}>
                        6. 1.4 移行計画（マイグレーションプラン）の作成
                    </h2>
                    <p>
                        試験ガイドでは「移行計画の作成（ドキュメントとアーキテクチャ図を含む）」として、以下の4項目が挙げられています。
                        <a className="footnote-ref" href="#fn1" id="fnref47" role="doc-noteref">
                            <sup>1</sup>
                        </a>
                    </p>

                    <h3 id="61-既存システムとの統合" tabIndex={-1}>
                        6.1 既存システムとの統合
                    </h3>
                    <p>
                        移行後のシステムが、移行が完了していない既存システム（オンプレミス側の残存システムなど）とどう連携し続けるかを設計段階で明確にする。
                    </p>

                    <h3 id="62-システムデータの評価と移行migration-center" tabIndex={-1}>
                        6.2 システム・データの評価と移行（Migration Center）
                    </h3>
                    <p>
                        <strong>Migration Center</strong> は、オンプレミスや他クラウドからGoogle Cloudへの移行を加速するための統合プラットフォームです。
                        <a className="footnote-ref" href="#fn30" id="fnref48" role="doc-noteref">
                            <sup>30</sup>
                        </a>
                    </p>

                    <Diagram
                        id="diag-15"
                        ariaLabel="Migration Center による検出・アセスメント・計画・移行・最適化フロー"
                    />

                    <p><strong>主な機能</strong></p>
                    <ul>
                        <li>
                            <strong>コスト見積もり</strong>：オンプレミス資産の規模・構成に基づき、将来のGoogle Cloudコストを迅速に見積もる（プレビュー含む）。
                            <a className="footnote-ref" href="#fn30" id="fnref49" role="doc-noteref">
                                <sup>30</sup>
                            </a>
                        </li>
                        <li>
                            <strong>資産検出（Discovery）</strong>：エージェントレスのディスカバリークライアントで物理サーバー/VMを自動検出し、必要なメトリクスを収集する。
                            <a className="footnote-ref" href="#fn31" id="fnref50" role="doc-noteref">
                                <sup>31</sup>
                            </a>
                        </li>
                        <li>
                            <strong>TCOレポートと依存関係分析</strong>：総保有コスト（TCO）レポートを生成し、アプリケーション／ネットワークの依存関係を特定して「一緒に移行すべきコンポーネント」を可視化する。
                            <a className="footnote-ref" href="#fn30" id="fnref51" role="doc-noteref">
                                <sup>30</sup>
                            </a>
                        </li>
                        <li>
                            <strong>技術適合性アセスメント</strong>：データドリブンな推奨により、各資産をどのGoogle Cloud製品に移行すべきかを提案する。
                            <a className="footnote-ref" href="#fn30" id="fnref52" role="doc-noteref">
                                <sup>30</sup>
                            </a>
                        </li>
                    </ul>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                移行計画は「発見」→「評価」→「計画」の順で進め、ワークロードをカタログ化し、インフラコンポーネントおよび依存関係とマッピングしたうえで、レホスト／リプラットフォーム／リファクター等の移行パスを高レベルで特定する。
                                <a className="footnote-ref" href="#fn32" id="fnref53" role="doc-noteref">
                                    <sup>32</sup>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/migration-center/docs/migration-center-overview">
                                    Migration Center overview
                                </a>、<a href="https://docs.cloud.google.com/migration-center/docs/migration-planning-overview">
                                    About migration planning
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="63-移行手法ワークロードテストネットワーク計画依存関係計画" tabIndex={-1}>
                        6.3 移行手法、ワークロードテスト、ネットワーク計画、依存関係計画
                    </h3>
                    <p>移行戦略は、一般に「6R」と呼ばれる分類で整理されます。</p>

                    <Diagram
                        id="diag-16"
                        ariaLabel="6R 移行戦略（Rehost, Replatform, Refactor, Replace, Retire, Retain）"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">移行パス</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">移行速度</th>
                                    <th scope="col">クラウド最適化度</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Rehost</td>
                                    <td>Migrate to Virtual Machines等でそのまま移設</td>
                                    <td>速い</td>
                                    <td>低い</td>
                                </tr>
                                <tr className="even">
                                    <td>Replatform</td>
                                    <td>OSやミドルウェアなど一部をクラウド向けに調整して移設</td>
                                    <td>中程度</td>
                                    <td>中程度</td>
                                </tr>
                                <tr className="odd">
                                    <td>Refactor / Re-architect</td>
                                    <td>コンテナ化・マネージドサービス化など抜本的に再設計</td>
                                    <td>遅い</td>
                                    <td>高い</td>
                                </tr>
                                <tr className="even">
                                    <td>Replace</td>
                                    <td>既存機能をSaaSや Google Cloud のマネージド製品に置換</td>
                                    <td>ケースによる</td>
                                    <td>高い</td>
                                </tr>
                                <tr className="odd">
                                    <td>Retire</td>
                                    <td>使われていないシステムを廃止する</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                                <tr className="even">
                                    <td>Retain</td>
                                    <td>規制等の理由で当面オンプレミスに残す</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>移行に関わるツール</strong>（実運用でGoogle Cloudのプロフェッショナルサービスチームが使用）
                        <a className="footnote-ref" href="#fn33" id="fnref54" role="doc-noteref">
                            <sup>33</sup>
                        </a>
                    </p>
                    <ul>
                        <li>
                            <strong>Migrate to Virtual Machines</strong>：オンプレミス／他クラウドのVMをCompute Engineへ移行
                        </li>
                        <li>
                            <strong>Migrate to Containers</strong>：VMワークロードをGKE上のコンテナへモダナイズしながら移行
                        </li>
                        <li>
                            <strong>Storage Transfer Service / Transfer Appliance</strong>：データ移行（前述5.7参照）
                        </li>
                        <li>
                            <strong>Cloud Build / Artifact Registry</strong>：CI/CDパイプラインの構築、コンテナイメージ管理
                        </li>
                    </ul>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                ネットワーク計画では、移行期間中に発生する一時的なハイブリッド接続（オンプレミス⇔クラウド間の帯域・レイテンシ）を考慮し、依存関係計画では「一緒に移行しないと動かないコンポーネント」を移行ウェーブの単位として扱う。
                                <a className="footnote-ref" href="#fn32" id="fnref55" role="doc-noteref">
                                    <sup>32</sup>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/migration-center/docs/migration-modernization-tools">
                                    Migration tools
                                </a>、<a href="https://docs.cloud.google.com/migration-center/docs/ramp-overview">
                                    RaMP overview
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 id="64-ソフトウェアライセンスと財務影響の判断" tabIndex={-1}>
                        6.4 ソフトウェアライセンスと財務影響の判断
                    </h3>
                    <ul>
                        <li>
                            既存のオンプレミスソフトウェアライセンス（Oracle、Microsoft SQL Server等）がクラウド環境でどう適用されるか（BYOL: Bring Your Own License、または従量課金ライセンス）を事前に確認する。
                        </li>
                        <li>
                            移行によるTCO変化（ハードウェア減価償却の終了、運用人件費の変化、クラウド従量課金への移行）を財務部門と共有できる形で提示する。
                        </li>
                    </ul>

                    <hr />

                    {/* ---------- 7. 1.5 将来のソリューション改善の構想 ---------- */}
                    <h2 id="7-15-将来のソリューション改善の構想" tabIndex={-1}>
                        7. 1.5 将来のソリューション改善の構想
                    </h2>
                    <p>
                        試験ガイド原文の3項目です。
                        <a className="footnote-ref" href="#fn1" id="fnref56" role="doc-noteref">
                            <sup>1</sup>
                        </a>
                    </p>

                    <Diagram
                        id="diag-17"
                        ariaLabel="クラウド技術とビジネスニーズの進化に基づく継続的改善サイクル"
                    />

                    <h3 id="71-クラウドと技術の改善" tabIndex={-1}>
                        7.1 クラウドと技術の改善
                    </h3>
                    <p>
                        Google Cloud は新サービス・新機能を継続的にリリースするため、アーキテクトは既存アーキテクチャが陳腐化していないかを定期的にレビューする責任があります。運用の卓越性ピラーでも「価格モデルや新機能を定期的に見直し、より良い選択肢を継続的に採用する」ことが推奨されています。
                        <a className="footnote-ref" href="#fn34" id="fnref57" role="doc-noteref">
                            <sup>34</sup>
                        </a>
                    </p>

                    <h3 id="72-ビジネスニーズの進化" tabIndex={-1}>
                        7.2 ビジネスニーズの進化
                    </h3>
                    <p>
                        初期設計時の前提（トラフィック量、規制要件、組織構造）は時間とともに変化します。将来の拡張性を見据えつつも、現時点で不要な複雑さを持ち込まない（YAGNI: You Aren&apos;t Gonna Need It）バランス感覚が試験でも問われます。
                    </p>

                    <h3 id="73-クラウドファーストの設計アプローチ" tabIndex={-1}>
                        7.3 クラウドファーストの設計アプローチ
                    </h3>
                    <p>
                        新規ワークロードは「オンプレミスの制約に合わせてクラウドを使う」のではなく、「クラウドネイティブなサービス（マネージドDB、サーバーレスコンピュート、マネージドAI/ML）を前提に設計する」という考え方です。これはWAFの運用の卓越性・コスト最適化ピラーとも整合します。
                    </p>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources">
                                    Manage and optimize cloud resources
                                </a>
                            </p>
                        </div>
                    </div>

                    <hr />

                    {/* ---------- 8. 公式ケーススタディとセクション1の関係 ---------- */}
                    <h2 id="8-公式ケーススタディとセクション1の関係" tabIndex={-1}>
                        8. 公式ケーススタディとセクション1の関係
                    </h2>
                    <p>
                        2025年10月30日の試験改訂（v6.1）により、ケーススタディは以下の4種類に刷新されました。すべてに生成AI活用の要素が組み込まれています。
                        <a className="footnote-ref" href="#fn35" id="fnref58" role="doc-noteref">
                            <sup>35</sup>
                        </a>
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ケーススタディ</th>
                                    <th scope="col">業種</th>
                                    <th scope="col">既存技術環境の概要</th>
                                    <th scope="col">セクション1との関連ポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Altostrat Media</td>
                                    <td>メディア</td>
                                    <td>
                                        GKEでコンテンツ配信基盤を運用、Cloud Storageに映像/音声ライブラリ、BigQueryを分析基盤に利用、Cloud Run functionsでイベント駆動処理（トランスコード等）{' '}
                                        <a className="footnote-ref" href="#fn36" id="fnref59" role="doc-noteref">
                                            <sup>36</sup>
                                        </a>
                                    </td>
                                    <td>
                                        1.3のコンピュート選択（GKE/Cloud Run functions）、1.1のデータ移動、AI/ML活用（レコメンデーション）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cymbal Retail</td>
                                    <td>小売</td>
                                    <td>
                                        急成長中のオンライン小売業者。会話型コマース、パーソナライズ、カタログ管理の刷新を計画{' '}
                                        <a className="footnote-ref" href="#fn37" id="fnref60" role="doc-noteref">
                                            <sup>37</sup>
                                        </a>
                                    </td>
                                    <td>
                                        1.1のビジネスユースケース、1.3のAI/MLソリューション（Discovery AI等）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>EHR Healthcare</td>
                                    <td>ヘルスケア</td>
                                    <td>
                                        コロケーション環境からGoogle Cloudへ移行中のSaaS事業者。スケーラブルな基盤・DR・コンテナ化されたEHRソフトウェアの迅速なデプロイが課題{' '}
                                        <a className="footnote-ref" href="#fn38" id="fnref61" role="doc-noteref">
                                            <sup>38</sup>
                                        </a>
                                    </td>
                                    <td>
                                        1.4の移行計画、1.1の事業継続計画・コンプライアンス（医療情報保護）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>KnightMotives Automotive</td>
                                    <td>自動車</td>
                                    <td>
                                        コネクテッドカーサービス。車両からのテレメトリデータをバッチでオンプレミスに集約中で、リアルタイム性・スケーラビリティに課題{' '}
                                        <a className="footnote-ref" href="#fn39" id="fnref62" role="doc-noteref">
                                            <sup>39</sup>
                                        </a>
                                    </td>
                                    <td>
                                        1.3のデータ処理ソリューション（Pub/Sub, Dataflow）、1.1のデータの移動
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout callout-practice">
                        <span className="callout-icon">✅</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">BEST PRACTICE</span>
                            {' '}
                            <p>
                                試験本番ではケーススタディを画面分割で参照できます。すべての設問がケーススタディを必要とするわけではなく、多くの設問はケーススタディを読まずに一般原則だけで回答可能です。事前学習の際は、各ケーススタディの「現状の技術スタック」と「解決したい課題（ビジネス要件）」を1ページ程度に要約しておくと、試験本番で参照時間を節約できます。
                                <a className="footnote-ref" href="#fn40" id="fnref63" role="doc-noteref">
                                    <sup>40</sup>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="callout callout-source">
                        <span className="callout-icon">📚</span>
                        {' '}
                        <div className="callout-body">
                            <span className="pill">SOURCE</span>
                            {' '}
                            <p>
                                <a href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf">
                                    v6.1 Professional Cloud Architect Exam Guide
                                </a>
                            </p>
                        </div>
                    </div>

                    <hr />

                    {/* ---------- 9. 学習チェックリスト ---------- */}
                    <h2 id="9-学習チェックリスト" tabIndex={-1}>
                        9. 学習チェックリスト
                    </h2>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="checklist-progress" id="checklist-progress">
                                {completedCount} / 12 完了
                            </span>
                        </div>
                        <ul className="checklist-list">
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[0])}
                                        onChange={() => handleCheckChange(0)}
                                    />
                                    Well-Architected Framework の6ピラー（運用の卓越性・セキュリティ・信頼性・パフォーマンス・コスト・持続可能性）の目的をそれぞれ一言で説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[1])}
                                        onChange={() => handleCheckChange(1)}
                                    />
                                    機能要件と非機能要件の違いを説明でき、シナリオ文から両者を切り分けて抽出できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[2])}
                                        onChange={() => handleCheckChange(2)}
                                    />
                                    RTO / RPO の定義と、それぞれが設計判断（レプリケーション頻度・スタンバイ構成）に与える影響を説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[3])}
                                        onChange={() => handleCheckChange(3)}
                                    />
                                    Build / Buy / Modify / Deprecate の4戦略を使い分ける判断基準を説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[4])}
                                        onChange={() => handleCheckChange(4)}
                                    />
                                    Pub/Sub・Eventarc・Workflows・Apigee の役割の違いを説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[5])}
                                        onChange={() => handleCheckChange(5)}
                                    />
                                    Compute Engine / GKE / Cloud Run / Cloud Run functions の選択基準を説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[6])}
                                        onChange={() => handleCheckChange(6)}
                                    />
                                    オブジェクト／ブロック／ファイル／データベースストレージの使い分けを説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[7])}
                                        onChange={() => handleCheckChange(7)}
                                    />
                                    Shared VPC・VPCピアリング・Private Service Connectの違いを説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[8])}
                                        onChange={() => handleCheckChange(8)}
                                    />
                                    Migration Center の主要機能（コスト見積もり・資産検出・依存関係分析）を説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[9])}
                                        onChange={() => handleCheckChange(9)}
                                    />
                                    6R（Rehost/Replatform/Refactor/Replace/Retire/Retain）の移行戦略を説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[10])}
                                        onChange={() => handleCheckChange(10)}
                                    />
                                    Gemini Cloud Assist と Gemini Enterprise Agent Platform（Model Garden含む）の違いを説明できる
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checkedItems[11])}
                                        onChange={() => handleCheckChange(11)}
                                    />
                                    4つの公式ケーススタディの業種と主要な技術課題を要約できる
                                </label>
                            </li>
                        </ul>
                    </div>

                    <hr />

                    {/* ---------- 10. 参考文献一覧 ---------- */}
                    <h2 id="10-参考文献一覧" tabIndex={-1}>
                        10. 参考文献一覧
                    </h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <h4>公式試験情報</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://cloud.google.com/learn/certification/cloud-architect?hl=en"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Professional Cloud Architect Certification | Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Professional Cloud Architect Exam Guide (v6.1, PDF)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Professional Cloud Architect Exam Guide (PDF, 提供リンク)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>Well-Architected Framework</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Google Cloud Well-Architected Framework
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/operational-excellence"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        運用の卓越性ピラー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/security"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        セキュリティ・プライバシー・コンプライアンスピラー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/reliability"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        信頼性ピラー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/performance-optimization"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        パフォーマンス最適化ピラー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/cost-optimization"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        コスト最適化ピラー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/sustainability"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        持続可能性ピラー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/cost-optimization/align-cloud-spending-business-value"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Align cloud spending with business value
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Manage and optimize cloud resources
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>事業継続・災害復旧</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Disaster recovery planning guide
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/disaster-recovery"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Architecting disaster recovery for cloud infrastructure outages
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Backup and DR Service overview
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>ネットワーク</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/best-practices-vpc-design"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Best practices and reference architectures for VPC design
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/architecture/landing-zones/decide-network-design"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Decide the network design for your Google Cloud landing zone
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/vpc/docs/vpc"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        VPC networks
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>ストレージ</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://cloud.google.com/blog/topics/developers-practitioners/map-storage-options-google-cloud"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Object storage vs block storage vs file storage
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://cloud.google.com/discover/object-vs-block-vs-file-storage"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        How Object vs Block vs File Storage differ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>コンピュート</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/docs/compute-area/overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Compute overview
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/compute/docs/overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Compute Engine overview
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/compute/docs/choose-compute-deployment-option"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Choose a Compute Engine deployment strategy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>AI / 生成AI</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/cloud-assist"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Gemini Cloud Assist documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/cloud-assist/overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Gemini for Google Cloud overview
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Agent Platform overview
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Overview of Model Garden
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>移行</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/migration-center/docs/migration-center-overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Migration Center overview
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/migration-center/docs/migration-planning-overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        About migration planning
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/migration-center/docs/migration-modernization-tools"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        Migration tools
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://docs.cloud.google.com/migration-center/docs/ramp-overview"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        RaMP overview
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>ケーススタディ</h4>
                            <ul>
                                <li>
                                    <a
                                        className="ref-item"
                                        href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf"
                                    >
                                        <span className="ref-icon">↗</span>
                                        {' '}
                                        v6.1 Professional Cloud Architect Exam Guide（ケーススタディ一覧掲載）
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <aside
                        className="footnotes footnotes-end-of-document"
                        id="footnotes"
                        role="doc-endnotes"
                    >
                        <hr />
                        <ol>
                            <li id="fn1">
                                <p>
                                    <a href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf">
                                        Professional Cloud Architect Exam Guide (v6.1, PDF)
                                    </a>
                                    {' '}— セクション1の出題項目一覧（原文）
                                    <a className="footnote-back" href="#fnref1" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref9" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref17" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref27" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref47" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref56" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn2">
                                <p>
                                    <a href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf">
                                        v6.1 Exam Guide
                                    </a>
                                    {' '}— 「Familiarity with the Google Cloud Well-Architected Framework is a key requirement」の記載
                                    <a className="footnote-back" href="#fnref2" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn3">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence">
                                        運用の卓越性ピラー
                                    </a>
                                    <a className="footnote-back" href="#fnref3" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn4">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/security">
                                        セキュリティ・プライバシー・コンプライアンスピラー
                                    </a>
                                    <a className="footnote-back" href="#fnref4" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn5">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/reliability">
                                        信頼性ピラー
                                    </a>
                                    <a className="footnote-back" href="#fnref5" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn6">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/performance-optimization">
                                        パフォーマンス最適化ピラー
                                    </a>
                                    <a className="footnote-back" href="#fnref6" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref20" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref21" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn7">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/cost-optimization">
                                        コスト最適化ピラー
                                    </a>
                                    <a className="footnote-back" href="#fnref7" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref14" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn8">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/sustainability">
                                        持続可能性ピラー
                                    </a>
                                    <a className="footnote-back" href="#fnref8" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn9">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design">
                                        Best practices and reference architectures for VPC design
                                    </a>
                                    {' '}— ステークホルダー特定に関する一般原則
                                    <a className="footnote-back" href="#fnref10" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn10">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide">
                                        Disaster recovery planning guide
                                    </a>
                                    <a className="footnote-back" href="#fnref11" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref12" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn11">
                                <p>
                                    <a href="https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr">
                                        Backup and DR Service overview
                                    </a>
                                    <a className="footnote-back" href="#fnref13" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref26" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn12">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/cost-optimization/align-cloud-spending-business-value">
                                        Align cloud spending with business value
                                    </a>
                                    <a className="footnote-back" href="#fnref15" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref16" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn13">
                                <p>
                                    <a href="https://docs.cloud.google.com/compute/docs/choose-compute-deployment-option">
                                        Choose a Compute Engine deployment strategy
                                    </a>
                                    <a className="footnote-back" href="#fnref18" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn14">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework">
                                        Well-Architected Framework
                                    </a>
                                    {' '}— ステートフル/ステートレスアプリケーションに関する記載
                                    <a className="footnote-back" href="#fnref19" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn15">
                                <p>
                                    <a href="https://docs.cloud.google.com/cloud-assist">
                                        Gemini Cloud Assist documentation
                                    </a>
                                    <a className="footnote-back" href="#fnref22" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn16">
                                <p>
                                    <a href="https://cloud.google.com/products/gemini/cloud-assist">
                                        Gemini Cloud Assist: AI-assisted cloud operations and management
                                    </a>
                                    <a className="footnote-back" href="#fnref23" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref24" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn17">
                                <p>
                                    <a href="https://docs.cloud.google.com/cloud-assist/overview">
                                        Gemini for Google Cloud overview
                                    </a>
                                    <a className="footnote-back" href="#fnref25" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn18">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/hybrid-multicloud-secure-networking-patterns/general-best-practices">
                                        General best practices for hybrid/multicloud networking
                                    </a>
                                    <a className="footnote-back" href="#fnref28" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref31" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn19">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design">
                                        Best practices and reference architectures for VPC design
                                    </a>
                                    <a className="footnote-back" href="#fnref29" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref30" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn20">
                                <p>
                                    <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview">
                                        Agent Platform overview
                                    </a>
                                    <a className="footnote-back" href="#fnref32" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref35" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn21">
                                <p>
                                    <a href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models">
                                        Overview of Model Garden
                                    </a>
                                    <a className="footnote-back" href="#fnref33" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn22">
                                <p>
                                    <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models">
                                        Overview of models on Agent Platform
                                    </a>
                                    <a className="footnote-back" href="#fnref34" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn23">
                                <p>
                                    <a href="https://cloud.google.com/blog/topics/developers-practitioners/map-storage-options-google-cloud">
                                        Object storage vs block storage vs file storage
                                    </a>
                                    <a className="footnote-back" href="#fnref36" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn24">
                                <p>
                                    <a href="https://cloud.google.com/discover/object-vs-block-vs-file-storage">
                                        How Object vs Block vs File Storage differ
                                    </a>
                                    <a className="footnote-back" href="#fnref37" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn25">
                                <p>
                                    <a href="https://docs.cloud.google.com/compute/docs/overview">
                                        Compute Engine overview
                                    </a>
                                    {' '}— ブロックストレージオプションに関する記載
                                    <a className="footnote-back" href="#fnref38" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref40" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref41" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn26">
                                <p>
                                    <a href="https://cloud.google.com/blog/products/storage-data-transfer/pick-the-right-storage-option-on-google-cloud">
                                        Pick the right storage option on Google Cloud
                                    </a>
                                    <a className="footnote-back" href="#fnref39" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn27">
                                <p>
                                    <a href="https://docs.cloud.google.com/docs/compute-area/overview">
                                        Compute overview
                                    </a>
                                    <a className="footnote-back" href="#fnref42" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref44" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref45" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn28">
                                <p>
                                    <a href="https://docs.cloud.google.com/kubernetes-engine/docs/best-practices/networking">
                                        Best practices for GKE networking
                                    </a>
                                    <a className="footnote-back" href="#fnref43" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn29">
                                <p>
                                    一般的なGoogle Cloudコンピュート選択のベストプラクティス（段階的アプローチ）—{' '}
                                    <a href="https://docs.cloud.google.com/docs/compute-area/overview">
                                        Compute overview
                                    </a>
                                    {' '}の管理オーバーヘッドの記載に基づく整理
                                    <a className="footnote-back" href="#fnref46" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn30">
                                <p>
                                    <a href="https://docs.cloud.google.com/migration-center/docs/migration-center-overview">
                                        Migration Center overview
                                    </a>
                                    <a className="footnote-back" href="#fnref48" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref49" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref51" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref52" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn31">
                                <p>
                                    <a href="https://docs.cloud.google.com/migration-center/docs/discovery-client-overview">
                                        Migration Center discovery client overview
                                    </a>
                                    <a className="footnote-back" href="#fnref50" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn32">
                                <p>
                                    <a href="https://docs.cloud.google.com/migration-center/docs/migration-planning-overview">
                                        About migration planning
                                    </a>
                                    <a className="footnote-back" href="#fnref53" role="doc-backlink">↩︎</a>
                                    {' '}
                                    <a className="footnote-back" href="#fnref55" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn33">
                                <p>
                                    <a href="https://docs.cloud.google.com/migration-center/docs/migration-modernization-tools">
                                        Migration tools
                                    </a>
                                    <a className="footnote-back" href="#fnref54" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn34">
                                <p>
                                    <a href="https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources">
                                        Manage and optimize cloud resources
                                    </a>
                                    <a className="footnote-back" href="#fnref57" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn35">
                                <p>
                                    <a href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf">
                                        v6.1 Professional Cloud Architect Exam Guide
                                    </a>
                                    {' '}— ケーススタディ一覧
                                    <a className="footnote-back" href="#fnref58" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn36">
                                <p>
                                    <a href="https://services.google.com/fh/files/misc/altostrat_media_case_study_english.pdf">
                                        Altostrat Media Case Study (PDF)
                                    </a>
                                    <a className="footnote-back" href="#fnref59" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn37">
                                <p>
                                    <a href="https://services.google.com/fh/files/misc/cymbal_retail_case_study_english.pdf">
                                        Cymbal Retail Case Study (PDF)
                                    </a>
                                    <a className="footnote-back" href="#fnref60" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn38">
                                <p>
                                    EHR Healthcare Case Study — 公式試験ガイドのケーススタディ一覧に基づく要約（<a href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf">v6.1 Exam Guide</a>参照）
                                    <a className="footnote-back" href="#fnref61" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn39">
                                <p>
                                    KnightMotives Automotive Case Study — 公式試験ガイドのケーススタディ一覧に基づく要約（<a href="https://services.google.com/fh/files/misc/v6.1_pca_professional_cloud_architect_exam_guide_english.pdf">v6.1 Exam Guide</a>参照）
                                    <a className="footnote-back" href="#fnref62" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                            {' '}
                            <li id="fn40">
                                <p>
                                    <a href="https://cloud.google.com/learn/certification/cloud-architect?hl=en">
                                        Professional Cloud Architect Certification
                                    </a>
                                    {' '}— 「You can view the case studies on a split screen during the exam」の記載
                                    <a className="footnote-back" href="#fnref63" role="doc-backlink">↩︎</a>
                                </p>
                            </li>
                        </ol>
                    </aside>
                </div>
            </div>
        </div>
    );
}
