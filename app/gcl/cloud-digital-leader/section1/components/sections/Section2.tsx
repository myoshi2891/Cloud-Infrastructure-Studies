import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { ON_PREMISE_ISSUES } from '../../constants';
import styles from './Section2.module.css';

/**
 * セクション2: なぜ今クラウドなのか？デジタルトランスフォーメーションの本質
 * @returns セクション2のReact要素
 */
export const Section2: React.FC = () => (
    <div id="s2" className={styles.sgap}>
        <div className={styles.secHead}>
            <div className={styles.secNum}>02</div>
            <div className={styles.secHeadTxt}>
                <h2 className={styles.secTitle}>なぜ今クラウドなのか？デジタルトランスフォーメーションの本質</h2>
                <p className={styles.tdesc}>デジタルトランスフォーメーション（DX）とは / クラウドが必要な理由</p>
            </div>
        </div>

        <SectionCard
            id="cdl-2"
            idNumber="2.1"
            title="デジタルトランスフォーメーション（DX）とは？"
            description={
                <>
                    <strong>デジタルトランスフォーメーション（DX）</strong>とは、デジタル技術を活用してビジネスモデル・プロセス・文化・顧客体験を根本的に変革し、競争優位を確立することです。<br />
                    ⚠️ <strong>よくある誤解</strong>: DX は「IT システムを刷新すること」ではありません。技術はあくまで手段であり、<strong>ビジネスそのものを変革すること</strong>が本質です。
                </>
            }
        >
            <div className={styles.stitle}>DX の 3 つのレベル</div>
            <DiagramSVG viewBox="0 0 600 240" ariaLabel="DXの3つのレベル">
                <g transform="translate(10, 20)">
                    <text x="0" y="0" fill="currentColor" fontSize="14" fontWeight="bold">レベル 3: ビジネスモデル変革（本当の DX）</text>
                    <path d="M 10 10 L 10 30 L 20 30" strokeWidth="2" stroke="var(--color-primary)" />
                    <text x="30" y="35" fill="currentColor" fontSize="13">新しい収益モデル・市場の創出 (例: 製品販売 → サービス課金)</text>
                </g>
                <g transform="translate(10, 90)">
                    <text x="0" y="0" fill="currentColor" fontSize="14" fontWeight="bold">レベル 2: プロセス変革</text>
                    <path d="M 10 10 L 10 30 L 20 30" strokeWidth="2" stroke="var(--color-primary)" />
                    <text x="30" y="35" fill="currentColor" fontSize="13">既存業務フローの根本的な再設計 (例: 手動処理 → AI/IoT自動化)</text>
                </g>
                <g transform="translate(10, 160)">
                    <text x="0" y="0" fill="currentColor" fontSize="14" fontWeight="bold">レベル 1: デジタル化（Digitization）</text>
                    <path d="M 10 10 L 10 30 L 20 30" strokeWidth="2" stroke="var(--color-primary)" />
                    <text x="30" y="35" fill="currentColor" fontSize="13">アナログ → デジタルへの単純変換 (※これだけでは DX とは言えない)</text>
                </g>
            </DiagramSVG>

            <h3 className={styles.stitle}>2.2 なぜ今クラウドが必要なのか？</h3>
            <h3 className={styles.stitle}>従来のオンプレミス環境が抱える 5 つの課題</h3>
            <TableComponent
                headers={['課題', '説明', 'ビジネスへの影響']}
                rows={ON_PREMISE_ISSUES}
                renderRow={(row) => (
                    <tr key={row.issue}>
                        <td><strong>{row.issue}</strong></td>
                        <td>{row.description}</td>
                        <td>{row.impact}</td>
                    </tr>
                )}
            />

            <h3 className={styles.stitle}>クラウドが解決できること</h3>
            <DiagramSVG viewBox="0 0 600 200" ariaLabel="オンプレミス対クラウド比較">
                <text x="10" y="20" fill="currentColor" fontSize="14" fontWeight="bold">課題: 「新しいサービスを来週リリースしたい」</text>
                <text x="50" y="50" fill="currentColor" fontSize="14" fontWeight="bold">オンプレミス</text>
                <text x="350" y="50" fill="currentColor" fontSize="14" fontWeight="bold">クラウド</text>
                
                <rect x="40" y="65" width="200" height="30" rx="4" stroke="currentColor" />
                <text x="50" y="85" fill="currentColor" fontSize="12">サーバー発注 (2週間)</text>
                <path d="M 140 95 L 140 115" stroke="currentColor" markerEnd="url(#arrow)" />
                
                <rect x="40" y="115" width="200" height="30" rx="4" stroke="currentColor" />
                <text x="50" y="135" fill="currentColor" fontSize="12">設置・設定・テスト (2週間)</text>
                <path d="M 140 145 L 140 165" stroke="currentColor" markerEnd="url(#arrow)" />
                
                <rect x="40" y="165" width="200" height="30" rx="4" stroke="currentColor" strokeDasharray="4" />
                <text x="50" y="185" fill="var(--color-muted-foreground)" fontSize="12">リリース (4〜6週間後)</text>
                
                <rect x="340" y="65" width="200" height="30" rx="4" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity="0.1" />
                <text x="350" y="85" fill="currentColor" fontSize="12">コンソールでクリック (数分)</text>
                <path d="M 440 95 L 440 115" stroke="var(--color-primary)" markerEnd="url(#arrow-primary)" />
                
                <rect x="340" y="115" width="200" height="30" rx="4" stroke="var(--color-primary)" fillOpacity="0.1" />
                <text x="350" y="135" fill="currentColor" fontSize="12">テスト開始 (即日)</text>
                <path d="M 440 145 L 440 165" stroke="var(--color-primary)" markerEnd="url(#arrow-primary)" />
                
                <rect x="340" y="165" width="200" height="30" rx="4" stroke="var(--color-primary)" fill="var(--color-primary)" />
                <text x="350" y="185" fill="var(--color-background)" fontSize="12" fontWeight="bold">リリース (数日後)</text>
                
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                    </marker>
                    <marker id="arrow-primary" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" />
                    </marker>
                </defs>
            </DiagramSVG>

            <h3 className={styles.stitle}>2.3 クラウドが DX を加速する 3 つのメカニズム</h3>
            <DiagramSVG viewBox="0 0 600 220" ariaLabel="クラウドがDXを加速するメカニズム">
                <g transform="translate(10, 20)">
                    <text x="0" y="0" fill="var(--color-primary)" fontSize="14" fontWeight="bold">メカニズム 1: スピードと俊敏性</text>
                    <text x="10" y="20" fill="currentColor" fontSize="13">・インフラを数分で調達 → 実験・検証サイクルを高速化</text>
                    <text x="10" y="40" fill="currentColor" fontSize="13">・失敗しても損失が少ない → 積極的なイノベーションが可能</text>
                </g>
                <g transform="translate(10, 90)">
                    <text x="0" y="0" fill="var(--color-primary)" fontSize="14" fontWeight="bold">メカニズム 2: データとインテリジェンスの活用</text>
                    <text x="10" y="20" fill="currentColor" fontSize="13">・大量データを安価に保存・分析 / AI・MLを追加投資なしに利用</text>
                    <text x="10" y="40" fill="currentColor" fontSize="13">・リアルタイムで顧客の行動を把握し意思決定</text>
                </g>
                <g transform="translate(10, 160)">
                    <text x="0" y="0" fill="var(--color-primary)" fontSize="14" fontWeight="bold">メカニズム 3: コスト構造の最適化</text>
                    <text x="10" y="20" fill="currentColor" fontSize="13">・固定費（CapEx）→ 変動費（OpEx）へ転換（使った分だけ支払う）</text>
                    <text x="10" y="40" fill="currentColor" fontSize="13">・節約したコストをイノベーションに再投資</text>
                </g>
            </DiagramSVG>
            <p className={styles.tdesc}>📎 <strong>参照</strong>: Google Cloud が考える DX<br />
            <a href="https://cloud.google.com/solutions/smart-analytics" target="_blank" rel="noreferrer">https://cloud.google.com/solutions/smart-analytics</a><br />
            <a href="https://cloud.google.com/transform" target="_blank" rel="noreferrer">https://cloud.google.com/transform</a></p>
        </SectionCard>
    </div>
);