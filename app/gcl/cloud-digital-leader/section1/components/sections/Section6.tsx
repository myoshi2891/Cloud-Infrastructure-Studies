import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { CAPEX_OPEX_COMPARISON, CAPEX_EXAMPLES } from '../../constants';

export const Section6: React.FC = () => (
    <div id="s6" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn6">06</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">CapEx vs OpEx ─ コスト構造の根本的変化</h2>
                <p className="tdesc">オンプレミスの資本支出からクラウドの運用経費への転換</p>
            </div>
        </div>

        <SectionCard
            id="cdl-6"
            idNumber="6.1"
            title="CapEx と OpEx"
        >
            <div className="stitle">比較詳細</div>
            <TableComponent getRowKey={(row, i) => i}
                headers={['比較項目', 'CapEx（オンプレ）', 'OpEx（クラウド）']}
                rows={CAPEX_OPEX_COMPARISON}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td><strong>{row.item}</strong></td>
                        <td>{row.capex}</td>
                        <td>{row.opex}</td>
                    </tr>
                )}
            />
            <div className="stitle">財務上の変化</div>
            <DiagramSVG viewBox="0 0 600 240" decorative={true}>
                <rect x="10" y="30" width="280" height="150" rx="8" stroke="var(--color-muted)" fill="var(--color-background)" />
                <text x="20" y="20" fill="currentColor" fontSize="14" fontWeight="bold">移行前 (CapEx 中心・固定費)</text>
                <text x="30" y="60" fill="currentColor" fontSize="13">サーバー減価償却: 3,000万円</text>
                <text x="30" y="90" fill="currentColor" fontSize="13">データセンター賃料: 1,000万円</text>
                <text x="30" y="120" fill="currentColor" fontSize="13">人件費(インフラ管理): 2,000万円</text>
                <path d="M 20 140 L 280 140" stroke="var(--color-muted)" strokeDasharray="4" />
                <text x="30" y="165" fill="currentColor" fontSize="14" fontWeight="bold">年間合計: 6,000万円 (固定)</text>

                <rect x="310" y="30" width="280" height="150" rx="8" stroke="var(--color-primary)" fill="var(--color-background)" />
                <text x="320" y="20" fill="var(--color-primary)" fontSize="14" fontWeight="bold">移行後 (OpEx 中心・変動費)</text>
                <text x="330" y="60" fill="currentColor" fontSize="13">GCP 月次利用料: 100〜300万円</text>
                <text x="330" y="90" fill="var(--color-muted-foreground)" fontSize="12">(需要に応じて変動)</text>
                <text x="330" y="120" fill="currentColor" fontSize="13">人件費(インフラ管理) 大幅削減</text>
                <path d="M 320 140 L 580 140" stroke="var(--color-primary)" strokeDasharray="4" />
                <text x="330" y="165" fill="var(--color-primary)" fontSize="14" fontWeight="bold">年間合計: 1,200〜3,600万円</text>
            </DiagramSVG>
        </SectionCard>
    </div>
);