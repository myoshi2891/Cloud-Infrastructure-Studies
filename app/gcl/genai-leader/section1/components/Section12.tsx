import { ReferencesBlock } from './ReferencesBlock';

/* ── Sub-section 1.2: データの種類 ── */
export default function Section12() {
    return (
        <section id="s12">
            <div className="sh shb">
                <div className="sh-icon si-b">📊</div>
                <div className="sh-body">
                    <h2>データの種類とビジネス的意味</h2>
                    <p>構造化 vs 非構造化・ラベルあり vs なし・データ品質の6特性 — Gen AI を成功させるデータの本質を理解する</p>
                </div>
                <div className="sh-badge sbb">頻出</div>
            </div>

            <div className="card">
                <div className="card-h">🗄️ 構造化データ vs 非構造化データ</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    データの<strong style={{ color: 'var(--aurora3)' }}>80〜90% は非構造化データ</strong>と言われる。
                    Gen AI の革命的な点は、これまでコンピュータが扱いにくかった非構造化データを活用できるようになった点にある。
                </p>

                <table className="ctbl">
                    <thead>
                        <tr>
                            <th>種類</th>
                            <th>特徴</th>
                            <th>具体例</th>
                            <th>GCP 格納先</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: 'var(--aurora3)', fontFamily: 'var(--mono)', fontWeight: 600 }}>構造化データ</td>
                            <td>明確なスキーマ・行列形式</td>
                            <td>売上データ・顧客情報・センサー値</td>
                            <td>BigQuery · Cloud SQL · Spanner</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--aurora1)', fontFamily: 'var(--mono)', fontWeight: 600 }}>非構造化データ</td>
                            <td>スキーマなし・全体の80〜90%</td>
                            <td>テキスト・画像・音声・動画・PDF</td>
                            <td>Cloud Storage · AlloyDB</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--aurora4)', fontFamily: 'var(--mono)', fontWeight: 600 }}>半構造化データ</td>
                            <td>柔軟なスキーマ・階層構造あり</td>
                            <td>JSON・XML・メール・ログ</td>
                            <td>Firestore · BigQuery JSON</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <div className="card-h">⚖️ データ品質の6特性</div>
                <div className="glossary">
                    <div className="gterm">
                        <div className="gt-en">Accuracy</div>
                        <div className="gt-jp">正確性</div>
                        <div className="gt-def">データが現実の状態を正しく反映しているか。誤ったデータはモデルを誤った方向に学習させる。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Completeness</div>
                        <div className="gt-jp">完全性</div>
                        <div className="gt-def">必要なデータが欠損なく揃っているか。欠損値が多いと偏ったモデルになる。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Consistency</div>
                        <div className="gt-jp">一貫性</div>
                        <div className="gt-def">異なるシステム間でデータが矛盾なく整合しているか。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Timeliness</div>
                        <div className="gt-jp">適時性</div>
                        <div className="gt-def">データが最新の状態を反映しているか。古いデータで学習したモデルは時代遅れの予測をする。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Uniqueness</div>
                        <div className="gt-jp">一意性</div>
                        <div className="gt-def">重複レコードがないか。重複はモデルの過学習を引き起こす。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Validity</div>
                        <div className="gt-jp">妥当性</div>
                        <div className="gt-def">データが定義されたルール・形式・範囲に従っているか。</div>
                    </div>
                </div>
                <ReferencesBlock
                    title="📎 参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/dataplex/docs/data-quality-overview' },
                        { href: 'https://cloud.google.com/security/products/sensitive-data-protection' },
                    ]}
                />
            </div>
        </section>
    );
}
