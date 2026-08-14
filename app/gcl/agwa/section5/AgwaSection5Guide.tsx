'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
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

const CHECKLIST_ITEMS = [
    '基本モバイル管理と高度モバイル管理の機能差分（エージェントの要否、パスコード強度、デバイス承認、アプリ管理の対象OSなど）を表で説明できる',
    'BeyondCorp Allianceパートナー（Check Point・CrowdStrike・Jamf・Lookout・Microsoft Intune・Omnissa）を挙げられる',
    'デバイス承認（Require admin approval）で自動承認されるデバイスの条件を説明できる',
    'エンドポイント検証（Endpoint Verification）が対象とするOSと、モバイル管理との違いを説明できる',
    '「デバイスをワイプ」と「アカウントをワイプ」の違いと、それぞれを使うべき場面を判断できる',
    'Chromeポリシーの4つの適用経路（プラットフォーム・マシンクラウド・OSユーザー・クラウドユーザー）とその既定の優先順位を説明できる',
    'オフラインアクセスの2つの設定方式（全ユーザー許可 vs デバイスポリシー制御）の違いを説明できる',
    'Target version prefixによるバージョン固定のメリットとリスクを説明できる',
    'Chrome Enterprise Coreへのブラウザ登録手順（トークン生成→OS別配布→確認）を説明できる',
    '拡張機能の4つのインストールモード（allowed/blocked/force_installed/normal_installed）の違いを説明できる',
];

