'use client';

import React, { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';

/** 本文中で繰り返す muted テキストのインラインスタイル。 */
const leadStyle: React.CSSProperties = {
    color: 'var(--color-muted-foreground)',
    marginBottom: 24,
    fontSize: 14,
};

/** コードブロック（ヘッダ + Copy ボタン + シンタックスハイライト済み pre）。 */
function CodeBlock({ lang, html }: { lang: string; html: string }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        const text = preRef.current?.textContent ?? '';
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-lang">{lang}</span>
                <button className="code-copy" type="button" onClick={onCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre ref={preRef}>
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        </div>
    );
}

/** クリックでトグルできるチェックリスト項目。 */
function CheckItem({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState(false);
    return (
        <div className="check-item">
            <button
                type="button"
                className={`check-box${checked ? ' checked' : ''}`}
                aria-pressed={checked}
                aria-label="チェック"
                onClick={() => setChecked((v) => !v)}
            />
            <div>{children}</div>
        </div>
    );
}

/** Mermaid 図ラッパー。共有 MermaidDiagram を mermaid-wrap で囲む。 */
function Diagram({ id, label }: { id: string; label: string }) {
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS[id]} ariaLabel={label} />
        </div>
    );
}

/**
 * ACE Section 1 完全ガイドのクライアントラッパー。
 * 進捗バー・scroll-to-top・scroll spy（nav-item の active 同期）を担う。
 */
export default function Section1Guide() {
    const [scrolled, setScrolled] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }
            setScrolled(scrollTop > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // scroll spy: 表示中セクションに対応する nav-item へ active を付与
        let spyObserver: IntersectionObserver | null = null;
        if (typeof IntersectionObserver !== 'undefined') {
            spyObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        const id = entry.target.id;
                        document.querySelectorAll('.ace-s1-page .nav-item').forEach((n) => {
                            n.classList.toggle('active', n.getAttribute('href') === `#${id}`);
                        });
                    });
                },
                { rootMargin: '-20% 0px -70% 0px' }
            );
            document.querySelectorAll('.ace-s1-page .section-block').forEach((s) => {
                spyObserver?.observe(s);
            });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            spyObserver?.disconnect();
        };
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="ace-s1-page">
            <div className="progress-bar" ref={progressRef} aria-hidden="true" />
            <NavBar />

            <div className="main">
                {/* HERO */}
                <div className="hero">
                    <div className="hero-eyebrow">
                        <span className="hero-chip">Google Cloud ACE</span>
                        <span className="hero-chip green">Section 1 / 完全解説</span>
                    </div>
                    <h1 className="hero-title">
                        Setting up a Cloud
                        <br />
                        Solution Environment
                    </h1>
                    <p className="hero-sub">
                        Google Cloud Associate Cloud Engineer 試験における Section 1
                        の全出題項目を、中級者〜上級者向けに詳細解説。
                        各トピックのベストプラクティスと公式ソースを完備した実践型スタディガイド。
                    </p>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">~23%</span>
                            <span className="hero-stat-label">試験配点</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">16</span>
                            <span className="hero-stat-label">出題トピック</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">2026</span>
                            <span className="hero-stat-label">最新試験ガイド対応</span>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="content">
                    {/* OVERVIEW */}
                    <div className="section-block" id="overview">
                        <div className="section-heading">
                            <div className="section-num">概</div>
                            <div>
                                <h2>試験配点と出題範囲マップ</h2>
                                <div className="section-meta">試験ガイド 2026年6月30日版 対応</div>
                            </div>
                        </div>

                        <div className="card-grid">
                            <div className="card">
                                <div className="card-icon">📋</div>
                                <div className="card-title">Section 1 の位置づけ</div>
                                <div className="card-desc">
                                    クラウド環境の「初期設定・基盤構築」に関する全設問。組織の構造設計からコスト管理まで、すべての運用の前提となる知識を問う。
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🎯</div>
                                <div className="card-title">試験での重要度</div>
                                <div className="card-desc">
                                    全体の約23%を占め、Section 2（計画・実装 ~26%）・Section
                                    3（オペレーション ~22%）・Section 4（アクセス・セキュリティ
                                    ~18%）と並ぶ主要ドメイン。
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🔑</div>
                                <div className="card-title">頻出トラップパターン</div>
                                <div className="card-desc">
                                    「予算上限でリソースが自動停止する」「IAMと組織ポリシーは同じ」「Project
                                    IDは変更できる」— これらは試験の典型的な引っかけ問題。
                                </div>
                            </div>
                        </div>

                        <Diagram id="diag-overview" label="Section 1 の出題範囲マップ" />

                        <div className="sources">
                            <div className="sources-title">📎 公式ソース</div>
                            <a
                                href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ ACE 認定ページ — cloud.google.com
                            </a>
                            <a
                                href="https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ 試験ガイド PDF (2026年6月30日版)
                            </a>
                        </div>
                    </div>

                    {/* 1.1.1 RESOURCE HIERARCHY */}
                    <div className="section-block" id="s111">
                        <div className="section-heading">
                            <div className="section-num">1.1.1</div>
                            <div>
                                <h2>リソース階層の構築</h2>
                                <div className="section-meta">
                                    Resource Hierarchy — 最頻出・最重要トピック
                                </div>
                            </div>
                        </div>

                        <p style={leadStyle}>
                            Google Cloud のすべてのリソースは Organization → Folder → Project →
                            Resource という4層の厳密な階層で管理される。この構造を正確に理解することが、IAMポリシー設計・コスト管理・セキュリティ境界の設計すべての基礎となる。
                        </p>

                        <div className="subsection">
                            <h3>階層の4レベル</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">レベル</th>
                                            <th scope="col">特徴</th>
                                            <th scope="col">主な役割</th>
                                            <th scope="col">最大深度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="tag tag-blue">Organization</span>
                                            </td>
                                            <td>
                                                Google Workspace / Cloud Identity
                                                ドメインに自動紐付け。階層のルートノード。
                                            </td>
                                            <td>組織全体のポリシー・IAM 管理の起点</td>
                                            <td>1（固定）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="tag tag-green">Folder</span>
                                            </td>
                                            <td>オプション。部門・事業部・環境ごとのグループ化</td>
                                            <td>環境（prod/dev）・部門・チームの分離</td>
                                            <td>最大10階層</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="tag tag-yellow">Project</span>
                                            </td>
                                            <td>リソースの基本単位。課金・API・IAMの境界</td>
                                            <td>リソースの作成・管理コンテナ</td>
                                            <td>制限なし</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="tag tag-red">Resource</span>
                                            </td>
                                            <td>実際のクラウドサービス（VM、DB、GCS等）</td>
                                            <td>ビジネスロジックを実行する実体</td>
                                            <td>制限なし</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>Project の3つの識別子</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">識別子</th>
                                            <th scope="col">特性</th>
                                            <th scope="col">例</th>
                                            <th scope="col">試験での重要度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>Project ID</code>
                                            </td>
                                            <td>
                                                グローバルに一意。作成後
                                                <strong style={{ color: 'var(--color-google-red)' }}>
                                                    変更不可
                                                </strong>
                                            </td>
                                            <td>
                                                <code>my-webapp-prod-20250101</code>
                                            </td>
                                            <td>⭐⭐⭐</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>Project Number</code>
                                            </td>
                                            <td>Google が自動採番する数値 ID。変更不可</td>
                                            <td>
                                                <code>123456789012</code>
                                            </td>
                                            <td>⭐⭐</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>Project Name</code>
                                            </td>
                                            <td>
                                                表示名のみ。
                                                <strong
                                                    style={{ color: 'var(--color-google-green)' }}
                                                >
                                                    変更可能
                                                </strong>
                                                ・一意性不要
                                            </td>
                                            <td>
                                                <code>My Webapp Production</code>
                                            </td>
                                            <td>⭐</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>IAMポリシーの継承メカニズム</h3>
                            <Diagram
                                id="diag-iam-inheritance"
                                label="IAM ポリシーが上位から下位へ自動継承されるメカニズム"
                            />
                            <div className="callout callout-danger">
                                <div className="callout-icon">⛔</div>
                                <div>
                                    <strong>試験トラップ:</strong>{' '}
                                    下位レベルで上位から継承された権限を「削除」しても無効。有効な権限は全レベルの
                                    <strong>和集合（Union）</strong>で決まる。上位の許可を取り消す唯一の手段は{' '}
                                    <strong>IAM Deny Policy</strong> を使用すること。
                                </div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>gcloud コマンド</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># プロジェクトの作成（フォルダ配下）</span>
