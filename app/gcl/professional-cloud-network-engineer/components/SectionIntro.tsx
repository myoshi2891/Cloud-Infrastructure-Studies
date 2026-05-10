import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the INTRO section presenting the PCNE exam overview and preparation guidance.
 *
 * @returns The section element containing the exam description, a score breakdown for S1–S6, recommended learning steps, and links to official resources.
 */
export function SectionIntro() {
    return (
        <section className={sharedStyles.section} id="overview" aria-labelledby="intro-title">
            <div className={sharedStyles.sectionLabel}>INTRO</div>
            <h2 className={sharedStyles.sectionTitle} id="intro-title">試験の全体像と準備方法</h2>
            <p className={sharedStyles.sectionDesc}>
                PCNEは、Google Cloudのネットワークインフラを設計・実装・管理・最適化する能力を証明する上級資格です。単なる操作知識でなく、アーキテクチャ設計の判断力が問われます。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 出題配点バー */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📊</span> 出題セクション別 配点
                </h3>
                <div className={sharedStyles.weightRow}>
                    <div className={sharedStyles.weightItem}>
                        <div className={sharedStyles.weightHeader}>
                            <span className={sharedStyles.weightLabel}>S1: VPCネットワーク設計</span>
                            <span className={sharedStyles.weightPercent}>~21%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={`${sharedStyles.weightFill} ${sharedStyles.weightFillS1} ${sharedStyles.weightW21}`}></div>
                        </div>
                    </div>
                    <div className={sharedStyles.weightItem}>
                        <div className={sharedStyles.weightHeader}>
                            <span className={sharedStyles.weightLabel}>S2: ハイブリッド接続・ネットワーク相互接続</span>
                            <span className={sharedStyles.weightPercent}>~23%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={`${sharedStyles.weightFill} ${sharedStyles.weightFillS2} ${sharedStyles.weightW23}`}></div>
                        </div>
                    </div>
                    <div className={sharedStyles.weightItem}>
                        <div className={sharedStyles.weightHeader}>
                            <span className={sharedStyles.weightLabel}>S3: ロードバランシングとトラフィック管理</span>
                            <span className={sharedStyles.weightPercent}>~19%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={`${sharedStyles.weightFill} ${sharedStyles.weightFillS3} ${sharedStyles.weightW19}`}></div>
                        </div>
                    </div>
                    <div className={sharedStyles.weightItem}>
                        <div className={sharedStyles.weightHeader}>
                            <span className={sharedStyles.weightLabel}>S4: CDN・DNS・IPアドレス管理</span>
                            <span className={sharedStyles.weightPercent}>~15%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={`${sharedStyles.weightFill} ${sharedStyles.weightFillS4} ${sharedStyles.weightW15}`}></div>
                        </div>
                    </div>
                    <div className={sharedStyles.weightItem}>
                        <div className={sharedStyles.weightHeader}>
                            <span className={sharedStyles.weightLabel}>S5: ネットワークセキュリティの設計と実装</span>
                            <span className={sharedStyles.weightPercent}>~12%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={`${sharedStyles.weightFill} ${sharedStyles.weightFillS5} ${sharedStyles.weightW12}`}></div>
                        </div>
                    </div>
                    <div className={sharedStyles.weightItem}>
                        <div className={sharedStyles.weightHeader}>
                            <span className={sharedStyles.weightLabel}>S6: ネットワーク操作と監視</span>
                            <span className={sharedStyles.weightPercent}>~10%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={`${sharedStyles.weightFill} ${sharedStyles.weightFillS6} ${sharedStyles.weightW10}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 学習ステップ */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📈</span> 推奨学習ステップ
                </h3>
                <div className={sharedStyles.flowSteps}>
                    <div className={sharedStyles.flowStep}>
                        <div className={`${sharedStyles.flowStepNum} ${sharedStyles.flowStepNumS1}`}>1</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>公式試験ガイドを熟読する（必須）</div>
                            <div className={sharedStyles.flowStepBody}>試験範囲の正式定義を確認。本ガイドと照らし合わせながら学習計画を立てる。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={`${sharedStyles.flowStepNum} ${sharedStyles.flowStepNumS2}`}>2</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>Cloud Skills Boost のPCNEラーニングパスを修了</div>
                            <div className={sharedStyles.flowStepBody}>体系的な動画学習と実践演習。GCPのネットワーキング基礎から始められる。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={`${sharedStyles.flowStepNum} ${sharedStyles.flowStepNumS3}`}>3</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>ハンズオンラボで実際に操作する</div>
                            <div className={sharedStyles.flowStepBody}>VPC・Cloud VPN・Cloud Interconnect・ロードバランサーの実際の構築体験が合否を分ける。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={`${sharedStyles.flowStepNum} ${sharedStyles.flowStepNumS4}`}>4</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>公式サンプル問題・模擬試験で実力測定</div>
                            <div className={sharedStyles.flowStepBody}>弱点を可視化して集中補強。シナリオベースの設問形式に慣れる。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={`${sharedStyles.flowStepNum} ${sharedStyles.flowStepNumS5}`}>5</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>弱点分野を公式ドキュメントで補強して試験登録</div>
                            <div className={sharedStyles.flowStepBody}>本ガイドの各セクションの「参照URL」から公式ドキュメントを直接確認する。</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 公式リソース */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📚</span> 公式リソース
                </h3>
                <div className={sharedStyles.sources}>
                    <a className={sharedStyles.sourceLink} href="https://cloud.google.com/learn/certification/cloud-network-engineer" target="_blank" rel="noopener noreferrer">
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>公式試験ページ — Professional Cloud Network Engineer</strong>
                            <span className={sharedStyles.sourceUrl}>cloud.google.com/learn/certification/cloud-network-engineer</span>
                        </div>
                    </a>
                    <a className={sharedStyles.sourceLink} href="https://cloud.google.com/learn/certification/guides/cloud-network-engineer" target="_blank" rel="noopener noreferrer">
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">📄</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>公式試験ガイド（出題範囲の詳細）</strong>
                            <span className={sharedStyles.sourceUrl}>cloud.google.com/learn/certification/guides/cloud-network-engineer</span>
                        </div>
                    </a>
                    <a className={sharedStyles.sourceLink} href="https://services.google.com/fh/files/misc/042426_professional_cloud_network_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">📑</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>最新試験ガイド PDF（英語・2024年4月版）</strong>
                            <span className={sharedStyles.sourceUrl}>services.google.com/fh/files/misc/042426_...exam_guide_english.pdf</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
