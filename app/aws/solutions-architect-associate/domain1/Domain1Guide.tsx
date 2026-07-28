'use client';

import { useEffect, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-container">
            <div className="diagram-title">{label}</div>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

export function Domain1Guide() {
    const [activeId, setActiveId] = useState<string>('overview');
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0.1,
            }
        );

        const sections = document.querySelectorAll('.section-block, [id]');
        sections.forEach((section) => {
            if (section.id) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const copyCode = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="aws-saa-domain1-page">
            <div id="progress-bar" style={{ width: `${scrollProgress}%` }} />
            <div className="layout">
                <NavBar activeId={activeId} />

                <main className="main-content">
                    {/* Hero Header */}
                    <section className="hero-section" id="top">
                        <span className="domain-badge">AWS Certified Solutions Architect — Associate (SAA-C03)</span>
                        <h1 className="hero-title">ドメイン1: セキュアなアーキテクチャの設計 完全ガイド</h1>
                        <p className="hero-subtitle">
                            配点比率30%を占める最重要ドメイン。IAM・ネットワークセキュリティ・データ保護・ガバナンス・暗号化まで、試験に出る全てのセキュリティ概念とベストプラクティスを徹底解説。
                        </p>
                        <div className="meta-grid">
                            <div className="meta-item">
                                <div className="meta-label">配点割合</div>
                                <div className="meta-value">30% (試験最大)</div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-label">構成タスク</div>
                                <div className="meta-value">3つの主要タスク</div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-label">図解数</div>
                                <div className="meta-value">14個のMermaid図</div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-label">難易度・重要度</div>
                                <div className="meta-value">★★★★★ (最優先)</div>
                            </div>
                        </div>
                    </section>

                    {/* Section 1: Overview */}
                    <section className="section-block" id="overview">
                        <div className="section-header">
                            <span className="section-number">SECTION 01</span>
                            <h2>1. ドメイン1の全体像</h2>
                        </div>

                        <div id="overview-weight">
                            <h3>1.1 試験における位置づけ</h3>
                            <p>
                                SAA-C03試験において、ドメイン1「セキュアなアーキテクチャの設計」は全体の<b>30%</b>を占める最も配点比率が高いドメインです。
                                AWSでは「セキュリティは常に最優先事項（Job Zero）」とされており、他のすべての設計原則（回復力・パフォーマンス・コスト）の根幹をなします。
                            </p>
                            <Diagram id="d01" label="図 1.1: AWS SAA-C03 試験ドメイン別配点比率" />
                        </div>

                        <div id="overview-tasks">
                            <h3>1.2 3つのタスクの関係</h3>
                            <p>
                                ドメイン1は以下の3つのタスクで構成されています。これらは独立しているわけではなく、実際のアーキテクチャ設計では組み合わせて出題されます。
                            </p>

                            <div className="topic-card highlight">
                                <div className="card-title">ドメイン1を構成する3つのタスク</div>
                                <ul>
                                    <li><b>タスク 1.1: AWSリソースへの安全なアクセス設計</b> (IAM, Organizations, STS, Identity Center)</li>
                                    <li><b>タスク 1.2: 安全なワークロードとアプリケーションの設計</b> (VPC, SG/NACL, WAF/Shield, GuardDuty, Secrets Manager)</li>
                                    <li><b>タスク 1.3: 適切なデータセキュリティコントロールの決定</b> (KMS, ACM, S3暗号化, AWS Backup, ガバナンス)</li>
                                </ul>
                            </div>

                            <Diagram id="d02" label="図 1.2: ドメイン1のタスク構成とカバー範囲" />
                        </div>
                    </section>

                    {/* Section 2: Task 1.1 */}
                    <section className="section-block" id="task1">
                        <div className="section-header">
                            <span className="section-number">SECTION 02</span>
                            <h2>2. タスク1.1: AWSリソースへの安全なアクセス設計</h2>
                        </div>

                        <div id="t1-shared">
                            <h3>2.1 責任共有モデル（Shared Responsibility Model）</h3>
                            <p>
                                AWSセキュリティの基本思想は「責任共有モデル」です。AWSと顧客の責任境界を明確に理解することは、すべての問題の前提となります。
                            </p>

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>区分</th>
                                            <th>責任主体</th>
                                            <th>具体的な管理対象</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>Security OF the Cloud</b><br />(クラウド自体の安全)</td>
                                            <td>AWS</td>
                                            <td>データセンターの物理的セキュリティ、ハードウェア、ハイパーバイザ、物理ネットワーク、マネージドサービスの基盤施設</td>
                                        </tr>
                                        <tr>
                                            <td><b>Security IN the Cloud</b><br />(クラウド内の安全)</td>
                                            <td>顧客 (Customer)</td>
                                            <td>顧客データ、IAMアカウント・アクセス管理、OS/パッチ適用(EC2)、ネットワーク設定(SG/NACL)、暗号化設定</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t1-iam">
                            <h3>2.2 IAMの基本構成要素</h3>
                            <p>
                                AWS IAM (Identity and Access Management) は認証 (Authentication) と認可 (Authorization) を提供する中核サービスです。
                            </p>
                            <Diagram id="d03" label="図 2.1: IAMの基本構成要素とリソース関係" />

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>コンポーネント</th>
                                            <th>用途・特徴</th>
                                            <th>ベストプラクティス</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>ルートユーザー</b></td>
                                            <td>アカウント作成時に自動生成される最強権限を持つID。すべてのアクセスを制御可能。</td>
                                            <td>MFAを必ず有効化し、日常業務では絶対に使用しない。アクセスキーを削除・作成しない。</td>
                                        </tr>
                                        <tr>
                                            <td><b>IAMユーザー</b></td>
                                            <td>人がAWSに操作・ログインするための長期的なID（アクセスキー/パスワード）。</td>
                                            <td>直接ポリシーをアタッチせずグループに所属させる。可能な限りIAM Identity Centerへ移行。</td>
                                        </tr>
                                        <tr>
                                            <td><b>IAMグループ</b></td>
                                            <td>複数ユーザーの集合体。同一部署や同一役割のユーザーに一括で権限を付与。</td>
                                            <td>グループ単位でポリシーを管理。ネスト（グループの中にグループ）は不可。</td>
                                        </tr>
                                        <tr>
                                            <td><b>IAMロール</b></td>
                                            <td>EC2、Lambda、または別アカウントのユーザーに<b>一時的な認証情報</b>(STS)を付与する仕組み。</td>
                                            <td>プログラムやサービス間の操作にはアクセスキーの直書きを避け、必ずIAMロールを使用。</td>
                                        </tr>
                                        <tr>
                                            <td><b>IAMポリシー</b></td>
                                            <td>JSON形式で定義される「誰が」「何に対して」「どのような条件で」「操作できる/できない」を指定する文書。</td>
                                            <td>AWS管理ポリシーではなく、必要最小限のアクセスのみ許可するインライン/カスタマー管理ポリシーを原則とする。</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t1-least">
                            <h3>2.3 最小権限の原則とポリシー評価論理</h3>
                            <p>
                                IAM評価エンジンは、複数のポリシー（アイデンティティベース、リソースベース、SCP、アクセス許可境界）を統合して最終判断を行います。
                            </p>

                            <Diagram id="d04" label="図 2.2: IAMポリシー評価論理（Evaluation Logic）" />

                            <div className="topic-card warning">
                                <div className="card-title">ポリシー評価のゴールデンルール</div>
                                <ol>
                                    <li><b>デフォルトは拒否 (Implicit Deny)</b>: 明示的な許可がない限り、アクセスはすべて拒否される。</li>
                                    <li><b>明示的な拒否が絶対最優先 (Explicit Deny Beats Everything)</b>: どんなに他のポリシーで Allow されていても、1つでも明示的な Deny があれば即座に拒否となる。</li>
                                    <li><b>Allowが存在すれば許可 (Explicit Allow)</b>: Explicit Deny がなく、少なくとも1つの Explicit Allow があればアクセス許可。</li>
                                </ol>
                            </div>

                            <div className="code-block">
                                <div className="code-header">
                                    <span>JSON Policy Example (最小権限のS3操作)</span>
                                    <button
                                        className="copy-btn"
                                        onClick={() =>
                                            copyCode(
                                                `{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": [\n        "s3:GetObject",\n        "s3:PutObject"\n      ],\n      "Resource": "arn:aws:s3:::my-company-bucket/*",\n      "Condition": {\n        "Bool": {\n          "aws:SecureTransport": "true"\n        }\n      }\n    }\n  ]\n}`,
                                                1
                                            )
                                        }
                                    >
                                        {copiedIndex === 1 ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <pre>
                                    <div className="code-line"><span className="code-punctuation">{`{`}</span></div>
                                    <div className="code-line">  <span className="code-key">{`"Version"`}</span><span className="code-punctuation">:</span> <span className="code-string">{`"2012-10-17"`}</span><span className="code-punctuation">,</span></div>
                                    <div className="code-line">  <span className="code-key">{`"Statement"`}</span><span className="code-punctuation">: [</span></div>
                                    <div className="code-line">    <span className="code-punctuation">{`{`}</span></div>
                                    <div className="code-line">      <span className="code-key">{`"Effect"`}</span><span className="code-punctuation">:</span> <span className="code-string">{`"Allow"`}</span><span className="code-punctuation">,</span></div>
                                    <div className="code-line">      <span className="code-key">{`"Action"`}</span><span className="code-punctuation">: [</span></div>
                                    <div className="code-line">        <span className="code-string">{`"s3:GetObject"`}</span><span className="code-punctuation">,</span></div>
                                    <div className="code-line">        <span className="code-string">{`"s3:PutObject"`}</span></div>
                                    <div className="code-line">      <span className="code-punctuation">],</span></div>
                                    <div className="code-line">      <span className="code-key">{`"Resource"`}</span><span className="code-punctuation">:</span> <span className="code-string">{`"arn:aws:s3:::my-company-bucket/*"`}</span><span className="code-punctuation">,</span></div>
                                    <div className="code-line">      <span className="code-key">{`"Condition"`}</span><span className="code-punctuation">: {`{`}</span></div>
                                    <div className="code-line">        <span className="code-key">{`"Bool"`}</span><span className="code-punctuation">: {`{`}</span></div>
                                    <div className="code-line">          <span className="code-key">{`"aws:SecureTransport"`}</span><span className="code-punctuation">:</span> <span className="code-boolean">{`"true"`}</span></div>
                                    <div className="code-line">        <span className="code-punctuation">{`}`}</span></div>
                                    <div className="code-line">      <span className="code-punctuation">{`}`}</span></div>
                                    <div className="code-line">    <span className="code-punctuation">{`}`}</span></div>
                                    <div className="code-line">  <span className="code-punctuation">]</span></div>
                                    <div className="code-line"><span className="code-punctuation">{`}`}</span></div>
                                </pre>
                            </div>
                        </div>

                        <div id="t1-root">
                            <h3>2.4 ルートユーザーの保護</h3>
                            <p>試験で「ルートユーザーに関する適切な対応」が問われた場合は、以下の対策を選択します。</p>
                            <ul className="checklist">
                                <li>ルートユーザーのアクセスキー（Access Key ID / Secret Access Key）を作成・保持しない。既存のものは直ちに削除。</li>
                                <li>強力な複合パスワードを設定し、物理ハードウェアMFA（YubiKeyなど）または仮想MFAを即座に有効化。</li>
                                <li>日常のシステム運用・開発には絶対に使用せず、権限を委任したIAM Identity Centerユーザーを使用。</li>
                                <li>ルートユーザーのみ実行可能な操作（アカウント解約、支払い方法の変更、サポートプランの変更など）の際のみ厳重に使用。</li>
                            </ul>
                        </div>

                        <div id="t1-idc">
                            <h3>2.5 AWS IAM Identity Center (旧 AWS Single Sign-On) とフェデレーション</h3>
                            <p>
                                企業環境で複数のAWSアカウントや、既存のアイデンティティプロバイダー (IdP: Azure AD / Entra ID, Okta, Active Directory) を統合する標準サービスです。
                            </p>
                            <div className="topic-card highlight">
                                <div className="card-title">試験のポイント: Identity Center の役割</div>
                                <ul>
                                    <li><b>SAML 2.0 / OIDC 対応</b>: 既存の社内IdPのログイン情報を使ってAWSマネジメントコンソールやCLIへアクセス。</li>
                                    <li><b>許可セット (Permission Sets)</b>: 各アカウントで割り当てるIAMロールのテンプレートを一元定義。</li>
                                    <li><b>ユーザーの二重管理を防止</b>: IAMユーザーを各アカウントに個別に作成する必要がなくなる。</li>
                                </ul>
                            </div>
                        </div>

                        <div id="t1-sts">
                            <h3>2.6 AWS STS (Security Token Service) とクロスアカウントアクセス</h3>
                            <p>
                                AWS STS は<b>一時的なセキュリティ認証情報</b>（Access Key, Secret Key, Session Token）を発行するサービスです。有効期限は数分〜数時間です。
                            </p>
                            <Diagram id="d05" label="図 2.3: STS AssumeRole によるクロスアカウントアクセスの流れ" />

                            <div className="topic-card">
                                <div className="card-title">STS の代表的なユースケース</div>
                                <ul>
                                    <li><b>クロスアカウントアクセス</b>: Account A のユーザーが Account B のリソースを操作するときに `sts:AssumeRole` を実行。</li>
                                    <li><b>IDフェデレーション</b>: 社内Webシステムにログインしたユーザーに、STSで時限付きのS3アップロード権限を付与。</li>
                                    <li><b>EC2/Lambda上のアプリ操作</b>: IAMロールをアタッチされたインスタンスがメタデータサービス (IMDSv2) 経由でSTS認証情報を自動取得。</li>
                                </ul>
                            </div>
                        </div>

                        <div id="t1-org">
                            <h3>2.7 マルチアカウント戦略 (AWS Organizations / SCP / Control Tower)</h3>
                            <p>
                                エンタープライズ開発では、1つのAWSアカウントに全システムを同居させず、本番・開発・ログ保管・セキュリティ用などでアカウントを分割する<b>マルチアカウント戦略</b>をとります。
                            </p>
                            <Diagram id="d06" label="図 2.4: AWS Organizations の OU 構造と SCP の適用範囲" />

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>概念・サービス</th>
                                            <th>概要と試験対策上の重要点</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>AWS Organizations</b></td>
                                            <td>複数のAWSアカウントを一元管理・一括請求（Consolidated Billing）するサービス。組織単位（OU）を木構造で構成。</td>
                                        </tr>
                                        <tr>
                                            <td><b>SCP (Service Control Policy)</b></td>
                                            <td>OUやアカウント単位で<b>適用可能な最大権限のガードレール</b>を設定。管理アカウント以外のルートユーザー含むすべてのユーザーに強制適用。<br />※SCP自体は権限を「付与」しない（制限枠を作るのみ）。</td>
                                        </tr>
                                        <tr>
                                            <td><b>AWS Control Tower</b></td>
                                            <td>ベストプラクティスに基づいたマルチアカウント環境（ランディングゾーン）を数クリックで自動セットアップ・ガバナンス管理するサービス。</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t1-resource">
                            <h3>2.8 リソースベースポリシー vs アイデンティティベースポリシー</h3>
                            <p>アクセス制御には2種類のアプローチが存在し、相互の挙動差が頻出します。</p>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>項目</th>
                                            <th>アイデンティティベースポリシー</th>
                                            <th>リソースベースポリシー</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>アタッチ先</b></td>
                                            <td>IAM ユーザー、グループ、ロール</td>
                                            <td>S3バケット、SQSキュー、KMSキー、Lambda関数などリソース自体</td>
                                        </tr>
                                        <tr>
                                            <td><b>Principal 指定</b></td>
                                            <td>不要（自分が誰であるかは明確なため）</td>
                                            <td><b>必須</b>（{`"Principal": { "AWS": "arn:aws:iam::1234:root" }`}）</td>
                                        </tr>
                                        <tr>
                                            <td><b>同一アカウント内アクセス</b></td>
                                            <td>アイデンティティ側で Allow があればアクセス可能</td>
                                            <td>リソース側で Allow があれば、アイデンティティ側の Allow なしでアクセス可能</td>
                                        </tr>
                                        <tr>
                                            <td><b>クロスアカウントアクセス</b></td>
                                            <td>双方（送信元IAM側のAllow ＋ 送信先リソース側のAllow）が揃って初めてアクセス可能</td>
                                            <td>リソース側で明示的にアクセス元アカウントを Principal 許可する</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t1-bp">
                            <h3>2.9 タスク1.1 ベストプラクティスまとめ</h3>
                            <ul className="checklist">
                                <li>EC2/Lambda への権限付与には長期認証キー（アクセスキー）を使わず、必ず IAM ロールを付与する。</li>
                                <li>EC2 インスタンスメタデータサービスは IMDSv2 (Session-oriented) を強制し、SSRF 脆弱性による認証情報奪取を防ぐ。</li>
                                <li>S3 へのアクセスログやデータアクセス権限管理では S3 バケットポリシー ＋ IAM ポリシーの最小権限を徹底。</li>
                                <li>マルチアカウントの統制には AWS Organizations の SCP を使用し、特定リージョンの無効化や特定サービスの利用制限をかける。</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3: Task 1.2 */}
                    <section className="section-block" id="task2">
                        <div className="section-header">
                            <span className="section-number">SECTION 03</span>
                            <h2>3. タスク1.2: 安全なワークロードとアプリケーションの設計</h2>
                        </div>

                        <div id="t2-vpc">
                            <h3>3.1 VPC の基本ネットワークセキュリティ構成</h3>
                            <p>
                                VPC (Virtual Private Cloud) はAWS上の隔離された仮想ネットワーク空間です。安全なネットワーク層設計はセキュリティの基本です。
                            </p>
                            <Diagram id="d07" label="図 3.1: 3層Webアプリケーションの標準VPCセキュリティ構成" />
                        </div>

                        <div id="t2-sgnacl">
                            <h3>3.2 セキュリティグループ (SG) vs ネットワーク ACL (NACL)</h3>
                            <p>
                                セキュリティグループとネットワークACLの違いは、試験で最も高い頻度で問われる比較問題の一つです。
                            </p>

                            <Diagram id="d09" label="図 3.2: SG と NACL の使い分けフロー" />

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>比較項目</th>
                                            <th>セキュリティグループ (Security Group)</th>
                                            <th>ネットワーク ACL (Network ACL)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>保護対象単位</b></td>
                                            <td>ネットワークインターフェース (ENI) / インスタンス単位</td>
                                            <td><b>サブネット単位</b> (サブネット全体に一括適用)</td>
                                        </tr>
                                        <tr>
                                            <td><b>ステート管理</b></td>
                                            <td><b>ステートフル (Stateful)</b><br />インバウンドを許可すれば、戻りアウトバウンド通信は自動的に許可される。</td>
                                            <td><b>ステートレス (Stateless)</b><br />インバウンド通信の許可だけでなく、応答用の戻りアウトバウンド通信(エフェメラルポート)も明示的許可が必要。</td>
                                        </tr>
                                        <tr>
                                            <td><b>ルール評価順序</b></td>
                                            <td>すべてのルールを一度に評価 (優先順位なし)</td>
                                            <td><b>ルール番号の若い順 (小→大) に評価</b>。マッチした時点で評価終了。</td>
                                        </tr>
                                        <tr>
                                            <td><b>Deny (拒否) ルール</b></td>
                                            <td><b>サポートしない</b> (Allow のみ指定可能)</td>
                                            <td><b>Allow および Deny の両方をサポート</b> (特定IPアドレスのブロックに有効)</td>
                                        </tr>
                                        <tr>
                                            <td><b>主なユースケース</b></td>
                                            <td>Web/App/DBの層間アクセス制限、特定ポートの開放</td>
                                            <td>特定悪意IPからのアクセス遮断、サブネット全体の通信境界</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t2-defense">
                            <h3>3.3 多層防御 (Defense in Depth)</h3>
                            <p>
                                単一のセキュリティ機能に頼らず、インフラからアプリケーションまで多重の保護壁を構築する設計思想です。
                            </p>
                            <Diagram id="d08" label="図 3.3: AWSにおける多層防御アーキテクチャ" />
                        </div>

                        <div id="t2-waf">
                            <h3>3.4 AWS WAF vs AWS Shield</h3>
                            <p>Webアプリケーションを攻撃から守る主要サービスの役割分担です。</p>

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>サービス</th>
                                            <th>対応レイヤー</th>
                                            <th>防御対象・機能</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>AWS WAF</b></td>
                                            <td><b>レイヤー 7 (アプリケーション層)</b></td>
                                            <td>SQLインジェクション、クロスサイトスクリプティング (XSS)、レートベースのアクセス制限、特定国・IPフィルタリング。CloudFront, ALB, API Gateway に配置。</td>
                                        </tr>
                                        <tr>
                                            <td><b>AWS Shield Standard</b></td>
                                            <td><b>レイヤー 3 / 4 (ネットワーク/トランスポート層)</b></td>
                                            <td>SYNフラッド、UDPリフレクション攻撃などの標準DDoS対策。すべてのAWS顧客に自動適用（追加料金なし）。</td>
                                        </tr>
                                        <tr>
                                            <td><b>AWS Shield Advanced</b></td>
                                            <td><b>レイヤー 3 / 4 / 7 統合DDoS保護</b></td>
                                            <td>高度・大規模DDoS保護。24/7 DDoS Response Team (DRT) アクセス、DDoS発生時の料金保護、WAF自動適用。</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t2-services">
                            <h3>3.5 GuardDuty / Macie / Cognito による脅威検知・データ保護・認証</h3>
                            <div className="topic-card highlight">
                                <div className="card-title">必須サービス機能一覧</div>
                                <ul>
                                    <li>
                                        <b>Amazon GuardDuty</b>: VPC フローログ、CloudTrail ログ、DNS ログ、EKS / S3 ログを機械学習で常時分析する<b>インテリジェント脅威検出サービス</b>。エージェントレスで有効化可能。
                                    </li>
                                    <li>
                                        <b>Amazon Macie</b>: S3 バケット内のデータを機械学習でスキャンし、<b>個人識別情報 (PII: クレジットカード番号、マイナンバー、秘密鍵など) を自動検出・分類</b>するサービス。
                                    </li>
                                    <li>
                                        <b>Amazon Cognito</b>: Web/モバイルアプリ向けのユーザー登録・ログイン・認証管理機能（ユーザープール: ユーザーディレクトリ管理 / アイデンティティプール: AWSリソース用時限トークン発行）。
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div id="t2-secrets">
                            <h3>3.6 Secrets Manager vs Systems Manager Parameter Store</h3>
                            <p>データベース接続文字列やAPIキーなどの機密情報を安全に管理するための比較です。</p>
                            <Diagram id="d10" label="図 3.4: Secrets Manager による自動ローテーションの流れ" />

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>機能・項目</th>
                                            <th>AWS Secrets Manager</th>
                                            <th>Systems Manager Parameter Store (SSM)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>主目的</b></td>
                                            <td>パスワード、APIキー、DB認証情報の暗号化保持と自動ローテーション</td>
                                            <td>設定値、パラメータ、暗号化文字列のキーバリュー管理</td>
                                        </tr>
                                        <tr>
                                            <td><b>自動ローテーション</b></td>
                                            <td><b>組み込みサポート</b> (Lambdaと連動しRDSパスワード等を定期変更)</td>
                                            <td>標準機能としては非対応 (Lambda等自作が必要)</td>
                                        </tr>
                                        <tr>
                                            <td><b>料金</b></td>
                                            <td>シークレットごとに月額料金 ＋ APIリクエスト従量課金</td>
                                            <td>標準パラメータは<b>無料</b> (高度パラメータは有料)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t2-hybrid">
                            <h3>3.7 ハイブリッドネットワーク接続 (Site-to-Site VPN / Direct Connect)</h3>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>方式</th>
                                            <th>メリット</th>
                                            <th>デメリット・特徴</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>AWS Site-to-Site VPN</b></td>
                                            <td>即座に導入可能、低コスト、IPsec 暗号化通信</td>
                                            <td>パブリックインターネットを経由するため、帯域・遅延が不確実</td>
                                        </tr>
                                        <tr>
                                            <td><b>AWS Direct Connect (DX)</b></td>
                                            <td>専用線接続、高帯域・一貫した低遅延、通信コスト削減</td>
                                            <td>導入まで数週間〜数ヶ月、回線費用が高い。<b>※標準では暗号化されないため、IPsec VPN over DX で暗号化を付加。</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t2-bp">
                            <h3>3.8 タスク1.2 ベストプラクティスまとめ</h3>
                            <ul className="checklist">
                                <li>EC2 インスタンスは可能な限りプライベートサブネットに配置し、パブリック IP を付与しない。</li>
                                <li>SSH (Port 22) や RDP (Port 3389) を直接インターネットに開放せず、<b>AWS Systems Manager Session Manager</b> を使用してエージェント経由で安全にログインする。</li>
                                <li>Web アプリの前段には CloudFront + AWS WAF を配置し、不正なトラフィックをエッジでブロックする。</li>
                                <li>機密情報のハードコーディングを防止するため、Secrets Manager または Parameter Store 経由で動的に取得する。</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Task 1.3 */}
                    <section className="section-block" id="task3">
                        <div className="section-header">
                            <span className="section-number">SECTION 04</span>
                            <h2>4. タスク1.3: 適切なデータセキュリティコントロールの決定</h2>
                        </div>

                        <div id="t3-basics">
                            <h3>4.1 暗号化の基本 (保管時暗号化 vs 転送時暗号化)</h3>
                            <p>データをライフサイクルのすべてのフェーズで保護することが求められます。</p>
                            <ul>
                                <li><b>保管時暗号化 (Encryption at Rest)</b>: ディスクやS3に保存されているデータを暗号化 (KMS, SSE-S3, SSE-KMS, SSE-C)。</li>
                                <li><b>転送時暗号化 (Encryption in Transit)</b>: ネットワーク上を通るデータを暗号化 (TLS/HTTPS, IPsec VPN)。</li>
                            </ul>
                        </div>

                        <div id="t3-kms">
                            <h3>4.2 AWS KMS (Key Management Service) とエンベロープ暗号化</h3>
                            <p>
                                KMS は暗号化キーを作成・管理するマネージドサービスです。大容量データの暗号化には<b>エンベロープ暗号化</b>が採用されています。
                            </p>
                            <Diagram id="d11" label="図 4.1: KMS とエンベロープ暗号化の仕組み" />

                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>キータイプ</th>
                                            <th>管理者</th>
                                            <th>ローテーション・特徴</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>AWS Owned Key</b></td>
                                            <td>AWS</td>
                                            <td>AWSサービスが内部使用する無料キー。顧客のアクセス・管理不可。</td>
                                        </tr>
                                        <tr>
                                            <td><b>AWS Managed Key</b></td>
                                            <td>AWS (顧客アカウント内)</td>
                                            <td>`aws/s3`, `aws/ebs` などサービスごとに自動作成されるキー。無料、キーポリシー変更不可。3年ごとに自動ローテーション。</td>
                                        </tr>
                                        <tr>
                                            <td><b>Customer Managed Key (CMK)</b></td>
                                            <td>顧客</td>
                                            <td>顧客がフル管理（キーポリシー、エイリアス、自動ローテーション有効化、無効化・削除）。有料。</td>
                                        </tr>
                                        <tr>
                                            <td><b>AWS CloudHSM</b></td>
                                            <td>顧客 (専用ハードウェア)</td>
                                            <td>FIPS 140-2 Level 3 準拠の単一テナント専用ハードウェアセキュリティモジュール。高いコンプライアンス要件用。</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="t3-rotation">
                            <h3>4.3 KMS キーローテーション</h3>
                            <p>CMK のセキュリティを高めるための自動ローテーションの仕組みです。</p>
                            <Diagram id="d13" label="図 4.2: KMS キーマテリアルの自動ローテーションプロセス" />
                            <div className="topic-card warning">
                                <div className="card-title">キーローテーションの重要仕様</div>
                                <p>
                                    自動ローテーションを有効化すると、1年ごとに新しいキーマテリアルが作成されます。
                                    <b>キーID、Key ARN、キーポリシーは一切変更されません。</b>
                                    過去のキーマテリアルも保持されるため、過去に暗号化したデータの復号も透過的に行われます。
                                </p>
                            </div>
                        </div>

                        <div id="t3-acm">
                            <h3>4.4 AWS Certificate Manager (ACM) と TLS 証明書</h3>
                            <p>転送時暗号化に必要な SSL/TLS 証明書を無料で発行・自動更新するサービスです。</p>
                            <Diagram id="d12" label="図 4.3: ACM と CloudFront/ALB による転送時暗号化" />
                            <ul className="checklist">
                                <li>CloudFront や ALB にデプロイされたパブリック証明書は、ACM が有効期限前に自動更新する。</li>
                                <li>EC2 インスタンスに直接 ACM パブリック証明書をインストールすることはできない（ALB または CloudFront で TLS 終端を行う）。</li>
                            </ul>
                        </div>

                        <div id="t3-classify">
                            <h3>4.5 データ分類・S3 ガバナンス・Object Lock</h3>
                            <div className="topic-card highlight">
                                <div className="card-title">S3 のセキュリティと改ざん防止</div>
                                <ul>
                                    <li><b>S3 Block Public Access</b>: バケットおよびアカウントレベルでパブリック公開を最優先で一括ブロックする設定。</li>
                                    <li><b>S3 Object Lock</b>: WORM (Write Once, Read Many) モデルを実現。一定期間または永久にオブジェクトの削除・上書きを禁止（ガバナンスモード / コンプライアンスモード）。</li>
                                    <li><b>S3 バケットキー</b>: SSE-KMS 利用時に KMS へのリクエスト回数を削減し、暗号化コストを最大99%削減。</li>
                                </ul>
                            </div>
                        </div>

                        <div id="t3-backup">
                            <h3>4.6 AWS Backup による中央集中バックアップと災害復旧 (DR)</h3>
                            <p>複数サービス（EBS, RDS, DynamoDB, EFS, S3など）のバックアップを一元管理します。</p>
                            <Diagram id="d14" label="図 4.4: AWS Backup によるマルチサービス・マルチリージョンバックアップ" />
                        </div>

                        <div id="t3-bp">
                            <h3>4.7 タスク1.3 ベストプラクティスまとめ</h3>
                            <ul className="checklist">
                                <li>S3 バケットのデフォルト暗号化（SSE-S3 または SSE-KMS）を常に有効化する。</li>
                                <li>S3 の通信には `aws:SecureTransport: true` 条件付きバケットポリシーをアタッチし、HTTP 通信を拒否して HTTPS 通信を強制する。</li>
                                <li>重要なバックアップデータは AWS Backup Vault Lock で削除不可（WORM）にし、ランサムウェア攻撃から防護する。</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Exam Scenarios */}
                    <section className="section-block" id="exam-prep">
                        <div className="section-header">
                            <span className="section-number">SECTION 05</span>
                            <h2>5. 試験対策シナリオ問題と直前チェック</h2>
                        </div>

                        <div id="exam-scenarios">
                            <h3>5.1 試験に出る定番シナリオパターン演習</h3>

                            <div className="topic-card highlight">
                                <div className="card-title">シナリオ 1: 「別アカウントの S3 バケットに安全にアクセスしたい」</div>
                                <p><b>要件</b>: 開発アカウント(Account A)の EC2 上で動くアプリが、本番アカウント(Account B)の S3 バケットにアクセスしたい。アクセスキーのハードコードは禁止。</p>
                                <p><b>正解構成</b>: Account B に S3 アクセス権限を持つ IAM ロールを作成し、信頼ポリシーで Account A を許可。Account A の EC2 は `sts:AssumeRole` を実行して一時的認証情報を取得する。</p>
                            </div>

                            <div className="topic-card highlight">
                                <div className="card-title">シナリオ 2: 「DDoS 攻撃と SQL インジェクションの両方から Web を保護したい」</div>
                                <p><b>要件</b>: 大規模な L4 DDoS 攻撃と、アプリケーション層への L7 SQL インジェクション攻撃を最小限の運用負荷でブロックしたい。</p>
                                <p><b>正解構成</b>: CloudFront ＋ AWS Shield Advanced ＋ AWS WAF (SQLi マネージドルール適用) の組み合わせ。</p>
                            </div>

                            <div className="topic-card highlight">
                                <div className="card-title">シナリオ 3: 「S3 内の個人情報 (PII) を自動検出してアラートを出したい」</div>
                                <p><b>要件</b>: 多数の S3 バケット内に誤って機密データやクレジットカード番号が保存されていないか全自動で検出したい。</p>
                                <p><b>正解構成</b>: <b>Amazon Macie</b> を有効化し、データ分類ジョブを設定。検出結果を EventBridge 経由で SNS 通知。</p>
                            </div>
                        </div>

                        <div id="exam-traps">
                            <h3>5.2 試験の引っかけパターン（Distractor Traps）</h3>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>問題のキーワード</th>
                                            <th>誤り（引っかけ肢）</th>
                                            <th>正解の選択肢</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>EC2 の資格情報管理</td>
                                            <td>アクセスキーを IAM ユーザーで発行し、`~/.aws/credentials` に配置する</td>
                                            <td><b>IAM ロールを EC2 インスタンスプロフィールとしてアタッチする</b></td>
                                        </tr>
                                        <tr>
                                            <td>特定 IP からのアクセス拒否</td>
                                            <td>セキュリティグループに Deny ルールを追加する</td>
                                            <td><b>ネットワーク ACL に Deny ルールを追加する</b>（SGはDeny非対応）</td>
                                        </tr>
                                        <tr>
                                            <td>SSH ポートの保護</td>
                                            <td>Port 22 を 0.0.0.0/0 で解放し強固なパスワードを設定する</td>
                                            <td><b>SSM Session Manager を使用し Port 22 を一切開けない</b></td>
                                        </tr>
                                        <tr>
                                            <td>KMS キーのローテーション</td>
                                            <td>キーをローテーションする際はアプリ側の Key ARN を更新する</td>
                                            <td><b>Key ARN や ID は変わらない</b>（透過的に旧キーも保持される）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="exam-summary">
                            <h3>5.3 試験直前チェックリスト</h3>
                            <ul className="checklist">
                                <li><b>明示的な Deny は最優先されるか？</b> → YES。いかなる Allow より強い。</li>
                                <li><b>SCP は権限を付与するか？</b> → NO。権限の「上限（ガードレール）」を規定するのみ。アクセスには別途 IAM ポリシーが必要。</li>
                                <li><b>セキュリティグループはステートフルか？</b> → YES。インバウンドを許せばアウトバウンドは自動で通る。</li>
                                <li><b>WAF はどのレイヤーを保護するか？</b> → レイヤー 7 (HTTP/HTTPS)。</li>
                                <li><b>GuardDuty はエージェントが必要か？</b> → NO。ログをバックグラウンド解析するエージェントレス構成。</li>
                                <li><b>KMS CMK の自動ローテーション周期は？</b> → 1年。</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