gcloud projects create PROJECT_ID   --name="My Project"   --folder=FOLDER_ID

<span class="c"># 組織配下のプロジェクト一覧</span>
gcloud projects list --filter="parent.id=ORG_ID"

<span class="c"># プロジェクトの詳細確認</span>
gcloud projects describe PROJECT_ID

<span class="c"># 削除（30日間の猶予あり・元に戻せる）</span>
gcloud projects delete PROJECT_ID

<span class="c"># 削除のキャンセル（30日以内）</span>
gcloud projects undelete PROJECT_ID`}
                            />
                        </div>

                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        企業の組織構造をフォルダ階層に反映する
                                    </div>
                                    <div className="bp-desc">
                                        部門・事業部・チームの構造をそのままフォルダ設計に落とし込むことで、権限管理が直感的になりポリシーの継承が自然に機能する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        開発・ステージング・本番を別プロジェクトに分離する
                                    </div>
                                    <div className="bp-desc">
                                        セキュリティ境界・課金・アクセス制御を独立管理でき、本番環境への意図しない変更を防止できる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        複数プロジェクト共通の権限は親フォルダレベルで付与
                                    </div>
                                    <div className="bp-desc">
                                        個別設定の手間を省き、設定漏れを防止する。フォルダに付与したロールはすべての子プロジェクトに継承される。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">4</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        同じ信頼境界のリソースを同一プロジェクトに配置
                                    </div>
                                    <div className="bp-desc">
                                        セキュリティポリシーの一貫性を保ち、異なるセキュリティレベルのリソースが混在するリスクを排除する。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Resource Hierarchy — cloud.google.com
                            </a>
                            <a
                                href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ IAM Inheritance and Access Control
                            </a>
                            <a
                                href="https://cloud.google.com/blog/products/identity-security/resource-hierarchies-make-your-iam-management-easier"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Resource Hierarchies make IAM management easier — Google Cloud Blog
                            </a>
                        </div>
                    </div>

                    {/* 1.1.2 ORGANIZATION POLICY */}
                    <div className="section-block" id="s112">
                        <div className="section-heading">
                            <div className="section-num">1.1.2</div>
                            <div>
                                <h2>組織ポリシーの適用</h2>
                                <div className="section-meta">
                                    Organization Policy — IAMとの違いが頻出
                                </div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>IAMとの根本的な違い</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">観点</th>
                                            <th scope="col">IAM</th>
                                            <th scope="col">Organization Policy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>制御対象</td>
                                            <td>
                                                <strong>誰が</strong>何をできるか（アクセス制御）
                                            </td>
                                            <td>
                                                <strong>何を</strong>
                                                どう設定できるか（リソース設定の強制）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>設定対象</td>
                                            <td>Principal（ユーザー・SA・グループ）</td>
                                            <td>リソースの設定値・構成</td>
                                        </tr>
                                        <tr>
                                            <td>例</td>
                                            <td>alice が VM を作成できる</td>
                                            <td>外部 IP を持つ VM は誰も作成できない</td>
                                        </tr>
                                        <tr>
                                            <td>強制力</td>
                                            <td>IAM Deny Policy で上書き可能</td>
                                            <td>IAM より強制力が高い（adminも制限される）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <Diagram
                                id="diag-iam-orgpolicy-flow"
                                label="IAM チェックと組織ポリシーチェックの評価フロー"
                            />
                        </div>

                        <div className="subsection">
                            <h3>主要な制約（Constraints）一覧</h3>

                            <h4>🔐 セキュリティ強化系</h4>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">制約名</th>
                                            <th scope="col">効果</th>
                                            <th scope="col">推奨設定</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>iam.disableServiceAccountKeyCreation</code>
                                            </td>
                                            <td>SA の静的 JSON キー生成を禁止</td>
                                            <td>
                                                <span className="tag tag-red">組織全体で有効化</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>iam.disableServiceAccountKeyUpload</code>
                                            </td>
                                            <td>外部キーのアップロードを禁止</td>
                                            <td>
                                                <span className="tag tag-red">有効化推奨</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>compute.requireOsLogin</code>
                                            </td>
                                            <td>全 VM で OS Login を強制</td>
                                            <td>
                                                <span className="tag tag-yellow">有効化推奨</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>iam.allowedPolicyMemberDomains</code>
                                            </td>
                                            <td>IAM に追加できるドメインを限定</td>
                                            <td>
                                                <span className="tag tag-yellow">
                                                    自社ドメインのみ許可
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4>🌐 ネットワーク制限系</h4>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">制約名</th>
                                            <th scope="col">効果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>compute.disableExternalIpAddresses</code>
                                            </td>
                                            <td>外部 IP を持つ VM の作成を禁止</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>compute.vmExternalIpAccess</code>
                                            </td>
                                            <td>外部 IP を許可する VM のリストを制限</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>compute.restrictCloudNATUsage</code>
                                            </td>
                                            <td>Cloud NAT の使用を特定サブネットに制限</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4>🏛 データ主権・コンプライアンス系</h4>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">制約名</th>
                                            <th scope="col">効果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>gcp.resourceLocations</code>
                                            </td>
                                            <td>リソースを特定リージョン/ゾーンに限定</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>storage.uniformBucketLevelAccess</code>
                                            </td>
                                            <td>Cloud Storage でバケットレベルアクセスを強制</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>storage.publicAccessPrevention</code>
                                            </td>
                                            <td>Cloud Storage のパブリックアクセスを禁止</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>継承と上書きのフロー</h3>
                            <Diagram
                                id="diag-orgpolicy-inheritance"
                                label="組織ポリシーの継承とフォルダ単位での上書きフロー"
                            />
                        </div>

                        <div className="subsection">
                            <h3>gcloud コマンド</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># 制約の一覧確認</span>
gcloud org-policies list-constraints --organization=ORG_ID

<span class="c"># 外部IP禁止ポリシーを組織に適用</span>
gcloud resource-manager org-policies enable-enforce   constraints/compute.disableExternalIpAddresses   --organization=ORG_ID

<span class="c"># YAMLでリージョン制限ポリシーを適用</span>
gcloud org-policies set-policy policy.yaml --project=PROJECT_ID

<span class="c"># Dry-Runモード（本番適用前のテスト: 違反はログに記録されるが拒否されない）</span>
gcloud org-policies set-policy policy.yaml --dry-run

<span class="c"># 有効なポリシーを確認</span>
gcloud org-policies describe   constraints/gcp.resourceLocations   --effective   --project=PROJECT_ID`}
                            />
                            <CodeBlock
                                lang="yaml — policy.yaml（リージョン制限の例）"
                                html={`name: projects/PROJECT_ID/policies/gcp.resourceLocations
spec:
  rules:
  - values:
      allowedValues:
      - in:asia-northeast1-locations  <span class="c"># 東京</span>
      - in:asia-northeast2-locations  <span class="c"># 大阪</span>`}
                            />
                        </div>

                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">SA キー生成禁止を組織全体に適用</div>
                                    <div className="bp-desc">
                                        <code>constraints/iam.disableServiceAccountKeyCreation</code>{' '}
                                        を組織レベルで有効化し、静的 JSON
                                        キーの漏洩リスクを根本から排除する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">Dry-Run モードで事前テスト</div>
                                    <div className="bp-desc">
                                        本番環境への適用前に必ず Dry-Run
                                        モードでテストし、意図しないサービス停止を防止する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        データ主権要件は resourceLocations で強制
                                    </div>
                                    <div className="bp-desc">
                                        GDPR・個人情報保護法などの規制対応として、リソースを特定リージョンに限定する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">4</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        開発環境は制約を緩和し本番は厳格に
                                    </div>
                                    <div className="bp-desc">
                                        フォルダ単位で制約を上書きし、開発効率と本番セキュリティのバランスを実現する。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/organization-policy/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Organization Policy Overview
                            </a>
                            <a
                                href="https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ 制約一覧 — Org Policy Constraints
                            </a>
                        </div>
                    </div>

                    {/* 1.1.3 IAM ROLES */}
                    <div className="section-block" id="s113">
                        <div className="section-heading">
                            <div className="section-num">1.1.3</div>
                            <div>
                                <h2>IAMロールの付与</h2>
                                <div className="section-meta">
                                    Identity and Access Management — 最小特権の原則
                                </div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>IAMの3要素</h3>
                            <Diagram
                                id="diag-iam-three-elements"
                                label="IAM の3要素（Principal・Role・Resource）の関係"
                            />
                        </div>

                        <div className="subsection">
                            <h3>ロールの3種類</h3>
                            <div className="card-grid">
                                <div
                                    className="card"
                                    style={{ borderColor: 'rgba(234, 67, 53, 0.4)' }}
                                >
                                    <div className="card-icon">🚫</div>
                                    <div
                                        className="card-title"
                                        style={{ color: 'var(--color-google-red)' }}
                                    >
                                        基本ロール（Basic Roles）
                                    </div>
                                    <div className="card-desc">
                                        <code>roles/viewer</code> / <code>roles/editor</code> /{' '}
                                        <code>roles/owner</code> — 粒度が粗く過剰権限。
                                        <strong style={{ color: 'var(--color-google-red)' }}>
                                            本番環境では原則使用禁止。
                                        </strong>
                                    </div>
                                </div>
                                <div
                                    className="card"
                                    style={{ borderColor: 'rgba(52, 168, 83, 0.4)' }}
                                >
                                    <div className="card-icon">✅</div>
                                    <div
                                        className="card-title"
                                        style={{ color: 'var(--color-google-green)' }}
                                    >
                                        事前定義ロール（Predefined Roles）
                                    </div>
                                    <div className="card-desc">
                                        Google がキュレーションした細かい権限セット。
                                        <code>roles/compute.instanceAdmin.v1</code> など。
                                        <strong style={{ color: 'var(--color-google-green)' }}>
                                            通常はこれを使用。
                                        </strong>
                                    </div>
                                </div>
                                <div
                                    className="card"
                                    style={{ borderColor: 'rgba(251, 188, 4, 0.4)' }}
                                >
                                    <div className="card-icon">⚠️</div>
                                    <div
                                        className="card-title"
                                        style={{ color: 'var(--color-google-yellow)' }}
                                    >
                                        カスタムロール（Custom Roles）
                                    </div>
                                    <div className="card-desc">
                                        特殊なワークフローのみ自前で定義。管理コストが増大するため最小限にとどめる。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>主要な事前定義ロール（試験頻出）</h3>
                            <h4>Compute Engine</h4>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ロール</th>
                                            <th scope="col">権限の概要</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>roles/compute.admin</code>
                                            </td>
                                            <td>Compute Engine の完全管理</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>roles/compute.instanceAdmin.v1</code>
                                            </td>
                                            <td>VM の作成・管理（ネットワーク変更は不可）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>roles/compute.osLogin</code>
                                            </td>
                                            <td>OS Login での SSH（sudo なし）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>roles/compute.osAdminLogin</code>
                                            </td>
                                            <td>OS Login での SSH（sudo あり）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h4>IAM / Service Accounts</h4>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ロール</th>
                                            <th scope="col">権限の概要</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>roles/iam.serviceAccountAdmin</code>
                                            </td>
                                            <td>SA の作成・管理</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>roles/iam.serviceAccountUser</code>
                                            </td>
                                            <td>SA を VM にアタッチする権限（actAs）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>roles/iam.serviceAccountTokenCreator</code>
                                            </td>
                                            <td>SA の短期トークン生成（権限借用）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>roles/iam.workloadIdentityUser</code>
                                            </td>
                                            <td>Workload Identity 経由での SA アクセス</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>gcloud コマンド</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># ユーザーにロールを付与</span>
