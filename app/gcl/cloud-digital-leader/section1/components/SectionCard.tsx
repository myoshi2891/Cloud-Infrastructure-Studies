import React from 'react';

interface SectionCardProps {
    id: string;
    idNumber: string;
    title: string;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ id, idNumber, title, description, children }) => {
    return (
        <div className="tcard" id={id}>
            <div className="ttitle">
                <span className="tid">{idNumber}</span>
                {title}
            </div>
            {description && <p className="tdesc">{description}</p>}
            {children}
        </div>
    );
};
