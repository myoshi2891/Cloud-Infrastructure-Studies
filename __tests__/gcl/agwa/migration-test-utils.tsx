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

export const squash = (value: string): string => value.replace(/\s+/g, '');

export { codeBlockSelector, codeLineCount, extractBodyContent };