gcloud projects add-iam-policy-binding PROJECT_ID   --member="user:alice@example.com"   --role="roles/compute.instanceAdmin.v1"

<span class="c"># グループにロールを付与（推奨）</span>
gcloud projects add-iam-policy-binding PROJECT_ID   --member="group:dev-team@example.com"   --role="roles/run.developer"

<span class="c"># IAM Conditions（有効期限付き権限）</span>
gcloud projects add-iam-policy-binding PROJECT_ID   --member="user:contractor@partner.com"   --role="roles/viewer"   --condition='title=Temp,expression=request.time &lt; timestamp("2025-12-31T23:59:59Z")'

<span class="c"># カスタムロールの作成</span>
gcloud iam roles create customDeployer   --project=PROJECT_ID   --file=custom-role.yaml

<span class="c"># IAMポリシーの確認</span>
gcloud projects get-iam-policy PROJECT_ID`}
                            />
                        </div>

                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">最小特権の原則を徹底する</div>
                                    <div className="bp-desc">
                                        必要な権限だけを、必要な期間だけ、必要なリソースのみに付与する。侵害時の被害範囲を最小化できる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">個人ではなくグループにロールを付与</div>
                                    <div className="bp-desc">
                                        Google
                                        グループにロールを付与することで、メンバーの追加・削除だけで権限を管理でき、IAM
                                        ポリシーの変更が不要になる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Policy Recommender で定期的に棚卸し
                                    </div>
                                    <div className="bp-desc">
                                        90日間の実際の使用状況を分析して不要な権限を検出・削除することで、権限のクリープ（肥大化）を防止する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">4</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        一時的な作業には IAM Conditions を活用
                                    </div>
                                    <div className="bp-desc">
                                        有効期限・時間帯・リソースパスの条件を付与することで、永続権限によるリスクを排除する。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Using resource hierarchy for access control
                            </a>
                            <a
                                href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ IAM Best Practice Guides — Google Cloud Blog
                            </a>
                            <a
                                href="https://cloudoptimo.com/blog/google-cloud-iam-role-hierarchies-explained/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ IAM Role Hierarchies Explained — CloudOptimo
                            </a>
                        </div>
                    </div>

                    {/* 1.1.4 Cloud Identity */}
                    <div className="section-block" id="s114">
                        <div className="section-heading">
                            <div className="section-num">1.1.4</div>
                            <div>
                                <h2>Cloud Identity のユーザー・グループ管理</h2>
                                <div className="section-meta">
                                    Cloud Identity / Google Workspace — 組織のアイデンティティ基盤
                                </div>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>Cloud Identity vs Google Workspace</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">Google Workspace</th>
                                            <th scope="col">Cloud Identity Free</th>
                                            <th scope="col">Cloud Identity Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Gmail / Drive</td>
                                            <td>✅ あり</td>
                                            <td>❌ なし</td>
                                            <td>❌ なし</td>
                                        </tr>
                                        <tr>
                                            <td>Google Cloud 利用</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                        </tr>
                                        <tr>
                                            <td>Organization ノード</td>
                                            <td>✅ 自動作成</td>
                                            <td>✅ 自動作成</td>
                                            <td>✅ 自動作成</td>
                                        </tr>
                                        <tr>
                                            <td>MDM（モバイル管理）</td>
                                            <td>一部</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                        </tr>
                                        <tr>
                                            <td>コスト</td>
                                            <td>有料</td>
                                            <td>
                                                <span className="tag tag-green">無料</span>
                                            </td>
                                            <td>有料</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>自動プロビジョニング（GCDS / SCIM）</h3>
                            <Diagram
                                id="diag-gcds-provisioning"
                                label="社内 LDAP/AD から GCDS/SCIM 経由で Cloud Identity へ同期するフロー"
                            />
                        </div>
                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        退職者管理は Cloud Identity での無効化を基点にする
                                    </div>
                                    <div className="bp-desc">
                                        Cloud Identity でアカウントを無効化するだけで、Google Cloud の
                                        IAM アクセスも即時失効する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        GCDS または SCIM で自動プロビジョニングを設定
                                    </div>
                                    <div className="bp-desc">
                                        人的ミスと管理コストを削減。Okta・Azure AD などの IdP
                                        との連携が標準的。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        allUsers / allAuthenticatedUsers への権限付与を禁止
                                    </div>
                                    <div className="bp-desc">
                                        組織ポリシー <code>iam.allowedPolicyMemberDomains</code>{' '}
                                        で自社ドメイン外への権限付与を制限する。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://cloud.google.com/identity/docs/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Cloud Identity Overview
                            </a>
                        </div>
                    </div>

                    {/* 1.1.5 API */}
                    <div className="section-block" id="s115">
                        <div className="section-heading">
                            <div className="section-num">1.1.5</div>
                            <div>
                                <h2>APIの有効化</h2>
                                <div className="section-meta">
                                    API & Services — デフォルトで無効化されている理由
                                </div>
                            </div>
                        </div>
                        <div className="callout callout-info">
                            <div className="callout-icon">ℹ️</div>
                            <div>
                                新規プロジェクトではほとんどの API
                                がデフォルトで無効化されている。これは
                                <strong>攻撃面（Attack Surface）を最小化</strong>
                                するためのセキュリティ設計であり、意図的な仕様である。
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>主要 API と対応サービス</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">API 名</th>
                                            <th scope="col">対応サービス</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <code>compute.googleapis.com</code>
                                            </td>
                                            <td>Compute Engine</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>container.googleapis.com</code>
                                            </td>
                                            <td>Google Kubernetes Engine</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>run.googleapis.com</code>
                                            </td>
                                            <td>Cloud Run</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>sqladmin.googleapis.com</code>
                                            </td>
                                            <td>Cloud SQL</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>bigquery.googleapis.com</code>
                                            </td>
                                            <td>BigQuery</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>secretmanager.googleapis.com</code>
                                            </td>
                                            <td>Secret Manager</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>cloudasset.googleapis.com</code>
                                            </td>
                                            <td>Cloud Asset Inventory</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>geminicloudassist.googleapis.com</code>
                                            </td>
                                            <td>Gemini Cloud Assist</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>monitoring.googleapis.com</code>
                                            </td>
                                            <td>Cloud Monitoring</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>logging.googleapis.com</code>
                                            </td>
                                            <td>Cloud Logging</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>gcloud コマンド & Terraform</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># 複数APIを一括有効化</span>
gcloud services enable   compute.googleapis.com   container.googleapis.com   run.googleapis.com   secretmanager.googleapis.com   cloudasset.googleapis.com   --project=PROJECT_ID

<span class="c"># 有効化されているAPIの確認</span>
gcloud services list --enabled --project=PROJECT_ID`}
                            />
                            <CodeBlock
                                lang="hcl — Terraform"
                                html={`resource "google_project_service" "apis" {
  for_each = toset([
    "compute.googleapis.com",
    "container.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com",
  ])
  project            = var.project_id
  service            = each.value
  disable_on_destroy = false  <span class="c"># Terraform削除時にAPIを無効化しない</span>
}`}
                            />
                        </div>
                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">必要なAPIのみを有効化する</div>
                                    <div className="bp-desc">
                                        最小権限の原則をAPIレベルでも適用し、不要なAPIは無効のままにすることで攻撃面を最小化する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Terraform で API 有効化を IaC 管理する
                                    </div>
                                    <div className="bp-desc">
                                        環境の再現性・一貫性を確保し、手動操作による設定漏れを防止する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        <code>disable_on_destroy = false</code> を設定
                                    </div>
                                    <div className="bp-desc">
                                        Terraform destroy 時に意図しないサービス中断を防止する。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 1.1.6 Observability */}
                    <div className="section-block" id="s116">
                        <div className="section-heading">
                            <div className="section-num">1.1.6</div>
                            <div>
                                <h2>Google Cloud Observabilityの設定</h2>
                                <div className="section-meta">
                                    Monitoring / Logging / Trace — 可観測性スイートの初期設定
                                </div>
                            </div>
                        </div>
                        <div className="card-grid">
                            <div className="card">
                                <div className="card-icon">📊</div>
                                <div className="card-title">Cloud Monitoring</div>
                                <div className="card-desc">
                                    メトリクス・アラート・SLO・ダッシュボード管理
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">📋</div>
                                <div className="card-title">Cloud Logging</div>
                                <div className="card-desc">
                                    ログ収集・検索・ルーティング・エクスポート
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🔍</div>
                                <div className="card-title">Cloud Trace</div>
                                <div className="card-desc">
                                    マイクロサービス間の分散トレーシング
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">⚡</div>
                                <div className="card-title">Ops Agent</div>
                                <div className="card-desc">
                                    VM 内部のメモリ・ディスク使用率収集に必須
                                </div>
                            </div>
                        </div>
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠️</div>
                            <div>
                                <strong>試験頻出:</strong> Compute Engine VM の
                                <strong>メモリ使用量</strong>はデフォルトでは収集されない。
                                <strong>Ops Agent のインストールが必須。</strong>CPU・ネットワーク
                                I/O はエージェントなしで収集可能。
                            </div>
                        </div>
                        <CodeBlock
                            lang="bash"
                            html={`<span class="c"># Monitoring/Logging API の有効化</span>
gcloud services enable monitoring.googleapis.com logging.googleapis.com   --project=PROJECT_ID

<span class="c"># Ops Agent のインストール（VM にSSH後）</span>
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

<span class="c"># GKE Managed Service for Prometheus を有効化</span>
gcloud container clusters update CLUSTER_NAME   --enable-managed-prometheus   --region=REGION`}
                        />
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://cloud.google.com/products/observability"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Google Cloud Observability
                            </a>
                            <a
                                href="https://docs.cloud.google.com/monitoring/agent/ops-agent"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Ops Agent Overview
                            </a>
                        </div>
                    </div>

                    {/* 1.1.7 Quota */}
                    <div className="section-block" id="s117">
                        <div className="section-heading">
                            <div className="section-num">1.1.7</div>
                            <div>
                                <h2>クォータの評価と申請</h2>
                                <div className="section-meta">
                                    Quota Management — 大規模デプロイ前に必ず確認
                                </div>
                            </div>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">クォータの種類</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>レート制限</td>
                                        <td>1 秒あたりの API リクエスト数</td>
                                    </tr>
                                    <tr>
                                        <td>リソース制限</td>
                                        <td>プロジェクトあたりの VM 数・vCPU 数</td>
                                    </tr>
                                    <tr>
                                        <td>ストレージ制限</td>
                                        <td>GCS バケット数（デフォルト 100/プロジェクト）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="diag-quota-request" label="クォータ増加申請のステップフロー" />
                        <div className="callout callout-warn">
                            <div className="callout-icon">⚠️</div>
                            <div>
                                <strong>重要:</strong>{' '}
                                クォータ増加申請は承認まで数日かかる場合がある。大規模デプロイ前は
                                <strong>事前申請</strong>が必須。
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://cloud.google.com/docs/quota"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Quota Management — cloud.google.com
                            </a>
                        </div>
                    </div>

                    {/* 1.1.8 Standalone */}
                    <div className="section-block" id="s118">
                        <div className="section-heading">
                            <div className="section-num">1.1.8</div>
                            <div>
                                <h2>スタンドアロン組織の設定</h2>
                                <div className="section-meta">
                                    Standalone Organization — Organization ノード取得の正しい理解
                                </div>
                            </div>
                        </div>
                        <p style={leadStyle}>
                            Google Cloud で Organization ノードを持つには Google Workspace または
                            Cloud Identity のドメインが必要。これにより組織レベルの
                            IAM・組織ポリシー・フォルダ管理が初めて利用可能になる。
                        </p>
                        <div className="subsection">
                            <h3>Organization ノード取得フロー</h3>
                            <Diagram
                                id="diag-org-node"
                                label="ドメイン取得から Organization ノード生成までのフロー"
                            />
                        </div>
                        <div className="subsection">
                            <h3>個人 Gmail vs Cloud Identity vs Google Workspace</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">個人 Gmail (@gmail.com)</th>
                                            <th scope="col">Cloud Identity Free</th>
                                            <th scope="col">Google Workspace</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Organization ノード</td>
                                            <td>❌ 取得不可</td>
                                            <td>✅ 自動作成</td>
                                            <td>✅ 自動作成</td>
                                        </tr>
                                        <tr>
                                            <td>フォルダ管理</td>
                                            <td>❌ 使用不可</td>
                                            <td>✅ 使用可能</td>
                                            <td>✅ 使用可能</td>
                                        </tr>
                                        <tr>
                                            <td>組織ポリシー</td>
                                            <td>❌ 使用不可</td>
                                            <td>✅ 使用可能</td>
                                            <td>✅ 使用可能</td>
                                        </tr>
                                        <tr>
                                            <td>Shared VPC</td>
                                            <td>❌ 制限あり</td>
                                            <td>✅ 利用可能</td>
                                            <td>✅ 利用可能</td>
                                        </tr>
                                        <tr>
                                            <td>Gmail / Drive</td>
                                            <td>✅ あり</td>
                                            <td>❌ なし</td>
                                            <td>✅ あり</td>
                                        </tr>
                                        <tr>
                                            <td>コスト</td>
                                            <td>無料</td>
                                            <td>
                                                <span className="tag tag-green">無料</span>
                                            </td>
                                            <td>有料</td>
                                        </tr>
                                        <tr>
                                            <td>本番推奨</td>
                                            <td>
                                                <span className="tag tag-red">非推奨</span>
                                            </td>
                                            <td>
                                                <span className="tag tag-green">推奨</span>
                                            </td>
                                            <td>
                                                <span className="tag tag-green">推奨</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>Organization 設定後の初期タスク</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># 組織 ID の確認</span>
