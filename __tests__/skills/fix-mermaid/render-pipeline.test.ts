import { describe, expect, test } from 'vitest';
import {
    applyPipeline,
    ensureInitFlags,
} from '../../../.agents/skills/fix-mermaid/scripts/apply_render_pipeline.mjs';
import { extractDiagramsDefinition } from '../../../.agents/skills/fix-mermaid/scripts/restore_diagrams.mjs';

const FIXTURE = `<!doctype html>
<html>
  <head><style>.mermaid { display: block; }</style></head>
  <body>
    <div class="mermaid">flowchart TD
A --> B</div>
    <script>
      const DIAGRAMS = { 'diag-1': \`flowchart TD
A --> B\` };
      mermaid.initialize({ startOnLoad: true, theme: 'dark' });
    </script>
  </body>
</html>`;

describe('ensureInitFlags', () => {
    test('initialize 外の securityLevel は設定済みと誤認しない', () => {
        const input = `
            const unrelated = { securityLevel: 'strict' };
            const label = "securityLevel: loose";
            // securityLevel: strict
            mermaid.initialize({ theme: 'dark' });
        `;
        const out = ensureInitFlags(input);

        expect(out).toContain("mermaid.initialize({ securityLevel: 'loose', theme: 'dark' })");
        expect(out.match(/securityLevel/g)?.length).toBe(4);
    });
});

describe('applyPipeline', () => {
    test('DIAGRAMS 未定義なら入力を変更せず即座に失敗する', () => {
        const input = FIXTURE.replace(/\s*const DIAGRAMS = \{[\s\S]*?\};/, '');
        const original = input;

        expect(() => applyPipeline(input)).toThrow(/DIAGRAMS/);
        expect(input).toBe(original);
    });
});

describe('extractDiagramsDefinition', () => {
    test('JSON互換の正準DIAGRAMS形式を解析する', () => {
        const html = `<script>
const DIAGRAMS = {
  "diag-1": "flowchart TD\\nA --> B"
};
</script>`;

        expect(extractDiagramsDefinition(html).diagrams).toEqual({
            'diag-1': 'flowchart TD\nA --> B',
        });
    });

    test('既存のJavaScriptテンプレートリテラル形式を評価せず解析する', () => {
        const html = `<script>
const DIAGRAMS = {
  'diag-1': \`flowchart TD
A["${'${notEvaluated}'}"] --> B\`,
  "diag-2": \`sequenceDiagram
A->>B: escaped \\\`tick\\\`\`,
};
</script>`;

        expect(extractDiagramsDefinition(html).diagrams).toEqual({
            'diag-1': 'flowchart TD\nA["${notEvaluated}"] --> B',
            'diag-2': 'sequenceDiagram\nA->>B: escaped `tick`',
        });
    });
});
