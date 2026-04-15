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
                
                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">1.1 試験における Section 2 の位置づけ</h3>
<p class="tdesc">Google Cloud Digital Leader（CDL）試験の Section 2 は
「<strong>Google Cloud によるデータ トランスフォーメーションの探求</strong>」がテーマです。</p>
` }} />
            

                <div>
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
            

                <div dangerouslySetInnerHTML={{ __html: `<h3 class="stitle text-[var(--color-primary)] mb-2 mt-6">1.2 Section 2 のサブトピック一覧</h3>
<div class="ctable-wrap overflow-x-auto my-4 border border-[var(--color-border)] rounded-md" tabIndex="0"><table class="ctable w-full text-left border-collapse">
<thead>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">#</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">サブトピック</th>
<th scope="col" class="p-3 font-semibold bg-[var(--color-muted)]/20">重要度</th>
</tr>
</thead>
<tbody><tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">1</td>
<td class="p-3 align-top leading-relaxed text-[13px]">データのビジネス価値（4種類の分析）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">2</td>
<td class="p-3 align-top leading-relaxed text-[13px]">構造化・非構造化・半構造化データ</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">3</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Cloud Storage のストレージクラス</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">4</td>
<td class="p-3 align-top leading-relaxed text-[13px]">データベース選択（RDB vs NoSQL）</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">5</td>
<td class="p-3 align-top leading-relaxed text-[13px]">BigQuery の特徴とユースケース</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">6</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Looker と Looker Studio の違い</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">7</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Pub/Sub・Dataflow・Dataproc の役割</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">8</td>
<td class="p-3 align-top leading-relaxed text-[13px]">Dataplex / BigQuery Universal Catalog</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★☆</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">9</td>
<td class="p-3 align-top leading-relaxed text-[13px]">データのプライバシー・ガバナンス</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★★</td>
</tr>
<tr class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-muted)]/10 transition-colors">
<td class="p-3 align-top leading-relaxed text-[13px]">10</td>
<td class="p-3 align-top leading-relaxed text-[13px]">ビジネスユースケース別のデータ活用</td>
<td class="p-3 align-top leading-relaxed text-[13px]">★★☆</td>
</tr>
</tbody></table></div>
<hr class="my-8 border-[var(--color-border)]" />
` }} />
            
            </SectionCard>
            
        </div>
    );
};