gcloud organizations list

<span class="c"># 組織レベルの IAM ポリシー確認</span>
gcloud organizations get-iam-policy ORG_ID

<span class="c"># Organization Admin ロールを付与</span>
gcloud organizations add-iam-policy-binding ORG_ID \\
  --member="user:admin@example.com" \\
  --role="roles/resourcemanager.organizationAdmin"

<span class="c"># フォルダの作成（組織直下）</span>
gcloud resource-manager folders create \\
  --display-name="Production" \\
  --organization=ORG_ID`}
                            />
                        </div>
                        <div className="callout callout-success">
                            <div className="callout-icon">💡</div>
                            <div>
                                <strong>Cloud Identity Free で十分:</strong> Google Workspace
                                のメール・ドライブ機能が不要な場合でも、
                                <strong>Cloud Identity Free</strong> を取得するだけで Organization
                                ノード・組織ポリシー・フォルダ管理のすべてが利用できる。追加コストゼロで企業レベルのガバナンスを実現できる。
                            </div>
                        </div>
                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        個人用 Gmail (@gmail.com) での本番環境構築は避ける
                                    </div>
                                    <div className="bp-desc">
                                        Organization
                                        ノードが取得できず、組織ポリシー・フォルダ管理・Shared VPC
                                        が利用できない。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Cloud Identity Free でコストゼロで Organization を取得
                                    </div>
                                    <div className="bp-desc">
                                        メール機能不要でも Cloud Identity Free を使えば Organization
                                        ノードが取得できる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Organization Admin は最小人数に限定し Break-Glass
                                        アカウントを設定
                                    </div>
                                    <div className="bp-desc">
                                        組織全体に影響を与える強力なロールのため、緊急用アカウントを含む最小構成にする。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://cloud.google.com/identity/docs/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Cloud Identity Overview
                            </a>
                            <a
                                href="https://cloud.google.com/resource-manager/docs/creating-managing-organization"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Creating and Managing Organizations
                            </a>
                        </div>
                    </div>

                    {/* 1.1.9 Networking */}
                    <div className="section-block" id="s119">
                        <div className="section-heading">
                            <div className="section-num">1.1.9</div>
                            <div>
                                <h2>クラウドネットワーキングの設定</h2>
                                <div className="section-meta">
                                    VPC / Subnet / Firewall / Cloud NAT / IAP — 初期ネットワーク設計
                                </div>
                            </div>
                        </div>
                        <p style={leadStyle}>
                            Section 1 のネットワーキングでは VPC
                            の初期セットアップとセキュアなアクセス設計が問われる。Google Cloud VPC は
                            1 つの VPC
                            がグローバルに広がり、すべてのリージョンにまたがるサブネットを配置できる点が他社クラウドとの大きな違い。
                        </p>
                        <div className="subsection">
                            <h3>デフォルト VPC vs カスタム VPC</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">デフォルト VPC</th>
                                            <th scope="col">カスタム VPC（推奨）</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>自動作成</td>
                                            <td>✅ 各リージョンに自動</td>
                                            <td>❌ 手動で設計・作成</td>
                                        </tr>
                                        <tr>
                                            <td>サブネット IP 範囲</td>
                                            <td>固定（10.128.0.0/9）</td>
                                            <td>自由に設計</td>
                                        </tr>
                                        <tr>
                                            <td>VPC Peering</td>
                                            <td>❌ IP 重複で制限</td>
                                            <td>✅ 計画的な IP 設計で対応</td>
                                        </tr>
                                        <tr>
                                            <td>Shared VPC</td>
                                            <td>❌ 非推奨</td>
                                            <td>✅ 対応</td>
                                        </tr>
                                        <tr>
                                            <td>本番環境での推奨</td>
                                            <td>
                                                <span className="tag tag-red">非推奨</span>
                                            </td>
                                            <td>
                                                <span className="tag tag-green">推奨</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>セキュアなネットワーク初期設計フロー</h3>
                            <Diagram
                                id="diag-network-design"
                                label="カスタム VPC からファイアウォール・Cloud NAT・IAP までの初期設計フロー"
                            />
                        </div>
                        <div className="subsection">
                            <h3>gcloud コマンド</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># デフォルト VPC の削除（本番環境では推奨）</span>
gcloud compute networks delete default --project=PROJECT_ID

<span class="c"># カスタムモード VPC の作成</span>
gcloud compute networks create my-vpc \\
  --subnet-mode=custom \\
  --project=PROJECT_ID

<span class="c"># サブネットの作成</span>
gcloud compute networks subnets create web-subnet \\
  --network=my-vpc \\
  --region=asia-northeast1 \\
  --range=10.1.1.0/24 \\
  --project=PROJECT_ID

<span class="c"># IAP からの SSH のみ許可するファイアウォールルール</span>
gcloud compute firewall-rules create allow-ssh-iap \\
  --network=my-vpc \\
  --direction=INGRESS \\
  --action=ALLOW \\
  --rules=tcp:22 \\
  --source-ranges=35.235.240.0/20 \\
  --target-tags=iap-ssh \\
  --project=PROJECT_ID

<span class="c"># Cloud Router の作成（Cloud NAT の前提条件）</span>
gcloud compute routers create my-router \\
  --network=my-vpc \\
  --region=asia-northeast1

<span class="c"># Cloud NAT の作成（外部 IP なし VM のアウトバウンドを確保）</span>
gcloud compute routers nats create my-nat \\
  --router=my-router \\
  --region=asia-northeast1 \\
  --nat-all-subnet-ip-ranges \\
  --auto-allocate-nat-external-ips

<span class="c"># IAP トンネル経由で VM に SSH（外部 IP 不要）</span>
gcloud compute ssh VM_NAME \\
  --zone=asia-northeast1-a \\
  --tunnel-through-iap`}
                            />
                        </div>
                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        デフォルト VPC を削除しカスタムモード VPC を使用
                                    </div>
                                    <div className="bp-desc">
                                        IP 範囲の計画的な管理と VPC Peering / Shared VPC
                                        対応のために必須。将来の拡張を見越した IP 設計が重要。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        VM に外部 IP を付与せず Cloud NAT でアウトバウンドを確保
                                    </div>
                                    <div className="bp-desc">
                                        外部 IP を持たない VM
                                        はインターネットから直接アクセスできないため、攻撃面を大幅に削減できる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        SSH アクセスは IAP トンネルのみに制限
                                    </div>
                                    <div className="bp-desc">
                                        IAP の IP レンジ（35.235.240.0/20）からのみ SSH
                                        を許可し、ブルートフォース攻撃を完全に遮断する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">4</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        ファイアウォールルールはネットワークタグベースで設定
                                    </div>
                                    <div className="bp-desc">
                                        IP ではなくタグで対象を指定することで、VM
                                        スケールアウト時も自動適用され管理コストを削減できる。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/vpc/docs/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ VPC Network Overview
                            </a>
                            <a
                                href="https://docs.cloud.google.com/architecture/best-practices-vpc-design"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ VPC Design Best Practices
                            </a>
                            <a
                                href="https://cloud.google.com/blog/topics/developers-practitioners/cloud-nat-explained"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Cloud NAT Explained — Google Cloud Blog
                            </a>
                            <a
                                href="https://cloud.google.com/iap/docs/concepts-overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Identity-Aware Proxy Overview
                            </a>
                        </div>
                    </div>

                    {/* 1.1.10 Geographic Availability */}
                    <div className="section-block" id="s1110">
                        <div className="section-heading">
                            <div className="section-num">1.1.10</div>
                            <div>
                                <h2>製品の地理的可用性の確認</h2>
                                <div className="section-meta">
                                    Regions & Zones — データ主権とレイテンシの両立
                                </div>
                            </div>
                        </div>
                        <Diagram
                            id="diag-geo-hierarchy"
                            label="グローバル / リージョン / ゾーンの階層関係"
                        />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">考慮事項</th>
                                        <th scope="col">詳細</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>データ主権</td>
                                        <td>
                                            特定国のデータを国外に出せない規制への対応（組織ポリシー{' '}
                                            <code>gcp.resourceLocations</code> と組み合わせる）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>レイテンシ</td>
                                        <td>
                                            エンドユーザーに近いリージョンを選択することで応答速度を最適化
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>可用性</td>
                                        <td>
                                            複数ゾーンへの分散でゾーン障害に備える（リージョナル
                                            MIG・リージョナル PD）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>サービス対応</td>
                                        <td>
                                            一部サービスはリージョンによって提供されない場合がある。事前に確認が必要。
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock
                            lang="bash"
                            html={`<span class="c"># 利用可能なリージョン一覧</span>
gcloud compute regions list

<span class="c"># 特定リージョンのゾーン一覧</span>
gcloud compute zones list --filter="region:asia-northeast1"`}
                        />
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://cloud.google.com/about/locations"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Google Cloud Locations — 製品の地理的可用性
                            </a>
                        </div>
                    </div>

                    {/* 1.1.11 Cloud Asset Inventory & Gemini */}
                    <div className="section-block" id="s1111">
                        <div className="section-heading">
                            <div className="section-num">1.1.11</div>
                            <div>
                                <h2>Cloud Asset Inventory & Gemini Cloud Assist</h2>
                                <div className="section-meta">新試験範囲 — AI駆動の環境管理・分析</div>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>Cloud Asset Inventory</h3>
                            <p style={{ ...leadStyle, marginBottom: 16 }}>
                                組織全体の Google Cloud リソースと IAM
                                ポリシーを一元管理・分析・エクスポートするサービス。
                            </p>
                            <Diagram
                                id="diag-asset-inventory"
                                label="Cloud Asset Inventory の主要機能"
                            />
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># Cloud Asset Inventory API を有効化</span>
gcloud services enable cloudasset.googleapis.com

