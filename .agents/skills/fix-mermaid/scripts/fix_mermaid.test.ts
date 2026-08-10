import { expect, test, describe } from "bun:test";
import { fixHtmlMermaid, fixMarkdownMermaid, fixTsxMermaid } from "./fix_mermaid";

describe("fixHtmlMermaid", () => {
  test("HTML フォーマッターで分割された sequenceDiagram 行が結合される", () => {
    const html = `<div class="mermaid">
    sequenceDiagram
    participant A
    Note over A,B:
        some message
    A->B: hello
</div>`;
    const { fixed, report } = fixHtmlMermaid(html);
    expect(fixed).toContain("Note over A,B: some message");
    expect(fixed).not.toContain("    sequenceDiagram");
    expect(fixed).toContain("sequenceDiagram");
    expect(report.length).toBe(1);
    expect(report[0]).toContain("modified");
    expect(report[0]).toContain("sequenceDiagram");
  });

  test("mindmap のインデントが保持され、不正な結合が起きない", () => {
    const html = `<div class="mermaid">
    mindmap
      root((Title))
        Child1
          Grandchild1
        Child2
</div>`;
    const { fixed, report } = fixHtmlMermaid(html);
    expect(fixed).toMatch(/^mindmap$/m);
    expect(fixed).toContain("  root((Title))");
    expect(fixed).toContain("    Child1");
    expect(fixed).toContain("      Grandchild1");
    expect(fixed).toContain("    Child2");
    expect(fixed).not.toContain("root((Title))Child1");
    expect(report).toEqual([]);
  });

  test("class 属性に追加トークンがあってもブロックが検出・処理される", () => {
    const html = `<div class="foo mermaid bar">
    graph TD
    A --> B
</div>`;
    const { fixed, report } = fixHtmlMermaid(html);
    expect(fixed).toContain("graph TD");
    expect(fixed).not.toContain("    graph TD");
    expect(fixed).toContain("A --> B");
    expect(fixed).not.toContain("    A --> B");
    expect(report.length).toBe(1);
  });
});

describe("fixMarkdownMermaid", () => {
  test("Markdown 内の ```mermaid ブロックのインデントが正規化される", () => {
    const md = `Some text here.
\`\`\`mermaid
  graph TD
    A --> B
\`\`\`
Other text here.`;
    const { fixed, report } = fixMarkdownMermaid(md);
    expect(fixed).toContain("graph TD\nA --> B");
    expect(fixed).not.toContain("  graph TD");
    expect(report.length).toBe(1);
  });
});

describe("fixTsxMermaid", () => {
  test("TSX 内のテンプレートリテラルの Mermaid コードのインデントが正規化される", () => {
    const tsx = `import Mermaid from '../../components/Mermaid';
export default function Page() {
  return (
    <Mermaid chart={\`graph TD
      A --> B
      B --> C
    \`} />
  );
}`;
    const { fixed, report } = fixTsxMermaid(tsx);
    expect(fixed).toContain("graph TD\nA --> B\nB --> C");
    expect(fixed).not.toContain("      A --> B");
    expect(report.length).toBe(1);
  });

  test("TSX 内のテンプレートリテラルでバッククォートの直後に改行がある場合も Mermaid コードが検出されて修正される", () => {
    const tsx = `import Mermaid from '../../components/Mermaid';
export default function Page() {
  return (
    <Mermaid chart={\`
      graph TD
      A --> B
      B --> C
    \`} />
  );
}`;
    const { fixed, report } = fixTsxMermaid(tsx);
    expect(fixed).toContain("graph TD\nA --> B\nB --> C");
    expect(report.length).toBe(1);
  });
});
