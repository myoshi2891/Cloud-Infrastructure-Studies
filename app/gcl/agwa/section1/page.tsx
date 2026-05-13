import type { Metadata } from 'next';
import './page.css';
import ScrollSpy from '../ScrollSpy';

export const metadata: Metadata = {
    title: 'AGWA Section 1 — ユーザー・ドメイン・ディレクトリ管理 完全解説',
    description: 'Associate Google Workspace Administrator (AGWA) Section 1 Complete Guide',
};

export default function AgwaSection1Page() {
    return (
        <>
            <ScrollSpy />
            {/* HERO */}
            <div className="hero">
                <div className="hero-grid"></div>
                <div className="hero-inner">
                    <div className="hero-badge"><span></span> Associate Google Workspace Administrator</div>
                    <h1>
                        Section 1<br /><span className="g">ユーザー・ドメイン・ディレクトリ管理</span><br />完全解説ガイド
                    </h1>
                    <p className="hero-sub">
                        初学者からエンジニアまで。試験に出る全トピックをステップバイステップで解説し、ベストプラクティスとソース源を完全網羅。
                    </p>
                    <div className="hero-stats">
                        <div className="stat-pill"><strong>&asymp;22%</strong>試験配点</div>
                        <div className="stat-pill"><strong>5</strong>大トピック</div>
                        <div className="stat-pill"><strong>50+</strong>ベストプラクティス</div>
                        <div className="stat-pill"><strong>20+</strong>参考URL</div>
                    </div>
                </div>
            </div>

            {/* NAV */}
            <nav className="sticky-nav">
                <div className="nav-inner">
                    <a href="#ch1">
                        <span className="dot" style={{ background: '#4285f4' }}></span>1.1 ユーザーライフサイクル
                    </a>
                    <a href="#ch2">
                        <span className="dot" style={{ background: '#34a853' }}></span>1.2 組織部門(OU)
                    </a>
                    <a href="#ch3">
                        <span className="dot" style={{ background: '#fbbc05' }}></span>1.3 グループ管理
                    </a>
                    <a href="#ch4">
                        <span className="dot" style={{ background: '#ea4335' }}></span>1.4 ドメイン管理
                    </a>
                    <a href="#ch5">
                        <span className="dot" style={{ background: '#a78bfa' }}></span>1.5 建物・リソース
                    </a>
                    <a href="#ch6">
                        <span className="dot" style={{ background: '#4fc3f7' }}></span>試験対策まとめ
                    </a>
                </div>
            </nav>

            {/* MAIN */}
            <main className="main">
                {/* ═══════════════════════════════════════════════════ */}
                {/* CH1: ユーザーライフサイクル */}
                {/* ═══════════════════════════════════════════════════ */}
                <section id="ch1" className="chapter">
                    <div className="section-header">
                        <div
                            className="section-icon"
                            style={{ background: 'rgba(66, 133, 244, 0.15)', color: '#4285f4' }}
                        >
                            👤
                        </div>
                        <div>
                            <h2>1.1 ユーザーライフサイクルの管理</h2>
                            <p>プロビジョニングから削除まで — アカウント管理の全プロセスを完全解説</p>
                        </div>
                    </div>

                    {/* 作成方法比較 */}
                    <div className="card">
                        <h3>ユーザーアカウント作成方法の比較 <span className="tag">試験頻出</span></h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '16px' }}>
                            組織の規模・技術スタックに応じて最適な手法を選択する。
                        </p>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>作成手法</th>
                                        <th>適したシナリオ</th>
                                        <th>スケール</th>
                                        <th>特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>管理コンソール（手動）</strong></td>
                                        <td>少人数・テストアカウント</td>
                                        <td><span className="badge blue">&asymp;10名</span></td>
                                        <td>GUI操作、即時反映</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CSV 一括アップロード</strong></td>
                                        <td>定期採用・初期移行</td>
                                        <td><span className="badge yellow">&asymp;数千名</span></td>
                                        <td>フォーマット正確性が必須</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Directory API</strong></td>
                                        <td>人事システムとの連携</td>
                                        <td><span className="badge green">無制限</span></td>
                                        <td>リアルタイム自動プロビジョニング</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GCDS</strong></td>
                                        <td>AD/LDAP環境との同期</td>
                                        <td><span className="badge green">大規模</span></td>
                                        <td>一方向同期(AD&rarr;Google)、定期実行</td>
                                    </tr>
                                    <tr>
                                        <td><strong>サードパーティ IdP (SAML)</strong></td>
                                        <td>Okta/Azure ADとの統合</td>
                                        <td><span className="badge green">大規模</span></td>
                                        <td>SSO + SCIMプロビジョニング</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 style={{ marginTop: '28px' }}>手動作成 — ステップバイステップ</h3>
                        <div className="steps">
                            <div className="step">
                                <div className="step-num">1</div>
                                <div className="step-body">
                                    <strong>管理コンソールを開く</strong>管理コンソール &rarr;
                                    <span className="term">ディレクトリ</span> &rarr;
                                    <span className="term">ユーザー</span>
                                    &rarr;「新しいユーザーを追加」をクリック
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <div className="step-body">
                                    <strong>基本情報を入力</strong>姓・名・プライマリメールアドレス（ユーザー名@ドメイン）を入力。メールアドレスは後から変更可能だが、変更時に旧アドレスはエイリアスに変換される。
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <div className="step-body">
                                    <strong>組織部門（OU）を選択</strong>所属させる OU
                                    を指定する。この選択でポリシーが決まるため慎重に。
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">4</div>
                                <div className="step-body">
                                    <strong>パスワード設定</strong>自動生成、または手動設定。「次回ログイン時にパスワード変更を要求」にチェックを入れる（セキュリティのベストプラクティス）。
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">5</div>
                                <div className="step-body">
                                    <strong>ライセンス割り当て</strong>作成完了後、または自動割り当て設定済みなら不要。
                                </div>
                            </div>
                        </div>

                        <h3 style={{ marginTop: '28px' }}>CSV一括作成 — フォーマット例</h3>
                        <div className="code-block">
                            <span className="comment"># CSV テンプレートの必須列</span><br />
                            <span className="key">First Name</span>,<span className="key">Last Name</span>,<span className="key">Email Address</span>,<span className="key">Password</span>,<span className="key">Org Unit Path</span><br />
                            <span className="val">山田</span>,<span className="val">太郎</span>,<span className="val">taro.yamada@example.com</span>,<span className="val">TempPass123!</span>,<span className="path">/営業部</span><br />
                            <span className="val">鈴木</span>,<span className="val">花子</span>,<span className="val">hanako.suzuki@example.com</span>,<span className="val">TempPass456!</span>,<span className="path">/開発部</span>
                        </div>

                        <div className="sources">
                            <h4>📎 公式ドキュメント</h4>
                            <a href="https://support.google.com/a/answer/40057" target="_blank" rel="noopener noreferrer">↗ ユーザーの一括追加</a>
                            <a href="https://support.google.com/a/answer/33310" target="_blank" rel="noopener noreferrer">↗ ユーザーの追加</a>
                            <a href="https://developers.google.com/workspace/admin/directory/v1/guides/manage-users" target="_blank" rel="noopener noreferrer">↗ Directory API</a>
                        </div>
                    </div>
                    {/* GCDS */}
                    <div className="card">
                        <h3>GCDS（Google Cloud Directory Sync）詳解 <span className="tag">重要</span></h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px' }}>
                            オンプレミスAD/LDAPとGoogle Workspaceを継続的に同期させるツール。
                        </p>

                        <div className="callout info">
                            <div className="callout-icon">ℹ️</div>
                            <div>
                                <strong>GCDS の同期方向は「一方向のみ」</strong><br />AD/LDAP &rarr; Google
                                Workspace の方向のみ。Google側で変更した内容はADに反映されない。
                            </div>
                        </div>

                        <div className="flow">
                            <div
                                className="flow-step"
                                style={{
                                    background: 'rgba(66, 133, 244, 0.1)',
                                    borderColor: 'rgba(66, 133, 244, 0.3)',
                                }}
                            >
                                Active Directory<br /><small style={{ color: 'var(--text-dim)' }}>真実のソース</small>
                            </div>
                            <div className="flow-arrow">&rarr;</div>
                            <div className="flow-step">
                                GCDS<br /><small style={{ color: 'var(--text-dim)' }}>差分検出・同期</small>
                            </div>
                            <div className="flow-arrow">&rarr;</div>
                            <div
                                className="flow-step"
                                style={{
                                    background: 'rgba(52, 211, 153, 0.1)',
                                    borderColor: 'rgba(52, 211, 153, 0.3)',
                                }}
                            >
                                Google Workspace<br /><small style={{ color: 'var(--text-dim)' }}>自動反映</small>
                            </div>
                        </div>

                        <h3 style={{ marginTop: '20px' }}>GCDS でできること</h3>
                        <div className="compare-grid">
                            <div className="compare-card">
                                <h4 style={{ color: 'var(--accent2)' }}>✅ 同期対象</h4>
                                <ul>
                                    <li>ユーザーの作成・更新・削除/停止</li>
                                    <li>グループ・配信リストの同期</li>
                                    <li>カスタム属性のマッピング</li>
                                    <li>組織部門（OU）の割り当て</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4 style={{ color: 'var(--danger)' }}>❌ 同期対象外</h4>
                                <ul>
                                    <li>メールデータ（メール移行は別ツール）</li>
                                    <li>カレンダーデータ</li>
                                    <li>ドライブファイル</li>
                                    <li>Workspace固有の設定変更</li>
                                </ul>
                            </div>
                        </div>

                        <h3 style={{ marginTop: '24px' }}>設定手順</h3>
                        <div className="steps">
                            <div className="step">
                                <div className="step-num">1</div>
                                <div className="step-body">
                                    <strong>ツールをインストール</strong>GCDSをオンプレミスサーバーにインストール（Windows/Linux対応）
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <div className="step-body">
                                    <strong>AD/LDAP接続設定</strong>サーバーアドレス、ポート、認証情報（サービスアカウント）を設定
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <div className="step-body">
                                    <strong>同期ルールを定義</strong>LDAPクエリで同期対象ユーザー・グループを絞り込む
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">4</div>
                                <div className="step-body">
                                    <strong>Google Workspaceと接続</strong>管理者アカウントのOAuth認証を設定
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">5</div>
                                <div className="step-body">
                                    <strong>⚠️ シミュレーションを実行</strong>必ず本番同期前にドライランを実施し、意図しないユーザー削除がないことを確認！
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">6</div>
                                <div className="step-body">
                                    <strong>スケジュール実行を設定</strong>例:
                                    毎時自動同期でリアルタイムな状態維持
                                </div>
                            </div>
                        </div>

                        <div className="callout warn">
                            <div className="callout-icon">⚠️</div>
                            <div>
                                <strong>GCDS &ne; メール移行ツール</strong><br />試験頻出の誤解！GCDSはユーザー/グループ情報の同期専用。メールデータの移行には別途「データ移行サービス」「GWMME」「Google
                                Workspace Migrate」を使用する。
                            </div>
                        </div>

                        <div className="sources">
                            <h4>📎 公式ドキュメント</h4>
                            <a href="https://support.google.com/a/answer/106368" target="_blank" rel="noopener noreferrer">↗ GCDS 概要</a>
                            <a href="https://support.google.com/a/answer/7177830" target="_blank" rel="noopener noreferrer">↗ GCDS ベストプラクティス</a>
                        </div>
                    </div>

                    {/* 移行ツール比較 */}
                    <div className="card">
                        <h3>移行ツール完全比較 <span className="tag">試験頻出</span></h3>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ツール名</th>
                                        <th>移行元</th>
                                        <th>移行対象データ</th>
                                        <th>規模</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>データ移行サービス</strong><br /><span
                                                style={{ fontSize: '1rem', color: 'var(--text-dim)' }}
                                            >Admin コンソール内</span>
                                        </td>
                                        <td>Exchange, M365, Gmail(他組織), IMAP</td>
                                        <td>メール・カレンダー・連絡先</td>
                                        <td><span className="badge blue">小〜中</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>GWMME</strong><br /><span
                                                style={{ fontSize: '1rem', color: 'var(--text-dim)' }}
                                            >Google Workspace Migration for Microsoft Exchange</span>
                                        </td>
                                        <td>Microsoft Exchange オンプレミス</td>
                                        <td>メール・カレンダー・連絡先</td>
                                        <td><span className="badge yellow">中〜大</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Google Workspace Migrate</strong></td>
                                        <td>Exchange, SharePoint, Box, ファイルサーバー</td>
                                        <td>メール・ファイル・カレンダー</td>
                                        <td><span className="badge green">大規模・複雑</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Gmailのインポート機能</strong></td>
                                        <td>IMAPサーバー（個人向け）</td>
                                        <td>メールのみ</td>
                                        <td><span className="badge blue">個人</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>GCDS</strong></td>
                                        <td>Active Directory / LDAP</td>
                                        <td>ユーザー・グループ情報のみ</td>
                                        <td><span className="badge yellow">中〜大</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="sources">
                            <h4>📎 公式ドキュメント</h4>
                            <a href="https://support.google.com/a/answer/6374360" target="_blank" rel="noopener noreferrer">↗ データ移行サービス</a>
                            <a href="https://support.google.com/a/answer/180898" target="_blank" rel="noopener noreferrer">↗ GWMME</a>
                            <a href="https://support.google.com/workspacemigrate" target="_blank" rel="noopener noreferrer">↗ Google Workspace Migrate</a>
                        </div>
                    </div>
                    {/* SAML SSO */}
                    <div className="card">
                        <h3>
                            SAML SSO — サードパーティ IdP との認証連携 <span className="tag">重要</span>
                        </h3>

                        <div className="compare-grid">
                            <div className="compare-card">
                                <h4 style={{ color: 'var(--google-blue)' }}>SP-Initiated SSO</h4>
                                <ul>
                                    <li>ユーザーがGoogle(SP)にアクセス</li>
                                    <li>未認証の場合 IdP にリダイレクト</li>
                                    <li>IdP で認証 &rarr; SAML アサーション発行</li>
                                    <li>Google がアサーションを検証してログイン</li>
                                    <li>ブックマーク・URL直接アクセス向け</li>
                                </ul>
                            </div>
                            <div className="compare-card">
                                <h4 style={{ color: 'var(--accent5)' }}>IdP-Initiated SSO</h4>
                                <ul>
                                    <li>ユーザーが IdP ダッシュボードにログイン</li>
                                    <li>アプリアイコンをクリック</li>
                                    <li>SAML アサーション付きでGoogleへ遷移</li>
                                    <li>Google がアサーションを検証してログイン</li>
                                    <li>社内ポータルからのアクセス向け</li>
                                </ul>
                            </div>
                        </div>

                        <h3 style={{ marginTop: '24px' }}>設定手順（Admin コンソール）</h3>
                        <div className="steps">
                            <div className="step">
                                <div className="step-num">1</div>
                                <div className="step-body">
                                    <strong>設定画面を開く</strong>管理コンソール &rarr;
                                    <span className="term">セキュリティ</span> &rarr;
                                    <span className="term">認証</span> &rarr;
                                    <span className="term">サードパーティ IdP での SSO</span>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <div className="step-body">
                                    <strong>SSO プロファイルを有効化</strong>「SSO
                                    プロファイルを使用する」をオンにする
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <div className="step-body">
                                    <strong>URL を入力</strong>IdPが提供する「ログインページURL」「ログアウトページURL」「パスワード変更URL」を入力
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">4</div>
                                <div className="step-body">
                                    <strong>証明書をアップロード</strong>IdPの署名証明書（X.509形式）をアップロードしてアサーション検証を可能にする
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">5</div>
                                <div className="step-body">
                                    <strong>ネットワークマスクを設定</strong>必要に応じて、社内IPアドレスからはSSO不要でアクセス可能にする
                                </div>
                            </div>
                        </div>

                        <div className="callout warn">
                            <div className="callout-icon">⚠️</div>
                            <div>
                                <strong>スーパー管理者は SSO 対象から除外する</strong><br />IdP
                                が障害を起こした際の緊急アクセスを確保するため、スーパー管理者アカウントはSSO対象から除外し、直接ログインを維持する。
                            </div>
                        </div>

                        <div className="sources">
                            <h4>📎 公式ドキュメント</h4>
                            <a href="https://support.google.com/a/answer/60224" target="_blank" rel="noopener noreferrer">↗ SAML SSO 設定</a>
                            <a href="https://support.google.com/a/answer/6087519" target="_blank" rel="noopener noreferrer">↗ SAML 詳細設定</a>
                            <a href="https://support.google.com/a/answer/7614472" target="_blank" rel="noopener noreferrer">↗ SCIM プロビジョニング</a>
                        </div>
                    </div>

                    {/* アカウント状態管理 */}
                    <div className="card">
                        <h3>
                            アカウント状態管理 — 停止・削除・アーカイブ
                            <span className="tag">試験最頻出</span>
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px' }}>
                            退職者処理において正しい状態を選択することがコスト最適化とデータ保護の鍵。
                        </p>

                        <div className="state-grid">
                            <div className="state-card active">
                                <h4>✅ アクティブ</h4>
                                <ul>
                                    <li>✓ 通常稼働状態</li>
                                    <li>✓ ログイン可能</li>
                                    <li>✓ データアクセス可能</li>
                                    <li>✓ ライセンス消費あり</li>
                                </ul>
                            </div>
                            <div className="state-card suspended">
                                <h4>⏸ 停止（Suspend）</h4>
                                <ul>
                                    <li>✗ ログイン不可</li>
                                    <li>✓ データは保持</li>
                                    <li>⚠ ライセンス消費継続</li>
                                    <li>✓ いつでも復元可能</li>
                                    <li>用途: 休職・調査・一時停止</li>
                                </ul>
                            </div>
                            <div className="state-card archived">
                                <h4>📦 アーカイブ</h4>
                                <ul>
                                    <li>✗ ログイン不可</li>
                                    <li>✓ データは無期限保持</li>
                                    <li>💰 低コストライセンスに変更</li>
                                    <li>✓ Vaultでデータ保持</li>
                                    <li>用途: 退職者のデータ長期保持</li>
                                </ul>
                            </div>
                            <div className="state-card deleted">
                                <h4>🗑 削除（Delete）</h4>
                                <ul>
                                    <li>✗ ログイン不可</li>
                                    <li>⚠ データは20日間のみ</li>
                                    <li>💰 ライセンス解放</li>
                                    <li>✅ 20日以内なら復元可</li>
                                    <li>用途: データ不要の退職者</li>
                                </ul>
                            </div>
                        </div>

                        <div className="callout danger">
                            <div className="callout-icon">🚨</div>
                            <div>
                                <strong>削除後 20 日でデータは完全消滅</strong><br />削除後 20
                                日を過ぎると復元不可。法的要件やデータ保持義務がある場合は必ず「アーカイブ」を使用すること。
                            </div>
                        </div>

                        <h3 style={{ marginTop: '24px' }}>
                            退職者処理のゴールデンフロー ✦ ベストプラクティス
                        </h3>
                        <div className="flow" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div className="flow" style={{ alignItems: 'center', gap: '12px' }}>
                                <div
                                    className="flow-step"
                                    style={{
                                        background: 'rgba(248, 113, 113, 0.08)',
                                        borderColor: 'rgba(248, 113, 113, 0.2)',
                                    }}
                                >
                                    🔒 Step 1<br /><small>即時アクション</small>
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                    パスワードリセット・ログインセッション無効化・モバイルデバイスワイプ
                                </div>
                            </div>
                            <div style={{ color: 'var(--text-dim)', marginLeft: '60px' }}>&darr;</div>
                            <div className="flow" style={{ alignItems: 'center', gap: '12px' }}>
                                <div
                                    className="flow-step"
                                    style={{
                                        background: 'rgba(251, 191, 36, 0.08)',
                                        borderColor: 'rgba(251, 191, 36, 0.2)',
                                    }}
                                >
                                    ⏸ Step 2<br /><small>暫定対応</small>
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                    アカウントを「停止」、メール転送・受信トレイ委任で業務引き継ぎ確認
                                </div>
                            </div>
                            <div style={{ color: 'var(--text-dim)', marginLeft: '60px' }}>&darr;</div>
                            <div className="flow" style={{ alignItems: 'center', gap: '12px' }}>
                                <div
                                    className="flow-step"
                                    style={{
                                        background: 'rgba(79, 195, 247, 0.08)',
                                        borderColor: 'rgba(79, 195, 247, 0.2)',
                                    }}
                                >
                                    📂 Step 3<br /><small>データ移転</small>
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                    Driveデータの所有権を後任者・管理アカウントに移転（マイドライブのみ対象）
                                </div>
                            </div>
                            <div style={{ color: 'var(--text-dim)', marginLeft: '60px' }}>&darr;</div>
                            <div className="flow" style={{ alignItems: 'center', gap: '12px' }}>
                                <div
                                    className="flow-step"
                                    style={{
                                        background: 'rgba(167, 139, 250, 0.08)',
                                        borderColor: 'rgba(167, 139, 250, 0.2)',
                                    }}
                                >
                                    📦 Step 4<br /><small>最終処理</small>
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                    データ保持必要 &rarr; アーカイブ / 不要 &rarr; 削除（ライセンス回収）
                                </div>
                            </div>
                        </div>

                        <div className="sources">
                            <h4>📎 公式ドキュメント</h4>
                            <a href="https://support.google.com/a/answer/33312" target="_blank" rel="noopener noreferrer">↗ ユーザーの停止・削除</a>
                            <a href="https://support.google.com/a/answer/9032727" target="_blank" rel="noopener noreferrer">↗ アーカイブユーザー</a>
                            <a href="https://support.google.com/a/answer/1247360" target="_blank" rel="noopener noreferrer">↗ アカウント復元</a>
                        </div>
                    </div>

                    {/* ユーザー属性 */}
                    <div className="card">
                        <h3>ユーザー属性の変更と管理</h3>

                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>属性</th>
                                        <th>変更後の挙動</th>
                                        <th>注意点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>プライマリメールアドレス</strong></td>
                                        <td>旧アドレスは自動的にエイリアスとして保持</td>
                                        <td>外部サービスへの影響を事前確認</td>
                                    </tr>
                                    <tr>
                                        <td><strong>メールエイリアス</strong></td>
                                        <td>受信のみ可能（最大30個）</td>
                                        <td>送信は常にプライマリアドレス</td>
                                    </tr>
                                    <tr>
                                        <td><strong>表示名（姓・名）</strong></td>
                                        <td>メールアドレスは変わらない</td>
                                        <td>変更はすぐに反映される</td>
                                    </tr>
                                    <tr>
                                        <td><strong>組織部門（OU）</strong></td>
                                        <td>移動後はその OU のポリシーが即時適用</td>
                                        <td>ポリシー変更のユーザーへの影響を考慮</td>
                                    </tr>
                                    <tr>
                                        <td><strong>パスワード</strong></td>
                                        <td>管理者はいつでもリセット可能</td>
                                        <td>「次回変更強制」フラグを活用</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 style={{ marginTop: '20px' }}>パスワードポリシーの推奨設定</h3>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>設定項目</th>
                                        <th>推奨値</th>
                                        <th>根拠</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>最低文字数</td>
                                        <td><span className="badge green">12文字以上</span></td>
                                        <td>ブルートフォース攻撃への耐性向上</td>
                                    </tr>
                                    <tr>
                                        <td>最大文字数</td>
                                        <td><span className="badge blue">100文字</span></td>
                                        <td>パスフレーズを許可</td>
                                    </tr>
                                    <tr>
                                        <td>強度の強制</td>
                                        <td><span className="badge green">有効</span></td>
                                        <td>推測されやすいパスワードを拒否</td>
                                    </tr>
                                    <tr>
                                        <td>定期的な変更強制</td>
                                        <td><span className="badge yellow">設定しない方向で検討</span></td>
                                        <td>
                                            NIST SP 800-63B
                                            に準拠。強制変更は弱いパスワードを誘発する可能性
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>再利用禁止</td>
                                        <td><span className="badge green">有効</span></td>
                                        <td>古いパスワードへの回帰を防ぐ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="sources">
                            <h4>📎 公式ドキュメント</h4>
                            <a href="https://support.google.com/a/answer/182084" target="_blank" rel="noopener noreferrer">↗ ユーザー名変更</a>
                            <a href="https://support.google.com/a/answer/33327" target="_blank" rel="noopener noreferrer">↗ メールエイリアス</a>
                            <a href="https://support.google.com/a/answer/139399" target="_blank" rel="noopener noreferrer">↗ パスワードポリシー</a>
                            <a href="https://knowledge.workspace.google.com/admin/users/enforce-and-monitor-password-requirements-for-users" target="_blank" rel="noopener noreferrer">↗ パスワード要件</a>
                        </div>
                    </div>

                    <div
                        className="card"
                        style={{
                            borderColor: 'rgba(52, 211, 153, 0.2)',
                            background: 'rgba(52, 211, 153, 0.03)',
                        }}
                    >
                        <h3>✦ セクション 1.1 ベストプラクティス総まとめ</h3>
                        <ul className="bp-list">
                            <li>
                                GCDS
                                は「ユーザー/グループ同期ツール」であり「メール移行ツール」ではないことを明確に区別する
                            </li>
                            <li>
                                スーパー管理者アカウントは日常業務用アカウントと完全に分離し、専用アカウントを使用する
                            </li>
                            <li>
                                本番同期の前に GCDS
                                の「シミュレーション実行（ドライラン）」で意図しない削除がないことを確認する
                            </li>
                            <li>
                                退職者は即時「停止」し、データ所有権移転後にアーカイブまたは削除する（削除の20日ルールに注意）
                            </li>
                            <li>
                                パスワードリセット時は必ず「次回ログイン時に変更を要求」フラグを有効にする
                            </li>
                            <li>
                                新規採用者の自動プロビジョニングに GCDS または SCIM
                                を活用し、手動作業を排除する
                            </li>
                            <li>
                                管理者アカウントには物理セキュリティキー（FIDO2/Titan Key）による 2SV
                                を必須化する
                            </li>
                        </ul>
                    </div>                        </section>

                        <div className="divider"></div>

                        {/* ═══════════════════════════════════════════════════ */}
                        {/* CH2: OU */}            {/* ═══════════════════════════════════════════════════ */}
            <section id="ch2" className="chapter">
                <div className="section-header">
                    <div
                        className="section-icon"
                        style={{ background: 'rgba(52, 168, 83, 0.15)', color: '#34a853' }}
                    >
                        🏢
                    </div>
                    <div>
                        <h2>1.2 組織部門（OU）の設計と作成</h2>
                        <p>ポリシー適用の基盤となるOU階層設計の原則と実践</p>
                    </div>
                </div>

                <div className="card">
                    <h3>OU の概念とポリシー継承メカニズム</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px' }}>
                        OUはツリー状の階層構造で、上位OUのポリシーは下位OUに<strong>自動的に継承</strong>される。
                    </p>

                    {/* OU Hierarchy SVG Diagram */}
                    <div style={{ margin: '20px 0', overflowX: 'auto' }}>
                        <svg
                            viewBox="0 0 860 500"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                width: '100%',
                                maxWidth: '860px',
                                display: 'block',
                                margin: '0 auto',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            <defs>
                                <marker
                                    id="arrow"
                                    markerWidth="8"
                                    markerHeight="8"
                                    refX="6"
                                    refY="3"
                                    orient="auto"
                                >
                                    <path d="M0,0 L0,6 L8,3 z" fill="#4fc3f7" opacity="0.6" />
                                </marker>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Background */}
                            <rect
                                width="860"
                                height="500"
                                rx="16"
                                fill="#0d1520"
                                stroke="rgba(79,195,247,0.15)"
                                strokeWidth="1"
                            />

                            {/* Title */}
                            <text
                                x="430"
                                y="32"
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="12"
                                fontFamily="'DM Mono',monospace"
                                letterSpacing="2"
                            >
                                OU 階層とポリシー継承メカニズム
                            </text>

                            {/* ===== ROOT NODE ===== */}
                            <rect
                                x="300"
                                y="52"
                                width="260"
                                height="52"
                                rx="12"
                                fill="rgba(66,133,244,0.18)"
                                stroke="#4285F4"
                                strokeWidth="2"
                            />
                            <text
                                x="430"
                                y="73"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="14"
                                fontWeight="700"
                            >
                                example.com（ルート）
                            </text>
                            <text x="430" y="91" textAnchor="middle" fill="#4285F4" fontSize="11">
                                デフォルトポリシー適用 ／ 最上位
                            </text>

                            {/* Root &rarr; 本社 */}
                            <line
                                x1="380"
                                y1="104"
                                x2="190"
                                y2="162"
                                stroke="#4fc3f7"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />
                            {/* Root &rarr; 支社A */}
                            <line
                                x1="430"
                                y1="104"
                                x2="430"
                                y2="162"
                                stroke="#4fc3f7"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />
                            {/* Root &rarr; 特殊アカウント */}
                            <line
                                x1="480"
                                y1="104"
                                x2="700"
                                y2="162"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />

                            {/* ===== LEVEL 1 NODES ===== */}
                            {/* /本社 */}
                            <rect
                                x="80"
                                y="162"
                                width="220"
                                height="48"
                                rx="10"
                                fill="rgba(52,211,153,0.12)"
                                stroke="#34d399"
                                strokeWidth="1.5"
                            />
                            <text
                                x="190"
                                y="182"
                                textAnchor="middle"
                                fill="#34d399"
                                fontSize="13"
                                fontWeight="600"
                            >
                                /本社
                            </text>
                            <text
                                x="190"
                                y="198"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                継承 ＋ 本社固有設定
                            </text>

                            {/* /支社A */}
                            <rect
                                x="320"
                                y="162"
                                width="220"
                                height="48"
                                rx="10"
                                fill="rgba(52,211,153,0.12)"
                                stroke="#34d399"
                                strokeWidth="1.5"
                            />
                            <text
                                x="430"
                                y="182"
                                textAnchor="middle"
                                fill="#34d399"
                                fontSize="13"
                                fontWeight="600"
                            >
                                /支社A
                            </text>
                            <text
                                x="430"
                                y="198"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                継承（ルートのポリシーをそのまま適用）
                            </text>

                            {/* /特殊アカウント */}
                            <rect
                                x="600"
                                y="162"
                                width="220"
                                height="48"
                                rx="10"
                                fill="rgba(167,139,250,0.12)"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                            />
                            <text
                                x="710"
                                y="182"
                                textAnchor="middle"
                                fill="#a78bfa"
                                fontSize="13"
                                fontWeight="600"
                            >
                                /特殊アカウント
                            </text>
                            <text
                                x="710"
                                y="198"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                例外ポリシー適用（独立管理）
                            </text>

                            {/* 本社 &rarr; 営業部 */}
                            <line
                                x1="150"
                                y1="210"
                                x2="120"
                                y2="268"
                                stroke="#4fc3f7"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />
                            {/* 本社 &rarr; 開発部 */}
                            <line
                                x1="230"
                                y1="210"
                                x2="270"
                                y2="268"
                                stroke="#4fc3f7"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />

                            {/* 特殊 &rarr; サービスアカウント */}
                            <line
                                x1="670"
                                y1="210"
                                x2="638"
                                y2="268"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />
                            {/* 特殊 &rarr; 会議室リソース */}
                            <line
                                x1="750"
                                y1="210"
                                x2="778"
                                y2="268"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />

                            {/* ===== LEVEL 2 NODES ===== */}
                            {/* /本社/営業部 */}
                            <rect
                                x="30"
                                y="268"
                                width="180"
                                height="48"
                                rx="10"
                                fill="rgba(251,191,36,0.1)"
                                stroke="#fbbf24"
                                strokeWidth="1.5"
                            />
                            <text
                                x="120"
                                y="288"
                                textAnchor="middle"
                                fill="#fbbf24"
                                fontSize="12"
                                fontWeight="600"
                            >
                                /営業部
                            </text>
                            <text
                                x="120"
                                y="304"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                外部共有ポリシーを上書き
                            </text>

                            {/* /本社/開発部 */}
                            <rect
                                x="220"
                                y="268"
                                width="180"
                                height="48"
                                rx="10"
                                fill="rgba(52,211,153,0.1)"
                                stroke="#34d399"
                                strokeWidth="1.5"
                            />
                            <text
                                x="310"
                                y="288"
                                textAnchor="middle"
                                fill="#34d399"
                                fontSize="12"
                                fontWeight="600"
                            >
                                /開発部
                            </text>
                            <text
                                x="310"
                                y="304"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                継承（本社設定を適用）
                            </text>

                            {/* /サービスアカウント */}
                            <rect
                                x="560"
                                y="268"
                                width="160"
                                height="48"
                                rx="10"
                                fill="rgba(167,139,250,0.1)"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                            />
                            <text
                                x="640"
                                y="288"
                                textAnchor="middle"
                                fill="#a78bfa"
                                fontSize="11"
                                fontWeight="600"
                            >
                                /サービスアカウント
                            </text>
                            <text
                                x="640"
                                y="304"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                SA 専用ポリシー
                            </text>

                            {/* /会議室リソース */}
                            <rect
                                x="730"
                                y="268"
                                width="100"
                                height="48"
                                rx="10"
                                fill="rgba(167,139,250,0.1)"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                            />
                            <text
                                x="780"
                                y="288"
                                textAnchor="middle"
                                fill="#a78bfa"
                                fontSize="10"
                                fontWeight="600"
                            >
                                /会議室
                            </text>
                            <text x="780" y="304" textAnchor="middle" fill="#64748b" fontSize="9">
                                リソース用
                            </text>

                            {/* 営業部 &rarr; 管理職 */}
                            <line
                                x1="120"
                                y1="316"
                                x2="120"
                                y2="372"
                                stroke="#fb923c"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />

                            {/* ===== LEVEL 3 NODE ===== */}
                            {/* /営業部/管理職 */}
                            <rect
                                x="30"
                                y="372"
                                width="180"
                                height="48"
                                rx="10"
                                fill="rgba(251,146,60,0.1)"
                                stroke="#fb923c"
                                strokeWidth="1.5"
                            />
                            <text
                                x="120"
                                y="392"
                                textAnchor="middle"
                                fill="#fb923c"
                                fontSize="12"
                                fontWeight="600"
                            >
                                /管理職
                            </text>
                            <text
                                x="120"
                                y="408"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                            >
                                さらに上書き可能
                            </text>

                            {/* ===== INHERITANCE LEGEND ===== */}
                            <rect
                                x="30"
                                y="446"
                                width="800"
                                height="40"
                                rx="8"
                                fill="rgba(255,255,255,0.03)"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                            <text
                                x="50"
                                y="461"
                                fill="#64748b"
                                fontSize="10"
                                fontFamily="'DM Mono',monospace"
                            >
                                凡例：
                            </text>

                            <rect
                                x="100"
                                y="450"
                                width="12"
                                height="12"
                                rx="2"
                                fill="rgba(66,133,244,0.3)"
                                stroke="#4285F4"
                                strokeWidth="1.5"
                            />
                            <text x="118" y="461" fill="#94a3b8" fontSize="10">
                                ルート（基準ポリシー）
                            </text>

                            <rect
                                x="260"
                                y="450"
                                width="12"
                                height="12"
                                rx="2"
                                fill="rgba(52,211,153,0.2)"
                                stroke="#34d399"
                                strokeWidth="1.5"
                            />
                            <text x="278" y="461" fill="#94a3b8" fontSize="10">
                                継承（Inherit）
                            </text>

                            <rect
                                x="390"
                                y="450"
                                width="12"
                                height="12"
                                rx="2"
                                fill="rgba(251,191,36,0.15)"
                                stroke="#fbbf24"
                                strokeWidth="1.5"
                            />
                            <text x="408" y="461" fill="#94a3b8" fontSize="10">
                                上書き（Override）
                            </text>

                            <rect
                                x="530"
                                y="450"
                                width="12"
                                height="12"
                                rx="2"
                                fill="rgba(167,139,250,0.15)"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                            />
                            <text x="548" y="461" fill="#94a3b8" fontSize="10">
                                例外OU（Exception）
                            </text>

                            {/* Dashed arrow legend */}
                            <line
                                x1="668"
                                y1="455"
                                x2="700"
                                y2="455"
                                stroke="#4fc3f7"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                markerEnd="url(#arrow)"
                            />
                            <text x="710" y="461" fill="#94a3b8" fontSize="10">
                                ポリシー継承の方向
                            </text>

                            {/* IMPORTANT RULE BOX */}
                            <rect
                                x="440"
                                y="372"
                                width="390"
                                height="60"
                                rx="10"
                                fill="rgba(248,113,113,0.06)"
                                stroke="rgba(248,113,113,0.25)"
                                strokeWidth="1.5"
                            />
                            <text x="460" y="393" fill="#f87171" fontSize="11" fontWeight="700">
                                ⚠ 重要な制約
                            </text>
                            <text x="460" y="409" fill="#94a3b8" fontSize="11">
                                ・ユーザーは 1つの OU にのみ 属することができる
                            </text>
                            <text x="460" y="424" fill="#94a3b8" fontSize="11">
                                ・下位 OU で設定を上書きすると、その子孫に引き継がれる
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
                            <h4 style={{ color: '#34a853' }}>パターン2: ポリシー差異ベース（推奨）</h4>
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

                    <h3 style={{ marginTop: '24px' }}>OU 作成手順 — ステップバイステップ</h3>
                    <div className="steps">
                        <div className="step">
                            <div className="step-num">1</div>
                            <div className="step-body">
                                <strong>OU 作成画面を開く</strong>管理コンソール &rarr;
                                <span className="term">ディレクトリ</span> &rarr;
                                <span className="term">組織部門</span> &rarr; 「＋」アイコン
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">2</div>
                            <div className="step-body">
                                <strong>名前と説明を入力</strong>命名規則を標準化する（例：<code>/Japan/Tokyo/Engineering</code>）
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">3</div>
                            <div className="step-body">
                                <strong>親OUを選択</strong>どの階層に作成するかを選択
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">4</div>
                            <div className="step-body">
                                <strong>ポリシーを設定</strong>作成したOUを選択 &rarr;
                                <span className="term">アプリ</span> &rarr;
                                <span className="term">Google Workspace</span> &rarr;
                                各サービスの設定を変更・保存
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">5</div>
                            <div className="step-body">
                                <strong>ユーザーを移動</strong>ユーザー管理画面から対象ユーザーを選択 &rarr; 「組織部門の変更」を実行
                            </div>
                        </div>
                    </div>

                    <div className="sources">
                        <h4>📎 公式ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/182537" target="_blank" rel="noopener noreferrer">↗ OU の管理</a>
                        <a href="https://support.google.com/a/answer/4352075" target="_blank" rel="noopener noreferrer">↗ OU 設計のベストプラクティス</a>
                        <a href="https://knowledge.workspace.google.com/admin/users/advanced/how-the-organizational-structure-works" target="_blank" rel="noopener noreferrer">↗ OU の仕組み</a>
                    </div>
                </div>

                <div
                    className="card"
                    style={{
                        borderColor: 'rgba(52, 211, 153, 0.2)',
                        background: 'rgba(52, 211, 153, 0.03)',
                    }}
                >
                    <h3>✦ セクション 1.2 ベストプラクティス総まとめ</h3>
                    <ul className="bp-list">
                        <li>
                            OUはポリシーの差異で設計する。同じポリシーのユーザーは同じOUにまとめて管理コストを削減
                        </li>
                        <li>
                            OU
                            階層は最大5階層以内に収める。深すぎると継承関係が複雑になり管理困難になる
                        </li>
                        <li>
                            サービスアカウント・会議室・テストアカウントは専用の例外OUに配置し、ポリシーの独立管理を容易にする
                        </li>
                        <li>
                            新しいポリシーを本番適用する前に、テスト用OUで少数ユーザーに試験的に適用して影響を確認する
                        </li>
                        <li>
                            OU
                            の命名規則を文書化して組織全体で標準化する（後からの変更は影響が大きい）
                        </li>
                        <li>
                            OU
                            移動時はユーザーへ事前通知する（ポリシー変更で利用不可になる機能が生じる可能性）
                        </li>
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* CH3: グループ */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="ch3" className="chapter">
                <div className="section-header">
                    <div
                        className="section-icon"
                        style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#fbbc05' }}
                    >
                        👥
                    </div>
                    <div>
                        <h2>1.3 グループの管理</h2>
                        <p>コミュニケーションとアクセス制御の両面で機能するグループの完全解説</p>
                    </div>
                </div>

                <div className="card">
                    <h3>4種類のグループタイプ完全比較 <span className="tag">試験頻出</span></h3>

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
                                    <td>
                                        <strong>配信リスト<br />（Distribution List）</strong>
                                    </td>
                                    <td>メール一斉送信</td>
                                    <td>グループアドレス宛のメールを全メンバーに転送</td>
                                    <td><span className="badge blue">全エディション</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong
                                            >Collaborative Inbox<br />（共有メールボックス）</strong
                                        >
                                    </td>
                                    <td>チームでのメール対応<br />（support@, info@）</td>
                                    <td>
                                        メールの<strong>担当者割り当て</strong>・<strong
                                            >未解決/解決済み管理</strong
                                        >
                                    </td>
                                    <td><span className="badge blue">全エディション</span></td>
                                </tr>
                                <tr>
                                    <td><strong>セキュリティグループ</strong></td>
                                    <td>IAM・アクセス制御</td>
                                    <td>Cloud IAMロール付与、設定グループとして使用可能</td>
                                    <td><span className="badge yellow">要ラベル設定</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>動的グループ<br />（Dynamic Group）</strong>
                                    </td>
                                    <td>属性ベースの自動メンバー管理</td>
                                    <td>クエリ条件でメンバーを<strong>自動追加・削除</strong></td>
                                    <td>
                                        <span className="badge purple">Enterprise / CI Premium</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <h3>Collaborative Inbox — 詳細解説</h3>

                    <div className="compare-grid">
                        <div className="compare-card">
                            <h4 style={{ color: 'var(--text-muted)' }}>通常の配信リスト</h4>
                            <ul>
                                <li>受信メールを全員に転送するだけ</li>
                                <li>誰が対応中か不明</li>
                                <li>重複対応が発生しやすい</li>
                                <li>ステータス管理機能なし</li>
                            </ul>
                        </div>
                        <div className="compare-card">
                            <h4 style={{ color: 'var(--accent2)' }}>Collaborative Inbox</h4>
                            <ul>
                                <li>メールをキューとして管理</li>
                                <li>担当者に<strong>割り当て（Assign）</strong>可能</li>
                                <li>「未解決/解決済み」ステータス管理</li>
                                <li>チームで協力して対応できる</li>
                            </ul>
                        </div>
                    </div>

                    <h3 style={{ marginTop: '24px' }}>設定手順</h3>
                    <div className="steps">
                        <div className="step">
                            <div className="step-num">1</div>
                            <div className="step-body">
                                <strong>グループを作成または選択</strong>管理コンソール &rarr;
                                <span className="term">ディレクトリ</span> &rarr;
                                <span className="term">グループ</span> &rarr; 対象グループ
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">2</div>
                            <div className="step-body">
                                <strong>Collaborative Inbox を有効化</strong>グループの設定 &rarr;
                                「会話をメンバーに割り当て可能にする」をオン
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">3</div>
                            <div className="step-body">
                                <strong>メンバー権限を設定</strong>メンバー全員に「割り当て・ステータス変更」権限を付与することを推奨
                            </div>
                        </div>
                    </div>

                    <div className="sources">
                        <h4>📎 公式ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/167430" target="_blank" rel="noopener noreferrer">↗ Collaborative Inbox</a>
                    </div>
                </div>

                <div className="card">
                    <h3>動的グループ（Dynamic Groups）— 詳細解説</h3>

                    <div className="callout info">
                        <div className="callout-icon">💡</div>
                        <div>
                            <strong>動的グループの本質</strong>：メンバーを手動管理する代わりに、ユーザー属性に基づくクエリ条件を定義し、条件に合致するユーザーが<strong>自動的に</strong>メンバーとして管理される。
                        </div>
                    </div>

                    <h3 style={{ marginTop: '20px' }}>利用可能なクエリ条件例</h3>
                    <div className="code-block">
                        <span className="comment"># 動的グループのクエリ条件例</span><br />
                        <br />
                        <span className="comment"># 部署ベース</span><br />
                        <span className="key">user.department</span> ==
                        <span className="val">&quot;Engineering&quot;</span><br />
                        <br />
                        <span className="comment"># OU ベース</span><br />
                        <span className="key">user.orgUnitPath</span> ==
                        <span className="val">&quot;/Japan/Tokyo&quot;</span><br />
                        <br />
                        <span className="comment"># 役職ベース</span><br />
                        <span className="key">user.title</span> == <span className="val">&quot;Manager&quot;</span><br />
                        <br />
                        <span className="comment"># カスタム属性ベース</span><br />
                        <span className="key">user.customAttributes.employeeType</span> ==
                        <span className="val">&quot;FTE&quot;</span><br />
                        <br />
                        <span className="comment"># 複合条件（AND）</span><br />
                        <span className="key">user.department</span> ==
                        <span className="val">&quot;Sales&quot;</span> &amp;&amp;
                        <span className="key">user.location.name</span> ==
                        <span className="val">&quot;Tokyo HQ&quot;</span>
                    </div>

                    <div className="callout warn">
                        <div className="callout-icon">⚠️</div>
                        <div>
                            <strong>必要エディション</strong>：動的グループは
                            <strong>Enterprise エディション</strong> または
                            <strong>Cloud Identity Premium</strong> が必要。
                        </div>
                    </div>

                    <div className="sources">
                        <h4>📎 公式ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/11192679" target="_blank" rel="noopener noreferrer">↗ 動的グループ</a>
                        <a href="https://support.google.com/a/answer/33329" target="_blank" rel="noopener noreferrer">↗ グループの管理</a>
                    </div>
                </div>

                <div className="card">
                    <h3>セキュリティグループとアクセスグループ（設定グループ）</h3>

                    <h3
                        style={{
                            marginTop: 0,
                            marginBottom: '16px',
                            fontSize: '1rem',
                            color: 'var(--text-muted)',
                        }}
                    >
                        OU 設定の限界を補完する「設定グループ（アクセスグループ）」
                    </h3>
                    <div className="callout info">
                        <div className="callout-icon">💡</div>
                        <div>
                            <strong>ユースケース</strong>：開発部門のOU全体でYouTubeがオフに設定されているが、その中の特定2名だけが業務でYouTubeを使う必要がある場合。<br /><br />
                            <strong>解決策</strong>：その2名を「YouTube利用許可グループ」に追加し、グループに対してYouTubeを「オン」に設定。グループ設定はOU設定より<strong>優先</strong>される。
                        </div>
                    </div>

                    <div className="callout danger">
                        <div className="callout-icon">🚨</div>
                        <div>
                            <strong>セキュリティグループは一度設定すると通常グループに戻せない</strong><br />セキュリティグループのラベル設定は不可逆。有効化前に本当に必要かを確認すること。
                        </div>
                    </div>

                    <div className="sources">
                        <h4>📎 公式ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/10607394" target="_blank" rel="noopener noreferrer">↗ セキュリティグループ</a>
                        <a href="https://knowledge.workspace.google.com/admin/users/advanced/customize-service-settings-using-configuration-groups" target="_blank" rel="noopener noreferrer">↗ 設定グループ（アクセスグループ）</a>
                    </div>
                </div>

                <div
                    className="card"
                    style={{
                        borderColor: 'rgba(52, 211, 153, 0.2)',
                        background: 'rgba(52, 211, 153, 0.03)',
                    }}
                >
                    <h3>✦ セクション 1.3 ベストプラクティス総まとめ</h3>
                    <ul className="bp-list">
                        <li>
                            グループの命名規則を統一する（例：<code>grp-sales-global@</code>、<code>sec-admin-access@</code> のようにプレフィックスで用途を明示）
                        </li>
                        <li>
                            チームでのメール対応には Collaborative Inbox を活用し、対応の重複と見落としを防ぐ
                        </li>
                        <li>
                            大規模なグループ（全社員グループなど）への外部からのメール送信を制限し、スパム・誤送信リスクを軽減する
                        </li>
                        <li>
                            動的グループを活用してメンバー管理を自動化し、人事異動時の設定漏れを根本から防ぐ
                        </li>
                        <li>
                            各グループに必ずオーナーを設定し、定期的なメンバーレビューを実施してもらう体制を作る
                        </li>
                        <li>
                            セキュリティグループは一度設定すると戻せないため、有効化前に十分に検討する
                        </li>
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* CH4: ドメイン */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="ch4" className="chapter">
                <div className="section-header">
                    <div
                        className="section-icon"
                        style={{ background: 'rgba(234, 67, 53, 0.15)', color: '#ea4335' }}
                    >
                        🌐
                    </div>
                    <div>
                        <h2>1.4 ドメインの管理</h2>
                        <p>プライマリ・セカンダリ・エイリアス — 3種類のドメインを正確に理解する</p>
                    </div>
                </div>

                <div className="card">
                    <h3>3種類のドメイン完全比較 <span className="tag">試験最頻出</span></h3>

                    <div className="tbl-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>ドメイン種別</th>
                                    <th>定義と役割</th>
                                    <th>ライセンスコスト</th>
                                    <th>独立した受信箱</th>
                                    <th>主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>プライマリドメイン</strong></td>
                                    <td>契約時に登録したメインドメイン。全設定の基準。</td>
                                    <td><span className="badge blue">基本コスト</span></td>
                                    <td>✅ あり</td>
                                    <td>組織の標準ID</td>
                                </tr>
                                <tr>
                                    <td><strong>セカンダリドメイン</strong></td>
                                    <td>別ブランド・子会社用に追加する独立したドメイン</td>
                                    <td><span className="badge red">ユーザーごとに追加発生</span></td>
                                    <td>✅ あり（独立）</td>
                                    <td>別ブランド・別地域展開</td>
                                </tr>
                                <tr>
                                    <td><strong>ドメインエイリアス</strong></td>
                                    <td>既存ドメインの別名（.com と .co.jp など）</td>
                                    <td><span className="badge green">無料</span></td>
                                    <td>❌ 既存ユーザーと共有</td>
                                    <td>同一ユーザーの複数アドレス受信</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout info">
                        <div className="callout-icon">💡</div>
                        <div>
                            <strong>試験でよく出る問題パターン</strong>：<br />
                            「example.com に加えて example.co.jp
                            も使いたい。既存ユーザーが両方のアドレスでメールを受信できるようにしたい。追加のライセンスコストは発生させたくない。」<br />
                            &rarr;
                            <strong>ドメインエイリアスとして example.co.jp を追加</strong>。既存ユーザーに自動的に @example.co.jp
                            アドレスが付与され、追加ライセンス不要。
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3>ドメイン追加手順 — DNS 設定を含む完全ステップ</h3>

                    <div className="steps">
                        <div className="step">
                            <div className="step-num">1</div>
                            <div className="step-body">
                                <strong>管理コンソールでドメインを追加</strong>管理コンソール &rarr;
                                <span className="term">アカウント</span> &rarr;
                                <span className="term">ドメイン</span> &rarr;
                                <span className="term">ドメインの管理</span> &rarr; 「ドメインを追加」
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">2</div>
                            <div className="step-body">
                                <strong>ドメイン名を入力して続行</strong>「続行してドメインの所有権を証明」をクリック
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">3</div>
                            <div className="step-body">
                                <strong>DNS に TXT レコードを追加（推奨）</strong>Google が提示する
                                TXT レコードを、ドメインレジストラの DNS 設定に追加する
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">4</div>
                            <div className="step-body">
                                <strong>DNS 伝播を待機</strong>変更が全世界に伝播するまで数分&sim;最大48時間かかる場合がある
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">5</div>
                            <div className="step-body">
                                <strong>管理コンソールで確認をクリック</strong>Googleがレコードを検出したことを確認する
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">6</div>
                            <div className="step-body">
                                <strong>MX レコードを設定</strong>メール配送先をGoogleのサーバーに向けるMXレコードを登録する（メールを使う場合）
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">7</div>
                            <div className="step-body">
                                <strong>SPF/DKIM/DMARC を設定</strong>メールのなりすまし防止のための認証レコードを追加する
                            </div>
                        </div>
                    </div>

                    <h3 style={{ marginTop: '24px' }}>DNS レコード確認コマンド</h3>
                    <div className="code-block">
                        <span className="comment"># TXT レコードの確認（Linux / Mac）</span><br />
                        <span className="cmd">nslookup</span> -type=TXT example.com<br />
                        <span className="cmd">dig</span> TXT example.com<br />
                        <br />
                        <span className="comment"># Windows PowerShell</span><br />
                        <span className="cmd">Resolve-DnsName</span> -Name example.com -Type TXT<br />
                        <br />
                        <span className="comment"># MX レコードの確認</span><br />
                        <span className="cmd">dig</span> MX example.com<br />
                        <span className="cmd">nslookup</span> -type=MX example.com
                    </div>

                    <div className="callout warn">
                        <div className="callout-icon">⚠️</div>
                        <div>
                            <strong>確認後に TXT レコードを削除しない</strong><br />ドメイン確認後にDNSのTXTレコードを削除すると、確認が取り消される場合がある。レコードは残したままにすること。
                        </div>
                    </div>

                    <div className="sources">
                        <h4>📎 公式ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/9008873" target="_blank" rel="noopener noreferrer">↗ ドメインの追加</a>
                        <a href="https://support.google.com/a/answer/7502379" target="_blank" rel="noopener noreferrer">↗ ドメインエイリアス</a>
                        <a href="https://knowledge.workspace.google.com/admin/domains/faq-for-multiple-domains" target="_blank" rel="noopener noreferrer">↗ 複数ドメイン FAQ</a>
                    </div>
                </div>

                <div
                    className="card"
                    style={{
                        borderColor: 'rgba(52, 211, 153, 0.2)',
                        background: 'rgba(52, 211, 153, 0.03)',
                    }}
                >
                    <h3>✦ セクション 1.4 ベストプラクティス総まとめ</h3>
                    <ul className="bp-list">
                        <li>
                            ドメイン確認には CNAME より影響範囲が小さい
                            <strong>TXT レコード</strong>を使用する
                        </li>
                        <li>
                            既存ユーザーが別アドレスでも受信したいだけなら「ドメインエイリアス」を選択し、追加ライセンスコストを回避する
                        </li>
                        <li>
                            プライマリドメインの変更は全ユーザーのメインアドレスに影響するため、計画的なメンテナンスとして慎重に実施する
                        </li>
                        <li>
                            不要になったドメインはAdminコンソールから削除してセキュリティリスクを最小化する
                        </li>
                        <li>ドメイン追加前にMXレコードを確認し、メール配信への影響を把握する</li>
                        <li>
                            SPF・DKIM・DMARCを必ず設定し、メールのなりすまし・フィッシング対策を徹底する
                        </li>
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* CH5: 建物・リソース */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="ch5" className="chapter">
                <div className="section-header">
                    <div
                        className="section-icon"
                        style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}
                    >
                        🏗
                    </div>
                    <div>
                        <h2>1.5 建物とリソースの管理</h2>
                        <p>会議室・備品のカレンダー予約システム構築 — 物理リソースのデジタル管理</p>
                    </div>
                </div>

                <div className="card">
                    <h3>リソース管理の階層構造</h3>

                    {/* Resource Hierarchy SVG */}
                    <div style={{ margin: '20px 0', overflowX: 'auto' }}>
                        <svg
                            viewBox="0 0 860 320"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                width: '100%',
                                maxWidth: '860px',
                                display: 'block',
                                margin: '0 auto',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            <defs>
                                <marker
                                    id="rarrow"
                                    markerWidth="8"
                                    markerHeight="8"
                                    refX="6"
                                    refY="3"
                                    orient="auto"
                                >
                                    <path d="M0,0 L0,6 L8,3 z" fill="#4fc3f7" opacity="0.7" />
                                </marker>
                            </defs>

                            <rect
                                width="860"
                                height="320"
                                rx="16"
                                fill="#0d1520"
                                stroke="rgba(79,195,247,0.15)"
                                strokeWidth="1"
                            />
                            <text
                                x="430"
                                y="28"
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="12"
                                fontFamily="'DM Mono',monospace"
                                letterSpacing="2"
                            >
                                リソース管理の階層構造
                            </text>

                            {/* ===== COLUMN 1: 建物 ===== */}
                            <rect
                                x="20"
                                y="50"
                                width="170"
                                height="220"
                                rx="14"
                                fill="rgba(66,133,244,0.08)"
                                stroke="#4285F4"
                                strokeWidth="1.5"
                            />
                            {/* Header */}
                            <rect
                                x="20"
                                y="50"
                                width="170"
                                height="38"
                                rx="14"
                                fill="rgba(66,133,244,0.25)"
                                stroke="#4285F4"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="20"
                                y="74"
                                width="170"
                                height="16"
                                fill="rgba(66,133,244,0.25)"
                            />
                            <text
                                x="105"
                                y="73"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="13"
                                fontWeight="700"
                            >
                                🏢 建物
                            </text>
                            <text x="105" y="86" textAnchor="middle" fill="#4285F4" fontSize="10">
                                Building
                            </text>

                            <text
                                x="105"
                                y="116"
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="11"
                                fontWeight="600"
                            >
                                東京本社ビル
                            </text>
                            <line
                                x1="36"
                                y1="124"
                                x2="174"
                                y2="124"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                            <text x="36" y="140" fill="#64748b" fontSize="10">📍 住所</text>
                            <text x="36" y="155" fill="#94a3b8" fontSize="10">
                                〒100-0000 東京都...
                            </text>
                            <text x="36" y="172" fill="#64748b" fontSize="10">🗺 緯度・経度</text>
                            <text x="36" y="187" fill="#94a3b8" fontSize="10">
                                35.6762, 139.6503
                            </text>
                            <text x="36" y="204" fill="#64748b" fontSize="10">🏢 フロア数</text>
                            <text x="36" y="219" fill="#94a3b8" fontSize="10">10F</text>
                            <text x="36" y="240" fill="#64748b" fontSize="10">🔑 建物ID</text>
                            <text x="36" y="255" fill="#94a3b8" fontSize="10">tokyo-hq</text>

                            {/* Arrow 1&rarr;2 */}
                            <line
                                x1="192"
                                y1="160"
                                x2="222"
                                y2="160"
                                stroke="#4fc3f7"
                                strokeWidth="2"
                                markerEnd="url(#rarrow)"
                            />

                            {/* ===== COLUMN 2: フロア ===== */}
                            <rect
                                x="224"
                                y="50"
                                width="160"
                                height="220"
                                rx="14"
                                fill="rgba(52,168,83,0.08)"
                                stroke="#34A853"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="224"
                                y="50"
                                width="160"
                                height="38"
                                rx="14"
                                fill="rgba(52,168,83,0.22)"
                                stroke="#34A853"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="224"
                                y="74"
                                width="160"
                                height="16"
                                fill="rgba(52,168,83,0.22)"
                            />
                            <text
                                x="304"
                                y="73"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="13"
                                fontWeight="700"
                            >
                                📐 フロア
                            </text>
                            <text x="304" y="86" textAnchor="middle" fill="#34A853" fontSize="10">
                                Floor
                            </text>

                            <text
                                x="304"
                                y="116"
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="11"
                                fontWeight="600"
                            >
                                10F / A棟
                            </text>
                            <line
                                x1="240"
                                y1="124"
                                x2="368"
                                y2="124"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                            <text x="240" y="140" fill="#64748b" fontSize="10">🏷 フロア名</text>
                            <text x="240" y="155" fill="#94a3b8" fontSize="10">10F</text>
                            <text x="240" y="172" fill="#64748b" fontSize="10">📌 セクション</text>
                            <text x="240" y="187" fill="#94a3b8" fontSize="10">A棟 / B棟</text>
                            <text x="240" y="204" fill="#64748b" fontSize="10">🏢 所属建物</text>
                            <text x="240" y="219" fill="#94a3b8" fontSize="10">tokyo-hq</text>

                            {/* Arrow 2&rarr;3 */}
                            <line
                                x1="386"
                                y1="160"
                                x2="416"
                                y2="160"
                                stroke="#4fc3f7"
                                strokeWidth="2"
                                markerEnd="url(#rarrow)"
                            />

                            {/* ===== COLUMN 3: リソース ===== */}
                            <rect
                                x="418"
                                y="50"
                                width="200"
                                height="220"
                                rx="14"
                                fill="rgba(251,188,5,0.07)"
                                stroke="#FBBC05"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="418"
                                y="50"
                                width="200"
                                height="38"
                                rx="14"
                                fill="rgba(251,188,5,0.2)"
                                stroke="#FBBC05"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="418"
                                y="74"
                                width="200"
                                height="16"
                                fill="rgba(251,188,5,0.2)"
                            />
                            <text
                                x="518"
                                y="73"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="13"
                                fontWeight="700"
                            >
                                📅 リソース
                            </text>
                            <text x="518" y="86" textAnchor="middle" fill="#FBBC05" fontSize="10">
                                Resource（予約対象）
                            </text>

                            <text
                                x="518"
                                y="116"
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="11"
                                fontWeight="600"
                            >
                                会議室 10A
                            </text>
                            <line
                                x1="434"
                                y1="124"
                                x2="602"
                                y2="124"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                            <text x="434" y="140" fill="#64748b" fontSize="10">🏢 種類</text>
                            <text x="434" y="155" fill="#94a3b8" fontSize="10">会議室 / 備品</text>
                            <text x="434" y="172" fill="#64748b" fontSize="10">👥 定員</text>
                            <text x="434" y="187" fill="#94a3b8" fontSize="10">12名</text>
                            <text x="434" y="204" fill="#64748b" fontSize="10">📅 カレンダーID</text>
                            <text x="434" y="219" fill="#94a3b8" fontSize="10">resource-id@...</text>
                            <text x="434" y="240" fill="#64748b" fontSize="10">🏢 所属フロア</text>
                            <text x="434" y="255" fill="#94a3b8" fontSize="10">10F</text>

                            {/* Arrow 3&rarr;4 */}
                            <line
                                x1="622"
                                y1="160"
                                x2="652"
                                y2="160"
                                stroke="#4fc3f7"
                                strokeWidth="2"
                                markerEnd="url(#rarrow)"
                            />

                            {/* ===== COLUMN 4: フィーチャー ===== */}
                            <rect
                                x="654"
                                y="50"
                                width="180"
                                height="220"
                                rx="14"
                                fill="rgba(167,139,250,0.07)"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="654"
                                y="50"
                                width="180"
                                height="38"
                                rx="14"
                                fill="rgba(167,139,250,0.2)"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                            />
                            <rect
                                x="654"
                                y="74"
                                width="180"
                                height="16"
                                fill="rgba(167,139,250,0.2)"
                            />
                            <text
                                x="744"
                                y="73"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="13"
                                fontWeight="700"
                            >
                                ⭐ フィーチャー
                            </text>
                            <text x="744" y="86" textAnchor="middle" fill="#a78bfa" fontSize="10">
                                Feature（設備）
                            </text>

                            <text
                                x="744"
                                y="116"
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="11"
                                fontWeight="600"
                            >
                                設備・備品
                            </text>
                            <line
                                x1="670"
                                y1="124"
                                x2="818"
                                y2="124"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                            <text x="670" y="145" fill="#94a3b8" fontSize="10">📺 大型モニター</text>
                            <text x="670" y="165" fill="#94a3b8" fontSize="10">📹 ビデオ会議 (Meet)</text>
                            <text x="670" y="185" fill="#94a3b8" fontSize="10">⌨ ホワイトボード</text>
                            <text x="670" y="205" fill="#94a3b8" fontSize="10">♿ バリアフリー</text>
                            <text x="670" y="225" fill="#94a3b8" fontSize="10">🔊 音響システム</text>

                            {/* Footer text */}
                            <text x="430" y="300" textAnchor="middle" fill="#64748b" fontSize="10">
                                階層構造により、カレンダーでの「建物ごと」「設備ごと」のフィルタリングが可能になる
                            </text>
                        </svg>
                    </div>
                </div>

                <div className="card">
                    <h3>リソース作成手順 — ステップバイステップ</h3>

                    <div className="steps">
                        <div className="step">
                            <div className="step-num">1</div>
                            <div className="step-body">
                                <strong>建物を登録</strong>管理コンソール &rarr;
                                <span className="term">ディレクトリ</span> &rarr;
                                <span className="term">建物、リソース</span> &rarr;
                                「建物」タブ &rarr; 「＋」で住所等の基本情報を入力
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">2</div>
                            <div className="step-body">
                                <strong>フィーチャーを定義（任意）</strong>「リソース」タブ &rarr;
                                「フィーチャーを管理」 &rarr; 組織で共通の設備名（例：モニター、WEBカメラ等）を登録
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">3</div>
                            <div className="step-body">
                                <strong>リソースを作成</strong>「リソース」タブ &rarr;
                                「＋」 &rarr; 種類、名前、所属建物、フロア、定員、フィーチャーを選択して作成
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">4</div>
                            <div className="step-body">
                                <strong>一括登録（オプション）</strong>リソースが 50
                                件以上ある場合は、「CSV 一括アップロード」を使用して効率的に作成する
                            </div>
                        </div>
                    </div>

                    <div className="callout warn">
                        <div className="callout-icon">⚠️</div>
                        <div>
                            <strong>リソース削除時の注意</strong><br />リソース（会議室等）を削除すると、そのリソースに関連付けられていた過去および将来のカレンダーの予約もすべて削除される。削除の前に慎重に検討すること。
                        </div>
                    </div>

                    <div className="sources">
                        <h4>📎 公式ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/1686462" target="_blank" rel="noopener noreferrer">↗ 建物とリソース</a>
                        <a href="https://support.google.com/a/answer/1033925" target="_blank" rel="noopener noreferrer">↗ リソースの一括追加</a>
                    </div>
                </div>

                <div
                    className="card"
                    style={{
                        borderColor: 'rgba(52, 211, 153, 0.2)',
                        background: 'rgba(52, 211, 153, 0.03)',
                    }}
                >
                    <h3>✦ セクション 1.5 ベストプラクティス総まとめ</h3>
                    <ul className="bp-list">
                        <li>
                            リソース名は検索しやすいフォーマットで統一する（例：<code>会議室A-10F（定員12名）</code>）
                        </li>
                        <li>
                            フィーチャーを標準化して全リソースに統一されたタグを付けることで、カレンダーの絞り込み検索を最大化する
                        </li>
                        <li>予約できる最大日数を設定し、遠い将来の「場所取り」による占有を防ぐ</li>
                        <li>
                            50以上のリソースを作成する場合は必ずCSV一括インポートを活用する（手動は非現実的）
                        </li>
                        <li>
                            建物の住所情報・緯度経度を正確に設定し、カレンダーのインテリジェントな提案機能（近い空き部屋の自動提案）を最大限活用する
                        </li>
                        <li>
                            役員会議室など特殊なリソースには「手動承認」権限を設定し、不適切な使用を防ぐ
                        </li>
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* CH6: 試験対策まとめ */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="ch6" className="chapter">
                <div className="section-header">
                    <div
                        className="section-icon"
                        style={{ background: 'rgba(79, 195, 247, 0.15)', color: '#4fc3f7' }}
                    >
                        📝
                    </div>
                    <div>
                        <h2>試験対策まとめ — 頻出パターンと最重要ポイント</h2>
                        <p>試験本番で確実に得点するための重要事項の総整理</p>
                    </div>
                </div>

                <div className="card">
                    <h3>🎯 試験頻出パターン 5選</h3>

                    <div style={{ marginBottom: '24px' }}>
                        <div
                            style={{
                                background: 'var(--surface2)',
                                borderLeft: '3px solid #4285f4',
                                borderRadius: '8px',
                                padding: '16px 20px',
                                marginBottom: '12px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: '1rem',
                                    color: 'var(--text-dim)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '6px',
                                }}
                            >
                                パターン① — 移行ツールの選定
                            </div>
                            <p
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '8px',
                                }}
                            >
                                「Microsoft
                                Exchange（オンプレミス、社員500名）からメール・カレンダー・連絡先を移行したい。最適なツールは？」
                            </p>
                            <div style={{ fontSize: '1rem' }}>
                                <span className="badge green">正解</span> 大規模・複雑な要件 &rarr;
                                <strong>Google Workspace Migrate</strong> / 標準的な移行 &rarr;
                                <strong>GWMME</strong> / シンプル &rarr;
                                <strong>データ移行サービス</strong><br /><span className="badge red">注意</span>
                                GCDSはメール移行ではなく<strong>ユーザー/グループ情報の同期</strong>ツール！
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'var(--surface2)',
                                borderLeft: '3px solid #34a853',
                                borderRadius: '8px',
                                padding: '16px 20px',
                                marginBottom: '12px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: '1rem',
                                    color: 'var(--text-dim)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '6px',
                                }}
                            >
                                パターン② — アカウント状態の選択
                            </div>
                            <p
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '8px',
                                }}
                            >
                                「退職者のアカウントを、法的要件で2年間データ保持が必要。コスト最小化したい。」
                            </p>
                            <div style={{ fontSize: '1rem' }}>
                                <span className="badge green">正解</span> 即時停止 &rarr; Drive所有権移転 &rarr;
                                <strong>Archived Userライセンスに変更</strong> +
                                Vaultで保持ルール設定<br /><span className="badge red">誤答</span>
                                削除する &rarr; 20日後にデータが消滅 / 通常ライセンスのまま停止 &rarr;
                                コストが高い
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'var(--surface2)',
                                borderLeft: '3px solid #fbbc05',
                                borderRadius: '8px',
                                padding: '16px 20px',
                                marginBottom: '12px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: '1rem',
                                    color: 'var(--text-dim)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '6px',
                                }}
                            >
                                パターン③ — OU 設計
                            </div>
                            <p
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '8px',
                                }}
                            >
                                「財務部門はDriveの外部共有を禁止、他は許可したい。最適なOU設計は？」
                            </p>
                            <div style={{ fontSize: '1rem' }}>
                                <span className="badge green">正解</span> ルート組織:
                                外部共有【許可】(デフォルト) &rarr; 財務部OU: 外部共有【禁止】(上書き)
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'var(--surface2)',
                                borderLeft: '3px solid #ea4335',
                                borderRadius: '8px',
                                padding: '16px 20px',
                                marginBottom: '12px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: '1rem',
                                    color: 'var(--text-dim)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '6px',
                                }}
                            >
                                パターン④ — グループタイプの選択
                            </div>
                            <p
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '8px',
                                }}
                            >
                                「support@example.com宛のメールをチームで管理。担当者割り当てと解決済み管理が必要。」
                            </p>
                            <div style={{ fontSize: '1rem' }}>
                                <span className="badge green">正解</span>
                                <strong>Collaborative Inbox</strong> &rarr;
                                メールの割り当て・ステータス管理ができる<br /><span
                                    className="badge red"
                                >誤答</span>
                                配信リスト &rarr; 全員に転送するだけで割り当て機能なし
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'var(--surface2)',
                                borderLeft: '3px solid #a78bfa',
                                borderRadius: '8px',
                                padding: '16px 20px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: '1rem',
                                    color: 'var(--text-dim)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '6px',
                                }}
                            >
                                パターン⑤ — ドメイン種別の選択
                            </div>
                            <p
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '8px',
                                }}
                            >
                                「example.com に加えて example.co.jp
                                も使いたい。既存ユーザーが両方で受信できるようにしたい。追加ライセンスコストは不要にしたい。」
                            </p>
                            <div style={{ fontSize: '1rem' }}>
                                <span className="badge green">正解</span>
                                <strong>ドメインエイリアス</strong>として example.co.jp を追加 &rarr;
                                追加ライセンス不要、既存ユーザーに自動付与<br /><span
                                    className="badge red"
                                >誤答</span>
                                セカンダリドメイン &rarr; 独立したユーザーが必要でライセンスコストが発生
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3>📋 最終確認チェックリスト</h3>

                    {/* Row 1: 1.1 */}
                    <div style={{ marginBottom: '14px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#4285f4',
                                    flexShrink: 0,
                                }}
                            ></div>
                            <h4
                                style={{
                                    color: '#4285f4',
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                }}
                            >
                                1.1 ユーザーライフサイクル
                            </h4>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '6px',
                                paddingLeft: '20px',
                            }}
                        >
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>GCDSの役割と同期方向（AD/LDAP&rarr;Google）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>GWMMEとデータ移行サービスの使い分け
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>停止・削除・アーカイブの違いを説明できる
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>削除後の復元可能期間は<strong style={{ color: '#4285f4' }}>20日</strong>
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>Drive所有権移転の制限（共有ドライブは対象外）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>SAML SSO の
                                SP-Initiated / IdP-Initiated の違い
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(66, 133, 244, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#4285f4', flexShrink: 0 }}>✓</span>アーカイブライセンスでコスト削減しつつデータ保持
                            </div>
                        </div>
                    </div>

                    {/* Row 2: 1.2 */}
                    <div style={{ marginBottom: '14px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#34a853',
                                    flexShrink: 0,
                                }}
                            ></div>
                            <h4
                                style={{
                                    color: '#34a853',
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                }}
                            >
                                1.2 組織部門（OU）
                            </h4>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '6px',
                                paddingLeft: '20px',
                            }}
                        >
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(52, 168, 83, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#34a853', flexShrink: 0 }}>✓</span>ポリシーは上位
                                OU から下位 OU へ<strong style={{ color: '#34a853' }}>自動継承</strong>される
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(52, 168, 83, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#34a853', flexShrink: 0 }}>✓</span>OUは「物理的な組織図」ではなく<strong style={{ color: '#34a853' }}>ポリシーの差異</strong>で設計する
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(52, 168, 83, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#34a853', flexShrink: 0 }}>✓</span>OU
                                階層は最大<strong style={{ color: '#34a853' }}>5階層以内</strong>を推奨（深すぎると管理困難）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(52, 168, 83, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#34a853', flexShrink: 0 }}>✓</span>ユーザーは常に<strong style={{ color: '#34a853' }}>1つのOUにのみ</strong>属せる（複数不可）
                            </div>
                        </div>
                    </div>

                    {/* Row 3: 1.3 */}
                    <div style={{ marginBottom: '14px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#fbbc05',
                                    flexShrink: 0,
                                }}
                            ></div>
                            <h4
                                style={{
                                    color: '#fbbc05',
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                }}
                            >
                                1.3 グループ管理
                            </h4>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '6px',
                                paddingLeft: '20px',
                            }}
                        >
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(251, 188, 5, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#fbbc05', flexShrink: 0 }}>✓</span>4タイプの使い分け（配信リスト / Collaborative Inbox / セキュリティ
                                / 動的）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(251, 188, 5, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#fbbc05', flexShrink: 0 }}>✓</span><strong style={{ color: '#fbbc05' }}>Collaborative Inbox</strong> =
                                担当者割り当て + 未解決/解決済みステータス管理
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(251, 188, 5, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#fbbc05', flexShrink: 0 }}>✓</span><strong style={{ color: '#fbbc05' }}>動的グループ</strong> は Enterprise
                                エディションまたは Cloud Identity Premium が必要
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(251, 188, 5, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#fbbc05', flexShrink: 0 }}>✓</span>セキュリティグループは<strong style={{ color: '#fbbc05' }}>一度設定すると通常グループに戻せない</strong>（不可逆）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(251, 188, 5, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#fbbc05', flexShrink: 0 }}>✓</span>設定グループ（アクセスグループ）の設定は<strong
                                    style={{ color: '#fbbc05' }}
                                >OU設定より優先</strong>される
                            </div>
                        </div>
                    </div>

                    {/* Row 4: 1.4 */}
                    <div style={{ marginBottom: '14px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#ea4335',
                                    flexShrink: 0,
                                }}
                            ></div>
                            <h4
                                style={{
                                    color: '#ea4335',
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                }}
                            >
                                1.4 ドメイン管理
                            </h4>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '6px',
                                paddingLeft: '20px',
                            }}
                        >
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(234, 67, 53, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#ea4335', flexShrink: 0 }}>✓</span><strong style={{ color: '#ea4335' }}>ドメインエイリアス</strong> =
                                無料・既存ユーザーに自動付与（受信箱は共有）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(234, 67, 53, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#ea4335', flexShrink: 0 }}>✓</span><strong style={{ color: '#ea4335' }}>セカンダリドメイン</strong> =
                                独立ユーザー作成可・ライセンス追加必要
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(234, 67, 53, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#ea4335', flexShrink: 0 }}>✓</span>ドメイン確認は
                                <strong style={{ color: '#ea4335' }}>TXT レコード</strong>
                                の追加が推奨（CNAME より影響が小さい）
                            </div>
                        </div>
                    </div>

                    {/* Row 5: 1.5 */}
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#a78bfa',
                                    flexShrink: 0,
                                }}
                            ></div>
                            <h4
                                style={{
                                    color: '#a78bfa',
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                }}
                            >
                                1.5 建物・リソース
                            </h4>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '6px',
                                paddingLeft: '20px',
                            }}
                        >
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(167, 139, 250, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#a78bfa', flexShrink: 0 }}>✓</span><strong style={{ color: '#a78bfa' }}>建物 &rarr; フロア &rarr; リソース &rarr; フィーチャー</strong>
                                の4階層構造
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(167, 139, 250, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#a78bfa', flexShrink: 0 }}>✓</span>50件以上のリソース作成は<strong style={{ color: '#a78bfa' }}>CSV 一括インポート</strong>を活用
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(167, 139, 250, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#a78bfa', flexShrink: 0 }}>✓</span>予約権限は<strong style={{ color: '#a78bfa' }}>4レベル</strong>（無制限・自動承認・手動承認・オーナーのみ）
                            </div>
                            <div
                                style={{
                                    background: 'var(--surface2)',
                                    border: '1px solid rgba(167, 139, 250, 0.12)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ color: '#a78bfa', flexShrink: 0 }}>✓</span>フィーチャーを標準化してカレンダーの<strong style={{ color: '#a78bfa' }}>絞り込み検索</strong>を最適化
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="card"
                    style={{
                        background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.08), rgba(52, 168, 83, 0.05))',
                        borderColor: 'rgba(66, 133, 244, 0.25)',
                    }}
                >
                    <h3 style={{ color: 'var(--accent)' }}>🔗 公式試験情報リソース</h3>
                    <div className="sources">
                        <h4>📎 認定試験公式ページ</h4>
                        <a
                            href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator"
                            target="_blank" rel="noopener noreferrer"
                        >↗ AGWA 認定試験公式ページ</a>
                        <a
                            href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                            target="_blank" rel="noopener noreferrer"
                        >↗ 試験ガイド（公式PDF）</a>
                        <a href="https://support.google.com/a" target="_blank" rel="noopener noreferrer">↗ Google Workspace Admin Help</a>
                        <a href="https://www.cloudskillsboost.google/paths/24" target="_blank" rel="noopener noreferrer">↗ Cloud Skills Boost 学習パス</a>
                    </div>
                    <div className="sources" style={{ marginTop: '12px' }}>
                        <h4>📎 Section 1 参考ドキュメント</h4>
                        <a href="https://support.google.com/a/answer/106368" target="_blank" rel="noopener noreferrer">↗ GCDS 概要</a>
                        <a href="https://support.google.com/a/answer/6374360" target="_blank" rel="noopener noreferrer">↗ データ移行サービス</a>
                        <a href="https://support.google.com/a/answer/60224" target="_blank" rel="noopener noreferrer">↗ SAML SSO</a>
                        <a href="https://support.google.com/a/answer/33312" target="_blank" rel="noopener noreferrer">↗ アカウント停止・削除</a>
                        <a href="https://support.google.com/a/answer/9032727" target="_blank" rel="noopener noreferrer">↗ アーカイブユーザー</a>
                        <a href="https://support.google.com/a/answer/182537" target="_blank" rel="noopener noreferrer">↗ OU の管理</a>
                        <a href="https://support.google.com/a/answer/33329" target="_blank" rel="noopener noreferrer">↗ グループの管理</a>
                        <a href="https://support.google.com/a/answer/11192679" target="_blank" rel="noopener noreferrer">↗ 動的グループ</a>
                        <a href="https://support.google.com/a/answer/9008873" target="_blank" rel="noopener noreferrer">↗ ドメインの追加</a>
                        <a href="https://support.google.com/a/answer/7502379" target="_blank" rel="noopener noreferrer">↗ ドメインエイリアス</a>
                        <a href="https://support.google.com/a/answer/1686462" target="_blank" rel="noopener noreferrer">↗ 建物とリソース</a>
                        <a
                            href="https://knowledge.workspace.google.com/admin/security/security-checklist-for-medium-and-large-businesses-100-users"
                            target="_blank" rel="noopener noreferrer"
                        >↗ セキュリティチェックリスト</a>
                    </div>
                </div>
            </section>
        </main>

        <footer>
            <p>Google Associate Workspace Administrator (AGWA) Section 1 完全解説ガイド</p>
            <p style={{ marginTop: '6px' }}>
                本資料は学習目的で作成されたものです。最新情報は
                <a href="https://support.google.com/a" target="_blank" rel="noopener noreferrer">公式ヘルプセンター</a> および
                <a
                    href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator"
                    target="_blank" rel="noopener noreferrer"
                >認定試験公式ページ</a>
                を参照してください。
            </p>
        </footer>
    </>
    );
}
