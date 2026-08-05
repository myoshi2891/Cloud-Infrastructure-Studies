import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

/**
 * Diagram - 図表を ID で解決して MermaidDiagram を描画するコンポーネント。
 * DIAGRAMS 定数から指定された ID のチャート文字列を取得し、存在しない場合は非表示 (null) にする責務を担う。
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-card">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

/**
 * CcdeGuide - Cisco CCDE（Cisco Certified Design Expert）認定 完全ガイドのルートコンポーネント。
 * NavBar とガイド全体の各セクション（試験範囲、費用、ロードマップ、用語集、FAQ等）を組み立てる Server Component。
 */
export default function CcdeGuide() {
    return (
        <>
            <NavBar />
            <div className="ccde-guide-page">
                {/* ============ TITLE BLOCK ============ */}
                <div className="titleblock">
                    <div className="titleblock-top">
                        <p className="titleblock-eyebrow">
                            Cisco Certification Blueprint / 認定資格 解説図面
                        </p>
                        <h1 className="titleblock-title">
                            CCDE（Cisco Certified Design Expert）認定 完全ガイド
                        </h1>
                        <p className="titleblock-sub">
                            初学者のためのステップバイステップ解説 ―
                            全体像・試験構成・出題範囲・再認定までを1枚に整理
                        </p>
                    </div>
                    <div className="titleblock-grid">
                        <div className="tb-field">
                            <span className="tb-label">対象試験</span>
                            <span className="tb-value">400-007（筆記）+ 実技試験</span>
                        </div>
                        <div className="tb-field">
                            <span className="tb-label">現行バージョン</span>
                            <span className="tb-value">CCDE v3.1</span>
                        </div>
                        <div className="tb-field">
                            <span className="tb-label">認定レベル</span>
                            <span className="tb-value">Expert（最上位）</span>
                        </div>
                        <div className="tb-field">
                            <span className="tb-label">有効期間</span>
                            <span className="tb-value">3年</span>
                        </div>
                    </div>
                </div>

                {/* ============ HERO ============ */}
                <div className="hero">
                    <h1>
                        ネットワークという都市の、<br />
                        <span className="accent">青写真</span>を描く資格。
                    </h1>
                    <p>
                        CCDEは、特定の製品や設定手順ではなく「複雑なネットワークをどう設計し、どうアーキテクチャとして組み立てるか」を問う、Cisco認定資格の中でも最上位クラス（Expertレベル）の資格です。このガイドでは、公式情報をもとに、前提知識ゼロの状態からでも全体像がつかめるように、試験の仕組みを順番に解説していきます。
                    </p>
                </div>

                {/* ============ TOC ============ */}
                <nav className="toc" aria-label="目次ナビゲーション">
                    <p className="toc-title">目次 / Index</p>
                    <ol>
                        <li>
                            <a href="#what-is-ccde">1. CCDEとは何か</a>
                        </li>
                        <li>
                            <a href="#overall-flow">2. 認定までの全体フロー</a>
                        </li>
                        <li>
                            <a href="#prerequisites">3. 受験資格・推奨される経験</a>
                        </li>
                        <li>
                            <a href="#step1-written">4. STEP1：筆記試験（400-007）</a>
                        </li>
                        <li>
                            <a href="#step2-practical">5. STEP2：実技試験</a>
                        </li>
                        <li>
                            <a href="#certifications-earned">6. 合格後に得られる認定</a>
                        </li>
                        <li>
                            <a href="#costs">7. 費用まとめ</a>
                        </li>
                        <li>
                            <a href="#recertification">8. 再認定（3年ごと）</a>
                        </li>
                        <li>
                            <a href="#roadmap">9. 初学者向け学習ロードマップ</a>
                        </li>
                        <li>
                            <a href="#glossary">10. 初学者のための用語辞典</a>
                        </li>
                        <li>
                            <a href="#faq">11. よくある質問</a>
                        </li>
                        <li>
                            <a href="#sources">12. 参考情報源</a>
                        </li>
                    </ol>
                </nav>

                {/* ============ 1. CCDEとは ============ */}
                <section className="sheet" id="what-is-ccde">
                    <div className="sheet-head">
                        <div className="sheet-num">01</div>
                        <div>
                            <span className="sheet-eyebrow">Overview</span>
                            <h2>CCDEとは何か</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            CCDEは、複雑なエンタープライズ
                            ネットワークを設計し、アーキテクチャとして構築するスキルを証明する、Cisco認定資格の最上位カテゴリ「Expert」に属する資格です。実装や運用そのものよりも、ビジネス要件と技術要件を整理し、拡張性・回復性・コストなどの複数の観点からトレードオフを判断して「設計を決定し、その根拠を説明する」能力が問われます。
                        </p>
                        <p>
                            取得を目指す代表的な職種としては、ソリューションアーキテクト、ネットワークアーキテクト、ネットワークデザイナーなどが挙げられており、シニアレベルやリーダー職を目指すエンジニアの多くが取得を検討する資格として位置づけられています。
                        </p>
                        <h3>CCIEとの違い（ざっくりしたイメージ）</h3>
                        <p>
                            同じExpertレベルの資格であるCCIEが「特定技術領域を実装・運用できる力」を検証するのに対し、CCDEは特定のベンダー技術に閉じず「ネットワーク全体の設計判断ができる力」を検証する、という役割分担で語られることが多い資格です。どちらが上位というより、実装寄りか設計寄りかという専門性の違いだと捉えると理解しやすくなります。
                        </p>
                    </div>
                </section>

                {/* ============ 2. 全体フロー ============ */}
                <section className="sheet" id="overall-flow">
                    <div className="sheet-head">
                        <div className="sheet-num">02</div>
                        <div>
                            <span className="sheet-eyebrow">Big Picture</span>
                            <h2>認定までの全体フロー</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            CCDE認定を取得するまでの流れは、大きく分けて「筆記試験」と「実技試験」の2段階です。まずは全体像を1枚のフローチャートで確認しましょう。
                        </p>

                        <Diagram id="diag-1" label="CCDE認定 取得フロー全体像" />

                        <p className="diagram-caption">
                            <span className="cap-label">図1：CCDE認定 取得フロー全体像</span>
                            <a href="#sources">
                                出典：Cisco公式CCDEページ／Exams and Trainingページ（参考情報源 [2][3]
                                参照）
                            </a>
                        </p>

                        <p>
                            ポイントは、実技試験を受ける前に「4つのエレクティブ（専門領域）」から1つを選ぶ必要があること、そして筆記試験の合格だけでも独立した認定（Specialist）が得られることです。この2点は初学者がつまずきやすいポイントなので、次の章以降で詳しく見ていきます。
                        </p>
                    </div>
                </section>

                {/* ============ 3. 受験資格 ============ */}
                <section className="sheet" id="prerequisites">
                    <div className="sheet-head">
                        <div className="sheet-num">03</div>
                        <div>
                            <span className="sheet-eyebrow">Eligibility</span>
                            <h2>受験資格・推奨される経験</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            CCDEには「この資格を持っていないと受験できない」という正式な前提条件はありません。ただし、試験内容そのものが非常に高度であるため、受験前に出題範囲を十分に理解しておくことが強く推奨されています。
                        </p>

                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">公式な前提資格</th>
                                        <td>なし（オープンな受験資格）</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">推奨される実務経験</th>
                                        <td>
                                            ネットワークの設計・アーキテクチャ構築、プリセールスなど関連業務における
                                            5〜7年程度の経験
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">想定される受験者像</th>
                                        <td>
                                            シニアネットワークエンジニア／ソリューションアーキテクト／ネットワークアーキテクトを目指す人
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccde.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cisco公式 CCDEページ（日本語）
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE Overview（英語）
                            </a>
                        </p>

                        <div className="callout">
                            <strong>初学者向けメモ：</strong>
                            「前提資格がない＝簡単」ではありません。実際には出題範囲そのものが実務経験を前提にした内容であるため、経験が浅い段階でいきなり合格を狙うのは現実的ではない、という点は理解しておきましょう。
                        </div>
                    </div>
                </section>

                {/* ============ 4. STEP1 筆記試験 ============ */}
                <section className="sheet" id="step1-written">
                    <div className="sheet-head">
                        <div className="sheet-num">04</div>
                        <div>
                            <span className="sheet-eyebrow">Step 1 / Written Exam</span>
                            <h2>筆記試験（400-007 CCDE v3.1）</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            最初の関門となるのが、試験コード「400-007」と呼ばれる筆記試験です。2時間の選択式試験で、90〜110問が出題されます。ネットワーク設計、テクノロジー、ビジネス要件と技術要件に基づいた仕様の作成、事業戦略といった領域の知識・スキルに焦点を当てた試験です。
                        </p>

                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">試験コード</th>
                                        <td className="num">400-007（CCDE v3.1）</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">試験時間</th>
                                        <td className="num">2時間（120分）</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">出題形式</th>
                                        <td>選択式（クローズドブック・参考資料の持ち込み不可）</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">問題数</th>
                                        <td className="num">90〜110問</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">試験言語</th>
                                        <td>英語のみ</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">受験費用の目安</th>
                                        <td className="num">
                                            US$450（Cisco Learning Creditsでの支払いも可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">実施会場</th>
                                        <td>Pearson VUEテストセンター</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">合格後に得られるもの</th>
                                        <td>Cisco Certified Design Expert Specialist 認定</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/current-list/400-007-ccde.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                400-007 CCDE 試験ページ
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE Exams and Training
                            </a>
                        </p>

                        <h3>出題範囲（5つのドメイン）</h3>
                        <p>
                            筆記試験の出題範囲は、Cisco公式の「Unified Exam
                            Topics」で5つのドメインに整理されており、それぞれに配点比率（重み）が決まっています。
                        </p>

                        <Diagram id="diag-2" label="筆記試験ドメイン別の配点比率" />

                        <p className="diagram-caption">
                            <span className="cap-label">図2：筆記試験ドメイン別の配点比率</span>
                            <span>
                                出典：Cisco公式「CCDE v3.1 Unified Exam Topics」（参考情報源 [5]
                                参照）
                            </span>
                        </p>

                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col" className="num">
                                            No.
                                        </th>
                                        <th scope="col">ドメイン</th>
                                        <th scope="col" className="num">
                                            配点
                                        </th>
                                        <th scope="col">主な内容（例）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="num">1.0</td>
                                        <th scope="row">ビジネス戦略設計</th>
                                        <td className="num">15%</td>
                                        <td>
                                            プロジェクト管理手法（Waterfall／Agile）の設計への影響、事業継続性、環境的持続可能性、AI／機械学習のビジネス観点
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="num">2.0</td>
                                        <th scope="row">
                                            制御・データ・管理プレーンと運用設計
                                        </th>
                                        <td className="num">25%</td>
                                        <td>
                                            エンドツーエンドのトラフィックフロー、自動化・オーケストレーション、SD-WANやコントローラベースのアーキテクチャ、可観測性（Observability）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="num">3.0</td>
                                        <th scope="row">ネットワーク設計</th>
                                        <td className="num">30%</td>
                                        <td>
                                            回復性・拡張性・セキュアなモジュール型ネットワーク設計、移行／変革計画、AIを活用したネットワーク設計ユースケース
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="num">4.0</td>
                                        <th scope="row">サービス設計</th>
                                        <td className="num">15%</td>
                                        <td>
                                            音声・映像・バックアップ・データセンターレプリケーション・IoT・ストレージなどのサービス設計、クラウド／ハイブリッド構成
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="num">5.0</td>
                                        <th scope="row">セキュリティ設計</th>
                                        <td className="num">15%</td>
                                        <td>
                                            セグメンテーション、ネットワークアクセス制御、CIA
                                            triad、規制遵守、AIが企業のセキュリティポリシーに与える影響
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://learningcontent.cisco.com/documents/marketing/exam-topics/CCDE_v3.1_Unified_Exam_Topics_12132024.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE v3.1 Unified Exam Topics（公式PDF）
                            </a>
                        </p>
                    </div>
                </section>

                {/* ============ 5. STEP2 実技試験 ============ */}
                <section className="sheet" id="step2-practical">
                    <div className="sheet-head">
                        <div className="sheet-num">05</div>
                        <div>
                            <span className="sheet-eyebrow">Step 2 / Practical Exam</span>
                            <h2>実技試験（CCDE v3.1 Practical）</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            筆記試験に合格すると、次は8時間のシナリオベース実技試験に進めます。この試験は「コアモジュール」と「エレクティブ（選択制の専門分野）」の2部構成になっているのが大きな特徴です。実技試験の開始時に、4つのエレクティブから1つを選択します。
                        </p>

                        <Diagram id="diag-3" label="実技試験の構成（コア＋エレクティブ）" />

                        <p className="diagram-caption">
                            <span className="cap-label">図3：実技試験の構成（コア＋エレクティブ）</span>
                            <span>
                                出典：Cisco公式 Exams and Trainingページ（参考情報源 [3] 参照）
                            </span>
                        </p>

                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">試験時間</th>
                                        <td className="num">8時間</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">出題形式</th>
                                        <td>
                                            シナリオベースの実技課題（クローズドブック・参考資料の持ち込み不可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">受験費用の目安</th>
                                        <td className="num">
                                            US$1,600（Cisco Learning Creditsでの支払いも可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">受験可能時期</th>
                                        <td>筆記試験合格後、18か月以内に初回受験が必要</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">実施会場</th>
                                        <td>Ciscoが指定する専用の認定試験会場</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE Exams and Training
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/policies.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Exam, Testing, and Certification Policies
                            </a>
                        </p>

                        <h3>4つのエレクティブ（専門領域）</h3>
                        <p>
                            2025年2月から、実技試験は新しい「Specialist」体系に移行しました。AI
                            Infrastructureという新しい選択肢が加わり、選んだエレクティブごとに個別のSpecialist認定が発行される仕組みになっています。
                        </p>

                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">エレクティブ</th>
                                        <th scope="col">概要</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">AI Infrastructure</th>
                                        <td>
                                            AI・機械学習ワークロード向けのネットワークとコンピューティング基盤を設計・最適化する力を検証
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Large Scale Networks</th>
                                        <td>
                                            大規模ネットワークにおけるトランスポート技術、レイヤー2/3の制御プレーン、仮想化・自動化の統合力を検証
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">On-Prem and Cloud Services</th>
                                        <td>
                                            オンプレミスとクラウドを統合するトランスポート技術、L3接続、仮想化・自動化、データセンター設計の力を検証
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Workforce Mobility</th>
                                        <td>
                                            ID管理などのネットワークセキュリティ、無線・キャンパスネットワークの設計力を検証
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE Exams and Training
                            </a>
                        </p>
                    </div>
                </section>

                {/* ============ 6. 得られる認定 ============ */}
                <section className="sheet" id="certifications-earned">
                    <div className="sheet-head">
                        <div className="sheet-num">06</div>
                        <div>
                            <span className="sheet-eyebrow">What You Earn</span>
                            <h2>合格後に得られる認定</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            CCDEの面白い点は、途中経過ごとに独立した認定が発行されることです。筆記試験に合格した時点で「CCDE
                            Specialist」が、実技試験に合格した時点で「CCDE認定」および選択したエレクティブごとの「Specialist認定」が付与されます。途中で挫折しても、それまでの努力がゼロにならない設計になっている点は、初学者にとって心強いポイントです。
                        </p>
                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">合格した試験</th>
                                        <th scope="col">得られる認定</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">筆記試験（400-007）</th>
                                        <td>Cisco Certified Design Expert Specialist 認定</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">実技試験（選択したエレクティブ）</th>
                                        <td>
                                            CCDE認定 ＋
                                            選択したエレクティブごとのExpert Specialist認定
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE Exams and Training
                            </a>
                        </p>
                    </div>
                </section>

                {/* ============ 7. 費用まとめ ============ */}
                <section className="sheet" id="costs">
                    <div className="sheet-head">
                        <div className="sheet-num">07</div>
                        <div>
                            <span className="sheet-eyebrow">Budget</span>
                            <h2>費用まとめ</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            CCDEはExpertレベルの資格らしく、受験費用も相応の水準です。事前に概算を把握しておくと計画が立てやすくなります。
                        </p>
                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">試験</th>
                                        <th scope="col" className="num">
                                            費用目安
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">筆記試験（400-007）</th>
                                        <td className="num">US$450</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">実技試験</th>
                                        <td className="num">US$1,600</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">合計目安</th>
                                        <td className="num">約 US$2,050</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            為替レートや実施時期により変動します。Cisco Learning
                            Creditsでの支払いにも対応しています。出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CCDE Exams and Training
                            </a>
                        </p>
                    </div>
                </section>

                {/* ============ 8. 再認定 ============ */}
                <section className="sheet" id="recertification">
                    <div className="sheet-head">
                        <div className="sheet-num">08</div>
                        <div>
                            <span className="sheet-eyebrow">Recertification</span>
                            <h2>再認定（有効期間は3年）</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            CCDE認定の有効期間は3年です。取得して終わりではなく、期限内に一定のアクションを取らないと失効してしまう点に注意が必要です。再認定には主に3つの方法があります。
                        </p>

                        <Diagram id="diag-4" label="CCDE認定の再認定サイクル" />

                        <p className="diagram-caption">
                            <span className="cap-label">図4：CCDE認定の再認定サイクル</span>
                            <span>
                                出典：Cisco公式 再認定ポリシー（参考情報源 [6][7] 参照）
                            </span>
                        </p>

                        <div className="table-wrap">
                            <table className="data">
                                <thead>
                                    <tr>
                                        <th scope="col">方法</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">再試験に合格する</th>
                                        <td>現行の筆記試験または実技試験に再度合格する</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CE（継続教育）単位を貯める</th>
                                        <td>
                                            Cisco Continuing
                                            Educationプログラムの対象研修・活動を通じて、必要単位数を取得する
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">上位／隣接資格に合格する</th>
                                        <td>
                                            より上位の認定試験に合格することでも、再認定として扱われる場合がある
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="src-note">
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/recertification/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Recertification Policy
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/continuing-education/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Continuing Education Program
                            </a>
                        </p>
                    </div>
                </section>

                {/* ============ 9. 学習ロードマップ ============ */}
                <section className="sheet" id="roadmap">
                    <div className="sheet-head">
                        <div className="sheet-num">09</div>
                        <div>
                            <span className="sheet-eyebrow">Study Plan</span>
                            <h2>初学者向け学習ロードマップ（提案）</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            ここまでの情報を踏まえて、初学者がCCDEを目指す場合に取り得る学習の順序を、一般的な流れとして整理しました。あくまで一例として参考にしてください。
                        </p>

                        <Diagram id="diag-5" label="学習ロードマップの一例" />

                        <p className="diagram-caption">
                            <span className="cap-label">図5：学習ロードマップの一例</span>
                            <span>作成：本ガイドの著者による整理案</span>
                        </p>
                    </div>
                </section>

                {/* ============ 10. 用語辞典 ============ */}
                <section className="sheet" id="glossary">
                    <div className="sheet-head">
                        <div className="sheet-num">10</div>
                        <div>
                            <span className="sheet-eyebrow">Glossary</span>
                            <h2>初学者のための用語辞典</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            出題範囲の説明に出てくる専門用語のうち、初学者がつまずきやすいものを簡単にまとめました。
                        </p>
                        <dl className="glossary-grid">
                            <div className="gterm">
                                <dt>HLD（High-Level Design）</dt>
                                <dd>
                                    詳細な設定値ではなく、システム全体の構成方針・構造を示す「概要設計」のこと。CCDE筆記試験が検証する中心的な能力。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>ROI / CAPEX・OPEX</dt>
                                <dd>
                                    ROIは投資対効果。CAPEXは設備投資（初期費用）、OPEXは運用費用（継続的なコスト）を指し、設計提案の妥当性を説明する際の判断材料になる。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>SD-WAN</dt>
                                <dd>
                                    ソフトウェアで制御される広域ネットワーク。拠点間の通信経路を集中管理し、柔軟に制御できるアーキテクチャ。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>オーケストレーション／自動化</dt>
                                <dd>
                                    設定変更や運用作業を、人手ではなくソフトウェア・APIを通じて自動的に実行する仕組み。CI/CDのような開発手法をネットワーク運用に応用する考え方も含む。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>可観測性（Observability）</dt>
                                <dd>
                                    ネットワークの状態や挙動を、ログ・メトリクスなどから継続的に把握できる状態のこと。障害の予兆把握や原因調査に直結する。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>CIA triad</dt>
                                <dd>
                                    情報セキュリティの基本原則である「機密性（Confidentiality）」「完全性（Integrity）」「可用性（Availability）」の頭文字を取ったもの。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>SaaS / PaaS / IaaS</dt>
                                <dd>
                                    クラウドサービスの提供形態の分類。ソフトウェア、開発プラットフォーム、インフラのどこまでを事業者が管理するかで区分される。
                                </dd>
                            </div>
                            <div className="gterm">
                                <dt>Cisco Learning Credits</dt>
                                <dd>
                                    Ciscoの研修・試験費用の支払いに利用できる、Cisco独自のプリペイド型クレジット制度。
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>

                {/* ============ 11. FAQ ============ */}
                <section className="sheet" id="faq">
                    <div className="sheet-head">
                        <div className="sheet-num">11</div>
                        <div>
                            <span className="sheet-eyebrow">FAQ</span>
                            <h2>よくある質問</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <div className="faq-item">
                            <p className="faq-q">
                                <span className="q-mark">Q.</span>
                                筆記試験に合格したら、実技試験はいつまでに受ければいい？
                            </p>
                            <p className="faq-a">
                                Cisco公式の試験ポリシーでは、筆記試験合格後18か月以内に実技試験の初回受験をする必要があるとされています。計画的なスケジュールを組みましょう。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">
                                <span className="q-mark">Q.</span>
                                試験に落ちてしまったら、すぐに再受験できる？
                            </p>
                            <p className="faq-a">
                                筆記試験に不合格の場合は5暦日、実技試験に不合格の場合は30暦日の待機期間を経てから再受験の予約が可能になります。また、一度合格した筆記試験（同一試験番号）を再度受けるには180日以上の間隔が必要です。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">
                                <span className="q-mark">Q.</span>試験は日本語で受けられる？
                            </p>
                            <p className="faq-a">
                                筆記試験（400-007）の試験言語は英語のみとされています。受験を検討する際は、この点を踏まえて準備を進める必要があります。
                            </p>
                        </div>
                        <div className="faq-item">
                            <p className="faq-q">
                                <span className="q-mark">Q.</span>
                                実技試験のエレクティブは後から変更できる？
                            </p>
                            <p className="faq-a">
                                エレクティブは実技試験の当日に選択する仕組みです。事前にどの分野を選ぶかを検討し、それに沿った学習を進めておくことが推奨されています。
                            </p>
                        </div>
                    </div>
                </section>

                {/* ============ 12. 参考情報源 ============ */}
                <section className="sheet sources" id="sources" data-testid="sources-section">
                    <div className="sheet-head">
                        <div className="sheet-num">12</div>
                        <div>
                            <span className="sheet-eyebrow">Sources</span>
                            <h2>参考情報源</h2>
                        </div>
                    </div>
                    <div className="sheet-body">
                        <p>
                            本ガイドの内容は、以下のCisco公式ページ・公式資料をもとに作成しています。最新情報は必ず公式サイトでご確認ください。
                        </p>
                        <ol>
                            <li>
                                <a
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccde.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/expert/ccde.html
                                </a>
                                <span className="src-desc">
                                    CCDE認定プログラム（Cisco公式・日本語ページ）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/index.html
                                </a>
                                <span className="src-desc">
                                    CCDE Overview（Cisco公式・英語ページ）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/design/ccde/exams-and-training.html
                                </a>
                                <span className="src-desc">
                                    CCDE Exams and
                                    Training（試験構成・費用・エレクティブの最新情報）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/current-list/400-007-ccde.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/site/us/en/learn/training-certifications/exams/current-list/400-007-ccde.html
                                </a>
                                <span className="src-desc">
                                    400-007 CCDE 試験ページ（筆記試験の詳細）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://learningcontent.cisco.com/documents/marketing/exam-topics/CCDE_v3.1_Unified_Exam_Topics_12132024.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningcontent.cisco.com/documents/marketing/exam-topics/CCDE_v3.1_Unified_Exam_Topics_12132024.pdf
                                </a>
                                <span className="src-desc">
                                    CCDE v3.1 Unified Exam
                                    Topics（公式PDF・出題ドメインと配点）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/recertification/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/recertification/index.html
                                </a>
                                <span className="src-desc">
                                    Recertification Policy（再認定ポリシー）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/continuing-education/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/site/us/en/learn/training-certifications/certifications/continuing-education/index.html
                                </a>
                                <span className="src-desc">
                                    Cisco Continuing Education Program（CE単位による再認定）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/policies.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.cisco.com/site/us/en/learn/training-certifications/exams/policies.html
                                </a>
                                <span className="src-desc">
                                    Exam, Testing, and Certification
                                    Policies（再受験の待機期間・18か月ルールなど）
                                </span>
                            </li>
                            <li>
                                <a
                                    href="https://learningnetwork.cisco.com/s/ccde-v3-1-unified-exam-topics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningnetwork.cisco.com/s/ccde-v3-1-unified-exam-topics
                                </a>
                                <span className="src-desc">
                                    Cisco Learning Network：CCDE v3.1 Unified Exam Topics and Study
                                    Guide
                                </span>
                            </li>
                        </ol>
                    </div>
                </section>

                <footer className="closing">
                    <span>DRAWING: CCDE-GUIDE-001</span>
                    <span>REV: v3.1</span>
                    <span>SHEET: 1 / 1</span>
                </footer>
            </div>
        </>
    );
}
