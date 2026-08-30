'use client';

import { memo, useState, type FC } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
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
    '支援的なチームとマネージャーが揃った、1つのバリューストリームからパイロットを開始したか',
    'すべての作業（機能開発・障害対応・技術的負債）をカンバンボードなどで可視化しているか',
    'コード・設定・インフラ定義を単一のバージョン管理システムで一元管理しているか',
    'コミットのたびに自動ビルド・自動テストが数分以内に完了する体制があるか',
    '長命なフィーチャーブランチではなく、トランクベース開発とフィーチャーフラグを使っているか',
    'アプリケーション・インフラ・ビジネスの3種類のテレメトリを収集しダッシュボード化しているか',
    'カナリアリリースやフィーチャーフラグなど、低リスクなリリース手法を導入しているか',
    'インシデント発生後、ブレームレスなポストモーテムを実施する文化があるか',
    'セキュリティチェック（SAST、依存関係スキャン）をCIパイプラインに自動組み込みしているか',
    '組織的な学習・改善のための時間を制度として確保しているか',
    'コンウェイの法則を踏まえ、目指すアーキテクチャに合わせた組織設計（逆コンウェイ作戦）を検討したか',
];

export const TheDevOpsHandbookGuide: FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="the-devops-handbook-page">
            <div className="layout">
                <button
                    className="sidebar-toggle"
                    id="sidebarToggle"
                    type="button"
                    aria-label="メニュー"
                    aria-controls="sidebar"
                    aria-expanded={isSidebarOpen}
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                >
                    ☰
                </button>
                <NavBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className="main">
                    <div className="hero">
                        <div className="kicker">The DevOps Handbook &middot; 2nd Edition</div>
                        <h1>
                            The DevOps Handbook 完全ガイド — 初学者のためのステップバイステップ実践ガイド
                        </h1>
                        <div className="meta-row">
                            <span className="pill">
                                対象 <strong>初学者〜中級者</strong>
                            </span>
                            <span className="pill">
                                書籍 <strong>第2版（2021年）</strong>
                            </span>
                            <span className="pill">
                                図解 <strong>Mermaid 19点</strong>
                            </span>
                            <span className="pill">
                                参考文献 <strong>18件</strong>
                            </span>
                        </div>
                    </div>

                    <p>
                        対象書籍: <em>The DevOps Handbook, 2nd Edition</em>（Gene Kim, Jez Humble, Patrick Debois, John Willis, Nicole Forsgren 著／IT Revolution Press／2021年11月刊・528ページ）
                        <br />{' '}
                        参照: <a href="https://www.oreilly.com/library/view/the-devops-handbook/9781098182281/">O&apos;Reilly掲載ページ</a>
                    </p>
                    <p>
                        本ガイドは、DevOpsの「バイブル」とも呼ばれる『The DevOps Handbook』第2版の全23章・6パート構成を初学者向けに噛み砕き、各章のエッセンスをステップバイステップのベストプラクティスとして整理したものです。2026年8月時点の最新動向（DORA 2025レポート、プラットフォームエンジニアリングの潮流）も併せて解説します。
                    </p>

                    <h2 id="1-本書の位置づけと全体像" tabIndex={-1}>
                        1. 本書の位置づけと全体像
                    </h2>

                    <h3 id="11-なぜこの本を読むべきか" tabIndex={-1}>
                        1.1 なぜこの本を読むべきか
                    </h3>

                    <p>
                        『The DevOps Handbook』は、小説形式でDevOpsの物語を描いた前作『The Phoenix Project』の実践編にあたります。前作が「なぜDevOpsが必要か」を物語で伝えたのに対し、本書は「具体的にどうやるか」を体系立てて解説する、いわば実務家のための<strong>リファレンスマニュアル</strong>です。
                    </p>

                    <p>
                        第2版（2021年）では、初版（2016年）から100ページ以上が新規追加され、adidas・American Airlines・Fannie Mae・Target・米空軍など15本の新しいケーススタディと、共著者に加わった Nicole Forsgren 博士（<em>Accelerate</em> の共著者であり、DORA調査の生みの親）による最新の研究データが盛り込まれています。
                    </p>

                    <h3 id="12-初版と第2版の違い" tabIndex={-1}>
                        1.2 初版と第2版の違い
                    </h3>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">初版（2016年）</th>
                                    <th scope="col">第2版（2021年）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>著者</td>
                                    <td>Gene Kim, Jez Humble, Patrick Debois, John Willis</td>
                                    <td>上記4名 + Nicole Forsgren（新規）</td>
                                </tr>
                                <tr className="even">
                                    <td>ページ数</td>
                                    <td>約480ページ</td>
                                    <td>528ページ</td>
                                </tr>
                                <tr className="odd">
                                    <td>ケーススタディ</td>
                                    <td>既存事例中心</td>
                                    <td>
                                        15本の新規ケーススタディを追加（adidas, American Airlines, Fannie Mae, Target, 米空軍など）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>研究的裏付け</td>
                                    <td>実務者の経験知が中心</td>
                                    <td><em>Accelerate</em>研究・DORA調査の統計的知見を統合</td>
                                </tr>
                                <tr className="odd">
                                    <td>想定読者</td>
                                    <td>IT部門のDevOps実践者</td>
                                    <td>IT部門に留まらず、事業部門全体を巻き込む変革の手引き</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="13-全体構成6パート23章" tabIndex={-1}>
                        1.3 全体構成（6パート・23章）
                    </h3>

                    <Diagram id="bookStructure" label="全体構成（6パート・23章）" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <p>
                                本書は頭から順に読む必要はありません。まず第1部で「思想」を理解し、第2部で「自組織にどう当てはめるか」を考え、第3〜6部を実務の辞書として都度参照する、という読み方が初学者には最も効果的です。
                            </p>
                        </div>
                    </div>

                    <hr />

                    <h2 id="2-第1部-3つの道the-three-ways-devopsの原理原則" tabIndex={-1}>
                        2. 第1部: 3つの道（The Three Ways）— DevOpsの原理原則
                    </h2>

                    <p>
                        DevOpsのあらゆるプラクティスは、Gene Kim が提唱した<strong>「3つの道（The Three Ways）」</strong>という3つの原理原則から派生していると本書は主張します（
                        <a href="https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/">
                            出典: Gene Kim, &quot;The Three Ways&quot;
                        </a>
                        ）。第2版ではこの3つの道が Part 1 の中心テーマとして再整理されています（
                        <a href="https://itrevolution.com/articles/three-ways-revisited-devops-handbook/">
                            出典: IT Revolution, &quot;The Three Ways Revisited&quot;
                        </a>
                        ）。
                    </p>

                    <Diagram id="threeWays" label="第一の道・第二の道・第三の道の関係図" />

                    <h3 id="21-第一の道the-first-way-フローの原則第2章" tabIndex={-1}>
                        2.1 第一の道（The First Way）: フローの原則（第2章）
                    </h3>

                    <p>
                        ビジネス要求から顧客への価値提供へ向かう作業の流れ（バリューストリーム）全体のパフォーマンスを最適化する考え方です。特定のチーム（例: 開発だけ）の効率を上げても、ボトルネックが別の箇所（例: 変更管理プロセス）にあれば全体のスループットは改善しません。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>作業を可視化し、バリューストリーム全体のリードタイムを計測する</li>{' '}
                                <li>WIP（仕掛かり作業）を制限し、コンテキストスイッチを減らす</li>{' '}
                                <li>
                                    局所最適ではなく全体最適を目指す（開発チームだけでなく、ビジネス〜運用までの一連の流れを見る）
                                </li>{' '}
                                <li>
                                    複雑さを生む要因（大きなバッチサイズ、手作業のリリース、長命なブランチ）を継続的に排除する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="22-第二の道the-second-way-フィードバックの原則第3章" tabIndex={-1}>
                        2.2 第二の道（The Second Way）: フィードバックの原則（第3章）
                    </h3>

                    <p>
                        右から左（運用→開発）へ、継続的で高速なフィードバックループを構築する考え方です。問題が発生してから顧客に届くまでの時間を最小化し、品質を作り込みます。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    障害や問題を早期（できれば作り込んだ瞬間）に検知する仕組みを作る
                                </li>{' '}
                                <li>
                                    開発者が自分の変更が本番でどう振る舞っているかを即座に把握できるようにする
                                </li>{' '}
                                <li>問題の原因を個人ではなくシステムに求め、再発防止を仕組み化する</li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="23-第三の道the-third-way-継続的な学習と実験の原則第4章" tabIndex={-1}>
                        2.3 第三の道（The Third Way）: 継続的な学習と実験の原則（第4章）
                    </h3>

                    <p>
                        高い信頼と科学的な姿勢に基づく組織文化を作り、リスクを取ることと失敗から学ぶことの両方を奨励する考え方です。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>失敗を許容し、そこから学ぶ文化（ブレームレス文化）を醸成する</li>{' '}
                                <li>日々の業務の中に改善のための時間を組み込む（20%タイムなど）</li>{' '}
                                <li>
                                    ローカルな学びをグローバルな改善へ転換する仕組み（内部Wiki、社内カンファレンスなど）を用意する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="3-第2部-どこから始めるか" tabIndex={-1}>
                        3. 第2部: どこから始めるか
                    </h2>

                    <h3 id="31-バリューストリームの選定第5章" tabIndex={-1}>
                        3.1 バリューストリームの選定（第5章）
                    </h3>

                    <p>
                        DevOps変革はすべてのシステムに一斉導入するのではなく、<strong>1つのバリューストリームからパイロット的に始める</strong>ことが推奨されています。
                    </p>

                    <Diagram id="valueStreamSelection" label="バリューストリームの選定フロー" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    最初は「新規開発（グリーンフィールド）」でも「既存システム改修（ブラウンフィールド）」でもよいが、<strong>支援的なチームとマネージャーがいること</strong>を最優先する
                                </li>{' '}
                                <li>
                                    ビジネスへのインパクトが説明しやすい対象を選び、経営層への説得材料にする
                                </li>{' '}
                                <li>最初から全社展開を狙わず、成功事例を作ってから横展開する</li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="32-作業を理解し可視化する第6章" tabIndex={-1}>
                        3.2 作業を理解し可視化する（第6章）
                    </h3>

                    <Diagram id="visualizeWork" label="作業の可視化（Before/After）" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    すべての作業（機能開発だけでなく、障害対応・技術的負債の返済・割り込み作業も含む）をカンバンボードなどで可視化する
                                </li>{' '}
                                <li>WIP（Work In Progress）に上限を設け、同時並行作業数を制限する</li>{' '}
                                <li>
                                    可視化した作業を組織全体（他チーム、経営層）にも共有し、ボトルネックの合意形成を進める
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="33-コンウェイの法則を意識した組織とアーキテクチャの設計第7章" tabIndex={-1}>
                        3.3 コンウェイの法則を意識した組織とアーキテクチャの設計（第7章）
                    </h3>

                    <p>
                        <strong>コンウェイの法則</strong>：「システムを設計する組織は、その組織のコミュニケーション構造をそのまま模倣した構造の設計を生み出す」という法則です。本書はこの法則を逆手に取り、望ましいアーキテクチャに合わせて組織を設計する<strong>「逆コンウェイ作戦（Inverse Conway Maneuver）」</strong>を推奨しています。この概念は <em>Team Topologies</em> の著者 Matthew Skelton・Manuel Pais の議論とも強く結びついています（
                        <a href="https://itrevolution.com/articles/conways-law-critical-for-efficient-team-design-in-tech/">
                            出典: IT Revolution, Conway&apos;s Law解説
                        </a>
                        、
                        <a href="https://itrevolution.com/wp-content/uploads/2022/06/TTOP_excerpt.pdf">
                            出典: Team Topologies 抜粋
                        </a>
                        ）。
                    </p>

                    <Diagram id="conwaysLaw" label="コンウェイの法則と逆コンウェイ作戦" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    機能別（Dev/QA/Ops/DBA）に組織を分けるのではなく、<strong>バリューストリームやサービス単位の職能横断チーム</strong>（ストリームアラインドチーム）を編成する
                                </li>{' '}
                                <li>チームが独立してデプロイできる範囲（サービス境界）を明確にする</li>{' '}
                                <li>
                                    Team Topologies の4つのチームタイプ（ストリームアラインド／プラットフォーム／イネーブリング／複雑サブシステム）を参考に、チーム間の連携モデルを設計する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="34-運用作業を開発の日常業務に統合する第8章" tabIndex={-1}>
                        3.4 運用作業を開発の日常業務に統合する（第8章）
                    </h3>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    運用担当者を各機能チームに「大使（liaison）」として配置する、または運用担当者を開発チームに常駐させる
                                </li>{' '}
                                <li>
                                    Opsが持つ知見（本番運用のノウハウ）をセルフサービス化されたツールやプラットフォームとして開発チームに提供する
                                </li>{' '}
                                <li>
                                    「Dev vs Ops」の対立構造ではなく、共通の目標（顧客への価値提供）を持つ1つのチームとして機能させる
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="4-第3部-第一の道の技術的実践--フロー" tabIndex={-1}>
                        4. 第3部: 第一の道の技術的実践 — フロー
                    </h2>

                    <h3 id="41-デプロイメントパイプラインの基盤を作る第9章" tabIndex={-1}>
                        4.1 デプロイメントパイプラインの基盤を作る（第9章）
                    </h3>

                    <Diagram id="deploymentPipeline" label="デプロイメントパイプラインの基盤" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    アプリケーションコード・非機密の設定・インフラ定義（IaC）は、すべて単一のバージョン管理システムで管理する
                                </li>{' '}
                                <li>
                                    ただし<strong>認証情報・秘密鍵・APIトークンなどの秘密値はリポジトリに保存しない</strong>。値はシークレット管理サービス（Secret Manager、Vault 等）で管理し、リポジトリには「どのシークレットを参照するか」という参照だけを置く
                                </li>{' '}
                                <li>
                                    「一度ビルドしたアーティファクトを、環境ごとに再ビルドせず、そのまま昇格させていく」という原則（Build once, deploy many）を徹底する
                                </li>{' '}
                                <li>開発者が自分のPCで本番同等の環境を容易に再現できるようにする</li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="42-高速で信頼できる自動テストを実現する第10章" tabIndex={-1}>
                        4.2 高速で信頼できる自動テストを実現する（第10章）
                    </h3>

                    <Diagram id="testPyramid" label="テストピラミッド" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    テストピラミッドの原則に従い、<strong>高速で安定したユニットテストを大量に</strong>、E2Eテストは主要シナリオのみに絞る
                                </li>{' '}
                                <li>
                                    テストが不安定（flaky）になった場合は原因を放置せず即座に修正するか、テストスイートから隔離する
                                </li>{' '}
                                <li>
                                    テストスイート全体の実行時間を数分以内（理想は10分以内）に保ち、開発者が頻繁に実行できる状態を維持する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="43-継続的インテグレーションを実践する第11章" tabIndex={-1}>
                        4.3 継続的インテグレーションを実践する（第11章）
                    </h3>

                    <Diagram id="trunkBasedDevelopment" label="トランクベース開発 vs 長命ブランチ" />

                    <p>
                        Google Cloud の Accelerate State of DevOps 調査では、信頼性目標を達成しているエリートパフォーマーは、そうでないチームと比べて<strong>トランクベース開発を採用している確率が2.3倍高い</strong>という結果が示されています（
                        <a href="https://cloud.google.com/resources/state-of-devops">
                            出典: Google Cloud, Accelerate State of DevOps
                        </a>
                        ）。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    長命なフィーチャーブランチを避け、1日に複数回、小さな差分をtrunk（main）へマージする
                                </li>{' '}
                                <li>
                                    未完成の機能は長期ブランチで隠すのではなく、フィーチャーフラグでコード上ON/OFFを切り替える
                                </li>{' '}
                                <li>
                                    コミットのたびにビルド・自動テストが走り、数分でフィードバックが返る状態を維持する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="44-低リスクなリリースを自動化する第12章" tabIndex={-1}>
                        4.4 低リスクなリリースを自動化する（第12章）
                    </h3>

                    <Diagram id="canaryRelease" label="カナリアリリースとロールバック" />

                    <div className="practice-label">ベストプラクティス（低リスクリリース手法の比較）</div>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">手法</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">主な利点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>フィーチャーフラグ</td>
                                    <td>コードはデプロイ済みだが、機能のON/OFFを実行時に切り替える</td>
                                    <td>
                                        デプロイと機能公開を分離でき、機能公開を即時停止できる。ただし、デプロイ済みコードやスキーマ・データ・非同期処理は元に戻らないため、コードとデータのロールバックまたは前方互換性の維持が別途必要
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>カナリアリリース</td>
                                    <td>
                                        新バージョンへ少量のトラフィックだけ流し、問題なければ徐々に拡大
                                    </td>
                                    <td>実際の本番トラフィックで安全に検証できる</td>
                                </tr>
                                <tr className="odd">
                                    <td>ブルーグリーンデプロイ</td>
                                    <td>新旧2系統の本番環境を用意し、トラフィックを一括切替</td>
                                    <td>切り戻しが単純明快</td>
                                </tr>
                                <tr className="even">
                                    <td>ダークローンチ</td>
                                    <td>新機能をユーザーに見せずに裏側で本番稼働させ負荷等を検証</td>
                                    <td>ユーザー体験に影響を与えず検証可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="45-低リスクリリースのためのアーキテクチャ第13章" tabIndex={-1}>
                        4.5 低リスクリリースのためのアーキテクチャ（第13章）
                    </h3>

                    <Diagram id="architectureForLowRiskRelease" label="低リスクリリースのためのアーキテクチャ" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    アーキテクチャをサービス（またはモジュール）単位に分割し、それぞれ独立してテスト・デプロイできるようにする
                                </li>{' '}
                                <li>
                                    サービス間の依存関係を明示的なAPI契約として定義し、暗黙の結合を排除する
                                </li>{' '}
                                <li>
                                    「アーキテクチャの疎結合さ」と「組織の疎結合さ（第7章のコンウェイの法則）」を両輪で進める
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="5-第4部-第二の道の技術的実践--フィードバック" tabIndex={-1}>
                        5. 第4部: 第二の道の技術的実践 — フィードバック
                    </h2>

                    <h3 id="51-問題を見て解決するためのテレメトリを作る第14章" tabIndex={-1}>
                        5.1 問題を見て解決するためのテレメトリを作る（第14章）
                    </h3>

                    <Diagram id="telemetrySources" label="テレメトリの発生源と集約" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    アプリケーション層・インフラ層・ビジネス層、3種類すべてのテレメトリを収集する（アプリだけ、インフラだけでは不十分）
                                </li>{' '}
                                <li>
                                    ダッシュボードを「見に行く」のではなく、チームの作業スペース（物理・チャット問わず）に常時表示する
                                </li>{' '}
                                <li>
                                    ログ・メトリクス・トレースを1箇所に集約し、横断的に検索・相関分析できるようにする
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="52-テレメトリを分析し問題を予見する第15章" tabIndex={-1}>
                        5.2 テレメトリを分析し問題を予見する（第15章）
                    </h3>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    異常検知のしきい値を固定値ではなく、統計的な手法（標準偏差、季節性を考慮した異常検知など）で設定する
                                </li>{' '}
                                <li>
                                    ポストモーテムで得られた知見をもとに、同種の問題を先回りして検知するアラートを追加する
                                </li>{' '}
                                <li>
                                    「異常が起きてから気づく」のではなく「異常の予兆を捉える」ことを目指す
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="53-開発と運用が安全にデプロイできるようフィードバックを実現する第16章" tabIndex={-1}>
                        5.3 開発と運用が安全にデプロイできるようフィードバックを実現する（第16章）
                    </h3>

                    <Diagram id="featureFlagRollout" label="フィーチャーフラグによるデプロイとリリースの分離" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    デプロイ（コードを本番環境に配置する行為）とリリース（機能をユーザーに公開する行為）を分離する
                                </li>{' '}
                                <li>
                                    開発者自身が自分のコードの本番での挙動をテレメトリ経由で確認できる権限とツールを持つ
                                </li>{' '}
                                <li>
                                    障害復旧の第一手段を「フラグOFF」にし、緊急ロールバックの心理的・時間的コストを最小化する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="54-仮説駆動開発とabテストを日常業務に統合する第17章" tabIndex={-1}>
                        5.4 仮説駆動開発とA/Bテストを日常業務に統合する（第17章）
                    </h3>

                    <Diagram id="hypothesisDrivenDev" label="仮説駆動開発のサイクル" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    新機能をリリースする前に「この機能によって何がどう変化するはずか」という仮説を明文化する
                                </li>{' '}
                                <li>
                                    主観的な意見ではなく、A/Bテストなどの実験結果でリリース判断を行う
                                </li>{' '}
                                <li>
                                    失敗した仮説（改善につながらなかった機能）も貴重な学びとして記録する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="55-現在の作業の品質を高めるレビューと調整プロセスを作る第18章" tabIndex={-1}>
                        5.5 現在の作業の品質を高めるレビューと調整プロセスを作る（第18章）
                    </h3>

                    <Diagram id="peerReviewVsCab" label="重量級CAB vs 軽量ピアレビュー" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    変更承認を「重量級の委員会」から「ピアレビュー＋自動テスト」へ移行する
                                </li>{' '}
                                <li>
                                    ペアプログラミングやモブプログラミングをリアルタイムレビューの一形態として活用する
                                </li>{' '}
                                <li>
                                    レビューのボトルネックが継続的デリバリーの速度を落としていないか定期的に見直す
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="6-第5部-第三の道の技術的実践--継続的学習と実験" tabIndex={-1}>
                        6. 第5部: 第三の道の技術的実践 — 継続的学習と実験
                    </h2>

                    <Diagram id="learningCycle" label="継続的学習と実験のサイクル" />

                    <h3 id="61-日常業務に学習を組み込む第19章-ブレームレスポストモーテム" tabIndex={-1}>
                        6.1 日常業務に学習を組み込む（第19章）: ブレームレスポストモーテム
                    </h3>

                    <p>
                        障害対応の文化を語る上で欠かせないのが、Etsy の元CTO John Allspaw が2012年に提唱した<strong>「ブレームレスポストモーテムとJust Culture」</strong>の考え方です。個人を責めるのではなく、なぜその時その判断が「合理的」に見えたのかをシステム全体の視点から分析することで、エンジニアが萎縮せずに真実を語れる環境を作ります（
                        <a href="https://codeascraft.com/2012/05/22/blameless-postmortems/">
                            出典: John Allspaw, &quot;Blameless PostMortems and a Just Culture&quot;
                        </a>
                        ）。この考え方はGoogleのSRE本でも標準的な手法として採用されています。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    インシデント発生後、関係者全員が処罰を恐れずに事実を話せる場を設ける
                                </li>{' '}
                                <li>
                                    「誰が悪かったか」ではなく「なぜその判断が当時は合理的に見えたか」を分析する
                                </li>{' '}
                                <li>
                                    ポストモーテムのアクションアイテムには必ず担当者と期限を設定し、実行を追跡する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="62-カオスエンジニアリング-意図的に障害を起こして学ぶ" tabIndex={-1}>
                        6.2 カオスエンジニアリング: 意図的に障害を起こして学ぶ
                    </h3>

                    <p>
                        継続的学習の実践として本書が重視するのが、Netflixが体系化した<strong>カオスエンジニアリング</strong>です。Netflixはこれを「本番環境の乱れた状況に耐えられるという確信を築くための、システムに対する実験の学問」と定義しています（
                        <a href="https://principlesofchaos.org/">
                            出典: principlesofchaos.org
                        </a>
                        ）。
                    </p>

                    <Diagram id="chaosEngineering" label="カオスエンジニアリングのサイクル" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    定常状態（正常な挙動を表す測定可能な指標）を明確に定義してから実験を始める
                                </li>{' '}
                                <li>
                                    まず隔離された非本番環境で実験し、監視・アラート、緊急停止（アボート）手順、承認済みのブラストラディウス（影響範囲）が期待どおり機能することを検証する
                                </li>{' '}
                                <li>
                                    本番環境での実験は段階的導入の最終段階と位置づける。上記の安全策が実証され、関係者の承認を得たうえで、影響範囲を絞った小さな実験から開始する
                                </li>{' '}
                                <li>
                                    実験の自動化・継続実行に進むのは、ガードレールと自動停止条件が整備されてからとする
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="63-ローカルな発見をグローバルな改善に変換する第20章" tabIndex={-1}>
                        6.3 ローカルな発見をグローバルな改善に変換する（第20章）
                    </h3>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    チーム固有のノウハウを、組織全体で使える標準ツール・ライブラリ・チェックリストに昇華させる
                                </li>{' '}
                                <li>
                                    社内版のカンファレンスや発表会（Google の「20% プロジェクト報告会」のような場）を定期開催する
                                </li>{' '}
                                <li>
                                    「車輪の再発明」を防ぐための共通プラットフォームチームやイネーブリングチームを設置する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="64-組織的学習と改善のための時間を確保する第21章" tabIndex={-1}>
                        6.4 組織的学習と改善のための時間を確保する（第21章）
                    </h3>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    業務時間の一定割合（例: 20%）を、日々の機能開発以外の改善活動に充てることを制度化する
                                </li>{' '}
                                <li>
                                    技術的負債の返済を「いつかやること」ではなく、バックログの中で優先順位を持つ正式なタスクとして扱う
                                </li>{' '}
                                <li>
                                    学習と実験を評価する仕組み（人事評価やチーム目標）を整備し、口先だけの奨励で終わらせない
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="7-第6部-情報セキュリティ変更管理コンプライアンスの統合" tabIndex={-1}>
                        7. 第6部: 情報セキュリティ・変更管理・コンプライアンスの統合
                    </h2>

                    <h3 id="71-情報セキュリティは全員の日常業務第22章" tabIndex={-1}>
                        7.1 情報セキュリティは全員の日常業務（第22章）
                    </h3>

                    <Diagram id="shiftLeftSecurity" label="シフトレフト・セキュリティ" />

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    セキュリティ担当者をリリース末端の「ゲートキーパー」ではなく、開発初期から関与する「イネーブラー」として位置づける
                                </li>{' '}
                                <li>
                                    静的解析（SAST）、依存関係の脆弱性スキャン、シークレット検出をCIパイプラインに自動組み込みする
                                </li>{' '}
                                <li>
                                    セキュリティのベストプラクティスをセルフサービスのガードレール（承認済みライブラリ、テンプレート）として提供する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <h3 id="72-デプロイメントパイプラインを保護する第23章" tabIndex={-1}>
                        7.2 デプロイメントパイプラインを保護する（第23章）
                    </h3>

                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    パイプライン自体（CI/CDツール、シークレット管理、アーティファクトリポジトリ）へのアクセスを最小権限の原則で厳格に管理する
                                </li>{' '}
                                <li>
                                    すべての変更履歴（誰が・いつ・何を変更したか）を監査可能な形で記録する
                                </li>{' '}
                                <li>
                                    コンプライアンス要件（変更管理、職務分掌など）を、手作業の承認フローではなく、パイプライン内の自動化された制御として実装する
                                </li>{' '}
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <h2 id="8-2026年の視点-ai時代のdoraとプラットフォームエンジニアリング" tabIndex={-1}>
                        8. 2026年の視点: AI時代のDORAとプラットフォームエンジニアリング
                    </h2>

                    <p>
                        本書の初版発行（2016年）から10年、DevOpsを取り巻く環境は大きく変化しました。ここでは2026年8月時点での最新動向を補足します。
                    </p>

                    <h3 id="81-dora調査の変遷とai時代の実証データ" tabIndex={-1}>
                        8.1 DORA調査の変遷とAI時代の実証データ
                    </h3>

                    <p>
                        DORA（DevOps Research and Assessment）は、Google Cloudが主催する業界最大規模の継続調査で、<em>Accelerate</em> の共著者でもある Nicole Forsgren 博士が牽引してきました。2025年、この調査は大きな転換点を迎えています。
                    </p>

                    <p>
                        DORAチームは2025年、報告書の名称を「Accelerate State of DevOps」から<strong>「State of AI-assisted Software Development」</strong>へと変更しました。これはDevOpsという枠を超え、AIを含む新しい働き方全般を対象とする調査へと範囲を広げたことを意味する、単なる名称変更ではない転換だと分析されています（
                        <a href="https://redmonk.com/rstephens/2025/12/18/dora2025/">
                            出典: RedMonk, &quot;DORA 2025: Measuring Software Delivery After AI&quot;
                        </a>
                        ）。指標面では、2024年に<strong>デプロイメント手戻り率（deployment rework rate）</strong>が5つ目の指標として追加され、2025年には5指標モデルが正式化されています（
                        <a href="https://dora.dev/insights/dora-2025-year-in-review/">
                            出典: DORA, &quot;2025: Year in Review&quot;
                        </a>
                        ）。
                    </p>

                    <p>
                        2025年のDORA報告書では、世界中の技術者約5,000名の調査データから「AIは組織の強みも弱みも両方を増幅する“アンプ”である」という中心的な知見が示されました。基盤（技術的負債の少なさ、明確なプロセス、健全な文化）が整っているハイパフォーマーチームではAIが強力な加速装置として働く一方、混乱した組織ではAIが問題をさらに悪化させる、というものです（
                        <a href="https://www.splunk.com/en_us/blog/learn/state-of-devops.html">
                            出典: Splunk, &quot;State of DevOps 2025&quot;
                        </a>
                        ）。DORA自身も、AI導入がソフトウェア提供のスループットとの正の相関を示す一方で、変更失敗の増加や手戻りの増加など不安定性の高まりとも相関していることを指摘し、「検証コスト（verification tax）」という新たな摩擦が生じていると分析しています（
                        <a href="https://dora.dev/insights/balancing-ai-tensions/">
                            出典: DORA, &quot;Balancing AI tensions&quot;
                        </a>
                        ）。
                    </p>

                    <Diagram id="doraPerformers" label="DORA調査のエリート vs ローパフォーマー" />

                    <p>
                        <strong>2026年の実践への示唆</strong>：
                    </p>

                    <ul>
                        <li>
                            AIコーディング支援ツールを導入する前に、まず本書が説く基礎（トランクベース開発・自動テスト・テレメトリ・疎結合アーキテクチャ）を固めることが、AIの恩恵を最大化する前提条件になる
                        </li>
                        <li>
                            コードレビューやQAといった「下流工程」がAIによるコード生成速度の増加に追いついていない組織では、ボトルネックがそこへ移動するため、レビュー・テストの自動化投資を優先する
                        </li>
                    </ul>

                    <h3 id="82-プラットフォームエンジニアリングの台頭" tabIndex={-1}>
                        8.2 プラットフォームエンジニアリングの台頭
                    </h3>

                    <p>
                        2026年現在、DevOpsの実践は「プラットフォームエンジニアリング」という形で進化を続けています。Gartnerは、大規模なソフトウェアエンジニアリング組織の80%が2026年までに、アプリケーション提供のための再利用可能なサービス・コンポーネント・ツールを社内向けに提供する専任プラットフォームチームを設置すると予測しています（2022年時点の45%から増加）（
                        <a href="https://roadie.io/blog/platform-engineering-in-2026-why-diy-is-dead/">
                            出典: Roadie.io, &quot;Platform Engineering in 2026&quot;
                        </a>
                        ）。CNCF Q1 2026 Technology Radarによれば、ハイブリッドAIワークフロー（AIと人間の協調作業）を利用している開発者は35%、社内向けプラットフォームを担当するプラットフォームチームが存在すると回答した開発者は28%に達しているとも報告されています（
                        <a href="https://radar.cncf.io/">
                            出典: CNCF, &quot;Technology Radar Q1 2026&quot;
                        </a>
                        ）。また、LeanOpsレポートでは、多くの組織においてプラットフォームエンジニアリング専任チームへの移行が加速していると指摘されています（
                        <a href="https://leanopstech.com/blog/platform-engineering-trends-2026/">
                            出典: LeanOps, &quot;Platform Engineering Trends 2026&quot;
                        </a>
                        ）。
                    </p>

                    <p>
                        これは本書第7〜8章で語られる「運用の知見をセルフサービス化する」という思想の延長線上にあり、DevOpsを置き換えるものではなく、DevOpsの原則（フロー・フィードバック・継続的学習）を大規模かつ持続可能な形で実現するための組織的な進化と捉えるのが適切です。
                    </p>

                    <hr />

                    <h2 id="9-初学者向け8ステップ導入ロードマップ" tabIndex={-1}>
                        9. 初学者向け8ステップ導入ロードマップ
                    </h2>

                    <Diagram id="roadmapSteps" label="初学者向け8ステップ導入ロードマップ" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ステップ</th>
                                    <th scope="col">主な成果物</th>
                                    <th scope="col">対応する章</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Step1: パイロット選定</td>
                                    <td>支援的なチーム・明確な価値を持つ対象領域</td>
                                    <td>第5章</td>
                                </tr>
                                <tr className="even">
                                    <td>Step2: 作業の可視化</td>
                                    <td>チーム共通のカンバンボード</td>
                                    <td>第6章</td>
                                </tr>
                                <tr className="odd">
                                    <td>Step3: パイプライン基盤</td>
                                    <td>単一リポジトリ・自動ビルド</td>
                                    <td>第9章</td>
                                </tr>
                                <tr className="even">
                                    <td>Step4: CI/自動テスト</td>
                                    <td>テストピラミッド・トランクベース開発</td>
                                    <td>第10-11章</td>
                                </tr>
                                <tr className="odd">
                                    <td>Step5: テレメトリ整備</td>
                                    <td>ダッシュボード・アラート</td>
                                    <td>第14章</td>
                                </tr>
                                <tr className="even">
                                    <td>Step6: 低リスクリリース</td>
                                    <td>フィーチャーフラグ・カナリアリリース</td>
                                    <td>第12章</td>
                                </tr>
                                <tr className="odd">
                                    <td>Step7: 学習文化の定着</td>
                                    <td>ブレームレスポストモーテムの実施フロー</td>
                                    <td>第19章</td>
                                </tr>
                                <tr className="even">
                                    <td>Step8: 組織への横展開</td>
                                    <td>社内ナレッジ共有の仕組み</td>
                                    <td>第20-21章</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h2 id="10-よくあるアンチパターン" tabIndex={-1}>
                        10. よくあるアンチパターン
                    </h2>

                    <ul className="antipattern-grid" role="list">
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">ビッグバン導入</div>
                                <p>
                                    全社一斉にDevOpsツールを導入しようとし、混乱と抵抗を招く（正しくは1つのバリューストリームから始める）
                                </p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">ツール導入だけで満足する</div>
                                <p>
                                    CI/CDツールやKubernetesを導入しただけでDevOpsが完了したと錯覚する（文化と組織設計の変革を伴わない技術導入は効果が限定的）
                                </p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">長命なフィーチャーブランチの放置</div>
                                <p>マージ地獄を生み、継続的インテグレーションの恩恵を得られない</p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">リリース末端でのセキュリティ監査</div>
                                <p>
                                    開発の最終段階でしかセキュリティを確認せず、手戻りコストを増大させる
                                </p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">犯人探し型のポストモーテム</div>
                                <p>
                                    個人の責任追及に終始し、エンジニアが真実を語らなくなり、組織的な学習が止まる
                                </p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">重量級の変更諮問委員会（CAB）への依存</div>
                                <p>週次会議での承認待ちがリードタイムを支配し、フローを阻害する</p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">テレメトリなきデプロイ</div>
                                <p>
                                    本番での挙動を計測せずにリリースし、問題発覚が顧客からの苦情頼みになる
                                </p>
                            </div>
                        </li>
                        <li className="antipattern-card">
                            <div className="icon" aria-hidden="true">
                                &#9888;
                            </div>
                            <div className="body">
                                <div className="title">AIツール導入を基礎の代替と考える</div>
                                <p>
                                    トランクベース開発やテスト自動化などの基礎を整えないままAIコーディング支援を導入し、DORA 2025が指摘する「不安定性の増幅」を招く
                                </p>
                            </div>
                        </li>
                    </ul>

                    <hr />

                    <h2 id="11-実践チェックリスト" tabIndex={-1}>
                        11. 実践チェックリスト
                    </h2>

                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">実践チェックリスト</span>
                            <span className="count">{checkedCount} / 11 完了</span>
                        </div>
                        <ul>
                            {CHECKLIST_ITEMS.map((item, index) => {
                                const id = `chk${index + 1}`;
                                const isChecked = !!checkedItems[index];
                                return (
                                    <li key={id} className={isChecked ? 'checked' : ''}>
                                        <input
                                            id={id}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <label htmlFor={id}>{item}</label>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <hr />

                    <h2 id="12-用語集" tabIndex={-1}>
                        12. 用語集
                    </h2>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">用語</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>バリューストリーム</td>
                                    <td>
                                        ビジネス上の仮説を、顧客に価値を届ける技術サービスへと変換する一連のプロセス全体
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>デプロイメントパイプライン</td>
                                    <td>
                                        コードのコミットから本番リリースまでを自動化した一連のワークフロー
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>トランクベース開発</td>
                                    <td>
                                        長命なブランチを作らず、main（trunk）へ小さな変更を頻繁にマージしていく開発スタイル
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>フィーチャーフラグ</td>
                                    <td>
                                        コードのデプロイと機能の公開を分離し、実行時にON/OFFを切り替える仕組み
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>カナリアリリース</td>
                                    <td>
                                        新バージョンへ一部のトラフィックだけを流し、問題がなければ段階的に対象を拡大するリリース手法
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>テレメトリ</td>
                                    <td>
                                        アプリケーション・インフラ・ビジネスの状態を示す、ログ・メトリクス・トレースなどの計測データ
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>ブレームレスポストモーテム</td>
                                    <td>
                                        個人の責任追及ではなく、システム全体の視点から失敗の原因を分析する事後検証手法
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>コンウェイの法則</td>
                                    <td>
                                        システムの構造がそれを設計した組織のコミュニケーション構造を模倣するという法則
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>逆コンウェイ作戦</td>
                                    <td>
                                        望ましいシステムアーキテクチャを実現するために、あらかじめ組織構造を設計するアプローチ
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>カオスエンジニアリング</td>
                                    <td>
                                        本番相当の環境に意図的に障害を注入し、システムの耐障害性を検証する実験的手法
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>DORAメトリクス</td>
                                    <td>
                                        デプロイ頻度・変更のリードタイム・変更失敗率・サービス復旧時間（旧称: 平均修復時間）の4指標に、2024年追加のデプロイメント手戻り率を加えた5指標からなるソフトウェア提供パフォーマンスの指標群
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>プラットフォームエンジニアリング</td>
                                    <td>
                                        開発者向けにセルフサービスの内部プラットフォーム（IDP）を構築・提供する専門領域
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h2 id="13-参考文献" tabIndex={-1}>
                        13. 参考文献
                    </h2>

                    <div className="ref-grid" id="referenceGrid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                Gene Kim, Jez Humble, Patrick Debois, John Willis, Nicole Forsgren, <em>The DevOps Handbook, 2nd Edition</em> —{' '}
                                <a href="https://www.oreilly.com/library/view/the-devops-handbook/9781098182281/">
                                    O&apos;Reilly掲載ページ
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                IT Revolution, &quot;The DevOps Handbook, Second Edition&quot;（書籍紹介ページ） —{' '}
                                <a href="https://itrevolution.com/product/the-devops-handbook-second-edition/">
                                    https://itrevolution.com/product/the-devops-handbook-second-edition/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref3">
                            <div className="num">3</div>
                            <div className="txt">
                                Gene Kim, &quot;The Three Ways: The Principles Underpinning DevOps&quot; —{' '}
                                <a href="https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/">
                                    https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                IT Revolution, &quot;The Three Ways Revisited: The DevOps Handbook, Second Edition&quot; —{' '}
                                <a href="https://itrevolution.com/articles/three-ways-revisited-devops-handbook/">
                                    https://itrevolution.com/articles/three-ways-revisited-devops-handbook/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref5">
                            <div className="num">5</div>
                            <div className="txt">
                                DORA（Google Cloud）公式サイト —{' '}
                                <a href="https://dora.dev/">https://dora.dev/</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref6">
                            <div className="num">6</div>
                            <div className="txt">
                                DORA, &quot;State of AI-assisted Software Development 2025&quot; —{' '}
                                <a href="https://dora.dev/dora-report-2025/">
                                    https://dora.dev/dora-report-2025/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref7">
                            <div className="num">7</div>
                            <div className="txt">
                                DORA, &quot;2025: Year in Review&quot;（名称変更・指標拡張の経緯） —{' '}
                                <a href="https://dora.dev/insights/dora-2025-year-in-review/">
                                    https://dora.dev/insights/dora-2025-year-in-review/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref8">
                            <div className="num">8</div>
                            <div className="txt">
                                DORA, &quot;Balancing AI tensions: Moving from AI adoption to effective SDLC use&quot; —{' '}
                                <a href="https://dora.dev/insights/balancing-ai-tensions/">
                                    https://dora.dev/insights/balancing-ai-tensions/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref9">
                            <div className="num">9</div>
                            <div className="txt">
                                Google Cloud, &quot;Accelerate State of DevOps&quot;（トランクベース開発の統計等） —{' '}
                                <a href="https://cloud.google.com/resources/state-of-devops">
                                    https://cloud.google.com/resources/state-of-devops
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref10">
                            <div className="num">10</div>
                            <div className="txt">
                                RedMonk (Rachel Stephens), &quot;DORA 2025: Measuring Software Delivery After AI&quot; —{' '}
                                <a href="https://redmonk.com/rstephens/2025/12/18/dora2025/">
                                    https://redmonk.com/rstephens/2025/12/18/dora2025/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref11">
                            <div className="num">11</div>
                            <div className="txt">
                                Splunk, &quot;State of DevOps 2025: Review of the DORA Report on AI Assisted Software Development&quot; —{' '}
                                <a href="https://www.splunk.com/en_us/blog/learn/state-of-devops.html">
                                    https://www.splunk.com/en_us/blog/learn/state-of-devops.html
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref12">
                            <div className="num">12</div>
                            <div className="txt">
                                IT Revolution / Matthew Skelton, &quot;Conway&apos;s Law: Critical for Efficient Team Design in Tech&quot; —{' '}
                                <a href="https://itrevolution.com/articles/conways-law-critical-for-efficient-team-design-in-tech/">
                                    https://itrevolution.com/articles/conways-law-critical-for-efficient-team-design-in-tech/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref13">
                            <div className="num">13</div>
                            <div className="txt">
                                Matthew Skelton, Manuel Pais, <em>Team Topologies</em>（抜粋PDF） —{' '}
                                <a href="https://itrevolution.com/wp-content/uploads/2022/06/TTOP_excerpt.pdf">
                                    https://itrevolution.com/wp-content/uploads/2022/06/TTOP_excerpt.pdf
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref14">
                            <div className="num">14</div>
                            <div className="txt">
                                John Allspaw, &quot;Blameless PostMortems and a Just Culture&quot;（Etsy Code as Craft, 2012） —{' '}
                                <a href="https://codeascraft.com/2012/05/22/blameless-postmortems/">
                                    https://codeascraft.com/2012/05/22/blameless-postmortems/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref15">
                            <div className="num">15</div>
                            <div className="txt">
                                &quot;Principles of Chaos Engineering&quot;（Netflix発、Chaos Community） —{' '}
                                <a href="https://principlesofchaos.org/">
                                    https://principlesofchaos.org/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref16">
                            <div className="num">16</div>
                            <div className="txt">
                                Roadie.io, &quot;Platform Engineering in 2026: Why DIY Is Dead&quot; —{' '}
                                <a href="https://roadie.io/blog/platform-engineering-in-2026-why-diy-is-dead/">
                                    https://roadie.io/blog/platform-engineering-in-2026-why-diy-is-dead/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref17">
                            <div className="num">17</div>
                            <div className="txt">
                                LeanOps, &quot;Platform Engineering Trends 2026: 11 Key Shifts&quot; —{' '}
                                <a href="https://leanopstech.com/blog/platform-engineering-trends-2026/">
                                    https://leanopstech.com/blog/platform-engineering-trends-2026/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref18">
                            <div className="num">18</div>
                            <div className="txt">
                                GetDX, &quot;DORA metrics: the complete guide to measuring DevOps performance in the AI era&quot; —{' '}
                                <a href="https://getdx.com/blog/dora-metrics/">
                                    https://getdx.com/blog/dora-metrics/
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <p>
                        <em>
                            本ガイドは2026年8月24日時点の公開情報に基づいて作成されています。DORA調査や各種統計は年次で更新されるため、最新の数値は各一次情報源（dora.dev等）を直接ご確認ください。
                        </em>
                    </p>
                </main>
            </div>
        </div>
    );
};
