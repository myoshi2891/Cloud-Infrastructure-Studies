import React from 'react';
import { SectionCard, TableComponent } from '../index';
import { CONFUSION_POINTS } from '../../constants';

export const Section12: React.FC = () => (
    <div id="s12" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn12">12</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">Section 1 総まとめ・頻出問題パターン</h2>
                <p className="tdesc">まとめとチェックリスト</p>
            </div>
        </div>

        <SectionCard
            id="cdl-12"
            idNumber="12.1"
            title="学習チェックリスト"
        >
            <TableComponent
                headers={['混同パターン', '正しい理解']}
                rows={CONFUSION_POINTS}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td>{row.pattern}</td>
                        <td>{row.understanding}</td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);