'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" data-testid="mermaid-diagram">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

const CHECKLIST_ITEMS = [
    {
        id: 'chk1',
        label: 'すべての外部呼び出し（DB・API・キャッシュ・メッセージング）にタイムアウトが設定されているか',
    },
    {
        id: 'chk2',
        label: '依存先ごとにサーキットブレーカーが導入され、状態（Closed/Open/Half-Open）がダッシュボードで見えるか',
    },
    {
        id: 'chk3',
        label: '依存先ごとにスレッドプール／コネクションプールが分離され、1つの依存先の障害が他に波及しないか',
    },
    {
        id: 'chk4',
        label: '過負荷時に一部リクエストを意図的に拒否する仕組み（Shed Load）があるか',
    },
    {
        id: 'chk5',
        label: 'ログローテーション・キャッシュ失効・一時ファイル削除など、定常状態を保つ処理が自動化されているか',
    },
    {
        id: 'chk6',
        label: '障害を意図的に再現するテストハーネスが、少なくとも主要な統合ポイントに対して存在するか',
    },
    {
        id: 'chk7',
        label: 'デプロイ中に新旧バージョンが同時に稼働しても、データの整合性が壊れない設計になっているか（Expand/Contract）',
    },
    {
        id: 'chk8',
        label: '本番相当のデータ量・同時接続数で負荷テストを実施しているか（Unbounded Result Sets対策）',
    },
    {
        id: 'chk9',
        label: 'OWASP Top 10と最小権限の原則に沿ったセキュリティレビューが行われているか',
    },
    {
        id: 'chk10',
        label: '意図的な障害注入（カオスエンジニアリング）を、小さな範囲から段階的に実施する計画があるか',
    },
];

