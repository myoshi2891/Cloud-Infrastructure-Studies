import type { Metadata } from 'next';
import {
    EXAM_SPEC,
    EXAM_DOMAINS,
    NIST_CHARACTERISTICS,
    AI_PRINCIPLES,
    AI_NOT_PURSUE,
    COMPUTE_SERVICES,
    CONFUSING_PAIRS,
    RESOURCES,
} from './constants';

export const metadata: Metadata = {
    title: 'Cloud Digital Leader 認定試験',
    description:
        'Google Cloud Digital Leader 包括的解説。DX・データ・AI/ML・インフラ・セキュリティ・生成AI の全領域を詳解。',
};

function SectionIntro() {
    return (
        <div id="s0" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn0">00</div>
                <div className="sec-head-txt">
                    <h2>試験概要と出題セクション</h2>
                    <p>Cloud Digital Leader (CDL) — ビジネスリーダー・意思決定者向け Google Cloud 認定資格</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.1</span>試験仕様</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>項目</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EXAM_SPEC.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.item}</td>
                                    <td>{row.content}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.2</span>出題ドメイン別 配点</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>セクション</th>
                                <th>テーマ</th>
                                <th>配点目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EXAM_DOMAINS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.section}</strong></td>
                                    <td>{row.theme}</td>
                                    <td>{row.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.3</span>試験の受け方・準備方法</div>
                <pre className="codeblock">{`Step 1: 公式試験ガイドを読む（必須）
Step 2: Cloud Skills Boost の CDL ラーニングパスを修了
Step 3: 公式サンプル問題を解く
Step 4: cp.certmetrics.com/google から試験を予約

📎 試験ページ: cloud.google.com/learn/certification/cloud-digital-leader
📎 学習パス: cloudskillsboost.google/paths/9`}</pre>
            </div>
        </div>
    );
}

function Section1() {
    return (
        <div id="s1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">01</div>
                <div className="sec-head-txt">
                    <h2>DX・クラウド基礎 — デジタルトランスフォーメーションと Google Cloud</h2>
                    <p>クラウドの5特性・IaaS/PaaS/SaaS・デプロイモデル・CapEx vs OpEx・6つのR</p>
                </div>
                <div className="pct-badge pb1">10%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>クラウドの5つの本質的特性（NIST 定義）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>特性</th>
                                <th>説明</th>
                                <th>ビジネス上の意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NIST_CHARACTERISTICS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.trait}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.meaning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid Generator">1.2</span>クラウドサービスモデル（IaaS / PaaS / SaaS）</div>
                <pre className="codeblock">{`責任の分担（下が基盤、上がユーザー責任）

┌─────────────────┬─────────────────┬─────────────────┐
│     IaaS         │     PaaS         │     SaaS         │
│  Infrastructure  │    Platform      │    Software      │
│  as a Service    │  as a Service    │  as a Service    │
├─────────────────┼─────────────────┼─────────────────┤
│ アプリ [USER]    │ アプリ [USER]    │         [USER]   │
│ ランタイム [USER]│ ランタイム [GCP] │         [GCP]    │
│ OS / VM [USER]   │         [GCP]    │         [GCP]    │
│ ネットワーク[GCP]│         [GCP]    │         [GCP]    │
│ ストレージ [GCP] │         [GCP]    │         [GCP]    │
└─────────────────┴─────────────────┴─────────────────┘
例: Compute Engine   Cloud Run          Google Workspace`}</pre>
            </div>
        </div>
    );
}

