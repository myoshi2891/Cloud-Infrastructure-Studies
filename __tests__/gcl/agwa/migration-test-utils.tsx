import {
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
} from '@/scripts/inventory-extraction.mjs';

type MermaidDiagramMockProps = {
    chart: string;
    ariaLabel?: string;
    decorative?: boolean;
    preserveNaturalScale?: boolean;
};

/**
 * Mermaid 図をテスト用の div として描画し、チャート文字列を data-chart に保持する。
 * 実コンポーネントと同様に、説明付きの図は aria-label、装飾図は
 * aria-hidden="true" となるアクセシビリティ契約を再現する。
 */
export const MermaidDiagramMock = ({
    chart,
    ariaLabel,
    decorative,
    preserveNaturalScale,
}: MermaidDiagramMockProps) => (
    <div
        data-testid="mermaid-diagram"
        data-chart={chart}
        data-decorative={String(decorative === true)}
        data-preserve-natural-scale={String(preserveNaturalScale)}
        aria-label={ariaLabel}
        aria-hidden={decorative || undefined}
    />
);

/** 文字列から連続する空白文字をすべて除去する。 */
export const squash = (value: string): string => value.replace(/\s+/g, '');

export { codeBlockSelector, codeLineCount, extractBodyContent };
