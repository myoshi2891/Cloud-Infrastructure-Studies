import React from 'react';
import { SectionCard, DiagramSVG } from '../index';

export const Section10: React.FC = () => (
    <div id="s10" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn10">10</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">Google Cloud のサービス階層とリソース管理</h2>
                <p className="tdesc">組織 / フォルダ / プロジェクト / リソース</p>
            </div>
        </div>

        <SectionCard
            id="cdl-10"
            idNumber="10.1"
            title="リソース階層"
        >
            <DiagramSVG viewBox="0 0 500 240" ariaLabel="Google Cloud リソース階層（組織 → フォルダ → プロジェクト → リソース）">
                <rect x="10" y="10" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.4" />
                <text x="20" y="30" fill="var(--color-background)" fontSize="13" fontWeight="bold">組織 (Organization)</text>
                <path d="M 40 40 L 40 70 L 50 70" stroke="var(--color-muted)" />
                <rect x="50" y="55" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.3" />
                <text x="60" y="75" fill="currentColor" fontSize="13">フォルダ (Folder)</text>
                <path d="M 80 85 L 80 115 L 90 115" stroke="var(--color-muted)" />
                <rect x="90" y="100" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.2" />
                <text x="100" y="120" fill="currentColor" fontSize="13">プロジェクト (Project)</text>
            </DiagramSVG>
        </SectionCard>
    </div>
);