import React from 'react';

interface DiagramSVGProps {
    viewBox: string;
    ariaLabel?: string;
    children: React.ReactNode;
}

export const DiagramSVG: React.FC<DiagramSVGProps> = ({ viewBox, ariaLabel, children }) => {
    return (
        <div className="diagram-svg">
            <svg 
                viewBox={viewBox} 
                width="100%" 
                height="100%" 
                fill="none" 
                stroke="currentColor"
                {...(ariaLabel ? { role: 'img', 'aria-label': ariaLabel } : { 'aria-hidden': 'true' })}
            >
                {ariaLabel && <title>{ariaLabel}</title>}
                {children}
            </svg>
        </div>
    );
};
