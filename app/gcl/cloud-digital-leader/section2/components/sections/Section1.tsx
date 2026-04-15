import React from 'react';
import { SectionCard } from '../SectionCard';
import { DiagramSVG } from '../../../../../../components/DiagramSVG';

export const Section1: React.FC = () => {
    return (
        <div id="s1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">01</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">Section 2 の出題範囲と学習ポイント</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-1" idNumber="1" title="Section 2 の出題範囲と学習ポイント">
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">1.1 試験における Section 2 の位置づけ</h3>
<p class="tdesc">Google Cloud Digital Leader（CDL）試験の Section 2 は
「<strong>Google Cloud によるデータ トランスフォーメーションの探求</strong>」がテーマです。</p>
` }} />
            

                <div className="my-4 overflow-x-auto bg-gray-50 p-4 rounded-md">
                    <DiagramSVG viewBox="0 0 800 400">
                        <text x="10" y="20" fill="currentColor" style={{fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '14px'}}>
                            {`Section 2 で問われる主なこと:
┌─────────────────────────────────────────────────────────────┐
│ ① データの種類（構造化・非構造化）とビジネス価値の違い         │
│ ② データのライフサイクル（収集→保存→処理→分析→活用）         │
│ ③ 適切なストレージ・データベースサービスの選択                 │
│ ④ BigQuery によるデータ分析の仕組みとメリット                 │
│ ⑤ Looker / Looker Studio による BI・可視化の違い             │
│ ⑥ データパイプライン（Dataflow・Pub/Sub・Dataproc）の役割     │
│ ⑦ データガバナンスとプライバシー保護の考え方                   │
└─────────────────────────────────────────────────────────────┘`}
                        </text>
                    </DiagramSVG>
                </div>
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle">1.2 Section 2 のサブトピック一覧</h3>
<table>
<thead>
<tr>
<th>#</th>
<th>サブトピック</th>
<th>重要度</th>
</tr>
</thead>
<tbody><tr>
<td>1</td>
<td>データのビジネス価値（4種類の分析）</td>
<td>★★★</td>
</tr>
<tr>
<td>2</td>
<td>構造化・非構造化・半構造化データ</td>
<td>★★★</td>
</tr>
<tr>
<td>3</td>
<td>Cloud Storage のストレージクラス</td>
<td>★★★</td>
</tr>
<tr>
<td>4</td>
<td>データベース選択（RDB vs NoSQL）</td>
<td>★★★</td>
</tr>
<tr>
<td>5</td>
<td>BigQuery の特徴とユースケース</td>
<td>★★★</td>
</tr>
<tr>
<td>6</td>
<td>Looker と Looker Studio の違い</td>
<td>★★★</td>
</tr>
<tr>
<td>7</td>
<td>Pub/Sub・Dataflow・Dataproc の役割</td>
<td>★★★</td>
</tr>
<tr>
<td>8</td>
<td>Dataplex / BigQuery Universal Catalog</td>
<td>★★☆</td>
</tr>
<tr>
<td>9</td>
<td>データのプライバシー・ガバナンス</td>
<td>★★★</td>
</tr>
<tr>
<td>10</td>
<td>ビジネスユースケース別のデータ活用</td>
<td>★★☆</td>
</tr>
</tbody></table>
<hr />
` }} />
            
            </SectionCard>
            
        </div>
    );
};
