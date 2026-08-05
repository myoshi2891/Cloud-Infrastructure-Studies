import baseStyles from './SectionBase.module.css';

/**
 * PrerequisitesSection - セクション3「受験資格・推奨される経験」の表および解説コンポーネント。
 */
export default function PrerequisitesSection() {
    return (
        <section className={baseStyles.sheet} id="prerequisites">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>03</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Eligibility</span>
                    <h2>受験資格・推奨される経験</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    CCDEには「この資格を持っていないと受験できない」という正式な前提条件はありません。ただし、試験内容そのものが非常に高度であるため、受験前に出題範囲を十分に理解しておくことが強く推奨されています。
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
                <p className={baseStyles.srcNote}>
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

                <div className={baseStyles.callout}>
                    <strong>初学者向けメモ：</strong>
                    「前提資格がない＝簡単」ではありません。実際には出題範囲そのものが実務経験を前提にした内容であるため、経験が浅い段階でいきなり合格を狙うのは現実的ではない、という点は理解しておきましょう。
                </div>
            </div>
        </section>
    );
}
