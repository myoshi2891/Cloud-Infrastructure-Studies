import type { Metadata } from 'next';
import './agwa.css';
import ScrollSpy from './ScrollSpy';

export const metadata: Metadata = {
    title: 'AGWA Guide',
    description: 'Associate Google Workspace Administrator 完全試験対策ガイド',
};

export default function AgwaPage() {
    return (
        <>
            <div className="layout">
                {/*  SIDEBAR  */}
                <nav className="sidebar">
                    <div className="sidebar-brand">
                        <div className="logo">
                            AGWA 試験対策
                            <br />
                            完全ガイド
                        </div>
                        <div className="sub">Google Workspace Admin</div>
                    </div>
                    <div className="sidebar-section">
                        <div className="sidebar-section-label">出題ドメイン</div>
                        <a href="#s1" className="sidebar-link">
                            <span className="num">20%</span>ユーザー・ドメイン・ディレクトリ
                        </a>
                        <a href="#s2" className="sidebar-link">
                            <span className="num">23%</span>コアWorkspaceサービス
                        </a>
                        <a href="#s3" className="sidebar-link">
                            <span className="num">15%</span>データガバナンス・コンプライアンス
                        </a>
                        <a href="#s4" className="sidebar-link">
                            <span className="num">20%</span>セキュリティ・アクセス制御
                        </a>
                        <a href="#s5" className="sidebar-link">
                            <span className="num">10%</span>ブラウザ・エンドポイント
                        </a>
                        <a href="#s6" className="sidebar-link">
                            <span className="num">13%</span>監視・トラブルシューティング
                        </a>
                    </div>
                    <div className="sidebar-section">
                        <div className="sidebar-section-label">クイックリンク</div>
                        <a
                            href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator"
                            target="_blank"
                            className="sidebar-link"
                        >
                            公式試験ページ
                        </a>
                        <a
                            href="https://support.google.com/a"
                            target="_blank"
                            className="sidebar-link"
                        >
                            Admin Help Center
                        </a>
                        <a
                            href="https://www.cloudskillsboost.google/paths/24"
                            target="_blank"
                            className="sidebar-link"
                        >
                            学習パス (Skills Boost)
                        </a>
                        <a
                            href="https://www.google.com/appsstatus"
                            target="_blank"
                            className="sidebar-link"
                        >
                            ステータスダッシュボード
                        </a>
                    </div>
                </nav>

                {/*  MAIN  */}
                <main className="main">
                    {/*  Hero  */}
                    <div className="hero" id="top">
                        <div className="hero-badge">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Google Workspace Administrator 認定資格
                        </div>
                        <h1>
                            Associate Google Workspace
                            <br />
                            <em>Administrator</em> 完全試験対策
                        </h1>
                        <p className="hero-desc">
                            初学者からスーパー管理者まで —
                            試験の全出題範囲を網羅した詳細解説ガイド。各機能の仕組み、設定手順、ベストプラクティス、公式ソースを体系的にまとめました。
                        </p>
                        <div className="hero-meta">
                            <div className="meta-pill">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                試験時間 <strong>2時間</strong>
                            </div>
                            <div className="meta-pill">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                </svg>
                                <strong>50〜60問</strong> 選択式
                            </div>
                            <div className="meta-pill">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                受験料 <strong>$125</strong>
                            </div>
                            <div className="meta-pill">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                有効期限 <strong>3年間</strong>
                            </div>
                            <div className="meta-pill">
                                推奨経験 <strong>6ヶ月以上</strong>
                            </div>
                        </div>
                    </div>

                    {/*  Domain grid  */}
                    <h2
                        style={{
                            fontFamily: "var(--font-display, 'DM Serif Display', Georgia, serif)",
                            fontSize: '20px',
                            marginBottom: '1rem',
                        }}
                    >
                        出題ドメイン一覧
                    </h2>
                    <div className="domain-grid">
                        <a href="#s1" className="domain-card">
                            <div className="pct c1">20%</div>
                            <div className="dtitle">Section 1</div>
                            <div className="dsub">ユーザー・ドメイン・ディレクトリ管理</div>
                            <div className="pct-bar">
                                <div
                                    className="pct-fill"
                                    style={{ width: '20%', background: '#1a6b4a' }}
                                ></div>
                            </div>
                        </a>
                        <a href="#s2" className="domain-card">
                            <div className="pct c2">23%</div>
                            <div className="dtitle">Section 2</div>
                            <div className="dsub">コアWorkspaceサービス管理</div>
                            <div className="pct-bar">
                                <div
                                    className="pct-fill"
                                    style={{ width: '23%', background: '#1d5fa8' }}
                                ></div>
                            </div>
                        </a>
                        <a href="#s3" className="domain-card">
                            <div className="pct c3">15%</div>
                            <div className="dtitle">Section 3</div>
                            <div className="dsub">データガバナンス・コンプライアンス</div>
                            <div className="pct-bar">
                                <div
                                    className="pct-fill"
                                    style={{ width: '15%', background: '#b85c00' }}
                                ></div>
                            </div>
                        </a>
                        <a href="#s4" className="domain-card">
                            <div className="pct c4">20%</div>
                            <div className="dtitle">Section 4</div>
                            <div className="dsub">セキュリティ・アクセス制御</div>
                            <div className="pct-bar">
                                <div
                                    className="pct-fill"
                                    style={{ width: '20%', background: '#5c3fa8' }}
                                ></div>
                            </div>
                        </a>
                        <a href="#s5" className="domain-card">
                            <div className="pct c5">10%</div>
                            <div className="dtitle">Section 5</div>
                            <div className="dsub">ブラウザ・エンドポイント管理</div>
                            <div className="pct-bar">
                                <div
                                    className="pct-fill"
                                    style={{ width: '10%', background: '#c0392b' }}
                                ></div>
                            </div>
                        </a>
                        <a href="#s6" className="domain-card">
                            <div className="pct c6">13%</div>
                            <div className="dtitle">Section 6</div>
                            <div className="dsub">監視・トラブルシューティング</div>
                            <div className="pct-bar">
                                <div
                                    className="pct-fill"
                                    style={{ width: '13%', background: '#7a6200' }}
                                ></div>
                            </div>
                        </a>
                    </div>

                    {/*  ═══ SECTION 1 ═══  */}
                    <div className="section" id="s1">
                        <div className="section-header">
                            <div className="section-num c1">S1</div>
                            <div className="section-header-text">
                                <h2>ユーザーアカウント・ドメイン・ディレクトリの管理</h2>
                                <div className="weight">配点比率 約20% — 試験頻出度: 高</div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>1-1. ユーザーライフサイクル管理
                            </h3>
                            <p>
                                ユーザーアカウントは入社から退職まで一貫したライフサイクル管理が必要です。
                            </p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>操作</th>
                                            <th>用途</th>
                                            <th>データ保持</th>
                                            <th>ライセンス</th>
                                            <th>復元可否</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>停止 (Suspend)</strong>
                                            </td>
                                            <td>一時的なアクセス禁止</td>
                                            <td>保持</td>
                                            <td>消費したまま</td>
                                            <td>いつでも可</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>削除 (Delete)</strong>
                                            </td>
                                            <td>アカウントの完全削除</td>
                                            <td>削除される</td>
                                            <td>解放</td>
                                            <td>20日以内のみ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>復元 (Restore)</strong>
                                            </td>
                                            <td>削除アカウントの復元</td>
                                            <td>復元される</td>
                                            <td>再消費</td>
                                            <td>削除後20日以内</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>アーカイブ (Archive)</strong>
                                            </td>
                                            <td>退職者データの長期保存</td>
                                            <td>保持</td>
                                            <td>安価なアーカイブライセンス</td>
                                            <td>通常ライセンスで復活</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout best-practice">
                                <div className="callout-title">
                                    ベストプラクティス — 退職者処理の標準フロー
                                </div>
                                <strong>①</strong> アカウントの停止（即時）→ <strong>②</strong>{' '}
                                Drive データの所有権を別ユーザーへ移転 →<strong>③</strong>{' '}
                                ライセンスをアーカイブに変更（コスト削減）→
                                <strong>④</strong> 一定期間後にアカウントを完全削除
                            </div>
                            <div className="callout warning">
                                <div className="callout-title">重要な注意点</div>
                                削除後20日を過ぎると完全に復元不可になります。重要なデータは削除前に必ず所有権移転またはバックアップを実施してください。
                            </div>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>移行元環境</th>
                                            <th>推奨ツール</th>
                                            <th>対応データ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Microsoft Exchange / Outlook</strong>
                                            </td>
                                            <td>GWMME</td>
                                            <td>メール・カレンダー・連絡先</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>他のGoogle Workspaceドメイン</strong>
                                            </td>
                                            <td>データ移行サービス (Admin Console)</td>
                                            <td>Gmail・カレンダー・Drive</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>IMAP対応メールサーバー</strong>
                                            </td>
                                            <td>IMAP移行 (Admin Console)</td>
                                            <td>メールのみ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>大規模・カスタム要件</strong>
                                            </td>
                                            <td>Google Workspace Migrate</td>
                                            <td>メール・Drive・サイト</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>外部LDAP/Active Directory</strong>
                                            </td>
                                            <td>GCDS (Google Cloud Directory Sync)</td>
                                            <td>ユーザー・グループ属性</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout tip">
                                <div className="callout-title">SAML SSO 設定の要点</div>
                                <strong>SP-initiated SSO</strong>（Google側からログイン開始）と
                                <strong>IdP-initiated SSO</strong>
                                （IdPダッシュボードからログイン開始）の2パターンがある。属性マッピングでは
                                <code>email</code> を Google の主要識別子として必ず設定すること。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/106368"
                                    target="_blank"
                                >
                                    GCDS（Google Cloud Directory Sync）概要
                                </a>
                                <a href="https://support.google.com/a/answer/60224" target="_blank">
                                    SAML シングルサインオンの設定
                                </a>
                            </div>
                        </div>

                        {/*  1-2 OU  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>1-2. 組織部門（OU）の設計と管理
                            </h3>
                            <p>OUにポリシーを設定すると配下の全リソースに継承されます。</p>
                            <h4>① OU階層の設計例</h4>

                            {/*  DIAGRAM 1: OU Hierarchy Tree  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 780 320"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    {/*  Background  */}
                                    <rect
                                        width="780"
                                        height="320"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Root node  */}
                                    <rect
                                        x="290"
                                        y="18"
                                        width="200"
                                        height="38"
                                        rx="8"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="390"
                                        y="42"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="13"
                                    >
                                        example.com（組織ルート）
                                    </text>
                                    {/*  Root connectors  */}
                                    <line
                                        x1="390"
                                        y1="56"
                                        x2="390"
                                        y2="72"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="155"
                                        y1="72"
                                        x2="635"
                                        y2="72"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="155"
                                        y1="72"
                                        x2="155"
                                        y2="90"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="390"
                                        y1="72"
                                        x2="390"
                                        y2="90"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="635"
                                        y1="72"
                                        x2="635"
                                        y2="90"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    {/*  Level 1: 本社  */}
                                    <rect
                                        x="65"
                                        y="90"
                                        width="180"
                                        height="34"
                                        rx="7"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="155"
                                        y="112"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                    >
                                        🏢 本社
                                    </text>
                                    {/*  Level 1: 支社A  */}
                                    <rect
                                        x="300"
                                        y="90"
                                        width="180"
                                        height="34"
                                        rx="7"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="390"
                                        y="112"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                    >
                                        🏢 支社A
                                    </text>
                                    {/*  Level 1: 特殊アカウント  */}
                                    <rect
                                        x="540"
                                        y="90"
                                        width="190"
                                        height="34"
                                        rx="7"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="var(--color-tip)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="635"
                                        y="112"
                                        textAnchor="middle"
                                        fill="var(--color-tip)"
                                        fontWeight="600"
                                    >
                                        ⚙️ 特殊アカウント
                                    </text>
                                    {/*  本社 connectors  */}
                                    <line
                                        x1="155"
                                        y1="124"
                                        x2="155"
                                        y2="144"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="75"
                                        y1="144"
                                        x2="240"
                                        y2="144"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="75"
                                        y1="144"
                                        x2="75"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="155"
                                        y1="144"
                                        x2="155"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="240"
                                        y1="144"
                                        x2="240"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    {/*  本社 children  */}
                                    <rect
                                        x="22"
                                        y="162"
                                        width="106"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="75"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        📊 営業部
                                    </text>
                                    <rect
                                        x="102"
                                        y="162"
                                        width="106"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="155"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        💻 開発部
                                    </text>
                                    <rect
                                        x="182"
                                        y="162"
                                        width="106"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="235"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        📋 管理部
                                    </text>
                                    {/*  支社A connectors  */}
                                    <line
                                        x1="390"
                                        y1="124"
                                        x2="390"
                                        y2="144"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="335"
                                        y1="144"
                                        x2="450"
                                        y2="144"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="335"
                                        y1="144"
                                        x2="335"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="450"
                                        y1="144"
                                        x2="450"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    {/*  支社A children  */}
                                    <rect
                                        x="282"
                                        y="162"
                                        width="106"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="335"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        📊 営業部
                                    </text>
                                    <rect
                                        x="395"
                                        y="162"
                                        width="106"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="448"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        💻 開発部
                                    </text>
                                    {/*  特殊 connectors  */}
                                    <line
                                        x1="635"
                                        y1="124"
                                        x2="635"
                                        y2="144"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="575"
                                        y1="144"
                                        x2="700"
                                        y2="144"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="575"
                                        y1="144"
                                        x2="575"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="700"
                                        y1="144"
                                        x2="700"
                                        y2="162"
                                        stroke="#aaa"
                                        strokeWidth="1.5"
                                    />
                                    {/*  特殊 children  */}
                                    <rect
                                        x="516"
                                        y="162"
                                        width="120"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="#c8b8f0"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="576"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-tip)"
                                        fontSize="12"
                                    >
                                        🤖 サービスアカウント
                                    </text>
                                    <rect
                                        x="640"
                                        y="162"
                                        width="120"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="#c8b8f0"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="700"
                                        y="182"
                                        textAnchor="middle"
                                        fill="var(--color-tip)"
                                        fontSize="12"
                                    >
                                        🏠 会議室リソース
                                    </text>
                                    {/*  Policy arrow  */}
                                    <rect
                                        x="200"
                                        y="240"
                                        width="380"
                                        height="54"
                                        rx="8"
                                        fill="rgba(var(--color-warning-rgb), 0.15)"
                                        stroke="#f0c08a"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="390"
                                        y="261"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ⬇️ ポリシーの継承方向
                                    </text>
                                    <text
                                        x="390"
                                        y="280"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="12"
                                    >
                                        上位 OU のポリシーは配下の全ノードに自動適用される
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">OU設計のベストプラクティス</div>
                                <ul
                                    style={{
                                        margin: '0',
                                        paddingLeft: '1.25rem',
                                    }}
                                >
                                    <li>
                                        OU の深さは <strong>5階層以内</strong> に抑える
                                    </li>
                                    <li>
                                        「部署（機能）」ではなく
                                        <strong>「ポリシー」ベース</strong> で設計する
                                    </li>
                                    <li>特殊アカウント（会議室等）は専用 OU に分離</li>
                                </ul>
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/182537"
                                    target="_blank"
                                >
                                    組織部門（OU）の作成と管理
                                </a>
                            </div>
                        </div>

                        {/*  1-3 Groups  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>1-3. グループの管理
                            </h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>グループタイプ</th>
                                            <th>主な用途</th>
                                            <th>特徴</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>配信リスト</strong>
                                            </td>
                                            <td>メール一斉送信</td>
                                            <td>宛先として指定するだけで全メンバーに届く</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Collaborative Inbox</strong>
                                            </td>
                                            <td>チームでのメール対応</td>
                                            <td>メールの担当者割り当てとステータス管理が可能</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>セキュリティグループ</strong>
                                            </td>
                                            <td>IAM・アクセス制御</td>
                                            <td>Google Cloud リソースへのアクセス制御に使用</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>動的グループ</strong>
                                            </td>
                                            <td>自動メンバー管理</td>
                                            <td>
                                                属性（部署、役職、拠点）条件でメンバーを自動追加
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4>② 動的グループの設定例</h4>

                            {/*  DIAGRAM 2: Dynamic Group  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="200"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Condition box  */}
                                    <rect
                                        x="20"
                                        y="30"
                                        width="280"
                                        height="80"
                                        rx="8"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="var(--color-primary)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="160"
                                        y="54"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        🔍 フィルター条件
                                    </text>
                                    <text
                                        x="160"
                                        y="76"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="12"
                                    >
                                        department = &quot;Engineering&quot;
                                    </text>
                                    <text
                                        x="160"
                                        y="96"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="12"
                                    >
                                        AND location = &quot;Tokyo&quot;
                                    </text>
                                    {/*  Arrow right  */}
                                    <polygon points="316,70 316,58 340,70 316,82" fill="var(--color-primary)" />
                                    <line
                                        x1="300"
                                        y1="70"
                                        x2="316"
                                        y2="70"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                    />
                                    {/*  Auto sync box  */}
                                    <rect
                                        x="340"
                                        y="30"
                                        width="160"
                                        height="80"
                                        rx="8"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="420"
                                        y="64"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ⚙️ 自動同期
                                    </text>
                                    <text
                                        x="420"
                                        y="84"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        人事システムの
                                    </text>
                                    <text
                                        x="420"
                                        y="100"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        属性変更と連動
                                    </text>
                                    {/*  Arrow right  */}
                                    <polygon points="516,70 516,58 540,70 516,82" fill="var(--color-theme-agwa-fg)" />
                                    <line
                                        x1="500"
                                        y1="70"
                                        x2="516"
                                        y2="70"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="2"
                                    />
                                    {/*  Group result  */}
                                    <rect
                                        x="540"
                                        y="20"
                                        width="178"
                                        height="100"
                                        rx="8"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="629"
                                        y="45"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        👥 グループメンバー
                                    </text>
                                    <text
                                        x="629"
                                        y="65"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        Yamada (Eng, Tokyo) ✅
                                    </text>
                                    <text
                                        x="629"
                                        y="82"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        Tanaka (Eng, Tokyo) ✅
                                    </text>
                                    <text
                                        x="629"
                                        y="99"
                                        textAnchor="middle"
                                        fill="var(--color-muted)"
                                        fontSize="12"
                                    >
                                        Sato (Sales, Tokyo) ✗
                                    </text>
                                    {/*  Bottom note  */}
                                    <rect
                                        x="20"
                                        y="140"
                                        width="700"
                                        height="42"
                                        rx="7"
                                        fill="rgba(var(--color-warning-rgb), 0.15)"
                                        stroke="#f0c08a"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="370"
                                        y="158"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="12"
                                        fontWeight="600"
                                    >
                                        💡
                                        人事異動で属性が変更されると、次回同期時に自動でグループへの追加・削除が行われる
                                    </text>
                                    <text
                                        x="370"
                                        y="174"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        管理者が手動でメンバーを操作する必要なし —
                                        ミスや漏れを根本的に防止
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">
                                    グループ管理のベストプラクティス
                                </div>
                                大規模組織では<strong>動的グループ</strong>
                                を活用し、人事異動時のメンバー管理を自動化する。外部ユーザーへのグループアクセスは業務上の必要性が確認できたものに限定する。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a href="https://support.google.com/a/answer/33329" target="_blank">
                                    グループの作成と管理
                                </a>
                                <a
                                    href="https://support.google.com/a/answer/10427204"
                                    target="_blank"
                                >
                                    動的グループの設定
                                </a>
                            </div>
                        </div>

                        {/*  1-4 Domain  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>1-4. ドメインの管理
                            </h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>種別</th>
                                            <th>説明</th>
                                            <th>用途</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>プライマリドメイン</strong>
                                            </td>
                                            <td>最初に登録したドメイン</td>
                                            <td>管理の基準となるドメイン</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>セカンダリドメイン</strong>
                                            </td>
                                            <td>追加登録したドメイン</td>
                                            <td>別ブランドや地域ごとのメールアドレス</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>ドメインエイリアス</strong>
                                            </td>
                                            <td>既存ドメインへの別名</td>
                                            <td>
                                                @example.jp を @example.com のエイリアスとして設定
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout best-practice">
                                <div className="callout-title">
                                    ドメイン確認のベストプラクティス
                                </div>
                                ドメイン確認には<strong>TXTレコード方式</strong>
                                を推奨。CNAME方式はWebサーバーの設定と干渉する場合があるため避ける。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/9008873"
                                    target="_blank"
                                >
                                    ドメインの追加と確認
                                </a>
                            </div>
                        </div>

                        {/*  1-5 Resources  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>1-5. 建物・リソースカレンダーの管理
                            </h3>
                            <h4>③ リソース作成の階層</h4>

                            {/*  DIAGRAM 3: Resource Hierarchy  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 720 130"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="720"
                                        height="130"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Step 1  */}
                                    <rect
                                        x="20"
                                        y="20"
                                        width="180"
                                        height="70"
                                        rx="8"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="110"
                                        y="48"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="22"
                                    >
                                        🏢
                                    </text>
                                    <text
                                        x="110"
                                        y="68"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="13"
                                    >
                                        建物（Building）
                                    </text>
                                    <text
                                        x="110"
                                        y="84"
                                        textAnchor="middle"
                                        fill="#c8f0dc"
                                        fontSize="11"
                                    >
                                        例：東京本社
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="211,55 211,45 228,55 211,65" fill="var(--color-theme-agwa-fg)" />
                                    <line
                                        x1="200"
                                        y1="55"
                                        x2="211"
                                        y2="55"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 2  */}
                                    <rect
                                        x="228"
                                        y="20"
                                        width="180"
                                        height="70"
                                        rx="8"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="318"
                                        y="48"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="22"
                                    >
                                        🔢
                                    </text>
                                    <text
                                        x="318"
                                        y="68"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="13"
                                    >
                                        フロア（Floor）
                                    </text>
                                    <text
                                        x="318"
                                        y="84"
                                        textAnchor="middle"
                                        fill="#c0d8f8"
                                        fontSize="11"
                                    >
                                        例：3F
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="419,55 419,45 436,55 419,65" fill="var(--color-primary)" />
                                    <line
                                        x1="408"
                                        y1="55"
                                        x2="419"
                                        y2="55"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 3  */}
                                    <rect
                                        x="436"
                                        y="20"
                                        width="264"
                                        height="70"
                                        rx="8"
                                        fill="var(--color-tip)"
                                        stroke="none"
                                    />
                                    <text
                                        x="568"
                                        y="48"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="22"
                                    >
                                        📅
                                    </text>
                                    <text
                                        x="568"
                                        y="68"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="13"
                                    >
                                        リソース（Room/Equipment）
                                    </text>
                                    <text
                                        x="568"
                                        y="84"
                                        textAnchor="middle"
                                        fill="#d8ccf8"
                                        fontSize="11"
                                    >
                                        例：会議室A（定員10名, TV会議設備）
                                    </text>
                                    {/*  Bottom label  */}
                                    <text
                                        x="360"
                                        y="118"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        Admin コンソール → ディレクトリ → 建物とリソース の順に作成
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">
                                    リソース管理のベストプラクティス
                                </div>
                                リソース名には検索しやすいキーワードを含める（例:
                                <strong>東京-3F-会議室A-定員10名</strong>）。大量登録は
                                <code>gam</code> ツールや CSV インポートで一括作成が効率的。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/1686462"
                                    target="_blank"
                                >
                                    カレンダーリソースの管理
                                </a>
                            </div>
                        </div>

                        <a href="#top" className="back-top">
                            ↑ トップに戻る
                        </a>
                    </div>

                    {/*  ═══ SECTION 2 ═══  */}
                    <div className="section" id="s2">
                        <div className="section-header">
                            <div className="section-num c2">S2</div>
                            <div className="section-header-text">
                                <h2>コアWorkspaceサービスの管理</h2>
                                <div className="weight">配点比率 約23% — 最大配点ドメイン</div>
                            </div>
                        </div>

                        {/*  2-1 Gmail  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>2-1. Gmailの設定と管理
                            </h3>
                            <p>
                                Gmailの管理では、メールセキュリティの3大設定（SPF/DKIM/DMARC）の理解が試験で最も頻出です。
                            </p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>設定</th>
                                            <th>フルネーム</th>
                                            <th>目的</th>
                                            <th>実装場所</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>SPF</strong>
                                            </td>
                                            <td>Sender Policy Framework</td>
                                            <td>
                                                自ドメインから送信を許可するIPアドレスを宣言。なりすまし送信を防止
                                            </td>
                                            <td>DNS TXTレコード</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>DKIM</strong>
                                            </td>
                                            <td>DomainKeys Identified Mail</td>
                                            <td>送信メールに電子署名を付与し、改ざんを防止</td>
                                            <td>Admin コンソール + DNS</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>DMARC</strong>
                                            </td>
                                            <td>Domain-based Message Authentication</td>
                                            <td>SPF/DKIMの結果に基づくメール処理ポリシーを定義</td>
                                            <td>DNS TXTレコード</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>フィッシング対策</strong>
                                            </td>
                                            <td>—</td>
                                            <td>
                                                不審なリンクの事前スキャン、添付ファイルのサンドボックス分析
                                            </td>
                                            <td>Admin コンソール</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4>④ SPF レコードの構造</h4>

                            {/*  DIAGRAM 4: SPF Record  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 170"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="170"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Record display  */}
                                    <rect
                                        x="20"
                                        y="18"
                                        width="700"
                                        height="36"
                                        rx="6"
                                        fill="#1a1916"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="42"
                                        textAnchor="middle"
                                        fill="#50fa7b"
                                        fontFamily="'Courier New',monospace"
                                        fontSize="14"
                                        letterSpacing="0.5"
                                    >
                                        v=spf1 include:_spf.google.com ~all
                                    </text>
                                    {/*  Annotations  */}
                                    {/*  v=spf1  */}
                                    <line
                                        x1="80"
                                        y1="54"
                                        x2="80"
                                        y2="72"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                        strokeDasharray="4,3"
                                    />
                                    <rect
                                        x="20"
                                        y="72"
                                        width="120"
                                        height="48"
                                        rx="6"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="80"
                                        y="93"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        v=spf1
                                    </text>
                                    <text
                                        x="80"
                                        y="110"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        SPFバージョン宣言
                                    </text>
                                    {/*  include  */}
                                    <line
                                        x1="300"
                                        y1="54"
                                        x2="300"
                                        y2="72"
                                        stroke="var(--color-primary)"
                                        strokeWidth="1.5"
                                        strokeDasharray="4,3"
                                    />
                                    <rect
                                        x="200"
                                        y="72"
                                        width="200"
                                        height="48"
                                        rx="6"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="var(--color-primary)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="300"
                                        y="93"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        include:_spf.google.com
                                    </text>
                                    <text
                                        x="300"
                                        y="110"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="11"
                                    >
                                        GmailのIPを許可リストに含める
                                    </text>
                                    {/*  ~all / -all  */}
                                    <line
                                        x1="608"
                                        y1="54"
                                        x2="608"
                                        y2="72"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                        strokeDasharray="4,3"
                                    />
                                    <rect
                                        x="480"
                                        y="72"
                                        width="256"
                                        height="48"
                                        rx="6"
                                        fill="rgba(var(--color-warning-rgb), 0.1)"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="608"
                                        y="90"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ~all（ソフトフェイル）
                                    </text>
                                    <text
                                        x="608"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        -all（ハードフェイル）= より厳格
                                    </text>
                                    <text
                                        x="608"
                                        y="120"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        それ以外のIPは拒否/隔離
                                    </text>
                                    {/*  Recommendation  */}
                                    <rect
                                        x="20"
                                        y="135"
                                        width="700"
                                        height="26"
                                        rx="6"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="#b8dfc9"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="370"
                                        y="153"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="12"
                                    >
                                        ✅ ベストプラクティス:
                                        本番環境では「-all」（ハードフェイル）を使用してなりすましを完全ブロック
                                    </text>
                                </svg>
                            </div>

                            <h4>⑤ DMARC ポリシーの段階的強化</h4>

                            {/*  DIAGRAM 5: DMARC Stages  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 160"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="160"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Step 1: none  */}
                                    <rect
                                        x="20"
                                        y="24"
                                        width="210"
                                        height="96"
                                        rx="8"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="var(--color-primary)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="125"
                                        y="50"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="18"
                                    >
                                        🔍
                                    </text>
                                    <text
                                        x="125"
                                        y="72"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontWeight="600"
                                    >
                                        Step 1: p=none
                                    </text>
                                    <text
                                        x="125"
                                        y="90"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="11"
                                    >
                                        監視のみ
                                    </text>
                                    <text
                                        x="125"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="11"
                                    >
                                        レポートを受信・分析
                                    </text>
                                    <text
                                        x="125"
                                        y="114"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        （数週間〜数ヶ月）
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="242,72 242,62 260,72 242,82" fill="var(--color-warning)" />
                                    <line
                                        x1="230"
                                        y1="72"
                                        x2="242"
                                        y2="72"
                                        stroke="var(--color-warning)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 2: quarantine  */}
                                    <rect
                                        x="260"
                                        y="24"
                                        width="220"
                                        height="96"
                                        rx="8"
                                        fill="rgba(var(--color-warning-rgb), 0.1)"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="370"
                                        y="50"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="18"
                                    >
                                        🚧
                                    </text>
                                    <text
                                        x="370"
                                        y="72"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                    >
                                        Step 2: p=quarantine
                                    </text>
                                    <text
                                        x="370"
                                        y="90"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        認証失敗メールを隔離
                                    </text>
                                    <text
                                        x="370"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        迷惑メールフォルダへ
                                    </text>
                                    <text
                                        x="370"
                                        y="114"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        （誤検知なければ次へ）
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="492,72 492,62 510,72 492,82" fill="var(--color-theme-agwa-fg)" />
                                    <line
                                        x1="480"
                                        y1="72"
                                        x2="492"
                                        y2="72"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 3: reject  */}
                                    <rect
                                        x="510"
                                        y="24"
                                        width="210"
                                        height="96"
                                        rx="8"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="2"
                                    />
                                    <text
                                        x="615"
                                        y="50"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="18"
                                    >
                                        🛡️
                                    </text>
                                    <text
                                        x="615"
                                        y="72"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                    >
                                        Step 3: p=reject
                                    </text>
                                    <text
                                        x="615"
                                        y="90"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        認証失敗メールを完全拒否
                                    </text>
                                    <text
                                        x="615"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        最高レベルの保護
                                    </text>
                                    <text
                                        x="615"
                                        y="114"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="10"
                                        fontWeight="600"
                                    >
                                        ← 最終目標
                                    </text>
                                    {/*  Bottom note  */}
                                    <text
                                        x="370"
                                        y="145"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        段階的移行が重要 — 急に reject
                                        にすると正規のメールが届かなくなるリスクあり
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">
                                    Gmail セキュリティのベストプラクティス
                                </div>
                                SPF・DKIM・DMARCの<strong>3つがそろって</strong>
                                初めて強固なメール認証体制が完成する。DMARCは必ず
                                <code>p=none</code> から始め段階的に強化すること。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/174124"
                                    target="_blank"
                                >
                                    DKIM の設定と有効化
                                </a>
                                <a
                                    href="https://support.google.com/a/answer/2368153"
                                    target="_blank"
                                >
                                    メールルーティングの設定
                                </a>
                            </div>
                        </div>

                        {/*  2-2 Drive  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>2-2. Google Driveの設定と管理
                            </h3>
                            <h4>⑥ 共有設定の階層構造</h4>

                            {/*  DIAGRAM 6: Drive Sharing Hierarchy  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 720 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="720"
                                        height="200"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Layer 1: Org  */}
                                    <rect
                                        x="180"
                                        y="16"
                                        width="360"
                                        height="44"
                                        rx="8"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="360"
                                        y="35"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                        letterSpacing="0.5"
                                    >
                                        LAYER 1
                                    </text>
                                    <text
                                        x="360"
                                        y="52"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                    >
                                        🌐 組織全体の設定（Admin コンソール）
                                    </text>
                                    {/*  Arrow down  */}
                                    <line
                                        x1="360"
                                        y1="60"
                                        x2="360"
                                        y2="80"
                                        stroke="#8a8680"
                                        strokeWidth="2"
                                        strokeDasharray="5,3"
                                    />
                                    <polygon points="355,78 365,78 360,88" fill="var(--color-muted)" />
                                    <text x="520" y="73" fill="var(--color-muted)" fontSize="11">
                                        OU単位で上書き可能
                                    </text>
                                    {/*  Layer 2: OU  */}
                                    <rect
                                        x="200"
                                        y="88"
                                        width="320"
                                        height="40"
                                        rx="8"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="360"
                                        y="104"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                        letterSpacing="0.5"
                                    >
                                        LAYER 2
                                    </text>
                                    <text
                                        x="360"
                                        y="120"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                    >
                                        🏢 OU単位の設定
                                    </text>
                                    {/*  Arrow down  */}
                                    <line
                                        x1="360"
                                        y1="128"
                                        x2="360"
                                        y2="148"
                                        stroke="#8a8680"
                                        strokeWidth="2"
                                        strokeDasharray="5,3"
                                    />
                                    <polygon points="355,146 365,146 360,156" fill="var(--color-muted)" />
                                    <text x="520" y="141" fill="var(--color-muted)" fontSize="11">
                                        管理者が許可した場合のみ
                                    </text>
                                    {/*  Layer 3: User  */}
                                    <rect
                                        x="220"
                                        y="156"
                                        width="280"
                                        height="36"
                                        rx="8"
                                        fill="var(--color-tip)"
                                        stroke="none"
                                    />
                                    <text
                                        x="360"
                                        y="172"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                        letterSpacing="0.5"
                                    >
                                        LAYER 3
                                    </text>
                                    <text
                                        x="360"
                                        y="186"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                    >
                                        👤 ユーザー個人の設定
                                    </text>
                                    {/*  Left note: overwrite rules  */}
                                    <rect
                                        x="20"
                                        y="60"
                                        width="148"
                                        height="110"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="94"
                                        y="78"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        上書きルール
                                    </text>
                                    <text
                                        x="94"
                                        y="96"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        上位が優先される
                                    </text>
                                    <text
                                        x="94"
                                        y="114"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        ❌ 下位では上位の
                                    </text>
                                    <text
                                        x="94"
                                        y="130"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        制限は解除できない
                                    </text>
                                    <text
                                        x="94"
                                        y="148"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        ✅ 下位でより
                                    </text>
                                    <text
                                        x="94"
                                        y="163"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        厳しくすることは可
                                    </text>
                                </svg>
                            </div>

                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>権限レベル（共有ドライブ）</th>
                                            <th>できること</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>マネージャー</strong>
                                            </td>
                                            <td>メンバー管理・設定変更・全コンテンツ操作</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>コンテンツ管理者</strong>
                                            </td>
                                            <td>すべてのコンテンツの追加・編集・移動・削除</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>コントリビューター</strong>
                                            </td>
                                            <td>ファイルの追加・編集（削除不可）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>コメント投稿者</strong>
                                            </td>
                                            <td>コメントのみ（編集不可）</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>閲覧者</strong>
                                            </td>
                                            <td>閲覧のみ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout best-practice">
                                <div className="callout-title">
                                    Google Drive 管理のベストプラクティス
                                </div>
                                チームの共有資産は必ず<strong>共有ドライブ</strong>
                                に保存する（ファイルが組織に帰属し、退職後もデータが失われない）。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/7212025"
                                    target="_blank"
                                >
                                    共有ドライブの管理
                                </a>
                            </div>
                        </div>

                        {/*  2-3 Calendar/Meet/Chat/Gemini  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>2-3. Calendar / Meet / Chat / Gemini
                                の管理
                            </h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>外部共有設定（Calendar）</th>
                                            <th>説明</th>
                                            <th>推奨</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>空き時間のみ共有</strong>
                                            </td>
                                            <td>詳細を隠して空き/予定ありのみ表示</td>
                                            <td>
                                                <span className="tag green">推奨デフォルト</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>予定のタイトルと時間のみ</strong>
                                            </td>
                                            <td>詳細は非表示</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>全ての情報を共有</strong>
                                            </td>
                                            <td>詳細含めて外部に公開</td>
                                            <td>
                                                <span className="tag orange">業務必要時のみ</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>共有しない</strong>
                                            </td>
                                            <td>外部からは全く見えない</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout info">
                                <div className="callout-title">Gemini の重要ポイント</div>
                                Google Workspace の Gemini は
                                <strong>組織のデータをモデルの学習に使用しない</strong>
                                ことが保証されています。
                            </div>
                        </div>

                        <a href="#top" className="back-top">
                            ↑ トップに戻る
                        </a>
                    </div>

                    {/*  ═══ SECTION 3 ═══  */}
                    <div className="section" id="s3">
                        <div className="section-header">
                            <div className="section-num c3">S3</div>
                            <div className="section-header-text">
                                <h2>データガバナンスとコンプライアンス</h2>
                                <div className="weight">配点比率 約15% — 法的・規制対応に必須</div>
                            </div>
                        </div>

                        {/*  3-1 Vault  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>3-1. Google Vault による eDiscovery
                                とデータ保持
                            </h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>機能</th>
                                            <th>説明</th>
                                            <th>対象サービス</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>保持ルール (Retention Rules)</strong>
                                            </td>
                                            <td>データを自動的に一定期間保持または削除</td>
                                            <td>Gmail, Drive, Chat, Meet</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>ホールド (Holds)</strong>
                                            </td>
                                            <td>訴訟・調査のため特定データの削除を停止</td>
                                            <td>全サービス</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>検索 (Search)</strong>
                                            </td>
                                            <td>キーワード・日付・送受信者などで横断検索</td>
                                            <td>全サービス</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>エクスポート (Export)</strong>
                                            </td>
                                            <td>検索結果を法的手続きに使えるフォーマットで出力</td>
                                            <td>全サービス</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4>⑦ 保持ルールの設定例</h4>

                            {/*  DIAGRAM 7: Vault Retention Rules  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 190"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="190"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Title  */}
                                    <text
                                        x="370"
                                        y="28"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="13"
                                    >
                                        コンプライアンス要件別の保持ルール設定
                                    </text>
                                    {/*  Rule 1  */}
                                    <rect
                                        x="20"
                                        y="42"
                                        width="212"
                                        height="108"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="20"
                                        y="42"
                                        width="212"
                                        height="28"
                                        rx="8"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="20"
                                        y="58"
                                        width="212"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    <text
                                        x="126"
                                        y="61"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        📧 財務メール
                                    </text>
                                    <text
                                        x="126"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                        fontSize="22"
                                    >
                                        7 年間
                                    </text>
                                    <text
                                        x="126"
                                        y="112"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="12"
                                    >
                                        保持期間
                                    </text>
                                    <text
                                        x="126"
                                        y="130"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        対象: 財務部門OU
                                    </text>
                                    <text
                                        x="126"
                                        y="144"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        法規制対応のため
                                    </text>
                                    {/*  Rule 2  */}
                                    <rect
                                        x="264"
                                        y="42"
                                        width="212"
                                        height="108"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-primary)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="264"
                                        y="42"
                                        width="212"
                                        height="28"
                                        rx="8"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="264"
                                        y="58"
                                        width="212"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="61"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        📬 一般メール
                                    </text>
                                    <text
                                        x="370"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontWeight="600"
                                        fontSize="22"
                                    >
                                        3 年間
                                    </text>
                                    <text
                                        x="370"
                                        y="112"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="12"
                                    >
                                        保持期間
                                    </text>
                                    <text
                                        x="370"
                                        y="130"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        対象: 全組織
                                    </text>
                                    <text
                                        x="370"
                                        y="144"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        デフォルトルール
                                    </text>
                                    {/*  Rule 3  */}
                                    <rect
                                        x="508"
                                        y="42"
                                        width="212"
                                        height="108"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="508"
                                        y="42"
                                        width="212"
                                        height="28"
                                        rx="8"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="508"
                                        y="58"
                                        width="212"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="614"
                                        y="61"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        👤 退職者データ
                                    </text>
                                    <text
                                        x="614"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="22"
                                    >
                                        1 年間
                                    </text>
                                    <text
                                        x="614"
                                        y="112"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="12"
                                    >
                                        退職後の保持期間
                                    </text>
                                    <text
                                        x="614"
                                        y="130"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        アーカイブライセンス
                                    </text>
                                    <text
                                        x="614"
                                        y="144"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        でコスト削減可能
                                    </text>
                                    {/*  Priority note  */}
                                    <rect
                                        x="20"
                                        y="162"
                                        width="700"
                                        height="20"
                                        rx="6"
                                        fill="rgba(var(--color-warning-rgb), 0.15)"
                                        stroke="#f0c08a"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="370"
                                        y="176"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="12"
                                        fontWeight="600"
                                    >
                                        ⚠️
                                        ホールド（Holds）が設定されている場合、保持ルールより優先される
                                        — データは削除されない
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">Vault 管理のベストプラクティス</div>
                                ホールドと保持ルールが競合する場合、
                                <strong>ホールドが必ず優先</strong>
                                されます。ホールドを設定したら法務部門など関係者に必ず通知すること。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/vault/answer/2462365"
                                    target="_blank"
                                >
                                    Google Vault の概要
                                </a>
                            </div>
                        </div>

                        {/*  3-2 DLP  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>3-2.
                                データ損失防止（DLP）ルールの作成と管理
                            </h3>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    margin: '0.75rem 0',
                                }}
                            >
                                <span className="tag blue">
                                    Gmail（送受信メール・添付ファイル）
                                </span>
                                <span className="tag blue">Google Drive（ファイルコンテンツ）</span>
                                <span className="tag blue">Google Chat（メッセージ内容）</span>
                            </div>
                            <h4>⑧ DLP ルール設定フロー</h4>

                            {/*  DIAGRAM 8: DLP Flow  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 240"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="240"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Step boxes in a row  */}
                                    {/*  Step 1  */}
                                    <rect
                                        x="18"
                                        y="18"
                                        width="160"
                                        height="170"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-primary)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="18"
                                        y="18"
                                        width="160"
                                        height="30"
                                        rx="8"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="18"
                                        y="36"
                                        width="160"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="98"
                                        y="38"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        STEP 1
                                    </text>
                                    <text
                                        x="98"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        コンテンツ検出器
                                    </text>
                                    <text
                                        x="98"
                                        y="78"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        ■ 組み込み検出器
                                    </text>
                                    <text
                                        x="98"
                                        y="95"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        クレジットカード番号
                                    </text>
                                    <text
                                        x="98"
                                        y="111"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        社会保障番号 など
                                    </text>
                                    <line
                                        x1="40"
                                        y1="122"
                                        x2="156"
                                        y2="122"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="98"
                                        y="138"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        ■ カスタム正規表現
                                    </text>
                                    <text
                                        x="98"
                                        y="155"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        独自の機密情報
                                    </text>
                                    <text
                                        x="98"
                                        y="171"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        パターン
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon
                                        points="187,103 187,93 204,103 187,113"
                                        fill="var(--color-primary)"
                                    />
                                    <line
                                        x1="178"
                                        y1="103"
                                        x2="187"
                                        y2="103"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 2  */}
                                    <rect
                                        x="204"
                                        y="18"
                                        width="152"
                                        height="170"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-tip)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="204"
                                        y="18"
                                        width="152"
                                        height="30"
                                        rx="8"
                                        fill="var(--color-tip)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="204"
                                        y="36"
                                        width="152"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-tip)"
                                        stroke="none"
                                    />
                                    <text
                                        x="280"
                                        y="38"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        STEP 2
                                    </text>
                                    <text
                                        x="280"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-tip)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        スコープ設定
                                    </text>
                                    <text
                                        x="280"
                                        y="80"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        🌐 全組織
                                    </text>
                                    <text
                                        x="280"
                                        y="100"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        🏢 特定のOU
                                    </text>
                                    <text
                                        x="280"
                                        y="120"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        👥 特定のグループ
                                    </text>
                                    <text
                                        x="280"
                                        y="155"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        細かく対象を
                                    </text>
                                    <text
                                        x="280"
                                        y="171"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        絞り込める
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon
                                        points="365,103 365,93 382,103 365,113"
                                        fill="var(--color-tip)"
                                    />
                                    <line
                                        x1="356"
                                        y1="103"
                                        x2="365"
                                        y2="103"
                                        stroke="var(--color-tip)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 3  */}
                                    <rect
                                        x="382"
                                        y="18"
                                        width="160"
                                        height="170"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="382"
                                        y="18"
                                        width="160"
                                        height="30"
                                        rx="8"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="382"
                                        y="36"
                                        width="160"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    <text
                                        x="462"
                                        y="38"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        STEP 3
                                    </text>
                                    <text
                                        x="462"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        アクション設定
                                    </text>
                                    <text
                                        x="462"
                                        y="76"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        🚫 ブロック
                                    </text>
                                    <text
                                        x="462"
                                        y="94"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        ⚠️ 警告（続行可能）
                                    </text>
                                    <text
                                        x="462"
                                        y="112"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        📥 隔離（管理者レビュー）
                                    </text>
                                    <text
                                        x="462"
                                        y="130"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                        fontWeight="600"
                                    >
                                        📊 監査ログのみ ←初期
                                    </text>
                                    <text
                                        x="462"
                                        y="148"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        まず監視から
                                    </text>
                                    <text
                                        x="462"
                                        y="163"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="10"
                                    >
                                        始めるのが安全
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon
                                        points="551,103 551,93 568,103 551,113"
                                        fill="var(--color-warning)"
                                    />
                                    <line
                                        x1="542"
                                        y1="103"
                                        x2="551"
                                        y2="103"
                                        stroke="var(--color-warning)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 4  */}
                                    <rect
                                        x="568"
                                        y="18"
                                        width="154"
                                        height="170"
                                        rx="8"
                                        fill="#151921"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="568"
                                        y="18"
                                        width="154"
                                        height="30"
                                        rx="8"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <rect
                                        x="568"
                                        y="36"
                                        width="154"
                                        height="12"
                                        rx="0"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="645"
                                        y="38"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        STEP 4
                                    </text>
                                    <text
                                        x="645"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        通知メッセージ
                                    </text>
                                    <text
                                        x="645"
                                        y="80"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        ユーザーへの
                                    </text>
                                    <text
                                        x="645"
                                        y="97"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        わかりやすい説明
                                    </text>
                                    <text
                                        x="645"
                                        y="120"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        &quot;なぜブロックされた
                                    </text>
                                    <text
                                        x="645"
                                        y="137"
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        fontSize="11"
                                    >
                                        か&quot;が明確に
                                    </text>
                                    <text
                                        x="645"
                                        y="157"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        ユーザー教育
                                    </text>
                                    <text
                                        x="645"
                                        y="173"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        効果にもなる
                                    </text>
                                    {/*  Bottom note  */}
                                    <rect
                                        x="18"
                                        y="200"
                                        width="704"
                                        height="30"
                                        rx="6"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="#b8dfc9"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="370"
                                        y="220"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="12"
                                        fontWeight="600"
                                    >
                                        💡 最初は「監査ログのみ」で誤検知を確認 →
                                        問題なければ「ブロック」へ段階的に移行
                                    </text>
                                </svg>
                            </div>

                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/9725686"
                                    target="_blank"
                                >
                                    DLP ルールの作成と管理
                                </a>
                            </div>
                        </div>

                        <a href="#top" className="back-top">
                            ↑ トップに戻る
                        </a>
                    </div>

                    {/*  ═══ SECTION 4 ═══  */}
                    <div className="section" id="s4">
                        <div className="section-header">
                            <div className="section-num c4">S4</div>
                            <div className="section-header-text">
                                <h2>セキュリティポリシーとアクセス制御</h2>
                                <div className="weight">配点比率 約20% — セキュリティの核心</div>
                            </div>
                        </div>

                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>4-1. ユーザーアクセスの保護
                            </h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>2SV方式</th>
                                            <th>セキュリティ</th>
                                            <th>フィッシング耐性</th>
                                            <th>推奨度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>セキュリティキー（FIDO2）</strong>
                                            </td>
                                            <td>
                                                <span className="tag green">最高</span>
                                            </td>
                                            <td>あり</td>
                                            <td>
                                                <span className="tag green">管理者必須</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>パスキー（Passkey）</strong>
                                            </td>
                                            <td>
                                                <span className="tag green">高</span>
                                            </td>
                                            <td>あり</td>
                                            <td>
                                                <span className="tag green">強く推奨</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Google Authenticator（TOTP）</strong>
                                            </td>
                                            <td>
                                                <span className="tag blue">高</span>
                                            </td>
                                            <td>限定的</td>
                                            <td>
                                                <span className="tag blue">推奨</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>バックアップコード</strong>
                                            </td>
                                            <td>
                                                <span className="tag">中</span>
                                            </td>
                                            <td>なし</td>
                                            <td>緊急時のみ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>SMS / 音声通話</strong>
                                            </td>
                                            <td>
                                                <span className="tag orange">低</span>
                                            </td>
                                            <td>なし</td>
                                            <td>
                                                <span className="tag orange">可能なら無効化</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout best-practice">
                                <div className="callout-title">2SV 導入のベストプラクティス</div>
                                管理者アカウントには<strong>セキュリティキー（FIDO2）</strong>
                                の使用を必須にする。SMS方式は
                                SIMスワップ攻撃に脆弱なため可能な限り無効化する。
                            </div>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ロール</th>
                                            <th>権限範囲</th>
                                            <th>付与対象</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>スーパー管理者</strong>
                                            </td>
                                            <td>全権限</td>
                                            <td>最小人数のみ（最低2名）。日常業務には使用しない</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>グループ管理者</strong>
                                            </td>
                                            <td>グループの管理</td>
                                            <td>ヘルプデスクスタッフ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>ユーザー管理者</strong>
                                            </td>
                                            <td>ユーザーアカウントの管理</td>
                                            <td>IT担当者</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Vault管理者</strong>
                                            </td>
                                            <td>Vault の操作</td>
                                            <td>法務・コンプライアンス担当者</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>カスタムロール</strong>
                                            </td>
                                            <td>指定した権限のみ</td>
                                            <td>特定の管理タスクが必要な場合</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/175197"
                                    target="_blank"
                                >
                                    2段階認証（2SV）の設定
                                </a>
                                <a
                                    href="https://support.google.com/a/answer/2405986"
                                    target="_blank"
                                >
                                    管理者ロールの割り当て
                                </a>
                            </div>
                        </div>

                        <a href="#top" className="back-top">
                            ↑ トップに戻る
                        </a>
                    </div>

                    {/*  ═══ SECTION 5 ═══  */}
                    <div className="section" id="s5">
                        <div className="section-header">
                            <div className="section-num c5">S5</div>
                            <div className="section-header-text">
                                <h2>ブラウザとエンドポイントの管理</h2>
                                <div className="weight">配点比率 約10% — デバイス管理の基本</div>
                            </div>
                        </div>

                        {/*  5-1 Mobile  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>5-1. モバイルデバイスの管理
                            </h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>管理方式</th>
                                            <th>機能範囲</th>
                                            <th>ユースケース</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>基本モバイル管理（無料）</strong>
                                            </td>
                                            <td>最低限のポリシー適用</td>
                                            <td>BYOD（個人デバイス）の最低限管理</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>高度なモバイル管理（MDM）</strong>
                                            </td>
                                            <td>完全なデバイス制御</td>
                                            <td>会社支給デバイスの完全管理</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>サードパーティ MDM</strong>
                                            </td>
                                            <td>カスタム要件対応</td>
                                            <td>複雑なポリシーや既存 MDM 基盤との統合</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4>⑨ 退職者デバイスのオフボーディングフロー</h4>

                            {/*  DIAGRAM 9: Offboarding Flow  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 120"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="120"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Steps  */}
                                    <rect
                                        x="14"
                                        y="18"
                                        width="158"
                                        height="72"
                                        rx="7"
                                        fill="#c0392b"
                                        stroke="none"
                                    />
                                    <text
                                        x="93"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="20"
                                    >
                                        🚫
                                    </text>
                                    <text
                                        x="93"
                                        y="65"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ①アカウント停止
                                    </text>
                                    <text
                                        x="93"
                                        y="81"
                                        textAnchor="middle"
                                        fill="#f8c8c8"
                                        fontSize="11"
                                    >
                                        即時実施
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="182,54 182,44 198,54 182,64" fill="#c0392b" />
                                    <line
                                        x1="172"
                                        y1="54"
                                        x2="182"
                                        y2="54"
                                        stroke="#c0392b"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 2  */}
                                    <rect
                                        x="198"
                                        y="18"
                                        width="158"
                                        height="72"
                                        rx="7"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    <text
                                        x="277"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="20"
                                    >
                                        📁
                                    </text>
                                    <text
                                        x="277"
                                        y="65"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ②データ所有権移転
                                    </text>
                                    <text
                                        x="277"
                                        y="81"
                                        textAnchor="middle"
                                        fill="#f8dfc8"
                                        fontSize="11"
                                    >
                                        Drive データを別ユーザーへ
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="366,54 366,44 382,54 366,64" fill="var(--color-warning)" />
                                    <line
                                        x1="356"
                                        y1="54"
                                        x2="366"
                                        y2="54"
                                        stroke="var(--color-warning)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 3  */}
                                    <rect
                                        x="382"
                                        y="18"
                                        width="158"
                                        height="72"
                                        rx="7"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="461"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="20"
                                    >
                                        📱
                                    </text>
                                    <text
                                        x="461"
                                        y="65"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ③リモートワイプ
                                    </text>
                                    <text
                                        x="461"
                                        y="81"
                                        textAnchor="middle"
                                        fill="#c0d8f8"
                                        fontSize="11"
                                    >
                                        BYOD=アカウントのみ
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="550,54 550,44 566,54 550,64" fill="var(--color-primary)" />
                                    <line
                                        x1="540"
                                        y1="54"
                                        x2="550"
                                        y2="54"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 4  */}
                                    <rect
                                        x="566"
                                        y="18"
                                        width="158"
                                        height="72"
                                        rx="7"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="645"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="20"
                                    >
                                        🗑️
                                    </text>
                                    <text
                                        x="645"
                                        y="65"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ④アカウント削除
                                    </text>
                                    <text
                                        x="645"
                                        y="81"
                                        textAnchor="middle"
                                        fill="#c8f0dc"
                                        fontSize="11"
                                    >
                                        猶予期間後（20日以内）
                                    </text>
                                    {/*  Bottom  */}
                                    <text
                                        x="370"
                                        y="108"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        この順序を必ず守ること — 削除前にデータ移転を完了させる
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">
                                    モバイル管理のベストプラクティス
                                </div>
                                BYOD デバイスには「
                                <strong>アカウントワイプ（会社データのみ削除）</strong>
                                」を実施し、個人データへの影響を最小限にする。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/7326921"
                                    target="_blank"
                                >
                                    モバイルデバイス管理の概要
                                </a>
                            </div>
                        </div>

                        {/*  5-2 Chrome  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>5-2. Chrome ブラウザの管理
                            </h3>
                            <h4>⑩ Chrome ブラウザの登録手順</h4>

                            {/*  DIAGRAM 10: Chrome Registration  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 130"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="130"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Step nodes  */}
                                    {/*  1  */}
                                    <circle cx="72" cy="50" r="28" fill="var(--color-background)" stroke="var(--color-border)" />
                                    <text
                                        x="72"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="18"
                                    >
                                        🖥️
                                    </text>
                                    <text
                                        x="72"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        1
                                    </text>
                                    <text
                                        x="72"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        Admin コンソール
                                    </text>
                                    <text
                                        x="72"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        デバイス→Chrome
                                    </text>
                                    <text
                                        x="72"
                                        y="119"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        →マネージドブラウザ
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="112,50 112,42 128,50 112,58" fill="var(--color-primary)" />
                                    <line
                                        x1="100"
                                        y1="50"
                                        x2="112"
                                        y2="50"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                    />
                                    {/*  2  */}
                                    <circle cx="168" cy="50" r="28" fill="var(--color-tip)" stroke="none" />
                                    <text
                                        x="168"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="18"
                                    >
                                        🔑
                                    </text>
                                    <text
                                        x="168"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        2
                                    </text>
                                    <text
                                        x="168"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        登録トークンを
                                    </text>
                                    <text
                                        x="168"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        生成する
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="208,50 208,42 224,50 208,58" fill="var(--color-tip)" />
                                    <line
                                        x1="196"
                                        y1="50"
                                        x2="208"
                                        y2="50"
                                        stroke="var(--color-tip)"
                                        strokeWidth="2"
                                    />
                                    {/*  3  */}
                                    <circle cx="268" cy="50" r="28" fill="var(--color-theme-agwa-bg)" stroke="var(--color-theme-agwa-fg)" />
                                    <text
                                        x="268"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="18"
                                    >
                                        📤
                                    </text>
                                    <text
                                        x="268"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        3
                                    </text>
                                    <text
                                        x="268"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        トークンを配布
                                    </text>
                                    <text
                                        x="268"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        GPO(Win) / MDM(Mac)
                                    </text>
                                    {/*  Arrow  */}
                                    <polygon points="308,50 308,42 324,50 308,58" fill="var(--color-warning)" />
                                    <line
                                        x1="296"
                                        y1="50"
                                        x2="308"
                                        y2="50"
                                        stroke="var(--color-warning)"
                                        strokeWidth="2"
                                    />
                                    {/*  4  */}
                                    <circle cx="370" cy="50" r="28" fill="var(--color-background)" stroke="var(--color-border)" />
                                    <text
                                        x="370"
                                        y="46"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="18"
                                    >
                                        ✅
                                    </text>
                                    <text
                                        x="370"
                                        y="62"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        4
                                    </text>
                                    <text
                                        x="370"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        登録完了
                                    </text>
                                    <text
                                        x="370"
                                        y="106"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        ポリシーが自動適用
                                    </text>
                                    {/*  Arrow to benefits  */}
                                    <line
                                        x1="398"
                                        y1="50"
                                        x2="440"
                                        y2="50"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="2"
                                    />
                                    <polygon points="440,50 432,44 432,56" fill="var(--color-theme-agwa-fg)" />
                                    {/*  Benefits box  */}
                                    <rect
                                        x="450"
                                        y="20"
                                        width="270"
                                        height="110"
                                        rx="8"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="585"
                                        y="42"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        管理できるポリシー
                                    </text>
                                    <text
                                        x="585"
                                        y="60"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        🔒 拡張機能の許可/ブロック
                                    </text>
                                    <text
                                        x="585"
                                        y="78"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        🔄 自動更新の強制
                                    </text>
                                    <text
                                        x="585"
                                        y="96"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        🌐 SafeBrowsing の強制
                                    </text>
                                    <text
                                        x="585"
                                        y="114"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        🔐 パスワードマネージャー
                                    </text>
                                </svg>
                            </div>

                            <div className="callout best-practice">
                                <div className="callout-title">Chrome 管理のベストプラクティス</div>
                                拡張機能は<strong>許可リスト方式</strong>
                                で管理し、未審査の拡張機能を禁止する。Chrome
                                の自動更新を強制し、古いバージョンのセキュリティリスクを排除する。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/chrome/a/answer/9116814"
                                    target="_blank"
                                >
                                    Chrome Browser Cloud Management
                                </a>
                            </div>
                        </div>

                        <a href="#top" className="back-top">
                            ↑ トップに戻る
                        </a>
                    </div>

                    {/*  ═══ SECTION 6 ═══  */}
                    <div className="section" id="s6">
                        <div className="section-header">
                            <div className="section-num c6">S6</div>
                            <div className="section-header-text">
                                <h2>監視とトラブルシューティング</h2>
                                <div className="weight">配点比率 約13% — 実務直結スキル</div>
                            </div>
                        </div>

                        {/*  6-1  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>6-1. 問題の特定と診断
                            </h3>
                            <h4>⑪ 問題診断のファーストステップ</h4>

                            {/*  DIAGRAM 11: Diagnosis Flow  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 270"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="270"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Start  */}
                                    <rect
                                        x="270"
                                        y="16"
                                        width="200"
                                        height="34"
                                        rx="17"
                                        fill="#1a1916"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="38"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                    >
                                        問題報告を受けた
                                    </text>
                                    {/*  Arrow down  */}
                                    <line
                                        x1="370"
                                        y1="50"
                                        x2="370"
                                        y2="66"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                    />
                                    <polygon points="365,64 375,64 370,74" fill="#666" />
                                    {/*  Step 1  */}
                                    <rect
                                        x="170"
                                        y="74"
                                        width="400"
                                        height="42"
                                        rx="8"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="92"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        STEP 1: ステータスダッシュボードを確認
                                    </text>
                                    <text
                                        x="370"
                                        y="108"
                                        textAnchor="middle"
                                        fill="#c0d8f8"
                                        fontSize="11"
                                    >
                                        google.com/appsstatus — Googleのサービス障害か判断
                                    </text>
                                    {/*  Branch  */}
                                    <line
                                        x1="370"
                                        y1="116"
                                        x2="370"
                                        y2="128"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="175"
                                        y1="128"
                                        x2="565"
                                        y2="128"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                    />
                                    {/*  Yes branch  */}
                                    <line
                                        x1="175"
                                        y1="128"
                                        x2="175"
                                        y2="145"
                                        stroke="#c0392b"
                                        strokeWidth="1.5"
                                    />
                                    <polygon points="170,143 180,143 175,153" fill="#c0392b" />
                                    <rect
                                        x="90"
                                        y="153"
                                        width="170"
                                        height="38"
                                        rx="7"
                                        fill="#c0392b"
                                        stroke="none"
                                    />
                                    <text
                                        x="175"
                                        y="170"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        🔴 Google障害の場合
                                    </text>
                                    <text
                                        x="175"
                                        y="184"
                                        textAnchor="middle"
                                        fill="#f8c8c8"
                                        fontSize="11"
                                    >
                                        復旧を待つのみ
                                    </text>
                                    {/*  No branch: continue  */}
                                    <line
                                        x1="565"
                                        y1="128"
                                        x2="565"
                                        y2="145"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <polygon points="560,143 570,143 565,153" fill="var(--color-theme-agwa-fg)" />
                                    <rect
                                        x="470"
                                        y="153"
                                        width="190"
                                        height="38"
                                        rx="7"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="565"
                                        y="170"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="12"
                                    >
                                        🟢 Google は正常稼働中
                                    </text>
                                    <text
                                        x="565"
                                        y="184"
                                        textAnchor="middle"
                                        fill="#c8f0dc"
                                        fontSize="11"
                                    >
                                        → 自組織の問題を調査
                                    </text>
                                    {/*  Step 2  */}
                                    <line
                                        x1="370"
                                        y1="128"
                                        x2="370"
                                        y2="203"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                        strokeDasharray="5,3"
                                    />
                                    <polygon points="365,201 375,201 370,211" fill="#666" />
                                    <rect
                                        x="170"
                                        y="211"
                                        width="400"
                                        height="34"
                                        rx="7"
                                        fill="var(--color-tip)"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="226"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        STEP 2: 監査ログで影響範囲を特定
                                    </text>
                                    <text
                                        x="370"
                                        y="240"
                                        textAnchor="middle"
                                        fill="#d8ccf8"
                                        fontSize="11"
                                    >
                                        Admin コンソール → レポート → 監査ログ
                                    </text>
                                    {/*  Step 3 label below  */}
                                    <rect
                                        x="114"
                                        y="252"
                                        width="256"
                                        height="12"
                                        rx="4"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="#b0cef4"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="242"
                                        y="262"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="10"
                                    >
                                        全ユーザー? or 特定ユーザー?
                                    </text>
                                    <rect
                                        x="384"
                                        y="252"
                                        width="256"
                                        height="12"
                                        rx="4"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="#b0cef4"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="512"
                                        y="262"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="10"
                                    >
                                        全デバイス? or 特定デバイス?
                                    </text>
                                </svg>
                            </div>
                        </div>

                        {/*  6-2 Mail  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>6-2.
                                メール配信問題のトラブルシューティング
                            </h3>
                            <h4>⑫ Email Log Search での調査フロー</h4>

                            {/*  DIAGRAM 12: Email Log Search  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 220"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="220"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Entry  */}
                                    <rect
                                        x="220"
                                        y="16"
                                        width="300"
                                        height="34"
                                        rx="8"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="30"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        Email Log Search で検索
                                    </text>
                                    <text
                                        x="370"
                                        y="44"
                                        textAnchor="middle"
                                        fill="#c0d8f8"
                                        fontSize="10"
                                    >
                                        Admin コンソール → レポート → 監査 → メールログ検索
                                    </text>
                                    {/*  Arrow down  */}
                                    <line
                                        x1="370"
                                        y1="50"
                                        x2="370"
                                        y2="66"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                    />
                                    <polygon points="365,64 375,64 370,74" fill="#666" />
                                    {/*  Decision diamond  */}
                                    <polygon
                                        points="370,74 440,100 370,126 300,100"
                                        fill="var(--color-background)"
                                        stroke="#4a4843"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="370"
                                        y="97"
                                        textAnchor="middle"
                                        fill="#1a1916"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        配信ステータス
                                    </text>
                                    <text
                                        x="370"
                                        y="113"
                                        textAnchor="middle"
                                        fill="#1a1916"
                                        fontSize="11"
                                    >
                                        を確認
                                    </text>
                                    {/*  4 branches  */}
                                    {/*  Delivered  */}
                                    <line
                                        x1="440"
                                        y1="100"
                                        x2="580"
                                        y2="100"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="580"
                                        y="84"
                                        width="140"
                                        height="32"
                                        rx="6"
                                        fill="var(--color-theme-agwa-bg)"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="650"
                                        y="99"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        Delivered ✅
                                    </text>
                                    <text
                                        x="650"
                                        y="113"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="10"
                                    >
                                        受信者側の問題
                                    </text>
                                    {/*  Bounced  */}
                                    <line x1="370" y1="74" x2="370" y2="50" stroke="none" />
                                    <line
                                        x1="300"
                                        y1="100"
                                        x2="160"
                                        y2="100"
                                        stroke="#c0392b"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="20"
                                        y="84"
                                        width="140"
                                        height="32"
                                        rx="6"
                                        fill="#fff0f0"
                                        stroke="#c0392b"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="90"
                                        y="99"
                                        textAnchor="middle"
                                        fill="#c0392b"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        Bounced ❌
                                    </text>
                                    <text
                                        x="90"
                                        y="113"
                                        textAnchor="middle"
                                        fill="#c0392b"
                                        fontSize="10"
                                    >
                                        バウンス理由を確認
                                    </text>
                                    {/*  Spam  */}
                                    <line
                                        x1="370"
                                        y1="126"
                                        x2="270"
                                        y2="158"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="170"
                                        y="148"
                                        width="130"
                                        height="32"
                                        rx="6"
                                        fill="rgba(var(--color-warning-rgb), 0.1)"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="235"
                                        y="163"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        Spam ⚠️
                                    </text>
                                    <text
                                        x="235"
                                        y="176"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="10"
                                    >
                                        迷惑メール扱い
                                    </text>
                                    {/*  Queued  */}
                                    <line
                                        x1="370"
                                        y1="126"
                                        x2="470"
                                        y2="158"
                                        stroke="var(--color-tip)"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="420"
                                        y="148"
                                        width="130"
                                        height="32"
                                        rx="6"
                                        fill="rgba(var(--color-theme-genai-rgb), 0.1)"
                                        stroke="var(--color-tip)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="485"
                                        y="163"
                                        textAnchor="middle"
                                        fill="var(--color-tip)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        Queued ⏳
                                    </text>
                                    <text
                                        x="485"
                                        y="176"
                                        textAnchor="middle"
                                        fill="var(--color-tip)"
                                        fontSize="10"
                                    >
                                        送信待ち・遅延
                                    </text>
                                    {/*  Next step  */}
                                    <rect
                                        x="114"
                                        y="196"
                                        width="512"
                                        height="16"
                                        rx="6"
                                        fill="rgba(var(--color-primary-rgb), 0.1)"
                                        stroke="#b0cef4"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x="370"
                                        y="209"
                                        textAnchor="middle"
                                        fill="var(--color-primary)"
                                        fontSize="11"
                                        fontWeight="600"
                                    >
                                        問題が続く場合 → Google Admin Toolbox でヘッダーを分析 /
                                        SPF・DKIM の認証状況を確認
                                    </text>
                                </svg>
                            </div>
                        </div>

                        {/*  6-3 Meet quality  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>6-3. Meet 品質問題の診断
                            </h3>
                            <h4>⑬ Meet 品質ツールの見方と診断フロー</h4>

                            {/*  DIAGRAM 13: Meet Quality  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 210"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="210"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Title area  */}
                                    <rect
                                        x="18"
                                        y="16"
                                        width="704"
                                        height="30"
                                        rx="6"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="370"
                                        y="36"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                    >
                                        Admin コンソール → レポート → Meet 品質ツール —
                                        通話ごとの詳細データを確認
                                    </text>
                                    {/*  3 Metrics  */}
                                    {/*  Packet Loss  */}
                                    <rect
                                        x="18"
                                        y="58"
                                        width="216"
                                        height="80"
                                        rx="8"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="126"
                                        y="80"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        📦 パケットロス
                                    </text>
                                    <rect
                                        x="38"
                                        y="86"
                                        width="176"
                                        height="18"
                                        rx="4"
                                        fill="#e2dfd8"
                                        stroke="none"
                                    />
                                    <rect
                                        x="38"
                                        y="86"
                                        width="35"
                                        height="18"
                                        rx="4"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    {/*  10% = good  */}
                                    <text
                                        x="126"
                                        y="118"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        ✅ &lt;2% 正常
                                    </text>
                                    <text
                                        x="126"
                                        y="131"
                                        textAnchor="middle"
                                        fill="#c0392b"
                                        fontSize="11"
                                    >
                                        ❌ ≥2% 品質劣化の可能性
                                    </text>
                                    {/*  RTT  */}
                                    <rect
                                        x="262"
                                        y="58"
                                        width="216"
                                        height="80"
                                        rx="8"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="370"
                                        y="80"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        ⏱️ 遅延（RTT）
                                    </text>
                                    <rect
                                        x="282"
                                        y="86"
                                        width="176"
                                        height="18"
                                        rx="4"
                                        fill="#e2dfd8"
                                        stroke="none"
                                    />
                                    <rect
                                        x="282"
                                        y="86"
                                        width="70"
                                        height="18"
                                        rx="4"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    {/*  ~40% = moderate  */}
                                    <text
                                        x="370"
                                        y="118"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        ✅ &lt;150ms 正常
                                    </text>
                                    <text
                                        x="370"
                                        y="131"
                                        textAnchor="middle"
                                        fill="#c0392b"
                                        fontSize="11"
                                    >
                                        ❌ ≥150ms 通話品質に影響
                                    </text>
                                    {/*  Jitter  */}
                                    <rect
                                        x="506"
                                        y="58"
                                        width="216"
                                        height="80"
                                        rx="8"
                                        fill="var(--color-foreground)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="614"
                                        y="80"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        〰️ ジッター
                                    </text>
                                    <rect
                                        x="526"
                                        y="86"
                                        width="176"
                                        height="18"
                                        rx="4"
                                        fill="#e2dfd8"
                                        stroke="none"
                                    />
                                    <rect
                                        x="526"
                                        y="86"
                                        width="52"
                                        height="18"
                                        rx="4"
                                        fill="var(--color-tip)"
                                        stroke="none"
                                    />
                                    {/*  ~30% = warning  */}
                                    <text
                                        x="614"
                                        y="118"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontSize="11"
                                    >
                                        ✅ &lt;30ms 正常
                                    </text>
                                    <text
                                        x="614"
                                        y="131"
                                        textAnchor="middle"
                                        fill="#c0392b"
                                        fontSize="11"
                                    >
                                        ❌ ≥30ms 音声の乱れ
                                    </text>
                                    {/*  Decision box  */}
                                    <rect
                                        x="18"
                                        y="152"
                                        width="340"
                                        height="46"
                                        rx="7"
                                        fill="#fff0f0"
                                        stroke="#c0392b"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="188"
                                        y="172"
                                        textAnchor="middle"
                                        fill="#6b0000"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        全参加者で問題発生
                                    </text>
                                    <text
                                        x="188"
                                        y="189"
                                        textAnchor="middle"
                                        fill="#6b0000"
                                        fontSize="11"
                                    >
                                        → ネットワーク経路 / Google側の障害
                                    </text>
                                    <rect
                                        x="382"
                                        y="152"
                                        width="340"
                                        height="46"
                                        rx="7"
                                        fill="rgba(var(--color-warning-rgb), 0.1)"
                                        stroke="var(--color-warning)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="552"
                                        y="172"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontWeight="600"
                                        fontSize="12"
                                    >
                                        特定の参加者のみで問題発生
                                    </text>
                                    <text
                                        x="552"
                                        y="189"
                                        textAnchor="middle"
                                        fill="var(--color-warning)"
                                        fontSize="11"
                                    >
                                        → その参加者の端末 / 接続の問題
                                    </text>
                                </svg>
                            </div>
                        </div>

                        {/*  6-4 HAR  */}
                        <div className="subsection">
                            <h3>
                                <span className="dot"></span>6-4. サポートリソースの活用
                            </h3>
                            <h4>⑭ HAR ファイルの生成手順（Chrome）</h4>

                            {/*  DIAGRAM 14: HAR File Generation  */}
                            <div className="svg-wrap">
                                <svg
                                    viewBox="0 0 740 140"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fontFamily="'DM Sans',system-ui,sans-serif"
                                    fontSize="13"
                                >
                                    <rect
                                        width="740"
                                        height="140"
                                        rx="10"
                                        fill="var(--color-background)"
                                        stroke="var(--color-border)"
                                        strokeWidth="1"
                                    />
                                    {/*  Step 1  */}
                                    <rect
                                        x="14"
                                        y="18"
                                        width="134"
                                        height="88"
                                        rx="7"
                                        fill="#1a1916"
                                        stroke="none"
                                    />
                                    <text
                                        x="81"
                                        y="48"
                                        textAnchor="middle"
                                        fill="#50fa7b"
                                        fontSize="22"
                                    >
                                        F12
                                    </text>
                                    <text
                                        x="81"
                                        y="70"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        ①開発者ツール
                                    </text>
                                    <text
                                        x="81"
                                        y="85"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        を開く
                                    </text>
                                    <text
                                        x="81"
                                        y="99"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        Ctrl+Shift+I
                                    </text>
                                    <polygon points="158,62 158,52 174,62 158,72" fill="var(--color-foreground)" />
                                    <line
                                        x1="148"
                                        y1="62"
                                        x2="158"
                                        y2="62"
                                        stroke="#4a4843"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 2  */}
                                    <rect
                                        x="174"
                                        y="18"
                                        width="134"
                                        height="88"
                                        rx="7"
                                        fill="var(--color-primary)"
                                        stroke="none"
                                    />
                                    <text
                                        x="241"
                                        y="48"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="22"
                                    >
                                        🌐
                                    </text>
                                    <text
                                        x="241"
                                        y="70"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        ②Networkタブ
                                    </text>
                                    <text
                                        x="241"
                                        y="85"
                                        textAnchor="middle"
                                        fill="#c0d8f8"
                                        fontSize="10"
                                    >
                                        を選択する
                                    </text>
                                    <polygon points="318,62 318,52 334,62 318,72" fill="var(--color-primary)" />
                                    <line
                                        x1="308"
                                        y1="62"
                                        x2="318"
                                        y2="62"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 3  */}
                                    <rect
                                        x="334"
                                        y="18"
                                        width="134"
                                        height="88"
                                        rx="7"
                                        fill="var(--color-warning)"
                                        stroke="none"
                                    />
                                    <text
                                        x="401"
                                        y="48"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="22"
                                    >
                                        🔁
                                    </text>
                                    <text
                                        x="401"
                                        y="70"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        ③問題の操作を
                                    </text>
                                    <text
                                        x="401"
                                        y="85"
                                        textAnchor="middle"
                                        fill="#f8dfc8"
                                        fontSize="10"
                                    >
                                        再現する
                                    </text>
                                    <polygon points="478,62 478,52 494,62 478,72" fill="var(--color-warning)" />
                                    <line
                                        x1="468"
                                        y1="62"
                                        x2="478"
                                        y2="62"
                                        stroke="var(--color-warning)"
                                        strokeWidth="2"
                                    />
                                    {/*  Step 4  */}
                                    <rect
                                        x="494"
                                        y="18"
                                        width="134"
                                        height="88"
                                        rx="7"
                                        fill="var(--color-theme-agwa-fg)"
                                        stroke="none"
                                    />
                                    <text
                                        x="561"
                                        y="48"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="22"
                                    >
                                        💾
                                    </text>
                                    <text
                                        x="561"
                                        y="68"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        ④右クリック →
                                    </text>
                                    <text
                                        x="561"
                                        y="82"
                                        textAnchor="middle"
                                        fill="#c8f0dc"
                                        fontSize="10"
                                    >
                                        Save all as HAR
                                    </text>
                                    <text
                                        x="561"
                                        y="96"
                                        textAnchor="middle"
                                        fill="#c8f0dc"
                                        fontSize="10"
                                    >
                                        with content
                                    </text>
                                    {/*  Result arrow + box  */}
                                    <line
                                        x1="628"
                                        y1="62"
                                        x2="650"
                                        y2="62"
                                        stroke="var(--color-theme-agwa-fg)"
                                        strokeWidth="2"
                                    />
                                    <polygon points="648,62 640,56 640,68" fill="var(--color-theme-agwa-fg)" />
                                    <rect
                                        x="650"
                                        y="42"
                                        width="78"
                                        height="40"
                                        rx="6"
                                        fill="var(--color-foreground)"
                                        stroke="#b8dfc9"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x="689"
                                        y="59"
                                        textAnchor="middle"
                                        fill="var(--color-theme-agwa-fg)"
                                        fontWeight="600"
                                        fontSize="11"
                                    >
                                        .har ファイル
                                    </text>
                                    <text
                                        x="689"
                                        y="74"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="10"
                                    >
                                        サポートへ提出
                                    </text>
                                    {/*  Bottom  */}
                                    <text
                                        x="370"
                                        y="124"
                                        textAnchor="middle"
                                        fill="var(--color-foreground)"
                                        fontSize="11"
                                    >
                                        ⚠️ HARファイルにはセッション情報が含まれる場合があります —
                                        送付先を確認してから提出すること
                                    </text>
                                </svg>
                            </div>

                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ログ種別</th>
                                            <th>収集方法</th>
                                            <th>用途</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>HAR ファイル</strong>
                                            </td>
                                            <td>ブラウザの開発者ツール → Network タブ</td>
                                            <td>ブラウザとサーバー間の通信を記録</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Admin コンソール監査ログ</strong>
                                            </td>
                                            <td>Admin コンソール → レポート</td>
                                            <td>管理操作の履歴</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>メールログ</strong>
                                            </td>
                                            <td>Email Log Search</td>
                                            <td>メール配信の詳細</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>デバイスログ</strong>
                                            </td>
                                            <td>Admin コンソール → デバイス</td>
                                            <td>モバイル/Chrome のアクティビティ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout best-practice">
                                <div className="callout-title">
                                    サポートケース作成のベストプラクティス
                                </div>
                                <strong>①</strong> 問題の再現手順を具体的に記載 →<strong>②</strong>{' '}
                                影響範囲を明確化 →<strong>③</strong> 既に試した対処法を列挙 →
                                <strong>④</strong>
                                必要なログを添付。事前準備が解決時間を大幅に短縮します。
                            </div>
                            <div className="source-block">
                                <div className="source-label">公式ドキュメント</div>
                                <a
                                    href="https://support.google.com/a/answer/9362714"
                                    target="_blank"
                                >
                                    Google サポートへの問い合わせと HAR ファイルの提供
                                </a>
                                <a href="https://toolbox.googleapps.com/apps/main/" target="_blank">
                                    Google Admin Toolbox（ヘッダー分析・DNS確認）
                                </a>
                            </div>
                        </div>

                        <a href="#top" className="back-top">
                            ↑ トップに戻る
                        </a>
                    </div>

                    {/*  Footer  */}
                    <div className="footer">
                        <div>
                            Associate Google Workspace Administrator 完全試験対策ガイド
                            <span style={{ color: 'var(--color-border)', margin: '0 6px' }}>|</span>
                            <a
                                href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator"
                                target="_blank"
                            >
                                公式試験ページ
                            </a>
                            <span style={{ color: 'var(--color-border)', margin: '0 6px' }}>|</span>
                            <a
                                href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                                target="_blank"
                            >
                                試験ガイド PDF
                            </a>
                        </div>
                        <div>
                            情報は公式ドキュメントに基づいています。最新情報は公式ページで確認してください。
                        </div>
                    </div>
                </main>
            </div>

            <ScrollSpy />
        </>
    );
}
