import React from 'react';
import { SectionCard, TableComponent } from '../index';
import { GCDL_REFERENCES } from '../../constants';

export const Section14: React.FC = () => (
    <div id="s14" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn14">14</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">公式参照リソース一覧</h2>
                <p className="tdesc">リンク集</p>
            </div>
        </div>

        <SectionCard
            id="cdl-14"
            idNumber="14.1"
            title="参照リソース"
        >
            <TableComponent
                headers={['タイトル', 'URL']}
                rows={GCDL_REFERENCES}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td>{row.title}</td>
                        <td><a href={row.url} target="_blank" rel="noreferrer">{row.url}</a></td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);