import React from 'react';
import baseStyles from './SharedSection.module.css';
import { TableComponent } from '@/app/gcl/cloud-digital-leader/components/shared/TableComponent';
import { DiagramSVG } from '@/components/DiagramSVG';

type ToolRow = {
    name: React.ReactNode;
    role: string;
    useCase: string;
};

const TOOLS_DATA: readonly ToolRow[] = [
    { name: 'Cloud Billing レポート', role: 'コストの可視化', useCase: 'サービス別・プロジェクト別のコスト確認' },
    { name: <>予算 &amp; アラート<br />(Budgets &amp; Alerts)</>, role: '支出監視・通知', useCase: '月次予算を設定し、閾値超過でメール通知' },
    { name: 'コスト表 (Cost Table)', role: '詳細なコスト分析', useCase: 'SKU・ラベル・サービス別の細かい内訳確認' },
    { name: 'BigQuery Billing Export', role: 'データ分析基盤', useCase: 'SQL でのカスタム分析・ダッシュボード作成' },
    { name: 'ラベル (Labels)', role: 'コストの分類', useCase: 'チーム・環境・アプリ別にコストを仕分け' },
    { name: 'Recommender', role: 'コスト最適化提案', useCase: '使用率が低いVMのサイズ変更などを提案' },
];

/**
 * Section 1: Financial Governance とコスト管理に関する学習コンテンツを表示します。
 * TableComponent による比較表と DiagramSVG によるフロー図を含みます。
 *
 * @returns {JSX.Element}
 */
