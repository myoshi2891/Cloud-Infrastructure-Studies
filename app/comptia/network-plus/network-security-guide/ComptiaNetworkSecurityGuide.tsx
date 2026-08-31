'use client';

import React, { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-wrapper">
            <div className="mermaid-render">
                <MermaidDiagram
                    chart={chart}
                    ariaLabel={label}
                    preserveNaturalScale={true}
                />
            </div>
        </div>
    );
});

const CHECKLIST_ROWS = [
    '暗号化(in transit / at rest)の違いを説明できる',
    'PKI・証明書の役割を説明できる',
    'RADIUS / TACACS+ / LDAP / SAML の違いを説明できる',
    'MFA・SSO・最小権限・RBACの意味を説明できる',
    'ハニーポットとハニーネットの違いを説明できる',
    'Risk / Vulnerability / Exploit / Threat の関係を説明できる',
    'CIA Triad の3要素を説明できる',
    'PCI DSS と GDPR の違いを説明できる',
    'IoT/OT/Guest/BYODをなぜ分離するか説明できる',
    'DoS/DDoS、VLANホッピング、MACフラッディングの違いを説明できる',
    'ARP poisoning/spoofing と DNS poisoning/spoofing の違いを説明できる',
    'Evil twin と on-path attack の関係を説明できる',
    '代表的なソーシャルエンジニアリングの手口を4つ挙げられる',
    'デバイスハードニングの基本2点を説明できる',
    'Port security / 802.1X / MAC filtering の違いを説明できる',
    'ACL・URLフィルタリング・コンテンツフィルタリングの違いを説明できる',
    'Screened subnet(旧DMZ)の役割を説明できる',
];

/**
 * CompTIA Network+ (N10-009) Domain 4.0 Network Security 完全ガイドコンポーネント
 */
