import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from '@/app/cisco/ccde/complete-guide/constants';
import baseStyles from './SectionBase.module.css';

/**
 * Diagram - 図表を ID で解決して表示または未定義時に非表示にする責務を担うコンポーネント。
 * DIAGRAMS 定数から指定された ID のチャート文字列を取得し、MermaidDiagram を描画または未定義時に null を返して非表示にする。
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
