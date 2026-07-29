'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS, REF_CATEGORIES } from './constants';

/**
 * Renders the Mermaid diagram identified by the supplied ID.
 *
 * @param id - The diagram identifier used to look up the chart definition.
 * @param label - The accessible label for the rendered diagram.
 * @returns The diagram container, or `null` if no chart matches the identifier.
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

/**
 * Displays the SAA-C03 exam domain score distribution as an accessible donut chart with a legend.
 */
function DomainPieChart() {
    const domains = [
        { label: 'D1 セキュアなアーキテクチャ', pct: 30, color: '#7c9eff', cls: 'd1' },
        { label: 'D2 回復力のあるアーキテクチャ', pct: 26, color: '#61d0c4', cls: 'd2' },
        { label: 'D3 高性能アーキテクチャ', pct: 24, color: '#f2b84b', cls: 'd3' },
        { label: 'D4 コスト最適化アーキテクチャ', pct: 20, color: '#ff8fa3', cls: 'd4' },
    ];
    const r = 70;
    const cx = 100;
    const cy = 100;
    const circum = 2 * Math.PI * r;
    let cumulative = 0;
    const slices = domains.map((d) => {
        const offset = circum * (1 - cumulative / 100);
        const len = circum * (d.pct / 100);
        cumulative += d.pct;
        return { ...d, offset, len };
    });
    return (
        <div className="domain-pie-chart" role="img" aria-label="SAA-C03 出題ドメイン配点">
            <div className="pie-svg-wrap">
                <svg viewBox="0 0 200 200" aria-hidden="true">
                    {slices.map((s) => (
                        <circle
                            key={s.cls}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill="none"
                            stroke={s.color}
                            strokeWidth="26"
                            strokeDasharray={`${s.len} ${circum - s.len}`}
                            strokeDashoffset={s.offset}
                            strokeLinecap="butt"
                        />
                    ))}
                    <circle cx={cx} cy={cy} r={57} fill="var(--bg-raised)" />
                    <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--aws-orange)" fontSize="11" fontFamily="var(--mono)" fontWeight="700" letterSpacing="0.06">SAA-C03</text>
                    <text x={cx} y={cy + 9} textAnchor="middle" fill="var(--text-dim)" fontSize="9" fontFamily="var(--mono)">出題ドメイン配点</text>
                </svg>
            </div>
            <ul className="pie-legend" aria-label="凡例">
                {domains.map((d) => (
                    <li key={d.cls} className="pie-legend-item">
                        <span className="pie-dot" style={{ background: d.color }} aria-hidden="true" />
                        <span className="pie-label">{d.label}</span>
                        <span className="pie-pct" style={{ color: d.color }}>{d.pct}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Renders the AWS Certified Solutions Architect – Associate (SAA-C03) study guide.
 *
 * @returns The complete SAA-C03 guide page.
 */
export default function SaaGuide() {
    return (
        <div className="aws-saa-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <header className="hero">
                        <div className="hero-eyebrow">AWS Certified · Associate Level</div>
                        <h1>
                            Solutions Architect – Associate (SAA-C03)
                            <br />
                            完全対策ガイド
                        </h1>
                        <p className="hero-lede">
                            AWS公式{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Exam Guide
                            </a>{' '}
                            の4ドメイン・14タスクステートメントに完全準拠。
                            初級者が「何を」「なぜ」「どのサービスで」解決するかを、Mermaid図と比較表で段階的に理解できるよう構成しています。
                        </p>
                        <div className="domain-bars">
                            <div className="domain-card d1">
                                <div className="d-label">Domain 1</div>
                                <div className="d-pct">30%</div>
                                <div className="d-name">セキュアなアーキテクチャの設計</div>
                                <div className="d-track">
                                    <div className="d-fill" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="domain-card d2">
                                <div className="d-label">Domain 2</div>
                                <div className="d-pct">26%</div>
                                <div className="d-name">回復力のあるアーキテクチャの設計</div>
                                <div className="d-track">
                                    <div className="d-fill" style={{ width: '86.6%' }} />
                                </div>
                            </div>
                            <div className="domain-card d3">
                                <div className="d-label">Domain 3</div>
                                <div className="d-pct">24%</div>
                                <div className="d-name">高性能アーキテクチャの設計</div>
                                <div className="d-track">
                                    <div className="d-fill" style={{ width: '80%' }} />
                                </div>
                            </div>
                            <div className="domain-card d4">
                                <div className="d-label">Domain 4</div>
                                <div className="d-pct">20%</div>
                                <div className="d-name">コスト最適化アーキテクチャの設計</div>
                                <div className="d-track">
                                    <div className="d-fill" style={{ width: '66.6%' }} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <article className="article">
                        <h1 id="aws-certified-solutions-architect-associate-saa-c03-完全対策ガイド">
                            AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド
                        </h1>
                        <blockquote>
                            <p>
                                本ガイドは AWS 公式{' '}
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Exam Guide (SAA-C03)
                                </a>{' '}
                                の内容構成（4ドメイン・14タスクステートメント）に完全準拠し、初級者が「何を」「なぜ」「どのサービスで」解決するかを段階的に理解できるよう構成しています。
                            </p>
                        </blockquote>
                        <hr />

                        {/* セクション 1 */}
                        <h2 id="1-試験の全体像">1. 試験の全体像</h2>
                        <h3 id="11-対象者像">1.1 対象者像</h3>
                        <p>
                            AWS公式ガイドでは、対象受験者は
                            <strong>
                                「クラウドソリューションの設計業務で、AWSサービスを使った実務経験を最低1年有すること」
                            </strong>
                            と定義されています。試験は AWS Well-Architected Framework
                            に基づいてソリューションを設計する能力を検証するものです。
                            <sup id="fnref:guide">
                                <a className="footnote-ref" href="#fn:guide">
                                    1
                                </a>
                            </sup>
                        </p>
                        <p>試験が検証する能力は次の3点です。</p>
                        <ul>
                            <li>
                                現在のビジネス要件と将来の予測ニーズの両方を満たすAWSサービスを組み込んだソリューションの設計
                            </li>
                            <li>
                                セキュア・回復力がある・高性能・コスト最適化されたアーキテクチャの設計
                            </li>
                            <li>既存ソリューションのレビューと改善点の特定</li>
                        </ul>

                        <h3 id="12-出題形式とスコアリング">1.2 出題形式とスコアリング</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>出題形式</td>
                                        <td>
                                            択一選択（正解1・誤答3）／複数選択（5択以上から2つ以上正解）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>総問題数</td>
                                        <td>
                                            65問（採点対象50問＋非採点15問。非採点問題は試験内で判別不可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>採点方式</td>
                                        <td>
                                            コンペンサトリー方式＝ドメインごとの合格ラインはなく、
                                            <strong>全体の合計点のみ</strong>で合否判定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>スコア範囲</td>
                                        <td>100〜1000点のスケールスコア</td>
                                    </tr>
                                    <tr>
                                        <td>合格ライン</td>
                                        <td>
                                            <strong>720点</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>無回答の扱い</td>
                                        <td>
                                            不正解として扱われる（=当て推量にペナルティなし、必ず何かを選ぶこと）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html#solutions-architect-associate-03-exam-content"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Exam content — AWS Certification
                            </a>
                        </p>
                        <blockquote>
                            <p>
                                <strong>初級者向けポイント</strong>:
                                スコアレポートにはドメイン別の強み・弱みの目安が表示されますが、合否を分けるのは総合点のみです。苦手ドメインがあっても他のドメインでカバーできるため、「全ドメイン70点必須」のような誤解をしないようにしましょう。
                            </p>
                        </blockquote>

                        <h3 id="13-ドメイン構成と配点">1.3 ドメイン構成と配点</h3>
                        <DomainPieChart />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ドメイン</th>
                                        <th scope="col">配点</th>
                                        <th scope="col">タスクステートメント数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ドメイン1: セキュアなアーキテクチャの設計</td>
                                        <td>30%</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>ドメイン2: 回復力のあるアーキテクチャの設計</td>
                                        <td>26%</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>ドメイン3: 高性能アーキテクチャの設計</td>
                                        <td>24%</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td>ドメイン4: コスト最適化アーキテクチャの設計</td>
                                        <td>20%</td>
                                        <td>4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html#solutions-architect-associate-03-domains"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Content outline — AWS Certification
                            </a>
                        </p>
                        <blockquote>
                            <p>
                                <strong>学習の優先順位</strong>:
                                配点だけを見るとドメイン1（セキュリティ）とドメイン2（回復力）で56%を占めるため、IAM・VPC・可用性設計を最優先で固めるのが効率的です。ただしドメイン3は5つのタスクにまたがりサービス数が非常に多いため、実際の暗記量は最大になりがちです。
                            </p>
                        </blockquote>
                        <hr />

                        {/* セクション 2 */}
                        <h2 id="2-ドメイン1-セキュアなアーキテクチャの設計30">
                            2. ドメイン1: セキュアなアーキテクチャの設計（30%）
                        </h2>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Content Domain 1: Design Secure Architectures
                            </a>
                        </p>
                        <h3 id="20-aws責任共有モデルshared-responsibility-model">
                            2.0 AWS責任共有モデル（Shared Responsibility Model）
                        </h3>
                        <p>
                            ドメイン1全体の前提となる考え方です。AWSと利用者の責任範囲を正しく理解していないと、多くの設問で誤答してしまいます。
                        </p>
                        <Diagram id="mermaid-target-2" label="AWS責任共有モデル" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス種別</th>
                                        <th scope="col">責任分界点の例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>IaaS（EC2, EBS, VPC）</td>
                                        <td>
                                            OSパッチ・ミドルウェア・アプリ・データは顧客責任。ハイパーバイザー以下はAWS責任
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>マネージド型（RDS）</td>
                                        <td>
                                            DBエンジンのパッチはAWSが一部担当。DBユーザー管理・データ暗号化設定は顧客責任
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>サーバーレス（Lambda, DynamoDB）</td>
                                        <td>
                                            顧客責任はコードとIAM権限・データ設定に限定され、AWS側の責任範囲が最も広い
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- サービスがIaaSに近いほど顧客の責任が重くなる、という相関を常に意識する
                            <br />- 「このサービスでOSパッチは誰の責任か？」という設問パターンは頻出
                        </p>
                        <hr />

                        <h3 id="21-タスク11-awsリソースへのセキュアなアクセス設計">
                            2.1 タスク1.1: AWSリソースへのセキュアなアクセス設計
                        </h3>
                        <h4 id="iamの基本構成要素">IAMの基本構成要素</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">役割</th>
                                        <th scope="col">主なベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ユーザー（User）</td>
                                        <td>個人に紐づく恒久的な認証情報</td>
                                        <td>日常作業では使わず、極力IAMロールに置き換える</td>
                                    </tr>
                                    <tr>
                                        <td>グループ（Group）</td>
                                        <td>ユーザーの集合に権限をまとめて付与</td>
                                        <td>権限はユーザーではなくグループに付与する</td>
                                    </tr>
                                    <tr>
                                        <td>ロール（Role）</td>
                                        <td>一時的にアクセス許可を引き受ける仕組み（Assume Role）</td>
                                        <td>
                                            EC2・Lambda等のAWSサービスにはロールを使い、アクセスキーを埋め込まない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ポリシー（Policy）</td>
                                        <td>JSON形式で許可・拒否を定義するドキュメント</td>
                                        <td>
                                            最小権限の原則（Principle of Least Privilege）を徹底する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="ルートユーザーとmfaのベストプラクティス">
                            ルートユーザーとMFAのベストプラクティス
                        </h4>
                        <ul>
                            <li>
                                ルートユーザーは
                                <strong>アカウント作成時の初期設定以外では使用しない</strong>
                            </li>
                            <li>
                                ルートユーザーには必ず <strong>MFA（多要素認証）</strong> を設定する
                            </li>
                            <li>
                                日常運用は IAM Identity Center（旧AWS SSO）経由のフェデレーションユーザーで行う
                            </li>
                            <li>
                                ルートユーザーのアクセスキーは基本的に発行しない・発行済みなら削除する
                            </li>
                        </ul>

                        <h4 id="iamポリシー評価ロジック">IAMポリシー評価ロジック</h4>
                        <p>
                            「どのポリシーが優先されるか」は頻出論点です。評価順序を正しく理解しましょう。
                        </p>
                        <Diagram id="mermaid-target-3" label="IAMポリシー評価ロジック" />
                        <blockquote>
                            <p>
                                <strong>重要</strong>: 明示的な <code>Deny</code> は常に他のあらゆる{' '}
                                <code>Allow</code>{' '}
                                に優先します。また、何も明示されていない場合はデフォルトで拒否（暗黙のDeny）される点も忘れずに。
                            </p>
                        </blockquote>

                        <h4 id="アイデンティティベース-vs-リソースベースポリシー">
                            アイデンティティベース vs リソースベースポリシー
                        </h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">付与対象</th>
                                        <th scope="col">具体例</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>アイデンティティベースポリシー</td>
                                        <td>ユーザー・グループ・ロール</td>
                                        <td>IAMポリシー</td>
                                        <td>「誰が何をできるか」を主体側に定義</td>
                                    </tr>
                                    <tr>
                                        <td>リソースベースポリシー</td>
                                        <td>リソース自体</td>
                                        <td>S3バケットポリシー、KMSキーポリシー、SQSキューポリシー</td>
                                        <td>
                                            クロスアカウントアクセスの許可に有効。<code>Principal</code>
                                            要素で許可対象を指定できる
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="マルチアカウント戦略">マルチアカウント戦略</h4>
                        <p>
                            大規模組織では単一アカウントではなく、<strong>AWS Organizations</strong>
                            を使った複数アカウント運用が推奨されます。
                        </p>
                        <Diagram id="mermaid-target-4" label="マルチアカウント戦略" />
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
                                        <td>AWS Organizations</td>
                                        <td>
                                            複数アカウントを統合管理し、一括請求（Consolidated Billing）を実現
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SCP（Service Control Policies）</td>
                                        <td>
                                            OUやアカウント単位で「許可できる操作の上限」を設定するガードレール。IAMポリシーとは異なり
                                            <strong>権限を積極的に付与することはできない</strong>
                                            （許可の天井を作るのみ）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Control Tower</td>
                                        <td>
                                            Organizations・SCP・ログ集約・ガードレールをベストプラクティスに沿って自動セットアップするサービス
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>クロスアカウントロール（STS AssumeRole）</td>
                                        <td>
                                            一時的な認証情報を発行し、他アカウントのロールを引き受けてリソースにアクセスする仕組み
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- ワークロードごと（本番／開発／検証）にAWSアカウントを分離し、爆発半径（blast radius）を最小化する
                            <br />- SCPは「ガードレール」であり「権限付与」ではないことを混同しない（SCPだけではアクセス許可は発生しない。IAMポリシーとの掛け算で最終許可が決まる）
                            <br />- クロスアカウントアクセスはIAMユーザーの共有ではなく、STSによる一時的なロール引き受け（AssumeRole）で行う
                            <br />- フェデレーション（Active Directory等の既存IDプロバイダー）はSAML 2.0またはIAM Identity Centerと連携し、AWS内に恒久的なユーザーを増やさない
                        </p>
                        <hr />

                        <h3 id="22-タスク12-セキュアなワークロードとアプリケーションの設計">
                            2.2 タスク1.2: セキュアなワークロードとアプリケーションの設計
                        </h3>
                        <h4 id="vpcとネットワークセグメンテーション">
                            VPCとネットワークセグメンテーション
                        </h4>
                        <Diagram id="mermaid-target-5" label="VPCとネットワークセグメンテーション" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コンポーネント</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>インターネットゲートウェイ（IGW）</td>
                                        <td>VPCとインターネットを双方向に接続</td>
                                    </tr>
                                    <tr>
                                        <td>NATゲートウェイ</td>
                                        <td>
                                            プライベートサブネットからインターネットへの
                                            <strong>アウトバウンド通信のみ</strong>
                                            を許可（インバウンド接続は不可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ルートテーブル</td>
                                        <td>
                                            サブネットごとの通信経路を定義。パブリックサブネットは
                                            <code>0.0.0.0/0 → IGW</code>、プライベートサブネットは
                                            <code>0.0.0.0/0 → NATゲートウェイ</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>セキュリティグループ（SG）</td>
                                        <td>
                                            インスタンスレベルのファイアウォール。<strong>ステートフル</strong>
                                            （戻りの通信は自動的に許可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ネットワークACL（NACL）</td>
                                        <td>
                                            サブネットレベルのファイアウォール。<strong>ステートレス</strong>
                                            （インバウンド・アウトバウンドを個別にルール設定する必要あり）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="セキュリティグループ-vs-nacl-比較表">
                            セキュリティグループ vs NACL 比較表
                        </h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">セキュリティグループ</th>
                                        <th scope="col">ネットワークACL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>適用単位</td>
                                        <td>ENI（インスタンス）単位</td>
                                        <td>サブネット単位</td>
                                    </tr>
                                    <tr>
                                        <td>ステート</td>
                                        <td>ステートフル</td>
                                        <td>ステートレス</td>
                                    </tr>
                                    <tr>
                                        <td>ルール</td>
                                        <td>Allowのみ（Denyルールは書けない）</td>
                                        <td>AllowとDenyの両方を記述可能</td>
                                    </tr>
                                    <tr>
                                        <td>ルール評価</td>
                                        <td>全ルールを評価してAllowを探す</td>
                                        <td>番号の小さい順に評価し、最初にマッチしたルールを適用</td>
                                    </tr>
                                    <tr>
                                        <td>デフォルト</td>
                                        <td>すべてのインバウンドを拒否、アウトバウンドは全許可</td>
                                        <td>デフォルトNACLは全通信を許可</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- パブリックサブネットにはロードバランサーやNATゲートウェイなど「インターネット向き」のリソースのみ配置し、DBやアプリ本体はプライベートサブネットに置く
                            <br />- セキュリティグループはできるだけ「送信元をセキュリティグループIDで指定」し、IPレンジのハードコーディングを避ける（構成変更に強くなる）
                            <br />- 多層防御（Defense in Depth）としてSGとNACLを併用する
                        </p>

                        <h4 id="セキュアなアプリケーション設計に関わる主要サービス">
                            セキュアなアプリケーション設計に関わる主要サービス
                        </h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">用途</th>
                                        <th scope="col">主なベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Secrets Manager</td>
                                        <td>
                                            DB認証情報・APIキー等の<strong>動的なローテーションが必要な機密情報</strong>を管理
                                        </td>
                                        <td>
                                            アプリにクレデンシャルをハードコードせず、SDK経由で取得。自動ローテーションを有効化
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Systems Manager Parameter Store</td>
                                        <td>設定値・パラメータの管理（Secrets Managerより低コスト）</td>
                                        <td>
                                            ローテーション頻度が低い設定値・非機密パラメータに使用（機密情報はSecretsManager推奨）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Cognito</td>
                                        <td>
                                            Web・モバイルアプリのユーザー認証・認可（サインアップ／サインイン、ソーシャルログイン）
                                        </td>
                                        <td>
                                            User PoolsとIdentity Poolsを使い分け、アプリ側で認証基盤を自作しない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon GuardDuty</td>
                                        <td>
                                            VPCフローログ・CloudTrail・DNSログを機械学習で分析する
                                            <strong>脅威検知</strong>サービス
                                        </td>
                                        <td>
                                            全リージョン・全アカウントで有効化し、Security Hubと統合してアラートを一元化
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Macie</td>
                                        <td>
                                            S3内の<strong>個人情報（PII）を機械学習で自動検出</strong>するデータセキュリティサービス
                                        </td>
                                        <td>
                                            コンプライアンス要件のあるS3バケットに定期スキャンを設定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS WAF</td>
                                        <td>
                                            Layer 7（アプリケーション層）のWebアプリケーションファイアウォール。SQLi・XSS等を防御
                                        </td>
                                        <td>
                                            マネージドルールグループを活用し、ALB/CloudFront/API Gatewayの手前で適用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Shield（Standard/Advanced）</td>
                                        <td>DDoS攻撃（Layer 3/4中心）からの保護</td>
                                        <td>
                                            Standardは全ユーザーに無償で自動適用。重要な本番環境はShield Advanced + WAFの併用を検討
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Certificate Manager (ACM)</td>
                                        <td>TLS/SSL証明書の発行・自動更新</td>
                                        <td>
                                            ALB・CloudFront・API Gatewayに無料で証明書を発行し、手動更新の運用負荷をなくす
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="外部接続のセキュリティ">外部接続のセキュリティ</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">接続方式</th>
                                        <th scope="col">特徴</th>
                                        <th scope="col">ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Site-to-Site VPN</td>
                                        <td>インターネット経由の暗号化トンネル（IPsec）</td>
                                        <td>迅速に構築したい・帯域要件がそこまで高くない拠点間接続</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Direct Connect</td>
                                        <td>専用線による物理接続</td>
                                        <td>大容量・低遅延・安定した帯域が必要なオンプレミス接続</td>
                                    </tr>
                                    <tr>
                                        <td>Direct Connect + VPN（併用）</td>
                                        <td>
                                            専用線を暗号化して使う、またはDCの障害時のフェイルオーバー用にVPNを併用
                                        </td>
                                        <td>セキュリティ要件が厳しい・DCの可用性を高めたい場合</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- インターネットを経由させたくない機密性の高い通信は VPN または Direct Connect（単体では非暗号化のため暗号化が必要な場合は MACsec や Site-to-Site VPN を組み合わせる）を選択する
                            <br />- 迅速かつ標準で暗号化される接続が優先ならVPN、専用線による帯域保証・低レイテンシが優先ならDirect Connectを選ぶ、という判断軸を持つ
                        </p>
                        <hr />

                        <h3 id="23-タスク13-適切なデータセキュリティコントロールの決定">
                            2.3 タスク1.3: 適切なデータセキュリティコントロールの決定
                        </h3>
                        <h4 id="暗号化アーキテクチャ">暗号化アーキテクチャ</h4>
                        <Diagram id="mermaid-target-6" label="暗号化アーキテクチャ" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">概念</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS KMS（Key Management Service）</td>
                                        <td>
                                            暗号化キーの作成・管理・ローテーションを行うマネージドサービス。CloudTrailと連携し利用履歴を監査可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWSマネージドキー</td>
                                        <td>
                                            AWSがキーを自動管理（ローテーションも自動）。追加コストなしで多くのサービスがデフォルトで利用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>カスタマーマネージドキー（CMK）</td>
                                        <td>
                                            顧客がキーポリシーで詳細なアクセス制御・手動/自動ローテーション設定を行える
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>エンベロープ暗号化</td>
                                        <td>
                                            KMSのマスターキーで「データキー」自体を暗号化し、大容量データはデータキーで暗号化する仕組み。KMSのAPI呼び出し回数を削減できる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ACM（AWS Certificate Manager）</td>
                                        <td>転送時暗号化（TLS）用の証明書を無料で発行・自動更新</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 保管データは可能な限り<strong>デフォルトで暗号化を有効化</strong>する（S3のデフォルト暗号化、EBSのデフォルト暗号化設定など）
                            <br />- キーポリシーとIAMポリシーの両方でアクセス制御を行い、最小権限を徹底する
                            <br />- コンプライアンス要件（PCI-DSS、HIPAA等）に応じて、カスタマーマネージドキーで独自のローテーション・監査ポリシーを設定する
                            <br />- 証明書の手動更新漏れによる障害を防ぐため、ACMで自動更新を利用する
                        </p>

                        <h4 id="データ保護可用性ガバナンス">データ保護・可用性・ガバナンス</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">主なサービス・機能</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>バックアップ</td>
                                        <td>
                                            AWS Backup（一元的なバックアップ管理）、RDS自動スナップショット、S3バージョニング
                                        </td>
                                        <td>
                                            バックアップポリシーを一元化し、頻度・保持期間をタグベースで自動適用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>レプリケーション</td>
                                        <td>
                                            S3クロスリージョンレプリケーション（CRR）、RDSリードレプリカ、DynamoDBグローバルテーブル
                                        </td>
                                        <td>災害復旧要件（RPO）に応じてレプリケーション範囲を決定</td>
                                    </tr>
                                    <tr>
                                        <td>データライフサイクル</td>
                                        <td>
                                            S3ライフサイクルルール、DLM（Data Lifecycle Manager、EBSスナップショット自動化）
                                        </td>
                                        <td>
                                            保持期間・アーカイブポリシーをコンプライアンス要件と合わせて設計（詳細はドメイン4で解説）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>データ分類・ガバナンス</td>
                                        <td>AWS Macie、タグベースのアクセス制御（ABAC）</td>
                                        <td>
                                            機密データを自動検出し、アクセス制御をタグに紐づけて一貫性を持たせる
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />

                        {/* セクション 3 */}
                        <h2 id="3-ドメイン2-回復力のあるアーキテクチャの設計26">
                            3. ドメイン2: 回復力のあるアーキテクチャの設計（26%）
                        </h2>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Content Domain 2: Design Resilient Architectures
                            </a>
                        </p>
                        <h3 id="31-タスク21-スケーラブルで疎結合なアーキテクチャの設計">
                            3.1 タスク2.1: スケーラブルで疎結合なアーキテクチャの設計
                        </h3>
                        <h4 id="疎結合loose-couplingとは">疎結合（Loose Coupling）とは</h4>
                        <p>
                            コンポーネント同士が直接依存せず、片方が停止・遅延しても他方に即座に影響しない設計です。キューやイベントを介して非同期に連携させることで実現します。
                        </p>
                        <Diagram id="mermaid-target-7" label="疎結合アーキテクチャ" />
                        <h4 id="メッセージングイベント駆動サービス比較">
                            メッセージング・イベント駆動サービス比較
                        </h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">通信パターン</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon SQS</td>
                                        <td>ポイントツーポイント（キュー）</td>
                                        <td>
                                            メッセージを一時保持し、コンシューマーがポーリングして処理。標準キュー（高スループット・At-Least-Once配信）とFIFOキュー（順序保証・重複排除）の2種類
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon SNS</td>
                                        <td>Pub/Sub（ファンアウト）</td>
                                        <td>
                                            1つのメッセージを複数のサブスクライバー（SQS、Lambda、Email、HTTPSなど）に同時配信
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EventBridge</td>
                                        <td>イベントバス</td>
                                        <td>
                                            AWSサービスやSaaS、カスタムアプリからのイベントをルールベースでルーティング。スキーマレジストリでイベント構造を管理可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Step Functions</td>
                                        <td>ワークフローオーケストレーション</td>
                                        <td>
                                            Lambda・ECSタスク等を順序立てて実行するステートマシンを視覚的に定義。エラーハンドリング・リトライを組み込みで実装
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="mermaid-target-8" label="メッセージング・イベント駆動パターン" />
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 「ファンアウト（1つのイベントを複数の処理系に配信）」が求められたら SNS→SQS のファンアウトパターンを検討する
                            <br />- 順序保証・重複排除が必要な場合はSQS FIFOキューを選択する（スループットは標準キューより低い点に注意）
                            <br />- 複数ステップにまたがる業務ロジックのオーケストレーションはStep Functionsを使い、Lambda内にワークフロー制御ロジックを持たせない
                        </p>

                        <h4 id="ロードバランシングとスケーリング">ロードバランシングとスケーリング</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ロードバランサー種別</th>
                                        <th scope="col">レイヤー</th>
                                        <th scope="col">主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Application Load Balancer (ALB)</td>
                                        <td>Layer 7（HTTP/HTTPS）</td>
                                        <td>
                                            パスベース・ホストベースルーティング、マイクロサービス、コンテナ(ECS)との統合
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Network Load Balancer (NLB)</td>
                                        <td>Layer 4（TCP/UDP）</td>
                                        <td>
                                            超低レイテンシ・高スループット、静的IP/Elastic IPが必要な場合
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gateway Load Balancer (GWLB)</td>
                                        <td>Layer 3/4</td>
                                        <td>
                                            サードパーティ製のセキュリティ・検査アプライアンスをトラフィックパスに透過的に挿入
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">スケーリング方式</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>水平スケーリング（Scale Out）</td>
                                        <td>
                                            インスタンス数を増減させる。ステートレスな設計と相性が良く、クラウドネイティブなスケーリング手法として推奨
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>垂直スケーリング（Scale Up）</td>
                                        <td>
                                            インスタンスタイプ自体を大きくする。停止・変更・再起動が必要でダウンタイムが発生しやすい
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="コンテナサーバーレスの活用">コンテナ・サーバーレスの活用</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon ECS</td>
                                        <td>
                                            AWS独自のコンテナオーケストレーションサービス。学習コストが低くAWSサービスとの統合が容易
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EKS</td>
                                        <td>
                                            マネージドKubernetes。Kubernetesの標準APIやエコシステムをそのまま利用したい場合に選択
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Fargate</td>
                                        <td>
                                            ECS/EKS向けのサーバーレスコンピューティングエンジン。EC2インスタンスの管理が不要になる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Lambda</td>
                                        <td>
                                            イベント駆動のサーバーレス関数実行環境。実行時間・呼び出し回数課金で、アイドル時のコストが発生しない
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- Kubernetesの知見やマルチクラウド戦略があるならEKS、AWS内で完結しシンプルに運用したいならECSを選ぶ
                            <br />- インフラ管理を極小化したいならFargate、コスト最適化のためにインスタンスタイプを細かく制御したい場合はEC2起動タイプのECS/EKSを選ぶ
                            <br />- 短時間・イベント駆動の処理（画像リサイズ、APIバックエンド等）はLambda、長時間稼働・常駐型ワークロードはコンテナかEC2を検討する
                        </p>
                        <hr />

                        <h3 id="32-タスク22-高可用性フォールトトレラントアーキテクチャの設計">
                            3.2 タスク2.2: 高可用性・フォールトトレラントアーキテクチャの設計
                        </h3>
                        <h4 id="マルチazマルチリージョン設計">マルチAZ・マルチリージョン設計</h4>
                        <Diagram id="mermaid-target-9" label="マルチAZ・マルチリージョン設計" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">概念</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Availability Zone（AZ）</td>
                                        <td>
                                            独立した電源・ネットワーク・冷却設備を持つ物理的に離れたデータセンター群。1つのリージョンに複数存在
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Multi-AZ配置</td>
                                        <td>
                                            単一AZの障害（電源断・災害等）でもサービスを継続させるための基本設計。RDSのMulti-AZは同期レプリケーション＋自動フェイルオーバーを提供
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Multi-Region設計</td>
                                        <td>
                                            リージョン全体の障害に備える。RTO/RPO要件が非常に厳しい場合や、地理的な法規制対応で採用
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="route-53-ルーティングポリシー">Route 53 ルーティングポリシー</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ポリシー</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>シンプルルーティング</td>
                                        <td>単一リソースへの固定的な名前解決</td>
                                    </tr>
                                    <tr>
                                        <td>フェイルオーバールーティング</td>
                                        <td>
                                            ヘルスチェック結果に基づきプライマリ→セカンダリへ自動切替
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>加重ルーティング</td>
                                        <td>
                                            トラフィックを比率で分散（例: Blue/Greenデプロイ、カナリアリリース）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>レイテンシーベースルーティング</td>
                                        <td>ユーザーから最も低レイテンシのリージョンへ誘導</td>
                                    </tr>
                                    <tr>
                                        <td>位置情報ルーティング</td>
                                        <td>ユーザーの地理的位置に基づきコンテンツを出し分け</td>
                                    </tr>
                                    <tr>
                                        <td>地理的近接ルーティング</td>
                                        <td>
                                            Route 53トラフィックフローを用い、地理的なバイアスを調整して誘導
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="災害復旧dr戦略">災害復旧（DR）戦略</h4>
                        <p>
                            RTO（目標復旧時間）とRPO（目標復旧時点）のトレードオフを理解することが最重要ポイントです。
                        </p>
                        <Diagram id="mermaid-target-10" label="災害復旧（DR）戦略の比較" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">DR戦略</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Backup &amp; Restore</td>
                                        <td>
                                            定期的にバックアップを取得し、災害時にゼロから環境を再構築。最もコストが低いがRTO/RPOは長い
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pilot Light</td>
                                        <td>
                                            最小限のコアコンポーネント（DBレプリケーション等）のみを常時稼働させ、災害時に残りをスケールアップ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Warm Standby</td>
                                        <td>
                                            縮小版のフル稼働環境を別リージョンに常時稼働させ、災害時にスケールアップして本番負荷を受け持つ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Active-Active（マルチサイト）</td>
                                        <td>
                                            複数リージョンで同時に本番トラフィックを処理。RTO/RPOはほぼゼロだがコストと運用複雑性が最大
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- ビジネス要件（RTO/RPO目標値）を最初に確認してからDR戦略を選ぶ。「コストを抑えたい」なら軽量な戦略、「ダウンタイムを絶対に許容できない」ならActive-Activeを選択する、という判断軸を持つ
                            <br />- DR戦略の選択問題では、まず設問中のRTO/RPOの数値・コスト制約条件を探すことが解答の近道
                        </p>

                        <h4 id="単一障害点の排除とレガシーアプリケーション対応">
                            単一障害点の排除とレガシーアプリケーション対応
                        </h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">手法・サービス</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Auto Scaling + ヘルスチェック</td>
                                        <td>
                                            異常なインスタンスを自動検出し終了・再起動して自己修復（Self-Healing）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon RDS Proxy</td>
                                        <td>
                                            DB接続をプールし、フェイルオーバー時の接続断や大量接続によるDB過負荷を緩和。特にLambdaのようなコネクション数が急増するワークロードに有効
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Elastic Load Balancing</td>
                                        <td>
                                            複数AZにトラフィックを分散し、単一インスタンス・単一AZへの依存を排除
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS X-Ray</td>
                                        <td>
                                            分散システムのリクエストをトレースし、ボトルネックや障害箇所を可視化（ワークロードの可観測性）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>イミュータブルインフラストラクチャ</td>
                                        <td>
                                            サーバーを直接変更せず、新しいイメージ（AMI等）から都度作り直すことで構成ドリフトを防止
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>サービスクォータ・スロットリング</td>
                                        <td>
                                            DR発動時にスタンバイ環境のクォータ（EC2上限等)が不足しないよう、事前に引き上げ申請しておく
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- クラウド向けに再設計できないレガシーアプリケーションには、Elastic Load Balancing・Auto Scaling・RDS Multi-AZなどのマネージド機能を「外側から」適用し、可用性を底上げする
                            <br />- 可用性向上の自動化（Auto Scalingのヘルスチェック、Route 53フェイルオーバー等）を優先し、手動オペレーションへの依存を減らす
                        </p>
                        <hr />

                        {/* セクション 4 */}
                        <h2 id="4-ドメイン3-高性能アーキテクチャの設計24">
                            4. ドメイン3: 高性能アーキテクチャの設計（24%）
                        </h2>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Content Domain 3: Design High-Performing Architectures
                            </a>
                        </p>
                        <h3 id="41-タスク31-高性能スケーラブルなストレージソリューション">
                            4.1 タスク3.1: 高性能・スケーラブルなストレージソリューション
                        </h3>
                        <h4 id="ストレージタイプの選択">ストレージタイプの選択</h4>
                        <Diagram id="mermaid-target-11" label="ストレージタイプの選択ツリー" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ストレージ種別</th>
                                        <th scope="col">サービス例</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>オブジェクトストレージ</td>
                                        <td>Amazon S3</td>
                                        <td>
                                            ほぼ無制限のスケール、HTTP(S)経由のAPIアクセス、11 9&apos;s（99.999999999%）の耐久性
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ブロックストレージ</td>
                                        <td>Amazon EBS</td>
                                        <td>
                                            単一EC2インスタンスにアタッチする低レイテンシボリューム。スナップショットでバックアップ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ファイルストレージ</td>
                                        <td>Amazon EFS / FSx</td>
                                        <td>
                                            複数インスタンスから同時マウント可能な共有ファイルシステム
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">EBSボリュームタイプ</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>gp3 (汎用SSD)</td>
                                        <td>
                                            大半のワークロードに適したデフォルト選択。IOPSとスループットを独立して調整可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>io2 Block Express</td>
                                        <td>
                                            高IOPS・低レイテンシが必要なミッションクリティカルDB向け
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>st1 (スループット最適化HDD)</td>
                                        <td>
                                            ビッグデータ・ログ処理などシーケンシャルアクセス中心のワークロード
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>sc1 (Cold HDD)</td>
                                        <td>アクセス頻度が低い大容量データ向けの最安価格帯</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 「複数インスタンスからの同時読み書き」という要件が出たらEBSではなくEFS/FSxを検討する（EBSは基本的に単一インスタンス専有）
                            <br />- Linuxワークロードの共有ストレージはEFS、Windowsワークロードの共有ストレージはFSx for Windows File Serverを選ぶ
                            <br />- HPC（高性能計算）・機械学習の大規模並列処理にはFSx for Lustreを検討する
                            <br />- ハイブリッド環境ではAWS Storage GatewayでオンプレミスからS3をシームレスに利用できるようにする
                        </p>
                        <hr />

                        <h3 id="42-タスク32-高性能で弾力性のあるコンピューティングソリューションの設計">
                            4.2 タスク3.2: 高性能で弾力性のあるコンピューティングソリューションの設計
                        </h3>
                        <h4 id="ec2インスタンスファミリー">EC2インスタンスファミリー</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ファミリー</th>
                                        <th scope="col">最適化対象</th>
                                        <th scope="col">主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>M（汎用）</td>
                                        <td>バランス型</td>
                                        <td>Webサーバー、中小規模DB、一般的なアプリケーション</td>
                                    </tr>
                                    <tr>
                                        <td>C（コンピューティング最適化）</td>
                                        <td>高いCPU性能</td>
                                        <td>バッチ処理、動画エンコード、科学計算、ゲームサーバー</td>
                                    </tr>
                                    <tr>
                                        <td>R（メモリ最適化）</td>
                                        <td>大容量メモリ</td>
                                        <td>インメモリDB、リアルタイムビッグデータ分析</td>
                                    </tr>
                                    <tr>
                                        <td>I / D（ストレージ最適化）</td>
                                        <td>高速ローカルNVMe</td>
                                        <td>NoSQL DB、データウェアハウス、分散ファイルシステム</td>
                                    </tr>
                                    <tr>
                                        <td>G / P（高速コンピューティング）</td>
                                        <td>GPU</td>
                                        <td>機械学習トレーニング、グラフィックスレンダリング</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="auto-scalingの仕組み">Auto Scalingの仕組み</h4>
                        <Diagram id="mermaid-target-12" label="Auto Scalingの仕組み" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">スケーリングポリシー</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ターゲット追跡スケーリング</td>
                                        <td>
                                            CPU使用率など特定メトリクスを目標値に維持するよう自動調整。最も推奨されるシンプルな方式
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ステップスケーリング</td>
                                        <td>閾値超過の度合いに応じて段階的にキャパシティを調整</td>
                                    </tr>
                                    <tr>
                                        <td>スケジュールスケーリング</td>
                                        <td>
                                            予測可能な負荷パターン（毎朝9時に増加等）に対して事前にスケジュール設定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>予測スケーリング</td>
                                        <td>
                                            過去の負荷パターンを機械学習で予測し、事前にスケールアウト
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="サーバーレスコンテナの性能設計">サーバーレス・コンテナの性能設計</h4>
                        <ul>
                            <li>
                                <strong>AWS Lambda</strong>:
                                割り当てメモリ量を増やすとCPU性能も比例して向上する。CPUバウンドな処理が遅い場合は、まずメモリ設定の見直しを検討する
                            </li>
                            <li>
                                <strong>AWS Fargate</strong>:
                                vCPUとメモリの組み合わせを指定してタスクを実行。EC2管理が不要な分、インスタンスレベルの細かいチューニングはできない
                            </li>
                            <li>
                                <strong>AWS Batch</strong>:
                                大量のバッチ計算ジョブをスケジューリング・実行し、必要に応じてSpotインスタンスを自動選択してコストと性能のバランスを取る
                            </li>
                            <li>
                                <strong>Amazon EMR</strong>:
                                Hadoop/Sparkなどのビッグデータフレームワークをマネージドクラスターで実行
                            </li>
                        </ul>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- インスタンスタイプ選定では「どのリソース（CPU/メモリ/ストレージ/GPU）がボトルネックか」をまず特定する
                            <br />- Lambdaのレイテンシ問題は多くの場合メモリ割り当て不足が原因であることを覚えておく
                            <br />- ワークロードをできる限り疎結合にし、コンポーネント単位で独立してスケールできるようにする
                        </p>
                        <hr />

                        <h3 id="43-タスク33-高性能データベースソリューションの決定">
                            4.3 タスク3.3: 高性能データベースソリューションの決定
                        </h3>
                        <h4 id="データベースサービスの比較">データベースサービスの比較</h4>
                        <Diagram id="mermaid-target-13" label="データベースサービスの比較フロー" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">データベース</th>
                                        <th scope="col">種別</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon RDS</td>
                                        <td>リレーショナル</td>
                                        <td>
                                            MySQL, PostgreSQL, MariaDB, Oracle, SQL Serverをマネージドで提供。異機種間移行にはAWS DMS/SCTを利用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Aurora</td>
                                        <td>リレーショナル（AWS独自）</td>
                                        <td>
                                            MySQL/PostgreSQL互換、ストレージが自動で最大128TiBまで拡張、最大15台のリードレプリカ、Auroraグローバルデータベースでマルチリージョン展開が可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon DynamoDB</td>
                                        <td>NoSQL（キーバリュー/ドキュメント）</td>
                                        <td>
                                            サーバーレスで自動スケール、1桁ミリ秒のレイテンシ、DynamoDB Acceleratorでマイクロ秒台のキャッシュも可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon ElastiCache</td>
                                        <td>インメモリキャッシュ</td>
                                        <td>
                                            Redis（永続化・レプリケーション対応）とMemcached（シンプルな水平分割キャッシュ）から選択
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="読み取りレプリカとキャッシング戦略">
                            読み取りレプリカとキャッシング戦略
                        </h4>
                        <Diagram id="mermaid-target-14" label="読み取りレプリカとキャッシング" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">手法</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>リードレプリカ</td>
                                        <td>
                                            読み取り負荷の高いワークロードで、読み取りクエリをレプリカに分散して書き込みDBの負荷を軽減。非同期レプリケーションのためレプリカラグ（遅延）に注意
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DynamoDB DAX</td>
                                        <td>
                                            DynamoDB専用のインメモリキャッシュ層。マイクロ秒単位の読み取りレイテンシを実現
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ElastiCache</td>
                                        <td>
                                            アプリケーション層でのキャッシュ（Cache-Aside/Lazy Loadingパターンが一般的）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 読み取りが極めて多いワークロードには、まずリードレプリカ、次にキャッシュ層（ElastiCache/DAX）の追加を検討する
                            <br />- MySQL/PostgreSQL互換でクラウドネイティブなスケーラビリティが必要ならAurora、オンプレミスのDB資産をそのまま移行したいだけならRDSを選ぶ
                            <br />- アクセスパターンが単純なキーバリューかつ超大規模・低レイテンシならDynamoDB、複雑なリレーショナルクエリが必要ならRDS/Auroraという判断軸を持つ
                        </p>
                        <hr />

                        <h3 id="44-タスク34-高性能スケーラブルなネットワークアーキテクチャの決定">
                            4.4 タスク3.4: 高性能・スケーラブルなネットワークアーキテクチャの決定
                        </h3>
                        <h4 id="エッジネットワーキングサービス">エッジネットワーキングサービス</h4>
                        <Diagram id="mermaid-target-15" label="エッジネットワーキング構成" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon CloudFront</td>
                                        <td>
                                            静的/動的コンテンツをエッジロケーションにキャッシュ配信するCDN。オリジンへの負荷とレイテンシを削減
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Global Accelerator</td>
                                        <td>
                                            AWSのグローバルネットワークを使い、Anycast IPで最寄りのエッジからバックエンド（ALB/NLB/EIP）まで最適経路を選択。TCP/UDPレベルで高速化し、リージョン障害時のフェイルオーバーにも利用
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="接続オプションの比較">接続オプションの比較</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">接続方式</th>
                                        <th scope="col">レイヤー/特徴</th>
                                        <th scope="col">ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS VPN</td>
                                        <td>インターネット経由の暗号化トンネル</td>
                                        <td>迅速・低コストな拠点間/リモート接続</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Direct Connect</td>
                                        <td>専用線接続</td>
                                        <td>大容量・安定した帯域、低レイテンシが必要な基幹接続</td>
                                    </tr>
                                    <tr>
                                        <td>AWS PrivateLink</td>
                                        <td>
                                            VPC間・VPCとAWSサービス間をインターネットを経由せずプライベート接続
                                        </td>
                                        <td>
                                            インターネットに公開せずSaaS/内部サービスにアクセスしたい場合
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>VPCピアリング</td>
                                        <td>2つのVPC間を1対1で直接接続</td>
                                        <td>少数のVPC間で全面的なネットワーク到達性が必要な場合</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Transit Gateway</td>
                                        <td>多数のVPC・オンプレミスをハブ&amp;スポーク型で集約接続</td>
                                        <td>数十〜数百のVPCを接続するハイブリッド/マルチVPC環境</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="mermaid-target-16" label="AWS Transit Gatewayハブ構成" />
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 静的コンテンツ・キャッシュ可能なコンテンツの配信高速化にはCloudFront、動的コンテンツ・非HTTPプロトコルの高速化・グローバルなフェイルオーバーにはGlobal Acceleratorを選ぶ
                            <br />- VPCの数が少なければVPCピアリングでも管理できるが、数が増えるほどTransit Gatewayによる集約管理がスケールする（ピアリングはフルメッシュになるほど管理が煩雑化するため）
                            <br />- サブネット設計時はIPアドレス範囲の将来的な拡張余地を残しておく（CIDRブロックは後から縮小できない）
                        </p>
                        <hr />

                        <h3 id="45-タスク35-高性能データ取り込み変換ソリューションの決定">
                            4.5 タスク3.5: 高性能データ取り込み・変換ソリューションの決定
                        </h3>
                        <Diagram id="mermaid-target-17" label="データ取り込み・変換・分析パイプライン" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon Kinesis Data Streams</td>
                                        <td>
                                            リアルタイムのストリーミングデータ取り込み（カスタムコンシューマーで処理）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Kinesis Data Firehose</td>
                                        <td>
                                            ストリーミングデータをS3/Redshift/OpenSearch等へ配信（サーバーレスでスケーリング不要）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Glue</td>
                                        <td>
                                            サーバーレスETL、データカタログでスキーマを一元管理、フォーマット変換（例: CSV→Parquet）に利用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Athena</td>
                                        <td>
                                            S3上のデータに対しサーバーレスでSQLクエリを実行。使った分だけ課金
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Lake Formation</td>
                                        <td>データレイクの一元的なアクセス許可・ガバナンス管理</td>
                                    </tr>
                                    <tr>
                                        <td>AWS DataSync</td>
                                        <td>
                                            オンプレミス・他クラウドとAWSストレージ間の大容量データ転送を自動化・高速化
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Storage Gateway</td>
                                        <td>
                                            オンプレミスとS3をシームレスに接続するハイブリッドストレージゲートウェイ（ファイル/ボリューム/テープ型）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EMR</td>
                                        <td>
                                            Hadoop/Spark/Hive等のビッグデータフレームワークをマネージドクラスターで実行
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 高頻度・低レイテンシで到着し続けるストリーミングデータにはKinesis、バッチ・スケジュールベースのETLにはGlueを使い分ける
                            <br />- データフォーマットは行指向（CSV/JSON）より列指向（Parquet/ORC）に変換することで、Athena等のクエリコスト・速度を大幅に改善できる
                            <br />- データレイクの権限管理はS3バケットポリシーだけに頼らず、Lake Formationで列・行レベルのきめ細かいアクセス制御を行う
                        </p>
                        <hr />

                        {/* セクション 5 */}
                        <h2 id="5-ドメイン4-コスト最適化アーキテクチャの設計20">
                            5. ドメイン4: コスト最適化アーキテクチャの設計（20%）
                        </h2>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Content Domain 4: Design Cost-Optimized Architectures
                            </a>
                        </p>
                        <h3 id="51-タスク41-コスト最適化ストレージソリューションの設計">
                            5.1 タスク4.1: コスト最適化ストレージソリューションの設計
                        </h3>
                        <h4 id="s3ストレージクラスとライフサイクル管理">
                            S3ストレージクラスとライフサイクル管理
                        </h4>
                        <Diagram id="mermaid-target-18" label="S3ストレージクラスの推移" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ストレージクラス</th>
                                        <th scope="col">適したユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>S3 Standard</td>
                                        <td>頻繁にアクセスするアクティブなデータ</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Intelligent-Tiering</td>
                                        <td>
                                            アクセスパターンが不明・変動するデータ（監視料は発生するが階層移動は自動）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>S3 Standard-IA / One Zone-IA</td>
                                        <td>
                                            月1回程度のアクセス頻度のバックアップ・DR用データ（One Zoneは単一AZのみでコストを抑える）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier Instant Retrieval</td>
                                        <td>
                                            四半期に1回程度アクセスするが、即時取得が必要なアーカイブ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier Flexible Retrieval</td>
                                        <td>
                                            年に1〜2回程度のアクセスで、数分〜数時間の取得時間が許容できるアーカイブ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier Deep Archive</td>
                                        <td>
                                            法規制対応などで長期保存が必要で、ほぼアクセスしない最安価格帯のアーカイブ（取得に12時間程度）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コスト管理機能</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>S3ライフサイクルルール</td>
                                        <td>
                                            経過日数に応じて自動的にストレージクラスを移行・削除するポリシー
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Requester Pays</td>
                                        <td>
                                            データ転送・リクエスト料金をバケット所有者ではなくリクエスト送信者に課金する設定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>S3 Storage Lens</td>
                                        <td>組織全体のS3使用状況・コストの可視化</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- アクセス頻度が明確に予測できるデータはライフサイクルルールで手動階層設計、予測が難しいデータはIntelligent-Tieringに任せる
                            <br />- 頻繁な小容量アップロードよりも、可能であればバッチでまとめてアップロードしリクエスト数課金を抑える
                            <br />- バックアップの保存期間・世代数はコンプライアンス要件を満たす最小限に設定し、過剰な保持によるコスト増を避ける
                            <br />- ブロックストレージ（EBS）は用途に合わせてgp3/st1/sc1等を選び、オーバープロビジョニングを避ける
                        </p>

                        <h3 id="52-タスク42-コスト最適化コンピューティングソリューションの設計">
                            5.2 タスク4.2: コスト最適化コンピューティングソリューションの設計
                        </h3>
                        <h4 id="ec2購入オプションの比較">EC2購入オプションの比較</h4>
                        <Diagram id="mermaid-target-19" label="EC2購入オプション選択ツリー" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">購入オプション</th>
                                        <th scope="col">割引率目安</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>On-Demand</td>
                                        <td>割引なし</td>
                                        <td>
                                            秒単位課金、コミットメント不要。短期・予測不能なワークロードに最適
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Reserved Instances (RI)</td>
                                        <td>最大72%</td>
                                        <td>
                                            1年/3年の期間コミットで割引。特定のインスタンスファミリー・リージョンに紐づく（Standard RI）か、一定の柔軟性を持つ（Convertible RI）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Savings Plans</td>
                                        <td>最大72%</td>
                                        <td>
                                            時間あたりの一定の利用額をコミットする代わりに割引。Compute Savings Plansはインスタンスファミリー・リージョン・OSをまたいで柔軟に適用可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Spot Instances</td>
                                        <td>最大90%</td>
                                        <td>
                                            AWSの余剰キャパシティをSpot価格で利用。2分前通知で中断される可能性があるため、フォールトトレラントな処理向け
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 常時起動する予測可能な本番ワークロードにはSavings Plans/RIを適用し、コミットメントによる割引を最大化する
                            <br />- バッチ処理・ステートレスなWebサーバー・CI/CDビルド等、中断耐性のあるワークロードにはSpotインスタンスを積極活用する
                            <br />- 柔軟性（インスタンスファミリー変更の可能性）が重要ならSavings Plans、確実な予約割引を最大化したいなら条件を固定したRIを選ぶ
                            <br />- Auto Scalingグループ内でOn-Demand・Spotを組み合わせる「混在インスタンスポリシー」でコストと可用性のバランスを取る
                            <br />- AWS Compute Optimizerでインスタンスタイプの過剰プロビジョニングを検出し、適正サイズへ見直す
                        </p>

                        <h4 id="サーバーレスコンテナによるコスト最適化">
                            サーバーレス・コンテナによるコスト最適化
                        </h4>
                        <ul>
                            <li>
                                Lambdaは通常のオンデマンド実行時（Provisioned Concurrency除く）、リクエスト数と実行時間の両方で課金され、アイドル時の実行環境料金が原則発生しないため、リクエスト数が変動するワークロードでコスト効率が良い
                            </li>
                            <li>
                                Fargate SpotはFargateタスクにもSpot割引を適用でき、バッチ的なコンテナワークロードのコストを削減できる
                            </li>
                            <li>
                                EC2 Hibernate（休止）機能で、開発・検証環境など断続利用のインスタンスの起動時間を短縮しコストを抑える
                            </li>
                        </ul>

                        <h3 id="53-タスク43-コスト最適化データベースソリューションの設計">
                            5.3 タスク4.3: コスト最適化データベースソリューションの設計
                        </h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">手法・サービス</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DynamoDBのキャパシティモード</td>
                                        <td>
                                            オンデマンドモード（予測不能なトラフィック向け、リクエスト課金）とプロビジョンド+Auto Scaling（安定した予測可能な負荷向け、事前確保でコスト効率化）を使い分ける
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Aurora Serverless</td>
                                        <td>
                                            負荷に応じて自動でキャパシティをスケールし、アイドル時のコストを抑制。開発環境や断続的な利用パターンのワークロードに有効
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>RIによるDBコスト削減</td>
                                        <td>
                                            RDS/Auroraにも予約インスタンス（Reserved DB Instances）があり、長期稼働が確定した本番DBに適用してコスト削減
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>バックアップ・スナップショット戦略</td>
                                        <td>
                                            保持期間・頻度をデータの重要度に応じて最適化し、不要な長期保持によるストレージコスト増を避ける
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>キャッシング（ElastiCache）</td>
                                        <td>
                                            DBへの読み取りリクエストを削減し、DB側のインスタンスサイズ・IOPSを抑制することで間接的にコストを最適化
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- トラフィックが読めない新規サービスはDynamoDBオンデマンド、安定稼働後はプロビジョンド+Auto Scalingへ移行してコストを最適化する
                            <br />- 開発・検証・不定期利用のAuroraクラスターはAurora Serverless v2を検討し、アイドル時間のコストを削減する
                            <br />- 異なるDBエンジン間の移行（異機種間移行）でライセンスコストの高いエンジン（Oracle/SQL Server）からオープンソース互換のAurora/PostgreSQLへ移行することもコスト最適化の一手段
                        </p>

                        <h3 id="54-タスク44-コスト最適化ネットワークアーキテクチャの設計">
                            5.4 タスク4.4: コスト最適化ネットワークアーキテクチャの設計
                        </h3>
                        <h4 id="natゲートウェイのコスト設計">NATゲートウェイのコスト設計</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">構成</th>
                                        <th scope="col">コスト</th>
                                        <th scope="col">可用性</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AZごとに個別のNATゲートウェイ</td>
                                        <td>高い（AZの数だけ課金）</td>
                                        <td>高い（AZ障害の影響を他AZが受けない）</td>
                                    </tr>
                                    <tr>
                                        <td>単一の共有NATゲートウェイ</td>
                                        <td>低い</td>
                                        <td>低い（そのAZが落ちると他AZからの通信も影響を受ける）</td>
                                    </tr>
                                    <tr>
                                        <td>NATインスタンス（EC2で自前運用）</td>
                                        <td>インスタンス代のみ（小規模なら割安）</td>
                                        <td>自分で冗長化構成を組む必要があり運用負荷が高い</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>ベストプラクティス</strong>
                            <br />- 可用性要件が高い本番環境はAZごとのNATゲートウェイ、コスト優先の開発環境は単一の共有NATゲートウェイという使い分けをする
                        </p>

                        <h4 id="データ転送コストの最適化">データ転送コストの最適化</h4>
                        <Diagram id="mermaid-target-20" label="データ転送コスト構造" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">手法</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>VPCエンドポイント（Gateway型/Interface型）</td>
                                        <td>
                                            S3・DynamoDB等へのアクセスをNATゲートウェイやインターネットを経由せず、プライベートに直結。データ転送料とNATゲートウェイ処理料を削減
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>同一AZ配置の徹底</td>
                                        <td>
                                            頻繁に通信するコンポーネント同士は可能な限り同一AZに配置し、AZ間データ転送料を削減
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CloudFrontによるオリジン保護</td>
                                        <td>
                                            エッジでキャッシュすることでオリジンへのリクエスト数・データ転送量そのものを削減
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Direct Connectの帯域選定</td>
                                        <td>
                                            必要な帯域を過不足なく見積もり、複数の低速回線か単一の高速回線かをコストと冗長性の要件で比較検討する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 id="コスト管理監視ツール">コスト管理・監視ツール</h4>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Cost Explorer</td>
                                        <td>
                                            過去のコスト・使用量の可視化とグラフ分析、将来コストの予測
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Budgets</td>
                                        <td>
                                            予算のしきい値を設定し、超過（見込み含む）時にアラート通知
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Cost and Usage Report (CUR)</td>
                                        <td>
                                            最も詳細な粒度のコスト・使用状況データをS3に出力し、Athena等で分析
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>コスト配分タグ</td>
                                        <td>
                                            プロジェクト・部門・環境ごとにリソースへタグ付けし、コストを按分・集計
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Trusted Advisor</td>
                                        <td>
                                            コスト最適化・パフォーマンス・セキュリティ・耐障害性の観点でベストプラクティスとの差分をチェック
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Compute Optimizer</td>
                                        <td>
                                            過去の使用率メトリクスに基づき、EC2/Lambda/EBS等の適正サイズを推奨
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />

                        {/* セクション 6 */}
                        <h2 id="6-aws-well-architected-framework6つの柱">
                            6. AWS Well-Architected Framework（6つの柱）
                        </h2>
                        <p>
                            4つの試験ドメインは、Well-Architected
                            Frameworkの各柱と密接に対応しています。全体像を押さえておくと、ドメインをまたいだ設問の意図を掴みやすくなります。
                        </p>
                        <Diagram id="mermaid-target-21" label="Well-Architected Framework 6つの柱" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">柱</th>
                                        <th scope="col">中心的な問い</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>運用上の優秀性</td>
                                        <td>システムを運用・監視し、継続的に手順を改善できているか</td>
                                    </tr>
                                    <tr>
                                        <td>セキュリティ</td>
                                        <td>データ・システムを保護し、最小権限を徹底できているか</td>
                                    </tr>
                                    <tr>
                                        <td>信頼性</td>
                                        <td>障害から復旧し、需要を満たし続けられるか</td>
                                    </tr>
                                    <tr>
                                        <td>パフォーマンス効率</td>
                                        <td>
                                            コンピューティングリソースを効率的に活用し、需要の変化に適応できるか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>コスト最適化</td>
                                        <td>最も低いコストでビジネス価値を実現できているか</td>
                                    </tr>
                                    <tr>
                                        <td>持続可能性</td>
                                        <td>環境への影響を最小化する設計になっているか</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-line">
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Well-Architected Framework
                            </a>
                        </p>
                        <hr />

                        {/* セクション 7 */}
                        <h2 id="7-学習の進め方試験当日のコツ">7. 学習の進め方・試験当日のコツ</h2>
                        <h3 id="71-学習ステップ初級者向け">7.1 学習ステップ（初級者向け）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステップ</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1. 基礎サービスのハンズオン</td>
                                        <td>
                                            IAM・EC2・S3・VPC・RDSを実際にコンソールで触り、無料利用枠内で構築・削除を経験する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2. ドメイン別の暗記表整理</td>
                                        <td>
                                            本ガイドの比較表（SG vs NACL、RI vs Savings
                                            Plans等）を自分の言葉で書き出す
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3. アーキテクチャ図を描く練習</td>
                                        <td>
                                            「疎結合」「マルチAZ」「DR戦略」等のキーワードから自分でMermaid/ホワイトボード図を描いてみる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4. 模擬試験で弱点特定</td>
                                        <td>
                                            公式模擬試験・サンプル問題でドメイン別正答率を確認し、弱いドメインの表を再学習する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5. 直前の総復習</td>
                                        <td>
                                            RTO/RPO、ストレージクラス、購入オプションなど「数値・選択肢が近い概念」の比較表を最終確認する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 id="72-頻出の二択多択判断軸まとめ">7.2 頻出の「二択・多択」判断軸まとめ</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">判断軸</th>
                                        <th scope="col">選択肢A</th>
                                        <th scope="col">選択肢B</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>セキュリティの適用単位</td>
                                        <td>セキュリティグループ（インスタンス・ステートフル）</td>
                                        <td>NACL（サブネット・ステートレス）</td>
                                    </tr>
                                    <tr>
                                        <td>疎結合のパターン</td>
                                        <td>SQS（1対1キュー）</td>
                                        <td>SNS（1対多ファンアウト）</td>
                                    </tr>
                                    <tr>
                                        <td>コンテナオーケストレーション</td>
                                        <td>ECS（AWS独自・低学習コスト）</td>
                                        <td>EKS（標準Kubernetes・移植性）</td>
                                    </tr>
                                    <tr>
                                        <td>DBの性質</td>
                                        <td>RDS/Aurora（リレーショナル・複雑なクエリ）</td>
                                        <td>DynamoDB（NoSQL・超低レイテンシ）</td>
                                    </tr>
                                    <tr>
                                        <td>コンピューティング購入</td>
                                        <td>Reserved/Savings Plans（安定稼働の割引）</td>
                                        <td>Spot（中断耐性ある処理の大幅割引）</td>
                                    </tr>
                                    <tr>
                                        <td>ネットワーク接続</td>
                                        <td>VPN（迅速・低コスト）</td>
                                        <td>Direct Connect（専用線・高帯域・低遅延）</td>
                                    </tr>
                                    <tr>
                                        <td>ストレージ共有可否</td>
                                        <td>EBS（単一インスタンス専有）</td>
                                        <td>EFS/FSx（複数インスタンス共有）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 id="73-試験当日のコツ">7.3 試験当日のコツ</h3>
                        <ul>
                            <li>
                                設問文に登場する
                                <strong>数値要件（RTO/RPO、予算、レイテンシ、帯域）</strong>
                                に必ず下線を引く意識で読み、それに最も合致する選択肢を選ぶ
                            </li>
                            <li>
                                「最もコストが低い」「最も運用負荷が低い」「最も可用性が高い」など
                                <strong>評価軸を1つに絞るキーワード</strong>を見逃さない
                            </li>
                            <li>
                                分からない問題はマークして次に進み、無回答のまま提出しない（無回答は不正解と同じ扱いのため）
                            </li>
                            <li>
                                選択肢に複数の正しそうな案がある場合、AWSの推奨アーキテクチャパターン（マネージドサービス優先、疎結合、マルチAZ）に最も近いものを選ぶ
                            </li>
                        </ul>
                        <hr />

                        {/* セクション 8 */}
                        <h2 id="8-参考文献出典一覧">8. 参考文献・出典一覧</h2>
                        <p className="refs-intro">
                            本ガイドはすべて AWS 公式ドキュメントを一次情報として作成しています。試験準備において下記の一次情報を直接参照することを強く推奨します。
                        </p>
                        <div className="refs-grid">
                            {REF_CATEGORIES.map((cat) => (
                                <div key={cat.id} className="refs-card">
                                    <div className="refs-card-header">
                                        <span className="refs-icon" aria-hidden="true">{cat.icon}</span>
                                        <span className="refs-category">{cat.title}</span>
                                        <span className="refs-badge">AWS Docs</span>
                                    </div>
                                    <ul className="refs-list">
                                        {cat.links.map((link) => (
                                            <li key={link.href} className="refs-list-item">
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="refs-link"
                                                >
                                                    <span className="refs-link-arrow" aria-hidden="true">↗</span>
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="footnote">
                            <hr />
                            <ol>
                                <li id="fn:guide">
                                    <p>
                                        <a
                                            href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            AWS Certified Solutions Architect - Associate (SAA-C03) Exam Guide
                                        </a>
                                        &#160;
                                        <a
                                            className="footnote-backref"
                                            href="#fnref:guide"
                                            title="Jump back to footnote 1 in the text"
                                        >
                                            &#8617;
                                        </a>
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </article>
                </main>
            </div>
        </div>
    );
}
