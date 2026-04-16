import React from 'react';
import styles from './Section10.module.css';

import { SectionCard, DiagramSVG, TableComponent } from '../index';

import { PRIVACY_TECHNIQUES } from '../../constants';

/**
 * セクション10: データガバナンスとプライバシー
 * Dataplex や Sensitive Data Protection など、データの保護と管理について解説します。
 * @returns JSX.Element
 */
export const Section10: React.FC = () => {
    return (
        <div id="s10" className={styles.sgap}>
            <div className={styles.secHead}>
                <div className={`${styles.secNum} ${styles.sn10}`}>10</div>
                <div className={styles.secHeadTxt}>
                    <h2 className={styles.secTitle}>Google Cloud のデータガバナンスとセキュリティ</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-10" idNumber="10" title="Google Cloud のデータガバナンスとセキュリティ">
                <h3 className={styles.stitle}>10.1 データガバナンスとは</h3>
                <p className={styles.tdesc}><strong>データガバナンス</strong>とは、組織のデータを
                正確・安全・効率的に管理するための仕組み・プロセス・ポリシーです。</p>

                <DiagramSVG viewBox="0 0 700 240">
                    <rect x="10" y="10" width="680" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="var(--color-destructive, red)" fontWeight="bold">なぜデータガバナンスが必要か:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">問題 1: データの品質が悪い → 分析結果への信頼が失われる</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">問題 2: データの所在がわからない → 「顧客データはどこにある？」</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">問題 3: 個人情報が漏洩する → GDPR 等違反で多額の制裁金</text>
                    <text x="40" y="125" fill="currentColor" fontSize="14">問題 4: 不正アクセス → 権限のない人が機密データを参照・変更</text>
                    
                    <text x="30" y="165" fill="var(--color-secondary, green)" fontWeight="bold">データガバナンスで解決できること:</text>
                    <text x="40" y="185" fill="currentColor" fontSize="14">✅ データカタログで「どこに何があるか」を一覧化</text>
                    <text x="40" y="205" fill="currentColor" fontSize="14">✅ データ系譜で「どこからきたか」を追跡</text>
                    <text x="40" y="225" fill="currentColor" fontSize="14">✅ アクセス制御で「誰がアクセスできるか」を管理 ✅ データ品質ルールで自動チェック</text>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>10.2 Dataplex（データ管理・ガバナンス基盤）</h3>
                <pre className="code-block"><code className="language-text">{`Dataplex とは:
  - Google Cloud の統合データ管理・ガバナンスプラットフォーム
  - BigQuery・Cloud Storage・Cloud SQL など複数サービスを横断して管理
  - データレイクのデータを自動的に分類・タグ付け・品質チェック

主な機能:
  1. データレイク管理（論理的に統合管理）
  2. データ品質（Data Quality）の自動チェック
  3. データ系譜（Data Lineage）の追跡
  4. セキュリティポリシーの一元管理`}</code></pre>

                <h3 className={`${styles.stitle} mt-6`}>10.3 Dataplex Universal Catalog（BigQuery Universal Catalog）</h3>
                <DiagramSVG viewBox="0 0 700 220">
                    <rect x="10" y="10" width="680" height="200" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Dataplex Universal Catalog / BigQuery Universal Catalog とは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- 組織内の全データアセットを検索・発見・管理するためのユニバーサルカタログ</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- Dataplex による自動メタデータ検出でデータアセットを自動登録</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">- BigQuery 上でユニバーサルデータセット探索が可能</text>
                    
                    <text x="30" y="135" fill="currentColor" fontWeight="bold">使用例:</text>
                    <text x="40" y="155" fill="currentColor" fontSize="14">「顧客の購買履歴データが欲しい」</text>
                    <text x="50" y="175" fill="currentColor" fontSize="14">→ Universal Catalog で "購買" を検索 → BigQuery のテーブル発見</text>
                    <text x="50" y="195" fill="currentColor" fontSize="14">→ IAM ポリシーを通じて適切なアクセス権を申請</text>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>10.4 Sensitive Data Protection（機密データ保護）</h3>
                <DiagramSVG viewBox="0 0 700 200" ariaLabel="Sensitive Data Protection protection methods: Inspection, Pseudonymization, De-identification, Masking, Tokenization">
                    <rect x="10" y="10" width="680" height="180" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">Sensitive Data Protection（旧 Cloud DLP）とは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- テキスト・画像・構造化データ内の機密情報を自動検出・保護するサービス</text>
                    
                    <text x="30" y="95" fill="currentColor" fontWeight="bold">保護の手法:</text>
                    <text x="40" y="115" fill="currentColor" fontSize="14">1. 検出（Inspection）: どこに個人情報があるか発見する</text>
                    <text x="40" y="135" fill="currentColor" fontSize="14">2. 仮名化（Pseudonymization） / 3. 匿名化（De-identification）</text>
                    <text x="40" y="155" fill="currentColor" fontSize="14">4. マスキング（Masking）: 「田中 太郎」→ 「*** ***」</text>
                    <text x="40" y="175" fill="currentColor" fontSize="14">5. トークン化（Tokenization）: 「090-1234-5678」→ 「TOKEN-XYZ」</text>
                </DiagramSVG>

                <h3 className={`${styles.stitle} mt-6`}>10.5 データのプライバシー保護技術（試験頻出）</h3>
                <p className={styles.tdesc}>試験でよく問われる 3 つのプライバシー保護手法の違いを理解することが重要です。</p>

                <DiagramSVG viewBox="0 0 700 240">
                    <rect x="10" y="10" width="680" height="220" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">元データ:</text>
                    <text x="100" y="40" fill="currentColor" fontSize="14">「田中太郎、090-1234-5678、tanaka@example.com」</text>
                    
                    <text x="30" y="80" fill="currentColor" fontWeight="bold">① 匿名化（Anonymization）</text>
                    <text x="40" y="100" fill="currentColor" fontSize="14">「30代男性、東京都内、メール利用者」 → 再識別は不可能。GDPR 対象外。</text>
                    
                    <text x="30" y="140" fill="currentColor" fontWeight="bold">② 仮名化（Pseudonymization）</text>
                    <text x="40" y="160" fill="currentColor" fontSize="14">「UID-a7f3k、080-XXXX-XXXX」 → 変換テーブルがあれば再識別可能。GDPR 対象。</text>

                    <text x="30" y="200" fill="currentColor" fontWeight="bold">③ 差分プライバシー（Differential Privacy）</text>
                    <text x="40" y="220" fill="currentColor" fontSize="14">統計的なノイズを加えて個人の情報を保護。集団全体の傾向は分析できる。</text>
                </DiagramSVG>

                <TableComponent
                    headers={['手法', '再識別の可能性', 'GDPR 対象', '主な用途']}
                    rows={PRIVACY_TECHNIQUES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.technique}</strong></td>
                            <td>{row.reidentification}</td>
                            <td>{row.gdpr}</td>
                            <td>{row.useCase}</td>
                        </tr>
                    )}
                />

                <h3 className={`${styles.stitle} mt-6`}>10.6 データのアクセス制御</h3>
                <pre className="code-block"><code className="language-text">{`BigQuery のアクセス制御レベル:

組織レベル: Organization Admin → 全データセットへのアクセス権を管理
プロジェクトレベル: bigquery.admin → プロジェクト内の全データを管理
データセットレベル: 特定のデータセットに対してアクセス権を付与

テーブルレベル（行・列レベルセキュリティ）:
  行レベルセキュリティ:
    → 田中（東京支社）は東京の売上データのみ見える
  列レベルセキュリティ（ポリシータグ）:
    → 一般社員は顧客名まで見えるが、管理職はクレジットカード番号も見える`}</code></pre>

                <blockquote className="sec-quote">
                    <p className={styles.tdesc}>📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/dataplex">https://cloud.google.com/dataplex/docs</a><br/>
                    <a href="https://cloud.google.com/dlp/docs">https://cloud.google.com/dlp/docs</a><br/>
                    <a href="https://cloud.google.com/bigquery/docs/column-level-security-intro">https://cloud.google.com/bigquery/docs/column-level-security-intro</a></p>
                </blockquote>
                <hr className={styles.secHr} />
            </SectionCard>
            
            <SectionCard id="gcdl-2-10" idNumber="Deep Dive" title="データガバナンスとセキュリティの基盤">
                <h3 className={`${styles.stitle} mt-6`}>データガバナンスとセキュリティの基盤</h3>
                <p className={styles.tdesc}>どれほど高度な分析基盤を構築しても、データガバナンスが欠如していれば、データレイクは目的のデータが見つからず、品質も保証されない「データスワンプ（データの沼）」へと陥ってしまう。成功するデータジャーニーにおいて、ガバナンスは不可欠な要素である。Google Cloudにおいて、このデータガバナンスを統合的に管理するソリューションが「Dataplex」である。</p>
                <p className={styles.tdesc}>Dataplexの中核機能である「Universal Catalog（統合カタログ）」は、Cloud Storage、BigQuery、さらにはVertex AIの機械学習モデルに至るまで、組織全体に分散するデータおよびAIアセットを自動的に検出し、メタデータを一元的に管理する。これにより、データアナリストやデータサイエンティストは必要なデータを迅速に発見（Discoverability）できるようになる。さらに、「ビジネスグロッサリー（Business Glossary）」機能を用いることで、「GMV（流通取引総額）」といったビジネス用語の定義を標準化し、技術的な実装と切り離して管理できる。これにより、部署間でのデータ解釈の齟齬を防ぐことができる。また、データがどこから生成され、どのように変換されてきたかを追跡する「データリネージ（Data Lineage）」機能は、GDPRやHIPAAといった法規制へのコンプライアンス遵守と、監査の透明性を確保するために極めて重要である。</p>
                <p className={styles.tdesc}>データガバナンスは強固なセキュリティと表裏一体である。Google Cloudでは、保存データ（At-rest）および転送中のデータ（In-transit）はデフォルトで強力に暗号化されているが、コンプライアンス要件が極めて厳しい企業向けには、顧客管理の暗号鍵（CMEK）を使用して独自の鍵管理を行うオプションも提供されている。セキュリティのベストプラクティスとしては、「最小特権の原則（PoLP）」に基づく厳格なIdentity and Access Management（IAM）の適用が挙げられる。ユーザーやサービスアカウントには、業務遂行に必要な最小限の権限のみを付与し、定期的にIAMポリシーの監査を行うべきである。</p>
                <p className={styles.tdesc}>さらに、高度なネットワークセキュリティ対策として「VPC Service Controls」の導入が強く推奨される。Cloud StorageやBigQueryのようなマルチテナントサービスは、デフォルトではパブリックなエンドポイントを持つが、VPC Service Controlsを使用することで、これらのリソースの周囲に仮想的なセキュリティ境界（Perimeter）を構築できる。境界内部のクライアントは許可されたリソースにのみアクセスでき、境界外部の承認されていないリソースへのデータのコピーはネットワークレベルで完全に遮断される。これにより、悪意のある内部関係者や、認証情報（OAuthトークンなど）が漏洩した場合のデータ流出（Exfiltration）リスクを劇的に低減することが可能となる。</p>
            </SectionCard>
        </div>
    );
};