<span class="c"># 組織全体の GKE クラスタを検索</span>
gcloud asset search-all-resources   --asset-types='container.googleapis.com/Cluster'   --scope='organizations/ORG_ID'

<span class="c"># 外部 IP を持つ VM を特定（セキュリティ監査）</span>
gcloud asset search-all-resources   --asset-types='compute.googleapis.com/Instance'   --scope='organizations/ORG_ID'   --query='networkInterfaces.accessConfigs.natIP:*'

<span class="c"># 特定リソースへのアクセス権を持つ全 Identity を分析</span>
gcloud asset analyze-iam-policy   --organization=ORG_ID   --full-resource-name='//storage.googleapis.com/projects/_/buckets/my-bucket'`}
                            />
                        </div>

                        <div className="subsection">
                            <h3>Gemini Cloud Assist の設定と活用</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">機能</th>
                                            <th scope="col">説明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>リソース分析</td>
                                            <td>自然言語でクラウドリソースを質問・分析</td>
                                        </tr>
                                        <tr>
                                            <td>アーキテクチャ提案</td>
                                            <td>
                                                ベストプラクティスに基づく構成提案と Terraform 生成
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>根本原因分析（RCA）</td>
                                            <td>
                                                ログ・メトリクス・設定変更を横断的に分析して障害原因を特定
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>コスト最適化提案</td>
                                            <td>無駄なリソースの特定と削減提案（FinOps Hub 連携）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># Gemini Cloud Assist API を有効化</span>
gcloud services enable geminicloudassist.googleapis.com   --project=PROJECT_ID

<span class="c"># Gemini Cloud Assist ユーザーロールを付与</span>
gcloud projects add-iam-policy-binding PROJECT_ID   --member="user:alice@example.com"   --role="roles/geminicloudassist.user"

<span class="c"># Cloud Asset Viewer も必要（リソース分析機能のため）</span>
gcloud projects add-iam-policy-binding PROJECT_ID   --member="user:alice@example.com"   --role="roles/cloudasset.viewer"`}
                            />
                        </div>

                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Cloud Asset Inventory のリアルタイムフィードを設定
                                    </div>
                                    <div className="bp-desc">
                                        リソース設定変更を即時検知でき、不正なリソース作成や IAM
                                        変更を早期に発見できる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        analyze-iam-policy で定期的な権限棚卸しを実施
                                    </div>
                                    <div className="bp-desc">
                                        過剰な権限を持つ Principal
                                        を特定し、最小特権の原則を継続的に維持する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Gemini Cloud Assist に cloudasset.viewer を付与
                                    </div>
                                    <div className="bp-desc">
                                        リソース分析機能が正常に動作するために必要。roles/geminicloudassist.user
                                        だけでは不十分。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://cloud.google.com/asset-inventory/docs/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Cloud Asset Inventory Overview
                            </a>
                            <a
                                href="https://cloud.google.com/products/gemini/cloud-assist"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Gemini Cloud Assist
                            </a>
                            <a
                                href="https://docs.cloud.google.com/cloud-assist/set-up-gemini"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Gemini Cloud Assist 設定ガイド
                            </a>
                            <a
                                href="https://docs.cloud.google.com/cloud-assist/iam-requirements"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Gemini Cloud Assist IAM 要件
                            </a>
                            <a
                                href="https://cloud.google.com/blog/products/management-tools/gemini-cloud-assist-investigations-performs-root-cause-analysis"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Gemini Cloud Assist: Root Cause Analysis — Google Cloud Blog
                            </a>
                        </div>
                    </div>

                    {/* 1.1.12 Workforce Identity Federation */}
                    <div className="section-block" id="s1112">
                        <div className="section-heading">
                            <div className="section-num">1.1.12</div>
                            <div>
                                <h2>Workforce Identity Federationの設定</h2>
                                <div className="section-meta">
                                    外部 IdP ユーザーの Google Cloud アクセス — 新試験範囲
                                </div>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>Workload Identity Federation との違い</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">Workforce Identity Federation</th>
                                            <th scope="col">Workload Identity Federation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>対象</td>
                                            <td>人間ユーザー（従業員・パートナー）</td>
                                            <td>アプリケーション・CI/CD・外部クラウド</td>
                                        </tr>
                                        <tr>
                                            <td>設定レベル</td>
                                            <td>
                                                <strong>組織（Organization）レベル</strong>
                                            </td>
                                            <td>プロジェクト（Project）レベル</td>
                                        </tr>
                                        <tr>
                                            <td>用途</td>
                                            <td>コンソールアクセス・gcloud CLI</td>
                                            <td>API アクセス（SA キー不要）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>設定フロー</h3>
                            <Diagram
                                id="diag-workforce-federation"
                                label="外部 IdP から Workforce Identity Pool を経由したアクセス設定フロー"
                            />
                        </div>
                        <div className="subsection">
                            <h3>gcloud コマンド</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># 1. Workforce Identity Pool の作成（組織レベル）</span>
