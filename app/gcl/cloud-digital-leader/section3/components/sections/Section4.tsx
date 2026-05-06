import React from 'react';
import baseStyles from './SectionBase.module.css';
import { Section4_Responsible } from './Section4_Responsible';
import { Section4_Checklist } from './Section4_Checklist';
import { Section4_Patterns } from './Section4_Patterns';

/**
 * Section4: Responsible AI & Exam Checklist
 */
export const Section4: React.FC = () => {
    return (
        <section id="responsible" className={baseStyles.section}>
            <Section4_Responsible />
            <div className={baseStyles.sectionDivider}></div>
            <Section4_Checklist />
            <Section4_Patterns />
        </section>
    );
};
