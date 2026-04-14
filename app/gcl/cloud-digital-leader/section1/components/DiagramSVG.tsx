import React from 'react';
import styles from './DiagramSVG.module.css';

/**
 * SVGダイアグラムを表示するためのコンポーネント
 * 
 * アクセシビリティに配慮したSVGラッパーとして機能します。
 * 
 * @param viewBox - SVGのビューボックス（例: "0 0 600 300"）
 * @param ariaLabel - SVG要素のアクセシビリティラベル
 * @param children - SVG内部に描画されるReact要素
 * @returns ラップされたSVG要素
 */
interface DiagramSVGProps {
    viewBox: string;
    ariaLabel?: string;
    children: React.ReactNode;
}

export const DiagramSVG: React.FC<DiagramSVGProps> = ({ viewBox, ariaLabel, children }) => {
    return (
        <div className={styles.diagramSvg}>
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
