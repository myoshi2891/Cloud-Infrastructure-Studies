import React from 'react';
import styles from './Section11.module.css';
import baseStyles from './SectionBase.module.css';

import { SectionCard, DiagramSVG, TableComponent } from '../index';

import { USE_CASES_EXAMPLES } from '../../constants';

/**
 * セクション11: 業界別のデータ活用ユースケース
 * 小売、製造、金融、医療などの業界におけるデータ活用の例について解説します。
 * @returns JSX.Element
 */
export const Section11: React.FC = () => {
    return (
        <div id="s11" className={baseStyles.sgap}>
            <div className={baseStyles.secHead}>
                <div className={`${baseStyles.secNum} ${styles.sn11}`}>11</div>
                <div className={baseStyles.secHeadTxt}>
                    <h2 className={baseStyles.secTitle}>ビジネスユースケース別 データ活用パターン</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-11" idNumber="11" title="ビジネスユースケース別 データ活用パターン">
                <h3 className={baseStyles.stitle}>11.1 小売・EC 業界でのデータ活用</h3>
                <DiagramSVG viewBox="0 0 700 180" ariaLabel="小売・EC 業界のデータ活用図: POS/Webログ/在庫データ → BigQuery/Vertex AI → 需要予測・自動発注。顧客レビュー → Natural Language API → 品質改善。商品画像 → Vision API → 不良品自動検出">
                    <rect x="10" y="10" width="680" height="160" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">課題: 売上を伸ばしたい・在庫ロスを減らしたい</text>
                    
                    <text x="30" y="80" fill="currentColor" fontWeight="bold">データ活用の全体像:</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">POS/Webログ/在庫データ → BigQuery/Vertex AI → 需要予測・自動発注</text>
                    <text x="40" y="125" fill="currentColor" fontSize="14">顧客レビュー → Natural Language API → 品質改善施策</text>
                    <text x="40" y="145" fill="currentColor" fontSize="14">商品画像 → Vision API → 不良品自動検出</text>
                </DiagramSVG>

                <h4 className={`${baseStyles.stitle} mt-6`}>具体的な活用例</h4>
                <TableComponent getRowKey={(row, i) => i}
                    headers={['課題', 'データ', 'GCP サービス', '効果']}
                    rows={USE_CASES_EXAMPLES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.problem}</strong></td>
                            <td>{row.data}</td>
                            <td>{row.gcpService}</td>
                            <td>{row.effect}</td>
                        </tr>
                    )}
                />

                <h3 className={`${baseStyles.stitle} mt-6`}>11.2 製造業でのデータ活用</h3>
                <DiagramSVG viewBox="0 0 700 160" ariaLabel="製造業のデータ活用図: IoT センサーデータ → Pub/Sub → Dataflow → BigQuery → Vertex AI → 設備の故障を2週間前に予測し計画外停止を削減">
                    <rect x="10" y="10" width="680" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">課題: 品質不良を減らしたい・設備ダウンタイムを削減したい</text>
                    
                    <text x="40" y="70" fill="currentColor" fontSize="14">IoT センサーデータ → Pub/Sub → Dataflow → BigQuery → Vertex AI</text>
                    <text x="40" y="90" fill="currentColor" fontSize="14">↓</text>
                    <text x="40" y="110" fill="currentColor" fontSize="14">設備の故障を2週間前に予測（予兆検知モデル）、計画外停止を削減</text>
                </DiagramSVG>

                <h3 className={`${baseStyles.stitle} mt-6`}>11.3 金融業でのデータ活用</h3>
                <DiagramSVG viewBox="0 0 700 160" ariaLabel="金融業のデータ活用図: 取引データ（毎秒数万件）→ Pub/Sub → Dataflow → Vertex AI → 1ミリ秒以内に正常承認または不正取引停止の判定">
                    <rect x="10" y="10" width="680" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">課題: 不正取引を即座に検知したい</text>
                    
                    <text x="40" y="70" fill="currentColor" fontSize="14">取引データ（毎秒数万件） → Pub/Sub → Dataflow → Vertex AI</text>
                    <text x="40" y="90" fill="currentColor" fontSize="14">↓</text>
                    <text x="40" y="110" fill="currentColor" fontSize="14">1ミリ秒以内に判定し、正常なら承認、不正なら即座に取引停止</text>
                </DiagramSVG>

                <h3 className={`${baseStyles.stitle} mt-6`}>11.4 医療業界でのデータ活用</h3>
                <pre className="code-block"><code className="language-text">{`課題: 診断精度を上げたい・業務効率化

医療画像（レントゲン・CT・MRI）
    ↓
Cloud Storage（HIPAA 対応構成が可能なストレージ）
    ↓
Cloud Healthcare API（HL7 FHIR 対応）
    ↓
Vertex AI（医療画像 AI / Medical Imaging）
    ↓
診断支援・所見の自動生成

注意事項:
  - 医療データは HIPAA（米国）・個人情報保護法の対象
  - Google Cloud は HIPAA BAA（事業提携契約）に対応
  - データ暗号化・アクセスログが必須`}</code></pre>
                <hr className={baseStyles.secHr} />
            </SectionCard>
        </div>
    );
};
