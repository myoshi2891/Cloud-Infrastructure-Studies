import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const guide = readFileSync('Zoo-tour-guide-mcp-adk-challenge-lab-guide.md', 'utf8');

describe('Zoo tour guide deployment instructions', () => {
    it('uses the supported google-adk range in both framework constraint entries', () => {
        const frameworkRow = guide
            .split('\n')
            .find((line) => line.includes('フレームワークの制約を事前に把握する'));
        const troubleshootingRow = guide
            .split('\n')
            .find((line) => line.startsWith('| `400 INVALID_ARGUMENT'));

        expect(frameworkRow).toContain('google-adk>=1.17.0,<2.0.0');
        expect(frameworkRow).toContain('Gemini 2.x');
        expect(frameworkRow).toContain('bypass_multi_tools_limit=True');
        expect(troubleshootingRow).toContain('google-adk>=1.17.0,<2.0.0');
        expect(troubleshootingRow).toContain('Gemini 2.x');
        expect(troubleshootingRow).toContain('bypass_multi_tools_limit=True');
    });

    it('checks Python 3.10 or newer and stops before creating the virtual environment otherwise', () => {
        const versionCheck = guide.indexOf('python --version');
        const stopGuidance = guide.indexOf('Python 3.10未満');
        const venvCreation = guide.indexOf('python -m venv ../zoo_guide_venv');

        expect(versionCheck).toBeGreaterThan(-1);
        expect(stopGuidance).toBeGreaterThan(versionCheck);
        expect(venvCreation).toBeGreaterThan(stopGuidance);
    });

    it('validates production streaming through the API instead of ADK Web UI controls', () => {
        const deploymentVerification = guide.match(
            /### 7\.4 デプロイ後の検証([\s\S]*?)### 7\.5 /
        )?.[1];

        expect(deploymentVerification).toBeDefined();
        expect(deploymentVerification).not.toContain('Token Streamingを有効化');
        expect(deploymentVerification).toMatch(/Service URL|127\.0\.0\.1:8080/);
        expect(deploymentVerification).toMatch(/curl|API/);
        expect(deploymentVerification).toContain('MCPツール呼び出し');
        expect(deploymentVerification).toContain('Google Search呼び出し');
        expect(deploymentVerification).toContain('ストリーミング応答');
    });
});
