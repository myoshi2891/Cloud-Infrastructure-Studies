import React from 'react';

interface DiagramSVGProps {
    viewBox: string;
    children: React.ReactNode;
}

export const DiagramSVG: React.FC<DiagramSVGProps> = ({ viewBox, children }) => {
    return (
        <div className="diagram-svg">
            <svg viewBox={viewBox} width="100%" height="100%" fill="none" stroke="currentColor">
                {children}
            </svg>
        </div>
    );
};