gcloud iam workforce-pools create my-workforce-pool   --organization=ORG_ID   --location=global   --display-name="Corporate IdP Pool"

<span class="c"># 2. OIDC プロバイダーの登録（Okta の例）</span>
gcloud iam workforce-pools providers create-oidc okta-provider   --workforce-pool=my-workforce-pool   --location=global   --display-name="Okta OIDC"   --issuer-uri="https://myorg.okta.com/oauth2/default"   --client-id="MY_CLIENT_ID"   --attribute-mapping="google.subject=assertion.sub,google.groups=assertion.groups,attribute.department=assertion.department"

<span class="c"># 3. 外部ユーザーグループに IAM ロールを付与</span>
gcloud projects add-iam-policy-binding PROJECT_ID   --member="principalSet://iam.googleapis.com/locations/global/workforcePools/my-workforce-pool/attribute.department/engineering"   --role="roles/viewer"`}
                            />
                        </div>
                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        属性マッピングでグループ情報を取得しグループ単位で IAM 管理
                                    </div>
                                    <div className="bp-desc">
                                        個人ごとの IAM 設定を排除し、IdP 側のグループ管理と Google
                                        Cloud の権限管理を連携させる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">SAML より OIDC を優先する</div>
                                    <div className="bp-desc">
                                        標準準拠・JWT
                                        活用でセキュリティと互換性が高い。ほとんどのモダン IdP が
                                        OIDC をサポートしている。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        attribute-condition で信頼する IdP の範囲を限定
                                    </div>
                                    <div className="bp-desc">
                                        不正なトークンでのアクセスを防止し、フィッシング攻撃への耐性を高める。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/iam/docs/workforce-identity-federation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Workforce Identity Federation Overview
                            </a>
                        </div>
                    </div>

                    {/* 1.2.1 Billing Account */}
                    <div className="section-block" id="s121">
                        <div className="section-heading">
                            <div className="section-num">1.2.1</div>
                            <div>
                                <h2>請求アカウントの作成</h2>
                                <div className="section-meta">Billing Account — 請求の基本構造</div>
                            </div>
                        </div>
                        <Diagram
                            id="diag-billing-structure"
                            label="支払いプロファイル・請求先アカウント・プロジェクトの関係"
                        />
                        <div className="callout callout-info">
                            <div className="callout-icon">ℹ️</div>
                            <div>
                                <strong>重要:</strong> 1 つのプロジェクトは
                                <strong>正確に 1 つの請求先アカウント</strong>にリンクされる。1
                                つの請求先アカウントには複数のプロジェクトをリンクできる。
                            </div>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ロール</th>
                                        <th scope="col">権限</th>
                                        <th scope="col">付与対象例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>roles/billing.admin</code>
                                        </td>
                                        <td>請求アカウントの完全管理</td>
                                        <td>財務部門の管理者</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>roles/billing.viewer</code>
                                        </td>
                                        <td>請求情報の閲覧のみ</td>
                                        <td>一般担当者</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>roles/billing.projectManager</code>
                                        </td>
                                        <td>プロジェクトのリンク・アンリンク</td>
                                        <td>プロジェクト管理者</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>roles/billing.costsManager</code>
                                        </td>
                                        <td>予算とアラートの管理</td>
                                        <td>FinOps 担当者</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/billing/docs/concepts"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Cloud Billing Overview
                            </a>
                        </div>
                    </div>

                    {/* 1.2.2 Project Link */}
                    <div className="section-block" id="s122">
                        <div className="section-heading">
                            <div className="section-num">1.2.2</div>
                            <div>
                                <h2>プロジェクトと請求アカウントのリンク</h2>
                                <div className="section-meta">Project Billing Link — 1:1の関係</div>
                            </div>
                        </div>
                        <CodeBlock
                            lang="bash"
                            html={`<span class="c"># プロジェクトを請求先アカウントにリンク</span>
