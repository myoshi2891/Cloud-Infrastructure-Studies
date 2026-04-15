import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section10: React.FC = () => {
    return (
        <div id="s10" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn10">10</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">Google Cloud のデータガバナンスとセキュリティ</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-10" idNumber="10" title="Google Cloud のデータガバナンスとセキュリティ">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">10.1 データガバナンスとは</h3>
<p class="tdesc"><strong>データガバナンス</strong>とは、組織のデータを
正確・安全・効率的に管理するための仕組み・プロセス・ポリシーです。</p>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`なぜデータガバナンスが必要か:

問題 1: データの品質が悪い
  → 意思決定の根拠となるデータが間違っていたら？
  → 分析結果への信頼が失われる

問題 2: データの所在がわからない
  → 「顧客データはどこにある？」「誰が持っている？」
  → 監査時に説明できない

問題 3: 個人情報が漏洩する
  → GDPR・個人情報保護法違反で多額の制裁金

問題 4: 不正アクセス
  → 権限のない人が機密データを参照・変更

データガバナンスで解決できること:
  ✅ データカタログで「どこに何があるか」を一覧化
  ✅ データ系譜（データリネージ）で「どこからきたか」を追跡
  ✅ アクセス制御で「誰がアクセスできるか」を管理
  ✅ データ品質ルールで「正しいデータか」を自動チェック`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">10.2 Dataplex（データ管理・ガバナンス基盤）</h3>
<pre class="code-block"><code className="language-text">Dataplex とは:

  - Google Cloud の統合データ管理・ガバナンスプラットフォーム
  - BigQuery・Cloud Storage・Cloud SQL など複数サービスを横断して管理
  - データレイクのデータを自動的に分類・タグ付け・品質チェック

主な機能:

  1. データレイク管理
     - Cloud Storage と BigQuery を論理的に統合管理
     - データゾーン（生データ・キュレーション済みデータ）の管理

  2. データ品質（Data Quality）
     - データ品質ルールを定義して自動チェック
     - 例: 「顧客IDは必ず存在する」「年齢は 0〜150 の間」

  3. データ系譜（Data Lineage）
     - 「このデータはどのパイプラインを経て作られたか」を追跡
     - コンプライアンス対応・トラブルシューティングに活用

  4. セキュリティポリシーの一元管理
     - 複数サービスへのアクセス制御を一箇所で管理
</code></pre>
<h3 class="stitle">10.3 Dataplex Universal Catalog（BigQuery Universal Catalog）</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Dataplex Universal Catalog / BigQuery Universal Catalog とは:

  - 旧 Data Catalog の後継として統合されたメタデータ管理サービス
  - 組織内の全データアセット（テーブル・ファイル・BI レポート等）を

    検索・発見・管理するためのユニバーサルカタログ

  - Dataplex による自動メタデータ検出でデータアセットを自動登録
  - BigQuery 上でユニバーサルデータセット探索が可能
  - Dataplex / Policy Controller によるグロッサリー・タグ管理
  - IAM およびアクセスポリシーと統合したアクセス制御

使用例:
  「顧客の購買履歴データが欲しい」
    → Dataplex Universal Catalog で "購買" を検索
    → BigQuery の "purchase_history" テーブルが見つかる
    → テーブルの説明・オーナー・使用例を確認
    → IAM ポリシーを通じて適切なアクセス権を申請

機能:

  - Dataplex によるメタデータの自動収集・検出（BigQuery・GCS・Pub/Sub 等）
  - タグテンプレートによるカスタムメタデータの付与
  - ビジネス用語集（Glossary）の管理（Dataplex / BigQuery 統合）
  - IAM と連携したデータアクセスポリシーの一元管理
`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">10.4 Sensitive Data Protection（機密データ保護）</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Sensitive Data Protection（旧 Cloud DLP）とは:

  - テキスト・画像・構造化データ内の機密情報を自動検出・保護するサービス
  - 150 以上の組み込み検出器（氏名・メールアドレス・クレジットカード番号等）
  - BigQuery・Cloud Storage・Datastore に格納されたデータをスキャン

保護の手法:

  1. 検出（Inspection）: どこに個人情報があるか発見する
  2. 仮名化（Pseudonymization）: 識別子を別の識別子に置換
  3. 匿名化（De-identification）: 識別情報を完全に除去
  4. マスキング（Masking）: 「田中 太郎」→ 「*** ***」
  5. トークン化（Tokenization）: 「090-1234-5678」→ 「TOKEN-XYZ」

ユースケース:
  ✅ GDPR・個人情報保護法コンプライアンスの自動対応
  ✅ ML 学習データの個人情報を自動除去
  ✅ ログデータ中のクレジットカード番号を自動マスク
  ✅ 本番データを開発環境で使う際に個人情報を除去`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">10.5 データのプライバシー保護技術（試験頻出）</h3>
<p class="tdesc">試験でよく問われる 3 つのプライバシー保護手法の違いを理解することが重要です。</p>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`┌──────────────────────────────────────────────────────────────────┐
│ 元データ: 「田中太郎、090-1234-5678、tanaka@example.com」        │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│ ① 匿名化（Anonymization）                                        │
│    「30代男性、東京都内、メール利用者」                            │
│    → 個人を特定する情報を完全除去                                  │
│    → 再識別は（理論上）不可能                                     │
│    → GDPR の規制対象外となる                                     │
│                                                                    │
│ ② 仮名化（Pseudonymization）                                     │
│    「UID-a7f3k、080-XXXX-XXXX、user_X@example.com」              │
│    → 識別子を別の識別子（仮名）に置換                              │
│    → 変換テーブルがあれば再識別可能                               │
│    → GDPR は引き続き適用される                                   │
│                                                                    │
│ ③ 差分プライバシー（Differential Privacy）                       │
│    → 統計的なノイズを加えて個人の情報を保護する数学的手法         │
│    → 集団全体の傾向は分析できるが、個人の情報は漏れない           │
│    → Google・Apple が大規模に活用                                │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<div class="ctable-wrap" tabIndex="0"><table class="ctable">
<thead>
<tr>
<th>手法</th>
<th>再識別の可能性</th>
<th>GDPR 対象</th>
<th>主な用途</th>
</tr>
</thead>
<tbody><tr>
<td><strong>匿名化</strong></td>
<td>不可能（理論上）</td>
<td>対象外</td>
<td>データの公開・共有</td>
</tr>
<tr>
<td><strong>仮名化</strong></td>
<td>可能（変換テーブル必要）</td>
<td>対象</td>
<td>開発・テスト環境</td>
</tr>
<tr>
<td><strong>差分プライバシー</strong></td>
<td>困難</td>
<td>状況による</td>
<td>統計分析・ML 学習</td>
</tr>
</tbody></table></div>
<h3 class="stitle">10.6 データのアクセス制御</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`BigQuery のアクセス制御レベル:

組織レベル:
  Organization Admin → 全データセットへのアクセス権を管理

プロジェクトレベル:
  bigquery.admin    → プロジェクト内の全データを管理
  bigquery.dataOwner → データセットを所有・管理
  bigquery.dataViewer → データの読み取り専用

データセットレベル:
  特定のデータセットに対してアクセス権を付与
  例: 財務チームは finance_dataset のみ参照可能

テーブルレベル（行・列レベルセキュリティ）:
  行レベルセキュリティ:
    → 田中（東京支社）は東京の売上データのみ見える
    → 鈴木（大阪支社）は大阪の売上データのみ見える

  列レベルセキュリティ（ポリシータグ）:
    → 一般社員は顧客名・購買額まで見える
    → 管理職は追加でクレジットカード番号も見える`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<blockquote>
<p class="tdesc">📎 <strong>参照</strong>:
<a href="https://cloud.google.com/dataplex/docs">https://cloud.google.com/dataplex/docs</a>
<a href="https://cloud.google.com/dlp/docs">https://cloud.google.com/dlp/docs</a>
<a href="https://cloud.google.com/bigquery/docs/column-level-security-intro">https://cloud.google.com/bigquery/docs/column-level-security-intro</a></p>
</blockquote>
<hr />
` }} />
            
            </SectionCard>
            
            <SectionCard id="gcdl-2-10" idNumber="Deep Dive" title="データガバナンスとセキュリティの基盤">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle"><strong>データガバナンスとセキュリティの基盤</strong></h3>
