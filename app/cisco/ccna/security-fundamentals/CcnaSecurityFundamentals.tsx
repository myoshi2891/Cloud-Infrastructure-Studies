'use client';

import React from 'react';
import { NavBar } from './NavBar';
import './page.css';

/**
 * Main content component for CCNA Security Fundamentals guide.
 * Migrated faithfully from Ccna-security-fundamentals.html.
 */
export function CcnaSecurityFundamentals() {
    return (
        <div className="ccna-security-container">
            <NavBar />
            <main className="main-content">
                <header>
                    <h1>CCNA試験対策：セキュリティの基礎（Security Fundamentals）徹底解説</h1>
                </header>

                {/* 0. この記事の位置づけ */}
                <section id="overview">
                    <h2>0. この記事の位置づけ</h2>
                    <p>
                        本記事は、Cisco CCNA（200-301）試験のドメイン5.0<strong>「Security Fundamentals（セキュリティの基礎）」</strong>に関する包括的な解説ガイドです。
                        試験全体に占める割合は<strong>15%</strong>ですが、セキュリティは単独立体としてだけでなく、ネットワーク設計、スイッチング、ルーティング、無線LANすべての領域に横断的に関連する重要分野です。
                    </p>
                    <div className="callout">
                        <strong>出題範囲（ドメイン 5.0 Security Fundamentals）：</strong>
                        <ul>
                            <li>5.1 セキュリティの基本概念（脅威、脆弱性、エクスプロイト、緩和策）の定義</li>
                            <li>5.2 セキュリティプログラム要素（ユーザー教育、アセット管理、物理アクセス制御など）</li>
                            <li>5.3 ローカルパスワードによるデバイスアクセス制御</li>
                            <li>5.4 パスワードポリシーの要素（複雑性、代替手段（MFA/SSO）など）</li>
                            <li>5.5 IPsec リモートアクセス / サイト間 VPN の概念</li>
                            <li>5.6 アクセスコントロールリスト（ACL）の構成と動作原理</li>
                            <li>5.7 レイヤー2セキュリティ機能（DHCP Snooping、Dynamic ARP Inspection、Port Security）</li>
                            <li>5.8 AAA（Authentication, Authorization, Accounting）の概念比較（RADIUS / TACACS+）</li>
                            <li>5.9 無線セキュリティプロトコル（WPA、WPA2、WPA3 / Pre-Shared Key、Enterprise）</li>
                            <li>5.10 GUIによるWLAN（WPA2 PSK）構成の理解</li>
                        </ul>
                    </div>
                </section>

                <hr />

                {/* 5.1 基本概念 */}
                <section id="s5-1">
                    <h2>5.1 セキュリティの基本概念（脅威・脆弱性・エクスプロイト・緩和策）</h2>
                    <h3>概要</h3>
                    <p>
                        セキュリティ対策の第一歩は、セキュリティに関する用語の正確な理解です。CCNA試験では、これら4つの言葉（Threat, Vulnerability, Exploit, Mitigation）の意味および関係性が頻繁に問われます。
                    </p>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">英語</th>
                                    <th scope="col">定義・意味</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>資産 (Asset)</strong></td>
                                    <td>Asset</td>
                                    <td>保護すべき重要なデータ、機器、システム</td>
                                    <td>顧客データベース、ルーターの設定ファイル</td>
                                </tr>
                                <tr>
                                    <td><strong>脅威 (Threat)</strong></td>
                                    <td>Threat</td>
                                    <td>資産に損害を与える可能性がある潜在的な危険事象や存在</td>
                                    <td>ハッカー、マルウェア、自然災害、内部の不正者</td>
                                </tr>
                                <tr>
                                    <td><strong>脆弱性 (Vulnerability)</strong></td>
                                    <td>Vulnerability</td>
                                    <td>システムや運用手順に存在する「欠陥」や「弱点」</td>
                                    <td>未パッチのOS、デフォルトパスワード、設定ミス</td>
                                </tr>
                                <tr>
                                    <td><strong>エクスプロイト (Exploit)</strong></td>
                                    <td>Exploit</td>
                                    <td>脆弱性を突いて攻撃を実行する手法・プログラム・データ</td>
                                    <td>攻撃コード、バッファオーバーフロー攻撃ツール</td>
                                </tr>
                                <tr>
                                    <td><strong>緩和策 (Mitigation)</strong></td>
                                    <td>Mitigation</td>
                                    <td>リスクや攻撃の影響を最小限に抑えるための対抗策</td>
                                    <td>ファイアウォール導入、セキュリティパッチ適用、ACL</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>4つの関係性を図で理解する</h3>
                    <div style={{ margin: '1.5rem 0', display: 'flex', justifyContent: 'center' }}>
                        <svg width="100%" height="auto" viewBox="0 0 700 160" style={{ maxWidth: '700px', background: '#0b1830', borderRadius: '8px', border: '1px solid rgba(124,158,255,0.22)', padding: '10px' }} role="img" aria-label="セキュリティ用語の関係性ダイアグラム">
                            <rect x="20" y="50" width="110" height="60" rx="8" fill="#1b3a6b" stroke="#7c9eff" strokeWidth="2" />
                            <text x="75" y="77" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Threat</text>
                            <text x="75" y="95" fill="#93a3c9" fontSize="12" textAnchor="middle">（脅威）</text>

                            <path d="M 130 80 L 160 80" stroke="#7c9eff" strokeWidth="2" markerEnd="url(#arrow)" />

                            <rect x="165" y="50" width="110" height="60" rx="8" fill="#1b3a6b" stroke="#7c9eff" strokeWidth="2" />
                            <text x="220" y="77" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Vulnerability</text>
                            <text x="220" y="95" fill="#93a3c9" fontSize="12" textAnchor="middle">（脆弱性）</text>

                            <path d="M 275 80 L 305 80" stroke="#7c9eff" strokeWidth="2" />

                            <rect x="310" y="50" width="110" height="60" rx="8" fill="#1b3a6b" stroke="#7c9eff" strokeWidth="2" />
                            <text x="365" y="77" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Exploit</text>
                            <text x="365" y="95" fill="#93a3c9" fontSize="12" textAnchor="middle">（エクスプロイト）</text>

                            <path d="M 420 80 L 450 80" stroke="#7c9eff" strokeWidth="2" />

                            <rect x="455" y="50" width="110" height="60" rx="8" fill="#5a1f1f" stroke="#ff8080" strokeWidth="2" />
                            <text x="510" y="77" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Risk / Damage</text>
                            <text x="510" y="95" fill="#ff8080" fontSize="12" textAnchor="middle">（被害・リスク）</text>

                            <path d="M 510 110 L 510 135 L 220 135 L 220 110" stroke="#7ee2b8" strokeWidth="2" strokeDasharray="4 4" />
                            <rect x="310" y="120" width="110" height="30" rx="6" fill="#0f1f3d" stroke="#7ee2b8" strokeWidth="1" />
                            <text x="365" y="140" fill="#7ee2b8" fontSize="12" fontWeight="bold" textAnchor="middle">Mitigation（緩和策）</text>
                        </svg>
                    </div>
                    <p className="diagram-caption">図: セキュリティ用語の関係性と緩和策の位置づけ</p>

                    <h3>覚え方のポイント</h3>
                    <p>
                        「<strong>脅威（Threat）</strong>がシステムの<strong>脆弱性（Vulnerability）</strong>をターゲットにし、<strong>エクスプロイト（Exploit）</strong>を使って攻撃を行う。これに対し、システム管理者は<strong>緩和策（Mitigation）</strong>を実行してリスクを低減させる」というストーリーで暗記するのが効果的です。
                    </p>
                </section>

                <hr />

                {/* 5.2 セキュリティプログラム */}
                <section id="s5-2">
                    <h2>5.2 セキュリティプログラムの要素</h2>
                    <h3>概要</h3>
                    <p>
                        セキュリティ対策は、ファイアウォールなどの技術的手段（テクニカルコントロール）だけでなく、組織全体の「セキュリティプログラム」として包括的に取り組む必要があります。
                    </p>

                    <h3>それぞれの役割</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">要素</th>
                                    <th scope="col">概要と目的</th>
                                    <th scope="col">具体的な取り組み例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>ユーザー意識向上と教育 (User Awareness)</strong></td>
                                    <td>セキュリティ事故の多くは「人」を起点とするため、従業員の教育が不可欠。</td>
                                    <td>フィッシングメール模擬訓練、定期的なセキュリティ研修、不審なメールの報告手順の周知。</td>
                                </tr>
                                <tr>
                                    <td><strong>アセット管理 (Asset Management)</strong></td>
                                    <td>「把握していない機器やデータは保護できない」という原則に基づき、資産を一覧・管理する。</td>
                                    <td>機器のインベントリ管理（シリアル・IP・MAC等）、ソフトウェアライセンス管理、廃棄手順。</td>
                                </tr>
                                <tr>
                                    <td><strong>物理アクセス制御 (Physical Access Control)</strong></td>
                                    <td>どれほど強固な暗号化をしても、機器を物理的に持ち出されたら意味がない。物理的侵入を防ぐ。</td>
                                    <td>サーバーラックの施錠、防犯カメラ（CCTV）、ICカード認証、バイオメトリクス（生体認証）、訪問者ログ。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr />

                {/* 5.3 アクセス制御 */}
                <section id="s5-3">
                    <h2>5.3 ローカルパスワードによるデバイスアクセス制御</h2>
                    <h3>概要</h3>
                    <p>
                        Cisco IOSルーターやスイッチにログインする際、認証サーバー（AAA）を使わずに、機器内部（ローカルデータベース）で設定したユーザー名・パスワードを使ってログイン制御を行う手法です。
                    </p>

                    <h3>設定コマンド例</h3>
                    <pre><code><div className="code-line">! 1. 特権EXECモードのパスワード設定（推奨：algorithm-type scrypt または secret）</div>
<div className="code-line">Router(config)# enable secret password123</div>
<div className="code-line"></div>
<div className="code-line">! 2. ローカルユーザーの作成</div>
<div className="code-line">Router(config)# username admin privilege 15 secret AdminSecretPass!</div>
<div className="code-line"></div>
<div className="code-line">! 3. コンソールラインへのローカル認証の適用</div>
<div className="code-line">Router(config)# line console 0</div>
<div className="code-line">Router(config-line)# login local</div>
<div className="code-line">Router(config-line)# exit</div>
<div className="code-line"></div>
<div className="code-line">! 4. VTYライン（SSH/Telnet）へのローカル認証とSSH限定の適用</div>
<div className="code-line">Router(config)# line vty 0 4</div>
<div className="code-line">Router(config-line)# login local</div>
<div className="code-line">Router(config-line)# transport input ssh</div>
<div className="code-line">Router(config-line)# exit</div>
</code></pre>

                    <h3>覚えておきたいポイント</h3>
                    <div className="callout">
                        <ul>
                            <li><strong>enable password vs enable secret:</strong> <code>enable password</code> は平文（または弱暗号）で保存されるため非推奨。<code>enable secret</code> は強固なハッシュ（MD5/SHA-256/scrypt）で暗号化されるため、こちらを使用する。</li>
                            <li><strong>service password-encryption:</strong> 設定ファイル内の平文パスワード（<code>password</code>コマンドや<code>line password</code>など）をType 7で暗号化するが、簡単に解読できるため気休めに過ぎない。<code>secret</code>を使用することが基本。</li>
                        </ul>
                    </div>
                </section>

                <hr />

                {/* 5.4 パスワードポリシー */}
                <section id="s5-4">
                    <h2>5.4 パスワードポリシーの要素（管理・複雑性・パスワード代替手段）</h2>
                    <h3>概要</h3>
                    <p>
                        アカウントの乗っ取りを防ぐため、企業やシステムで強制すべきパスワード運用ルールの要素です。
                    </p>

                    <h3>各要素の詳細</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">要素</th>
                                    <th scope="col">説明・ベストプラクティス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowSpan={3}><strong>パスワードポリシー</strong></td>
                                    <td>パスワードの複雑性 (Complexity)</td>
                                    <td>大文字・小文字・数字・特殊文字を組み合わせる。最低8〜12文字以上を要求。</td>
                                </tr>
                                <tr>
                                    <td>有効期限と履歴 (Expiration &amp; History)</td>
                                    <td>定期変更を強制する場合は過去のパスワードの再利用を防ぐ（ただし近年は変更強制より長さとMFAが重視される傾向）。</td>
                                </tr>
                                <tr>
                                    <td>アカウントロックアウト (Account Lockout)</td>
                                    <td>連続失敗（例: 5回）で一時的にアカウントをロックし、ブルートフォース攻撃を防ぐ。</td>
                                </tr>
                                <tr>
                                    <td rowSpan={2}><strong>パスワード代替・補強手段</strong></td>
                                    <td>多要素認証 (MFA: Multi-Factor Authentication)</td>
                                    <td>「知識（パスワード）」「所有（スマホ、ワンタイムパス）」「生体（指紋、顔）」のうち2つ以上を組み合わせて認証。</td>
                                </tr>
                                <tr>
                                    <td>シングルサインオン (SSO: Single Sign-On)</td>
                                    <td>一度の認証で連携する複数のアプリケーションやサービスに自動アクセスできるようにする仕組み。管理コスト軽減。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr />

                {/* 5.5 IPsec VPN */}
                <section id="s5-5">
                    <h2>5.5 IPsecリモートアクセス／サイト間VPN</h2>
                    <h3>概要</h3>
                    <p>
                        インターネットなどの信頼できないパブリックネットワーク上に、暗号化された安全な仮想専用線（トンネル）を構築する技術がVPN（Virtual Private Network）です。
                    </p>

                    <h3>2つのVPN方式の違い</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">サイト間VPN (Site-to-Site VPN)</th>
                                    <th scope="col">リモートアクセスVPN (Remote Access VPN)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>接続形態</strong></td>
                                    <td>拠点ルーター ↔ 拠点ルーター</td>
                                    <td>PC/スマホ（クライアント） ↔ 拠点ルーター/FW</td>
                                </tr>
                                <tr>
                                    <td><strong>対向機器</strong></td>
                                    <td>ルーター、VPNコンセントレータ、Firewall</td>
                                    <td>AnyConnect等のクライアントソフトが動く端末</td>
                                </tr>
                                <tr>
                                    <td><strong>利用シーン</strong></td>
                                    <td>本社と支店間の常時接続トンネル構築</td>
                                    <td>在宅勤務者や出張先からの社内ネットワークアクセス</td>
                                </tr>
                                <tr>
                                    <td><strong>ユーザーの意識</strong></td>
                                    <td>端末ユーザーはVPNの存在を意識しない（透過的）</td>
                                    <td>ユーザーが手動または自動でVPN接続操作を行う</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>IPsecの基本要素（概要レベル）</h3>
                    <p>IPsec（IP Security）は、ネットワーク層（レイヤー3）で暗号化と認証を提供するプロトコル群です。</p>
                    <ul>
                        <li><strong>機密性 (Confidentiality):</strong> 暗号化（AES, 3DES）により盗聴を防ぐ。</li>
                        <li><strong>完全性 (Integrity):</strong> ハッシュ関数（SHA-2, MD5）により改ざんを検知する。</li>
                        <li><strong>認証 (Authentication):</strong> 事前共有鍵（PSK: Pre-Shared Key）またはデジタル証明書で対向先を確認。</li>
                        <li><strong>抗否認性・リプレイ攻撃防止:</strong> シーケンス番号等を用いて再送攻撃をブロック。</li>
                    </ul>
                </section>

                <hr />

                {/* 5.6 ACL */}
                <section id="s5-6">
                    <h2>5.6 アクセスコントロールリスト（ACL）</h2>
                    <h3>概要</h3>
                    <p>
                        ACL（Access Control List）は、パケットの送信元IPアドレス、宛先IPアドレス、プロトコル、ポート番号などを基に、パケットの通過（permit）または破棄（deny）を制御するフィルタリングルールです。
                    </p>

                    <h3>ACLの種類</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">番号範囲</th>
                                    <th scope="col">拡張番号範囲</th>
                                    <th scope="col">条件判断の基準</th>
                                    <th scope="col">配置場所の原則</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>標準ACL (Standard ACL)</strong></td>
                                    <td>1 〜 99</td>
                                    <td>1300 〜 1999</td>
                                    <td><strong>送信元IPアドレスのみ</strong></td>
                                    <td><strong>宛先に最も近い場所</strong>に配置</td>
                                </tr>
                                <tr>
                                    <td><strong>拡張ACL (Extended ACL)</strong></td>
                                    <td>100 〜 199</td>
                                    <td>2000 〜 2699</td>
                                    <td>送信元/宛先IP、プロトコル、ポート番号など</td>
                                    <td><strong>送信元に最も近い場所</strong>に配置</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>パケットがACLで処理される流れ</h3>
                    <ol>
                        <li>リストの上から順番にルールが評価される（ファーストマッチ）。</li>
                        <li>条件にマッチした場合、その行の処理（permit / deny）が実行され、以降の行の評価はスキップされる。</li>
                        <li>どの行にもマッチしなかった場合、リストの最後にある<strong>暗黙の拒否（Implicit Deny: deny ip any any）</strong>によりパケットは破棄される。</li>
                    </ol>

                    <h3>設定コマンド例</h3>
                    <pre><code><div className="code-line">! 1. 拡張名前付きACLの作成</div>
<div className="code-line">Router(config)# ip access-list extended SECURE_ACL</div>
<div className="code-line">Router(config-ext-nacl)# remark Permit Web Traffic from 192.168.1.0/24</div>
<div className="code-line">Router(config-ext-nacl)# permit tcp 192.168.1.0 0.0.255.255 any eq 80</div>
<div className="code-line">Router(config-ext-nacl)# permit tcp 192.168.1.0 0.0.255.255 any eq 443</div>
<div className="code-line">Router(config-ext-nacl)# deny ip any any</div>
<div className="code-line"></div>
<div className="code-line">! 2. インターフェースへの適用（inboundまたはoutbound）</div>
<div className="code-line">Router(config)# interface GigabitEthernet0/0/0</div>
<div className="code-line">Router(config-if)# ip access-group SECURE_ACL in</div>
</code></pre>

                    <h3>設定・検証時のよくあるミス（試験で狙われやすいポイント）</h3>
                    <div className="callout callout-warning">
                        <ul>
                            <li><strong>ワイルドカードマスクの指定ミス:</strong> サブネットマスク（例: 255.255.255.0）ではなく、ワイルドカードマスク（例: 0.0.0.255）を使用する。</li>
                            <li><strong>暗黙の拒否を忘れる:</strong> 末尾に明示的に permit を書かないと、すべてのパケットが拒否される。</li>
                            <li><strong>標準ACLを送信元近くに置いてしまう:</strong> 送信元近くに標準ACLを適用すると、宛先に関わらずすべての通信がブロックされてしまう。</li>
                        </ul>
                    </div>
                </section>

                <hr />

                {/* 5.7 レイヤー2セキュリティ */}
                <section id="s5-7">
                    <h2>5.7 レイヤー2セキュリティ機能（Port Security / DHCP Snooping / DAI）</h2>
                    <h3>概要</h3>
                    <p>
                        レイヤー2（スイッチング層）で発生する攻撃（MACアドレススプーフィング、DHCPスプーフィング、ARPスプーフィング）を防ぐためのセキュリティ機能です。
                    </p>

                    <h3>各機能の比較表</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">機能名</th>
                                    <th scope="col">防御する対象攻撃</th>
                                    <th scope="col">動作メカニズム</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>ポートセキュリティ (Port Security)</strong></td>
                                    <td>MACアドレス偽装、CAMテーブル枯渇攻撃</td>
                                    <td>ポートに接続を許可するMACアドレス数や固定MACアドレスを制限し、不正MAC端末の通信を遮断。</td>
                                </tr>
                                <tr>
                                    <td><strong>DHCPスプーフィング防止 (DHCP Snooping)</strong></td>
                                    <td>偽DHCPサーバー攻撃、DHCP飢餓攻撃</td>
                                    <td>ポートをTrusted（信頼）/Untrusted（非信頼）に分類し、非信頼ポートからのDHCP Offer/ACK応答をブロック。DHCPバインディングデータベースを作成する。</td>
                                </tr>
                                <tr>
                                    <td><strong>動的ARPインスペクション (DAI: Dynamic ARP Inspection)</strong></td>
                                    <td>ARPスプーフィング（中間者攻撃: MitM）</td>
                                    <td>DHCP Snoopingバインディングデータベースを参照し、IPアドレスとMACアドレスの対応が不正なARPパケットを破棄する。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>ポートセキュリティの違反モード（Violation Mode）</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">モード (Mode)</th>
                                    <th scope="col">違反パケットの処理</th>
                                    <th scope="col">Syslog通知 / カウンタ増分</th>
                                    <th scope="col">ポートの状態</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>shutdown</strong> (デフォルト)</td>
                                    <td>破棄する</td>
                                    <td>通知する / カウンタ増加</td>
                                    <td><strong>err-disable</strong> 状態になり非活性化（復旧には shutdown / no shutdown が必要）</td>
                                </tr>
                                <tr>
                                    <td><strong>restrict</strong></td>
                                    <td>破棄する</td>
                                    <td>通知する / カウンタ増加</td>
                                    <td>アップ状態を維持（違反パケットのみ破棄）</td>
                                </tr>
                                <tr>
                                    <td><strong>protect</strong></td>
                                    <td>破棄する</td>
                                    <td><strong>通知しない</strong> / カウンタ増加なし</td>
                                    <td>アップ状態を維持（サイレントドロップ）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr />

                {/* 5.8 AAA */}
                <section id="s5-8">
                    <h2>5.8 AAA（認証・認可・アカウンティング）の概念比較</h2>
                    <h3>概要</h3>
                    <p>
                        AAA（Authentication, Authorization, Accounting）は、ネットワーク機器やサービスへのアクセスを中央集権的かつ安全に管理するためのフレームワークです。
                    </p>

                    <h3>3つの要素の役割</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">要素</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">問いかけ</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Authentication（認証）</strong></td>
                                    <td>ユーザーが本人であるかを検証する。</td>
                                    <td>「あなたは誰ですか？」</td>
                                    <td>IDとパスワードの入力、ワンタイムパスワード確認</td>
                                </tr>
                                <tr>
                                    <td><strong>Authorization（認可）</strong></td>
                                    <td>認証されたユーザーにどのような操作・権限を許可するか決定する。</td>
                                    <td>「あなたは何をしてよいですか？」</td>
                                    <td>管理者権限（Privilege 15）の付与、実行可能コマンドの制限</td>
                                </tr>
                                <tr>
                                    <td><strong>Accounting（アカウンティング）</strong></td>
                                    <td>ユーザーがいつ、何をしたかの履歴（ログ）を記録・監査する。</td>
                                    <td>「あなたは何をしましたか？」</td>
                                    <td>ログイン・ログアウト時刻の記録、実行した設定コマンドの記録</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>RADIUSとTACACS+の比較</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">TACACS+ (Cisco独自の標準)</th>
                                    <th scope="col">RADIUS (オープン標準)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>トランスポートプロトコル</strong></td>
                                    <td><strong>TCP</strong> (ポート 49)</td>
                                    <td><strong>UDP</strong> (ポート 1812/1813 または 1645/1646)</td>
                                </tr>
                                <tr>
                                    <td><strong>暗号化範囲</strong></td>
                                    <td><strong>パケット全体を暗号化</strong>（ヘッダー以外）</td>
                                    <td><strong>パスワードのみ暗号化</strong>（他の情報は平文）</td>
                                </tr>
                                <tr>
                                    <td><strong>AAAの分離</strong></td>
                                    <td><strong>Authentication/Authorization/Accountingを完全分離</strong></td>
                                    <td>AuthenticationとAuthorizationが結合されている</td>
                                </tr>
                                <tr>
                                    <td><strong>主な用途</strong></td>
                                    <td><strong>ネットワーク機器のコマンドレベルアクセス管理</strong></td>
                                    <td><strong>ネットワークアクセス認証（802.1X、VPN、リモートアクセス）</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr />

                {/* 5.9 無線セキュリティ */}
                <section id="s5-9">
                    <h2>5.9 無線セキュリティプロトコル（WPA・WPA2・WPA3）</h2>
                    <h3>概要</h3>
                    <p>
                        電波を媒体とする無線LAN（Wi-Fi）では、盗聴や不正接続のリスクが高いため、暗号化と認証の仕組みが不可欠です。
                    </p>

                    <h3>WPA / WPA2 / WPA3 の比較</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">規格</th>
                                    <th scope="col">暗号化アルゴリズム</th>
                                    <th scope="col">暗号キー管理方式</th>
                                    <th scope="col">セキュリティ強度・特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>WPA</strong></td>
                                    <td>TKIP (Temporal Key Integrity Protocol)</td>
                                    <td>RC4ベース</td>
                                    <td>WEPの脆弱性対策として暫定策定。現在は非推奨。</td>
                                </tr>
                                <tr>
                                    <td><strong>WPA2</strong></td>
                                    <td><strong>CCMP</strong> (AESベース)</td>
                                    <td>AES</td>
                                    <td>業界標準の強力な暗号化。現在も広く利用。</td>
                                </tr>
                                <tr>
                                    <td><strong>WPA3</strong></td>
                                    <td><strong>GCMP-256</strong> / CCMP-128</td>
                                    <td>SAE (Simultaneous Authentication of Equals)</td>
                                    <td>最新規格。辞書攻撃に対する保護（SAE/ハンディシェイク改善）、前方秘匿性の提供。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>パーソナルモード (PSK) vs エンタープライズモード (802.1X)</h3>
                    <p>
                        認証方式には、小規模・家庭向けの <strong>Personal（Pre-Shared Key: 事前共有鍵）</strong> と、大企業向けの <strong>Enterprise（802.1X / EAP + RADIUSサーバー連携）</strong> があります。
                    </p>
                </section>

                <hr />

                {/* 5.10 GUIでのWLAN設定 */}
                <section id="s5-10">
                    <h2>5.10 GUIによるWLAN（WPA2 PSK）設定の考え方</h2>
                    <h3>概要</h3>
                    <p>
                        CCNAブループリントの5.10では、WLC（Wireless LAN Controller）のGUI上でWLANを作成し、WPA2 PSKを設定する一連の流れを理解することが求められます。
                    </p>

                    <h3>GUI設定のステップ</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ステップ</th>
                                    <th scope="col">画面（タブ）</th>
                                    <th scope="col">設定内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>① WLAN作成</td>
                                    <td>WLANs &gt; Create New</td>
                                    <td>WLAN ID、Profile Name、SSID名を設定</td>
                                </tr>
                                <tr>
                                    <td>② 一般設定</td>
                                    <td>General</td>
                                    <td>WLANの有効/無効、割り当てるインターフェース（VLAN）を選択</td>
                                </tr>
                                <tr>
                                    <td>③ セキュリティ設定</td>
                                    <td>Security &gt; Layer2</td>
                                    <td>Layer 2 Securityで「WPA2」を選択し、認証方式で「PSK」を選択</td>
                                </tr>
                                <tr>
                                    <td>④ 事前共有鍵入力</td>
                                    <td>Security &gt; Layer2</td>
                                    <td>PSK Formatを選択し、実際のパスフレーズ（8〜63文字）を入力</td>
                                </tr>
                                <tr>
                                    <td>⑤ QoS設定</td>
                                    <td>QoS</td>
                                    <td>トラフィックの優先度（音声・動画を優先するプロファイルなど）を設定</td>
                                </tr>
                                <tr>
                                    <td>⑥ 詳細設定</td>
                                    <td>Advanced</td>
                                    <td>セッションタイムアウトやP2Pブロッキングなどのオプション設定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr />

                {/* まとめ */}
                <section id="summary">
                    <h2>まとめ：ドメイン5.0の学習優先順位</h2>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">優先度</th>
                                    <th scope="col">サブトピック</th>
                                    <th scope="col">理由</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>★★★</td>
                                    <td>5.6 ACL、5.7 レイヤー2セキュリティ</td>
                                    <td>設定・検証（シミュレーション）問題が出やすく配点も大きい</td>
                                </tr>
                                <tr>
                                    <td>★★★</td>
                                    <td>5.8 AAA</td>
                                    <td>概念問題・RADIUS/TACACS+比較が頻出</td>
                                </tr>
                                <tr>
                                    <td>★★☆</td>
                                    <td>5.9 無線セキュリティ、5.5 IPsec VPN</td>
                                    <td>概念理解中心。用語の比較が問われやすい</td>
                                </tr>
                                <tr>
                                    <td>★★☆</td>
                                    <td>5.1〜5.4 基本概念・パスワードポリシー</td>
                                    <td>用語定義の暗記が中心。得点しやすい基礎パート</td>
                                </tr>
                                <tr>
                                    <td>★☆☆</td>
                                    <td>5.10 GUIでのWLAN設定</td>
                                    <td>出題頻度は比較的低いが、流れを押さえておけば失点を防げる</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr />

                {/* 参考ソース */}
                <section id="references">
                    <h2>参考ソース</h2>
                    <p>本記事の内容は、以下のCisco公式情報を根拠として作成しています。</p>
                    <ul className="ref-list">
                        <li>
                            Cisco CCNA認定資格 公式ページ（日本語）<br />
                            <a
                                href="https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.cisco.com/c/ja_jp/training-events/training-certifications/certifications/associate/ccna.html
                            </a>
                        </li>
                        <li>
                            CCNA 200-301 Exam Topics v1.1（公式試験ブループリントPDF、英語）<br />
                            <a
                                href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