export const Section1 = () => {
    return (
        <section id="s1" className={baseStyles.section}>
            <div className={baseStyles.sectionLabel}>Section 6 — Part 1</div>
            <h2 className={baseStyles.sectionTitle}>財務ガバナンスと<br />クラウドコスト管理</h2>
            <p className={baseStyles.sectionDesc}>
                クラウドを安全・効率的に使うための「お金の管理術」。誰がいくら使っているかを把握し、予期せぬ請求を防ぎます。
            </p>
            <div className={baseStyles.divider}></div>

            {/* 基本概念 */}
            <div className={baseStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">💡</span> クラウド財務ガバナンスとは？ <span className={`${baseStyles.tag} ${baseStyles.tagBlue}`}>基本概念</span>
                </h3>
                <p>
                    クラウドは「使った分だけ払う（Pay as you go）」モデルのため、管理を怠ると請求が予想外に膨らむリスクがあります。財務ガバナンスとは、<strong>コストの可視化・制御・最適化</strong>を組織全体で仕組み化することです。
                </p>
                <div className={baseStyles.highlight}>
                    <strong>⚠️ 重要：</strong>Google Cloud は予算上限に達しても<strong>リソースを自動停止しません</strong>。予算アラートを設定しても「通知が来るだけ」です。自動制御が必要な場合は別途 Cloud Functions 等でアーキテクチャを組む必要があります。
                </div>
            </div>

            {/* 請求構造 */}
            <div className={baseStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🏗️</span> Google Cloud の請求構造 <span className={`${baseStyles.tag} ${baseStyles.tagBlue}`}>アーキテクチャ</span>
                </h3>
                <p>
                    リソース使用料はプロジェクト単位で発生し、請求先アカウント（Billing Account）に集約されます。
                </p>
                <DiagramSVG viewBox="0 0 800 120" ariaLabel="Google Cloud の請求構造: Organization から Resource への階層">
                    <rect x="10" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="90" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Organization</text>
                    <text x="90" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">企業・組織のルート</text>

                    <path d="M 180 60 L 220 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="230" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="310" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Billing Account</text>
                    <text x="310" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">支払いの単位</text>

                    <path d="M 400 60 L 440 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="450" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="530" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Project</text>
                    <text x="530" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">リソースの論理グループ</text>

                    <path d="M 620 60 L 660 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="670" y="30" width="120" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="730" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Resource</text>
                    <text x="730" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">VM・DB等</text>

                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-muted-foreground)" />
                        </marker>
                    </defs>
                </DiagramSVG>
            </div>

            {/* コスト管理ツール */}
            <div className={baseStyles.detailBlock}>
                <h3><span aria-hidden="true">🛠️</span> コスト管理ツール一覧 <span className={`${baseStyles.tag} ${baseStyles.tagBlue}`}>サービス</span></h3>
                <TableComponent
                    headers={['ツール・機能', '役割', '主な用途']}
                    rows={TOOLS_DATA}
                    getRowKey={(row) => String(row.role)}
                    renderRow={(row) => (
                        <tr>
                            <td className={baseStyles.tdName}>{row.name}</td>
                            <td>{row.role}</td>
                            <td>{row.useCase}</td>
                        </tr>
                    )}
                />
            </div>

            {/* コスト最適化の4戦略 */}
            <div className={baseStyles.detailBlock}>
                <h3><span aria-hidden="true">💰</span> コスト最適化の主要戦略 <span className={`${baseStyles.tag} ${baseStyles.tagOrange}`}>最適化</span></h3>
                <div className={baseStyles.cards}>
                    <div className={baseStyles.card}>
                        <div className={baseStyles.cardIcon} aria-hidden="true">🔖</div>
                        <h4>コミットメント割引 (CUDs)</h4>
                        <p>1年または3年の使用をコミットすることで、Compute Engine のコストを最大57%削減。予測可能なワークロードに最適。</p>
                    </div>
                    <div className={baseStyles.card}>
                        <div className={baseStyles.cardIcon} aria-hidden="true">⚡</div>
                        <h4>持続利用割引 (SUDs)</h4>
                        <p>月の利用時間が長いほど自動的に割引が適用される仕組み。設定不要で、月の25%以上使用すると自動的に割引開始。</p>
                    </div>
                    <div className={baseStyles.card}>
                        <div className={baseStyles.cardIcon} aria-hidden="true">🎯</div>
                        <h4>Spot VM（スポット VM）</h4>
                        <p>余剰リソースを最大91%割引で利用できるが、Google のキャパシティ需要によりいつでも停止される可能性がある。バッチ処理・ML に最適。</p>
                    </div>
                    <div className={baseStyles.card}>
                        <div className={baseStyles.cardIcon} aria-hidden="true">📦</div>
                        <h4>適切なサイジング</h4>
                        <p>AI Recommender が使用率の低いリソースを検出し、より小さいインスタンスタイプへの変更を提案。オーバープロビジョニングを排除。</p>
                    </div>
                </div>
            </div>

            {/* 自動コスト制御アーキテクチャ */}
            <div className={baseStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🤖</span> 自動コスト制御アーキテクチャ <span className={`${baseStyles.tag} ${baseStyles.tagBlue}`}>実装パターン</span>
                </h3>
                <p>
                    予算超過時にリソースを自動停止したい場合、以下のアーキテクチャが必要です。
                </p>
                <DiagramSVG viewBox="0 0 800 120" ariaLabel="自動コスト制御アーキテクチャ: Budget Alert から Pub/Sub、Cloud Functions を経てリソース停止へ">
                    <rect x="10" y="30" width="140" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="80" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Budget Alert</text>
                    <text x="80" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">閾値に到達</text>

                    <path d="M 160 60 L 200 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="210" y="30" width="140" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="280" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Pub/Sub</text>
                    <text x="280" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">通知を発行</text>

                    <path d="M 360 60 L 400 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="410" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                    <text x="490" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">Cloud Functions</text>
                    <text x="490" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">通知で起動</text>

                    <path d="M 580 60 L 620 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="630" y="30" width="140" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-red)" strokeWidth="2" />
                    <text x="700" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">リソース停止</text>
                    <text x="700" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">VM 停止など</text>
                </DiagramSVG>
                <div className={baseStyles.examTip}>
                    <span className={baseStyles.tipLabel}>📝 試験ポイント</span>
                    試験では「予算の上限に達すると自動的にリソースが停止される」という選択肢は<strong>誤り</strong>です。予算アラートは<strong>通知するだけ</strong>で、自動停止には Pub/Sub + Cloud Functions の連携が必要です。
                </div>
            </div>

            <div className={baseStyles.bpBox}>
                <h5>ベストプラクティス：財務ガバナンス</h5>
                <ul>
                    <li>すべてのリソースに<strong>ラベル（team / env / cost-center）</strong>を付与してコストを部門別に可視化する</li>
                    <li>プロジェクトごとに<strong>予算アラートを 50% / 90% / 100%</strong> の3段階で設定する</li>
                    <li>Cloud Billing データを<strong>BigQuery にエクスポート</strong>してカスタムダッシュボードを構築する</li>
                    <li>定常ワークロードは<strong>Committed Use Discounts（CUDs）</strong>を活用してコストを最大57%削減</li>
                    <li>AI Recommender の提案を定期的にレビューして<strong>アイドルリソースを削除または縮小</strong>する</li>
                    <li>DDoS 攻撃によるオートスケール過多を防ぐため<strong>Cloud Armor</strong> と<strong>MIG の最大台数上限</strong>を設定する</li>
                </ul>
            </div>

            <div className={baseStyles.sources}>
                <a className={baseStyles.sourceLink} href="https://cloud.google.com/billing/docs/concepts" target="_blank" rel="noopener noreferrer">
                    <span className={baseStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={baseStyles.sourceText}>
                        <strong>Cloud Billing — 概念と概要</strong>
                        <span className={baseStyles.sourceUrl}>https://cloud.google.com/billing/docs/concepts</span>
                    </div>
                </a>
                <a className={baseStyles.sourceLink} href="https://cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">
                    <span className={baseStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={baseStyles.sourceText}>
                        <strong>予算とアラートの作成・管理</strong>
                        <span className={baseStyles.sourceUrl}>https://cloud.google.com/billing/docs/how-to/budgets</span>
                    </div>
                </a>
                <a className={baseStyles.sourceLink} href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery" target="_blank" rel="noopener noreferrer">
                    <span className={baseStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={baseStyles.sourceText}>
                        <strong>BigQuery への課金データエクスポート設定</strong>
                        <span className={baseStyles.sourceUrl}>https://cloud.google.com/billing/docs/how-to/export-data-bigquery</span>
                    </div>
                </a>
            </div>
        </section>
    );
};
