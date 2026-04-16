import React from 'react';
import styles from './Section12.module.css';

import { SectionCard, DiagramSVG, TableComponent } from '../index';

import { CONFUSION_POINTS } from '../../constants';

/**
 * セクション12: Section 2 試験対策まとめ
 * 最重要用語や頻出の問題パターンについて解説します。
 * @returns JSX.Element
 */
export const Section12: React.FC = () => {
    return (
        <div id="s12" className={styles.sgap}>
            <div className={styles.secHead}>
                <div className={`${styles.secNum} ${styles.sn12}`}>12</div>
                <div className={styles.secHeadTxt}>
                    <h2 className={styles.secTitle}>Section 2 試験対策まとめ</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-12" idNumber="12" title="Section 2 総まとめ・頻出問題パターン">
                <h3 className={styles.stitle}>12.1 最重要用語の一問一答</h3>
                <DiagramSVG viewBox="0 0 700 240">
                    <rect x="10" y="10" width="680" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontSize="13">Q: BigQuery を一言で表すと？</text>
                    <text x="30" y="60" fill="currentColor" fontSize="13">A: サーバーレスでペタバイト規模のデータを SQL で分析できるデータウェアハウス</text>
                    
                    <text x="30" y="90" fill="currentColor" fontSize="13">Q: Looker と Looker Studio の最大の違いは？</text>
                    <text x="30" y="110" fill="currentColor" fontSize="13">A: Looker は有料のエンタープライズ BI、Looker Studio は無料セルフサービス BI</text>
                    
                    <text x="30" y="140" fill="currentColor" fontSize="13">Q: Dataflow vs Dataproc の違いは？</text>
                    <text x="30" y="160" fill="currentColor" fontSize="13">A: Dataflow は Beam（サーバーレス）、Dataproc は Hadoop/Spark（既存コード）</text>

                    <text x="30" y="190" fill="currentColor" fontSize="13">Q: 匿名化と仮名化の違いは？</text>
                    <text x="30" y="210" fill="currentColor" fontSize="13">A: 匿名化=再識別不可能（GDPR 対象外）、仮名化=再識別可能（GDPR 対象）</text>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>12.2 よく出る問題パターンと解法</h3>
                <h4 className="stitle mt-4">パターン 1: データベース選択</h4>
                <DiagramSVG viewBox="0 0 700 160">
                    <rect x="10" y="10" width="680" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">問題:</text>
                    <text x="75" y="40" fill="currentColor" fontSize="14">「世界中のユーザーが同時に在庫を更新するグローバル EC。どの DB が最適？」</text>
                    
                    <text x="30" y="70" fill="currentColor" fontWeight="bold">解法のステップ:</text>
                    <text x="40" y="90" fill="currentColor" fontSize="14">1. RDB か？(はい) 2. グローバルか？(はい) 3. 強一貫性か？(はい)</text>
                    <text x="30" y="120" fill="currentColor" fontWeight="bold">答え: Cloud Spanner</text>
                    <text x="170" y="120" fill="currentColor" fontSize="14">（グローバル展開・強一貫性・水平スケール）</text>
                </DiagramSVG>

                <h4 className={styles.stitleSub}>パターン 2: ストレージクラス選択</h4>
                <DiagramSVG viewBox="0 0 800 200" ariaLabel="Storage class selection: Archive for 7-year retention">
                    <rect x="10" y="10" width="680" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">問題:</text>
                    <text x="75" y="40" fill="currentColor" fontSize="14">「規制上 7 年間保持が必要で、年に 1 回の監査時のみアクセス。最も安いクラスは？」</text>
                    
                    <text x="30" y="70" fill="currentColor" fontWeight="bold">解法:</text>
                    <text x="40" y="90" fill="currentColor" fontSize="14">アクセス頻度: 年 1 回以下。保存期間: 365日以上。コスト最小化。</text>
                    <text x="30" y="120" fill="currentColor" fontWeight="bold">答え: Archive</text>
                </DiagramSVG>

                <h4 className={`${styles.stitle} mt-6`}>パターン 3: データパイプライン選択</h4>
                <DiagramSVG viewBox="0 0 700 160">
                    <rect x="10" y="10" width="680" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">問題:</text>
                    <text x="75" y="40" fill="currentColor" fontSize="14">「クレカの不正取引を取引直後に検知したい。アーキテクチャは？」</text>
                    
                    <text x="30" y="70" fill="currentColor" fontWeight="bold">解法:</text>
                    <text x="40" y="90" fill="currentColor" fontSize="14">リアルタイム性が必要（ストリーミング）。Pub/Sub + Dataflow + Vertex AI。</text>
                    <text x="30" y="120" fill="currentColor" fontWeight="bold">答え: Pub/Sub → Dataflow → Vertex AI</text>
                </DiagramSVG>

                <h4 className={`${styles.stitle} mt-6`}>パターン 4: BI ツール選択</h4>
                <DiagramSVG viewBox="0 0 700 160">
                    <rect x="10" y="10" width="680" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">問題:</text>
                    <text x="75" y="40" fill="currentColor" fontSize="14">「大企業全社で統一されたデータ定義に基づくダッシュボードを構築したい。」</text>
                    
                    <text x="30" y="70" fill="currentColor" fontWeight="bold">解法:</text>
                    <text x="40" y="90" fill="currentColor" fontSize="14">「全社統一」「データ定義一元管理（LookML）」が必要。</text>
                    <text x="30" y="120" fill="currentColor" fontWeight="bold">答え: Looker</text>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>12.3 混同しやすいポイントの整理</h3>
                <TableComponent
                    headers={['混同パターン', '正しい理解']}
                    rows={CONFUSION_POINTS}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.pattern}</strong></td>
                            <td>{row.truth}</td>
                        </tr>
                    )}
                />

                <h3 className={`${styles.stitle} mt-6`}>12.4 Section 2 チェックリスト</h3>
                <pre className="code-block"><code className="language-text">{`試験前の最終確認:

□ 構造化・半構造化・非構造化データの違いと例を説明できる
□ データ分析の4レベル（記述・診断・予測・処方）を説明できる
□ Cloud Storage の 4 ストレージクラスと使い分けを説明できる
□ ライフサイクルポリシーの目的と設定方法を理解している
□ データベース選択フロー（RDB vs NoSQL・規模・用途）を理解している
□ BigQuery の特徴（サーバーレス・SQL 分析・DWH）を説明できる
□ Looker と Looker Studio の違いを明確に説明できる
□ Pub/Sub・Dataflow・Dataproc の役割の違いを説明できる
□ バッチ処理とストリーミング処理の使い分けを理解している
□ 匿名化・仮名化・差分プライバシーの違いを説明できる
□ Dataplex と Sensitive Data Protection の役割を説明できる
□ データガバナンスとはなにか、なぜ重要かを説明できる`}</code></pre>
                <hr className={styles.secHr} />
            </SectionCard>
        </div>
    );
};;