export function ReleaseItGuide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheckbox = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="release-it-page">
            <button
                className="sidebar-toggle"
                id="sidebarToggle"
                type="button"
                aria-label="メニュー"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((prev) => !prev)}
            >
                ☰
            </button>

            <div className="layout">
                <NavBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="main">
                    <div className="hero">
                        <div className="kicker">Michael T. Nygard 著 &middot; Release It!</div>
                        <h1>
                            Release It! 実践ガイド ―
                            本番対応ソフトウェアを設計・デプロイするためのステップバイステップ入門
                        </h1>
                        <div className="meta-row">
                            <span className="pill">
                                対象 <strong>初学者〜中級者</strong>
                            </span>
                            <span className="pill">
                                版 <strong>初版(2007)/第2版(2018)対応</strong>
                            </span>
                            <span className="pill">
                                図解 <strong>Mermaid 14点</strong>
                            </span>
                            <span className="pill">
                                参考文献 <strong>22件</strong>
                            </span>
                        </div>
                    </div>

                    <p>対象読者：バックエンド／インフラ／SREを学び始めたばかりのエンジニア</p>
                    <p>
                        原著：Michael T. Nygard 著
                        <code>Release It!: Design and Deploy Production-Ready Software</code>
                        （Pragmatic Bookshelf）
                    </p>
                    <p>
                        本ガイドは初版（2007年）と第2版（2018年）の両方を参照しながら、初学者が本番運用の勘所を体系的に理解できるように再構成した解説書です。
                    </p>

                    <hr />

                    <h2 id="1-はじめになぜ機能が完成しただけでは足りないのか" tabIndex={-1}>
                        1. はじめに：なぜ「機能が完成した」だけでは足りないのか
                    </h2>

                    <p>
                        多くの設計・アーキテクチャ本は「要件を満たす」「テストに通る」ことをゴールに書かれています。しかし
                        Nygard は、
                        <strong>
                            「機能完成（feature complete）」と「本番対応（production ready）」はまったく別物である
                        </strong>
                        という一点を本書全体を通じて主張します。
                    </p>

                    <p>
                        QAを通過したソフトウェアが本番環境に出たとたんに落ちる理由の多くは、機能不足ではなく、次のような「本番特有の現実」に対する備えがないことにあります。
                    </p>

                    <ul>
                        <li>
                            想定外のトラフィックの急増（Slashdotされる、SNSでバズる、深夜に海外ユーザーが押し寄せる）
                        </li>
                        <li>メンテナンスのために止められない稼働時間要件</li>
                        <li>統合先システムの障害・レイテンシ</li>
                        <li>運用担当者が交代し、開発時の暗黙知が失われた後の長い「余生」</li>
                    </ul>

                    <p>
                        出典：O&apos;Reillyに掲載された概要では、Release
                        1.0がリリースされた後にコンサルタントが去り、主要な開発者が別プロジェクトへ異動し、自由な開発環境が変更管理委員会や障害報告に置き換わっていく現実が描かれています。その後、一般ユーザーがシステムを叩き始めます。
                    </p>

                    <p>
                        本書は、こうした「本番の現実」を生き延びるための、ケーススタディに基づいた実践的なパターン集です。
                    </p>

                    <hr />

                    <h2 id="2-著者と本書の位置づけ" tabIndex={-1}>
                        2. 著者と本書の位置づけ
                    </h2>

                    <p>
                        Michael T. Nygard
                        は15年以上にわたりプログラマー・アーキテクトとして、米国政府や銀行・金融・農業・小売業界向けに稼働システムを提供してきた実務家です。
                        <code>97 Things Every Software Architect Should Know</code>
                        {' '}の共著者でもあります。
                    </p>

                    <p>
                        出典：Pragmatic
                        Bookshelfの公式書籍ページでは、Nygard氏が15年以上プログラマー・アーキテクトとして活動し、米国政府や銀行・金融・農業・小売業界向けにシステムを提供してきた経歴と、技術カンファレンスの人気講演者であることが紹介されています。
                    </p>

                    <p>
                        本書は「アーキテクチャパターン集」でありながら、抽象的な理論書ではなく、
                        <strong>
                            実際の障害事例（ケーススタディ）から出発して、そこから一般化されたアンチパターン／パターンを導く
                        </strong>
                        という構成が最大の特徴です。各部の冒頭には実際に企業に数百万ドル規模の損失を与えた障害の再現ドラマが置かれています。
                    </p>

                    <hr />

                    <h2 id="3-初版と第2版の違い" tabIndex={-1}>
                        3. 初版と第2版の違い
                    </h2>

                    <Diagram
                        id="editionComparison"
                        label="初版と第2版の構成と技術前提の違いを比較したダイアグラム"
                    />

                    <p>
                        出典：第2版の公式ページでは、DevOps・マイクロサービス・クラウドネイティブアーキテクチャの内容が新たに追加され、安定性のアンチパターンが大規模システムにおける構造的な問題も含むよう拡張されたことが明記されています。
                    </p>

                    <p>
                        第2版のレビューでは、Java色の強かった初版から、クラウド／OSS／DevOps実務に軸足を移した内容へと大きく作り替えられたことが評価されています。出典：レビュアーのAdam
                        Hawkins氏は、第2版がクラウドインフラ・OSS・DevOpsの実務に根ざした内容へと移行し、3大クラウドプロバイダーの存在やコンテナの台頭など、この10年間のIT環境の変化を反映していると評価しています。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">初版（2007）</th>
                                    <th scope="col">第2版（2018）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>想定インフラ</td>
                                    <td>オンプレミス・物理サーバー中心</td>
                                    <td>データセンター＋クラウド（物理ホスト／VM／コンテナ）</td>
                                </tr>
                                <tr className="even">
                                    <td>アーキテクチャ前提</td>
                                    <td>モノリシックなJavaアプリケーション</td>
                                    <td>マイクロサービス／分散システム</td>
                                </tr>
                                <tr className="odd">
                                    <td>デプロイ</td>
                                    <td>手動デプロイ、計画停止が前提</td>
                                    <td>自動化デプロイ、継続的デプロイ、ゼロダウンタイムが前提</td>
                                </tr>
                                <tr className="even">
                                    <td>新規追加分野</td>
                                    <td>―</td>
                                    <td>
                                        コントロールプレーン、OWASP Top
                                        10、バージョニング戦略、カオスエンジニアリング
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>安定性アンチパターン数</td>
                                    <td>抜粋（Dogpile・Force Multiplier等を含む一部異なる編成）</td>
                                    <td>12種に整理</td>
                                </tr>
                                <tr className="even">
                                    <td>安定性パターン数</td>
                                    <td>抜粋</td>
                                    <td>12種に整理</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        このガイドは、より現代の実務に近い<strong>第2版の章構成</strong>を軸に解説します。第2版の目次は出版社の書誌情報（ドイツ・イルメナウ工科大学図書館の書誌カタログPDF）で確認できます。出典：第2版は「第1部
                        安定性を作る」「第2部 本番のために設計する」「第3部 システムを届ける」「第4部
                        システミックな問題を解く」という4部構成で、17章＋参考文献＋索引から成ります。
                    </p>

                    <p>
                        なお、ユーザーが参照した{' '}
                        <a href="https://www.oreilly.com/library/view/release-it/9781680500264/">
                            O&apos;Reillyの書誌ページ
                        </a>
                        {' '}は初版（2007年3月・326ページ）のものです。初版は絶版ではなく現在も購読可能ですが、これから読む場合は第2版を推奨する声が実務者の間で多く見られます。
                    </p>

                    <hr />

                    <h2 id="4-本書全体のマップ第2版の4部構成" tabIndex={-1}>
                        4. 本書全体のマップ：第2版の4部構成
                    </h2>

                    <Diagram
                        id="bookStructure"
                        label="第2版の4部構成のマップを示すダイアグラム"
                    />

                    <p>本書の各部は、次のように役割分担されています。</p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">部</th>
                                    <th scope="col">中心テーマ</th>
                                    <th scope="col">主な読者層の関心</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>第1部 安定性を作る</td>
                                    <td>個々のシステムが障害に耐える設計</td>
                                    <td>アプリケーションエンジニア、バックエンド設計者</td>
                                </tr>
                                <tr className="even">
                                    <td>第2部 本番のために設計する</td>
                                    <td>ネットワーク・インフラ・セキュリティ・運用基盤</td>
                                    <td>インフラ／プラットフォームエンジニア</td>
                                </tr>
                                <tr className="odd">
                                    <td>第3部 システムを届ける</td>
                                    <td>デプロイとバージョン管理の安全性</td>
                                    <td>DevOps／リリースエンジニア</td>
                                </tr>
                                <tr className="even">
                                    <td>第4部 システミックな問題を解く</td>
                                    <td>組織・プロセス・カオスエンジニアリング</td>
                                    <td>アーキテクト、EM、SREリーダー</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h2 id="5-第1部安定性を作るcreate-stability" tabIndex={-1}>
                        5. 第1部：安定性を作る（Create Stability）
                    </h2>

                    <h3 id="51-安定性とは何か" tabIndex={-1}>
                        5.1 安定性とは何か
                    </h3>

                    <p>
                        Nygard
                        は「安定性（stability）」を、単に落ちないことではなく、
                        <strong>部分的な障害が発生しても全体としてサービスを提供し続けられる性質</strong>
                        と定義します。ポイントは「クラック（ひび）は必ず発生する」という前提に立つことです。個々の障害を完全に防ぐことはできませんが、
                        <strong>そのひびが他の部分に伝播しないように設計する</strong>
                        ことはできます。
                    </p>

                    <Diagram
                        id="crackPropagation"
                        label="統合ポイントの障害からカスケード障害に至るクラック伝播モデル"
                    />

                    <p>
                        この「クラックの伝播モデル」が、本書全体の設計思想の出発点になります。出典：John氏の読書ノートでは、ブロックされたスレッド（Blocked
                        Threads）アンチパターンがほとんどの障害の直接的な原因であり、連鎖反応（Chain
                        Reactions）とカスケード障害（Cascading Failures）に直結すると整理されています。
                    </p>

                    <h3 id="52-安定性のアンチパターン12種" tabIndex={-1}>
                        5.2 安定性のアンチパターン（12種）
                    </h3>

                    <p>
                        第2版第4章では、実務でよく観測される「安定性を壊すパターン」が12種類、体系的に整理されています。出典：第4章「Stability
                        Antipatterns」は、Integration Points・Chain Reactions・Cascading
                        Failures・Users・Blocked Threads・Self-Denial Attacks・Scaling
                        Effects・Unbalanced Capacities・Dogpile・Force Multiplier・Slow
                        Responses・Unbounded Result Setsの12節から構成されています。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">#</th>
                                    <th scope="col">アンチパターン</th>
                                    <th scope="col">直訳・意味</th>
                                    <th scope="col">典型的な発生原因</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>1</td>
                                    <td>Integration Points（統合ポイント）</td>
                                    <td>他システムとの接続点</td>
                                    <td>すべてのソケット・RPC・REST呼び出しは障害点になり得る</td>
                                </tr>
                                <tr className="even">
                                    <td>2</td>
                                    <td>Chain Reactions（連鎖反応）</td>
                                    <td>障害の連鎖</td>
                                    <td>1台の障害で他ノードの負荷が増し、次々に倒れる</td>
                                </tr>
                                <tr className="odd">
                                    <td>3</td>
                                    <td>Cascading Failures（カスケード障害）</td>
                                    <td>層をまたぐ障害伝播</td>
                                    <td>ある層のクラックが上位・下位の層に飛び火する</td>
                                </tr>
                                <tr className="even">
                                    <td>4</td>
                                    <td>Users（ユーザー）</td>
                                    <td>予測不能な利用パターン</td>
                                    <td>テストでは想定しない使い方を本番ユーザーは必ずする</td>
                                </tr>
                                <tr className="odd">
                                    <td>5</td>
                                    <td>Blocked Threads（ブロックされたスレッド）</td>
                                    <td>永遠に返ってこない待機</td>
                                    <td>デッドロックやプール枯渇でスレッドが戻らない</td>
                                </tr>
                                <tr className="even">
                                    <td>6</td>
                                    <td>Self-Denial Attacks（自己拒否攻撃）</td>
                                    <td>自らを攻撃する設計ミス</td>
                                    <td>一斉メール送信が自らの受信サーバーを飽和させる等</td>
                                </tr>
                                <tr className="odd">
                                    <td>7</td>
                                    <td>Scaling Effects（スケーリング効果）</td>
                                    <td>小規模では見えない欠陥</td>
                                    <td>台数が増えると初めて顕在化するO(n²)通信や設定ミス</td>
                                </tr>
                                <tr className="even">
                                    <td>8</td>
                                    <td>Unbalanced Capacities（アンバランスな容量）</td>
                                    <td>層ごとの処理能力のミスマッチ</td>
                                    <td>Web層だけスケールしDB層が追いつかない</td>
                                </tr>
                                <tr className="odd">
                                    <td>9</td>
                                    <td>Dogpile（ドッグパイル）</td>
                                    <td>同期した一斉負荷</td>
                                    <td>cronジョブが真夜中に一斉起動し瞬間的に過負荷になる</td>
                                </tr>
                                <tr className="even">
                                    <td>10</td>
                                    <td>Force Multiplier（フォースマルチプライヤー）</td>
                                    <td>自動化がミスを増幅する</td>
                                    <td>誤った設定が自動配布で全台へ一瞬で伝播する</td>
                                </tr>
                                <tr className="odd">
                                    <td>11</td>
                                    <td>Slow Responses（遅い応答）</td>
                                    <td>速い失敗より厄介な遅延</td>
                                    <td>応答が遅いだけで呼び出し元のリソースを奪い続ける</td>
                                </tr>
                                <tr className="even">
                                    <td>12</td>
                                    <td>Unbounded Result Sets（無制限の結果セット）</td>
                                    <td>際限のないクエリ結果</td>
                                    <td>テストデータでは問題にならないが本番データ量で破綻する</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        出典：Kevin
                        Sookocheff氏のまとめでは、統合ポイントは「システムを殺す原因ナンバーワン」であり、あらゆるソケット・プロセス・RPC・REST
                        API呼び出しが安定性リスクになるとされています。同氏は速い失敗であれば呼び出し元は取引を処理・再試行・失敗のいずれかを選べる一方、遅い応答は各呼び出し元のリソースを縛り続け、リクエスト処理スレッドが塞がることでカスケード障害を誘発しやすいと説明しています。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    アンチパターンは「なくす」ものではなく「必ず起きる前提で備える」ものと捉える
                                </li>{' '}
                                <li>
                                    特に Integration Points と Blocked Threads
                                    は、他の多くのアンチパターンの引き金になりやすいため優先的に対策する
                                </li>{' '}
                                <li>
                                    本番相当のデータ量・同時接続数でテストしない限り、Unbounded Result
                                    Sets や Scaling Effects は再現できない
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="53-安定性パターン12種" tabIndex={-1}>
                        5.3 安定性パターン（12種）
                    </h3>

                    <p>
                        アンチパターンに対応する形で、第2版第5章では12種類の安定性パターンが解説されます。出典：第5章「Stability
                        Patterns」は、Timeouts・Circuit Breaker・Bulkheads・Steady State・Fail Fast・Let
                        It Crash・Handshaking・Test Harnesses・Decoupling Middleware・Shed Load・Create
                        Back Pressure・Governorの12節です。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">#</th>
                                    <th scope="col">パターン</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">主に防ぐアンチパターン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>1</td>
                                    <td>Timeouts（タイムアウト）</td>
                                    <td>無限待機を許さない</td>
                                    <td>Blocked Threads, Integration Points</td>
                                </tr>
                                <tr className="even">
                                    <td>2</td>
                                    <td>Circuit Breaker（サーキットブレーカー）</td>
                                    <td>失敗が続く呼び出し先を早期に遮断する</td>
                                    <td>Cascading Failures, Slow Responses</td>
                                </tr>
                                <tr className="odd">
                                    <td>3</td>
                                    <td>Bulkheads（バルクヘッド）</td>
                                    <td>リソースを区画化し影響範囲を限定する</td>
                                    <td>Chain Reactions, Cascading Failures</td>
                                </tr>
                                <tr className="even">
                                    <td>4</td>
                                    <td>Steady State（定常状態）</td>
                                    <td>手動介入なしで自己維持できる状態を保つ</td>
                                    <td>運用負債の蓄積全般</td>
                                </tr>
                                <tr className="odd">
                                    <td>5</td>
                                    <td>Fail Fast（フェイルファスト）</td>
                                    <td>問題を早期に検出し即座に失敗させる</td>
                                    <td>Slow Responses, Blocked Threads</td>
                                </tr>
                                <tr className="even">
                                    <td>6</td>
                                    <td>Let It Crash（クラッシュさせる）</td>
                                    <td>復旧困難な部分は潔く再起動する</td>
                                    <td>Blocked Threads</td>
                                </tr>
                                <tr className="odd">
                                    <td>7</td>
                                    <td>Handshaking（ハンドシェイク）</td>
                                    <td>呼び出し前に相手の余力を確認する</td>
                                    <td>Self-Denial Attacks, Unbalanced Capacities</td>
                                </tr>
                                <tr className="even">
                                    <td>8</td>
                                    <td>Test Harnesses（テストハーネス）</td>
                                    <td>統合ポイントの障害を意図的に再現してテストする</td>
                                    <td>Integration Points</td>
                                </tr>
                                <tr className="odd">
                                    <td>9</td>
                                    <td>Decoupling Middleware（デカップリングミドルウェア）</td>
                                    <td>呼び出し元と先を時間・空間的に分離する</td>
                                    <td>Integration Points, Chain Reactions</td>
                                </tr>
                                <tr className="even">
                                    <td>10</td>
                                    <td>Shed Load（負荷を捨てる）</td>
                                    <td>過負荷前に一部リクエストを意図的に拒否する</td>
                                    <td>Self-Denial Attacks, Unbalanced Capacities</td>
                                </tr>
                                <tr className="odd">
                                    <td>11</td>
                                    <td>Create Back Pressure（バックプレッシャー）</td>
                                    <td>「減速せよ」のシグナルを上流に伝播させる</td>
                                    <td>Dogpile, Unbalanced Capacities</td>
                                </tr>
                                <tr className="even">
                                    <td>12</td>
                                    <td>Governor（ガバナー）</td>
                                    <td>危険な自動処理の速度を人間の対応速度まで抑える</td>
                                    <td>Force Multiplier</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>サーキットブレーカー（Circuit Breaker）</h4>

                    <p>
                        Nygard が提唱したこのパターンは、後に Martin Fowler
                        が広めたことで業界標準の語彙になりました。出典：Martin
                        Fowler氏は自身のbliki記事で、リモート呼び出しは失敗したりタイムアウトまでハングしたりする可能性があり、応答のない呼び出し先に多数の呼び出し元が集中するとカスケード障害につながりかねないと述べ、これを防ぐためにNygard氏が著書『Release
                        It』でサーキットブレーカーパターンを広めたと説明しています。
                    </p>

                    <Diagram
                        id="circuitBreakerState"
                        label="サーキットブレーカーの3状態（Closed/Open/HalfOpen）遷移ダイアグラム"
                    />

                    <p>
                        Netflix は2011年に開発した Hystrix
                        ライブラリでこのパターンを大規模に実装し、1日あたり数百億件のリクエストをスレッド分離・セマフォ分離で保護していました。出典：Netflix
                        HystrixのGitHub Wikiによれば、Netflix
                        APIシステムでは100種類以上のHystrixコマンド、40以上のスレッドプールが稼働し、1日あたり100億件以上のスレッド分離実行と2000億件以上のセマフォ分離実行を処理していたと記録されています。Hystrixは2018年にメンテナンスモードに入り、現在はJVM／Springエコシステムでは
                        Resilience4j
                        が事実上の標準として使われています。出典：Resilience4jに関する解説記事では、Hystrixが2018年にメンテナンスモードへ移行した後、Resilience4jがデファクトスタンダードとして台頭したことが述べられています。
                    </p>

                    <h4>バルクヘッド（Bulkheads）</h4>

                    <p>
                        船体を隔壁（バルクヘッド）で区切ることで浸水が一箇所にとどまるようにする、という船舶工学のメタファーがそのまま流用されたパターンです。出典：Wikipediaの解説では、船体が水密区画に分割され一区画の破損が船全体を沈めないようにする発想と同様に、Nygard氏はソフトウェアシステムもリソースを区画化し、一部の障害がシステム全体を消耗させないようにすべきだと論じたとされています。
                    </p>

                    <Diagram
                        id="bulkheadsArchitecture"
                        label="スレッドプールを分離してサービス間の障害波及を防ぐバルクヘッド構造"
                    />

                    <p>
                        <code>Building Microservices</code> の著者 Sam Newman
                        も、バルクヘッドを「3つのパターンの中で最も重要」と位置づけ、マイクロサービスへの分割自体がバルクヘッドの一形態になり得ると述べています。出典：Sam
                        Newman氏は、機能を個別のマイクロサービスへ分割すること自体が、ある領域の障害が別の領域に影響を与える可能性を減らすバルクヘッドの実装方法になり得ると述べ、タイムアウトとサーキットブレーカーがリソースの逼迫を解消するのに対し、バルクヘッドはそもそもリソースが逼迫しないようにする点で3パターンの中で最も重要だと位置づけています。
                    </p>

                    <h4>タイムアウト・サーキットブレーカー・バルクヘッドの連携</h4>

                    <p>この3つは単体で使うのではなく、多層防御として組み合わせるのが定石です。</p>

                    <Diagram
                        id="resilienceDefenseInDepth"
                        label="タイムアウト・サーキットブレーカー・バルクヘッドを多層防御として組み合わせた連携フロー"
                    />

                    <p>
                        出典：Release
                        Itのサマリーでは、サーキットブレーカーは失敗回数が閾値を超えると発火して以降の呼び出しをブロックし、一定時間後に少数のリクエストを再試行して成功すれば通常状態に戻るとされ、タイムアウトが問題を検知しサーキットブレーカーが過度な再試行を防ぐという役割分担で併用すべきだと説明されています。
                    </p>

                    <h4>Fail Fast と Let It Crash の使い分け</h4>

                    <Diagram
                        id="failFastVsLetItCrash"
                        label="Fail Fast と Let It Crash の使い分け判断フローチャート"
                    />

                    <p>
                        <code>Let It Crash</code>
                        {' '}はErlang由来の思想で、「壊れたコンポーネント内部の状態を無理に修復しようとするより、まっさらな状態から作り直す方が結果的に安全」という考え方です。出典：GitHub上のサンプル実装の説明では、Erlangの世界でこれは「let
                        it
                        crash」哲学と呼ばれ、コンポーネントレベルの安定性をあきらめてシステムレベルの安定性を優先する発想だと紹介されています。コンテナオーケストレーション全盛の現代では、Kubernetesのヘルスチェック＋自動再起動がこの思想をそのまま体現していると理解すると分かりやすいでしょう。
                    </p>

                    <h4>負荷制御の連鎖：Steady State → Shed Load → Back Pressure → Governor</h4>

                    <Diagram
                        id="loadControlChain"
                        label="Steady StateからGovernorに至る負荷制御の連鎖ダイアグラム"
                    />

                    <p>
                        この4つは「システムが限界に近づいたときにどう振る舞うか」という一貫したテーマでつながっています。特に
                        Governor
                        は、自動化そのものは肯定しつつ、暴走したときの被害を抑えるための速度制限という位置づけで、後述する
                        Force Multiplier
                        アンチパターン（自動化がミスを一瞬で増幅する）への直接的な対策になります。
                    </p>

                    <hr />

                    <h2 id="6-第2部本番のために設計するdesign-for-production" tabIndex={-1}>
                        6. 第2部：本番のために設計する（Design for Production）
                    </h2>

                    <p>
                        第2部は、個々のアプリケーションの安定性設計から視点を引き上げ、
                        <strong>インフラ・ネットワーク・運用基盤全体をどう設計するか</strong>
                        を扱います。出典：第2部「Design
                        for Production」は、Foundations（基盤）、Processes on
                        Machines（マシン上のプロセス）、Interconnect（相互接続）、Control
                        Plane（コントロールプレーン）、Security（セキュリティ）の各章から構成されています。
                    </p>

                    <Diagram
                        id="designForProduction"
                        label="本番のためのインフラ・ネットワーク・運用基盤設計の全体像"
                    />

                    <h3 id="61-foundations基盤" tabIndex={-1}>
                        6.1 Foundations（基盤）
                    </h3>

                    <p>
                        データセンターとクラウドの双方のネットワーキングを扱い、物理ホスト・仮想マシン・コンテナという3つの実行単位の違いを解説する章です。抽象化のレイヤーが上がるほど起動は速くなりますが、その分「何が実際に動いているか」の可視性は下がるというトレードオフが強調されます。
                    </p>

                    <h3 id="62-processes-on-machinesマシン上のプロセス" tabIndex={-1}>
                        6.2 Processes on Machines（マシン上のプロセス）
                    </h3>

                    <p>
                        1台のマシンで動くプロセスに関わる3要素、<strong>コード・設定・透明性</strong>
                        を扱います。設定ファイルの管理方法が悪いと、それ自体が「Unbalanced
                        Capacities」や「Force
                        Multiplier」の温床になります。ここでいう透明性（Transparency）は次の第4部で詳しく扱われる概念の先取りで、「今このプロセスが何をしているか外から分かるか」という問いです。
                    </p>

                    <h3 id="63-interconnect相互接続" tabIndex={-1}>
                        6.3 Interconnect（相互接続）
                    </h3>

                    <p>
                        DNS、ロードバランシング、需要制御（Demand
                        Control）、ネットワークルーティング、サービスディスカバリ、そして初版から引き継がれた「移動可能な仮想IPアドレス（Migratory
                        VIP）」が扱われます。出典：第9章「Interconnect」は、Solutions at Different
                        Scales・DNS・Load Balancing・Demand Control・Network Routing・Discovering
                        Services・Migratory Virtual IP Addressesの各節から構成されています。
                    </p>

                    <p>
                        サービスディスカバリは初版執筆時点（2007年）にはほぼ存在しなかった概念で、第2版で大きく拡張された部分の一つです。Netflixが2012年に自社のサービスレジストリ
                        Eureka
                        をオープンソース化したのも同時期の潮流でした。出典：InfoQのアーカイブでは、Netflixが2012年頃、AWSリージョン内でミドル層サービスを検索するためのRESTfulサービスであるEurekaをオープンソース化したと報じられています。
                    </p>

                    <h3 id="64-control-planeコントロールプレーン" tabIndex={-1}>
                        6.4 Control Plane（コントロールプレーン）
                    </h3>

                    <p>
                        「どこまで自動化すべきか」「自動化がもたらすレバレッジ（mechanical
                        advantage）をどう活かすか」「開発環境も本番の一部である（Development Is
                        Production）」という思想、システム全体の透明性、構成管理サービス、プロビジョニング・デプロイサービス、そしてコマンド＆コントロールという運用の中枢機能が扱われます。
                    </p>

                    <Diagram
                        id="controlPlaneComponents"
                        label="コントロールプレーンを構成する4つの主要サービス"
                    />

                    <p>
                        「Development Is
                        Production（開発環境も本番の一部）」という考え方は、開発者のローカル環境や検証環境の構成ドリフトそのものが、本番のインシデントの温床になりうるという教訓を端的に表しています。
                    </p>

                    <h3 id="65-securityセキュリティ" tabIndex={-1}>
                        6.5 Security（セキュリティ）
                    </h3>

                    <p>
                        第2版で最も大きく拡張された章の一つで、OWASP Top 10
                        が丸ごと組み込まれています。加えて、初版から引き継がれた「最小権限の原則（Principle
                        of Least Privilege）」と「設定されたパスワード（Configured
                        Passwords）」も扱われます。出典：第11章「Security」は、The OWASP Top 10、The
                        Principle of Least Privilege、Configured Passwords、Security as an Ongoing
                        Processの各節から構成されています。
                    </p>

                    <p>
                        セキュリティを「一度作って終わり」ではなく継続的なプロセス（Security as an
                        Ongoing
                        Process）として位置づけている点は、後述するカオスエンジニアリングの思想とも通じるものがあります。
                    </p>

                    <hr />

                    <h2 id="7-第3部システムを届けるdeliver-your-system" tabIndex={-1}>
                        7. 第3部：システムを届ける（Deliver Your System）
                    </h2>

                    <p>
                        出典：第3部「Deliver Your System」は、ケーススタディ「Waiting for
                        Godot」に続き、第13章「Design for Deployment」、第14章「Handling
                        Versions」で構成されています。
                    </p>

                    <h3 id="71-デプロイのために設計するdesign-for-deployment" tabIndex={-1}>
                        7.1 デプロイのために設計する（Design for Deployment）
                    </h3>

                    <p>
                        この章の核心的な主張は、「
                        <strong>計画停止（planned downtime）という考え方自体が誤り</strong>
                        」というものです。出典：第13章では、So Many Machines・The Fallacy of Planned
                        Downtime・Automated Deployments・Continuous Deployment・Phases of
                        Deploymentという構成で、ゼロダウンタイムデプロイの実現方法が論じられています。
                    </p>

                    <p>
                        データベーススキーマの変更を安全にゼロダウンタイムで行うための考え方として、後に「Expand/Contract」パターンと呼ばれるようになった手法の源流がここにあります。出典：tim-wellhausen氏の論文は、Nygard氏の『Release
                        It!』第7章「ゼロダウンタイムデプロイメント」（O&apos;Reilly、2007年）を明示的な出典として挙げ、既存アプリケーションが旧コードのまま動作している期間もデータの整合性を保つ必要があるという制約を論じています。
                    </p>

                    <Diagram
                        id="expandContractSchema"
                        label="ゼロダウンタイムスキーマ変更のためのExpand/Migrate/Contractパターン"
                    />

                    <p>
                        Expand/Migrate/Contractは<strong>データベーススキーマ変更</strong>
                        の手順です。Expandでは後方互換性を保つ形で新しいスキーマ要素を追加のみで導入し、Migrateでは旧コードと新コードを共存させながらデータを段階的に移行し、移行完了を確認したうえでContractにより旧スキーマ要素を削除します。
                    </p>

                    <p>
                        一方、ブルーグリーンデプロイやカナリアリリースは<strong>アプリケーション（コード）の展開戦略</strong>
                        であり、新バージョンへのトラフィック切り替えを段階的かつ切り戻し可能にする補助的な手法です。これらの展開戦略はスキーマの互換性やデータ移行の完了を自動的に保証しません。ロールバックしうる展開を安全に行うには、その時点のスキーマが新旧どちらのコードとも互換であること（＝Contractをまだ実行していないこと）が前提になります。
                    </p>

                    <Diagram
                        id="deploymentPhases"
                        label="自動化からゼロダウンタイム達成に至るデプロイフェーズの進化"
                    />

                    <h3 id="72-バージョン管理handling-versions" tabIndex={-1}>
                        7.2 バージョン管理（Handling Versions）
                    </h3>

                    <p>
                        出典：第14章「Handling Versions」は、Help Others Handle Your
                        Versions（自分のバージョンを他者が扱えるようにする）とHandle Others&apos;
                        Versions（他者のバージョンを扱う）の2節から構成されています。
                    </p>

                    <p>
                        これは分散システムにおける互換性設計の話で、「送信するデータは厳格に、受信するデータには寛容に」というPostelの法則（堅牢性原則）に通じる考え方です。API・メッセージフォーマット・プロトコルのバージョンをまたいだ後方互換性・前方互換性の設計が、ゼロダウンタイムデプロイの前提条件になります。
                    </p>

                    <hr />

                    <h2 id="8-第4部システミックな問題を解くsolve-systemic-problems" tabIndex={-1}>
                        8. 第4部：システミックな問題を解く（Solve Systemic Problems）
                    </h2>

                    <p>
                        出典：第4部「Solve Systemic Problems」は、ケーススタディ「Trampled by Your Own
                        Customers」に続き、第16章「Adaptation」、第17章「Chaos
                        Engineering」で構成されています。
                    </p>

                    <h3 id="81-適応adaptation" tabIndex={-1}>
                        8.1 適応（Adaptation）
                    </h3>

                    <p>
                        この章は「変化は避けられないが生存は保証されない」という一文から始まります。出典：Educative社の解説コースでは、この章が「変化は保証されているが、生存は保証されていない」という一文から始まり、努力が逓増的な利益を生む『凸型リターン（Convex
                        Returns）』の概念を中心に、変化への適応がソフトウェア開発にどう影響するかを扱っていると紹介されています。
                    </p>

                    <p>
                        出典：第16章は、Convex Returns・Process and Organization・System
                        Architecture・Information Architectureの各節から構成されています。
                    </p>

                    <p>
                        「凸型リターン」という発想は、Nassim Nicholas Taleb
                        の「反脆弱性（Antifragility）」の議論とも重なります。出典：Taleb氏の議論では、フラジャイル（脆弱）とアンチフラジャイル（反脆弱）の違いは、変動に対する非線形かつ非対称な応答の凹凸（concave/convex）として表現されると説明されています。ソフトウェアの世界に置き換えると、「変化のコストが逓減していく（＝変化への投資が後になるほど報われやすい）設計・組織・プロセスを選ぶ」という実務的な指針になります。
                    </p>

                    <h3 id="82-カオスエンジニアリングchaos-engineering" tabIndex={-1}>
                        8.2 カオスエンジニアリング（Chaos Engineering）
                    </h3>

                    <p>
                        第2版で完全に新設された章です。出典：第17章「Chaos Engineering」は、Breaking
                        Things to Make Them Better・Antecedents of Chaos Engineering・The Simian
                        Army・Adopting Your Own Monkey・Disaster Simulationsの各節から構成されています。
                    </p>

                    <Diagram
                        id="chaosEngineeringEvolution"
                        label="免疫系の比喩からゲームデイ演習に至るカオスエンジニアリングの発展経緯"
                    />

                    <p>
                        Netflixのカオスエンジニアリングの源流である「Chaos
                        Monkey」は、意図的にサーバーをランダムに落とすことでシステムの回復力を検証するツールとして知られています。出典：InfoQのアーカイブでは、Netflixがクラウド環境の回復力をテストするために、話題になっていた「Chaos
                        Monkey」ツールをオープンソース化したと報じられています。本書では、これを単なる「一発ネタ」ではなく、
                        <strong>運用チームが自分たちの障害への備えを継続的に検証する規律</strong>
                        として位置づけている点が重要です。
                    </p>

                    <hr />

                    <h2 id="9-現代の実務にどう活かすかパターン対応表" tabIndex={-1}>
                        9. 現代の実務にどう活かすか：パターン対応表
                    </h2>

                    <p>
                        本書の初版刊行から約20年が経ち、当時「自作するしかなかった」パターンの多くは、今日ではライブラリやプラットフォーム機能として提供されています。本ガイドの狙いは「車輪の再発明」を避け、
                        <strong>本書のパターンをどのツールで実現するか</strong>を知ることです。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">本書のパターン</th>
                                    <th scope="col">現代の代表的な実現手段</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Circuit Breaker</td>
                                    <td>
                                        Resilience4j（Java/Spring）、Polly（.NET）、Istio / Envoy
                                        のOutlier Detection（サービスメッシュ）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Bulkheads</td>
                                    <td>
                                        Kubernetesのリソースリクエスト/リミット、スレッドプール分離、専用ノードプール
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Timeouts</td>
                                    <td>
                                        gRPC/HTTPクライアントのデッドライン設定、サービスメッシュのタイムアウトポリシー
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Decoupling Middleware</td>
                                    <td>Apache Kafka、Amazon SQS/SNS、RabbitMQ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Shed Load / Create Back Pressure</td>
                                    <td>
                                        ロードバランサーのレート制限、リアクティブストリームのバックプレッシャー機構
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Let It Crash</td>
                                    <td>
                                        Kubernetesのヘルスチェック＋Pod自動再起動、Supervisor/PM2
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Handshaking</td>
                                    <td>
                                        gRPCヘルスチェックプロトコル、サービスメッシュのヘルスプロービング
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Governor</td>
                                    <td>
                                        デプロイのカナリア速度制限、フィーチャーフラグの段階的ロールアウト
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Expand/Migrate/Contract（スキーマ変更）</td>
                                    <td>
                                        後方互換なDBスキーママイグレーション（Flyway、Liquibase、Rails
                                        migration の多段適用）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ゼロダウンタイムのアプリデプロイ</td>
                                    <td>
                                        ブルーグリーンデプロイ、カナリアリリース、ローリングアップデート
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Chaos Engineering</td>
                                    <td>
                                        Netflix Chaos Monkey/Simian Army、Gremlin、AWS Fault Injection
                                        Service
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        出典：Wikipediaのバルクヘッドパターンの解説では、MicrosoftがAzureのコアクラウドデザインパターンの一つとしてこれを文書化し、AWSも独自のレジリエンスガイダンスに組み込んだこと、Hystrixが2018年にメンテナンスモードに入った後、JVM向けのResilience4jや.NET向けのPollyがスレッドプール／セマフォ両方の分離戦略を引き継いだことが述べられています。
                    </p>

                    <p>
                        サーキットブレーカーはAWSの公式ガイダンスでも、Nygard
                        の著書を出典として明記した上でモダナイゼーションパターンの一つとして紹介されています。出典：AWS
                        Prescriptive Guidanceでは、サーキットブレーカーパターンはNygard氏の著書『Release
                        It』で広められたもので、呼び出し先サービスが繰り返しタイムアウトや失敗を起こした後の再試行を防ぎ、呼び出し先サービスが復旧したことを検知できるようにするものだと説明されています。
                    </p>

                    <hr />

                    <h2 id="10-ステップバイステップ実践チェックリスト" tabIndex={-1}>
                        10. ステップバイステップ実践チェックリスト
                    </h2>

                    <p>
                        自分が担当するシステムに本書のエッセンスを適用する際は、次の順番で進めると迷いにくくなります。
                    </p>

                    <Diagram
                        id="practicalChecklistFlow"
                        label="システムへ本書の知見を適用するための5段階実践フローチャート"
                    />

                    <p>実践時のチェックリスト：</p>

                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">実践チェックリスト</span>
                            <span className="count">
                                {checkedCount} / {CHECKLIST_ITEMS.length} 完了
                            </span>
                        </div>
                        <ul>
                            {CHECKLIST_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <input
                                        id={item.id}
                                        type="checkbox"
                                        checked={Boolean(checkedItems[item.id])}
                                        onChange={() => toggleCheckbox(item.id)}
                                    />
                                    <label htmlFor={item.id}>{item.label}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr />

                    <h2 id="11-よくある誤解faq" tabIndex={-1}>
                        11. よくある誤解・FAQ
                    </h2>

                    <p>
                        <strong>Q. サーキットブレーカーとタイムアウトは同じものですか？</strong>
                        <br />
                        {' '}A.
                        異なります。タイムアウトは「1回の呼び出しをいつ諦めるか」を決めるものであり、サーキットブレーカーは「失敗が続く呼び出し先への呼び出しそのものを、一定期間まとめて止めるか」を決めるものです。タイムアウトが個々の症状を検知し、サーキットブレーカーが再発防止のために回路を開く、という役割分担になります。
                    </p>

                    <p>
                        <strong>
                            Q. Let It Crash
                            は「エラーハンドリングを放棄する」ということですか？
                        </strong>
                        <br />
                        {' '}A. いいえ。Let It Crash
                        は「回復不能な内部状態を無理に修復しようとするより、コンポーネント単位で作り直した方が安全な場合がある」という限定的な指針です。すべてのエラーハンドリングを省略してよいという意味ではなく、どのレベルで復旧を試みるかの設計判断を促すパターンです。
                    </p>

                    <p>
                        <strong>Q. 初版と第2版、どちらを読むべきですか？</strong>
                        <br />
                        {' '}A.
                        これから読む場合は、クラウドネイティブ／マイクロサービス／カオスエンジニアリングまでカバーする第2版（2018年）を推奨します。読者レビューでも、初版で指摘されていた「Java色が強すぎる」という弱点が第2版で大きく改善されたと評価されています。出典：Goodreadsのレビューでは、第2版は初版に寄せられていた『内容が古い』という批判の多くを解消し、現代のDevOpsムーブメントやマイクロサービス、モダンな技術を取り込んでいると評価されています。
                    </p>

                    <p>
                        <strong>
                            Q.
                            マイクロサービスを使っていない（モノリシックな）システムにも本書は役立ちますか？
                        </strong>
                        <br />
                        {' '}A.
                        役立ちます。本書のアンチパターン／パターンの多くは、モノリシックなアプリケーションが外部のDB・キャッシュ・決済API・メール送信サービスなどと通信する時点ですでに当てはまります。統合ポイントが1つでも存在すれば、Circuit
                        BreakerやTimeoutsの価値は失われません。
                    </p>

                    <hr />

                    <h2 id="12-まとめ" tabIndex={-1}>
                        12. まとめ
                    </h2>

                    <p>
                        <code>Release It!</code>
                        {' '}が20年近く読み継がれている理由は、パターン名そのものよりも、
                        <strong>
                            「本番環境は開発環境と本質的に異なる、敵対的な環境である」という現実を直視する姿勢
                        </strong>
                        にあります。
                    </p>

                    <ul>
                        <li>
                            安定性は「障害をゼロにする」ことではなく、「クラックを伝播させない」ことで作られる
                        </li>
                        <li>
                            タイムアウト・サーキットブレーカー・バルクヘッドは単体ではなく、多層防御として組み合わせる
                        </li>
                        <li>
                            インフラ・ネットワーク・セキュリティ・コントロールプレーンは、アプリケーションの安定性と地続きの設計対象である
                        </li>
                        <li>
                            デプロイは「止めて安全に行う」ものではなく、「止めずに安全に行える」ように設計するものである
                        </li>
                        <li>
                            組織やプロセスも、変化に対して凸型リターンを得られるように適応し続ける必要がある
                        </li>
                        <li>カオスエンジニアリングは、備えを継続的に検証するための規律である</li>
                    </ul>

                    <p>
                        本書で提唱されたサーキットブレーカーやバルクヘッドといった語彙は、Martin
                        Fowler
                        の解説記事やNetflixのHystrix、そして現在のAWS・Azureの公式クラウド設計パターン集にまで浸透し、今日の分散システム設計の共通言語になっています。
                    </p>

                    <hr />

                    <h2 id="13-参考文献" tabIndex={-1}>
                        13. 参考文献
                    </h2>

                    <div className="ref-grid" id="referenceGrid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                Michael T. Nygard, <em>Release It!</em> —
                                O&apos;Reilly掲載ページ（初版・ユーザー参照元）:
                                <a href="https://www.oreilly.com/library/view/release-it/9781680500264/">
                                    https://www.oreilly.com/library/view/release-it/9781680500264/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                Michael T. Nygard, <em>Release It!, 2nd Edition</em> —
                                O&apos;Reilly掲載ページ:
                                <a href="https://www.oreilly.com/library/view/release-it-2nd/9781680504552/">
                                    https://www.oreilly.com/library/view/release-it-2nd/9781680504552/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref3">
                            <div className="num">3</div>
                            <div className="txt">
                                <em>Release It! Second Edition</em> — 出版社（Pragmatic
                                Bookshelf）公式ページ:
                                <a href="https://pragprog.com/titles/mnee2/release-it-second-edition/">
                                    https://pragprog.com/titles/mnee2/release-it-second-edition/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                <em>Release It! Second Edition</em> 全目次PDF —
                                イルメナウ工科大学図書館書誌カタログ（GBV）:
                                <a href="https://www.gbv.de/dms/ilmenau/toc/898405874.PDF">
                                    https://www.gbv.de/dms/ilmenau/toc/898405874.PDF
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref5">
                            <div className="num">5</div>
                            <div className="txt">
                                Martin Fowler, &quot;CircuitBreaker&quot; (bliki):
                                <a href="https://martinfowler.com/bliki/CircuitBreaker.html">
                                    https://martinfowler.com/bliki/CircuitBreaker.html
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref6">
                            <div className="num">6</div>
                            <div className="txt">
                                Wikipedia, &quot;Bulkhead pattern&quot;:
                                <a href="https://en.wikipedia.org/wiki/Bulkhead_pattern">
                                    https://en.wikipedia.org/wiki/Bulkhead_pattern
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref7">
                            <div className="num">7</div>
                            <div className="txt">
                                AWS Prescriptive Guidance, &quot;Circuit breaker pattern&quot;:
                                <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html">
                                    https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref8">
                            <div className="num">8</div>
                            <div className="txt">
                                Netflix/Hystrix Wiki, &quot;Operations&quot;:
                                <a href="https://github.com/Netflix/Hystrix/wiki/Operations">
                                    https://github.com/Netflix/Hystrix/wiki/Operations
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref9">
                            <div className="num">9</div>
                            <div className="txt">
                                InfoQ, &quot;Netflix Hystrix - Latency and Fault Tolerance for
                                Complex Distributed Systems&quot;:
                                <a href="https://www.infoq.com/news/2012/12/netflix-hystrix-fault-tolerance">
                                    https://www.infoq.com/news/2012/12/netflix-hystrix-fault-tolerance
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref10">
                            <div className="num">10</div>
                            <div className="txt">
                                InfoQ, &quot;Netflix Content on InfoQ&quot;（Eureka/Chaos
                                Monkeyのオープンソース化の記録）:
                                <a href="https://www.infoq.com/Netflix/news/73">
                                    https://www.infoq.com/Netflix/news/73
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref11">
                            <div className="num">11</div>
                            <div className="txt">
                                InnoQ, &quot;Widerstandsfähigen Java-Code mit Resilience4j
                                schreiben&quot;（ドイツの著名テック企業InnoQのブログ）:
                                <a href="https://www.innoq.com/de/blog/2021/09/java-circuit-breaker-resilience4j/">
                                    https://www.innoq.com/de/blog/2021/09/java-circuit-breaker-resilience4j/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref12">
                            <div className="num">12</div>
                            <div className="txt">
                                Adam Hawkins, &quot;Book Review: Release It! (2nd Edition)&quot;:
                                <a href="https://medium.com/slashdeploy/book-review-release-it-2nd-edition-47eed59ac3e0">
                                    https://medium.com/slashdeploy/book-review-release-it-2nd-edition-47eed59ac3e0
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref13">
                            <div className="num">13</div>
                            <div className="txt">
                                Kevin Sookocheff, &quot;Stability Anti-Patterns&quot;:
                                <a href="https://sookocheff.com/post/architecture/stability-antipatterns/">
                                    https://sookocheff.com/post/architecture/stability-antipatterns/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref14">
                            <div className="num">14</div>
                            <div className="txt">
                                &quot;Notes, Quotes, and Thoughts from Release It&quot;:
                                <a href="https://john.dev/posts/2019-04-14-release-it-notes.html">
                                    https://john.dev/posts/2019-04-14-release-it-notes.html
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref15">
                            <div className="num">15</div>
                            <div className="txt">
                                Tim Wellhausen, &quot;Expand and Contract - A Pattern to Apply
                                Breaking Changes to Persistent Data with Zero
                                Downtime&quot;（Release It!第7章を出典として明記）:
                                <a href="https://www.tim-wellhausen.de/papers/ExpandAndContract/ExpandAndContract.html">
                                    https://www.tim-wellhausen.de/papers/ExpandAndContract/ExpandAndContract.html
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref16">
                            <div className="num">16</div>
                            <div className="txt">
                                Goodreads, <em>Release It!</em> 読者レビュー:
                                <a href="https://www.goodreads.com/book/show/34695798-release-it">
                                    https://www.goodreads.com/book/show/34695798-release-it
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref17">
                            <div className="num">17</div>
                            <div className="txt">
                                Sam Newman, <em>Building Microservices</em>{' '}
                                読書ノート（バルクヘッドに関する引用箇所）:
                                <a href="https://www.goodreads.com/notes/24836465-building-microservices/30487097-jhony-rivero?page=4">
                                    https://www.goodreads.com/notes/24836465-building-microservices/30487097-jhony-rivero?page=4
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref18">
                            <div className="num">18</div>
                            <div className="txt">
                                Educative, &quot;Convex Returns&quot;（第16章の解説コース）:
                                <a href="https://educative.io/courses/distributed-systems-real-world/convex-returns">
                                    https://educative.io/courses/distributed-systems-real-world/convex-returns
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref19">
                            <div className="num">19</div>
                            <div className="txt">
                                &quot;Circuit Breaker and Resilience4j Practical Implementation
                                Guide&quot;（Resilience4jの普及に関する解説記事）:
                                <a href="https://www.youngju.dev/blog/architecture/2026-03-06-architecture-circuit-breaker-resilience4j-patterns.en">
                                    https://www.youngju.dev/blog/architecture/2026-03-06-architecture-circuit-breaker-resilience4j-patterns.en
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref20">
                            <div className="num">20</div>
                            <div className="txt">
                                &quot;Release It - Summary and Review&quot;:
                                <a href="https://koerbitz.me/posts/Release-It-Summary-And-Review.html">
                                    https://koerbitz.me/posts/Release-It-Summary-And-Review.html
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref21">
                            <div className="num">21</div>
                            <div className="txt">
                                kaiosilveira, &quot;nodejs-let-it-crash&quot;（Let It
                                Crashパターンの実装例）:
                                <a href="https://github.com/kaiosilveira/nodejs-let-it-crash">
                                    https://github.com/kaiosilveira/nodejs-let-it-crash
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref22">
                            <div className="num">22</div>
                            <div className="txt">
                                Nassim Nicholas Taleb, &quot;Concave, Convex, and Nonlinear
                                Fragility&quot;（凸型リターン/反脆弱性の背景）:
                                <a href="https://stoicagilist.substack.com/p/concave-convex-and-nonlinear-fragility">
                                    https://stoicagilist.substack.com/p/concave-convex-and-nonlinear-fragility
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <p>
                        <em>
                            本ガイドは上記の一次情報源（出版社公式ページ、書誌カタログ、著者本人が言及されている技術記事、Martin
                            Fowler氏やAWS公式ドキュメントなど国際的に著名な情報源）に基づいて2026年8月24日時点の情報を要約・再構成したものです。原著の文章そのものは引用しておらず、すべて独自の言葉で解説しています。原著の詳細な内容については、上記リンク先の書籍を直接ご参照ください。
                        </em>
                    </p>
                </main>
            </div>
        </div>
    );
}
