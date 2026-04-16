import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { STORAGE_CLASSES, DATA_MANAGEMENT_SOLUTIONS } from '../../constants';

export const Section5: React.FC = () => {
    return (
        <div id="s5" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn5">05</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">Google Cloud のデータストレージサービス</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-5" idNumber="5" title="Google Cloud のデータストレージサービス">
                <h3 className="stitle">5.1 Cloud Storage（オブジェクトストレージ）</h3>
                <h4 className="stitle mt-4">Cloud Storage とは</h4>
                <p className="tdesc"><strong>Cloud Storage</strong> は、あらゆる種類のファイル（オブジェクト）を
                インターネット経由で保存・取得できるストレージサービスです。</p>

                <pre className="code-block"><code className="language-text">{`Cloud Storage の特徴:

  - ファイルサイズ制限なし（最大 5TB/オブジェクト）
  - グローバルにアクセス可能
  - 99.999999999%（イレブン・ナイン）の耐久性
  - 構造化・非構造化どちらのデータも保存可能
  - バケット（Bucket）という単位でデータを管理

主な用途:

  - 画像・動画・音声ファイルの保存・配信
  - 機械学習の学習データセットの格納
  - バックアップ・アーカイブ
  - ウェブサイトの静的コンテンツ配信
  - データレイクの基盤`}</code></pre>

                <h4 className="stitle mt-4">Cloud Storage の 4 つのストレージクラス</h4>
                <p className="tdesc">ストレージクラスは「アクセス頻度」と「コスト」のバランスで選択します。</p>

                <DiagramSVG viewBox="0 0 700 220">
                    <text x="350" y="30" textAnchor="middle" fill="currentColor" fontSize="14">アクセス頻度</text>
                    <path d="M 350 40 L 350 60" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="360" y="55" fill="currentColor" fontSize="12">低くなる</text>

                    <rect x="200" y="70" width="100" height="40" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="250" y="95" textAnchor="middle" fill="currentColor">Standard</text>

                    <rect x="310" y="70" width="100" height="40" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="360" y="95" textAnchor="middle" fill="currentColor">Nearline</text>

                    <rect x="420" y="70" width="100" height="40" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="470" y="95" textAnchor="middle" fill="currentColor">Coldline</text>

                    <rect x="530" y="70" width="100" height="40" rx="4" stroke="currentColor" fill="transparent" />
                    <text x="580" y="95" textAnchor="middle" fill="currentColor">Archive</text>

                    <text x="180" y="140" textAnchor="end" fill="currentColor" fontSize="13">保存コスト</text>
                    <text x="250" y="140" textAnchor="middle" fill="currentColor" fontSize="13">高い</text>
                    <path d="M 280 135 L 300 135" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="360" y="140" textAnchor="middle" fill="currentColor" fontSize="13">低い</text>
                    <path d="M 390 135 L 410 135" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="470" y="140" textAnchor="middle" fill="currentColor" fontSize="13">さらに低い</text>
                    <path d="M 510 135 L 520 135" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="580" y="140" textAnchor="middle" fill="currentColor" fontSize="13">最安</text>

                    <text x="180" y="165" textAnchor="end" fill="currentColor" fontSize="13">取得コスト</text>
                    <text x="250" y="165" textAnchor="middle" fill="currentColor" fontSize="13">無料</text>
                    <path d="M 280 160 L 300 160" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="360" y="165" textAnchor="middle" fill="currentColor" fontSize="13">課金</text>
                    <path d="M 390 160 L 410 160" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="470" y="165" textAnchor="middle" fill="currentColor" fontSize="13">課金大きめ</text>
                    <path d="M 510 160 L 520 160" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="580" y="165" textAnchor="middle" fill="currentColor" fontSize="13">最高</text>

                    <text x="180" y="190" textAnchor="end" fill="currentColor" fontSize="13">最小保存期間</text>
                    <text x="250" y="190" textAnchor="middle" fill="currentColor" fontSize="13">なし</text>
                    <path d="M 280 185 L 300 185" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="360" y="190" textAnchor="middle" fill="currentColor" fontSize="13">30日</text>
                    <path d="M 390 185 L 410 185" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="470" y="190" textAnchor="middle" fill="currentColor" fontSize="13">90日</text>
                    <path d="M 510 185 L 520 185" stroke="currentColor" markerEnd="url(#arrow)" />
                    <text x="580" y="190" textAnchor="middle" fill="currentColor" fontSize="13">365日</text>

                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                    </defs>
                </DiagramSVG>

                <TableComponent
                    headers={['クラス', '月次保存コスト', '取得コスト', '最小保存期間', '適したユースケース']}
                    rows={STORAGE_CLASSES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.className}</strong></td>
                            <td>{row.storageCost}</td>
                            <td>{row.retrievalCost}</td>
                            <td>{row.minDuration}</td>
                            <td>{row.useCase}</td>
                        </tr>
                    )}
                />
                <p className="tdesc">※ 価格はリージョンにより異なります — 表は us-central1 の参考値です。最新情報は<a href="https://cloud.google.com/storage/pricing">公式の料金ページ</a>をご確認ください。</p>

                <h4 className="stitle mt-4">Cloud Storage のライフサイクル管理</h4>
                <DiagramSVG viewBox="0 0 600 200">
                    <rect x="10" y="10" width="580" height="180" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">ライフサイクルポリシーの例（コスト自動最適化）:</text>
                    <text x="40" y="70" fill="currentColor" fontSize="14">- ルール 1: 作成から 30 日後に Standard → Nearline へ移行</text>
                    <text x="40" y="100" fill="currentColor" fontSize="14">- ルール 2: 作成から 90 日後に Nearline → Coldline へ移行</text>
                    <text x="40" y="130" fill="currentColor" fontSize="14">- ルール 3: 作成から 365 日後に Coldline → Archive へ移行</text>
                    <text x="40" y="160" fill="currentColor" fontSize="14">- ルール 4: 作成から 7 年後に自動削除（法的保管期限後）</text>
                </DiagramSVG>

                <h4 className="stitle mt-4">✅ ベストプラクティス: Cloud Storage</h4>
                <pre className="code-block"><code className="language-yaml">{`バケット設計:
  - リージョン選択: データのユーザーに近いリージョンを選ぶ
  - バージョニング: 重要なデータは誤削除・上書き防止のため有効化
  - ライフサイクル: 全バケットにライフサイクルポリシーを設定する

セキュリティ:
  - 均一バケットレベルアクセス（Uniform Bucket Access）を使用する
  - 公開バケットは最小限に（必要な場合のみ）
  - Cloud Audit Logs でアクセスを記録する
  - CMEK（顧客管理暗号化キー）で機密データを保護

コスト最適化:
  - ライフサイクルポリシーでデータを自動的に低コストクラスへ移行
  - リージョン間のデータ転送コストを意識してアーキテクチャを設計
  - Recommender の提案を定期的に確認する`}</code></pre>

                <blockquote className="sec-quote">
                    <p className="tdesc">📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/storage/docs/storage-classes">https://cloud.google.com/storage/docs/storage-classes</a><br/>
                    <a href="https://cloud.google.com/storage/docs/lifecycle">https://cloud.google.com/storage/docs/lifecycle</a><br/>
                    <a href="https://cloud.google.com/storage/docs/best-practices">https://cloud.google.com/storage/docs/best-practices</a></p>
                </blockquote>
                <hr className="sec-hr" />
            </SectionCard>
            
            <SectionCard id="gcdl-2-5" idNumber="Deep Dive" title="オブジェクトストレージの最適化：Cloud Storage">
                <p className="tdesc"><strong>2.2 Google Cloud データマネジメントソリューション</strong></p>
                <p className="tdesc">CDL試験では、ビジネスのユースケースに応じて最適なデータ管理製品を選択する能力が求められる。これには、データベース、データウェアハウス、データレイクといった基本概念の明確な区別が含まれる。</p>
                <p className="tdesc">以下の表は、データ管理の主要な3つの概念の違いを明確に示したものである。</p>

                <TableComponent
                    headers={['アーキテクチャ', '定義と主な目的', 'データ形式とスキーマ要件', 'Google Cloudの該当サービス']}
                    rows={DATA_MANAGEMENT_SOLUTIONS}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.architecture}</strong></td>
                            <td>{row.definition}</td>
                            <td>{row.dataSchema}</td>
                            <td>{row.gcpServices}</td>
                        </tr>
                    )}
                />

                <p className="tdesc">最近のトレンドとして、データレイクの柔軟性とデータウェアハウスの管理機能（ACIDトランザクションや高度なSQLサポート）を融合させた「データレイクハウス（Data Lakehouse）」という概念も普及しており、Google CloudではBigQueryの拡張機能（BigLake等）がこの領域をカバーしている。</p>
                
                <h3 className="stitle mt-6">オブジェクトストレージの最適化：Cloud Storage</h3>
                <p className="tdesc">Cloud Storageは、あらゆる量の非構造化データを保存し、必要な頻度で取得できるフルマネージドのオブジェクトストレージサービスである。クラウドのコスト最適化において、Cloud Storageの適切な「ストレージクラス」の選択は極めて重要である。Google Cloudは、データのアクセス頻度と保存期間の要件に応じて、4つの主要なストレージクラスを提供している。</p>
                <p className="tdesc">第一の「Standard Storage」は、頻繁にアクセスされるホットデータ、アクティブなアプリケーションのバックエンド、ウェブサイトのコンテンツ配信などに最適である。ストレージ単価は他のクラスより高いものの、データの取得コストが無料であり、最低保存期間の要件もない。第二の「Nearline Storage」は、平均して月に1回以下の頻度でアクセスされるデータのバックアップや、長期保存されるマルチメディアコンテンツに適している。最低保存期間は30日である。第三の「Coldline Storage」は、四半期に1回以下の頻度でアクセスされるデータ向けであり、最低保存期間は90日に設定されている。第四の「Archive Storage」は、法令遵守のための監査ログ保存や災害復旧（DR）用途など、1年に1回未満しかアクセスされないデータの長期保管に最適である。ストレージ単価は最も安価であるが、データ取得時の課金が最も高く、最低保存期間は365日に設定されている。</p>
                <p className="tdesc">Cloud Storageを運用する際のベストプラクティスとして、ライフサイクルルールの積極的な活用が挙げられる。データの価値やアクセスパターンは時間とともに変化する。ある時点では頻繁にアクセスされていたStandardクラスのデータも、半年後には全くアクセスされなくなることがある。バケットごとに適切なライフサイクルポリシーを設定し、一定期間経過後に自動的にNearlineやArchiveへと移行させることで、ユーザーは意識することなく大幅なコスト削減を実現できる。</p>
                <p className="tdesc">また、Googleアカウントを持たない外部のユーザーに対して、安全かつ一時的にオブジェクトへのアクセス（読み取りやアップロード）を許可したい場合は、「署名付きURL（Signed URLs）」を使用することがベストプラクティスである。これにより、IAMアカウントを個別に作成することなく、有効期限付きのセキュアなアクセス経路を提供できる。</p>
            </SectionCard>
        </div>
    );
};