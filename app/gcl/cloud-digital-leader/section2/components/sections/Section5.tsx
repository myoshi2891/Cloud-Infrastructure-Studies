import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

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
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">5.1 Cloud Storage（オブジェクトストレージ）</h3>
<h4 class="stitle">Cloud Storage とは</h4>
<p class="tdesc"><strong>Cloud Storage</strong> は、あらゆる種類のファイル（オブジェクト）を
インターネット経由で保存・取得できるストレージサービスです。</p>
<pre class="code-block"><code className="language-text">Cloud Storage の特徴:

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
  - データレイクの基盤
</code></pre>
<h4 class="stitle">Cloud Storage の 4 つのストレージクラス</h4>
<p class="tdesc">ストレージクラスは「アクセス頻度」と「コスト」のバランスで選択します。</p>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`コスト構造の考え方:

  - 保存コスト: 少ないほどよい（使わないデータをStandardに置くのは無駄）
  - 取得コスト: アクセスするたびに課金される
  - 最小保存期間: 設定期間より早く削除しても課金される

                 アクセス頻度
                      ↓ 低くなる
              ┌─────────────────────────────────┐
              │ Standard  Nearline  Coldline  Archive │
 保存コスト   │ 高い  →  低い   →  さらに低い  → 最安 │
 取得コスト   │ 無料  →  課金   →  課金大きめ → 最高 │
 最小保存期間 │ なし  → 30日   →  90日      → 365日 │
              └─────────────────────────────────┘`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">クラス</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">月次保存コスト</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">取得コスト</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">最小保存期間</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">適したユースケース</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Standard</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">高（目安: \$0.020/GB）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">無料</td>
<td class="p-3 align-top leading-relaxed text-[13px]">なし</td>
<td class="p-3 align-top leading-relaxed text-[13px]">頻繁にアクセスするデータ・Web コンテンツ・ML 学習データ</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Nearline</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">中（目安: \$0.010/GB）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">あり（小）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">30日</td>
<td class="p-3 align-top leading-relaxed text-[13px]">月1回程度のアクセス・バックアップ・月次レポート</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Coldline</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">低（目安: \$0.004/GB）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">あり（中）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">90日</td>
<td class="p-3 align-top leading-relaxed text-[13px]">四半期に1回程度のアクセス・DR バックアップ</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>Archive</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">最安（目安: \$0.0012/GB）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">あり（大）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">365日</td>
<td class="p-3 align-top leading-relaxed text-[13px]">年1回未満のアクセス・法令遵守のための長期保管</td>
</tr>
</tbody></table></div>
<p class="tdesc">※ 価格はリージョンにより異なります — 表は us-central1 の参考値です。最新情報は<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/storage/pricing">公式の料金ページ</a>をご確認ください。</p>
<h4 class="stitle">Cloud Storage のライフサイクル管理</h4>
` }} />
            

                <div>
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`ライフサイクルポリシーの例（コスト自動最適化）:
  - ルール 1: 作成から 30 日後に Standard → Nearline へ移行
  - ルール 2: 作成から 90 日後に Nearline → Coldline へ移行
  - ルール 3: 作成から 365 日後に Coldline → Archive へ移行
  - ルール 4: 作成から 7 年後に自動削除（法的保管期限後）

