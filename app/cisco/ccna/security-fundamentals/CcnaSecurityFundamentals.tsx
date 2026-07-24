'use client';

import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';
import './page.css';

/**
 * Renders the CCNA 200-301 Security Fundamentals study guide.
 *
 * @returns The study guide page content
 */
export function CcnaSecurityFundamentals() {
    return (
        <div className="ccna-security-page">
            <div className="layout">
                <NavBar />
                <main>
                    <header className="hero">
                        <div className="badges">
                            <span className="badge">CCNA 200-301 (v1.1 ブループリント)</span>
                            <span className="badge">Domain 5.0</span>
                            <span className="badge">出題比率 15%</span>
                        </div>
                        <h1>CCNA試験対策：セキュリティの基礎（Security Fundamentals）徹底解説</h1>
                        <p className="lede">
                            Cisco CCNA（200-301）試験のドメイン5.0「Security Fundamentals」を徹底解説。脅威・脆弱性の定義から、パケットフィルタリング（ACL）、レイヤー2防御（Port Security/DHCP Snooping/DAI）、AAA（RADIUS vs TACACS+）、VPN構成、WPA3などの最新無線セキュリティまで、試験に出るポイントを網羅。
                        </p>
                    </header>

                    {/* 0. 位置づけ */}
                    <section id="overview">
                        <h2>0. この記事の位置づけ</h2>
                        <p>
                            CCNA 200-301試験において、ドメイン5.0<strong>「Security Fundamentals（セキュリティの基礎）」</strong>は出題比率<strong>15%</strong>を占める重要分野です。
                        </p>
                        <p>
                            ネットワークの役割が単なる「つなぐこと」から「安全につなぐこと」へと変化した現代において、セキュリティ知識はすべてのネットワークエンジニアにとって必須の素養となっています。試験では、具体的な設定コマンドだけでなく、<strong>セキュリティ概念の正しい理解や用語の定義、プロトコル間の比較</strong>が深く問われます。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ドメイン番号</th>
                                        <th scope="col">ドメイン名</th>
                                        <th scope="col">出題比率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.0</td>
                                        <td>Network Fundamentals（ネットワークの基礎）</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>2.0</td>
                                        <td>Network Access（ネットワークアクセス）</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>
                                        <td>3.0</td>
                                        <td>IP Connectivity（IP接続性）</td>
                                        <td>25%</td>
                                    </tr>
                                    <tr>
                                        <td>4.0</td>
                                        <td>IP Services（IPサービス）</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>5.0</strong></td>
                                        <td><strong>Security Fundamentals（セキュリティの基礎）</strong></td>
                                        <td><strong>15%</strong></td>
                                    </tr>
                                    <tr>
                                        <td>6.0</td>
                                        <td>Automation and Programmability（自動化とプログラマビリティ）</td>
                                        <td>10%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            本記事は、この中の<strong>ドメイン5.0「セキュリティの基礎」</strong>を初学者向けに解説します。Cisco公式のv1.1試験ブループリントでは、このドメインは以下の10個のサブトピック（5.1〜5.10）で構成されています。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.overview}
                                ariaLabel="Security Fundamentals（5.0）のサブトピック全体像"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: Security Fundamentals（5.0）のサブトピック全体像</p>

                        <p>それでは、1つずつステップバイステップで見ていきましょう。</p>
                    </section>

                    <hr />

                    {/* 5.1 基本概念 */}
                    <section id="s5-1">
                        <h2>5.1 セキュリティの基本概念（脅威・脆弱性・エクスプロイト・緩和策）</h2>
                        <h3>概要</h3>
                        <p>
                            セキュリティを学ぶ最初の一歩は、<strong>4つの基本用語の違い</strong>を正確に理解することです。この4つは混同されがちですが、CCNA試験でも「用語の定義」を問う問題が頻出します。
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">用語（英語）</th>
                                        <th scope="col">用語（日本語）</th>
                                        <th scope="col">意味</th>
                                        <th scope="col">具体例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Vulnerability</td>
                                        <td>脆弱性</td>
                                        <td>システムやプロセスに存在する「弱点・欠陥」</td>
                                        <td>パッチ未適用のOS、初期パスワードのまま運用しているルーター</td>
                                    </tr>
                                    <tr>
                                        <td>Threat</td>
                                        <td>脅威</td>
                                        <td>脆弱性を突いて損害を与える可能性のある存在・事象</td>
                                        <td>攻撃者、マルウェア、内部不正、自然災害</td>
                                    </tr>
                                    <tr>
                                        <td>Exploit</td>
                                        <td>エクスプロイト</td>
                                        <td>脆弱性を実際に悪用するための具体的な手段・コード</td>
                                        <td>バッファオーバーフロー攻撃コード、フィッシングメール</td>
                                    </tr>
                                    <tr>
                                        <td>Mitigation</td>
                                        <td>緩和策</td>
                                        <td>脅威やエクスプロイトの影響を減らすための対策</td>
                                        <td>パッチ適用、ファイアウォール、多要素認証、教育</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4つの関係性を図で理解する</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s51_concepts}
                                ariaLabel="脆弱性・脅威・エクスプロイト・緩和策の関係"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: 脆弱性・脅威・エクスプロイト・緩和策の関係</p>

                        <h3>覚え方のポイント</h3>
                        <ul>
                            <li><strong>脆弱性は「弱点」そのもの</strong>（受け身の存在）。攻撃者がいなくても脆弱性は存在し得る。</li>
                            <li><strong>脅威は「弱点を突こうとする主体・事象」</strong>。人（攻撃者）だけでなく、自然災害やハードウェア故障も脅威になり得る。</li>
                            <li><strong>エクスプロイトは「実際に悪用する手段」</strong>。脆弱性があっても、エクスプロイトが存在しなければ実害には直結しない。</li>
                            <li><strong>緩和策は「対策」</strong>。脆弱性を塞ぐ（パッチ）、脅威を検知する（IDS/IPS）、教育で人的リスクを下げる、など多層的に行う。</li>
                        </ul>
                        <p>
                            代表的な脅威の分類には、マルウェア（ウイルス・ワーム・ランサムウェア）、ソーシャルエンジニアリング（フィッシング）、DoS/DDoS攻撃、スプーフィング（なりすまし）などがあります。CCNA試験では、これらの<strong>名称と特徴の組み合わせ</strong>を問う設問が出やすいため、代表例を一通り押さえておきましょう。
                        </p>
                    </section>

                    <hr />

                    {/* 5.2 プログラム要素 */}
                    <section id="s5-2">
                        <h2>5.2 セキュリティプログラムの要素（ユーザー教育・トレーニング・物理アクセス制御）</h2>
                        <h3>概要</h3>
                        <p>
                            技術的対策（ファイアウォールやACLなど）だけでは組織のセキュリティは守れません。CCNAブループリントでは、<strong>組織的なセキュリティプログラムの3要素</strong>が明示されています。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s52_program}
                                ariaLabel="セキュリティプログラムの3要素"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: セキュリティプログラムの3要素</p>

                        <h3>それぞれの役割</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">目的</th>
                                        <th scope="col">具体的な施策例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ユーザー意識向上（Awareness）</td>
                                        <td>全従業員に「セキュリティは自分ごと」という認識を持たせる</td>
                                        <td>社内ポスター、定期メール、フィッシング訓練メール</td>
                                    </tr>
                                    <tr>
                                        <td>トレーニング（Training）</td>
                                        <td>役割ごとに必要な実務スキルを身につけさせる</td>
                                        <td>新人研修、管理者向けの技術研修、模擬インシデント対応演習</td>
                                    </tr>
                                    <tr>
                                        <td>物理アクセス制御（Physical Access Control）</td>
                                        <td>建物・部屋・機器への物理的な不正アクセスを防ぐ</td>
                                        <td>ICカード錠、生体認証ゲート、監視カメラ、来訪者管理簿</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>ポイント：</strong>情報セキュリティの多くのインシデントは、技術的な脆弱性よりも「人」に起因する部分が大きいと言われています。そのため、CCNAでは技術知識だけでなく、こうした組織運営面の基礎も出題範囲に含まれています。
                        </div>
                    </section>

                    <hr />

                    {/* 5.3 ローカルパスワード */}
                    <section id="s5-3">
                        <h2>5.3 ローカルパスワードによるデバイスアクセス制御</h2>
                        <h3>概要</h3>
                        <p>
                            Ciscoルーター・スイッチへの不正アクセスを防ぐ、最も基本的な方法が<strong>ローカルパスワードの設定</strong>です。主なアクセス経路は次の3つです。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s53_access}
                                ariaLabel="デバイスへの主なアクセス経路"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: デバイスへの主なアクセス経路</p>

                        <h3>設定コマンド例</h3>
                        <div className="code-block">
                            <div className="code-header">Cisco IOS CLI — ローカルパスワード設定例</div>
                            <pre>
                                <span className="code-line"><span className="code-comment">! コンソールポートへのパスワード設定</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">line console</span> <span className="code-number">0</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-line)#</span> <span className="code-command">password</span> <span className="code-keyword">Cisco123!</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-line)#</span> <span className="code-command">login</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! VTY（Telnet/SSHでのリモートアクセス）へのパスワード設定</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">line vty</span> <span className="code-number">0 4</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-line)#</span> <span className="code-command">password</span> <span className="code-keyword">Cisco123!</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-line)#</span> <span className="code-command">login</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! 特権EXECモードへのパスワード設定（enable secretは暗号化される）</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">enable secret</span> <span className="code-keyword">MyStrongSecret!</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! 平文で保存されるパスワードを暗号化して表示させる</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">service password-encryption</span></span>
                            </pre>
                        </div>

                        <h3>覚えておきたいポイント</h3>
                        <ul>
                            <li><code>enable password</code> は非推奨（平文に近い弱い暗号化）。<strong>必ず <code>enable secret</code> を使う</strong>のがベストプラクティス。</li>
                            <li><code>login</code> コマンドを入れ忘れると、パスワードを設定してもログイン時に要求されないため注意。</li>
                            <li>ローカルアカウントを使う場合は <code>username &lt;name&gt; secret &lt;password&gt;</code> と <code>login local</code> の組み合わせを使う（後述のAAAの基礎にもつながる）。</li>
                        </ul>

                        <div className="code-block">
                            <div className="code-header">Cisco IOS CLI — ローカルユーザーとSSHの有効化</div>
                            <pre>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">username</span> <span className="code-keyword">admin</span> <span className="code-command">secret</span> <span className="code-keyword">StrongPass123!</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">line vty</span> <span className="code-number">0 4</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-line)#</span> <span className="code-command">login local</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-line)#</span> <span className="code-command">transport input</span> <span className="code-keyword">ssh</span></span>
                            </pre>
                        </div>
                    </section>

                    <hr />

                    {/* 5.4 パスワードポリシー */}
                    <section id="s5-4">
                        <h2>5.4 パスワードポリシーの要素（管理・複雑性・パスワード代替手段）</h2>
                        <h3>概要</h3>
                        <p>
                            強固なパスワード運用のためには、単に「複雑なパスワードを設定する」だけでなく、<strong>組織的なポリシー</strong>として管理する必要があります。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s54_policy}
                                ariaLabel="パスワードポリシーの要素"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: パスワードポリシーの要素</p>

                        <h3>各要素の詳細</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>管理（Management）</td>
                                        <td>パスワードの発行・変更・失効のライフサイクル管理。使い回し防止、定期変更ポリシーなど</td>
                                    </tr>
                                    <tr>
                                        <td>複雑性（Complexity）</td>
                                        <td>文字数・文字種（大小英字・数字・記号）の組み合わせ要件。辞書攻撃・総当たり攻撃への耐性を高める</td>
                                    </tr>
                                    <tr>
                                        <td>多要素認証（MFA）</td>
                                        <td>「知識情報（パスワード）」＋「所持情報（スマホ・トークン）」など複数要素を組み合わせる認証</td>
                                    </tr>
                                    <tr>
                                        <td>証明書（Certificates）</td>
                                        <td>デジタル証明書（公開鍵基盤 / PKI）を用いた認証。パスワードそのものへの依存を減らす</td>
                                    </tr>
                                    <tr>
                                        <td>生体認証（Biometrics）</td>
                                        <td>指紋・顔認証・虹彩認証など、身体的特徴による認証</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>なぜパスワードだけに頼らないのか：</strong>パスワードは「知識情報」であるため、フィッシングや使い回しにより漏洩しやすいという弱点があります。MFAや証明書、生体認証を組み合わせることで、<strong>パスワードが漏れても不正ログインを防ぎやすくなる</strong>（多層防御 / Defense in Depth の考え方）のがポイントです。
                        </div>
                    </section>

                    <hr />

                    {/* 5.5 IPsec VPN */}
                    <section id="s5-5">
                        <h2>5.5 IPsecリモートアクセス／サイト間VPN</h2>
                        <h3>概要</h3>
                        <p>
                            VPN（Virtual Private Network）は、インターネットのような信頼できないネットワーク上に、暗号化された仮想的な専用線を作る技術です。CCNAでは<strong>IPsecを使った2つのVPN構成パターン</strong>の違いを理解することが求められます。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s55_vpn}
                                ariaLabel="サイト間VPNとリモートアクセスVPNの構成比較"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: サイト間VPNとリモートアクセスVPNの構成比較</p>

                        <h3>2つのVPN方式の違い</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">サイト間VPN (Site-to-Site)</th>
                                        <th scope="col">リモートアクセスVPN (Remote Access)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>主な用途</td>
                                        <td>拠点間（本社⇔支社など）を常時接続</td>
                                        <td>個人端末から社内ネットワークへ一時的に接続</td>
                                    </tr>
                                    <tr>
                                        <td>接続元</td>
                                        <td>ルーターやファイアウォール同士</td>
                                        <td>PC・スマートフォンなどのクライアント端末</td>
                                    </tr>
                                    <tr>
                                        <td>典型的な利用者</td>
                                        <td>ネットワーク管理者が拠点全体を接続</td>
                                        <td>在宅勤務者・出張者など個人ユーザー</td>
                                    </tr>
                                    <tr>
                                        <td>常時接続か</td>
                                        <td>常時接続が一般的</td>
                                        <td>必要な時だけ接続（オンデマンド）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>IPsecの基本要素（概要レベル）</h3>
                        <p>
                            IPsecは単一のプロトコルではなく、複数の要素を組み合わせた「フレームワーク」です。CCNAレベルでは、以下の役割を大まかに理解しておけば十分です。
                        </p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>IKE (Internet Key Exchange)</td>
                                        <td>通信相手との間で暗号鍵を安全に交換・管理する</td>
                                    </tr>
                                    <tr>
                                        <td>ESP (Encapsulating Security Payload)</td>
                                        <td>データそのものを暗号化し、機密性を確保する</td>
                                    </tr>
                                    <tr>
                                        <td>AH (Authentication Header)</td>
                                        <td>データの改ざん検知（完全性・送信元認証）を行う（暗号化はしない）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="callout">
                            <strong>CCNAレベルの理解：</strong>細かいコマンド設定よりも「サイト間VPNとリモートアクセスVPNの違い」「VPNが提供する機密性・完全性・認証という3つの価値」を理解しておくことが重要です。
                        </div>
                    </section>

                    <hr />

                    {/* 5.6 ACL */}
                    <section id="s5-6">
                        <h2>5.6 アクセスコントロールリスト（ACL）</h2>
                        <h3>概要</h3>
                        <p>
                            ACL（Access Control List）は、ルーターやスイッチを通過するパケットを、送信元/宛先IPアドレスやポート番号などの条件で<strong>許可（permit）／拒否（deny）</strong>するためのルールの集合です。CCNA試験では、<strong>設定と検証（コンフィグレーション問題）が頻出する重要トピック</strong>です。
                        </p>

                        <h3>ACLの種類</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">番号範囲（Numbered）</th>
                                        <th scope="col">判定基準</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>標準ACL（Standard）</td>
                                        <td>1〜99, 1300〜1999</td>
                                        <td>送信元IPアドレスのみ</td>
                                        <td>シンプルだが細かい制御はできない</td>
                                    </tr>
                                    <tr>
                                        <td>拡張ACL（Extended）</td>
                                        <td>100〜199, 2000〜2699</td>
                                        <td>送信元/宛先IP、プロトコル、ポート番号など</td>
                                        <td>柔軟な制御が可能。実務でも主流</td>
                                    </tr>
                                    <tr>
                                        <td>名前付きACL（Named）</td>
                                        <td>番号ではなく名前を使用</td>
                                        <td>標準・拡張どちらも作成可能</td>
                                        <td>可読性が高く、行の追加・削除が容易</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>パケットがACLで処理される流れ</h3>
                        <p>
                            ACLの動作を理解する上で最も重要なポイントは、「<strong>上から順に照合し、最初にマッチしたルールで即座に確定する</strong>」という点と、「<strong>リストの最後には暗黙のdeny allが存在する</strong>」という点です。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s56_acl}
                                ariaLabel="ACLによるパケット照合フロー"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: ACLによるパケット照合フロー</p>

                        <h3>設定コマンド例</h3>
                        <div className="code-block">
                            <div className="code-header">Cisco IOS CLI — ACL設定の構成例</div>
                            <pre>
                                <span className="code-line"><span className="code-comment">! 標準ACL：192.168.10.0/24からのアクセスのみ許可</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">access-list</span> <span className="code-number">10</span> <span className="code-keyword">permit</span> <span className="code-param">192.168.10.0 0.0.0.255</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">access-list</span> <span className="code-number">10</span> <span className="code-keyword">deny</span> <span className="code-param">any</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! 拡張ACL：192.168.10.0/24からWebサーバー(HTTPS)へのアクセスのみ許可</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">access-list</span> <span className="code-number">110</span> <span className="code-keyword">permit</span> <span className="code-param">tcp 192.168.10.0 0.0.0.255 host 203.0.113.10 eq 443</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">access-list</span> <span className="code-number">110</span> <span className="code-keyword">deny</span> <span className="code-param">ip any any</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! 名前付き拡張ACLの例</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">ip access-list extended</span> <span className="code-keyword">BLOCK-TELNET</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-ext-nacl)#</span> <span className="code-command">deny</span> <span className="code-param">tcp any any eq 23</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-ext-nacl)#</span> <span className="code-command">permit</span> <span className="code-param">ip any any</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! インターフェースへの適用（inbound方向）</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">interface</span> <span className="code-param">GigabitEthernet0/1</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-if)#</span> <span className="code-command">ip access-group</span> <span className="code-number">110</span> <span className="code-keyword">in</span></span>
                            </pre>
                        </div>

                        <h3>設定・検証時のよくあるミス（試験で狙われやすいポイント）</h3>
                        <ul>
                            <li><strong>ワイルドカードマスクとサブネットマスクを混同する</strong>（ワイルドカードは「0=一致必須, 1=無視」で通常のマスクと考え方が逆）。</li>
                            <li>ACLの<strong>適用方向（in/out）を間違える</strong>。</li>
                            <li>ルールの<strong>順序を誤り</strong>、意図しないパケットが早い段階でマッチしてしまう。</li>
                            <li>最後の<strong>暗黙のdeny allを忘れ</strong>、想定より多くの通信がブロックされてしまう。</li>
                            <li><code>show ip access-lists</code> や <code>show access-lists</code> で、<strong>マッチ件数（matches）を確認して意図通り動作しているか検証する</strong>習慣をつける。</li>
                        </ul>
                    </section>

                    <hr />

                    {/* 5.7 L2セキュリティ */}
                    <section id="s5-7">
                        <h2>5.7 レイヤー2セキュリティ機能（DHCPスヌーピング・動的ARPインスペクション・ポートセキュリティ）</h2>
                        <h3>概要</h3>
                        <p>
                            レイヤー3（ACLなど）だけでなく、<strong>レイヤー2（スイッチ）レベルでの防御</strong>もCCNAの重要トピックです。この3つの機能は、それぞれ役割が異なりますが、互いに連携して動作する「セット」として理解すると学習効率が上がります。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s57_l2sec}
                                ariaLabel="レイヤー2セキュリティ機能の連携"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: レイヤー2セキュリティ機能の連携</p>

                        <div className="callout">
                            <strong>学習のコツ：</strong>この3つは「ポートセキュリティで“誰が繋げるか”を制限 → DHCPスヌーピングで“正しいDHCPサーバーの情報だけ”を信頼 → その情報（バインディングテーブル）を使ってDAIが“ARPの嘘”を見抜く」という順番でストーリーとして覚えると整理しやすくなります。
                        </div>

                        <h3>各機能の比較表</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">機能</th>
                                        <th scope="col">目的</th>
                                        <th scope="col">監視対象</th>
                                        <th scope="col">主なコマンド例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ポートセキュリティ</td>
                                        <td>ポートに接続できるMACアドレス数・種類を制限</td>
                                        <td>スイッチポートのMACアドレス</td>
                                        <td><code>switchport port-security</code></td>
                                    </tr>
                                    <tr>
                                        <td>DHCPスヌーピング</td>
                                        <td>不正なDHCPサーバーからの応答を遮断</td>
                                        <td>DHCPメッセージ（Offer/Ackなど）</td>
                                        <td><code>ip dhcp snooping</code></td>
                                    </tr>
                                    <tr>
                                        <td>動的ARPインスペクション（DAI）</td>
                                        <td>ARPスプーフィング（なりすまし）を防止</td>
                                        <td>ARPリクエスト/リプライ</td>
                                        <td><code>ip arp inspection</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>設定コマンド例</h3>
                        <div className="code-block">
                            <div className="code-header">Cisco Catalyst Switch CLI — レイヤー2防御設定例</div>
                            <pre>
                                <span className="code-line"><span className="code-comment">! --- ポートセキュリティ ---</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config)#</span> <span className="code-command">interface</span> <span className="code-param">FastEthernet0/1</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">switchport mode access</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">switchport port-security</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">switchport port-security maximum</span> <span className="code-number">2</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">switchport port-security violation</span> <span className="code-keyword">restrict</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">switchport port-security mac-address</span> <span className="code-keyword">sticky</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! --- DHCPスヌーピング ---</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config)#</span> <span className="code-command">ip dhcp snooping</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config)#</span> <span className="code-command">ip dhcp snooping vlan</span> <span className="code-number">10</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config)#</span> <span className="code-command">interface</span> <span className="code-param">GigabitEthernet0/1</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">ip dhcp snooping</span> <span className="code-keyword">trust</span></span>
                                <span className="code-line"><span className="code-comment">! 正規のDHCPサーバーに接続するアップリンクポートのみ「信頼」に設定する</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-comment">! --- 動的ARPインスペクション (DAI) ---</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config)#</span> <span className="code-command">ip arp inspection vlan</span> <span className="code-number">10</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config)#</span> <span className="code-command">interface</span> <span className="code-param">GigabitEthernet0/1</span></span>
                                <span className="code-line"><span className="code-prompt">Switch(config-if)#</span> <span className="code-command">ip arp inspection</span> <span className="code-keyword">trust</span></span>
                                <span className="code-line"><span className="code-comment">! DHCPスヌーピングと同じアップリンクポートを信頼設定にする</span></span>
                            </pre>
                        </div>

                        <h3>ポートセキュリティの違反モード（Violation Mode）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">モード</th>
                                        <th scope="col">動作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>protect</td>
                                        <td>超過したフレームを破棄。ログや通知は出さない</td>
                                    </tr>
                                    <tr>
                                        <td>restrict</td>
                                        <td>超過したフレームを破棄し、ログ・SNMPトラップを送信</td>
                                    </tr>
                                    <tr>
                                        <td>shutdown（デフォルト）</td>
                                        <td>ポート自体をerr-disable状態にしてシャットダウンする</td>
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
                            AAAとは、ネットワーク機器へのアクセス管理を体系化する考え方で、<strong>Authentication（認証）・Authorization（認可）・Accounting（アカウンティング）</strong>の頭文字です。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s58_aaa}
                                ariaLabel="AAAの処理シーケンス"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: AAAの処理シーケンス</p>

                        <h3>3つの要素の役割</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">要素</th>
                                        <th scope="col">意味</th>
                                        <th scope="col">具体例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Authentication（認証）</td>
                                        <td>「あなたは誰か」を確認する</td>
                                        <td>ユーザー名とパスワードでログイン、証明書認証</td>
                                    </tr>
                                    <tr>
                                        <td>Authorization（認可）</td>
                                        <td>「あなたに何が許可されているか」を決定する</td>
                                        <td>一般ユーザーはshowコマンドのみ、管理者はconfigも可能</td>
                                    </tr>
                                    <tr>
                                        <td>Accounting（アカウンティング）</td>
                                        <td>「いつ・誰が・何をしたか」を記録する</td>
                                        <td>ログイン日時、実行したコマンドの履歴を記録</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>RADIUSとTACACS+の比較</h3>
                        <p>
                            CCNAでは、AAAを実現する代表的なプロトコルとして <strong>RADIUS</strong> と <strong>TACACS+</strong> の違いも問われます。
                        </p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">RADIUS</th>
                                        <th scope="col">TACACS+</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>開発元</td>
                                        <td>業界標準（オープン）</td>
                                        <td>Cisco独自プロトコル</td>
                                    </tr>
                                    <tr>
                                        <td>トランスポート層</td>
                                        <td>UDP</td>
                                        <td>TCP</td>
                                    </tr>
                                    <tr>
                                        <td>暗号化範囲</td>
                                        <td>パスワード部分のみ暗号化</td>
                                        <td>パケット全体を暗号化</td>
                                    </tr>
                                    <tr>
                                        <td>認証と認可</td>
                                        <td>認証と認可を一体で処理</td>
                                        <td>認証・認可・アカウンティングを分離して処理可能</td>
                                    </tr>
                                    <tr>
                                        <td>主な用途</td>
                                        <td>ネットワークアクセス認証（Wi-Fi、VPNなど）で広く利用</td>
                                        <td>Cisco機器の管理アクセス（デバイスログイン）で多用</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>設定コマンド例（概念理解用）</h3>
                        <div className="code-block">
                            <div className="code-header">Cisco IOS CLI — AAAとRADIUSサーバーの設定例</div>
                            <pre>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">aaa new-model</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">radius server</span> <span className="code-keyword">MyRadius</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-radius-server)#</span> <span className="code-command">address ipv4</span> <span className="code-param">192.168.1.100</span></span>
                                <span className="code-line"><span className="code-prompt">Router(config-radius-server)#</span> <span className="code-command">key</span> <span className="code-keyword">MySharedSecret</span></span>
                                <span className="code-line"></span>
                                <span className="code-line"><span className="code-prompt">Router(config)#</span> <span className="code-command">aaa authentication login default group radius local</span></span>
                                <span className="code-line"><span className="code-comment">! まずRADIUSサーバーで認証し、応答がなければローカルアカウントにフォールバック</span></span>
                            </pre>
                        </div>
                    </section>

                    <hr />

                    {/* 5.9 無線セキュリティ */}
                    <section id="s5-9">
                        <h2>5.9 無線セキュリティプロトコル（WPA・WPA2・WPA3）</h2>
                        <h3>概要</h3>
                        <p>
                            無線LAN（Wi-Fi）は電波を使うため、有線LANよりも盗聴・不正接続のリスクが高くなります。そのため、暗号化・認証の規格が段階的に強化されてきました。
                        </p>

                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s59_wireless}
                                ariaLabel="無線セキュリティ規格の進化"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: 無線セキュリティ規格の進化</p>

                        <h3>WPA / WPA2 / WPA3 の比較</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">WPA</th>
                                        <th scope="col">WPA2</th>
                                        <th scope="col">WPA3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>暗号化方式</td>
                                        <td>TKIP（RC4ベース、脆弱性あり）</td>
                                        <td>AES-CCMP</td>
                                        <td>AES-GCMP（強度が高い）</td>
                                    </tr>
                                    <tr>
                                        <td>個人向け認証</td>
                                        <td>PSK（事前共有鍵）</td>
                                        <td>PSK</td>
                                        <td>SAE（より安全な鍵交換）</td>
                                    </tr>
                                    <tr>
                                        <td>オフライン辞書攻撃への耐性</td>
                                        <td>低い</td>
                                        <td>中程度</td>
                                        <td>高い（SAEにより大幅強化）</td>
                                    </tr>
                                    <tr>
                                        <td>企業向け認証</td>
                                        <td>802.1X/EAP対応</td>
                                        <td>802.1X/EAP対応</td>
                                        <td>802.1X/EAP対応（暗号強度が向上）</td>
                                    </tr>
                                    <tr>
                                        <td>現状の位置づけ</td>
                                        <td>事実上非推奨</td>
                                        <td>長らく業界標準として普及</td>
                                        <td>最新の推奨規格</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>覚えておきたいポイント</h3>
                        <ul>
                            <li><strong>WPA2のPSKモードは「事前共有鍵（パスフレーズ）」を全端末で共有する方式</strong>で、家庭やSOHO環境で一般的。</li>
                            <li><strong>WPA3のSAEは、通信を盗聴されても事前共有鍵を推測しにくい</strong>よう設計されており、WPA2 PSKの弱点（オフライン辞書攻撃）を大きく改善している。</li>
                            <li>企業環境では、個人ごとに異なる認証情報を使う <strong>802.1X（AAAと連携したエンタープライズモード）</strong> がより安全とされる。</li>
                        </ul>
                    </section>

                    <hr />

                    {/* 5.10 WLAN GUI設定 */}
                    <section id="s5-10">
                        <h2>5.10 GUIによるWLAN（WPA2 PSK）設定の考え方</h2>
                        <h3>概要</h3>
                        <p>
                            CCNAブループリントの5.10では、CLIコマンドではなく、<strong>WLC（Wireless LAN Controller）のGUI上でWLANを作成し、WPA2 PSKを設定する一連の流れを理解すること</strong>が求められます。実際の試験ではGUIのスクリーンショットを使った出題（シミュレーション形式）がある点が特徴です。
                        </p>

                        <h3>GUI設定の一般的な流れ</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram
                                chart={DIAGRAMS.s510_gui}
                                ariaLabel="WLC GUIでのWLAN設定フロー"
                                preserveNaturalScale
                            />
                        </div>
                        <p className="diagram-caption">図: WLC GUIでのWLAN設定フロー</p>

                        <h3>各ステップのポイント</h3>
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

                        <div className="callout">
                            <strong>試験対策のヒント：</strong>CLIの丸暗記よりも、「どのタブでどんな設定をするのか、大まかな位置関係と流れ」を理解しておくことが得点につながります。特に「セキュリティ設定はLayer2タブで行う」という点は狙われやすいポイントです。
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
                        <p>
                            セキュリティの基礎（5.0）は出題比率こそ15%ですが、<strong>ACLやAAA、レイヤー2セキュリティは他ドメイン（IP Connectivity、Network Access）とも関連が深く</strong>、実務でもよく使う内容です。単なる暗記ではなく、「なぜその機能が必要なのか」というストーリーで理解することをおすすめします。
                        </p>
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
                            <li>
                                Cisco Learning Network（200-301 CCNA Exam Topics 一覧ページ）<br />
                                <a
                                    href="https://learningnetwork.cisco.com/s/article/200-301-ccna-exam-topics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://learningnetwork.cisco.com/s/article/200-301-ccna-exam-topics
                                </a>
                            </li>
                        </ul>
                        <p className="footnote">
                            ※ブループリントは予告なく更新される場合があるため、受験前に必ず上記Cisco公式ページで最新情報をご確認ください。v1.1は2024年8月20日に発効し、2027年2月2日まで有効とされています（v2.0への切り替えは2027年2月3日予定）。
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
