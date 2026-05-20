import './page.css';
import Link from 'next/link';

export default function AgwaSection2Page() {
    return (
        <div className="agwa-section2-page">
            
        <div className="top-banner">
            📋 Associate Google Workspace Administrator (AGWA) 試験対策 — Section 2: Managing Core
            Workspace Services &nbsp;·&nbsp;
            <a
                href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator"
                target="_blank"
                >公式認定ページ</a
            >
            &nbsp;·&nbsp;
            <a
                href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                target="_blank"
                >試験ガイド PDF</a
            >
        </div>

        <div className="layout">
            {/*  SIDEBAR  */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-badge">AGWA EXAM</div>
                    <div className="sidebar-title">Section 2<br />コアサービス管理</div>
                </div>
                <div className="sidebar-section-label">学習セクション</div>
                <nav>
                    <a href="#overview" className="active"><span className="dot"></span>概要・試験構成</a>
                    <a href="#s21"><span className="dot"></span>2.1 Gmail の設定</a>
                    <a href="#mx"><span className="dot"></span>→ MXレコード</a>
                    <a href="#routing"><span className="dot"></span>→ メールルーティング</a>
                    <a href="#spf-dkim-dmarc"><span className="dot"></span>→ SPF/DKIM/DMARC</a>
                    <a href="#spam"><span className="dot"></span>→ スパム・フィッシング</a>
                    <a href="#compliance-footer"><span className="dot"></span>→ フッター・隔離</a>
                    <a href="#sandbox"><span className="dot"></span>→ セキュリティSB</a>
                    <a href="#s22"><span className="dot"></span>2.2 Drive & Docs</a>
                    <a href="#sharing"><span className="dot"></span>→ 共有設定</a>
                    <a href="#trust-rules"><span className="dot"></span>→ 信頼ルール</a>
                    <a href="#shared-drives"><span className="dot"></span>→ 共有ドライブ</a>
                    <a href="#dlp"><span className="dot"></span>→ DLP & ラベル</a>
                    <a href="#s23"><span className="dot"></span>2.3 Calendar</a>
                    <a href="#resources"><span className="dot"></span>→ リソース管理</a>
                    <a href="#cal-sharing"><span className="dot"></span>→ 共有設定</a>
                    <a href="#s24"><span className="dot"></span>2.4 Google Meet</a>
                    <a href="#s25"><span className="dot"></span>2.5 Google Chat</a>
                    <a href="#s26"><span className="dot"></span>2.6 Gemini AI</a>
                    <a href="#s27"><span className="dot"></span>2.7 開発サポート</a>
                    <a href="#checklist"><span className="dot"></span>試験直前チェック</a>
                </nav>
            </aside>

            {/*  MAIN CONTENT  */}
            <main className="main">
                {/*  HERO  */}
                <div className="hero" id="overview">
                    <div className="hero-tag">SECTION 2 / MANAGING CORE WORKSPACE SERVICES</div>
                    <h1>Google Workspace<br />コアサービス管理<br />完全学習ガイド</h1>
                    <p>
                        初学者でもわかる、AGWA試験 Section 2
                        の全トピックをステップバイステップで解説。各サービスの設定方法・ベストプラクティス・試験ポイントを網羅。
                    </p>
                    <div className="hero-meta">
                        <div className="hero-chip">配点比率 <span>≈ 23%</span></div>
                        <div className="hero-chip">トピック数 <span>7つのサービス</span></div>
                        <div className="hero-chip">重要度 <span>★★★★★</span></div>
                    </div>
                </div>

                {/*  OVERVIEW CARDS  */}
                <h2
                    style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}
                >
                    このセクションのカバー範囲
                </h2>
                <div className="overview-grid">
                    <a href="#s21" className="overview-card">
                        <div className="oc-num">2.1</div>
                        <div className="oc-title">Gmail の設定</div>
                        <div className="oc-pct">MX・SPF・DKIM・DMARC・ルーティング・スパム対策</div>
                    </a>
                    <a href="#s22" className="overview-card" style={{ borderTopColor: '#059669' }}>
                        <div className="oc-num" style={{ color: '#059669' }}>2.2</div>
                        <div className="oc-title">Drive & Docs</div>
                        <div className="oc-pct">共有設定・信頼ルール・共有ドライブ・DLP・ラベル</div>
                    </a>
                    <a href="#s23" className="overview-card" style={{ borderTopColor: '#b45309' }}>
                        <div className="oc-num" style={{ color: '#b45309' }}>2.3</div>
                        <div className="oc-title">Google Calendar</div>
                        <div className="oc-pct">リソース管理・予約ポリシー・外部共有設定</div>
                    </a>
                    <a href="#s24" className="overview-card" style={{ borderTopColor: '#7c3aed' }}>
                        <div className="oc-num" style={{ color: '#7c3aed' }}>2.4</div>
                        <div className="oc-title">Google Meet</div>
                        <div className="oc-pct">安全設定・ノックイン・録画・ビデオ設定</div>
                    </a>
                    <a href="#s25" className="overview-card" style={{ borderTopColor: '#0891b2' }}>
                        <div className="oc-num" style={{ color: '#0891b2' }}>2.5</div>
                        <div className="oc-title">Google Chat</div>
                        <div className="oc-pct">履歴・外部共有・招待制限・モデレーション</div>
                    </a>
                    <a href="#s26" className="overview-card" style={{ borderTopColor: '#dc2626' }}>
                        <div className="oc-num" style={{ color: '#dc2626' }}>2.6</div>
                        <div className="oc-title">Gemini AI</div>
                        <div className="oc-pct">データプライバシー・有効化・拡張機能設定</div>
                    </a>
                </div>

                {/*  ============================
     SECTION 2.1: GMAIL
     ============================  */}
                <div className="section-card" id="s21">
                    <div className="section-header" >
                        <span className="section-num">2.1</span>
                        <span className="section-title">Gmail の設定</span>
                        <span className="section-exam-weight">試験頻出度 ★★★★★</span>
                        <span className="chevron open">▾</span>
                    </div>
                    <div className="section-body open">
                        {/*  MX RECORDS  */}
                        <div className="topic" id="mx">
                            <div className="topic-title">MX レコード — メール配送の入口</div>
                            <p>
                                MX（Mail
                                Exchanger）レコードは、外部サーバーに「このドメイン宛のメールをどこに届けるか」を伝えるDNSレコードです。Google
                                Workspace で Gmail を使う際の最初のステップです。
                            </p>

                            <div className="flow">
                                <div className="flow-item">外部メールサーバー</div>
                                <div className="flow-arrow">→</div>
                                <div className="flow-item">DNS でMXを照会</div>
                                <div className="flow-arrow">→</div>
                                <div className="flow-item">Googleサーバー発見</div>
                                <div className="flow-arrow">→</div>
                                <div className="flow-item">Gmail受信箱に配信</div>
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>設定方式</th>
                                    <th>優先度</th>
                                    <th>メールサーバー（Value）</th>
                                    <th>推奨</th>
                                </tr>
                                <tr>
                                    <td rowSpan={1}>
                                        <span className="tag tag-green">新しい推奨設定</span>
                                    </td>
                                    <td>1</td>
                                    <td><code>smtp.google.com</code></td>
                                    <td>✅ 現在の推奨</td>
                                </tr>
                                <tr>
                                    <td rowSpan={5}>
                                        <span className="tag tag-amber">レガシー互換設定</span>
                                    </td>
                                    <td>1</td>
                                    <td><code>ASPMX.L.GOOGLE.COM</code></td>
                                    <td rowSpan={5}>既存環境で使用中の場合は維持可</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><code>ALT1.ASPMX.L.GOOGLE.COM</code></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><code>ALT2.ASPMX.L.GOOGLE.COM</code></td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td><code>ALT3.ASPMX.L.GOOGLE.COM</code></td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td><code>ALT4.ASPMX.L.GOOGLE.COM</code></td>
                                </tr>
                            </table>

                            <div className="callout warning">
                                <div className="callout-icon">⚠ 注意</div>
                                MXレコード変更後、DNS伝播には最大
                                <strong>72時間</strong>
                                かかります。移行時は旧MXレコードを保持したまま新設定を追加し、動作確認後に旧レコードを削除してください。
                            </div>

                            <div className="callout info">
                                <div className="callout-icon">🔧 確認ツール</div>
                                設定後は
                                <a
                                    href="https://toolbox.googleapps.com/apps/checkmx/"
                                    target="_blank"
                                    >Admin Toolbox MX チェッカー</a
                                >
                                で正しく設定されているか確認しましょう。
                            </div>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>段階的移行を実施する</strong> —
                                        切り替え前にTTLを下げ（例：300秒）、旧レコードを保持したままGoogleのMXを追加して動作確認後に旧レコードを削除する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>Admin Toolboxで定期確認</strong> —
                                        MXレコードの設定は変更されることがあるため、定期的にツールで検証する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>移行後は旧MXを必ず削除</strong> —
                                        古いMXレコードが残るとセキュリティリスクと不要な遅延が生じる
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  ROUTING  */}
                        <div className="topic" id="routing">
                            <div className="topic-title">
                                高度なメールルーティング — 分割配信・二重配信
                            </div>
                            <p>
                                組織の移行フェーズや複数システム運用時に、メールのトラフィックを適切なサーバーに振り分ける設定です。
                            </p>

                            <div className="compare-grid">
                                <div
                                    className="compare-card compare-bad"
                                    style={{ border: '1px solid var(--border)' }}
                                >
                                    <div
                                        className="compare-card-header"
                                        style={{ background: 'var(--accent-blue-bg)', color: 'var(--accent-blue)', borderBottom: '1px solid var(--accent-blue-border)' }}
                                    >
                                        分割配信（Split Delivery）
                                    </div>
                                    <div className="compare-card-body">
                                        <p
                                            style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}
                                        >
                                            Google
                                            サーバーで受信後、宛先ユーザーの存在に応じて配信先を振り分け
                                        </p>
                                        <ul style={{ fontSize: '13px', paddingLeft: '1.25rem' }}>
                                            <li>Google ユーザー → Gmail に配信</li>
                                            <li>
                                                Google に存在しないユーザー → レガシーサーバーへ転送
                                            </li>
                                            <li>
                                                <strong>用途:</strong>
                                                段階的移行、特定部署のみオンプレミス継続
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    className="compare-card compare-good"
                                    style={{ border: '1px solid var(--border)' }}
                                >
                                    <div
                                        className="compare-card-header"
                                        style={{ background: 'var(--accent-purple-bg)', color: 'var(--accent-purple)', borderBottom: '1px solid var(--accent-purple-border)' }}
                                    >
                                        二重配信（Dual Delivery）
                                    </div>
                                    <div className="compare-card-body">
                                        <p
                                            style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}
                                        >
                                            全メールを Gmail と外部サーバーの両方に同時配信
                                        </p>
                                        <ul style={{ fontSize: '13px', paddingLeft: '1.25rem' }}>
                                            <li>移行前の並行稼働テストに最適</li>
                                            <li>サードパーティアーカイブへの全件転送</li>
                                            <li>
                                                <strong>用途:</strong>
                                                移行テスト、コンプライアンスアーカイブ
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <p
                                style={{ fontWeight: '600', fontSize: '13px', marginTop: '1rem', marginBottom: '0.5rem' }}
                            >
                                分割配信の設定手順
                            </p>
                            <div className="steps">
                                <div className="step">
                                    <div className="step-n">1</div>
                                    <div className="step-body">
                                        <strong>ホストを登録</strong>
                                        管理コンソール → アプリ → Google Workspace → Gmail → ホスト
                                        から転送先の外部サーバー（FQDN または IP）を登録
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">2</div>
                                    <div className="step-body">
                                        <strong>ルーティングルールを作成</strong>
                                        Gmail → ルーティング → 新しいルールを追加 →
                                        対象を「受信」に設定
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">3</div>
                                    <div className="step-body">
                                        <strong>アクションを設定</strong>
                                        「メッセージを変更」→「ルートを変更」→
                                        手順1で作成したホストを選択
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">4</div>
                                    <div className="step-body">
                                        <strong>フィルターを適用</strong>
                                        Googleに存在しないアカウント（Catch-all）のみを転送対象にするようフィルタリングを設定
                                    </div>
                                </div>
                            </div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace → Gmail →
                                <strong>ルーティング</strong>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  SPF DKIM DMARC  */}
                        <div className="topic" id="spf-dkim-dmarc">
                            <div className="topic-title">
                                ★最重要★ メール認証：SPF・DKIM・DMARC の完全理解
                            </div>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験最頻出トピック</div>
                                SPF・DKIM・DMARC
                                は試験で最も頻出するトピックです。それぞれの役割の違い、設定手順、DMARC
                                の段階的導入を完全に理解してください。
                            </div>

                            <p style={{ fontWeight: '600', fontSize: '14px', marginTop: '1rem' }}>
                                SPF（Sender Policy Framework）
                            </p>
                            <p>
                                「このドメインからメールを送信できるサーバーはここです」とDNSに宣言する仕組み。なりすましメールの送信元IP偽装を防ぎます。
                            </p>

                            <div className="code-block">
                                <span className="comment"># Gmail のみを使う場合（最もシンプル）</span>
                                <span className="key">v</span>=<span className="val">spf1</span>
                                <span className="key">include</span>:<span className="val"
                                    >_spf.google.com</span
                                >
                                <span className="op">~all</span>

                                <span className="comment"
                                    ># Gmail + Salesforce など複数サービスを使う場合</span
                                >
                                <span className="key">v</span>=<span className="val">spf1</span>
                                <span className="key">include</span>:<span className="val"
                                    >_spf.google.com</span
                                >
                                <span className="key">include</span>:<span className="val"
                                    >_spf.salesforce.com</span
                                >
                                <span className="op">~all</span>

                                <span className="comment"># 終端ポリシーの意味</span>
                                <span className="op">-all</span> → FAIL（厳格に拒否）
                                <span className="op">~all</span> → SOFTFAIL（スパム扱い）← 移行期に推奨
                                <span className="op">?all</span> → NEUTRAL（何もしない）
                            </div>

                            <div className="callout warning">
                                <div className="callout-icon">⚠ SPF の制限</div>
                                SPFレコードには
                                <strong>最大10回のDNS参照</strong>
                                という制限があります。Mailchimp、Salesforce
                                など複数のサードパーティサービスを追加しすぎると上限を超えてしまいます。
                            </div>

                            <p style={{ fontWeight: '600', fontSize: '14px', marginTop: '1.25rem' }}>
                                DKIM（DomainKeys Identified Mail）
                            </p>
                            <p>
                                送信メールにデジタル署名を付与し、「本当にそのドメインから送られており、改ざんされていない」ことを保証します。
                            </p>

                            <div className="code-block">
                                <span className="comment"># DNS に追加する TXT レコード（例）</span>
                                <span className="comment"
                                    ># ホスト名: google._domainkey.example.com</span
                                >
                                <span className="key">v</span>=<span className="val">DKIM1</span>;
                                <span className="key">k</span>=<span className="val">rsa</span>;
                                <span className="key">p</span>=<span className="val">MIGfMA0GCSQ...</span>
                                <span className="comment">(公開鍵)</span>
                            </div>

                            <p style={{ fontWeight: '600', fontSize: '13px', marginTop: '0.75rem' }}>
                                DKIM 設定手順：
                            </p>
                            <div className="steps">
                                <div className="step">
                                    <div className="step-n">1</div>
                                    <div className="step-body">
                                        <strong>鍵を生成</strong> — 管理コンソール → Gmail →
                                        メールの認証 → DKIM キーを生成（2048ビット推奨）
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">2</div>
                                    <div className="step-body">
                                        <strong>DNS に追加</strong> —
                                        生成されたTXTレコードをDNSレジストラで
                                        <code>google._domainkey.ドメイン名</code> に登録
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">3</div>
                                    <div className="step-body">
                                        <strong>署名を開始</strong> — 管理コンソールに戻り「DKIM
                                        を開始」をクリック
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">4</div>
                                    <div className="step-body">
                                        <strong>動作確認</strong> — Admin Toolbox
                                        でDKIMが正しく機能しているか確認
                                    </div>
                                </div>
                            </div>

                            <p style={{ fontWeight: '600', fontSize: '14px', marginTop: '1.25rem' }}>
                                DMARC（Domain-based Message Authentication, Reporting, and
                                Conformance）
                            </p>
                            <p>
                                SPFとDKIMの検証失敗時の処理ポリシーを受信サーバーに伝え、レポートを受け取る仕組みです。
                            </p>

                            <div className="code-block">
                                <span className="comment"># フェーズ1: 監視（最初に設定）</span>
                                <span className="key">v</span>=<span className="val">DMARC1</span>;
                                <span className="key">p</span>=<span className="val">none</span>;
                                <span className="key">rua</span>=<span className="val"
                                    >mailto:dmarc-reports@example.com</span
                                >

                                <span className="comment"
                                    ># フェーズ2: 隔離モード（段階的に適用割合を増やす）</span
                                >
                                <span className="key">v</span>=<span className="val">DMARC1</span>;
                                <span className="key">p</span>=<span className="val">quarantine</span>;
                                <span className="key">pct</span>=<span className="val">10</span>;
                                <span className="key">rua</span>=<span className="val"
                                    >mailto:dmarc-reports@example.com</span
                                >
                                <span className="key">v</span>=<span className="val">DMARC1</span>;
                                <span className="key">p</span>=<span className="val">quarantine</span>;
                                <span className="key">pct</span>=<span className="val">100</span>;
                                <span className="key">rua</span>=<span className="val"
                                    >mailto:dmarc-reports@example.com</span
                                >

                                <span className="comment"># フェーズ3: 完全拒否（最終目標）</span>
                                <span className="key">v</span>=<span className="val">DMARC1</span>;
                                <span className="key">p</span>=<span className="val">reject</span>;
                                <span className="key">pct</span>=<span className="val">100</span>;
                                <span className="key">rua</span>=<span className="val"
                                    >mailto:dmarc-reports@example.com</span
                                >
                            </div>

                            <table className="data-table" style={{ marginTop: '0.75rem' }}>
                                <tr>
                                    <th>ポリシー(p=)</th>
                                    <th>意味</th>
                                    <th>認証失敗時の動作</th>
                                    <th>推奨フェーズ</th>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-amber">none</span></td>
                                    <td>監視のみ</td>
                                    <td>何もしない（レポートのみ）</td>
                                    <td>Phase 1（1〜2週間）</td>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-blue">quarantine</span></td>
                                    <td>隔離</td>
                                    <td>スパムフォルダに移動</td>
                                    <td>Phase 2（段階的拡大）</td>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-green">reject</span></td>
                                    <td>拒否</td>
                                    <td>メールを完全に拒否</td>
                                    <td>Phase 3（最終目標）</td>
                                </tr>
                            </table>

                            <div className="callout danger">
                                <div className="callout-icon">❌ アンチパターン</div>
                                DMARC を最初から
                                <code>p=reject</code>
                                に設定するのは危険です。SPFに含まれていない正規の送信サービスからのメールまでブロックされてしまいます。必ず
                                <strong>p=none で監視 → 段階的に強化</strong> してください。
                            </div>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>三点セットで設定する</strong> — SPF・DKIM・DMARC
                                        は必ず3つセットで設定。1つや2つだけでは完全な認証にならない
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>DMARC は段階的に導入</strong> — p=none →
                                        p=quarantine（pct=10→100）→ p=reject の順に進める
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>DMARC レポートを分析ツールで可視化</strong> —
                                        Postmark、dmarcian 等のツールを使いレポートを解析する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">4</div>
                                    <p>
                                        <strong>サードパーティサービスを SPF に含める</strong> —
                                        Salesforce、Mailchimp 等のIPも忘れずSPFに追加する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">5</div>
                                    <p>
                                        <strong>DKIM キーは 2048 ビットを使用</strong> —
                                        1024ビットより安全。年1回のローテーションも推奨
                                    </p>
                                </div>
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/33786"
                                            target="_blank"
                                            >SPF の設定 — Google Workspace Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/174124"
                                            target="_blank"
                                            >DKIM の設定 — Google Workspace Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/2466580"
                                            target="_blank"
                                            >DMARC の設定 — Google Workspace Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://toolbox.googleapps.com/apps/checkmx/"
                                            target="_blank"
                                            >Admin Toolbox — MX/SPF/DKIM チェッカー</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  SPAM PHISHING  */}
                        <div className="topic" id="spam">
                            <div className="topic-title">スパム・フィッシング・マルウェア対策設定</div>
                            <p>
                                Gmail
                                は多層的なセキュリティフィルタリングを提供しています。管理者はこれらの設定を組み合わせて防御を強化します。
                            </p>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace → Gmail →
                                <strong>スパム、フィッシング、マルウェア</strong>
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>設定名</th>
                                    <th>機能</th>
                                    <th>推奨設定</th>
                                </tr>
                                <tr>
                                    <td>スパムフィルタ強化</td>
                                    <td>迷惑メールの検出強度</td>
                                    <td>「強化されたスパム対策」を有効化</td>
                                </tr>
                                <tr>
                                    <td>メールの許可リスト</td>
                                    <td>常に受信箱に届けるメールアドレス/ドメイン</td>
                                    <td>信頼できるビジネスパートナーのみ登録。過度な登録はNG</td>
                                </tr>
                                <tr>
                                    <td>IP 許可リスト</td>
                                    <td>特定IPからのメールをスパムフィルタ免除</td>
                                    <td>受信ゲートウェイのIPのみ登録</td>
                                </tr>
                                <tr>
                                    <td>ブロックリスト</td>
                                    <td>特定のアドレス・ドメインをブロック</td>
                                    <td>スパム送信者、不審なドメイン</td>
                                </tr>
                                <tr>
                                    <td>フィッシング対策</td>
                                    <td>偽サイトへのリンク検出、なりすまし検出</td>
                                    <td>まず「警告表示」から始め、誤検知確認後に「隔離」へ</td>
                                </tr>
                            </table>

                            <div className="callout warning">
                                <div className="callout-icon">
                                    ⚠ 許可リストとIP許可リストの違い（試験頻出）
                                </div>
                                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                                    <li>
                                        <strong>Email Allowlist（メール許可リスト）</strong
                                        >：特定のIPから送られたメールをスパムフィルタをスキップして受信箱へ届ける
                                    </li>
                                    <li>
                                        <strong>IP Allowlist（IP許可リスト）</strong
                                        >：受信ゲートウェイとして機能するIPを登録。このIPを経由したメールは「既にスパムチェック済み」と認識され、スパム分類が緩和される（完全スキップではない）
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  COMPLIANCE FOOTER & QUARANTINE  */}
                        <div className="topic" id="compliance-footer">
                            <div className="topic-title">
                                コンプライアンスフッター・メール隔離・コンテンツコンプライアンス
                            </div>

                            <p>
                                <strong>コンプライアンスフッター</strong
                                >は送信メールに自動的に法的免責事項などのテキストを追加する機能です。組織部門（OU）ごとにカスタマイズ可能です。
                            </p>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → Gmail → <strong>コンプライアンス</strong> →
                                コンプライアンスフッター / メールの隔離 / コンテンツコンプライアンス
                            </div>

                            <p
                                style={{ fontWeight: '600', fontSize: '13px', marginTop: '1rem', marginBottom: '0.5rem' }}
                            >
                                コンテンツコンプライアンスルール — できること
                            </p>
                            <table className="data-table">
                                <tr>
                                    <th>条件</th>
                                    <th>アクション</th>
                                    <th>実例</th>
                                </tr>
                                <tr>
                                    <td>件名・本文・添付ファイルに特定キーワード/正規表現を含む</td>
                                    <td>メールを拒否</td>
                                    <td>「社外秘」を含む送信メールを組織外にブロック</td>
                                </tr>
                                <tr>
                                    <td>特定の添付ファイルタイプ（.exe等）</td>
                                    <td>隔離（管理者レビュー）</td>
                                    <td>実行ファイルを管理者承認なしに受信不可にする</td>
                                </tr>
                                <tr>
                                    <td>送信先が特定ドメイン</td>
                                    <td>BCC コピーを追加</td>
                                    <td>競合企業ドメインへの送信をコンプライアンス担当にCC</td>
                                </tr>
                                <tr>
                                    <td>特定パターンのメッセージ</td>
                                    <td>ヘッダー変更・転送</td>
                                    <td>カスタムヘッダーの追加</td>
                                </tr>
                            </table>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>隔離機能を活用</strong> —
                                        単純なブロックではなく隔離にすることで、誤検知時に管理者が判断して解放できる
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>OU ごとにフッターをカスタマイズ</strong> —
                                        営業部門には促進情報、法務部門には守秘義務条項を自動付与する
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  SECURITY SANDBOX  */}
                        <div className="topic" id="sandbox">
                            <div className="topic-title">
                                セキュリティサンドボックス — 未知のマルウェアを仮想環境で検出
                            </div>
                            <p>
                                標準のウイルス対策を回避するゼロデイマルウェアを、添付ファイルを仮想環境で実際に実行することで動的に検出します。
                            </p>

                            <div className="callout warning">
                                <div className="callout-icon">⚠ エディション要件</div>
                                セキュリティサンドボックスは
                                <strong>Business Standard 以上</strong>
                                のエディションで利用可能です。試験でエディションが記載されている問題に注意してください。
                            </div>

                            <div className="steps">
                                <div className="step">
                                    <div className="step-n">1</div>
                                    <div className="step-body">
                                        <strong>有効化</strong> — 管理コンソール → Gmail →
                                        スパム、フィッシング、マルウェア →
                                        セキュリティサンドボックス を ON
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">2</div>
                                    <div className="step-body">
                                        <strong>スキャン対象の設定</strong> — 全ての添付ファイル対象
                                        OR 特定ルール（不審送信元・特定拡張子）に限定
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="step-n">3</div>
                                    <div className="step-body">
                                        <strong>注意点</strong> —
                                        スキャン完了まで数分かかる場合がある。業務スピードとのバランスを考慮して設定
                                    </div>
                                </div>
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/gmail/advanced/gmail-security-sandbox-overview"
                                            target="_blank"
                                            >Gmail Security Sandbox overview — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/2368132"
                                            target="_blank"
                                            >スパム・フィッシング・マルウェア設定 — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/174125"
                                            target="_blank"
                                            >MX レコードの設定 — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/gmail/advanced/email-routing-and-delivery-options-for-google-workspace"
                                            target="_blank"
                                            >メールルーティングオプション — Workspace Help</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  /section-body  */}
                </div>
                {/*  /section-card  */}

                {/*  ============================
     SECTION 2.2: DRIVE & DOCS
     ============================  */}
                <div className="section-card" id="s22">
                    <div className="section-header" >
                        <span className="section-num">2.2</span>
                        <span className="section-title">Google Drive と Docs の設定</span>
                        <span className="section-exam-weight">試験頻出度 ★★★★☆</span>
                        <span className="chevron open">▾</span>
                    </div>
                    <div className="section-body open">
                        {/*  SHARING SETTINGS  */}
                        <div className="topic" id="sharing">
                            <div className="topic-title">共有設定の階層と外部共有制御</div>
                            <p>
                                Drive
                                の共有設定は階層構造になっており、上位の設定が下位を継承（上書きも可）します。
                            </p>

                            <div
                                className="flow"
                                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div
                                        className="flow-item"
                                        style={{ background: 'var(--accent-blue-bg)', borderColor: 'var(--accent-blue-border)', color: 'var(--accent-blue)' }}
                                    >
                                        管理コンソール（最上位ポリシー）
                                    </div>
                                </div>
                                <div style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
                                    ↓ 継承または上書き
                                </div>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '20px' }}
                                >
                                    <div className="flow-item">OU 単位の設定</div>
                                </div>
                                <div style={{ paddingLeft: '40px', color: 'var(--text-muted)' }}>
                                    ↓ 継承または上書き
                                </div>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '40px' }}
                                >
                                    <div className="flow-item">共有ドライブの設定</div>
                                </div>
                                <div style={{ paddingLeft: '60px', color: 'var(--text-muted)' }}>
                                    ↓ 管理者が許可した範囲内
                                </div>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '60px' }}
                                >
                                    <div className="flow-item" style={{ background: 'var(--surface2)' }}>
                                        ユーザー個人の設定
                                    </div>
                                </div>
                            </div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>Drive と Docs</strong> → 共有設定
                            </div>

                            <table className="data-table" style={{ marginTop: '0.75rem' }}>
                                <tr>
                                    <th>設定項目</th>
                                    <th>選択肢</th>
                                    <th>セキュリティ推奨</th>
                                </tr>
                                <tr>
                                    <td>外部共有</td>
                                    <td>許可 / 禁止 / ドメイン限定</td>
                                    <td>部門OU ごとに制御。財務・法務は禁止推奨</td>
                                </tr>
                                <tr>
                                    <td>新規ファイルのデフォルト共有</td>
                                    <td>制限付き / リンクを知っている組織内全員</td>
                                    <td>「制限付き（組織内のみ）」がセキュアなデフォルト</td>
                                </tr>
                                <tr>
                                    <td>リンク付きで共有</td>
                                    <td>「リンクを知っている全員」許可/禁止</td>
                                    <td>機密情報部門は「禁止」</td>
                                </tr>
                                <tr>
                                    <td>ドメイン外への一般公開</td>
                                    <td>許可 / 禁止</td>
                                    <td>原則禁止（特定部門のみ許可）</td>
                                </tr>
                            </table>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験ポイント</div>
                                OU
                                ごとに異なる外部共有ポリシーを適用したい場合は、ルート組織でデフォルトを設定し、特定OUで「上書き（Override）」を使って個別設定します。
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  TRUST RULES  */}
                        <div className="topic" id="trust-rules">
                            <div className="topic-title">
                                Drive 信頼ルール（Trust Rules）— 精密な外部共有制御
                            </div>
                            <p>
                                通常の共有設定より細粒度のアクセス制御が必要な場合に使用するエンタープライズ機能です。
                            </p>

                            <div className="callout warning">
                                <div className="callout-icon">⚠ エディション要件</div>
                                信頼ルールは <strong>Enterprise エディション</strong> が必要です。
                            </div>

                            <div className="compare-grid">
                                <div className="compare-card" style={{ border: '1px solid var(--border)' }}>
                                    <div
                                        className="compare-card-header"
                                        style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}
                                    >
                                        通常の共有設定
                                    </div>
                                    <div className="compare-card-body">
                                        <ul style={{ fontSize: '13px', paddingLeft: '1.25rem' }}>
                                            <li>「組織外への共有を許可/禁止」</li>
                                            <li>おおまかな制御のみ</li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    className="compare-card"
                                    style={{ border: '1px solid var(--accent-blue-border)' }}
                                >
                                    <div
                                        className="compare-card-header"
                                        style={{ background: 'var(--accent-blue-bg)', color: 'var(--accent-blue)', borderBottom: '1px solid var(--accent-blue-border)' }}
                                    >
                                        Trust Rules（精密制御）
                                    </div>
                                    <div className="compare-card-body">
                                        <ul style={{ fontSize: '13px', paddingLeft: '1.25rem' }}>
                                            <li>「営業OU は partner.com のみ共有可」</li>
                                            <li>「人事OU は外部共有一切禁止」</li>
                                            <li>OU・グループ・特定ドメイン単位で設定</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → Drive と Docs → <strong>信頼ルール</strong> →
                                ルールを作成
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  SHARED DRIVES  */}
                        <div className="topic" id="shared-drives">
                            <div className="topic-title">共有ドライブ（Shared Drives）の管理</div>
                            <p>
                                マイドライブとの最大の違いは「ファイルの帰属」です。共有ドライブは組織所有のため、メンバーが退職してもファイルは失われません。
                            </p>

                            <table className="data-table">
                                <tr>
                                    <th>比較項目</th>
                                    <th>マイドライブ</th>
                                    <th>共有ドライブ</th>
                                </tr>
                                <tr>
                                    <td>ファイルの帰属</td>
                                    <td>個人ユーザー</td>
                                    <td>組織（チーム）</td>
                                </tr>
                                <tr>
                                    <td>退職時の影響</td>
                                    <td>⚠ ファイルが失われる危険</td>
                                    <td>✅ ファイルはそのまま残る</td>
                                </tr>
                                <tr>
                                    <td>アクセス管理</td>
                                    <td>ユーザー個人</td>
                                    <td>管理者またはマネージャー</td>
                                </tr>
                                <tr>
                                    <td>用途</td>
                                    <td>個人ファイル</td>
                                    <td>チームの共有資料・プロジェクト</td>
                                </tr>
                            </table>

                            <p
                                style={{ fontWeight: '600', fontSize: '13px', marginTop: '1rem', marginBottom: '0.5rem' }}
                            >
                                共有ドライブの権限レベル（試験頻出）
                            </p>
                            <table className="data-table">
                                <tr>
                                    <th>役割</th>
                                    <th>できること</th>
                                    <th>推奨対象</th>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-red">マネージャー</span></td>
                                    <td>メンバー管理・設定変更・全ファイル操作</td>
                                    <td>チームリーダー、IT管理担当者</td>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-amber">コンテンツ管理者</span></td>
                                    <td>追加・編集・削除・移動（メンバー管理不可）</td>
                                    <td>プロジェクトのメインメンバー（デフォルト推奨）</td>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-blue">投稿者</span></td>
                                    <td>追加・編集のみ（削除・移動不可）</td>
                                    <td>外部協力者、一般メンバー</td>
                                </tr>
                                <tr>
                                    <td><span className="tag tag-purple">コメント投稿者</span></td>
                                    <td>閲覧・コメントのみ</td>
                                    <td>レビュー担当者</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span
                                            className="tag tag-green"
                                            style={{ background: 'var(--surface2)', color: 'var(--text-muted)', borderColor: 'var(--border)' }}
                                            >閲覧者</span
                                        >
                                    </td>
                                    <td>閲覧のみ</td>
                                    <td>参照のみの他部署ユーザー</td>
                                </tr>
                            </table>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験ポイント</div>
                                外部ユーザーを共有ドライブに招待する際は「投稿者」以下の権限に留め、ファイルの削除・移動を防ぐことがベストプラクティスです。
                            </div>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>マイドライブより共有ドライブを推奨</strong> —
                                        チームの業務ファイルは共有ドライブで管理し、退職時の引き継ぎ問題を根本解決する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>外部ユーザーは「投稿者」以下に設定</strong> —
                                        削除・移動権限を与えない。ファイル単体での共有も活用する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>定期的に共有ドライブの監査を実施</strong> —
                                        管理コンソール → 共有ドライブを管理
                                        から不要なメンバーやアクセス権を確認・削除
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/*  DLP & LABELS  */}
                        <div className="topic" id="dlp">
                            <div className="topic-title">
                                DLP（データ損失防止）と Drive ラベルの統合
                            </div>
                            <p>
                                DLP
                                ポリシーはドライブのドキュメントをリアルタイムでスキャンし、機密情報の検出とアクションを自動化します。
                            </p>

                            <table className="data-table">
                                <tr>
                                    <th>DLP ルールの構成要素</th>
                                    <th>選択肢</th>
                                    <th>例</th>
                                </tr>
                                <tr>
                                    <td>スキャン対象</td>
                                    <td>組織全体 / 特定OU / グループ</td>
                                    <td>財務部門OU のドキュメント</td>
                                </tr>
                                <tr>
                                    <td>検出条件</td>
                                    <td>事前定義検出器 / 正規表現（Regex）</td>
                                    <td>クレジットカード番号、マイナンバー</td>
                                </tr>
                                <tr>
                                    <td>アクション</td>
                                    <td>共有ブロック / 警告表示 / 監査ログ記録</td>
                                    <td>「このファイルには機密情報が含まれます」と警告</td>
                                </tr>
                            </table>

                            <p style={{ fontWeight: '600', fontSize: '13px', marginTop: '1rem' }}>
                                Drive ラベル — DLP との連携
                            </p>
                            <p>
                                ラベルはファイルに分類情報（機密レベルなど）を付与し、DLP・Vault・検索と連携します。
                            </p>

                            <table className="data-table">
                                <tr>
                                    <th>ラベル例</th>
                                    <th>値の例</th>
                                    <th>使用場面</th>
                                </tr>
                                <tr>
                                    <td>機密レベル</td>
                                    <td>公開 / 社内限 / 機密 / 極秘</td>
                                    <td>情報管理ポリシーの自動適用</td>
                                </tr>
                                <tr>
                                    <td>プロジェクト</td>
                                    <td>Project-A / Project-B</td>
                                    <td>プロジェクト別の分類と検索</td>
                                </tr>
                                <tr>
                                    <td>ステータス</td>
                                    <td>ドラフト / 承認待ち / 承認済み</td>
                                    <td>承認ワークフロー管理</td>
                                </tr>
                            </table>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → Drive と Docs → <strong>ラベル</strong> →
                                ラベルを作成
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/drive/manage-shared-drives-as-an-admin"
                                            target="_blank"
                                            >共有ドライブの管理 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/security/create-and-manage-trust-rules-for-drive-sharing"
                                            target="_blank"
                                            >Drive 信頼ルールの作成と管理 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/9292382"
                                            target="_blank"
                                            >Drive ラベルの管理 — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/9934697"
                                            target="_blank"
                                            >ターゲットオーディエンス — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/60781"
                                            target="_blank"
                                            >外部共有の管理 — Admin Help</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ============================
     SECTION 2.3: CALENDAR
     ============================  */}
                <div className="section-card" id="s23">
                    <div className="section-header" >
                        <span className="section-num">2.3</span>
                        <span className="section-title">Google Calendar の設定</span>
                        <span className="section-exam-weight">試験頻出度 ★★★☆☆</span>
                        <span className="chevron open">▾</span>
                    </div>
                    <div className="section-body open">
                        {/*  RESOURCES  */}
                        <div className="topic" id="resources">
                            <div className="topic-title">リソースカレンダーの作成と管理</div>
                            <p>
                                会議室、設備、車などの物理的なリソースをカレンダーで予約・管理できます。構造化されたリソース設定がベストプラクティスです。
                            </p>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → ディレクトリ → <strong>建物とリソース</strong> →
                                建物/リソースを追加
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>設定要素</th>
                                    <th>内容</th>
                                    <th>重要ポイント</th>
                                </tr>
                                <tr>
                                    <td>建物（Buildings）</td>
                                    <td>会議室が存在する拠点情報</td>
                                    <td>正確な住所を入力するとルームインサイトで地理分析が可能</td>
                                </tr>
                                <tr>
                                    <td>機能（Features）</td>
                                    <td>リソースの特徴タグ</td>
                                    <td>大型モニター、車椅子対応、TV会議システム搭載 など</td>
                                </tr>
                                <tr>
                                    <td>リソース（Resources）</td>
                                    <td>実際の会議室名・備品名</td>
                                    <td>建物と機能に関連付け。キャパシティも正確に入力</td>
                                </tr>
                            </table>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>命名規則を統一する</strong> —
                                        [拠点名]-[階数]-[部屋名]（例：TK-3F-RoomA）のように、一目で場所がわかる名称にする
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>キャパシティを正確に入力</strong> —
                                        収容人数を入力すると「Find a
                                        time」機能が参加人数に最適な部屋を自動提案できる
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>ルームインサイトを活用</strong> — 管理コンソール →
                                        建物とリソース → インサイト
                                        で利用率が低い部屋や満室が多い拠点を特定
                                    </p>
                                </div>
                            </div>

                            <p
                                style={{ fontWeight: '600', fontSize: '13px', marginTop: '1rem', marginBottom: '0.5rem' }}
                            >
                                予約承認フローの種類
                            </p>
                            <table className="data-table">
                                <tr>
                                    <th>承認タイプ</th>
                                    <th>仕組み</th>
                                    <th>用途</th>
                                </tr>
                                <tr>
                                    <td>自動承認</td>
                                    <td>予約者 → 即時確定</td>
                                    <td>一般会議室</td>
                                </tr>
                                <tr>
                                    <td>手動承認</td>
                                    <td>予約者 → リソースオーナーが承認/拒否</td>
                                    <td>役員室、高価な機材</td>
                                </tr>
                                <tr>
                                    <td>特定ユーザーのみ自動</td>
                                    <td>承認不要ユーザー:即時 / その他:承認フロー</td>
                                    <td>ハイブリッド運用</td>
                                </tr>
                            </table>
                        </div>

                        <hr className="divider" />

                        {/*  CALENDAR SHARING  */}
                        <div className="topic" id="cal-sharing">
                            <div className="topic-title">カレンダー共有設定と外部共有</div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>Calendar</strong> → 共有設定
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>外部共有設定レベル</th>
                                    <th>説明</th>
                                    <th>推奨</th>
                                </tr>
                                <tr>
                                    <td>外部との共有なし</td>
                                    <td>組織外の誰にも予定情報を共有しない</td>
                                    <td>機密性が高い組織向け</td>
                                </tr>
                                <tr>
                                    <td>空き時間のみ共有</td>
                                    <td>予定の詳細は非公開、空き/予定ありのみ</td>
                                    <td>✅ デフォルト推奨</td>
                                </tr>
                                <tr>
                                    <td>すべての予定詳細を共有</td>
                                    <td>組織外のユーザーにも予定詳細が見える</td>
                                    <td>特定部門のみ</td>
                                </tr>
                                <tr>
                                    <td>一般公開</td>
                                    <td>公開URLでカレンダーを公開</td>
                                    <td>⚠ 原則非推奨（会議タイトルが公開されるリスク）</td>
                                </tr>
                            </table>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験ポイント</div>
                                外部共有のデフォルト推奨は
                                <strong>「空き時間のみ表示（詳細は非公開）」</strong>
                                です。「一般公開」設定では「A社買収に関する会議」などの機密情報が外部に漏れる可能性があります。
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/calendar/create-buildings-features-and-calendar-resources"
                                            target="_blank"
                                            >建物・機能・リソースの作成 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/60765"
                                            target="_blank"
                                            >Calendar の管理設定 — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/60185"
                                            target="_blank"
                                            >外部共有オプション — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://workspace.google.com/blog/productivity-collaboration/three-ways-you-can-optimize-meetings-your-organization-hint-room-matters"
                                            target="_blank"
                                            >ルームインサイトの活用 — Workspace Blog</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ============================
     SECTION 2.4: MEET
     ============================  */}
                <div className="section-card" id="s24">
                    <div className="section-header" >
                        <span className="section-num">2.4</span>
                        <span className="section-title">Google Meet の設定</span>
                        <span className="section-exam-weight">試験頻出度 ★★★☆☆</span>
                        <span className="chevron">▾</span>
                    </div>
                    <div className="section-body">
                        <div className="topic">
                            <div className="topic-title">
                                安全設定（Safety Settings）— 外部参加者の制御
                            </div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>Google Meet</strong> → Meet の安全設定
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>設定名</th>
                                    <th>説明</th>
                                    <th>推奨設定</th>
                                </tr>
                                <tr>
                                    <td><strong>ノックイン（ノックをする）</strong></td>
                                    <td>組織外ユーザーが参加前にホストの承認が必要</td>
                                    <td>✅ 必ず有効化</td>
                                </tr>
                                <tr>
                                    <td>ホストの管理</td>
                                    <td>ホストが参加者をミュート・退出させられる</td>
                                    <td>✅ 有効（特に教育機関・ウェビナーで重要）</td>
                                </tr>
                                <tr>
                                    <td>会議終了時に全員退出</td>
                                    <td>ホスト退出後に残存参加者を自動退出</td>
                                    <td>✅ 有効</td>
                                </tr>
                                <tr>
                                    <td>安全チェック</td>
                                    <td>ユーザーが安全でない状況を報告できる</td>
                                    <td>✅ 有効</td>
                                </tr>
                            </table>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験ポイント（超頻出）</div>
                                外部参加者が無断で会議に入ってくる問題への対策は
                                <strong>ノックイン機能の有効化</strong>
                                です。これが最頻出の問題パターンです。
                            </div>
                        </div>

                        <hr className="divider" />

                        <div className="topic">
                            <div className="topic-title">録画・文字起こし・AI機能の管理</div>

                            <table className="data-table">
                                <tr>
                                    <th>機能</th>
                                    <th>説明</th>
                                    <th>注意点</th>
                                </tr>
                                <tr>
                                    <td>録画の許可</td>
                                    <td>会議の録画を許可するか</td>
                                    <td>録画は主催者のGoogle Driveに自動保存される</td>
                                </tr>
                                <tr>
                                    <td>自動文字起こし（Transcript）</td>
                                    <td>会議音声を自動テキスト化</td>
                                    <td>Business Standard 以上が必要</td>
                                </tr>
                                <tr>
                                    <td>AI ノートテイキング</td>
                                    <td>Gemini が自動的にメモを作成</td>
                                    <td>Gemini対応エディションが必要</td>
                                </tr>
                            </table>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>外部参加者にノックインを必須化</strong> —
                                        不審な参加者の防止に最も効果的な設定
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>録画の保存先を組織の共有ドライブに指定</strong> —
                                        個人ドライブへの散逸を防ぎ、アクセス管理を統一する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>録画後はアクセス権を見直す</strong> —
                                        「リンクを知っている全員」設定のまま放置しないようユーザーに周知
                                    </p>
                                </div>
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/meet/google-meet-security-and-privacy-for-it-admins"
                                            target="_blank"
                                            >Google Meet セキュリティとプライバシー — Workspace
                                            Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/meet/manage-meet-settings"
                                            target="_blank"
                                            >Meet 設定の管理 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/9768550"
                                            target="_blank"
                                            >Meet セーフティ設定 — Admin Help</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ============================
     SECTION 2.5: CHAT
     ============================  */}
                <div className="section-card" id="s25">
                    <div className="section-header" >
                        <span className="section-num">2.5</span>
                        <span className="section-title">Google Chat の設定</span>
                        <span className="section-exam-weight">試験頻出度 ★★★★☆</span>
                        <span className="chevron">▾</span>
                    </div>
                    <div className="section-body">
                        <div className="topic">
                            <div className="topic-title">
                                チャット履歴とコンプライアンス — 最重要設定
                            </div>

                            <div className="callout danger">
                                <div className="callout-icon">❌ 重大なリスク（試験頻出）</div>
                                チャット履歴が <strong>オフ</strong> になっている場合：<br />
                                • メッセージが保存されない<br />
                                • Google Vault での検索・保持ができない（eDiscovery 不可）<br />
                                • DLP（データ損失防止）が機能しない<br />
                                <br />
                                <strong
                                    >法的調査・コンプライアンス要件がある組織では、チャット履歴を必ずオンに設定してください。</strong
                                >
                            </div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>Google Chat</strong> → 設定 → チャット履歴
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>設定名</th>
                                    <th>説明</th>
                                    <th>コンプライアンス要件がある場合</th>
                                </tr>
                                <tr>
                                    <td>チャット履歴</td>
                                    <td>メッセージを保存するか</td>
                                    <td>✅ 必ずオンに固定</td>
                                </tr>
                                <tr>
                                    <td>外部ユーザーとのスペース</td>
                                    <td>組織外ユーザーとのChatスペースへの参加</td>
                                    <td>許可リスト（信頼ドメイン）でのみ許可</td>
                                </tr>
                                <tr>
                                    <td>アプリ（ボット）</td>
                                    <td>Chat への外部アプリの追加</td>
                                    <td>承認済みアプリのみ許可</td>
                                </tr>
                                <tr>
                                    <td>コンテンツのモデレーション</td>
                                    <td>不適切なメッセージの報告・管理</td>
                                    <td>✅ 有効化推奨</td>
                                </tr>
                            </table>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験ポイント</div>
                                「法的調査のため過去のチャットを提出する必要があったが、履歴がオフだったためデータがなかった」というシナリオは試験の典型問題です。予防策として
                                <strong
                                    >チャット履歴をオンに設定し、Vault で保持ルールを設定</strong
                                >
                                することが正解です。
                            </div>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>履歴は必ずオン</strong> —
                                        コンプライアンス要件がある業界では、Chat
                                        履歴をオンに固定し、ユーザーが変更できないようにする
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>外部ドメインは許可リストで管理</strong> —
                                        組織外とのChatは許可リストに登録されたドメインのみに制限する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>Chat アプリは承認制に</strong> —
                                        未承認のアプリを介したデータ流出（シャドーIT）を防ぐため、管理者承認済みアプリのみ許可
                                    </p>
                                </div>
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/chat/set-up-chat-for-your-organization"
                                            target="_blank"
                                            >Chat の設定 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/9540647"
                                            target="_blank"
                                            >Chat の管理設定 — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/14174987"
                                            target="_blank"
                                            >Chat コンテンツのモデレーション — Admin Help</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ============================
     SECTION 2.6: GEMINI AI
     ============================  */}
                <div className="section-card" id="s26">
                    <div className="section-header" >
                        <span className="section-num">2.6</span>
                        <span className="section-title"
                            >生成 AI（Gemini for Workspace）の活用と管理</span
                        >
                        <span className="section-exam-weight">試験頻出度 ★★★★☆</span>
                        <span className="chevron">▾</span>
                    </div>
                    <div className="section-body">
                        <div className="topic">
                            <div className="topic-title">
                                データのプライバシーとセキュリティ — 試験必須知識
                            </div>

                            <div className="callout exam">
                                <div className="callout-icon">🎯 試験最頻出ポイント</div>
                                Gemini for Google Workspace
                                のデータ取り扱いについて、以下の3点を必ず覚えてください。
                            </div>

                            <div className="bp-grid" style={{ gridTemplateColumns: '1fr' }}>
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>組織データをモデル学習に使用しない</strong> —
                                        プロンプトや参照したドキュメントの内容は、組織外の不特定多数が利用するAIモデルのトレーニングには使用されない（無料版Geminiとは異なる）
                                    </p>
                                </div>
                                <div className="bp-card" style={{ marginTop: '0.5rem' }}>
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>既存の権限を完全に尊重する</strong> — Gemini
                                        はユーザーが元々アクセス権を持っていないデータにはアクセスできない。DriveやGmailの既存ACLがそのまま適用される
                                    </p>
                                </div>
                                <div className="bp-card" style={{ marginTop: '0.5rem' }}>
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>エンタープライズグレードのコンプライアンス</strong>
                                        —
                                        ISO認証・SOC監査・FedRAMP等のコンプライアンス基準がGeminiにも適用される
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        <div className="topic">
                            <div className="topic-title">Gemini の有効化と OU 単位での制御</div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>Gemini for Workspace</strong> → [OU を選択] → 機能のON/OFF
                            </div>

                            <table className="data-table">
                                <tr>
                                    <th>部門</th>
                                    <th>推奨設定</th>
                                    <th>理由</th>
                                </tr>
                                <tr>
                                    <td>一般業務部門</td>
                                    <td>✅ 有効</td>
                                    <td>生産性向上、業務効率化</td>
                                </tr>
                                <tr>
                                    <td>法務・コンプライアンス</td>
                                    <td>✅ 有効（ガイドライン策定必須）</td>
                                    <td>契約書レビュー等での活用</td>
                                </tr>
                                <tr>
                                    <td>機密研究部門</td>
                                    <td>⚠ 無効 or 制限</td>
                                    <td>機密情報の保護を優先</td>
                                </tr>
                            </table>

                            <p style={{ fontWeight: '600', fontSize: '13px', marginTop: '1rem' }}>
                                Workspace 拡張機能（Extensions）
                            </p>
                            <p>
                                GeminiアプリがGmail・Drive・Calendar等のWorkspaceデータにアクセスできる機能です。管理者は各サービスへのアクセスをON/OFFで制御できます。
                            </p>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>Gemini 利用ポリシーを策定する</strong> —
                                        特に機密情報の取り扱い方法をユーザーに周知。「生成された回答は必ずファクトチェックする」という文化を醸成
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>段階的ロールアウトを実施</strong> —
                                        パイロットグループ（30〜50名）→
                                        全社展開の順で進め、問題点を早期に発見する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>利用状況レポートを定期確認</strong> — 管理コンソール
                                        → レポート → Gemini
                                        で利用状況を分析し、未使用ユーザーにトレーニングを提供
                                    </p>
                                </div>
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub"
                                            target="_blank"
                                            >Gemini in Workspace プライバシーハブ — Workspace
                                            Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/gemini/set-up-gemini-for-google-workspace"
                                            target="_blank"
                                            >Gemini for Workspace の設定 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.google.com/a/answer/13961526"
                                            target="_blank"
                                            >Gemini の有効化設定 — Admin Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://workspace.google.com/security/ai-privacy/"
                                            target="_blank"
                                            >Generative AI Security, Compliance and Privacy —
                                            Workspace</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ============================
     SECTION 2.7: DEVELOPMENT
     ============================  */}
                <div className="section-card" id="s27">
                    <div className="section-header" >
                        <span className="section-num">2.7</span>
                        <span className="section-title"
                            >Workspace 開発サポート（AppSheet & Apps Script）</span
                        >
                        <span className="section-exam-weight">試験頻出度 ★★☆☆☆</span>
                        <span className="chevron">▾</span>
                    </div>
                    <div className="section-body">
                        <div className="topic">
                            <div className="topic-title">AppSheet と Apps Script の使い分け</div>

                            <div className="compare-grid">
                                <div
                                    className="compare-card"
                                    style={{ border: '1px solid var(--accent-blue-border)' }}
                                >
                                    <div
                                        className="compare-card-header"
                                        style={{ background: 'var(--accent-blue-bg)', color: 'var(--accent-blue)', borderBottom: '1px solid var(--accent-blue-border)' }}
                                    >
                                        AppSheet（ノーコード）
                                    </div>
                                    <div className="compare-card-body">
                                        <p
                                            style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}
                                        >
                                            プログラミング不要でモバイル/Webアプリを構築
                                        </p>
                                        <ul style={{ fontSize: '13px', paddingLeft: '1.25rem' }}>
                                            <li>在庫管理アプリ</li>
                                            <li>現場報告フォームアプリ</li>
                                            <li>経費申請の承認ワークフロー</li>
                                            <li>スプレッドシートベースの簡易CRM</li>
                                        </ul>
                                        <p
                                            style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '0.5rem' }}
                                        >
                                            <strong
                                                >→
                                                エンジニア不要で業務アプリを迅速に作りたい場合</strong
                                            >
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="compare-card"
                                    style={{ border: '1px solid var(--accent-purple-border)' }}
                                >
                                    <div
                                        className="compare-card-header"
                                        style={{ background: 'var(--accent-purple-bg)', color: 'var(--accent-purple)', borderBottom: '1px solid var(--accent-purple-border)' }}
                                    >
                                        Apps Script（ローコード/スクリプト）
                                    </div>
                                    <div className="compare-card-body">
                                        <p
                                            style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}
                                        >
                                            Google Workspace
                                            の機能を拡張・自動化するJavaScriptプラットフォーム
                                        </p>
                                        <ul style={{ fontSize: '13px', paddingLeft: '1.25rem' }}>
                                            <li>Gmail の自動返信・自動分類</li>
                                            <li>Forms 送信後の自動メール通知</li>
                                            <li>定期レポートの自動生成</li>
                                            <li>Admin SDK を使ったユーザー管理の自動化</li>
                                        </ul>
                                        <p
                                            style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '0.5rem' }}
                                        >
                                            <strong
                                                >→ Workspace サービスを API
                                                レベルで拡張・自動化したい場合</strong
                                            >
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        <div className="topic">
                            <div className="topic-title">AppSheet と Apps Script の管理設定</div>

                            <div className="callout info">
                                <div className="callout-icon">📍 設定場所（AppSheet）</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>AppSheet</strong> → [OU 選択] → ON/OFF
                            </div>

                            <div className="callout info" style={{ marginTop: '0.5rem' }}>
                                <div className="callout-icon">📍 設定場所（Apps Script）</div>
                                管理コンソール → アプリ → Google Workspace →
                                <strong>Apps Script</strong> → [OU 選択] → ON/OFF
                            </div>

                            <div className="bp-grid">
                                <div className="bp-card">
                                    <div className="bp-num">1</div>
                                    <p>
                                        <strong>Apps Script のスコープを最小限に</strong> —
                                        「ドメイン全体の委任」を必要とするスクリプトは慎重に審査し、不必要に広いスコープを許可しない
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">2</div>
                                    <p>
                                        <strong>AppSheet のデータソースアクセスを制限</strong> —
                                        機密データを含むスプレッドシートに接続する場合はアクセス権を厳密に設定する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">3</div>
                                    <p>
                                        <strong>Apps Script のトリガーを定期審査</strong> —
                                        不要なトリガーが動作し続けていないか、定期的に監査ログで確認する
                                    </p>
                                </div>
                                <div className="bp-card">
                                    <div className="bp-num">4</div>
                                    <p>
                                        <strong>AppSheet アプリの共有範囲を組織内に限定</strong> —
                                        外部ユーザーへの共有は原則禁止し、必要な場合は承認フローを経る
                                    </p>
                                </div>
                            </div>

                            <div className="sources">
                                <div className="sources-title">📎 公式ソース</div>
                                <ul>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/appsheet/manage-appsheet-in-your-organization"
                                            target="_blank"
                                            >AppSheet の管理 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/users/access/turn-apps-script-on-or-off-for-users"
                                            target="_blank"
                                            >Apps Script の有効化 — Workspace Help</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://knowledge.workspace.google.com/admin/appsheet/control-access-to-appsheet-features"
                                            target="_blank"
                                            >AppSheet 機能へのアクセス制御 — Workspace Help</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ============================
     EXAM CHECKLIST
     ============================  */}
                <div
                    className="section-card"
                    id="checklist"
                    style={{ borderColor: 'var(--accent-purple-border)' }}
                >
                    <div
                        className="section-header"
                        
                        style={{ background: 'var(--accent-purple-bg)' }}
                    >
                        <span
                            className="section-num"
                            style={{ background: 'var(--accent-purple)', color: '#fff', border: 'none' }}
                            >📝</span
                        >
                        <span className="section-title">試験直前チェックリスト — Section 2 全項目</span>
                        <span className="section-exam-weight">合格確認</span>
                        <span className="chevron open">▾</span>
                    </div>
                    <div className="section-body open">
                        <div
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}
                        >
                            <div>
                                <p
                                    style={{ fontWeight: '600', fontSize: '13px', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}
                                >
                                    📧 Gmail（2.1）
                                </p>
                                <div id="checklist-gmail"></div>
                            </div>

                            <div>
                                <p
                                    style={{ fontWeight: '600', fontSize: '13px', color: '#059669', marginBottom: '0.5rem' }}
                                >
                                    💾 Drive（2.2）
                                </p>
                                <div id="checklist-drive"></div>
                            </div>

                            <div>
                                <p
                                    style={{ fontWeight: '600', fontSize: '13px', color: '#b45309', marginBottom: '0.5rem' }}
                                >
                                    📅 Calendar（2.3）
                                </p>
                                <div id="checklist-cal"></div>
                            </div>

                            <div>
                                <p
                                    style={{ fontWeight: '600', fontSize: '13px', color: '#7c3aed', marginBottom: '0.5rem' }}
                                >
                                    🎥 Meet（2.4）
                                </p>
                                <div id="checklist-meet"></div>
                            </div>

                            <div>
                                <p
                                    style={{ fontWeight: '600', fontSize: '13px', color: '#0891b2', marginBottom: '0.5rem' }}
                                >
                                    💬 Chat（2.5）
                                </p>
                                <div id="checklist-chat"></div>
                            </div>

                            <div>
                                <p
                                    style={{ fontWeight: '600', fontSize: '13px', color: '#dc2626', marginBottom: '0.5rem' }}
                                >
                                    🤖 Gemini（2.6）
                                </p>
                                <div id="checklist-gemini"></div>
                            </div>
                        </div>

                        <div
                            style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--accent-amber-bg)', border: '1px solid var(--accent-amber-border)', borderRadius: 'var(--radius)' }}
                        >
                            <p
                                style={{ fontWeight: '600', fontSize: '13px', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}
                            >
                                🏆 試験合格への最短ルート
                            </p>
                            <p style={{ fontSize: '13px' }}>
                                ①<strong>SPF・DKIM・DMARC の三点セット</strong
                                >（役割と設定手順を完全理解）&nbsp; ②<strong
                                    >DMARC の段階的導入</strong
                                >（none→quarantine→reject）&nbsp; ③<strong
                                    >Chat 履歴オン＝Vault で保持可能</strong
                                >という連携の理解&nbsp; ④<strong>Meet のノックイン機能</strong
                                >が外部参加者対策の答え&nbsp; ⑤<strong
                                    >Geminiは組織データをモデル学習に使わない</strong
                                >
                            </p>
                        </div>
                    </div>
                </div>

                {/*  FOOTER  */}
                <div
                    style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}
                >
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
                        📚 参考:
                        <a
                            href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator"
                            target="_blank"
                            >AGWA 認定ページ</a
                        >
                        &nbsp;·&nbsp;
                        <a
                            href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                            target="_blank"
                            >試験ガイド PDF</a
                        >
                        &nbsp;·&nbsp;
                        <a href="https://support.google.com/a" target="_blank"
                            >Workspace Admin Help</a
                        >
                        &nbsp;·&nbsp;
                        <a href="https://knowledge.workspace.google.com/admin" target="_blank"
                            >Workspace Knowledge Center</a
                        >
                        &nbsp;·&nbsp;
                        <a href="https://toolbox.googleapps.com/apps/main/" target="_blank"
                            >Admin Toolbox</a
                        >
                    </p>
                </div>
            </main>
        </div>

        
    
        </div>
    );
}