export function ComptiaNetworkSecurityGuide() {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const toggleCheck = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="comptia-network-security-page">
            <div className="layout">
                <NavBar />

                <main className="main content">
                    <div className="hero">
                        <div className="hero-eyebrow">
                            <i className="ti ti-certificate"></i>
                            CompTIA Network+ N10-009 対策ガイド
                        </div>
                        <h1>ドメイン4.0「ネットワークセキュリティ」完全ガイド</h1>
                        <p>
                            CompTIA Network+ 認定試験(試験コード: N10-009 / V9)のドメイン4.0 Network
                            Security(出題比率14%)を、初学者にもわかるようにステップバイステップで解説します。日本語での解説をベースに、試験に出る英語の技術用語はそのまま併記しています。
                        </p>
                        <div className="meta-badges">
                            <span className="badge">試験コード N10-009</span>
                            <span className="badge">ドメイン4.0 出題比率 14%</span>
                            <span className="badge">対象: 初学者</span>
                            <span className="badge">構成: 4.1 → 4.2 → 4.3</span>
                        </div>
                    </div>

                    <section id="overview" tabIndex={-1}>
                        <div className="section-icon-title">
                            <i className="ti ti-map"></i>
                            <h2>全体像:試験におけるネットワークセキュリティの位置づけ</h2>
                        </div>
                        <p>
                            まずは、ドメイン4.0が試験全体のどこに位置し、どんなサブトピックで構成されているかを掴みましょう。
                        </p>

                        <h3>試験の基本情報</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>試験コード</td>
                                    <td>N10-009(V9)</td>
                                </tr>
                                <tr>
                                    <td>リリース日</td>
                                    <td>2024年6月20日</td>
                                </tr>
                                <tr>
                                    <td>出題数</td>
                                    <td>最大90問(多肢選択式 + performance-based question)</td>
                                </tr>
                                <tr>
                                    <td>試験時間</td>
                                    <td>90分</td>
                                </tr>
                                <tr>
                                    <td>合格ライン</td>
                                    <td>720点(100〜900点満点)</td>
                                </tr>
                                <tr>
                                    <td>推奨経験</td>
                                    <td>
                                        CompTIA A+ 取得済み、または9〜12ヶ月程度のネットワーク実務経験
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>5つのドメインと出題比率</h3>
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
                                    <td>Networking Concepts(ネットワークの基礎概念)</td>
                                    <td>23%</td>
                                </tr>
                                <tr>
                                    <td>2.0</td>
                                    <td>Network Implementation(ネットワークの実装)</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>3.0</td>
                                    <td>Network Operations(ネットワークの運用)</td>
                                    <td>19%</td>
                                </tr>
                                <tr>
                                    <td><strong>4.0</strong></td>
                                    <td><strong>Network Security(ネットワークセキュリティ)</strong></td>
                                    <td><strong>14%</strong></td>
                                </tr>
                                <tr>
                                    <td>5.0</td>
                                    <td>Network Troubleshooting(トラブルシューティング)</td>
                                    <td>24%</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="callout info">
                            <i className="ti ti-info-circle"></i>
                            <p>
                                ドメイン4.0は単体では出題比率が最も小さいですが、CompTIAは「より深いセキュリティ内容はSecurity+側で扱う」という設計思想を取っており、Network+側はネットワーク技術者が最低限押さえるべき土台部分に絞られています。裏を返せば、ここに出る内容は運用者にとって「知らないでは済まされない」基礎知識です。
                            </p>
                        </div>

                        <h3>ドメイン4.0の構造(3つのサブ目標)</h3>

                        <Diagram
                            id="diag-domain4-structure"
                            label="図1: ドメイン4.0の3つのサブ目標とその内訳"
                        />
                        <div className="diagram-caption">図1: ドメイン4.0の3つのサブ目標とその内訳</div>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サブ目標</th>
                                    <th scope="col">公式タイトル(意訳)</th>
                                    <th scope="col">一言でいうと</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>4.1</td>
                                    <td>基本的なネットワークセキュリティの概念を説明する</td>
                                    <td>「何を」「なぜ」守るのかという土台の考え方</td>
                                </tr>
                                <tr>
                                    <td>4.2</td>
                                    <td>さまざまな攻撃の種類とネットワークへの影響を要約する</td>
                                    <td>「どう攻撃されるか」を知る</td>
                                </tr>
                                <tr>
                                    <td>4.3</td>
                                    <td>
                                        シナリオに基づき、セキュリティ機能・防御技術・ソリューションを適用する
                                    </td>
                                    <td>「どう防ぐか」を実践する</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            この3ステップは「概念 → 脅威 →
                            対策」という自然な学習の流れになっています。以降、順に見ていきましょう。
                        </p>
                    </section>

                    <section id="concepts" tabIndex={-1}>
                        <div className="section-icon-title">
                            <i className="ti ti-lock"></i>
                            <h2>STEP 1: 4.1 基本的なネットワークセキュリティの概念</h2>
                        </div>

                        <h3>1-1 論理セキュリティ(Logical Security)</h3>
                        <p>
                            論理セキュリティとは、物理的な鍵やカメラではなく、データやアクセス権そのものを技術的に保護する仕組みを指します。
                        </p>

                        <h4>(a) 暗号化(Encryption)</h4>
                        <p>
                            データは「動いている状態」と「止まっている状態」の2つの場面で保護する必要があります。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">状態</th>
                                    <th scope="col">英語表記</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>通信中のデータ</td>
                                    <td>Data in transit</td>
                                    <td>HTTPS、VPN、TLSによる暗号化通信</td>
                                </tr>
                                <tr>
                                    <td>保存中のデータ</td>
                                    <td>Data at rest</td>
                                    <td>ディスク暗号化、データベースの暗号化</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>(b) 証明書と公開鍵基盤(PKI)</h4>
                        <p>
                            <strong>PKI(Public Key Infrastructure)</strong>:
                            公開鍵と秘密鍵のペアを使い、通信相手の身元と、通信内容の暗号化・改ざん検知を同時に実現する仕組みです。<br />{' '}
                            <strong>自己署名証明書(Self-signed certificate)</strong>:
                            第三者の認証局(CA)を通さず自分で発行した証明書。社内検証環境などでは使われますが、外部向けサービスでは信頼性の面で推奨されません。
                        </p>

                        <h4>(c) IAM(Identity and Access Management)— 認証と認可の仕組み</h4>
                        <p>
                            IAMは「誰が」「何に」「どこまで」アクセスできるかを制御する枠組み全体を指します。試験では特に、次の要素を区別できることが重要です。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">要素</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Authentication(認証)</td>
                                    <td>「あなたは誰か」を確認するプロセス</td>
                                </tr>
                                <tr>
                                    <td>Authorization(認可)</td>
                                    <td>認証された相手に「何を許可するか」を決めるプロセス</td>
                                </tr>
                                <tr>
                                    <td>MFA(Multifactor Authentication)</td>
                                    <td>
                                        パスワードに加え、SMSコードや生体認証など複数の要素で認証を強化する方式
                                    </td>
                                </tr>
                                <tr>
                                    <td>SSO(Single Sign-On)</td>
                                    <td>1回のログインで複数のシステムにアクセスできる仕組み</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>認証・認可でよく使われるプロトコルの比較は次の通りです。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">通信の暗号化</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>RADIUS</td>
                                    <td>ネットワーク機器・VPN・Wi-Fiの認証</td>
                                    <td>ペイロードの一部のみ暗号化</td>
                                    <td>
                                        AAA(認証・認可・アカウンティング)の代表的プロトコル。UDPベース
                                    </td>
                                </tr>
                                <tr>
                                    <td>TACACS+</td>
                                    <td>ネットワーク機器の管理者アクセス制御</td>
                                    <td>全体を暗号化</td>
                                    <td>
                                        Cisco系機器で多用。認証・認可・アカウンティングを分離して制御可能
                                    </td>
                                </tr>
                                <tr>
                                    <td>LDAP</td>
                                    <td>ディレクトリサービスへの問い合わせ</td>
                                    <td>標準では平文(LDAPSで暗号化)</td>
                                    <td>ユーザー情報やグループ情報を一元管理</td>
                                </tr>
                                <tr>
                                    <td>SAML</td>
                                    <td>Webアプリのシングルサインオン</td>
                                    <td>XMLベースのアサーションを署名・暗号化</td>
                                    <td>クラウドサービスとの連携(SSO)で多用</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram
                            id="diag-iam-flow"
                            label="図2: IAMにおける認証・認可(AAA)の流れ"
                        />
                        <div className="diagram-caption">図2: IAMにおける認証・認可(AAA)の流れ</div>

                        <p>その他、押さえておきたい関連用語:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Time-based authentication</td>
                                    <td>
                                        時刻に基づくワンタイムパスワードなど、時間の要素を組み込んだ認証
                                    </td>
                                </tr>
                                <tr>
                                    <td>Least privilege(最小権限の原則)</td>
                                    <td>
                                        ユーザーには業務に必要な最小限の権限だけを与えるという考え方
                                    </td>
                                </tr>
                                <tr>
                                    <td>RBAC(Role-Based Access Control)</td>
                                    <td>個人ではなく「役割(ロール)」単位で権限を割り当てる方式</td>
                                </tr>
                                <tr>
                                    <td>Geofencing(ジオフェンシング)</td>
                                    <td>
                                        位置情報をもとに、特定の地理的範囲内からのみアクセスを許可する仕組み
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1-2 物理セキュリティ(Physical Security)</h3>
                        <p>
                            論理セキュリティだけでは不十分で、サーバールームや配線盤への物理的な侵入対策も必要です。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Camera(監視カメラ)</td>
                                    <td>不正な立ち入りの抑止・記録</td>
                                </tr>
                                <tr>
                                    <td>Locks(施錠)</td>
                                    <td>ラックや部屋そのものへの物理的アクセス制限</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1-3 欺瞞技術(Deception Technologies)</h3>
                        <p>
                            攻撃者を「おとり」に誘導し、実際の資産を守りながら攻撃の手口を観察するための技術です。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Honeypot(ハニーポット)</td>
                                    <td>
                                        攻撃者を引きつけるためにわざと用意した、脆弱に見える単体のシステムやサービス
                                    </td>
                                </tr>
                                <tr>
                                    <td>Honeynet(ハニーネット)</td>
                                    <td>
                                        ハニーポットを複数組み合わせて構築した、より本物らしいおとりのネットワーク環境
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1-4 セキュリティの基本用語</h3>
                        <p>まずリスクに関する4つの用語の関係を整理しましょう。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">用語</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Threat(脅威)</td>
                                    <td>
                                        損害を引き起こす可能性のある要因そのもの(攻撃者、自然災害など)
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vulnerability(脆弱性)</td>
                                    <td>攻撃者に悪用され得る、システムやプロセスの弱点</td>
                                </tr>
                                <tr>
                                    <td>Exploit(エクスプロイト)</td>
                                    <td>脆弱性を実際に悪用するための具体的な手段・コード</td>
                                </tr>
                                <tr>
                                    <td>Risk(リスク)</td>
                                    <td>脅威が脆弱性を突いて実際に損害が発生する可能性とその影響度</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            続いて、情報セキュリティの目的を表す代表的なフレームワークが{' '}
                            <strong>CIA Triad</strong> です。
                        </p>

                        <Diagram
                            id="diag-cia-triad"
                            label="図3: CIA Triad(機密性・完全性・可用性)"
                        />
                        <div className="diagram-caption">図3: CIA Triad(機密性・完全性・可用性)</div>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">要素</th>
                                    <th scope="col">意味</th>
                                    <th scope="col">侵害された場合の例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Confidentiality(機密性)</td>
                                    <td>許可された者だけが情報にアクセスできる状態を保つこと</td>
                                    <td>顧客情報の漏えい</td>
                                </tr>
                                <tr>
                                    <td>Integrity(完全性)</td>
                                    <td>情報が改ざんされず正確な状態を保つこと</td>
                                    <td>送金額の不正な書き換え</td>
                                </tr>
                                <tr>
                                    <td>Availability(可用性)</td>
                                    <td>必要な時に情報やシステムへアクセスできる状態を保つこと</td>
                                    <td>DDoS攻撃によるサービス停止</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="callout info">
                            <i className="ti ti-info-circle"></i>
                            <p>
                                CIA
                                Triadは米国立標準技術研究所(NIST)の情報セキュリティ文書群でも共通の基本モデルとして使われている、業界標準の考え方です。
                            </p>
                        </div>

                        <h3>1-5 監査と規制コンプライアンス</h3>
                        <p>
                            企業ネットワークは、業界や地域ごとの法規制・基準に準拠する必要があります。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Data locality(データローカリティ)</td>
                                    <td>データを特定の国・地域内に保存・処理する義務や制約</td>
                                </tr>
                                <tr>
                                    <td>PCI DSS(Payment Card Industry Data Security Standard)</td>
                                    <td>クレジットカード情報を扱う事業者向けのセキュリティ基準</td>
                                </tr>
                                <tr>
                                    <td>GDPR(General Data Protection Regulation)</td>
                                    <td>
                                        EU域内の個人データ保護に関する規則。域外の事業者にも適用され得る
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1-6 ネットワークセグメンテーション</h3>
                        <p>
                            すべての機器を1つのフラットなネットワークに置くと、1台が侵害された際の被害範囲が広がります。そこで、用途やリスクの性質ごとにネットワークを分割します。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">セグメント</th>
                                    <th scope="col">対象</th>
                                    <th scope="col">分離する理由</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>IoT / IIoT</td>
                                    <td>スマート機器、産業用IoT機器</td>
                                    <td>一般に更新頻度が低くセキュリティパッチが遅れがちなため</td>
                                </tr>
                                <tr>
                                    <td>SCADA / ICS / OT</td>
                                    <td>産業制御システム、運用技術全般</td>
                                    <td>
                                        可用性が最優先され、停止や誤動作が物理的な事故に直結するため
                                    </td>
                                </tr>
                                <tr>
                                    <td>Guest(ゲスト)</td>
                                    <td>来訪者用のネットワーク</td>
                                    <td>社内システムへの直接アクセスを防ぐため</td>
                                </tr>
                                <tr>
                                    <td>BYOD(Bring Your Own Device)</td>
                                    <td>従業員の私物端末</td>
                                    <td>会社が管理しきれない端末からのリスクを限定するため</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="attacks" tabIndex={-1}>
                        <div className="section-icon-title">
                            <i className="ti ti-alert-triangle"></i>
                            <h2>STEP 2: 4.2 攻撃の種類とネットワークへの影響</h2>
                        </div>
                        <p>まずは全体の分類を俯瞰します。</p>

                        <Diagram
                            id="diag-attack-types"
                            label="図4: ネットワークへの攻撃の分類"
                        />
                        <div className="diagram-caption">図4: ネットワークへの攻撃の分類</div>

                        <h3>2-1 攻撃の一覧表</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">攻撃</th>
                                    <th scope="col">何をするか</th>
                                    <th scope="col">主な影響</th>
                                    <th scope="col">代表的な対策</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DoS / DDoS</td>
                                    <td>大量のトラフィックやリクエストでシステムを過負荷にする</td>
                                    <td>可用性の喪失(サービス停止)</td>
                                    <td>レート制限、DDoS対策サービス、冗長構成</td>
                                </tr>
                                <tr>
                                    <td>VLANホッピング</td>
                                    <td>タグ付けの不備を突いて、本来アクセスできないVLANへ侵入する</td>
                                    <td>セグメンテーションの突破</td>
                                    <td>ネイティブVLANの変更、不要なトランクポートの無効化</td>
                                </tr>
                                <tr>
                                    <td>MACフラッディング</td>
                                    <td>大量の偽MACアドレスでスイッチのMACテーブルを溢れさせる</td>
                                    <td>スイッチがハブ化しトラフィックが盗聴される</td>
                                    <td>ポートセキュリティ、MACアドレス数の制限</td>
                                </tr>
                                <tr>
                                    <td>ARP poisoning / spoofing</td>
                                    <td>偽のARP応答でMACアドレスの対応関係を書き換える</td>
                                    <td>通信の盗聴・改ざん(on-path攻撃の前段階)</td>
                                    <td>Dynamic ARP Inspection、静的ARPエントリ</td>
                                </tr>
                                <tr>
                                    <td>DNS poisoning / spoofing</td>
                                    <td>DNSキャッシュや応答を偽装し、不正なIPアドレスへ誘導する</td>
                                    <td>フィッシングサイトへの誘導、通信の傍受</td>
                                    <td>DNSSEC、信頼できるリゾルバの利用</td>
                                </tr>
                                <tr>
                                    <td>Rogue devices / services</td>
                                    <td>許可されていないDHCPサーバーやAPをネットワークに接続する</td>
                                    <td>誤ったIP配布や通信の乗っ取り</td>
                                    <td>DHCP snooping、NACによる端末認証</td>
                                </tr>
                                <tr>
                                    <td>Evil twin</td>
                                    <td>正規のAPになりすました偽のアクセスポイントを設置する</td>
                                    <td>通信内容の盗聴、認証情報の窃取</td>
                                    <td>エンタープライズ認証(802.1X)、Wi-Fi異常検知</td>
                                </tr>
                                <tr>
                                    <td>On-path attack</td>
                                    <td>
                                        通信経路上に割り込み、当事者に気づかれず通信を中継・傍受する
                                    </td>
                                    <td>通信内容の盗聴・改ざん</td>
                                    <td>暗号化通信(TLS)、証明書検証、ARP監視</td>
                                </tr>
                                <tr>
                                    <td>Social engineering</td>
                                    <td>技術ではなく人間の心理や行動の隙を突く</td>
                                    <td>認証情報の詐取、不正な物理侵入</td>
                                    <td>セキュリティ教育、入退室管理の徹底</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>2-2 ARP poisoningからon-path attackへの流れ</h3>
                        <p>
                            ARP poisoningは、on-path
                            attack(いわゆる中間者攻撃)を成立させるための代表的な手口です。攻撃の流れを時系列で見てみましょう。
                        </p>

                        <Diagram
                            id="diag-arp-poisoning"
                            label="図5: ARP poisoning による on-path attack の成立過程"
                        />
                        <div className="diagram-caption">
                            図5: ARP poisoning による on-path attack の成立過程
                        </div>

                        <div className="callout warning">
                            <i className="ti ti-alert-circle"></i>
                            <p>
                                ARP応答には本来「認証」の仕組みがないため、同一セグメント内であれば比較的容易に偽装できてしまう点が弱点です。これが、STEP
                                3で扱う「セグメンテーション」や「監視」が重要になる理由の一つです。
                            </p>
                        </div>

                        <h3>2-3 ソーシャルエンジニアリングの手口</h3>
                        <p>技術的な脆弱性ではなく、人の心理的な隙を突く攻撃も試験範囲に含まれます。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">手口</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Phishing(フィッシング)</td>
                                    <td>
                                        正規の相手を装ったメールやメッセージで、認証情報や機密情報をだまし取る
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dumpster diving(ダンプスターダイビング)</td>
                                    <td>廃棄されたゴミの中から、書類やメモなど機密情報を探し出す</td>
                                </tr>
                                <tr>
                                    <td>Shoulder surfing(ショルダーサーフィン)</td>
                                    <td>背後や近くから画面や入力内容を盗み見る</td>
                                </tr>
                                <tr>
                                    <td>Tailgating(テールゲーティング)</td>
                                    <td>
                                        認証された人の後ろにこっそりついて、施錠区画へ不正に入室する
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>2-4 Malware(マルウェア)</h3>
                        <p>
                            ウイルス、ワーム、ランサムウェアなど、悪意のあるソフトウェア全般を指す総称です。Network+ではネットワーク経由での拡散や、感染した端末がネットワーク全体に与える影響という観点で押さえておけば十分です。
                        </p>
                    </section>

                    <section id="defenses" tabIndex={-1}>
                        <div className="section-icon-title">
                            <i className="ti ti-shield-check"></i>
                            <h2>STEP 3: 4.3 セキュリティ機能・防御技術・ソリューションの適用</h2>
                        </div>
                        <p>
                            STEP
                            1・2で「何を」「どう」守るかを学んだので、最後に具体的な防御の実装方法を見ていきます。
                        </p>

                        <h3>3-1 デバイスハードニング(Device Hardening)</h3>
                        <p>機器そのものの攻撃対象領域(アタックサーフェス)を減らす基本的な対策です。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">対策</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>不要なポート・サービスの無効化</td>
                                    <td>
                                        使っていないポートやサービスを無効化し、攻撃可能な入口を減らす
                                    </td>
                                </tr>
                                <tr>
                                    <td>デフォルトパスワードの変更</td>
                                    <td>
                                        初期設定のパスワードを必ず変更し、既知の認証情報での侵入を防ぐ
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>3-2 NAC(Network Access Control)</h3>
                        <p>ネットワークに接続しようとする端末を、接続前に検査・認証する仕組みです。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">手法</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Port security(ポートセキュリティ)</td>
                                    <td>
                                        スイッチのポートごとに接続を許可するMACアドレス数や種類を制限する
                                    </td>
                                </tr>
                                <tr>
                                    <td>802.1X</td>
                                    <td>
                                        ポートベースの認証規格。RADIUSサーバーと連携し、認証が通るまでポートを閉じておく
                                    </td>
                                </tr>
                                <tr>
                                    <td>MAC filtering(MACフィルタリング)</td>
                                    <td>許可リストに登録されたMACアドレスの端末のみ接続を許可する</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>802.1Xによる認証の流れは次の通りです。</p>
                        <Diagram
                            id="diag-dot1x-flow"
                            label="図6: 802.1Xによるポートベース認証の流れ"
                        />
                        <div className="diagram-caption">図6: 802.1Xによるポートベース認証の流れ</div>

                        <h3>3-3 鍵管理(Key Management)</h3>
                        <p>
                            暗号化に使う鍵を、生成・配布・保管・失効までライフサイクル全体で適切に管理することです。鍵が漏えいすれば、暗号化そのものの意味がなくなるため、PKIやVPNの運用において重要な位置づけを持ちます。
                        </p>

                        <h3>3-4 セキュリティルール</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">機能</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ACL(Access Control List)</td>
                                    <td>
                                        IPアドレスやポート番号などの条件で、通過させる通信・拒否する通信を定義するルール
                                    </td>
                                </tr>
                                <tr>
                                    <td>URL filtering(URLフィルタリング)</td>
                                    <td>特定のWebサイトへのアクセスをURL単位で制限する</td>
                                </tr>
                                <tr>
                                    <td>Content filtering(コンテンツフィルタリング)</td>
                                    <td>
                                        通信内容の種類(ファイル形式など)に基づいてアクセスを制限する
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>3-5 ゾーン設計:trusted / untrusted / screened subnet</h3>
                        <p>ネットワークを「信頼度」で区切り、境界に防御を集中させる考え方です。</p>

                        <Diagram
                            id="diag-zone-design"
                            label="図7: trusted / screened subnet / untrusted のゾーン設計"
                        />
                        <div className="diagram-caption">
                            図7: trusted / screened subnet / untrusted のゾーン設計
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ゾーン</th>
                                    <th scope="col">信頼度</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Untrusted zone(信頼できないゾーン)</td>
                                    <td>最も低い</td>
                                    <td>インターネットなど、管理外のネットワーク</td>
                                </tr>
                                <tr>
                                    <td>Screened subnet(スクリーンドサブネット)</td>
                                    <td>中間</td>
                                    <td>
                                        外部公開が必要なWeb・DNS・メールサーバーなどを配置する緩衝地帯。以前はDMZ(demilitarized
                                        zone)と呼ばれていた
                                    </td>
                                </tr>
                                <tr>
                                    <td>Trusted zone(信頼できるゾーン)</td>
                                    <td>高い</td>
                                    <td>
                                        社内LANや内部データベースなど、外部から直接アクセスさせない領域
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            この設計により、仮に外部公開サーバーが一台侵害されても、内部FWがもう一段の壁となり、社内LANまで一気に到達されることを防ぎます。
                        </p>
                    </section>

                    <section id="checklist" tabIndex={-1}>
                        <div className="section-icon-title">
                            <i className="ti ti-list-check"></i>
                            <h2>ドメイン4.0 チェックリスト</h2>
                        </div>
                        <p>
                            学習の最後に、公式の出題範囲(Exam
                            Objectives)に沿って理解度を確認しましょう。
                        </p>
                        <table className="checklist-table">
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">確認</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CHECKLIST_ROWS.map((text, idx) => (
                                    <tr key={text}>
                                        <td id={`checklist-label-${idx}`}>{text}</td>
                                        <td>
                                            {/* ネイティブの checkbox を操作主体にし、☐/☑ は装飾として表示する */}
                                            <label className="checklist-check">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={checkedItems[idx] ?? false}
                                                    onChange={() => toggleCheck(idx)}
                                                    aria-labelledby={`checklist-label-${idx}`}
                                                />
                                                <span aria-hidden="true">
                                                    {checkedItems[idx] ? '☑' : '☐'}
                                                </span>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>
                            すべてにチェックが付けば、ドメイン4.0の基礎は固まっています。次はドメイン5.0(Network
                            Troubleshooting)に進み、実際の障害シナリオの中でこれらのセキュリティ知識がどう関わってくるかを学ぶと、知識がより実践的に定着します。
                        </p>
                    </section>

                    <section id="references" tabIndex={-1}>
                        <div className="section-icon-title">
                            <i className="ti ti-external-link"></i>
                            <h2>参考文献・出典(References)</h2>
                        </div>
                        <p>
                            本記事は以下の一次情報・専門情報源を根拠に作成しています。内容の正確性を確認したい場合や、より詳しく学びたい場合はあわせてご参照ください。
                        </p>

                        <h3>公式情報源(Primary sources)</h3>
                        <ul className="ref-list">
                            <li className="ref-item">
                                <div className="ref-label">Official</div>
                                <div className="ref-title">
                                    CompTIA Network+ 公式認定ページ(試験概要・出題比率のサマリー)
                                </div>
                                <div className="ref-url">
                                    <a
                                        href="https://www.comptia.org/en-us/certifications/network/"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://www.comptia.org/en-us/certifications/network/
                                    </a>
                                </div>
                            </li>
                            <li className="ref-item">
                                <div className="ref-label">Official</div>
                                <div className="ref-title">
                                    CompTIA Network+ N10-009 Certification Exam: Exam Objectives(Version
                                    4.0、ドメイン4.0の詳細な出題範囲の一次情報)
                                </div>
                                <div className="ref-url">
                                    <a
                                        href="https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <h3>補足・専門用語の確認に使った情報源(Supplementary sources)</h3>
                        <ul className="ref-list">
                            <li className="ref-item supplementary">
                                <div className="ref-label">Supplementary</div>
                                <div className="ref-title">
                                    NIST CSRC Glossary「confidentiality, integrity, availability」(CIA
                                    Triadの定義確認)
                                </div>
                                <div className="ref-url">
                                    <a
                                        href="https://csrc.nist.gov/glossary/term/confidentiality_integrity_availability"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://csrc.nist.gov/glossary/term/confidentiality_integrity_availability
                                    </a>
                                </div>
                            </li>
                            <li className="ref-item supplementary">
                                <div className="ref-label">Supplementary</div>
                                <div className="ref-title">
                                    Wikipedia「ARP
                                    spoofing」(ARPポイズニング/スプーフィングの仕組みの確認)
                                </div>
                                <div className="ref-url">
                                    <a
                                        href="https://en.wikipedia.org/wiki/ARP_spoofing"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://en.wikipedia.org/wiki/ARP_spoofing
                                    </a>
                                </div>
                            </li>
                            <li className="ref-item supplementary">
                                <div className="ref-label">Supplementary</div>
                                <div className="ref-title">
                                    Wikipedia「Screened subnet」(スクリーンドサブネット/DMZの構造の確認)
                                </div>
                                <div className="ref-url">
                                    <a
                                        href="https://en.wikipedia.org/wiki/Screened_subnet"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        https://en.wikipedia.org/wiki/Screened_subnet
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <div className="footer-note">
                            注記:
                            CompTIAの出題範囲は改訂される可能性があります。実際の受験前には、必ず上記の公式ページで最新の試験コード・出題比率・出題範囲をご確認ください。
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
