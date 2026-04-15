import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section11: React.FC = () => {
    return (
        <div id="s11" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn11">11</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">ビジネスユースケース別 データ活用パターン</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-11" idNumber="11" title="ビジネスユースケース別 データ活用パターン">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3>11.1 小売・EC 業界でのデータ活用</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`課題: 売上を伸ばしたい・在庫ロスを減らしたい

データ活用の全体像:

[データ収集]           [分析・AI]              [ビジネス効果]

POS データ       →  BigQuery      →  Looker      → 売上ダッシュボード
Web 行動ログ     →  Vertex AI     →            → パーソナライズ推薦
在庫データ       →  BigQuery ML   →            → 需要予測・自動発注
顧客レビュー     →  NL API        →            → 品質改善施策
画像（商品）     →  Vision API    →            → 不良品自動検出`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h4>具体的な活用例</h4>
<table>
<thead>
<tr>
<th>課題</th>
<th>データ</th>
<th>GCP サービス</th>
<th>効果</th>
</tr>
</thead>
<tbody><tr>
<td>顧客離脱を予測したい</td>
<td>購買履歴・行動ログ</td>
<td>BigQuery ML + Vertex AI</td>
<td>離脱 3 週間前に介入できる</td>
</tr>
<tr>
<td>在庫を最適化したい</td>
<td>POS・天気・カレンダー</td>
<td>BigQuery + Vertex AI</td>
<td>欠品率 30% 削減</td>
</tr>
<tr>
<td>レコメンドを改善したい</td>
<td>閲覧・購買履歴</td>
<td>Recommendations AI</td>
<td>CV率 15% 向上</td>
</tr>
<tr>
<td>レビューを分析したい</td>
<td>顧客レビューテキスト</td>
<td>Natural Language API</td>
<td>製品改善サイクル短縮</td>
</tr>
</tbody></table>
<h3>11.2 製造業でのデータ活用</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`課題: 品質不良を減らしたい・設備ダウンタイムを削減したい

IoT センサーデータ（温度・振動・圧力）
    ↓
Pub/Sub（リアルタイム取り込み）
    ↓
Dataflow（異常値フィルタリング・集計）
    ↓
BigQuery（履歴データ蓄積） → Vertex AI（予兆検知モデル）
    ↓
アラート発報 → 設備保全チームへ通知

効果:
  ✅ 設備の故障を 2 週間前に予測
  ✅ 計画外停止を 40% 削減
  ✅ 保全コストの最適化`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3>11.3 金融業でのデータ活用</h3>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`課題: 不正取引を即座に検知したい

取引データ（毎秒数万件）
    ↓
Pub/Sub（ストリーミング取り込み）
    ↓
Dataflow（リアルタイム特徴量計算）
    ↓
Vertex AI（不正検知モデル・1ミリ秒以内に判定）
    ↓
✅ 正常 → 決済承認
❌ 不正 → 取引停止・アラート

BigQuery に全データを蓄積 → モデルの継続的な改善

効果:
  ✅ 不正検知率が大幅向上
  ✅ 正常取引の誤検知を削減
  ✅ リアルタイム（1秒以内）の判定`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3>11.4 医療業界でのデータ活用</h3>
<pre><code className="language-text">課題: 診断精度を上げたい・業務効率化

医療画像（レントゲン・CT・MRI）
    ↓
Cloud Storage（HIPAA 対応構成が可能なストレージ）
    ↓
Cloud Healthcare API（HL7 FHIR 対応）
    ↓
Vertex AI（医療画像 AI / Medical Imaging）
    ↓
診断支援・所見の自動生成

注意事項:

  - 医療データは HIPAA（米国）・個人情報保護法の対象
  - Google Cloud は HIPAA BAA（事業提携契約）に対応（利用には BAA の締結が必須であり、顧客側の構成・運用責任が前提）
  - データ暗号化・アクセスログが必須
</code></pre>
<hr />
` }} />
            
            </SectionCard>
            
        </div>
    );
};
