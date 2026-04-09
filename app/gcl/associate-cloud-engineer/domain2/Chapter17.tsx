import { REFERENCE_LINKS, TECH_GUIDE_LINKS } from './constants';

export default function Chapter17() {
    return (
        <div id="ch17" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn17">17</div>
                <div className="sec-head-txt">
                    <h2>参考資料（References）</h2>
                    <p>このドメインの学習にあたって参考にした公式ドキュメントおよび技術リソース</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle">
                    <span className="tid">17.1</span>公式ドキュメント（Official Documentation）
                </div>
                <div className="tgrid">
                    {REFERENCE_LINKS.map(([pageTitle, url, desc]) => (
                        <div className="titem" key={url}>
                            <div className="tname">
                                <a href={url} target="_blank" rel="noopener noreferrer">{pageTitle}</a>
                            </div>
                            <div className="tdef">{desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle">
                    <span className="tid">17.2</span>技術解説・コミュニティリソース（Tech Guides & Community）
                </div>
                <div className="tgrid">
                    {TECH_GUIDE_LINKS.map(([pageTitle, url, desc]) => (
                        <div className="titem" key={url}>
                            <div className="tname">
                                <a href={url} target="_blank" rel="noopener noreferrer">{pageTitle}</a>
                            </div>
                            <div className="tdef">{desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
