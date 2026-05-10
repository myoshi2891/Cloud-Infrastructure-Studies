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
                <div style={{ display: 'grid', gap: '10px', margin: '16px 0 28px' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-foreground)' }}>S1: VPCネットワーク設計</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>~21%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={sharedStyles.weightFill} style={{ width: '21%', background: '#4f8ef7' }}></div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-foreground)' }}>S2: ハイブリッド接続・ネットワーク相互接続</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>~23%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={sharedStyles.weightFill} style={{ width: '23%', background: '#4caf50' }}></div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-foreground)' }}>S3: ロードバランシングとトラフィック管理</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>~19%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={sharedStyles.weightFill} style={{ width: '19%', background: '#ff9800' }}></div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-foreground)' }}>S4: CDN・DNS・IPアドレス管理</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>~15%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={sharedStyles.weightFill} style={{ width: '15%', background: '#9c27b0' }}></div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-foreground)' }}>S5: ネットワークセキュリティの設計と実装</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>~12%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={sharedStyles.weightFill} style={{ width: '12%', background: '#f44336' }}></div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-foreground)' }}>S6: ネットワーク操作と監視</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>~10%</span>
                        </div>
                        <div className={sharedStyles.weightTrack}>
                            <div className={sharedStyles.weightFill} style={{ width: '10%', background: '#ffeb3b' }}></div>
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
                        <div className={sharedStyles.flowStepNum} style={{ background: 'color-mix(in srgb, #4f8ef7 15%, transparent)', color: '#4f8ef7', border: '1px solid color-mix(in srgb, #4f8ef7 30%, transparent)' }}>1</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>公式試験ガイドを熟読する（必須）</div>
                            <div className={sharedStyles.flowStepBody}>試験範囲の正式定義を確認。本ガイドと照らし合わせながら学習計画を立てる。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum} style={{ background: 'color-mix(in srgb, #4caf50 15%, transparent)', color: '#4caf50', border: '1px solid color-mix(in srgb, #4caf50 30%, transparent)' }}>2</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>Cloud Skills Boost のPCNEラーニングパスを修了</div>
                            <div className={sharedStyles.flowStepBody}>体系的な動画学習と実践演習。GCPのネットワーキング基礎から始められる。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum} style={{ background: 'color-mix(in srgb, #ff9800 15%, transparent)', color: '#ff9800', border: '1px solid color-mix(in srgb, #ff9800 30%, transparent)' }}>3</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>ハンズオンラボで実際に操作する</div>
                            <div className={sharedStyles.flowStepBody}>VPC・Cloud VPN・Cloud Interconnect・ロードバランサーの実際の構築体験が合否を分ける。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum} style={{ background: 'color-mix(in srgb, #9c27b0 15%, transparent)', color: '#9c27b0', border: '1px solid color-mix(in srgb, #9c27b0 30%, transparent)' }}>4</div>
                        <div>
                            <div className={sharedStyles.flowStepTitle}>公式サンプル問題・模擬試験で実力測定</div>
                            <div className={sharedStyles.flowStepBody}>弱点を可視化して集中補強。シナリオベースの設問形式に慣れる。</div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum} style={{ background: 'color-mix(in srgb, #f44336 15%, transparent)', color: '#f44336', border: '1px solid color-mix(in srgb, #f44336 30%, transparent)' }}>5</div>
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