export default function AgwaSection5Guide() {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        new Array(CHECKLIST_ITEMS.length).fill(false)
    );

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    const completedCount = checkedItems.filter(Boolean).length;

    return (
        <div className="agwa-s5-page">
            <NavBar />
            <main className="main">
                <section className="hero">
                    <div className="hero-eyebrow">
                        Associate Google Workspace Administrator Section 5
                    </div>
                    <h1>
                        Section 5: ブラウザとエンドポイントの管理（Managing browsers and
                        endpoints）
                    </h1>
                    <div className="lede-card">
                        <aside className="annotation">
                            Associate Google Workspace Administrator Section 5ブラウザとエンドポイントの管理 Section 5の全体像 5.1 モバイルデバイスの管理 5.1.1 基本・高度・サードパーティ管理ソリューションの使い分け 5.1.2 Google基本モバイル管理によるセキュリティポリシーの適用 5.1.3 登録済みデバイスの可視性と制御の維持（会社所有・BYOD） 5.1.4 退職者のモバイルデバイスのオフボーディング 5.2 Chromeブラウザの管理 5.2.1 Chromeブラウザポリシーの適用（オフラインアクセス・更新ポリシー） 5.2.2 ブラウザの登録とポリシーの適用 5.2.3 拡張機能とアプリの管理 学習チェックリスト 参考文献 Google公式（認定・試験ガイド） モバイルデバイス管理（Google Workspace Help / knowledge.workspace.google.com） Chromeブラウザ管理（Chrome Enterprise and Education Help） オフラインアクセス（Drive &amp; Docs）
                        </aside>
                        <p>
                            出題比率: 約10%（公式Exam
                            Guideより。全6セクション中最も比率が低いが、モバイルデバイスとChromeブラウザという「エンドユーザーが日常的に触れる接点」を扱うため、実務では頻出するトピック群である）
                        </p>
                        <p>対応タスク: 5.1 モバイルデバイスの管理 / 5.2 Chromeブラウザの管理</p>
                        <p>公式ソース:</p>
                        <ul>
                            <li>
                                認定ページ:{' '}
                                <a
                                    href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en
                                </a>
                            </li>
                            <li>
                                公式Exam Guide（PDF）:{' '}
                                <a
                                    href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                <h2 id="section-5の全体像">Section 5の全体像</h2>
                <p>
                    Section 5は「Google endpoint management（旧称: Google Mobile
                    Management）」と「Chrome Enterprise Core（旧称: Chrome Browser Cloud
                    Management, CBCM）」という、Google Workspaceのデバイス管理機構の中核をなす2つの柱で構成される。両者は密接に連携しており、Devices（デバイス）メニュー配下の Mobile &amp; endpoints と Chrome という隣接する設定領域から管理する。
                </p>
                <Diagram id="diag-1" label="Section 5の全体像" />
                <p>
                    Section
                    5は2タスクのみとシンプルだが、出題範囲は「モバイルデバイス（スマートフォン・タブレット）」と「Chromeブラウザが動く任意のコンピューター（Windows
                    / macOS / Linux /
                    ChromeOS）」という異なる2種類のエンドポイントにまたがる。試験対策では、この2系統の管理機構が<strong>別々の設定画面・別々のライセンス要件・別々の登録トークン方式</strong>を持つことを明確に区別して理解することが重要である。
                </p>

                <hr />

                <h2 id="51-モバイルデバイスの管理">5.1 モバイルデバイスの管理</h2>
                <p>
                    Google Workspaceにおけるモバイルデバイス管理は、公式には「Google endpoint
                    management」と総称される機能群の一部であり、Android・iPhone・iPadを対象とする。管理レベルは大きく「基本（Basic）」「高度（Advanced）」の2段階に分かれ、これに加えて外部のUEM（統合エンドポイント管理）製品と連携する「サードパーティ管理」という選択肢がある。
                </p>

                <h3 id="511-基本高度サードパーティ管理ソリューションの使い分け">
                    5.1.1 基本・高度・サードパーティ管理ソリューションの使い分け
                </h3>

                <h4 id="基本モバイル管理basic-mobile-management">
                    基本モバイル管理（Basic mobile management）
                </h4>
                <p>
                    組織では既定で基本モバイル管理が有効になっている。この機能は、デバイスにエージェントアプリを一切インストールすることなく、ユーザーが仕事用アカウントでモバイルデバイスにアクセスする際の基礎的な保護を提供する。
                </p>
                <p>基本管理の特徴は次のとおりである。</p>
                <ul>
                    <li>Android・iPhone・iPadに対応する。</li>
                    <li>
                        <strong>エージェントレス管理</strong>
                        （デバイス側にアプリのインストールが不要）である。
                    </li>
                    <li>
                        OSバージョンや暗号化ステータスの同期には数日かかる場合があり、この間はContext-Aware
                        Accessを使用しているとアクセスに影響が出ることがある。
                    </li>
                    <li>
                        設定は Devices &gt; Mobile &amp; endpoints &gt; Settings &gt; Universal
                        &gt; General &gt; Mobile management
                        から行い、Basicを選択して保存する。この操作には「Mobile Device
                        Management」管理者権限が必要である。
                    </li>
                </ul>

                <h4 id="高度モバイル管理advanced-mobile-management">
                    高度モバイル管理（Advanced mobile management）
                </h4>
                <p>
                    基本管理では組織のセキュリティ要件を満たせない場合に、高度管理へ切り替える。高度管理では、デバイスへの「デバイスポリシーアプリ」のインストールが必要になる（Androidユーザーは手動インストールせず、画面の案内に従う。iOSでは登録時にプロファイルのインストールを促される）。
                </p>
                <p>
                    高度管理を有効にすると、デバイスポリシー・パスワードに対するより強力な制御、Android・iOS双方でのアプリ管理、デバイス全体のリモートワイプが可能になる。ただし、Business
                    Starter・Business Standard、Education Fundamentals、Essentials、Cloud Identity
                    Freeのエディションでは利用できない点に注意する。
                </p>

                <h4 id="基本管理と高度管理の機能比較">基本管理と高度管理の機能比較</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">機能</th>
                                <th scope="col">基本管理</th>
                                <th scope="col">高度管理</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>エージェントレス管理（アプリ不要）</td>
                                <td>✔</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>デバイスインベントリ</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>基本のパスコード適用</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>モバイルレポート</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>ハイジャック防止</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>リモートアカウントワイプ</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>Androidアプリ管理</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>デバイス監査とアラート</td>
                                <td>✔（一部エディションのみ）</td>
                                <td>✔（一部エディションのみ）</td>
                            </tr>
                            <tr>
                                <td>デバイス管理ルール</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>デバイスのブロック・ブロック解除</td>
                                <td>✔</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>標準/強力なパスコード適用</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>デバイス承認（Device approvals）</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>リモートデバイスワイプ（全データ）</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>iOSアプリ管理</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>Androidワークプロファイル</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>セキュリティポリシー</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>会社所有デスクトップの一括登録</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>会社所有Androidの一括登録（ゼロタッチ）</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>会社所有iOSデバイス管理</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                            <tr>
                                <td>デバイス証明書の配布</td>
                                <td>—</td>
                                <td>✔</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    <em>
                        出典:{' '}
                        <a
                            href="https://knowledge.workspace.google.com/admin/devices/compare-mobile-management-features"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Compare mobile management features
                        </a>
                    </em>
                </p>

                <h4 id="サードパーティ管理beyondcorp-alliance">
                    サードパーティ管理（BeyondCorp Alliance）
                </h4>
                <p>
                    組織が既にUEM製品や脅威対策製品を運用している場合、Google WorkspaceはBeyondCorp
                    Allianceパートナーとの統合をサポートする。対応パートナーは{' '}
                    <strong>
                        Check Point・CrowdStrike・Jamf・Lookout・Microsoft
                        Intune（デスクトップデバイスのみ）・Omnissa
                    </strong>{' '}
                    である。連携後は、パートナー製品が収集したデバイス情報をGoogle側のデバイスインベントリに取り込み、Context-Aware
                    Accessの条件として利用できる。
                </p>
                <p>
                    サードパーティ連携を利用するには、前提として基本または高度モバイル管理（モバイルデバイス向け）、またはエンドポイント検証（コンピューター向け）を有効にしておく必要がある。なお、Googleはサードパーティが送信するデバイスデータの正確性については責任を負わない点も押さえておきたい。
                </p>
                <Diagram id="diag-2" label="モバイルデバイス管理ソリューションの選択フロー" />

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        特別な要件がない限り、まず基本管理を使い続け、必要になった時点で高度管理へ段階的に移行する。高度管理はデバイス側の操作（デバイスポリシーアプリのインストール）をユーザーに要求するため、展開前に十分な周知期間を設ける。
                    </li>
                    <li>
                        高度管理へ切り替える際は対応エディションを事前に確認する（Business
                        Starter・Business Standardなど一部エディションは非対応）。
                    </li>
                    <li>
                        既存のUEM/EDR製品への投資がある場合は、Google純正の高度管理を重複導入するのではなく、BeyondCorp
                        Alliance連携によって既存投資を活かす選択肢を優先的に検討する。
                    </li>
                    <li>
                        高度管理から基本管理へダウングレードする場合は専用の手順（Downgrade device
                        management from advanced to
                        basic）に従う。Android端末では、直前まで高度管理下にあった端末はアカウントではなくデバイス全体のワイプしかできなくなる場合がある点に注意する。
                    </li>
                </ul>

                <hr />

                <h3 id="512-google基本モバイル管理によるセキュリティポリシーの適用">
                    5.1.2 Google基本モバイル管理によるセキュリティポリシーの適用
                </h3>
                <p>基本モバイル管理を有効にした後、管理者は以下の設定をカスタマイズできる。</p>
                <ol>
                    <li>
                        <strong>パスワード要件のカスタマイズ</strong>:
                        管理対象モバイルデバイスに対して、画面ロックまたはパスワードの設定を必須にする。パスワードの最小文字数などを指定できる。
                    </li>
                    <li>
                        <strong>Android向けの管理対象アプリのセットアップ</strong>: Web and mobile
                        appsリストに追加することで、業務用Androidアプリを「管理対象」にし、不正アクセスを防止する。
                    </li>
                </ol>
                <p>基本管理下でも次の操作が可能である。</p>
                <ul>
                    <li>
                        デバイスが紛失・盗難に遭った場合、ユーザーのアカウントをモバイルデバイスからワイプする。
                    </li>
                    <li>モバイルデバイスのアクティビティアラートを設定する。</li>
                    <li>組織のデータにアクセスするモバイルデバイスを定期的にレビューする。</li>
                </ul>
                <p>
                    基本管理は「エージェントレス」であるがゆえに、OSバージョン・暗号化ステータスなどのデバイス属性の同期に数日単位の遅延が生じうる。この遅延は、Context-Aware
                    Accessでデバイス属性を条件に使っている場合、一時的なアクセス不能や誤判定につながる可能性があるため、高度管理への切り替えを検討する材料となる。
                </p>

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        Device management security
                        checklist（デバイス管理セキュリティチェックリスト）に沿って、まず「パスワード要件の設定」と「紛失デバイスからのデータのロックダウン/ワイプ」の2点を最優先で有効化する。
                    </li>
                    <li>
                        管理対象Androidアプリのリストは、業務上必須なアプリのみに絞り込み、強制インストールするセキュリティアプリ（マルウェア対策など）を明確に区別して管理する。
                    </li>
                    <li>
                        モバイルデバイスのアクティビティアラート（デバイス監査とアラート）は、Frontline
                        Standard/Plus、Enterprise Standard/Plus、Business Plus、Education
                        Standard/Plus、G Suite Business、Cloud Identity
                        Premiumなど対応エディションでのみ利用可能な点に留意する。
                    </li>
                </ul>

                <hr />

                <h3 id="513-登録済みデバイスの可視性と制御の維持会社所有byod">
                    5.1.3 登録済みデバイスの可視性と制御の維持（会社所有・BYOD）
                </h3>
                <p>
                    管理者は、組織のデータにアクセスする全デバイス（会社所有・BYODの両方）について、一元的な可視性を維持する必要がある。この可視性を支える仕組みは複数存在し、デバイスの種類によって使い分ける。
                </p>
                <Diagram id="diag-3" label="デバイス情報の収集経路と可視化" />

                <h4 id="エンドポイント検証endpoint-verification">
                    エンドポイント検証（Endpoint Verification）
                </h4>
                <p>
                    エンドポイント検証は、ChromeOSまたはChromeブラウザが動作するコンピューター（macOS
                    El Capitan以降、ChromeOS 110以降、Linux Debian/Ubuntu、Windows
                    10/11）について、OS・デバイス・ユーザーに関する詳細情報を取得する仕組みである。個人所有・組織所有のいずれのデバイスにも利用できる。
                </p>
                <p>セットアップは次の4ステップで構成される。</p>
                <ol>
                    <li>
                        Admin consoleでエンドポイント検証を有効化する（既定でオンになっていることが多い）。
                    </li>
                    <li>
                        エンドポイント検証拡張機能をデバイスにインストールする（ユーザー自身によるインストール、Admin
                        consoleからの強制インストール、ポリシーによる配布のいずれか）。
                    </li>
                    <li>
                        必要に応じてヘルパーアプリをインストールする（CrowdStrike Falcon
                        ZTA連携や証明書ベースアクセスを使う場合など）。
                    </li>
                    <li>任意でデバイス承認を設定する。</li>
                </ol>

                <h4 id="デバイス承認require-admin-approval-for-device-access">
                    デバイス承認（Require admin approval for device access）
                </h4>
                <p>
                    高度管理下のAndroid・iOSデバイスでは、ユーザー所有デバイスが仕事用/学校用アカウントへ初めてアクセスしようとした際に、管理者による個別承認を要求できる。
                </p>
                <Diagram id="diag-4" label="デバイス承認のワークフロー" />
                <p>
                    シリアル番号によって会社所有デバイスとして事前登録されているデバイス（ワークプロファイル付きAndroidを除く）は、承認要求の対象であっても自動的に承認される。またDrive
                    for
                    desktopを「承認済みデバイスのみ」に制限している場合、その条件を満たす会社所有デバイスも自動承認の対象になる。
                </p>

                <h4 id="サードパーティ連携によるデバイス情報の統合">
                    サードパーティ連携によるデバイス情報の統合
                </h4>
                <p>BeyondCorp Allianceパートナーとの連携フローは次のとおりである。</p>
                <Diagram id="diag-5" label="サードパーティ連携の設定フロー" />
                <p>
                    接続作業はSuper
                    Admin権限で行う必要がある。パートナー接続を有効化しただけでは特定のOUに適用されず、Step
                    2の「OUごとの有効化」を別途行って初めてそのOU配下のユーザーに反映される点は誤解しやすいポイントである。
                </p>

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        BYODを許容する組織では、デバイス承認（Require admin
                        approval）を有効にし、承認待ち/ブロック状態をContext-Aware
                        Accessの条件に組み込むことで、「野良デバイス」からのアクセスを構造的に防止する。
                    </li>
                    <li>
                        エンドポイント検証は、モバイルデバイス向けの基本/高度管理ではカバーされない「Chromeブラウザが動くPC」の可視性を補完する位置づけであることを理解し、両者を併用する。
                    </li>
                    <li>
                        iOSデバイスでサードパーティ連携を使う場合、Safariの有効化状態によって重複デバイスエントリが発生しうるため、Context-Aware
                        Accessによる意図しないブロックが起きていないか定期的に確認する。
                    </li>
                </ul>

                <hr />

                <h3 id="514-退職者のモバイルデバイスのオフボーディング">
                    5.1.4 退職者のモバイルデバイスのオフボーディング
                </h3>
                <p>
                    従業員の退職時や、デバイスの紛失・盗難時には、組織データを保護するための迅速な対応が求められる。Google
                    Workspaceは「デバイスをワイプする」ことと「アカウントをワイプする」ことを明確に区別しており、この区別を正しく理解することが実務・試験の両面で重要である。
                </p>
                <Diagram id="diag-6" label="退職者デバイスのオフボーディングフロー" />

                <h4 id="ワイプの2種類">ワイプの2種類</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">操作</th>
                                <th scope="col">用途</th>
                                <th scope="col">削除対象</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>デバイスをワイプ（Wipe a device）</td>
                                <td>
                                    会社所有デバイス、または個人所有で紛失・盗難に遭ったデバイス
                                </td>
                                <td>
                                    仕事用データ・アプリを削除。ワークプロファイルのないAndroidやデバイス登録済みiOSでは個人データ・個人アプリも含め全削除
                                </td>
                            </tr>
                            <tr>
                                <td>アカウントをワイプ（Wipe an account）</td>
                                <td>個人所有デバイスを使う従業員が退職する場合</td>
                                <td>
                                    デバイス上の仕事用アカウントとそれに紐づくデータのみ削除。個人データは保持される
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Android端末が「現在は基本管理下だが、過去に高度管理下にあり、かつDevice
                    Ownerモード（会社所有デバイスまたは『仕事専用』として設定された個人デバイス）」という条件を満たす場合は、アカウント単位ではなくデバイス全体のワイプしかできない点に注意する。
                </p>

                <h4 id="サインアウトによる即時アクセス遮断">サインアウトによる即時アクセス遮断</h4>
                <p>
                    デバイスワイプに加えて、管理対象Googleアカウントのサインインクッキーをリセットすることで、モバイルデバイス・ブラウザなど全デバイスから即座にサインアウトさせることができる。ユーザーを一時停止（Suspend）すると、サインインクッキーは自動的にリセットされる。ただし、この操作はGmail・Google
                    Drive for
                    desktopなどアプリレベルのセッションまでは切断しないため、必要に応じてアプリのサインアウトも別途行う。
                </p>

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        オフボーディング手順は「デバイスワイプ/アカウントワイプの実行」「サインインCookieのリセット（またはアカウント一時停止）」「Driveデータの所有権移転」「ライセンス解除・アカウントの保留orアーカイブor削除」という順序をテンプレート化し、都度の判断のばらつきを防ぐ。
                    </li>
                    <li>
                        退職が確定した時点で速やかにユーザーを一時停止し、その後にワイプや所有権移転などのデータ保全作業を行う（アクセス遮断とデータ保全の順序を誤ると、退職者による意図的なデータ持ち出しリスクが残る）。
                    </li>
                    <li>
                        BYODで働く従業員の退職では「アカウントのワイプ」を選択し、私物データを誤って削除しないよう区別を徹底する。
                    </li>
                    <li>
                        モバイルデバイス一覧を定期的に棚卸しし、退職済みユーザーや長期間非アクティブなデバイスが残っていないか確認する。
                    </li>
                </ul>

                <hr />

                <h2 id="52-chromeブラウザの管理">5.2 Chromeブラウザの管理</h2>
                <p>
                    Chromeブラウザの管理は、Google Workspace自体の機能ではなく、
                    <strong>Chrome Enterprise Core</strong>
                    （旧称: Chrome Browser Cloud Management,
                    CBCM）というChrome専用の管理レイヤーを通じて行う。Windows・macOS・Linuxで動作するChromeブラウザは、OSやデバイスがGoogle
                    Workspaceに登録されていなくても、Chrome Enterprise
                    Coreに個別に登録することでクラウドから一元管理できる点が最大の特徴である。
                </p>

                <h3 id="521-chromeブラウザポリシーの適用オフラインアクセス更新ポリシー">
                    5.2.1 Chromeブラウザポリシーの適用（オフラインアクセス・更新ポリシー）
                </h3>

                <h4 id="ポリシーの適用範囲と優先順位">ポリシーの適用範囲と優先順位</h4>
                <p>
                    Chromeポリシーには4種類の適用経路があり、既定では次の優先順位で適用される（同じポリシーが複数の経路で設定されている場合、上位の経路が優先され、下位は無視される）。
                </p>
                <Diagram id="diag-7" label="Chromeポリシーの適用経路と優先順位" />
                <p>
                    Chrome Enterprise Coreでブラウザフリートを管理している場合に限り、Admin
                    consoleの「Policy
                    precedence」設定、またはCloudPolicyOverridesPlatformPolicy／CloudUserPolicyOverridesCloudMachinePolicyポリシーによって、この優先順位を4通りの組み合わせに変更できる。また、リストやディクショナリ形式のポリシー（ExtensionSettingsなど）は「Policy
                    mergelist」設定やワイルドカード<code>*</code>を使うことで、複数ソースからの値をマージすることも可能である。
                </p>

                <h4 id="オフラインアクセス">オフラインアクセス</h4>
                <p>
                    「オフラインアクセス」は、Google
                    Docs・Sheets・Slidesをインターネット未接続のコンピューターから利用できるようにする機能で、既定で組織に対して有効になっており、ユーザーは自分のアカウントで個別にオン/オフを切り替えられる。Chrome
                    BrowserとMicrosoft Edgeブラウザで利用でき、Google Drive for
                    desktopには適用されない別機能である。
                </p>
                <p>管理者は次の2つの方式から選択する。</p>
                <ul>
                    <li>
                        <strong>
                            オプション1（推奨）: ユーザーにオフラインアクセスの有効化を許可する
                        </strong>
                        — Apps &gt; Google Workspace &gt; Drive and Docs &gt; Features and
                        Applicationsで「Allow users to enable offline access」を選択する。最も簡便な方法。
                    </li>
                    <li>
                        <strong>オプション2: デバイスポリシーでオフラインアクセスを制御する</strong>
                        — Windows/macOS/Linuxの管理対象コンピューターに、Google Docs
                        Offline拡張機能（ID: <code>ghbmnnjooekpmoecnnnilnnbdlolhkhi</code>
                        ）を許可するポリシー（ADMX/plist/設定ファイル）を配布したうえで、Admin
                        console側で「Control offline access using device
                        policies」を選択する。ポリシーが導入されていないコンピューターではオフラインアクセスがブロックされる。
                    </li>
                </ul>
                <div className="warning-card">
                    <span className="warning-icon">⚠</span>
                    <p>
                        <strong>注意</strong>:
                        オプション2へ切り替える前にポリシーを導入しておかないと、既にオフラインアクセスを利用していたユーザーは24時間後にアクセスを失う。
                    </p>
                </div>

                <h4 id="更新ポリシー">更新ポリシー</h4>
                <p>
                    Chromeブラウザの自動更新は既定で有効であり、Googleはセキュリティ修正・新機能を継続的に届けるためオンのままにすることを推奨している。管理者が更新の挙動を調整する主な手段は次のとおりである。
                </p>
                <Diagram id="diag-8" label="Chromeブラウザの更新ポリシー設計" />
                <ul>
                    <li>
                        <strong>Target version prefix</strong>: 特定バージョン（例: <code>124.</code>
                        ）を指定して更新を留め置く／ロールバックする設定。直近3メジャーリリースまでロールバック可能。設定したままにするとセキュリティ更新が適用されなくなるため、定期的な見直しが前提となる。
                    </li>
                    <li>
                        <strong>更新のスキャッター（分散）</strong>:
                        大量のデバイスが同時に更新をダウンロードして帯域を圧迫しないよう、数日間にわたって更新タイミングを分散させる。分散期間を長くしすぎると、一部ユーザーが複数バージョン遅れる可能性があるため、できるだけ短い日数を選ぶ。
                    </li>
                    <li>
                        <strong>業務時間外への更新スケジューリング</strong>:
                        自動更新が業務のピーク時間帯に発生しないよう制御する。
                    </li>
                    <li>
                        <strong>コンポーネント更新の無効化</strong>:
                        特定コンポーネントの自動更新のみを止めることも可能（一部のコンポーネントは対象外）。
                    </li>
                    <li>
                        <strong>リリースチャンネル</strong>: Stable・Extended
                        stable・Beta・Devから選択できる（Chrome 90以降でGoogle Software
                        Updateがサポート）。
                    </li>
                </ul>

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        特別な理由がない限り自動更新は常にオンにしておく。バージョン固定はセキュリティリスクとのトレードオフであることを常に念頭に置く。
                    </li>
                    <li>
                        Target version
                        prefixで特定バージョンに固定する場合は、固定解除の担当者・レビュー周期をあらかじめ運用ルールとして定めておく。
                    </li>
                    <li>
                        オフラインアクセスは「全ユーザー許可」を既定の推奨パスとし、コンプライアンス上デバイス単位の制御が必要な場合のみポリシー配布方式に切り替える。
                    </li>
                    <li>
                        ポリシーの優先順位について、既存のグループポリシー（GPO）などプラットフォームポリシーとAdmin
                        console側のマシンクラウドポリシーが競合していないか、<code>chrome://policy</code>で実際の適用結果を確認する習慣をつける。
                    </li>
                </ul>

                <hr />

                <h3 id="522-ブラウザの登録とポリシーの適用">
                    5.2.2 ブラウザの登録とポリシーの適用
                </h3>
                <p>
                    Chrome Enterprise
                    Coreでブラウザを管理するには、まず対象デバイスの「登録（Enrollment）」を行う必要がある。登録することで、そのデバイス上でChromeブラウザを開いた全ユーザーにポリシーを適用できるようになる。
                </p>
                <Diagram id="diag-9" label="Chrome Enterprise Core へのブラウザ登録シーケンス" />

                <h4 id="ステップ1-登録トークンの生成">ステップ1: 登録トークンの生成</h4>
                <p>
                    Devices &gt; Chrome &gt; Managed
                    browsersで対象のOU（トップレベルまたは特定の子OU）を選択し、Enrollをクリックする。初回登録時にはChrome
                    Enterprise CoreのTerms of
                    Serviceへの同意が求められる。生成されたトークンはOUごとに1つのみアクティブにできる（無効化して再生成すると、以前のトークンで登録済みのブラウザはそのまま登録状態を維持する）。
                </p>

                <h4 id="ステップ2-os別の登録方法">ステップ2: OS別の登録方法</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">OS</th>
                                <th scope="col">主な登録方法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Windows</td>
                                <td>
                                    グループポリシー管理エディタで<code>CloudManagementEnrollmentToken</code>ポリシーを設定、またはレジストリを直接編集、または配布用.regファイルを利用
                                </td>
                            </tr>
                            <tr>
                                <td>macOS</td>
                                <td>
                                    Apple Profile Manager・Jamf・Omnissa Workspace
                                    ONEなどのMDMツールでポリシーとして配布、またはテキストファイルとして<code>/Library/Google/Chrome/</code>に配置
                                </td>
                            </tr>
                            <tr>
                                <td>Linux</td>
                                <td>
                                    <code>/etc/opt/chrome/policies/enrollment</code>
                                    にトークンのみを記載したテキストファイルを配置
                                </td>
                            </tr>
                            <tr>
                                <td>Android / iOS</td>
                                <td>
                                    Google endpoint management経由でChrome Enterprise
                                    Coreの登録トークンを配布
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Windows・macOSでは、登録が失敗した場合に「Chromeを未管理状態のまま起動させる」か「起動自体をブロックする」かを<code>CloudManagementEnrollmentMandatory</code>ポリシーで選択できる。
                </p>

                <h4 id="ステップ3-登録の確認とポリシー適用">ステップ3: 登録の確認とポリシー適用</h4>
                <p>
                    登録後、Managed
                    browsersの一覧に対象ブラウザが表示される（Windowsではシステムレベルのインストールのみサポート）。詳細なレポート情報を得るには、別途Chromeブラウザレポートを有効化する必要がある。
                </p>
                <p>
                    ポリシーはDevices &gt; Chrome &gt; Settings（Chrome Enterprise
                    Coreに申し込んでいる場合はChrome browser &gt;
                    Settings）から、OUまたはグループ単位で設定する。設定は数分で反映されることが多いが、最大24時間かかる場合がある。異なるOUに移したいブラウザは、Managed
                    browsers一覧からMoveで移動できる。
                </p>

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        登録トークンはOUと1対1で紐づくため、部門・拠点ごとに異なるポリシーを適用したい場合は、登録前にOU設計（Section
                        1.2）を完了させておく。
                    </li>
                    <li>
                        Windows環境でMDMツールを持たない組織は「レジストリ編集」または「.regファイル配布」、既にActive
                        Directoryを運用している組織は「グループポリシー」を選ぶという判断基準を持つ。
                    </li>
                    <li>
                        同一ソースからのイメージでWindows端末を大量展開する場合は、Sysprepの<code>/generalize</code>オプションを使い、各端末のMachineGUIDが重複しないようにする（重複するとChrome
                        Enterprise Coreが個別デバイスとして認識できない）。
                    </li>
                    <li>
                        登録トークンは一度登録が完了すれば失効させても既存の登録状態には影響しないため、トークン漏洩時は速やかに無効化・再生成する運用を徹底する。
                    </li>
                </ul>

                <hr />

                <h3 id="523-拡張機能とアプリの管理">5.2.3 拡張機能とアプリの管理</h3>
                <p>
                    管理者は、OUまたはグループ単位で、Chromeウェブストアの拡張機能・アプリのインストールを許可・ブロック・強制インストールできる。設定は<code>ExtensionSettings</code>ポリシーで管理され、拡張機能IDごと、またはワイルドカード<code>*</code>による既定値として指定する。
                </p>
                <Diagram id="diag-10" label="拡張機能・アプリのインストールモード分岐" />

                <h4 id="インストールモード">インストールモード</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">installation_mode</th>
                                <th scope="col">説明</th>
                                <th scope="col">ユーザーによる無効化・削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>allowed（既定値）</td>
                                <td>Chromeウェブストアからユーザー自身がインストール可能</td>
                                <td>可能（そもそも任意インストール）</td>
                            </tr>
                            <tr>
                                <td>blocked</td>
                                <td>
                                    インストール不可。カスタムのブロックメッセージ（最大1,000文字）を表示できる
                                </td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>force_installed</td>
                                <td>ユーザー操作なしで自動インストール</td>
                                <td>不可（強制インストールされたものは無効化・削除できない）</td>
                            </tr>
                            <tr>
                                <td>normal_installed</td>
                                <td>ユーザー操作なしで自動インストール</td>
                                <td>可能（インストール後にユーザーが無効化できる）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>代表的な運用パターンは次の2つである。</p>
                <ol>
                    <li>
                        <strong>「原則許可、一部ブロック」</strong>
                        : 既定をallowedにしたうえで、危険と判断した特定の拡張機能のみblockedに設定する。
                    </li>
                    <li>
                        <strong>「原則禁止、許可リスト運用」</strong>:
                        既定をblockedにし、業務上必要な拡張機能のみを個別にallowedまたはforce_installedに設定する。ユーザーからの拡張機能リクエストを受け付ける「Extension
                        workflows」機能と組み合わせることもできる。
                    </li>
                </ol>
                <p>
                    強制インストールされた拡張機能・アプリは、Chromeウェブストアサービス自体がオフになっていても引き続き自動インストールされ、ブロック設定よりも優先される。設定はUsers
                    &amp; browsers単位のほか、User app settings画面からも構成でき、グループとアプリ数の組み合わせで500件という上限がある点にも注意する。
                </p>
                <p>
                    自社サーバーでホストする独自拡張機能（Chromeウェブストア外）を自動インストールする場合は、パッケージ済みの.crxファイルをダウンロードできるURLをupdate_urlとして指定する。Windowsで独自拡張機能を自動インストールするには、コンピューターがMicrosoft
                    Active Directoryドメインに参加している必要がある。
                </p>

                <h5>ベストプラクティス</h5>
                <ul>
                    <li>
                        業務に必須の拡張機能（例: オフラインアクセス用のGoogle Docs
                        Offline）はforce_installedで確実に配布し、ユーザーが誤って無効化する事故を防ぐ。
                    </li>
                    <li>
                        セキュリティ上のリスクが高い組織（規制業種など）では「原則禁止、許可リスト運用」を採用し、拡張機能の来歴を管理しやすくする。
                    </li>
                    <li>
                        ブロックする拡張機能にはカスタムメッセージを設定し、なぜブロックされているのか・どこに問い合わせればよいのかをユーザーに明示することで、ヘルプデスクへの問い合わせを削減する。
                    </li>
                    <li>
                        拡張機能・アプリの使用状況レポート（View app and extension usage
                        details）を定期的に確認し、許可リストの棚卸しに活用する。
                    </li>
                </ul>

                <hr />

                <h2 id="学習チェックリスト">学習チェックリスト</h2>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span>Section 5 理解度チェック</span>
                        <span className="checklist-counter">
                            {completedCount} / {CHECKLIST_ITEMS.length} 完了
                        </span>
                    </div>
                    <ul className="checklist-list">
                        {CHECKLIST_ITEMS.map((item, idx) => (
                            <li key={idx}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[idx]}
                                        onChange={() => handleCheckboxChange(idx)}
                                    />
                                    <span>{item}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr />

                <h2 id="参考文献">参考文献</h2>
                <div className="ref-grid">
                    <div className="ref-card">
                        <h3 id="google公式認定試験ガイド">Google公式（認定・試験ガイド）</h3>
                        <ul>
                            <li>
                                <a
                                    href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Associate Google Workspace
                                    Administrator 認定ページ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>公式Exam Guide（PDF）
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="ref-card">
                        <h3 id="モバイルデバイス管理google-workspace-help--knowledgeworkspacegooglecom">
                            モバイルデバイス管理（Google Workspace Help /
                            knowledge.workspace.google.com）
                        </h3>
                        <ul>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/set-up-basic-mobile-device-management"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Set up basic mobile device
                                    management
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/set-up-advanced-mobile-management"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Set up advanced mobile
                                    management
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/compare-mobile-management-features"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Compare mobile management
                                    features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/set-up-third-party-partner-integrations"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Set up third-party partner
                                    integrations
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/turn-endpoint-verification-on-or-off"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Turn endpoint verification on
                                    or off
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/require-admin-approval-for-device-access"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Require admin approval for
                                    device access
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/wipe-corporate-data-from-a-device"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Wipe corporate data from a
                                    device
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/sign-a-user-out-of-a-managed-google-account"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Sign a user out of a managed
                                    Google Account
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/devices/device-management-security-checklist"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Device management security
                                    checklist
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="ref-card">
                        <h3 id="chromeブラウザ管理chrome-enterprise-and-education-help">
                            Chromeブラウザ管理（Chrome Enterprise and Education Help）
                        </h3>
                        <ul>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/9301891?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>2. Enroll cloud-managed
                                    Chrome browsers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/9301892?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>4. Set policies for enrolled
                                    Chrome browsers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/9037717?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Understand Chrome policy
                                    management
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/6177431?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Allow or block apps and
                                    extensions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/6306504?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Automatically install apps
                                    and extensions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/7532015?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Set Chrome app and extension
                                    policies (Windows)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/9838774?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Manage Chrome updates (Chrome
                                    Enterprise Core)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/chrome/a/answer/7591084?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Manage Chrome updates (Mac)
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="ref-card">
                        <h3 id="オフラインアクセスdrive--docs">
                            オフラインアクセス（Drive &amp; Docs）
                        </h3>
                        <ul>
                            <li>
                                <a
                                    href="https://knowledge.workspace.google.com/admin/drive/set-up-offline-access-to-docs-sheets-and-slides"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ref-icon">↗</span>Set up offline access to
                                    Docs, Sheets &amp; Slides
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="page-footer">
                    本ガイドは2026年8月時点のGoogle公式ヘルプセンター・Exam
                    Guideの内容に基づいて作成されている。Admin
                    consoleのUIやポリシー名は将来的に変更される可能性があるため、実際の設定作業の際は必ず公式ヘルプの最新版を確認すること。
                </div>
            </main>
        </div>
    );
}
