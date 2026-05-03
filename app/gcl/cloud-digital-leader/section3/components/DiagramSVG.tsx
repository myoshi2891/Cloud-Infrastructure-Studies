import React from 'react';
import styles from '../../../../../components/DiagramSVG.module.css';

/**
 * SVGダイアグラムを表示するためのアクセシブルなコンポーネント。
 *
 * Discriminated Union 型により、`decorative={true}` でない限り `ariaLabel` が必須となり、
 * コンパイル時に無ラベルの非装飾的SVGを検出できます。
 */
export type DiagramSVGProps =
    | {
          viewBox: string;
          children: React.ReactNode;
          /** 装飾的な画像（スクリーンリーダーから隠す）として扱う場合は true を指定 */
          decorative: true;
          ariaLabel?: never;
      }
    | {
          viewBox: string;
          children: React.ReactNode;
          decorative?: false;
          /** スクリーンリーダー向けの説明ラベル（decorative でない場合は必須） */
          ariaLabel: string;
      };

export const DiagramSVG: React.FC<DiagramSVGProps> = (props) => {
    const isHidden = props.decorative === true;
    return (
        <div className={styles.diagramSvg}>
            <svg
                viewBox={props.viewBox}
                width="100%"
                height="100%"
                fill="none"
                stroke="currentColor"
                {...(isHidden
                    ? { 'aria-hidden': 'true' }
                    : { role: 'img', 'aria-label': props.ariaLabel })}
            >
                {!isHidden && <title>{props.ariaLabel}</title>}
                {props.children}
            </svg>
        </div>
    );
};
