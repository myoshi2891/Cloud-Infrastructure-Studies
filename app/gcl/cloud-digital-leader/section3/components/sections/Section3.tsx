import React from 'react';
import baseStyles from './SectionBase.module.css';
import { Section3_Apis } from './Section3_Apis';
import { Section3_AutoML } from './Section3_AutoML';
import { Section3_VertexAI } from './Section3_VertexAI';
import { Section3_BQML } from './Section3_BQML';
import { Section3_TensorFlow } from './Section3_TensorFlow';

/**
 * Section3: Google Cloud AI/ML ソリューションの構築・活用
 */
export const Section3: React.FC = () => {
    return (
        <section id="building" className={baseStyles.section}>
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader}>
                    <div className={baseStyles.sectionTag}>3.3 BUILDING AND USING AI/ML SOLUTIONS</div>
                    <h2 className={baseStyles.sectionTitle}>Google Cloud AI/ML ソリューションの構築・活用</h2>
                    <p className={baseStyles.sectionDesc}>
                        各サービスの具体的な機能・ユースケース・ベストプラクティスを詳解します。
                    </p>
                </div>
            </div>

            <Section3_Apis />
            <div className={baseStyles.sectionDivider}></div>
            
            <Section3_AutoML />
            <div className={baseStyles.sectionDivider}></div>
            
            <Section3_VertexAI />
            <div className={baseStyles.sectionDivider}></div>
            
            <Section3_BQML />
            <div className={baseStyles.sectionDivider}></div>
            
            <Section3_TensorFlow />

        </section>
    );
};
