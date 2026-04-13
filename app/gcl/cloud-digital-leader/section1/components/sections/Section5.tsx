import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { PUBLIC_CLOUD_FEATURES, DEPLOYMENT_COMPARISON } from '../../constants';

export const Section5: React.FC = () => (
    <div id="s5" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn5">05</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">クラウドデプロイメントモデル</h2>
                <p className="tdesc">パブリック / プライベート / ハイブリッド / マルチクラウドの選択基準</p>
            </div>
        </div>

        <SectionCard
            id="cdl-5"
            idNumber="5.1"
            title="デプロイメントモデルの概要"
            description="クラウドを「どこに・どのように展開するか」を定義したモデルです。"
        >
            <div className="stitle">4 つのデプロイメントモデル</div>
            <DiagramSVG viewBox="0 0 600 160">
                <g transform="translate(20, 20)">
                    <rect x="0" y="0" width="160" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" />
                    <text x="10" y="20" fill="currentColor" fontSize="13" fontWeight="bold">パブリッククラウド</text>
                    <path d="M 160 15 L 200 15" stroke="var(--color-primary)" markerEnd="url(#arrow-primary)" />
                    <text x="210" y="20" fill="currentColor" fontSize="13">完全クラウド（Google 等が管理・共有）</text>
                </g>
                <g transform="translate(20, 60)">
                    <rect x="0" y="0" width="160" height="30" rx="4" fill="var(--color-muted)" fillOpacity="0.1" stroke="var(--color-muted)" />
                    <text x="10" y="20" fill="currentColor" fontSize="13" fontWeight="bold">プライベートクラウド</text>
                    <path d="M 160 15 L 200 15" stroke="var(--color-muted)" markerEnd="url(#arrow)" />
                    <text x="210" y="20" fill="currentColor" fontSize="13">完全自社管理（自社専用データセンター等）</text>
                </g>
                <g transform="translate(20, 100)">
                    <rect x="0" y="0" width="160" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" />
                    <text x="10" y="20" fill="currentColor" fontSize="13" fontWeight="bold">ハイブリッド / マルチ</text>
                    <path d="M 160 15 L 200 15" stroke="var(--color-primary)" markerEnd="url(#arrow-primary)" />
                    <text x="210" y="20" fill="currentColor" fontSize="13">オンプレ+クラウド / 複数ベンダー の組み合わせ</text>
                </g>
            </DiagramSVG>

            <div className="stitle">5.2 デプロイメントモデルの比較</div>
            <TableComponent
                headers={['比較項目', 'パブリック', 'プライベート', 'ハイブリッド', 'マルチ']}
                rows={DEPLOYMENT_COMPARISON}
                renderRow={(row, i) => (
                    <tr key={i}>
                        <td><strong>{row.item}</strong></td>
                        <td>{row.public}</td>
                        <td>{row.private}</td>
                        <td>{row.hybrid}</td>
                        <td>{row.multi}</td>
                    </tr>
                )}
            />
            <p className="tdesc">📎 <strong>参照</strong>:<br />
            <a href="https://cloud.google.com/learn/what-is-hybrid-cloud" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-hybrid-cloud</a><br />
            <a href="https://cloud.google.com/learn/what-is-multicloud" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-multicloud</a></p>
        </SectionCard>
    </div>
);