gcloud billing projects link PROJECT_ID   --billing-account=BILLING_ACCOUNT_ID

<span class="c"># プロジェクトの請求先アカウントを確認</span>
gcloud billing projects describe PROJECT_ID

<span class="c"># 請求先アカウントにリンクされているプロジェクト一覧</span>
gcloud billing projects list   --billing-account=BILLING_ACCOUNT_ID`}
                        />
                        <div className="callout callout-danger">
                            <div className="callout-icon">⛔</div>
                            <div>
                                <strong>警告:</strong>{' '}
                                請求先アカウントのリンクを解除すると、プロジェクト内の
                                <strong>すべてのリソースが停止</strong>
                                する。本番環境では絶対に注意すること。
                            </div>
                        </div>
                    </div>

                    {/* 1.2.3 Budget & Alerts */}
                    <div className="section-block" id="s123">
                        <div className="section-heading">
                            <div className="section-num">1.2.3</div>
                            <div>
                                <h2>予算とアラートの設定</h2>
                                <div className="section-meta">
                                    Budget & Alerts — 試験最重要トピック
                                </div>
                            </div>
                        </div>

                        <div className="exam-trap">
                            <div className="exam-trap-header">⛔ 試験最頻出トラップ</div>
                            <p>
                                Google Cloud は予算の上限に達しても
                                <strong>リソースを自動停止しません。</strong>
                                通知が来るだけです。自動停止を実現するには{' '}
                                <strong>Pub/Sub + Cloud Functions</strong>{' '}
                                のアーキテクチャが必要です。
                            </p>
                        </div>

                        <div className="subsection">
                            <h3>自動コスト制御アーキテクチャ</h3>
                            <Diagram
                                id="diag-cost-control"
                                label="予算アラートから Pub/Sub・Cloud Functions 経由で VM を停止する自動コスト制御フロー"
                            />
                        </div>

                        <div className="subsection">
                            <h3>gcloud コマンド</h3>
                            <CodeBlock
                                lang="bash"
                                html={`<span class="c"># 予算の作成（3段階のアラート閾値）</span>
gcloud billing budgets create   --billing-account=BILLING_ACCOUNT_ID   --display-name="Monthly Prod Budget"   --budget-amount=100000JPY   --threshold-rule=percent=50   --threshold-rule=percent=90   --threshold-rule=percent=100   --filter-projects=projects/my-prod-project

<span class="c"># 予算一覧の確認</span>
gcloud billing budgets list   --billing-account=BILLING_ACCOUNT_ID`}
                            />
                        </div>

                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        すべてのプロジェクトに予算アラートを設定
                                    </div>
                                    <div className="bp-desc">
                                        予期せぬ課金の早期発見のために必須。プロジェクト作成直後に設定する習慣をつける。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        50% / 90% / 100% の3段階でアラートを設定
                                    </div>
                                    <div className="bp-desc">
                                        段階的な把握と対応が可能。100% 閾値には Pub/Sub
                                        通知も設定して自動制御を実現する。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        予算金額は前月支出の 120% などで設定
                                    </div>
                                    <div className="bp-desc">
                                        異常なコスト増（認証情報漏洩・DDoS など）を早期検知できる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">4</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Cloud Armor と MIG スケーリング上限を設定
                                    </div>
                                    <div className="bp-desc">
                                        DDoS
                                        攻撃によるオートスケール過多でコストが急増するリスクを防止する。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/billing/docs/how-to/budgets"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Create and Manage Budgets and Budget Alerts
                            </a>
                            <a
                                href="https://medium.com/qodea/budget-alerts-caps-in-google-cloud-76ff71929b42"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Budget Alerts & Caps in Google Cloud — Medium
                            </a>
                        </div>
                    </div>

                    {/* 1.2.4 Billing Export */}
                    <div className="section-block" id="s124">
                        <div className="section-heading">
                            <div className="section-num">1.2.4</div>
                            <div>
                                <h2>請求エクスポートの設定</h2>
                                <div className="section-meta">
                                    Billing Export to BigQuery — 長期分析・監査の基盤
                                </div>
                            </div>
                        </div>

                        <Diagram
                            id="diag-billing-export"
                            label="Cloud Billing から BigQuery エクスポート・分析・可視化までのフロー"
                        />

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">エクスポート種別</th>
                                        <th scope="col">内容</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>標準使用コストデータ</td>
                                        <td>日次の基本的なコスト・使用量</td>
                                        <td>日常のコスト分析</td>
                                    </tr>
                                    <tr>
                                        <td>詳細使用コストデータ</td>
                                        <td>VM・SSD などリソース単位の詳細コスト</td>
                                        <td>細粒度のコスト分配・FinOps</td>
                                    </tr>
                                    <tr>
                                        <td>料金データ</td>
                                        <td>SKU ごとの公開料金表</td>
                                        <td>コスト見積もり・予測</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="subsection">
                            <h3>BigQuery コスト分析クエリ例</h3>
                            <CodeBlock
                                lang="sql"
                                html={`<span class="c">-- プロジェクト別の月次コストを集計</span>
SELECT
  project.id AS project_id,
  FORMAT_DATE('%Y-%m', DATE(usage_start_time)) AS month,
  SUM(cost) AS total_cost,
  currency
