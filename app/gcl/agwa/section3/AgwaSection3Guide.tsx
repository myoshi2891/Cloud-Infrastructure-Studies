'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

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
    'EDRMの3段階（Identification／Preservation／Collection）とVaultの対応機能を説明できる',
    'Archived UserライセンスとアカウントSuspend・Deleteの違い、それぞれのデータ保持への影響を説明できる',
    'デフォルト保持ルールとカスタム保持ルールの優先順位、holdsとの優先順位を説明できる',
    'Vault検索・エクスポートに必要な3つの管理者権限を挙げられる',
    'Vaultのエクスポート保存期間（15日間）とエクスポート先のデータリージョン設定を説明できる',
    'DLPが対応する3つのサービス（Gmail・Drive・Chat）と、それぞれで使えるアクションの違い（Quarantineの制約）を説明できる',
    '定義済み検出器とカスタム検出器（正規表現・ワードリスト）の違いを説明できる',
    'DLPルールにおけるカスタム通知メッセージの設定単位（ドメイン・OU・グループ）を説明できる',
    'Drive信頼ルールにおいて「ブロックが常に優先される」原則と、ビジター/未管理アカウントへの適用条件を説明できる',
    '許可リスト（allowlist）と信頼ルール（trust rules）の機能差を説明できる',
    'Google Takeout・Data Export Tool・Google Vaultのエクスポートの目的の違いを説明できる',
    'FundamentalデータリージョンとEnterpriseデータリージョンの違い（リージョン数、OU単位設定の可否）を説明できる',
    'Assured ControlsとAssured Controls Plusで対応できる規制（FedRAMP・CJIS・ITAR・IL4・FINRA）を挙げられる',
    '分類ラベルを適用できる対象・できない対象を説明できる',
    '手動・既定分類・DLP・AI分類の4種類のラベル付与方法とその優先順位を説明できる',
    'AI分類のカスタムモデルとGeminiベースの分類の違いを説明できる',
    '分類ラベルの制限（組織全体150個、Gmailメッセージ20個）を説明できる',
];

