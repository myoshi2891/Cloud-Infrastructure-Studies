import React from 'react';

type NavLink = {
    id: string;
    num: string;
    label: string;
};

interface SectionNavProps {
    links: NavLink[];
}

export const SectionNav: React.FC<SectionNavProps> = ({ links }) => {
    return (
        <nav className="snav" aria-label="セクションナビゲーション">
            <div className="snav-inner">
                {links.map((link) => (
                    <a key={link.id} href={`#${link.id}`} className="snav-link">
                        <span className="snav-num">{link.num}</span>
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};
