import type { Metadata } from 'next';
import './page.css';
import ScrollSpy from '../ScrollSpy';

export const metadata: Metadata = {
    title: 'AGWA Section 1: User, Domain, and Directory Management',
    description: 'Associate Google Workspace Administrator (AGWA) Section 1 Complete Guide',
};

export default function AgwaSection1Page() {
    return (
        <>
            <ScrollSpy />
            <div className="hero" id="top">
                <div className="hero-grid"></div>
                <div className="hero-inner">
                    <div className="hero-badge">
                        <span></span>
                        AGWA EXAM GUIDE: SECTION 1
                    </div>
                    <h1>
                        ユーザー、ドメイン、<br />
                        <span className="g">ディレクトリの管理</span>
                    </h1>
                    <p className="hero-sub">
                        Google Workspace 管理の基盤となる ID 管理、組織構造（OU）、グループ、およびドメイン構成を網羅。試験の 20% を占める最重要セクションの完全解説。
                    </p>

                    <div className="hero-stats">
                        <div className="stat-pill">
                            <strong>20%</strong>
                            <span>試験出題比率</span>
                        </div>
                        <div className="stat-pill">
                            <strong>Level: Core</strong>
                            <span>重要度レベル</span>
                        </div>
                        <div className="stat-pill">
                            <strong>Essential</strong>
                            <span>管理者必須知識</span>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="sticky-nav">
                <div className="nav-inner">
                    <a href="#ch1">
                        <div className="dot" style={{ backgroundColor: '#4285f4' }}></div>
                        1.1 ユーザー
                    </a>
                    <a href="#ch2">
                        <div className="dot" style={{ backgroundColor: '#34a853' }}></div>
                        1.2 組織部門 (OU)
                    </a>
                    <a href="#ch3">
                        <div className="dot" style={{ backgroundColor: '#fbbc05' }}></div>
                        1.3 グループ
                    </a>
                    <a href="#ch4">
                        <div className="dot" style={{ backgroundColor: '#ea4335' }}></div>
                        1.4 ドメイン
                    </a>
                    <a href="#ch5">
                        <div className="dot" style={{ backgroundColor: '#a78bfa' }}></div>
                        1.5 建物・リソース
                    </a>
                    <a href="#ch6">
                        <div className="dot" style={{ backgroundColor: '#4fc3f7' }}></div>
                        対策まとめ
                    </a>
                </div>
            </nav>

            <main className="main">
                {/* ── CH1: ユーザー ── */}
                <section id="ch1" className="chapter">
                    <div className="section-header">
                        <div className="section-icon" style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)', color: '#4285f4' }}>
                            👤
                        </div>
                        <div>
                            <h2>1.1 ユーザー ライフサイクルの管理</h2>
                            <p>アカウントの作成、プロビジョニング、停止、削除、およびデータの移行</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>プロビジョニング手法の比較 <span className="tag">最重要</span></h3>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>手法</th>
                                        <th>特徴</th>
                                        <th>最適なケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>手動作成</strong></td>
                                        <td>管理コンソールで 1 人ずつ作成</td>
                                        <td>小規模（10 名以下）、スポット対応</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CSV 一括登録</strong></td>
                                        <td>テンプレート CSV をアップロード</td>
                                        <td>初期導入、数十名程度の一括追加</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GCDS 同期</strong></td>
                                        <td>Active Directory / LDAP から同期</td>
                                        <td>ハイブリッド環境、既存 AD 管理が主</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SDK / API</strong></td>
                                        <td>Admin SDK を使用してカスタム自動化</td>
                                        <td>大規模、独自のプロビジョニング基盤</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout warn">
                            <div className="callout-icon">⚠️</div>
                            <div>
                                <strong>GCDS の注意点</strong>：同期は常に <strong>AD → Google</strong> の一方向。Google 側で手動変更した内容は次回の同期で上書き（削除）される可能性がある。
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>アカウント状態の管理（停止・削除・アーカイブ）</h3>
                        <div className="state-grid">
                            <div className="state-card active">
                                <h4>✅ アクティブ</h4>
                                <ul>
                                    <li>ログイン可能</li>
                                    <li>全サービス利用可</li>
                                    <li>ライセンス消費あり</li>
                                </ul>
                            </div>
                            <div className="state-card suspended">
                                <h4>⏳ 停止 (Suspended)</h4>
                                <ul>
                                    <li>ログイン不可</li>
                                    <li>メール受信拒否</li>
                                    <li>データは保持される</li>
                                    <li>ライセンス消費継続</li>
                                </ul>
                            </div>
                            <div className="state-card archived">
                                <h4>📦 アーカイブ</h4>
                                <ul>
                                    <li>ログイン不可</li>
                                    <li>Vault でデータ保持</li>
                                    <li>低コストライセンス</li>
                                    <li>Enterprise 以上で利用可</li>
                                </ul>
                            </div>
                            <div className="state-card deleted">
                                <h4>🗑 削除</h4>
                                <ul>
                                    <li>全データ削除</li>
                                    <li><strong>20 日間</strong>のみ復元可</li>
                                    <li>以降は完全に消失</li>
                                    <li>ライセンス解放</li>
                                </ul>
                            </div>
                        </div>

                        <div className="callout success">
                            <div className="callout-icon">💡</div>
                            <div>
                                <strong>退職者対応のベストプラクティス</strong>：すぐに削除せず、まず「停止」し、Drive のファイル所有権をマネージャー等に「移譲」してから、アーカイブまたは削除を検討する。
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>データ移行ツール (Migration Tools)</h3>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ツール名</th>
                                        <th>ソース (移行元)</th>
                                        <th>移行内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>データ移行サービス</strong></td>
                                        <td>Exchange, O365, Gmail, IMAP</td>
                                        <td>メールのみ（IMAP の場合）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GWMME</strong></td>
                                        <td>Exchange, O365, PST, IMAP</td>
                                        <td>メール、カレンダー、連絡先</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GWMMO</strong></td>
                                        <td>Outlook (クライアント)</td>
                                        <td>ユーザー個別の Outlook データ</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Google Workspace Migrate</strong></td>
                                        <td>大規模 Exchange, SharePoint, Box</td>
                                        <td>大規模組織向けの高機能ツール</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card" style={{ borderColor: 'rgba(52, 211, 153, 0.2)', backgroundColor: 'rgba(52, 211, 153, 0.03)' }}>
                        <h3>✦ セクション 1.1 ベストプラクティス総まとめ</h3>
                        <ul className="bp-list">
                            <li>大規模環境では GCDS を使用し、既存の AD を Single Source of Truth として管理する</li>
                            <li>ユーザー削除は最終手段。まずは停止と所有権移譲をセットで行う習慣をつける</li>
                            <li>移行ツールは、ソースの種類と「誰が（管理者 or ユーザー）」実行するかに基づいて選択する</li>
                            <li>アカウント作成時は初期パスワードを推測困難なものにし、初回ログイン時のパスワード変更を強制する</li>
                            <li>SAML SSO 環境では、Google 側でのパスワード変更を無効化し、IdP 側で一元管理する</li>
                        </ul>
                    </div>
                </section>

                <div className="divider"></div>

                {/* ── CH2: OU ── */}
                <section id="ch2" className="chapter">
                    <div className="section-header">
                        <div className="section-icon" style={{ backgroundColor: 'rgba(52, 168, 83, 0.15)', color: '#34a853' }}>
                            📁
                        </div>
                        <div>
                            <h2>1.2 組織部門 (OU) の管理</h2>
                            <p>ポリシー適用のための階層構造の設計と管理</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>OU の階層とポリシー継承の仕組み <span className="tag">仕組みの理解</span></h3>
                        <div className="svg-wrap">
                            <svg viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                                        <path d="M0,0 L0,6 L8,3 z" fill="#4fc3f7" />
                                    </marker>
                                </defs>
                                <rect width="860" height="480" rx="16" fill="#0d1520" stroke="rgba(79,195,247,0.15)" strokeWidth="1" />
                                <text x="430" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="'DM Mono',monospace" letterSpacing="2">
                                    ORGANIZATIONAL UNIT (OU) STRUCTURE
                                </text>

                                {/* Root OU */}
                                <rect x="330" y="60" width="200" height="50" rx="10" fill="rgba(66,133,244,0.12)" stroke="#4285F4" strokeWidth="2" />
                                <text x="430" y="90" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">
                                    ルート組織 (Root OU)
                                </text>
                                <text x="430" y="102" textAnchor="middle" fill="#4285F4" fontSize="10">
                                    デフォルト: 全サービス ON
                                </text>

                                {/* Child OUs */}
                                <line x1="430" y1="110" x2="430" y2="150" stroke="#4fc3f7" strokeWidth="2" markerEnd="url(#arrow)" />

                                {/* Layer 1 */}
                                <rect x="180" y="160" width="240" height="240" rx="12" fill="rgba(52,168,83,0.08)" stroke="#34A853" strokeWidth="1.5" />
                                <text x="300" y="185" textAnchor="middle" fill="#34A853" fontSize="13" fontWeight="700">
                                    🏢 営業部門 (Sales)
                                </text>

                                <rect x="460" y="160" width="240" height="240" rx="12" fill="rgba(251,188,5,0.08)" stroke="#FBBC05" strokeWidth="1.5" />
                                <text x="580" y="185" textAnchor="middle" fill="#FBBC05" fontSize="13" fontWeight="700">
                                    🛠 開発部門 (Eng)
                                </text>

                                {/* Sub-OUs in Sales */}
                                <rect x="200" y="210" width="200" height="40" rx="8" fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth="1.5" />
                                <text x="300" y="235" textAnchor="middle" fill="#ffffff" fontSize="12">
                                    東京オフィス (Inherit)
                                </text>

                                <rect x="200" y="270" width="200" height="40" rx="8" fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth="1.5" />
                                <text x="300" y="295" textAnchor="middle" fill="#ffffff" fontSize="12">
                                    大阪オフィス (Inherit)
                                </text>

                                {/* Sub-OUs in Eng */}
                                <rect x="480" y="210" width="200" height="40" rx="8" fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth="1.5" />
                                <text x="580" y="235" textAnchor="middle" fill="#ffffff" fontSize="12">
                                    プロダクト A (Inherit)
                                </text>

                                <rect x="480" y="270" width="200" height="40" rx="8" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5" />
                                <text x="580" y="295" textAnchor="middle" fill="#ffffff" fontSize="12">
                                    ラボ・例外 (Override)
                                </text>

                                {/* Policy Flows */}
                                <path d="M430,110 Q430,135 300,160" fill="none" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow)" />
                                <path d="M430,110 Q430,135 580,160" fill="none" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow)" />

                                {/* Legend */}
                                <rect x="40" y="440" width="12" height="12" rx="2" fill="rgba(66,133,244,0.12)" stroke="#4285F4" strokeWidth="1.5" />
                                <text x="58" y="451" fill="#94a3b8" fontSize="10">
                                    ルート（基準ポリシー）
                                </text>

                                <rect x="260" y="440" width="12" height="12" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth="1.5" />
                                <text x="278" y="451" fill="#94a3b8" fontSize="10">
                                    継承（Inherit）
                                </text>

                                <rect x="390" y="440" width="12" height="12" rx="2" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5" />
                                <text x="408" y="451" fill="#94a3b8" fontSize="10">
                                    上書き（Override）
                                </text>

                                <line x1="530" y1="445" x2="560" y2="445" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow)" />
                                <text x="570" y="451" fill="#94a3b8" fontSize="10">
                                    ポリシー継承の方向
                                </text>
                            </svg>
                        </div>

                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>継承の種類</th>
                                        <th>動作</th>
                                        <th>使用場面</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>継承（Inherit）</strong></td>
                                        <td>親OUの設定が子OUに自動適用</td>
                                        <td>デフォルト状態。変更しない限り自動継承</td>
                                    </tr>
                                    <tr>
                                        <td><strong>オーバーライド（Override）</strong></td>
                                        <td>子OUで異なる設定を保存し上書き</td>
                                        <td>特定部門だけ例外ポリシーが必要な場合</td>
                                    </tr>
                                    <tr>
                                        <td><strong>リセット（Reset to inherit）</strong></td>
                                        <td>カスタム設定を削除して親の設定を再適用</td>
                                        <td>オーバーライドを元に戻す場合</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout info">
                            <div className="callout-icon">💡</div>
                            <div>
                                <strong>重要な制約</strong>：ユーザーは常に<strong>1つのOUにのみ</strong>属することができる。複数のポリシーセットを適用したい場合は、OUの継承に加えて「アクセスグループ（設定グループ）」を併用する。
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>OU 設計の戦略的アプローチ <span className="tag">設計の要</span></h3>
                        <div className="callout success">
                            <div className="callout-icon">✅</div>
                            <div>
                                <strong>ベストプラクティス</strong>：OUは「物理的な組織図」ではなく、<strong>「適用すべきポリシーの差異」</strong>に基づいて設計する。同じポリシーが適用されるユーザーは同じOUにまとめる。
                            </div>
                        </div>

                        <div className="compare-grid">
                            <div className="compare-card">
                                <h4 style={{ color: '#4285f4' }}>パターン1: 役割ベース</h4>
                                <ul>
                                    <li>フルタイム社員（標準ポリシー）</li>
                                    <li>契約社員（外部共有制限あり）</li>
                                    <li>外部ベンダー（厳格な制限）</li>
                                    <li>パートタイマー（限定アクセス）</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4 style={{ color: '#34a853' }}>パターン2: ポリシー差異ベース</h4>
                                <ul>
                                    <li>制限なし（経営層・一部管理職）</li>
                                    <li>標準設定（一般社員）</li>
                                    <li>厳格設定（財務・法務・人事）</li>
                                    <li>例外アカウント（SA・テスト）</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4 style={{ color: '#fbbc05' }}>パターン3: デバイスベース</h4>
                                <ul>
                                    <li>ユーザー用OU（ユーザーポリシー）</li>
                                    <li>ChromeOSデバイスOU（デバイスポリシー）</li>
                                    <li>会議室専用端末OU（キオスクモード）</li>
                                    <li>モバイルデバイスOU（MDMポリシー）</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ borderColor: 'rgba(52, 211, 153, 0.2)', backgroundColor: 'rgba(52, 211, 153, 0.03)' }}>
                        <h3>✦ セクション 1.2 ベストプラクティス総まとめ</h3>
                        <ul className="bp-list">
                            <li>OUはポリシーの差異で設計する。同じポリシーのユーザーは同じOUにまとめて管理コストを削減</li>
                            <li>OU 階層は最大5階層以内に収める。深すぎると継承関係が複雑になり管理困難になる</li>
                            <li>サービスアカウント・会議室・テストアカウントは専用の例外OUに配置し、ポリシーの独立管理を容易にする</li>
                            <li>新しいポリシーを本番適用する前に、テスト用OUで少数ユーザーに試験的に適用して影響を確認する</li>
                            <li>OU の命名規則を文書化して組織全体で標準化する（後からの変更は影響が大きい）</li>
                        </ul>
                    </div>
                </section>

                <div className="divider"></div>

                {/* ── CH3: グループ ── */}
                <section id="ch3" className="chapter">
                    <div className="section-header">
                        <div className="section-icon" style={{ backgroundColor: 'rgba(251, 188, 5, 0.15)', color: '#fbbc05' }}>
                            👥
                        </div>
                        <div>
                            <h2>1.3 グループの管理</h2>
                            <p>コミュニケーションとアクセス制御の両面で機能するグループの管理</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>4種類のグループタイプ比較 <span className="tag">試験頻出</span></h3>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>グループタイプ</th>
                                        <th>主な用途</th>
                                        <th>特徴的な機能</th>
                                        <th>必要エディション</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>配信リスト</strong></td>
                                        <td>メール一斉送信</td>
                                        <td>メール転送</td>
                                        <td><span className="badge blue">全エディション</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Collaborative Inbox</strong></td>
                                        <td>チーム対応 (support@等)</td>
                                        <td>担当者割り当て、ステータス管理</td>
                                        <td><span className="badge blue">全エディション</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>セキュリティグループ</strong></td>
                                        <td>IAM・アクセス制御</td>
                                        <td>設定グループ、IAM ロール付与</td>
                                        <td><span className="badge yellow">要ラベル設定</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>動的グループ</strong></td>
                                        <td>属性ベースの自動管理</td>
                                        <td>クエリによる自動メンバシップ</td>
                                        <td><span className="badge purple">Enterprise / CI Premium</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <h3>動的グループ (Dynamic Groups)</h3>
                        <div className="callout info">
                            <div className="callout-icon">💡</div>
                            <div>
                                <strong>動的グループのメリット</strong>：メンバーを手動管理する代わりに、ユーザー属性（部署、拠点、役職等）に基づくクエリ条件を定義。条件に合致するユーザーが<strong>自動的に</strong>メンバーとして管理される。
                            </div>
                        </div>
                        <div className="code-block">
                            <span className="comment"># 動的グループのクエリ例</span><br />
                            <span className="key">user.department</span> == <span className="val">&quot;Engineering&quot;</span> &amp;&amp; <span className="key">user.title</span> == <span className="val">&quot;Manager&quot;</span>
                        </div>
                    </div>

                    <div className="card" style={{ borderColor: 'rgba(52, 211, 153, 0.2)', backgroundColor: 'rgba(52, 211, 153, 0.03)' }}>
                        <h3>✦ セクション 1.3 ベストプラクティス総まとめ</h3>
                        <ul className="bp-list">
                            <li>グループの命名規則を統一する（例: grp-sales@, sec-admin@）</li>
                            <li>チームでのメール対応には Collaborative Inbox を活用し、対応の重複を防ぐ</li>
                            <li>動的グループを活用してメンバー管理を自動化し、人事異動時の設定漏れを防ぐ</li>
                            <li>セキュリティグループは一度設定すると通常グループに戻せないため、有効化前に検討する</li>
                            <li>設定グループ（アクセスグループ）の設定は OU 設定より優先されることを理解する</li>
                        </ul>
                    </div>
                </section>

                <div className="divider"></div>

                {/* ── CH4: ドメイン ── */}
                <section id="ch4" className="chapter">
                    <div className="section-header">
                        <div className="section-icon" style={{ backgroundColor: 'rgba(234, 67, 53, 0.15)', color: '#ea4335' }}>
                            🌐
                        </div>
                        <div>
                            <h2>1.4 ドメインの管理</h2>
                            <p>プライマリ・セカンダリ・エイリアス — 3種類のドメイン管理</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>ドメイン種別の比較 <span className="tag">試験最頻出</span></h3>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>種別</th>
                                        <th>定義</th>
                                        <th>ライセンス</th>
                                        <th>独立受信箱</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>プライマリ</strong></td>
                                        <td>契約時のメインドメイン</td>
                                        <td>基本コスト</td>
                                        <td>✅ あり</td>
                                    </tr>
                                    <tr>
                                        <td><strong>セカンダリ</strong></td>
                                        <td>別ブランド等の独立ドメイン</td>
                                        <td>ユーザーごとに必要</td>
                                        <td>✅ あり</td>
                                    </tr>
                                    <tr>
                                        <td><strong>エイリアス</strong></td>
                                        <td>既存ドメインの別名</td>
                                        <td><span className="badge green">無料</span></td>
                                        <td>❌ 共有</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout info">
                            <div className="callout-icon">💡</div>
                            <div>
                                <strong>試験対策</strong>：「既存ユーザーが複数のドメインでメールを受信したいが、コストを抑えたい」場合は<strong>ドメインエイリアス</strong>が正解。
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>ドメイン確認と DNS 設定</h3>
                        <div className="steps">
                            <div className="step">
                                <div className="step-num">1</div>
                                <div className="step-body"><strong>TXT レコード追加</strong>：ドメイン所有権を証明するために DNS に TXT レコードを登録</div>
                            </div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <div className="step-body"><strong>MX レコード設定</strong>：メール配送先を Google サーバーに向ける設定</div>
                            </div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <div className="step-body"><strong>SPF/DKIM/DMARC</strong>：なりすまし防止のための認証設定（必須）</div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="divider"></div>

                {/* ── CH5: リソース ── */}
                <section id="ch5" className="chapter">
                    <div className="section-header">
                        <div className="section-icon" style={{ backgroundColor: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}>
                            🏗
                        </div>
                        <div>
                            <h2>1.5 建物とリソースの管理</h2>
                            <p>会議室、備品、および建物のカレンダー予約システム</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>リソースの階層構造と管理</h3>
                        <div className="flow">
                            <div className="flow-step">🏢 建物</div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-step">📐 フロア</div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-step">📅 リソース (会議室)</div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-step">⭐ フィーチャー</div>
                        </div>
                        <p>リソースには定員、場所、設備（フィーチャー）を登録し、カレンダーからの絞り込み検索を可能にする。</p>
                        <div className="callout info">
                            <div className="callout-icon">💡</div>
                            <div>
                                <strong>大規模作成</strong>：50 件以上のリソースを追加する場合は、管理コンソールの「CSV 一括インポート」機能を活用する。
                            </div>
                        </div>
                    </div>
                </section>

                <div className="divider"></div>

                {/* ── CH6: 試験対策まとめ ── */}
                <section id="ch6" className="chapter">
                    <div className="section-header">
                        <div className="section-icon" style={{ backgroundColor: 'rgba(79, 195, 247, 0.15)', color: '#4fc3f7' }}>
                            📝
                        </div>
                        <div>
                            <h2>試験対策まとめ</h2>
                            <p>Section 1 で確実に得点するための重要ポイントの総整理</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>🎯 試験頻出パターン</h3>
                        <div className="compare-grid">
                            <div className="compare-card">
                                <h4>Q. 退職者のデータ保持コストを最小化するには？</h4>
                                <ul>
                                    <li>A. <strong>アーカイブユーザー (AU) ライセンス</strong>に切り替える</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4>Q. 特定ユーザーだけに例外的なポリシーを適用するには？</h4>
                                <ul>
                                    <li>A. 専用の <strong>OU</strong> を作成するか、<strong>設定グループ</strong>を使用する</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4>Q. 複数ドメインで同一受信箱を使いたい（無料）</h4>
                                <ul>
                                    <li>A. <strong>ドメインエイリアス</strong>を追加する</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4>Q. 建物・リソースの 100 件一括登録方法は？</h4>
                                <ul>
                                    <li>A. 管理コンソールから <strong>CSV インポート</strong>を実行する</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>Google Associate Workspace Administrator (AGWA) Section 1 解説ガイド</p>
                <p style={{ marginTop: '8px', fontSize: '13px', opacity: 0.8 }}>
                    &copy; 2026 AGWA Study Guide. For internal training purposes only.
                </p>
            </footer>
        </>
    );
}
