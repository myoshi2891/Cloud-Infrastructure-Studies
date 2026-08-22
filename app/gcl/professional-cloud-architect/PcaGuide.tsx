'use client';

import { memo, useState, useCallback } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({
    id,
    label,
}: {
    id: DiagramId;
    label: string;
}) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

const CHECKLIST_DATA = [
    'Well-Architected Frameworkの6つの柱をそれぞれ一言で説明できる',
    '機能要件と非機能要件の違いを具体例とともに説明できる',
    'Shared VPC・VPCピアリング・Private Service Connect・NCCの使い分けを説明できる',
    'Compute Engine・GKE・Cloud Run・Cloud Run functionsの選定基準を説明できる',
    'Cloud SQL・AlloyDB・Spanner・Firestore・Bigtableの使い分けを説明できる',
    'RPO/RTOの定義と、それぞれを短縮する代表的な手段を説明できる',
    'Migration Centerを用いた移行の4フェーズ(Assess/Plan/Deploy/Optimize)を説明できる',
    'リソース階層(Organization/Folder/Project)とポリシー継承の仕組みを説明できる',
    'IAM・IAP・Context-Aware Access・Workload Identity Federationの役割の違いを説明できる',
    'CMEK/CSEK/Secret Manager/Sensitive Data Protectionの使い分けを説明できる',
    'VPC Service Controlsが何を防ぐための仕組みかを説明できる',
    'SLI/SLO/SLAの関係を正しく説明できる',
    'Blue/Greenデプロイとカナリアリリースの違いとそれぞれの利点を説明できる',
    'CapExとOpExの違いをクラウド移行の文脈で説明できる',
    '4つのケーススタディ(Altostrat Media/Cymbal Retail/EHR Healthcare/KnightMotives Automotive)の業種と概要を把握している',
];

/**
 * Professional Cloud Architect (PCA) 試験完全対策ガイド メインコンポーネント
 */
