import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 3 content covering Managed Network Services.
 *
 * @returns The React element for Section 3 of the step-by-step guide
 */
export function Section3() {
    return (
        <section className={sharedStyles.section} id="s3" aria-labelledby="s3-title">
            <div className={sharedStyles.sectionLabel}>Section 3 (16%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s3-title" style={{ color: 'var(--color-primary)' }}>
                マネージドネットワークサービスの構成
            </h2>
            <p className={sharedStyles.sectionDesc}>
                ロードバランシング、Cloud CDN、Cloud DNSという3つの主要マネージドサービスの設定・管理・最適化が問われる。LBのバックエンド設定からDNSSECまで幅広く出題。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 3.1 ロードバランシングの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">⚖️</span> 3.1 ロードバランシングの構成
                </h3>
                <p>
                    GCPのロードバランサは世界最大規模のソフトウェア定義LBサービス。バックエンドサービス設定、NEG、GKEでのLB、Application LBでのトラフィック管理が重要トピック。
                </p>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">LB種別</th>
                                <th scope="col">レイヤー</th>
                                <th scope="col">スコープ</th>
                                <th scope="col">方向</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Global External ALB</td>
                                <td>L7 HTTP(S)</td>
                                <td>グローバル</td>
                                <td>外部</td>
                                <td>Anycast IP、URLルーティング、Cloud CDN/Armor統合</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Regional External ALB</td>
                                <td>L7 HTTP(S)</td>
                                <td>リージョン</td>
                                <td>外部</td>
                                <td>リージョン内限定、コンプライアンス対応</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Internal ALB</td>
                                <td>L7 HTTP(S)</td>
                                <td>リージョン/クロスリージョン</td>
                                <td>内部</td>
                                <td>VPC内マイクロサービス間L7制御</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>External Proxy NLB</td>
                                <td>L4 TCP/SSL</td>
                                <td>グローバル/リージョン</td>
                                <td>外部</td>
                                <td>SSLオフロード、TCPプロキシ</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>External Passthrough NLB</td>
                                <td>L4</td>
                                <td>リージョン</td>
                                <td>外部</td>
                                <td>DSR、送信元IP保持、UDP対応</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Internal Passthrough NLB</td>
                                <td>L4</td>
                                <td>リージョン</td>
                                <td>内部</td>
                                <td>VPC内部での透過的LB、NVA HA構成に必須</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className={sharedStyles.subHeading}>重要な実装ポイント</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>バックエンドサービスの設定：</strong> NEG（コンテナネイティブ）またはMIG（VMベース）、バランシング方式（使用率/接続数/RPS）、セッションアフィニティ、ヘルスチェック設定。</li>
                    <li><strong>GKEでのLB：</strong> GKE Gatewayコントローラ（L7）、GKE Ingressコントローラ（L7）、NEGを使ったコンテナネイティブLBでPodへ直接転送。</li>
                    <li><strong>Application LBのトラフィック管理：</strong> URL書き換え、トラフィックミラーリング、トラフィック分割（カナリアデプロイ）、ヘッダーベースルーティング。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>GKEワークロードにはNEGを使ったコンテナネイティブLBを採用し、kube-proxyのNATオーバーヘッドを排除して送信元IPを保持する</li>
                    <li>本番Webアプリには必ずGlobal External ALBにCloud Armorを組み合わせてDDoS/WAF保護を有効化する</li>
                    <li>ヘルスチェックの間隔・タイムアウト・閾値を適切に設定し、障害の迅速な検知と回復を実現する</li>
                    <li>GKE Gateway APIを使用してL7の高度なトラフィック管理（加重ルーティング、ヘッダー変換等）を実装する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 3.2 Cloud CDNの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🚀</span> 3.2 Cloud CDNの構成
                </h3>
                <p>
                    Cloud CDNはGoogle Cloud Load Balancingと統合されたエッジキャッシュサービス。MIG、Cloud Storage、Cloud Runなど多様なオリジンに対応し、外部バックエンド（インターネットNEG）にも使用可能。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>📦 対応オリジン：</strong> MIG、Cloud Storage、Cloud Run、App Engine、カスタムオリジン（インターネットNEG、サードパーティオブジェクトストレージ含む）。</li>
                    <li><strong>🗑️ キャッシュ無効化：</strong> <code>gcloud compute url-maps invalidate-cdn-cache</code>コマンドでURLパターン指定（ワイルドカード対応）のキャッシュパージが可能。即座に全エッジに反映される。</li>
                    <li><strong>⚙️ キャッシュモード：</strong> CACHE_ALL_STATIC（静的コンテンツ自動キャッシュ）、USE_ORIGIN_HEADERS（オリジンヘッダーに従う）、FORCE_CACHE_ALL（強制キャッシュ）の3種類。</li>
                    <li><strong>🔑 Signed URL/Cookie：</strong> プレミアムコンテンツのアクセス制御。Signed URLで個別コンテンツを保護し、Signed Cookieで複数リソースへの一括アクセスを制御する。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>静的コンテンツ（画像・CSS・JS・動画）は積極的にCloud CDNでキャッシュし、オリジンの負荷とレイテンシを削減する</li>
                    <li>オリジンにCache-Controlヘッダーを正確に設定し、動的コンテンツや認証後コンテンツは必ずno-storeで保護する</li>
                    <li>キャッシュヒット率をCloud Monitoringで監視し、80%未満の場合はキャッシュキー設計を見直す</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 3.3 Cloud DNSの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔍</span> 3.3 Cloud DNSの構成
                </h3>
                <p>
                    Cloud DNSはGoogleが提供するスケーラブルで低遅延のマネージドDNSサービス。ゾーン管理、ルーティングポリシー、DNSSEC、ハイブリッドDNS統合、スプリットホライズンDNSが重要テーマ。
                </p>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>Cloud DNSゾーンとレコードの管理：</strong> パブリックゾーン、プライベートゾーンの作成とA/AAAA/CNAME/MX/TXTレコード管理。</li>
                    <li><strong>DNSルーティングポリシー：</strong> 位置情報ポリシー（ジオロケーション）でユーザーの地理的位置に基づいてレスポンスを制御。フェイルオーバーポリシーで障害時の自動切り替え。</li>
                    <li><strong>DNSSEC（DNS Security Extensions）：</strong> DNSキャッシュポイズニング攻撃を防御するデジタル署名。パブリックゾーンでDNSSECを有効化してセキュリティを強化。</li>
                    <li><strong>自己ホスト型DNS統合（転送・サーバーポリシー）：</strong> オンプレミスDNSとCloud DNSを統合するための転送ゾーンとインバウンドサーバーポリシーの設定。</li>
                    <li><strong>スプリットホライズンDNS：</strong> 同じドメイン名に対してパブリックゾーンとプライベートゾーンで異なるレコードを返す設定。内部IPと外部IPを使い分ける。</li>
                    <li><strong>DNSクロスプロジェクトバインディングとDNSピアリング：</strong> 別プロジェクトのプライベートゾーンを使用し、複数VPCにまたがるDNS解決を統合する。</li>
                    <li><strong>GKEとexternal-dnsオペレータ：</strong> KubernetesリソースのライフサイクルにCloud DNSレコードを自動同期するexternal-dnsの構成。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>すべての公開ゾーンでDNSSECを有効化してDNSハイジャックとキャッシュポイズニングから保護する</li>
                    <li>ハイブリッド環境ではShared VPCのホストプロジェクトに転送ゾーンを一元化し、複数VPCからDNSピアリングで利用する</li>
                    <li>移行前はTTLを短縮（300秒等）してからIPを変更し、移行完了後にTTLを元の値（86400秒等）に戻す</li>
                    <li>GKEクラスタにはNodeLocal DNSCacheを有効化してDNS解決を高速化し、kube-dnsへの負荷を軽減する</li>
                </ul>
            </div>
        </section>
    );
}
