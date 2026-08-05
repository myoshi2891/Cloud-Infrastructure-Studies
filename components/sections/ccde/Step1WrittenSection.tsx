import Diagram from './Diagram';
import baseStyles from './SectionBase.module.css';

/**
 * Step1WrittenSection - セクション4「STEP1：筆記試験（400-007 CCDE v3.1）」の概要・出題ドメイン表・ダイアグラムコンポーネント。
 */
export default function Step1WrittenSection() {
    return (
        <section className={baseStyles.sheet} id="step1-written">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>04</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Step 1 / Written Exam</span>
                    <h2>筆記試験（400-007 CCDE v3.1）</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    最初の関門となるのが、試験コード「400-007」と呼ばれる筆記試験です。2時間の選択式試験で、90〜110問が出題されます。ネットワーク設計、テクノロジー、ビジネス要件と技術要件に基づいた仕様の作成、事業戦略といった領域の知識・スキルに焦点を当てた試験です。
                </p>

                <div className={baseStyles.tableWrap}>
                    <table className={baseStyles.data}>
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">試験コード</th>
                                <td className={baseStyles.num}>400-007（CCDE v3.1）</td>
                            </tr>
                            <tr>
                                <th scope="row">試験時間</th>
                                <td className={baseStyles.num}>2時間（120分）</td>
                            </tr>
                            <tr>
                                <th scope="row">出題形式</th>
                                <td>選択式（クローズドブック・参考資料の持ち込み不可）</td>
                            </tr>
                            <tr>
                                <th scope="row">問題数</th>
                                <td className={baseStyles.num}>90〜110問</td>
                            </tr>
                            <tr>
                                <th scope="row">試験言語</th>
                                <td>英語のみ</td>
                            </tr>
                            <tr>
                                <th scope="row">受験費用の目安</th>
                                <td className={baseStyles.num}>
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
                <p className={baseStyles.srcNote}>
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

                <p className={baseStyles.diagramCaption}>
                    <span className={baseStyles.capLabel}>図2：筆記試験ドメイン別の配点比率</span>
                    <span>
                        出典：Cisco公式「CCDE v3.1 Unified Exam Topics」（参考情報源 [5]
                        参照）
                    </span>
                </p>

                <div className={baseStyles.tableWrap}>
                    <table className={baseStyles.data}>
                        <thead>
                            <tr>
                                <th scope="col" className={baseStyles.num}>
                                    No.
                                </th>
                                <th scope="col">ドメイン</th>
                                <th scope="col" className={baseStyles.num}>
                                    配点
                                </th>
                                <th scope="col">主な内容（例）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={baseStyles.num}>1.0</td>
                                <th scope="row">ビジネス戦略設計</th>
                                <td className={baseStyles.num}>15%</td>
                                <td>
                                    プロジェクト管理手法（Waterfall／Agile）の設計への影響、事業継続性、環境的持続可能性、AI／機械学習のビジネス観点
                                </td>
                            </tr>
                            <tr>
                                <td className={baseStyles.num}>2.0</td>
                                <th scope="row">
                                    制御・データ・管理プレーンと運用設計
                                </th>
                                <td className={baseStyles.num}>25%</td>
                                <td>
                                    エンドツーエンドのトラフィックフロー、自動化・オーケストレーション、SD-WANやコントローラベースのアーキテクチャ、可観測性（Observability）
                                </td>
                            </tr>
                            <tr>
                                <td className={baseStyles.num}>3.0</td>
                                <th scope="row">ネットワーク設計</th>
                                <td className={baseStyles.num}>30%</td>
                                <td>
                                    回復性・拡張性・セキュアなモジュール型ネットワーク設計、移行／変革計画、AIを活用したネットワーク設計ユースケース
                                </td>
                            </tr>
                            <tr>
                                <td className={baseStyles.num}>4.0</td>
                                <th scope="row">サービス設計</th>
                                <td className={baseStyles.num}>15%</td>
                                <td>
                                    音声・映像・バックアップ・データセンターレプリケーション・IoT・ストレージなどのサービス設計、クラウド／ハイブリッド構成
                                </td>
                            </tr>
                            <tr>
                                <td className={baseStyles.num}>5.0</td>
                                <th scope="row">セキュリティ設計</th>
                                <td className={baseStyles.num}>15%</td>
                                <td>
                                    セグメンテーション、ネットワークアクセス制御、CIA
                                    triad、規制遵守、AIが企業のセキュリティポリシーに与える影響
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className={baseStyles.srcNote}>
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
    );
}
