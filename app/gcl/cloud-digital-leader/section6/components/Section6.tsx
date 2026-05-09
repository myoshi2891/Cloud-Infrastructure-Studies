import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 6 - Part 6 (Sustainability and Green Cloud) component for the Cloud Digital Leader guide.
 * It provides content on Google Cloud's environmental efforts, Carbon Footprint reporting, and sustainability best practices.
 * 
 * Accessibility: The root section element has an `aria-labelledby` linking it to the section title for screen readers.
 * Interactive links use standard `href` and `target="_blank"` with `rel="noopener noreferrer"`.
 * 
 * @returns {React.ReactElement} The section component containing sustainability educational content.
 * @remarks This component has no props and no side effects.
 */
export function Section6() {
    return (
        <section className={sharedStyles.section} id="s6" aria-labelledby="s6-title">
            <div className={sharedStyles.sectionLabel}>Section 6 — Part 6</div>
            <h2 className={sharedStyles.sectionTitle} id="s6-title">サステナビリティと<br />グリーンクラウド</h2>
            <p className={sharedStyles.sectionDesc}>
                Google Cloud の環境への取り組みと、クラウドを活用した IT システムのサステナビリティ（持続可能性）向上について学びます。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌱</span> Google の環境への取り組み <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>企業の責任</span>
                </h3>
                <p>Google は、企業活動における環境負荷を最小限に抑えるための野心的な目標を掲げています。</p>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">マイルストーン</th>
                                <th scope="col">達成・目標内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}><strong>2007</strong> 年</td>
                                <td>大手企業として初めて<strong>カーボンニュートラル達成年</strong>（実質的な温室効果ガス排出ゼロ）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}><strong>2017</strong> 年</td>
                                <td>グローバルな事業運営において<strong>再生可能エネルギー 100% マッチング達成年</strong>（消費電力量と同等量の再生可能エネルギーを購入）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}><strong>2030</strong> 年 (目標)</td>
                                <td><strong>全拠点で 24/7 カーボンフリーエネルギー目標年</strong>（すべての時間帯・地域でカーボンフリーエネルギーだけで事業を運営する目標）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.highlight}>
                    <strong>💡 ポイント：</strong> 100%マッチング（年間の総量が一致する）から、<strong>24/7（24時間365日、常に）</strong>カーボンフリーエネルギーだけで稼働する状態を目指しているのが現在の Google の大きな目標です。
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📊</span> Carbon Footprint（カーボンフットプリント）レポート <span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>Google Cloud ツール</span>
                </h3>
                <p>
                    <strong>Carbon Footprint</strong> は、Google Cloud の利用に伴う温室効果ガス（GHG）排出量を測定、報告、削減するためのツールです。
                </p>
                <ul>
                    <li>利用料金のダッシュボードのように、<strong>クラウドプロジェクトごとの炭素排出量を可視化</strong></li>
                    <li>企業の ESG 報告（環境・社会・ガバナンス）に必要なデータを提供</li>
                    <li>GCP の推奨事項（Active Assist）と連携し、不要なリソース（アイドル状態の VM など）を削除して排出量とコストの両方を削減する提案を行う</li>
                </ul>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">排出カテゴリ (GHGプロトコル)</th>
                                <th scope="col">定義と Google Cloud の対応</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}><strong>Scope 1</strong></td>
                                <td>自社での燃料使用による<strong>直接排出</strong>（社用車や自社工場の燃料など）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}><strong>Scope 2</strong></td>
                                <td>購入した電力・熱・蒸気の製造に伴う<strong>間接排出</strong>。Google Cloud は、お客様の Scope 2 排出量を Scope 3 (Google の排出) として報告します。</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}><strong>Scope 3</strong></td>
                                <td>サプライチェーン全体での<strong>その他の間接排出</strong>（出張、廃棄物、データセンターの建設など）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">☁️</span> クラウド移行で環境負荷を削減できる理由 <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>メリット</span>
                </h3>
                <p>オンプレミスから Google Cloud へ移行するだけで、IT インフラの二酸化炭素排出量を大幅に削減できます。</p>
                <div className={sharedStyles.cards}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">🔋</div>
                        <h4>高いサーバー稼働率</h4>
                        <p>仮想化とマルチテナント技術により、オンプレミスの単一目的サーバーよりもリソースを効率的に使用。</p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">☀️</div>
                        <h4>再生可能エネルギー</h4>
                        <p>Google のデータセンターは、100% 再生可能エネルギーで電力をマッチング（将来的には 24/7）。</p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">❄️</div>
                        <h4>高効率な冷却システム</h4>
                        <p>機械学習を活用した PUE（電力使用効率）の最適化により、冷却に使用する電力を極限まで削減。</p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">♻️</div>
                        <h4>ハードウェアの効率化</h4>
                        <p>カスタム設計のサーバー（TPUなど）と、ハードウェアの寿命延長・リサイクルを通じた循環型経済の実践。</p>
                    </div>
                </div>
            </div>

            <div className={sharedStyles.bpBox}>
                <h5>ベストプラクティス：サステナビリティ</h5>
                <ul>
                    <li><strong>Carbon Footprint ツール</strong>を有効化し、定期的に排出量モニタリングを行う</li>
                    <li><strong>サーバーレス</strong>や<strong>オートスケーリング</strong>を活用し、必要な時だけリソースを稼働させる</li>
                    <li>アーキテクチャ設計時に、<strong>再生可能エネルギー比率の高いリージョン</strong>（例: <code>europe-west4</code> や一部の US リージョン。コンソール上で葉っぱマーク🌱が付いているリージョン）を優先的に選択する</li>
                    <li>Active Assist の推奨事項に従い、<strong>アイドル VM・ディスクの削除</strong>や過剰なプロビジョニングを修正する</li>
                </ul>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔗</span> 公式リソース
                </h3>
                <div className={sharedStyles.sources}>
                    <a className={sharedStyles.sourceLink} href="https://cloud.google.com/sustainability" target="_blank" rel="noopener noreferrer">
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>Google Cloud サステナビリティ公式ページ</strong>
                            <span className={sharedStyles.sourceUrl}>https://cloud.google.com/sustainability</span>
                        </div>
                    </a>
                    <a className={sharedStyles.sourceLink} href="https://cloud.google.com/carbon-footprint" target="_blank" rel="noopener noreferrer">
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>Carbon Footprint ツール — ドキュメント</strong>
                            <span className={sharedStyles.sourceUrl}>https://cloud.google.com/carbon-footprint</span>
                        </div>
                    </a>
                    <a className={sharedStyles.sourceLink} href="https://sustainability.google/reports/" target="_blank" rel="noopener noreferrer">
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>Google 環境サステナビリティ年次報告書</strong>
                            <span className={sharedStyles.sourceUrl}>https://sustainability.google/reports/</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
