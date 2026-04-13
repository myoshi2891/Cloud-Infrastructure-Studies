import type { Metadata } from 'next';
import './section1.css';
import {
    SUB_TOPICS,
    ON_PREMISE_ISSUES,
    IAAS_FEATURES,
    IAAS_SERVICES,
    PAAS_FEATURES,
    PAAS_SERVICES,
    SAAS_FEATURES,
    SAAS_SERVICES,
    PUBLIC_CLOUD_FEATURES,
    PRIVATE_CLOUD_FEATURES,
    HYBRID_CLOUD_MERITS,
    HYBRID_CLOUD_SERVICES,
    DEPLOYMENT_COMPARISON,
    CAPEX_EXAMPLES,
    CAPEX_OPEX_COMPARISON,
    MIGRATION_STRATEGY_COMPARISON,
    GOOGLE_CLOUD_STRENGTHS,
    DX_SOLUTIONS,
    CONFUSION_POINTS,
    SECTION1_REFERENCES,
    ON_PREMISE_VS_CLOUD_COMPARISON,
    CLOUD_MODEL_COMPARISON,
    SERVICE_MODEL_COMPARISON,
    GCDL_REFERENCES
} from './constants';

export const metadata: Metadata = {
    title: 'Section 1: デジタルトランスフォーメーションと Google Cloud | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 1 完全解説 — デジタルトランスフォーメーションの本質と Google Cloud の強み',
};

