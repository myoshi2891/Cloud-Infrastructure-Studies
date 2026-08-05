import Diagram from './Diagram';
import baseStyles from './SectionBase.module.css';

/**
 * RecertificationSection - セクション8「再認定（有効期間は3年）」の再認定方法表およびダイアグラムコンポーネント。
 */
export default function RecertificationSection() {
    return (
        <section className={baseStyles.sheet} id="recertification">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>08</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Recertification</span>
                    <h2>再認定（有効期間は3年）</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    CCDE認定の有効期間は3年です。取得して終わりではなく、期限内に一定のアクションを取らないと失効してしまう点に注意が必要です。再認定には主に3つの方法があります。
                </p>

                <Diagram id="diag-4" label="CCDE認定の再認定サイクル" />

                <p className={baseStyles.diagramCaption}>
                    <span className={baseStyles.capLabel}>図4：CCDE認定の再認定サイクル</span>
                    <span>
                        出典：Cisco公式 再認定ポリシー（参考情報源 [6][7] 参照）
                    </span>
                </p>

                <div className={baseStyles.tableWrap}>
                    <table className={baseStyles.data}>
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
                <p className={baseStyles.srcNote}>
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
    );
}