効果: 手動管理なしでストレージコストを大幅に最適化`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4 class="stitle">✅ ベストプラクティス: Cloud Storage</h4>
<pre class="code-block"><code className="language-yaml">バケット設計:
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
  - Recommender の提案を定期的に確認する
</code></pre>
<blockquote class="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted)] mb-4">
<p class="tdesc">📎 <strong>参照</strong>:
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/storage/docs/storage-classes">https://cloud.google.com/storage/docs/storage-classes</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/storage/docs/lifecycle">https://cloud.google.com/storage/docs/lifecycle</a>
<a class="text-blue-400 hover:text-blue-300 underline" href="https://cloud.google.com/storage/docs/best-practices">https://cloud.google.com/storage/docs/best-practices</a></p>
</blockquote>
<hr />
` }} />
            
            </SectionCard>
            
            <SectionCard id="gcdl-2-5" idNumber="Deep Dive" title="オブジェクトストレージの最適化：Cloud Storage">
                
                <div dangerouslySetInnerHTML={{ __html: `<p class="tdesc"><strong>2.2 Google Cloud データマネジメントソリューション</strong></p>
<p class="tdesc">CDL試験では、ビジネスのユースケースに応じて最適なデータ管理製品を選択する能力が求められる。これには、データベース、データウェアハウス、データレイクといった基本概念の明確な区別が含まれる 。</p>
<p class="tdesc">以下の表は、データ管理の主要な3つの概念の違いを明確に示したものである 。</p>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20"><strong>アーキテクチャ</strong></th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20"><strong>定義と主な目的</strong></th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20"><strong>データ形式とスキーマ要件</strong></th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20"><strong>Google Cloudの該当サービス</strong></th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>データベース (Database)</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">アプリケーションを稼働させるために必要な現在のデータを保存し、リアルタイムのトランザクション処理（OLTP）を提供する。</td>
<td class="p-3 align-top leading-relaxed text-[13px]">厳密に構造化されたデータ。更新頻度が高く、特定のアプリケーションに最適化されている。</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud SQL, Cloud Spanner, Firestore, Cloud Bigtable</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>データウェアハウス (Data Warehouse)</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">複数のシステムから抽出・変換・ロード（ETL）された現在および過去のデータを統合し、高度なビジネス分析（OLAP）やレポート作成を支援する。</td>
<td class="p-3 align-top leading-relaxed text-[13px]">書き込み時スキーマ（Schema-on-write）。分析用にクレンジングおよび構造化されたデータ。</td>
<td class="p-3 align-top leading-relaxed text-[13px]">BigQuery</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]"><strong>データレイク (Data Lake)</strong></td>
<td class="p-3 align-top leading-relaxed text-[13px]">構造化、半構造化、非構造化（画像、動画、音声など）を問わず、あらゆるデータを未加工の状態で安価に大量保存する。機械学習の基盤となる。</td>
<td class="p-3 align-top leading-relaxed text-[13px]">読み取り時スキーマ（Schema-on-read）。柔軟性が高く、事前のデータモデリングが不要。</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage</td>
</tr>
</tbody></table></div>
<p class="tdesc">最近のトレンドとして、データレイクの柔軟性とデータウェアハウスの管理機能（ACIDトランザクションや高度なSQLサポート）を融合させた「データレイクハウス（Data Lakehouse）」という概念も普及しており、Google CloudではBigQueryの拡張機能（BigLake等）がこの領域をカバーしている 。</p>
<h3 class="stitle"><strong>オブジェクトストレージの最適化：Cloud Storage</strong></h3>
<p class="tdesc">Cloud Storageは、あらゆる量の非構造化データを保存し、必要な頻度で取得できるフルマネージドのオブジェクトストレージサービスである 。クラウドのコスト最適化において、Cloud Storageの適切な「ストレージクラス」の選択は極めて重要である 。Google Cloudは、データのアクセス頻度と保存期間の要件に応じて、4つの主要なストレージクラスを提供している 。</p>
<p class="tdesc">第一の「Standard Storage」は、頻繁にアクセスされるホットデータ、アクティブなアプリケーションのバックエンド、ウェブサイトのコンテンツ配信などに最適である。ストレージ単価は他のクラスより高いものの、データの取得コストが無料であり、最低保存期間の要件もない 。第二の「Nearline Storage」は、平均して月に1回以下の頻度でアクセスされるデータのバックアップや、長期保存されるマルチメディアコンテンツに適している。最低保存期間は30日である 。第三の「Coldline Storage」は、四半期に1回以下の頻度でアクセスされるデータ向けであり、最低保存期間は90日に設定されている 。第四の「Archive Storage」は、法令遵守のための監査ログ保存や災害復旧（DR）用途など、1年に1回未満しかアクセスされないデータの長期保管に最適である。ストレージ単価は最も安価であるが、データ取得時の課金が最も高く、最低保存期間は365日に設定されている 。</p>
<p class="tdesc">Cloud Storageを運用する際のベストプラクティスとして、ライフサイクルルールの積極的な活用が挙げられる (<a class="text-blue-400 hover:text-blue-300 underline" href="https://oneuptime.com/blog/post/2026-02-17-how-to-optimize-cloud-storage-costs-by-using-the-right-storage-class/view)%E3%80%82%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E4%BE%A1%E5%80%A4%E3%82%84%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E3%81%AF%E6%99%82%E9%96%93%E3%81%A8%E3%81%A8%E3%82%82%E3%81%AB%E5%A4%89%E5%8C%96%E3%81%99%E3%82%8B%E3%80%82%E3%81%82%E3%82%8B%E6%99%82%E7%82%B9%E3%81%A7%E3%81%AF%E9%A0%BB%E7%B9%81%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%81%9FStandard%E3%82%AF%E3%83%A9%E3%82%B9%E3%81%AE%E3%83%87%E3%83%BC%E3%82%BF%E3%82%82%E3%80%81%E5%8D%8A%E5%B9%B4%E5%BE%8C%E3%81%AB%E3%81%AF%E5%85%A8%E3%81%8F%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%95%E3%82%8C%E3%81%AA%E3%81%8F%E3%81%AA%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%82%E3%82%8B%E3%80%82%E3%83%90%E3%82%B1%E3%83%83%E3%83%88%E3%81%94%E3%81%A8%E3%81%AB%E9%81%A9%E5%88%87%E3%81%AA%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%97%E3%80%81%E4%B8%80%E5%AE%9A%E6%9C%9F%E9%96%93%E7%B5%8C%E9%81%8E%E5%BE%8C%E3%81%AB%E8%87%AA%E5%8B%95%E7%9A%84%E3%81%ABNearline%E3%82%84Archive%E3%81%B8%E3%81%A8%E7%A7%BB%E8%A1%8C%E3%81%95%E3%81%9B%E3%82%8B%E3%81%93%E3%81%A8%E3%81%A7%E3%80%81%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AF%E6%84%8F%E8%AD%98%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AA%E3%81%8F%E5%A4%A7%E5%B9%85%E3%81%AA%E3%82%B3%E3%82%B9%E3%83%88%E5%89%8A%E6%B8%9B%E3%82%92%E5%AE%9F%E7%8F%BE%E3%81%A7%E3%81%8D%E3%82%8B">https://oneuptime.com/blog/post/2026-02-17-how-to-optimize-cloud-storage-costs-by-using-the-right-storage-class/view)。データの価値やアクセスパターンは時間とともに変化する。ある時点では頻繁にアクセスされていたStandardクラスのデータも、半年後には全くアクセスされなくなることがある。バケットごとに適切なライフサイクルポリシーを設定し、一定期間経過後に自動的にNearlineやArchiveへと移行させることで、ユーザーは意識することなく大幅なコスト削減を実現できる</a> 。ただし、ColdlineやArchiveクラスに短期間で削除される一時データを保存することは厳禁である。これらのクラスには最低保存期間が設けられているため、期間満了前にデータを削除したり別クラスへ移動したりすると、早期削除の違約金が発生し、結果的にStandardクラスを使用するよりも高額なコストを支払うことになる 。</p>
<p class="tdesc">また、Googleアカウントを持たない外部のユーザーに対して、安全かつ一時的にオブジェクトへのアクセス（読み取りやアップロード）を許可したい場合は、「署名付きURL（Signed URLs）」を使用することがベストプラクティスである。これにより、IAMアカウントを個別に作成することなく、有効期限付きのセキュアなアクセス経路を提供できる 。</p>
` }} />
            
            </SectionCard>
        
        </div>
    );
};
