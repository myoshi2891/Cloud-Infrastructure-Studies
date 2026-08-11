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

  test("script 外の引用符・CSS コメント・スラッシュを無視してオブジェクト終端を検出する", () => {
    const html = `<style>/* owner's / theme */ .card { color: red; }</style>
<main>it's outside / the script</main>
<script>
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;

    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "flowchart TD\nA --> B" });
  });

  test("JavaScript 文字列の unicode・hex・行継続エスケープを完全に消費する", () => {
    const html = String.raw`<script>
const DIAGRAMS = { "diag-1": "A\u0042\x43\
D" };
</script>`;

    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "ABCD" });
  });

  test("コードポイント形式の Unicode エスケープを復元する", () => {
    const html = String.raw`<script>
const DIAGRAMS = { "diag-1": "face: 😀" };
</script>`;

    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "face: 😀" });
  });

  test.each([String.raw`\u{}`, String.raw`\u{xyz}`, String.raw`\u{110000}`])(
    "不正なコードポイント形式の Unicode エスケープを拒否する: %s",
    (escape) => {
      const html = `<script>const DIAGRAMS = { "diag-1": "${escape}" };</script>`;
      expect(() => extractDiagramsDefinition(html)).toThrow();
    },
  );

  test("未対応の JavaScript identity escape はエスケープ対象文字として復元する", () => {
    const html = String.raw`<script>
const DIAGRAMS = { "diag-1": "flowchart\q" };
</script>`;

    expect(extractDiagramsDefinition(html).diagrams).toEqual({ "diag-1": "flowchartq" });
  });

  test.each([
    '{ "diag-1": 42 }',
    '{ "diag-1": null }',
    '{ "diag-1": { "chart": "flowchart TD" } }',
  ])("JSON として有効でも文字列以外の diagram 値を拒否する: %s", (definition) => {
    const html = `<script>const DIAGRAMS = ${definition};</script>`;

    expect(() => extractDiagramsDefinition(html)).toThrow(
      "DIAGRAMS の値はすべて文字列で指定してください。",
    );
  });

  test("正規表現リテラル内の false match を飛ばして実宣言を抽出する", () => {
    const html = `<script>
const declarationPattern = /const DIAGRAMS = \\{[^}]*\\}/g;
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "flowchart TD\nA --> B" });
  });

  test("制御文の閉じ括弧後にある正規表現を飛ばして実宣言を抽出する", () => {
    const html = `<script>
if (ready) /const DIAGRAMS = \\{[^}]*\\}/.test(source);
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "flowchart TD\nA --> B" });
  });

  test("制御キーワードとコメントの間にある括弧でも正規表現を飛ばす", () => {
    const html = `<script>
if /* comment */ (ready) /const DIAGRAMS = \\{[^}]*\\}/.test(source);
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "flowchart TD\nA --> B" });
  });

  test("メンバー名 return を正規表現開始キーワードとして扱わない", () => {
    const html = `<script>
obj.return / 2;
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;
    const { diagrams } = extractDiagramsDefinition(html);

    expect(diagrams).toEqual({ "diag-1": "flowchart TD\nA --> B" });
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

  test("要素間の連続したカンマを拒否する", () => {
    const html = `<script>
const DIAGRAMS = {
  "diag-1": \`flowchart TD\nA --> B\`,,
  "diag-2": \`flowchart LR\nB --> C\`
};
</script>`;

    expect(() => extractDiagramsDefinition(html)).toThrow(
      "DIAGRAMS のキーはクォートされた文字列リテラルで指定してください。",
    );
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
