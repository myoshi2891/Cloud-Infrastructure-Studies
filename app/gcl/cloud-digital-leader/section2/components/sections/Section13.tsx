import React from 'react';
import { SectionCard, TableComponent } from '../index';
import { SECTION2_REFERENCES } from '../../constants';

/**
 * セクション13: 包括的調査および実践的アーキテクチャガイド
 * CDL試験の Section 2 に関連する実践的なアーキテクチャ例と用語解説を提供します。
 * @returns JSX.Element
 */
export const Section13: React.FC = () => {
    return (
        <div id="s13" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn13">13</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">公式参照リソース一覧</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-13" idNumber="13" title="公式参照リソース一覧">
                <TableComponent
                    headers={['カテゴリ', 'リソース', 'URL']}
                    rows={SECTION2_REFERENCES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.category}</strong></td>
                            <td>{row.title}</td>
                            <td><a href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a></td>
                        </tr>
                    )}
                />
                <hr className="sec-hr" />
                <p className="tdesc"><em>本ガイドは Google Cloud Digital Leader（CDL）試験の Section 2 に特化した学習資料です。</em><br/>
                <em>試験の最新情報は必ず公式サイト（<a href="https://cloud.google.com/learn/certification/cloud-digital-leader" target="_blank" rel="noopener noreferrer">Cloud Digital Leader 認定</a>）でご確認ください。</em></p>
            </SectionCard>

            <SectionCard id="gcdl-2-13" idNumber="Deep Dive" title="データからAIへのイノベーション基盤 (Data-to-AI Lifecycle)">
                <p className="tdesc"><strong>2.4 データからAIへのイノベーション基盤 (Data-to-AI Lifecycle)</strong></p>
                <p className="tdesc">デジタルトランスフォーメーションの最終的な到達点は、蓄積されたデータとBIによる「過去の可視化」を超え、人工知能（AI）と機械学習（ML）を活用した「未来の予測」と「ビジネスプロセスの自律化」を実現することにある。現在、ジェネレーティブAI（生成AI）の導入を進める多くの企業が実証実験（PoC）の段階で停滞しているが、その根本的な原因の70%は、AIモデル自体の問題ではなく、データのガバナンス不足、データ品質の低さ、そしてAIモデルとデータの統合の欠如にあると指摘されている。AIの成功は、強固な「AIファーストのデータ戦略」の上にのみ構築される。</p>
                <p className="tdesc">Google Cloudは、データ基盤とAIプラットフォームをシームレスに統合することで、この「データからAIへの壁」を打破している。その先駆的な機能の一つが「BigQuery ML」である。従来、機械学習モデルを構築するためには、データサイエンティストがPython等を用いてデータウェアハウスから外部の計算環境へデータを抽出し、モデルをトレーニングしてから本番環境へデプロイするという、複雑でセキュリティリスクを伴うデータパイプラインが必要であった。BigQuery MLは、データアナリストが使い慣れた標準SQL文を記述するだけで、BigQueryのインフラ内部で直接、線形回帰やクラスタリング、さらにはディープラーニングモデルの構築、ハイパーパラメータの調整、そして予測の実行（推論）までを完結させることを可能にした。これにより、データの移動に伴うレイテンシとセキュリティリスクが完全に排除され、機械学習の民主化が促進される。</p>
                <p className="tdesc">さらに、Google Cloudの統合AIプラットフォームである「Vertex AI」は、データ基盤と密接に連携している。Vertex AI Feature Storeを使用して構造化された特徴量を管理し、Cloud Storageに保存された画像やテキストなどの非構造化データをシームレスにモデルのトレーニングに活用できる。前述のデータガバナンスソリューションであるDataplexのUniversal Catalogは、BigQueryのデータセットだけでなく、Vertex AIでトレーニングされた機械学習モデルやデータセットも統合的に検索・管理・カタログ化する機能を持っている。これにより、「どのデータを使ってこのAIモデルがトレーニングされたか」というデータからAIに至るまでのエンドツーエンドのリネージ（系統）が完全に追跡可能となり、責任あるAI（Responsible AI）の要件や規制コンプライアンスを満たすための盤石な基盤が提供されるのである。</p>
                
                <h2 className="stitle mt-6">結論</h2>
                <p className="tdesc">Google Cloud Digital Leader認定試験のセクション 2「Google Cloud によるデータ トランスフォーメーションの探求」は、ビジネスの現場で発生する生データがいかにして収集され、保存され、処理され、最終的に競争優位性を生み出す「洞察（インサイト）」と「人工知能（AI）」へと変換されるかという、一連の包括的なアーキテクチャの理解を問うものである。</p>
                <p className="tdesc">本レポートで詳述したように、Cloud Storageのライフサイクル管理によるコスト最適化、要件とデータモデルに応じたデータベース（Cloud SQL, Spanner, Bigtable, Firestore）の戦略的選定、BigQueryとBigQuery Omniによるサイロのないマルチクラウドデータウェアハウスの構築、Pub/SubとDataflowの連携によるリアルタイムストリーミング分析、そしてLookerを通じたデータの民主化は、すべてがシームレスに連携して機能する「データバリューチェーン」を形成している。さらに、これらすべての基盤を支えるDataplexによる一元化されたデータガバナンスと、Vertex AIによるAIへの昇華こそが、次世代のビジネスイノベーションの鍵となる。</p>
                <p className="tdesc">クラウドデジタルリーダーに求められるのは、各サービスの名前や個別の機能スペックを暗記することではなく、「なぜそのサービスが存在し、従来システムのどのようなビジネス上のトレードオフやボトルネックを解決しているのか」という文脈を深く理解することである。このアーキテクチャの全体像とベストプラクティスを正しく把握することで、組織のデータ戦略を牽引し、真のデジタルトランスフォーメーションを実現する強力な推進力となることができる。</p>
            </SectionCard>
        </div>
    );
};