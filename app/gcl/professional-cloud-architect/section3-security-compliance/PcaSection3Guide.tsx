'use client';

import { useState, useCallback, memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

const CHECKLIST_ITEMS = [
    "IAMのプリンシパル・ロール・許可ポリシー・拒否ポリシー・条件の違いを説明できる",
    "基本ロール・事前定義ロール・カスタムロールの使い分けと、基本ロールが推奨されない理由を説明できる",
    "リソース階層（組織・フォルダ・プロジェクト）の継承の仕組みと、フォルダ設計のベストプラクティスを説明できる",
    "CMEK・CSEK・Cloud\n                                EKM・デフォルト暗号化の違いと、それぞれを選択する基準を説明できる",
    "封筒暗号化（KEKとDEK）の仕組みを図で説明できる",
    "Secret ManagerとCloud KMSの役割の違いを説明できる",
    "職務分掌の考え方と、Cloud\n                                KMSの集中管理モデル/委任管理モデルの違いを説明できる",
    "Cloud Audit Logsの4種類（Admin Activity、Data Access、System\n                                Event、Policy\n                                Denied）の違いとデフォルトの有効化状況を説明できる",
    "VPC Service\n                                ControlsがIAMと独立した防御レイヤーとして機能する理由を説明できる",
    "コンテキストアウェアアクセス（IAP + Access Context\n                                Manager）の仕組みを説明できる",
    "組織ポリシーサービスと階層ファイアウォールポリシーの違いと、それぞれの継承ルールを説明できる",
    "Cloud KMS\n                                Autokeyが手動プロビジョニングと比べて何を自動化するかを説明できる",
    "サービスアカウントキーのエクスポートよりも、なりすまし（Impersonation）とWorkload\n                                Identity Federationが推奨される理由を説明できる",
    "Chrome Enterprise Premiumを構成する4つの機能を挙げられる",
    "SLSAフレームワークの目的と、Binary\n                                Authorizationがどのようにデプロイ時のゲートキーパーとして機能するかを説明できる",
    "Model ArmorとSensitive Data Protectionの役割分担を説明できる",
    "共有責任モデルにおける、Google・共有・顧客それぞれの責任範囲の考え方を説明できる",
    "Assured\n                                Workloadsの3種類のコントロールパッケージ（地域データ境界・規制データ境界・パートナーによる主権制御）を説明できる",
    "HIPAA・PCI\n                                DSSにおける「認証制度が存在しない」「責任共有モデルが適用される」という考え方を説明できる",
    "Cloud Audit LogsとAccess Transparency / Access\n                                Approvalの違いを説明できる"
];

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 3 完全対策ガイドコンポーネント (Client Component)
 */
export function PcaSection3Guide() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleToggleNav = useCallback(() => {
        setIsNavOpen((prev) => !prev);
    }, []);

    const handleCloseNav = useCallback(() => {
        setIsNavOpen(false);
    }, []);

    const toggleCheck = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pca-s3-page">
            <div className="layout">
                <NavBar isOpen={isNavOpen} onToggle={handleToggleNav} onClose={handleCloseNav} />

                <main className="main">
                    
                <div className="hero">
                    <div className="hero-kicker">Professional Cloud Architect Exam Guide</div>
                    <h1>Google Cloud Professional Cloud Architect 試験対策ガイド</h1>
                    <p className="hero-sub">
                        Section 3: セキュリティとコンプライアンスの設計（配点 約17.5%）
                    </p>
                    <div className="meta-card">
                        <strong>対象</strong>: Google Cloud Professional Cloud
                        Architect（PCA）認定試験を初めて学習する方<br />
                        <strong>本ガイドの範囲</strong>: 公式
                        <a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf" target="_blank" rel="noopener">Exam Guide</a>
                        の
                        <strong>Section 3: Designing for security and compliance</strong>
                        に完全準拠<br />
                        <strong>前提知識</strong>: GCPの基本操作（プロジェクト作成、Cloud
                        Consoleの利用）ができる方を想定し、専門用語は初出時に必ず解説します
                    </div>
                </div>

                <p>
                    Professional Cloud Architect試験の6セクションの中で、Section
                    3は約17.5%の配点を持つ「設計と計画」（Section
                    1、約25%）に次いで重要性の高い分野です。IAM、リソース階層、暗号鍵管理、ネットワークセキュリティ制御、AIセキュリティ、そしてコンプライアンス対応まで、クラウドアーキテクトが実務で最も頻繁に判断を求められる領域を横断的にカバーします。
                </p>
                <hr />
                <hr />
                <h2 id="section-3-の全体像" tabIndex={-1}>Section 3 の全体像</h2>
                <p>公式Exam Guideでは、Section 3は2つの主要タスクに分かれています。</p>
                <Diagram id="diag-1" label="Section 3 の全体像" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">タスク</th>
                                <th scope="col">内容</th>
                                <th scope="col">主要サービス・機能</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>3.1 セキュリティの設計</td>
                                <td>
                                    Identity and Access
                                    Management（IAM）、リソース階層、データセキュリティ、職務分掌、セキュリティ制御、Cloud
                                    KMSによるCMEK管理、セキュアなリモートアクセス、ソフトウェアサプライチェーンのセキュリティ、AIのセキュリティ
                                </td>
                                <td>
                                    IAM、Resource Manager、Cloud KMS、Secret Manager、Cloud Audit
                                    Logs、VPC Service Controls、Context-Aware Access、Organization
                                    Policy Service、階層ファイアウォールポリシー、IAP、Workload
                                    Identity Federation、Chrome Enterprise Premium、Binary
                                    Authorization、Model Armor、Sensitive Data Protection
                                </td>
                            </tr>
                            <tr className="even">
                                <td>3.2 コンプライアンスの設計</td>
                                <td>
                                    法令・規制（健康記録のプライバシー、児童のプライバシー、データプライバシー、データ所有権、データ主権）、商用データ（クレジットカード情報、PII）、業界認証（SOC
                                    2など）、監査（ログを含む）
                                </td>
                                <td>
                                    Assured Workloads、Cloud Audit Logs、Access Transparency、Access
                                    Approval、Compliance resource center
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source-line">
                    出典: 公式Exam Guide PDF「Section 3: Designing for security and compliance
                    (~17.5% of the exam)」<a className="cite-ref" href="#ref-1" id="fnref1"><sup>1</sup></a>
                </p>
                <hr />
                <h2 id="31-セキュリティの設計" tabIndex={-1}>3.1 セキュリティの設計</h2>
                <h3 id="311-identity-and-access-managementiam" tabIndex={-1}>
                    3.1.1 Identity and Access Management（IAM）
                </h3>
                <p>
                    IAMは「誰が（Who）」「何に対して（Which resource）」「どのような操作を（What
                    access)」行えるかを制御する、Google
                    Cloudのセキュリティの根幹をなす仕組みです。試験ではIAMの構成要素の理解に加え、最小権限の原則（Principle
                    of Least Privilege）をどう実践するかが繰り返し問われます。
                </p>
                <h4 id="iamの基本構成要素" tabIndex={-1}>IAMの基本構成要素</h4>
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
                                <td>プリンシパル（Principal）</td>
                                <td>
                                    リソースにアクセスする主体。ユーザー、Googleグループ、サービスアカウント、Cloud
                                    Identityドメインなど
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ロール（Role）</td>
                                <td>
                                    一連の権限（permission）の集合。「compute.instances.list」のような個々の権限を束ねたもの
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>許可ポリシー（Allow Policy）</td>
                                <td>
                                    「どのプリンシパルに」「どのロールを」「どのリソースに対して」付与するかを定義するバインディングの集合
                                </td>
                            </tr>
                            <tr className="even">
                                <td>条件（IAM Conditions）</td>
                                <td>
                                    許可ポリシーに時間・リソース属性などの条件式（CEL: Common
                                    Expression Language）を付加し、動的な権限制御を実現
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>拒否ポリシー（Deny Policy）</td>
                                <td>
                                    許可ポリシーとは独立して、特定の権限を明示的に拒否する。許可ポリシーより優先される
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="ロールの3分類" tabIndex={-1}>ロールの3分類</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ロール種別</th>
                                <th scope="col">特徴</th>
                                <th scope="col">推奨度</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>基本ロール（Basic roles）</td>
                                <td>
                                    Owner・Editor・Viewerなど。プロジェクト内の広範な権限を一括付与
                                </td>
                                <td>
                                    本番環境では非推奨。数千に及ぶ権限を含むため最小権限の原則に反する<a className="cite-ref" href="#ref-2" id="fnref2"><sup>2</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>事前定義ロール（Predefined roles）</td>
                                <td>
                                    Google Cloudが職務単位で用意したロール（例:
                                    roles/compute.instanceAdmin.v1）
                                </td>
                                <td>多くのユースケースで推奨</td>
                            </tr>
                            <tr className="odd">
                                <td>カスタムロール（Custom roles）</td>
                                <td>組織独自に権限を組み合わせて作成するロール</td>
                                <td>事前定義ロールで要件を満たせない場合に使用</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="iamポリシーの評価フロー" tabIndex={-1}>IAMポリシーの評価フロー</h4>
                <Diagram id="diag-2" label="IAMポリシーの評価フロー" />
                <p>
                    拒否ポリシーは許可ポリシーより優先して評価されるため、「特定の高権限操作を組織全体で禁止する」といった防御多層化（defense
                    in depth）に有効です<a className="cite-ref" href="#ref-3" id="fnref3"><sup>3</sup></a>。
                </p>
                <h4 id="リソース階層でのアクセス制御" tabIndex={-1}>リソース階層でのアクセス制御</h4>
                <p>
                    IAMの許可ポリシーは組織 → フォルダ → プロジェクト →
                    個別リソースの階層に沿って<strong>継承</strong>されます。上位で付与したロールは下位のすべての子リソースに自動的に伝播します（詳細は<a href="#312-リソース階層組織フォルダプロジェクト">3.1.2</a>）<a className="cite-ref" href="#ref-4" id="fnref4"><sup>4</sup></a>。
                </p>
                <h4 id="iamのベストプラクティス" tabIndex={-1}>IAMのベストプラクティス</h4>
                <Diagram id="diag-3" label="IAMのベストプラクティス" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">具体的な実践方法</th>
                                <th scope="col">出典</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>最小権限の原則を徹底する</td>
                                <td>
                                    基本ロールを避け、事前定義ロールまたはカスタムロールを使用。ロール推奨（Role
                                    Recommender）で未使用権限を継続的に削減
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-2" id="fnref5"><sup>2</sup></a><a className="cite-ref" href="#ref-5" id="fnref6"><sup>5</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>個人ではなくグループに権限を付与する</td>
                                <td>
                                    Google
                                    Groupsを介してロールをバインドし、メンバー変更時のIAMポリシー更新を不要にする
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-6" id="fnref7"><sup>6</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>デフォルトサービスアカウントへの自動ロール付与を無効化する</td>
                                <td>
                                    組織ポリシーでEditorロールの自動付与を制御。サービスにはサービスエージェントを利用させ、デフォルトSAに依存しない
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-5" id="fnref8"><sup>5</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>サービスアカウントキーの利用を最小化する</td>
                                <td>
                                    Compute Engine・GKE・Cloud Run
                                    functionsなどではメタデータサーバー経由の認証を利用し、キーのエクスポートを避ける。他クラウドからはWorkload
                                    Identity Federationを使用（<a href="#317-セキュアなリモートアクセス">3.1.7</a>参照）
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-5" id="fnref9"><sup>5</sup></a><a className="cite-ref" href="#ref-7" id="fnref10"><sup>7</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Privileged Access Managerで昇格権限を時限化する</td>
                                <td>
                                    常時特権ではなく、必要な時だけ条件付きIAMバインディングで一時的に昇格権限を付与し、自動失効させる
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-8" id="fnref11"><sup>8</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>IAM Denyポリシーで防御を多層化する</td>
                                <td>
                                    開発環境でのIAMロール変更・組織ポリシー変更・課金情報アクセスなど高権限操作を、許可ポリシーとは独立して拒否
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-3" id="fnref12"><sup>3</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ワークロードIDフェデレーションを優先する</td>
                                <td>
                                    外部ワークロード（GitHub
                                    Actions、AWS、オンプレミス等）からのアクセスにはサービスアカウントキーではなく、短期的な認証情報を発行するWorkload
                                    Identity Federationを使用
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-7" id="fnref13"><sup>7</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="312-リソース階層組織フォルダプロジェクト" tabIndex={-1}>
                    3.1.2 リソース階層（組織・フォルダ・プロジェクト）
                </h3>
                <p>
                    Google
                    Cloudのすべてのリソースは、単一のルートを持つ木構造（ツリー構造）に編成されます。この構造を**リソース階層（Resource
                    Hierarchy）**と呼び、IAM許可ポリシーと組織ポリシーの両方がこの階層に沿って継承される、いわば「ガバナンスの背骨」です<a className="cite-ref" href="#ref-9" id="fnref14"><sup>9</sup></a>。
                </p>
                <h4 id="階層構造" tabIndex={-1}>階層構造</h4>
                <Diagram id="diag-4" label="階層構造" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">階層レベル</th>
                                <th scope="col">役割</th>
                                <th scope="col">主な特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>組織（Organization）</td>
                                <td>リソース階層のルート。会社全体を表す</td>
                                <td>
                                    Google WorkspaceまたはCloud
                                    Identityアカウントに紐づく。組織レベルのIAM/組織ポリシーはすべての子リソースに継承される<a className="cite-ref" href="#ref-9" id="fnref15"><sup>9</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>フォルダ（Folder）</td>
                                <td>プロジェクトやフォルダをグルーピングする任意の中間層</td>
                                <td>
                                    最大10階層までネスト可能。1つの親フォルダに直接持てる子フォルダは300個まで<a className="cite-ref" href="#ref-10" id="fnref16"><sup>10</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>プロジェクト（Project）</td>
                                <td>
                                    実際のリソース（VM、バケット等）を保持する基本単位であり、課金・API有効化・信頼境界の単位
                                </td>
                                <td>
                                    プロジェクト内のサービスはデフォルトで相互に一定の信頼関係を持つ<a className="cite-ref" href="#ref-4" id="fnref17"><sup>4</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>リソース（Resource）</td>
                                <td>
                                    Compute Engineインスタンス、Cloud
                                    Storageバケット、Pub/Subトピックなど個々のサービスリソース
                                </td>
                                <td>一部のリソースはリソースレベルでのIAMロール付与にも対応</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="階層構造がもたらす3つの利点" tabIndex={-1}>階層構造がもたらす3つの利点</h4>
                <Diagram id="diag-5" label="階層構造がもたらす3つの利点" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-9" id="fnref18"><sup>9</sup></a>
                </p>
                <h4 id="リソース階層設計のベストプラクティス" tabIndex={-1}>
                    リソース階層設計のベストプラクティス
                </h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    組織構造・環境・コンプライアンス境界に合わせてフォルダを設計する
                                </td>
                                <td>
                                    部門・チーム・製品単位、または本番/検証/開発などの環境単位でフォルダを分割し、IAMと組織ポリシーの適用範囲を明確化する<a className="cite-ref" href="#ref-11" id="fnref19"><sup>11</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>複数プロジェクトにまたがるロールはフォルダレベルで付与する</td>
                                <td>
                                    ユーザーやグループが複数プロジェクトへのアクセスを必要とする場合、個々のプロジェクトへの重複設定を避けフォルダレベルでロールを設定する<a className="cite-ref" href="#ref-4" id="fnref20"><sup>4</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ラベルとタグを併用してリソースをアノテーションする</td>
                                <td>
                                    階層による構造化に加え、ラベル（課金分析用）とタグ（条件付きポリシー適用用）できめ細かい管理を実現する<a className="cite-ref" href="#ref-4" id="fnref21"><sup>4</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>サンドボックスフォルダから始める</td>
                                <td>
                                    本番導入前に単一のサンドボックスフォルダで階層設計を試行し、組織に最適な構成を検証する<a className="cite-ref" href="#ref-10" id="fnref22"><sup>10</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>プロジェクトを信頼境界として扱う</td>
                                <td>
                                    同一プロジェクト内のサービスはデフォルトで一定の信頼関係を持つため、機密度の異なるワークロードは別プロジェクトに分離する<a className="cite-ref" href="#ref-4" id="fnref23"><sup>4</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="313-データセキュリティ鍵管理暗号化シークレット管理" tabIndex={-1}>
                    3.1.3 データセキュリティ（鍵管理・暗号化・シークレット管理）
                </h3>
                <p>
                    Google Cloudでは保存データ（data at
                    rest）はデフォルトですべて暗号化されますが、規制要件や独自のセキュリティポリシーに応じて、暗号化方式や鍵の管理主体を選択できます。
                </p>
                <h4 id="暗号化オプションの比較" tabIndex={-1}>暗号化オプションの比較</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">鍵の生成・管理主体</th>
                                <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>デフォルト暗号化（Google-managed keys）</td>
                                <td>Google</td>
                                <td>追加設定不要。多くのワークロードで十分な保護レベル</td>
                            </tr>
                            <tr className="even">
                                <td>顧客管理暗号鍵（CMEK: Customer-Managed Encryption Keys）</td>
                                <td>顧客がCloud KMS上で鍵を作成・管理</td>
                                <td>
                                    鍵のローテーション・無効化・削除（クリプトシュレッディング）を顧客が制御したい場合
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>顧客提供暗号鍵（CSEK: Customer-Supplied Encryption Keys）</td>
                                <td>顧客がGoogle Cloud外で鍵を保持し、リクエスト時に提供</td>
                                <td>
                                    鍵をGoogle Cloud上に一切保存したくない場合。一部サービスのみ対応
                                </td>
                            </tr>
                            <tr className="even">
                                <td>外部鍵管理（Cloud EKM: External Key Manager）</td>
                                <td>顧客がGoogle Cloud外部のサードパーティKMSで鍵を管理</td>
                                <td>
                                    主権要件が特に厳しい場合や、Google
                                    Cloud外に鍵の物理的な管理を残したい場合<a className="cite-ref" href="#ref-12" id="fnref24"><sup>12</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>CMEKを選択すべき典型的な要件は次のとおりです。</p>
                <Diagram id="diag-6" label="暗号化オプションの比較" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-13" id="fnref25"><sup>13</sup></a>
                </p>
                <h4 id="封筒暗号化envelope-encryptionの仕組み" tabIndex={-1}>
                    封筒暗号化（Envelope Encryption）の仕組み
                </h4>
                <p>
                    CMEKはCloud KMS上の鍵暗号化鍵（KEK: Key Encryption Key）でデータ暗号化鍵（DEK:
                    Data Encryption Key）をラップする「封筒暗号化」方式を採用しています。
                </p>
                <Diagram id="diag-7" label="封筒暗号化（Envelope Encryption）の仕組み" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-12" id="fnref26"><sup>12</sup></a>
                </p>
                <h4 id="secret-managerによるシークレット管理" tabIndex={-1}>
                    Secret Managerによるシークレット管理
                </h4>
                <p>
                    APIキー・パスワード・証明書などの機密性の高い設定値は、コードやコンテナイメージに埋め込まず、<strong>Secret Manager</strong>で一元管理することが推奨されます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">特徴</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>保管時の暗号化</td>
                                <td>
                                    AES-256で自動的に暗号化。追加設定は不要<a className="cite-ref" href="#ref-14" id="fnref27"><sup>14</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>バージョニング</td>
                                <td>
                                    シークレットの変更履歴をバージョンとして保持し、ロールバックが可能<a className="cite-ref" href="#ref-14" id="fnref28"><sup>14</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>レプリケーションポリシー</td>
                                <td>
                                    自動（Google
                                    Cloudが最適リージョンを選択）またはユーザー管理（リージョンを指定、データ主権要件に対応）を選択可能<a className="cite-ref" href="#ref-14" id="fnref29"><sup>14</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>アクセス制御</td>
                                <td>
                                    IAMのきめ細かいロール（Secret Accessor / Secret Version
                                    Manager等）とIAM
                                    Conditionsで、閲覧・管理・監査の職責を分離可能<a className="cite-ref" href="#ref-15" id="fnref30"><sup>15</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>自動ローテーション</td>
                                <td>
                                    有効期限に応じた自動ローテーション通知（Pub/Sub連携）を設定可能<a className="cite-ref" href="#ref-14" id="fnref31"><sup>14</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>Cloud KMSとSecret Managerの違いを理解することも重要です。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較項目</th>
                                <th scope="col">Cloud KMS</th>
                                <th scope="col">Secret Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>主な用途</td>
                                <td>暗号鍵そのものの生成・保管・ローテーション・利用制御</td>
                                <td>
                                    パスワードやAPIキーなど「シークレット値」そのものの保管・バージョニング
                                </td>
                            </tr>
                            <tr className="even">
                                <td>典型的な利用形態</td>
                                <td>
                                    他のGoogle
                                    CloudサービスのCMEK統合や、アプリケーションからの暗号/復号API呼び出し
                                </td>
                                <td>アプリケーションが起動時にシークレット値を取得して利用</td>
                            </tr>
                            <tr className="odd">
                                <td>暗号化方式</td>
                                <td>
                                    鍵管理サービス自体（KMS上の鍵はHSMまたはソフトウェアで保護）
                                </td>
                                <td>
                                    内部的にはGoogleが管理する鍵でAES-256暗号化（顧客はCMEKで保護することも可能）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="データセキュリティのベストプラクティス" tabIndex={-1}>
                    データセキュリティのベストプラクティス
                </h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                                <th scope="col">出典</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>シークレットをファイルシステムや環境変数に平置きしない</td>
                                <td>
                                    ディレクトリトラバーサル攻撃やデバッグエンドポイントからの漏えいリスクを避け、Secret
                                    Manager APIを直接呼び出す
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-16" id="fnref32"><sup>16</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    シークレットへのアクセスはシークレット単位で最小権限を付与する
                                </td>
                                <td>
                                    プロジェクトレベルでSecret
                                    Accessorロールを付与すると全シークレットが閲覧可能になるため、個別シークレットへのIAMバインディングを行う
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-17" id="fnref33"><sup>17</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>組織所有権はセキュアな管理者アカウントに限定する</td>
                                <td>
                                    組織全体の管理権限を持つアカウントを最小限に絞り、環境（ステージング/本番）ごとにプロジェクトを分離する
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-16" id="fnref34"><sup>16</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    Cloud Asset Inventoryでシークレット・鍵の設定状況を継続監視する
                                </td>
                                <td>
                                    ローテーション・暗号化設定・所在地の組織要件への非準拠を検知する
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-15" id="fnref35"><sup>15</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>VPC Service Controlsでネットワークベースの制御を追加する</td>
                                <td>
                                    IAMに加え、Secret Manager
                                    APIへのアクセスをサービス境界で制限し、データ持ち出しリスクを低減する
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-15" id="fnref36"><sup>15</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="314-職務分掌separation-of-duties" tabIndex={-1}>
                    3.1.4 職務分掌（Separation of Duties）
                </h3>
                <p>
                    職務分掌（SoD: Separation of
                    Duties）は、単独の担当者が不正・誤操作を行うリスクを低減するために、重要な業務を複数の役割に分割し、それぞれ異なる担当者に割り当てる統制です<a className="cite-ref" href="#ref-18" id="fnref37"><sup>18</sup></a>。
                </p>
                <h4 id="google-cloudにおける職務分掌の実現手段" tabIndex={-1}>
                    Google Cloudにおける職務分掌の実現手段
                </h4>
                <Diagram id="diag-8" label="Google Cloudにおける職務分掌の実現手段" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-18" id="fnref38"><sup>18</sup></a><a className="cite-ref" href="#ref-3" id="fnref39"><sup>3</sup></a>
                </p>
                <h4 id="cloud-kmsにおける鍵管理モデルの選択" tabIndex={-1}>
                    Cloud KMSにおける鍵管理モデルの選択
                </h4>
                <p>
                    Cloud
                    KMSでは、鍵管理者とデータ利用者の職責を分離するために、2つの管理モデルが提供されています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">モデル</th>
                                <th scope="col">特徴</th>
                                <th scope="col">適した組織</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>集中管理モデル（Centralized / Dedicated-project）</td>
                                <td>
                                    鍵を専用の「鍵管理プロジェクト」に集約し、中央のセキュリティチームが鍵の管理権限を持つ。リソースを含むプロジェクトの担当者は鍵プロジェクトへのアクセス権を持たない
                                </td>
                                <td>
                                    中央集権的なセキュリティチームを持つ組織、または鍵材料の厳格な分離が求められる組織<a className="cite-ref" href="#ref-19" id="fnref40"><sup>19</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>委任管理モデル（Delegated / Same-project）</td>
                                <td>CMEKをリソースと同一プロジェクトに保管する</td>
                                <td>
                                    開発者の俊敏性を優先し、中央セキュリティチームとのやり取りを減らしたい組織<a className="cite-ref" href="#ref-19" id="fnref41"><sup>19</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    両モデルは環境ごとに使い分けることも可能で、例えば本番環境は集中管理モデル、開発・検証環境は委任管理モデルとする構成が一般的です<a className="cite-ref" href="#ref-19" id="fnref42"><sup>19</sup></a>。
                </p>
                <h4 id="職務分掌の実例サービスアカウント関連ロール" tabIndex={-1}>
                    職務分掌の実例（サービスアカウント関連ロール）
                </h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">アンチパターン</th>
                                <th scope="col">問題点</th>
                                <th scope="col">是正策</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    同一プリンシパルにService Account AdminとService Account
                                    Userの両方を付与
                                </td>
                                <td>
                                    サービスアカウントの作成者が、そのサービスアカウントを利用したなりすまし操作まで単独で行えてしまう
                                </td>
                                <td>
                                    作成・管理を行う担当者と、実際にサービスアカウントを利用してリソースを操作する担当者を分離する<a className="cite-ref" href="#ref-20" id="fnref43"><sup>20</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>鍵管理者がデータへの直接アクセス権も保有</td>
                                <td>
                                    鍵の無効化権限とデータの読み取り権限が同一人物に集中し、内部不正のリスクが高まる
                                </td>
                                <td>
                                    集中管理モデルを採用し、鍵プロジェクトのオーナー権限をデータプロジェクトの担当者から分離する<a className="cite-ref" href="#ref-21" id="fnref44"><sup>21</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー" tabIndex={-1}>
                    3.1.5 セキュリティ制御（監査・VPC Service
                    Controls・コンテキストアウェアアクセス・組織ポリシー・階層ファイアウォールポリシー）
                </h3>
                <p>
                    このセクションは3.1の中でも扱う機能が最も多く、試験でも頻出のテーマです。それぞれの制御が「何を」「どのレイヤーで」保護するのかを対比しながら理解することが重要です。
                </p>
                <Diagram id="diag-9" label="3.1.5 セキュリティ制御（監査・VPC Service
                    Controls・コンテキストアウェアアクセス・組織ポリシー・階層ファイアウォールポリシー）" />
                <h4 id="1-cloud-audit-logs" tabIndex={-1}>(1) Cloud Audit Logs</h4>
                <p>
                    Cloud Audit
                    Logsは「誰が」「いつ」「どのリソースに対して」「どのAPIを呼び出したか」を記録する、コントロールプレーンの証跡です。4種類のログタイプがあります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ログタイプ</th>
                                <th scope="col">内容</th>
                                <th scope="col">デフォルトで有効か</th>
                                <th scope="col">保持期間の目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Admin Activity（管理アクティビティ）</td>
                                <td>
                                    リソースの構成・メタデータを変更するAPI呼び出し（例:
                                    IAM権限の変更、VM作成）
                                </td>
                                <td>常時有効・無効化不可</td>
                                <td>
                                    400日<a className="cite-ref" href="#ref-22" id="fnref45"><sup>22</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Data Access（データアクセス）</td>
                                <td>
                                    リソースの構成・メタデータの読み取り、およびユーザー提供データの作成・変更・読み取り
                                </td>
                                <td>
                                    サービスごとに個別に有効化が必要（BigQueryは例外的にデフォルト有効）
                                </td>
                                <td>
                                    30日<a className="cite-ref" href="#ref-22" id="fnref46"><sup>22</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>System Event（システムイベント）</td>
                                <td>
                                    Google Cloudのシステムによって自動的に生成される変更（Compute
                                    Engineのライブマイグレーション等）
                                </td>
                                <td>常時有効・無効化不可</td>
                                <td>Admin Activityと同様</td>
                            </tr>
                            <tr className="even">
                                <td>Policy Denied（ポリシー拒否）</td>
                                <td>
                                    セキュリティポリシー（VPC Service
                                    Controls等）違反によりアクセスが拒否された記録
                                </td>
                                <td>デフォルトで有効</td>
                                <td>Data Accessと同様</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-23" id="fnref47"><sup>23</sup></a><a className="cite-ref" href="#ref-24" id="fnref48"><sup>24</sup></a><a className="cite-ref" href="#ref-22" id="fnref49"><sup>22</sup></a>
                </p>
                <Diagram id="diag-10" label="(1) Cloud Audit Logs" />
                <p><strong>監査ログのベストプラクティス</strong></p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>機密データを扱うサービスでData Accessログを個別に有効化する</td>
                                <td>
                                    Cloud Storageの機密バケット、Secret
                                    Manager、BigQueryの規制対象データセットなど、優先度の高い領域から有効化する<a className="cite-ref" href="#ref-22" id="fnref50"><sup>22</sup></a><a className="cite-ref" href="#ref-25" id="fnref51"><sup>25</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ログシンクを事前に設定する</td>
                                <td>
                                    シンクは過去のログを遡って取り込まないため、必要になる前にCloud
                                    Storage・BigQuery・Log Bucketへのエクスポート設定を行う<a className="cite-ref" href="#ref-22" id="fnref52"><sup>22</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IAM変更やサービスアカウントキー作成をアラート対象にする</td>
                                <td>
                                    <code>SetIamPolicy</code>やサービスアカウントキー作成イベントなど高リスク操作を監視し、異常検知に活用する<a className="cite-ref" href="#ref-22" id="fnref53"><sup>22</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    Access
                                    TransparencyログとあわせてGoogle人員によるアクセスも監査する
                                </td>
                                <td>
                                    顧客側の操作記録（Cloud Audit
                                    Logs）とGoogle人員の操作記録（Access
                                    Transparency）を併用し、完全な証跡を確保する（詳細は<a href="#324-監査ログを含む">3.2.4</a>）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="2-vpc-service-controls" tabIndex={-1}>(2) VPC Service Controls</h4>
                <p>
                    VPC Service Controlsは、IAMとは独立した「サービス境界（Service
                    Perimeter）」を構成し、Cloud
                    StorageやBigQueryなどのGoogle管理サービスへのアクセスを、境界の内外という文脈で制御する仕組みです。主な目的はデータ持ち出し（exfiltration）リスクの低減です<a className="cite-ref" href="#ref-26" id="fnref54"><sup>26</sup></a>。
                </p>
                <Diagram id="diag-11" label="(2) VPC Service Controls" />
                <p>
                    VPC Service Controlsが緩和する代表的なリスクは次の2つです<a className="cite-ref" href="#ref-26" id="fnref55"><sup>26</sup></a>。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">リスク</th>
                                <th scope="col">VPC Service Controlsによる緩和策</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    盗まれたOAuth・サービスアカウント認証情報による境界外ネットワークからのアクセス
                                </td>
                                <td>
                                    許可されたVPCネットワークからのプライベートアクセスのみを許可し、正規の認証情報であっても境界外からのアクセスを拒否
                                </td>
                            </tr>
                            <tr className="even">
                                <td>内部関係者や侵害されたコードによるデータの持ち出し</td>
                                <td>
                                    境界内のクライアントが境界外リソースへ読み書きすることを防止し、ネットワーク的な出口制御を補完
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>運用モード</strong></p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">モード</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Dry-run（試行）モード</td>
                                <td>
                                    違反をログに記録するが、実際のアクセスはブロックしない。本番導入前の影響確認に使用<a className="cite-ref" href="#ref-27" id="fnref56"><sup>27</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Enforced（強制）モード</td>
                                <td>
                                    違反したリクエストを実際に拒否する。デフォルトのモード<a className="cite-ref" href="#ref-27" id="fnref57"><sup>27</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="3-コンテキストアウェアアクセスidentity-aware-proxy--access-context-manager" tabIndex={-1}>
                    (3) コンテキストアウェアアクセス（Identity-Aware Proxy / Access Context
                    Manager）
                </h4>
                <p>
                    コンテキストアウェアアクセスは、ユーザーIDに加えて「どのネットワークから」「どのデバイスから」「いつ」アクセスしているかという<strong>文脈情報</strong>に基づいてアクセスを許可・拒否する仕組みです。VPNのような「ネットワークにいるか否か」の二択（全か無か）ではなく、より粒度の細かい制御を実現します<a className="cite-ref" href="#ref-28" id="fnref58"><sup>28</sup></a>。
                </p>
                <Diagram id="diag-12" label="(3) コンテキストアウェアアクセス（Identity-Aware Proxy / Access Context
                    Manager）" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-29" id="fnref59"><sup>29</sup></a><a className="cite-ref" href="#ref-30" id="fnref60"><sup>30</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">構成要素</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Identity-Aware Proxy（IAP）</td>
                                <td>
                                    HTTPS経由のアプリケーションおよびTCPフォワーディング（VM への
                                    SSH/RDP）に対する中央集権的な認可レイヤー。ネットワークレベルのファイアウォールに代わりアプリケーションレベルでアクセス制御する<a className="cite-ref" href="#ref-29" id="fnref61"><sup>29</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Access Context Manager</td>
                                <td>
                                    IPアドレス範囲やデバイス属性に基づく「アクセスレベル」を定義するルールエンジン<a className="cite-ref" href="#ref-30" id="fnref62"><sup>30</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IAM Conditions</td>
                                <td>
                                    URLパス・日時などに基づく追加の制約をIAMバインディングに付加<a className="cite-ref" href="#ref-30" id="fnref63"><sup>30</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="4-組織ポリシーサービスorganization-policy-service" tabIndex={-1}>
                    (4) 組織ポリシーサービス（Organization Policy Service）
                </h4>
                <p>
                    組織ポリシーサービスは、IAMのように「誰が」ではなく「<strong>リソースをどのように構成できるか</strong>」を制御する、プログラマティックなガードレールです。例えば「外部IPアドレスを持つVMの作成を禁止する」「特定のリージョン以外へのリソース作成を禁止する」といった制約（constraint）を組織・フォルダ・プロジェクト単位で適用できます<a className="cite-ref" href="#ref-31" id="fnref64"><sup>31</sup></a>。
                </p>
                <Diagram id="diag-13" label="(4) 組織ポリシーサービス（Organization Policy Service）" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-31" id="fnref65"><sup>31</sup></a><a className="cite-ref" href="#ref-32" id="fnref66"><sup>32</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">組織ポリシー制約の例</th>
                                <th scope="col">目的</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    <code>constraints/iam.disableServiceAccountKeyCreation</code>
                                </td>
                                <td>
                                    サービスアカウントキーの作成自体を組織全体で禁止し、Workload
                                    Identity Federation等の利用を強制
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>constraints/compute.vmExternalIpAccess</code></td>
                                <td>外部IPを持つVMインスタンスの作成を制限</td>
                            </tr>
                            <tr className="odd">
                                <td><code>constraints/gcp.resourceLocations</code></td>
                                <td>
                                    リソースを作成できるリージョンを制限し、データ主権要件に対応
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>constraints/iam.allowedPolicyMemberDomains</code></td>
                                <td>
                                    IAMポリシーに追加できるドメインを制限し、外部ドメインへの誤った権限付与を防止
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="5-階層ファイアウォールポリシーhierarchical-firewall-policies" tabIndex={-1}>
                    (5) 階層ファイアウォールポリシー（Hierarchical Firewall Policies）
                </h4>
                <p>
                    VPCファイアウォールルールがVPCネットワーク単位で適用されるのに対し、<strong>階層ファイアウォールポリシー</strong>は組織またはフォルダのレベルでファイアウォールルールを定義し、配下のすべてのプロジェクトのVMに一括適用する仕組みです<a className="cite-ref" href="#ref-33" id="fnref67"><sup>33</sup></a>。
                </p>
                <Diagram id="diag-14" label="(5) 階層ファイアウォールポリシー（Hierarchical Firewall Policies）" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-33" id="fnref68"><sup>33</sup></a><a className="cite-ref" href="#ref-34" id="fnref69"><sup>34</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">特徴</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>評価順序</td>
                                <td>
                                    組織レベル → フォルダレベル（上位から下位）→
                                    VPCファイアウォールルールの順で評価される<a className="cite-ref" href="#ref-33" id="fnref70"><sup>33</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>goto_next</code>アクション</td>
                                <td>
                                    組織レベルでは「絶対に必須の要件」（既知の不正IP遮断、ヘルスチェック許可等）のみを強制し、それ以外は下位レベルの判断に委譲する設計が推奨される<a className="cite-ref" href="#ref-34" id="fnref71"><sup>34</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ターゲット指定</td>
                                <td>
                                    階層ファイアウォールポリシーはネットワークタグではなく、ターゲットVPCネットワークまたはターゲットサービスアカウントで対象を指定する<a className="cite-ref" href="#ref-35" id="fnref72"><sup>35</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Layer 7検査との統合</td>
                                <td>
                                    <code>apply_security_profile_group</code>アクションにより、Cloud
                                    Next Generation
                                    FirewallのURLフィルタリングや侵入検知・防止サービスと連携可能<a className="cite-ref" href="#ref-33" id="fnref73"><sup>33</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>セキュリティ制御5機能の使い分けまとめ</strong></p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">制御</th>
                                <th scope="col">主な保護対象</th>
                                <th scope="col">判定基準</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Cloud Audit Logs</td>
                                <td>可視性・証跡</td>
                                <td>誰が・何を・いつ行ったか</td>
                            </tr>
                            <tr className="even">
                                <td>VPC Service Controls</td>
                                <td>データ持ち出し防止</td>
                                <td>サービス境界の内外</td>
                            </tr>
                            <tr className="odd">
                                <td>コンテキストアウェアアクセス（IAP）</td>
                                <td>アプリケーション/VMへのアクセス</td>
                                <td>ID + デバイス + ネットワークの文脈</td>
                            </tr>
                            <tr className="even">
                                <td>組織ポリシー</td>
                                <td>リソースの構成可能性</td>
                                <td>リソース属性・設定値の許可/禁止</td>
                            </tr>
                            <tr className="odd">
                                <td>階層ファイアウォールポリシー</td>
                                <td>ネットワーク通信</td>
                                <td>送信元/宛先IP・ポート・プロトコル</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="316-cloud-kmsによる顧客管理暗号鍵cmekの管理" tabIndex={-1}>
                    3.1.6 Cloud KMSによる顧客管理暗号鍵（CMEK）の管理
                </h3>
                <p>
                    <a href="#313-データセキュリティ鍵管理暗号化シークレット管理">3.1.3</a>で暗号化オプションの全体像を扱いましたが、ここではCloud
                    KMSを用いたCMEKの実装・運用面をさらに掘り下げます。
                </p>
                <h4 id="鍵の保護レベルprotection-level" tabIndex={-1}>鍵の保護レベル（Protection Level）</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">保護レベル</th>
                                <th scope="col">説明</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ソフトウェア鍵（Software）</td>
                                <td>
                                    Cloud KMS内でソフトウェア的に保護される鍵。すべてのGoogle
                                    Cloudロケーションで利用可能
                                </td>
                                <td>一般的なCMEK要件</td>
                            </tr>
                            <tr className="even">
                                <td>Cloud HSM（マルチテナント）</td>
                                <td>
                                    FIPS 140-2レベル3準拠のハードウェアセキュリティモジュールで保護
                                </td>
                                <td>より高いコンプライアンス要件（金融・医療等）</td>
                            </tr>
                            <tr className="odd">
                                <td>Cloud HSM（シングルテナント）</td>
                                <td>専有のHSMインスタンスを利用</td>
                                <td>最も厳格な分離要件</td>
                            </tr>
                            <tr className="even">
                                <td>Cloud EKM（外部鍵管理）</td>
                                <td>Google Cloud外部のサードパーティKMSで鍵材料を保持</td>
                                <td>鍵材料をGoogle Cloud上に一切置きたくない主権要件</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-12" id="fnref74"><sup>12</sup></a>
                </p>
                <h4 id="cloud-kms-autokey" tabIndex={-1}>Cloud KMS Autokey</h4>
                <p>
                    手動でのCMEKプロビジョニングでは、Cloud
                    KMS管理者が事前にキーリングと鍵の種類、サービスエージェントへのIAMロール付与を計画する必要がありました。<strong>Cloud KMS Autokey</strong>はこのプロセスを自動化し、リソース作成時にオンデマンドでキーリング・鍵を生成し、必要なIAMロールも自動付与します<a className="cite-ref" href="#ref-36" id="fnref75"><sup>36</sup></a>。
                </p>
                <Diagram id="diag-15" label="Cloud KMS Autokey" />
                <p>
                    Autokeyで生成される鍵は、ロケーションの整合性、鍵の粒度、マルチテナントHSM保護レベル、ローテーションスケジュール、職務分掌といった業界標準のベストプラクティスに自動的に準拠するよう設計されています<a className="cite-ref" href="#ref-36" id="fnref76"><sup>36</sup></a>。
                </p>
                <h4 id="cmek運用のベストプラクティス" tabIndex={-1}>CMEK運用のベストプラクティス</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                                <th scope="col">出典</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>要件に基づきCMEKの要否を判断する</td>
                                <td>
                                    鍵の所有権・利用場所の制御・クリプトシュレッディング・監査ログが不要であれば、デフォルト暗号化で十分と判断する
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-13" id="fnref77"><sup>13</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>鍵とデータのロケーションを一致させる</td>
                                <td>
                                    Cloud
                                    KMSリソースはプロジェクト内のロケーションに作成されるため、保護対象データと同一リージョンに鍵を配置し、レイテンシと主権要件を両立させる
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-13" id="fnref78"><sup>13</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>鍵管理モデル（集中/委任）を組織要件に合わせて選択する</td>
                                <td>
                                    中央セキュリティチームがある場合は集中管理モデル、開発速度を優先する場合は委任管理モデルを選択（<a href="#314-職務分掌separation-of-duties">3.1.4</a>参照）
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-19" id="fnref79"><sup>19</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>組織ポリシーでCMEKの使用を強制する</td>
                                <td>
                                    <code>constraints/gcp.restrictNonCmekServices</code>等を用いて、対応リソースがCMEKで暗号化されることを組織ポリシーで保証する
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-12" id="fnref80"><sup>12</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ローテーションポリシーを定義する</td>
                                <td>
                                    対称鍵は自動ローテーションに対応。ローテーション後も旧バージョンで暗号化されたデータの復号は可能なため、鍵バージョンのライフサイクル管理方針を明確にする
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-37" id="fnref81"><sup>37</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Autokeyを既定の選択肢として検討する</td>
                                <td>
                                    Autokeyが要件を満たす場合、手動プロビジョニングよりシンプルかつベストプラクティス準拠になるため優先的に採用する
                                </td>
                                <td>
                                    <a className="cite-ref" href="#ref-36" id="fnref82"><sup>36</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="317-セキュアなリモートアクセス" tabIndex={-1}>3.1.7 セキュアなリモートアクセス</h3>
                <p>
                    従来型の「VPNで社内ネットワークに接続すればすべて信頼する」というペリメータ型セキュリティモデルに代わり、Google
                    Cloudは**ゼロトラスト（Zero
                    Trust）**モデルを採用しています。ゼロトラストの原則は「ネットワークの場所によってアクセスを決定しない」「ユーザーとデバイスの文脈に基づいてアクセスを許可する」「すべてのアクセスを認証・認可・暗号化する」の3点に要約されます<a className="cite-ref" href="#ref-38" id="fnref83"><sup>38</sup></a>。
                </p>
                <Diagram id="diag-16" label="3.1.7 セキュアなリモートアクセス" />
                <h4 id="1-identity-aware-proxyiap" tabIndex={-1}>(1) Identity-Aware Proxy（IAP）</h4>
                <p>
                    <a href="#315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー">3.1.5</a>で解説したとおり、IAPはHTTPS経由のアプリケーションアクセスを中央集権的に制御する仕組みです。加えてIAPの<strong>TCPフォワーディング機能</strong>を使うことで、VMに外部IPを割り当てることなくSSH/RDPによる管理アクセスを実現できます<a className="cite-ref" href="#ref-28" id="fnref84"><sup>28</sup></a>。これによりパブリックIPの露出や踏み台サーバーの管理コストを削減できます。
                </p>
                <h4 id="2-サービスアカウントのなりすましservice-account-impersonation" tabIndex={-1}>
                    (2) サービスアカウントのなりすまし（Service Account Impersonation）
                </h4>
                <p>
                    サービスアカウントキー（JSON形式の長期認証情報）のエクスポート・利用は、漏えいリスクが高いため最終手段とすべきとされています<a className="cite-ref" href="#ref-5" id="fnref85"><sup>5</sup></a>。代わりに推奨されるのが<strong>サービスアカウントのなりすまし</strong>です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">認証情報の性質</th>
                                <th scope="col">リスク</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>サービスアカウントキーのエクスポート</td>
                                <td>長期間有効な秘密鍵。ローテーションされない限り無期限に有効</td>
                                <td>漏えい時の影響が大きく、監査も困難</td>
                            </tr>
                            <tr className="even">
                                <td>サービスアカウントのなりすまし（Impersonation）</td>
                                <td>
                                    権限を持つ既存プリンシパルが、IAM Credentials
                                    APIを介して短期間有効なトークンを発行
                                </td>
                                <td>
                                    発行元プリンシパルの操作としてCloud Audit
                                    Logsに記録され、追跡性が高い
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    IAM Credentials
                    APIを利用した一時的権限昇格は、鍵のエクスポートを伴わずに済むため、Cloud Audit
                    Logsの<code>serviceAccountDelegationInfo</code>フィールドで「誰が」「どのサービスアカウントに」なりすましたかを追跡できます<a className="cite-ref" href="#ref-5" id="fnref86"><sup>5</sup></a>。
                </p>
                <h4 id="3-workload-identity-federation" tabIndex={-1}>(3) Workload Identity Federation</h4>
                <p>
                    Workload Identity Federationは、AWS・Azure・オンプレミスのIdP・GitHub
                    Actionsなど<strong>外部のワークロードID</strong>を、サービスアカウントキーを発行することなくGoogle
                    CloudのIAMプリンシパルとして扱う仕組みです。
                </p>
                <Diagram id="diag-17" label="(3) Workload Identity Federation" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-7" id="fnref87"><sup>7</sup></a>
                </p>
                <p><strong>Workload Identity Federationのベストプラクティス</strong></p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>GitHubなどマルチテナントIdPとの連携では属性条件を使用する</td>
                                <td>
                                    ワークロードIDプールは外部IDの「ビュー」に過ぎず、設定によっては複数の外部IDが同一のIAMプリンシパルにマッピングされうる。属性条件でなりすまし攻撃のリスクを低減する<a className="cite-ref" href="#ref-7" id="fnref88"><sup>7</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ワークロードIDプールの管理を専用プロジェクトに集約する</td>
                                <td>
                                    プール・プロバイダの管理を一元化し、誤設定のリスクを下げる<a className="cite-ref" href="#ref-7" id="fnref89"><sup>7</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IAM APIのデータアクセスログを有効化する</td>
                                <td>
                                    なりすましシナリオを追跡するため、監査証跡を確保する<a className="cite-ref" href="#ref-7" id="fnref90"><sup>7</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>一意なサブジェクトマッピングを使用する</td>
                                <td>
                                    外部IDとGoogle
                                    Cloudプリンシパルの対応関係を明確にし、非否認性（non-repudiation）のある監査証跡を維持する<a className="cite-ref" href="#ref-7" id="fnref91"><sup>7</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="4-chrome-enterprise-premium" tabIndex={-1}>(4) Chrome Enterprise Premium</h4>
                <p>
                    Chrome Enterprise Premium（旧称BeyondCorp
                    Enterprise）は、BeyondCorpセキュリティモデルに基づき、デバイスの状態やユーザーの文脈に応じて、VPNなしでアプリケーションへの安全なアクセスを実現するソリューションです<a className="cite-ref" href="#ref-39" id="fnref92"><sup>39</sup></a>。
                </p>
                <Diagram id="diag-18" label="(4) Chrome Enterprise Premium" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-39" id="fnref93"><sup>39</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">構成する4つの機能</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Identity-Aware Proxy（IAP）</td>
                                <td>VPNなしで社内アプリケーションへのアクセスを実現するプロキシ</td>
                            </tr>
                            <tr className="even">
                                <td>IAM</td>
                                <td>ID管理・認可の基盤</td>
                            </tr>
                            <tr className="odd">
                                <td>Access Context Manager</td>
                                <td>デバイス・場所などのきめ細かい条件でアクセスレベルを定義</td>
                            </tr>
                            <tr className="even">
                                <td>Endpoint Verification</td>
                                <td>
                                    暗号化状況・OSバージョン・ユーザー情報などのデバイス属性をChrome拡張機能で収集
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Chrome Enterprise
                    Premiumを使うことで、例えば「管理対象デバイスかつ最新パッチ適用済みであれば、どのネットワークからでもアクセス許可」「管理者はコーポレートネットワークからのみコンソールにアクセス許可」といったポリシーを実現できます<a className="cite-ref" href="#ref-39" id="fnref94"><sup>39</sup></a>。
                </p>
                <hr />
                <h3 id="318-ソフトウェアサプライチェーンのセキュリティ確保" tabIndex={-1}>
                    3.1.8 ソフトウェアサプライチェーンのセキュリティ確保
                </h3>
                <p>
                    SolarWinds事件などを契機に、ソースコードからビルド、依存関係、デプロイに至るまでの一連の「ソフトウェアサプライチェーン」全体を保護する重要性が高まっています。Google
                    Cloudでは、SLSA（Supply-chain Levels for Software
                    Artifacts）フレームワークに沿った成熟度モデルと、それを支える一連のサービス群を提供しています<a className="cite-ref" href="#ref-40" id="fnref95"><sup>40</sup></a>。
                </p>
                <h4 id="slsaフレームワークの成熟度レベル" tabIndex={-1}>SLSAフレームワークの成熟度レベル</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">レベル</th>
                                <th scope="col">要件の概要</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SLSA 1</td>
                                <td>
                                    ビルドプロセスが自動化されており、ソース・ビルド手順に関するプロベナンス（来歴情報）メタデータが生成される
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SLSA 2</td>
                                <td>
                                    ホスト型のビルドサービスを使用し、プロベナンスに署名がされる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>SLSA 3</td>
                                <td>
                                    ビルド環境が改ざん耐性を持ち、分離・再現可能なビルドプロセスを備える
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SLSA 4（最高レベル）</td>
                                <td>
                                    2名以上のレビューを経たソースと、密閉されたビルドプロセスを要求する最も厳格なレベル
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-41" id="fnref96"><sup>41</sup></a>
                </p>
                <h4 id="ソフトウェアサプライチェーンを保護するパイプライン" tabIndex={-1}>
                    ソフトウェアサプライチェーンを保護するパイプライン
                </h4>
                <Diagram id="diag-19" label="ソフトウェアサプライチェーンを保護するパイプライン" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-42" id="fnref97"><sup>42</sup></a><a className="cite-ref" href="#ref-43" id="fnref98"><sup>43</sup></a>
                </p>
                <h4 id="主要コンポーネントの役割" tabIndex={-1}>主要コンポーネントの役割</h4>
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
                                <td>Artifact Registry</td>
                                <td>
                                    コンテナイメージやパッケージを一元的に保存・管理するリポジトリ。Cloud
                                    Buildなど CI/CDシステムと統合<a className="cite-ref" href="#ref-44" id="fnref99"><sup>44</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Artifact Analysis（Container Analysis）</td>
                                <td>
                                    保存されたイメージを自動・オンデマンドでスキャンし、脆弱性情報や信頼済みメタデータを蓄積<a className="cite-ref" href="#ref-45" id="fnref100"><sup>45</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Cloud Build</td>
                                <td>
                                    マネージドCI基盤。SLSAレベル3ビルドを標準でサポートし、VPC
                                    Service
                                    Controls・分離されたエフェメラルなビルド環境などのセキュリティ機能を備える<a className="cite-ref" href="#ref-45" id="fnref101"><sup>45</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Binary Authorization</td>
                                <td>
                                    アテステーション（証明書）に基づく信頼のチェーンを確立・検証・維持するデプロイ時ゲートキーパー。ポリシーに準拠したイメージのみのデプロイを許可する<a className="cite-ref" href="#ref-43" id="fnref102"><sup>43</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Assured Open Source Software（Assured OSS）</td>
                                <td>
                                    Googleがキュレーション・テスト済みのOSSパッケージを信頼できる供給源として提供し、依存関係のセキュリティを強化<a className="cite-ref" href="#ref-45" id="fnref103"><sup>45</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="binary-authorizationの2つの動作モード" tabIndex={-1}>
                    Binary Authorizationの2つの動作モード
                </h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">モード</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>モニターモード（Continuous Validation）</td>
                                <td>
                                    実行中のPodに紐づくコンテナイメージが定義済みポリシーに準拠しているかを定期的に監視し、非準拠の場合はCloud
                                    Loggingにログを記録する（Preview機能）<a className="cite-ref" href="#ref-43" id="fnref104"><sup>43</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>エンフォースモード</td>
                                <td>
                                    デプロイ時にポリシーを強制適用し、アテステーションがポリシーの基準を満たさないイメージのデプロイをブロックする<a className="cite-ref" href="#ref-43" id="fnref105"><sup>43</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="ソフトウェアサプライチェーンセキュリティのベストプラクティス" tabIndex={-1}>
                    ソフトウェアサプライチェーンセキュリティのベストプラクティス
                </h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ビルドプロセスを完全に自動化する</td>
                                <td>
                                    手動ビルドを排除し、Cloud
                                    Buildのようなホスト型CIで検証可能なプロベナンスを生成することがSLSA準拠の出発点となる<a className="cite-ref" href="#ref-40" id="fnref106"><sup>40</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>本番デプロイは中央管理されたリポジトリからのみ許可する</td>
                                <td>
                                    開発・検証環境では開発者に裁量を与えつつ、本番環境ではBinary
                                    Authorizationで承認済みイメージのみのデプロイを強制する<a className="cite-ref" href="#ref-44" id="fnref107"><sup>44</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>依存関係にもスキャンと信頼済みソースを適用する</td>
                                <td>
                                    Assured
                                    OSSを活用し、サプライチェーンの上流（OSS依存関係）まで含めてリスクを低減する<a className="cite-ref" href="#ref-45" id="fnref108"><sup>45</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ビルド環境自体もセキュアにする</td>
                                <td>
                                    Cloud Workstationsを用いて、VPC Service
                                    Controls・プライベートIngress/Egressで保護された開発環境を提供し、開発ライフサイクルの左側（shift-left）からセキュリティを組み込む<a className="cite-ref" href="#ref-42" id="fnref109"><sup>42</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="319-aiのセキュリティ確保" tabIndex={-1}>3.1.9 AIのセキュリティ確保</h3>
                <p>
                    生成AI・エージェント型AIの普及に伴い、プロンプトインジェクション、機密情報の漏えい、有害コンテンツ生成といった従来のアプリケーションセキュリティでは想定されていなかった新たなリスクへの対応が求められています。
                </p>
                <Diagram id="diag-20" label="3.1.9 AIのセキュリティ確保" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-46" id="fnref110"><sup>46</sup></a>
                </p>
                <h4 id="1-model-armor" tabIndex={-1}>(1) Model Armor</h4>
                <p>
                    Model
                    Armorは、LLMのプロンプトと応答の両方をリアルタイムでスクリーニングし、脅威をブロックするマネージドサービスです。特定のモデルやクラウドに依存せず、マルチクラウド・マルチモデル環境でも利用できます<a className="cite-ref" href="#ref-47" id="fnref111"><sup>47</sup></a>。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">5つの主要機能</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>プロンプトインジェクション・ジェイルブレイク検知</td>
                                <td>
                                    LLMに指示や安全フィルタを無視させようとする操作を検知・ブロック<a className="cite-ref" href="#ref-48" id="fnref112"><sup>48</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>機密データ保護</td>
                                <td>
                                    プロンプトと応答の双方でPII・財務情報・認証情報などの漏えいを検知・防止（Sensitive
                                    Data Protectionと連携）<a className="cite-ref" href="#ref-48" id="fnref113"><sup>48</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>悪意あるURL検知</td>
                                <td>
                                    プロンプト・応答内のフィッシング・悪意あるリンクをスキャン<a className="cite-ref" href="#ref-48" id="fnref114"><sup>48</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>コンテンツ安全フィルタ</td>
                                <td>
                                    ヘイトスピーチ、ハラスメント、性的表現、危険なトピックなどをきめ細かく制御<a className="cite-ref" href="#ref-49" id="fnref115"><sup>49</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Responsible AI信頼度しきい値</td>
                                <td>
                                    アプリケーションの文脈やリスク許容度に応じて、検知の確信度しきい値を調整可能<a className="cite-ref" href="#ref-49" id="fnref116"><sup>49</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    **フロア設定（Floor Settings）**によって、Model
                    Armorテンプレートが満たすべき組織全体の最低限のセキュリティ・安全基準を、組織またはフォルダレベルで一元的に強制できます<a className="cite-ref" href="#ref-48" id="fnref117"><sup>48</sup></a>。
                </p>
                <h4 id="2-sensitive-data-protection旧cloud-dlp" tabIndex={-1}>
                    (2) Sensitive Data Protection（旧Cloud DLP）
                </h4>
                <p>
                    Sensitive Data
                    Protectionは、構造化・非構造化データの両方から機密情報を発見・分類・秘匿化するプラットフォームです。Model
                    Armorの機密データ保護機能の内部でも利用されています<a className="cite-ref" href="#ref-46" id="fnref118"><sup>46</sup></a>。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>検査（Inspect）</td>
                                <td>
                                    200種類以上の組み込みInfoType検出器（クレジットカード番号、SSN等）に加え、辞書・正規表現・文脈要素によるカスタムInfoTypeを定義可能<a className="cite-ref" href="#ref-50" id="fnref119"><sup>50</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>秘匿化（De-identify）</td>
                                <td>
                                    マスキング、リダクション（削除）、バケット化、日付シフト、トークン化（形式保持暗号化）などの手法で機密要素を変換<a className="cite-ref" href="#ref-51" id="fnref120"><sup>51</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>再識別（Re-identify）</td>
                                <td>
                                    可逆的な変換方式を用いた場合、認可されたプロセスでのみ元の値へ復元可能<a className="cite-ref" href="#ref-52" id="fnref121"><sup>52</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>リスク分析</td>
                                <td>
                                    BigQueryの構造化データを分析し、再識別リスクを可視化<a className="cite-ref" href="#ref-53" id="fnref122"><sup>53</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Diagram id="diag-21" label="(2) Sensitive Data Protection（旧Cloud DLP）" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-53" id="fnref123"><sup>53</sup></a><a className="cite-ref" href="#ref-51" id="fnref124"><sup>51</sup></a>
                </p>
                <h4 id="3-セキュアなモデルデプロイ" tabIndex={-1}>(3) セキュアなモデルデプロイ</h4>
                <p>AIモデルそのものを保護するための考慮事項も、Section 3の範囲に含まれます。</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">実践方法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>デプロイパイプラインの保護</td>
                                <td>
                                    モデルアーティファクトもコンテナイメージと同様にArtifact
                                    Registryで管理し、Binary
                                    Authorizationでポリシー準拠を検証する（<a href="#318-ソフトウェアサプライチェーンのセキュリティ確保">3.1.8</a>参照）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>モデルエンドポイントへのアクセス制御</td>
                                <td>
                                    IAM・VPC Service
                                    Controls・IAPを用いて、モデル推論エンドポイントへのアクセスを最小権限かつコンテキストアウェアに制御する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>トレーニングデータの保護</td>
                                <td>
                                    Sensitive Data
                                    Protectionで学習データセットから機密情報を事前に秘匿化し、モデルが機密情報を記憶・再現するリスクを低減する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>実行時の入出力スクリーニング</td>
                                <td>
                                    Model Armorをアプリケーション層またはAPI
                                    Gateway（Apigee等）に組み込み、本番運用中も継続的にプロンプト・応答を保護する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="32-コンプライアンスの設計" tabIndex={-1}>3.2 コンプライアンスの設計</h2>
                <p>
                    クラウドアーキテクトは、技術的なセキュリティ制御だけでなく、業界規制・法令に準拠したアーキテクチャを設計する責任も担います。ここで鍵となる考え方が**共有責任モデル（Shared
                    Responsibility Model）**です。
                </p>
                <Diagram id="diag-22" label="3.2 コンプライアンスの設計" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-54" id="fnref125"><sup>54</sup></a>
                </p>
                <p>
                    Googleは自社サービスのコンプライアンス認証取得やセキュリティ機能の提供を担いますが、それらの機能を<strong>どう構成し、どう運用するか</strong>は顧客の責任です。これは「共有ファイト（Shared
                    Fate）」という考え方にも発展しており、Googleは単なる責任分界点の提示にとどまらず、ベストプラクティス・ブループリント・自動化ツールを通じて顧客のセキュリティ達成を積極的に支援します<a className="cite-ref" href="#ref-54" id="fnref126"><sup>54</sup></a>。
                </p>
                <h3 id="321-法令規制" tabIndex={-1}>3.2.1 法令・規制</h3>
                <p>
                    試験ガイドが例示する法令・規制領域は「健康記録のプライバシー」「児童のプライバシー」「データプライバシー」「データ所有権」「データ主権」です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">規制領域</th>
                                <th scope="col">代表的な法令・要件</th>
                                <th scope="col">Google Cloudの対応</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>健康記録のプライバシー</td>
                                <td>
                                    米国 HIPAA（Health Insurance Portability and Accountability
                                    Act）
                                </td>
                                <td>
                                    Business Associate
                                    Agreement（BAA）の締結により、対象サービスでのPHI（保護対象保健情報）取り扱いをサポート。ただしHIPAA準拠の認定制度自体は存在せず、責任共有モデルの下で顧客が最終的な準拠責任を負う<a className="cite-ref" href="#ref-55" id="fnref127"><sup>55</sup></a><a className="cite-ref" href="#ref-56" id="fnref128"><sup>56</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>児童のプライバシー</td>
                                <td>米国 COPPA（Children's Online Privacy Protection Act）等</td>
                                <td>
                                    児童データを扱うサービス設計では、同意取得・データ収集最小化などの要件をアプリケーション層で実装する必要がある（Googleのプラットフォーム機能はこれを支援するが、準拠の主体は顧客）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>データプライバシー</td>
                                <td>EU GDPR（General Data Protection Regulation）等</td>
                                <td>
                                    Cloud Data Processing Addendum（DPA）、Sensitive Data
                                    Protectionによるデータ最小化・秘匿化、Assured
                                    Workloadsによる地域データ境界の実現
                                </td>
                            </tr>
                            <tr className="even">
                                <td>データ所有権</td>
                                <td>契約上のデータ所有権の明確化</td>
                                <td>
                                    Google
                                    Cloudの利用規約において、顧客データの所有権は顧客に帰属することが明記されている
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>データ主権</td>
                                <td>特定国・地域内でのデータ保存・処理・運用の主権確保</td>
                                <td>
                                    Assured
                                    Workloads（後述）による、リージョン制限・人員アクセス制限・鍵管理の主権対応
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="データ主権とassured-workloads" tabIndex={-1}>データ主権とAssured Workloads</h4>
                <p>
                    Assured
                    Workloadsは、規制の厳しいワークロード向けに、データ常駐地（residency）・人員アクセス・暗号鍵管理の境界を、事前定義された「コントロールパッケージ」としてフォルダ単位で適用する仕組みです<a className="cite-ref" href="#ref-57" id="fnref129"><sup>57</sup></a>。
                </p>
                <Diagram id="diag-23" label="データ主権とAssured Workloads" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-58" id="fnref130"><sup>58</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">コントロールパッケージの種類</th>
                                <th scope="col">提供する制御</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>地域データ境界</td>
                                <td>
                                    データ常駐地要件を満たすため、リソースの保存地理的範囲を制限。一部のパッケージではGoogleのデータアクセス自体への独立した承認制御も提供<a className="cite-ref" href="#ref-58" id="fnref131"><sup>58</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>規制データ境界</td>
                                <td>
                                    特定の規制・コンプライアンス法令の要件を満たすよう調整された、認証済みの制御セット<a className="cite-ref" href="#ref-58" id="fnref132"><sup>58</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>パートナーによる主権制御</td>
                                <td>
                                    データ常駐地・人員制御・地域サポートに加え、Cloud External Key
                                    Manager（Cloud EKM）・Cloud HSM・Key Access
                                    Justificationsといった強化されたデータ主権制御を提供<a className="cite-ref" href="#ref-58" id="fnref133"><sup>58</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="322-商用データの取り扱い" tabIndex={-1}>3.2.2 商用データの取り扱い</h3>
                <p>
                    試験ガイドでは「クレジットカード情報の取り扱い」や「PII（個人を特定できる情報）」が商用データの例として挙げられています。
                </p>
                <h4 id="pci-dssクレジットカード情報" tabIndex={-1}>PCI DSS（クレジットカード情報）</h4>
                <p>
                    PCI DSS（Payment Card Industry Data Security
                    Standard）は、カード会員データを扱うすべての事業者に適用される業界標準です。クラウド環境における責任は、Googleと顧客の間で明確に分担されます<a className="cite-ref" href="#ref-59" id="fnref134"><sup>59</sup></a>。
                </p>
                <Diagram id="diag-24" label="PCI DSS（クレジットカード情報）" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-59" id="fnref135"><sup>59</sup></a><a className="cite-ref" href="#ref-60" id="fnref136"><sup>60</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">実装レイヤー</th>
                                <th scope="col">PCI DSS対応における主な検討事項</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>リソース階層とIAM</td>
                                <td>
                                    カード会員データ環境（CDE）を独立したプロジェクト/フォルダに分離し、アクセスを最小権限で制御<a className="cite-ref" href="#ref-61" id="fnref137"><sup>61</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ネットワーク</td>
                                <td>
                                    VPC・階層ファイアウォールポリシー・Cloud
                                    Armorで、CDEとその他のネットワークセグメントを分離<a className="cite-ref" href="#ref-61" id="fnref138"><sup>61</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>データ保護</td>
                                <td>
                                    Sensitive Data Protection（旧Cloud
                                    DLP）でカード会員データを検出・秘匿化し、意図しない保存・伝播を防止<a className="cite-ref" href="#ref-61" id="fnref139"><sup>61</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>アクセス制御・可観測性</td>
                                <td>
                                    IAP・Security Command Centerで、CDEへのアクセスを可視化・制御<a className="cite-ref" href="#ref-61" id="fnref140"><sup>61</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="pii個人を特定できる情報の取り扱い" tabIndex={-1}>
                    PII（個人を特定できる情報）の取り扱い
                </h4>
                <p>
                    PIIの取り扱いにおいては、Sensitive Data Protectionによる「検出 → 分類 →
                    秘匿化」のワークフローが中核となります（詳細は<a href="#319-aiのセキュリティ確保">3.1.9</a>）。加えて、次のような設計上の考慮が求められます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">考慮事項</th>
                                <th scope="col">実践方法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>データ収集の最小化</td>
                                <td>
                                    業務上必要なPIIのみを収集・保存する設計をアプリケーション層で徹底する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>匿名化・仮名化の使い分け</td>
                                <td>
                                    分析用途にはトークン化（仮名化、可逆）またはバケット化（匿名化、不可逆）を用途に応じて選択する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>アクセスの追跡可能性</td>
                                <td>
                                    Data
                                    Accessログを有効化し、誰がPIIにアクセスしたかを監査可能にする
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h3 id="323-業界認証" tabIndex={-1}>3.2.3 業界認証</h3>
                <p>
                    Google
                    Cloudは、第三者機関による監査を通じて幅広い業界標準への準拠を継続的に証明しています。試験ガイドはSOC
                    2を例示していますが、実務ではISO/IEC認証群との組み合わせで理解しておくことが重要です。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">認証・レポート</th>
                                <th scope="col">概要</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SOC 2（Service Organization Controls 2）</td>
                                <td>
                                    AICPA（米国公認会計士協会）のTrust Services
                                    Criteria（セキュリティ、可用性、処理の整合性、機密性、プライバシー）に基づき、第三者監査人が統制の有効性を評価したレポート<a className="cite-ref" href="#ref-62" id="fnref141"><sup>62</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SOC 1 / SOC 3</td>
                                <td>
                                    SOC 1は財務報告に関連する統制、SOC 3はSOC
                                    2の一般公開向けサマリー版<a className="cite-ref" href="#ref-63" id="fnref142"><sup>63</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ISO/IEC 27001</td>
                                <td>情報セキュリティマネジメントシステム（ISMS）の国際規格</td>
                            </tr>
                            <tr className="even">
                                <td>ISO/IEC 27017</td>
                                <td>クラウドサービスに特化した情報セキュリティ管理策</td>
                            </tr>
                            <tr className="odd">
                                <td>ISO/IEC 27018</td>
                                <td>クラウド上の個人情報（PII）保護に特化した管理策</td>
                            </tr>
                            <tr className="even">
                                <td>ISO/IEC 27701</td>
                                <td>プライバシー情報マネジメントシステム（PIMS）の拡張規格</td>
                            </tr>
                            <tr className="odd">
                                <td>PCI DSS</td>
                                <td><a href="#322-商用データの取り扱い">3.2.2</a>を参照</td>
                            </tr>
                            <tr className="even">
                                <td>FedRAMP</td>
                                <td>米国政府機関向けクラウドサービスのセキュリティ認証制度</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-64" id="fnref143"><sup>64</sup></a><a className="cite-ref" href="#ref-65" id="fnref144"><sup>65</sup></a>
                </p>
                <Diagram id="diag-25" label="3.2.3 業界認証" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-66" id="fnref145"><sup>66</sup></a>
                </p>
                <p>
                    コンプライアンス担当者・アーキテクトは、<strong>Compliance resource center</strong>および<strong>Compliance Reports Manager</strong>を通じて、最新のISO証明書・SOCレポート・自己評価資料を追加費用なしで取得できます<a className="cite-ref" href="#ref-65" id="fnref146"><sup>65</sup></a><a className="cite-ref" href="#ref-66" id="fnref147"><sup>66</sup></a>。
                </p>
                <hr />
                <h3 id="324-監査ログを含む" tabIndex={-1}>3.2.4 監査（ログを含む）</h3>
                <p>
                    コンプライアンスにおける「監査」は、顧客自身の操作記録に加え、<strong>Google人員による顧客データへのアクセス記録</strong>まで含めて考える必要があります。
                </p>
                <Diagram id="diag-26" label="3.2.4 監査（ログを含む）" />
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-67" id="fnref148"><sup>67</sup></a><a className="cite-ref" href="#ref-68" id="fnref149"><sup>68</sup></a>
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">目的</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Cloud Audit Logs</td>
                                <td>
                                    顧客組織内のメンバー（人・サービスアカウント）による操作を記録
                                </td>
                                <td>
                                    詳細は<a href="#315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー">3.1.5</a>を参照
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Access Transparency</td>
                                <td>
                                    Google従業員が顧客データにアクセスした際の操作（対象リソース・アクション・理由・アクセス者の所在地や職種等）を記録
                                </td>
                                <td>
                                    サポート対応・障害対応など正当な業務理由でのアクセスであることを検証する目的で利用<a className="cite-ref" href="#ref-67" id="fnref150"><sup>67</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Access Approval</td>
                                <td>
                                    Google従業員による顧客データへのアクセス要求について、顧客が事前に承認・拒否を行う仕組み
                                </td>
                                <td>
                                    「顧客対応起因（CUSTOMER_INITIATED_SUPPORT）」など特定の正当化理由を持つリクエストのみを許可するといった運用が可能<a className="cite-ref" href="#ref-69" id="fnref151"><sup>69</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Key Access Justifications</td>
                                <td>
                                    CMEKで保護されたデータへのアクセス要求ごとに、その正当化理由を可視化・制御
                                </td>
                                <td>
                                    主権要件が特に厳しいAssured
                                    Workloadsのコントロールパッケージと組み合わせて利用<a className="cite-ref" href="#ref-68" id="fnref152"><sup>68</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="監査対応のベストプラクティス" tabIndex={-1}>監査対応のベストプラクティス</h4>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ベストプラクティス</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Cloud Audit LogsとAccess Transparencyを併用する</td>
                                <td>
                                    顧客側の操作とGoogle側のアクセスの両方を記録することで、完全な監査証跡を確保する<a className="cite-ref" href="#ref-67" id="fnref153"><sup>67</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SIEMへログを統合する</td>
                                <td>
                                    Access TransparencyログをSIEMに取り込み、Security Command
                                    Centerの検出結果と突き合わせて分析する<a className="cite-ref" href="#ref-67" id="fnref154"><sup>67</sup></a>
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Access Approvalで緊急アクセスの取り扱いを明確化する</td>
                                <td>
                                    緊急時のアクセスも「自動承認済み」ステータスとして記録され、監査の連続性が保たれる設計になっている<a className="cite-ref" href="#ref-69" id="fnref155"><sup>69</sup></a>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Assured Workloadsと組み合わせて主権要件に対応する</td>
                                <td>
                                    より高いデータ管理要件がある場合は、Access Transparency/Access
                                    Approval単体ではなくAssured Workloadsの利用を検討する<a className="cite-ref" href="#ref-69" id="fnref156"><sup>69</sup></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="well-architected-frameworkセキュリティピラーとの関係" tabIndex={-1}>
                    Well-Architected Frameworkセキュリティピラーとの関係
                </h2>
                <p>
                    公式Exam Guideの序文にあるとおり、Well-Architected
                    Frameworkの6本柱（運用の卓越性・セキュリティ・信頼性・パフォーマンス最適化・コスト最適化・持続可能性）は試験全体に暗黙的・明示的に織り込まれています<a className="cite-ref" href="#ref-1" id="fnref157"><sup>1</sup></a>。特に「セキュリティ、プライバシー、コンプライアンス」ピラーはSection
                    3と直接対応しており、その中核原則は本ガイドで扱った各機能と次のように対応します<a className="cite-ref" href="#ref-70" id="fnref158"><sup>70</sup></a>。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">WAFセキュリティピラーの原則</th>
                                <th scope="col">本ガイドでの対応セクション</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    セキュリティ・バイ・デザインを実装する（設計段階からセキュリティを組み込む）
                                </td>
                                <td>
                                    <a href="#311-identity-and-access-managementiam">3.1.1</a>
                                    IAM、<a href="#312-リソース階層組織フォルダプロジェクト">3.1.2</a>
                                    リソース階層
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ゼロトラストを実装する（「決して信頼せず、常に検証する」）</td>
                                <td>
                                    <a href="#317-セキュアなリモートアクセス">3.1.7</a>
                                    セキュアなリモートアクセス
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    シフトレフト・セキュリティを実装する（開発ライフサイクル早期からの統制）
                                </td>
                                <td>
                                    <a href="#318-ソフトウェアサプライチェーンのセキュリティ確保">3.1.8</a>
                                    ソフトウェアサプライチェーン
                                </td>
                            </tr>
                            <tr className="even">
                                <td>多層防御を実装する</td>
                                <td>
                                    <a href="#315-セキュリティ制御監査vpc-service-controlsコンテキストアウェアアクセス組織ポリシー階層ファイアウォールポリシー">3.1.5</a>
                                    セキュリティ制御群
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>データを保護する（暗号化・分類・秘匿化）</td>
                                <td>
                                    <a href="#313-データセキュリティ鍵管理暗号化シークレット管理">3.1.3</a>・<a href="#316-cloud-kmsによる顧客管理暗号鍵cmekの管理">3.1.6</a>
                                    データセキュリティ・CMEK
                                </td>
                            </tr>
                            <tr className="even">
                                <td>コンプライアンス・プライバシー要件と整合させる</td>
                                <td>
                                    <a href="#32-コンプライアンスの設計">3.2</a>
                                    コンプライアンスの設計全般
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source-line">
                    出典: <a className="cite-ref" href="#ref-71" id="fnref159"><sup>71</sup></a><a className="cite-ref" href="#ref-70" id="fnref160"><sup>70</sup></a>
                </p>
                <hr />
                <h2 id="学習チェックリスト" tabIndex={-1}>学習チェックリスト</h2>
                <p>
                    以下は本セクションの理解度を自己確認するためのチェックリストです。すべて自信を持って説明できる状態を目指してください。
                </p>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="checklist-title">学習チェックリスト進捗</span><span className="checklist-counter">{checkedCount} / {CHECKLIST_ITEMS.length} 完了</span>
                    </div>
                    <ul className="task-list checklist-list">
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[0])} onChange={() => toggleCheck(0)} aria-label="チェック項目 1" /><label>IAMのプリンシパル・ロール・許可ポリシー・拒否ポリシー・条件の違いを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[1])} onChange={() => toggleCheck(1)} aria-label="チェック項目 2" /><label>基本ロール・事前定義ロール・カスタムロールの使い分けと、基本ロールが推奨されない理由を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[2])} onChange={() => toggleCheck(2)} aria-label="チェック項目 3" /><label>リソース階層（組織・フォルダ・プロジェクト）の継承の仕組みと、フォルダ設計のベストプラクティスを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[3])} onChange={() => toggleCheck(3)} aria-label="チェック項目 4" /><label>CMEK・CSEK・Cloud
                                EKM・デフォルト暗号化の違いと、それぞれを選択する基準を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[4])} onChange={() => toggleCheck(4)} aria-label="チェック項目 5" /><label>封筒暗号化（KEKとDEK）の仕組みを図で説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[5])} onChange={() => toggleCheck(5)} aria-label="チェック項目 6" /><label>Secret ManagerとCloud KMSの役割の違いを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[6])} onChange={() => toggleCheck(6)} aria-label="チェック項目 7" /><label>職務分掌の考え方と、Cloud
                                KMSの集中管理モデル/委任管理モデルの違いを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[7])} onChange={() => toggleCheck(7)} aria-label="チェック項目 8" /><label>Cloud Audit Logsの4種類（Admin Activity、Data Access、System
                                Event、Policy
                                Denied）の違いとデフォルトの有効化状況を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[8])} onChange={() => toggleCheck(8)} aria-label="チェック項目 9" /><label>VPC Service
                                ControlsがIAMと独立した防御レイヤーとして機能する理由を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[9])} onChange={() => toggleCheck(9)} aria-label="チェック項目 10" /><label>コンテキストアウェアアクセス（IAP + Access Context
                                Manager）の仕組みを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[10])} onChange={() => toggleCheck(10)} aria-label="チェック項目 11" /><label>組織ポリシーサービスと階層ファイアウォールポリシーの違いと、それぞれの継承ルールを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[11])} onChange={() => toggleCheck(11)} aria-label="チェック項目 12" /><label>Cloud KMS
                                Autokeyが手動プロビジョニングと比べて何を自動化するかを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[12])} onChange={() => toggleCheck(12)} aria-label="チェック項目 13" /><label>サービスアカウントキーのエクスポートよりも、なりすまし（Impersonation）とWorkload
                                Identity Federationが推奨される理由を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[13])} onChange={() => toggleCheck(13)} aria-label="チェック項目 14" /><label>Chrome Enterprise Premiumを構成する4つの機能を挙げられる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[14])} onChange={() => toggleCheck(14)} aria-label="チェック項目 15" /><label>SLSAフレームワークの目的と、Binary
                                Authorizationがどのようにデプロイ時のゲートキーパーとして機能するかを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[15])} onChange={() => toggleCheck(15)} aria-label="チェック項目 16" /><label>Model ArmorとSensitive Data Protectionの役割分担を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[16])} onChange={() => toggleCheck(16)} aria-label="チェック項目 17" /><label>共有責任モデルにおける、Google・共有・顧客それぞれの責任範囲の考え方を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[17])} onChange={() => toggleCheck(17)} aria-label="チェック項目 18" /><label>Assured
                                Workloadsの3種類のコントロールパッケージ（地域データ境界・規制データ境界・パートナーによる主権制御）を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[18])} onChange={() => toggleCheck(18)} aria-label="チェック項目 19" /><label>HIPAA・PCI
                                DSSにおける「認証制度が存在しない」「責任共有モデルが適用される」という考え方を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" className="checklist-checkbox" checked={Boolean(checkedItems[19])} onChange={() => toggleCheck(19)} aria-label="チェック項目 20" /><label>Cloud Audit LogsとAccess Transparency / Access
                                Approvalの違いを説明できる</label>
                        </li>
                    </ul>
                </div>
                <hr />
                <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                <h3 className="ref-cat-title" tabIndex={-1}>公式試験情報</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-1">
                        <span className="ref-badge">1</span>
                        <div className="ref-body">
                            <a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf" rel="noopener" target="_blank">Professional Cloud Architect Certification exam guide (PDF)</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>IAM</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-2">
                        <span className="ref-badge">2</span>
                        <div className="ref-body">
                            <a href="https://www.d3vtech.com/insights/gcp-iam-best-practices-a-guide-to-iam-on-google-cloud/" rel="noopener" target="_blank">GCP IAM Best Practices: A Guide To IAM On Google Cloud</a>
                            <span className="ref-source">d3v Technology Solutions</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-4">
                        <span className="ref-badge">4</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control" rel="noopener" target="_blank">Using resource hierarchy for access control</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-5">
                        <span className="ref-badge">5</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/iam/docs/best-practices-service-accounts" rel="noopener" target="_blank">Best practices for using service accounts securely</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-6">
                        <span className="ref-badge">6</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/products/identity-security/scaling-the-iam-mountain-an-in-depth-guide-to-identity-in-google-cloud" rel="noopener" target="_blank">Scaling the IAM mountain: An in-depth guide to identity in Google
                                Cloud</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-7">
                        <span className="ref-badge">7</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation" rel="noopener" target="_blank">Best practices for using Workload Identity Federation</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-8">
                        <span className="ref-badge">8</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/iam/docs/pam-best-practices" rel="noopener" target="_blank">Best practices for Privileged Access Manager</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>リソース階層</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-9">
                        <span className="ref-badge">9</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" rel="noopener" target="_blank">About resource hierarchy</a>
                            <span className="ref-source">Resource Manager, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-10">
                        <span className="ref-badge">10</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/resource-manager/docs/creating-managing-folders" rel="noopener" target="_blank">Create folders</a>
                            <span className="ref-source">Resource Manager, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-11">
                        <span className="ref-badge">11</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/docs/get-started/organize-resources" rel="noopener" target="_blank">Organize resources</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>データセキュリティ・Cloud KMS・Secret Manager</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-12">
                        <span className="ref-badge">12</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/kms/docs/key-management-service" rel="noopener" target="_blank">Cloud Key Management Service overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-13">
                        <span className="ref-badge">13</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/kms/docs/cmek-best-practices" rel="noopener" target="_blank">Best practices for using CMEKs</a>
                            <span className="ref-source">Cloud Key Management Service, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-14">
                        <span className="ref-badge">14</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/secret-manager/docs/overview" rel="noopener" target="_blank">Secret Manager overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-15">
                        <span className="ref-badge">15</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/secret-manager/docs/best-practices" rel="noopener" target="_blank">Secret Manager best practices</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-16">
                        <span className="ref-badge">16</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/secret-manager/regional-secrets/best-practices-rs" rel="noopener" target="_blank">Secret Manager best practices (regional secrets)</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-17">
                        <span className="ref-badge">17</span>
                        <div className="ref-body">
                            <a href="https://computingforgeeks.com/google-cloud-secret-manager-tutorial/" rel="noopener" target="_blank">Google Cloud Secret Manager: Complete Tutorial</a>
                            <span className="ref-source">ComputingForGeeks</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-19">
                        <span className="ref-badge">19</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/kms/docs/separation-of-duties" rel="noopener" target="_blank">Separation of duties</a>
                            <span className="ref-source">Cloud Key Management Service, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-21">
                        <span className="ref-badge">21</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/docs/security/key-management-deep-dive" rel="noopener" target="_blank">Cloud Key Management Service encryption</a>
                            <span className="ref-source">Security, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-36">
                        <span className="ref-badge">36</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/kms/docs/cmek" rel="noopener" target="_blank">Customer-managed encryption keys (CMEK)</a>
                            <span className="ref-source">Cloud Key Management Service, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-37">
                        <span className="ref-badge">37</span>
                        <div className="ref-body">
                            <a href="https://oneuptime.com/blog/post/2026-02-17-how-to-implement-customer-managed-encryption-keys-across-all-google-cloud-services/view" rel="noopener" target="_blank">How to Use Customer-Managed Encryption Keys Across All Google Cloud
                                Services</a>
                            <span className="ref-source">OneUptime Blog</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>
                    セキュリティ制御（監査・VPC Service
                    Controls・コンテキストアウェアアクセス・組織ポリシー・ファイアウォールポリシー）
                </h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-3">
                        <span className="ref-badge">3</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/products/identity-security/just-say-no-build-defense-in-depth-with-iam-deny-and-org-policies" rel="noopener" target="_blank">Just say no: Build defense in depth with IAM Deny and Org
                                Policies</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-22">
                        <span className="ref-badge">22</span>
                        <div className="ref-body">
                            <a href="https://cloudwebschool.com/docs/gcp/security/cloud-audit-logs/" rel="noopener" target="_blank">GCP Cloud Audit Logs Explained: Types, Retention, and Use Cases</a>
                            <span className="ref-source">CloudWebSchool</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-23">
                        <span className="ref-badge">23</span>
                        <div className="ref-body">
                            <a href="https://docs.datadoghq.com/integrations/google-cloud-audit-logs/" rel="noopener" target="_blank">Google Cloud Audit Logs</a>
                            <span className="ref-source">Datadog Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-24">
                        <span className="ref-badge">24</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/logging/docs/audit" rel="noopener" target="_blank">Cloud Audit Logs overview</a>
                            <span className="ref-source">Cloud Logging, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-25">
                        <span className="ref-badge">25</span>
                        <div className="ref-body">
                            <a href="https://cloudwebschool.com/docs/gcp/security/log-types-in-gcp/" rel="noopener" target="_blank">GCP Log Types Explained: Audit Logs, VPC Flow Logs, Firewall Logs,
                                and Application Logs</a>
                            <span className="ref-source">CloudWebSchool</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-26">
                        <span className="ref-badge">26</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/vpc-service-controls/docs/overview" rel="noopener" target="_blank">Overview of VPC Service Controls</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-27">
                        <span className="ref-badge">27</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/vpc-service-controls/docs/service-perimeters" rel="noopener" target="_blank">Service perimeter details and configuration</a>
                            <span className="ref-source">VPC Service Controls, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-28">
                        <span className="ref-badge">28</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/products/identity-security/protecting-your-cloud-vms-with-cloud-iap-context-aware-access-controls" rel="noopener" target="_blank">Protecting your cloud VMs with Cloud IAP context-aware access
                                controls</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-29">
                        <span className="ref-badge">29</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/iap/docs/concepts-overview" rel="noopener" target="_blank">Identity-Aware Proxy overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-30">
                        <span className="ref-badge">30</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/iap/docs/cloud-iap-context-aware-access-howto" rel="noopener" target="_blank">Setting up context-aware access with Identity-Aware Proxy</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-31">
                        <span className="ref-badge">31</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/organization-policy/overview" rel="noopener" target="_blank">Organization Policy overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-32">
                        <span className="ref-badge">32</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/organization-policy/reference/org-policy-constraints" rel="noopener" target="_blank">Organization policy constraints</a>
                            <span className="ref-source">Organization Policy, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-33">
                        <span className="ref-badge">33</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/firewall/docs/firewall-policies" rel="noopener" target="_blank">Hierarchical firewall policies</a>
                            <span className="ref-source">Cloud Next Generation Firewall, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-34">
                        <span className="ref-badge">34</span>
                        <div className="ref-body">
                            <a href="https://oneuptime.com/blog/post/2026-02-17-how-to-create-hierarchical-firewall-policies-at-the-organization-level-on-google-cloud/view" rel="noopener" target="_blank">How to Create Hierarchical Firewall Policies at the Organization
                                Level</a>
                            <span className="ref-source">OneUptime Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-35">
                        <span className="ref-badge">35</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/firewall/docs/using-firewall-policies" rel="noopener" target="_blank">Create hierarchical firewall policies and rules</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>職務分掌</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-18">
                        <span className="ref-badge">18</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/products/identity-security/achieving-identity-and-access-governance-on-google-cloud/" rel="noopener" target="_blank">Identity and security: Identity and access governance</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-20">
                        <span className="ref-badge">20</span>
                        <div className="ref-body">
                            <a href="https://www.trendmicro.com/cloudoneconformity/knowledge-base/gcp/CloudIAM/enforce-separation-of-duties-for-service-account-roles.html" rel="noopener" target="_blank">Enforce Separation of Duties for Service-Account Related Roles</a>
                            <span className="ref-source">Trend Micro Cloud One Conformity</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>セキュアなリモートアクセス</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-38">
                        <span className="ref-badge">38</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/beyondcorp?hl=en" rel="noopener" target="_blank">BeyondCorp Zero Trust Enterprise Security</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-39">
                        <span className="ref-badge">39</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/chrome-enterprise-premium/docs/access-protection" rel="noopener" target="_blank">Chrome Enterprise Premium access protection overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>ソフトウェアサプライチェーンのセキュリティ</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-40">
                        <span className="ref-badge">40</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/products/application-development/google-introduces-slsa-framework" rel="noopener" target="_blank">Google introduces SLSA framework</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-41">
                        <span className="ref-badge">41</span>
                        <div className="ref-body">
                            <a href="https://medium.com/meghgen/unlocking-slsa-level-3-a-practical-guide-for-google-cloud-platform-3f4bf40b2258" rel="noopener" target="_blank">Unlocking SLSA Level 3 — A Practical Guide for Google Cloud
                                Platform</a>
                            <span className="ref-source">MeghGen, Medium</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-42">
                        <span className="ref-badge">42</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/software-supply-chain-security/docs/overview" rel="noopener" target="_blank">Software supply chain security</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-43">
                        <span className="ref-badge">43</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/binary-authorization/docs/overview" rel="noopener" target="_blank">Binary Authorization overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-44">
                        <span className="ref-badge">44</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/topics/developers-practitioners/securing-cloud-run-deployments-binary-authorization/" rel="noopener" target="_blank">Securing Cloud Run Deployments with Binary Authorization</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-45">
                        <span className="ref-badge">45</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/solutions/software-supply-chain-security" rel="noopener" target="_blank">Software supply chain security</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>AIのセキュリティ</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-46">
                        <span className="ref-badge">46</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/security-command-center/docs/model-armor-overview" rel="noopener" target="_blank">Model Armor overview</a>
                            <span className="ref-source">Security Command Center, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-47">
                        <span className="ref-badge">47</span>
                        <div className="ref-body">
                            <a href="https://azeezz.medium.com/shielding-your-ai-models-a-dive-into-google-cloud-model-armor-for-securing-llms-3f92ba2a66cd" rel="noopener" target="_blank">Shielding Your AI Models: A Dive into Google Cloud Model Armor for
                                Securing LLMs</a>
                            <span className="ref-source">Medium</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-48">
                        <span className="ref-badge">48</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/blog/products/identity-security/how-model-armor-can-help-protect-your-ai-apps" rel="noopener" target="_blank">How Model Armor can help protect your AI apps</a>
                            <span className="ref-source">Google Cloud Blog</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-49">
                        <span className="ref-badge">49</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/products/model-armor" rel="noopener" target="_blank">Model Armor</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-50">
                        <span className="ref-badge">50</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/sensitive-data-protection/docs" rel="noopener" target="_blank">Sensitive Data Protection documentation</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-51">
                        <span className="ref-badge">51</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data" rel="noopener" target="_blank">De-identifying sensitive data</a>
                            <span className="ref-source">Sensitive Data Protection, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-52">
                        <span className="ref-badge">52</span>
                        <div className="ref-body">
                            <a href="https://medium.com/devsecops-ai/google-cloud-dlp-a-practitioners-guide-to-securing-sensitive-data-bcb5e74e6d4f" rel="noopener" target="_blank">Google Cloud DLP — A Practitioner's Guide to Securing Sensitive
                                Data</a>
                            <span className="ref-source">Medium</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-53">
                        <span className="ref-badge">53</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview" rel="noopener" target="_blank">Sensitive Data Protection overview</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>コンプライアンス — 全般・法令規制・データ主権</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-54">
                        <span className="ref-badge">54</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate" rel="noopener" target="_blank">Shared responsibilities and shared fate on Google Cloud</a>
                            <span className="ref-source">Cloud Architecture Center, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-55">
                        <span className="ref-badge">55</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/compliance/hipaa" rel="noopener" target="_blank">HIPAA Compliance on Google Cloud</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-56">
                        <span className="ref-badge">56</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/compliance/hipaa-compliance" rel="noopener" target="_blank">HIPAA - Compliance</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-57">
                        <span className="ref-badge">57</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/assured-workloads/docs/overview" rel="noopener" target="_blank">Overview of Assured Workloads</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-58">
                        <span className="ref-badge">58</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/assured-workloads/docs/control-packages" rel="noopener" target="_blank">Control packages | Assured Workloads</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-62">
                        <span className="ref-badge">62</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/compliance/soc-2" rel="noopener" target="_blank">SOC 2: compliance</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-63">
                        <span className="ref-badge">63</span>
                        <div className="ref-body">
                            <a href="https://business.safety.google/compliance/" rel="noopener" target="_blank">Data Protection Law Compliance</a>
                            <span className="ref-source">Google Safety Center</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-64">
                        <span className="ref-badge">64</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/trust-center" rel="noopener" target="_blank">Trust Center - Security and Compliance</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-65">
                        <span className="ref-badge">65</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/compliance?hl=en" rel="noopener" target="_blank">Cloud compliance and regulations resources</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-66">
                        <span className="ref-badge">66</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/compliance/compliance-reports-manager" rel="noopener" target="_blank">Compliance reports manager</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>コンプライアンス — 商用データ・PCI DSS</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-59">
                        <span className="ref-badge">59</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/security/compliance/pci-dss" rel="noopener" target="_blank">PCI DSS - Compliance</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-60">
                        <span className="ref-badge">60</span>
                        <div className="ref-body">
                            <a href="https://services.google.com/fh/files/misc/gcp_pci_dss_v4_responsibility_matrix.pdf" rel="noopener" target="_blank">Google Cloud Platform: PCI DSS v4.0.1 Shared Responsibility Matrix
                                (PDF)</a>
                            <span className="ref-source">Google Cloud</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-61">
                        <span className="ref-badge">61</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/architecture/pci-dss-and-gke-guide" rel="noopener" target="_blank">PCI DSS compliance on GKE</a>
                            <span className="ref-source">Cloud Architecture Center, Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>Well-Architected Framework</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-70">
                        <span className="ref-badge">70</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/architecture/framework/security" rel="noopener" target="_blank">Well-Architected Framework: Security, privacy, and compliance
                                pillar</a>
                            <span className="ref-source">Cloud Architecture Center, Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-71">
                        <span className="ref-badge">71</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/architecture/framework/security/implement-security-by-design" rel="noopener" target="_blank">Implement security by design</a>
                            <span className="ref-source">Cloud Architecture Center, Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <h3 className="ref-cat-title" tabIndex={-1}>監査（Access Transparency / Access Approval）</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref-67">
                        <span className="ref-badge">67</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/assured-workloads/access-transparency/docs/overview" rel="noopener" target="_blank">Overview of Access Transparency</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-68">
                        <span className="ref-badge">68</span>
                        <div className="ref-body">
                            <a href="https://docs.cloud.google.com/assured-workloads/access-approval/docs/audit-logging" rel="noopener" target="_blank">Access Approval audit logging information</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                    <div className="ref-card" id="ref-69">
                        <span className="ref-badge">69</span>
                        <div className="ref-body">
                            <a href="https://cloud.google.com/cloud-provider-access-management/access-transparency/docs/reading-logs" rel="noopener" target="_blank">Understanding and using Access Transparency logs</a>
                            <span className="ref-source">Google Cloud Documentation</span>
                        </div>
                    </div>
                </div>
                <p>
                    <em>本ガイドは学習補助を目的として作成されています。試験の出題範囲・配点は変更される可能性があるため、必ず<a href="https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf">公式Exam Guide</a>および<a href="https://cloud.google.com/learn/certification/cloud-architect">公式認定ページ</a>で最新情報をご確認ください。</em>
                </p>
            
                </main>
            </div>
        </div>
    );
}