function Section2() {
    return (
        <div id="s2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">02</div>
                <div className="sec-head-txt">
                    <h2>データとイノベーション — クラウドによるイノベーション</h2>
                    <p>BigQuery・Cloud Storage・データベース選択・データ分析パイプライン</p>
                </div>
                <div className="pct-badge pb2">12.5%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>Google Cloud Storage (GCS) クラス</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>クラス</th>
                                <th>ユースケース</th>
                                <th>最低保存期間</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Standard</strong></td><td>頻繁にアクセスするデータ、Webコンテンツ</td><td>なし</td></tr>
                            <tr><td><strong>Nearline</strong></td><td>月に1回未満のアクセス、バックアップ</td><td>30日</td></tr>
                            <tr><td><strong>Coldline</strong></td><td>四半期に1回未満のアクセス、アーカイブ</td><td>90日</td></tr>
                            <tr><td><strong>Archive</strong></td><td>年に1回未満のアクセス、長期保存</td><td>365日</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Section3() {
    return (
        <div id="s3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2>インフラとモダナイゼーション — インフラとアプリのモダナイゼーション</h2>
                    <p>Compute Engine・GKE・Cloud Run・ハイブリッドクラウド・Anthos</p>
                </div>
                <div className="pct-badge pb3">30%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>コンピューティングの選択</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>キーワード</th>
                                <th>使い分け</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPUTE_SERVICES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keyword}</td>
                                    <td>{row.usage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Section4() {
    return (
        <div id="s4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">04</div>
                <div className="sec-head-txt">
                    <h2>セキュリティと運用 — Google Cloud のセキュリティと運用</h2>
                    <p>共有責任モデル・IAM・リソース階層・セキュリティ製品・運用ツール</p>
                </div>
                <div className="pct-badge pb4">30%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>リソース階層（Resource Hierarchy）</div>
                <pre className="codeblock">{`組織 (Organization)  ← 会社全体、GWS/Cloud Identity と紐付け
└── フォルダ (Folders)  ← 部門、環境（Dev/Prod）
    └── プロジェクト (Projects)  ← 課金単位、API管理
        └── リソース (Resources)  ← VM, DB, Bucket`}</pre>
                <div className="ib">
                    <div className="ibt">重要: 継承の原則</div>
                    <p>上位階層で設定した IAM ポリシーは、下位階層にすべて<strong>継承</strong>される（拒否はできない、追加のみ）。</p>
                </div>
            </div>
        </div>
    );
}

function Section5() {
    return (
        <div id="s5" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn5">05</div>
                <div className="sec-head-txt">
                    <h2>AI/ML — Google Cloud の AI によるイノベーション</h2>
                    <p>AI 原則・Vertex AI・生成 AI・Gemini・RAG</p>
                </div>
                <div className="pct-badge pb5">5%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>Google AI 原則 — 責任ある AI（Responsible AI）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>7つの原則</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AI_PRINCIPLES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.principle}</strong></td>
                                    <td>{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">追及しない 4 つの用途</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>対象</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AI_NOT_PURSUE.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.target}</strong></td>
                                    <td>{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Section6() {
    return (
        <div id="s6" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn6">06</div>
                <div className="sec-head-txt">
                    <h2>サービス早見表 — 混同ペアの整理</h2>
                    <p>コンピューティング・分析・コスト管理の重要ペア</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>よく混同されるサービスペア</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>混同ペア</th>
                                <th>正しい理解</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CONFUSING_PAIRS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.pair}</strong></td>
                                    <td>{row.truth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Section7() {
    return (
        <div id="s7" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn7">07</div>
                <div className="sec-head-txt">
                    <h2>試験攻略チェックリスト — 必ず押さえるべき概念</h2>
                    <p>セクション別チェックリスト・学習ロードマップ</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>推奨学習ロードマップ</div>
                <pre className="codeblock">{`Week 1-2: 基礎概念の固め
├── Cloud の基本概念（IaaS/PaaS/SaaS、デプロイモデル）
├── Google Cloud のコアサービス概要
└── Cloud Skills Boost の入門コースを修了

Week 3-4: 主要サービスの理解
├── コンピューティング・ストレージ・ネットワーク
├── データ分析・データベースサービス
└── セキュリティの基本（IAM・暗号化）

Week 5: AI/ML と総まとめ
├── AI API の種類と使い分け
├── 生成 AI（Gemini・RAG・ファインチューニング）
└── 責任ある AI

Week 6: 試験直前対策
├── 公式サンプル問題を繰り返し解く
├── 間違えた問題の公式ドキュメントを読む
└── 頻出サービス早見表を暗記`}</pre>
            </div>
        </div>
    );
}

function Section8() {
    return (
        <div id="s8" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn8">08</div>
                <div className="sec-head-txt">
                    <h2>参照リソース — 公式ドキュメント・試験登録</h2>
                    <p>公式参照リソース一覧</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>公式参照リソース一覧</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>リソース</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RESOURCES.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.name}</td>
                                    <td><a href={`https://${row.url}`} target="_blank" rel="noopener noreferrer">{row.url}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function CloudDigitalLeaderPage() {
    return (
        <div className="cdl-page">
            <section className="hero">
                <div className="hero-eyebrow">Google Cloud Certification · CDL</div>
                <h1>
                    Cloud Digital Leader{' '}
                    <span>認定試験</span>
                </h1>
                <p className="hero-sub">
                    DX・データ・AI/ML・インフラ・セキュリティ・生成 AI — 全領域を体系的に解説
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-blue" />
                        全8セクション
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-red" />
                        試験時間 90分
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-yellow" />
                        50–60問
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        推奨経験 6ヶ月+
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="セクションナビゲーション">
                <div className="snav-inner">
                    <a href="#s0" className="snav-link"><span className="snav-num">00</span>試験概要</a>
                    <a href="#s1" className="snav-link"><span className="snav-num">01</span>DX基礎</a>
                    <a href="#s2" className="snav-link"><span className="snav-num">02</span>データ</a>
                    <a href="#s3" className="snav-link"><span className="snav-num">03</span>インフラ</a>
                    <a href="#s4" className="snav-link"><span className="snav-num">04</span>セキュリティ</a>
                    <a href="#s5" className="snav-link"><span className="snav-num">05</span>AI/ML</a>
                    <a href="#s6" className="snav-link"><span className="snav-num">06</span>早見表</a>
                    <a href="#s7" className="snav-link"><span className="snav-num">07</span>攻略</a>
                    <a href="#s8" className="snav-link"><span className="snav-num">08</span>リソース</a>
                </div>
            </nav>

            <div className="wrapper">
                <SectionIntro />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
            </div>

            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 包括的解説 — 2026 Edition</p>
            </footer>
        </div>
    );
}
