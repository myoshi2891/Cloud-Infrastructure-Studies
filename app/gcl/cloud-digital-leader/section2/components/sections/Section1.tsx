import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { SUB_TOPICS } from '../../constants';
import styles from './Section1.module.css';

/**
 * セクション1: 出題範囲と学習ポイント
 * Section 1 の概要およびサブトピック一覧を表示します。
 * @returns JSX.Element
 */
export const Section1: React.FC = () => (
    <div id="s1" className={styles.sgap}>
        <div className={styles.secHead}>
            <div className={`${styles.secNum} ${styles.sn1}`}>01</div>
            <div className={styles.secHeadTxt}>
                <h2 className={styles.secTitle}>Section 2 の出題範囲と学習ポイント</h2>
            </div>
        </div>
        <SectionCard id="cdl-2-1" idNumber="1" title="Section 2 の出題範囲と学習ポイント">
                <h3 className="stitle">1.1 試験における Section 2 の位置づけ</h3>
                <p className="tdesc">
                    Google Cloud Digital Leader（CDL）試験の Section 2 は
                    「<strong>Google Cloud によるデータ トランスフォーメーションの探求</strong>」がテーマです。
                </p>

                <div className="stitle mt-6">Section 2 で問われる主なこと:</div>
                <DiagramSVG viewBox="0 0 600 240">
                    <rect x="10" y="10" width="580" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="45" fill="currentColor" fontSize="14">① データの種類（構造化・非構造化）とビジネス価値の違い</text>
                    <text x="30" y="75" fill="currentColor" fontSize="14">② データのライフサイクル（収集→保存→処理→分析→活用）</text>
                    <text x="30" y="105" fill="currentColor" fontSize="14">③ 適切なストレージ・データベースサービスの選択</text>
                    <text x="30" y="135" fill="currentColor" fontSize="14">④ BigQuery によるデータ分析の仕組みとメリット</text>
                    <text x="30" y="165" fill="currentColor" fontSize="14">⑤ Looker / Looker Studio による BI・可視化の違い</text>
                    <text x="30" y="195" fill="currentColor" fontSize="14">⑥ データパイプライン（Dataflow・Pub/Sub・Dataproc）の役割</text>
                    <text x="30" y="225" fill="currentColor" fontSize="14">⑦ データガバナンスとプライバシー保護の考え方</text>
                </DiagramSVG>

                <h3 className="stitle mt-6">1.2 Section 2 のサブトピック一覧</h3>
                <TableComponent
                    headers={['#', 'サブトピック', '重要度']}
                    rows={SUB_TOPICS}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td>{row.id}</td>
                            <td>{row.topic}</td>
                            <td>{row.importance}</td>
                        </tr>
                    )}
                />
                <hr className="sec-hr" />
            </SectionCard>
            </div>
            );