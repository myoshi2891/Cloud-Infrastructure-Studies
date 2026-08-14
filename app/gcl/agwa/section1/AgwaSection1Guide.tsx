'use client';

import { memo, useState } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

export default function AgwaSection1Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const checklistItems = [
        '組織規模とデータソースに応じた移行ツール(データ移行サービス / GWMME / Google Workspace Migrate)を選定した',
        '自動プロビジョニングを導入する場合、エラー監視の運用フローを組み込んだ',
        'SAML SSOのIdP entity ID・Sign-in/Sign-out URL・証明書を正しく設定し、ロールオーバー用に予備証明書も登録した',
        'GCDSとDirectory Syncのどちらが要件(対応ディレクトリ・同期対象・属性マッピング範囲)に合うかを比較した',
        '退職者アカウントの保留 → データ移転・所有権移転 → 削除/アーカイブという順序を運用手順化した',
        'スーパー管理者アカウントに復旧用メールアドレス・電話番号を設定した',
        'OU階層は「ポリシーは上位、例外は下位」の原則に沿ってシンプルに設計されている',
        'グループ作成前に「配布リスト/Collaborative Inbox/ダイナミックグループ/セキュリティグループ」のどれが目的に合うかを判断している',
        'ポリシーを適用するグループはすべてセキュリティグループ化されている',
        'ドメイン追加時に「セカンダリドメイン」と「ドメインエイリアス」の違いを理解した上で選択している',
        '建物とリソースの管理権限を信頼できる担当者に限定している',
        '会議室の自動提案機能を使うため、全ユーザーの勤務地情報と構造化リソース登録を整備した',
    ];

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="agwa-s1-page">
            <div className="layout">
                <NavBar />
                <div className="main">
                    <header className="hero">
                        <span className="hero-badge">
                            Associate Google Workspace Administrator &middot; Section 1 &middot; 出題比率 約20%
                        </span>
                        <h1>ユーザーアカウント・ドメイン・ディレクトリの管理</h1>
                    </header>

                    <h2 id="section-1-ユーザーアカウントドメインディレクトリの管理">
                        Section 1: ユーザーアカウント・ドメイン・ディレクトリの管理
                    </h2>
                    <blockquote className="lede-card">
                        <p>
                            本ガイドは Google 公式の{' '}
                            <a
                                href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Associate Google Workspace Administrator 認定ページ
                            </a>{' '}
                            および{' '}
                            <a
                                href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                公式 Exam Guide (PDF)
                            </a>{' '}
                            の{' '}
                            <strong>
                                Section 1: Managing user accounts, domains, and Directory(出題比率 約20%)
                            </strong>{' '}
                            に完全準拠して構成しています。中級〜上級管理者を対象に、Admin console の操作手順だけでなく「なぜそう設計するのか」という設計判断の根拠までを解説します。
                        </p>
                    </blockquote>

                    <h2 id="この章の位置づけ">この章の位置づけ</h2>
                    <p>Exam Guide が定義する Section 1 は、以下の5つのタスクで構成されます。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タスク</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">本ガイドの章</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>1.1</td>
                                    <td>
                                        ユーザーライフサイクルの管理(移行・作成・プロビジョニング・SSO・同期・属性変更・削除/保留/復元/アーカイブ・所有権移転・ライセンス・パスワード)
                                    </td>
                                    <td>
                                        <a href="#11-ユーザーライフサイクルの管理">1.1</a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>1.2</td>
                                    <td>組織部門(OU)の設計と作成</td>
                                    <td>
                                        <a href="#12-組織部門ouの設計と作成">1.2</a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>1.3</td>
                                    <td>
                                        グループの管理(構造設計・配布リスト・Collaborative Inbox・ダイナミックグループ・セキュリティグループ)
                                    </td>
                                    <td>
                                        <a href="#13-グループの管理">1.3</a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>1.4</td>
                                    <td>
                                        ドメインの管理(プライマリ/セカンダリドメインの追加と検証・ドメインエイリアス)
                                    </td>
                                    <td>
                                        <a href="#14-ドメインの管理">1.4</a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>1.5</td>
                                    <td>
                                        建物とリソースの管理(建物/部屋の一括作成・リソース管理・予約権限・機能設定)
                                    </td>
                                    <td>
                                        <a href="#15-建物とリソースの管理">1.5</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />
                    <hr />

                    <div className="quicknav-grid">
                        <a href="#11-ユーザーライフサイクルの管理" className="quicknav-card">
                            <span className="quicknav-num">1.1</span>
                            <span className="quicknav-title">ユーザーライフサイクル管理</span>
                            <span className="quicknav-desc">移行・プロビジョニング・SSO・削除/保留/復元/アーカイブ</span>
                        </a>
                        <a href="#12-組織部門ouの設計と作成" className="quicknav-card">
                            <span className="quicknav-num">1.2</span>
                            <span className="quicknav-title">組織部門(OU)の設計と作成</span>
                            <span className="quicknav-desc">階層設計の原則とベストプラクティス</span>
                        </a>
                        <a href="#13-グループの管理" className="quicknav-card">
                            <span className="quicknav-num">1.3</span>
                            <span className="quicknav-title">グループの管理</span>
                            <span className="quicknav-desc">配布リスト・Collaborative Inbox・ダイナミック・セキュリティ</span>
                        </a>
                        <a href="#14-ドメインの管理" className="quicknav-card">
                            <span className="quicknav-num">1.4</span>
                            <span className="quicknav-title">ドメインの管理</span>
                            <span className="quicknav-desc">プライマリ/セカンダリドメインとドメインエイリアス</span>
                        </a>
                        <a href="#15-建物とリソースの管理" className="quicknav-card">
                            <span className="quicknav-num">1.5</span>
                            <span className="quicknav-title">建物とリソースの管理</span>
                            <span className="quicknav-desc">建物・会議室・機能(Features)・予約権限</span>
                        </a>
                    </div>

                    <h2 id="11-ユーザーライフサイクルの管理">1.1 ユーザーライフサイクルの管理</h2>
                    <p>
                        ユーザーライフサイクル管理とは、入社(プロビジョニング)から異動、退職(デプロビジョニング)までの一連のアカウント状態遷移を、安全かつ再現性高く運用する仕組みです。試験では「どのツールをどの規模・要件に使うか」という判断軸が繰り返し問われます。
                    </p>

                    <h3 id="111-移行戦略とツールの選定">1.1.1 移行戦略とツールの選定</h3>
                    <p>
                        既存のメール基盤(Microsoft Exchange、他社IMAPサーバーなど)から Google Workspace へ移行する際、組織の規模とデータ種別によって適切なツールが変わります。
                    </p>

                    <Diagram id="diag-migration" label="移行戦略とツールの選定フロー" />

                    <ul>
                        <li>
                            <strong>データ移行サービス(新しいセルフガイド型ツール)</strong>:Admin console から直接実行できるシンプルな移行フロー。管理者向けの移行では、データソースの種類と組織の規模に応じて適切なドキュメントを選ぶことが推奨されている。
                        </li>
                        <li>
                            <strong>GWMME(Google Workspace Migration for Microsoft Outlook)</strong>:IMAP・Gmail・Google Workspaceからの移行ではメールとラベルデータのみをコピーし、カレンダーの予定・カレンダーリソース・連絡先・Google Driveのファイル・Google Sitesなどのメール以外のコンテンツは対象に含まれない点に注意。
                        </li>
                        <li>
                            <strong>Google Workspace Migrate</strong>:1,001ユーザー以上の大規模移行向けに設計されており、製品のインストールや構成が複雑なため利用が難しい場合がある。
                        </li>
                    </ul>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/9413033?hl=en" target="_blank" rel="noopener noreferrer">Google Workspace migration product matrix</a></p>
                    </blockquote>

                    <h3 id="112-手動でのユーザーアカウント作成">1.1.2 手動でのユーザーアカウント作成</h3>
                    <p>
                        小規模組織や例外的なアカウントでは、Admin console から個別にユーザーを作成します。CSVファイルによる一括作成(複数ユーザーの追加・更新)も可能です。
                    </p>
                    <p><strong>ベストプラクティス</strong>:</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">推奨事項</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>命名規則</td>
                                    <td>一貫した命名規則(例:firstname.lastname)を早期に確立し、後からの変更コストを避ける</td>
                                </tr>
                                <tr className="even">
                                    <td>アカウント共有の禁止</td>
                                    <td>1人1アカウントを原則とし、複数人での共同利用アカウントは作らない(監査証跡・セキュリティの観点)</td>
                                </tr>
                                <tr className="odd">
                                    <td>初期OU配置</td>
                                    <td>作成時点で適切なOUに配置する(後からの移動も可能だが、初期設計を明確にしておくと運用が楽になる)</td>
                                </tr>
                                <tr className="even">
                                    <td>デフォルト言語・タイムゾーン</td>
                                    <td>新規ユーザーの既定言語・タイムゾーンを組織の主要拠点に合わせて設定しておく</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="113-プロビジョニングデプロビジョニングの自動化">1.1.3 プロビジョニング・デプロビジョニングの自動化</h3>
                    <p>
                        大規模組織では、人事システムや外部IdPと連携した自動プロビジョニングが標準です。Google Workspace は多数のSaaSアプリに対して自動ユーザープロビジョニングの構成ガイドを提供しています(Slack、Salesforce、Box、Zendesk、AWS など50以上のアプリ)。
                    </p>

                    <Diagram id="diag-provisioning" label="プロビジョニング・デプロビジョニング自動化アーキテクチャ" />

                    <p>
                        自動プロビジョニングを監視するには、Admin console でエラーを可視化する専用の画面が用意されています。設定後は必ず <strong>自動プロビジョニングエラーの表示</strong> 機能でエラーを定期的に確認する運用を組み込むことがベストプラクティスです。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/advanced/about-automated-user-provisioning" target="_blank" rel="noopener noreferrer">About automated user provisioning</a> / <a href="https://knowledge.workspace.google.com/admin/users/advanced/view-auto-provisioning-errors" target="_blank" rel="noopener noreferrer">View auto-provisioning errors</a></p>
                    </blockquote>

                    <h3 id="114-サードパーティidプロバイダによるプロビジョニングと認可">
                        1.1.4 サードパーティIDプロバイダによるプロビジョニングと認可
                    </h3>
                    <p>
                        「プロビジョニング(アカウントの作成・属性同期)」と「認可(サインイン時の認証)」は別の関心事です。Okta、Microsoft Entra ID(旧Azure AD)、Ping Identity のような外部IdPを使う場合、一般的な構成は次の通りです。
                    </p>
                    <ol type="1">
                        <li>
                            <strong>プロビジョニング</strong>:外部IdP側でユーザー・グループの正が管理され、SCIMまたはGoogle Cloud Directory Sync(GCDS)/Directory Syncを通じてGoogle Workspace側にミラーリングされる。
                        </li>
                        <li>
                            <strong>認可(認証)</strong>:ユーザーがGoogleサービスにアクセスする際、SAML SSOを通じて外部IdPで認証が行われ、Googleはこれを信頼する(Google = Service Provider)。
                        </li>
                    </ol>
                    <p>この「プロビジョニングは同期ツール、認証はSAML」という役割分担は、試験で頻出する設計上の区別です。</p>

                    <h3 id="115-基本的なsaml-ssoの設定">1.1.5 基本的なSAML SSOの設定</h3>
                    <p>Google Workspace は SAML ベースの SSO を2方向でサポートします。</p>

                    <Diagram id="diag-sso" label="SAML SSO 認証シーケンス" />

                    <p>
                        ユーザーがGmailやカレンダーなどのホスト型Googleアプリケーションにアクセスしようとすると、GoogleはSAML認証リクエストを生成し、これをエンコードしてパートナーのSSOサービスへのURLに埋め込む。RelayStateパラメータにはユーザーが本来アクセスしようとしていたGoogleアプリケーションのURLがエンコードされて含まれ、このRelayStateは変更・検査されることなくそのまま返送される、不透明な識別子として扱われる。
                    </p>
                    <p><strong>Admin console での設定手順(Google = Service Provider)</strong>:</p>
                    <ol type="1">
                        <li>
                            <code>セキュリティ &gt; 認証 &gt; SSO with third-party IdP</code> へ移動(Security Settings 管理者権限が必要)。
                        </li>
                        <li>
                            「Third-party SSO profiles」で <strong>Add SAML profile</strong> をクリックし、プロファイル名を入力。
                        </li>
                        <li>
                            IdP側から取得した <strong>IdP entity ID</strong>、<strong>Sign-in page URL(SSO URL)</strong>、<strong>Sign-out page URL</strong> を入力。
                        </li>
                        <li><strong>Change password URL</strong> にIdP側のパスワード変更URLを設定。</li>
                        <li>
                            IdPから発行された署名検証用証明書をアップロード(ローテーション用に最大2枚まで登録可能)。
                        </li>
                        <li>
                            保存後に生成される <strong>Entity ID</strong> と <strong>ACS URL</strong> をコピーし、IdP側の設定に反映する。
                        </li>
                    </ol>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/apps/setting-up-sso" target="_blank" rel="noopener noreferrer">Setting up SSO</a> / <a href="https://support.google.com/a/answer/60224?hl=en" target="_blank" rel="noopener noreferrer">About SSO</a> / <a href="https://knowledge.workspace.google.com/admin/apps/technical-overview-of-saml-based-sso" target="_blank" rel="noopener noreferrer">Technical overview of SAML-based SSO</a></p>
                    </blockquote>

                    <p>
                        反対に、Google Workspace アカウントを <strong>Identity Provider</strong> としてサードパーティアプリのSSOに使う場合は、<code>アプリ &gt; Web と モバイルアプリ &gt; Add App &gt; Add custom SAML app</code> からカスタムSAMLアプリを登録し、Google IdPのメタデータ(SSO URL・Entity ID・証明書)をサービスプロバイダ側に設定します。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/6087519?hl=en" target="_blank" rel="noopener noreferrer">Set up your own custom SAML app</a></p>
                    </blockquote>

                    <h3 id="116-ファーストパーティ同期ツールのユースケース">
                        1.1.6 ファーストパーティ同期ツールのユースケース
                    </h3>
                    <p>
                        「同期(Directory Sync系)」と「移行(GWMMEなど)」は別物です。GCDS(Google Cloud Directory Sync)はコンテンツ(メールメッセージ・カレンダーの予定・ファイルなど)を一切移行せず、LDAPサーバーの情報に合わせてGoogleのユーザー・グループ・共有連絡先を同期するためだけに使われる。
                    </p>
                    <p>
                        Google は現在、レガシーな <strong>GCDS</strong>(オンプレミスにインストールするユーティリティ)と、新しい <strong>Directory Sync</strong>(クラウドベースのベータ機能)の2つの同期ツールを提供しています。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">比較項目</th>
                                    <th scope="col">GCDS</th>
                                    <th scope="col">Directory Sync</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>インストール</td>
                                    <td>オンプレミスソフトウェアのインストールが必要</td>
                                    <td>クラウドベースのソリューションでインストール不要</td>
                                </tr>
                                <tr className="even">
                                    <td>対応ディレクトリ</td>
                                    <td>Active DirectoryやOpenLDAPを含む全てのLDAP準拠ディレクトリに対応</td>
                                    <td>Microsoft Active Directory (AD) と Microsoft Azure Active Directory (Azure AD) に対応</td>
                                </tr>
                                <tr className="odd">
                                    <td>接続方式</td>
                                    <td>通常はLDAPサーバーと同一ネットワーク上に配置される</td>
                                    <td>ADの場合はCloud VPNまたはCloud Interconnectを使用してオンプレミスのLDAPサーバーにアクセスし、Azure ADの場合は管理者のMicrosoft資格情報を使って接続する</td>
                                </tr>
                                <tr className="even">
                                    <td>同期対象データ</td>
                                    <td>管理者を含むユーザー、グループ、カレンダーリソース、外部連絡先、パスワード</td>
                                    <td>非管理者ユーザーとグループのみ</td>
                                </tr>
                                <tr className="odd">
                                    <td>複数ソース同期</td>
                                    <td>不可</td>
                                    <td>ADは複数ディレクトリからの同期に対応するが、Azure ADは1つのディレクトリのみ対応</td>
                                </tr>
                                <tr className="even">
                                    <td>セットアップの複雑さ</td>
                                    <td>組織のニーズによっては非常に複雑になり得る</td>
                                    <td>Google Admin consoleを使ったシンプルなセットアップ</td>
                                </tr>
                                <tr className="odd">
                                    <td>同期頻度</td>
                                    <td>管理者が構成可能。自動化には別途スケジューリングソフトウェアが必要</td>
                                    <td>フル同期は前回の同期完了から1時間後に開始し、この間隔は変更不可</td>
                                </tr>
                                <tr className="even">
                                    <td>トラブルシューティング</td>
                                    <td>複数サーバーからログファイルを集約する必要がある場合がある</td>
                                    <td>Google Admin consoleで一元的にレポートされ、フィルタ・検索・カスタムアラートの設定が可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>属性マッピング</td>
                                    <td>最大35のシステム属性とカスタム属性をマッピング可能</td>
                                    <td>姓・名・メールアドレス・復旧用電話番号・復旧用メールアドレスをマッピング可能</td>
                                </tr>
                                <tr className="even">
                                    <td>OUマッピング</td>
                                    <td>指定したOUへ自動的にユーザーを配置</td>
                                    <td>ユーザーを指定したOUへマッピング可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram id="diag-gcds" label="GCDS 同期アーキテクチャ" />

                    <p>
                        GCDSの動作は、まずルールを設定してデータのリストをどのように生成するかを指定し、同期時にそのリストをLDAPサーバーからエクスポートし、GCDSがGoogleアカウントに接続して指定したユーザー・グループ・共有連絡先のリストを生成し、これらのリストを比較してGoogleアカウントをデータに一致するよう更新し、同期後に監視できるようメールレポートを受け取るという流れになる。
                    </p>
                    <p>
                        <strong>試験のポイント</strong>:「LDAP準拠ディレクトリ全般(OpenLDAPを含む)からの同期」「35属性のカスタムマッピング」「パスワード同期」が必要な場合は <strong>GCDS</strong>。「AD/Azure ADのみで、クラウドネイティブかつセットアップの簡易性」を重視する場合は <strong>Directory Sync</strong> を選ぶ、という判断軸を押さえておきます。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/about-google-cloud-directory-sync" target="_blank" rel="noopener noreferrer">About Google Cloud Directory Sync</a> / <a href="https://knowledge.workspace.google.com/admin/users/compare-directory-sync-with-gcds" target="_blank" rel="noopener noreferrer">Compare Directory Sync with GCDS</a></p>
                    </blockquote>

                    <h3 id="117-ユーザー属性の変更">1.1.7 ユーザー属性の変更</h3>
                    <p>Admin console または Directory API を通じて、氏名・メールアドレス・パスワード・エイリアスなどの属性を変更できます。</p>
                    <ul>
                        <li>
                            <strong>氏名の変更</strong>:プロフィール名の変更はDirectory上の表示に反映されるが、既存ファイルの共有権限やメール履歴には旧名義の記録が残る場合がある。
                        </li>
                        <li>
                            <strong>メールアドレス(プライマリ)の変更</strong>:多くのGoogleアプリのデータ(Drive、カレンダーなど)に影響するため、変更前に利用者への周知が推奨される。
                        </li>
                        <li>
                            <strong>エイリアス(alternate email address)の追加</strong>:1ユーザーに最大30個のメールエイリアスを追加可能。エイリアス宛のメールはプライマリの受信トレイに届く。
                        </li>
                        <li>
                            <strong>カスタム属性</strong>:組織固有の情報(社員番号、コストセンターなど)をユーザープロフィールに追加し、検索やダイナミックグループのクエリ条件として利用できる。
                        </li>
                    </ul>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/overview-changing-a-directory-users-name-or-email-address" target="_blank" rel="noopener noreferrer">Overview: Changing a Directory user&apos;s name or email address</a> / <a href="https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias" target="_blank" rel="noopener noreferrer">Add or delete an alternate email address (email alias)</a> / <a href="https://knowledge.workspace.google.com/admin/users/create-custom-attributes-for-user-profiles" target="_blank" rel="noopener noreferrer">Create custom attributes for user profiles</a></p>
                    </blockquote>

                    <h3 id="118-削除保留復元アーカイブ">1.1.8 削除・保留・復元・アーカイブ</h3>
                    <p>
                        ユーザーアカウントは以下の状態を遷移します。試験では「一時的な利用停止(保留)」「完全な削除」「ライセンスコストを抑えつつデータを保持するアーカイブ」の3つの使い分けが問われます。
                    </p>

                    <Diagram id="diag-state" label="ユーザーアカウント状態遷移" />

                    <ul>
                        <li>
                            <strong>保留(Suspend)</strong>:アカウントを一時的に無効化する。ログイン不可になるがデータ・ライセンスはそのまま保持される。不正が疑われるアカウントの緊急停止や、長期休職者の一時無効化に利用する。
                        </li>
                        <li>
                            <strong>削除(Delete)</strong>:アカウントを組織から削除する。削除後20日間は管理者が復元可能な猶予期間があり、それを過ぎると完全に削除されデータは失われる。
                        </li>
                        <li>
                            <strong>復元(Restore)</strong>:削除猶予期間内であれば、Admin consoleからユーザーとそのデータ(Gmail、Drive、カレンダーなど)を復元できる。
                        </li>
                        <li>
                            <strong>アーカイブ(Archive)</strong>:退職者アカウントのデータを保持しつつ、通常ライセンスより低コストな <strong>Archived User license</strong> に切り替える機能。ログインはできないが、Vaultによる保持・eDiscoveryの対象にはなり続ける。
                        </li>
                    </ul>
                    <p>
                        <strong>ベストプラクティス</strong>:退職者アカウントは即座に削除せず、まず保留にしてからデータ移転(下記1.1.9)とライセンス精算を行い、法的保持義務がある場合はアーカイブへ切り替える、という順序を踏むことでデータ損失リスクを避けられます。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/delete-or-remove-a-user-from-your-organization" target="_blank" rel="noopener noreferrer">Delete or remove a user from your organization</a> / <a href="https://knowledge.workspace.google.com/admin/users/suspend-a-user-temporarily" target="_blank" rel="noopener noreferrer">Suspend a user temporarily</a> / <a href="https://knowledge.workspace.google.com/admin/users/restore-a-recently-deleted-user" target="_blank" rel="noopener noreferrer">Restore a recently deleted user</a> / <a href="https://knowledge.workspace.google.com/admin/users/archive-former-employee-accounts" target="_blank" rel="noopener noreferrer">Archive former employee accounts</a> / <a href="https://knowledge.workspace.google.com/admin/users/maintain-data-security-after-an-employee-leaves" target="_blank" rel="noopener noreferrer">Maintain data security after an employee leaves</a></p>
                    </blockquote>

                    <h3 id="119-driveデータの所有権移転">1.1.9 Driveデータの所有権移転</h3>
                    <p>
                        退職・異動時には、個人のマイドライブ配下にあるファイル・フォルダの所有権を後任者やチームの共有ドライブへ移す必要があります。Admin consoleの <strong>Transfer ownership</strong> ツール、またはユーザー削除フロー内の「データ移行」オプションから一括移転が可能です。移転後、新しい所有者は元の共有権限を引き継いだ状態でファイルを管理できます。恒久的なコラボレーションが前提のファイルは、個人所有からそもそも <strong>共有ドライブ</strong> へ移しておくことで、退職時の所有権移転作業自体を不要にできます。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/drive/transfer-drive-files-to-a-new-owner-as-an-admin" target="_blank" rel="noopener noreferrer">Transfer Drive files to a new owner as an admin</a></p>
                    </blockquote>

                    <h3 id="1110-ライセンス管理">1.1.10 ライセンス管理</h3>
                    <p>
                        ユーザーごとに異なるエディション(Business Starter/Standard/Plus、Enterprise各種など)や追加プロダクト(Vault、Voice、Colab Proなど)のライセンスを個別に割り当てられます。GCDSを使う場合は同期プロセスの一部としてライセンスの自動割り当て・削除も設定可能です。ライセンス管理のベストプラクティスとして、OU単位でデフォルトのライセンスセットを決めておき、例外的なライセンス(高コストなアドオン等)は個別ユーザー単位で付与する運用が推奨されます。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/manage-and-assign-licenses" target="_blank" rel="noopener noreferrer">Manage and assign licenses (GCDS)</a></p>
                    </blockquote>

                    <h3 id="1111-パスワード管理">1.1.11 パスワード管理</h3>
                    <p>
                        管理者はパスワードポリシー(最小文字数、複雑性、有効期限)を組織またはOU単位で強制でき、パスワードのリセット・強制変更・強度モニタリングを行えます。
                    </p>
                    <ul>
                        <li>
                            <strong>パスワードリセット</strong>:Admin consoleから個別ユーザーのパスワードを即座にリセット可能。次回ログイン時の強制変更も設定できる。
                        </li>
                        <li>
                            <strong>強制変更(Force password change)</strong>:侵害の疑いがあるアカウントに対して、次回ログイン時にパスワード変更を要求する。
                        </li>
                        <li>
                            <strong>パスワード強度の監視</strong>:Admin consoleの「パスワード監査」レポートで、脆弱なパスワードや使い回されているパスワードを持つユーザーを一覧表示できる(パスワード自体は管理者にも表示されない)。
                        </li>
                        <li>
                            <strong>リカバリー情報</strong>:スーパー管理者自身のパスワード復旧用に、復旧用メールアドレス・電話番号の設定が強く推奨される(管理者アカウントのロックアウトを防ぐため)。
                        </li>
                    </ul>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/enforce-and-monitor-password-requirements-for-users" target="_blank" rel="noopener noreferrer">Enforce and monitor password requirements for users</a> / <a href="https://knowledge.workspace.google.com/admin/users/reset-a-users-password" target="_blank" rel="noopener noreferrer">Reset a user&apos;s password</a> / <a href="https://knowledge.workspace.google.com/admin/users/allow-super-administrators-to-recover-their-password" target="_blank" rel="noopener noreferrer">Allow super administrators to recover their password</a></p>
                    </blockquote>

                    <hr />

                    <h2 id="12-組織部門ouの設計と作成">1.2 組織部門(OU)の設計と作成</h2>
                    <h3 id="121-ouとドメイングループの違い">1.2.1 OUとドメイン・グループの違い</h3>
                    <p>
                        OU(Organizational Unit)は「どのユーザー・デバイスに、どのサービス設定を適用するか」を制御するための階層コンテナです。試験で頻出する誤解を、公式FAQに基づき整理します。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">質問</th>
                                    <th scope="col">回答</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>組織構造を必ず定義する必要があるか</td>
                                    <td>いいえ。組織構造を定義しない場合、Admin consoleで行う設定はすべてのユーザー・デバイスに等しく適用される</td>
                                </tr>
                                <tr className="even">
                                    <td>OUはドメインと関連しているか</td>
                                    <td>いいえ。ユーザーの組織部門はそのユーザーに利用可能なサービス・機能を決定し、ユーザーのドメインはアカウントのユーザー名・メールアドレスを決定する。OUはドメインをまたいで複数のユーザーを含むことができ、同一ドメイン内のユーザーも任意の数のOUに分散できる</td>
                                </tr>
                                <tr className="odd">
                                    <td>OUはアクセスグループ・構成グループと同じか</td>
                                    <td>いいえ。OUはユーザー集合に対して利用可能なサービス・機能を決定するもので、アクセスグループはOU内または複数OUをまたいだユーザー集合に対してサービスをオンにするもの、構成グループはユーザー集合に対して設定をカスタマイズするもの</td>
                                </tr>
                                <tr className="even">
                                    <td>OUは社内LDAP構造と一致させる必要があるか</td>
                                    <td>いいえ。Admin console内の組織構造はどのサービス・機能がユーザーに利用可能かのみを制御するものであり、LDAP構造に合わせることは任意。合わせたい場合はGoogle Cloud Directory Syncツールを使って実現できる</td>
                                </tr>
                                <tr className="odd">
                                    <td>単一ユーザーだけに設定をカスタマイズできるか</td>
                                    <td>はい。特定の1ユーザーだけにサービスアクセスをカスタマイズしたい場合は、そのユーザーのみを含むOUを作成すればよい</td>
                                </tr>
                                <tr className="even">
                                    <td>特定OUに対してのみ操作できる管理者を作れるか</td>
                                    <td>はい。User managementロールを持つ管理者を割り当て、特定の組織部門内のユーザーに対してのみ操作を許可できる</td>
                                </tr>
                                <tr className="odd">
                                    <td>大規模組織でOU構造は速度に影響するか</td>
                                    <td>はい。5万人以上のユーザーを追加する場合は、アカウント作成のパフォーマンスを高めるため組織構造をできるだけシンプルかつフラットに保つのがよく、後からより深い階層を追加することも可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="122-ou設計のベストプラクティス">1.2.2 OU設計のベストプラクティス</h3>

                    <Diagram id="diag-ou" label="推奨される OU 階層構造モデル" />

                    <ul>
                        <li>
                            <strong>ポリシーは上位、例外は下位に</strong>:全社共通ポリシーはトップレベルOUで設定し、部門固有の例外のみを子OUで上書きする。子OUは親の設定を継承し、必要な項目だけをオーバーライドする。
                        </li>
                        <li>
                            <strong>職務・アクセス要件で分割する</strong>:部署名そのものより「どのサービスアクセスが必要か」という軸で設計すると、組織変更(部署名の変更など)に強い構造になる。
                        </li>
                        <li>
                            <strong>階層は浅く保つ</strong>:深すぎるネストは管理・トラブルシューティングを複雑にする。特に大規模ユーザー追加時はパフォーマンスにも影響する。
                        </li>
                        <li>
                            <strong>命名規則を統一する</strong>:OUパスは一意な識別子であり、命名が曖昧だと誤設定のリスクが高まる。
                        </li>
                        <li>
                            <strong>定期的な棚卸し</strong>:異動・組織変更に応じてOU所属を定期的に見直す運用を組み込む。
                        </li>
                        <li>
                            <strong>単一ユーザー例外にはOUを使う</strong>:特定の1人にだけ異なるサービス設定を適用したい場合、アクセスグループより先にOUによる分離を検討する(公式FAQで明示的にサポートされる方法)。
                        </li>
                    </ul>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/4390551?hl=en-na" target="_blank" rel="noopener noreferrer">Organizational policies FAQ</a> / <a href="https://knowledge.workspace.google.com/admin/users/advanced/how-the-organizational-structure-works" target="_blank" rel="noopener noreferrer">How the organizational structure works</a></p>
                    </blockquote>

                    <h3 id="123-ouの作成と管理">1.2.3 OUの作成と管理</h3>
                    <ol type="1">
                        <li>
                            <code>ディレクトリ &gt; 組織部門</code> から対象の親OUにカーソルを合わせ、<strong>新しい組織部門を作成</strong> を選択。
                        </li>
                        <li>OU名と説明を入力し、親OUを指定して作成する。</li>
                        <li>
                            ユーザーやデバイスは作成時、または後から <strong>ユーザーを組織部門に移動</strong> の操作でOUへ割り当てる。
                        </li>
                        <li>
                            OUの移動・名称変更・削除を行う場合、ローカル設定(そのOUで個別に設定した項目)は保持されるが、継承設定(親から引き継いでいた項目)は新しい親OUの値に変わる点に注意する。
                        </li>
                    </ol>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/users/advanced/add-an-organizational-unit" target="_blank" rel="noopener noreferrer">Add an organizational unit</a> / <a href="https://knowledge.workspace.google.com/admin/users/advanced/move-users-to-an-organizational-unit" target="_blank" rel="noopener noreferrer">Move users to an organizational unit</a> / <a href="https://knowledge.workspace.google.com/admin/users/advanced/move-rename-or-delete-an-organizational-unit" target="_blank" rel="noopener noreferrer">Move, rename, or delete an organizational unit</a></p>
                    </blockquote>

                    <hr />

                    <h2 id="13-グループの管理">1.3 グループの管理</h2>
                    <h3 id="131-グループ構造の設計">1.3.1 グループ構造の設計</h3>
                    <p>
                        Google Groups は「メーリングリスト」「Q&amp;Aフォーラム/コミュニティフォーラム」「Collaborative Inbox(共同トレイ)」「アクセスグループ」「セキュリティグループ」など複数の機能を1つの基盤(Groups for Business)で提供します。設計時は「このグループの主目的は何か」を先に決め、目的に応じたグループ種別・アクセス設定を選びます。
                    </p>

                    <Diagram id="diag-group" label="グループ種別選定チャート" />

                    <h3 id="132-配布リストの作成と管理">1.3.2 配布リストの作成と管理</h3>
                    <p>
                        最も基本的なグループ形態で、グループ宛のメールをメンバー全員に配信します。作成は <code>ディレクトリ &gt; グループ &gt; グループを作成</code> から行い、名前・メールアドレス・説明を設定した後、アクセス設定(誰が投稿できるか、外部からの投稿を許可するか等)を構成します。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/groups/create-a-group-in-your-organization" target="_blank" rel="noopener noreferrer">Create a group in your organization</a></p>
                    </blockquote>

                    <h3 id="133-collaborative-inbox共同トレイの作成と管理">
                        1.3.3 Collaborative Inbox(共同トレイ)の作成と管理
                    </h3>
                    <p>
                        Collaborative Inbox は Google Groups を拡張し、チームで共有メールアドレス(<code>support@</code>、<code>info@</code>など)を運用するための機能です。標準の配布リストに対して以下の機能が追加されます。
                    </p>
                    <ul>
                        <li>会話をメンバーに <strong>割り当て(assign)</strong> できる</li>
                        <li>会話に <strong>ステータス(未対応・対応中・完了・重複)</strong> を設定できる</li>
                        <li>誰が現在どのメールに対応しているかを可視化する「衝突検知」に近い運用ができる</li>
                    </ul>
                    <p>
                        設定はグループの <code>管理 &gt; 全般設定</code> から <strong>Collaborative Inbox</strong> のポスティング権限を有効化することで行います。既存の配布リストを後から Collaborative Inbox に切り替えることも可能です。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/users/answer/10375787" target="_blank" rel="noopener noreferrer">Make a group a Collaborative Inbox</a> / <a href="https://knowledge.workspace.google.com/admin/groups/add-features-and-manage-conversations-in-google-groups" target="_blank" rel="noopener noreferrer">Add features and manage conversations in Google Groups</a></p>
                    </blockquote>

                    <h3 id="134-ダイナミックグループの作成と管理">1.3.4 ダイナミックグループの作成と管理</h3>
                    <p>
                        ダイナミックグループは、メンバーシップクエリの条件に一致するユーザーを <strong>自動的に</strong> 追加・削除するグループです。部署異動や拠点変更が多い組織で、手動メンテナンスの負荷を大きく下げられます。
                    </p>
                    <p>
                        ダイナミックグループのメンバーシップは他のグループと異なり、メンバーを手動で追加することはできずメンバーを変更するにはメンバーシップクエリ自体を変更する必要があり、メンバーになれるのはユーザーのみでグループはメンバーシップ条件を満たせないためグループをダイナミックグループに追加することはできず、ダイナミックグループ自体も他のグループのメンバーにすることはできない。
                    </p>

                    <Diagram id="diag-dynamic" label="ダイナミックグループの同期メカニズム" />

                    <p><strong>作成手順の要点</strong>:</p>
                    <ol type="1">
                        <li>
                            <code>ディレクトリ &gt; グループ</code> から <strong>ダイナミックグループを作成</strong> を選択(Groups管理者権限が必要)。
                        </li>
                        <li>
                            <strong>条件リスト</strong>(例:ユーザーの部署)と <strong>値</strong>(具体的な部署名)を選び、条件式(クエリ)を組み立てる。クエリの最大文字数は10,000文字。
                        </li>
                        <li>
                            複数条件は <strong>And(&amp;&amp;)</strong> または <strong>Or(||)</strong> で結合可能。特定条件を除外する場合は Exclude を使う。
                        </li>
                        <li>
                            ゲストユーザーは外部コラボレーターであるためダイナミックグループには既定で含まれず、クエリには自動的に <code>is_guest_user == false</code> の除外条件が付加される。
                        </li>
                        <li>
                            プレビューでメンバー候補を確認してから作成。1組織あたり最大500個のダイナミックグループを作成できる(上限緩和は個別申請が必要)。
                        </li>
                    </ol>
                    <p>
                        <strong>ダイナミックセキュリティグループ</strong>:ダイナミックグループでポリシーを強制するには、まず条件を満たすユーザーのダイナミックグループを作成し、そのグループにSecurityラベルを追加し、構成グループの手順に従ってポリシーを作成し優先順位を選択するという3ステップで実現する。これにより、例えば「特定拠点に異動した瞬間に該当のセキュリティポリシーが自動適用される」といった運用が可能になります。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/10286834" target="_blank" rel="noopener noreferrer">Manage membership automatically with dynamic groups</a> / <a href="https://cloud.google.com/identity/docs/how-to/dynamic-groups-attributes" target="_blank" rel="noopener noreferrer">Valid user fields for dynamic group queries</a></p>
                    </blockquote>

                    <h3 id="135-セキュリティグループの作成管理適用">
                        1.3.5 セキュリティグループの作成・管理・適用
                    </h3>
                    <p>
                        セキュリティグループは、機密データやリソースへのアクセス制御を目的として設計された、より厳格なガバナンスを持つグループです。
                    </p>
                    <p>
                        グループにSecurityラベルを付与することでセキュリティグループになり、この操作は永続的でセキュリティ機能を追加するが元のグループの他の機能を削除するものではない。Securityラベルが付いたグループはGoogle Admin console上で簡単にソートできる。
                    </p>
                    <p><strong>セキュリティグループを使うべき場面</strong>:</p>
                    <ul>
                        <li>
                            外部または非セキュリティグループが特定のグループに参加するのを防ぎたいとき —— セキュリティグループに参加できるのは同一組織内のセキュリティグループのみ
                        </li>
                        <li>
                            親グループが許可するメンバーのみをグループに含めたいとき —— セキュリティグループに参加するグループは、同等かそれ以上に制限的なメンバーシップ権限を持つ必要がある
                        </li>
                        <li>
                            グループにセキュリティポリシーを適用したいとき —— ポリシーを適用するグループは全てセキュリティグループにすることが推奨される
                        </li>
                        <li>
                            組織の全ユーザーをグループに自動追加するオプションを無効化したいとき —— セキュリティグループのメンバーシップは、許可したユーザー・サービスアカウント・セキュリティグループのみに限定される
                        </li>
                        <li>
                            Groups ReaderまたはGroups Editorロールを持つユーザーに、特定のグループのみへの権限を与えたいとき —— セキュリティグループがある組織では、これらのロールの権限範囲を全グループ・セキュリティグループのみ・非セキュリティグループのみのいずれかに限定できる
                        </li>
                    </ul>
                    <blockquote className="note-card">
                        <p>
                            <strong className="note-badge">注意</strong>: 外部サービスプロバイダのセキュリティ慣行を検証できないため、非Googleアカウントをセキュリティグループに追加することはできない。
                        </p>
                    </blockquote>
                    <p>
                        <strong>設定手順</strong>:新規作成時は作成ウィザードで <strong>Security</strong> チェックボックスを選択する。既存グループを後からセキュリティグループにする場合は、グループ名 &rarr; <strong>グループ情報 &gt; ラベル</strong> から <strong>Security</strong> にチェックを入れて保存する(この操作は元に戻せない)。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/groups/control-access-to-sensitive-data-with-security-groups" target="_blank" rel="noopener noreferrer">Control access to sensitive data with security groups</a></p>
                    </blockquote>

                    <h3 id="136-グループ種別の比較まとめ">1.3.6 グループ種別の比較まとめ</h3>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">グループ種別</th>
                                    <th scope="col">メンバー管理方式</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">ポリシー適用への適性</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>配布リスト</td>
                                    <td>手動</td>
                                    <td>メール一括配信</td>
                                    <td>低</td>
                                </tr>
                                <tr className="even">
                                    <td>Collaborative Inbox</td>
                                    <td>手動</td>
                                    <td>共有受信箱の運用(support@等)</td>
                                    <td>低〜中</td>
                                </tr>
                                <tr className="odd">
                                    <td>ダイナミックグループ</td>
                                    <td>クエリによる自動</td>
                                    <td>属性ベースの自動メンバー管理</td>
                                    <td>高(セキュリティラベル併用時)</td>
                                </tr>
                                <tr className="even">
                                    <td>セキュリティグループ</td>
                                    <td>手動 or ダイナミック(Securityラベル併用)</td>
                                    <td>機密データ・リソースへのアクセス制御</td>
                                    <td>最も高い(ポリシー適用の推奨形態)</td>
                                </tr>
                                <tr className="odd">
                                    <td>アクセス/構成グループ</td>
                                    <td>手動 or ダイナミック</td>
                                    <td>サービスのオン/オフ・設定のカスタマイズ</td>
                                    <td>中〜高</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h2 id="14-ドメインの管理">1.4 ドメインの管理</h2>
                    <h3 id="141-プライマリドメインとセカンダリドメインの追加検証">
                        1.4.1 プライマリドメインとセカンダリドメインの追加・検証
                    </h3>
                    <p>
                        Google Workspace アカウントには1つの <strong>プライマリドメイン</strong> と、複数の <strong>セカンダリドメイン</strong> を追加できます。組織のGoogle WorkspaceまたはCloud Identity Premiumアカウントには最大600ドメインを追加できる。
                    </p>

                    <Diagram id="diag-domain" label="マルチドメイン構成モデル" />

                    <p>
                        ドメインを追加する際はセカンダリドメインまたはユーザーエイリアスドメインのいずれかとして追加し、いずれの場合もそのドメイン名を所有していることを確認・検証する必要がある。
                    </p>
                    <p>
                        <strong>セカンダリドメイン vs ドメインエイリアスの使い分け</strong>:追加するドメインが独自のユーザーセットを持つ場合はセカンダリドメインとして追加し、既存の全ユーザーに別ドメインでの代替メールアドレスを付与したいだけの場合はユーザーエイリアスドメインとして追加する。例えばsolarmora.comをexample.comのエイリアスとして追加すると、<a href="mailto:bob@example.comはbob">bob@example.comはbob</a>@solarmora.comという別のメールアドレスも持つことになる。
                    </p>
                    <p><strong>ドメイン検証の手順</strong>(TXTレコード方式が一般的):</p>
                    <ol type="1">
                        <li>
                            <code>アカウント &gt; ドメイン &gt; ドメインを管理</code> から <strong>ドメインを追加</strong> をクリックし、ドメイン種別(セカンダリ or ユーザーエイリアス)を選択。
                        </li>
                        <li>Googleが提示するTXTレコードの値を、ドメインレジストラのDNS設定に追加する。</li>
                        <li>
                            DNSの伝播(通常は数分〜最大8時間程度)を待ち、Admin console側で <strong>確認</strong> をクリックして検証を完了する。
                        </li>
                        <li>
                            メール送受信を行う場合は、別途MXレコードの設定も必要になる(ドメイン所有権の検証とメールルーティングの設定は別の作業)。
                        </li>
                    </ol>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/7502379?hl=en" target="_blank" rel="noopener noreferrer">Add a user alias domain or secondary domain</a> / <a href="https://support.google.com/a/answer/175747?hl=en" target="_blank" rel="noopener noreferrer">FAQ for multiple domains</a></p>
                    </blockquote>

                    <p>
                        <strong>制限事項</strong>:Admin consoleではプライマリドメインに対してのみドメインエイリアスを直接追加でき、セカンダリドメインにドメインエイリアスを追加したい場合はDirectory APIを使う必要がある。また、ドメインエイリアスから他の形態への移行はサポートされておらず、Googleは現時点でドメインエイリアスをマルチドメインアカウントへ変換することをサポートしていない。さらに全ドメインが共有できるグローバルなサービスURLは提供されないため、プライマリドメインと追加ドメインそれぞれに対してカスタムURL(例: mail.primary_domain.com と mail.secondary_domain.com)を用意する必要がある。
                    </p>
                    <p>
                        <strong>プライマリドメインの変更</strong>:プライマリドメインを変更したい場合は、対象ドメインを先にセカンダリドメインとして追加・検証してから、プライマリドメインへ切り替えるという手順を踏む。切り替え可能になるまで検証完了後最大24時間待つ必要がある場合もある。切り替え後も旧ドメインをドメインエイリアスとして残しておけば、新旧両方のメールアドレスで受信を継続できます。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/7009324?hl=en" target="_blank" rel="noopener noreferrer">Change your primary domain for Google Workspace</a> / <a href="https://support.google.com/a/answer/182081?hl=en" target="_blank" rel="noopener noreferrer">Limitations with multiple domains</a></p>
                    </blockquote>

                    <h3 id="142-ドメインエイリアスの管理">1.4.2 ドメインエイリアスの管理</h3>
                    <p>
                        ドメインエイリアスは全ユーザーに対してグローバルに適用され、特定ユーザーだけに限定することはできません。エイリアスはメール送受信のためのものであり、原則としてサインイン用のドメインとしては使えません(高度な設定を除く)。管理は <code>アカウント &gt; ドメイン &gt; ドメインを管理 &gt; ドメインエイリアスを追加</code> から行い、TXTレコードによる検証を経て有効化されます。
                    </p>
                    <p><strong>ユースケース例</strong>:</p>
                    <ul>
                        <li>
                            多言語・地域別サイトの統一的なメール受信(例:<code>company.com</code> と <code>company.co.jp</code> を統合)
                        </li>
                        <li>
                            企業合併・ブランド統合時に、旧ブランドのメールアドレス宛メールを新ドメインのメールボックスでシームレスに受信
                        </li>
                        <li>マーケティング上の別ブランド名でのメール送受信の一元管理</li>
                    </ul>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/175747?hl=en" target="_blank" rel="noopener noreferrer">FAQ for multiple domains</a></p>
                    </blockquote>

                    <hr />

                    <h2 id="15-建物とリソースの管理">1.5 建物とリソースの管理</h2>
                    <h3 id="151-建物と部屋の一括作成">1.5.1 建物と部屋の一括作成</h3>
                    <p>
                        会議室・機材などの予約可能リソースは、まず「建物(Building)」を定義してから、その配下に「リソース(部屋・備品等)」を作成する構造になっています。
                    </p>

                    <Diagram id="diag-building" label="建物とカレンダーリソースの階層構造" />

                    <p>
                        建物は <code>ディレクトリ &gt; 建物とリソース &gt; 概要</code> から作成でき、多数の建物を一度に登録する場合はCSV一括アップロードが利用できます(建物一覧のフォーマットに従ったCSVをインポート)。リソースは会社全体または各ドメインごとに最大10,000個まで追加でき、追加後は数分で利用可能になるのが一般的だが、場合によっては全員のカレンダーに反映されるまで最大24時間かかることもある。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/1033925?hl=en" target="_blank" rel="noopener noreferrer">Create buildings, features &amp; Calendar resources</a></p>
                    </blockquote>

                    <h3 id="152-新規リソースの作成管理">1.5.2 新規リソースの作成・管理</h3>
                    <p>
                        リソース作成は <code>ディレクトリ &gt; 建物とリソース &gt; リソース管理</code> から行います。作成時に指定する主な項目:
                    </p>

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
                                    <td>リソースタイプ</td>
                                    <td>会議室(Conference room)、その他(社用車、備品等)</td>
                                </tr>
                                <tr className="even">
                                    <td>建物・フロア</td>
                                    <td>所属する建物とフロア(構造化リソースを使う場合、Calendarの自動室提案機能に活用される)</td>
                                </tr>
                                <tr className="odd">
                                    <td>収容人数</td>
                                    <td>会議室の場合、参加人数に応じた検索・自動提案に使われる</td>
                                </tr>
                                <tr className="even">
                                    <td>説明・機能</td>
                                    <td>ホワイトボード、モニター、ビデオ会議設備など</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Calendarの <strong>自動ルーム提案</strong> 機能を活用するには、全ユーザーの主要な勤務地(work location)を設定しておくこと、構造化フォーマットでリソースを登録しておくことの2点が推奨される。ユーザーに勤務地が設定されていない場合、Calendarはその人を提案対象として考慮せず、提案される部屋が小さすぎたり、そもそも建物内の部屋が提案されなかったりする可能性がある。また、構造化された情報を持つ部屋のみが自動ルーム提案の対象になる。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/1033925?hl=en" target="_blank" rel="noopener noreferrer">Create buildings, features &amp; Calendar resources</a> / <a href="https://support.google.com/a/answer/9025584" target="_blank" rel="noopener noreferrer">Set up Google Calendar room booking suggestions</a></p>
                    </blockquote>

                    <h3 id="153-リソース予約権限の設定">1.5.3 リソース予約権限の設定</h3>
                    <p>リソースカレンダーの共有範囲・自動承認の可否を管理者が設定します。</p>
                    <ul>
                        <li>
                            <strong>既定の共有範囲</strong>:組織内の全員に共有し、競合しない予約は自動承認(Auto-accept)にするのが一般的な既定値。
                        </li>
                        <li>
                            <strong>限定共有</strong>:特定の部署やグループのみが予約できるようにカレンダー共有設定を制限することも可能。
                        </li>
                        <li>
                            <strong>承認制(Approve/Deny)</strong>:役員会議室など重要なリソースについては、予約リクエストを管理者や特定の承認者が個別に承認・却下する運用に切り替えられる。
                        </li>
                        <li>
                            <strong>予約権限の委任</strong>:カレンダー・リソースへのアクセスを他のユーザーへ委任し、代理予約を可能にする。
                        </li>
                    </ul>
                    <p>
                        <strong>権限管理のベストプラクティス</strong>:建物とリソース(Buildings and Resources)の管理権限は、信頼できる施設管理担当者やIT担当者にのみ付与することが重要である。大規模組織では大量の部屋を管理するために、CSV一括アップロードに加えてAdmin SDK Directory APIの <code>resources.calendars.insert</code> を使ったスクリプトによる登録・レポーティングも選択肢になります。
                    </p>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://knowledge.workspace.google.com/admin/calendar/approve-or-deny-calendar-room-and-resource-bookings" target="_blank" rel="noopener noreferrer">Approve or deny Calendar room &amp; resource bookings</a> / <a href="https://knowledge.workspace.google.com/admin/calendar/share-room-and-resource-calendars" target="_blank" rel="noopener noreferrer">Share room and resource calendars</a></p>
                    </blockquote>

                    <h3 id="154-リソースの詳細機能featuresの作成">
                        1.5.4 リソースの詳細機能(Features)の作成
                    </h3>
                    <p>
                        部屋やその他のリソースにどのような設備・特徴が備わっているかをユーザーに知らせたい場合、Admin consoleを使ってその機能(Feature)を追加できる。例えばどの社用車にナビゲーションシステムが搭載されているかを知らせたい場合などに利用する。機能の追加はAdmin consoleまたはAPIを使う必要があり、CSVファイルへの機能詳細のアップロードによる追加はできない。機能(Feature)は、会社全体または各ドメインごとに最大100個まで作成できる。
                    </p>
                    <p><strong>作成手順</strong>:</p>
                    <ol type="1">
                        <li>
                            <code>ディレクトリ &gt; 建物とリソース &gt; 概要</code> の <strong>リソース管理</strong> セクションを開く。
                        </li>
                        <li>
                            <strong>管理 &gt; リソースの機能を管理</strong> から <strong>機能を追加</strong> をクリック。
                        </li>
                        <li>
                            機能名(例:「ホワイトボードあり」「車椅子対応」「収容人数20名以上向け設備」)を入力して保存。
                        </li>
                        <li>
                            作成した機能は、各リソースの編集画面から個別に紐づける。ユーザーはリソース検索時にこれらの機能で絞り込める。
                        </li>
                    </ol>

                    <blockquote className="source-card">
                        <p><strong className="source-badge">出典</strong>:{' '}<a href="https://support.google.com/a/answer/1033925?hl=en" target="_blank" rel="noopener noreferrer">Create buildings, features &amp; Calendar resources</a></p>
                    </blockquote>

                    <hr />

                    <h2 id="まとめ実装チェックリスト">まとめ:実装チェックリスト</h2>
                    <p>Section 1 の内容を実務導入する際に確認すべき項目です。</p>

                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="checklist-progress-label">進捗:</span>
                            <span className="checklist-counter">
                                <span className="cl-done">{completedCount}</span> /{' '}
                                <span className="cl-total">{checklistItems.length}</span> 完了
                            </span>
                        </div>
                        <ul className="task-list checklist-list">
                            {checklistItems.map((text, idx) => (
                                <li key={idx}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={!!checkedItems[idx]}
                                            onChange={() => handleCheckboxChange(idx)}
                                        />
                                        <span className="checklist-text">{text}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr />

                    <h2 id="参考文献">参考文献</h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <h4>公式認定情報</h4>
                            <ul className="ref-items">
                                <li>
                                    <a href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Associate Google Workspace Administrator 認定ページ
                                    </a>
                                </li>
                                <li>
                                    <a href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Associate Google Workspace Administrator Exam Guide (PDF)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>ユーザーライフサイクル管理</h4>
                            <ul className="ref-items">
                                <li>
                                    <a href="https://support.google.com/a/answer/9413033?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Google Workspace migration product matrix
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/about-automated-user-provisioning" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>About automated user provisioning
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/view-auto-provisioning-errors" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>View auto-provisioning errors
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/apps/setting-up-sso" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Setting up SSO
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/60224?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>About SSO
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/apps/technical-overview-of-saml-based-sso" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Technical overview of SAML-based SSO
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/6087519?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Set up your own custom SAML app
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/about-google-cloud-directory-sync" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>About Google Cloud Directory Sync
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/compare-directory-sync-with-gcds" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Compare Directory Sync with GCDS
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/overview-changing-a-directory-users-name-or-email-address" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Overview: Changing a Directory user&apos;s name or email address
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Add or delete an alternate email address (email alias)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/create-custom-attributes-for-user-profiles" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Create custom attributes for user profiles
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/delete-or-remove-a-user-from-your-organization" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Delete or remove a user from your organization
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/suspend-a-user-temporarily" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Suspend a user temporarily
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/restore-a-recently-deleted-user" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Restore a recently deleted user
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/archive-former-employee-accounts" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Archive former employee accounts
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/maintain-data-security-after-an-employee-leaves" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Maintain data security after an employee leaves
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/drive/transfer-drive-files-to-a-new-owner-as-an-admin" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Transfer Drive files to a new owner as an admin
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/manage-and-assign-licenses" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Manage and assign licenses (GCDS)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/enforce-and-monitor-password-requirements-for-users" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Enforce and monitor password requirements for users
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/reset-a-users-password" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Reset a user&apos;s password
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/allow-super-administrators-to-recover-their-password" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Allow super administrators to recover their password
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>組織部門(OU)</h4>
                            <ul className="ref-items">
                                <li>
                                    <a href="https://support.google.com/a/answer/4390551?hl=en-na" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Organizational policies FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/how-the-organizational-structure-works" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>How the organizational structure works
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/add-an-organizational-unit" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Add an organizational unit
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/move-users-to-an-organizational-unit" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Move users to an organizational unit
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/move-rename-or-delete-an-organizational-unit" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Move, rename, or delete an organizational unit
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>グループ</h4>
                            <ul className="ref-items">
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/groups/create-a-group-in-your-organization" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Create a group in your organization
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/users/answer/10375787" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Make a group a Collaborative Inbox
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/groups/add-features-and-manage-conversations-in-google-groups" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Add features and manage conversations in Google Groups
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/10286834" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Manage membership automatically with dynamic groups
                                    </a>
                                </li>
                                <li>
                                    <a href="https://cloud.google.com/identity/docs/how-to/dynamic-groups-attributes" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Valid user fields for dynamic group queries
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/groups/control-access-to-sensitive-data-with-security-groups" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Control access to sensitive data with security groups
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>ドメイン管理</h4>
                            <ul className="ref-items">
                                <li>
                                    <a href="https://support.google.com/a/answer/7502379?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Add a user alias domain or secondary domain
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/175747?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>FAQ for multiple domains
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/182081?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Limitations with multiple domains
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/7009324?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Change your primary domain for Google Workspace
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h4>建物とリソース</h4>
                            <ul className="ref-items">
                                <li>
                                    <a href="https://support.google.com/a/answer/1033925?hl=en" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Create buildings, features &amp; Calendar resources
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.google.com/a/answer/9025584" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Set up Google Calendar room booking suggestions
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/calendar/approve-or-deny-calendar-room-and-resource-bookings" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Approve or deny Calendar room &amp; resource bookings
                                    </a>
                                </li>
                                <li>
                                    <a href="https://knowledge.workspace.google.com/admin/calendar/share-room-and-resource-calendars" target="_blank" rel="noopener noreferrer">
                                        <span className="ref-arrow">&#x2197;</span>Share room and resource calendars
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <footer className="page-footer">
                        本ガイドは Google 公式の認定ページおよび Exam Guide PDF、Google Workspace 管理者ヘルプセンターの一次情報に基づき作成されています。各セクション末尾および参考文献に出典URLを明記しています。
                    </footer>
                </div>
            </div>
        </div>
    );
}
