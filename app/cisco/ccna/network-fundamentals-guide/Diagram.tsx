'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';

/** Renders a browser-dependent Mermaid diagram while the guide body stays server-rendered. */
export default function Diagram({ id, label }: { id: string; label: string }) {
  const chart = DIAGRAMS[id];
  if (!chart) return null;
  return (
    <div className="mermaid-wrap">
      <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
    </div>
  );
}
