'use client';

import { memo, useState, type FC } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, STAT_ITEMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" data-testid="mermaid-diagram" aria-label={label}>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

export const AccelerateGuide: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="accelerate-page">
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="目次を開閉する"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((prev) => !prev)}
            >
                <i className="ti ti-menu-2" aria-hidden="true" />
            </button>

            <div className="layout">
                <NavBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="main-content">
                    <div className="hero">
                        <div className="hero-eyebrow">
                            <i className="ti ti-award" aria-hidden="true" />
                            DORA / Google Cloud 研究プログラムに基づく解説
                        </div>
                        <h1>Accelerate 入門ガイド ― Leanと DevOps の科学を初学者向けに解説</h1>
                        <p className="hero-lede">
                            ソフトウェアデリバリのパフォーマンス研究書『Accelerate』を学ぶための非公式の解説ガイドです。あわせて、原著刊行(2018年)以降にDORA(DevOps
                            Research and Assessment)チームが継続してきた年次調査「State of DevOps
                            Report」の最新動向(2025年のAI支援開発に関する調査を含む)も参照しています。
                        </p>

                        <div className="stat-row">
                            {STAT_ITEMS.map((stat, idx) => (
                                <div className="stat-card" key={idx}>
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="disclaimer-box">
                            <i className="ti ti-info-circle" aria-hidden="true" />
                            本ガイドは教育・学習支援を目的とした非公式の解説資料であり、公式見解ではありません。正確な内容は必ず原著および{' '}
                            <a href="https://dora.dev/" target="_blank" rel="noopener noreferrer">
                                DORA公式サイト
                            </a>
                            、
                            <a
                                href="https://itrevolution.com/product/accelerate/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                書籍公式ページ
                            </a>{' '}
                            でご確認ください。
                        </div>
                    </div>

                    {/* ===================== 1. What is Accelerate ===================== */}
                    <section id="what-is-accelerate" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-certificate" aria-hidden="true" />
                            SECTION 01
                        </div>
                        <h2>Accelerateとは何か</h2>

                        <div className="callout note">
                            <div className="callout-title">
                                <i className="ti ti-info-circle" aria-hidden="true" />
                                補足
                            </div>{' '}
                            <p>
                                原著:{' '}
                                <em>
                                    Accelerate: The Science of Lean Software and DevOps: Building
                                    and Scaling High Performing Technology Organizations
                                </em>
                                <br />
                                著者: Dr. Nicole Forsgren / Jez Humble / Gene Kim(IT Revolution
                                Press, 2018年)
                            </p>
                        </div>

                        <p>
                            『Accelerate』は、DORA(DevOps Research and
                            Assessment)チームの共同創設者であるDr. Nicole Forsgren、Jez Humble、Gene
                            Kimの3名が、2014年から継続してきた「State of DevOps
                            Report」という年次調査の4年分の研究成果を一冊にまとめた書籍です。統計的因果推論の手法を用いて、どのような技術的・組織的プラクティスが「ソフトウェアデリバリのパフォーマンス」を高め、それが最終的に企業の収益性・市場シェア・顧客満足度といった組織パフォーマンスにつながるのかを、業種や企業規模を問わず数万件規模の調査データから明らかにした点が特徴です。出版元のIT
                            Revolution
                            PressによればShingo賞(生産性・オペレーショナルエクセレンスに関する権威ある賞)を受賞しており、実務よりも「勘と経験」に頼りがちだったソフトウェア開発の意思決定に、統計的根拠を持ち込んだ先駆的な一冊として位置づけられています。
                        </p>

                        <p>
                            3人の著者の背景も特徴的です。Forsgren氏は主任研究者・統計学者として年次調査を率い、のちにGoogle傘下のDORAおよびMicrosoft
                            Researchで研究を継続しました。Humble氏は2010年にDave
                            Farley氏と共著した『Continuous
                            Delivery』の著者であり、継続的デリバリという概念そのものの生みの親の一人です。Kim氏は2013年の小説形式のビジネス書『The
                            Phoenix Project』の著者で、DevOpsの基本思想である「The Three
                            Ways(フロー・フィードバック・継続的学習の3つの道)」を広めた人物です。
                        </p>

                        <p>
                            DORAチームは2015年に設立され、2018年にGoogle
                            Cloudの一部となりました。その後もチームは毎年「State of DevOps
                            Report」を発行し続けており、10年間の累計で世界39,000人超の専門家を対象に調査を実施、2025年にはAI支援開発に特化した新しい報告書シリーズを開始しています(詳細はSECTION
                            07)。
                        </p>

                        <div className="diagram-card">
                            <div className="diagram-container" id="causalChain">
                                <Diagram
                                    id="causalChain"
                                    label="Lean・アジャイルの原則から組織パフォーマンスへとつながる因果の連鎖"
                                />
                            </div>
                            <div className="diagram-caption">
                                Lean・アジャイルの原則から組織パフォーマンスへとつながる因果の連鎖
                            </div>
                        </div>

                        <p>
                            Accelerateの中心的な主張はシンプルです。
                            <strong>
                                ソフトウェアデリバリの速さと安定性の間にトレードオフは存在しない。
                            </strong>{' '}
                            ハイパフォーマンスな組織は、高速なデプロイと高い安定性を同時に達成しています。これは「急いては事を仕損じる」という直感に反する結論であり、本書が業界に大きなインパクトを与えた理由のひとつです。
                        </p>
                    </section>

                    {/* ===================== 2. Why Lean ===================== */}
                    <section id="why-lean" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-building-bank" aria-hidden="true" />
                            SECTION 02
                        </div>
                        <h2>なぜ「Lean」なのか ― LeanとDevOpsのつながり</h2>

                        <p>
                            原題にある通り、Accelerateは「Leanソフトウェアとデブオプスの科学」を扱っています。ここでいうLeanとは、トヨタ生産方式に代表される製造業の改善思想(W.
                            Edwards
                            Demingの統計的品質管理の考え方を含む)をソフトウェア開発に応用したものです。書籍内では、Demingの「恐怖があるところでは、誤った数値が生まれる」という警句がたびたび引用されており、メトリクスを恐怖による管理の道具にしてはならないという原則が随所で強調されています。
                        </p>

                        <p>Lean思想がDevOpsに与えた主な概念は次のとおりです。</p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Lean由来の概念</th>
                                        <th scope="col">ソフトウェア開発での適用</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>小さなバッチサイズ</td>
                                        <td>
                                            大きな機能を一度にリリースせず、小さく頻繁にデプロイする
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>フローの可視化</td>
                                        <td>
                                            バリューストリーム(価値の流れ)全体を見える化し、ボトルネックを特定する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>WIP(仕掛かり作業)の制限</td>
                                        <td>同時に着手するタスク数を制限し、フローを最適化する</td>
                                    </tr>
                                    <tr>
                                        <td>継続的な改善(カイゼン)</td>
                                        <td>
                                            一度作って終わりではなく、恒常的にプロセスを見直し続ける
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>現場への権限委譲</td>
                                        <td>
                                            現場のエンジニアが変更を判断できるようにし、承認待ちのボトルネックを減らす
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            Accelerateの継続的デリバリに関する技術的プラクティスの多くは、Jez
                            Humble氏がDave Farley氏と2010年に著した『Continuous
                            Delivery』に由来しています。同書の中心的な主張は、「ソフトウェアは常にリリース可能な状態に保つべきであり、そのためには変更を溜め込まず継続的に統合し続けることが必要」というものです。この考え方が、後述するトランクベース開発や継続的インテグレーションといった実践プラクティスの理論的支柱になっています。
                        </p>
                    </section>

                    {/* ===================== 3. DORA Metrics ===================== */}
                    <section id="dora-metrics" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-chart-pie" aria-hidden="true" />
                            SECTION 03
                        </div>
                        <h2>ソフトウェアデリバリのパフォーマンスを測る: DORAメトリクス</h2>

                        <h3>3.1 4つの鍵指標から5指標モデルへ</h3>

                        <p>
                            Accelerateが世に広めた最大の功績は、ソフトウェアデリバリのパフォーマンスを
                            <strong>4つの指標(Four Keys)</strong>
                            で定量化できることを示した点です。これらは「DORAメトリクス」または「Accelerateメトリクス」とも呼ばれます。DORAチームはその後も研究を継続しており、指標体系は次のように進化してきました。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">年</th>
                                        <th scope="col">変化</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2014年〜</td>
                                        <td>
                                            デプロイ頻度、変更のリードタイム、MTTR(平均修復時間)、変更失敗率の4変数を調査。ITパフォーマンスはこのうちデプロイ頻度・変更のリードタイム・MTTRの3指標で定義され、変更失敗率は品質面の関連指標として併せて分析された
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2015年〜</td>
                                        <td>
                                            4指標をスループット×安定性の2軸で整理する枠組みが定着
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2018年</td>
                                        <td>Accelerate出版。4つの鍵指標として広く認知される</td>
                                    </tr>
                                    <tr>
                                        <td>2021年</td>
                                        <td>
                                            運用パフォーマンスの指標として「信頼性(Reliability)」を追加(可用性を拡張した概念であり、ソフトウェアデリバリの5番目の指標ではない)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2023年</td>
                                        <td>
                                            MTTRを「失敗したデプロイの復旧時間」に名称変更(変更起因の障害と外部要因を分離するため)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2024年</td>
                                        <td>
                                            変更失敗率から「デプロイのリワーク率」を分離。現行の5指標モデルへ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2025年〜</td>
                                        <td>
                                            AI支援開発時代に対応した補助的な計測フレームワークの検討が進行中(SECTION
                                            07参照)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>現行の5指標は次のとおりです。</p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">指標</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">スループット/不安定性</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>デプロイ頻度</td>
                                        <td>本番環境へのリリース頻度</td>
                                        <td>スループット</td>
                                    </tr>
                                    <tr>
                                        <td>変更のリードタイム</td>
                                        <td>コードのコミットから本番稼働までの所要時間</td>
                                        <td>スループット</td>
                                    </tr>
                                    <tr>
                                        <td>失敗したデプロイの復旧時間</td>
                                        <td>
                                            サービス低下を引き起こした失敗デプロイから、サービスが復旧するまでの所要時間。デプロイに起因しない障害は対象外(旧称:
                                            MTTR)
                                        </td>
                                        <td>スループット</td>
                                    </tr>
                                    <tr>
                                        <td>変更失敗率</td>
                                        <td>デプロイのうちサービス低下や修正を要した割合</td>
                                        <td>不安定性</td>
                                    </tr>
                                    <tr>
                                        <td>デプロイのリワーク率</td>
                                        <td>
                                            本番の不具合対応のために発生した計画外デプロイの割合
                                        </td>
                                        <td>不安定性</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            これらに加え、システムの可用性やSLO(サービスレベル目標)の達成度を測る「信頼性」が準指標として位置づけられており、SRE(サイト信頼性エンジニアリング)チームとDevOpsチームの協働を促す役割を果たしています。
                        </p>

                        <div className="diagram-card">
                            <div className="diagram-container" id="doraMetrics">
                                <Diagram
                                    id="doraMetrics"
                                    label="DORA 5指標をスループットと不安定性の2軸で分類した図"
                                />
                            </div>
                            <div className="diagram-caption">
                                DORA 5指標をスループットと不安定性の2軸で分類した図
                            </div>
                        </div>

                        <h3>3.2 パフォーマンス階層のベンチマーク</h3>

                        <p>
                            年次調査では、回答データをクラスタ分析にかけ、Elite(エリート) / High(高)
                            / Medium(中) /
                            Low(低)というパフォーマンス階層を識別してきました。近年の調査(2024年版)では次のような目安が示されています(あくまで年ごとに変動する参考値です)。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">階層</th>
                                        <th scope="col">変更失敗率の目安</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Elite</td>
                                        <td>約5%前後</td>
                                        <td>オンデマンドでのデプロイ、1時間未満での障害復旧</td>
                                    </tr>
                                    <tr>
                                        <td>High</td>
                                        <td>約20%前後</td>
                                        <td>高い頻度でのデプロイ、比較的短い復旧時間</td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
                                        <td>中間的な水準</td>
                                        <td>週〜月単位のデプロイ</td>
                                    </tr>
                                    <tr>
                                        <td>Low</td>
                                        <td>約40%前後</td>
                                        <td>デプロイ頻度が低く、復旧にも長時間を要する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            2024年版の調査では、エリート層が全体の19%にとどまる一方、低パフォーマンス層は前年の17%から25%へ増加したと報告されており、パフォーマンスの二極化が進んでいる可能性が指摘されています。
                        </p>

                        <div className="callout note">
                            <div className="callout-title">
                                <i className="ti ti-info-circle" aria-hidden="true" />
                                補足
                            </div>{' '}
                            <p>
                                <strong>注意点:</strong>{' '}
                                DORAチーム自身が2023年10月、これらの指標をチーム間の序列づけ(リーグテーブル)に使うことに警鐘を鳴らしています。指標は「自分たちの過去と比較して改善しているか」を確認するための道具であり、他チームとの比較や個人評価に用いるとGoodhartの法則(測定対象が目標化されると、その測定は意味を失う)が働き、数値の水増しなど逆効果を招く恐れがあります。
                            </p>
                        </div>
                    </section>

                    {/* ===================== 4. 24 Capabilities ===================== */}
                    <section id="capabilities-24" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-list-check" aria-hidden="true" />
                            SECTION 04
                        </div>
                        <h2>パフォーマンスを生み出す24の能力(Capabilities)</h2>

                        <p>
                            DORAメトリクスは「結果」であり、Accelerateの本当の価値はその結果を生み出す
                            <strong>24の能力(Capabilities)</strong>
                            の特定にあります。これらは統計的に検証された、ハイパフォーマンスと相関の高い具体的なプラクティス群で、5つのカテゴリに整理されています。
                        </p>

                        <div className="diagram-card">
                            <div className="diagram-container" id="capabilitiesOverview">
                                <Diagram
                                    id="capabilitiesOverview"
                                    label="24の能力を構成する5つのカテゴリ"
                                />
                            </div>
                            <div className="diagram-caption">24の能力を構成する5つのカテゴリ</div>
                        </div>

                        <h3>4.1 継続的デリバリの能力(8項目)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">能力</th>
                                        <th scope="col">要点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>バージョン管理</td>
                                        <td>
                                            アプリケーションコードだけでなく、構成情報やインフラ定義もバージョン管理下に置く
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>デプロイの自動化</td>
                                        <td>
                                            手作業を排除し、ボタン一つ・コマンド一つで再現性のあるデプロイを実現する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>継続的インテグレーション(CI)</td>
                                        <td>
                                            変更を頻繁に統合し、自動ビルド・テストで即座に検証する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>トランクベース開発</td>
                                        <td>
                                            長命なフィーチャーブランチを避け、1日1回以上トランクへ統合する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>テスト自動化</td>
                                        <td>
                                            信頼できる自動テストスイートを整備し、手動テストへの依存を減らす
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>テストデータ管理</td>
                                        <td>
                                            テストに必要なデータを適切に管理し、テストの高速化と安定化を図る
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>セキュリティのシフトレフト</td>
                                        <td>セキュリティ対策を開発の初期段階から組み込む</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>継続的デリバリ(CD)</td>
                                        <td>
                                            いつでも安全にリリースできる状態をパイプライン全体で維持する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.2 アーキテクチャの能力(2項目)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">能力</th>
                                        <th scope="col">要点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9</td>
                                        <td>疎結合アーキテクチャ</td>
                                        <td>
                                            他チームの成果物に依存せずテスト・デプロイできる設計にする
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>権限委譲されたチーム</td>
                                        <td>
                                            チームがツールや技術選定について自律的に意思決定できるようにする
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.3 プロダクトとプロセスの能力(4項目)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">能力</th>
                                        <th scope="col">要点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>11</td>
                                        <td>顧客フィードバック</td>
                                        <td>
                                            顧客からのフィードバックを収集し、プロダクトの意思決定に反映する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>バリューストリームの可視化</td>
                                        <td>
                                            企画から本番稼働までの価値の流れ全体を関係者が把握できるようにする
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>13</td>
                                        <td>小さなバッチでの作業</td>
                                        <td>
                                            作業を小さな単位に分割し、フィードバックループを短くする
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>14</td>
                                        <td>チームによる実験</td>
                                        <td>新しいアイデアを低リスクで試せる環境を整える</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.4 リーン管理とモニタリングの能力(5項目)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">能力</th>
                                        <th scope="col">要点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>15</td>
                                        <td>軽量な変更承認プロセス</td>
                                        <td>
                                            重厚な承認会議ではなく、ピアレビューと自動チェックを軸にする
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>16</td>
                                        <td>モニタリング</td>
                                        <td>
                                            アプリケーションとインフラを横断的に監視し、ビジネス上の意思決定に活かす
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>17</td>
                                        <td>プロアクティブな通知</td>
                                        <td>
                                            問題が深刻化する前に検知し、関係者に知らせる仕組みを作る
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>18</td>
                                        <td>WIP制限</td>
                                        <td>同時進行のタスク数を制限し、フローを改善する</td>
                                    </tr>
                                    <tr>
                                        <td>19</td>
                                        <td>作業の可視化</td>
                                        <td>
                                            かんばんボードなどで作業状況とボトルネックを見える化する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.5 組織文化の能力(5項目)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">能力</th>
                                        <th scope="col">要点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>20</td>
                                        <td>Westrum型組織文化</td>
                                        <td>
                                            情報が自由に流れる「生成的文化」を醸成する(SECTION
                                            05で詳述)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>21</td>
                                        <td>学習の支援</td>
                                        <td>
                                            学習をコストではなく投資として捉え、時間と機会を提供する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>22</td>
                                        <td>チーム間のコラボレーション</td>
                                        <td>開発・運用・セキュリティなど職能を超えた協働を促す</td>
                                    </tr>
                                    <tr>
                                        <td>23</td>
                                        <td>有意義な仕事と裁量権</td>
                                        <td>
                                            挑戦しがいのある仕事を任せ、スキルを発揮できる裁量を与える
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>24</td>
                                        <td>変革型リーダーシップ</td>
                                        <td>
                                            ビジョンを示し、知的刺激を与え、個々への配慮を行うリーダーシップ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            なお、DORAチームは書籍出版後も研究を継続しており、2021年時点で能力カタログは27項目まで拡張され、その後もプラットフォームエンジニアリングやドキュメント品質など新たな能力が追加され続けています(最新のカタログは公式サイト
                            dora.dev で公開されています)。
                        </p>
                    </section>

                    {/* ===================== 5. Westrum Culture Model ===================== */}
                    <section id="westrum-culture" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-users" aria-hidden="true" />
                            SECTION 05
                        </div>
                        <h2>組織文化を科学する: Westrumモデル</h2>

                        <p>
                            Accelerateの中でも特に印象的なのが、組織文化を定量的に扱った第3章です。著者らは、航空業界や医療分野など高リスク・高信頼性が求められる領域の事故分析を専門とする社会学者Ron
                            Westrum氏が提唱した組織文化の類型論を応用しています。Westrum氏の理論は「良い情報がどれだけ組織内を流れるか」が安全性とパフォーマンスを予測するという考え方に基づいています。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">文化のタイプ</th>
                                        <th scope="col">志向</th>
                                        <th scope="col">協力の度合い</th>
                                        <th scope="col">悪い知らせを伝えた人への対応</th>
                                        <th scope="col">失敗への反応</th>
                                        <th scope="col">新しい発想への反応</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>病理的(Pathological)</td>
                                        <td>権力志向</td>
                                        <td>低い協力</td>
                                        <td>messenger(伝達者)が罰せられる</td>
                                        <td>責任のなすりつけ</td>
                                        <td>潰される</td>
                                    </tr>
                                    <tr>
                                        <td>官僚的(Bureaucratic)</td>
                                        <td>規則志向</td>
                                        <td>中程度の協力</td>
                                        <td>messengerが無視される</td>
                                        <td>公正な処理にとどまる</td>
                                        <td>問題視される</td>
                                    </tr>
                                    <tr>
                                        <td>生成的(Generative)</td>
                                        <td>成果志向</td>
                                        <td>高い協力</td>
                                        <td>messengerが育成・歓迎される</td>
                                        <td>原因究明の機会になる</td>
                                        <td>積極的に実装される</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            DORAの研究によれば、この「生成的文化」の度合いを測るWestrum調査項目(情報が積極的に求められているか、失敗が改善の機会として扱われているかなど6つの設問)は統計的に妥当性・信頼性が高く、生成的文化のスコアが高い組織ほど、ソフトウェアデリバリのパフォーマンスだけでなく組織パフォーマンス全体、さらには従業員の燃え尽き症候群の低減とも相関することが示されています。
                        </p>

                        <p>
                            重要なのは、著者らが「文化は謎めいた魔法ではなく、具体的なプラクティスを実装することで醸成できる」と主張している点です。つまり、良い文化を「待つ」のではなく、24の能力に挙げた具体的な行動(軽量な変更承認、学習支援、フィードバックの奨励など)を実践することによって、後から文化がついてくるという順序が示唆されています。
                        </p>
                    </section>

                    {/* ===================== 6. Step-by-step Guide ===================== */}
                    <section id="step-by-step-guide" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-route" aria-hidden="true" />
                            SECTION 06
                        </div>
                        <h2>初学者向けステップバイステップ実践ガイド</h2>

                        <p>
                            ここからは、Accelerateの知見を実際のチーム・組織に導入する際の実践的な順序を、初学者向けに段階を追って解説します。すべてを一度に導入する必要はありません。多くの高パフォーマンス組織も、小さな一歩から始めて継続的に改善を積み重ねています。
                        </p>

                        <h3>ステップ0: 現状を診断する</h3>
                        <p>
                            いきなり施策を始める前に、自分たちのチームが今どの位置にいるかを把握しましょう。DORA公式サイトが提供する「DORA
                            Quick
                            Check」のような簡易診断ツールを使えば、数問の質問に答えるだけでデプロイ頻度・リードタイム・変更失敗率などの現在地を業界水準と比較できます。診断結果は「どの能力から着手すべきか」の優先順位づけに役立ちます。
                        </p>

                        <h3>ステップ1: バージョン管理と作業の可視化から始める</h3>
                        <ul>
                            <li>
                                アプリケーションコードだけでなく、インフラ構成やデプロイスクリプトもすべてバージョン管理下に置きましょう。
                            </li>
                            <li>
                                かんばんボードなどで、今誰が何に取り組んでいるかをチーム全体が見える状態にします。
                            </li>
                            <li>
                                これは低コストで着手でき、後続のすべてのステップの土台になります。
                            </li>
                        </ul>

                        <h3>ステップ2: テストを自動化する</h3>
                        <ul>
                            <li>
                                手動テストへの依存は、リリースを遅らせる最大の要因のひとつです。
                            </li>
                            <li>
                                信頼できる自動テストスイートを段階的に構築し、「テストが通れば安心してリリースできる」状態を目指します。
                            </li>
                            <li>
                                テストデータの管理方法(本番データのマスキングやテスト用データセットの整備)も合わせて検討します。
                            </li>
                        </ul>

                        <h3>ステップ3: 継続的インテグレーションとトランクベース開発を導入する</h3>
                        <p>
                            継続的インテグレーション(CI)は、変更を頻繁に共有ブランチ(トランク /
                            main)へ統合し、その都度自動ビルド・自動テストを走らせるプラクティスです。ThoughtWorksのチーフサイエンティストであるMartin
                            Fowler氏は、長年にわたり長命なフィーチャーブランチの弊害について発信しています。統合の頻度が低いほどマージ時に扱う差分が大きくなり、マージの複雑さと、コンフリクトや不具合を招くリスクが高まります。DORAの調査でも、ブランチの生存期間が1日未満であることや、アクティブなブランチ数が少ないことが継続的デリバリの重要な要素であることが確認されています。
                        </p>

                        <div className="diagram-card">
                            <div className="diagram-container" id="ciCdPipeline">
                                <Diagram
                                    id="ciCdPipeline"
                                    label="トランクベース開発とCI/CDパイプラインのフィードバックループ"
                                />
                            </div>
                            <div className="diagram-caption">
                                トランクベース開発とCI/CDパイプラインのフィードバックループ
                            </div>
                        </div>

                        <p>
                            トランクベース開発を実践するうえでの代表的なテクニックには、次のようなものがあります。
                        </p>
                        <ul>
                            <li>
                                <strong>フィーチャートグル(Feature Toggle):</strong> Martin
                                Fowler氏が体系化した手法で、未完成の機能をコードごとトランクにマージしつつ、フラグで有効・無効を切り替えることで、機能公開のタイミングと統合のタイミングを分離します。
                            </li>
                            <li>
                                <strong>Branch by Abstraction:</strong>{' '}
                                大規模な変更を、抽象化レイヤーを介して段階的にトランク上で進める手法です。
                            </li>
                            <li>
                                <strong>短命なブランチ:</strong>{' '}
                                どうしてもブランチを切る場合も、1日以内にマージすることを目安にします。
                            </li>
                        </ul>
                        <p>
                            トランクベース開発の実践に関する詳細な技法集は、Paul
                            Hammant氏が運営するtrunkbaseddevelopment.comにも豊富にまとめられています。
                        </p>

                        <h3>ステップ4: デプロイを自動化し、継続的デリバリを実現する</h3>
                        <ul>
                            <li>
                                手動デプロイの手順書は、いずれ自動化スクリプトに置き換えましょう。
                            </li>
                            <li>
                                目指すゴールは「いつでも、誰でも、安全に、ボタン一つでデプロイできる」状態です。
                            </li>
                            <li>
                                継続的デリバリが実現すると、リリースは「特別なイベント」ではなく「日常の作業」になります。
                            </li>
                        </ul>

                        <h3>ステップ5: 疎結合アーキテクチャとチームの自律性を整える</h3>
                        <ul>
                            <li>
                                他チームの成果物と密結合したアーキテクチャは、変更のたびに広範な調整を必要とし、デプロイ頻度を下げます。
                            </li>
                            <li>
                                サービス指向・マイクロサービス的な設計への移行は、一度に全面刷新する必要はなく、段階的に進められます。
                            </li>
                            <li>
                                あわせて、チームがツールや技術スタックを自律的に選択できる権限を持つことも、パフォーマンスに寄与することが示されています。
                            </li>
                        </ul>

                        <h3>ステップ6: 小さなバッチで作業し、顧客フィードバックを取り込む</h3>
                        <ul>
                            <li>
                                大きな機能を一括でリリースするのではなく、小さな単位に分割して頻繁にリリースします。
                            </li>
                            <li>
                                バリューストリーム全体(アイデアから本番稼働まで)を可視化し、どこで作業が滞留しているかを特定します。
                            </li>
                            <li>
                                顧客からのフィードバックを定期的に収集し、プロダクトの意思決定サイクルに組み込みます。
                            </li>
                        </ul>

                        <h3>ステップ7: リーン管理プラクティスを導入する</h3>
                        <ul>
                            <li>
                                変更承認プロセスは、重厚な承認会議体(CAB: Change Advisory
                                Board)ではなく、ピアレビューと自動化されたチェックを軸にします。DORAの2019年調査では、こうした軽量な承認プロセスの方が、重厚なプロセスよりも高いパフォーマンスと相関することが示されています。
                            </li>
                            <li>
                                WIP(仕掛かり作業)に上限を設け、同時に着手するタスクを絞り込みます。
                            </li>
                            <li>
                                アプリケーションとインフラの両方を横断的にモニタリングし、問題をプロアクティブに検知・通知する仕組みを整えます。
                            </li>
                        </ul>

                        <h3>ステップ8: 生成的な組織文化を醸成する</h3>
                        <ul>
                            <li>
                                情報が自由に流れ、失敗が「誰の責任か」ではなく「システムのどこに改善余地があるか」を学ぶ機会として扱われる文化を目指します。
                            </li>
                            <li>
                                学習を「コスト」ではなく「投資」として位置づけ、時間とリソースを確保します。
                            </li>
                            <li>リーダーは明確なビジョンを示し、現場への権限委譲を進めます。</li>
                        </ul>

                        <p>
                            以上のステップは、一直線に一度きり実行するものではなく、継続的な計測と学習のサイクルとして繰り返し回していくものです。
                        </p>

                        <div className="diagram-card">
                            <div className="diagram-container" id="roadmapPhases">
                                <Diagram
                                    id="roadmapPhases"
                                    label="6フェーズの実践ロードマップと継続的な計測・学習のサイクル"
                                />
                            </div>
                            <div className="diagram-caption">
                                6フェーズの実践ロードマップと継続的な計測・学習のサイクル
                            </div>
                        </div>
                    </section>

                    {/* ===================== 7. AI-era Update 2026 ===================== */}
                    <section id="ai-era-update-2026" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-refresh" aria-hidden="true" />
                            SECTION 07
                        </div>
                        <h2>2026年時点のアップデート: AI支援開発とDORAの進化</h2>

                        <p>
                            Accelerateの刊行から数年が経ち、生成AIによるコーディング支援が急速に普及したことを受け、DORAチームは2025年、年次報告書のテーマを従来の「State
                            of DevOps」から
                            <strong>「State of AI-assisted Software Development」</strong>
                            へと大きく転換しました。これは、ほぼ5,000人の技術専門家への調査と100時間超の定性データに基づく調査で、次のような知見が示されています。
                        </p>

                        <ul>
                            <li>
                                <strong>AIは「増幅器(amplifier)」として働く</strong>
                                という中心的な主張が最大の発見です。既にハイパフォーマンスな組織ではAIがさらなる強みを増幅し、逆に技術的負債やプロセスの混乱を抱える組織では、AIがその機能不全を増幅してしまう、という「鏡」のような性質が確認されました。
                            </li>
                            <li>
                                AI導入率は2025年時点で90%に達し、前年から14ポイント増加しています。1日あたりの利用時間の中央値は約2時間で、主な用途は新規コード作成(71%)、技術文献の調査(68%)、既存コードの修正(66%)、校正(66%)、コードレビュー(55%)などです。
                            </li>
                            <li>
                                2025年の調査では、AI導入とスループット(デプロイ頻度など)の間に正の相関が確認されました。これは、2024年の調査でAI導入がスループットにわずかな負の影響を与えていたとされた結果からの反転です。一方で、AI導入は依然として変更失敗率や手戻り(リワーク)の増加、すなわち安定性の低下と相関しており、「速くはなったが、より良くなったとは限らない」という課題が指摘されています。
                            </li>
                            <li>
                                こうした不安定化の一因として、AIが生成したコードのレビュー・検証にかかる認知的負荷(いわゆる「検証税」)が、コーディング自体で節約された時間を相殺し、ボトルネックがテストやコードレビューといった下流工程へ移動している可能性が挙げられています。
                            </li>
                            <li>
                                報告書は、AIから真の価値を引き出せるかどうかは、ツールそのものよりも
                                <strong>内部プラットフォームの品質</strong>
                                に強く左右されると結論づけています。プラットフォーム品質が低い組織ではAIの効果はほぼ無視できる水準にとどまる一方、プラットフォーム品質が高い組織では、AIの効果が明確かつ強く現れます。
                            </li>
                            <li>
                                あわせて公表された「DORA AI Capabilities
                                Model」では、AIの恩恵を増幅する7つの能力が提示されています。また、チームを7つの「アーキタイプ(類型)」(例:
                                調和のとれたハイアチーバー「harmonious
                                high-achievers」から、レガシーの足かせを抱える「legacy
                                bottleneck」まで)に分類し、それぞれに適した改善の道筋を示す枠組みも導入されました。
                            </li>
                            <li>
                                <strong>バリューストリームマネジメント(VSM)</strong>
                                、すなわち企画から顧客への価値提供までの流れを可視化・改善する取り組みが、AIによる個々の生産性向上をチーム・プロダクトレベルの成果へとつなげる「増幅器の増幅器」として機能することも示されています。
                            </li>
                            <li>
                                <strong>
                                    2026年4月22日には、続編にあたる「ROI of AI-assisted Software
                                    Development」(v.2026.1)が公開されました。
                                </strong>{' '}
                                これは「AIは生産性を上げるのか」ではなく「その効果を金額としてどう測るのか」へ問いを移した報告書で、Google
                                CloudのDORAチームとGoogle Cloud Consultingのdelta innovation
                                practiceによる共著です。実務上の要点は次の3点です。
                                <ul>
                                    <li>
                                        <strong>
                                            初期の生産性低下(J-Curve)を前提として織り込む
                                        </strong>
                                        :
                                        AI導入の直後は、学習コスト、生成コードを検証する「検証税」、パイプラインの適応コストによって生産性が一時的に落ち込みます。報告書はこれを変革の「授業料(tuition
                                        cost)」と位置づけ、避けるべき失敗ではなく、あらかじめ予算と期待値に組み込むべき投資として扱うよう促しています。
                                    </li>
                                    <li>
                                        <strong>ROIを金額へ翻訳する枠組みと公式の計算ツール</strong>
                                        :
                                        エンジニアリング指標をビジネス価値へ変換する計算モデルと、自社の前提値を入力できる対話型のROI計算ツールが提供されています。著者らは保守的・現実的・楽観的の3シナリオを試算し、単一の数値ではなく「幅」として財務部門と合意することを推奨しています。
                                    </li>
                                    <li>
                                        <strong>取り戻した能力の再投資こそが最大のリターン</strong>:
                                        最も大きな利得は、ツールそのものではなく、不要な手戻り(リワーク)を削減してエンジニアリングの余力(capacity)を取り戻し、それを再投資することで、人員を増やさずにチームの産出量を広げる点から生まれると結論づけています。これは前述の「AIは増幅器である」という2025年の知見を、金額の観点から裏づけるものです。
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <div className="diagram-card">
                            <div className="diagram-container" id="aiAmplifier">
                                <Diagram
                                    id="aiAmplifier"
                                    label="AIコーディング支援は組織の既存の強みや弱みを増幅する"
                                />
                            </div>
                            <div className="diagram-caption">
                                AIコーディング支援は組織の既存の強みや弱みを増幅する
                            </div>
                        </div>

                        <p>
                            さらに指標体系そのものも進化を続けています。2024年の報告書で変更失敗率から「デプロイのリワーク率」が分離されて以降、DORAは2026年に入っても指標体系のアップデートを続けており、公式サイトでは「4つの鍵指標から現行の5指標モデルへの移行」の経緯を解説する記事が公開されています。また2026年6月には、AIのトークン消費量そのものを成果指標として奨励する「tokenmaxxing」という風潮に対して、DORAチームが注意を促す記事を公開するなど、AI時代特有の計測上の落とし穴についても継続的に情報発信が行われています。
                        </p>

                        <div className="callout note">
                            <div className="callout-title">
                                <i className="ti ti-info-circle" aria-hidden="true" />
                                補足
                            </div>{' '}
                            <p>
                                <strong>補足:</strong>{' '}
                                本ガイドの知識のカットオフ以降も、DORAの研究は継続的にアップデートされています。最新の指標定義や能力カタログを確認したい場合は、公式サイト
                                dora.dev を直接参照することをお勧めします。
                            </p>
                        </div>
                    </section>

                    {/* ===================== 8. Anti-patterns ===================== */}
                    <section id="anti-patterns" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-alert-triangle" aria-hidden="true" />
                            SECTION 08
                        </div>
                        <h2>よくある誤解とアンチパターン</h2>

                        <p>Accelerateの知見を導入する際に陥りやすい誤解を整理します。</p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">アンチパターン</th>
                                        <th scope="col">なぜ問題か</th>
                                        <th scope="col">代替アプローチ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DORAメトリクスでチームや個人を序列化する</td>
                                        <td>
                                            DORAチーム自身が2023年に警鐘を鳴らした誤用。Goodhartの法則により数値の水増しを招く
                                        </td>
                                        <td>
                                            自チームの過去の実績との比較にとどめ、改善のための対話の起点として使う
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>指標だけを追い、24の能力(実践)を導入しない</td>
                                        <td>
                                            指標は結果であり、原因である実践を変えなければ改善しない
                                        </td>
                                        <td>
                                            まず能力(バージョン管理、CI、トランクベース開発など)の導入から着手する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>デプロイ頻度だけを上げようとする</td>
                                        <td>
                                            スループットだけを追うと、不安定性の悪化を見過ごした「見せかけの改善」になりかねない
                                        </td>
                                        <td>
                                            スループットの向上と不安定性の低減を同時に計測・改善する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>文化を「自然に生まれるもの」として放置する</td>
                                        <td>
                                            Accelerateは文化を具体的なプラクティスの結果として捉えている
                                        </td>
                                        <td>
                                            軽量な変更承認や学習支援など、文化を醸成する行動から着手する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AI導入を「ツールを配るだけ」で終わらせる</td>
                                        <td>
                                            2025年のDORA調査で、プラットフォーム品質が低いとAIの効果はほぼ無いことが判明
                                        </td>
                                        <td>
                                            AI導入前後で内部プラットフォームやワークフローの整備に投資する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ===================== 9. Summary Checklist ===================== */}
                    <section id="summary-checklist" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-flag-3" aria-hidden="true" />
                            SECTION 09
                        </div>
                        <h2>まとめ: 実践チェックリスト</h2>

                        <ul>
                            <li>
                                自チームの現状(デプロイ頻度・リードタイム・変更失敗率・失敗したデプロイの復旧時間・リワーク率)を把握した
                            </li>
                            <li>
                                アプリケーションコードとインフラ構成の両方をバージョン管理下に置いた
                            </li>
                            <li>自動テストスイートを整備し、手動テストへの依存を減らしている</li>
                            <li>
                                トランクベース開発とCIを導入し、ブランチの生存期間を1日未満に抑えている
                            </li>
                            <li>デプロイを自動化し、継続的デリバリの状態に近づけている</li>
                            <li>アーキテクチャの疎結合化とチームの自律性向上に取り組んでいる</li>
                            <li>
                                小さなバッチでの作業と顧客フィードバックの取り込みを実践している
                            </li>
                            <li>変更承認プロセスを軽量化し、WIPを制限し、作業を可視化している</li>
                            <li>
                                生成的な組織文化(情報の自由な流れ、学習支援、心理的安全性)を意識的に醸成している
                            </li>
                            <li>
                                AIを導入する際は、ツール単体ではなくプラットフォーム品質やワークフロー全体に投資している
                            </li>
                        </ul>

                        <p>
                            Accelerateがもたらした最大の教訓は、「ソフトウェアデリバリのパフォーマンスは、運や才能ではなく、具体的で再現可能なプラクティスの積み重ねによって高められる」という点です。本ガイドで紹介したステップを、自分たちのチームの状況に合わせて少しずつ取り入れてみてください。
                        </p>
                    </section>

                    {/* ===================== 10. References ===================== */}
                    <section id="references" tabIndex={-1}>
                        <div className="section-eyebrow">
                            <i className="ti ti-link" aria-hidden="true" />
                            SECTION 10
                        </div>
                        <h2>参考文献・出典</h2>

                        <p>
                            本ガイドの作成にあたり、2026年8月24日時点で参照可能な以下の情報源を調査しました(DORA公式・Google
                            Cloud公式・著名なソフトウェアエンジニアや組織による発信を優先しています)。
                        </p>

                        <div className="ref-group">
                            <h4>DORA公式・Google Cloud</h4>
                            <ul className="ref-list">
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(DevOps Capabilities カタログ)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/devops-capabilities/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/devops-capabilities/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(Capabilities: Generative organizational
                                        culture)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/capabilities/generative-organizational-culture/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/capabilities/generative-organizational-culture/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(DORAの指標体系の歴史)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/insights/dora-metrics-history/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/insights/dora-metrics-history/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(ソフトウェアデリバリのパフォーマンス指標ガイド)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/guides/dora-metrics-four-keys/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/guides/dora-metrics-four-keys/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(Capabilities: Trunk-based development)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/capabilities/trunk-based-development/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/capabilities/trunk-based-development/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(Capabilities: Platform engineering)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/capabilities/platform-engineering/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/capabilities/platform-engineering/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">DORA公式サイト(2025年次まとめ)</span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/insights/dora-2025-year-in-review/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/insights/dora-2025-year-in-review/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(2025 State of AI-assisted Software
                                        Development)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/dora-report-2025/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/dora-report-2025/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Google Cloud Blog(2025 DORA Report発表)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Google Blog(2025 DORA Reportの主要な発見)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(ROI of AI-assisted Software Development
                                        report、v.2026.1、2026年4月22日公開)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/ai/roi/report/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/ai/roi/report/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(AI関連リサーチとROI計算ツールのハブ)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/ai/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        DORA公式サイト(Finding balance in the era of
                                        tokenmaxxing、2026年6月2日公開)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://dora.dev/insights/finding-balance-in-the-era-of-tokenmaxxing/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://dora.dev/insights/finding-balance-in-the-era-of-tokenmaxxing/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h4>書籍・出版社(IT Revolution)</h4>
                            <ul className="ref-list">
                                <li>
                                    <span className="ref-name">
                                        IT Revolution(書籍『Accelerate』紹介ページ)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://itrevolution.com/product/accelerate/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://itrevolution.com/product/accelerate/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        IT Revolution(24の主要能力の解説記事)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://itrevolution.com/articles/24-key-capabilities-to-drive-improvement-in-software-delivery/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://itrevolution.com/articles/24-key-capabilities-to-drive-improvement-in-software-delivery/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        IT Revolution(AIの「鏡効果」に関する分析記事)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://itrevolution.com/articles/ais-mirror-effect-how-the-2025-dora-report-reveals-your-organizations-true-capabilities/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://itrevolution.com/articles/ais-mirror-effect-how-the-2025-dora-report-reveals-your-organizations-true-capabilities/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h4>百科事典</h4>
                            <ul className="ref-list">
                                <li>
                                    <span className="ref-name">Wikipedia(Accelerate (book))</span>
                                    <a
                                        className="ref-url"
                                        href="https://en.wikipedia.org/wiki/Accelerate_(book)"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://en.wikipedia.org/wiki/Accelerate_(book)
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Wikipedia(DevOps Research and Assessment)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://en.wikipedia.org/wiki/DevOps_Research_and_Assessment"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://en.wikipedia.org/wiki/DevOps_Research_and_Assessment
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h4>継続的デリバリ・トランクベース開発の一次情報</h4>
                            <ul className="ref-list">
                                <li>
                                    <span className="ref-name">
                                        Martin Fowler公式サイト(Patterns for Managing Source Code
                                        Branches)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://martinfowler.com/articles/branching-patterns.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://martinfowler.com/articles/branching-patterns.html
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Martin Fowler公式サイト(Continuous Integration)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://martinfowler.com/articles/continuousIntegration.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://martinfowler.com/articles/continuousIntegration.html
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        continuousdelivery.com(Jez Humble, Continuous
                                        Integration解説)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://continuousdelivery.com/foundations/continuous-integration/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://continuousdelivery.com/foundations/continuous-integration/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Paul Hammant氏によるトランクベース開発の解説
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://paulhammant.com/2013/04/05/what-is-trunk-based-development/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://paulhammant.com/2013/04/05/what-is-trunk-based-development/
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h4>ThoughtWorks</h4>
                            <ul className="ref-list">
                                <li>
                                    <span className="ref-name">
                                        ThoughtWorks(Four Key Metricsに関するビジネス価値の解説)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://www.thoughtworks.com/en-us/insights/articles/improving-your-bottom-line-with-four-key-metrics"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.thoughtworks.com/en-us/insights/articles/improving-your-bottom-line-with-four-key-metrics
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        ThoughtWorks(2025 DORA Reportに関する解説)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://www.thoughtworks.com/en-us/insights/reports/the-2025-dora-report"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.thoughtworks.com/en-us/insights/reports/the-2025-dora-report
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        ThoughtWorks(トランクベース開発とデプロイパイプライン)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://www.thoughtworks.com/insights/blog/enabling-trunk-based-development-deployment-pipelines"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.thoughtworks.com/insights/blog/enabling-trunk-based-development-deployment-pipelines
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <h4>コミュニティ・分析記事</h4>
                            <ul className="ref-list">
                                <li>
                                    <span className="ref-name">
                                        Luca Rossi(Refactoring)による書籍レビュー・24能力の解説
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://refactoring.fm/p/accelerate"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://refactoring.fm/p/accelerate
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Swarmia(DORAメトリクスの実践ガイド)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://www.swarmia.com/blog/dora-metrics/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.swarmia.com/blog/dora-metrics/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Splunk(2025 DORA Reportのレビュー記事)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://www.splunk.com/en_us/blog/learn/state-of-devops.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.splunk.com/en_us/blog/learn/state-of-devops.html
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        CD Foundation(DORA 4指標から5指標への変化の解説)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://cd.foundation/blog/2025/10/16/dora-5-metrics/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://cd.foundation/blog/2025/10/16/dora-5-metrics/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Software
                                        Meadows(『Accelerate』チャプター別ノート、24能力の一覧)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://www.softwaremeadows.com/devops/accelerate_notes_and_quotes/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.softwaremeadows.com/devops/accelerate_notes_and_quotes/
                                    </a>
                                </li>
                                <li>
                                    <span className="ref-name">
                                        Psych Safety(Westrumの組織文化類型論の解説)
                                    </span>
                                    <a
                                        className="ref-url"
                                        href="https://psychsafety.com/psychological-safety-81-westrums-cultural-typologies/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://psychsafety.com/psychological-safety-81-westrums-cultural-typologies/
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <footer>
                        本ガイドはAccelerateおよびDORA公式資料をもとに作成した非公式の解説記事です。&middot;
                        2026年8月時点の情報にもとづきます。
                    </footer>
                </main>
            </div>
        </div>
    );
};
