import Diagram from './Diagram';
import baseStyles from './SectionBase.module.css';

/**
 * Presents the CCDE v3.1 Practical exam structure, requirements, and elective specialist areas.
 *
 * @returns The rendered practical exam overview section.
 */
export default function Step2PracticalSection() {
    return (
        <section className={baseStyles.sheet} id="step2-practical">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>05</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Step 2 / Practical Exam</span>
                    <h2>実技試験（CCDE v3.1 Practical）</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    筆記試験に合格すると、次は8時間のシナリオベース実技試験に進めます。この試験は「コアモジュール」と「エレクティブ（選択制の専門分野）」の2部構成になっているのが大きな特徴です。実技試験の開始時に、4つのエレクティブから1つを選択します。
                </p>

                <Diagram id="diag-3" label="実技試験の構成（コア＋エレクティブ）" />

                <p className={baseStyles.diagramCaption}>
                    <span className={baseStyles.capLabel}>図3：実技試験の構成（コア＋エレクティブ）</span>
                    <span>
                        出典：Cisco公式 Exams and Trainingページ（参考情報源 [3] 参照）
                    </span>
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
                                <th scope="row">試験時間</th>
                                <td className={baseStyles.num}>8時間</td>
                            </tr>
                            <tr>
                                <th scope="row">出題形式</th>
                                <td>
                                    シナリオベースの実技課題（クローズドブック・参考資料の持ち込み不可）
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">受験費用の目安</th>
                                <td className={baseStyles.num}>
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
                <p className={baseStyles.srcNote}>
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

                <div className={baseStyles.tableWrap}>
                    <table className={baseStyles.data}>
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
                <p className={baseStyles.srcNote}>
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
    );
}
