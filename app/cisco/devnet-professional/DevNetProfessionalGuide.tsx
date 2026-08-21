import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';
import styles from './page.module.css';

/** 指定されたMermaid図を描画する。 */
function Diagram({ id, label }: { id: keyof typeof DIAGRAMS; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className={styles.mermaidWrap}>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

/**
 * 自動化プロフェッショナルガイドを表示します。
 * CCNP Automation認定の概要、試験構成、学習方法、再認定制度を解説します。
 */
export default function AutomationProfessionalGuide() {
    return (
        <div className={styles.page}>
            <div className={styles.layout}>
                <NavBar />

                <main className={styles.main}>
                    <header className={styles.hero}>
                        <span className={styles.eyebrow}>Beginner Step-by-Step Guide</span>
                        <h1>CCNP Automation 認定 徹底解説ガイド</h1>
                        <p className={styles.lead}>
                            Cisco公式サイトの一次情報にもとづき、CCNP Automation認定について
                            「何を証明する資格なのか」「どの試験に合格すればよいのか」「どう学習を進めればよいのか」を、
                            初めてAutomation認定に触れる方でも理解できるようステップバイステップで整理しました。
                        </p>
                        <p className={styles.sourceLine}>
                            主な参照元：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation 認定とトレーニングプログラム（Cisco公式）
                            </a>
                        </p>
                    </header>

                    {/* 1 */}
                    <section className={styles.section} id="prereq">
                        <h2>1. このガイドの前提知識</h2>
                        <p>
                            Automation
                            Professionalはネットワーク技術者向けの資格として語られることが多いですが、実態は
                            <strong>「ソフトウェア開発の知識」</strong>と
                            <strong>「シスコ製品・ネットワークの知識」</strong>の
                            両方が問われる、やや特殊な資格です。読み進める前に、以下の用語だけ押さえておくと理解がスムーズです。
                        </p>
                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">用語</th>
                                        <th scope="col">初学者向けの説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>API</td>
                                        <td>
                                            別のアプリケーションやシステムの機能を呼び出すための「窓口」。Automation試験では特に
                                            REST API が中心
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>REST API</td>
                                        <td>
                                            HTTP通信（GET/POST/PUT/DELETEなど）を使ってデータをやり取りする、現在最も一般的なAPIの設計方式
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Python</td>
                                        <td>
                                            Automation認定全体で標準的に使われるプログラミング言語。自動化スクリプトの記述に使用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CI/CD</td>
                                        <td>
                                            コードの変更を自動でテスト・統合・配布する開発の仕組み（Continuous
                                            Integration / Continuous Delivery）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ansible / Terraform</td>
                                        <td>
                                            インフラの設定を「コード」として管理し自動化するためのツール（Infrastructure
                                            as Code）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>コンセントレーション試験</td>
                                        <td>
                                            「専門分野」を意味し、Automation
                                            Professionalでは自分の得意領域を選んで受験する試験を指す
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 2 */}
                    <section className={styles.section} id="what-is-devnet">
                        <h2>2. Automation認定とは何か（CCNA/CCNPとの違い）</h2>
                        <p>
                            Ciscoには従来からあるCCNA・CCNP・CCIEのような、ネットワーク運用・設計を中心とした認定トラックがあります。
                            一方で<strong>Automation認定</strong>
                            は「シスコプラットフォーム上で動くアプリケーションの開発・自動化・保守」に
                            焦点を当てた、比較的新しい認定プログラムです。
                        </p>
                        <ul>
                            <li>
                                ネットワーク機器の「設定」ではなく、ネットワークやシスコ製品を
                                <strong>プログラムから操作・自動化する力</strong>を証明する資格
                            </li>
                            <li>
                                対象は、ソフトウェア開発者、DevOpsエンジニア、自動化スペシャリストなど
                            </li>
                        </ul>
                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation 認定とトレーニングプログラム
                            </a>
                        </p>
                    </section>

                    {/* 3 */}
                    <section className={styles.section} id="cert-levels">
                        <h2>3. Cisco認定全体における CCNP Automation の位置づけ</h2>
                        <p>
                            Automation認定には、易しい順に「Associate → Specialist → Professional →
                            Expert（現名称：CCIE Automation）」という 段階があります。ポイントは、
                            <strong>
                                Specialist認定は単独で受験する試験ではなく、Professional取得の過程で
                                自動的に得られる「副産物」の認定
                            </strong>
                            であるという点です。
                        </p>

                        <Diagram
                            id="levels"
                            label="図1: Automation認定レベルの全体像とProfessional取得の流れ"
                        />
                        <p className={styles.diagramCaption}>
                            図1: Automation認定レベルの全体像とProfessional取得の流れ
                        </p>

                        <ul>
                            <li>
                                <strong>CCNA Automation</strong>
                                ：正式な前提条件はないが、1年以上のPython開発経験が推奨される入門レベル
                            </li>
                            <li>
                                <strong>CCNP Automation</strong>
                                ：コア試験＋コンセントレーション試験の合格が必要。合格した時点でそれぞれ「Specialist」認定も得られる
                            </li>
                            <li>
                                <strong>Automation Expert（現CCIE Automation）</strong>
                                ：コア試験に加え、実技（ハンズオンラボ）試験に合格する必要がある最上位レベル
                            </li>
                        </ul>

                        <div className={styles.callout}>
                            <strong className={styles.label}>補足（最新情報）：</strong>
                            最上位の自動化認定は現在「<strong>CCIE Automation</strong>」です。
                            学習時期によっては旧制度の情報と混在する可能性があるため、最新名称は公式サイトで確認してください。
                        </div>

                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                Automation 認定 - トレーニング &amp; 認定
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNA Automation 認定
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccie-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCIE Automation（旧 Automation Expert）
                            </a>
                        </p>
                    </section>

                    {/* 4 */}
                    <section className={styles.section} id="overview">
                        <h2>4. CCNP Automation の概要</h2>
                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>認定が証明するスキル</td>
                                        <td>
                                            シスコプラットフォーム上に構築されたアプリケーションの
                                            <strong>開発・運用</strong>
                                            に関するプロフェッショナルレベルのスキル
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>必要な試験数</td>
                                        <td>2つ（コア試験 1つ + コンセントレーション試験 1つ）</td>
                                    </tr>
                                    <tr>
                                        <td>認定の有効期間</td>
                                        <td>3年間</td>
                                    </tr>
                                    <tr>
                                        <td>前提資格</td>
                                        <td>公式な前提資格は不要</td>
                                    </tr>
                                    <tr>
                                        <td>主な対象者</td>
                                        <td>
                                            ソフトウェア開発者、ネットワークプロフェッショナル、または両方の役割を担う人
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation 認定とトレーニングプログラム
                            </a>
                        </p>
                    </section>

                    {/* 5 */}
                    <section className={styles.section} id="prerequisites">
                        <h2>5. 受験資格・前提条件</h2>
                        <p>
                            Cisco の認定試験には共通する特徴として、「
                            <strong>受験資格そのものに公式な制限はない</strong>
                            」というものがあります。 CCNP Automationも例外ではありません。
                        </p>
                        <ul>
                            <li>正式な前提条件は設けられていない</li>
                            <li>
                                ただし、受験前に試験範囲の内容を十分理解しておくことが推奨されている
                            </li>
                            <li>
                                推奨される実務経験の目安は、
                                <strong>
                                    Pythonプログラミングを含む3〜5年程度のソフトウェア開発経験
                                </strong>
                            </li>
                        </ul>
                        <p>
                            つまり「受けようと思えば誰でも受験できるが、内容的にはある程度の開発経験を積んだ人向けの試験」という位置づけです。
                            Automation
                            Associate（1年以上のPython経験が目安）と比べても、一段階レベルが上がっていることが分かります。
                        </p>
                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation 認定とトレーニングプログラム
                            </a>
                        </p>
                    </section>

                    {/* 6 */}
                    <section className={styles.section} id="mechanism">
                        <h2>6. 認定取得の仕組み（コア試験＋コンセントレーション試験）</h2>
                        <p>
                            CCNP Automationを取得するための試験構成は、次の2階建てになっています。
                        </p>
                        <ol>
                            <li>
                                <strong>コア試験（必須・1種類のみ）</strong>
                                ：ソフトウェア開発・設計に関する共通知識を問う試験
                            </li>
                            <li>
                                <strong>コンセントレーション試験（選択式・2種類から1つ）</strong>
                                ：エンタープライズまたはデータセンターの自動化分野を選んで受験する試験
                            </li>
                        </ol>

                        <Diagram
                            id="mechanism"
                            label="図2: コア試験とコンセントレーション試験の関係"
                        />
                        <p className={styles.diagramCaption}>
                            図2: コア試験とコンセントレーション試験の関係
                        </p>

                        <ul>
                            <li>
                                コア試験に合格すると、その時点で「Cisco Certified Automation
                                Specialist - Core」認定が付与される
                            </li>
                            <li>
                                コンセントレーション試験に合格すると、選んだ試験に応じて「Cisco
                                Certified Automation Specialist - Enterprise Automation and
                                Programmability」または「Cisco Certified Automation Specialist -
                                Data Center Automation and Programmability」認定が付与される
                            </li>
                            <li>
                                <strong>両方に合格して初めて CCNP Automation 認定が成立する</strong>
                            </li>
                        </ul>
                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation 認定とトレーニングプログラム
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/certifications/devnet/jp-devnet-professional-at-a-glance.pdf"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation At-a-Glance（PDF）
                            </a>
                        </p>
                    </section>

                    {/* 7 */}
                    <section className={styles.section} id="devcor">
                        <h2>7. コア試験「350-901 AUTOCOR」を徹底解説</h2>

                        <h3>7-1. 基本情報</h3>
                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>試験コード</td>
                                        <td>350-901（AUTOCOR）</td>
                                    </tr>
                                    <tr>
                                        <td>正式名称</td>
                                        <td>
                                            Designing, Deploying and Managing Network Automation
                                            Systems
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>試験時間</td>
                                        <td>120分</td>
                                    </tr>
                                    <tr>
                                        <td>関連する認定</td>
                                        <td>
                                            CCNP Automation、Cisco Certified Automation Specialist -
                                            Core
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>推奨トレーニング</td>
                                        <td>
                                            Designing, Deploying and Managing Network Automation
                                            Systems（AUTOCOR）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/autocor.html"
                                target="_blank"
                                rel="noopener"
                            >
                                350-901 AUTOCOR 試験ページ
                            </a>
                        </p>

                        <h3>7-2. 出題ドメインと比率</h3>
                        <p>
                            AUTOCORの出題範囲は4分野で、ネットワーク自動化とInfrastructure as
                            Codeが各30%、 運用と自動化におけるAIが各20%です。
                        </p>
                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">出題比率</th>
                                        <th scope="col">分野</th>
                                        <th scope="col">主な学習ポイント（要約）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>30%</td>
                                        <td>1.0 ネットワーク自動化</td>
                                        <td>
                                            Ansible、Terraform、RESTCONF、Python、REST
                                            APIを用いた自動化ソリューション
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>30%</td>
                                        <td>2.0 Infrastructure as Code</td>
                                        <td>
                                            Git、GitLab CI/CD、CML、Docker Compose、Source of
                                            Truth、YANGモデル
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>20%</td>
                                        <td>3.0 運用</td>
                                        <td>
                                            モデル駆動型テレメトリ、ログ、障害診断、pyATS、TLS証明書、安全なコーディング
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>20%</td>
                                        <td>4.0 自動化におけるAI</td>
                                        <td>
                                            AI支援開発のリスク、AI自動化のセキュリティ、FastMCP、LLMエージェント、提案精度の評価
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Diagram id="domains" label="図3: AUTOCORの4つの出題ドメインと配点" />
                        <p className={styles.diagramCaption}>
                            図3: AUTOCORの4つの出題ドメインと配点
                        </p>

                        <div className={styles.callout}>
                            <strong className={styles.label}>初学者向けポイント：</strong>
                            AUTOCORは、ネットワーク設定をAnsible、Terraform、RESTCONF、Pythonで自動化し、
                            IaCパイプラインを運用しながらAIを安全に組み込む実践力を問う試験です。
                        </div>

                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://learningcontent.cisco.com/documents/marketing/exam-topics/350-901-AUTOCOR-v2.0-7-9-2025.pdf"
                                target="_blank"
                                rel="noopener"
                            >
                                350-901 AUTOCOR 試験内容（PDF・出題トピック一覧）
                            </a>
                        </p>
                    </section>

                    {/* 8 */}
                    <section className={styles.section} id="concentration">
                        <h2>8. コンセントレーション試験（専門分野選択式試験）一覧</h2>
                        <p>
                            コンセントレーション試験は2種類あり、
                            <strong>どちらも試験時間は90分</strong>
                            です（コア試験より短い点に注意）。
                            それぞれ、対応する他のCisco認定トラック（CCNPシリーズなど）とも関連付けられているものが多く、
                            既に別トラックを学習中の人は一部知識を流用できます。
                        </p>
                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">試験コード</th>
                                        <th scope="col">正式名称（略称）</th>
                                        <th scope="col">試験時間</th>
                                        <th scope="col">主な学習内容</th>
                                        <th scope="col">関連するCCNPトラック</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>300-435 ENAUTO</td>
                                        <td>
                                            Automating and Programming Cisco Enterprise Solutions
                                        </td>
                                        <td>90分</td>
                                        <td>
                                            プログラミングの概念、Python、API、コントローラ、自動化ツール
                                        </td>
                                        <td>CCNP Enterprise</td>
                                    </tr>
                                    <tr>
                                        <td>300-635 DCNAUTO</td>
                                        <td>Automating Cisco Data Center Networking Solutions</td>
                                        <td>90分</td>
                                        <td>データセンターのオーケストレーション、自動化ツール</td>
                                        <td>CCNP Data Center</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            ENAUTOの合格で「Cisco Certified Automation Specialist - Enterprise
                            Automation and Programmability」、 DCNAUTOの合格で「Cisco Certified
                            Automation Specialist - Data Center Automation and
                            Programmability」がそれぞれ付与されます。
                        </p>

                        <h3>コンセントレーション試験の選び方（考え方の目安）</h3>
                        <ul>
                            <li>エンタープライズネットワークの自動化に関わっている → ENAUTO</li>
                            <li>データセンターネットワークの自動化に関わっている → DCNAUTO</li>
                        </ul>

                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/enauto-300-435.html"
                                target="_blank"
                                rel="noopener"
                            >
                                ENAUTO
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/dcnauto.html"
                                target="_blank"
                                rel="noopener"
                            >
                                DCNAUTO
                            </a>
                            各試験ページ
                        </p>
                    </section>

                    {/* 9 */}
                    <section className={styles.section} id="format">
                        <h2>9. 試験形式・受験方法</h2>
                        <ul>
                            <li>
                                試験の予約・受験は、Cisco公式の試験配信パートナーである
                                <strong>Pearson VUE</strong> を通じて行う
                            </li>
                            <li>
                                出題形式（画面操作のチュートリアル等）は Cisco Learning Network
                                上で事前確認できる
                            </li>
                            <li>
                                コア試験（AUTOCOR）は日本語・英語の両方に対応していることが試験ページで明記されている試験もある
                                （コンセントレーション試験の対応言語は試験ごとに異なるため、受験前に各試験ページで要確認）
                            </li>
                        </ul>

                        <Diagram id="format" label="図4: 受験の基本フロー" />
                        <p className={styles.diagramCaption}>図4: 受験の基本フロー</p>

                        <div className={styles.callout}>
                            <strong className={styles.label}>補足：</strong>
                            不合格の場合の再受験までの待機期間は、Cisco Exam
                            Safeguardを購入していない限り、
                            アソシエイト／プロフェッショナル／スペシャリストレベルの試験では
                            <strong>不合格日の翌日から5暦日</strong>
                            とされています（再認定ポリシーページに基づく一般規定）。
                        </div>

                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/autocor.html"
                                target="_blank"
                                rel="noopener"
                            >
                                350-901 AUTOCOR 試験ページ
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                target="_blank"
                                rel="noopener"
                            >
                                再認定ポリシー（再受験の待機期間を含む）
                            </a>
                        </p>
                    </section>

                    {/* 10 */}
                    <section className={styles.section} id="roadmap">
                        <h2>10. 合格までの学習ロードマップ（ステップバイステップ）</h2>
                        <p>
                            初学者がゼロからAutomation
                            Professionalを目指す場合の、一般的な学習の流れを整理しました。
                        </p>

                        <Diagram id="roadmap" label="図5: 学習ロードマップ" />
                        <p className={styles.diagramCaption}>図5: 学習ロードマップ</p>

                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステップ</th>
                                        <th scope="col">ポイント</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Step 0〜1</td>
                                        <td>
                                            公式な前提条件はないが、実務上はPythonでのAPI操作経験が重要。CCNA
                                            Automationの学習内容は土台として非常に有効
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Step 2〜3</td>
                                        <td>
                                            AUTOCORは4分野で30%と20%の配点差があるため、比率を踏まえて学習計画を立てる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Step 4</td>
                                        <td>
                                            コア試験に合格した時点で、既に「Specialist」の肩書きが得られる（途中経過も評価される）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Step 5</td>
                                        <td>
                                            普段の業務内容や興味に合わせてコンセントレーションを選ぶことで、学習効率と実務への応用度が上がる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Step 6〜7</td>
                                        <td>
                                            コンセントレーション試験も合格すれば、その時点でCCNP
                                            Automation認定が成立する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Step 8</td>
                                        <td>
                                            認定の有効期間は3年間。継続教育（CE）クレジットの取得か、試験の再受験で更新する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                target="_blank"
                                rel="noopener"
                            >
                                CCNP Automation 認定とトレーニングプログラム
                            </a>
                            、
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                target="_blank"
                                rel="noopener"
                            >
                                再認定ポリシー
                            </a>
                        </p>
                    </section>

                    {/* 11 */}
                    <section className={styles.section} id="recert">
                        <h2>11. 再認定（Recertification）制度</h2>
                        <p>
                            CCNP Automation 認定は、取得後<strong>3年間</strong>
                            有効です。有効期限が切れる前に、以下いずれかの方法で再認定を行う必要があります。
                        </p>

                        <div className={styles.tableWrap}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">レベル</th>
                                        <th scope="col">再認定に必要な継続教育（CE）クレジット</th>
                                        <th scope="col">備考</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>アソシエイト</td>
                                        <td>30 CEクレジット</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>スペシャリスト</td>
                                        <td>40 CEクレジット</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                プロフェッショナル（CCNP Automationが該当）
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>80 CEクレジット</strong>
                                        </td>
                                        <td>試験の再受験でも代替可能</td>
                                    </tr>
                                    <tr>
                                        <td>CCIE／CCDE（エキスパート）</td>
                                        <td>120 CEクレジット</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <ul>
                            <li>
                                有効期間中であれば、既存試験の再受験・上位試験への挑戦・CEクレジット取得・その両方の組み合わせ、いずれの方法でも再認定が可能
                            </li>
                            <li>
                                認定の有効期限が切れた場合は、再認定ではなく認定取得プロセスを最初からやり直す必要がある
                            </li>
                            <li>認定ステータスの管理責任は認定保有者自身にある</li>
                            <li>延長は認められていない</li>
                        </ul>

                        <Diagram id="recert" label="図6: 再認定の分岐フロー" />
                        <p className={styles.diagramCaption}>図6: 再認定の分岐フロー</p>

                        <p className={styles.sourceNote}>
                            出典：
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                target="_blank"
                                rel="noopener"
                            >
                                再認定ポリシー
                            </a>
                        </p>
                    </section>

                    {/* 12 */}
                    <section className={styles.section} id="summary">
                        <h2>12. まとめ：CCNP Automationはこんな人におすすめ</h2>
                        <ul>
                            <li>
                                ネットワークエンジニアとして、これからの「自動化・NetDevOps」の波に対応したい人
                            </li>
                            <li>
                                既にソフトウェア開発者だが、シスコ製品と連携するアプリケーション開発に強みを持ちたい人
                            </li>
                            <li>
                                CCNPなど別トラックのプロフェッショナル認定と組み合わせて、専門性を広げたい人（コンセントレーション試験がCCNPと共通のものが多いため）
                            </li>
                            <li>3〜5年程度のソフトウェア開発経験（Pythonを含む）がある人</li>
                        </ul>
                        <p>
                            CCNP
                            Automationは「コア試験＋コンセントレーション試験」という2階建て構造によって、
                            <strong>共通のソフトウェア開発力</strong>と
                            <strong>個々の専門分野の実践力</strong>
                            の両方を証明できる設計になっている点が最大の特徴です。
                            まずは4つの出題分野を意識してAUTOCORの学習計画を立て、その後に自分の得意分野でコンセントレーション試験を選ぶ、
                            という順序で進めるとスムーズに学習できます。
                        </p>
                    </section>

                    {/* 13 */}
                    <section className={styles.section} id="sources">
                        <h2>13. 参考ソース一覧</h2>
                        <p>
                            本ガイドの内容は、以下のCisco公式ページ・公式PDF資料を根拠として作成しています。
                        </p>
                        <ul className={styles.refs}>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    CCNP Automation 認定とトレーニングプログラム
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/c/dam/global/ja_jp/training-events/training-certifications/certifications/devnet/jp-devnet-professional-at-a-glance.pdf"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    CCNP Automation At-a-Glance（PDF）
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/index.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Automation 認定 - トレーニング &amp; 認定（認定トラック全体）
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    CCNA Automation 認定とトレーニングプログラム
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccie-automation/index.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    CCIE Automation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/autocor.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    350-901 AUTOCOR 試験ページ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://learningcontent.cisco.com/documents/marketing/exam-topics/350-901-AUTOCOR-v2.0-7-9-2025.pdf"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    350-901 AUTOCOR 試験内容（PDF・出題トピック一覧）
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/exams/current-list/enauto-300-435.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    300-435 ENAUTO 試験ページ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/dcnauto.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    300-635 DCNAUTO 試験ページ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/recertification-policy.html"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    再認定ポリシー
                                </a>
                            </li>
                        </ul>

                        <div className={styles.footer}>
                            注意：試験時間・出題比率・試験コード・認定の名称や再認定制度は、Ciscoの都合により
                            <strong>予告なく変更される場合があります</strong>。
                            最終的な受験判断の前には、必ず上記の公式ページで最新情報をご確認ください。
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
