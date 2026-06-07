'use client';

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import './page.css';

/**
 * GCP Associate Cloud Engineer Complete Advanced Guide Page Component.
 * Contains the comprehensive guide including domains 1-4, checklists, and trap tables.
 */
export default function CompleteAdvancedGuidePage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Scroll top visibility
        const handleScroll = () => {
            setScrolled(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);

        // Scroll spy intersection observer
        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        document.querySelectorAll('.sidebar .nav-item').forEach((n) => {
                            const href = n.getAttribute('href');
                            if (href === '#' + id) {
                                n.classList.add('active');
                            } else {
                                n.classList.remove('active');
                            }
                        });
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        document.querySelectorAll('.section').forEach((s) => spyObserver.observe(s));

        // Fade in animation observer
        const fadeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.05 }
        );

        document.querySelectorAll('.section, .card, .card-mini, .tcard').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.opacity = '0';
            htmlEl.style.transform = 'translateY(16px)';
            htmlEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            fadeObserver.observe(htmlEl);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            spyObserver.disconnect();
            fadeObserver.disconnect();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="complete-guide-page">
            <NavBar />
            
            {/* MAIN */}
        <main className="main">
            {/* HERO */}
            <section className="hero" id="overview">
                <div className="hero-tag">Google Cloud Certification</div>
                <h2>
                    Associate Cloud Engineer<br /><span className="highlight">完全試験対策ガイド</span>
                </h2>
                <p>
                    中級者〜上級者向け。全4ドメインの詳細解説・ベストプラクティス・Mermaidフローチャートと引っかけ問題パターンを完全網羅。
                </p>
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-value blue">50-60</div>
                        <div className="stat-label">設問数</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value green">2h</div>
                        <div className="stat-label">試験時間</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value yellow">$125</div>
                        <div className="stat-label">受験料</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value" style={{ color: '#a78bfa' }}>3yr</div>
                        <div className="stat-label">有効期限</div>
                    </div>
                </div>
            </section>

            <div className="content">
                {/* DOMAIN OVERVIEW */}
                <div className="domain-overview" style={{ marginTop: '48px' }}>
                    <a className="domain-card" href="#d1-hierarchy" style={{ cursor: 'pointer', textDecoration: 'none' }} >
                        <div className="domain-pct">23%</div>
                        <div className="domain-name">Domain 1<br />環境の設定</div>
                        <div className="domain-bar"></div>
                    </a>
                    <a className="domain-card" href="#d2-compute" style={{ cursor: 'pointer', textDecoration: 'none' }} >
                        <div className="domain-pct">30%</div>
                        <div className="domain-name">Domain 2<br />計画と実装</div>
                        <div className="domain-bar"></div>
                    </a>
                    <a className="domain-card" href="#d3-monitoring" style={{ cursor: 'pointer', textDecoration: 'none' }} >
                        <div className="domain-pct">27%</div>
                        <div className="domain-name">Domain 3<br />オペレーション</div>
                        <div className="domain-bar"></div>
                    </a>
                    <a className="domain-card" href="#d4-iam" style={{ cursor: 'pointer', textDecoration: 'none' }} >
                        <div className="domain-pct">20%</div>
                        <div className="domain-name">Domain 4<br />セキュリティ</div>
                        <div className="domain-bar"></div>
                    </a>
                </div>

                {/* ROADMAP */}
                <section className="section" id="roadmap">
                    <div className="section-header">
                        <span className="section-number">00</span>
                        <h2>学習ロードマップ</h2>
                    </div>
                    <div className="diagram-wrap">
                        <div className="diagram-label">8週間学習プラン</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">ROADMAP</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-roadmap'] || ''} ariaLabel="ACE roadmap diagram" />
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" >cloud.google.com — ACE 試験公式ページ</a >
                        <a className="source-item" href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" >services.google.com — ACE 試験ガイド PDF</a >
                    </div>
                </section>

                {/* ================================================================ */}
                {/* DOMAIN 1 */}
                {/* ================================================================ */}
                <section className="section" id="d1-hierarchy">
                    <div className="section-header">
                        <span className="section-number">D1-01</span>
                        <h2>リソース階層（Resource Hierarchy）</h2>
                        <span className="section-badge badge-blue">≈ 23%</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                        Google Cloud のすべてのリソースは Organization → Folder → Project → Resource
                        という厳密な階層構造で管理される。IAM
                        ポリシーはこの階層を通じて上位から下位へ継承される。
                    </p>

                    <div className="subsection">
                        <h3>階層構造の全体像</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Resource Hierarchy</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">HIERARCHY</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-hierarchy'] || ''} ariaLabel="ACE hierarchy diagram" />
                        </div>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>各レベルの役割と特性</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>レベル</th>
                                        <th>役割</th>
                                        <th>主な特性</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Organization</strong></td>
                                        <td>企業・組織全体のルートノード</td>
                                        <td>
                                            Google Workspace / Cloud Identity に紐付く。1ドメイン =
                                            1 Organization
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Folder</strong></td>
                                        <td>部門・環境・プロジェクトグループの区分け</td>
                                        <td>最大 10 レベルのネスト。IAM ポリシーの集約点</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Project</strong></td>
                                        <td>ビリングと信頼境界の最小単位</td>
                                        <td>Project ID はグローバルに一意・変更不可</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Resource</strong></td>
                                        <td>実際の GCP サービスリソース</td>
                                        <td>必ず 1 つのプロジェクトに属する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>IAM ポリシーの継承メカニズム（最重要）</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">IAM Policy Inheritance</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">INHERITANCE</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-inheritance'] || ''} ariaLabel="ACE inheritance diagram" />
                        </div>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>重要な法則:</strong>
                                上位で付与されたロールは下位で<strong>取り消せない</strong>。権限は「和集合」として機能する。下位レベルで制限しても、上位で許可されていればアクセスできる。
                            </div>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>プロジェクトの識別子</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>識別子</th>
                                        <th>例</th>
                                        <th>変更</th>
                                        <th>一意性</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Project ID</strong></td>
                                        <td><code>my-webapp-prod-20240101</code></td>
                                        <td><span className="tag tag-red">不可</span></td>
                                        <td>グローバルに一意</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Project Number</strong></td>
                                        <td><code>123456789012</code></td>
                                        <td><span className="tag tag-red">不可</span></td>
                                        <td>自動採番</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Project Name</strong></td>
                                        <td><code>My Webapp Production</code></td>
                                        <td><span className="tag tag-green">可能</span></td>
                                        <td>不要</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>プロジェクトのライフサイクル</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Project Lifecycle</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">LIFECYCLE</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-lifecycle'] || ''} ariaLabel="ACE lifecycle diagram" />
                        </div>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span>企業の組織構造をフォルダ階層に反映する
                                — IAM 管理の直感性と継承を最大活用
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span>共通権限は親フォルダで付与する —
                                個別設定の手間と設定漏れを防止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span>同一信頼境界のリソースを同一 Project
                                にまとめる — セキュリティポリシーの一貫性
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span>Organization
                                レベルのロール付与は最小限に — 影響範囲が最大のため慎重に
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" >docs.cloud.google.com — リソース階層ドキュメント</a >
                        <a className="source-item" href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" >cloud.google.com — IAM ベストプラクティスガイド</a >
                        <a className="source-item" href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" >docs.cloud.google.com — IAM 継承とアクセス制御</a >
                    </div>
                </section>

                {/* D1-02 ORG POLICY */}
                <section className="section" id="d1-orgpolicy">
                    <div className="section-header">
                        <span className="section-number">D1-02</span>
                        <h2>組織ポリシー（Organization Policy）</h2>
                        <span className="section-badge badge-blue">≈ 23%</span>
                    </div>

                    <div className="subsection">
                        <h3>IAM vs 組織ポリシーの違い</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>観点</th>
                                        <th>IAM</th>
                                        <th>組織ポリシー</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>制御対象</td>
                                        <td>誰が（Who）何をできるか</td>
                                        <td>リソースをどう設定できるか</td>
                                    </tr>
                                    <tr>
                                        <td>主体</td>
                                        <td>ユーザー・SA・グループ</td>
                                        <td>リソース設定そのもの</td>
                                    </tr>
                                    <tr>
                                        <td>例</td>
                                        <td>alice は VM を作成できる</td>
                                        <td>誰であっても外部 IP を持つ VM を作れない</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>主要な制約（Constraints）一覧</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>カテゴリ</th>
                                        <th>制約名</th>
                                        <th>効果</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className="tag tag-red">セキュリティ</span></td>
                                        <td>
                                            <code >constraints/iam.disableServiceAccountKeyCreation</code >
                                        </td>
                                        <td>SA の静的 JSON キー生成を禁止</td>
                                    </tr>
                                    <tr>
                                        <td><span className="tag tag-red">セキュリティ</span></td>
                                        <td>
                                            <code>constraints/iam.allowedPolicyMemberDomains</code>
                                        </td>
                                        <td>IAM に追加できるユーザーを特定ドメインに限定</td>
                                    </tr>
                                    <tr>
                                        <td><span className="tag tag-blue">ネットワーク</span></td>
                                        <td>
                                            <code >constraints/compute.disableExternalIpAddresses</code >
                                        </td>
                                        <td>外部 IP を持つ VM の作成を禁止</td>
                                    </tr>
                                    <tr>
                                        <td><span className="tag tag-blue">ネットワーク</span></td>
                                        <td><code>constraints/compute.requireOsLogin</code></td>
                                        <td>全 VM で OS Login を強制</td>
                                    </tr>
                                    <tr>
                                        <td><span className="tag tag-yellow">リージョン</span></td>
                                        <td><code>constraints/gcp.resourceLocations</code></td>
                                        <td>リソースを特定リージョンに限定（データ主権対応）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="source-list">
                            <a className="source-item" href="https://cloud.google.com/resource-manager/docs/organization-policy/overview" target="_blank" >cloud.google.com — 組織ポリシーの概要</a >
                        </div>
                    </div>
                </section>

                {/* D1-03 BILLING */}
                <section className="section" id="d1-billing">
                    <div className="section-header">
                        <span className="section-number">D1-03</span>
                        <h2>請求管理 & コスト制御</h2>
                        <span className="section-badge badge-blue">頻出</span>
                    </div>

                    <div className="subsection">
                        <h3>予算アラートの自動制御アーキテクチャ</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Budget Auto-Control Architecture</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">BILLING</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-billing'] || ''} ariaLabel="ACE billing diagram" />
                        </div>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>最重要（試験頻出）:</strong> Google Cloud
                                は予算の上限に達しても<strong>リソースを自動停止しません</strong>。自動停止には
                                <strong>Pub/Sub + Cloud Functions</strong> のアーキテクチャが必要。
                            </div>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>セキュリティインシデントによるコスト急増リスク</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>リスク</th>
                                        <th>原因</th>
                                        <th>対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>暗号資産マイニング</td>
                                        <td>SA キー漏洩</td>
                                        <td>キー生成禁止ポリシー・Secret Manager 使用</td>
                                    </tr>
                                    <tr>
                                        <td>DDoS によるオートスケール課金</td>
                                        <td>大量リクエスト</td>
                                        <td>
                                            <strong>Cloud Armor</strong> + MIG スケーリング上限設定
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span>Cloud Billing データを
                                <strong>BigQuery にエクスポート</strong> — 詳細分析・監査証跡の確保
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span><strong>50% / 90% / 100%</strong> の 3
                                段階でアラートを設定 — 段階的な把握と対応が可能
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span>100% 閾値には
                                <strong>Pub/Sub</strong> も設定 — 自動コスト制御の起点
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span >すべてのリソースに<strong>ラベル</strong>を付与 —
                                コストセンター別の細粒度分析
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">5</span ><strong>Cloud Armor + MIG 上限設定</strong>を必ず実施 —
                                セキュリティ起因のコスト暴走を防止
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/billing/docs/how-to/budgets" target="_blank" >docs.cloud.google.com — 予算・アラートの設定</a >
                        <a className="source-item" href="https://amnic.com/blogs/google-cloud-billing-reports" target="_blank" >amnic.com — Billing レポート活用ガイド</a >
                    </div>
                </section>

                {/* D1-04 GCLOUD */}
                <section className="section" id="d1-gcloud">
                    <div className="section-header">
                        <span className="section-number">D1-04</span>
                        <h2>gcloud CLI & ADC</h2>
                        <span className="section-badge badge-blue">≈ 23%</span>
                    </div>
                    <div className="subsection">
                        <h3>ADC（Application Default Credentials）の検索順序</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">ADC Resolution Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">ADC</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-adc'] || ''} ariaLabel="ACE adc diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>主要コマンド一覧</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>コマンド</th>
                                        <th>説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>gcloud config set project PROJECT_ID</code></td>
                                        <td>デフォルトプロジェクトを変更</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code >gcloud config set compute/region
                                                asia-northeast1</code >
                                        </td>
                                        <td>デフォルトリージョンを変更</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code >gcloud config configurations create
                                                dev-profile</code >
                                        </td>
                                        <td>新しい設定プロファイルを作成</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code >gcloud config configurations activate
                                                prod-profile</code >
                                        </td>
                                        <td>設定プロファイルを切り替え</td>
                                    </tr>
                                    <tr>
                                        <td><code>gcloud auth application-default login</code></td>
                                        <td>ADC（ローカル開発用認証情報）を設定</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code >gcloud services enable compute.googleapis.com</code >
                                        </td>
                                        <td>API を有効化</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/sdk/docs/configurations" target="_blank" >cloud.google.com — gcloud CLI 設定ドキュメント</a >
                    </div>
                </section>

                {/* ================================================================ */}
                {/* DOMAIN 2 */}
                {/* ================================================================ */}
                <section className="section" id="d2-compute">
                    <div className="section-header">
                        <span className="section-number">D2-01</span>
                        <h2>コンピューティングサービス選定</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>サービス選定フローチャート</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Compute Selection Decision Tree</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">COMPUTE-SELECT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-compute-select'] || ''} ariaLabel="ACE compute-select diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>コンピューティングサービス比較</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>管理レベル</th>
                                        <th>課金モデル</th>
                                        <th>最適なユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Compute Engine</strong></td>
                                        <td>フル制御 (IaaS)</td>
                                        <td>vCPU/時間</td>
                                        <td>レガシー移行・特定 OS・特定ライセンス</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Spot VM</strong></td>
                                        <td>フル制御 (IaaS)</td>
                                        <td>最大 91% 割引</td>
                                        <td>バッチ・ML・レンダリング（停止 OK）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GKE Autopilot</strong></td>
                                        <td>フルマネージド</td>
                                        <td>Pod リソース単位</td>
                                        <td>大規模マイクロサービス・運用負荷削減</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GKE Standard</strong></td>
                                        <td>半マネージド</td>
                                        <td>ノード (VM) 単位</td>
                                        <td>特権コンテナ・カーネル設定・DaemonSet</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Run</strong></td>
                                        <td>サーバーレス</td>
                                        <td>リクエスト単位</td>
                                        <td>HTTP API・ゼロスケール・イベント駆動</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Functions</strong></td>
                                        <td>サーバーレス</td>
                                        <td>呼び出し回数</td>
                                        <td>Webhook・軽量グルーロジック</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* D2-02 GCE */}
                <section className="section" id="d2-gce">
                    <div className="section-header">
                        <span className="section-number">D2-02</span>
                        <h2>Compute Engine (GCE)</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>セキュアな SSH アクセス管理</h3>
                        <div className="compare-grid">
                            <div className="compare-bad">
                                <div className="compare-header">✕ アンチパターン：静的 SSH キー</div>
                                <div className="compare-content">
                                    VM のメタデータに SSH
                                    公開鍵を登録。退職した社員の鍵が残り続け、不正アクセスのリスクが継続。鍵の棚卸し作業が膨大。
                                </div>
                            </div>
                            <div className="compare-good">
                                <div className="compare-header">✓ 推奨：OS Login</div>
                                <div className="compare-content">
                                    IAM ポリシーで SSH アクセスをリアルタイム管理。退職者の IAM
                                    ロール削除で即時アクセス無効化。詳細な監査ログが自動記録。
                                </div>
                            </div>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">OS Login Access Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">OSLOGIN</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-oslogin'] || ''} ariaLabel="ACE oslogin diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>マシンファミリーの選択基準</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ファミリー</th>
                                        <th>シリーズ例</th>
                                        <th>用途</th>
                                        <th>特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>General Purpose</strong></td>
                                        <td>N2, E2, T2D</td>
                                        <td>汎用 Web・開発環境</td>
                                        <td>コストとパフォーマンスのバランス。E2 が最安</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Compute Optimized</strong></td>
                                        <td>C2, C2D</td>
                                        <td>HPC・ゲームサーバー</td>
                                        <td>CPU 性能を最優先</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Memory Optimized</strong></td>
                                        <td>M2, M3</td>
                                        <td>SAP HANA・大型 DB</td>
                                        <td>最大 12TB のメモリ</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Accelerator Optimized</strong></td>
                                        <td>A2, A3, G2</td>
                                        <td>ML トレーニング・推論</td>
                                        <td>GPU/TPU 搭載</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span ><strong>OS Login + 2FA</strong> を本番環境で必須化 —
                                静的キーの漏洩・管理コストを排除
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong>外部 IP を持たない VM 構成</strong>（Cloud NAT
                                でアウトバウンド） — アタックサーフェスを最小化
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span>本番 VM への SSH は
                                <strong>JIT アクセス</strong>で一時的に付与 —
                                常時権限による被害を防止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span><strong>Shielded VM</strong> を有効化 —
                                UEFI セキュアブートで VM の完全性を保証
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin" target="_blank" >docs.cloud.google.com — OS Login の設定</a >
                        <a className="source-item" href="https://docs.cloud.google.com/compute/docs/connect/ssh-best-practices/login-access" target="_blank" >docs.cloud.google.com — SSH ベストプラクティス</a >
                    </div>
                </section>

                {/* D2-03 SPOT VM */}
                <section className="section" id="d2-spot">
                    <div className="section-header">
                        <span className="section-number">D2-03</span>
                        <h2>Spot VM</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>Spot VM vs Preemptible VM</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>項目</th>
                                        <th>Preemptible VM（旧）</th>
                                        <th>Spot VM（現在推奨）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>最大稼働時間</td>
                                        <td><strong>24時間</strong>（強制停止）</td>
                                        <td><span className="tag tag-green">制限なし</span></td>
                                    </tr>
                                    <tr>
                                        <td>停止通知</td>
                                        <td>30秒前</td>
                                        <td>30秒前</td>
                                    </tr>
                                    <tr>
                                        <td>最大割引率</td>
                                        <td>≈80%</td>
                                        <td><span className="tag tag-green">≈91%</span></td>
                                    </tr>
                                    <tr>
                                        <td>推奨度</td>
                                        <td><span className="tag tag-red">非推奨（レガシー）</span></td>
                                        <td><span className="tag tag-green">✅ 推奨</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>プリエンプション対応の設計パターン</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Preemption Recovery Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">PREEMPTION</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-preemption'] || ''} ariaLabel="ACE preemption diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span ><strong>MIG（Managed Instance Group）と組み合わせ</strong >てプリエンプト後に自動再作成
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong>チェックポイント機能を必ず実装</strong>（Cloud Storage
                                に進捗を保存）
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span>終了アクションは
                                <strong>STOP</strong>
                                を基本に（データ保持・キャパシティ回復後に再起動）
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span ><strong>複数ゾーンにわたる MIG</strong> を構成してリスクを分散
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot" target="_blank" >docs.cloud.google.com — Spot VM の作成と使用</a >
                        <a className="source-item" href="https://cloud.google.com/blog/products/compute/google-cloud-spot-vm-use-cases-and-best-practices" target="_blank" >cloud.google.com — Spot VM ベストプラクティス</a >
                    </div>
                </section>

                {/* D2-04 GKE */}
                <section className="section" id="d2-gke">
                    <div className="section-header">
                        <span className="section-number">D2-04</span>
                        <h2>Google Kubernetes Engine (GKE)</h2>
                        <span className="section-badge badge-green">最重要</span>
                    </div>
                    <div className="subsection">
                        <h3>Autopilot vs Standard の使い分け</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">GKE Mode Selection</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">GKE-SELECT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-gke-select'] || ''} ariaLabel="ACE gke-select diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>Autopilot vs Standard の詳細比較</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>項目</th>
                                        <th>Autopilot</th>
                                        <th>Standard</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ノード管理</td>
                                        <td>Google が自動管理</td>
                                        <td>ユーザーが管理</td>
                                    </tr>
                                    <tr>
                                        <td>セキュリティ標準</td>
                                        <td>Kubernetes Baseline 強制</td>
                                        <td>ユーザー設定</td>
                                    </tr>
                                    <tr>
                                        <td>特権コンテナ</td>
                                        <td><span className="tag tag-red">不可</span></td>
                                        <td><span className="tag tag-green">可能</span></td>
                                    </tr>
                                    <tr>
                                        <td>Workload Identity</td>
                                        <td>自動有効化</td>
                                        <td>手動設定</td>
                                    </tr>
                                    <tr>
                                        <td>DaemonSet</td>
                                        <td>
                                            <span className="tag tag-yellow" >DaemonSet は GKE Autopilot でサポートされるが、リソース要求やセキュリティポリシー等によりカスタム DaemonSet のデプロイは制限され得る（例：⚠️ 制約あり — ポリシー準拠が必要）</span >
                                        </td>
                                        <td><span className="tag tag-green">可能</span></td>
                                    </tr>
                                    <tr>
                                        <td>課金モデル</td>
                                        <td>
                                            <strong>Pod リソース単位</strong>（アイドルコストなし）
                                        </td>
                                        <td>ノード（VM）単位</td>
                                    </tr>
                                    <tr>
                                        <td>新規クラスタ推奨</td>
                                        <td>
                                            <span className="tag tag-green">✅ デフォルト推奨</span>
                                        </td>
                                        <td>特殊要件のみ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>Workload Identity（最重要）</h3>
                        <div className="compare-grid">
                            <div className="compare-bad">
                                <div className="compare-header">
                                    ✕ アンチパターン：JSON キーを Secret に保存
                                </div>
                                <div className="compare-content">
                                    サービスアカウントの JSON キーを Kubernetes Secret
                                    としてクラスタ内に保存し、Pod
                                    からマウントする。キー漏洩リスク・ローテーション管理の煩雑さが問題。
                                </div>
                            </div>
                            <div className="compare-good">
                                <div className="compare-header">✓ 推奨：Workload Identity</div>
                                <div className="compare-content">
                                    Kubernetes Service Account (KSA) と Google Cloud IAM Service
                                    Account (GSA) を紐付け。JSON
                                    キー不要。メタデータサーバーから自動的に短期トークンを取得。
                                </div>
                            </div>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Workload Identity Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">WORKLOAD-IDENTITY</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-workload-identity'] || ''} ariaLabel="ACE workload-identity diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span>新規クラスタは
                                <strong>Autopilot モードをデフォルト</strong>で選択 —
                                運用負荷ゼロ・セキュリティが自動強化
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span>GCP API アクセスには必ず
                                <strong>Workload Identity</strong> を使用（JSON キー禁止）
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span ><strong>プライベートクラスタ</strong>（外部 IP なし）で構築 —
                                ノードへの直接攻撃を遮断
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span ><strong>Binary Authorization</strong> を有効化 —
                                未承認イメージのデプロイを阻止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">5</span ><strong>Security Posture Dashboard</strong> を定期確認 — CVE
                                と設定ミスをプロアクティブに解消
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" >docs.cloud.google.com — GKE Autopilot セキュリティ</a >
                        <a className="source-item" href="https://docs.cloud.google.com/kubernetes-engine/docs/resources/autopilot-standard-feature-comparison" target="_blank" >docs.cloud.google.com — Autopilot vs Standard 比較</a >
                        <a className="source-item" href="https://oneuptime.com/blog/post/2026-02-17-how-to-choose-between-gke-autopilot-and-standard-mode-for-your-workload-requirements/view" target="_blank" >oneuptime.com — GKE モード選択ガイド</a >
                    </div>
                </section>

                {/* D2-05 CLOUD RUN */}
                <section className="section" id="d2-cloudrun">
                    <div className="section-header">
                        <span className="section-number">D2-05</span>
                        <h2>Cloud Run</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>第1世代 vs 第2世代 実行環境</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>項目</th>
                                        <th>第1世代</th>
                                        <th>第2世代（推奨）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ネットワーク接続</td>
                                        <td>VPC コネクタ</td>
                                        <td><strong>Direct VPC Egress（高速）</strong></td>
                                    </tr>
                                    <tr>
                                        <td>スループット</td>
                                        <td>制限あり</td>
                                        <td><span className="tag tag-green">最大 1Gbps</span>（Direct VPC 送出のインスタンスあたり上限。詳細は <a href="https://cloud.google.com/run/docs/configuring/vpc-direct-egress#limits" target="_blank">Google Cloud ドキュメント</a> を参照）</td>
                                    </tr>
                                    <tr>
                                        <td>並行処理数</td>
                                        <td>最大 250/インスタンス</td>
                                        <td>
                                            <span className="tag tag-green" >最大 1,000/インスタンス</span >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CPU</td>
                                        <td>リクエスト中のみ</td>
                                        <td>常時利用可能</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>カナリアデプロイ（トラフィック分割）</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Canary Deployment Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">RUN-TRAFFIC</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-run-traffic'] || ''} ariaLabel="ACE run-traffic diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/run/docs/configuring/networking-best-practices" target="_blank" >docs.cloud.google.com — Cloud Run ネットワーキングベストプラクティス</a >
                    </div>
                </section>

                {/* D2-06 STORAGE */}
                <section className="section" id="d2-storage">
                    <div className="section-header">
                        <span className="section-number">D2-06</span>
                        <h2>Cloud Storage</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>ストレージクラスの選択基準</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>クラス</th>
                                        <th>GB 単価</th>
                                        <th>取り出し料金</th>
                                        <th>最小保存期間</th>
                                        <th>アクセス頻度目安</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Standard</strong></td>
                                        <td>$0.020</td>
                                        <td>無料</td>
                                        <td>なし</td>
                                        <td>頻繁（日次以上）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Nearline</strong></td>
                                        <td>$0.010</td>
                                        <td>$0.01/GB</td>
                                        <td><span className="tag tag-yellow">30日</span></td>
                                        <td>月 1 回程度</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Coldline</strong></td>
                                        <td>$0.004</td>
                                        <td>$0.02/GB</td>
                                        <td><span className="tag tag-yellow">90日</span></td>
                                        <td>四半期 1 回程度</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Archive</strong></td>
                                        <td>$0.0012</td>
                                        <td>$0.05/GB</td>
                                        <td><span className="tag tag-yellow">365日</span></td>
                                        <td>年 1 回以下</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>試験頻出:</strong>
                                最小保存期間より前に削除しても、最小保存期間分の料金が発生します。
                            </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>Object Lifecycle Management (OLM) の自動化フロー</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Object Lifecycle Management</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">GCS-LIFECYCLE</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-gcs-lifecycle'] || ''} ariaLabel="ACE gcs-lifecycle diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span ><strong>統一バケットレベルアクセスを有効化</strong> — ACL
                                の複雑さを排除、IAM で一元管理
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong>OLM を必ず設定</strong>してストレージクラスを自動移行 —
                                コスト最適化の自動化
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span ><strong>バケット名に PII・機密情報を含めない</strong> —
                                バケット名は URL に公開される
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span>規制データには
                                <strong>保持ポリシー + バケットロック</strong>を適用 —
                                コンプライアンス要件
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/storage/docs/best-practices" target="_blank" >docs.cloud.google.com — Cloud Storage ベストプラクティス</a >
                    </div>
                </section>

                {/* D2-07 DATABASE */}
                <section className="section" id="d2-database">
                    <div className="section-header">
                        <span className="section-number">D2-07</span>
                        <h2>データベースサービス選定</h2>
                        <span className="section-badge badge-green">頻出</span>
                    </div>
                    <div className="subsection">
                        <h3>データベース選定フローチャート</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Database Selection Decision Tree</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">DB-SELECT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-db-select'] || ''} ariaLabel="ACE db-select diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>データベース完全比較表</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>種別</th>
                                        <th>可用性 SLA</th>
                                        <th>水平スケール</th>
                                        <th>主要ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Cloud SQL</strong></td>
                                        <td>リレーショナル</td>
                                        <td>99.95%</td>
                                        <td><span className="tag tag-red">❌</span></td>
                                        <td>Web アプリ・ERP・EC サイト</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Spanner</strong></td>
                                        <td>リレーショナル</td>
                                        <td><span className="tag tag-green">99.999%</span></td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>グローバル金融・在庫管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>AlloyDB</strong></td>
                                        <td>リレーショナル(PG互換)</td>
                                        <td>99.99%</td>
                                        <td>読取スケール可</td>
                                        <td>高性能 OLTP・分析混在</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Firestore</strong></td>
                                        <td>NoSQL（ドキュメント）</td>
                                        <td>99.999%</td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>モバイルアプリ・IoT バックエンド</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Bigtable</strong></td>
                                        <td>NoSQL（ワイドカラム）</td>
                                        <td>99.9%</td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>時系列データ・ML フィーチャーストア</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Memorystore</strong></td>
                                        <td>インメモリ</td>
                                        <td>99.9%</td>
                                        <td>Redis Cluster</td>
                                        <td>キャッシュ・セッション・リーダーボード</td>
                                    </tr>
                                    <tr>
                                        <td><strong>BigQuery</strong></td>
                                        <td>データウェアハウス</td>
                                        <td>99.9%</td>
                                        <td>✅ 自動</td>
                                        <td>BI・大規模ログ分析・ML</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained" target="_blank" >cloud.google.com — GCP データベースオプション解説</a >
                        <a className="source-item" href="https://dataroots.io/blog/best-practices-for-choosing-a-database-on-google-cloud-platform-gcp" target="_blank" >dataroots.io — GCP データベース選定ベストプラクティス</a >
                    </div>
                </section>

                {/* D2-08 NETWORK */}
                <section className="section" id="d2-network">
                    <div className="section-header">
                        <span className="section-number">D2-08</span>
                        <h2>ネットワーク設計</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>Shared VPC アーキテクチャ</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Shared VPC Architecture</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">SHARED-VPC</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-shared-vpc'] || ''} ariaLabel="ACE shared-vpc diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>VPC Network Peering の制約</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">VPC Peering Transitivity Limitation</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">VPC-PEERING</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-vpc-peering'] || ''} ariaLabel="ACE vpc-peering diagram" />
                        </div>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>VPC Peering の制約:</strong>
                                推移的（Transitive）ではない。A-B-C で Peering しても、A-C
                                間の通信は<strong>不可</strong>。また IP アドレスが重複していると
                                Peering 不可。
                            </div>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/vpc/docs/shared-vpc" target="_blank" >docs.cloud.google.com — Shared VPC</a >
                        <a className="source-item" href="https://docs.cloud.google.com/architecture/best-practices-vpc-design" target="_blank" >docs.cloud.google.com — VPC 設計ベストプラクティス</a >
                        <a className="source-item" href="https://cloud.google.com/blog/products/networking/6-best-practices-for-running-cloud-nat" target="_blank" >cloud.google.com — Cloud NAT ベストプラクティス</a >
                        <a className="source-item" href="https://docs.cloud.google.com/dns/docs/best-practices" target="_blank" >docs.cloud.google.com — Cloud DNS ベストプラクティス</a >
                    </div>
                </section>

                {/* D2-09 LB */}
                <section className="section" id="d2-lb">
                    <div className="section-header">
                        <span className="section-number">D2-09</span>
                        <h2>ロードバランサ選定</h2>
                        <span className="section-badge badge-green">頻出</span>
                    </div>
                    <div className="subsection">
                        <h3>ロードバランサ選定フローチャート</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Load Balancer Selection</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">LB-SELECT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-lb-select'] || ''} ariaLabel="ACE lb-select diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ロードバランサ比較表</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ロードバランサ</th>
                                        <th>レイヤ</th>
                                        <th>送信元 IP 保持</th>
                                        <th>SSL オフロード</th>
                                        <th>スコープ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Global External ALB</strong></td>
                                        <td>L7</td>
                                        <td><span className="tag tag-red">❌</span></td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>グローバル</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Regional External ALB</strong></td>
                                        <td>L7</td>
                                        <td><span className="tag tag-red">❌</span></td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>リージョン</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Proxy Network LB</strong></td>
                                        <td>L4</td>
                                        <td><span className="tag tag-red">❌</span></td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>グローバル/リージョン</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Passthrough Network LB</strong></td>
                                        <td>L4</td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td><span className="tag tag-red">❌</span></td>
                                        <td>リージョン</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>試験頻出:</strong>
                                データ主権・コンプライアンス要件がある場合は必ず<strong >リージョナル</strong >
                                ロードバランサを選択！グローバル ALB はエッジで SSL 終端するため海外
                                PoP で処理される可能性がある。
                            </div>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" >docs.cloud.google.com — ロードバランサ選定ガイド</a >
                    </div>
                </section>

                {/* D2-10 TERRAFORM */}
                <section className="section" id="d2-terraform">
                    <div className="section-header">
                        <span className="section-number">D2-10</span>
                        <h2>Infrastructure as Code（Terraform）</h2>
                        <span className="section-badge badge-green">≈ 30%</span>
                    </div>
                    <div className="subsection">
                        <h3>State ファイルの管理</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Terraform State Management</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">TF-STATE</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-tf-state'] || ''} ariaLabel="ACE tf-state diagram" />
                        </div>
                        </div>
                        <div className="callout callout-bad">
                            <div className="callout-icon">🚫</div>
                            <div className="callout-text">
                                <strong>絶対禁止:</strong>
                                <code>terraform.tfstate</code>
                                を手動で直接編集してはいけません。設定破損・リソースの意図しない削除を招きます。
                            </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>安全なデプロイフロー</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Safe Terraform Deploy Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">TF-FLOW</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-tf-flow'] || ''} ariaLabel="ACE tf-flow diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span>State は必ず
                                <strong>Cloud Storage リモートバックエンド</strong>に保存 —
                                競合・紛失防止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong><code>terraform plan -out=tfplan</code></strong>
                                を必ず実施してからレビュー — 意図しない変更の防止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span>CI/CD 認証は
                                <strong>Workload Identity / ADC</strong> を使用（JSON キー禁止）
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span>環境ごとに
                                <strong>別ディレクトリ・別 State バケット</strong>を使用 —
                                誤った環境への適用防止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">5</span>Terraform ≥ 1.5 では
                                <strong><code>import</code> ブロック</strong >で既存リソースを管理下へ
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/docs/terraform/best-practices/operations" target="_blank" >docs.cloud.google.com — Terraform ベストプラクティス</a >
                        <a className="source-item" href="https://cloud.google.com/blog/products/devops-sre/using-the-cloud-foundation-toolkit-with-terraform/" target="_blank" >cloud.google.com — Cloud Foundation Toolkit with Terraform</a >
                    </div>
                </section>

                {/* ================================================================ */}
                {/* DOMAIN 3 */}
                {/* ================================================================ */}
                <section className="section" id="d3-monitoring">
                    <div className="section-header">
                        <span className="section-number">D3-01</span>
                        <h2>Cloud Monitoring</h2>
                        <span className="section-badge badge-yellow">≈ 27%</span>
                    </div>
                    <div className="subsection">
                        <h3>Ops Agent のアーキテクチャ</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Ops Agent Architecture</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">OPS-AGENT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-ops-agent'] || ''} ariaLabel="ACE ops-agent diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>エージェントなしで取得できる vs Ops Agent が必要なメトリクス</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>カテゴリ</th>
                                        <th>メトリクス例</th>
                                        <th>Ops Agent 必要?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CPU 使用率</td>
                                        <td>
                                            <code >compute.googleapis.com/instance/cpu/utilization</code >
                                        </td>
                                        <td><span className="tag tag-green">自動取得</span></td>
                                    </tr>
                                    <tr>
                                        <td>ネットワーク I/O</td>
                                        <td>
                                            <code >compute.googleapis.com/instance/network/sent_bytes_count</code >
                                        </td>
                                        <td><span className="tag tag-green">自動取得</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>メモリ使用量</strong></td>
                                        <td>
                                            <code>agent.googleapis.com/memory/percent_used</code>
                                        </td>
                                        <td><span className="tag tag-red">✅ 必要</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>ディスク使用率</strong></td>
                                        <td><code>agent.googleapis.com/disk/percent_used</code></td>
                                        <td><span className="tag tag-red">✅ 必要</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>アプリケーションログ</strong></td>
                                        <td>nginx / mysql / custom ログ</td>
                                        <td><span className="tag tag-red">✅ 必要</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>試験頻出:</strong> メモリ使用量は Ops Agent
                                がないと取得できません！
                            </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>SLO（サービスレベル目標）の概念</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>概念</th>
                                        <th>説明</th>
                                        <th>例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>SLI</strong></td>
                                        <td>測定する指標</td>
                                        <td>リクエスト成功率</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SLO</strong></td>
                                        <td>目標値</td>
                                        <td>成功率 ≥ 99.9%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SLA</strong></td>
                                        <td>契約上の約束</td>
                                        <td>99.9% を下回ったら返金</td>
                                    </tr>
                                    <tr>
                                        <td><strong>エラーバジェット</strong></td>
                                        <td>許容できる失敗量</td>
                                        <td>月間 43.8 分のダウンタイム（99.9% SLO の場合）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/monitoring/agent/ops-agent" target="_blank" >docs.cloud.google.com — Ops Agent の概要</a >
                        <a className="source-item" href="https://cloud.google.com/stackdriver/docs/managed-prometheus" target="_blank" >cloud.google.com — Managed Service for Prometheus</a >
                    </div>
                </section>

                {/* D3-02 SNAPSHOT */}
                <section className="section" id="d3-snapshot">
                    <div className="section-header">
                        <span className="section-number">D3-02</span>
                        <h2>スナップショット管理</h2>
                        <span className="section-badge badge-yellow">≈ 27%</span>
                    </div>
                    <div className="subsection">
                        <h3>整合性レベルの比較（試験頻出）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>種類</th>
                                        <th>取得方法</th>
                                        <th>整合性</th>
                                        <th>アプリ停止</th>
                                        <th>推奨用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>クラッシュ整合性</strong></td>
                                        <td>アプリ停止なしで取得</td>
                                        <td>OS 再起動後の整合性</td>
                                        <td><span className="tag tag-green">不要</span></td>
                                        <td>OS ディスク・ステートレスアプリ</td>
                                    </tr>
                                    <tr>
                                        <td><strong>アプリケーション整合性</strong></td>
                                        <td>データをフラッシュしてから取得</td>
                                        <td><strong>完全な整合性</strong></td>
                                        <td><span className="tag tag-yellow">必要</span></td>
                                        <td><strong>DB（MySQL / PostgreSQL 等）</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>アプリケーション整合性スナップショットの取得フロー</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Application-Consistent Snapshot Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">APP-CONSISTENT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-app-consistent'] || ''} ariaLabel="ACE app-consistent diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span>本番環境は
                                <strong>スナップショットスケジュールで 1 時間ごとに自動取得</strong>
                                — RPO を最大 1 時間以内に
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span>DB は必ず
                                <strong>アプリケーション整合性スナップショット</strong>を取得
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span>Linux では
                                <strong><code>fstrim</code> を事前実行</strong> —
                                スナップショットサイズを削減・高速化
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span ><strong>別リージョンに DR コピー</strong>（<code >--storage-location</code >
                                で指定） — リージョン障害対策
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices" target="_blank" >docs.cloud.google.com — スナップショットベストプラクティス</a >
                    </div>
                </section>

                {/* D3-03 LOGGING */}
                <section className="section" id="d3-logging">
                    <div className="section-header">
                        <span className="section-number">D3-03</span>
                        <h2>Cloud Logging & 監査ログ</h2>
                        <span className="section-badge badge-yellow">最重要</span>
                    </div>
                    <div className="subsection">
                        <h3>Cloud Logging のデータフロー</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Cloud Logging Data Flow</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">LOGGING-FLOW</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-logging-flow'] || ''} ariaLabel="ACE logging-flow diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>監査ログの 3 種類（試験最重要）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>種別</th>
                                        <th>内容</th>
                                        <th>デフォルト</th>
                                        <th>料金</th>
                                        <th>無効化</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>管理アクティビティ</strong></td>
                                        <td>リソースの作成・削除・設定変更（IAM 変更等）</td>
                                        <td><span className="tag tag-green">✅ 常時有効</span></td>
                                        <td>無料</td>
                                        <td><span className="tag tag-red">❌ 不可</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>データアクセス</strong></td>
                                        <td>データの読み書き（GCS オブジェクト読み取り等）</td>
                                        <td><span className="tag tag-red">❌ 無効</span></td>
                                        <td>有料</td>
                                        <td>—</td>
                                    </tr>
                                    <tr>
                                        <td><strong>システムイベント</strong></td>
                                        <td>Google による自動操作（ライブマイグレーション等）</td>
                                        <td><span className="tag tag-green">✅ 常時有効</span></td>
                                        <td>無料</td>
                                        <td><span className="tag tag-red">❌ 不可</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠</div>
                            <div className="callout-text">
                                <strong>試験頻出:</strong>
                                <strong>データアクセス監査ログはデフォルトで無効</strong >。機密データを扱う API では手動で有効化が必要。
                            </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ログバケットの保持期間</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ログバケット</th>
                                        <th>デフォルト保持期間</th>
                                        <th>変更可否</th>
                                        <th>備考</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>_Required</code>（必須）</td>
                                        <td><strong>400 日</strong></td>
                                        <td><span className="tag tag-red">❌ 変更不可</span></td>
                                        <td>管理アクティビティ監査ログを含む</td>
                                    </tr>
                                    <tr>
                                        <td><code>_Default</code>（デフォルト）</td>
                                        <td><strong>30 日</strong></td>
                                        <td>
                                            <span className="tag tag-green">✅（最大 3650 日）</span>
                                        </td>
                                        <td>ほとんどのログ</td>
                                    </tr>
                                    <tr>
                                        <td>カスタムバケット</td>
                                        <td>設定値</td>
                                        <td><span className="tag tag-green">✅</span></td>
                                        <td>独自に作成</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span ><strong >管理アクティビティ監査ログを BigQuery にエクスポート</strong >
                                — 長期保存・詳細分析・監査証跡
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong >機密データを扱う API はデータアクセス監査ログを有効化</strong >
                                — コンプライアンス対応
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span ><strong>GKE の auditd ログを有効化</strong>（COS ノード） —
                                バイナリ実行履歴の追跡
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span ><strong>Cloud Storage の Coldline にアーカイブシンクを設定</strong>
                                — 低コストで長期保管
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/blog/products/devops-sre/cloud-logging-cost-management-best-practices" target="_blank" >cloud.google.com — Cloud Logging コスト管理ベストプラクティス</a >
                    </div>
                </section>

                {/* D3-04 GEMINI */}
                <section className="section" id="d3-gemini">
                    <div className="section-header">
                        <span className="section-number">D3-04</span>
                        <h2>Gemini Cloud Assist & Cloud Asset Inventory</h2>
                        <span className="section-badge badge-yellow">≈ 27%</span>
                    </div>
                    <div className="subsection">
                        <h3>Gemini Cloud Assist の機能</h3>
                        <div className="card-grid">
                            <div className="card-mini">
                                <div className="card-mini-icon">🔍</div>
                                <h4>根本原因分析（RCA）</h4>
                                <p>
                                    ログ・メトリクス・設定変更を横断的に AI 分析。障害調査の自動化。
                                </p>
                            </div>
                            <div className="card-mini">
                                <div className="card-mini-icon">📝</div>
                                <h4>IaC テンプレート生成</h4>
                                <p>
                                    自然言語から Terraform
                                    テンプレートを自動生成。インフラ構築の加速。
                                </p>
                            </div>
                            <div className="card-mini">
                                <div className="card-mini-icon">💰</div>
                                <h4>コスト最適化提案</h4>
                                <p>FinOps Hub 連携でリソース稼働率を AI 分析、節約案を提示。</p>
                            </div>
                            <div className="card-mini">
                                <div className="card-mini-icon">🏗</div>
                                <h4>アーキテクチャ図生成</h4>
                                <p>インフラ構成図を自動生成。設計レビューの効率化。</p>
                            </div>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/products/gemini/cloud-assist" target="_blank" >cloud.google.com — Gemini Cloud Assist</a >
                        <a className="source-item" href="https://cloud.google.com/blog/products/management-tools/gemini-cloud-assist-investigations-performs-root-cause-analysis" target="_blank" >cloud.google.com — Gemini RCA 機能</a >
                    </div>
                </section>

                {/* ================================================================ */}
                {/* DOMAIN 4 */}
                {/* ================================================================ */}
                <section className="section" id="d4-iam">
                    <div className="section-header">
                        <span className="section-number">D4-01</span>
                        <h2>IAM ロール設計</h2>
                        <span className="section-badge badge-red">最重要</span>
                    </div>
                    <div className="subsection">
                        <h3>ロール選択のフローチャート</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">IAM Role Selection</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">ROLE-SELECT</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-role-select'] || ''} ariaLabel="ACE role-select diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>主要な事前定義ロール一覧</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>ロール</th>
                                        <th>権限概要</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Compute Engine</td>
                                        <td><code>roles/compute.osLogin</code></td>
                                        <td>OS Login での SSH 接続</td>
                                    </tr>
                                    <tr>
                                        <td>Compute Engine</td>
                                        <td><code>roles/compute.osAdminLogin</code></td>
                                        <td>SSH 接続（sudo 権限付き）</td>
                                    </tr>
                                    <tr>
                                        <td>Cloud Storage</td>
                                        <td><code>roles/storage.objectViewer</code></td>
                                        <td>オブジェクトの閲覧のみ</td>
                                    </tr>
                                    <tr>
                                        <td>Cloud Run</td>
                                        <td><code>roles/run.invoker</code></td>
                                        <td>Cloud Run へのリクエスト送信</td>
                                    </tr>
                                    <tr>
                                        <td>Cloud Run</td>
                                        <td><code>roles/run.developer</code></td>
                                        <td>デプロイ・設定変更</td>
                                    </tr>
                                    <tr>
                                        <td>IAM</td>
                                        <td><code>roles/iam.serviceAccountTokenCreator</code></td>
                                        <td>SA の短期トークン生成（権限借用）</td>
                                    </tr>
                                    <tr>
                                        <td>IAM</td>
                                        <td><code>roles/iam.workloadIdentityUser</code></td>
                                        <td>Workload Identity 経由でのアクセス</td>
                                    </tr>
                                    <tr>
                                        <td>Secret Manager</td>
                                        <td><code>roles/secretmanager.secretAccessor</code></td>
                                        <td>シークレット値の読み取り</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span ><strong>基本ロール（Editor/Owner）の本番環境での使用を禁止</strong>
                                — 過剰権限によるリスク
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong>ユーザーではなくグループにロールを付与</strong> —
                                メンバー変更時の管理を自動化
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span ><strong>定期的に Policy Recommender で不要な権限を削除</strong> —
                                クリープ（権限の肥大化）防止
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span ><strong>IAM Conditions で一時的な権限を付与</strong> —
                                永続権限のリスクを排除
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" >cloud.google.com — IAM ベストプラクティスガイド</a >
                        <a className="source-item" href="https://cloudoptimo.com/blog/google-cloud-iam-role-hierarchies-explained/" target="_blank" >cloudoptimo.com — IAM ロール階層解説</a >
                    </div>
                </section>

                {/* D4-02 SA */}
                <section className="section" id="d4-sa">
                    <div className="section-header">
                        <span className="section-number">D4-02</span>
                        <h2>サービスアカウントの安全な管理</h2>
                        <span className="section-badge badge-red">≈ 20%</span>
                    </div>
                    <div className="subsection">
                        <h3>SA キーを使わない認証方法の全体図</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Keyless Authentication Patterns</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">KEYLESS-AUTH</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-keyless-auth'] || ''} ariaLabel="ACE keyless-auth diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>Workload Identity Federation のフロー</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">
                                Workload Identity Federation (GitHub Actions)
                            </div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">WIF-FLOW</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-wif-flow'] || ''} ariaLabel="ACE wif-flow diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>ベストプラクティス</h3>
                        <ul className="bp-list">
                            <li className="bp-item">
                                <span className="bp-num">1</span ><strong>SA JSON キーの生成を組織ポリシーで禁止</strong> —
                                漏洩リスクの根本排除
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">2</span ><strong>CI/CD は Workload Identity Federation を設定</strong> —
                                キー不要・自動失効
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">3</span ><strong>ローカル開発は ADC</strong>（<code >gcloud auth application-default login</code >）
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">4</span ><strong>特権操作は SA Impersonation または PAM</strong> — 監査ログ
                                + 自動失効
                            </li>
                            <li className="bp-item">
                                <span className="bp-num">5</span ><strong>1 SA = 1 アプリケーション / 1 目的</strong> —
                                最小権限・追跡可能性の確保
                            </li>
                        </ul>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/iam/docs/workload-identity-federation" target="_blank" >cloud.google.com — Workload Identity Federation</a >
                        <a className="source-item" href="https://cloud.google.com/iam/docs/pam-overview" target="_blank" >cloud.google.com — PAM（Privileged Access Manager）</a >
                    </div>
                </section>

                {/* D4-03 SECRET */}
                <section className="section" id="d4-secret">
                    <div className="section-header">
                        <span className="section-number">D4-03</span>
                        <h2>Secret Manager & Cloud KMS</h2>
                        <span className="section-badge badge-red">≈ 20%</span>
                    </div>
                    <div className="subsection">
                        <h3>シークレット管理の禁止事項 vs 推奨</h3>
                        <div className="compare-grid">
                            <div className="compare-bad">
                                <div className="compare-header">✕ 絶対禁止</div>
                                <div className="compare-content">
                                    <ul style={{ listStyle: 'none', padding: '0' }}>
                                        <li style={{ padding: '6px 0', borderBottom: '1px solid rgba(234, 67, 53, 0.15)' }} >
                                            🚫 コードにハードコード
                                        </li>
                                        <li style={{ padding: '6px 0', borderBottom: '1px solid rgba(234, 67, 53, 0.15)' }} >
                                            🚫 環境変数に平文で設定
                                        </li>
                                        <li style={{ padding: '6px 0' }}>🚫 Git にコミット</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="compare-good">
                                <div className="compare-header">✓ 推奨</div>
                                <div className="compare-content">
                                    <ul style={{ listStyle: 'none', padding: '0' }}>
                                        <li style={{ padding: '6px 0', borderBottom: '1px solid rgba(15, 157, 88, 0.15)' }} >
                                            ✅ Secret Manager に安全に保存
                                        </li>
                                        <li style={{ padding: '6px 0', borderBottom: '1px solid rgba(15, 157, 88, 0.15)' }} >
                                            ✅ IAM でアクセス制御
                                        </li>
                                        <li style={{ padding: '6px 0', borderBottom: '1px solid rgba(15, 157, 88, 0.15)' }} >
                                            ✅ 監査ログでアクセス追跡
                                        </li>
                                        <li style={{ padding: '6px 0' }}>✅ 自動ローテーション設定</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>デフォルト暗号化 vs CMEK（Cloud KMS）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>項目</th>
                                        <th>Google 管理キー（デフォルト）</th>
                                        <th>CMEK（顧客管理）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>設定</td>
                                        <td>自動（設定不要）</td>
                                        <td>手動で設定が必要</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>無料</td>
                                        <td>有料（KMS 課金）</td>
                                    </tr>
                                    <tr>
                                        <td>キー管理</td>
                                        <td>Google が管理</td>
                                        <td><strong>自分で管理</strong></td>
                                    </tr>
                                    <tr>
                                        <td>データへのアクセス遮断</td>
                                        <td>不可</td>
                                        <td><strong>キー削除でアクセスを即時遮断可能</strong></td>
                                    </tr>
                                    <tr>
                                        <td>コンプライアンス</td>
                                        <td>標準要件</td>
                                        <td>規制が厳しい業界向け</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* D4-04 NETWORK SEC */}
                <section className="section" id="d4-network-sec">
                    <div className="section-header">
                        <span className="section-number">D4-04</span>
                        <h2>ネットワークセキュリティ</h2>
                        <span className="section-badge badge-red">≈ 20%</span>
                    </div>
                    <div className="subsection">
                        <h3>VM への深層防御（多層セキュリティ）</h3>
                        <div className="diagram-wrap">
                            <div className="diagram-label">Defense in Depth for VM Access</div>
                            <div className="diagram-wrap">
                            <div className="diagram-label">VM-SECURITY</div>
                            <MermaidDiagram chart={DIAGRAMS['diag-vm-security'] || ''} ariaLabel="ACE vm-security diagram" />
                        </div>
                        </div>
                    </div>
                    <div className="subsection">
                        <h3>Cloud Armor のルールタイプ</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>タイプ</th>
                                        <th>説明</th>
                                        <th>例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>WAF ルール</strong></td>
                                        <td>OWASP Top 10 対策（事前設定済み）</td>
                                        <td>
                                            <code >evaluatePreconfiguredExpr('sqli-v33-stable')</code >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>IP ベース</strong></td>
                                        <td>特定 IP をブロック / 許可</td>
                                        <td>既知の悪意ある IP をブロック</td>
                                    </tr>
                                    <tr>
                                        <td><strong>地理情報ベース</strong></td>
                                        <td>特定の国からのアクセスを制御</td>
                                        <td><code>origin.region_code == 'XX'</code></td>
                                    </tr>
                                    <tr>
                                        <td><strong>レート制限</strong></td>
                                        <td>1 IP あたりのリクエスト数を制限</td>
                                        <td>100 req/60 秒を超えたら 10 分間 BAN</td>
                                    </tr>
                                    <tr>
                                        <td><strong>アダプティブ保護</strong></td>
                                        <td>ML で大規模 DDoS を自動検出</td>
                                        <td>自動でブロックルールを提案</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/armor/docs/overview" target="_blank" >cloud.google.com — Cloud Armor ドキュメント</a >
                        <a className="source-item" href="https://cloud.google.com/iap/docs/concepts-overview" target="_blank" >cloud.google.com — Identity-Aware Proxy</a >
                    </div>
                </section>

                {/* D4-05 SCC */}
                <section className="section" id="d4-scc">
                    <div className="section-header">
                        <span className="section-number">D4-05</span>
                        <h2>Security Command Center (SCC)</h2>
                        <span className="section-badge badge-red">≈ 20%</span>
                    </div>
                    <div className="subsection">
                        <h3>SCC が自動検出する設定ミス</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>カテゴリ</th>
                                        <th>検出内容の例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>IAM の問題</strong></td>
                                        <td>プロジェクトオーナーが複数・allUsers への権限付与</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ネットワーク設定</strong></td>
                                        <td>0.0.0.0/0 からの SSH/RDP 許可・パブリックアクセス</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Storage</strong></td>
                                        <td>パブリックバケット・暗号化なし</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Compute Engine</strong></td>
                                        <td>Shielded VM 無効・OS Login 無効・外部 IP</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GKE</strong></td>
                                        <td>認証の弱い設定・特権コンテナ・古いバージョン</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud SQL</strong></td>
                                        <td>パブリック IP・SSL 無効・バックアップなし</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="source-list">
                        <a className="source-item" href="https://cloud.google.com/security-command-center/docs/overview" target="_blank" >cloud.google.com — Security Command Center</a >
                        <a className="source-item" href="https://cloud.google.com/binary-authorization/docs/overview" target="_blank" >cloud.google.com — Binary Authorization</a >
                    </div>
                </section>

                {/* ================================================================ */}
                {/* EXAM TRAPS */}
                {/* ================================================================ */}
                <section className="section" id="traps">
                    <div className="section-header">
                        <span className="section-number">EXAM</span>
                        <h2>引っかけ問題パターン</h2>
                        <span className="section-badge badge-yellow">必読</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                        以下は ACE
                        試験で繰り返し問われる「引っかけ問題」パターンです。正しい答えとよくある誤答をセットで覚えてください。
                    </p>

                    <div className="trap-grid">
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">予算上限に達したらリソースはどうなるか?</div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ 通知が来るだけ（停止しない）</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ 自動停止される</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">自動停止を実現するには?</div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">
                                    ✅ Pub/Sub + Cloud Functions のアーキテクチャが必要
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ 予算設定だけで対応できる</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">メモリ使用量を監視したい</div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ Ops Agent をインストール</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ Cloud Monitoring で自動取得できる</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">
                                    VPC A→B, B→C Peering で A→C は通信できるか?
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ できない（推移的でない）</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ 通信できる</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">
                                    データ主権でデータを特定リージョンに限定したい
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">
                                    ✅ リージョナル LB を使用（グローバル ALB は不可）
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ グローバル ALB を使用</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">
                                    CI/CD から GCP リソースを操作する最も安全な方法
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ Workload Identity Federation</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ SA JSON キーを CI/CD に保存</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">データアクセス監査ログのデフォルト状態</div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ デフォルトで無効（手動で有効化が必要）</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ デフォルトで有効</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">
                                    GKE で GCP API にアクセスするための最善の方法
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ Workload Identity を使用</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ SA JSON キーを Secret にマウント</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">
                                    DB のバックアップで完全な整合性が必要な場合
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">
                                    ✅ アプリケーション整合性スナップショット（fsfreeze 後に取得）
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">❌ クラッシュ整合性スナップショット</div>
                            </div>
                        </div>
                        <div className="trap-item">
                            <div>
                                <div className="trap-label">問題</div>
                                <div className="trap-q">
                                    送信元 IP アドレスをバックエンドで確認したい
                                </div>
                            </div>
                            <div>
                                <div className="trap-label">正しい答え</div>
                                <div className="trap-a">✅ Passthrough Network LB を選択</div>
                            </div>
                            <div>
                                <div className="trap-label">よくある誤答</div>
                                <div className="trap-wrong">
                                    ❌ Proxy Network LB（送信元 IP が失われる）
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================================================================ */}
                {/* CHECKLIST */}
                {/* ================================================================ */}
                <section className="section" id="checklist">
                    <div className="section-header">
                        <span className="section-number">CHECK</span>
                        <h2>試験直前チェックリスト</h2>
                        <span className="section-badge badge-yellow">直前確認</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="card">
                            <h4 style={{ color: 'var(--gcp-blue)', fontFamily: 'var(--font-display)', marginBottom: '16px' }} >
                                Domain 1（≈ 23%）
                            </h4>
                            <ul className="checklist">
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    IAM
                                    ポリシーが上位から下位へ継承され、下位で取り消せないことを理解している
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    Project ID はグローバルに一意で変更不可だと知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    予算アラートが上限達成時にリソースを停止しないことを知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    自動コスト制御には Pub/Sub + Cloud Functions
                                    が必要だと知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    組織ポリシーと IAM の役割の違いを説明できる
                                </li>
                            </ul>
                        </div>
                        <div className="card">
                            <h4 style={{ color: 'var(--gcp-green)', fontFamily: 'var(--font-display)', marginBottom: '16px' }} >
                                Domain 2（≈ 30%）
                            </h4>
                            <ul className="checklist">
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    GKE Autopilot と Standard の使い分けを説明できる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    Workload Identity Federation が JSON
                                    キーより安全な理由を説明できる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    Cloud SQL / Spanner / AlloyDB / Bigtable / Firestore
                                    を正しく使い分けられる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    VPC Peering が推移的でないことを知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    コンプライアンス要件がある場合は必ずリージョナル LB
                                    を選択することを知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    Terraform の State ファイルをリモートバックエンドで管理できる
                                </li>
                            </ul>
                        </div>
                        <div className="card">
                            <h4 style={{ color: 'var(--gcp-yellow)', fontFamily: 'var(--font-display)', marginBottom: '16px' }} >
                                Domain 3（≈ 27%）
                            </h4>
                            <ul className="checklist">
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    メモリ使用量には Ops Agent
                                    が必要（デフォルトでは取得不可）を知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    管理アクティビティ・データアクセス・システムイベントの 3
                                    種類の監査ログを説明できる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    データアクセス監査ログはデフォルトで無効（手動で有効化が必要）を知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    _Required バケットは 400 日保持・変更不可だと知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    クラッシュ整合性 vs
                                    アプリケーション整合性スナップショットの違いを説明できる
                                </li>
                            </ul>
                        </div>
                        <div className="card">
                            <h4 style={{ color: 'var(--gcp-red)', fontFamily: 'var(--font-display)', marginBottom: '16px' }} >
                                Domain 4（≈ 20%）
                            </h4>
                            <ul className="checklist">
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    基本ロール（Editor/Owner）を本番で使うべきでない理由を説明できる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    SA JSON キーのリスクと代替手法（ADC / WIF /
                                    Impersonation）を説明できる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    IAP + OS Login で VM への SSH を多層防御する方法を説明できる
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    Cloud Armor が DDoS / WAF として ALB を保護することを知っている
                                </li>
                                <li className="check-item">
                                    <div className="check-box"></div>
                                    Secret Manager でシークレットを安全に管理する方法を知っている
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="source-list" style={{ marginTop: '32px' }}>
                        <a className="source-item" href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" >cloud.google.com — ACE 試験公式ページ</a >
                        <a className="source-item" href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" >services.google.com — ACE 試験ガイド PDF</a >
                        <a className="source-item" href="https://cloudskillsboost.google/" target="_blank" >cloudskillsboost.google — Google Cloud Skills Boost（ハンズオン）</a >
                        <a className="source-item" href="https://cloud.google.com/architecture" target="_blank" >cloud.google.com — Cloud Architecture Center</a >
                    </div>
                </section>
            </div>
            {/* /content */}
        </main>

            {/* Scroll to top button */}
            <button 
                id="scrollTop" 
                className={`scroll-top ${scrolled ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="ページトップへ戻る"
            >
                ▲
            </button>
        </div>
    );
}
