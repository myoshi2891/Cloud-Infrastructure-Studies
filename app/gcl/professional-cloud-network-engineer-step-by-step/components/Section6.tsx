import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 6 content covering Cloud Network Security.
 *
 * @returns The React element for Section 6 of the step-by-step guide
 */
export function Section6() {
    return (
        <section className={sharedStyles.section} id="s6" aria-labelledby="s6-title">
            <div className={sharedStyles.sectionLabel}>Section 6 (13%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s6-title" style={{ color: 'var(--color-primary)' }}>
                クラウドネットワークセキュリティの構成と実装
            </h2>
            <p className={sharedStyles.sectionDesc}>
                Cloud Armor（WAF/DDoS）、Cloud NGFW、VPCファイアウォール、Cloud NAT、Secure Web Proxy、パケットミラーリングによる多層防御のネットワークセキュリティ構成が問われる。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 6.1 Google Cloud Armorポリシーの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛡️</span> 6.1 Google Cloud Armorポリシーの構成
                </h3>
                <p>
                    Cloud ArmorはGoogleのグローバルエッジで動作するDDoS防御とWAFサービス。外部Application LBに統合され、L3/L4 DDoSを自動吸収し、L7のWAFルールでアプリケーション攻撃を防御する。
                </p>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>エッジ/バックエンドセキュリティポリシーの構成：</strong> エッジポリシーはキャッシュ前に適用（CDNオリジンの保護）、バックエンドポリシーはLBバックエンドに適用。</li>
                    <li><strong>WAFルール（SQLi、XSS、RFI）：</strong> OWASP Top 10に対応するプリコンフィグルールを適用。プレビューモードで誤検知を確認してから強制モードへ移行。</li>
                    <li><strong>高度なネットワークDDoS防御とAdaptive Protection：</strong> L4フラッド攻撃の自動軽減。Adaptive Protectionで機械学習を使ったL7 DDoS攻撃の自動検知と緩和ルール提案。</li>
                    <li><strong>レート制限：</strong> IP単位のリクエストレートを制限してブルートフォース攻撃やDDoSを軽減。スロットリングとbanの設定。</li>
                    <li><strong>ボット管理：</strong> reCAPTCHAとの統合によるボットトラフィックの検知と管理。ヒューマンチャレンジの実装。</li>
                    <li><strong>Google Threat Intelligence：</strong> Googleが収集した脅威情報（悪意のあるIPリスト、Torノード等）に基づいてアクセスをフィルタリング。</li>
                </ul>

                <div className={sharedStyles.infoBox}>
                    <strong>🎯 セキュリティポリシーのルール優先度設計：</strong><br />
                    1. <strong>最高優先度：</strong> 明示的拒否（悪意IP、Geo制限、既知攻撃IP）<br />
                    2. <strong>高優先度：</strong> 明示的許可（セキュリティスキャナー、信頼IP）<br />
                    3. <strong>中優先度：</strong> WAFルール（SQLi、XSS等）<br />
                    4. <strong>最低優先度：</strong> デフォルト拒否（それ以外全て）
                </div>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>新しいWAFルールは必ずプレビューモードで先行デプロイし、誤検知がないことを確認してから強制モードに切り替える</li>
                    <li>Adaptive Protectionを有効化してL7 DDoS攻撃をMLで自動検知し、提案された緩和ルールを迅速に適用できる体制を整える</li>
                    <li>JSONペイロードの解析を有効化してAPIトラフィックのディープインスペクションで高度な攻撃を検出する</li>
                    <li>Cloud Armorのログ（requests.json）をBigQueryにエクスポートして長期的な攻撃傾向を分析し、ルールを最適化する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 6.2 Cloud NGFWポリシーとVPCファイアウォールルールの構成と管理 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔥</span> 6.2 Cloud NGFWポリシーとVPCファイアウォールルールの構成と管理
                </h3>
                <p>
                    Cloud NGFWはVPCファイアウォールの次世代版。階層型ポリシーによる組織全体の統一管理、L7パケットインスペクション（Enterprise Tier）、GKEとCloud LBとの統合が特徴。
                </p>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ティア</th>
                                <th scope="col">機能</th>
                                <th scope="col">ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>NGFW Essentials</td>
                                <td>L3/L4フィルタリング、ステートフルFW、階層型ポリシー、タグベース制御</td>
                                <td>VPCファイアウォールからの移行、組織ポリシー統一管理</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>NGFW Standard</td>
                                <td>Essentials機能 + 地理情報ベースフィルタリング、FQDN/URL/アドレスグループ</td>
                                <td>より高度なL4制御、URLフィルタリング</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>NGFW Enterprise</td>
                                <td>Standard機能 + L7パケットインスペクション（IDS/IPS統合）</td>
                                <td>高度な脅威防御、Palo Alto/Checkpoint等との統合</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>階層型ファイアウォールポリシー：</strong> 組織レベル→フォルダレベル→プロジェクトレベルの順で評価。上位で設定したルールは下位に継承され組織全体の基本セキュリティを統一。</li>
                    <li><strong>効果的なポリシールールの理解：</strong> 階層型ポリシーのどのレベルのルールが最終的に適用されるかを正確に把握する。gotoNextを使ったルールの継続評価。</li>
                    <li><strong>マイクロセグメンテーション：</strong> メタデータ（セキュアタグ）、サービスアカウント、ネットワークタグを使ってPod/VMレベルの細かいアクセス制御を実装。</li>
                    <li><strong>VPCファイアウォールからNGFWポリシーへの移行：</strong> 既存VPCファイアウォールルールをNGFWポリシーに変換する段階的な移行戦略。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>デフォルト拒否ポリシーを組織レベルのNGFWポリシーで設定し、全プロジェクトに強制適用する</li>
                    <li>IPレンジではなくセキュアタグまたはサービスアカウントでファイアウォールの対象を指定してマイクロセグメンテーションを実現する</li>
                    <li>ファイアウォールルールのログ記録を有効化し、Firewall Insightsで定期的に未使用ルールと過剰権限ルールを削除する</li>
                    <li>SSH（22番ポート）とRDP（3389番ポート）は全世界への公開（0.0.0.0/0）を絶対に許可せず、IAP経由（35.235.240.0/20）のみ許可する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 6.3 インターネットエグレストラフィックの保護（Cloud NAT / Secure Web Proxy） */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌐</span> 6.3 インターネットエグレストラフィックの保護（Cloud NAT / Secure Web Proxy）
                </h3>
                <p>
                    VPCからインターネットへのアウトバウンドトラフィックを制御する2つの主要なサービス。Cloud NATはIPアドレス変換、Secure Web ProxyはHTTP/HTTPSトラフィックのURLフィルタリングを提供。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>🔄 Cloud NAT：</strong> プロキシレスSDN実装でアウトバウンドIPを変換。<strong>IPアドレス割り当て：</strong> 自動（Google管理）または手動（静的予約IP）。<strong>ポート割り当て：</strong> 静的（固定ポート数/VM）または動的（DPA: 需要に応じて自動調整）。コンプライアンス用に固定外部IPが必要な場合は手動割り当てを使用。</li>
                    <li><strong>🔒 Secure Web Proxy：</strong> 明示的プロキシまたはインターセプトモードでHTTP/HTTPSトラフィックをフィルタリング。URLリスト、FQDNマッチング、TLS検査（Managed Certificate Authority経由）で許可/拒否ポリシーを適用。内部ワークロードから特定のURLのみアクセスを許可するホワイトリスト制御。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>すべてのVMに外部IPを持たせず、Cloud NAT経由でインターネットにアクセスさせてアタックサーフェスを最小化する</li>
                    <li>Cloud NATに動的ポート割り当て（DPA）を有効化して、接続数の変動に対してポートを効率的に割り当てる</li>
                    <li>Cloud NATのport_usageメトリクスに90%以上のアラートを設定し、ポート枯渇を事前に検知する</li>
                    <li>外部パッケージリポジトリへのアクセスを持つワークロードにはSecure Web Proxyを導入してURLレベルのホワイトリスト制御を実装する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 6.4 自己管理型NVAとパケットミラーリングの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔭</span> 6.4 自己管理型NVAとパケットミラーリングの構成
                </h3>
                <p>
                    サードパーティのNVA（NGFW、IDS/IPS等）をGCPに統合するパターンと、パケットキャプチャを使ったネットワーク分析の実装が問われる。
                </p>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>マルチNIC VM（NVA）によるVPC間トラフィックのルーティングと検査：</strong> 内部NICと外部NICを持つNGFWアプライアンスVMを展開し、すべてのトラフィックを検査するアーキテクチャ。</li>
                    <li><strong>HA マルチNIC VMルーティングの内部LBをネクストホップとした設定：</strong> 内部パススルーNLBをNVAクラスタのフロントエンドとし、静的ルートのネクストホップに指定。NVA障害時の自動フェイルオーバーを実現。</li>
                    <li><strong>ポリシーベースルートによるHA マルチNIC VMルーティング：</strong> 特定のトラフィック（プロトコル/送信先IP等）を選択的にNVAに誘導するより細かい制御。</li>
                    <li><strong>アウトオブバンドネットワークセキュリティ統合：</strong> Packet Mirroringを使ってNVAにトラフィックのコピーを送信し、本番トラフィックに影響を与えずに検査。</li>
                    <li><strong>パケットミラーリングの構成：</strong> ミラーリング対象（VMインスタンス/サブネット）を指定し、内部パススルーNLB経由でコレクターNVAに転送。フィルタでキャプチャするトラフィックを絞り込む。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>NVAは単一障害点を排除するため複数VMで構成し、内部LBをネクストホップとした静的ルートでHA構成にする</li>
                    <li>本番トラフィックの検査にはインライン（ブロック可能）とアウトオブバンド（Packet Mirroring、検知のみ）を要件に応じて使い分ける</li>
                    <li>Packet Mirroringはコレクターの処理能力に合わせてフィルタ条件を設定し、不要なトラフィックのミラーリングコストを削減する</li>
                    <li>Cloud IDSを活用してPacket Mirroring + Google管理のIDSバックエンドという最小運用コストのIDS構成を実現する</li>
                </ul>
            </div>
        </section>
    );
}
