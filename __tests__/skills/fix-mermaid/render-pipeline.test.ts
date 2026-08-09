import { describe, expect, test } from 'vitest';
import {
    applyPipeline,
    ensureInitFlags,
} from '../../../.agents/skills/fix-mermaid/scripts/apply_render_pipeline.mjs';

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
    test('DIAGRAMS 未定義なら即座に失敗する', () => {
        const input = FIXTURE.replace(/\s*const DIAGRAMS = \{[\s\S]*?\};/, '');

        expect(() => applyPipeline(input)).toThrow(/DIAGRAMS/);
    });
});
