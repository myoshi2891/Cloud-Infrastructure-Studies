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

  test("クォートされていないキーを固有メッセージで拒否する", () => {
    const html = `<script>
const DIAGRAMS = { diag1: \`flowchart TD
A --> B\` };
</script>`;

    expect(() => extractDiagramsDefinition(html)).toThrow(
      "DIAGRAMS のキーはクォートされた文字列リテラルで指定してください。",
    );
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

  test("オブジェクト内コメントの波括弧と DIAGRAMS 候補を無視する", () => {
    const html = `<script>
const DIAGRAMS = {
  // } const DIAGRAMS = { "fake": "ignored" };
  "diag-1": "flowchart TD\\nA --> B",
  /* } const DIAGRAMS = {}; */
  "diag-2": "flowchart LR\\nB --> C"
};
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({
      "diag-1": "flowchart TD\nA --> B",
      "diag-2": "flowchart LR\nB --> C",
    });
  });

  test("正規表現リテラル内の false match を飛ばして実宣言を抽出する", () => {
    const html = `<script>
const declarationPattern = /const DIAGRAMS = \\{[^}]*\\}/g;
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
