import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from '@/app/cisco/ccde/complete-guide/constants';
import baseStyles from './SectionBase.module.css';

/**
 * Resolves and renders the diagram identified by `id`.
 *
 * @param id - The diagram identifier used to select the chart data
 * @param label - The accessible label for the rendered diagram
 * @returns The rendered diagram, or `null` when no chart matches `id`
 */
export default function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className={baseStyles.diagramCard}>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}
