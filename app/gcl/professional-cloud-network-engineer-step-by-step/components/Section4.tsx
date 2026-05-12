import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 4 content covering Hybrid/Multi-Cloud Network Connection.
 *
 * @returns The React element for Section 4 of the step-by-step guide
 */
export function Section4() {
    return (
        <section className={sharedStyles.section} id="s4" aria-labelledby="s4-title">
            <div className={sharedStyles.sectionLabel}>Section 4 (16%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s4-title" style={{ color: 'var(--color-primary)' }}>
                ハイブリッド/マルチクラウドネットワーク接続の構成と実装
            </h2>
            <p className={sharedStyles.sectionDesc}>
                Cloud Interconnect、Cloud VPN、Cloud Router、NCCを実際に構成するスキルが問われる。BGP属性の理解、SLA達成のためのトポロジ設計、BFD設定など実装の詳細まで出題される。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 4.1 Cloud Interconnectの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔌</span> 4.1 Cloud Interconnectの構成
                </h3>
                <p>
                    Cloud InterconnectはGoogleのネットワークとオンプレミス/他クラウドを物理的に接続する高帯域幅サービス。SLA達成のためのトポロジ設計と暗号化オプションが重要ポイント。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>🏢 Dedicated Interconnect：</strong> GoogleのColo施設に10G/100G回線を直接接続。VLAN attachmentを作成してVPCに接続。最高帯域・最低レイテンシ。自社でポートのプロビジョニングが必要。</li>
                    <li><strong>🤝 Partner Interconnect：</strong> 認定パートナー経由でGoogleネットワークに接続。50Mbps〜50Gbps。L2とL3接続タイプあり。L3はBGPをパートナー側で終端する。</li>
                    <li><strong>☁️ Cross-Cloud Interconnect：</strong> AWS、Azure等との専用線接続（10G/100G）。インターネットを経由しないマルチクラウド接続。GCPとAWS間のデータ転送コストを削減。</li>
                    <li><strong>🔒 HA VPN over Interconnect：</strong> InterconnectのVLAN attachmentの上でHA VPNを構成してIPsec暗号化を追加。物理的な専用線の安全性にIP層の暗号化を重ねる多層防御。</li>
                </ul>

                <div className={sharedStyles.infoBox}>
                    <strong>📋 SLA達成のためのトポロジ：</strong><br />
                    <strong>99.9%（2回線）：</strong> 同一メトロの2つのInterconnect設備に各1回線（合計2 VLAN attachment）<br />
                    <strong>99.99%（4回線）：</strong> 異なるメトロに2設備×2回線（合計4 VLAN attachment）。Google推奨の最高可用性構成。
                </div>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>本番環境では99.99% SLAトポロジ（異なるメトロ4回線構成）を採用し、メトロレベルの障害にも対応する</li>
                    <li>コンプライアンスや規制によりデータ暗号化が必要な場合はHA VPN over Interconnectを構成する</li>
                    <li>VLAN attachmentはINACTIVE状態で事前に作成しておき、BGPセッションの設定を事前に完了させてから有効化する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 4.2 サイト間IPsec VPNの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛡️</span> 4.2 サイト間IPsec VPNの構成
                </h3>
                <p>
                    Cloud VPNはIPsecを使ってオンプレミスやAWS/Azureとの暗号化されたVPN接続を提供。HA VPNは99.99% SLAを提供し、Classic VPNは99.9%のレガシー構成。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>HA VPN（推奨）：</strong> 2つのインターフェース（各外部IP）を持つHAゲートウェイ。BGP必須。2本のトンネルを同時に確立することで99.99% SLAを達成。新規構築ではこちらを使用。</li>
                    <li><strong>Classic VPN（非推奨）：</strong> 1つの外部IPを持つ単一ゲートウェイ。99.9% SLA。ルートベースとポリシーベースのVPNをサポート。新規構築では使用しないことを推奨。</li>
                </ul>

                <div className="code-block">
                    <div className="code-line"><span className="comment"># HA VPNゲートウェイの作成</span></div>
                    <div className="code-line">gcloud compute vpn-gateways create ha-vpn-gw \</div>
                    <div className="code-line">  --network=my-vpc \</div>
                    <div className="code-line">  --region=<span className="string">asia-northeast1</span></div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="comment"># Cloud Routerの作成（BGP用）</span></div>
                    <div className="code-line">gcloud compute routers create my-router \</div>
                    <div className="code-line">  --network=my-vpc \</div>
                    <div className="code-line">  --region=<span className="string">asia-northeast1</span> \</div>
                    <div className="code-line">  --asn=<span className="string">65001</span></div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="comment"># VPNトンネルの作成（インターフェース0）</span></div>
                    <div className="code-line">gcloud compute vpn-tunnels create tunnel-0 \</div>
                    <div className="code-line">  --vpn-gateway=ha-vpn-gw \</div>
                    <div className="code-line">  --peer-address=<span className="string">PEER_IP</span> \</div>
                    <div className="code-line">  --ike-version=<span className="string">2</span> \</div>
                    <div className="code-line">  --shared-secret=<span className="string">MY_SECRET</span> \</div>
                    <div className="code-line">  --router=my-router \</div>
                    <div className="code-line">  --vpn-gateway-interface=<span className="string">0</span> \</div>
                    <div className="code-line">  --region=<span className="string">asia-northeast1</span></div>
                </div>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>常にHA VPN（IKEv2）を使用し、Classic VPNへの新規投資は避ける</li>
                    <li>事前共有鍵（PSK）は自動生成の長いランダム文字列（32文字以上）を使用し、Secret Managerで安全に保管する</li>
                    <li>HA VPNのインターフェース0と1に対してそれぞれトンネルを作成し、BGPセッションを両方確立して真の冗長性を確保する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 4.3 Cloud Routerの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📡</span> 4.3 Cloud Routerの構成
                </h3>
                <p>
                    Cloud RouterはBGPスピーカーとして動作し、VPC間およびハイブリッド接続のルーティングを制御。BGP属性の理解とBFD設定が試験の頻出ポイント。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>🔢 BGP属性：</strong> <strong>ASN：</strong> 各Cloud RouterのAS番号（プライベートASN: 64512-65534推奨）。<strong>MED（メトリック）：</strong> 低い値が優先。フェイルオーバー制御に使用。<strong>LOCAL_PREF：</strong> 高い値が優先。プライマリ/バックアップ経路制御。<strong>認証：</strong> BGPセッションのMD5認証。</li>
                    <li><strong>⚡ BFD（双方向フォワーディング検出）：</strong> 標準BGPの障害検知（60秒+）を数秒に短縮するUDPベースのプロトコル。Cloud RouterとオンプレルーターでBFDを有効化してフェイルオーバーを高速化する。</li>
                    <li><strong>📢 カスタムルート広告：</strong> VPCサブネット以外のルートを選択的に広報（例：PSCエンドポイントのIP）。特定のオンプレレンジを広報から除外してセキュリティを向上。</li>
                    <li><strong>🎯 ベストパス選択：</strong> レガシーと標準のベストパス選択アルゴリズム。標準モードでは同じASNから複数パスを受信した場合にECMP（等コストマルチパス）を適用可能。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>BFDを有効化（最小送信間隔300ms、マルチプライヤ3等）してBGP障害検知を高速化する</li>
                    <li>カスタムルート広告を使ってVPCサブネット以外の到達可能なレンジ（PSCエンドポイント等）を必要に応じて広報する</li>
                    <li>BGP MD5認証を設定してBGPセッションへの不正接続やルート注入を防止する</li>
                    <li>Cloud Routerのクォータ（プロジェクト/リージョン/VPCあたり最大5つ）を把握して設計段階で計画する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 4.4 ハイブリッド接続でのNCC構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🕸️</span> 4.4 ハイブリッド接続でのNCC構成
                </h3>
                <p>
                    NCCをハイブリッド接続に活用して、オンプレミス拠点間のサイト間データ転送、ルーターアプライアンス（NVA）の接続、推移的ルーティング問題の解決が重要テーマ。
                </p>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>ハイブリッドスポークの作成：</strong> VPNトンネルまたはVLAN attachmentをNCCハブのスポークとして登録してオンプレミスを統合。</li>
                    <li><strong>サイト間データ転送：</strong> オンプレ拠点AからGCPハブを経由してオンプレ拠点BへGoogleのバックボーンで低遅延転送。</li>
                    <li><strong>ルーターアプライアンス（RA）：</strong> サードパーティのNVA（SD-WAN等）をNCCスポークとして登録してBGPピアリングを確立。</li>
                    <li><strong>推移的ルーティング問題の解決：</strong> VPCピアリングでは推移的ルーティングが不可だが、NCCハブ経由で複数スポーク間の通信を可能にする。</li>
                </ul>
            </div>
        </section>
    );
}