FROM
  \`my_project.billing_export.gcp_billing_export_v1_XXXXXXXX\`
WHERE
  DATE(usage_start_time) >= DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH)
GROUP BY
  project_id, month, currency
ORDER BY
  month DESC, total_cost DESC;

<span class="c">-- チーム別ラベルによるコスト分析</span>
SELECT
  labels.value AS team,
  SUM(cost) AS total_cost
FROM
  \`billing_export.gcp_billing_export_v1_XXXXXXXX\`,
  UNNEST(labels) AS labels
WHERE
  labels.key = 'team'
  AND DATE(usage_start_time) >= DATE_TRUNC(CURRENT_DATE(), MONTH)
GROUP BY team
ORDER BY total_cost DESC;`}
                            />
                        </div>

                        <div className="bp-list">
                            <div className="bp-header">✅ ベストプラクティス</div>
                            <div className="bp-item">
                                <div className="bp-num">1</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        プロジェクト作成直後に BigQuery エクスポートを有効化
                                    </div>
                                    <div className="bp-desc">
                                        過去データは遡って取得できないため、作成直後の設定が必須。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">2</div>
                                <div className="bp-content">
                                    <div className="bp-title">標準と詳細の両エクスポートを有効化</div>
                                    <div className="bp-desc">
                                        リソースレベルの精緻な分析が可能になり、コスト分配が正確になる。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">3</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        すべてのリソースにラベルを付けるポリシーを策定
                                    </div>
                                    <div className="bp-desc">
                                        チーム・環境・コストセンター別の分析が可能になる。組織ポリシーでラベル付けを強制することも検討。
                                    </div>
                                </div>
                            </div>
                            <div className="bp-item">
                                <div className="bp-num">4</div>
                                <div className="bp-content">
                                    <div className="bp-title">
                                        Looker Studio でコストダッシュボードを構築
                                    </div>
                                    <div className="bp-desc">
                                        ステークホルダーへの費用対効果の可視性を提供し、FinOps
                                        文化を醸成する。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sources">
                            <div className="sources-title">📎 公式ドキュメント</div>
                            <a
                                href="https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Export Cloud Billing data to BigQuery
                            </a>
                            <a
                                href="https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-setup"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ BigQuery Export Setup Guide
                            </a>
                            <a
                                href="https://amnic.com/blogs/google-cloud-billing-reports"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▸ Google Cloud Billing Reports — Amnic
                            </a>
                        </div>
                    </div>

                    {/* EXAM PATTERNS */}
                    <div className="section-block" id="exam-patterns">
                        <div className="section-heading">
                            <div className="section-num">📝</div>
                            <div>
                                <h2>試験頻出パターンと対策</h2>
                                <div className="section-meta">
                                    典型的な問題パターンと正解への思考プロセス
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginBottom: 20 }}>
                            <div className="card-title">パターン① リソース階層の設計問題</div>
                            <div className="card-desc" style={{ marginBottom: 12 }}>
                                「A 社は開発部・営業部・財務部の3部門を持ち、各部門が dev・prod
                                環境を持つ。最適な階層は？」
                            </div>
                            <div className="callout callout-success" style={{ margin: 0 }}>
                                <div className="callout-icon">✅</div>
                                <div>
                                    Organization → 部門フォルダ（3つ）→ 環境別プロジェクト（各部門に
                                    dev/prod の2つ）→
                                    リソース。共通ポリシーは部門フォルダに付与して継承させる。
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginBottom: 20 }}>
                            <div className="card-title">パターン② 予算・自動コスト制御問題</div>
                            <div className="card-desc" style={{ marginBottom: 12 }}>
                                「予算超過時に VM を自動停止したい。どのアーキテクチャが正しいか？」
                            </div>
                            <div className="callout callout-danger" style={{ margin: '8px 0' }}>
                                <div className="callout-icon">❌</div>
                                <div>
                                    <strong>不正解:</strong>
                                    「予算に上限金額を設定すれば自動停止される」→
                                    予算上限ではリソースは止まらない！
                                </div>
                            </div>
                            <div className="callout callout-success" style={{ margin: 0 }}>
                                <div className="callout-icon">✅</div>
                                <div>
                                    <strong>正解:</strong> 予算アラート（100% 閾値）→ Pub/Sub トピック
                                    → Cloud Functions → Compute Engine API で VM 停止
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginBottom: 20 }}>
                            <div className="card-title">パターン③ 組織ポリシーと IAM の使い分け問題</div>
                            <div className="card-desc" style={{ marginBottom: 12 }}>
                                「本番環境のVMで外部IPを持つものを作成できないよう強制したい。どうするか？」
                            </div>
                            <div className="callout callout-success" style={{ margin: 0 }}>
                                <div className="callout-icon">✅</div>
                                <div>
                                    <strong>正解:</strong> <strong>組織ポリシー</strong>{' '}
                                    <code>constraints/compute.disableExternalIpAddresses</code>{' '}
                                    を本番環境フォルダに適用。IAM
                                    では「誰が作れるか」、組織ポリシーでは「どんな VM
                                    を作れるか」を制御する。管理者でも制約を受ける点が IAM
                                    との本質的な違い。
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-title">パターン④ 最小権限のロール選択問題</div>
                            <div className="card-desc" style={{ marginBottom: 12 }}>
                                「すべてのプロジェクトの Cloud Storage を管理する Jane
                                に必要な最小権限は？」
                            </div>
                            <div className="callout callout-danger" style={{ margin: '8px 0' }}>
                                <div className="callout-icon">❌</div>
                                <div>
                                    <strong>不正解:</strong> Jane に <code>roles/editor</code> を付与
                                    → 過剰権限（GCEやGKEも操作できてしまう）
                                </div>
                            </div>
                            <div className="callout callout-success" style={{ margin: 0 }}>
                                <div className="callout-icon">✅</div>
                                <div>
                                    <strong>正解:</strong> Jane をグループに追加し、そのグループに{' '}
                                    <code>roles/storage.objectAdmin</code>
                                    を組織/フォルダレベルで付与。個人への直接付与ではなくグループを使うことで管理効率も向上。
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CHECKLIST */}
                    <div className="section-block" id="checklist">
                        <div className="section-heading">
                            <div className="section-num">✓</div>
                            <div>
                                <h2>Section 1 試験直前チェックリスト</h2>
                                <div className="section-meta">クリックしてチェックできます</div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>1.1 クラウドプロジェクトとアカウントの設定</h3>
                            <div className="checklist">
                                <CheckItem>
                                    Organization → Folder → Project → Resource
                                    の順序と役割を説明できる
                                </CheckItem>
                                <CheckItem>
                                    IAM
                                    ポリシーが上位から下位へ自動継承され、下位で上位の許可を取り消せないことを知っている
                                </CheckItem>
                                <CheckItem>
                                    Project ID はグローバルに一意で変更不可だと知っている
                                </CheckItem>
                                <CheckItem>
                                    削除したプロジェクトは 30日以内なら復元できることを知っている
                                </CheckItem>
                                <CheckItem>
                                    組織ポリシーと IAM の違い（設定の強制 vs
                                    アクセス制御）を説明できる
                                </CheckItem>
                                <CheckItem>
                                    constraints/iam.disableServiceAccountKeyCreation
                                    の効果を説明できる
                                </CheckItem>
                                <CheckItem>
                                    基本ロール（Editor/Owner）を本番で使うべきでない理由を説明できる
                                </CheckItem>
                                <CheckItem>
                                    個人ではなくグループにロールを付与する理由を説明できる
                                </CheckItem>
                                <CheckItem>
                                    Cloud Identity (Free) と Google Workspace の違いを説明できる
                                </CheckItem>
                                <CheckItem>
                                    新規プロジェクトでは API
                                    を個別に有効化する必要があることを知っている
                                </CheckItem>
                                <CheckItem>
                                    VM のメモリ使用量には Ops Agent
                                    が必要（デフォルトでは取得不可）だと知っている
                                </CheckItem>
                                <CheckItem>
                                    Cloud Asset Inventory
                                    で組織全体のリソースを一元検索できることを知っている
                                </CheckItem>
                                <CheckItem>
                                    Workforce Identity Federation と Workload Identity Federation
                                    の違いを説明できる
                                </CheckItem>
                                <CheckItem>
                                    Workforce Identity Pool は組織レベルで作成することを知っている
                                </CheckItem>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>1.2 請求設定の管理</h3>
                            <div className="checklist">
                                <CheckItem>
                                    1 プロジェクトは正確に 1
                                    つの請求先アカウントにリンクされることを知っている
                                </CheckItem>
                                <CheckItem>
                                    予算アラートが上限に達してもリソースは自動停止しないことを知っている（最重要）
                                </CheckItem>
                                <CheckItem>
                                    自動停止には Pub/Sub + Cloud Functions が必要なことを知っている
                                </CheckItem>
                                <CheckItem>
                                    BigQuery への Billing
                                    データエクスポートの目的と設定方法を知っている
                                </CheckItem>
                                <CheckItem>
                                    ラベルを使ったコストセンター別分析の方法を知っている
                                </CheckItem>
                                <CheckItem>
                                    DDoS → オートスケール → コスト急増のリスクと対策（Cloud
                                    Armor）を知っている
                                </CheckItem>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /content */}
            </div>
            {/* /main */}

            <button
                className={`scroll-top${scrolled ? ' visible' : ''}`}
                type="button"
                aria-label="ページトップへ戻る"
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
}
