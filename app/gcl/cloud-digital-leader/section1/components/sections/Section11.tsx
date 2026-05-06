import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { DX_SOLUTIONS } from '../../constants';

export const Section11: React.FC = () => (
    <div id="s11" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn11">11</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">DX 実現のための Google Cloud ソリューション</h2>
                <p className="tdesc">インフラ / データ / AI / 生産性向上</p>
            </div>
        </div>

        <SectionCard
            id="cdl-11"
            idNumber="11.1"
            title="ソリューション一覧"
        >
            <TableComponent getRowKey={(row, i) => i}
                headers={['課題', 'ソリューション', '効果']}
                rows={DX_SOLUTIONS}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td>{row.issue}</td>
                        <td>{row.solution}</td>
                        <td>{row.effect}</td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);