<p class="tdesc">どれほど高度な分析基盤を構築しても、データガバナンスが欠如していれば、データレイクは目的のデータが見つからず、品質も保証されない「データスワンプ（データの沼）」へと陥ってしまう 。成功するデータジャーニーにおいて、ガバナンスは不可欠な要素である 。Google Cloudにおいて、このデータガバナンスを統合的に管理するソリューションが「Dataplex」である (<a href="https://cloud.google.com/dataplex)%E3%80%82">https://cloud.google.com/dataplex)。</a></p>
<p class="tdesc">Dataplexの中核機能である「Universal Catalog（統合カタログ）」は、Cloud Storage、BigQuery、さらにはVertex AIの機械学習モデルに至るまで、組織全体に分散するデータおよびAIアセットを自動的に検出し、メタデータを一元的に管理する 。これにより、データアナリストやデータサイエンティストは必要なデータを迅速に発見（Discoverability）できるようになる。さらに、「ビジネスグロッサリー（Business Glossary）」機能を用いることで、「GMV（流通取引総額）」といったビジネス用語の定義を標準化し、技術的な実装と切り離して管理できる。これにより、部署間でのデータ解釈の齟齬を防ぐことができる 。また、データがどこから生成され、どのように変換されてきたかを追跡する「データリネージ（Data Lineage）」機能は、GDPRやHIPAAといった法規制へのコンプライアンス遵守と、監査の透明性を確保するために極めて重要である 。</p>
<p class="tdesc">データガバナンスは強固なセキュリティと表裏一体である。Google Cloudでは、保存データ（At-rest）および転送中のデータ（In-transit）はデフォルトで強力に暗号化されているが、コンプライアンス要件が極めて厳しい企業向けには、顧客管理の暗号鍵（CMEK）を使用して独自の鍵管理を行うオプションも提供されている 。セキュリティのベストプラクティスとしては、「最小特権の原則（PoLP）」に基づく厳格なIdentity and Access Management（IAM）の適用が挙げられる。ユーザーやサービスアカウントには、業務遂行に必要な最小限の権限のみを付与し、定期的にIAMポリシーの監査を行うべきである 。</p>
<p class="tdesc">さらに、高度なネットワークセキュリティ対策として「VPC Service Controls」の導入が強く推奨される (<a href="https://cloud.google.com/security/vpc-service-controls)%E3%80%82Cloud">https://cloud.google.com/security/vpc-service-controls)。Cloud</a> StorageやBigQueryのようなマルチテナントサービスは、デフォルトではパブリックなエンドポイントを持つが、VPC Service Controlsを使用することで、これらのリソースの周囲に仮想的なセキュリティ境界（Perimeter）を構築できる。境界内部のクライアントは許可されたリソースにのみアクセスでき、境界外部の承認されていないリソースへのデータのコピー（例えば <code>gcloud storage cp</code> コマンドによる外部バケットへの持ち出し）はネットワークレベルで完全に遮断される。これにより、悪意のある内部関係者や、認証情報（OAuthトークンなど）が漏洩した場合のデータ流出（Exfiltration）リスクを劇的に低減することが可能となる 。</p>
` }} />
            
            </SectionCard>
        
        </div>
    );
};
