import React from 'react';
import { SectionCard, TableComponent } from '../index';
import { ON_PREMISE_VS_CLOUD_COMPARISON } from '../../constants';

export const Section13: React.FC = () => (
    <div id="s13" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn13">13</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">完全網羅レポート</h2>
                <p className="tdesc">詳細解説</p>
            </div>
        </div>

        <SectionCard
            id="cdl-13"
            idNumber="13.1"
            title="比較レポート"
        >
            <TableComponent getRowKey={(row, i) => i}
                headers={['比較項目', 'オンプレミス', 'クラウド']}
                rows={ON_PREMISE_VS_CLOUD_COMPARISON}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td><strong>{row.item}</strong></td>
                        <td>{row.onPremise}</td>
                        <td>{row.cloud}</td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);