export default function Section1Page() {
    return (
        <div className="cdl-page">
            
            <section className="hero">
                <div className="hero-eyebrow">Cloud Digital Leader · Section 1</div>
                <h1>
                    デジタルトランスフォーメーションと <span>Google Cloud</span>
                </h1>
                <p className="hero-sub">
                    クラウドの本質的概念・DX の意味・Google Cloud の強みを体系的に理解する
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-blue" />
                        出題比率 約17%
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-red" />
                        最重要セクション
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        ビジネス視点の理解
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="セクションナビゲーション">
                <div className="snav-inner">
                    <a href="#s0" className="snav-link"><span className="snav-num">00</span>ガイド</a>
                    <a href="#s1" className="snav-link"><span className="snav-num">01</span>出題範囲</a>
                    <a href="#s2" className="snav-link"><span className="snav-num">02</span>DX本質</a>
                    <a href="#s3" className="snav-link"><span className="snav-num">03</span>基礎概念</a>
                    <a href="#s4" className="snav-link"><span className="snav-num">04</span>モデル</a>
                    <a href="#s5" className="snav-link"><span className="snav-num">05</span>デプロイ</a>
                    <a href="#s6" className="snav-link"><span className="snav-num">06</span>財務</a>
                    <a href="#s7" className="snav-link"><span className="snav-num">07</span>移行戦略</a>
                    <a href="#s8" className="snav-link"><span className="snav-num">08</span>強み</a>
                    <a href="#s9" className="snav-link"><span className="snav-num">09</span>インフラ</a>
                    <a href="#s10" className="snav-link"><span className="snav-num">10</span>階層</a>
                    <a href="#s11" className="snav-link"><span className="snav-num">11</span>DXソリュ</a>
                    <a href="#s12" className="snav-link"><span className="snav-num">12</span>まとめ</a>
                    <a href="#s13" className="snav-link"><span className="snav-num">13</span>レポート</a>
                    <a href="#s14" className="snav-link"><span className="snav-num">14</span>リソース</a>
                </div>
            </nav>

            <div className="wrapper">
                <main className="page-main sgap">

                    <div id="s0" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn0">00</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">完全攻略ガイド（初学者向け・ステップバイステップ解説）</h2>
                                <p className="tdesc"><strong>対象読者</strong>: クラウド初学者・非技術系ビジネスリーダー<br/>
                                <strong>試験配点</strong>: Section 1 は全体の約 <strong>17%</strong> を占める最重要セクション<br/>
                                <strong>学習目標</strong>: クラウドの本質的概念・DX の意味・Google Cloud の強みを理解する</p>
                            </div>
                        </div>
                    </div>

                    <div id="s1" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn1">01</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">Section 1 の出題範囲と学習ポイント</h2>
                                <p className="tdesc">試験における Section 1 の位置づけ</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-1">
                            <div className="ttitle"><span className="tid">1.1</span> 出題範囲</div>
                            <p className="tdesc">Google Cloud Digital Leader（CDL）試験の Section 1 は「<strong>デジタルトランスフォーメーションと Google Cloud</strong>」がテーマです。<br/>
                            この Section で問われるのは技術的な実装能力ではなく、以下の<strong>ビジネス視点での理解</strong>です。</p>
                            <div className="stitle">試験で問われること:</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 600 160" width="100%" height="100%" fill="none" stroke="currentColor">
                                    <rect x="10" y="10" width="580" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                                    <text x="30" y="45" fill="currentColor" fontSize="14">① クラウドがなぜ必要か（ビジネス的意義）</text>
                                    <text x="30" y="70" fill="currentColor" fontSize="14">② クラウドの基本概念を正確に理解しているか</text>
                                    <text x="30" y="95" fill="currentColor" fontSize="14">③ 自社の状況に最適なクラウド戦略を選べるか</text>
                                    <text x="30" y="120" fill="currentColor" fontSize="14">④ Google Cloud が他社と何が違うか / ⑤ DXをどう進めるか</text>
                                </svg>
                            </div>
                            <div className="stitle">1.2 Section 1 のサブトピック一覧</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>#</th><th>サブトピック</th><th>重要度</th></tr>
                                    </thead>
                                    <tbody>
                                        {SUB_TOPICS.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.id}</td>
                                                <td>{row.topic}</td>
                                                <td>{row.importance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="s2" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn2">02</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">なぜ今クラウドなのか？デジタルトランスフォーメーションの本質</h2>
                                <p className="tdesc">デジタルトランスフォーメーション（DX）とは / クラウドが必要な理由</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-2">
                            <div className="ttitle"><span className="tid">2.1</span> デジタルトランスフォーメーション（DX）とは？</div>
                            <p className="tdesc"><strong>デジタルトランスフォーメーション（DX）</strong>とは、デジタル技術を活用してビジネスモデル・プロセス・文化・顧客体験を根本的に変革し、競争優位を確立することです。</p>
                            <p className="tdesc">⚠️ <strong>よくある誤解</strong>: DX は「IT システムを刷新すること」ではありません。技術はあくまで手段であり、<strong>ビジネスそのものを変革すること</strong>が本質です。</p>
                            <div className="stitle">DX の 3 つのレベル</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 600 240" width="100%" height="100%" fill="none" stroke="currentColor">
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
                                </svg>
                            </div>
                            <div className="stitle">2.2 なぜ今クラウドが必要なのか？</div>
                            <div className="stitle">従来のオンプレミス環境が抱える 5 つの課題</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>課題</th><th>説明</th><th>ビジネスへの影響</th></tr>
                                    </thead>
                                    <tbody>
                                        {ON_PREMISE_ISSUES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.issue}</strong></td>
                                                <td>{row.description}</td>
                                                <td>{row.impact}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">クラウドが解決できること</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 600 200" width="100%" height="100%" fill="none" stroke="currentColor">
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
                                </svg>
                            </div>
                            <div className="stitle">2.3 クラウドが DX を加速する 3 つのメカニズム</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 600 220" width="100%" height="100%" fill="none" stroke="currentColor">
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
                                </svg>
                            </div>
                            <p className="tdesc">📎 <strong>参照</strong>: Google Cloud が考える DX<br/>
                            <a href="https://cloud.google.com/solutions/smart-analytics" target="_blank" rel="noreferrer">https://cloud.google.com/solutions/smart-analytics</a><br/>
                            <a href="https://cloud.google.com/transform" target="_blank" rel="noreferrer">https://cloud.google.com/transform</a></p>
                        </div>
                    </div>

                    <div id="s3" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn3">03</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">クラウドコンピューティングの基礎概念</h2>
                                <p className="tdesc">NIST が定義するクラウドの 5 つの本質的特性</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-3">
                            <div className="ttitle"><span className="tid">3.1</span> クラウドコンピューティングの定義</div>
                            <p className="tdesc"><strong>クラウドコンピューティング</strong>とは、インターネット（クラウド）を通じて、コンピューティングリソース（サーバー・ストレージ・データベース・ネットワーク・ソフトウェア・分析・インテリジェンス）を<strong>オンデマンドで提供するサービスモデル</strong>です。</p>
                            <div className="stitle">📌 ポイント：「クラウド」という名前の由来</div>
                            <pre><code>{`昔のネットワーク図では、インターネットを
「雲（クラウド）☁️」の記号で表していました。
その「雲の向こう側」でコンピューティングを行うことから
「クラウドコンピューティング」と呼ばれます。`}</code></pre>
                            <div className="stitle">3.2 NIST が定義するクラウドの 5 つの本質的特性</div>
                            <p className="tdesc"><strong>NIST（米国国立標準技術研究所）</strong>が定めた、クラウドの必須要件です。試験では「これはクラウドの特性か？」を判断する問題が出ます。</p>
                            <div className="stitle">特性 ① オンデマンド・セルフサービス（On-demand Self-service）</div>
                            <pre><code>{`意味: 人間（ベンダー担当者）の介入なしに、
      必要な時に必要なリソースを自動的に調達できる。

具体例:

  - Google Cloud Console でボタンを押すだけで VM が起動
  - API 呼び出しで自動的にサーバーが増設される
  - クレジットカードがあれば今すぐ使い始められる

ビジネス価値: IT 部門への申請・承認待ち時間がゼロ`}</code></pre>
                            <div className="stitle">特性 ② 幅広いネットワークアクセス（Broad Network Access）</div>
                            <pre><code>{`意味: 標準的なネットワーク（インターネット）を通じて、
      様々なデバイスからアクセス可能。

具体例:

  - スマートフォン・タブレット・PC・どこからでもアクセス
  - 自宅・オフィス・カフェ・世界中どこでも同じ環境
  - 特殊なソフトウェアやプロトコル不要

ビジネス価値: 場所・端末に縛られない働き方の実現（リモートワーク対応）`}</code></pre>
                            <div className="stitle">特性 ③ リソースのプーリング（Resource Pooling）</div>
                            <pre><code>{`意味: 複数のユーザーが物理リソースを共有する
      マルチテナント型のモデル。ユーザーは
      物理的な場所を気にする必要がない。

具体例:

  - 世界中の顧客が Google のデータセンターを共有使用
  - 顧客ごとに仮想的に分離された環境を提供
  - 物理サーバーの場所はユーザーが指定できない

    （リージョンは選べる）

ビジネス価値: 規模の経済によるコスト削減`}</code></pre>
                            <div className="stitle">特性 ④ 迅速な弾力性（Rapid Elasticity）</div>
                            <pre><code>{`意味: 需要に応じて自動的にリソースを増減（スケール）できる。
      ユーザーからは「無限にリソースがある」ように見える。

具体例:

  - EC サイトがセール時に自動でサーバーを 10 倍に増設
  - 深夜の閑散時間にはサーバーを自動縮小
  - 需要に応じて数分以内にスケールアップ/ダウン

ビジネス価値: 急なアクセス増でもサービス停止なし
             かつ普段は無駄なコストをかけない`}</code></pre>
                            <div className="stitle">特性 ⑤ 計測されたサービス（Measured Service）</div>
                            <pre><code>{`意味: リソースの使用量を自動的に計測し、
      使った分だけ課金される従量制モデル。

具体例:

  - VM を 1 時間使えば 1 時間分だけ課金
  - ストレージを 100GB 使えば 100GB 分だけ課金
  - 使用量はリアルタイムで可視化・監視できる

ビジネス価値: 無駄なコストがなく、透明性の高い費用管理が可能`}</code></pre>
                            <div className="stitle">✅ ベストプラクティス: 5 つの特性の活用</div>
                            <pre><code>{`俊敏性の最大化:
  - プロトタイプは「まず小さく始める」
  - 本番移行前に低コストで実験・検証する
  - 失敗しても損失を最小化できる

弾力性の活用:
  - 自動スケーリングポリシーを設定する
  - 負荷テストで最大容量を事前に確認する
  - スケールダウンルールも忘れずに設定する

コスト透明性の確保:
  - ラベル（タグ）でリソースをチーム・プロジェクト別に分類
  - 予算アラートを必ず設定する
  - Cloud Billing レポートで定期的に使用量を確認する`}</code></pre>
                            <p className="tdesc">📎 <strong>参照</strong>: NIST クラウドコンピューティングの定義<br/>
                            <a href="https://csrc.nist.gov/publications/detail/sp/800-145/final" target="_blank" rel="noreferrer">https://csrc.nist.gov/publications/detail/sp/800-145/final</a><br/>
                            <a href="https://cloud.google.com/learn/what-is-cloud-computing" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-cloud-computing</a></p>
                        </div>
                    </div>

                    <div id="s4" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn4">04</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">クラウドサービスモデル</h2>
                                <p className="tdesc">IaaS / PaaS / SaaS の責任分界点</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-4">
                            <div className="ttitle"><span className="tid">4.1</span> サービスモデルの全体像</div>
                            <p className="tdesc">クラウドサービスは「どこまで Google が管理してくれるか」によって 3 つに分類されます。</p>
                            
                            <div className="stitle">責任の分担</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 650 300" width="100%" height="100%" fill="none" stroke="currentColor">
                                    <text x="120" y="30" fill="currentColor" fontSize="12" fontWeight="bold">オンプレミス</text>
                                    <text x="240" y="30" fill="currentColor" fontSize="12" fontWeight="bold">IaaS</text>
                                    <text x="360" y="30" fill="currentColor" fontSize="12" fontWeight="bold">PaaS</text>
                                    <text x="480" y="30" fill="currentColor" fontSize="12" fontWeight="bold">SaaS</text>
                                    
                                    <g transform="translate(0, 50)" fontSize="12">
                                        <text x="10" y="15" fill="currentColor">アプリ</text>
                                        <rect x="100" y="0" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="15" fill="currentColor">自社</text>
                                        <rect x="220" y="0" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="15" fill="currentColor">自社</text>
                                        <rect x="340" y="0" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="360" y="15" fill="currentColor">自社</text>
                                        <rect x="460" y="0" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="15" fill="var(--color-primary)">Google</text>
                                        
                                        <text x="10" y="40" fill="currentColor">データ</text>
                                        <rect x="100" y="25" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="40" fill="currentColor">自社</text>
                                        <rect x="220" y="25" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="40" fill="currentColor">自社</text>
                                        <rect x="340" y="25" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="360" y="40" fill="currentColor">自社</text>
                                        <rect x="460" y="25" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="40" fill="var(--color-primary)">Google</text>

                                        <text x="10" y="65" fill="currentColor">ランタイム</text>
                                        <rect x="100" y="50" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="65" fill="currentColor">自社</text>
                                        <rect x="220" y="50" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="65" fill="currentColor">自社</text>
                                        <rect x="340" y="50" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="65" fill="var(--color-primary)">Google</text>
                                        <rect x="460" y="50" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="65" fill="var(--color-primary)">Google</text>

                                        <text x="10" y="90" fill="currentColor">ミドルウェア</text>
                                        <rect x="100" y="75" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="90" fill="currentColor">自社</text>
                                        <rect x="220" y="75" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="90" fill="currentColor">自社</text>
                                        <rect x="340" y="75" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="90" fill="var(--color-primary)">Google</text>
                                        <rect x="460" y="75" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="90" fill="var(--color-primary)">Google</text>

                                        <text x="10" y="115" fill="currentColor">OS</text>
                                        <rect x="100" y="100" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="115" fill="currentColor">自社</text>
                                        <rect x="220" y="100" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="115" fill="currentColor">自社</text>
                                        <rect x="340" y="100" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="115" fill="var(--color-primary)">Google</text>
                                        <rect x="460" y="100" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="115" fill="var(--color-primary)">Google</text>

                                        <text x="10" y="140" fill="currentColor">仮想化</text>
                                        <rect x="100" y="125" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="140" fill="currentColor">自社</text>
                                        <rect x="220" y="125" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="240" y="140" fill="var(--color-primary)">Google</text>
                                        <rect x="340" y="125" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="140" fill="var(--color-primary)">Google</text>
                                        <rect x="460" y="125" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="140" fill="var(--color-primary)">Google</text>

                                        <text x="10" y="165" fill="currentColor">インフラ</text>
                                        <rect x="100" y="150" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="165" fill="currentColor">自社</text>
                                        <rect x="220" y="150" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="240" y="165" fill="var(--color-primary)">Google</text>
                                        <rect x="340" y="150" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="165" fill="var(--color-primary)">Google</text>
                                        <rect x="460" y="150" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="165" fill="var(--color-primary)">Google</text>
                                        
                                        <text x="10" y="200" fill="var(--color-primary)" fontWeight="bold">ユーザー管理負荷</text>
                                        <text x="120" y="200" fill="currentColor">最大</text>
                                        <text x="240" y="200" fill="currentColor">中</text>
                                        <text x="360" y="200" fill="currentColor">小</text>
                                        <text x="480" y="200" fill="currentColor">最小</text>
                                    </g>
                                </svg>
                            </div>
                            <div className="stitle">4.2 IaaS（Infrastructure as a Service）</div>
                            <p className="tdesc"><strong>定義</strong>: 仮想マシン・ストレージ・ネットワークなどの<strong>インフラ基盤をサービスとして提供</strong>するモデル。ユーザーは OS・ミドルウェア・アプリを自分で管理します。</p>
                            <div className="stitle">特徴とメリット・デメリット</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>項目</th><th>内容</th></tr>
                                    </thead>
                                    <tbody>
                                        {IAAS_FEATURES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.item}</strong></td>
                                                <td>{row.content}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">Google Cloud での IaaS サービス例</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>サービス</th><th>説明</th></tr>
                                    </thead>
                                    <tbody>
                                        {IAAS_SERVICES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.service}</strong></td>
                                                <td>{row.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">4.3 PaaS（Platform as a Service）</div>
                            <p className="tdesc"><strong>定義</strong>: アプリケーションの開発・実行・管理に必要な<strong>プラットフォーム（実行環境）をサービスとして提供</strong>するモデル。ユーザーはアプリとデータだけに集中できます。</p>
                            <div className="stitle">特徴とメリット・デメリット</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>項目</th><th>内容</th></tr>
                                    </thead>
                                    <tbody>
                                        {PAAS_FEATURES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.item}</strong></td>
                                                <td>{row.content}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">Google Cloud での PaaS サービス例</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>サービス</th><th>説明</th></tr>
                                    </thead>
                                    <tbody>
                                        {PAAS_SERVICES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.service}</strong></td>
                                                <td>{row.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">4.4 SaaS（Software as a Service）</div>
                            <p className="tdesc"><strong>定義</strong>: 完全に構築されたソフトウェアを<strong>サービスとして提供</strong>するモデル。インターネット接続とブラウザがあれば、インストールなしに即座に使えます。</p>
                            <div className="stitle">特徴とメリット・デメリット</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>項目</th><th>内容</th></tr>
                                    </thead>
                                    <tbody>
                                        {SAAS_FEATURES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.item}</strong></td>
                                                <td>{row.content}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">Google Cloud での SaaS サービス例</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>サービス</th><th>説明</th></tr>
                                    </thead>
                                    <tbody>
                                        {SAAS_SERVICES.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.service}</strong></td>
                                                <td>{row.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="tdesc">📎 <strong>参照</strong>: Google Cloud のサービスモデル解説<br/>
                            <a href="https://cloud.google.com/learn/what-is-iaas" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-iaas</a><br/>
                            <a href="https://cloud.google.com/learn/what-is-paas" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-paas</a><br/>
                            <a href="https://cloud.google.com/learn/what-is-saas" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-saas</a></p>
                        </div>
                    </div>

                    <div id="s5" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn5">05</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">クラウドデプロイメントモデル</h2>
                                <p className="tdesc">パブリック / プライベート / ハイブリッド / マルチクラウドの選択基準</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-5">
                            <div className="ttitle"><span className="tid">5.1</span> デプロイメントモデルの概要</div>
                            <p className="tdesc">クラウドを「どこに・どのように展開するか」を定義したモデルです。</p>
                            <div className="stitle">4 つのデプロイメントモデル</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 600 160" width="100%" height="100%" fill="none" stroke="currentColor">
                                    <g transform="translate(20, 20)">
                                        <rect x="0" y="0" width="160" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" />
                                        <text x="10" y="20" fill="currentColor" fontSize="13" fontWeight="bold">パブリッククラウド</text>
                                        <path d="M 160 15 L 200 15" stroke="var(--color-primary)" markerEnd="url(#arrow-primary)" />
                                        <text x="210" y="20" fill="currentColor" fontSize="13">完全クラウド（Google 等が管理・共有）</text>
                                    </g>
                                    <g transform="translate(20, 60)">
                                        <rect x="0" y="0" width="160" height="30" rx="4" fill="var(--color-muted)" fillOpacity="0.1" stroke="var(--color-muted)" />
                                        <text x="10" y="20" fill="currentColor" fontSize="13" fontWeight="bold">プライベートクラウド</text>
                                        <path d="M 160 15 L 200 15" stroke="var(--color-muted)" markerEnd="url(#arrow)" />
                                        <text x="210" y="20" fill="currentColor" fontSize="13">完全自社管理（自社専用データセンター等）</text>
                                    </g>
                                    <g transform="translate(20, 100)">
                                        <rect x="0" y="0" width="160" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" />
                                        <text x="10" y="20" fill="currentColor" fontSize="13" fontWeight="bold">ハイブリッド / マルチ</text>
                                        <path d="M 160 15 L 200 15" stroke="var(--color-primary)" markerEnd="url(#arrow-primary)" />
                                        <text x="210" y="20" fill="currentColor" fontSize="13">オンプレ+クラウド / 複数ベンダー の組み合わせ</text>
                                    </g>
                                </svg>
                            </div>
                            <div className="stitle">5.2 デプロイメントモデルの比較</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>比較項目</th><th>パブリック</th><th>プライベート</th><th>ハイブリッド</th><th>マルチ</th></tr>
                                    </thead>
                                    <tbody>
                                        {DEPLOYMENT_COMPARISON.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.item}</strong></td>
                                                <td>{row.public}</td>
                                                <td>{row.private}</td>
                                                <td>{row.hybrid}</td>
                                                <td>{row.multi}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="tdesc">📎 <strong>参照</strong>:<br/>
                            <a href="https://cloud.google.com/learn/what-is-hybrid-cloud" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-hybrid-cloud</a><br/>
                            <a href="https://cloud.google.com/learn/what-is-multicloud" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-multicloud</a></p>
                        </div>
                    </div>

                    <div id="s6" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn6">06</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">CapEx vs OpEx ─ コスト構造의 根本的変化</h2>
                                <p className="tdesc">オンプレミスの資本支出からクラウドの運用経費への転換</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-6">
                            <div className="ttitle"><span className="tid">6.1</span> 財務比較</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>比較項目</th><th>CapEx（オンプレ）</th><th>OpEx（クラウド）</th></tr>
                                    </thead>
                                    <tbody>
                                        {CAPEX_OPEX_COMPARISON.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.item}</strong></td>
                                                <td>{row.capex}</td>
                                                <td>{row.opex}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="stitle">財務上の変化</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 600 240" width="100%" height="100%" fill="none" stroke="currentColor">
                                    <rect x="10" y="30" width="280" height="150" rx="8" stroke="var(--color-muted)" fill="var(--color-background)" />
                                    <text x="20" y="20" fill="currentColor" fontSize="14" fontWeight="bold">移行前 (CapEx 中心・固定費)</text>
                                    <text x="30" y="60" fill="currentColor" fontSize="13">サーバー減価償却: 3,000万円</text>
                                    <text x="30" y="90" fill="currentColor" fontSize="13">データセンター賃料: 1,000万円</text>
                                    <text x="30" y="120" fill="currentColor" fontSize="13">人件費(インフラ管理): 2,000万円</text>
                                    <path d="M 20 140 L 280 140" stroke="var(--color-muted)" strokeDasharray="4" />
                                    <text x="30" y="165" fill="currentColor" fontSize="14" fontWeight="bold">年間合計: 6,000万円 (固定)</text>

                                    <rect x="310" y="30" width="280" height="150" rx="8" stroke="var(--color-primary)" fill="var(--color-background)" />
                                    <text x="320" y="20" fill="var(--color-primary)" fontSize="14" fontWeight="bold">移行後 (OpEx 中心・変動費)</text>
                                    <text x="330" y="60" fill="currentColor" fontSize="13">GCP 月次利用料: 100〜300万円</text>
                                    <text x="330" y="90" fill="var(--color-muted-foreground)" fontSize="12">(需要に応じて変動)</text>
                                    <text x="330" y="120" fill="currentColor" fontSize="13">人件費(インフラ管理) 大幅削減</text>
                                    <path d="M 320 140 L 580 140" stroke="var(--color-primary)" strokeDasharray="4" />
                                    <text x="330" y="165" fill="var(--color-primary)" fontSize="14" fontWeight="bold">年間合計: 1,200〜3,600万円</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div id="s7" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn7">07</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">クラウドへの移行戦略（6 つの R）</h2>
                                <p className="tdesc">Rehost / Replatform / Repurchase / Refactor / Retire / Retain</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-7">
                            <div className="ttitle"><span className="tid">7.1</span> 戦略の比較</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>戦略</th><th>変更規模</th><th>スピード</th><th>コスト</th><th>リスク</th><th>クラウド活用度</th></tr>
                                    </thead>
                                    <tbody>
                                        {MIGRATION_STRATEGY_COMPARISON.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.strategy}</strong></td>
                                                <td>{row.scale}</td>
                                                <td>{row.speed}</td>
                                                <td>{row.cost}</td>
                                                <td>{row.risk}</td>
                                                <td>{row.cloudUsage}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="s8" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn8">08</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">Google Cloud の独自の強みと差別化</h2>
                                <p className="tdesc">グローバルネットワーク・AI/ML・サステナビリティ</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-8">
                            <div className="ttitle"><span className="tid">8.1</span> 強みまとめ</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>強み</th><th>キーワード</th></tr>
                                    </thead>
                                    <tbody>
                                        {GOOGLE_CLOUD_STRENGTHS.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.service}</strong></td>
                                                <td>{row.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="s9" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn9">09</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">Google Cloud のグローバルインフラ</h2>
                                <p className="tdesc">リージョン / ゾーン / エッジネットワーク</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-9">
                            <div className="ttitle"><span className="tid">9.1</span> インフラ構造</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 400 180" width="100%" height="100%" fill="none" stroke="currentColor">
                                    <rect x="10" y="10" width="250" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1" />
                                    <text x="20" y="30" fill="currentColor" fontSize="14" fontWeight="bold">グローバル (Global)</text>
                                    <path d="M 40 40 L 40 55 L 50 55" stroke="var(--color-muted)" />
                                    <rect x="50" y="45" width="220" height="25" rx="4" fill="var(--color-primary)" fillOpacity="0.2" />
                                    <text x="60" y="62" fill="currentColor" fontSize="13">マルチリージョン (Multi-Region)</text>
                                    <path d="M 70 70 L 70 85 L 80 85" stroke="var(--color-muted)" />
                                    <rect x="80" y="75" width="200" height="25" rx="4" fill="var(--color-primary)" fillOpacity="0.3" />
                                    <text x="90" y="92" fill="currentColor" fontSize="13">リージョン (Region)</text>
                                    <path d="M 100 100 L 100 115 L 110 115" stroke="var(--color-muted)" />
                                    <rect x="110" y="105" width="180" height="25" rx="4" fill="var(--color-primary)" fillOpacity="0.4" />
                                    <text x="120" y="122" fill="var(--color-background)" fontSize="13" fontWeight="bold">ゾーン (Zone)</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div id="s10" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn10">10</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">Google Cloud のサービス階層とリソース管理</h2>
                                <p className="tdesc">組織 / フォルダ / プロジェクト / リソース</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-10">
                            <div className="ttitle"><span className="tid">10.1</span> リソース階層</div>
                            <div className="diagram-svg">
                                <svg viewBox="0 0 500 240" width="100%" height="100%" fill="none" stroke="currentColor">
                                    <rect x="10" y="10" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.4" />
                                    <text x="20" y="30" fill="var(--color-background)" fontSize="13" fontWeight="bold">組織 (Organization)</text>
                                    <path d="M 40 40 L 40 70 L 50 70" stroke="var(--color-muted)" />
                                    <rect x="50" y="55" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.3" />
                                    <text x="60" y="75" fill="currentColor" fontSize="13">フォルダ (Folder)</text>
                                    <path d="M 80 85 L 80 115 L 90 115" stroke="var(--color-muted)" />
                                    <rect x="90" y="100" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.2" />
                                    <text x="100" y="120" fill="currentColor" fontSize="13">プロジェクト (Project)</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div id="s11" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn11">11</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">DX 実現のための Google Cloud ソリューション</h2>
                                <p className="tdesc">インフラ / データ / AI / 生産性向上</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-11">
                            <div className="ttitle"><span className="tid">11.1</span> ソリューション一覧</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>課題</th><th>ソリューション</th><th>効果</th></tr>
                                    </thead>
                                    <tbody>
                                        {DX_SOLUTIONS.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.issue}</td>
                                                <td>{row.solution}</td>
                                                <td>{row.effect}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="s12" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn12">12</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">Section 1 総まとめ・頻出問題パターン</h2>
                                <p className="tdesc">まとめとチェックリスト</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-12">
                            <div className="ttitle"><span className="tid">12.1</span> 学習チェックリスト</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>混同パターン</th><th>正しい理解</th></tr>
                                    </thead>
                                    <tbody>
                                        {CONFUSION_POINTS.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.pattern}</td>
                                                <td>{row.understanding}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="s13" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn13">13</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">完全網羅レポート</h2>
                                <p className="tdesc">詳細解説</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-13">
                            <div className="ttitle"><span className="tid">13.1</span> 比較レポート</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>比較項目</th><th>オンプレミス</th><th>クラウド</th></tr>
                                    </thead>
                                    <tbody>
                                        {ON_PREMISE_VS_CLOUD_COMPARISON.map((row, i) => (
                                            <tr key={i}>
                                                <td><strong>{row.item}</strong></td>
                                                <td>{row.onPremise}</td>
                                                <td>{row.cloud}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="s14" className="sgap">
                        <div className="sec-head">
                            <div className="sec-num sn14">14</div>
                            <div className="sec-head-txt">
                                <h2 className="sec-title">公式参照リソース一覧</h2>
                                <p className="tdesc">リンク集</p>
                            </div>
                        </div>

                        <div className="tcard" id="cdl-14">
                            <div className="ttitle"><span className="tid">14.1</span> 参照リソース</div>
                            <div className="ctable-wrap">
                                <table className="ctable">
                                    <thead>
                                        <tr><th>タイトル</th><th>URL</th></tr>
                                    </thead>
                                    <tbody>
                                        {GCDL_REFERENCES.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.title}</td>
                                                <td><a href={row.url} target="_blank" rel="noreferrer">{row.url}</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
            
            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 Section 1 完全解説 — 2026 Edition</p>
            </footer>
        </div>
    );
}
