import React from 'react';
import styles from './DiagramSVG.module.css';

/**
 * SVGダイアグラムを表示するためのコンポーネント
 * 
 * アクセシビリティに配慮したSVGラッパーとして機能します。
 * 
 * @param viewBox - SVGのビューボックス（例: "0 0 600 300"）
 * @param ariaLabel - SVG要素のアクセシビリティラベル（decorative=falseの場合は必須）
 * @param decorative - 画像が装飾的であるかどうか。falseの場合はariaLabelが必須。デフォルトはfalse。
 * @param children - SVG内部に描画されるReact要素
 * @returns ラップされたSVG要素
 */
interface DiagramSVGProps {
    viewBox: string;
    ariaLabel?: string;
    decorative?: boolean;
    children: React.ReactNode;
}

export const DiagramSVG: React.FC<DiagramSVGProps> = ({ viewBox, ariaLabel, decorative = false, children }) => {
    if (!decorative && !ariaLabel) {
        console.warn('DiagramSVG requires an ariaLabel when not marked as decorative.');
    }

    const fallbackAriaLabel = ariaLabel ?? '';
    const isHidden = decorative || !fallbackAriaLabel;
    return (
        <div className={styles.diagramSvg}>
            <svg 
                viewBox={viewBox} 
                width="100%" 
                height="100%" 
                fill="none" 
                stroke="currentColor"
                {...(isHidden ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': fallbackAriaLabel })}
            >
                {!isHidden && fallbackAriaLabel && <title>{fallbackAriaLabel}</title>}
                {children}
            </svg>
        </div>
    );
};