export function AgwaSection3Guide() {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        new Array(CHECKLIST_ITEMS.length).fill(false)
    );

    const toggleCheck = (index: number) => {
        const next = [...checkedItems];
        next[index] = !next[index];
        setCheckedItems(next);
    };

    const checkedCount = checkedItems.filter(Boolean).length;

    return (
        <div className="agwa-s3-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero" id="hero">
                        <div className="kicker">Exam Guide Section 3 ・ 出題配分 約15%</div>
                        <h1>データガバナンスとコンプライアンスの管理</h1>
                        <p className="subtitle">
                            Google Vault・DLP・Drive信頼ルール・データエクスポート・分類ラベルをステップバイステップで解説
                        </p>
                    </div>

                    <blockquote>
                        <p>
                            本ガイドは、Google公式の<a href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en" target="_blank" rel="noopener noreferrer">認定試験ページ</a>および<a href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">公式Exam Guide PDF</a>に記載された Section 3 の出題範囲（試験全体の<strong>約15</strong>%）に厳密に対応する形で構成しています。中級者〜上級者の管理者を対象に、各機能の仕組み・設定手順・実務上のベストプラクティスをステップバイステップで解説します。
                        </p>
                    </blockquote>
                    <p>Section 3 は次の5つのタスクから構成されます。</p>
                    <ul>
                        <li><strong>3.1</strong> Google Vaultを使用したeDiscoveryとデータ保持</li>
                        <li><strong>3.2</strong> データ損失防止（DLP）ルールの作成と管理</li>
                        <li><strong>3.3</strong> Drive信頼ルール（Trust Rules）の作成と管理</li>
                        <li><strong>3.4</strong> 環境データの保存とエクスポート方法の決定</li>
                        <li><strong>3.5</strong> データの分類</li>
                    </ul>
                    <p>
                        以下の図は、この5タスクがどのように連携してGoogle Workspaceのデータガバナンス基盤を形成しているかを示しています。
                    </p>

                    <Diagram id="diag-1" label="Section 3 データガバナンスとコンプライアンス管理の全体構成" />

                    <p>
                        5つのタスクは独立しているわけではありません。たとえばDLPルール（3.2）は分類ラベル（3.5）を自動付与するアクションとして使われ、Vault（3.1）はDrive信頼ルール（3.3）とは無関係にデータそのものを法的に保持します。この相互関係を意識しながら学習することが、実務でも試験でも重要です。
                    </p>

                    <hr />

                    <div className="quicknav-grid">
                        <a className="quicknav-card qn-1" href="#31-google-vaultを使用したediscoveryとデータ保持">
                            <span className="qn-num">3.1</span>
                            <span className="qn-title">Google Vault</span>
                            <span className="qn-desc">eDiscoveryとデータ保持</span>
                        </a>
                        <a className="quicknav-card qn-2" href="#32-データ損失防止dlpルールの作成と管理">
                            <span className="qn-num">3.2</span>
                            <span className="qn-title">DLP</span>
                            <span className="qn-desc">データ損失防止ルール</span>
                        </a>
                        <a className="quicknav-card qn-3" href="#33-drive信頼ルールの作成と管理">
                            <span className="qn-num">3.3</span>
                            <span className="qn-title">Drive信頼ルール</span>
                            <span className="qn-desc">共有制御の設計</span>
                        </a>
                        <a className="quicknav-card qn-4" href="#34-環境データの保存とエクスポート方法の決定">
                            <span className="qn-num">3.4</span>
                            <span className="qn-title">データの保存と<br />エクスポート</span>
                            <span className="qn-desc">Takeout・Data Export・データリージョン</span>
                        </a>
                        <a className="quicknav-card qn-5" href="#35-データの分類">
                            <span className="qn-num">3.5</span>
                            <span className="qn-title">データの分類</span>
                            <span className="qn-desc">分類ラベルとAI分類</span>
                        </a>
                    </div>

                    <hr />

                    <h2 id="31-google-vaultを使用したediscoveryとデータ保持">
                        3.1 Google Vaultを使用したeDiscoveryとデータ保持
                    </h2>
                    <h3 id="311-google-vaultの全体像とedrmモデル">
                        3.1.1 Google Vaultの全体像とEDRMモデル
                    </h3>
                    <p>
                        Google Vaultは、Google Workspaceの情報ガバナンス・eDiscoveryツールです。Vaultを使うことで、組織のデータを保持し、holdを設定し、検索し、そしてエクスポートできます。重要なのは、<strong>Vaultはデータの別置きアーカイブではない</strong>という点です。Vaultの保持ルールは各サービス（Gmail、Drive、Chatなど）のデータシステムに直接適用され、保持期間を過ぎたデータは各サービス側で削除されます。保持ルールを設定するまでは、Vaultは何もデータを保持しません。ユーザーはデータを削除でき、各サービスは通常のプロトコルに従ってデータを消去します<sup><a href="https://support.google.com/vault/answer/2462365?hl=en">[1]</a></sup>。
                    </p>
                    <p>
                        Vaultは、Electronic Discovery Reference Model（EDRM）が定めるeDiscoveryプロセスの最初の3段階をサポートします<sup><a href="https://support.google.com/vault/answer/2462365?hl=en">[1]</a></sup>。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">EDRM段階</th>
                                    <th scope="col">Vaultでの対応機能</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Identification（特定）</td>
                                    <td>検索</td>
                                    <td>ユーザーアカウント・OU・日付・キーワードでデータを検索し、メッセージ・添付ファイル・対応ファイルをプレビューできる</td>
                                </tr>
                                <tr className="even">
                                    <td>Preservation（保全）</td>
                                    <td>Holds</td>
                                    <td>アカウント・OU・グループに対してholdを設定し、法的・その他の保持義務のためにデータを無期限に保全する</td>
                                </tr>
                                <tr className="odd">
                                    <td>Collection（収集）</td>
                                    <td>エクスポート</td>
                                    <td>検索結果をエクスポートし、処理・分析用にダウンロードする</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="312-アーカイブユーザーライセンスの活用">
                        3.1.2 アーカイブユーザーライセンスの活用
                    </h3>
                    <p>
                        <strong>3.1で最も出題頻度が高いテーマの一つが「アーカイブユーザー（AU）ライセンス」の使いどころです。</strong>
                    </p>
                    <p>
                        Vaultがユーザーのデータを検索・保持・保全できるのは、そのユーザーにVaultライセンスが割り当てられている場合に限られます<sup><a href="https://support.google.com/vault/answer/3220205?hl=en">[2]</a></sup>。ユーザーが退職するなどして組織を離れる際、そのユーザーのGoogle Workspaceデータを引き続きVaultで保持・検索したい場合は、アカウントを<strong>削除せず</strong>、代わりに<strong>Archived User（AU）ライセンス</strong>を割り当てます<sup><a href="https://support.google.com/vault/answer/2557687?hl=en">[3]</a></sup>。
                    </p>
                    <p>
                        なぜアカウント削除ではなくアーカイブが推奨されるのでしょうか。理由は明確です。ユーザーアカウントを削除すると、そのユーザーに関連するすべてのGoogle Workspaceデータが削除され、Vaultが保持・hold していたデータも含めて消去されます<sup><a href="https://support.google.com/vault/answer/2462365">[4]</a></sup>。削除後20日間はデータを復元できますが、データがすでに完全に消去（expunge）された場合は復元できません。
                    </p>
                    <p>AUライセンスの主な特性は次のとおりです。</p>
                    <ul>
                        <li>AUライセンスが付与されたユーザーのアカウントは、通常のライセンスと同様に<strong>保持ルールとholdsの対象</strong>になり続ける</li>
                        <li>退職者のアカウントを一時停止（suspend）するだけでも データは保全されるが、一時停止アカウントは<strong>アクティブなアカウントと同額の課金</strong>が発生する<sup><a href="https://support.google.com/vault/answer/2584132?hl=en">[3]</a></sup></li>
                        <li>Vault以外のアドオンライセンス（Vault自体やGoogle Voiceなど）を持つユーザーをアーカイブした場合、そのライセンスはアーカイブ後も保持される<sup><a href="https://support.google.com/vault/answer/6067442?hl=en">[5]</a></sup></li>
                        <li>アーカイブされたユーザーを元に戻す（unarchive）には、対応するGoogle Workspaceエディションの利用可能なライセンスが必要。ライセンスがない場合、unarchive処理は失敗し、ユーザーはAUライセンスのままアーカイブされた状態に留まる<sup><a href="https://support.google.com/vault/answer/6067442?hl=en">[5]</a></sup></li>
                        <li>アーカイブされたユーザーは、いかなるシステムからもmanaged Google Accountにサインインできなくなる<sup><a href="https://support.google.com/vault/answer/6067442?hl=en">[5]</a></sup></li>
                    </ul>
                    <p>以下は、退職者データを扱う際の意思決定フローです。</p>

                    <Diagram id="diag-2" label="退職者データ保持の意思決定フロー" />

                    <blockquote>
                        <p>
                            ⚠️ 注意: Google Cloud Directory Sync（GCDS）を利用している場合、GCDSがアカウントを削除ではなく一時停止するように構成されていることを確認してください。誤ってGCDS経由でアカウントが削除されると、Vaultが保持していたデータも失われます<sup><a href="https://support.google.com/vault/answer/2462365">[4]</a></sup>。
                        </p>
                    </blockquote>

                    <h3 id="313-保持ポリシーの設定">3.1.3 保持ポリシーの設定</h3>
                    <p>
                        Vaultの保持ルールには<strong>デフォルトルール</strong>と<strong>カスタムルール</strong>の2種類があります。
                    </p>
                    <p>
                        <strong>デフォルト保持ルール</strong>は、サービスごとの既定の保全・削除ポリシーであり、カスタムルールやholdが適用されないユーザーデータに対して適用されます<sup><a href="https://support.google.com/vault/answer/3374023?hl=en">[6]</a></sup>。デフォルトルールで「No default retention」と表示されている場合、そのサービスにはデフォルトルールが設定されていないことを意味します。ステータスが「Off」の場合、そのサービスのデータは別サービスのデフォルトルールでカバーされていることを示します<sup><a href="https://support.google.com/vault/answer/3374023?hl=en">[6]</a></sup>。
                    </p>
                    <p>
                        <strong>カスタム保持ルール</strong>は、特定のOU・グループ・条件（日付、ラベル、キーワードなど）に基づいて設定する、より粒度の細かいルールです。
                    </p>
                    <p>
                        保持ルールの適用範囲の開始タイミングはサービスによって異なります<sup><a href="https://support.google.com/vault/answer/2990828?hl=en">[7]</a></sup>。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">保持期間の起算点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Gmail・Groups</td>
                                    <td>メッセージが送受信された日</td>
                                </tr>
                                <tr className="even">
                                    <td>Drive・Meet・Sites</td>
                                    <td>ルールの設定方法により、ファイル作成日・変更日・ゴミ箱移動日などから起算される場合がある</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Gmailの保持ルールに関しては、ラベルベースのルールを使う場合、<strong>スレッド内で最も新しくラベル付けされたメッセージの日付</strong>を基準に保持期間が計算される点に注意が必要です<sup><a href="https://support.google.com/vault/answer/2535539?hl=en">[8]</a></sup>。
                    </p>
                    <p>
                        ⚠️ <strong>極めて重要な注意点</strong>: 新しい保持ルールを送信（submit）すると、Vaultはその時点で保持期間を超えるデータの<strong>即時パージ</strong>をサービス側に許可します。この挙動はGmail・Drive・Groupsのいずれについても共通しており、ユーザーが保持を期待していたデータが失われる可能性があります<sup><a href="https://support.google.com/vault/answer/7657465?hl=en">[9]</a> <a href="https://support.google.com/vault/answer/7657342?hl=en">[10]</a> <a href="https://support.google.com/vault/answer/2462365">[4]</a></sup>。そのため、公式ヘルプでは新しいルールを本番環境全体に適用する前に、小規模なアカウント群でテストすることを強く推奨しています<sup><a href="https://support.google.com/vault/answer/2462365">[4]</a></sup>。
                    </p>
                    <p>
                        Groupsについては特有の制約があります。グループが削除されると、そのグループ内のメッセージはholdや保持ルールの対象であっても<strong>削除されます</strong>。ただし、ユーザーがグループへの購読を通じてGmailで受信したメッセージは削除されず、Gmailの保持ルール・holdの対象として残ります<sup><a href="https://support.google.com/vault/answer/2462365">[4]</a></sup>。
                    </p>
                    <p>
                        保持ルールと自動削除機能（Google WorkspaceのGmail/Chatメッセージ自動削除設定）との関係も出題されやすいポイントです。自動削除ルールは、Vaultの保持ルールより長くメッセージを保全することはできません。自動削除ルールはVaultの保持ルールより先にメールボックスからメッセージを削除できますが、そのメッセージはGmailの30日間の保全ポリシーとVaultの保持ルールの両方が満了するまで、Vaultから引き続き検索可能です<sup><a href="https://support.google.com/vault/answer/6093005?hl=en">[11]</a></sup>。
                    </p>

                    <h3 id="314-法的調査目的のholds設定">3.1.4 法的・調査目的のholds設定</h3>
                    <p>
                        Holdは、特定のユーザー・OU・グループ・Chatスペース・共有ドライブに対して設定され、データを<strong>無期限に</strong>保持します。Holdはデフォルト保持ルールおよびカスタム保持ルールの<strong>両方より優先</strong>されます<sup><a href="https://support.google.com/vault/answer/3374023?hl=en">[12]</a></sup>。
                    </p>
                    <p>Holdの主な性質は以下のとおりです。</p>
                    <ul>
                        <li>Holdは保持ルールを上書きする。保持ルールがデータをパージするよう設定されていても、hold対象のデータはholdが解除されるまでパージされない<sup><a href="https://support.google.com/vault/answer/7664657?hl=en">[13]</a></sup></li>
                        <li>Holdは<strong>加算的</strong>（additive）である。1つのholdが別のholdを置き換えることはない。たとえば「project X」というフレーズを含むメッセージを対象とするHold Aと、「budget」という語を含むメッセージを対象とするHold Bが同一ユーザーに設定されている場合、Vaultは両方の条件のいずれかに一致するメッセージを保全する<sup><a href="https://support.google.com/vault/answer/7664657?hl=en">[13]</a></sup></li>
                        <li>Holdが設定されたユーザーのアカウントは、hold解除までGoogle Workspace管理者が削除できない。データの転送も同様にできない<sup><a href="https://support.google.com/vault/answer/7664657?hl=en">[13]</a></sup></li>
                        <li>Hold対象データは、（a）holdが削除される、（b）custodianがholdから除外される、（c）ユーザーがVaultライセンスを失う、のいずれかが発生するまでパージできない<sup><a href="https://support.google.com/vault/answer/7664657?hl=en">[13]</a></sup></li>
                    </ul>
                    <p>サービスごとにholdが保全するデータの範囲は次のとおりです<sup><a href="https://support.google.com/vault/answer/7664657?hl=en">[13]</a></sup>。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">Holdが保全するデータ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Gmail</td>
                                    <td>送信済み・下書き（削除されていないもの）・ゴミ箱・アーカイブ・迷惑メールを含むメッセージと添付ファイル</td>
                                </tr>
                                <tr className="even">
                                    <td>Groups</td>
                                    <td>Google Groups内のメッセージ（グループが削除されるまで）</td>
                                </tr>
                                <tr className="odd">
                                    <td>Chat</td>
                                    <td>記録あり（履歴オン）のGoogle Chatメッセージ</td>
                                </tr>
                                <tr className="even">
                                    <td>Drive</td>
                                    <td>ユーザーのDrive内のアイテム（フォルダ・ショートカットを除く）、および任意で関連する共有ドライブ内のアイテム。Meet録画やそのログファイル、新しいGoogle Sitesサイトにも適用される</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>保持ルールとholdsの優先順位を図示すると以下のようになります。</p>

                    <Diagram id="diag-3" label="Vault保持ルールとHoldsの判定ロジック" />

                    <p>
                        組織全体のholdを横断的に確認したい場合は、Vaultの「Reports」機能を使い、Domain Holds（OUに適用されるhold）・User Holds（ユーザーを明示的に含むhold）・Group Holds（グループに適用されるhold）を確認できます。この機能を使うには「Manage Audits」権限が必要です<sup><a href="https://support.google.com/vault/answer/9895152">[14]</a></sup>。
                    </p>

                    <h3 id="315-保持ルールの自動化された運用">3.1.5 保持ルールの自動化された運用</h3>
                    <p>
                        タスク3.1の記述では「特定の基準（日付、コンテンツなど）に基づいてデータを自動的に保持または削除するための保持ルールの作成と管理」が挙げられています。これは3.1.3で解説したカスタム保持ルールの仕組みそのものであり、日付ベース（作成日・送信日からの経過日数）やラベル・条件ベースの両方を組み合わせて、定期的な棚卸し作業なしにコンプライアンス要件を満たせるようにする点が実務上の価値です。
                    </p>
                    <p>
                        Vaultユーザーは、自組織の法的・業務上の要件を満たしているかを確認するため、<strong>定期的に保持ルールとholdsをレビュー</strong>することが推奨されています<sup><a href="https://support.google.com/vault/answer/2990828?hl=en">[6]</a></sup>。保持ルールやholdを変更・削除すると、ユーザーが保持を期待していたデータをサービス側がパージすることを許可してしまう可能性があるため注意が必要です<sup><a href="https://support.google.com/vault/answer/2990828?hl=en">[6]</a></sup>。
                    </p>

                    <h3 id="316-vaultの検索とエクスポート機能">3.1.6 Vaultの検索とエクスポート機能</h3>
                    <p>
                        検索とエクスポートを実行するには、Google Workspace管理者から<strong>Manage Matters・Manage Searches・Manage Exports</strong>の3つの権限を割り当てられている必要があります<sup><a href="https://support.google.com/vault/answer/2473458?hl=en">[15]</a></sup>。
                    </p>
                    <p>検索の基本フローは次のとおりです。</p>
                    <ol>
                        <li>vault.google.comにサインインする</li>
                        <li>対象の<strong>Matter</strong>（案件。ホールド・検索・エクスポートをグループ化する作業単位）を開く</li>
                        <li>アカウント・OU・日付・キーワードなどの条件でデータを検索する。ほとんどのサービスでBoolean演算子を使った検索がサポートされている<sup><a href="https://support.google.com/vault/answer/2462365?hl=en">[1]</a></sup></li>
                        <li>検索結果をプレビューする。メッセージは会話単位でまとめてプレビューされ、個別メッセージをクリックすると展開できる<sup><a href="https://support.google.com/vault/answer/6161352?hl=en">[16]</a></sup></li>
                        <li>必要に応じてクエリを保存する（結果は保存されず、クエリ条件のみが保存される。保存済みクエリは動的で、再実行すると前回の検索以降に作成されたデータも含まれる）<sup><a href="https://support.google.com/vault/answer/6161352?hl=en">[16]</a></sup></li>
                    </ol>
                    <p>
                        検索時の制約として、ワイルドカード検索は1ユーザーアカウントあたり100件以上の単語に一致すると結果を返せません。また、Calendar・Chat・Drive・Voiceの検索ではワイルドカードがサポートされていません<sup><a href="https://support.google.com/vault/answer/6161352?hl=en">[16]</a></sup>。Driveの検索では、Word・Excel・PowerPoint・PDF・HTML・TXT・RTFなどのファイル内テキストを検索できますが、動画・音声・画像・バイナリファイルの内容は検索できません<sup><a href="https://support.google.com/vault/answer/6161352?hl=en">[16]</a></sup>。
                    </p>
                    <p>
                        エクスポートを実行するには、まず検索を行い、その結果に対して「Export」をクリックします。エクスポートには以下の情報が含まれます<sup><a href="https://support.google.com/vault/answer/2473458?hl=en">[17]</a></sup>。
                    </p>
                    <ul>
                        <li>検索条件に一致したデータの包括的なコピー</li>
                        <li>エクスポートされたデータを組織内の個々のユーザーに紐づけるために必要なメタデータ</li>
                        <li>エクスポートされたデータがGoogleのサーバー上のデータと一致することを証明するための裏付け情報</li>
                    </ul>
                    <p>
                        エクスポートは実行後<strong>15日間</strong>利用可能で、その後はデータ保護のため自動的に削除されます<sup><a href="https://support.google.com/vault/answer/2539616?hl=en">[18]</a></sup>。GmailやGoogle Groups、Google Chatからのエクスポートでは、メッセージ本文のファイル形式としてPSTまたはmboxを選択できます<sup><a href="https://support.google.com/vault/answer/2473458?hl=en">[17]</a></sup>。
                    </p>
                    <p>
                        組織にスーパー管理者による「Multi-party approval for Vaultエクスポート」が設定されている場合、エクスポートリクエストはマルチパーティ承認プロセスをトリガーします。これはVault UIから開始されたエクスポートリクエストにのみ適用され、Vault APIから開始されたリクエストには適用されない点に注意してください<sup><a href="https://support.google.com/vault/answer/2473458?hl=en">[17]</a></sup>。
                    </p>
                    <p>
                        Vaultがエクスポートできないデータにも留意が必要です。VaultはCalendar・Contacts・Keep・Currentsなど一部のサービスをサポートしていません<sup><a href="https://support.google.com/vault/answer/6093005?hl=en">[19]</a></sup>。またVaultのエクスポートは法的開示（legal discovery）を目的として作成されるものであり、効率的なデータ処理を目的としたものではありません。差分バックアップの作成やデータの重複排除はできず、たとえばDriveのエクスポートでは、検索対象のアカウントがアクセス権を持つすべてのアイテムが含まれます。多数のアカウントが同一のアイテムにアクセスできる場合、各アカウントについて個別にエクスポートされるため、大量の重複データが生成されます<sup><a href="https://support.google.com/vault/answer/6093005?hl=en">[19]</a></sup>。
                    </p>

                    <h3 id="317-エクスポート先の設定">3.1.7 エクスポート先の設定</h3>
                    <p>
                        組織にデータリージョンポリシー（3.4.3で詳述）が設定されている場合、エクスポート実行時にエクスポートデータのリージョンを選択できます<sup><a href="https://support.google.com/vault/answer/2473458?hl=en">[17]</a></sup>。これはVaultのエクスポートと、後述するData Export Toolの両方に共通する考え方であり、法域をまたぐデータ主権要件がある組織にとって重要な設定項目です。
                    </p>

                    <h3 id="318-監査レポートの生成">3.1.8 監査レポートの生成</h3>
                    <p>
                        Vaultは、保持ルールの作成・編集、検索の実行、エクスポートの実行など、<strong>Vaultユーザーによるすべての操作の完全な監査ログ</strong>を提供します。この監査ログは編集できません<sup><a href="https://support.google.com/a/answer/13851268?hl=en">[20]</a></sup>。
                    </p>
                    <p>監査ログへのアクセス方法は2通りあります。</p>
                    <ol>
                        <li><strong>Vaultコンソール内のMatter単位の監査（Audit）機能</strong>: 特定のMatterに関連する操作履歴をCSVでダウンロードできる。ただし、保持ルールに関連する操作はMatter単位の監査には含まれない（保持ルールはMatterの外側で管理されるため）<sup><a href="https://support.google.com/a/answer/13851268?hl=en">[21]</a></sup></li>
                        <li><strong>Admin consoleのセキュリティセンター内の「Investigation tool」</strong>: データソースとして「Vault log events」を選択し、条件を指定して組織全体のVault操作を横断検索できる。この機能を利用するには「Security center administrator」権限が必要<sup><a href="https://support.google.com/vault/answer/4239060?hl=en">[22]</a></sup></li>
                    </ol>
                    <p>
                        以下は、Vaultにおけるユーザーアカウントのライフサイクルと、それに伴うVaultの操作可否をまとめた状態遷移図です。
                    </p>

                    <Diagram id="diag-4" label="Vaultにおけるアカウントライフサイクルと状態遷移" />

                    <h3 id="319-ベストプラクティス">3.1.9 ベストプラクティス</h3>
                    <ul>
                        <li><strong>削除ではなくアーカイブを使う</strong>: 退職者のデータをVaultで扱い続けたい場合は、必ずアカウント削除ではなくAUライセンスへの切り替えを選択する<sup><a href="https://support.google.com/vault/answer/6067442?hl=en">[3]</a></sup></li>
                        <li><strong>新しい保持ルールは小規模なアカウント群でテストする</strong>: ルール送信直後に即時パージが発生しうるため、本番全体への適用前に検証する<sup><a href="https://support.google.com/vault/answer/2462365">[4]</a></sup></li>
                        <li><strong>Holdと保持ルールの優先順位を理解しておく</strong>: Holdは常に保持ルールに優先する。監査や法務対応の観点では、まずhold状況を「Reports」機能で横断的に確認する<sup><a href="https://support.google.com/vault/answer/9895152">[14]</a></sup></li>
                        <li><strong>GCDSはアカウント削除ではなく一時停止するよう構成する</strong>: 同期ツール経由の誤削除でVaultの保全対象データが失われることを防ぐ<sup><a href="https://support.google.com/vault/answer/2462365">[4]</a></sup></li>
                        <li><strong>メッセージ保存の一貫性を確保する</strong>: 「Do not delete email and chat messages automatically」を設定し、Comprehensive Message Storageを有効化することで、他のGoogleプロダクトがユーザーに代わって送信したメッセージもGmailメールボックスにコピーが保存され、Vaultの対象になるようにする<sup><a href="https://support.google.com/a/answer/11400056?hl=en">[23]</a></sup></li>
                        <li><strong>エクスポートの15日間の有効期限を運用に組み込む</strong>: エクスポート後は速やかにダウンロード・保存し、必要であればローカルストレージやAssured Controlsの自社バケット機能と併用する</li>
                    </ul>

                    <hr />

                    <h2 id="32-データ損失防止dlpルールの作成と管理">
                        3.2 データ損失防止（DLP）ルールの作成と管理
                    </h2>
                    <h3 id="321-dlp対応サービスと機能差">3.2.1 DLP対応サービスと機能差</h3>
                    <p>
                        DLPは、Gmail・Google Drive・Google Chatの各サービスにおいて、機密コンテンツの共有・送信・アップロードを検知し、あらかじめ定義されたアクションを実行する仕組みです。加えてCalendarやChromeも、コンテンツ保護ルール（Data protection rule）のトリガー対象アプリとして選択できます<sup><a href="https://support.google.com/a/answer/11400056?hl=en">[24]</a></sup>。
                    </p>
                    <p>
                        各サービスがサポートするDLPの機能には差があります。特に押さえておくべきはアクションの違いです。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">サポートされる主なアクション</th>
                                    <th scope="col">特記事項</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Gmail</td>
                                    <td>Block message／Warn users／Quarantine message／Audit only</td>
                                    <td>Quarantineが使えるのはGmailのみ<sup><a href="https://support.google.com/a/answer/14767988?hl=en">[25]</a></sup></td>
                                </tr>
                                <tr className="even">
                                    <td>Drive</td>
                                    <td>Block／Warn／Audit（ラベル付与などのアクションも可）</td>
                                    <td>ダウンロード・印刷・コピーの禁止アクションと組み合わせ可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>Chat</td>
                                    <td>Block message／Warn users／Audit</td>
                                    <td>メッセージ本文とファイル添付を個別にトリガー対象として選択可能<sup><a href="https://support.google.com/a/answer/10846568?hl=en">[26]</a></sup></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Drive DLPとChat DLPは、Cloud Identity PremiumユーザーがGoogle Workspaceライセンス（Enterprise・Business・Educationなどの対応エディション）も併せ持つ場合にも利用できます<sup><a href="https://support.google.com/a/answer/9655387?hl=en">[27]</a></sup>。
                    </p>
                    <p>
                        DLPルールを作成・編集するには、次のいずれかの管理者権限が必要です<sup><a href="https://support.google.com/a/answer/9646351?hl=en">[28]</a></sup>。
                    </p>
                    <ul>
                        <li>Organizational unit administrator privileges（表示のみ）</li>
                        <li>Groups administrator privileges</li>
                        <li><strong>View DLP rule</strong> および <strong>Manage DLP rule</strong> の両方の権限（両方を有効にしないと完全な権限にならない点に注意）</li>
                    </ul>

                    <h3 id="322-コンテンツ検出器によるdlpルールの自動化">
                        3.2.2 コンテンツ検出器によるDLPルールの自動化
                    </h3>
                    <p>
                        DLPルールの核心は「コンテンツ検出器（content detector）」です。検出器には大きく2種類あります。
                    </p>
                    <p>
                        <strong>定義済み検出器（Predefined content detectors）</strong>: クレジットカード番号や運転免許証番号、納税者番号など、標準的な機密情報の種類を自動的にスキャン・報告するために、Googleがあらかじめ用意した検出器です<sup><a href="https://support.google.com/a/answer/7047475?hl=en">[29]</a></sup>。コンテンツ検出器は機密コンテンツの検出を保証するものではなく、アプリケーションやファイル種別によっては制約があります。検出精度を高めるためには、すべてのコンテンツをスキャンするのではなく、特定のファイル属性のみをスキャン対象にする、あるいは近接マッチング（proximity matching）を使う方法が有効です<sup><a href="https://support.google.com/a/answer/7047475?hl=en">[29]</a></sup>。
                    </p>
                    <p>
                        <strong>カスタム検出器（Custom detectors）</strong>: 組織固有の機密情報を検出するために作成する検出器で、以下の2種類があります<sup><a href="https://support.google.com/a/answer/9655387?hl=en">[30]</a></sup>。
                    </p>
                    <ul>
                        <li><strong>正規表現（Regular expression）</strong>: パターンマッチングによってテキストを検出する。ルール作成画面の「Test Expression」機能で事前に検証できる</li>
                        <li><strong>ワードリスト（Word list）</strong>: カンマ区切りの単語リストで、大文字小文字や記号は無視され、完全一致する単語のみが検出される。ワードリスト内の各単語は少なくとも2文字の英数字を含む必要がある</li>
                    </ul>
                    <p>
                        条件は複数組み合わせることができ、AND・OR・NOTの各演算子を使ってネストした条件を構築できます<sup><a href="https://support.google.com/a/answer/9655387?hl=en">[27]</a></sup>。標準的な個人識別情報（運転免許証番号、納税者番号など）を検出したい場合は、定義済み検出器を使うのが基本です<sup><a href="https://support.google.com/a/answer/7047475?hl=en">[27]</a></sup>。
                    </p>
                    <p>DLPルール作成の全体フローは以下のとおりです。</p>

                    <Diagram id="diag-5" label="DLPルール作成フロー" />

                    <p>
                        新しく作成したり変更したルールが実際に反映されるまで、最大<strong>24時間</strong>かかる場合があります（通常はもっと早く反映される）<sup><a href="https://support.google.com/a/answer/11400056?hl=en">[24]</a></sup>。
                    </p>
                    <p>
                        Gmailにおけるスキャンの仕組みも出題対象です。DLPルールは基本的に<strong>非同期</strong>（asynchronous）でスキャンされます。つまりメッセージは送信者のメールボックスを離れてから、受信者に配信される前にスキャンされ、必要であればブロック・隔離されます。ユーザーがサードパーティのメールアプリからメッセージを送信した場合や、同期スキャンが成功しなかった場合には非同期スキャンが行われます<sup><a href="https://support.google.com/a/answer/14767988?hl=en">[24]</a></sup>。2024年のアップデートでGmail向けDLPの適用は即時化され、より迅速にアクションが実行されるようになりました<sup><a href="https://workspaceupdates.googleblog.com/2024/10/gmail-data-loss-prevention-enforcement-is-now-instantaneous.html">[31]</a></sup>。
                    </p>

                    <Diagram id="diag-6" label="Gmail DLPスキャンのシーケンス" />

                    <h3 id="323-サービス別のdlpルール適用">3.2.3 サービス別のDLPルール適用</h3>
                    <p>
                        DLPルールをGmailに適用する場合、それぞれのアクションでユーザー体験が異なります<sup><a href="https://support.google.com/a/answer/14767988?hl=en">[25]</a></sup>。
                    </p>
                    <ul>
                        <li><strong>Block message</strong>: メッセージ送信をブロックし、ユーザーに通知する。アラートには「Back to editing」オプションがあり、ユーザーは機密コンテンツを編集・削除して再送信できる</li>
                        <li><strong>Warn users</strong>: 機密情報が検出されたことを警告するが、ユーザーの判断で送信を続行できる</li>
                        <li><strong>Quarantine message</strong>: 管理者がレビューするまでメッセージを隔離する。送信者にはメッセージが隔離された旨のアラートが表示され、カスタムメッセージを追加できる</li>
                        <li><strong>Audit only</strong>: メッセージは送信され、DLPイベントは今後の監査のためにログ記録される。新しいルールの影響評価に有用</li>
                    </ul>
                    <p>
                        Drive向けDLPルールでは、ファイル名・拡張子・ファイル種別に基づく条件を、メール本文や件名ではなく<strong>添付ファイルのみ</strong>に適用する点に注意してください（この制約はGmailルールでファイル属性条件を使う場合に該当します）<sup><a href="https://support.google.com/a/answer/9655387?hl=en">[29]</a></sup>。
                    </p>
                    <p>
                        Chat向けDLPルールでは、メッセージ送信とファイルアップロードをそれぞれ個別にトリガーとして選択できます。条件を設定しないルールを作成すると、選択したトリガー（メッセージ・添付ファイル、あるいはその両方）に対して指定したアクションがすべてのChatメッセージ・アップロードファイルに適用されてしまう点に注意が必要です<sup><a href="https://workspaceupdates.googleblog.com/2023/12/custom-notifications-for-google-chat-data-loss-prevention-rules-web-mobile.html">[26]</a></sup>。また、カンマ区切り値（.csv）ファイルはプレーンテキストとして扱われるため、スプレッドシートとして見た場合に明らかな違反がある列でも、DLPが検出できない場合があります<sup><a href="https://workspaceupdates.googleblog.com/2023/12/custom-notifications-for-google-chat-data-loss-prevention-rules-web-mobile.html">[26]</a></sup>。
                    </p>

                    <h3 id="324-通知メッセージのカスタマイズ">3.2.4 通知メッセージのカスタマイズ</h3>
                    <p>
                        DLPルールがトリガーされた際にユーザーに表示される通知メッセージは、ルールごとにカスタマイズできます。カスタム通知を設定することで、なぜブロックされたのか、どうすればブロックを解除できるか、機密データの取り扱いに関する組織ガイドラインへのリンクなど、ユーザーにより具体的なコンテキストを提供できます<sup><a href="https://workspaceupdates.googleblog.com/2023/12/custom-notifications-for-google-chat-data-loss-prevention-rules-web-mobile.html">[32]</a></sup>。
                    </p>
                    <p>
                        カスタム通知はドメイン単位・OU単位・グループ単位でルールごとに設定可能です。ルール作成のStep 4「Actions」内、「User Message」セクションで「customize message」を選択します。既存のルールにも後からカスタム通知を適用できます。カスタム化しない場合は、汎用的な既定の通知がユーザーに表示されます<sup><a href="https://workspaceupdates.googleblog.com/2023/12/custom-notifications-for-google-chat-data-loss-prevention-rules-web-mobile.html">[32]</a></sup>。
                    </p>

                    <h3 id="325-ベストプラクティス">3.2.5 ベストプラクティス</h3>
                    <ul>
                        <li><strong>Audit onlyでルールをテストする</strong>: ブロックや警告などのアクションを設定せずにルールを有効化し、トリガーされた際のログのみを確認することで、本番適用前に誤検知（false positive）を洗い出せる<sup><a href="https://support.google.com/a/answer/9646351?hl=en">[33]</a></sup></li>
                        <li><strong>近接マッチングとファイル属性スキャンを活用する</strong>: すべてのコンテンツを無差別にスキャンするのではなく、特定の属性や語の近接関係を条件に加えることで検出精度を高める<sup><a href="https://support.google.com/a/answer/7047475?hl=en">[29]</a></sup></li>
                        <li><strong>条件のネストを恐れない</strong>: AND・OR・NOTを組み合わせた複雑な条件により、単純なキーワード一致よりも高精度なポリシーを構築する</li>
                        <li><strong>カスタム通知でセルフサービス解決を促す</strong>: ユーザーが自分でブロックの原因を理解し対処できるようにすることで、ヘルプデスクへの問い合わせを削減する<sup><a href="https://workspaceupdates.googleblog.com/2023/12/custom-notifications-for-google-chat-data-loss-prevention-rules-web-mobile.html">[32]</a></sup></li>
                        <li><strong>アプリごとのアクション差を理解した設計をする</strong>: QuarantineはGmail限定機能であるため、Drive・Chatでは「Warn」や「Block」を中心にポリシーを設計する</li>
                    </ul>

                    <hr />

                    <h2 id="33-drive信頼ルールの作成と管理">3.3 Drive信頼ルールの作成と管理</h2>
                    <h3 id="331-特定のouグループドメインユーザーへの共有制限">
                        3.3.1 特定のOU・グループ・ドメイン・ユーザーへの共有制限
                    </h3>
                    <p>
                        Drive信頼ルール（Trust rules）は、Drive共有設定（sharing settings）やドメインの許可リスト（allowlist）よりも<strong>粒度の細かい制御</strong>を実現する仕組みです<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[34]</a></sup>。信頼ルールを使うことで、内部ユーザーによる共有と外部ユーザーによる共有を個別に管理できます<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[34]</a></sup>。
                    </p>
                    <p>
                        信頼ルールの条件では、以下のいずれかを共有の許可・ブロック対象として指定できます<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup>。
                    </p>
                    <ul>
                        <li><strong>User</strong>: 個別ユーザーのメールアドレス</li>
                        <li><strong>Organizational unit</strong>: 特定のOU</li>
                        <li><strong>Group</strong>: 特定のグループ</li>
                        <li><strong>External organization</strong>: <code>other-company.com</code>のような外部組織のドメイン名。ビジター/ゲスト共有を使う場合を除き、そのドメインはGoogle Workspaceアカウントとしてドメイン検証済みである必要がある</li>
                        <li><strong>Allowlisted domains</strong>: 事前に許可リストに登録済みのドメイン群</li>
                    </ul>
                    <p>
                        条件には「<strong>Include visitors &amp; guest accounts</strong>」というオプションがあり、これをチェックすると、Googleアカウントを持たない相手（ビジター/ゲスト）とも外部共有できるようになります。ただしこのオプションは一部の条件タイプには適用されません<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup>。
                    </p>

                    <h3 id="332-特定のouグループドメインユーザーへの共有ブロック">
                        3.3.2 特定のOU・グループ・ドメイン・ユーザーへの共有ブロック
                    </h3>
                    <p>
                        信頼ルールの真価は、<strong>ブロックルールが常に優先される</strong>という設計にあります。組織外との共有をブロックするルールは、たとえ「Include visitors &amp; guest accounts」オプションが選択されていなくても、常にビジターアカウントにも適用されます<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup>。
                    </p>
                    <p>
                        ただし例外もあります。ある条件のスコープに含まれるグループ内にビジターアカウントが含まれ、かつ別のルールがそのビジターアカウントとの共有を明示的に許可している場合、ブロックアクションはそのグループ内のビジターアカウントには適用されません。つまりユーザーは、そのグループ内のビジターアカウントに引き続きファイルへのアクセスを提供できます<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a> <a href="https://support.google.com/a/answer/10846568?hl=en">[36]</a></sup>。
                    </p>
                    <p>
                        外部の未管理アカウント（unmanaged account。コンシューマーアカウントやメール認証のみのGoogle Workspaceアカウントなど）についても特有のルールがあります。特定のドメインや組織との外部共有を許可するルールを作成した場合、そのドメイン・組織における未管理のGoogleアカウントとは共有<strong>できません</strong>。未管理アカウントと共有したい場合は、そのアカウントをグループに追加し、そのグループとの共有を許可するルールを作成する必要があります<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup>。逆に、組織外との共有をブロックするルールは常に未管理アカウントにも適用されます<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup>。
                    </p>
                    <p>
                        信頼ルールがOUに適用される場合、そのOU配下のすべての共有ドライブにもルールが適用されます。たとえば製造部門のOUが法務部門と共有できるルールを作成すると、法務部門のユーザーは製造部門が所有権を持つ共有ドライブにアクセスできるようになります<sup><a href="https://support.google.com/a/answer/10846568?hl=en">[36]</a></sup>。
                    </p>
                    <p>以下は、Drive信頼ルールの評価ロジックを図示したものです。</p>

                    <Diagram id="diag-7" label="Drive信頼ルールの評価ロジック" />

                    <h3 id="333-組織外との共有の許可制限">3.3.3 組織外との共有の許可・制限</h3>
                    <p>
                        信頼ルールを設定していない状態でも、Drive共有設定の「Sharing options」で外部共有を許可・制限できます。組織外との共有を許可する場合、信頼できるドメインのみを対象とする<strong>許可リスト</strong>（allowlist）方式もあります<sup><a href="https://support.google.com/a/answer/60781?hl=en">[37]</a></sup>。許可リストを使う場合の制約は次のとおりです<sup><a href="https://support.google.com/a/answer/60781?hl=en">[37]</a></sup>。
                    </p>
                    <ul>
                        <li>許可リストに登録するドメインは、ビジター共有を使う場合を除き、Google Workspaceドメインである必要がある</li>
                        <li>許可リスト内の特定ドメインのみを選択して共有を許可する、といった細かい制御はできない（信頼ルールであれば可能）</li>
                    </ul>
                    <p>
                        信頼ルールがまったく設定されていない場合、ユーザーは組織内の全員、Googleアカウントを持つ任意の相手、ビジターアカウントと共有できます。これらの共有をブロックする信頼ルールが一つも存在しない場合、「Drive共有設定でドメイン外共有が許可されている」設定（When sharing outside of your domain is allowed, users can make files and published content available to anyone with the link）がそのまま適用されます<sup><a href="https://support.google.com/a/answer/10846568?hl=en">[36]</a></sup>。
                    </p>
                    <p>
                        信頼ルールを設定すると、Drive共有設定の推奨事項（セキュリティ健全性ページ上のもの）は表示されなくなります。たとえば「ドメイン外共有時の警告」に関する推奨事項は、信頼ルールを設定した組織では表示されません<sup><a href="https://support.google.com/a/answer/7047475?hl=en">[38]</a></sup>。
                    </p>
                    <p>
                        フィッシング・スパム対策の観点でも、信頼ルールは有効な防御層です。悪意のある第三者がDriveのコラボレーション機能を悪用し、個人情報の入力を促す有害なリンクを含むドキュメントを共有するケースがあります。これらの通知はGoogleから送信されるため、ユーザーは正規のメッセージだと誤認しやすい傾向があります。信頼ルール（または許可リスト）で外部共有を制限することで、この種の攻撃対象領域を大きく減らせます<sup><a href="https://support.google.com/a/answer/15201687?hl=en-EN">[39]</a></sup>。
                    </p>

                    <h3 id="334-ベストプラクティス">3.3.4 ベストプラクティス</h3>
                    <ul>
                        <li><strong>許可リストではなく信頼ルールを優先する</strong>: 特定ドメインのみを許可リストに含めたい、内部と外部で異なる粒度の制御をしたい、といった要件がある場合は許可リストよりも信頼ルールを選ぶ<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[34]</a></sup></li>
                        <li><strong>ブロックルールの優先順位を前提に設計する</strong>: 「原則ブロック、例外的に許可」のポリシーを組む場合、ブロックルールがビジター・未管理アカウントにも自動的に及ぶ挙動を理解した上でルールの順序と範囲を設計する<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup></li>
                        <li><strong>未管理アカウントとの共有が必要な場合はグループを経由する</strong>: 個別に許可したいコンシューマーアカウントなどは、専用グループを作成しそのグループを対象にルールを作る<sup><a href="https://support.google.com/a/answer/10621317?hl=en">[35]</a></sup></li>
                        <li><strong>すべてのドメインに2段階認証を要求する</strong>: 許可リストに登録するドメインは2要素認証（またはそれに準ずるアカウントセキュリティ対策）を必須とすることで、侵害されたアカウント経由のスパム拡散リスクを抑える<sup><a href="https://support.google.com/a/answer/15201687?hl=en-EN">[39]</a></sup></li>
                        <li><strong>信頼ルール導入後はセキュリティ健全性ページの前提を再確認する</strong>: Drive共有設定に基づく推奨表示が出なくなるため、信頼ルール自体の定期レビューを運用に組み込む<sup><a href="https://support.google.com/a/answer/7047475?hl=en">[38]</a></sup></li>
                    </ul>

                    <hr />

                    <h2 id="34-環境データの保存とエクスポート方法の決定">
                        3.4 環境データの保存とエクスポート方法の決定
                    </h2>
                    <h3 id="341-google-takeout設定の管理">3.4.1 Google Takeout設定の管理</h3>
                    <p>
                        Google Takeoutは、ユーザー自身が<strong>セルフサービス</strong>でGoogle Workspaceアカウント内のデータをダウンロードできる仕組みです。対象データはDrive・YouTubeなど、Takeoutと連携する主要サービス・追加サービスに及びます<sup><a href="https://knowledge.workspace.google.com/admin/users/advanced/allow-or-block-google-takeout">[40]</a></sup>。
                    </p>
                    <p>Takeoutの制御は大きく2種類に分かれます<sup><a href="https://knowledge.workspace.google.com/admin/users/advanced/allow-or-block-google-takeout">[40]</a></sup>。</p>
                    <ul>
                        <li><strong>共有Takeoutコントロールを持つサービス</strong>: Drive・Gmail・Calendar・Contactsなど、ほとんどのサービスはこのカテゴリに属し、個別にON/OFFを制御できず、まとめて許可・禁止する</li>
                        <li><strong>個別Takeoutコントロールを持つサービス</strong>: Blogger、Google Books、Google Maps、Google Pay、Google Photos、Google Play、Google Play Console、位置情報履歴、YouTubeなど。これらはサービスごとに個別にTakeoutを許可・禁止できる</li>
                    </ul>
                    <p>
                        管理者があるサービスのTakeoutを許可しない場合、ユーザーのTakeout画面にそのサービスは表示されず、データエクスポートのオプションも表示されません<sup><a href="https://knowledge.workspace.google.com/admin/users/advanced/allow-or-block-google-takeout">[40]</a></sup>。既定値はエディションによって異なり、通常のGoogle Workspaceでは許可（Allowed）が既定ですが、Google Workspace for Education K-12では共有コントロールが不許可（Not Allowed）に既定設定されています<sup><a href="https://knowledge.workspace.google.com/admin/users/advanced/allow-or-block-google-takeout">[40]</a></sup>。
                    </p>
                    <p>
                        管理者がサービスを無効化する際、Takeoutを許可しておくことでユーザーが事前にデータをエクスポートできるようにする、という運用も重要です。サービスを無効化してもユーザーのデータ自体は削除されませんが、後からアクセスできなくなる可能性があるため、無効化前にTakeoutでのエクスポートを推奨する運用が望ましいとされています<sup><a href="https://support.google.com/a/answer/7646040?hl=en">[41]</a></sup>。
                    </p>
                    <p>
                        Takeoutの利用状況は、Admin consoleの「Reporting &gt; Audit and investigation &gt; Takeout log events」で監査できます。誰がいつTakeoutを使ってデータをダウンロードしたか、エクスポート開始時刻・完了時刻などを確認できます<sup><a href="https://support.google.com/a/answer/11479893">[42]</a></sup>。
                    </p>

                    <h3 id="342-data-export-toolの使用">3.4.2 Data Export Toolの使用</h3>
                    <p>
                        Data Export Toolは、Takeoutとは異なり、<strong>スーパー管理者が組織全体のデータを一括でエクスポートする</strong>ための機能です<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup>。実行には以下の要件があります<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup>。
                    </p>
                    <ul>
                        <li>作成から30日以上経過したGoogle WorkspaceまたはCloud Identityのスーパー管理者アカウントを使用する（組織アカウント自体が30日未満の場合は例外）</li>
                        <li>管理者アカウントで2段階認証（2SV）が有効になっている必要がある（この2SV要件はエクスポートを開始する管理者のみに適用される）</li>
                        <li>エクスポートしたデータにアクセスするには、管理者アカウントでGoogle Cloudが有効になっている必要がある</li>
                    </ul>
                    <p>
                        組織にFedRAMP認証がある場合、またはユーザー数が1,000人を超える場合は、Data Export Toolを使用する前にGoogle Workspaceサポートへ連絡する必要があります。なお、Googleワークスペースサポートチームはエクスポートされたデータへのアクセスや処理を行いません<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup>。
                    </p>
                    <p>
                        エクスポートの保存先は既定でGoogleが提供する一時的なCloud Storageバケットですが、Assured Controls / Assured Controls Plusアドオンを持つ組織は「Local Data Storage」機能を使い、自社所有のCloud Storageバケットを指定できます<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup>。
                    </p>
                    <p>
                        エクスポート対象データには、通常のサービスデータに加え、<strong>Vaultが保持・保全しているデータ</strong>（ユーザーが削除したがVaultのholdや保持ルールの対象になっているデータ）も含まれます（Vaultライセンスが必要）<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup>。エクスポート実行から24時間以内に作成されたユーザーアカウントのデータ、およびGoogle Vaultポリシーで保持・holdされていない削除済みデータは対象外です<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup>。
                    </p>
                    <p>
                        3つのデータ取得手段（Vault・Takeout・Data Export Tool）の使い分けを整理すると以下のようになります。
                    </p>

                    <Diagram id="diag-8" label="データ取得手段の比較と使い分け" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">手段</th>
                                    <th scope="col">実行者</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">データ範囲</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Google Vault</td>
                                    <td>Vault権限を持つ管理者・法務担当者</td>
                                    <td>eDiscovery・法的保全・調査</td>
                                    <td>検索条件に一致したデータのみ</td>
                                </tr>
                                <tr className="even">
                                    <td>Google Takeout</td>
                                    <td>エンドユーザー自身</td>
                                    <td>個人データのセルフサービス取得</td>
                                    <td>そのユーザー自身のデータのみ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Data Export Tool</td>
                                    <td>スーパー管理者</td>
                                    <td>組織全体のバックアップ・エディション移行</td>
                                    <td>組織全ユーザーの全データ（一部例外あり）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="343-データの地理的保存場所の選択">3.4.3 データの地理的保存場所の選択</h3>
                    <p>
                        データリージョン（Data regions）機能を使うと、対象データを<strong>特定の地理的ロケーション</strong>に保存できます。選択できるロケーションは「米国（United States）」「欧州（Europe、EU向け）」「No preference（指定なし）」の3つです<sup><a href="https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data">[44]</a></sup>。
                    </p>
                    <p>
                        対応エディションを持たないユーザーは、そのOUにデータリージョンポリシーを適用していてもデータリージョンポリシーの対象にはなりません<sup><a href="https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data">[44]</a></sup>。
                    </p>
                    <p>
                        データリージョンは、保存時データ（data at rest。バックアップを含む）と、対応するGoogle Workspaceコアサービスにおけるデータ処理（data processing）の両方をカバーします<sup><a href="https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions">[45]</a></sup>。ただし、データリージョンはログやキャッシュされたコンテンツなど、本ポリシーで明示的に対象とされていないデータタイプやカスタマーサプライドデータではないデータには適用できません<sup><a href="https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions">[45]</a></sup>。
                    </p>
                    <p>データリージョンには2つのレベルがあります。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">レベル</th>
                                    <th scope="col">対象エディション</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Fundamentalデータリージョン</td>
                                    <td>Business Standard・Business Plus・Enterprise Standard・Frontlineなど</td>
                                    <td>組織全体で1つのリージョンのみ選択可能（米国 or 欧州）</td>
                                </tr>
                                <tr className="even">
                                    <td>Enterpriseデータリージョン</td>
                                    <td>Enterprise Plus・Education Plus・Frontline Plusなど</td>
                                    <td>OU・グループ単位で複数リージョンを使い分け可能。データ処理リージョンも個別に指定できる</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram id="diag-9" label="データリージョンレベルの比較" />

                    <p>
                        データリージョンを選択する際は、特定のリージョンを選んでもパフォーマンスが向上したりネットワークやデータアクセスが最適化されたりするわけではない点に注意が必要です。むしろ、リージョン外にいるユーザーは、リアルタイムでの共同編集などの操作時にレイテンシが増加する場合があります<sup><a href="https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data">[44]</a></sup>。
                    </p>
                    <p>
                        データリージョンの適用状況は「データリージョンステータスレポート」で確認できます<sup><a href="https://support.google.com/a/answer/14316861?hl=en">[46]</a></sup>。Assured Controls / Assured Controls Plusアドオンを持つ組織は、より高度な「データリージョン詳細レポート」を利用でき、Chat・Drive・Gmailファイルなどリソースタイプ別の内訳や、外部監査人によるデータリージョンの第三者証明ステートメントも確認できます<sup><a href="https://knowledge.workspace.google.com/admin/security/about-assured-controls-and-assured-controls-plus">[47]</a></sup>。
                    </p>

                    <h3 id="344-業界規制に基づく法令コンプライアンス設定">
                        3.4.4 業界規制に基づく法令・コンプライアンス設定
                    </h3>
                    <p>
                        高度な規制対応が必要な組織向けに、Google Workspaceは<strong>Assured Controls</strong>および<strong>Assured Controls Plus</strong>という2段階のアドオンを提供しています。これらはFrontline PlusまたはEnterprise Plusで利用できる有料アドオンです<sup><a href="https://knowledge.workspace.google.com/admin/security/about-assured-controls-and-assured-controls-plus">[47]</a></sup>。
                    </p>
                    <p>
                        これらのアドオンは、以下のような世界各地の業界規制・データ主権要件への準拠を支援します<sup><a href="https://knowledge.workspace.google.com/admin/security/about-assured-controls-and-assured-controls-plus">[47]</a></sup>。
                    </p>
                    <ul>
                        <li>Federal Risk and Authorization Management Program（FedRAMP）</li>
                        <li>Criminal Justice Information Services（CJIS）セキュリティ要件</li>
                        <li>International Traffic in Arms Regulations（ITAR）</li>
                        <li>Impact Level 4（IL4）要件</li>
                        <li>Financial Industry Regulatory Authority（FINRA）コンプライアンス</li>
                    </ul>
                    <p>
                        主な機能と、Assured Controls／Assured Controls Plusでの提供範囲は次のとおりです<sup><a href="https://knowledge.workspace.google.com/admin/security/about-assured-controls-and-assured-controls-plus">[47]</a></sup>。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">機能</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">Assured Controls</th>
                                    <th scope="col">Assured Controls Plus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Access Management</td>
                                    <td>米国拠点担当者・EU拠点担当者・FBI身元調査済み担当者など、特定属性を持つGoogleスタッフのみに顧客データへのアクセスを制限する</td>
                                    <td>-</td>
                                    <td>✔</td>
                                </tr>
                                <tr className="even">
                                    <td>Access Approvals</td>
                                    <td>Googleサポートチームが機密・制限付きデータにアクセスする前に、顧客側の承認済み担当者から明示的な承認を得ることを必須にする</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr className="odd">
                                    <td>Client-side encryption（既定モード）</td>
                                    <td>機密データを日常的に扱うユーザーに対し、クライアントサイド暗号化（CSE）を既定で有効化する</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr className="even">
                                    <td>Compliance data exports</td>
                                    <td>SEC Rule 17a-4・SEC Rule 18a-6・CFTC § 1.31などFINRAコンプライアンス要件に対応するため、Workspaceデータをエクスポート・アーカイブする</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr className="odd">
                                    <td>Local data storage</td>
                                    <td>自社所有のCloud Storageバケットを使い、任意の地理的ロケーションにWorkspaceデータを保管する（継続的エクスポート・単発エクスポートの両方に対応）</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr className="even">
                                    <td>Google Meetコンプライアンス録画</td>
                                    <td>特定のユーザー・グループの会議を自動的に録画・文字起こしし、コンプライアンス上のアーカイブ要件（FINRA対応など）を満たす</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        医療分野向けの規制対応としては、Google WorkspaceはHIPAA（Health Insurance Portability and Accountability Act）の対象事業者（covered entity）・ビジネスアソシエイト向けにBusiness Associate Agreement（BAA）を提供しています。BAAは、PHI（保護対象保健情報）の処理に関するGoogleとの取り決めを定めるものです<sup><a href="https://cloud.google.com/security/compliance/hipaa-compliance">[48]</a></sup>。BAAを締結するには、組織はGoogle Cloudのアカウントマネージャーと相談する必要があります<sup><a href="https://cloud.google.com/security/compliance/hipaa-compliance">[48]</a></sup>。BAAが適用されるのはあくまで「対象サービス（covered services）」に限られるため、PHIを扱う業務では、BAAの対象範囲に含まれるサービスのみを利用することが前提になります。
                    </p>

                    <h3 id="345-ベストプラクティス">3.4.5 ベストプラクティス</h3>
                    <ul>
                        <li><strong>Takeoutを無効化する前にユーザーへ告知する</strong>: サービス自体を無効化する場合でも、ユーザーが必要なデータを事前にTakeoutでダウンロードできるよう配慮する<sup><a href="https://support.google.com/a/answer/7646040?hl=en">[41]</a></sup></li>
                        <li><strong>Data Export Toolの実行前提条件を満たしておく</strong>: 30日以上経過したスーパー管理者アカウント、2SV、Google Cloudの有効化を事前にチェックする<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup></li>
                        <li><strong>1,000ユーザー超・FedRAMP環境では事前にサポートへ連絡する</strong>: 大規模組織や高規制環境でのData Export Toolの利用は、事前調整が前提とされている<sup><a href="https://support.google.com/a/answer/14338836?hl=en">[43]</a></sup></li>
                        <li><strong>データリージョンは「パフォーマンス向上策」ではなく「データ主権対応策」と位置づける</strong>: レイテンシ増加などのトレードオフを理解した上で、GDPRなど地域規制への対応を主目的として設計する<sup><a href="https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data">[44]</a></sup></li>
                        <li><strong>規制業種ではAssured Controls / Plusの必要性を早期に評価する</strong>: FINRA・HIPAA・FedRAMP・CJIS・ITARなど、業種固有の規制要件がある場合は、標準エディションでは対応しきれない機能（Access Management、コンプライアンス録画など）が必要かどうかを事前に洗い出す<sup><a href="https://knowledge.workspace.google.com/admin/security/about-assured-controls-and-assured-controls-plus">[47]</a></sup></li>
                    </ul>

                    <hr />

                    <h2 id="35-データの分類">3.5 データの分類</h2>
                    <h3 id="351-ラベル適用のユースケース">3.5.1 ラベル適用のユースケース</h3>
                    <p>
                        分類ラベル（Classification labels）は、Drive内のファイルおよびユーザーが作成するGmailメッセージに適用できるメタデータです。ラベルはシンプルなタグとしても使えますし、選択リスト・日付・数値・人物など、構造化された複数のメタデータフィールドを持たせることもできます<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>
                    <p>
                        タスク3.5では、ユーザー分類・DLP・既定分類・AI分類といった観点でラベル適用のユースケースを識別することが求められます。公式ヘルプが挙げる代表的なユースケースは以下のとおりです<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>
                    <ul>
                        <li><strong>情報ガバナンス戦略に沿った分類</strong>: 「機微度（Sensitivity）」ラベルを使い、「Confidential」や「Highly Sensitive」とマークされたファイルへのアクセスを制限したり、「Highly Sensitive」ラベルが付いたメッセージの外部送信を防いだりする</li>
                        <li><strong>DriveとGmailメッセージへのポリシー適用</strong>: DLPルールの条件・アクションとしてラベルを利用し、コンプライアンス要件を満たす。たとえばファイルやメッセージにPIIが含まれる場合、自動的に「Confidential」ラベルを適用し、そのファイルの外部共有やメッセージの送信をブロックする。ルールでラベルが使われている場合、そのラベルは破壊的な編集（無効化・削除）からロックされる</li>
                        <li><strong>Drive内のファイルをより速く見つける</strong>: 「Contract Status」「Due Date」といったラベルフィールドを使い、金曜日までに署名待ちのすべての契約書をDriveで検索する、といった使い方ができる。なおGmail内でのラベルに基づく検索はサポートされていない</li>
                    </ul>
                    <p>
                        サンプルとして挙げられるラベル体系には次のようなものがあります<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>
                    <ul>
                        <li>輸出管理: EAR、ITAR、OFAC</li>
                        <li>コンプライアンス: FINRA、HIPAA</li>
                        <li>プライバシー: PII、SPII、No PII</li>
                        <li>ステータス: Draft、In Review、Final</li>
                        <li>コンテンツ種別: Contract、Design Doc、Mockup</li>
                    </ul>
                    <p>
                        分類ラベルを適用できる対象・できない対象も明確に区別されています<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">適用できる</th>
                                    <th scope="col">適用できない</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>組織が所有するDrive内の任意のファイル</td>
                                    <td>フォルダ・ショートカット・共有ドライブ自体・他組織が所有するファイル</td>
                                </tr>
                                <tr className="even">
                                    <td>組織内ユーザーがGmailで作成中のメッセージ</td>
                                    <td>Driveラベルをサポートするライセンスを持たないユーザーが所有するファイル</td>
                                </tr>
                                <tr className="odd">
                                    <td>非Gmailクライアントで作成されたメッセージ（ただしDLPルールのみで付与可能、ユーザー自身は付与不可）</td>
                                    <td>組織外のユーザーから送信されたメッセージ、すでに送受信済みのメッセージ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="352-分類ラベルの設定方法">3.5.2 分類ラベルの設定方法</h3>
                    <p>
                        分類ラベルの適用方法は、大きく<strong>手動・既定（デフォルト）・DLPルール・AI分類</strong>の4種類に分類できます。
                    </p>
                    <p>
                        <strong>手動適用</strong>: 編集権限を持つユーザーが、Drive上のファイルやGmail作成中のメッセージにラベルを付与する方法です。ラベルの表示・編集にはラベル自体への権限（view/edit）と、対象ファイルへのアクセス権限の両方が必要です<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>
                    <p>
                        <strong>既定分類（Default classification）</strong>: 管理者がOU・グループ単位で既定のラベルを設定し、ファイルの作成時、または所有者変更時に自動的に適用する方法です<sup><a href="https://support.google.com/a/answer/11280938?hl=en">[50]</a></sup>。既定分類ラベルは、選択リスト（options list）型のフィールドを持つDriveラベルにのみ利用できます<sup><a href="https://support.google.com/a/answer/11280938?hl=en">[50]</a></sup>。
                    </p>
                    <p>
                        <strong>DLPルールによる自動適用</strong>: DLP for Driveの対応エディションであれば、DLPルールの条件に一致したコンテンツに対して自動的にラベルを適用できます。DLPルールはルール条件に一致する新規・既存ファイルの両方にラベルを適用します<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。Gmailについても同様に、DLP for Gmailの対応エディションであれば、条件に一致する新規メッセージにラベルを自動適用できます<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>
                    <p>
                        <strong>AI分類（AI classification）</strong>: プログラミング不要で、Drive内のファイルに自動的にラベルを付与する仕組みです。以下の2種類のモデルから選択できます<sup><a href="https://support.google.com/a/answer/12676216?hl=en">[51]</a></sup>。
                    </p>
                    <ul>
                        <li><strong>カスタムモデル（Custom models）</strong>: 組織独自のトレーニングデータに基づいて構築する専用の機械学習モデル。管理者はモデルが学習するデータを管理し、モデルは組織固有のものになる。トレーニング段階では、指定されたラベラー（designated labelers）がトレーニング用ラベルを使ってサンプルファイルを分類し、そのデータセットをもとにモデルが機密データの分類方法を学習する。最低でも各フィールドオプションにつき100件以上のファイルへのトレーニングラベル付けが必要とされる<sup><a href="https://support.google.com/a/answer/11280938?hl=en">[52]</a></sup></li>
                        <li><strong>Gemini（ベータ）</strong>: Gemini大規模言語モデル（LLM）を使い、ファイルの内容を検査してカスタマイズ可能な平易な言語の指示に基づいて自動的にラベルを適用する方法。カスタムモデルのような事前トレーニング期間を必要としない<sup><a href="https://support.google.com/a/answer/12676216?hl=en">[51]</a></sup></li>
                    </ul>

                    <p>
                        AI分類でラベル付けされるためには、対象ファイルが共有ドライブ内にあるか、分類ラベルをサポートするライセンスを持つユーザーが所有している必要があります<sup><a href="https://support.google.com/a/answer/12676216?hl=en">[51]</a></sup>。AI分類はFrontline PlusおよびEnterprise Plusに含まれるほか、Gemini Enterprise（旧称含む）・Gemini Education Premium・AI Securityの各アドオンでも利用できます<sup><a href="https://support.google.com/a/answer/12676216?hl=en">[51]</a></sup>。
                    </p>
                    <p>
                        複数のラベル付与方法を併用する場合の優先順位にも注意が必要です。AI分類ラベルはDLPが設定したラベルによって上書きされますが、AI分類ラベル自身は既定分類ラベルを上書きします<sup><a href="https://support.google.com/a/answer/11280938?hl=en">[50]</a></sup>。つまり優先順位は「DLPルール ＞ AI分類 ＞ 既定分類」という関係になります。
                    </p>

                    <Diagram id="diag-10" label="分類ラベルの適用方法と優先順位" />

                    <p>ラベルの制限事項も出題されやすいポイントです<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。</p>
                    <ul>
                        <li>組織全体で作成できるラベルは<strong>最大150個</strong></li>
                        <li>Driveの分類ラベルは、ユーザーおよびルールによって付与された数に制限はない</li>
                        <li>Gmailの分類ラベルは、ユーザーおよびルールによって付与された合計が<strong>最大20個</strong>。ユーザーがこれを超えるとGmail上で警告が表示され、ルールによる付与の場合は上位20個のランクされたラベルのみが適用される</li>
                        <li>ラベルおよびフィールドは他システムや他組織からインポートできない。またGoogle Workspace Domain Transferではラベルはサポートされない</li>
                        <li>フィールドを必須（required）に設定できるが、未入力のままでもファイルの使用・共有・編集やメッセージの送信自体はブロックされない。未入力の必須フィールドはユーザーに強調表示される</li>
                    </ul>
                    <p>
                        ラベルの作成には<strong>Manage Labels</strong>権限が必要です。誰がラベルを閲覧できるかは、ラベル作成時に「組織全体（既定）」または「特定のユーザー・グループのみ」として設定します。閲覧権限のないユーザーには、Drive・Gmailのどちらでもそのラベルは表示されません<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup>。
                    </p>

                    <h3 id="353-ベストプラクティス">3.5.3 ベストプラクティス</h3>
                    <ul>
                        <li><strong>優先順位を理解してラベル戦略を設計する</strong>: DLPルールが最優先で適用され、次いでAI分類、最後に既定分類が適用される点を踏まえ、コンプライアンス上重要なラベルはDLPルール経由での付与を検討する<sup><a href="https://support.google.com/a/answer/11280938?hl=en">[50]</a></sup></li>
                        <li><strong>AI分類はトレーニングデータの質を確保してから展開する</strong>: カスタムモデルは各フィールドオプションにつき最低100件以上のラベル付けが推奨されており、トレーニング期間中の運用計画を事前に立てる<sup><a href="https://support.google.com/a/answer/11280938?hl=en">[52]</a></sup></li>
                        <li><strong>DLPと組み合わせて「ラベル→ポリシー適用」のパイプラインを構築する</strong>: ラベル単体では情報の整理にとどまるため、DLPルールの条件としてラベルを利用し、外部共有のブロックや送信制限などの実効的なガバナンスにつなげる<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup></li>
                        <li><strong>Gmailラベルの20個上限を前提にルールの優先順位を設計する</strong>: ルールで多数のラベルが競合する場合、上位20個のみが適用されることを踏まえ、重要なラベルほど優先順位が高くなるようルールを設計する<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup></li>
                        <li><strong>ラベルの可視性を必要最小限に絞る</strong>: 特定のユーザー・グループのみが閲覧・付与できるようスコープを絞ることで、機密性の高い分類体系そのものが誤って広く公開されることを防ぐ<sup><a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin">[49]</a></sup></li>
                    </ul>

                    <hr />

                    <h2 id="section-3-まとめ表">Section 3 まとめ表</h2>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タスク</th>
                                    <th scope="col">中核機能</th>
                                    <th scope="col">主な管理者権限</th>
                                    <th scope="col">該当エディションの目安</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>3.1 Google Vault</td>
                                    <td>保持ルール・holds・検索・エクスポート・監査ログ</td>
                                    <td>Manage Matters／Manage Searches／Manage Exports／Manage Audits</td>
                                    <td>Vaultライセンスを含む・またはアドオンとして購入したエディション</td>
                                </tr>
                                <tr className="even">
                                    <td>3.2 DLP</td>
                                    <td>コンテンツ検出器・データ保護ルール・通知カスタマイズ</td>
                                    <td>View DLP rule ＋ Manage DLP rule</td>
                                    <td>Drive／Gmail／Chat DLP対応エディション、Cloud Identity Premium＋Workspace併用も可</td>
                                </tr>
                                <tr className="odd">
                                    <td>3.3 Drive信頼ルール</td>
                                    <td>許可・ブロックルール、ビジター/未管理アカウント制御</td>
                                    <td>Rules関連の管理者権限</td>
                                    <td>Drive信頼ルール対応エディション</td>
                                </tr>
                                <tr className="even">
                                    <td>3.4 データの保存とエクスポート</td>
                                    <td>Takeout・Data Export Tool・データリージョン・Assured Controls</td>
                                    <td>Service Settings／Billing Management／Data Regions Settings</td>
                                    <td>エディションにより機能範囲が大きく異なる（Fundamental/Enterpriseデータリージョン、Assured Controls等）</td>
                                </tr>
                                <tr className="odd">
                                    <td>3.5 データの分類</td>
                                    <td>手動・既定・DLP・AI分類ラベル</td>
                                    <td>Manage Labels</td>
                                    <td>分類ラベル対応エディション、AI分類はFrontline Plus/Enterprise Plus等</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h2 id="学習チェックリスト">学習チェックリスト</h2>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span>習熟度チェック</span>
                            <span className="checklist-counter" id="checklist-counter">
                                {checkedCount} / {CHECKLIST_ITEMS.length} 完了
                            </span>
                        </div>
                        <ul className="checklist-list">
                            {CHECKLIST_ITEMS.map((itemText, idx) => (
                                <li key={idx} className={checkedItems[idx] ? 'checked' : ''}>
                                    <label>
                                        <button
                                            type="button"
                                            className={`check-box ${checkedItems[idx] ? 'checked' : ''}`}
                                            onClick={() => toggleCheck(idx)}
                                            aria-label={itemText}
                                        />
                                        <span className="checklist-text">{itemText}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr />

                    <h2 id="参考文献">参考文献</h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <h4>公式試験情報</h4>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en" target="_blank" rel="noopener noreferrer">
                                        Associate Google Workspace Administrator Certification
                                    </a>
                                    <span className="ref-desc"> Google Cloud公式認定ページ</span>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">
                                        Associate Google Workspace Administrator Certification exam guide (PDF)
                                    </a>
                                    <span className="ref-desc"> 公式Exam Guide</span>
                                </span>
                            </div>
                        </div>

                        <div className="ref-card">
                            <h4>Google Vault（3.1）</h4>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2462365?hl=en" target="_blank" rel="noopener noreferrer">Vault - Google Vault Help</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/3220205?hl=en" target="_blank" rel="noopener noreferrer">Assign Vault licenses</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2557687?hl=en" target="_blank" rel="noopener noreferrer">Buy Vault licenses for your organization</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2584132?hl=en" target="_blank" rel="noopener noreferrer">Set up Vault for your organization</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/6067442?hl=en" target="_blank" rel="noopener noreferrer">Archive former employee accounts</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/3374023?hl=en" target="_blank" rel="noopener noreferrer">Manage retention rules and holds</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2990828?hl=en" target="_blank" rel="noopener noreferrer">How retention works</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2535539?hl=en" target="_blank" rel="noopener noreferrer">Retain Gmail messages with Vault</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/7657465?hl=en" target="_blank" rel="noopener noreferrer">Retain Drive files with Vault</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/7657342?hl=en" target="_blank" rel="noopener noreferrer">Retain Groups messages with Vault</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/6093005?hl=en" target="_blank" rel="noopener noreferrer">Vault retention FAQ</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/7664657?hl=en" target="_blank" rel="noopener noreferrer">Get started with holds in Google Vault</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/9895152" target="_blank" rel="noopener noreferrer">Review all holds for your organization</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2473458?hl=en" target="_blank" rel="noopener noreferrer">Export data from Vault</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/6161352?hl=en" target="_blank" rel="noopener noreferrer">Get started with Vault search &amp; export</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2462365?hl=en" target="_blank" rel="noopener noreferrer">Vault - Google Vault Help</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2539616?hl=en" target="_blank" rel="noopener noreferrer">Google Vault FAQ</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/2462365" target="_blank" rel="noopener noreferrer">Vault - Google Vault Help</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/13851268?hl=en" target="_blank" rel="noopener noreferrer">Vault log events (Reports &amp; monitoring)</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/vault/answer/4239060?hl=en" target="_blank" rel="noopener noreferrer">Vault log events</a>
                                </span>
                            </div>
                        </div>

                        <div className="ref-card">
                            <h4>データ損失防止 DLP（3.2）</h4>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/11400056?hl=en" target="_blank" rel="noopener noreferrer">Create data protection rules</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/14767988?hl=en" target="_blank" rel="noopener noreferrer">Prevent data leaks in email &amp; attachments (Gmail DLP)</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/10846568?hl=en" target="_blank" rel="noopener noreferrer">Prevent data leaks from Chat messages &amp; attachments</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/9655387?hl=en" target="_blank" rel="noopener noreferrer">Create DLP for Drive rules and custom content detectors</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/9646351?hl=en" target="_blank" rel="noopener noreferrer">About DLP</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/7047475?hl=en" target="_blank" rel="noopener noreferrer">How to use predefined content detectors</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://workspaceupdates.googleblog.com/2024/10/gmail-data-loss-prevention-enforcement-is-now-instantaneous.html" target="_blank" rel="noopener noreferrer">Google Workspace Updates: Data Loss Prevention enforcement in Gmail is now instantaneous</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://workspaceupdates.googleblog.com/2023/12/custom-notifications-for-google-chat-data-loss-prevention-rules-web-mobile.html" target="_blank" rel="noopener noreferrer">Google Workspace Updates: Custom notifications for Google Chat DLP rules are now generally available</a>
                                </span>
                            </div>
                        </div>

                        <div className="ref-card">
                            <h4>Drive信頼ルール（3.3）</h4>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/10621317?hl=en" target="_blank" rel="noopener noreferrer">Create and manage trust rules for Drive sharing</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/10621317?hl=en-" target="_blank" rel="noopener noreferrer">Create and manage trust rules for Drive sharing</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/60781?hl=en" target="_blank" rel="noopener noreferrer">Manage external sharing for your organization</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/7492096" target="_blank" rel="noopener noreferrer">Monitor the health of your Drive settings</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/15201687?hl=en-EN" target="_blank" rel="noopener noreferrer">Help prevent Drive spam and phishing</a>
                                </span>
                            </div>
                        </div>

                        <div className="ref-card">
                            <h4>データの保存とエクスポート（3.4）</h4>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://knowledge.workspace.google.com/admin/users/advanced/allow-or-block-google-takeout" target="_blank" rel="noopener noreferrer">Allow or block Google Takeout</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/7646040?hl=en" target="_blank" rel="noopener noreferrer">Manage access to services that aren&apos;t controlled individually</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/11479893" target="_blank" rel="noopener noreferrer">Takeout log events</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/14338836?hl=en" target="_blank" rel="noopener noreferrer">Choose the Workspace data you want to export</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data" target="_blank" rel="noopener noreferrer">Choose a geographic location for your data</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions" target="_blank" rel="noopener noreferrer">Data covered by data regions</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/14316861?hl=en" target="_blank" rel="noopener noreferrer">View your data regions status reports</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://knowledge.workspace.google.com/admin/security/about-assured-controls-and-assured-controls-plus" target="_blank" rel="noopener noreferrer">About Assured Controls and Assured Controls Plus</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://cloud.google.com/security/compliance/hipaa-compliance" target="_blank" rel="noopener noreferrer">HIPAA - Compliance | Google Cloud</a>
                                </span>
                            </div>
                        </div>

                        <div className="ref-card">
                            <h4>データの分類（3.5）</h4>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://knowledge.workspace.google.com/admin/security/get-started-as-a-classification-labels-admin" target="_blank" rel="noopener noreferrer">Get started as a classification labels admin</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/11280938?hl=en" target="_blank" rel="noopener noreferrer">Apply Default classification labels to new files automatically</a>
                                </span>
                            </div>
                            <div className="ref-row">
                                <span className="ref-icon">↗</span>
                                <span>
                                    <a href="https://support.google.com/a/answer/12676216?hl=en" target="_blank" rel="noopener noreferrer">Label Google Drive files automatically using AI classification</a>
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="ref-note">
                        本ガイドは2026年8月時点でGoogle公式ヘルプセンター・公式Exam Guideから取得した情報を基に作成しています。Google Workspaceの管理コンソールUIや機能仕様は継続的に更新されるため、実際の試験対策・実務運用にあたっては、上記リンク先の最新情報を必ず確認してください。
                    </p>
                </main>
            </div>
        </div>
    );
}
