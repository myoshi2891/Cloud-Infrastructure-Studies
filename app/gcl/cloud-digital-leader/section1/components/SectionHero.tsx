import React from 'react';

type Badge = {
    label: string;
    color: 'blue' | 'red' | 'green';
};

interface SectionHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    subtitle: string;
    badges: Badge[];
}

export const SectionHero: React.FC<SectionHeroProps> = ({ eyebrow, title, subtitle, badges }) => {
    return (
        <section className="hero">
            <div className="hero-eyebrow">{eyebrow}</div>
            <h1>{title}</h1>
            <p className="hero-sub">{subtitle}</p>
            <div className="hero-meta">
                {badges.map((badge, i) => (
                    <span key={i} className="hero-badge">
                        <span className={`dot dot-${badge.color}`} />
                        {badge.label}
                    </span>
                ))}
            </div>
        </section>
    );
};
