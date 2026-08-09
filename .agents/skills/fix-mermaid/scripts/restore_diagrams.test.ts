import { describe, expect, test } from "vitest";
import {
  extractDiagramsDefinition,
  serializeDiagramsDefinition,
} from "./restore_diagrams.mjs";

describe("extractDiagramsDefinition", () => {
  test("正準 JSON 文字列の \\n を Mermaid の実改行へ復元する", () => {
    const html = String.raw`<script>
const DIAGRAMS = { "diag-1": "flowchart TD\nA --> B" };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);
    expect(diagrams["diag-1"]).toBe("flowchart TD\nA --> B");
  });

  test("既存のテンプレートリテラル形式との互換性を維持する", () => {
    const html = `<script>
const DIAGRAMS = { "diag-1": \`flowchart TD
A --> B\` };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);
    expect(diagrams["diag-1"]).toBe("flowchart TD\nA --> B");
  });

  test("コメントと文字列の false match を飛ばして実宣言を抽出する", () => {
    const html = `<script>
// const DIAGRAMS = {};
const example = "const DIAGRAMS = {};";
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);
    expect(diagrams).toEqual({ "diag-1": "flowchart TD\nA --> B" });
  });

  test.each([
    "// const DIAGRAMS = {};",
    "/* const DIAGRAMS = {}; */",
    "const example = 'const DIAGRAMS = {};'",
    'const example = "const DIAGRAMS = {};"',
    "const example = `const DIAGRAMS = {};`",
  ])("コメントや文字列だけの宣言候補を拒否する: %s", (falseMatch) => {
    expect(() => extractDiagramsDefinition(`<script>${falseMatch}</script>`)).toThrow(
      "const DIAGRAMS の定義が見つかりません",
    );
  });
});

describe("serializeDiagramsDefinition", () => {
  test("実改行を正準 JSON の単一エスケープで出力する", () => {
    const serialized = serializeDiagramsDefinition({
      "diag-1": "flowchart TD\nA --> B",
    });
    expect(serialized).toContain(String.raw`flowchart TD\nA --> B`);
    expect(serialized).not.toContain(String.raw`flowchart TD\\nA --> B`);
  });
});
