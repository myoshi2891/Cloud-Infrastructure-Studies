import React from 'react';
import { SectionCard, TableComponent } from '../index';
import { GOOGLE_CLOUD_STRENGTHS } from '../../constants';

export const Section8: React.FC = () => (
    <div id="s8" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn8">08</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">Google Cloud の独自の強みと差別化</h2>
                <p className="tdesc">グローバルネットワーク・AI/ML・サステナビリティ</p>
            </div>
        </div>

        <SectionCard
            id="cdl-8"
            idNumber="8.1"
            title="強みまとめ"
        >
            <TableComponent getRowKey={(row, i) => i}
                headers={['強み', 'キーワード']}
                rows={GOOGLE_CLOUD_STRENGTHS}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td><strong>{row.service}</strong></td>
                        <td>{row.description}</td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);