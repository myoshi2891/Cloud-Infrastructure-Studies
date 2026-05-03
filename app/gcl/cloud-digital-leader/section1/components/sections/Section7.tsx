import React from 'react';
import { SectionCard, TableComponent } from '../index';
import { MIGRATION_STRATEGY_COMPARISON } from '../../constants';

export const Section7: React.FC = () => (
    <div id="s7" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn7">07</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">クラウドへの移行戦略（6 つの R）</h2>
                <p className="tdesc">Rehost / Replatform / Repurchase / Refactor / Retire / Retain</p>
            </div>
        </div>

        <SectionCard
            id="cdl-7"
            idNumber="7.1"
            title="戦略の比較"
        >
            <TableComponent getRowKey={(row) => row.strategy}
                headers={['戦略', '変更規模', 'スピード', 'コスト', 'リスク', 'クラウド活用度']}
                rows={MIGRATION_STRATEGY_COMPARISON}
                renderRow={(row) => (
                    <tr key={row.strategy}>
                        <td><strong>{row.strategy}</strong></td>
                        <td>{row.scale}</td>
                        <td>{row.speed}</td>
                        <td>{row.cost}</td>
                        <td>{row.risk}</td>
                        <td>{row.cloudUsage}</td>
                    </tr>
                )}
            />
        </SectionCard>
    </div>
);