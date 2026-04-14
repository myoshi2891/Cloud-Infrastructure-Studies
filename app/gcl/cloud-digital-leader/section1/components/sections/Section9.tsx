import React from 'react';
import { SectionCard, DiagramSVG } from '../index';

export const Section9: React.FC = () => (
    <div id="s9" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn9">09</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">Google Cloud のグローバルインフラ</h2>
                <p className="tdesc">リージョン / ゾーン / エッジネットワーク</p>
            </div>
        </div>

        <SectionCard
            id="cdl-9"
            idNumber="9.1"
            title="インフラ構造"
        >
            <DiagramSVG viewBox="0 0 400 180">
                <rect x="10" y="10" width="250" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1" />
                <text x="20" y="30" fill="currentColor" fontSize="14" fontWeight="bold">グローバル (Global)</text>
                <path d="M 40 40 L 40 55 L 50 55" stroke="var(--color-muted)" />
                <rect x="50" y="45" width="220" height="25" rx="4" fill="var(--color-primary)" fillOpacity="0.2" />
                <text x="60" y="62" fill="currentColor" fontSize="13">マルチリージョン (Multi-Region)</text>
                <path d="M 70 70 L 70 85 L 80 85" stroke="var(--color-muted)" />
                <rect x="80" y="75" width="200" height="25" rx="4" fill="var(--color-primary)" fillOpacity="0.3" />
                <text x="90" y="92" fill="currentColor" fontSize="13">リージョン (Region)</text>
                <path d="M 100 100 L 100 115 L 110 115" stroke="var(--color-muted)" />
                <rect x="110" y="105" width="180" height="25" rx="4" fill="var(--color-primary)" fillOpacity="0.4" />
                <text x="120" y="122" fill="var(--color-background)" fontSize="13" fontWeight="bold">ゾーン (Zone)</text>
            </DiagramSVG>
        </SectionCard>
    </div>
);