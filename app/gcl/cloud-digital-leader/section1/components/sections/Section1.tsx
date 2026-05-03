import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { SUB_TOPICS } from '../../constants';

export const Section1: React.FC = () => (
    <div id="s1" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn1">01</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">Section 1 の出題範囲と学習ポイント</h2>
                <p className="tdesc">試験における Section 1 の位置づけ</p>
            </div>
        </div>

        <SectionCard
            id="cdl-1"
            idNumber="1.1"
            title="出題範囲"
            description={
                <>
                    Google Cloud Digital Leader（CDL）試験の Section 1 は「<strong>デジタルトランスフォーメーションと Google Cloud</strong>」がテーマです。<br />
                    この Section で問われるのは技術的な実装能力ではなく、以下の<strong>ビジネス視点での理解</strong>です。
                </>
            }
        >
            <div className="stitle">試験で問われること:</div>
            <DiagramSVG viewBox="0 0 600 160" ariaLabel="試験で問われること: ①クラウドの必要性 ②基本概念 ③最適戦略 ④Google Cloud の差別化 ⑤DX推進">
                <rect x="10" y="10" width="580" height="140" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                <text x="30" y="45" fill="currentColor" fontSize="14">① クラウドがなぜ必要か（ビジネス的意義）</text>
                <text x="30" y="70" fill="currentColor" fontSize="14">② クラウドの基本概念を正確に理解しているか</text>
                <text x="30" y="95" fill="currentColor" fontSize="14">③ 自社の状況に最適なクラウド戦略を選べるか</text>
                <text x="30" y="120" fill="currentColor" fontSize="14">④ Google Cloud が他社と何が違うか / ⑤ DXをどう進めるか</text>
            </DiagramSVG>

            <div className="stitle">1.2 Section 1 のサブトピック一覧</div>
            <TableComponent getRowKey={(row, i) => i}
                headers={['#', 'サブトピック', '重要度']}
                rows={SUB_TOPICS}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.topic}</td>
                        <td>{row.importance}</td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);
