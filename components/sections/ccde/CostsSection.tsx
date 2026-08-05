import baseStyles from './SectionBase.module.css';

/**
 * CostsSection - セクション7「費用まとめ」の目安表・解説コンポーネント。
 */
export default function CostsSection() {
    return (
        <section className={baseStyles.sheet} id="costs">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>07</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Budget</span>
                    <h2>費用まとめ</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    CCDEはExpertレベルの資格らしく、受験費用も相応の水準です。事前に概算を把握しておくと計画が立てやすくなります。
                </p>
                <div className={baseStyles.tableWrap}>
                    <table className={baseStyles.data}>
                        <thead>
                            <tr>
                                <th scope="col">試験</th>
                                <th scope="col" className={baseStyles.num}>
                                    費用目安
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">筆記試験（400-007）</th>
                                <td className={baseStyles.num}>US$450（税別・受験料のみ）</td>
                            </tr>
                            <tr>
                                <th scope="row">実技試験</th>
                                <td className={baseStyles.num}>US$1,600（税別・受験料のみ）</td>
                            </tr>
                            <tr>
                                <th scope="row">合計目安</th>
                                <td className={baseStyles.num}>約 US$2,050（税別・受験料のみ）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className={baseStyles.srcNote}>
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
    );
}
