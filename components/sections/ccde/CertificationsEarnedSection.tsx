import baseStyles from './SectionBase.module.css';

/**
 * Displays the certifications earned after passing each CCDE examination stage.
 *
 * @returns The certifications-earned section with explanatory text, an exam-to-certification table, and a source link.
 */
export default function CertificationsEarnedSection() {
    return (
        <section className={baseStyles.sheet} id="certifications-earned">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>06</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>What You Earn</span>
                    <h2>合格後に得られる認定</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    CCDEの面白い点は、途中経過ごとに独立した認定が発行されることです。筆記試験に合格した時点で「CCDE
                    Specialist」が、実技試験に合格した時点で「CCDE認定」および選択したエレクティブごとの「Specialist認定」が付与されます。途中で挫折しても、それまでの努力がゼロにならない設計になっている点は、初学者にとって心強いポイントです。
                </p>
                <div className={baseStyles.tableWrap}>
                    <table className={baseStyles.data}>
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
