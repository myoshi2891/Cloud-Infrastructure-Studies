import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 2 content covering VPC network implementation.
 *
 * @returns The React element for Section 2 of the step-by-step guide
 */
export function Section2() {
    return (
        <section className={sharedStyles.section} id="s2" aria-labelledby="s2-title">
            <div className={sharedStyles.sectionLabel}>Section 2 (20%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s2-title" style={{ color: 'var(--color-primary)' }}>
                VPCネットワークの実装
            </h2>
            <p className={sharedStyles.sectionDesc}>
                設計したVPCを実際に構成・実装するスキルが問われる。
                VPCリソースの作成、ルーティング、NCC構成、GKEクラスタの実装まで、
                gcloudコマンドや設定の詳細まで理解が必要。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 2.1 VPCの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">⚙️</span> 2.1 VPCの構成
                </h3>
                <p>
                    VPCネットワーク、サブネット、ファイアウォールルール/ポリシーの作成から、VPC Peering、Shared VPC構成、Google APIへのアクセス設定、VPC Service Controls境界の設定まで実装スキルが問われる。
                </p>

                <div className="code-block">
                    <div className="code-line"><span className="comment"># カスタムモードVPCの作成</span></div>
                    <div className="code-line">gcloud compute networks create my-vpc \</div>
                    <div className="code-line">  --subnet-mode=<span className="string">custom</span> \</div>
                    <div className="code-line">  --mtu=<span className="string">1460</span></div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="comment"># サブネットの作成（プライベートGoogleアクセス有効）</span></div>
                    <div className="code-line">gcloud compute networks subnets create web-subnet \</div>
                    <div className="code-line">  --network=my-vpc \</div>
                    <div className="code-line">  --region=asia-northeast1 \</div>
                    <div className="code-line">  --range=<span className="string">10.0.1.0/24</span> \</div>
                    <div className="code-line">  --enable-private-ip-google-access</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="comment"># ファイアウォールルールの作成（タグベース）</span></div>
                    <div className="code-line">gcloud compute firewall-rules create allow-https-web \</div>
                    <div className="code-line">  --network=my-vpc \</div>
                    <div className="code-line">  --action=<span className="string">ALLOW</span> \</div>
                    <div className="code-line">  --rules=<span className="string">tcp:443</span> \</div>
                    <div className="code-line">  --target-tags=<span className="string">web-server</span> \</div>
                    <div className="code-line">  --source-ranges=<span className="string">0.0.0.0/0</span></div>
                </div>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>VPC Network Peeringの構成：</strong> 双方向の承認が必要。IPオーバーラップがないことを確認してからピアリングを作成する。</li>
                    <li><strong>Shared VPCの作成とサブネット共有：</strong> ホストプロジェクトの有効化 → サービスプロジェクトの関連付け → networkUserロールの付与の手順で実施。</li>
                    <li><strong>Google APIへのアクセス設定：</strong> Private Google Accessをサブネット単位で有効化し、VPC内のVMが外部IPなしでGoogle APIにアクセスできるようにする。</li>
                    <li><strong>VPCサブネット範囲の拡張：</strong> 既存サブネットのプレフィックス長を短くすることで範囲を拡張可能（縮小は不可）。</li>
                    <li><strong>VPC Service Controls境界：</strong> Google Cloudサービス（BigQuery、Cloud Storage等）へのアクセスをネットワーク境界で制限してデータ漏洩を防止。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>ファイアウォールルールはIPレンジではなくサービスアカウントまたはネットワークタグで対象を指定し、管理性を高める</li>
                    <li>すべてのサブネットでPrivate Google Accessを有効化し、VMが外部IPなしでGoogle APIにアクセスできるようにする</li>
                    <li>Shared VPCのサブネット権限はプロジェクトレベルではなくサブネットレベルで付与し、最小権限を実現する</li>
                    <li>VPC Service Controlsはまずドライランモードで設定し、違反ログを分析してから強制モードに移行する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 2.2 VPCルーティングの構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛣️</span> 2.2 VPCルーティングの構成
                </h3>
                <p>
                    静的ルート・動的ルート（Cloud Router）の設定、グローバル/リージョナルダイナミックルーティング、ネットワークタグと優先度によるルーティング、内部LBをネクストホップとした構成、ポリシーベースルーティングが問われる。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>📌 静的ルート：</strong> 手動でルーティングテーブルを設定。NVAのネクストホップに使用。ネットワークタグで特定VMのみに適用可能。変更には手動更新が必要でオペレーションコストが高い。</li>
                    <li><strong>🔄 動的ルート（Cloud Router）：</strong> BGPを使って自動的にルートを学習・広報。Interconnect・VPN接続に必須。リージョンまたはグローバルのダイナミックルーティングモードを設定。</li>
                    <li><strong>🎯 ポリシーベースルーティング：</strong> 送信元IP、宛先IP、プロトコルなどに基づいてパケットごとにルートを選択。通常のルーティングテーブルより細かい制御が可能。IDS/IPSへのトラフィック誘導に活用。</li>
                    <li><strong>⚖️ 内部LBをネクストホップ：</strong> NVAクラスタを内部パススルーLBの後ろに配置し、スタティックルートのネクストホップとして指定。NVA障害時の自動フェイルオーバーを実現。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>ダイナミックルーティングはグローバルモードを使用し、全リージョンのサブネットをCloud Router経由で広報する</li>
                    <li>カスタムルート広告を使ってVPCサブネット以外のルート（例：PSCエンドポイントのIP）を選択的に広報する</li>
                    <li>NVAはHA構成にし、内部LBをネクストホップとして静的ルートを設定することでNVA障害時の自動切り替えを実現する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 2.3 Network Connectivity Center（NCC）の構成 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔀</span> 2.3 Network Connectivity Center（NCC）の構成
                </h3>
                <p>
                    NCCはハブ＆スポークモデルでVPCと外部ネットワークを統合する次世代のネットワーク集約サービス。スポークタイプの違い、トポロジ管理、Private NATとPSC伝播が重要テーマ。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>VPCスポーク：</strong> VPCネットワークをNCCハブに接続。複数VPC間の推移的ルーティングを実現し、複雑なピアリングメッシュを排除する。</li>
                    <li><strong>ハイブリッドスポーク：</strong> Cloud VPNトンネルまたはVLAN attachmentをスポークとしてNCCハブに接続。オンプレミスをVPCと同じハブで管理。</li>
                    <li><strong>プロデューサースポーク：</strong> PSCを通じてプロデューサーサービスをNCCハブに統合するスポーク。マネージドサービスへのアクセスを一元管理。</li>
                    <li><strong>📡 Private NAT + PSC伝播：</strong> IPが重複する環境でPrivate NATを使用してNATトランスレーションを実施。PSCエンドポイントをNCC経由で伝播し、ハブに接続した全スポークからアクセス可能にする。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>大規模マルチVPC環境ではVPCピアリングのメッシュよりNCCハブ＆スポークを採用して管理を簡素化する</li>
                    <li>サイト間データ転送機能を活用してオンプレ拠点間の通信をGoogleのバックボーン経由でルーティングする</li>
                    <li>IP/CIDRフィルタリングを設定して、スポーク間で広報するルートを必要最小限に制限する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 2.4 GKEクラスタの構成と管理 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🐳</span> 2.4 GKEクラスタの構成と管理
                </h3>
                <p>
                    VPC-nativeクラスタ、Shared VPC連携、プライベートクラスタ、GKE Dataplane V2、SNAT/IPマスカレードポリシー、GKEネットワークポリシー、DNS構成など実装レベルの詳細が問われる。
                </p>

                <h4 className={sharedStyles.subHeading}>主要な実装タスク</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>VPC-nativeクラスタ（エイリアスIP）の作成：</strong> <code>--enable-ip-alias</code> フラグでPodとServiceにVPCネイティブのIPを割り当てる。</li>
                    <li><strong>Shared VPCとのクラスタ連携：</strong> ホストプロジェクトのサブネットとセカンダリレンジをサービスプロジェクトのGKEクラスタで使用。</li>
                    <li><strong>プライベートクラスタと認定ネットワーク：</strong> コントロールプレーンへのアクセスをauthorized networksで制限し、セキュリティを強化。</li>
                    <li><strong>GKE Dataplane V2の有効化：</strong> eBPFベースのデータプレーンでネットワークポリシーを高速処理し、可観測性を向上。</li>
                    <li><strong>SNATとIPマスカレードポリシー：</strong> Pod→外部通信の送信元IP変換を制御。ClusterIPサービスとの通信でのIPマスカレードを管理。</li>
                    <li><strong>GKEネットワークポリシー：</strong> Pod間通信をラベルセレクタで制御するマイクロセグメンテーション。Ingress/Egressルールを定義。</li>
                    <li><strong>DNS構成：</strong> ローカルDNSキャッシュ（NodeLocal DNSCache）、Cloud DNS、kube-dnsの選択と設定。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>GKE Dataplane V2を有効化してNetworkPolicyを適用し、Pod間の通信を必要なもののみ許可するゼロトラスト設計を実現する</li>
                    <li>NodeLocal DNSCacheを有効化してDNS解決レイテンシを削減し、kube-dnsへの負荷を軽減する</li>
                    <li>プライベートクラスタにDNSベースのエンドポイントを使用してコントロールプレーンへのアクセスをより柔軟に管理する</li>
                </ul>
            </div>
        </section>
    );
}
