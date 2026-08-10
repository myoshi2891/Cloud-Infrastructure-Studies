import { describe, expect, test } from 'vitest';
import {
    applyPipeline,
    ensureInitFlags,
    injectRenderLoop,
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
    test('DIAGRAMS 未定義なら即座に失敗する', () => {
        const input = FIXTURE.replace(/\s*const DIAGRAMS = \{[\s\S]*?\};/, '');

        expect(() => applyPipeline(input)).toThrow(/DIAGRAMS/);
    });
});

describe('JavaScript source scanning', () => {
    test('制御文の閉じ括弧後にある正規表現を飛ばして実宣言を抽出する', () => {
        const html = `<script>
if (ready) /const DIAGRAMS = \\{[^}]*\\}/.test(source);
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;

        expect(extractDiagramsDefinition(html).diagrams).toEqual({
            'diag-1': 'flowchart TD\nA --> B',
        });
    });

    test('メンバー名 return を正規表現開始キーワードとして扱わない', () => {
        const html = `<script>
obj.return / 2;
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;

        expect(extractDiagramsDefinition(html).diagrams).toEqual({
            'diag-1': 'flowchart TD\nA --> B',
        });
    });

    test("要素間のカンマがない DIAGRAMS 定義を拒否する", () => {
        const html = `<script>
const DIAGRAMS = {
  "diag-1": \`flowchart TD\nA --> B\`
  "diag-2": \`flowchart LR\nB --> C\`
};
</script>`;

        expect(() => extractDiagramsDefinition(html)).toThrow(
            "DIAGRAMS の値の後には ',' または '}' が必要です。",
        );
    });
});

describe('injectRenderLoop', () => {
    test.each(['</script >', '</SCRIPT>'])(
        '閉じタグの表記ゆれ %s の直前へ注入する',
        (closingTag) => {
            const input = `<script>mermaid.initialize({ startOnLoad: false });${closingTag}`;
            const out = injectRenderLoop(input);

            expect(out.indexOf('function applySvgFixups')).toBeGreaterThan(
                out.indexOf('mermaid.initialize({ startOnLoad: false })'),
            );
            expect(out.indexOf('function applySvgFixups')).toBeLessThan(
                out.toLowerCase().indexOf('</script'),
            );
        },
    );
});
