import { expect, test, describe } from "bun:test";
import {
  injectIds,
  ensureInitFlags,
  injectRenderLoop,
  injectCenteringCss,
  applyPipeline,
} from "./apply_render_pipeline.mjs";

// 最小フィクスチャ: div.mermaid 1 つ + startOnLoad:true の初期化 + DIAGRAMS 定義
const FIXTURE = `<!doctype html>
<html>
  <head>
    <style>
      .diagram-wrap { padding: 20px; overflow-x: auto; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  </head>
  <body>
    <div class="diagram-wrap">
      <div class="mermaid">flowchart TD
A --> B</div>
    </div>
    <script>
      const DIAGRAMS = {
        'diag-1': \`flowchart TD
A --> B\`,
      };
      mermaid.initialize({ startOnLoad: true, theme: 'dark' });
    </script>
  </body>
</html>`;

describe("injectIds", () => {
  test("各 div.mermaid を連番 id 付きの空 div に置換する", () => {
    const { html, count } = injectIds(FIXTURE);
    expect(count).toBe(1);
    expect(html).toContain('<div class="mermaid" id="diag-1"></div>');
    // 旧来のインライン Mermaid ソースは div から除去される
    expect(html).not.toContain('<div class="mermaid">flowchart TD');
  });

  test("既に id 付きの div は再変換しない(冪等)", () => {
    const { html } = injectIds(FIXTURE);
    const second = injectIds(html);
    expect(second.count).toBe(0);
    expect(second.html).toBe(html);
  });
});

describe("ensureInitFlags", () => {
  test("startOnLoad:true を false にし securityLevel:'loose' を付与する", () => {
    const out = ensureInitFlags(FIXTURE);
    expect(out).toContain("startOnLoad: false");
    expect(out).toContain("securityLevel: 'loose'");
    expect(out).not.toContain("startOnLoad: true");
  });

  test("カンマ無しの startOnLoad:true でも false 化し securityLevel を付与する", () => {
    const input = "mermaid.initialize({ startOnLoad: true });";
    const out = ensureInitFlags(input);
    expect(out).toContain("startOnLoad: false");
    expect(out).toContain("securityLevel: 'loose'");
    expect(out).not.toContain("startOnLoad: true");
  });

  test("startOnLoad 不在でも securityLevel:'loose' を注入する", () => {
    const input = "mermaid.initialize({ theme: 'dark' });";
    const out = ensureInitFlags(input);
    expect(out).toContain("securityLevel: 'loose'");
  });

  test("securityLevel 既存なら重複注入しない(冪等)", () => {
    const input = "mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });";
    const out = ensureInitFlags(input);
    expect(out.match(/securityLevel/g)?.length).toBe(1);
  });
});

describe("injectRenderLoop", () => {
  test("applySvgFixups と render ループを注入する", () => {
    const out = injectRenderLoop(FIXTURE);
    expect(out).toContain("function applySvgFixups");
    expect(out).toContain("mermaid.render('svg-' + id");
  });

  test("SVG 幅は viewBox 由来の自然 px + maxWidth:100% を使う(width:'100%'/'auto' は使わない)", () => {
    const out = injectRenderLoop(FIXTURE);
    // 異常拡大の原因になる固定値は使わない
    expect(out).not.toContain("style.width = '100%'");
    expect(out).not.toContain("style.width = 'auto'");
    // 自然幅(px)と maxWidth:100% を使う
    expect(out).toContain("maxWidth = '100%'");
    expect(out).toMatch(/style\.width\s*=\s*w\s*\+\s*'px'/);
    // viewBox 高さ拡張(下端見切れ対策)
    expect(out).toContain("setAttribute('viewBox'");
  });

  test("既に注入済みなら再注入しない(冪等)", () => {
    const once = injectRenderLoop(FIXTURE);
    const twice = injectRenderLoop(once);
    expect(twice).toBe(once);
  });
});

describe("injectCenteringCss", () => {
  test("中央寄せ CSS を注入する", () => {
    const out = injectCenteringCss(FIXTURE);
    expect(out).toContain("justify-content: center");
  });

  test("既に注入済みなら再注入しない(冪等)", () => {
    const once = injectCenteringCss(FIXTURE);
    const twice = injectCenteringCss(once);
    expect(twice).toBe(once);
  });
});

describe("applyPipeline (統合・冪等性)", () => {
  test("全ステップを適用し、再適用で不変(冪等)", () => {
    const first = applyPipeline(FIXTURE);
    expect(first.html).toContain('id="diag-1"');
    expect(first.html).toContain("startOnLoad: false");
    expect(first.html).toContain("function applySvgFixups");
    expect(first.html).toContain("justify-content: center");

    const second = applyPipeline(first.html);
    expect(second.html).toBe(first.html);
  });
});