export function PcaGuide() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        () => new Array(CHECKLIST_DATA.length).fill(false),
    );

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    const completedCount = checkedItems.filter(Boolean).length;

    return (
        <div className="pca-page">
            <div className="layout">
                <NavBar
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                    onClose={closeSidebar}
                />
                <main className="main">
                    <div className="hero">
                        <h1>
                            Google Cloud Professional Cloud Architect（PCA）<br />認定試験
                            完全対策ガイド
                        </h1>
                        <p className="hero-desc">
                            初学者向けにステップバイステップで解説する、公式Exam
                            Guideの出題範囲を完全網羅した対策資料です。
                        </p>
                    </div>

                    <blockquote className="lede-quote">
                        <p>
                            本ガイドはGoogle Cloud公式の<a
                                href="https://cloud.google.com/learn/certification/cloud-architect"
                                rel="noopener noreferrer"
                                target="_blank"
                            >認定ページ</a>および<a
                                href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
                                rel="noopener noreferrer"
                                target="_blank"
                            >公式Exam Guide PDF</a>（2025年改訂版）の出題範囲に厳密に対応して構成しています。初学者の方でも迷わず学習できるよう、各項目を「何を問われるか」「関連するGoogle Cloudサービス」「試験で問われやすいベストプラクティス」の3点セットで解説します。
                        </p>
                    </blockquote>
                    <div className="quicknav-grid">
                        <a className="quicknav-card" href="#この試験について">
                            <span className="quicknav-title">この試験について</span>
                            <span className="quicknav-desc">試験概要・WAF・ケーススタディ</span>
                        </a>
                        <a
                            className="quicknav-card"
                            href="#section-1-クラウドソリューションアーキテクチャの設計と計画約25"
                        >
                            <span className="quicknav-title">Section 1</span>
                            <span className="quicknav-desc">設計と計画（約25%）</span>
                        </a>
                        <a
                            className="quicknav-card"
                            href="#section-2-クラウドソリューションインフラの管理とプロビジョニング約175"
                        >
                            <span className="quicknav-title">Section 2</span>
                            <span className="quicknav-desc">管理とプロビジョニング（約17.5%）</span>
                        </a>
                        <a
                            className="quicknav-card"
                            href="#section-3-セキュリティとコンプライアンスの設計約175"
                        >
                            <span className="quicknav-title">Section 3</span>
                            <span className="quicknav-desc">セキュリティとコンプライアンス（約17.5%）</span>
                        </a>
                        <a
                            className="quicknav-card"
                            href="#section-4-技術ビジネスプロセスの分析と最適化約15"
                        >
                            <span className="quicknav-title">Section 4</span>
                            <span className="quicknav-desc">プロセス分析と最適化（約15%）</span>
                        </a>
                        <a className="quicknav-card" href="#section-5-実装の管理約125">
                            <span className="quicknav-title">Section 5</span>
                            <span className="quicknav-desc">実装の管理（約12.5%）</span>
                        </a>
                        <a
                            className="quicknav-card"
                            href="#section-6-ソリューションと運用の卓越性の確保約125"
                        >
                            <span className="quicknav-title">Section 6</span>
                            <span className="quicknav-desc">運用の卓越性の確保（約12.5%）</span>
                        </a>
                        <a className="quicknav-card" href="#学習チェックリスト">
                            <span className="quicknav-title">学習チェックリスト</span>
                            <span className="quicknav-desc">合格判定のセルフチェック</span>
                        </a>
                        <a className="quicknav-card" href="#参考文献">
                            <span className="quicknav-title">参考文献</span>
                            <span className="quicknav-desc">出典URL一覧</span>
                        </a>
                    </div>

                    <hr />
                    <h2 id="この試験について" tabIndex={-1}>この試験について</h2>
                    <p>
                        Professional Cloud Architect（PCA）は、Google
                        Cloudの技術を活用して<strong>堅牢・安全・スケーラブル・効率的・費用対効果が高く・可用性が高く・柔軟な</strong>ソリューションを設計・開発・管理できる能力を証明する認定資格です。単なるサービスの知識だけでなく、<strong>ビジネス要件を技術要件に翻訳する力</strong>が問われる点が最大の特徴です。
                    </p>
                    <h3 id="試験の基本情報" tabIndex={-1}>試験の基本情報</h3>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>試験時間</td>
                                    <td>2時間</td>
                                </tr>
                                <tr className="even">
                                    <td>受験料</td>
                                    <td>$200（税別）</td>
                                </tr>
                                <tr className="odd">
                                    <td>出題形式</td>
                                    <td>選択式・複数選択式 50〜60問</td>
                                </tr>
                                <tr className="even">
                                    <td>言語</td>
                                    <td>英語・日本語</td>
                                </tr>
                                <tr className="odd">
                                    <td>ケーススタディ</td>
                                    <td>2つ（利用可能な4つのうち、出題全体の20〜30%を占める）</td>
                                </tr>
                                <tr className="even">
                                    <td>有効期間</td>
                                    <td>2年間</td>
                                </tr>
                                <tr className="odd">
                                    <td>前提条件</td>
                                    <td>
                                        なし（推奨: 業界経験3年以上、うちGoogle
                                        Cloudでの設計・運用経験1年以上）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/learn/certification/cloud-architect"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Professional Cloud Architect Certification｜Google Cloud
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="出題セクションと配点" tabIndex={-1}>出題セクションと配点</h3>
                    <p>
                        公式Exam
                        Guideでは、試験は6つの大分類（セクション）に分かれており、それぞれに出題比率が明示されています。まずは全体像を掴みましょう。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">セクション</th>
                                    <th scope="col">出題比率</th>
                                    <th scope="col">テーマ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>1. クラウドソリューションアーキテクチャの設計と計画</td>
                                    <td>約25%</td>
                                    <td>
                                        要件分析、WAF、ネットワーク/ストレージ/コンピュート設計、移行計画
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>2. クラウドソリューションインフラの管理とプロビジョニング</td>
                                    <td>約17.5%</td>
                                    <td>
                                        ネットワーク構成、ストレージ構成、コンピュート構成、AI/MLプラットフォーム
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>3. セキュリティとコンプライアンスの設計</td>
                                    <td>約17.5%</td>
                                    <td>IAM、リソース階層、データセキュリティ、コンプライアンス</td>
                                </tr>
                                <tr className="even">
                                    <td>4. 技術・ビジネスプロセスの分析と最適化</td>
                                    <td>約15%</td>
                                    <td>SDLC、CI/CD、ステークホルダー管理、コスト最適化</td>
                                </tr>
                                <tr className="odd">
                                    <td>5. 実装の管理</td>
                                    <td>約12.5%</td>
                                    <td>デプロイ支援、IaC、Google Cloud SDK/API活用</td>
                                </tr>
                                <tr className="even">
                                    <td>6. ソリューションと運用の卓越性の確保</td>
                                    <td>約12.5%</td>
                                    <td>Observability、リリース管理、信頼性テスト</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-1" label="PCA試験の出題セクションと配点比率" />
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Professional Cloud Architect Exam Guide（PDF）
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="google-cloud-well-architected-frameworkwafを理解することが合格の鍵" tabIndex={-1}>
                        Google Cloud Well-Architected Framework（WAF）を理解することが合格の鍵
                    </h3>
                    <p>
                        公式Exam Guideは、<strong>Well-Architected Frameworkへの精通が本資格の中核要件である</strong>と明言しています。6つの柱（Pillar）は試験全体に暗黙的・明示的に織り込まれているため、最初に押さえておくべき土台です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">柱（Pillar）</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">代表的な問い</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>運用の卓越性（Operational Excellence）</td>
                                    <td>効率的な運用・デプロイ・モニタリングの仕組み</td>
                                    <td>障害発生時に迅速に検知・復旧できるか</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ（Security）</td>
                                    <td>情報・システム・資産の保護</td>
                                    <td>最小権限が徹底されているか</td>
                                </tr>
                                <tr>
                                    <td>信頼性（Reliability）</td>
                                    <td>期待通りに一貫して機能し続ける能力</td>
                                    <td>単一障害点(SPOF)は排除されているか</td>
                                </tr>
                                <tr>
                                    <td>パフォーマンス最適化（Performance Optimization）</td>
                                    <td>リソースを効率的に活用し要件を満たす</td>
                                    <td>リージョン選定やキャッシュ戦略は適切か</td>
                                </tr>
                                <tr>
                                    <td>コスト最適化（Cost Optimization）</td>
                                    <td>不要な支出を避け価値を最大化</td>
                                    <td>過剰プロビジョニングはないか</td>
                                </tr>
                                <tr>
                                    <td>持続可能性（Sustainability）</td>
                                    <td>環境負荷を最小化する設計</td>
                                    <td>リージョン選択でカーボンフットプリントを考慮したか</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            試験問題の多くは「どの選択肢が最もコストが低いか」ではなく「ビジネス要件と技術要件の両方を満たしつつ、WAFの複数の柱をバランスよく満たす選択肢はどれか」を問う設計になっています。単一の正解軸（例：コストだけ）で選択肢を絞り込まないようにしましょう。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture/framework"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Google Cloud Architecture Framework
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="ケーススタディの扱い方" tabIndex={-1}>ケーススタディの扱い方</h3>
                    <p>
                        試験問題の20〜30%は、<strong>架空の企業のビジネス背景・既存システム・技術要件・将来要件</strong>を記述したケーススタディに基づいて出題されます。試験中は分割画面でケーススタディを参照できます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ケーススタディ</th>
                                    <th scope="col">業種</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Altostrat Media</td>
                                    <td>メディア</td>
                                </tr>
                                <tr>
                                    <td>Cymbal Retail</td>
                                    <td>小売</td>
                                </tr>
                                <tr>
                                    <td>EHR Healthcare</td>
                                    <td>ヘルスケア</td>
                                </tr>
                                <tr>
                                    <td>KnightMotives Automotive</td>
                                    <td>自動車</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            試験前に4つのケーススタディを一度読み込んでおくと、本番で「このケーススタディはこういう制約がある会社だ」とすぐに思い出せて時間短縮になります。ケーススタディ関連の問題は、一般知識だけで解こうとせず、必ず「この企業の制約・目標に照らして最適な選択肢はどれか」という視点で選びましょう。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Professional Cloud Architect Exam Guide（PDF）
                            </a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="section-1-クラウドソリューションアーキテクチャの設計と計画約25" tabIndex={-1}>
                        Section 1: クラウドソリューションアーキテクチャの設計と計画（約25%）
                    </h2>
                    <p>
                        試験全体で最も配点が高いセクションです。5つのタスク（1.1〜1.5）に分かれており、「ビジネス要件」「技術要件」「リソース設計」「移行計画」「将来構想」という設計の一連の流れを問われます。
                    </p>
                    <h3 id="11-ビジネス要件を満たすクラウドソリューションインフラの設計" tabIndex={-1}>
                        1.1 ビジネス要件を満たすクラウドソリューションインフラの設計
                    </h3>
                    <p>
                        アーキテクトの仕事は技術選定の前に「何を達成したいのか」を正しく定義することから始まります。このタスクでは、ビジネス側の要求を技術設計に落とし込む力が問われます。
                    </p>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>ビジネスユースケースとプロダクト戦略</li>
                        <li>機能要件と非機能要件の識別</li>
                        <li>ビジネス継続計画（BCP）</li>
                        <li>コスト最適化</li>
                        <li>アプリケーション設計のサポート</li>
                        <li>外部システムとの統合パターン</li>
                        <li>データの移動</li>
                        <li>設計判断のトレードオフ</li>
                        <li>ワークロード処遇戦略（構築・購入・改修・廃止）</li>
                        <li>成功指標（KPI、ROI、メトリクス）</li>
                        <li>セキュリティとコンプライアンス</li>
                        <li>Observability（可観測性）</li>
                    </ul>
                    <p><strong>機能要件 vs 非機能要件</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種別</th>
                                    <th scope="col">定義</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>機能要件</td>
                                    <td>システムが「何をするか」</td>
                                    <td>ユーザー登録機能、決済処理、レポート出力</td>
                                </tr>
                                <tr>
                                    <td>非機能要件</td>
                                    <td>システムが「どのように動作するか」</td>
                                    <td>可用性99.99%、レイテンシ200ms以下、月間コスト上限</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            非機能要件（特に可用性・レイテンシ・コスト上限）を先に数値化してから設計に入ると、後工程での手戻りを防げます。試験問題でも「〇〇msのレイテンシ要件がある」「予算は月額〇〇ドル以内」といった非機能要件が正解を絞り込む決め手になることが多いです。
                        </p>
                    </blockquote>
                    <p><strong>ワークロード処遇戦略（Disposition Strategy）</strong></p>
                    <p>既存システムをクラウド化する際、すべてを同じ方法で移行する必要はありません。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">戦略</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">適するケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Build（構築）</td>
                                    <td>クラウドネイティブに新規開発</td>
                                    <td>差別化価値の高いコア機能</td>
                                </tr>
                                <tr>
                                    <td>Buy（購入）</td>
                                    <td>SaaS/マーケットプレイス製品を採用</td>
                                    <td>汎用的な業務機能（CRM等）</td>
                                </tr>
                                <tr>
                                    <td>Modify（改修）</td>
                                    <td>既存資産を一部改修して移行</td>
                                    <td>レガシーだが刷新コストが見合わないシステム</td>
                                </tr>
                                <tr>
                                    <td>Deprecate（廃止）</td>
                                    <td>利用停止・統合</td>
                                    <td>重複機能や利用実績のないシステム</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-2" label="ビジネス要件からインフラ設計への落とし込みフロー" />
                    <p>
                        <strong>統合パターン</strong>:
                        外部システムとの連携は、同期API呼び出しだけでなく、Pub/Subによる非同期メッセージング、Eventarcによるイベント駆動連携、Cloud Data Fusion/Dataflowによるバッチ・ストリーミング統合など、要件に応じた選択が必要です。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            システム間の結合度を下げたい場合はPub/Subなどの非同期メッセージングを優先します。強い一貫性が必要な同期的トランザクションにのみ同期APIを使うと、可用性・拡張性の両面で有利になります。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture/framework/system-design"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Google Cloud Architecture Framework: システム設計の考慮事項
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/architecture/application-integration"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                アプリケーション統合の設計パターン
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="12-技術要件を満たすクラウドソリューションインフラの設計" tabIndex={-1}>
                        1.2 技術要件を満たすクラウドソリューションインフラの設計
                    </h3>
                    <p>ビジネス要件が固まったら、それを実現する技術アーキテクチャに落とし込みます。</p>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>Well-Architected Frameworkへの精通</li>
                        <li>高可用性（HA）とフェイルオーバー設計</li>
                        <li>クラウドリソースの柔軟性</li>
                        <li>成長要件を満たすスケーラビリティ</li>
                        <li>パフォーマンスとレイテンシ</li>
                        <li>Gemini Cloud Assist</li>
                        <li>バックアップとリカバリ</li>
                    </ul>
                    <p><strong>高可用性設計の基本パターン</strong></p>
                    <p>
                        Google Cloudのリソース階層（リージョン・ゾーン）を理解することがHA設計の出発点です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">障害範囲</th>
                                    <th scope="col">対策</th>
                                    <th scope="col">実現手段の例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ゾーン障害</td>
                                    <td>マルチゾーン構成</td>
                                    <td>リージョナルMIG（マネージドインスタンスグループ）、リージョナルGKEクラスタ</td>
                                </tr>
                                <tr>
                                    <td>リージョン障害</td>
                                    <td>マルチリージョン構成</td>
                                    <td>グローバル外部ロードバランサ＋複数リージョンのバックエンド、Spannerのマルチリージョン構成</td>
                                </tr>
                                <tr>
                                    <td>データ損失</td>
                                    <td>バックアップ/レプリケーション</td>
                                    <td>Cloud SQLの自動バックアップ＋ポイントインタイムリカバリ、Cloud Storageのマルチリージョンバケット</td>
                                </tr>
                                <tr>
                                    <td>ゾーン内の単一VM障害</td>
                                    <td>自動再起動/自動修復</td>
                                    <td>Compute Engineの自動再起動、MIGのヘルスチェック自動修復</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>RPO/RTOという2軸で考える</strong></p>
                    <p>バックアップ・リカバリ設計では、次の2つの指標を要件として明確化することが出発点です。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">指標</th>
                                    <th scope="col">意味</th>
                                    <th scope="col">短くするための代表的な手段</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>RPO（目標復旧時点）</td>
                                    <td>どこまでデータ損失を許容できるか</td>
                                    <td>高頻度スナップショット、非同期/同期レプリケーション</td>
                                </tr>
                                <tr>
                                    <td>RTO（目標復旧時間）</td>
                                    <td>どれだけ早くサービスを復旧させる必要があるか</td>
                                    <td>ホットスタンバイ、自動フェイルオーバー、Infrastructure as Codeによる即時再構築</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-3" label="RPO・RTO要件に基づく耐障害性・復旧アーキテクチャの選択" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            「可用性を上げる＝コストを上げる」という単純な二項対立ではなく、RPO/RTO要件に対して<strong>過剰でも過小でもない</strong>設計を選ぶことが試験・実務双方で評価されます。全システムを常にマルチリージョン構成にする必要はありません。
                        </p>
                    </blockquote>
                    <p>
                        <strong>Gemini Cloud Assist</strong>: コンソールやコード内でGoogle Cloudのアーキテクチャ提案・トラブルシューティング・コスト分析を支援するAIアシスタント機能です。設計レビューや既存環境の問題診断を効率化する目的で近年の出題範囲に追加されました。
                    </p>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture/framework/reliability"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                信頼性の柱 - Architecture Framework
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/gemini/docs/cloud-assist/overview"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Gemini Cloud Assist の概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/architecture/dr-scenarios-planning-guide"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Disaster recovery planning guide
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="13-ネットワークストレージコンピューティングリソースの設計" tabIndex={-1}>
                        1.3 ネットワーク・ストレージ・コンピューティングリソースの設計
                    </h3>
                    <p>
                        具体的なリソース選定に踏み込むタスクです。PCAの出題の中でも実務的な判断力が最も問われる領域といえます。
                    </p>
                    <p><strong>クラウドネイティブネットワーキングの基本構成要素</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">要素</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VPC（Virtual Private Cloud）</td>
                                    <td>プロジェクトを跨いで利用できるグローバルな仮想ネットワーク</td>
                                </tr>
                                <tr>
                                    <td>VPCピアリング</td>
                                    <td>2つのVPC間をGoogleのバックボーンネットワーク経由で直接接続（推移的接続不可）</td>
                                </tr>
                                <tr>
                                    <td>Shared VPC（共有VPC）</td>
                                    <td>ホストプロジェクトのVPCを複数のサービスプロジェクトから共有利用</td>
                                </tr>
                                <tr>
                                    <td>Private Service Connect（PSC）</td>
                                    <td>VPCを跨いでプライベートIPのみでサービスに接続する仕組み</td>
                                </tr>
                                <tr>
                                    <td>Cloud Load Balancing</td>
                                    <td>グローバル/リージョナル、外部/内部のロードバランサ群</td>
                                </tr>
                                <tr>
                                    <td>階層型ファイアウォールポリシー</td>
                                    <td>Organization/Folderレベルで一括適用するファイアウォールルール</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-4" label="Shared VPCとPrivate Service Connectによるセキュアなネットワーク構成" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            複数チーム・複数プロジェクトでネットワークを一元管理したい場合はShared VPCが定石です。VPCピアリングは推移性がない（AとBが繋がり、BとCが繋がっていても、AとCは自動的には繋がらない）点が頻出の引っかけポイントです。多数のVPCを相互接続したい場合はVPCピアリングの組み合わせよりもNetwork Connectivity Center（NCC）のハブ&amp;スポーク構成を検討します。
                        </p>
                    </blockquote>
                    <p><strong>コンピュートプラットフォームの選定（決定木）</strong></p>
                    <p>「どのワークロードをどのコンピュートサービスに載せるか」は頻出テーマです。</p>
                    <Diagram id="diag-5" label="ワークロード特性に応じたコンピュートプラットフォーム選定決定木" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サービス</th>
                                    <th scope="col">適するケース</th>
                                    <th scope="col">運用負荷</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Compute Engine</td>
                                    <td>レガシーアプリの移行、特殊なOS/カーネル要件、GPU/TPUを直接制御</td>
                                    <td>高（自己管理）</td>
                                </tr>
                                <tr>
                                    <td>GKE</td>
                                    <td>マイクロサービス基盤、マルチクラウド前提、複雑なオーケストレーション要件</td>
                                    <td>中（Autopilotなら低）</td>
                                </tr>
                                <tr>
                                    <td>Cloud Run</td>
                                    <td>コンテナ化されたステートレスAPI/Webサービス</td>
                                    <td>低（フルマネージド）</td>
                                </tr>
                                <tr>
                                    <td>Cloud Run functions</td>
                                    <td>単発イベント処理、軽量な関数実行</td>
                                    <td>最低（フルマネージド）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>ストレージタイプの選定</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ストレージ種別</th>
                                    <th scope="col">サービス例</th>
                                    <th scope="col">適するユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>オブジェクトストレージ</td>
                                    <td>Cloud Storage</td>
                                    <td>静的コンテンツ、バックアップ、データレイク</td>
                                </tr>
                                <tr>
                                    <td>ファイルストレージ</td>
                                    <td>Filestore</td>
                                    <td>共有ファイルシステムが必要なレガシーアプリ、HPC</td>
                                </tr>
                                <tr>
                                    <td>ブロックストレージ</td>
                                    <td>Persistent Disk、Local SSD</td>
                                    <td>VMのOS/データディスク、高IOPS要件</td>
                                </tr>
                                <tr>
                                    <td>リレーショナルDB（トランザクション）</td>
                                    <td>Cloud SQL、AlloyDB</td>
                                    <td>一般的なOLTP、PostgreSQL互換の高性能要件</td>
                                </tr>
                                <tr>
                                    <td>グローバル分散RDB</td>
                                    <td>Spanner</td>
                                    <td>グローバル規模の強整合性トランザクション</td>
                                </tr>
                                <tr>
                                    <td>NoSQL（ドキュメント）</td>
                                    <td>Firestore</td>
                                    <td>モバイル/Webアプリのリアルタイムデータ</td>
                                </tr>
                                <tr>
                                    <td>NoSQL（ワイドカラム）</td>
                                    <td>Bigtable</td>
                                    <td>大規模・低レイテンシの時系列/IoTデータ</td>
                                </tr>
                                <tr>
                                    <td>分析用DWH</td>
                                    <td>BigQuery</td>
                                    <td>ペタバイト級の分析クエリ</td>
                                </tr>
                                <tr>
                                    <td>インメモリ</td>
                                    <td>Memorystore</td>
                                    <td>セッションキャッシュ、リアルタイムランキング</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            「強整合性が必要かつグローバル分散か」→Spanner、「PostgreSQL互換で垂直スケールが必要」→AlloyDB、「スキーマレスでモバイルからのリアルタイム同期が必要」→Firestore、という対応関係は頻出です。単に「NoSQLだから」という理由だけでBigtableとFirestoreを混同しないよう、アクセスパターン（単一エンティティの高頻度読み書きか、大規模スキャン分析か）で判断しましょう。
                        </p>
                    </blockquote>
                    <p>
                        <strong>AI/MLソリューションの位置づけ</strong>: Gemini LLM、Agent Builder、Model Garden、Gemini modelsといった生成AI関連サービスや、大規模学習・推論基盤であるAI Hypercomputerも設計対象に含まれます（詳細はSection 2.4/2.5で扱います）。
                    </p>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a href="https://cloud.google.com/vpc/docs/vpc" rel="noopener noreferrer" target="_blank">VPCの概要</a> /{' '}
                            <a href="https://cloud.google.com/vpc/docs/shared-vpc" rel="noopener noreferrer" target="_blank">Shared VPCの概要</a> /{' '}
                            <a href="https://cloud.google.com/vpc/docs/private-service-connect" rel="noopener noreferrer" target="_blank">Private Service Connectの概要</a> /{' '}
                            <a href="https://cloud.google.com/architecture/storage-options" rel="noopener noreferrer" target="_blank">ストレージオプションの選択</a> /{' '}
                            <a href="https://cloud.google.com/architecture/compute-options" rel="noopener noreferrer" target="_blank">コンピュートオプションの選択</a>
                        </p>
                    </blockquote>

                    <h3 id="14-移行計画の作成" tabIndex={-1}>1.4 移行計画の作成</h3>
                    <p>
                        既存システムをGoogle Cloudに移行するためのドキュメント・アーキテクチャ図の作成方法が問われます。
                    </p>
                    <p>
                        <strong>Google Cloud Migration Center</strong>:
                        オンプレミス/他クラウド資産を可視化し、移行の評価・計画・コスト試算を支援するツールです。移行対象のインベントリ作成からTCO試算、移行戦略の提案までを一元的にサポートします。
                    </p>
                    <p><strong>移行の標準的な進め方</strong></p>
                    <Diagram id="diag-6" label="Migration Centerを活用した移行の4フェーズ" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">フェーズ</th>
                                    <th scope="col">主な活動</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Assess（評価）</td>
                                    <td>既存資産の棚卸し、依存関係マッピング、TCO試算</td>
                                </tr>
                                <tr>
                                    <td>Plan（計画）</td>
                                    <td>移行方式（リホスト/リプラットフォーム/リファクタ等）の決定、ネットワーク計画、移行順序の決定</td>
                                </tr>
                                <tr>
                                    <td>Deploy（デプロイ）</td>
                                    <td>ワークロードの移行実行、データ移行、切替テスト</td>
                                </tr>
                                <tr>
                                    <td>Optimize（最適化）</td>
                                    <td>パフォーマンスチューニング、コスト最適化、運用プロセスの定着</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>考慮すべき事項</strong></p>
                    <ul>
                        <li>既存システムとの統合（移行期間中のハイブリッド運用）</li>
                        <li>ワークロードテスト、ネットワーク計画、依存関係計画</li>
                        <li>ソフトウェアライセンスへの影響（BYOL、ソケット/コア課金体系の違い）と財務的インパクト</li>
                    </ul>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            移行計画では「一度に全部切り替える」ビッグバン移行よりも、依存関係の少ないワークロードから段階的に移行するアプローチがリスクを抑えられます。ネットワーク帯域や既存システムとの接続要件（ハイブリッド接続）を移行計画の初期段階で明確化しておくことが、後工程の手戻りを防ぐ鍵です。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/migration-center/docs/migration-center-overview"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Migration Centerの概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/architecture/migration-to-google-cloud-building-your-foundation"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                クラウド移行の基本ガイド
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="15-将来の解決策の改善を見据える" tabIndex={-1}>1.5 将来の解決策の改善を見据える</h3>
                    <p>クラウドは一度作って終わりではなく、継続的に進化させる前提で設計します。</p>
                    <ul>
                        <li>クラウド・テクノロジーの進化への追従（新サービス、新料金体系、新リージョンの活用）</li>
                        <li>ビジネスニーズの変化への対応（スケール変化、新規事業要件）</li>
                        <li>クラウドファーストな設計アプローチ（オンプレミス前提の制約に縛られない設計判断）</li>
                    </ul>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            設計時点で「将来この部分をどう進化させられるか」を疎結合なアーキテクチャ（マイクロサービス化、IaC化、抽象化されたAPI境界）によって担保しておくと、将来の技術更新をシステム全体の作り直しなしに取り込めます。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Google Cloud Architecture Center
                            </a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="section-2-クラウドソリューションインフラの管理とプロビジョニング約175" tabIndex={-1}>
                        Section 2: クラウドソリューションインフラの管理とプロビジョニング（約17.5%）
                    </h2>
                    <p>
                        Section 1で設計したアーキテクチャを、実際にどう構成・プロビジョニングするかを問うセクションです。
                    </p>
                    <h3 id="21-ネットワークトポロジの構成" tabIndex={-1}>2.1 ネットワークトポロジの構成</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>オンプレミス環境への拡張（ハイブリッドネットワーキング）</li>
                        <li>マルチクラウド環境への拡張（Google Cloud間通信を含む）</li>
                        <li>セキュリティ保護（侵入防御、アクセス制御、ファイアウォール）</li>
                        <li>VPC設計とロードバランシング</li>
                    </ul>
                    <p><strong>ハイブリッド/マルチクラウド接続の選択肢</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">接続方式</th>
                                    <th scope="col">帯域/用途</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud VPN（HA VPN）</td>
                                    <td>〜3Gbps程度</td>
                                    <td>インターネット経由のIPsec暗号化トンネル、迅速に構築可能</td>
                                </tr>
                                <tr>
                                    <td>Dedicated Interconnect</td>
                                    <td>10Gbps/100Gbps単位</td>
                                    <td>Googleとの物理専用線、大容量・低レイテンシ</td>
                                </tr>
                                <tr>
                                    <td>Partner Interconnect</td>
                                    <td>50Mbps〜10Gbps</td>
                                    <td>パートナー経由でGoogleに接続、Google拠点に直接アクセスできない場合に利用</td>
                                </tr>
                                <tr>
                                    <td>Cross-Cloud Interconnect</td>
                                    <td>10Gbps/100Gbps</td>
                                    <td>他クラウドプロバイダとの専用線接続</td>
                                </tr>
                                <tr>
                                    <td>Network Connectivity Center（NCC）</td>
                                    <td>—</td>
                                    <td>ハブ&amp;スポーク型で複数拠点/複数クラウドを一元的にオーケストレーション</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-7" label="Network Connectivity Centerによるハイブリッド・マルチクラウドハブ＆スポーク接続" />
                    <p>
                        <strong>セキュリティ保護</strong>: Cloud Armor（WAF/DDoS対策）、階層型ファイアウォールポリシー、Cloud IDS（侵入検知）などをネットワーク層に組み込みます。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            帯域とSLAの要件が明確な基幹接続にはDedicated/Partner Interconconnectを、多数の拠点・クラウドを段階的に統合したい場合はNCCのハブ&amp;スポーク構成を優先します。VPNは構築の速さと引き換えに帯域・レイテンシの制約があるため、恒久的な大容量接続には不向きです。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/hybrid-connectivity"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ハイブリッド接続の概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/network-connectivity-center/docs/overview"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Network Connectivity Centerの概要
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="22-個別ストレージシステムの構成" tabIndex={-1}>2.2 個別ストレージシステムの構成</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>データストレージの割り当て</li>
                        <li>データ処理とコンピュートのプロビジョニング</li>
                        <li>セキュリティとアクセス管理</li>
                        <li>データ転送・レイテンシの構成</li>
                        <li>データ保持とライフサイクル管理</li>
                        <li>データ成長の計画</li>
                        <li>データ保護（バックアップ・リカバリ）</li>
                    </ul>
                    <p><strong>ライフサイクル管理の例（Cloud Storage）</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用途</th>
                                    <th scope="col">ストレージクラス</th>
                                    <th scope="col">想定アクセス頻度</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>頻繁にアクセス</td>
                                    <td>Standard</td>
                                    <td>月に複数回以上</td>
                                </tr>
                                <tr>
                                    <td>月1回程度</td>
                                    <td>Nearline</td>
                                    <td>30日に1回未満</td>
                                </tr>
                                <tr>
                                    <td>四半期に1回程度</td>
                                    <td>Coldline</td>
                                    <td>90日に1回未満</td>
                                </tr>
                                <tr>
                                    <td>長期アーカイブ</td>
                                    <td>Archive</td>
                                    <td>年1回未満</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>: Object Lifecycle Managementルールを使い、経過日数に応じて自動的にStandard→Nearline→Coldline→Archiveへ移行させることで、手動運用なしにストレージコストを継続的に最適化できます。データ保護の観点では、リージョナルではなくマルチリージョン/デュアルリージョンバケットを使うことでリージョン障害時の耐性を高められます。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/storage/docs/storage-classes"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Cloud Storageクラスの選択
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/storage/docs/lifecycle"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                オブジェクトのライフサイクル管理
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="23-コンピュートシステムの構成" tabIndex={-1}>2.3 コンピュートシステムの構成</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>コンピュートリソースのプロビジョニング</li>
                        <li>コンピュートの揮発性設定（Spot vs 標準）</li>
                        <li>
                            コンピュートリソースのクラウドネイティブなネットワーク構成（Compute Engine、GKE、サーバーレス、Google Cloud VMware Engine）
                        </li>
                        <li>インフラのオーケストレーション、リソース構成、パッチ管理</li>
                        <li>コンテナオーケストレーション</li>
                        <li>サーバーレスコンピューティング</li>
                    </ul>
                    <p><strong>Spot VM vs 標準VM</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">標準VM</th>
                                    <th scope="col">Spot VM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>価格</td>
                                    <td>定価</td>
                                    <td>大幅割引（60〜91%程度）</td>
                                </tr>
                                <tr>
                                    <td>中断リスク</td>
                                    <td>なし</td>
                                    <td>あり（Googleが容量を必要とする際に30秒前通知で中断）</td>
                                </tr>
                                <tr>
                                    <td>適するワークロード</td>
                                    <td>本番の常時稼働サービス</td>
                                    <td>バッチ処理、フォールトトレラントな分散処理、CI/CD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>IaCによるプロビジョニングとパッチ管理の標準フロー</strong></p>
                    <Diagram id="diag-8" label="IaCとOS Config Managementによる自動化されたプロビジョニング＆パッチ管理フロー" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            中断耐性のあるワークロード（バッチ処理・ステートレスな分散計算）は積極的にSpot VMへ寄せることで大幅なコスト最適化が図れます。パッチ管理はOS Config Managementで自動化し、手動SSHでのパッチ適用を避けることで構成ドリフトを防止します。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/compute/docs/instances/spot"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Spot VM の概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/compute/docs/vm-manager"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                VM Manager（パッチ管理）
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー" tabIndex={-1}>
                        2.4 Gemini Enterprise Agent Platformを活用したエンドツーエンドMLワークフロー
                    </h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>Agent Platform PipelinesによるMLライフサイクルの自動化・オーケストレーション</li>
                        <li>Agent Platformのデータ統合の準備</li>
                        <li>
                            AI Hypercomputerの活用（GPU/TPUを用いたモデル学習・推論の最適化、大規模AIモデル学習の実行）
                        </li>
                    </ul>
                    <Diagram id="diag-9" label="Gemini Enterprise Agent PlatformとAI Hypercomputerを活用したエンドツーエンドMLパイプライン" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            学習と推論でワークロード特性が異なるため、GPU/TPUの選定は「学習は高スループットのTPU、リアルタイム推論は低レイテンシのGPU」のように用途で使い分けを検討します。パイプライン化によって、データ準備からデプロイまでの再現性を確保することが重要です。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/ai-hypercomputer/docs/overview"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                AI Hypercomputer の概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/products/gemini-enterprise-agent-platform"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Gemini Enterprise Agent Platform
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="25-agent-platformでの事前構築ソリューションapiの構成" tabIndex={-1}>
                        2.5 Agent Platformでの事前構築ソリューション・APIの構成
                    </h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>Google AI API群の使い分け（Search、Conversation、Vision、Image、Video、Audio）</li>
                        <li>Gemini Enterprise機能（AI Agents、NotebookLM）の統合によるワークフロー強化</li>
                        <li>Model GardenからのAIモデル統合</li>
                    </ul>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">API/機能</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Vision AI</td>
                                    <td>画像内のオブジェクト検出・OCR・不適切コンテンツ検出</td>
                                </tr>
                                <tr>
                                    <td>Video Intelligence</td>
                                    <td>動画内のオブジェクト・シーン認識</td>
                                </tr>
                                <tr>
                                    <td>Speech-to-Text / Text-to-Speech</td>
                                    <td>音声認識・音声合成</td>
                                </tr>
                                <tr>
                                    <td>Translation AI</td>
                                    <td>多言語翻訳</td>
                                </tr>
                                <tr>
                                    <td>Model Garden</td>
                                    <td>200種類以上のGoogle/パートナー製モデルを検索・デプロイ</td>
                                </tr>
                                <tr>
                                    <td>NotebookLM</td>
                                    <td>ドキュメントを情報源としたAI要約・Q&amp;A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            独自モデルの学習コストをかける前に、まずModel GardenやGoogle AI APIで要件を満たせないか検討するのが費用対効果の観点で定石です。試験では「ゼロからモデルを構築する」選択肢よりも「既存の事前構築済みAPI/モデルを活用する」選択肢が正解になりやすい傾向があります。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Model Gardenの概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/products/ai"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Google Cloud AI・機械学習製品
                            </a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="section-3-セキュリティとコンプライアンスの設計約175" tabIndex={-1}>
                        Section 3: セキュリティとコンプライアンスの設計（約17.5%）
                    </h2>
                    <p>
                        Section 2に次いで配点が高く、実務でも最重要のセクションです。技術的なセキュリティ制御とガバナンス・コンプライアンスの両面が問われます。
                    </p>
                    <h3 id="31-セキュリティの設計" tabIndex={-1}>3.1 セキュリティの設計</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>Identity and Access Management（IAM）</li>
                        <li>リソース階層（組織、フォルダ、プロジェクト）</li>
                        <li>データセキュリティ（鍵管理、暗号化、シークレット管理）</li>
                        <li>職務分離</li>
                        <li>セキュリティ制御（監査、VPC Service Controls、コンテキストアウェアアクセス、組織のポリシー、階層型ファイアウォールポリシー）</li>
                        <li>Cloud KMSによる顧客管理暗号鍵（CMEK）の管理</li>
                        <li>セキュアなリモートアクセス（Identity-Aware Proxy、サービスアカウントの権限借用、Chrome Enterprise Premium、Workload Identity Federation）</li>
                        <li>ソフトウェアサプライチェーンのセキュリティ</li>
                        <li>AIのセキュリティ（Model Armor、Sensitive Data Protection、安全なモデルデプロイ）</li>
                    </ul>
                    <p><strong>リソース階層とポリシー継承</strong></p>
                    <p>
                        Google Cloudのリソースは階層構造を持ち、上位で設定したIAMポリシーやOrganization Policyは下位に継承されます。
                    </p>
                    <Diagram id="diag-10" label="Google Cloudリソース階層とOrganization Policy・IAMポリシーの継承構造" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            本番環境と開発環境をフォルダで明確に分離し、フォルダ単位でOrganization Policy（例: 外部IP付与の禁止）を適用すると、プロジェクト個別設定より一貫性の高いガバナンスが実現できます。IAMは「誰が何にアクセスできるか」の最小権限を徹底し、基本ロールではなくきめ細かい事前定義ロール・カスタムロールを使用します。
                        </p>
                    </blockquote>
                    <p><strong>IAMの基本原則</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">原則</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>最小権限の原則</td>
                                    <td>必要な操作に必要な範囲の権限のみ付与</td>
                                </tr>
                                <tr>
                                    <td>職務分離</td>
                                    <td>承認者と実行者を分ける（例: 本番デプロイの承認と実行を別担当者に）</td>
                                </tr>
                                <tr>
                                    <td>サービスアカウントの権限借用</td>
                                    <td>個人アカウントの鍵をダウンロードせず、一時的にサービスアカウントの権限を借用して操作</td>
                                </tr>
                                <tr>
                                    <td>Workload Identity Federation</td>
                                    <td>他クラウド/オンプレミスのワークロードがサービスアカウント鍵なしにGoogle Cloudリソースへアクセス</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>データセキュリティと鍵管理</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">手段</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud KMS</td>
                                    <td>暗号鍵の作成・ローテーション・アクセス制御</td>
                                </tr>
                                <tr>
                                    <td>CMEK（顧客管理暗号鍵）</td>
                                    <td>Google管理ではなく自社管理の鍵でデータを暗号化</td>
                                </tr>
                                <tr>
                                    <td>CSEK（顧客提供暗号鍵）</td>
                                    <td>自社で保持する鍵をリクエスト時に提供して暗号化</td>
                                </tr>
                                <tr>
                                    <td>Secret Manager</td>
                                    <td>APIキー・パスワード等のシークレットの一元管理</td>
                                </tr>
                                <tr>
                                    <td>Sensitive Data Protection（旧DLP）</td>
                                    <td>機密データ（PII等）の検出・分類・マスキング</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>セキュアなリモートアクセス</strong></p>
                    <ul>
                        <li><strong>Identity-Aware Proxy（IAP）</strong>: パブリックIPやVPNなしに、IAMベースのアクセス制御でVM/アプリへのアクセスを保護</li>
                        <li><strong>Chrome Enterprise Premium</strong>: ゼロトラストの文脈に基づくアクセス制御をブラウザレベルで実現</li>
                        <li><strong>Context-Aware Access</strong>: ユーザーの属性（デバイスの状態、IPアドレス、場所）に基づいてアクセス可否を動的に判定</li>
                    </ul>
                    <Diagram id="diag-11" label="IAPとContext-Aware Accessによるゼロトラストリモートアクセスフロー" />
                    <p>
                        <strong>AIのセキュリティ</strong>: Model Armor（生成AIの入出力に対するプロンプトインジェクション対策等）、Sensitive Data Protectionと連携した機密情報の漏洩防止、モデルのデプロイ時のアクセス制御が近年の出題範囲に加わっています。
                    </p>
                    <p>
                        <strong>ソフトウェアサプライチェーンのセキュリティ</strong>: Artifact RegistryとBinary Authorizationを組み合わせ、署名済み・脆弱性スキャン済みのコンテナイメージのみをデプロイ許可する仕組みが代表例です。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>: 「多層防御（Defense in Depth）」の考え方に基づき、ネットワーク層（VPC Service Controls）、ID層（IAM/Context-Aware Access）、データ層（暗号化/DLP）、アプリ層（Binary Authorization）の各レベルで独立した防御を重ねることが試験・実務ともに評価される設計です。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a href="https://cloud.google.com/iam/docs/overview" rel="noopener noreferrer" target="_blank">IAMの概要</a> /{' '}
                            <a href="https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" rel="noopener noreferrer" target="_blank">リソース階層の理解</a> /{' '}
                            <a href="https://cloud.google.com/kms/docs/key-management-service" rel="noopener noreferrer" target="_blank">Cloud KMSの概要</a> /{' '}
                            <a href="https://cloud.google.com/vpc-service-controls/docs/overview" rel="noopener noreferrer" target="_blank">VPC Service Controlsの概要</a> /{' '}
                            <a href="https://cloud.google.com/security-command-center/docs/model-armor-overview" rel="noopener noreferrer" target="_blank">Model Armorの概要</a>
                        </p>
                    </blockquote>

                    <h3 id="32-コンプライアンスの設計" tabIndex={-1}>3.2 コンプライアンスの設計</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>法規制（医療記録のプライバシー、児童のプライバシー、データプライバシー、データの所有権、データ主権）</li>
                        <li>商用要件（クレジットカード情報等の機密データの取り扱い、個人識別情報[PII]）</li>
                        <li>業界認証（SOC 2等）</li>
                        <li>監査（ログを含む）</li>
                    </ul>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">規制・基準</th>
                                    <th scope="col">対象領域</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HIPAA</td>
                                    <td>米国の医療記録プライバシー</td>
                                </tr>
                                <tr>
                                    <td>COPPA</td>
                                    <td>児童のオンラインプライバシー保護（米国）</td>
                                </tr>
                                <tr>
                                    <td>PCI DSS</td>
                                    <td>クレジットカード情報の取り扱い</td>
                                </tr>
                                <tr>
                                    <td>GDPR</td>
                                    <td>EU域内の個人データ保護</td>
                                </tr>
                                <tr>
                                    <td>SOC 2</td>
                                    <td>サービス組織のセキュリティ統制に関する第三者監査基準</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>データ主権（Data Sovereignty）</strong>: データが特定の地理的・法的管轄内に留まることを求める要件です。Google CloudではAssured Workloadsやリージョン制限のOrganization Policyで、データの保存・処理場所を制御できます。
                    </p>
                    <p>
                        <strong>監査ログ</strong>: Cloud Auditログには「管理アクティビティ」「データアクセス」「システムイベント」「ポリシー拒否」の4種類があり、これらをBigQueryやCloud Storageにエクスポートして長期保存・分析することがコンプライアンス対応の基本です。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            業界別の規制要件（医療ならHIPAA、決済ならPCI DSS）を洗い出したうえで、Assured WorkloadsやOrganization Policyで技術的に強制する仕組みに落とし込むことが「口頭ルールに頼らないコンプライアンス」の実現方法です。監査ログは既定で一定期間保持されますが、長期保持が必要な場合は明示的にログシンクを設定してエクスポートします。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a href="https://cloud.google.com/assured-workloads/docs/overview" rel="noopener noreferrer" target="_blank">Assured Workloadsの概要</a> /{' '}
                            <a href="https://cloud.google.com/logging/docs/audit" rel="noopener noreferrer" target="_blank">Cloud Auditログの概要</a> /{' '}
                            <a href="https://cloud.google.com/compliance" rel="noopener noreferrer" target="_blank">コンプライアンスリソースセンター</a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="section-4-技術ビジネスプロセスの分析と最適化約15" tabIndex={-1}>
                        Section 4: 技術・ビジネスプロセスの分析と最適化（約15%）
                    </h2>
                    <p>
                        技術的な知識だけでなく、組織・プロセスに関する「ソフトスキル寄り」の判断力が問われるユニークなセクションです。
                    </p>
                    <h3 id="41-技術プロセスの分析と定義" tabIndex={-1}>4.1 技術プロセスの分析と定義</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>ソフトウェア開発ライフサイクル（SDLC）</li>
                        <li>継続的インテグレーション/継続的デプロイ（CI/CD）</li>
                        <li>トラブルシューティング/根本原因分析のベストプラクティス</li>
                        <li>ソフトウェアとインフラのテスト・検証</li>
                        <li>サービスカタログとプロビジョニング</li>
                        <li>災害復旧</li>
                    </ul>
                    <p><strong>CI/CDパイプラインの基本フロー</strong></p>
                    <Diagram id="diag-12" label="Cloud Build・Artifact Registry・Cloud Deployによる段階的CI/CDパイプライン" />
                    <p><strong>テストの種類</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">テスト種別</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>単体テスト</td>
                                    <td>個別の関数・モジュール単位の正しさを検証</td>
                                </tr>
                                <tr>
                                    <td>統合テスト</td>
                                    <td>複数コンポーネント間の連携を検証</td>
                                </tr>
                                <tr>
                                    <td>負荷テスト</td>
                                    <td>想定トラフィックでの性能・限界を検証</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>根本原因分析（RCA）</strong>: 障害発生時に、表面的な症状ではなく根本原因を特定するプロセスです。Cloud Logging/Cloud Traceによる分散トレーシング、ポストモーテム（振り返り）文化の醸成が実務上のベストプラクティスとされます。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            障害対応では「誰が悪いか」ではなく「なぜ仕組みが障害を防げなかったか」に焦点を当てるBlameless Postmortem（非難なき事後検証）の文化が、SRE的な運用の卓越性につながります。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a href="https://cloud.google.com/build/docs/overview" rel="noopener noreferrer" target="_blank">Cloud Buildの概要</a> /{' '}
                            <a href="https://sre.google/sre-book/postmortem-culture/" rel="noopener noreferrer" target="_blank">SRE本 - ポストモーテムの文化</a>
                        </p>
                    </blockquote>

                    <h3 id="42-ビジネスプロセスの分析と定義" tabIndex={-1}>4.2 ビジネスプロセスの分析と定義</h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>ステークホルダー管理（影響力の行使とファシリテーション）</li>
                        <li>変更管理</li>
                        <li>チームアセスメント/スキルの準備状況</li>
                        <li>意思決定プロセス</li>
                        <li>カスタマーサクセスマネジメント</li>
                        <li>コスト最適化/リソース最適化（CapEx/OpEx）</li>
                        <li>事業継続性</li>
                    </ul>
                    <p><strong>CapEx（資本的支出）とOpEx（運用支出）の違い</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">区分</th>
                                    <th scope="col">従来のオンプレミス</th>
                                    <th scope="col">クラウド</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>支出モデル</td>
                                    <td>CapEx中心（先行投資でハードウェア購入）</td>
                                    <td>OpEx中心（従量課金で利用した分だけ支払い）</td>
                                </tr>
                                <tr>
                                    <td>メリット</td>
                                    <td>長期的な単価は下がる場合がある</td>
                                    <td>初期投資が不要、需要に応じた即応が可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            経営層への説明では、クラウド移行がCapExからOpExへの転換であることを明確に伝えると合意形成がしやすくなります。試験では「予算承認プロセス」や「変更管理プロセス」に関する記述問題があり、技術的な正しさだけでなく組織的なプロセスを踏まえた選択肢が問われる点に注意しましょう。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture/framework/cost-optimization"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                コスト最適化の柱 - Architecture Framework
                            </a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="section-5-実装の管理約125" tabIndex={-1}>Section 5: 実装の管理（約12.5%）</h2>
                    <p>
                        設計されたアーキテクチャを実際に開発・運用チームがどう実装していくかを支援する能力が問われます。
                    </p>
                    <h3 id="51-開発運用チームへのアドバイスによるソリューションの確実なデプロイ" tabIndex={-1}>
                        5.1 開発・運用チームへのアドバイスによるソリューションの確実なデプロイ
                    </h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>アプリケーションとインフラのデプロイ</li>
                        <li>APIマネジメントのベストプラクティス（Apigee）</li>
                        <li>テストフレームワーク（負荷/単体/統合）</li>
                        <li>データ・システムの移行・管理ツール</li>
                        <li>Gemini Cloud Assist</li>
                    </ul>
                    <p>
                        <strong>Apigeeによる APIマネジメント</strong>:
                        APIのライフサイクル全体（設計、セキュリティ、レート制限、分析、マネタイズ）を管理するプラットフォームです。バックエンドサービスを直接公開せず、Apigeeをゲートウェイとして挟むことで、認証・スロットリング・バージョニングを一元管理できます。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            社内外に公開するAPIが増えてきた組織では、個別サービスごとに認証・レート制限を実装するのではなく、Apigeeのようなゲートウェイ層で横断的に管理することで、一貫したセキュリティポリシーとAPI利用状況の可視化が実現できます。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Apigeeの概要
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="52-google-cloudとのプログラム的なやり取り" tabIndex={-1}>
                        5.2 Google Cloudとのプログラム的なやり取り
                    </h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>Cloud Shell Editor、Cloud Code、Cloud Shellターミナル</li>
                        <li>Google Cloud SDK（gcloud、gsutil、bq）</li>
                        <li>クラウドエミュレータ（Bigtable、Spanner、Pub/Sub、Firestore）</li>
                        <li>Infrastructure as Code（IaC、Terraform）</li>
                        <li>Google APIへのアクセスのベストプラクティス</li>
                        <li>Google APIクライアントライブラリ</li>
                    </ul>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ツール</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>gcloud</td>
                                    <td>Google Cloudリソース全般の操作用CLI</td>
                                </tr>
                                <tr>
                                    <td>gsutil</td>
                                    <td>Cloud Storageの操作用CLI</td>
                                </tr>
                                <tr>
                                    <td>bq</td>
                                    <td>BigQueryの操作用CLI</td>
                                </tr>
                                <tr>
                                    <td>Cloud Code</td>
                                    <td>VS Code/JetBrains向けのGoogle Cloud/Kubernetes開発支援拡張機能</td>
                                </tr>
                                <tr>
                                    <td>クラウドエミュレータ</td>
                                    <td>ローカル環境でBigtable/Spanner/Pub/Sub/Firestoreの動作を再現し、クラウド接続なしに開発・テストが可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>IaC（Terraform）による構成管理の基本フロー</strong></p>
                    <Diagram id="diag-13" label="TerraformによるIaCリソース構成管理とState管理フロー" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            手動でのコンソール操作（ClickOps）は再現性・監査性に欠けるため、本番環境の構成変更は必ずTerraform等のIaCとバージョン管理システムを通して行うのが定石です。Terraform StateはローカルではなくCloud Storageバケット等のリモートバックエンドで管理し、チームでの競合を防ぎます。ローカル開発ではクラウドエミュレータを活用することで、開発時のクラウドコストとネットワーク遅延を削減できます。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a href="https://cloud.google.com/docs/terraform" rel="noopener noreferrer" target="_blank">Google CloudにおけるTerraformの利用</a> /{' '}
                            <a href="https://cloud.google.com/sdk/gcloud" rel="noopener noreferrer" target="_blank">gcloud CLIの概要</a> /{' '}
                            <a href="https://cloud.google.com/sdk/gcloud/reference/emulators" rel="noopener noreferrer" target="_blank">ローカルエミュレータの一覧</a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="section-6-ソリューションと運用の卓越性の確保約125" tabIndex={-1}>
                        Section 6: ソリューションと運用の卓越性の確保（約12.5%）
                    </h2>
                    <p>システムを本番稼働させた後の「運用」フェーズにフォーカスしたセクションです。</p>
                    <h3 id="61-well-architected-frameworkの運用の卓越性の柱" tabIndex={-1}>
                        6.1 Well-Architected Frameworkの運用の卓越性の柱
                    </h3>
                    <p>
                        Section 1.2で触れたWAFの6つの柱のうち、「運用の卓越性（Operational Excellence）」の原則・推奨事項への精通が明示的に求められます。効率的なモニタリング、自動化されたデプロイ、継続的な改善サイクルがこの柱の中心です。
                    </p>
                    <h3 id="62-google-cloud-observabilityソリューションへの精通" tabIndex={-1}>
                        6.2 Google Cloud Observabilityソリューションへの精通
                    </h3>
                    <p><strong>押さえるべき考慮事項</strong></p>
                    <ul>
                        <li>モニタリングとロギング</li>
                        <li>プロファイリングとベンチマーキング</li>
                        <li>アラート戦略</li>
                    </ul>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サービス</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud Monitoring</td>
                                    <td>メトリクス収集・ダッシュボード・アラート</td>
                                </tr>
                                <tr>
                                    <td>Cloud Logging</td>
                                    <td>ログの収集・検索・エクスポート</td>
                                </tr>
                                <tr>
                                    <td>Cloud Trace</td>
                                    <td>分散システムのレイテンシ・リクエストトレーシング</td>
                                </tr>
                                <tr>
                                    <td>Cloud Profiler</td>
                                    <td>CPU/メモリ使用量のプロファイリング</td>
                                </tr>
                                <tr>
                                    <td>Error Reporting</td>
                                    <td>アプリケーションエラーの集計・分析</td>
                                </tr>
                                <tr>
                                    <td>Managed Service for Prometheus</td>
                                    <td>Prometheus形式メトリクスのマネージド収集</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-14" label="Cloud Observabilityによるフルスタックモニタリング・アラート・ログ分析アーキテクチャ" />
                    <p>
                        <strong>アラート戦略</strong>:
                        すべてのメトリクスに閾値アラートを設定するのではなく、SLO（サービスレベル目標）のエラーバジェット消費速度に基づくアラート（バーンレートアラート）を設計することが、アラート疲れ（Alert Fatigue）を防ぐ現代的なプラクティスです。
                    </p>
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            「原因系（CPU使用率など）」ではなく「結果系（ユーザーが体感するレイテンシ・エラー率などのSLI）」を軸にアラートを設計すると、ノイズの多い通知を減らしつつ実際に対応が必要な問題を確実に捕捉できます。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a href="https://cloud.google.com/stackdriver/docs" rel="noopener noreferrer" target="_blank">Cloud Observabilityの概要</a> /{' '}
                            <a href="https://cloud.google.com/architecture/monitoring-slo-alerting-with-events" rel="noopener noreferrer" target="_blank">SLOに基づくアラート設計</a>
                        </p>
                    </blockquote>

                    <h3 id="63-デプロイとリリース管理" tabIndex={-1}>6.3 デプロイとリリース管理</h3>
                    <p>
                        段階的なリリース手法を理解し、リスクを抑えたデプロイ戦略を選択できることが求められます。
                    </p>
                    <Diagram id="diag-15" label="Blue/Greenデプロイ戦略の概要フロー" />
                    <Diagram id="diag-16" label="カナリアリリース戦略と自動ロールバックフロー" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">手法</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">適するケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Blue/Green</td>
                                    <td>新環境を丸ごと用意し一括切替、ロールバックが容易</td>
                                    <td>切替タイミングを明確に管理したい場合</td>
                                </tr>
                                <tr>
                                    <td>カナリアリリース</td>
                                    <td>一部トラフィックのみ新バージョンへ、段階的に拡大</td>
                                    <td>本番影響を最小化しながら検証したい場合</td>
                                </tr>
                                <tr>
                                    <td>ローリングアップデート</td>
                                    <td>インスタンスを順次入れ替え</td>
                                    <td>ダウンタイムを避けつつシンプルに更新したい場合</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture/application-deployment-and-testing-strategies"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                デプロイ戦略の比較
                            </a>
                        </p>
                    </blockquote>

                    <h3 id="64-デプロイ済みソリューションのサポート支援" tabIndex={-1}>
                        6.4 デプロイ済みソリューションのサポート支援
                    </h3>
                    <p>
                        本番稼働後のインシデント対応、オンコール体制、エスカレーションフローの整備が含まれます。SLA/SLO/SLIの関係を正しく理解しておくことが重要です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SLI（サービスレベル指標）</td>
                                    <td>実際に計測する指標（例: 成功リクエスト率）</td>
                                </tr>
                                <tr>
                                    <td>SLO（サービスレベル目標）</td>
                                    <td>SLIの目標値（例: 成功率99.9%）</td>
                                </tr>
                                <tr>
                                    <td>SLA（サービスレベル契約）</td>
                                    <td>SLOを満たせなかった場合の契約上の合意（違約金等を含む対外的な約束）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="65-品質管理措置の評価" tabIndex={-1}>6.5 品質管理措置の評価</h3>
                    <p>
                        コードレビュー基準、静的解析ツールの導入、リリース前チェックリストの整備など、品質を継続的に担保する仕組みの評価能力が問われます。
                    </p>

                    <h3 id="66-本番環境における信頼性の確保" tabIndex={-1}>6.6 本番環境における信頼性の確保</h3>
                    <p>
                        <strong>カオスエンジニアリング</strong>: 本番相当の環境に意図的に障害を注入し、システムの耐障害性を検証する手法です。
                    </p>
                    <p>
                        <strong>ペネトレーションテスト</strong>: セキュリティの脆弱性を実際の攻撃者視点で検証するテストです。
                    </p>
                    <p>
                        <strong>負荷テスト</strong>: 想定を超えるトラフィックをかけ、システムの限界点とスケーリング挙動を検証します。
                    </p>
                    <Diagram id="diag-17" label="負荷テスト・カオスエンジニアリング・ペネトレーションテストによる信頼性確保サイクル" />
                    <blockquote className="callout-card card-bestpractice">
                        <p>
                            <strong className="pill-badge">ベストプラクティス</strong>:
                            これらのテストは「一度実施して終わり」ではなく、リリースサイクルに組み込んで継続的に実施することで、システムの変化に追従した信頼性担保が可能になります。
                        </p>
                    </blockquote>
                    <blockquote className="callout-card card-source">
                        <p>
                            <strong className="pill-badge">出典</strong>:{' '}
                            <a
                                href="https://cloud.google.com/architecture/framework/reliability"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                信頼性の柱 - Architecture Framework
                            </a>{' '}
                            /{' '}
                            <a href="https://sre.google/sre-book/introduction/" rel="noopener noreferrer" target="_blank">
                                SRE本 - カオスエンジニアリング
                            </a>
                        </p>
                    </blockquote>
                    <hr />

                    <h2 id="学習チェックリスト" tabIndex={-1}>学習チェックリスト</h2>
                    <p>以下の項目を一通り「説明できる」状態になっているか確認しましょう。</p>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            進捗:{' '}
                            <span className="checklist-counter" id="checklist-counter">
                                {completedCount} / {CHECKLIST_DATA.length} 完了
                            </span>
                        </div>
                        <ul className="task-list checklist-list">
                            {CHECKLIST_DATA.map((item, index) => (
                                <li key={item}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[index] ?? false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <span className="checklist-text">
                                            <label>{item}</label>
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h2 id="まとめ-合格のための5つの原則" tabIndex={-1}>まとめ: 合格のための5つの原則</h2>
                    <ol>
                        <li>
                            <strong>ビジネス要件を最優先で読み解く</strong>:
                            技術選定の前に、必ず「何のためにこのシステムが存在するのか」というビジネス要件・非機能要件を明確化する癖をつけましょう。
                        </li>
                        <li>
                            <strong>WAFの6つの柱でバランスを取る</strong>:
                            コストだけ、可用性だけといった単一軸で判断せず、常に複数の柱のトレードオフを意識して選択肢を評価しましょう。
                        </li>
                        <li>
                            <strong>過不足のない設計を選ぶ</strong>:
                            「常に最も可用性が高い構成」や「常に最も安い構成」が正解とは限りません。要件に対して過剰でも過小でもない設計が高く評価されます。
                        </li>
                        <li>
                            <strong>ケーススタディの制約を尊重する</strong>:
                            ケーススタディが絡む問題では、一般的な最適解ではなく、その企業固有の制約・目標に照らした最適解を選びましょう。
                        </li>
                        <li>
                            <strong>マネージド・自動化を優先する</strong>:
                            手動運用(ClickOpsや個別パッチ適用)よりも、IaC・自動パッチ管理・マネージドサービスを優先する選択肢が、運用の卓越性の観点で評価されやすい傾向にあります。
                        </li>
                    </ol>

                    <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <h3>公式試験情報</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://cloud.google.com/learn/certification/cloud-architect"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Professional Cloud Architect Certification｜Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Professional Cloud Architect Exam Guide（PDF）
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://services.google.com/fh/files/misc/professional_cloud_architect_renewal_exam_guide_eng.pdf"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Professional Cloud Architect Renewal Exam Guide（PDF）
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.cloudskillsboost.google/paths/12"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Professional Cloud Architect Learning Path
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>Architecture Framework（Well-Architected Framework）</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/framework"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Google Cloud Architecture Framework
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/framework/system-design"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>System design considerations
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/framework/reliability"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>信頼性の柱
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/framework/cost-optimization"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>コスト最適化の柱
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>ネットワーク・コンピュート・ストレージ</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://cloud.google.com/vpc/docs/vpc"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>VPCの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/vpc/docs/shared-vpc"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Shared VPCの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/vpc/docs/private-service-connect"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Private Service Connectの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/network-connectivity-center/docs/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Network Connectivity Centerの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/hybrid-connectivity"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>ハイブリッド接続の概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/storage-options"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>ストレージオプションの選択
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/compute-options"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>コンピュートオプションの選択
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/compute/docs/instances/spot"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Spot VMの概要
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>移行とAI/ML</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://cloud.google.com/migration-center/docs/migration-center-overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Migration Centerの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/migration-to-google-cloud-building-your-foundation"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>クラウド移行の基本ガイド
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/ai-hypercomputer/docs/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>AI Hypercomputerの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Model Gardenの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/gemini/docs/cloud-assist/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Gemini Cloud Assistの概要
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>セキュリティとコンプライアンス</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://cloud.google.com/iam/docs/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>IAMの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>リソース階層の理解
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/kms/docs/key-management-service"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Cloud KMSの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/vpc-service-controls/docs/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>VPC Service Controlsの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/security-command-center/docs/model-armor-overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Model Armorの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/assured-workloads/docs/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Assured Workloadsの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/logging/docs/audit"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Cloud Auditログの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/compliance"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>コンプライアンスリソースセンター
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>実装とオペレーション</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://cloud.google.com/docs/terraform"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Google CloudにおけるTerraformの利用
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/sdk/gcloud"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>gcloud CLIの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Apigeeの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/build/docs/overview"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Cloud Buildの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/stackdriver/docs"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>Cloud Observabilityの概要
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cloud.google.com/architecture/application-deployment-and-testing-strategies"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>デプロイ戦略の比較
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://sre.google/sre-book/table-of-contents/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className="ref-icon">↗</span>SRE本（Google Site Reliability Engineering）
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
